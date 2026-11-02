import type { Content, EditableTemplate, Section } from "../editor/types";
import { csv, esc, previewScript, reader, revealCss, revealScript, safeColor, safeUrl } from "../editor/html";

const schema: Section[] = [
  {
    id: "brand",
    label: "Brand",
    fields: [
      { type: "text", key: "name", label: "Product name" },
      { type: "text", key: "cta", label: "Nav CTA text" },
      { type: "text", key: "ctaUrl", label: "Nav CTA link", placeholder: "#pricing" },
    ],
  },
  {
    id: "theme",
    label: "Colors",
    fields: [
      { type: "color", key: "primary", label: "Primary" },
      { type: "color", key: "secondary", label: "Secondary" },
      { type: "color", key: "accent", label: "Accent" },
      { type: "color", key: "bg", label: "Background" },
      { type: "color", key: "text", label: "Body text" },
    ],
  },
  {
    id: "hero",
    label: "Hero",
    anchor: "top",
    fields: [
      { type: "text", key: "badge", label: "Badge" },
      { type: "textarea", key: "title", label: "Headline", rows: 2, hint: "*stars* for gradient text." },
      { type: "textarea", key: "subtitle", label: "Subtitle", rows: 3 },
      { type: "text", key: "btn1", label: "Primary button" },
      { type: "text", key: "btn2", label: "Secondary button" },
      { type: "text", key: "input", label: "Input placeholder", hint: "Leave empty to hide the input bar." },
    ],
  },
  {
    id: "metrics",
    label: "Live metrics",
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
        newItem: { value: "0", label: "Metric", suffix: "" },
        fields: [
          { type: "text", key: "value", label: "Number" },
          { type: "text", key: "label", label: "Label" },
          { type: "text", key: "suffix", label: "Suffix", hint: "e.g. %, ms, K" },
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
      { type: "text", key: "eyebrow", label: "Tag" },
      { type: "text", key: "title", label: "Heading" },
      { type: "textarea", key: "subtitle", label: "Description", rows: 2 },
      {
        type: "list",
        key: "items",
        label: "Feature cards",
        itemLabel: "Feature",
        titleKey: "title",
        max: 6,
        newItem: { icon: "⚡", title: "Feature", desc: "Description" },
        fields: [
          { type: "text", key: "icon", label: "Icon (emoji)" },
          { type: "text", key: "title", label: "Title" },
          { type: "textarea", key: "desc", label: "Description", rows: 2 },
        ],
      },
    ],
  },
  {
    id: "workflow",
    label: "How it works",
    toggleable: true,
    anchor: "workflow",
    fields: [
      { type: "text", key: "eyebrow", label: "Tag" },
      { type: "text", key: "title", label: "Heading" },
      {
        type: "list",
        key: "steps",
        label: "Steps",
        itemLabel: "Step",
        titleKey: "title",
        min: 1,
        max: 4,
        newItem: { num: "01", title: "Step", desc: "Description" },
        fields: [
          { type: "text", key: "num", label: "Number" },
          { type: "text", key: "title", label: "Title" },
          { type: "textarea", key: "desc", label: "Description", rows: 2 },
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
        newItem: { name: "Plan", price: "$0", period: "/mo", desc: "Description", feats: "Feature 1, Feature 2", btn: "Start", featured: "" },
        fields: [
          { type: "text", key: "name", label: "Name" },
          { type: "text", key: "price", label: "Price" },
          { type: "text", key: "period", label: "Period" },
          { type: "text", key: "desc", label: "Description" },
          { type: "textarea", key: "feats", label: "Features (comma sep)", rows: 3 },
          { type: "text", key: "btn", label: "Button" },
          { type: "text", key: "featured", label: "Badge", hint: "E.g. 'POPULAR'. Empty = none." },
        ],
      },
    ],
  },
  {
    id: "testimonials",
    label: "Testimonials",
    toggleable: true,
    anchor: "testimonials",
    fields: [
      { type: "text", key: "title", label: "Heading" },
      {
        type: "list",
        key: "items",
        label: "Testimonials",
        itemLabel: "Testimonial",
        titleKey: "name",
        max: 6,
        newItem: { quote: "Amazing!", name: "Name", role: "Role" },
        fields: [
          { type: "textarea", key: "quote", label: "Quote", rows: 2 },
          { type: "text", key: "name", label: "Name" },
          { type: "text", key: "role", label: "Role" },
        ],
      },
    ],
  },
  {
    id: "cta",
    label: "Call to action",
    toggleable: true,
    anchor: "cta-section",
    fields: [
      { type: "textarea", key: "title", label: "Heading", rows: 2, hint: "*stars* for gradient." },
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
  enabled: { metrics: true, features: true, workflow: true, pricing: true, testimonials: true, cta: true },
  values: {
    brand: { name: "Synthora", cta: "Get Access →", ctaUrl: "#pricing" },
    theme: { primary: "#00d4ff", secondary: "#7c3aed", accent: "#22d3ee", bg: "#030014", text: "#7c8db5" },
    hero: {
      badge: "⚡ Powered by Neural Engine v3",
      title: "Your AI that *actually thinks*",
      subtitle: "Synthora's neural network processes context like a human brain — understanding nuance, learning patterns, and delivering answers that feel like magic.",
      btn1: "Try Free →",
      btn2: "See it work",
      input: "Describe what you want to build...",
    },
    metrics: {
      items: [
        { value: "2.4", label: "Avg response", suffix: "ms" },
        { value: "99.97", label: "Uptime", suffix: "%" },
        { value: "180", label: "Languages", suffix: "+" },
        { value: "10", label: "Processed daily", suffix: "B" },
      ] as unknown as string,
    },
    features: {
      eyebrow: "Capabilities",
      title: "Intelligence at scale",
      subtitle: "Every component engineered for speed, accuracy, and depth.",
      items: [
        { icon: "🧠", title: "Neural Processing", desc: "Multi-layer neural network that processes queries in parallel across distributed nodes." },
        { icon: "⚡", title: "Real-time Stream", desc: "Token-by-token streaming with sub-millisecond latency for instant responses." },
        { icon: "🔗", title: "Context Memory", desc: "Persistent memory that retains context across sessions — your AI remembers." },
        { icon: "🛡️", title: "Enterprise Security", desc: "SOC 2 Type II, GDPR compliant. Your data never leaves your VPC." },
        { icon: "🔌", title: "API First", desc: "RESTful and GraphQL APIs with SDKs for every major language and framework." },
        { icon: "📊", title: "Analytics Suite", desc: "Real-time dashboards tracking usage, accuracy, latency, and cost per query." },
      ] as unknown as string,
    },
    workflow: {
      eyebrow: "How it works",
      title: "Three steps to intelligence",
      steps: [
        { num: "01", title: "Connect", desc: "Link your data sources — databases, APIs, documents. Synthora indexes everything." },
        { num: "02", title: "Configure", desc: "Set guardrails, tone, and domain expertise. Fine-tune to your exact use case." },
        { num: "03", title: "Deploy", desc: "One API call. Embed intelligence into any product in under five minutes." },
      ] as unknown as string,
    },
    pricing: {
      eyebrow: "Pricing",
      title: "Scale with confidence",
      plans: [
        { name: "Developer", price: "$0", period: "/mo", desc: "For prototyping", feats: "10K queries/mo, 1 project, Community support, Basic analytics", btn: "Start Free", featured: "" },
        { name: "Team", price: "$79", period: "/mo", desc: "For production apps", feats: "500K queries/mo, Unlimited projects, Priority support, Advanced analytics, Custom models, SSO", btn: "Start Trial →", featured: "MOST POPULAR" },
        { name: "Enterprise", price: "Custom", period: "", desc: "For critical systems", feats: "Unlimited queries, Dedicated infrastructure, 24/7 support, SLA, Custom training, VPC deployment", btn: "Talk to Sales", featured: "" },
      ] as unknown as string,
    },
    testimonials: {
      title: "Trusted by AI-first teams",
      items: [
        { quote: "We replaced three separate AI vendors with Synthora. Response quality improved 60% while cutting costs in half.", name: "David Park", role: "VP Engineering, ScaleAI" },
        { quote: "The context memory is a game-changer. Our support bot actually remembers previous conversations.", name: "Lisa Chen", role: "Product Lead, Clearbit" },
        { quote: "Sub-3ms latency. We tested everything on the market — nothing comes close.", name: "James Wright", role: "CTO, Fathom" },
      ] as unknown as string,
    },
    cta: { title: "Build something *intelligent*", desc: "Join 50,000+ developers building the next generation of AI products.", btn: "Get Started Free →" },
    footer: { copy: "© 2025 Synthora. All rights reserved.", links: "Docs, API Reference, Status, Privacy, Terms" },
    seo: { title: "Synthora — Neural AI Platform", description: "Build intelligent products with Synthora's neural AI engine. Sub-millisecond latency, enterprise security, and developer-first APIs." },
  },
};

const presets = {
  section: "theme",
  items: [
    { name: "Cyber Neon", swatch: ["#00d4ff", "#7c3aed", "#22d3ee"], values: { primary: "#00d4ff", secondary: "#7c3aed", accent: "#22d3ee", bg: "#030014", text: "#7c8db5" } },
    { name: "Matrix Green", swatch: ["#00ff88", "#059669", "#34d399"], values: { primary: "#00ff88", secondary: "#059669", accent: "#34d399", bg: "#000a04", text: "#6ee7b7" } },
    { name: "Plasma Pink", swatch: ["#f0abfc", "#c026d3", "#e879f9"], values: { primary: "#f0abfc", secondary: "#c026d3", accent: "#e879f9", bg: "#0c0010", text: "#d8b4fe" } },
    { name: "Solar Orange", swatch: ["#fb923c", "#ea580c", "#fbbf24"], values: { primary: "#fb923c", secondary: "#ea580c", accent: "#fbbf24", bg: "#0a0400", text: "#fdba74" } },
  ],
};

function render(content: Content, options?: { preview?: { initialScroll: number; instant: boolean } }) {
  const r = reader(content);
  const s = r.str;
  const P = (k: string) => safeColor(s("theme", k), "#00d4ff");
  const feats = r.list("features", "items");
  const steps = r.list("workflow", "steps");
  const plans = r.list("pricing", "plans");
  const metrics = r.list("metrics", "items");
  const testimonials = r.list("testimonials", "items");
  const footerLinks = csv(s("footer", "links"));

  const grad = (t: string) => esc(t).replace(/\*(.+?)\*/g, `<span class="gt">$1</span>`);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(s("seo","title"))}</title>
<meta name="description" content="${esc(s("seo","description"))}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
${previewScript(options?.preview)}
<style>
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{--p:${P("primary")};--s:${P("secondary")};--a:${P("accent")};--bg:${safeColor(s("theme","bg"),"#030014")};--txt:${safeColor(s("theme","text"),"#7c8db5")}}
html{scroll-behavior:smooth}
body{font-family:'Inter',system-ui,sans-serif;background:var(--bg);color:var(--txt);line-height:1.7;overflow-x:hidden}

/* ─── Neural network background ─── */
.neural-bg{position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden}
.neural-bg svg{width:100%;height:100%;opacity:.08}
.neural-node{fill:var(--p);animation:nodeGlow 3s ease-in-out infinite alternate}
.neural-line{stroke:var(--p);stroke-width:.5;opacity:.3;animation:lineFlow 4s linear infinite}
@keyframes nodeGlow{0%{opacity:.3;r:2}100%{opacity:1;r:4}}
@keyframes lineFlow{0%{stroke-dashoffset:100}100%{stroke-dashoffset:0}}

/* ─── Scan line effect ─── */
.scanline{position:fixed;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--p),transparent);opacity:.15;animation:scanMove 8s linear infinite;pointer-events:none;z-index:1}
@keyframes scanMove{0%{top:-2px}100%{top:100vh}}

/* ─── Grid overlay ─── */
.grid-overlay{position:fixed;inset:0;pointer-events:none;z-index:0;background-image:linear-gradient(rgba(255,255,255,.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.015) 1px,transparent 1px);background-size:60px 60px}

.gt{background:linear-gradient(135deg,var(--p),var(--a));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}

/* ─── Nav ─── */
nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:1rem 2rem;transition:all .4s}
nav.scrolled{background:color-mix(in srgb,var(--bg) 85%,transparent);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom:1px solid rgba(255,255,255,.05)}
.nav-in{max-width:1100px;margin:0 auto;display:flex;align-items:center;justify-content:space-between}
.logo{font-weight:800;font-size:1.2rem;color:#fff;text-decoration:none;display:flex;align-items:center;gap:.6rem}
.logo-dot{width:8px;height:8px;border-radius:50%;background:var(--p);box-shadow:0 0 12px var(--p);animation:dotPulse 2s ease-in-out infinite}
@keyframes dotPulse{0%,100%{box-shadow:0 0 12px var(--p)}50%{box-shadow:0 0 24px var(--p),0 0 48px color-mix(in srgb,var(--p) 30%,transparent)}}
.nav-link{display:flex;gap:2rem;list-style:none}
.nav-link a{color:var(--txt);text-decoration:none;font-size:.85rem;font-weight:500;transition:color .3s}
.nav-link a:hover{color:var(--p)}
.nav-btn{padding:.55rem 1.4rem;border-radius:8px;background:var(--p);color:var(--bg);font-weight:700;font-size:.85rem;text-decoration:none;border:none;cursor:pointer;transition:box-shadow .3s,transform .3s}
.nav-btn:hover{transform:translateY(-2px);box-shadow:0 6px 30px color-mix(in srgb,var(--p) 40%,transparent)}

/* ─── Sections ─── */
section{position:relative;z-index:2;max-width:1100px;margin:0 auto;padding:6rem 1.5rem}
.tag{display:inline-block;font-size:.7rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:var(--p);margin-bottom:1rem}
.h2{font-size:clamp(2rem,4vw,2.8rem);font-weight:800;color:#fff;line-height:1.2;margin-bottom:.75rem}
.sub{font-size:1.05rem;max-width:550px}

/* ─── Hero ─── */
.hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding-top:5rem}
.hero-badge{display:inline-flex;gap:.5rem;align-items:center;padding:.45rem 1.1rem;border-radius:100px;font-size:.8rem;font-weight:600;color:var(--p);background:color-mix(in srgb,var(--p) 8%,transparent);border:1px solid color-mix(in srgb,var(--p) 20%,transparent);margin-bottom:2rem;animation:fadeIn .8s both}
.hero h1{font-size:clamp(2.8rem,6.5vw,5rem);font-weight:900;color:#fff;line-height:1.05;max-width:800px;margin-bottom:1.5rem;letter-spacing:-.03em;animation:fadeUp .8s .1s both}
.hero>p{font-size:1.15rem;max-width:560px;margin-bottom:2rem;animation:fadeUp .8s .2s both}
.hero-input{display:flex;gap:0;max-width:520px;width:100%;animation:fadeUp .8s .3s both;border-radius:14px;overflow:hidden;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.03)}
.hero-input input{flex:1;padding:1rem 1.2rem;background:transparent;border:none;color:#fff;font-size:.95rem;outline:none}
.hero-input input::placeholder{color:rgba(255,255,255,.3)}
.hero-input button{padding:1rem 2rem;background:var(--p);color:var(--bg);font-weight:700;font-size:.9rem;border:none;cursor:pointer;white-space:nowrap;transition:background .3s}
.hero-btns{display:flex;gap:1rem;flex-wrap:wrap;justify-content:center;animation:fadeUp .8s .3s both;margin-bottom:1.5rem}
.btn-p{padding:.85rem 2rem;border-radius:10px;background:var(--p);color:var(--bg);font-weight:700;font-size:.95rem;border:none;cursor:pointer;text-decoration:none;transition:transform .3s,box-shadow .3s}
.btn-p:hover{transform:translateY(-2px);box-shadow:0 10px 40px color-mix(in srgb,var(--p) 35%,transparent)}
.btn-s{padding:.85rem 2rem;border-radius:10px;background:transparent;color:#fff;font-weight:500;font-size:.95rem;border:1px solid rgba(255,255,255,.12);text-decoration:none;cursor:pointer;transition:background .3s}
.btn-s:hover{background:rgba(255,255,255,.05)}

/* ─── Metrics ─── */
.metrics{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:1px;background:rgba(255,255,255,.04);border-radius:16px;overflow:hidden;margin-top:3rem;animation:fadeUp .8s .5s both}
.metric{padding:1.8rem 1.5rem;text-align:center;background:var(--bg)}
.metric-val{font-size:2rem;font-weight:800;color:#fff;font-variant-numeric:tabular-nums}
.metric-val span{color:var(--p)}
.metric-label{font-size:.8rem;margin-top:.25rem}

/* ─── Feature grid ─── */
.feat-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1px;background:rgba(255,255,255,.04);border-radius:20px;overflow:hidden;margin-top:3rem}
.feat{padding:2.2rem;background:var(--bg);transition:background .5s}
.feat:hover{background:color-mix(in srgb,var(--p) 4%,var(--bg))}
.feat-ic{font-size:1.5rem;margin-bottom:1rem;display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:12px;background:color-mix(in srgb,var(--p) 10%,transparent)}
.feat h3{color:#fff;font-size:1.05rem;font-weight:600;margin-bottom:.4rem}
.feat p{font-size:.9rem;line-height:1.7}

/* ─── Workflow ─── */
.steps{display:grid;gap:2rem;margin-top:3rem;counter-reset:step}
.step{display:grid;grid-template-columns:80px 1fr;gap:1.5rem;align-items:start;padding:2rem;border-radius:16px;border:1px solid rgba(255,255,255,.05);transition:border-color .5s,background .5s}
.step:hover{border-color:color-mix(in srgb,var(--p) 25%,transparent);background:color-mix(in srgb,var(--p) 3%,var(--bg))}
.step-num{font-size:2.5rem;font-weight:900;color:color-mix(in srgb,var(--p) 25%,transparent);line-height:1;font-variant-numeric:tabular-nums}
.step h3{color:#fff;font-size:1.1rem;font-weight:600;margin-bottom:.4rem}
.step p{font-size:.9rem}

/* ─── Pricing ─── */
.plan-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.5rem;margin-top:3rem}
.plan{padding:2.5rem 2rem;border-radius:20px;border:1px solid rgba(255,255,255,.06);background:color-mix(in srgb,var(--bg) 90%,rgba(255,255,255,.03));transition:transform .5s,border-color .5s;position:relative}
.plan:hover{transform:translateY(-4px)}
.plan.ft{border-color:var(--p);box-shadow:0 0 60px color-mix(in srgb,var(--p) 12%,transparent)}
.plan-badge{position:absolute;top:1rem;right:1rem;font-size:.65rem;font-weight:700;letter-spacing:.1em;padding:.3rem .8rem;border-radius:6px;background:var(--p);color:var(--bg)}
.plan h3{color:#fff;font-size:1.1rem;font-weight:600;margin-bottom:.5rem}
.plan-pr{font-size:2.8rem;font-weight:900;color:#fff;line-height:1}
.plan-pr small{font-size:.85rem;font-weight:400;color:var(--txt)}
.plan-desc{font-size:.85rem;margin:.6rem 0 1.5rem}
.plan-fl{list-style:none;margin-bottom:2rem}
.plan-fl li{font-size:.85rem;padding:.35rem 0;display:flex;gap:.5rem;align-items:center}
.plan-fl li::before{content:'→';color:var(--p);font-weight:700}
.plan-btn{display:block;width:100%;padding:.85rem;border-radius:10px;font-weight:600;font-size:.9rem;text-align:center;cursor:pointer;border:none;text-decoration:none;transition:transform .3s,box-shadow .3s}
.plan.ft .plan-btn{background:var(--p);color:var(--bg)}
.plan:not(.ft) .plan-btn{background:rgba(255,255,255,.05);color:#fff;border:1px solid rgba(255,255,255,.1)}
.plan-btn:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(0,0,0,.3)}

/* ─── Testimonials ─── */
.testi-g{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1.5rem;margin-top:3rem}
.testi{padding:2rem;border-radius:16px;border:1px solid rgba(255,255,255,.05);transition:border-color .5s}
.testi:hover{border-color:color-mix(in srgb,var(--p) 20%,transparent)}
.testi q{display:block;font-size:.9rem;line-height:1.8;margin-bottom:1.2rem;color:rgba(255,255,255,.7);font-style:normal}
.testi q::before{content:'"';color:var(--p);font-size:1.5rem;font-weight:700;line-height:0;vertical-align:-.3em;margin-right:.2rem}
.testi-name{font-weight:600;color:#fff;font-size:.85rem}
.testi-role{font-size:.75rem}

/* ─── CTA ─── */
.cta-wrap{text-align:center;padding:5rem 2rem;border-radius:24px;border:1px solid rgba(255,255,255,.06);position:relative;overflow:hidden}
.cta-wrap::before{content:'';position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:radial-gradient(circle at center,color-mix(in srgb,var(--p) 6%,transparent),transparent 60%);animation:ctaPulse 6s ease-in-out infinite}
@keyframes ctaPulse{0%,100%{opacity:.5;transform:scale(1)}50%{opacity:1;transform:scale(1.05)}}
.cta-wrap h2{font-size:clamp(2rem,4vw,3rem);font-weight:900;color:#fff;position:relative;line-height:1.15;margin-bottom:.75rem}
.cta-wrap p{font-size:1.05rem;position:relative;margin-bottom:2rem}
.cta-wrap .btn-p{position:relative;font-size:1rem;padding:1rem 2.8rem}

/* ─── Footer ─── */
footer{position:relative;z-index:2;text-align:center;padding:3rem 1.5rem;border-top:1px solid rgba(255,255,255,.05);font-size:.8rem}
.ft-links{display:flex;justify-content:center;gap:1.5rem;flex-wrap:wrap;margin-bottom:1rem}
.ft-links a{color:var(--txt);text-decoration:none;transition:color .3s}
.ft-links a:hover{color:var(--p)}

@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes fadeUp{from{opacity:0;transform:translateY(25px)}to{opacity:1;transform:none}}

${revealCss}

@media(max-width:768px){
.nav-link{display:none}
section{padding:4rem 1rem}
.feat-grid{grid-template-columns:1fr}
.plan-grid{grid-template-columns:1fr}
.testi-g{grid-template-columns:1fr}
.step{grid-template-columns:50px 1fr;gap:1rem}
.metrics{grid-template-columns:repeat(2,1fr)}
}
</style>
</head>
<body>

<div class="neural-bg">
<svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
${Array.from({length:30},(_,i)=>{const x=80+(i%6)*200+Math.sin(i)*50;const y=60+Math.floor(i/6)*160+Math.cos(i)*40;return`<circle class="neural-node" cx="${x}" cy="${y}" r="3" style="animation-delay:${i*.2}s"/>`}).join("")}
${Array.from({length:20},(_,i)=>{const x1=80+(i%6)*200+Math.sin(i)*50;const y1=60+Math.floor(i/6)*160+Math.cos(i)*40;const j=(i+3)%30;const x2=80+(j%6)*200+Math.sin(j)*50;const y2=60+Math.floor(j/6)*160+Math.cos(j)*40;return`<line class="neural-line" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke-dasharray="8 4" style="animation-delay:${i*.3}s"/>`}).join("")}
</svg>
</div>
<div class="scanline"></div>
<div class="grid-overlay"></div>

<nav id="mn">
<div class="nav-in">
<a href="#top" class="logo"><span class="logo-dot"></span>${esc(s("brand","name"))}</a>
<ul class="nav-link">
${r.on("features")?`<li><a href="#features">Features</a></li>`:""}
${r.on("workflow")?`<li><a href="#workflow">How it works</a></li>`:""}
${r.on("pricing")?`<li><a href="#pricing">Pricing</a></li>`:""}
</ul>
<a href="${safeUrl(s("brand","ctaUrl"))}" class="nav-btn">${esc(s("brand","cta"))}</a>
</div>
</nav>

<section class="hero" id="top">
${s("hero","badge")?`<div class="hero-badge">${esc(s("hero","badge"))}</div>`:""}
<h1>${grad(s("hero","title"))}</h1>
<p>${esc(s("hero","subtitle"))}</p>
<div class="hero-btns">
<a href="${safeUrl(s("brand","ctaUrl"))}" class="btn-p">${esc(s("hero","btn1"))}</a>
${s("hero","btn2")?`<a href="#features" class="btn-s">${esc(s("hero","btn2"))}</a>`:""}
</div>
${s("hero","input")?`<div class="hero-input"><input placeholder="${esc(s("hero","input"))}" readonly><button>${esc(s("hero","btn1"))}</button></div>`:""}

${r.on("metrics")&&metrics.length?`<div class="metrics">${metrics.map(m=>`<div class="metric rv"><div class="metric-val">${esc(m.value)}<span>${esc(m.suffix)}</span></div><div class="metric-label">${esc(m.label)}</div></div>`).join("")}</div>`:""}
</section>

${r.on("features")&&feats.length?`
<section id="features">
<div style="text-align:center">
<div class="tag rv">${esc(s("features","eyebrow"))}</div>
<h2 class="h2 rv">${esc(s("features","title"))}</h2>
<p class="sub rv" style="margin:0 auto">${esc(s("features","subtitle"))}</p>
</div>
<div class="feat-grid">${feats.map((f,i)=>`<div class="feat rv${i<3?` d${i}`:""}" ><div class="feat-ic">${esc(f.icon)}</div><h3>${esc(f.title)}</h3><p>${esc(f.desc)}</p></div>`).join("")}</div>
</section>`:""}

${r.on("workflow")&&steps.length?`
<section id="workflow">
<div style="text-align:center">
<div class="tag rv">${esc(s("workflow","eyebrow"))}</div>
<h2 class="h2 rv">${esc(s("workflow","title"))}</h2>
</div>
<div class="steps">${steps.map((st,i)=>`<div class="step rv${i?` d${i}`:""}" ><div class="step-num">${esc(st.num)}</div><div><h3>${esc(st.title)}</h3><p>${esc(st.desc)}</p></div></div>`).join("")}</div>
</section>`:""}

${r.on("pricing")&&plans.length?`
<section id="pricing">
<div style="text-align:center">
<div class="tag rv">${esc(s("pricing","eyebrow"))}</div>
<h2 class="h2 rv">${esc(s("pricing","title"))}</h2>
</div>
<div class="plan-grid">${plans.map((p,i)=>`<div class="plan${p.featured?" ft":""} rv${i?` d${i}`:""}" >${p.featured?`<div class="plan-badge">${esc(p.featured)}</div>`:""}<h3>${esc(p.name)}</h3><div class="plan-pr">${esc(p.price)}<small>${esc(p.period)}</small></div><p class="plan-desc">${esc(p.desc)}</p><ul class="plan-fl">${csv(p.feats).map(f=>`<li>${esc(f)}</li>`).join("")}</ul><button class="plan-btn">${esc(p.btn)}</button></div>`).join("")}</div>
</section>`:""}

${r.on("testimonials")&&testimonials.length?`
<section id="testimonials">
<h2 class="h2 rv" style="text-align:center">${esc(s("testimonials","title"))}</h2>
<div class="testi-g">${testimonials.map((t,i)=>`<div class="testi rv${i?` d${i}`:""}" ><q>${esc(t.quote)}</q><div class="testi-name">${esc(t.name)}</div><div class="testi-role">${esc(t.role)}</div></div>`).join("")}</div>
</section>`:""}

${r.on("cta")?`
<section id="cta-section">
<div class="cta-wrap rv">
<h2>${grad(s("cta","title"))}</h2>
<p>${esc(s("cta","desc"))}</p>
<a href="${safeUrl(s("brand","ctaUrl"))}" class="btn-p">${esc(s("cta","btn"))}</a>
</div>
</section>`:""}

<footer>
${footerLinks.length?`<div class="ft-links">${footerLinks.map(l=>`<a href="#">${esc(l)}</a>`).join("")}</div>`:""}
<p>${esc(s("footer","copy"))}</p>
</footer>

<script>var n=document.getElementById('mn');window.addEventListener('scroll',function(){n.classList.toggle('scrolled',scrollY>50)},{passive:true})</script>
${revealScript}
</body>
</html>`;
}

export const motionNeuralAi: EditableTemplate = {
  id: "motion-neural-ai",
  name: "Synthora — Neural AI Platform",
  schema,
  defaults,
  presets,
  render,
  checks: (c) => {
    const r = reader(c);
    const out: { section: string; message: string }[] = [];
    if (!r.str("seo", "description").trim())
      out.push({ section: "seo", message: "Add a search description for better SEO." });
    return out;
  },
};
