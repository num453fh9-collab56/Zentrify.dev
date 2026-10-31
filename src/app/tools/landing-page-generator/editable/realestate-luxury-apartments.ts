import type { Content, EditableTemplate, Item, Section } from "../editor/types";
import { csv, esc, lines, previewScript, reader, revealCss, revealScript, safeColor, safeUrl } from "../editor/html";

const U = (id: string, size: string) => `https://images.unsplash.com/${id}?${size}&fit=crop&auto=format&q=80`;

const schema: Section[] = [
  {
    id: "brand",
    label: "Brand",
    description: "Property name, tagline and booking button.",
    fields: [
      { type: "text", key: "name", label: "Property name" },
      { type: "text", key: "tagline", label: "Tagline", hint: "Shown below the logo in small caps." },
      { type: "text", key: "cta", label: "Booking button text" },
    ],
  },
  {
    id: "theme",
    label: "Colors & fonts",
    fields: [
      { type: "color", key: "gold", label: "Accent (gold)" },
      { type: "color", key: "goldLight", label: "Accent hover" },
      { type: "color", key: "dark", label: "Background" },
      { type: "color", key: "darkAlt", label: "Card / section background" },
      { type: "color", key: "cream", label: "Headings" },
      { type: "color", key: "text", label: "Body text" },
    ],
  },
  {
    id: "hero",
    label: "Hero",
    anchor: "top",
    fields: [
      { type: "image", key: "bgImage", label: "Background image" },
      { type: "text", key: "tags", label: "Top tags", hint: "Comma-separated, e.g. Transparent, Efficient, Verified" },
      { type: "textarea", key: "title", label: "Headline", rows: 2, hint: "Wrap words in *stars* to highlight them in gold italic." },
      { type: "text", key: "suiteNumber", label: "Suite number badge", placeholder: "01" },
      { type: "text", key: "suiteTitle", label: "Suite title", placeholder: "BHK" },
      { type: "text", key: "suiteSubtitle", label: "Suite subtitle", placeholder: "Premium Suites" },
      { type: "textarea", key: "desc", label: "Description", rows: 3 },
      { type: "textarea", key: "features", label: "Feature bullets", rows: 4, hint: "One per line." },
    ],
  },
  {
    id: "heroCard",
    label: "Hero card",
    toggleable: true,
    anchor: "top",
    fields: [
      { type: "text", key: "cardTitle", label: "Card title" },
      { type: "text", key: "cardBadge", label: "Badge text", placeholder: "694 sq/ft" },
      { type: "image", key: "cardImage", label: "Card image" },
      {
        type: "list",
        key: "dimensions",
        label: "Room dimensions",
        itemLabel: "Room",
        titleKey: "label",
        min: 1,
        max: 6,
        newItem: { size: "10' x 10'", label: "Room" },
        fields: [
          { type: "text", key: "size", label: "Size" },
          { type: "text", key: "label", label: "Label" },
        ],
      },
    ],
  },
  {
    id: "stats",
    label: "Stats bar",
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
        max: 6,
        newItem: { value: "100+", label: "Your stat" },
        fields: [
          { type: "text", key: "value", label: "Number" },
          { type: "text", key: "label", label: "Label" },
        ],
      },
    ],
  },
  {
    id: "suites",
    label: "Suites / Residences",
    toggleable: true,
    anchor: "suites",
    fields: [
      { type: "text", key: "eyebrow", label: "Small heading" },
      { type: "text", key: "title", label: "Heading" },
      { type: "text", key: "subtitle", label: "Subtitle" },
      {
        type: "list",
        key: "items",
        label: "Suite cards",
        itemLabel: "Suite",
        titleKey: "name",
        max: 6,
        newItem: { name: "Suite", area: "500 sq/ft", tags: "Bedroom, Bath, Lounge", price: "$100,000", priceNote: "starting", status: "Available", statusColor: "green", image: "" },
        fields: [
          { type: "text", key: "name", label: "Name" },
          { type: "text", key: "area", label: "Area" },
          { type: "text", key: "tags", label: "Tags", hint: "Comma-separated." },
          { type: "text", key: "price", label: "Price" },
          { type: "text", key: "priceNote", label: "Price note", placeholder: "starting" },
          { type: "text", key: "status", label: "Status", placeholder: "Available" },
          {
            type: "select",
            key: "statusColor",
            label: "Status color",
            options: [
              { value: "green", label: "Green — Available" },
              { value: "amber", label: "Amber — Few Left" },
              { value: "red", label: "Red — Sold Out" },
            ],
          },
          { type: "image", key: "image", label: "Photo" },
        ],
      },
    ],
  },
  {
    id: "amenities",
    label: "Amenities",
    toggleable: true,
    anchor: "amen",
    fields: [
      { type: "text", key: "eyebrow", label: "Small heading" },
      { type: "text", key: "title", label: "Heading" },
      { type: "text", key: "subtitle", label: "Subtitle" },
      {
        type: "list",
        key: "items",
        label: "Amenities",
        itemLabel: "Amenity",
        titleKey: "name",
        max: 12,
        newItem: { icon: "✨", name: "Amenity", desc: "Short description" },
        fields: [
          { type: "text", key: "icon", label: "Icon (emoji)" },
          { type: "text", key: "name", label: "Name" },
          { type: "text", key: "desc", label: "Description" },
        ],
      },
    ],
  },
  {
    id: "booking",
    label: "Booking form",
    toggleable: true,
    anchor: "book",
    fields: [
      { type: "text", key: "eyebrow", label: "Small heading" },
      { type: "text", key: "title", label: "Heading" },
      { type: "text", key: "subtitle", label: "Subtitle" },
      { type: "text", key: "suiteOptions", label: "Suite type options", hint: "Comma-separated." },
      { type: "text", key: "planOptions", label: "Payment plan options", hint: "Comma-separated." },
      { type: "text", key: "button", label: "Submit button text" },
      { type: "email", key: "sendTo", label: "Send inquiries to", hint: "Email address. Guests' inquiry opens their email app addressed to you." },
    ],
  },
  {
    id: "footer",
    label: "Footer & WhatsApp",
    fields: [
      { type: "text", key: "copyright", label: "Copyright text" },
      { type: "text", key: "links", label: "Footer links", hint: "Comma-separated." },
      { type: "text", key: "whatsapp", label: "WhatsApp number", placeholder: "+92 300 1234567", hint: "Shows a floating WhatsApp chat button." },
    ],
  },
  {
    id: "seo",
    label: "Page settings (SEO)",
    description: "How the page appears in Google and in the browser tab.",
    fields: [
      { type: "text", key: "title", label: "Page title" },
      { type: "textarea", key: "description", label: "Search description", rows: 3, hint: "About 150 characters works best." },
    ],
  },
];

