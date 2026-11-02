import type { Content, EditableTemplate, Section } from "../editor/types";
import { esc, previewScript, reader, safeColor, safeUrl } from "../editor/html";

const HERO_IMG = "https://images.pexels.com/photos/3639709/pexels-photo-3639709.jpeg?auto=compress&cs=tinysrgb&w=1920";
const HERO_VID = "https://videos.pexels.com/video-files/4384957/4384957-hd_1920_1080_30fps.mp4";

const schema: Section[] = [
  {
    id: "brand",
    label: "Brand",
    description: "Logo, navigation and call-to-action button.",
    fields: [
      { type: "text", key: "logoBold", label: "Logo bold part", hint: "Colored part, e.g. 'KA'." },
      { type: "text", key: "logoRest", label: "Logo rest", hint: "e.g. 'IRN'." },
      { type: "text", key: "navLeft", label: "Nav links", hint: "Separate with |" },
      { type: "text", key: "cta", label: "CTA button text" },
    ],
  },
  {
    id: "theme",
    label: "Colors",
    fields: [
      { type: "color", key: "ice", label: "Accent (ice)" },
      { type: "color", key: "cream", label: "Cream" },
      { type: "color", key: "ink", label: "Ink / dark" },
    ],
  },
  {
    id: "hero",
    label: "Hero",
    anchor: "top",
    fields: [
      { type: "text", key: "eyebrow", label: "Eyebrow" },
      { type: "text", key: "line1", label: "Title line 1" },
      { type: "text", key: "line2", label: "Title line 2" },
      { type: "text", key: "line3", label: "Title line 3 (outline)" },
      { type: "image", key: "image", label: "Hero image" },
      { type: "url", key: "video", label: "Hero video URL (optional)", placeholder: "https://…" },
    ],
  },
  {
    id: "lens",
    label: "Lens tile",
    toggleable: true,
    fields: [
      { type: "text", key: "number", label: "Number label", placeholder: "01 / LENS EDITION" },
      { type: "text", key: "title", label: "Title (use / for line break)", placeholder: "BLUE / FROST" },
      { type: "text", key: "desc", label: "Description" },
    ],
  },
  {
    id: "collection",
    label: "Collection tile",
    toggleable: true,
    fields: [
      { type: "text", key: "name", label: "Collection name", placeholder: "ALPINE" },
      { type: "text", key: "year", label: "Year / number", placeholder: "26" },
      { type: "text", key: "caption", label: "Caption", placeholder: "COLLECTION MMXXVI" },
    ],
  },
  {
    id: "product",
    label: "Product tile",
    toggleable: true,
    fields: [
      { type: "text", key: "model", label: "Model label", placeholder: "MODEL 03" },
      { type: "text", key: "frame", label: "Frame text", placeholder: "EXPLORE THE FRAME" },
    ],
  },
  {
    id: "story",
    label: "Story card",
    toggleable: true,
    fields: [
      { type: "text", key: "tag", label: "Tag" },
      { type: "textarea", key: "copy", label: "Copy", rows: 2 },
      { type: "text", key: "more", label: "Link text" },
      { type: "url", key: "moreUrl", label: "Link URL", placeholder: "#" },
    ],
  },
  {
    id: "social",
    label: "Social links",
    toggleable: true,
    fields: [
      { type: "url", key: "twitter", label: "X / Twitter", placeholder: "https://x.com/…" },
      { type: "url", key: "facebook", label: "Facebook", placeholder: "https://facebook.com/…" },
      { type: "url", key: "instagram", label: "Instagram", placeholder: "https://instagram.com/…" },
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
  enabled: { lens: true, collection: true, product: true, story: true, social: true },
  values: {
    brand: { logoBold: "KA", logoRest: "IRN", navLeft: "COLLECTION|OUR WORLD", cta: "EXPLORE COLLECTION" },
    theme: { ice: "#44DAFD", cream: "#F3F1E9", ink: "#0A2238" },
    hero: {
      eyebrow: "BUILT FOR THE WHITEST DAYS",
      line1: "FORM.",
      line2: "FUNCTION.",
      line3: "VISION",
      image: HERO_IMG,
      video: HERO_VID,
    },
    lens: { number: "01 / LENS EDITION", title: "BLUE / FROST", desc: "A cooler perspective" },
    collection: { name: "ALPINE", year: "26", caption: "COLLECTION MMXXVI" },
    product: { model: "MODEL 03", frame: "EXPLORE THE FRAME" },
    story: { tag: "GLACIER COLLECTION", copy: "Crafted for the summits. KAIRN goggles sharpen every view.", more: "Read more", moreUrl: "#" },
    social: { twitter: "#", facebook: "#", instagram: "#" },
    seo: { title: "KAIRN — Alpine 26", description: "Premium alpine eyewear. Form, function and vision for the whitest days." },
  },
};

const presets = {
  section: "theme",
  items: [
    { name: "Ice", swatch: ["#0A2238", "#44DAFD"], values: { ice: "#44DAFD", cream: "#F3F1E9", ink: "#0A2238" } },
    { name: "Gold", swatch: ["#1A1408", "#D4A54A"], values: { ice: "#D4A54A", cream: "#FAF5EB", ink: "#1A1408" } },
    { name: "Rose", swatch: ["#1E0E14", "#E8708A"], values: { ice: "#E8708A", cream: "#FFF0F2", ink: "#1E0E14" } },
    { name: "Lime", swatch: ["#0E1A0A", "#8CD444"], values: { ice: "#8CD444", cream: "#F4FAE9", ink: "#0E1A0A" } },
    { name: "Violet", swatch: ["#14082A", "#A06BF5"], values: { ice: "#A06BF5", cream: "#F3EEFF", ink: "#14082A" } },
  ],
};

const iconUser = `<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.4"/><path d="M5 20c.8-3.6 3.5-5.4 7-5.4s6.2 1.8 7 5.4"/></svg>`;
const iconX = `<svg viewBox="0 0 24 24"><path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-6.4L6.4 22H3.3l7.3-8.3L2.8 2h6.5l4.4 5.8L18.9 2Zm-1.1 18.1h1.7L8.3 3.8H6.5l11.3 16.3Z"/></svg>`;
const iconFb = `<svg viewBox="0 0 24 24"><path d="M14 9h3V5.5h-3c-2.5 0-4 1.6-4 4.2V12H7v3.5h3V22h3.5v-6.5h3l.5-3.5h-3.5V9.9c0-.6.3-.9 1-.9Z"/></svg>`;
const iconIg = `<svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.1 0-3.5 0-4.7.1-1.1.1-1.7.2-2.1.4-.5.2-.9.4-1.2.8-.4.3-.6.7-.8 1.2-.2.4-.3 1-.4 2.1-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c.1 1.1.2 1.7.4 2.1.2.5.4.9.8 1.2.3.4.7.6 1.2.8.4.2 1 .3 2.1.4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.1-.1 1.7-.2 2.1-.4.5-.2.9-.4 1.2-.8.4-.3.6-.7.8-1.2.2-.4.3-1 .4-2.1.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-1.1-.2-1.7-.4-2.1-.2-.5-.4-.9-.8-1.2-.3-.4-.7-.6-1.2-.8-.4-.2-1-.3-2.1-.4-1.2-.1-1.6-.1-4.7-.1Zm0 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8Zm0 8.1a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Zm6.2-8.3a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0Z"/></svg>`;

const goggleSvg = `<svg viewBox="0 0 220 90" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="lensG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#BFEFFF"/><stop offset=".45" stop-color="#7FD8F5"/><stop offset=".7" stop-color="#3A86C8"/><stop offset="1" stop-color="#D8F7FF"/></linearGradient><linearGradient id="glintG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs><path d="M16 34c0-12 9-20 24-20h34c8 0 13 4 16 10 3-6 8-10 16-10h34c15 0 24 8 24 20v10c0 18-11 30-28 30-16 0-26-9-34-20-4-6-8-8-12-8s-8 2-12 8c-8 11-18 20-34 20-17 0-28-12-28-30V34Z" fill="#16202B"/><path d="M27 34c0-9 7-14 17-14h35c7 0 10 4 12 9l4 9c2 5 0 10-6 10H38c-7 0-11-5-11-12v-2Z" fill="url(#lensG)"/><path d="M103 38l4-9c2-5 5-9 12-9h35c10 0 17 5 17 14v2c0 7-4 12-11 12h-51c-6 0-8-5-6-10Z" fill="url(#lensG)"/><path d="M35 28l20-4 12 14-18 5-14-15Z" fill="url(#glintG)" opacity=".85"/><path d="M118 24l14 2 8 12-15 3-7-17Z" fill="url(#glintG)" opacity=".5"/><path d="M27 34c0-9 7-14 17-14h35c7 0 10 4 12 9" stroke="#EAFBFF" stroke-opacity=".55"/><path d="M146 20h30" stroke="#F3F1E9" stroke-width="5" stroke-linecap="round"/><path d="M14 40h-5c-4 0-6 3-6 7v6c0 4 2 7 6 7h4" stroke="#16202B" stroke-width="4"/><path d="M206 40h5c4 0 6 3 6 7v6c0 4-2 7-6 7h-4" stroke="#16202B" stroke-width="4"/></svg>`;

const goggleSvgMobile = `<svg viewBox="0 0 220 90" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 34c0-12 9-20 24-20h34c8 0 13 4 16 10 3-6 8-10 16-10h34c15 0 24 8 24 20v10c0 18-11 30-28 30-16 0-26-9-34-20-4-6-8-8-12-8s-8 2-12 8c-8 11-18 20-34 20-17 0-28-12-28-30V34Z" fill="#16202B"/><path d="M27 34c0-9 7-14 17-14h35c7 0 10 4 12 9l4 9c2 5 0 10-6 10H38c-7 0-11-5-11-12v-2Z" fill="#8FDCF7"/><path d="M103 38l4-9c2-5 5-9 12-9h35c10 0 17 5 17 14v2c0 7-4 12-11 12h-51c-6 0-8-5-6-10Z" fill="#6ECBF0"/><path d="M146 20h30" stroke="#F3F1E9" stroke-width="5" stroke-linecap="round"/></svg>`;

function splitTitle(raw: string): string[] {
  return raw.split("/").map((s) => s.trim()).filter(Boolean);
}

function render(c: Content, options: Parameters<EditableTemplate["render"]>[1] = {}) {
  const r = reader(c);
  const s = r.str;
  const d = defaults.values;
  const col = (key: string) => safeColor(s("theme", key), d.theme[key] as string);
  const ice = col("ice");
  const cream = col("cream");
  const ink = col("ink");

  const logoBold = esc(s("brand", "logoBold") || "KA");
  const logoRest = esc(s("brand", "logoRest") || "IRN");
  const navLinks = (s("brand", "navLeft") || "").split("|").map((l) => l.trim()).filter(Boolean);
  const cta = esc(s("brand", "cta") || "EXPLORE COLLECTION");

  const heroImg = safeUrl(s("hero", "image"), HERO_IMG);
  const heroVid = safeUrl(s("hero", "video"), "");
  const eyebrow = esc(s("hero", "eyebrow"));
  const line1 = esc(s("hero", "line1"));
  const line2 = esc(s("hero", "line2"));
  const line3 = esc(s("hero", "line3"));

  const lensTitleParts = splitTitle(s("lens", "title") || "BLUE / FROST");
  const collName = esc(s("collection", "name") || "ALPINE");
  const collYear = esc(s("collection", "year") || "26");

  const socials = [
    ["X", s("social", "twitter"), iconX, true],
    ["Facebook", s("social", "facebook"), iconFb, false],
    ["Instagram", s("social", "instagram"), iconIg, false],
  ].filter(([, url]) => (url as string).trim()) as [string, string, string, boolean][];

  const storyUrl = safeUrl(s("story", "moreUrl"), "#");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${esc(s("seo", "title") || `${s("brand", "logoBold")}${s("brand", "logoRest")}`)}</title>
<meta name="description" content="${esc(s("seo", "description"))}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Anybody:wdth,wght@75..150,100..900&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
${previewScript(options?.preview)}
<style>
:root{--ice:${ice};--cream:${cream};--ink:${ink};--plate:url("${heroImg}")}
*{margin:0;padding:0;box-sizing:border-box;-webkit-font-smoothing:antialiased}body{font-family:'Inter',sans-serif;background:#dfe8ef;color:#fff;overflow-x:hidden}
.k-desktop{position:relative;width:100vw;height:100vh;overflow:hidden;background:#dfe8ef}
.k-canvas{position:absolute;width:1546px;height:1017px;left:50%;top:50%;transform:translate(-50%,-50%) scale(var(--k,1));transform-origin:center center}
.k-plate{position:absolute;inset:0;overflow:hidden;background:#dfe8ef}
.k-plate img,.k-plate video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 30%}
.k-video{opacity:0;transition:opacity .9s ease}.k-video.is-ready{opacity:1}
.k-shade{position:absolute;inset:0;pointer-events:none;background:linear-gradient(90deg,rgba(22,52,84,.34) 0%,rgba(22,52,84,0) 55%),linear-gradient(270deg,rgba(22,52,84,.2) 0%,rgba(22,52,84,0) 32%),linear-gradient(180deg,rgba(22,52,84,.12),transparent 26%,transparent 72%,rgba(22,52,84,.18))}
.k-head{position:absolute;top:0;left:0;right:0;z-index:6;display:flex;align-items:center;justify-content:space-between;padding:34px 48px 0}
.k-logo{font-family:'Anybody',sans-serif;font-stretch:125%;font-weight:700;font-size:28px;letter-spacing:.12em;color:#fff;text-decoration:none;line-height:1;display:flex;align-items:center}
.k-logo b{color:var(--ice);font-weight:700}
.k-center{position:absolute;left:50%;top:42px;transform:translateX(-50%);font-family:'Anybody',sans-serif;font-stretch:130%;font-weight:500;font-size:15.4px;letter-spacing:.18em;white-space:nowrap;color:rgba(255,255,255,.94)}
.k-center i{font-style:normal;color:rgba(255,255,255,.5);padding:0 10px}
.k-actions{display:flex;align-items:center;gap:22px}
.k-account{width:26px;height:26px;border-radius:50%;border:1px solid rgba(255,255,255,.55);display:flex;align-items:center;justify-content:center}
.k-account svg{width:13px;height:13px;stroke:#fff;fill:none;stroke-width:1.4}
.k-bag{font-family:'Anybody',sans-serif;font-stretch:125%;font-size:12px;letter-spacing:.18em;font-weight:600;color:#fff}
.k-count{width:24px;height:24px;border-radius:50%;background:#fff;color:var(--ink);display:flex;align-items:center;justify-content:center;font-family:'Anybody',sans-serif;font-size:11.5px;font-weight:700}
.k-left{position:absolute;left:62px;top:50%;transform:translateY(-52%);z-index:5;width:760px}
.k-dots{display:flex;gap:8px;margin-bottom:26px}
.k-dot{width:8px;height:8px;border-radius:50%;border:1px solid rgba(255,255,255,.7);background:transparent;padding:0;cursor:pointer;transition:.25s}
.k-dot.is-active{background:var(--ice);border-color:var(--ice);box-shadow:0 0 12px color-mix(in srgb,var(--ice) 60%,transparent)}
.k-eyebrow{font-family:'Anybody',sans-serif;font-stretch:125%;font-size:12px;letter-spacing:.3em;font-weight:500;color:rgba(255,255,255,.92);margin-bottom:16px}
.k-title{font-family:'Anybody',sans-serif;font-weight:300;font-stretch:126%;font-size:106px;line-height:.94;letter-spacing:-.025em;text-transform:uppercase;color:#fff}
.k-title .line{display:block;overflow:hidden;padding-bottom:6px}.k-title .line i{display:block;font-style:normal}
.k-title .outline i{color:transparent;-webkit-text-stroke:2px var(--ice);text-shadow:0 0 34px color-mix(in srgb,var(--ice) 18%,transparent)}
.k-tiles{position:absolute;right:56px;top:50%;transform:translateY(-50%);z-index:5;display:grid;grid-template-columns:280px 280px;grid-template-rows:214px 252px;gap:14px}
.tile{border-radius:16px;position:relative;overflow:hidden}
.t-lens{background:var(--ice);color:#062238;padding:24px;display:flex;flex-direction:column;justify-content:space-between}
.t-lens::after{content:'';position:absolute;right:-42px;top:-54px;width:150px;height:150px;border-radius:50%;background:rgba(255,255,255,.32);filter:blur(2px)}
.t-lens .no{font-family:'Anybody',sans-serif;font-stretch:125%;font-size:10px;letter-spacing:.22em;font-weight:600;opacity:.72}
.t-lens h3{font-family:'Anybody',sans-serif;font-stretch:132%;font-weight:800;font-size:36px;line-height:.95;letter-spacing:-.01em}
.t-lens p{font-size:12px;font-weight:500;opacity:.7}
.t-alpine{padding:20px 4px;display:flex;flex-direction:column;justify-content:center;color:var(--ink)}
.t-alpine .big{font-family:'Anybody',sans-serif;font-stretch:145%;font-weight:300;font-size:62px;line-height:.9;letter-spacing:-.02em;text-transform:uppercase}
.t-alpine .big em{font-style:normal;color:var(--ice);font-weight:200}
.t-alpine .cap{font-family:'Anybody',sans-serif;font-stretch:130%;font-size:9px;letter-spacing:.26em;font-weight:600;color:color-mix(in srgb,var(--ink) 55%,transparent);margin-top:14px}
.t-glass{display:flex;align-items:center;justify-content:center}
.t-round{width:190px;height:190px;border-radius:50%;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.55);backdrop-filter:blur(14px);display:flex;align-items:center;justify-content:center;position:relative;cursor:pointer;transition:.35s;flex-direction:column}
.t-round:hover{background:rgba(255,255,255,.26);transform:scale(1.03)}
.t-round svg.ring{position:absolute;inset:-1px;width:calc(100% + 2px);height:calc(100% + 2px);transform:rotate(-90deg)}
.t-round .arrow{font-family:'Anybody',sans-serif;font-size:28px;color:var(--ice);line-height:1;margin-bottom:8px}
.t-round .idx{font-family:'Anybody',sans-serif;font-stretch:125%;font-size:11px;letter-spacing:.2em;color:#fff}
.t-product{background:var(--cream);color:var(--ink);padding:18px 20px;display:flex;flex-direction:column;justify-content:space-between;cursor:pointer;transition:.35s}
.t-product:hover{transform:translateY(-3px)}
.t-goggle{height:118px;display:flex;align-items:center;justify-content:center}
.t-goggle svg{width:196px;height:auto;filter:drop-shadow(0 10px 16px rgba(14,40,60,.18))}
.t-product .meta{display:flex;align-items:flex-end;justify-content:space-between;gap:10px}
.t-product .model{font-family:'Anybody',sans-serif;font-stretch:130%;font-size:10px;letter-spacing:.22em;font-weight:700;color:color-mix(in srgb,var(--ink) 50%,transparent)}
.t-product .frame{font-family:'Anybody',sans-serif;font-stretch:124%;font-size:13px;letter-spacing:.1em;font-weight:700;border-bottom:1px solid color-mix(in srgb,var(--ink) 35%,transparent);padding-bottom:3px;white-space:nowrap}
.k-story{position:absolute;left:62px;bottom:44px;z-index:6;width:350px;display:flex;gap:14px;align-items:center;padding:13px;border-radius:16px;background:rgba(22,52,84,.55);border:1px solid rgba(255,255,255,.18);backdrop-filter:blur(18px);box-shadow:0 18px 40px rgba(10,30,50,.18)}
.k-thumb{width:66px;height:66px;flex-shrink:0;border-radius:10px;background-image:var(--plate);background-size:cover;background-position:50% 30%}
.k-story .tag{font-family:'Anybody',sans-serif;font-stretch:125%;font-size:8.5px;letter-spacing:.2em;color:var(--ice);font-weight:700;margin-bottom:4px}
.k-story .copy{font-size:11.5px;line-height:1.5;color:rgba(255,255,255,.9)}
.k-story .more{display:inline-block;margin-top:5px;font-size:10.5px;color:#fff;border-bottom:1px solid rgba(255,255,255,.55);padding-bottom:1px;text-decoration:none}
.k-rule{position:absolute;left:0;right:0;bottom:100px;height:1px;background:rgba(255,255,255,.4);transform-origin:left center;z-index:4}
.k-cta{position:absolute;left:50%;bottom:78px;transform:translateX(-50%);z-index:7;height:44px;padding:0 34px;border:none;border-radius:3px;background:var(--ice);color:#062238;font-family:'Anybody',sans-serif;font-stretch:125%;font-size:12.5px;font-weight:800;letter-spacing:.18em;cursor:pointer;transition:background .25s}
.k-cta:hover{filter:brightness(1.15)}
.k-social{position:absolute;right:56px;bottom:38px;z-index:6;display:flex;align-items:center;gap:14px}
.k-social .lbl{font-family:'Anybody',sans-serif;font-stretch:125%;font-size:9.5px;letter-spacing:.22em;color:rgba(255,255,255,.85);margin-right:4px}
.k-soc{width:32px;height:32px;border-radius:50%;border:1px solid rgba(255,255,255,.45);display:flex;align-items:center;justify-content:center;color:#fff;text-decoration:none;transition:.25s}
.k-soc:hover{background:rgba(255,255,255,.14)}.k-soc.is-first{border-color:var(--ice);color:var(--ice)}.k-soc svg{width:13px;height:13px;fill:currentColor}
.k-head{animation:kFade .8s ease .1s both}.k-dots{animation:kFade .6s ease .28s both}.k-eyebrow{animation:kFade .6s ease .42s both}
.k-title .line:nth-child(1) i{animation:kType .8s cubic-bezier(.2,.75,.2,1) .5s both}
.k-title .line:nth-child(2) i{animation:kType .8s cubic-bezier(.2,.75,.2,1) .66s both}
.k-title .line:nth-child(3) i{animation:kType .8s cubic-bezier(.2,.75,.2,1) .82s both}
.t-lens{animation:kRise .7s cubic-bezier(.2,.75,.2,1) .8s both}
.t-alpine{animation:kRise .7s cubic-bezier(.2,.75,.2,1) .92s both}
.t-glass{animation:kRise .7s cubic-bezier(.2,.75,.2,1) 1.04s both}
.t-product{animation:kRise .7s cubic-bezier(.2,.75,.2,1) 1.16s both}
.k-story{animation:kRise .7s ease 1.3s both}.k-cta{animation:kFade .6s ease 1.4s both}
.k-rule{animation:kRule 1s cubic-bezier(.2,.75,.2,1) 1.25s both}.k-social{animation:kFade .6s ease 1.55s both}
@keyframes kFade{from{opacity:0}to{opacity:1}}
@keyframes kRise{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:translateY(0)}}
@keyframes kType{from{opacity:0;transform:translateY(105%)}to{opacity:1;transform:translateY(0)}}
@keyframes kRule{from{transform:scaleX(0)}to{transform:scaleX(1)}}
/* MOBILE */
.k-mob{display:none}
@media(max-width:1199px){.k-desktop{display:none}.k-mob{display:block;background:#e7eef2;color:var(--ink);min-height:100vh}
.km-head{display:flex;align-items:center;justify-content:space-between;padding:20px 28px;position:relative;z-index:20}
.km-logo{font-family:'Anybody',sans-serif;font-stretch:125%;font-weight:700;font-size:24px;letter-spacing:.12em;color:var(--ink);text-decoration:none}.km-logo b{color:var(--ice)}
.km-nav{display:flex;align-items:center;gap:22px}
.km-nav a{font-family:'Anybody',sans-serif;font-stretch:125%;font-size:11px;letter-spacing:.16em;color:var(--ink);text-decoration:none}
.km-burger{display:none;width:42px;height:42px;border-radius:50%;border:1px solid color-mix(in srgb,var(--ink) 25%,transparent);background:transparent;align-items:center;justify-content:center;cursor:pointer}
.km-burger span{display:block;width:16px;height:1.5px;background:var(--ink);position:relative}
.km-burger span::before,.km-burger span::after{content:'';position:absolute;left:0;width:16px;height:1.5px;background:var(--ink)}
.km-burger span::before{top:-5px}.km-burger span::after{top:5px}
.km-hero{position:relative;overflow:hidden;background:#dbe7ee}
.km-plate{position:relative;height:51vh;overflow:hidden}.km-plate img,.km-plate video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 24%}
.km-shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(22,52,84,.26),transparent 65%)}
.km-copy{padding:34px 28px 30px;background:#e7eef2}
.km-eyebrow{font-family:'Anybody',sans-serif;font-stretch:125%;font-size:10px;letter-spacing:.28em;color:color-mix(in srgb,var(--ink) 60%,transparent);margin:14px 0 10px}
.km-title{font-family:'Anybody',sans-serif;font-weight:300;font-stretch:118%;font-size:clamp(38px,9vw,68px);line-height:.95;letter-spacing:-.02em;text-transform:uppercase;color:var(--ink)}
.km-title span{display:block}.km-title .outline{color:transparent;-webkit-text-stroke:1.5px var(--ice)}
.km-dots{display:flex;gap:7px}.km-dot{width:7px;height:7px;border-radius:50%;border:1px solid color-mix(in srgb,var(--ink) 50%,transparent)}.km-dot.on{background:var(--ice);border-color:var(--ice)}
.km-content{display:grid;grid-template-columns:1fr 1.1fr;gap:18px;padding:0 28px 30px;align-items:start;background:#e7eef2}
.km-tiles{display:grid;grid-template-columns:1fr 1fr;gap:10px}.km-tile{border-radius:14px;overflow:hidden;min-height:150px}
.km-tile.lens{background:var(--ice);color:#062238;padding:18px;display:flex;flex-direction:column;justify-content:space-between}
.km-tile.lens .no{font-family:'Anybody',sans-serif;font-size:8.5px;letter-spacing:.2em;font-weight:600;opacity:.7}
.km-tile.lens h3{font-family:'Anybody',sans-serif;font-stretch:130%;font-weight:800;font-size:23px;line-height:.95}.km-tile.lens p{font-size:10px;opacity:.7}
.km-tile.alpine{padding:14px 4px;color:var(--ink);display:flex;flex-direction:column;justify-content:center}
.km-tile.alpine .big{font-family:'Anybody',sans-serif;font-stretch:140%;font-weight:300;font-size:33px;line-height:.9}
.km-tile.alpine .big em{font-style:normal;color:var(--ice)}.km-tile.alpine .cap{font-size:7px;letter-spacing:.24em;font-weight:600;color:color-mix(in srgb,var(--ink) 50%,transparent);margin-top:8px}
.km-tile.glass{display:flex;align-items:center;justify-content:center;min-height:130px}
.km-round{width:112px;height:112px;border-radius:50%;border:1px solid rgba(255,255,255,.7);background:rgba(255,255,255,.2);backdrop-filter:blur(10px);display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;color:#fff}
.km-round .arrow{font-family:'Anybody',sans-serif;font-size:19px;color:var(--ice);margin-bottom:4px}.km-round .idx{font-family:'Anybody',sans-serif;font-size:8.5px;letter-spacing:.16em}
.km-round svg{position:absolute;inset:-1px;width:calc(100% + 2px);height:calc(100% + 2px);transform:rotate(-90deg)}
.km-tile.product{background:var(--cream);padding:12px;display:flex;flex-direction:column;justify-content:space-between;color:var(--ink)}
.km-tile.product svg{width:100%;height:auto;margin:6px 0 10px}
.km-tile.product .model{font-family:'Anybody',sans-serif;font-size:8px;letter-spacing:.2em;font-weight:700;color:color-mix(in srgb,var(--ink) 45%,transparent)}
.km-tile.product .frame{font-family:'Anybody',sans-serif;font-stretch:124%;font-size:10px;letter-spacing:.08em;font-weight:700;border-bottom:1px solid color-mix(in srgb,var(--ink) 35%,transparent);padding-bottom:2px;margin-top:4px;align-self:flex-start}
.km-story{background:rgba(22,52,84,.92);border-radius:16px;padding:14px;display:flex;gap:12px;color:#fff;min-height:100%}
.km-story .thumb{width:54px;height:54px;flex-shrink:0;border-radius:9px;background-image:var(--plate);background-size:cover;background-position:50% 30%}
.km-story .tag{font-family:'Anybody',sans-serif;font-size:8px;letter-spacing:.18em;color:var(--ice);font-weight:700;margin-bottom:4px}
.km-story p{font-size:10.5px;line-height:1.55;color:rgba(255,255,255,.88)}
.km-story a{display:inline-block;margin-top:6px;font-size:10px;color:#fff;text-decoration:none;border-bottom:1px solid rgba(255,255,255,.5)}
.km-actions{position:relative;padding:28px 28px 30px;background:#e7eef2;text-align:center}
.km-actions::before{content:'';position:absolute;left:0;right:0;top:0;height:1px;background:color-mix(in srgb,var(--ink) 18%,transparent)}
.km-cta{height:44px;padding:0 30px;border:none;border-radius:3px;background:var(--ice);color:#062238;font-family:'Anybody',sans-serif;font-stretch:125%;font-size:11.5px;font-weight:800;letter-spacing:.18em;cursor:pointer}
.km-cta:hover{filter:brightness(1.15)}
.km-social{display:flex;align-items:center;justify-content:center;gap:12px;margin-top:22px;color:color-mix(in srgb,var(--ink) 70%,transparent)}
.km-social .lbl{font-family:'Anybody',sans-serif;font-size:8.5px;letter-spacing:.2em;margin-right:2px}
.km-soc{width:30px;height:30px;border-radius:50%;border:1px solid color-mix(in srgb,var(--ink) 30%,transparent);display:flex;align-items:center;justify-content:center;color:var(--ink);text-decoration:none}
.km-soc:first-of-type{border-color:var(--ice);color:var(--ice)}.km-soc svg{width:12px;height:12px;fill:currentColor}
}
@media(max-width:700px){.km-head{padding:16px 20px}
.km-nav{position:absolute;top:64px;right:20px;left:20px;background:#fff;border-radius:14px;box-shadow:0 18px 40px rgba(10,34,56,.18);padding:18px;flex-direction:column;align-items:flex-start;gap:16px;display:none}
.km-nav.open{display:flex}.km-burger{display:flex}.km-hero{min-height:100vh;display:flex;align-items:flex-end}.km-plate{position:absolute;inset:0;height:100%}
.km-plate img,.km-plate video{object-position:50% 18%}
.km-hero::after{content:'';position:absolute;left:0;right:0;bottom:0;height:45%;background:linear-gradient(180deg,transparent,rgba(10,30,50,.55));pointer-events:none}
.km-shade{background:linear-gradient(180deg,rgba(22,52,84,.18),transparent 40%)}.km-copy{position:relative;z-index:3;background:transparent;padding:0 20px 54px;color:#fff}
.km-eyebrow{color:rgba(255,255,255,.85)}.km-title{color:#fff}.km-dot{border-color:rgba(255,255,255,.6)}.km-content{grid-template-columns:1fr;padding:0 20px 26px;background:#e7eef2}
.km-story{order:2}.km-tiles{order:1}.km-actions{padding:24px 20px 30px}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}.k-video,.km-video{display:none!important}}
</style>
</head>
<body>
<div id="kairn-app">
<!-- DESKTOP -->
<div class="k-desktop">
<div class="k-canvas">
<div class="k-plate">
<img src="${heroImg}" alt="${esc(s("hero", "eyebrow"))}">
${heroVid && heroVid !== "#" ? `<video class="k-video" muted loop playsinline autoplay preload="auto" poster="${heroImg}"><source src="${heroVid}" type="video/mp4"></video>` : ""}
</div>
<div class="k-shade"></div>
<header class="k-head">
<a href="#" class="k-logo"><b>${logoBold}</b>${logoRest}</a>
${navLinks.length ? `<div class="k-center">${navLinks.map(esc).join(' <i>/</i> ')}</div>` : ""}
<div class="k-actions"><span class="k-account">${iconUser}</span><span class="k-bag">BAG</span><span class="k-count">0</span></div>
</header>
<div class="k-left">
<div class="k-dots"><button class="k-dot is-active" aria-label="Slide 1"></button><button class="k-dot" aria-label="Slide 2"></button><button class="k-dot" aria-label="Slide 3"></button></div>
<div class="k-eyebrow">${eyebrow}</div>
<h1 class="k-title"><span class="line"><i>${line1}</i></span><span class="line"><i>${line2}</i></span><span class="line outline"><i>${line3}</i></span></h1>
</div>
<div class="k-tiles">
${r.on("lens") ? `<div class="tile t-lens"><div class="no">${esc(s("lens", "number"))}</div><div><h3>${lensTitleParts.map(esc).join("<br>")}</h3><p style="margin-top:10px">${esc(s("lens", "desc"))}</p></div></div>` : '<div class="tile"></div>'}
${r.on("collection") ? `<div class="tile t-alpine"><div class="big">${collName}<br><em>/</em> ${collYear}</div><div class="cap">${esc(s("collection", "caption"))}</div></div>` : '<div class="tile"></div>'}
<div class="tile t-glass"><div class="t-round" role="button" tabindex="0" aria-label="View next product"><svg class="ring" viewBox="0 0 152 152" fill="none"><circle cx="76" cy="76" r="75" stroke="rgba(255,255,255,.35)" stroke-width="1"/><circle cx="76" cy="76" r="75" stroke="var(--ice)" stroke-width="2" stroke-linecap="round" stroke-dasharray="118 353"/></svg><div class="arrow">↗</div><div class="idx">01 / 04</div></div></div>
${r.on("product") ? `<div class="tile t-product"><div class="t-goggle">${goggleSvg}</div><div class="meta"><span class="model">${esc(s("product", "model"))}</span><span class="frame">${esc(s("product", "frame"))}</span></div></div>` : '<div class="tile"></div>'}
</div>
${r.on("story") ? `<div class="k-story"><div class="k-thumb"></div><div><div class="tag">${esc(s("story", "tag"))}</div><div class="copy">${esc(s("story", "copy"))}<br><a href="${storyUrl}" class="more">${esc(s("story", "more"))}</a></div></div></div>` : ""}
<div class="k-rule"></div>
<button class="k-cta">${cta}</button>
${r.on("social") && socials.length ? `<div class="k-social"><span class="lbl">FOLLOW US</span>${socials.map(([label, url, icon, first]) => `<a href="${safeUrl(url)}" class="k-soc${first ? " is-first" : ""}" aria-label="${label}" target="_blank" rel="noopener">${icon}</a>`).join("")}</div>` : ""}
</div>
</div>
<!-- MOBILE -->
<div class="k-mob">
<header class="km-head">
<a href="#" class="km-logo"><b>${logoBold}</b>${logoRest}</a>
<nav class="km-nav" id="kmNav">${navLinks.map((l) => `<a href="#">${esc(l)}</a>`).join("")}<a href="#">BAG (0)</a></nav>
<button class="km-burger" id="kmBurger" aria-label="Open menu" aria-expanded="false"><span></span></button>
</header>
<section class="km-hero">
<div class="km-plate">
<img src="${heroImg}" alt="${esc(s("hero", "eyebrow"))}">
${heroVid && heroVid !== "#" ? `<video class="km-video" muted loop playsinline autoplay preload="auto" poster="${heroImg}"><source src="${heroVid}" type="video/mp4"></video>` : ""}
<div class="km-shade"></div>
</div>
<div class="km-copy">
<div class="km-dots"><span class="km-dot on"></span><span class="km-dot"></span><span class="km-dot"></span></div>
<div class="km-eyebrow">${eyebrow}</div>
<h1 class="km-title"><span>${line1}</span><span>${line2}</span><span class="outline">${line3}</span></h1>
</div>
</section>
<div class="km-content">
<div class="km-tiles">
${r.on("lens") ? `<div class="km-tile lens"><div class="no">${esc(s("lens", "number"))}</div><div><h3>${lensTitleParts.map(esc).join("<br>")}</h3><p style="margin-top:7px">${esc(s("lens", "desc"))}</p></div></div>` : ""}
${r.on("collection") ? `<div class="km-tile alpine"><div class="big">${collName}<br><em>/</em> ${collYear}</div><div class="cap">${esc(s("collection", "caption"))}</div></div>` : ""}
<div class="km-tile glass"><div class="km-round"><svg viewBox="0 0 114 114" fill="none"><circle cx="57" cy="57" r="56" stroke="rgba(255,255,255,.4)" stroke-width="1"/><circle cx="57" cy="57" r="56" stroke="var(--ice)" stroke-width="2" stroke-linecap="round" stroke-dasharray="88 264"/></svg><div class="arrow">↗</div><div class="idx">01 / 04</div></div></div>
${r.on("product") ? `<div class="km-tile product">${goggleSvgMobile}<div><div class="model">${esc(s("product", "model"))}</div><div class="frame">${esc(s("product", "frame"))}</div></div></div>` : ""}
</div>
${r.on("story") ? `<div class="km-story"><div class="thumb"></div><div><div class="tag">${esc(s("story", "tag"))}</div><p>${esc(s("story", "copy"))}<br><a href="${storyUrl}">${esc(s("story", "more"))}</a></p></div></div>` : ""}
</div>
<div class="km-actions">
<button class="km-cta">${cta}</button>
${r.on("social") && socials.length ? `<div class="km-social"><span class="lbl">FOLLOW US</span>${socials.map(([label, url, icon]) => `<a href="${safeUrl(url)}" class="km-soc" aria-label="${label}" target="_blank" rel="noopener">${icon}</a>`).join("")}</div>` : ""}
</div>
</div>
</div>
<script>
(function(){
  var app=document.getElementById('kairn-app');if(!app)return;
  var canvas=app.querySelector('.k-canvas');
  function resize(){if(!canvas)return;var k=Math.min(window.innerWidth/1546,window.innerHeight/1017);canvas.style.setProperty('--k',k)}
  resize();window.addEventListener('resize',resize);
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var vids=app.querySelectorAll('.k-video,.km-video');
  if(reduce){vids.forEach(function(v){v.remove()})}else{
    vids.forEach(function(v){v.addEventListener('loadeddata',function(){v.classList.add('is-ready');v.play().catch(function(){})});v.addEventListener('playing',function(){v.classList.add('is-ready')})});
  }
  var dots=app.querySelectorAll('.k-dot');
  dots.forEach(function(d){d.addEventListener('click',function(){dots.forEach(function(x){x.classList.remove('is-active')});d.classList.add('is-active')})});
  var burger=document.getElementById('kmBurger'),nav=document.getElementById('kmNav');
  if(burger&&nav){burger.addEventListener('click',function(){var open=nav.classList.toggle('open');burger.setAttribute('aria-expanded',open?'true':'false')})}
})();
</script>
</body>
</html>`;
}

export const premiumKairnAlpine: EditableTemplate = {
  id: "premium-kairn-alpine",
  name: "KAIRN — Alpine 26",
  schema,
  defaults,
  presets,
  render,
  checks: (c) => {
    const r = reader(c);
    const out: { section: string; message: string }[] = [];
    if (!r.str("seo", "description").trim())
      out.push({ section: "seo", message: "Add a search description so your page looks good on Google." });
    return out;
  },
};
