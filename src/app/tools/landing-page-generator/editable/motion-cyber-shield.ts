import type { Content, EditableTemplate, Section } from "../editor/types";
import { csv, esc, previewScript, reader, revealCss, revealScript, safeColor, safeUrl } from "../editor/html";

const schema: Section[] = [
  {
    id: "brand",
    label: "Brand",
    fields: [
      { type: "text", key: "name", label: "Brand name" },
      { type: "text", key: "cta", label: "Nav CTA" },
      { type: "text", key: "ctaUrl", label: "CTA link", placeholder: "#pricing" },
    ],
  },
  {
    id: "theme",
    label: "Colors",
    fields: [
      { type: "color", key: "primary", label: "Primary (neon)" },
      { type: "color", key: "secondary", label: "Secondary" },
      { type: "color", key: "danger", label: "Danger / alert" },
      { type: "color", key: "bg", label: "Background" },
      { type: "color", key: "text", label: "Body text" },
    ],
  },
  {
    id: "hero",
    label: "Hero",
    anchor: "top",
    fields: [
      { type: "text", key: "badge", label: "Status badge" },
      { type: "textarea", key: "title", label: "Headline", rows: 2, hint: "*stars* for neon text." },
      { type: "textarea", key: "subtitle", label: "Subtitle", rows: 3 },
      { type: "text", key: "btn1", label: "Primary button" },
      { type: "text", key: "btn2", label: "Secondary button" },
    ],
  },
  {
    id: "threats",
    label: "Live threat counter",
    toggleable: true,
    anchor: "threats",
    fields: [
      {
        type: "list",
        key: "items",
        label: "Counters",
        itemLabel: "Counter",
        titleKey: "label",
        min: 1,
        max: 4,
        newItem: { value: "0", label: "Counter", prefix: "", suffix: "" },
        fields: [
          { type: "text", key: "value", label: "Number" },
          { type: "text", key: "label", label: "Label" },
          { type: "text", key: "prefix", label: "Prefix" },
          { type: "text", key: "suffix", label: "Suffix" },
        ],
      },
    ],
  },
  {
    id: "features",
    label: "Defense layers",
    toggleable: true,
    anchor: "features",
    fields: [
      { type: "text", key: "eyebrow", label: "Tag" },
      { type: "text", key: "title", label: "Heading" },
      { type: "textarea", key: "subtitle", label: "Description", rows: 2 },
      {
        type: "list",
        key: "items",
        label: "Features",
        itemLabel: "Feature",
        titleKey: "title",
        max: 6,
        newItem: { icon: "🛡️", title: "Defense", desc: "Description" },
        fields: [
          { type: "text", key: "icon", label: "Icon" },
          { type: "text", key: "title", label: "Title" },
          { type: "textarea", key: "desc", label: "Description", rows: 2 },
        ],
      },
    ],
  },
  {
    id: "dashboard",
    label: "Security dashboard",
    toggleable: true,
    anchor: "dashboard",
    fields: [
      { type: "text", key: "eyebrow", label: "Tag" },
      { type: "text", key: "title", label: "Heading" },
      { type: "textarea", key: "desc", label: "Description", rows: 2 },
      {
        type: "list",
        key: "panels",
        label: "Status panels",
        itemLabel: "Panel",
        titleKey: "label",
        min: 1,
        max: 4,
        newItem: { label: "Status", value: "Active", status: "ok" },
        fields: [
          { type: "text", key: "label", label: "Label" },
          { type: "text", key: "value", label: "Value" },
          { type: "select", key: "status", label: "Status", options: [{ value: "ok", label: "✓ OK (green)" }, { value: "warn", label: "⚠ Warning (yellow)" }, { value: "alert", label: "✕ Alert (red)" }] },
        ],
      },
    ],
  },
  {
    id: "pricing",
    label: "Pricing",
    toggleable: true,
    anchor: "pricing",
    fields: [
      { type: "text", key: "eyebrow", label: "Tag" },
      { type: "text", key: "title", label: "Heading" },
      {
        type: "list",
        key: "plans",
        label: "Plans",
        itemLabel: "Plan",
        titleKey: "name",
        min: 1,
        max: 3,
        newItem: { name: "Plan", price: "$0", period: "/mo", feats: "Feature 1, Feature 2", btn: "Start", featured: "" },
        fields: [
          { type: "text", key: "name", label: "Name" },
          { type: "text", key: "price", label: "Price" },
          { type: "text", key: "period", label: "Period" },
          { type: "textarea", key: "feats", label: "Features (comma sep)", rows: 3 },
          { type: "text", key: "btn", label: "Button" },
          { type: "text", key: "featured", label: "Badge" },
        ],
      },
    ],
  },
  {
    id: "logos",
    label: "Trusted by",
    toggleable: true,
    anchor: "logos",
    fields: [
      { type: "text", key: "title", label: "Title" },
      {
        type: "list",
        key: "items",
        label: "Companies",
        itemLabel: "Company",
        titleKey: "name",
        max: 8,
        newItem: { name: "Company" },
        fields: [{ type: "text", key: "name", label: "Name" }],
      },
    ],
  },
  {
    id: "cta",
    label: "Call to action",
    toggleable: true,
    anchor: "cta-section",
    fields: [
      { type: "text", key: "title", label: "Heading" },
      { type: "textarea", key: "desc", label: "Description", rows: 2 },
      { type: "text", key: "btn", label: "Button" },
    ],
  },
  {
    id: "footer",
    label: "Footer",
    fields: [
      { type: "text", key: "copy", label: "Copyright" },
      { type: "text", key: "links", label: "Links (comma sep)" },
    ],
  },
  {
    id: "seo",
    label: "Page settings (SEO)",
    fields: [
      { type: "text", key: "title", label: "Page title" },
      { type: "textarea", key: "description", label: "Description", rows: 3 },
    ],
  },
];

