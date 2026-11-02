import type { Content, EditableTemplate, Section } from "../editor/types";
import { esc, previewScript, reader, revealCss, revealScript, safeColor, safeUrl } from "../editor/html";

const U = (id: string, size: string) => `https://images.unsplash.com/${id}?${size}&fit=crop&auto=format&q=80`;

function lines(s: string) {
  return s.split("\n").map((l) => l.trim()).filter(Boolean);
}

const schema: Section[] = [
  {
    id: "brand",
    label: "Brand",
    description: "Studio name and top-level identity.",
    fields: [
      { type: "text", key: "name", label: "Studio name" },
      { type: "text", key: "highlight", label: "Highlight word", hint: "Shown with the accent background in the logo." },
      { type: "text", key: "tagline", label: "Tagline", placeholder: "Independent creative studio · Lisbon / Berlin" },
      { type: "text", key: "est", label: "Established", placeholder: "Est. 2016" },
    ],
  },
  {
    id: "theme",
    label: "Colors & fonts",
    fields: [
      { type: "color", key: "bg", label: "Background" },
      { type: "color", key: "fg", label: "Text" },
      { type: "color", key: "accent", label: "Accent" },
      {
        type: "select",
        key: "fonts",
        label: "Font style",
        options: [
          { value: "brutalist", label: "Brutalist — Archivo Black + Space Mono" },
          { value: "grotesk", label: "Grotesk — Bebas Neue + DM Mono" },
          { value: "editorial", label: "Editorial — Anton + IBM Plex Mono" },
        ],
      },
    ],
  },
  {
    id: "hero",
    label: "Hero",
    anchor: "top",
    fields: [
      { type: "textarea", key: "headline", label: "Headline", rows: 3, hint: "Wrap one word in *stars* to highlight it with the accent color." },
      { type: "image", key: "image", label: "Background image" },
      {
        type: "list",
        key: "columns",
        label: "Info columns",
        itemLabel: "Column",
        titleKey: "title",
        min: 1,
        max: 4,
        newItem: { title: "Heading", text: "Description text here." },
        fields: [
          { type: "text", key: "title", label: "Heading" },
          { type: "textarea", key: "text", label: "Text", rows: 2 },
        ],
      },
    ],
  },
  {
    id: "marquee",
    label: "Scrolling marquee",
    toggleable: true,
    fields: [
      { type: "textarea", key: "items", label: "Items", rows: 3, hint: "One per line. These scroll across the screen." },
    ],
  },
  {
    id: "work",
    label: "Work / Projects",
    toggleable: true,
    anchor: "work",
    fields: [
      { type: "text", key: "title", label: "Section heading" },
      {
        type: "list",
        key: "projects",
        label: "Projects",
        itemLabel: "Project",
        titleKey: "name",
        max: 12,
        newItem: { name: "Project Name", category: "Brand · Digital", url: "" },
        fields: [
          { type: "text", key: "name", label: "Name" },
          { type: "text", key: "category", label: "Category / tags" },
          { type: "url", key: "url", label: "Link (optional)" },
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
      { type: "text", key: "eyebrow", label: "Small text" },
      { type: "textarea", key: "headline", label: "Headline", rows: 2 },
      { type: "email", key: "email", label: "Contact email" },
    ],
  },
  {
    id: "footer",
    label: "Footer",
    fields: [
      { type: "text", key: "copyright", label: "Copyright" },
      { type: "text", key: "social", label: "Social links text", hint: "Displayed as text (e.g. 'Instagram / Behance / LinkedIn')." },
      { type: "text", key: "location", label: "Location" },
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

const fonts: Record<string, { heading: string; body: string; href: string }> = {
  brutalist: {
    heading: "'Archivo Black',sans-serif",
    body: "'Space Mono',monospace",
    href: "family=Archivo+Black&family=Space+Mono:wght@400;700",
  },
  grotesk: {
    heading: "'Bebas Neue',sans-serif",
    body: "'DM Mono',monospace",
    href: "family=Bebas+Neue&family=DM+Mono:wght@400;500",
  },
  editorial: {
    heading: "'Anton',sans-serif",
    body: "'IBM Plex Mono',monospace",
    href: "family=Anton&family=IBM+Plex+Mono:wght@400;600",
  },
};

const defaults: Content = {
  enabled: { marquee: true, work: true, cta: true },
  values: {
    brand: { name: "STUDIO", highlight: "VANDAL", tagline: "Independent creative studio · Lisbon / Berlin", est: "Est. 2016" },
    theme: { bg: "#f1f1ec", fg: "#0a0a0a", accent: "#c8ff3d", fonts: "brutalist" },
    hero: {
      headline: "We make\n*noise*\nthat sells.",
      image: U("photo-1542744094-3a31f272c490", "w=1600&h=900"),
      columns: [
        { title: "What we do", text: "Brand systems, campaigns, digital products and film for ambitious teams." },
        { title: "How we work", text: "Small senior team, no layers, direct access to the people doing the work." },
        { title: "Who we do it for", text: "Challengers, culture brands and companies that refuse to blend in." },
      ],
    },
    marquee: { items: "BRAND IDENTITY\nART DIRECTION\nWEB & DIGITAL\nCAMPAIGN FILM" },
    work: {
      title: "Selected Work",
      projects: [
        { name: "Nocturne Athletics", category: "Brand · Digital", url: "" },
        { name: "Halo Coffee Co.", category: "Packaging · Film", url: "" },
        { name: "Atlas Sound", category: "Campaign · Web", url: "" },
        { name: "Room 29 Hotel", category: "Identity · Spatial", url: "" },
      ],
    },
    cta: { eyebrow: "Got something loud in mind?", headline: "Let's cause\ntrouble.", email: "hello@studiovandal.co" },
    footer: { copyright: "© 2026 Studio Vandal", social: "Instagram / Behance / LinkedIn", location: "Lisbon · Berlin" },
    seo: {
      title: "Studio Vandal — Creative Agency",
      description: "Independent creative studio specialising in brand systems, campaigns, digital products and film.",
    },
  },
};

const presets = {
  section: "theme",
  items: [
    { name: "Acid", swatch: ["#f1f1ec", "#c8ff3d"], values: { bg: "#f1f1ec", fg: "#0a0a0a", accent: "#c8ff3d" } },
    { name: "Ink", swatch: ["#0a0a0a", "#f1f1ec"], values: { bg: "#0a0a0a", fg: "#f1f1ec", accent: "#f1f1ec" } },
    { name: "Signal Red", swatch: ["#f1f1ec", "#ff3333"], values: { bg: "#f1f1ec", fg: "#0a0a0a", accent: "#ff3333" } },
    { name: "Electric Blue", swatch: ["#f1f1ec", "#3d5aff"], values: { bg: "#f1f1ec", fg: "#0a0a0a", accent: "#3d5aff" } },
    { name: "Night Acid", swatch: ["#0a0a0a", "#c8ff3d"], values: { bg: "#0a0a0a", fg: "#f1f1ec", accent: "#c8ff3d" } },
    { name: "Blush", swatch: ["#f5ede8", "#e84d3d"], values: { bg: "#f5ede8", fg: "#1a1210", accent: "#e84d3d" } },
  ],
};

function emphHeadline(s: string, _cls: string) {
  return esc(s)
    .replace(/\*(.+?)\*/g, `<em>$1</em>`)
    .replace(/\n/g, "<br>");
}

function render(c: Content, options: Parameters<EditableTemplate["render"]>[1] = {}) {
  const r = reader(c);
  const s = r.str;
  const d = defaults.values;
  const col = (key: string) => safeColor(s("theme", key), d.theme[key] as string);
  const bg = col("bg");
  const fg = col("fg");
  const accent = col("accent");
  const font = fonts[s("theme", "fonts")] ?? fonts.brutalist;
  const name = s("brand", "name") || "STUDIO";
  const highlight = s("brand", "highlight");
  const heroImage = safeUrl(s("hero", "image"), d.hero.image as string);
  const columns = r.list("hero", "columns");
  const marqueeItems = lines(s("marquee", "items"));
  const projects = r.list("work", "projects");
  const ctaHeadline = esc(s("cta", "headline")).replace(/\n/g, "<br>");
  const email = s("cta", "email").trim();

  const navLinks = [
    r.on("work") ? '<li><a href="#work">Work</a></li>' : "",
    '<li><a href="#">Studio</a></li>',
    r.on("cta") ? '<li><a href="#contact">Contact</a></li>' : "",
  ].filter(Boolean).join("");

  const marqueeContent = marqueeItems.map((item) => `<span>${esc(item)}</span><i>✺</i>`).join("");

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
:root{--bg:${bg};--fg:${fg};--accent:${accent};--fh:${font.heading};--fb:${font.body}}
*{margin:0;padding:0;box-sizing:border-box}body{font-family:var(--fb);background:var(--bg);color:var(--fg);overflow-x:hidden}a{text-decoration:none;color:inherit}::selection{background:var(--accent);color:var(--fg)}
:focus-visible{outline:2px solid var(--accent);outline-offset:3px}
${revealCss}
.wrap{max-width:1440px;margin:0 auto;border-left:1px solid var(--fg);border-right:1px solid var(--fg)}
header{display:flex;align-items:center;justify-content:space-between;padding:1.2rem 2rem;border-bottom:1px solid var(--fg);position:sticky;top:0;background:var(--bg);z-index:20}
.logo{font-family:var(--fh);font-size:1.25rem;letter-spacing:-.03em}.logo span{background:var(--accent);padding:0 .2em}
nav ul{list-style:none;display:flex;gap:1.8rem;font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em}
.menu-btn{display:none;background:none;border:1px solid var(--fg);padding:.5rem .8rem;font-family:inherit;font-size:.7rem;font-weight:700;text-transform:uppercase;cursor:pointer;color:var(--fg)}
.hero{position:relative;min-height:90vh;display:flex;flex-direction:column;justify-content:center;padding:3rem 2rem 2rem;border-bottom:1px solid var(--fg);overflow:hidden}
.hero-bg{position:absolute;inset:0;z-index:0}.hero-bg img{width:100%;height:100%;object-fit:cover;filter:grayscale(1) contrast(1.1)}
.hero-bg::after{content:'';position:absolute;inset:0;background:linear-gradient(135deg,var(--bg) 30%,color-mix(in srgb,var(--bg) 87%,transparent) 50%,color-mix(in srgb,var(--bg) 53%,transparent) 100%)}
.hero>*{position:relative;z-index:1}
.hero .top{display:flex;justify-content:space-between;font-size:.68rem;text-transform:uppercase;letter-spacing:.12em;margin-bottom:2.5rem}
.hero h1{font-family:var(--fh);font-size:clamp(3.2rem,10vw,9.5rem);line-height:.84;letter-spacing:-.05em;text-transform:uppercase}
.hero h1 em{font-style:normal;display:inline-block;background:var(--accent);padding:0 .08em;transform:rotate(-1.5deg)}
.hero .sub{display:grid;grid-template-columns:repeat(var(--cols,3),1fr);gap:1.5rem;margin-top:2.5rem;padding-top:1.5rem;border-top:1px solid var(--fg);font-size:.75rem;line-height:1.7}
.hero .sub b{display:block;text-transform:uppercase;letter-spacing:.12em;font-size:.62rem;margin-bottom:.5rem}
.hero .arrow{position:absolute;right:2rem;bottom:2rem;font-size:2rem;width:64px;height:64px;border:1px solid var(--fg);border-radius:50%;display:flex;align-items:center;justify-content:center;background:var(--bg);transition:.25s}
.hero .arrow:hover{background:var(--accent);transform:rotate(45deg)}
.marquee{border-bottom:1px solid var(--fg);overflow:hidden;background:var(--fg);color:var(--accent);padding:.7rem 0;white-space:nowrap}
.marquee div{display:inline-block;animation:slide 22s linear infinite;font-family:var(--fh);font-size:1rem;letter-spacing:.06em;text-transform:uppercase}
.marquee span{padding:0 1.2rem}.marquee i{font-style:normal;color:var(--bg)}
@keyframes slide{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.work{padding:0 2rem}
.work-head{display:flex;justify-content:space-between;align-items:end;padding:2.5rem 0 1.5rem;font-size:.7rem;text-transform:uppercase;letter-spacing:.12em}
.work-head h2{font-family:var(--fh);font-size:1.6rem;letter-spacing:-.02em}
.row{display:grid;grid-template-columns:60px 1fr 180px 70px;align-items:center;gap:1rem;padding:1.5rem 0;border-top:1px solid var(--fg);position:relative;transition:.25s}
.row:last-child{border-bottom:1px solid var(--fg)}.row:hover{background:var(--accent);padding-left:1rem;padding-right:1rem}
.row .no{font-size:.7rem}.row h3{font-family:var(--fh);font-size:clamp(1.25rem,3vw,2.2rem);letter-spacing:-.03em;text-transform:uppercase}
.row .cat{font-size:.68rem;text-transform:uppercase;letter-spacing:.1em}.row .go{font-size:1.2rem;text-align:right}
.cta{padding:5rem 2rem;text-align:center;border-bottom:1px solid var(--fg)}
.cta p{font-size:.7rem;text-transform:uppercase;letter-spacing:.16em;margin-bottom:1.2rem}
.cta h2{font-family:var(--fh);font-size:clamp(2.2rem,6vw,5rem);letter-spacing:-.04em;text-transform:uppercase;line-height:.95}
.cta a{display:inline-block;margin-top:2rem;background:var(--fg);color:var(--bg);padding:1rem 2.4rem;font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.12em;transition:.25s}
.cta a:hover{background:var(--accent);color:var(--fg)}
footer{display:flex;justify-content:space-between;gap:1rem;padding:1.5rem 2rem;font-size:.65rem;text-transform:uppercase;letter-spacing:.1em;flex-wrap:wrap}
@media(max-width:800px){nav ul{display:none}.menu-btn{display:block}.hero .sub{grid-template-columns:1fr}.row{grid-template-columns:40px 1fr 60px}.row .cat{display:none}.hero .arrow{display:none}}
</style>
</head>
<body>
<div class="wrap">
<header>
<a href="#top" class="logo">${esc(name)} ${highlight ? `<span>${esc(highlight)}</span>` : ""}</a>
<nav><ul>${navLinks}</ul></nav>
<button class="menu-btn" type="button" onclick="var u=this.parentNode.querySelector('nav ul');u.style.display=u.style.display==='flex'?'none':'flex'">Menu</button>
</header>

<section class="hero rv" id="top">
${heroImage !== "#" ? `<div class="hero-bg"><img src="${heroImage}" alt="${esc(s("seo", "title") || name)}" fetchpriority="high"></div>` : ""}
<div class="top"><span>${esc(s("brand", "tagline"))}</span><span>${esc(s("brand", "est"))}</span></div>
<h1>${emphHeadline(s("hero", "headline"), "")}</h1>
${columns.length ? `<div class="sub rv d1" style="--cols:${columns.length}">${columns.map((col) => `<div><b>${esc(col.title)}</b>${esc(col.text)}</div>`).join("")}</div>` : ""}
${r.on("work") ? '<a href="#work" class="arrow" aria-label="See work">↘</a>' : ""}
</section>

${r.on("marquee") && marqueeItems.length ? `<div class="marquee"><div>${marqueeContent}${marqueeContent}</div></div>` : ""}

${r.on("work") && projects.length ? `<section class="work" id="work">
<div class="work-head rv"><h2>${esc(s("work", "title"))}</h2><span>(${String(projects.length).padStart(2, "0")} projects)</span></div>
${projects.map((p, i) => {
  const tag = p.url ? "a" : "div";
  const href = p.url ? ` href="${safeUrl(p.url)}" target="_blank" rel="noopener"` : "";
  return `<${tag}${href} class="row rv${i % 2 ? " d1" : ""}"><div class="no">${String(i + 1).padStart(2, "0")}</div><h3>${esc(p.name)}</h3><div class="cat">${esc(p.category)}</div><div class="go">↗</div></${tag}>`;
}).join("\n")}
</section>` : ""}

${r.on("cta") ? `<section class="cta rv" id="contact">
<p>${esc(s("cta", "eyebrow"))}</p>
<h2>${ctaHeadline}</h2>
${email ? `<a href="mailto:${esc(email)}">${esc(email)}</a>` : ""}
</section>` : ""}

<footer>
<span>${esc(s("footer", "copyright"))}</span>
<span>${esc(s("footer", "social"))}</span>
<span>${esc(s("footer", "location"))}</span>
</footer>
</div>
</body>
</html>`;
}

export const premiumStudioVandal: EditableTemplate = {
  id: "premium-studio-vandal",
  name: "Studio Vandal — Creative Agency",
  schema,
  defaults,
  presets,
  render,
  checks: (c) => {
    const r = reader(c);
    const out: { section: string; message: string }[] = [];
    if (!r.str("seo", "description").trim())
      out.push({ section: "seo", message: "Add a search description so your page looks good on Google." });
    if (r.on("cta") && !r.str("cta", "email").trim())
      out.push({ section: "cta", message: "Add a contact email so people can reach you." });
    return out;
  },
};
