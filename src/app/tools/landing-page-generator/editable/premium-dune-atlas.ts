import type { Content, EditableTemplate, Section } from "../editor/types";
import { esc, previewScript, reader, revealCss, revealScript, safeColor, safeUrl } from "../editor/html";

const U = (id: string, size: string) => `https://images.unsplash.com/${id}?${size}&fit=crop&auto=format&q=80`;

const schema: Section[] = [
  {
    id: "brand",
    label: "Brand",
    fields: [
      { type: "text", key: "name", label: "Company name" },
      { type: "text", key: "accent", label: "Accent word", hint: "Shown in gold after the name, e.g. 'Atlas'." },
      { type: "text", key: "cta", label: "Nav button" },
    ],
  },
  {
    id: "theme",
    label: "Colors",
    fields: [
      { type: "color", key: "bg", label: "Page background" },
      { type: "color", key: "dark", label: "Dark / text" },
      { type: "color", key: "terra", label: "Terracotta accent" },
      { type: "color", key: "muted", label: "Muted text" },
      { type: "color", key: "card", label: "Card background" },
    ],
  },
  {
    id: "hero",
    label: "Hero",
    anchor: "top",
    fields: [
      { type: "image", key: "image", label: "Background photo" },
      { type: "text", key: "eyebrow", label: "Eyebrow text" },
      { type: "textarea", key: "title", label: "Headline", rows: 2, hint: "Wrap a word in *stars* to make it italic." },
      { type: "textarea", key: "text", label: "Description", rows: 3 },
      { type: "text", key: "button", label: "Button text" },
      { type: "text", key: "metaLeft", label: "Meta left" },
      { type: "text", key: "metaCenter", label: "Meta center" },
      { type: "text", key: "metaRight", label: "Meta right" },
    ],
  },
  {
    id: "journeys",
    label: "Journeys",
    toggleable: true,
    anchor: "journeys",
    fields: [
      { type: "text", key: "title", label: "Heading" },
      { type: "textarea", key: "subtitle", label: "Description", rows: 2 },
      {
        type: "list",
        key: "items",
        label: "Trip cards",
        itemLabel: "Trip",
        titleKey: "title",
        max: 6,
        newItem: { image: "", loc: "Region · 5 nights", title: "New Journey", desc: "Describe this trip.", price: "From $1,500", link: "View trip →" },
        fields: [
          { type: "image", key: "image", label: "Photo" },
          { type: "text", key: "loc", label: "Location tag" },
          { type: "text", key: "title", label: "Title" },
          { type: "textarea", key: "desc", label: "Description", rows: 2 },
          { type: "text", key: "price", label: "Price text" },
          { type: "text", key: "link", label: "Link text" },
        ],
      },
    ],
  },
  {
    id: "story",
    label: "Story",
    toggleable: true,
    anchor: "story",
    fields: [
      { type: "image", key: "image", label: "Photo" },
      { type: "text", key: "tag", label: "Tag line" },
      { type: "textarea", key: "title", label: "Heading", rows: 2 },
      { type: "textarea", key: "text", label: "Body paragraphs", rows: 4, hint: "Separate paragraphs with a blank line." },
      { type: "text", key: "link", label: "Link text" },
    ],
  },
  {
    id: "quote",
    label: "Quote",
    toggleable: true,
    fields: [
      { type: "textarea", key: "text", label: "Quote text", rows: 3 },
      { type: "text", key: "cite", label: "Attribution" },
    ],
  },
  {
    id: "footer",
    label: "Footer",
    fields: [
      { type: "text", key: "left", label: "Left text" },
      { type: "text", key: "center", label: "Center text" },
      { type: "text", key: "right", label: "Right text" },
    ],
  },
  {
    id: "seo",
    label: "Page settings (SEO)",
    fields: [
      { type: "text", key: "title", label: "Page title" },
      { type: "textarea", key: "description", label: "Search description", rows: 3 },
    ],
  },
];

