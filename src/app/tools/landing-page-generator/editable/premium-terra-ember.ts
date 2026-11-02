import type { Content, EditableTemplate, Section } from "../editor/types";
import { esc, previewScript, reader, revealCss, revealScript, safeColor, safeUrl } from "../editor/html";

const U = (id: string, size: string) => `https://images.unsplash.com/${id}?${size}&fit=crop&auto=format&q=80`;

const schema: Section[] = [
  {
    id: "brand",
    label: "Brand",
    description: "Restaurant name and booking button.",
    fields: [
      { type: "text", key: "name", label: "Restaurant name" },
      { type: "text", key: "separator", label: "Separator", hint: "Character between words in the logo (e.g. '&')." },
      { type: "text", key: "cta", label: "Booking button text" },
    ],
  },
  {
    id: "theme",
    label: "Colors & fonts",
    fields: [
      { type: "color", key: "bg", label: "Background" },
      { type: "color", key: "text", label: "Body text" },
      { type: "color", key: "accent", label: "Accent (gold)" },
      { type: "color", key: "dark", label: "Dark (nav / footer)" },
      { type: "color", key: "muted", label: "Muted text" },
    ],
  },
  {
    id: "hero",
    label: "Hero",
    anchor: "top",
    fields: [
      { type: "text", key: "eyebrow", label: "Eyebrow text", hint: "Small text above the headline." },
      { type: "textarea", key: "title", label: "Headline", rows: 2, hint: "Wrap words in *stars* for italic accent." },
      { type: "textarea", key: "text", label: "Intro text", rows: 3 },
      { type: "text", key: "btnPrimary", label: "Primary button" },
      { type: "text", key: "btnSecondary", label: "Link text" },
      { type: "image", key: "image", label: "Hero image" },
      { type: "text", key: "stampNumber", label: "Stamp number", hint: "Large number in the round badge on the image." },
      { type: "text", key: "stampLabel", label: "Stamp label", hint: "Text below the number." },
    ],
  },
  {
    id: "hours",
    label: "Opening hours",
    toggleable: true,
    anchor: "top",
    fields: [
      {
        type: "list",
        key: "items",
        label: "Time slots",
        itemLabel: "Slot",
        titleKey: "label",
        min: 1,
        max: 4,
        newItem: { label: "Dinner", time: "Tue – Sun · 17:30 – 23:00" },
        fields: [
          { type: "text", key: "label", label: "Label" },
          { type: "text", key: "time", label: "Time" },
        ],
      },
    ],
  },
  {
    id: "menu",
    label: "Menu",
    toggleable: true,
    anchor: "menu",
    fields: [
      { type: "textarea", key: "title", label: "Heading", rows: 2 },
      { type: "textarea", key: "intro", label: "Description", rows: 2 },
      {
        type: "list",
        key: "dishes",
        label: "Dishes",
        itemLabel: "Dish",
        titleKey: "name",
        max: 12,
        newItem: { name: "New dish", desc: "Ingredients and notes.", price: "20" },
        fields: [
          { type: "text", key: "name", label: "Name" },
          { type: "text", key: "desc", label: "Description" },
          { type: "text", key: "price", label: "Price" },
        ],
      },
    ],
  },
  {
    id: "footer",
    label: "Footer",
    fields: [
      { type: "text", key: "copyright", label: "Copyright / address line" },
      { type: "email", key: "email", label: "Reservation email" },
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

const defaults: Content = {
  enabled: { hours: true, menu: true },
  values: {
    brand: { name: "Terra & Ember", separator: "&", cta: "Reserve" },
    theme: { bg: "#f3eee3", text: "#23291d", accent: "#a9773c", dark: "#23291d", muted: "#6d7265" },
    hero: {
      eyebrow: "Wood-fired kitchen · Est. 2018",
      title: "Fire, field\n*& feast.*",
      text: "Seasonal plates cooked over live flame, served in a warm room that feels like someone's home — because it used to be.",
      btnPrimary: "Book a Table",
      btnSecondary: "Explore the menu",
      image: U("photo-1517248135467-4c7edcad34c4", "w=900&h=1100"),
      stampNumber: "08",
      stampLabel: "years of fire",
    },
    hours: {
      items: [
        { label: "Dinner", time: "Tue – Sun · 17:30 – 23:00" },
        { label: "Lunch", time: "Fri – Sun · 12:00 – 15:00" },
      ],
    },
    menu: {
      title: "This week\nat the hearth",
      intro: "Menus change with the market. These are a few favourites from the current tasting.",
      dishes: [
        { name: "Ember-roasted celeriac", desc: "hazelnut, brown butter, aged sheep's cheese", price: "18" },
        { name: "Hand-cut tagliatelle", desc: "wild mushroom, thyme, parmesan broth", price: "24" },
        { name: "Coal-fired sea bass", desc: "fennel, preserved lemon, salsa verde", price: "32" },
        { name: "Dry-aged ribeye", desc: "bone marrow, charred onion, red wine", price: "46" },
        { name: "Burnt honey tart", desc: "crème fraîche, pear, toasted oat", price: "14" },
      ],
    },
    footer: { copyright: "© 2026 Terra & Ember · 14 Mill Lane", email: "hello@terraember.com" },
    seo: {
      title: "Terra & Ember — Fire Kitchen",
      description: "Seasonal plates cooked over live flame. Reserve your table at Terra & Ember.",
    },
  },
};

const presets = {
  section: "theme",
  items: [
    { name: "Olive & Gold", swatch: ["#f3eee3", "#a9773c"], values: { bg: "#f3eee3", text: "#23291d", accent: "#a9773c", dark: "#23291d", muted: "#6d7265" } },
    { name: "Charcoal", swatch: ["#1a1a1a", "#c5975a"], values: { bg: "#1a1a1a", text: "#e8e0d4", accent: "#c5975a", dark: "#111111", muted: "#8a8278" } },
    { name: "Cream & Sage", swatch: ["#f5f0e8", "#6b8f6b"], values: { bg: "#f5f0e8", text: "#2d3a2d", accent: "#6b8f6b", dark: "#2d3a2d", muted: "#7a8574" } },
    { name: "Slate & Copper", swatch: ["#f0eee9", "#b56a3a"], values: { bg: "#f0eee9", text: "#2c2f33", accent: "#b56a3a", dark: "#2c2f33", muted: "#6e7175" } },
    { name: "Warm Night", swatch: ["#0f0d0a", "#d4a254"], values: { bg: "#0f0d0a", text: "#d8d0c4", accent: "#d4a254", dark: "#090806", muted: "#8a8070" } },
  ],
};

function emphTitle(s: string) {
  return esc(s).replace(/\*(.+?)\*/g, "<em>$1</em>");
}

function render(c: Content, options: Parameters<EditableTemplate["render"]>[1] = {}) {
  const r = reader(c);
  const s = r.str;
  const d = defaults.values;
  const col = (key: string) => safeColor(s("theme", key), d.theme[key] as string);
  const bg = col("bg");
  const text = col("text");
  const accent = col("accent");
  const dark = col("dark");
  const muted = col("muted");

  const nameParts = (s("brand", "name") || "Terra & Ember").split(s("brand", "separator") || "&");
  const logoHtml = nameParts.length > 1
    ? `${esc(nameParts[0].trim())} <span>${esc(s("brand", "separator"))}</span> ${esc(nameParts.slice(1).join(s("brand", "separator")).trim())}`
    : esc(s("brand", "name"));
  const cta = esc(s("brand", "cta") || "Reserve");
  const heroImg = safeUrl(s("hero", "image"), d.hero.image as string);

  const hoursItems = r.list("hours", "items");
  const dishes = r.list("menu", "dishes");
  const email = s("footer", "email").trim();
  const titleLines = (s("menu", "title") || "").split("\n").filter(Boolean);

  const navLinks = [
    r.on("menu") ? ["menu", "Menu"] : null,
    ["story", "Our Story"],
    ["visit", "Visit"],
  ].filter(Boolean) as string[][];

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${esc(s("seo", "title") || s("brand", "name"))}</title>
<meta name="description" content="${esc(s("seo", "description"))}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
${previewScript(options?.preview)}
${revealScript}
<style>
:root{--bg:${bg};--text:${text};--accent:${accent};--dark:${dark};--muted:${muted}}
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:var(--bg);color:var(--text);overflow-x:hidden}a{text-decoration:none;color:inherit}
:focus-visible{outline:2px solid var(--accent);outline-offset:3px}
${revealCss}
nav{display:flex;align-items:center;justify-content:space-between;padding:1.6rem 5%;max-width:1400px;margin:0 auto;border-bottom:1px solid color-mix(in srgb,var(--text) 14%,transparent)}
.logo{font-family:'Cormorant Garamond',serif;font-size:1.8rem;font-weight:600;letter-spacing:.04em}.logo span{color:var(--accent)}
nav ul{list-style:none;display:flex;gap:2.2rem}nav ul a{font-size:.78rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);transition:.2s}nav ul a:hover{color:var(--accent)}
.nav-btn{border:1px solid var(--text);padding:.7rem 1.5rem;border-radius:2px;font-size:.7rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;transition:.25s;cursor:pointer;background:transparent;color:var(--text)}.nav-btn:hover{background:var(--text);color:var(--bg)}
.hero{display:grid;grid-template-columns:1fr 1fr;min-height:82vh;max-width:1400px;margin:0 auto}
.copy{padding:5rem 5% 4rem;display:flex;flex-direction:column;justify-content:center}
.eyebrow{display:flex;align-items:center;gap:.8rem;font-size:.7rem;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:var(--accent);margin-bottom:1.6rem}
.eyebrow::before{content:'';width:38px;height:1px;background:var(--accent)}
h1{font-family:'Cormorant Garamond',serif;font-size:4.6rem;font-weight:500;line-height:1.02;letter-spacing:-.02em;margin-bottom:1.5rem}h1 em{font-style:italic;color:var(--accent)}
.copy p{color:var(--muted);line-height:1.85;max-width:420px;font-size:.95rem;margin-bottom:2.2rem}
.actions{display:flex;gap:1rem;flex-wrap:wrap;align-items:center}
.btn{background:var(--text);color:var(--bg);padding:1rem 2rem;border-radius:2px;font-size:.72rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;transition:.25s;display:inline-block}.btn:hover{background:var(--accent)}
.link{font-size:.72rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;border-bottom:1px solid var(--text);padding-bottom:4px}
.hours-row{display:flex;gap:2.5rem;margin-top:3rem;padding-top:1.5rem;border-top:1px solid color-mix(in srgb,var(--text) 14%,transparent);font-size:.72rem;color:var(--muted)}
.hours-row b{display:block;color:var(--text);letter-spacing:.08em;text-transform:uppercase;margin-bottom:.3rem;font-size:.66rem}
.visual{position:relative;overflow:hidden;min-height:520px}
.visual img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.visual::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,var(--bg) 0%,transparent 18%)}
.stamp{position:absolute;right:2rem;bottom:2rem;z-index:2;width:110px;height:110px;border-radius:50%;border:1px solid rgba(255,255,255,.7);background:rgba(35,41,29,.4);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:.6rem;letter-spacing:.18em;text-transform:uppercase;text-align:center;line-height:1.5}
.stamp b{font-family:'Cormorant Garamond',serif;font-size:1.5rem;letter-spacing:0;line-height:1;margin-bottom:.2rem}
.menu-section{max-width:1400px;margin:0 auto;padding:5rem 5% 6rem;display:grid;grid-template-columns:1.1fr 1.9fr;gap:4rem}
.menu-section h2{font-family:'Cormorant Garamond',serif;font-size:2.8rem;font-weight:500;line-height:1.1;margin-bottom:1rem}
.menu-section .intro{color:var(--muted);font-size:.9rem;line-height:1.8;max-width:300px}
.dishes{display:grid;gap:0}
.dish{display:grid;grid-template-columns:1fr auto;align-items:baseline;gap:1rem;padding:1.35rem 0;border-bottom:1px solid color-mix(in srgb,var(--text) 14%,transparent)}
.dish h3{font-family:'Cormorant Garamond',serif;font-size:1.5rem;font-weight:600}.dish p{grid-column:1;color:var(--muted);font-size:.8rem;margin-top:.2rem}
.dish span{font-family:'Cormorant Garamond',serif;font-size:1.25rem;color:var(--accent)}
footer{background:var(--dark);color:var(--bg);padding:2.5rem 5%;text-align:center;font-size:.72rem;letter-spacing:.08em;opacity:.55}
@media(max-width:900px){.hero{grid-template-columns:1fr}.visual{min-height:380px;order:-1}.visual::after{background:linear-gradient(0deg,var(--bg),transparent 20%)}h1{font-size:3.4rem}.menu-section{grid-template-columns:1fr;gap:2rem}}
@media(max-width:640px){nav ul{display:none}.copy{padding:3rem 5%}h1{font-size:2.7rem}.hours-row{gap:1.4rem}.menu-section{padding-top:3rem}}
</style>
</head>
<body>
<nav id="nav">
<a href="#top" class="logo">${logoHtml}</a>
<ul>${navLinks.map(([id, label]) => `<li><a href="#${id}">${label}</a></li>`).join("")}</ul>
<a href="#visit" class="nav-btn">${cta}</a>
</nav>

