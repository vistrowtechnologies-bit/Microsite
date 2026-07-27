"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

type Screen = "home" | "dashboard" | "properties" | "property" | "new";

const photos = [
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=85",
];

const propertyInventory = [
  { title: "Verdant Heights", developer: "Aurum Developers", place: "Kharadi, Pune", price: "₹1.48 Cr", config: "3 & 4 BHK", status: "Published", views: 1204, leads: 48, updated: "27 Jul 2026", image: photos[0] },
  { title: "The Canopy", developer: "Canopy Living", place: "Baner, Pune", price: "₹2.10 Cr", config: "3 & 4 BHK", status: "Published", views: 892, leads: 32, updated: "26 Jul 2026", image: photos[2] },
  { title: "Riverstone", developer: "Riverstone Group", place: "Koregaon Park, Pune", price: "₹3.25 Cr", config: "4 BHK", status: "Draft", views: 2450, leads: 112, updated: "24 Jul 2026", image: photos[4] },
  { title: "Skyline One", developer: "Skyline Spaces", place: "Wakad, Pune", price: "₹94 L", config: "2 & 3 BHK", status: "Published", views: 630, leads: 14, updated: "22 Jul 2026", image: photos[3] },
];

const Arrow = () => <span aria-hidden="true">↗</span>;

