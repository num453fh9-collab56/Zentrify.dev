import type { Content, EditableTemplate, Item, Section } from "../editor/types";
import { csv, esc, previewScript, reader, revealCss, revealScript, safeColor, safeUrl } from "../editor/html";

const schema: Section[] = [
  {
    id: "brand",
    label: "Brand",
    fields: [
      { type: "text", key: "name", label: "Game / Brand name" },
      { type: "text", key: "cta", label: "Nav CTA" },
      { type: "text", key: "ctaUrl", label: "CTA link", placeholder: "#download" },
    ],
  },
  {
    id: "theme",
    label: "Colors",
    fields: [
      { type: "color", key: "neon1", label: "Neon primary" },
      { type: "color", key: "neon2", label: "Neon secondary" },
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
      { type: "textarea", key: "title", label: "Title (glitch text)", rows: 2 },
      { type: "textarea", key: "subtitle", label: "Subtitle", rows: 3 },
      { type: "text", key: "btn1", label: "Primary button" },
      { type: "text", key: "btn2", label: "Secondary button" },
      { type: "image", key: "heroImg", label: "Hero image" },
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
      {
        type: "list",
        key: "items",
        label: "Features",
        itemLabel: "Feature",
        titleKey: "title",
        max: 6,
        newItem: { icon: "⚡", title: "Feature", desc: "Description" },
        fields: [
          { type: "text", key: "icon", label: "Icon" },
          { type: "text", key: "title", label: "Title" },
          { type: "textarea", key: "desc", label: "Description", rows: 2 },
        ],
      },
    ],
  },
  {
    id: "specs",
    label: "Game specs",
    toggleable: true,
    anchor: "specs",
    fields: [
      { type: "text", key: "eyebrow", label: "Tag" },
      { type: "text", key: "title", label: "Heading" },
      {
        type: "list",
        key: "items",
        label: "Specs",
        itemLabel: "Spec",
        titleKey: "label",
        min: 1,
        max: 6,
        newItem: { label: "Spec", value: "Value" },
        fields: [
          { type: "text", key: "label", label: "Label" },
          { type: "text", key: "value", label: "Value" },
        ],
      },
    ],
  },
  {
    id: "gallery",
    label: "Screenshots",
    toggleable: true,
    anchor: "gallery",
    fields: [
      { type: "text", key: "title", label: "Heading" },
      {
        type: "list",
        key: "items",
        label: "Screenshots",
        itemLabel: "Screenshot",
        titleKey: "caption",
        max: 4,
        newItem: { image: "", caption: "Screenshot" },
        fields: [
          { type: "image", key: "image", label: "Image" },
          { type: "text", key: "caption", label: "Caption" },
        ],
      },
    ],
  },
  {
    id: "reviews",
    label: "Reviews",
    toggleable: true,
    anchor: "reviews",
    fields: [
      { type: "text", key: "title", label: "Heading" },
      {
        type: "list",
        key: "items",
        label: "Reviews",
        itemLabel: "Review",
        titleKey: "source",
        max: 4,
        newItem: { score: "9.5", source: "Publication", quote: "Review quote" },
        fields: [
          { type: "text", key: "score", label: "Score" },
          { type: "text", key: "source", label: "Source" },
          { type: "text", key: "quote", label: "Quote" },
        ],
      },
    ],
  },
  {
    id: "editions",
    label: "Editions / Pricing",
    toggleable: true,
    anchor: "editions",
    fields: [
      { type: "text", key: "title", label: "Heading" },
      {
        type: "list",
        key: "items",
        label: "Editions",
        itemLabel: "Edition",
        titleKey: "name",
        min: 1,
        max: 3,
        newItem: { name: "Standard", price: "$59.99", feats: "Base game, Standard skin", btn: "Buy Now", featured: "" },
        fields: [
          { type: "text", key: "name", label: "Edition" },
          { type: "text", key: "price", label: "Price" },
          { type: "textarea", key: "feats", label: "Includes (comma sep)", rows: 3 },
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
      { type: "text", key: "subtitle", label: "Subtitle" },
      { type: "text", key: "btn", label: "Button" },
      { type: "text", key: "platforms", label: "Platforms (comma sep)", placeholder: "PC, PlayStation 5, Xbox, Switch" },
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
  enabled: { features: true, specs: true, gallery: true, reviews: true, editions: true, cta: true },
  values: {
    brand: { name: "NEXUS", cta: "Pre-order →", ctaUrl: "#editions" },
    theme: { neon1: "#ff00ff", neon2: "#00ffff", bg: "#0a0a12", text: "#6a6a8a" },
    hero: {
      badge: "▸ LAUNCHING Q1 2026",
      title: "NEXUS",
      subtitle: "Enter a neon-drenched cyberpunk world where every choice rewrites reality. Open-world action RPG with real-time combat and emergent storytelling.",
      btn1: "Pre-order Now →",
      btn2: "Watch Trailer",
      heroImg: "",
    },
    features: {
      eyebrow: "Features",
      title: "Next-gen gameplay",
      items: [
        { icon: "🎮", title: "Open World", desc: "50km² hand-crafted cyberpunk city with fully destructible environments." },
        { icon: "⚔️", title: "Real-time Combat", desc: "Fluid melee and ranged combat with 200+ weapon combinations." },
        { icon: "🧬", title: "Character Mods", desc: "Cybernetic augmentation system with 80+ upgradeable implants." },
        { icon: "🌐", title: "Co-op Multiplayer", desc: "Seamless drop-in co-op for up to 4 players across the campaign." },
        { icon: "🎨", title: "Ray Tracing", desc: "Full path tracing with neon reflections across every surface." },
        { icon: "🔊", title: "Spatial Audio", desc: "Dolby Atmos 3D audio that reacts to your environment in real-time." },
      ] as unknown as string,
    },
    specs: {
      eyebrow: "System requirements",
      title: "Built for power",
      items: [
        { label: "GPU", value: "RTX 4070 / RX 7800 XT" },
        { label: "CPU", value: "i7-13700K / Ryzen 7 7700X" },
        { label: "RAM", value: "32 GB DDR5" },
        { label: "Storage", value: "120 GB NVMe SSD" },
        { label: "Resolution", value: "4K @ 60fps / 1440p @ 120fps" },
        { label: "Features", value: "DLSS 4 / FSR 3 / Ray Tracing" },
      ] as unknown as string,
    },
    gallery: {
      title: "Screenshots",
      items: [
        { image: "", caption: "Night City Downtown" },
        { image: "", caption: "Combat Arena" },
        { image: "", caption: "Character Customization" },
      ] as unknown as string,
    },
    reviews: {
      title: "Critical acclaim",
      items: [
        { score: "9.5", source: "IGN", quote: "A masterpiece of cyberpunk storytelling" },
        { score: "95", source: "PC Gamer", quote: "The most ambitious open world we've ever explored" },
        { score: "5/5", source: "GameSpot", quote: "Sets a new benchmark for the genre" },
      ] as unknown as string,
    },
    editions: {
      title: "Choose your edition",
      items: [
        { name: "Standard", price: "$59.99", feats: "Full game, Standard character skin, Digital soundtrack", btn: "Buy Standard", featured: "" },
        { name: "Deluxe", price: "$89.99", feats: "Full game, Season pass, Exclusive skins pack, Art book, 48-hour early access", btn: "Buy Deluxe →", featured: "BEST VALUE" },
        { name: "Collector's", price: "$149.99", feats: "Everything in Deluxe, Physical statue, Steelbook case, Exclusive weapon set, Developer commentary", btn: "Buy Collector's", featured: "" },
      ] as unknown as string,
    },
    cta: { title: "THE FUTURE IS NOW", subtitle: "Available on all major platforms", btn: "Pre-order Now →", platforms: "PC, PlayStation 5, Xbox Series X, Nintendo Switch 2" },
    footer: { copy: "© 2025 Nexus Studios. All rights reserved.", links: "Press Kit, Careers, Support, Privacy, Terms" },
    seo: { title: "NEXUS — Cyberpunk Open-World RPG", description: "Enter a neon-drenched cyberpunk world. Open-world action RPG with real-time combat, co-op multiplayer, and emergent storytelling." },
  },
};

const presets = {
  section: "theme",
  items: [
    { name: "Cyberpunk", swatch: ["#ff00ff", "#00ffff"], values: { neon1: "#ff00ff", neon2: "#00ffff", bg: "#0a0a12", text: "#6a6a8a" } },
    { name: "Toxic Green", swatch: ["#39ff14", "#ffff00"], values: { neon1: "#39ff14", neon2: "#ffff00", bg: "#080a04", text: "#5a6a4a" } },
    { name: "Blood Red", swatch: ["#ff0040", "#ff6600"], values: { neon1: "#ff0040", neon2: "#ff6600", bg: "#0c0406", text: "#8a5a5a" } },
    { name: "Ice Blue", swatch: ["#4488ff", "#88ddff"], values: { neon1: "#4488ff", neon2: "#88ddff", bg: "#04060c", text: "#5a6a8a" } },
  ],
};

function render(content: Content, options?: { preview?: { initialScroll: number; instant: boolean } }) {
  const r = reader(content);
  const s = r.str;
  const N1 = safeColor(s("theme","neon1"),"#ff00ff");
  const N2 = safeColor(s("theme","neon2"),"#00ffff");
  const BG = safeColor(s("theme","bg"),"#0a0a12");
  const TX = safeColor(s("theme","text"),"#6a6a8a");
  const feats = r.list("features","items");
  const specs = r.list("specs","items");
  const shots = r.list("gallery","items");
  const reviews = r.list("reviews","items");
  const editions = r.list("editions","items");
  const platforms = csv(s("cta","platforms"));
  const footerLinks = csv(s("footer","links"));

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(s("seo","title"))}</title>
<meta name="description" content="${esc(s("seo","description"))}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
${previewScript(options?.preview)}
<style>
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{--n1:${N1};--n2:${N2};--bg:${BG};--tx:${TX}}
html{scroll-behavior:smooth}
body{font-family:'Inter',system-ui,sans-serif;background:var(--bg);color:var(--tx);line-height:1.7;overflow-x:hidden}
.orb{font-family:'Orbitron',sans-serif}

/* ─── CRT scanlines ─── */
body::after{content:'';position:fixed;inset:0;pointer-events:none;z-index:999;background:repeating-linear-gradient(0deg,rgba(0,0,0,.03) 0px,rgba(0,0,0,.03) 1px,transparent 1px,transparent 3px);opacity:.5}

/* ─── Grid floor ─── */
.grid-floor{position:fixed;bottom:0;left:0;right:0;height:40vh;pointer-events:none;z-index:0;background:linear-gradient(to top,color-mix(in srgb,var(--n1) 4%,transparent),transparent);mask-image:linear-gradient(to top,black 20%,transparent);-webkit-mask-image:linear-gradient(to top,black 20%,transparent)}
.grid-floor::before{content:'';position:absolute;inset:0;background-image:linear-gradient(var(--n1) 1px,transparent 1px),linear-gradient(90deg,var(--n1) 1px,transparent 1px);background-size:60px 60px;opacity:.05;animation:gridScroll 3s linear infinite}
@keyframes gridScroll{from{transform:perspective(500px) rotateX(60deg) translateY(0)}to{transform:perspective(500px) rotateX(60deg) translateY(60px)}}

/* ─── Glitch text ─── */
.glitch{position:relative;display:inline-block}
.glitch::before,.glitch::after{content:attr(data-text);position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden}
.glitch::before{animation:glitch1 3s infinite linear alternate;clip-path:polygon(0 0,100% 0,100% 35%,0 35%);color:var(--n2)}
.glitch::after{animation:glitch2 2s infinite linear alternate;clip-path:polygon(0 65%,100% 65%,100% 100%,0 100%);color:var(--n1)}
@keyframes glitch1{0%,90%{transform:none}92%{transform:translate(3px,-2px)}94%{transform:translate(-3px,2px)}96%{transform:translate(2px,1px)}98%{transform:none}}
@keyframes glitch2{0%,88%{transform:none}90%{transform:translate(-4px,1px)}93%{transform:translate(4px,-1px)}96%{transform:translate(-2px,3px)}100%{transform:none}}

/* ─── Nav ─── */
nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:.8rem 2rem;background:color-mix(in srgb,var(--bg) 90%,transparent);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-bottom:1px solid color-mix(in srgb,var(--n1) 10%,transparent)}
.nav-in{max-width:1100px;margin:0 auto;display:flex;align-items:center;justify-content:space-between}
.logo{font-family:'Orbitron',sans-serif;font-weight:900;font-size:1rem;letter-spacing:.15em;color:#fff;text-decoration:none;text-shadow:0 0 10px var(--n1)}
.nav-links{display:flex;gap:1.5rem;list-style:none}
.nav-links a{font-family:'Orbitron',sans-serif;color:var(--tx);text-decoration:none;font-size:.65rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;transition:color .3s,text-shadow .3s}
.nav-links a:hover{color:var(--n2);text-shadow:0 0 8px var(--n2)}
.nav-btn{font-family:'Orbitron',sans-serif;padding:.5rem 1.2rem;border:2px solid var(--n1);background:transparent;color:var(--n1);font-weight:700;font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;text-decoration:none;cursor:pointer;transition:background .3s,box-shadow .3s}
.nav-btn:hover{background:var(--n1);color:var(--bg);box-shadow:0 0 20px color-mix(in srgb,var(--n1) 50%,transparent)}

/* ─── Sections ─── */
section{position:relative;z-index:2;max-width:1100px;margin:0 auto;padding:6rem 1.5rem}
.tag{font-family:'Orbitron',sans-serif;font-size:.65rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--n1);margin-bottom:1rem}
.h2{font-family:'Orbitron',sans-serif;font-size:clamp(1.5rem,3vw,2.2rem);font-weight:800;color:#fff;letter-spacing:.05em;text-transform:uppercase;margin-bottom:1rem}

/* ─── Hero ─── */
.hero{min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding-top:5rem}
.hero-badge{font-family:'Orbitron',sans-serif;font-size:.7rem;font-weight:600;letter-spacing:.15em;color:var(--n2);margin-bottom:2rem;animation:fadeIn .8s both}
.hero h1{font-family:'Orbitron',sans-serif;font-size:clamp(3.5rem,10vw,8rem);font-weight:900;color:#fff;letter-spacing:.1em;line-height:1;text-shadow:0 0 40px var(--n1),0 0 80px color-mix(in srgb,var(--n1) 30%,transparent);animation:fadeIn 1s .1s both}
.hero>p{font-size:1.1rem;max-width:550px;margin:1.5rem 0 2.5rem;animation:fadeUp .8s .3s both}
.hero-btns{display:flex;gap:1rem;flex-wrap:wrap;justify-content:center;animation:fadeUp .8s .4s both}
.btn-neon{padding:.9rem 2.5rem;border:2px solid var(--n1);background:transparent;color:var(--n1);font-family:'Orbitron',sans-serif;font-weight:700;font-size:.8rem;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;text-decoration:none;position:relative;transition:all .3s}
.btn-neon:hover{background:var(--n1);color:var(--bg);box-shadow:0 0 30px color-mix(in srgb,var(--n1) 40%,transparent),inset 0 0 30px color-mix(in srgb,var(--n1) 20%,transparent)}
.btn-ghost{padding:.9rem 2.5rem;border:1px solid rgba(255,255,255,.15);background:transparent;color:#fff;font-family:'Orbitron',sans-serif;font-weight:500;font-size:.8rem;letter-spacing:.1em;text-transform:uppercase;text-decoration:none;cursor:pointer;transition:border-color .3s}
.btn-ghost:hover{border-color:var(--n2);color:var(--n2)}
.hero-img{margin-top:3rem;max-width:700px;width:100%;border-radius:4px;border:1px solid color-mix(in srgb,var(--n1) 15%,transparent);animation:fadeUp 1s .6s both}
.hero-img img{width:100%;display:block;border-radius:4px}
.hero-placeholder{aspect-ratio:16/9;background:color-mix(in srgb,var(--n1) 3%,var(--bg));display:flex;align-items:center;justify-content:center;font-family:'Orbitron',sans-serif;font-size:3rem;color:var(--n1);opacity:.15;border-radius:4px}

/* ─── Feature grid ─── */
.feat-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1px;margin-top:3rem;background:color-mix(in srgb,var(--n1) 8%,transparent)}
.feat{padding:2rem;background:var(--bg);transition:background .5s}
.feat:hover{background:color-mix(in srgb,var(--n1) 3%,var(--bg))}
.feat-icon{font-size:1.3rem;margin-bottom:.8rem}
.feat h3{font-family:'Orbitron',sans-serif;color:#fff;font-size:.8rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:.4rem}
.feat p{font-size:.85rem}

/* ─── Specs ─── */
.spec-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:1px;margin-top:2rem;background:color-mix(in srgb,var(--n2) 8%,transparent);border:1px solid color-mix(in srgb,var(--n2) 10%,transparent)}
.spec{padding:1.2rem 1.5rem;background:var(--bg);display:flex;justify-content:space-between;align-items:center}
.spec-label{font-family:'Orbitron',sans-serif;font-size:.7rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--n2)}
.spec-val{color:#fff;font-size:.9rem;font-weight:600}

/* ─── Gallery ─── */
.gallery-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:1rem;margin-top:2rem}
.gallery-item{aspect-ratio:16/9;border-radius:4px;overflow:hidden;border:1px solid color-mix(in srgb,var(--n1) 10%,transparent);position:relative;background:color-mix(in srgb,var(--n1) 3%,var(--bg))}
.gallery-item img{width:100%;height:100%;object-fit:cover;transition:transform .6s}
.gallery-item:hover img{transform:scale(1.05)}
.gallery-cap{position:absolute;bottom:0;left:0;right:0;padding:.5rem 1rem;background:linear-gradient(transparent,rgba(0,0,0,.8));font-family:'Orbitron',sans-serif;font-size:.65rem;letter-spacing:.1em;color:rgba(255,255,255,.7);text-transform:uppercase}
.gallery-ph{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:2rem;color:var(--n1);opacity:.1}

/* ─── Reviews ─── */
.reviews-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1.5rem;margin-top:2rem}
.review{padding:2rem;border:1px solid color-mix(in srgb,var(--n1) 10%,transparent);text-align:center;transition:border-color .5s}
.review:hover{border-color:color-mix(in srgb,var(--n1) 30%,transparent)}
.review-score{font-family:'Orbitron',sans-serif;font-size:2.5rem;font-weight:900;color:var(--n1);text-shadow:0 0 20px color-mix(in srgb,var(--n1) 30%,transparent)}
.review-src{font-family:'Orbitron',sans-serif;font-size:.7rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:#fff;margin:.5rem 0}
.review q{font-size:.85rem;font-style:italic;color:rgba(255,255,255,.6)}

/* ─── Editions ─── */
.ed-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.5rem;margin-top:2rem}
.ed{padding:2.5rem 2rem;border:1px solid color-mix(in srgb,var(--n1) 10%,transparent);position:relative;transition:transform .5s,border-color .5s}
.ed:hover{transform:translateY(-4px)}
.ed.ft{border-color:var(--n1);box-shadow:0 0 40px color-mix(in srgb,var(--n1) 10%,transparent)}
.ed-badge{position:absolute;top:0;right:0;font-family:'Orbitron',sans-serif;font-size:.55rem;font-weight:700;letter-spacing:.1em;padding:.3rem .8rem;background:var(--n1);color:var(--bg)}
.ed h3{font-family:'Orbitron',sans-serif;font-size:.9rem;font-weight:700;color:#fff;letter-spacing:.08em;text-transform:uppercase;margin-bottom:.5rem}
.ed-price{font-family:'Orbitron',sans-serif;font-size:2rem;font-weight:900;color:#fff;margin-bottom:1rem}
.ed-feats{list-style:none;margin-bottom:2rem}
.ed-feats li{padding:.3rem 0;font-size:.85rem;display:flex;gap:.5rem;align-items:center}
.ed-feats li::before{content:'▸';color:var(--n1)}
.ed-btn{display:block;width:100%;padding:.8rem;font-family:'Orbitron',sans-serif;font-weight:700;font-size:.75rem;letter-spacing:.1em;text-transform:uppercase;text-align:center;cursor:pointer;border:none;text-decoration:none;transition:all .3s}
.ed.ft .ed-btn{border:2px solid var(--n1);background:var(--n1);color:var(--bg)}
.ed:not(.ft) .ed-btn{border:1px solid rgba(255,255,255,.15);background:transparent;color:#fff}
.ed-btn:hover{box-shadow:0 0 20px color-mix(in srgb,var(--n1) 30%,transparent)}

/* ─── CTA ─── */
.cta-section{text-align:center}
.cta-title{font-family:'Orbitron',sans-serif;font-size:clamp(2rem,5vw,4rem);font-weight:900;color:#fff;letter-spacing:.1em;text-shadow:0 0 30px var(--n1);margin-bottom:.5rem}
.cta-sub{font-size:1rem;margin-bottom:2rem}
.cta-platforms{display:flex;gap:1.5rem;justify-content:center;flex-wrap:wrap;margin-top:2rem}
.cta-plat{font-family:'Orbitron',sans-serif;font-size:.65rem;font-weight:600;letter-spacing:.15em;text-transform:uppercase;color:var(--n2);padding:.5rem 1rem;border:1px solid color-mix(in srgb,var(--n2) 20%,transparent)}

footer{position:relative;z-index:2;text-align:center;padding:2rem 1.5rem;border-top:1px solid color-mix(in srgb,var(--n1) 8%,transparent);font-size:.75rem;font-family:'Orbitron',sans-serif;letter-spacing:.05em}
.ft-links{display:flex;justify-content:center;gap:1.5rem;flex-wrap:wrap;margin-bottom:.8rem}
.ft-links a{color:var(--tx);text-decoration:none;transition:color .3s}
.ft-links a:hover{color:var(--n1)}

@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes fadeUp{from{opacity:0;transform:translateY(25px)}to{opacity:1;transform:none}}
${revealCss}

@media(max-width:768px){
.nav-links{display:none}
section{padding:4rem 1rem}
.feat-grid,.ed-grid,.reviews-grid{grid-template-columns:1fr}
.spec-grid{grid-template-columns:1fr}
.gallery-grid{grid-template-columns:repeat(2,1fr)}
}
</style>
</head>
<body>

<div class="grid-floor"></div>

<nav>
<div class="nav-in">
<a href="#top" class="logo">${esc(s("brand","name"))}</a>
<ul class="nav-links">
${r.on("features")?`<li><a href="#features">Features</a></li>`:""}
${r.on("gallery")?`<li><a href="#gallery">Media</a></li>`:""}
${r.on("editions")?`<li><a href="#editions">Editions</a></li>`:""}
</ul>
<a href="${safeUrl(s("brand","ctaUrl"))}" class="nav-btn">${esc(s("brand","cta"))}</a>
</div>
</nav>

<section class="hero" id="top">
${s("hero","badge")?`<div class="hero-badge">${esc(s("hero","badge"))}</div>`:""}
<h1><span class="glitch" data-text="${esc(s("hero","title"))}">${esc(s("hero","title"))}</span></h1>
<p>${esc(s("hero","subtitle"))}</p>
<div class="hero-btns">
<a href="${safeUrl(s("brand","ctaUrl"))}" class="btn-neon">${esc(s("hero","btn1"))}</a>
${s("hero","btn2")?`<a href="#features" class="btn-ghost">${esc(s("hero","btn2"))}</a>`:""}
</div>
${safeUrl(s("hero","heroImg"))!=="#"?`<div class="hero-img"><img src="${safeUrl(s("hero","heroImg"))}" alt="${esc(s("brand","name"))}" loading="lazy"></div>`:`<div class="hero-img"><div class="hero-placeholder">▸</div></div>`}
</section>

${r.on("features")&&feats.length?`
<section id="features">
<div class="tag rv">${esc(s("features","eyebrow"))}</div>
<h2 class="h2 rv">${esc(s("features","title"))}</h2>
<div class="feat-grid">${feats.map((f,i)=>`<div class="feat rv${i<3?` d${i}`:""}" ><div class="feat-icon">${esc(f.icon)}</div><h3>${esc(f.title)}</h3><p>${esc(f.desc)}</p></div>`).join("")}</div>
</section>`:""}

${r.on("specs")&&specs.length?`
<section id="specs">
<div class="tag rv">${esc(s("specs","eyebrow"))}</div>
<h2 class="h2 rv">${esc(s("specs","title"))}</h2>
<div class="spec-grid">${specs.map((sp,i)=>`<div class="spec rv${i<3?` d${i}`:""}" ><span class="spec-label">${esc(sp.label)}</span><span class="spec-val">${esc(sp.value)}</span></div>`).join("")}</div>
</section>`:""}

${r.on("gallery")&&shots.length?`
<section id="gallery">
<h2 class="h2 rv">${esc(s("gallery","title"))}</h2>
<div class="gallery-grid">${shots.map((sh,i)=>`<div class="gallery-item rv${i?` d${Math.min(i,3)}`:""}" >
${safeUrl(sh.image)!=="#"?`<img src="${safeUrl(sh.image)}" alt="${esc(sh.caption)}" loading="lazy">`:`<div class="gallery-ph">▸</div>`}
<div class="gallery-cap">${esc(sh.caption)}</div>
</div>`).join("")}</div>
</section>`:""}

${r.on("reviews")&&reviews.length?`
<section id="reviews">
<h2 class="h2 rv" style="text-align:center">${esc(s("reviews","title"))}</h2>
<div class="reviews-grid">${reviews.map((rv,i)=>`<div class="review rv${i?` d${i}`:""}" ><div class="review-score">${esc(rv.score)}</div><div class="review-src">${esc(rv.source)}</div><q>${esc(rv.quote)}</q></div>`).join("")}</div>
</section>`:""}

${r.on("editions")&&editions.length?`
<section id="editions">
<h2 class="h2 rv" style="text-align:center">${esc(s("editions","title"))}</h2>
<div class="ed-grid">${editions.map((e,i)=>`<div class="ed${e.featured?" ft":""} rv${i?` d${i}`:""}" >${e.featured?`<div class="ed-badge">${esc(e.featured)}</div>`:""}<h3>${esc(e.name)}</h3><div class="ed-price">${esc(e.price)}</div><ul class="ed-feats">${csv(e.feats).map(f=>`<li>${esc(f)}</li>`).join("")}</ul><button class="ed-btn">${esc(e.btn)}</button></div>`).join("")}</div>
</section>`:""}

${r.on("cta")?`
<section class="cta-section" id="cta-section">
<div class="cta-title rv">${esc(s("cta","title"))}</div>
<p class="cta-sub rv">${esc(s("cta","subtitle"))}</p>
<a href="${safeUrl(s("brand","ctaUrl"))}" class="btn-neon rv">${esc(s("cta","btn"))}</a>
${platforms.length?`<div class="cta-platforms rv d1">${platforms.map(p=>`<span class="cta-plat">${esc(p)}</span>`).join("")}</div>`:""}
</section>`:""}

<footer>
${footerLinks.length?`<div class="ft-links">${footerLinks.map(l=>`<a href="#">${esc(l)}</a>`).join("")}</div>`:""}
<p>${esc(s("footer","copy"))}</p>
</footer>

${revealScript}
</body>
</html>`;
}

export const motionNeonArcade: EditableTemplate = {
  id: "motion-neon-arcade",
  name: "NEXUS — Gaming / Arcade",
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
