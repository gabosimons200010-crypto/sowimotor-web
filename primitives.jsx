// Shared wireframe primitives — placeholders, header/nav, footer, hand notes.

const { useState } = React;

function Ph({ w, h, label, style, className = "", x = true }) {
  return (
    <div className={"ph " + className} style={{ width: w, height: h, ...style }}>
      {x && <div className="ph-x" />}
      <span className="ph-label">{label}</span>
    </div>
  );
}

function Stars({ count = 5 }) {
  return <span className="stars">{"★".repeat(count)}</span>;
}

function Nav({ lang, active = "home", variant = "default" }) {
  const t = STR[lang];
  const items = [
    ["home", t.nav.home],
    ["catalog", t.nav.catalog],
    ["rental", t.nav.rental],
    ["services", t.nav.services],
    ["about", t.nav.about],
    ["contact", t.nav.contact],
  ];
  return (
    <header className="nav">
      <div className="nav-logo">
        <span className="nav-logo-mark">S</span>
        <span>SOWI<span className="logo-orange">MOTOR</span></span>
      </div>
      <nav className="nav-links">
        {items.map(([k, label]) => (
          <span key={k} className={active === k ? "active" : ""}>{label}</span>
        ))}
      </nav>
      <div className="nav-right">
        <span className="chip-wa">● WhatsApp</span>
        <div className="lang-toggle">
          <button className={lang === "es" ? "on" : ""}>ES</button>
          <button className={lang === "ca" ? "on" : ""}>CA</button>
        </div>
      </div>
    </header>
  );
}

function Footer({ lang }) {
  const t = STR[lang];
  return (
    <footer className="foot">
      <div>
        <h5>SOWIMOTOR</h5>
        <p className="mono" style={{ textTransform: "uppercase", letterSpacing: "0.06em", fontSize: 11 }}>
          {lang === "es"
            ? "Concesionario de motos de ocasión en Badalona desde 2018"
            : "Concessionari de motos d'ocasió a Badalona des de 2018"}
        </p>
        <p style={{ marginTop: 14 }}>{t.foot.legal}</p>
      </div>
      <div>
        <h5>{t.foot.visit}</h5>
        <p>Carrer Baldomer Solà 5A</p>
        <p>local 1, esq. C/ Guixeras 42</p>
        <p>08912 Badalona</p>
      </div>
      <div>
        <h5>{t.foot.contact}</h5>
        <p>930 11 84 82</p>
        <p>695 18 47 24</p>
        <p>sowimotor@gmail.com</p>
      </div>
      <div>
        <h5>{t.foot.follow}</h5>
        <p>Instagram · @sowimotor</p>
        <p>TikTok · @sowimotor</p>
        <p>Facebook · Viví Sowi</p>
      </div>
    </footer>
  );
}

function HandNote({ children, top, left, right, bottom, rotate = -3, w = 200 }) {
  return (
    <div className="handnote"
      style={{
        top, left, right, bottom,
        transform: `rotate(${rotate}deg)`,
        width: w,
      }}>
      {children}
    </div>
  );
}

function SectTag({ children }) {
  return <span className="sect-tag">{children}</span>;
}

function BikeCard({ name, year, km, price, tag }) {
  return (
    <div className="card">
      <Ph w="100%" h={150} label={`MOTO · ${name}`} />
      <div className="card-body">
        {tag && <span className="mono" style={{ fontSize: 10, color: "var(--accent)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{tag}</span>}
        <div className="card-title">{name}</div>
        <div className="card-meta">{year} · {km} km</div>
        <div className="card-price">{price} €</div>
      </div>
    </div>
  );
}

Object.assign(window, { Ph, Stars, Nav, Footer, HandNote, SectTag, BikeCard });