const defaults: Content = {
  enabled: { heroCard: true, stats: true, suites: true, amenities: true, booking: true },
  values: {
    brand: { name: "Autograph", tagline: "Serviced Apartments", cta: "Book Now" },
    theme: { gold: "#c4a35a", goldLight: "#ddc07a", dark: "#07060a", darkAlt: "#0e0d13", cream: "#f3ecd8", text: "#9a917e" },
    hero: {
      bgImage: U("photo-1522708323590-d24dbb6b0267", "w=1600&h=1000"),
      tags: "Transparent, Efficient, Verified",
      title: "Autograph *2.0*",
      suiteNumber: "01",
      suiteTitle: "BHK",
      suiteSubtitle: "Premium Suites",
      desc: "Each one bedroom apartment covers 694 sq/ft with premium finishes and smart-home automation throughout.",
      features: "Master Bedroom\nAttached Bathroom\nSpacious Lounge\nModern Kitchen\nPowder Room\nPrivate Balcony",
    },
    heroCard: {
      cardTitle: "Floor Plan — 1 BHK",
      cardBadge: "694 sq/ft",
      cardImage: U("photo-1600607687939-ce8a6c25118c", "w=600&h=450"),
      dimensions: [
        { size: "14' x 11'", label: "Bedroom" },
        { size: "8' x 7'6\"", label: "Bathroom" },
        { size: "13' x 10'", label: "Lounge" },
        { size: "9'6\" x 6'", label: "Kitchen" },
      ],
    },
    stats: {
      items: [
        { value: "3.5 Yr", label: "Payment Plan" },
        { value: "5%", label: "Booking Only" },
        { value: "694+", label: "Sq/ft Starting" },
        { value: "100%", label: "Govt Approved" },
      ],
    },
    suites: {
      eyebrow: "Residences",
      title: "Choose Your Suite",
      subtitle: "Premium, Platinum & Royal — crafted for modern living",
      items: [
        { name: "1 BHK Premium", area: "694 sq/ft covered area", tags: "Bedroom, Bath, Lounge, Kitchen, Balcony", price: "$85,000", priceNote: "starting", status: "Sold Out", statusColor: "red", image: U("photo-1560448204-e02f11c3d0e2", "w=600&h=380") },
        { name: "2 BHK Platinum", area: "1,100 sq/ft covered area", tags: "2 Beds, 2 Baths, Lounge, Kitchen, Balcony", price: "$140,000", priceNote: "starting", status: "Few Left", statusColor: "amber", image: U("photo-1502672260266-1c1ef2d93688", "w=600&h=380") },
        { name: "3 BHK Royal", area: "1,650 sq/ft covered area", tags: "3 Beds, 3 Baths, Lounge, Kitchen, 2 Balconies", price: "$210,000", priceNote: "starting", status: "Available", statusColor: "green", image: U("photo-1600596542815-ffad4c1539a9", "w=600&h=380") },
      ],
    },
    amenities: {
      eyebrow: "Amenities",
      title: "World-Class Living",
      subtitle: "Smart automated building with premium lifestyle features",
      items: [
        { icon: "🏊", name: "Infinity Pool", desc: "Rooftop pool with city views" },
        { icon: "💪", name: "Fitness Center", desc: "Fully equipped modern gym" },
        { icon: "🏡", name: "Sky Garden", desc: "Landscaped terraces & BBQ" },
        { icon: "🔒", name: "24/7 Security", desc: "Biometric & CCTV access" },
        { icon: "🅿️", name: "Parking", desc: "Dedicated covered spaces" },
        { icon: "⚡", name: "Smart Home", desc: "Automated lighting & AC" },
        { icon: "🎮", name: "Recreation", desc: "Gaming & entertainment lounge" },
        { icon: "🛎️", name: "Concierge", desc: "24/7 front desk service" },
      ],
    },
    booking: {
      eyebrow: "Booking Inquiry",
      title: "Reserve Your Suite",
      subtitle: "Secure your apartment today — only 5% down payment.",
      suiteOptions: "1 BHK Premium, 2 BHK Platinum, 3 BHK Royal, Penthouse",
      planOptions: "Full Payment, 1 Year, 2 Year, 3.5 Year",
      button: "Submit Inquiry",
      sendTo: "",
    },
    footer: { copyright: "© 2026 Autograph Serviced Apartments", links: "Residences, Amenities, Gallery, Contact", whatsapp: "" },
    seo: {
      title: "Autograph 2.0 — Luxury Serviced Apartments",
      description: "Premium serviced apartments with smart-home automation, world-class amenities and flexible payment plans. Reserve your suite today.",
    },
  },
};

