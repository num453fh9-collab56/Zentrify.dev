import type { Content, EditableTemplate, Item, Section } from "../editor/types";
import { csv, esc, previewScript, reader, revealCss, revealScript, safeColor, safeUrl } from "../editor/html";

const schema: Section[] = [
  {
    id: "brand",
    label: "Brand",
    fields: [
      { type: "text", key: "name", label: "Clinic / brand name" },
      { type: "text", key: "cta", label: "Nav CTA" },
      { type: "text", key: "ctaUrl", label: "CTA link", placeholder: "#book" },
    ],
  },
  {
    id: "theme",
    label: "Colors",
    fields: [
      { type: "color", key: "primary", label: "Primary" },
      { type: "color", key: "secondary", label: "Secondary" },
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
      { type: "text", key: "badge", label: "Status badge" },
      { type: "textarea", key: "title", label: "Headline", rows: 2, hint: "*stars* for accent text." },
      { type: "textarea", key: "subtitle", label: "Subtitle", rows: 3 },
      { type: "text", key: "btn1", label: "Primary button" },
      { type: "text", key: "btn2", label: "Secondary button" },
    ],
  },
  {
    id: "metrics",
    label: "Key metrics",
    toggleable: true,
    anchor: "metrics",
    fields: [
      {
        type: "list",
        key: "items",
        label: "Metrics",
        itemLabel: "Metric",
        titleKey: "label",
        min: 1,
        max: 4,
        newItem: { value: "0", suffix: "%", label: "Metric" },
        fields: [
          { type: "text", key: "value", label: "Number" },
          { type: "text", key: "suffix", label: "Suffix" },
          { type: "text", key: "label", label: "Label" },
        ],
      },
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
        newItem: { icon: "🩺", title: "Service", desc: "Description of this service." },
        fields: [
          { type: "text", key: "icon", label: "Icon emoji" },
          { type: "text", key: "title", label: "Title" },
          { type: "textarea", key: "desc", label: "Description", rows: 2 },
        ],
      },
    ],
  },
  {
    id: "doctors",
    label: "Our doctors",
    toggleable: true,
    anchor: "doctors",
    fields: [
      { type: "text", key: "eyebrow", label: "Tag" },
      { type: "text", key: "title", label: "Heading" },
      {
        type: "list",
        key: "items",
        label: "Doctors",
        itemLabel: "Doctor",
        titleKey: "name",
        max: 4,
        newItem: { name: "Dr. Name", specialty: "Specialty", credentials: "MD, Board Certified", image: "" },
        fields: [
          { type: "text", key: "name", label: "Name" },
          { type: "text", key: "specialty", label: "Specialty" },
          { type: "text", key: "credentials", label: "Credentials" },
          { type: "image", key: "image", label: "Photo" },
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
        label: "Reviews",
        itemLabel: "Review",
        titleKey: "name",
        max: 4,
        newItem: { quote: "Excellent care!", name: "Patient Name", condition: "General Check-up" },
        fields: [
          { type: "textarea", key: "quote", label: "Quote", rows: 2 },
          { type: "text", key: "name", label: "Name" },
          { type: "text", key: "condition", label: "Condition / context" },
        ],
      },
    ],
  },
  {
    id: "faq",
    label: "FAQ",
    toggleable: true,
    anchor: "faq",
    fields: [
      { type: "text", key: "eyebrow", label: "Tag" },
      { type: "text", key: "title", label: "Heading" },
      {
        type: "list",
        key: "items",
        label: "Questions",
        itemLabel: "FAQ",
        titleKey: "question",
        max: 6,
        newItem: { question: "Question?", answer: "Answer." },
        fields: [
          { type: "text", key: "question", label: "Question" },
          { type: "textarea", key: "answer", label: "Answer", rows: 3 },
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
      { type: "text", key: "btn", label: "Button text" },
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
      { type: "text", key: "description", label: "Meta description" },
    ],
  },
];

const defaults: Content = {
  enabled: { metrics: true, services: true, doctors: true, testimonials: true, faq: true, cta: true },
  values: {
    brand: { name: "Pulse Health", cta: "Book Appointment →", ctaUrl: "#cta-section" },
    theme: { primary: "#14b8a6", secondary: "#6366f1", bg: "#0a0f1a", surface: "#111827", text: "#94a3b8" },
    hero: {
      badge: "● NOW ACCEPTING NEW PATIENTS",
      title: "Healthcare that puts *you* first",
      subtitle: "Evidence-based medicine meets compassionate care. Our network of board-certified physicians delivers personalized treatment plans powered by cutting-edge diagnostics.",
      btn1: "Book Appointment",
      btn2: "Our Services",
    },
    metrics: {
      items: [
        { value: "98", suffix: "%", label: "Patient satisfaction" },
        { value: "50", suffix: "K+", label: "Patients treated" },
        { value: "24", suffix: "/7", label: "Telehealth available" },
        { value: "15", suffix: "+", label: "Years of excellence" },
      ] as unknown as string,
    },
    services: {
      eyebrow: "Services",
      title: "Comprehensive care for every stage of life",
      items: [
        { icon: "🫀", title: "Cardiology", desc: "Advanced cardiac imaging, stress testing, and preventive heart health programs." },
        { icon: "🧠", title: "Neurology", desc: "Cutting-edge neurological diagnostics, EEG monitoring, and cognitive health." },
        { icon: "🦴", title: "Orthopedics", desc: "Sports medicine, joint replacement, and minimally invasive surgical techniques." },
        { icon: "🔬", title: "Diagnostics", desc: "Same-day lab results with AI-enhanced imaging and molecular testing." },
        { icon: "💊", title: "Primary Care", desc: "Your health home — annual checkups, chronic disease management, and wellness plans." },
        { icon: "🧬", title: "Genomics", desc: "Personalized medicine through genetic testing and precision treatment." },
      ] as unknown as string,
    },
    doctors: {
      eyebrow: "Our Team",
      title: "World-class physicians",
      items: [
        { name: "Dr. Sarah Chen", specialty: "Cardiology", credentials: "MD, FACC — Harvard Medical", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=500&fit=crop" },
        { name: "Dr. James Wright", specialty: "Neurology", credentials: "MD, PhD — Johns Hopkins", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=500&fit=crop" },
        { name: "Dr. Priya Patel", specialty: "Orthopedics", credentials: "MD, FAAOS — Stanford", image: "https://images.unsplash.com/photo-1594824476967-48c8b964f137?w=400&h=500&fit=crop" },
      ] as unknown as string,
    },
    testimonials: {
      items: [
        { quote: "After years of misdiagnosis, the team at Pulse finally identified my condition and created a treatment plan that changed my life.", name: "Maria Gonzalez", condition: "Autoimmune Disorder" },
        { quote: "The telehealth platform is seamless. I got a specialist consultation within 24 hours without leaving home.", name: "David Kim", condition: "Cardiology Follow-up" },
        { quote: "From my first visit to post-surgery recovery, every step felt coordinated and personal. Truly outstanding care.", name: "Emily Roberts", condition: "Knee Replacement" },
      ] as unknown as string,
    },
    faq: {
      eyebrow: "FAQ",
      title: "Common questions",
      items: [
        { question: "Do you accept insurance?", answer: "Yes — we accept most major insurance plans including Blue Cross, Aetna, UnitedHealthcare, and Cigna. Our billing team will verify your coverage before your first visit." },
        { question: "How do telehealth appointments work?", answer: "After booking, you'll receive a secure video link. Join from any device — phone, tablet, or computer. Prescriptions can be sent directly to your pharmacy." },
        { question: "How quickly can I get an appointment?", answer: "Same-day appointments are available for urgent needs. Routine visits can typically be scheduled within 48 hours." },
        { question: "What should I bring to my first visit?", answer: "Please bring a valid ID, your insurance card, a list of current medications, and any relevant medical records or imaging." },
      ] as unknown as string,
    },
    cta: { title: "Your health journey starts here", desc: "Book your first appointment today. New patients receive a complimentary wellness assessment.", btn: "Schedule Now →" },
    footer: { copy: "© 2025 Pulse Health, Inc.", links: "Privacy, Terms, HIPAA, Accessibility, Careers" },
    seo: { title: "Pulse Health — Modern Healthcare", description: "Evidence-based, compassionate healthcare with 24/7 telehealth access and board-certified specialists." },
  },
};

const presets = {
  section: "theme",
  items: [
    { name: "Teal Trust", swatch: ["#14b8a6", "#6366f1", "#0a0f1a"], values: { primary: "#14b8a6", secondary: "#6366f1", bg: "#0a0f1a", surface: "#111827", text: "#94a3b8" } },
    { name: "Blue Calm", swatch: ["#3b82f6", "#1e40af", "#0a101e"], values: { primary: "#3b82f6", secondary: "#1e40af", bg: "#0a101e", surface: "#111a30", text: "#7da0cc" } },
    { name: "Violet Care", swatch: ["#8b5cf6", "#6d28d9", "#0e0a1a"], values: { primary: "#8b5cf6", secondary: "#6d28d9", bg: "#0e0a1a", surface: "#16112a", text: "#a099c4" } },
    { name: "Warm Coral", swatch: ["#f97316", "#ea580c", "#120e0a"], values: { primary: "#f97316", secondary: "#ea580c", bg: "#120e0a", surface: "#1c1610", text: "#b89a7a" } },
  ],
};

function render(content: Content, options?: { preview?: { initialScroll: number; instant: boolean } }) {
  const r = reader(content);
  const s = r.str;
  const P = safeColor(s("theme","primary"),"#14b8a6");
  const S2 = safeColor(s("theme","secondary"),"#6366f1");
  const BG = safeColor(s("theme","bg"),"#0a0f1a");
  const SF = safeColor(s("theme","surface"),"#111827");
  const TX = safeColor(s("theme","text"),"#94a3b8");
  const metrics = r.list("metrics","items");
  const services = r.list("services","items");
  const doctors = r.list("doctors","items");
  const testimonials = r.list("testimonials","items");
  const faqs = r.list("faq","items");
  const footerLinks = csv(s("footer","links"));

  const titleHtml = esc(s("hero","title")).replace(/\*(.+?)\*/g, `<span class="accent">$1</span>`);

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
:root{--p:${P};--s:${S2};--bg:${BG};--sf:${SF};--tx:${TX}}
html{scroll-behavior:smooth}
body{font-family:'Inter',system-ui,sans-serif;background:var(--bg);color:var(--tx);line-height:1.7;overflow-x:hidden}
a{text-decoration:none;color:inherit}

nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:1.2rem 5%;display:flex;align-items:center;justify-content:space-between;backdrop-filter:blur(20px);background:${BG}cc;border-bottom:1px solid rgba(255,255,255,.06)}
.n-logo{font-size:1.2rem;font-weight:800;color:#fff;letter-spacing:-.3px}.n-logo span{color:var(--p)}
.n-cta{background:var(--p);color:#fff;padding:.55rem 1.5rem;border-radius:10px;font-weight:600;font-size:.85rem;border:none;cursor:pointer;transition:.3s}
.n-cta:hover{box-shadow:0 8px 30px color-mix(in srgb,var(--p) 40%,transparent);transform:translateY(-2px)}

.hero{min-height:100vh;display:flex;align-items:center;padding:8rem 5% 5rem;position:relative;overflow:hidden}
.hero-glow{position:absolute;top:-20%;right:-10%;width:700px;height:700px;border-radius:50%;background:radial-gradient(circle,color-mix(in srgb,var(--p) 15%,transparent),transparent 70%);pointer-events:none;animation:float 10s ease-in-out infinite}
.hero-glow2{position:absolute;bottom:-30%;left:-10%;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,color-mix(in srgb,var(--s) 10%,transparent),transparent 70%);pointer-events:none;animation:float 12s ease-in-out 3s infinite}
@keyframes float{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(30px,-20px) scale(1.05)}}
.hero-inner{max-width:700px;position:relative;z-index:1}
.hero-badge{display:inline-flex;align-items:center;gap:.5rem;background:color-mix(in srgb,var(--p) 12%,transparent);border:1px solid color-mix(in srgb,var(--p) 25%,transparent);padding:.45rem 1.2rem;border-radius:50px;font-size:.75rem;font-weight:600;color:var(--p);margin-bottom:2rem;letter-spacing:.5px}
.hero-badge .dot{width:8px;height:8px;border-radius:50%;background:var(--p);animation:pulse 2s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:1;box-shadow:0 0 0 0 color-mix(in srgb,var(--p) 40%,transparent)}50%{opacity:.7;box-shadow:0 0 0 8px transparent}}
.hero h1{font-size:clamp(2.5rem,5vw,4rem);font-weight:800;color:#fff;line-height:1.12;letter-spacing:-1.5px;margin-bottom:1.5rem}
.hero h1 .accent{color:var(--p)}
.hero .sub{font-size:1.05rem;line-height:1.8;margin-bottom:2.5rem;max-width:560px}
.hero-btns{display:flex;gap:1rem;flex-wrap:wrap}
.btn-p{background:linear-gradient(135deg,var(--p),var(--s));color:#fff;padding:.9rem 2.2rem;border-radius:12px;font-weight:700;font-size:.95rem;border:none;cursor:pointer;transition:.3s;display:inline-flex;align-items:center;gap:.5rem}
.btn-p:hover{transform:translateY(-3px);box-shadow:0 15px 40px color-mix(in srgb,var(--p) 35%,transparent)}
.btn-g{background:rgba(255,255,255,.05);color:#fff;padding:.9rem 2.2rem;border-radius:12px;font-weight:600;font-size:.95rem;border:1px solid rgba(255,255,255,.1);cursor:pointer;transition:.3s}
.btn-g:hover{border-color:rgba(255,255,255,.25);background:rgba(255,255,255,.08)}

.metrics{padding:4rem 5%;border-top:1px solid rgba(255,255,255,.06);border-bottom:1px solid rgba(255,255,255,.06);background:var(--sf)}
.metrics-grid{max-width:1000px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:2rem;text-align:center}
.metric-val{font-size:2.8rem;font-weight:900;color:#fff;font-variant-numeric:tabular-nums}
.metric-val .suf{font-size:1.5rem;color:var(--p)}
.metric-lbl{font-size:.85rem;margin-top:.3rem}

.sec{max-width:1200px;margin:0 auto;padding:7rem 5%}
.sec-tag{display:inline-block;background:color-mix(in srgb,var(--p) 12%,transparent);color:var(--p);padding:.4rem 1.1rem;border-radius:50px;font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:1rem;border:1px solid color-mix(in srgb,var(--p) 20%,transparent)}
.sec-h2{font-size:clamp(2rem,3.5vw,2.8rem);font-weight:800;color:#fff;letter-spacing:-.8px;margin-bottom:.5rem;line-height:1.15}
.sec-sub{max-width:500px;margin-bottom:3rem}

.svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.2rem}
.svc{background:var(--sf);border:1px solid rgba(255,255,255,.05);border-radius:18px;padding:2rem;transition:.4s;position:relative;overflow:hidden}
.svc::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--p),var(--s));transform:scaleX(0);transition:transform .4s;transform-origin:left}
.svc:hover::before{transform:scaleX(1)}.svc:hover{border-color:color-mix(in srgb,var(--p) 25%,transparent);transform:translateY(-4px);box-shadow:0 20px 40px rgba(0,0,0,.3)}
.svc-icon{font-size:1.8rem;margin-bottom:1rem}
.svc h3{color:#fff;font-size:1.05rem;font-weight:700;margin-bottom:.4rem}
.svc p{font-size:.85rem;line-height:1.7}

.doc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem}
.doc{background:var(--sf);border:1px solid rgba(255,255,255,.05);border-radius:18px;overflow:hidden;transition:.4s}
.doc:hover{border-color:color-mix(in srgb,var(--p) 25%,transparent);transform:translateY(-4px)}
.doc-img{width:100%;aspect-ratio:4/5;object-fit:cover;display:block}
.doc-ph{width:100%;aspect-ratio:4/5;display:flex;align-items:center;justify-content:center;font-size:3rem;background:rgba(255,255,255,.03)}
.doc-info{padding:1.5rem}
.doc-info h3{color:#fff;font-size:1.05rem;font-weight:700}.doc-info .spec{color:var(--p);font-size:.85rem;font-weight:600;margin-top:.2rem}
.doc-info .cred{font-size:.8rem;margin-top:.3rem}

.testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem}
.testi{background:var(--sf);border:1px solid rgba(255,255,255,.05);border-radius:18px;padding:2rem;transition:.3s}
.testi:hover{border-color:color-mix(in srgb,var(--p) 20%,transparent);transform:translateY(-3px)}
.testi q{display:block;font-size:.92rem;line-height:1.8;font-style:italic;margin-bottom:1.2rem;color:rgba(255,255,255,.7)}
.testi-foot{border-top:1px solid rgba(255,255,255,.06);padding-top:1rem;display:flex;justify-content:space-between;align-items:baseline}
.testi-name{font-weight:700;color:#fff;font-size:.85rem}
.testi-cond{font-size:.75rem;color:var(--p)}

.faq-list{max-width:700px}
.faq-item{border-bottom:1px solid rgba(255,255,255,.06);padding:1.5rem 0}
.faq-q{font-size:1.05rem;font-weight:700;color:#fff;cursor:default;display:flex;justify-content:space-between;align-items:center;gap:1rem}
.faq-q::after{content:'+';font-size:1.3rem;color:var(--p);font-weight:300;flex-shrink:0}
.faq-a{font-size:.9rem;line-height:1.8;margin-top:.8rem;max-width:600px}

.cta-sec{text-align:center;padding:7rem 5%}
.cta-box{max-width:700px;margin:0 auto;background:linear-gradient(135deg,color-mix(in srgb,var(--p) 12%,transparent),color-mix(in srgb,var(--s) 8%,transparent));border:1px solid color-mix(in srgb,var(--p) 20%,transparent);border-radius:24px;padding:4rem 3rem;position:relative;overflow:hidden}
.cta-box::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 30% 50%,color-mix(in srgb,var(--p) 12%,transparent),transparent 60%)}
.cta-box>*{position:relative;z-index:1}
.cta-box h2{font-size:clamp(2rem,4vw,2.8rem);font-weight:800;color:#fff;letter-spacing:-1px;margin-bottom:1rem}
.cta-box p{margin-bottom:2rem;max-width:450px;margin-left:auto;margin-right:auto}

footer{display:flex;justify-content:space-between;align-items:center;padding:2rem 5%;border-top:1px solid rgba(255,255,255,.06);font-size:.8rem;flex-wrap:wrap;gap:1rem}
.ft-links{display:flex;gap:1.5rem}.ft-links a{color:var(--tx);font-weight:500;transition:color .3s}.ft-links a:hover{color:var(--p)}

${revealCss}
@media(max-width:768px){
.hero{padding:6rem 5% 3rem}
.metrics-grid{grid-template-columns:repeat(2,1fr)}
.svc-grid,.doc-grid,.testi-grid{grid-template-columns:1fr}
nav{padding:1rem 5%}
footer{flex-direction:column;text-align:center}
}
</style>
</head>
<body>

<nav>
<a href="#top" class="n-logo">${esc(s("brand","name")).replace(/^(\S+)/,'<span>$1</span>')}</a>
<a href="${safeUrl(s("brand","ctaUrl"))}" class="n-cta">${esc(s("brand","cta"))}</a>
</nav>

<section class="hero" id="top">
<div class="hero-glow"></div><div class="hero-glow2"></div>
<div class="hero-inner">
${s("hero","badge")?`<div class="hero-badge rv"><span class="dot"></span>${esc(s("hero","badge"))}</div>`:""}
<h1 class="rv">${titleHtml}</h1>
<p class="sub rv">${esc(s("hero","subtitle"))}</p>
<div class="hero-btns rv">
<a href="${safeUrl(s("brand","ctaUrl"))}" class="btn-p">${esc(s("hero","btn1"))}</a>
${s("hero","btn2")?`<a href="#services" class="btn-g">${esc(s("hero","btn2"))}</a>`:""}
</div>
</div>
</section>

${r.on("metrics")&&metrics.length?`<section class="metrics" id="metrics">
<div class="metrics-grid">${metrics.map((m,i)=>`<div class="rv${i?` d${Math.min(i,3)}`:""}" ><div class="metric-val">${esc(m.value)}<span class="suf">${esc(m.suffix)}</span></div><div class="metric-lbl">${esc(m.label)}</div></div>`).join("")}</div>
</section>`:""}

${r.on("services")&&services.length?`<section class="sec" id="services">
<span class="sec-tag rv">${esc(s("services","eyebrow"))}</span>
<h2 class="sec-h2 rv">${esc(s("services","title"))}</h2>
<div class="svc-grid" style="margin-top:2.5rem">${services.map((sv,i)=>`<div class="svc rv${i?` d${Math.min(i,3)}`:""}" >
<div class="svc-icon">${esc(sv.icon)}</div><h3>${esc(sv.title)}</h3><p>${esc(sv.desc)}</p>
</div>`).join("")}</div>
</section>`:""}

${r.on("doctors")&&doctors.length?`<section class="sec" id="doctors">
<span class="sec-tag rv">${esc(s("doctors","eyebrow"))}</span>
<h2 class="sec-h2 rv">${esc(s("doctors","title"))}</h2>
<div class="doc-grid" style="margin-top:2.5rem">${doctors.map((d,i)=>`<div class="doc rv${i?` d${Math.min(i,3)}`:""}" >
${safeUrl(d.image)!=="#"?`<img class="doc-img" src="${safeUrl(d.image)}" alt="${esc(d.name)}" loading="lazy">`:`<div class="doc-ph">👤</div>`}
<div class="doc-info"><h3>${esc(d.name)}</h3><div class="spec">${esc(d.specialty)}</div><div class="cred">${esc(d.credentials)}</div></div>
</div>`).join("")}</div>
</section>`:""}

${r.on("testimonials")&&testimonials.length?`<section class="sec" id="testimonials">
<div class="testi-grid">${testimonials.map((t,i)=>`<div class="testi rv${i?` d${Math.min(i,3)}`:""}" >
<q>${esc(t.quote)}</q>
<div class="testi-foot"><span class="testi-name">${esc(t.name)}</span><span class="testi-cond">${esc(t.condition)}</span></div>
</div>`).join("")}</div>
</section>`:""}

${r.on("faq")&&faqs.length?`<section class="sec" id="faq">
<span class="sec-tag rv">${esc(s("faq","eyebrow"))}</span>
<h2 class="sec-h2 rv">${esc(s("faq","title"))}</h2>
<div class="faq-list" style="margin-top:2.5rem">${faqs.map((f,i)=>`<div class="faq-item rv${i?` d${Math.min(i,3)}`:""}" >
<div class="faq-q">${esc(f.question)}</div>
<div class="faq-a">${esc(f.answer)}</div>
</div>`).join("")}</div>
</section>`:""}

${r.on("cta")?`<section class="cta-sec" id="cta-section">
<div class="cta-box rv">
<h2>${esc(s("cta","title"))}</h2>
<p>${esc(s("cta","desc"))}</p>
<a href="${safeUrl(s("brand","ctaUrl"))}" class="btn-p">${esc(s("cta","btn"))}</a>
</div>
</section>`:""}

<footer>
<span>${esc(s("footer","copy"))}</span>
${footerLinks.length?`<div class="ft-links">${footerLinks.map(l=>`<a href="#">${esc(l)}</a>`).join("")}</div>`:""}
</footer>

${revealScript}
</body>
</html>`;
}

export const motionPulseHealth: EditableTemplate = {
  id: "motion-pulse-health",
  name: "Pulse — Digital Health",
  schema,
  defaults,
  presets,
  render,
  checks: (c) => {
    const r = reader(c);
    const out: { section: string; message: string }[] = [];
    if (!r.str("seo", "description").trim())
      out.push({ section: "seo", message: "Add a meta description for better SEO." });
    return out;
  },
};
