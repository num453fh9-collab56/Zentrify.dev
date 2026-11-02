import type { Content, EditableTemplate, Section } from "../editor/types";
import { csv, esc, previewScript, reader, revealCss, revealScript, safeColor, safeUrl } from "../editor/html";

const schema: Section[] = [
  {
    id: "brand",
    label: "Brand",
    fields: [
      { type: "text", key: "name", label: "Brand name" },
      { type: "text", key: "cta", label: "Nav CTA" },
      { type: "text", key: "ctaUrl", label: "CTA link", placeholder: "#get-started" },
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
    ],
  },
  {
    id: "ticker",
    label: "Ticker bar",
    toggleable: true,
    anchor: "ticker",
    fields: [
      {
        type: "list",
        key: "items",
        label: "Assets",
        itemLabel: "Asset",
        titleKey: "name",
        min: 1,
        max: 8,
        newItem: { name: "BTC", price: "$67,420", change: "+2.4%" },
        fields: [
          { type: "text", key: "name", label: "Symbol" },
          { type: "text", key: "price", label: "Price" },
          { type: "text", key: "change", label: "Change" },
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
        label: "Features",
        itemLabel: "Feature",
        titleKey: "title",
        max: 6,
        newItem: { icon: "◈", title: "Feature", desc: "Description" },
        fields: [
          { type: "text", key: "icon", label: "Icon" },
          { type: "text", key: "title", label: "Title" },
          { type: "textarea", key: "desc", label: "Description", rows: 2 },
        ],
      },
    ],
  },
  {
    id: "cards",
    label: "Holographic cards",
    toggleable: true,
    anchor: "cards",
    fields: [
      { type: "text", key: "eyebrow", label: "Tag" },
      { type: "text", key: "title", label: "Heading" },
      {
        type: "list",
        key: "items",
        label: "Cards",
        itemLabel: "Card",
        titleKey: "title",
        min: 1,
        max: 3,
        newItem: { title: "Card", subtitle: "Premium", desc: "Card description", color: "#8b5cf6" },
        fields: [
          { type: "text", key: "title", label: "Title" },
          { type: "text", key: "subtitle", label: "Subtitle" },
          { type: "textarea", key: "desc", label: "Description", rows: 2 },
          { type: "color", key: "color", label: "Card accent" },
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
        newItem: { value: "$0", label: "Stat" },
        fields: [
          { type: "text", key: "value", label: "Value" },
          { type: "text", key: "label", label: "Label" },
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
  enabled: { ticker: true, features: true, cards: true, stats: true, pricing: true, cta: true },
  values: {
    brand: { name: "Velaris", cta: "Start Trading →", ctaUrl: "#get-started" },
    theme: { primary: "#a78bfa", secondary: "#06b6d4", accent: "#f472b6", bg: "#07060e", text: "#7c7a9a" },
    hero: {
      badge: "◈ Secure • Instant • Borderless",
      title: "The future of *finance* is here",
      subtitle: "Trade, earn, and manage digital assets with institutional-grade security and zero-fee transactions across 200+ markets.",
      btn1: "Get Started →",
      btn2: "View Markets",
    },
    ticker: {
      items: [
        { name: "BTC", price: "$67,420", change: "+2.4%" },
        { name: "ETH", price: "$3,890", change: "+1.8%" },
        { name: "SOL", price: "$178", change: "+5.2%" },
        { name: "AVAX", price: "$42", change: "-0.7%" },
      ] as unknown as string,
    },
    features: {
      eyebrow: "Why Velaris",
      title: "Built for the next era",
      subtitle: "Every feature designed for speed, security, and scale.",
      items: [
        { icon: "◈", title: "Zero Fees", desc: "No trading fees, no hidden charges. Keep 100% of your returns." },
        { icon: "⬡", title: "Instant Settlement", desc: "Transactions settle in under 2 seconds with L2 finality." },
        { icon: "◇", title: "Cold Storage", desc: "98% of assets secured in air-gapped, multi-sig cold vaults." },
        { icon: "△", title: "Smart Portfolios", desc: "AI-optimized portfolios that rebalance based on market conditions." },
        { icon: "○", title: "DeFi Gateway", desc: "Access yield farming, staking, and liquidity pools from one interface." },
        { icon: "□", title: "Regulated", desc: "Licensed in 40+ jurisdictions. SOC 2, SOX, and MiCA compliant." },
      ] as unknown as string,
    },
    cards: {
      eyebrow: "Products",
      title: "Choose your edge",
      items: [
        { title: "Velaris Black", subtitle: "Premium Trading", desc: "Priority execution, private OTC desk, and dedicated account manager.", color: "#8b5cf6" },
        { title: "Velaris Earn", subtitle: "Passive Income", desc: "Up to 12% APY on staking and lending with instant withdrawals.", color: "#06b6d4" },
        { title: "Velaris Vault", subtitle: "Institutional", desc: "MPC custody, insurance coverage, and compliance reporting.", color: "#f472b6" },
      ] as unknown as string,
    },
    stats: {
      items: [
        { value: "$48B+", label: "Trading volume" },
        { value: "2M+", label: "Active traders" },
        { value: "200+", label: "Markets" },
        { value: "99.99%", label: "Uptime" },
      ] as unknown as string,
    },
    pricing: {
      eyebrow: "Plans",
      title: "Trade at your level",
      plans: [
        { name: "Explorer", price: "$0", period: "/mo", feats: "Spot trading, Basic charts, Mobile app, Email support", btn: "Open Account", featured: "" },
        { name: "Trader", price: "$29", period: "/mo", feats: "Everything in Explorer, Advanced charting, API access, Priority support, Margin trading", btn: "Upgrade →", featured: "POPULAR" },
        { name: "Institutional", price: "Custom", period: "", feats: "Everything in Trader, Private OTC desk, MPC custody, Dedicated manager, Custom SLA", btn: "Contact Sales", featured: "" },
      ] as unknown as string,
    },
    cta: { title: "Ready to trade?", desc: "Open your account in 2 minutes. No minimum deposit.", btn: "Get Started Free →" },
    footer: { copy: "© 2025 Velaris Finance, Ltd.", links: "Markets, Security, Docs, Status, Privacy, Terms" },
    seo: { title: "Velaris — Next-Gen Digital Finance", description: "Trade, earn, and manage digital assets with zero fees, instant settlement, and institutional-grade security." },
  },
};

const presets = {
  section: "theme",
  items: [
    { name: "Velaris Purple", swatch: ["#a78bfa", "#06b6d4", "#f472b6"], values: { primary: "#a78bfa", secondary: "#06b6d4", accent: "#f472b6", bg: "#07060e", text: "#7c7a9a" } },
    { name: "Gold Rush", swatch: ["#fbbf24", "#f59e0b", "#ef4444"], values: { primary: "#fbbf24", secondary: "#f59e0b", accent: "#ef4444", bg: "#0c0a04", text: "#9a8a6a" } },
    { name: "Ocean Blue", swatch: ["#3b82f6", "#06b6d4", "#10b981"], values: { primary: "#3b82f6", secondary: "#06b6d4", accent: "#10b981", bg: "#040810", text: "#6a7a9a" } },
    { name: "Neon Green", swatch: ["#22c55e", "#10b981", "#06b6d4"], values: { primary: "#22c55e", secondary: "#10b981", accent: "#06b6d4", bg: "#040a06", text: "#5a8a6a" } },
  ],
};

function render(content: Content, options?: { preview?: { initialScroll: number; instant: boolean } }) {
  const r = reader(content);
  const s = r.str;
  const P = safeColor(s("theme","primary"),"#a78bfa");
  const S = safeColor(s("theme","secondary"),"#06b6d4");
  const A = safeColor(s("theme","accent"),"#f472b6");
  const BG = safeColor(s("theme","bg"),"#07060e");
  const TX = safeColor(s("theme","text"),"#7c7a9a");
  const feats = r.list("features","items");
  const holoCards = r.list("cards","items");
  const stats = r.list("stats","items");
  const plans = r.list("pricing","plans");
  const ticker = r.list("ticker","items");
  const footerLinks = csv(s("footer","links"));

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
:root{--p:${P};--s:${S};--a:${A};--bg:${BG};--tx:${TX}}
html{scroll-behavior:smooth}
body{font-family:'Inter',system-ui,sans-serif;background:var(--bg);color:var(--tx);line-height:1.7;overflow-x:hidden}

/* ─── Aurora background ─── */
.aurora{position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden}
.aurora-blob{position:absolute;border-radius:50%;filter:blur(100px);mix-blend-mode:screen;animation:auroraMove 15s ease-in-out infinite alternate}
.ab1{width:600px;height:300px;background:var(--p);top:10%;left:-10%;opacity:.07}
.ab2{width:500px;height:250px;background:var(--s);top:50%;right:-10%;opacity:.06;animation-delay:5s;animation-direction:alternate-reverse}
.ab3{width:400px;height:200px;background:var(--a);bottom:10%;left:30%;opacity:.05;animation-delay:10s}
@keyframes auroraMove{
0%{transform:translate(0,0) rotate(0deg) scale(1)}
33%{transform:translate(60px,-40px) rotate(5deg) scale(1.1)}
66%{transform:translate(-40px,60px) rotate(-3deg) scale(.95)}
100%{transform:translate(30px,30px) rotate(2deg) scale(1.05)}
}

.gt{background:linear-gradient(135deg,var(--p),var(--s),var(--a));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}

/* ─── Nav ─── */
nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:.9rem 2rem;background:color-mix(in srgb,var(--bg) 85%,transparent);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom:1px solid rgba(255,255,255,.05)}
.nav-in{max-width:1100px;margin:0 auto;display:flex;align-items:center;justify-content:space-between}
.logo{font-weight:800;font-size:1.15rem;color:#fff;text-decoration:none;display:flex;align-items:center;gap:.5rem}
.logo-gem{display:inline-block;color:var(--p);font-size:1.2rem}
.nav-links{display:flex;gap:1.8rem;list-style:none}
.nav-links a{color:var(--tx);text-decoration:none;font-size:.85rem;font-weight:500;transition:color .3s}
.nav-links a:hover{color:#fff}
.nav-btn{padding:.55rem 1.3rem;border-radius:10px;background:linear-gradient(135deg,var(--p),var(--s));color:#fff;font-weight:700;font-size:.85rem;text-decoration:none;border:none;cursor:pointer;transition:transform .3s,box-shadow .3s}
.nav-btn:hover{transform:translateY(-2px);box-shadow:0 8px 30px color-mix(in srgb,var(--p) 30%,transparent)}

/* ─── Sections ─── */
section{position:relative;z-index:2;max-width:1100px;margin:0 auto;padding:6rem 1.5rem}
.tag{font-size:.7rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:var(--p);margin-bottom:1rem}
.h2{font-size:clamp(2rem,4vw,2.8rem);font-weight:800;color:#fff;line-height:1.2;margin-bottom:.75rem}

/* ─── Hero ─── */
.hero{min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding-top:5rem}
.hero-badge{display:inline-flex;gap:.5rem;padding:.4rem 1.1rem;border-radius:100px;font-size:.8rem;font-weight:600;color:var(--p);border:1px solid color-mix(in srgb,var(--p) 20%,transparent);background:color-mix(in srgb,var(--p) 5%,transparent);margin-bottom:2rem;animation:fadeIn .8s both}
.hero h1{font-size:clamp(2.8rem,6vw,4.5rem);font-weight:900;color:#fff;line-height:1.05;max-width:750px;letter-spacing:-.03em;margin-bottom:1.5rem;animation:fadeUp .8s .1s both}
.hero>p{font-size:1.1rem;max-width:520px;margin-bottom:2.5rem;animation:fadeUp .8s .2s both}
.hero-btns{display:flex;gap:1rem;flex-wrap:wrap;justify-content:center;animation:fadeUp .8s .3s both}
.btn-g{padding:.9rem 2.2rem;border-radius:12px;background:linear-gradient(135deg,var(--p),var(--s));color:#fff;font-weight:700;font-size:.95rem;border:none;cursor:pointer;text-decoration:none;transition:transform .3s,box-shadow .3s}
.btn-g:hover{transform:translateY(-2px);box-shadow:0 10px 40px color-mix(in srgb,var(--p) 30%,transparent)}
.btn-o{padding:.9rem 2.2rem;border-radius:12px;background:transparent;color:#fff;font-weight:500;font-size:.95rem;border:1px solid rgba(255,255,255,.12);text-decoration:none;cursor:pointer;transition:background .3s}
.btn-o:hover{background:rgba(255,255,255,.04)}

/* ─── Ticker ─── */
.ticker{overflow:hidden;border-top:1px solid rgba(255,255,255,.06);border-bottom:1px solid rgba(255,255,255,.06);padding:.8rem 0;position:relative;z-index:2}
.ticker-inner{display:flex;gap:3rem;animation:tickerScroll 30s linear infinite;white-space:nowrap;width:max-content}
.ticker-item{display:flex;gap:.75rem;align-items:center;font-size:.85rem;font-weight:600}
.ticker-name{color:rgba(255,255,255,.5)}
.ticker-price{color:#fff}
.ticker-change{font-size:.8rem}
.ticker-up{color:#22c55e}
.ticker-down{color:#ef4444}
@keyframes tickerScroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}

/* ─── Features ─── */
.feat-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1rem;margin-top:3rem}
.feat{padding:2rem;border-radius:16px;border:1px solid rgba(255,255,255,.06);background:color-mix(in srgb,var(--bg) 90%,rgba(255,255,255,.04));transition:border-color .5s,transform .5s}
.feat:hover{border-color:color-mix(in srgb,var(--p) 25%,transparent);transform:translateY(-3px)}
.feat-icon{font-size:1.5rem;margin-bottom:1rem;display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:12px;background:color-mix(in srgb,var(--p) 10%,transparent)}
.feat h3{color:#fff;font-size:1.05rem;font-weight:600;margin-bottom:.4rem}
.feat p{font-size:.9rem}

/* ─── Holographic cards ─── */
.holo-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1.5rem;margin-top:3rem}
.holo{position:relative;padding:2.5rem;border-radius:20px;overflow:hidden;transition:transform .6s cubic-bezier(.2,.7,.2,1);border:1px solid rgba(255,255,255,.08)}
.holo::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,.06),transparent 40%,rgba(255,255,255,.03));pointer-events:none}
.holo::after{content:'';position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:conic-gradient(from 0deg,transparent,var(--p),transparent,var(--s),transparent);opacity:.04;animation:holoRotate 10s linear infinite}
@keyframes holoRotate{to{transform:rotate(360deg)}}
.holo:hover{transform:translateY(-6px) scale(1.01)}
.holo-sub{font-size:.7rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;margin-bottom:1rem;position:relative;z-index:1}
.holo h3{font-size:1.5rem;font-weight:800;color:#fff;margin-bottom:.5rem;position:relative;z-index:1}
.holo p{font-size:.9rem;position:relative;z-index:1}
.holo-line{position:absolute;bottom:0;left:0;right:0;height:3px;z-index:1}

/* ─── Stats ─── */
.stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1.5rem;margin-top:3rem}
.stat{text-align:center;padding:2rem;border-radius:16px;border:1px solid rgba(255,255,255,.06)}
.stat-val{font-size:2.2rem;font-weight:900;background:linear-gradient(135deg,var(--p),var(--s));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.stat-label{font-size:.8rem;margin-top:.3rem}

/* ─── Pricing ─── */
.plan-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.5rem;margin-top:3rem}
.plan{padding:2.5rem 2rem;border-radius:20px;border:1px solid rgba(255,255,255,.06);background:var(--bg);transition:transform .5s;position:relative}
.plan:hover{transform:translateY(-4px)}
.plan.ft{border-color:var(--p);box-shadow:0 0 50px color-mix(in srgb,var(--p) 10%,transparent)}
.plan-badge{position:absolute;top:-1px;left:50%;transform:translateX(-50%);padding:.25rem .8rem;font-size:.65rem;font-weight:700;letter-spacing:.1em;background:linear-gradient(135deg,var(--p),var(--s));color:#fff;border-radius:0 0 8px 8px}
.plan h3{color:#fff;font-size:1.1rem;font-weight:600;margin-bottom:.5rem}
.plan-pr{font-size:2.5rem;font-weight:900;color:#fff}
.plan-pr small{font-size:.8rem;font-weight:400;color:var(--tx)}
.plan-fl{list-style:none;margin:1.5rem 0 2rem}
.plan-fl li{padding:.3rem 0;font-size:.85rem;display:flex;gap:.5rem;align-items:center}
.plan-fl li::before{content:'◈';color:var(--p);font-size:.6rem}
.plan-btn{display:block;width:100%;padding:.85rem;border-radius:12px;font-weight:600;font-size:.9rem;text-align:center;cursor:pointer;border:none;text-decoration:none;transition:transform .3s}
.plan.ft .plan-btn{background:linear-gradient(135deg,var(--p),var(--s));color:#fff}
.plan:not(.ft) .plan-btn{background:rgba(255,255,255,.05);color:#fff;border:1px solid rgba(255,255,255,.1)}
.plan-btn:hover{transform:translateY(-2px)}

/* ─── CTA ─── */
.cta-box{text-align:center;padding:5rem 2rem;border-radius:24px;border:1px solid rgba(255,255,255,.08);position:relative;overflow:hidden}
.cta-box::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 100%,color-mix(in srgb,var(--p) 8%,transparent),transparent 60%)}
.cta-box h2{font-size:clamp(2rem,4vw,3rem);font-weight:800;color:#fff;position:relative;margin-bottom:.75rem}
.cta-box p{font-size:1rem;position:relative;margin-bottom:2rem}
.cta-box .btn-g{position:relative}

footer{position:relative;z-index:2;text-align:center;padding:3rem 1.5rem;border-top:1px solid rgba(255,255,255,.05);font-size:.8rem}
.ft-links{display:flex;justify-content:center;gap:1.5rem;flex-wrap:wrap;margin-bottom:1rem}
.ft-links a{color:var(--tx);text-decoration:none;transition:color .3s}
.ft-links a:hover{color:#fff}

@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes fadeUp{from{opacity:0;transform:translateY(25px)}to{opacity:1;transform:none}}
${revealCss}

@media(max-width:768px){
.nav-links{display:none}
section{padding:4rem 1rem}
.feat-grid,.holo-grid,.plan-grid{grid-template-columns:1fr}
.stats-grid{grid-template-columns:repeat(2,1fr)}
}
</style>
</head>
<body>

<div class="aurora">
<div class="aurora-blob ab1"></div>
<div class="aurora-blob ab2"></div>
<div class="aurora-blob ab3"></div>
</div>

<nav>
<div class="nav-in">
<a href="#top" class="logo"><span class="logo-gem">◈</span>${esc(s("brand","name"))}</a>
<ul class="nav-links">
${r.on("features")?`<li><a href="#features">Features</a></li>`:""}
${r.on("cards")?`<li><a href="#cards">Products</a></li>`:""}
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
<a href="${safeUrl(s("brand","ctaUrl"))}" class="btn-g">${esc(s("hero","btn1"))}</a>
${s("hero","btn2")?`<a href="#features" class="btn-o">${esc(s("hero","btn2"))}</a>`:""}
</div>
</section>

${r.on("ticker")&&ticker.length?`<div class="ticker" id="ticker">
<div class="ticker-inner">${[...ticker,...ticker].map(t=>{const up=!t.change.startsWith("-");return`<div class="ticker-item"><span class="ticker-name">${esc(t.name)}</span><span class="ticker-price">${esc(t.price)}</span><span class="ticker-change ${up?"ticker-up":"ticker-down"}">${esc(t.change)}</span></div>`}).join("")}</div>
</div>`:""}

${r.on("features")&&feats.length?`
<section id="features">
<div style="text-align:center">
<div class="tag rv">${esc(s("features","eyebrow"))}</div>
<h2 class="h2 rv">${esc(s("features","title"))}</h2>
<p class="rv" style="max-width:550px;margin:0 auto">${esc(s("features","subtitle"))}</p>
</div>
<div class="feat-grid">${feats.map((f,i)=>`<div class="feat rv${i<3?` d${i}`:""}" ><div class="feat-icon">${esc(f.icon)}</div><h3>${esc(f.title)}</h3><p>${esc(f.desc)}</p></div>`).join("")}</div>
</section>`:""}

${r.on("cards")&&holoCards.length?`
<section id="cards">
<div style="text-align:center">
<div class="tag rv">${esc(s("cards","eyebrow"))}</div>
<h2 class="h2 rv">${esc(s("cards","title"))}</h2>
</div>
<div class="holo-grid">${holoCards.map((c,i)=>{const cc=safeColor(c.color,"#8b5cf6");return`<div class="holo rv${i?` d${i}`:""}" style="background:color-mix(in srgb,${cc} 5%,var(--bg))">
<div class="holo-sub" style="color:${cc}">${esc(c.subtitle)}</div>
<h3>${esc(c.title)}</h3>
<p>${esc(c.desc)}</p>
<div class="holo-line" style="background:linear-gradient(90deg,${cc},transparent)"></div>
</div>`}).join("")}</div>
</section>`:""}

${r.on("stats")&&stats.length?`
<section id="stats">
<div class="stats-grid">${stats.map((st,i)=>`<div class="stat rv${i?` d${Math.min(i,3)}`:""}" ><div class="stat-val">${esc(st.value)}</div><div class="stat-label">${esc(st.label)}</div></div>`).join("")}</div>
</section>`:""}

${r.on("pricing")&&plans.length?`
<section id="pricing">
<div style="text-align:center">
<div class="tag rv">${esc(s("pricing","eyebrow"))}</div>
<h2 class="h2 rv">${esc(s("pricing","title"))}</h2>
</div>
<div class="plan-grid">${plans.map((p,i)=>`<div class="plan${p.featured?" ft":""} rv${i?` d${i}`:""}" >${p.featured?`<div class="plan-badge">${esc(p.featured)}</div>`:""}<h3>${esc(p.name)}</h3><div class="plan-pr">${esc(p.price)}<small>${esc(p.period)}</small></div><ul class="plan-fl">${csv(p.feats).map(f=>`<li>${esc(f)}</li>`).join("")}</ul><button class="plan-btn">${esc(p.btn)}</button></div>`).join("")}</div>
</section>`:""}

${r.on("cta")?`
<section id="cta-section">
<div class="cta-box rv">
<h2>${esc(s("cta","title"))}</h2>
<p>${esc(s("cta","desc"))}</p>
<a href="${safeUrl(s("brand","ctaUrl"))}" class="btn-g">${esc(s("cta","btn"))}</a>
</div>
</section>`:""}

<footer>
${footerLinks.length?`<div class="ft-links">${footerLinks.map(l=>`<a href="#">${esc(l)}</a>`).join("")}</div>`:""}
<p>${esc(s("footer","copy"))}</p>
</footer>

${revealScript}
</body>
</html>`;
}

export const motionHoloFinance: EditableTemplate = {
  id: "motion-holo-finance",
  name: "Velaris — Digital Finance",
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
