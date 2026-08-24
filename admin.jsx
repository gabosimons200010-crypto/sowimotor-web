// SowiMotor — inventory admin panel. Plain React, no build step (Babel in-browser).
// Talks only to window.SowiInventory, so it behaves identically whether the
// inventory is backed by a real database or by the browser-only demo store.
const { useState: aUseState, useEffect: aUseEffect } = React;

const store = window.SowiInventory;

const BLANK_BIKE = {
  name: "", brand: "", type: "", year: "", km: "", price: "",
  cc: "", cv: "", license: "A2", tag: "", color: "",
};

const LICENSES = ["A1", "A2", "A"];
const TYPES = ["Naked", "Sport", "Scooter", "Trail", "Custom"];

// Stored rows use null for "no tag"/"no color" and numbers for the specs;
// form inputs need plain strings, so normalise in both directions.
function rowToFields(row) {
  var out = {};
  Object.keys(BLANK_BIKE).forEach(function (k) {
    out[k] = row[k] === null || row[k] === undefined ? "" : String(row[k]);
  });
  out.license = row.license || "A2";
  if (row.id) out.id = row.id;
  return out;
}

function str(v) {
  return (v === null || v === undefined ? "" : String(v)).trim();
}

function fieldsToRow(f) {
  return {
    name: str(f.name),
    brand: str(f.brand),
    type: str(f.type),
    year: parseInt(f.year, 10),
    km: parseInt(f.km, 10),
    price: parseInt(f.price, 10),
    cc: parseInt(f.cc, 10),
    cv: parseInt(f.cv, 10),
    license: f.license,
    tag: str(f.tag) || null,
    color: str(f.color) || null,
  };
}

function money(n) {
  return (n || 0).toLocaleString("es-ES") + " €";
}