const defaults: Content = {
  enabled: { threats: true, features: true, dashboard: true, pricing: true, logos: true, cta: true },
  values: {
    brand: { name: "CyberShield", cta: "Get Protected →", ctaUrl: "#pricing" },
    theme: { primary: "#00ff88", secondary: "#00d4ff", danger: "#ff3355", bg: "#050a08", text: "#5a7a6a" },
    hero: {
      badge: "● SYSTEMS ONLINE — ALL DEFENSES ACTIVE",
      title: "Zero-trust *security* for the modern stack",
      subtitle: "CyberShield monitors every packet, every request, every anomaly in real-time. AI-powered threat detection that never sleeps.",
      btn1: "Activate Shield →",
      btn2: "See Live Demo",
    },
    threats: {
      items: [
        { value: "2.4M", label: "Threats blocked today", prefix: "", suffix: "" },
        { value: "0.003", label: "Detection latency", prefix: "", suffix: "ms" },
        { value: "99.999", label: "Uptime SLA", prefix: "", suffix: "%" },
        { value: "186", label: "Countries monitored", prefix: "", suffix: "" },
      ] as unknown as string,
    },
    features: {
      eyebrow: "Defense layers",
      title: "Multi-layer protection",
      subtitle: "Six defense layers working in concert to eliminate threats before they reach your infrastructure.",
      items: [
        { icon: "🛡️", title: "AI Threat Detection", desc: "Neural network trained on 10B+ attack signatures detects zero-day threats in real-time." },
        { icon: "🔒", title: "Zero-Trust Network", desc: "Every request verified. No implicit trust. Microsegmentation across your entire infrastructure." },
        { icon: "🔍", title: "Deep Packet Inspection", desc: "Line-rate analysis of encrypted traffic without performance degradation." },
        { icon: "⚡", title: "Instant Response", desc: "Automated playbooks isolate compromised assets in under 50 milliseconds." },
        { icon: "📊", title: "Compliance Engine", desc: "Continuous SOC 2, HIPAA, PCI DSS monitoring with auto-generated audit trails." },
        { icon: "🌐", title: "Global Edge Network", desc: "DDoS mitigation at the edge. 200+ PoPs absorb volumetric attacks before they reach origin." },
      ] as unknown as string,
    },
    dashboard: {
      eyebrow: "Command center",
      title: "Real-time visibility",
      desc: "Monitor your entire security posture from a single dashboard.",
      panels: [
        { label: "Firewall", value: "Active — 0 breaches", status: "ok" },
        { label: "DDoS Shield", value: "Absorbing 2.1 Gbps", status: "warn" },
        { label: "Endpoints", value: "1,247 protected", status: "ok" },
        { label: "Threat Level", value: "Elevated", status: "warn" },
      ] as unknown as string,
    },
    pricing: {
      eyebrow: "Pricing",
      title: "Protection at every scale",
      plans: [
        { name: "Startup", price: "$49", period: "/mo", feats: "Up to 10 endpoints, Basic WAF, Email alerts, Community support", btn: "Start Free Trial", featured: "" },
        { name: "Business", price: "$199", period: "/mo", feats: "Up to 500 endpoints, Advanced WAF + DDoS, AI threat detection, SIEM integration, 24/7 support, SOC 2 reports", btn: "Activate Shield →", featured: "RECOMMENDED" },
        { name: "Enterprise", price: "Custom", period: "", feats: "Unlimited endpoints, Custom rules engine, Dedicated SOC team, On-prem deployment, SLA guarantee, Compliance suite", btn: "Contact Security Team", featured: "" },
      ] as unknown as string,
    },
    logos: {
      title: "Protecting industry leaders",
      items: [{ name: "Stripe" }, { name: "Cloudflare" }, { name: "Datadog" }, { name: "Elastic" }, { name: "HashiCorp" }] as unknown as string,
    },
    cta: { title: "Don't wait for a breach", desc: "Start your 14-day free trial. Full protection, no credit card required.", btn: "Activate CyberShield →" },
    footer: { copy: "© 2025 CyberShield Security, Inc.", links: "Status, Docs, Security, Privacy, Terms" },
    seo: { title: "CyberShield — AI-Powered Cybersecurity", description: "Zero-trust security platform with AI threat detection, DDoS mitigation, and real-time monitoring for modern infrastructure." },
  },
};

