import type { Content, EditableTemplate, Item, Section } from "../editor/types";
import { csv, esc, previewScript, reader, revealCss, revealScript, safeColor, safeUrl } from "../editor/html";

const schema: Section[] = [
  {
    id: "brand",
    label: "Brand",
    fields: [
      { type: "text", key: "name", label: "Brand name" },
      { type: "text", key: "cta", label: "Nav CTA" },
      { type: "text", key: "ctaUrl", label: "CTA link", placeholder: "#collection" },
    ],
  },
  {
    id: "theme",
    label: "Colors",
    fields: [
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
      { type: "text", key: "season", label: "Season tag" },
      { type: "textarea", key: "title", label: "Headline", rows: 2, hint: "*word* for accent text." },
      { type: "textarea", key: "subtitle", label: "Subtitle", rows: 2 },
      { type: "text", key: "btn", label: "Primary button" },
      { type: "text", key: "btn2", label: "Secondary button" },
    ],
  },
  {
    id: "collection",
    label: "Collection",
    toggleable: true,
    anchor: "collection",
    fields: [
      { type: "text", key: "eyebrow", label: "Tag" },
      { type: "text", key: "title", label: "Heading" },
      {
        type: "list",
        key: "items",
        label: "Pieces",
        itemLabel: "Piece",
        titleKey: "name",
        min: 1,
        max: 6,
        newItem: { name: "Piece Name", desc: "A brief description.", image: "" },
        fields: [
          { type: "text", key: "name", label: "Name" },
          { type: "textarea", key: "desc", label: "Description", rows: 2 },
          { type: "image", key: "image", label: "Image" },
        ],
      },
    ],
  },
  {
    id: "editorial",
    label: "Editorial quote",
    toggleable: true,
    anchor: "editorial",
    fields: [
      { type: "text", key: "eyebrow", label: "Tag" },
      { type: "textarea", key: "quote", label: "Quote", rows: 3 },
      { type: "text", key: "attribution", label: "Attribution" },
    ],
  },
  {
    id: "lookbook",
    label: "Lookbook",
    toggleable: true,
    anchor: "lookbook",
    fields: [
      { type: "text", key: "eyebrow", label: "Tag" },
      { type: "text", key: "title", label: "Heading" },
      {
        type: "list",
        key: "items",
        label: "Shots",
        itemLabel: "Shot",
        titleKey: "title",
        min: 1,
        max: 6,
        newItem: { title: "Look", image: "" },
        fields: [
          { type: "text", key: "title", label: "Title" },
          { type: "image", key: "image", label: "Image" },
        ],
      },
    ],
  },
  {
    id: "press",
    label: "Press mentions",
    toggleable: true,
    anchor: "press",
    fields: [
      {
        type: "list",
        key: "items",
        label: "Outlets",
        itemLabel: "Outlet",
        titleKey: "name",
        max: 8,
        newItem: { name: "Outlet" },
        fields: [{ type: "text", key: "name", label: "Name" }],
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
      { type: "textarea", key: "desc", label: "Description", rows: 2 },
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
  enabled: { collection: true, editorial: true, lookbook: true, press: true, newsletter: true },
  values: {
    brand: { name: "ÉLAN", cta: "Shop Now", ctaUrl: "#collection" },
    theme: { accent: "#c8a97e", bg: "#0a0a0a", surface: "#151515", text: "#777" },
    hero: {
      season: "Autumn / Winter 2025",
      title: "The art of *understated* elegance",
      subtitle: "Where timeless craftsmanship meets modern sensibility. Each piece tells a story of heritage and innovation.",
      btn: "Explore Collection",
      btn2: "Our Story",
    },
    collection: {
      eyebrow: "The Collection",
      title: "Autumn / Winter 2025",
      items: [
        { name: "The Overcoat", desc: "Double-breasted wool-cashmere blend. Cut long for dramatic silhouette.", image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=600&h=800&fit=crop" },
        { name: "The Silk Blouse", desc: "Fluid mulberry silk with hand-finished French seams. Effortlessly refined.", image: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=600&h=800&fit=crop" },
        { name: "The Tailored Trouser", desc: "High-waisted Italian wool. A sculptural line that moves with you.", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop" },
        { name: "The Evening Dress", desc: "Floor-length draped jersey in midnight. Designed for presence.", image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&h=800&fit=crop" },
      ] as unknown as string,
    },
    editorial: {
      eyebrow: "The Vision",
      quote: "Fashion is not about clothes — it's about a feeling. We design for the woman who doesn't follow trends, she sets them. Every stitch is a conversation between tradition and tomorrow.",
      attribution: "— Isabelle Moreau, Creative Director",
    },
    lookbook: {
      eyebrow: "Lookbook",
      title: "Behind the lens",
      items: [
        { title: "Editorial I", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop" },
        { title: "Editorial II", image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=800&fit=crop" },
        { title: "Editorial III", image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=800&fit=crop" },
        { title: "Editorial IV", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop" },
      ] as unknown as string,
    },
    press: {
      items: [
        { name: "VOGUE" }, { name: "ELLE" }, { name: "Harper's BAZAAR" },
        { name: "W Magazine" }, { name: "Dazed" }, { name: "i-D" },
      ] as unknown as string,
    },
    newsletter: {
      title: "Join the Maison",
      desc: "Be first to know about new collections, exclusive events, and private previews.",
      placeholder: "Your email address",
      btn: "Subscribe →",
    },
    footer: { copy: "© 2025 ÉLAN Maison. All rights reserved.", links: "Collections, About, Stores, Careers, Privacy" },
    seo: { title: "ÉLAN — The Art of Understated Elegance", description: "Discover the Autumn/Winter 2025 collection. Where timeless craftsmanship meets modern sensibility." },
  },
};

const presets = {
  section: "theme",
  items: [
    { name: "Couture Gold", swatch: ["#c8a97e", "#0a0a0a", "#151515"], values: { accent: "#c8a97e", bg: "#0a0a0a", surface: "#151515", text: "#777" } },
    { name: "Noir", swatch: ["#ffffff", "#0a0a0a", "#141414"], values: { accent: "#ffffff", bg: "#0a0a0a", surface: "#141414", text: "#666" } },
    { name: "Blush", swatch: ["#e8a0bf", "#0c080a", "#181114"], values: { accent: "#e8a0bf", bg: "#0c080a", surface: "#181114", text: "#8a6878" } },
    { name: "Sage", swatch: ["#7c9a72", "#080a08", "#121412"], values: { accent: "#7c9a72", bg: "#080a08", surface: "#121412", text: "#6a7a66" } },
  ],
};

function render(content: Content, options?: { preview?: { initialScroll: number; instant: boolean } }) {
  const r = reader(content);
  const s = r.str;
  const AC = safeColor(s("theme","accent"),"#c8a97e");
  const BG = safeColor(s("theme","bg"),"#0a0a0a");
  const SF = safeColor(s("theme","surface"),"#151515");
  const TX = safeColor(s("theme","text"),"#777");
  const collection = r.list("collection","items");
  const lookbook = r.list("lookbook","items");
  const press = r.list("press","items");
  const footerLinks = csv(s("footer","links"));

  const titleHtml = esc(s("hero","title")).replace(/\*(.+?)\*/g, `<em>$1</em>`);

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
:root{--ac:${AC};--bg:${BG};--sf:${SF};--tx:${TX}}
html{scroll-behavior:smooth}
body{font-family:'Inter',system-ui,sans-serif;background:var(--bg);color:var(--tx);line-height:1.7;overflow-x:hidden}
a{text-decoration:none;color:inherit}
h1,h2,h3,.serif{font-family:'Playfair Display',serif}

nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:1.5rem 4rem;display:flex;align-items:center;justify-content:space-between;backdrop-filter:blur(20px);background:${BG}cc;border-bottom:1px solid rgba(255,255,255,.04)}
.n-name{font-family:'Playfair Display',serif;font-size:1.4rem;font-weight:700;color:#fff;letter-spacing:.15em;text-transform:uppercase}
nav ul{list-style:none;display:flex;gap:2.5rem}nav ul a{font-size:.8rem;font-weight:400;letter-spacing:.1em;text-transform:uppercase;opacity:.5;transition:.3s}nav ul a:hover{opacity:1;color:var(--ac)}
.n-cta{font-size:.75rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--ac);border:1px solid color-mix(in srgb,var(--ac) 40%,transparent);padding:.6rem 1.8rem;transition:.3s}
.n-cta:hover{background:var(--ac);color:var(--bg)}

.hero{min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:8rem 4rem 4rem;position:relative}
.hero::after{content:'';position:absolute;bottom:0;left:10%;right:10%;height:1px;background:rgba(255,255,255,.06)}
.hero-season{font-size:.7rem;letter-spacing:.25em;text-transform:uppercase;color:var(--ac);margin-bottom:2rem;font-weight:500;animation:fadeIn .8s both}
.hero h1{font-size:clamp(2.5rem,6vw,5rem);font-weight:400;color:#fff;line-height:1.15;letter-spacing:-.01em;max-width:900px;margin-bottom:1.5rem;animation:fadeIn .8s .15s both}
.hero h1 em{font-style:italic;color:var(--ac)}
.hero .sub{font-size:1rem;max-width:500px;line-height:1.9;opacity:.45;margin-bottom:3rem;animation:fadeIn .8s .3s both}
.hero-btns{display:flex;gap:1.5rem;animation:fadeIn .8s .45s both}
.btn-ac{font-size:.75rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;padding:.9rem 2.5rem;background:var(--ac);color:var(--bg);transition:.3s;border:none;cursor:pointer}
.btn-ac:hover{box-shadow:0 10px 40px color-mix(in srgb,var(--ac) 25%,transparent);transform:translateY(-2px)}
.btn-ln{font-size:.75rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;padding:.9rem 2.5rem;border:1px solid rgba(255,255,255,.15);color:#fff;background:0;cursor:pointer;transition:.3s}
.btn-ln:hover{border-color:var(--ac);color:var(--ac)}

.sec{max-width:1200px;margin:0 auto;padding:7rem 4rem}
.sec-tag{display:block;font-size:.65rem;font-weight:600;letter-spacing:.25em;text-transform:uppercase;color:var(--ac);margin-bottom:1.5rem}
.sec-h2{font-size:clamp(1.8rem,3.5vw,3rem);font-weight:400;color:#fff;line-height:1.2;letter-spacing:-.01em}

.coll-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:2rem;margin-top:3rem}
.coll-item{position:relative;overflow:hidden;cursor:pointer;group:coll}
.coll-img{aspect-ratio:3/4;overflow:hidden;background:var(--sf)}
.coll-img img{width:100%;height:100%;object-fit:cover;transition:transform .8s cubic-bezier(.2,.7,.2,1);filter:grayscale(.2)}.coll-item:hover .coll-img img{transform:scale(1.04);filter:grayscale(0)}
.coll-ph{aspect-ratio:3/4;background:var(--sf);display:flex;align-items:center;justify-content:center;font-size:3rem;opacity:.1}
.coll-info{padding:1.5rem 0}
.coll-info h3{font-family:'Playfair Display',serif;font-size:1.3rem;font-weight:500;color:#fff;margin-bottom:.4rem;letter-spacing:.02em}
.coll-info p{font-size:.85rem;opacity:.45;line-height:1.7;max-width:320px}

.edit-sec{padding:8rem 4rem;border-top:1px solid rgba(255,255,255,.04);border-bottom:1px solid rgba(255,255,255,.04);text-align:center;max-width:900px;margin:0 auto}
.edit-quote{font-family:'Playfair Display',serif;font-size:clamp(1.3rem,2.5vw,2rem);font-weight:400;font-style:italic;color:#fff;line-height:1.7;margin:2rem 0}
.edit-attr{font-size:.82rem;color:var(--ac);font-weight:500;letter-spacing:.05em}

.look-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-top:3rem}
.look-item{position:relative;overflow:hidden;aspect-ratio:3/4;background:var(--sf);cursor:pointer}
.look-item img{width:100%;height:100%;object-fit:cover;transition:transform .7s cubic-bezier(.2,.7,.2,1);filter:grayscale(.15)}
.look-item:hover img{transform:scale(1.05);filter:grayscale(0)}
.look-label{position:absolute;bottom:0;left:0;right:0;padding:1.2rem;background:linear-gradient(transparent,rgba(0,0,0,.6));font-size:.75rem;color:#fff;letter-spacing:.1em;text-transform:uppercase;font-weight:500;opacity:0;transition:opacity .4s}
.look-item:hover .look-label{opacity:1}
.look-ph{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:2rem;opacity:.08}

.press-ticker{overflow:hidden;padding:3rem 0;border-top:1px solid rgba(255,255,255,.04);border-bottom:1px solid rgba(255,255,255,.04)}
.press-inner{display:flex;gap:4rem;animation:scroll 25s linear infinite;white-space:nowrap;width:max-content}
.press-inner span{font-family:'Playfair Display',serif;font-size:1.5rem;font-weight:400;font-style:italic;color:#fff;opacity:.15}
.press-inner span::after{content:'·';margin-left:4rem;opacity:.4}
@keyframes scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}

.news-sec{text-align:center;padding:7rem 4rem;max-width:600px;margin:0 auto}
.news-sec h2{font-size:clamp(1.5rem,2.5vw,2.2rem);font-weight:400;color:#fff;margin-bottom:1rem}
.news-sec p{font-size:.9rem;opacity:.4;margin-bottom:2rem;line-height:1.8}
.news-form{display:flex;gap:.5rem;max-width:440px;margin:0 auto}
.news-input{flex:1;background:var(--sf);border:1px solid rgba(255,255,255,.08);padding:.85rem 1.2rem;color:#fff;font-size:.85rem;font-family:inherit;outline:none;transition:.3s}
.news-input:focus{border-color:var(--ac)}.news-input::placeholder{color:rgba(255,255,255,.2)}
.news-btn{background:var(--ac);color:var(--bg);padding:.85rem 1.8rem;font-size:.75rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border:none;cursor:pointer;transition:.3s;white-space:nowrap}
.news-btn:hover{box-shadow:0 8px 25px color-mix(in srgb,var(--ac) 30%,transparent)}

footer{display:flex;justify-content:space-between;align-items:center;padding:2rem 4rem;border-top:1px solid rgba(255,255,255,.04);font-size:.78rem;flex-wrap:wrap;gap:1rem}
.ft-links{display:flex;gap:2rem}.ft-links a{opacity:.4;letter-spacing:.06em;text-transform:uppercase;font-size:.7rem;transition:.3s}.ft-links a:hover{opacity:1;color:var(--ac)}

@keyframes fadeIn{from{opacity:0;transform:translateY(15px)}to{opacity:1;transform:none}}
${revealCss}

@media(max-width:1024px){.coll-grid{grid-template-columns:1fr 1fr}.look-grid{grid-template-columns:1fr 1fr}}
@media(max-width:640px){nav{padding:1rem 1.5rem}nav ul{display:none}.hero{padding:6rem 1.5rem 3rem}.sec{padding:5rem 1.5rem}.edit-sec{padding:5rem 1.5rem}.news-sec{padding:5rem 1.5rem}.coll-grid,.look-grid{grid-template-columns:1fr}.news-form{flex-direction:column}footer{flex-direction:column;text-align:center;padding:2rem 1.5rem}}
</style>
</head>
<body>

<nav>
<a href="#top" class="n-name">${esc(s("brand","name"))}</a>
<ul><a href="#collection">Collection</a><a href="#lookbook">Lookbook</a><a href="#editorial">Story</a></ul>
<a href="${safeUrl(s("brand","ctaUrl"))}" class="n-cta">${esc(s("brand","cta"))}</a>
</nav>

<section class="hero" id="top">
${s("hero","season")?`<div class="hero-season">${esc(s("hero","season"))}</div>`:""}
<h1>${titleHtml}</h1>
<p class="sub">${esc(s("hero","subtitle"))}</p>
<div class="hero-btns">
<a href="${safeUrl(s("brand","ctaUrl"))}" class="btn-ac">${esc(s("hero","btn"))}</a>
${s("hero","btn2")?`<a href="#editorial" class="btn-ln">${esc(s("hero","btn2"))}</a>`:""}
</div>
</section>

${r.on("collection")&&collection.length?`
<div class="sec" id="collection">
<span class="sec-tag rv">${esc(s("collection","eyebrow"))}</span>
<h2 class="sec-h2 rv">${esc(s("collection","title"))}</h2>
<div class="coll-grid">${collection.map((c,i)=>`<div class="coll-item rv${i?` d${Math.min(i,3)}`:""}" >
<div class="coll-img">${safeUrl(c.image)!=="#"?`<img src="${safeUrl(c.image)}" alt="${esc(c.name)}" loading="lazy">`:`<div class="coll-ph">✦</div>`}</div>
<div class="coll-info"><h3>${esc(c.name)}</h3><p>${esc(c.desc)}</p></div>
</div>`).join("")}</div>
</div>`:""}

${r.on("editorial")?`
<div class="edit-sec" id="editorial">
<span class="sec-tag rv">${esc(s("editorial","eyebrow"))}</span>
<blockquote class="edit-quote rv">"${esc(s("editorial","quote"))}"</blockquote>
<div class="edit-attr rv">${esc(s("editorial","attribution"))}</div>
</div>`:""}

${r.on("lookbook")&&lookbook.length?`
<div class="sec" id="lookbook">
<span class="sec-tag rv">${esc(s("lookbook","eyebrow"))}</span>
<h2 class="sec-h2 rv">${esc(s("lookbook","title"))}</h2>
<div class="look-grid">${lookbook.map((l,i)=>`<div class="look-item rv${i?` d${Math.min(i,3)}`:""}" >
${safeUrl(l.image)!=="#"?`<img src="${safeUrl(l.image)}" alt="${esc(l.title)}" loading="lazy">`:`<div class="look-ph">✦</div>`}
<div class="look-label">${esc(l.title)}</div>
</div>`).join("")}</div>
</div>`:""}

${r.on("press")&&press.length?`
<div class="press-ticker" id="press">
<div class="press-inner">${Array(2).fill(press.map(p=>`<span>${esc(p.name)}</span>`).join("")).join("")}</div>
</div>`:""}

${r.on("newsletter")?`
<div class="news-sec" id="newsletter">
<h2 class="rv">${esc(s("newsletter","title"))}</h2>
<p class="rv">${esc(s("newsletter","desc"))}</p>
<div class="news-form rv">
<input class="news-input" type="email" placeholder="${esc(s("newsletter","placeholder"))}">
<button class="news-btn">${esc(s("newsletter","btn"))}</button>
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

export const motionElanFashion: EditableTemplate = {
  id: "motion-elan-fashion",
  name: "Élan — Fashion House",
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
