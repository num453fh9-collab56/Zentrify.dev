import type { Content, EditableTemplate, Item, Section } from "../editor/types";
import { csv, esc, previewScript, reader, revealCss, revealScript, safeColor, safeUrl } from "../editor/html";

const schema: Section[] = [
  {
    id: "brand",
    label: "Brand",
    fields: [
      { type: "text", key: "name", label: "Brand name" },
      { type: "text", key: "cta", label: "Nav CTA" },
      { type: "text", key: "ctaUrl", label: "CTA link", placeholder: "#contact" },
    ],
  },
  {
    id: "theme",
    label: "Colors",
    fields: [
      { type: "color", key: "gold", label: "Gold / accent" },
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
      { type: "text", key: "tagline", label: "Tagline" },
      { type: "textarea", key: "title", label: "Headline", rows: 2, hint: "*word* for gold text." },
      { type: "textarea", key: "subtitle", label: "Body", rows: 3 },
      { type: "text", key: "btn", label: "Primary CTA" },
      { type: "text", key: "btn2", label: "Secondary CTA" },
    ],
  },
  {
    id: "properties",
    label: "Properties",
    toggleable: true,
    anchor: "properties",
    fields: [
      { type: "text", key: "eyebrow", label: "Tag" },
      { type: "text", key: "title", label: "Heading" },
      {
        type: "list",
        key: "items",
        label: "Properties",
        itemLabel: "Property",
        titleKey: "title",
        max: 6,
        newItem: { title: "Property Name", location: "City, State", price: "$1,200,000", beds: "4", baths: "3", sqft: "3,200", image: "" },
        fields: [
          { type: "text", key: "title", label: "Title" },
          { type: "text", key: "location", label: "Location" },
          { type: "text", key: "price", label: "Price" },
          { type: "text", key: "beds", label: "Bedrooms" },
          { type: "text", key: "baths", label: "Bathrooms" },
          { type: "text", key: "sqft", label: "Sq ft" },
          { type: "image", key: "image", label: "Photo" },
        ],
      },
    ],
  },
  {
    id: "stats",
    label: "Statistics",
    toggleable: true,
    anchor: "stats",
    fields: [
      {
        type: "list",
        key: "items",
        label: "Stats",
        itemLabel: "Stat",
        titleKey: "label",
        min: 1,
        max: 4,
        newItem: { value: "0", label: "Stat" },
        fields: [
          { type: "text", key: "value", label: "Value" },
          { type: "text", key: "label", label: "Label" },
        ],
      },
    ],
  },
  {
    id: "amenities",
    label: "Amenities",
    toggleable: true,
    anchor: "amenities",
    fields: [
      { type: "text", key: "eyebrow", label: "Tag" },
      { type: "text", key: "title", label: "Heading" },
      {
        type: "list",
        key: "items",
        label: "Amenities",
        itemLabel: "Amenity",
        titleKey: "title",
        max: 8,
        newItem: { icon: "✦", title: "Amenity", desc: "Description of this amenity." },
        fields: [
          { type: "text", key: "icon", label: "Icon / emoji" },
          { type: "text", key: "title", label: "Title" },
          { type: "textarea", key: "desc", label: "Description", rows: 2 },
        ],
      },
    ],
  },
  {
    id: "testimonials",
    label: "Testimonials",
    toggleable: true,
    anchor: "testimonials",
    fields: [
      {
        type: "list",
        key: "items",
        label: "Testimonials",
        itemLabel: "Quote",
        titleKey: "name",
        max: 4,
        newItem: { quote: "An exceptional experience.", name: "Name", role: "Title" },
        fields: [
          { type: "textarea", key: "quote", label: "Quote", rows: 2 },
          { type: "text", key: "name", label: "Name" },
          { type: "text", key: "role", label: "Role" },
        ],
      },
    ],
  },
  {
    id: "contact",
    label: "Contact",
    toggleable: true,
    anchor: "contact",
    fields: [
      { type: "text", key: "title", label: "Heading" },
      { type: "textarea", key: "subtitle", label: "Body", rows: 2 },
      { type: "email", key: "email", label: "Email" },
      { type: "text", key: "phone", label: "Phone" },
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
  enabled: { properties: true, stats: true, amenities: true, testimonials: true, contact: true },
  values: {
    brand: { name: "MARBLE", cta: "Schedule a Viewing", ctaUrl: "#contact" },
    theme: { gold: "#c9a84c", bg: "#0c0c0c", surface: "#1a1a1a", text: "#8a8a8a" },
    hero: {
      tagline: "CURATED LUXURY LIVING",
      title: "Residences of *extraordinary* distinction",
      subtitle: "A portfolio of the world's most prestigious addresses, presented with the discretion and expertise that discerning buyers expect.",
      btn: "Explore Properties",
      btn2: "Private Consultation",
    },
    properties: {
      eyebrow: "Portfolio",
      title: "Featured residences",
      items: [
        { title: "The Penthouse at One Park", location: "Manhattan, New York", price: "$28,500,000", beds: "5", baths: "6", sqft: "8,200", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=500&fit=crop" },
        { title: "Villa Serenità", location: "Lake Como, Italy", price: "€12,800,000", beds: "7", baths: "8", sqft: "12,400", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=500&fit=crop" },
        { title: "The Glass House", location: "Beverly Hills, California", price: "$34,000,000", beds: "6", baths: "9", sqft: "14,600", image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=500&fit=crop" },
      ] as unknown as string,
    },
    stats: {
      items: [
        { value: "$4.2B+", label: "Properties sold" },
        { value: "380+", label: "Estates represented" },
        { value: "42", label: "Countries served" },
        { value: "25 yrs", label: "Market expertise" },
      ] as unknown as string,
    },
    amenities: {
      eyebrow: "Experience",
      title: "The Marble standard",
      items: [
        { icon: "🏛️", title: "Architectural Curation", desc: "Every property is hand-selected by our architectural committee for design merit, location, and investment potential." },
        { icon: "🔐", title: "Private Viewings", desc: "Discreet, by-appointment-only tours arranged at your convenience with full NDA protocols." },
        { icon: "📋", title: "Concierge Service", desc: "From legal counsel to interior design, our concierge team manages every detail of your acquisition." },
        { icon: "🌍", title: "Global Network", desc: "Offices in 42 countries with local market experts ensuring you access off-market opportunities." },
        { icon: "📊", title: "Market Intelligence", desc: "Proprietary analytics platform tracking price movements, yield potential, and emerging luxury markets." },
        { icon: "🤝", title: "After-Sale Care", desc: "Property management, renovation coordination, and resale strategy — our relationship endures beyond the transaction." },
      ] as unknown as string,
    },
    testimonials: {
      items: [
        { quote: "Marble understood exactly what we were looking for before we could articulate it ourselves. The entire process was seamless.", name: "Alexandra Whitfield", role: "Art Collector, London" },
        { quote: "Their off-market access is unmatched. We acquired a property that never appeared on any listing — at the right price.", name: "James Chen", role: "CEO, Pacific Ventures" },
        { quote: "Discretion, expertise, and impeccable taste. Marble is the only firm we trust with our portfolio.", name: "Isabelle Moreau", role: "Private Client, Geneva" },
      ] as unknown as string,
    },
    contact: {
      title: "Begin the conversation",
      subtitle: "Every exceptional residence starts with a single enquiry. Our advisory team is available for a confidential discussion about your requirements.",
      email: "private@marble.estate",
      phone: "+1 (212) 555-0180",
    },
    footer: { copy: "© 2026 Marble Estate Advisory", links: "Properties, Services, About, Press, Privacy" },
    seo: { title: "Marble — Luxury Properties", description: "Curated luxury real estate. Discover the world's most prestigious residences with Marble Estate Advisory." },
  },
};

const presets = {
  section: "theme",
  items: [
    { name: "Classic Gold", swatch: ["#c9a84c", "#0c0c0c", "#1a1a1a"], values: { gold: "#c9a84c", bg: "#0c0c0c", surface: "#1a1a1a", text: "#8a8a8a" } },
    { name: "Platinum", swatch: ["#c0c0c0", "#080810", "#141420"], values: { gold: "#c0c0c0", bg: "#080810", surface: "#141420", text: "#7a7a8a" } },
    { name: "Rose Gold", swatch: ["#b76e79", "#0c0808", "#1a1414"], values: { gold: "#b76e79", bg: "#0c0808", surface: "#1a1414", text: "#8a7a7a" } },
    { name: "Ivory Light", swatch: ["#8b7355", "#f5f0e8", "#ebe5da"], values: { gold: "#8b7355", bg: "#f5f0e8", surface: "#ebe5da", text: "#6b6560" } },
  ],
};

function render(content: Content, options?: { preview?: { initialScroll: number; instant: boolean } }) {
  const r = reader(content);
  const s = r.str;
  const G = safeColor(s("theme","gold"),"#c9a84c");
  const BG = safeColor(s("theme","bg"),"#0c0c0c");
  const SF = safeColor(s("theme","surface"),"#1a1a1a");
  const TX = safeColor(s("theme","text"),"#8a8a8a");
  const isDark = BG.toLowerCase() < "#888888";
  const W = isDark ? "#fff" : "#1a1a1a";
  const props = r.list("properties","items");
  const stats = r.list("stats","items");
  const amenities = r.list("amenities","items");
  const testimonials = r.list("testimonials","items");
  const footerLinks = csv(s("footer","links"));

  const heroTitle = esc(s("hero","title")).replace(/\*(.+?)\*/g, `<em>$1</em>`);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(s("seo","title"))}</title>
<meta name="description" content="${esc(s("seo","description"))}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
${previewScript(options?.preview)}
<style>
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{--g:${G};--bg:${BG};--sf:${SF};--tx:${TX};--w:${W}}
html{scroll-behavior:smooth}
body{font-family:'Inter',system-ui,sans-serif;background:var(--bg);color:var(--tx);line-height:1.7;overflow-x:hidden}
h1,h2,h3,.serif{font-family:'Playfair Display',Georgia,serif}
em{font-style:italic;color:var(--g)}

nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:1.2rem 3rem;display:flex;align-items:center;justify-content:space-between;backdrop-filter:blur(14px);background:${BG}cc;border-bottom:1px solid ${isDark?"rgba(255,255,255,.06)":"rgba(0,0,0,.06)"}}
.n-name{font-family:'Playfair Display',serif;font-size:1.2rem;font-weight:700;color:var(--w);text-decoration:none;letter-spacing:.08em}
.n-cta{font-size:.78rem;font-weight:600;color:var(--w);text-decoration:none;border:1px solid var(--g);padding:.55rem 1.5rem;border-radius:4px;transition:all .3s;letter-spacing:.05em}
.n-cta:hover{background:var(--g);color:${isDark?"#000":"#fff"}}

.gold-line{width:60px;height:1px;background:var(--g);margin-bottom:1.5rem}

.hero{min-height:100vh;display:flex;flex-direction:column;justify-content:center;padding:8rem 3rem 5rem;position:relative}
.hero::after{content:'';position:absolute;top:0;right:0;width:40%;height:100%;background:linear-gradient(135deg,${G}06,${G}03);pointer-events:none}
.hero-tag{font-size:.7rem;font-weight:600;letter-spacing:.25em;text-transform:uppercase;color:var(--g);margin-bottom:1.5rem;animation:fadeIn .8s both}
.hero h1{font-size:clamp(2.5rem,6vw,5rem);font-weight:700;color:var(--w);line-height:1.12;max-width:800px;animation:slideUp .9s cubic-bezier(.16,1,.3,1) both}
.hero-sub{font-size:1.05rem;max-width:540px;margin-top:1.5rem;line-height:1.9;animation:fadeIn .8s .3s both}
.hero-btns{display:flex;gap:1rem;margin-top:2.5rem;animation:fadeIn .8s .5s both}
.btn-gold{padding:.9rem 2.2rem;background:var(--g);color:${isDark?"#000":"#fff"};font-weight:600;font-size:.88rem;text-decoration:none;border:none;border-radius:4px;cursor:pointer;transition:all .3s;letter-spacing:.02em}
.btn-gold:hover{box-shadow:0 12px 35px ${G}40;transform:translateY(-2px)}
.btn-ghost{padding:.9rem 2.2rem;background:transparent;color:var(--w);font-weight:500;font-size:.88rem;text-decoration:none;border:1px solid ${isDark?"rgba(255,255,255,.15)":"rgba(0,0,0,.15)"};border-radius:4px;cursor:pointer;transition:all .3s}
.btn-ghost:hover{border-color:var(--g);color:var(--g)}

@keyframes slideUp{from{transform:translateY(40px);opacity:0}to{transform:none;opacity:1}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}

.sec{max-width:1200px;margin:0 auto;padding:7rem 3rem;position:relative}
.sec-tag{font-size:.68rem;font-weight:600;letter-spacing:.25em;text-transform:uppercase;color:var(--g);margin-bottom:1rem;display:block}
.sec-h2{font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:700;color:var(--w);line-height:1.2}

/* Properties */
.prop-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:1.5rem;margin-top:3rem}
.prop{background:var(--sf);border:1px solid ${isDark?"rgba(255,255,255,.05)":"rgba(0,0,0,.06)"};border-radius:12px;overflow:hidden;transition:all .4s}
.prop:hover{transform:translateY(-6px);box-shadow:0 25px 50px rgba(0,0,0,.25)}
.prop-img{position:relative;aspect-ratio:16/10;overflow:hidden;background:var(--sf)}
.prop-img img{width:100%;height:100%;object-fit:cover;transition:transform .7s}
.prop:hover .prop-img img{transform:scale(1.05)}
.prop-img .prop-price{position:absolute;bottom:1rem;left:1rem;background:${BG}dd;backdrop-filter:blur(10px);border:1px solid ${G}30;padding:.4rem 1rem;border-radius:4px;font-family:'Playfair Display',serif;font-size:1rem;font-weight:700;color:var(--g)}
.prop-placeholder{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:2rem;color:var(--g);opacity:.15}
.prop-body{padding:1.5rem}
.prop-body h3{font-size:1.15rem;font-weight:600;color:var(--w);margin-bottom:.25rem}
.prop-loc{font-size:.82rem;margin-bottom:1rem}
.prop-meta{display:flex;gap:1.5rem;font-size:.78rem;padding-top:1rem;border-top:1px solid ${isDark?"rgba(255,255,255,.06)":"rgba(0,0,0,.06)"}}
.prop-meta span{display:flex;align-items:center;gap:.35rem}

/* Stats */
.stats-strip{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:1px;background:${isDark?"rgba(255,255,255,.06)":"rgba(0,0,0,.06)"};border-top:1px solid ${isDark?"rgba(255,255,255,.06)":"rgba(0,0,0,.06)"};border-bottom:1px solid ${isDark?"rgba(255,255,255,.06)":"rgba(0,0,0,.06)"}}
.stat{background:var(--bg);padding:3rem 2rem;text-align:center}
.stat-val{font-family:'Playfair Display',serif;font-size:2.5rem;font-weight:700;color:var(--g)}
.stat-label{font-size:.78rem;letter-spacing:.1em;text-transform:uppercase;margin-top:.4rem}

/* Amenities */
.amen-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-top:3rem}
.amen{padding:2rem;border:1px solid ${isDark?"rgba(255,255,255,.05)":"rgba(0,0,0,.06)"};border-radius:12px;transition:all .4s}
.amen:hover{border-color:${G}30;transform:translateY(-3px)}
.amen-icon{font-size:1.4rem;margin-bottom:1rem}
.amen h3{font-size:1rem;font-weight:600;color:var(--w);margin-bottom:.4rem}
.amen p{font-size:.85rem;line-height:1.7}

/* Testimonials */
.testi-list{margin-top:3rem}
.testi{padding:2.5rem 0;border-bottom:1px solid ${isDark?"rgba(255,255,255,.06)":"rgba(0,0,0,.06)"}}
.testi q{display:block;font-family:'Playfair Display',serif;font-size:clamp(1rem,1.8vw,1.35rem);font-style:italic;color:var(--w);line-height:1.7;max-width:750px}
.testi-from{margin-top:1rem;display:flex;gap:.5rem;align-items:baseline}
.testi-name{font-weight:600;color:var(--w);font-size:.88rem}
.testi-role{font-size:.8rem}

/* Contact */
.contact-sec{text-align:center}
.contact-h{font-size:clamp(2rem,4vw,3.2rem);font-weight:700;color:var(--w);margin-bottom:1rem}
.contact-sub{max-width:560px;margin:0 auto 2.5rem;font-size:.95rem;line-height:1.8}
.contact-row{display:flex;gap:3rem;justify-content:center;flex-wrap:wrap;font-size:.9rem}
.contact-row a{color:var(--g);text-decoration:none;font-weight:500;transition:opacity .3s}
.contact-row a:hover{opacity:.7}

footer{display:flex;justify-content:space-between;align-items:center;padding:2rem 3rem;border-top:1px solid ${isDark?"rgba(255,255,255,.06)":"rgba(0,0,0,.06)"};font-size:.8rem;flex-wrap:wrap;gap:1rem}
.ft-links{display:flex;gap:1.5rem}
.ft-links a{color:var(--tx);text-decoration:none;font-weight:500;transition:color .3s}
.ft-links a:hover{color:var(--g)}

${revealCss}

@media(max-width:768px){
nav{padding:1rem 1.5rem}
.hero{padding:6rem 1.5rem 3rem}
.sec{padding:5rem 1.5rem}
.prop-grid{grid-template-columns:1fr}
.amen-grid{grid-template-columns:1fr}
footer{flex-direction:column;text-align:center;padding:2rem 1.5rem}
}
</style>
</head>
<body>

<nav>
<a href="#top" class="n-name">${esc(s("brand","name"))}</a>
<a href="${safeUrl(s("brand","ctaUrl"))}" class="n-cta">${esc(s("brand","cta"))}</a>
</nav>

<section class="hero" id="top">
<div class="hero-tag rv">${esc(s("hero","tagline"))}</div>
<div class="gold-line"></div>
<h1>${heroTitle}</h1>
<p class="hero-sub">${esc(s("hero","subtitle"))}</p>
<div class="hero-btns">
<a href="${safeUrl(s("brand","ctaUrl"))}" class="btn-gold">${esc(s("hero","btn"))}</a>
${s("hero","btn2")?`<a href="${safeUrl(s("brand","ctaUrl"))}" class="btn-ghost">${esc(s("hero","btn2"))}</a>`:""}
</div>
</section>

${r.on("stats")&&stats.length?`
<div class="stats-strip" id="stats">${stats.map((st,i)=>`<div class="stat rv${i?` d${Math.min(i,3)}`:""}" ><div class="stat-val">${esc(st.value)}</div><div class="stat-label">${esc(st.label)}</div></div>`).join("")}</div>`:""}

${r.on("properties")&&props.length?`
<div class="sec" id="properties">
<span class="sec-tag rv">${esc(s("properties","eyebrow"))}</span>
<h2 class="sec-h2 rv">${esc(s("properties","title"))}</h2>
<div class="prop-grid">${props.map((p,i)=>`<div class="prop rv${i?` d${Math.min(i,3)}`:""}" >
<div class="prop-img">
${safeUrl(p.image)!=="#"?`<img src="${safeUrl(p.image)}" alt="${esc(p.title)}" loading="lazy">`:`<div class="prop-placeholder">⌂</div>`}
<div class="prop-price">${esc(p.price)}</div>
</div>
<div class="prop-body">
<h3>${esc(p.title)}</h3>
<div class="prop-loc">${esc(p.location)}</div>
<div class="prop-meta">
<span>${esc(p.beds)} beds</span>
<span>${esc(p.baths)} baths</span>
<span>${esc(p.sqft)} sq ft</span>
</div>
</div>
</div>`).join("")}</div>
</div>`:""}

${r.on("amenities")&&amenities.length?`
<div class="sec" id="amenities">
<span class="sec-tag rv">${esc(s("amenities","eyebrow"))}</span>
<h2 class="sec-h2 rv">${esc(s("amenities","title"))}</h2>
<div class="amen-grid">${amenities.map((a,i)=>`<div class="amen rv${i?` d${Math.min(i,3)}`:""}" >
<div class="amen-icon">${esc(a.icon)}</div>
<h3>${esc(a.title)}</h3>
<p>${esc(a.desc)}</p>
</div>`).join("")}</div>
</div>`:""}

${r.on("testimonials")&&testimonials.length?`
<div class="sec" id="testimonials">
<div class="gold-line rv"></div>
<div class="testi-list">${testimonials.map((t,i)=>`<div class="testi rv${i?` d${Math.min(i,3)}`:""}" >
<q>${esc(t.quote)}</q>
<div class="testi-from"><span class="testi-name">${esc(t.name)}</span><span class="testi-role">— ${esc(t.role)}</span></div>
</div>`).join("")}</div>
</div>`:""}

${r.on("contact")?`
<div class="sec contact-sec" id="contact">
<div class="gold-line rv" style="margin-left:auto;margin-right:auto"></div>
<h2 class="contact-h rv">${esc(s("contact","title"))}</h2>
<p class="contact-sub rv">${esc(s("contact","subtitle"))}</p>
<div class="contact-row rv d1">
${s("contact","email")?`<a href="mailto:${esc(s("contact","email"))}">${esc(s("contact","email"))}</a>`:""}
${s("contact","phone")?`<a href="tel:${esc(s("contact","phone"))}">${esc(s("contact","phone"))}</a>`:""}
</div>
<div style="margin-top:2rem" class="rv d2">
<a href="${safeUrl(s("brand","ctaUrl"))}" class="btn-gold">Schedule a Private Viewing</a>
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

export const motionMarbleEstate: EditableTemplate = {
  id: "motion-marble-estate",
  name: "Marble — Luxury Properties",
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
