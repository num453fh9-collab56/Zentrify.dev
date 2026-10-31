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
    description: "Hotel name, navigation links, and CTA button.",
    fields: [
      { type: "text", key: "name", label: "Hotel name" },
      { type: "text", key: "nameSuffix", label: "Name accent part", hint: "Styled in gold. e.g. 'ana' in Elevana" },
      { type: "text", key: "ctaText", label: "Nav CTA text" },
    ],
  },
  {
    id: "theme",
    label: "Colors",
    fields: [
      { type: "color", key: "leaf", label: "Leaf / green accent" },
      { type: "color", key: "gold", label: "Gold accent" },
      { type: "color", key: "dark", label: "Background" },
      { type: "color", key: "darkAlt", label: "Card background" },
      { type: "color", key: "text", label: "Text color" },
    ],
  },
  {
    id: "hero",
    label: "Hero",
    anchor: "top",
    fields: [
      { type: "text", key: "eyebrow", label: "Eyebrow", hint: "e.g. Bali · Ubud Rainforest" },
      { type: "textarea", key: "title", label: "Headline", rows: 2, hint: "Wrap a word in *stars* for italic gold." },
      { type: "textarea", key: "text", label: "Description", rows: 3 },
      { type: "text", key: "cta", label: "CTA button text" },
      { type: "image", key: "image", label: "Background image" },
    ],
  },
  {
    id: "rooms",
    label: "Rooms",
    anchor: "rooms",
    toggleable: true,
    fields: [
      { type: "text", key: "eyebrow", label: "Eyebrow" },
      { type: "text", key: "title", label: "Section title" },
      { type: "text", key: "subtitle", label: "Subtitle" },
      {
        type: "list",
        key: "items",
        label: "Rooms",
        itemLabel: "Room",
        titleKey: "name",
        min: 1,
        max: 6,
        fields: [
          { type: "text", key: "tier", label: "Tier label" },
          { type: "text", key: "name", label: "Room name" },
          { type: "textarea", key: "desc", label: "Description", rows: 2 },
          { type: "text", key: "amenities", label: "Amenities (comma-separated)" },
          { type: "text", key: "price", label: "Price" },
          { type: "text", key: "priceUnit", label: "Price unit", hint: "e.g. / night" },
          { type: "image", key: "image", label: "Photo" },
        ],
        newItem: { tier: "Signature", name: "New Room", desc: "", amenities: "King Bed, Wi-Fi", price: "$300", priceUnit: "/ night", image: "" },
      },
    ],
  },
  {
    id: "spa",
    label: "Jungle Spa",
    anchor: "spa",
    toggleable: true,
    fields: [
      { type: "text", key: "eyebrow", label: "Eyebrow" },
      { type: "textarea", key: "title", label: "Heading", rows: 2, hint: "Wrap a word in *stars* for italic gold." },
      { type: "textarea", key: "text", label: "Description", rows: 3 },
      { type: "text", key: "treatments", label: "Treatments (comma-separated)" },
      { type: "image", key: "image", label: "Spa image" },
    ],
  },
  {
    id: "cta",
    label: "CTA",
    anchor: "cta",
    fields: [
      { type: "textarea", key: "title", label: "Heading", rows: 2 },
      { type: "textarea", key: "text", label: "Description", rows: 2 },
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

function emphGold(s: string, goldColor: string): string {
  return esc(s).replace(/\*(.+?)\*/g, `<em style="font-style:italic;color:${goldColor}">$1</em>`);
}

const defaults: Content = {
  enabled: { rooms: true, spa: true },
  values: {
    brand: { name: "Elev", nameSuffix: "ana", ctaText: "Reserve" },
    theme: { leaf: "#6db56b", gold: "#c9a96e", dark: "#080b06", darkAlt: "#0e120b", text: "#8b9c7e" },
    hero: {
      eyebrow: "Bali · Ubud Rainforest",
      title: "Sleep Among the *Trees*",
      text: "Luxury treehouses suspended 30 meters above the rainforest floor. Private plunge pools, open-air dining and the sound of the jungle as your only alarm.",
      cta: "Check Availability",
      image: U("photo-1499002238440-d264edd596ec", "w=1600&h=1000"),
    },
    rooms: {
      eyebrow: "Accommodations",
      title: "Our Treehouses",
      subtitle: "Each treehouse is handcrafted from reclaimed timber with floor-to-ceiling jungle views.",
      items: [
        { tier: "Signature", name: "Canopy Suite", desc: "Open-plan living at 25m, king bed, rain shower and private balcony with hammock.", amenities: "King Bed, Rain Shower, Balcony, Wi-Fi", price: "$420", priceUnit: "/ night", image: U("photo-1520250497591-112f2f40a3f4", "w=500&h=350") },
        { tier: "Premium", name: "Eagle Nest", desc: "Highest point in the resort at 35m. Wraparound deck, plunge pool and outdoor bathtub.", amenities: "Plunge Pool, Outdoor Bath, 360° View, Butler", price: "$720", priceUnit: "/ night", image: U("photo-1566073771259-6a8506099945", "w=500&h=350") },
        { tier: "Ultra Luxury", name: "Honeymoon Villa", desc: "Two-story private villa with infinity pool cantilevered over the valley. Chef-cooked meals included.", amenities: "Infinity Pool, Private Chef, Spa Room, Sunset Deck", price: "$1,200", priceUnit: "/ night", image: U("photo-1602002418816-5c0aeef426aa", "w=500&h=350") },
      ],
    },
    spa: {
      eyebrow: "Wellness",
      title: "The Jungle *Spa*",
      text: "Treatments draw from Balinese healing traditions using ingredients foraged from the surrounding forest. Every treatment room opens directly onto the canopy.",
      treatments: "Hot Stone Ritual, Canopy Meditation, Herbal Body Wrap, Sound Healing, Forest Bathing, Bamboo Massage",
      image: U("photo-1544161515-4ab6ce6db874", "w=800&h=600"),
    },
    cta: {
      title: "Your Canopy Awaits",
      text: "Minimum 2-night stay. Airport transfer by private helicopter available for Eagle Nest and Villa guests.",
      buttonText: "Reserve Your Treehouse",
    },
    footer: { text: "© 2026 Elevana · Ubud, Bali, Indonesia" },
  },
};

function render(content: Content, options?: { preview?: { initialScroll: number; instant: boolean } }): string {
  const r = reader(content);
  const leaf = safeColor(r.str("theme", "leaf"), "#6db56b");
  const gold = safeColor(r.str("theme", "gold"), "#c9a96e");
  const dark = safeColor(r.str("theme", "dark"), "#080b06");
  const darkAlt = safeColor(r.str("theme", "darkAlt"), "#0e120b");
  const text = safeColor(r.str("theme", "text"), "#8b9c7e");

  const rooms = r.list("rooms", "items");
  const treatments = r.str("spa", "treatments").split(",").map(t => t.trim()).filter(Boolean);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${esc(r.str("brand", "name"))}${esc(r.str("brand", "nameSuffix"))}</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
:root{--leaf:${leaf};--gold:${gold};--dark:${dark};--da:${darkAlt};--txt:${text}}
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:var(--dark);color:var(--txt);overflow-x:hidden}a{text-decoration:none;color:inherit}
nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:1.4rem 5%;background:rgba(8,11,6,.75);backdrop-filter:blur(20px);border-bottom:1px solid rgba(109,181,107,.05)}
.logo{font-family:'Cormorant Garamond',serif;font-size:1.8rem;font-weight:700;color:#fff;letter-spacing:.06em}.logo span{color:var(--gold)}
nav ul{list-style:none;display:flex;gap:2.2rem}nav ul a{font-size:.82rem;opacity:.4;letter-spacing:.5px;transition:.3s}nav ul a:hover{opacity:1;color:var(--gold)}
.nav-btn{background:var(--gold);color:var(--dark);padding:.7rem 1.6rem;font-size:.78rem;font-weight:600;letter-spacing:1px;border:none;cursor:pointer;transition:.2s}.nav-btn:hover{background:#d9bc84;box-shadow:0 8px 30px rgba(201,169,110,.25)}
.hero{height:100vh;position:relative;display:flex;align-items:flex-end;overflow:hidden}
.hero-bg{position:absolute;inset:0}.hero-bg img{width:100%;height:100%;object-fit:cover;opacity:.5}
.hero-bg::after{content:'';position:absolute;inset:0;background:linear-gradient(to top,var(--dark) 5%,${dark}99 35%,transparent 70%)}
.hero-content{position:relative;z-index:2;padding:0 5% 5rem;max-width:700px}
.hero-content .eyebrow{font-size:.68rem;text-transform:uppercase;letter-spacing:4px;color:var(--gold);opacity:.7;margin-bottom:1rem}
.hero h1{font-family:'Cormorant Garamond',serif;font-size:4.5rem;font-weight:700;color:#fff;line-height:1.02;margin-bottom:1.2rem}
.hero p{opacity:.45;line-height:1.85;margin-bottom:2.5rem;font-size:.95rem}
.btn-g{background:var(--gold);color:var(--dark);padding:1rem 2.5rem;font-weight:600;font-size:.85rem;letter-spacing:2px;text-transform:uppercase;border:none;cursor:pointer;transition:.2s;display:inline-block}.btn-g:hover{box-shadow:0 12px 40px rgba(201,169,110,.3)}
.rooms{padding:6rem 5%;max-width:1200px;margin:0 auto}.sec-eyebrow{font-size:.68rem;text-transform:uppercase;letter-spacing:4px;color:var(--gold);opacity:.6;margin-bottom:.6rem}
.sec-title{font-family:'Cormorant Garamond',serif;font-size:2.8rem;color:#fff;margin-bottom:.5rem}.sec-sub{opacity:.3;margin-bottom:3rem;font-size:.9rem}
.room-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem}
.room{background:var(--da);border:1px solid rgba(201,169,110,.06);border-radius:20px;overflow:hidden;transition:.3s}
.room:hover{border-color:rgba(201,169,110,.2);transform:translateY(-6px);box-shadow:0 25px 60px rgba(0,0,0,.3)}.room img{width:100%;height:240px;object-fit:cover}
.room .body{padding:1.8rem}.room .tier{font-size:.65rem;text-transform:uppercase;letter-spacing:2px;color:var(--gold);font-weight:600;margin-bottom:.6rem}
.room h3{font-family:'Cormorant Garamond',serif;font-size:1.5rem;color:#fff;margin-bottom:.5rem}.room p{font-size:.82rem;opacity:.4;line-height:1.7;margin-bottom:1.2rem}
.room .amenities{display:flex;flex-wrap:wrap;gap:.5rem;margin-bottom:1.2rem}
.room .amenities span{font-size:.68rem;padding:.25rem .6rem;background:rgba(109,181,107,.06);border-radius:50px;color:var(--leaf)}
.room .bottom{display:flex;justify-content:space-between;align-items:center;padding-top:1rem;border-top:1px solid rgba(201,169,110,.08)}
.room .price{font-family:'Cormorant Garamond',serif;font-size:1.4rem;color:var(--gold)}.room .price small{font-family:'Inter',sans-serif;font-size:.7rem;opacity:.5;color:var(--txt)}
.room .book-btn{background:var(--gold);color:var(--dark);padding:.5rem 1.2rem;font-size:.72rem;font-weight:600;border:none;cursor:pointer;border-radius:4px}
.spa{padding:6rem 5%;max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1.1fr .9fr;gap:4rem;align-items:center}
.spa-img img{width:100%;height:450px;object-fit:cover;border-radius:20px}
.spa-text h2{font-family:'Cormorant Garamond',serif;font-size:2.5rem;color:#fff;margin-bottom:1rem}
.spa-text p{font-size:.88rem;opacity:.4;line-height:1.85;margin-bottom:1.5rem}.spa-list{display:grid;grid-template-columns:1fr 1fr;gap:.8rem}
.spa-list div{display:flex;align-items:center;gap:.6rem;font-size:.82rem;color:#a8b89c}.spa-list div::before{content:'✦';color:var(--gold);font-size:.6rem}
.cta-s{padding:6rem 5%;text-align:center}
.cta-box{max-width:700px;margin:0 auto;background:linear-gradient(135deg,rgba(201,169,110,.06),rgba(109,181,107,.03));border:1px solid rgba(201,169,110,.1);border-radius:24px;padding:4rem 3rem}
.cta-box h2{font-family:'Cormorant Garamond',serif;font-size:2.8rem;color:#fff;margin-bottom:1rem}
.cta-box p{opacity:.35;margin-bottom:2rem;max-width:420px;margin-left:auto;margin-right:auto;font-size:.9rem}
footer{padding:3rem 5%;border-top:1px solid rgba(201,169,110,.06);text-align:center;font-size:.78rem;opacity:.2}
${revealCss}
@media(max-width:1024px){.hero h1{font-size:3.5rem}.room-grid{grid-template-columns:1fr 1fr}.spa{grid-template-columns:1fr;gap:2rem}}
@media(max-width:640px){nav ul{display:none}.hero h1{font-size:2.5rem}.room-grid{grid-template-columns:1fr}.spa-list{grid-template-columns:1fr}}
</style>
</head>
<body>
${previewScript(options?.preview)}
<nav><div class="logo">${esc(r.str("brand", "name"))}<span>${esc(r.str("brand", "nameSuffix"))}</span></div><ul><li><a href="#rooms">Rooms</a></li><li><a href="#spa">Jungle Spa</a></li><li><a href="#cta">Experience</a></li></ul><a href="#cta" class="nav-btn">${esc(r.str("brand", "ctaText"))}</a></nav>
<section class="hero" id="top"><div class="hero-bg"><img src="${safeUrl(r.str("hero", "image"))}" alt="${esc(r.str("brand", "name"))}${esc(r.str("brand", "nameSuffix"))}"></div><div class="hero-content"><div class="eyebrow">${esc(r.str("hero", "eyebrow"))}</div><h1>${emphGold(r.str("hero", "title"), gold)}</h1><p>${esc(r.str("hero", "text"))}</p><a href="#cta" class="btn-g">${esc(r.str("hero", "cta"))}</a></div></section>
${r.on("rooms") ? `<section class="rooms rv" id="rooms"><div class="sec-eyebrow">${esc(r.str("rooms", "eyebrow"))}</div><div class="sec-title">${esc(r.str("rooms", "title"))}</div><div class="sec-sub">${esc(r.str("rooms", "subtitle"))}</div>
<div class="room-grid">
${rooms.map((rm, i) => {
  const amenities = (rm.amenities || "").split(",").map(a => a.trim()).filter(Boolean);
  return `<div class="room rv${i < 3 ? ` d${i + 1}` : ""}">
  <img src="${safeUrl(rm.image || "")}" alt="${esc(rm.name || "")}">
  <div class="body">
    <div class="tier">${esc(rm.tier || "")}</div>
    <h3>${esc(rm.name || "")}</h3>
    <p>${esc(rm.desc || "")}</p>
    <div class="amenities">${amenities.map(a => `<span>${esc(a)}</span>`).join("")}</div>
    <div class="bottom">
      <div class="price">${esc(rm.price || "")} <small>${esc(rm.priceUnit || "")}</small></div>
      <button class="book-btn">Book</button>
    </div>
  </div>
</div>`;
}).join("\n")}
</div></section>` : ""}
${r.on("spa") ? `<section class="spa rv" id="spa"><div class="spa-img"><img src="${safeUrl(r.str("spa", "image"))}" alt="Spa"></div>
<div class="spa-text"><div class="sec-eyebrow">${esc(r.str("spa", "eyebrow"))}</div><h2>${emphGold(r.str("spa", "title"), gold)}</h2><p>${esc(r.str("spa", "text"))}</p>
<div class="spa-list">${treatments.map(t => `<div>${esc(t)}</div>`).join("")}</div></div></section>` : ""}
<section class="cta-s rv" id="cta"><div class="cta-box"><h2>${esc(r.str("cta", "title"))}</h2><p>${esc(r.str("cta", "text"))}</p><a href="#" class="btn-g" style="font-size:.95rem;padding:1rem 3rem">${esc(r.str("cta", "buttonText"))}</a></div></section>
<footer><p>${esc(r.str("footer", "text"))}</p></footer>
${revealScript}
</body></html>`;
}

export const jungleTreehouseHotel: EditableTemplate = {
  id: "jungle-treehouse-hotel",
  name: "Treehouse Hotel — Jungle Luxury",
  schema,
  defaults,
  presets: {
    section: "theme",
    items: [
      { name: "Jungle Gold", swatch: ["#6db56b", "#c9a96e", "#080b06"], values: { leaf: "#6db56b", gold: "#c9a96e", dark: "#080b06", darkAlt: "#0e120b", text: "#8b9c7e" } },
      { name: "Tropical Teal", swatch: ["#2dd4bf", "#d4a853", "#061413"], values: { leaf: "#2dd4bf", gold: "#d4a853", dark: "#061413", darkAlt: "#0c1e1c", text: "#5eead4" } },
      { name: "Forest Amber", swatch: ["#4ade80", "#f59e0b", "#0a0f08"], values: { leaf: "#4ade80", gold: "#f59e0b", dark: "#0a0f08", darkAlt: "#111a0e", text: "#86efac" } },
      { name: "Moss Rose", swatch: ["#84cc16", "#e879a0", "#0b0d06"], values: { leaf: "#84cc16", gold: "#e879a0", dark: "#0b0d06", darkAlt: "#12160c", text: "#a3e635" } },
      { name: "Midnight Copper", swatch: ["#22c55e", "#cd7f32", "#050805"], values: { leaf: "#22c55e", gold: "#cd7f32", dark: "#050805", darkAlt: "#0a100a", text: "#4ade80" } },
      { name: "Ocean Pearl", swatch: ["#38bdf8", "#e2c8a0", "#060d12"], values: { leaf: "#38bdf8", gold: "#e2c8a0", dark: "#060d12", darkAlt: "#0c1620", text: "#7dd3fc" } },
    ],
  },
  render,
  checks(content) {
    const warns: { section: string; message: string }[] = [];
    const r = reader(content);
    if (!r.str("brand", "name")) warns.push({ section: "brand", message: "Hotel name is empty." });
    if (!r.str("hero", "image")) warns.push({ section: "hero", message: "Hero needs a background image." });
    if (r.on("rooms") && r.list("rooms", "items").length === 0) warns.push({ section: "rooms", message: "No rooms added." });
    return warns;
  },
};
