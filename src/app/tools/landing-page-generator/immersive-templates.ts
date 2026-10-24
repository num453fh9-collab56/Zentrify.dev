export const immersiveTemplates = [

  // ═══════════════════════════════════════════════════════════════
  // 1. PHOTOGRAPHY — Mara Voss · Still Wild
  // ═══════════════════════════════════════════════════════════════
  {
    id: "immersive-stillwild",
    name: "Still Wild — Photo Sphere",
    category: "Photography",
    description: "Black wildlife archive with a Fibonacci photo sphere, title locked to the circle's center, drag inertia and a 16vh scroll dolly.",
    thumb: "🦁",
    getCode: () => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Mara Voss — Still Wild</title>
<meta name="description" content="Wildlife photography archive by Mara Voss. Field notes from natural encounters, captured without intervention.">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
<style>
:root{--bg:#000;--ink:#f4f2ef;--dim:#8c8783;--line:rgba(244,242,239,.28);--pad:clamp(14px,2.6vw,34px);--ease:cubic-bezier(.22,.61,.36,1);--hw:min(56vw,640px);--persp:1150px;--safe-top:env(safe-area-inset-top);--safe-right:env(safe-area-inset-right);--safe-bottom:env(safe-area-inset-bottom);--safe-left:env(safe-area-inset-left)}
*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent}
html{background:#000;scrollbar-gutter:stable}
body{background:var(--bg);color:var(--ink);font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-weight:300;overflow-x:hidden;min-height:100vh;overscroll-behavior-y:none;-webkit-font-smoothing:antialiased}
img{display:block;max-width:100%}a{color:inherit;text-decoration:none;cursor:pointer}button{font:inherit;color:inherit;background:none;border:none;cursor:pointer}
#track{height:116vh;pointer-events:none}
#stage{position:fixed;inset:0;z-index:10;perspective:var(--persp);perspective-origin:50% 50%;overflow:hidden;touch-action:none}
#world{position:absolute;top:50%;left:50%;width:0;height:0;transform-style:preserve-3d;will-change:transform}
#ring{position:absolute;top:0;left:0;width:0;height:0;transform-style:preserve-3d}
.card{position:absolute;top:0;left:0;width:var(--cw,150px);height:var(--cw,150px);margin-left:calc(var(--cw,150px) / -2);margin-top:calc(var(--cw,150px) / -2);border-radius:3px;overflow:hidden;background:#0a0a0a;transform-style:preserve-3d;will-change:transform,opacity;transition:opacity .5s ease}
.card img{width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .8s ease-out;filter:saturate(.92)}
.card.in img{opacity:1}
.card::after{content:'';position:absolute;inset:0;background:rgba(0,0,0,var(--d,0));box-shadow:inset 0 0 0 1px rgba(255,255,255,.08);pointer-events:none}
#head{position:absolute;top:0;left:0;width:var(--hw);margin-left:calc(var(--hw) / -2);text-align:center;font-family:'Playfair Display','Times New Roman',serif;font-weight:400;font-size:clamp(25px,3.7vw,55px);line-height:1.06;letter-spacing:-.005em;color:#fff;text-shadow:0 2px 34px rgba(0,0,0,.55);pointer-events:none;user-select:none}
#head span{position:absolute;top:0;left:0;width:100%;transform:translateY(-50%)}
#head em{font-style:italic}
.vig{position:fixed;inset:0;z-index:12;pointer-events:none;background:radial-gradient(ellipse 88% 92% at 50% 50%,transparent 48%,rgba(0,0,0,.26) 80%,rgba(0,0,0,.72) 100%)}
header{position:fixed;top:0;left:0;right:0;z-index:60;display:flex;justify-content:space-between;align-items:flex-start;padding:calc(var(--pad)*.8 + var(--safe-top)) calc(var(--pad) + var(--safe-right)) calc(var(--pad)*.35) calc(var(--pad) + var(--safe-left));mix-blend-mode:difference;opacity:0;transition:opacity 1.2s ease .15s}
body.on header,body.on .bio,body.on .colophon,body.on .cue,body.on .tagline{opacity:1}
.wordmark{font-family:'Playfair Display',serif;font-size:clamp(19px,2.1vw,27px);letter-spacing:.005em;line-height:1;color:#fff;white-space:nowrap}
.wordmark em{font-style:normal}
.hmeta{font-size:10px;letter-spacing:.24em;text-transform:uppercase;color:rgba(244,242,239,.5);text-align:right;line-height:1.7}
.bio{position:fixed;left:calc(var(--pad) + var(--safe-left));bottom:calc(var(--pad) + var(--safe-bottom));z-index:55;max-width:min(320px,46vw);opacity:0;transition:opacity 1.2s ease .15s}
.who{display:flex;align-items:center;gap:14px;margin-bottom:14px}
.who img{width:52px;height:52px;border-radius:3px;object-fit:cover;filter:grayscale(.15)}
.who b{font-family:'Playfair Display',serif;font-weight:400;font-size:19px;letter-spacing:.01em}
.bio p{font-size:12.5px;line-height:1.62;color:rgba(244,242,239,.72)}
.colophon{position:fixed;right:calc(var(--pad) + var(--safe-right));bottom:calc(var(--pad) + var(--safe-bottom));z-index:55;font-size:12.5px;color:rgba(244,242,239,.72);opacity:0;transition:opacity 1.2s ease .15s}
.tagline{position:fixed;left:50%;bottom:calc(var(--pad) + var(--safe-bottom) + 30px);transform:translateX(-50%);z-index:56;font-family:'Playfair Display',serif;font-style:italic;font-size:clamp(13px,1.2vw,16px);color:rgba(244,242,239,.75);white-space:nowrap;opacity:0;transition:opacity 1.2s ease .15s;pointer-events:none}
.cue{position:fixed;left:50%;bottom:calc(var(--pad) + var(--safe-bottom) + 4px);transform:translateX(-50%);z-index:54;display:flex;align-items:center;gap:10px;font-size:10px;text-transform:uppercase;letter-spacing:.24em;color:rgba(244,242,239,.42);white-space:nowrap;opacity:0;transition:opacity 1.2s ease .15s}
.cue s{width:44px;height:1px;background:rgba(244,242,239,.28);overflow:hidden;position:relative;text-decoration:none}
.cue s::after{content:'';position:absolute;inset:0;background:#f4f2ef;animation:sweep 2.6s ease infinite}
@keyframes sweep{0%{transform:translateX(-100%)}55%{transform:translateX(0)}100%{transform:translateX(100%)}}
#veil{position:fixed;inset:0;z-index:250;background:#000;display:grid;place-items:center;align-content:center;gap:26px;transition:opacity .6s ease}
#veil.out{opacity:0;pointer-events:none}
.vl-mk{font-family:'Playfair Display',serif;font-size:clamp(28px,4.4vw,52px);letter-spacing:.005em;color:#f4f2ef;opacity:0;animation:riseIn 1.25s ease .15s forwards}
.vl-mk em{font-style:normal}
.vl-bar{width:clamp(120px,17vw,210px);height:1px;background:rgba(244,242,239,.16)}
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
<div id="veil"><div class="vl-mk">Mara<em>Voss</em></div><div class="vl-bar"><s id="vbar"></s></div><div class="vl-tg">Field Notes 2026</div></div>
<div id="track"></div>
<div id="stage" data-mode="sphere"><div id="world"><div id="ring"></div><h1 id="head"><span>Still<br><em>Wild</em></span></h1></div></div>
<div class="vig"></div>
<header><a href="#" class="wordmark">Mara<em>Voss</em></a><div class="hmeta">Wildlife archive<br>2019 — 2026</div></header>
<div class="bio"><div class="who"><img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop" alt="Mara Voss"><b>Mara Voss</b></div><p>Photography is less about taking pictures and more about learning when not to move. Every frame here was made in natural conditions, without intervention.</p></div>
<div class="tagline" id="cap">Before the Dust Settled</div>
<div class="colophon">Field Notes 2026</div>
<div class="cue"><s></s>Drag to rotate</div>
<script>
(function(){
  var stage=document.getElementById('stage'),world=document.getElementById('world'),ring=document.getElementById('ring'),head=document.getElementById('head'),cap=document.getElementById('cap');
  var C='https://images.unsplash.com/';
  var data=[
    {t:'Before the Dust Settled',s:'South Africa · Limpopo',img:C+'photo-1546182990-dffeafbe841d?w=520&h=520&fit=crop'},
    {t:'The Long Walk Home',s:'Kenya · Maasai Mara',img:C+'photo-1564760055775-d63b17a55c44?w=520&h=520&fit=crop'},
    {t:'Something Understood',s:'Botswana · Okavango',img:C+'photo-1561731216-c3a4d99437d5?w=520&h=520&fit=crop'},
    {t:'Nine Hours of Nothing',s:'Finland · Lapland',img:C+'photo-1474511320723-9a56873867b5?w=520&h=520&fit=crop'},
    {t:'Borrowed Trust',s:'Scotland · Cairngorms',img:C+'photo-1484406566174-9da000fda645?w=520&h=520&fit=crop'},
    {t:'Small Weather',s:'Costa Rica · Osa',img:C+'photo-1444464666168-49d633b86797?w=520&h=520&fit=crop'},
    {t:'Against the Weather',s:'Alaska · Chilkat',img:C+'photo-1456926631375-92c8ce872def?w=520&h=520&fit=crop'},
    {t:'The Pale Edge',s:'India · Bandhavgarh',img:C+'photo-1500462918059-b1a0cb512f1d?w=520&h=520&fit=crop'},
    {t:'Perfect Arithmetic',s:'Indonesia · Raja Ampat',img:C+'photo-1518467166778-b88f373ffec7?w=520&h=520&fit=crop'},
    {t:'Shallow Water',s:'French Polynesia · Fakarava',img:C+'photo-1551986782-d0169b3f8fa7?w=520&h=520&fit=crop'},
    {t:'Two of Nine',s:'India · Ranthambore',img:C+'photo-1526095179574-86e5e0f4864a?w=520&h=520&fit=crop'},
    {t:'Listening Posture',s:'Tanzania · Serengeti',img:C+'photo-1549366021-9f761d450615?w=520&h=520&fit=crop'}
  ];
  var N=data.length,GA=Math.PI*(3-Math.sqrt(5)),cards=[],R=300,PERS=1150,loaded=0;
  var vbar=document.getElementById('vbar'),veil=document.getElementById('veil'),ended=false;
  function finish(){if(ended)return;ended=true;vbar.style.transform='scaleX(1)';veil.classList.add('out');document.body.classList.add('on');setTimeout(function(){if(veil.parentNode)veil.parentNode.removeChild(veil);},950);}
  data.forEach(function(d,i){
    var el=document.createElement('div');el.className='card';
    var im=document.createElement('img');im.alt=d.t;im.src=d.img;
    im.addEventListener('load',function(){el.classList.add('in');loaded++;vbar.style.transform='scaleX('+(loaded/N)+')';if(loaded>=N)setTimeout(finish,450);});
    im.addEventListener('error',function(){loaded++;if(loaded>=N)setTimeout(finish,200);});
    el.appendChild(im);
    el.addEventListener('mouseenter',function(){cap.textContent=d.t;});
    el.addEventListener('click',function(){cap.textContent=d.t+' — '+d.s;});
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
</html>`,
  },

  // ═══════════════════════════════════════════════════════════════
  // 2. RESTAURANT — Maison Verre
  // ═══════════════════════════════════════════════════════════════
  {
    id: "immersive-maisonverre",
    name: "Maison Verre — Tasting Carousel",
    category: "Restaurant",
    description: "Warm cream and burgundy restaurant page with a rotating carousel of circular plates and a centered seasonal menu title.",
    thumb: "🍽️",
    getCode: () => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Maison Verre — A Table for the Season</title>
<meta name="description" content="Maison Verre, a seasonal tasting room in Lyon. Nine plates, one table, everything grown within a day's drive.">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
<style>
:root{--bg:#efe5d6;--ink:#3a1f1b;--wine:#6d2329;--gold:#b08a4f;--pad:clamp(14px,2.6vw,34px);--hw:min(56vw,640px);--persp:1150px;--safe-top:env(safe-area-inset-top);--safe-right:env(safe-area-inset-right);--safe-bottom:env(safe-area-inset-bottom);--safe-left:env(safe-area-inset-left)}
*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent}
html{background:var(--bg);scrollbar-gutter:stable}
body{background:var(--bg);color:var(--ink);font-family:'Inter',sans-serif;font-weight:300;overflow-x:hidden;min-height:100vh;overscroll-behavior-y:none;-webkit-font-smoothing:antialiased}
img{display:block;max-width:100%}a{color:inherit;text-decoration:none}button{font:inherit;color:inherit;background:none;border:none;cursor:pointer}
#track{height:116vh;pointer-events:none}
#stage{position:fixed;inset:0;z-index:10;perspective:var(--persp);overflow:hidden;touch-action:none;background:radial-gradient(circle at 50% 50%,#f7eee0 0%,#efe5d6 46%,#e2d3bf 100%)}
#world{position:absolute;top:50%;left:50%;width:0;height:0;transform-style:preserve-3d;will-change:transform}
#ring{position:absolute;top:0;left:0;width:0;height:0;transform-style:preserve-3d}
.card{position:absolute;top:0;left:0;width:var(--cw,160px);height:var(--cw,160px);margin-left:calc(var(--cw,160px) / -2);margin-top:calc(var(--cw,160px) / -2);border-radius:50%;overflow:hidden;background:#d9c8b2;transform-style:preserve-3d;will-change:transform,opacity;transition:opacity .5s ease;box-shadow:0 24px 50px rgba(58,31,27,.22),0 0 0 1px rgba(176,138,79,.5)}
.card img{width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .8s ease-out}
.card.in img{opacity:1}
.card::after{content:'';position:absolute;inset:0;border-radius:50%;background:rgba(30,12,10,var(--d,0));box-shadow:inset 0 0 0 6px rgba(239,229,214,.14);pointer-events:none}
#head{position:absolute;top:0;left:0;width:var(--hw);margin-left:calc(var(--hw) / -2);text-align:center;font-family:'Cormorant Garamond',Georgia,serif;font-weight:300;font-size:clamp(30px,4.6vw,66px);line-height:1.02;letter-spacing:-.01em;color:#331a17;text-shadow:0 2px 26px rgba(247,238,224,.9);pointer-events:none;user-select:none}
#head span{position:absolute;top:0;left:0;width:100%;transform:translateY(-50%)}
#head em{font-style:italic;color:var(--wine)}
#head small{display:block;font-family:'Inter',sans-serif;font-size:9.5px;font-weight:500;letter-spacing:.34em;text-transform:uppercase;color:#8a6a52;margin-bottom:14px}
.vig{position:fixed;inset:0;z-index:12;pointer-events:none;background:radial-gradient(ellipse 88% 92% at 50% 50%,transparent 52%,rgba(58,31,27,.14) 82%,rgba(58,31,27,.34) 100%)}
header{position:fixed;top:0;left:0;right:0;z-index:60;display:flex;justify-content:space-between;align-items:flex-start;padding:calc(var(--pad)*.9 + var(--safe-top)) calc(var(--pad) + var(--safe-right)) 0 calc(var(--pad) + var(--safe-left));opacity:0;transition:opacity 1.2s ease .2s}
body.on header,body.on .menu,body.on .hours,body.on .cue,body.on .cap{opacity:1}
.wordmark{font-family:'Cormorant Garamond',serif;font-size:clamp(22px,2.6vw,32px);letter-spacing:.03em;text-transform:uppercase}
.wordmark b{font-weight:500;color:var(--wine)}
.hours{font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:#7c5c48;line-height:1.9;text-align:right;opacity:0;transition:opacity 1.2s ease .2s}
.menu{position:fixed;left:calc(var(--pad) + var(--safe-left));bottom:calc(var(--pad) + var(--safe-bottom));z-index:55;opacity:0;transition:opacity 1.2s ease .2s}
.menu .lbl{font-size:9px;letter-spacing:.3em;text-transform:uppercase;color:#8a6a52;margin-bottom:9px}
.menu div{display:flex;gap:12px;font-size:11.5px;line-height:1.85;color:#573832}
.menu div span:first-child{color:var(--gold);min-width:16px}
.cap{position:fixed;left:50%;bottom:calc(var(--pad) + var(--safe-bottom) + 34px);transform:translateX(-50%);z-index:56;font-family:'Cormorant Garamond',serif;font-style:italic;font-size:clamp(15px,1.4vw,19px);color:#573832;white-space:nowrap;opacity:0;transition:opacity 1.2s ease .2s;pointer-events:none}
.cue{position:fixed;left:50%;bottom:calc(var(--pad) + var(--safe-bottom) + 4px);transform:translateX(-50%);z-index:54;display:flex;align-items:center;gap:10px;font-size:9px;letter-spacing:.24em;text-transform:uppercase;color:#8a6a52;white-space:nowrap;opacity:0;transition:opacity 1.2s ease .2s}
.cue s{width:40px;height:1px;background:rgba(109,35,41,.3);position:relative;overflow:hidden;text-decoration:none}
.cue s::after{content:'';position:absolute;inset:0;background:var(--wine);animation:sweep 2.8s ease infinite}
@keyframes sweep{0%{transform:translateX(-100%)}55%{transform:translateX(0)}100%{transform:translateX(100%)}}
#veil{position:fixed;inset:0;z-index:250;background:#efe5d6;display:grid;place-items:center;align-content:center;gap:22px;transition:opacity .7s ease}
#veil.out{opacity:0;pointer-events:none}
.vl-mk{font-family:'Cormorant Garamond',serif;font-size:clamp(38px,6vw,68px);letter-spacing:.14em;color:#3a1f1b;animation:rise 1.1s ease .1s both}
.vl-tg{font-size:9px;letter-spacing:.34em;text-transform:uppercase;color:#8a6a52;animation:rise .9s ease .55s both}
.vl-bar{width:clamp(110px,16vw,190px);height:1px;background:rgba(109,35,41,.2)}
.vl-bar s{display:block;height:100%;background:var(--wine);transform:scaleX(.2);transform-origin:left;transition:transform 1.1s ease .2s}
#veil.out .vl-bar s{transform:scaleX(1)}
@keyframes rise{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@media(max-width:900px){#head{font-size:clamp(28px,5.4vw,48px)}}
@media(max-width:768px){.hours{display:none}.menu div{font-size:11px}}
@media(max-width:640px){:root{--hw:min(84vw,360px);--pad:clamp(12px,4vw,18px)}.menu{display:none}.cue{display:none}.cap{bottom:calc(var(--pad) + var(--safe-bottom) + 18px)}#head{font-size:clamp(30px,8.4vw,44px)}}
@media(max-width:380px){:root{--hw:min(88vw,320px)}}
@media(max-height:520px) and (orientation:landscape){.menu,.hours,.cue{display:none}#head{font-size:clamp(20px,5vh,30px)}}
@media(prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;transition-duration:.14s!important}}
</style>
</head>
<body>
<div id="veil"><div class="vl-mk">MV</div><div class="vl-bar"><s></s></div><div class="vl-tg">Maison Verre · Lyon · Est. 2011</div></div>
<div id="track"></div>
<div id="stage" data-mode="ring"><div id="world"><div id="ring"></div><h1 id="head"><span><small>Menu du jour</small>A Table<br><em>for the Season</em></span></h1></div></div>
<div class="vig"></div>
<header><a href="#" class="wordmark">Maison <b>Verre</b></a><div class="hours">Dinner · 18:00 — 23:00<br>9 rue des Capucins, Lyon</div></header>
<div class="menu"><div class="lbl">Tonight</div><div><span>I</span><span>Oyster, sorrel, frozen buttermilk</span></div><div><span>II</span><span>Monkfish, vin jaune, leek ash</span></div><div><span>III</span><span>Pear, buckwheat, aged comté</span></div></div>
<div class="cap" id="cap">Oyster, sorrel, frozen buttermilk</div>
<div class="cue"><s></s>Drag the table</div>
<script>
(function(){
  var stage=document.getElementById('stage'),world=document.getElementById('world'),ring=document.getElementById('ring'),head=document.getElementById('head'),cap=document.getElementById('cap');
  var C='https://images.unsplash.com/';
  var data=[
    {t:'Oyster, sorrel, frozen buttermilk',img:C+'photo-1414235077428-338989a2e8c0?w=520&h=520&fit=crop'},
    {t:'Monkfish, vin jaune, leek ash',img:C+'photo-1476224203421-9ac39bcb3327?w=520&h=520&fit=crop'},
    {t:'Pear, buckwheat, aged comté',img:C+'photo-1504674900247-0877df9cc836?w=520&h=520&fit=crop'},
    {t:'Beetroot, blackcurrant, dill',img:C+'photo-1546069901-ba9599a7e63c?w=520&h=520&fit=crop'},
    {t:'Turbot, mussels, cider',img:C+'photo-1540189549336-e6e99c3679fe?w=520&h=520&fit=crop'},
    {t:'Lamb, wild garlic, anchovy',img:C+'photo-1555939594-58d7cb561ad1?w=520&h=520&fit=crop'},
    {t:'Courgette, hazelnut, sheep curd',img:C+'photo-1512621776951-a57141f2eefd?w=520&h=520&fit=crop'},
    {t:'Plum, bay, crème fraîche',img:C+'photo-1567620905732-2d1ec7ab7445?w=520&h=520&fit=crop'},
    {t:'Bitter chocolate, olive oil, salt',img:C+'photo-1565299624946-b28f40a0ae38?w=520&h=520&fit=crop'}
  ];
  var N=data.length,cards=[],R=300,PERS=1150,loaded=0;
  var veil=document.getElementById('veil'),ended=false;
  function finish(){if(ended)return;ended=true;veil.classList.add('out');document.body.classList.add('on');setTimeout(function(){if(veil.parentNode)veil.parentNode.removeChild(veil);},1000);}
  data.forEach(function(d){
    var el=document.createElement('div');el.className='card';
    var im=document.createElement('img');im.alt=d.t;im.src=d.img;
    im.addEventListener('load',function(){el.classList.add('in');loaded++;if(loaded>=N)setTimeout(finish,400);});
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
    R=Math.max(w<=380?115:w<=640?155:195,Math.min(430,h*.42,w*.56));
    PERS=w<=380?640:w<=640?780:w<=900?940:1150;
    document.documentElement.style.setProperty('--persp',PERS+'px');
    var cw=Math.round(Math.max(88,R*(w<=380?0.46:w<=640?0.50:.55)));
    ring.style.setProperty('--cw',cw+'px');
    cards.forEach(function(el,i){
      var a=i/N*Math.PI*2;
      var x=Math.sin(a),y=Math.sin(a*2)*.07,z=Math.cos(a);
      el.setAttribute('data-x',x);el.setAttribute('data-y',y);el.setAttribute('data-z',z);
      el.style.transform='translate3d('+(x*R)+'px,'+(-y*R)+'px,'+(z*R-R*.55)+'px) rotateY('+(a*180/Math.PI)+'deg)';
    });
  }
  layout();
  var sx=-3,sy=0,dx=0,dy=0,vx=0,vy=0,cam=0,down=false,px=0,py=0;
  function cl(v,a,b){return v<a?a:v>b?b:v;}
  stage.addEventListener('pointerdown',function(e){down=true;px=e.clientX;py=e.clientY;vx=0;vy=0;try{stage.setPointerCapture(e.pointerId);}catch(err){}});
  stage.addEventListener('pointermove',function(e){if(!down)return;var mx=e.clientX-px,my=e.clientY-py;px=e.clientX;py=e.clientY;dx+=mx*.13;dy=cl(dy+my*.13,-26,26);vx=mx*.13;vy=my*.13;});
  function up(){down=false;}
  stage.addEventListener('pointerup',up);stage.addEventListener('pointercancel',up);
  function frame(){
    if(!down){dx+=vx;dy=cl(dy+vy,-26,26);vx*=.94;vy*=.94;if(Math.abs(vx)<.002)vx=0;if(Math.abs(vy)<.002)vy=0;}
    var p=cl((window.pageYOffset||0)/(innerHeight*.16),0,1);
    cam+=((p*Math.min(52,R*.14))-cam)*.075;
    var ry=sy+dx,rx=sx+dy;
    world.style.transform='translateZ('+cam.toFixed(2)+'px) rotateY('+ry.toFixed(3)+'deg) rotateX('+rx.toFixed(3)+'deg)';
    head.style.transform='rotateX('+(-rx).toFixed(3)+'deg) rotateY('+(-ry).toFixed(3)+'deg) translateZ('+(R*.58).toFixed(1)+'px)';
    head.style.opacity=Math.max(0,1-p*.45).toFixed(3);
    var rad=Math.PI/180,cy=Math.cos(ry*rad),sy2=Math.sin(ry*rad),cx=Math.cos(rx*rad),sx2=Math.sin(rx*rad);
    cards.forEach(function(el){
      var x=+el.getAttribute('data-x'),y=+el.getAttribute('data-y'),z=+el.getAttribute('data-z');
      var X=x*cy+z*sy2,Z=-x*sy2+z*cy,Y=y*cx-Z*sx2,Z2=y*sx2+Z*cx;
      var zf=cl(Z2,-1,1),base=.18+.82*Math.pow((zf+1)/2,.85);
      var dim=cl((1-Math.min(1,p*1.6))*(1-base),0,1);
      el.style.setProperty('--d',(dim*.85).toFixed(3));
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
</html>`,
  },

  // ═══════════════════════════════════════════════════════════════
  // 3. AGENCY — Signal & Noise
  // ═══════════════════════════════════════════════════════════════
  {
    id: "immersive-signalnoise",
    name: "Signal & Noise — Work Reel",
    category: "Agency",
    description: "Acid-lime studio page with a 3D project reel, oversized uppercase headline, live ticker and availability stamp.",
    thumb: "⚡",
    getCode: () => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Signal &amp; Noise — Work That Moves</title>
<meta name="description" content="Signal &amp; Noise is an independent design studio building brands, products and campaigns that move people.">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
<style>
:root{--bg:#0a0a0a;--ink:#f2f2ee;--lime:#d9ff3f;--dim:#8a8a82;--pad:clamp(14px,2.6vw,34px);--hw:min(56vw,640px);--persp:1150px;--safe-top:env(safe-area-inset-top);--safe-right:env(safe-area-inset-right);--safe-bottom:env(safe-area-inset-bottom);--safe-left:env(safe-area-inset-left)}
*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent}
html{background:var(--bg);scrollbar-gutter:stable}
body{background:var(--bg);color:var(--ink);font-family:'Inter',sans-serif;font-weight:300;overflow-x:hidden;min-height:100vh;overscroll-behavior-y:none;-webkit-font-smoothing:antialiased}
img{display:block;max-width:100%}a{color:inherit;text-decoration:none}button{font:inherit;color:inherit;background:none;border:none;cursor:pointer}
#track{height:116vh;pointer-events:none}
#stage{position:fixed;inset:0;z-index:10;perspective:var(--persp);overflow:hidden;touch-action:none;background:radial-gradient(circle at 50% 55%,#151515 0%,#0a0a0a 60%,#050505 100%)}
#world{position:absolute;top:50%;left:50%;width:0;height:0;transform-style:preserve-3d;will-change:transform}
#ring{position:absolute;top:0;left:0;width:0;height:0;transform-style:preserve-3d}
.card{position:absolute;top:0;left:0;width:var(--cw,140px);height:calc(var(--cw,140px)*1.32);margin-left:calc(var(--cw,140px) / -2);margin-top:calc(var(--cw,140px)*-.66);overflow:hidden;background:#141414;transform-style:preserve-3d;will-change:transform,opacity;transition:opacity .5s ease}
.card img{width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .8s ease-out;filter:grayscale(.35) contrast(1.05)}
.card.in img{opacity:1}
.card::after{content:'';position:absolute;inset:0;background:rgba(0,0,0,var(--d,0));box-shadow:inset 0 0 0 1px rgba(217,255,63,.16);pointer-events:none}
#head{position:absolute;top:0;left:0;width:var(--hw);margin-left:calc(var(--hw) / -2);text-align:center;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:clamp(38px,7.2vw,104px);line-height:.92;letter-spacing:-.05em;text-transform:uppercase;color:#fff;text-shadow:0 4px 40px rgba(0,0,0,.7);pointer-events:none;user-select:none}
#head span{position:absolute;top:0;left:0;width:100%;transform:translateY(-50%)}
#head em{font-style:normal;color:transparent;-webkit-text-stroke:1.5px var(--lime)}
.vig{position:fixed;inset:0;z-index:12;pointer-events:none;background:radial-gradient(ellipse 86% 90% at 50% 50%,transparent 50%,rgba(0,0,0,.35) 84%,rgba(0,0,0,.8) 100%)}
header{position:fixed;top:0;left:0;right:0;z-index:60;display:flex;justify-content:space-between;align-items:flex-start;padding:calc(var(--pad)*.8 + var(--safe-top)) calc(var(--pad) + var(--safe-right)) 0 calc(var(--pad) + var(--safe-left));opacity:0;transition:opacity 1.2s ease .15s}
body.on header,body.on .avail,body.on .ticker,body.on .cue,body.on .idx{opacity:1}
.wordmark{font-family:'Space Grotesk',sans-serif;font-size:clamp(16px,1.7vw,21px);font-weight:700;letter-spacing:-.02em;text-transform:uppercase}
.wordmark b{color:var(--lime)}
.avail{font-size:9.5px;letter-spacing:.2em;text-transform:uppercase;color:var(--dim);text-align:right;line-height:1.9;opacity:0;transition:opacity 1.2s ease .15s}
.avail i{display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--lime);margin-right:7px;font-style:normal}
.idx{position:fixed;right:calc(var(--pad) + var(--safe-right));top:50%;z-index:55;display:flex;flex-direction:column;gap:7px;font-size:9px;letter-spacing:.18em;color:var(--dim);opacity:0;transition:opacity 1.2s ease .15s}
.idx b{color:var(--lime);font-weight:500}
.cue{position:fixed;left:calc(var(--pad) + var(--safe-left));bottom:calc(var(--pad) + var(--safe-bottom) + 42px);z-index:54;display:flex;align-items:center;gap:10px;font-size:9px;letter-spacing:.24em;text-transform:uppercase;color:var(--dim);opacity:0;transition:opacity 1.2s ease .15s}
.cue s{width:40px;height:1px;background:rgba(242,242,238,.24);position:relative;overflow:hidden;text-decoration:none}
.cue s::after{content:'';position:absolute;inset:0;background:var(--lime);animation:sweep 2.4s ease infinite}
@keyframes sweep{0%{transform:translateX(-100%)}55%{transform:translateX(0)}100%{transform:translateX(100%)}}
.cap{position:fixed;left:calc(var(--pad) + var(--safe-left));bottom:calc(var(--pad) + var(--safe-bottom) + 16px);z-index:56;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:rgba(242,242,238,.55);opacity:0;transition:opacity 1.2s ease .15s;pointer-events:none}
.ticker{position:fixed;left:0;right:0;bottom:0;z-index:58;background:var(--lime);color:#0a0a0a;font-family:'Space Grotesk',sans-serif;font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;overflow:hidden;white-space:nowrap;padding:7px 0;opacity:0;transition:opacity 1.2s ease .15s}
.ticker span{display:inline-block;animation:slide 24s linear infinite}
@keyframes slide{to{transform:translateX(-50%)}}
#veil{position:fixed;inset:0;z-index:250;background:#0a0a0a;display:grid;place-items:center;align-content:center;gap:18px;transition:opacity .55s ease}
#veil.out{opacity:0;pointer-events:none}
.vl-mk{font-family:'Space Grotesk',sans-serif;font-size:clamp(30px,5vw,56px);font-weight:700;letter-spacing:-.04em;text-transform:uppercase;color:#fff;animation:rise .9s ease .1s both}
.vl-mk b{color:var(--lime)}
.vl-tg{font-size:9px;letter-spacing:.34em;text-transform:uppercase;color:var(--dim);animation:rise .8s ease .45s both}
.vl-bar{width:clamp(120px,18vw,220px);height:2px;background:#222}
.vl-bar s{display:block;height:100%;background:var(--lime);transform-origin:left;animation:grow 1.5s cubic-bezier(.2,.8,.2,1) forwards}
@keyframes grow{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes rise{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@media(max-width:900px){#head{font-size:clamp(36px,8vw,74px)}}
@media(max-width:768px){.idx{display:none}}
@media(max-width:640px){:root{--hw:min(84vw,360px);--pad:clamp(12px,4vw,18px)}#head{font-size:clamp(34px,10vw,56px)}.avail{display:none}.cue{display:none}}
@media(max-width:380px){:root{--hw:min(88vw,320px)}}
@media(max-height:520px) and (orientation:landscape){.avail,.idx,.cue{display:none}#head{font-size:clamp(24px,6vh,38px)}}
@media(prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;transition-duration:.14s!important}}
</style>
</head>
<body>
<div id="veil"><div class="vl-mk">Signal<b>/</b>Noise</div><div class="vl-bar"><s></s></div><div class="vl-tg">Independent studio · London</div></div>
<div id="track"></div>
<div id="stage" data-mode="ring"><div id="world"><div id="ring"></div><h1 id="head"><span>Work<br>That<br><em>Moves</em></span></h1></div></div>
<div class="vig"></div>
<header><a href="#" class="wordmark">Signal<b>/</b>Noise<sup>®</sup></a><div class="avail"><i></i>Booking Q3 2026<br>London · Berlin</div></header>
<div class="idx"><span><b>08</b> selected</span><span>2016—26</span><span>Brand · Digital</span></div>
<div class="cue"><s></s>Drag to explore</div>
<div class="cap" id="cap">Northline — Brand system</div>
<div class="ticker"><span>Northline · Kestrel · Mono Studio · Fieldwork · Aperture Labs · Northline · Kestrel · Mono Studio · Fieldwork · Aperture Labs · </span></div>
<script>
(function(){
  var stage=document.getElementById('stage'),world=document.getElementById('world'),ring=document.getElementById('ring'),head=document.getElementById('head'),cap=document.getElementById('cap');
  var C='https://images.unsplash.com/';
  var data=[
    {t:'Northline — Brand system',img:C+'photo-1558655146-9f40138edfeb?w=560&h=740&fit=crop'},
    {t:'Kestrel — Product launch',img:C+'photo-1561070791-2526d30994b5?w=560&h=740&fit=crop'},
    {t:'Mono Studio — Identity',img:C+'photo-1559028012-481c04fa702d?w=560&h=740&fit=crop'},
    {t:'Fieldwork — Campaign',img:C+'photo-1497215728101-856f4ea42174?w=560&h=740&fit=crop'},
    {t:'Aperture Labs — Platform',img:C+'photo-1551288049-bebda4e38f71?w=560&h=740&fit=crop'},
    {t:'Cinder — E-commerce',img:C+'photo-1460925895917-afdab827c52f?w=560&h=740&fit=crop'},
    {t:'Marrow — Art direction',img:C+'photo-1542744173-8e7e53415bb0?w=560&h=740&fit=crop'},
    {t:'Halcyon — Motion',img:C+'photo-1497366811353-6870744d04b2?w=560&h=740&fit=crop'}
  ];
  var N=data.length,cards=[],R=300,PERS=1150,loaded=0;
  var veil=document.getElementById('veil'),ended=false;
  function finish(){if(ended)return;ended=true;veil.classList.add('out');document.body.classList.add('on');setTimeout(function(){if(veil.parentNode)veil.parentNode.removeChild(veil);},900);}
  data.forEach(function(d){
    var el=document.createElement('div');el.className='card';
    var im=document.createElement('img');im.alt=d.t;im.src=d.img;
    im.addEventListener('load',function(){el.classList.add('in');loaded++;if(loaded>=N)setTimeout(finish,300);});
    im.addEventListener('error',function(){loaded++;if(loaded>=N)setTimeout(finish,200);});
    el.appendChild(im);
    el.addEventListener('mouseenter',function(){cap.textContent=d.t;});
    el.addEventListener('click',function(){cap.textContent=d.t;});
    ring.appendChild(el);cards.push(el);
    if(im.complete&&im.naturalWidth)el.classList.add('in');
  });
  setTimeout(finish,2800);
  function layout(){
    var w=innerWidth,h=innerHeight;
    R=Math.max(w<=380?120:w<=640?160:205,Math.min(440,h*.44,w*.58));
    PERS=w<=380?640:w<=640?780:w<=900?940:1150;
    document.documentElement.style.setProperty('--persp',PERS+'px');
    var cw=Math.round(Math.max(78,R*(w<=380?0.40:w<=640?0.42:.44)));
    ring.style.setProperty('--cw',cw+'px');
    cards.forEach(function(el,i){
      var a=i/N*Math.PI*2;
      var x=Math.sin(a),y=Math.sin(a*2)*.05,z=Math.cos(a);
      el.setAttribute('data-x',x);el.setAttribute('data-y',y);el.setAttribute('data-z',z);
      el.style.transform='translate3d('+(x*R)+'px,'+(-y*R)+'px,'+(z*R-R*.55)+'px) rotateY('+(a*180/Math.PI)+'deg)';
    });
  }
  layout();
  var sx=-2,sy=0,dx=0,dy=0,vx=0,vy=0,cam=0,down=false,px=0,py=0;
  function cl(v,a,b){return v<a?a:v>b?b:v;}
  stage.addEventListener('pointerdown',function(e){down=true;px=e.clientX;py=e.clientY;vx=0;vy=0;try{stage.setPointerCapture(e.pointerId);}catch(err){}});
  stage.addEventListener('pointermove',function(e){if(!down)return;var mx=e.clientX-px,my=e.clientY-py;px=e.clientX;py=e.clientY;dx+=mx*.13;dy=cl(dy+my*.13,-24,24);vx=mx*.13;vy=my*.13;});
  function up(){down=false;}
  stage.addEventListener('pointerup',up);stage.addEventListener('pointercancel',up);
  function frame(){
    if(!down){dx+=vx;dy=cl(dy+vy,-24,24);vx*=.94;vy*=.94;if(Math.abs(vx)<.002)vx=0;if(Math.abs(vy)<.002)vy=0;}
    var p=cl((window.pageYOffset||0)/(innerHeight*.16),0,1);
    cam+=((p*Math.min(56,R*.15))-cam)*.075;
    var ry=sy+dx,rx=sx+dy;
    world.style.transform='translateZ('+cam.toFixed(2)+'px) rotateY('+ry.toFixed(3)+'deg) rotateX('+rx.toFixed(3)+'deg)';
    head.style.transform='rotateX('+(-rx).toFixed(3)+'deg) rotateY('+(-ry).toFixed(3)+'deg) translateZ('+(R*.62).toFixed(1)+'px)';
    head.style.opacity=Math.max(0,1-p*.5).toFixed(3);
    var rad=Math.PI/180,cy=Math.cos(ry*rad),sy2=Math.sin(ry*rad),cx=Math.cos(rx*rad),sx2=Math.sin(rx*rad);
    cards.forEach(function(el){
      var x=+el.getAttribute('data-x'),y=+el.getAttribute('data-y'),z=+el.getAttribute('data-z');
      var X=x*cy+z*sy2,Z=-x*sy2+z*cy,Y=y*cx-Z*sx2,Z2=y*sx2+Z*cx;
      var zf=cl(Z2,-1,1),base=.16+.84*Math.pow((zf+1)/2,.85);
      var dim=cl((1-Math.min(1,p*1.6))*(1-base),0,1);
      el.style.setProperty('--d',(dim*.9).toFixed(3));
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
</html>`,
  },

  // ═══════════════════════════════════════════════════════════════
  // 4. FASHION — Mode Nord
  // ═══════════════════════════════════════════════════════════════
  {
    id: "immersive-modenord",
    name: "Mode Nord — Season Lookbook",
    category: "Fashion / Lifestyle",
    description: "Bone-white Scandinavian fashion page with a portrait lookbook ring, Bodoni headline and a quiet season rail.",
    thumb: "🧥",
    getCode: () => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Mode Nord — Autumn Winter 26</title>
<meta name="description" content="Mode Nord, Copenhagen. A quiet wardrobe for long winters — Autumn Winter 2026 lookbook.">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;1,6..96,400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
<style>
:root{--bg:#f2efe9;--ink:#171614;--taupe:#8a8279;--line:rgba(23,22,20,.18);--pad:clamp(14px,2.6vw,34px);--hw:min(56vw,640px);--persp:1150px;--safe-top:env(safe-area-inset-top);--safe-right:env(safe-area-inset-right);--safe-bottom:env(safe-area-inset-bottom);--safe-left:env(safe-area-inset-left)}
*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent}
html{background:var(--bg);scrollbar-gutter:stable}
body{background:var(--bg);color:var(--ink);font-family:'Inter',sans-serif;font-weight:300;overflow-x:hidden;min-height:100vh;overscroll-behavior-y:none;-webkit-font-smoothing:antialiased}
img{display:block;max-width:100%}a{color:inherit;text-decoration:none}button{font:inherit;color:inherit;background:none;border:none;cursor:pointer}
#track{height:116vh;pointer-events:none}
#stage{position:fixed;inset:0;z-index:10;perspective:var(--persp);overflow:hidden;touch-action:none;background:linear-gradient(180deg,#f7f4ef 0%,#f2efe9 55%,#e7e2d9 100%)}
#world{position:absolute;top:50%;left:50%;width:0;height:0;transform-style:preserve-3d;will-change:transform}
#ring{position:absolute;top:0;left:0;width:0;height:0;transform-style:preserve-3d}
.card{position:absolute;top:0;left:0;width:var(--cw,130px);height:calc(var(--cw,130px)*1.42);margin-left:calc(var(--cw,130px) / -2);margin-top:calc(var(--cw,130px)*-.71);background:#e6e1d8;transform-style:preserve-3d;will-change:transform,opacity;transition:opacity .5s ease;overflow:hidden}
.card img{width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .9s ease-out;filter:saturate(.82) contrast(.98)}
.card.in img{opacity:1}
.card::after{content:'';position:absolute;inset:0;background:rgba(23,22,20,var(--d,0));box-shadow:inset 0 0 0 1px rgba(255,255,255,.2);pointer-events:none}
#head{position:absolute;top:0;left:0;width:var(--hw);margin-left:calc(var(--hw) / -2);text-align:center;font-family:'Bodoni Moda',Georgia,serif;font-weight:400;font-size:clamp(30px,5vw,74px);line-height:1;letter-spacing:-.015em;color:#171614;text-shadow:0 1px 30px rgba(242,239,233,.95);pointer-events:none;user-select:none}
#head span{position:absolute;top:0;left:0;width:100%;transform:translateY(-50%)}
#head em{font-style:italic}
#head small{display:block;font-family:'Inter',sans-serif;font-size:9px;font-weight:500;letter-spacing:.36em;text-transform:uppercase;color:var(--taupe);margin-bottom:16px}
.vig{position:fixed;inset:0;z-index:12;pointer-events:none;background:radial-gradient(ellipse 90% 94% at 50% 50%,transparent 55%,rgba(23,22,20,.10) 84%,rgba(23,22,20,.26) 100%)}
header{position:fixed;top:0;left:0;right:0;z-index:60;display:flex;justify-content:space-between;align-items:flex-start;padding:calc(var(--pad)*.9 + var(--safe-top)) calc(var(--pad) + var(--safe-right)) 0 calc(var(--pad) + var(--safe-left));opacity:0;transition:opacity 1.2s ease .2s}
body.on header,body.on .rail,body.on .cue,body.on .cap,body.on .foot{opacity:1}
.wordmark{font-family:'Bodoni Moda',serif;font-size:clamp(20px,2.2vw,27px);letter-spacing:.14em;text-transform:uppercase;line-height:1}
.hmeta{font-size:9px;letter-spacing:.24em;text-transform:uppercase;color:var(--taupe);text-align:right;line-height:1.9}
.rail{position:fixed;right:calc(var(--pad) + var(--safe-right));top:50%;transform:translateY(-50%);z-index:55;display:flex;flex-direction:column;align-items:flex-end;gap:6px;font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--taupe);opacity:0;transition:opacity 1.2s ease .2s}
.rail b{font-family:'Bodoni Moda',serif;font-size:15px;letter-spacing:0;color:var(--ink);font-weight:400}
.foot{position:fixed;left:calc(var(--pad) + var(--safe-left));bottom:calc(var(--pad) + var(--safe-bottom));z-index:55;font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--taupe);opacity:0;transition:opacity 1.2s ease .2s}
.cap{position:fixed;left:50%;bottom:calc(var(--pad) + var(--safe-bottom) + 32px);transform:translateX(-50%);z-index:56;font-family:'Bodoni Moda',serif;font-style:italic;font-size:clamp(14px,1.3vw,18px);color:#3f3b36;white-space:nowrap;opacity:0;transition:opacity 1.2s ease .2s;pointer-events:none}
.cue{position:fixed;left:50%;bottom:calc(var(--pad) + var(--safe-bottom) + 4px);transform:translateX(-50%);z-index:54;display:flex;align-items:center;gap:10px;font-size:9px;letter-spacing:.26em;text-transform:uppercase;color:var(--taupe);white-space:nowrap;opacity:0;transition:opacity 1.2s ease .2s}
.cue s{width:40px;height:1px;background:rgba(23,22,20,.22);position:relative;overflow:hidden;text-decoration:none}
.cue s::after{content:'';position:absolute;inset:0;background:#171614;animation:sweep 2.8s ease infinite}
@keyframes sweep{0%{transform:translateX(-100%)}55%{transform:translateX(0)}100%{transform:translateX(100%)}}
#veil{position:fixed;inset:0;z-index:250;background:#f2efe9;display:grid;place-items:center;align-content:center;gap:24px;transition:opacity .7s ease}
#veil.out{opacity:0;pointer-events:none}
.vl-mk{font-family:'Bodoni Moda',serif;font-size:clamp(30px,4.6vw,52px);letter-spacing:.18em;text-transform:uppercase;animation:rise 1.2s ease .1s both}
.vl-tg{font-size:9px;letter-spacing:.34em;text-transform:uppercase;color:var(--taupe);animation:rise .9s ease .55s both}
.vl-bar{width:clamp(110px,16vw,190px);height:1px;background:rgba(23,22,20,.15)}
.vl-bar s{display:block;height:100%;background:#171614;transform-origin:left;animation:grow 1.6s ease forwards}
@keyframes grow{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes rise{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@media(max-width:900px){#head{font-size:clamp(30px,6vw,56px)}}
@media(max-width:768px){.hmeta{display:none}.rail{display:none}}
@media(max-width:640px){:root{--hw:min(84vw,360px);--pad:clamp(12px,4vw,18px)}.cue{display:none}#head{font-size:clamp(30px,8.6vw,46px)}}
@media(max-width:380px){:root{--hw:min(88vw,320px)}.foot{display:none}}
@media(max-height:520px) and (orientation:landscape){.hmeta,.rail,.cue,.foot{display:none}#head{font-size:clamp(20px,5vh,30px)}}
@media(prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;transition-duration:.14s!important}}
</style>
</head>
<body>
<div id="veil"><div class="vl-mk">Mode Nord</div><div class="vl-bar"><s></s></div><div class="vl-tg">Autumn Winter 2026</div></div>
<div id="track"></div>
<div id="stage" data-mode="ring"><div id="world"><div id="ring"></div><h1 id="head"><span><small>Lookbook 04</small>Autumn<br><em>Winter 26</em></span></h1></div></div>
<div class="vig"></div>
<header><a href="#" class="wordmark">Mode Nord</a><div class="hmeta">Copenhagen<br>Est. 2014</div></header>
<div class="rail"><span>Collection</span><b>04 / 08</b><span>Wool · Silk · Linen</span></div>
<div class="foot">Bredgade 12 · Copenhagen</div>
<div class="cap" id="cap">The Long Coat — wool, charcoal</div>
<div class="cue"><s></s>Drag the lookbook</div>
<script>
(function(){
  var stage=document.getElementById('stage'),world=document.getElementById('world'),ring=document.getElementById('ring'),head=document.getElementById('head'),cap=document.getElementById('cap');
  var C='https://images.unsplash.com/';
  var data=[
    {t:'The Long Coat — wool, charcoal',img:C+'photo-1539109136881-3be0616acf4b?w=560&h=800&fit=crop'},
    {t:'Quiet Tailoring — stone',img:C+'photo-1483985988355-763728e1935b?w=560&h=800&fit=crop'},
    {t:'Knit 02 — undyed merino',img:C+'photo-1490481651871-ab68de25d43d?w=560&h=800&fit=crop'},
    {t:'The Wide Trouser — ink',img:C+'photo-1509631179647-0177331693ae?w=560&h=800&fit=crop'},
    {t:'Silk Layer — bone',img:C+'photo-1515886657613-9f3515b0c78f?w=560&h=800&fit=crop'},
    {t:'Field Jacket — olive',img:C+'photo-1487222477894-8943e31ef7b2?w=560&h=800&fit=crop'},
    {t:'Evening Dress — black',img:C+'photo-1529139574466-a303027c1d8b?w=560&h=800&fit=crop'},
    {t:'The Scarf — alpaca',img:C+'photo-1496747611176-843222e1e57c?w=560&h=800&fit=crop'}
  ];
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
  setTimeout(finish,3000);
  function layout(){
    var w=innerWidth,h=innerHeight;
    R=Math.max(w<=380?120:w<=640?160:205,Math.min(440,h*.44,w*.58));
    PERS=w<=380?640:w<=640?780:w<=900?940:1150;
    document.documentElement.style.setProperty('--persp',PERS+'px');
    var cw=Math.round(Math.max(72,R*(w<=380?0.38:w<=640?0.40:.42)));
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
  stage.addEventListener('pointermove',function(e){if(!down)return;var mx=e.clientX-px,my=e.clientY-py;px=e.clientX;py=e.clientY;dx+=mx*.13;dy=cl(dy+my*.13,-24,24);vx=mx*.13;vy=my*.13;});
  function up(){down=false;}
  stage.addEventListener('pointerup',up);stage.addEventListener('pointercancel',up);
  function frame(){
    if(!down){dx+=vx;dy=cl(dy+vy,-24,24);vx*=.94;vy*=.94;if(Math.abs(vx)<.002)vx=0;if(Math.abs(vy)<.002)vy=0;}
    var p=cl((window.pageYOffset||0)/(innerHeight*.16),0,1);
    cam+=((p*Math.min(52,R*.14))-cam)*.075;
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
      el.style.setProperty('--d',(dim*.75).toFixed(3));
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
</html>`,
  },
];
