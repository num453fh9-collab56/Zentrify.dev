import type { Content, EditableTemplate, Section } from "../editor/types";
import { csv, esc, previewScript, reader, revealCss, revealScript, safeColor, safeUrl } from "../editor/html";

const schema: Section[] = [
  {
    id: "brand",
    label: "Brand",
    fields: [
      { type: "text", key: "name", label: "Studio name" },
      { type: "text", key: "cta", label: "Nav CTA" },
      { type: "text", key: "ctaUrl", label: "CTA link", placeholder: "#contact" },
    ],
  },
  {
    id: "theme",
    label: "Colors",
    fields: [
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
      { type: "textarea", key: "title", label: "Headline", rows: 2, hint: "*stars* for accent text." },
      { type: "textarea", key: "subtitle", label: "Subtitle", rows: 2 },
      { type: "text", key: "btn", label: "CTA button" },
      { type: "text", key: "scrollLabel", label: "Scroll label", placeholder: "Explore work" },
    ],
  },
  {
    id: "gallery",
    label: "Gallery",
    toggleable: true,
    anchor: "gallery",
    fields: [
      { type: "text", key: "eyebrow", label: "Tag" },
      { type: "text", key: "title", label: "Heading" },
      {
        type: "list",
        key: "items",
        label: "Photos",
        itemLabel: "Photo",
        titleKey: "title",
        max: 9,
        newItem: { title: "Untitled", category: "Portrait", image: "" },
        fields: [
          { type: "text", key: "title", label: "Title" },
          { type: "text", key: "category", label: "Category" },
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
      { type: "text", key: "title", label: "Heading" },
      { type: "textarea", key: "bio", label: "Bio text", rows: 4 },
      { type: "image", key: "image", label: "Portrait photo" },
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
        newItem: { title: "Service", desc: "Description.", price: "From $500" },
        fields: [
          { type: "text", key: "title", label: "Title" },
          { type: "textarea", key: "desc", label: "Description", rows: 2 },
          { type: "text", key: "price", label: "Starting price" },
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
        label: "Testimonials",
        itemLabel: "Testimonial",
        titleKey: "name",
        max: 4,
        newItem: { quote: "Amazing work!", name: "Client Name", role: "Bride / CEO / etc." },
        fields: [
          { type: "textarea", key: "quote", label: "Quote", rows: 2 },
          { type: "text", key: "name", label: "Name" },
          { type: "text", key: "role", label: "Role / context" },
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
      { type: "text", key: "title", label: "Heading" },
      { type: "textarea", key: "desc", label: "Description", rows: 2 },
      { type: "text", key: "email", label: "Email" },
      { type: "text", key: "location", label: "Location" },
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
  enabled: { gallery: true, about: true, services: true, testimonials: true, contact: true },
  values: {
    brand: { name: "APERTURE", cta: "Book a Session", ctaUrl: "#contact" },
    theme: { accent: "#e11d48", bg: "#0a0a0a", surface: "#141414", text: "#777" },
    hero: {
      title: "Capturing moments that *last forever*",
      subtitle: "Award-winning photography studio specializing in portraiture, editorial, and commercial work.",
      btn: "View Portfolio",
      scrollLabel: "Explore work ↓",
    },
    gallery: {
      eyebrow: "Portfolio",
      title: "Selected work",
      items: [
        { title: "Golden Hour", category: "Portrait", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=750&fit=crop" },
        { title: "Urban Edge", category: "Editorial", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=400&fit=crop" },
        { title: "Stillness", category: "Fine Art", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=750&fit=crop" },
        { title: "Motion", category: "Commercial", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=400&fit=crop" },
        { title: "Raw Light", category: "Portrait", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=750&fit=crop" },
        { title: "Contrast", category: "Editorial", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=400&fit=crop" },
      ] as unknown as string,
    },
    about: {
      eyebrow: "About",
      title: "The eye behind the lens",
      bio: "With over a decade of experience capturing stories through imagery, I believe the best photographs are the ones that make you feel something. My work bridges fine art and commercial photography, always seeking that fleeting intersection of light, emotion, and authenticity.\n\nBased in New York, available worldwide.",
      image: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=500&h=600&fit=crop",
    },
    services: {
      eyebrow: "Services",
      title: "What I offer",
      items: [
        { title: "Portrait Sessions", desc: "Intimate, studio or on-location portrait sessions. Includes retouching and a curated gallery of 30+ images.", price: "From $800" },
        { title: "Editorial & Fashion", desc: "High-concept editorial shoots for magazines, brands, and creative directors. Full creative direction included.", price: "From $2,500" },
        { title: "Commercial", desc: "Product photography, brand campaigns, and corporate headshots. Licensing and usage rights negotiated per project.", price: "From $3,000" },
        { title: "Weddings & Events", desc: "Full-day documentary coverage with a second shooter, 500+ edited images, and a premium album.", price: "From $5,000" },
      ] as unknown as string,
    },
    testimonials: {
      items: [
        { quote: "Working with Aperture was effortless. They captured our brand's essence in ways we couldn't have imagined.", name: "Chloe Martin", role: "Creative Director, Luxe" },
        { quote: "The portraits were stunning — every frame told a story. My family keeps discovering new favorites.", name: "James Rivera", role: "Portrait Client" },
        { quote: "Professional, creative, and incredibly talented. The editorial spread exceeded every expectation.", name: "Nina Kowalski", role: "Editor, Vogue Living" },
      ] as unknown as string,
    },
    contact: {
      title: "Let's create something beautiful",
      desc: "Currently booking for 2025–2026. Reach out to discuss your vision.",
      email: "hello@aperture.studio",
      location: "New York, NY",
    },
    footer: { copy: "© 2025 Aperture Studio", links: "Instagram, Behance, LinkedIn" },
    seo: { title: "Aperture — Photography Studio", description: "Award-winning photography studio — portraiture, editorial, and commercial work." },
  },
};

const presets = {
  section: "theme",
  items: [
    { name: "Rose", swatch: ["#e11d48", "#0a0a0a", "#141414"], values: { accent: "#e11d48", bg: "#0a0a0a", surface: "#141414", text: "#777" } },
    { name: "Warm Gold", swatch: ["#d97706", "#0a0908", "#14120e"], values: { accent: "#d97706", bg: "#0a0908", surface: "#14120e", text: "#8a7d5a" } },
    { name: "Cool Blue", swatch: ["#2563eb", "#060810", "#0e1120"], values: { accent: "#2563eb", bg: "#060810", surface: "#0e1120", text: "#6b7da0" } },
    { name: "Monochrome", swatch: ["#ffffff", "#0a0a0a", "#141414"], values: { accent: "#ffffff", bg: "#0a0a0a", surface: "#141414", text: "#666" } },
  ],
};

function render(content: Content, options?: { preview?: { initialScroll: number; instant: boolean } }) {
  const r = reader(content);
  const s = r.str;
  const AC = safeColor(s("theme","accent"),"#e11d48");
  const BG = safeColor(s("theme","bg"),"#0a0a0a");
  const SF = safeColor(s("theme","surface"),"#141414");
  const TX = safeColor(s("theme","text"),"#777");
  const gallery = r.list("gallery","items");
  const services = r.list("services","items");
  const testimonials = r.list("testimonials","items");
  const footerLinks = csv(s("footer","links"));

  const titleHtml = esc(s("hero","title")).replace(/\*(.+?)\*/g, `<em>$1</em>`);

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
:root{--ac:${AC};--bg:${BG};--sf:${SF};--tx:${TX}}
html{scroll-behavior:smooth}
body{font-family:'Inter',system-ui,sans-serif;background:var(--bg);color:var(--tx);line-height:1.7;overflow-x:hidden}
a{text-decoration:none;color:inherit}

nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:1.5rem 3rem;display:flex;align-items:center;justify-content:space-between;mix-blend-mode:difference}
.n-name{font-size:.8rem;font-weight:800;letter-spacing:.25em;text-transform:uppercase;color:#fff}
.n-cta{font-size:.75rem;font-weight:600;color:#fff;border:1px solid rgba(255,255,255,.3);padding:.5rem 1.5rem;border-radius:100px;transition:.3s;letter-spacing:.05em}
.n-cta:hover{background:#fff;color:#000}

.hero{min-height:100vh;display:flex;flex-direction:column;justify-content:center;padding:8rem 3rem 4rem;position:relative}
.hero h1{font-size:clamp(2.8rem,6vw,5.5rem);font-weight:800;color:#fff;line-height:1.08;letter-spacing:-2px;max-width:900px}
.hero h1 em{font-style:normal;color:var(--ac)}
.hero .sub{font-size:1.05rem;max-width:500px;margin-top:1.5rem;line-height:1.8}
.hero-bottom{display:flex;justify-content:space-between;align-items:end;margin-top:auto;padding-top:3rem}
.hero-btn{display:inline-flex;align-items:center;gap:.5rem;padding:.9rem 2.5rem;background:var(--ac);color:#fff;font-weight:700;font-size:.9rem;border-radius:100px;border:none;cursor:pointer;transition:.3s}
.hero-btn:hover{transform:scale(1.05);box-shadow:0 10px 40px color-mix(in srgb,var(--ac) 35%,transparent)}
.hero-scroll{font-size:.7rem;letter-spacing:.15em;text-transform:uppercase}

.sec{max-width:1200px;margin:0 auto;padding:7rem 3rem}
.sec-tag{font-size:.7rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--ac);margin-bottom:1rem;display:block}
.sec-h2{font-size:clamp(2rem,3.5vw,3rem);font-weight:800;color:#fff;letter-spacing:-1px;line-height:1.1}

/* ─── Gallery ─── */
.gal-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-top:3rem}
.gal-item{position:relative;overflow:hidden;border-radius:12px;cursor:pointer;background:var(--sf)}
.gal-item.tall{grid-row:span 2}
.gal-item img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .7s cubic-bezier(.2,.7,.2,1),filter .5s}
.gal-item:hover img{transform:scale(1.06);filter:brightness(.7)}
.gal-overlay{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:end;padding:1.5rem;opacity:0;transition:opacity .4s;background:linear-gradient(to top,rgba(0,0,0,.6),transparent 50%)}
.gal-item:hover .gal-overlay{opacity:1}
.gal-overlay h3{color:#fff;font-size:1.1rem;font-weight:700}
.gal-overlay span{font-size:.8rem;color:var(--ac);font-weight:500;margin-top:.2rem}
.gal-ph{width:100%;aspect-ratio:3/4;display:flex;align-items:center;justify-content:center;font-size:2.5rem;color:var(--ac);opacity:.15}
.gal-item:not(.tall) .gal-ph{aspect-ratio:3/2}

/* ─── About ─── */
.about-grid{display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;margin-top:3rem}
.about-img{width:100%;aspect-ratio:5/6;object-fit:cover;border-radius:16px}
.about-ph{width:100%;aspect-ratio:5/6;border-radius:16px;background:var(--sf);display:flex;align-items:center;justify-content:center;font-size:3rem;color:var(--ac);opacity:.15}
.about-bio{font-size:1rem;line-height:1.9;white-space:pre-line}

/* ─── Services ─── */
.svc-list{margin-top:3rem;border-top:1px solid rgba(255,255,255,.08)}
.svc{display:grid;grid-template-columns:1fr auto;gap:2rem;align-items:start;padding:2rem 0;border-bottom:1px solid rgba(255,255,255,.08);transition:background .3s;cursor:default}
.svc:hover{background:var(--sf);margin:0 -3rem;padding-left:3rem;padding-right:3rem}
.svc h3{color:#fff;font-size:1.15rem;font-weight:700}.svc p{font-size:.88rem;line-height:1.7;margin-top:.4rem;max-width:600px}
.svc-price{font-size:.9rem;font-weight:700;color:var(--ac);white-space:nowrap}

/* ─── Testimonials ─── */
.testi-list{margin-top:3rem}
.testi{padding:2.5rem 0;border-bottom:1px solid rgba(255,255,255,.06)}
.testi q{display:block;font-size:clamp(1.1rem,2vw,1.4rem);font-style:italic;color:rgba(255,255,255,.8);line-height:1.7;max-width:750px}
.testi-meta{display:flex;gap:.5rem;align-items:baseline;margin-top:1rem}
.testi-name{font-weight:700;color:#fff;font-size:.9rem}
.testi-role{font-size:.8rem}

/* ─── Contact ─── */
.contact-sec{text-align:center}
.contact-h{font-size:clamp(2.5rem,5vw,4rem);font-weight:800;color:#fff;letter-spacing:-1.5px;margin-bottom:1.5rem;line-height:1.1}
.contact-desc{max-width:450px;margin:0 auto 2rem}
.contact-info{display:flex;gap:2.5rem;justify-content:center;margin-top:2rem;font-size:.9rem;flex-wrap:wrap}

footer{display:flex;justify-content:space-between;align-items:center;padding:2rem 3rem;border-top:1px solid rgba(255,255,255,.06);font-size:.8rem;flex-wrap:wrap;gap:1rem}
.ft-social{display:flex;gap:1.5rem}.ft-social a{font-weight:500;transition:color .3s}.ft-social a:hover{color:var(--ac)}

${revealCss}
@media(max-width:768px){
nav{padding:1rem 1.5rem}
.hero{padding:6rem 1.5rem 3rem}
.sec{padding:5rem 1.5rem}
.gal-grid{grid-template-columns:1fr 1fr}
.gal-item.tall{grid-row:auto}
.about-grid{grid-template-columns:1fr;gap:2rem}
.svc:hover{margin:0;padding-left:0;padding-right:0}
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
<h1 class="rv">${titleHtml}</h1>
<p class="sub rv">${esc(s("hero","subtitle"))}</p>
<div class="hero-bottom">
<a href="#gallery" class="hero-btn rv">${esc(s("hero","btn"))}</a>
${s("hero","scrollLabel")?`<span class="hero-scroll rv">${esc(s("hero","scrollLabel"))}</span>`:""}
</div>
</section>

${r.on("gallery")&&gallery.length?`<section class="sec" id="gallery">
<span class="sec-tag rv">${esc(s("gallery","eyebrow"))}</span>
<h2 class="sec-h2 rv">${esc(s("gallery","title"))}</h2>
<div class="gal-grid">${gallery.map((p,i)=>{
  const tall = i % 3 === 0;
  return `<div class="gal-item${tall?" tall":""} rv${i?` d${Math.min(i%4,3)}`:""}" >
${safeUrl(p.image)!=="#"?`<img src="${safeUrl(p.image)}" alt="${esc(p.title)}" loading="lazy">`:`<div class="gal-ph">◎</div>`}
<div class="gal-overlay"><h3>${esc(p.title)}</h3><span>${esc(p.category)}</span></div>
</div>`;
}).join("")}</div>
</section>`:""}

${r.on("about")?`<section class="sec" id="about">
<span class="sec-tag rv">${esc(s("about","eyebrow"))}</span>
<h2 class="sec-h2 rv">${esc(s("about","title"))}</h2>
<div class="about-grid">
<div class="rv">
${safeUrl(s("about","image"))!=="#"?`<img class="about-img" src="${safeUrl(s("about","image"))}" alt="Photographer" loading="lazy">`:`<div class="about-ph">◎</div>`}
</div>
<div class="about-bio rv d1">${esc(s("about","bio"))}</div>
</div>
</section>`:""}

${r.on("services")&&services.length?`<section class="sec" id="services">
<span class="sec-tag rv">${esc(s("services","eyebrow"))}</span>
<h2 class="sec-h2 rv">${esc(s("services","title"))}</h2>
<div class="svc-list">${services.map((sv,i)=>`<div class="svc rv${i?` d${Math.min(i,3)}`:""}" >
<div><h3>${esc(sv.title)}</h3><p>${esc(sv.desc)}</p></div>
<div class="svc-price">${esc(sv.price)}</div>
</div>`).join("")}</div>
</section>`:""}

${r.on("testimonials")&&testimonials.length?`<section class="sec" id="testimonials">
<div class="testi-list">${testimonials.map((t,i)=>`<div class="testi rv${i?` d${Math.min(i,3)}`:""}" >
<q>${esc(t.quote)}</q>
<div class="testi-meta"><span class="testi-name">${esc(t.name)}</span><span class="testi-role">— ${esc(t.role)}</span></div>
</div>`).join("")}</div>
</section>`:""}

${r.on("contact")?`<section class="sec contact-sec" id="contact">
<h2 class="contact-h rv">${esc(s("contact","title"))}</h2>
<p class="contact-desc rv">${esc(s("contact","desc"))}</p>
<a href="${s("contact","email")?`mailto:${esc(s("contact","email"))}`:safeUrl(s("brand","ctaUrl"))}" class="hero-btn rv">${esc(s("brand","cta"))}</a>
<div class="contact-info rv d1">
${s("contact","email")?`<span>${esc(s("contact","email"))}</span>`:""}
${s("contact","location")?`<span>${esc(s("contact","location"))}</span>`:""}
</div>
</section>`:""}

<footer>
<span>${esc(s("footer","copy"))}</span>
${footerLinks.length?`<div class="ft-social">${footerLinks.map(l=>`<a href="#">${esc(l)}</a>`).join("")}</div>`:""}
</footer>

${revealScript}
</body>
</html>`;
}

export const motionAperturePhoto: EditableTemplate = {
  id: "motion-aperture-photo",
  name: "Aperture — Photo Studio",
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
