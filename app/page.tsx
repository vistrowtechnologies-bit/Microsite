"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

type Screen = "home" | "login" | "signup" | "verify" | "onboarding" | "dashboard" | "properties" | "property" | "new" | "ai-upload" | "processing" | "review" | "preview";

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
  if (screen === "login") return <AuthPage mode="login" onNavigate={navigate} />;
  if (screen === "signup") return <AuthPage mode="signup" onNavigate={navigate} />;
  if (screen === "verify") return <VerifyPage onNavigate={navigate} />;
  if (screen === "onboarding") return <OnboardingPage onNavigate={navigate} />;
  if (screen === "ai-upload") return <AiUploadPage onNavigate={navigate} />;
  if (screen === "processing") return <ProcessingPage onNavigate={navigate} />;
  if (screen === "review") return <ReviewPage onNavigate={navigate} />;
  if (screen === "preview") return <PreviewPage onNavigate={navigate} />;

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
          <button className="text-button" onClick={() => navigate("login")}>Log in</button>
          <button className="button dark small" onClick={() => navigate("signup")}>Start free <Arrow /></button>
        </div>
        <button className="menu-button" onClick={() => setMenu(!menu)} aria-label="Toggle menu">☰</button>
      </nav>

      <section className="hero">
        <div className="eyebrow"><span>●</span> Built for India’s property professionals</div>
        <h1>Upload every file.<br/><em>Share one property link.</em></h1>
        <p className="hero-copy">Drop the developer brochure, price sheet, floor plans, photos and WhatsApp text together. Nestory AI turns the mess into a polished, buyer-ready microsite for you to review and share.</p>
        <div className="hero-actions">
          <button className="button coral" onClick={() => navigate("signup")}>Create with AI <Arrow /></button>
          <button className="play-button" onClick={() => navigate("property")}><span>▶</span> See a live example</button>
        </div>
        <div className="trust-row"><span>No credit card</span><i/> <span>Draft in under 3 minutes</span><i/> <span>Nothing publishes without your approval</span></div>
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

      <section className="transformation" aria-label="From developer files to finished microsite">
        <div className="section-heading compact"><span className="section-number">01 / ONE-SHOT IMPORT</span><h2>Everything they send you.<br/><em>Organised automatically.</em></h2></div>
        <div className="transform-grid">
          <article className="input-stack"><span>YOUR INPUTS</span><div><b>PDF</b><p>Project brochure</p><small>42 pages</small></div><div><b>XLS</b><p>July price sheet</p><small>8 configurations</small></div><div><b>IMG</b><p>Photos & floor plans</p><small>28 files</small></div><div><b>TXT</b><p>Developer WhatsApp notes</p><small>Pasted text</small></div></article>
          <article className="ai-engine"><span className="ai-spark">✦</span><strong>Nestory AI</strong><p>Reads, compares and structures every source.</p><ul><li>✓ 24 facts found</li><li>✓ 18 photos sorted</li><li>✓ 4 floor plans matched</li><li>! 2 items need review</li></ul></article>
          <article className="output-phone"><div className="phone-top"><span>9:41</span><span>● ● ●</span></div><img src={photos[0]} alt="Generated Verdant Heights property page"/><div><small>NEW LAUNCH · RERA VERIFIED</small><h3>Verdant Heights</h3><p>Kharadi, Pune</p><strong>₹1.48 Cr onwards</strong><button onClick={() => navigate("property")}>View generated page ↗</button></div></article>
        </div>
      </section>

      <section className="problem">
        <div><span className="section-number">02 / THE OLD WAY</span><h2>Your client deserves better than <em>15 attachments.</em></h2></div>
        <div className="chaos">
          <div className="whatsapp"><strong>Rakesh Properties</strong><small>online</small><div className="message">Hi sir, sharing details for the Kharadi project 👇</div><div className="files"><span>▧ Brochure_Final_v3.pdf</span><span>▧ PriceList_July.pdf</span><span>▧ Floor_Plan_3BHK.jpg</span><span>▧ +12 more files</span></div></div>
          <p>Clients get overwhelmed. Details get lost. Follow-ups go cold.</p>
        </div>
      </section>

      <section className="steps" id="how">
        <div className="section-heading"><span className="section-number">03 / HOW IT WORKS</span><h2>From files to <em>finished</em><br/>in minutes.</h2></div>
        <div className="step-grid">
          <article><span>01</span><div className="step-icon">↥</div><h3>Upload everything</h3><p>Add PDFs, images, spreadsheets and copied developer text in one batch.</p></article>
          <article><span>02</span><div className="step-icon">✦</div><h3>Review the facts</h3><p>AI extracts the details and shows the exact source behind every important value.</p></article>
          <article><span>03</span><div className="step-icon">↗</div><h3>Share one link</h3><p>Approve the draft and send a clean mobile microsite on WhatsApp.</p></article>
        </div>
      </section>

      <section className="feature-band" id="features">
        <div className="feature-image"><img src={photos[4]} alt="Luxury modern home"/><span className="image-label">A BETTER FIRST IMPRESSION</span></div>
        <div className="feature-copy">
          <span className="section-number light">04 / BUILT TO CONVERT</span>
          <h2>The project page your listings always <em>deserved.</em></h2>
          <p>Beautiful on every screen, thoughtfully organised, and branded with your details—not the builder’s sales desk.</p>
          <ul><li><span>✓</span>Immersive photo gallery</li><li><span>✓</span>Brochures & floor plans in one place</li><li><span>✓</span>Instant WhatsApp and call actions</li><li><span>✓</span>Live view tracking</li></ul>
          <button className="button cream" onClick={() => navigate("property")}>Explore the example <Arrow /></button>
        </div>
      </section>

      <section className="extract-section">
        <span className="section-number">05 / WHAT NESTORY FINDS</span>
        <h2>From raw documents to a <em>complete buyer journey.</em></h2>
        <div className="extract-grid">{["Project facts & RERA","Prices & configurations","Carpet areas & possession","Floor plans & orientations","Amenities & highlights","Location & landmarks","Gallery & construction updates","Brochures & legal documents"].map((item,index)=><article key={item}><span>{String(index+1).padStart(2,"0")}</span><strong>{item}</strong><small>Source-backed and editable</small></article>)}</div>
      </section>

      <section className="trust-section">
        <div><span className="section-number light">06 / YOU STAY IN CONTROL</span><h2>AI does the sorting.<br/><em>You approve the truth.</em></h2><p>Nestory never silently invents prices, areas, possession dates or RERA information. Uncertain facts are flagged and linked back to the original file and page.</p><button className="button cream" onClick={() => navigate("ai-upload")}>Try the review flow <Arrow /></button></div>
        <div className="source-card"><span>SOURCE CHECK</span><h3>Starting price</h3><strong>₹1.48 Cr</strong><p>Found in <b>PriceList_July.pdf</b> · Page 2</p><div><span>96% confidence</span><button>✓ Confirmed</button></div></div>
      </section>

      <section className="pricing" id="pricing">
        <span className="section-number">07 / SIMPLE PRICING</span>
        <h2>Start small. <em>Share big.</em></h2>
        <p>Everything you need to make a sharper first impression.</p>
        <div className="price-cards">
          <article><span>STARTER</span><h3>₹499<small>/ month</small></h3><p>For independent brokers getting started.</p><ul><li>5 active AI property pages</li><li>Unlimited sharing</li><li>Basic view analytics</li></ul><button className="button outline" onClick={() => navigate("signup")}>Start free</button></article>
          <article className="featured"><div className="popular">MOST POPULAR</div><span>PROFESSIONAL</span><h3>₹1,499<small>/ month</small></h3><p>For channel partners managing a portfolio.</p><ul><li>Unlimited property pages</li><li>Personalised client links</li><li>Advanced link analytics</li></ul><button className="button coral" onClick={() => navigate("signup")}>Start 14-day trial</button></article>
        </div>
      </section>

      <footer><div className="footer-brand"><span className="brand-mark">N</span><strong>nestory</strong><p>Upload everything once. Share one beautiful link.</p></div><div><span>PRODUCT</span><a href="#features">Features</a><a href="#pricing">Pricing</a><button onClick={() => navigate("property")}>Live example</button></div><div><span>COMPANY</span><a href="#how">About</a><a href="mailto:hello@nestory.in">Contact</a><a href="#">Privacy</a></div><div className="footer-cta"><p>Ready to turn files into a microsite?</p><button className="button cream" onClick={() => navigate("signup")}>Create with AI <Arrow /></button></div></footer>
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
      <header><div><p>MONDAY, 27 JULY</p><h1>Good morning, Abhi.</h1></div><button className="button coral" onClick={() => onNavigate("ai-upload")}>✦ Create with AI</button></header>
      <button className="ai-quickstart" onClick={() => onNavigate("ai-upload")}><span>✦</span><div><strong>Turn a developer package into a microsite</strong><small>Upload brochures, price sheets, floor plans, photos and copied text together.</small></div><b>Start AI import ↗</b></button>
      <div className="metrics"><article><span>TOTAL VIEWS</span><strong>1,284</strong><small className="up">↗ 18.2% this month</small></article><article><span>ACTIVE PROPERTIES</span><strong>2 <small>/ 5</small></strong><small>Starter plan allowance</small></article><article><span>WHATSAPP CLICKS</span><strong>93</strong><small className="up">↗ 12.4% this month</small></article><article className="mini-chart"><span>VIEWS THIS WEEK</span><div><i style={{height:"32%"}}/><i style={{height:"55%"}}/><i style={{height:"42%"}}/><i style={{height:"76%"}}/><i style={{height:"62%"}}/><i style={{height:"90%"}}/><i style={{height:"72%"}}/></div></article></div>
      <div className="dash-title"><div><h2>Your properties</h2><p>Manage and share every project from one place.</p></div><div className="search">⌕ <input aria-label="Search properties" placeholder="Search properties"/></div></div>
      <div className="project-grid">{projects.map((p, i)=><article className="project-card" key={p.title} onClick={() => i === 0 && onNavigate("property")}><div className="project-image"><img src={p.image} alt=""/><span className={p.status === "Draft" ? "draft" : ""}>● {p.status}</span><button aria-label="More options">⋯</button></div><div className="project-info"><span>{p.place}</span><h3>{p.title}</h3><p>3 BHK · {p.price} onwards</p><div><small>◎ {p.views} views</small><small>↗ Share</small></div></div></article>)}
      <button className="add-card" onClick={() => onNavigate("ai-upload")}><span>✦</span><strong>Create with AI</strong><small>Upload everything in one go</small></button></div>
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
        <button className="button coral" onClick={() => onNavigate("ai-upload")}>✦ Create with AI</button>
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
        <button className="inventory-add" onClick={()=>onNavigate("ai-upload")}><span>✦</span><strong>Create with AI</strong><small>Upload another developer package</small></button>
      </div> : <div className="inventory-list-wrap">
        <table className="inventory-table"><thead><tr><th>Property</th><th>Developer</th><th>Location</th><th>Status</th><th>Updated</th><th>Views</th><th>Leads</th><th></th></tr></thead><tbody>{filtered.map((property,index)=><tr key={property.title} onClick={()=>index===0&&onNavigate("property")}><td><img src={property.image} alt=""/><span><strong>{property.title}</strong><small>{property.config} · {property.price}</small></span></td><td>{property.developer}</td><td>{property.place}</td><td><span className={`table-status ${property.status==="Draft"?"draft":""}`}>● {property.status}</span></td><td>{property.updated}</td><td>{property.views.toLocaleString("en-IN")}</td><td>{property.leads}</td><td>⋯</td></tr>)}</tbody></table>
        <div className="inventory-mobile-list">{filtered.map((property,index)=><article key={property.title} onClick={()=>index===0&&onNavigate("property")}><img src={property.image} alt=""/><div><span className={`table-status ${property.status==="Draft"?"draft":""}`}>● {property.status}</span><h2>{property.title}</h2><p>{property.place}</p><strong>{property.price}</strong></div><button aria-label={`More actions for ${property.title}`}>⋯</button></article>)}</div>
      </div>}
      {!filtered.length&&<div className="inventory-empty"><span>⌕</span><h2>No properties found</h2><p>Try changing your filters or search terms.</p><button className="button outline" onClick={()=>{setStatus("All");setLocationFilter("All Pune");setQuery("");}}>Clear filters</button></div>}
    </section>
    <nav className="inventory-bottom-nav"><button onClick={()=>onNavigate("dashboard")}>⌂<span>Overview</span></button><button className="active">▱<span>Properties</span></button><button>♙<span>Leads</span></button><button>⌁<span>Analytics</span></button><button>◎<span>Account</span></button></nav>
  </main>;
}

