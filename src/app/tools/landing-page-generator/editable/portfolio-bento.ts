import type { Content, EditableTemplate, Section } from "../editor/types";
import {
  esc,
  emph,
  previewScript,
  reader,
  revealCss,
  revealScript,
  safeColor,
  safeUrl,
} from "../editor/html";

const U = (id: string, size: string) =>
  `https://images.unsplash.com/${id}?${size}&fit=crop&auto=format&q=80`;

const schema: Section[] = [
  {
    id: "brand",
    label: "Brand",
    description: "Your name, tagline, and location.",
    fields: [
      { type: "text", key: "name", label: "Name" },
      { type: "text", key: "tagline", label: "Tagline" },
    ],
  },
  {
    id: "theme",
    label: "Colors",
    fields: [
      { type: "color", key: "primary", label: "Primary" },
      { type: "color", key: "accent", label: "Accent" },
      { type: "color", key: "dark", label: "Background" },
      { type: "color", key: "darkAlt", label: "Card background" },
      { type: "color", key: "text", label: "Text color" },
    ],
  },
  {
    id: "about",
    label: "About card",
    anchor: "about",
    toggleable: true,
    fields: [
      { type: "image", key: "photo", label: "Profile photo" },
      { type: "text", key: "greeting", label: "Greeting", hint: "e.g. Hey, I'm Sarah" },
      { type: "textarea", key: "bio", label: "Short bio", rows: 2 },
      { type: "text", key: "status", label: "Status badge", hint: "e.g. Available for freelance" },
    ],
  },
  {
    id: "stats",
    label: "Stats",
    anchor: "stats",
    toggleable: true,
    fields: [
      {
        type: "list",
        key: "items",
        label: "Stats",
        itemLabel: "Stat",
        titleKey: "label",
        min: 2,
        max: 6,
        fields: [
          { type: "text", key: "value", label: "Value" },
          { type: "text", key: "label", label: "Label" },
        ],
        newItem: { value: "10+", label: "Metric" },
      },
    ],
  },
  {
    id: "skills",
    label: "Skills",
    anchor: "skills",
    toggleable: true,
    fields: [
      {
        type: "list",
        key: "items",
        label: "Skills",
        itemLabel: "Skill",
        titleKey: "name",
        min: 1,
        max: 8,
        fields: [
          { type: "text", key: "name", label: "Skill name" },
          { type: "text", key: "percent", label: "Percentage (0–100)" },
        ],
        newItem: { name: "New Skill", percent: "75" },
      },
    ],
  },
  {
    id: "projects",
    label: "Projects",
    anchor: "projects",
    toggleable: true,
    fields: [
      {
        type: "list",
        key: "items",
        label: "Projects",
        itemLabel: "Project",
        titleKey: "title",
        min: 1,
        max: 6,
        fields: [
          { type: "text", key: "title", label: "Title" },
          { type: "text", key: "category", label: "Category" },
          { type: "image", key: "image", label: "Image" },
          {
            type: "select",
            key: "size",
            label: "Card size",
            options: [
              { value: "normal", label: "Normal" },
              { value: "wide", label: "Wide (2 columns)" },
              { value: "tall", label: "Tall (2 rows)" },
            ],
          },
        ],
        newItem: { title: "New Project", category: "Design", image: "", size: "normal" },
      },
    ],
  },
  {
    id: "social",
    label: "Social links",
    anchor: "social",
    toggleable: true,
    fields: [
      { type: "text", key: "heading", label: "Heading" },
      {
        type: "list",
        key: "links",
        label: "Social links",
        itemLabel: "Link",
        titleKey: "label",
        min: 1,
        max: 6,
        fields: [
          { type: "text", key: "emoji", label: "Emoji icon" },
          { type: "text", key: "label", label: "Label (screen readers)" },
          { type: "url", key: "url", label: "URL" },
        ],
        newItem: { emoji: "🔗", label: "Link", url: "#" },
      },
    ],
  },
  {
    id: "contact",
    label: "Contact form",
    anchor: "contact",
    toggleable: true,
    fields: [
      { type: "text", key: "heading", label: "Heading" },
      { type: "text", key: "buttonText", label: "Button text" },
    ],
  },
  {
    id: "footer",
    label: "Footer",
    fields: [
      { type: "text", key: "text", label: "Footer text" },
    ],
  },
];

