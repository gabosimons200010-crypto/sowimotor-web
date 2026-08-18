// SowiMotor — inventory admin panel. Plain React, no build step (Babel in-browser).
const { useState: aUseState, useEffect: aUseEffect } = React;

const BLANK_BIKE = {
  name: "", brand: "", type: "", year: "", km: "", price: "",
  cc: "", cv: "", license: "A2", tag: "", color: "",
};

function fieldsToRow(fields) {
  return {
    name: fields.name.trim(),
    brand: fields.brand.trim(),
    type: fields.type.trim(),
    year: parseInt(fields.year, 10),
    km: parseInt(fields.km, 10),
    price: parseInt(fields.price, 10),
    cc: parseInt(fields.cc, 10),
    cv: parseInt(fields.cv, 10),
    license: fields.license,
    tag: fields.tag.trim() || null,
    color: fields.color.trim() || null,
  };
}

function BikeForm({ initial, onCancel, onSave, saving, error }) {
  const [fields, setFields] = aUseState(initial);
  const set = (k) => (e) => setFields({ ...fields, [k]: e.target.value });

  return (
    <div className="admin-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) onCancel(); }}>
      <div className="admin-modal">
        <h2>{initial.id ? "Editar moto" : "Añadir moto"}</h2>
        {error && <div className="admin-error" style={{ marginBottom: 16 }}>{error}</div>}
        <form onSubmit={(e) => { e.preventDefault(); onSave(fields); }}>
          <div className="admin-form-grid">
            <div className="field field-full">
              <label>Nombre</label>
              <input value={fields.name} onChange={set("name")} placeholder="Kawasaki Z900" required />
            </div>
            <div className="field">
              <label>Marca</label>
              <input value={fields.brand} onChange={set("brand")} placeholder="Kawasaki" required />
            </div>
            <div className="field">
              <label>Tipo</label>
              <input value={fields.type} onChange={set("type")} placeholder="Naked" required />
            </div>
            <div className="field">
              <label>Año</label>
              <input type="number" value={fields.year} onChange={set("year")} required />
            </div>
            <div className="field">
              <label>Kilómetros</label>
              <input type="number" value={fields.km} onChange={set("km")} required />
            </div>
            <div className="field">
              <label>Precio (€)</label>
              <input type="number" value={fields.price} onChange={set("price")} required />
            </div>
            <div className="field">
              <label>Carnet</label>
              <select value={fields.license} onChange={set("license")}>
                <option value="A1">A1</option>
                <option value="A2">A2</option>
                <option value="A">A</option>
              </select>
            </div>
            <div className="field">
              <label>Cilindrada (cc)</label>
              <input type="number" value={fields.cc} onChange={set("cc")} required />
            </div>
            <div className="field">
              <label>Potencia (CV)</label>
              <input type="number" value={fields.cv} onChange={set("cv")} required />
            </div>
            <div className="field">
              <label>Color</label>
              <input value={fields.color} onChange={set("color")} placeholder="Verde lima" />
            </div>
            <div className="field field-full">
              <label>Etiqueta (opcional)</label>
              <input value={fields.tag} onChange={set("tag")} placeholder="Recién entrada, Top ventas..." />
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

function InventoryTable({ bikes, onEdit, onDelete }) {
  if (bikes.length === 0) {
    return <div className="admin-table-wrap"><div className="admin-empty">Todavía no hay motos. Añade la primera.</div></div>;
  }
  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Moto</th><th>Marca</th><th>Tipo</th><th>Año</th><th>KM</th>
            <th>Precio</th><th>Carnet</th><th>Etiqueta</th><th></th>
          </tr>
        </thead>
        <tbody>
          {bikes.map((b) => (
            <tr key={b.id}>
              <td>{b.name}</td>
              <td>{b.brand}</td>
              <td>{b.type}</td>
              <td>{b.year}</td>
              <td>{b.km.toLocaleString("es-ES")}</td>
              <td className="price">{b.price.toLocaleString("es-ES")} €</td>
              <td>{b.license}</td>
              <td>{b.tag || "—"}</td>
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

function LoginScreen({ client }) {
  const [email, setEmail] = aUseState("");
  const [password, setPassword] = aUseState("");
  const [error, setError] = aUseState("");
  const [busy, setBusy] = aUseState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const { error } = await client.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) setError("Email o contraseña incorrectos.");
  }

  return (
    <div className="admin-login-wrap">
      <div className="admin-login-card">
        <div className="nav-logo">
          <span className="mark">S</span>
          <span>SOWI<span className="orange">MOTOR</span> · ADMIN</span>
        </div>
        {error && <div className="admin-error" style={{ marginBottom: 14 }}>{error}</div>}
        <form onSubmit={submit}>
          <div className="field">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
          </div>
          <div className="field">
            <label>Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-orange" disabled={busy}>
            {busy ? "Entrando…" : "Iniciar sesión"}
          </button>
        </form>
      </div>
    </div>
  );
}

function SetupNeeded() {
  return (
    <div className="admin-setup-note">
      <div className="nav-logo" style={{ justifyContent: "center", marginBottom: 20 }}>
        <span className="mark">S</span>
        <span>SOWI<span className="orange">MOTOR</span> · ADMIN</span>
      </div>
      <p>
        El panel de administración todavía no está conectado a una base de datos.
        Completa <code>supabase-config.js</code> con la URL y la clave de tu
        proyecto de Supabase (ver <code>SETUP.md</code>) y recarga esta página.
      </p>
    </div>
  );
}

function AdminApp() {
  const client = window.SowiInventory && window.SowiInventory.client;
  const [session, setSession] = aUseState(undefined); // undefined = checking, null = signed out
  const [bikes, setBikes] = aUseState([]);
  const [loadError, setLoadError] = aUseState("");
  const [modal, setModal] = aUseState(null); // null | {} (new) | bike (edit)
  const [saving, setSaving] = aUseState(false);
  const [saveError, setSaveError] = aUseState("");

  aUseEffect(() => {
    if (!client) return;
    client.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = client.auth.onAuthStateChange((_event, sess) => setSession(sess));
    return () => sub.subscription.unsubscribe();
  }, [client]);

  async function loadBikes() {
    setLoadError("");
    const { data, error } = await client.from("bikes").select("*").order("created_at", { ascending: true });
    if (error) setLoadError(error.message);
    else setBikes(data);
  }

  aUseEffect(() => { if (session) loadBikes(); }, [session]);

  async function handleSave(fields) {
    setSaving(true);
    setSaveError("");
    const row = fieldsToRow(fields);
    const result = modal.id
      ? await client.from("bikes").update(row).eq("id", modal.id)
      : await client.from("bikes").insert({ ...row, id: crypto.randomUUID() });
    setSaving(false);
    if (result.error) { setSaveError(result.error.message); return; }
    setModal(null);
    loadBikes();
  }

  async function handleDelete(bike) {
    if (!confirm(`¿Eliminar "${bike.name}" del inventario? Esta acción no se puede deshacer.`)) return;
    const { error } = await client.from("bikes").delete().eq("id", bike.id);
    if (error) { alert("No se pudo eliminar: " + error.message); return; }
    loadBikes();
  }

  if (!window.SowiInventory || !window.SowiInventory.isConfigured) return <SetupNeeded />;
  if (session === undefined) return null;
  if (!session) return <LoginScreen client={client} />;

  return (
    <div className="admin-shell">
      <div className="admin-topbar">
        <div className="nav-logo">
          <span className="mark">S</span>
          <span>SOWI<span className="orange">MOTOR</span> · ADMIN</span>
        </div>
        <div className="admin-topbar-right">
          <span className="admin-user-email">{session.user.email}</span>
          <button className="btn btn-ghost" onClick={() => client.auth.signOut()}>Cerrar sesión</button>
        </div>
      </div>
      <div className="admin-main">
        <div className="admin-header-row">
          <div>
            <h1>Inventario</h1>
            <p className="admin-count">{bikes.length} motos publicadas en la web</p>
          </div>
          <button className="btn btn-orange" onClick={() => setModal({ ...BLANK_BIKE })}>+ Añadir moto</button>
        </div>
        {loadError && <div className="admin-error" style={{ marginBottom: 16 }}>{loadError}</div>}
        <InventoryTable bikes={bikes} onEdit={(b) => setModal({ ...b })} onDelete={handleDelete} />
      </div>
      {modal && (
        <BikeForm
          initial={modal}
          saving={saving}
          error={saveError}
          onCancel={() => { setModal(null); setSaveError(""); }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("admin-root")).render(<AdminApp />);
