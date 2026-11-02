import type { Content, EditableTemplate, Section } from "../editor/types";
import { csv, esc, previewScript, reader, revealCss, revealScript, safeColor, safeUrl } from "../editor/html";

const schema: Section[] = [
  {
    id: "brand",
    label: "Brand",
    fields: [
      { type: "text", key: "name", label: "Brand name" },
      { type: "text", key: "cta", label: "Nav CTA" },
      { type: "text", key: "ctaUrl", label: "CTA link", placeholder: "#destinations" },
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
      { type: "text", key: "tagline", label: "Tagline" },
      { type: "textarea", key: "title", label: "Headline", rows: 2, hint: "*word* for accent text." },
      { type: "textarea", key: "subtitle", label: "Subtitle", rows: 2 },
      { type: "text", key: "btn", label: "CTA button" },
      { type: "text", key: "scrollLabel", label: "Scroll label", placeholder: "Explore destinations" },
    ],
  },
  {
    id: "destinations",
    label: "Destinations",
    toggleable: true,
    anchor: "destinations",
    fields: [
      { type: "text", key: "eyebrow", label: "Tag" },
      { type: "text", key: "title", label: "Heading" },
      {
        type: "list",
        key: "items",
        label: "Destinations",
        itemLabel: "Destination",
        titleKey: "name",
        min: 1,
        max: 6,
        newItem: { name: "Destination", country: "Country", desc: "A brief description of this destination.", image: "", price: "From $999" },
        fields: [
          { type: "text", key: "name", label: "Name" },
          { type: "text", key: "country", label: "Country" },
          { type: "textarea", key: "desc", label: "Description", rows: 2 },
          { type: "image", key: "image", label: "Cover image" },
          { type: "text", key: "price", label: "Price label" },
        ],
      },
    ],
  },
  {
    id: "features",
    label: "Why travel with us",
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
        min: 1,
        max: 6,
        newItem: { icon: "✈️", title: "Feature", desc: "Description of the feature." },
        fields: [
          { type: "text", key: "icon", label: "Icon emoji" },
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
        label: "Reviews",
        itemLabel: "Review",
        titleKey: "name",
        min: 1,
        max: 4,
        newItem: { quote: "An incredible experience!", name: "Name", trip: "Bali, Indonesia" },
        fields: [
          { type: "textarea", key: "quote", label: "Quote", rows: 2 },
          { type: "text", key: "name", label: "Name" },
          { type: "text", key: "trip", label: "Trip / destination" },
        ],
      },
    ],
  },
  {
    id: "stats",
    label: "Stats",
    toggleable: true,
    anchor: "stats",
    fields: [
      {
        type: "list",
        key: "items",
        label: "Counters",
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
    id: "newsletter",
    label: "Newsletter",
    toggleable: true,
    anchor: "newsletter",
    fields: [
      { type: "text", key: "title", label: "Heading" },
      { type: "textarea", key: "desc", label: "Body", rows: 2 },
      { type: "text", key: "placeholder", label: "Input placeholder" },
      { type: "text", key: "btn", label: "Button text" },
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
  enabled: { destinations: true, features: true, testimonials: true, stats: true, newsletter: true },
  values: {
    brand: { name: "Horizon", cta: "Book a Trip →", ctaUrl: "#destinations" },
    theme: { primary: "#f59e0b", accent: "#0ea5e9", bg: "#0c0a06", surface: "#1a1710", text: "#9a8a6a" },
    hero: {
      tagline: "Travel beyond the ordinary",
      title: "Discover the world's\nmost *breathtaking* places",
      subtitle: "Handcrafted itineraries, local guides, and unforgettable experiences. From hidden beaches to mountain summits — we design journeys that change you.",
      btn: "Explore Destinations",
      scrollLabel: "Scroll to explore ↓",
    },
    destinations: {
      eyebrow: "Destinations",
      title: "Where Will You Go?",
      items: [
        { name: "Santorini", country: "Greece", desc: "Iconic white-washed villages perched above azure caldera waters. Sunsets that redefine beauty.", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&h=600&fit=crop", price: "From $1,299" },
        { name: "Kyoto", country: "Japan", desc: "Ancient temples draped in cherry blossoms, bamboo forests, and centuries of living tradition.", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop", price: "From $1,899" },
        { name: "Patagonia", country: "Argentina", desc: "Raw wilderness at the edge of the world — glaciers, peaks, and infinite Patagonian steppe.", image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&h=600&fit=crop", price: "From $2,499" },
        { name: "Marrakech", country: "Morocco", desc: "A sensory feast of spice-filled souks, riad courtyards, and the golden glow of the Sahara at dusk.", image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&h=600&fit=crop", price: "From $999" },
      ] as unknown as string,
    },
    features: {
      eyebrow: "Why Horizon",
      title: "Travel, Reimagined",
      items: [
        { icon: "🗺️", title: "Curated Itineraries", desc: "Every trip is hand-designed by our team of destination experts — no cookie-cutter packages." },
        { icon: "👤", title: "Local Guides", desc: "Connect with knowledgeable locals who share hidden gems you won't find in any guidebook." },
        { icon: "🏨", title: "Handpicked Stays", desc: "From boutique riads to cliffside villas, we find accommodations that are destinations themselves." },
        { icon: "🌱", title: "Sustainable Travel", desc: "Carbon-offset flights, eco-lodges, and partnerships with local conservation initiatives." },
        { icon: "📞", title: "24/7 Concierge", desc: "Real humans available around the clock — because great service doesn't have office hours." },
        { icon: "💳", title: "Flexible Booking", desc: "Free cancellation up to 30 days out, deferred payment plans, and trip insurance included." },
      ] as unknown as string,
    },
    testimonials: {
      items: [
        { quote: "Horizon turned our honeymoon into a story we'll tell for decades. Every detail was flawless — from the private boat in Santorini to the surprise dinner on the caldera.", name: "Emma & Daniel", trip: "Santorini, Greece" },
        { quote: "I've traveled solo to 40+ countries, but my Horizon trip to Kyoto was the first time I felt like I truly experienced a place rather than just visited it.", name: "Priya Mehta", trip: "Kyoto, Japan" },
        { quote: "The Patagonia expedition pushed me out of my comfort zone in the best way. Our guide Carlos was extraordinary — part naturalist, part philosopher.", name: "James Whitfield", trip: "Patagonia, Argentina" },
      ] as unknown as string,
    },
    stats: {
      items: [
        { value: "50+", label: "Destinations" },
        { value: "12K+", label: "Travelers" },
        { value: "4.9★", label: "Average Rating" },
        { value: "98%", label: "Would Rebook" },
      ] as unknown as string,
    },
    newsletter: {
      title: "Get inspired",
      desc: "Join 30,000+ travelers. Destination guides, secret spots, and exclusive deals — straight to your inbox.",
      placeholder: "Your email address",
      btn: "Subscribe →",
    },
    footer: { copy: "© 2025 Horizon Travel Co.", links: "Instagram, Pinterest, Blog, Careers, Privacy" },
    seo: { title: "Horizon — Travel Experience", description: "Handcrafted travel itineraries to the world's most extraordinary destinations. Local guides, boutique stays, unforgettable experiences." },
  },
};

const presets = {
  section: "theme",
  items: [
    { name: "Sunset Amber", swatch: ["#f59e0b", "#0ea5e9", "#0c0a06"], values: { primary: "#f59e0b", accent: "#0ea5e9", bg: "#0c0a06", surface: "#1a1710", text: "#9a8a6a" } },
    { name: "Ocean Blue", swatch: ["#0284c7", "#06b6d4", "#040a12"], values: { primary: "#0284c7", accent: "#06b6d4", bg: "#040a12", surface: "#0c1824", text: "#6a8aaa" } },
    { name: "Forest", swatch: ["#059669", "#84cc16", "#040c08"], values: { primary: "#059669", accent: "#84cc16", bg: "#040c08", surface: "#0c1a10", text: "#6a9a7a" } },
    { name: "Desert Rose", swatch: ["#e11d48", "#fb923c", "#0c0606"], values: { primary: "#e11d48", accent: "#fb923c", bg: "#0c0606", surface: "#1a100e", text: "#aa7a6a" } },
  ],
};

function render(content: Content, options?: { preview?: { initialScroll: number; instant: boolean } }) {
  const r = reader(content);
  const s = r.str;
  const P = safeColor(s("theme","primary"),"#f59e0b");
  const A = safeColor(s("theme","accent"),"#0ea5e9");
  const BG = safeColor(s("theme","bg"),"#0c0a06");
  const SF = safeColor(s("theme","surface"),"#1a1710");
  const TX = safeColor(s("theme","text"),"#9a8a6a");
  const destinations = r.list("destinations","items");
  const features = r.list("features","items");
  const testimonials = r.list("testimonials","items");
  const stats = r.list("stats","items");
  const footerLinks = csv(s("footer","links"));

  const titleHtml = esc(s("hero","title")).replace(/\*(.*?)\*/g,`<em>$1</em>`);

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

nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:1.2rem 3rem;display:flex;align-items:center;justify-content:space-between;backdrop-filter:blur(16px);background:${BG}cc;border-bottom:1px solid rgba(255,255,255,.04)}
.n-name{font-size:1.2rem;font-weight:800;color:#fff;text-decoration:none;letter-spacing:-.02em}
.n-name span{color:var(--p)}
.n-cta{font-size:.82rem;font-weight:700;background:var(--p);color:#fff;padding:.55rem 1.5rem;border-radius:8px;text-decoration:none;transition:box-shadow .3s,transform .3s;border:none;cursor:pointer}
.n-cta:hover{box-shadow:0 8px 30px color-mix(in srgb,var(--p) 40%,transparent);transform:translateY(-2px)}

.hero{min-height:100vh;display:flex;flex-direction:column;justify-content:center;padding:8rem 3rem 4rem;position:relative;z-index:1;overflow:hidden}
.hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 70% 20%,${P}10,transparent 50%),radial-gradient(ellipse at 20% 80%,${A}08,transparent 50%);pointer-events:none}
.hero-tag{font-size:.8rem;font-weight:600;letter-spacing:.15em;text-transform:uppercase;color:var(--p);margin-bottom:1.5rem;animation:fadeUp .7s both}
.hero h1{font-size:clamp(2.8rem,6.5vw,5.5rem);font-weight:800;color:#fff;line-height:1.08;letter-spacing:-.03em;max-width:900px;animation:fadeUp .7s .1s both}
.hero h1 em{font-style:normal;color:var(--p)}
.hero-sub{max-width:560px;font-size:1.05rem;margin-top:1.5rem;line-height:1.8;animation:fadeUp .7s .2s both}
.hero-bottom{display:flex;align-items:center;justify-content:space-between;margin-top:auto;padding-top:3rem;animation:fadeUp .7s .3s both}
.hero-btn{display:inline-flex;align-items:center;gap:.5rem;padding:1rem 2.5rem;background:var(--p);color:#fff;font-weight:700;font-size:.95rem;text-decoration:none;border-radius:100px;border:none;cursor:pointer;transition:transform .3s,box-shadow .3s}
.hero-btn:hover{transform:scale(1.05);box-shadow:0 12px 40px color-mix(in srgb,var(--p) 35%,transparent)}
.hero-scroll{font-size:.75rem;letter-spacing:.15em;text-transform:uppercase;color:var(--tx);opacity:.6}

@keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}

.sec{position:relative;z-index:1;max-width:1200px;margin:0 auto;padding:7rem 3rem}
.sec-tag{font-size:.7rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--p);margin-bottom:1.2rem;display:block}
.sec-h2{font-size:clamp(2rem,4vw,3rem);font-weight:800;color:#fff;line-height:1.15;letter-spacing:-.02em}

.dest-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1.5rem;margin-top:3rem}
.dest{position:relative;border-radius:20px;overflow:hidden;aspect-ratio:4/3;cursor:pointer;transition:transform .5s}
.dest:hover{transform:translateY(-6px)}
.dest-img{width:100%;height:100%;object-fit:cover;transition:transform .7s cubic-bezier(.2,.7,.2,1)}
.dest:hover .dest-img{transform:scale(1.08)}
.dest-placeholder{width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:var(--sf);font-size:3rem;color:var(--p);opacity:.2}
.dest-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.8) 0%,rgba(0,0,0,.15) 50%,transparent);display:flex;flex-direction:column;justify-content:flex-end;padding:2rem}
.dest-country{font-size:.7rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:var(--p);margin-bottom:.3rem}
.dest h3{font-size:1.4rem;font-weight:700;color:#fff}
.dest p{font-size:.85rem;color:rgba(255,255,255,.6);margin-top:.3rem;max-width:320px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.dest-price{position:absolute;top:1.5rem;right:1.5rem;background:rgba(0,0,0,.5);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.1);padding:.4rem 1rem;border-radius:50px;font-size:.8rem;font-weight:600;color:#fff}

.feat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-top:3rem}
.feat{background:var(--sf);border:1px solid rgba(255,255,255,.05);border-radius:16px;padding:2rem;transition:all .4s}
.feat:hover{border-color:${P}25;transform:translateY(-4px)}
.feat-icon{font-size:1.6rem;margin-bottom:1rem}
.feat h3{font-size:1rem;font-weight:700;color:#fff;margin-bottom:.4rem}
.feat p{font-size:.85rem;line-height:1.7;opacity:.7}

.testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-top:3rem}
.testi{background:var(--sf);border:1px solid rgba(255,255,255,.05);border-radius:16px;padding:2rem;transition:all .4s}
.testi:hover{border-color:${P}20;transform:translateY(-3px)}
.testi q{display:block;font-size:.92rem;line-height:1.8;font-style:italic;color:rgba(255,255,255,.7);margin-bottom:1.5rem}
.testi-foot{border-top:1px solid rgba(255,255,255,.06);padding-top:1rem}
.testi-name{font-weight:700;color:#fff;font-size:.9rem}
.testi-trip{font-size:.8rem;color:var(--p);margin-top:.2rem}

.stats-bar{display:grid;grid-template-columns:repeat(4,1fr);gap:2rem;padding:4rem 3rem;max-width:1200px;margin:0 auto;text-align:center;border-top:1px solid rgba(255,255,255,.05);border-bottom:1px solid rgba(255,255,255,.05);position:relative;z-index:1}
.stat-val{font-size:clamp(2rem,4vw,3rem);font-weight:900;background:linear-gradient(135deg,var(--p),var(--a));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.stat-lbl{font-size:.82rem;margin-top:.3rem}

.nl-sec{text-align:center;padding:7rem 3rem;position:relative;z-index:1}
.nl-box{max-width:600px;margin:0 auto;background:linear-gradient(135deg,${P}10,${A}08);border:1px solid ${P}20;border-radius:24px;padding:3.5rem 2.5rem;position:relative;overflow:hidden}
.nl-box::before{content:'';position:absolute;top:-50%;right:-50%;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,${P}15,transparent 70%);pointer-events:none}
.nl-box>*{position:relative;z-index:1}
.nl-box h2{font-size:1.8rem;font-weight:800;color:#fff;margin-bottom:.5rem}
.nl-box p{font-size:.95rem;opacity:.6;margin-bottom:2rem;max-width:400px;margin-left:auto;margin-right:auto}
.nl-form{display:flex;gap:.5rem;max-width:420px;margin:0 auto;background:rgba(0,0,0,.3);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:.3rem}
.nl-form input{flex:1;background:transparent;border:none;color:#fff;padding:.75rem 1rem;font-size:.9rem;outline:none;font-family:inherit}
.nl-form input::placeholder{color:rgba(255,255,255,.25)}
.nl-form button{background:var(--p);color:#fff;border:none;padding:.75rem 1.5rem;border-radius:8px;font-weight:700;font-size:.85rem;cursor:pointer;transition:.3s;white-space:nowrap}
.nl-form button:hover{box-shadow:0 8px 25px color-mix(in srgb,var(--p) 40%,transparent)}

footer{position:relative;z-index:1;display:flex;justify-content:space-between;align-items:center;padding:2rem 3rem;border-top:1px solid rgba(255,255,255,.05);font-size:.8rem;flex-wrap:wrap;gap:1rem}
.ft-links{display:flex;gap:1.5rem}
.ft-links a{color:var(--tx);text-decoration:none;font-weight:500;transition:color .3s}
.ft-links a:hover{color:var(--p)}

${revealCss}
@media(max-width:768px){
nav{padding:1rem 1.5rem}
.hero{padding:6rem 1.5rem 3rem}
.sec{padding:5rem 1.5rem}
.dest-grid,.feat-grid,.testi-grid{grid-template-columns:1fr}
.stats-bar{grid-template-columns:1fr 1fr;padding:3rem 1.5rem}
.nl-form{flex-direction:column}
.nl-form button{width:100%}
footer{flex-direction:column;text-align:center;padding:2rem 1.5rem}
}
</style>
</head>
<body>

<nav>
<a href="#top" class="n-name"><span>${esc(s("brand","name")).charAt(0)}</span>${esc(s("brand","name")).slice(1)}</a>
<a href="${safeUrl(s("brand","ctaUrl"))}" class="n-cta">${esc(s("brand","cta"))}</a>
</nav>

<section class="hero" id="top">
${s("hero","tagline")?`<div class="hero-tag">${esc(s("hero","tagline"))}</div>`:""}
<h1>${titleHtml.replace(/\n/g,"<br>")}</h1>
<p class="hero-sub">${esc(s("hero","subtitle"))}</p>
<div class="hero-bottom">
<a href="${safeUrl(s("brand","ctaUrl"))}" class="hero-btn">${esc(s("hero","btn"))}</a>
${s("hero","scrollLabel")?`<span class="hero-scroll">${esc(s("hero","scrollLabel"))}</span>`:""}
</div>
</section>

${r.on("destinations")&&destinations.length?`
<div class="sec" id="destinations">
<span class="sec-tag rv">${esc(s("destinations","eyebrow"))}</span>
<h2 class="sec-h2 rv">${esc(s("destinations","title"))}</h2>
<div class="dest-grid">${destinations.map((d,i)=>`<div class="dest rv${i?` d${Math.min(i,3)}`:""}" >
${safeUrl(d.image)!=="#"?`<img class="dest-img" src="${safeUrl(d.image)}" alt="${esc(d.name)}" loading="lazy">`:`<div class="dest-placeholder">🌍</div>`}
<div class="dest-overlay">
<div class="dest-country">${esc(d.country)}</div>
<h3>${esc(d.name)}</h3>
<p>${esc(d.desc)}</p>
</div>
${d.price?`<div class="dest-price">${esc(d.price)}</div>`:""}
</div>`).join("")}</div>
</div>`:""}

${r.on("features")&&features.length?`
<div class="sec" id="features">
<span class="sec-tag rv">${esc(s("features","eyebrow"))}</span>
<h2 class="sec-h2 rv">${esc(s("features","title"))}</h2>
<div class="feat-grid">${features.map((f,i)=>`<div class="feat rv${i?` d${Math.min(i,3)}`:""}" >
<div class="feat-icon">${esc(f.icon)}</div>
<h3>${esc(f.title)}</h3>
<p>${esc(f.desc)}</p>
</div>`).join("")}</div>
</div>`:""}

${r.on("stats")&&stats.length?`
<div class="stats-bar">${stats.map((st,i)=>`<div class="rv${i?` d${Math.min(i,3)}`:""}" ><div class="stat-val">${esc(st.value)}</div><div class="stat-lbl">${esc(st.label)}</div></div>`).join("")}</div>`:""}

${r.on("testimonials")&&testimonials.length?`
<div class="sec" id="testimonials">
<div class="testi-grid">${testimonials.map((t,i)=>`<div class="testi rv${i?` d${Math.min(i,3)}`:""}" >
<q>${esc(t.quote)}</q>
<div class="testi-foot"><div class="testi-name">${esc(t.name)}</div><div class="testi-trip">${esc(t.trip)}</div></div>
</div>`).join("")}</div>
</div>`:""}

${r.on("newsletter")?`
<div class="nl-sec" id="newsletter">
<div class="nl-box rv">
<h2>${esc(s("newsletter","title"))}</h2>
<p>${esc(s("newsletter","desc"))}</p>
<div class="nl-form">
<input type="email" placeholder="${esc(s("newsletter","placeholder"))}">
<button>${esc(s("newsletter","btn"))}</button>
</div>
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

export const motionHorizonTravel: EditableTemplate = {
  id: "motion-horizon-travel",
  name: "Horizon — Travel Experience",
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
