import type { Content, EditableTemplate, Item, Section } from "../editor/types";
import { csv, esc, previewScript, reader, revealCss, revealScript, safeColor, safeUrl } from "../editor/html";

const schema: Section[] = [
  {
    id: "brand",
    label: "Brand",
    fields: [
      { type: "text", key: "name", label: "Gym name" },
      { type: "text", key: "cta", label: "Nav CTA" },
      { type: "text", key: "ctaUrl", label: "CTA link", placeholder: "#membership" },
    ],
  },
  {
    id: "theme",
    label: "Colors",
    fields: [
      { type: "color", key: "primary", label: "Primary" },
      { type: "color", key: "accent", label: "Accent" },
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
      { type: "text", key: "badge", label: "Badge text" },
      { type: "textarea", key: "title", label: "Headline", rows: 2, hint: "*word* for accent text." },
      { type: "textarea", key: "subtitle", label: "Subtitle", rows: 2 },
      { type: "text", key: "btn1", label: "Primary button" },
      { type: "text", key: "btn2", label: "Secondary button" },
    ],
  },
  {
    id: "programs",
    label: "Programs",
    toggleable: true,
    anchor: "programs",
    fields: [
      { type: "text", key: "eyebrow", label: "Tag" },
      { type: "text", key: "title", label: "Heading" },
      {
        type: "list",
        key: "items",
        label: "Programs",
        itemLabel: "Program",
        titleKey: "name",
        min: 1,
        max: 6,
        newItem: { icon: "💪", name: "Program", desc: "Description of this program.", duration: "45 min" },
        fields: [
          { type: "text", key: "icon", label: "Icon emoji" },
          { type: "text", key: "name", label: "Name" },
          { type: "textarea", key: "desc", label: "Description", rows: 2 },
          { type: "text", key: "duration", label: "Duration" },
        ],
      },
    ],
  },
  {
    id: "trainers",
    label: "Trainers",
    toggleable: true,
    anchor: "trainers",
    fields: [
      { type: "text", key: "eyebrow", label: "Tag" },
      { type: "text", key: "title", label: "Heading" },
      {
        type: "list",
        key: "items",
        label: "Trainers",
        itemLabel: "Trainer",
        titleKey: "name",
        min: 1,
        max: 6,
        newItem: { name: "Trainer", role: "Head Coach", speciality: "Strength & Conditioning", image: "" },
        fields: [
          { type: "text", key: "name", label: "Name" },
          { type: "text", key: "role", label: "Role" },
          { type: "text", key: "speciality", label: "Speciality" },
          { type: "image", key: "image", label: "Photo" },
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
        label: "Counters",
        itemLabel: "Stat",
        titleKey: "label",
        min: 1,
        max: 4,
        newItem: { value: "0", suffix: "+", label: "Stat" },
        fields: [
          { type: "text", key: "value", label: "Number" },
          { type: "text", key: "suffix", label: "Suffix" },
          { type: "text", key: "label", label: "Label" },
        ],
      },
    ],
  },
  {
    id: "schedule",
    label: "Class schedule",
    toggleable: true,
    anchor: "schedule",
    fields: [
      { type: "text", key: "eyebrow", label: "Tag" },
      { type: "text", key: "title", label: "Heading" },
      {
        type: "list",
        key: "items",
        label: "Classes",
        itemLabel: "Class",
        titleKey: "name",
        min: 1,
        max: 8,
        newItem: { time: "06:00 AM", name: "Class", trainer: "Coach", level: "All Levels" },
        fields: [
          { type: "text", key: "time", label: "Time" },
          { type: "text", key: "name", label: "Class name" },
          { type: "text", key: "trainer", label: "Trainer" },
          { type: "text", key: "level", label: "Level" },
        ],
      },
    ],
  },
  {
    id: "membership",
    label: "Membership",
    toggleable: true,
    anchor: "membership",
    fields: [
      { type: "text", key: "eyebrow", label: "Tag" },
      { type: "text", key: "title", label: "Heading" },
      {
        type: "list",
        key: "items",
        label: "Plans",
        itemLabel: "Plan",
        titleKey: "name",
        min: 1,
        max: 3,
        newItem: { name: "Plan", price: "$0", period: "/mo", feats: "Feature 1, Feature 2", btn: "Join Now", featured: "" },
        fields: [
          { type: "text", key: "name", label: "Name" },
          { type: "text", key: "price", label: "Price" },
          { type: "text", key: "period", label: "Period" },
          { type: "textarea", key: "feats", label: "Features (comma-separated)", rows: 3 },
          { type: "text", key: "btn", label: "Button text" },
          { type: "text", key: "featured", label: "Featured label", hint: "Leave blank if not featured." },
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
      { type: "textarea", key: "desc", label: "Body", rows: 2 },
      { type: "text", key: "btn", label: "Button" },
    ],
  },
  {
    id: "footer",
    label: "Footer",
    fields: [
      { type: "text", key: "copy", label: "Copyright" },
      { type: "text", key: "links", label: "Links (comma-separated)" },
    ],
  },
  {
    id: "seo",
    label: "Page settings (SEO)",
    fields: [
      { type: "text", key: "title", label: "Page title" },
      { type: "textarea", key: "description", label: "Meta description", rows: 2 },
    ],
  },
];

const defaults: Content = {
  enabled: { programs: true, trainers: true, stats: true, schedule: true, membership: true, cta: true },
  values: {
    brand: { name: "TITAN", cta: "Start Free Trial →", ctaUrl: "#membership" },
    theme: { primary: "#ff3d00", accent: "#ffab00", bg: "#0a0a0a", surface: "#161616", text: "#888" },
    hero: {
      badge: "🔥 #1 RATED GYM IN THE CITY",
      title: "FORGE YOUR\n*STRONGEST* SELF",
      subtitle: "World-class equipment, elite coaches, and a community that pushes you beyond limits. No excuses — just results.",
      btn1: "Start Free Trial",
      btn2: "View Programs",
    },
    programs: {
      eyebrow: "Programs",
      title: "Train Your Way",
      items: [
        { icon: "🏋️", name: "Strength Training", desc: "Build raw power with progressive overload programs designed by certified strength coaches.", duration: "60 min" },
        { icon: "⚡", name: "HIIT Circuits", desc: "Torch calories and boost endurance with high-intensity interval training that keeps your heart rate soaring.", duration: "45 min" },
        { icon: "🥊", name: "Combat Fitness", desc: "Boxing, kickboxing, and MMA-inspired workouts that build functional strength and unshakeable confidence.", duration: "50 min" },
        { icon: "🧘", name: "Mobility & Recovery", desc: "Yoga-inspired sessions focused on flexibility, injury prevention, and active recovery.", duration: "40 min" },
      ] as unknown as string,
    },
    trainers: {
      eyebrow: "Coaches",
      title: "Elite Coaching Team",
      items: [
        { name: "Marcus Cole", role: "Head Strength Coach", speciality: "Powerlifting & Olympic Lifts", image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&h=500&fit=crop" },
        { name: "Sarah Okafor", role: "HIIT Specialist", speciality: "Metabolic Conditioning", image: "https://images.unsplash.com/photo-1609899464926-209ebeb25e87?w=400&h=500&fit=crop" },
        { name: "Jake Martinez", role: "Combat Coach", speciality: "Boxing & MMA", image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=500&fit=crop" },
      ] as unknown as string,
    },
    stats: {
      items: [
        { value: "5000", suffix: "+", label: "Active Members" },
        { value: "120", suffix: "+", label: "Classes / Week" },
        { value: "35", suffix: "", label: "Expert Trainers" },
        { value: "98", suffix: "%", label: "Member Retention" },
      ] as unknown as string,
    },
    schedule: {
      eyebrow: "Schedule",
      title: "Today's Classes",
      items: [
        { time: "06:00 AM", name: "Power Lift", trainer: "Marcus C.", level: "Advanced" },
        { time: "07:30 AM", name: "HIIT Blast", trainer: "Sarah O.", level: "All Levels" },
        { time: "09:00 AM", name: "Boxing Fundamentals", trainer: "Jake M.", level: "Beginner" },
        { time: "12:00 PM", name: "Express Circuit", trainer: "Sarah O.", level: "Intermediate" },
        { time: "05:30 PM", name: "Strength & Conditioning", trainer: "Marcus C.", level: "Intermediate" },
        { time: "07:00 PM", name: "Yoga Flow", trainer: "Guest", level: "All Levels" },
      ] as unknown as string,
    },
    membership: {
      eyebrow: "Membership",
      title: "Choose Your Plan",
      items: [
        { name: "Starter", price: "$29", period: "/mo", feats: "Gym floor access, Locker room, Basic equipment, 2 group classes/week", btn: "Get Started", featured: "" },
        { name: "Pro", price: "$59", period: "/mo", feats: "Unlimited gym access, All group classes, 1 PT session/month, Sauna & recovery, Nutrition plan", btn: "Go Pro →", featured: "MOST POPULAR" },
        { name: "Elite", price: "$99", period: "/mo", feats: "Everything in Pro, Unlimited PT sessions, Private locker, Guest passes, Priority booking, Body composition tracking", btn: "Go Elite", featured: "" },
      ] as unknown as string,
    },
    cta: { title: "YOUR TRANSFORMATION STARTS TODAY", desc: "First week free. No contracts. No excuses. Walk in, work out, walk out stronger.", btn: "Claim Free Trial →" },
    footer: { copy: "© 2025 TITAN Performance Gym", links: "Instagram, YouTube, TikTok, Careers" },
    seo: { title: "TITAN — Performance Gym", description: "World-class gym with elite coaches, cutting-edge equipment, and a community that drives results." },
  },
};

const presets = {
  section: "theme",
  items: [
    { name: "Inferno", swatch: ["#ff3d00", "#ffab00", "#0a0a0a"], values: { primary: "#ff3d00", accent: "#ffab00", bg: "#0a0a0a", surface: "#161616", text: "#888" } },
    { name: "Electric Blue", swatch: ["#2979ff", "#00e5ff", "#060a14"], values: { primary: "#2979ff", accent: "#00e5ff", bg: "#060a14", surface: "#0e1628", text: "#6a80aa" } },
    { name: "Toxic Green", swatch: ["#76ff03", "#ffea00", "#080a04"], values: { primary: "#76ff03", accent: "#ffea00", bg: "#080a04", surface: "#121808", text: "#6a8a4a" } },
    { name: "Purple Power", swatch: ["#aa00ff", "#e040fb", "#0a060e"], values: { primary: "#aa00ff", accent: "#e040fb", bg: "#0a060e", surface: "#16101e", text: "#8a6aaa" } },
  ],
};

function render(content: Content, options?: { preview?: { initialScroll: number; instant: boolean } }) {
  const r = reader(content);
  const s = r.str;
  const P = safeColor(s("theme","primary"),"#ff3d00");
  const A = safeColor(s("theme","accent"),"#ffab00");
  const BG = safeColor(s("theme","bg"),"#0a0a0a");
  const SF = safeColor(s("theme","surface"),"#161616");
  const TX = safeColor(s("theme","text"),"#888");
  const programs = r.list("programs","items");
  const trainers = r.list("trainers","items");
  const stats = r.list("stats","items");
  const classes = r.list("schedule","items");
  const plans = r.list("membership","items");
  const footerLinks = csv(s("footer","links"));

  const titleHtml = esc(s("hero","title")).replace(/\*(.*?)\*/g,`<em>$1</em>`);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(s("seo","title"))}</title>
<meta name="description" content="${esc(s("seo","description"))}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
${previewScript(options?.preview)}
<style>
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{--p:${P};--a:${A};--bg:${BG};--sf:${SF};--tx:${TX}}
html{scroll-behavior:smooth}
body{font-family:'Inter',system-ui,sans-serif;background:var(--bg);color:var(--tx);line-height:1.7;overflow-x:hidden}

body::before{content:'';position:fixed;inset:0;pointer-events:none;z-index:0;opacity:.015;background:repeating-linear-gradient(45deg,var(--p) 0,var(--p) 1px,transparent 1px,transparent 20px)}

nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:1.2rem 3rem;display:flex;align-items:center;justify-content:space-between;backdrop-filter:blur(16px);background:${BG}cc;border-bottom:1px solid rgba(255,255,255,.06)}
.n-name{font-size:1rem;font-weight:900;letter-spacing:.25em;text-transform:uppercase;color:#fff;text-decoration:none}
.n-name span{color:var(--p)}
.n-cta{font-size:.82rem;font-weight:700;background:var(--p);color:#fff;padding:.55rem 1.5rem;border-radius:8px;text-decoration:none;transition:box-shadow .3s,transform .3s;border:none;cursor:pointer}
.n-cta:hover{box-shadow:0 8px 30px color-mix(in srgb,var(--p) 40%,transparent);transform:translateY(-2px)}

.hero{min-height:100vh;display:flex;flex-direction:column;justify-content:center;padding:8rem 3rem 4rem;position:relative;z-index:1;overflow:hidden}
.hero::after{content:'';position:absolute;top:-50%;right:-20%;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,var(--p),transparent 70%);opacity:.08;filter:blur(80px);pointer-events:none}
.hero-badge{display:inline-flex;align-items:center;gap:.5rem;background:${P}15;border:1px solid ${P}30;padding:.45rem 1.2rem;border-radius:6px;font-size:.75rem;font-weight:700;color:var(--p);margin-bottom:2rem;letter-spacing:.5px;text-transform:uppercase;animation:fadeSlide .6s both}
.hero h1{font-size:clamp(3rem,8vw,6.5rem);font-weight:900;color:#fff;line-height:1;letter-spacing:-.04em;text-transform:uppercase;animation:fadeSlide .6s .1s both}
.hero h1 em{font-style:normal;color:var(--p)}
.hero-sub{max-width:550px;font-size:1.05rem;margin-top:1.5rem;animation:fadeSlide .6s .2s both}
.hero-btns{display:flex;gap:1rem;margin-top:2.5rem;flex-wrap:wrap;animation:fadeSlide .6s .3s both}
.btn-p{display:inline-flex;align-items:center;gap:.5rem;padding:1rem 2.5rem;background:var(--p);color:#fff;font-weight:700;font-size:.95rem;text-decoration:none;border-radius:10px;border:none;cursor:pointer;transition:transform .3s,box-shadow .3s}
.btn-p:hover{transform:translateY(-3px);box-shadow:0 15px 40px color-mix(in srgb,var(--p) 35%,transparent)}
.btn-s{display:inline-flex;align-items:center;gap:.5rem;padding:1rem 2.5rem;background:transparent;color:#fff;font-weight:600;font-size:.95rem;text-decoration:none;border-radius:10px;border:1px solid rgba(255,255,255,.15);cursor:pointer;transition:border-color .3s,color .3s}
.btn-s:hover{border-color:var(--p);color:var(--p)}
@keyframes fadeSlide{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}

.sec{position:relative;z-index:1;max-width:1200px;margin:0 auto;padding:7rem 3rem}
.sec-tag{font-size:.7rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--p);margin-bottom:1.2rem;display:block}
.sec-h2{font-size:clamp(2rem,4vw,3rem);font-weight:800;color:#fff;line-height:1.15;letter-spacing:-.02em;text-transform:uppercase}

.prog-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1.5rem;margin-top:3rem}
.prog{background:var(--sf);border:1px solid rgba(255,255,255,.06);border-radius:16px;padding:2rem;transition:all .4s;position:relative;overflow:hidden}
.prog::before{content:'';position:absolute;bottom:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--p),var(--a));transform:scaleX(0);transition:transform .4s;transform-origin:left}
.prog:hover::before{transform:scaleX(1)}
.prog:hover{border-color:${P}30;transform:translateY(-4px)}
.prog-icon{font-size:1.8rem;margin-bottom:1rem}
.prog h3{font-size:1.1rem;font-weight:700;color:#fff;margin-bottom:.4rem}
.prog p{font-size:.88rem;line-height:1.7;opacity:.7}
.prog-dur{display:inline-block;margin-top:.8rem;font-size:.75rem;font-weight:600;color:var(--p);background:${P}15;padding:.3rem .8rem;border-radius:50px}

.trainer-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-top:3rem}
.trainer{background:var(--sf);border:1px solid rgba(255,255,255,.06);border-radius:16px;overflow:hidden;transition:all .4s}
.trainer:hover{border-color:${P}30;transform:translateY(-4px)}
.trainer-img{width:100%;aspect-ratio:4/5;object-fit:cover;display:block;filter:grayscale(.3);transition:filter .5s}
.trainer:hover .trainer-img{filter:none}
.trainer-placeholder{width:100%;aspect-ratio:4/5;display:flex;align-items:center;justify-content:center;background:${P}10;font-size:3rem;color:var(--p);opacity:.3}
.trainer-info{padding:1.5rem}
.trainer-info h3{font-size:1rem;font-weight:700;color:#fff}
.trainer-info .role{font-size:.8rem;color:var(--p);font-weight:600;margin-top:.2rem}
.trainer-info .spec{font-size:.8rem;margin-top:.3rem}

.stats-bar{display:grid;grid-template-columns:repeat(4,1fr);gap:2rem;padding:4rem 3rem;max-width:1200px;margin:0 auto;text-align:center;border-top:1px solid rgba(255,255,255,.06);border-bottom:1px solid rgba(255,255,255,.06);position:relative;z-index:1}
.stat-val{font-size:clamp(2rem,4vw,3.5rem);font-weight:900;color:#fff}
.stat-val span{color:var(--p)}
.stat-lbl{font-size:.8rem;margin-top:.3rem;text-transform:uppercase;letter-spacing:.1em}

.sched-list{margin-top:3rem}
.sched{display:grid;grid-template-columns:120px 1fr 140px 100px;gap:1.5rem;align-items:center;padding:1.5rem 0;border-bottom:1px solid rgba(255,255,255,.06);transition:background .3s}
.sched:hover{background:var(--sf);margin:0 -1.5rem;padding-left:1.5rem;padding-right:1.5rem;border-radius:8px}
.sched-time{font-size:.9rem;font-weight:700;color:var(--p);font-variant-numeric:tabular-nums}
.sched-name{font-size:1rem;font-weight:600;color:#fff}
.sched-trainer{font-size:.85rem}
.sched-level{font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.08em;background:${P}12;color:var(--p);padding:.3rem .8rem;border-radius:50px;text-align:center;white-space:nowrap}

.plans{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-top:3rem}
.plan{background:var(--sf);border:1px solid rgba(255,255,255,.06);border-radius:20px;padding:2.5rem;transition:.3s;position:relative}
.plan.ft{border-color:${P}50;box-shadow:0 0 50px ${P}12}
.plan.ft::before{content:attr(data-label);position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,var(--p),var(--a));color:#fff;font-size:.65rem;font-weight:700;padding:.4rem 1.2rem;border-radius:50px;letter-spacing:.08em;white-space:nowrap}
.plan-name{font-size:.8rem;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:var(--p)}
.plan-price{font-size:3rem;font-weight:900;color:#fff;margin:.5rem 0;line-height:1}
.plan-price span{font-size:.9rem;opacity:.4;font-weight:400}
.plan ul{list-style:none;margin:1.5rem 0 2rem;border-top:1px solid rgba(255,255,255,.06);padding-top:1.5rem}
.plan li{font-size:.85rem;padding:.45rem 0;display:flex;align-items:center;gap:.5rem;opacity:.7}
.plan li::before{content:'✓';color:var(--p);font-weight:700;font-size:.8rem}
.plan-btn{width:100%;padding:.9rem;border-radius:10px;font-weight:700;font-size:.9rem;border:none;cursor:pointer;transition:.3s}
.plan-btn.solid{background:linear-gradient(135deg,var(--p),var(--a));color:#fff}
.plan-btn.solid:hover{box-shadow:0 12px 35px color-mix(in srgb,var(--p) 40%,transparent);transform:translateY(-2px)}
.plan-btn.outline{background:transparent;border:1px solid rgba(255,255,255,.15);color:#fff}
.plan-btn.outline:hover{border-color:var(--p);color:var(--p)}

.cta-sec{text-align:center;padding:7rem 3rem;position:relative;z-index:1}
.cta-box{max-width:700px;margin:0 auto;background:linear-gradient(135deg,${P}12,${A}08);border:1px solid ${P}25;border-radius:24px;padding:4rem 3rem;position:relative;overflow:hidden}
.cta-box::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 30% 50%,${P}15,transparent 60%)}
.cta-box>*{position:relative;z-index:1}
.cta-box h2{font-size:clamp(1.8rem,4vw,2.5rem);font-weight:900;color:#fff;letter-spacing:-.02em;text-transform:uppercase}
.cta-box p{opacity:.6;margin:1rem auto 2rem;max-width:500px}

footer{position:relative;z-index:1;display:flex;justify-content:space-between;align-items:center;padding:2rem 3rem;border-top:1px solid rgba(255,255,255,.06);font-size:.8rem;flex-wrap:wrap;gap:1rem}
.ft-links{display:flex;gap:1.5rem}
.ft-links a{color:var(--tx);text-decoration:none;font-weight:500;transition:color .3s}
.ft-links a:hover{color:var(--p)}

${revealCss}
@media(max-width:768px){
nav{padding:1rem 1.5rem}
.hero{padding:6rem 1.5rem 3rem}
.sec{padding:5rem 1.5rem}
.prog-grid,.plans{grid-template-columns:1fr}
.trainer-grid{grid-template-columns:1fr 1fr}
.stats-bar{grid-template-columns:1fr 1fr;padding:3rem 1.5rem}
.sched{grid-template-columns:80px 1fr;gap:.8rem}
.sched-trainer,.sched-level{display:none}
footer{flex-direction:column;text-align:center;padding:2rem 1.5rem}
}
</style>
</head>
<body>

<nav>
<a href="#top" class="n-name">${esc(s("brand","name")).charAt(0)}<span>${esc(s("brand","name")).slice(1)}</span></a>
<a href="${safeUrl(s("brand","ctaUrl"))}" class="n-cta">${esc(s("brand","cta"))}</a>
</nav>

<section class="hero" id="top">
${s("hero","badge")?`<div class="hero-badge">${esc(s("hero","badge"))}</div>`:""}
<h1>${titleHtml.replace(/\n/g,"<br>")}</h1>
<p class="hero-sub">${esc(s("hero","subtitle"))}</p>
<div class="hero-btns">
<a href="${safeUrl(s("brand","ctaUrl"))}" class="btn-p">${esc(s("hero","btn1"))}</a>
${s("hero","btn2")?`<a href="#programs" class="btn-s">${esc(s("hero","btn2"))}</a>`:""}
</div>
</section>

${r.on("stats")&&stats.length?`
<div class="stats-bar">${stats.map((st,i)=>`<div class="rv${i?` d${Math.min(i,3)}`:""}" ><div class="stat-val">${esc(st.value)}<span>${esc(st.suffix)}</span></div><div class="stat-lbl">${esc(st.label)}</div></div>`).join("")}</div>`:""}

${r.on("programs")&&programs.length?`
<div class="sec" id="programs">
<span class="sec-tag rv">${esc(s("programs","eyebrow"))}</span>
<h2 class="sec-h2 rv">${esc(s("programs","title"))}</h2>
<div class="prog-grid">${programs.map((p,i)=>`<div class="prog rv${i?` d${Math.min(i,3)}`:""}" >
<div class="prog-icon">${esc(p.icon)}</div>
<h3>${esc(p.name)}</h3>
<p>${esc(p.desc)}</p>
${p.duration?`<span class="prog-dur">${esc(p.duration)}</span>`:""}
</div>`).join("")}</div>
</div>`:""}

${r.on("trainers")&&trainers.length?`
<div class="sec" id="trainers">
<span class="sec-tag rv">${esc(s("trainers","eyebrow"))}</span>
<h2 class="sec-h2 rv">${esc(s("trainers","title"))}</h2>
<div class="trainer-grid">${trainers.map((t,i)=>`<div class="trainer rv${i?` d${Math.min(i,3)}`:""}" >
${safeUrl(t.image)!=="#"?`<img class="trainer-img" src="${safeUrl(t.image)}" alt="${esc(t.name)}" loading="lazy">`:`<div class="trainer-placeholder">👤</div>`}
<div class="trainer-info"><h3>${esc(t.name)}</h3><div class="role">${esc(t.role)}</div><div class="spec">${esc(t.speciality)}</div></div>
</div>`).join("")}</div>
</div>`:""}

${r.on("schedule")&&classes.length?`
<div class="sec" id="schedule">
<span class="sec-tag rv">${esc(s("schedule","eyebrow"))}</span>
<h2 class="sec-h2 rv">${esc(s("schedule","title"))}</h2>
<div class="sched-list">${classes.map((c,i)=>`<div class="sched rv${i?` d${Math.min(i,3)}`:""}" >
<div class="sched-time">${esc(c.time)}</div>
<div class="sched-name">${esc(c.name)}</div>
<div class="sched-trainer">${esc(c.trainer)}</div>
<div class="sched-level">${esc(c.level)}</div>
</div>`).join("")}</div>
</div>`:""}

${r.on("membership")&&plans.length?`
<div class="sec" id="membership">
<span class="sec-tag rv">${esc(s("membership","eyebrow"))}</span>
<h2 class="sec-h2 rv">${esc(s("membership","title"))}</h2>
<div class="plans">${plans.map((p,i)=>`<div class="plan${p.featured?" ft":""} rv${i?` d${Math.min(i,3)}`:""}" ${p.featured?`data-label="${esc(p.featured)}"`:""}>
<div class="plan-name">${esc(p.name)}</div>
<div class="plan-price">${esc(p.price)} <span>${esc(p.period)}</span></div>
<ul>${csv(p.feats).map(f=>`<li>${esc(f)}</li>`).join("")}</ul>
<button class="plan-btn ${p.featured?"solid":"outline"}">${esc(p.btn)}</button>
</div>`).join("")}</div>
</div>`:""}

${r.on("cta")?`
<div class="cta-sec" id="cta-section">
<div class="cta-box rv">
<h2>${esc(s("cta","title"))}</h2>
<p>${esc(s("cta","desc"))}</p>
<a href="${safeUrl(s("brand","ctaUrl"))}" class="btn-p">${esc(s("cta","btn"))}</a>
</div>
</div>`:""}

<footer>
<span>${esc(s("footer","copy"))}</span>
${footerLinks.length?`<div class="ft-links">${footerLinks.map(l=>`<a href="#">${esc(l)}</a>`).join("")}</div>`:""}
</footer>

${revealScript}
</body>
</html>`;
}

export const motionTitanFitness: EditableTemplate = {
  id: "motion-titan-fitness",
  name: "Titan — Performance Gym",
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
