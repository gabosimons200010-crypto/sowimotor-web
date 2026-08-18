// SowiMotor — live inventory sync.
// Keeps the global BIKES array (defined in hifi-data.jsx) in sync with the
// Supabase "bikes" table, so edits made in admin.html show up on the public
// site. If Supabase isn't configured yet (see supabase-config.js), this
// quietly does nothing and the site keeps using the static seed list.

(function () {
  var configured = !!(window.SUPABASE_URL && window.SUPABASE_ANON_KEY);
  var listeners = [];
  var client = null;

  if (configured && window.supabase && window.supabase.createClient) {
    client = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
  } else if (configured) {
    console.warn("SowiInventory: supabase-js failed to load; showing static inventory.");
    configured = false;
  }

  async function refresh() {
    if (!configured) return false;
    var res = await client.from("bikes").select("*").order("created_at", { ascending: true });
    if (res.error) {
      console.warn("SowiInventory: could not load live inventory, showing static list.", res.error.message);
      return false;
    }
    if (!res.data || res.data.length === 0) return false;
    BIKES.length = 0;
    res.data.forEach(function (row) { BIKES.push(row); });
    listeners.forEach(function (fn) { fn(); });
    return true;
  }

  function subscribe(fn) {
    listeners.push(fn);
    return function unsubscribe() {
      var i = listeners.indexOf(fn);
      if (i !== -1) listeners.splice(i, 1);
    };
  }

  window.SowiInventory = {
    isConfigured: configured,
    client: client,
    refresh: refresh,
    subscribe: subscribe,
  };
})();
