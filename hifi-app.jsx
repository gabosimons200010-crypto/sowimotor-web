// SowiMotor hi-fi — App shell. Nav + route state + Tweaks.
const { useState: hUseState, useEffect: hUseEffect } = React;

const HIFI_DEFAULTS = /*EDITMODE-BEGIN*/{
  "lang": "es",
  "accent": "#ff6a1a",
  "showStripes": true
}/*EDITMODE-END*/;

function Nav({ lang, setLang, route, go }) {
  const t = HF_STR[lang];
  const [scrolled, setScrolled] = hUseState(false);
  const [menuOpen, setMenuOpen] = hUseState(false);
  hUseEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const items = [
    ["home", t.nav.home],
    ["catalog", t.nav.catalog],
    ["services", t.nav.services],
    ["contact", t.nav.contact],
  ];
  // on mobile the links live in a drop-down; picking one closes it
  const navigate = (k) => { setMenuOpen(false); go(k); };
  return (
    <nav className={"nav" + (scrolled ? " scrolled" : "")}>
      <div className="nav-logo" onClick={() => navigate("home")}>
        <span className="mark">S</span>
        <span>SOWI<span className="orange">MOTOR</span></span>
      </div>
      <div className={"nav-links" + (menuOpen ? " open" : "")}>
        {items.map(([k, l]) => (
          <button key={k} className={route === k ? "active" : ""} onClick={() => navigate(k)}>{l}</button>
        ))}
        <a className="nav-menu-call" href="tel:930118482">● 930 118 482</a>
      </div>
      <div className="nav-right">
        <a className="chip chip-wa compact nav-phone" href="tel:930118482">● 930 118 482</a>
        <div className="lang-toggle">
          <button className={lang === "es" ? "on" : ""} onClick={() => setLang("es")}>ES</button>
          <button className={lang === "ca" ? "on" : ""} onClick={() => setLang("ca")}>CA</button>
        </div>
        <button
          className="nav-burger"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {menuOpen
              ? <><line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" /></>
              : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>}
          </svg>
        </button>
      </div>
    </nav>
  );
}

function Footer({ lang }) {
  const t = HF_STR[lang];
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <div className="nav-logo" style={{ marginBottom: 12 }}>
            <span className="mark">S</span>
            <span>SOWI<span className="orange">MOTOR</span></span>
          </div>
          <p style={{ maxWidth: 320 }}>{t.foot.tag}</p>
          <p className="text-orange" style={{ fontWeight: 700, marginTop: 12 }}><Stars /> 5,0 · 53 {lang === "ca" ? "ressenyes" : "reseñas"}</p>
        </div>
        <div>
          <h5>{t.foot.visit}</h5>
          <p style={{ whiteSpace: "pre-line" }}>{HF_STR[lang].home.visitAddr}</p>
        </div>
        <div>
          <h5>{t.foot.contact}</h5>
          <p>930 118 482</p>
          <p>611 257 606</p>
          <p>sowimotor@gmail.com</p>
        </div>
        <div>
          <h5>{t.foot.follow}</h5>
          <p><a href="https://instagram.com/Sowimotor" target="_blank" rel="noreferrer">Instagram @sowimotor</a></p>
          <p><a href="https://tiktok.com/@Sowimotor" target="_blank" rel="noreferrer">TikTok @sowimotor</a></p>
          <p><a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook · Vivi sowi</a></p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>{t.foot.legal}</span>
        <span>Badalona · Barcelona</span>
      </div>
    </footer>
  );
}

