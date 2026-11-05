export const cinematic3dTemplates = [
  {
    id: "cinematic-particle-nova",
    name: "Particle Nova — AI Platform",
    category: "Tech / SaaS",
    description: "Dark AI platform page with canvas particle constellation, mouse-reactive glow, gradient heading, glassmorphism feature cards and animated stat counters.",
    thumb: "🧠",
    getCode: () => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Nova AI — Unlock Collective Wisdom</title>
<meta name="description" content="Nova AI platform — harness the power of collective intelligence with next-generation AI infrastructure.">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#0a0a0f;--surface:rgba(255,255,255,.04);--border:rgba(255,255,255,.08);--text:#e4e4e7;--dim:#71717a;--accent:#8b5cf6;--accent2:#06b6d4;--grad:linear-gradient(135deg,#8b5cf6,#06b6d4)}
html{scroll-behavior:smooth;background:var(--bg)}
body{font-family:'Inter',system-ui,sans-serif;color:var(--text);background:var(--bg);overflow-x:hidden;-webkit-font-smoothing:antialiased}
h1,h2,h3{font-family:'Space Grotesk','Inter',sans-serif}

/* grid bg */
.grid-bg{position:fixed;inset:0;z-index:0;background-image:linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px);background-size:60px 60px;pointer-events:none}

/* hero */
.hero{position:relative;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:120px 24px 80px;z-index:1}
#particles{position:absolute;inset:0;z-index:0}
.hero-content{position:relative;z-index:2;max-width:800px}
.badge{display:inline-flex;align-items:center;gap:8px;padding:6px 16px;border-radius:999px;background:var(--surface);border:1px solid var(--border);font-size:13px;color:var(--dim);margin-bottom:32px;backdrop-filter:blur(12px)}
.badge span{width:6px;height:6px;border-radius:50%;background:var(--accent);animation:pulse-dot 2s ease infinite}
@keyframes pulse-dot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.5)}}
.hero h1{font-size:clamp(36px,7vw,76px);font-weight:700;line-height:1.05;letter-spacing:-.03em;margin-bottom:24px}
.hero h1 .grad{background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero p{font-size:clamp(16px,2vw,20px);color:var(--dim);line-height:1.6;max-width:560px;margin:0 auto 40px}
.hero-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.btn-primary{padding:14px 32px;border-radius:12px;background:var(--grad);color:#fff;font-weight:600;font-size:15px;border:none;cursor:pointer;transition:transform .2s,box-shadow .2s}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(139,92,246,.35)}
.btn-secondary{padding:14px 32px;border-radius:12px;background:var(--surface);color:var(--text);font-weight:500;font-size:15px;border:1px solid var(--border);cursor:pointer;backdrop-filter:blur(12px);transition:border-color .2s}
.btn-secondary:hover{border-color:rgba(255,255,255,.2)}

/* stats */
.stats{position:relative;z-index:1;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1px;background:var(--border);max-width:960px;margin:-40px auto 0;border-radius:16px;overflow:hidden;border:1px solid var(--border)}
.stat{background:rgba(10,10,15,.9);backdrop-filter:blur(20px);padding:40px 24px;text-align:center}
.stat-num{font-family:'Space Grotesk',sans-serif;font-size:clamp(28px,4vw,44px);font-weight:700;background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.stat-label{font-size:14px;color:var(--dim);margin-top:6px}

/* features */
.features{position:relative;z-index:1;max-width:1100px;margin:120px auto;padding:0 24px}
.section-label{font-size:13px;text-transform:uppercase;letter-spacing:.16em;color:var(--accent);margin-bottom:12px}
.section-title{font-size:clamp(28px,4vw,44px);font-weight:700;letter-spacing:-.02em;margin-bottom:60px;max-width:500px}
.feat-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px}
.feat-card{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:36px 28px;backdrop-filter:blur(16px);transition:transform .3s,border-color .3s}
.feat-card:hover{transform:translateY(-4px);border-color:rgba(139,92,246,.3)}
.feat-icon{width:48px;height:48px;border-radius:12px;background:var(--grad);display:flex;align-items:center;justify-content:center;font-size:22px;margin-bottom:20px}
.feat-card h3{font-size:18px;font-weight:600;margin-bottom:10px}
.feat-card p{font-size:14px;color:var(--dim);line-height:1.65}

/* cta */
.cta{position:relative;z-index:1;text-align:center;padding:100px 24px 120px}
.cta h2{font-size:clamp(28px,5vw,52px);font-weight:700;letter-spacing:-.02em;margin-bottom:20px}
.cta h2 .grad{background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.cta p{color:var(--dim);font-size:17px;margin-bottom:36px}

/* reveal */
.reveal{opacity:0;transform:translateY(30px);transition:opacity .7s ease,transform .7s ease}.reveal.visible{opacity:1;transform:none}

/* footer */
footer{position:relative;z-index:1;text-align:center;padding:40px 24px;border-top:1px solid var(--border);font-size:13px;color:var(--dim)}

@media(max-width:640px){.stats{grid-template-columns:1fr 1fr}.feat-grid{grid-template-columns:1fr}.hero{padding:100px 20px 60px}}
@media(prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;transition-duration:.1s!important}.reveal{opacity:1;transform:none}}
</style>
</head>
<body>
<div class="grid-bg"></div>

<section class="hero">
  <canvas id="particles"></canvas>
  <div class="hero-content reveal">
    <div class="badge"><span></span> Now in Public Beta</div>
    <h1>Unlock<br><span class="grad">Collective Wisdom</span></h1>
    <p>Next-generation AI infrastructure that connects minds, models, and data into one seamless intelligence layer.</p>
    <div class="hero-btns">
      <button class="btn-primary">Start Building Free</button>
      <button class="btn-secondary">Watch Demo</button>
    </div>
  </div>
</section>

<div class="stats reveal">
  <div class="stat"><div class="stat-num" data-target="14200">0</div><div class="stat-label">Active Teams</div></div>
  <div class="stat"><div class="stat-num" data-target="98">0</div><div class="stat-label">Accuracy %</div></div>
  <div class="stat"><div class="stat-num" data-target="2400000">0</div><div class="stat-label">Queries / Day</div></div>
  <div class="stat"><div class="stat-num" data-target="150">0</div><div class="stat-label">Countries</div></div>
</div>

<section class="features">
  <div class="reveal"><p class="section-label">Platform</p><h2 class="section-title">Everything you need to ship intelligence</h2></div>
  <div class="feat-grid">
    <div class="feat-card reveal"><div class="feat-icon">⚡</div><h3>Real-Time Inference</h3><p>Sub-50ms latency across 28 global edge nodes. Deploy models closer to your users with zero cold starts.</p></div>
    <div class="feat-card reveal"><div class="feat-icon">🔗</div><h3>Knowledge Graph</h3><p>Automatically connect disparate data sources into a unified semantic graph your models can traverse.</p></div>
    <div class="feat-card reveal"><div class="feat-icon">🛡️</div><h3>Enterprise Security</h3><p>SOC 2 Type II, end-to-end encryption, and granular RBAC. Your data never leaves your VPC.</p></div>
    <div class="feat-card reveal"><div class="feat-icon">📊</div><h3>Observability</h3><p>Full-stack tracing for every inference call. Monitor drift, latency, and cost in a single dashboard.</p></div>
    <div class="feat-card reveal"><div class="feat-icon">🤖</div><h3>Agent Framework</h3><p>Compose multi-step reasoning chains with tool use, memory, and human-in-the-loop approvals.</p></div>
    <div class="feat-card reveal"><div class="feat-icon">🧩</div><h3>200+ Integrations</h3><p>First-party connectors for every major database, warehouse, and SaaS platform you already use.</p></div>
  </div>
</section>

<section class="cta reveal">
  <h2>Ready to build the <span class="grad">future</span>?</h2>
  <p>Join thousands of teams shipping smarter products with Nova.</p>
  <button class="btn-primary">Get Started — It's Free</button>
</section>

<footer>&copy; 2026 Nova AI. All rights reserved.</footer>

<script>
(function(){
  /* particles */
  var c=document.getElementById('particles'),ctx=c.getContext('2d');
  var W,H,mx=-9999,my=-9999,particles=[];
  function resize(){W=c.width=c.offsetWidth;H=c.height=c.offsetHeight}
  window.addEventListener('resize',resize);resize();
  var N=Math.min(Math.floor(W*H/6000),200);
  for(var i=0;i<N;i++) particles.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,r:Math.random()*1.5+.5});
  c.addEventListener('mousemove',function(e){var r=c.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top});
  c.addEventListener('mouseleave',function(){mx=my=-9999});
  var raf=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  function draw(){
    ctx.clearRect(0,0,W,H);
    for(var i=0;i<particles.length;i++){
      var p=particles[i];
      p.x+=p.vx;p.y+=p.vy;
      if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;
      var dm=Math.hypot(p.x-mx,p.y-my),glow=dm<160?1-dm/160:0;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r+glow*2,0,Math.PI*2);
      ctx.fillStyle=glow>.01?'rgba(139,92,246,'+(0.4+glow*.6)+')':'rgba(255,255,255,0.25)';ctx.fill();
      for(var j=i+1;j<particles.length;j++){
        var q=particles[j],d=Math.hypot(p.x-q.x,p.y-q.y);
        if(d<120){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.strokeStyle='rgba(139,92,246,'+(0.08*(1-d/120))+')';ctx.stroke()}
      }
    }
    if(!raf) requestAnimationFrame(draw);
  }
  draw();

  /* stat counters */
  function fmtNum(n){if(n>=1e6)return (n/1e6).toFixed(1)+'M';if(n>=1e3)return (n/1e3).toFixed(n>=1e4?0:1)+'K';return n.toString()}
  var counted=false;
  function countUp(){
    if(counted)return;counted=true;
    document.querySelectorAll('.stat-num[data-target]').forEach(function(el){
      var target=parseInt(el.dataset.target,10),start=0,dur=2000,t0=performance.now();
      (function tick(now){
        var p=Math.min((now-t0)/dur,1);p=1-Math.pow(1-p,3);
        el.textContent=fmtNum(Math.floor(target*p));
        if(p<1)requestAnimationFrame(tick);else el.textContent=fmtNum(target);
      })(t0);
    });
  }

  /* reveal */
  var obs=new IntersectionObserver(function(entries){entries.forEach(function(e){
    if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);
      if(e.target.classList.contains('stats'))countUp();
    }
  })},{threshold:.15});
  document.querySelectorAll('.reveal').forEach(function(el){obs.observe(el)});
})();
<\/script>
</body>
</html>`,
  },

  {
    id: "cinematic-glass-morphic",
    name: "Glass Morphic — Creative Studio",
    category: "Agency",
    description: "Dark agency page with a 3D CSS rotating glass cube, floating gradient orbs, glassmorphism cards, portfolio grid with hover zoom, and scroll-triggered text reveals.",
    thumb: "💎",
    getCode: () => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Prism Studio — Creative Design Agency</title>
<meta name="description" content="Prism Studio — a creative design agency crafting bold digital experiences that stand apart.">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#0f0f1a;--surface:rgba(255,255,255,.05);--border:rgba(255,255,255,.08);--text:#e8e8ef;--dim:#8888a0;--accent:#a78bfa;--pink:#f472b6;--cyan:#22d3ee}
html{scroll-behavior:smooth;background:var(--bg)}
body{font-family:'Sora','Inter',system-ui,sans-serif;color:var(--text);background:linear-gradient(180deg,#0f0f1a 0%,#1a1a2e 100%);min-height:100vh;overflow-x:hidden;-webkit-font-smoothing:antialiased}

/* orbs */
.orb{position:fixed;border-radius:50%;filter:blur(100px);opacity:.35;pointer-events:none;z-index:0}
.orb-1{width:500px;height:500px;background:radial-gradient(circle,#8b5cf6,transparent 70%);top:-100px;left:-100px;animation:float-1 18s ease-in-out infinite}
.orb-2{width:400px;height:400px;background:radial-gradient(circle,#f472b6,transparent 70%);bottom:-50px;right:-80px;animation:float-2 22s ease-in-out infinite}
.orb-3{width:350px;height:350px;background:radial-gradient(circle,#22d3ee,transparent 70%);top:40%;right:10%;animation:float-3 20s ease-in-out infinite}
@keyframes float-1{0%,100%{transform:translate(0,0)}50%{transform:translate(60px,40px)}}
@keyframes float-2{0%,100%{transform:translate(0,0)}50%{transform:translate(-50px,-60px)}}
@keyframes float-3{0%,100%{transform:translate(0,0)}50%{transform:translate(-40px,50px)}}

/* nav */
nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:20px 32px;display:flex;justify-content:space-between;align-items:center;backdrop-filter:blur(16px);background:rgba(15,15,26,.6);border-bottom:1px solid var(--border)}
.logo{font-size:20px;font-weight:700;letter-spacing:-.02em}.logo span{color:var(--accent)}
.nav-links{display:flex;gap:28px;font-size:14px;font-weight:400;color:var(--dim)}
.nav-links a{color:inherit;text-decoration:none;transition:color .2s}.nav-links a:hover{color:var(--text)}

/* hero */
.hero{position:relative;z-index:1;min-height:100vh;display:flex;align-items:center;padding:0 clamp(24px,6vw,80px);gap:clamp(32px,6vw,80px)}
.hero-text{flex:1;max-width:560px}
.hero-text h1{font-size:clamp(34px,5.5vw,64px);font-weight:700;line-height:1.08;letter-spacing:-.03em;margin-bottom:20px}
.hero-text h1 em{font-style:normal;color:var(--accent)}
.hero-text p{font-size:clamp(15px,1.6vw,18px);color:var(--dim);line-height:1.65;margin-bottom:36px;max-width:440px}
.hero-text .btn{display:inline-flex;align-items:center;gap:8px;padding:14px 28px;border-radius:14px;background:linear-gradient(135deg,var(--accent),var(--pink));color:#fff;font-weight:600;font-size:15px;text-decoration:none;border:none;cursor:pointer;transition:transform .2s,box-shadow .2s}
.hero-text .btn:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(167,139,250,.3)}

/* 3d cube */
.cube-wrap{flex:1;display:flex;align-items:center;justify-content:center;perspective:800px;min-height:340px}
.cube{width:clamp(180px,22vw,260px);height:clamp(180px,22vw,260px);position:relative;transform-style:preserve-3d;animation:spin 16s linear infinite}
@keyframes spin{from{transform:rotateX(-20deg) rotateY(0deg)}to{transform:rotateX(-20deg) rotateY(360deg)}}
.cube-face{position:absolute;width:100%;height:100%;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.04);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;font-size:clamp(20px,3vw,32px);font-weight:700;color:rgba(255,255,255,.7)}
.cube-face.front{transform:translateZ(calc(clamp(180px,22vw,260px)/2))}
.cube-face.back{transform:rotateY(180deg) translateZ(calc(clamp(180px,22vw,260px)/2))}
.cube-face.right{transform:rotateY(90deg) translateZ(calc(clamp(180px,22vw,260px)/2))}
.cube-face.left{transform:rotateY(-90deg) translateZ(calc(clamp(180px,22vw,260px)/2))}
.cube-face.top{transform:rotateX(90deg) translateZ(calc(clamp(180px,22vw,260px)/2))}
.cube-face.bottom{transform:rotateX(-90deg) translateZ(calc(clamp(180px,22vw,260px)/2))}

/* work */
.work{position:relative;z-index:1;padding:120px clamp(24px,6vw,80px)}
.section-head{margin-bottom:60px}
.section-head p{font-size:13px;text-transform:uppercase;letter-spacing:.16em;color:var(--accent);margin-bottom:10px}
.section-head h2{font-size:clamp(28px,4vw,48px);font-weight:700;letter-spacing:-.02em}
.portfolio{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:16px}
.port-item{position:relative;border-radius:16px;overflow:hidden;aspect-ratio:4/3;cursor:pointer}
.port-item img{width:100%;height:100%;object-fit:cover;transition:transform .5s ease}
.port-item:hover img{transform:scale(1.08)}
.port-overlay{position:absolute;inset:0;background:linear-gradient(180deg,transparent 40%,rgba(0,0,0,.8) 100%);display:flex;flex-direction:column;justify-content:flex-end;padding:24px;opacity:0;transition:opacity .4s ease}
.port-item:hover .port-overlay{opacity:1}
.port-overlay h3{font-size:18px;font-weight:600}.port-overlay span{font-size:13px;color:var(--dim);margin-top:4px}

/* services */
.services{position:relative;z-index:1;padding:80px clamp(24px,6vw,80px) 120px}
.svc-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px}
.svc-card{background:var(--surface);border:1px solid var(--border);border-radius:20px;padding:36px 28px;backdrop-filter:blur(16px);transition:transform .3s,border-color .3s}
.svc-card:hover{transform:translateY(-4px);border-color:rgba(167,139,250,.3)}
.svc-num{font-size:48px;font-weight:700;background:linear-gradient(135deg,var(--accent),var(--cyan));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1;margin-bottom:16px}
.svc-card h3{font-size:20px;font-weight:600;margin-bottom:10px}
.svc-card p{font-size:14px;color:var(--dim);line-height:1.65}

/* cta */
.cta-section{position:relative;z-index:1;text-align:center;padding:80px 24px 120px}
.cta-box{max-width:640px;margin:0 auto;background:var(--surface);border:1px solid var(--border);border-radius:24px;padding:60px 40px;backdrop-filter:blur(20px)}
.cta-box h2{font-size:clamp(24px,3.5vw,40px);font-weight:700;margin-bottom:16px;letter-spacing:-.02em}
.cta-box p{color:var(--dim);font-size:16px;margin-bottom:32px}

/* reveal */
.reveal{opacity:0;transform:translateY(30px);transition:opacity .7s ease,transform .7s ease}.reveal.visible{opacity:1;transform:none}

footer{position:relative;z-index:1;text-align:center;padding:40px 24px;border-top:1px solid var(--border);font-size:13px;color:var(--dim)}

@media(max-width:768px){.hero{flex-direction:column;text-align:center;padding-top:120px;padding-bottom:60px}.hero-text{max-width:100%}.hero-text p{margin-left:auto;margin-right:auto}.cube-wrap{min-height:260px}.nav-links{display:none}.portfolio{grid-template-columns:1fr}}
@media(prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;transition-duration:.1s!important}.reveal{opacity:1;transform:none}}
</style>
</head>
<body>
<div class="orb orb-1"></div><div class="orb orb-2"></div><div class="orb orb-3"></div>

<nav>
  <div class="logo">Prism<span>.</span></div>
  <div class="nav-links"><a href="#work">Work</a><a href="#services">Services</a><a href="#contact">Contact</a></div>
</nav>

<section class="hero">
  <div class="hero-text reveal">
    <h1>We craft <em>bold</em> digital experiences</h1>
    <p>Prism Studio blends strategy, design and technology to create brands and products that people remember.</p>
    <a href="#work" class="btn">See Our Work &rarr;</a>
  </div>
  <div class="cube-wrap">
    <div class="cube">
      <div class="cube-face front">Design</div>
      <div class="cube-face back">Code</div>
      <div class="cube-face right">Brand</div>
      <div class="cube-face left">Motion</div>
      <div class="cube-face top">3D</div>
      <div class="cube-face bottom">UX</div>
    </div>
  </div>
</section>

<section class="work" id="work">
  <div class="section-head reveal"><p>Selected Work</p><h2>Projects that moved the needle</h2></div>
  <div class="portfolio">
    <div class="port-item reveal"><img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=450&fit=crop" alt="Abstract art" loading="lazy"><div class="port-overlay"><h3>Nebula Brand</h3><span>Branding &middot; 2026</span></div></div>
    <div class="port-item reveal"><img src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=450&fit=crop" alt="Digital interface" loading="lazy"><div class="port-overlay"><h3>Flux Dashboard</h3><span>Product Design &middot; 2026</span></div></div>
    <div class="port-item reveal"><img src="https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=600&h=450&fit=crop" alt="Modern architecture" loading="lazy"><div class="port-overlay"><h3>Vertex App</h3><span>Development &middot; 2025</span></div></div>
    <div class="port-item reveal"><img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=450&fit=crop" alt="Retro gaming" loading="lazy"><div class="port-overlay"><h3>Arcade Revival</h3><span>Campaign &middot; 2025</span></div></div>
    <div class="port-item reveal"><img src="https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?w=600&h=450&fit=crop" alt="Abstract 3D" loading="lazy"><div class="port-overlay"><h3>Morph Identity</h3><span>Branding &middot; 2025</span></div></div>
    <div class="port-item reveal"><img src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=600&h=450&fit=crop" alt="Gradient art" loading="lazy"><div class="port-overlay"><h3>Aurora UI Kit</h3><span>Design System &middot; 2024</span></div></div>
  </div>
</section>

<section class="services" id="services">
  <div class="section-head reveal"><p>Services</p><h2>What we do best</h2></div>
  <div class="svc-grid">
    <div class="svc-card reveal"><div class="svc-num">01</div><h3>Brand Strategy</h3><p>Research-backed positioning, naming, and visual identity systems that differentiate you in crowded markets.</p></div>
    <div class="svc-card reveal"><div class="svc-num">02</div><h3>Digital Design</h3><p>Pixel-perfect interfaces, design systems, and prototypes for web and mobile products your users will love.</p></div>
    <div class="svc-card reveal"><div class="svc-num">03</div><h3>Development</h3><p>Performant front-end builds in React and Next.js, backed by scalable cloud infrastructure and CI/CD pipelines.</p></div>
    <div class="svc-card reveal"><div class="svc-num">04</div><h3>Motion &amp; 3D</h3><p>Scroll-driven animations, WebGL experiences, and cinematic motion design that bring your brand to life.</p></div>
  </div>
</section>

<section class="cta-section" id="contact">
  <div class="cta-box reveal">
    <h2>Let's build something extraordinary</h2>
    <p>We're selective about the projects we take on. If you're serious about standing out, let's talk.</p>
    <a href="#" class="btn" style="display:inline-flex;text-decoration:none">Start a Project &rarr;</a>
  </div>
</section>

<footer>&copy; 2026 Prism Studio. All rights reserved.</footer>

<script>
(function(){
  var obs=new IntersectionObserver(function(entries){entries.forEach(function(e){
    if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}
  })},{threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(el){obs.observe(el)});
})();
<\/script>
</body>
</html>`,
  },

  {
    id: "cinematic-orbit-ring",
    name: "Orbit Ring — 3D Portfolio",
    category: "Portfolio",
    description: "Minimal black portfolio with a CSS 3D card ring that auto-rotates, pauses on hover, and supports mouse-drag rotation. Serif typography with elegant spacing.",
    thumb: "🪐",
    getCode: () => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Lena Aström — Portfolio</title>
<meta name="description" content="Portfolio of Lena Aström — visual designer, art director, and creative technologist.">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#000;--text:#f0ede8;--dim:#7a7770;--accent:#c4b28f;--serif:'Playfair Display','Georgia',serif;--sans:'Inter',system-ui,sans-serif;--ring-r:340px;--card-w:220px;--card-h:290px}
html{background:#000}
body{font-family:var(--sans);color:var(--text);background:var(--bg);overflow-x:hidden;min-height:100vh;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}

/* header */
header{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;justify-content:space-between;align-items:center;padding:24px 36px;mix-blend-mode:difference}
.name{font-family:var(--serif);font-size:22px;font-weight:500;letter-spacing:.01em}
.name em{font-style:italic;font-weight:400}
.h-right{font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:var(--dim);text-align:right;line-height:1.7}

/* hero */
.hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;padding:80px 24px;user-select:none}
.hero-title{font-family:var(--serif);font-size:clamp(32px,6vw,56px);font-weight:400;text-align:center;line-height:1.12;letter-spacing:-.01em;margin-bottom:8px;position:relative;z-index:10}
.hero-title em{font-style:italic;color:var(--accent)}
.hero-sub{font-size:clamp(13px,1.4vw,16px);color:var(--dim);text-align:center;letter-spacing:.04em;position:relative;z-index:10;margin-bottom:48px}

/* 3d ring */
.ring-scene{perspective:1000px;width:100%;display:flex;align-items:center;justify-content:center;min-height:420px;position:relative;cursor:grab;touch-action:none}
.ring-scene:active{cursor:grabbing}
.ring{position:relative;width:var(--card-w);height:var(--card-h);transform-style:preserve-3d;animation:orbit 30s linear infinite}
.ring.paused{animation-play-state:paused}
@keyframes orbit{from{transform:rotateY(0deg)}to{transform:rotateY(360deg)}}
.ring-card{position:absolute;width:var(--card-w);height:var(--card-h);left:0;top:0;border-radius:8px;overflow:hidden;backface-visibility:hidden;box-shadow:0 4px 30px rgba(0,0,0,.6);transition:box-shadow .4s ease}
.ring-card img{width:100%;height:100%;object-fit:cover;filter:saturate(.85) brightness(.9);transition:filter .4s ease}
.ring-card:hover img{filter:saturate(1) brightness(1)}
.ring-card::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 50%,rgba(0,0,0,.5));pointer-events:none}
.ring-card .card-label{position:absolute;bottom:14px;left:14px;right:14px;z-index:2}
.ring-card .card-label h3{font-family:var(--serif);font-size:15px;font-weight:500;margin-bottom:2px}
.ring-card .card-label span{font-size:11px;color:rgba(240,237,232,.6);letter-spacing:.06em;text-transform:uppercase}