const presets = {
  section: "theme",
  items: [
    { name: "Matrix", swatch: ["#00ff88", "#00d4ff", "#ff3355"], values: { primary: "#00ff88", secondary: "#00d4ff", danger: "#ff3355", bg: "#050a08", text: "#5a7a6a" } },
    { name: "Arctic Ops", swatch: ["#38bdf8", "#818cf8", "#f43f5e"], values: { primary: "#38bdf8", secondary: "#818cf8", danger: "#f43f5e", bg: "#040810", text: "#5a6d8a" } },
    { name: "Red Alert", swatch: ["#ef4444", "#f97316", "#fbbf24"], values: { primary: "#ef4444", secondary: "#f97316", danger: "#fbbf24", bg: "#0a0404", text: "#8a5a5a" } },
    { name: "Phantom", swatch: ["#a78bfa", "#c084fc", "#f472b6"], values: { primary: "#a78bfa", secondary: "#c084fc", danger: "#f472b6", bg: "#08050c", text: "#7a6a8a" } },
  ],
};

function render(content: Content, options?: { preview?: { initialScroll: number; instant: boolean } }) {
  const r = reader(content);
  const s = r.str;
  const P = safeColor(s("theme","primary"),"#00ff88");
  const S = safeColor(s("theme","secondary"),"#00d4ff");
  const D = safeColor(s("theme","danger"),"#ff3355");
  const BG = safeColor(s("theme","bg"),"#050a08");
  const TX = safeColor(s("theme","text"),"#5a7a6a");
  const feats = r.list("features","items");
  const panels = r.list("dashboard","panels");
  const plans = r.list("pricing","plans");
  const threats = r.list("threats","items");
  const logos = r.list("logos","items");
  const footerLinks = csv(s("footer","links"));

  const neon = (t: string) => esc(t).replace(/\*(.+?)\*/g, `<span class="neon">${"$1"}</span>`);
  const statusColor = (st: string) => st === "alert" ? D : st === "warn" ? "#fbbf24" : P;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(s("seo","title"))}</title>
<meta name="description" content="${esc(s("seo","description"))}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
${previewScript(options?.preview)}
<style>
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{--p:${P};--s:${S};--d:${D};--bg:${BG};--tx:${TX}}
html{scroll-behavior:smooth}
body{font-family:'Inter',system-ui,sans-serif;background:var(--bg);color:var(--tx);line-height:1.7;overflow-x:hidden}
code,.mono{font-family:'JetBrains Mono',monospace}