const presets = {
  section: "theme",
  items: [
    { name: "Gold", swatch: ["#07060a", "#c4a35a"], values: { gold: "#c4a35a", goldLight: "#ddc07a", dark: "#07060a", darkAlt: "#0e0d13", cream: "#f3ecd8", text: "#9a917e" } },
    { name: "Silver", swatch: ["#0a0a10", "#a0a8b8"], values: { gold: "#a0a8b8", goldLight: "#c0c8d8", dark: "#0a0a10", darkAlt: "#111118", cream: "#e8eaf0", text: "#8088a0" } },
    { name: "Rose Gold", swatch: ["#0c0808", "#c89080"], values: { gold: "#c89080", goldLight: "#daa898", dark: "#0c0808", darkAlt: "#141010", cream: "#f5ece8", text: "#a09088" } },
    { name: "Emerald", swatch: ["#060c0a", "#5aaa80"], values: { gold: "#5aaa80", goldLight: "#78c8a0", dark: "#060c0a", darkAlt: "#0c1410", cream: "#e8f3ed", text: "#7e9a8e" } },
    { name: "Ivory", swatch: ["#f8f4ee", "#8a7040"], values: { gold: "#8a7040", goldLight: "#a08850", dark: "#f8f4ee", darkAlt: "#eee8de", cream: "#1a1810", text: "#6a6050" } },
  ],
};

const buildingSvg = `<svg viewBox="0 0 24 24"><path d="M3 21V7l9-4 9 4v14H3zm2-2h14V8l-7-3.1L5 8v11zm3-2h8v-2H8v2zm0-4h8v-2H8v2z"/></svg>`;
const whatsappSvg = `<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.339 0-4.508-.767-6.258-2.064l-.438-.335-3.102 1.04 1.04-3.102-.335-.438A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>`;

function emphGold(s: string) {
  return esc(s).replace(/\*(.+?)\*/g, "<em>$1</em>");
}