/* scroll section */
.about{position:relative;z-index:1;max-width:680px;margin:80px auto 0;padding:80px 24px 120px;text-align:center}
.about h2{font-family:var(--serif);font-size:clamp(24px,3.5vw,36px);font-weight:400;line-height:1.35;margin-bottom:24px;letter-spacing:-.01em}
.about h2 em{font-style:italic;color:var(--accent)}
.about p{font-size:15px;color:var(--dim);line-height:1.7;margin-bottom:28px}
.link-btn{display:inline-flex;align-items:center;gap:8px;font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:var(--accent);border-bottom:1px solid rgba(196,178,143,.3);padding-bottom:4px;transition:border-color .3s}
.link-btn:hover{border-color:var(--accent)}

.reveal{opacity:0;transform:translateY(24px);transition:opacity .7s ease,transform .7s ease}.reveal.visible{opacity:1;transform:none}

footer{text-align:center;padding:32px 24px;font-size:12px;color:var(--dim);border-top:1px solid rgba(255,255,255,.06)}

@media(max-width:768px){:root{--ring-r:220px;--card-w:160px;--card-h:210px}.ring-scene{min-height:300px}header{padding:18px 20px}.hero{padding:100px 20px 60px}}
@media(max-width:480px){:root{--ring-r:160px;--card-w:130px;--card-h:172px}.ring-scene{min-height:240px}}
@media(prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;transition-duration:.1s!important}.reveal{opacity:1;transform:none}}
</style>
</head>
<body>

