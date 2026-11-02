import type { Content, EditableTemplate, Section } from "../editor/types";
import { csv, esc, previewScript, reader, revealCss, revealScript, safeColor, safeUrl } from "../editor/html";

const schema: Section[] = [
  {
    id: "brand",
    label: "Brand",
    fields: [
      { type: "text", key: "name", label: "Agency name" },
      { type: "text", key: "cta", label: "Nav CTA" },
      { type: "text", key: "ctaUrl", label: "CTA link", placeholder: "#contact" },
    ],
  },
  {
    id: "theme",
    label: "Colors",
    fields: [
      { type: "color", key: "primary", label: "Accent" },
      { type: "color", key: "bg", label: "Background" },
      { type: "color", key: "surface", label: "Surface" },
      { type: "color", key: "text", label: "Body text" },
    ],
  },
  {
    id: "hero",
    label: "Hero",
    anchor: "top",
    fields: [
      { type: "textarea", key: "line1", label: "Line 1 (large)", rows: 1 },
      { type: "textarea", key: "line2", label: "Line 2 (outline)", rows: 1, hint: "Rendered as outline/stroke text." },
      { type: "textarea", key: "line3", label: "Line 3 (accent)", rows: 1 },
      { type: "textarea", key: "subtitle", label: "Subtitle", rows: 2 },
      { type: "text", key: "btn", label: "CTA button" },
      { type: "text", key: "scroll", label: "Scroll text", placeholder: "Scroll to explore" },
    ],
  },
  {
    id: "reel",
    label: "Showreel banner",
    toggleable: true,
    anchor: "reel",
    fields: [
      { type: "text", key: "text", label: "Marquee text", hint: "Repeated across the screen." },
    ],
  },
  {
    id: "services",
    label: "Services",
    toggleable: true,
    anchor: "services",
    fields: [
      { type: "text", key: "eyebrow", label: "Tag" },
      { type: "text", key: "title", label: "Heading" },
      {
        type: "list",
        key: "items",
        label: "Services",
        itemLabel: "Service",
        titleKey: "title",
        max: 6,
        newItem: { num: "01", title: "Service", desc: "Description of this service." },
        fields: [
          { type: "text", key: "num", label: "Number" },
          { type: "text", key: "title", label: "Title" },
          { type: "textarea", key: "desc", label: "Description", rows: 2 },
        ],
      },
    ],
  },
  {
    id: "work",
    label: "Selected work",
    toggleable: true,
    anchor: "work",
    fields: [
      { type: "text", key: "eyebrow", label: "Tag" },
      { type: "text", key: "title", label: "Heading" },
      {
        type: "list",
        key: "items",
        label: "Projects",
        itemLabel: "Project",
        titleKey: "title",
        max: 4,
        newItem: { title: "Project", category: "Branding", year: "2025", image: "" },
        fields: [
          { type: "text", key: "title", label: "Title" },
          { type: "text", key: "category", label: "Category" },
          { type: "text", key: "year", label: "Year" },
          { type: "image", key: "image", label: "Image" },
        ],
      },
    ],
  },
  {
    id: "about",
    label: "About",
    toggleable: true,
    anchor: "about",
    fields: [
      { type: "text", key: "eyebrow", label: "Tag" },
      { type: "textarea", key: "text", label: "About text", rows: 4, hint: "A bold statement about your agency." },
      {
        type: "list",
        key: "stats",
        label: "Stats",
        itemLabel: "Stat",
        titleKey: "label",
        max: 4,
        newItem: { value: "0", label: "Stat" },
        fields: [
          { type: "text", key: "value", label: "Number" },
          { type: "text", key: "label", label: "Label" },
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
      {
        type: "list",
        key: "items",
        label: "Quotes",
        itemLabel: "Quote",
        titleKey: "name",
        max: 3,
        newItem: { quote: "They transformed our brand.", name: "Name", role: "Title, Company" },
        fields: [
          { type: "textarea", key: "quote", label: "Quote", rows: 2 },
          { type: "text", key: "name", label: "Name" },
          { type: "text", key: "role", label: "Role" },
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
      { type: "textarea", key: "title", label: "Heading", rows: 2 },
      { type: "text", key: "btn", label: "Button" },
      { type: "email", key: "email", label: "Email" },
      { type: "text", key: "location", label: "Location" },
    ],
  },
  {
    id: "footer",
    label: "Footer",
    fields: [
      { type: "text", key: "copy", label: "Copyright" },
      { type: "text", key: "links", label: "Social links (comma sep)", placeholder: "Twitter, Dribbble, Instagram" },
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
  enabled: { reel: true, services: true, work: true, about: true, testimonials: true, contact: true },
  values: {
    brand: { name: "KINETIC", cta: "Let's talk", ctaUrl: "#contact" },
    theme: { primary: "#ff3d00", bg: "#0a0a0a", surface: "#141414", text: "#777" },
    hero: {
      line1: "We create",
      line2: "digital",
      line3: "experiences",
      subtitle: "Award-winning creative studio crafting brand identities, digital products, and motion experiences for ambitious companies.",
      btn: "Start a project →",
      scroll: "Scroll to explore ↓",
    },
    reel: { text: "SHOWREEL 2025" },
    services: {
      eyebrow: "What we do",
      title: "Services",
      items: [
        { num: "01", title: "Brand Strategy", desc: "We define your brand's DNA — positioning, voice, and visual identity that resonates." },
        { num: "02", title: "Web Design", desc: "Custom websites that combine bold aesthetics with seamless interaction design." },
        { num: "03", title: "Motion Design", desc: "Kinetic typography, 3D animation, and video that tells your story dynamically." },
        { num: "04", title: "Development", desc: "High-performance front-end engineering with React, Next.js, and WebGL." },
      ] as unknown as string,
    },
    work: {
      eyebrow: "Selected work",
      title: "Projects",
      items: [
        { title: "Luminar Rebrand", category: "Brand Identity", year: "2025", image: "" },
        { title: "Nexus Platform", category: "Web Design & Dev", year: "2025", image: "" },
        { title: "Vortex Campaign", category: "Motion Design", year: "2024", image: "" },
        { title: "Helios Dashboard", category: "Product Design", year: "2024", image: "" },
      ] as unknown as string,
    },
    about: {
      eyebrow: "About us",
      text: "We're a collective of designers, developers, and strategists who believe great work comes from bold ideas executed with precision. Every project is an opportunity to push boundaries.",
      stats: [
        { value: "120+", label: "Projects delivered" },
        { value: "8", label: "Years in business" },
        { value: "15", label: "Team members" },
        { value: "24", label: "Awards won" },
      ] as unknown as string,
    },
    testimonials: {
      items: [
        { quote: "KINETIC didn't just redesign our brand — they redefined how people experience it. The results speak for themselves.", name: "Elena Voss", role: "CEO, Luminar" },
        { quote: "The attention to motion and micro-interactions set our product apart. Users love it.", name: "Marcus Cole", role: "CPO, Nexus" },
      ] as unknown as string,
    },
    contact: { title: "Have a project in mind?", btn: "Get in touch →", email: "hello@kinetic.studio", location: "New York / London / Tokyo" },
    footer: { copy: "© 2025 KINETIC Studio", links: "Twitter, Dribbble, Instagram, LinkedIn" },
    seo: { title: "KINETIC — Creative Studio", description: "Award-winning creative studio crafting brand identities, digital products, and motion experiences." },
  },
};

const presets = {
  section: "theme",
  items: [
    { name: "Kinetic Red", swatch: ["#ff3d00", "#0a0a0a", "#141414"], values: { primary: "#ff3d00", bg: "#0a0a0a", surface: "#141414", text: "#777" } },
    { name: "Electric Blue", swatch: ["#2563eb", "#050510", "#111122"], values: { primary: "#2563eb", bg: "#050510", surface: "#111122", text: "#6b7db3" } },
    { name: "Acid Green", swatch: ["#84cc16", "#080a04", "#121408"], values: { primary: "#84cc16", bg: "#080a04", surface: "#121408", text: "#6b8a4e" } },
    { name: "White Studio", swatch: ["#000000", "#fafafa", "#f0f0f0"], values: { primary: "#000000", bg: "#fafafa", surface: "#f0f0f0", text: "#666" } },
    { name: "Gold Luxe", swatch: ["#d4a017", "#0a0908", "#14120e"], values: { primary: "#d4a017", bg: "#0a0908", surface: "#14120e", text: "#8a7d5a" } },
  ],
};

function render(content: Content, options?: { preview?: { initialScroll: number; instant: boolean } }) {
  const r = reader(content);
  const s = r.str;
  const P = safeColor(s("theme","primary"),"#ff3d00");
  const BG = safeColor(s("theme","bg"),"#0a0a0a");
  const SF = safeColor(s("theme","surface"),"#141414");
  const TX = safeColor(s("theme","text"),"#777");
  const services = r.list("services","items");
  const projects = r.list("work","items");
  const aboutStats = r.list("about","stats");
  const testimonials = r.list("testimonials","items");
  const footerLinks = csv(s("footer","links"));
  const isDark = BG.toLowerCase() < "#888888";

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
:root{--p:${P};--bg:${BG};--sf:${SF};--tx:${TX};--white:${isDark?"#fff":"#000"}}
html{scroll-behavior:smooth}
body{font-family:'Inter',system-ui,sans-serif;background:var(--bg);color:var(--tx);line-height:1.7;overflow-x:hidden}

/* ─── Noise texture ─── */
body::before{content:'';position:fixed;inset:0;pointer-events:none;z-index:0;opacity:.03;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E");background-size:128px}

/* ─── Nav ─── */
nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:1.5rem 3rem;display:flex;align-items:center;justify-content:space-between;mix-blend-mode:difference}
.n-name{font-size:.85rem;font-weight:800;letter-spacing:.2em;text-transform:uppercase;color:#fff;text-decoration:none}
.n-cta{font-size:.8rem;font-weight:600;color:#fff;text-decoration:none;border:1px solid rgba(255,255,255,.25);padding:.5rem 1.5rem;border-radius:100px;transition:background .3s,color .3s}
.n-cta:hover{background:#fff;color:#000}

/* ─── Hero ─── */
.hero{min-height:100vh;display:flex;flex-direction:column;justify-content:center;padding:8rem 3rem 4rem;position:relative;z-index:1}
.hero-lines{overflow:hidden}
.hero-line{overflow:hidden}
.hero-line span{display:block;animation:slideUp .8s cubic-bezier(.16,1,.3,1) both}
.hero-line:nth-child(2) span{animation-delay:.1s}
.hero-line:nth-child(3) span{animation-delay:.2s}
@keyframes slideUp{from{transform:translateY(110%)}to{transform:none}}
.h-l1{font-size:clamp(3rem,8vw,7rem);font-weight:900;color:var(--white);line-height:1;letter-spacing:-.04em;text-transform:uppercase}
.h-l2{font-size:clamp(3rem,8vw,7rem);font-weight:900;line-height:1;letter-spacing:-.04em;text-transform:uppercase;-webkit-text-stroke:2px var(--white);color:transparent}
.h-l3{font-size:clamp(3rem,8vw,7rem);font-weight:900;color:var(--p);line-height:1;letter-spacing:-.04em;text-transform:uppercase}
.hero-sub{max-width:500px;font-size:1rem;margin-top:2rem;animation:fadeIn .8s .4s both}
.hero-bottom{display:flex;justify-content:space-between;align-items:end;margin-top:auto;padding-top:3rem;animation:fadeIn .8s .5s both}
.hero-btn{display:inline-flex;align-items:center;gap:.5rem;padding:1rem 2.5rem;background:var(--p);color:${isDark?"#fff":"#000"};font-weight:700;font-size:.95rem;text-decoration:none;border-radius:100px;border:none;cursor:pointer;transition:transform .3s,box-shadow .3s}
.hero-btn:hover{transform:scale(1.05);box-shadow:0 10px 40px color-mix(in srgb,var(--p) 35%,transparent)}
.hero-scroll{font-size:.75rem;letter-spacing:.15em;text-transform:uppercase;color:var(--tx)}

/* ─── Marquee ─── */
.marquee{overflow:hidden;border-top:1px solid rgba(128,128,128,.15);border-bottom:1px solid rgba(128,128,128,.15);padding:1.5rem 0;position:relative;z-index:1}
.marquee-inner{display:flex;gap:3rem;animation:marquee 20s linear infinite;white-space:nowrap;width:max-content}
.marquee-inner span{font-size:clamp(1.2rem,3vw,2rem);font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:var(--white);opacity:.15}
.marquee-inner span::after{content:'✦';margin-left:3rem;color:var(--p);opacity:.5}
@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}

/* ─── Sections ─── */
.sec{position:relative;z-index:1;max-width:1200px;margin:0 auto;padding:7rem 3rem}
.sec-tag{font-size:.7rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--p);margin-bottom:1.5rem;display:block}
.sec-h2{font-size:clamp(2rem,4vw,3.5rem);font-weight:800;color:var(--white);line-height:1.1;letter-spacing:-.03em}

/* ─── Services ─── */
.svc-list{margin-top:3rem;border-top:1px solid rgba(128,128,128,.15)}
.svc{display:grid;grid-template-columns:80px 1fr 1fr;gap:2rem;align-items:start;padding:2.5rem 0;border-bottom:1px solid rgba(128,128,128,.15);transition:background .4s;cursor:default}
.svc:hover{background:var(--sf);margin:0 -3rem;padding-left:3rem;padding-right:3rem}
.svc-num{font-size:.8rem;font-weight:700;color:var(--p);font-variant-numeric:tabular-nums}
.svc h3{font-size:1.3rem;font-weight:700;color:var(--white)}
.svc p{font-size:.9rem;line-height:1.8}

/* ─── Work grid ─── */
.work-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1.5rem;margin-top:3rem}
.work-item{position:relative;aspect-ratio:4/3;border-radius:16px;overflow:hidden;background:var(--sf);cursor:pointer;group:work}
.work-img{width:100%;height:100%;object-fit:cover;transition:transform .7s cubic-bezier(.2,.7,.2,1);opacity:.7}
.work-item:hover .work-img{transform:scale(1.05);opacity:1}
.work-overlay{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:end;padding:2rem;background:linear-gradient(to top,rgba(0,0,0,.7),transparent 60%)}
.work-overlay h3{font-size:1.3rem;font-weight:700;color:#fff}
.work-meta{display:flex;gap:1rem;font-size:.8rem;color:rgba(255,255,255,.6);margin-top:.3rem}
.work-placeholder{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:3rem;color:var(--p);opacity:.2}

/* ─── About ─── */
.about-text{font-size:clamp(1.2rem,2.5vw,1.8rem);font-weight:400;color:var(--white);line-height:1.6;max-width:800px;margin-top:2rem}
.about-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:2rem;margin-top:4rem;padding-top:3rem;border-top:1px solid rgba(128,128,128,.15)}
.about-stat-val{font-size:2.5rem;font-weight:900;color:var(--white)}
.about-stat-label{font-size:.8rem;margin-top:.3rem}

/* ─── Testimonials ─── */
.testi-list{margin-top:3rem}
.testi{padding:3rem 0;border-bottom:1px solid rgba(128,128,128,.1)}
.testi q{display:block;font-size:clamp(1.1rem,2vw,1.5rem);font-style:italic;color:var(--white);line-height:1.7;max-width:800px}
.testi-meta{margin-top:1.2rem;display:flex;gap:.5rem;align-items:baseline}
.testi-name{font-weight:700;color:var(--white);font-size:.9rem}
.testi-role{font-size:.8rem}

/* ─── Contact ─── */
.contact-sec{text-align:center}
.contact-h{font-size:clamp(2.5rem,5vw,4.5rem);font-weight:900;color:var(--white);line-height:1.1;letter-spacing:-.03em;margin-bottom:2rem}
.contact-info{display:flex;gap:3rem;justify-content:center;flex-wrap:wrap;margin-top:2rem;font-size:.9rem}

/* ─── Footer ─── */
footer{position:relative;z-index:1;display:flex;justify-content:space-between;align-items:center;padding:2rem 3rem;border-top:1px solid rgba(128,128,128,.1);font-size:.8rem;flex-wrap:wrap;gap:1rem}
.ft-social{display:flex;gap:1.5rem}
.ft-social a{color:var(--tx);text-decoration:none;font-weight:500;transition:color .3s}
.ft-social a:hover{color:var(--p)}

@keyframes fadeIn{from{opacity:0}to{opacity:1}}
${revealCss}

@media(max-width:768px){
nav{padding:1rem 1.5rem}
.hero{padding:6rem 1.5rem 3rem}
.sec{padding:5rem 1.5rem}
.svc{grid-template-columns:50px 1fr;gap:1rem}
.svc p{grid-column:2}
.work-grid{grid-template-columns:1fr}
footer{flex-direction:column;text-align:center;padding:2rem 1.5rem}
}
</style>
</head>
<body>

<nav>
<a href="#top" class="n-name">${esc(s("brand","name"))}</a>
<a href="${safeUrl(s("brand","ctaUrl"))}" class="n-cta">${esc(s("brand","cta"))}</a>
</nav>

<section class="hero" id="top">
<div class="hero-lines">
<div class="hero-line"><span class="h-l1">${esc(s("hero","line1"))}</span></div>
<div class="hero-line"><span class="h-l2">${esc(s("hero","line2"))}</span></div>
<div class="hero-line"><span class="h-l3">${esc(s("hero","line3"))}</span></div>
</div>
<p class="hero-sub">${esc(s("hero","subtitle"))}</p>
<div class="hero-bottom">
<a href="${safeUrl(s("brand","ctaUrl"))}" class="hero-btn">${esc(s("hero","btn"))}</a>
${s("hero","scroll")?`<span class="hero-scroll">${esc(s("hero","scroll"))}</span>`:""}
</div>
</section>

${r.on("reel")?`<div class="marquee" id="reel">
<div class="marquee-inner">${Array(8).fill(`<span>${esc(s("reel","text"))}</span>`).join("")}</div>
</div>`:""}

${r.on("services")&&services.length?`
<div class="sec" id="services">
<span class="sec-tag rv">${esc(s("services","eyebrow"))}</span>
<h2 class="sec-h2 rv">${esc(s("services","title"))}</h2>
<div class="svc-list">${services.map((sv,i)=>`<div class="svc rv${i?` d${Math.min(i,3)}`:""}" >
<div class="svc-num">${esc(sv.num)}</div>
<h3>${esc(sv.title)}</h3>
<p>${esc(sv.desc)}</p>
</div>`).join("")}</div>
</div>`:""}

${r.on("work")&&projects.length?`
<div class="sec" id="work">
<span class="sec-tag rv">${esc(s("work","eyebrow"))}</span>
<h2 class="sec-h2 rv">${esc(s("work","title"))}</h2>
<div class="work-grid">${projects.map((p,i)=>`<div class="work-item rv${i?` d${Math.min(i,3)}`:""}" >
${safeUrl(p.image)!=="#"?`<img class="work-img" src="${safeUrl(p.image)}" alt="${esc(p.title)}" loading="lazy">`:`<div class="work-placeholder">✦</div>`}
<div class="work-overlay"><h3>${esc(p.title)}</h3><div class="work-meta"><span>${esc(p.category)}</span><span>${esc(p.year)}</span></div></div>
</div>`).join("")}</div>
</div>`:""}

${r.on("about")?`
<div class="sec" id="about">
<span class="sec-tag rv">${esc(s("about","eyebrow"))}</span>
<p class="about-text rv">${esc(s("about","text"))}</p>
${aboutStats.length?`<div class="about-stats">${aboutStats.map((st,i)=>`<div class="rv${i?` d${Math.min(i,3)}`:""}" ><div class="about-stat-val">${esc(st.value)}</div><div class="about-stat-label">${esc(st.label)}</div></div>`).join("")}</div>`:""}
</div>`:""}

${r.on("testimonials")&&testimonials.length?`
<div class="sec" id="testimonials">
<div class="testi-list">${testimonials.map((t,i)=>`<div class="testi rv${i?` d${i}`:""}" >
<q>${esc(t.quote)}</q>
<div class="testi-meta"><span class="testi-name">${esc(t.name)}</span><span class="testi-role">— ${esc(t.role)}</span></div>
</div>`).join("")}</div>
</div>`:""}

${r.on("contact")?`
<div class="sec contact-sec" id="contact">
<h2 class="contact-h rv">${esc(s("contact","title"))}</h2>
<a href="${s("contact","email")?`mailto:${esc(s("contact","email"))}`:safeUrl(s("brand","ctaUrl"))}" class="hero-btn rv">${esc(s("contact","btn"))}</a>
<div class="contact-info rv d1">
${s("contact","email")?`<span>${esc(s("contact","email"))}</span>`:""}
${s("contact","location")?`<span>${esc(s("contact","location"))}</span>`:""}
</div>
</div>`:""}

<footer>
<span>${esc(s("footer","copy"))}</span>
${footerLinks.length?`<div class="ft-social">${footerLinks.map(l=>`<a href="#">${esc(l)}</a>`).join("")}</div>`:""}
</footer>

${revealScript}
</body>
</html>`;
}

export const motionKineticAgency: EditableTemplate = {
  id: "motion-kinetic-agency",
  name: "KINETIC — Creative Agency",
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