function AuthPage({ mode, onNavigate }: { mode: "login" | "signup"; onNavigate: (s: Screen) => void }) {
  const signup = mode === "signup";
  return <main className="auth-shell">
    <section className="auth-story">
      <button className="brand light-brand" onClick={() => onNavigate("home")}><span className="brand-mark">N</span><span>nestory</span></button>
      <div><span className="section-number light">BUILT FOR BROKERS & CHANNEL PARTNERS</span><h1>From developer files to a client-ready link.</h1><p>Upload the entire project package once. Nestory organises it into a premium microsite you can confidently share.</p><div className="auth-proof"><span>✦</span><p><strong>Source-backed AI</strong><small>You review every important fact before publishing.</small></p></div></div>
      <small>Properties, presented better.</small>
    </section>
    <section className="auth-form-wrap">
      <div className="auth-card">
        <span className="auth-kicker">{signup ? "CREATE YOUR WORKSPACE" : "WELCOME BACK"}</span>
        <h1>{signup ? "Start sharing smarter." : "Log in to Nestory."}</h1>
        <p>{signup ? "Create your broker workspace in less than a minute." : "Access your properties, leads and share links."}</p>
        <form onSubmit={(event)=>{event.preventDefault();onNavigate("verify");}}>
          {signup&&<label>Full name<input required defaultValue="Abhi Mehta" placeholder="Your name"/></label>}
          <label>Mobile number<div className="phone-input"><span>🇮🇳 +91</span><input required inputMode="tel" defaultValue="98765 43210" aria-label="Mobile number"/></div></label>
          {signup&&<label>Work email <small>Optional</small><input type="email" placeholder="you@company.com"/></label>}
          <button className="button coral" type="submit">{signup ? "Create account" : "Send login OTP"} <Arrow /></button>
        </form>
        <div className="auth-switch">{signup ? "Already have an account?" : "New to Nestory?"}<button onClick={()=>onNavigate(signup?"login":"signup")}>{signup ? "Log in" : "Create account"}</button></div>
        <small className="legal-copy">By continuing, you agree to Nestory’s Terms and Privacy Policy.</small>
      </div>
    </section>
  </main>;
}

