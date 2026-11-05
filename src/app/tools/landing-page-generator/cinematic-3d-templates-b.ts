export const cinematic3dTemplatesB = [
  {
    id: "cinematic-neon-drive",
    name: "Neon Drive — Car Showroom",
    category: "Automotive",
    description: "Cinematic automotive showroom with neon glow accents, parallax hero, animated speedometer stats, horizontal gallery, and gradient-border CTA.",
    thumb: "🏎️",
    getCode: () => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Neon Drive — Performance Showroom</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
:root{--cyan:#00e5ff;--purple:#b388ff;--bg:#08080c;--card:#111118;--text:#e0e0e6;--dim:#6e6e7a;--glow:0 0 30px rgba(0,229,255,.25)}
*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth;scrollbar-width:thin;scrollbar-color:var(--cyan) var(--bg)}
body{background:var(--bg);color:var(--text);font-family:'Inter',sans-serif;font-weight:400;overflow-x:hidden;-webkit-font-smoothing:antialiased}
h1,h2,h3,h4{font-family:'Rajdhani',sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:.04em}
a{color:inherit;text-decoration:none}

.light-trail{position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;overflow:hidden}
.light-trail span{position:absolute;height:1px;background:linear-gradient(90deg,transparent,var(--cyan),transparent);opacity:.12;animation:trail linear infinite}
.light-trail span:nth-child(1){top:20%;width:80%;left:-80%;animation-duration:8s;animation-delay:0s}
.light-trail span:nth-child(2){top:45%;width:60%;left:-60%;animation-duration:6s;animation-delay:2s;background:linear-gradient(90deg,transparent,var(--purple),transparent)}
.light-trail span:nth-child(3){top:70%;width:90%;left:-90%;animation-duration:10s;animation-delay:4s}
.light-trail span:nth-child(4){top:85%;width:50%;left:-50%;animation-duration:7s;animation-delay:1s;background:linear-gradient(90deg,transparent,var(--purple),transparent);opacity:.08}
@keyframes trail{0%{transform:translateX(0)}100%{transform:translateX(calc(100vw + 100%))}}

nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;justify-content:space-between;align-items:center;padding:20px clamp(20px,4vw,48px);background:linear-gradient(180deg,rgba(8,8,12,.95) 0%,transparent 100%)}
.logo{font-family:'Rajdhani',sans-serif;font-size:24px;font-weight:700;letter-spacing:.08em;text-transform:uppercase}
.logo span{color:var(--cyan);text-shadow:var(--glow)}
nav ul{display:flex;gap:28px;list-style:none}
nav ul a{font-size:13px;font-weight:500;letter-spacing:.06em;text-transform:uppercase;color:var(--dim);transition:color .3s}
nav ul a:hover{color:var(--cyan)}

.hero{position:relative;min-height:100vh;display:flex;align-items:flex-end;padding:0 clamp(20px,4vw,48px) 80px;overflow:hidden}
.hero-bg{position:absolute;inset:0;z-index:0}
.hero-bg img{width:100%;height:100%;object-fit:cover;transform:scale(1.08);transition:transform .1s linear}
.hero-bg::after{content:'';position:absolute;inset:0;background:linear-gradient(0deg,var(--bg) 0%,rgba(8,8,12,.4) 40%,rgba(8,8,12,.2) 100%)}
.hero-content{position:relative;z-index:2;max-width:700px}
.hero-tag{display:inline-block;padding:6px 16px;border:1px solid rgba(0,229,255,.3);border-radius:20px;font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--cyan);margin-bottom:20px}
.hero h1{font-size:clamp(42px,7vw,88px);line-height:.95;margin-bottom:16px;background:linear-gradient(135deg,#fff 30%,var(--cyan));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero p{font-size:clamp(15px,1.4vw,18px);color:var(--dim);line-height:1.6;max-width:480px;margin-bottom:32px}
.hero-cta{display:inline-flex;align-items:center;gap:10px;padding:14px 32px;font-family:'Rajdhani',sans-serif;font-size:15px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#fff;background:transparent;border:none;cursor:pointer;position:relative;z-index:1}
.hero-cta::before{content:'';position:absolute;inset:0;border-radius:6px;padding:2px;background:linear-gradient(135deg,var(--cyan),var(--purple),var(--cyan));-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude;animation:borderRotate 3s linear infinite}
@keyframes borderRotate{0%{filter:hue-rotate(0deg)}100%{filter:hue-rotate(360deg)}}
.hero-cta svg{width:16px;height:16px;fill:var(--cyan)}

.stats{position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(255,255,255,.06);margin:0 clamp(20px,4vw,48px)}
.stat{background:var(--bg);padding:40px 32px;text-align:center}
.stat-val{font-family:'Rajdhani',sans-serif;font-size:clamp(36px,4vw,56px);font-weight:700;color:#fff;line-height:1}
.stat-val .unit{font-size:.5em;color:var(--cyan);margin-left:2px}
.stat-label{font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:var(--dim);margin-top:8px}

.specs{padding:100px clamp(20px,4vw,48px);position:relative;z-index:2}
.section-head{text-align:center;margin-bottom:60px}
.section-head h2{font-size:clamp(28px,3.5vw,48px);margin-bottom:12px;background:linear-gradient(135deg,#fff,var(--cyan));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.section-head p{color:var(--dim);font-size:15px;max-width:500px;margin:0 auto}
.specs-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px}
.spec-card{background:var(--card);border:1px solid rgba(255,255,255,.06);border-radius:12px;padding:32px;transition:border-color .4s,box-shadow .4s,transform .3s}
.spec-card:hover{border-color:var(--cyan);box-shadow:var(--glow);transform:translateY(-4px)}
.spec-icon{width:48px;height:48px;border-radius:10px;background:rgba(0,229,255,.08);display:grid;place-items:center;margin-bottom:16px;font-size:22px}
.spec-card h3{font-size:18px;margin-bottom:8px;color:#fff}
.spec-card p{font-size:14px;color:var(--dim);line-height:1.6}

.gallery{padding:80px 0;position:relative;z-index:2;overflow:hidden}
.gallery h2{text-align:center;font-size:clamp(28px,3.5vw,48px);margin-bottom:40px;padding:0 clamp(20px,4vw,48px);background:linear-gradient(135deg,#fff,var(--purple));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.gallery-track{display:flex;gap:16px;padding:0 clamp(20px,4vw,48px);overflow-x:auto;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;scrollbar-width:none}
.gallery-track::-webkit-scrollbar{display:none}
.gallery-item{flex:0 0 clamp(280px,30vw,400px);scroll-snap-align:start;border-radius:12px;overflow:hidden;position:relative;aspect-ratio:4/3}
.gallery-item img{width:100%;height:100%;object-fit:cover;transition:transform .6s ease}
.gallery-item:hover img{transform:scale(1.08)}
.gallery-item::after{content:'';position:absolute;inset:0;background:linear-gradient(0deg,rgba(8,8,12,.7) 0%,transparent 50%)}

.cta-section{padding:100px clamp(20px,4vw,48px);text-align:center;position:relative;z-index:2}
.cta-section h2{font-size:clamp(32px,4.5vw,56px);margin-bottom:16px;color:#fff}
.cta-section p{color:var(--dim);font-size:16px;margin-bottom:32px}
.cta-btn{display:inline-flex;align-items:center;gap:10px;padding:16px 40px;border-radius:8px;background:linear-gradient(135deg,var(--cyan),var(--purple));font-family:'Rajdhani',sans-serif;font-size:16px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#000;border:none;cursor:pointer;transition:transform .3s,box-shadow .3s}
.cta-btn:hover{transform:scale(1.04);box-shadow:0 0 40px rgba(0,229,255,.35)}

footer{padding:40px clamp(20px,4vw,48px);border-top:1px solid rgba(255,255,255,.06);display:flex;justify-content:space-between;align-items:center;position:relative;z-index:2;flex-wrap:wrap;gap:16px}
footer p{font-size:13px;color:var(--dim)}

.reveal{opacity:0;transform:translateY(30px);transition:opacity .7s ease,transform .7s ease}.reveal.vis{opacity:1;transform:none}

@media(max-width:768px){
  nav ul{display:none}
  .stats{grid-template-columns:repeat(2,1fr)}
  .hero{min-height:80vh;padding-bottom:60px}
}
@media(max-width:480px){
  .stats{grid-template-columns:1fr 1fr}
  .stat{padding:24px 16px}
}
@media(prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;transition-duration:.15s!important}.light-trail{display:none}}
</style>
</head>
<body>
<div class="light-trail"><span></span><span></span><span></span><span></span></div>

<nav>
  <div class="logo">NEON<span>DRIVE</span></div>
  <ul><li><a href="#specs">Specs</a></li><li><a href="#gallery">Gallery</a></li><li><a href="#cta">Configure</a></li></ul>
</nav>

<section class="hero">
  <div class="hero-bg"><img src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1400&h=900&fit=crop" alt="Performance Car" id="heroBg"></div>
  <div class="hero-content reveal">
    <div class="hero-tag">2027 Model Reveal</div>
    <h1>Born To<br>Dominate.</h1>
    <p>Raw power meets precision engineering. 0 to 100 in 2.8 seconds. Every curve tells a story of aerodynamic perfection.</p>
    <button class="hero-cta">Configure Yours <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>
  </div>
</section>

<div class="stats">
  <div class="stat reveal"><div class="stat-val"><span class="counter" data-target="847">0</span><span class="unit">HP</span></div><div class="stat-label">Peak Power</div></div>
  <div class="stat reveal"><div class="stat-val"><span class="counter" data-target="2.8">0</span><span class="unit">s</span></div><div class="stat-label">0–100 km/h</div></div>
  <div class="stat reveal"><div class="stat-val"><span class="counter" data-target="338">0</span><span class="unit">km/h</span></div><div class="stat-label">Top Speed</div></div>
  <div class="stat reveal"><div class="stat-val"><span class="counter" data-target="1050">0</span><span class="unit">Nm</span></div><div class="stat-label">Torque</div></div>
</div>

<section class="specs" id="specs">
  <div class="section-head reveal"><h2>Engineered Without Compromise</h2><p>Every component designed for a singular purpose — absolute performance.</p></div>
  <div class="specs-grid">
    <div class="spec-card reveal"><div class="spec-icon">⚡</div><h3>Dual Electric Motors</h3><p>Twin axial-flux motors deliver instant torque to all four wheels with micro-second response times.</p></div>
    <div class="spec-card reveal"><div class="spec-icon">🌬️</div><h3>Active Aerodynamics</h3><p>Adaptive wings and diffuser adjust 100 times per second, optimizing downforce at every speed.</p></div>
    <div class="spec-card reveal"><div class="spec-icon">🔋</div><h3>Solid-State Battery</h3><p>Next-gen 120kWh pack delivers 580km range with 10-minute ultra-rapid charging capability.</p></div>
    <div class="spec-card reveal"><div class="spec-icon">🧠</div><h3>Neural Drive AI</h3><p>Machine learning chassis control predicts road conditions and adjusts suspension in real time.</p></div>
    <div class="spec-card reveal"><div class="spec-icon">🛞</div><h3>Carbon Ceramic Brakes</h3><p>Track-proven stopping power with zero fade even after repeated high-speed deceleration.</p></div>
    <div class="spec-card reveal"><div class="spec-icon">🎯</div><h3>Torque Vectoring</h3><p>Individual wheel torque control for razor-sharp cornering precision and maximum grip.</p></div>
  </div>
</section>

<section class="gallery" id="gallery">
  <h2 class="reveal">Gallery</h2>
  <div class="gallery-track">
    <div class="gallery-item"><img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop" alt="Front View"></div>
    <div class="gallery-item"><img src="https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&h=400&fit=crop" alt="Side Profile"></div>
    <div class="gallery-item"><img src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop" alt="Interior"></div>
    <div class="gallery-item"><img src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop" alt="Night Drive"></div>
    <div class="gallery-item"><img src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop" alt="Track"></div>
    <div class="gallery-item"><img src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&h=400&fit=crop" alt="Detail"></div>
  </div>
</section>

<section class="cta-section" id="cta">
  <h2 class="reveal">Ready To Drive The Future?</h2>
  <p class="reveal">Reserve your Neon Drive today. Limited to 500 units worldwide.</p>
  <button class="cta-btn reveal">Reserve Now</button>
</section>

<footer><p>&copy; 2027 Neon Drive. All rights reserved.</p><p>Performance. Redefined.</p></footer>

<script>
(function(){
  var obs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('vis');if(e.target.querySelector('.counter')){animateCounters(e.target)}obs.unobserve(e.target)}})},{threshold:.15});
  document.querySelectorAll('.reveal').forEach(function(el){obs.observe(el)});

  function animateCounters(parent){
    parent.querySelectorAll('.counter').forEach(function(c){
      var target=parseFloat(c.dataset.target),isFloat=target%1!==0,dur=1800,start=performance.now();
      function step(now){
        var p=Math.min((now-start)/dur,1);
        var ease=1-Math.pow(1-p,3);
        var val=ease*target;
        c.textContent=isFloat?val.toFixed(1):Math.round(val).toLocaleString();
        if(p<1)requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  var heroBg=document.getElementById('heroBg');
  window.addEventListener('scroll',function(){
    var s=window.scrollY;
    if(s<window.innerHeight){heroBg.style.transform='scale(1.08) translateY('+s*.15+'px)'}
  },{passive:true});
})();
</script>
</body>
</html>`,
  },
  {
    id: "cinematic-living-portrait",
    name: "Living Portrait — 3D Creator",
    category: "Portfolio",
    description: "Bold 3D creator portfolio with interactive tilt portrait, floating skill tags, particle background, 3D hover project cards, and glassmorphism contact form.",
    thumb: "🧑‍🎨",
    getCode: () => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Jack Rivera — 3D Creator</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
<style>
:root{--bg:#0a0a0a;--card:#141418;--accent:#6c63ff;--accent2:#00d4aa;--text:#e8e8ed;--dim:#7a7a88;--radius:14px}
*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--text);font-family:'Inter',sans-serif;overflow-x:hidden;-webkit-font-smoothing:antialiased}
h1,h2,h3{font-family:'Space Grotesk',sans-serif;font-weight:700}
a{color:inherit;text-decoration:none}
canvas#particles{position:fixed;inset:0;z-index:0;pointer-events:none}

nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;justify-content:space-between;align-items:center;padding:20px clamp(20px,4vw,48px);backdrop-filter:blur(12px);background:rgba(10,10,10,.7)}
.nav-name{font-family:'Space Grotesk',sans-serif;font-size:20px;font-weight:700}
.nav-name span{color:var(--accent)}
nav ul{display:flex;gap:24px;list-style:none}
nav a{font-size:13px;font-weight:500;color:var(--dim);transition:color .3s}
nav a:hover{color:var(--accent)}

.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:100px clamp(20px,4vw,48px);position:relative;z-index:2}
.hero-inner{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;max-width:1100px;width:100%}
.hero-text h1{font-size:clamp(40px,6vw,80px);line-height:.95;margin-bottom:16px}
.hero-text h1 span{display:block;background:linear-gradient(135deg,var(--accent),var(--accent2));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero-text p{font-size:clamp(15px,1.3vw,18px);color:var(--dim);line-height:1.7;max-width:420px;margin-bottom:28px}
.hero-btns{display:flex;gap:12px;flex-wrap:wrap}
.btn-primary{padding:12px 28px;border-radius:8px;background:var(--accent);color:#fff;font-weight:600;font-size:14px;border:none;cursor:pointer;transition:transform .3s,box-shadow .3s}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(108,99,255,.35)}
.btn-outline{padding:12px 28px;border-radius:8px;background:transparent;color:var(--text);font-weight:600;font-size:14px;border:1px solid rgba(255,255,255,.15);cursor:pointer;transition:border-color .3s}
.btn-outline:hover{border-color:var(--accent)}

.portrait-wrap{display:flex;justify-content:center;align-items:center;position:relative;perspective:800px}
.portrait{width:clamp(260px,22vw,340px);height:clamp(260px,22vw,340px);border-radius:50%;overflow:hidden;border:3px solid rgba(108,99,255,.3);transition:transform .15s ease-out;will-change:transform;box-shadow:0 0 60px rgba(108,99,255,.15)}
.portrait img{width:100%;height:100%;object-fit:cover}
.skill-tag{position:absolute;padding:6px 14px;border-radius:20px;font-size:11px;font-weight:600;letter-spacing:.04em;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);backdrop-filter:blur(8px);white-space:nowrap;animation:floatTag 6s ease-in-out infinite}
.skill-tag:nth-child(2){top:8%;right:0;animation-delay:-1s;color:var(--accent)}
.skill-tag:nth-child(3){bottom:20%;right:-10%;animation-delay:-2.5s;color:var(--accent2)}
.skill-tag:nth-child(4){top:30%;left:-15%;animation-delay:-4s;color:#ff6b9d}
.skill-tag:nth-child(5){bottom:5%;left:5%;animation-delay:-3s;color:#ffd93d}
.skill-tag:nth-child(6){top:-5%;left:25%;animation-delay:-.5s;color:#6dd5ed}
@keyframes floatTag{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}

.projects{padding:100px clamp(20px,4vw,48px);position:relative;z-index:2}
.section-title{text-align:center;margin-bottom:60px}
.section-title h2{font-size:clamp(28px,3.5vw,48px);margin-bottom:10px}
.section-title p{color:var(--dim);font-size:15px}
.projects-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px;max-width:1100px;margin:0 auto}
.project-card{background:var(--card);border-radius:var(--radius);overflow:hidden;border:1px solid rgba(255,255,255,.06);transition:transform .4s ease,box-shadow .4s ease;perspective:600px;cursor:pointer;will-change:transform}
.project-card:hover{box-shadow:0 20px 60px rgba(0,0,0,.5)}
.project-card img{width:100%;aspect-ratio:16/10;object-fit:cover;transition:transform .5s}
.project-card:hover img{transform:scale(1.05)}
.project-info{padding:20px 24px}
.project-info h3{font-size:18px;margin-bottom:6px}
.project-info p{font-size:13px;color:var(--dim);line-height:1.5}
.project-tag{display:inline-block;margin-top:10px;padding:4px 10px;border-radius:6px;font-size:11px;font-weight:600;background:rgba(108,99,255,.12);color:var(--accent)}

.contact{padding:100px clamp(20px,4vw,48px);position:relative;z-index:2}
.contact-box{max-width:560px;margin:0 auto;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:var(--radius);padding:40px;backdrop-filter:blur(16px)}
.contact-box h2{font-size:28px;margin-bottom:8px;text-align:center}
.contact-box>p{color:var(--dim);font-size:14px;text-align:center;margin-bottom:28px}
.form-group{margin-bottom:16px}
.form-group label{display:block;font-size:13px;font-weight:500;margin-bottom:6px;color:var(--dim)}
.form-group input,.form-group textarea{width:100%;padding:12px 16px;border-radius:10px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.04);color:var(--text);font-family:'Inter',sans-serif;font-size:14px;outline:none;transition:border-color .3s}
.form-group input:focus,.form-group textarea:focus{border-color:var(--accent)}
.form-group textarea{height:100px;resize:vertical}
.submit-btn{width:100%;padding:14px;border-radius:10px;background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff;font-family:'Space Grotesk',sans-serif;font-size:15px;font-weight:700;border:none;cursor:pointer;transition:transform .3s,box-shadow .3s;margin-top:8px}
.submit-btn:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(108,99,255,.3)}

footer{padding:40px clamp(20px,4vw,48px);text-align:center;color:var(--dim);font-size:13px;position:relative;z-index:2;border-top:1px solid rgba(255,255,255,.06)}

.reveal{opacity:0;transform:translateY(30px);transition:opacity .7s ease,transform .7s ease}.reveal.vis{opacity:1;transform:none}

@media(max-width:768px){
  .hero-inner{grid-template-columns:1fr;text-align:center;gap:40px}
  .hero-text p{margin:0 auto 28px}
  .hero-btns{justify-content:center}
  .portrait-wrap{order:-1}
  nav ul{display:none}
  .skill-tag:nth-child(4){left:0}
  .skill-tag:nth-child(3){right:0}
}
@media(prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;transition-duration:.15s!important}canvas#particles{display:none}}
</style>
</head>
<body>
<canvas id="particles"></canvas>

<nav>
  <div class="nav-name">JACK<span>.</span></div>
  <ul><li><a href="#projects">Work</a></li><li><a href="#contact">Contact</a></li></ul>
</nav>

<section class="hero">
  <div class="hero-inner">
    <div class="hero-text reveal">
      <h1>HI, I'M<br><span>JACK</span></h1>
      <p>A 3D creator driven by crafting stunning visual experiences and unforgettable digital products. Let's build something extraordinary.</p>
      <div class="hero-btns">
        <button class="btn-primary">View Projects</button>
        <button class="btn-outline">Contact Me</button>
      </div>
    </div>
    <div class="portrait-wrap reveal">
      <div class="portrait" id="portrait"><img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&crop=face" alt="Jack Rivera"></div>
      <span class="skill-tag">Blender</span>
      <span class="skill-tag">Three.js</span>
      <span class="skill-tag">Motion Design</span>
      <span class="skill-tag">WebGL</span>
      <span class="skill-tag">UI/UX</span>
    </div>
  </div>
</section>

<section class="projects" id="projects">
  <div class="section-title reveal"><h2>Selected Work</h2><p>Projects that pushed creative boundaries</p></div>
  <div class="projects-grid">
    <div class="project-card reveal" data-tilt>
      <img src="https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=600&h=400&fit=crop" alt="Project 1">
      <div class="project-info"><h3>Nebula Dashboard</h3><p>Immersive 3D analytics interface with real-time data visualization.</p><span class="project-tag">Three.js</span></div>
    </div>
    <div class="project-card reveal" data-tilt>
      <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop" alt="Project 2">
      <div class="project-info"><h3>Aurora Brand</h3><p>Complete visual identity and 3D product renders for a tech startup.</p><span class="project-tag">Blender</span></div>
    </div>
    <div class="project-card reveal" data-tilt>
      <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop" alt="Project 3">
      <div class="project-info"><h3>Retro Arcade</h3><p>Interactive WebGL experience blending nostalgia with modern web tech.</p><span class="project-tag">WebGL</span></div>
    </div>
  </div>
</section>

<section class="contact" id="contact">
  <div class="contact-box reveal">
    <h2>Let's Talk</h2>
    <p>Got a project in mind? I'd love to hear about it.</p>
    <div class="form-group"><label>Name</label><input type="text" placeholder="Your name"></div>
    <div class="form-group"><label>Email</label><input type="email" placeholder="your@email.com"></div>
    <div class="form-group"><label>Message</label><textarea placeholder="Tell me about your project..."></textarea></div>
    <button class="submit-btn">Send Message</button>
  </div>
</section>

<footer>&copy; 2027 Jack Rivera. Crafted with passion.</footer>

<script>
(function(){
  // Particles
  var c=document.getElementById('particles'),ctx=c.getContext('2d'),dots=[];
  function resize(){c.width=window.innerWidth;c.height=window.innerHeight}
  resize();window.addEventListener('resize',resize);
  for(var i=0;i<60;i++){dots.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,r:Math.random()*1.5+.5})}
  function draw(){
    ctx.clearRect(0,0,c.width,c.height);
    dots.forEach(function(d){
      d.x+=d.vx;d.y+=d.vy;
      if(d.x<0)d.x=c.width;if(d.x>c.width)d.x=0;
      if(d.y<0)d.y=c.height;if(d.y>c.height)d.y=0;
      ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);ctx.fillStyle='rgba(108,99,255,.25)';ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();

  // Portrait tilt
  var portrait=document.getElementById('portrait');
  var heroEl=document.querySelector('.hero');
  heroEl.addEventListener('mousemove',function(e){
    var rect=portrait.getBoundingClientRect();
    var cx=rect.left+rect.width/2,cy=rect.top+rect.height/2;
    var dx=(e.clientX-cx)/rect.width,dy=(e.clientY-cy)/rect.height;
    portrait.style.transform='rotateY('+dx*20+'deg) rotateX('+(-dy*20)+'deg)';
  });
  heroEl.addEventListener('mouseleave',function(){portrait.style.transform='rotateY(0) rotateX(0)'});

  // Project card tilt
  document.querySelectorAll('[data-tilt]').forEach(function(card){
    card.addEventListener('mousemove',function(e){
      var rect=card.getBoundingClientRect();
      var x=(e.clientX-rect.left)/rect.width-.5;
      var y=(e.clientY-rect.top)/rect.height-.5;
      card.style.transform='perspective(600px) rotateY('+x*10+'deg) rotateX('+(-y*10)+'deg) scale(1.02)';
    });
    card.addEventListener('mouseleave',function(){card.style.transform='perspective(600px) rotateY(0) rotateX(0) scale(1)'});
  });

  // Reveal
  var obs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('vis');obs.unobserve(e.target)}})},{threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(el){obs.observe(el)});
})();
</script>
</body>
</html>`,
  },
  {
    id: "cinematic-solar-fog",
    name: "Solar Fog — Luxury Real Estate",
    category: "Real Estate",
    description: "Warm luxury real estate showcase with fog overlay animation, elegant serif typography, image-zoom property cards, animated counters, and testimonial slider.",
    thumb: "🏡",
    getCode: () => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Solar Fog — Luxury Real Estate</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
:root{--bg:#0d0d0d;--warm:#1a1510;--gold:#c9a96e;--cream:#f5f0e8;--card:#161310;--dim:#8a7e6e;--text:#e8e2d8;--serif:'Cormorant Garamond',Georgia,serif;--sans:'Inter',sans-serif}
*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--text);font-family:var(--sans);overflow-x:hidden;-webkit-font-smoothing:antialiased}
h1,h2,h3{font-family:var(--serif);font-weight:600}
a{color:inherit;text-decoration:none}

nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;justify-content:space-between;align-items:center;padding:20px clamp(20px,4vw,48px);background:linear-gradient(180deg,rgba(13,13,13,.9) 0%,transparent 100%)}
.logo{font-family:var(--serif);font-size:26px;font-weight:700;color:var(--cream);letter-spacing:.02em}
.logo span{color:var(--gold)}
nav ul{display:flex;gap:28px;list-style:none}
nav a{font-size:13px;font-weight:500;letter-spacing:.04em;color:var(--dim);transition:color .3s}
nav a:hover{color:var(--gold)}

.hero{position:relative;min-height:100vh;display:flex;align-items:center;justify-content:center;overflow:hidden}
.hero-bg{position:absolute;inset:0}
.hero-bg img{width:100%;height:100%;object-fit:cover}
.hero-bg::after{content:'';position:absolute;inset:0;background:linear-gradient(0deg,var(--bg) 0%,rgba(13,13,13,.3) 40%,rgba(26,21,16,.2) 100%)}
.fog{position:absolute;inset:0;pointer-events:none;overflow:hidden}
.fog span{position:absolute;width:120%;height:40%;background:radial-gradient(ellipse at center,rgba(201,169,110,.06) 0%,transparent 70%);filter:blur(40px);animation:fogDrift linear infinite}
.fog span:nth-child(1){top:10%;left:-20%;animation-duration:18s}
.fog span:nth-child(2){top:40%;left:-30%;animation-duration:14s;animation-delay:-5s;opacity:.7}
.fog span:nth-child(3){top:60%;left:-10%;animation-duration:20s;animation-delay:-10s;opacity:.5;background:radial-gradient(ellipse at center,rgba(245,240,232,.04) 0%,transparent 70%)}
@keyframes fogDrift{0%{transform:translateX(0)}100%{transform:translateX(40%)}}

.hero-content{position:relative;z-index:2;text-align:center;padding:0 20px}
.hero-tag{display:inline-block;padding:6px 18px;border:1px solid rgba(201,169,110,.3);border-radius:20px;font-size:11px;font-weight:500;letter-spacing:.15em;text-transform:uppercase;color:var(--gold);margin-bottom:24px}
.hero h1{font-size:clamp(38px,6.5vw,80px);line-height:1.05;color:var(--cream);margin-bottom:16px;font-weight:400}
.hero h1 em{font-style:italic;color:var(--gold)}
.hero p{font-size:clamp(15px,1.3vw,18px);color:var(--dim);line-height:1.7;max-width:520px;margin:0 auto 32px}
.hero-btn{display:inline-flex;align-items:center;gap:10px;padding:14px 36px;background:var(--gold);color:#0d0d0d;font-family:var(--sans);font-size:14px;font-weight:600;letter-spacing:.04em;border:none;border-radius:6px;cursor:pointer;transition:transform .3s,box-shadow .3s}
.hero-btn:hover{transform:translateY(-2px);box-shadow:0 12px 40px rgba(201,169,110,.25)}

.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(201,169,110,.1);margin:0 clamp(20px,4vw,48px);position:relative;z-index:2}
.stat-item{background:var(--bg);padding:40px 24px;text-align:center}
.stat-num{font-family:var(--serif);font-size:clamp(32px,3.5vw,52px);font-weight:700;color:var(--gold);line-height:1}
.stat-label{font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:var(--dim);margin-top:8px}

.properties{padding:100px clamp(20px,4vw,48px);position:relative;z-index:2}
.sec-head{text-align:center;margin-bottom:60px}
.sec-head h2{font-size:clamp(28px,3.5vw,48px);font-weight:400;margin-bottom:10px;color:var(--cream)}
.sec-head h2 em{color:var(--gold);font-style:italic}
.sec-head p{color:var(--dim);font-size:15px}
.prop-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:24px;max-width:1200px;margin:0 auto}
.prop-card{background:var(--card);border-radius:12px;overflow:hidden;border:1px solid rgba(201,169,110,.08);transition:transform .4s,border-color .4s}
.prop-card:hover{transform:translateY(-6px);border-color:rgba(201,169,110,.25)}
.prop-img{overflow:hidden;aspect-ratio:16/10}
.prop-img img{width:100%;height:100%;object-fit:cover;transition:transform .7s ease}
.prop-card:hover .prop-img img{transform:scale(1.08)}
.prop-body{padding:24px}
.prop-body h3{font-size:22px;font-weight:500;margin-bottom:4px;color:var(--cream)}
.prop-body .loc{font-size:13px;color:var(--dim);margin-bottom:12px}
.prop-meta{display:flex;gap:16px;font-size:13px;color:var(--dim)}
.prop-meta span{display:flex;align-items:center;gap:4px}
.prop-price{font-family:var(--serif);font-size:24px;font-weight:700;color:var(--gold);margin-top:12px}

.testimonials{padding:100px clamp(20px,4vw,48px);position:relative;z-index:2;overflow:hidden}
.testimonials .sec-head{margin-bottom:40px}
.test-track{display:flex;gap:24px;animation:slideTestimonials 20s linear infinite}
.test-card{flex:0 0 clamp(300px,30vw,420px);background:var(--card);border:1px solid rgba(201,169,110,.08);border-radius:12px;padding:32px}
.test-card p{font-family:var(--serif);font-size:18px;font-style:italic;line-height:1.6;color:var(--cream);margin-bottom:16px}
.test-author{display:flex;align-items:center;gap:12px}
.test-author img{width:40px;height:40px;border-radius:50%;object-fit:cover}
.test-author .name{font-size:14px;font-weight:600;color:var(--cream)}
.test-author .role{font-size:12px;color:var(--dim)}
@keyframes slideTestimonials{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}

.cta{padding:100px clamp(20px,4vw,48px);text-align:center;position:relative;z-index:2}
.cta h2{font-family:var(--serif);font-size:clamp(32px,4.5vw,56px);font-weight:400;color:var(--cream);margin-bottom:16px}
.cta h2 em{color:var(--gold);font-style:italic}
.cta p{color:var(--dim);font-size:16px;margin-bottom:32px;max-width:480px;margin-left:auto;margin-right:auto}
.cta-btn{display:inline-flex;padding:16px 40px;background:var(--gold);color:#0d0d0d;font-size:15px;font-weight:600;border:none;border-radius:8px;cursor:pointer;transition:transform .3s,box-shadow .3s}
.cta-btn:hover{transform:translateY(-2px);box-shadow:0 12px 40px rgba(201,169,110,.25)}

footer{padding:40px clamp(20px,4vw,48px);border-top:1px solid rgba(201,169,110,.1);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;position:relative;z-index:2}
footer p{font-size:13px;color:var(--dim)}

.reveal{opacity:0;transform:translateY(30px);transition:opacity .7s ease,transform .7s ease}.reveal.vis{opacity:1;transform:none}

@media(max-width:768px){
  nav ul{display:none}
  .stats{grid-template-columns:repeat(2,1fr)}
  .hero{min-height:85vh}
  .test-track{animation-duration:15s}
}
@media(max-width:480px){
  .stats{grid-template-columns:1fr 1fr}
  .stat-item{padding:24px 16px}
}
@media(prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;transition-duration:.15s!important}.fog{display:none}.test-track{animation:none;flex-wrap:wrap}}
</style>
</head>
<body>

<nav>
  <div class="logo">Solar<span>Fog</span></div>
  <ul><li><a href="#properties">Properties</a></li><li><a href="#testimonials">Reviews</a></li><li><a href="#cta">Contact</a></li></ul>
</nav>

<section class="hero">
  <div class="hero-bg"><img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&h=900&fit=crop" alt="Luxury Home"></div>
  <div class="fog"><span></span><span></span><span></span></div>
  <div class="hero-content reveal">
    <div class="hero-tag">Luxury Living</div>
    <h1>Discover Space You<br>Truly <em>Belong</em> In</h1>
    <p>Experience extraordinary properties curated for those who appreciate the finest in architecture, design, and serene living.</p>
    <button class="hero-btn">Book a Viewing</button>
  </div>
</section>

<div class="stats">
  <div class="stat-item reveal"><div class="stat-num"><span class="counter" data-target="320">0</span>+</div><div class="stat-label">Properties Sold</div></div>
  <div class="stat-item reveal"><div class="stat-num"><span class="counter" data-target="15">0</span></div><div class="stat-label">Years Experience</div></div>
  <div class="stat-item reveal"><div class="stat-num"><span class="counter" data-target="98">0</span>%</div><div class="stat-label">Client Satisfaction</div></div>
  <div class="stat-item reveal"><div class="stat-num">$<span class="counter" data-target="2.4">0</span>B</div><div class="stat-label">Total Sales Volume</div></div>
</div>

<section class="properties" id="properties">
  <div class="sec-head reveal"><h2>Featured <em>Properties</em></h2><p>Handpicked residences that redefine luxury living</p></div>
  <div class="prop-grid">
    <div class="prop-card reveal">
      <div class="prop-img"><img src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop" alt="Villa Serene"></div>
      <div class="prop-body"><h3>Villa Serene</h3><p class="loc">Malibu, California</p><div class="prop-meta"><span>5 Beds</span><span>4 Baths</span><span>6,200 sqft</span></div><div class="prop-price">$12,500,000</div></div>
    </div>
    <div class="prop-card reveal">
      <div class="prop-img"><img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop" alt="The Glass House"></div>
      <div class="prop-body"><h3>The Glass House</h3><p class="loc">Beverly Hills, California</p><div class="prop-meta"><span>7 Beds</span><span>6 Baths</span><span>9,400 sqft</span></div><div class="prop-price">$28,000,000</div></div>
    </div>
    <div class="prop-card reveal">
      <div class="prop-img"><img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop" alt="Ocean Crest"></div>
      <div class="prop-body"><h3>Ocean Crest</h3><p class="loc">Miami Beach, Florida</p><div class="prop-meta"><span>4 Beds</span><span>3 Baths</span><span>4,800 sqft</span></div><div class="prop-price">$8,900,000</div></div>
    </div>
  </div>
</section>

<section class="testimonials" id="testimonials">
  <div class="sec-head reveal"><h2>What Our <em>Clients</em> Say</h2></div>
  <div class="test-track">
    <div class="test-card"><p>"Solar Fog found us our dream home in under two weeks. Their understanding of luxury properties is unmatched."</p><div class="test-author"><img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face" alt=""><div><div class="name">Sarah Mitchell</div><div class="role">CEO, Luminary Group</div></div></div></div>
    <div class="test-card"><p>"The attention to detail and personalized approach made the entire experience feel effortless. Truly world-class service."</p><div class="test-author"><img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" alt=""><div><div class="name">David Chen</div><div class="role">Investor</div></div></div></div>
    <div class="test-card"><p>"They didn't just sell us a property — they helped us find a lifestyle. Every showing was curated to perfection."</p><div class="test-author"><img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face" alt=""><div><div class="name">Elena Torres</div><div class="role">Interior Designer</div></div></div></div>
    <div class="test-card"><p>"Solar Fog found us our dream home in under two weeks. Their understanding of luxury properties is unmatched."</p><div class="test-author"><img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face" alt=""><div><div class="name">Sarah Mitchell</div><div class="role">CEO, Luminary Group</div></div></div></div>
    <div class="test-card"><p>"The attention to detail and personalized approach made the entire experience feel effortless. Truly world-class service."</p><div class="test-author"><img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" alt=""><div><div class="name">David Chen</div><div class="role">Investor</div></div></div></div>
    <div class="test-card"><p>"They didn't just sell us a property — they helped us find a lifestyle. Every showing was curated to perfection."</p><div class="test-author"><img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face" alt=""><div><div class="name">Elena Torres</div><div class="role">Interior Designer</div></div></div></div>
  </div>
</section>

<section class="cta" id="cta">
  <h2 class="reveal">Find Your <em>Forever</em> Home</h2>
  <p class="reveal">Schedule a private consultation with our luxury property specialists.</p>
  <button class="cta-btn reveal">Schedule Consultation</button>
</section>

<footer><p>&copy; 2027 Solar Fog Real Estate</p><p>Luxury. Curated.</p></footer>

<script>
(function(){
  var obs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('vis');if(e.target.querySelector('.counter')){animateCounters(e.target)}obs.unobserve(e.target)}})},{threshold:.15});
  document.querySelectorAll('.reveal').forEach(function(el){obs.observe(el)});

  function animateCounters(parent){
    parent.querySelectorAll('.counter').forEach(function(c){
      var target=parseFloat(c.dataset.target),isFloat=target%1!==0,dur=2000,start=performance.now();
      function step(now){
        var p=Math.min((now-start)/dur,1);
        var ease=1-Math.pow(1-p,3);
        var val=ease*target;
        c.textContent=isFloat?val.toFixed(1):Math.round(val).toLocaleString();
        if(p<1)requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }
})();
</script>
</body>
</html>`,
  },
];
