"use client";

import { useState, useMemo, useEffect } from "react";
import { useToast } from "../../components/toast";
import { advancedTemplates } from "./advanced-templates";
import { extraTemplates } from "./extra-templates";
import { immersiveTemplates } from "./immersive-templates";
import { immersiveTemplatesB } from "./immersive-templates-b";
import { immersiveTemplatesC } from "./immersive-templates-c";
import { jungleTemplates } from "./jungle-templates";
import { premiumTemplates } from "./premium-templates";
import { premiumTemplatesB } from "./premium-templates-b";
import { premiumTemplatesC } from "./premium-templates-c";
import { vertexTemplates } from "./vertex-templates";

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
  { name: "Cyan Blue", primary: "#00b4d8", secondary: "#0077b6", accent: "#90e0ef", dark: "#0a192f", darkAlt: "#112240", text: "#ccd6f6", light: "#e0f7fa" },
  { name: "Electric Purple", primary: "#8b5cf6", secondary: "#6d28d9", accent: "#c4b5fd", dark: "#0f0a1e", darkAlt: "#1a1333", text: "#d4d0e8", light: "#f3f0ff" },
  { name: "Neon Green", primary: "#10b981", secondary: "#059669", accent: "#6ee7b7", dark: "#0a1f1a", darkAlt: "#0f2e25", text: "#b8e0d2", light: "#ecfdf5" },
  { name: "Hot Orange", primary: "#f97316", secondary: "#ea580c", accent: "#fdba74", dark: "#1a0f05", darkAlt: "#2a1a0a", text: "#f5d0a9", light: "#fff7ed" },
  { name: "Rose Red", primary: "#f43f5e", secondary: "#e11d48", accent: "#fda4af", dark: "#1a0a10", darkAlt: "#2a111c", text: "#f5c6d0", light: "#fff1f2" },
  { name: "Royal Gold", primary: "#eab308", secondary: "#ca8a04", accent: "#fde68a", dark: "#1a1505", darkAlt: "#2a220a", text: "#f5e6a3", light: "#fefce8" },
  { name: "Sunset Coral", primary: "#ff6b6b", secondary: "#e63946", accent: "#ffb4a2", dark: "#1a0b0b", darkAlt: "#2a1414", text: "#f5d0c9", light: "#fff1f0" },
  { name: "Ocean Teal", primary: "#14b8a6", secondary: "#0f766e", accent: "#99f6e4", dark: "#04201d", darkAlt: "#0a2e2a", text: "#ccfbf1", light: "#f0fdfa" },
  { name: "Midnight Indigo", primary: "#6366f1", secondary: "#4338ca", accent: "#a5b4fc", dark: "#0a0a1f", darkAlt: "#131333", text: "#d4d4f5", light: "#eef2ff" },
  { name: "Lavender Dream", primary: "#a78bfa", secondary: "#7c3aed", accent: "#ddd6fe", dark: "#120a1f", darkAlt: "#1e1333", text: "#e0d8f0", light: "#f5f3ff" },
  { name: "Sky Blue", primary: "#0ea5e9", secondary: "#0369a1", accent: "#7dd3fc", dark: "#061a2a", darkAlt: "#0b2638", text: "#c9e9f8", light: "#f0f9ff" },
  { name: "Emerald Forest", primary: "#059669", secondary: "#047857", accent: "#6ee7b7", dark: "#041f17", darkAlt: "#0a2e24", text: "#c6f0e0", light: "#ecfdf5" },
  { name: "Lime Punch", primary: "#84cc16", secondary: "#4d7c0f", accent: "#d9f99d", dark: "#121a05", darkAlt: "#1f2a0a", text: "#e4f5b8", light: "#f7fee7" },
  { name: "Magenta Pop", primary: "#d946ef", secondary: "#a21caf", accent: "#f5d0fe", dark: "#1a0a1f", darkAlt: "#2a1230", text: "#f0c6f0", light: "#fdf4ff" },
  { name: "Copper Amber", primary: "#d97706", secondary: "#92400e", accent: "#fcd34d", dark: "#1a1005", darkAlt: "#2a1b0a", text: "#f0d9a8", light: "#fffbeb" },
  { name: "Crimson Red", primary: "#dc2626", secondary: "#991b1b", accent: "#fca5a5", dark: "#1a0808", darkAlt: "#2a1010", text: "#f0c6c6", light: "#fef2f2" },
  { name: "Steel Slate", primary: "#64748b", secondary: "#475569", accent: "#cbd5e1", dark: "#0b1220", darkAlt: "#131c2e", text: "#d7dee8", light: "#f8fafc" },
  { name: "Candy Pink", primary: "#ec4899", secondary: "#be185d", accent: "#fbcfe8", dark: "#1a0a12", darkAlt: "#2a101c", text: "#f5c6da", light: "#fdf2f8" },
  { name: "Desert Sand", primary: "#d4a373", secondary: "#b08968", accent: "#faedcd", dark: "#1a150e", darkAlt: "#2a2118", text: "#f0e0c8", light: "#fefae0" },
  { name: "Aurora Mint", primary: "#34d399", secondary: "#059669", accent: "#a7f3d0", dark: "#03201a", darkAlt: "#0a2e26", text: "#c6f5e5", light: "#f0fdf9" },
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

  // ── TECH / SAAS ────────────────────────────────────────────
  {
    id: "saas-dark-hero",
    name: "SaaS — Blob Shape Hero",
    category: "Tech / SaaS",
    description: "Dark hero with organic blob shape around person image, decorative outlines, floating stats cards, gradient CTA, features grid.",
    thumb: "🖥️",
    getCode: (t) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>TechFlow</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;color:${t.text};background:${t.dark}}