function render(c: Content, options: Parameters<EditableTemplate["render"]>[1] = {}) {
  const r = reader(c);
  const s = r.str;
  const d = defaults.values;
  const col = (key: string) => safeColor(s("theme", key), d.theme[key] as string);
  const gold = col("gold");
  const goldLight = col("goldLight");
  const dark = col("dark");
  const darkAlt = col("darkAlt");
  const cream = col("cream");
  const textCol = col("text");
  const name = s("brand", "name") || "Property";
  const tagline = s("brand", "tagline");
  const ctaText = esc(s("brand", "cta") || "Book Now");
  const heroTags = csv(s("hero", "tags"));
  const heroFeatures = lines(s("hero", "features"));
  const statsItems = r.list("stats", "items").slice(0, 6);
  const suiteItems = r.list("suites", "items");
  const amenItems = r.list("amenities", "items");
  const dims = r.list("heroCard", "dimensions");
  const suiteOpts = csv(s("booking", "suiteOptions"));
  const planOpts = csv(s("booking", "planOptions"));
  const footerLinks = csv(s("footer", "links"));
  const whatsapp = s("footer", "whatsapp").replace(/\D/g, "");
  const heroImg = safeUrl(s("hero", "bgImage"), d.hero.bgImage as string);
  const cardImg = safeUrl(s("heroCard", "cardImage"), "");
  const bookHref = r.on("booking") ? "#book" : "#top";

  const navLinks = [
    ["suites", "Residences"],
    ["amen", "Amenities"],
    ["book", "Booking"],
  ].filter(([id]) => {
    if (id === "suites") return r.on("suites");
    if (id === "amen") return r.on("amenities");
    if (id === "book") return r.on("booking");
    return true;
  }).map(([id, label]) => `<li><a href="#${id}">${label}</a></li>`).join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${esc(s("seo", "title") || name)}</title>
<meta name="description" content="${esc(s("seo", "description"))}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
${previewScript(options?.preview)}
${revealScript}
<style>
:root{--g:${gold};--gl:${goldLight};--d:${dark};--da:${darkAlt};--c:${cream};--t:${textCol}}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;background:var(--d);color:var(--t);overflow-x:hidden}
a{text-decoration:none;color:inherit}
:focus-visible{outline:2px solid var(--g);outline-offset:3px}
${revealCss}

nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:.9rem 5%;background:color-mix(in srgb,var(--d) 92%,transparent);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);border-bottom:1px solid color-mix(in srgb,var(--g) 6%,transparent)}
.logo{display:flex;align-items:center;gap:.6rem}
.logo-mark{width:38px;height:38px;border:1.5px solid var(--g);border-radius:4px;display:grid;place-items:center}
.logo-mark svg{width:20px;height:20px;fill:var(--g)}
.logo-name{font-family:'Playfair Display',serif;font-size:1.25rem;font-weight:700;color:var(--c);line-height:1.1}
.logo-tag{font-size:.48rem;text-transform:uppercase;letter-spacing:3px;color:var(--g);opacity:.65}
nav ul{list-style:none;display:flex;gap:2rem}
nav ul a{font-size:.68rem;font-weight:500;text-transform:uppercase;letter-spacing:1.5px;opacity:.4;transition:.25s}
nav ul a:hover{opacity:1;color:var(--g)}
.nav-cta{background:var(--g);color:var(--d);padding:.55rem 1.3rem;font-size:.65rem;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;border:none;cursor:pointer;transition:.25s}
.nav-cta:hover{background:var(--gl)}

.hero{min-height:100vh;min-height:100svh;position:relative;display:flex;align-items:center}
.hero-bg{position:absolute;inset:0}
.hero-bg img{width:100%;height:100%;object-fit:cover;opacity:.3}
.hero-bg::after{content:'';position:absolute;inset:0;background:linear-gradient(100deg,var(--d) 32%,color-mix(in srgb,var(--d) 70%,transparent) 60%,color-mix(in srgb,var(--d) 50%,transparent))}
.hero-in{position:relative;z-index:2;max-width:1260px;margin:0 auto;padding:7rem 5% 4rem;display:grid;grid-template-columns:1.1fr .9fr;gap:3.5rem;align-items:center;width:100%}
.h-tag{font-size:.6rem;text-transform:uppercase;letter-spacing:4px;color:var(--g);opacity:.65;margin-bottom:1.6rem;display:flex;gap:1.2rem;flex-wrap:wrap}
.h-tag span:not(:last-child)::after{content:'|';margin-left:1.2rem;opacity:.3}
.hero-in h1{font-family:'Playfair Display',serif;font-size:3.6rem;font-weight:800;color:var(--c);line-height:1.06;margin-bottom:.6rem}
.hero-in h1 em{color:var(--g);font-style:italic}
.h-suite{display:flex;align-items:baseline;gap:.8rem;margin-bottom:.8rem}
.h-suite .big{font-family:'Playfair Display',serif;font-size:4.2rem;font-weight:300;color:var(--g);opacity:.22;line-height:1}
.h-suite h2{font-family:'Playfair Display',serif;font-size:1.5rem;color:var(--c);font-weight:600}
.h-suite h2 span{display:block;font-size:1rem;font-weight:400;opacity:.55}
.h-desc{font-size:.84rem;opacity:.45;line-height:1.8;margin-bottom:1.4rem;max-width:400px}
.h-feats{list-style:none;display:grid;grid-template-columns:1fr 1fr;gap:.45rem .8rem;margin-bottom:1.8rem}
.h-feats li{font-size:.78rem;color:var(--c);opacity:.6;display:flex;align-items:center;gap:.6rem}
.h-feats li::before{content:'';width:5px;height:5px;background:var(--g);border-radius:50%;flex-shrink:0}
.btn-book{display:inline-block;background:var(--g);color:var(--d);padding:.9rem 2.2rem;font-size:.72rem;font-weight:600;letter-spacing:2px;text-transform:uppercase;border:none;cursor:pointer;transition:.25s}
.btn-book:hover{background:var(--gl);box-shadow:0 12px 35px color-mix(in srgb,var(--g) 25%,transparent)}