<section class="hero" id="top">
<div class="copy">
${s("hero", "eyebrow") ? `<div class="eyebrow rv">${esc(s("hero", "eyebrow"))}</div>` : ""}
<h1 class="rv d1">${emphTitle(s("hero", "title"))}</h1>
<p class="rv d2">${esc(s("hero", "text"))}</p>
<div class="actions rv d3">
<a href="#visit" class="btn">${esc(s("hero", "btnPrimary"))}</a>
${s("hero", "btnSecondary") ? `<a href="#menu" class="link">${esc(s("hero", "btnSecondary"))}</a>` : ""}
</div>
${r.on("hours") && hoursItems.length ? `<div class="hours-row rv">${hoursItems.map((h) => `<div><b>${esc(h.label)}</b>${esc(h.time)}</div>`).join("")}</div>` : ""}
</div>
<div class="visual">
<img src="${heroImg}" alt="${esc(s("brand", "name"))}" fetchpriority="high">
${s("hero", "stampNumber") ? `<div class="stamp"><b>${esc(s("hero", "stampNumber"))}</b>${esc(s("hero", "stampLabel"))}</div>` : ""}
</div>
</section>

${r.on("menu") && dishes.length ? `<section class="menu-section" id="menu">
<div class="rv">
<h2>${titleLines.map(esc).join("<br>")}</h2>
<p class="intro">${esc(s("menu", "intro"))}</p>
</div>
<div class="dishes">${dishes.map((dish, i) => `<div class="dish rv${i ? ` d${Math.min(i, 3)}` : ""}">
<h3>${esc(dish.name)}</h3>
<span>${esc(dish.price)}</span>
<p>${esc(dish.desc)}</p>
</div>`).join("")}</div>
</section>` : ""}

<footer id="visit">${esc(s("footer", "copyright"))}${email ? ` · Reserve at ${esc(email)}` : ""}</footer>
</body>
</html>`;
}

export const premiumTerraEmber: EditableTemplate = {
  id: "premium-terra-ember",
  name: "Terra & Ember — Fire Kitchen",
  schema,
  defaults,
  presets,
  render,
  checks: (c) => {
    const r = reader(c);
    const out: { section: string; message: string }[] = [];
    if (!r.str("seo", "description").trim())
      out.push({ section: "seo", message: "Add a search description so your page looks good on Google." });
    if (r.on("menu") && r.list("menu", "dishes").length === 0)
      out.push({ section: "menu", message: "Add at least one dish to the menu." });
    return out;
  },
};
