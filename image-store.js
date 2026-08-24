// SowiMotor — photo storage.
//
// Photos straight off a phone are 3-5MB each, which would blow past the ~5MB
// localStorage budget after a single bike. So every upload is downscaled and
// re-encoded as JPEG in the browser first (typically 150-250KB), then kept in
// IndexedDB, which has room to spare.
//
// Two modes, matching inventory-sync.js:
//   demo — photos live in this browser's IndexedDB
//   live — photos live in a Supabase Storage bucket
//
// A bike record stores an array of photo ids in `images`; ids resolve to a
// displayable src through url(), which is synchronous so React can render
// straight from it.

(function () {
  var DB_NAME = "sowimotor";
  var DB_VERSION = 1;
  var STORE = "photos";
  var BUCKET = "bike-photos";

  var MAX_EDGE = 1600;   // px on the longest side
  var QUALITY = 0.72;    // JPEG quality

  var live = !!(window.SUPABASE_URL && window.SUPABASE_ANON_KEY && window.supabase);
  var client = window.SowiInventory && window.SowiInventory.client;
  var cache = {};        // id -> data URI (demo) or public URL (live)
  var dbPromise = null;

  function newId() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return "img-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  // ── IndexedDB (demo mode) ──────────────────────────────────────
  function openDB() {
    if (dbPromise) return dbPromise;
    dbPromise = new Promise(function (resolve, reject) {
      if (!window.indexedDB) { reject(new Error("IndexedDB no disponible")); return; }
      var req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = function () {
        var db = req.result;
        if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE, { keyPath: "id" });
      };
      req.onsuccess = function () { resolve(req.result); };
      req.onerror = function () { reject(req.error); };
    });
    return dbPromise;
  }

  function idbPut(id, dataUrl) {
    return openDB().then(function (db) {
      return new Promise(function (resolve, reject) {
        var tx = db.transaction(STORE, "readwrite");
        tx.objectStore(STORE).put({ id: id, dataUrl: dataUrl });
        tx.oncomplete = function () { resolve(); };
        tx.onerror = function () { reject(tx.error); };
      });
    });
  }

  function idbDelete(id) {
    return openDB().then(function (db) {
      return new Promise(function (resolve) {
        var tx = db.transaction(STORE, "readwrite");
        tx.objectStore(STORE).delete(id);
        tx.oncomplete = function () { resolve(); };
        tx.onerror = function () { resolve(); };
      });
    });
  }

  function idbAll() {
    return openDB().then(function (db) {
      return new Promise(function (resolve, reject) {
        var tx = db.transaction(STORE, "readonly");
        var req = tx.objectStore(STORE).getAll();
        req.onsuccess = function () { resolve(req.result || []); };
        req.onerror = function () { reject(req.error); };
      });
    });
  }

  // ── downscale + compress ───────────────────────────────────────
  function compress(file) {
    return new Promise(function (resolve, reject) {
      if (!file.type || file.type.indexOf("image/") !== 0) {
        reject(new Error("Ese archivo no es una imagen."));
        return;
      }
      var reader = new FileReader();
      reader.onerror = function () { reject(new Error("No se pudo leer el archivo.")); };
      reader.onload = function () {
        var img = new Image();
        img.onerror = function () { reject(new Error("No se pudo abrir la imagen.")); };
        img.onload = function () {
          var w = img.naturalWidth, h = img.naturalHeight;
          var scale = Math.min(1, MAX_EDGE / Math.max(w, h));
          var cw = Math.round(w * scale), ch = Math.round(h * scale);
          var canvas = document.createElement("canvas");
          canvas.width = cw; canvas.height = ch;
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, cw, ch);
          try {
            resolve(canvas.toDataURL("image/jpeg", QUALITY));
          } catch (e) {
            reject(new Error("No se pudo procesar la imagen."));
          }
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  // ── public API ─────────────────────────────────────────────────
  // Preloads every stored photo so url() can stay synchronous.
  var ready = (function () {
    if (live) return Promise.resolve();
    return idbAll()
      .then(function (rows) { rows.forEach(function (r) { cache[r.id] = r.dataUrl; }); })
      .catch(function () { /* storage blocked: photos just won't show */ });
  })();

  async function put(file) {
    var dataUrl;
    try {
      dataUrl = await compress(file);
    } catch (e) {
      return { error: e.message };
    }

    var id = newId();

    if (live) {
      // data URI -> Blob for the storage upload
      var res = await fetch(dataUrl);
      var blob = await res.blob();
      var path = id + ".jpg";
      var up = await client.storage.from(BUCKET).upload(path, blob, { contentType: "image/jpeg" });
      if (up.error) return { error: up.error.message };
      var pub = client.storage.from(BUCKET).getPublicUrl(path);
      cache[path] = pub.data.publicUrl;
      return { id: path };
    }

    try {
      await idbPut(id, dataUrl);
    } catch (e) {
      return { error: "No hay espacio para guardar más fotos en este dispositivo." };
    }
    cache[id] = dataUrl;
    return { id: id };
  }

  async function remove(id) {
    if (!id) return;
    delete cache[id];
    if (live) { await client.storage.from(BUCKET).remove([id]); return; }
    await idbDelete(id);
  }

  function url(id) {
    if (!id) return null;
    if (cache[id]) return cache[id];
    if (live && client) {
      var pub = client.storage.from(BUCKET).getPublicUrl(id);
      cache[id] = pub.data.publicUrl;
      return cache[id];
    }
    return null;
  }

  // First photo of a bike, or null when it has none yet.
  function cover(bike) {
    if (!bike || !bike.images || !bike.images.length) return null;
    return url(bike.images[0]);
  }

  window.SowiImages = {
    mode: live ? "live" : "demo",
    ready: ready,
    put: put,
    remove: remove,
    url: url,
    cover: cover,
    MAX_EDGE: MAX_EDGE,
  };
})();
