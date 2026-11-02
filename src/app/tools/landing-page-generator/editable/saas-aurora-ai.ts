import type { Content, EditableTemplate, Section } from "../editor/types";
import { esc, previewScript, reader, revealCss, revealScript, safeColor, safeUrl } from "../editor/html";

const U = (id: string, size: string) => `https://images.unsplash.com/${id}?${size}&fit=crop&auto=format&q=80`;

const schema: Section[] = [
  {
    id: "brand",
    label: "Brand",
    description: "Product name, logo and the main call-to-action.",
    fields: [
      { type: "text", key: "name", label: "Product name" },
      { type: "text", key: "highlight", label: "Highlight word", hint: "Colored part of the logo (e.g. 'AI' in 'AuroraAI')." },
      { type: "text", key: "cta", label: "Primary CTA text" },
      { type: "text", key: "ctaUrl", label: "Primary CTA link", placeholder: "#pricing" },
    ],
  },
  {
    id: "theme",
    label: "Colors",
    fields: [
      { type: "color", key: "primary", label: "Primary" },
      { type: "color", key: "secondary", label: "Secondary" },
      { type: "color", key: "accent", label: "Accent" },
      { type: "color", key: "dark", label: "Background" },
      { type: "color", key: "darkAlt", label: "Card background" },
      { type: "color", key: "text", label: "Body text" },
    ],
  },
  {
    id: "hero",
    label: "Hero",
    anchor: "top",
    fields: [
      { type: "text", key: "badge", label: "Badge text", placeholder: "Now in public beta — v2.0 released" },
      { type: "textarea", key: "title", label: "Headline", rows: 2, hint: "Wrap words in *stars* to show them in gradient." },
      { type: "textarea", key: "subtitle", label: "Subtitle", rows: 3 },
      { type: "text", key: "btnPrimary", label: "Primary button" },
      { type: "text", key: "btnSecondary", label: "Secondary button" },
      { type: "text", key: "proof", label: "Social proof text", hint: "Wrap numbers in *stars* to bold them." },
    ],
  },
  {
    id: "dashboard",
    label: "Dashboard mockup",
    toggleable: true,
    anchor: "top",
    fields: [
      { type: "text", key: "barUrl", label: "URL bar text", placeholder: "aurora-dashboard.app" },
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
      {
        type: "list",
        key: "badges",
        label: "Floating badges",
        itemLabel: "Badge",
        titleKey: "title",
        max: 3,
        newItem: { icon: "⚡", title: "Feature", detail: "Description" },
        fields: [
          { type: "text", key: "icon", label: "Icon (emoji)" },
          { type: "text", key: "title", label: "Title" },
          { type: "text", key: "detail", label: "Detail" },
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
    id: "pricing",
    label: "Pricing",
    toggleable: true,
    anchor: "pricing",
    fields: [
      { type: "text", key: "eyebrow", label: "Tag" },
      { type: "text", key: "title", label: "Heading" },
      { type: "textarea", key: "subtitle", label: "Description", rows: 2 },
      {
        type: "list",
        key: "plans",
        label: "Plans",
        itemLabel: "Plan",
        titleKey: "name",
        min: 1,
        max: 4,
        newItem: { name: "Plan", priceMonthly: "$0", priceYearly: "$0", desc: "For teams getting started.", feats: "Feature 1, Feature 2", btnText: "Get Started", featured: "" },
        fields: [
          { type: "text", key: "name", label: "Plan name" },
          { type: "text", key: "priceMonthly", label: "Monthly price" },
          { type: "text", key: "priceYearly", label: "Yearly price" },
          { type: "text", key: "desc", label: "Description" },
          { type: "textarea", key: "feats", label: "Features", rows: 4, hint: "One per line." },
          { type: "text", key: "btnText", label: "Button text" },
          { type: "text", key: "featured", label: "Featured label", hint: "Leave empty for a regular plan. E.g. 'POPULAR'." },
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
      { type: "text", key: "eyebrow", label: "Tag" },
      { type: "text", key: "title", label: "Heading" },
      {
        type: "list",
        key: "items",
        label: "Testimonials",
        itemLabel: "Testimonial",
        titleKey: "name",
        max: 6,
        newItem: { quote: "Great product!", name: "Name", role: "Role, Company", image: "" },
        fields: [
          { type: "textarea", key: "quote", label: "Quote", rows: 3 },
          { type: "text", key: "name", label: "Name" },
          { type: "text", key: "role", label: "Role" },
          { type: "image", key: "image", label: "Photo" },
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
      { type: "textarea", key: "text", label: "Description", rows: 2 },
      { type: "text", key: "button", label: "Button text" },
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
  enabled: { dashboard: true, stats: true, features: true, pricing: true, testimonials: true, cta: true, contact: true },
  values: {
    brand: { name: "Aurora", highlight: "AI", cta: "Start Free →", ctaUrl: "#pricing" },
    theme: { primary: "#6366f1", secondary: "#8b5cf6", accent: "#06b6d4", dark: "#0a0a1a", darkAlt: "#111127", text: "#a0a8c0" },
    hero: {
      badge: "Now in public beta — v2.0 released",
      title: "Build smarter with *AI‑powered* intelligence",
      subtitle: "Ship products 10x faster with Aurora's AI engine. Automate workflows, generate code, and deploy at scale — all from one unified platform.",
      btnPrimary: "Get Started Free →",
      btnSecondary: "Watch Demo",
      proof: "*2,400+* teams already building with Aurora",
    },
    dashboard: {
      barUrl: "aurora-dashboard.app",
      cards: [
        { label: "Total Revenue", value: "$48.2K", change: "↑ 24.5% vs last month" },
        { label: "Active Users", value: "12,847", change: "↑ 18.2% growth" },
        { label: "API Requests", value: "2.4M", change: "↑ 32.1% this week" },
      ],
      badges: [
        { icon: "⚡", title: "99.9% Uptime", detail: "Enterprise SLA" },
        { icon: "🔒", title: "SOC2 Certified", detail: "Bank-grade security" },
      ],
    },
    stats: {
      items: [
        { value: "2,400+", label: "Teams Worldwide" },
        { value: "99.9%", label: "Uptime SLA" },
        { value: "50M+", label: "API Calls / Day" },
        { value: "4.9★", label: "Average Rating" },
      ],
    },
    features: {
      eyebrow: "Features",
      title: "Everything you need to build at scale",
      subtitle: "Powerful primitives that handle the complexity so your team can focus on building remarkable products.",
      items: [
        { icon: "🧠", title: "AI Code Generation", desc: "Generate production-ready code in 50+ languages with context-aware AI that understands your codebase." },
        { icon: "⚡", title: "Edge Deployment", desc: "Deploy to 300+ edge locations globally. Sub-50ms cold starts with automatic scaling from zero." },
        { icon: "🔐", title: "Enterprise Security", desc: "SOC2 Type II, GDPR compliant, end-to-end encryption. Role-based access with SSO integration." },
        { icon: "📊", title: "Real-Time Analytics", desc: "Live dashboards with custom metrics, alerts, and anomaly detection powered by machine learning." },
        { icon: "🔌", title: "API-First Architecture", desc: "RESTful and GraphQL APIs with auto-generated SDKs for every major language and framework." },
        { icon: "🤝", title: "Team Collaboration", desc: "Real-time pair programming, code reviews, and shared environments with conflict-free merging." },
      ],
    },
    pricing: {
      eyebrow: "Pricing",
      title: "Simple, transparent pricing",
      subtitle: "Start free. Scale as you grow. No hidden fees, no surprises.",
      plans: [
        { name: "Starter", priceMonthly: "$0", priceYearly: "$0", desc: "Perfect for side projects and experiments.", feats: "5,000 API calls/month\n1 team member\nCommunity support\nBasic analytics", btnText: "Get Started Free", featured: "" },
        { name: "Pro", priceMonthly: "$49", priceYearly: "$39", desc: "For growing teams shipping fast.", feats: "100,000 API calls/month\nUp to 10 members\nPriority support\nAdvanced analytics\nCustom domains", btnText: "Start Pro Trial →", featured: "POPULAR" },
        { name: "Enterprise", priceMonthly: "Custom", priceYearly: "Custom", desc: "For organizations with advanced needs.", feats: "Unlimited API calls\nUnlimited members\nDedicated support\nSLA guarantee\nCustom integrations", btnText: "Contact Sales", featured: "" },
      ],
    },
    testimonials: {
      eyebrow: "Testimonials",
      title: "Loved by engineering teams",
      items: [
        { quote: "Aurora cut our deployment time from hours to minutes. The AI code generation alone saved us 200+ engineering hours last quarter.", name: "Sarah Chen", role: "VP Engineering, ScaleUp", image: U("photo-1494790108377-be9c29b29330", "w=80&h=80") },
        { quote: "The best developer platform we've used. API docs are incredible, the SDK just works, and their support team responds in minutes, not days.", name: "Marcus Reid", role: "CTO, DataFlow", image: U("photo-1507003211169-0a1dd7228f2d", "w=80&h=80") },
        { quote: "We migrated from three different tools to Aurora. One platform, zero context-switching. Our team velocity doubled in the first month.", name: "Priya Sharma", role: "Lead Developer, CloudNine", image: U("photo-1573496359142-b8d87734a5a2", "w=80&h=80") },
      ],
    },
    cta: { title: "Start building today", text: "10,000 free API calls. No credit card required. Deploy your first project in under 5 minutes.", button: "Get Started Free →" },
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
    footer: { copyright: "© 2026 Aurora AI Inc. All rights reserved. Privacy · Terms · Status" },
    seo: {
      title: "Aurora AI — AI-Powered Development Platform",
      description: "Ship products 10x faster with Aurora's AI engine. Automate workflows, generate code, and deploy at scale.",
    },
  },
};

const presets = {
  section: "theme",
  items: [
    { name: "Indigo", swatch: ["#0a0a1a", "#6366f1"], values: { primary: "#6366f1", secondary: "#8b5cf6", accent: "#06b6d4", dark: "#0a0a1a", darkAlt: "#111127", text: "#a0a8c0" } },
    { name: "Emerald", swatch: ["#0a1a14", "#10b981"], values: { primary: "#10b981", secondary: "#059669", accent: "#34d399", dark: "#0a1a14", darkAlt: "#0f2920", text: "#94b8a8" } },
    { name: "Rose", swatch: ["#1a0a14", "#f43f5e"], values: { primary: "#f43f5e", secondary: "#e11d48", accent: "#fb7185", dark: "#1a0a14", darkAlt: "#271120", text: "#b8949c" } },
    { name: "Amber", swatch: ["#1a150a", "#f59e0b"], values: { primary: "#f59e0b", secondary: "#d97706", accent: "#fbbf24", dark: "#1a150a", darkAlt: "#272010", text: "#b8ad94" } },
    { name: "Cyan", swatch: ["#0a1a1e", "#06b6d4"], values: { primary: "#06b6d4", secondary: "#0891b2", accent: "#22d3ee", dark: "#0a1a1e", darkAlt: "#0f2730", text: "#94b5b8" } },
    { name: "Purple", swatch: ["#150a1a", "#a855f7"], values: { primary: "#a855f7", secondary: "#9333ea", accent: "#c084fc", dark: "#150a1a", darkAlt: "#1e1127", text: "#ac94b8" } },
  ],
};

const starSvg = `<svg viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`;
const stars5 = Array(5).fill(starSvg).join("");

function gradientText(s: string) {
  return esc(s).replace(/\*(.+?)\*/g, '<span class="gradient">$1</span>');
}

function proofText(s: string) {
  return esc(s).replace(/\*(.+?)\*/g, "<strong>$1</strong>");
}

function lines(s: string) {
  return s.split("\n").map((l) => l.trim()).filter(Boolean);
}

function render(c: Content, options: Parameters<EditableTemplate["render"]>[1] = {}) {
  const r = reader(c);
  const s = r.str;
  const d = defaults.values;
  const col = (key: string) => safeColor(s("theme", key), d.theme[key] as string);
  const primary = col("primary");
  const secondary = col("secondary");
  const accent = col("accent");
  const dark = col("dark");
  const darkAlt = col("darkAlt");
  const text = col("text");
  const name = s("brand", "name") || "Aurora";
  const highlight = s("brand", "highlight");
  const cta = esc(s("brand", "cta") || "Start Free →");
  const ctaUrl = safeUrl(s("brand", "ctaUrl"), "#pricing");

  const navLinks = [
    ["features", "Features"],
    ["pricing", "Pricing"],
    ["testimonials", "Reviews"],
  ].filter(([id]) => r.on(id)).map(([id, label]) => `<a href="#${id}">${label}</a>`).join("");

  const dashCards = r.list("dashboard", "cards").slice(0, 4);
  const dashBadges = r.list("dashboard", "badges").slice(0, 3);
  const statsItems = r.list("stats", "items").slice(0, 4);
  const features = r.list("features", "items");
  const plans = r.list("pricing", "plans");
  const testimonials = r.list("testimonials", "items");
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
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
${previewScript(options?.preview)}
${revealScript}
<style>
:root{--pri:${primary};--sec:${secondary};--acc:${accent};--dark:${dark};--darkAlt:${darkAlt};--text:${text}}
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:var(--dark);color:var(--text);overflow-x:hidden}a{text-decoration:none;color:inherit}
:focus-visible{outline:2px solid var(--pri);outline-offset:3px}
${revealCss}
nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:1.2rem 5%;display:flex;align-items:center;justify-content:space-between;backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);background:color-mix(in srgb,var(--dark) 80%,transparent);border-bottom:1px solid rgba(255,255,255,.06)}
.logo{font-size:1.4rem;font-weight:800;color:#fff;letter-spacing:-.5px}.logo span{color:var(--pri)}
nav ul{list-style:none;display:flex;gap:2rem}
nav ul a{font-size:.85rem;font-weight:500;opacity:.6;transition:.3s}nav ul a:hover{opacity:1;color:var(--pri)}
.nav-cta{background:var(--pri);color:#fff;padding:.6rem 1.6rem;border-radius:10px;font-weight:600;font-size:.85rem;transition:.3s;border:none;cursor:pointer}
.nav-cta:hover{box-shadow:0 8px 30px color-mix(in srgb,var(--pri) 35%,transparent);transform:translateY(-2px)}
.hero{min-height:100vh;min-height:100svh;position:relative;display:flex;align-items:center;padding:8rem 5% 4rem;overflow:hidden}
.hero-mesh{position:absolute;inset:0;z-index:0}
.hero-mesh .orb{position:absolute;border-radius:50%;filter:blur(100px);opacity:.3;animation:float 8s ease-in-out infinite}
.orb-1{width:600px;height:600px;background:var(--pri);top:-15%;right:10%}.orb-2{width:450px;height:450px;background:var(--sec);bottom:-10%;left:-5%;animation-delay:2s}
.orb-3{width:350px;height:350px;background:var(--acc);top:40%;right:-10%;animation-delay:4s}.orb-4{width:250px;height:250px;background:var(--pri);top:60%;left:30%;animation-delay:6s;opacity:.15}
@keyframes float{0%,100%{transform:translate(0,0) scale(1)}25%{transform:translate(30px,-20px) scale(1.05)}50%{transform:translate(-20px,30px) scale(.95)}75%{transform:translate(20px,10px) scale(1.02)}}
.hero-inner{max-width:1200px;margin:0 auto;position:relative;z-index:1;width:100%}
.hero-badge{display:inline-flex;align-items:center;gap:.5rem;background:color-mix(in srgb,var(--pri) 10%,transparent);border:1px solid color-mix(in srgb,var(--pri) 20%,transparent);padding:.5rem 1.2rem;border-radius:50px;font-size:.75rem;font-weight:600;color:var(--pri);margin-bottom:2rem;letter-spacing:.5px}
.hero-badge .dot{width:6px;height:6px;border-radius:50%;background:var(--pri);animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(1.5)}}
.hero h1{font-size:clamp(2.5rem,5.5vw,4.5rem);font-weight:900;line-height:1.05;color:#fff;margin-bottom:1.5rem;letter-spacing:-2px}
.hero h1 .gradient{background:linear-gradient(135deg,var(--pri),var(--acc));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero .sub{font-size:1.15rem;line-height:1.8;opacity:.5;max-width:550px;margin-bottom:2.5rem}
.hero-actions{display:flex;gap:1rem;flex-wrap:wrap;margin-bottom:3rem}
.btn-primary{background:linear-gradient(135deg,var(--pri),var(--sec));color:#fff;padding:1rem 2.5rem;border-radius:14px;font-weight:700;font-size:.95rem;border:none;cursor:pointer;transition:.3s;display:inline-flex;align-items:center;gap:.5rem}
.btn-primary:hover{transform:translateY(-3px);box-shadow:0 20px 50px color-mix(in srgb,var(--pri) 30%,transparent)}
.btn-ghost{background:rgba(255,255,255,.05);color:#fff;padding:1rem 2.5rem;border-radius:14px;font-weight:600;font-size:.95rem;border:1px solid rgba(255,255,255,.1);cursor:pointer;transition:.3s;display:inline-flex;align-items:center;gap:.5rem}
.btn-ghost:hover{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.2)}
.social-proof{display:flex;align-items:center;gap:1rem}.social-proof p{font-size:.85rem;opacity:.5}.social-proof strong{color:#fff;opacity:1}
.hero-visual{margin-top:4rem;position:relative;max-width:1000px;margin-left:auto;margin-right:auto}
.dashboard{background:var(--darkAlt);border:1px solid rgba(255,255,255,.08);border-radius:20px;overflow:hidden;box-shadow:0 40px 80px rgba(0,0,0,.5),0 0 0 1px rgba(255,255,255,.05);transform:perspective(1200px) rotateX(5deg);transition:transform .6s ease}
.dashboard:hover{transform:perspective(1200px) rotateX(0deg)}
.dash-bar{padding:.8rem 1.2rem;background:var(--darkAlt);border-bottom:1px solid rgba(255,255,255,.06);display:flex;align-items:center;gap:.5rem}
.dash-dot{width:10px;height:10px;border-radius:50%;background:rgba(255,255,255,.15)}.dash-dot:nth-child(1){background:#ff5f57}.dash-dot:nth-child(2){background:#febc2e}.dash-dot:nth-child(3){background:#28c840}
.dash-bar span{margin-left:.8rem;font-size:.7rem;opacity:.3;font-family:monospace}
.dash-body{padding:2rem;display:grid;grid-template-columns:repeat(var(--cols,3),1fr);gap:1rem}
.dash-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:14px;padding:1.5rem}
.dash-card .label{font-size:.7rem;opacity:.4;text-transform:uppercase;letter-spacing:1px;margin-bottom:.5rem}.dash-card .value{font-size:1.8rem;font-weight:800;color:#fff}
.dash-card .change{font-size:.75rem;color:var(--pri);margin-top:.25rem;font-weight:600}
.dash-chart{grid-column:1/-1;height:120px;background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.06);border-radius:14px;position:relative;overflow:hidden}
.dash-chart svg{width:100%;height:100%}
.float-badge{position:absolute;z-index:2;background:color-mix(in srgb,var(--darkAlt) 93%,transparent);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:.8rem 1.2rem;display:flex;align-items:center;gap:.6rem;box-shadow:0 20px 50px rgba(0,0,0,.4);animation:bob 4s ease-in-out infinite}
.float-badge.fb0{top:-20px;right:-30px}.float-badge.fb1{bottom:40px;left:-40px;animation-delay:2s}.float-badge.fb2{top:40%;right:-30px;animation-delay:4s}
@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
.float-badge .fi{width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,color-mix(in srgb,var(--pri) 20%,transparent),color-mix(in srgb,var(--sec) 14%,transparent));display:flex;align-items:center;justify-content:center;font-size:.9rem}
.float-badge span{font-weight:700;color:#fff;font-size:.85rem}.float-badge small{display:block;font-size:.65rem;opacity:.5;font-weight:400}
.stats-section{padding:5rem 5%;border-top:1px solid rgba(255,255,255,.04);border-bottom:1px solid rgba(255,255,255,.04);background:var(--darkAlt)}
.stats-grid{max-width:1000px;margin:0 auto;display:grid;grid-template-columns:repeat(var(--n,4),1fr);gap:2rem;text-align:center}
.stat .num{font-size:3rem;font-weight:900;background:linear-gradient(135deg,var(--pri),var(--acc));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.stat .lbl{font-size:.85rem;opacity:.4;margin-top:.3rem}
.features-section{padding:7rem 5%;max-width:1200px;margin:0 auto}
.section-tag{display:inline-block;background:color-mix(in srgb,var(--pri) 10%,transparent);color:var(--pri);padding:.45rem 1.2rem;border-radius:50px;font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:1rem;border:1px solid color-mix(in srgb,var(--pri) 16%,transparent)}
.section-title{font-size:clamp(2rem,4vw,3rem);font-weight:800;color:#fff;margin-bottom:.5rem;letter-spacing:-1px}
.section-sub{opacity:.45;font-size:1.05rem;margin-bottom:3.5rem;max-width:520px}
.feat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem}
.feat{background:var(--darkAlt);border:1px solid rgba(255,255,255,.05);border-radius:20px;padding:2.2rem;transition:all .4s;position:relative;overflow:hidden}
.feat::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--pri),var(--acc));transform:scaleX(0);transition:transform .4s;transform-origin:left}
.feat:hover::before{transform:scaleX(1)}.feat:hover{border-color:color-mix(in srgb,var(--pri) 20%,transparent);transform:translateY(-5px);box-shadow:0 20px 40px rgba(0,0,0,.3)}
.feat-icon{width:52px;height:52px;border-radius:14px;background:linear-gradient(135deg,color-mix(in srgb,var(--pri) 14%,transparent),color-mix(in srgb,var(--sec) 8%,transparent));display:flex;align-items:center;justify-content:center;margin-bottom:1.2rem;font-size:1.3rem}
.feat h3{font-size:1.1rem;font-weight:700;color:#fff;margin-bottom:.5rem}.feat p{font-size:.88rem;line-height:1.7;opacity:.45}
.pricing-section{padding:7rem 5%;background:linear-gradient(180deg,var(--dark),var(--darkAlt))}.pricing-head{text-align:center;margin-bottom:3.5rem}
.toggle-wrap{display:flex;align-items:center;justify-content:center;gap:1rem;margin-top:1.5rem}
.toggle-wrap span{font-size:.9rem;opacity:.5}.toggle-wrap span.active{opacity:1;color:#fff;font-weight:600}
.toggle{width:56px;height:30px;border-radius:50px;background:rgba(255,255,255,.1);position:relative;cursor:pointer;transition:.3s;border:none}.toggle.on{background:var(--pri)}
.toggle::after{content:'';position:absolute;top:3px;left:3px;width:24px;height:24px;border-radius:50%;background:#fff;transition:.3s}.toggle.on::after{left:29px}
.plans{display:grid;grid-template-columns:repeat(var(--pcols,3),1fr);gap:1.5rem;max-width:1000px;margin:0 auto}
.plan{background:var(--darkAlt);border:1px solid rgba(255,255,255,.06);border-radius:20px;padding:2.5rem;transition:.3s;position:relative}
.plan.featured{border-color:color-mix(in srgb,var(--pri) 28%,transparent);box-shadow:0 0 60px color-mix(in srgb,var(--pri) 10%,transparent)}
.plan.featured::before{content:attr(data-badge);position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,var(--pri),var(--sec));color:#fff;font-size:.65rem;font-weight:700;padding:.4rem 1.2rem;border-radius:50px;letter-spacing:1px}
.plan-name{font-size:.85rem;font-weight:600;color:var(--pri);text-transform:uppercase;letter-spacing:1px;margin-bottom:.5rem}
.plan-price{font-size:3.5rem;font-weight:900;color:#fff;line-height:1}.plan-price span{font-size:1rem;opacity:.4;font-weight:400}
.plan-desc{font-size:.85rem;opacity:.4;margin:1rem 0 1.5rem}.plan ul{list-style:none;margin-bottom:2rem}
.plan li{font-size:.85rem;padding:.5rem 0;border-bottom:1px solid rgba(255,255,255,.04);display:flex;align-items:center;gap:.5rem;opacity:.6}
.plan li::before{content:'✓';color:var(--pri);font-weight:700;font-size:.75rem}
.plan-btn{width:100%;padding:.9rem;border-radius:12px;font-weight:700;font-size:.9rem;border:none;cursor:pointer;transition:.3s}
.plan-btn.solid{background:linear-gradient(135deg,var(--pri),var(--sec));color:#fff}.plan-btn.solid:hover{box-shadow:0 15px 40px color-mix(in srgb,var(--pri) 30%,transparent);transform:translateY(-2px)}
.plan-btn.outline{background:transparent;border:1px solid rgba(255,255,255,.15);color:#fff}.plan-btn.outline:hover{border-color:var(--pri);color:var(--pri)}
.testi-section{padding:7rem 5%;max-width:1200px;margin:0 auto}.testi-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.5rem}
.testi{background:var(--darkAlt);border:1px solid rgba(255,255,255,.05);border-radius:20px;padding:2rem;transition:.3s}
.testi:hover{border-color:color-mix(in srgb,var(--pri) 14%,transparent);transform:translateY(-3px)}
.testi-stars{display:flex;gap:2px;margin-bottom:1rem}.testi-stars svg{width:16px;height:16px;fill:var(--acc)}
.testi p{font-size:.9rem;line-height:1.8;opacity:.55;margin-bottom:1.5rem;font-style:italic}
.testi-author{display:flex;align-items:center;gap:.8rem;border-top:1px solid rgba(255,255,255,.06);padding-top:1rem}
.testi-author img{width:40px;height:40px;border-radius:50%;object-fit:cover}
.testi-author .name{font-size:.85rem;font-weight:600;color:#fff}.testi-author .role{font-size:.7rem;opacity:.4}
.cta-section{padding:7rem 5%;text-align:center}
.cta-box{max-width:700px;margin:0 auto;background:linear-gradient(135deg,color-mix(in srgb,var(--pri) 10%,transparent),color-mix(in srgb,var(--sec) 7%,transparent));border:1px solid color-mix(in srgb,var(--pri) 16%,transparent);border-radius:24px;padding:4rem 3rem;position:relative;overflow:hidden}
.cta-box::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 30% 50%,color-mix(in srgb,var(--pri) 10%,transparent),transparent 60%);z-index:0}
.cta-box>*{position:relative;z-index:1}
.cta-box h2{font-size:2.5rem;font-weight:800;color:#fff;margin-bottom:1rem;letter-spacing:-1px}
.cta-box p{opacity:.5;margin-bottom:2rem;max-width:450px;margin-left:auto;margin-right:auto}
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
.cf-btn{width:100%;background:linear-gradient(135deg,var(--pri),var(--sec));color:#fff;padding:1rem;border-radius:12px;font-weight:700;font-size:.95rem;border:none;cursor:pointer;transition:.3s}
.cf-btn:hover{box-shadow:0 15px 40px color-mix(in srgb,var(--pri) 30%,transparent);transform:translateY(-2px)}
.social-row{display:flex;gap:1rem;margin-top:2rem}
.social-row a{width:42px;height:42px;border-radius:12px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;transition:.3s;font-size:.9rem}
.social-row a:hover{background:color-mix(in srgb,var(--pri) 14%,transparent);border-color:color-mix(in srgb,var(--pri) 28%,transparent)}
footer{padding:3rem 5%;border-top:1px solid rgba(255,255,255,.06);text-align:center;font-size:.8rem;opacity:.3}
@media(max-width:768px){nav ul{display:none}.hero h1{font-size:2.5rem}.dash-body{grid-template-columns:1fr}.stats-grid{grid-template-columns:repeat(2,1fr)}.feat-grid,.plans,.testi-grid{grid-template-columns:1fr}.plan.featured{order:-1}.contact-inner{grid-template-columns:1fr}.cf-row{grid-template-columns:1fr}}
</style>
</head>
<body>
<nav id="nav">
<div class="logo">${esc(name)}${highlight ? `<span>${esc(highlight)}</span>` : ""}</div>
<ul>${navLinks}${r.on("contact") ? '<a href="#contact">Contact</a>' : ""}</ul>
<a href="${ctaUrl}" class="nav-cta">${cta}</a>
</nav>

<section class="hero" id="top">
<div class="hero-mesh"><div class="orb orb-1"></div><div class="orb orb-2"></div><div class="orb orb-3"></div><div class="orb orb-4"></div></div>
<div class="hero-inner">
${s("hero", "badge") ? `<div class="hero-badge rv"><span class="dot"></span> ${esc(s("hero", "badge"))}</div>` : ""}
<h1 class="rv d1">${gradientText(s("hero", "title"))}</h1>
<p class="sub rv d2">${esc(s("hero", "subtitle"))}</p>
<div class="hero-actions rv d3">
<button class="btn-primary">${esc(s("hero", "btnPrimary"))}</button>
${s("hero", "btnSecondary") ? `<button class="btn-ghost">${esc(s("hero", "btnSecondary"))}</button>` : ""}
</div>
${s("hero", "proof") ? `<div class="social-proof rv"><p>${proofText(s("hero", "proof"))}</p></div>` : ""}

${r.on("dashboard") ? `<div class="hero-visual rv">
<div class="dashboard">
<div class="dash-bar"><span class="dash-dot"></span><span class="dash-dot"></span><span class="dash-dot"></span><span>${esc(s("dashboard", "barUrl"))}</span></div>
<div class="dash-body" style="--cols:${dashCards.length}">${dashCards.map((card) => `<div class="dash-card"><div class="label">${esc(card.label)}</div><div class="value">${esc(card.value)}</div><div class="change">${esc(card.change)}</div></div>`).join("")}
<div class="dash-chart"><svg viewBox="0 0 800 120" preserveAspectRatio="none"><defs><linearGradient id="cg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="var(--pri)" stop-opacity=".3"/><stop offset="100%" stop-color="var(--pri)" stop-opacity="0"/></linearGradient></defs><path d="M0,100 C100,80 150,40 250,60 C350,80 400,20 500,35 C600,50 700,15 800,30 L800,120 L0,120Z" fill="url(#cg)"/><path d="M0,100 C100,80 150,40 250,60 C350,80 400,20 500,35 C600,50 700,15 800,30" fill="none" stroke="var(--pri)" stroke-width="2.5"/></svg></div>
</div>
</div>
${dashBadges.map((b, i) => `<div class="float-badge fb${i}"><div class="fi">${esc(b.icon)}</div><div><span>${esc(b.title)}</span><small>${esc(b.detail)}</small></div></div>`).join("")}
</div>` : ""}
</div>
</section>

${r.on("stats") && statsItems.length ? `<section class="stats-section" id="stats">
<div class="stats-grid" style="--n:${statsItems.length}">${statsItems.map((st, i) => `<div class="stat rv${i ? ` d${i}` : ""}"><div class="num">${esc(st.value)}</div><div class="lbl">${esc(st.label)}</div></div>`).join("")}</div>
</section>` : ""}

${r.on("features") && features.length ? `<section class="features-section" id="features">
<div class="section-tag rv">${esc(s("features", "eyebrow"))}</div>
<h2 class="section-title rv">${esc(s("features", "title"))}</h2>
<p class="section-sub rv">${esc(s("features", "subtitle"))}</p>
<div class="feat-grid">${features.map((f, i) => `<div class="feat rv${i % 2 ? ` d${i % 5}` : ""}"><div class="feat-icon">${esc(f.icon)}</div><h3>${esc(f.title)}</h3><p>${esc(f.desc)}</p></div>`).join("")}</div>
</section>` : ""}

${r.on("pricing") && plans.length ? `<section class="pricing-section" id="pricing">
<div class="pricing-head">
<div class="section-tag rv">${esc(s("pricing", "eyebrow"))}</div>
<h2 class="section-title rv" style="text-align:center">${esc(s("pricing", "title"))}</h2>
<p class="section-sub rv" style="text-align:center;margin-left:auto;margin-right:auto">${esc(s("pricing", "subtitle"))}</p>
<div class="toggle-wrap rv"><span class="active" id="mo-label">Monthly</span><button class="toggle" id="pricing-toggle"></button><span id="yr-label">Yearly <span style="color:var(--pri);font-weight:700">-20%</span></span></div>
</div>
<div class="plans" style="--pcols:${Math.min(plans.length, 4)}">${plans.map((p, i) => {
  const isFeatured = !!p.featured;
  const feats = lines(p.feats);
  return `<div class="plan${isFeatured ? " featured" : ""} rv${i ? ` d${i}` : ""}"${isFeatured ? ` data-badge="${esc(p.featured)}"` : ""}>
<div class="plan-name">${esc(p.name)}</div>
<div class="plan-price"><span class="price-mo">${esc(p.priceMonthly)}</span><span class="price-yr" style="display:none">${esc(p.priceYearly)}</span>${p.priceMonthly !== "Custom" ? ' <span>/month</span>' : ""}</div>
<div class="plan-desc">${esc(p.desc)}</div>
<ul>${feats.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
<button class="plan-btn ${isFeatured ? "solid" : "outline"}">${esc(p.btnText)}</button>
</div>`;
}).join("")}</div>
</section>` : ""}

${r.on("testimonials") && testimonials.length ? `<section class="testi-section" id="testimonials">
<div style="text-align:center;margin-bottom:3.5rem">
<div class="section-tag rv">${esc(s("testimonials", "eyebrow"))}</div>
<h2 class="section-title rv" style="text-align:center">${esc(s("testimonials", "title"))}</h2>
</div>
<div class="testi-grid">${testimonials.map((t, i) => `<div class="testi rv${i ? ` d${i}` : ""}">
<div class="testi-stars">${stars5}</div>
<p>"${esc(t.quote)}"</p>
<div class="testi-author">${safeUrl(t.image) !== "#" ? `<img src="${safeUrl(t.image)}" alt="${esc(t.name)}" loading="lazy">` : ""}<div><div class="name">${esc(t.name)}</div><div class="role">${esc(t.role)}</div></div></div>
</div>`).join("")}</div>
</section>` : ""}

${r.on("cta") ? `<section class="cta-section" id="cta-section">
<div class="cta-box rv">
<h2>${esc(s("cta", "title"))}</h2>
<p>${esc(s("cta", "text"))}</p>
<button class="btn-primary" style="font-size:1.05rem;padding:1.1rem 3rem">${esc(s("cta", "button"))}</button>
</div>
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

<footer><p>${esc(s("footer", "copyright"))}</p></footer>

<script>
var tog=document.getElementById('pricing-toggle');
if(tog)tog.addEventListener('click',function(){this.classList.toggle('on');document.querySelectorAll('.price-mo').forEach(function(e){e.style.display=tog.classList.contains('on')?'none':''});document.querySelectorAll('.price-yr').forEach(function(e){e.style.display=tog.classList.contains('on')?'':'none'});document.getElementById('mo-label').classList.toggle('active');document.getElementById('yr-label').classList.toggle('active')});
</script>
</body>
</html>`;
}

export const saasAuroraAi: EditableTemplate = {
  id: "saas-aurora-ai",
  name: "Aurora — AI Platform",
  schema,
  defaults,
  presets,
  render,
  checks: (c) => {
    const r = reader(c);
    const out: { section: string; message: string }[] = [];
    if (!r.str("seo", "description").trim())
      out.push({ section: "seo", message: "Add a search description so your page looks good on Google." });
    if (r.on("pricing") && r.list("pricing", "plans").length === 0)
      out.push({ section: "pricing", message: "Add at least one pricing plan." });
    return out;
  },
};
