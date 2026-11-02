import type { Content, EditableTemplate, Section } from "../editor/types";
import { csv, esc, previewScript, reader, revealCss, revealScript, safeColor, safeUrl } from "../editor/html";

const schema: Section[] = [
  {
    id: "brand",
    label: "Brand",
    fields: [
      { type: "text", key: "name", label: "Brand name" },
      { type: "text", key: "cta", label: "Nav CTA" },
      { type: "text", key: "ctaUrl", label: "CTA link", placeholder: "#pricing" },
    ],
  },
  {
    id: "theme",
    label: "Colors",
    fields: [
      { type: "color", key: "primary", label: "Primary" },
      { type: "color", key: "accent", label: "Accent" },
      { type: "color", key: "bg", label: "Background" },
      { type: "color", key: "surface", label: "Surface" },
      { type: "color", key: "text", label: "Body text" },
    ],
  },
  {
    id: "hero",
    label: "Hero",
    anchor: "top",
    fields: [
      { type: "text", key: "badge", label: "Badge text" },
      { type: "textarea", key: "title", label: "Headline", rows: 2, hint: "*word* for accent color." },
      { type: "textarea", key: "subtitle", label: "Subtitle", rows: 2 },
      { type: "text", key: "btn", label: "CTA button" },
      { type: "text", key: "scrollText", label: "Scroll label" },
    ],
  },
  {
    id: "specs",
    label: "Spec counters",
    toggleable: true,
    anchor: "specs",
    fields: [
      {
        type: "list",
        key: "items",
        label: "Specs",
        itemLabel: "Spec",
        titleKey: "label",
        min: 1,
        max: 6,
        newItem: { value: "0", label: "Spec" },
        fields: [
          { type: "text", key: "value", label: "Value" },
          { type: "text", key: "label", label: "Label" },
        ],
      },
    ],
  },
  {
    id: "features",
    label: "Features",
    toggleable: true,
    anchor: "features",
    fields: [
      { type: "text", key: "eyebrow", label: "Tag" },
      { type: "text", key: "title", label: "Heading" },
      {
        type: "list",
        key: "items",
        label: "Features",
        itemLabel: "Feature",
        titleKey: "title",
        max: 6,
        newItem: { icon: "⚡", title: "Feature", desc: "Feature description." },
        fields: [
          { type: "text", key: "icon", label: "Icon / emoji" },
          { type: "text", key: "title", label: "Title" },
          { type: "textarea", key: "desc", label: "Description", rows: 2 },
        ],
      },
    ],
  },
  {
    id: "gallery",
    label: "Gallery",
    toggleable: true,
    anchor: "gallery",
    fields: [
      { type: "text", key: "eyebrow", label: "Tag" },
      { type: "text", key: "title", label: "Heading" },
      {
        type: "list",
        key: "items",
        label: "Images",
        itemLabel: "Image",
        titleKey: "title",
        max: 8,
        newItem: { title: "Photo", category: "Exterior", image: "" },
        fields: [
          { type: "text", key: "title", label: "Title" },
          { type: "text", key: "category", label: "Category" },
          { type: "image", key: "image", label: "Image" },
        ],
      },
    ],
  },
  {
    id: "performance",
    label: "Performance banner",
    toggleable: true,
    anchor: "performance",
    fields: [
      { type: "text", key: "eyebrow", label: "Tag" },
      { type: "text", key: "title", label: "Heading" },
      { type: "textarea", key: "subtitle", label: "Body", rows: 3 },
    ],
  },
  {
    id: "pricing",
    label: "Trim levels",
    toggleable: true,
    anchor: "pricing",
    fields: [
      { type: "text", key: "eyebrow", label: "Tag" },
      { type: "text", key: "title", label: "Heading" },
      {
        type: "list",
        key: "items",
        label: "Trims",
        itemLabel: "Trim",
        titleKey: "name",
        min: 1,
        max: 4,
        newItem: { name: "Trim", price: "$0", feats: "Feature 1, Feature 2", btn: "Configure", featured: "" },
        fields: [
          { type: "text", key: "name", label: "Name" },
          { type: "text", key: "price", label: "Starting price" },
          { type: "text", key: "feats", label: "Features (comma-separated)" },
          { type: "text", key: "btn", label: "Button text" },
          { type: "text", key: "featured", label: "Badge (blank = none)", placeholder: "POPULAR" },
        ],
      },
    ],
  },
  {
    id: "cta",
    label: "Call to action",
    toggleable: true,
    anchor: "cta-section",
    fields: [
      { type: "text", key: "title", label: "Heading" },
      { type: "textarea", key: "desc", label: "Body", rows: 2 },
      { type: "text", key: "btn", label: "Button" },
    ],
  },
  {
    id: "footer",
    label: "Footer",
    fields: [
      { type: "text", key: "copy", label: "Copyright" },
      { type: "text", key: "links", label: "Links (comma-separated)" },
    ],
  },
  {
    id: "seo",
    label: "Page settings (SEO)",
    fields: [
      { type: "text", key: "title", label: "Page title" },
      { type: "textarea", key: "description", label: "Meta description", rows: 2 },
    ],
  },
];

