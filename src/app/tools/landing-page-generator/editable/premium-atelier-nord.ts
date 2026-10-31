import type { Content, EditableTemplate, Section } from "../editor/types";
import { esc, previewScript, reader, revealCss, revealScript, safeColor, safeUrl } from "../editor/html";

const U = (id: string, size: string) => `https://images.unsplash.com/${id}?${size}&fit=crop&auto=format&q=80`;

const schema: Section[] = [
  {
    id: "brand",
    label: "Brand",
    fields: [
      { type: "text", key: "name", label: "School name" },
      { type: "text", key: "cta", label: "Nav CTA text" },
    ],
  },
  {
    id: "theme",
    label: "Colors",
    fields: [
      { type: "color", key: "primary", label: "Primary (cobalt)" },
      { type: "color", key: "accent", label: "Accent (yellow)" },
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
      { type: "text", key: "tag", label: "Tag line" },
      { type: "textarea", key: "title", label: "Headline", rows: 2, hint: "Wrap words in *stars* for highlighted style." },
      { type: "textarea", key: "subtitle", label: "Description", rows: 3 },
      { type: "text", key: "btnPrimary", label: "Primary button" },
      { type: "text", key: "btnSecondary", label: "Link text" },
      { type: "image", key: "bgImage", label: "Background image" },
    ],
  },
  {
    id: "stats",
    label: "Stats",
    toggleable: true,
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
    id: "courses",
    label: "Courses",
    toggleable: true,
    anchor: "courses",
    fields: [
      { type: "text", key: "title", label: "Heading" },
      { type: "text", key: "link", label: "Link text" },
      {
        type: "list",
        key: "items",
        label: "Courses",
        itemLabel: "Course",
        titleKey: "name",
        max: 10,
        newItem: { code: "XX-000", name: "New Course", desc: "Course description.", term: "Autumn · 1 year" },
        fields: [
          { type: "text", key: "code", label: "Code" },
          { type: "text", key: "name", label: "Name" },
          { type: "textarea", key: "desc", label: "Description", rows: 2 },
          { type: "text", key: "term", label: "Term / duration" },
        ],
      },
    ],
  },
  {
    id: "banner",
    label: "Banner / CTA",
    toggleable: true,
    fields: [
      { type: "textarea", key: "title", label: "Heading", rows: 2, hint: "Wrap words in *stars* for accent color." },
      { type: "textarea", key: "text", label: "Body text", rows: 3 },
      { type: "text", key: "cardTitle", label: "Card heading" },
      {
        type: "list",
        key: "dates",
        label: "Key dates",
        itemLabel: "Date",
        titleKey: "label",
        max: 6,
        newItem: { label: "Event", date: "TBD" },
        fields: [
          { type: "text", key: "label", label: "Label" },
          { type: "text", key: "date", label: "Date" },
        ],
      },
      { type: "text", key: "cardNote", label: "Card footnote" },
    ],
  },
  {
    id: "footer",
    label: "Footer",
    fields: [
      { type: "text", key: "copyright", label: "Copyright" },
      { type: "text", key: "address", label: "Address" },
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
  enabled: { stats: true, courses: true, banner: true },
  values: {
    brand: { name: "Atelier Nord", cta: "Apply for 2026 →" },
    theme: { primary: "#1c3fd6", accent: "#ffe14d", dark: "#111111", bg: "#f5f2e8", text: "#4a4a4a" },
    hero: {
      tag: "Design school · Copenhagen · Est. 1997",
      title: "Learn by making,\nnot by *memorising.*",
      subtitle: "Two-year studio programmes in graphic, product and digital design. Small cohorts, real clients, and tutors who still do the work.",
      btnPrimary: "Explore courses",
      btnSecondary: "Book an open studio",
      bgImage: U("photo-1513364776144-60967b0f800f", "w=1600&h=900"),
    },
    stats: {
      items: [
        { value: "240", label: "Students per year" },
        { value: "12", label: "Max per studio" },
        { value: "94%", label: "Placed in 6 months" },
        { value: "28", label: "Years teaching" },
      ],
    },
    courses: {
      title: "Courses & studios",
      link: "Download prospectus",
      items: [
        { code: "GR-201", name: "Graphic Design Studio", desc: "Type, layout and identity across print and screen.", term: "Autumn · 2 years" },
        { code: "PR-140", name: "Product & Furniture", desc: "From sketch to prototype in wood, metal and textile.", term: "Autumn · 2 years" },
        { code: "DG-320", name: "Digital Experience", desc: "Interfaces, motion and research-led interaction design.", term: "Spring · 2 years" },
        { code: "TX-110", name: "Textiles & Materials", desc: "Colour, weave and sustainable material exploration.", term: "Autumn · 1 year" },
        { code: "EV-090", name: "Evening Foundation", desc: "Portfolio-building for career changers and beginners.", term: "Rolling · 10 weeks" },
      ],
    },
    banner: {
      title: "The studio is\n*the classroom.*",
      text: "Every course is built around live briefs, weekly critiques and a final public show. You leave with a portfolio, not just a certificate.",
      cardTitle: "2026 application dates",
      dates: [
        { label: "Portfolio deadline", date: "14 Jan 2026" },
        { label: "Interviews", date: "Feb – Mar" },
        { label: "Offers sent", date: "01 Apr 2026" },
        { label: "Term begins", date: "24 Aug 2026" },
      ],
      cardNote: "Scholarships available for EU applicants.",
    },
    footer: { copyright: "© 2026 Atelier Nord", address: "Refshalevej 22, Copenhagen", email: "study@ateliernord.dk" },
    seo: { title: "Atelier Nord — Design School", description: "Studio programmes in graphic, product and digital design. Copenhagen." },
  },
};

const presets = {
  section: "theme",
  items: [
    { name: "Cobalt", swatch: ["#f5f2e8", "#1c3fd6"], values: { primary: "#1c3fd6", accent: "#ffe14d", dark: "#111111", bg: "#f5f2e8", text: "#4a4a4a" } },
    { name: "Forest", swatch: ["#f2f0e6", "#1a6b3a"], values: { primary: "#1a6b3a", accent: "#b8e986", dark: "#111111", bg: "#f2f0e6", text: "#4a4a4a" } },
    { name: "Terracotta", swatch: ["#f5efe8", "#c0533a"], values: { primary: "#c0533a", accent: "#ffd6a0", dark: "#1a1a1a", bg: "#f5efe8", text: "#5a4a44" } },
    { name: "Ink", swatch: ["#eeeef2", "#222244"], values: { primary: "#222244", accent: "#a8b4ff", dark: "#111111", bg: "#eeeef2", text: "#555566" } },
    { name: "Sienna", swatch: ["#f4efe6", "#9a5b2f"], values: { primary: "#9a5b2f", accent: "#ffe4a3", dark: "#1a1a1a", bg: "#f4efe6", text: "#5a4a3c" } },
  ],
};

function highlightText(s: string) {
  return esc(s).replace(/\*(.+?)\*/g, "<mark>$1</mark>");
}

function render(c: Content, options: Parameters<EditableTemplate["render"]>[1] = {}) {
  const r = reader(c);
  const s = r.str;
  const d = defaults.values;
  const col = (key: string) => safeColor(s("theme", key), d.theme[key] as string);
  const pri = col("primary");
  const accent = col("accent");
  const dark = col("dark");
  const bg = col("bg");
  const textCol = col("text");
  const name = esc(s("brand", "name") || "Atelier Nord");
  const cta = esc(s("brand", "cta") || "Apply →");
  const img = (src: string, fallback = "") => safeUrl(src, fallback);

  const statsItems = r.list("stats", "items").slice(0, 4);
  const courses = r.list("courses", "items");
  const bannerDates = r.list("banner", "dates");
  const heroTitle = s("hero", "title").split("\n").map((l) => highlightText(l.trim())).join("<br>");

  const navLinks = [
    r.on("courses") ? `<li><a href="#courses">Courses</a></li>` : "",
  ].filter(Boolean).join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${esc(s("seo", "title") || s("brand", "name"))}</title>
<meta name="description" content="${esc(s("seo", "description"))}">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500&display=swap" rel="stylesheet">
${previewScript(options?.preview)}
${revealScript}
<style>
:root{--pri:${pri};--acc:${accent};--dark:${dark};--bg:${bg};--text:${textCol}}
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:var(--bg);color:var(--dark);overflow-x:hidden}a{text-decoration:none;color:inherit}
:focus-visible{outline:2px solid var(--pri);outline-offset:3px}
${revealCss}
nav{display:flex;align-items:center;justify-content:space-between;padding:1.4rem 4%;border-bottom:2px solid var(--dark);background:var(--bg);position:sticky;top:0;z-index:20}
.logo{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:1.15rem;letter-spacing:-.03em;display:flex;align-items:center;gap:.5rem}
.logo i{width:24px;height:24px;background:var(--pri);border-radius:50%;font-style:normal;display:inline-block}
nav ul{list-style:none;display:flex;gap:2rem;font-size:.78rem;font-weight:500}nav ul a:hover{color:var(--pri)}
.nav-btn{background:var(--acc);border:2px solid var(--dark);padding:.65rem 1.3rem;font-family:'Space Grotesk',sans-serif;font-size:.76rem;font-weight:700;border-radius:50px;transition:.2s;box-shadow:3px 3px 0 var(--dark)}
.nav-btn:hover{transform:translate(2px,2px);box-shadow:1px 1px 0 var(--dark)}
.hero{position:relative;min-height:70vh;display:flex;align-items:center;border-bottom:2px solid var(--dark);overflow:hidden}
.hero-bg{position:absolute;inset:0;z-index:0}.hero-bg img{width:100%;height:100%;object-fit:cover}
.hero-bg::after{content:'';position:absolute;inset:0;background:linear-gradient(135deg,var(--bg) 35%,color-mix(in srgb,var(--bg) 80%,transparent) 55%,color-mix(in srgb,var(--bg) 27%,transparent) 100%)}
.stripes{position:absolute;right:-4%;top:-10%;width:38%;height:130%;background:repeating-linear-gradient(45deg,var(--pri) 0 26px,color-mix(in srgb,var(--bg) 90%,var(--dark)) 26px 52px);opacity:.12;transform:rotate(6deg);pointer-events:none;z-index:1}
.hero .inner{position:relative;max-width:1200px;z-index:2;padding:4.5rem 4% 4rem}
.tag{display:inline-block;background:var(--pri);color:#fff;font-family:'Space Grotesk',sans-serif;font-size:.62rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;padding:.4rem .8rem;border-radius:50px;margin-bottom:1.4rem}
h1{font-family:'Space Grotesk',sans-serif;font-size:6.4rem;line-height:.92;letter-spacing:-.05em;font-weight:700;max-width:1000px;margin-bottom:1.6rem}
h1 mark{background:none;color:var(--pri);position:relative}h1 mark::after{content:'';position:absolute;left:0;right:0;bottom:.06em;height:.14em;background:var(--acc);z-index:-1}
.hero .lower{display:grid;grid-template-columns:1.1fr .9fr;gap:3rem;align-items:end;border-top:2px solid var(--dark);padding-top:1.6rem}
.hero p{font-size:.94rem;line-height:1.8;color:var(--text);max-width:460px}.actions{display:flex;gap:.9rem;flex-wrap:wrap;align-items:center;justify-content:flex-end}
.btn{background:var(--dark);color:var(--bg);padding:1rem 1.9rem;border-radius:50px;font-family:'Space Grotesk',sans-serif;font-size:.78rem;font-weight:700;transition:.2s}.btn:hover{background:var(--pri)}
.link{font-family:'Space Grotesk',sans-serif;font-size:.78rem;font-weight:700;border-bottom:2px solid var(--dark);padding-bottom:2px}
.stats{display:grid;grid-template-columns:repeat(var(--n,4),1fr);border-bottom:2px solid var(--dark)}.stats div{padding:1.8rem 4%;border-right:2px solid var(--dark)}.stats div:last-child{border:none}
.stats b{display:block;font-family:'Space Grotesk',sans-serif;font-size:1.7rem;letter-spacing:-.03em}.stats span{font-size:.68rem;color:#5a5a5a}
.section{max-width:1250px;margin:0 auto;padding:4.5rem 4%}.head{display:flex;justify-content:space-between;align-items:end;gap:2rem;margin-bottom:2rem;flex-wrap:wrap}
.head h2{font-family:'Space Grotesk',sans-serif;font-size:2.6rem;letter-spacing:-.04em}
.head a{font-size:.74rem;font-weight:600;border-bottom:2px solid var(--pri);color:var(--pri);padding-bottom:2px}.courses{border-top:2px solid var(--dark)}
.course{display:grid;grid-template-columns:90px 1.4fr 1fr 120px;gap:1.5rem;align-items:center;padding:1.5rem 0;border-bottom:1px solid color-mix(in srgb,var(--bg) 60%,var(--dark));transition:.2s}
.course:hover{background:#fff;padding-left:1rem;padding-right:1rem}.course .code{font-family:'Space Grotesk',sans-serif;font-size:.74rem;font-weight:700;color:var(--pri)}
.course h3{font-family:'Space Grotesk',sans-serif;font-size:1.15rem;font-weight:600;letter-spacing:-.01em}.course p{font-size:.8rem;color:var(--text);line-height:1.55}
.course .term{font-size:.68rem;font-weight:600;text-align:right;color:#5a5a5a}
.arrow{width:34px;height:34px;border:2px solid var(--dark);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.85rem;justify-self:end;transition:.2s}
.course:hover .arrow{background:var(--acc)}.banner{background:var(--pri);color:var(--bg);padding:4rem 4%;display:grid;grid-template-columns:1.2fr .8fr;gap:3rem;align-items:center}
.banner h2{font-family:'Space Grotesk',sans-serif;font-size:3rem;line-height:1.02;letter-spacing:-.04em;margin-bottom:.8rem}.banner h2 em{font-style:normal;color:var(--acc)}
.banner p{color:color-mix(in srgb,var(--bg) 75%,transparent);line-height:1.8;font-size:.9rem;max-width:480px}
.banner .card{background:var(--bg);color:var(--dark);border:2px solid var(--dark);border-radius:20px;padding:1.8rem;box-shadow:8px 8px 0 var(--dark)}
.banner .card h4{font-family:'Space Grotesk',sans-serif;font-size:.9rem;margin-bottom:1rem}
.banner .card div{display:flex;justify-content:space-between;font-size:.78rem;padding:.6rem 0;border-bottom:1px solid color-mix(in srgb,var(--bg) 85%,var(--dark))}
.banner .card div:last-of-type{border:none}.banner .card b{font-weight:600}.banner .card small{display:block;margin-top:1rem;font-size:.66rem;color:#666}
footer{display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap;padding:1.8rem 4%;font-size:.68rem;color:#666;border-top:2px solid var(--dark)}
@media(max-width:1000px){h1{font-size:4.6rem}.hero .lower{grid-template-columns:1fr;align-items:start}.actions{justify-content:flex-start}.course{grid-template-columns:70px 1fr 90px}.course p{display:none}.banner{grid-template-columns:1fr}}
@media(max-width:700px){nav ul{display:none}h1{font-size:3.2rem}.stats{grid-template-columns:1fr 1fr}.stats div:nth-child(2){border-right:none}.stats div:nth-child(-n+2){border-bottom:2px solid var(--dark)}.course{grid-template-columns:1fr 40px;gap:.5rem}.course .code{grid-column:1/-1;margin-bottom:-.3rem}.course .term{display:none}.banner h2{font-size:2.2rem}.head h2{font-size:2rem}}
</style>
</head>
<body>
<nav>
<a href="#top" class="logo"><i></i>${name}</a>
<ul>${navLinks}<li><a href="#">Studios</a></li><li><a href="#">Admissions</a></li></ul>
<a href="#" class="nav-btn">${cta}</a>
</nav>

<section class="hero rv" id="top">
<div class="hero-bg">${img(s("hero", "bgImage"), d.hero.bgImage as string) ? `<img src="${img(s("hero", "bgImage"), d.hero.bgImage as string)}" alt="Design studio workspace">` : ""}</div>
<div class="stripes"></div>
<div class="inner">
${s("hero", "tag") ? `<span class="tag">${esc(s("hero", "tag"))}</span>` : ""}
<h1>${heroTitle}</h1>
<div class="lower">
<p>${esc(s("hero", "subtitle"))}</p>
<div class="actions">
${s("hero", "btnPrimary") ? `<a href="#courses" class="btn">${esc(s("hero", "btnPrimary"))}</a>` : ""}
${s("hero", "btnSecondary") ? `<a href="#" class="link">${esc(s("hero", "btnSecondary"))}</a>` : ""}
</div>
</div>
</div>
</section>

${r.on("stats") && statsItems.length ? `<div class="stats rv" style="--n:${statsItems.length}">${statsItems.map((st) => `<div><b>${esc(st.value)}</b><span>${esc(st.label)}</span></div>`).join("")}</div>` : ""}

${r.on("courses") && courses.length ? `<section class="section" id="courses">
<div class="head rv"><h2>${esc(s("courses", "title"))}</h2>${s("courses", "link") ? `<a href="#">${esc(s("courses", "link"))}</a>` : ""}</div>
<div class="courses">${courses.map((cr, i) => `<div class="course rv${i % 2 ? " d1" : ""}"><span class="code">${esc(cr.code)}</span><h3>${esc(cr.name)}</h3><p>${esc(cr.desc)}</p><span class="term">${esc(cr.term)}</span><span class="arrow">→</span></div>`).join("")}</div>
</section>` : ""}

${r.on("banner") ? `<section class="banner rv">
<div>
<h2>${s("banner", "title").split("\n").map((l) => l.trim().replace(/\*(.+?)\*/g, "<em>$1</em>")).map(esc).join("<br>").replace(/&lt;em&gt;/g, "<em>").replace(/&lt;\/em&gt;/g, "</em>")}</h2>
<p>${esc(s("banner", "text"))}</p>
</div>
<div class="card">
<h4>${esc(s("banner", "cardTitle"))}</h4>
${bannerDates.map((dt) => `<div><span>${esc(dt.label)}</span><b>${esc(dt.date)}</b></div>`).join("")}
${s("banner", "cardNote") ? `<small>${esc(s("banner", "cardNote"))}</small>` : ""}
</div>
</section>` : ""}

<footer>
<span>${esc(s("footer", "copyright"))}</span>
<span>${esc(s("footer", "address"))}</span>
<span>${esc(s("footer", "email"))}</span>
</footer>
</body>
</html>`;
}

export const premiumAtelierNord: EditableTemplate = {
  id: "premium-atelier-nord",
  name: "Atelier Nord",
  schema,
  defaults,
  presets,
  render,
  checks: (c) => {
    const r = reader(c);
    const out: { section: string; message: string }[] = [];
    if (!r.str("seo", "description").trim())
      out.push({ section: "seo", message: "Add a search description so your page looks good on Google." });
    if (r.on("courses") && r.list("courses", "items").length === 0)
      out.push({ section: "courses", message: "Add at least one course to the catalogue." });
    return out;
  },
};