.h-card{background:rgba(255,255,255,.03);backdrop-filter:blur(16px);border:1px solid color-mix(in srgb,var(--g) 8%,transparent);border-radius:14px;padding:1.6rem;position:relative}
.h-card .hc-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:1.2rem}
.h-card .hc-top span:first-child{font-family:'Playfair Display',serif;font-size:1.1rem;color:var(--c);font-weight:600}
.h-card .hc-badge{background:color-mix(in srgb,var(--g) 10%,transparent);color:var(--g);padding:.22rem .65rem;font-size:.58rem;font-weight:600;letter-spacing:1px;text-transform:uppercase;border-radius:3px}
.h-card .hc-img{width:100%;aspect-ratio:4/3;border-radius:8px;overflow:hidden;margin-bottom:1.2rem;border:1px solid color-mix(in srgb,var(--g) 4%,transparent)}
.h-card .hc-img img{width:100%;height:100%;object-fit:cover}
.hc-grid{display:grid;grid-template-columns:1fr 1fr;gap:.6rem}
.hc-cell{background:color-mix(in srgb,var(--g) 3%,transparent);border:1px solid color-mix(in srgb,var(--g) 6%,transparent);border-radius:6px;padding:.6rem;text-align:center}
.hc-cell b{display:block;font-family:'Playfair Display',serif;font-size:.95rem;color:var(--c);font-weight:600}
.hc-cell small{font-size:.55rem;text-transform:uppercase;letter-spacing:1.5px;opacity:.35}

.stats-bar{border-top:1px solid color-mix(in srgb,var(--g) 6%,transparent);border-bottom:1px solid color-mix(in srgb,var(--g) 6%,transparent);background:var(--da)}
.stats-in{max-width:1260px;margin:0 auto;display:grid;grid-template-columns:repeat(var(--n,4),1fr);padding:0}
.st{text-align:center;padding:2rem 1rem;position:relative}
.st:not(:last-child)::after{content:'';position:absolute;right:0;top:25%;height:50%;width:1px;background:color-mix(in srgb,var(--g) 8%,transparent)}
.st b{display:block;font-family:'Playfair Display',serif;font-size:1.8rem;color:var(--c);font-weight:600}
.st span{font-size:.6rem;text-transform:uppercase;letter-spacing:2px;opacity:.35;margin-top:.15rem;display:block}