const defaults: Content = {
  enabled: { about: true, stats: true, skills: true, projects: true, social: true, contact: true },
  values: {
    brand: { name: "Sarah Park", tagline: "Product Designer · San Francisco" },
    theme: { primary: "#6366f1", accent: "#a78bfa", dark: "#0a0a1a", darkAlt: "#12122a", text: "#94a3b8" },
    about: {
      photo: U("photo-1573496359142-b8d87734a5a2", "w=200&h=200"),
      greeting: "Hey, I'm Sarah 👋",
      bio: "Product designer crafting intuitive digital experiences for startups and scale-ups.",
      status: "Available for freelance",
    },
    stats: {
      items: [
        { value: "8+", label: "Years Exp." },
        { value: "50+", label: "Projects" },
        { value: "12", label: "Awards" },
        { value: "4.9", label: "Avg Rating" },
      ],
    },
    skills: {
      items: [
        { name: "Figma", percent: "95" },
        { name: "React", percent: "80" },
        { name: "Design Systems", percent: "90" },
        { name: "Prototyping", percent: "88" },
        { name: "User Research", percent: "85" },
      ],
    },
    projects: {
      items: [
        { title: "FinTech Dashboard", category: "UI/UX Design", image: U("photo-1551288049-bebda4e38f71", "w=400&h=600"), size: "tall" },
        { title: "E-Commerce Redesign", category: "Product Design", image: U("photo-1460925895917-afdab827c52f", "w=600&h=300"), size: "wide" },
        { title: "Startup Branding", category: "Brand Identity", image: U("photo-1553877522-43269d4ea984", "w=400&h=300"), size: "normal" },
      ],
    },
    social: {
      heading: "Let's Connect",
      links: [
        { emoji: "🐦", label: "Twitter", url: "#" },
        { emoji: "💼", label: "LinkedIn", url: "#" },
        { emoji: "📸", label: "Instagram", url: "#" },
        { emoji: "🔗", label: "Website", url: "#" },
      ],
    },
    contact: { heading: "Send a Message", buttonText: "Send →" },
    footer: { text: "© 2026 Sarah Park. Crafted with care." },
  },
};