/* ─── Matrix rain ─── */
.matrix{position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden;opacity:.06}
.matrix-col{position:absolute;top:-100%;font-family:'JetBrains Mono',monospace;font-size:14px;color:var(--p);writing-mode:vertical-rl;line-height:1;animation:matrixFall linear infinite}
@keyframes matrixFall{0%{transform:translateY(-100%)}100%{transform:translateY(calc(100vh + 100%))}}

/* ─── Scan ─── */
.scan-h{position:fixed;left:0;right:0;height:1px;background:var(--p);opacity:.1;animation:scanH 6s ease-in-out infinite;pointer-events:none;z-index:1}
@keyframes scanH{0%,100%{top:-1px;opacity:0}50%{top:50vh;opacity:.15}}

.neon{color:var(--p);text-shadow:0 0 10px var(--p),0 0 40px color-mix(in srgb,var(--p) 30%,transparent)}

/* ─── Nav ─── */
nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:.8rem 2rem;border-bottom:1px solid rgba(128,128,128,.1);background:color-mix(in srgb,var(--bg) 90%,transparent);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px)}
.nav-in{max-width:1100px;margin:0 auto;display:flex;align-items:center;justify-content:space-between}
.logo{display:flex;align-items:center;gap:.6rem;text-decoration:none}
.logo-icon{width:28px;height:28px;border-radius:6px;border:2px solid var(--p);display:flex;align-items:center;justify-content:center;font-size:.7rem;color:var(--p);box-shadow:0 0 12px color-mix(in srgb,var(--p) 30%,transparent)}
.logo-text{font-family:'JetBrains Mono',monospace;font-weight:700;font-size:.9rem;color:#fff;letter-spacing:.05em}
.nav-links{display:flex;gap:1.8rem;list-style:none}
.nav-links a{color:var(--tx);text-decoration:none;font-size:.8rem;font-weight:500;transition:color .3s}
.nav-links a:hover{color:var(--p)}
.nav-btn{padding:.5rem 1.2rem;border-radius:6px;background:var(--p);color:var(--bg);font-weight:700;font-size:.8rem;text-decoration:none;border:none;cursor:pointer;font-family:'JetBrains Mono',monospace;transition:box-shadow .3s}
.nav-btn:hover{box-shadow:0 0 20px color-mix(in srgb,var(--p) 40%,transparent)}

/* ─── Sections ─── */
section{position:relative;z-index:2;max-width:1100px;margin:0 auto;padding:6rem 1.5rem}
.tag{font-family:'JetBrains Mono',monospace;font-size:.7rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:var(--p);margin-bottom:1rem;display:flex;align-items:center;gap:.5rem}
.tag::before{content:'//';opacity:.4}
.h2{font-size:clamp(1.8rem,3.5vw,2.5rem);font-weight:800;color:#fff;line-height:1.2;margin-bottom:.75rem}

/* ─── Hero ─── */
.hero{min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding-top:5rem}
.hero-badge{display:inline-flex;align-items:center;gap:.5rem;padding:.4rem 1rem;border-radius:4px;font-family:'JetBrains Mono',monospace;font-size:.7rem;font-weight:600;color:var(--p);background:color-mix(in srgb,var(--p) 6%,transparent);border:1px solid color-mix(in srgb,var(--p) 20%,transparent);margin-bottom:2rem;animation:fadeIn .8s both}
.hero-badge::before{content:'●';font-size:.5rem;animation:blink 2s infinite}
@keyframes blink{0%,50%{opacity:1}51%,100%{opacity:.2}}
.hero h1{font-size:clamp(2.5rem,5.5vw,4rem);font-weight:800;color:#fff;line-height:1.1;max-width:800px;margin-bottom:1.5rem;animation:fadeUp .8s .1s both}
.hero>p{font-size:1.1rem;max-width:550px;margin-bottom:2.5rem;animation:fadeUp .8s .2s both}
.hero-btns{display:flex;gap:1rem;flex-wrap:wrap;justify-content:center;animation:fadeUp .8s .3s both}
.btn-shield{padding:.85rem 2.2rem;border-radius:6px;background:var(--p);color:var(--bg);font-weight:700;font-size:.9rem;font-family:'JetBrains Mono',monospace;border:none;cursor:pointer;text-decoration:none;transition:transform .3s,box-shadow .3s}
.btn-shield:hover{transform:translateY(-2px);box-shadow:0 8px 30px color-mix(in srgb,var(--p) 30%,transparent)}
.btn-outline{padding:.85rem 2.2rem;border-radius:6px;background:transparent;color:#fff;font-weight:500;font-size:.9rem;border:1px solid rgba(255,255,255,.12);text-decoration:none;cursor:pointer;transition:background .3s}
.btn-outline:hover{background:rgba(255,255,255,.04)}

/* ─── Threat counters ─── */
.threats{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1px;border-radius:8px;overflow:hidden;margin-top:4rem;animation:fadeUp .8s .5s both;background:rgba(255,255,255,.06)}
.threat{padding:1.8rem;text-align:center;background:var(--bg)}
.threat-val{font-family:'JetBrains Mono',monospace;font-size:1.8rem;font-weight:800;color:#fff}
.threat-val span{color:var(--p)}
.threat-label{font-size:.75rem;margin-top:.3rem;font-family:'JetBrains Mono',monospace}

/* ─── Features ─── */
.feat-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1rem;margin-top:3rem}
.feat{padding:2rem;border-radius:8px;border:1px solid rgba(255,255,255,.06);background:color-mix(in srgb,var(--bg) 95%,rgba(255,255,255,.05));transition:border-color .5s,transform .5s;position:relative}
.feat::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--p),transparent);opacity:0;transition:opacity .5s}
.feat:hover{border-color:color-mix(in srgb,var(--p) 25%,transparent);transform:translateY(-3px)}
.feat:hover::before{opacity:1}
.feat-icon{font-size:1.4rem;margin-bottom:1rem}
.feat h3{color:#fff;font-size:1rem;font-weight:700;margin-bottom:.4rem;font-family:'JetBrains Mono',monospace}
.feat p{font-size:.85rem;line-height:1.7}

/* ─── Dashboard ─── */
.dash{margin-top:3rem;border-radius:12px;border:1px solid rgba(255,255,255,.08);overflow:hidden}
.dash-header{padding:1rem 1.5rem;background:rgba(255,255,255,.03);border-bottom:1px solid rgba(255,255,255,.06);display:flex;align-items:center;gap:.5rem;font-family:'JetBrains Mono',monospace;font-size:.75rem;color:var(--tx)}
.dash-header::before{content:'●';color:var(--p);font-size:.5rem;animation:blink 2s infinite}
.dash-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1px;background:rgba(255,255,255,.04)}
.dash-panel{padding:1.5rem;background:var(--bg)}
.dash-panel-label{font-family:'JetBrains Mono',monospace;font-size:.7rem;text-transform:uppercase;letter-spacing:.1em;margin-bottom:.5rem}
.dash-panel-val{font-size:.9rem;color:#fff;font-weight:600;display:flex;align-items:center;gap:.5rem}
.dash-dot{width:8px;height:8px;border-radius:50%;display:inline-block}

/* ─── Pricing ─── */
.plan-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1rem;margin-top:3rem}
.plan{padding:2.5rem 2rem;border-radius:8px;border:1px solid rgba(255,255,255,.06);background:var(--bg);transition:transform .5s;position:relative}
.plan:hover{transform:translateY(-4px)}
.plan.ft{border-color:var(--p);box-shadow:0 0 40px color-mix(in srgb,var(--p) 10%,transparent)}
.plan-badge{position:absolute;top:0;right:1.5rem;padding:.3rem .8rem;font-family:'JetBrains Mono',monospace;font-size:.6rem;font-weight:700;letter-spacing:.1em;background:var(--p);color:var(--bg);border-radius:0 0 4px 4px}
.plan h3{color:#fff;font-weight:700;font-family:'JetBrains Mono',monospace;margin-bottom:.5rem}
.plan-price{font-size:2.5rem;font-weight:800;color:#fff}
.plan-price small{font-size:.8rem;font-weight:400;color:var(--tx)}
.plan-feats{list-style:none;margin:1.5rem 0 2rem}
.plan-feats li{padding:.3rem 0;font-size:.85rem;display:flex;gap:.5rem;align-items:center}
.plan-feats li::before{content:'›';color:var(--p);font-weight:700;font-family:'JetBrains Mono',monospace}
.plan-btn{display:block;width:100%;padding:.8rem;border-radius:6px;font-weight:700;font-size:.85rem;text-align:center;cursor:pointer;border:none;font-family:'JetBrains Mono',monospace;text-decoration:none;transition:transform .3s}
.plan.ft .plan-btn{background:var(--p);color:var(--bg)}
.plan:not(.ft) .plan-btn{background:rgba(255,255,255,.05);color:#fff;border:1px solid rgba(255,255,255,.1)}
.plan-btn:hover{transform:translateY(-2px)}

/* ─── Logos ─── */
.logos{text-align:center;padding:3rem 1.5rem;position:relative;z-index:2}
.logos-t{font-family:'JetBrains Mono',monospace;font-size:.7rem;text-transform:uppercase;letter-spacing:.15em;margin-bottom:1.5rem;opacity:.4}
.logos-row{display:flex;justify-content:center;gap:3rem;flex-wrap:wrap}
.logos-row span{font-family:'JetBrains Mono',monospace;font-size:.9rem;font-weight:600;color:rgba(255,255,255,.2);letter-spacing:.05em}

/* ─── CTA ─── */
.cta-box{text-align:center;padding:4rem 2rem;border-radius:8px;border:1px solid rgba(255,255,255,.08);position:relative;overflow:hidden}
.cta-box::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 50% 120%,color-mix(in srgb,var(--p) 8%,transparent),transparent 60%)}
.cta-box h2{font-size:clamp(1.8rem,3.5vw,2.5rem);font-weight:800;color:#fff;position:relative;margin-bottom:.75rem}
.cta-box p{font-size:1rem;position:relative;margin-bottom:2rem}
.cta-box .btn-shield{position:relative}

footer{position:relative;z-index:2;display:flex;justify-content:space-between;align-items:center;padding:2rem 1.5rem;border-top:1px solid rgba(255,255,255,.06);font-size:.75rem;font-family:'JetBrains Mono',monospace;flex-wrap:wrap;gap:1rem;max-width:1100px;margin:0 auto}
.ft-links{display:flex;gap:1.5rem}
.ft-links a{color:var(--tx);text-decoration:none;transition:color .3s}
.ft-links a:hover{color:var(--p)}

@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes fadeUp{from{opacity:0;transform:translateY(25px)}to{opacity:1;transform:none}}
${revealCss}

@media(max-width:768px){
nav{padding:.8rem 1rem}
.nav-links{display:none}
section{padding:4rem 1rem}
.feat-grid,.plan-grid{grid-template-columns:1fr}
.threats,.dash-grid{grid-template-columns:repeat(2,1fr)}
}
</style>
</head>
<body>

<div class="matrix">${Array.from({length:15},(_,i)=>`<div class="matrix-col" style="left:${(i*7)%100}%;animation-duration:${8+i*2}s;animation-delay:${i*.5}s">01001${i}10110100${i}01</div>`).join("")}</div>
<div class="scan-h"></div>

<nav>
<div class="nav-in">
<a href="#top" class="logo"><div class="logo-icon">⬡</div><span class="logo-text">${esc(s("brand","name"))}</span></a>
<ul class="nav-links">
${r.on("features")?`<li><a href="#features">Defense</a></li>`:""}
${r.on("dashboard")?`<li><a href="#dashboard">Dashboard</a></li>`:""}
${r.on("pricing")?`<li><a href="#pricing">Pricing</a></li>`:""}
</ul>
<a href="${safeUrl(s("brand","ctaUrl"))}" class="nav-btn">${esc(s("brand","cta"))}</a>
</div>
</nav>

<section class="hero" id="top">
${s("hero","badge")?`<div class="hero-badge">${esc(s("hero","badge"))}</div>`:""}
<h1>${neon(s("hero","title"))}</h1>
<p>${esc(s("hero","subtitle"))}</p>
<div class="hero-btns">
<a href="${safeUrl(s("brand","ctaUrl"))}" class="btn-shield">${esc(s("hero","btn1"))}</a>
${s("hero","btn2")?`<a href="#features" class="btn-outline">${esc(s("hero","btn2"))}</a>`:""}
</div>
${r.on("threats")&&threats.length?`<div class="threats">${threats.map(t=>`<div class="threat"><div class="threat-val">${esc(t.prefix)}${esc(t.value)}<span>${esc(t.suffix)}</span></div><div class="threat-label">${esc(t.label)}</div></div>`).join("")}</div>`:""}
</section>

${r.on("features")&&feats.length?`
<section id="features">
<div class="tag rv">${esc(s("features","eyebrow"))}</div>
<h2 class="h2 rv">${esc(s("features","title"))}</h2>
<p class="rv" style="max-width:550px">${esc(s("features","subtitle"))}</p>
<div class="feat-grid">${feats.map((f,i)=>`<div class="feat rv${i<3?` d${i}`:""}" ><div class="feat-icon">${esc(f.icon)}</div><h3>${esc(f.title)}</h3><p>${esc(f.desc)}</p></div>`).join("")}</div>
</section>`:""}

${r.on("dashboard")?`
<section id="dashboard">
<div class="tag rv">${esc(s("dashboard","eyebrow"))}</div>
<h2 class="h2 rv">${esc(s("dashboard","title"))}</h2>
<p class="rv" style="max-width:550px">${esc(s("dashboard","desc"))}</p>
<div class="dash rv d1">
<div class="dash-header">CYBERSHIELD COMMAND CENTER — LIVE</div>
<div class="dash-grid">${panels.map(p=>`<div class="dash-panel">
<div class="dash-panel-label">${esc(p.label)}</div>
<div class="dash-panel-val"><span class="dash-dot" style="background:${statusColor(p.status)};box-shadow:0 0 8px ${statusColor(p.status)}"></span>${esc(p.value)}</div>
</div>`).join("")}</div>
</div>
</section>`:""}

${r.on("pricing")&&plans.length?`
<section id="pricing">
<div style="text-align:center">
<div class="tag rv" style="justify-content:center">${esc(s("pricing","eyebrow"))}</div>
<h2 class="h2 rv">${esc(s("pricing","title"))}</h2>
</div>
<div class="plan-grid">${plans.map((p,i)=>`<div class="plan${p.featured?" ft":""} rv${i?` d${i}`:""}" >${p.featured?`<div class="plan-badge">${esc(p.featured)}</div>`:""}<h3>${esc(p.name)}</h3><div class="plan-price">${esc(p.price)}<small>${esc(p.period)}</small></div><ul class="plan-feats">${csv(p.feats).map(f=>`<li>${esc(f)}</li>`).join("")}</ul><button class="plan-btn">${esc(p.btn)}</button></div>`).join("")}</div>
</section>`:""}

${r.on("logos")&&logos.length?`
<div class="logos" id="logos">
<div class="logos-t rv">${esc(s("logos","title"))}</div>
<div class="logos-row rv d1">${logos.map(l=>`<span>${esc(l.name)}</span>`).join("")}</div>
</div>`:""}

${r.on("cta")?`
<section id="cta-section">
<div class="cta-box rv">
<h2>${esc(s("cta","title"))}</h2>
<p>${esc(s("cta","desc"))}</p>
<a href="${safeUrl(s("brand","ctaUrl"))}" class="btn-shield">${esc(s("cta","btn"))}</a>
</div>
</section>`:""}

<footer>
<span>${esc(s("footer","copy"))}</span>
${footerLinks.length?`<div class="ft-links">${footerLinks.map(l=>`<a href="#">${esc(l)}</a>`).join("")}</div>`:""}
</footer>

${revealScript}
</body>
</html>`;
}

export const motionCyberShield: EditableTemplate = {
  id: "motion-cyber-shield",
  name: "CyberShield — Cybersecurity",
  schema,
  defaults,
  presets,
  render,
  checks: (c) => {
    const r = reader(c);
    const out: { section: string; message: string }[] = [];
    if (!r.str("seo","description").trim())
      out.push({ section: "seo", message: "Add a search description for better SEO." });
    return out;
  },
};
