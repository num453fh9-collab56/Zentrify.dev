import type { Content, EditableTemplate, Section } from "../editor/types";
import { esc, previewScript, reader, revealCss, revealScript, safeColor, safeUrl } from "../editor/html";

const U = (id: string, size: string) => `https://images.unsplash.com/${id}?${size}&fit=crop&auto=format&q=80`;

const schema: Section[] = [
  {
    id: "brand",
    label: "Brand",
    description: "Clinic name, logo icon and navigation CTA.",
    fields: [
      { type: "text", key: "name", label: "Clinic name" },
      { type: "text", key: "icon", label: "Logo icon (emoji)", hint: "Shown in the round logo mark." },
      { type: "text", key: "cta", label: "Nav button text" },
    ],
  },
  {
    id: "theme",
    label: "Colors",
    fields: [
      { type: "color", key: "bg", label: "Page background" },
      { type: "color", key: "dark", label: "Dark / heading" },
      { type: "color", key: "accent", label: "Accent (CTA)" },
      { type: "color", key: "mint", label: "Mint / success" },
      { type: "color", key: "muted", label: "Muted text" },
    ],
  },
  {
    id: "hero",
    label: "Hero",
    anchor: "top",
    fields: [
      { type: "text", key: "pill", label: "Badge text" },
      { type: "textarea", key: "title", label: "Headline", rows: 2, hint: "Wrap a word in *stars* to highlight it." },
      { type: "textarea", key: "text", label: "Description", rows: 3 },
      { type: "text", key: "btnPrimary", label: "Primary button" },
      { type: "text", key: "btnSecondary", label: "Secondary link" },
      { type: "image", key: "image", label: "Hero photo" },
    ],
  },
  {
    id: "appointment",
    label: "Appointment card",
    toggleable: true,
    anchor: "top",
    fields: [
      { type: "text", key: "heading", label: "Heading" },
      { type: "text", key: "badge", label: "Badge", hint: "E.g. 'Today'" },
      { type: "text", key: "slots", label: "Time slots", hint: "Comma-separated. First slot with a * is highlighted." },
      { type: "text", key: "button", label: "Button text" },
    ],
  },
  {
    id: "stats",
    label: "Stats strip",
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
        newItem: { value: "10+", label: "Your stat" },
        fields: [
          { type: "text", key: "value", label: "Number" },
          { type: "text", key: "label", label: "Label" },
        ],
      },
    ],
  },
  {
    id: "services",
    label: "Services",
    toggleable: true,
    anchor: "care",
    fields: [
      { type: "text", key: "title", label: "Heading" },
      { type: "textarea", key: "subtitle", label: "Description", rows: 2 },
      {
        type: "list",
        key: "items",
        label: "Services",
        itemLabel: "Service",
        titleKey: "title",
        max: 6,
        newItem: { icon: "🩺", title: "New service", desc: "Describe this service.", link: "" },
        fields: [
          { type: "text", key: "icon", label: "Icon (emoji)" },
          { type: "text", key: "title", label: "Title" },
          { type: "textarea", key: "desc", label: "Description", rows: 2 },
          { type: "text", key: "link", label: "Link text", hint: "Leave empty to hide." },
        ],
      },
    ],
  },
  {
    id: "footer",
    label: "Footer",
    fields: [
      { type: "text", key: "text", label: "Footer text" },
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
  enabled: { appointment: true, stats: true, services: true },
  values: {
    brand: { name: "Aster Health", icon: "✳", cta: "Book a visit" },
    theme: { bg: "#eef6f1", dark: "#123a31", accent: "#ff7a59", mint: "#3fbf8f", muted: "#5b776f" },
    hero: {
      pill: "Same-day appointments available",
      title: "Healthcare that feels like *care.*",
      text: "Primary care, diagnostics and wellbeing under one calm roof — with doctors who actually have time for you.",
      btnPrimary: "Book an appointment",
      btnSecondary: "Explore our care",
      image: U("photo-1622253692010-333f2da6031d", "w=800&h=1000"),
    },
    appointment: { heading: "Next available", badge: "Today", slots: "09:30, *11:00, 14:30", button: "Reserve 11:00 →" },
    stats: {
      items: [
        { value: "28", label: "Care specialists" },
        { value: "4.9", label: "Patient rating" },
        { value: "15min", label: "Avg. wait time" },
        { value: "3", label: "City locations" },
      ],
    },
    services: {
      title: "Everything your family needs, in one place.",
      subtitle: "From a quick check-up to ongoing care, our team stays with you.",
      items: [
        { icon: "🩺", title: "Primary Care", desc: "Annual checks, sick visits and preventive plans with your own doctor.", link: "Learn more →" },
        { icon: "🧪", title: "Diagnostics", desc: "On-site labs and imaging with results explained in plain language.", link: "Learn more →" },
        { icon: "🌿", title: "Wellbeing", desc: "Nutrition, sleep and mental-health support built into your care plan.", link: "Learn more →" },
      ],
    },
    footer: { text: "© 2026 Aster Health · Care with time to listen" },
    seo: { title: "Aster Health — Modern Clinic", description: "Primary care, diagnostics and wellbeing with doctors who have time for you." },
  },
};

const presets = {
  section: "theme",
  items: [
    { name: "Mint", swatch: ["#eef6f1", "#123a31"], values: { bg: "#eef6f1", dark: "#123a31", accent: "#ff7a59", mint: "#3fbf8f", muted: "#5b776f" } },
    { name: "Sky", swatch: ["#eef1f8", "#1a2b4d"], values: { bg: "#eef1f8", dark: "#1a2b4d", accent: "#4a90d9", mint: "#38b2ac", muted: "#5b6e84" } },
    { name: "Lavender", swatch: ["#f3eef8", "#2d1b4e"], values: { bg: "#f3eef8", dark: "#2d1b4e", accent: "#9b59b6", mint: "#8e44ad", muted: "#6e5b7b" } },
    { name: "Warm", swatch: ["#faf5ef", "#3b2516"], values: { bg: "#faf5ef", dark: "#3b2516", accent: "#e67e22", mint: "#d4a574", muted: "#7a6552" } },
  ],
};

function emphTitle(s: string) {
  return esc(s).replace(/\*(.+?)\*/g, '<span style="color:var(--accent)">$1</span>');
}

function parseSlots(s: string): { text: string; on: boolean }[] {
  return s.split(",").map((x) => x.trim()).filter(Boolean).map((x) => {
    const on = x.startsWith("*") && x.endsWith("*") || x.startsWith("*");
    return { text: x.replace(/\*/g, "").trim(), on };
  });
}

function render(c: Content, options: Parameters<EditableTemplate["render"]>[1] = {}) {
  const r = reader(c);
  const s = r.str;
  const d = defaults.values;
  const col = (key: string) => safeColor(s("theme", key), d.theme[key] as string);
  const name = s("brand", "name") || "Clinic";
  const icon = s("brand", "icon") || "✳";
  const cta = esc(s("brand", "cta") || "Book a visit");

  const statsItems = r.list("stats", "items").slice(0, 4);
  const services = r.list("services", "items");
  const slots = parseSlots(s("appointment", "slots"));
  const heroImg = safeUrl(s("hero", "image"), d.hero.image as string);

  const navLinks = [
    r.on("services") ? '<li><a href="#care">Care</a></li>' : "",
  ].filter(Boolean).join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${esc(s("seo", "title") || name)}</title>
<meta name="description" content="${esc(s("seo", "description"))}">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
${previewScript(options?.preview)}
${revealScript}
<style>
:root{--bg:${col("bg")};--dark:${col("dark")};--accent:${col("accent")};--mint:${col("mint")};--muted:${col("muted")}}
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Plus Jakarta Sans',sans-serif;background:var(--bg);color:var(--dark);overflow-x:hidden}a{text-decoration:none;color:inherit}
:focus-visible{outline:2px solid var(--accent);outline-offset:3px}
${revealCss}
nav{display:flex;align-items:center;justify-content:space-between;padding:1.4rem 5%;max-width:1280px;margin:0 auto}
.logo{display:flex;align-items:center;gap:.6rem;font-weight:800;font-size:1.2rem;letter-spacing:-.02em}
.logo i{width:34px;height:34px;border-radius:50%;background:var(--dark);color:#fff;display:flex;align-items:center;justify-content:center;font-style:normal;font-size:1rem}
nav ul{list-style:none;display:flex;gap:2rem;font-size:.86rem;font-weight:500;color:var(--muted)}nav ul a:hover{color:var(--dark)}
.nav-btn{background:var(--dark);color:#fff;padding:.8rem 1.6rem;border-radius:50px;font-size:.84rem;font-weight:700;transition:.25s}.nav-btn:hover{background:var(--accent)}
.hero{max-width:1280px;margin:0 auto;padding:3.5rem 5% 4.5rem;display:grid;grid-template-columns:1.05fr .95fr;gap:3.5rem;align-items:center}
.pill{display:inline-flex;align-items:center;gap:.5rem;background:#fff;border:1px solid color-mix(in srgb,var(--dark) 14%,transparent);border-radius:50px;padding:.45rem 1rem;font-size:.72rem;font-weight:700;color:var(--muted);margin-bottom:1.3rem}
.pill i{width:7px;height:7px;border-radius:50%;background:var(--mint);font-style:normal}
h1{font-size:3.9rem;line-height:1.04;letter-spacing:-.045em;font-weight:800;margin-bottom:1.3rem}
.hero p{color:var(--muted);line-height:1.8;max-width:460px;font-size:1rem;margin-bottom:2rem}
.actions{display:flex;gap:1rem;flex-wrap:wrap;align-items:center}
.btn{background:var(--accent);color:#fff;padding:1rem 2rem;border-radius:50px;font-size:.9rem;font-weight:700;box-shadow:0 10px 24px color-mix(in srgb,var(--accent) 30%,transparent);transition:.25s}
.btn:hover{transform:translateY(-2px);box-shadow:0 14px 30px color-mix(in srgb,var(--accent) 40%,transparent)}
.link{font-size:.88rem;font-weight:700;color:var(--dark);border-bottom:1.5px solid var(--dark);padding-bottom:2px}
.cardwrap{position:relative}
.photo{border-radius:150px 150px 28px 28px;overflow:hidden;height:470px}.photo img{width:100%;height:100%;object-fit:cover}
.appt{position:absolute;left:-24px;bottom:-26px;width:310px;background:#fff;border-radius:20px;padding:1.3rem;box-shadow:0 24px 50px color-mix(in srgb,var(--dark) 16%,transparent);border:1px solid color-mix(in srgb,var(--dark) 12%,transparent)}
.appt .hd{display:flex;justify-content:space-between;align-items:center;margin-bottom:.9rem}
.appt .hd b{font-size:.85rem}.appt .hd span{font-size:.66rem;font-weight:700;color:var(--mint);background:color-mix(in srgb,var(--mint) 12%,transparent);padding:.3rem .55rem;border-radius:50px}
.slot{display:flex;gap:.5rem;margin-bottom:.75rem}
.slot div{flex:1;border:1px solid color-mix(in srgb,var(--dark) 14%,transparent);border-radius:10px;padding:.5rem;text-align:center;font-size:.68rem;font-weight:700;color:var(--muted)}
.slot div.on{background:var(--dark);color:#fff;border-color:var(--dark)}
.appt button{width:100%;border:none;background:var(--accent);color:#fff;padding:.7rem;border-radius:10px;font-family:inherit;font-size:.78rem;font-weight:700;cursor:pointer}
.strip{max-width:1180px;margin:0 auto 4rem;background:var(--dark);border-radius:26px;padding:2.2rem 2.5rem;display:grid;grid-template-columns:repeat(var(--n,4),1fr);gap:1.5rem;color:#fff}
.strip div{text-align:center;border-right:1px solid rgba(255,255,255,.12)}.strip div:last-child{border:none}
.strip b{display:block;font-size:1.9rem;font-weight:800;letter-spacing:-.03em}.strip span{font-size:.72rem;color:rgba(255,255,255,.6)}
.section{max-width:1180px;margin:0 auto;padding:0 5% 5rem}
.head{display:flex;justify-content:space-between;align-items:end;gap:2rem;margin-bottom:2.2rem;flex-wrap:wrap}
.head h2{font-size:2.3rem;letter-spacing:-.035em;line-height:1.1;max-width:450px}.head p{color:var(--muted);font-size:.9rem;max-width:320px;line-height:1.7}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.2rem}
.svc{background:#fff;border:1px solid color-mix(in srgb,var(--dark) 12%,transparent);border-radius:20px;padding:1.8rem;transition:.3s}
.svc:hover{transform:translateY(-5px);box-shadow:0 18px 36px color-mix(in srgb,var(--dark) 8%,transparent)}
.svc .ic{width:48px;height:48px;border-radius:14px;background:var(--bg);display:flex;align-items:center;justify-content:center;font-size:1.25rem;margin-bottom:1rem}
.svc h3{font-size:1.05rem;margin-bottom:.45rem;letter-spacing:-.01em}.svc p{font-size:.83rem;color:var(--muted);line-height:1.7}
.svc a{display:inline-block;margin-top:1rem;font-size:.78rem;font-weight:700;color:var(--accent)}
footer{padding:2.5rem 5%;text-align:center;font-size:.76rem;color:var(--muted)}
@media(max-width:960px){.hero{grid-template-columns:1fr;gap:2.5rem}.photo{height:380px}.appt{position:relative;left:0;bottom:0;margin:-40px auto 0;width:min(340px,92%)}.strip{grid-template-columns:1fr 1fr}.strip div:nth-child(2){border:none}}
@media(max-width:640px){nav ul{display:none}h1{font-size:2.7rem}.grid{grid-template-columns:1fr}.strip{grid-template-columns:1fr}.strip div{border:none}.head h2{font-size:1.9rem}}
</style>
</head>
<body>
<nav id="top"><a href="#" class="logo"><i>${esc(icon)}</i>${esc(name)}</a><ul>${navLinks}</ul><a href="#book" class="nav-btn">${cta}</a></nav>

<section class="hero">
<div class="rv">
${s("hero", "pill") ? `<div class="pill"><i></i>${esc(s("hero", "pill"))}</div>` : ""}
<h1>${emphTitle(s("hero", "title"))}</h1>
<p>${esc(s("hero", "text"))}</p>
<div class="actions">
<a href="#book" class="btn">${esc(s("hero", "btnPrimary"))}</a>
${s("hero", "btnSecondary") ? `<a href="#care" class="link">${esc(s("hero", "btnSecondary"))}</a>` : ""}
</div>
</div>
<div class="cardwrap rv d1">
<div class="photo"><img src="${heroImg}" alt="${esc(name)}"></div>
${r.on("appointment") ? `<div class="appt">
<div class="hd"><b>${esc(s("appointment", "heading"))}</b><span>${esc(s("appointment", "badge"))}</span></div>
<div class="slot">${slots.map((sl) => `<div${sl.on ? ' class="on"' : ""}>${esc(sl.text)}</div>`).join("")}</div>
<button>${esc(s("appointment", "button"))}</button>
</div>` : ""}
</div>
</section>

${r.on("stats") && statsItems.length ? `<div class="strip rv" id="stats" style="--n:${statsItems.length}">${statsItems.map((st) => `<div><b>${esc(st.value)}</b><span>${esc(st.label)}</span></div>`).join("")}</div>` : ""}

${r.on("services") && services.length ? `<section class="section rv" id="care">
<div class="head"><h2>${esc(s("services", "title"))}</h2><p>${esc(s("services", "subtitle"))}</p></div>
<div class="grid">${services.map((svc, i) => `<div class="svc rv${i ? ` d${i}` : ""}">
<div class="ic">${esc(svc.icon)}</div>
<h3>${esc(svc.title)}</h3>
<p>${esc(svc.desc)}</p>
${svc.link ? `<a href="#">${esc(svc.link)}</a>` : ""}
</div>`).join("")}</div>
</section>` : ""}

<footer id="book">${esc(s("footer", "text"))}</footer>
</body></html>`;
}

export const premiumAsterHealth: EditableTemplate = {
  id: "premium-aster-health",
  name: "Aster Health — Modern Clinic",
  schema,
  defaults,
  presets,
  render,
  checks: (c) => {
    const r = reader(c);
    const out: { section: string; message: string }[] = [];
    if (!r.str("seo", "description").trim())
      out.push({ section: "seo", message: "Add a search description so your page looks good on Google." });
    return out;
  },
};
