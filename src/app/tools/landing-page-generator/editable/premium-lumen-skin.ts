import type { Content, EditableTemplate, Section } from "../editor/types";
import { esc, previewScript, reader, revealCss, revealScript, safeColor, safeUrl } from "../editor/html";

const U = (id: string, size: string) => `https://images.unsplash.com/${id}?${size}&fit=crop&auto=format&q=80`;

const schema: Section[] = [
  {
    id: "brand",
    label: "Brand",
    fields: [
      { type: "text", key: "name", label: "Brand name" },
      { type: "text", key: "cta", label: "Nav CTA text" },
    ],
  },
  {
    id: "theme",
    label: "Colors",
    fields: [
      { type: "color", key: "bg", label: "Background (blush)" },
      { type: "color", key: "dark", label: "Dark text" },
      { type: "color", key: "accent", label: "Accent (rose)" },
      { type: "color", key: "muted", label: "Muted text" },
      { type: "color", key: "border", label: "Border" },
    ],
  },
  {
    id: "hero",
    label: "Hero",
    anchor: "top",
    fields: [
      { type: "text", key: "kicker", label: "Kicker line" },
      { type: "textarea", key: "title", label: "Headline", rows: 2, hint: "Wrap a word in *stars* for italic accent." },
      { type: "textarea", key: "subtitle", label: "Description", rows: 3 },
      { type: "text", key: "button", label: "Button text" },
      { type: "text", key: "subtext", label: "Sub-text under button" },
      { type: "image", key: "imgA", label: "Centre product image" },
      { type: "image", key: "imgB", label: "Left image" },
      { type: "image", key: "imgC", label: "Right image" },
      { type: "text", key: "caption", label: "Image set caption" },
    ],
  },
  {
    id: "marquee",
    label: "Marquee",
    toggleable: true,
    fields: [
      { type: "text", key: "text", label: "Scrolling text", hint: "Separate items with ·" },
    ],
  },
  {
    id: "ritual",
    label: "Ritual steps",
    toggleable: true,
    anchor: "ritual",
    fields: [
      { type: "text", key: "kicker", label: "Kicker" },
      { type: "text", key: "title", label: "Heading" },
      {
        type: "list",
        key: "steps",
        label: "Steps",
        itemLabel: "Step",
        titleKey: "name",
        max: 6,
        newItem: { emoji: "✨", name: "New Step", desc: "Describe this step." },
        fields: [
          { type: "text", key: "emoji", label: "Emoji" },
          { type: "text", key: "name", label: "Name" },
          { type: "textarea", key: "desc", label: "Description", rows: 2 },
        ],
      },
      { type: "text", key: "note", label: "Footnote" },
    ],
  },
  {
    id: "split",
    label: "Feature split",
    toggleable: true,
    fields: [
      { type: "text", key: "kicker", label: "Kicker" },
      { type: "textarea", key: "title", label: "Heading", rows: 2 },
      { type: "textarea", key: "text", label: "Body text", rows: 4 },
      { type: "text", key: "link", label: "Link text" },
      { type: "image", key: "image", label: "Photo" },
    ],
  },
  {
    id: "cta",
    label: "CTA section",
    toggleable: true,
    fields: [
      { type: "text", key: "title", label: "Heading" },
      { type: "text", key: "subtitle", label: "Subtitle" },
      { type: "text", key: "button", label: "Button text" },
    ],
  },
  {
    id: "footer",
    label: "Footer",
    fields: [
      { type: "text", key: "copyright", label: "Copyright" },
      { type: "text", key: "tagline", label: "Tagline" },
      { type: "email", key: "email", label: "Email" },
    ],
  },
  {
    id: "seo",
    label: "Page settings (SEO)",
    fields: [
      { type: "text", key: "title", label: "Page title" },
      { type: "textarea", key: "description", label: "Search description", rows: 3 },
    ],
  },
];

