// Three home page wireframe variations for SowiMotor.
// V1 "Velocidad" — sporty/adrenaline editorial hero, racing stripes
// V2 "Barrio"    — local & friendly, map-forward, warm and handcrafted
// V3 "Catálogo"  — inventory-first hybrid, gets you to bikes fast

// ── HOME V1 — Velocidad (BADASS) ──────────────────────────────────
function HomeVelocidad({ lang }) {
  const t = STR[lang];
  return (
    <div className="wf wf-tall" data-screen-label="Home · V1 Velocidad" data-mode="track">
      <Nav lang={lang} active="home" />

      {/* HERO — brutal italic headline, motorsport plate */}
      <section style={{ position: "relative", height: 760, borderBottom: "2px solid var(--ink)", overflow: "hidden" }}>
        <Ph w="100%" h="100%" label="HERO · MOTO RUGIENDO · 1920×900" />
        <div className="stripe" style={{ opacity: 0.32 }} />
        <div style={{ position: "absolute", left: 60, top: 70, right: 60 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
            <span className="plate">SOWI · 08912 · BDN</span>
            <span className="mono" style={{ fontSize: 11, color: "var(--ink)", letterSpacing: "0.18em", textShadow: "0 1px 2px rgba(0,0,0,0.6)" }}>EST. 2018 — RIDE FAST, RIDE FAIR</span>
          </div>
          <h1 className="headline italic-tight" style={{ fontSize: 188, margin: "0 0 -8px", color: "var(--ink)", textShadow: "3px 3px 0 #000, -1px 0 0 #000", fontStyle: "italic", letterSpacing: "-0.02em" }}>
            {t.hero.title1.toUpperCase()}
          </h1>
          <h1 className="headline italic-tight" style={{ fontSize: 188, margin: 0, color: "var(--accent)", textShadow: "3px 3px 0 #000", fontStyle: "italic", letterSpacing: "-0.02em" }}>
            {t.hero.title2.toUpperCase()}
          </h1>
          <p style={{ fontSize: 17, color: "var(--ink)", maxWidth: 560, marginTop: 24, textShadow: "0 1px 2px rgba(0,0,0,0.7)", lineHeight: 1.45 }}>
            {t.hero.sub}
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
            <span className="btn btn-accent btn-lg">▶ {t.hero.cta1}</span>
            <span className="btn btn-lg" style={{ background: "transparent", color: "var(--ink)", borderColor: "var(--ink)" }}>{t.hero.cta3} ↗</span>
          </div>
        </div>
        <HandNote top={140} right={60} rotate={4} w={180}>
          ¡que ruja!<br />moto agresiva 🔥
        </HandNote>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "16px 60px", background: "rgba(0,0,0,0.7)", color: "var(--ink)", borderTop: "2px solid var(--accent)" }}>
            <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
              <Stars />
              <span className="mono" style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>5,0 / 53 GOOGLE</span>
              <span className="mono" style={{ fontSize: 12, letterSpacing: "0.1em", color: "var(--accent)", textTransform: "uppercase" }}>● ABIERTO HOY</span>
            </div>
            <span className="mono" style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>WHATSAPP · 611 25 76 06 ↗</span>
          </div>
          <div className="flag" />
        </div>
      </section>

      {/* BIG STATS BAND */}
      <section style={{ background: "var(--ink)", color: "var(--paper)", padding: "32px 60px", borderBottom: "2px solid var(--ink)", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>
        {[["+120", lang === "es" ? "MOTOS VENDIDAS" : "MOTOS VENUDES"],
          ["5,0★", lang === "es" ? "53 RESEÑAS" : "53 RESSENYES"],
          ["48H", lang === "es" ? "ENTREGA EXPRESS" : "ENTREGA EXPRÉS"],
          ["12M", lang === "es" ? "GARANTÍA" : "GARANTIA"]].map(([n, l], i) => (
          <div key={l} style={{ borderLeft: i ? "1px solid #444" : "none", padding: "0 24px" }}>
            <div className="stat-num" style={{ color: "var(--accent)" }}>{n}</div>
            <div className="mono" style={{ fontSize: 11, letterSpacing: "0.16em", marginTop: 4 }}>{l}</div>
          </div>
        ))}
      </section>

      {/* FEATURED BIKES */}
      <section style={{ padding: "56px 60px", borderBottom: "2px solid var(--ink)" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 24 }}>
          <div>
            <span className="plate">02 — STOCK</span>
            <h2 className="headline italic-tight" style={{ fontSize: 80, margin: "10px 0 4px", fontStyle: "italic" }}>{t.home.featured.toUpperCase()}</h2>
            <p className="mono" style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-2)" }}>{t.home.featuredSub}</p>
          </div>
          <span className="btn btn-accent btn-lg">{t.home.seeAll} →</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          <BikeCard name="Kawasaki Z900" year="2021" km="12.400" price="7.490" tag="Recién entrada" />
          <BikeCard name="Yamaha MT-07" year="2020" km="18.200" price="5.950" />
          <BikeCard name="Honda CB650R" year="2022" km="6.800" price="8.200" tag="Garantía 12m" />
          <BikeCard name="Ducati Monster" year="2019" km="22.500" price="9.150" />
        </div>
      </section>

      {/* SERVICES STRIP */}
      <section style={{ padding: "56px 60px", borderBottom: "1.5px solid var(--ink)", background: "var(--paper-2)" }}>
        <SectTag>03 / Servicios</SectTag>
        <h2 className="headline" style={{ fontSize: 56, margin: "10px 0 32px" }}>{t.home.services}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {[["01", t.home.svc1Title, t.home.svc1Body],
            ["02", t.home.svc2Title, t.home.svc2Body],
            ["03", t.home.svc3Title, t.home.svc3Body],
            ["04", t.home.svc4Title, t.home.svc4Body]].map(([n, title, body]) => (
            <div key={n} className="box" style={{ padding: 18, minHeight: 180 }}>
              <span className="mono" style={{ fontSize: 11, color: "var(--accent)", letterSpacing: "0.12em" }}>{n}</span>
              <div className="headline" style={{ fontSize: 22, margin: "8px 0 10px" }}>{title}</div>
              <p style={{ fontSize: 13, color: "var(--ink-2)", margin: 0, lineHeight: 1.45 }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SELL YOUR BIKE BAND */}
      <section style={{ padding: "44px 60px", borderBottom: "1.5px solid var(--ink)", display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 32, alignItems: "center", background: "var(--ink)", color: "var(--paper)" }}>
        <div>
          <span className="sect-tag" style={{ background: "transparent", color: "var(--paper)", borderColor: "var(--paper)" }}>04 / Vende</span>
          <h2 className="headline" style={{ fontSize: 64, margin: "12px 0 8px" }}>
            {t.home.sellTitle}
          </h2>
          <p style={{ maxWidth: 580, fontSize: 15, color: "#ddd" }}>{t.home.sellBody}</p>
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
          <span className="btn btn-accent btn-lg">{t.home.sellCta} →</span>
        </div>
      </section>

      {/* REVIEWS + VISIT */}
      <section style={{ padding: "56px 60px", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 40 }}>
        <div>
          <SectTag>05 / Reseñas</SectTag>
          <h2 className="headline" style={{ fontSize: 56, margin: "10px 0 6px" }}>{t.home.reviewsTitle}</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <Stars /><span className="mono" style={{ fontSize: 12 }}>{t.home.reviewsSub}</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {["Jordi Rebull", "Smith Herrera", "Juanlu Carvajal", "Ana M."].map((n, i) => (
              <div key={n} className="box" style={{ padding: 14 }}>
                <Stars />
                <p style={{ fontSize: 12, lineHeight: 1.45, margin: "6px 0 8px" }}>
                  {lang === "es"
                    ? "Excelente servicio y atención. Recomendado 100%, Wilson un crack."
                    : "Servei excel·lent i atenció. Recomanat 100%, Wilson un crack."}
                </p>
                <span className="mono" style={{ fontSize: 10, letterSpacing: "0.08em", color: "var(--ink-2)" }}>{n.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <SectTag>06 / Visita</SectTag>
          <h2 className="headline" style={{ fontSize: 36, margin: "10px 0 8px" }}>{t.home.visit}</h2>
          <p className="mono" style={{ fontSize: 12, letterSpacing: "0.06em", color: "var(--ink-2)" }}>{t.home.visitSub}</p>
          <Ph w="100%" h={220} label="MAPA · BADALONA · GMAPS EMBED" style={{ marginTop: 14 }} />
          <div className="box" style={{ marginTop: 14, padding: 14 }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: "0.12em", color: "var(--accent)" }}>{t.home.hours.toUpperCase()}</div>
            <p style={{ margin: "6px 0 0", fontSize: 13 }}>{t.home.h1}</p>
            <p style={{ margin: 0, fontSize: 13 }}>{t.home.h2}</p>
            <p style={{ margin: 0, fontSize: 13 }}>{t.home.h3}</p>
          </div>
        </div>
      </section>

      <Footer lang={lang} />
    </div>
  );
}

// ── HOME V2 — Barrio (local & friendly) ───────────────────────────
function HomeBarrio({ lang }) {
  const t = STR[lang];
  return (
    <div className="wf wf-tall" data-screen-label="Home · V2 Barrio">
      <Nav lang={lang} active="home" />

      {/* HERO — split, with shop photo + warm headline */}
      <section style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr", borderBottom: "1.5px solid var(--ink)", background: "var(--paper-2)" }}>
        <div style={{ padding: "70px 60px 60px" }}>
          <span className="note" style={{ fontSize: 22 }}>↓ pasa a saludar a Wilson ✦</span>
          <h1 className="headline" style={{ fontSize: 110, margin: "12px 0 6px", lineHeight: 0.92 }}>
            {t.hero.title1}<br />
            <span style={{ color: "var(--accent)" }}>{t.hero.title2}</span>
          </h1>
          <p style={{ fontSize: 16, maxWidth: 520, marginTop: 20, lineHeight: 1.5 }}>
            {t.hero.sub}
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 24, flexWrap: "wrap" }}>
            <span className="btn btn-fill btn-lg">{t.hero.cta1}</span>
            <span className="btn btn-lg">{t.hero.cta3} ↗</span>
          </div>
          <div style={{ marginTop: 36, display: "flex", gap: 24, alignItems: "center" }}>
            <Stars />
            <span className="mono" style={{ fontSize: 12 }}>5,0 / 53 reseñas</span>
            <span className="mono" style={{ fontSize: 12, color: "var(--ink-2)" }}>· Badalona desde 2018</span>
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <Ph w="100%" h="100%" label="FACHADA TIENDA · BADALONA" />
          <HandNote top={40} left={20} rotate={-5}>
            ¡este es Sowi!<br />nuestra nave 🛵
          </HandNote>
        </div>
      </section>

      {/* SERVICES — pill row */}
      <section style={{ padding: "44px 60px", borderBottom: "1.5px solid var(--ink)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 className="headline" style={{ fontSize: 44, margin: 0 }}>{t.home.services}</h2>
          <span className="mono" style={{ fontSize: 11, color: "var(--ink-2)", letterSpacing: "0.1em" }}>04 — SERVICIOS</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 14 }}>
          {[
            ["🏍", t.home.svc1Title, t.home.svc1Body],
            ["✦", t.home.svc2Title, t.home.svc2Body],
            ["⟳", t.home.svc3Title, t.home.svc3Body],
            ["⌂", t.home.svc4Title, t.home.svc4Body],
          ].map(([icon, title, body]) => (
            <div key={title} className="box" style={{ padding: 18, position: "relative" }}>
              <div className="headline" style={{ fontSize: 30, color: "var(--accent)" }}>{icon}</div>
              <div className="headline" style={{ fontSize: 20, margin: "8px 0 6px" }}>{title}</div>
              <p style={{ fontSize: 12.5, color: "var(--ink-2)", margin: 0, lineHeight: 1.45 }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WASH FOCUS — full-bleed band */}
      <section style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", borderBottom: "1.5px solid var(--ink)" }}>
        <div style={{ position: "relative" }}>
          <Ph w="100%" h={460} label="MOTO RECIÉN LAVADA · ANTES / DESPUÉS" />
          <HandNote bottom={24} left={24} rotate={-2} w={170}>
            ¡como nueva!
          </HandNote>
        </div>
        <div style={{ padding: "60px 60px", display: "flex", flexDirection: "column", justifyContent: "center", background: "var(--ink)", color: "var(--paper)" }}>
          <span className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", color: "var(--accent)" }}>SERVICIO ESTRELLA</span>
          <h2 className="headline" style={{ fontSize: 76, margin: "8px 0 12px", lineHeight: 0.95 }}>
            {t.services.wash}
          </h2>
          <p style={{ fontSize: 15, maxWidth: 480, color: "#ddd", lineHeight: 1.5 }}>
            {t.services.washBody}
          </p>
          <div style={{ marginTop: 22 }}>
            <span className="btn btn-accent btn-lg">{t.services.bookWash} ↗</span>
          </div>
        </div>
      </section>

      {/* FEATURED + REVIEWS — alternating */}
      <section style={{ padding: "56px 60px", borderBottom: "1.5px solid var(--ink)" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 20 }}>
          <h2 className="headline" style={{ fontSize: 44, margin: 0 }}>{t.home.featured}</h2>
          <span className="btn">{t.home.seeAll} →</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          <BikeCard name="Honda PCX 125" year="2021" km="9.100" price="2.890" />
          <BikeCard name="Yamaha XSR 700" year="2020" km="14.300" price="6.200" tag="Top ventas" />
          <BikeCard name="BMW R 1250 GS" year="2019" km="28.000" price="14.500" />
        </div>
      </section>

      {/* MAP + VISIT */}
      <section style={{ padding: "56px 60px", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 32, borderBottom: "1.5px solid var(--ink)" }}>
        <div style={{ position: "relative" }}>
          <Ph w="100%" h={400} label="MAPA · CARRER BALDOMER SOLÀ 5A · BADALONA" />
          <HandNote top={20} right={-40} rotate={6} w={150}>
            estamos<br />aquí ↙
          </HandNote>
        </div>
        <div>
          <SectTag>Visita</SectTag>
          <h2 className="headline" style={{ fontSize: 44, margin: "10px 0 12px" }}>{t.home.visit}</h2>
          <p style={{ fontSize: 14, lineHeight: 1.5 }}>
            Carrer Baldomer Solà 5A, local 1<br />
            esquina Calle Guixeras 42<br />
            08912 Badalona, Barcelona
          </p>
          <div className="box" style={{ marginTop: 18, padding: 16 }}>
            <div className="mono" style={{ fontSize: 11, color: "var(--accent)", letterSpacing: "0.12em" }}>{t.home.hours.toUpperCase()}</div>
            <p style={{ margin: "6px 0 0", fontSize: 13 }}>{t.home.h1}</p>
            <p style={{ margin: 0, fontSize: 13 }}>{t.home.h2}</p>
            <p style={{ margin: 0, fontSize: 13 }}>{t.home.h3}</p>
          </div>
          <div style={{ marginTop: 14, display: "flex", gap: 10 }}>
            <span className="btn btn-fill">{t.contact.route}</span>
            <span className="chip-wa">● WhatsApp</span>
          </div>
        </div>
      </section>

      <Footer lang={lang} />
    </div>
  );
}

// ── HOME V3 — Catálogo first ──────────────────────────────────────
function HomeCatalogo({ lang }) {
  const t = STR[lang];
  return (
    <div className="wf wf-tall" data-screen-label="Home · V3 Catálogo">
      <Nav lang={lang} active="home" />

      {/* HERO — short banner, immediate inventory */}
      <section style={{ position: "relative", height: 360, borderBottom: "1.5px solid var(--ink)" }}>
        <Ph w="100%" h="100%" label="HERO · BANNER MOTO · 1920×360" />
        <div style={{ position: "absolute", inset: 0, padding: "60px 60px", color: "var(--paper)", display: "flex", flexDirection: "column", justifyContent: "center", textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}>
          <span className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", color: "var(--accent)" }}>SOWIMOTOR · BADALONA</span>
          <h1 className="headline" style={{ fontSize: 88, margin: "8px 0", lineHeight: 0.95 }}>
            {t.hero.title1} <span style={{ color: "var(--accent)" }}>{t.hero.title2}</span>
          </h1>
          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
            <span className="btn btn-accent btn-lg">{t.hero.cta1}</span>
            <span className="btn btn-lg" style={{ background: "var(--paper)", color: "var(--ink)" }}>{t.hero.cta3}</span>
          </div>
        </div>
      </section>

      {/* QUICK FILTERS */}
      <section style={{ padding: "20px 60px", borderBottom: "1.5px solid var(--ink)", display: "flex", gap: 14, alignItems: "center", overflow: "hidden", background: "var(--paper-2)" }}>
        <span className="mono" style={{ fontSize: 11, letterSpacing: "0.12em", color: "var(--ink-2)" }}>{t.catalog.filters.toUpperCase()} →</span>
        {["Naked", "Scooter", "Trail", "Sport", "Custom", "125cc", "A2", "< 5.000€"].map(c => (
          <span key={c} className="filter-chip">{c}</span>
        ))}
        <span style={{ flex: 1 }} />
        <span className="mono" style={{ fontSize: 11, color: "var(--ink-2)" }}>{t.catalog.results.toUpperCase()}</span>
      </section>

      {/* INVENTORY GRID */}
      <section style={{ padding: "40px 60px", borderBottom: "1.5px solid var(--ink)" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 20 }}>
          <h2 className="headline" style={{ fontSize: 48, margin: 0 }}>{t.home.featured}</h2>
          <span className="btn">{t.home.seeAll} →</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          <BikeCard name="Kawasaki Z900" year="2021" km="12.400" price="7.490" tag="Nueva" />
          <BikeCard name="Yamaha MT-07" year="2020" km="18.200" price="5.950" />
          <BikeCard name="Honda CB650R" year="2022" km="6.800" price="8.200" />
          <BikeCard name="Ducati Monster" year="2019" km="22.500" price="9.150" />
          <BikeCard name="Honda PCX 125" year="2021" km="9.100" price="2.890" />
          <BikeCard name="Yamaha XSR 700" year="2020" km="14.300" price="6.200" tag="Top" />
          <BikeCard name="BMW R 1250 GS" year="2019" km="28.000" price="14.500" />
          <BikeCard name="KTM Duke 390" year="2022" km="4.500" price="4.890" tag="A2" />
        </div>
      </section>

      {/* SERVICE STRIP — compact */}
      <section style={{ padding: "30px 60px", borderBottom: "1.5px solid var(--ink)", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, background: "var(--paper-2)" }}>
        {[t.home.svc2Title, t.home.svc3Title, t.home.svc4Title, t.home.svc1Title].map((title, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span className="headline" style={{ fontSize: 22, color: "var(--accent)" }}>0{i + 1}</span>
            <div>
              <div className="headline" style={{ fontSize: 16 }}>{title}</div>
              <span className="mono" style={{ fontSize: 10, letterSpacing: "0.08em", color: "var(--ink-2)" }}>VER MÁS →</span>
            </div>
          </div>
        ))}
      </section>

      {/* TRUST BAR — reviews + sell + map */}
      <section style={{ padding: "44px 60px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, borderBottom: "1.5px solid var(--ink)" }}>
        <div className="box" style={{ padding: 22 }}>
          <Stars />
          <div className="headline" style={{ fontSize: 40, margin: "8px 0 4px" }}>5,0 ★</div>
          <p style={{ margin: 0, fontSize: 13 }}>{t.home.reviewsSub}</p>
          <span className="mono" style={{ fontSize: 11, color: "var(--ink-2)", letterSpacing: "0.1em" }}>VER RESEÑAS →</span>
        </div>
        <div className="box-fill" style={{ padding: 22 }}>
          <span className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", color: "var(--accent-2)" }}>VENDE</span>
          <div className="headline" style={{ fontSize: 32, margin: "6px 0 8px" }}>{t.home.sellTitle}</div>
          <p style={{ margin: 0, fontSize: 13, color: "#ddd" }}>{t.home.sellBody}</p>
          <span className="btn btn-accent" style={{ marginTop: 12 }}>{t.home.sellCta}</span>
        </div>
        <div style={{ position: "relative" }}>
          <Ph w="100%" h={180} label="MAPA · BADALONA" />
          <p style={{ fontSize: 12, marginTop: 8 }}>Carrer Baldomer Solà 5A · 08912 Badalona</p>
          <p className="mono" style={{ fontSize: 11, color: "var(--ink-2)", margin: "4px 0 0" }}>{t.home.h1}</p>
        </div>
      </section>

      <Footer lang={lang} />
    </div>
  );
}

// ── HOME V4 — Track Mode (full BAD ASS) ───────────────────────────
function HomeTrack({ lang }) {
  const t = STR[lang];
  return (
    <div className="wf wf-tall" data-screen-label="Home · V4 Track" data-mode="track">
      <Nav lang={lang} active="home" />

      {/* HERO — brutal full bleed, asphalt feel */}
      <section style={{ position: "relative", height: 820, borderBottom: "2px solid var(--ink)", overflow: "hidden" }}>
        <Ph w="100%" h="100%" label="HERO · BIKE ON ASPHALT · CINEMATIC" />
        <div className="stripe" style={{ opacity: 0.4 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.85) 100%)" }} />
        <div style={{ position: "absolute", left: 60, top: 60, right: 60, color: "var(--ink)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="plate">N° 01 — BADALONA</span>
            <span className="mono" style={{ fontSize: 11, letterSpacing: "0.2em" }}>SOWIMOTOR / MOTOS DE OCASIÓN</span>
          </div>
          <h1 className="headline" style={{ fontSize: 240, margin: "60px 0 -12px", lineHeight: 0.85, fontStyle: "italic", letterSpacing: "-0.03em", color: "var(--accent)" }}>
            BAD<br/>ASS.
          </h1>
          <div style={{ display: "flex", gap: 20, alignItems: "flex-end", marginTop: 24 }}>
            <p style={{ fontSize: 16, maxWidth: 460, lineHeight: 1.45, margin: 0 }}>
              {lang === "es"
                ? "Motos de ocasión revisadas, garantía y entrega exprés. La nave abierta de lunes a sábado en Badalona."
                : "Motos d'ocasió revisades, garantia i entrega exprés. La nau oberta de dilluns a dissabte a Badalona."}
            </p>
            <span style={{ flex: 1 }} />
            <div style={{ display: "flex", gap: 10 }}>
              <span className="btn btn-accent btn-lg">▶ {t.hero.cta1}</span>
              <span className="btn btn-lg" style={{ background: "transparent", color: "var(--ink)", borderColor: "var(--ink)" }}>WHATSAPP ↗</span>
            </div>
          </div>
        </div>
        <div className="flag" style={{ position: "absolute", bottom: 0, left: 0, right: 0 }} />
      </section>

      {/* BIG NUMBER PICK · FEATURED */}
      <section style={{ padding: "70px 60px", borderBottom: "2px solid var(--ink)" }}>
        <div className="slash-row" style={{ marginBottom: 32 }}>
          <span style={{ fontSize: 18, letterSpacing: "0.18em", color: "var(--accent)" }}>02 / GARAGE</span>
          <span style={{ fontSize: 18, letterSpacing: "0.18em" }}>{t.home.featured.toUpperCase()}</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 20 }}>
          <div className="card" style={{ position: "relative" }}>
            <Ph w="100%" h={420} label="MOTO HERO · KAWASAKI Z900" />
            <div style={{ position: "absolute", top: 16, left: 16 }}>
              <span className="plate" style={{ fontSize: 14 }}>★ PICK OF THE WEEK</span>
            </div>
            <div className="card-body" style={{ padding: 22 }}>
              <div className="card-title" style={{ fontSize: 32, fontStyle: "italic" }}>KAWASAKI Z900</div>
              <div className="card-meta">2021 · 12.400 KM · 125 CV · A2</div>
              <div className="card-price" style={{ fontSize: 40 }}>7.490 €</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <BikeCard name="Yamaha MT-07" year="2020" km="18.200" price="5.950" tag="HOT" />
            <BikeCard name="Honda CB650R" year="2022" km="6.800" price="8.200" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <BikeCard name="Ducati Monster" year="2019" km="22.500" price="9.150" />
            <BikeCard name="KTM Duke 390" year="2022" km="4.500" price="4.890" tag="A2" />
          </div>
        </div>
      </section>

      {/* SERVICES — brutal index */}
      <section style={{ padding: "70px 60px", borderBottom: "2px solid var(--ink)", background: "var(--paper-2)" }}>
        <h2 className="headline" style={{ fontSize: 100, margin: "0 0 40px", fontStyle: "italic", letterSpacing: "-0.02em" }}>
          {t.home.services.toUpperCase()} <span style={{ color: "var(--accent)" }}>/</span>
        </h2>
        {[
          ["01", t.home.svc1Title, t.home.svc1Body],
          ["02", t.home.svc2Title, t.home.svc2Body],
          ["03", t.home.svc3Title, t.home.svc3Body],
          ["04", t.home.svc4Title, t.home.svc4Body],
        ].map(([n, title, body]) => (
          <div key={n} style={{ display: "grid", gridTemplateColumns: "100px 1fr 2fr 120px", gap: 32, padding: "26px 0", borderTop: "2px solid var(--ink)", alignItems: "center" }}>
            <span className="headline" style={{ fontSize: 56, fontStyle: "italic", color: "var(--accent)" }}>{n}</span>
            <span className="headline" style={{ fontSize: 32, fontStyle: "italic" }}>{title.toUpperCase()}</span>
            <p style={{ margin: 0, fontSize: 14, color: "var(--ink-2)", lineHeight: 1.5 }}>{body}</p>
            <span className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", color: "var(--accent)", textAlign: "right" }}>VER → </span>
          </div>
        ))}
        <div style={{ borderTop: "2px solid var(--ink)" }} />
      </section>

      {/* SELL + VISIT — split */}
      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: "2px solid var(--ink)" }}>
        <div style={{ padding: "60px 50px", background: "var(--accent)", color: "#fff", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.15 }}>
            <div className="stripe" />
          </div>
          <div style={{ position: "relative" }}>
            <span className="plate" style={{ background: "#fff", color: "var(--accent)", borderColor: "#fff" }}>04 — VENDE</span>
            <h2 className="headline" style={{ fontSize: 96, margin: "12px 0 8px", fontStyle: "italic", lineHeight: 0.9 }}>
              {t.home.sellTitle.toUpperCase()}
            </h2>
            <p style={{ fontSize: 16, maxWidth: 420, lineHeight: 1.45 }}>{t.home.sellBody}</p>
            <span className="btn btn-lg" style={{ background: "#000", color: "#fff", borderColor: "#000", marginTop: 18 }}>{t.home.sellCta} ↗</span>
          </div>
        </div>
        <div style={{ padding: "60px 50px" }}>
          <span className="plate">05 — VISIT</span>
          <h2 className="headline italic-tight" style={{ fontSize: 56, margin: "10px 0 14px", fontStyle: "italic" }}>{t.home.visit.toUpperCase()}</h2>
          <Ph w="100%" h={220} label="MAP · BADALONA · DARK" />
          <p className="mono" style={{ fontSize: 12, letterSpacing: "0.08em", marginTop: 12, color: "var(--ink-2)" }}>CARRER BALDOMER SOLÀ 5A · 08912 BADALONA</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginTop: 12, fontSize: 12 }} className="mono">
            <span>LU—VI · 9:30—20:00</span>
            <span>SA · 9:30—14:00</span>
            <span>DO · CERRADO</span>
            <span style={{ color: "var(--accent)" }}>● HOY ABIERTO</span>
          </div>
        </div>
      </section>

      <Footer lang={lang} />
    </div>
  );
}

Object.assign(window, { HomeVelocidad, HomeBarrio, HomeCatalogo, HomeTrack });