/* ── add / edit form ─────────────────────────────────────────── */
function BikeForm({ initial, onCancel, onSave, saving, error }) {
  const [f, setF] = aUseState(initial);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  aUseEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onCancel(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="admin-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) onCancel(); }}>
      <div className="admin-modal" role="dialog" aria-modal="true">
        <h2>{initial.id ? "Editar moto" : "Añadir moto"}</h2>
        {error && <div className="admin-error" style={{ marginBottom: 16 }}>{error}</div>}
        <form onSubmit={(e) => { e.preventDefault(); onSave(f); }}>
          <div className="admin-form-grid">
            <div className="field field-full">
              <label>Nombre</label>
              <input value={f.name} onChange={set("name")} placeholder="Kawasaki Z900" required autoFocus />
            </div>
            <div className="field">
              <label>Marca</label>
              <input value={f.brand} onChange={set("brand")} placeholder="Kawasaki" required />
            </div>
            <div className="field">
              <label>Tipo</label>
              <input value={f.type} onChange={set("type")} placeholder="Naked" list="bike-types" required />
              <datalist id="bike-types">
                {TYPES.map((t) => <option key={t} value={t} />)}
              </datalist>
            </div>
            <div className="field">
              <label>Año</label>
              <input type="number" inputMode="numeric" value={f.year} onChange={set("year")} placeholder="2021" required />
            </div>
            <div className="field">
              <label>Kilómetros</label>
              <input type="number" inputMode="numeric" value={f.km} onChange={set("km")} placeholder="12400" required />
            </div>
            <div className="field">
              <label>Precio (€)</label>
              <input type="number" inputMode="numeric" value={f.price} onChange={set("price")} placeholder="7490" required />
            </div>
            <div className="field">
              <label>Carnet</label>
              <select value={f.license} onChange={set("license")}>
                {LICENSES.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div className="field">
              <label>Cilindrada (cc)</label>
              <input type="number" inputMode="numeric" value={f.cc} onChange={set("cc")} placeholder="948" required />
            </div>
            <div className="field">
              <label>Potencia (CV)</label>
              <input type="number" inputMode="numeric" value={f.cv} onChange={set("cv")} placeholder="125" required />
            </div>
            <div className="field field-full">
              <label>Color</label>
              <input value={f.color} onChange={set("color")} placeholder="Verde lima" />
            </div>
            <div className="field field-full">
              <label>Etiqueta (opcional)</label>
              <input value={f.tag} onChange={set("tag")} placeholder="Recién entrada, Top ventas, Garantía 12m…" />
              <span className="field-hint">Se muestra como una pegatina naranja sobre la foto.</span>
            </div>
          </div>
          <div className="admin-modal-actions">
            <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancelar</button>
            <button type="submit" className="btn btn-orange" disabled={saving}>
              {saving ? "Guardando…" : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ── confirm delete ──────────────────────────────────────────── */
function ConfirmDelete({ bike, onCancel, onConfirm, busy }) {
  return (
    <div className="admin-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) onCancel(); }}>
      <div className="admin-modal admin-modal-sm" role="dialog" aria-modal="true">
        <h2>Eliminar moto</h2>
        <p className="admin-confirm-text">
          Se quitará <strong>{bike.name}</strong> de la web. Esta acción no se puede deshacer.
        </p>
        <div className="admin-modal-actions">
          <button className="btn btn-ghost" onClick={onCancel}>Cancelar</button>
          <button className="btn btn-danger" onClick={onConfirm} disabled={busy}>
            {busy ? "Eliminando…" : "Sí, eliminar"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── inventory list ──────────────────────────────────────────── */
function InventoryList({ bikes, onEdit, onDelete }) {
  if (bikes.length === 0) {
    return (
      <div className="admin-table-wrap">
        <div className="admin-empty">
          No hay motos en la web ahora mismo.<br />
          Pulsa <strong>“+ Añadir moto”</strong> para publicar la primera.
        </div>
      </div>
    );
  }
  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Moto</th><th>Marca</th><th>Tipo</th><th>Año</th><th>KM</th>
            <th>Precio</th><th>Carnet</th><th>Etiqueta</th><th aria-label="Acciones"></th>
          </tr>
        </thead>
        <tbody>
          {bikes.map((b) => (
            <tr key={b.id}>
              <td data-label="Moto" className="cell-name">{b.name}</td>
              <td data-label="Marca">{b.brand}</td>
              <td data-label="Tipo">{b.type}</td>
              <td data-label="Año">{b.year}</td>
              <td data-label="KM">{(b.km || 0).toLocaleString("es-ES")}</td>
              <td data-label="Precio" className="price">{money(b.price)}</td>
              <td data-label="Carnet">{b.license}</td>
              <td data-label="Etiqueta">{b.tag || "—"}</td>
              <td className="actions">
                <button className="btn btn-ghost" onClick={() => onEdit(b)}>Editar</button>
                <button className="btn btn-danger" onClick={() => onDelete(b)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── login ───────────────────────────────────────────────────── */
function LoginScreen({ onSignedIn }) {
  const demo = store.isDemo;
  const [email, setEmail] = aUseState(demo ? "demo@sowimotor.com" : "");
  const [password, setPassword] = aUseState(demo ? "demo" : "");
  const [error, setError] = aUseState("");
  const [busy, setBusy] = aUseState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await store.auth.signIn(email, password);
    setBusy(false);
    if (res.error) setError("Email o contraseña incorrectos.");
    else onSignedIn(res.session);
  }

  return (
    <div className="admin-login-wrap">
      <div className="admin-login-card">
        <div className="nav-logo admin-logo">
          <span className="mark">S</span>
          <span>SOWI<span className="orange">MOTOR</span></span>
        </div>
        <p className="admin-login-sub">Panel de gestión del inventario</p>

        {demo && (
          <div className="admin-demo-hint">
            Demostración — pulsa <strong>Entrar</strong> para probarlo. No hace falta contraseña.
          </div>
        )}
        {error && <div className="admin-error" style={{ marginBottom: 14 }}>{error}</div>}

        <form onSubmit={submit}>
          <div className="field">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="field">
            <label>Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-orange btn-lg" disabled={busy}>
            {busy ? "Entrando…" : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ── app ─────────────────────────────────────────────────────── */
function AdminApp() {
  const [session, setSession] = aUseState(undefined); // undefined = still checking
  const [bikes, setBikes] = aUseState([]);
  const [loadError, setLoadError] = aUseState("");
  const [editing, setEditing] = aUseState(null);
  const [deleting, setDeleting] = aUseState(null);
  const [saving, setSaving] = aUseState(false);
  const [busyDelete, setBusyDelete] = aUseState(false);
  const [saveError, setSaveError] = aUseState("");
  const [flash, setFlash] = aUseState("");

  aUseEffect(() => {
    let alive = true;
    store.auth.getSession().then((s) => { if (alive) setSession(s); });
    const off = store.auth.onChange((s) => setSession(s));
    return () => { alive = false; off(); };
  }, []);

  async function load() {
    setLoadError("");
    const res = await store.list();
    if (res.error) setLoadError(res.error);
    else setBikes(res.data);
  }

  aUseEffect(() => { if (session) load(); }, [session]);

  function announce(msg) {
    setFlash(msg);
    setTimeout(() => setFlash(""), 3500);
  }

  async function handleSave(fields) {
    setSaving(true);
    setSaveError("");
    const row = fieldsToRow(fields);
    const res = editing.id ? await store.update(editing.id, row) : await store.create(row);
    setSaving(false);
    if (res.error) { setSaveError(res.error); return; }
    announce(editing.id ? `“${row.name}” actualizada.` : `“${row.name}” publicada en la web.`);
    setEditing(null);
    load();
  }

  async function handleDelete() {
    setBusyDelete(true);
    const res = await store.remove(deleting.id);
    setBusyDelete(false);
    if (res.error) { setLoadError(res.error); setDeleting(null); return; }
    announce(`“${deleting.name}” eliminada.`);
    setDeleting(null);
    load();
  }

  function handleReset() {
    store.resetDemo();
    announce("Inventario de demostración restaurado.");
    load();
  }

  if (session === undefined) return null;
  if (!session) return <LoginScreen onSignedIn={setSession} />;

  return (
    <div className="admin-shell">
      {store.isDemo && (
        <div className="admin-demo-bar">
          <span><strong>Modo demostración.</strong> Los cambios se guardan solo en este dispositivo.</span>
          <a href="index.html" className="admin-demo-link">Ver la web →</a>
        </div>
      )}

      <div className="admin-topbar">
        <div className="nav-logo admin-logo">
          <span className="mark">S</span>
          <span>SOWI<span className="orange">MOTOR</span></span>
        </div>
        <div className="admin-topbar-right">
          <span className="admin-user-email">{session.user.email}</span>
          <button className="btn btn-ghost" onClick={() => store.auth.signOut().then(() => setSession(null))}>
            Salir
          </button>
        </div>
      </div>

      <div className="admin-main">
        <div className="admin-header-row">
          <div>
            <h1>Inventario</h1>
            <p className="admin-count">
              {bikes.length === 1 ? "1 moto publicada" : `${bikes.length} motos publicadas`} en la web
            </p>
          </div>
          <div className="admin-header-actions">
            {store.isDemo && bikes.length === 0 && (
              <button className="btn btn-ghost" onClick={handleReset}>Restaurar demo</button>
            )}
            <button className="btn btn-orange" onClick={() => setEditing({ ...BLANK_BIKE })}>
              + Añadir moto
            </button>
          </div>
        </div>

        {flash && <div className="admin-notice" style={{ marginBottom: 16 }}>{flash}</div>}
        {loadError && <div className="admin-error" style={{ marginBottom: 16 }}>{loadError}</div>}

        <InventoryList bikes={bikes} onEdit={(b) => setEditing(rowToFields(b))} onDelete={setDeleting} />
      </div>

      {editing && (
        <BikeForm
          initial={editing}
          saving={saving}
          error={saveError}
          onCancel={() => { setEditing(null); setSaveError(""); }}
          onSave={handleSave}
        />
      )}
      {deleting && (
        <ConfirmDelete
          bike={deleting}
          busy={busyDelete}
          onCancel={() => setDeleting(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("admin-root")).render(<AdminApp />);