const defaults: Content = {
  enabled: { marquee: true, ritual: true, split: true, cta: true },
  values: {
    brand: { name: "Lumen", cta: "Shop the range" },
    theme: { bg: "#f8eee9", dark: "#3a2a26", accent: "#b96a5b", muted: "#6d554e", border: "#e3cfc6" },
    hero: {
      kicker: "Barrier-first skincare · Small batch",
      title: "Skin, but *quieter.*",
      subtitle: "Four considered formulas, no twenty-step routine. Lumen is built around your skin barrier and nothing else.",
      button: "Discover the ritual",
      subtext: "Dermatologist tested · Fragrance free · Refillable",
      imgA: U("photo-1570194065650-d99fb4bedf0a", "w=700&h=900"),
      imgB: U("photo-1556228578-8c89e6adf883", "w=500&h=600"),
      imgC: U("photo-1608248543803-ba4f8c70ae0b", "w=500&h=600"),
      caption: "The everyday set · $78",
    },
    marquee: { text: "Ceramides · Squalane · Panthenol · Oat lipids" },
    ritual: {
      kicker: "The four-step ritual",
      title: "Less, but better.",
      steps: [
        { emoji: "🫧", name: "Cleanse", desc: "A pH-balanced gel that removes the day without stripping the barrier." },
        { emoji: "💧", name: "Hydrate", desc: "Hyaluronic and panthenol serum that sinks in and stays put." },
        { emoji: "🌾", name: "Seal", desc: "Ceramide cream that locks everything in overnight, weightlessly." },
      ],
      note: "That's it. Morning and night, four minutes total.",
    },
    split: {
      kicker: "Why barrier-first",
      title: "Healthy skin isn't a trend. It's a baseline.",
      text: "Most routines over-exfoliate and under-repair. We do the opposite: fewer actives, more lipids, and formulas tested for 12 weeks on sensitive skin.\n\nEvery bottle is refillable, and every ingredient is listed in plain English on the label.",
      link: "Read our formulation notes",
      image: U("photo-1515377905703-c4788e51af15", "w=900&h=900"),
    },
    cta: {
      title: "Start with the essentials.",
      subtitle: "The Everyday Set — cleanser, serum and cream. $78, refills $54.",
      button: "Shop the set",
    },
    footer: { copyright: "© 2026 Lumen Skin", tagline: "Copenhagen · Made in small batches", email: "care@lumenskin.com" },
    seo: { title: "Lumen Skin — Quiet Skincare", description: "Barrier-first skincare. Four considered formulas, no twenty-step routine." },
  },
};

const presets = {
  section: "theme",
  items: [
    { name: "Blush", swatch: ["#f8eee9", "#b96a5b"], values: { bg: "#f8eee9", dark: "#3a2a26", accent: "#b96a5b", muted: "#6d554e", border: "#e3cfc6" } },
    { name: "Sage", swatch: ["#f0f2ea", "#6b8a5e"], values: { bg: "#f0f2ea", dark: "#2a3326", accent: "#6b8a5e", muted: "#5e6d54", border: "#c6d3c0" } },
    { name: "Lavender", swatch: ["#f2eef8", "#8a6bb9"], values: { bg: "#f2eef8", dark: "#2a263a", accent: "#8a6bb9", muted: "#6d5580", border: "#d3c6e3" } },
    { name: "Sand", swatch: ["#f4f0e6", "#a08060"], values: { bg: "#f4f0e6", dark: "#3a3026", accent: "#a08060", muted: "#7a6a5a", border: "#ddd0c0" } },
    { name: "Cloud", swatch: ["#f0f2f4", "#6a8090"], values: { bg: "#f0f2f4", dark: "#262e34", accent: "#6a8090", muted: "#5a6a76", border: "#c6d0d8" } },
  ],
};

function accentItalic(s: string) {
  return esc(s).replace(/\*(.+?)\*/g, "<em>$1</em>");
}

