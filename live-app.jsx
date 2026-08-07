// Live prototype shell — navigable single-page site.
// Reuses Home/Catalog/Detail/Services/Contact components.
// Hash routing: #home-v1, #home-v2, #home-v3, #home-v4,
//               #catalog, #detail, #services, #contact

const TWEAK_DEFAULTS_LIVE = /*EDITMODE-BEGIN*/{
  "lang": "es",
  "home": "v4",
  "accent": "#ff6a1a"
}/*EDITMODE-END*/;

function useHashRoute(initial = "home") {
  const [route, setRoute] = React.useState(() => (location.hash || "#" + initial).slice(1));
  React.useEffect(() => {
    const onHash = () => {
      setRoute((location.hash || "#" + initial).slice(1));
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return route;
}

function LiveApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS_LIVE);
  React.useEffect(() => {
    document.documentElement.style.setProperty("--accent", t.accent);
  }, [t.accent]);

  const route = useHashRoute("home");
  const lang = t.lang;

  // Intercept nav clicks inside our rendered pages: convert nav-links into
  // hash navigation so the user can click around like a real site.
  React.useEffect(() => {
    const onClick = (e) => {
      const span = e.target.closest(".nav-links span, .nav-logo, .btn, a");
      if (!span) return;
      const root = e.target.closest(".wf");
      if (!root) return;
      const text = (span.textContent || "").trim().toLowerCase();
      const map = {
        // ES
        "inicio": "home",
        "motos de ocasión": "catalog",
        "motos de ocasion": "catalog",
        "alquiler": "catalog",
        "servicios": "services",
        "sobre nosotros": "services",
        "contacto": "contact",
        "ver motos en venta": "catalog",
        "ver todo el stock": "catalog",
        "reservar lavado": "services",
        "sowimotor": "home",
        // CA
        "inici": "home",
        "motos d'ocasió": "catalog",
        "lloguer": "catalog",
        "serveis": "services",
        "qui som": "services",
        "contacte": "contact",
        "veure motos en venda": "catalog",
        "veure tot l'estoc": "catalog",
        "reservar rentat": "services",
      };
      // Click on a bike card → detail
      const card = e.target.closest(".card");
      if (card && route !== "detail") {
        e.preventDefault();
        location.hash = "#detail";
        return;
      }
      const dest = map[text];
      if (dest) {
        e.preventDefault();
        location.hash = "#" + dest;
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [route]);

  // Pick which home variant
  const Home = { v1: HomeVelocidad, v2: HomeBarrio, v3: HomeCatalogo, v4: HomeTrack }[t.home] || HomeTrack;

  let page;
  if (route === "catalog") page = <CatalogPage lang={lang} />;
  else if (route === "detail") page = <DetailPage lang={lang} />;
  else if (route === "services") page = <ServicesPage lang={lang} />;
  else if (route === "contact") page = <ContactPage lang={lang} />;
  else page = <Home lang={lang} />;

  // Wrap page so it scales to viewport width like a real responsive site
  return (
    <React.Fragment>
      <div className="live-wrap">
        <div className="live-stage">
          {page}
        </div>
      </div>

      {/* floating language switch — always visible, real-site style */}
      <div className="live-lang">
        <button className={lang === "es" ? "on" : ""} onClick={() => setTweak("lang", "es")}>ES</button>
        <button className={lang === "ca" ? "on" : ""} onClick={() => setTweak("lang", "ca")}>CA</button>
      </div>

      <TweaksPanel title="Tweaks">
        <TweakSection label={lang === "es" ? "Idioma" : "Idioma"}>
          <TweakRadio
            label="ES / CA"
            value={t.lang}
            onChange={(v) => setTweak("lang", v)}
            options={[{ value: "es", label: "Español" }, { value: "ca", label: "Català" }]}
          />
        </TweakSection>
        <TweakSection label={lang === "es" ? "Variante de Home" : "Variant d'Inici"}>
          <TweakSelect
            label="Home"
            value={t.home}
            onChange={(v) => setTweak("home", v)}
            options={[
              { value: "v4", label: "V4 · Track Mode" },
              { value: "v1", label: "V1 · Velocidad" },
              { value: "v2", label: "V2 · Barrio" },
              { value: "v3", label: "V3 · Catálogo" },
            ]}
          />
        </TweakSection>
        <TweakSection label={lang === "es" ? "Color de acento" : "Color d'accent"}>
          <TweakColor
            label="Accent"
            value={t.accent}
            onChange={(v) => setTweak("accent", v)}
            options={["#ff6a1a", "#e23b1f", "#f5b400", "#22c55e"]}
          />
        </TweakSection>
      </TweaksPanel>
    </React.Fragment>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<LiveApp />);
