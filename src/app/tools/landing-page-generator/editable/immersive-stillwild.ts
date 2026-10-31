import type { Content, EditableTemplate, Item, Section } from "../editor/types";
import { esc, previewScript, reader, safeUrl } from "../editor/html";

const U = (id: string, size: string) => `https://images.unsplash.com/${id}?${size}&fit=crop&auto=format&q=80`;

const schema: Section[] = [
  {
    id: "brand",
    label: "Brand",
    description: "Photographer name and wordmark shown in the header and loading screen.",
    fields: [
      { type: "text", key: "firstName", label: "First name" },
      { type: "text", key: "lastName", label: "Last name" },
      { type: "text", key: "tagline", label: "Archive tagline", placeholder: "Field Notes 2026" },
      { type: "text", key: "headerMeta", label: "Header subtitle", placeholder: "Wildlife archive" },
      { type: "text", key: "headerYears", label: "Years active", placeholder: "2019 — 2026" },
    ],
  },
  {
    id: "hero",
    label: "Title",
    anchor: "top",
    fields: [
      { type: "text", key: "line1", label: "Title line 1" },
      { type: "text", key: "line2", label: "Title line 2 (italic)" },
    ],
  },
  {
    id: "bio",
    label: "Bio",
    fields: [
      { type: "image", key: "avatar", label: "Portrait" },
      { type: "textarea", key: "text", label: "Bio text", rows: 3 },
    ],
  },
  {
    id: "photos",
    label: "Photo sphere",
    description: "Images arranged in a 3D Fibonacci sphere. 8–16 photos work best.",
    fields: [
      {
        type: "list",
        key: "items",
        label: "Photos",
        itemLabel: "Photo",
        titleKey: "title",
        min: 4,
        max: 20,
        newItem: { title: "New Photo", location: "Location", image: "" },
        fields: [
          { type: "text", key: "title", label: "Title" },
          { type: "text", key: "location", label: "Location" },
          { type: "image", key: "image", label: "Image" },
        ],
      },
    ],
  },
  {
    id: "footer",
    label: "Footer text",
    fields: [
      { type: "text", key: "colophon", label: "Bottom-right text", placeholder: "Field Notes 2026" },
      { type: "text", key: "cue", label: "Scroll cue text", placeholder: "Drag to rotate" },
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
  enabled: {},
  values: {
    brand: {
      firstName: "Mara",
      lastName: "Voss",
      tagline: "Field Notes 2026",
      headerMeta: "Wildlife archive",
      headerYears: "2019 — 2026",
    },
    hero: { line1: "Still", line2: "Wild" },
    bio: {
      avatar: U("photo-1507003211169-0a1dd7228f2d", "w=160&h=160"),
      text: "Photography is less about taking pictures and more about learning when not to move. Every frame here was made in natural conditions, without intervention.",
    },
    photos: {
      items: [
        { title: "Before the Dust Settled", location: "South Africa · Limpopo", image: U("photo-1546182990-dffeafbe841d", "w=520&h=520") },
        { title: "The Long Walk Home", location: "Kenya · Maasai Mara", image: U("photo-1564760055775-d63b17a55c44", "w=520&h=520") },
        { title: "Something Understood", location: "Botswana · Okavango", image: U("photo-1561731216-c3a4d99437d5", "w=520&h=520") },
        { title: "Nine Hours of Nothing", location: "Finland · Lapland", image: U("photo-1474511320723-9a56873867b5", "w=520&h=520") },
        { title: "Borrowed Trust", location: "Scotland · Cairngorms", image: U("photo-1484406566174-9da000fda645", "w=520&h=520") },
        { title: "Small Weather", location: "Costa Rica · Osa", image: U("photo-1444464666168-49d633b86797", "w=520&h=520") },
        { title: "Against the Weather", location: "Alaska · Chilkat", image: U("photo-1456926631375-92c8ce872def", "w=520&h=520") },
        { title: "The Pale Edge", location: "India · Bandhavgarh", image: U("photo-1500462918059-b1a0cb512f1d", "w=520&h=520") },
        { title: "Perfect Arithmetic", location: "Indonesia · Raja Ampat", image: U("photo-1518467166778-b88f373ffec7", "w=520&h=520") },
        { title: "Shallow Water", location: "French Polynesia · Fakarava", image: U("photo-1551986782-d0169b3f8fa7", "w=520&h=520") },
        { title: "Two of Nine", location: "India · Ranthambore", image: U("photo-1526095179574-86e5e0f4864a", "w=520&h=520") },
        { title: "Listening Posture", location: "Tanzania · Serengeti", image: U("photo-1549366021-9f761d450615", "w=520&h=520") },
      ],
    },
    footer: { colophon: "Field Notes 2026", cue: "Drag to rotate" },
    seo: {
      title: "Mara Voss — Still Wild",
      description: "Wildlife photography archive by Mara Voss. Field notes from natural encounters, captured without intervention.",
    },
  },
};

const presets = {
  section: "brand",
  items: [
    { name: "Classic", swatch: ["#000000", "#f4f2ef"], values: { firstName: "Mara", lastName: "Voss" } },
  ],
};

function render(c: Content, options: Parameters<EditableTemplate["render"]>[1] = {}) {
  const r = reader(c);
  const s = r.str;
  const firstName = esc(s("brand", "firstName") || "Mara");
  const lastName = esc(s("brand", "lastName") || "Voss");
  const fullName = `${firstName} ${lastName}`;
  const tagline = esc(s("brand", "tagline") || "Field Notes 2026");
  const headerMeta = esc(s("brand", "headerMeta") || "Wildlife archive");
  const headerYears = esc(s("brand", "headerYears"));
  const line1 = esc(s("hero", "line1") || "Still");
  const line2 = esc(s("hero", "line2") || "Wild");
  const avatar = safeUrl(s("bio", "avatar"), "");
  const bioText = esc(s("bio", "text"));
  const photos = r.list("photos", "items").filter((p) => p.image);
  const colophon = esc(s("footer", "colophon"));
  const cue = esc(s("footer", "cue") || "Drag to rotate");

  const photoData = photos.map((p) => `{t:${JSON.stringify(p.title)},s:${JSON.stringify(p.location)},img:${JSON.stringify(safeUrl(p.image, ""))}}`).join(",\n    ");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(s("seo", "title") || fullName)}</title>
<meta name="description" content="${esc(s("seo", "description"))}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
${previewScript(options?.preview)}
<style>
:root{--bg:#000;--ink:#f4f2ef;--dim:#8c8783;--line:rgba(244,242,239,.28);--pad:clamp(14px,2.6vw,34px);--ease:cubic-bezier(.22,.61,.36,1);--hw:min(56vw,640px);--persp:1150px;--safe-top:env(safe-area-inset-top);--safe-right:env(safe-area-inset-right);--safe-bottom:env(safe-area-inset-bottom);--safe-left:env(safe-area-inset-left)}
*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent}html{background:#000;scrollbar-gutter:stable}
body{background:var(--bg);color:var(--ink);font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-weight:300;overflow-x:hidden;min-height:100vh;overscroll-behavior-y:none;-webkit-font-smoothing:antialiased}
img{display:block;max-width:100%}a{color:inherit;text-decoration:none;cursor:pointer}button{font:inherit;color:inherit;background:none;border:none;cursor:pointer}
#track{height:116vh;pointer-events:none}#stage{position:fixed;inset:0;z-index:10;perspective:var(--persp);perspective-origin:50% 50%;overflow:hidden;touch-action:none}
#world{position:absolute;top:50%;left:50%;width:0;height:0;transform-style:preserve-3d;will-change:transform}
#ring{position:absolute;top:0;left:0;width:0;height:0;transform-style:preserve-3d}
.card{position:absolute;top:0;left:0;width:var(--cw,150px);height:var(--cw,150px);margin-left:calc(var(--cw,150px) / -2);margin-top:calc(var(--cw,150px) / -2);border-radius:3px;overflow:hidden;background:#0a0a0a;transform-style:preserve-3d;will-change:transform,opacity;transition:opacity .5s ease}
.card img{width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .8s ease-out;filter:saturate(.92)}.card.in img{opacity:1}
.card::after{content:'';position:absolute;inset:0;background:rgba(0,0,0,var(--d,0));box-shadow:inset 0 0 0 1px rgba(255,255,255,.08);pointer-events:none}
#head{position:absolute;top:0;left:0;width:var(--hw);margin-left:calc(var(--hw) / -2);text-align:center;font-family:'Playfair Display','Times New Roman',serif;font-weight:400;font-size:clamp(25px,3.7vw,55px);line-height:1.06;letter-spacing:-.005em;color:#fff;text-shadow:0 2px 34px rgba(0,0,0,.55);pointer-events:none;user-select:none}
#head span{position:absolute;top:0;left:0;width:100%;transform:translateY(-50%)}#head em{font-style:italic}
.vig{position:fixed;inset:0;z-index:12;pointer-events:none;background:radial-gradient(ellipse 88% 92% at 50% 50%,transparent 48%,rgba(0,0,0,.26) 80%,rgba(0,0,0,.72) 100%)}
header{position:fixed;top:0;left:0;right:0;z-index:60;display:flex;justify-content:space-between;align-items:flex-start;padding:calc(var(--pad)*.8 + var(--safe-top)) calc(var(--pad) + var(--safe-right)) calc(var(--pad)*.35) calc(var(--pad) + var(--safe-left));mix-blend-mode:difference;opacity:0;transition:opacity 1.2s ease .15s}
body.on header,body.on .bio,body.on .colophon,body.on .cue,body.on .tagline{opacity:1}
.wordmark{font-family:'Playfair Display',serif;font-size:clamp(19px,2.1vw,27px);letter-spacing:.005em;line-height:1;color:#fff;white-space:nowrap}.wordmark em{font-style:normal}
.hmeta{font-size:10px;letter-spacing:.24em;text-transform:uppercase;color:rgba(244,242,239,.5);text-align:right;line-height:1.7}
.bio{position:fixed;left:calc(var(--pad) + var(--safe-left));bottom:calc(var(--pad) + var(--safe-bottom));z-index:55;max-width:min(320px,46vw);opacity:0;transition:opacity 1.2s ease .15s}
.who{display:flex;align-items:center;gap:14px;margin-bottom:14px}.who img{width:52px;height:52px;border-radius:3px;object-fit:cover;filter:grayscale(.15)}
.who b{font-family:'Playfair Display',serif;font-weight:400;font-size:19px;letter-spacing:.01em}.bio p{font-size:12.5px;line-height:1.62;color:rgba(244,242,239,.72)}
.colophon{position:fixed;right:calc(var(--pad) + var(--safe-right));bottom:calc(var(--pad) + var(--safe-bottom));z-index:55;font-size:12.5px;color:rgba(244,242,239,.72);opacity:0;transition:opacity 1.2s ease .15s}
.tagline{position:fixed;left:50%;bottom:calc(var(--pad) + var(--safe-bottom) + 30px);transform:translateX(-50%);z-index:56;font-family:'Playfair Display',serif;font-style:italic;font-size:clamp(13px,1.2vw,16px);color:rgba(244,242,239,.75);white-space:nowrap;opacity:0;transition:opacity 1.2s ease .15s;pointer-events:none}
.cue{position:fixed;left:50%;bottom:calc(var(--pad) + var(--safe-bottom) + 4px);transform:translateX(-50%);z-index:54;display:flex;align-items:center;gap:10px;font-size:10px;text-transform:uppercase;letter-spacing:.24em;color:rgba(244,242,239,.42);white-space:nowrap;opacity:0;transition:opacity 1.2s ease .15s}
.cue s{width:44px;height:1px;background:rgba(244,242,239,.28);overflow:hidden;position:relative;text-decoration:none}
.cue s::after{content:'';position:absolute;inset:0;background:#f4f2ef;animation:sweep 2.6s ease infinite}
@keyframes sweep{0%{transform:translateX(-100%)}55%{transform:translateX(0)}100%{transform:translateX(100%)}}
#veil{position:fixed;inset:0;z-index:250;background:#000;display:grid;place-items:center;align-content:center;gap:26px;transition:opacity .6s ease}
#veil.out{opacity:0;pointer-events:none}
.vl-mk{font-family:'Playfair Display',serif;font-size:clamp(28px,4.4vw,52px);letter-spacing:.005em;color:#f4f2ef;opacity:0;animation:riseIn 1.25s ease .15s forwards}
.vl-mk em{font-style:normal}.vl-bar{width:clamp(120px,17vw,210px);height:1px;background:rgba(244,242,239,.16)}
.vl-bar s{display:block;width:100%;height:100%;background:#f4f2ef;transform:scaleX(0);transform-origin:left;transition:transform .55s ease}
.vl-tg{font-size:10px;letter-spacing:.26em;text-transform:uppercase;color:rgba(244,242,239,.38);opacity:0;animation:riseIn .9s ease .7s forwards}
@keyframes riseIn{from{opacity:0;transform:translateY(9px)}to{opacity:1;transform:none}}
@media(max-width:900px){.bio{max-width:min(420px,100vw - 40px)}.bio p{font-size:12px}.colophon{font-size:11px}}
@media(max-width:768px){.colophon{display:none}.bio{max-width:calc(100vw - var(--pad)*2)}#head{font-size:clamp(22px,6.4vw,34px)}}
@media(max-width:640px){:root{--hw:min(84vw,360px);--pad:clamp(12px,4vw,18px)}.who img{width:42px;height:42px}.who b{font-size:17px}.bio p{font-size:11.5px;line-height:1.55}.cue{display:none}.tagline{display:none}}
@media(max-width:380px){:root{--hw:min(88vw,320px)}.who{gap:10px;margin-bottom:10px}.bio p{display:none}}
@media(max-height:520px) and (orientation:landscape){.bio,.colophon,.cue{display:none}#head{font-size:clamp(18px,4.8vh,28px)}header{padding-top:calc(8px + var(--safe-top))}}
@media(prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;transition-duration:.14s!important}}
</style>
</head>
<body>
<div id="veil"><div class="vl-mk">${firstName}<em>${lastName}</em></div><div class="vl-bar"><s id="vbar"></s></div><div class="vl-tg">${tagline}</div></div>
<div id="track"></div>
<div id="stage" data-mode="sphere"><div id="world"><div id="ring"></div><h1 id="head"><span>${line1}<br><em>${line2}</em></span></h1></div></div>
<div class="vig"></div>
<header><a href="#" class="wordmark">${firstName}<em>${lastName}</em></a><div class="hmeta">${headerMeta}${headerYears ? `<br>${headerYears}` : ""}</div></header>
<div class="bio">${avatar ? `<div class="who"><img src="${avatar}" alt="${fullName}"><b>${fullName}</b></div>` : `<div class="who"><b>${fullName}</b></div>`}${bioText ? `<p>${bioText}</p>` : ""}</div>
<div class="tagline" id="cap">${photos.length ? esc(photos[0].title) : ""}</div>
${colophon ? `<div class="colophon">${colophon}</div>` : ""}
<div class="cue"><s></s>${cue}</div>
<script>
(function(){
  var stage=document.getElementById('stage'),world=document.getElementById('world'),ring=document.getElementById('ring'),head=document.getElementById('head'),cap=document.getElementById('cap');
  var data=[
    ${photoData}
  ];
  var N=data.length,GA=Math.PI*(3-Math.sqrt(5)),cards=[],R=300,PERS=1150,loaded=0;
  var vbar=document.getElementById('vbar'),veil=document.getElementById('veil'),ended=false;
  function finish(){if(ended)return;ended=true;if(vbar)vbar.style.transform='scaleX(1)';if(veil){veil.classList.add('out');}document.body.classList.add('on');setTimeout(function(){if(veil&&veil.parentNode)veil.parentNode.removeChild(veil);},950);}
  data.forEach(function(d,i){
    var el=document.createElement('div');el.className='card';
    var im=document.createElement('img');im.alt=d.t;im.src=d.img;
    im.addEventListener('load',function(){el.classList.add('in');loaded++;if(vbar)vbar.style.transform='scaleX('+(loaded/N)+')';if(loaded>=N)setTimeout(finish,450);});
    im.addEventListener('error',function(){loaded++;if(loaded>=N)setTimeout(finish,200);});
    el.appendChild(im);
    el.addEventListener('mouseenter',function(){if(cap)cap.textContent=d.t;});
    el.addEventListener('click',function(){if(cap)cap.textContent=d.t+' \\u2014 '+d.s;});
    ring.appendChild(el);cards.push(el);
    if(im.complete&&im.naturalWidth)el.classList.add('in');
  });
  setTimeout(finish,4200);
  function layout(){
    var w=innerWidth,h=innerHeight;
    var hr=w<=380?0.40:w<=640?0.44:.46,wr=w<=380?0.50:w<=640?0.54:.60;
    R=Math.max(w<=380?110:w<=640?150:190,Math.min(470,h*hr,w*wr));
    PERS=w<=380?640:w<=640?780:w<=900?940:1150;
    document.documentElement.style.setProperty('--persp',PERS+'px');
    var cw=Math.round(Math.max(72,R*(w<=380?0.40:w<=640?0.44:.47)));
    ring.style.setProperty('--cw',cw+'px');
    cards.forEach(function(el,i){
      var yv=1-(i/(N-1))*2,rad=Math.sqrt(Math.max(0,1-yv*yv)),th=i*GA;
      var x=Math.cos(th)*rad,y=yv,z=Math.sin(th)*rad;
      var ry=Math.atan2(x,z)*180/Math.PI,rx=-Math.asin(y)*180/Math.PI;
      el.setAttribute('data-x',x);el.setAttribute('data-y',y);el.setAttribute('data-z',z);
      el.style.transform='translate3d('+(x*R)+'px,'+(-y*R)+'px,'+(z*R)+'px) rotateY('+ry+'deg) rotateX('+rx+'deg)';
    });
  }
  layout();
  var sx=-4,sy=0,dx=0,dy=0,vx=0,vy=0,cam=0,down=false,px=0,py=0;
  function cl(v,a,b){return v<a?a:v>b?b:v;}
  stage.addEventListener('pointerdown',function(e){down=true;px=e.clientX;py=e.clientY;vx=0;vy=0;try{stage.setPointerCapture(e.pointerId);}catch(err){}});
  stage.addEventListener('pointermove',function(e){if(!down)return;var mx=e.clientX-px,my=e.clientY-py;px=e.clientX;py=e.clientY;dx+=mx*.13;dy=cl(dy+my*.13,-28,28);vx=mx*.13;vy=my*.13;});
  function up(){down=false;}
  stage.addEventListener('pointerup',up);stage.addEventListener('pointercancel',up);
  function frame(){
    if(!down){dx+=vx;dy=cl(dy+vy,-28,28);vx*=.94;vy*=.94;if(Math.abs(vx)<.002)vx=0;if(Math.abs(vy)<.002)vy=0;}
    var p=cl((window.pageYOffset||0)/(innerHeight*.16),0,1);
    cam+=((p*Math.min(64,R*.16))-cam)*.075;
    var ry=sy+dx,rx=sx+dy;
    world.style.transform='translateZ('+cam.toFixed(2)+'px) rotateY('+ry.toFixed(3)+'deg) rotateX('+rx.toFixed(3)+'deg)';
    head.style.transform='rotateX('+(-rx).toFixed(3)+'deg) rotateY('+(-ry).toFixed(3)+'deg) translateZ('+(R*.64).toFixed(1)+'px)';
    head.style.opacity=Math.max(0,1-p*.5).toFixed(3);
    var rad=Math.PI/180,cy=Math.cos(ry*rad),sy2=Math.sin(ry*rad),cx=Math.cos(rx*rad),sx2=Math.sin(rx*rad);
    cards.forEach(function(el){
      var x=+el.getAttribute('data-x'),y=+el.getAttribute('data-y'),z=+el.getAttribute('data-z');
      var X=x*cy+z*sy2,Z=-x*sy2+z*cy,Y=y*cx-Z*sx2,Z2=y*sx2+Z*cx;
      var zf=cl(Z2,-1,1),base=.16+.84*Math.pow((zf+1)/2,.85);
      var dim=cl((1-Math.min(1,p*1.6))*(1-base),0,1);
      el.style.setProperty('--d',dim.toFixed(3));
      var absZ=Z2*R+cam,near=PERS*.66,f=1;
      if(absZ>near)f=Math.max(0,1-(absZ-near)/200);
      el.style.opacity=f.toFixed(3);
    });
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  window.addEventListener('resize',layout);
  if(window.visualViewport)window.visualViewport.addEventListener('resize',layout);
})();
</script>
</body>
</html>`;
}

export const immersiveStillwild: EditableTemplate = {
  id: "immersive-stillwild",
  name: "Still Wild — Photo Sphere",
  schema,
  defaults,
  presets,
  render,
  checks: (c) => {
    const r = reader(c);
    const out: { section: string; message: string }[] = [];
    const photos = r.list("photos", "items").filter((p) => p.image);
    if (photos.length < 4)
      out.push({ section: "photos", message: "Add at least 4 photos for the sphere to look good." });
    if (!r.str("seo", "description").trim())
      out.push({ section: "seo", message: "Add a search description so your page looks good on Google." });
    return out;
  },
};
