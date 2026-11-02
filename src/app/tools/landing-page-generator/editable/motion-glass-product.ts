import type { Content, EditableTemplate, Section } from "../editor/types";
import { csv, esc, previewScript, reader, revealCss, revealScript, safeColor, safeUrl } from "../editor/html";

const schema: Section[] = [
  {
    id: "brand",
    label: "Brand",
    description: "Company name, tagline and primary CTA.",
    fields: [
      { type: "text", key: "name", label: "Brand name" },
      { type: "text", key: "tagline", label: "Nav tagline", placeholder: "3D Product Experience" },
      { type: "text", key: "cta", label: "CTA button text" },
      { type: "text", key: "ctaUrl", label: "CTA link", placeholder: "#pricing" },
    ],
  },
  {
    id: "theme",
    label: "Colors",
    fields: [
      { type: "color", key: "primary", label: "Primary glow" },
      { type: "color", key: "secondary", label: "Secondary glow" },
      { type: "color", key: "accent", label: "Accent" },
      { type: "color", key: "bg", label: "Background" },
      { type: "color", key: "cardBg", label: "Glass card" },
      { type: "color", key: "text", label: "Body text" },
    ],
  },
  {
    id: "hero",
    label: "Hero",
    anchor: "top",
    fields: [
      { type: "text", key: "badge", label: "Badge", placeholder: "✦ Next-gen 3D Experience" },
      { type: "textarea", key: "title", label: "Headline", rows: 2, hint: "Wrap words in *stars* for gradient text." },
      { type: "textarea", key: "subtitle", label: "Subtitle", rows: 3 },
      { type: "text", key: "btn1", label: "Primary button" },
      { type: "text", key: "btn2", label: "Secondary button" },
      { type: "image", key: "productImg", label: "Product image", hint: "Shown as 3D floating card." },
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
        label: "Logos",
        itemLabel: "Company",
        titleKey: "name",
        min: 1,
        max: 8,
        newItem: { name: "Company" },
        fields: [
          { type: "text", key: "name", label: "Company name" },
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
        newItem: { icon: "◆", title: "New feature", desc: "Describe this feature here." },
        fields: [
          { type: "text", key: "icon", label: "Icon (emoji)" },
          { type: "text", key: "title", label: "Title" },
          { type: "textarea", key: "desc", label: "Description", rows: 2 },
        ],
      },
    ],
  },
  {
    id: "showcase",
    label: "3D Showcase",
    toggleable: true,
    anchor: "showcase",
    fields: [
      { type: "text", key: "eyebrow", label: "Tag" },
      { type: "text", key: "title", label: "Heading" },
      { type: "textarea", key: "desc", label: "Description", rows: 2 },
      {
        type: "list",
        key: "cards",
        label: "Showcase cards",
        itemLabel: "Card",
        titleKey: "title",
        min: 1,
        max: 3,
        newItem: { title: "Feature", desc: "Description", metric: "99%", metricLabel: "Performance" },
        fields: [
          { type: "text", key: "title", label: "Title" },
          { type: "textarea", key: "desc", label: "Description", rows: 2 },
          { type: "text", key: "metric", label: "Big metric" },
          { type: "text", key: "metricLabel", label: "Metric label" },
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
        max: 3,
        newItem: { name: "Plan", price: "$0", period: "/month", desc: "For getting started.", feats: "Feature 1, Feature 2, Feature 3", btnText: "Get Started", featured: "" },
        fields: [
          { type: "text", key: "name", label: "Plan name" },
          { type: "text", key: "price", label: "Price" },
          { type: "text", key: "period", label: "Period" },
          { type: "text", key: "desc", label: "Description" },
          { type: "textarea", key: "feats", label: "Features (comma separated)", rows: 3 },
          { type: "text", key: "btnText", label: "Button text" },
          { type: "text", key: "featured", label: "Featured label", hint: "Leave empty for regular. E.g. 'POPULAR'." },
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
        max: 4,
        newItem: { quote: "Amazing product!", name: "Name", role: "Role, Company" },
        fields: [
          { type: "textarea", key: "quote", label: "Quote", rows: 3 },
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
      { type: "text", key: "title", label: "Heading" },
      { type: "textarea", key: "text", label: "Description", rows: 2 },
      { type: "text", key: "button", label: "Button text" },
    ],
  },
  {
    id: "footer",
    label: "Footer",
    fields: [
      { type: "text", key: "copyright", label: "Copyright" },
      { type: "text", key: "links", label: "Footer links (comma separated)", placeholder: "Privacy, Terms, Contact" },
    ],
  },
  {
    id: "seo",
    label: "Page settings (SEO)",
    description: "How the page appears in search engines and the browser tab.",
    fields: [
      { type: "text", key: "title", label: "Page title" },
      { type: "textarea", key: "description", label: "Search description", rows: 3 },
    ],
  },
];

const defaults: Content = {
  enabled: { logos: true, features: true, showcase: true, stats: true, pricing: true, testimonials: true, cta: true },
  values: {
    brand: { name: "Prism", tagline: "3D Product Experience", cta: "Start Free →", ctaUrl: "#pricing" },
    theme: { primary: "#8b5cf6", secondary: "#06b6d4", accent: "#f472b6", bg: "#050510", cardBg: "rgba(255,255,255,0.05)", text: "#94a3b8" },
    hero: {
      badge: "✦ Next-gen 3D Experience",
      title: "Design in *three dimensions*",
      subtitle: "Create stunning product showcases with real-time 3D glass effects, depth animations, and immersive interactions that captivate your audience.",
      btn1: "Launch App →",
      btn2: "Watch Demo",
      productImg: "",
    },
    logos: { title: "Trusted by innovative teams", items: [{ name: "Vercel" }, { name: "Linear" }, { name: "Raycast" }, { name: "Resend" }, { name: "Cal.com" }] as unknown as string },
    features: {
      eyebrow: "Capabilities",
      title: "Built for the future",
      subtitle: "Every feature designed to push the boundaries of web experience.",
      items: [
        { icon: "◆", title: "3D Transforms", desc: "Real-time CSS 3D perspective transforms with GPU acceleration." },
        { icon: "◇", title: "Glass Morphism", desc: "Multi-layer frosted glass with dynamic backdrop blur." },
        { icon: "△", title: "Particle System", desc: "Floating ambient particles that respond to scroll position." },
        { icon: "○", title: "Depth Layers", desc: "Parallax depth system with configurable layer offsets." },
        { icon: "□", title: "Glow Effects", desc: "Dynamic gradient glow that follows cursor movement." },
        { icon: "⬡", title: "Smooth Motion", desc: "60fps animations powered by CSS transforms and will-change." },
      ] as unknown as string,
    },
    showcase: {
      eyebrow: "Showcase",
      title: "Experience the depth",
      desc: "Interactive 3D cards that tilt, glow, and reveal on hover.",
      cards: [
        { title: "Rendering Engine", desc: "Hardware-accelerated 3D transforms at 120fps.", metric: "120", metricLabel: "FPS" },
        { title: "Glass Layers", desc: "Multi-layer frosted glass with live blur.", metric: "8", metricLabel: "Layers" },
        { title: "Load Time", desc: "Zero-dependency, pure CSS animations.", metric: "0.3s", metricLabel: "First Paint" },
      ] as unknown as string,
    },
    stats: { items: [{ value: "50K+", label: "Users worldwide" }, { value: "99.9%", label: "Uptime" }, { value: "120+", label: "Countries" }, { value: "4.9★", label: "Rating" }] as unknown as string },
    pricing: {
      eyebrow: "Pricing",
      title: "Simple pricing",
      subtitle: "Start for free. Scale when you need.",
      plans: [
        { name: "Starter", price: "$0", period: "/month", desc: "For personal projects", feats: "3 Projects, Basic 3D, Community support", btnText: "Get Started", featured: "" },
        { name: "Pro", price: "$29", period: "/month", desc: "For growing teams", feats: "Unlimited projects, Advanced 3D, Priority support, Custom themes, API access", btnText: "Go Pro →", featured: "POPULAR" },
        { name: "Enterprise", price: "$99", period: "/month", desc: "For large organizations", feats: "Everything in Pro, Custom pipeline, Dedicated support, SLA, White label", btnText: "Contact Sales", featured: "" },
      ] as unknown as string,
    },
    testimonials: {
      eyebrow: "Testimonials",
      title: "Loved by creators",
      items: [
        { quote: "The 3D effects are unlike anything I've seen in a web tool. Our conversion rate jumped 40%.", name: "Alex Chen", role: "CEO, PixelForge" },
        { quote: "Glass morphism done right. Our product pages went from flat to absolutely stunning.", name: "Sarah Kim", role: "Design Lead, Luminary" },
        { quote: "The performance is insane — 60fps on mobile. We replaced our entire showcase.", name: "Marcus Reed", role: "CTO, NovaTech" },
      ] as unknown as string,
    },
    cta: { title: "Ready to go 3D?", text: "Join thousands of creators building immersive web experiences.", button: "Start Building Free →" },
    footer: { copyright: "© 2025 Prism. All rights reserved.", links: "Privacy, Terms, Contact" },
    seo: { title: "Prism — 3D Product Experience Platform", description: "Create stunning product showcases with real-time 3D glass effects and immersive interactions." },
  },
};

const presets = {
  section: "theme",
  items: [
    { name: "Violet Frost", swatch: ["#8b5cf6", "#06b6d4", "#f472b6"], values: { primary: "#8b5cf6", secondary: "#06b6d4", accent: "#f472b6", bg: "#050510", cardBg: "rgba(255,255,255,0.05)", text: "#94a3b8" } },
    { name: "Emerald Night", swatch: ["#10b981", "#06b6d4", "#fbbf24"], values: { primary: "#10b981", secondary: "#06b6d4", accent: "#fbbf24", bg: "#020c0b", cardBg: "rgba(255,255,255,0.04)", text: "#6ee7b7" } },
    { name: "Rose Gold", swatch: ["#f43f5e", "#fb923c", "#fbbf24"], values: { primary: "#f43f5e", secondary: "#fb923c", accent: "#fbbf24", bg: "#0c0506", cardBg: "rgba(255,255,255,0.05)", text: "#fda4af" } },
    { name: "Arctic Blue", swatch: ["#3b82f6", "#8b5cf6", "#06b6d4"], values: { primary: "#3b82f6", secondary: "#8b5cf6", accent: "#06b6d4", bg: "#030712", cardBg: "rgba(255,255,255,0.04)", text: "#93c5fd" } },
    { name: "Amber Glow", swatch: ["#f59e0b", "#ef4444", "#ec4899"], values: { primary: "#f59e0b", secondary: "#ef4444", accent: "#ec4899", bg: "#0c0a04", cardBg: "rgba(255,255,255,0.05)", text: "#fcd34d" } },
  ],
};

function render(content: Content, options?: { preview?: { initialScroll: number; instant: boolean } }) {
  const r = reader(content);
  const s = r.str;
  const P = (k: string) => safeColor(s("theme", k), "#8b5cf6");
  const feats = r.list("features", "items");
  const cards = r.list("showcase", "cards");
  const stats = r.list("stats", "items");
  const plans = r.list("pricing", "plans");
  const testimonials = r.list("testimonials", "items");
  const logos = r.list("logos", "items");
  const footerLinks = csv(s("footer", "links"));

  const gradTitle = (t: string) => esc(t).replace(/\*(.+?)\*/g, `<span class="grad-text">$1</span>`);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(s("seo", "title"))}</title>
<meta name="description" content="${esc(s("seo", "description"))}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
${previewScript(options?.preview)}
<style>
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{
--p:${P("primary")};--s:${P("secondary")};--a:${P("accent")};
--bg:${safeColor(s("theme","bg"),"#050510")};
--card:${s("theme","cardBg")||"rgba(255,255,255,0.05)"};
--txt:${safeColor(s("theme","text"),"#94a3b8")};
}
html{scroll-behavior:smooth}
body{font-family:'Inter',system-ui,sans-serif;background:var(--bg);color:var(--txt);line-height:1.7;overflow-x:hidden}

/* ─── Gradient animated background orbs ─── */
.orb{position:fixed;border-radius:50%;filter:blur(120px);opacity:.15;pointer-events:none;z-index:0}
.orb-1{width:600px;height:600px;background:var(--p);top:-200px;left:-100px;animation:orbFloat 20s ease-in-out infinite}
.orb-2{width:500px;height:500px;background:var(--s);bottom:-150px;right:-100px;animation:orbFloat 25s ease-in-out infinite reverse}
.orb-3{width:400px;height:400px;background:var(--a);top:50%;left:50%;transform:translate(-50%,-50%);animation:orbFloat 30s ease-in-out infinite 5s}
@keyframes orbFloat{
0%,100%{transform:translate(0,0) scale(1)}
25%{transform:translate(50px,-80px) scale(1.1)}
50%{transform:translate(-30px,60px) scale(.9)}
75%{transform:translate(70px,30px) scale(1.05)}
}

/* ─── Floating particles ─── */
.particles{position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden}
.particle{position:absolute;width:3px;height:3px;background:var(--p);border-radius:50%;opacity:.3;animation:particleDrift linear infinite}
.particle:nth-child(odd){background:var(--s)}
.particle:nth-child(3n){width:2px;height:2px;opacity:.2}
@keyframes particleDrift{
0%{transform:translateY(100vh) translateX(0);opacity:0}
10%{opacity:.4}
90%{opacity:.4}
100%{transform:translateY(-20px) translateX(40px);opacity:0}
}

/* ─── Glass card base ─── */
.glass{background:var(--card);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.08);border-radius:20px;transition:transform .5s cubic-bezier(.2,.7,.2,1),box-shadow .5s ease}
.glass:hover{transform:translateY(-4px);box-shadow:0 20px 60px rgba(0,0,0,.3),0 0 40px color-mix(in srgb,var(--p) 15%,transparent)}

/* ─── 3D tilt card ─── */
.tilt-card{perspective:800px}
.tilt-inner{transform-style:preserve-3d;transition:transform .6s cubic-bezier(.2,.7,.2,1)}
.tilt-card:hover .tilt-inner{transform:rotateY(-5deg) rotateX(5deg)}
.tilt-shine{position:absolute;inset:0;border-radius:inherit;background:linear-gradient(135deg,rgba(255,255,255,.1) 0%,transparent 60%);opacity:0;transition:opacity .5s;pointer-events:none;z-index:2}
.tilt-card:hover .tilt-shine{opacity:1}

.grad-text{background:linear-gradient(135deg,var(--p),var(--s),var(--a));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}

/* ─── Navigation ─── */
nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:1rem 2rem;transition:background .4s}
nav.scrolled{background:color-mix(in srgb,var(--bg) 80%,transparent);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom:1px solid rgba(255,255,255,.06)}
.nav-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between}
.nav-brand{font-weight:700;font-size:1.25rem;color:#fff;text-decoration:none;display:flex;align-items:center;gap:.5rem}
.nav-brand span{opacity:.5;font-weight:400;font-size:.85rem}
.nav-links{display:flex;gap:2rem;list-style:none}
.nav-links a{color:var(--txt);text-decoration:none;font-size:.9rem;transition:color .3s}
.nav-links a:hover{color:#fff}
.nav-cta{padding:.6rem 1.5rem;border-radius:10px;background:linear-gradient(135deg,var(--p),var(--s));color:#fff;font-weight:600;font-size:.9rem;text-decoration:none;border:none;cursor:pointer;transition:transform .3s,box-shadow .3s}
.nav-cta:hover{transform:translateY(-2px);box-shadow:0 8px 30px color-mix(in srgb,var(--p) 40%,transparent)}

/* ─── Sections ─── */
section{position:relative;z-index:1;max-width:1200px;margin:0 auto;padding:6rem 1.5rem}
.section-tag{display:inline-block;font-size:.75rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--p);border:1px solid color-mix(in srgb,var(--p) 30%,transparent);padding:.4rem 1rem;border-radius:100px;margin-bottom:1.5rem}
.section-title{font-size:clamp(2rem,4vw,3rem);font-weight:800;color:#fff;line-height:1.2;margin-bottom:1rem}
.section-desc{font-size:1.1rem;max-width:600px;line-height:1.8}

/* ─── Hero ─── */
.hero{min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding-top:6rem}
.hero-badge{display:inline-flex;align-items:center;gap:.5rem;padding:.5rem 1.25rem;border-radius:100px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);font-size:.85rem;color:var(--p);margin-bottom:2rem;animation:fadeUp .8s both}
.hero h1{font-size:clamp(2.5rem,6vw,4.5rem);font-weight:800;color:#fff;line-height:1.1;max-width:900px;margin-bottom:1.5rem;animation:fadeUp .8s .1s both}
.hero p{font-size:1.2rem;max-width:600px;margin-bottom:2.5rem;animation:fadeUp .8s .2s both}
.hero-buttons{display:flex;gap:1rem;flex-wrap:wrap;justify-content:center;animation:fadeUp .8s .3s both}
.btn-glow{padding:.9rem 2.2rem;border-radius:12px;background:linear-gradient(135deg,var(--p),var(--s));color:#fff;font-weight:600;font-size:1rem;text-decoration:none;border:none;cursor:pointer;position:relative;overflow:hidden;transition:transform .3s,box-shadow .3s}
.btn-glow::after{content:'';position:absolute;inset:-2px;border-radius:inherit;background:linear-gradient(135deg,var(--p),var(--s),var(--a));z-index:-1;filter:blur(15px);opacity:.5;transition:opacity .3s}
.btn-glow:hover{transform:translateY(-3px);box-shadow:0 12px 40px color-mix(in srgb,var(--p) 40%,transparent)}
.btn-glow:hover::after{opacity:.8}
.btn-ghost{padding:.9rem 2.2rem;border-radius:12px;background:transparent;color:#fff;font-weight:500;font-size:1rem;text-decoration:none;border:1px solid rgba(255,255,255,.15);cursor:pointer;transition:background .3s,border-color .3s}
.btn-ghost:hover{background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.3)}

/* ─── Hero 3D product float ─── */
.hero-product{margin-top:4rem;perspective:1000px;animation:fadeUp 1s .5s both}
.hero-product-inner{position:relative;max-width:700px;margin:0 auto;transform:rotateX(8deg) rotateY(-5deg);transform-style:preserve-3d;animation:heroFloat 6s ease-in-out infinite;border-radius:20px;overflow:hidden}
.hero-product-inner img{width:100%;display:block;border-radius:20px}
.hero-product-glow{position:absolute;inset:-20%;border-radius:50%;background:radial-gradient(circle,color-mix(in srgb,var(--p) 30%,transparent),transparent 70%);z-index:-1;animation:pulseGlow 4s ease-in-out infinite}
@keyframes heroFloat{
0%,100%{transform:rotateX(8deg) rotateY(-5deg) translateY(0)}
50%{transform:rotateX(4deg) rotateY(3deg) translateY(-15px)}
}
@keyframes pulseGlow{0%,100%{opacity:.4;transform:scale(1)}50%{opacity:.7;transform:scale(1.1)}}

/* ─── Logos ─── */
.logos-section{text-align:center;padding:3rem 1.5rem}
.logos-title{font-size:.8rem;text-transform:uppercase;letter-spacing:.15em;margin-bottom:2rem;opacity:.5}
.logos-row{display:flex;justify-content:center;gap:3rem;flex-wrap:wrap;align-items:center}
.logos-row span{font-size:1.1rem;font-weight:600;color:rgba(255,255,255,.25);letter-spacing:.05em;transition:color .3s}
.logos-row span:hover{color:rgba(255,255,255,.5)}

/* ─── Feature grid ─── */
.feat-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1.5rem;margin-top:3rem}
.feat-card{padding:2rem;border-radius:20px;background:var(--card);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.06);transition:transform .5s cubic-bezier(.2,.7,.2,1),border-color .5s,box-shadow .5s;position:relative;overflow:hidden}
.feat-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.1),transparent)}
.feat-card:hover{transform:translateY(-6px);border-color:color-mix(in srgb,var(--p) 30%,transparent);box-shadow:0 20px 60px rgba(0,0,0,.2)}
.feat-icon{font-size:1.8rem;width:50px;height:50px;display:flex;align-items:center;justify-content:center;border-radius:14px;background:linear-gradient(135deg,color-mix(in srgb,var(--p) 15%,transparent),color-mix(in srgb,var(--s) 10%,transparent));margin-bottom:1.2rem}
.feat-card h3{color:#fff;font-size:1.1rem;font-weight:600;margin-bottom:.5rem}
.feat-card p{font-size:.9rem;line-height:1.7}

/* ─── Showcase 3D cards ─── */
.showcase-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:2rem;margin-top:3rem}
.show-card{perspective:600px}
.show-inner{position:relative;padding:2.5rem;border-radius:24px;background:var(--card);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.08);transform-style:preserve-3d;transition:transform .7s cubic-bezier(.2,.7,.2,1),box-shadow .7s;overflow:hidden}
.show-card:hover .show-inner{transform:rotateY(-4deg) rotateX(4deg) translateZ(20px);box-shadow:0 30px 80px rgba(0,0,0,.3),0 0 60px color-mix(in srgb,var(--p) 10%,transparent)}
.show-inner::after{content:'';position:absolute;inset:0;border-radius:inherit;background:linear-gradient(135deg,rgba(255,255,255,.06),transparent 50%);pointer-events:none;opacity:0;transition:opacity .5s}
.show-card:hover .show-inner::after{opacity:1}
.show-metric{font-size:3.5rem;font-weight:800;line-height:1;margin-bottom:.25rem}
.show-metric-label{font-size:.8rem;text-transform:uppercase;letter-spacing:.1em;color:var(--p);margin-bottom:1.5rem}
.show-inner h3{color:#fff;font-size:1.2rem;font-weight:600;margin-bottom:.5rem}
.show-inner p{font-size:.9rem}

/* ─── Stats ─── */
.stats-section{padding:4rem 1.5rem}
.stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:2rem;max-width:1200px;margin:0 auto}
.stat-item{text-align:center;padding:2rem;border-radius:20px;background:var(--card);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.06)}
.stat-value{font-size:2.5rem;font-weight:800;background:linear-gradient(135deg,var(--p),var(--s));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;line-height:1.2}
.stat-label{font-size:.85rem;margin-top:.3rem}

