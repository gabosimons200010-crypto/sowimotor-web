// Catalog, Detail, Services and Contact wireframes.

// ── CATALOG ───────────────────────────────────────────────────────
function CatalogPage({ lang }) {
  const t = STR[lang];
  const bikes = [
    ["Kawasaki Z900", "2021", "12.400", "7.490", "Recién entrada"],
    ["Yamaha MT-07", "2020", "18.200", "5.950", null],
    ["Honda CB650R", "2022", "6.800", "8.200", "Garantía 12m"],
    ["Ducati Monster", "2019", "22.500", "9.150", null],
    ["Honda PCX 125", "2021", "9.100", "2.890", "A2"],
    ["Yamaha XSR 700", "2020", "14.300", "6.200", "Top"],
    ["BMW R 1250 GS", "2019", "28.000", "14.500", null],
    ["KTM Duke 390", "2022", "4.500", "4.890", "A2"],
    ["Suzuki GSX-S 750", "2018", "31.000", "5.490", null],
  ];

  return (
    <div className="wf" data-screen-label="Catalog · Motos de Ocasión">
      <Nav lang={lang} active="catalog" />

      <section style={{ padding: "44px 60px 24px", borderBottom: "1.5px solid var(--ink)", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <SectTag>{t.nav.catalog}</SectTag>
          <h1 className="headline" style={{ fontSize: 64, margin: "10px 0 6px" }}>{t.catalog.title}</h1>
          <p className="mono" style={{ fontSize: 12, color: "var(--ink-2)", letterSpacing: "0.08em" }}>{t.catalog.sub}</p>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span className="mono" style={{ fontSize: 11, color: "var(--ink-2)" }}>{t.catalog.results.toUpperCase()}</span>
          <span className="btn">{t.catalog.sort} ↓</span>
        </div>
      </section>

      <section style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 0 }}>
        {/* FILTERS */}
        <aside style={{ padding: "28px 24px 60px", borderRight: "1.5px solid var(--ink)", display: "flex", flexDirection: "column", gap: 14, background: "var(--paper-2)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 className="headline" style={{ fontSize: 18, margin: 0 }}>{t.catalog.filters}</h3>
            <span className="mono" style={{ fontSize: 10, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer" }}>{t.catalog.reset}</span>
          </div>

          <div className="filter-row">
            <h4>{t.catalog.brand}</h4>
            <div>
              {["Honda", "Yamaha", "Kawasaki", "Suzuki", "Ducati", "BMW", "KTM"].map(b => <span key={b} className="filter-chip">{b}</span>)}
            </div>
          </div>

          <div className="filter-row">
            <h4>{t.catalog.type}</h4>
            <div>
              {["Naked", "Scooter", "Trail", "Sport", "Custom", "Touring"].map(b => <span key={b} className={"filter-chip" + (b === "Naked" ? " on" : "")}>{b}</span>)}
            </div>
          </div>

          <div className="filter-row">
            <h4>{t.catalog.price}</h4>
            <div className="ph" style={{ height: 40, marginTop: 4 }}>
              <span className="ph-label">SLIDER · 0 — 20.000€</span>
            </div>
            <div className="row mono" style={{ justifyContent: "space-between", fontSize: 11 }}>
              <span>0€</span><span>20.000€</span>
            </div>
          </div>

          <div className="filter-row">
            <h4>{t.catalog.year}</h4>
            <div className="ph" style={{ height: 40 }}>
              <span className="ph-label">SLIDER · 2010 — 2026</span>
            </div>
          </div>

          <div className="filter-row">
            <h4>{t.catalog.km}</h4>
            <div className="ph" style={{ height: 40 }}>
              <span className="ph-label">SLIDER · KM</span>
            </div>
          </div>

          <div className="filter-row">
            <h4>{lang === "es" ? "Carnet" : "Carnet"}</h4>
            <div>
              {["A1", "A2", "A"].map(b => <span key={b} className="filter-chip">{b}</span>)}
            </div>
          </div>
        </aside>

        {/* GRID */}
        <main style={{ padding: "28px 60px 60px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {bikes.map(([n, y, km, price, tag]) => (
              <BikeCard key={n} name={n} year={y} km={km} price={price} tag={tag} />
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 32 }}>
            {["1", "2", "3", "→"].map(p => (
              <span key={p} className={"btn" + (p === "1" ? " btn-fill" : "")} style={{ minWidth: 40, justifyContent: "center" }}>{p}</span>
            ))}
          </div>
        </main>
      </section>

      <Footer lang={lang} />
    </div>
  );
}

// ── DETAIL ────────────────────────────────────────────────────────
function DetailPage({ lang }) {
  const t = STR[lang];
  return (
    <div className="wf wf-tall" data-screen-label="Detail · Kawasaki Z900">
      <Nav lang={lang} active="catalog" />

      <section style={{ padding: "20px 60px 0" }}>
        <span className="mono" style={{ fontSize: 11, color: "var(--ink-2)", letterSpacing: "0.08em" }}>{t.detail.back}</span>
      </section>

      <section style={{ padding: "20px 60px 40px", display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 32 }}>
        {/* GALLERY */}
        <div>
          <Ph w="100%" h={420} label="FOTO PRINCIPAL · KAWASAKI Z900 · 2021" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8, marginTop: 8 }}>
            {[1, 2, 3, 4, 5].map(i => <Ph key={i} w="100%" h={70} label={`THUMB 0${i}`} x={false} />)}
          </div>
        </div>

        {/* INFO */}
        <div>
          <span className="mono" style={{ fontSize: 11, color: "var(--accent)", letterSpacing: "0.18em" }}>{t.nav.catalog.toUpperCase()}</span>
          <h1 className="headline" style={{ fontSize: 56, margin: "8px 0 4px" }}>Kawasaki Z900</h1>
          <p className="mono" style={{ fontSize: 12, color: "var(--ink-2)", letterSpacing: "0.08em" }}>NAKED · 2021 · 12.400 KM · A2 LIMITABLE</p>

          <div className="headline" style={{ fontSize: 56, color: "var(--accent)", marginTop: 18 }}>7.490 €</div>
          <p className="mono" style={{ fontSize: 12, color: "var(--ink-2)" }}>{t.detail.finance.toUpperCase()}</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 18 }}>
            {[[t.detail.year, "2021"], [t.detail.km, "12.400"], [t.detail.cc, "948 cc"], [t.detail.power, "125 CV"], [t.detail.gearbox, "Manual · 6v"], ["ITV", "OK · 2027"]].map(([k, v]) => (
              <div key={k} className="box" style={{ padding: 10 }}>
                <span className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", color: "var(--ink-2)" }}>{k.toUpperCase()}</span>
                <div className="headline" style={{ fontSize: 18 }}>{v}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 20 }}>
            <span className="btn btn-accent btn-lg">▶ {t.detail.ask}</span>
            <span className="btn btn-lg">{t.detail.reserve}</span>
            <span className="chip-wa" style={{ alignSelf: "flex-start" }}>● WhatsApp · 611 25 76 06</span>
          </div>
        </div>
      </section>

      {/* DESCRIPTION + SPECS */}
      <section style={{ padding: "40px 60px", borderTop: "1.5px solid var(--ink)", borderBottom: "1.5px solid var(--ink)", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 40 }}>
        <div>
          <SectTag>{t.detail.desc}</SectTag>
          <h2 className="headline" style={{ fontSize: 32, margin: "10px 0 12px" }}>
            {lang === "es" ? "Una naked sin fisuras, lista para rodar" : "Una naked sense fissures, llesta per rodar"}
          </h2>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--ink-2)" }}>
            {lang === "es"
              ? "Moto revisada por nuestro taller, neumáticos al 80%, cadena y kit de transmisión recientes. Un solo propietario, libro de mantenimiento al día. Posibilidad de financiación a tu medida y entrega en 48h. Pásate por la nave de Badalona y pruébala."
              : "Moto revisada al nostre taller, pneumàtics al 80%, cadena i kit de transmissió recents. Un sol propietari, llibre de manteniment al dia. Possibilitat de finançament a mida i entrega en 48h. Passa per la nau de Badalona i prova-la."}
          </p>
          <ul style={{ listStyle: "none", padding: 0, marginTop: 18 }}>
            {[
              lang === "es" ? "Revisión completa pre-entrega" : "Revisió completa pre-entrega",
              lang === "es" ? "Garantía 12 meses incluida" : "Garantia 12 mesos inclosa",
              lang === "es" ? "Financiación desde 89€/mes" : "Finançament des de 89€/mes",
              lang === "es" ? "Aceptamos tu moto como pago" : "Acceptem la teva moto com a pagament",
            ].map(b => (
              <li key={b} className="bullet" style={{ marginBottom: 6, fontSize: 14 }}>{b}</li>
            ))}
          </ul>
        </div>
        <div>
          <SectTag>{t.detail.specs}</SectTag>
          <div className="box" style={{ marginTop: 10, padding: 16 }}>
            {[["Marca", "Kawasaki"], ["Modelo", "Z900"], [t.detail.cc, "948 cc"], [t.detail.power, "125 CV"], ["Peso", "212 kg"], [lang === "es" ? "Depósito" : "Dipòsit", "17 L"], ["Color", lang === "es" ? "Verde lima" : "Verd llima"], ["Ref.", "SW-2021-09"]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px dashed var(--muted)", fontSize: 13 }}>
                <span className="mono" style={{ color: "var(--ink-2)", fontSize: 11, letterSpacing: "0.08em" }}>{k.toUpperCase()}</span>
                <span style={{ fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section style={{ padding: "40px 60px" }}>
        <h2 className="headline" style={{ fontSize: 36, margin: "0 0 18px" }}>
          {lang === "es" ? "Otras motos parecidas" : "Altres motos semblants"}
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          <BikeCard name="Yamaha MT-07" year="2020" km="18.200" price="5.950" />
          <BikeCard name="Honda CB650R" year="2022" km="6.800" price="8.200" />
          <BikeCard name="Suzuki GSX-S 750" year="2018" km="31.000" price="5.490" />
          <BikeCard name="KTM Duke 390" year="2022" km="4.500" price="4.890" />
        </div>
      </section>

      <Footer lang={lang} />
    </div>
  );
}

// ── SERVICES ──────────────────────────────────────────────────────
function ServicesPage({ lang }) {
  const t = STR[lang];
  return (
    <div className="wf wf-tall" data-screen-label="Services">
      <Nav lang={lang} active="services" />

      {/* WASH HERO */}
      <section style={{ position: "relative", height: 480, borderBottom: "1.5px solid var(--ink)", background: "var(--ink)", color: "var(--paper)" }}>
        <Ph w="100%" h="100%" label="MOTO LAVADO · ANTES/DESPUÉS · 1920×480" />
        <div className="stripe" />
        <div style={{ position: "absolute", inset: 0, padding: "60px 60px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <span className="mono" style={{ fontSize: 12, letterSpacing: "0.18em", color: "var(--accent)" }}>SERVICIOS / 01</span>
          <h1 className="headline" style={{ fontSize: 110, color: "var(--paper)", textShadow: "2px 2px 0 var(--ink)", margin: "8px 0", maxWidth: 800, lineHeight: 0.95 }}>
            {t.services.wash}
          </h1>
          <p style={{ fontSize: 16, maxWidth: 540, color: "#ddd", textShadow: "0 1px 2px rgba(0,0,0,0.6)" }}>{t.services.washBody}</p>
          <div style={{ marginTop: 20 }}>
            <span className="btn btn-accent btn-lg">{t.services.bookWash} ↗</span>
          </div>
        </div>
      </section>

      {/* PRICE LIST */}
      <section style={{ padding: "56px 60px", borderBottom: "1.5px solid var(--ink)", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 40 }}>
        <div>
          <SectTag>{lang === "es" ? "Tarifas" : "Tarifes"}</SectTag>
          <h2 className="headline" style={{ fontSize: 44, margin: "10px 0 18px" }}>
            {lang === "es" ? "Bueno, bonito y barato" : "Bo, bonic i barat"}
          </h2>
          {[
            ["Lavado básico", "Exterior + secado", "15€"],
            ["Lavado Premium", "Detalles, llantas, cadena lubricada", "29€"],
            ["Detailing completo", "2h · interior carenado, plásticos, cera", "59€"],
            ["Pre-venta express", "Listo para fotos del anuncio", "39€"],
          ].map(([n, sub, p], i) => (
            <div key={n} style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 16, padding: "14px 0", borderBottom: "1px dashed var(--muted)", alignItems: "center" }}>
              <span className="mono" style={{ fontSize: 11, color: "var(--ink-2)" }}>0{i + 1}</span>
              <div>
                <div className="headline" style={{ fontSize: 22 }}>{n}</div>
                <p style={{ margin: "2px 0 0", fontSize: 13, color: "var(--ink-2)" }}>{sub}</p>
              </div>
              <span className="headline" style={{ fontSize: 32, color: "var(--accent)" }}>{p}</span>
            </div>
          ))}
        </div>
        <div>
          <Ph w="100%" h={300} label="PROCESO LAVADO · 4 PASOS" />
          <HandNote top={-8} right={-30} rotate={6} w={170}>
            ¡pregunta por<br />tu BONO de mayo!
          </HandNote>
          <div className="box-fill" style={{ marginTop: 20, padding: 18 }}>
            <span className="mono" style={{ fontSize: 11, color: "var(--accent-2)", letterSpacing: "0.18em" }}>OFERTA MES</span>
            <div className="headline" style={{ fontSize: 26, margin: "6px 0" }}>
              {lang === "es" ? "Bono de regalo de mayo" : "Bo de regal de maig"}
            </div>
            <p style={{ fontSize: 13, color: "#ddd", margin: 0 }}>
              {lang === "es" ? "Pregunta por tu bono al pasar por la nave." : "Pregunta pel teu bo en passar per la nau."}
            </p>
          </div>
        </div>
      </section>

      {/* OTHER SERVICES */}
      <section style={{ padding: "56px 60px", borderBottom: "1.5px solid var(--ink)" }}>
        <SectTag>{lang === "es" ? "Más servicios" : "Més serveis"}</SectTag>
        <h2 className="headline" style={{ fontSize: 44, margin: "10px 0 28px" }}>
          {lang === "es" ? "Todo lo que necesita tu moto" : "Tot el que necessita la teva moto"}
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            [t.home.svc1Title, t.home.svc1Body],
            [t.home.svc3Title, t.home.svc3Body],
            [t.home.svc4Title, t.home.svc4Body],
            [lang === "es" ? "Mantenimiento" : "Manteniment", lang === "es" ? "Cambios de aceite, filtros, neumáticos." : "Canvis d'oli, filtres, pneumàtics."],
            [lang === "es" ? "Pre-ITV" : "Pre-ITV", lang === "es" ? "Te dejamos la moto lista para pasar la ITV." : "Et deixem la moto llesta per passar la ITV."],
            [lang === "es" ? "Financiación" : "Finançament", lang === "es" ? "Hasta 60 meses, primera cuota gratis." : "Fins a 60 mesos, primera quota gratis."],
          ].map(([title, body], i) => (
            <div key={title} className="box" style={{ padding: 22, minHeight: 160 }}>
              <span className="mono" style={{ fontSize: 11, color: "var(--accent)", letterSpacing: "0.12em" }}>0{i + 1}</span>
              <div className="headline" style={{ fontSize: 22, margin: "8px 0 8px" }}>{title}</div>
              <p style={{ fontSize: 13, lineHeight: 1.5, color: "var(--ink-2)", margin: 0 }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer lang={lang} />
    </div>
  );
}

// ── CONTACT ───────────────────────────────────────────────────────
function ContactPage({ lang }) {
  const t = STR[lang];
  return (
    <div className="wf" data-screen-label="Contact · Visítanos">
      <Nav lang={lang} active="contact" />

      <section style={{ padding: "44px 60px 24px", borderBottom: "1.5px solid var(--ink)" }}>
        <SectTag>{t.nav.contact}</SectTag>
        <h1 className="headline" style={{ fontSize: 80, margin: "10px 0 6px", lineHeight: 0.95 }}>{t.contact.title}</h1>
      </section>

      <section style={{ padding: "40px 60px", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 40 }}>
        {/* MAP */}
        <div style={{ position: "relative" }}>
          <Ph w="100%" h={460} label="MAPA · BADALONA · GMAPS EMBED" />
          <HandNote top={20} right={-30} rotate={5} w={160}>aquí ↙ ¡no tiene pérdida!</HandNote>
          <div className="box" style={{ padding: 18, marginTop: 18 }}>
            <div className="headline" style={{ fontSize: 22 }}>SowiMotor</div>
            <p style={{ margin: "6px 0 0", fontSize: 13, lineHeight: 1.5 }}>{t.contact.addr}</p>
          </div>
        </div>

        {/* FORM + INFO */}
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
            <div className="box" style={{ padding: 16 }}>
              <span className="mono" style={{ fontSize: 11, color: "var(--accent)", letterSpacing: "0.12em" }}>{lang === "es" ? "TELÉFONO" : "TELÈFON"}</span>
              <p style={{ margin: "4px 0 0", fontSize: 14, lineHeight: 1.5 }}>930 11 84 82<br />695 18 47 24<br />611 25 76 06</p>
            </div>
            <div className="box" style={{ padding: 16 }}>
              <span className="mono" style={{ fontSize: 11, color: "var(--accent)", letterSpacing: "0.12em" }}>EMAIL</span>
              <p style={{ margin: "4px 0 0", fontSize: 14 }}>sowimotor@gmail.com</p>
              <span className="chip-wa" style={{ marginTop: 10 }}>● WhatsApp</span>
            </div>
            <div className="box" style={{ padding: 16, gridColumn: "span 2" }}>
              <span className="mono" style={{ fontSize: 11, color: "var(--accent)", letterSpacing: "0.12em" }}>{t.home.hours.toUpperCase()}</span>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", marginTop: 8, fontSize: 13 }}>
                <span>{t.home.h1}</span>
                <span>{t.home.h2}</span>
                <span>{t.home.h3}</span>
              </div>
            </div>
          </div>

          <h3 className="headline" style={{ fontSize: 28, margin: "0 0 12px" }}>{t.contact.send}</h3>
          <div className="box" style={{ padding: 18, display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div className="ph" style={{ height: 38, background: "var(--paper)", border: "1.5px solid var(--ink)" }}>
                <span className="ph-label">{t.contact.name.toUpperCase()}</span>
              </div>
              <div className="ph" style={{ height: 38, background: "var(--paper)", border: "1.5px solid var(--ink)" }}>
                <span className="ph-label">EMAIL</span>
              </div>
            </div>
            <div className="ph" style={{ height: 38, background: "var(--paper)", border: "1.5px solid var(--ink)" }}>
              <span className="ph-label">{lang === "es" ? "MOTO DE INTERÉS" : "MOTO D'INTERÈS"}</span>
            </div>
            <div className="ph" style={{ height: 110, background: "var(--paper)", border: "1.5px solid var(--ink)" }}>
              <span className="ph-label">{t.contact.msg.toUpperCase()}</span>
            </div>
            <span className="btn btn-accent btn-lg" style={{ alignSelf: "flex-start" }}>{t.contact.send} →</span>
          </div>
        </div>
      </section>

      <Footer lang={lang} />
    </div>
  );
}

Object.assign(window, { CatalogPage, DetailPage, ServicesPage, ContactPage });