<header>
  <a href="#" class="name">Lena<em>Aström</em></a>
  <div class="h-right">Visual Design<br>Art Direction</div>
</header>

<section class="hero">
  <h1 class="hero-title">Selected <em>Works</em></h1>
  <p class="hero-sub">Drag to explore &middot; 2020 — 2026</p>

  <div class="ring-scene" id="scene">
    <div class="ring" id="ring"></div>
  </div>
</section>

<section class="about reveal">
  <h2>Design is how you <em>make people feel</em> before they read a single word</h2>
  <p>I'm Lena — a visual designer and art director based in Stockholm. I work with brands that care about craft, from identity systems to immersive digital experiences. Every project starts with listening and ends with something you can feel.</p>
  <a href="#" class="link-btn">Get in Touch &rarr;</a>
</section>

<footer>&copy; 2026 Lena Aström. All rights reserved.</footer>

<script>
(function(){
  var projects=[
    {title:'Meridian',cat:'Identity',img:'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=440&h=580&fit=crop'},
    {title:'Dusk &amp; Co',cat:'Branding',img:'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=440&h=580&fit=crop'},
    {title:'Atelier Noir',cat:'Editorial',img:'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=440&h=580&fit=crop'},
    {title:'Forma',cat:'Product',img:'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=440&h=580&fit=crop'},
    {title:'Bloom',cat:'Campaign',img:'https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?w=440&h=580&fit=crop'},
    {title:'Verre',cat:'Packaging',img:'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=440&h=580&fit=crop'},
    {title:'Solstice',cat:'Motion',img:'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=440&h=580&fit=crop'},
    {title:'Ciel',cat:'Web Design',img:'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=440&h=580&fit=crop'},
  ];
  var ringEl=document.getElementById('ring'),scene=document.getElementById('scene');
  var N=projects.length,radius=parseInt(getComputedStyle(document.documentElement).getPropertyValue('--ring-r'));

  function buildRing(){
    radius=parseInt(getComputedStyle(document.documentElement).getPropertyValue('--ring-r'));
    ringEl.innerHTML='';
    for(var i=0;i<N;i++){
      var angle=(360/N)*i;
      var card=document.createElement('div');card.className='ring-card';
      card.style.transform='rotateY('+angle+'deg) translateZ('+radius+'px)';
      card.innerHTML='<img src="'+projects[i].img+'" alt="'+projects[i].title+'" loading="lazy"><div class="card-label"><h3>'+projects[i].title+'</h3><span>'+projects[i].cat+'</span></div>';
      ringEl.appendChild(card);
    }
  }
  buildRing();
  window.addEventListener('resize',buildRing);

  /* hover pause */
  scene.addEventListener('mouseenter',function(){ringEl.classList.add('paused')});
  scene.addEventListener('mouseleave',function(){if(!dragging)ringEl.classList.remove('paused')});

  /* drag */
  var dragging=false,startX=0,currentRotation=0,extraRotation=0;
  function getRotation(){
    var st=getComputedStyle(ringEl).transform;
    if(st==='none')return 0;
    var m=st.match(/matrix3d\\((.+)\\)/);
    if(!m)return 0;
    var vals=m[1].split(',').map(Number);
    return Math.atan2(vals[0],vals[8])*(180/Math.PI);
  }
  scene.addEventListener('pointerdown',function(e){
    dragging=true;startX=e.clientX;
    ringEl.classList.add('paused');
    var st=getComputedStyle(ringEl);
    if(st.animationPlayState==='paused'){
      currentRotation=getRotation()+extraRotation;
    }
    scene.setPointerCapture(e.pointerId);
  });
  window.addEventListener('pointermove',function(e){
    if(!dragging)return;
    var dx=e.clientX-startX;
    extraRotation=dx*.4;
    ringEl.style.transform='rotateY('+(currentRotation+extraRotation)+'deg)';
  });
  window.addEventListener('pointerup',function(){
    if(!dragging)return;
    dragging=false;
    currentRotation+=extraRotation;extraRotation=0;
    ringEl.classList.remove('paused');
    ringEl.style.transform='';
  });

  /* reveal */
  var obs=new IntersectionObserver(function(entries){entries.forEach(function(e){
    if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}
  })},{threshold:.15});
  document.querySelectorAll('.reveal').forEach(function(el){obs.observe(el)});
})();
<\/script>
</body>
</html>`,
  },
];
