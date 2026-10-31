import type { Content, EditableTemplate, Item, Section } from "../editor/types";
import { esc, previewScript, reader, safeColor, safeUrl } from "../editor/html";

const U = (id: string, size: string) => `https://images.unsplash.com/${id}?${size}&fit=crop&auto=format&q=80`;

const schema: Section[] = [
  {
    id: "brand",
    label: "Brand",
    description: "Hotel name and tagline shown on the loading screen and header.",
    fields: [
      { type: "text", key: "name", label: "Hotel name" },
      { type: "text", key: "highlight", label: "Highlight word", hint: "Colored word in the header (e.g. 'Alba' in 'Casa Alba')." },
      { type: "text", key: "location", label: "Location line", placeholder: "Puglia, Italy" },
      { type: "text", key: "checkinTime", label: "Check-in time", placeholder: "15:00" },
      { type: "text", key: "tagline", label: "Tagline", hint: "Shown on the loading screen below the name." },
    ],
  },
  {
    id: "theme",
    label: "Colors",
    fields: [
      { type: "color", key: "bg", label: "Background" },
      { type: "color", key: "ink", label: "Text" },
      { type: "color", key: "terra", label: "Accent (terracotta)" },
      { type: "color", key: "olive", label: "Secondary (olive)" },
      { type: "color", key: "dim", label: "Muted text" },
    ],
  },
  {
    id: "hero",
    label: "Hero headline",
    anchor: "top",
    fields: [
      { type: "text", key: "eyebrow", label: "Small heading", placeholder: "A house above the sea" },
      { type: "textarea", key: "title", label: "Headline", rows: 2, hint: "Wrap words in *stars* to italicize them in the accent color." },
    ],
  },
  {
    id: "suites",
    label: "Suite gallery",
    description: "The rotating 3D carousel of room photos.",
    fields: [
      {
        type: "list",
        key: "items",
        label: "Rooms / photos",
        itemLabel: "Room",
        titleKey: "title",
        min: 4,
        max: 12,
        newItem: { title: "New room", image: "" },
        fields: [
          { type: "text", key: "title", label: "Caption" },
          { type: "image", key: "image", label: "Photo" },
        ],
      },
    ],
  },
  {
    id: "booking",
    label: "Booking bar",
    toggleable: true,
    fields: [
      { type: "text", key: "checkin", label: "Default check-in date", placeholder: "14 Oct 2026" },
      { type: "text", key: "checkout", label: "Default check-out date", placeholder: "18 Oct 2026" },
      { type: "text", key: "guests", label: "Default guests", placeholder: "2 adults" },
      { type: "text", key: "button", label: "Button text" },
      { type: "url", key: "url", label: "Booking link", placeholder: "https://…", hint: "Where the button takes visitors." },
    ],
  },
  {
    id: "weather",
    label: "Weather widget",
    toggleable: true,
    fields: [
      { type: "text", key: "temp", label: "Temperature", placeholder: "26°C · Clear" },
      { type: "text", key: "sunset", label: "Sunset time", placeholder: "Sunset 19:42" },
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
  enabled: { booking: true, weather: true },
  values: {
    brand: {
      name: "Casa",
      highlight: "Alba",
      location: "Puglia, Italy",
      checkinTime: "Check-in 15:00",
      tagline: "Puglia · Twelve rooms · Est. 1998",
    },
    theme: { bg: "#f6efe6", ink: "#42291f", terra: "#b5543c", olive: "#4a5240", dim: "#8d6f5e" },
    hero: {
      eyebrow: "A house above the sea",
      title: "Stay a Little\n*Longer*",
    },
    suites: {
      items: [
        { title: "Suite 04 — Sea terrace", image: U("photo-1566073771259-6a8506099945", "w=620&h=450") },
        { title: "Suite 01 — Courtyard", image: U("photo-1582719478250-c89cae4dc85b", "w=620&h=450") },
        { title: "The Long Room", image: U("photo-1571896349842-33c89424de2d", "w=620&h=450") },
        { title: "Suite 07 — Olive view", image: U("photo-1551882547-ff40c63fe5fa", "w=620&h=450") },
        { title: "The Garden Bath", image: U("photo-1445019980597-93fa8acb246c", "w=620&h=450") },
        { title: "Suite 11 — Rooftop", image: U("photo-1611892440504-42a792e24d32", "w=620&h=450") },
        { title: "The Reading Room", image: U("photo-1520250497591-112f2f40a3f4", "w=620&h=450") },
        { title: "Alba Breakfast", image: U("photo-1590490360182-c33d57733427", "w=620&h=450") },
      ],
    },
    booking: {
      checkin: "14 Oct 2026",
      checkout: "18 Oct 2026",
      guests: "2 adults",
      button: "Check availability",
      url: "#",
    },
    weather: { temp: "26°C · Clear", sunset: "Sunset 19:42" },
    seo: {
      title: "Casa Alba — Stay a Little Longer",
      description: "Casa Alba is a twelve-room house above the sea in Puglia. Stone, linen, olive trees and long afternoons.",
    },
  },
};

const presets = {
  section: "theme",
  items: [
    { name: "Terracotta", swatch: ["#f6efe6", "#b5543c"], values: { bg: "#f6efe6", ink: "#42291f", terra: "#b5543c", olive: "#4a5240", dim: "#8d6f5e" } },
    { name: "Midnight", swatch: ["#1a1a2e", "#c9a96e"], values: { bg: "#1a1a2e", ink: "#e8dcc8", terra: "#c9a96e", olive: "#7a8a6e", dim: "#8a7f6e" } },
    { name: "Sage", swatch: ["#eef2eb", "#6b7c5e"], values: { bg: "#eef2eb", ink: "#2e3528", terra: "#6b7c5e", olive: "#4a5a40", dim: "#7a8570" } },
    { name: "Ocean", swatch: ["#eef3f6", "#3c7a9e"], values: { bg: "#eef3f6", ink: "#1f3242", terra: "#3c7a9e", olive: "#405a52", dim: "#5e7a8d" } },
    { name: "Blush", swatch: ["#f6eeef", "#b55468"], values: { bg: "#f6eeef", ink: "#421f29", terra: "#b55468", olive: "#52404a", dim: "#8d5e6f" } },
    { name: "Charcoal", swatch: ["#2a2a2a", "#d4a574"], values: { bg: "#2a2a2a", ink: "#e8dcc8", terra: "#d4a574", olive: "#7a8a6e", dim: "#9a8a7a" } },
  ],
};

function emphTitle(s: string) {
  return esc(s).replace(/\*(.+?)\*/g, "<em>$1</em>").replace(/\n/g, "<br>");
}

function render(c: Content, options: Parameters<EditableTemplate["render"]>[1] = {}) {
  const r = reader(c);
  const s = r.str;
  const d = defaults.values;
  const col = (key: string) => safeColor(s("theme", key), d.theme[key] as string);
  const bg = col("bg");
  const ink = col("ink");
  const terra = col("terra");
  const olive = col("olive");
  const dim = col("dim");
  const name = s("brand", "name") || "Casa";
  const highlight = s("brand", "highlight");
  const fullName = highlight ? `${name} ${highlight}` : name;
  const suites = r.list("suites", "items").filter((item) => item.image);
  const bookUrl = safeUrl(s("booking", "url"), "#");

  const dataJson = JSON.stringify(
    suites.map((item) => ({ t: item.title, img: safeUrl(item.image) }))
  );

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(s("seo", "title") || fullName)}</title>
<meta name="description" content="${esc(s("seo", "description"))}">
<meta property="og:title" content="${esc(s("seo", "title") || fullName)}">
<meta property="og:description" content="${esc(s("seo", "description"))}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
${previewScript(options?.preview)}
<style>
:root{--bg:${bg};--ink:${ink};--terra:${terra};--olive:${olive};--dim:${dim};--pad:clamp(14px,2.6vw,34px);--hw:min(56vw,640px);--persp:1150px;--safe-top:env(safe-area-inset-top);--safe-right:env(safe-area-inset-right);--safe-bottom:env(safe-area-inset-bottom);--safe-left:env(safe-area-inset-left)}
*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent}html{background:var(--bg);scrollbar-gutter:stable}
body{background:var(--bg);color:var(--ink);font-family:'Inter',sans-serif;font-weight:300;overflow-x:hidden;min-height:100vh;overscroll-behavior-y:none;-webkit-font-smoothing:antialiased}
img{display:block;max-width:100%}a{color:inherit;text-decoration:none}button{font:inherit;color:inherit;background:none;border:none;cursor:pointer}
:focus-visible{outline:2px solid var(--terra);outline-offset:3px}
#track{height:116vh;pointer-events:none}
#stage{position:fixed;inset:0;z-index:10;perspective:var(--persp);overflow:hidden;touch-action:none;background:radial-gradient(circle at 50% 46%,color-mix(in srgb,var(--bg) 96%,#fff) 0%,var(--bg) 46%,color-mix(in srgb,var(--bg) 88%,var(--ink)) 100%)}
#world{position:absolute;top:50%;left:50%;width:0;height:0;transform-style:preserve-3d;will-change:transform}
#ring{position:absolute;top:0;left:0;width:0;height:0;transform-style:preserve-3d}
.card{position:absolute;top:0;left:0;width:var(--cw,160px);height:calc(var(--cw,160px)*.72);margin-left:calc(var(--cw,160px) / -2);margin-top:calc(var(--cw,160px)*-.36);overflow:hidden;background:color-mix(in srgb,var(--bg) 80%,var(--dim));transform-style:preserve-3d;will-change:transform,opacity;transition:opacity .5s ease;box-shadow:0 20px 46px color-mix(in srgb,var(--ink) 18%,transparent)}
.card img{width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .9s ease-out;filter:saturate(.9)}.card.in img{opacity:1}
.card::after{content:'';position:absolute;inset:0;background:rgba(50,28,20,var(--d,0));box-shadow:inset 0 0 0 1px rgba(255,255,255,.22);pointer-events:none}
#head{position:absolute;top:0;left:0;width:var(--hw);margin-left:calc(var(--hw) / -2);text-align:center;font-family:'Cormorant Garamond',Georgia,serif;font-weight:300;font-size:clamp(32px,5vw,78px);line-height:.98;letter-spacing:-.01em;color:var(--ink);text-shadow:0 2px 34px color-mix(in srgb,var(--bg) 95%,transparent);pointer-events:none;user-select:none}
#head span{position:absolute;top:0;left:0;width:100%;transform:translateY(-50%)}#head em{font-style:italic;color:var(--terra)}
#head small{display:block;font-family:'Inter',sans-serif;font-size:9px;font-weight:500;letter-spacing:.34em;text-transform:uppercase;color:var(--olive);margin-bottom:16px}
.vig{position:fixed;inset:0;z-index:12;pointer-events:none;background:radial-gradient(ellipse 90% 92% at 50% 50%,transparent 54%,color-mix(in srgb,var(--ink) 12%,transparent) 84%,color-mix(in srgb,var(--ink) 30%,transparent) 100%)}
header{position:fixed;top:0;left:0;right:0;z-index:60;display:flex;justify-content:space-between;align-items:flex-start;padding:calc(var(--pad)*.9 + var(--safe-top)) calc(var(--pad) + var(--safe-right)) 0 calc(var(--pad) + var(--safe-left));opacity:0;transition:opacity 1.2s ease .2s}
body.on header,body.on .book,body.on .cue,body.on .cap,body.on .weather{opacity:1}
.wordmark{font-family:'Cormorant Garamond',serif;font-size:clamp(22px,2.5vw,31px);letter-spacing:.08em;text-transform:uppercase;line-height:1}
.wordmark b{font-weight:500;color:var(--terra)}.hmeta{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--dim);text-align:right;line-height:1.9}
.weather{position:fixed;right:calc(var(--pad) + var(--safe-right));bottom:calc(var(--pad) + var(--safe-bottom) + 64px);z-index:55;font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--dim);text-align:right;line-height:1.8;opacity:0;transition:opacity 1.2s ease .2s}
.book{position:fixed;left:50%;bottom:calc(var(--pad) + var(--safe-bottom));transform:translateX(-50%);z-index:58;display:flex;align-items:stretch;background:color-mix(in srgb,var(--bg) 96%,#fff);border:1px solid color-mix(in srgb,var(--terra) 24%,transparent);box-shadow:0 18px 46px color-mix(in srgb,var(--ink) 16%,transparent);opacity:0;transition:opacity 1.2s ease .2s}
.book div{padding:11px 18px;border-right:1px solid color-mix(in srgb,var(--terra) 16%,transparent);min-width:112px}.book div:last-child{border:none;padding:0}
.book span{display:block;font-size:8px;letter-spacing:.22em;text-transform:uppercase;color:var(--dim);margin-bottom:3px}.book b{font-size:11.5px;font-weight:500;color:var(--ink)}
.book button,.book a.bbtn{height:100%;display:flex;align-items:center;background:var(--terra);color:#fff;padding:0 22px;font-size:9px;letter-spacing:.2em;text-transform:uppercase;text-decoration:none}
.cap{position:fixed;left:50%;bottom:calc(var(--pad) + var(--safe-bottom) + 82px);transform:translateX(-50%);z-index:56;font-family:'Cormorant Garamond',serif;font-style:italic;font-size:clamp(15px,1.4vw,19px);color:color-mix(in srgb,var(--ink) 70%,var(--terra));white-space:nowrap;opacity:0;transition:opacity 1.2s ease .2s;pointer-events:none}
.cue{position:fixed;left:calc(var(--pad) + var(--safe-left));bottom:calc(var(--pad) + var(--safe-bottom));z-index:54;display:flex;align-items:center;gap:10px;font-size:9px;letter-spacing:.24em;text-transform:uppercase;color:var(--dim);white-space:nowrap;opacity:0;transition:opacity 1.2s ease .2s}
.cue s{width:38px;height:1px;background:color-mix(in srgb,var(--terra) 28%,transparent);position:relative;overflow:hidden;text-decoration:none}
.cue s::after{content:'';position:absolute;inset:0;background:var(--terra);animation:sweep 2.8s ease infinite}
@keyframes sweep{0%{transform:translateX(-100%)}55%{transform:translateX(0)}100%{transform:translateX(100%)}}
#veil{position:fixed;inset:0;z-index:250;background:var(--bg);display:grid;place-items:center;align-content:center;gap:22px;transition:opacity .7s ease}
#veil.out{opacity:0;pointer-events:none}.vl-sun{width:64px;height:32px;border-radius:64px 64px 0 0;background:var(--terra);animation:sun 1.6s ease .1s both}
@keyframes sun{from{opacity:0;transform:translateY(14px) scaleX(.6)}to{opacity:1;transform:none}}
.vl-mk{font-family:'Cormorant Garamond',serif;font-size:clamp(30px,4.6vw,54px);letter-spacing:.1em;text-transform:uppercase;color:var(--ink);animation:rise 1s ease .3s both}
.vl-tg{font-size:9px;letter-spacing:.32em;text-transform:uppercase;color:var(--dim);animation:rise .9s ease .7s both}
@keyframes rise{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@media(max-width:900px){#head{font-size:clamp(32px,6.6vw,60px)}.weather{display:none}}
@media(max-width:768px){.hmeta{display:none}}
@media(max-width:640px){:root{--hw:min(84vw,360px);--pad:clamp(12px,4vw,18px)}.cue{display:none}.book div{padding:9px 12px;min-width:96px}.book button,.book a.bbtn{padding:0 14px}#head{font-size:clamp(32px,9vw,50px)}.cap{bottom:calc(var(--pad) + var(--safe-bottom) + 76px)}}
@media(max-width:420px){.book div:nth-child(2){display:none}}@media(max-width:380px){:root{--hw:min(88vw,320px)}}
@media(max-height:520px) and (orientation:landscape){.hmeta,.weather,.cue,.book,.cap{display:none}#head{font-size:clamp(20px,5.2vh,32px)}}
@media(prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;transition-duration:.14s!important}}
</style>
</head>
<body>
<div id="veil"><div class="vl-sun"></div><div class="vl-mk">${esc(fullName)}</div><div class="vl-tg">${esc(s("brand", "tagline"))}</div></div>
<div id="track"></div>
<div id="stage" data-mode="ring"><div id="world"><div id="ring"></div><h1 id="head"><span><small>${esc(s("hero", "eyebrow"))}</small>${emphTitle(s("hero", "title"))}</span></h1></div></div>
<div class="vig"></div>
<header><a href="#" class="wordmark">${esc(name)} ${highlight ? `<b>${esc(highlight)}</b>` : ""}</a>${s("brand", "location") || s("brand", "checkinTime") ? `<div class="hmeta">${s("brand", "location") ? esc(s("brand", "location")) : ""}${s("brand", "location") && s("brand", "checkinTime") ? "<br>" : ""}${s("brand", "checkinTime") ? esc(s("brand", "checkinTime")) : ""}</div>` : ""}</header>

${r.on("weather") ? `<div class="weather">${esc(s("weather", "temp"))}${s("weather", "sunset") ? "<br>" + esc(s("weather", "sunset")) : ""}</div>` : ""}

${r.on("booking") ? `<div class="book">
<div><span>Check in</span><b>${esc(s("booking", "checkin"))}</b></div>
<div><span>Check out</span><b>${esc(s("booking", "checkout"))}</b></div>
<div><span>Guests</span><b>${esc(s("booking", "guests"))}</b></div>
${bookUrl !== "#" ? `<a href="${bookUrl}" class="bbtn" target="_blank" rel="noopener">${esc(s("booking", "button") || "Book")}</a>` : `<button>${esc(s("booking", "button") || "Book")}</button>`}
</div>` : ""}

<div class="cap" id="cap">${suites.length ? esc(suites[0].title) : ""}</div>
<div class="cue"><s></s>Drag the rooms</div>

<script>
(function(){
  var stage=document.getElementById('stage'),world=document.getElementById('world'),ring=document.getElementById('ring'),head=document.getElementById('head'),cap=document.getElementById('cap');
  var data=${dataJson};
  var N=data.length,cards=[],R=300,PERS=1150,loaded=0;
  var veil=document.getElementById('veil'),ended=false;
  function finish(){if(ended)return;ended=true;veil.classList.add('out');document.body.classList.add('on');setTimeout(function(){if(veil.parentNode)veil.parentNode.removeChild(veil);},1000);}
  data.forEach(function(d){
    var el=document.createElement('div');el.className='card';
    var im=document.createElement('img');im.alt=d.t;im.src=d.img;
    im.addEventListener('load',function(){el.classList.add('in');loaded++;if(loaded>=N)setTimeout(finish,350);});
    im.addEventListener('error',function(){loaded++;if(loaded>=N)setTimeout(finish,200);});
    el.appendChild(im);
    el.addEventListener('mouseenter',function(){cap.textContent=d.t;});
    el.addEventListener('click',function(){cap.textContent=d.t;});
    ring.appendChild(el);cards.push(el);
    if(im.complete&&im.naturalWidth)el.classList.add('in');
  });
  setTimeout(finish,3200);
  function layout(){
    var w=innerWidth,h=innerHeight;
    R=Math.max(w<=380?115:w<=640?155:200,Math.min(450,h*.43,w*.57));
    PERS=w<=380?640:w<=640?780:w<=900?940:1150;
    document.documentElement.style.setProperty('--persp',PERS+'px');
    var cw=Math.round(Math.max(108,R*(w<=380?0.50:w<=640?0.54:.58)));
    ring.style.setProperty('--cw',cw+'px');
    cards.forEach(function(el,i){
      var a=i/N*Math.PI*2;
      var x=Math.sin(a),y=Math.sin(a*2)*.05,z=Math.cos(a);
      el.setAttribute('data-x',x);el.setAttribute('data-y',y);el.setAttribute('data-z',z);
      el.style.transform='translate3d('+(x*R)+'px,'+(-y*R)+'px,'+(z*R-R*.55)+'px) rotateY('+(a*180/Math.PI)+'deg)';
    });
  }
  layout();
  var sx=-3,sy=0,dx=0,dy=0,vx=0,vy=0,cam=0,down=false,px=0,py=0;
  function cl(v,a,b){return v<a?a:v>b?b:v;}
  stage.addEventListener('pointerdown',function(e){down=true;px=e.clientX;py=e.clientY;vx=0;vy=0;try{stage.setPointerCapture(e.pointerId);}catch(err){}});
  stage.addEventListener('pointermove',function(e){if(!down)return;var mx=e.clientX-px,my=e.clientY-py;px=e.clientX;py=e.clientY;dx+=mx*.13;dy=cl(dy+my*.13,-22,22);vx=mx*.13;vy=my*.13;});
  function up(){down=false;}
  stage.addEventListener('pointerup',up);stage.addEventListener('pointercancel',up);
  function frame(){
    if(!down){dx+=vx;dy=cl(dy+vy,-22,22);vx*=.94;vy*=.94;if(Math.abs(vx)<.002)vx=0;if(Math.abs(vy)<.002)vy=0;}
    var p=cl((window.pageYOffset||0)/(innerHeight*.16),0,1);
    cam+=((p*Math.min(54,R*.14))-cam)*.075;
    var ry=sy+dx,rx=sx+dy;
    world.style.transform='translateZ('+cam.toFixed(2)+'px) rotateY('+ry.toFixed(3)+'deg) rotateX('+rx.toFixed(3)+'deg)';
    head.style.transform='rotateX('+(-rx).toFixed(3)+'deg) rotateY('+(-ry).toFixed(3)+'deg) translateZ('+(R*.6).toFixed(1)+'px)';
    head.style.opacity=Math.max(0,1-p*.45).toFixed(3);
    var rad=Math.PI/180,cy=Math.cos(ry*rad),sy2=Math.sin(ry*rad),cx=Math.cos(rx*rad),sx2=Math.sin(rx*rad);
    cards.forEach(function(el){
      var x=+el.getAttribute('data-x'),y=+el.getAttribute('data-y'),z=+el.getAttribute('data-z');
      var X=x*cy+z*sy2,Z=-x*sy2+z*cy,Y=y*cx-Z*sx2,Z2=y*sx2+Z*cx;
      var zf=cl(Z2,-1,1),base=.18+.82*Math.pow((zf+1)/2,.85);
      var dim=cl((1-Math.min(1,p*1.6))*(1-base),0,1);
      el.style.setProperty('--d',(dim*.8).toFixed(3));
      var absZ=Z2*R+cam,near=PERS*.66,f=1;
      if(absZ>near)f=Math.max(0,1-(absZ-near)/200);
      el.style.opacity=f.toFixed(3);
    });
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  window.addEventListener('resize',layout);
})();
</script>
</body>
</html>`;
}

export const immersiveCasaalba: EditableTemplate = {
  id: "immersive-casaalba",
  name: "Casa Alba — Suite Carousel",
  schema,
  defaults,
  presets,
  render,
  checks: (c) => {
    const r = reader(c);
    const out: { section: string; message: string }[] = [];
    const suites = r.list("suites", "items").filter((item) => item.image);
    if (suites.length < 4)
      out.push({ section: "suites", message: "Add at least 4 room photos for the carousel to look full." });
    if (!r.str("seo", "description").trim())
      out.push({ section: "seo", message: "Add a search description so your page looks good on Google." });
    return out;
  },
};
