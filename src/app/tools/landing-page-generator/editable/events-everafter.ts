import type { Content, EditableTemplate, Section } from "../editor/types";
import {
  esc,
  previewScript,
  reader,
  revealCss,
  revealScript,
  safeColor,
  safeUrl,
} from "../editor/html";

const U = (id: string, size: string) =>
  `https://images.unsplash.com/${id}?${size}&fit=crop&auto=format&q=80`;

const schema: Section[] = [
  {
    id: "brand",
    label: "Brand",
    description: "Studio name and navigation.",
    fields: [
      { type: "text", key: "name", label: "Studio name" },
    ],
  },
  {
    id: "theme",
    label: "Colors",
    fields: [
      { type: "color", key: "primary", label: "Primary" },
      { type: "color", key: "secondary", label: "Secondary" },
      { type: "color", key: "accent", label: "Accent" },
      { type: "color", key: "light", label: "Background" },
      { type: "color", key: "heading", label: "Headings" },
      { type: "color", key: "text", label: "Body text" },
    ],
  },
  {
    id: "hero",
    label: "Hero",
    anchor: "top",
    fields: [
      { type: "text", key: "eyebrow", label: "Eyebrow" },
      { type: "textarea", key: "title", label: "Headline", rows: 2, hint: "Use <br> for line break. Wrap word in *stars* for italic." },
      { type: "textarea", key: "text", label: "Description", rows: 3 },
      { type: "text", key: "cta", label: "CTA button text" },
      { type: "image", key: "image", label: "Background image" },
    ],
  },
  {
    id: "intro",
    label: "Introduction",
    anchor: "intro",
    toggleable: true,
    fields: [
      { type: "text", key: "tag", label: "Tag" },
      { type: "textarea", key: "title", label: "Heading", rows: 2 },
      { type: "textarea", key: "text", label: "Body text", rows: 3 },
    ],
  },
  {
    id: "portfolio",
    label: "Portfolio gallery",
    anchor: "portfolio",
    toggleable: true,
    fields: [
      {
        type: "list",
        key: "images",
        label: "Gallery images",
        itemLabel: "Image",
        titleKey: "alt",
        min: 1,
        max: 8,
        fields: [
          { type: "image", key: "src", label: "Image" },
          { type: "text", key: "alt", label: "Alt text" },
        ],
        newItem: { src: "", alt: "Wedding photo" },
      },
    ],
  },
  {
    id: "services",
    label: "Services",
    anchor: "services",
    toggleable: true,
    fields: [
      {
        type: "list",
        key: "items",
        label: "Services",
        itemLabel: "Service",
        titleKey: "title",
        min: 1,
        max: 6,
        fields: [
          { type: "text", key: "icon", label: "Icon character" },
          { type: "text", key: "title", label: "Title" },
          { type: "textarea", key: "desc", label: "Description", rows: 2 },
        ],
        newItem: { icon: "✿", title: "New Service", desc: "" },
      },
    ],
  },
  {
    id: "testimonial",
    label: "Testimonial",
    anchor: "testimonial",
    toggleable: true,
    fields: [
      { type: "textarea", key: "quote", label: "Quote", rows: 3 },
      { type: "text", key: "attribution", label: "Attribution" },
    ],
  },
  {
    id: "cta",
    label: "Contact CTA",
    anchor: "contact",
    fields: [
      { type: "textarea", key: "title", label: "Heading", rows: 2 },
      { type: "textarea", key: "text", label: "Description", rows: 3 },
      { type: "text", key: "buttonText", label: "Button text" },
      { type: "image", key: "image", label: "Side image" },
    ],
  },
  {
    id: "footer",
    label: "Footer",
    fields: [
      { type: "text", key: "text", label: "Footer text" },
    ],
  },
];