function render(c: Content, options: Parameters<EditableTemplate["render"]>[1] = {}) {
  const r = reader(c);
  const s = r.str;
  const d = defaults.values;
  const col = (key: string) => safeColor(s("theme", key), d.theme[key] as string);
  const bg = col("bg");
  const dark = col("dark");
  const accent = col("accent");
  const muted = col("muted");
  const border = col("border");
  const name = esc(s("brand", "name") || "Lumen");
  const cta = esc(s("brand", "cta") || "Shop the range");
  const img = (src: string, fallback = "") => safeUrl(src, fallback);

  const steps = r.list("ritual", "steps");
  const marqueeText = esc(s("marquee", "text"));
  const heroTitle = accentItalic(s("hero", "title"));

  const splitParas = s("split", "text").split("\n\n").filter(Boolean).map((p) => `<p>${esc(p.trim())}</p>`).join("");

  const navLinks = [
    r.on("ritual") ? `<li><a href="#ritual">The ritual</a></li>` : "",
  ].filter(Boolean).join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${esc(s("seo", "title") || s("brand", "name"))}</title>
<meta name="description" content="${esc(s("seo", "description"))}">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
${previewScript(options?.preview)}
${revealScript}
<style>
:root{--bg:${bg};--dark:${dark};--acc:${accent};--muted:${muted};--bdr:${border}}
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:var(--bg);color:var(--dark);overflow-x:hidden}a{text-decoration:none;color:inherit}
:focus-visible{outline:2px solid var(--acc);outline-offset:3px}
${revealCss}
nav{display:flex;align-items:center;justify-content:space-between;padding:1.5rem 5%;max-width:1300px;margin:0 auto}
.logo{font-family:'Cormorant Garamond',serif;font-size:1.65rem;letter-spacing:.22em;text-transform:uppercase}
nav ul{list-style:none;display:flex;gap:2.2rem;font-size:.74rem;letter-spacing:.12em;text-transform:uppercase;color:var(--muted)}nav ul a:hover{color:var(--dark)}
.nav-btn{font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;border:1px solid var(--dark);padding:.7rem 1.4rem;border-radius:50px;transition:.25s}.nav-btn:hover{background:var(--dark);color:var(--bg)}
.hero{max-width:1150px;margin:0 auto;padding:2.5rem 5% 5rem;text-align:center}
.hero .kicker{font-size:.64rem;font-weight:600;letter-spacing:.3em;text-transform:uppercase;color:var(--acc);margin-bottom:1.6rem}
h1{font-family:'Cormorant Garamond',serif;font-size:5.6rem;line-height:.98;font-weight:300;letter-spacing:-.01em;margin-bottom:1.4rem}h1 em{font-style:italic;color:var(--acc)}
.hero p{max-width:480px;margin:0 auto 2rem;font-size:.9rem;line-height:1.85;color:var(--muted)}
.btn{display:inline-block;background:var(--dark);color:var(--bg);padding:1rem 2.2rem;border-radius:50px;font-size:.7rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;transition:.25s}.btn:hover{background:var(--acc)}
.hero .sub{display:block;margin-top:1rem;font-size:.7rem;color:color-mix(in srgb,var(--muted) 80%,var(--bg));letter-spacing:.04em}
.stage{position:relative;max-width:980px;margin:3.5rem auto 0;height:460px;display:flex;align-items:center;justify-content:center}
.stage img{position:absolute;object-fit:cover;border-radius:200px 200px 0 0}.stage .a{width:300px;height:380px;left:50%;transform:translateX(-50%);z-index:2}
.stage .b{width:230px;height:300px;left:calc(50% - 330px);border-radius:18px;z-index:1;filter:saturate(.8)}
.stage .c{width:230px;height:300px;left:calc(50% + 100px);border-radius:18px;z-index:1;filter:saturate(.8)}
.stage .cap{position:absolute;bottom:-6px;left:50%;transform:translateX(-50%);background:var(--bg);padding:.55rem 1.1rem;border:1px solid var(--bdr);border-radius:50px;font-size:.64rem;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);z-index:3;white-space:nowrap}
.marquee{border-top:1px solid var(--bdr);border-bottom:1px solid var(--bdr);padding:1rem 0;overflow:hidden;white-space:nowrap;font-family:'Cormorant Garamond',serif;font-size:1.1rem;font-style:italic;color:color-mix(in srgb,var(--muted) 70%,var(--bg))}
.marquee span{display:inline-block;animation:move 30s linear infinite}@keyframes move{to{transform:translateX(-50%)}}
.section{max-width:1150px;margin:0 auto;padding:5rem 5%}
.head{text-align:center;margin-bottom:3rem}.head .k{font-size:.62rem;font-weight:600;letter-spacing:.26em;text-transform:uppercase;color:var(--acc);margin-bottom:.8rem}
.head h2{font-family:'Cormorant Garamond',serif;font-size:3rem;font-weight:400;line-height:1.1}
.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:1.6rem}
.step{background:color-mix(in srgb,var(--bg) 90%,var(--acc));border:1px solid var(--bdr);border-radius:18px;padding:1.8rem;text-align:left}
.step .n{font-family:'Cormorant Garamond',serif;font-size:1.1rem;color:var(--acc);margin-bottom:1.4rem;display:block}
.step .dot{width:100%;height:150px;border-radius:12px;margin-bottom:1.2rem;display:flex;align-items:center;justify-content:center;font-size:2.2rem;background:linear-gradient(140deg,color-mix(in srgb,var(--bg) 65%,var(--acc)),color-mix(in srgb,var(--bg) 55%,var(--acc)))}
.step h3{font-family:'Cormorant Garamond',serif;font-size:1.5rem;font-weight:400;margin-bottom:.4rem}
.step p{font-size:.8rem;color:color-mix(in srgb,var(--muted) 90%,var(--dark));line-height:1.7}.note{margin-top:1.6rem;font-size:.72rem;color:color-mix(in srgb,var(--muted) 70%,var(--bg));text-align:center;letter-spacing:.02em}
.split{display:grid;grid-template-columns:1fr 1fr;gap:0;border-top:1px solid var(--bdr);border-bottom:1px solid var(--bdr)}
.split img{width:100%;height:100%;min-height:480px;object-fit:cover}.split .body{padding:4.5rem 5%;display:flex;flex-direction:column;justify-content:center}
.split .body .k{font-size:.62rem;font-weight:600;letter-spacing:.26em;text-transform:uppercase;color:var(--acc);margin-bottom:1rem}
.split .body h2{font-family:'Cormorant Garamond',serif;font-size:2.7rem;font-weight:400;line-height:1.12;margin-bottom:1rem}
.split .body p{font-size:.86rem;line-height:1.85;color:color-mix(in srgb,var(--muted) 90%,var(--dark));max-width:400px;margin-bottom:.9rem}
.split .body a{font-size:.7rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;border-bottom:1px solid var(--dark);align-self:flex-start;padding-bottom:4px;margin-top:.8rem}
.cta{text-align:center;padding:5rem 5%}.cta h2{font-family:'Cormorant Garamond',serif;font-size:3.2rem;font-weight:400;margin-bottom:.8rem}
.cta p{color:color-mix(in srgb,var(--muted) 90%,var(--dark));font-size:.85rem;margin-bottom:1.8rem}
footer{display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap;padding:1.8rem 5%;font-size:.66rem;color:color-mix(in srgb,var(--muted) 60%,var(--bg));border-top:1px solid var(--bdr);letter-spacing:.04em}
@media(max-width:980px){h1{font-size:4.2rem}.stage{height:400px}.stage .b{left:calc(50% - 280px);width:180px;height:240px}.stage .c{left:calc(50% + 100px);width:180px;height:240px}.steps{grid-template-columns:1fr}.split{grid-template-columns:1fr}.split img{min-height:340px}.split .body{padding:3rem 5%}}
@media(max-width:660px){nav ul{display:none}h1{font-size:3.1rem}.stage{height:320px}.stage .a{width:220px;height:290px}.stage .b,.stage .c{display:none}.head h2{font-size:2.2rem}.cta h2{font-size:2.2rem}.split .body h2{font-size:2rem}}
</style>
</head>
<body>
<nav>
<a href="#top" class="logo">${name}</a>
<ul>${navLinks}<li><a href="#">Shop</a></li><li><a href="#">Journal</a></li></ul>
<a href="#ritual" class="nav-btn">${cta}</a>
</nav>