const defaults: Content = {
  enabled: { journeys: true, story: true, quote: true },
  values: {
    brand: { name: "Dune", accent: "Atlas", cta: "Plan a trip" },
    theme: { bg: "#efe4d2", dark: "#2b1d12", terra: "#b4552d", muted: "#77614d", card: "#fffaf2" },
    hero: {
      image: U("photo-1509316785289-025f5b846b35", "w=1600&h=1000"),
      eyebrow: "Small-group journeys · North Africa",
      title: "Go where the\nmap goes *quiet.*",
      text: "Slow journeys into the Sahara, the Atlas foothills and the old caravan towns — led by people who call these places home.",
      button: "Explore journeys",
      metaLeft: "Morocco · Algeria · Tunisia",
      metaCenter: "Max 8 travellers",
      metaRight: "Est. 2012",
    },
    journeys: {
      title: "Journeys for the curious",
      subtitle: "No convoys, no schedules shouted through a megaphone. Just small groups and long horizons.",
      items: [
        { image: U("photo-1509316785289-025f5b846b35", "w=700&h=500"), loc: "Morocco · 7 nights", title: "The Silent Sands", desc: "From Marrakech over the High Atlas to a private camp in Erg Chigaga.", price: "From $2,400", link: "View trip →" },
        { image: U("photo-1489493585363-d69421e0edd3", "w=700&h=500"), loc: "Morocco · 6 nights", title: "Atlas & Almond", desc: "Village walks, mountain kitchens and the spring blossom of the High Atlas.", price: "From $1,980", link: "View trip →" },
        { image: U("photo-1539020140153-e479b8c22e70", "w=700&h=500"), loc: "Algeria · 9 nights", title: "Caravan Roads", desc: "Ghardaia, the M'Zab valley and nights under the Tassili stars.", price: "From $3,150", link: "View trip →" },
      ],
    },
    story: {
      image: U("photo-1542401886-65d6c61db217", "w=900&h=900"),
      tag: "Why we travel slowly",
      title: "The desert rewards those who don't rush.",
      text: "We plan for tea at the right hour, detours for a good view, and evenings with no itinerary at all.\n\nEvery journey is led by a local guide and kept to eight travellers, so the places you visit stay as you found them.",
      link: "Read our philosophy",
    },
    quote: {
      text: "We came home with sand in our shoes and completely different ideas about time.",
      cite: "— Clara & Tom, The Silent Sands",
    },
    footer: { left: "© 2026 Dune Atlas", center: "hello@duneatlas.travel", right: "Marrakech · Lisbon" },
    seo: { title: "Dune Atlas — Desert Journeys", description: "Slow journeys into the Sahara and Atlas foothills — small groups led by local guides." },
  },
};

const presets = {
  section: "theme",
  items: [
    { name: "Sand", swatch: ["#efe4d2", "#b4552d"], values: { bg: "#efe4d2", dark: "#2b1d12", terra: "#b4552d", muted: "#77614d", card: "#fffaf2" } },
    { name: "Olive", swatch: ["#e8e6d8", "#5a6b3c"], values: { bg: "#e8e6d8", dark: "#1e2a14", terra: "#5a6b3c", muted: "#6b7058", card: "#f5f4ec" } },
    { name: "Ocean", swatch: ["#e0eaef", "#2a5a6b"], values: { bg: "#e0eaef", dark: "#142a32", terra: "#2a5a6b", muted: "#4d6a75", card: "#f0f7fa" } },
    { name: "Clay", swatch: ["#ebe0d4", "#8b4a3a"], values: { bg: "#ebe0d4", dark: "#2b1a14", terra: "#8b4a3a", muted: "#6e554a", card: "#faf5ef" } },
  ],
};

function emphTitle(s: string) {
  return esc(s).replace(/\*(.+?)\*/g, "<em>$1</em>");
}