const defaults: Content = {
  enabled: { intro: true, portfolio: true, services: true, testimonial: true },
  values: {
    brand: { name: "EverAfter" },
    theme: { primary: "#b08968", secondary: "#a47c5c", accent: "#d4b896", light: "#faf6f1", heading: "#2f2a26", text: "#847b73" },
    hero: {
      eyebrow: "Full-Service Wedding Planning",
      title: "Weddings that feel<br>*like you.*",
      text: "Thoughtful design, calm coordination, and the kind of day you actually get to enjoy.",
      cta: "Start Planning",
      image: U("photo-1519741497674-611481863552", "w=1600&h=1000"),
    },
    intro: {
      tag: "The Studio",
      title: "Beautifully considered, effortlessly held.",
      text: "We plan intimate celebrations and grand gatherings across the coast and countryside. Every detail is intentional — from the first invitation to the last dance.",
    },
    portfolio: {
      images: [
        { src: U("photo-1465495976277-4387d4b0b4c6", "w=700&h=800"), alt: "Wedding details" },
        { src: U("photo-1511285560929-80b456fea0bc", "w=700&h=900"), alt: "Wedding ceremony" },
        { src: U("photo-1520854221256-17451cc331bf", "w=700&h=900"), alt: "Wedding reception" },
        { src: U("photo-1519741497674-611481863552", "w=700&h=800"), alt: "Bride and groom" },
      ],
    },
    services: {
      items: [
        { icon: "✿", title: "Full Planning", desc: "Concept, vendors, design, and day-of coordination — handled end to end." },
        { icon: "◇", title: "Design & Styling", desc: "Florals, tablescapes, lighting, and stationery that tell your story." },
        { icon: "⌘", title: "Day Coordination", desc: "We take the timeline so you can be fully present for every moment." },
      ],
    },
    testimonial: {
      quote: "They made the whole process feel calm and deeply personal. Our day was exactly us — only better.",
      attribution: "— Maya & Jonah, Amalfi Coast",
    },
    cta: {
      title: "Let's plan something beautiful.",
      text: "We take a limited number of weddings each year to give every couple our full attention. Tell us your date and vision.",
      buttonText: "Request Availability",
      image: U("photo-1465495976277-4387d4b0b4c6", "w=900&h=1000"),
    },
    footer: { text: "© 2026 EverAfter Weddings · Planning with heart since 2014" },
  },
};


function heroTitle(raw: string): string {
  const safe = esc(raw).replace(/&lt;br\s*\/?&gt;/gi, "<br>");
  return safe.replace(/\*(.+?)\*/g, "<em>$1</em>");
}