function App() {
  const [tweaks, setTweak] = (typeof useTweaks === "function")
    ? useTweaks(HIFI_DEFAULTS)
    : [HIFI_DEFAULTS, () => {}];

  const [route, setRoute] = hUseState("home");
  const [bikeId, setBikeId] = hUseState(BIKES[0].id);
  const lang = tweaks.lang || "es";

  // Live inventory: BIKES is a shared global array (hifi-data.jsx). When
  // SowiInventory pulls fresh rows from Supabase it mutates that array in
  // place, so we just need to force a re-render for the new data to show.
  const [, bumpInventory] = hUseState(0);
  hUseEffect(() => {
    if (!window.SowiInventory) return;
    const unsubscribe = window.SowiInventory.subscribe(() => bumpInventory((v) => v + 1));
    window.SowiInventory.refresh();
    return unsubscribe;
  }, []);

  const go = (r, id) => {
    setRoute(r);
    if (id) setBikeId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // accent live
  hUseEffect(() => {
    document.documentElement.style.setProperty("--orange", tweaks.accent || "#ff6a1a");
  }, [tweaks.accent]);

  hUseEffect(() => {
    document.documentElement.style.setProperty("--stripes-display", tweaks.showStripes ? "block" : "none");
  }, [tweaks.showStripes]);

  return (
    <>
      <Nav lang={lang} setLang={(l) => setTweak("lang", l)} route={route} go={go} />
      <main className="page">
        {route === "home" && <Home lang={lang} go={go} />}
        {route === "catalog" && <Catalog lang={lang} go={go} />}
        {route === "detail" && <Detail lang={lang} bikeId={bikeId} go={go} />}
        {route === "services" && <Services lang={lang} go={go} />}
        {route === "contact" && <Contact lang={lang} />}
      </main>
      <Footer lang={lang} />

      {window.SowiInventory && window.SowiInventory.isDemo && (
        <a className="demo-badge" href="admin.html">
          <span className="demo-badge-dot" />
          Gestiona tu inventario →
        </a>
      )}

      <a className="fab-wa" href="https://api.whatsapp.com/send?phone=34611257606" target="_blank" rel="noreferrer" title="WhatsApp">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M20.52 3.48A11.94 11.94 0 0 0 12.04 0C5.46 0 .12 5.34.12 11.92c0 2.1.55 4.16 1.6 5.97L0 24l6.27-1.65a11.9 11.9 0 0 0 5.77 1.47h.01c6.58 0 11.92-5.34 11.92-11.92 0-3.18-1.24-6.18-3.45-8.42zM12.05 21.8h-.01a9.86 9.86 0 0 1-5.03-1.38l-.36-.21-3.72.98 1-3.62-.24-.37a9.85 9.85 0 0 1-1.51-5.28c0-5.46 4.44-9.9 9.9-9.9 2.65 0 5.13 1.03 7 2.9a9.86 9.86 0 0 1 2.9 7c0 5.46-4.44 9.9-9.9 9.9zm5.43-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15s-.77.97-.94 1.17c-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.21 5.08 4.5.71.3 1.27.49 1.7.62.71.22 1.36.19 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35z"/></svg>
      </a>

      {window.TweaksPanel && (
        <TweaksPanel>
          <TweakSection title={lang === "ca" ? "Idioma" : "Idioma"}>
            <TweakRadio value={lang} onChange={(v) => setTweak("lang", v)} options={[{ label: "ES", value: "es" }, { label: "CA", value: "ca" }]} />
          </TweakSection>
          <TweakSection title={lang === "ca" ? "Acent" : "Acento"}>
            <TweakColor
              value={tweaks.accent}
              onChange={(v) => setTweak("accent", v)}
              options={["#ff6a1a", "#e63946", "#f4b400", "#4ade80"]}
            />
          </TweakSection>
          <TweakSection title={lang === "ca" ? "Detalls" : "Detalles"}>
            <TweakToggle
              label={lang === "ca" ? "Franges hero" : "Franjas hero"}
              value={tweaks.showStripes}
              onChange={(v) => setTweak("showStripes", v)}
            />
          </TweakSection>
          <TweakSection title={lang === "ca" ? "Saltar a" : "Ir a"}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
              {[["home","Home"],["catalog","Catálogo"],["services","Servicios"],["contact","Contacto"]].map(([k,l]) => (
                <button key={k} className={"filter-chip" + (route === k ? " on" : "")} onClick={() => go(k)}>{l}</button>
              ))}
            </div>
          </TweakSection>
        </TweaksPanel>
      )}
    </>
  );
}

ReactDOM.createRoot(document.getElementById("hifi-root")).render(<App />);