function VerifyPage({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [code, setCode] = useState(["2","4","8","6"]);
  return <main className="simple-flow">
    <header><button className="brand" onClick={()=>onNavigate("home")}><span className="brand-mark">N</span><span>nestory</span></button><button onClick={()=>onNavigate("login")}>← Back</button></header>
    <section className="verify-card"><span className="flow-icon">✉</span><span className="auth-kicker">VERIFY YOUR NUMBER</span><h1>Enter the code we sent.</h1><p>A 4-digit OTP was sent to +91 98765 43210.</p><div className="otp-row">{code.map((digit,index)=><input key={index} inputMode="numeric" maxLength={1} value={digit} aria-label={`OTP digit ${index+1}`} onChange={(event)=>{const next=[...code];next[index]=event.target.value;setCode(next);}}/>)}</div><button className="button coral" onClick={()=>onNavigate("onboarding")}>Verify & continue <Arrow /></button><button className="resend">Resend code in 00:24</button></section>
  </main>;
}

function OnboardingPage({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("Channel partner");
  const titles = ["How do you work?","Tell us about your business.","Build your public identity.","Set your sharing defaults.","You’re ready to create."];
  return <main className="onboarding-shell">
    <aside><button className="brand" onClick={()=>onNavigate("home")}><span className="brand-mark">N</span><span>nestory</span></button><div><span>SETUP PROGRESS</span><strong>{step} of 5</strong><div className="onboarding-progress"><i style={{width:`${step*20}%`}}/></div></div><p>We use these details to brand every microsite and contact action automatically.</p></aside>
    <section className="onboarding-main">
      <div className="onboarding-card"><span className="auth-kicker">STEP {step} OF 5</span><h1>{titles[step-1]}</h1>
        {step===1&&<><p>Choose the option that best describes your business.</p><div className="choice-grid">{["Independent broker","Channel partner","Brokerage or team"].map((item)=><button key={item} className={role===item?"selected":""} onClick={()=>setRole(item)}><span>{item==="Independent broker"?"◎":item==="Channel partner"?"⌂":"♙"}</span><strong>{item}</strong><small>{item==="Independent broker"?"I market a focused set of properties.":item==="Channel partner"?"I manage projects across developers.":"Multiple people manage one portfolio."}</small></button>)}</div></>}
        {step===2&&<><p>This appears in your workspace and broker profile.</p><label>Business name<input defaultValue="MarketiX Realty"/></label><div className="form-row"><label>Primary city<input defaultValue="Pune"/></label><label>Projects managed<select defaultValue="10–25"><option>1–5</option><option>5–10</option><option>10–25</option><option>25+</option></select></label></div></>}
        {step===3&&<><p>Buyers will see these details on every property page.</p><div className="profile-upload"><span>AM</span><button>Upload profile photo</button></div><label>Public display name<input defaultValue="Abhi Mehta"/></label><label>RERA registration<input defaultValue="A52100012345"/></label><label>WhatsApp number<input defaultValue="+91 98765 43210"/></label></>}
        {step===4&&<><p>These defaults can be changed for any project or client link.</p><label>Default share message<textarea defaultValue="Hi, sharing the complete project details in one link. Let me know if you would like to schedule a site visit."/></label><div className="form-row"><label>Primary language<select><option>English</option><option>Hindi</option><option>Marathi</option></select></label><label>Buyer CTA<select><option>WhatsApp first</option><option>Call first</option><option>Book site visit</option></select></label></div></>}
        {step===5&&<div className="onboarding-ready"><span>✓</span><h2>Your broker workspace is ready.</h2><p>Next, upload one complete developer package and Nestory will build the first draft for you.</p><ul><li>✓ MarketiX Realty branding</li><li>✓ RERA profile added</li><li>✓ WhatsApp actions configured</li></ul></div>}
        <div className="onboarding-actions">{step>1?<button className="button outline" onClick={()=>setStep(step-1)}>← Back</button>:<span/>}<button className="button coral" onClick={()=>step<5?setStep(step+1):onNavigate("ai-upload")}>{step===5?"Create my first project":"Continue"} <Arrow /></button></div>
      </div>
    </section>
  </main>;
}

function AiUploadPage({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [files, setFiles] = useState(["Verdant_Heights_Brochure.pdf","PriceList_July_2026.xlsx","3BHK_FloorPlan.png","Project_Photos.zip"]);
  const [text, setText] = useState("New launch in Kharadi. 3 and 4 BHK premium residences. Possession December 2028. Near EON IT Park. Current offer valid until 31 July.");
  return <main className="upload-shell">
    <header><button className="brand" onClick={()=>onNavigate("dashboard")}><span className="brand-mark">N</span><span>nestory</span></button><div><span>New project</span><button onClick={()=>onNavigate("dashboard")}>Save & exit</button></div></header>
    <section className="upload-intro"><span className="ai-pill">✦ CREATE WITH AI</span><h1>Upload everything you received.</h1><p>Add the developer brochure, price sheet, floor plans, images and copied messages together. Nestory will organise them into one project draft.</p></section>
    <section className="upload-workspace">
      <div className="upload-primary">
        <label className="mega-dropzone"><input type="file" multiple accept=".pdf,.xlsx,.xls,.docx,.jpg,.jpeg,.png,.webp,.zip" onChange={(event)=>setFiles([...files,...Array.from(event.target.files||[]).map(file=>file.name)])}/><span>↥</span><h2>Drop all project files here</h2><p>PDF, XLSX, DOCX, JPG, PNG, WebP or ZIP · Up to 100 MB each</p><b>Browse files</b></label>
        <div className="uploaded-files"><div><span>FILES READY</span><small>{files.length} sources</small></div>{files.map((file,index)=><article key={`${file}-${index}`}><span className={`file-badge ${file.toLowerCase().includes("pdf")?"pdf":file.toLowerCase().includes("xls")?"xls":"img"}`}>{file.split(".").pop()?.toUpperCase()}</span><p><strong>{file}</strong><small>{index===0?"18.4 MB":index===1?"426 KB":"3.2 MB"} · Ready</small></p><button aria-label={`Remove ${file}`} onClick={()=>setFiles(files.filter((_,item)=>item!==index))}>×</button></article>)}</div>
      </div>
      <aside className="paste-panel"><span>PASTE DEVELOPER TEXT</span><h2>Add the WhatsApp or email notes.</h2><p>AI will compare these notes with the uploaded documents.</p><textarea value={text} onChange={(event)=>setText(event.target.value)} placeholder="Paste the developer's message here…"/><div className="privacy-note"><span>⌾</span><p><strong>Your files stay private</strong><small>Nothing is published until you review and approve it.</small></p></div></aside>
    </section>
    <div className="upload-footer"><button className="button outline" onClick={()=>onNavigate("new")}>Create manually</button><div><span>{files.length} files + pasted text ready</span><button className="button coral" onClick={()=>onNavigate("processing")}>Generate project draft <span>✦</span></button></div></div>
  </main>;
}

function ProcessingPage({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [phase, setPhase] = useState(0);
  const stages = ["Securing your uploads","Reading brochures and text","Finding project facts","Sorting photos and floor plans","Comparing prices and configurations","Building your microsite draft"];
  useEffect(()=>{const timer=window.setInterval(()=>setPhase(value=>value<stages.length?value+1:value),650);return()=>window.clearInterval(timer);},[stages.length]);
  const done = phase >= stages.length;
  return <main className="processing-shell"><button className="brand" onClick={()=>onNavigate("home")}><span className="brand-mark">N</span><span>nestory</span></button><section><div className={`processing-orb ${done?"done":""}`}>{done?"✓":"✦"}<i/><i/><i/></div><span className="ai-pill">{done?"DRAFT READY":"NESTORY AI IS WORKING"}</span><h1>{done?"Your project draft is ready.":"Turning your files into a property page."}</h1><p>{done?"We found 24 project facts, sorted 18 photos and matched 4 floor plans. Two details need your confirmation.":"You can leave this screen. We’ll keep processing safely in the background."}</p><div className="processing-list">{stages.map((stage,index)=><div key={stage} className={index<phase?"complete":index===phase?"active":""}><span>{index<phase?"✓":index===phase?"◌":index+1}</span><strong>{stage}</strong><small>{index<phase?"Complete":index===phase?"Working…":"Waiting"}</small></div>)}</div>{done&&<button className="button coral" onClick={()=>onNavigate("review")}>Review extracted facts <Arrow /></button>}</section></main>;
}

function ReviewPage({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [section, setSection] = useState("Project basics");
  const [confirmed, setConfirmed] = useState(6);
  const sections = [["Project basics","6/6"],["RERA & possession","2/3"],["Configurations","4/4"],["Pricing","3/4"],["Highlights","5/5"],["Amenities","12/12"],["Floor plans","4/4"],["Gallery","18/18"],["Location","7/8"],["Documents","3/3"]];
  return <main className="review-shell">
    <header><button className="brand" onClick={()=>onNavigate("dashboard")}><span className="brand-mark">N</span><span>nestory</span></button><div><span><b>Verdant Heights</b><small>AI draft · Autosaved</small></span><button className="button outline" onClick={()=>onNavigate("preview")}>Preview</button><button className="button coral" onClick={()=>onNavigate("preview")}>Finish review <Arrow /></button></div></header>
    <aside className="review-nav"><div><span>REVIEW PROGRESS</span><strong>42 of 45 facts</strong><div><i style={{width:"93%"}}/></div><small>2 need review · 1 missing</small></div>{sections.map(([name,count])=><button key={name} className={section===name?"active":""} onClick={()=>setSection(name)}><span>{name}</span><small>{count}</small></button>)}</aside>
    <section className="review-editor"><div className="review-heading"><span className="auth-kicker">AI-EXTRACTED CONTENT</span><h1>{section}</h1><p>Confirm the facts Nestory found. Select any source label to see where it came from.</p></div>
      <div className="review-fields">
        <label><span>Project name <b className="confidence high">96% confidence</b></span><input defaultValue="Verdant Heights"/><small>◉ Brochure · Page 1</small></label>
        <label><span>Developer <b className="confidence high">94% confidence</b></span><input defaultValue="Aurum Developers"/><small>◉ Brochure · Page 2</small></label>
        <label><span>Location <b className="confidence high">98% confidence</b></span><input defaultValue="Kharadi, Pune"/><small>◉ Brochure · Page 4</small></label>
        <div className="review-row"><label><span>Starting price <b className="confidence medium">Needs review</b></span><input defaultValue="₹1.48 Cr"/><small>◉ Price sheet · Row 3</small></label><label><span>Possession <b className="confidence medium">Conflict</b></span><select defaultValue="December 2028"><option>December 2028</option><option>March 2029</option></select><small>Brochure says Dec ’28 · RERA says Mar ’29</small></label></div>
        <label><span>Buyer-friendly summary <b className="confidence ai">✦ AI written</b></span><textarea defaultValue="Verdant Heights brings generous, light-filled homes to the heart of Kharadi. Three thoughtfully planned towers sit within five acres of landscaped calm, minutes from EON IT Park."/></label>
      </div>
      <div className="review-confirm"><span><b>{confirmed}/6</b> facts confirmed in this section</span><button className="button coral" onClick={()=>setConfirmed(6)}>✓ Confirm section</button></div>
    </section>
    <aside className="source-viewer"><div><span>SOURCE EVIDENCE</span><button>↗ Open original</button></div><article className="pdf-page"><span>AURUM</span><h2>Verdant Heights</h2><p>Elevated living in the heart of Kharadi</p><div className="source-highlight">Premium 3 & 4 BHK residences<br/>Starting from ₹1.48 Cr*</div><small>PRICE LIST · VALID JULY 2026</small></article><div className="source-meta"><strong>Verdant_Heights_Brochure.pdf</strong><small>Page 1 of 42 · Uploaded today</small></div></aside>
  </main>;
}

function PreviewPage({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [device, setDevice] = useState<"mobile"|"desktop">("mobile");
  return <main className="preview-shell"><header><button className="brand" onClick={()=>onNavigate("review")}><span className="brand-mark">N</span><span>nestory</span></button><div className="device-toggle"><button className={device==="mobile"?"active":""} onClick={()=>setDevice("mobile")}>▯ Mobile</button><button className={device==="desktop"?"active":""} onClick={()=>setDevice("desktop")}>▰ Desktop</button></div><div><button className="button outline" onClick={()=>onNavigate("review")}>Continue editing</button><button className="button coral" onClick={()=>onNavigate("property")}>Publish page <Arrow /></button></div></header><section className={`preview-canvas ${device}`}><div className="preview-browser"><div className="preview-browser-bar"><span>● ● ●</span><b>nestory.in/p/verdant-heights</b><span>↗</span></div><div className="preview-site"><img src={photos[0]} alt="Verdant Heights preview"/><div><span>NEW LAUNCH · RERA VERIFIED</span><h1>Verdant Heights</h1><p>Kharadi, Pune · by Aurum Developers</p><section><strong>3 & 4 BHK</strong><strong>₹1.48 Cr onwards</strong></section><button onClick={()=>onNavigate("property")}>View complete preview</button></div></div></div></section></main>;
}

function PropertyPage({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [saved, setSaved] = useState(false);
  const [visitOpen, setVisitOpen] = useState(false);
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
      <div className="property-detail"><span className="tag">NEW LAUNCH · RERA VERIFIED · POSSESSION 2028</span><h1>Verdant Heights</h1><p className="location">Kharadi, Pune <span>·</span> by Aurum Developers</p><div className="fact-row"><div><strong>3 & 4</strong><span>BHK HOMES</span></div><div><strong>1,246–1,890</strong><span>SQ. FT.</span></div><div><strong>28</strong><span>STOREYS</span></div><div><strong>Dec ’28</strong><span>POSSESSION</span></div></div>
      <article className="about"><span>ABOUT THE PROJECT</span><h2>Space to slow down.<br/>City life, close by.</h2><p>Verdant Heights brings generous, light-filled homes to the heart of Kharadi. Three thoughtfully planned towers sit within 5 acres of landscaped calm, minutes from EON IT Park and Pune’s best social infrastructure.</p></article>
      <article className="configuration-section"><span>HOMES & PRICING</span><div className="property-section-heading"><h2>Choose the space that fits.</h2><small>Prices updated 27 July 2026</small></div><div className="configuration-table"><div className="config-head"><span>HOME</span><span>CARPET AREA</span><span>STARTING PRICE</span><span></span></div><div><strong>3 BHK</strong><span>1,246 sq. ft.</span><b>₹1.48 Cr*</b><button>View plan</button></div><div><strong>3 BHK Large</strong><span>1,485 sq. ft.</span><b>₹1.76 Cr*</b><button>View plan</button></div><div><strong>4 BHK</strong><span>1,890 sq. ft.</span><b>₹2.24 Cr*</b><button>View plan</button></div></div><p className="price-note">*Indicative agreement value. Taxes, registration, parking and other charges may apply.</p></article>
      <article className="floorplans-section"><span>FLOOR PLANS</span><div className="property-section-heading"><h2>Thoughtfully planned homes.</h2><div><button className="active">3 BHK</button><button>4 BHK</button></div></div><div className="floorplan-card"><div className="floorplan-visual"><div className="room living">LIVING<br/><small>20&apos; × 12&apos;</small></div><div className="room bed1">BEDROOM<br/><small>12&apos; × 11&apos;</small></div><div className="room bed2">BEDROOM<br/><small>11&apos; × 10&apos;</small></div><div className="room kitchen">KITCHEN<br/><small>10&apos; × 8&apos;</small></div><div className="room bed3">MASTER<br/><small>14&apos; × 12&apos;</small></div></div><div><span>TYPE A · 3 BHK</span><h3>1,246 sq. ft.</h3><p>East-facing living room · Private utility balcony · Two attached baths</p><button className="button outline">⌕ View full screen</button></div></div></article>
      <article className="amenities"><span>EVERYDAY AMENITIES</span><div><p>◌ Infinity pool</p><p>♧ Landscaped gardens</p><p>♙ Fitness studio</p><p>⌂ Residents’ lounge</p><p>◇ Children’s play area</p><p>⌁ 24/7 security</p></div></article>
      <article className="location-section"><span>LOCATION</span><h2>Connected to what matters.</h2><div className="location-grid"><div className="map-visual"><i className="road one"/><i className="road two"/><i className="road three"/><span className="map-pin">⌖<b>Verdant Heights</b></span><small>Kharadi · Pune</small></div><div className="landmarks"><div><span>⌁</span><p><strong>EON IT Park</strong><small>6 min drive</small></p></div><div><span>✚</span><p><strong>Manipal Hospital</strong><small>9 min drive</small></p></div><div><span>✈</span><p><strong>Pune Airport</strong><small>22 min drive</small></p></div><div><span>▣</span><p><strong>World Trade Centre</strong><small>7 min drive</small></p></div></div></div></article>
      <article className="rera-section"><div><span>PROJECT ASSURANCE</span><h2>Verified details, clearly presented.</h2><p>Project registration and possession information is shown from the latest uploaded documents.</p></div><div><span>MAHARERA</span><strong>P52100054321</strong><small>Registration verified</small><button>View RERA certificate ↗</button></div></article>
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
      <article className="faq-section"><span>BUYER QUESTIONS</span><h2>Good to know.</h2>{[["Is the quoted price all-inclusive?","The displayed price is indicative. Stamp duty, registration, taxes, parking and floor-rise charges may apply."],["Can I schedule a site visit?","Yes. Choose a preferred date and Abhi will confirm the available time on WhatsApp."],["When is possession expected?","The latest developer document indicates December 2028. The registered RERA completion date should be treated as the governing date."]].map(([question,answer])=><details key={question}><summary>{question}<span>＋</span></summary><p>{answer}</p></details>)}</article>
      </div>
      <aside className="contact-card"><span>Homes from</span><h2>₹1.48 Cr*</h2><p>Indicative agreement value</p><hr/><div className="agent"><div>AM</div><span><small>LISTED BY</small><strong>Abhi Mehta</strong><p>MarketiX Realty · RERA verified</p></span></div><a className="button whatsapp" href="https://wa.me/919876543210?text=Hi%20Abhi%2C%20I%27m%20interested%20in%20Verdant%20Heights">◉ Chat on WhatsApp</a><button className="button site-visit" onClick={()=>setVisitOpen(!visitOpen)}>⌂ Schedule site visit</button><a className="call" href="tel:+919876543210">⌕ Call Abhi</a>{visitOpen&&<form className="visit-form" onSubmit={(event)=>{event.preventDefault();setVisitOpen(false);}}><label>Preferred date<input type="date" required/></label><label>Your name<input required placeholder="Full name"/></label><button type="submit">Request visit</button></form>}<small className="response">Usually responds within 10 minutes</small></aside>
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