function render(content: Content, options?: { preview?: { initialScroll: number; instant: boolean } }): string {
  const r = reader(content);
  const pri = safeColor(r.str("theme", "primary"), "#b08968");
  const sec = safeColor(r.str("theme", "secondary"), "#a47c5c");
  const acc = safeColor(r.str("theme", "accent"), "#d4b896");
  const light = safeColor(r.str("theme", "light"), "#faf6f1");
  const heading = safeColor(r.str("theme", "heading"), "#2f2a26");
  const text = safeColor(r.str("theme", "text"), "#847b73");

  const galleryImages = r.list("portfolio", "images");
  const serviceItems = r.list("services", "items");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${esc(r.str("brand", "name"))}</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet">
<style>
:root{--pri:${pri};--sec:${sec};--acc:${acc};--light:${light};--hd:${heading};--txt:${text}}
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:var(--light);color:var(--txt);overflow-x:hidden}a{text-decoration:none;color:inherit}
nav{position:absolute;top:0;left:0;right:0;z-index:10;display:flex;align-items:center;justify-content:space-between;padding:1.75rem 5%;max-width:1400px;margin:0 auto}
.logo{font-family:'Cormorant Garamond',serif;font-size:1.75rem;font-weight:600;color:#fff;letter-spacing:1px}
nav ul{list-style:none;display:flex;gap:2.25rem}nav ul a{font-size:.78rem;color:rgba(255,255,255,.85);letter-spacing:2px;text-transform:uppercase;transition:.2s}nav ul a:hover{color:#fff}
.nav-btn{border:1px solid rgba(255,255,255,.7);color:#fff;padding:.65rem 1.5rem;border-radius:2px;font-size:.7rem;letter-spacing:2px;text-transform:uppercase;transition:.25s}.nav-btn:hover{background:#fff;color:var(--hd)}
.hero{position:relative;min-height:95vh;display:flex;align-items:center;justify-content:center;text-align:center;overflow:hidden}
.hero img.hero-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.hero::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(30,20,15,.45),rgba(30,20,15,.2) 50%,rgba(30,20,15,.55))}
.hero-in{position:relative;z-index:2;padding:9rem 5% 7rem;max-width:850px}.eyebrow{color:#fff;font-size:.7rem;letter-spacing:4px;text-transform:uppercase;margin-bottom:1.5rem}
.hero h1{font-family:'Cormorant Garamond',serif;font-size:5rem;font-weight:500;line-height:1.05;color:#fff;margin-bottom:1.5rem}.hero h1 em{font-style:italic}
.hero p{color:rgba(255,255,255,.85);font-size:1rem;line-height:1.8;max-width:480px;margin:0 auto 2.25rem}
.btn{display:inline-block;background:#fff;color:var(--hd);padding:.95rem 2.4rem;font-size:.72rem;letter-spacing:2px;text-transform:uppercase;font-weight:600;transition:.25s}.btn:hover{background:var(--acc);transform:translateY(-2px)}
.intro{max-width:1000px;margin:0 auto;padding:6rem 5%;text-align:center}
.intro .tag{color:var(--sec);font-size:.7rem;letter-spacing:3px;text-transform:uppercase;font-weight:600}
.intro h2{font-family:'Cormorant Garamond',serif;font-size:3rem;font-weight:500;color:var(--hd);line-height:1.2;margin:1rem 0 1.2rem}
.intro p{color:var(--txt);line-height:1.9;max-width:620px;margin:0 auto}.section{padding:0 5% 6rem;max-width:1250px;margin:0 auto}
.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem}.g{position:relative;overflow:hidden}.g img{width:100%;height:320px;object-fit:cover;transition:transform .7s ease}
.g:hover img{transform:scale(1.06)}.g:nth-child(2) img,.g:nth-child(3) img{height:380px}
.services{display:grid;grid-template-columns:repeat(3,1fr);gap:2.5rem;max-width:1100px;margin:0 auto;padding:0 5% 6rem}
.svc{text-align:center;padding:2.5rem 1.5rem;border-top:1px solid #e7e2dc}.svc .ic{font-size:1.7rem;margin-bottom:1rem}
.svc h3{font-family:'Cormorant Garamond',serif;font-size:1.5rem;font-weight:600;margin-bottom:.6rem;color:var(--hd)}.svc p{font-size:.85rem;line-height:1.8;color:var(--txt)}
.quote{background:${acc}35;padding:5rem 5%;text-align:center}
.quote blockquote{font-family:'Cormorant Garamond',serif;font-size:2rem;font-style:italic;line-height:1.5;color:var(--hd);max-width:850px;margin:0 auto 1.5rem}
.quote cite{font-style:normal;font-size:.7rem;letter-spacing:2.5px;text-transform:uppercase;color:#6b625a}
.cta{max-width:1100px;margin:0 auto;padding:6rem 5%;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center}.cta img{width:100%;height:440px;object-fit:cover}
.cta h2{font-family:'Cormorant Garamond',serif;font-size:2.8rem;font-weight:500;line-height:1.2;color:var(--hd);margin-bottom:1rem}
.cta p{color:var(--txt);line-height:1.8;font-size:.9rem;margin-bottom:1.75rem}.cta .btn{background:var(--sec);color:#fff}.cta .btn:hover{background:var(--pri)}
footer{padding:2.5rem 5%;text-align:center;font-size:.72rem;letter-spacing:1.5px;color:#a89f97;border-top:1px solid #e7e2dc}
${revealCss}
@media(max-width:1000px){.hero h1{font-size:3.8rem}.grid{grid-template-columns:1fr 1fr}.cta{grid-template-columns:1fr;gap:2.5rem}.cta img{height:340px}}
@media(max-width:700px){nav ul{display:none}.hero h1{font-size:2.8rem}.services{grid-template-columns:1fr;gap:0}.intro h2{font-size:2.2rem}.quote blockquote{font-size:1.5rem}.cta h2{font-size:2rem}.grid img,.g:nth-child(2) img,.g:nth-child(3) img{height:240px}}
</style>
</head>
<body>
${previewScript(options?.preview)}
<nav><a href="#" class="logo">${esc(r.str("brand", "name"))}</a><ul><li><a href="#portfolio">Portfolio</a></li><li><a href="#services">Services</a></li><li><a href="#contact">Contact</a></li></ul><a href="#contact" class="nav-btn">Inquire</a></nav>
<section class="hero" id="top">
<img class="hero-bg" src="${safeUrl(r.str("hero", "image"))}" alt="${esc(r.str("brand", "name"))}">
<div class="hero-in"><div class="eyebrow">${esc(r.str("hero", "eyebrow"))}</div><h1>${heroTitle(r.str("hero", "title"))}</h1><p>${esc(r.str("hero", "text"))}</p><a href="#contact" class="btn">${esc(r.str("hero", "cta"))}</a></div>
</section>
${r.on("intro") ? `<section class="intro rv" id="intro"><span class="tag">${esc(r.str("intro", "tag"))}</span><h2>${esc(r.str("intro", "title"))}</h2><p>${esc(r.str("intro", "text"))}</p></section>` : ""}
${r.on("portfolio") ? `<section class="section rv" id="portfolio"><div class="grid">
${galleryImages.map((img, i) => `<div class="g rv${i < 3 ? ` d${i + 1}` : ""}"><img src="${safeUrl(img.src || "")}" alt="${esc(img.alt || "")}"></div>`).join("\n")}
</div></section>` : ""}
${r.on("services") ? `<section class="services rv" id="services">
${serviceItems.map((s, i) => `<div class="svc rv${i < 3 ? ` d${i + 1}` : ""}"><div class="ic">${esc(s.icon || "")}</div><h3>${esc(s.title || "")}</h3><p>${esc(s.desc || "")}</p></div>`).join("\n")}
</section>` : ""}
${r.on("testimonial") ? `<section class="quote rv" id="testimonial"><blockquote>"${esc(r.str("testimonial", "quote"))}"</blockquote><cite>${esc(r.str("testimonial", "attribution"))}</cite></section>` : ""}
<section class="cta rv" id="contact"><img src="${safeUrl(r.str("cta", "image"))}" alt="${esc(r.str("brand", "name"))}"><div><h2>${esc(r.str("cta", "title"))}</h2><p>${esc(r.str("cta", "text"))}</p><a href="#" class="btn">${esc(r.str("cta", "buttonText"))}</a></div></section>
<footer>${esc(r.str("footer", "text"))}</footer>
${revealScript}
</body></html>`;
}

export const eventsEverafter: EditableTemplate = {
  id: "events-everafter",
  name: "EverAfter — Wedding Planner",
  schema,
  defaults,
  presets: {
    section: "theme",
    items: [
      { name: "Warm Sand", swatch: ["#b08968", "#d4b896", "#faf6f1"], values: { primary: "#b08968", secondary: "#a47c5c", accent: "#d4b896", light: "#faf6f1", heading: "#2f2a26", text: "#847b73" } },
      { name: "Sage Blush", swatch: ["#7c9473", "#d4a5a5", "#f5f7f4"], values: { primary: "#7c9473", secondary: "#6b8263", accent: "#d4a5a5", light: "#f5f7f4", heading: "#2a3128", text: "#6b7c65" } },
      { name: "Dusty Rose", swatch: ["#c27a7a", "#e8c4c4", "#fdf5f5"], values: { primary: "#c27a7a", secondary: "#b06868", accent: "#e8c4c4", light: "#fdf5f5", heading: "#3a2626", text: "#a07070" } },
      { name: "Lavender", swatch: ["#9b8ec4", "#c4b8e8", "#f7f5fd"], values: { primary: "#9b8ec4", secondary: "#8a7cb3", accent: "#c4b8e8", light: "#f7f5fd", heading: "#2a2636", text: "#8880a0" } },
      { name: "Coastal Blue", swatch: ["#6b9dbd", "#a8cce0", "#f3f8fb"], values: { primary: "#6b9dbd", secondary: "#5a8aaa", accent: "#a8cce0", light: "#f3f8fb", heading: "#1e2d38", text: "#6a8899" } },
      { name: "Classic Ivory", swatch: ["#8b7355", "#c9b99a", "#faf8f4"], values: { primary: "#8b7355", secondary: "#7a6347", accent: "#c9b99a", light: "#faf8f4", heading: "#2e2820", text: "#8a7e6f" } },
    ],
  },
  render,
  checks(content) {
    const warns: { section: string; message: string }[] = [];
    const r = reader(content);
    if (!r.str("brand", "name")) warns.push({ section: "brand", message: "Studio name is empty." });
    if (!r.str("hero", "image")) warns.push({ section: "hero", message: "Hero needs a background image." });
    if (r.on("portfolio") && r.list("portfolio", "images").length === 0) warns.push({ section: "portfolio", message: "No portfolio images added." });
    return warns;
  },
};