export default function Home() {
  const [screen, setScreen] = useState<Screen>("home");
  const [menu, setMenu] = useState(false);

  const navigate = (next: Screen) => {
    setScreen(next);
    setMenu(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (screen === "dashboard") return <Dashboard onNavigate={navigate} />;
  if (screen === "properties") return <PropertiesPage onNavigate={navigate} />;
  if (screen === "property") return <PropertyPage onNavigate={navigate} />;
  if (screen === "new") return <NewProperty onNavigate={navigate} />;

  return (
    <main className="marketing">
      <nav className="topbar">
        <button className="brand" onClick={() => navigate("home")} aria-label="Nestory home">
          <span className="brand-mark">N</span><span>nestory</span>
        </button>
        <div className={`navlinks ${menu ? "open" : ""}`}>
          <a href="#how" onClick={() => setMenu(false)}>How it works</a>
          <a href="#features" onClick={() => setMenu(false)}>Features</a>
          <a href="#pricing" onClick={() => setMenu(false)}>Pricing</a>
        </div>
        <div className="nav-actions">
          <button className="text-button" onClick={() => navigate("dashboard")}>Log in</button>
          <button className="button dark small" onClick={() => navigate("dashboard")}>Start sharing <Arrow /></button>
        </div>
        <button className="menu-button" onClick={() => setMenu(!menu)} aria-label="Toggle menu">☰</button>
      </nav>

      <section className="hero">
        <div className="eyebrow"><span>●</span> Built for India’s property professionals</div>
        <h1>Every property.<br/><em>One beautiful link.</em></h1>
        <p className="hero-copy">Turn scattered brochures, floor plans and photos into a polished property page your clients will actually enjoy exploring.</p>
        <div className="hero-actions">
          <button className="button coral" onClick={() => navigate("dashboard")}>Create your first page <Arrow /></button>
          <button className="play-button" onClick={() => navigate("property")}><span>▶</span> See a live example</button>
        </div>
        <div className="trust-row"><span>No credit card</span><i/> <span>Live in 5 minutes</span><i/> <span>Made for brokers & CPs</span></div>
      </section>

      <section className="product-stage" aria-label="Product preview">
        <div className="orb orb-one"/><div className="orb orb-two"/>
        <div className="browser-mock">
          <div className="browser-bar"><div className="dots"><b/><b/><b/></div><div className="address">nestory.in/p/verdant-heights</div><span>⋯</span></div>
          <div className="listing-preview">
            <div className="preview-nav"><span className="mini-brand">nestory</span><span>♡ &nbsp; Share</span></div>
            <div className="preview-grid">
              <img src={photos[0]} alt="Verdant Heights living room"/>
              <img src={photos[1]} alt="Modern dining area"/>
              <img src={photos[2]} alt="Apartment exterior"/>
            </div>
            <div className="preview-copy">
              <div><span className="tag">NEW LAUNCH</span><h3>Verdant Heights</h3><p>Kharadi, Pune · by Aurum Developers</p></div>
              <div className="preview-price"><span>Starting from</span><strong>₹1.48 Cr</strong></div>
            </div>
          </div>
        </div>
        <div className="floating-card views"><span className="pulse">↗</span><div><strong>284 views</strong><small>+18% this week</small></div></div>
        <div className="floating-card sent"><span>✓</span><div><strong>Link shared</strong><small>with Rohan Mehta</small></div></div>
      </section>

      <section className="problem">
        <div><span className="section-number">01 / THE OLD WAY</span><h2>Your client deserves better than <em>15 attachments.</em></h2></div>
        <div className="chaos">
          <div className="whatsapp"><strong>Rakesh Properties</strong><small>online</small><div className="message">Hi sir, sharing details for the Kharadi project 👇</div><div className="files"><span>▧ Brochure_Final_v3.pdf</span><span>▧ PriceList_July.pdf</span><span>▧ Floor_Plan_3BHK.jpg</span><span>▧ +12 more files</span></div></div>
          <p>Clients get overwhelmed. Details get lost. Follow-ups go cold.</p>
        </div>
      </section>

      <section className="steps" id="how">
        <div className="section-heading"><span className="section-number">02 / HOW IT WORKS</span><h2>From files to <em>finished</em><br/>in minutes.</h2></div>
        <div className="step-grid">
          <article><span>01</span><div className="step-icon">↥</div><h3>Upload everything</h3><p>Drop your photos, brochure, price sheet and floor plans in one place.</p></article>
          <article><span>02</span><div className="step-icon">✦</div><h3>Make it yours</h3><p>Add the project facts, your branding and the details buyers care about.</p></article>
          <article><span>03</span><div className="step-icon">↗</div><h3>Share one link</h3><p>Send a clean, mobile-first page on WhatsApp. Update it anytime.</p></article>
        </div>
      </section>

      <section className="feature-band" id="features">
        <div className="feature-image"><img src={photos[4]} alt="Luxury modern home"/><span className="image-label">A BETTER FIRST IMPRESSION</span></div>
        <div className="feature-copy">
          <span className="section-number light">03 / BUILT TO CONVERT</span>
          <h2>The project page your listings always <em>deserved.</em></h2>
          <p>Beautiful on every screen, thoughtfully organised, and branded with your details—not the builder’s sales desk.</p>
          <ul><li><span>✓</span>Immersive photo gallery</li><li><span>✓</span>Brochures & floor plans in one place</li><li><span>✓</span>Instant WhatsApp and call actions</li><li><span>✓</span>Live view tracking</li></ul>
          <button className="button cream" onClick={() => navigate("property")}>Explore the example <Arrow /></button>
        </div>
      </section>

      <section className="pricing" id="pricing">
        <span className="section-number">04 / SIMPLE PRICING</span>
        <h2>Start small. <em>Share big.</em></h2>
        <p>Everything you need to make a sharper first impression.</p>
        <div className="price-cards">
          <article><span>STARTER</span><h3>₹499<small>/ month</small></h3><p>For independent brokers getting started.</p><ul><li>5 active property pages</li><li>Unlimited sharing</li><li>Basic view analytics</li></ul><button className="button outline" onClick={() => navigate("dashboard")}>Start free</button></article>
          <article className="featured"><div className="popular">MOST POPULAR</div><span>PROFESSIONAL</span><h3>₹1,499<small>/ month</small></h3><p>For channel partners managing a portfolio.</p><ul><li>Unlimited property pages</li><li>Personalised client links</li><li>Advanced link analytics</li></ul><button className="button coral" onClick={() => navigate("dashboard")}>Start 14-day trial</button></article>
        </div>
      </section>

      <footer><div className="footer-brand"><span className="brand-mark">N</span><strong>nestory</strong><p>Properties, presented better.</p></div><div><span>PRODUCT</span><a href="#features">Features</a><a href="#pricing">Pricing</a><button onClick={() => navigate("property")}>Live example</button></div><div><span>COMPANY</span><a href="#how">About</a><a href="mailto:hello@nestory.in">Contact</a><a href="#">Privacy</a></div><div className="footer-cta"><p>Ready to send fewer files?</p><button className="button cream" onClick={() => navigate("dashboard")}>Create your page <Arrow /></button></div></footer>
    </main>
  );
}

function Dashboard({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const projects = [
    { title: "Verdant Heights", place: "Kharadi, Pune", price: "₹1.48 Cr", status: "Published", views: 284, image: photos[0] },
    { title: "The Canopy", place: "Baner, Pune", price: "₹2.10 Cr", status: "Published", views: 146, image: photos[2] },
    { title: "Riverstone", place: "Koregaon Park, Pune", price: "₹3.25 Cr", status: "Draft", views: 0, image: photos[4] },
  ];
  return <main className="app-shell">
    <aside><button className="brand" onClick={() => onNavigate("home")}><span className="brand-mark">N</span><span>nestory</span></button><nav><button className="active">⌂ <span>Overview</span></button><button onClick={() => onNavigate("properties")}>▱ <span>Properties</span><small>4</small></button><button>⌁ <span>Analytics</span></button><button>♙ <span>Leads</span></button></nav><div className="aside-bottom"><button>⚙ <span>Settings</span></button><div className="user"><div>AM</div><span><strong>Abhi Mehta</strong><small>MarketiX Realty</small></span><b>⋯</b></div></div></aside>
    <section className="dashboard-main">
      <header><div><p>MONDAY, 27 JULY</p><h1>Good morning, Abhi.</h1></div><button className="button coral" onClick={() => onNavigate("new")}>＋ New property</button></header>
      <div className="metrics"><article><span>TOTAL VIEWS</span><strong>1,284</strong><small className="up">↗ 18.2% this month</small></article><article><span>ACTIVE PROPERTIES</span><strong>2 <small>/ 5</small></strong><small>Starter plan allowance</small></article><article><span>WHATSAPP CLICKS</span><strong>93</strong><small className="up">↗ 12.4% this month</small></article><article className="mini-chart"><span>VIEWS THIS WEEK</span><div><i style={{height:"32%"}}/><i style={{height:"55%"}}/><i style={{height:"42%"}}/><i style={{height:"76%"}}/><i style={{height:"62%"}}/><i style={{height:"90%"}}/><i style={{height:"72%"}}/></div></article></div>
      <div className="dash-title"><div><h2>Your properties</h2><p>Manage and share every project from one place.</p></div><div className="search">⌕ <input aria-label="Search properties" placeholder="Search properties"/></div></div>
      <div className="project-grid">{projects.map((p, i)=><article className="project-card" key={p.title} onClick={() => i === 0 && onNavigate("property")}><div className="project-image"><img src={p.image} alt=""/><span className={p.status === "Draft" ? "draft" : ""}>● {p.status}</span><button aria-label="More options">⋯</button></div><div className="project-info"><span>{p.place}</span><h3>{p.title}</h3><p>3 BHK · {p.price} onwards</p><div><small>◎ {p.views} views</small><small>↗ Share</small></div></div></article>)}
      <button className="add-card" onClick={() => onNavigate("new")}><span>＋</span><strong>Add another property</strong><small>2 of 5 pages used</small></button></div>
    </section>
  </main>;
}

function PropertiesPage({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All Pune");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = propertyInventory.filter((property) => {
    const matchesQuery = `${property.title} ${property.developer} ${property.place}`.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = status === "All" || property.status === status;
    const matchesLocation = locationFilter === "All Pune" || property.place.startsWith(locationFilter);
    return matchesQuery && matchesStatus && matchesLocation;
  });

  return <main className="inventory-shell">
    <aside className="inventory-sidebar">
      <button className="brand" onClick={() => onNavigate("home")}><span className="brand-mark">N</span><span>nestory</span></button>
      <nav>
        <button onClick={() => onNavigate("dashboard")}>⌂ <span>Overview</span></button>
        <button className="active">▱ <span>Properties</span></button>
        <button>□ <span>Collections</span></button>
        <button>♙ <span>Leads</span></button>
        <button>⌁ <span>Analytics</span></button>
        <button>⚙ <span>Settings</span></button>
      </nav>
      <div className="inventory-user"><span>AM</span><div><strong>Abhi Mehta</strong><small>MarketiX Realty</small></div></div>
    </aside>
    <section className="inventory-main">
      <header className="inventory-top">
        <div className="inventory-global-search">⌕ <input value={query} onChange={(event)=>setQuery(event.target.value)} aria-label="Search properties" placeholder="Search by project, developer or location"/></div>
        <button className="button coral" onClick={() => onNavigate("new")}>＋ New property</button>
      </header>
      <div className="inventory-heading">
        <div><span className="inventory-kicker">PROPERTY LIBRARY</span><h1>My Properties</h1><p>Manage, update and share your active property microsites.</p></div>
        <div className="view-toggle" aria-label="Property view"><button className={view==="grid"?"active":""} onClick={()=>setView("grid")} aria-label="Grid view">▦</button><button className={view==="list"?"active":""} onClick={()=>setView("list")} aria-label="List view">☷</button></div>
      </div>
      <button className="mobile-filter-button" onClick={()=>setFiltersOpen(!filtersOpen)}>☷ Filters <span>{filtered.length} properties</span></button>
      <div className={`inventory-filters ${filtersOpen?"open":""}`}>
        <label>Status<select value={status} onChange={(event)=>setStatus(event.target.value)}><option>All</option><option>Published</option><option>Draft</option></select></label>
        <label>Location<select value={locationFilter} onChange={(event)=>setLocationFilter(event.target.value)}><option>All Pune</option><option>Kharadi</option><option>Baner</option><option>Koregaon Park</option><option>Wakad</option></select></label>
        <label>Property type<select><option>All configurations</option><option>2 BHK</option><option>3 BHK</option><option>4 BHK</option></select></label>
        <button onClick={()=>{setStatus("All");setLocationFilter("All Pune");setQuery("");}}>Clear filters</button>
      </div>
      {view === "grid" ? <div className="inventory-grid">
        {filtered.map((property, index)=><article className="inventory-card" key={property.title} onClick={()=>index===0&&onNavigate("property")}>
          <div className="inventory-photo"><img src={property.image} alt={`${property.title} property`}/><span className={property.status==="Draft"?"draft":""}>● {property.status}</span><button aria-label={`More actions for ${property.title}`}>⋯</button></div>
          <div className="inventory-card-body"><span>{property.developer}</span><h2>{property.title}</h2><p>⌖ {property.place}</p><strong>{property.price}<small> onwards</small></strong><div><span><small>VIEWS</small><b>{property.views.toLocaleString("en-IN")}</b></span><span><small>LEADS</small><b>{property.leads}</b></span><button onClick={(event)=>{event.stopPropagation();if(index===0)onNavigate("property");}}>View page ↗</button></div></div>
        </article>)}
        <button className="inventory-add" onClick={()=>onNavigate("new")}><span>＋</span><strong>Add a property</strong><small>Create another shareable microsite</small></button>
      </div> : <div className="inventory-list-wrap">
        <table className="inventory-table"><thead><tr><th>Property</th><th>Developer</th><th>Location</th><th>Status</th><th>Updated</th><th>Views</th><th>Leads</th><th></th></tr></thead><tbody>{filtered.map((property,index)=><tr key={property.title} onClick={()=>index===0&&onNavigate("property")}><td><img src={property.image} alt=""/><span><strong>{property.title}</strong><small>{property.config} · {property.price}</small></span></td><td>{property.developer}</td><td>{property.place}</td><td><span className={`table-status ${property.status==="Draft"?"draft":""}`}>● {property.status}</span></td><td>{property.updated}</td><td>{property.views.toLocaleString("en-IN")}</td><td>{property.leads}</td><td>⋯</td></tr>)}</tbody></table>
        <div className="inventory-mobile-list">{filtered.map((property,index)=><article key={property.title} onClick={()=>index===0&&onNavigate("property")}><img src={property.image} alt=""/><div><span className={`table-status ${property.status==="Draft"?"draft":""}`}>● {property.status}</span><h2>{property.title}</h2><p>{property.place}</p><strong>{property.price}</strong></div><button aria-label={`More actions for ${property.title}`}>⋯</button></article>)}</div>
      </div>}
      {!filtered.length&&<div className="inventory-empty"><span>⌕</span><h2>No properties found</h2><p>Try changing your filters or search terms.</p><button className="button outline" onClick={()=>{setStatus("All");setLocationFilter("All Pune");setQuery("");}}>Clear filters</button></div>}
    </section>
    <nav className="inventory-bottom-nav"><button onClick={()=>onNavigate("dashboard")}>⌂<span>Overview</span></button><button className="active">▱<span>Properties</span></button><button>♙<span>Leads</span></button><button>⌁<span>Analytics</span></button><button>◎<span>Account</span></button></nav>
  </main>;
}

function PropertyPage({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [saved, setSaved] = useState(false);
  const [downPayment, setDownPayment] = useState(30);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const qrRef = useRef<HTMLCanvasElement>(null);
  const propertyPrice = 14800000;
  const loanAmount = Math.max(propertyPrice - downPayment * 100000, 0);
  const monthlyRate = interestRate / 1200;
  const months = tenure * 12;
  const monthlyEmi = monthlyRate
    ? loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1)
    : loanAmount / months;
  const totalPayment = monthlyEmi * months;
  const formatMoney = (value: number) => `₹${Math.round(value).toLocaleString("en-IN")}`;

  useEffect(() => {
    if (!qrRef.current) return;
    QRCode.toCanvas(qrRef.current, window.location.href, {
      width: 144,
      margin: 1,
      color: { dark: "#172033", light: "#FFFFFF" },
    });
  }, []);

  const downloadQr = () => {
    if (!qrRef.current) return;
    const link = document.createElement("a");
    link.download = "verdant-heights-qr.png";
    link.href = qrRef.current.toDataURL("image/png");
    link.click();
  };

  return <main className="property-page">
    <nav className="property-nav"><button className="brand" onClick={() => onNavigate("home")}><span className="brand-mark">N</span><span>nestory</span></button><div><button onClick={() => navigator.clipboard?.writeText(location.href)}>↗ Share</button><button onClick={() => setSaved(!saved)}>{saved ? "♥ Saved" : "♡ Save"}</button></div></nav>
    <section className="gallery">{photos.map((p,i)=><img key={p} src={p} alt={`Verdant Heights property view ${i+1}`}/>) }<span className="photo-count">▦ Show all 18 photos</span></section>
    <section className="property-content">
      <div className="property-detail"><span className="tag">NEW LAUNCH · POSSESSION 2028</span><h1>Verdant Heights</h1><p className="location">Kharadi, Pune <span>·</span> by Aurum Developers</p><div className="fact-row"><div><strong>3 & 4</strong><span>BHK HOMES</span></div><div><strong>1,246–1,890</strong><span>SQ. FT.</span></div><div><strong>28</strong><span>STOREYS</span></div><div><strong>Dec ’28</strong><span>POSSESSION</span></div></div>
      <article className="about"><span>ABOUT THE PROJECT</span><h2>Space to slow down.<br/>City life, close by.</h2><p>Verdant Heights brings generous, light-filled homes to the heart of Kharadi. Three thoughtfully planned towers sit within 5 acres of landscaped calm, minutes from EON IT Park and Pune’s best social infrastructure.</p></article>
      <article className="amenities"><span>EVERYDAY AMENITIES</span><div><p>◌ Infinity pool</p><p>♧ Landscaped gardens</p><p>♙ Fitness studio</p><p>⌂ Residents’ lounge</p><p>◇ Children’s play area</p><p>⌁ 24/7 security</p></div></article>
      <article className="emi-calculator">
        <span>PLAN YOUR PURCHASE</span>
        <div className="emi-heading"><div><h2>Estimate your monthly EMI</h2><p>Adjust the details to explore an indicative home-loan estimate.</p></div><div className="emi-result"><small>ESTIMATED EMI</small><strong>{formatMoney(monthlyEmi)}<i>/month</i></strong></div></div>
        <div className="emi-controls">
          <label><span>Down payment <b>₹{downPayment}L</b></span><input type="range" min="15" max="100" step="1" value={downPayment} onChange={(e)=>setDownPayment(Number(e.target.value))}/></label>
          <label><span>Interest rate <b>{interestRate}%</b></span><input type="range" min="6" max="14" step=".1" value={interestRate} onChange={(e)=>setInterestRate(Number(e.target.value))}/></label>
          <label><span>Loan tenure <b>{tenure} years</b></span><input type="range" min="5" max="30" step="1" value={tenure} onChange={(e)=>setTenure(Number(e.target.value))}/></label>
        </div>
        <div className="emi-breakdown"><span><small>LOAN AMOUNT</small><strong>{formatMoney(loanAmount)}</strong></span><span><small>TOTAL INTEREST</small><strong>{formatMoney(Math.max(totalPayment-loanAmount,0))}</strong></span><span><small>TOTAL REPAYMENT</small><strong>{formatMoney(totalPayment)}</strong></span></div>
        <p className="emi-disclaimer">Indicative estimate only. Final rates, eligibility and repayment terms are determined by the lender.</p>
      </article>
      <article className="qr-share">
        <div><span>SHARE IN PERSON</span><h2>Take this property with you.</h2><p>Scan to open this page on another phone, or download the QR code for a brochure, desk card or site event.</p><button className="button outline" onClick={downloadQr}>↓ Download QR code</button></div>
        <div className="qr-frame"><canvas ref={qrRef} aria-label="QR code for the Verdant Heights property page"/><small>SCAN TO VIEW</small></div>
      </article>
      <article className="documents"><span>PROJECT DOCUMENTS</span><div><span className="doc-icon">PDF</span><div><strong>Verdant Heights — Brochure</strong><small>12.4 MB · Updated July 2026</small></div><button>↓ Download</button></div><div><span className="doc-icon">PDF</span><div><strong>Floor plans & price sheet</strong><small>4.8 MB · Updated July 2026</small></div><button>↓ Download</button></div></article>
      </div>
      <aside className="contact-card"><span>Homes from</span><h2>₹1.48 Cr*</h2><p>Inclusive of base price</p><hr/><div className="agent"><div>AM</div><span><small>LISTED BY</small><strong>Abhi Mehta</strong><p>MarketiX Realty · RERA verified</p></span></div><a className="button whatsapp" href="https://wa.me/919876543210?text=Hi%20Abhi%2C%20I%27m%20interested%20in%20Verdant%20Heights">◉ Chat on WhatsApp</a><a className="call" href="tel:+919876543210">⌕ Call Abhi</a><small className="response">Usually responds within 10 minutes</small></aside>
    </section>
    <div className="mobile-contact"><div><span>Homes from</span><strong>₹1.48 Cr*</strong></div><a href="https://wa.me/919876543210">WhatsApp Abhi</a></div>
    <footer className="property-footer"><button className="brand" onClick={() => onNavigate("home")}><span className="brand-mark">N</span><span>nestory</span></button><p>This property page was prepared by Abhi Mehta. Prices are indicative and subject to change.</p></footer>
  </main>;
}

function NewProperty({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [step, setStep] = useState(1);
  return <main className="create-page">
    <header><button className="brand" onClick={() => onNavigate("dashboard")}><span className="brand-mark">N</span><span>nestory</span></button><button onClick={() => onNavigate("dashboard")}>Save & exit</button></header>
    <div className="create-progress"><span style={{width:`${step * 25}%`}}/></div>
    <section className="create-card"><div className="step-label">STEP {step} OF 4</div>{step===1&&<><h1>Let’s start with the basics.</h1><p>Tell us a little about the property. You can edit this anytime.</p><label>Project or property name<input defaultValue="Verdant Heights" placeholder="e.g. Verdant Heights"/></label><div className="form-row"><label>Developer name<input placeholder="e.g. Aurum Developers"/></label><label>Property type<select defaultValue=""><option value="" disabled>Select type</option><option>Apartment</option><option>Villa</option><option>Plot</option></select></label></div><label>Location<input placeholder="Neighbourhood, city"/></label></>}
      {step===2&&<><h1>Add the key details.</h1><p>Help buyers understand the essentials at a glance.</p><div className="form-row"><label>Configuration<select><option>3 & 4 BHK</option></select></label><label>Starting price<input defaultValue="₹1.48 Cr"/></label></div><div className="form-row"><label>Carpet area<input placeholder="1,246–1,890 sq. ft."/></label><label>Possession<input type="month"/></label></div></>}
      {step===3&&<><h1>Bring it to life.</h1><p>Upload images, floor plans, brochures and price sheets.</p><div className="dropzone"><span>↥</span><strong>Drop files here or click to browse</strong><small>JPG, PNG or PDF · Up to 25 MB each</small><input type="file" multiple aria-label="Upload property files"/></div></>}
      {step===4&&<><h1>Ready to make an impression?</h1><p>Your page has everything it needs. Preview it, then publish when you’re ready.</p><div className="ready-card"><img src={photos[0]} alt="Property preview"/><div><span className="tag">READY TO PUBLISH</span><h3>Verdant Heights</h3><p>Kharadi, Pune · 3 & 4 BHK</p></div></div></>}
      <div className="form-actions">{step>1?<button className="button outline" onClick={()=>setStep(step-1)}>← Back</button>:<span/>}<button className="button dark" onClick={()=>step<4?setStep(step+1):onNavigate("property")}>{step===4?"Publish page":"Continue"} <Arrow /></button></div>
    </section>
  </main>;
}
