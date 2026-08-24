// SowiMotor — inventory store.
//
// Presents one small API to the rest of the app, backed by whichever of two
// modes is available:
//
//   "live" — supabase-config.js has real credentials, so the inventory lives
//            in a shared database and every visitor sees the same thing.
//   "demo" — no credentials yet. The inventory lives in this browser's own
//            localStorage, so the admin panel is fully usable for a demo,
//            but changes stay on the device that made them.
//
// The public site and the admin panel both talk to window.SowiInventory and
// don't care which mode is active.

(function () {
  var DEMO_KEY = "sowimotor.demo.bikes.v1";
  var DEMO_META_KEY = "sowimotor.demo.meta.v1";
  var DEMO_SESSION_KEY = "sowimotor.demo.session.v1";

  // Bump whenever the shipped inventory in hifi-data.jsx changes. Browsers
  // that seeded an older version get a fresh copy instead of being stuck with
  // whatever the list looked like the first time they visited.
  var SEED_VERSION = 2;

  var live = !!(window.SUPABASE_URL && window.SUPABASE_ANON_KEY);
  var client = null;
  var listeners = [];

  if (live) {
    if (window.supabase && window.supabase.createClient) {
      client = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
    } else {
      console.warn("SowiInventory: supabase-js did not load; falling back to demo mode.");
      live = false;
    }
  }

  var mode = live ? "live" : "demo";

  function newId() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return "bike-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  function notify() {
    listeners.forEach(function (fn) { fn(); });
  }

  // ── demo storage ───────────────────────────────────────────────
  function readStore() {
    try {
      var raw = localStorage.getItem(DEMO_KEY);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : null;
    } catch (e) {
      return null; // private mode, blocked storage, corrupt JSON
    }
  }

  function writeStore(rows) {
    try {
      localStorage.setItem(DEMO_KEY, JSON.stringify(rows));
      return true;
    } catch (e) {
      console.warn("SowiInventory: could not save demo data (storage blocked).");
      return false;
    }
  }

  function readMeta() {
    try {
      return JSON.parse(localStorage.getItem(DEMO_META_KEY)) || {};
    } catch (e) {
      return {};
    }
  }

  function writeMeta(meta) {
    try { localStorage.setItem(DEMO_META_KEY, JSON.stringify(meta)); } catch (e) {}
  }

  // Records that this browser has made its own changes, so a later seed bump
  // doesn't throw away a demo the owner is in the middle of.
  function markTouched() {
    var meta = readMeta();
    if (!meta.touched) { meta.touched = true; writeMeta(meta); }
  }

  // The static list in hifi-data.jsx is the demo's starting point.
  //
  // It used to be seeded exactly once, which meant anyone who had already
  // opened the site kept the old inventory forever — when photos were added,
  // returning visitors still saw the pre-photo list. Now a seed-version bump
  // re-seeds those browsers, unless this one has its own edits worth keeping.
  function seedDemo() {
    var existing = readStore();
    var meta = readMeta();
    var stale = existing && meta.seedVersion !== SEED_VERSION && !meta.touched;
    if (existing && !stale) return existing;

    var seed = (window.BIKES || []).map(function (b, i) {
      return Object.assign({}, b, { created_at: new Date(2024, 0, 1, 0, i).toISOString() });
    });
    writeStore(seed);
    writeMeta({ seedVersion: SEED_VERSION, touched: !!meta.touched });
    return seed;
  }

  function sortByCreated(rows) {
    return rows.slice().sort(function (a, b) {
      return String(a.created_at || "") < String(b.created_at || "") ? -1 : 1;
    });
  }

  // ── public API ─────────────────────────────────────────────────
  async function list() {
    if (mode === "live") {
      var res = await client.from("bikes").select("*").order("created_at", { ascending: true });
      if (res.error) return { data: null, error: res.error.message };
      return { data: res.data, error: null };
    }
    return { data: sortByCreated(seedDemo()), error: null };
  }

  async function create(row) {
    if (mode === "live") {
      var res = await client.from("bikes").insert(Object.assign({ id: newId() }, row));
      return { error: res.error ? res.error.message : null };
    }
    var rows = seedDemo();
    rows.push(Object.assign({ id: newId(), created_at: new Date().toISOString() }, row));
    writeStore(rows);
    markTouched();
    return { error: null };
  }

  async function update(id, row) {
    if (mode === "live") {
      var res = await client.from("bikes").update(row).eq("id", id);
      return { error: res.error ? res.error.message : null };
    }
    var rows = seedDemo().map(function (r) {
      return r.id === id ? Object.assign({}, r, row) : r;
    });
    writeStore(rows);
    markTouched();
    return { error: null };
  }

  // Deleting a bike also drops its photos, so storage doesn't fill up with
  // images nothing references any more.
  async function removePhotosOf(id) {
    if (!window.SowiImages) return;
    var res = await list();
    var bike = (res.data || []).find(function (r) { return r.id === id; });
    if (!bike || !bike.images) return;
    for (var i = 0; i < bike.images.length; i++) {
      await window.SowiImages.remove(bike.images[i]);
    }
  }

  async function remove(id) {
    await removePhotosOf(id);
    if (mode === "live") {
      var res = await client.from("bikes").delete().eq("id", id);
      return { error: res.error ? res.error.message : null };
    }
    var rows = seedDemo().filter(function (r) { return r.id !== id; });
    writeStore(rows);
    markTouched();
    return { error: null };
  }

  function resetDemo() {
    try {
      localStorage.removeItem(DEMO_KEY);
      localStorage.removeItem(DEMO_META_KEY);
    } catch (e) {}
    return seedDemo();
  }

  // Pull the current inventory into the global BIKES array the public pages
  // render from, then tell React to re-render.
  async function refresh() {
    // photos are preloaded into memory so the first paint already has them
    if (window.SowiImages) { try { await window.SowiImages.ready; } catch (e) {} }
    var res = await list();
    if (res.error || !res.data || res.data.length === 0) return false;
    BIKES.length = 0;
    res.data.forEach(function (row) { BIKES.push(row); });
    notify();
    return true;
  }

  function subscribe(fn) {
    listeners.push(fn);
    return function unsubscribe() {
      var i = listeners.indexOf(fn);
      if (i !== -1) listeners.splice(i, 1);
    };
  }

  // ── demo auth ──────────────────────────────────────────────────
  // In demo mode any credentials are accepted; the login screen exists to
  // show how the real thing behaves, not to secure anything.
  var auth = {
    async getSession() {
      if (mode === "live") {
        var res = await client.auth.getSession();
        return res.data.session;
      }
      try {
        var raw = sessionStorage.getItem(DEMO_SESSION_KEY);
        return raw ? JSON.parse(raw) : null;
      } catch (e) { return null; }
    },
    onChange(cb) {
      if (mode === "live") {
        var res = client.auth.onAuthStateChange(function (_e, sess) { cb(sess); });
        return function () { res.data.subscription.unsubscribe(); };
      }
      return function () {};
    },
    async signIn(email, password) {
      if (mode === "live") {
        var res = await client.auth.signInWithPassword({ email: email, password: password });
        return { error: res.error ? res.error.message : null };
      }
      var session = { user: { email: email || "demo@sowimotor.com" } };
      try { sessionStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(session)); } catch (e) {}
      return { error: null, session: session };
    },
    async signOut() {
      if (mode === "live") { await client.auth.signOut(); return; }
      try { sessionStorage.removeItem(DEMO_SESSION_KEY); } catch (e) {}
    },
  };

  window.SowiInventory = {
    mode: mode,
    isDemo: mode === "demo",
    isConfigured: mode === "live",
    client: client,
    list: list,
    create: create,
    update: update,
    remove: remove,
    resetDemo: resetDemo,
    refresh: refresh,
    subscribe: subscribe,
    auth: auth,
  };

  // In demo mode, an edit made in one tab should show up in the other.
  window.addEventListener("storage", function (e) {
    if (e.key === DEMO_KEY) refresh();
  });
})();
