import type { Content, EditableTemplate, Item, Section } from "../editor/types";
import {
  csv,
  emph,
  esc,
  isEmail,
  lines,
  previewScript,
  reader,
  revealCss,
  revealScript,
  safeColor,
  safeUrl,
} from "../editor/html";

const U = (id: string, size: string) => `https://images.unsplash.com/${id}?${size}&fit=crop&auto=format&q=80`;

const fonts: Record<string, { heading: string; accent: string; body: string; href: string }> = {
  classic: {
    heading: "'Playfair Display',serif",
    accent: "'Cormorant Garamond',serif",
    body: "'Inter',sans-serif",
    href: "family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500;600",
  },
  elegant: {
    heading: "'Cormorant Garamond',serif",
    accent: "'Cormorant Garamond',serif",
    body: "'Jost',sans-serif",
    href: "family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Jost:wght@300;400;500;600",
  },
  modern: {
    heading: "'DM Serif Display',serif",
    accent: "'Lora',serif",
    body: "'DM Sans',sans-serif",
    href: "family=DM+Serif+Display:ital@0;1&family=Lora:ital,wght@0,400;1,400&family=DM+Sans:wght@300;400;500;600",
  },
};

const schema: Section[] = [
  {
    id: "brand",
    label: "Brand",
    description: "Restaurant name, logo and the main booking button.",
    fields: [
      { type: "text", key: "name", label: "Restaurant name" },
      { type: "text", key: "logoLetter", label: "Logo letter", hint: "Shown in the round logo when no logo image is set." },
      { type: "image", key: "logo", label: "Logo image (optional)" },
      { type: "text", key: "cta", label: "Booking button text" },
    ],
  },
  {
    id: "theme",
    label: "Colors & fonts",
    fields: [
      { type: "color", key: "accent", label: "Accent" },
      { type: "color", key: "bg", label: "Background" },
      { type: "color", key: "heading", label: "Headings" },
      { type: "color", key: "text", label: "Body text" },
      {
        type: "select",
        key: "fonts",
        label: "Font style",
        options: [
          { value: "classic", label: "Classic — Playfair Display" },
          { value: "elegant", label: "Elegant — Cormorant Garamond" },
          { value: "modern", label: "Modern — DM Serif Display" },
        ],
      },
    ],
  },
  {
    id: "hero",
    label: "Hero",
    anchor: "top",
    fields: [
      { type: "textarea", key: "title", label: "Headline", rows: 2, hint: "Wrap words in *stars* to highlight them." },
      { type: "textarea", key: "text", label: "Intro text", rows: 3 },
      { type: "image", key: "image", label: "Background image" },
    ],
  },
  {
    id: "stats",
    label: "Highlights",
    toggleable: true,
    anchor: "stats",
    fields: [
      {
        type: "list",
        key: "items",
        label: "Numbers",
        itemLabel: "Highlight",
        titleKey: "value",
        max: 4,
        newItem: { value: "10+", label: "Your highlight" },
        fields: [
          { type: "text", key: "value", label: "Number" },
          { type: "text", key: "label", label: "Label" },
        ],
      },
    ],
  },
  {
    id: "menu",
    label: "Menu",
    toggleable: true,
    anchor: "menu",
    fields: [
      { type: "text", key: "eyebrow", label: "Small heading" },
      { type: "text", key: "title", label: "Heading" },
      { type: "textarea", key: "text", label: "Description", rows: 2 },
      {
        type: "list",
        key: "items",
        label: "Dishes",
        itemLabel: "Dish",
        titleKey: "name",
        max: 12,
        newItem: { name: "New dish", desc: "Describe the dish in one line.", price: "$20", tag: "", image: "" },
        fields: [
          { type: "text", key: "name", label: "Name" },
          { type: "textarea", key: "desc", label: "Description", rows: 2 },
          { type: "text", key: "price", label: "Price", placeholder: "$20 or Rs 2,500" },
          { type: "text", key: "tag", label: "Tag (optional)", placeholder: "Chef's pick" },
          { type: "image", key: "image", label: "Photo" },
        ],
      },
    ],
  },
  {
    id: "gallery",
    label: "Gallery",
    toggleable: true,
    anchor: "gallery",
    fields: [
      { type: "text", key: "eyebrow", label: "Small heading" },
      { type: "text", key: "title", label: "Heading" },
      {
        type: "list",
        key: "images",
        label: "Photos",
        itemLabel: "Photo",
        titleKey: "alt",
        min: 1,
        max: 9,
        hint: "The first photo is shown large.",
        newItem: { image: "", alt: "Photo" },
        fields: [
          { type: "image", key: "image", label: "Photo" },
          { type: "text", key: "alt", label: "Description", hint: "Used by screen readers and search engines." },
        ],
      },
    ],
  },
  {
    id: "chef",
    label: "Chef / story",
    toggleable: true,
    anchor: "chef",
    fields: [
      { type: "text", key: "eyebrow", label: "Small heading" },
      { type: "text", key: "title", label: "Heading", hint: "Wrap words in *stars* to highlight them." },
      { type: "textarea", key: "text", label: "Story", rows: 4 },
      { type: "textarea", key: "quote", label: "Quote", rows: 2 },
      { type: "text", key: "signature", label: "Signature" },
      { type: "image", key: "image", label: "Photo" },
    ],
  },
  {
    id: "reviews",
    label: "Reviews",
    toggleable: true,
    anchor: "reviews",
    fields: [
      { type: "text", key: "eyebrow", label: "Small heading" },
      { type: "text", key: "title", label: "Heading" },
      {
        type: "list",
        key: "items",
        label: "Reviews",
        itemLabel: "Review",
        titleKey: "name",
        max: 6,
        newItem: { quote: "What a wonderful evening.", name: "Guest name", detail: "Google review" },
        fields: [
          { type: "textarea", key: "quote", label: "Review", rows: 3 },
          { type: "text", key: "name", label: "Name" },
          { type: "text", key: "detail", label: "Source", placeholder: "Google review" },
        ],
      },
    ],
  },
  {
    id: "visit",
    label: "Location & hours",
    toggleable: true,
    anchor: "visit",
    fields: [
      { type: "text", key: "eyebrow", label: "Small heading" },
      { type: "text", key: "title", label: "Heading" },
      { type: "textarea", key: "address", label: "Address", rows: 2 },
      { type: "text", key: "phone", label: "Phone" },
      { type: "email", key: "email", label: "Email" },
      { type: "textarea", key: "hours", label: "Opening hours", rows: 4, hint: "One per line, with | between day and time." },
      {
        type: "select",
        key: "map",
        label: "Map",
        options: [
          { value: "show", label: "Show Google map of the address" },
          { value: "hide", label: "Hide map" },
        ],
      },
    ],
  },
  {
    id: "reserve",
    label: "Reservations",
    toggleable: true,
    anchor: "reserve",
    fields: [
      { type: "text", key: "eyebrow", label: "Small heading" },
      { type: "text", key: "title", label: "Heading" },
      { type: "textarea", key: "text", label: "Description", rows: 2 },
      {
        type: "email",
        key: "sendTo",
        label: "Send bookings to",
        placeholder: "bookings@yourrestaurant.com",
        hint: "Guests' booking details open in their email app, addressed to you. Without an email, guests are asked to call.",
      },
      { type: "text", key: "times", label: "Time slots", hint: "Separate with commas." },
      { type: "text", key: "guests", label: "Party sizes", hint: "Separate with commas." },
      { type: "text", key: "seating", label: "Seating options", hint: "Separate with commas. Leave empty to hide." },
      { type: "text", key: "button", label: "Button text" },
      { type: "text", key: "success", label: "Message after booking" },
    ],
  },
  {
    id: "footer",
    label: "Footer & social",
    fields: [
      { type: "url", key: "instagram", label: "Instagram link", placeholder: "https://instagram.com/…" },
      { type: "url", key: "facebook", label: "Facebook link", placeholder: "https://facebook.com/…" },
      { type: "url", key: "tripadvisor", label: "TripAdvisor link", placeholder: "https://tripadvisor.com/…" },
      { type: "text", key: "whatsapp", label: "WhatsApp number", placeholder: "+92 300 1234567", hint: "Shows a floating WhatsApp chat button." },
      { type: "text", key: "copyright", label: "Copyright text" },
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
  enabled: { stats: true, menu: true, gallery: true, chef: true, reviews: true, visit: true, reserve: true },
  values: {
    brand: { name: "Aura Dining", logoLetter: "A", logo: "", cta: "Book a Table" },
    theme: { accent: "#c5a572", bg: "#090807", heading: "#f5efe3", text: "#b5a891", fonts: "classic" },
    hero: {
      title: "Where Culinary *Artistry* Meets Elegance",
      text: "An extraordinary journey of flavors, crafted with passion by our chefs in an atmosphere of refined sophistication.",
      image: U("photo-1414235077428-338989a2e8c0", "w=1800&h=1100"),
    },
    stats: {
      items: [
        { value: "15", label: "Years of excellence" },
        { value: "120", label: "Seats" },
        { value: "50K+", label: "Guests served" },
        { value: "4.9", label: "Guest rating" },
      ],
    },
    menu: {
      eyebrow: "Our Menu",
      title: "Signature Creations",
      text: "Each dish tells a story of tradition, innovation and the finest seasonal ingredients.",
      items: [
        { name: "A5 Wagyu Tenderloin", desc: "Charcoal-grilled with truffle jus, roasted bone marrow and seasonal root vegetables.", price: "$128", tag: "Chef's Pick", image: U("photo-1544025162-d76694265947", "w=300&h=300") },
        { name: "Butter-Poached Lobster", desc: "With saffron risotto, crispy shallots and champagne beurre blanc.", price: "$96", tag: "Signature", image: U("photo-1580476262798-bddd9f4b7369", "w=300&h=300") },
        { name: "Seared Foie Gras", desc: "Caramelized fig, brioche toast points and aged balsamic reduction.", price: "$68", tag: "Starter", image: U("photo-1551183053-bf91a1d81141", "w=300&h=300") },
        { name: "Gold Leaf Chocolate Sphere", desc: "Dark chocolate, passion fruit coulis and edible gold leaf.", price: "$42", tag: "Dessert", image: U("photo-1563805042-7684c019e1cb", "w=300&h=300") },
      ],
    },
    gallery: {
      eyebrow: "The Experience",
      title: "A Feast for the Senses",
      images: [
        { image: U("photo-1517248135467-4c7edcad34c4", "w=900&h=900"), alt: "Restaurant interior" },
        { image: U("photo-1559339352-11d035aa65de", "w=500&h=500"), alt: "Plated dish" },
        { image: U("photo-1470337458703-46ad1756a187", "w=500&h=500"), alt: "Wine glasses" },
        { image: U("photo-1555396273-367ea4eb4db5", "w=500&h=500"), alt: "Bar area" },
        { image: U("photo-1414235077428-338989a2e8c0", "w=500&h=500"), alt: "Dining room" },
      ],
    },
    chef: {
      eyebrow: "The Visionary",
      title: "Chef *Isabella Moreau*",
      text: "With two decades of culinary mastery across kitchens in Paris, Tokyo and New York, Chef Isabella brings a fusion of classical French technique and contemporary Asian influence.",
      quote: "Food is not just sustenance — it is the art of turning the ordinary into the extraordinary.",
      signature: "— Isabella Moreau",
      image: U("photo-1577219491135-ce391730fb2c", "w=800&h=1000"),
    },
    reviews: {
      eyebrow: "Guest Stories",
      title: "Loved by Our Guests",
      items: [
        { quote: "Every course was a small masterpiece. The lobster alone is worth the trip.", name: "Sarah M.", detail: "Google review" },
        { quote: "Warm service, a beautiful room and a wine list to get lost in. Our anniversary was perfect.", name: "Daniel & Aisha", detail: "TripAdvisor" },
        { quote: "The chef's tasting menu is the best meal I have had this year.", name: "Omar K.", detail: "Google review" },
      ],
    },
    visit: {
      eyebrow: "Visit Us",
      title: "Find Your Table",
      address: "24 Riverside Avenue\nLondon SE1 9PH",
      phone: "+44 20 7946 0123",
      email: "hello@auradining.com",
      hours: "Mon – Thu | 6:00 PM – 11:00 PM\nFri – Sat | 6:00 PM – 12:00 AM\nSunday | 5:00 PM – 10:00 PM",
      map: "show",
    },
    reserve: {
      eyebrow: "Reservations",
      title: "Reserve Your Table",
      text: "Experience an evening of culinary excellence. Private dining and special events available on request.",
      sendTo: "",
      times: "7:00 PM, 7:30 PM, 8:00 PM, 8:30 PM, 9:00 PM, 9:30 PM",
      guests: "2 Guests, 3 Guests, 4 Guests, 5 Guests, 6 Guests, Private Dining (8+)",
      seating: "Indoor, Terrace, Private Room, Chef's Table",
      button: "Confirm Reservation",
      success: "Thank you! We'll confirm your table shortly.",
    },
    footer: { instagram: "#", facebook: "#", tripadvisor: "", whatsapp: "", copyright: "© 2026 Aura Dining. All rights reserved." },
    seo: {
      title: "Aura Dining — Fine Dining Restaurant",
      description: "Seasonal fine dining, a chef's tasting menu and an award-winning wine list. Reserve your table at Aura Dining.",
    },
  },
};

const presets = {
  section: "theme",
  items: [
    { name: "Gold", swatch: ["#090807", "#c5a572"], values: { accent: "#c5a572", bg: "#090807", heading: "#f5efe3", text: "#b5a891" } },
    { name: "Emerald", swatch: ["#06100c", "#5fb58a"], values: { accent: "#5fb58a", bg: "#06100c", heading: "#eef5f0", text: "#9fb5a8" } },
    { name: "Rose", swatch: ["#0f0909", "#d4918f"], values: { accent: "#d4918f", bg: "#0f0909", heading: "#f7ece9", text: "#bba3a0" } },
    { name: "Sapphire", swatch: ["#070b12", "#7fa7d9"], values: { accent: "#7fa7d9", bg: "#070b12", heading: "#ecf1f8", text: "#9eabbd" } },
    { name: "Copper", swatch: ["#0c0806", "#c97a4a"], values: { accent: "#c97a4a", bg: "#0c0806", heading: "#f6ece4", text: "#b9a291" } },
    { name: "Ivory", swatch: ["#faf6ef", "#9a6b2f"], values: { accent: "#9a6b2f", bg: "#faf6ef", heading: "#1c1712", text: "#5e5446" } },
  ],
};

const icon = {
  calendar: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>`,
  menu: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-width="1.8" d="M4 7h16M4 12h16M4 17h16"/></svg>`,
  pin: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M12 21s-7-6.2-7-11.5a7 7 0 0114 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5" stroke-width="1.6"/></svg>`,
  phone: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M3 5a2 2 0 012-2h3.3a1 1 0 01.95.68l1.5 4.5a1 1 0 01-.5 1.2l-2.3 1.1a11 11 0 005.5 5.5l1.1-2.3a1 1 0 011.2-.5l4.5 1.5a1 1 0 01.7.95V19a2 2 0 01-2 2h-1C9.7 21 3 14.3 3 6V5z"/></svg>`,
  mail: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M3 8l7.9 5.3a2 2 0 002.2 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>`,
  whatsapp: `<svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16 3C8.8 3 3 8.8 3 16c0 2.3.6 4.5 1.7 6.4L3 29l6.8-1.7c1.8 1 3.9 1.7 6.2 1.7 7.2 0 13-5.8 13-13S23.2 3 16 3zm0 23.8c-2 0-3.9-.6-5.6-1.6l-.4-.2-4 1 1.1-3.9-.3-.4A10.7 10.7 0 015.2 16C5.2 10 10 5.2 16 5.2S26.8 10 26.8 16 22 26.8 16 26.8zm5.9-8c-.3-.2-1.9-1-2.2-1.1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.3-.2-.3 0-.5.1-.7l.5-.6.3-.5c.1-.2 0-.4 0-.5l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5 2.5 1 3 .8 3.6.8.6-.1 1.9-.8 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.2-.6-.4z"/></svg>`,
};

function render(c: Content, options: Parameters<EditableTemplate["render"]>[1] = {}) {
  const r = reader(c);
  const img = (src: string, fallback = "") => safeUrl(src, fallback);
  const s = r.str;
  const d = defaults.values;
  const col = (key: string) => safeColor(s("theme", key), d.theme[key] as string);
  const font = fonts[s("theme", "fonts")] ?? fonts.classic;
  const name = s("brand", "name") || "Restaurant";
  const logo = safeUrl(s("brand", "logo"), "");
  const cta = esc(s("brand", "cta") || "Book a Table");

  const navLinks = [
    ["menu", "Menu"],
    ["gallery", "Experience"],
    ["chef", "Our Story"],
    ["reviews", "Reviews"],
    ["visit", "Visit"],
  ]
    .filter(([id]) => r.on(id))
    .map(([id, label]) => `<li><a href="#${id}">${label}</a></li>`)
    .join("");
  const bookHref = r.on("reserve") ? "#reserve" : r.on("visit") ? "#visit" : "#top";

  const stats = r.list("stats", "items").slice(0, 4);
  const dishes = r.list("menu", "items").map((dish): Item => ({ ...dish, image: img(dish.image) }));
  const photos = r.list("gallery", "images").map((p): Item => ({ ...p, image: img(p.image) })).filter((p) => p.image);
  const reviews = r.list("reviews", "items");
  const hours = lines(s("visit", "hours")).map((l) => l.split("|").map((x) => x.trim()));
  const address = s("visit", "address");
  const phone = s("visit", "phone");
  const email = s("visit", "email");
  const sendTo = isEmail(s("reserve", "sendTo")) ? s("reserve", "sendTo").trim() : "";
  const whatsapp = s("footer", "whatsapp").replace(/\D/g, "");
  const socials = [
    ["Instagram", s("footer", "instagram")],
    ["Facebook", s("footer", "facebook")],
    ["TripAdvisor", s("footer", "tripadvisor")],
  ].filter(([, url]) => url.trim());
  const options_ = (list: string) => csv(list).map((o) => `<option>${esc(o)}</option>`).join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${esc(s("seo", "title") || name)}</title>
<meta name="description" content="${esc(s("seo", "description"))}">
<meta property="og:title" content="${esc(s("seo", "title") || name)}">
<meta property="og:description" content="${esc(s("seo", "description"))}">
${s("hero", "image").startsWith("http") ? `<meta property="og:image" content="${img(s("hero", "image"))}">` : ""}
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?${font.href}&display=swap" rel="stylesheet">
${previewScript(options.preview)}
${revealScript}
<style>
:root{--accent:${col("accent")};--bg:${col("bg")};--head:${col("heading")};--text:${col("text")};--accent-2:color-mix(in srgb,var(--accent) 72%,#fff);--bg-2:color-mix(in srgb,var(--bg) 94%,var(--head));--line:color-mix(in srgb,var(--accent) 14%,transparent);--fh:${font.heading};--fa:${font.accent};--fb:${font.body}}
*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}
body{font-family:var(--fb);background:var(--bg);color:var(--text);overflow-x:hidden;-webkit-font-smoothing:antialiased}
a{text-decoration:none;color:inherit}img{display:block;max-width:100%}
:focus-visible{outline:2px solid var(--accent);outline-offset:3px}
${revealCss}
/* Nav */
nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;gap:1.5rem;padding:1.2rem 5%;background:color-mix(in srgb,var(--bg) 82%,transparent);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);border-bottom:1px solid var(--line)}
.logo{display:flex;align-items:center;gap:.7rem;min-width:0}
.logo-mark{width:38px;height:38px;flex-shrink:0;border:1.5px solid var(--accent);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--fh);font-size:1.1rem;font-weight:700;color:var(--accent);overflow:hidden}
.logo-mark img{width:100%;height:100%;object-fit:cover}
.logo-text{font-family:var(--fa);font-size:1.45rem;font-weight:600;color:var(--head);letter-spacing:.02em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
nav ul{list-style:none;display:flex;gap:2.2rem}
nav ul .m-only{display:none}
nav ul a{font-size:.82rem;letter-spacing:.5px;opacity:.6;transition:opacity .3s,color .3s}nav ul a:hover{opacity:1;color:var(--accent)}
.nav-right{display:flex;align-items:center;gap:.8rem}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:.6rem;background:var(--accent);color:var(--bg);font-family:var(--fb);font-weight:600;letter-spacing:1.2px;text-transform:uppercase;border:none;cursor:pointer;transition:background .3s,box-shadow .3s,transform .3s}
.btn:hover{background:var(--accent-2);box-shadow:0 14px 36px color-mix(in srgb,var(--accent) 30%,transparent);transform:translateY(-1px)}
.btn svg{width:16px;height:16px}
.nav-btn{padding:.7rem 1.4rem;font-size:.74rem}
.burger{display:none;width:42px;height:42px;align-items:center;justify-content:center;background:none;border:1px solid var(--line);color:var(--head);cursor:pointer}
.burger svg{width:20px;height:20px}
/* Hero */
.hero{min-height:100vh;min-height:100svh;position:relative;display:flex;align-items:center;overflow:hidden}
.hero-bg{position:absolute;inset:0}.hero-bg img{width:100%;height:100%;object-fit:cover;opacity:.5;animation:drift 24s ease-in-out infinite alternate}
@keyframes drift{from{transform:scale(1.04)}to{transform:scale(1.14) translateX(-1.5%)}}
.hero-bg::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,var(--bg) 28%,color-mix(in srgb,var(--bg) 78%,transparent) 55%,color-mix(in srgb,var(--bg) 25%,transparent) 100%)}
.hero-decor{position:absolute;top:18%;right:8%;width:220px;height:220px;border:1px solid var(--line);transform:rotate(45deg);animation:spin 60s linear infinite}
.hero-decor::before{content:'';position:absolute;inset:22px;border:1px solid var(--line)}
@keyframes spin{to{transform:rotate(405deg)}}
.hero-content{position:relative;z-index:2;padding:9rem 5% 5rem;max-width:760px}
.hero h1{font-family:var(--fh);font-size:clamp(2.6rem,6vw,4.6rem);font-weight:700;color:var(--head);line-height:1.06;margin-bottom:1.5rem}
.hero h1 em,.chef h2 em{color:var(--accent);font-style:italic}
.hero p{font-family:var(--fa);font-size:1.25rem;line-height:1.75;opacity:.75;margin-bottom:2.6rem;max-width:500px;font-style:italic}
.hero .btn{padding:1.05rem 2.4rem;font-size:.8rem}
.scroll-cue{position:absolute;left:5%;bottom:2.2rem;z-index:2;font-size:.66rem;letter-spacing:3px;text-transform:uppercase;opacity:.45;display:flex;align-items:center;gap:.8rem}
.scroll-cue::before{content:'';width:42px;height:1px;background:var(--accent)}
.line{height:1px;background:linear-gradient(90deg,transparent,color-mix(in srgb,var(--accent) 30%,transparent),transparent);margin:0 5%}
/* Stats */
.stats{display:grid;grid-template-columns:repeat(var(--n),1fr);max-width:1100px;margin:0 auto;padding:3.5rem 5%}
.stat{text-align:center;position:relative}
.stat+.stat::before{content:'';position:absolute;left:0;top:20%;height:60%;width:1px;background:var(--line)}
.stat b{display:block;font-family:var(--fh);font-size:2.5rem;font-weight:600;color:var(--head)}
.stat span{font-size:.7rem;text-transform:uppercase;letter-spacing:2px;color:color-mix(in srgb,var(--accent) 65%,transparent);margin-top:.4rem;display:block}
/* Sections */
.sec{padding:6.5rem 5%;max-width:1160px;margin:0 auto}
.head{text-align:center;margin-bottom:3.5rem}
.eyebrow{font-size:.68rem;text-transform:uppercase;letter-spacing:4px;color:var(--accent);margin-bottom:.9rem}
.head h2,.reserve h2,.visit h2{font-family:var(--fh);font-size:clamp(2rem,4vw,2.9rem);font-weight:600;color:var(--head);margin-bottom:.7rem;line-height:1.15}
.head p,.reserve-inner>p{font-family:var(--fa);font-size:1.15rem;font-style:italic;opacity:.6;max-width:520px;margin:0 auto}
/* Menu */
.menu-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.4rem}
.dish{display:grid;grid-template-columns:104px 1fr;gap:1.3rem;padding:1.4rem;background:var(--bg-2);border:1px solid color-mix(in srgb,var(--accent) 8%,transparent);border-radius:16px;transition:border-color .35s,transform .35s}
.dish.noimg{grid-template-columns:1fr}
.dish:hover{border-color:color-mix(in srgb,var(--accent) 30%,transparent);transform:translateY(-3px)}
.dish img{width:104px;height:104px;border-radius:12px;object-fit:cover}
.dish h3{font-family:var(--fh);font-size:1.12rem;color:var(--head);font-weight:600;margin-bottom:.35rem}
.dish p{font-size:.82rem;opacity:.6;line-height:1.6;margin-bottom:.7rem}
.dish .bottom{display:flex;justify-content:space-between;align-items:center;gap:1rem}
.price{font-family:var(--fh);font-size:1.15rem;color:var(--accent);font-weight:600}
.tag{font-size:.6rem;text-transform:uppercase;letter-spacing:1px;padding:.28rem .65rem;border:1px solid color-mix(in srgb,var(--accent) 22%,transparent);border-radius:50px;color:var(--accent)}
/* Gallery */
.gallery{max-width:1320px}
.gallery-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem}
.gallery-grid figure{overflow:hidden;border-radius:12px;aspect-ratio:1}
.gallery-grid figure:first-child{grid-column:span 2;grid-row:span 2}
.gallery-grid img{width:100%;height:100%;object-fit:cover;transition:transform .8s cubic-bezier(.2,.7,.2,1)}
.gallery-grid figure:hover img{transform:scale(1.06)}
/* Chef */
.chef{display:grid;grid-template-columns:.9fr 1.1fr;gap:4.5rem;align-items:center}
.chef-img{position:relative}
.chef-img img{width:100%;height:520px;object-fit:cover;border-radius:20px}
.chef-img::before{content:'';position:absolute;inset:-12px;border:1px solid var(--line);border-radius:24px;z-index:-1}
.chef h2{font-family:var(--fh);font-size:clamp(2rem,4vw,2.6rem);font-weight:600;color:var(--head);line-height:1.15;margin-bottom:1.1rem}
.chef .story{font-size:.92rem;opacity:.65;line-height:1.85;margin-bottom:1.6rem}
.chef blockquote{font-family:var(--fa);font-size:1.3rem;font-style:italic;color:var(--head);opacity:.85;border-left:2px solid var(--accent);padding-left:1.2rem;margin-bottom:1rem;line-height:1.55}
.sig{font-family:var(--fh);font-style:italic;font-size:1.1rem;color:var(--accent)}
/* Reviews */
.reviews-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1.4rem}
.review{padding:2rem;background:var(--bg-2);border:1px solid color-mix(in srgb,var(--accent) 8%,transparent);border-radius:16px;display:flex;flex-direction:column;gap:1.2rem}
.stars{color:var(--accent);letter-spacing:3px;font-size:.85rem}
.review q{font-family:var(--fa);font-size:1.15rem;font-style:italic;color:var(--head);line-height:1.6;quotes:'“' '”';flex:1}
.review .who b{display:block;font-size:.85rem;color:var(--head);font-weight:600}
.review .who span{font-size:.72rem;opacity:.55}
/* Visit */
.visit{display:grid;grid-template-columns:1fr 1.15fr;gap:3.5rem;align-items:stretch}
.visit-info{display:flex;flex-direction:column;gap:1.8rem;justify-content:center}
.contact{display:flex;flex-direction:column;gap:1rem}
.contact a,.contact div{display:flex;gap:.9rem;align-items:flex-start;font-size:.92rem;line-height:1.6}
.contact svg{width:20px;height:20px;flex-shrink:0;color:var(--accent);margin-top:.15rem}
.contact a:hover{color:var(--accent)}
.hours{border-top:1px solid var(--line)}
.hours div{display:flex;justify-content:space-between;gap:1rem;padding:.85rem 0;border-bottom:1px solid var(--line);font-size:.88rem}
.hours b{color:var(--head);font-weight:500}
.map{min-height:380px;border-radius:20px;overflow:hidden;border:1px solid var(--line)}
.map iframe{width:100%;height:100%;min-height:380px;border:0;filter:grayscale(.4) contrast(1.05)}
.visit.nomap{grid-template-columns:1fr;max-width:640px}
/* Reserve */
.reserve{padding:6.5rem 5%;position:relative;overflow:hidden}
.reserve-bg{position:absolute;inset:0}.reserve-bg img{width:100%;height:100%;object-fit:cover;opacity:.16}
.reserve-bg::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,var(--bg),color-mix(in srgb,var(--bg) 88%,transparent),var(--bg))}
.reserve-inner{position:relative;z-index:1;max-width:640px;margin:0 auto;text-align:center}
.reserve-inner>p{margin-bottom:2.6rem}
.form{display:grid;grid-template-columns:1fr 1fr;gap:1rem;text-align:left}
.form label{display:flex;flex-direction:column;gap:.45rem;font-size:.7rem;letter-spacing:1px;text-transform:uppercase;color:color-mix(in srgb,var(--accent) 80%,var(--text))}
.form input,.form select{width:100%;background:color-mix(in srgb,var(--accent) 6%,transparent);border:1px solid color-mix(in srgb,var(--accent) 16%,transparent);padding:.95rem 1.1rem;font-family:var(--fb);font-size:.9rem;color:var(--head);outline:none;border-radius:8px;transition:border-color .2s;text-transform:none;letter-spacing:0}
.form input:focus,.form select:focus{border-color:var(--accent)}
.form select option{background:var(--bg);color:var(--head)}
.form .btn{grid-column:1/-1;padding:1.1rem;font-size:.82rem;border-radius:8px;margin-top:.4rem}
.form .note{grid-column:1/-1;text-align:center;font-size:.8rem;opacity:.6}
.ok{display:none;padding:2rem;border:1px solid color-mix(in srgb,var(--accent) 30%,transparent);border-radius:12px;color:var(--head);font-family:var(--fa);font-size:1.25rem;font-style:italic}
.sent .form{display:none}.sent .ok{display:block}
/* Footer */
footer{padding:3rem 5%;border-top:1px solid var(--line);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1.2rem;max-width:1200px;margin:0 auto}
.f-logo{font-family:var(--fa);font-size:1.35rem;color:var(--head)}
.f-links{display:flex;gap:2rem;font-size:.8rem}.f-links a{opacity:.55;transition:opacity .3s,color .3s}.f-links a:hover{opacity:1;color:var(--accent)}
.f-copy{font-size:.74rem;opacity:.4}
.wa{position:fixed;right:22px;bottom:22px;z-index:90;width:56px;height:56px;border-radius:50%;background:#25d366;color:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 30px rgba(0,0,0,.35);transition:transform .3s}
.wa:hover{transform:scale(1.08)}.wa svg{width:30px;height:30px}
@media(max-width:1024px){.menu-grid{grid-template-columns:1fr}.gallery-grid{grid-template-columns:1fr 1fr}.chef,.visit{grid-template-columns:1fr;gap:2.5rem}.stats{grid-template-columns:repeat(2,1fr);gap:2rem}.stat+.stat::before{display:none}.hero-decor{display:none}}
@media(max-width:760px){
nav ul{display:none;position:absolute;top:100%;left:0;right:0;flex-direction:column;gap:0;padding:.5rem 5% 1.2rem;background:var(--bg);border-bottom:1px solid var(--line)}
nav.open ul{display:flex}nav ul .m-only{display:block}nav ul .m-only a{color:var(--accent);opacity:1;border-bottom:0}nav ul a{display:block;padding:.9rem 0;font-size:1rem;opacity:.85;border-bottom:1px solid var(--line)}
.burger{display:flex}.nav-btn{display:none}
.sec,.reserve{padding:4.5rem 6%}
.dish{grid-template-columns:80px 1fr;gap:1rem;padding:1.1rem}.dish img{width:80px;height:80px}
.gallery-grid{grid-template-columns:1fr 1fr;gap:.6rem}
.chef-img img{height:380px}.form{grid-template-columns:1fr}
footer{flex-direction:column;text-align:center}
}
</style>
</head>
<body>
<nav id="nav" aria-label="Main">
<a href="#top" class="logo"><span class="logo-mark">${logo ? `<img src="${logo}" alt="">` : esc(s("brand", "logoLetter").slice(0, 2) || name.charAt(0))}</span><span class="logo-text">${esc(name)}</span></a>
<ul>${navLinks}${bookHref !== "#top" ? `<li class="m-only"><a href="${bookHref}">${cta}</a></li>` : ""}</ul>
<div class="nav-right"><a href="${bookHref}" class="btn nav-btn">${cta}</a><button class="burger" type="button" aria-label="Open menu" aria-expanded="false" onclick="var n=document.getElementById('nav');var o=n.classList.toggle('open');this.setAttribute('aria-expanded',o)">${icon.menu}</button></div>
</nav>

<header class="hero" id="top">
<div class="hero-bg"><img src="${img(s("hero", "image"), d.hero.image as string)}" alt="" fetchpriority="high"></div>
<div class="hero-decor" aria-hidden="true"></div>
<div class="hero-content">
<h1 class="rv">${emph(s("hero", "title"))}</h1>
<p class="rv d1">${esc(s("hero", "text"))}</p>
<a href="${bookHref}" class="btn rv d2">${icon.calendar}${cta}</a>
</div>
<div class="scroll-cue" aria-hidden="true">Scroll</div>
</header>

${r.on("stats") && stats.length ? `<div class="line"></div>
<div class="stats" id="stats" style="--n:${stats.length}">${stats.map((st, i) => `<div class="stat rv d${i}"><b>${esc(st.value)}</b><span>${esc(st.label)}</span></div>`).join("")}</div>
<div class="line"></div>` : ""}

${r.on("menu") ? `<section class="sec" id="menu">
<div class="head rv"><div class="eyebrow">${esc(s("menu", "eyebrow"))}</div><h2>${esc(s("menu", "title"))}</h2>${s("menu", "text") ? `<p>${esc(s("menu", "text"))}</p>` : ""}</div>
<div class="menu-grid">${dishes
    .map(
      (dish, i) => `<article class="dish${dish.image ? "" : " noimg"} rv d${i % 2}">${dish.image ? `<img src="${dish.image}" alt="${esc(dish.name)}" loading="lazy">` : ""}<div><h3>${esc(dish.name)}</h3><p>${esc(dish.desc)}</p><div class="bottom"><span class="price">${esc(dish.price)}</span>${dish.tag ? `<span class="tag">${esc(dish.tag)}</span>` : ""}</div></div></article>`
    )
    .join("")}</div>
</section>` : ""}

${r.on("gallery") && photos.length ? `<section class="sec gallery" id="gallery">
<div class="head rv"><div class="eyebrow">${esc(s("gallery", "eyebrow"))}</div><h2>${esc(s("gallery", "title"))}</h2></div>
<div class="gallery-grid">${photos.map((p, i) => `<figure class="rv d${i % 4}"><img src="${p.image}" alt="${esc(p.alt)}" loading="lazy"></figure>`).join("")}</div>
</section>
<div class="line"></div>` : ""}

${r.on("chef") ? `<section class="sec chef" id="chef">
${img(s("chef", "image")) ? `<div class="chef-img rv"><img src="${img(s("chef", "image"))}" alt="${esc(s("chef", "signature").replace(/^[—–-]\s*/, ""))}" loading="lazy"></div>` : ""}
<div class="rv d1"><div class="eyebrow">${esc(s("chef", "eyebrow"))}</div><h2>${emph(s("chef", "title"))}</h2><p class="story">${esc(s("chef", "text"))}</p>${s("chef", "quote") ? `<blockquote>“${esc(s("chef", "quote").replace(/^["“]|["”]$/g, ""))}”</blockquote>` : ""}${s("chef", "signature") ? `<div class="sig">${esc(s("chef", "signature"))}</div>` : ""}</div>
</section>
<div class="line"></div>` : ""}

${r.on("reviews") && reviews.length ? `<section class="sec" id="reviews">
<div class="head rv"><div class="eyebrow">${esc(s("reviews", "eyebrow"))}</div><h2>${esc(s("reviews", "title"))}</h2></div>
<div class="reviews-grid">${reviews.map((rv, i) => `<figure class="review rv d${i % 3}"><div class="stars" aria-label="5 out of 5 stars">★★★★★</div><q>${esc(rv.quote)}</q><figcaption class="who"><b>${esc(rv.name)}</b>${rv.detail ? `<span>${esc(rv.detail)}</span>` : ""}</figcaption></figure>`).join("")}</div>
</section>` : ""}

${r.on("visit") ? `<section class="sec visit${s("visit", "map") === "hide" || !address ? " nomap" : ""}" id="visit">
<div class="visit-info rv">
<div><div class="eyebrow">${esc(s("visit", "eyebrow"))}</div><h2>${esc(s("visit", "title"))}</h2></div>
<div class="contact">
${address ? `<div>${icon.pin}<span>${lines(address).map(esc).join("<br>")}</span></div>` : ""}
${phone ? `<a href="tel:${esc(phone.replace(/[^\d+]/g, ""))}">${icon.phone}<span>${esc(phone)}</span></a>` : ""}
${email && isEmail(email) ? `<a href="mailto:${esc(email.trim())}">${icon.mail}<span>${esc(email)}</span></a>` : ""}
</div>
${hours.length ? `<div class="hours">${hours.map(([day, time]) => `<div><b>${esc(day)}</b><span>${esc(time ?? "")}</span></div>`).join("")}</div>` : ""}
</div>
${s("visit", "map") !== "hide" && address ? `<div class="map rv d1"><iframe title="Map to ${esc(name)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=${encodeURIComponent(lines(address).join(", "))}&output=embed"></iframe></div>` : ""}
</section>
<div class="line"></div>` : ""}

${r.on("reserve") ? `<section class="reserve" id="reserve">
<div class="reserve-bg"><img src="${photos[0]?.image || (d.hero.image as string)}" alt="" loading="lazy"></div>
<div class="reserve-inner rv">
<div class="eyebrow">${esc(s("reserve", "eyebrow"))}</div><h2>${esc(s("reserve", "title"))}</h2><p>${esc(s("reserve", "text"))}</p>
<form class="form" id="reserve-form" data-to="${esc(sendTo)}" data-restaurant="${esc(name)}">
<label>Full name<input type="text" name="Name" autocomplete="name" required></label>
<label>Phone<input type="tel" name="Phone" autocomplete="tel" required></label>
<label>Date<input type="date" name="Date" required></label>
<label>Time<select name="Time">${options_(s("reserve", "times"))}</select></label>
<label>Guests<select name="Guests">${options_(s("reserve", "guests"))}</select></label>
${csv(s("reserve", "seating")).length ? `<label>Seating<select name="Seating">${options_(s("reserve", "seating"))}</select></label>` : "<span></span>"}
<button type="submit" class="btn">${esc(s("reserve", "button") || "Reserve")}</button>
${!sendTo && phone ? `<p class="note">To confirm, call us on <a href="tel:${esc(phone.replace(/[^\d+]/g, ""))}">${esc(phone)}</a>.</p>` : ""}
</form>
<div class="ok" role="status">${esc(s("reserve", "success"))}</div>
</div>
</section>` : ""}

<footer>
<div class="f-logo">${esc(name)}</div>
${socials.length ? `<div class="f-links">${socials.map(([label, url]) => `<a href="${safeUrl(url)}" target="_blank" rel="noopener">${label}</a>`).join("")}</div>` : ""}
<div class="f-copy">${esc(s("footer", "copyright"))}</div>
</footer>
${whatsapp ? `<a class="wa" href="https://wa.me/${whatsapp}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">${icon.whatsapp}</a>` : ""}
<script>
document.querySelectorAll('#nav ul a').forEach(function(a){a.addEventListener('click',function(){var n=document.getElementById('nav');n.classList.remove('open');n.querySelector('.burger').setAttribute('aria-expanded','false')})});
var f=document.getElementById('reserve-form');
if(f){var d=f.querySelector('input[type=date]');if(d)d.min=new Date().toISOString().slice(0,10);
f.addEventListener('submit',function(e){e.preventDefault();var to=f.dataset.to;if(to){var body='';new FormData(f).forEach(function(v,k){body+=k+': '+v+'\\n'});location.href='mailto:'+to+'?subject='+encodeURIComponent('Table reservation — '+f.dataset.restaurant)+'&body='+encodeURIComponent(body)}f.parentNode.classList.add('sent')})}
</script>
</body>
</html>`;
}

export const auraDining: EditableTemplate = {
  id: "restaurant-aura-dining",
  name: "Aura Dining",
  schema,
  defaults,
  presets,
  render,
  checks: (c) => {
    const r = reader(c);
    const out: { section: string; message: string }[] = [];
    if (r.on("reserve") && !isEmail(r.str("reserve", "sendTo")))
      out.push({ section: "reserve", message: "Add an email under “Send bookings to” so bookings reach you." });
    if (r.on("visit") && !r.str("visit", "address").trim())
      out.push({ section: "visit", message: "Add your address so guests can find you (and to show the map)." });
    if (!r.str("seo", "description").trim())
      out.push({ section: "seo", message: "Add a search description so your page looks good on Google." });
    return out;
  },
};
