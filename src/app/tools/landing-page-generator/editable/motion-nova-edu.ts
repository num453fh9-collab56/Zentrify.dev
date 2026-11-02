import type { Content, EditableTemplate, Section } from "../editor/types";
import { csv, esc, previewScript, reader, revealCss, revealScript, safeColor, safeUrl } from "../editor/html";

const schema: Section[] = [
  {
    id: "brand",
    label: "Brand",
    fields: [
      { type: "text", key: "name", label: "Platform name" },
      { type: "text", key: "cta", label: "Nav CTA" },
      { type: "text", key: "ctaUrl", label: "CTA link", placeholder: "#pricing" },
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
      { type: "text", key: "badge", label: "Badge text" },
      { type: "textarea", key: "title", label: "Headline", rows: 2, hint: "*word* for gradient text." },
      { type: "textarea", key: "subtitle", label: "Subtitle", rows: 3 },
      { type: "text", key: "btn1", label: "Primary button" },
      { type: "text", key: "btn2", label: "Secondary button" },
      { type: "text", key: "socialProof", label: "Social proof line" },
    ],
  },
  {
    id: "courses",
    label: "Courses",
    toggleable: true,
    anchor: "courses",
    fields: [
      { type: "text", key: "eyebrow", label: "Tag" },
      { type: "text", key: "title", label: "Heading" },
      {
        type: "list",
        key: "items",
        label: "Courses",
        itemLabel: "Course",
        titleKey: "title",
        min: 1,
        max: 6,
        newItem: { title: "Course Title", instructor: "Instructor", level: "Beginner", lessons: "12", rating: "4.8", image: "" },
        fields: [
          { type: "text", key: "title", label: "Title" },
          { type: "text", key: "instructor", label: "Instructor" },
          { type: "select", key: "level", label: "Level", options: [{ value: "Beginner", label: "Beginner" }, { value: "Intermediate", label: "Intermediate" }, { value: "Advanced", label: "Advanced" }] },
          { type: "text", key: "lessons", label: "Lessons count" },
          { type: "text", key: "rating", label: "Rating (0-5)" },
          { type: "image", key: "image", label: "Cover image" },
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
        newItem: { value: "100", suffix: "+", label: "Stat" },
        fields: [
          { type: "text", key: "value", label: "Number" },
          { type: "text", key: "suffix", label: "Suffix" },
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
      {
        type: "list",
        key: "items",
        label: "Features",
        itemLabel: "Feature",
        titleKey: "title",
        max: 6,
        newItem: { icon: "📚", title: "Feature", desc: "Feature description." },
        fields: [
          { type: "text", key: "icon", label: "Icon emoji" },
          { type: "text", key: "title", label: "Title" },
          { type: "textarea", key: "desc", label: "Description", rows: 2 },
        ],
      },
    ],
  },
  {
    id: "instructors",
    label: "Instructors",
    toggleable: true,
    anchor: "instructors",
    fields: [
      { type: "text", key: "eyebrow", label: "Tag" },
      { type: "text", key: "title", label: "Heading" },
      {
        type: "list",
        key: "items",
        label: "Instructors",
        itemLabel: "Instructor",
        titleKey: "name",
        max: 4,
        newItem: { name: "Instructor", role: "Subject Expert", bio: "Short bio.", image: "" },
        fields: [
          { type: "text", key: "name", label: "Name" },
          { type: "text", key: "role", label: "Role / title" },
          { type: "textarea", key: "bio", label: "Bio", rows: 2 },
          { type: "image", key: "image", label: "Photo" },
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
      {
        type: "list",
        key: "items",
        label: "Plans",
        itemLabel: "Plan",
        titleKey: "name",
        min: 1,
        max: 3,
        newItem: { name: "Plan", price: "$0", period: "/mo", feats: "Feature 1, Feature 2", btn: "Start", featured: "" },
        fields: [
          { type: "text", key: "name", label: "Name" },
          { type: "text", key: "price", label: "Price" },
          { type: "text", key: "period", label: "Period" },
          { type: "textarea", key: "feats", label: "Features (comma-separated)", rows: 3 },
          { type: "text", key: "btn", label: "Button text" },
          { type: "text", key: "featured", label: "Badge (empty = none)" },
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
      { type: "textarea", key: "description", label: "Meta description", rows: 2 },
    ],
  },
];

const defaults: Content = {
  enabled: { courses: true, stats: true, features: true, instructors: true, pricing: true, cta: true },
  values: {
    brand: { name: "Nova", cta: "Start Learning →", ctaUrl: "#pricing" },
    theme: { primary: "#6366f1", secondary: "#8b5cf6", bg: "#0f0a1e", surface: "#1a1530", text: "#9a8dc8" },
    hero: {
      badge: "🎓 Trusted by 50,000+ learners worldwide",
      title: "Master new skills with *world-class* instructors",
      subtitle: "From code to creativity — learn at your own pace with interactive courses, real projects, and a supportive community of learners.",
      btn1: "Explore Courses →",
      btn2: "View Pricing",
      socialProof: "Join 50K+ students already learning on Nova",
    },
    courses: {
      eyebrow: "Popular Courses",
      title: "Start your journey today",
      items: [
        { title: "Full-Stack Web Development", instructor: "Sarah Chen", level: "Beginner", lessons: "48", rating: "4.9", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop" },
        { title: "AI & Machine Learning Fundamentals", instructor: "Dr. James Liu", level: "Intermediate", lessons: "36", rating: "4.8", image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop" },
        { title: "UX/UI Design Masterclass", instructor: "Mia Torres", level: "Beginner", lessons: "32", rating: "4.9", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop" },
        { title: "Data Science with Python", instructor: "Alex Kumar", level: "Intermediate", lessons: "42", rating: "4.7", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop" },
        { title: "Mobile App Development", instructor: "David Park", level: "Advanced", lessons: "56", rating: "4.8", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop" },
        { title: "Creative Writing Workshop", instructor: "Elena Voss", level: "Beginner", lessons: "24", rating: "4.9", image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=400&fit=crop" },
      ] as unknown as string,
    },
    stats: {
      items: [
        { value: "50", suffix: "K+", label: "Active students" },
        { value: "200", suffix: "+", label: "Expert courses" },
        { value: "98", suffix: "%", label: "Completion rate" },
        { value: "4.9", suffix: "★", label: "Average rating" },
      ] as unknown as string,
    },
    features: {
      eyebrow: "Why Nova",
      title: "Everything you need to succeed",
      items: [
        { icon: "🎯", title: "Project-Based Learning", desc: "Build real projects from day one. Learn by doing, not just watching." },
        { icon: "🤖", title: "AI Study Assistant", desc: "Get instant help from our AI tutor that adapts to your learning style." },
        { icon: "👥", title: "Live Mentoring", desc: "Weekly group sessions with industry experts for personalized guidance." },
        { icon: "📱", title: "Learn Anywhere", desc: "Access courses offline on any device. Pick up right where you left off." },
        { icon: "🏆", title: "Verified Certificates", desc: "Earn industry-recognized certificates to boost your career profile." },
        { icon: "🔄", title: "Lifetime Access", desc: "One-time payment, forever access. Includes all future course updates." },
      ] as unknown as string,
    },
    instructors: {
      eyebrow: "Meet Your Mentors",
      title: "Learn from the best",
      items: [
        { name: "Sarah Chen", role: "Senior Engineer, ex-Google", bio: "10+ years building scalable web applications. Passionate about teaching the next generation of developers.", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop" },
        { name: "Dr. James Liu", role: "AI Researcher, Stanford", bio: "Published researcher in ML and NLP. Makes complex AI concepts accessible and practical.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" },
        { name: "Mia Torres", role: "Design Lead, Figma", bio: "Award-winning designer who's shaped products used by millions worldwide.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop" },
      ] as unknown as string,
    },
    pricing: {
      eyebrow: "Pricing",
      title: "Invest in your future",
      items: [
        { name: "Explorer", price: "$0", period: "/mo", feats: "Access 10 free courses, Community forum, Basic quizzes, Mobile access", btn: "Start Free", featured: "" },
        { name: "Pro Learner", price: "$29", period: "/mo", feats: "All 200+ courses, AI study assistant, Verified certificates, Live mentoring sessions, Project reviews, Priority support", btn: "Go Pro →", featured: "MOST POPULAR" },
        { name: "Teams", price: "$49", period: "/seat/mo", feats: "Everything in Pro, Team analytics, Admin dashboard, Custom learning paths, Dedicated success manager, SSO & API access", btn: "Contact Sales", featured: "" },
      ] as unknown as string,
    },
    cta: { title: "Start learning today", desc: "Join thousands of learners building new skills and advancing their careers with Nova.", btn: "Get Started Free →" },
    footer: { copy: "© 2025 Nova Learning, Inc.", links: "Courses, Community, Blog, Careers, Privacy, Terms" },
    seo: { title: "Nova — Learn from World-Class Instructors", description: "Master new skills with interactive courses, AI-powered study tools, and expert mentors. Join 50,000+ learners on Nova." },
  },
};

const presets = {
  section: "theme",
  items: [
    { name: "Indigo Scholar", swatch: ["#6366f1", "#8b5cf6", "#0f0a1e"], values: { primary: "#6366f1", secondary: "#8b5cf6", bg: "#0f0a1e", surface: "#1a1530", text: "#9a8dc8" } },
    { name: "Ocean Learn", swatch: ["#0891b2", "#06b6d4", "#051e26"], values: { primary: "#0891b2", secondary: "#06b6d4", bg: "#051e26", surface: "#0a2a35", text: "#7cbcc8" } },
    { name: "Emerald Academy", swatch: ["#059669", "#10b981", "#041f14"], values: { primary: "#059669", secondary: "#10b981", bg: "#041f14", surface: "#082e1f", text: "#6eb89a" } },
    { name: "Sunset Course", swatch: ["#e11d48", "#f43f5e", "#1e0a10"], values: { primary: "#e11d48", secondary: "#f43f5e", bg: "#1e0a10", surface: "#2d111c", text: "#c88a9a" } },
  ],
};

function render(content: Content, options?: { preview?: { initialScroll: number; instant: boolean } }) {
  const r = reader(content);
  const s = r.str;
  const P = safeColor(s("theme","primary"),"#6366f1");
  const P2 = safeColor(s("theme","secondary"),"#8b5cf6");
  const BG = safeColor(s("theme","bg"),"#0f0a1e");
  const SF = safeColor(s("theme","surface"),"#1a1530");
  const TX = safeColor(s("theme","text"),"#9a8dc8");
  const courses = r.list("courses","items");
  const stats = r.list("stats","items");
  const features = r.list("features","items");
  const instructors = r.list("instructors","items");
  const plans = r.list("pricing","items");
  const footerLinks = csv(s("footer","links"));

  const titleHtml = esc(s("hero","title")).replace(/\*(.+?)\*/g, `<span class="grad">$1</span>`);
  const stars = (rating: string) => {
    const n = Math.round(parseFloat(rating) || 0);
    return Array(5).fill(0).map((_,i) => `<svg width="14" height="14" viewBox="0 0 20 20" fill="${i < n ? P : 'rgba(255,255,255,.12)'}"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`).join("");
  };

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
:root{--p:${P};--p2:${P2};--bg:${BG};--sf:${SF};--tx:${TX}}
html{scroll-behavior:smooth}
body{font-family:'Inter',system-ui,sans-serif;background:var(--bg);color:var(--tx);line-height:1.7;overflow-x:hidden}
a{text-decoration:none;color:inherit}

.orb{position:fixed;border-radius:50%;filter:blur(120px);opacity:.18;pointer-events:none;z-index:0}
.orb-1{width:600px;height:600px;background:var(--p);top:-10%;right:-5%;animation:drift 12s ease-in-out infinite}
.orb-2{width:400px;height:400px;background:var(--p2);bottom:10%;left:-8%;animation:drift 15s ease-in-out 3s infinite}
@keyframes drift{0%,100%{transform:translate(0,0)}50%{transform:translate(30px,-25px)}}

nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:1.2rem 5%;display:flex;align-items:center;justify-content:space-between;backdrop-filter:blur(20px);background:${BG}cc;border-bottom:1px solid rgba(255,255,255,.06)}
.logo{font-size:1.3rem;font-weight:800;color:#fff;letter-spacing:-.5px}.logo span{color:var(--p)}
nav ul{list-style:none;display:flex;gap:2rem}nav ul a{font-size:.85rem;font-weight:500;opacity:.6;transition:.3s}nav ul a:hover{opacity:1;color:var(--p)}
.nav-cta{background:linear-gradient(135deg,var(--p),var(--p2));color:#fff;padding:.55rem 1.5rem;border-radius:10px;font-weight:600;font-size:.85rem;border:none;cursor:pointer;transition:.3s}
.nav-cta:hover{box-shadow:0 8px 25px color-mix(in srgb,var(--p) 40%,transparent);transform:translateY(-2px)}

.hero{min-height:100vh;display:flex;align-items:center;padding:8rem 5% 4rem;position:relative;z-index:1}
.hero-inner{max-width:800px;margin:0 auto;text-align:center}
.badge{display:inline-block;background:color-mix(in srgb,var(--p) 15%,transparent);border:1px solid color-mix(in srgb,var(--p) 25%,transparent);padding:.5rem 1.4rem;border-radius:50px;font-size:.78rem;font-weight:600;color:var(--p);margin-bottom:2rem}
.hero h1{font-size:clamp(2.2rem,5vw,3.8rem);font-weight:900;color:#fff;line-height:1.12;letter-spacing:-1.5px;margin-bottom:1.5rem}
.grad{background:linear-gradient(135deg,var(--p),var(--p2));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero .sub{font-size:1.05rem;opacity:.55;max-width:600px;margin:0 auto 2.5rem;line-height:1.8}
.hero-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;margin-bottom:2rem}
.btn-g{background:linear-gradient(135deg,var(--p),var(--p2));color:#fff;padding:.9rem 2.2rem;border-radius:12px;font-weight:700;font-size:.95rem;border:none;cursor:pointer;transition:.3s;display:inline-flex;align-items:center;gap:.5rem}
.btn-g:hover{transform:translateY(-3px);box-shadow:0 15px 40px color-mix(in srgb,var(--p) 35%,transparent)}
.btn-o{background:rgba(255,255,255,.05);color:#fff;padding:.9rem 2.2rem;border-radius:12px;font-weight:600;font-size:.95rem;border:1px solid rgba(255,255,255,.12);cursor:pointer;transition:.3s}
.btn-o:hover{border-color:var(--p);color:var(--p)}
.social-proof{font-size:.85rem;opacity:.45}
.social-proof strong{color:#fff;opacity:1}

.sec{position:relative;z-index:1;max-width:1200px;margin:0 auto;padding:7rem 5%}
.sec-tag{display:inline-block;background:color-mix(in srgb,var(--p) 12%,transparent);color:var(--p);padding:.4rem 1.2rem;border-radius:50px;font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:1rem;border:1px solid color-mix(in srgb,var(--p) 20%,transparent)}
.sec-h2{font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:800;color:#fff;letter-spacing:-1px;margin-bottom:.5rem}
.sec-sub{opacity:.45;max-width:500px;margin-bottom:3rem}

.course-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-top:2.5rem}
.course{background:var(--sf);border:1px solid rgba(255,255,255,.06);border-radius:18px;overflow:hidden;transition:.4s}
.course:hover{border-color:color-mix(in srgb,var(--p) 35%,transparent);transform:translateY(-6px);box-shadow:0 20px 50px rgba(0,0,0,.3)}
.course-img{height:180px;background:rgba(255,255,255,.03);overflow:hidden}
.course-img img{width:100%;height:100%;object-fit:cover;transition:transform .6s}.course:hover .course-img img{transform:scale(1.06)}
.course-body{padding:1.5rem}
.course-level{display:inline-block;font-size:.65rem;font-weight:700;letter-spacing:.5px;text-transform:uppercase;padding:.25rem .7rem;border-radius:6px;background:color-mix(in srgb,var(--p) 15%,transparent);color:var(--p);margin-bottom:.6rem}
.course h3{color:#fff;font-size:1.05rem;font-weight:700;margin-bottom:.4rem;line-height:1.3}
.course-meta{display:flex;justify-content:space-between;align-items:center;margin-top:.8rem;font-size:.78rem}
.course-meta .instructor{opacity:.55}.course-stars{display:flex;align-items:center;gap:2px}
.course-meta .lessons{opacity:.4;font-size:.75rem}

.stats-bar{display:grid;grid-template-columns:repeat(4,1fr);gap:2rem;padding:4rem 5%;border-top:1px solid rgba(255,255,255,.05);border-bottom:1px solid rgba(255,255,255,.05);background:var(--sf);text-align:center;position:relative;z-index:1}
.stat-val{font-size:clamp(2rem,4vw,3rem);font-weight:900;background:linear-gradient(135deg,var(--p),var(--p2));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.stat-label{font-size:.82rem;margin-top:.3rem;opacity:.5}

.feat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-top:2.5rem}
.feat{background:var(--sf);border:1px solid rgba(255,255,255,.05);border-radius:18px;padding:2rem;transition:.4s;position:relative;overflow:hidden}
.feat::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--p),var(--p2));transform:scaleX(0);transition:.4s;transform-origin:left}
.feat:hover::before{transform:scaleX(1)}.feat:hover{border-color:color-mix(in srgb,var(--p) 25%,transparent);transform:translateY(-4px)}
.feat-icon{width:48px;height:48px;border-radius:14px;background:linear-gradient(135deg,color-mix(in srgb,var(--p) 18%,transparent),color-mix(in srgb,var(--p2) 10%,transparent));display:flex;align-items:center;justify-content:center;font-size:1.3rem;margin-bottom:1.2rem}
.feat h3{color:#fff;font-size:1rem;font-weight:700;margin-bottom:.4rem}.feat p{font-size:.85rem;line-height:1.7;opacity:.45}

.instr-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-top:2.5rem}
.instr{background:var(--sf);border:1px solid rgba(255,255,255,.05);border-radius:18px;padding:2rem;text-align:center;transition:.4s}
.instr:hover{border-color:color-mix(in srgb,var(--p) 25%,transparent);transform:translateY(-4px)}
.instr-img{width:90px;height:90px;border-radius:50%;object-fit:cover;margin:0 auto 1.2rem;display:block;border:3px solid color-mix(in srgb,var(--p) 30%,transparent)}
.instr-ph{width:90px;height:90px;border-radius:50%;background:color-mix(in srgb,var(--p) 10%,transparent);margin:0 auto 1.2rem;display:flex;align-items:center;justify-content:center;font-size:2rem;color:var(--p);opacity:.3}
.instr h3{color:#fff;font-size:1.05rem;font-weight:700}.instr .role{font-size:.8rem;color:var(--p);margin:.3rem 0 .8rem;font-weight:600}.instr p{font-size:.85rem;opacity:.45;line-height:1.7}

.plans{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-top:2.5rem}
.plan{background:var(--sf);border:1px solid rgba(255,255,255,.06);border-radius:20px;padding:2.5rem;position:relative;transition:.3s}
.plan.ft{border-color:color-mix(in srgb,var(--p) 40%,transparent);box-shadow:0 0 60px color-mix(in srgb,var(--p) 12%,transparent)}
.plan.ft::before{content:attr(data-badge);position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,var(--p),var(--p2));color:#fff;font-size:.65rem;font-weight:700;padding:.35rem 1.2rem;border-radius:50px;letter-spacing:.5px}
.plan-name{font-size:.82rem;font-weight:700;color:var(--p);text-transform:uppercase;letter-spacing:1px;margin-bottom:.5rem}
.plan-price{font-size:3rem;font-weight:900;color:#fff;line-height:1}.plan-price span{font-size:.9rem;opacity:.4;font-weight:400}
.plan-period{font-size:.82rem;opacity:.35;margin-bottom:1.5rem}
.plan ul{list-style:none;margin-bottom:2rem}
.plan li{font-size:.84rem;padding:.45rem 0;display:flex;align-items:center;gap:.5rem;opacity:.6}
.plan li::before{content:'✓';color:var(--p);font-weight:700;font-size:.75rem}
.plan-btn{width:100%;padding:.85rem;border-radius:12px;font-weight:700;font-size:.9rem;border:none;cursor:pointer;transition:.3s}
.plan-btn.solid{background:linear-gradient(135deg,var(--p),var(--p2));color:#fff}.plan-btn.solid:hover{box-shadow:0 12px 35px color-mix(in srgb,var(--p) 35%,transparent)}
.plan-btn.outline{background:transparent;border:1px solid rgba(255,255,255,.15);color:#fff}.plan-btn.outline:hover{border-color:var(--p);color:var(--p)}

.cta-sec{text-align:center;padding:7rem 5%;position:relative;z-index:1}
.cta-box{max-width:700px;margin:0 auto;background:linear-gradient(135deg,color-mix(in srgb,var(--p) 12%,transparent),color-mix(in srgb,var(--p2) 8%,transparent));border:1px solid color-mix(in srgb,var(--p) 20%,transparent);border-radius:24px;padding:4rem 3rem}
.cta-box h2{font-size:clamp(1.8rem,3vw,2.5rem);font-weight:800;color:#fff;margin-bottom:1rem;letter-spacing:-.5px}
.cta-box p{opacity:.5;margin-bottom:2rem;max-width:450px;margin-left:auto;margin-right:auto}

footer{position:relative;z-index:1;display:flex;justify-content:space-between;align-items:center;padding:2rem 5%;border-top:1px solid rgba(255,255,255,.06);font-size:.8rem;flex-wrap:wrap;gap:1rem}
.ft-links{display:flex;gap:1.5rem}.ft-links a{opacity:.5;transition:.3s}.ft-links a:hover{opacity:1;color:var(--p)}

@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
${revealCss}

@media(max-width:1024px){.course-grid,.feat-grid,.instr-grid,.plans{grid-template-columns:1fr 1fr}.stats-bar{grid-template-columns:repeat(2,1fr)}}
@media(max-width:640px){nav ul{display:none}.course-grid,.feat-grid,.instr-grid,.plans,.stats-bar{grid-template-columns:1fr}.plan.ft{order:-1}footer{flex-direction:column;text-align:center}}
</style>
</head>
<body>

<div class="orb orb-1"></div><div class="orb orb-2"></div>

<nav>
<a href="#top" class="logo">${esc(s("brand","name")).replace(/^(\w)/,"<span>$1</span>")}</a>
<ul><a href="#courses">Courses</a><a href="#features">Features</a><a href="#pricing">Pricing</a></ul>
<a href="${safeUrl(s("brand","ctaUrl"))}" class="nav-cta">${esc(s("brand","cta"))}</a>
</nav>

<section class="hero" id="top">
<div class="hero-inner">
${s("hero","badge")?`<div class="badge rv">${esc(s("hero","badge"))}</div>`:""}
<h1 class="rv">${titleHtml}</h1>
<p class="sub rv">${esc(s("hero","subtitle"))}</p>
<div class="hero-btns rv">
<a href="${safeUrl(s("brand","ctaUrl"))}" class="btn-g">${esc(s("hero","btn1"))}</a>
${s("hero","btn2")?`<a href="#pricing" class="btn-o">${esc(s("hero","btn2"))}</a>`:""}
</div>
${s("hero","socialProof")?`<p class="social-proof rv">${esc(s("hero","socialProof"))}</p>`:""}
</div>
</section>

${r.on("stats")&&stats.length?`<div class="stats-bar">${stats.map((st,i)=>`<div class="rv${i?` d${Math.min(i,3)}`:""}" ><div class="stat-val">${esc(st.value)}${esc(st.suffix)}</div><div class="stat-label">${esc(st.label)}</div></div>`).join("")}</div>`:""}

${r.on("courses")&&courses.length?`
<div class="sec" id="courses">
<span class="sec-tag rv">${esc(s("courses","eyebrow"))}</span>
<h2 class="sec-h2 rv">${esc(s("courses","title"))}</h2>
<div class="course-grid">${courses.map((c,i)=>`<div class="course rv${i?` d${Math.min(i,3)}`:""}" >
<div class="course-img">${safeUrl(c.image)!=="#"?`<img src="${safeUrl(c.image)}" alt="${esc(c.title)}" loading="lazy">`:`<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:2rem;opacity:.15">📚</div>`}</div>
<div class="course-body">
<span class="course-level">${esc(c.level)}</span>
<h3>${esc(c.title)}</h3>
<div class="course-meta">
<span class="instructor">${esc(c.instructor)}</span>
<span class="lessons">${esc(c.lessons)} lessons</span>
</div>
<div class="course-meta" style="margin-top:.4rem"><div class="course-stars">${stars(c.rating)}</div><span style="opacity:.5;font-size:.75rem">${esc(c.rating)}</span></div>
</div>
</div>`).join("")}</div>
</div>`:""}

${r.on("features")&&features.length?`
<div class="sec" id="features">
<span class="sec-tag rv">${esc(s("features","eyebrow"))}</span>
<h2 class="sec-h2 rv">${esc(s("features","title"))}</h2>
<div class="feat-grid">${features.map((f,i)=>`<div class="feat rv${i?` d${Math.min(i,3)}`:""}" >
<div class="feat-icon">${esc(f.icon)}</div>
<h3>${esc(f.title)}</h3>
<p>${esc(f.desc)}</p>
</div>`).join("")}</div>
</div>`:""}

${r.on("instructors")&&instructors.length?`
<div class="sec" id="instructors">
<span class="sec-tag rv">${esc(s("instructors","eyebrow"))}</span>
<h2 class="sec-h2 rv">${esc(s("instructors","title"))}</h2>
<div class="instr-grid">${instructors.map((inst,i)=>`<div class="instr rv${i?` d${Math.min(i,3)}`:""}" >
${safeUrl(inst.image)!=="#"?`<img class="instr-img" src="${safeUrl(inst.image)}" alt="${esc(inst.name)}" loading="lazy">`:`<div class="instr-ph">👤</div>`}
<h3>${esc(inst.name)}</h3>
<div class="role">${esc(inst.role)}</div>
<p>${esc(inst.bio)}</p>
</div>`).join("")}</div>
</div>`:""}

${r.on("pricing")&&plans.length?`
<div class="sec" id="pricing">
<div style="text-align:center;margin-bottom:2rem">
<span class="sec-tag rv">${esc(s("pricing","eyebrow"))}</span>
<h2 class="sec-h2 rv">${esc(s("pricing","title"))}</h2>
</div>
<div class="plans">${plans.map((p,i)=>`<div class="plan${p.featured?" ft":""} rv${i?` d${Math.min(i,3)}`:""}" ${p.featured?`data-badge="${esc(p.featured)}"`:""}>
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
<a href="${safeUrl(s("brand","ctaUrl"))}" class="btn-g">${esc(s("cta","btn"))}</a>
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

export const motionNovaEdu: EditableTemplate = {
  id: "motion-nova-edu",
  name: "Nova — Learning Platform",
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
