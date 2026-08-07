// Main app — DesignCanvas with all wireframes + Tweaks panel.

const { useState: useStateApp } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "lang": "es",
  "sketchy": "mid",
  "density": "normal",
  "accent": "#d96a3c"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // accent override
  React.useEffect(() => {
    document.documentElement.style.setProperty("--accent", t.accent);
  }, [t.accent]);

  const wfAttrs = {
    "data-sketchy": t.sketchy,
    "data-density": t.density,
  };

  // wrapper that injects sketchy/density attrs onto every .wf inside it
  const Inject = ({ children }) => (
    <div ref={(el) => {
      if (!el) return;
      el.querySelectorAll(".wf").forEach(wf => {
        wf.setAttribute("data-sketchy", t.sketchy);
        wf.setAttribute("data-density", t.density);
      });
    }}>{children}</div>
  );

  const lang = t.lang;

  return (
    <React.Fragment>
      <DesignCanvas>

        <DCSection id="home" title={lang === "es" ? "Inicio · 3 direcciones" : "Inici · 3 direccions"} subtitle={lang === "es" ? "V1 Velocidad · V2 Barrio · V3 Catálogo" : "V1 Velocitat · V2 Barri · V3 Catàleg"}>
          <DCArtboard id="home-v1" label="V1 · Velocidad (sporty)" width={1280} height={2200}>
            <Inject><HomeVelocidad lang={lang} /></Inject>
          </DCArtboard>
          <DCArtboard id="home-v2" label="V2 · Barrio (local & friendly)" width={1280} height={2200}>
            <Inject><HomeBarrio lang={lang} /></Inject>
          </DCArtboard>
          <DCArtboard id="home-v3" label="V3 · Catálogo-first" width={1280} height={2200}>
            <Inject><HomeCatalogo lang={lang} /></Inject>
          </DCArtboard>
          <DCArtboard id="home-v4" label="V4 · TRACK MODE — full bad ass" width={1280} height={2400}>
            <Inject><HomeTrack lang={lang} /></Inject>
          </DCArtboard>
        </DCSection>

        <DCSection id="catalog" title={lang === "es" ? "Catálogo · Motos de Ocasión" : "Catàleg · Motos d'Ocasió"} subtitle={lang === "es" ? "Grid + filtros laterales" : "Grid + filtres laterals"}>
          <DCArtboard id="catalog-1" label={lang === "es" ? "Listado con filtros" : "Llistat amb filtres"} width={1280} height={1600}>
            <Inject><CatalogPage lang={lang} /></Inject>
          </DCArtboard>
          <DCArtboard id="detail-1" label={lang === "es" ? "Detalle de moto" : "Detall de moto"} width={1280} height={2200}>
            <Inject><DetailPage lang={lang} /></Inject>
          </DCArtboard>
        </DCSection>

        <DCSection id="services" title={lang === "es" ? "Servicios" : "Serveis"} subtitle={lang === "es" ? "Lavado · taller · gestión de venta · alquiler" : "Rentat · taller · gestió de venda · lloguer"}>
          <DCArtboard id="services-1" label={lang === "es" ? "Servicios — lavado destacado" : "Serveis — rentat destacat"} width={1280} height={2200}>
            <Inject><ServicesPage lang={lang} /></Inject>
          </DCArtboard>
        </DCSection>

        <DCSection id="contact" title={lang === "es" ? "Contacto · Visita" : "Contacte · Visita"} subtitle={lang === "es" ? "Mapa, formulario, horarios" : "Mapa, formulari, horaris"}>
          <DCArtboard id="contact-1" label={lang === "es" ? "Página de contacto" : "Pàgina de contacte"} width={1280} height={1600}>
            <Inject><ContactPage lang={lang} /></Inject>
          </DCArtboard>
        </DCSection>

      </DesignCanvas>

      <TweaksPanel title="Tweaks">
        <TweakSection label={lang === "es" ? "Idioma" : "Idioma"}>
          <TweakRadio
            label={lang === "es" ? "ES / CA" : "ES / CA"}
            value={t.lang}
            onChange={(v) => setTweak("lang", v)}
            options={[
              { value: "es", label: "Español" },
              { value: "ca", label: "Català" },
            ]}
          />
        </TweakSection>

        <TweakSection label={lang === "es" ? "Estilo" : "Estil"}>
          <TweakRadio
            label={lang === "es" ? "Nivel sketch" : "Nivell sketch"}
            value={t.sketchy}
            onChange={(v) => setTweak("sketchy", v)}
            options={[
              { value: "mid", label: "Mid-fi" },
              { value: "high", label: "Sketchy" },
            ]}
          />
          <TweakColor
            label={lang === "es" ? "Color de acento" : "Color d'accent"}
            value={t.accent}
            onChange={(v) => setTweak("accent", v)}
            options={["#d96a3c", "#1a1a1a", "#2f6fdb", "#1f8a5b"]}
          />
        </TweakSection>

        <TweakSection label={lang === "es" ? "Densidad" : "Densitat"}>
          <TweakRadio
            label={lang === "es" ? "Densidad de cards" : "Densitat de cards"}
            value={t.density}
            onChange={(v) => setTweak("density", v)}
            options={[
              { value: "tight", label: "Tight" },
              { value: "normal", label: "Normal" },
              { value: "loose", label: "Loose" },
            ]}
          />
        </TweakSection>
      </TweaksPanel>
    </React.Fragment>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