.suites{padding:5rem 5%;max-width:1260px;margin:0 auto}
.sh{text-align:center;margin-bottom:3rem}
.sh .ey{font-size:.6rem;text-transform:uppercase;letter-spacing:5px;color:var(--g);margin-bottom:.6rem}
.sh h2{font-family:'Playfair Display',serif;font-size:2.4rem;font-weight:700;color:var(--c)}
.sh p{font-size:.88rem;opacity:.3;margin-top:.3rem;font-style:italic;font-family:'Playfair Display',serif}
.s-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.2rem}
.s-card{background:var(--da);border:1px solid color-mix(in srgb,var(--g) 5%,transparent);border-radius:12px;overflow:hidden;transition:.35s}
.s-card:hover{border-color:color-mix(in srgb,var(--g) 20%,transparent);transform:translateY(-6px);box-shadow:0 20px 45px rgba(0,0,0,.35)}
.s-card .s-img{aspect-ratio:16/10;overflow:hidden}
.s-card .s-img img{width:100%;height:100%;object-fit:cover;transition:.4s}
.s-card:hover .s-img img{transform:scale(1.04)}
.s-card .s-body{padding:1.3rem}
.s-card .s-head{display:flex;align-items:baseline;gap:.5rem;margin-bottom:.4rem}
.s-card .s-head h3{font-family:'Playfair Display',serif;font-size:1.05rem;color:var(--c);font-weight:600}
.s-card .s-area{font-size:.7rem;opacity:.35;margin-bottom:.8rem}
.s-tags{display:flex;flex-wrap:wrap;gap:.35rem;margin-bottom:1rem}
.s-tags span{font-size:.6rem;padding:.2rem .55rem;border:1px solid color-mix(in srgb,var(--g) 8%,transparent);border-radius:50px;color:var(--g);opacity:.6}
.s-foot{display:flex;justify-content:space-between;align-items:center;padding-top:.8rem;border-top:1px solid color-mix(in srgb,var(--g) 5%,transparent)}
.s-foot .pr{font-family:'Playfair Display',serif;font-size:1.15rem;color:var(--g);font-weight:600}
.s-foot .pr small{font-size:.6rem;opacity:.5;font-weight:400;font-family:'Inter',sans-serif}
.badge-av{font-size:.55rem;text-transform:uppercase;letter-spacing:.8px;padding:.2rem .6rem;border-radius:3px;font-weight:600}
.badge-av.green{background:rgba(76,175,80,.08);color:#4caf50;border:1px solid rgba(76,175,80,.15)}
.badge-av.amber{background:rgba(255,152,0,.08);color:#ff9800;border:1px solid rgba(255,152,0,.15)}
.badge-av.red{background:rgba(244,67,54,.08);color:#f44336;border:1px solid rgba(244,67,54,.15)}

.amen{padding:5rem 5%;background:var(--da)}
.amen-in{max-width:1260px;margin:0 auto}
.a-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem}
.a-item{background:color-mix(in srgb,var(--g) 2%,transparent);border:1px solid color-mix(in srgb,var(--g) 4%,transparent);border-radius:10px;padding:1.4rem 1.2rem;text-align:center;transition:.25s}
.a-item:hover{border-color:color-mix(in srgb,var(--g) 15%,transparent);transform:translateY(-3px)}
.a-item .ai{width:44px;height:44px;margin:0 auto .6rem;background:color-mix(in srgb,var(--g) 5%,transparent);border:1px solid color-mix(in srgb,var(--g) 8%,transparent);border-radius:10px;display:grid;place-items:center;font-size:1.15rem}
.a-item h4{font-size:.82rem;color:var(--c);font-weight:600;margin-bottom:.15rem}
.a-item p{font-size:.65rem;opacity:.3;line-height:1.5}

.book{padding:5rem 5%}
.book-in{max-width:620px;margin:0 auto;text-align:center}
.book-in h2{font-family:'Playfair Display',serif;font-size:2.2rem;font-weight:700;color:var(--c);margin-bottom:.3rem}
.book-in>p{font-size:.88rem;opacity:.3;margin-bottom:2rem;font-style:italic;font-family:'Playfair Display',serif}
.bf{display:grid;grid-template-columns:1fr 1fr;gap:.8rem}
.bf input,.bf select{background:color-mix(in srgb,var(--g) 3%,transparent);border:1px solid color-mix(in srgb,var(--g) 8%,transparent);padding:.85rem 1rem;font-family:'Inter',sans-serif;font-size:.8rem;color:var(--c);outline:none;border-radius:6px;transition:.2s}
.bf input:focus,.bf select:focus{border-color:var(--g)}
.bf input::placeholder{color:color-mix(in srgb,var(--t) 35%,transparent)}
.bf select{color:var(--t)}
.bf select option{background:var(--d);color:var(--c)}
.bf .full{grid-column:1/-1}
.bf button{grid-column:1/-1;background:var(--g);color:var(--d);padding:.95rem;font-family:'Inter',sans-serif;font-size:.75rem;font-weight:600;letter-spacing:2px;text-transform:uppercase;border:none;cursor:pointer;border-radius:6px;transition:.25s}
.bf button:hover{background:var(--gl);box-shadow:0 8px 28px color-mix(in srgb,var(--g) 25%,transparent)}

footer{padding:2.5rem 5%;border-top:1px solid color-mix(in srgb,var(--g) 5%,transparent);display:flex;justify-content:space-between;align-items:center;max-width:1260px;margin:0 auto;flex-wrap:wrap;gap:1rem}
footer .fl{font-family:'Playfair Display',serif;font-size:1.1rem;color:var(--c)}
footer .flinks{display:flex;gap:1.8rem;font-size:.72rem;opacity:.3}
footer .flinks a:hover{opacity:.7;color:var(--g)}
footer .fc{font-size:.65rem;opacity:.18}

.wa{position:fixed;bottom:1.5rem;right:1.5rem;z-index:99;width:50px;height:50px;background:#25d366;border-radius:50%;display:grid;place-items:center;cursor:pointer;box-shadow:0 4px 18px rgba(37,211,102,.3);transition:.25s}
.wa:hover{transform:scale(1.08)}
.wa svg{width:26px;height:26px;fill:#fff}

@media(max-width:1024px){.hero-in{grid-template-columns:1fr;padding-top:6rem}.h-card-wrap{display:none}.hero-in h1{font-size:2.8rem}.s-grid{grid-template-columns:1fr 1fr}.a-grid{grid-template-columns:1fr 1fr}.stats-in{grid-template-columns:1fr 1fr}.st:not(:last-child)::after{display:none}}
@media(max-width:640px){nav ul{display:none}.hero-in h1{font-size:2.2rem}.s-grid,.a-grid,.stats-in{grid-template-columns:1fr}.bf{grid-template-columns:1fr}footer{flex-direction:column;text-align:center}.h-feats{grid-template-columns:1fr}}
</style>
</head>
<body>

<nav id="nav">
<a href="#top" class="logo"><div class="logo-mark">${buildingSvg}</div><div><span class="logo-name">${esc(name)}</span>${tagline ? `<span class="logo-tag">${esc(tagline)}</span>` : ""}</div></a>
<ul><li><a href="#top">Home</a></li>${navLinks}</ul>
<a href="${bookHref}" class="nav-cta">${ctaText}</a>
</nav>

<section class="hero" id="top">
<div class="hero-bg"><img src="${heroImg}" alt="" fetchpriority="high"></div>
<div class="hero-in">
<div>
${heroTags.length ? `<div class="h-tag rv">${heroTags.map((t) => `<span>${esc(t)}</span>`).join("")}</div>` : ""}
<h1 class="rv d1">${emphGold(s("hero", "title"))}</h1>
${s("hero", "suiteNumber") || s("hero", "suiteTitle") ? `<div class="h-suite rv d2">${s("hero", "suiteNumber") ? `<span class="big">${esc(s("hero", "suiteNumber"))}</span>` : ""}<h2>${esc(s("hero", "suiteTitle"))}${s("hero", "suiteSubtitle") ? `<span>${esc(s("hero", "suiteSubtitle"))}</span>` : ""}</h2></div>` : ""}
${s("hero", "desc") ? `<p class="h-desc rv d2">${esc(s("hero", "desc"))}</p>` : ""}
${heroFeatures.length ? `<ul class="h-feats rv d3">${heroFeatures.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>` : ""}
<a href="${bookHref}" class="btn-book rv d3">${ctaText}</a>
</div>
${r.on("heroCard") ? `<div class="h-card-wrap" style="position:relative"><div class="h-card rv d1">
<div class="hc-top"><span>${esc(s("heroCard", "cardTitle"))}</span>${s("heroCard", "cardBadge") ? `<span class="hc-badge">${esc(s("heroCard", "cardBadge"))}</span>` : ""}</div>
${cardImg ? `<div class="hc-img"><img src="${cardImg}" alt="" loading="lazy"></div>` : ""}
${dims.length ? `<div class="hc-grid">${dims.map((dm) => `<div class="hc-cell"><b>${esc(dm.size)}</b><small>${esc(dm.label)}</small></div>`).join("")}</div>` : ""}
</div></div>` : ""}
</div>
</section>

${r.on("stats") && statsItems.length ? `<div class="stats-bar" id="stats"><div class="stats-in" style="--n:${statsItems.length}">
${statsItems.map((st, i) => `<div class="st rv${i ? ` d${i}` : ""}"><b>${esc(st.value)}</b><span>${esc(st.label)}</span></div>`).join("")}
</div></div>` : ""}

${r.on("suites") && suiteItems.length ? `<section class="suites" id="suites">
<div class="sh rv"><div class="ey">${esc(s("suites", "eyebrow"))}</div><h2>${esc(s("suites", "title"))}</h2>${s("suites", "subtitle") ? `<p>${esc(s("suites", "subtitle"))}</p>` : ""}</div>
<div class="s-grid">${suiteItems.map((suite, i) => {
  const tags = csv(suite.tags);
  const img = safeUrl(suite.image, "");
  const color = suite.statusColor || "green";
  return `<div class="s-card rv${i ? ` d${i % 3}` : ""}">
${img ? `<div class="s-img"><img src="${img}" alt="${esc(suite.name)}" loading="lazy"></div>` : ""}
<div class="s-body"><div class="s-head"><h3>${esc(suite.name)}</h3></div>
${suite.area ? `<div class="s-area">${esc(suite.area)}</div>` : ""}
${tags.length ? `<div class="s-tags">${tags.map((t) => `<span>${esc(t)}</span>`).join("")}</div>` : ""}
<div class="s-foot"><span class="pr">${esc(suite.price)}${suite.priceNote ? ` <small>${esc(suite.priceNote)}</small>` : ""}</span>${suite.status ? `<span class="badge-av ${esc(color)}">${esc(suite.status)}</span>` : ""}</div>
</div></div>`;
}).join("")}</div>
</section>` : ""}

${r.on("amenities") && amenItems.length ? `<section class="amen" id="amen">
<div class="amen-in">
<div class="sh rv"><div class="ey">${esc(s("amenities", "eyebrow"))}</div><h2>${esc(s("amenities", "title"))}</h2>${s("amenities", "subtitle") ? `<p>${esc(s("amenities", "subtitle"))}</p>` : ""}</div>
<div class="a-grid">${amenItems.map((a, i) => `<div class="a-item rv${i ? ` d${i % 4}` : ""}"><div class="ai">${esc(a.icon)}</div><h4>${esc(a.name)}</h4><p>${esc(a.desc)}</p></div>`).join("")}</div>
</div>
</section>` : ""}

${r.on("booking") ? `<section class="book" id="book">
<div class="book-in">
<div class="ey rv" style="text-align:center;margin-bottom:.6rem">${esc(s("booking", "eyebrow"))}</div>
<h2 class="rv d1">${esc(s("booking", "title"))}</h2>
<p class="rv d1">${esc(s("booking", "subtitle"))}</p>
<form class="bf rv d2" id="booking-form" data-to="${esc(s("booking", "sendTo").trim())}" data-property="${esc(name)}">
<input type="text" name="Name" placeholder="Full Name" required>
<input type="tel" name="Phone" placeholder="Phone Number" required>
<input type="email" name="Email" placeholder="Email Address" class="full" required>
${suiteOpts.length ? `<select name="Suite"><option>Select Suite Type</option>${suiteOpts.map((o) => `<option>${esc(o)}</option>`).join("")}</select>` : "<span></span>"}
${planOpts.length ? `<select name="Plan"><option>Payment Plan</option>${planOpts.map((o) => `<option>${esc(o)}</option>`).join("")}</select>` : "<span></span>"}
<button type="submit">${esc(s("booking", "button") || "Submit Inquiry")}</button>
</form>
</div>
</section>` : ""}

<footer>
<div class="fl">${esc(name)}${s("hero", "suiteNumber") ? ` ${esc(s("hero", "title").replace(/\*|[^a-zA-Z0-9. ]/g, "").trim().split(" ").pop() || "")}` : ""}</div>
${footerLinks.length ? `<div class="flinks">${footerLinks.map((l) => `<a href="#">${esc(l)}</a>`).join("")}</div>` : ""}
<div class="fc">${esc(s("footer", "copyright"))}</div>
</footer>

${whatsapp ? `<a class="wa" href="https://wa.me/${whatsapp}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">${whatsappSvg}</a>` : ""}

<script>
var f=document.getElementById('booking-form');
if(f){f.addEventListener('submit',function(e){e.preventDefault();var to=f.dataset.to;if(to){var body='';new FormData(f).forEach(function(v,k){body+=k+': '+v+'\\n'});location.href='mailto:'+to+'?subject='+encodeURIComponent('Suite Inquiry — '+f.dataset.property)+'&body='+encodeURIComponent(body)}else{alert('Thank you! Your inquiry has been received.')}})}
</script>
</body>
</html>`;
}

export const realEstateLuxuryApartments: EditableTemplate = {
  id: "realestate-luxury-apartments",
  name: "Real Estate — Luxury Serviced Apartments",
  schema,
  defaults,
  presets,
  render,
  checks: (c) => {
    const r = reader(c);
    const out: { section: string; message: string }[] = [];
    if (!r.str("seo", "description").trim())
      out.push({ section: "seo", message: "Add a search description so your page looks good on Google." });
    if (r.on("booking") && !r.str("booking", "sendTo").trim())
      out.push({ section: "booking", message: "Add an email under \"Send inquiries to\" so booking inquiries reach you." });
    return out;
  },
};