function render(content: Content, options?: { preview?: { initialScroll: number; instant: boolean } }): string {
  const r = reader(content);
  const pri = safeColor(r.str("theme", "primary"), "#6366f1");
  const acc = safeColor(r.str("theme", "accent"), "#a78bfa");
  const dark = safeColor(r.str("theme", "dark"), "#0a0a1a");
  const darkAlt = safeColor(r.str("theme", "darkAlt"), "#12122a");
  const text = safeColor(r.str("theme", "text"), "#94a3b8");

  const statsItems = r.list("stats", "items");
  const skillItems = r.list("skills", "items");
  const projectItems = r.list("projects", "items");
  const socialLinks = r.list("social", "links");

  const sizeClass = (s: string) => (s === "wide" ? " wide" : s === "tall" ? " tall" : "");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${esc(r.str("brand", "name"))}</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
:root{--pri:${pri};--acc:${acc};--dark:${dark};--da:${darkAlt};--txt:${text}}
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:var(--dark);color:var(--txt);min-height:100vh;display:flex;flex-direction:column}a{text-decoration:none;color:inherit}
.wrap{max-width:1100px;margin:0 auto;padding:3rem 2rem;flex:1}h1{font-size:1.5rem;font-weight:800;color:#fff;margin-bottom:.25rem}
.sub{font-size:.9rem;opacity:.5;margin-bottom:2rem}.bento{display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:180px;gap:1rem}
.card{background:var(--da);border:1px solid rgba(255,255,255,.06);border-radius:20px;padding:1.5rem;overflow:hidden;transition:all .3s;position:relative}
.card:hover{border-color:${pri}30;transform:translateY(-3px)}.card.wide{grid-column:span 2}.card.tall{grid-row:span 2}.card.big{grid-column:span 2;grid-row:span 2}
.card.about{display:flex;gap:1.25rem;align-items:center}.card.about img{width:80px;height:80px;border-radius:50%;object-fit:cover;border:3px solid ${pri}30;flex-shrink:0}
.card.about h2{font-size:1.1rem;font-weight:700;color:#fff;margin-bottom:.25rem}.card.about p{font-size:.8rem;opacity:.5;line-height:1.6}
.card.about .status{display:inline-flex;align-items:center;gap:.4rem;background:${pri}15;color:var(--pri);padding:.2rem .6rem;border-radius:50px;font-size:.65rem;font-weight:600;margin-top:.5rem}
.card.about .status span{width:6px;height:6px;border-radius:50%;background:var(--pri)}.card.project{padding:0;overflow:hidden}
.card.project img{width:100%;height:100%;object-fit:cover;transition:transform .5s}.card.project:hover img{transform:scale(1.08)}
.card.project .proj-info{position:absolute;bottom:0;left:0;right:0;padding:1.25rem;background:linear-gradient(to top,${dark}ee,transparent)}
.card.project .proj-info h3{color:#fff;font-size:.95rem;font-weight:700}.card.project .proj-info span{font-size:.75rem;color:var(--pri)}
.card.skills h3{font-size:.85rem;font-weight:700;color:#fff;margin-bottom:1rem}
.skill-bar{margin-bottom:.75rem}.skill-bar .label{display:flex;justify-content:space-between;font-size:.7rem;margin-bottom:.35rem}.skill-bar .label span:first-child{color:#fff;font-weight:600}.skill-bar .label span:last-child{opacity:.4}
.skill-bar .track{height:6px;background:rgba(255,255,255,.06);border-radius:3px;overflow:hidden}.skill-bar .fill{height:100%;background:linear-gradient(90deg,var(--pri),var(--acc));border-radius:3px}
.card.stats{display:grid;grid-template-columns:1fr 1fr;gap:1rem;align-content:center}
.stat{text-align:center}.stat .n{font-size:1.8rem;font-weight:800;color:#fff}.stat .l{font-size:.7rem;opacity:.4}
.card.social{display:flex;flex-direction:column;justify-content:center;align-items:center;gap:1rem;background:linear-gradient(135deg,${pri}15,${acc}10);border-color:${pri}20}
.card.social h3{color:#fff;font-size:.9rem;font-weight:700}.social-links{display:flex;gap:.75rem}
.social-links a{width:40px;height:40px;border-radius:10px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;transition:.2s;font-size:1rem}
.social-links a:hover{border-color:var(--pri);background:${pri}15}.card.contact h3{font-size:.85rem;font-weight:700;color:#fff;margin-bottom:1rem}
.card.contact input,.card.contact textarea{width:100%;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:8px;padding:.6rem .8rem;color:#fff;font-size:.8rem;outline:none;font-family:inherit;margin-bottom:.5rem}
.card.contact input:focus,.card.contact textarea:focus{border-color:var(--pri)}.card.contact textarea{resize:none;height:50px}
.card.contact button{width:100%;background:var(--pri);color:#fff;border:none;padding:.6rem;border-radius:8px;font-weight:600;font-size:.8rem;cursor:pointer}
footer{padding:2rem;text-align:center;font-size:.8rem;opacity:.3}
${revealCss}
@media(max-width:768px){.bento{grid-template-columns:1fr;grid-auto-rows:auto}.card.wide,.card.tall,.card.big{grid-column:span 1;grid-row:span 1}.card.project{aspect-ratio:16/10}}
</style>
</head>
<body>
${previewScript(options?.preview)}
<div class="wrap">
<h1>${esc(r.str("brand", "name"))}</h1>
<p class="sub">${esc(r.str("brand", "tagline"))}</p>
<div class="bento">
${r.on("about") ? `<div id="about" class="card about wide rv">
  <img src="${safeUrl(r.str("about", "photo"))}" alt="${esc(r.str("brand", "name"))}">
  <div>
    <h2>${esc(r.str("about", "greeting"))}</h2>
    <p>${esc(r.str("about", "bio"))}</p>
    ${r.str("about", "status") ? `<div class="status"><span></span> ${esc(r.str("about", "status"))}</div>` : ""}
  </div>
</div>` : ""}
${r.on("stats") ? `<div id="stats" class="card stats rv d1">
  ${statsItems.map((s) => `<div class="stat"><div class="n">${esc(s.value || "")}</div><div class="l">${esc(s.label || "")}</div></div>`).join("")}
</div>` : ""}
${r.on("social") ? `<div id="social" class="card social rv d2">
  <h3>${esc(r.str("social", "heading"))}</h3>
  <div class="social-links">
    ${socialLinks.map((l) => `<a href="${safeUrl(l.url || "#")}" aria-label="${esc(l.label || "")}">${esc(l.emoji || "🔗")}</a>`).join("")}
  </div>
</div>` : ""}
${r.on("projects") ? projectItems.map((p, i) => {
    const img = safeUrl(p.image || "");
    return `<div id="${i === 0 ? "projects" : ""}" class="card project${sizeClass(p.size || "normal")} rv${i < 3 ? ` d${i + 1}` : ""}">
  <img src="${img}" alt="${esc(p.title || "")}">
  <div class="proj-info"><h3>${esc(p.title || "")}</h3><span>${esc(p.category || "")}</span></div>
</div>`;
  }).join("\n") : ""}
${r.on("skills") ? `<div id="skills" class="card skills tall rv">
  <h3>Skills</h3>
  ${skillItems.map((s) => {
    const pct = Math.max(0, Math.min(100, parseInt(s.percent || "0", 10) || 0));
    return `<div class="skill-bar"><div class="label"><span>${esc(s.name || "")}</span><span>${pct}%</span></div><div class="track"><div class="fill" style="width:${pct}%"></div></div></div>`;
  }).join("")}
</div>` : ""}
${r.on("contact") ? `<div id="contact" class="card contact tall rv">
  <h3>${esc(r.str("contact", "heading"))}</h3>
  <input type="text" placeholder="Name">
  <input type="email" placeholder="Email">
  <textarea placeholder="Your message..."></textarea>
  <button>${esc(r.str("contact", "buttonText"))}</button>
</div>` : ""}
</div>
</div>
<footer><p>${esc(r.str("footer", "text"))}</p></footer>
${revealScript}
</body></html>`;
}

export const portfolioBento: EditableTemplate = {
  id: "portfolio-bento",
  name: "Portfolio — Bento Grid",
  schema,
  defaults,
  presets: {
    section: "theme",
    items: [
      { name: "Indigo", swatch: ["#6366f1", "#a78bfa", "#0a0a1a"], values: { primary: "#6366f1", accent: "#a78bfa", dark: "#0a0a1a", darkAlt: "#12122a", text: "#94a3b8" } },
      { name: "Emerald", swatch: ["#10b981", "#34d399", "#0a1a14"], values: { primary: "#10b981", accent: "#34d399", dark: "#0a1a14", darkAlt: "#0e2a1e", text: "#6ee7b7" } },
      { name: "Rose", swatch: ["#f43f5e", "#fb7185", "#1a0a10"], values: { primary: "#f43f5e", accent: "#fb7185", dark: "#1a0a10", darkAlt: "#2a0e1a", text: "#fda4af" } },
      { name: "Amber", swatch: ["#f59e0b", "#fbbf24", "#1a1408"], values: { primary: "#f59e0b", accent: "#fbbf24", dark: "#1a1408", darkAlt: "#2a220e", text: "#fcd34d" } },
      { name: "Cyan", swatch: ["#06b6d4", "#22d3ee", "#081a1a"], values: { primary: "#06b6d4", accent: "#22d3ee", dark: "#081a1a", darkAlt: "#0e2a2a", text: "#67e8f9" } },
      { name: "Purple", swatch: ["#8b5cf6", "#c4b5fd", "#0e0a1a"], values: { primary: "#8b5cf6", accent: "#c4b5fd", dark: "#0e0a1a", darkAlt: "#1a122a", text: "#c4b5fd" } },
    ],
  },
  render,
  checks(content) {
    const warns: { section: string; message: string }[] = [];
    const r = reader(content);
    if (!r.str("brand", "name")) warns.push({ section: "brand", message: "Name is empty." });
    if (r.on("skills") && r.list("skills", "items").length === 0) warns.push({ section: "skills", message: "No skills added." });
    if (r.on("projects") && r.list("projects", "items").length === 0) warns.push({ section: "projects", message: "No projects added." });
    return warns;
  },
};
