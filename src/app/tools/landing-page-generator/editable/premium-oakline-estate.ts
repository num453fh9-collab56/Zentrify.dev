import type { Content, EditableTemplate, Item, Section } from "../editor/types";
import { esc, previewScript, reader, revealCss, revealScript, safeColor, safeUrl } from "../editor/html";

const U = (id: string, size: string) => `https://images.unsplash.com/${id}?${size}&fit=crop&auto=format&q=80`;

const schema: Section[] = [
  {
    id: "brand",
    label: "Brand",
    description: "Estate name and navigation.",
    fields: [
      { type: "text", key: "name", label: "Brand name" },
      { type: "text", key: "highlight", label: "Highlight part", hint: "Colored part of the logo." },
      { type: "text", key: "tagline", label: "Eyebrow tagline", placeholder: "Architectural estates · Since 2009" },
      { type: "text", key: "cta", label: "Nav button text" },
    ],
  },
  {
    id: "theme",
    label: "Colors & fonts",
    fields: [
      { type: "color", key: "accent", label: "Accent (gold)" },
      { type: "color", key: "bg", label: "Background" },
      { type: "color", key: "text", label: "Text" },
      {
        type: "select",
        key: "fonts",
        label: "Font style",
        options: [
          { value: "instrument", label: "Instrument Serif + Inter" },
          { value: "playfair", label: "Playfair Display + Inter" },
          { value: "cormorant", label: "Cormorant Garamond + Jost" },
        ],
      },
    ],
  },
  {
    id: "hero",
    label: "Hero",
    anchor: "top",
    fields: [
      { type: "textarea", key: "title", label: "Headline", rows: 2, hint: "Wrap words in *stars* to highlight them in accent color." },
      { type: "textarea", key: "text", label: "Description", rows: 3 },
      { type: "text", key: "btnPrimary", label: "Primary button" },
      { type: "text", key: "btnSecondary", label: "Secondary link" },
      { type: "image", key: "image", label: "Hero image" },
      { type: "text", key: "badgeLabel", label: "Badge label", placeholder: "Featured · Hillside" },
      { type: "text", key: "badgeTitle", label: "Badge title", placeholder: "Villa Miraval · $6.8M" },
    ],
  },
  {
    id: "stats",
    label: "Hero stats",
    toggleable: true,
    anchor: "top",
    fields: [
      {
        type: "list",
        key: "items",
        label: "Stats",
        itemLabel: "Stat",
        titleKey: "label",
        min: 1,
        max: 4,
        newItem: { value: "0", label: "Your stat" },
        fields: [
          { type: "text", key: "value", label: "Number" },
          { type: "text", key: "label", label: "Label" },
        ],
      },
    ],
  },
  {
    id: "properties",
    label: "Properties",
    toggleable: true,
    anchor: "properties",
    fields: [
      { type: "text", key: "title", label: "Heading" },
      { type: "text", key: "link", label: "View-all link text" },
      {
        type: "list",
        key: "items",
        label: "Properties",
        itemLabel: "Property",
        titleKey: "name",
        max: 6,
        newItem: { location: "City, Country", name: "Property name", spec: "3 bed · 3 bath", price: "$0", image: "" },
        fields: [
          { type: "text", key: "location", label: "Location" },
          { type: "text", key: "name", label: "Name" },
          { type: "text", key: "spec", label: "Specs" },
          { type: "text", key: "price", label: "Price" },
          { type: "image", key: "image", label: "Photo" },
        ],
      },
    ],
  },
  {
    id: "cta",
    label: "Call to action",
    toggleable: true,
    anchor: "contact",
    fields: [
      { type: "text", key: "title", label: "Heading" },
      { type: "text", key: "text", label: "Description" },
      { type: "text", key: "button", label: "Button text" },
    ],
  },
  {
    id: "footer",
    label: "Footer",
    fields: [
      { type: "text", key: "copyright", label: "Copyright" },
      { type: "text", key: "locations", label: "Locations" },
      { type: "email", key: "email", label: "Email" },
    ],
  },
  {
    id: "seo",
    label: "Page settings (SEO)",
    description: "How the page appears in Google and in the browser tab.",
    fields: [
      { type: "text", key: "title", label: "Page title" },
      { type: "textarea", key: "description", label: "Search description", rows: 3, hint: "About 150 characters works best." },
    ],
  },
];

