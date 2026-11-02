import type { Content, EditableTemplate, Section } from "../editor/types";
import { esc, previewScript, reader, revealCss, revealScript, safeColor, safeUrl } from "../editor/html";


function gradientText(s: string) {
  return esc(s).replace(/\*(.+?)\*/g, '<span class="gradient">$1</span>');
}

function lines(s: string) {
  return s.split("\n").map((l) => l.trim()).filter(Boolean);
}

const schema: Section[] = [
  {
    id: "brand",
    label: "Brand",
    description: "Product name, logo accent and the main call-to-action.",
    fields: [
      { type: "text", key: "name", label: "Product name" },
      { type: "text", key: "logoAccent", label: "Logo accent", hint: "Character shown in the accent color (e.g. '.')." },
      { type: "text", key: "cta", label: "CTA button text" },
    ],
  },
  {
    id: "theme",
    label: "Colors",
    fields: [
      { type: "color", key: "primary", label: "Primary" },
      { type: "color", key: "secondary", label: "Secondary" },
      { type: "color", key: "light", label: "Page background" },
    ],
  },
  {
    id: "hero",
    label: "Hero",
    anchor: "top",
    fields: [
      { type: "text", key: "pill", label: "Badge text", placeholder: "Trusted by 3,000+ companies" },
      { type: "textarea", key: "title", label: "Headline", rows: 2, hint: "Wrap words in *stars* to show them in gradient." },
      { type: "textarea", key: "subtitle", label: "Subtitle", rows: 3 },
      { type: "text", key: "btnPrimary", label: "Primary button" },
      { type: "text", key: "btnSecondary", label: "Secondary button" },
    ],
  },
  {
    id: "dashboard",
    label: "Dashboard mockup",
    toggleable: true,
    anchor: "top",
    fields: [
      {
        type: "list",
        key: "cards",
        label: "Metric cards",
        itemLabel: "Card",
        titleKey: "label",
        min: 1,
        max: 4,
        newItem: { label: "Metric", value: "0", change: "↑ 0%" },
        fields: [
          { type: "text", key: "label", label: "Label" },
          { type: "text", key: "value", label: "Value" },
          { type: "text", key: "change", label: "Change text" },
        ],
      },
    ],
  },
  {
    id: "stats",
    label: "Stats",
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
        newItem: { value: "100+", label: "Your stat" },
        fields: [
          { type: "text", key: "value", label: "Number" },
          { type: "text", key: "label", label: "Label" },
        ],
      },
    ],
  },
  {
    id: "features",
    label: "Features",
    toggleable: true,
    anchor: "features",
    fields: [
      { type: "text", key: "eyebrow", label: "Badge" },
      { type: "text", key: "title", label: "Heading" },
      { type: "textarea", key: "subtitle", label: "Description", rows: 2 },
      {
        type: "list",
        key: "items",
        label: "Feature cards",
        itemLabel: "Feature",
        titleKey: "title",
        max: 9,
        newItem: { icon: "✨", title: "New feature", desc: "Describe this feature." },
        fields: [
          { type: "text", key: "icon", label: "Icon (emoji)" },
          { type: "text", key: "title", label: "Title" },
          { type: "textarea", key: "desc", label: "Description", rows: 2 },
        ],
      },
    ],
  },
  {
    id: "integrations",
    label: "Integrations",
    toggleable: true,
    anchor: "integrations",
    fields: [
      { type: "text", key: "eyebrow", label: "Badge" },
      { type: "text", key: "title", label: "Heading" },
      { type: "textarea", key: "subtitle", label: "Description", rows: 2 },
      {
        type: "list",
        key: "items",
        label: "Integration cards",
        itemLabel: "Integration",
        titleKey: "name",
        max: 12,
        newItem: { icon: "🔌", name: "Service" },
        fields: [
          { type: "text", key: "icon", label: "Icon (emoji)" },
          { type: "text", key: "name", label: "Name" },
        ],
      },
    ],
  },
  {
    id: "contact",
    label: "Contact",
    toggleable: true,
    anchor: "contact",
    fields: [
      { type: "text", key: "title", label: "Heading" },
      { type: "textarea", key: "text", label: "Description", rows: 2 },
      { type: "textarea", key: "address", label: "Address", rows: 2 },
      { type: "email", key: "email", label: "Email" },
      { type: "text", key: "phone", label: "Phone" },
      { type: "url", key: "twitter", label: "Twitter / X", placeholder: "https://x.com/…" },
      { type: "url", key: "linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/…" },
      { type: "url", key: "github", label: "GitHub", placeholder: "https://github.com/…" },
    ],
  },
  {
    id: "cta",
    label: "Call to action",
    toggleable: true,
    anchor: "cta-section",
    fields: [
      { type: "text", key: "title", label: "Heading" },
      { type: "textarea", key: "text", label: "Description", rows: 2 },
      { type: "text", key: "button", label: "Button text" },
    ],
  },
  {
    id: "footer",
    label: "Footer",
    fields: [
      { type: "text", key: "copyright", label: "Copyright text" },
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
  enabled: { dashboard: true, stats: true, features: true, integrations: true, contact: true, cta: true },
  values: {
    brand: { name: "Prism", logoAccent: ".", cta: "Get Started" },
    theme: { primary: "#6366f1", secondary: "#8b5cf6", light: "#f8f9fc" },
    hero: {
      pill: "✓ Trusted by 3,000+ companies",
      title: "Analytics that *actually make sense*",
      subtitle: "Stop drowning in data. Prism turns your metrics into clear, actionable insights — so you can make decisions with confidence.",
      btnPrimary: "Start Free Trial →",
      btnSecondary: "Book a Demo",
    },
    dashboard: {
      cards: [
        { label: "Revenue", value: "$128K", change: "↑ 24% this month" },
        { label: "Users", value: "45.2K", change: "↑ 12% growth" },
        { label: "Conversion", value: "3.8%", change: "↑ 0.4% vs avg" },
      ],
    },
    stats: {
      items: [
        { value: "3,000+", label: "Companies" },
        { value: "2B+", label: "Events Tracked" },
        { value: "99.9%", label: "Accuracy" },
        { value: "50ms", label: "Query Speed" },
      ],
    },
    features: {
      eyebrow: "Features",
      title: "Everything you need to understand your data",
      subtitle: "Powerful analytics tools designed for modern teams. Simple enough for founders, deep enough for data engineers.",
      items: [
        { icon: "📈", title: "Real-Time Dashboards", desc: "Live metrics that update every second. Custom dashboards built with drag-and-drop simplicity." },
        { icon: "🎯", title: "Funnel Analysis", desc: "See exactly where users drop off. Identify bottlenecks and optimize conversion paths effortlessly." },
        { icon: "🧪", title: "A/B Testing", desc: "Run experiments with statistical rigor. Get results faster with Bayesian analysis and auto-stopping." },
        { icon: "🔍", title: "User Journeys", desc: "Replay user sessions, track behavior flows, and understand exactly how people use your product." },
        { icon: "🤖", title: "AI Insights", desc: "Get automated anomaly detection and AI-generated summaries of what matters in your data." },
        { icon: "🔔", title: "Smart Alerts", desc: "Custom alerts based on any metric. Get notified via Slack, email, or webhook when something changes." },
      ],
    },
    integrations: {
      eyebrow: "Integrations",
      title: "Works with your stack",
      subtitle: "One-click integrations with the tools you already use.",
      items: [
        { icon: "⚛️", name: "React" },
        { icon: "🔺", name: "Next.js" },
        { icon: "💚", name: "Node.js" },
        { icon: "🐍", name: "Python" },
        { icon: "💬", name: "Slack" },
        { icon: "📊", name: "BigQuery" },
      ],
    },
    contact: {
      title: "Get in touch",
      text: "Have questions about our platform? Our team is here to help you find the right solution for your needs.",
      address: "548 Market St, Suite 100\nSan Francisco, CA 94104",
      email: "hello@prism.com",
      phone: "+1 (415) 555-0120",
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
    cta: { title: "Ready to see clearly?", text: "Start your free 14-day trial. No credit card required. Cancel anytime.", button: "Start Free Trial →" },
    footer: { copyright: "© 2026 Prism Analytics · Privacy · Terms · Status" },
    seo: {
      title: "Prism — Analytics That Actually Make Sense",
      description: "Turn your metrics into clear, actionable insights. Real-time dashboards, funnel analysis, A/B testing and AI insights.",
    },
  },
};

const presets = {
  section: "theme",
  items: [
    { name: "Indigo", swatch: ["#f8f9fc", "#6366f1"], values: { primary: "#6366f1", secondary: "#8b5cf6", light: "#f8f9fc" } },
    { name: "Blue", swatch: ["#f6f9fd", "#3b82f6"], values: { primary: "#3b82f6", secondary: "#2563eb", light: "#f6f9fd" } },
    { name: "Emerald", swatch: ["#f5faf7", "#10b981"], values: { primary: "#10b981", secondary: "#059669", light: "#f5faf7" } },
    { name: "Rose", swatch: ["#fdf5f7", "#f43f5e"], values: { primary: "#f43f5e", secondary: "#e11d48", light: "#fdf5f7" } },
    { name: "Orange", swatch: ["#fdf8f3", "#f97316"], values: { primary: "#f97316", secondary: "#ea580c", light: "#fdf8f3" } },
    { name: "Violet", swatch: ["#f9f5fd", "#8b5cf6"], values: { primary: "#8b5cf6", secondary: "#7c3aed", light: "#f9f5fd" } },
  ],
};

function render(c: Content, options: Parameters<EditableTemplate["render"]>[1] = {}) {
  const r = reader(c);
  const s = r.str;
  const d = defaults.values;
  const col = (key: string) => safeColor(s("theme", key), d.theme[key] as string);
  const primary = col("primary");
  const secondary = col("secondary");
  const light = col("light");
  const name = s("brand", "name") || "Prism";
  const logoAccent = s("brand", "logoAccent");
  const cta = esc(s("brand", "cta") || "Get Started");

  const navLinks = [
    ["features", "Features"],
    ["integrations", "Integrations"],
  ].filter(([id]) => r.on(id)).map(([id, label]) => `<a href="#${id}">${label}</a>`).join("");

  const dashCards = r.list("dashboard", "cards").slice(0, 4);
  const statsItems = r.list("stats", "items").slice(0, 4);
  const features = r.list("features", "items");
  const integrations = r.list("integrations", "items");
  const socials = [
    ["Twitter", s("contact", "twitter"), "𝕏"],
    ["LinkedIn", s("contact", "linkedin"), "in"],
    ["GitHub", s("contact", "github"), "GH"],
  ].filter(([, url]) => url.trim());
  const addressLines = lines(s("contact", "address"));

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
:root{--pri:${primary};--sec:${secondary};--light:${light}}
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Plus Jakarta Sans',sans-serif;background:var(--light);color:#1a1a2e;overflow-x:hidden}
a{text-decoration:none;color:inherit}
:focus-visible{outline:2px solid var(--pri);outline-offset:3px}
${revealCss}
nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:1rem 5%;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.85);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom:1px solid rgba(0,0,0,.04)}
.logo{font-size:1.3rem;font-weight:800;color:#1a1a2e}.logo span{color:var(--pri)}
nav ul{list-style:none;display:flex;gap:2rem}
nav ul a{font-size:.85rem;font-weight:500;color:#666;transition:.3s}nav ul a:hover{color:var(--pri)}
.nav-cta{background:var(--pri);color:#fff;padding:.6rem 1.5rem;border-radius:10px;font-weight:600;font-size:.85rem;border:none;cursor:pointer;transition:.3s}
.nav-cta:hover{box-shadow:0 8px 25px color-mix(in srgb,var(--pri) 25%,transparent);transform:translateY(-1px)}
.hero{min-height:100vh;min-height:100svh;display:flex;align-items:center;padding:8rem 5% 4rem;background:linear-gradient(180deg,#fff,var(--light))}
.hero-inner{max-width:1100px;margin:0 auto;text-align:center;width:100%}
.hero-pill{display:inline-flex;align-items:center;gap:.5rem;background:#fff;border:1px solid rgba(0,0,0,.08);padding:.45rem 1.2rem;border-radius:50px;font-size:.78rem;font-weight:600;color:var(--pri);margin-bottom:2rem;box-shadow:0 2px 10px rgba(0,0,0,.04)}
.hero h1{font-size:clamp(2.5rem,5vw,4rem);font-weight:800;line-height:1.1;color:#1a1a2e;margin-bottom:1.5rem;letter-spacing:-1.5px}
.hero h1 .gradient{background:linear-gradient(135deg,var(--pri),var(--sec));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero .sub{font-size:1.1rem;line-height:1.8;color:#666;max-width:580px;margin:0 auto 2.5rem}
.hero-btns{display:flex;gap:1rem;justify-content:center;margin-bottom:4rem}
.btn-solid{background:var(--pri);color:#fff;padding:1rem 2.5rem;border-radius:14px;font-weight:700;font-size:.95rem;border:none;cursor:pointer;transition:.3s;display:inline-flex;align-items:center;gap:.5rem}
.btn-solid:hover{box-shadow:0 15px 40px color-mix(in srgb,var(--pri) 22%,transparent);transform:translateY(-3px)}
.btn-light{background:#fff;color:#1a1a2e;padding:1rem 2.5rem;border-radius:14px;font-weight:600;font-size:.95rem;border:1px solid rgba(0,0,0,.1);cursor:pointer;transition:.3s}
.btn-light:hover{border-color:var(--pri);color:var(--pri);transform:translateY(-2px)}
.hero-dash{max-width:960px;margin:0 auto;background:#fff;border-radius:20px;border:1px solid rgba(0,0,0,.06);overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.08),0 0 0 1px rgba(0,0,0,.02);transform:perspective(1200px) rotateX(4deg);transition:transform .5s}
.hero-dash:hover{transform:perspective(1200px) rotateX(0)}
.hd-bar{padding:.7rem 1.2rem;background:#fafafa;border-bottom:1px solid rgba(0,0,0,.05);display:flex;align-items:center;gap:.5rem}
.hd-dot{width:10px;height:10px;border-radius:50%;background:#e0e0e0}.hd-dot:nth-child(1){background:#ff5f57}.hd-dot:nth-child(2){background:#febc2e}.hd-dot:nth-child(3){background:#28c840}
.hd-body{padding:2rem;display:grid;grid-template-columns:repeat(var(--cols,3),1fr);gap:1rem}
.hd-card{background:var(--light);border-radius:14px;padding:1.5rem;border:1px solid rgba(0,0,0,.04)}
.hd-card .lbl{font-size:.7rem;color:#999;text-transform:uppercase;letter-spacing:.5px;margin-bottom:.5rem}
.hd-card .val{font-size:1.6rem;font-weight:800;color:#1a1a2e}.hd-card .ch{font-size:.75rem;color:var(--pri);font-weight:600;margin-top:.2rem}
.hd-chart{grid-column:1/-1;height:100px;background:#fafafa;border-radius:14px;border:1px solid rgba(0,0,0,.04);overflow:hidden}.hd-chart svg{width:100%;height:100%}
.stats-section{padding:5rem 5%;background:#fff;border-top:1px solid rgba(0,0,0,.04);border-bottom:1px solid rgba(0,0,0,.04)}
.stats-grid{max-width:900px;margin:0 auto;display:grid;grid-template-columns:repeat(var(--n,4),1fr);gap:2rem;text-align:center}
.stat .num{font-size:2.8rem;font-weight:900;color:var(--pri)}.stat .lbl{font-size:.8rem;color:#999;margin-top:.3rem}
.features-section{padding:7rem 5%;max-width:1100px;margin:0 auto}
.sect-badge{display:inline-block;background:color-mix(in srgb,var(--pri) 8%,transparent);color:var(--pri);padding:.4rem 1rem;border-radius:50px;font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:1rem}
.sect-title{font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:800;color:#1a1a2e;margin-bottom:.5rem;letter-spacing:-.5px}
.sect-sub{color:#888;font-size:1rem;margin-bottom:3.5rem;max-width:480px}
.feat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem}
.feat{background:#fff;border:1px solid rgba(0,0,0,.05);border-radius:18px;padding:2rem;transition:.4s;cursor:default}
.feat:hover{transform:translateY(-6px);box-shadow:0 20px 50px rgba(0,0,0,.06);border-color:color-mix(in srgb,var(--pri) 14%,transparent)}
.feat-icon{width:50px;height:50px;border-radius:14px;background:linear-gradient(135deg,color-mix(in srgb,var(--pri) 10%,transparent),color-mix(in srgb,var(--sec) 6%,transparent));display:flex;align-items:center;justify-content:center;margin-bottom:1.2rem;font-size:1.2rem}
.feat h3{font-size:1.05rem;font-weight:700;color:#1a1a2e;margin-bottom:.5rem}.feat p{font-size:.85rem;line-height:1.7;color:#888}
.int-section{padding:7rem 5%;text-align:center;max-width:1100px;margin:0 auto}
.int-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:1rem;margin-top:3rem}
.int-card{background:#fff;border:1px solid rgba(0,0,0,.05);border-radius:14px;padding:1.5rem 1rem;transition:.3s;display:flex;flex-direction:column;align-items:center;gap:.5rem}
.int-card:hover{border-color:color-mix(in srgb,var(--pri) 14%,transparent);transform:translateY(-3px);box-shadow:0 10px 30px rgba(0,0,0,.04)}
.int-card .ic{font-size:1.8rem}.int-card span{font-size:.75rem;font-weight:600;color:#666}
.contact-section{padding:7rem 5%;background:#fff;border-top:1px solid rgba(0,0,0,.04)}
.contact-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:start}
.contact-info h2{font-size:2rem;font-weight:800;color:#1a1a2e;margin-bottom:1rem;letter-spacing:-.5px}
.contact-info>p{color:#888;margin-bottom:2rem;line-height:1.7}
.contact-detail{display:flex;align-items:flex-start;gap:1rem;margin-bottom:1.5rem}
.contact-detail .cd-icon{width:44px;height:44px;border-radius:12px;background:color-mix(in srgb,var(--pri) 8%,transparent);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:1.1rem}
.contact-detail .cd-text .cd-label{font-size:.7rem;color:#999;text-transform:uppercase;letter-spacing:1px;margin-bottom:.2rem}
.contact-detail .cd-text .cd-value{font-size:.9rem;color:#1a1a2e;font-weight:500}
.contact-form{background:var(--light);border:1px solid rgba(0,0,0,.06);border-radius:20px;padding:2.5rem}
.contact-form h3{font-size:1.2rem;font-weight:700;color:#1a1a2e;margin-bottom:1.5rem}
.cf-row{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem}
.cf-input{background:#fff;border:1px solid rgba(0,0,0,.1);border-radius:12px;padding:.85rem 1rem;color:#1a1a2e;font-size:.88rem;font-family:inherit;outline:none;width:100%;transition:.3s}
.cf-input:focus{border-color:var(--pri)}.cf-input::placeholder{color:#bbb}
textarea.cf-input{min-height:120px;resize:vertical;margin-bottom:1rem}
.cf-btn{width:100%;background:var(--pri);color:#fff;padding:1rem;border-radius:12px;font-weight:700;font-size:.95rem;border:none;cursor:pointer;transition:.3s}
.cf-btn:hover{box-shadow:0 15px 40px color-mix(in srgb,var(--pri) 22%,transparent);transform:translateY(-2px)}
.social-row{display:flex;gap:1rem;margin-top:2rem}
.social-row a{width:42px;height:42px;border-radius:12px;background:color-mix(in srgb,var(--pri) 6%,transparent);border:1px solid rgba(0,0,0,.06);display:flex;align-items:center;justify-content:center;transition:.3s;font-size:.9rem;color:#666}
.social-row a:hover{background:color-mix(in srgb,var(--pri) 12%,transparent);border-color:color-mix(in srgb,var(--pri) 20%,transparent);color:var(--pri)}
.cta-section{padding:7rem 5%}
.cta-box{max-width:800px;margin:0 auto;background:linear-gradient(135deg,var(--pri),var(--sec));border-radius:24px;padding:4rem 3rem;text-align:center;position:relative;overflow:hidden}
.cta-box::before{content:'';position:absolute;top:-50%;right:-20%;width:400px;height:400px;background:rgba(255,255,255,.1);border-radius:50%;filter:blur(60px)}
.cta-box>*{position:relative}
.cta-box h2{font-size:2.5rem;font-weight:800;color:#fff;margin-bottom:1rem;letter-spacing:-.5px}
.cta-box p{color:rgba(255,255,255,.75);margin-bottom:2rem;max-width:400px;margin-left:auto;margin-right:auto}
.btn-white{background:#fff;color:var(--pri);padding:1rem 2.5rem;border-radius:14px;font-weight:700;font-size:.95rem;border:none;cursor:pointer;transition:.3s}
.btn-white:hover{transform:translateY(-2px);box-shadow:0 15px 40px rgba(0,0,0,.15)}
footer{padding:3rem 5%;text-align:center;font-size:.8rem;color:#bbb}
@media(max-width:768px){nav ul{display:none}.hero h1{font-size:2.5rem}.hd-body{grid-template-columns:1fr}.feat-grid{grid-template-columns:1fr}.stats-grid{grid-template-columns:repeat(2,1fr)}.int-grid{grid-template-columns:repeat(3,1fr)}.contact-inner{grid-template-columns:1fr}.cf-row{grid-template-columns:1fr}}
</style>
</head>
<body>
<nav id="nav">
<div class="logo">${esc(name)}${logoAccent ? `<span>${esc(logoAccent)}</span>` : ""}</div>
<ul>${navLinks}${r.on("contact") ? '<a href="#contact">Contact</a>' : ""}</ul>
<a href="#" class="nav-cta">${cta}</a>
</nav>

<section class="hero" id="top">
<div class="hero-inner">
${s("hero", "pill") ? `<div class="hero-pill rv">${esc(s("hero", "pill"))}</div>` : ""}
<h1 class="rv d1">${gradientText(s("hero", "title"))}</h1>
<p class="sub rv d2">${esc(s("hero", "subtitle"))}</p>
<div class="hero-btns rv d3">
<button class="btn-solid">${esc(s("hero", "btnPrimary"))}</button>
${s("hero", "btnSecondary") ? `<button class="btn-light">${esc(s("hero", "btnSecondary"))}</button>` : ""}
</div>

${r.on("dashboard") && dashCards.length ? `<div class="hero-dash rv">
<div class="hd-bar"><span class="hd-dot"></span><span class="hd-dot"></span><span class="hd-dot"></span></div>
<div class="hd-body" style="--cols:${dashCards.length}">${dashCards.map((card) => `<div class="hd-card"><div class="lbl">${esc(card.label)}</div><div class="val">${esc(card.value)}</div><div class="ch">${esc(card.change)}</div></div>`).join("")}
<div class="hd-chart"><svg viewBox="0 0 800 100" preserveAspectRatio="none"><defs><linearGradient id="pg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="var(--pri)" stop-opacity=".15"/><stop offset="100%" stop-color="var(--pri)" stop-opacity="0"/></linearGradient></defs><path d="M0,80 C80,60 160,70 240,45 C320,20 400,55 480,35 C560,15 640,40 720,25 C760,18 800,30 800,30 L800,100 L0,100Z" fill="url(#pg)"/><path d="M0,80 C80,60 160,70 240,45 C320,20 400,55 480,35 C560,15 640,40 720,25 C760,18 800,30 800,30" fill="none" stroke="var(--pri)" stroke-width="2.5"/></svg></div>
</div>
</div>` : ""}
</div>
</section>

${r.on("stats") && statsItems.length ? `<section class="stats-section" id="stats">
<div class="stats-grid" style="--n:${statsItems.length}">${statsItems.map((st, i) => `<div class="stat rv${i ? ` d${i}` : ""}"><div class="num">${esc(st.value)}</div><div class="lbl">${esc(st.label)}</div></div>`).join("")}</div>
</section>` : ""}

${r.on("features") && features.length ? `<section class="features-section" id="features">
<div class="sect-badge rv">${esc(s("features", "eyebrow"))}</div>
<h2 class="sect-title rv">${esc(s("features", "title"))}</h2>
<p class="sect-sub rv">${esc(s("features", "subtitle"))}</p>
<div class="feat-grid">${features.map((f, i) => `<div class="feat rv${i % 2 ? ` d${i % 5}` : ""}"><div class="feat-icon">${esc(f.icon)}</div><h3>${esc(f.title)}</h3><p>${esc(f.desc)}</p></div>`).join("")}</div>
</section>` : ""}

${r.on("integrations") && integrations.length ? `<section class="int-section" id="integrations">
<div class="sect-badge rv">${esc(s("integrations", "eyebrow"))}</div>
<h2 class="sect-title rv">${esc(s("integrations", "title"))}</h2>
<p class="sect-sub rv" style="margin-left:auto;margin-right:auto;text-align:center">${esc(s("integrations", "subtitle"))}</p>
<div class="int-grid">${integrations.map((it, i) => `<div class="int-card rv${i ? ` d${i % 4}` : ""}"><div class="ic">${esc(it.icon)}</div><span>${esc(it.name)}</span></div>`).join("")}</div>
</section>` : ""}

${r.on("contact") ? `<section class="contact-section" id="contact">
<div class="contact-inner">
<div class="contact-info rv">
<h2>${esc(s("contact", "title"))}</h2>
<p>${esc(s("contact", "text"))}</p>
${addressLines.length ? `<div class="contact-detail"><div class="cd-icon">📍</div><div class="cd-text"><div class="cd-label">Headquarters</div><div class="cd-value">${addressLines.map(esc).join("<br>")}</div></div></div>` : ""}
${s("contact", "email") ? `<div class="contact-detail"><div class="cd-icon">✉️</div><div class="cd-text"><div class="cd-label">Email</div><div class="cd-value">${esc(s("contact", "email"))}</div></div></div>` : ""}
${s("contact", "phone") ? `<div class="contact-detail"><div class="cd-icon">📞</div><div class="cd-text"><div class="cd-label">Phone</div><div class="cd-value">${esc(s("contact", "phone"))}</div></div></div>` : ""}
${socials.length ? `<div class="social-row">${socials.map(([label, url, icon]) => `<a href="${safeUrl(url)}" target="_blank" rel="noopener" aria-label="${label}">${icon}</a>`).join("")}</div>` : ""}
</div>
<div class="contact-form rv d1">
<h3>Send us a message</h3>
<div class="cf-row"><input class="cf-input" placeholder="First name"><input class="cf-input" placeholder="Last name"></div>
<div class="cf-row"><input class="cf-input" placeholder="Work email"><input class="cf-input" placeholder="Company"></div>
<textarea class="cf-input" placeholder="How can we help you?"></textarea>
<button class="cf-btn">Send Message →</button>
</div>
</div>
</section>` : ""}

${r.on("cta") ? `<section class="cta-section" id="cta-section">
<div class="cta-box rv">
<h2>${esc(s("cta", "title"))}</h2>
<p>${esc(s("cta", "text"))}</p>
<button class="btn-white">${esc(s("cta", "button"))}</button>
</div>
</section>` : ""}

<footer><p>${esc(s("footer", "copyright"))}</p></footer>
</body>
</html>`;
}

export const saasPrismAnalytics: EditableTemplate = {
  id: "saas-prism-analytics",
  name: "Prism — Analytics SaaS",
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