a{text-decoration:none;color:inherit}
nav{display:flex;align-items:center;justify-content:space-between;padding:1.5rem 5%;max-width:1400px;margin:0 auto}
nav .logo{font-size:1.5rem;font-weight:800;color:#fff}
nav .logo span{color:${t.primary}}
nav ul{list-style:none;display:flex;gap:2.5rem}
nav ul a{font-size:.9rem;font-weight:500;opacity:.7;transition:all .3s}
nav ul a:hover{opacity:1;color:${t.primary}}
nav .nav-cta{background:${t.primary};color:#fff;padding:.7rem 1.8rem;border-radius:50px;font-weight:600;font-size:.85rem;transition:all .3s}
nav .nav-cta:hover{box-shadow:0 8px 30px ${t.primary}55;transform:translateY(-2px)}
/* HERO */
.hero{position:relative;min-height:100vh;display:flex;align-items:center;overflow:hidden;padding:4rem 5%}
.hero-bg{position:absolute;inset:0;overflow:hidden;z-index:0}
.hero-bg .glow{position:absolute;border-radius:50%;filter:blur(120px);opacity:.35}
.hero-bg .glow-1{width:600px;height:600px;background:${t.primary};top:-10%;right:20%}
.hero-bg .glow-2{width:400px;height:400px;background:${t.secondary};bottom:5%;left:5%}
.hero-bg .glow-3{width:300px;height:300px;background:${t.accent};top:60%;right:-5%}
.hero-inner{max-width:1400px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;position:relative;z-index:1;width:100%}
.hero-text h1{font-size:3.8rem;font-weight:800;line-height:1.08;color:#fff;margin-bottom:1.5rem}
.hero-text h1 span{background:linear-gradient(135deg,${t.primary},${t.accent});-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero-text p{font-size:1.1rem;line-height:1.8;opacity:.55;margin-bottom:2rem;max-width:480px}
.hero-text .form-row{display:flex;gap:.75rem;margin-bottom:1.5rem;max-width:440px}
.hero-text .form-row input{flex:1;background:${t.darkAlt};border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:.9rem 1.2rem;color:#fff;font-size:.9rem;outline:none;font-family:inherit}
.hero-text .form-row input:focus{border-color:${t.primary}}
.hero-text .form-row input::placeholder{color:rgba(255,255,255,.3)}
.btn-hero{background:linear-gradient(135deg,${t.primary},${t.secondary});color:#fff;padding:.95rem 2.5rem;border-radius:12px;font-weight:700;font-size:.95rem;border:none;cursor:pointer;transition:all .3s;display:inline-flex;align-items:center;gap:.5rem}
.btn-hero:hover{transform:translateY(-3px);box-shadow:0 15px 40px ${t.primary}50}
.btn-hero svg{width:16px;height:16px;fill:currentColor}
.hero-trust{display:flex;align-items:center;gap:1rem;margin-top:1rem}
.hero-trust .avatars{display:flex}
.hero-trust .avatars img{width:36px;height:36px;border-radius:50%;border:3px solid ${t.dark};margin-left:-10px;object-fit:cover}
.hero-trust .avatars img:first-child{margin-left:0}
.hero-trust p{font-size:.85rem;opacity:.5}
.hero-trust p strong{color:#fff;opacity:1}
/* HERO IMAGE WITH BLOB */
.hero-visual{position:relative;display:flex;justify-content:center}
.blob-wrap{position:relative;width:460px;height:540px}
.blob-shape{position:absolute;inset:0;z-index:1}
.blob-shape svg{width:100%;height:100%}
.blob-img{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:340px;height:440px;z-index:2;border-radius:30% 70% 70% 30%/30% 30% 70% 70%;overflow:hidden;box-shadow:0 30px 60px rgba(0,0,0,.4)}
.blob-img img{width:100%;height:100%;object-fit:cover}
.outline-blob{position:absolute;inset:-25px;z-index:0;opacity:.15}
.outline-blob svg{width:100%;height:100%}
/* FLOATING CARDS */
.float-card{position:absolute;z-index:3;background:${t.darkAlt}ee;backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:1rem 1.5rem;display:flex;align-items:center;gap:.75rem;box-shadow:0 20px 40px rgba(0,0,0,.3)}
.float-card.fc1{top:40px;left:-50px}
.float-card.fc2{bottom:60px;right:-40px}
.float-card .fc-icon{width:42px;height:42px;border-radius:12px;background:linear-gradient(135deg,${t.primary}30,${t.secondary}20);display:flex;align-items:center;justify-content:center;font-size:1.1rem}
.float-card .fc-text span{font-size:.85rem;font-weight:700;color:#fff;display:block}
.float-card .fc-text small{font-size:.7rem;opacity:.5}
/* STATS */
.stats{padding:4rem 5%;background:linear-gradient(180deg,${t.darkAlt},${t.dark});border-top:1px solid rgba(255,255,255,.04);border-bottom:1px solid rgba(255,255,255,.04)}
.stats-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:2rem;text-align:center}
.stat-box .num{font-size:2.8rem;font-weight:900;background:linear-gradient(135deg,${t.primary},${t.accent});-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.stat-box .label{font-size:.85rem;opacity:.45;margin-top:.25rem}
/* FEATURES */
.features{padding:6rem 5%;max-width:1200px;margin:0 auto}
.tag{display:inline-block;background:${t.primary}15;color:${t.primary};padding:.45rem 1.2rem;border-radius:50px;font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:1rem;border:1px solid ${t.primary}25}
.features h2{font-size:2.8rem;font-weight:800;color:#fff;margin-bottom:.5rem}
.features>p{opacity:.45;font-size:1.05rem;margin-bottom:3.5rem;max-width:500px}
.feat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem}
.feat{background:${t.darkAlt};border:1px solid rgba(255,255,255,.05);border-radius:20px;padding:2rem;transition:all .4s;position:relative;overflow:hidden}
.feat::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,${t.primary},${t.accent});transform:scaleX(0);transition:transform .4s;transform-origin:left}
.feat:hover{transform:translateY(-8px);border-color:${t.primary}30;box-shadow:0 20px 40px rgba(0,0,0,.2)}
.feat:hover::before{transform:scaleX(1)}
.feat .fi{width:52px;height:52px;background:linear-gradient(135deg,${t.primary}20,${t.secondary}10);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:1.4rem;margin-bottom:1.25rem}
.feat h3{font-size:1.1rem;font-weight:700;color:#fff;margin-bottom:.5rem}
.feat p{font-size:.85rem;opacity:.5;line-height:1.7}
/* CTA */
.cta{padding:6rem 5%}
.cta-box{max-width:1000px;margin:0 auto;background:linear-gradient(135deg,${t.primary},${t.secondary});border-radius:28px;padding:5rem 4rem;position:relative;overflow:hidden;text-align:center}
.cta-box::before{content:'';position:absolute;width:500px;height:500px;background:rgba(255,255,255,.08);border-radius:50%;top:-40%;right:-15%}
.cta-box::after{content:'';position:absolute;width:300px;height:300px;background:rgba(255,255,255,.06);border-radius:50%;bottom:-20%;left:-10%}
.cta-box h2{font-size:2.8rem;font-weight:800;color:#fff;margin-bottom:1rem;position:relative;z-index:1}
.cta-box p{color:rgba(255,255,255,.8);font-size:1.1rem;margin-bottom:2.5rem;position:relative;z-index:1;max-width:500px;margin-left:auto;margin-right:auto}
.btn-w{background:#fff;color:${t.dark};padding:1.1rem 3rem;border-radius:14px;font-weight:700;font-size:1rem;border:none;cursor:pointer;position:relative;z-index:1;transition:all .3s;box-shadow:0 8px 25px rgba(0,0,0,.2)}
.btn-w:hover{transform:translateY(-3px);box-shadow:0 15px 40px rgba(0,0,0,.3)}
footer{padding:3rem 5%;border-top:1px solid rgba(255,255,255,.04);text-align:center;font-size:.85rem;opacity:.35}
@media(max-width:1024px){.hero-inner{grid-template-columns:1fr;text-align:center}.hero-text p,.hero-text .form-row{margin-left:auto;margin-right:auto}.hero-trust{justify-content:center}.hero-visual{margin-top:2rem}.blob-wrap{width:340px;height:400px}.blob-img{width:260px;height:340px}.feat-grid,.stats-inner{grid-template-columns:repeat(2,1fr)}.hero-text h1{font-size:3rem}.float-card{display:none}}
@media(max-width:640px){.hero-text h1{font-size:2.3rem}nav ul{display:none}.feat-grid,.stats-inner{grid-template-columns:1fr}.cta-box{padding:3rem 2rem}.cta-box h2{font-size:2rem}.hero-text .form-row{flex-direction:column}}
</style>
</head>
<body>
<nav>
  <a href="#" class="logo">Tech<span>Flow</span></a>
  <ul><li><a href="#">Home</a></li><li><a href="#">Features</a></li><li><a href="#">Pricing</a></li><li><a href="#">About</a></li><li><a href="#">Contact</a></li></ul>
  <a href="#" class="nav-cta">Get Started</a>
</nav>
<section class="hero">
  <div class="hero-bg"><div class="glow glow-1"></div><div class="glow glow-2"></div><div class="glow glow-3"></div></div>
  <div class="hero-inner">
    <div class="hero-text">
      <h1>Build Products <span>10x Faster</span> with AI</h1>
      <p>The all-in-one platform that helps teams ship faster with automated workflows, real-time collaboration, and powerful analytics.</p>
      <div class="form-row"><input type="text" placeholder="Your Name"><input type="email" placeholder="Your Email"></div>
      <button class="btn-hero">Get Started Free <svg viewBox="0 0 24 24"><path d="M5 12h14m-7-7 7 7-7 7"/></svg></button>
      <div class="hero-trust">
        <div class="avatars">
          <img src="${IMG.business}" alt="User"><img src="${IMG.woman}" alt="User"><img src="${IMG.developer}" alt="User">
        </div>
        <p><strong>12,000+</strong> teams already onboard</p>
      </div>
    </div>
    <div class="hero-visual">
      <div class="blob-wrap">
        <div class="outline-blob"><svg viewBox="0 0 500 600"><path d="M430 140C470 210 490 310 450 400C410 490 310 560 220 560C130 560 50 490 30 400C10 310 50 210 100 140C150 70 210 20 280 10C350 0 390 70 430 140Z" fill="none" stroke="rgba(255,255,255,.3)" stroke-width="2"/></svg></div>
        <div class="blob-shape"><svg viewBox="0 0 500 600"><defs><clipPath id="blobClip"><path d="M420 150C455 215 480 305 445 390C410 475 320 545 230 550C140 555 60 480 35 395C10 310 40 215 90 145C140 75 210 25 280 15C350 5 385 85 420 150Z"/></clipPath></defs><rect width="500" height="600" clip-path="url(#blobClip)" fill="${t.primary}20"/></svg></div>
        <div class="blob-img"><img src="${IMG.business}" alt="Professional"></div>
        <div class="float-card fc1"><div class="fc-icon">📈</div><div class="fc-text"><span>+24.5%</span><small>Revenue Growth</small></div></div>
        <div class="float-card fc2"><div class="fc-icon">👥</div><div class="fc-text"><span>12,400</span><small>Active Users</small></div></div>
      </div>
    </div>
  </div>
</section>
<div class="stats"><div class="stats-inner">
  <div class="stat-box"><div class="num">10K+</div><div class="label">Active Users</div></div>
  <div class="stat-box"><div class="num">99.9%</div><div class="label">Uptime SLA</div></div>
  <div class="stat-box"><div class="num">50M+</div><div class="label">Tasks Automated</div></div>
  <div class="stat-box"><div class="num">4.9★</div><div class="label">User Rating</div></div>
</div></div>
<section class="features">
  <div class="tag">Features</div>
  <h2>Everything you need to scale</h2>
  <p>Powerful tools designed for modern teams.</p>
  <div class="feat-grid">
    <div class="feat"><div class="fi">⚡</div><h3>Lightning Fast</h3><p>Deploy in seconds with our automated CI/CD pipeline and edge infrastructure.</p></div>
    <div class="feat"><div class="fi">🔒</div><h3>Enterprise Security</h3><p>SOC2 compliant with end-to-end encryption, SSO, and access controls.</p></div>
    <div class="feat"><div class="fi">📊</div><h3>Real-Time Analytics</h3><p>Track every metric with customizable dashboards and reporting.</p></div>
    <div class="feat"><div class="fi">🤖</div><h3>AI Automation</h3><p>Automate repetitive tasks with intelligent ML-powered workflows.</p></div>
    <div class="feat"><div class="fi">🔗</div><h3>200+ Integrations</h3><p>Connect with Slack, GitHub, Jira, and more out of the box.</p></div>
    <div class="feat"><div class="fi">📱</div><h3>Mobile Ready</h3><p>Manage everything on the go with our responsive mobile experience.</p></div>
  </div>
</section>
<section class="cta"><div class="cta-box"><h2>Ready to get started?</h2><p>Join thousands of teams already building faster with TechFlow.</p><button class="btn-w">Start Free Trial →</button></div></section>
<footer><p>© 2026 TechFlow. All rights reserved.</p></footer>
</body>
</html>`,
  },

  {
    id: "saas-split-hero",
    name: "SaaS — Glass Morphism",
    category: "Tech / SaaS",
    description: "Glassmorphic cards, animated gradient blobs, pricing section, and newsletter form.",
    thumb: "💎",
    getCode: (t) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>CloudSync Pro</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;color:${t.text};background:${t.dark};overflow-x:hidden}
a{text-decoration:none;color:inherit}
nav{display:flex;align-items:center;justify-content:space-between;padding:1.5rem 5%;max-width:1400px;margin:0 auto}
nav .logo{font-size:1.5rem;font-weight:800;color:#fff}
nav .logo span{color:${t.primary}}
nav ul{list-style:none;display:flex;gap:2rem}
nav ul a{font-size:.9rem;font-weight:500;opacity:.7;transition:all .2s}
nav ul a:hover{opacity:1;color:${t.primary}}
.hero{min-height:100vh;display:flex;align-items:center;position:relative;padding:0 5%}
.blob{position:absolute;border-radius:50%;filter:blur(80px);opacity:.4;z-index:0}
.blob-1{width:500px;height:500px;background:${t.primary};top:10%;left:60%}
.blob-2{width:400px;height:400px;background:${t.secondary};bottom:10%;left:10%}
.hero-content{max-width:1400px;margin:0 auto;position:relative;z-index:1;text-align:center;width:100%}
.hero-content h1{font-size:4rem;font-weight:800;color:#fff;line-height:1.1;margin-bottom:1.5rem}
.hero-content h1 span{background:linear-gradient(135deg,${t.primary},${t.accent});-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero-content p{font-size:1.2rem;opacity:.6;max-width:600px;margin:0 auto 2.5rem;line-height:1.7}
.hero-btns{display:flex;gap:1rem;justify-content:center}
.btn-glow{background:${t.primary};color:#fff;padding:1rem 2.5rem;border-radius:50px;font-weight:700;font-size:1rem;border:none;cursor:pointer;box-shadow:0 0 30px ${t.primary}50;transition:all .2s}
.btn-glow:hover{box-shadow:0 0 50px ${t.primary}80;transform:translateY(-2px)}
.btn-ghost{background:rgba(255,255,255,.05);backdrop-filter:blur(20px);color:#fff;padding:1rem 2.5rem;border-radius:50px;font-weight:600;font-size:1rem;border:1px solid rgba(255,255,255,.1);cursor:pointer;transition:all .2s}
.btn-ghost:hover{border-color:${t.primary};background:rgba(255,255,255,.08)}
.glass-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem;padding:0 5%;max-width:1400px;margin:-4rem auto 0;position:relative;z-index:2}
.glass-card{background:rgba(255,255,255,.04);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.08);border-radius:20px;padding:2.5rem;transition:all .3s}
.glass-card:hover{transform:translateY(-8px);border-color:${t.primary}40;background:rgba(255,255,255,.06)}
.glass-card .icon{width:60px;height:60px;background:linear-gradient(135deg,${t.primary},${t.secondary});border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:1.5rem;margin-bottom:1.5rem}
.glass-card h3{color:#fff;font-size:1.2rem;font-weight:700;margin-bottom:.75rem}
.glass-card p{font-size:.9rem;opacity:.6;line-height:1.7}
/* PRICING */
.pricing{padding:6rem 5%;max-width:1400px;margin:0 auto;text-align:center}
.pricing h2{font-size:2.5rem;font-weight:800;color:#fff;margin-bottom:.5rem}
.pricing>p{opacity:.6;margin-bottom:3rem;font-size:1.05rem}
.pricing-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem;text-align:left}
.price-card{background:${t.darkAlt};border:1px solid rgba(255,255,255,.06);border-radius:20px;padding:2.5rem;position:relative;transition:all .3s}
.price-card.popular{border-color:${t.primary};background:linear-gradient(135deg,${t.darkAlt},${t.primary}10)}
.price-card.popular::after{content:'Popular';position:absolute;top:-12px;right:20px;background:${t.primary};color:#fff;padding:.3rem 1rem;border-radius:50px;font-size:.75rem;font-weight:700}
.price-card h3{color:#fff;font-size:1.1rem;font-weight:600;margin-bottom:1rem}
.price-card .price{font-size:3rem;font-weight:800;color:#fff;margin-bottom:.25rem}
.price-card .price span{font-size:1rem;font-weight:400;opacity:.5}
.price-card .period{font-size:.85rem;opacity:.5;margin-bottom:1.5rem}
.price-card ul{list-style:none;margin-bottom:2rem}
.price-card ul li{padding:.5rem 0;font-size:.9rem;opacity:.7;border-bottom:1px solid rgba(255,255,255,.04);display:flex;align-items:center;gap:.5rem}
.price-card ul li::before{content:'✓';color:${t.primary};font-weight:700}
.price-card button{width:100%;padding:.9rem;border-radius:12px;font-weight:600;font-size:.95rem;cursor:pointer;border:none;transition:all .2s}
.price-card button{background:rgba(255,255,255,.06);color:#fff;border:1px solid rgba(255,255,255,.1)}
.price-card.popular button{background:${t.primary};color:#fff;border:none;box-shadow:0 8px 25px ${t.primary}40}
/* NEWSLETTER */
.newsletter{padding:4rem 5%;text-align:center}
.newsletter-box{max-width:600px;margin:0 auto;background:${t.darkAlt};border:1px solid rgba(255,255,255,.06);border-radius:20px;padding:3rem}
.newsletter-box h3{color:#fff;font-size:1.3rem;font-weight:700;margin-bottom:.5rem}
.newsletter-box p{opacity:.5;font-size:.9rem;margin-bottom:1.5rem}
.newsletter-form{display:flex;gap:.75rem}
.newsletter-form input{flex:1;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:.85rem 1.2rem;color:#fff;font-size:.9rem;outline:none}
.newsletter-form input:focus{border-color:${t.primary}}
.newsletter-form button{background:${t.primary};color:#fff;padding:.85rem 1.8rem;border-radius:12px;font-weight:600;border:none;cursor:pointer;white-space:nowrap}
footer{padding:3rem 5%;border-top:1px solid rgba(255,255,255,.05);text-align:center;font-size:.85rem;opacity:.4}
@media(max-width:1024px){.glass-cards,.pricing-grid{grid-template-columns:1fr}.hero-content h1{font-size:2.8rem}}
@media(max-width:640px){.hero-content h1{font-size:2.2rem}nav ul{display:none}.newsletter-form{flex-direction:column}}
</style>
</head>
<body>
<nav><a href="#" class="logo">Cloud<span>Sync</span></a><ul><li><a href="#">Features</a></li><li><a href="#">Pricing</a></li><li><a href="#">Docs</a></li><li><a href="#">Contact</a></li></ul><a href="#" class="btn-glow" style="padding:.6rem 1.5rem;font-size:.85rem;border-radius:50px">Get Started</a></nav>
<section class="hero">
  <div class="blob blob-1"></div><div class="blob blob-2"></div>
  <div class="hero-content">
    <h1>The Future of <span>Cloud Computing</span></h1>
    <p>Deploy, scale, and manage your applications with zero-config infrastructure. Built for the modern web.</p>
    <div class="hero-btns"><button class="btn-glow">Start Building Free</button><button class="btn-ghost">View Documentation</button></div>
  </div>
</section>
<div class="glass-cards">
  <div class="glass-card"><div class="icon">🌐</div><h3>Global Edge Network</h3><p>Deploy to 200+ edge locations worldwide. Your content loads in under 50ms everywhere.</p></div>
  <div class="glass-card"><div class="icon">🔐</div><h3>Zero-Trust Security</h3><p>Enterprise-grade security with automatic SSL, DDoS protection, and compliance tools.</p></div>
  <div class="glass-card"><div class="icon">📈</div><h3>Auto Scaling</h3><p>Handle any traffic spike automatically. Scale from zero to millions without configuration.</p></div>
</div>
<section class="pricing">
  <h2>Simple, transparent pricing</h2>
  <p>No hidden fees. No surprises. Cancel anytime.</p>
  <div class="pricing-grid">
    <div class="price-card"><h3>Starter</h3><div class="price">$0<span>/mo</span></div><div class="period">Free forever</div><ul><li>3 projects</li><li>1GB storage</li><li>Community support</li><li>Basic analytics</li></ul><button>Get Started</button></div>
    <div class="price-card popular"><h3>Pro</h3><div class="price">$29<span>/mo</span></div><div class="period">Per seat, billed annually</div><ul><li>Unlimited projects</li><li>100GB storage</li><li>Priority support</li><li>Advanced analytics</li></ul><button>Start Free Trial</button></div>
    <div class="price-card"><h3>Enterprise</h3><div class="price">Custom</div><div class="period">Tailored for your org</div><ul><li>Everything in Pro</li><li>Unlimited storage</li><li>24/7 dedicated support</li><li>Custom SLA</li></ul><button>Contact Sales</button></div>
  </div>
</section>
<section class="newsletter"><div class="newsletter-box"><h3>Stay updated</h3><p>Get the latest product news and engineering insights.</p><div class="newsletter-form"><input type="email" placeholder="Enter your email"><button>Subscribe</button></div></div></section>
<footer><p>© 2026 CloudSync. All rights reserved.</p></footer>
</body>
</html>`,
  },

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
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;background:${t.dark};color:${t.text}}
a{text-decoration:none;color:inherit}
nav{display:flex;align-items:center;justify-content:space-between;padding:1.5rem 5%;max-width:1400px;margin:0 auto}
nav .logo{font-size:1.4rem;font-weight:800;color:#fff}
nav .logo span{color:${t.primary}}
nav ul{list-style:none;display:flex;gap:2rem}
nav ul a{font-size:.9rem;opacity:.7;font-weight:500;transition:all .2s}
nav ul a:hover{opacity:1;color:${t.primary}}
.hero{padding:8rem 5% 6rem;max-width:1400px;margin:0 auto}
.hero .tag{display:inline-block;background:${t.primary}15;color:${t.primary};padding:.4rem 1.2rem;border-radius:50px;font-size:.8rem;font-weight:600;margin-bottom:2rem;border:1px solid ${t.primary}30}
.hero h1{font-size:5rem;font-weight:900;color:#fff;line-height:1.05;margin-bottom:1.5rem;max-width:900px}
.hero h1 span{color:${t.primary}}
.hero p{font-size:1.2rem;opacity:.5;max-width:550px;line-height:1.7;margin-bottom:3rem}
.hero-btns{display:flex;gap:1rem}
.btn-fill{background:${t.primary};color:#fff;padding:1rem 2.5rem;border-radius:50px;font-weight:700;border:none;cursor:pointer;transition:all .2s;font-size:1rem}
.btn-fill:hover{box-shadow:0 10px 30px ${t.primary}50;transform:translateY(-2px)}
.btn-line{color:#fff;padding:1rem 2.5rem;font-weight:600;font-size:1rem;border:2px solid rgba(255,255,255,.15);border-radius:50px;background:0;cursor:pointer;transition:all .2s}
.btn-line:hover{border-color:${t.primary}}
.hero-img{position:relative;width:100%;max-width:500px;margin-left:auto}
.hero-img img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:24px;display:block}
.hero-img::before{content:'';position:absolute;inset:-15px;border:2px solid ${t.primary}30;border-radius:32px;z-index:-1}
.hero-img::after{content:'';position:absolute;bottom:-20px;right:-20px;width:200px;height:200px;background:${t.primary}15;border-radius:50%;z-index:-2;filter:blur(40px)}
.hero-img .badge-float{position:absolute;bottom:-15px;left:-15px;background:${t.darkAlt}ee;backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:1rem 1.5rem;display:flex;align-items:center;gap:.75rem;box-shadow:0 15px 30px rgba(0,0,0,.3)}
.hero-img .badge-float .bf-dot{width:10px;height:10px;border-radius:50%;background:${t.primary}}
.hero-img .badge-float span{font-size:.8rem;font-weight:600;color:#fff}
/* SERVICES */
.services{padding:6rem 5%;max-width:1400px;margin:0 auto}
.services h2{font-size:2.5rem;font-weight:800;color:#fff;margin-bottom:3rem}
.services-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem}
.srv{background:${t.darkAlt};border:1px solid rgba(255,255,255,.06);border-radius:20px;padding:2.5rem;transition:all .3s;position:relative;overflow:hidden}
.srv:hover{border-color:${t.primary}40;transform:translateY(-5px)}
.srv::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,${t.primary},${t.accent});transform:scaleX(0);transition:transform .3s;transform-origin:left}
.srv:hover::before{transform:scaleX(1)}
.srv .num{font-size:4rem;font-weight:900;color:${t.primary}15;position:absolute;top:1rem;right:1.5rem}
.srv h3{color:#fff;font-size:1.2rem;font-weight:700;margin-bottom:.75rem}
.srv p{font-size:.9rem;opacity:.6;line-height:1.7}
/* PORTFOLIO */
.portfolio{padding:6rem 5%;max-width:1400px;margin:0 auto}
.portfolio h2{font-size:2.5rem;font-weight:800;color:#fff;margin-bottom:3rem}
.port-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1.5rem}
.port-item{aspect-ratio:16/10;background-size:cover;background-position:center;border:1px solid rgba(255,255,255,.06);border-radius:20px;display:flex;flex-direction:column;justify-content:flex-end;padding:2rem;position:relative;overflow:hidden;transition:all .3s}
.port-item:hover{border-color:${t.primary}40;transform:translateY(-5px)}
.port-item h3{color:#fff;font-size:1.3rem;font-weight:700}
.port-item span{color:${t.primary};font-size:.85rem;font-weight:500;margin-top:.25rem}
/* CONTACT */
.contact{padding:6rem 5%;max-width:800px;margin:0 auto}
.contact h2{font-size:2.5rem;font-weight:800;color:#fff;margin-bottom:1rem;text-align:center}
.contact>p{opacity:.5;text-align:center;margin-bottom:3rem}
.contact form{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem}
.contact input,.contact textarea{background:${t.darkAlt};border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:1rem 1.2rem;color:#fff;font-size:.95rem;outline:none;font-family:inherit;transition:border-color .2s}
.contact input:focus,.contact textarea:focus{border-color:${t.primary}}
.contact textarea{grid-column:1/-1;min-height:140px;resize:vertical}
.contact button{grid-column:1/-1;background:${t.primary};color:#fff;padding:1rem;border-radius:12px;font-weight:700;font-size:1rem;border:none;cursor:pointer;transition:all .2s}
.contact button:hover{box-shadow:0 8px 25px ${t.primary}50}
footer{padding:3rem 5%;border-top:1px solid rgba(255,255,255,.05);text-align:center;font-size:.85rem;opacity:.4}
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

  // ── RESTAURANT ─────────────────────────────────────────────
  {
    id: "restaurant-elegant",
    name: "Restaurant — Elegant Dark",
    category: "Restaurant",
    description: "Elegant dark restaurant with menu section, reservation form, gallery grid, and reviews.",
    thumb: "🍽️",
    getCode: (t) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Fine Dining</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;background:#0a0a0a;color:#c4c4c4}
a{text-decoration:none;color:inherit}
nav{display:flex;align-items:center;justify-content:space-between;padding:1.5rem 5%;max-width:1400px;margin:0 auto}
nav .logo{font-family:'Playfair Display',serif;font-size:1.6rem;font-weight:700;color:#fff;letter-spacing:2px}
nav ul{list-style:none;display:flex;gap:2rem}
nav ul a{font-size:.85rem;font-weight:500;opacity:.7;text-transform:uppercase;letter-spacing:1px;transition:all .2s}
nav ul a:hover{opacity:1;color:${t.primary}}
.hero{min-height:100vh;display:flex;align-items:center;position:relative;padding:0 5%;background:linear-gradient(135deg,#0a0a0a 40%,${t.dark})}
.hero::before{content:'';position:absolute;top:0;right:0;width:50%;height:100%;background:linear-gradient(to left,${t.primary}08,transparent)}
.hero-inner{max-width:1400px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;width:100%}
.hero-text h1{font-family:'Playfair Display',serif;font-size:4.5rem;font-weight:800;color:#fff;line-height:1.1;margin-bottom:1.5rem}
.hero-text h1 span{color:${t.primary};font-style:italic}
.hero-text p{font-size:1.1rem;opacity:.5;line-height:1.8;margin-bottom:2.5rem;max-width:450px}
.hero-text .btns{display:flex;gap:1rem}
.btn-gold{background:${t.primary};color:#000;padding:1rem 2.5rem;font-weight:700;border:none;border-radius:0;cursor:pointer;font-size:.9rem;text-transform:uppercase;letter-spacing:2px;transition:all .2s}
.btn-gold:hover{box-shadow:0 8px 25px ${t.primary}50}
.btn-trans{background:0;color:#fff;padding:1rem 2.5rem;font-weight:600;border:1px solid rgba(255,255,255,.2);font-size:.9rem;text-transform:uppercase;letter-spacing:2px;cursor:pointer;transition:all .2s}
.btn-trans:hover{border-color:${t.primary}}
.hero-img{aspect-ratio:3/4;position:relative;overflow:hidden}
.hero-img img{width:100%;height:100%;object-fit:cover}
.hero-img::before{content:'';position:absolute;inset:-2px;background:linear-gradient(45deg,${t.primary},transparent,${t.primary});opacity:.3;z-index:1}
.hero-img::after{content:'';position:absolute;inset:0;border:2px solid ${t.primary}30;z-index:2}
/* MENU */
.menu{padding:6rem 5%;max-width:1000px;margin:0 auto}
.section-head{text-align:center;margin-bottom:4rem}
.section-head span{color:${t.primary};font-size:.8rem;text-transform:uppercase;letter-spacing:3px;font-weight:600}
.section-head h2{font-family:'Playfair Display',serif;font-size:2.8rem;color:#fff;font-weight:700;margin-top:.5rem}
.menu-item{display:flex;justify-content:space-between;align-items:flex-start;padding:1.5rem 0;border-bottom:1px solid rgba(255,255,255,.06)}
.menu-item h3{color:#fff;font-family:'Playfair Display',serif;font-size:1.2rem;font-weight:600;margin-bottom:.25rem}
.menu-item p{font-size:.85rem;opacity:.5}
.menu-item .price{color:${t.primary};font-size:1.1rem;font-weight:700;white-space:nowrap}
/* RESERVATION */
.reservation{padding:6rem 5%;background:#111}
.res-inner{max-width:800px;margin:0 auto;text-align:center}
.res-inner h2{font-family:'Playfair Display',serif;font-size:2.5rem;color:#fff;margin-bottom:1rem}
.res-inner>p{opacity:.5;margin-bottom:3rem}
.res-form{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem}
.res-form input,.res-form select{background:#1a1a1a;border:1px solid rgba(255,255,255,.08);padding:1rem 1.2rem;color:#fff;font-size:.95rem;outline:none;font-family:inherit}
.res-form input:focus,.res-form select:focus{border-color:${t.primary}}
.res-form button{grid-column:1/-1;background:${t.primary};color:#000;padding:1rem;font-weight:700;font-size:.95rem;text-transform:uppercase;letter-spacing:2px;border:none;cursor:pointer}
footer{padding:3rem 5%;text-align:center;font-size:.85rem;opacity:.3;border-top:1px solid rgba(255,255,255,.05)}
@media(max-width:1024px){.hero-inner{grid-template-columns:1fr}.hero-text h1{font-size:3rem}.hero-img{display:none}}
@media(max-width:640px){nav ul{display:none}.hero-text h1{font-size:2.5rem}.res-form{grid-template-columns:1fr}}
</style>
</head>
<body>
<nav><a href="#" class="logo">SAVEUR</a><ul><li><a href="#">Menu</a></li><li><a href="#">Reservations</a></li><li><a href="#">About</a></li><li><a href="#">Contact</a></li></ul><a href="#" class="btn-gold" style="padding:.6rem 1.5rem;font-size:.75rem">Reserve</a></nav>
<section class="hero"><div class="hero-inner"><div class="hero-text"><h1>A Culinary <span>Experience</span> Like No Other</h1><p>Indulge in exquisite dishes crafted by our Michelin-starred chefs, using the finest locally sourced seasonal ingredients.</p><div class="btns"><button class="btn-gold">Reserve a Table</button><button class="btn-trans">View Menu</button></div></div><div class="hero-img"><img src="${IMG.chef}" alt="Our Chef"></div></div></section>
<section class="menu"><div class="section-head"><span>Our Menu</span><h2>Signature Dishes</h2></div>
<div class="menu-item"><div><h3>Pan-Seared Sea Bass</h3><p>With saffron beurre blanc, roasted fennel, citrus</p></div><div class="price">$48</div></div>
<div class="menu-item"><div><h3>Wagyu Beef Tenderloin</h3><p>Truffle mash, asparagus, red wine jus</p></div><div class="price">$72</div></div>
<div class="menu-item"><div><h3>Wild Mushroom Risotto</h3><p>Porcini, chanterelle, aged parmesan, truffle oil</p></div><div class="price">$36</div></div>
<div class="menu-item"><div><h3>Lobster Thermidor</h3><p>Classic preparation with brandy cream, gruyère</p></div><div class="price">$65</div></div>
</section>
<section class="reservation"><div class="res-inner"><h2>Make a Reservation</h2><p>Book your table for an unforgettable dining experience.</p><form class="res-form"><input type="text" placeholder="Full Name"><input type="email" placeholder="Email"><input type="date"><select><option>2 Guests</option><option>4 Guests</option><option>6 Guests</option><option>8+ Guests</option></select><button type="submit">Reserve Now</button></form></div></section>
<footer><p>© 2026 SAVEUR. All rights reserved.</p></footer>
</body>
</html>`,
  },

  // ── E-COMMERCE ─────────────────────────────────────────────
  {
    id: "ecom-modern",
    name: "E-Commerce — Modern Store",
    category: "E-Commerce",
    description: "Dark e-commerce with product cards, category grid, newsletter signup, and trust badges.",
    thumb: "🛍️",
    getCode: (t) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Modern Store</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;background:${t.dark};color:${t.text}}
a{text-decoration:none;color:inherit}
nav{display:flex;align-items:center;justify-content:space-between;padding:1.5rem 5%;max-width:1400px;margin:0 auto}
nav .logo{font-size:1.5rem;font-weight:800;color:#fff}
nav .logo span{color:${t.primary}}
nav ul{list-style:none;display:flex;gap:2rem}
nav ul a{font-size:.9rem;opacity:.7;font-weight:500;transition:all .2s}
nav ul a:hover{opacity:1;color:${t.primary}}
.nav-icons{display:flex;gap:1rem;align-items:center}
.nav-icons a{font-size:1.2rem;opacity:.7;transition:opacity .2s}
.nav-icons a:hover{opacity:1}
/* HERO */
.hero{padding:6rem 5%;max-width:1400px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;min-height:80vh}
.hero h1{font-size:3.5rem;font-weight:800;color:#fff;line-height:1.1;margin-bottom:1.5rem}
.hero h1 span{background:linear-gradient(135deg,${t.primary},${t.accent});-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero p{font-size:1.1rem;opacity:.5;line-height:1.7;margin-bottom:2rem;max-width:480px}
.hero-badges{display:flex;gap:2rem;margin-bottom:2.5rem}
.hero-badges .badge{text-align:center}
.hero-badges .badge strong{display:block;font-size:1.5rem;color:#fff}
.hero-badges .badge span{font-size:.75rem;opacity:.5}
.btn-shop{background:${t.primary};color:#fff;padding:1rem 2.5rem;border-radius:12px;font-weight:700;border:none;cursor:pointer;font-size:1rem;transition:all .2s}
.btn-shop:hover{box-shadow:0 10px 30px ${t.primary}50;transform:translateY(-2px)}
.hero-visual{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
.hero-card{background:${t.darkAlt};border:1px solid rgba(255,255,255,.06);border-radius:16px;aspect-ratio:3/4;display:flex;align-items:center;justify-content:center;font-size:3rem;transition:all .3s}
.hero-card:hover{border-color:${t.primary}40;transform:translateY(-5px)}
.hero-card:first-child{grid-row:span 2;aspect-ratio:auto}
.hero-card img{width:100%;height:100%;object-fit:cover;border-radius:16px}
/* PRODUCTS */
.products{padding:6rem 5%;max-width:1400px;margin:0 auto}
.products h2{font-size:2rem;font-weight:800;color:#fff;margin-bottom:2.5rem}
.product-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem}
.product{background:${t.darkAlt};border:1px solid rgba(255,255,255,.06);border-radius:16px;overflow:hidden;transition:all .3s}
.product:hover{border-color:${t.primary}40;transform:translateY(-5px)}
.product .img{aspect-ratio:1;background:linear-gradient(135deg,${t.dark},${t.primary}08);display:flex;align-items:center;justify-content:center;font-size:3rem;position:relative;overflow:hidden}
.product .img img{width:100%;height:100%;object-fit:cover}
.product .tag{position:absolute;top:.75rem;left:.75rem;background:${t.primary};color:#fff;padding:.25rem .75rem;border-radius:50px;font-size:.7rem;font-weight:700}
.product .info{padding:1.25rem}
.product .info h3{color:#fff;font-size:.95rem;font-weight:600;margin-bottom:.25rem}
.product .info .cat{font-size:.8rem;opacity:.5;margin-bottom:.75rem}
.product .info .price-row{display:flex;justify-content:space-between;align-items:center}
.product .info .price{color:${t.primary};font-size:1.1rem;font-weight:700}
.product .info .add{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);color:#fff;width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:1.2rem;transition:all .2s}
.product .info .add:hover{background:${t.primary};border-color:${t.primary}}
/* TRUST */
.trust{padding:4rem 5%;max-width:1400px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:2rem}
.trust-item{text-align:center;padding:2rem;background:${t.darkAlt};border-radius:16px;border:1px solid rgba(255,255,255,.04)}
.trust-item .icon{font-size:2rem;margin-bottom:.75rem}
.trust-item h4{color:#fff;font-size:.95rem;font-weight:600;margin-bottom:.25rem}
.trust-item p{font-size:.8rem;opacity:.5}
footer{padding:3rem 5%;border-top:1px solid rgba(255,255,255,.05);text-align:center;font-size:.85rem;opacity:.4}
@media(max-width:1024px){.hero{grid-template-columns:1fr}.hero-visual{display:none}.product-grid,.trust{grid-template-columns:repeat(2,1fr)}}
@media(max-width:640px){nav ul{display:none}.hero h1{font-size:2.5rem}.product-grid,.trust{grid-template-columns:1fr}}
</style>
</head>
<body>
<nav><a href="#" class="logo">LUXE<span>.</span></a><ul><li><a href="#">New In</a></li><li><a href="#">Men</a></li><li><a href="#">Women</a></li><li><a href="#">Sale</a></li></ul><div class="nav-icons"><a href="#">🔍</a><a href="#">❤️</a><a href="#">🛒</a></div></nav>
<section class="hero">
  <div><h1>Elevate Your <span>Style</span> This Season</h1><p>Discover our curated collection of premium fashion pieces designed for the modern individual.</p>
  <div class="hero-badges"><div class="badge"><strong>2K+</strong><span>Products</span></div><div class="badge"><strong>50+</strong><span>Brands</span></div><div class="badge"><strong>4.9</strong><span>Rating</span></div></div>
  <button class="btn-shop">Shop Collection →</button></div>
  <div class="hero-visual"><div class="hero-card"><img src="${IMG.fashion}" alt="Fashion"></div><div class="hero-card"><img src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=500&fit=crop" alt="Style"></div><div class="hero-card"><img src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop" alt="Shoes"></div></div>
</section>
<section class="products">
  <h2>Trending Now</h2>
  <div class="product-grid">
    <div class="product"><div class="img"><img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop" alt="Tee"><div class="tag">New</div></div><div class="info"><h3>Premium Cotton Tee</h3><div class="cat">Men's Tops</div><div class="price-row"><span class="price">$49</span><div class="add">+</div></div></div></div>
    <div class="product"><div class="img"><img src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop" alt="Dress"><div class="tag">-30%</div></div><div class="info"><h3>Silk Midi Dress</h3><div class="cat">Women's Dresses</div><div class="price-row"><span class="price">$129</span><div class="add">+</div></div></div></div>
    <div class="product"><div class="img"><img src="https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop" alt="Jacket"></div><div class="info"><h3>Leather Jacket</h3><div class="cat">Outerwear</div><div class="price-row"><span class="price">$299</span><div class="add">+</div></div></div></div>
    <div class="product"><div class="img"><img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop" alt="Sneakers"><div class="tag">Hot</div></div><div class="info"><h3>Running Sneakers</h3><div class="cat">Footwear</div><div class="price-row"><span class="price">$179</span><div class="add">+</div></div></div></div>
  </div>
</section>
<div class="trust">
  <div class="trust-item"><div class="icon">🚚</div><h4>Free Shipping</h4><p>On orders over $50</p></div>
  <div class="trust-item"><div class="icon">↩️</div><h4>Easy Returns</h4><p>30-day free returns</p></div>
  <div class="trust-item"><div class="icon">🔒</div><h4>Secure Payment</h4><p>256-bit SSL encrypted</p></div>
  <div class="trust-item"><div class="icon">💬</div><h4>24/7 Support</h4><p>Always here to help</p></div>
</div>
<footer><p>© 2026 LUXE. All rights reserved.</p></footer>
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
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;background:${t.dark};color:${t.text}}
a{text-decoration:none;color:inherit}
nav{display:flex;align-items:center;justify-content:space-between;padding:1.5rem 5%;max-width:1200px;margin:0 auto}
nav .logo{font-family:'JetBrains Mono',monospace;font-size:1.2rem;font-weight:700;color:${t.primary}}
nav ul{list-style:none;display:flex;gap:2rem}
nav ul a{font-size:.9rem;opacity:.6;font-weight:500;transition:all .2s}
nav ul a:hover{color:${t.primary};opacity:1}
.hero{padding:8rem 5% 6rem;max-width:1200px;margin:0 auto}
.hero .greeting{color:${t.primary};font-family:'JetBrains Mono',monospace;font-size:1rem;margin-bottom:1rem}
.hero h1{font-size:4rem;font-weight:800;color:#fff;line-height:1.15;margin-bottom:1.5rem}
.hero h1 .typed{color:${t.primary};border-right:3px solid ${t.primary}}
.hero p{font-size:1.15rem;opacity:.5;max-width:600px;line-height:1.8;margin-bottom:2.5rem}
.hero-links{display:flex;gap:1rem}
.hero-links a{display:flex;align-items:center;gap:.5rem;padding:.75rem 1.5rem;border:1px solid rgba(255,255,255,.1);border-radius:10px;font-size:.9rem;font-weight:500;transition:all .2s}
.hero-links a:hover{border-color:${t.primary};color:${t.primary}}
/* TERMINAL */
.terminal{max-width:700px;margin:3rem 0;background:#0d1117;border:1px solid rgba(255,255,255,.08);border-radius:12px;overflow:hidden;font-family:'JetBrains Mono',monospace}
.terminal .bar{display:flex;gap:.5rem;padding:.75rem 1rem;background:rgba(255,255,255,.03);border-bottom:1px solid rgba(255,255,255,.05)}
.terminal .bar span{width:12px;height:12px;border-radius:50%}
.terminal .bar span:nth-child(1){background:#ff5f57}
.terminal .bar span:nth-child(2){background:#ffbd2e}
.terminal .bar span:nth-child(3){background:#28c840}
.terminal pre{padding:1.5rem;font-size:.85rem;line-height:1.8;color:#8b949e}
.terminal .cmd{color:${t.primary}}
.terminal .str{color:${t.accent}}
.terminal .comment{color:#6e7681}
/* PROJECTS */
.projects{padding:6rem 5%;max-width:1200px;margin:0 auto}
.projects h2{font-size:2rem;font-weight:800;color:#fff;margin-bottom:2.5rem}
.project-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:2rem}
.proj{background:${t.darkAlt};border:1px solid rgba(255,255,255,.06);border-radius:16px;padding:2rem;transition:all .3s}
.proj:hover{border-color:${t.primary}40;transform:translateY(-5px)}
.proj .top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1rem}
.proj .top .folder{font-size:1.5rem}
.proj .top .links{display:flex;gap:.5rem;opacity:.5}
.proj h3{color:#fff;font-size:1.1rem;font-weight:700;margin-bottom:.5rem}
.proj p{font-size:.85rem;opacity:.5;line-height:1.7;margin-bottom:1rem}
.proj .tags{display:flex;gap:.5rem;flex-wrap:wrap}
.proj .tags span{font-family:'JetBrains Mono',monospace;font-size:.7rem;color:${t.primary};background:${t.primary}15;padding:.25rem .75rem;border-radius:50px}
/* SKILLS */
.skills{padding:6rem 5%;max-width:1200px;margin:0 auto}
.skills h2{font-size:2rem;font-weight:800;color:#fff;margin-bottom:2.5rem}
.skills-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem}
.skill{background:${t.darkAlt};border:1px solid rgba(255,255,255,.04);border-radius:12px;padding:1.25rem;text-align:center;transition:all .2s}
.skill:hover{border-color:${t.primary}40}
.skill .emoji{font-size:1.5rem;margin-bottom:.5rem}
.skill span{font-size:.8rem;color:#fff;font-weight:500}
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

  // ── HEALTHCARE ─────────────────────────────────────────────
  {
    id: "health-clinic",
    name: "Healthcare — Modern Clinic",
    category: "Healthcare",
    description: "Clean medical clinic landing with services, doctors team, appointment booking form.",
    thumb: "🏥",
    getCode: (t) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>MedCare Clinic</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;background:${t.dark};color:${t.text}}
a{text-decoration:none;color:inherit}
nav{display:flex;align-items:center;justify-content:space-between;padding:1.5rem 5%;max-width:1400px;margin:0 auto}
nav .logo{font-size:1.4rem;font-weight:800;color:#fff}
nav .logo span{color:${t.primary}}
nav ul{list-style:none;display:flex;gap:2rem}
nav ul a{font-size:.9rem;opacity:.7;font-weight:500;transition:all .2s}
nav ul a:hover{color:${t.primary};opacity:1}
.btn-nav{background:${t.primary};color:#fff;padding:.65rem 1.5rem;border-radius:10px;font-weight:600;font-size:.85rem}
.hero{padding:8rem 5% 6rem;max-width:1400px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;min-height:80vh}
.hero h1{font-size:3.5rem;font-weight:800;color:#fff;line-height:1.1;margin-bottom:1.5rem}
.hero h1 span{color:${t.primary}}
.hero p{font-size:1.1rem;opacity:.5;line-height:1.8;margin-bottom:2rem;max-width:500px}
.hero-cta{display:flex;gap:1rem}
.btn-main{background:${t.primary};color:#fff;padding:1rem 2.5rem;border-radius:12px;font-weight:700;border:none;cursor:pointer;font-size:1rem;transition:all .2s}
.btn-main:hover{box-shadow:0 10px 30px ${t.primary}50}
.btn-sec{background:0;color:#fff;padding:1rem 2.5rem;border-radius:12px;font-weight:600;border:2px solid rgba(255,255,255,.15);cursor:pointer;font-size:1rem;transition:all .2s}
.btn-sec:hover{border-color:${t.primary}}
.hero-right{position:relative}
.hero-card-grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
.h-card{background:${t.darkAlt};border:1px solid rgba(255,255,255,.06);border-radius:16px;padding:1.5rem;text-align:center;transition:all .2s}
.h-card:hover{border-color:${t.primary}40}
.h-card .emoji{font-size:2rem;margin-bottom:.75rem}
.h-card h4{color:#fff;font-size:.9rem;font-weight:600;margin-bottom:.25rem}
.h-card p{font-size:.75rem;opacity:.5}
.hero-photo{position:relative;display:flex;justify-content:center}
.hero-photo img{width:320px;height:400px;object-fit:cover;border-radius:20px;box-shadow:0 30px 60px rgba(0,0,0,.3)}
.hero-photo::before{content:'';position:absolute;inset:-12px;border:2px solid ${t.primary}25;border-radius:28px}
.hero-photo::after{content:'';position:absolute;bottom:-25px;right:-25px;width:200px;height:200px;background:${t.primary}12;border-radius:50%;filter:blur(50px)}
.services{padding:6rem 5%;max-width:1400px;margin:0 auto}
.services h2{font-size:2.5rem;font-weight:800;color:#fff;margin-bottom:.5rem}
.services>p{opacity:.5;margin-bottom:3rem}
.srv-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem}
.srv-card{background:${t.darkAlt};border:1px solid rgba(255,255,255,.06);border-radius:20px;padding:2rem;transition:all .3s}
.srv-card:hover{border-color:${t.primary}40;transform:translateY(-5px)}
.srv-card .icon{font-size:2rem;margin-bottom:1rem}
.srv-card h3{color:#fff;font-size:1.1rem;font-weight:700;margin-bottom:.5rem}
.srv-card p{font-size:.85rem;opacity:.6;line-height:1.7}
.booking{padding:6rem 5%;max-width:800px;margin:0 auto;text-align:center}
.booking h2{font-size:2.5rem;font-weight:800;color:#fff;margin-bottom:1rem}
.booking>p{opacity:.5;margin-bottom:3rem}
.booking form{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem}
.booking input,.booking select,.booking textarea{background:${t.darkAlt};border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:1rem 1.2rem;color:#fff;font-size:.95rem;outline:none;font-family:inherit}
.booking input:focus,.booking select:focus{border-color:${t.primary}}
.booking textarea{grid-column:1/-1;min-height:100px;resize:vertical}
.booking button{grid-column:1/-1;background:${t.primary};color:#fff;padding:1rem;border-radius:12px;font-weight:700;font-size:1rem;border:none;cursor:pointer}
footer{padding:3rem 5%;border-top:1px solid rgba(255,255,255,.05);text-align:center;font-size:.85rem;opacity:.4}
@media(max-width:1024px){.hero,.srv-grid{grid-template-columns:1fr}.hero h1{font-size:2.8rem}}
@media(max-width:640px){nav ul{display:none}.hero h1{font-size:2.2rem}.booking form,.hero-card-grid{grid-template-columns:1fr}}
</style>
</head>
<body>
<nav><a href="#" class="logo">Med<span>Care</span></a><ul><li><a href="#">Services</a></li><li><a href="#">Doctors</a></li><li><a href="#">About</a></li><li><a href="#">Contact</a></li></ul><a href="#" class="btn-nav">Book Now</a></nav>
<section class="hero"><div><h1>Your Health, <span>Our Priority</span></h1><p>Compassionate, comprehensive healthcare for the whole family. Board-certified physicians and modern facilities.</p><div class="hero-cta"><button class="btn-main">Book Appointment</button><button class="btn-sec">Our Services</button></div></div><div class="hero-right"><div class="hero-photo"><img src="${IMG.doctor}" alt="Doctor"></div><div class="hero-card-grid" style="margin-top:2rem"><div class="h-card"><div class="emoji">🩺</div><h4>20+ Doctors</h4><p>Board-certified</p></div><div class="h-card"><div class="emoji">⏰</div><h4>Same Day</h4><p>Appointments</p></div><div class="h-card"><div class="emoji">🏥</div><h4>Modern Lab</h4><p>In-house testing</p></div><div class="h-card"><div class="emoji">💊</div><h4>Pharmacy</h4><p>On-site dispensary</p></div></div></div></section>
<section class="services"><h2>Our Services</h2><p>Comprehensive care across 20+ medical specialties.</p><div class="srv-grid">
  <div class="srv-card"><div class="icon">❤️</div><h3>Cardiology</h3><p>Complete heart health including ECG, echocardiography, and stress testing.</p></div>
  <div class="srv-card"><div class="icon">🧠</div><h3>Neurology</h3><p>Expert diagnosis and treatment for neurological conditions.</p></div>
  <div class="srv-card"><div class="icon">🦴</div><h3>Orthopedics</h3><p>Bone, joint, and musculoskeletal care with advanced treatments.</p></div>
</div></section>
<section class="booking"><h2>Book an Appointment</h2><p>Schedule your visit — we'll confirm within 2 hours.</p><form><input type="text" placeholder="Full Name"><input type="tel" placeholder="Phone Number"><input type="email" placeholder="Email"><select><option>Select Department</option><option>Cardiology</option><option>Neurology</option><option>Orthopedics</option><option>General</option></select><input type="date" style="grid-column:1/-1"><button type="submit">Book Appointment →</button></form></section>
<footer><p>© 2026 MedCare Clinic. All rights reserved.</p></footer>
</body>
</html>`,
  },

  // ── STARTUP ────────────────────────────────────────────────
  {
    id: "startup-waitlist",
    name: "Startup — Product Launch",
    category: "Startup",
    description: "Product launch page with animated gradient, waitlist form, feature preview, and social proof.",
    thumb: "🚀",
    getCode: (t) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>LaunchPad</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;background:${t.dark};color:${t.text};overflow-x:hidden}
a{text-decoration:none;color:inherit}
@keyframes gradient{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
nav{display:flex;align-items:center;justify-content:space-between;padding:1.5rem 5%;max-width:1200px;margin:0 auto}
nav .logo{font-size:1.4rem;font-weight:800;color:#fff}
nav .logo span{color:${t.primary}}
nav ul{list-style:none;display:flex;gap:2rem}
nav ul a{font-size:.9rem;opacity:.7;font-weight:500}
.hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:2rem 5%;position:relative}
.hero::before{content:'';position:absolute;top:20%;left:50%;transform:translateX(-50%);width:800px;height:800px;background:linear-gradient(135deg,${t.primary}30,${t.secondary}20,${t.accent}15);border-radius:50%;filter:blur(100px);z-index:0;animation:gradient 10s ease infinite;background-size:200% 200%}
.hero-content{position:relative;z-index:1}
.badge{display:inline-flex;align-items:center;gap:.5rem;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:50px;padding:.5rem 1.25rem;font-size:.8rem;font-weight:500;margin-bottom:2rem}
.badge .dot{width:8px;height:8px;border-radius:50%;background:${t.primary};animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
.hero h1{font-size:4.5rem;font-weight:900;color:#fff;line-height:1.05;margin-bottom:1.5rem;max-width:800px}
.hero h1 span{background:linear-gradient(135deg,${t.primary},${t.accent});-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero p{font-size:1.2rem;opacity:.5;max-width:550px;margin:0 auto 3rem;line-height:1.7}
.waitlist{display:flex;gap:.75rem;justify-content:center;margin-bottom:2rem}
.waitlist input{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:1rem 1.5rem;color:#fff;font-size:1rem;width:320px;outline:none}
.waitlist input:focus{border-color:${t.primary}}
.waitlist button{background:linear-gradient(135deg,${t.primary},${t.secondary});color:#fff;padding:1rem 2rem;border-radius:12px;font-weight:700;border:none;cursor:pointer;font-size:1rem;transition:all .2s;white-space:nowrap}
.waitlist button:hover{box-shadow:0 10px 35px ${t.primary}50;transform:translateY(-2px)}
.social-proof{display:flex;align-items:center;gap:1rem;justify-content:center}
.avatars{display:flex}
.avatars span{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,${t.primary},${t.accent});border:2px solid ${t.dark};margin-left:-8px;display:flex;align-items:center;justify-content:center;font-size:.75rem}
.social-proof p{font-size:.85rem;opacity:.6}
.social-proof strong{color:#fff}
/* FEATURES */
.features{padding:6rem 5%;max-width:1200px;margin:0 auto}
.features h2{font-size:2.5rem;font-weight:800;color:#fff;text-align:center;margin-bottom:3rem}
.feat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem}
.feat{background:${t.darkAlt};border:1px solid rgba(255,255,255,.06);border-radius:20px;padding:2.5rem;text-align:center;transition:all .3s}
.feat:hover{border-color:${t.primary}40;transform:translateY(-8px)}
.feat .emoji{font-size:2.5rem;margin-bottom:1rem}
.feat h3{color:#fff;font-size:1.15rem;font-weight:700;margin-bottom:.5rem}
.feat p{font-size:.9rem;opacity:.5;line-height:1.7}
/* CTA */
.bottom-cta{padding:6rem 5%;text-align:center}
.cta-card{max-width:800px;margin:0 auto;background:linear-gradient(135deg,${t.primary}15,${t.secondary}10);border:1px solid ${t.primary}30;border-radius:24px;padding:4rem 2rem}
.cta-card h2{color:#fff;font-size:2.5rem;font-weight:800;margin-bottom:1rem}
.cta-card p{opacity:.5;margin-bottom:2rem;font-size:1.05rem}
.cta-card button{background:${t.primary};color:#fff;padding:1rem 2.5rem;border-radius:12px;font-weight:700;border:none;cursor:pointer;font-size:1rem}
footer{padding:3rem 5%;border-top:1px solid rgba(255,255,255,.05);text-align:center;font-size:.85rem;opacity:.4}
@media(max-width:768px){.hero h1{font-size:2.8rem}.feat-grid{grid-template-columns:1fr}.waitlist{flex-direction:column;align-items:center}.waitlist input{width:100%}nav ul{display:none}}
</style>
</head>
<body>
<nav><a href="#" class="logo">Launch<span>Pad</span></a><ul><li><a href="#">Features</a></li><li><a href="#">Pricing</a></li><li><a href="#">Blog</a></li></ul></nav>
<section class="hero"><div class="hero-content">
  <div class="badge"><span class="dot"></span> Coming Soon — Join the Waitlist</div>
  <h1>The Future of <span>Productivity</span> is Here</h1>
  <p>We're building the next generation of work tools. Be among the first to experience it.</p>
  <div class="waitlist"><input type="email" placeholder="Enter your email address"><button>Join Waitlist →</button></div>
  <div class="social-proof"><div class="avatars"><span>👤</span><span>👤</span><span>👤</span><span>👤</span><span>+</span></div><p><strong>12,000+</strong> people on the waitlist</p></div>
</div></section>
<section class="features"><h2>Why you'll love it</h2><div class="feat-grid">
  <div class="feat"><div class="emoji">⚡</div><h3>10x Faster</h3><p>Complete tasks in minutes that used to take hours with AI-powered automation.</p></div>
  <div class="feat"><div class="emoji">🧠</div><h3>Smart AI</h3><p>Context-aware AI that learns your workflow and suggests improvements.</p></div>
  <div class="feat"><div class="emoji">🔗</div><h3>All-in-One</h3><p>Replace 5+ tools with one unified platform for your entire team.</p></div>
</div></section>
<section class="bottom-cta"><div class="cta-card"><h2>Ready to transform your workflow?</h2><p>Get early access and founding member pricing — locked in forever.</p><button>Join the Waitlist</button></div></section>
<footer><p>© 2026 LaunchPad. All rights reserved.</p></footer>
</body>
</html>`,
  },

  // ── FINANCE ────────────────────────────────────────────────
  {
    id: "fintech-app",
    name: "Finance — FinTech App",
    category: "Finance",
    description: "FinTech landing with app mockup, feature cards, stats counter, and download CTAs.",
    thumb: "💰",
    getCode: (t) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>PayFlow</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;background:${t.dark};color:${t.text}}
a{text-decoration:none;color:inherit}
nav{display:flex;align-items:center;justify-content:space-between;padding:1.5rem 5%;max-width:1400px;margin:0 auto}
nav .logo{font-size:1.5rem;font-weight:800;color:#fff}
nav .logo span{color:${t.primary}}
nav ul{list-style:none;display:flex;gap:2rem}
nav ul a{font-size:.9rem;opacity:.7;font-weight:500;transition:all .2s}
nav ul a:hover{opacity:1;color:${t.primary}}
.hero{padding:6rem 5%;max-width:1400px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;min-height:85vh}
.hero h1{font-size:3.8rem;font-weight:800;color:#fff;line-height:1.1;margin-bottom:1.5rem}
.hero h1 span{color:${t.primary}}
.hero p{font-size:1.1rem;opacity:.5;line-height:1.8;margin-bottom:2rem;max-width:480px}
.download-btns{display:flex;gap:1rem}
.dl-btn{background:${t.darkAlt};border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:.9rem 1.8rem;display:flex;align-items:center;gap:.75rem;transition:all .2s;cursor:pointer}
.dl-btn:hover{border-color:${t.primary}}
.dl-btn .icon{font-size:1.5rem}
.dl-btn .text small{display:block;font-size:.65rem;opacity:.5}
.dl-btn .text strong{font-size:.95rem;color:#fff}
.phone{width:280px;height:560px;background:${t.darkAlt};border:3px solid rgba(255,255,255,.1);border-radius:40px;margin:0 auto;position:relative;overflow:hidden}
.phone::before{content:'';position:absolute;top:0;left:50%;transform:translateX(-50%);width:120px;height:28px;background:${t.dark};border-radius:0 0 16px 16px}
.phone-screen{margin:40px 15px 15px;height:calc(100% - 55px);background:linear-gradient(180deg,${t.primary}20,${t.dark});border-radius:24px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:1.5rem}
.phone-screen .balance{font-size:.75rem;opacity:.5;margin-bottom:.25rem}
.phone-screen .amount{font-size:2.2rem;font-weight:800;color:#fff;margin-bottom:1.5rem}
.phone-screen .mini-cards{display:grid;grid-template-columns:1fr 1fr;gap:.5rem;width:100%}
.mini-card{background:rgba(255,255,255,.06);border-radius:12px;padding:.75rem;text-align:center}
.mini-card span{font-size:1rem}
.mini-card p{font-size:.6rem;color:#fff;margin-top:.25rem;font-weight:500}
.stats{padding:4rem 5%;max-width:1400px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:2rem}
.stat{text-align:center;padding:2rem;background:${t.darkAlt};border-radius:16px;border:1px solid rgba(255,255,255,.04)}
.stat .num{font-size:2.2rem;font-weight:800;color:#fff;background:linear-gradient(135deg,${t.primary},${t.accent});-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.stat p{font-size:.85rem;opacity:.5;margin-top:.25rem}
.features{padding:6rem 5%;max-width:1400px;margin:0 auto}
.features h2{font-size:2.5rem;font-weight:800;color:#fff;text-align:center;margin-bottom:3rem}
.feat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem}
.feat-card{background:${t.darkAlt};border:1px solid rgba(255,255,255,.06);border-radius:20px;padding:2.5rem;transition:all .3s}
.feat-card:hover{border-color:${t.primary}40;transform:translateY(-5px)}
.feat-card .icon{font-size:2rem;margin-bottom:1rem}
.feat-card h3{color:#fff;font-size:1.1rem;font-weight:700;margin-bottom:.5rem}
.feat-card p{font-size:.85rem;opacity:.6;line-height:1.7}
footer{padding:3rem 5%;border-top:1px solid rgba(255,255,255,.05);text-align:center;font-size:.85rem;opacity:.4}
@media(max-width:1024px){.hero{grid-template-columns:1fr;text-align:center}.hero p{margin-left:auto;margin-right:auto}.download-btns{justify-content:center}.stats,.feat-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:640px){.hero h1{font-size:2.5rem}nav ul{display:none}.stats,.feat-grid{grid-template-columns:1fr}.download-btns{flex-direction:column;align-items:center}}
</style>
</head>
<body>
<nav><a href="#" class="logo">Pay<span>Flow</span></a><ul><li><a href="#">Features</a></li><li><a href="#">Security</a></li><li><a href="#">Pricing</a></li><li><a href="#">About</a></li></ul><a href="#" style="background:${t.primary};color:#fff;padding:.6rem 1.5rem;border-radius:10px;font-weight:600;font-size:.85rem">Download App</a></nav>
<section class="hero">
  <div><h1>Smart <span>Banking</span> for Everyone</h1><p>No fees, instant transfers, smart budgeting, and up to 4% APY. Banking that finally works for you.</p>
  <div class="download-btns"><div class="dl-btn"><span class="icon">🍎</span><div class="text"><small>Download on the</small><strong>App Store</strong></div></div><div class="dl-btn"><span class="icon">▶️</span><div class="text"><small>Get it on</small><strong>Google Play</strong></div></div></div></div>
  <div><div class="phone"><div class="phone-screen"><div class="balance">Total Balance</div><div class="amount">$24,563.00</div><div class="mini-cards"><div class="mini-card"><span>📤</span><p>Send</p></div><div class="mini-card"><span>📥</span><p>Receive</p></div><div class="mini-card"><span>💳</span><p>Cards</p></div><div class="mini-card"><span>📊</span><p>Invest</p></div></div></div></div></div>
</section>
<div class="stats"><div class="stat"><div class="num">5M+</div><p>Active Users</p></div><div class="stat"><div class="num">$0</div><p>Monthly Fees</p></div><div class="stat"><div class="num">4.0%</div><p>APY Savings</p></div><div class="stat"><div class="num">150+</div><p>Countries</p></div></div>
<section class="features"><h2>Built for the modern world</h2><div class="feat-grid">
  <div class="feat-card"><div class="icon">💸</div><h3>Instant Transfers</h3><p>Send money anywhere in the world instantly. Zero fees for domestic transfers.</p></div>
  <div class="feat-card"><div class="icon">📊</div><h3>Smart Budgeting</h3><p>AI-powered spending insights and automatic categorization of transactions.</p></div>
  <div class="feat-card"><div class="icon">🔒</div><h3>Bank-Level Security</h3><p>256-bit encryption, biometric auth, and FDIC insured up to $250K.</p></div>
</div></section>
<footer><p>© 2026 PayFlow Inc. FDIC Insured. All rights reserved.</p></footer>
</body>
</html>`,
  },

  // ── EDUCATION ──────────────────────────────────────────────
  {
    id: "edu-platform",
    name: "Education — Online Academy",
    category: "Education",
    description: "E-learning platform with course cards, instructor section, stats, and enrollment form.",
    thumb: "📚",
    getCode: (t) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>LearnHub</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;background:${t.dark};color:${t.text}}
a{text-decoration:none;color:inherit}
nav{display:flex;align-items:center;justify-content:space-between;padding:1.5rem 5%;max-width:1400px;margin:0 auto}
nav .logo{font-size:1.5rem;font-weight:800;color:#fff}
nav .logo span{color:${t.primary}}
nav ul{list-style:none;display:flex;gap:2rem}
nav ul a{font-size:.9rem;opacity:.7;font-weight:500;transition:all .2s}
nav ul a:hover{color:${t.primary};opacity:1}
.hero{padding:8rem 5% 6rem;max-width:1400px;margin:0 auto;text-align:center}
.hero h1{font-size:4rem;font-weight:800;color:#fff;line-height:1.1;margin-bottom:1.5rem;max-width:800px;margin-left:auto;margin-right:auto}
.hero h1 span{background:linear-gradient(135deg,${t.primary},${t.accent});-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero p{font-size:1.15rem;opacity:.5;max-width:600px;margin:0 auto 2.5rem;line-height:1.7}
.hero-btns{display:flex;gap:1rem;justify-content:center}
.btn-p{background:${t.primary};color:#fff;padding:1rem 2.5rem;border-radius:12px;font-weight:700;border:none;cursor:pointer;font-size:1rem;transition:all .2s}
.btn-p:hover{box-shadow:0 10px 30px ${t.primary}50;transform:translateY(-2px)}
.btn-s{background:rgba(255,255,255,.05);color:#fff;padding:1rem 2.5rem;border-radius:12px;font-weight:600;border:1px solid rgba(255,255,255,.1);cursor:pointer;font-size:1rem;transition:all .2s}
.btn-s:hover{border-color:${t.primary}}
.courses{padding:6rem 5%;max-width:1400px;margin:0 auto}
.courses h2{font-size:2.5rem;font-weight:800;color:#fff;margin-bottom:2.5rem}
.course-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem}
.course{background:${t.darkAlt};border:1px solid rgba(255,255,255,.06);border-radius:20px;overflow:hidden;transition:all .3s}
.course:hover{border-color:${t.primary}40;transform:translateY(-5px)}
.course .thumb{aspect-ratio:16/9;background:linear-gradient(135deg,${t.dark},${t.primary}15);display:flex;align-items:center;justify-content:center;font-size:3rem;position:relative;overflow:hidden}
.course .thumb img{width:100%;height:100%;object-fit:cover}
.course .thumb .level{position:absolute;top:.75rem;left:.75rem;background:${t.primary};color:#fff;padding:.2rem .75rem;border-radius:50px;font-size:.7rem;font-weight:600}
.course .body{padding:1.5rem}
.course .body h3{color:#fff;font-size:1.05rem;font-weight:700;margin-bottom:.5rem}
.course .body p{font-size:.8rem;opacity:.5;line-height:1.6;margin-bottom:1rem}
.course .meta{display:flex;justify-content:space-between;align-items:center;font-size:.8rem}
.course .meta .rating{color:${t.primary};font-weight:600}
.course .meta .students{opacity:.5}
.course .meta .price{color:#fff;font-weight:700;font-size:1rem}
.stats-bar{padding:4rem 5%;max-width:1400px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:2rem;text-align:center}
.s-item .num{font-size:2.5rem;font-weight:800;background:linear-gradient(135deg,${t.primary},${t.accent});-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.s-item p{font-size:.85rem;opacity:.5;margin-top:.25rem}
footer{padding:3rem 5%;border-top:1px solid rgba(255,255,255,.05);text-align:center;font-size:.85rem;opacity:.4}
@media(max-width:1024px){.course-grid{grid-template-columns:1fr}.stats-bar{grid-template-columns:repeat(2,1fr)}}
@media(max-width:640px){.hero h1{font-size:2.5rem}nav ul{display:none}.stats-bar{grid-template-columns:1fr}.hero-btns{flex-direction:column;align-items:center}}
</style>
</head>
<body>
<nav><a href="#" class="logo">Learn<span>Hub</span></a><ul><li><a href="#">Courses</a></li><li><a href="#">Instructors</a></li><li><a href="#">Pricing</a></li><li><a href="#">Blog</a></li></ul><a href="#" class="btn-p" style="padding:.6rem 1.5rem;font-size:.85rem">Start Learning</a></nav>
<section class="hero"><h1>Learn <span>New Skills</span> from Industry Experts</h1><p>Thousands of courses in tech, business, and design. Learn at your own pace with lifetime access and certificates.</p><div class="hero-btns"><button class="btn-p">Browse Courses</button><button class="btn-s">View Plans</button></div></section>
<section class="courses"><h2>Popular Courses</h2><div class="course-grid">
  <div class="course"><div class="thumb"><img src="${IMG.laptop}" alt="Web Dev"><div class="level">Beginner</div></div><div class="body"><h3>Complete Web Development Bootcamp</h3><p>Learn HTML, CSS, JavaScript, React, and Node.js from scratch.</p><div class="meta"><span class="rating">★ 4.9</span><span class="students">12K students</span><span class="price">$49</span></div></div></div>
  <div class="course"><div class="thumb"><img src="${IMG.student}" alt="AI"><div class="level">Advanced</div></div><div class="body"><h3>Machine Learning & AI Masterclass</h3><p>Build real ML models with Python, TensorFlow, and scikit-learn.</p><div class="meta"><span class="rating">★ 4.8</span><span class="students">8K students</span><span class="price">$79</span></div></div></div>
  <div class="course"><div class="thumb"><img src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=340&fit=crop" alt="Design"><div class="level">All Levels</div></div><div class="body"><h3>UI/UX Design with Figma</h3><p>Master product design from wireframes to high-fidelity prototypes.</p><div class="meta"><span class="rating">★ 4.9</span><span class="students">15K students</span><span class="price">$59</span></div></div></div>
</div></section>
<div class="stats-bar"><div class="s-item"><div class="num">500+</div><p>Courses</p></div><div class="s-item"><div class="num">200K+</div><p>Students</p></div><div class="s-item"><div class="num">150+</div><p>Instructors</p></div><div class="s-item"><div class="num">98%</div><p>Satisfaction</p></div></div>
<footer><p>© 2026 LearnHub. All rights reserved.</p></footer>
</body>
</html>`,
  },

  // ── AUTOMOTIVE ─────────────────────────────────────────────
  {
    id: "auto-luxury",
    name: "Automotive — Luxury Cars",
    category: "Automotive",
    description: "Dark luxury car showcase with specs grid, gallery, and test drive booking form.",
    thumb: "🚗",
    getCode: (t) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Velocity Motors</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;background:#050505;color:#999}
a{text-decoration:none;color:inherit}
nav{display:flex;align-items:center;justify-content:space-between;padding:1.5rem 5%;max-width:1400px;margin:0 auto}
nav .logo{font-size:1.5rem;font-weight:900;color:#fff;letter-spacing:4px;text-transform:uppercase}
nav ul{list-style:none;display:flex;gap:2rem}
nav ul a{font-size:.85rem;opacity:.5;font-weight:500;text-transform:uppercase;letter-spacing:1px;transition:all .2s}
nav ul a:hover{opacity:1;color:${t.primary}}
.hero{min-height:100vh;display:flex;align-items:center;padding:0 5%;position:relative;overflow:hidden}
.hero::before{content:'';position:absolute;bottom:0;left:0;right:0;height:60%;background:linear-gradient(to top,${t.primary}08,transparent)}
.hero-inner{max-width:1400px;margin:0 auto;width:100%;display:grid;grid-template-columns:1fr 1.2fr;gap:4rem;align-items:center;position:relative;z-index:1}
.hero h1{font-size:4.5rem;font-weight:900;color:#fff;line-height:1.05;text-transform:uppercase;letter-spacing:-1px;margin-bottom:1.5rem}
.hero h1 span{color:${t.primary}}
.hero p{font-size:1.05rem;opacity:.5;line-height:1.8;margin-bottom:2.5rem;max-width:450px}
.hero-btns{display:flex;gap:1rem}
.btn-car{background:${t.primary};color:#000;padding:1rem 2.5rem;font-weight:700;border:none;cursor:pointer;font-size:.9rem;text-transform:uppercase;letter-spacing:2px;transition:all .2s}
.btn-car:hover{box-shadow:0 8px 30px ${t.primary}50}
.btn-car-o{background:0;color:#fff;padding:1rem 2.5rem;font-weight:600;border:1px solid rgba(255,255,255,.15);cursor:pointer;font-size:.9rem;text-transform:uppercase;letter-spacing:2px;transition:all .2s}
.btn-car-o:hover{border-color:${t.primary}}
.hero-car{aspect-ratio:16/9;border-radius:20px;overflow:hidden;filter:drop-shadow(0 20px 60px ${t.primary}15)}
.hero-car img{width:100%;height:100%;object-fit:cover}
.specs{padding:4rem 5%;max-width:1400px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem}
.spec{background:#111;border:1px solid rgba(255,255,255,.04);padding:2rem;text-align:center;transition:all .2s}
.spec:hover{border-color:${t.primary}40}
.spec .val{font-size:2.5rem;font-weight:900;color:#fff;margin-bottom:.25rem}
.spec .val span{color:${t.primary};font-size:1rem}
.spec .label{font-size:.8rem;text-transform:uppercase;letter-spacing:2px;opacity:.4}
.gallery{padding:6rem 5%;max-width:1400px;margin:0 auto}
.gallery h2{font-size:2.5rem;font-weight:900;color:#fff;text-transform:uppercase;letter-spacing:2px;margin-bottom:2rem}
.gallery-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem}
.gal-item{aspect-ratio:16/10;background-size:cover;background-position:center;border:1px solid rgba(255,255,255,.04);display:flex;align-items:center;justify-content:center;font-size:3rem;transition:all .3s;overflow:hidden}
.gal-item img{width:100%;height:100%;object-fit:cover;transition:transform .5s}
.gal-item:hover img{transform:scale(1.05)}
.gal-item:hover{border-color:${t.primary}30;transform:scale(1.02)}
.booking{padding:6rem 5%;max-width:700px;margin:0 auto;text-align:center}
.booking h2{font-size:2.5rem;font-weight:900;color:#fff;text-transform:uppercase;margin-bottom:1rem}
.booking>p{opacity:.4;margin-bottom:3rem}
.booking form{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem}
.booking input,.booking select{background:#111;border:1px solid rgba(255,255,255,.08);padding:1rem;color:#fff;font-size:.9rem;outline:none;font-family:inherit}
.booking input:focus,.booking select:focus{border-color:${t.primary}}
.booking button{grid-column:1/-1;background:${t.primary};color:#000;padding:1rem;font-weight:700;text-transform:uppercase;letter-spacing:2px;border:none;cursor:pointer;font-size:.9rem}
footer{padding:3rem 5%;border-top:1px solid rgba(255,255,255,.04);text-align:center;font-size:.8rem;opacity:.3}
@media(max-width:1024px){.hero-inner,.specs,.gallery-grid{grid-template-columns:1fr}.hero h1{font-size:3rem}.hero-car{font-size:6rem}}
@media(max-width:640px){nav ul{display:none}.hero h1{font-size:2.2rem}.specs{grid-template-columns:repeat(2,1fr)}.booking form{grid-template-columns:1fr}}
</style>
</head>
<body>
<nav><a href="#" class="logo">Velocity</a><ul><li><a href="#">Models</a></li><li><a href="#">Performance</a></li><li><a href="#">Gallery</a></li><li><a href="#">Contact</a></li></ul></nav>
<section class="hero"><div class="hero-inner"><div><h1>Pure <span>Power</span><br>Redefined</h1><p>Experience the pinnacle of automotive engineering. Where luxury meets performance in perfect harmony.</p><div class="hero-btns"><button class="btn-car">Book Test Drive</button><button class="btn-car-o">Explore</button></div></div><div class="hero-car"><img src="${IMG.car}" alt="Luxury Car"></div></div></section>
<div class="specs"><div class="spec"><div class="val">3.2<span>s</span></div><div class="label">0–100 km/h</div></div><div class="spec"><div class="val">680<span>hp</span></div><div class="label">Horsepower</div></div><div class="spec"><div class="val">340<span>km/h</span></div><div class="label">Top Speed</div></div><div class="spec"><div class="val">100<span>kWh</span></div><div class="label">Battery</div></div></div>
<section class="gallery"><h2>Gallery</h2><div class="gallery-grid"><div class="gal-item"><img src="${IMG.car}" alt="Car"></div><div class="gal-item"><img src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=400&fit=crop" alt="Interior"></div><div class="gal-item"><img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop" alt="Speed"></div></div></section>
<section class="booking"><h2>Book a Test Drive</h2><p>Experience the power firsthand.</p><form><input type="text" placeholder="Full Name"><input type="email" placeholder="Email"><input type="tel" placeholder="Phone"><select><option>Select Model</option><option>GT Sport</option><option>GT Touring</option><option>RS Performance</option></select><button type="submit">Reserve Now</button></form></section>
<footer><p>© 2026 Velocity Motors. All rights reserved.</p></footer>
</body>
</html>`,
  },

  // ── REAL ESTATE ────────────────────────────────────────────
  {
    id: "realestate-luxury",
    name: "Real Estate — Luxury Properties",
    category: "Real Estate",
    description: "Dark luxury real estate with property cards, search form, testimonials, and contact.",
    thumb: "🏡",
    getCode: (t) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Prime Properties</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;background:${t.dark};color:${t.text}}
a{text-decoration:none;color:inherit}
nav{display:flex;align-items:center;justify-content:space-between;padding:1.5rem 5%;max-width:1400px;margin:0 auto}
nav .logo{font-family:'Playfair Display',serif;font-size:1.5rem;font-weight:700;color:#fff}
nav .logo span{color:${t.primary}}
nav ul{list-style:none;display:flex;gap:2rem}
nav ul a{font-size:.9rem;opacity:.6;font-weight:500;transition:all .2s}
nav ul a:hover{opacity:1;color:${t.primary}}
.hero{min-height:90vh;display:flex;align-items:center;padding:4rem 5%;max-width:1400px;margin:0 auto}
.hero-text{max-width:700px}
.hero-text .tag{display:inline-block;background:${t.primary}15;color:${t.primary};border:1px solid ${t.primary}30;padding:.4rem 1.2rem;border-radius:50px;font-size:.8rem;font-weight:600;margin-bottom:2rem}
.hero-text h1{font-family:'Playfair Display',serif;font-size:4rem;font-weight:700;color:#fff;line-height:1.1;margin-bottom:1.5rem}
.hero-text h1 span{color:${t.primary}}
.hero-text p{font-size:1.1rem;opacity:.5;line-height:1.8;margin-bottom:2.5rem}
.search-box{display:flex;background:${t.darkAlt};border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:.5rem;gap:.5rem}
.search-box input,.search-box select{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.06);border-radius:12px;padding:1rem 1.2rem;color:#fff;font-size:.9rem;outline:none;flex:1;font-family:inherit}
.search-box input:focus,.search-box select:focus{border-color:${t.primary}}
.search-box button{background:${t.primary};color:#fff;padding:1rem 2rem;border-radius:12px;font-weight:700;border:none;cursor:pointer;white-space:nowrap}
.properties{padding:6rem 5%;max-width:1400px;margin:0 auto}
.properties h2{font-family:'Playfair Display',serif;font-size:2.5rem;color:#fff;margin-bottom:2.5rem}
.prop-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem}
.prop{background:${t.darkAlt};border:1px solid rgba(255,255,255,.06);border-radius:20px;overflow:hidden;transition:all .3s}
.prop:hover{border-color:${t.primary}40;transform:translateY(-5px)}
.prop .img{aspect-ratio:16/10;background:linear-gradient(135deg,${t.dark},${t.primary}10);display:flex;align-items:center;justify-content:center;font-size:3.5rem;position:relative;overflow:hidden}
.prop .img img{width:100%;height:100%;object-fit:cover}
.prop .img .badge{position:absolute;top:.75rem;left:.75rem;background:${t.primary};color:#fff;padding:.25rem .75rem;border-radius:50px;font-size:.7rem;font-weight:700}
.prop .info{padding:1.5rem}
.prop .info .price{font-size:1.3rem;font-weight:800;color:#fff;margin-bottom:.25rem}
.prop .info h3{font-size:.95rem;font-weight:600;color:#fff;opacity:.8;margin-bottom:.75rem}
.prop .info .details{display:flex;gap:1.5rem;font-size:.8rem;opacity:.5}
footer{padding:3rem 5%;border-top:1px solid rgba(255,255,255,.05);text-align:center;font-size:.85rem;opacity:.4}
@media(max-width:1024px){.prop-grid{grid-template-columns:1fr}.hero-text h1{font-size:3rem}}
@media(max-width:640px){nav ul{display:none}.hero-text h1{font-size:2.5rem}.search-box{flex-direction:column}}
</style>
</head>
<body>
<nav><a href="#" class="logo">Prime<span>.</span></a><ul><li><a href="#">Buy</a></li><li><a href="#">Rent</a></li><li><a href="#">Agents</a></li><li><a href="#">About</a></li></ul><a href="#" style="background:${t.primary};color:#fff;padding:.6rem 1.5rem;border-radius:10px;font-weight:600;font-size:.85rem">List Property</a></nav>
<section class="hero"><div class="hero-text"><div class="tag">🏆 #1 Luxury Real Estate Platform</div><h1>Find Your <span>Dream Home</span></h1><p>Browse thousands of premium properties in the most desirable locations worldwide.</p><div class="search-box"><input type="text" placeholder="Location or Address"><select><option>Buy</option><option>Rent</option></select><button>Search →</button></div></div></section>
<section class="properties"><h2>Featured Properties</h2><div class="prop-grid">
  <div class="prop"><div class="img"><img src="${IMG.house}" alt="Villa"><div class="badge">Featured</div></div><div class="info"><div class="price">$2,450,000</div><h3>Modern Villa with Ocean View</h3><div class="details"><span>4 Beds</span><span>3 Baths</span><span>3,200 sqft</span></div></div></div>
  <div class="prop"><div class="img"><img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop" alt="Penthouse"><div class="badge">New</div></div><div class="info"><div class="price">$890,000</div><h3>Downtown Luxury Penthouse</h3><div class="details"><span>3 Beds</span><span>2 Baths</span><span>2,100 sqft</span></div></div></div>
  <div class="prop"><div class="img"><img src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop" alt="Estate"></div><div class="info"><div class="price">$1,750,000</div><h3>Countryside Estate</h3><div class="details"><span>5 Beds</span><span>4 Baths</span><span>4,500 sqft</span></div></div></div>
</div></section>
<footer><p>© 2026 Prime Properties. All rights reserved.</p></footer>
</body>
</html>`,
  },

  // ── FITNESS ────────────────────────────────────────────────
  {
    id: "fitness-gym",
    name: "Fitness — Premium Gym",
    category: "Fitness",
    description: "Dark gym landing with class schedule, membership pricing, trainer profiles, and join form.",
    thumb: "🏋️",
    getCode: (t) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>FORGE Fitness</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;background:#050505;color:#999}
a{text-decoration:none;color:inherit}
nav{display:flex;align-items:center;justify-content:space-between;padding:1.5rem 5%;max-width:1400px;margin:0 auto}
nav .logo{font-size:1.5rem;font-weight:900;color:#fff;letter-spacing:5px;text-transform:uppercase}
nav ul{list-style:none;display:flex;gap:2rem}
nav ul a{font-size:.85rem;opacity:.5;font-weight:500;text-transform:uppercase;letter-spacing:1px;transition:all .2s}
nav ul a:hover{opacity:1;color:${t.primary}}
.hero{min-height:100vh;display:flex;align-items:center;padding:0 5%;position:relative}
.hero::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,${t.primary}08,transparent 40%)}
.hero-inner{max-width:1400px;margin:0 auto;width:100%}
.hero h1{font-size:5rem;font-weight:900;color:#fff;text-transform:uppercase;line-height:1;margin-bottom:1.5rem;max-width:700px}
.hero h1 span{color:${t.primary}}
.hero p{font-size:1.1rem;opacity:.4;max-width:500px;line-height:1.8;margin-bottom:2.5rem}
.hero-btns{display:flex;gap:1rem}
.btn-fit{background:${t.primary};color:#000;padding:1rem 2.5rem;font-weight:800;border:none;cursor:pointer;font-size:.9rem;text-transform:uppercase;letter-spacing:2px;transition:all .2s}
.btn-fit:hover{box-shadow:0 8px 30px ${t.primary}50}
.btn-fit-o{background:0;color:#fff;padding:1rem 2.5rem;font-weight:600;border:2px solid rgba(255,255,255,.15);cursor:pointer;font-size:.9rem;text-transform:uppercase;letter-spacing:2px;transition:all .2s}
.btn-fit-o:hover{border-color:${t.primary}}
.pricing{padding:6rem 5%;max-width:1200px;margin:0 auto;text-align:center}
.pricing h2{font-size:2.5rem;font-weight:900;color:#fff;text-transform:uppercase;letter-spacing:3px;margin-bottom:.5rem}
.pricing>p{opacity:.4;margin-bottom:3rem}
.plans{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem}
.plan{background:#111;border:1px solid rgba(255,255,255,.06);padding:2.5rem;transition:all .3s}
.plan:hover{border-color:${t.primary}40;transform:translateY(-5px)}
.plan.featured{border-color:${t.primary};position:relative}
.plan.featured::before{content:'BEST VALUE';position:absolute;top:-14px;left:50%;transform:translateX(-50%);background:${t.primary};color:#000;padding:.3rem 1.5rem;font-size:.7rem;font-weight:800;letter-spacing:2px}
.plan h3{color:#fff;font-size:1rem;font-weight:600;text-transform:uppercase;letter-spacing:2px;margin-bottom:1.5rem}
.plan .price{font-size:3.5rem;font-weight:900;color:#fff;margin-bottom:.25rem}
.plan .price span{font-size:1rem;font-weight:400;opacity:.4}
.plan .per{font-size:.85rem;opacity:.4;margin-bottom:2rem}
.plan ul{list-style:none;text-align:left;margin-bottom:2rem}
.plan ul li{padding:.6rem 0;border-bottom:1px solid rgba(255,255,255,.04);font-size:.85rem;display:flex;align-items:center;gap:.5rem}
.plan ul li::before{content:'✓';color:${t.primary};font-weight:700;font-size:.75rem}
.plan button{width:100%;padding:1rem;font-weight:700;font-size:.85rem;text-transform:uppercase;letter-spacing:2px;cursor:pointer;border:none;transition:all .2s}
.plan button{background:rgba(255,255,255,.05);color:#fff;border:1px solid rgba(255,255,255,.1)}
.plan.featured button{background:${t.primary};color:#000;border:none}
footer{padding:3rem 5%;border-top:1px solid rgba(255,255,255,.04);text-align:center;font-size:.8rem;opacity:.3}
@media(max-width:1024px){.plans{grid-template-columns:1fr}.hero h1{font-size:3.5rem}}
@media(max-width:640px){nav ul{display:none}.hero h1{font-size:2.5rem}}
</style>
</head>
<body>
<nav><a href="#" class="logo">Forge</a><ul><li><a href="#">Classes</a></li><li><a href="#">Trainers</a></li><li><a href="#">Pricing</a></li><li><a href="#">Contact</a></li></ul><a href="#" class="btn-fit" style="padding:.6rem 1.5rem;font-size:.75rem">Join Now</a></nav>
<section class="hero"><div class="hero-inner"><h1>Forge Your <span>Strongest</span> Self</h1><p>State-of-the-art equipment, expert trainers, and 100+ weekly classes. Your transformation starts here.</p><div class="hero-btns"><button class="btn-fit">Start Free Trial</button><button class="btn-fit-o">View Classes</button></div></div></section>
<section class="pricing"><h2>Membership</h2><p>No contracts. Cancel anytime.</p><div class="plans">
  <div class="plan"><h3>Basic</h3><div class="price">$29<span>/mo</span></div><div class="per">Billed monthly</div><ul><li>Gym access (6am–10pm)</li><li>Basic equipment</li><li>Locker room</li><li>1 guest pass/mo</li></ul><button>Get Started</button></div>
  <div class="plan featured"><h3>Pro</h3><div class="price">$59<span>/mo</span></div><div class="per">Billed monthly</div><ul><li>24/7 gym access</li><li>All equipment & classes</li><li>Sauna & spa</li><li>3 guest passes/mo</li><li>1 PT session/mo</li></ul><button>Get Started</button></div>
  <div class="plan"><h3>Elite</h3><div class="price">$99<span>/mo</span></div><div class="per">Billed monthly</div><ul><li>Everything in Pro</li><li>Unlimited PT sessions</li><li>Nutrition planning</li><li>Priority booking</li><li>Unlimited guests</li></ul><button>Get Started</button></div>
</div></section>
<footer><p>© 2026 FORGE Fitness. All rights reserved.</p></footer>
</body>
</html>`,
  },

  // ── TRAVEL ─────────────────────────────────────────────────
  {
    id: "travel-luxury",
    name: "Travel — Luxury Trips",
    category: "Travel",
    description: "Travel agency with destination cards, search booking form, testimonials, and newsletter.",
    thumb: "✈️",
    getCode: (t) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Wanderlust Travel</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;background:${t.dark};color:${t.text}}
a{text-decoration:none;color:inherit}
nav{display:flex;align-items:center;justify-content:space-between;padding:1.5rem 5%;max-width:1400px;margin:0 auto}
nav .logo{font-family:'Playfair Display',serif;font-size:1.5rem;font-weight:700;color:#fff}
nav .logo span{color:${t.primary}}
nav ul{list-style:none;display:flex;gap:2rem}
nav ul a{font-size:.9rem;opacity:.6;font-weight:500;transition:all .2s}
nav ul a:hover{color:${t.primary};opacity:1}
.hero{min-height:90vh;display:flex;align-items:center;padding:4rem 5%;max-width:1400px;margin:0 auto;text-align:center}
.hero-content{max-width:800px;margin:0 auto}
.hero h1{font-family:'Playfair Display',serif;font-size:4rem;font-weight:700;color:#fff;line-height:1.1;margin-bottom:1.5rem}
.hero h1 span{color:${t.primary}}
.hero p{font-size:1.15rem;opacity:.5;line-height:1.7;margin-bottom:3rem}
.search-bar{display:flex;background:${t.darkAlt};border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:.5rem;gap:.5rem;max-width:700px;margin:0 auto}
.search-bar input,.search-bar select{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.06);border-radius:12px;padding:1rem;color:#fff;font-size:.9rem;outline:none;flex:1;font-family:inherit}
.search-bar button{background:${t.primary};color:#fff;padding:1rem 2rem;border-radius:12px;font-weight:700;border:none;cursor:pointer;white-space:nowrap}
.destinations{padding:6rem 5%;max-width:1400px;margin:0 auto}
.destinations h2{font-family:'Playfair Display',serif;font-size:2.5rem;color:#fff;margin-bottom:2.5rem}
.dest-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem}
.dest{background:${t.darkAlt};border:1px solid rgba(255,255,255,.06);border-radius:20px;overflow:hidden;transition:all .3s}
.dest:hover{border-color:${t.primary}40;transform:translateY(-8px)}
.dest .img{aspect-ratio:16/10;background:linear-gradient(135deg,${t.dark},${t.primary}12);display:flex;align-items:center;justify-content:center;font-size:4rem;overflow:hidden}
.dest .img img{width:100%;height:100%;object-fit:cover;transition:transform .5s}
.dest:hover .img img{transform:scale(1.08)}
.dest .body{padding:1.5rem}
.dest .body h3{color:#fff;font-size:1.15rem;font-weight:700;margin-bottom:.25rem}
.dest .body .loc{font-size:.85rem;opacity:.5;margin-bottom:1rem}
.dest .body .bottom{display:flex;justify-content:space-between;align-items:center}
.dest .body .price{color:${t.primary};font-weight:700;font-size:1.1rem}
.dest .body .rating{font-size:.85rem;opacity:.6}
footer{padding:3rem 5%;border-top:1px solid rgba(255,255,255,.05);text-align:center;font-size:.85rem;opacity:.4}
@media(max-width:1024px){.dest-grid{grid-template-columns:1fr}.hero h1{font-size:3rem}}
@media(max-width:640px){nav ul{display:none}.hero h1{font-size:2.5rem}.search-bar{flex-direction:column}}
</style>
</head>
<body>
<nav><a href="#" class="logo">Wander<span>lust</span></a><ul><li><a href="#">Destinations</a></li><li><a href="#">Packages</a></li><li><a href="#">About</a></li><li><a href="#">Contact</a></li></ul><a href="#" style="background:${t.primary};color:#fff;padding:.6rem 1.5rem;border-radius:10px;font-weight:600;font-size:.85rem">Book Now</a></nav>
<section class="hero"><div class="hero-content"><h1>Your Next <span>Adventure</span> Awaits</h1><p>Handpicked destinations, luxury stays, and unforgettable experiences crafted just for you.</p><div class="search-bar"><input type="text" placeholder="Where to?"><input type="date"><select><option>2 Travelers</option><option>4 Travelers</option><option>Group</option></select><button>Search</button></div></div></section>
<section class="destinations"><h2>Trending Destinations</h2><div class="dest-grid">
  <div class="dest"><div class="img"><img src="${IMG.travel}" alt="Maldives"></div><div class="body"><h3>Maldives Paradise</h3><div class="loc">South Asia · 7 nights</div><div class="bottom"><span class="price">From $2,499</span><span class="rating">★ 4.9</span></div></div></div>
  <div class="dest"><div class="img"><img src="https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&h=400&fit=crop" alt="Alps"></div><div class="body"><h3>Swiss Alps Retreat</h3><div class="loc">Switzerland · 5 nights</div><div class="bottom"><span class="price">From $1,899</span><span class="rating">★ 4.8</span></div></div></div>
  <div class="dest"><div class="img"><img src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&h=400&fit=crop" alt="Santorini"></div><div class="body"><h3>Santorini Escape</h3><div class="loc">Greece · 6 nights</div><div class="bottom"><span class="price">From $1,599</span><span class="rating">★ 4.9</span></div></div></div>
</div></section>
<footer><p>© 2026 Wanderlust Travel. All rights reserved.</p></footer>
</body>
</html>`,
  },
];

const categoryFallbackImages: Record<string, string> = {
  "Tech / SaaS": "https://images.unsplash.com/photo-1551434678-e076c223a692?w=700&h=420&fit=crop",
  "Agency": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&h=420&fit=crop",
  "Restaurant": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=700&h=420&fit=crop",
  "E-Commerce": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=700&h=420&fit=crop",
  "Portfolio": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=700&h=420&fit=crop",
  "Healthcare": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=700&h=420&fit=crop",
  "Education": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=700&h=420&fit=crop",
  "Automotive": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=700&h=420&fit=crop",
  "Real Estate": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=700&h=420&fit=crop",
  "Fitness": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=700&h=420&fit=crop",
  "Travel": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700&h=420&fit=crop",
  "Finance": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&h=420&fit=crop",
  "Startup": "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=700&h=420&fit=crop",
  "Beauty / Lifestyle": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=700&h=420&fit=crop",
  "Nature / Jungle": "https://images.unsplash.com/photo-1448375240586-882707db888b?w=700&h=420&fit=crop",
  "Entertainment": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=700&h=420&fit=crop",
  "Fashion / Lifestyle": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=700&h=420&fit=crop",
  "Photography": "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=700&h=420&fit=crop",
  "Legal": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=700&h=420&fit=crop",
  "Nonprofit / Charity": "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=700&h=420&fit=crop",
  "Pets / Animals": "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=700&h=420&fit=crop",
  "Gaming / Esports": "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=700&h=420&fit=crop",
  "Hotel / Hospitality": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&h=420&fit=crop",
  "Events / Wedding": "https://images.unsplash.com/photo-1519741497674-611481863552?w=700&h=420&fit=crop",
  "Consulting": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=700&h=420&fit=crop",
};

const allTemplates = [...templates, ...advancedTemplates, ...jungleTemplates, ...vertexTemplates, ...extraTemplates, ...premiumTemplates, ...premiumTemplatesB, ...premiumTemplatesC, ...immersiveTemplates, ...immersiveTemplatesB, ...immersiveTemplatesC];

export default function LandingPageGeneratorPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTheme, setActiveTheme] = useState(colorThemes[0]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [showCode, setShowCode] = useState(false);
  const { toast } = useToast();

  const filtered = useMemo(() => {
    if (activeCategory === "All") return allTemplates;
    return allTemplates.filter((t) => t.category === activeCategory);
  }, [activeCategory]);

  const handleCopy = () => {
    if (!selectedTemplate) return;
    navigator.clipboard.writeText(selectedTemplate.getCode(activeTheme));
    toast("HTML code copied to clipboard!");
  };

  const currentIndex = selectedTemplate ? filtered.findIndex(t => t.id === selectedTemplate.id) : -1;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < filtered.length - 1;
  const goToPrev = () => { if (hasPrev) { setSelectedTemplate(filtered[currentIndex - 1]); setShowCode(false); } };
  const goToNext = () => { if (hasNext) { setSelectedTemplate(filtered[currentIndex + 1]); setShowCode(false); } };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedTemplate || showCode) return;
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          Landing Page Templates
        </h1>
        <p className="text-muted text-lg">
          Professional landing page designs with complete HTML/CSS code. Preview, customize colors, copy the code.
        </p>
      </div>

      {/* Color Themes */}
      <div className="neu-card p-4 mb-6">
        <span className="text-sm font-medium mb-3 block">Color Theme</span>
        <div className="flex flex-wrap gap-2">
          {colorThemes.map((theme) => (
            <button
              key={theme.name}
              onClick={() => setActiveTheme(theme)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTheme.name === theme.name
                  ? "ring-2 ring-primary bg-primary/5"
                  : "hover:bg-background"
              }`}
            >
              <span
                className="w-5 h-5 rounded-full border border-surface-border"
                style={{ background: theme.primary }}
              />
              {theme.name}
            </button>
          ))}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${
              activeCategory === cat
                ? "bg-primary text-white shadow-sm"
                : "neu-btn text-muted hover:text-primary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Template Grid */}
      {!selectedTemplate ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {filtered.map((template) => {
            const html = template.getCode(activeTheme);
            const imgMatch = html.match(/src="(https:\/\/images\.unsplash\.com[^"]+)"/);
            const previewUrl = imgMatch
              ? imgMatch[1].replace(/w=\d+/, "w=700").replace(/h=\d+/, "h=420")
              : categoryFallbackImages[template.category] || null;
            return (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(template)}
                className="text-left group outline-none focus:outline-none"
              >
                {/* Browser Mockup Frame */}
                <div className="rounded-2xl overflow-hidden border border-black/[.08] dark:border-white/[.08] bg-white dark:bg-neutral-900 shadow-[0_2px_20px_rgba(0,0,0,0.06)] transition-all duration-500 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] group-hover:-translate-y-2">
                  {/* Browser Chrome */}
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-neutral-50 dark:bg-neutral-800 border-b border-black/[.06] dark:border-white/[.06]">
                    <div className="flex gap-1.5">
                      <span className="w-[10px] h-[10px] rounded-full bg-[#FF5F57]" />
                      <span className="w-[10px] h-[10px] rounded-full bg-[#FFBD2E]" />
                      <span className="w-[10px] h-[10px] rounded-full bg-[#28C840]" />
                    </div>
                    <div className="flex-1 flex items-center gap-1.5 bg-white dark:bg-neutral-700 rounded-lg px-3 py-[5px] ml-3 border border-black/[.06] dark:border-white/[.06]">
                      <svg className="w-3 h-3 text-neutral-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0-1.1.9-2 2-2h2a2 2 0 012 2v1a2 2 0 01-2 2h-2a2 2 0 01-2-2v-1z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v1a2 2 0 01-2 2M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8" /></svg>
                      <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-mono truncate">
                        {template.name.toLowerCase().replace(/[\s—\/&]+/g, "-").replace(/[^a-z0-9-]/g, "")}.design
                      </span>
                    </div>
                  </div>

                  {/* Preview Image */}
                  <div className="aspect-[16/10] relative overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt={template.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center text-6xl"
                        style={{ background: `linear-gradient(135deg, ${activeTheme.dark}, ${activeTheme.primary}20)` }}
                      >
                        {template.thumb}
                      </div>
                    )}
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-5">
                      <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <span className="inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md bg-white/15 text-white/90 backdrop-blur-sm mb-2">
                          {template.category}
                        </span>
                        <p className="text-white/70 text-xs leading-relaxed line-clamp-2">{template.description}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Template Info */}
                <div className="mt-4 px-1">
                  <div className="flex items-center gap-3">
                    <span className="text-xl flex-shrink-0">{template.thumb}</span>
                    <div className="min-w-0">
                      <h3 className="font-bold text-sm truncate group-hover:text-primary transition-colors duration-300">{template.name}</h3>
                      <span className="text-[11px] text-muted">{template.category}</span>
                    </div>
                  </div>
                  <div className="mt-2.5 flex items-center gap-1.5 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 pl-[36px]">
                    Preview &amp; Get Code
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        /* Template Detail View */
        <div>
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => { setSelectedTemplate(null); setShowCode(false); }}
              className="neu-btn px-4 py-2 text-sm font-medium text-muted hover:text-primary flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={goToPrev}
                disabled={!hasPrev}
                className="neu-btn w-10 h-10 flex items-center justify-center rounded-xl text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:text-primary transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="text-sm text-muted font-medium tabular-nums min-w-[60px] text-center">{currentIndex + 1} / {filtered.length}</span>
              <button
                onClick={goToNext}
                disabled={!hasNext}
                className="neu-btn w-10 h-10 flex items-center justify-center rounded-xl text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:text-primary transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
            <div>
              <h2 className="text-2xl font-bold">{selectedTemplate.name}</h2>
              <p className="text-muted text-sm">{selectedTemplate.description} — {activeTheme.name} theme</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowCode(!showCode)}
                className={`neu-btn px-5 py-2.5 text-sm font-medium ${showCode ? "text-primary" : "text-muted hover:text-primary"}`}
              >
                {showCode ? "← Preview" : "View Code"}
              </button>
              <button
                onClick={handleCopy}
                className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity"
              >
                Copy HTML
              </button>
            </div>
          </div>

          {showCode ? (
            <div className="code-area p-5 text-sm font-mono overflow-auto max-h-[700px] whitespace-pre-wrap">
              {selectedTemplate.getCode(activeTheme)}
            </div>
          ) : (
            <div className="neu-card overflow-hidden rounded-2xl">
              <iframe
                srcDoc={selectedTemplate.getCode(activeTheme)}
                className="w-full h-[800px] border-0"
                title={selectedTemplate.name}
                sandbox="allow-scripts"
              />
            </div>
          )}
        </div>
      )}

      {/* Stats */}
      {!selectedTemplate && (
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="neu-card p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-1">{allTemplates.length * colorThemes.length}+</div>
            <div className="text-sm text-muted">Template Combinations</div>
          </div>
          <div className="neu-card p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-1">{categories.length - 1}</div>
            <div className="text-sm text-muted">Industry Categories</div>
          </div>
          <div className="neu-card p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-1">100%</div>
            <div className="text-sm text-muted">Free &amp; Open Source</div>
          </div>
        </div>
      )}

      {/* SEO Article */}
      <article className="mt-16 max-w-4xl mx-auto space-y-10">
        <section>
          <h2 className="text-2xl font-bold mb-4">Free Professional Landing Page Templates</h2>
          <p className="text-muted leading-relaxed mb-3">
            Browse Zentrify&apos;s collection of professional landing page templates spanning {categories.length - 1} industry
            categories. Every template features dark modern design with gradient backgrounds, glassmorphic elements,
            navigation bars, forms, pricing tables, and complete responsive CSS — ready to copy and customize.
          </p>
          <p className="text-muted leading-relaxed">
            Choose from {colorThemes.length} color themes to match your brand. Each template generates clean,
            production-ready HTML and CSS with no dependencies — works in any browser, any framework, any project.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use</h2>
          <ol className="text-muted space-y-3 list-decimal list-inside">
            <li><strong className="text-foreground">Choose a color theme</strong> — pick from Cyan Blue, Electric Purple, Neon Green, and more</li>
            <li><strong className="text-foreground">Browse by category</strong> — filter by industry: Tech, Agency, Restaurant, E-Commerce, etc.</li>
            <li><strong className="text-foreground">Preview the template</strong> — click any card to see a full live preview with your chosen colors</li>
            <li><strong className="text-foreground">Copy the code</strong> — click &quot;Copy HTML&quot; for complete, ready-to-use code</li>
            <li><strong className="text-foreground">Customize</strong> — replace placeholder text and images with your own content</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="neu-card-sm p-5">
              <h3 className="font-semibold mb-2">Can I use these templates for commercial projects?</h3>
              <p className="text-sm text-muted">Yes! All templates are completely free for personal and commercial use. No attribution required.</p>
            </div>
            <div className="neu-card-sm p-5">
              <h3 className="font-semibold mb-2">Do I need any framework?</h3>
              <p className="text-sm text-muted">No. Each template is pure HTML and CSS with Google Fonts — just open the file in a browser. You can also integrate into React, Vue, Next.js, or any framework.</p>
            </div>
            <div className="neu-card-sm p-5">
              <h3 className="font-semibold mb-2">Are the templates responsive?</h3>
              <p className="text-sm text-muted">Yes. Every template includes responsive CSS with mobile-first breakpoints for phones, tablets, and desktops.</p>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