<section class="hero rv" id="top">
${s("hero", "kicker") ? `<div class="kicker">${esc(s("hero", "kicker"))}</div>` : ""}
<h1>${heroTitle}</h1>
<p>${esc(s("hero", "subtitle"))}</p>
${s("hero", "button") ? `<a href="#ritual" class="btn">${esc(s("hero", "button"))}</a>` : ""}
${s("hero", "subtext") ? `<span class="sub">${esc(s("hero", "subtext"))}</span>` : ""}
<div class="stage">
${img(s("hero", "imgB"), d.hero.imgB as string) ? `<img class="b" src="${img(s("hero", "imgB"), d.hero.imgB as string)}" alt="Product">` : ""}
${img(s("hero", "imgC"), d.hero.imgC as string) ? `<img class="c" src="${img(s("hero", "imgC"), d.hero.imgC as string)}" alt="Product">` : ""}
${img(s("hero", "imgA"), d.hero.imgA as string) ? `<img class="a" src="${img(s("hero", "imgA"), d.hero.imgA as string)}" alt="${esc(s("brand", "name"))}">` : ""}
${s("hero", "caption") ? `<div class="cap">${esc(s("hero", "caption"))}</div>` : ""}
</div>
</section>

${r.on("marquee") && marqueeText ? `<div class="marquee"><span>${marqueeText} · ${marqueeText} · </span></div>` : ""}