function render(c: Content, options: Parameters<EditableTemplate["render"]>[1] = {}) {
  const r = reader(c);
  const s = r.str;
  const d = defaults.values;
  const col = (key: string) => safeColor(s("theme", key), d.theme[key] as string);
  const brandName = s("brand", "name") || "Dune";
  const brandAccent = s("brand", "accent") || "Atlas";
  const heroImg = safeUrl(s("hero", "image"), d.hero.image as string);
  const trips = r.list("journeys", "items");
  const storyImg = safeUrl(s("story", "image"), d.story.image as string);
  const storyParagraphs = (s("story", "text") || "").split(/\n\s*\n/).filter(Boolean);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${esc(s("seo", "title") || brandName)}</title>
<meta name="description" content="${esc(s("seo", "description"))}">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,400&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
${previewScript(options?.preview)}
${revealScript}
<style>
:root{--bg:${col("bg")};--dark:${col("dark")};--terra:${col("terra")};--muted:${col("muted")};--card:${col("card")}}
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:var(--bg);color:var(--dark);overflow-x:hidden}a{text-decoration:none;color:inherit}
${revealCss}
.hero{position:relative;min-height:88vh;display:flex;flex-direction:column;overflow:hidden;color:#fff}.hero img.bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.hero::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(43,29,18,.45),rgba(43,29,18,.1) 45%,rgba(43,29,18,.55))}
nav{position:relative;z-index:3;display:flex;align-items:center;justify-content:space-between;padding:1.5rem 5%;max-width:1350px;width:100%;margin:0 auto}
.logo{font-family:'Fraunces',serif;font-size:1.45rem;letter-spacing:.02em}.logo span{color:#ffcfa3}
nav ul{list-style:none;display:flex;gap:2.2rem;font-size:.78rem;font-weight:500;letter-spacing:.06em}nav ul a{opacity:.9}nav ul a:hover{opacity:1}
.nav-btn{border:1px solid rgba(255,255,255,.6);padding:.65rem 1.4rem;border-radius:50px;font-size:.7rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;transition:.25s}.nav-btn:hover{background:#fff;color:var(--dark)}
.hero-copy{position:relative;z-index:3;max-width:1000px;margin:auto;padding:6rem 5%;text-align:center}
.eyebrow{font-size:.68rem;font-weight:600;letter-spacing:.3em;text-transform:uppercase;color:#ffcfa3;margin-bottom:1.4rem}
h1{font-family:'Fraunces',serif;font-size:5.4rem;line-height:1.02;font-weight:300;letter-spacing:-.02em;margin-bottom:1.3rem}h1 em{font-style:italic}
.hero p{max-width:500px;margin:0 auto 2.2rem;line-height:1.8;color:rgba(255,255,255,.82);font-size:.98rem}
.btn{display:inline-block;background:var(--terra);color:#fff;padding:1rem 2.3rem;border-radius:50px;font-size:.72rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;transition:.25s}.btn:hover{filter:brightness(.85)}
.hero .meta{position:relative;z-index:3;display:flex;justify-content:space-between;padding:1.5rem 5%;font-size:.68rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.65);border-top:1px solid rgba(255,255,255,.2);max-width:1350px;width:100%;margin:0 auto}
.section{max-width:1250px;margin:0 auto;padding:5.5rem 5%}.head{display:flex;justify-content:space-between;align-items:end;gap:2rem;margin-bottom:2.5rem;flex-wrap:wrap}
.head h2{font-family:'Fraunces',serif;font-size:2.9rem;font-weight:400;line-height:1.1;max-width:480px}.head p{max-width:340px;color:var(--muted);font-size:.88rem;line-height:1.75}
.trips{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1.4rem}.trip{background:var(--card);border-radius:4px;overflow:hidden;border:1px solid color-mix(in srgb,var(--dark) 12%,transparent);transition:.3s}
.trip:hover{transform:translateY(-6px);box-shadow:0 24px 50px color-mix(in srgb,var(--dark) 12%,transparent)}.trip img{width:100%;height:220px;object-fit:cover}.trip .body{padding:1.5rem}
.trip .loc{font-size:.64rem;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:var(--terra);margin-bottom:.6rem}
.trip h3{font-family:'Fraunces',serif;font-size:1.45rem;font-weight:400;margin-bottom:.5rem}.trip p{font-size:.82rem;color:var(--muted);line-height:1.65;margin-bottom:1.1rem}
.trip .row{display:flex;justify-content:space-between;align-items:center;border-top:1px solid color-mix(in srgb,var(--dark) 12%,transparent);padding-top:1rem;font-size:.73rem}
.trip .row b{color:var(--terra)}.trip .row a{font-weight:600;letter-spacing:.06em;text-transform:uppercase;font-size:.66rem}
.story{display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;max-width:1150px;margin:0 auto;padding:0 5% 6rem}
.story img{width:100%;height:460px;object-fit:cover;border-radius:4px}
.story .tag{font-size:.66rem;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:var(--terra);margin-bottom:1rem}
.story h2{font-family:'Fraunces',serif;font-size:2.6rem;font-weight:400;line-height:1.15;margin-bottom:1rem}
.story p{color:var(--muted);line-height:1.85;font-size:.9rem;margin-bottom:1rem}
.story a{display:inline-block;margin-top:.6rem;font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;border-bottom:1px solid var(--dark);padding-bottom:4px}
.quote{background:var(--terra);color:#fff;padding:4rem 5%;text-align:center}
.quote blockquote{font-family:'Fraunces',serif;font-size:2rem;font-weight:300;font-style:italic;line-height:1.45;max-width:820px;margin:0 auto 1.2rem}
.quote cite{font-style:normal;font-size:.66rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.65)}
footer{display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap;padding:2rem 5%;font-size:.68rem;color:var(--muted);border-top:1px solid color-mix(in srgb,var(--dark) 14%,transparent)}
@media(max-width:1000px){h1{font-size:4rem}.story{grid-template-columns:1fr;gap:2rem}.story img{height:360px}}
@media(max-width:680px){nav ul{display:none}.hero-copy{padding:4rem 5%}h1{font-size:2.9rem}.head h2{font-size:2.1rem}.quote blockquote{font-size:1.4rem}.hero .meta{flex-direction:column;gap:.5rem;align-items:center}}
</style>
</head>
<body>
<section class="hero">
<img class="bg" src="${heroImg}" alt="${esc(brandName)}">
<nav><a href="#" class="logo">${esc(brandName)} <span>${esc(brandAccent)}</span></a><ul>${r.on("journeys") ? '<li><a href="#journeys">Journeys</a></li>' : ""}${r.on("story") ? '<li><a href="#story">Our story</a></li>' : ""}</ul><a href="#journeys" class="nav-btn">${esc(s("brand", "cta"))}</a></nav>
<div class="hero-copy rv">
${s("hero", "eyebrow") ? `<div class="eyebrow">${esc(s("hero", "eyebrow"))}</div>` : ""}
<h1>${emphTitle(s("hero", "title"))}</h1>
<p>${esc(s("hero", "text"))}</p>
<a href="#journeys" class="btn">${esc(s("hero", "button"))}</a>
</div>
<div class="meta"><span>${esc(s("hero", "metaLeft"))}</span><span>${esc(s("hero", "metaCenter"))}</span><span>${esc(s("hero", "metaRight"))}</span></div>
</section>

${r.on("journeys") && trips.length ? `<section class="section" id="journeys"><div class="head rv"><h2>${esc(s("journeys", "title"))}</h2><p>${esc(s("journeys", "subtitle"))}</p></div>
<div class="trips">${trips.map((tr, i) => {
    const img = safeUrl(tr.image, "");
    return `<div class="trip rv${i ? ` d${Math.min(i, 3)}` : ""}">
${img ? `<img src="${img}" alt="${esc(tr.title)}">` : ""}
<div class="body"><div class="loc">${esc(tr.loc)}</div><h3>${esc(tr.title)}</h3><p>${esc(tr.desc)}</p>
<div class="row"><b>${esc(tr.price)}</b><a href="#">${esc(tr.link)}</a></div></div></div>`;
  }).join("")}</div></section>` : ""}

${r.on("story") ? `<section class="story rv" id="story">
<img src="${storyImg}" alt="Story">
<div><div class="tag">${esc(s("story", "tag"))}</div><h2>${esc(s("story", "title"))}</h2>${storyParagraphs.map((p) => `<p>${esc(p)}</p>`).join("")}
${s("story", "link") ? `<a href="#">${esc(s("story", "link"))}</a>` : ""}</div>
</section>` : ""}

${r.on("quote") ? `<section class="quote rv"><blockquote>“${esc(s("quote", "text"))}”</blockquote><cite>${esc(s("quote", "cite"))}</cite></section>` : ""}

<footer><span>${esc(s("footer", "left"))}</span><span>${esc(s("footer", "center"))}</span><span>${esc(s("footer", "right"))}</span></footer>
</body></html>`;
}

export const premiumDuneAtlas: EditableTemplate = {
  id: "premium-dune-atlas",
  name: "Dune Atlas — Desert Journeys",
  schema,
  defaults,
  presets,
  render,
  checks: (c) => {
    const r = reader(c);
    const out: { section: string; message: string }[] = [];
    if (!r.str("seo", "description").trim())
      out.push({ section: "seo", message: "Add a search description so your page looks good on Google." });
    const trips = r.list("journeys", "items");
    if (trips.some((t) => !t.image))
      out.push({ section: "journeys", message: "Some trips are missing photos — add images to make the cards stand out." });
    return out;
  },
};