const defaults: Content = {
  enabled: { specs: true, features: true, gallery: true, performance: true, pricing: true, cta: true },
  values: {
    brand: { name: "VELOCITY", cta: "Configure Yours →", ctaUrl: "#pricing" },
    theme: { primary: "#ff1744", accent: "#ff6d00", bg: "#0a0a0a", surface: "#141414", text: "#777" },
    hero: {
      badge: "NOW TAKING ORDERS — 2026 MODEL YEAR",
      title: "Born to break *limits*",
      subtitle: "1,200 horsepower. Active aerodynamics. A cockpit built around the driver. This isn't just a car — it's a statement.",
      btn: "Build & Price →",
      scrollText: "Scroll to explore",
    },
    specs: {
      items: [
        { value: "3.2s", label: "0 – 60 mph" },
        { value: "1,200", label: "Horsepower" },
        { value: "211", label: "Top speed mph" },
        { value: "7:04", label: "Nürburgring lap" },
      ] as unknown as string,
    },
    features: {
      eyebrow: "Engineering",
      title: "Performance without compromise",
      items: [
        { icon: "🔥", title: "Twin-Turbo V10", desc: "Hand-built 5.2L engine producing 1,200 hp and 850 lb-ft of torque with flat-plane crank." },
        { icon: "🌀", title: "Active Aero", desc: "Electronically controlled front splitter and rear wing adjust in real time for maximum downforce." },
        { icon: "⚙️", title: "Adaptive Suspension", desc: "Magnetic ride dampers read the road 1,000 times per second for razor-sharp handling." },
        { icon: "🎯", title: "Launch Control", desc: "Precision launch system with torque vectoring delivers consistent sub-3.5s sprints." },
        { icon: "🛡️", title: "Carbon Ceramic Brakes", desc: "390mm carbon-ceramic rotors with 6-piston calipers for fade-free stopping power." },
        { icon: "🖥️", title: "Digital Cockpit", desc: "Fully configurable 12.3″ instrument cluster with HUD and drive mode telemetry." },
      ] as unknown as string,
    },
    gallery: {
      eyebrow: "Gallery",
      title: "Every angle, a masterpiece",
      items: [
        { title: "Front Profile", category: "Exterior", image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=500&fit=crop" },
        { title: "Interior Cockpit", category: "Interior", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=500&fit=crop" },
        { title: "Rear Diffuser", category: "Details", image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=500&fit=crop" },
        { title: "Night Drive", category: "Lifestyle", image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=500&fit=crop" },
      ] as unknown as string,
    },
    performance: {
      eyebrow: "Track-Proven",
      title: "Engineered on the track. Unleashed on the road.",
      subtitle: "Every component has been tested at the limit — from 48-hour endurance runs at Nürburgring to high-speed validation at Nardò. The result is a machine that feels alive in every corner.",
    },
    pricing: {
      eyebrow: "Configure",
      title: "Choose your trim",
      items: [
        { name: "Sport", price: "$185,000", feats: "Twin-Turbo V10, Sport suspension, 20\" alloys, Digital cockpit, Sport exhaust", btn: "Configure Sport", featured: "" },
        { name: "GT", price: "$225,000", feats: "Everything in Sport, Active aero, Carbon ceramic brakes, Alcantara interior, HUD, Adaptive dampers", btn: "Configure GT →", featured: "MOST POPULAR" },
        { name: "Track Edition", price: "$295,000", feats: "Everything in GT, Full carbon body, Roll cage, Slick-ready suspension, Data logger, Titanium exhaust", btn: "Configure Track", featured: "" },
      ] as unknown as string,
    },
    cta: { title: "Ready to feel the difference?", desc: "Book a private test drive at your nearest Velocity experience centre. No commitment, pure adrenaline.", btn: "Book Test Drive →" },
    footer: { copy: "© 2026 Velocity Motors Inc.", links: "Inventory, Build & Price, Locate Dealer, Owners, Media" },
    seo: { title: "Velocity — The Ultimate Supercar", description: "1,200 hp. 3.2s 0-60. Discover the Velocity supercar — engineered for the track, built for the road." },
  },
};

const presets = {
  section: "theme",
  items: [
    { name: "Racing Red", swatch: ["#ff1744", "#ff6d00", "#0a0a0a"], values: { primary: "#ff1744", accent: "#ff6d00", bg: "#0a0a0a", surface: "#141414", text: "#777" } },
    { name: "Midnight Blue", swatch: ["#1565c0", "#42a5f5", "#060c18"], values: { primary: "#1565c0", accent: "#42a5f5", bg: "#060c18", surface: "#0c1628", text: "#5a7a9a" } },
    { name: "Emerald Sport", swatch: ["#00c853", "#69f0ae", "#040c08"], values: { primary: "#00c853", accent: "#69f0ae", bg: "#040c08", surface: "#0a1810", text: "#5a8a6a" } },
    { name: "Titanium", swatch: ["#78909c", "#b0bec5", "#0e1214"], values: { primary: "#78909c", accent: "#b0bec5", bg: "#0e1214", surface: "#1a2024", text: "#6a7a84" } },
  ],
};

function render(content: Content, options?: { preview?: { initialScroll: number; instant: boolean } }) {
  const r = reader(content);
  const s = r.str;
  const P = safeColor(s("theme","primary"),"#ff1744");
  const A = safeColor(s("theme","accent"),"#ff6d00");
  const BG = safeColor(s("theme","bg"),"#0a0a0a");
  const SF = safeColor(s("theme","surface"),"#141414");
  const TX = safeColor(s("theme","text"),"#777");
  const specs = r.list("specs","items");
  const feats = r.list("features","items");
  const gallery = r.list("gallery","items");
  const trims = r.list("pricing","items");
  const footerLinks = csv(s("footer","links"));

  const heroTitle = esc(s("hero","title")).replace(/\*(.+?)\*/g, `<em style="color:${P};font-style:normal">$1</em>`);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(s("seo","title"))}</title>
<meta name="description" content="${esc(s("seo","description"))}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
${previewScript(options?.preview)}
<style>
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{--p:${P};--a:${A};--bg:${BG};--sf:${SF};--tx:${TX}}
html{scroll-behavior:smooth}
body{font-family:'Inter',system-ui,sans-serif;background:var(--bg);color:var(--tx);line-height:1.7;overflow-x:hidden}

nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:1.2rem 3rem;display:flex;align-items:center;justify-content:space-between;backdrop-filter:blur(14px);background:${BG}cc;border-bottom:1px solid rgba(255,255,255,.06)}
.n-logo{font-size:.9rem;font-weight:900;letter-spacing:.25em;text-transform:uppercase;color:#fff;text-decoration:none}
.n-logo span{color:var(--p)}
.n-cta{font-size:.8rem;font-weight:600;color:#fff;text-decoration:none;background:var(--p);padding:.55rem 1.6rem;border-radius:8px;transition:box-shadow .3s,transform .3s}
.n-cta:hover{box-shadow:0 8px 25px ${P}55;transform:translateY(-2px)}

.hero{min-height:100vh;display:flex;flex-direction:column;justify-content:center;padding:8rem 3rem 4rem;position:relative;overflow:hidden}
.hero::before{content:'';position:absolute;top:-30%;right:-10%;width:700px;height:700px;background:radial-gradient(circle,${P}12,transparent 70%);pointer-events:none}
.hero::after{content:'';position:absolute;bottom:-20%;left:-10%;width:500px;height:500px;background:radial-gradient(circle,${A}10,transparent 70%);pointer-events:none}
.hero-badge{display:inline-flex;align-items:center;gap:.5rem;border:1px solid ${P}35;padding:.4rem 1.2rem;border-radius:6px;font-size:.7rem;font-weight:700;color:var(--p);letter-spacing:.1em;text-transform:uppercase;margin-bottom:2rem;animation:fadeIn .8s both}
.hero-badge::before{content:'';width:6px;height:6px;background:var(--p);border-radius:50%;animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(1.5)}}
.hero h1{font-size:clamp(2.8rem,7vw,6rem);font-weight:900;color:#fff;line-height:1.05;letter-spacing:-.03em;max-width:900px;animation:slideUp .9s cubic-bezier(.16,1,.3,1) both}
.hero-sub{font-size:1.05rem;max-width:560px;margin-top:1.5rem;line-height:1.8;animation:fadeIn .8s .3s both}
.hero-actions{display:flex;align-items:center;gap:2rem;margin-top:2.5rem;animation:fadeIn .8s .5s both}
.btn-p{display:inline-flex;align-items:center;gap:.5rem;padding:1rem 2.5rem;background:linear-gradient(135deg,var(--p),var(--a));color:#fff;font-weight:700;font-size:.95rem;text-decoration:none;border-radius:12px;border:none;cursor:pointer;transition:transform .3s,box-shadow .3s}
.btn-p:hover{transform:translateY(-3px) scale(1.03);box-shadow:0 15px 40px ${P}40}
.hero-scroll{font-size:.72rem;letter-spacing:.15em;text-transform:uppercase}
@keyframes slideUp{from{transform:translateY(50px);opacity:0}to{transform:none;opacity:1}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}

/* Specs */
.specs-bar{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:1px;background:rgba(255,255,255,.06);border-top:1px solid rgba(255,255,255,.06);border-bottom:1px solid rgba(255,255,255,.06)}
.spec{background:var(--bg);padding:2.5rem 2rem;text-align:center}
.spec-val{font-size:2.4rem;font-weight:900;color:#fff;background:linear-gradient(135deg,var(--p),var(--a));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.spec-label{font-size:.75rem;letter-spacing:.1em;text-transform:uppercase;margin-top:.3rem}

/* Sections */
.sec{max-width:1200px;margin:0 auto;padding:7rem 3rem;position:relative}
.sec-tag{font-size:.7rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--p);margin-bottom:1rem;display:block}
.sec-h2{font-size:clamp(2rem,4vw,3rem);font-weight:800;color:#fff;letter-spacing:-.02em;line-height:1.15}

/* Features */
.feat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-top:3rem}
.feat{background:var(--sf);border:1px solid rgba(255,255,255,.05);border-radius:16px;padding:2rem;transition:all .4s;position:relative;overflow:hidden}
.feat::after{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--p),var(--a));transform:scaleX(0);transition:transform .4s;transform-origin:left}
.feat:hover::after{transform:scaleX(1)}
.feat:hover{border-color:${P}30;transform:translateY(-4px);box-shadow:0 20px 40px rgba(0,0,0,.3)}
.feat-icon{width:48px;height:48px;border-radius:12px;background:linear-gradient(135deg,${P}20,${A}10);display:flex;align-items:center;justify-content:center;margin-bottom:1.2rem;font-size:1.3rem}
.feat h3{font-size:1.05rem;font-weight:700;color:#fff;margin-bottom:.4rem}
.feat p{font-size:.85rem;line-height:1.7}

/* Gallery */
.gal-scroll{display:flex;gap:1.5rem;overflow-x:auto;padding:2rem 0;scroll-snap-type:x mandatory;scrollbar-width:none}
.gal-scroll::-webkit-scrollbar{display:none}
.gal-item{flex:0 0 360px;scroll-snap-align:start;position:relative;border-radius:16px;overflow:hidden;aspect-ratio:16/10;background:var(--sf)}
.gal-item img{width:100%;height:100%;object-fit:cover;transition:transform .6s}
.gal-item:hover img{transform:scale(1.06)}
.gal-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.7),transparent 50%);display:flex;flex-direction:column;justify-content:flex-end;padding:1.5rem}
.gal-overlay h3{color:#fff;font-size:1rem;font-weight:700}
.gal-overlay span{color:var(--p);font-size:.8rem;font-weight:600;margin-top:.2rem}
.gal-placeholder{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:2rem;color:var(--p);opacity:.2}

/* Performance banner */
.perf{position:relative;padding:6rem 3rem;text-align:center;overflow:hidden}
.perf::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,${P}10,${A}08);z-index:0}
.perf-inner{position:relative;z-index:1;max-width:700px;margin:0 auto}
.speed-lines{position:absolute;top:50%;left:0;right:0;height:2px;z-index:0}
.speed-lines::before,.speed-lines::after{content:'';position:absolute;height:1px;background:linear-gradient(90deg,transparent,${P}30,transparent);animation:speedLine 3s linear infinite}
.speed-lines::before{width:200px;top:-30px;animation-delay:0s}
.speed-lines::after{width:150px;top:30px;right:0;animation-delay:1.5s}
@keyframes speedLine{0%{transform:translateX(-100%);opacity:0}50%{opacity:1}100%{transform:translateX(calc(100vw + 100%));opacity:0}}

/* Pricing */
.trim-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-top:3rem}
.trim{background:var(--sf);border:1px solid rgba(255,255,255,.06);border-radius:20px;padding:2.5rem;transition:.3s;position:relative}
.trim.pop{border-color:${P}40;box-shadow:0 0 50px ${P}12}
.trim.pop::before{content:attr(data-badge);position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,var(--p),var(--a));color:#fff;font-size:.65rem;font-weight:700;padding:.35rem 1.1rem;border-radius:50px;letter-spacing:.5px}
.trim-name{font-size:.8rem;font-weight:700;color:var(--p);text-transform:uppercase;letter-spacing:1px;margin-bottom:.5rem}
.trim-price{font-size:2.8rem;font-weight:900;color:#fff}
.trim-price span{font-size:.85rem;opacity:.4;font-weight:400}
.trim ul{list-style:none;margin:1.5rem 0 2rem}
.trim li{font-size:.85rem;padding:.45rem 0;border-bottom:1px solid rgba(255,255,255,.04);display:flex;align-items:center;gap:.5rem}
.trim li::before{content:'✓';color:var(--p);font-weight:700;font-size:.75rem}
.trim-btn{width:100%;padding:.85rem;border-radius:10px;font-weight:700;font-size:.88rem;border:none;cursor:pointer;transition:.3s}
.trim-btn.solid{background:linear-gradient(135deg,var(--p),var(--a));color:#fff}
.trim-btn.solid:hover{box-shadow:0 12px 35px ${P}40;transform:translateY(-2px)}
.trim-btn.outline{background:transparent;border:1px solid rgba(255,255,255,.12);color:#fff}
.trim-btn.outline:hover{border-color:var(--p);color:var(--p)}

/* CTA */
.cta-box{max-width:750px;margin:0 auto;text-align:center;background:linear-gradient(135deg,${P}12,${A}08);border:1px solid ${P}20;border-radius:24px;padding:4rem 3rem;position:relative;overflow:hidden}
.cta-box::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 30% 50%,${P}15,transparent 60%)}
.cta-box>*{position:relative;z-index:1}
.cta-box h2{font-size:2.2rem;font-weight:800;color:#fff;margin-bottom:1rem;letter-spacing:-.5px}
.cta-box p{max-width:480px;margin:0 auto 2rem;font-size:.95rem}

footer{display:flex;justify-content:space-between;align-items:center;padding:2rem 3rem;border-top:1px solid rgba(255,255,255,.06);font-size:.8rem;flex-wrap:wrap;gap:1rem}
.ft-links{display:flex;gap:1.5rem}
.ft-links a{color:var(--tx);text-decoration:none;font-weight:500;transition:color .3s}
.ft-links a:hover{color:var(--p)}

${revealCss}

@media(max-width:768px){
nav{padding:1rem 1.5rem}
.hero{padding:6rem 1.5rem 3rem}
.sec{padding:5rem 1.5rem}
.feat-grid{grid-template-columns:1fr}
.trim-grid{grid-template-columns:1fr}
.trim.pop{order:-1}
.gal-item{flex:0 0 85vw}
.perf{padding:4rem 1.5rem}
footer{flex-direction:column;text-align:center;padding:2rem 1.5rem}
}
</style>
</head>
<body>

<nav>
<a href="#top" class="n-logo">${esc(s("brand","name")).charAt(0)}<span>${esc(s("brand","name")).slice(1)}</span></a>
<a href="${safeUrl(s("brand","ctaUrl"))}" class="n-cta">${esc(s("brand","cta"))}</a>
</nav>

<section class="hero" id="top">
<div class="hero-badge">${esc(s("hero","badge"))}</div>
<h1>${heroTitle}</h1>
<p class="hero-sub">${esc(s("hero","subtitle"))}</p>
<div class="hero-actions">
<a href="${safeUrl(s("brand","ctaUrl"))}" class="btn-p">${esc(s("hero","btn"))}</a>
${s("hero","scrollText")?`<span class="hero-scroll">${esc(s("hero","scrollText"))}</span>`:""}
</div>
</section>

${r.on("specs")&&specs.length?`
<div class="specs-bar" id="specs">${specs.map((sp,i)=>`<div class="spec rv${i?` d${Math.min(i,3)}`:""}" ><div class="spec-val">${esc(sp.value)}</div><div class="spec-label">${esc(sp.label)}</div></div>`).join("")}</div>`:""}

${r.on("features")&&feats.length?`
<div class="sec" id="features">
<span class="sec-tag rv">${esc(s("features","eyebrow"))}</span>
<h2 class="sec-h2 rv">${esc(s("features","title"))}</h2>
<div class="feat-grid">${feats.map((f,i)=>`<div class="feat rv${i?` d${Math.min(i,3)}`:""}" >
<div class="feat-icon">${esc(f.icon)}</div>
<h3>${esc(f.title)}</h3>
<p>${esc(f.desc)}</p>
</div>`).join("")}</div>
</div>`:""}

${r.on("gallery")?`
<div class="sec" id="gallery">
<span class="sec-tag rv">${esc(s("gallery","eyebrow"))}</span>
<h2 class="sec-h2 rv">${esc(s("gallery","title"))}</h2>
<div class="gal-scroll">${gallery.map(g=>`<div class="gal-item">
${safeUrl(g.image)!=="#"?`<img src="${safeUrl(g.image)}" alt="${esc(g.title)}" loading="lazy">`:`<div class="gal-placeholder">✦</div>`}
<div class="gal-overlay"><h3>${esc(g.title)}</h3><span>${esc(g.category)}</span></div>
</div>`).join("")}</div>
</div>`:""}

${r.on("performance")?`
<div class="perf" id="performance">
<div class="speed-lines"></div>
<div class="perf-inner">
<span class="sec-tag rv">${esc(s("performance","eyebrow"))}</span>
<h2 class="sec-h2 rv" style="margin-bottom:1rem">${esc(s("performance","title"))}</h2>
<p class="rv d1" style="max-width:600px;margin:0 auto;font-size:1rem;line-height:1.8">${esc(s("performance","subtitle"))}</p>
</div>
</div>`:""}

${r.on("pricing")&&trims.length?`
<div class="sec" id="pricing">
<span class="sec-tag rv">${esc(s("pricing","eyebrow"))}</span>
<h2 class="sec-h2 rv">${esc(s("pricing","title"))}</h2>
<div class="trim-grid">${trims.map((t,i)=>{
const pop=!!t.featured;
return `<div class="trim${pop?" pop":""}${pop?` " data-badge="${esc(t.featured)}`:""} rv${i?` d${Math.min(i,3)}`:""}" >
<div class="trim-name">${esc(t.name)}</div>
<div class="trim-price">${esc(t.price)} <span>starting</span></div>
<ul>${csv(t.feats).map(f=>`<li>${esc(f)}</li>`).join("")}</ul>
<button class="trim-btn${pop?" solid":" outline"}">${esc(t.btn)}</button>
</div>`}).join("")}</div>
</div>`:""}

${r.on("cta")?`
<div class="sec" id="cta-section">
<div class="cta-box rv">
<h2>${esc(s("cta","title"))}</h2>
<p>${esc(s("cta","desc"))}</p>
<a href="${safeUrl(s("brand","ctaUrl"))}" class="btn-p">${esc(s("cta","btn"))}</a>
</div>
</div>`:""}

<footer>
<span>${esc(s("footer","copy"))}</span>
${footerLinks.length?`<div class="ft-links">${footerLinks.map(l=>`<a href="#">${esc(l)}</a>`).join("")}</div>`:""}
</footer>

${revealScript}
</body>
</html>`;
}

export const motionVelocityAuto: EditableTemplate = {
  id: "motion-velocity-auto",
  name: "Velocity — Supercar Showcase",
  schema,
  defaults,
  presets,
  render,
  checks: (c) => {
    const r = reader(c);
    const out: { section: string; message: string }[] = [];
    if (!r.str("seo", "description").trim())
      out.push({ section: "seo", message: "Add a search description for better SEO." });
    return out;
  },
};
