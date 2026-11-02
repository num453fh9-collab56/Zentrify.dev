import type { Content, EditableTemplate, Section } from "../editor/types";
import { esc, previewScript, reader, revealCss, revealScript, safeColor, safeUrl } from "../editor/html";

const schema: Section[] = [
  {
    id: "brand",
    label: "Brand",
    description: "Product name, logo style and the main call-to-action.",
    fields: [
      { type: "text", key: "prefix", label: "Logo prefix", hint: "Text before the highlight, e.g. '>_nexus'." },
      { type: "text", key: "highlight", label: "Logo highlight", hint: "Colored part, e.g. '.dev'." },
      { type: "text", key: "cta", label: "Nav CTA text" },
    ],
  },
  {
    id: "theme",
    label: "Colors",
    fields: [
      { type: "color", key: "primary", label: "Primary (neon)" },
      { type: "color", key: "accent", label: "Accent (output text)" },
      { type: "color", key: "dark", label: "Background" },
      { type: "color", key: "darkAlt", label: "Card / terminal bg" },
      { type: "color", key: "text", label: "Body text" },
    ],
  },
  {
    id: "hero",
    label: "Hero",
    anchor: "top",
    fields: [
      { type: "text", key: "badge", label: "Badge text", placeholder: "v3.0 — now with edge functions" },
      { type: "textarea", key: "title", label: "Headline", rows: 2, hint: "Wrap words in *stars* to glow them." },
      { type: "textarea", key: "subtitle", label: "Subtitle", rows: 3 },
      { type: "text", key: "btnPrimary", label: "Primary button" },
      { type: "text", key: "btnSecondary", label: "Secondary button" },
    ],
  },
  {
    id: "terminal",
    label: "Terminal mockup",
    toggleable: true,
    anchor: "top",
    fields: [
      { type: "text", key: "path", label: "Terminal path", placeholder: "~/projects/my-app" },
      { type: "textarea", key: "lines", label: "Terminal content", rows: 10, hint: "Lines starting with $ are commands, # are comments, others are output." },
    ],
  },
  {
    id: "logos",
    label: "Trusted by",
    toggleable: true,
    anchor: "logos",
    fields: [
      { type: "text", key: "label", label: "Heading" },
      { type: "text", key: "names", label: "Company names", hint: "Separate with commas." },
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
    id: "code",
    label: "API / Code",
    toggleable: true,
    anchor: "code",
    fields: [
      { type: "text", key: "eyebrow", label: "Tag" },
      { type: "text", key: "title", label: "Heading" },
      { type: "textarea", key: "subtitle", label: "Description", rows: 2 },
      { type: "textarea", key: "bullets", label: "Bullet points", rows: 4, hint: "One per line." },
      { type: "textarea", key: "codeBlock", label: "Code snippet", rows: 12, hint: "Plain text shown in a monospace code block." },
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
      { type: "text", key: "title", label: "Heading", hint: "Wrap words in *stars* to color them." },
      { type: "textarea", key: "text", label: "Description", rows: 2 },
      { type: "text", key: "placeholder", label: "Input placeholder" },
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
  enabled: { terminal: true, logos: true, features: true, code: true, stats: true, contact: true, cta: true },
  values: {
    brand: { prefix: ">_nexus", highlight: ".dev", cta: "Sign Up →" },
    theme: { primary: "#00e5ff", accent: "#7dd3fc", dark: "#050510", darkAlt: "#0a0a1a", text: "#a0a8c0" },
    hero: {
      badge: "v3.0 — now with edge functions",
      title: "The platform *developers* deserve",
      subtitle: "Deploy globally in seconds. Nexus handles infrastructure, scaling, and observability so you can focus on writing brilliant code.",
      btnPrimary: "npx create-nexus →",
      btnSecondary: "Read Docs",
    },
    terminal: {
      path: "~/projects/my-app",
      lines: "$ nexus deploy --prod\n# Scanning project...\n✓ Build complete in 2.4s\n✓ Deployed to 47 edge regions\n✓ SSL provisioned automatically\n✓ https://my-app.nexus.dev\n\n$ nexus analytics --live\n  Requests: 12,847/min\n  P99 Latency: 23ms\n  Error Rate: 0.001%",
    },
    logos: {
      label: "Trusted by teams at",
      names: "Vercel, Stripe, Shopify, Linear, Notion, Figma",
    },
    features: {
      eyebrow: "// features",
      title: "Ship with confidence",
      subtitle: "Everything you need from first commit to global scale, in a single platform.",
      items: [
        { icon: "⚡", title: "Edge Functions", desc: "Run serverless code at the edge. 47 regions, sub-50ms cold starts, automatic failover." },
        { icon: "🗄️", title: "Managed Database", desc: "Serverless Postgres with auto-scaling, branching, and point-in-time recovery built in." },
        { icon: "🔍", title: "Observability", desc: "Real-time logs, distributed tracing, and error tracking. Know what's happening, everywhere." },
        { icon: "🔐", title: "Zero-Trust Auth", desc: "Built-in authentication with MFA, SSO, and RBAC. GDPR and SOC2 compliant out of the box." },
        { icon: "🔄", title: "CI/CD Pipeline", desc: "Push to deploy. Preview environments for every branch. Rollback in one click." },
        { icon: "📦", title: "Package Registry", desc: "Private npm registry with vulnerability scanning, license checks, and dependency insights." },
      ],
    },
    code: {
      eyebrow: "// api",
      title: "Developer-first API",
      subtitle: "Clean, intuitive APIs with auto-generated SDKs. Get started with 3 lines of code.",
      bullets: "Auto-generated TypeScript SDKs\nGraphQL and REST endpoints\nReal-time WebSocket streams\nRate limiting and caching built in",
      codeBlock: "// Initialize Nexus client\nimport { Nexus } from '@nexus/sdk'\n\nconst nx = new Nexus({\n  apiKey: process.env.NEXUS_KEY\n})\n\n// Deploy edge function\nconst fn = await nx.deploy({\n  name: 'api-handler',\n  runtime: 'edge',\n  regions: 'auto'\n})\n\nconsole.log(`Live: ${fn.url}`)\n// → Live: https://api.nexus.dev/fn/api-handler",
    },
    stats: {
      items: [
        { value: "47", label: "Edge Regions" },
        { value: "23ms", label: "Avg Latency" },
        { value: "99.99%", label: "Uptime" },
        { value: "18K+", label: "Developers" },
      ],
    },
    contact: {
      title: "Get in touch",
      text: "Have questions about our platform? Our team is here to help you find the right solution for your needs.",
      address: "548 Market St, Suite 100\nSan Francisco, CA 94104",
      email: "hello@company.com",
      phone: "+1 (415) 555-0120",
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
    cta: { title: "Start shipping *today*", text: "Free tier includes 100K requests/month, managed database, and edge deployment.", placeholder: "you@company.com", button: "Get API Key →" },
    footer: { copyright: "© 2026 Nexus Platform · Privacy · Terms · Status" },
    seo: {
      title: "Nexus — The Developer Platform",
      description: "Deploy globally in seconds. Nexus handles infrastructure, scaling, and observability so you can focus on writing brilliant code.",
    },
  },
};

const presets = {
  section: "theme",
  items: [
    { name: "Cyan", swatch: ["#050510", "#00e5ff"], values: { primary: "#00e5ff", accent: "#7dd3fc", dark: "#050510", darkAlt: "#0a0a1a", text: "#a0a8c0" } },
    { name: "Green", swatch: ["#050f0a", "#00ff88"], values: { primary: "#00ff88", accent: "#86efac", dark: "#050f0a", darkAlt: "#0a1a12", text: "#94b8a8" } },
    { name: "Purple", swatch: ["#0a0510", "#a855f7"], values: { primary: "#a855f7", accent: "#c4b5fd", dark: "#0a0510", darkAlt: "#110a1f", text: "#a8a0c0" } },
    { name: "Orange", swatch: ["#100805", "#ff6b2b"], values: { primary: "#ff6b2b", accent: "#fdba74", dark: "#100805", darkAlt: "#1a0f0a", text: "#c0a89a" } },
    { name: "Pink", swatch: ["#10050a", "#ff2d78"], values: { primary: "#ff2d78", accent: "#f9a8d4", dark: "#10050a", darkAlt: "#1a0a12", text: "#c0a0a8" } },
    { name: "Yellow", swatch: ["#0f0f05", "#facc15"], values: { primary: "#facc15", accent: "#fde68a", dark: "#0f0f05", darkAlt: "#1a1a0a", text: "#b8b894" } },
  ],
};

function glowText(s: string) {
  return esc(s).replace(/\*(.+?)\*/g, '<span class="glow-text">$1</span>');
}

function ctaGlow(s: string) {
  return esc(s).replace(/\*(.+?)\*/g, '<span style="color:var(--pri)">$1</span>');
}

function splitLines(s: string) {
  return s.split("\n").map((l) => l.trimEnd());
}

function renderTerminal(raw: string) {
  return splitLines(raw)
    .map((line) => {
      if (line.startsWith("$ ")) {
        const cmd = line.slice(2);
        return `<span class="term-line"><span class="term-prompt">$</span> <span class="term-cmd">${esc(cmd)}</span></span>`;
      }
      if (line.startsWith("#")) {
        return `<span class="term-line term-comment">${esc(line)}</span>`;
      }
      if (line.trim() === "") return `<span class="term-line"><br></span>`;
      return `<span class="term-line term-output">${esc(line)}</span>`;
    })
    .join("\n");
}

function renderCodeBlock(raw: string) {
  return splitLines(raw)
    .map((line) => {
      let out = esc(line).replace(/  /g, "&nbsp;&nbsp;");
      out = out
        .replace(/^(\/\/.*)$/gm, '<span class="cc">$1</span>')
        .replace(/\b(import|from|const|new|await|export)\b/g, '<span class="ck">$1</span>')
        .replace(/'([^']*)'/g, "'<span class=\"cs\">$1</span>'");
      return out;
    })
    .join("<br>\n");
}

function render(c: Content, options: Parameters<EditableTemplate["render"]>[1] = {}) {
  const r = reader(c);
  const s = r.str;
  const d = defaults.values;
  const col = (key: string) => safeColor(s("theme", key), d.theme[key] as string);
  const primary = col("primary");
  const accent = col("accent");
  const dark = col("dark");
  const darkAlt = col("darkAlt");
  const text = col("text");
  const prefix = s("brand", "prefix") || ">_nexus";
  const highlight = s("brand", "highlight");
  const cta = esc(s("brand", "cta") || "Sign Up →");

  const navLinks = [
    ["features", "Features"],
    ["code", "API"],
  ].filter(([id]) => r.on(id)).map(([id, label]) => `<a href="#${id}">${label}</a>`).join("");

  const features = r.list("features", "items");
  const statsItems = r.list("stats", "items").slice(0, 4);
  const logoNames = s("logos", "names").split(",").map((n) => n.trim()).filter(Boolean);
  const bullets = splitLines(s("code", "bullets")).filter(Boolean);
  const socials = [
    ["Twitter", s("contact", "twitter"), "𝕏"],
    ["LinkedIn", s("contact", "linkedin"), "in"],
    ["GitHub", s("contact", "github"), "GH"],
  ].filter(([, url]) => url.trim());
  const addressLines = splitLines(s("contact", "address")).filter(Boolean);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${esc(s("seo", "title") || prefix)}</title>
<meta name="description" content="${esc(s("seo", "description"))}">
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
${previewScript(options?.preview)}
${revealScript}
<style>
:root{--pri:${primary};--acc:${accent};--dark:${dark};--darkAlt:${darkAlt};--text:${text}}
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:var(--dark);color:var(--text);overflow-x:hidden}a{text-decoration:none;color:inherit}
:focus-visible{outline:2px solid var(--pri);outline-offset:3px}
${revealCss}
.grid-bg{position:fixed;inset:0;z-index:0;background-image:linear-gradient(color-mix(in srgb,var(--pri) 4%,transparent) 1px,transparent 1px),linear-gradient(90deg,color-mix(in srgb,var(--pri) 4%,transparent) 1px,transparent 1px);background-size:60px 60px}
.grid-glow{position:fixed;top:0;left:50%;transform:translateX(-50%);width:800px;height:400px;background:radial-gradient(ellipse,color-mix(in srgb,var(--pri) 7%,transparent),transparent 70%);z-index:0;pointer-events:none}
section,nav,footer{position:relative;z-index:1}
nav{padding:1.2rem 5%;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,.04)}
.logo{font-family:'JetBrains Mono',monospace;font-size:1.3rem;font-weight:800;color:#fff}.logo span{color:var(--pri)}
nav ul{list-style:none;display:flex;gap:2rem}
nav ul a{font-size:.82rem;font-weight:500;opacity:.5;transition:.3s;font-family:'JetBrains Mono',monospace}nav ul a:hover{opacity:1;color:var(--pri)}
.nav-cta{background:transparent;border:1px solid var(--pri);color:var(--pri);padding:.55rem 1.4rem;border-radius:8px;font-weight:600;font-size:.82rem;cursor:pointer;transition:.3s;font-family:'JetBrains Mono',monospace}
.nav-cta:hover{background:var(--pri);color:#fff;box-shadow:0 0 30px color-mix(in srgb,var(--pri) 28%,transparent)}
.hero{min-height:100vh;min-height:100svh;display:flex;align-items:center;padding:8rem 5% 4rem}
.hero-inner{max-width:1200px;margin:0 auto;width:100%;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center}
.hero-tag{display:inline-flex;align-items:center;gap:.6rem;border:1px solid color-mix(in srgb,var(--pri) 20%,transparent);padding:.4rem 1rem;border-radius:6px;font-size:.7rem;font-weight:600;color:var(--pri);margin-bottom:1.5rem;font-family:'JetBrains Mono',monospace;text-transform:uppercase;letter-spacing:1px}
.hero-tag .blink{display:inline-block;width:8px;height:8px;background:var(--pri);border-radius:2px;animation:blink 1.2s infinite}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.2}}
.hero h1{font-size:3.5rem;font-weight:900;line-height:1.08;color:#fff;margin-bottom:1.5rem;letter-spacing:-1.5px}
.hero h1 .glow-text{color:var(--pri);text-shadow:0 0 40px color-mix(in srgb,var(--pri) 35%,transparent)}
.hero .sub{font-size:1rem;line-height:1.8;opacity:.45;margin-bottom:2.5rem;max-width:480px}
.hero-btns{display:flex;gap:1rem}
.btn-neon{background:var(--pri);color:#fff;padding:.9rem 2.2rem;border-radius:10px;font-weight:700;font-size:.9rem;border:none;cursor:pointer;transition:.3s;box-shadow:0 0 20px color-mix(in srgb,var(--pri) 22%,transparent)}
.btn-neon:hover{box-shadow:0 0 50px color-mix(in srgb,var(--pri) 40%,transparent);transform:translateY(-2px)}
.btn-outline{background:transparent;color:#fff;padding:.9rem 2.2rem;border-radius:10px;font-weight:600;font-size:.9rem;border:1px solid rgba(255,255,255,.12);cursor:pointer;transition:.3s}
.btn-outline:hover{border-color:var(--pri);color:var(--pri)}
.terminal{background:var(--darkAlt);border:1px solid rgba(255,255,255,.08);border-radius:16px;overflow:hidden;box-shadow:0 40px 80px rgba(0,0,0,.5),0 0 1px color-mix(in srgb,var(--pri) 22%,transparent)}
.term-bar{padding:.7rem 1rem;background:color-mix(in srgb,var(--darkAlt) 80%,#1a1a3a);display:flex;align-items:center;gap:.5rem;border-bottom:1px solid rgba(255,255,255,.06)}
.term-dot{width:10px;height:10px;border-radius:50%}.td-r{background:#ff5f57}.td-y{background:#febc2e}.td-g{background:#28c840}
.term-bar>span{margin-left:.5rem;font-size:.7rem;opacity:.3;font-family:'JetBrains Mono',monospace}
.term-body{padding:1.5rem;font-family:'JetBrains Mono',monospace;font-size:.8rem;line-height:2}
.term-line{display:block}.term-prompt{color:var(--pri)}.term-cmd{color:#fff}.term-comment{color:rgba(255,255,255,.2)}.term-output{color:var(--acc);opacity:.7}
.term-cursor{display:inline-block;width:8px;height:16px;background:var(--pri);animation:blink 1s infinite;vertical-align:middle;margin-left:2px}
.logos-section{padding:4rem 5%;border-top:1px solid rgba(255,255,255,.04);border-bottom:1px solid rgba(255,255,255,.04)}
.logos-section p{text-align:center;font-size:.75rem;opacity:.25;text-transform:uppercase;letter-spacing:2px;margin-bottom:2rem;font-family:'JetBrains Mono',monospace}
.logo-row{display:flex;justify-content:center;gap:3rem;flex-wrap:wrap;opacity:.2}.logo-row span{font-size:1.2rem;font-weight:800;letter-spacing:1px}
.features-section{padding:7rem 5%;max-width:1200px;margin:0 auto}
.stag{font-family:'JetBrains Mono',monospace;font-size:.7rem;color:var(--pri);text-transform:uppercase;letter-spacing:2px;font-weight:700;margin-bottom:1rem;display:block}
.stitle{font-size:2.8rem;font-weight:800;color:#fff;margin-bottom:.5rem;letter-spacing:-1px}.ssub{opacity:.35;margin-bottom:3.5rem;max-width:500px}
.feat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.2rem}
.feat{background:var(--darkAlt);border:1px solid rgba(255,255,255,.05);border-radius:16px;padding:2rem;transition:.4s;position:relative;overflow:hidden}
.feat::after{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:var(--pri);opacity:0;transition:.4s}.feat:hover::after{opacity:1}
.feat:hover{border-color:color-mix(in srgb,var(--pri) 16%,transparent);box-shadow:0 0 40px color-mix(in srgb,var(--pri) 5%,transparent);transform:translateY(-4px)}
.feat .fi{width:48px;height:48px;border-radius:12px;border:1px solid color-mix(in srgb,var(--pri) 16%,transparent);display:flex;align-items:center;justify-content:center;margin-bottom:1.2rem;font-size:1.2rem}
.feat h3{color:#fff;font-size:1rem;font-weight:700;margin-bottom:.5rem}.feat p{font-size:.82rem;line-height:1.7;opacity:.4}
.code-section{padding:7rem 5%;max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center}
.code-block{background:var(--darkAlt);border:1px solid rgba(255,255,255,.06);border-radius:16px;padding:2rem;font-family:'JetBrains Mono',monospace;font-size:.78rem;line-height:2;overflow-x:auto}
.ck{color:var(--pri)}.cs{color:var(--acc)}.cv{color:#e2e8f0}.cc{color:rgba(255,255,255,.2)}.cp{color:#94a3b8}
.bullet-list{list-style:none;margin-top:2rem}
.bullet-list li{display:flex;align-items:center;gap:.8rem;margin-bottom:1rem}
.bullet-list li .check{color:var(--pri);font-size:1rem}.bullet-list li span{font-size:.9rem;opacity:.6}
.stats-section{padding:5rem 5%;background:var(--darkAlt);border-top:1px solid rgba(255,255,255,.04);border-bottom:1px solid rgba(255,255,255,.04)}
.stats-grid{max-width:1000px;margin:0 auto;display:grid;grid-template-columns:repeat(var(--n,4),1fr);gap:2rem;text-align:center}
.stat .num{font-size:3rem;font-weight:900;color:var(--pri);font-family:'JetBrains Mono',monospace;text-shadow:0 0 30px color-mix(in srgb,var(--pri) 22%,transparent)}
.stat .lbl{font-size:.8rem;opacity:.3;margin-top:.3rem;font-family:'JetBrains Mono',monospace;text-transform:uppercase;letter-spacing:1px}
.contact-section{padding:7rem 5%;border-top:1px solid rgba(255,255,255,.04)}
.contact-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:start}
.contact-info h2{font-size:2rem;font-weight:800;color:#fff;margin-bottom:1rem;letter-spacing:-.5px}
.contact-info>p{opacity:.45;margin-bottom:2rem;line-height:1.7}
.contact-detail{display:flex;align-items:flex-start;gap:1rem;margin-bottom:1.5rem}
.contact-detail .cd-icon{width:44px;height:44px;border-radius:12px;background:color-mix(in srgb,var(--pri) 10%,transparent);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:1.1rem}
.contact-detail .cd-text .cd-label{font-size:.7rem;opacity:.4;text-transform:uppercase;letter-spacing:1px;margin-bottom:.2rem}
.contact-detail .cd-text .cd-value{font-size:.9rem;color:#fff;font-weight:500}
.contact-form{background:var(--darkAlt);border:1px solid rgba(255,255,255,.06);border-radius:20px;padding:2.5rem}
.contact-form h3{font-size:1.2rem;font-weight:700;color:#fff;margin-bottom:1.5rem}
.cf-row{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem}
.cf-input{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:.85rem 1rem;color:#fff;font-size:.88rem;font-family:inherit;outline:none;width:100%;transition:.3s}
.cf-input:focus{border-color:var(--pri)}.cf-input::placeholder{color:rgba(255,255,255,.25)}
textarea.cf-input{min-height:120px;resize:vertical;margin-bottom:1rem}
.cf-btn{width:100%;background:var(--pri);color:#fff;padding:1rem;border-radius:12px;font-weight:700;font-size:.95rem;border:none;cursor:pointer;transition:.3s}
.cf-btn:hover{box-shadow:0 0 30px color-mix(in srgb,var(--pri) 35%,transparent);transform:translateY(-2px)}
.social-row{display:flex;gap:1rem;margin-top:2rem}
.social-row a{width:42px;height:42px;border-radius:12px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;transition:.3s;font-size:.9rem}
.social-row a:hover{background:color-mix(in srgb,var(--pri) 14%,transparent);border-color:color-mix(in srgb,var(--pri) 28%,transparent)}
.cta-section{padding:7rem 5%;text-align:center}
.cta-section h2{font-size:3rem;font-weight:900;color:#fff;margin-bottom:1rem;letter-spacing:-1px}
.cta-section p{opacity:.4;margin-bottom:2.5rem;max-width:500px;margin-left:auto;margin-right:auto}
.cta-input{display:flex;gap:.5rem;max-width:440px;margin:0 auto;background:var(--darkAlt);border:1px solid color-mix(in srgb,var(--pri) 16%,transparent);border-radius:14px;padding:.3rem}
.cta-input input{flex:1;background:transparent;border:none;color:#fff;padding:.8rem 1rem;font-size:.9rem;outline:none;font-family:'JetBrains Mono',monospace}.cta-input input::placeholder{color:rgba(255,255,255,.2)}
.cta-input button{background:var(--pri);color:#fff;border:none;padding:.8rem 1.8rem;border-radius:10px;font-weight:700;cursor:pointer;transition:.3s;white-space:nowrap}
.cta-input button:hover{box-shadow:0 0 30px color-mix(in srgb,var(--pri) 35%,transparent)}
footer{padding:3rem 5%;border-top:1px solid rgba(255,255,255,.04);text-align:center;font-size:.75rem;opacity:.25;font-family:'JetBrains Mono',monospace}
@media(max-width:768px){nav ul{display:none}.hero-inner,.code-section{grid-template-columns:1fr}.hero h1{font-size:2.5rem}.feat-grid,.stats-grid{grid-template-columns:1fr 1fr}.contact-inner{grid-template-columns:1fr}.cf-row{grid-template-columns:1fr}}
</style>
</head>
<body>
<div class="grid-bg"></div><div class="grid-glow"></div>
<nav id="nav">
<div class="logo">${esc(prefix)}${highlight ? `<span>${esc(highlight)}</span>` : ""}</div>
<ul>${navLinks}${r.on("contact") ? '<a href="#contact">Contact</a>' : ""}</ul>
<a href="#cta-section" class="nav-cta">${cta}</a>
</nav>

<section class="hero" id="top">
<div class="hero-inner">
<div>
${s("hero", "badge") ? `<div class="hero-tag rv"><span class="blink"></span> ${esc(s("hero", "badge"))}</div>` : ""}
<h1 class="rv d1">${glowText(s("hero", "title"))}</h1>
<p class="sub rv d2">${esc(s("hero", "subtitle"))}</p>
<div class="hero-btns rv d3">
<button class="btn-neon">${esc(s("hero", "btnPrimary"))}</button>
${s("hero", "btnSecondary") ? `<button class="btn-outline">${esc(s("hero", "btnSecondary"))}</button>` : ""}
</div>
</div>
${r.on("terminal") ? `<div class="rv d2">
<div class="terminal">
<div class="term-bar"><span class="term-dot td-r"></span><span class="term-dot td-y"></span><span class="term-dot td-g"></span><span>${esc(s("terminal", "path"))}</span></div>
<div class="term-body">
${renderTerminal(s("terminal", "lines"))}
<span class="term-line"><span class="term-prompt">$</span> <span class="term-cursor"></span></span>
</div>
</div>
</div>` : ""}
</div>
</section>

${r.on("logos") && logoNames.length ? `<section class="logos-section" id="logos">
<p>${esc(s("logos", "label"))}</p>
<div class="logo-row">${logoNames.map((n) => `<span>${esc(n)}</span>`).join("")}</div>
</section>` : ""}

${r.on("features") && features.length ? `<section class="features-section" id="features">
<span class="stag rv">${esc(s("features", "eyebrow"))}</span>
<h2 class="stitle rv">${esc(s("features", "title"))}</h2>
<p class="ssub rv">${esc(s("features", "subtitle"))}</p>
<div class="feat-grid">${features.map((f, i) => `<div class="feat rv${i % 2 ? ` d${i % 5}` : ""}"><div class="fi">${esc(f.icon)}</div><h3>${esc(f.title)}</h3><p>${esc(f.desc)}</p></div>`).join("")}</div>
</section>` : ""}

${r.on("code") ? `<section class="code-section" id="code">
<div class="rv">
<span class="stag">${esc(s("code", "eyebrow"))}</span>
<h2 class="stitle" style="font-size:2.2rem">${esc(s("code", "title"))}</h2>
<p class="ssub">${esc(s("code", "subtitle"))}</p>
${bullets.length ? `<ul class="bullet-list">${bullets.map((b) => `<li><span class="check">✓</span><span>${esc(b)}</span></li>`).join("")}</ul>` : ""}
</div>
<div class="code-block rv d1">${renderCodeBlock(s("code", "codeBlock"))}</div>
</section>` : ""}

${r.on("stats") && statsItems.length ? `<section class="stats-section" id="stats">
<div class="stats-grid" style="--n:${statsItems.length}">${statsItems.map((st, i) => `<div class="stat rv${i ? ` d${i}` : ""}"><div class="num">${esc(st.value)}</div><div class="lbl">${esc(st.label)}</div></div>`).join("")}</div>
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
<h2 class="rv">${ctaGlow(s("cta", "title"))}</h2>
<p class="rv d1">${esc(s("cta", "text"))}</p>
<div class="cta-input rv d2">
<input type="email" placeholder="${esc(s("cta", "placeholder"))}">
<button>${esc(s("cta", "button"))}</button>
</div>
</section>` : ""}

<footer><p>${esc(s("footer", "copyright"))}</p></footer>
</body>
</html>`;
}

export const saasNexusDev: EditableTemplate = {
  id: "saas-nexus-dev",
  name: "Nexus — Dev Platform",
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
