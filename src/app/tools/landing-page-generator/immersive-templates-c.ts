export const immersiveTemplatesC = [
  {
    id: "immersive-voidrunner",
    name: "Voidrunner — Relic Sphere",
    category: "Gaming / Esports",
    description: "HUD-styled sci-fi game page with a 3D relic sphere, scanline overlay, acid-green readouts and a live status ticker.",
    thumb: "🎮",
    getCode: () => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Voidrunner — Enter the Void</title>
<meta name="description" content="Voidrunner is a free-to-play extraction shooter set in the ruins of a dead ringworld. Season 04 is live.">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;500;600;700&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
<style>
:root{--bg:#07070a;--ink:#eef3e6;--acid:#b6ff2e;--dim:#7f8a78;--line:rgba(182,255,46,.22);--pad:clamp(14px,2.6vw,34px);--hw:min(56vw,640px);--persp:1150px;--safe-top:env(safe-area-inset-top);--safe-right:env(safe-area-inset-right);--safe-bottom:env(safe-area-inset-bottom);--safe-left:env(safe-area-inset-left)}
*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent}html{background:var(--bg);scrollbar-gutter:stable}
body{background:var(--bg);color:var(--ink);font-family:'Inter',sans-serif;font-weight:300;overflow-x:hidden;min-height:100vh;overscroll-behavior-y:none;-webkit-font-smoothing:antialiased}
img{display:block;max-width:100%}a{color:inherit;text-decoration:none}button{font:inherit;color:inherit;background:none;border:none;cursor:pointer}
#track{height:116vh;pointer-events:none}
#stage{position:fixed;inset:0;z-index:10;perspective:var(--persp);overflow:hidden;touch-action:none;background:radial-gradient(circle at 50% 50%,#101506 0%,#080a06 44%,#050507 74%,#030304 100%)}
#world{position:absolute;top:50%;left:50%;width:0;height:0;transform-style:preserve-3d;will-change:transform}
#ring{position:absolute;top:0;left:0;width:0;height:0;transform-style:preserve-3d}
.card{position:absolute;top:0;left:0;width:var(--cw,140px);height:var(--cw,140px);margin-left:calc(var(--cw,140px) / -2);margin-top:calc(var(--cw,140px) / -2);overflow:hidden;background:#0c0f08;transform-style:preserve-3d;will-change:transform,opacity;transition:opacity .5s ease;clip-path:polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,12px 100%,0 calc(100% - 12px))}
.card img{width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .8s ease-out;filter:saturate(.7) contrast(1.15) brightness(.9)}.card.in img{opacity:1}
.card::after{content:'';position:absolute;inset:0;background:rgba(3,6,2,var(--d,0));box-shadow:inset 0 0 0 1px rgba(182,255,46,.26);pointer-events:none}
#head{position:absolute;top:0;left:0;width:var(--hw);margin-left:calc(var(--hw) / -2);text-align:center;font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:clamp(34px,6.4vw,92px);line-height:.94;letter-spacing:.02em;text-transform:uppercase;color:#f3ffe4;text-shadow:0 0 44px rgba(182,255,46,.35);pointer-events:none;user-select:none}
#head span{position:absolute;top:0;left:0;width:100%;transform:translateY(-50%)}#head em{font-style:normal;color:var(--acid)}
#head small{display:block;font-family:'Chakra Petch',sans-serif;font-size:9.5px;font-weight:500;letter-spacing:.4em;text-transform:uppercase;color:var(--dim);margin-bottom:16px}
.vig{position:fixed;inset:0;z-index:12;pointer-events:none;background:radial-gradient(ellipse 86% 90% at 50% 50%,transparent 48%,rgba(3,4,3,.36) 82%,rgba(3,4,3,.88) 100%)}
.scan{position:fixed;inset:0;z-index:13;pointer-events:none;opacity:.35;background:repeating-linear-gradient(0deg,rgba(255,255,255,.035) 0 1px,transparent 1px 3px)}
header{position:fixed;top:0;left:0;right:0;z-index:60;display:flex;justify-content:space-between;align-items:flex-start;padding:calc(var(--pad)*.9 + var(--safe-top)) calc(var(--pad) + var(--safe-right)) 0 calc(var(--pad) + var(--safe-left));opacity:0;transition:opacity 1.2s ease .2s}
body.on header,body.on .hud,body.on .cue,body.on .cap,body.on .status{opacity:1}
.wordmark{font-family:'Chakra Petch',sans-serif;font-size:clamp(16px,1.8vw,22px);font-weight:700;letter-spacing:.2em;text-transform:uppercase}.wordmark b{color:var(--acid)}
.hmeta{font-family:'Chakra Petch',sans-serif;font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--dim);text-align:right;line-height:1.9}
.play{display:inline-flex;align-items:center;gap:8px;margin-top:8px;border:1px solid var(--line);padding:7px 12px;font-size:9px;color:var(--acid);letter-spacing:.16em}
.hud{position:fixed;z-index:55;font-family:'Chakra Petch',sans-serif;font-size:8.5px;letter-spacing:.18em;text-transform:uppercase;color:rgba(238,243,230,.4);line-height:1.9;opacity:0;transition:opacity 1.2s ease .2s;pointer-events:none}
.hud.tl{left:calc(var(--pad) + var(--safe-left));top:50%;transform:translateY(-50%)}
.hud.br{right:calc(var(--pad) + var(--safe-right));bottom:calc(var(--pad) + var(--safe-bottom) + 40px);text-align:right}.hud b{color:var(--acid);font-weight:500}
.cap{position:fixed;left:50%;bottom:calc(var(--pad) + var(--safe-bottom) + 64px);transform:translateX(-50%);z-index:56;font-family:'Chakra Petch',sans-serif;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--ink);white-space:nowrap;opacity:0;transition:opacity 1.2s ease .2s;pointer-events:none}
.cue{position:fixed;left:50%;bottom:calc(var(--pad) + var(--safe-bottom) + 36px);transform:translateX(-50%);z-index:54;display:flex;align-items:center;gap:10px;font-family:'Chakra Petch',sans-serif;font-size:9px;letter-spacing:.24em;text-transform:uppercase;color:var(--dim);white-space:nowrap;opacity:0;transition:opacity 1.2s ease .2s}
.cue s{width:40px;height:1px;background:var(--line);position:relative;overflow:hidden;text-decoration:none}
.cue s::after{content:'';position:absolute;inset:0;background:var(--acid);animation:sweep 2.2s ease infinite}
@keyframes sweep{0%{transform:translateX(-100%)}55%{transform:translateX(0)}100%{transform:translateX(100%)}}
.status{position:fixed;left:0;right:0;bottom:0;z-index:58;display:flex;justify-content:space-between;gap:1rem;background:rgba(6,8,4,.9);border-top:1px solid var(--line);padding:7px calc(var(--pad) + var(--safe-right)) 7px calc(var(--pad) + var(--safe-left));font-family:'Chakra Petch',sans-serif;font-size:8.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--dim);opacity:0;transition:opacity 1.2s ease .2s}
.status b{color:var(--acid);font-weight:500}
#veil{position:fixed;inset:0;z-index:250;background:#07070a;display:grid;place-items:center;align-content:center;gap:20px;transition:opacity .55s ease}
#veil.out{opacity:0;pointer-events:none}
.vl-mk{font-family:'Chakra Petch',sans-serif;font-size:clamp(24px,4vw,42px);font-weight:700;letter-spacing:.24em;text-transform:uppercase;color:#f3ffe4;animation:rise .9s ease .1s both}
.vl-mk b{color:var(--acid)}.vl-pc{font-family:'Chakra Petch',sans-serif;font-size:10px;letter-spacing:.3em;color:var(--acid);animation:blink 1.1s steps(2) infinite}
@keyframes blink{50%{opacity:.15}}.vl-bar{width:clamp(140px,20vw,240px);height:2px;background:#151b10;overflow:hidden}
.vl-bar s{display:block;height:100%;background:var(--acid);animation:load 1.7s cubic-bezier(.2,.8,.2,1) forwards}
@keyframes load{from{transform:translateX(-100%)}to{transform:translateX(0)}}@keyframes rise{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@media(max-width:900px){#head{font-size:clamp(34px,8vw,70px)}.hud.tl{display:none}}@media(max-width:768px){.hmeta{display:none}}
@media(max-width:640px){:root{--hw:min(84vw,360px);--pad:clamp(12px,4vw,18px)}.cue{display:none}.hud.br{display:none}#head{font-size:clamp(32px,10vw,54px)}.status span:last-child{display:none}}
@media(max-width:380px){:root{--hw:min(88vw,320px)}}@media(max-height:520px) and (orientation:landscape){.hud,.cue,.hmeta{display:none}#head{font-size:clamp(22px,6vh,36px)}}
@media(prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;transition-duration:.14s!important}}
</style>
</head>
<body>
<div id="veil"><div class="vl-mk">Void<b>runner</b></div><div class="vl-pc">Initialising relic array</div><div class="vl-bar"><s></s></div></div>
<div id="track"></div>
<div id="stage" data-mode="sphere"><div id="world"><div id="ring"></div><h1 id="head"><span><small>Season 04 · Ringworld</small>Enter<br>the <em>Void</em></span></h1></div></div>
<div class="scan"></div><div class="vig"></div>
<header><a href="#" class="wordmark">Void<b>runner</b></a><div class="hmeta">v2.6 · Build 0917<br><span class="play">▶ Play free</span></div></header>
<div class="hud tl"><span>System</span><br><b>Online</b><br><span>Sector</span><br><b>09 / Ruin</b><br><span>Extraction</span><br><b>Open</b></div>
<div class="hud br">Squad 03<br><b>18,204</b> online<br>Latency 24ms</div>
<div class="cap" id="cap">Relic 01 — Ash Key</div>
<div class="cue"><s></s>Drag the relic array</div>
<div class="status"><span>Live · <b>Season 04</b></span><span>Free to play · PC &amp; console</span><span><b>18,204</b> runners online</span></div>
<script>
(function(){
  var stage=document.getElementById('stage'),world=document.getElementById('world'),ring=document.getElementById('ring'),head=document.getElementById('head'),cap=document.getElementById('cap');
  var C='https://images.unsplash.com/';
  var data=[
    {t:'Relic 01 — Ash Key',img:C+'photo-1542751371-adc38448a05e?w=560&h=560&fit=crop'},
    {t:'Relic 02 — Signal Core',img:C+'photo-1511512578047-dfb367046420?w=560&h=560&fit=crop'},
    {t:'Relic 03 — Broken Crown',img:C+'photo-1552820728-8b83bb6b773f?w=560&h=560&fit=crop'},
    {t:'Relic 04 — Glass Eye',img:C+'photo-1493711662062-fa541adb3fc8?w=560&h=560&fit=crop'},
    {t:'Relic 05 — Static Shard',img:C+'photo-1550745165-9bc0b252726f?w=560&h=560&fit=crop'},
    {t:'Relic 06 — Dead Star',img:C+'photo-1593305841991-05c297ba4575?w=560&h=560&fit=crop'},
    {t:'Relic 07 — Iron Bloom',img:C+'photo-1580234811497-9df7fd2f357e?w=560&h=560&fit=crop'},
    {t:'Relic 08 — Hollow Sun',img:C+'photo-1538481199705-c710c4e965fc?w=560&h=560&fit=crop'},
    {t:'Relic 09 — The Long Dark',img:C+'photo-1542751371-adc38448a05e?w=560&h=560&fit=crop&sat=-100'}
  ];
  var N=data.length,GA=Math.PI*(3-Math.sqrt(5)),cards=[],R=300,PERS=1150,loaded=0;
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
  setTimeout(finish,3200);
  function layout(){
    var w=innerWidth,h=innerHeight;
    R=Math.max(w<=380?115:w<=640?155:200,Math.min(450,h*.43,w*.58));
    PERS=w<=380?640:w<=640?780:w<=900?940:1150;
    document.documentElement.style.setProperty('--persp',PERS+'px');
    var cw=Math.round(Math.max(76,R*(w<=380?0.40:w<=640?0.42:.45)));
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
    cam+=((p*Math.min(60,R*.16))-cam)*.075;
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
      el.style.setProperty('--d',(dim*.95).toFixed(3));
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
  {
    id: "immersive-atlasres",
    name: "Atlas Residences — Property Ring",
    category: "Real Estate",
    description: "Charcoal and bronze property page with a portrait residence ring, serif headline and a quiet completion-status rail.",
    thumb: "🏙️",
    getCode: () => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Atlas Residences — Live Above the Ordinary</title>
<meta name="description" content="Atlas Residences, forty-two homes above the harbour. Completion 2027. Private appointments available.">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
<style>
:root{--bg:#161513;--ink:#efe9dd;--bronze:#c2a06a;--dim:#8f8a7f;--line:rgba(194,160,106,.24);--pad:clamp(14px,2.6vw,34px);--hw:min(56vw,640px);--persp:1150px;--safe-top:env(safe-area-inset-top);--safe-right:env(safe-area-inset-right);--safe-bottom:env(safe-area-inset-bottom);--safe-left:env(safe-area-inset-left)}
*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent}html{background:var(--bg);scrollbar-gutter:stable}
body{background:var(--bg);color:var(--ink);font-family:'Inter',sans-serif;font-weight:300;overflow-x:hidden;min-height:100vh;overscroll-behavior-y:none;-webkit-font-smoothing:antialiased}
img{display:block;max-width:100%}a{color:inherit;text-decoration:none}button{font:inherit;color:inherit;background:none;border:none;cursor:pointer}
#track{height:116vh;pointer-events:none}
#stage{position:fixed;inset:0;z-index:10;perspective:var(--persp);overflow:hidden;touch-action:none;background:radial-gradient(circle at 50% 48%,#232019 0%,#191713 42%,#111010 74%,#0a0908 100%)}
#world{position:absolute;top:50%;left:50%;width:0;height:0;transform-style:preserve-3d;will-change:transform}
#ring{position:absolute;top:0;left:0;width:0;height:0;transform-style:preserve-3d}
.card{position:absolute;top:0;left:0;width:var(--cw,120px);height:calc(var(--cw,120px)*1.35);margin-left:calc(var(--cw,120px) / -2);margin-top:calc(var(--cw,120px)*-.675);overflow:hidden;background:#1e1c18;transform-style:preserve-3d;will-change:transform,opacity;transition:opacity .5s ease;box-shadow:0 22px 50px rgba(0,0,0,.55)}
.card img{width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .9s ease-out;filter:saturate(.72) contrast(1.05)}.card.in img{opacity:1}
.card::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(22,21,19,.05),rgba(22,21,19,var(--d,0)));box-shadow:inset 0 0 0 1px rgba(194,160,106,.22);pointer-events:none}
#head{position:absolute;top:0;left:0;width:var(--hw);margin-left:calc(var(--hw) / -2);text-align:center;font-family:'Instrument Serif',Georgia,serif;font-weight:400;font-size:clamp(32px,5.2vw,80px);line-height:.98;letter-spacing:-.01em;color:var(--ink);text-shadow:0 4px 44px rgba(10,9,8,.9);pointer-events:none;user-select:none}
#head span{position:absolute;top:0;left:0;width:100%;transform:translateY(-50%)}#head em{font-style:italic;color:var(--bronze)}
#head small{display:block;font-family:'Inter',sans-serif;font-size:9px;font-weight:500;letter-spacing:.34em;text-transform:uppercase;color:var(--dim);margin-bottom:16px}
.vig{position:fixed;inset:0;z-index:12;pointer-events:none;background:radial-gradient(ellipse 88% 92% at 50% 50%,transparent 50%,rgba(10,9,8,.3) 82%,rgba(10,9,8,.8) 100%)}
header{position:fixed;top:0;left:0;right:0;z-index:60;display:flex;justify-content:space-between;align-items:flex-start;padding:calc(var(--pad)*.9 + var(--safe-top)) calc(var(--pad) + var(--safe-right)) 0 calc(var(--pad) + var(--safe-left));opacity:0;transition:opacity 1.2s ease .2s}
body.on header,body.on .rail,body.on .cue,body.on .cap,body.on .foot{opacity:1}
.wordmark{font-family:'Instrument Serif',serif;font-size:clamp(19px,2.1vw,26px);letter-spacing:.14em;text-transform:uppercase;line-height:1}
.wordmark b{font-weight:400;color:var(--bronze)}.hmeta{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--dim);text-align:right;line-height:1.9}
.rail{position:fixed;left:calc(var(--pad) + var(--safe-left));top:50%;transform:translateY(-50%);z-index:55;display:flex;flex-direction:column;gap:8px;font-size:8.5px;letter-spacing:.2em;text-transform:uppercase;color:rgba(239,233,221,.35);opacity:0;transition:opacity 1.2s ease .2s}
.rail span{display:flex;gap:10px;align-items:baseline}.rail span b{font-family:'Instrument Serif',serif;font-size:12px;font-weight:400;color:var(--bronze);width:16px}
.rail span.on{color:var(--ink)}
.foot{position:fixed;right:calc(var(--pad) + var(--safe-right));bottom:calc(var(--pad) + var(--safe-bottom));z-index:55;font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:var(--dim);text-align:right;line-height:1.9;opacity:0;transition:opacity 1.2s ease .2s}
.foot b{color:var(--bronze);font-weight:500}
.cap{position:fixed;left:50%;bottom:calc(var(--pad) + var(--safe-bottom) + 38px);transform:translateX(-50%);z-index:56;font-family:'Instrument Serif',serif;font-style:italic;font-size:clamp(15px,1.4vw,19px);color:var(--ink);white-space:nowrap;opacity:0;transition:opacity 1.2s ease .2s;pointer-events:none}
.cue{position:fixed;left:50%;bottom:calc(var(--pad) + var(--safe-bottom) + 4px);transform:translateX(-50%);z-index:54;display:flex;align-items:center;gap:10px;font-size:9px;letter-spacing:.24em;text-transform:uppercase;color:var(--dim);white-space:nowrap;opacity:0;transition:opacity 1.2s ease .2s}
.cue s{width:44px;height:1px;background:var(--line);position:relative;overflow:hidden;text-decoration:none}
.cue s::after{content:'';position:absolute;inset:0;background:var(--bronze);animation:sweep 2.8s ease infinite}
@keyframes sweep{0%{transform:translateX(-100%)}55%{transform:translateX(0)}100%{transform:translateX(100%)}}
#veil{position:fixed;inset:0;z-index:250;background:#161513;display:grid;place-items:center;align-content:center;gap:22px;transition:opacity .7s ease}
#veil.out{opacity:0;pointer-events:none}
.vl-mk{font-family:'Instrument Serif',serif;font-size:clamp(32px,5vw,58px);letter-spacing:.1em;text-transform:uppercase;animation:rise 1.1s ease .1s both}
.vl-mk em{font-style:italic;color:var(--bronze)}.vl-tg{font-size:9px;letter-spacing:.32em;text-transform:uppercase;color:var(--dim);animation:rise .9s ease .55s both}
.vl-bar{width:clamp(120px,18vw,210px);height:1px;background:rgba(194,160,106,.18)}
.vl-bar s{display:block;height:100%;background:var(--bronze);transform-origin:left;animation:grow 1.6s ease forwards}
@keyframes grow{from{transform:scaleX(0)}to{transform:scaleX(1)}}@keyframes rise{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@media(max-width:900px){#head{font-size:clamp(32px,7vw,62px)}.rail{display:none}}@media(max-width:768px){.hmeta{display:none}}
@media(max-width:640px){:root{--hw:min(84vw,360px);--pad:clamp(12px,4vw,18px)}.cue{display:none}#head{font-size:clamp(32px,9.4vw,52px)}.foot{display:none}}
@media(max-width:380px){:root{--hw:min(88vw,320px)}}
@media(max-height:520px) and (orientation:landscape){.rail,.hmeta,.cue,.foot{display:none}#head{font-size:clamp(22px,5.4vh,34px)}}
@media(prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;transition-duration:.14s!important}}
</style>
</head>
<body>
<div id="veil"><div class="vl-mk">Atlas <em>Residences</em></div><div class="vl-bar"><s></s></div><div class="vl-tg">Harbour District · Completion 2027</div></div>
<div id="track"></div>
<div id="stage" data-mode="ring"><div id="world"><div id="ring"></div><h1 id="head"><span><small>Forty-two homes · One harbour</small>Live Above<br>the <em>Ordinary</em></span></h1></div></div>
<div class="vig"></div>
<header><a href="#" class="wordmark">Atlas <b>Residences</b></a><div class="hmeta">Harbour District<br>Enquiries open</div></header>
<div class="rail" id="rail"></div>
<div class="foot"><b>42</b> residences<br>Completion Q3 2027</div>
<div class="cap" id="cap">Penthouse 01 — Harbour view</div>
<div class="cue"><s></s>Drag the collection</div>
<script>
(function(){
  var stage=document.getElementById('stage'),world=document.getElementById('world'),ring=document.getElementById('ring'),head=document.getElementById('head'),cap=document.getElementById('cap'),rail=document.getElementById('rail');
  var C='https://images.unsplash.com/';
  var data=[
    {t:'Penthouse 01 — Harbour view',img:C+'photo-1600596542815-ffad4c1539a9?w=540&h=730&fit=crop'},
    {t:'Residence 04 — Garden floor',img:C+'photo-1600585154340-be6161a56a0c?w=540&h=730&fit=crop'},
    {t:'Residence 07 — Double aspect',img:C+'photo-1600607687939-ce8a6c25118c?w=540&h=730&fit=crop'},
    {t:'The Townhouse',img:C+'photo-1512917774080-9991f1c4c750?w=540&h=730&fit=crop'},
    {t:'Residence 12 — Courtyard',img:C+'photo-1600566753086-00f18fb6b3ea?w=540&h=730&fit=crop'},
    {t:'Residence 18 — Sky terrace',img:C+'photo-1600210492486-724fe5c67fb0?w=540&h=730&fit=crop'},
    {t:'Residence 24 — Library',img:C+'photo-1600047509807-ba8f99d2cdde?w=540&h=730&fit=crop'},
    {t:'Penthouse 02 — The Long Room',img:C+'photo-1613490493576-7fde63acd811?w=540&h=730&fit=crop'}
  ];
  var N=data.length,cards=[],R=300,PERS=1150,loaded=0;
  var veil=document.getElementById('veil'),ended=false;
  function finish(){if(ended)return;ended=true;veil.classList.add('out');document.body.classList.add('on');setTimeout(function(){if(veil.parentNode)veil.parentNode.removeChild(veil);},1000);}
  data.forEach(function(d,i){
    var el=document.createElement('div');el.className='card';
    var im=document.createElement('img');im.alt=d.t;im.src=d.img;
    im.addEventListener('load',function(){el.classList.add('in');loaded++;if(loaded>=N)setTimeout(finish,350);});
    im.addEventListener('error',function(){loaded++;if(loaded>=N)setTimeout(finish,200);});
    el.appendChild(im);
    var li=document.createElement('span');li.innerHTML='<b>0'+(i+1)+'</b>'+d.t.split(' — ')[0];rail.appendChild(li);
    el.addEventListener('mouseenter',function(){cap.textContent=d.t;li.classList.add('on');});
    el.addEventListener('mouseleave',function(){li.classList.remove('on');});
    el.addEventListener('click',function(){cap.textContent=d.t;});
    ring.appendChild(el);cards.push(el);
    if(im.complete&&im.naturalWidth)el.classList.add('in');
  });
  setTimeout(finish,3400);
  function layout(){
    var w=innerWidth,h=innerHeight;
    R=Math.max(w<=380?118:w<=640?158:205,Math.min(450,h*.43,w*.57));
    PERS=w<=380?640:w<=640?780:w<=900?940:1150;
    document.documentElement.style.setProperty('--persp',PERS+'px');
    var cw=Math.round(Math.max(68,R*(w<=380?0.37:w<=640?0.39:.41)));
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
    cam+=((p*Math.min(54,R*.14))-cam)*.075;
    var ry=sy+dx,rx=sx+dy;
    world.style.transform='translateZ('+cam.toFixed(2)+'px) rotateY('+ry.toFixed(3)+'deg) rotateX('+rx.toFixed(3)+'deg)';
    head.style.transform='rotateX('+(-rx).toFixed(3)+'deg) rotateY('+(-ry).toFixed(3)+'deg) translateZ('+(R*.62).toFixed(1)+'px)';
    head.style.opacity=Math.max(0,1-p*.45).toFixed(3);
    var rad=Math.PI/180,cy=Math.cos(ry*rad),sy2=Math.sin(ry*rad),cx=Math.cos(rx*rad),sx2=Math.sin(rx*rad);
    cards.forEach(function(el){
      var x=+el.getAttribute('data-x'),y=+el.getAttribute('data-y'),z=+el.getAttribute('data-z');
      var X=x*cy+z*sy2,Z=-x*sy2+z*cy,Y=y*cx-Z*sx2,Z2=y*sx2+Z*cx;
      var zf=cl(Z2,-1,1),base=.18+.82*Math.pow((zf+1)/2,.85);
      var dim=cl((1-Math.min(1,p*1.6))*(1-base),0,1);
      el.style.setProperty('--d',(dim*.82).toFixed(3));
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
  {
    id: "immersive-elan",
    name: "Élan — Petal Ritual Ring",
    category: "Beauty / Lifestyle",
    description: "Blush and plum skincare page with a petal-light product ring, gold hairline detailing and a softly serif center title.",
    thumb: "🌸",
    getCode: () => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Élan — Ritual, Refined</title>
<meta name="description" content="Élan skincare. Four formulas, no twenty-step routine. The Petal Collection, made in small batches.">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
<style>
:root{--bg:#f7e9e5;--ink:#3d2430;--plum:#4a2430;--gold:#b98a63;--dim:#947a78;--pad:clamp(14px,2.6vw,34px);--hw:min(56vw,640px);--persp:1150px;--safe-top:env(safe-area-inset-top);--safe-right:env(safe-area-inset-right);--safe-bottom:env(safe-area-inset-bottom);--safe-left:env(safe-area-inset-left)}
*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent}html{background:var(--bg);scrollbar-gutter:stable}
body{background:var(--bg);color:var(--ink);font-family:'Inter',sans-serif;font-weight:300;overflow-x:hidden;min-height:100vh;overscroll-behavior-y:none;-webkit-font-smoothing:antialiased}
img{display:block;max-width:100%}a{color:inherit;text-decoration:none}button{font:inherit;color:inherit;background:none;border:none;cursor:pointer}
#track{height:116vh;pointer-events:none}
#stage{position:fixed;inset:0;z-index:10;perspective:var(--persp);overflow:hidden;touch-action:none;background:radial-gradient(circle at 50% 48%,#fdf5f1 0%,#f7e9e5 48%,#efd9d3 100%)}
#world{position:absolute;top:50%;left:50%;width:0;height:0;transform-style:preserve-3d;will-change:transform}
#ring{position:absolute;top:0;left:0;width:0;height:0;transform-style:preserve-3d}
.card{position:absolute;top:0;left:0;width:var(--cw,130px);height:calc(var(--cw,130px)*1.18);margin-left:calc(var(--cw,130px) / -2);margin-top:calc(var(--cw,130px)*-.59);padding:7px;background:#fbf3ef;transform-style:preserve-3d;will-change:transform,opacity;transition:opacity .5s ease;box-shadow:0 18px 40px rgba(74,36,48,.14)}
.card::before{content:'';position:absolute;inset:3px;border:1px solid rgba(185,138,99,.45);pointer-events:none;z-index:2}
.card img{width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .9s ease-out;filter:saturate(.86)}.card.in img{opacity:1}
.card::after{content:'';position:absolute;inset:7px;background:rgba(61,36,48,var(--d,0));pointer-events:none}
#head{position:absolute;top:0;left:0;width:var(--hw);margin-left:calc(var(--hw) / -2);text-align:center;font-family:'Cormorant Garamond',Georgia,serif;font-weight:300;font-size:clamp(34px,5.4vw,84px);line-height:.95;letter-spacing:-.01em;color:#3d2430;text-shadow:0 2px 36px rgba(251,243,239,.95);pointer-events:none;user-select:none}
#head span{position:absolute;top:0;left:0;width:100%;transform:translateY(-50%)}#head em{font-style:italic;color:#9c5f63}
#head small{display:block;font-family:'Inter',sans-serif;font-size:9px;font-weight:500;letter-spacing:.36em;text-transform:uppercase;color:var(--gold);margin-bottom:16px}
.vig{position:fixed;inset:0;z-index:12;pointer-events:none;background:radial-gradient(ellipse 90% 92% at 50% 50%,transparent 56%,rgba(61,36,48,.1) 84%,rgba(61,36,48,.24) 100%)}
header{position:fixed;top:0;left:0;right:0;z-index:60;display:flex;justify-content:space-between;align-items:flex-start;padding:calc(var(--pad)*.9 + var(--safe-top)) calc(var(--pad) + var(--safe-right)) 0 calc(var(--pad) + var(--safe-left));opacity:0;transition:opacity 1.2s ease .2s}
body.on header,body.on .note,body.on .cue,body.on .cap,body.on .foot{opacity:1}
.wordmark{font-family:'Cormorant Garamond',serif;font-size:clamp(24px,2.8vw,34px);letter-spacing:.18em;text-transform:uppercase;line-height:1}
.hmeta{font-size:9px;letter-spacing:.24em;text-transform:uppercase;color:var(--dim);text-align:right;line-height:1.9}
.note{position:fixed;right:calc(var(--pad) + var(--safe-right));top:50%;transform:translateY(-50%);z-index:55;max-width:150px;font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:var(--dim);text-align:right;line-height:2;opacity:0;transition:opacity 1.2s ease .2s}
.note b{color:var(--plum);font-weight:500}
.foot{position:fixed;left:calc(var(--pad) + var(--safe-left));bottom:calc(var(--pad) + var(--safe-bottom));z-index:55;font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--dim);line-height:1.9;opacity:0;transition:opacity 1.2s ease .2s}
.foot b{color:var(--gold);font-weight:500}
.cap{position:fixed;left:50%;bottom:calc(var(--pad) + var(--safe-bottom) + 36px);transform:translateX(-50%);z-index:56;font-family:'Cormorant Garamond',serif;font-style:italic;font-size:clamp(15px,1.4vw,19px);color:#5c3c44;white-space:nowrap;opacity:0;transition:opacity 1.2s ease .2s;pointer-events:none}
.cue{position:fixed;left:50%;bottom:calc(var(--pad) + var(--safe-bottom) + 4px);transform:translateX(-50%);z-index:54;display:flex;align-items:center;gap:10px;font-size:9px;letter-spacing:.26em;text-transform:uppercase;color:var(--dim);white-space:nowrap;opacity:0;transition:opacity 1.2s ease .2s}
.cue s{width:42px;height:1px;background:rgba(185,138,99,.4);position:relative;overflow:hidden;text-decoration:none}
.cue s::after{content:'';position:absolute;inset:0;background:var(--gold);animation:sweep 2.8s ease infinite}
@keyframes sweep{0%{transform:translateX(-100%)}55%{transform:translateX(0)}100%{transform:translateX(100%)}}
#veil{position:fixed;inset:0;z-index:250;background:#f7e9e5;display:grid;place-items:center;align-content:center;gap:22px;transition:opacity .7s ease}
#veil.out{opacity:0;pointer-events:none}.vl-ring{width:56px;height:56px;border:1px solid var(--gold);border-radius:50%;position:relative;animation:rise 1s ease .1s both}
.vl-ring::after{content:'';position:absolute;inset:10px;border-radius:50%;background:var(--plum);animation:rise 1.1s ease .35s both}
.vl-mk{font-family:'Cormorant Garamond',serif;font-size:clamp(30px,4.8vw,54px);letter-spacing:.22em;text-transform:uppercase;animation:rise 1s ease .5s both}
.vl-tg{font-size:9px;letter-spacing:.32em;text-transform:uppercase;color:var(--dim);animation:rise .9s ease .9s both}
@keyframes rise{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}@media(max-width:900px){#head{font-size:clamp(34px,6.8vw,62px)}.note{display:none}}
@media(max-width:768px){.hmeta{display:none}}
@media(max-width:640px){:root{--hw:min(84vw,360px);--pad:clamp(12px,4vw,18px)}.cue{display:none}#head{font-size:clamp(32px,9.6vw,52px)}.foot{display:none}}
@media(max-width:380px){:root{--hw:min(88vw,320px)}}
@media(max-height:520px) and (orientation:landscape){.note,.hmeta,.cue,.foot{display:none}#head{font-size:clamp(22px,5.6vh,34px)}}
@media(prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;transition-duration:.14s!important}}
</style>
</head>
<body>
<div id="veil"><div class="vl-ring"></div><div class="vl-mk">Élan</div><div class="vl-tg">The Petal Collection · 2026</div></div>
<div id="track"></div>
<div id="stage" data-mode="ring"><div id="world"><div id="ring"></div><h1 id="head"><span><small>Four formulas · nothing more</small>Ritual,<br><em>Refined.</em></span></h1></div></div>
<div class="vig"></div>
<header><a href="#" class="wordmark">Élan</a><div class="hmeta">Skincare<br>Small batch</div></header>
<div class="note"><b>Barrier first</b><br>Ceramides · Squalane<br>Panthenol · Oat lipids</div>
<div class="foot"><b>New</b> The Petal Collection<br>Refillable · Fragrance free</div>
<div class="cap" id="cap">Petal Cleanser — 150ml</div>
<div class="cue"><s></s>Turn the collection</div>
<script>
(function(){
  var stage=document.getElementById('stage'),world=document.getElementById('world'),ring=document.getElementById('ring'),head=document.getElementById('head'),cap=document.getElementById('cap');
  var C='https://images.unsplash.com/';
  var data=[
    {t:'Petal Cleanser — 150ml',img:C+'photo-1556228578-8c89e6adf883?w=520&h=620&fit=crop'},
    {t:'Dew Serum — 30ml',img:C+'photo-1608248543803-ba4f8c70ae0b?w=520&h=620&fit=crop'},
    {t:'Veil Cream — 50ml',img:C+'photo-1570194065650-d99fb4bedf0a?w=520&h=620&fit=crop'},
    {t:'Petal Mist — 100ml',img:C+'photo-1571781926291-c477ebfd024b?w=520&h=620&fit=crop'},
    {t:'Night Balm — 60ml',img:C+'photo-1596462502278-27bfdc403348?w=520&h=620&fit=crop'},
    {t:'The Ritual Set',img:C+'photo-1620916566398-39f1143ab7be?w=520&h=620&fit=crop'},
    {t:'Silk Cloth — pair',img:C+'photo-1522335789203-aabd1fc54bc9?w=520&h=620&fit=crop'},
    {t:'Refill Pouch — 50ml',img:C+'photo-1598440947619-2c35fc9aa908?w=520&h=620&fit=crop'}
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
  setTimeout(finish,3200);
  function layout(){
    var w=innerWidth,h=innerHeight;
    R=Math.max(w<=380?115:w<=640?155:200,Math.min(440,h*.43,w*.57));
    PERS=w<=380?640:w<=640?780:w<=900?940:1150;
    document.documentElement.style.setProperty('--persp',PERS+'px');
    var cw=Math.round(Math.max(74,R*(w<=380?0.38:w<=640?0.41:.44)));
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
    cam+=((p*Math.min(50,R*.14))-cam)*.075;
    var ry=sy+dx,rx=sx+dy;
    world.style.transform='translateZ('+cam.toFixed(2)+'px) rotateY('+ry.toFixed(3)+'deg) rotateX('+rx.toFixed(3)+'deg)';
    head.style.transform='rotateX('+(-rx).toFixed(3)+'deg) rotateY('+(-ry).toFixed(3)+'deg) translateZ('+(R*.6).toFixed(1)+'px)';
    head.style.opacity=Math.max(0,1-p*.45).toFixed(3);
    var rad=Math.PI/180,cy=Math.cos(ry*rad),sy2=Math.sin(ry*rad),cx=Math.cos(rx*rad),sx2=Math.sin(rx*rad);
    cards.forEach(function(el){
      var x=+el.getAttribute('data-x'),y=+el.getAttribute('data-y'),z=+el.getAttribute('data-z');
      var X=x*cy+z*sy2,Z=-x*sy2+z*cy,Y=y*cx-Z*sx2,Z2=y*sx2+Z*cx;
      var zf=cl(Z2,-1,1),base=.2+.8*Math.pow((zf+1)/2,.85);
      var dim=cl((1-Math.min(1,p*1.6))*(1-base),0,1);
      el.style.setProperty('--d',(dim*.7).toFixed(3));
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
