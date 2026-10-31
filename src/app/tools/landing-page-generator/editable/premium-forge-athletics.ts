import type { Content, EditableTemplate, Item, Section } from "../editor/types";
import { esc, previewScript, reader, revealCss, revealScript, safeColor, safeUrl } from "../editor/html";

const U = (id: string, size: string) => `https://images.unsplash.com/${id}?${size}&fit=crop&auto=format&q=80`;

const schema: Section[] = [
  {
    id: "brand",
    label: "Brand",
    description: "Gym name, logo accent and main call-to-action.",
    fields: [
      { type: "text", key: "name", label: "Gym name" },
      { type: "text", key: "cta", label: "Nav CTA text" },
      { type: "text", key: "ticker", label: "Ticker text", hint: "Repeating marquee across the top. Separate items with ·" },
    ],
  },
  {
    id: "theme",
    label: "Colors",
    fields: [
      { type: "color", key: "accent", label: "Accent (red)" },
      { type: "color", key: "dark", label: "Dark" },
      { type: "color", key: "bg", label: "Background" },
      { type: "color", key: "text", label: "Body text" },
    ],
  },
  {
    id: "hero",
    label: "Hero",
    anchor: "top",
    fields: [
      { type: "text", key: "tag", label: "Tag line", placeholder: "Est. 2018 · Members only" },
      { type: "textarea", key: "title", label: "Headline", rows: 2, hint: "Wrap words in *stars* for outline style." },
      { type: "textarea", key: "subtitle", label: "Body text", rows: 3 },
      { type: "text", key: "btnPrimary", label: "Primary button" },
      { type: "text", key: "btnSecondary", label: "Secondary button" },
      { type: "image", key: "image", label: "Hero photo" },
      { type: "text", key: "bigNumber", label: "Big number overlay" },
      { type: "text", key: "bigLabel", label: "Big number label" },
    ],
  },
  {
    id: "stats",
    label: "Stats bar",
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
    id: "classes",
    label: "Classes",
    toggleable: true,
    anchor: "classes",
    fields: [
      { type: "text", key: "title", label: "Heading" },
      { type: "textarea", key: "subtitle", label: "Description", rows: 2 },
      {
        type: "list",
        key: "items",
        label: "Classes",
        itemLabel: "Class",
        titleKey: "name",
        max: 9,
        newItem: { time: "06:00 · 45 min", name: "New Class", desc: "Describe the class.", level: "All levels" },
        fields: [
          { type: "text", key: "time", label: "Time & duration" },
          { type: "text", key: "name", label: "Name" },
          { type: "textarea", key: "desc", label: "Description", rows: 2 },
          { type: "text", key: "level", label: "Level" },
        ],
      },
    ],
  },
  {
    id: "join",
    label: "Join / pricing",
    toggleable: true,
    anchor: "join",
    fields: [
      { type: "text", key: "title", label: "Heading" },
      { type: "textarea", key: "text", label: "Body", rows: 3 },
      { type: "text", key: "price", label: "Price" },
      { type: "text", key: "priceNote", label: "Price note", placeholder: "/ month · cancel anytime" },
      { type: "text", key: "button", label: "Button text" },
      { type: "image", key: "image", label: "Photo" },
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
    fields: [
      { type: "text", key: "title", label: "Page title" },
      { type: "textarea", key: "description", label: "Search description", rows: 3 },
    ],
  },
];

const defaults: Content = {
  enabled: { stats: true, classes: true, join: true },
  values: {
    brand: { name: "Forge", cta: "Free first week", ticker: "Strength · Conditioning · No contracts · Open 5am–11pm · Forge Athletics" },
    theme: { accent: "#e23b2e", dark: "#121212", bg: "#f2efe9", text: "#4a4a4a" },
    hero: {
      tag: "Est. 2018 · Members only",
      title: "Lift\nheavy.\n*Live* lighter.",
      subtitle: "Coaching-first strength training for people who are done with crowded machines and guesswork. Real programmes, real progress.",
      btnPrimary: "Start training",
      btnSecondary: "See classes",
      image: U("photo-1534438327276-14e5300c3a48", "w=900&h=1100"),
      bigNumber: "5AM",
      bigLabel: "Doors open daily",
    },
    stats: {
      items: [
        { value: "1,200+", label: "Active members" },
        { value: "14", label: "Coaches" },
        { value: "98%", label: "Renewal rate" },
        { value: "0", label: "Lock-in contracts" },
      ],
    },
    classes: {
      title: "Today's board",
      subtitle: "Every class is capped at 12 so a coach can actually coach.",
      items: [
        { time: "06:00 · 45 min", name: "Barbell Basics", desc: "Squat, hinge, press, pull — technique before load.", level: "All levels" },
        { time: "07:30 · 60 min", name: "Iron Conditioning", desc: "Density circuits that build work capacity, not wreckage.", level: "Intermediate" },
        { time: "12:15 · 30 min", name: "Express Strength", desc: "Lunch-break lifting with a fixed, efficient plan.", level: "All levels" },
        { time: "17:00 · 60 min", name: "Power Hour", desc: "Heavy triples and technique work for experienced lifters.", level: "Advanced" },
        { time: "18:15 · 45 min", name: "Engine Room", desc: "Sled, rower and bike intervals. Bring a towel.", level: "All levels" },
        { time: "19:30 · 60 min", name: "Strong & Mobile", desc: "Strength with joint-friendly ranges and long exhales.", level: "Beginner" },
      ],
    },
    join: {
      title: "First week on us.",
      text: "No tour, no sales pitch. Come train for seven days, meet the coaches and decide for yourself.",
      price: "$89",
      priceNote: "/ month · cancel anytime",
      button: "Claim free week",
      image: U("photo-1571019613454-1cb2f99b2d8b", "w=900&h=900"),
    },
    footer: { copyright: "© 2026 Forge Athletics", locations: "Manchester · Leeds · Bristol", email: "train@forge.club" },
    seo: { title: "Forge Athletics — Strength Club", description: "Coaching-first strength training. Real programmes, real progress." },
  },
};

const presets = {
  section: "theme",
  items: [
    { name: "Original", swatch: ["#f2efe9", "#e23b2e"], values: { accent: "#e23b2e", dark: "#121212", bg: "#f2efe9", text: "#4a4a4a" } },
    { name: "Midnight", swatch: ["#111111", "#ff4d3a"], values: { accent: "#ff4d3a", dark: "#111111", bg: "#111111", text: "#a0a0a0" } },
    { name: "Military", swatch: ["#f0ece4", "#3a6b35"], values: { accent: "#3a6b35", dark: "#1a1a1a", bg: "#f0ece4", text: "#4a4a4a" } },
    { name: "Electric", swatch: ["#f2efe9", "#ff6b00"], values: { accent: "#ff6b00", dark: "#121212", bg: "#f2efe9", text: "#4a4a4a" } },
    { name: "Steel", swatch: ["#e8e8e8", "#2563eb"], values: { accent: "#2563eb", dark: "#0f0f0f", bg: "#e8e8e8", text: "#4a4a4a" } },
  ],
};

function outlineText(s: string) {
  return esc(s).replace(/\*(.+?)\*/g, "<i>$1</i>");
}

function render(c: Content, options: Parameters<EditableTemplate["render"]>[1] = {}) {
  const r = reader(c);
  const s = r.str;
  const d = defaults.values;
  const col = (key: string) => safeColor(s("theme", key), d.theme[key] as string);
  const accent = col("accent");
  const dark = col("dark");
  const bg = col("bg");
  const textCol = col("text");
  const name = s("brand", "name") || "Forge";
  const cta = esc(s("brand", "cta") || "Free first week");
  const ticker = esc(s("brand", "ticker"));
  const img = (src: string, fallback = "") => safeUrl(src, fallback);

  const statsItems = r.list("stats", "items").slice(0, 4);
  const classes = r.list("classes", "items");
  const heroLines = s("hero", "title").split("\n").map((l) => outlineText(l.trim())).join("<br>");

  const navLinks = [
    r.on("classes") ? `<li><a href="#classes">Classes</a></li>` : "",
    r.on("join") ? `<li><a href="#join">Join</a></li>` : "",
  ].filter(Boolean).join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${esc(s("seo", "title") || name)}</title>
<meta name="description" content="${esc(s("seo", "description"))}">
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
${previewScript(options?.preview)}
${revealScript}
<style>
:root{--acc:${accent};--dark:${dark};--bg:${bg};--text:${textCol}}
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:var(--bg);color:var(--dark);overflow-x:hidden}a{text-decoration:none;color:inherit}
:focus-visible{outline:2px solid var(--acc);outline-offset:3px}
${revealCss}
.ticker{background:var(--dark);color:var(--bg);overflow:hidden;white-space:nowrap;padding:.65rem 0;font-size:.68rem;font-weight:600;letter-spacing:.22em;text-transform:uppercase;border-bottom:2px solid var(--acc)}
.ticker span{display:inline-block;animation:slide 26s linear infinite}@keyframes slide{to{transform:translateX(-50%)}}
nav{display:flex;align-items:center;justify-content:space-between;padding:1.3rem 4%;border-bottom:2px solid var(--dark)}
.logo{font-family:'Anton',sans-serif;font-size:1.5rem;letter-spacing:.02em;text-transform:uppercase}.logo b{color:var(--acc)}
nav ul{list-style:none;display:flex;gap:2rem;font-size:.72rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase}nav ul a:hover{color:var(--acc)}
.nav-btn{background:var(--dark);color:var(--bg);padding:.75rem 1.5rem;font-size:.68rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;transition:.2s}.nav-btn:hover{background:var(--acc)}
.hero{display:grid;grid-template-columns:1.1fr .9fr;border-bottom:2px solid var(--dark)}
.hero .copy{padding:5rem 4% 4rem;display:flex;flex-direction:column;justify-content:center;border-right:2px solid var(--dark)}
.tag{display:inline-block;align-self:flex-start;background:var(--acc);color:#fff;font-size:.6rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;padding:.45rem .8rem;margin-bottom:1.6rem}
h1{font-family:'Anton',sans-serif;font-size:7.2rem;line-height:.88;text-transform:uppercase;letter-spacing:-.01em;margin-bottom:1.4rem}
h1 i{font-style:normal;-webkit-text-stroke:2px var(--dark);color:transparent}
.hero p{font-size:.92rem;line-height:1.8;color:var(--text);max-width:420px;margin-bottom:2rem}
.actions{display:flex;gap:.8rem;flex-wrap:wrap}
.btn{background:var(--acc);color:#fff;padding:1.05rem 2rem;font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;transition:.2s}.btn:hover{background:var(--dark)}
.btn.ghost{background:transparent;color:var(--dark);border:2px solid var(--dark)}.btn.ghost:hover{background:var(--dark);color:var(--bg)}
.hero .photo{position:relative;overflow:hidden;background:color-mix(in srgb,var(--bg) 90%,var(--dark))}.hero .photo img{width:100%;height:100%;object-fit:cover;filter:grayscale(1) contrast(1.1)}
.big{position:absolute;bottom:0;right:0;background:var(--dark);color:var(--bg);padding:1.2rem 1.6rem;text-align:right}
.big b{display:block;font-family:'Anton',sans-serif;font-size:2.6rem;line-height:1}.big span{font-size:.58rem;letter-spacing:.18em;text-transform:uppercase;color:#8f8f8f}
.bar{display:grid;grid-template-columns:repeat(var(--n,4),1fr);border-bottom:2px solid var(--dark)}.bar div{padding:2rem 1rem;text-align:center;border-right:2px solid var(--dark)}
.bar div:last-child{border:none}
.bar b{display:block;font-family:'Anton',sans-serif;font-size:2.1rem;color:var(--acc)}.bar span{font-size:.6rem;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#5a5a5a}
.section{padding:4.5rem 4%;border-bottom:2px solid var(--dark)}.head{display:flex;justify-content:space-between;align-items:end;gap:2rem;margin-bottom:2.2rem;flex-wrap:wrap}
.head h2{font-family:'Anton',sans-serif;font-size:3.2rem;line-height:.95;text-transform:uppercase}.head p{font-size:.78rem;max-width:300px;color:#5a5a5a;line-height:1.7}
.classes{display:grid;grid-template-columns:repeat(3,1fr);gap:0;border:2px solid var(--dark)}
.cls{padding:1.8rem;border-right:2px solid var(--dark);border-bottom:2px solid var(--dark);transition:.2s;cursor:pointer}
.cls:nth-child(3n){border-right:none}.cls:nth-last-child(-n+3){border-bottom:none}.cls:hover{background:var(--dark);color:var(--bg)}
.cls .time{font-size:.62rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--acc);margin-bottom:.8rem}
.cls h3{font-family:'Anton',sans-serif;font-size:1.45rem;font-weight:400;text-transform:uppercase;margin-bottom:.3rem}
.cls p{font-size:.78rem;color:#6a6a6a;line-height:1.6}.cls:hover p{color:#a8a8a8}
.cls .lvl{display:inline-block;margin-top:1rem;font-size:.56rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;border:1px solid currentColor;padding:.25rem .55rem}
.split{display:grid;grid-template-columns:1fr 1fr;border-bottom:2px solid var(--dark)}.split img{width:100%;height:100%;min-height:440px;object-fit:cover;filter:grayscale(1)}
.split .body{padding:4rem;display:flex;flex-direction:column;justify-content:center}
.split .body h2{font-family:'Anton',sans-serif;font-size:2.8rem;line-height:1;text-transform:uppercase;margin-bottom:1rem}
.split .body p{color:var(--text);line-height:1.8;font-size:.88rem;margin-bottom:1rem;max-width:420px}
.price{display:flex;align-items:baseline;gap:.6rem;margin:1.2rem 0 1.6rem}
.price b{font-family:'Anton',sans-serif;font-size:2.6rem}.price span{font-size:.72rem;color:#6a6a6a}
footer{display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap;padding:1.6rem 4%;font-size:.62rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#7a7a7a}
@media(max-width:1050px){h1{font-size:5.4rem}.hero{grid-template-columns:1fr}.hero .copy{border-right:none;border-bottom:2px solid var(--dark)}.hero .photo{min-height:400px}.classes{grid-template-columns:1fr 1fr}}
@media(max-width:760px){nav ul{display:none}h1{font-size:4rem}.bar{grid-template-columns:1fr 1fr}.classes{grid-template-columns:1fr}.split{grid-template-columns:1fr}.split .body{padding:2.5rem 4%}.head h2{font-size:2.3rem}}
</style>
</head>
<body>
${ticker ? `<div class="ticker"><span>${ticker} · ${ticker} · </span></div>` : ""}
<nav><a href="#top" class="logo">${esc(name)}<b>.</b></a><ul>${navLinks}</ul><a href="#join" class="nav-btn">${cta}</a></nav>

<section class="hero rv" id="top">
<div class="copy">
${s("hero", "tag") ? `<span class="tag">${esc(s("hero", "tag"))}</span>` : ""}
<h1>${heroLines}</h1>
<p>${esc(s("hero", "subtitle"))}</p>
<div class="actions">
${s("hero", "btnPrimary") ? `<a href="#join" class="btn">${esc(s("hero", "btnPrimary"))}</a>` : ""}
${s("hero", "btnSecondary") ? `<a href="#classes" class="btn ghost">${esc(s("hero", "btnSecondary"))}</a>` : ""}
</div>
</div>
<div class="photo">
${img(s("hero", "image"), d.hero.image as string) ? `<img src="${img(s("hero", "image"), d.hero.image as string)}" alt="${esc(name)}">` : ""}
${s("hero", "bigNumber") ? `<div class="big"><b>${esc(s("hero", "bigNumber"))}</b><span>${esc(s("hero", "bigLabel"))}</span></div>` : ""}
</div>
</section>

${r.on("stats") && statsItems.length ? `<div class="bar rv" style="--n:${statsItems.length}">${statsItems.map((st) => `<div><b>${esc(st.value)}</b><span>${esc(st.label)}</span></div>`).join("")}</div>` : ""}

${r.on("classes") && classes.length ? `<section class="section" id="classes">
<div class="head rv"><h2>${esc(s("classes", "title"))}</h2><p>${esc(s("classes", "subtitle"))}</p></div>
<div class="classes">${classes.map((cl, i) => `<div class="cls rv${i % 3 ? ` d${i % 3}` : ""}"><div class="time">${esc(cl.time)}</div><h3>${esc(cl.name)}</h3><p>${esc(cl.desc)}</p><span class="lvl">${esc(cl.level)}</span></div>`).join("")}</div>
</section>` : ""}

${r.on("join") ? `<section class="split rv" id="join">
${img(s("join", "image"), d.join.image as string) ? `<img src="${img(s("join", "image"), d.join.image as string)}" alt="">` : ""}
<div class="body">
<h2>${esc(s("join", "title"))}</h2>
<p>${esc(s("join", "text"))}</p>
<div class="price"><b>${esc(s("join", "price"))}</b><span>${esc(s("join", "priceNote"))}</span></div>
<a href="#" class="btn">${esc(s("join", "button"))}</a>
</div>
</section>` : ""}

<footer>
<span>${esc(s("footer", "copyright"))}</span>
<span>${esc(s("footer", "locations"))}</span>
<span>${esc(s("footer", "email"))}</span>
</footer>
</body>
</html>`;
}

export const premiumForgeAthletics: EditableTemplate = {
  id: "premium-forge-athletics",
  name: "Forge Athletics",
  schema,
  defaults,
  presets,
  render,
  checks: (c) => {
    const r = reader(c);
    const out: { section: string; message: string }[] = [];
    if (!r.str("seo", "description").trim())
      out.push({ section: "seo", message: "Add a search description so your page looks good on Google." });
    if (r.on("classes") && r.list("classes", "items").length === 0)
      out.push({ section: "classes", message: "Add at least one class to the timetable." });
    return out;
  },
};
