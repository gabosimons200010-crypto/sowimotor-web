// SowiMotor hi-fi — pages. React via Babel. Globals: BIKES, REVIEWS, HF_STR.
const { useState, useEffect, useMemo, useRef } = React;

// ── Shared atoms ──────────────────────────────────────────────────
function Img({ label, style, className = "", onClick }) {
  return (
    <div className={"img " + className} style={style} onClick={onClick}>
      <span className="img-label">{label}</span>
    </div>
  );
}

function Stars({ n = 5 }) {
  return <span className="stars">{"★".repeat(n)}</span>;
}

function FlagStrip() { return <div className="flag-strip" />; }

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } });
    }, { threshold: 0.12 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={"fade-in" + (seen ? " in" : "")} style={{ transitionDelay: delay + "ms" }}>{children}</div>;
}

// ── Bike card (used in home + catalog + related) ──────────────────
function BikeCard({ bike, onOpen, lang }) {
  const t = HF_STR[lang];
  const tag = bike.tag === "A2" || bike.tag === "A1" || bike.tag === "Clásica" ? bike.tag
    : bike.tag === "Recién entrada" ? (lang === "ca" ? "Acabada d'entrar" : "Recién entrada")
    : bike.tag === "Top ventas" ? (lang === "ca" ? "Més venuda" : "Top ventas")
    : bike.tag === "Garantía 12m" ? (lang === "ca" ? "Garantia 12m" : "Garantía 12m")
    : null;
  return (
    <div className="card" onClick={() => onOpen(bike.id)}>
      <Img label={`${bike.brand.toUpperCase()} · ${bike.name.toUpperCase()}`} />
      <div className="card-body">
        <div className="row between center">
          <span className="card-meta">{bike.brand} · {bike.type}</span>
          {tag && <span className="chip chip-orange">{tag}</span>}
        </div>
        <div className="card-name">{bike.name}</div>
        <div className="card-meta">{bike.year} · {bike.km.toLocaleString("es-ES")} km · {bike.cv} CV · Carnet {bike.license}</div>
        <div className="card-price-row">
          <span className="card-price">{bike.price.toLocaleString("es-ES")} €</span>
          <span className="card-cta">Ver ficha →</span>
        </div>
      </div>
    </div>
  );
}