/* ─── Pricing ─── */
.pricing-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.5rem;margin-top:3rem}
.plan{padding:2.5rem;border-radius:24px;background:var(--card);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.06);transition:transform .5s,box-shadow .5s;position:relative}
.plan:hover{transform:translateY(-6px)}
.plan.featured{border-color:color-mix(in srgb,var(--p) 40%,transparent);box-shadow:0 0 60px color-mix(in srgb,var(--p) 15%,transparent)}
.plan-badge{position:absolute;top:-1px;left:50%;transform:translateX(-50%);padding:.3rem 1rem;font-size:.7rem;font-weight:700;letter-spacing:.1em;background:linear-gradient(135deg,var(--p),var(--s));color:#fff;border-radius:0 0 10px 10px}
.plan h3{color:#fff;font-size:1.15rem;font-weight:600;margin-bottom:.5rem}
.plan-price{font-size:2.8rem;font-weight:800;color:#fff;line-height:1}
.plan-price span{font-size:.9rem;font-weight:400;color:var(--txt)}
.plan-desc{font-size:.9rem;margin:.75rem 0 1.5rem}
.plan-feats{list-style:none;margin-bottom:2rem}
.plan-feats li{padding:.4rem 0;font-size:.9rem;display:flex;align-items:center;gap:.5rem}
.plan-feats li::before{content:'✓';color:var(--p);font-weight:700;font-size:.8rem}
.plan-btn{display:block;width:100%;padding:.9rem;border-radius:12px;font-weight:600;font-size:.95rem;text-align:center;text-decoration:none;cursor:pointer;transition:transform .3s,box-shadow .3s;border:none}
.plan.featured .plan-btn{background:linear-gradient(135deg,var(--p),var(--s));color:#fff}
.plan:not(.featured) .plan-btn{background:rgba(255,255,255,.06);color:#fff;border:1px solid rgba(255,255,255,.1)}
.plan-btn:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(0,0,0,.3)}

/* ─── Testimonials ─── */
.testi-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.5rem;margin-top:3rem}
.testi{padding:2rem;border-radius:20px;background:var(--card);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.06);transition:transform .5s,border-color .5s}
.testi:hover{transform:translateY(-4px);border-color:color-mix(in srgb,var(--p) 20%,transparent)}
.testi q{display:block;font-size:.95rem;line-height:1.8;font-style:italic;margin-bottom:1.5rem;color:rgba(255,255,255,.8)}
.testi-author{font-weight:600;color:#fff;font-size:.9rem}
.testi-role{font-size:.8rem;color:var(--txt)}

/* ─── CTA ─── */
.cta-box{text-align:center;padding:5rem 2rem;border-radius:32px;background:var(--card);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.08);position:relative;overflow:hidden}
.cta-box::before{content:'';position:absolute;inset:-50%;background:conic-gradient(from 0deg,var(--p),var(--s),var(--a),var(--p));animation:ctaRotate 8s linear infinite;opacity:.05}
@keyframes ctaRotate{to{transform:rotate(360deg)}}
.cta-box h2{font-size:clamp(2rem,4vw,3rem);font-weight:800;color:#fff;margin-bottom:1rem;position:relative}
.cta-box p{font-size:1.1rem;margin-bottom:2rem;position:relative}
.cta-box .btn-glow{position:relative;font-size:1.05rem;padding:1.1rem 3rem}

/* ─── Footer ─── */
footer{position:relative;z-index:1;text-align:center;padding:3rem 1.5rem;border-top:1px solid rgba(255,255,255,.06);font-size:.85rem}
footer a{color:var(--txt);text-decoration:none;transition:color .3s}
footer a:hover{color:#fff}
.footer-links{display:flex;justify-content:center;gap:2rem;margin-bottom:1rem}

@keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:none}}

${revealCss}

/* ─── Responsive ─── */
@media(max-width:768px){
  .nav-links{display:none}
  section{padding:4rem 1rem}
  .feat-grid,.showcase-grid,.pricing-grid,.testi-grid{grid-template-columns:1fr}
  .stats-grid{grid-template-columns:repeat(2,1fr)}
  .hero h1{font-size:2.2rem}
  .logos-row{gap:1.5rem}
}
</style>
</head>
<body>

<!-- Ambient orbs -->
<div class="orb orb-1"></div>
<div class="orb orb-2"></div>
<div class="orb orb-3"></div>

<!-- Particles -->
<div class="particles">
${Array.from({length:20},(_,i)=>`<div class="particle" style="left:${(i*5.3)%100}%;animation-duration:${10+i*1.5}s;animation-delay:${i*.7}s"></div>`).join("")}
</div>

<!-- Nav -->
<nav id="main-nav">
<div class="nav-inner">
<a href="#top" class="nav-brand">${esc(s("brand","name"))}<span>${esc(s("brand","tagline"))}</span></a>
<ul class="nav-links">
${r.on("features")?`<li><a href="#features">Features</a></li>`:""}
${r.on("showcase")?`<li><a href="#showcase">Showcase</a></li>`:""}
${r.on("pricing")?`<li><a href="#pricing">Pricing</a></li>`:""}
${r.on("testimonials")?`<li><a href="#testimonials">Testimonials</a></li>`:""}
</ul>
<a href="${safeUrl(s("brand","ctaUrl"))}" class="nav-cta">${esc(s("brand","cta"))}</a>
</div>
</nav>

<!-- Hero -->
<section class="hero" id="top">
${s("hero","badge")?`<div class="hero-badge">${esc(s("hero","badge"))}</div>`:""}
<h1>${gradTitle(s("hero","title"))}</h1>
<p>${esc(s("hero","subtitle"))}</p>
<div class="hero-buttons">
<a href="${safeUrl(s("brand","ctaUrl"))}" class="btn-glow">${esc(s("hero","btn1"))}</a>
${s("hero","btn2")?`<a href="#features" class="btn-ghost">${esc(s("hero","btn2"))}</a>`:""}
</div>
${safeUrl(s("hero","productImg"))!=="#" ? `
<div class="hero-product">
<div class="hero-product-glow"></div>
<div class="hero-product-inner glass">
<img src="${safeUrl(s("hero","productImg"))}" alt="${esc(s("brand","name"))}" loading="lazy">
</div>
</div>` : ""}
</section>

${r.on("logos") && logos.length ? `
<div class="logos-section" id="logos">
<div class="logos-title rv">${esc(s("logos","title"))}</div>
<div class="logos-row rv d1">${logos.map(l=>`<span>${esc(l.name)}</span>`).join("")}</div>
</div>` : ""}

${r.on("features") && feats.length ? `
<section id="features">
<div style="text-align:center">
<div class="section-tag rv">${esc(s("features","eyebrow"))}</div>
<h2 class="section-title rv">${esc(s("features","title"))}</h2>
<p class="section-desc rv" style="margin:0 auto">${esc(s("features","subtitle"))}</p>
</div>
<div class="feat-grid">${feats.map((f,i)=>`
<div class="feat-card rv${i<3?` d${i}`:""}" >
<div class="feat-icon">${esc(f.icon)}</div>
<h3>${esc(f.title)}</h3>
<p>${esc(f.desc)}</p>
</div>`).join("")}</div>
</section>` : ""}

${r.on("showcase") && cards.length ? `
<section id="showcase">
<div style="text-align:center">
<div class="section-tag rv">${esc(s("showcase","eyebrow"))}</div>
<h2 class="section-title rv">${esc(s("showcase","title"))}</h2>
<p class="section-desc rv" style="margin:0 auto">${esc(s("showcase","desc"))}</p>
</div>
<div class="showcase-grid">${cards.map((c,i)=>`
<div class="show-card rv${i?` d${i}`:""}" >
<div class="show-inner">
<div class="show-metric grad-text">${esc(c.metric)}</div>
<div class="show-metric-label">${esc(c.metricLabel)}</div>
<h3>${esc(c.title)}</h3>
<p>${esc(c.desc)}</p>
</div>
</div>`).join("")}</div>
</section>` : ""}

${r.on("stats") && stats.length ? `
<div class="stats-section" id="stats">
<div class="stats-grid">${stats.map((st,i)=>`
<div class="stat-item rv${i?` d${Math.min(i,3)}`:""}" >
<div class="stat-value">${esc(st.value)}</div>
<div class="stat-label">${esc(st.label)}</div>
</div>`).join("")}</div>
</div>` : ""}

${r.on("pricing") && plans.length ? `
<section id="pricing">
<div style="text-align:center">
<div class="section-tag rv">${esc(s("pricing","eyebrow"))}</div>
<h2 class="section-title rv">${esc(s("pricing","title"))}</h2>
<p class="section-desc rv" style="margin:0 auto">${esc(s("pricing","subtitle"))}</p>
</div>
<div class="pricing-grid">${plans.map((pl,i)=>`
<div class="plan${pl.featured?" featured":""} rv${i?` d${i}`:""}" >
${pl.featured?`<div class="plan-badge">${esc(pl.featured)}</div>`:""}
<h3>${esc(pl.name)}</h3>
<div class="plan-price">${esc(pl.price)}<span>${esc(pl.period)}</span></div>
<p class="plan-desc">${esc(pl.desc)}</p>
<ul class="plan-feats">${csv(pl.feats).map(f=>`<li>${esc(f)}</li>`).join("")}</ul>
<button class="plan-btn">${esc(pl.btnText)}</button>
</div>`).join("")}</div>
</section>` : ""}

${r.on("testimonials") && testimonials.length ? `
<section id="testimonials">
<div style="text-align:center">
<div class="section-tag rv">${esc(s("testimonials","eyebrow"))}</div>
<h2 class="section-title rv">${esc(s("testimonials","title"))}</h2>
</div>
<div class="testi-grid">${testimonials.map((t,i)=>`
<div class="testi rv${i?` d${i}`:""}" >
<q>${esc(t.quote)}</q>
<div class="testi-author">${esc(t.name)}</div>
<div class="testi-role">${esc(t.role)}</div>
</div>`).join("")}</div>
</section>` : ""}

${r.on("cta") ? `
<section id="cta-section">
<div class="cta-box rv">
<h2>${esc(s("cta","title"))}</h2>
<p>${esc(s("cta","text"))}</p>
<a href="${safeUrl(s("brand","ctaUrl"))}" class="btn-glow">${esc(s("cta","button"))}</a>
</div>
</section>` : ""}

<footer>
${footerLinks.length?`<div class="footer-links">${footerLinks.map(l=>`<a href="#">${esc(l)}</a>`).join("")}</div>`:""}
<p>${esc(s("footer","copyright"))}</p>
</footer>

<script>
var nav=document.getElementById('main-nav');
window.addEventListener('scroll',function(){nav.classList.toggle('scrolled',scrollY>50)},{passive:true});
</script>
${revealScript}
</body>
</html>`;
}

export const motionGlassProduct: EditableTemplate = {
  id: "motion-glass-product",
  name: "Prism — 3D Glass Product",
  schema,
  defaults,
  presets,
  render,
  checks: (c) => {
    const r = reader(c);
    const out: { section: string; message: string }[] = [];
    if (!r.str("seo", "description").trim())
      out.push({ section: "seo", message: "Add a search description for better SEO." });
    if (r.on("pricing") && r.list("pricing", "plans").length === 0)
      out.push({ section: "pricing", message: "Add at least one pricing plan." });
    return out;
  },
};
