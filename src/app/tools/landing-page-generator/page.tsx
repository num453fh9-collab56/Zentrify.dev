"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useToast } from "../../components/toast";
import { ToolPageHeader } from "../../components/tool-page-header";
import { enhanceDark, enhanceLight } from "./shared-sections";
import { ArrowLeft, ChevronLeft, ChevronRight, Code2, Copy, Download, Eye, PenLine } from "lucide-react";
import { ClassicCard, PremiumBadge, PremiumCard } from "./gallery";
import { editableTemplates } from "./editable";
import { LandingEditor } from "./editor/landing-editor";

type TemplateMod = { [key: string]: unknown[] };

function useTemplateModules() {
  const [extra, setExtra] = useState<unknown[][]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Promise.all([
      import("./advanced-templates"),
      import("./extra-templates"),
      import("./immersive-templates"),
      import("./immersive-templates-b"),
      import("./immersive-templates-c"),
      import("./premium-templates"),
      import("./premium-templates-b"),
      import("./premium-templates-c"),
      import("./saas-premium-templates"),
      import("./jungle-templates"),
      import("./restaurant-aura-template"),
      import("./luxury-realestate-template"),
      import("./motion-templates"),
    ]).then((mods) => {
      setExtra(mods.map((m: TemplateMod) => {
        const key = Object.keys(m).find((k) => Array.isArray(m[k]));
        return key ? (m[key] as unknown[]) : [];
      }));
      setLoaded(true);
    });
  }, []);

  return { extra, loaded };
}

const categories = [
  "All",
  "Tech / SaaS",
  "Agency",
  "Restaurant",
  "E-Commerce",
  "Portfolio",
  "Healthcare",
  "Education",
  "Automotive",
  "Real Estate",
  "Fitness",
  "Travel",
  "Finance",
  "Startup",
  "Beauty / Lifestyle",
  "Nature / Jungle",
  "Entertainment",
  "Fashion / Lifestyle",
  "Photography",
  "Legal",
  "Nonprofit / Charity",
  "Pets / Animals",
  "Gaming / Esports",
  "Hotel / Hospitality",
  "Events / Wedding",
  "Consulting",
];

const colorThemes = [
  // Inspired by Stripe — sophisticated indigo with warm contrast
  { name: "Stripe Indigo", primary: "#635BFF", secondary: "#0A2540", accent: "#00D4AA", dark: "#0A2540", darkAlt: "#0D2E4A", text: "#ADBDCC", light: "#F6F9FC" },
  // Inspired by Linear — deep purple-blue gradient feel
  { name: "Linear Violet", primary: "#5E6AD2", secondary: "#3B3F8C", accent: "#AEB1FF", dark: "#101020", darkAlt: "#181830", text: "#B4B8D4", light: "#F2F2FA" },
  // Inspired by Vercel — stark monochrome with one pop
  { name: "Vercel Noir", primary: "#FFFFFF", secondary: "#888888", accent: "#0070F3", dark: "#000000", darkAlt: "#111111", text: "#999999", light: "#FAFAFA" },
  // Inspired by Supabase — rich emerald on deep dark
  { name: "Supabase Emerald", primary: "#3ECF8E", secondary: "#24B47E", accent: "#1C1C1C", dark: "#1C1C1C", darkAlt: "#242424", text: "#ABABAB", light: "#F8F9FA" },
  // Inspired by Figma — warm coral with confident dark
  { name: "Figma Coral", primary: "#F24E1E", secondary: "#A259FF", accent: "#0ACF83", dark: "#1E1E1E", darkAlt: "#2C2C2C", text: "#B3B3B3", light: "#F5F5F5" },
  // Inspired by Arc Browser — warm gradient tones
  { name: "Arc Warmth", primary: "#E8628C", secondary: "#8B5CF6", accent: "#FCB851", dark: "#181024", darkAlt: "#221538", text: "#C0AAD4", light: "#FFF8F6" },
  // Inspired by Raycast — confident red-orange on deep slate
  { name: "Raycast Flame", primary: "#FF6363", secondary: "#E84545", accent: "#FFD93D", dark: "#161618", darkAlt: "#1E1E22", text: "#A8A8B3", light: "#F9F9FB" },
  // Inspired by Notion — warm neutral, clean and readable
  { name: "Notion Warm", primary: "#2F3437", secondary: "#37352F", accent: "#EB5757", dark: "#191919", darkAlt: "#232323", text: "#9B9A97", light: "#FFFFFF" },
  // Inspired by Framer — electric blue on pitch black
  { name: "Framer Electric", primary: "#0055FF", secondary: "#0033CC", accent: "#00CCFF", dark: "#0A0A0A", darkAlt: "#141414", text: "#8F8F8F", light: "#F4F4F4" },
  // Inspired by Clerk — sophisticated purple with depth
  { name: "Clerk Plum", primary: "#6C47FF", secondary: "#4B2AE0", accent: "#17EEAA", dark: "#0E0B1A", darkAlt: "#16122A", text: "#A89EC9", light: "#F5F3FF" },
  // Inspired by Tailwind — refined sky blue palette
  { name: "Tailwind Sky", primary: "#0EA5E9", secondary: "#0284C7", accent: "#F0ABFC", dark: "#0C1222", darkAlt: "#131B32", text: "#94A3B8", light: "#F0F9FF" },
  // Inspired by Lemon Squeezy — bold yellow with dark confidence
  { name: "Lemon Bold", primary: "#FFC233", secondary: "#E5AB2D", accent: "#8B5CF6", dark: "#141414", darkAlt: "#1C1C1C", text: "#A3A3A3", light: "#FFFDF5" },
];

interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  thumb: string;
  getCode: (t: typeof colorThemes[0]) => string;
}

const IMG = {
  business: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=1000&fit=crop",
  woman: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=1000&fit=crop",
  team: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&h=600&fit=crop",
  office: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&h=600&fit=crop",
  laptop: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&h=600&fit=crop",
  food: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&h=600&fit=crop",
  chef: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&h=1000&fit=crop",
  restaurant: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&h=600&fit=crop",
  fashion: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&h=600&fit=crop",
  shopping: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&h=600&fit=crop",
  developer: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&h=1000&fit=crop",
  doctor: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&h=1000&fit=crop",
  hospital: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&h=600&fit=crop",
  car: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&h=600&fit=crop",
  house: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&h=600&fit=crop",
  gym: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&h=600&fit=crop",
  travel: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&h=600&fit=crop",
  finance: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=600&fit=crop",
  student: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&h=600&fit=crop",
  startup: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=900&h=600&fit=crop",
};

const templates: Template[] = [

  // ── AGENCY ─────────────────────────────────────────────────
  {
    id: "agency-dark",
    name: "Agency — Creative Studio",
    category: "Agency",
    description: "Dark agency with organic shape image mask, team photo section, portfolio grid with real images, and modern contact form.",
    thumb: "🏢",
    getCode: (t) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Creative Studio</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:${t.dark};color:${t.text}}a{text-decoration:none;color:inherit}
nav{display:flex;align-items:center;justify-content:space-between;padding:1.5rem 5%;max-width:1400px;margin:0 auto}nav .logo{font-size:1.4rem;font-weight:800;color:#fff}
nav .logo span{color:${t.primary}}nav ul{list-style:none;display:flex;gap:2rem}nav ul a{font-size:.9rem;opacity:.7;font-weight:500;transition:all .2s}
nav ul a:hover{opacity:1;color:${t.primary}}.hero{padding:8rem 5% 6rem;max-width:1400px;margin:0 auto}
.hero .tag{display:inline-block;background:${t.primary}15;color:${t.primary};padding:.4rem 1.2rem;border-radius:50px;font-size:.8rem;font-weight:600;margin-bottom:2rem;border:1px solid ${t.primary}30}
.hero h1{font-size:5rem;font-weight:900;color:#fff;line-height:1.05;margin-bottom:1.5rem;max-width:900px}.hero h1 span{color:${t.primary}}
.hero p{font-size:1.2rem;opacity:.5;max-width:550px;line-height:1.7;margin-bottom:3rem}.hero-btns{display:flex;gap:1rem}
.btn-fill{background:${t.primary};color:#fff;padding:1rem 2.5rem;border-radius:50px;font-weight:700;border:none;cursor:pointer;transition:all .2s;font-size:1rem}
.btn-fill:hover{box-shadow:0 10px 30px ${t.primary}50;transform:translateY(-2px)}
.btn-line{color:#fff;padding:1rem 2.5rem;font-weight:600;font-size:1rem;border:2px solid rgba(255,255,255,.15);border-radius:50px;background:0;cursor:pointer;transition:all .2s}
.btn-line:hover{border-color:${t.primary}}.hero-img{position:relative;width:100%;max-width:500px;margin-left:auto}
.hero-img img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:24px;display:block}
.hero-img::before{content:'';position:absolute;inset:-15px;border:2px solid ${t.primary}30;border-radius:32px;z-index:-1}
.hero-img::after{content:'';position:absolute;bottom:-20px;right:-20px;width:200px;height:200px;background:${t.primary}15;border-radius:50%;z-index:-2;filter:blur(40px)}
.hero-img .badge-float{position:absolute;bottom:-15px;left:-15px;background:${t.darkAlt}ee;backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:1rem 1.5rem;display:flex;align-items:center;gap:.75rem;box-shadow:0 15px 30px rgba(0,0,0,.3)}
.hero-img .badge-float .bf-dot{width:10px;height:10px;border-radius:50%;background:${t.primary}}.hero-img .badge-float span{font-size:.8rem;font-weight:600;color:#fff}
/* SERVICES */.services{padding:6rem 5%;max-width:1400px;margin:0 auto}.services h2{font-size:2.5rem;font-weight:800;color:#fff;margin-bottom:3rem}
.services-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem}
.srv{background:${t.darkAlt};border:1px solid rgba(255,255,255,.06);border-radius:20px;padding:2.5rem;transition:all .3s;position:relative;overflow:hidden}
.srv:hover{border-color:${t.primary}40;transform:translateY(-5px)}
.srv::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,${t.primary},${t.accent});transform:scaleX(0);transition:transform .3s;transform-origin:left}
.srv:hover::before{transform:scaleX(1)}.srv .num{font-size:4rem;font-weight:900;color:${t.primary}15;position:absolute;top:1rem;right:1.5rem}
.srv h3{color:#fff;font-size:1.2rem;font-weight:700;margin-bottom:.75rem}.srv p{font-size:.9rem;opacity:.6;line-height:1.7}/* PORTFOLIO */
.portfolio{padding:6rem 5%;max-width:1400px;margin:0 auto}.portfolio h2{font-size:2.5rem;font-weight:800;color:#fff;margin-bottom:3rem}
.port-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1.5rem}
.port-item{aspect-ratio:16/10;background-size:cover;background-position:center;border:1px solid rgba(255,255,255,.06);border-radius:20px;display:flex;flex-direction:column;justify-content:flex-end;padding:2rem;position:relative;overflow:hidden;transition:all .3s}
.port-item:hover{border-color:${t.primary}40;transform:translateY(-5px)}.port-item h3{color:#fff;font-size:1.3rem;font-weight:700}
.port-item span{color:${t.primary};font-size:.85rem;font-weight:500;margin-top:.25rem}/* CONTACT */.contact{padding:6rem 5%;max-width:800px;margin:0 auto}
.contact h2{font-size:2.5rem;font-weight:800;color:#fff;margin-bottom:1rem;text-align:center}.contact>p{opacity:.5;text-align:center;margin-bottom:3rem}
.contact form{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem}
.contact input,.contact textarea{background:${t.darkAlt};border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:1rem 1.2rem;color:#fff;font-size:.95rem;outline:none;font-family:inherit;transition:border-color .2s}
.contact input:focus,.contact textarea:focus{border-color:${t.primary}}.contact textarea{grid-column:1/-1;min-height:140px;resize:vertical}
.contact button{grid-column:1/-1;background:${t.primary};color:#fff;padding:1rem;border-radius:12px;font-weight:700;font-size:1rem;border:none;cursor:pointer;transition:all .2s}
.contact button:hover{box-shadow:0 8px 25px ${t.primary}50}footer{padding:3rem 5%;border-top:1px solid rgba(255,255,255,.05);text-align:center;font-size:.85rem;opacity:.4}
@media(max-width:1024px){.services-grid{grid-template-columns:1fr}.port-grid{grid-template-columns:1fr}.hero h1{font-size:3.5rem}}
@media(max-width:640px){.hero h1{font-size:2.5rem}nav ul{display:none}.contact form{grid-template-columns:1fr}}
</style>
</head>
<body>
<nav><a href="#" class="logo">Studio<span>X</span></a><ul><li><a href="#">Work</a></li><li><a href="#">Services</a></li><li><a href="#">About</a></li><li><a href="#">Contact</a></li></ul><a href="#" class="btn-fill" style="padding:.6rem 1.5rem;font-size:.85rem">Hire Us</a></nav>
<section class="hero" style="display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;max-width:1400px;margin:0 auto;padding:8rem 5% 6rem">
  <div>
    <div class="tag">🏆 Award-Winning Agency</div>
    <h1>We create digital experiences that <span>matter</span></h1>
    <p>A design-led agency crafting world-class websites, brands, and products for ambitious companies worldwide.</p>
    <div class="hero-btns"><button class="btn-fill">See Our Work</button><button class="btn-line">Contact Us</button></div>
  </div>
  <div class="hero-img">
    <img src="${IMG.team}" alt="Our Team">
    <div class="badge-float"><div class="bf-dot"></div><span>50+ Projects Delivered</span></div>
  </div>
</section>
<section class="services">
  <h2>What we do</h2>
  <div class="services-grid">
    <div class="srv"><div class="num">01</div><h3>Brand Strategy</h3><p>We craft compelling brand identities that resonate with your audience and stand the test of time.</p></div>
    <div class="srv"><div class="num">02</div><h3>Web Design & Dev</h3><p>From concept to launch — responsive, accessible, and beautifully crafted digital experiences.</p></div>
    <div class="srv"><div class="num">03</div><h3>Digital Marketing</h3><p>Data-driven campaigns that drive real growth across search, social, and paid channels.</p></div>
  </div>
</section>
<section class="portfolio">
  <h2>Selected Work</h2>
  <div class="port-grid">
    <div class="port-item" style="background-image:linear-gradient(to top,rgba(0,0,0,.8),transparent),url(${IMG.shopping})"><h3>E-Commerce Redesign</h3><span>Web Design</span></div>
    <div class="port-item" style="background-image:linear-gradient(to top,rgba(0,0,0,.8),transparent),url(${IMG.finance})"><h3>FinTech Brand Identity</h3><span>Branding</span></div>
    <div class="port-item" style="background-image:linear-gradient(to top,rgba(0,0,0,.8),transparent),url(${IMG.hospital})"><h3>Healthcare App</h3><span>UI/UX Design</span></div>
    <div class="port-item" style="background-image:linear-gradient(to top,rgba(0,0,0,.8),transparent),url(${IMG.laptop})"><h3>SaaS Dashboard</h3><span>Product Design</span></div>
  </div>
</section>
<section class="contact">
  <h2>Let's work together</h2>
  <p>Tell us about your project and we'll get back to you within 24 hours.</p>
  <form>
    <input type="text" placeholder="Your Name"><input type="email" placeholder="Your Email">
    <input type="text" placeholder="Company" style="grid-column:1/-1">
    <textarea placeholder="Tell us about your project..."></textarea>
    <button type="submit">Send Message →</button>
  </form>
</section>
<footer><p>© 2026 StudioX. All rights reserved.</p></footer>
</body>
</html>`,
  },


  // ── PORTFOLIO ──────────────────────────────────────────────
  {
    id: "portfolio-dev",
    name: "Portfolio — Developer",
    category: "Portfolio",
    description: "Dark developer portfolio with terminal-style hero, project showcase, skills section, and contact.",
    thumb: "👨‍💻",
    getCode: (t) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Developer Portfolio</title>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:${t.dark};color:${t.text}}a{text-decoration:none;color:inherit}
nav{display:flex;align-items:center;justify-content:space-between;padding:1.5rem 5%;max-width:1200px;margin:0 auto}
nav .logo{font-family:'JetBrains Mono',monospace;font-size:1.2rem;font-weight:700;color:${t.primary}}nav ul{list-style:none;display:flex;gap:2rem}
nav ul a{font-size:.9rem;opacity:.6;font-weight:500;transition:all .2s}nav ul a:hover{color:${t.primary};opacity:1}.hero{padding:8rem 5% 6rem;max-width:1200px;margin:0 auto}
.hero .greeting{color:${t.primary};font-family:'JetBrains Mono',monospace;font-size:1rem;margin-bottom:1rem}
.hero h1{font-size:4rem;font-weight:800;color:#fff;line-height:1.15;margin-bottom:1.5rem}.hero h1 .typed{color:${t.primary};border-right:3px solid ${t.primary}}
.hero p{font-size:1.15rem;opacity:.5;max-width:600px;line-height:1.8;margin-bottom:2.5rem}.hero-links{display:flex;gap:1rem}
.hero-links a{display:flex;align-items:center;gap:.5rem;padding:.75rem 1.5rem;border:1px solid rgba(255,255,255,.1);border-radius:10px;font-size:.9rem;font-weight:500;transition:all .2s}
.hero-links a:hover{border-color:${t.primary};color:${t.primary}}/* TERMINAL */
.terminal{max-width:700px;margin:3rem 0;background:#0d1117;border:1px solid rgba(255,255,255,.08);border-radius:12px;overflow:hidden;font-family:'JetBrains Mono',monospace}
.terminal .bar{display:flex;gap:.5rem;padding:.75rem 1rem;background:rgba(255,255,255,.03);border-bottom:1px solid rgba(255,255,255,.05)}
.terminal .bar span{width:12px;height:12px;border-radius:50%}.terminal .bar span:nth-child(1){background:#ff5f57}.terminal .bar span:nth-child(2){background:#ffbd2e}
.terminal .bar span:nth-child(3){background:#28c840}.terminal pre{padding:1.5rem;font-size:.85rem;line-height:1.8;color:#8b949e}.terminal .cmd{color:${t.primary}}
.terminal .str{color:${t.accent}}.terminal .comment{color:#6e7681}/* PROJECTS */.projects{padding:6rem 5%;max-width:1200px;margin:0 auto}
.projects h2{font-size:2rem;font-weight:800;color:#fff;margin-bottom:2.5rem}.project-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:2rem}
.proj{background:${t.darkAlt};border:1px solid rgba(255,255,255,.06);border-radius:16px;padding:2rem;transition:all .3s}
.proj:hover{border-color:${t.primary}40;transform:translateY(-5px)}.proj .top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1rem}
.proj .top .folder{font-size:1.5rem}.proj .top .links{display:flex;gap:.5rem;opacity:.5}.proj h3{color:#fff;font-size:1.1rem;font-weight:700;margin-bottom:.5rem}
.proj p{font-size:.85rem;opacity:.5;line-height:1.7;margin-bottom:1rem}.proj .tags{display:flex;gap:.5rem;flex-wrap:wrap}
.proj .tags span{font-family:'JetBrains Mono',monospace;font-size:.7rem;color:${t.primary};background:${t.primary}15;padding:.25rem .75rem;border-radius:50px}/* SKILLS */
.skills{padding:6rem 5%;max-width:1200px;margin:0 auto}.skills h2{font-size:2rem;font-weight:800;color:#fff;margin-bottom:2.5rem}
.skills-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem}
.skill{background:${t.darkAlt};border:1px solid rgba(255,255,255,.04);border-radius:12px;padding:1.25rem;text-align:center;transition:all .2s}
.skill:hover{border-color:${t.primary}40}.skill .emoji{font-size:1.5rem;margin-bottom:.5rem}.skill span{font-size:.8rem;color:#fff;font-weight:500}
footer{padding:3rem 5%;max-width:1200px;margin:0 auto;border-top:1px solid rgba(255,255,255,.05);text-align:center;font-size:.85rem;opacity:.4}
@media(max-width:1024px){.project-grid{grid-template-columns:1fr}.skills-grid{grid-template-columns:repeat(3,1fr)}}
@media(max-width:640px){.hero h1{font-size:2.5rem}nav ul{display:none}.skills-grid{grid-template-columns:repeat(2,1fr)}}
</style>
</head>
<body>
<nav><a href="#" class="logo">&lt;/&gt; dev</a><ul><li><a href="#">About</a></li><li><a href="#">Projects</a></li><li><a href="#">Skills</a></li><li><a href="#">Contact</a></li></ul></nav>
<section class="hero">
  <div class="greeting">👋 Hey there, I'm</div>
  <h1>Alex Chen<br>Full-Stack <span class="typed">Developer</span></h1>
  <p>I build performant, accessible web applications with modern technologies. Currently focused on React, Node.js, and cloud architecture.</p>
  <div style="margin:2rem 0;display:flex;align-items:center;gap:1.5rem"><img src="${IMG.developer}" alt="Developer" style="width:80px;height:80px;border-radius:50%;object-fit:cover;border:3px solid ${t.primary}50"><div><div style="color:#fff;font-weight:700">Available for work</div><div style="font-size:.85rem;opacity:.5">Based in San Francisco, CA</div></div></div>
  <div class="hero-links"><a href="#">GitHub ↗</a><a href="#">LinkedIn ↗</a><a href="#">Resume ↗</a></div>
  <div class="terminal"><div class="bar"><span></span><span></span><span></span></div><pre><span class="comment">// about-me.js</span>
<span class="cmd">const</span> developer = {
  name: <span class="str">"Alex Chen"</span>,
  role: <span class="str">"Full-Stack Developer"</span>,
  stack: [<span class="str">"React"</span>, <span class="str">"Node.js"</span>, <span class="str">"TypeScript"</span>],
  passion: <span class="str">"Building great user experiences"</span>
};</pre></div>
</section>
<section class="projects"><h2>Featured Projects</h2><div class="project-grid">
  <div class="proj"><div class="top"><div class="folder">📁</div><div class="links">↗ 🔗</div></div><h3>E-Commerce Platform</h3><p>Full-stack marketplace with real-time inventory, Stripe payments, and admin dashboard.</p><div class="tags"><span>Next.js</span><span>Prisma</span><span>Stripe</span></div></div>
  <div class="proj"><div class="top"><div class="folder">📁</div><div class="links">↗ 🔗</div></div><h3>AI Chat Application</h3><p>Real-time chat app powered by GPT with context-aware responses and file uploads.</p><div class="tags"><span>React</span><span>Socket.io</span><span>OpenAI</span></div></div>
  <div class="proj"><div class="top"><div class="folder">📁</div><div class="links">↗ 🔗</div></div><h3>DevOps Dashboard</h3><p>Monitoring dashboard with live metrics, alerting, and deployment management.</p><div class="tags"><span>Vue.js</span><span>D3.js</span><span>Docker</span></div></div>
  <div class="proj"><div class="top"><div class="folder">📁</div><div class="links">↗ 🔗</div></div><h3>Open Source CLI Tool</h3><p>A CLI tool for scaffolding projects with 500+ GitHub stars and active community.</p><div class="tags"><span>Node.js</span><span>TypeScript</span><span>npm</span></div></div>
</div></section>
<section class="skills"><h2>Tech Stack</h2><div class="skills-grid">
  <div class="skill"><div class="emoji">⚛️</div><span>React</span></div>
  <div class="skill"><div class="emoji">🟢</div><span>Node.js</span></div>
  <div class="skill"><div class="emoji">🔷</div><span>TypeScript</span></div>
  <div class="skill"><div class="emoji">🐍</div><span>Python</span></div>
  <div class="skill"><div class="emoji">☁️</div><span>AWS</span></div>
  <div class="skill"><div class="emoji">🐳</div><span>Docker</span></div>
  <div class="skill"><div class="emoji">📊</div><span>PostgreSQL</span></div>
  <div class="skill"><div class="emoji">🔥</div><span>Firebase</span></div>
</div></section>
<footer><p>Built with ❤️ by Alex Chen · © 2026</p></footer>
</body>
</html>`,
  },

];


const removedIds = new Set([
  "saas-dark-hero", "saas-split-hero", "saas-neon-grid", "vertex-tech",
  "restaurant-elegant", "ecom-modern", "health-clinic", "startup-waitlist",
  "fintech-app", "edu-platform", "auto-luxury", "realestate-luxury",
  "fitness-gym", "travel-luxury",
]);
const lightIds = new Set([
  "health-light", "beauty-radiance",
  "nonprofit-greenroots", "pets-pawhaven", "hotel-azurebay",
  "events-everafter", "consulting-northbridge",
  "premium-fern-finance", "premium-atelier-nord",
  "premium-forge-athletics", "premium-lumen-skin",
  "premium-terra-ember", "premium-studio-vandal",
  "saas-prism-analytics",
]);
const skipEnhance = new Set([
  "saas-aurora-ai", "saas-nexus-dev", "saas-prism-analytics", "saas-zenith-enterprise",
  "immersive-stillwild", "immersive-maisonverre", "immersive-signalnoise", "immersive-modenord",
  "immersive-meridian", "immersive-frequency", "immersive-casaalba",
  "immersive-voidrunner", "immersive-atlasres", "immersive-elan",
  "restaurant-aura-dining",
  "jungle-canopy-zipline", "jungle-treehouse-hotel", "jungle-night-safari",
  "jungle-forest-conservation", "jungle-wildlife-safari", "jungle-adventure-tours",
  "jungle-eco-lodge", "jungle-botanical-garden", "jungle-wildlife-photography",
  "jungle-plant-shop", "jungle-survival-academy", "jungle-documentary",
  "jungle-herbal-medicine", "jungle-eco-fashion", "jungle-tropical-farm",
  "jungle-reptile-zoo", "jungle-charity", "jungle-yoga-retreat",
  "motion-cyber-shield", "motion-glass-product", "motion-holo-finance",
  "motion-kinetic-agency", "motion-neon-arcade", "motion-neural-ai",
  "motion-velocity-auto", "motion-marble-estate", "motion-titan-fitness",
  "motion-horizon-travel", "motion-pulse-health", "motion-aperture-photo",
  "motion-nova-edu", "motion-elan-fashion",
]);
// Hand-picked highest quality templates, in showcase order. Everything else is "Classic".
const premiumIds = [
  "saas-aurora-ai", "saas-prism-analytics", "saas-nexus-dev", "premium-studio-vandal",
  "restaurant-aura-dining", "premium-terra-ember", "realestate-luxury-apartments", "premium-oakline-estate",
  "premium-aster-health", "premium-fern-finance", "premium-forge-athletics", "premium-atelier-nord",
  "premium-kairn-alpine", "premium-lumen-skin", "premium-dune-atlas", "immersive-casaalba",
  "portfolio-bento", "immersive-stillwild", "jungle-treehouse-hotel", "events-everafter",
  "motion-cyber-shield", "motion-glass-product", "motion-holo-finance",
  "motion-kinetic-agency", "motion-neon-arcade", "motion-neural-ai",
  "motion-velocity-auto", "motion-marble-estate", "motion-titan-fitness",
  "motion-horizon-travel", "motion-pulse-health", "motion-aperture-photo",
  "motion-nova-edu", "motion-elan-fashion",
];
const premiumSet = new Set(premiumIds);

const slugify = (name: string) =>
  name.toLowerCase().replace(/[\s—/&]+/g, "-").replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-");

function buildAllTemplates(inlineTemplates: Template[], extraModules: unknown[][]) {
  const [
    saasPremium, advanced, extra, premium, premiumB, premiumC,
    immersive, immersiveB, immersiveC, jungle, restaurantAura, luxuryRealEstate,
    motion,
  ] = extraModules as Template[][];

  const raw = [
    ...(saasPremium || []),
    ...inlineTemplates.filter(t => !removedIds.has(t.id)),
    ...(advanced || []).filter(t => !removedIds.has(t.id)),
    ...(extra || []),
    ...(premium || []),
    ...(premiumB || []),
    ...(premiumC || []),
    ...(immersive || []),
    ...(immersiveB || []),
    ...(immersiveC || []),
    ...(jungle || []),
    ...(restaurantAura || []),
    ...(luxuryRealEstate || []),
    ...(motion || []),
  ];

  return raw.map(tpl =>
    skipEnhance.has(tpl.id) ? tpl : {
      ...tpl,
      getCode: (t: typeof colorThemes[0]) => {
        const html = tpl.getCode(t);
        return lightIds.has(tpl.id) ? enhanceLight(html, t) : enhanceDark(html, t);
      },
    }
  );
}

function EditorFromUrl({ onClose }: { onClose: () => void }) {
  const id = useSearchParams().get("edit");
  const template = id ? editableTemplates[id] : undefined;
  return template ? <LandingEditor key={template.id} template={template} onClose={onClose} /> : null;
}

export default function LandingPageGeneratorPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTheme, setActiveTheme] = useState(colorThemes[0]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [showCode, setShowCode] = useState(false);
  const { toast } = useToast();
  const { extra, loaded } = useTemplateModules();

  const allTemplates = useMemo(
    () => loaded ? buildAllTemplates(templates, extra) : templates.filter(t => !removedIds.has(t.id)),
    [extra, loaded]
  );

  const presentCategories = useMemo(
    () => categories.filter((c) => c === "All" || allTemplates.some((t) => t.category === c)),
    [allTemplates]
  );

  const { premium, classic } = useMemo(() => {
    const inCategory = allTemplates.filter((t) => activeCategory === "All" || t.category === activeCategory);
    return {
      premium: inCategory
        .filter((t) => premiumSet.has(t.id))
        .sort((a, b) => premiumIds.indexOf(a.id) - premiumIds.indexOf(b.id)),
      classic: inCategory.filter((t) => !premiumSet.has(t.id)),
    };
  }, [activeCategory, allTemplates]);

  // Prev/next walks premium first, then classic — the same order as the gallery
  const filtered = useMemo(() => [...premium, ...classic], [premium, classic]);

  const openTemplate = (t: Template) => {
    setSelectedTemplate(t);
    setShowCode(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // The editor lives at ?edit=<id>, so Back closes it and the link can be shared
  const pushedEditor = useRef(false);
  const openEditor = (id: string) => {
    window.history.pushState(null, "", `?edit=${encodeURIComponent(id)}`);
    pushedEditor.current = true;
  };
  const closeEditor = () => {
    if (pushedEditor.current) window.history.back();
    else window.history.replaceState(null, "", window.location.pathname);
    pushedEditor.current = false;
  };

  const handleCopy = () => {
    if (!selectedTemplate) return;
    navigator.clipboard.writeText(selectedTemplate.getCode(activeTheme));
    toast("HTML code copied to clipboard!");
  };

  const handleDownload = () => {
    if (!selectedTemplate) return;
    const blob = new Blob([selectedTemplate.getCode(activeTheme)], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slugify(selectedTemplate.name)}.html`;
    a.click();
    URL.revokeObjectURL(url);
    toast("HTML file downloaded!");
  };

  const currentIndex = selectedTemplate ? filtered.findIndex(t => t.id === selectedTemplate.id) : -1;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < filtered.length - 1;
  const goToPrev = () => { if (hasPrev) { setSelectedTemplate(filtered[currentIndex - 1]); setShowCode(false); } };
  const goToNext = () => { if (hasNext) { setSelectedTemplate(filtered[currentIndex + 1]); setShowCode(false); } };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedTemplate || showCode || new URLSearchParams(window.location.search).has("edit")) return;
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-10 sm:pb-14">
      <div className="mb-8">
        <ToolPageHeader title="Landing Page Templates" />
      </div>

      {/* Toolbar: theme + category */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-10">
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-sm font-medium text-foreground">Theme</span>
          <div className="flex items-center gap-1.5" role="radiogroup" aria-label="Color theme">
            {colorThemes.map((theme) => {
              const active = activeTheme.name === theme.name;
              return (
                <button
                  key={theme.name}
                  role="radio"
                  aria-checked={active}
                  aria-label={theme.name}
                  title={theme.name}
                  onClick={() => setActiveTheme(theme)}
                  className={`w-7 h-7 rounded-full p-0.5 transition-all cursor-pointer ${
                    active ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : "hover:scale-110"
                  }`}
                >
                  <span
                    className="block w-full h-full rounded-full border border-black/10"
                    style={{ background: `linear-gradient(135deg, ${theme.primary} 50%, ${theme.dark} 50%)` }}
                  />
                </button>
              );
            })}
          </div>
          <span className="text-xs text-muted hidden sm:inline">{activeTheme.name}</span>
        </div>

        <div className="flex gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:ml-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          {presentCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-3 h-8 text-[13px] font-medium rounded-full border transition-colors cursor-pointer ${
                activeCategory === cat
                  ? "bg-foreground text-background border-foreground"
                  : "border-surface-border text-muted hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {!selectedTemplate ? (
        <>
          {premium.length > 0 && (
            <section className="mb-16">
              <div className="flex items-end justify-between gap-4 mb-6">
                <div>
                  <div className="mb-2"><PremiumBadge /></div>
                  <h2 className="text-2xl font-bold tracking-tight">Premium templates</h2>
                  <p className="text-muted mt-1">Our hand-picked, highest quality designs. Hover a card to preview the full page.</p>
                </div>
                <span className="text-sm text-muted flex-shrink-0">{premium.length} templates</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {premium.map((template) => (
                  <PremiumCard
                    key={template.id}
                    editable={!!editableTemplates[template.id]}
                    template={template}
                    html={template.getCode(activeTheme)}
                    onOpen={() => openTemplate(template)}
                  />
                ))}
              </div>
            </section>
          )}

          {classic.length > 0 && (
            <section>
              <div className="flex items-end justify-between gap-4 mb-6 pt-10 border-t border-surface-border">
                <div>
                  <h2 className="text-xl font-semibold tracking-tight">Classic templates</h2>
                  <p className="text-sm text-muted mt-1">More layouts to start from. Preview, copy or download the HTML.</p>
                </div>
                <span className="text-sm text-muted flex-shrink-0">{classic.length} templates</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6">
                {classic.map((template) => (
                  <ClassicCard
                    key={template.id}
                    template={template}
                    html={template.getCode(activeTheme)}
                    onOpen={() => openTemplate(template)}
                  />
                ))}
              </div>
            </section>
          )}

          {!loaded && <p className="text-sm text-muted mt-6">Loading more templates…</p>}
        </>
      ) : (
        /* Template Detail View */
        <div>
          <div className="flex items-center justify-between gap-4 mb-6">
            <button
              onClick={() => { setSelectedTemplate(null); setShowCode(false); }}
              className="neu-btn h-9 px-3 text-sm font-medium text-muted hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
              All templates
            </button>
            <div className="flex items-center gap-2">
              <button onClick={goToPrev} disabled={!hasPrev} aria-label="Previous template" className="neu-btn w-9 h-9 disabled:opacity-30 disabled:cursor-not-allowed">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm text-muted tabular-nums min-w-[60px] text-center">{currentIndex + 1} / {filtered.length}</span>
              <button onClick={goToNext} disabled={!hasNext} aria-label="Next template" className="neu-btn w-9 h-9 disabled:opacity-30 disabled:cursor-not-allowed">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                {premiumSet.has(selectedTemplate.id) && <PremiumBadge />}
                <span className="text-xs text-muted">{selectedTemplate.category}</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight">{selectedTemplate.name}</h2>
              <p className="text-muted text-sm mt-1 max-w-2xl">{selectedTemplate.description}</p>
            </div>
            <div className="flex flex-wrap gap-2 flex-shrink-0">
              {editableTemplates[selectedTemplate.id] && (
                <button
                  onClick={() => openEditor(selectedTemplate.id)}
                  className="inline-flex items-center gap-2 h-10 px-4 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors cursor-pointer"
                >
                  <PenLine className="w-4 h-4" />
                  Customize
                </button>
              )}
              <button onClick={() => setShowCode(!showCode)} className="neu-btn h-10 px-4 text-sm font-medium text-foreground">
                {showCode ? <Eye className="w-4 h-4" /> : <Code2 className="w-4 h-4" />}
                {showCode ? "Preview" : "Code"}
              </button>
              <button onClick={handleCopy} className="neu-btn h-10 px-4 text-sm font-medium text-foreground">
                <Copy className="w-4 h-4" />
                Copy
              </button>
              <button
                onClick={handleDownload}
                className={
                  editableTemplates[selectedTemplate.id]
                    ? "neu-btn h-10 px-4 text-sm font-medium text-foreground"
                    : "inline-flex items-center gap-2 h-10 px-4 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors cursor-pointer"
                }
              >
                <Download className="w-4 h-4" />
                Download HTML
              </button>
            </div>
          </div>

          {showCode ? (
            <pre className="code-area p-5 text-[13px] overflow-auto max-h-[760px] whitespace-pre-wrap">
              {selectedTemplate.getCode(activeTheme)}
            </pre>
          ) : (
            <div className="neu-card overflow-hidden">
              <iframe
                srcDoc={selectedTemplate.getCode(activeTheme)}
                className="w-full h-[800px] border-0 block"
                title={selectedTemplate.name}
                sandbox="allow-scripts"
              />
            </div>
          )}
        </div>
      )}
      <Suspense fallback={null}>
        <EditorFromUrl onClose={closeEditor} />
      </Suspense>
    </div>
  );
}
