export const immersiveTemplatesB = [
  {
    id: "immersive-meridian",
    name: "Meridian — Destination Atlas",
    category: "Travel",
    description: "Deep-ocean travel page with a globe-like destination sphere, coordinates splash and an editorial destination index.",
    thumb: "🌍",
    getCode: () => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Meridian — Somewhere Beyond</title>
<meta name="description" content="Meridian makes small-group journeys to ten places worth the long way round. Atlas 2026.">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,300&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
<style>
:root{--bg:#061d2b;--ink:#f2ead9;--sand:#e8d6b3;--coral:#ff6a4d;--dim:#8fa6b0;--pad:clamp(14px,2.6vw,34px);--hw:min(56vw,640px);--persp:1150px;--safe-top:env(safe-area-inset-top);--safe-right:env(safe-area-inset-right);--safe-bottom:env(safe-area-inset-bottom);--safe-left:env(safe-area-inset-left)}
*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent}html{background:var(--bg);scrollbar-gutter:stable}
body{background:var(--bg);color:var(--ink);font-family:'Inter',sans-serif;font-weight:300;overflow-x:hidden;min-height:100vh;overscroll-behavior-y:none;-webkit-font-smoothing:antialiased}
img{display:block;max-width:100%}a{color:inherit;text-decoration:none}button{font:inherit;color:inherit;background:none;border:none;cursor:pointer}
#track{height:116vh;pointer-events:none}
#stage{position:fixed;inset:0;z-index:10;perspective:var(--persp);overflow:hidden;touch-action:none;background:radial-gradient(circle at 50% 52%,#0d3448 0%,#08273a 42%,#061d2b 70%,#03131d 100%)}
#world{position:absolute;top:50%;left:50%;width:0;height:0;transform-style:preserve-3d;will-change:transform}
#ring{position:absolute;top:0;left:0;width:0;height:0;transform-style:preserve-3d}
.card{position:absolute;top:0;left:0;width:var(--cw,120px);height:calc(var(--cw,120px)*1.25);margin-left:calc(var(--cw,120px) / -2);margin-top:calc(var(--cw,120px)*-.625);border-radius:2px;overflow:hidden;background:#0a2635;transform-style:preserve-3d;will-change:transform,opacity;transition:opacity .5s ease;box-shadow:0 18px 40px rgba(0,0,0,.35)}
.card img{width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .9s ease-out;filter:saturate(.88)}.card.in img{opacity:1}
.card::after{content:'';position:absolute;inset:0;background:rgba(3,19,29,var(--d,0));box-shadow:inset 0 0 0 1px rgba(232,214,179,.18);pointer-events:none}
#head{position:absolute;top:0;left:0;width:var(--hw);margin-left:calc(var(--hw) / -2);text-align:center;font-family:'Fraunces',Georgia,serif;font-weight:300;font-size:clamp(32px,4.8vw,72px);line-height:1;letter-spacing:-.02em;color:var(--ink);text-shadow:0 4px 40px rgba(3,19,29,.8);pointer-events:none;user-select:none}
#head span{position:absolute;top:0;left:0;width:100%;transform:translateY(-50%)}#head em{font-style:italic;color:var(--sand)}
#head small{display:block;font-family:'Inter',sans-serif;font-size:9px;font-weight:500;letter-spacing:.34em;text-transform:uppercase;color:var(--coral);margin-bottom:16px}
.vig{position:fixed;inset:0;z-index:12;pointer-events:none;background:radial-gradient(ellipse 88% 92% at 50% 50%,transparent 50%,rgba(3,19,29,.3) 82%,rgba(3,19,29,.78) 100%)}
header{position:fixed;top:0;left:0;right:0;z-index:60;display:flex;justify-content:space-between;align-items:flex-start;padding:calc(var(--pad)*.9 + var(--safe-top)) calc(var(--pad) + var(--safe-right)) 0 calc(var(--pad) + var(--safe-left));opacity:0;transition:opacity 1.2s ease .2s}
body.on header,body.on .index,body.on .cue,body.on .cap,body.on .foot{opacity:1}
.wordmark{font-family:'Fraunces',serif;font-size:clamp(21px,2.3vw,29px);letter-spacing:.02em;line-height:1}.wordmark b{color:var(--coral);font-weight:400}
.hmeta{font-size:9px;letter-spacing:.24em;text-transform:uppercase;color:var(--dim);text-align:right;line-height:1.9}
.index{position:fixed;left:calc(var(--pad) + var(--safe-left));top:50%;transform:translateY(-50%);z-index:55;display:flex;flex-direction:column;gap:8px;opacity:0;transition:opacity 1.2s ease .2s}
.index span{font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:rgba(242,234,217,.35);display:flex;gap:10px;align-items:baseline}
.index span b{font-family:'Fraunces',serif;font-size:11px;font-weight:400;color:var(--coral);width:16px}.index span.on{color:var(--ink)}.index span.on b{color:var(--sand)}
.foot{position:fixed;right:calc(var(--pad) + var(--safe-right));bottom:calc(var(--pad) + var(--safe-bottom));z-index:55;font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--dim);text-align:right;line-height:1.8;opacity:0;transition:opacity 1.2s ease .2s}
.cap{position:fixed;left:50%;bottom:calc(var(--pad) + var(--safe-bottom) + 34px);transform:translateX(-50%);z-index:56;font-family:'Fraunces',serif;font-style:italic;font-size:clamp(15px,1.4vw,19px);color:var(--sand);white-space:nowrap;opacity:0;transition:opacity 1.2s ease .2s;pointer-events:none}
.cue{position:fixed;left:50%;bottom:calc(var(--pad) + var(--safe-bottom) + 4px);transform:translateX(-50%);z-index:54;display:flex;align-items:center;gap:10px;font-size:9px;letter-spacing:.24em;text-transform:uppercase;color:var(--dim);white-space:nowrap;opacity:0;transition:opacity 1.2s ease .2s}
.cue s{width:44px;height:1px;background:rgba(232,214,179,.25);position:relative;overflow:hidden;text-decoration:none}
.cue s::after{content:'';position:absolute;inset:0;background:var(--coral);animation:sweep 2.6s ease infinite}
@keyframes sweep{0%{transform:translateX(-100%)}55%{transform:translateX(0)}100%{transform:translateX(100%)}}
#veil{position:fixed;inset:0;z-index:250;background:#061d2b;display:grid;place-items:center;align-content:center;gap:20px;transition:opacity .7s ease}
#veil.out{opacity:0;pointer-events:none}.vl-mk{font-family:'Fraunces',serif;font-size:clamp(34px,5.4vw,64px);font-weight:300;letter-spacing:.01em;animation:rise 1.1s ease .1s both}
.vl-mk em{font-style:italic;color:var(--sand)}.vl-tg{font-size:9px;letter-spacing:.34em;text-transform:uppercase;color:var(--dim);animation:rise .9s ease .55s both}
.vl-bar{width:clamp(120px,17vw,200px);height:1px;background:rgba(232,214,179,.16)}
.vl-bar s{display:block;height:100%;background:var(--coral);transform-origin:left;animation:grow 1.6s ease forwards}
@keyframes grow{from{transform:scaleX(0)}to{transform:scaleX(1)}}@keyframes rise{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@media(max-width:900px){#head{font-size:clamp(32px,6.4vw,58px)}.index{display:none}}@media(max-width:768px){.hmeta{display:none}}
@media(max-width:640px){:root{--hw:min(84vw,360px);--pad:clamp(12px,4vw,18px)}.cue{display:none}#head{font-size:clamp(32px,9vw,48px)}}
@media(max-width:380px){:root{--hw:min(88vw,320px)}.foot{display:none}}
@media(max-height:520px) and (orientation:landscape){.index,.hmeta,.cue,.foot{display:none}#head{font-size:clamp(20px,5.2vh,32px)}}
@media(prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;transition-duration:.14s!important}}
</style>
</head>
<body>
<div id="veil"><div class="vl-mk">Merid<em>ian</em></div><div class="vl-bar"><s></s></div><div class="vl-tg">18°N 24°E · Atlas 2026</div></div>
<div id="track"></div>
<div id="stage" data-mode="sphere"><div id="world"><div id="ring"></div><h1 id="head"><span><small>Ten places · no itinerary</small>Somewhere<br><em>Beyond</em></span></h1></div></div>
<div class="vig"></div>
<header><a href="#" class="wordmark">Merid<b>ian</b></a><div class="hmeta">Small-group journeys<br>Est. 2012</div></header>
<div class="index" id="index"></div>
<div class="foot">Marrakech · Lisbon<br>hello@meridian.travel</div>
<div class="cap" id="cap">Lofoten — Norway</div>
<div class="cue"><s></s>Drag the atlas</div>
<script>
(function(){
  var stage=document.getElementById('stage'),world=document.getElementById('world'),ring=document.getElementById('ring'),head=document.getElementById('head'),cap=document.getElementById('cap'),idx=document.getElementById('index');
  var C='https://images.unsplash.com/';
  var data=[
    {t:'Lofoten — Norway',img:C+'photo-1500530855697-b586d89ba3ee?w=520&h=650&fit=crop'},
    {t:'Kyoto — Japan',img:C+'photo-1493976040374-85c8e12f0c0e?w=520&h=650&fit=crop'},
    {t:'Fakarava — Polynesia',img:C+'photo-1502602898657-3e91760cbb34?w=520&h=650&fit=crop'},
    {t:'Venice — Italy',img:C+'photo-1523906834658-6e24ef2386f9?w=520&h=650&fit=crop'},
    {t:'Bali — Indonesia',img:C+'photo-1537996194471-e657df975ab4?w=520&h=650&fit=crop'},
    {t:'Wadi Rum — Jordan',img:C+'photo-1512453979798-5ea266f8880c?w=520&h=650&fit=crop'},
    {t:'Dolomites — Italy',img:C+'photo-1516483638261-f4dbaf036963?w=520&h=650&fit=crop'},
    {t:'Chefchaouen — Morocco',img:C+'photo-1526772662000-3f88f10405ff?w=520&h=650&fit=crop'},
    {t:'Reykjavík — Iceland',img:C+'photo-1467269204594-9661b134dd2b?w=520&h=650&fit=crop'},
    {t:'Petra — Jordan',img:C+'photo-1518684079-3c830dcef090?w=520&h=650&fit=crop'}
  ];
  var N=data.length,GA=Math.PI*(3-Math.sqrt(5)),cards=[],R=300,PERS=1150,loaded=0;
  var veil=document.getElementById('veil'),ended=false;
  function finish(){if(ended)return;ended=true;veil.classList.add('out');document.body.classList.add('on');setTimeout(function(){if(veil.parentNode)veil.parentNode.removeChild(veil);},1000);}
  data.forEach(function(d,i){
    var el=document.createElement('div');el.className='card';
    var im=document.createElement('img');im.alt=d.t;im.src=d.img;
    im.addEventListener('load',function(){el.classList.add('in');loaded++;if(loaded>=N)setTimeout(finish,350);});
    im.addEventListener('error',function(){loaded++;if(loaded>=N)setTimeout(finish,200);});
    el.appendChild(im);
    var li=document.createElement('span');li.innerHTML='<b>'+(i<9?'0':'')+(i+1)+'</b>'+d.t.split(' — ')[0];idx.appendChild(li);
    el.addEventListener('mouseenter',function(){cap.textContent=d.t;li.classList.add('on');});
    el.addEventListener('mouseleave',function(){li.classList.remove('on');});
    el.addEventListener('click',function(){cap.textContent=d.t;});
    ring.appendChild(el);cards.push(el);
    if(im.complete&&im.naturalWidth)el.classList.add('in');
  });
  setTimeout(finish,3400);
  function layout(){
    var w=innerWidth,h=innerHeight;
    R=Math.max(w<=380?115:w<=640?155:200,Math.min(450,h*.43,w*.57));
    PERS=w<=380?640:w<=640?780:w<=900?940:1150;
    document.documentElement.style.setProperty('--persp',PERS+'px');
    var cw=Math.round(Math.max(70,R*(w<=380?0.38:w<=640?0.40:.42)));
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
    cam+=((p*Math.min(58,R*.15))-cam)*.075;
    var ry=sy+dx,rx=sx+dy;
    world.style.transform='translateZ('+cam.toFixed(2)+'px) rotateY('+ry.toFixed(3)+'deg) rotateX('+rx.toFixed(3)+'deg)';
    head.style.transform='rotateX('+(-rx).toFixed(3)+'deg) rotateY('+(-ry).toFixed(3)+'deg) translateZ('+(R*.63).toFixed(1)+'px)';
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
})();
</script>
</body>
</html>`,
  },
  {
    id: "immersive-frequency",
    name: "Frequency — Live Covers",
    category: "Entertainment",
    description: "Neon violet live-music page with a square album-cover ring, glowing cards and a now-playing tour bar.",
    thumb: "🎧",
    getCode: () => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Frequency — Live at Midnight</title>
<meta name="description" content="Frequency, live at midnight. Eight records, one tour, 2026 dates across Europe.">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
<style>
:root{--bg:#08060f;--ink:#f0eaff;--violet:#7c5cff;--pink:#ff3d81;--dim:#8d85a8;--pad:clamp(14px,2.6vw,34px);--hw:min(56vw,640px);--persp:1150px;--safe-top:env(safe-area-inset-top);--safe-right:env(safe-area-inset-right);--safe-bottom:env(safe-area-inset-bottom);--safe-left:env(safe-area-inset-left)}
*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent}html{background:var(--bg);scrollbar-gutter:stable}
body{background:var(--bg);color:var(--ink);font-family:'Inter',sans-serif;font-weight:300;overflow-x:hidden;min-height:100vh;overscroll-behavior-y:none;-webkit-font-smoothing:antialiased}
img{display:block;max-width:100%}a{color:inherit;text-decoration:none}button{font:inherit;color:inherit;background:none;border:none;cursor:pointer}
#track{height:116vh;pointer-events:none}
#stage{position:fixed;inset:0;z-index:10;perspective:var(--persp);overflow:hidden;touch-action:none;background:radial-gradient(circle at 50% 46%,#1a1040 0%,#0d0926 38%,#08060f 72%,#040309 100%)}
#world{position:absolute;top:50%;left:50%;width:0;height:0;transform-style:preserve-3d;will-change:transform}
#ring{position:absolute;top:0;left:0;width:0;height:0;transform-style:preserve-3d}
.card{position:absolute;top:0;left:0;width:var(--cw,130px);height:var(--cw,130px);margin-left:calc(var(--cw,130px) / -2);margin-top:calc(var(--cw,130px) / -2);border-radius:6px;overflow:hidden;background:#120b26;transform-style:preserve-3d;will-change:transform,opacity;transition:opacity .5s ease;box-shadow:0 0 40px rgba(124,92,255,.25),0 22px 60px rgba(0,0,0,.5)}
.card img{width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .8s ease-out;filter:saturate(1.15)}.card.in img{opacity:1}
.card::after{content:'';position:absolute;inset:0;background:linear-gradient(160deg,rgba(255,61,129,var(--d,0)),rgba(8,6,15,var(--d,0)));box-shadow:inset 0 0 0 1px rgba(240,234,255,.16);pointer-events:none}
#head{position:absolute;top:0;left:0;width:var(--hw);margin-left:calc(var(--hw) / -2);text-align:center;font-family:'Syne',sans-serif;font-weight:700;font-size:clamp(30px,5.4vw,82px);line-height:.98;letter-spacing:-.03em;text-transform:uppercase;color:#fff;text-shadow:0 0 60px rgba(124,92,255,.7);pointer-events:none;user-select:none}
#head span{position:absolute;top:0;left:0;width:100%;transform:translateY(-50%)}
#head em{font-style:normal;background:linear-gradient(90deg,var(--violet),var(--pink));-webkit-background-clip:text;background-clip:text;color:transparent}
#head small{display:block;font-family:'Inter',sans-serif;font-size:9px;font-weight:500;letter-spacing:.36em;text-transform:uppercase;color:var(--dim);margin-bottom:15px}
.vig{position:fixed;inset:0;z-index:12;pointer-events:none;background:radial-gradient(ellipse 86% 90% at 50% 50%,transparent 48%,rgba(8,6,15,.34) 82%,rgba(8,6,15,.85) 100%)}
header{position:fixed;top:0;left:0;right:0;z-index:60;display:flex;justify-content:space-between;align-items:flex-start;padding:calc(var(--pad)*.9 + var(--safe-top)) calc(var(--pad) + var(--safe-right)) 0 calc(var(--pad) + var(--safe-left));opacity:0;transition:opacity 1.2s ease .2s}
body.on header,body.on .player,body.on .cue,body.on .cap,body.on .foot{opacity:1}
.wordmark{font-family:'Syne',sans-serif;font-size:clamp(17px,1.9vw,23px);font-weight:700;letter-spacing:.14em;text-transform:uppercase}.wordmark b{color:var(--pink)}
.hmeta{font-size:9px;letter-spacing:.24em;text-transform:uppercase;color:var(--dim);text-align:right;line-height:1.9}
.player{position:fixed;left:calc(var(--pad) + var(--safe-left));bottom:calc(var(--pad) + var(--safe-bottom));z-index:56;display:flex;align-items:center;gap:14px;opacity:0;transition:opacity 1.2s ease .2s}
.eq{display:flex;align-items:flex-end;gap:2px;height:22px}.eq i{width:3px;background:var(--pink);border-radius:1px;animation:eq 1s ease-in-out infinite;font-style:normal}
.eq i:nth-child(2){animation-delay:.15s;background:var(--violet)}.eq i:nth-child(3){animation-delay:.3s}.eq i:nth-child(4){animation-delay:.45s;background:var(--violet)}
@keyframes eq{0%,100%{height:5px}50%{height:22px}}.player .txt{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--dim);line-height:1.8}
.player .txt b{display:block;color:var(--ink);font-weight:500}
.foot{position:fixed;right:calc(var(--pad) + var(--safe-right));bottom:calc(var(--pad) + var(--safe-bottom));z-index:55;font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--dim);text-align:right;line-height:1.8;opacity:0;transition:opacity 1.2s ease .2s}
.cap{position:fixed;left:50%;bottom:calc(var(--pad) + var(--safe-bottom) + 40px);transform:translateX(-50%);z-index:56;font-family:'Syne',sans-serif;font-size:clamp(13px,1.2vw,16px);letter-spacing:.16em;text-transform:uppercase;color:var(--ink);white-space:nowrap;opacity:0;transition:opacity 1.2s ease .2s;pointer-events:none;text-shadow:0 0 24px rgba(124,92,255,.8)}
.cue{position:fixed;left:50%;bottom:calc(var(--pad) + var(--safe-bottom) + 4px);transform:translateX(-50%);z-index:54;display:flex;align-items:center;gap:10px;font-size:9px;letter-spacing:.24em;text-transform:uppercase;color:var(--dim);white-space:nowrap;opacity:0;transition:opacity 1.2s ease .2s}
.cue s{width:44px;height:1px;background:rgba(240,234,255,.2);position:relative;overflow:hidden;text-decoration:none}
.cue s::after{content:'';position:absolute;inset:0;background:var(--pink);animation:sweep 2.4s ease infinite}
@keyframes sweep{0%{transform:translateX(-100%)}55%{transform:translateX(0)}100%{transform:translateX(100%)}}
#veil{position:fixed;inset:0;z-index:250;background:#08060f;display:grid;place-items:center;align-content:center;gap:22px;transition:opacity .6s ease}
#veil.out{opacity:0;pointer-events:none}
.vl-mk{font-family:'Syne',sans-serif;font-size:clamp(26px,4.2vw,44px);font-weight:700;letter-spacing:.2em;text-transform:uppercase;background:linear-gradient(90deg,var(--violet),var(--pink));-webkit-background-clip:text;background-clip:text;color:transparent;animation:rise 1s ease .1s both}
.vl-eq{display:flex;align-items:flex-end;gap:3px;height:30px}.vl-eq i{width:4px;background:var(--violet);animation:eq 1s ease-in-out infinite;font-style:normal}
.vl-eq i:nth-child(2n){background:var(--pink);animation-delay:.2s}.vl-eq i:nth-child(3n){animation-delay:.4s}
.vl-tg{font-size:9px;letter-spacing:.34em;text-transform:uppercase;color:var(--dim);animation:rise .9s ease .5s both}
@keyframes rise{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}@media(max-width:900px){#head{font-size:clamp(30px,7vw,60px)}}
@media(max-width:768px){.hmeta{display:none}}
@media(max-width:640px){:root{--hw:min(84vw,360px);--pad:clamp(12px,4vw,18px)}.cue{display:none}.foot{display:none}#head{font-size:clamp(28px,9vw,48px)}.cap{bottom:calc(var(--pad) + var(--safe-bottom) + 58px)}}
@media(max-width:380px){:root{--hw:min(88vw,320px)}}@media(max-height:520px) and (orientation:landscape){.hmeta,.cue,.foot{display:none}#head{font-size:clamp(20px,5.4vh,32px)}}
@media(prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;transition-duration:.14s!important}}
</style>
</head>
<body>
<div id="veil"><div class="vl-mk">Frequency</div><div class="vl-eq"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="vl-tg">Live at Midnight · Tour 2026</div></div>
<div id="track"></div>
<div id="stage" data-mode="ring"><div id="world"><div id="ring"></div><h1 id="head"><span><small>Sides A &amp; B</small>Live at<br><em>Midnight</em></span></h1></div></div>
<div class="vig"></div>
<header><a href="#" class="wordmark">Fre<b>q</b>uency</a><div class="hmeta">Tour 2026<br>18 cities</div></header>
<div class="player"><div class="eq"><i></i><i></i><i></i><i></i></div><div class="txt"><b>Now playing</b>Neon Hours — Side B</div></div>
<div class="cap" id="cap">Neon Hours — Side B</div>
<div class="foot">Tickets · 10:00 CET<br>Friday, 24 Oct</div>
<div class="cue"><s></s>Drag the covers</div>
<script>
(function(){
  var stage=document.getElementById('stage'),world=document.getElementById('world'),ring=document.getElementById('ring'),head=document.getElementById('head'),cap=document.getElementById('cap');
  var C='https://images.unsplash.com/';
  var data=[
    {t:'Neon Hours — Side B',img:C+'photo-1493225457124-a3eb161ffa5f?w=560&h=560&fit=crop'},
    {t:'Static Bloom — 2026',img:C+'photo-1470229722913-7c0e2dbbafd3?w=560&h=560&fit=crop'},
    {t:'Low Light — Live',img:C+'photo-1501386761578-eac5c94b800a?w=560&h=560&fit=crop'},
    {t:'Afterglow — EP',img:C+'photo-1524368535928-5b5e00ddc76b?w=560&h=560&fit=crop'},
    {t:'Analog Heart',img:C+'photo-1516280440614-37939bbacd81?w=560&h=560&fit=crop'},
    {t:'Midnight Radio',img:C+'photo-1511671782779-c97d3d27a1d4?w=560&h=560&fit=crop'},
    {t:'Glass Rooms — Remix',img:C+'photo-1514320291840-2e0a9bf2a9ae?w=560&h=560&fit=crop'},
    {t:'Tour Poster — 26',img:C+'photo-1459749411175-04bf5292ceea?w=560&h=560&fit=crop'}
  ];
  var N=data.length,cards=[],R=300,PERS=1150,loaded=0;
  var veil=document.getElementById('veil'),ended=false;
  function finish(){if(ended)return;ended=true;veil.classList.add('out');document.body.classList.add('on');setTimeout(function(){if(veil.parentNode)veil.parentNode.removeChild(veil);},950);}
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
  setTimeout(finish,3000);
  function layout(){
    var w=innerWidth,h=innerHeight;
    R=Math.max(w<=380?115:w<=640?155:200,Math.min(440,h*.43,w*.58));
    PERS=w<=380?640:w<=640?780:w<=900?940:1150;
    document.documentElement.style.setProperty('--persp',PERS+'px');
    var cw=Math.round(Math.max(80,R*(w<=380?0.42:w<=640?0.46:.50)));
    ring.style.setProperty('--cw',cw+'px');
    cards.forEach(function(el,i){
      var a=i/N*Math.PI*2;
      var x=Math.sin(a),y=Math.sin(a*2)*.06,z=Math.cos(a);
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
    cam+=((p*Math.min(56,R*.15))-cam)*.075;
    var ry=sy+dx,rx=sx+dy;
    world.style.transform='translateZ('+cam.toFixed(2)+'px) rotateY('+ry.toFixed(3)+'deg) rotateX('+rx.toFixed(3)+'deg)';
    head.style.transform='rotateX('+(-rx).toFixed(3)+'deg) rotateY('+(-ry).toFixed(3)+'deg) translateZ('+(R*.6).toFixed(1)+'px)';
    head.style.opacity=Math.max(0,1-p*.5).toFixed(3);
    var rad=Math.PI/180,cy=Math.cos(ry*rad),sy2=Math.sin(ry*rad),cx=Math.cos(rx*rad),sx2=Math.sin(rx*rad);
    cards.forEach(function(el){
      var x=+el.getAttribute('data-x'),y=+el.getAttribute('data-y'),z=+el.getAttribute('data-z');
      var X=x*cy+z*sy2,Z=-x*sy2+z*cy,Y=y*cx-Z*sx2,Z2=y*sx2+Z*cx;
      var zf=cl(Z2,-1,1),base=.17+.83*Math.pow((zf+1)/2,.85);
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
  {
    id: "immersive-casaalba",
    name: "Casa Alba — Suite Carousel",
    category: "Hotel / Hospitality",
    description: "Terracotta Mediterranean hotel page with a rotating suite gallery, sun-arc splash and a floating booking bar.",
    thumb: "🌅",
    getCode: () => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Casa Alba — Stay a Little Longer</title>
<meta name="description" content="Casa Alba is a twelve-room house above the sea in Puglia. Stone, linen, olive trees and long afternoons.">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
<style>
:root{--bg:#f6efe6;--ink:#42291f;--terra:#b5543c;--olive:#4a5240;--dim:#8d6f5e;--pad:clamp(14px,2.6vw,34px);--hw:min(56vw,640px);--persp:1150px;--safe-top:env(safe-area-inset-top);--safe-right:env(safe-area-inset-right);--safe-bottom:env(safe-area-inset-bottom);--safe-left:env(safe-area-inset-left)}
*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent}html{background:var(--bg);scrollbar-gutter:stable}
body{background:var(--bg);color:var(--ink);font-family:'Inter',sans-serif;font-weight:300;overflow-x:hidden;min-height:100vh;overscroll-behavior-y:none;-webkit-font-smoothing:antialiased}
img{display:block;max-width:100%}a{color:inherit;text-decoration:none}button{font:inherit;color:inherit;background:none;border:none;cursor:pointer}
#track{height:116vh;pointer-events:none}
#stage{position:fixed;inset:0;z-index:10;perspective:var(--persp);overflow:hidden;touch-action:none;background:radial-gradient(circle at 50% 46%,#fbf5ec 0%,#f6efe6 46%,#e9dccb 100%)}
#world{position:absolute;top:50%;left:50%;width:0;height:0;transform-style:preserve-3d;will-change:transform}
#ring{position:absolute;top:0;left:0;width:0;height:0;transform-style:preserve-3d}
.card{position:absolute;top:0;left:0;width:var(--cw,160px);height:calc(var(--cw,160px)*.72);margin-left:calc(var(--cw,160px) / -2);margin-top:calc(var(--cw,160px)*-.36);overflow:hidden;background:#e0d0bc;transform-style:preserve-3d;will-change:transform,opacity;transition:opacity .5s ease;box-shadow:0 20px 46px rgba(66,41,31,.18)}
.card img{width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .9s ease-out;filter:saturate(.9)}.card.in img{opacity:1}
.card::after{content:'';position:absolute;inset:0;background:rgba(50,28,20,var(--d,0));box-shadow:inset 0 0 0 1px rgba(255,255,255,.22);pointer-events:none}
#head{position:absolute;top:0;left:0;width:var(--hw);margin-left:calc(var(--hw) / -2);text-align:center;font-family:'Cormorant Garamond',Georgia,serif;font-weight:300;font-size:clamp(32px,5vw,78px);line-height:.98;letter-spacing:-.01em;color:#3c241b;text-shadow:0 2px 34px rgba(251,245,236,.95);pointer-events:none;user-select:none}
#head span{position:absolute;top:0;left:0;width:100%;transform:translateY(-50%)}#head em{font-style:italic;color:var(--terra)}
#head small{display:block;font-family:'Inter',sans-serif;font-size:9px;font-weight:500;letter-spacing:.34em;text-transform:uppercase;color:var(--olive);margin-bottom:16px}
.vig{position:fixed;inset:0;z-index:12;pointer-events:none;background:radial-gradient(ellipse 90% 92% at 50% 50%,transparent 54%,rgba(66,41,31,.12) 84%,rgba(66,41,31,.3) 100%)}
header{position:fixed;top:0;left:0;right:0;z-index:60;display:flex;justify-content:space-between;align-items:flex-start;padding:calc(var(--pad)*.9 + var(--safe-top)) calc(var(--pad) + var(--safe-right)) 0 calc(var(--pad) + var(--safe-left));opacity:0;transition:opacity 1.2s ease .2s}
body.on header,body.on .book,body.on .cue,body.on .cap,body.on .weather{opacity:1}
.wordmark{font-family:'Cormorant Garamond',serif;font-size:clamp(22px,2.5vw,31px);letter-spacing:.08em;text-transform:uppercase;line-height:1}
.wordmark b{font-weight:500;color:var(--terra)}.hmeta{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--dim);text-align:right;line-height:1.9}
.weather{position:fixed;right:calc(var(--pad) + var(--safe-right));bottom:calc(var(--pad) + var(--safe-bottom) + 64px);z-index:55;font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--dim);text-align:right;line-height:1.8;opacity:0;transition:opacity 1.2s ease .2s}
.book{position:fixed;left:50%;bottom:calc(var(--pad) + var(--safe-bottom));transform:translateX(-50%);z-index:58;display:flex;align-items:stretch;background:#fffaf3;border:1px solid rgba(181,84,60,.24);box-shadow:0 18px 46px rgba(66,41,31,.16);opacity:0;transition:opacity 1.2s ease .2s}
.book div{padding:11px 18px;border-right:1px solid rgba(181,84,60,.16);min-width:112px}.book div:last-child{border:none;padding:0}
.book span{display:block;font-size:8px;letter-spacing:.22em;text-transform:uppercase;color:var(--dim);margin-bottom:3px}.book b{font-size:11.5px;font-weight:500;color:var(--ink)}
.book button{height:100%;background:var(--terra);color:#fff;padding:0 22px;font-size:9px;letter-spacing:.2em;text-transform:uppercase}
.cap{position:fixed;left:50%;bottom:calc(var(--pad) + var(--safe-bottom) + 82px);transform:translateX(-50%);z-index:56;font-family:'Cormorant Garamond',serif;font-style:italic;font-size:clamp(15px,1.4vw,19px);color:#5c3d2c;white-space:nowrap;opacity:0;transition:opacity 1.2s ease .2s;pointer-events:none}
.cue{position:fixed;left:calc(var(--pad) + var(--safe-left));bottom:calc(var(--pad) + var(--safe-bottom));z-index:54;display:flex;align-items:center;gap:10px;font-size:9px;letter-spacing:.24em;text-transform:uppercase;color:var(--dim);white-space:nowrap;opacity:0;transition:opacity 1.2s ease .2s}
.cue s{width:38px;height:1px;background:rgba(181,84,60,.28);position:relative;overflow:hidden;text-decoration:none}
.cue s::after{content:'';position:absolute;inset:0;background:var(--terra);animation:sweep 2.8s ease infinite}
@keyframes sweep{0%{transform:translateX(-100%)}55%{transform:translateX(0)}100%{transform:translateX(100%)}}
#veil{position:fixed;inset:0;z-index:250;background:#f6efe6;display:grid;place-items:center;align-content:center;gap:22px;transition:opacity .7s ease}
#veil.out{opacity:0;pointer-events:none}.vl-sun{width:64px;height:32px;border-radius:64px 64px 0 0;background:var(--terra);animation:sun 1.6s ease .1s both}
@keyframes sun{from{opacity:0;transform:translateY(14px) scaleX(.6)}to{opacity:1;transform:none}}
.vl-mk{font-family:'Cormorant Garamond',serif;font-size:clamp(30px,4.6vw,54px);letter-spacing:.1em;text-transform:uppercase;animation:rise 1s ease .3s both}
.vl-tg{font-size:9px;letter-spacing:.32em;text-transform:uppercase;color:var(--dim);animation:rise .9s ease .7s both}
@keyframes rise{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}@media(max-width:900px){#head{font-size:clamp(32px,6.6vw,60px)}.weather{display:none}}
@media(max-width:768px){.hmeta{display:none}}
@media(max-width:640px){:root{--hw:min(84vw,360px);--pad:clamp(12px,4vw,18px)}.cue{display:none}.book div{padding:9px 12px;min-width:96px}.book button{padding:0 14px}#head{font-size:clamp(32px,9vw,50px)}.cap{bottom:calc(var(--pad) + var(--safe-bottom) + 76px)}}
@media(max-width:420px){.book div:nth-child(2){display:none}}@media(max-width:380px){:root{--hw:min(88vw,320px)}}
@media(max-height:520px) and (orientation:landscape){.hmeta,.weather,.cue,.book,.cap{display:none}#head{font-size:clamp(20px,5.2vh,32px)}}
@media(prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;transition-duration:.14s!important}}
</style>
</head>
<body>
<div id="veil"><div class="vl-sun"></div><div class="vl-mk">Casa Alba</div><div class="vl-tg">Puglia · Twelve rooms · Est. 1998</div></div>
<div id="track"></div>
<div id="stage" data-mode="ring"><div id="world"><div id="ring"></div><h1 id="head"><span><small>A house above the sea</small>Stay a Little<br><em>Longer</em></span></h1></div></div>
<div class="vig"></div>
<header><a href="#" class="wordmark">Casa <b>Alba</b></a><div class="hmeta">Puglia, Italy<br>Check-in 15:00</div></header>
<div class="weather">26°C · Clear<br>Sunset 19:42</div>
<div class="book"><div><span>Check in</span><b>14 Oct 2026</b></div><div><span>Check out</span><b>18 Oct 2026</b></div><div><span>Guests</span><b>2 adults</b></div><button>Check availability</button></div>
<div class="cap" id="cap">Suite 04 — Sea terrace</div>
<div class="cue"><s></s>Drag the rooms</div>
<script>
(function(){
  var stage=document.getElementById('stage'),world=document.getElementById('world'),ring=document.getElementById('ring'),head=document.getElementById('head'),cap=document.getElementById('cap');
  var C='https://images.unsplash.com/';
  var data=[
    {t:'Suite 04 — Sea terrace',img:C+'photo-1566073771259-6a8506099945?w=620&h=450&fit=crop'},
    {t:'Suite 01 — Courtyard',img:C+'photo-1582719478250-c89cae4dc85b?w=620&h=450&fit=crop'},
    {t:'The Long Room',img:C+'photo-1571896349842-33c89424de2d?w=620&h=450&fit=crop'},
    {t:'Suite 07 — Olive view',img:C+'photo-1551882547-ff40c63fe5fa?w=620&h=450&fit=crop'},
    {t:'The Garden Bath',img:C+'photo-1445019980597-93fa8acb246c?w=620&h=450&fit=crop'},
    {t:'Suite 11 — Rooftop',img:C+'photo-1611892440504-42a792e24d32?w=620&h=450&fit=crop'},
    {t:'The Reading Room',img:C+'photo-1520250497591-112f2f40a3f4?w=620&h=450&fit=crop'},
    {t:'Alba Breakfast',img:C+'photo-1590490360182-c33d57733427?w=620&h=450&fit=crop'}
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
</html>`,
  },
];