const defaultProps: Item[] = [
  { location: "Lake Como, Italy", name: "Casa Lumen", spec: "4 bed · 5 bath · Lakefront", price: "$6,800,000", image: U("photo-1600585154340-be6161a56a0c", "w=700&h=600") },
  { location: "Aspen, Colorado", name: "Ridge House", spec: "5 bed · 6 bath · Mountain", price: "$9,200,000", image: U("photo-1600607687939-ce8a6c25118c", "w=700&h=600") },
  { location: "Lisbon, Portugal", name: "Pátio 22", spec: "3 bed · 3 bath · Courtyard", price: "$2,450,000", image: U("photo-1600566753086-00f18fb6b3ea", "w=700&h=600") },
];

const defaults: Content = {
  enabled: { stats: true, properties: true, cta: true },
  values: {
    brand: { name: "Oak", highlight: "line", tagline: "Architectural estates · Since 2009", cta: "Private viewing" },
    theme: { accent: "#b08d57", bg: "#171717", text: "#f0ebe2", fonts: "instrument" },
    hero: {
      title: "Homes with a point of *view.*",
      text: "A small, considered collection of architect-designed homes — represented with discretion and shown by appointment only.",
      btnPrimary: "View collection",
      btnSecondary: "Speak to an adviser",
      image: U("photo-1600596542815-ffad4c1539a9", "w=1100&h=1200"),
      badgeLabel: "Featured · Hillside",
      badgeTitle: "Villa Miraval · $6.8M",
    },
    stats: {
      items: [
        { value: "48", label: "Homes placed" },
        { value: "$420M", label: "Total value" },
        { value: "16", label: "Years advising" },
      ],
    },
    properties: { title: "The current collection", link: "All properties →", items: defaultProps },
    cta: { title: "Private viewings, quietly arranged.", text: "Tell us what you're looking for. We'll send a shortlist, not a brochure.", button: "Request a viewing" },
    footer: { copyright: "© 2026 Oakline Estates", locations: "Lisbon · Aspen · Milan", email: "hello@oakline.estate" },
    seo: { title: "Oakline Estates — Architectural Homes", description: "A curated collection of architect-designed homes, represented with discretion." },
  },
};

const presets = {
  section: "theme",
  items: [
    { name: "Bronze", swatch: ["#171717", "#b08d57"], values: { accent: "#b08d57", bg: "#171717", text: "#f0ebe2" } },
    { name: "Silver", swatch: ["#181b1f", "#a0a8b0"], values: { accent: "#a0a8b0", bg: "#181b1f", text: "#e8eaed" } },
    { name: "Sage", swatch: ["#171d17", "#7a9a6e"], values: { accent: "#7a9a6e", bg: "#171d17", text: "#e4ebe2" } },
    { name: "Ivory", swatch: ["#f4f0ea", "#8a6d3b"], values: { accent: "#8a6d3b", bg: "#f4f0ea", text: "#2a2520" } },
    { name: "Charcoal", swatch: ["#1a1a1a", "#d4a853"], values: { accent: "#d4a853", bg: "#1a1a1a", text: "#e8e2d6" } },
  ],
};

const fontMap: Record<string, { heading: string; body: string; href: string }> = {
  instrument: { heading: "'Instrument Serif',serif", body: "'Inter',sans-serif", href: "family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600" },
  playfair: { heading: "'Playfair Display',serif", body: "'Inter',sans-serif", href: "family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;500;600" },
  cormorant: { heading: "'Cormorant Garamond',serif", body: "'Jost',sans-serif", href: "family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Jost:wght@300;400;500" },
};