// ── HOME ──────────────────────────────────────────────────────────
function Home({ lang, go }) {
  const t = HF_STR[lang];
  const featured = BIKES.slice(0, 4);
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg"><Img label="HERO · Motorista en Badalona · full-bleed" /></div>
        <div className="hero-stripes" />
        <div className="hero-content">
          <div className="hero-top">
            <span className="kicker">{t.hero.kicker}</span>
            <span className="chip chip-wa">● Abierto · 9:30 – 20:00</span>
          </div>
          <div>
            <h1 className="hero-h">
              <span className="stroke">{t.hero.l1}</span><br />
              <span className="or">{t.hero.l2}.</span>
            </h1>
            <p className="hero-sub">{t.hero.sub}</p>
            <div className="hero-cta">
              <button className="btn btn-orange btn-lg" onClick={() => go("catalog")}>{t.cta.stock} →</button>
              <a className="btn btn-lg btn-ghost" href="https://api.whatsapp.com/send?phone=34611257606" target="_blank" rel="noreferrer">
                <span style={{ color: "#4ade80", fontSize: 18 }}>●</span> {t.cta.whatsapp}
              </a>
            </div>
          </div>
          <div className="hero-stats">
            {t.stats.map(([n, l], i) => (
              <div key={i}>
                <div className="num">{n}</div>
                <div className="lab">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FlagStrip />

      {/* Featured */}
      <section className="section">
        <FadeIn>
          <div className="row between" style={{ alignItems: "flex-end", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
            <div>
              <div className="kicker" style={{ marginBottom: 8 }}>{t.home.featuredKick}</div>
              <h2 className="h-display" style={{ fontSize: 64, margin: 0 }}>{t.home.featured}</h2>
              <p className="text-mute" style={{ marginTop: 8, fontSize: 14 }}>{t.home.featuredSub}</p>
            </div>
            <button className="btn" onClick={() => go("catalog")}>{t.home.seeAll} →</button>
          </div>
        </FadeIn>
        <div className="grid-bikes">
          {featured.map((b, i) => (
            <FadeIn key={b.id} delay={i * 80}>
              <BikeCard bike={b} onOpen={(id) => go("detail", id)} lang={lang} />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="section" style={{ paddingTop: 0 }}>
        <FadeIn>
          <div className="kicker" style={{ marginBottom: 8 }}>{t.home.svcKick}</div>
          <h2 className="h-display" style={{ fontSize: 72, margin: "0 0 32px" }}>{t.home.svcTitle}</h2>
        </FadeIn>
        <div>
          {t.home.services.map(([n, ttl, body], i) => (
            <FadeIn key={i} delay={i * 60}>
              <div className="svc-row" onClick={() => go(i === 1 ? "services" : i === 2 ? "contact" : "catalog")}>
                <div className="num">{n}</div>
                <div className="ttl">{ttl}</div>
                <div className="body">{body}</div>
                <div className="arrow">→</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Sell-your-bike */}
      <section style={{ background: "var(--bg-2)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
        <div className="section" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 48, alignItems: "center", paddingBlock: 80 }}>
          <FadeIn>
            <div>
              <div className="kicker" style={{ marginBottom: 12 }}>{t.home.sellKick}</div>
              <h2 className="h-display" style={{ fontSize: 80, margin: "0 0 16px" }}>
                {t.home.sellTitle.split(" ").map((w, i, arr) =>
                  i === arr.length - 1 ? <span key={i} className="text-orange">{w}</span> : <span key={i}>{w} </span>
                )}
              </h2>
              <p className="text-mute" style={{ fontSize: 16, lineHeight: 1.5, maxWidth: 420 }}>{t.home.sellSub}</p>
              <div className="row gap-12" style={{ marginTop: 24, flexWrap: "wrap" }}>
                <button className="btn btn-orange btn-lg" onClick={() => go("contact")}>{t.home.sellCta} →</button>
                <a className="btn btn-lg" href="https://api.whatsapp.com/send?phone=34611257606" target="_blank" rel="noreferrer">WhatsApp</a>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={120}>
            <Img label="MOTO TASACIÓN · placeholder" style={{ height: 360, borderRadius: 6 }} />
          </FadeIn>
        </div>
      </section>

      {/* Reviews */}
      <section className="section">
        <FadeIn>
          <div className="kicker" style={{ marginBottom: 8 }}>{t.home.reviewsKick}</div>
          <div className="row between" style={{ alignItems: "flex-end", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
            <h2 className="h-display" style={{ fontSize: 64, margin: 0 }}>{t.home.reviewsTitle}</h2>
            <span className="text-mute" style={{ fontSize: 13 }}><Stars /> {t.home.reviewsSub}</span>
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {REVIEWS[lang].map((r, i) => (
            <FadeIn key={i} delay={i * 80}>
              <div className="review">
                <Stars />
                <div className="quote">"{r.quote}"</div>
                <div className="who">
                  <div className="avatar">{r.initials}</div>
                  <div className="col">
                    <span className="name">{r.name}</span>
                    <span className="when">{r.when} · Google</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Visit / Map */}
      <section style={{ background: "var(--bg-2)", borderTop: "1px solid var(--line)" }}>
        <div className="section" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 40, alignItems: "stretch" }}>
          <FadeIn>
            <div>
              <div className="kicker" style={{ marginBottom: 8 }}>{t.home.visitKick}</div>
              <h2 className="h-display" style={{ fontSize: 64, margin: "0 0 24px" }}>{t.home.visitTitle}</h2>
              <p style={{ whiteSpace: "pre-line", fontSize: 16, lineHeight: 1.6 }}>{t.home.visitAddr}</p>
              <div style={{ marginTop: 24 }}>
                <div className="kicker" style={{ marginBottom: 8 }}>{t.home.hours}</div>
                <div className="col gap-8" style={{ fontSize: 14 }}>
                  {t.home.h.map((h, i) => <span key={i} className="text-mute">{h}</span>)}
                </div>
              </div>
              <div className="row gap-12" style={{ marginTop: 28, flexWrap: "wrap" }}>
                <a className="btn btn-orange" href="https://maps.google.com/?q=Carrer+Baldomer+Solà+5+Badalona" target="_blank" rel="noreferrer">{t.home.route} →</a>
                <a className="btn" href="tel:930118482">930 118 482</a>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <Img label="MAPA · Badalona · C/ Baldomer Solà 5" style={{ height: "100%", minHeight: 380, borderRadius: 6 }} />
          </FadeIn>
        </div>
      </section>
    </>
  );
}

// ── CATALOG ───────────────────────────────────────────────────────
function Catalog({ lang, go, initialBrand }) {
  const t = HF_STR[lang];
  const allBrands = [...new Set(BIKES.map(b => b.brand))];
  const allTypes = [...new Set(BIKES.map(b => b.type))];
  const allLicenses = ["A1", "A2", "A"];
  const [brands, setBrands] = useState(initialBrand ? [initialBrand] : []);
  const [types, setTypes] = useState([]);
  const [licenses, setLicenses] = useState([]);
  const [maxPrice, setMaxPrice] = useState(15000);
  const [maxKm, setMaxKm] = useState(40000);
  const [sort, setSort] = useState("recent");

  const toggle = (arr, set, v) => set(arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v]);
  const reset = () => { setBrands([]); setTypes([]); setLicenses([]); setMaxPrice(15000); setMaxKm(40000); };

  const filtered = useMemo(() => {
    let r = BIKES.filter(b =>
      (brands.length === 0 || brands.includes(b.brand)) &&
      (types.length === 0 || types.includes(b.type)) &&
      (licenses.length === 0 || licenses.includes(b.license)) &&
      b.price <= maxPrice && b.km <= maxKm
    );
    if (sort === "priceAsc") r = [...r].sort((a, b) => a.price - b.price);
    else if (sort === "priceDesc") r = [...r].sort((a, b) => b.price - a.price);
    else if (sort === "kmAsc") r = [...r].sort((a, b) => a.km - b.km);
    else r = [...r].sort((a, b) => b.year - a.year);
    return r;
  }, [brands, types, licenses, maxPrice, maxKm, sort]);

  return (
    <section className="section">
      <div style={{ marginBottom: 32 }}>
        <div className="kicker" style={{ marginBottom: 8 }}>SOWIMOTOR · BADALONA</div>
        <h1 className="h-display" style={{ fontSize: 80, margin: 0 }}>{t.cat.title}</h1>
        <p className="text-mute" style={{ marginTop: 12, fontSize: 16 }}>{t.cat.sub}</p>
      </div>

      <div className="cat-grid">
        <aside className="filters">
          <div className="row between center">
            <h4>{t.cat.filters}</h4>
            <button className="btn" style={{ padding: "6px 10px", fontSize: 10 }} onClick={reset}>{t.cat.reset}</button>
          </div>

          <div className="filter-block">
            <h4 style={{ marginBottom: 10 }}>{t.cat.brand}</h4>
            <div>{allBrands.map(b => (
              <button key={b} className={"filter-chip" + (brands.includes(b) ? " on" : "")} onClick={() => toggle(brands, setBrands, b)}>{b}</button>
            ))}</div>
          </div>

          <div className="filter-block">
            <h4 style={{ marginBottom: 10 }}>{t.cat.type}</h4>
            <div>{allTypes.map(b => (
              <button key={b} className={"filter-chip" + (types.includes(b) ? " on" : "")} onClick={() => toggle(types, setTypes, b)}>{b}</button>
            ))}</div>
          </div>

          <div className="filter-block">
            <h4 style={{ marginBottom: 10 }}>{t.cat.license}</h4>
            <div>{allLicenses.map(b => (
              <button key={b} className={"filter-chip" + (licenses.includes(b) ? " on" : "")} onClick={() => toggle(licenses, setLicenses, b)}>{b}</button>
            ))}</div>
          </div>

          <div className="filter-block">
            <h4 style={{ marginBottom: 10 }}>{t.cat.price}</h4>
            <input type="range" min="2000" max="15000" step="500" value={maxPrice} onChange={e => setMaxPrice(+e.target.value)} />
            <div className="range-row"><span>2.000 €</span><span className="text-orange" style={{ fontWeight: 700 }}>≤ {maxPrice.toLocaleString("es-ES")} €</span></div>
          </div>

          <div className="filter-block">
            <h4 style={{ marginBottom: 10 }}>{t.cat.km}</h4>
            <input type="range" min="0" max="40000" step="1000" value={maxKm} onChange={e => setMaxKm(+e.target.value)} />
            <div className="range-row"><span>0 km</span><span className="text-orange" style={{ fontWeight: 700 }}>≤ {maxKm.toLocaleString("es-ES")} km</span></div>
          </div>
        </aside>

        <div>
          <div className="row between center" style={{ marginBottom: 18, flexWrap: "wrap", gap: 12 }}>
            <span className="mono" style={{ fontSize: 12, color: "var(--ink-2)" }}>
              <span className="text-orange" style={{ fontWeight: 700 }}>{filtered.length}</span> {t.cat.results(filtered.length)}
            </span>
            <div className="row gap-8 center">
              <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>{t.cat.sort}</span>
              <select className="filter-chip" style={{ padding: "6px 10px" }} value={sort} onChange={e => setSort(e.target.value)}>
                <option value="recent">{t.cat.sortOpts.recent}</option>
                <option value="priceAsc">{t.cat.sortOpts.priceAsc}</option>
                <option value="priceDesc">{t.cat.sortOpts.priceDesc}</option>
                <option value="kmAsc">{t.cat.sortOpts.kmAsc}</option>
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div style={{ padding: 60, textAlign: "center", border: "1px dashed var(--line)", borderRadius: 6 }}>
              <p className="text-mute">{t.cat.empty}</p>
              <button className="btn" onClick={reset} style={{ marginTop: 16 }}>{t.cat.reset}</button>
            </div>
          ) : (
            <div className="grid-bikes" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
              {filtered.map(b => <BikeCard key={b.id} bike={b} onOpen={(id) => go("detail", id)} lang={lang} />)}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ── DETAIL ────────────────────────────────────────────────────────
function Detail({ lang, bikeId, go }) {
  const t = HF_STR[lang];
  const bike = BIKES.find(b => b.id === bikeId) || BIKES[0];
  const [active, setActive] = useState(0);
  useEffect(() => { setActive(0); window.scrollTo({ top: 0 }); }, [bikeId]);
  const views = ["3/4 frontal", "Lateral", "Trasera", "Cuadro", "Detalle"];
  const related = BIKES.filter(b => b.id !== bike.id && b.type === bike.type).slice(0, 3);
  if (related.length < 3) related.push(...BIKES.filter(b => b.id !== bike.id && !related.includes(b)).slice(0, 3 - related.length));

  return (
    <section className="section">
      <button className="btn" style={{ marginBottom: 20, fontSize: 11 }} onClick={() => go("catalog")}>{t.detail.back}</button>

      <div className="detail-grid">
        <div>
          <Img className="gallery-main" label={`${bike.name.toUpperCase()} · ${views[active]}`} />
          <div className="gallery-thumbs">
            {views.map((v, i) => (
              <Img key={i} className={i === active ? "on" : ""} label={v} onClick={() => setActive(i)} />
            ))}
          </div>
        </div>

        <div className="col gap-16">
          <div>
            <div className="kicker" style={{ marginBottom: 8 }}>{bike.brand} · {bike.type}</div>
            <h1 className="h-display" style={{ fontSize: 56, margin: "0 0 6px" }}>{bike.name}</h1>
            <div className="text-mute" style={{ fontSize: 13 }}>{bike.year} · {bike.km.toLocaleString("es-ES")} km · {bike.color}</div>
          </div>

          <div className="row between center" style={{ background: "var(--bg-2)", border: "1px solid var(--line)", padding: 18, borderRadius: 6 }}>
            <div>
              <div className="card-meta">Precio</div>
              <div className="h-display text-orange" style={{ fontSize: 48, margin: 0 }}>{bike.price.toLocaleString("es-ES")} €</div>
              <div className="card-meta" style={{ marginTop: 4 }}>{t.cta.finance}</div>
            </div>
            <span className="plate">{bike.license}</span>
          </div>

          <div>
            <div className="kicker" style={{ marginBottom: 10 }}>{t.detail.specs}</div>
            <div className="spec-grid">
              <div className="spec"><div className="k">Cilindrada</div><div className="v">{bike.cc} cc</div></div>
              <div className="spec"><div className="k">Potencia</div><div className="v">{bike.cv} CV</div></div>
              <div className="spec"><div className="k">Año</div><div className="v">{bike.year}</div></div>
              <div className="spec"><div className="k">Km</div><div className="v">{bike.km.toLocaleString("es-ES")}</div></div>
            </div>
          </div>

          <div>
            <div className="kicker" style={{ marginBottom: 10 }}>{t.detail.desc}</div>
            <p className="text-mute" style={{ fontSize: 14, lineHeight: 1.6, margin: 0 }}>{t.detail.descBody}</p>
            <ul style={{ marginTop: 14, paddingLeft: 0, listStyle: "none" }}>
              {t.detail.bullets.map((bu, i) => (
                <li key={i} style={{ padding: "6px 0", fontSize: 13, color: "var(--ink)" }}>
                  <span className="text-orange" style={{ marginRight: 10 }}>✓</span>{bu}
                </li>
              ))}
            </ul>
          </div>

          <div className="row gap-12" style={{ flexWrap: "wrap" }}>
            <a className="btn btn-orange btn-lg" href={`https://api.whatsapp.com/send?phone=34611257606&text=Hola, me interesa la ${bike.name}`} target="_blank" rel="noreferrer">
              {t.detail.ask} →
            </a>
            <button className="btn btn-lg" onClick={() => go("contact")}>{t.detail.reserve}</button>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 80 }}>
        <div className="kicker" style={{ marginBottom: 8 }}>{t.detail.related}</div>
        <h3 className="h-display" style={{ fontSize: 48, margin: "0 0 24px" }}>{lang === "ca" ? "També pot agradar-te" : "También te puede gustar"}</h3>
        <div className="grid-bikes" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          {related.map(b => <BikeCard key={b.id} bike={b} onOpen={(id) => go("detail", id)} lang={lang} />)}
        </div>
      </div>
    </section>
  );
}

// ── SERVICES (lavado-forward) ─────────────────────────────────────
function Services({ lang, go }) {
  const t = HF_STR[lang];
  return (
    <>
      <section className="section">
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 48, alignItems: "center" }}>
          <div>
            <div className="kicker" style={{ marginBottom: 8 }}>{t.svc.kicker}</div>
            <h1 className="h-display" style={{ fontSize: 96, margin: "0 0 18px", lineHeight: 0.85 }}>
              <span className="stroke">{t.svc.title.split(" ").slice(0, -1).join(" ")}</span><br />
              <span className="text-orange">{t.svc.title.split(" ").slice(-1)}</span>
            </h1>
            <p className="text-mute" style={{ fontSize: 17, lineHeight: 1.55, maxWidth: 460 }}>{t.svc.sub}</p>
            <div className="row gap-12" style={{ marginTop: 24, flexWrap: "wrap" }}>
              <a className="btn btn-orange btn-lg" href="https://api.whatsapp.com/send?phone=34611257606" target="_blank" rel="noreferrer">{t.svc.bookCta} →</a>
              <button className="btn btn-lg" onClick={() => go("contact")}>{HF_STR[lang].cta.visit}</button>
            </div>

            <div style={{ marginTop: 36, padding: 18, border: "1px solid var(--orange)", borderRadius: 6, background: "rgba(255,106,26,0.06)" }}>
              <div className="kicker" style={{ marginBottom: 6 }}>{t.svc.bonusKick}</div>
              <div className="h-display" style={{ fontSize: 28, margin: 0 }}>{t.svc.bonus}</div>
              <p className="text-mute" style={{ marginTop: 4, marginBottom: 0, fontSize: 13 }}>{t.svc.bonusBody}</p>
            </div>
          </div>
          <Img label="LAVADO · placeholder · 'manguera + brillo'" style={{ height: 540, borderRadius: 6 }} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="kicker" style={{ marginBottom: 8 }}>{t.svc.pricesKick}</div>
        <h2 className="h-display" style={{ fontSize: 56, margin: "0 0 24px" }}>{t.svc.pricesTitle}</h2>
        <div>
          {t.svc.prices.map(([n, b, p], i) => (
            <FadeIn key={i} delay={i * 60}>
              <div className="svc-row" onClick={() => window.open("https://api.whatsapp.com/send?phone=34611257606", "_blank")}>
                <div className="num">{String(i + 1).padStart(2, "0")}</div>
                <div className="ttl">{n}</div>
                <div className="body">{b}</div>
                <div className="h-display text-orange" style={{ fontSize: 36 }}>{p}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}

// ── CONTACT ───────────────────────────────────────────────────────
function Contact({ lang }) {
  const t = HF_STR[lang];
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", interest: "", msg: "" });

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => { setSent(false); setForm({ name: "", email: "", phone: "", interest: "", msg: "" }); }, 5000);
  };

  return (
    <section className="section">
      <div style={{ marginBottom: 32 }}>
        <div className="kicker" style={{ marginBottom: 8 }}>{lang === "ca" ? "Contacta" : "Contacta"}</div>
        <h1 className="h-display" style={{ fontSize: 88, margin: 0 }}>{t.contact.title}</h1>
        <p className="text-mute" style={{ marginTop: 14, fontSize: 16, maxWidth: 600 }}>{t.contact.sub}</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 40 }}>
        <div>
          <Img label="MAPA · Badalona · C/ Baldomer Solà 5" style={{ height: 320, borderRadius: 6, marginBottom: 16 }} />
          <div className="col gap-16" style={{ background: "var(--bg-2)", border: "1px solid var(--line)", borderRadius: 6, padding: 22 }}>
            <div>
              <div className="kicker" style={{ marginBottom: 6 }}>SowiMotor · Badalona</div>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, whiteSpace: "pre-line" }}>{t.home.visitAddr}</p>
            </div>
            <div className="divider" />
            <div className="row" style={{ gap: 32, flexWrap: "wrap" }}>
              <div>
                <div className="kicker" style={{ marginBottom: 6 }}>Tel</div>
                <a href="tel:930118482" className="h-display" style={{ fontSize: 22, color: "var(--ink)" }}>930 118 482</a><br />
                <a href="tel:611257606" className="text-mute" style={{ fontSize: 13 }}>611 257 606 · WhatsApp</a>
              </div>
              <div>
                <div className="kicker" style={{ marginBottom: 6 }}>Email</div>
                <a href="mailto:sowimotor@gmail.com" className="h-display" style={{ fontSize: 18, color: "var(--ink)" }}>sowimotor@gmail.com</a>
              </div>
            </div>
            <div className="divider" />
            <div>
              <div className="kicker" style={{ marginBottom: 8 }}>{t.home.hours}</div>
              <div className="col gap-8" style={{ fontSize: 13 }}>
                {t.home.h.map((h, i) => <span key={i} className="text-mute">{h}</span>)}
              </div>
            </div>
          </div>
        </div>

        {sent ? (
          <div style={{ background: "var(--bg-2)", border: "1px solid var(--orange)", borderRadius: 6, padding: 40, display: "grid", placeContent: "center", textAlign: "center" }}>
            <div className="h-display text-orange" style={{ fontSize: 64, margin: "0 0 12px" }}>✓</div>
            <div className="h-display" style={{ fontSize: 32, margin: "0 0 8px" }}>{t.contact.sentTitle}</div>
            <p className="text-mute" style={{ fontSize: 14 }}>{t.contact.sentBody}</p>
          </div>
        ) : (
          <form className="col gap-16" style={{ background: "var(--bg-2)", border: "1px solid var(--line)", borderRadius: 6, padding: 28 }} onSubmit={submit}>
            <div className="kicker">{t.contact.send}</div>
            <div className="field">
              <label>{t.contact.name}</label>
              <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="row gap-12">
              <div className="field flex-1">
                <label>{t.contact.email}</label>
                <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
              <div className="field flex-1">
                <label>{t.contact.phone}</label>
                <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              </div>
            </div>
            <div className="field">
              <label>{t.contact.interest}</label>
              <select value={form.interest} onChange={e => setForm({ ...form, interest: e.target.value })}>
                <option value="">—</option>
                {BIKES.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
                <option value="lavado">{lang === "ca" ? "Rentat" : "Lavado"}</option>
                <option value="venta">{lang === "ca" ? "Vendre la meva moto" : "Vender mi moto"}</option>
              </select>
            </div>
            <div className="field">
              <label>{t.contact.msg}</label>
              <textarea value={form.msg} onChange={e => setForm({ ...form, msg: e.target.value })} />
            </div>
            <button className="btn btn-orange btn-lg" type="submit">{t.contact.btn} →</button>
          </form>
        )}
      </div>
    </section>
  );
}

Object.assign(window, { Home, Catalog, Detail, Services, Contact, BikeCard, FadeIn, Stars, FlagStrip, Img });
