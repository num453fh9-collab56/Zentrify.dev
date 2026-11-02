import type { Content, EditableTemplate, Section } from "../editor/types";
import { esc, previewScript, reader, revealCss, revealScript, safeColor } from "../editor/html";

const schema: Section[] = [
  {
    id: "brand",
    label: "Brand",
    fields: [
      { type: "text", key: "name", label: "Firm name" },
      { type: "text", key: "accent", label: "Accent character", hint: "Shown after the name in gold (e.g. '&')." },
      { type: "text", key: "suffix", label: "Suffix", hint: "After the accent, e.g. 'Co.'" },
      { type: "text", key: "cta", label: "Nav button" },
    ],
  },
  {
    id: "theme",
    label: "Colors",
    fields: [
      { type: "color", key: "bg", label: "Page background" },
      { type: "color", key: "dark", label: "Primary dark" },
      { type: "color", key: "gold", label: "Gold accent" },
      { type: "color", key: "muted", label: "Muted text" },
    ],
  },
  {
    id: "hero",
    label: "Hero",
    anchor: "top",
    fields: [
      { type: "text", key: "eyebrow", label: "Eyebrow line" },
      { type: "textarea", key: "title", label: "Headline", rows: 2, hint: "Wrap a word in *stars* to make it italic gold." },
      { type: "textarea", key: "text", label: "Description", rows: 3 },
      { type: "text", key: "btnPrimary", label: "Primary button" },
      { type: "text", key: "btnSecondary", label: "Secondary link" },
    ],
  },
  {
    id: "card",
    label: "Credit cards",
    toggleable: true,
    anchor: "top",
    fields: [
      { type: "text", key: "frontName", label: "Front card member name" },
      { type: "text", key: "frontNum", label: "Front card number" },
      { type: "text", key: "frontSince", label: "Front 'Since' year" },
      { type: "text", key: "frontTier", label: "Front tier label" },
      { type: "text", key: "backNum", label: "Back card number" },
    ],
  },
  {
    id: "metrics",
    label: "Metrics",
    toggleable: true,
    anchor: "metrics",
    fields: [
      {
        type: "list",
        key: "items",
        label: "Metrics",
        itemLabel: "Metric",
        titleKey: "label",
        min: 1,
        max: 4,
        newItem: { value: "100+", label: "Your metric" },
        fields: [
          { type: "text", key: "value", label: "Value" },
          { type: "text", key: "label", label: "Label" },
        ],
      },
    ],
  },
  {
    id: "features",
    label: "Features",
    toggleable: true,
    anchor: "how",
    fields: [
      { type: "textarea", key: "title", label: "Heading", rows: 2 },
      { type: "textarea", key: "lead", label: "Lead paragraph", rows: 3 },
      {
        type: "list",
        key: "items",
        label: "Features",
        itemLabel: "Feature",
        titleKey: "title",
        max: 5,
        newItem: { title: "New feature", desc: "Describe this feature." },
        fields: [
          { type: "text", key: "title", label: "Title" },
          { type: "textarea", key: "desc", label: "Description", rows: 2 },
        ],
      },
    ],
  },
  {
    id: "cta",
    label: "CTA",
    toggleable: true,
    fields: [
      { type: "text", key: "title", label: "Heading" },
      { type: "text", key: "text", label: "Subtext" },
      { type: "text", key: "button", label: "Button text" },
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
  enabled: { card: true, metrics: true, features: true, cta: true },
  values: {
    brand: { name: "Fern", accent: "&", suffix: "Co.", cta: "Open an account" },
    theme: { bg: "#f4f0e6", dark: "#0d3b2e", gold: "#b58a4a", muted: "#5b6d65" },
    hero: {
      eyebrow: "Private finance · Since 1994",
      title: "Wealth, kept\n*quietly* simple.",
      text: "Discreet planning, transparent fees and long-term thinking for families and founders. No noise, no jargon, no surprises.",
      btnPrimary: "Request an introduction",
      btnSecondary: "How we work",
    },
    card: {
      frontName: "A. MORGAN",
      frontNum: "5412 7719 0042 18",
      frontSince: "Since 2011",
      frontTier: "Reserve",
      backNum: "5412 8840 1290 66",
    },
    metrics: {
      items: [
        { value: "£2.4B", label: "Assets guided" },
        { value: "31", label: "Years of counsel" },
        { value: "0.6%", label: "Average annual fee" },
      ],
    },
    features: {
      title: "Built around your life, not a product.",
      lead: "One dedicated adviser, one clear plan, and a team of specialists behind them. We only succeed when your plan does.",
      items: [
        { title: "Clear, flat fees", desc: "No commissions, no hidden trailers. You always know what you pay and why." },
        { title: "Fiduciary by design", desc: "We are legally bound to act in your interest — never a provider's." },
        { title: "Long-term partnership", desc: "Plans built for decades, reviewed twice a year, adjusted as life changes." },
      ],
    },
    cta: { title: "A quieter way to grow.", text: "Introductions are personal. Tell us a little about what you're planning.", button: "Start a conversation" },
    footer: { text: "© 2026 Fern & Co. Private Finance · Authorised and regulated" },
    seo: { title: "Fern & Co. — Private Finance", description: "Discreet planning, transparent fees and long-term thinking for families and founders." },
  },
};

const presets = {
  section: "theme",
  items: [
    { name: "Forest", swatch: ["#f4f0e6", "#0d3b2e"], values: { bg: "#f4f0e6", dark: "#0d3b2e", gold: "#b58a4a", muted: "#5b6d65" } },
    { name: "Midnight", swatch: ["#eef0f4", "#1a1e3d"], values: { bg: "#eef0f4", dark: "#1a1e3d", gold: "#c9a04e", muted: "#5e6178" } },
    { name: "Onyx", swatch: ["#f5f3f0", "#1c1c1c"], values: { bg: "#f5f3f0", dark: "#1c1c1c", gold: "#b5944a", muted: "#6b6b6b" } },
    { name: "Wine", swatch: ["#f4eee8", "#3b1524"], values: { bg: "#f4eee8", dark: "#3b1524", gold: "#c4884a", muted: "#6d5260" } },
  ],
};

function emphTitle(s: string) {
  return esc(s).replace(/\*(.+?)\*/g, '<em style="color:var(--gold)">$1</em>');
}

function render(c: Content, options: Parameters<EditableTemplate["render"]>[1] = {}) {
  const r = reader(c);
  const s = r.str;
  const d = defaults.values;
  const col = (key: string) => safeColor(s("theme", key), d.theme[key] as string);
  const brandName = s("brand", "name") || "Fern";
  const brandAccent = s("brand", "accent") || "&";
  const brandSuffix = s("brand", "suffix") || "Co.";

  const metricsItems = r.list("metrics", "items").slice(0, 4);
  const features = r.list("features", "items");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${esc(s("seo", "title") || brandName)}</title>
<meta name="description" content="${esc(s("seo", "description"))}">
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
${previewScript(options?.preview)}
${revealScript}
<style>
:root{--bg:${col("bg")};--dark:${col("dark")};--gold:${col("gold")};--muted:${col("muted")}}
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:var(--bg);color:var(--dark);overflow-x:hidden}a{text-decoration:none;color:inherit}
${revealCss}
nav{display:flex;align-items:center;justify-content:space-between;padding:1.6rem 5%;max-width:1300px;margin:0 auto;border-bottom:1px solid color-mix(in srgb,var(--dark) 14%,transparent)}
.logo{font-family:'DM Serif Display',serif;font-size:1.6rem;letter-spacing:.02em}.logo span{color:var(--gold)}
nav ul{list-style:none;display:flex;gap:2.2rem;font-size:.82rem;font-weight:500;color:var(--muted)}nav ul a:hover{color:var(--dark)}
.nav-btn{border:1px solid var(--dark);padding:.65rem 1.4rem;border-radius:2px;font-size:.7rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;transition:.25s}.nav-btn:hover{background:var(--dark);color:var(--bg)}
.hero{max-width:1100px;margin:0 auto;padding:5rem 5% 3rem;text-align:center;position:relative}
.eyebrow{font-size:.68rem;font-weight:600;letter-spacing:.28em;text-transform:uppercase;color:var(--gold);margin-bottom:1.4rem}
h1{font-family:'DM Serif Display',serif;font-size:4.8rem;line-height:1.02;font-weight:400;letter-spacing:-.02em;margin-bottom:1.4rem}h1 em{font-style:italic;color:var(--gold)}
.hero p{color:var(--muted);line-height:1.85;max-width:540px;margin:0 auto 2.2rem;font-size:.98rem}.actions{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap}
.btn{background:var(--dark);color:var(--bg);padding:1rem 2.2rem;border-radius:2px;font-size:.72rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;transition:.25s}.btn:hover{background:var(--gold)}
.link{font-size:.72rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;border-bottom:1px solid var(--dark);padding-bottom:4px}
.cards{position:relative;max-width:740px;margin:4rem auto 0;height:270px}
.cc{position:absolute;width:360px;height:220px;border-radius:18px;padding:1.6rem;text-align:left;box-shadow:0 30px 60px color-mix(in srgb,var(--dark) 22%,transparent)}
.cc.back{left:calc(50% - 300px);top:20px;transform:rotate(-9deg);background:color-mix(in srgb,var(--gold) 40%,#e8dcc8);color:var(--dark)}
.cc.front{left:calc(50% - 60px);top:0;transform:rotate(7deg);background:linear-gradient(135deg,var(--dark),color-mix(in srgb,var(--dark) 70%,#2a5c4a));color:var(--bg)}
.cc .brand{font-family:'DM Serif Display',serif;font-size:1.1rem;letter-spacing:.04em}.cc .brand span{color:color-mix(in srgb,var(--gold) 60%,#e8dcc8)}
.cc .chip{width:38px;height:28px;border-radius:5px;background:linear-gradient(135deg,color-mix(in srgb,var(--gold) 40%,#e8dcc8),var(--gold));margin:2.2rem 0 1.6rem}
.cc .num{font-family:'Inter',sans-serif;font-size:.86rem;letter-spacing:.22em;opacity:.9}
.cc .row{display:flex;justify-content:space-between;align-items:end;margin-top:1.2rem;font-size:.58rem;letter-spacing:.12em;text-transform:uppercase;opacity:.7}
.cc .row b{font-size:.75rem;display:block;letter-spacing:.06em;margin-top:.25rem;opacity:1}
.metrics{display:grid;grid-template-columns:repeat(var(--n,3),1fr);max-width:1000px;margin:1rem auto 0;padding:2.5rem 5%;border-top:1px solid color-mix(in srgb,var(--dark) 14%,transparent);border-bottom:1px solid color-mix(in srgb,var(--dark) 14%,transparent);text-align:center}
.metrics b{display:block;font-family:'DM Serif Display',serif;font-size:2.4rem;font-weight:400}.metrics span{font-size:.68rem;letter-spacing:.16em;text-transform:uppercase;color:var(--muted)}
.section{max-width:1100px;margin:0 auto;padding:5rem 5%}.section .split{display:grid;grid-template-columns:.9fr 1.1fr;gap:4rem;align-items:start}
.section h2{font-family:'DM Serif Display',serif;font-size:2.8rem;font-weight:400;line-height:1.12}.section .lead{color:var(--muted);line-height:1.8;font-size:.92rem;margin-top:1rem}
.feats{display:grid;gap:0}.feat{display:grid;grid-template-columns:44px 1fr;gap:1rem;padding:1.4rem 0;border-bottom:1px solid color-mix(in srgb,var(--dark) 12%,transparent)}
.feat:first-child{padding-top:0}.feat .n{font-size:.7rem;font-weight:600;color:var(--gold);padding-top:.2rem}
.feat h3{font-size:1.02rem;font-weight:600;margin-bottom:.3rem}.feat p{font-size:.83rem;color:var(--muted);line-height:1.7}
.cta{background:var(--dark);color:var(--bg);padding:4.5rem 5%;text-align:center}.cta h2{font-family:'DM Serif Display',serif;font-size:2.9rem;font-weight:400;margin-bottom:.8rem}
.cta p{color:color-mix(in srgb,var(--bg) 65%,transparent);margin-bottom:1.9rem;font-size:.9rem}.cta .btn{background:var(--bg);color:var(--dark)}.cta .btn:hover{background:var(--gold);color:#fff}
footer{padding:2rem 5%;text-align:center;font-size:.7rem;color:var(--muted)}
@media(max-width:900px){.hero h1{font-size:3.5rem}.section .split{grid-template-columns:1fr;gap:2rem}.metrics{grid-template-columns:1fr;gap:1.5rem;text-align:left}.metrics div{border-bottom:1px solid color-mix(in srgb,var(--dark) 10%,transparent);padding-bottom:1rem}}
@media(max-width:640px){nav ul{display:none}.hero h1{font-size:2.7rem}.cards{transform:scale(.78);transform-origin:top center;height:210px;margin-top:2rem}.cc.front{left:calc(50% - 120px)}.cc.back{left:calc(50% - 240px)}}
</style>
</head>
<body>
<nav class="rv"><a href="#" class="logo">${esc(brandName)} <span>${esc(brandAccent)}</span> ${esc(brandSuffix)}</a><ul><li><a href="#">Private clients</a></li><li><a href="#">Business</a></li></ul><a href="#open" class="nav-btn">${esc(s("brand", "cta"))}</a></nav>

<section class="hero">
<div class="rv">
${s("hero", "eyebrow") ? `<div class="eyebrow">${esc(s("hero", "eyebrow"))}</div>` : ""}
<h1>${emphTitle(s("hero", "title"))}</h1>
<p>${esc(s("hero", "text"))}</p>
<div class="actions">
<a href="#open" class="btn">${esc(s("hero", "btnPrimary"))}</a>
${s("hero", "btnSecondary") ? `<a href="#how" class="link">${esc(s("hero", "btnSecondary"))}</a>` : ""}
</div>
</div>
${r.on("card") ? `<div class="cards rv d1">
<div class="cc back"><div class="brand">${esc(brandName)} ${esc(brandAccent)} ${esc(brandSuffix)}</div><div class="chip"></div><div class="num">${esc(s("card", "backNum"))}</div><div class="row"><span>Member<b>${esc(s("card", "frontSince"))}</b></span><span>Private<b>${esc(s("card", "frontTier"))}</b></span></div></div>
<div class="cc front"><div class="brand">${esc(brandName)} <span>${esc(brandAccent)}</span> ${esc(brandSuffix)}</div><div class="chip"></div><div class="num">${esc(s("card", "frontNum"))}</div><div class="row"><span>Member<b>${esc(s("card", "frontName"))}</b></span><span>Private<b>${esc(s("card", "frontTier"))}</b></span></div></div>
</div>` : ""}
</section>

${r.on("metrics") && metricsItems.length ? `<div class="metrics rv" id="metrics" style="--n:${metricsItems.length}">${metricsItems.map((m) => `<div><b>${esc(m.value)}</b><span>${esc(m.label)}</span></div>`).join("")}</div>` : ""}

${r.on("features") && features.length ? `<section class="section rv" id="how"><div class="split"><div><h2>${esc(s("features", "title"))}</h2><p class="lead">${esc(s("features", "lead"))}</p></div>
<div class="feats">${features.map((f, i) => `<div class="feat"><div class="n">0${i + 1}</div><div><h3>${esc(f.title)}</h3><p>${esc(f.desc)}</p></div></div>`).join("")}</div>
</div></section>` : ""}

${r.on("cta") ? `<section class="cta rv" id="open"><h2>${esc(s("cta", "title"))}</h2><p>${esc(s("cta", "text"))}</p><a href="#" class="btn">${esc(s("cta", "button"))}</a></section>` : ""}

<footer>${esc(s("footer", "text"))}</footer>
</body></html>`;
}

export const premiumFernFinance: EditableTemplate = {
  id: "premium-fern-finance",
  name: "Fern & Co. — Private Finance",
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