${r.on("ritual") && steps.length ? `<section class="section" id="ritual">
<div class="head rv"><div class="k">${esc(s("ritual", "kicker"))}</div><h2>${esc(s("ritual", "title"))}</h2></div>
<div class="steps">${steps.map((st, i) => `<div class="step rv${i ? ` d${Math.min(i, 3)}` : ""}"><span class="n">0${i + 1}</span><div class="dot">${st.emoji || ""}</div><h3>${esc(st.name)}</h3><p>${esc(st.desc)}</p></div>`).join("")}</div>
${s("ritual", "note") ? `<p class="note">${esc(s("ritual", "note"))}</p>` : ""}
</section>` : ""}

${r.on("split") ? `<div class="split rv">
${img(s("split", "image"), d.split.image as string) ? `<img src="${img(s("split", "image"), d.split.image as string)}" alt="Ingredients">` : ""}
<div class="body">
${s("split", "kicker") ? `<div class="k">${esc(s("split", "kicker"))}</div>` : ""}
<h2>${esc(s("split", "title"))}</h2>
${splitParas}
${s("split", "link") ? `<a href="#">${esc(s("split", "link"))}</a>` : ""}
</div>
</div>` : ""}

${r.on("cta") ? `<section class="cta rv">
<h2>${esc(s("cta", "title"))}</h2>
<p>${esc(s("cta", "subtitle"))}</p>
${s("cta", "button") ? `<a href="#" class="btn">${esc(s("cta", "button"))}</a>` : ""}
</section>` : ""}

<footer>
<span>${esc(s("footer", "copyright"))}</span>
<span>${esc(s("footer", "tagline"))}</span>
<span>${esc(s("footer", "email"))}</span>
</footer>
</body>
</html>`;
}

export const premiumLumenSkin: EditableTemplate = {
  id: "premium-lumen-skin",
  name: "Lumen Skin",
  schema,
  defaults,
  presets,
  render,
  checks: (c) => {
    const r = reader(c);
    const out: { section: string; message: string }[] = [];
    if (!r.str("seo", "description").trim())
      out.push({ section: "seo", message: "Add a search description so your page looks good on Google." });
    if (r.on("ritual") && r.list("ritual", "steps").length === 0)
      out.push({ section: "ritual", message: "Add at least one step to the ritual." });
    return out;
  },
};