function emph(s: string) {
  return esc(s).replace(/\*(.+?)\*/g, "<em>$1</em>");
}

function render(c: Content, options: Parameters<EditableTemplate["render"]>[1] = {}) {
  const r = reader(c);
  const s = r.str;
  const d = defaults.values;
  const col = (key: string) => safeColor(s("theme", key), d.theme[key] as string);
  const accent = col("accent");
  const bg = col("bg");
  const text = col("text");
  const font = fontMap[s("theme", "fonts")] ?? fontMap.instrument;
  const name = s("brand", "name") || "Oak";
  const highlight = s("brand", "highlight");
  const img = (src: string, fallback = "") => safeUrl(src, fallback);

  const statsItems = r.list("stats", "items").slice(0, 4);
  const properties = r.list("properties", "items");

  const navLinks = [
    r.on("properties") ? `<li><a href="#properties">Properties</a></li>` : "",
  ].filter(Boolean).join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${esc(s("seo", "title") || name)}</title>
<meta name="description" content="${esc(s("seo", "description"))}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?${font.href}&display=swap" rel="stylesheet">
${previewScript(options?.preview)}
${revealScript}
<style>
:root{--acc:${accent};--bg:${bg};--text:${text};--fh:${font.heading};--fb:${font.body}}
*{margin:0;padding:0;box-sizing:border-box}body{font-family:var(--fb);background:var(--bg);color:var(--text);overflow-x:hidden}a{text-decoration:none;color:inherit}
:focus-visible{outline:2px solid var(--acc);outline-offset:3px}
${revealCss}
nav{position:absolute;top:0;left:0;right:0;z-index:5;display:flex;align-items:center;justify-content:space-between;padding:1.6rem 5%;max-width:1450px;margin:0 auto}
.logo{font-family:var(--fh);font-size:1.55rem;letter-spacing:.02em}.logo span{color:var(--acc)}
nav ul{list-style:none;display:flex;gap:2.2rem;font-size:.76rem;letter-spacing:.1em;text-transform:uppercase;color:color-mix(in srgb,var(--text) 70%,transparent)}nav ul a:hover{color:var(--text)}
.nav-btn{border:1px solid color-mix(in srgb,var(--text) 40%,transparent);padding:.65rem 1.4rem;font-size:.68rem;letter-spacing:.14em;text-transform:uppercase;transition:.25s}.nav-btn:hover{background:var(--acc);border-color:var(--acc);color:var(--bg)}
.hero{display:grid;grid-template-columns:1.02fr .98fr;min-height:100vh;min-height:100svh}
.copy{display:flex;flex-direction:column;justify-content:center;padding:8rem 5% 5rem 6%;position:relative;z-index:2}
.eyebrow{font-size:.66rem;font-weight:500;letter-spacing:.28em;text-transform:uppercase;color:var(--acc);margin-bottom:1.5rem}
h1{font-family:var(--fh);font-size:5rem;font-weight:400;line-height:.98;letter-spacing:-.01em;margin-bottom:1.5rem}h1 em{font-style:italic;color:var(--acc)}
.copy p{color:color-mix(in srgb,var(--text) 60%,transparent);line-height:1.85;max-width:430px;font-size:.94rem;margin-bottom:2.2rem}
.actions{display:flex;gap:1.2rem;flex-wrap:wrap;align-items:center}
.btn{background:var(--acc);color:var(--bg);padding:1rem 2rem;font-size:.7rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;transition:.25s;border:none;cursor:pointer}
.btn:hover{filter:brightness(1.15)}
.link{font-size:.7rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;border-bottom:1px solid color-mix(in srgb,var(--text) 45%,transparent);padding-bottom:4px}
.stats-row{display:flex;gap:2.5rem;margin-top:3.5rem;padding-top:1.5rem;border-top:1px solid color-mix(in srgb,var(--text) 14%,transparent)}
.stats-row b{display:block;font-family:var(--fh);font-size:1.9rem;font-weight:400}
.stats-row span{font-size:.64rem;letter-spacing:.14em;text-transform:uppercase;color:color-mix(in srgb,var(--text) 40%,transparent)}
.visual{position:relative;overflow:hidden}.visual img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.visual::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,var(--bg),transparent 25%)}
.badge{position:absolute;z-index:2;right:2rem;bottom:2rem;background:color-mix(in srgb,var(--bg) 70%,transparent);backdrop-filter:blur(12px);border:1px solid color-mix(in srgb,var(--text) 18%,transparent);padding:1.1rem 1.4rem;min-width:200px}
.badge span{font-size:.6rem;letter-spacing:.18em;text-transform:uppercase;color:var(--acc)}.badge b{display:block;font-family:var(--fh);font-size:1.25rem;margin-top:.35rem}
.section{max-width:1300px;margin:0 auto;padding:5.5rem 5%}.head{display:flex;justify-content:space-between;align-items:end;gap:2rem;margin-bottom:2.5rem;flex-wrap:wrap}
.head h2{font-family:var(--fh);font-size:2.8rem;font-weight:400;line-height:1.1}
.head a{font-size:.68rem;letter-spacing:.14em;text-transform:uppercase;border-bottom:1px solid color-mix(in srgb,var(--text) 40%,transparent);padding-bottom:4px}
.props{display:grid;grid-template-columns:repeat(3,1fr);gap:1.2rem}
.prop{position:relative;overflow:hidden;background:color-mix(in srgb,var(--bg) 85%,var(--text));border:1px solid color-mix(in srgb,var(--text) 10%,transparent);transition:.3s}
.prop:hover{transform:translateY(-5px);border-color:color-mix(in srgb,var(--acc) 50%,transparent)}
.prop img{width:100%;height:280px;object-fit:cover;filter:saturate(.85);transition:.5s}.prop:hover img{transform:scale(1.04)}
.prop .body{padding:1.5rem}
.prop .loc{font-size:.62rem;letter-spacing:.18em;text-transform:uppercase;color:var(--acc);margin-bottom:.55rem}
.prop h3{font-family:var(--fh);font-size:1.45rem;font-weight:400;margin-bottom:.3rem}
.prop .spec{font-size:.72rem;color:color-mix(in srgb,var(--text) 45%,transparent);margin-bottom:1rem}
.prop .row{display:flex;justify-content:space-between;align-items:center;padding-top:.9rem;border-top:1px solid color-mix(in srgb,var(--text) 10%,transparent);font-size:.8rem}
.prop .row b{color:color-mix(in srgb,var(--acc) 80%,#fff);font-weight:500}
.prop .row span{font-size:.64rem;letter-spacing:.12em;text-transform:uppercase;color:color-mix(in srgb,var(--text) 50%,transparent)}
.cta-bar{display:flex;align-items:center;justify-content:space-between;gap:2rem;flex-wrap:wrap;max-width:1200px;margin:0 auto 5rem;padding:3rem 5%;border-top:1px solid color-mix(in srgb,var(--text) 14%,transparent);border-bottom:1px solid color-mix(in srgb,var(--text) 14%,transparent)}
.cta-bar h2{font-family:var(--fh);font-size:2.2rem;font-weight:400}.cta-bar p{color:color-mix(in srgb,var(--text) 45%,transparent);font-size:.84rem;margin-top:.4rem}
footer{display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap;padding:2rem 5%;font-size:.66rem;color:color-mix(in srgb,var(--text) 35%,transparent);letter-spacing:.06em}
@media(max-width:1000px){.hero{grid-template-columns:1fr}.visual{min-height:440px;order:-1}.visual::after{background:linear-gradient(0deg,var(--bg),transparent 25%)}.copy{padding-top:3.5rem}h1{font-size:4rem}.props{grid-template-columns:1fr 1fr}}
@media(max-width:700px){nav ul{display:none}h1{font-size:3rem}.props{grid-template-columns:1fr}.stats-row{gap:1.6rem}.cta-bar h2{font-size:1.6rem}.badge{right:1rem;bottom:1rem}}
</style>
</head>
<body>
<nav id="nav"><a href="#top" class="logo">${esc(name)}${highlight ? `<span>${esc(highlight)}</span>` : ""}</a><ul>${navLinks}<li><a href="#contact">Contact</a></li></ul><a href="#contact" class="nav-btn">${esc(s("brand", "cta") || "Private viewing")}</a></nav>

<section class="hero" id="top">
<div class="copy">
<div class="eyebrow rv">${esc(s("brand", "tagline"))}</div>
<h1 class="rv d1">${emph(s("hero", "title"))}</h1>
<p class="rv d2">${esc(s("hero", "text"))}</p>
<div class="actions rv d3">
${s("hero", "btnPrimary") ? `<a href="#${r.on("properties") ? "properties" : "contact"}" class="btn">${esc(s("hero", "btnPrimary"))}</a>` : ""}
${s("hero", "btnSecondary") ? `<a href="#contact" class="link">${esc(s("hero", "btnSecondary"))}</a>` : ""}
</div>
${r.on("stats") && statsItems.length ? `<div class="stats-row rv">${statsItems.map((st) => `<div><b>${esc(st.value)}</b><span>${esc(st.label)}</span></div>`).join("")}</div>` : ""}
</div>
<div class="visual">
<img src="${img(s("hero", "image"), d.hero.image as string)}" alt="" fetchpriority="high">
${s("hero", "badgeTitle") ? `<div class="badge"><span>${esc(s("hero", "badgeLabel"))}</span><b>${esc(s("hero", "badgeTitle"))}</b></div>` : ""}
</div>
</section>

${r.on("properties") && properties.length ? `<section class="section" id="properties">
<div class="head rv"><h2>${esc(s("properties", "title"))}</h2>${s("properties", "link") ? `<a href="#">${esc(s("properties", "link"))}</a>` : ""}</div>
<div class="props">${properties.map((p, i) => `<div class="prop rv${i ? ` d${i % 3}` : ""}">
${img(p.image) !== "#" ? `<img src="${img(p.image)}" alt="${esc(p.name)}" loading="lazy">` : `<div style="height:280px;background:color-mix(in srgb,var(--acc) 10%,var(--bg))"></div>`}
<div class="body"><div class="loc">${esc(p.location)}</div><h3>${esc(p.name)}</h3><div class="spec">${esc(p.spec)}</div><div class="row"><b>${esc(p.price)}</b><span>View →</span></div></div>
</div>`).join("")}</div>
</section>` : ""}

${r.on("cta") ? `<section class="cta-bar rv" id="contact">
<div><h2>${esc(s("cta", "title"))}</h2><p>${esc(s("cta", "text"))}</p></div>
<a href="#" class="btn">${esc(s("cta", "button"))}</a>
</section>` : ""}

<footer>
<span>${esc(s("footer", "copyright"))}</span>
<span>${esc(s("footer", "locations"))}</span>
<span>${esc(s("footer", "email"))}</span>
</footer>
</body>
</html>`;
}

export const premiumOaklineEstate: EditableTemplate = {
  id: "premium-oakline-estate",
  name: "Oakline — Architectural Estates",
  schema,
  defaults,
  presets,
  render,
  checks: (c) => {
    const r = reader(c);
    const out: { section: string; message: string }[] = [];
    if (!r.str("seo", "description").trim())
      out.push({ section: "seo", message: "Add a search description so your page looks good on Google." });
    if (r.on("properties") && r.list("properties", "items").length === 0)
      out.push({ section: "properties", message: "Add at least one property to your collection." });
    return out;
  },
};
