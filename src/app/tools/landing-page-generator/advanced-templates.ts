interface T {
  name: string; primary: string; secondary: string; accent: string;
  dark: string; darkAlt: string; text: string; light: string;
}
export const advancedTemplates = [
  {
    id: "saas-neon-grid",
    name: "SaaS — Neon Grid Dashboard",
    category: "Tech / SaaS",
    description: "Grid-pattern background, interactive dashboard mockup, neon glow effects, animated CTA, and production-ready feature cards.",
    thumb: "🔮",
    getCode: (t: T) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>NexusAI</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:${t.dark};color:${t.text};overflow-x:hidden}a{text-decoration:none;color:inherit}
.grid-bg{position:fixed;inset:0;background-image:linear-gradient(${t.primary}08 1px,transparent 1px),linear-gradient(90deg,${t.primary}08 1px,transparent 1px);background-size:64px 64px;pointer-events:none;z-index:0}
nav{position:relative;z-index:1;display:flex;align-items:center;justify-content:space-between;padding:1.5rem 5%;max-width:1400px;margin:0 auto}
.logo{font-size:1.5rem;font-weight:800;color:#fff}.logo span{color:${t.primary}}
nav ul{list-style:none;display:flex;gap:2rem}nav ul a{font-size:.9rem;opacity:.6;font-weight:500;transition:.2s}nav ul a:hover{opacity:1;color:${t.primary}}
.hero{position:relative;z-index:1;text-align:center;padding:6rem 5% 4rem;max-width:900px;margin:0 auto}
.badge{display:inline-flex;align-items:center;gap:.5rem;background:${t.primary}10;border:1px solid ${t.primary}30;border-radius:50px;padding:.5rem 1.25rem;font-size:.8rem;font-weight:600;color:${t.primary};margin-bottom:2rem}
@keyframes pd{0%,100%{opacity:1}50%{opacity:.4}}.badge .dot{width:8px;height:8px;border-radius:50%;background:${t.primary};animation:pd 2s infinite}
.hero h1{font-size:4rem;font-weight:900;color:#fff;line-height:1.08;margin-bottom:1.5rem}.hero h1 span{background:linear-gradient(135deg,${t.primary},${t.accent});-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero p{font-size:1.15rem;opacity:.5;max-width:600px;margin:0 auto 2.5rem;line-height:1.7}.hero-cta{display:flex;gap:1rem;justify-content:center}
@keyframes gp{0%,100%{box-shadow:0 0 20px ${t.primary}40}50%{box-shadow:0 0 40px ${t.primary}60}}
.btn-n{background:${t.primary};color:#fff;padding:1rem 2.5rem;border-radius:12px;font-weight:700;border:none;cursor:pointer;font-size:1rem;animation:gp 3s infinite;transition:.2s}.btn-n:hover{transform:translateY(-2px)}
.btn-o{background:rgba(255,255,255,.04);color:#fff;padding:1rem 2.5rem;border-radius:12px;font-weight:600;border:1px solid rgba(255,255,255,.12);cursor:pointer;font-size:1rem;transition:.2s}.btn-o:hover{border-color:${t.primary};color:${t.primary}}
.dashboard{position:relative;z-index:1;max-width:1000px;margin:0 auto 4rem;background:${t.darkAlt};border:1px solid rgba(255,255,255,.08);border-radius:16px;overflow:hidden;box-shadow:0 40px 80px rgba(0,0,0,.4)}
.dash-bar{display:flex;align-items:center;gap:.5rem;padding:.75rem 1rem;background:rgba(255,255,255,.02);border-bottom:1px solid rgba(255,255,255,.06)}
.dash-bar span{width:12px;height:12px;border-radius:50%}.dash-bar span:nth-child(1){background:#ff5f57}.dash-bar span:nth-child(2){background:#ffbd2e}.dash-bar span:nth-child(3){background:#28c840}
.dash-body{display:grid;grid-template-columns:200px 1fr;min-height:320px}
.dash-side{background:rgba(255,255,255,.02);border-right:1px solid rgba(255,255,255,.05);padding:1.5rem 1rem}
.mi{display:flex;align-items:center;gap:.5rem;padding:.6rem .75rem;border-radius:8px;font-size:.8rem;color:rgba(255,255,255,.4);margin-bottom:.25rem}.mi.active{background:${t.primary}15;color:${t.primary}}
.dash-main{padding:1.5rem;display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;align-content:start}
.dc{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:12px;padding:1.25rem}
.dc .lb{font-size:.7rem;opacity:.4;text-transform:uppercase;letter-spacing:1px;margin-bottom:.5rem}.dc .vl{font-size:1.5rem;font-weight:800;color:#fff}.dc .ch{font-size:.75rem;color:${t.primary};margin-top:.25rem}
.dash-chart{grid-column:1/-1;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:12px;padding:1.25rem;height:120px;display:flex;align-items:end;gap:6px}
.dash-chart .bar{flex:1;background:linear-gradient(to top,${t.primary}60,${t.primary}20);border-radius:4px 4px 0 0}
.stats{position:relative;z-index:1;padding:4rem 5%;max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:2rem}
.si{text-align:center;padding:2rem;background:${t.darkAlt};border:1px solid rgba(255,255,255,.04);border-radius:16px}
.si .num{font-size:2.5rem;font-weight:900;background:linear-gradient(135deg,${t.primary},${t.accent});-webkit-background-clip:text;-webkit-text-fill-color:transparent}.si .lab{font-size:.85rem;opacity:.4;margin-top:.25rem}
.features{position:relative;z-index:1;padding:6rem 5%;max-width:1200px;margin:0 auto}
.features h2{font-size:2.5rem;font-weight:800;color:#fff;text-align:center;margin-bottom:.5rem}.features>p{text-align:center;opacity:.4;margin-bottom:3rem}
.fg{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem}
.fc{background:${t.darkAlt};border:1px solid rgba(255,255,255,.06);border-radius:20px;padding:2rem;transition:.3s;position:relative;overflow:hidden}
.fc::after{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,${t.primary},transparent);opacity:0;transition:.3s}
.fc:hover{border-color:${t.primary}30;transform:translateY(-5px);box-shadow:0 20px 40px ${t.primary}10}.fc:hover::after{opacity:1}
.fc .icon{width:48px;height:48px;border-radius:12px;background:${t.primary}15;display:flex;align-items:center;justify-content:center;font-size:1.3rem;margin-bottom:1.25rem}
.fc h3{color:#fff;font-weight:700;margin-bottom:.5rem}.fc p{font-size:.85rem;opacity:.5;line-height:1.7}.cta{position:relative;z-index:1;padding:6rem 5%}
.cta-in{max-width:900px;margin:0 auto;text-align:center;background:linear-gradient(135deg,${t.primary}15,${t.secondary}10);border:1px solid ${t.primary}25;border-radius:24px;padding:4rem 3rem}
.cta-in h2{font-size:2.5rem;font-weight:800;color:#fff;margin-bottom:1rem}.cta-in p{opacity:.5;margin-bottom:2rem;max-width:500px;margin-left:auto;margin-right:auto}
.cf{display:flex;gap:.75rem;max-width:450px;margin:0 auto}
.cf input{flex:1;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:.9rem 1.2rem;color:#fff;font-size:.9rem;outline:none;font-family:inherit}.cf input:focus{border-color:${t.primary}}
.cf button{background:${t.primary};color:#fff;padding:.9rem 1.5rem;border-radius:12px;font-weight:700;border:none;cursor:pointer;white-space:nowrap}
footer{position:relative;z-index:1;padding:3rem 5%;border-top:1px solid rgba(255,255,255,.04);text-align:center;font-size:.85rem;opacity:.3}
@media(max-width:1024px){.hero h1{font-size:2.8rem}.fg,.stats{grid-template-columns:repeat(2,1fr)}.dash-body{grid-template-columns:1fr}.dash-side{display:none}}
@media(max-width:640px){.hero h1{font-size:2.2rem}nav ul{display:none}.fg,.stats{grid-template-columns:1fr}.cf{flex-direction:column}.dash-main{grid-template-columns:1fr}}
</style>
</head>
<body>
<div class="grid-bg"></div>
<nav><div class="logo">Nexus<span>AI</span></div><ul><li><a href="#">Features</a></li><li><a href="#">Pricing</a></li><li><a href="#">Docs</a></li></ul><button class="btn-n" style="padding:.6rem 1.5rem;font-size:.85rem;animation:none">Get Started</button></nav>
<section class="hero">
<div class="badge"><span class="dot"></span> Now with GPT-5 Integration</div>
<h1>Ship AI Features <span>10× Faster</span></h1>
<p>The developer platform for integrating AI into your products. Pre-built components, managed infra, enterprise-grade reliability.</p>
<div class="hero-cta"><button class="btn-n">Start Building Free</button><button class="btn-o">View Documentation</button></div>
</section>
<div class="dashboard"><div class="dash-bar"><span></span><span></span><span></span></div><div class="dash-body"><div class="dash-side"><div class="mi active">📊 Dashboard</div><div class="mi">🔑 API Keys</div><div class="mi">📝 Logs</div><div class="mi">⚙️ Settings</div></div><div class="dash-main"><div class="dc"><div class="lb">API Calls Today</div><div class="vl">847K</div><div class="ch">↑ 12.5%</div></div><div class="dc"><div class="lb">Avg Latency</div><div class="vl">42ms</div><div class="ch">↓ 8.2%</div></div><div class="dc"><div class="lb">Success Rate</div><div class="vl">99.9%</div><div class="ch">↑ 0.1%</div></div><div class="dash-chart">${[65,45,80,55,90,70,85,60,95,75,88,50,92,68,82,58,94,72,86,62,90,78,84,96].map(h=>`<div class="bar" style="height:${h}%"></div>`).join("")}</div></div></div></div>
<div class="stats"><div class="si"><div class="num">50K+</div><div class="lab">Developers</div></div><div class="si"><div class="num">2B+</div><div class="lab">API Calls/mo</div></div><div class="si"><div class="num">99.99%</div><div class="lab">Uptime</div></div><div class="si"><div class="num">&lt;50ms</div><div class="lab">Latency</div></div></div>
<section class="features"><h2>Built for Production</h2><p>Everything you need to go from prototype to production.</p><div class="fg">
<div class="fc"><div class="icon">🧠</div><h3>Multi-Model Routing</h3><p>Automatically route to the best model based on cost, latency, and accuracy.</p></div>
<div class="fc"><div class="icon">🔄</div><h3>Streaming & Caching</h3><p>Built-in response streaming and semantic caching — cut costs by 70%.</p></div>
<div class="fc"><div class="icon">🛡️</div><h3>Guardrails</h3><p>Content filtering, PII detection, and hallucination checks per endpoint.</p></div>
<div class="fc"><div class="icon">📊</div><h3>Observability</h3><p>Full request tracing, cost tracking, and quality monitoring in real-time.</p></div>
<div class="fc"><div class="icon">🔗</div><h3>SDK & APIs</h3><p>Drop-in SDKs for Python, TypeScript, Go. Migrate from OpenAI in 5 minutes.</p></div>
<div class="fc"><div class="icon">🏢</div><h3>Enterprise Ready</h3><p>SOC2, HIPAA, SSO, role-based access, and dedicated support.</p></div>
</div></section>
<section class="cta"><div class="cta-in"><h2>Start building with AI today</h2><p>10,000 free API calls. No credit card required.</p><div class="cf"><input type="email" placeholder="you@company.com"><button>Get API Key →</button></div></div></section>
<footer><p>© 2026 NexusAI Inc. All rights reserved.</p></footer>
</body></html>`,
  },
  {
    id: "agency-diagonal",
    name: "Agency — Diagonal Split",
    category: "Agency",
    description: "Bold oversized serif typography, diagonal clip-path section cuts, portfolio with hover overlays, client logos, and modern testimonial.",
    thumb: "✂️",
    getCode: (t: T) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Vertex Agency</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800;900&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:${t.dark};color:${t.text};overflow-x:hidden}a{text-decoration:none;color:inherit}
nav{display:flex;align-items:center;justify-content:space-between;padding:1.5rem 5%;max-width:1400px;margin:0 auto;position:relative;z-index:10}
.logo{font-family:'Playfair Display',serif;font-size:1.6rem;font-weight:800;color:#fff}.logo span{color:${t.primary}}
nav ul{list-style:none;display:flex;gap:2rem}nav ul a{font-size:.9rem;opacity:.6;font-weight:500;transition:.2s}nav ul a:hover{opacity:1;color:${t.primary}}
.hero{position:relative;min-height:100vh;display:flex;align-items:center;overflow:hidden}
.hero-bg{position:absolute;inset:0;z-index:0}.hero-bg img{width:100%;height:100%;object-fit:cover}
.hero-bg::after{content:'';position:absolute;inset:0;background:linear-gradient(135deg,${t.dark}ee 30%,${t.dark}88 60%,transparent 100%)}
.hero-content{position:relative;z-index:2;padding:8rem 5% 6rem;max-width:1400px;margin:0 auto;width:100%}
.hero h1{font-family:'Playfair Display',serif;font-size:6rem;font-weight:900;color:#fff;line-height:.95;max-width:700px}.hero h1 span{color:${t.primary};font-style:italic}
.hero p{font-size:1.15rem;opacity:.7;max-width:450px;line-height:1.8;margin:2rem 0}.hero-btns{display:flex;gap:1rem}
.btn-f{background:${t.primary};color:#fff;padding:1rem 2.5rem;border-radius:0;font-weight:700;border:none;cursor:pointer;font-size:.9rem;letter-spacing:2px;text-transform:uppercase;transition:.2s}.btn-f:hover{box-shadow:0 10px 30px ${t.primary}50}
.btn-g{background:0;color:#fff;padding:1rem 2.5rem;font-weight:600;border:2px solid rgba(255,255,255,.15);font-size:.9rem;letter-spacing:2px;text-transform:uppercase;cursor:pointer;transition:.2s}.btn-g:hover{border-color:${t.primary}}
.hero-num{position:absolute;right:5%;top:50%;transform:translateY(-50%);font-family:'Playfair Display',serif;font-size:15rem;font-weight:900;color:${t.primary}08;line-height:1;pointer-events:none;z-index:0}
.diagonal{position:relative;padding:8rem 5% 6rem;clip-path:polygon(0 8%,100% 0,100% 92%,0 100%);background:${t.darkAlt}}.diagonal-inner{max-width:1400px;margin:0 auto}
.diagonal h2{font-family:'Playfair Display',serif;font-size:2.8rem;font-weight:800;color:#fff;margin-bottom:3rem}
.srv-row{display:grid;grid-template-columns:repeat(3,1fr);gap:2.5rem}.srv-item{position:relative;padding-left:1.5rem;border-left:3px solid ${t.primary}30}
.srv-item:hover{border-left-color:${t.primary}}.srv-item .num{font-family:'Playfair Display',serif;font-size:3rem;font-weight:800;color:${t.primary}15;margin-bottom:.5rem}
.srv-item h3{color:#fff;font-size:1.15rem;font-weight:700;margin-bottom:.5rem}.srv-item p{font-size:.9rem;opacity:.5;line-height:1.7}
.portfolio{padding:6rem 5%;max-width:1400px;margin:0 auto}.portfolio h2{font-family:'Playfair Display',serif;font-size:2.8rem;font-weight:800;color:#fff;margin-bottom:3rem}
.port-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem}.port{aspect-ratio:4/3;position:relative;overflow:hidden;cursor:pointer}
.port img{width:100%;height:100%;object-fit:cover;transition:transform .5s}.port:hover img{transform:scale(1.1)}
.port .overlay{position:absolute;inset:0;background:linear-gradient(to top,${t.dark}ee,transparent 60%);display:flex;flex-direction:column;justify-content:flex-end;padding:1.5rem;opacity:0;transition:.3s}
.port:hover .overlay{opacity:1}.port .overlay h3{color:#fff;font-size:1.1rem;font-weight:700}.port .overlay span{color:${t.primary};font-size:.85rem;margin-top:.25rem}
.clients{padding:4rem 5%;max-width:1000px;margin:0 auto;text-align:center}.clients p{font-size:.85rem;opacity:.3;text-transform:uppercase;letter-spacing:3px;margin-bottom:2rem}
.client-row{display:flex;justify-content:center;gap:3rem;flex-wrap:wrap;opacity:.25}.client-row span{font-size:1.3rem;font-weight:800;color:#fff;letter-spacing:2px}
.test{padding:6rem 5%;max-width:800px;margin:0 auto;text-align:center}
.test blockquote{font-family:'Playfair Display',serif;font-size:1.8rem;font-weight:600;color:#fff;font-style:italic;line-height:1.5;margin-bottom:2rem}
.test .author{font-size:.9rem;opacity:.5}.test .author strong{color:#fff;opacity:1}
footer{padding:3rem 5%;border-top:1px solid rgba(255,255,255,.05);text-align:center;font-size:.85rem;opacity:.3}
@media(max-width:1024px){.hero h1{font-size:3.5rem}.srv-row,.port-grid{grid-template-columns:1fr}.hero-num{display:none}.diagonal{clip-path:none;padding:4rem 5%}}
@media(max-width:640px){.hero h1{font-size:2.5rem}nav ul{display:none}.test blockquote{font-size:1.3rem}}
</style>
</head>
<body>
<nav><div class="logo">Vertex<span>.</span></div><ul><li><a href="#">Work</a></li><li><a href="#">About</a></li><li><a href="#">Contact</a></li></ul><a href="#" class="btn-f" style="padding:.6rem 1.5rem;font-size:.75rem">Let's Talk</a></nav>
<section class="hero"><div class="hero-bg"><img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&h=900&fit=crop" alt="Creative team at work"></div><div class="hero-content"><h1>We Design Brands That <span>Inspire</span></h1><p>A creative agency building digital products, brands, and experiences for forward-thinking companies.</p><div class="hero-btns"><button class="btn-f">Our Portfolio</button><button class="btn-g">About Us</button></div></div></section>
<section class="diagonal"><div class="diagonal-inner"><h2>Our Expertise</h2><div class="srv-row">
<div class="srv-item"><div class="num">01</div><h3>Brand Identity</h3><p>From naming to visual systems — we build brands that connect with your audience on every level.</p></div>
<div class="srv-item"><div class="num">02</div><h3>Digital Product</h3><p>UI/UX design and full-stack development for web apps, mobile apps, and SaaS platforms.</p></div>
<div class="srv-item"><div class="num">03</div><h3>Growth Marketing</h3><p>Data-driven campaigns across SEO, paid media, and content that deliver measurable ROI.</p></div>
</div></div></section>
<section class="portfolio"><h2>Selected Work</h2><div class="port-grid">
<div class="port"><img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=450&fit=crop" alt="Project"><div class="overlay"><h3>SaaS Dashboard Redesign</h3><span>UI/UX · Development</span></div></div>
<div class="port"><img src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=450&fit=crop" alt="Project"><div class="overlay"><h3>Fashion Brand Launch</h3><span>Branding · E-Commerce</span></div></div>
<div class="port"><img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=450&fit=crop" alt="Project"><div class="overlay"><h3>FinTech Mobile App</h3><span>Product Design · Strategy</span></div></div>
</div></section>
<section class="clients"><p>Trusted by industry leaders</p><div class="client-row"><span>GOOGLE</span><span>STRIPE</span><span>SHOPIFY</span><span>NOTION</span><span>FIGMA</span></div></section>
<section class="test"><blockquote>"Vertex transformed our brand and tripled our conversion rate. The best creative partner we've worked with."</blockquote><div class="author"><strong>Sarah Kim</strong> — CEO, TechNova</div></section>
<footer><p>© 2026 Vertex Agency. All rights reserved.</p></footer>
</body></html>`,
  },
  {
    id: "restaurant-immersive",
    name: "Restaurant — Immersive Culinary",
    category: "Restaurant",
    description: "Full-bleed hero with dark overlay, elegant serif typography, horizontal scrolling dishes, chef spotlight with circular portrait, and ornate reservation form.",
    thumb: "🍷",
    getCode: (t: T) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Aurum Dining</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:#080808;color:#bbb;overflow-x:hidden}a{text-decoration:none;color:inherit}
nav{position:absolute;top:0;left:0;right:0;z-index:10;display:flex;align-items:center;justify-content:space-between;padding:2rem 5%}
.logo{font-family:'Cormorant Garamond',serif;font-size:2rem;font-weight:700;color:#fff;letter-spacing:4px}
nav ul{list-style:none;display:flex;gap:2rem}nav ul a{font-size:.8rem;opacity:.6;text-transform:uppercase;letter-spacing:2px;transition:.2s}nav ul a:hover{opacity:1;color:${t.primary}}
.hero{height:100vh;background:url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&h=900&fit=crop) center/cover;position:relative;display:flex;align-items:center;justify-content:center;text-align:center}
.hero::before{content:'';position:absolute;inset:0;background:rgba(0,0,0,.65)}.hero-content{position:relative;z-index:1;max-width:700px;padding:0 2rem}
.hero-content .line{width:60px;height:2px;background:${t.primary};margin:0 auto 2rem}
.hero-content h1{font-family:'Cormorant Garamond',serif;font-size:5rem;font-weight:700;color:#fff;line-height:1.05;margin-bottom:1rem}
.hero-content h1 span{color:${t.primary};font-style:italic}.hero-content p{font-size:1rem;opacity:.6;line-height:1.8;margin-bottom:2.5rem}
.btn-gold{background:${t.primary};color:#000;padding:1rem 2.5rem;border:none;cursor:pointer;font-size:.8rem;font-weight:600;text-transform:uppercase;letter-spacing:3px;transition:.2s}.btn-gold:hover{box-shadow:0 8px 30px ${t.primary}50}
.dishes{padding:5rem 0}.dishes h2{font-family:'Cormorant Garamond',serif;font-size:2.5rem;color:#fff;text-align:center;margin-bottom:2.5rem}
.dish-scroll{display:flex;gap:1.5rem;overflow-x:auto;padding:0 5% 2rem;scrollbar-width:thin;scrollbar-color:${t.primary}30 transparent}
.dish-scroll::-webkit-scrollbar{height:6px}.dish-scroll::-webkit-scrollbar-thumb{background:${t.primary}40;border-radius:3px}
.dish-card{min-width:300px;background:#111;border:1px solid rgba(255,255,255,.06);overflow:hidden;flex-shrink:0;transition:.3s}
.dish-card:hover{border-color:${t.primary}40;transform:translateY(-5px)}.dish-card img{width:100%;height:220px;object-fit:cover}.dish-card .info{padding:1.5rem}
.dish-card h3{font-family:'Cormorant Garamond',serif;color:#fff;font-size:1.3rem;margin-bottom:.25rem}
.dish-card .desc{font-size:.8rem;opacity:.5;line-height:1.6;margin-bottom:.75rem}.dish-card .price{color:${t.primary};font-weight:700;font-size:1.1rem}
.chef{padding:6rem 5%;max-width:900px;margin:0 auto;display:grid;grid-template-columns:auto 1fr;gap:3rem;align-items:center}
.chef-img{width:250px;height:250px;border-radius:50%;overflow:hidden;border:3px solid ${t.primary}30;position:relative}.chef-img img{width:100%;height:100%;object-fit:cover}
.chef-text span{color:${t.primary};font-size:.8rem;text-transform:uppercase;letter-spacing:3px;font-weight:600}
.chef-text h2{font-family:'Cormorant Garamond',serif;font-size:2.2rem;color:#fff;margin:.5rem 0}.chef-text p{font-size:.9rem;opacity:.5;line-height:1.8}
.reserve{padding:6rem 5%;max-width:700px;margin:0 auto;text-align:center}.reserve h2{font-family:'Cormorant Garamond',serif;font-size:2.5rem;color:#fff;margin-bottom:.5rem}
.reserve>p{opacity:.4;margin-bottom:2.5rem}.res-form{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
.res-form input,.res-form select{background:#111;border:1px solid rgba(255,255,255,.08);padding:1rem;color:#fff;font-size:.9rem;outline:none;font-family:inherit}.res-form input:focus,.res-form select:focus{border-color:${t.primary}}
.res-form button{grid-column:1/-1;background:${t.primary};color:#000;padding:1rem;font-weight:600;text-transform:uppercase;letter-spacing:3px;border:none;cursor:pointer;font-size:.85rem}
footer{padding:3rem 5%;border-top:1px solid rgba(255,255,255,.05);text-align:center;font-size:.8rem;opacity:.3}
@media(max-width:768px){.hero-content h1{font-size:3rem}.chef{grid-template-columns:1fr;text-align:center}.chef-img{margin:0 auto}.res-form{grid-template-columns:1fr}nav ul{display:none}}
</style>
</head>
<body>
<nav><div class="logo">AURUM</div><ul><li><a href="#">Menu</a></li><li><a href="#">Story</a></li><li><a href="#">Reserve</a></li></ul><button class="btn-gold" style="padding:.6rem 1.5rem;font-size:.7rem">Book Table</button></nav>
<section class="hero"><div class="hero-content"><div class="line"></div><h1>An <span>Artisan</span> Dining Experience</h1><p>Where culinary mastery meets world-class ingredients. Two Michelin stars. One unforgettable evening.</p><button class="btn-gold">Reserve Your Table</button></div></section>
<section class="dishes"><h2>Signature Creations</h2><div class="dish-scroll">
<div class="dish-card"><img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=280&fit=crop" alt="Dish"><div class="info"><h3>Seared Tuna Tartare</h3><div class="desc">Avocado mousse, yuzu gel, crispy shallots</div><div class="price">$42</div></div></div>
<div class="dish-card"><img src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=280&fit=crop" alt="Dish"><div class="info"><h3>Wagyu A5 Striploin</h3><div class="desc">Black truffle jus, potato fondant, seasonal greens</div><div class="price">$88</div></div></div>
<div class="dish-card"><img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=280&fit=crop" alt="Dish"><div class="info"><h3>Lobster Thermidor</h3><div class="desc">Classic brandy cream, gruyère gratin</div><div class="price">$72</div></div></div>
<div class="dish-card"><img src="https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=280&fit=crop" alt="Dish"><div class="info"><h3>Passion Fruit Soufflé</h3><div class="desc">Vanilla bean cream, mango coulis, gold leaf</div><div class="price">$28</div></div></div>
</div></section>
<section class="chef"><div class="chef-img"><img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=400&fit=crop" alt="Chef"></div><div class="chef-text"><span>Meet Our Chef</span><h2>Chef Marcus Laurent</h2><p>With 20 years of culinary excellence across three continents, Chef Marcus brings an innovative fusion of French technique and Japanese precision to every dish at Aurum.</p></div></section>
<section class="reserve"><h2>Make a Reservation</h2><p>Join us for an evening you'll never forget.</p><form class="res-form"><input type="text" placeholder="Full Name"><input type="email" placeholder="Email"><input type="date"><select><option>2 Guests</option><option>4 Guests</option><option>6 Guests</option><option>Private Event</option></select><button type="submit">Reserve Now</button></form></section>
<footer><p>© 2026 AURUM Dining. All rights reserved.</p></footer>
</body></html>`,
  },
  {
    id: "ecom-single-product",
    name: "E-Commerce — Product Spotlight",
    category: "E-Commerce",
    description: "Hero focused on one product with color selectors, floating spec cards, size picker, customer reviews with stars, and a sticky add-to-cart section.",
    thumb: "👟",
    getCode: (t: T) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Stride Shoes</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:${t.dark};color:${t.text};overflow-x:hidden}a{text-decoration:none;color:inherit}
nav{display:flex;align-items:center;justify-content:space-between;padding:1.5rem 5%;max-width:1400px;margin:0 auto}
.logo{font-size:1.5rem;font-weight:900;color:#fff;letter-spacing:3px;text-transform:uppercase}.logo span{color:${t.primary}}
nav ul{list-style:none;display:flex;gap:2rem}nav ul a{font-size:.9rem;opacity:.6;font-weight:500;transition:.2s}nav ul a:hover{opacity:1;color:${t.primary}}
.product{padding:6rem 5%;max-width:1400px;margin:0 auto;display:grid;grid-template-columns:1.2fr 1fr;gap:4rem;align-items:center;min-height:80vh}
.product-img{position:relative;background:linear-gradient(135deg,${t.darkAlt},${t.primary}08);border-radius:24px;aspect-ratio:1;display:flex;align-items:center;justify-content:center;overflow:hidden}
.product-img img{width:85%;max-width:500px;transform:rotate(-15deg);filter:drop-shadow(0 30px 50px rgba(0,0,0,.5));transition:transform .5s}
.product-img:hover img{transform:rotate(-10deg) scale(1.05)}
.float-spec{position:absolute;background:${t.darkAlt}ee;backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:.75rem 1.25rem;font-size:.75rem;color:#fff;font-weight:600}
.fs1{top:15%;right:8%}.fs2{bottom:20%;left:5%}.fs3{bottom:10%;right:15%}.float-spec small{display:block;font-weight:400;opacity:.5;font-size:.65rem;margin-top:2px}
.product-info .tag{display:inline-block;background:${t.primary}15;color:${t.primary};padding:.3rem 1rem;border-radius:50px;font-size:.75rem;font-weight:600;margin-bottom:1rem}
.product-info h1{font-size:3rem;font-weight:900;color:#fff;margin-bottom:.5rem}.product-info .price{font-size:2rem;font-weight:800;color:${t.primary};margin-bottom:1.5rem}
.product-info .price span{font-size:1rem;text-decoration:line-through;opacity:.4;color:${t.text};margin-left:.75rem}.product-info>p{opacity:.5;line-height:1.7;margin-bottom:2rem}
.colors{display:flex;gap:.75rem;margin-bottom:1.5rem}.colors label{display:flex;flex-direction:column;align-items:center;gap:.25rem;cursor:pointer;font-size:.65rem;opacity:.5}
.colors input{display:none}.colors .swatch{width:32px;height:32px;border-radius:50%;border:3px solid transparent;transition:.2s}
.colors input:checked+.swatch{border-color:${t.primary};box-shadow:0 0 10px ${t.primary}40}.sizes{display:flex;gap:.5rem;margin-bottom:2rem}
.sizes span{width:44px;height:44px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,.12);border-radius:10px;font-size:.8rem;font-weight:600;color:#fff;cursor:pointer;transition:.2s}
.sizes span:hover,.sizes span.active{border-color:${t.primary};background:${t.primary}15}.add-cart{display:flex;gap:1rem}
.btn-cart{background:${t.primary};color:#fff;padding:1rem 3rem;border-radius:14px;font-weight:700;border:none;cursor:pointer;font-size:1rem;flex:1;transition:.2s}.btn-cart:hover{box-shadow:0 10px 30px ${t.primary}50}
.btn-wish{width:52px;height:52px;border-radius:14px;border:1px solid rgba(255,255,255,.12);background:0;color:#fff;font-size:1.2rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:.2s}.btn-wish:hover{border-color:${t.primary};color:${t.primary}}
.feats{padding:4rem 5%;max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem}
.feat-i{text-align:center;padding:2rem;background:${t.darkAlt};border:1px solid rgba(255,255,255,.04);border-radius:16px}
.feat-i .emoji{font-size:1.5rem;margin-bottom:.75rem}.feat-i h4{color:#fff;font-size:.9rem;margin-bottom:.25rem}.feat-i p{font-size:.75rem;opacity:.5}
.reviews{padding:6rem 5%;max-width:1200px;margin:0 auto}.reviews h2{font-size:2rem;font-weight:800;color:#fff;margin-bottom:2rem}
.review-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem}.rev{background:${t.darkAlt};border:1px solid rgba(255,255,255,.06);border-radius:16px;padding:1.5rem}
.rev .stars{color:${t.primary};font-size:.9rem;margin-bottom:.75rem}.rev p{font-size:.85rem;opacity:.6;line-height:1.6;margin-bottom:1rem}
.rev .author{font-size:.8rem;font-weight:600;color:#fff}footer{padding:3rem 5%;border-top:1px solid rgba(255,255,255,.04);text-align:center;font-size:.85rem;opacity:.3}
@media(max-width:1024px){.product{grid-template-columns:1fr;text-align:center}.product-info{order:-1}.add-cart{justify-content:center}.colors,.sizes{justify-content:center}.feats,.review-grid{grid-template-columns:repeat(2,1fr)}.float-spec{display:none}}
@media(max-width:640px){nav ul{display:none}.product-info h1{font-size:2.2rem}.feats,.review-grid{grid-template-columns:1fr}}
</style>
</head>
<body>
<nav><div class="logo">Stride<span>.</span></div><ul><li><a href="#">Men</a></li><li><a href="#">Women</a></li><li><a href="#">New</a></li></ul><div style="display:flex;gap:1rem;font-size:1.2rem;opacity:.6"><a href="#">🔍</a><a href="#">🛒</a></div></nav>
<section class="product">
<div class="product-img"><img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop" alt="Shoe"><div class="float-spec fs1">Boost™ Foam<small>40% more energy return</small></div><div class="float-spec fs2">Primeknit<small>Adaptive stretch</small></div><div class="float-spec fs3">Continental™<small>Grip outsole</small></div></div>
<div class="product-info">
<div class="tag">New Release</div>
<h1>Ultra Boost X</h1>
<div class="price">$189 <span>$249</span></div>
<p>Engineered with responsive Boost™ cushioning and Primeknit upper for unmatched comfort and style — from the track to the street.</p>
<div class="colors"><label><input type="radio" name="color" checked><span class="swatch" style="background:#222"></span>Black</label><label><input type="radio" name="color"><span class="swatch" style="background:#fff"></span>White</label><label><input type="radio" name="color"><span class="swatch" style="background:${t.primary}"></span>Core</label></div>
<div class="sizes"><span>7</span><span>8</span><span class="active">9</span><span>10</span><span>11</span><span>12</span></div>
<div class="add-cart"><button class="btn-cart">Add to Cart</button><button class="btn-wish">♡</button></div>
</div></section>
<div class="feats"><div class="feat-i"><div class="emoji">🚚</div><h4>Free Shipping</h4><p>On orders $100+</p></div><div class="feat-i"><div class="emoji">↩️</div><h4>Easy Returns</h4><p>30-day guarantee</p></div><div class="feat-i"><div class="emoji">🏅</div><h4>Authentic</h4><p>100% genuine</p></div><div class="feat-i"><div class="emoji">💬</div><h4>Support</h4><p>24/7 live chat</p></div></div>
<section class="reviews"><h2>Customer Reviews</h2><div class="review-grid">
<div class="rev"><div class="stars">★★★★★</div><p>"Most comfortable sneakers I've ever owned. The Boost foam is incredible for all-day wear."</p><div class="author">James T. — Verified Buyer</div></div>
<div class="rev"><div class="stars">★★★★★</div><p>"Great fit, stylish design. I've gotten so many compliments. Will definitely buy more colors."</p><div class="author">Priya K. — Verified Buyer</div></div>
<div class="rev"><div class="stars">★★★★☆</div><p>"Excellent quality and fast shipping. Runs slightly narrow, go half size up if you have wide feet."</p><div class="author">Marcus L. — Verified Buyer</div></div>
</div></section>
<footer><p>© 2026 Stride. All rights reserved.</p></footer>
</body></html>`,
  },
  {
    id: "portfolio-bento",
    name: "Portfolio — Bento Grid",
    category: "Portfolio",
    description: "Modern bento box grid layout with mixed-size cards for about, projects, skills, and contact — all in one compact visual system.",
    thumb: "🧩",
    getCode: (t: T) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Sarah Park — Designer</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:${t.dark};color:${t.text};min-height:100vh;display:flex;flex-direction:column}a{text-decoration:none;color:inherit}
.wrap{max-width:1100px;margin:0 auto;padding:3rem 2rem;flex:1}h1{font-size:1.5rem;font-weight:800;color:#fff;margin-bottom:.25rem}
.sub{font-size:.9rem;opacity:.5;margin-bottom:2rem}.bento{display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:180px;gap:1rem}
.card{background:${t.darkAlt};border:1px solid rgba(255,255,255,.06);border-radius:20px;padding:1.5rem;overflow:hidden;transition:all .3s;position:relative}
.card:hover{border-color:${t.primary}30;transform:translateY(-3px)}.card.wide{grid-column:span 2}.card.tall{grid-row:span 2}.card.big{grid-column:span 2;grid-row:span 2}
.card.about{display:flex;gap:1.25rem;align-items:center}.card.about img{width:80px;height:80px;border-radius:50%;object-fit:cover;border:3px solid ${t.primary}30;flex-shrink:0}
.card.about h2{font-size:1.1rem;font-weight:700;color:#fff;margin-bottom:.25rem}.card.about p{font-size:.8rem;opacity:.5;line-height:1.6}
.card.about .status{display:inline-flex;align-items:center;gap:.4rem;background:${t.primary}15;color:${t.primary};padding:.2rem .6rem;border-radius:50px;font-size:.65rem;font-weight:600;margin-top:.5rem}
.card.about .status span{width:6px;height:6px;border-radius:50%;background:${t.primary}}.card.project{padding:0;overflow:hidden}
.card.project img{width:100%;height:100%;object-fit:cover;transition:transform .5s}.card.project:hover img{transform:scale(1.08)}
.card.project .proj-info{position:absolute;bottom:0;left:0;right:0;padding:1.25rem;background:linear-gradient(to top,${t.dark}ee,transparent)}
.card.project .proj-info h3{color:#fff;font-size:.95rem;font-weight:700}.card.project .proj-info span{font-size:.75rem;color:${t.primary}}
.card.skills h3{font-size:.85rem;font-weight:700;color:#fff;margin-bottom:1rem}
.skill-bar{margin-bottom:.75rem}.skill-bar .label{display:flex;justify-content:space-between;font-size:.7rem;margin-bottom:.35rem}.skill-bar .label span:first-child{color:#fff;font-weight:600}.skill-bar .label span:last-child{opacity:.4}
.skill-bar .track{height:6px;background:rgba(255,255,255,.06);border-radius:3px;overflow:hidden}.skill-bar .fill{height:100%;background:linear-gradient(90deg,${t.primary},${t.accent});border-radius:3px}
.card.stats{display:grid;grid-template-columns:1fr 1fr;gap:1rem;align-content:center}
.stat{text-align:center}.stat .n{font-size:1.8rem;font-weight:800;color:#fff}.stat .l{font-size:.7rem;opacity:.4}
.card.social{display:flex;flex-direction:column;justify-content:center;align-items:center;gap:1rem;background:linear-gradient(135deg,${t.primary}15,${t.secondary}10);border-color:${t.primary}20}
.card.social h3{color:#fff;font-size:.9rem;font-weight:700}.social-links{display:flex;gap:.75rem}
.social-links a{width:40px;height:40px;border-radius:10px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;transition:.2s;font-size:1rem}
.social-links a:hover{border-color:${t.primary};background:${t.primary}15}.card.contact h3{font-size:.85rem;font-weight:700;color:#fff;margin-bottom:1rem}
.card.contact input,.card.contact textarea{width:100%;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:8px;padding:.6rem .8rem;color:#fff;font-size:.8rem;outline:none;font-family:inherit;margin-bottom:.5rem}
.card.contact input:focus,.card.contact textarea:focus{border-color:${t.primary}}.card.contact textarea{resize:none;height:50px}
.card.contact button{width:100%;background:${t.primary};color:#fff;border:none;padding:.6rem;border-radius:8px;font-weight:600;font-size:.8rem;cursor:pointer}
footer{padding:2rem;text-align:center;font-size:.8rem;opacity:.3}
@media(max-width:768px){.bento{grid-template-columns:1fr;grid-auto-rows:auto}.card.wide,.card.tall,.card.big{grid-column:span 1;grid-row:span 1}.card.project{aspect-ratio:16/10}}
</style>
</head>
<body>
<div class="wrap">
<h1>Sarah Park</h1>
<p class="sub">Product Designer · San Francisco</p>
<div class="bento">
<div class="card about wide"><img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop" alt="Sarah"><div><h2>Hey, I'm Sarah 👋</h2><p>Product designer crafting intuitive digital experiences for startups and scale-ups.</p><div class="status"><span></span> Available for freelance</div></div></div>
<div class="card stats"><div class="stat"><div class="n">8+</div><div class="l">Years Exp.</div></div><div class="stat"><div class="n">50+</div><div class="l">Projects</div></div><div class="stat"><div class="n">12</div><div class="l">Awards</div></div><div class="stat"><div class="n">4.9</div><div class="l">Avg Rating</div></div></div>
<div class="card social"><h3>Let's Connect</h3><div class="social-links"><a href="#">🐦</a><a href="#">💼</a><a href="#">📸</a><a href="#">🔗</a></div></div>
<div class="card project tall"><img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=600&fit=crop" alt="Project"><div class="proj-info"><h3>FinTech Dashboard</h3><span>UI/UX Design</span></div></div>
<div class="card skills tall"><h3>Skills</h3><div class="skill-bar"><div class="label"><span>Figma</span><span>95%</span></div><div class="track"><div class="fill" style="width:95%"></div></div></div><div class="skill-bar"><div class="label"><span>React</span><span>80%</span></div><div class="track"><div class="fill" style="width:80%"></div></div></div><div class="skill-bar"><div class="label"><span>Design Systems</span><span>90%</span></div><div class="track"><div class="fill" style="width:90%"></div></div></div><div class="skill-bar"><div class="label"><span>Prototyping</span><span>88%</span></div><div class="track"><div class="fill" style="width:88%"></div></div></div><div class="skill-bar"><div class="label"><span>User Research</span><span>85%</span></div><div class="track"><div class="fill" style="width:85%"></div></div></div></div>
<div class="card project wide"><img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=300&fit=crop" alt="Project"><div class="proj-info"><h3>E-Commerce Redesign</h3><span>Product Design</span></div></div>
<div class="card contact tall"><h3>Send a Message</h3><input type="text" placeholder="Name"><input type="email" placeholder="Email"><textarea placeholder="Your message..."></textarea><button>Send →</button></div>
<div class="card project"><img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop" alt="Project"><div class="proj-info"><h3>Startup Branding</h3><span>Brand Identity</span></div></div>
</div>
</div>
<footer><p>© 2026 Sarah Park. Crafted with care.</p></footer>
</body></html>`,
  },
  {
    id: "health-light",
    name: "Healthcare — Clean & Bright",
    category: "Healthcare",
    description: "Light white/mint theme with soft shadows, rounded service cards, doctor profiles, step-by-step appointment flow, and trust badges.",
    thumb: "🌿",
    getCode: (t: T) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Wellspring Clinic</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:#fafbfc;color:#444;overflow-x:hidden}a{text-decoration:none;color:inherit}
nav{display:flex;align-items:center;justify-content:space-between;padding:1.25rem 5%;max-width:1300px;margin:0 auto}
.logo{font-size:1.4rem;font-weight:800;color:#1a1a2e}.logo span{color:${t.primary}}
nav ul{list-style:none;display:flex;gap:2rem}nav ul a{font-size:.9rem;color:#666;font-weight:500;transition:.2s}nav ul a:hover{color:${t.primary}}
.btn-p{background:${t.primary};color:#fff;padding:.65rem 1.5rem;border-radius:50px;font-weight:600;font-size:.85rem;border:none;cursor:pointer;transition:.2s;box-shadow:0 4px 15px ${t.primary}30}.btn-p:hover{box-shadow:0 6px 25px ${t.primary}50;transform:translateY(-1px)}
.hero{padding:5rem 5% 4rem;max-width:1300px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center}
.hero h1{font-size:3.2rem;font-weight:800;color:#1a1a2e;line-height:1.15;margin-bottom:1rem}.hero h1 span{color:${t.primary}}
.hero p{color:#666;font-size:1.05rem;line-height:1.7;margin-bottom:2rem;max-width:480px}.hero-cta{display:flex;gap:1rem}
.btn-sec{background:#fff;color:#1a1a2e;padding:.85rem 2rem;border-radius:50px;font-weight:600;border:2px solid #e5e7eb;cursor:pointer;font-size:.95rem;transition:.2s}.btn-sec:hover{border-color:${t.primary};color:${t.primary}}
.hero-img{position:relative}.hero-img img{width:100%;border-radius:24px;box-shadow:0 20px 50px rgba(0,0,0,.08)}
.hero-badge{position:absolute;bottom:-15px;left:-15px;background:#fff;border-radius:16px;padding:1rem 1.5rem;box-shadow:0 10px 30px rgba(0,0,0,.06);display:flex;align-items:center;gap:.75rem}
.hero-badge .dot{width:12px;height:12px;border-radius:50%;background:${t.primary}}.hero-badge span{font-size:.85rem;font-weight:600;color:#1a1a2e}
.services{padding:5rem 5%;max-width:1300px;margin:0 auto}
.sec-head{text-align:center;margin-bottom:3rem}.sec-head span{color:${t.primary};font-size:.8rem;text-transform:uppercase;letter-spacing:2px;font-weight:600}.sec-head h2{font-size:2.2rem;font-weight:800;color:#1a1a2e;margin-top:.5rem}
.srv-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem}
.srv-card{background:#fff;border-radius:20px;padding:2rem;box-shadow:0 4px 20px rgba(0,0,0,.04);transition:.3s;border:1px solid #f0f0f0}
.srv-card:hover{transform:translateY(-5px);box-shadow:0 15px 40px rgba(0,0,0,.08);border-color:${t.primary}30}
.srv-card .icon{width:52px;height:52px;border-radius:14px;background:${t.light};display:flex;align-items:center;justify-content:center;font-size:1.5rem;margin-bottom:1.25rem}
.srv-card h3{font-size:1.05rem;font-weight:700;color:#1a1a2e;margin-bottom:.5rem}.srv-card p{font-size:.85rem;color:#888;line-height:1.7}
.doctors{padding:5rem 5%;background:${t.light}40}.doc-grid{max-width:1300px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem}
.doc{background:#fff;border-radius:20px;padding:1.5rem;text-align:center;box-shadow:0 4px 15px rgba(0,0,0,.03);transition:.3s;border:1px solid #f0f0f0}
.doc:hover{transform:translateY(-5px);box-shadow:0 10px 30px rgba(0,0,0,.06)}
.doc img{width:90px;height:90px;border-radius:50%;object-fit:cover;margin-bottom:1rem;border:3px solid ${t.light}}
.doc h4{font-size:.95rem;color:#1a1a2e;font-weight:700}.doc .specialty{font-size:.8rem;color:${t.primary};font-weight:500;margin-top:.25rem}.doc .rating{font-size:.75rem;color:#bbb;margin-top:.5rem}
.steps{padding:5rem 5%;max-width:1000px;margin:0 auto}.steps-row{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem;position:relative}
.steps-row::before{content:'';position:absolute;top:35px;left:15%;right:15%;height:2px;background:linear-gradient(90deg,${t.primary}30,${t.primary},${t.primary}30);z-index:0}
.step{text-align:center;position:relative;z-index:1}
.step .num{width:70px;height:70px;border-radius:50%;background:${t.primary};color:#fff;font-size:1.5rem;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 1.25rem;box-shadow:0 6px 20px ${t.primary}30}
.step h3{font-size:1rem;font-weight:700;color:#1a1a2e;margin-bottom:.5rem}.step p{font-size:.85rem;color:#888;line-height:1.6}
.trust{padding:3rem 5%;max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem}
.trust-i{text-align:center;padding:1.5rem;background:#fff;border-radius:16px;box-shadow:0 2px 10px rgba(0,0,0,.03)}
.trust-i .emoji{font-size:1.5rem;margin-bottom:.5rem}.trust-i h4{font-size:.85rem;color:#1a1a2e;font-weight:600}.trust-i p{font-size:.75rem;color:#aaa}
footer{padding:3rem 5%;text-align:center;font-size:.85rem;color:#bbb;border-top:1px solid #f0f0f0}
@media(max-width:1024px){.hero{grid-template-columns:1fr;text-align:center}.hero p{margin-left:auto;margin-right:auto}.hero-cta{justify-content:center}.hero-img{max-width:500px;margin:0 auto}.srv-grid,.doc-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:640px){.hero h1{font-size:2.2rem}nav ul{display:none}.srv-grid,.doc-grid,.trust,.steps-row{grid-template-columns:1fr}.steps-row::before{display:none}.hero-badge{display:none}}
</style>
</head>
<body>
<nav><div class="logo">Well<span>spring</span></div><ul><li><a href="#">Services</a></li><li><a href="#">Doctors</a></li><li><a href="#">About</a></li></ul><button class="btn-p">Book Appointment</button></nav>
<section class="hero"><div><h1>Your Health, <span>Our Passion</span></h1><p>Experience compassionate, modern healthcare with board-certified physicians, advanced diagnostics, and same-day appointments.</p><div class="hero-cta"><button class="btn-p" style="padding:.85rem 2rem;font-size:.95rem">Book Online</button><button class="btn-sec">Our Services</button></div></div><div class="hero-img"><img src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&h=450&fit=crop" alt="Clinic"><div class="hero-badge"><div class="dot"></div><span>Same-Day Appointments</span></div></div></section>
<section class="services"><div class="sec-head"><span>Our Services</span><h2>Comprehensive Care for Everyone</h2></div><div class="srv-grid">
<div class="srv-card"><div class="icon">🩺</div><h3>General Checkup</h3><p>Annual physicals, preventive screenings, and wellness consultations for all ages.</p></div>
<div class="srv-card"><div class="icon">❤️</div><h3>Cardiology</h3><p>Heart health evaluations, ECG testing, stress tests, and ongoing cardiac care.</p></div>
<div class="srv-card"><div class="icon">🧬</div><h3>Lab & Diagnostics</h3><p>In-house blood work, imaging, and rapid testing with results in 24 hours.</p></div>
<div class="srv-card"><div class="icon">🧠</div><h3>Mental Health</h3><p>Therapy, counseling, and psychiatric support in a safe, confidential environment.</p></div>
<div class="srv-card"><div class="icon">🦷</div><h3>Dental Care</h3><p>Cleanings, fillings, orthodontics, and cosmetic dentistry for your best smile.</p></div>
<div class="srv-card"><div class="icon">👶</div><h3>Pediatrics</h3><p>Specialized care for infants, children, and adolescents with friendly staff.</p></div>
</div></section>
<section class="doctors"><div class="sec-head"><span>Our Team</span><h2>Meet Our Doctors</h2></div><div class="doc-grid">
<div class="doc"><img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop" alt="Doctor"><h4>Dr. James Wilson</h4><div class="specialty">Cardiology</div><div class="rating">★★★★★ 4.9</div></div>
<div class="doc"><img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop" alt="Doctor"><h4>Dr. Emily Chen</h4><div class="specialty">Pediatrics</div><div class="rating">★★★★★ 4.8</div></div>
<div class="doc"><img src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop" alt="Doctor"><h4>Dr. Alex Rivera</h4><div class="specialty">General Medicine</div><div class="rating">★★★★★ 4.9</div></div>
<div class="doc"><img src="https://images.unsplash.com/photo-1594824476967-48c8b964ac31?w=200&h=200&fit=crop" alt="Doctor"><h4>Dr. Lisa Patel</h4><div class="specialty">Neurology</div><div class="rating">★★★★☆ 4.7</div></div>
</div></section>
<section class="steps"><div class="sec-head"><span>How It Works</span><h2>Book in 3 Simple Steps</h2></div><div class="steps-row">
<div class="step"><div class="num">1</div><h3>Choose a Doctor</h3><p>Browse our specialists and find the right doctor for your needs.</p></div>
<div class="step"><div class="num">2</div><h3>Pick a Time</h3><p>Select a convenient date and time from available slots.</p></div>
<div class="step"><div class="num">3</div><h3>Visit Us</h3><p>Come in for your appointment. We handle the rest.</p></div>
</div></section>
<div class="trust"><div class="trust-i"><div class="emoji">🏆</div><h4>Top Rated</h4><p>4.9 on Google</p></div><div class="trust-i"><div class="emoji">🔬</div><h4>Modern Lab</h4><p>In-house testing</p></div><div class="trust-i"><div class="emoji">⏰</div><h4>Same Day</h4><p>Appointments</p></div><div class="trust-i"><div class="emoji">🛡️</div><h4>Insured</h4><p>All plans accepted</p></div></div>
<footer><p>© 2026 Wellspring Clinic. All rights reserved.</p></footer>
</body></html>`,
  },
  {
    id: "edu-timeline",
    name: "Education — Learning Timeline",
    category: "Education",
    description: "Vertical course timeline with milestone markers, instructor spotlight cards, animated progress indicators, and enrollment CTA section.",
    thumb: "🗺️",
    getCode: (t: T) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>CodePath Academy</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:${t.dark};color:${t.text};overflow-x:hidden}a{text-decoration:none;color:inherit}
nav{display:flex;align-items:center;justify-content:space-between;padding:1.5rem 5%;max-width:1200px;margin:0 auto}
.logo{font-size:1.4rem;font-weight:800;color:#fff}.logo span{color:${t.primary}}
nav ul{list-style:none;display:flex;gap:2rem}nav ul a{font-size:.9rem;opacity:.6;font-weight:500;transition:.2s}nav ul a:hover{color:${t.primary};opacity:1}
.hero{position:relative;min-height:80vh;display:flex;align-items:center;overflow:hidden}
.hero-bg{position:absolute;inset:0;z-index:0}.hero-bg img{width:100%;height:100%;object-fit:cover}
.hero-bg::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,${t.dark}dd 0%,${t.dark}cc 40%,${t.dark}ee 100%)}
.hero-content{position:relative;z-index:2;padding:8rem 5% 5rem;max-width:1200px;margin:0 auto;text-align:center;width:100%}
.hero .pill{display:inline-flex;align-items:center;gap:.5rem;background:${t.primary}10;border:1px solid ${t.primary}25;border-radius:50px;padding:.45rem 1.2rem;font-size:.8rem;font-weight:600;color:${t.primary};margin-bottom:1.5rem}
.hero h1{font-size:3.5rem;font-weight:800;color:#fff;line-height:1.1;margin-bottom:1rem;max-width:700px;margin-left:auto;margin-right:auto}
.hero h1 span{background:linear-gradient(135deg,${t.primary},${t.accent});-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero p{font-size:1.1rem;opacity:.6;max-width:550px;margin:0 auto 2.5rem;line-height:1.7}.hero-btns{display:flex;gap:1rem;justify-content:center}
.btn-a{background:${t.primary};color:#fff;padding:1rem 2.5rem;border-radius:12px;font-weight:700;border:none;cursor:pointer;font-size:1rem;transition:.2s}.btn-a:hover{box-shadow:0 10px 30px ${t.primary}50}
.btn-b{background:rgba(255,255,255,.05);color:#fff;padding:1rem 2.5rem;border-radius:12px;font-weight:600;border:1px solid rgba(255,255,255,.1);cursor:pointer;font-size:1rem;transition:.2s}.btn-b:hover{border-color:${t.primary}}
.timeline{padding:6rem 5%;max-width:800px;margin:0 auto;position:relative}.timeline h2{font-size:2rem;font-weight:800;color:#fff;text-align:center;margin-bottom:3rem}
.timeline::after{content:'';position:absolute;left:50%;top:140px;bottom:40px;width:2px;background:linear-gradient(to bottom,${t.primary},${t.primary}30);transform:translateX(-50%)}
.tl-item{display:grid;grid-template-columns:1fr 1fr;gap:3rem;margin-bottom:3rem;position:relative}.tl-item:nth-child(odd) .tl-content{text-align:right;grid-column:1}
.tl-item:nth-child(odd) .tl-card{grid-column:2}.tl-item:nth-child(even) .tl-content{grid-column:2}.tl-item:nth-child(even) .tl-card{grid-column:1;grid-row:1}
.tl-dot{position:absolute;left:50%;top:1rem;transform:translateX(-50%);width:16px;height:16px;border-radius:50%;background:${t.primary};border:3px solid ${t.dark};z-index:1;box-shadow:0 0 15px ${t.primary}40}
.tl-content .week{font-size:.75rem;color:${t.primary};font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:.5rem}
.tl-content h3{color:#fff;font-size:1.1rem;font-weight:700;margin-bottom:.5rem}.tl-content p{font-size:.85rem;opacity:.5;line-height:1.6}
.tl-card{background:${t.darkAlt};border:1px solid rgba(255,255,255,.06);border-radius:16px;padding:1.5rem}.tl-card .topics{display:flex;flex-wrap:wrap;gap:.4rem}
.tl-card .topics span{font-size:.7rem;background:${t.primary}12;color:${t.primary};padding:.2rem .6rem;border-radius:50px;font-weight:500}
.instructors{padding:6rem 5%;max-width:1200px;margin:0 auto}.instructors h2{font-size:2rem;font-weight:800;color:#fff;text-align:center;margin-bottom:2.5rem}
.ins-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem}
.ins{background:${t.darkAlt};border:1px solid rgba(255,255,255,.06);border-radius:20px;padding:2rem;text-align:center;transition:.3s}
.ins:hover{border-color:${t.primary}40;transform:translateY(-5px)}
.ins img{width:80px;height:80px;border-radius:50%;object-fit:cover;margin-bottom:1rem;border:3px solid ${t.primary}25}
.ins h3{color:#fff;font-size:1rem;font-weight:700;margin-bottom:.25rem}.ins .role{font-size:.8rem;color:${t.primary};margin-bottom:.75rem}
.ins p{font-size:.8rem;opacity:.5;line-height:1.6}
.stats{padding:4rem 5%;max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem;text-align:center}
.st{padding:2rem;background:${t.darkAlt};border-radius:16px;border:1px solid rgba(255,255,255,.04)}
.st .n{font-size:2.2rem;font-weight:800;background:linear-gradient(135deg,${t.primary},${t.accent});-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.st .l{font-size:.8rem;opacity:.4;margin-top:.25rem}.enroll{padding:6rem 5%}
.enroll-box{max-width:800px;margin:0 auto;text-align:center;background:linear-gradient(135deg,${t.primary}15,${t.secondary}10);border:1px solid ${t.primary}25;border-radius:24px;padding:4rem 3rem}
.enroll-box h2{font-size:2.2rem;font-weight:800;color:#fff;margin-bottom:1rem}.enroll-box p{opacity:.5;margin-bottom:2rem;max-width:450px;margin-left:auto;margin-right:auto}
footer{padding:3rem 5%;border-top:1px solid rgba(255,255,255,.05);text-align:center;font-size:.85rem;opacity:.3}
@media(max-width:768px){.hero h1{font-size:2.5rem}nav ul{display:none}.timeline::after{left:20px}.tl-item{grid-template-columns:1fr;padding-left:50px}.tl-item:nth-child(odd) .tl-content,.tl-item:nth-child(even) .tl-content,.tl-item:nth-child(odd) .tl-card,.tl-item:nth-child(even) .tl-card{grid-column:1;text-align:left;grid-row:auto}.tl-dot{left:20px}.ins-grid,.stats{grid-template-columns:1fr}}
</style>
</head>
<body>
<nav><div class="logo">Code<span>Path</span></div><ul><li><a href="#">Courses</a></li><li><a href="#">Instructors</a></li><li><a href="#">Pricing</a></li></ul><a href="#" class="btn-a" style="padding:.6rem 1.5rem;font-size:.85rem">Enroll Now</a></nav>
<section class="hero">
<div class="hero-bg"><img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1600&h=900&fit=crop" alt="Developer coding on laptop"></div>
<div class="hero-content"><div class="pill">🎓 Next Cohort Starts Jan 15</div>
<h1>Master <span>Full-Stack Development</span> in 12 Weeks</h1>
<p>A structured, project-based curriculum that takes you from fundamentals to building production-ready applications.</p>
<div class="hero-btns"><button class="btn-a">Start Learning</button><button class="btn-b">View Curriculum</button></div></div>
</section>
<section class="timeline"><h2>The Learning Path</h2>
<div class="tl-item"><div class="tl-dot"></div><div class="tl-content"><div class="week">Weeks 1–3</div><h3>Foundations</h3><p>HTML, CSS, JavaScript fundamentals and version control with Git.</p></div><div class="tl-card"><div class="topics"><span>HTML5</span><span>CSS3</span><span>JavaScript</span><span>Git</span><span>CLI</span></div></div></div>
<div class="tl-item"><div class="tl-dot"></div><div class="tl-content"><div class="week">Weeks 4–6</div><h3>Frontend Mastery</h3><p>React, state management, component patterns, and responsive design.</p></div><div class="tl-card"><div class="topics"><span>React</span><span>TypeScript</span><span>Tailwind</span><span>Next.js</span></div></div></div>
<div class="tl-item"><div class="tl-dot"></div><div class="tl-content"><div class="week">Weeks 7–9</div><h3>Backend & APIs</h3><p>Node.js, Express, databases, authentication, and RESTful APIs.</p></div><div class="tl-card"><div class="topics"><span>Node.js</span><span>PostgreSQL</span><span>Prisma</span><span>Auth</span></div></div></div>
<div class="tl-item"><div class="tl-dot"></div><div class="tl-content"><div class="week">Weeks 10–12</div><h3>Capstone Project</h3><p>Build and deploy a full-stack application with CI/CD pipeline.</p></div><div class="tl-card"><div class="topics"><span>Docker</span><span>AWS</span><span>CI/CD</span><span>Testing</span></div></div></div>
</section>
<section class="instructors"><h2>Learn from Industry Experts</h2><div class="ins-grid">
<div class="ins"><img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop" alt="Instructor"><h3>David Kim</h3><div class="role">Sr. Engineer @ Google</div><p>10+ years building scalable web applications at top tech companies.</p></div>
<div class="ins"><img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop" alt="Instructor"><h3>Maya Patel</h3><div class="role">CTO @ StartupAI</div><p>Full-stack expert and open-source contributor with 50K+ GitHub stars.</p></div>
<div class="ins"><img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop" alt="Instructor"><h3>Ryan Chen</h3><div class="role">DevRel @ Vercel</div><p>Teaching Next.js and modern web development to 100K+ developers online.</p></div>
</div></section>
<div class="stats"><div class="st"><div class="n">15K+</div><div class="l">Graduates</div></div><div class="st"><div class="n">92%</div><div class="l">Job Placement</div></div><div class="st"><div class="n">$95K</div><div class="l">Avg Salary</div></div><div class="st"><div class="n">4.9★</div><div class="l">Student Rating</div></div></div>
<section class="enroll"><div class="enroll-box"><h2>Ready to start your journey?</h2><p>Join 15,000+ graduates who transformed their careers with CodePath.</p><button class="btn-a" style="font-size:1.1rem;padding:1.1rem 3rem">Enroll Now — $2,499</button></div></section>
<footer><p>© 2026 CodePath Academy. All rights reserved.</p></footer>
</body></html>`,
  },
  {
    id: "auto-cinema",
    name: "Automotive — Cinematic Showroom",
    category: "Automotive",
    description: "Ultra-dark cinematic design with full-bleed car hero, large animated spec numbers, horizontal gallery strip, and dramatic test-drive booking.",
    thumb: "🏎️",
    getCode: (t: T) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Apex Motors</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:#030303;color:#888;overflow-x:hidden}a{text-decoration:none;color:inherit}
nav{position:absolute;top:0;left:0;right:0;z-index:10;display:flex;align-items:center;justify-content:space-between;padding:2rem 5%}
.logo{font-size:1.6rem;font-weight:900;color:#fff;letter-spacing:6px;text-transform:uppercase}
nav ul{list-style:none;display:flex;gap:2rem}nav ul a{font-size:.8rem;opacity:.4;text-transform:uppercase;letter-spacing:2px;transition:.2s}nav ul a:hover{opacity:1;color:${t.primary}}
.hero{height:100vh;position:relative;display:flex;align-items:flex-end;padding:4rem 5%}.hero-bg{position:absolute;inset:0;overflow:hidden}
.hero-bg img{width:100%;height:100%;object-fit:cover;opacity:.5}
.hero-bg::after{content:'';position:absolute;inset:0;background:linear-gradient(to top,#030303,transparent 50%,#03030380)}
.hero-content{position:relative;z-index:1;max-width:600px;margin-bottom:4rem}
.hero-content h1{font-size:5rem;font-weight:900;color:#fff;text-transform:uppercase;line-height:.95;margin-bottom:1rem;letter-spacing:-2px}.hero-content h1 span{color:${t.primary}}
.hero-content p{opacity:.4;line-height:1.7;margin-bottom:2rem}
.btn-c{background:${t.primary};color:#000;padding:1rem 2.5rem;font-weight:800;border:none;cursor:pointer;font-size:.85rem;text-transform:uppercase;letter-spacing:3px;transition:.2s}.btn-c:hover{box-shadow:0 10px 40px ${t.primary}50}
.specs{padding:6rem 5%;max-width:1400px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:2rem}.spec{text-align:center;padding:3rem 2rem;position:relative}
.spec::after{content:'';position:absolute;right:0;top:20%;bottom:20%;width:1px;background:rgba(255,255,255,.06)}.spec:last-child::after{display:none}
.spec .val{font-size:4rem;font-weight:900;color:#fff;line-height:1;margin-bottom:.25rem}.spec .val span{font-size:1.2rem;color:${t.primary};font-weight:600}
.spec .label{font-size:.75rem;text-transform:uppercase;letter-spacing:3px;opacity:.3}.gallery{padding:4rem 0}
.gallery h2{font-size:2rem;font-weight:900;color:#fff;text-transform:uppercase;letter-spacing:4px;padding:0 5%;margin-bottom:2rem}
.gal-scroll{display:flex;gap:1rem;overflow-x:auto;padding:0 5% 2rem;scrollbar-width:thin;scrollbar-color:${t.primary}30 transparent}
.gal-scroll::-webkit-scrollbar{height:4px}.gal-scroll::-webkit-scrollbar-thumb{background:${t.primary}40;border-radius:2px}
.gal-item{min-width:400px;aspect-ratio:16/9;border:1px solid rgba(255,255,255,.04);overflow:hidden;flex-shrink:0}
.gal-item img{width:100%;height:100%;object-fit:cover;transition:transform .6s}.gal-item:hover img{transform:scale(1.08)}
.features{padding:6rem 5%;max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(3,1fr);gap:2rem}
.feat{padding:2.5rem;background:#0a0a0a;border:1px solid rgba(255,255,255,.04);transition:.3s}.feat:hover{border-color:${t.primary}30}
.feat h3{color:#fff;font-size:1rem;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:.75rem}.feat p{font-size:.85rem;opacity:.4;line-height:1.7}
.feat .icon{font-size:1.8rem;margin-bottom:1rem}.booking{padding:6rem 5%;max-width:700px;margin:0 auto;text-align:center}
.booking h2{font-size:2.5rem;font-weight:900;color:#fff;text-transform:uppercase;letter-spacing:3px;margin-bottom:.5rem}.booking>p{opacity:.3;margin-bottom:3rem}
.book-form{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
.book-form input,.book-form select{background:#0a0a0a;border:1px solid rgba(255,255,255,.06);padding:1rem;color:#fff;font-size:.9rem;outline:none;font-family:inherit}.book-form input:focus,.book-form select:focus{border-color:${t.primary}}
.book-form button{grid-column:1/-1;background:${t.primary};color:#000;padding:1rem;font-weight:800;text-transform:uppercase;letter-spacing:3px;border:none;cursor:pointer;font-size:.9rem}
footer{padding:3rem 5%;border-top:1px solid rgba(255,255,255,.04);text-align:center;font-size:.8rem;opacity:.2}
@media(max-width:1024px){.hero-content h1{font-size:3.5rem}.specs,.features{grid-template-columns:repeat(2,1fr)}}
@media(max-width:640px){.hero-content h1{font-size:2.5rem}nav ul{display:none}.specs,.features{grid-template-columns:1fr}.gal-item{min-width:300px}.book-form{grid-template-columns:1fr}}
</style>
</head>
<body>
<nav><div class="logo">Apex</div><ul><li><a href="#">Models</a></li><li><a href="#">Performance</a></li><li><a href="#">Gallery</a></li></ul></nav>
<section class="hero"><div class="hero-bg"><img src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1400&h=900&fit=crop" alt="Car"></div><div class="hero-content"><h1>Born to <span>Dominate</span></h1><p>The all-new GT Series — where raw power meets refined luxury. 0 to 100 in 2.9 seconds. Every drive is an event.</p><button class="btn-c">Configure Yours</button></div></section>
<div class="specs"><div class="spec"><div class="val">2.9<span>s</span></div><div class="label">0–100 km/h</div></div><div class="spec"><div class="val">720<span>hp</span></div><div class="label">Power</div></div><div class="spec"><div class="val">355<span>km/h</span></div><div class="label">Top Speed</div></div><div class="spec"><div class="val">100<span>kWh</span></div><div class="label">Battery</div></div></div>
<section class="gallery"><h2>Gallery</h2><div class="gal-scroll">
<div class="gal-item"><img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=340&fit=crop" alt="Front"></div>
<div class="gal-item"><img src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=340&fit=crop" alt="Interior"></div>
<div class="gal-item"><img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=340&fit=crop" alt="Speed"></div>
<div class="gal-item"><img src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=340&fit=crop" alt="Detail"></div>
</div></section>
<div class="features">
<div class="feat"><div class="icon">⚡</div><h3>Electric Performance</h3><p>Tri-motor all-wheel drive with torque vectoring delivers exhilarating performance in all conditions.</p></div>
<div class="feat"><div class="icon">🧠</div><h3>Autonomous Ready</h3><p>Full self-driving hardware with over-the-air updates for continuous improvement.</p></div>
<div class="feat"><div class="icon">💎</div><h3>Crafted Interior</h3><p>Hand-stitched Nappa leather, carbon fiber trim, and a 17" cinematic display.</p></div>
</div>
<section class="booking"><h2>Book a Test Drive</h2><p>Feel the power firsthand.</p><form class="book-form"><input type="text" placeholder="Full Name"><input type="email" placeholder="Email"><input type="tel" placeholder="Phone"><select><option>GT Sport</option><option>GT Touring</option><option>GT RS</option></select><button type="submit">Reserve Experience</button></form></section>
<footer><p>© 2026 Apex Motors. All rights reserved.</p></footer>
</body></html>`,
  },
  {
    id: "realestate-search",
    name: "Real Estate — Smart Search",
    category: "Real Estate",
    description: "Property hero with floating search bar, amenity icon badges, listing cards with price tags, agent spotlight section, and consultation form.",
    thumb: "🏙️",
    getCode: (t: T) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Horizon Estates</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:${t.dark};color:${t.text};overflow-x:hidden}a{text-decoration:none;color:inherit}
nav{display:flex;align-items:center;justify-content:space-between;padding:1.5rem 5%;max-width:1400px;margin:0 auto}
.logo{font-family:'Playfair Display',serif;font-size:1.5rem;font-weight:700;color:#fff}.logo span{color:${t.primary}}
nav ul{list-style:none;display:flex;gap:2rem}nav ul a{font-size:.9rem;opacity:.6;font-weight:500;transition:.2s}nav ul a:hover{opacity:1;color:${t.primary}}
.hero{position:relative;min-height:75vh;display:flex;align-items:center;padding:4rem 5%}.hero-bg{position:absolute;inset:0;overflow:hidden}
.hero-bg img{width:100%;height:100%;object-fit:cover;opacity:.3}.hero-bg::after{content:'';position:absolute;inset:0;background:linear-gradient(135deg,${t.dark}ee,${t.dark}99)}
.hero-content{position:relative;z-index:1;max-width:650px}
.hero-content .tag{display:inline-block;background:${t.primary}15;color:${t.primary};border:1px solid ${t.primary}30;padding:.4rem 1rem;border-radius:50px;font-size:.75rem;font-weight:600;margin-bottom:1.5rem}
.hero-content h1{font-family:'Playfair Display',serif;font-size:3.5rem;font-weight:700;color:#fff;line-height:1.1;margin-bottom:1rem}.hero-content h1 span{color:${t.primary}}
.hero-content p{opacity:.5;line-height:1.7;margin-bottom:2rem}.search{position:relative;z-index:2;max-width:900px;margin:-3rem auto 0;padding:0 5%}
.search-box{background:${t.darkAlt};border:1px solid rgba(255,255,255,.08);border-radius:20px;padding:1.5rem;display:grid;grid-template-columns:1fr 1fr 1fr auto;gap:1rem;align-items:end;box-shadow:0 20px 50px rgba(0,0,0,.3)}
.search-box label{font-size:.7rem;text-transform:uppercase;letter-spacing:1px;opacity:.4;display:block;margin-bottom:.5rem}
.search-box input,.search-box select{width:100%;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:10px;padding:.85rem 1rem;color:#fff;font-size:.9rem;outline:none;font-family:inherit}
.search-box input:focus,.search-box select:focus{border-color:${t.primary}}
.search-box button{background:${t.primary};color:#fff;padding:.85rem 2rem;border-radius:10px;font-weight:700;border:none;cursor:pointer;white-space:nowrap;height:fit-content}
.listings{padding:5rem 5%;max-width:1400px;margin:0 auto}.listings h2{font-family:'Playfair Display',serif;font-size:2.2rem;color:#fff;margin-bottom:2rem}
.list-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem}
.listing{background:${t.darkAlt};border:1px solid rgba(255,255,255,.06);border-radius:20px;overflow:hidden;transition:.3s}
.listing:hover{border-color:${t.primary}40;transform:translateY(-5px)}.listing .img{aspect-ratio:16/10;overflow:hidden;position:relative}
.listing .img img{width:100%;height:100%;object-fit:cover;transition:transform .5s}.listing:hover .img img{transform:scale(1.08)}
.listing .img .badge{position:absolute;top:.75rem;left:.75rem;background:${t.primary};color:#fff;padding:.25rem .75rem;border-radius:50px;font-size:.7rem;font-weight:700}
.listing .info{padding:1.5rem}.listing .price{font-size:1.4rem;font-weight:800;color:#fff;margin-bottom:.25rem}
.listing h3{font-size:.95rem;font-weight:600;opacity:.8;margin-bottom:.75rem;color:#fff}.listing .details{display:flex;gap:1.5rem;font-size:.8rem;opacity:.5}
.listing .amenities{display:flex;gap:.5rem;margin-top:.75rem;flex-wrap:wrap}
.listing .amenities span{font-size:.65rem;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.06);padding:.2rem .5rem;border-radius:6px}
.agent{padding:5rem 5%;max-width:900px;margin:0 auto;display:grid;grid-template-columns:auto 1fr;gap:3rem;align-items:center}
.agent img{width:200px;height:200px;border-radius:20px;object-fit:cover;border:3px solid ${t.primary}20}
.agent h2{font-family:'Playfair Display',serif;font-size:1.8rem;color:#fff;margin-bottom:.5rem}.agent .title{color:${t.primary};font-size:.85rem;font-weight:600;margin-bottom:1rem}
.agent p{font-size:.9rem;opacity:.5;line-height:1.7;margin-bottom:1.5rem}
.agent .btn-c{background:${t.primary};color:#fff;padding:.75rem 2rem;border-radius:10px;font-weight:700;border:none;cursor:pointer;font-size:.9rem}
footer{padding:3rem 5%;border-top:1px solid rgba(255,255,255,.05);text-align:center;font-size:.85rem;opacity:.3}
@media(max-width:1024px){.list-grid{grid-template-columns:1fr}.hero-content h1{font-size:2.5rem}.search-box{grid-template-columns:1fr}.agent{grid-template-columns:1fr;text-align:center}.agent img{margin:0 auto}}
@media(max-width:640px){nav ul{display:none}}
</style>
</head>
<body>
<nav><div class="logo">Horizon<span>.</span></div><ul><li><a href="#">Buy</a></li><li><a href="#">Rent</a></li><li><a href="#">Sell</a></li></ul><a href="#" style="background:${t.primary};color:#fff;padding:.6rem 1.5rem;border-radius:10px;font-weight:600;font-size:.85rem">List Property</a></nav>
<section class="hero"><div class="hero-bg"><img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&h=900&fit=crop" alt="Property"></div><div class="hero-content"><div class="tag">🏆 #1 Luxury Platform</div><h1>Find Your <span>Perfect</span> Home</h1><p>Browse premium properties in the world's most desirable locations. Trusted by 50,000+ homebuyers worldwide.</p></div></section>
<div class="search"><div class="search-box"><div><label>Location</label><input type="text" placeholder="City or Address"></div><div><label>Property Type</label><select><option>Any Type</option><option>House</option><option>Apartment</option><option>Villa</option></select></div><div><label>Price Range</label><select><option>Any Price</option><option>$500K – $1M</option><option>$1M – $3M</option><option>$3M+</option></select></div><button>Search</button></div></div>
<section class="listings"><h2>Featured Properties</h2><div class="list-grid">
<div class="listing"><div class="img"><img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop" alt="Villa"><div class="badge">Featured</div></div><div class="info"><div class="price">$2,850,000</div><h3>Modern Villa with Infinity Pool</h3><div class="details"><span>5 Beds</span><span>4 Baths</span><span>4,200 sqft</span></div><div class="amenities"><span>🏊 Pool</span><span>🌳 Garden</span><span>🚗 Garage</span></div></div></div>
<div class="listing"><div class="img"><img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop" alt="Penthouse"><div class="badge">New</div></div><div class="info"><div class="price">$1,250,000</div><h3>Sky Penthouse Downtown</h3><div class="details"><span>3 Beds</span><span>3 Baths</span><span>2,800 sqft</span></div><div class="amenities"><span>🏙️ View</span><span>🏋️ Gym</span><span>🛗 Elevator</span></div></div></div>
<div class="listing"><div class="img"><img src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop" alt="Estate"></div><div class="info"><div class="price">$3,500,000</div><h3>Country Estate on 5 Acres</h3><div class="details"><span>6 Beds</span><span>5 Baths</span><span>6,000 sqft</span></div><div class="amenities"><span>🐎 Stables</span><span>🌲 Forest</span><span>🏊 Pool</span></div></div></div>
</div></section>
<section class="agent"><img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop" alt="Agent"><div><h2>Work with the Best</h2><div class="title">James Mitchell — Lead Agent</div><p>With 15 years of luxury real estate experience and $500M+ in closed deals, James connects buyers with their dream properties worldwide.</p><button class="btn-c">Schedule Consultation →</button></div></section>
<footer><p>© 2026 Horizon Estates. All rights reserved.</p></footer>
</body></html>`,
  },
  {
    id: "fitness-energy",
    name: "Fitness — Diagonal Energy",
    category: "Fitness",
    description: "High-energy design with skewed diagonal section backgrounds, bold uppercase typography, program difficulty badges, trainer cards, and motivational CTA.",
    thumb: "💪",
    getCode: (t: T) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>TITAN Fitness</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:#050505;color:#999;overflow-x:hidden}a{text-decoration:none;color:inherit}
nav{display:flex;align-items:center;justify-content:space-between;padding:1.5rem 5%;max-width:1400px;margin:0 auto;position:relative;z-index:10}
.logo{font-size:1.6rem;font-weight:900;color:#fff;letter-spacing:6px;text-transform:uppercase}
nav ul{list-style:none;display:flex;gap:2rem}nav ul a{font-size:.8rem;opacity:.4;text-transform:uppercase;letter-spacing:2px;transition:.2s}nav ul a:hover{opacity:1;color:${t.primary}}
.hero{min-height:100vh;position:relative;display:flex;align-items:center;overflow:hidden}
.hero-bg{position:absolute;inset:0;z-index:0}.hero-bg img{width:100%;height:100%;object-fit:cover}
.hero-bg::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,#050505 25%,#050505aa 55%,transparent 100%)}
.hero-content{position:relative;z-index:2;padding:8rem 5% 6rem;max-width:1400px;margin:0 auto;width:100%}
.hero h1{font-size:5.5rem;font-weight:900;color:#fff;text-transform:uppercase;line-height:.9;margin-bottom:1.5rem;letter-spacing:-2px;max-width:600px}
.hero h1 span{color:${t.primary};display:block}.hero p{opacity:.6;max-width:450px;line-height:1.7;margin-bottom:2.5rem}.hero-btns{display:flex;gap:1rem}
.btn{background:${t.primary};color:#000;padding:1rem 2.5rem;font-weight:800;border:none;cursor:pointer;font-size:.85rem;text-transform:uppercase;letter-spacing:3px;transition:.2s}.btn:hover{box-shadow:0 8px 30px ${t.primary}50;transform:translateY(-2px)}
.btn-o{background:0;color:#fff;padding:1rem 2.5rem;font-weight:600;border:2px solid rgba(255,255,255,.12);cursor:pointer;font-size:.85rem;text-transform:uppercase;letter-spacing:3px;transition:.2s}.btn-o:hover{border-color:${t.primary}}
.programs{position:relative;padding:8rem 5%;margin-top:-2rem}.programs::before{content:'';position:absolute;inset:0;background:#0a0a0a;transform:skewY(-3deg);z-index:0}
.programs-inner{position:relative;z-index:1;max-width:1400px;margin:0 auto}
.programs h2{font-size:2.5rem;font-weight:900;color:#fff;text-transform:uppercase;letter-spacing:3px;margin-bottom:3rem}
.prog-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem}
.prog{background:#111;border:1px solid rgba(255,255,255,.06);padding:2.5rem;transition:.3s;position:relative;overflow:hidden}
.prog:hover{border-color:${t.primary}40;transform:translateY(-5px)}
.prog::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:${t.primary};transform:scaleX(0);transition:.3s;transform-origin:left}.prog:hover::before{transform:scaleX(1)}
.prog .difficulty{display:inline-block;padding:.2rem .75rem;border-radius:4px;font-size:.65rem;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:1rem}
.prog .difficulty.beginner{background:#10b98120;color:#10b981}.prog .difficulty.intermediate{background:${t.primary}20;color:${t.primary}}.prog .difficulty.advanced{background:#f43f5e20;color:#f43f5e}
.prog h3{color:#fff;font-size:1.2rem;font-weight:800;text-transform:uppercase;margin-bottom:.5rem}.prog p{font-size:.85rem;opacity:.4;line-height:1.7;margin-bottom:1rem}
.prog .meta{display:flex;gap:1.5rem;font-size:.75rem;opacity:.3}.trainers{padding:6rem 5%;max-width:1400px;margin:0 auto}
.trainers h2{font-size:2rem;font-weight:900;color:#fff;text-transform:uppercase;letter-spacing:3px;margin-bottom:2.5rem}
.trainer-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem}.trainer{position:relative;aspect-ratio:3/4;overflow:hidden}
.trainer img{width:100%;height:100%;object-fit:cover;transition:transform .5s}.trainer:hover img{transform:scale(1.1)}
.trainer .info{position:absolute;bottom:0;left:0;right:0;padding:1.5rem;background:linear-gradient(to top,#050505ee,transparent)}
.trainer .info h4{color:#fff;font-size:1rem;font-weight:700;text-transform:uppercase}.trainer .info span{color:${t.primary};font-size:.8rem}
.quote{padding:6rem 5%;text-align:center;position:relative}.quote::before{content:'';position:absolute;inset:0;background:#0a0a0a;transform:skewY(2deg);z-index:0}
.quote-inner{position:relative;z-index:1}.quote-inner p{font-size:2.5rem;font-weight:900;color:#fff;text-transform:uppercase;line-height:1.15;max-width:700px;margin:0 auto 2rem}
.quote-inner p span{color:${t.primary}}footer{padding:3rem 5%;border-top:1px solid rgba(255,255,255,.04);text-align:center;font-size:.8rem;opacity:.2}
@media(max-width:1024px){.hero h1{font-size:3.5rem}.prog-grid,.trainer-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:640px){.hero h1{font-size:2.5rem}nav ul{display:none}.prog-grid,.trainer-grid{grid-template-columns:1fr}.quote-inner p{font-size:1.8rem}}
</style>
</head>
<body>
<nav><div class="logo">Titan</div><ul><li><a href="#">Programs</a></li><li><a href="#">Trainers</a></li><li><a href="#">Pricing</a></li></ul><a href="#" class="btn" style="padding:.6rem 1.5rem;font-size:.75rem">Join Now</a></nav>
<section class="hero"><div class="hero-bg"><img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&h=900&fit=crop" alt="Gym equipment and training floor"></div><div class="hero-content"><h1>Push Your <span>Limits</span></h1><p>State-of-the-art equipment, elite trainers, and 150+ weekly classes. Your strongest self starts here.</p><div class="hero-btns"><button class="btn">Start Free Trial</button><button class="btn-o">View Programs</button></div></div></section>
<section class="programs"><div class="programs-inner"><h2>Programs</h2><div class="prog-grid">
<div class="prog"><div class="difficulty beginner">Beginner</div><h3>Foundation</h3><p>Build your base with fundamental movements, mobility work, and progressive overload training.</p><div class="meta"><span>3× / week</span><span>45 min</span><span>8 weeks</span></div></div>
<div class="prog"><div class="difficulty intermediate">Intermediate</div><h3>Strength</h3><p>Advanced compound lifts, periodized programming, and sport-specific conditioning.</p><div class="meta"><span>4× / week</span><span>60 min</span><span>12 weeks</span></div></div>
<div class="prog"><div class="difficulty advanced">Advanced</div><h3>Elite</h3><p>Competition prep, max effort training, and personalized nutrition coaching.</p><div class="meta"><span>5× / week</span><span>90 min</span><span>16 weeks</span></div></div>
</div></div></section>
<section class="trainers"><h2>Elite Trainers</h2><div class="trainer-grid">
<div class="trainer"><img src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=530&fit=crop" alt="Trainer"><div class="info"><h4>Marcus Stone</h4><span>Strength & Conditioning</span></div></div>
<div class="trainer"><img src="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=530&fit=crop" alt="Trainer"><div class="info"><h4>Elena Cruz</h4><span>HIIT & Cardio</span></div></div>
<div class="trainer"><img src="https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&h=530&fit=crop" alt="Trainer"><div class="info"><h4>James Park</h4><span>Olympic Lifting</span></div></div>
<div class="trainer"><img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=530&fit=crop" alt="Trainer"><div class="info"><h4>Aisha Williams</h4><span>Yoga & Recovery</span></div></div>
</div></section>
<section class="quote"><div class="quote-inner"><p>The only bad workout is the one that <span>didn't happen</span></p><button class="btn" style="font-size:1rem;padding:1.1rem 3rem">Join Titan Today</button></div></section>
<footer><p>© 2026 TITAN Fitness. All rights reserved.</p></footer>
</body></html>`,
  },
  {
    id: "travel-explorer",
    name: "Travel — Immersive Explorer",
    category: "Travel",
    description: "Full-screen destination hero, floating booking card overlay, postcard-shaped destination cards with ratings, trip highlights, and newsletter section.",
    thumb: "🌍",
    getCode: (t: T) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Roam Travel</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:${t.dark};color:${t.text};overflow-x:hidden}a{text-decoration:none;color:inherit}
nav{position:absolute;top:0;left:0;right:0;z-index:10;display:flex;align-items:center;justify-content:space-between;padding:1.5rem 5%}
.logo{font-family:'Playfair Display',serif;font-size:1.6rem;font-weight:700;color:#fff}.logo span{color:${t.primary}}
nav ul{list-style:none;display:flex;gap:2rem}nav ul a{font-size:.9rem;opacity:.7;color:#fff;font-weight:500;transition:.2s}nav ul a:hover{opacity:1;color:${t.primary}}
.hero{height:100vh;position:relative;display:flex;align-items:center;justify-content:center;text-align:center}
.hero-bg{position:absolute;inset:0}.hero-bg img{width:100%;height:100%;object-fit:cover}.hero-bg::after{content:'';position:absolute;inset:0;background:linear-gradient(to bottom,rgba(0,0,0,.3),rgba(0,0,0,.6))}
.hero-content{position:relative;z-index:1;max-width:700px;padding:0 2rem}
.hero-content h1{font-family:'Playfair Display',serif;font-size:5rem;font-weight:700;color:#fff;line-height:1.05;margin-bottom:1rem}.hero-content h1 span{color:${t.primary}}
.hero-content p{color:rgba(255,255,255,.7);font-size:1.1rem;line-height:1.7;margin-bottom:2.5rem}
.booking-card{position:relative;z-index:2;max-width:900px;margin:-4rem auto 0;padding:0 5%}
.bcard{background:${t.darkAlt};border:1px solid rgba(255,255,255,.08);border-radius:20px;padding:2rem;display:grid;grid-template-columns:1fr 1fr 1fr auto;gap:1.5rem;align-items:end;box-shadow:0 25px 60px rgba(0,0,0,.4)}
.bcard label{font-size:.7rem;text-transform:uppercase;letter-spacing:1px;opacity:.4;display:block;margin-bottom:.5rem}
.bcard input,.bcard select{width:100%;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:.85rem 1rem;color:#fff;font-size:.9rem;outline:none;font-family:inherit}
.bcard input:focus,.bcard select:focus{border-color:${t.primary}}
.bcard button{background:${t.primary};color:#fff;padding:.85rem 2rem;border-radius:12px;font-weight:700;border:none;cursor:pointer;white-space:nowrap}
.destinations{padding:5rem 5%;max-width:1400px;margin:0 auto}.destinations h2{font-family:'Playfair Display',serif;font-size:2.5rem;color:#fff;margin-bottom:2.5rem}
.dest-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem}
.dest{background:${t.darkAlt};border:1px solid rgba(255,255,255,.06);border-radius:20px;overflow:hidden;transition:.3s}
.dest:hover{border-color:${t.primary}40;transform:translateY(-8px)}.dest .img{aspect-ratio:4/3;overflow:hidden;position:relative}
.dest .img img{width:100%;height:100%;object-fit:cover;transition:transform .5s}.dest:hover .img img{transform:scale(1.1)}.dest .body{padding:1.5rem}
.dest h3{color:#fff;font-size:1.1rem;font-weight:700;margin-bottom:.25rem}.dest .loc{font-size:.85rem;opacity:.5;margin-bottom:1rem}
.dest .bottom{display:flex;justify-content:space-between;align-items:center}.dest .price{color:${t.primary};font-weight:700;font-size:1.1rem}
.dest .rating{font-size:.8rem;color:#fff;background:${t.primary}20;padding:.2rem .6rem;border-radius:6px}
.highlights{padding:5rem 5%;max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:2rem;text-align:center}
.hl{padding:2rem;background:${t.darkAlt};border-radius:16px;border:1px solid rgba(255,255,255,.04)}
.hl .emoji{font-size:2rem;margin-bottom:.75rem}.hl h4{color:#fff;font-size:.9rem;font-weight:700;margin-bottom:.25rem}.hl p{font-size:.75rem;opacity:.4}.newsletter{padding:5rem 5%}
.nl-box{max-width:600px;margin:0 auto;text-align:center;background:linear-gradient(135deg,${t.primary}15,${t.secondary}10);border:1px solid ${t.primary}25;border-radius:20px;padding:3rem 2rem}
.nl-box h3{color:#fff;font-size:1.3rem;font-weight:700;margin-bottom:.5rem}.nl-box p{opacity:.4;font-size:.9rem;margin-bottom:1.5rem}
.nl-form{display:flex;gap:.75rem;max-width:400px;margin:0 auto}
.nl-form input{flex:1;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:.8rem 1rem;color:#fff;font-size:.9rem;outline:none}.nl-form input:focus{border-color:${t.primary}}
.nl-form button{background:${t.primary};color:#fff;padding:.8rem 1.5rem;border-radius:10px;font-weight:700;border:none;cursor:pointer;white-space:nowrap}
footer{padding:3rem 5%;border-top:1px solid rgba(255,255,255,.05);text-align:center;font-size:.85rem;opacity:.3}
@media(max-width:1024px){.hero-content h1{font-size:3rem}.dest-grid,.highlights{grid-template-columns:repeat(2,1fr)}.bcard{grid-template-columns:1fr}}
@media(max-width:640px){.hero-content h1{font-size:2.5rem}nav ul{display:none}.dest-grid,.highlights{grid-template-columns:1fr}.nl-form{flex-direction:column}}
</style>
</head>
<body>
<nav><div class="logo">Roam<span>.</span></div><ul><li><a href="#">Destinations</a></li><li><a href="#">Trips</a></li><li><a href="#">About</a></li></ul></nav>
<section class="hero"><div class="hero-bg"><img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&h=900&fit=crop" alt="Beach"></div><div class="hero-content"><h1>Explore the <span>Unknown</span></h1><p>Handcrafted journeys to the world's most breathtaking destinations. Every trip is an adventure.</p></div></section>
<div class="booking-card"><div class="bcard"><div><label>Destination</label><input type="text" placeholder="Where to?"></div><div><label>Travel Dates</label><input type="date"></div><div><label>Travelers</label><select><option>2 Adults</option><option>Family (4)</option><option>Group (6+)</option></select></div><button>Search Trips</button></div></div>
<section class="destinations"><h2>Trending Destinations</h2><div class="dest-grid">
<div class="dest"><div class="img"><img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=450&fit=crop" alt="Maldives"></div><div class="body"><h3>Maldives Paradise</h3><div class="loc">South Asia · 7 nights</div><div class="bottom"><span class="price">From $2,499</span><span class="rating">★ 4.9</span></div></div></div>
<div class="dest"><div class="img"><img src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&h=450&fit=crop" alt="Santorini"></div><div class="body"><h3>Santorini Escape</h3><div class="loc">Greece · 5 nights</div><div class="bottom"><span class="price">From $1,599</span><span class="rating">★ 4.8</span></div></div></div>
<div class="dest"><div class="img"><img src="https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&h=450&fit=crop" alt="Iceland"></div><div class="body"><h3>Iceland Aurora</h3><div class="loc">Europe · 6 nights</div><div class="bottom"><span class="price">From $1,899</span><span class="rating">★ 4.9</span></div></div></div>
</div></section>
<div class="highlights"><div class="hl"><div class="emoji">✈️</div><h4>500+ Trips</h4><p>Curated experiences worldwide</p></div><div class="hl"><div class="emoji">⭐</div><h4>4.9 Rating</h4><p>From 25K+ travelers</p></div><div class="hl"><div class="emoji">🛡️</div><h4>100% Protected</h4><p>Full refund guarantee</p></div><div class="hl"><div class="emoji">🌍</div><h4>70+ Countries</h4><p>Across every continent</p></div></div>
<section class="newsletter"><div class="nl-box"><h3>Get Travel Inspiration</h3><p>Join 50K+ travelers for weekly destination guides and deals.</p><div class="nl-form"><input type="email" placeholder="Enter your email"><button>Subscribe</button></div></div></section>
<footer><p>© 2026 Roam Travel. All rights reserved.</p></footer>
</body></html>`,
  },
  {
    id: "finance-wallet",
    name: "Finance — Digital Wallet",
    category: "Finance",
    description: "Credit card mockup hero, transaction list preview, security trust badges, feature comparison table, and app download CTAs.",
    thumb: "💳",
    getCode: (t: T) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Vault Finance</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:${t.dark};color:${t.text};overflow-x:hidden}a{text-decoration:none;color:inherit}
nav{display:flex;align-items:center;justify-content:space-between;padding:1.5rem 5%;max-width:1400px;margin:0 auto}
.logo{font-size:1.5rem;font-weight:800;color:#fff}.logo span{color:${t.primary}}
nav ul{list-style:none;display:flex;gap:2rem}nav ul a{font-size:.9rem;opacity:.6;font-weight:500;transition:.2s}nav ul a:hover{opacity:1;color:${t.primary}}
.hero{padding:6rem 5%;max-width:1400px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;min-height:85vh}
.hero h1{font-size:3.5rem;font-weight:800;color:#fff;line-height:1.1;margin-bottom:1.5rem}
.hero h1 span{background:linear-gradient(135deg,${t.primary},${t.accent});-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero p{opacity:.5;line-height:1.8;margin-bottom:2rem;max-width:480px}.dl-row{display:flex;gap:1rem}
.dl{background:${t.darkAlt};border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:.85rem 1.5rem;display:flex;align-items:center;gap:.75rem;cursor:pointer;transition:.2s}
.dl:hover{border-color:${t.primary}}.dl .icon{font-size:1.3rem}.dl small{font-size:.6rem;opacity:.5;display:block}.dl strong{font-size:.9rem;color:#fff}
.card-wrap{display:flex;justify-content:center}
.credit-card{width:380px;height:240px;background:linear-gradient(135deg,${t.primary},${t.secondary});border-radius:20px;padding:2rem;position:relative;overflow:hidden;box-shadow:0 30px 60px ${t.primary}30;color:#fff}
.credit-card::before{content:'';position:absolute;width:300px;height:300px;background:rgba(255,255,255,.08);border-radius:50%;top:-50%;right:-20%}
.credit-card::after{content:'';position:absolute;width:200px;height:200px;background:rgba(255,255,255,.05);border-radius:50%;bottom:-30%;left:-10%}
.credit-card .chip{width:45px;height:35px;background:linear-gradient(135deg,#ffd700,#f0c000);border-radius:6px;margin-bottom:2rem;position:relative;z-index:1}
.credit-card .number{font-size:1.3rem;font-weight:600;letter-spacing:3px;margin-bottom:1.5rem;position:relative;z-index:1}
.credit-card .bottom{display:flex;justify-content:space-between;position:relative;z-index:1}
.credit-card .label{font-size:.6rem;opacity:.6;text-transform:uppercase;letter-spacing:1px}.credit-card .value{font-size:.9rem;font-weight:600}
.transactions{padding:5rem 5%;max-width:600px;margin:0 auto}.transactions h2{font-size:2rem;font-weight:800;color:#fff;text-align:center;margin-bottom:2rem}
.tx-list{background:${t.darkAlt};border:1px solid rgba(255,255,255,.06);border-radius:16px;overflow:hidden}
.tx{display:flex;align-items:center;gap:1rem;padding:1rem 1.5rem;border-bottom:1px solid rgba(255,255,255,.04)}.tx:last-child{border-bottom:none}
.tx .tx-icon{width:40px;height:40px;border-radius:10px;background:rgba(255,255,255,.04);display:flex;align-items:center;justify-content:center;font-size:1.1rem}
.tx .tx-info{flex:1}.tx .tx-info h4{font-size:.85rem;color:#fff;font-weight:600}.tx .tx-info span{font-size:.75rem;opacity:.4}
.tx .tx-amount{font-weight:700;font-size:.95rem}.tx .tx-amount.neg{color:#f43f5e}.tx .tx-amount.pos{color:#10b981}.security{padding:5rem 5%;max-width:1200px;margin:0 auto}
.security h2{font-size:2rem;font-weight:800;color:#fff;text-align:center;margin-bottom:2.5rem}.sec-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem}
.sec-item{background:${t.darkAlt};border:1px solid rgba(255,255,255,.06);border-radius:20px;padding:2rem;text-align:center;transition:.3s}
.sec-item:hover{border-color:${t.primary}40;transform:translateY(-5px)}.sec-item .emoji{font-size:2rem;margin-bottom:1rem}
.sec-item h3{color:#fff;font-size:1rem;font-weight:700;margin-bottom:.5rem}.sec-item p{font-size:.85rem;opacity:.5;line-height:1.6}
.stats{padding:4rem 5%;max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem;text-align:center}
.stat{padding:2rem;background:${t.darkAlt};border-radius:16px;border:1px solid rgba(255,255,255,.04)}
.stat .n{font-size:2.2rem;font-weight:800;background:linear-gradient(135deg,${t.primary},${t.accent});-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.stat .l{font-size:.8rem;opacity:.4;margin-top:.25rem}footer{padding:3rem 5%;border-top:1px solid rgba(255,255,255,.05);text-align:center;font-size:.85rem;opacity:.3}
@media(max-width:1024px){.hero{grid-template-columns:1fr;text-align:center}.hero p{margin-left:auto;margin-right:auto}.dl-row{justify-content:center}.credit-card{width:100%;max-width:380px}.sec-grid,.stats{grid-template-columns:repeat(2,1fr)}}
@media(max-width:640px){.hero h1{font-size:2.5rem}nav ul{display:none}.sec-grid,.stats{grid-template-columns:1fr}.dl-row{flex-direction:column;align-items:center}}
</style>
</head>
<body>
<nav><div class="logo">Vault<span>.</span></div><ul><li><a href="#">Features</a></li><li><a href="#">Security</a></li><li><a href="#">About</a></li></ul><a href="#" style="background:${t.primary};color:#fff;padding:.6rem 1.5rem;border-radius:10px;font-weight:600;font-size:.85rem">Get App</a></nav>
<section class="hero"><div><h1>Your Money, <span>Smarter</span></h1><p>Instant transfers, smart budgeting, 4.5% APY savings, and a premium metal card — all in one beautiful app.</p><div class="dl-row"><div class="dl"><span class="icon">🍎</span><div><small>Download on</small><strong>App Store</strong></div></div><div class="dl"><span class="icon">▶️</span><div><small>Get it on</small><strong>Google Play</strong></div></div></div></div><div class="card-wrap"><div class="credit-card"><div class="chip"></div><div class="number">4829 •••• •••• 7291</div><div class="bottom"><div><div class="label">Card Holder</div><div class="value">Alex Morgan</div></div><div><div class="label">Expires</div><div class="value">12/28</div></div></div></div></div></section>
<section class="transactions"><h2>Recent Activity</h2><div class="tx-list">
<div class="tx"><div class="tx-icon">🛒</div><div class="tx-info"><h4>Amazon</h4><span>Today, 2:30 PM</span></div><div class="tx-amount neg">-$49.99</div></div>
<div class="tx"><div class="tx-icon">💰</div><div class="tx-info"><h4>Salary Deposit</h4><span>Yesterday, 9:00 AM</span></div><div class="tx-amount pos">+$4,500.00</div></div>
<div class="tx"><div class="tx-icon">☕</div><div class="tx-info"><h4>Starbucks</h4><span>Oct 20, 8:15 AM</span></div><div class="tx-amount neg">-$6.50</div></div>
<div class="tx"><div class="tx-icon">📊</div><div class="tx-info"><h4>Investment Return</h4><span>Oct 19, 4:00 PM</span></div><div class="tx-amount pos">+$127.30</div></div>
</div></section>
<section class="security"><h2>Bank-Level Security</h2><div class="sec-grid">
<div class="sec-item"><div class="emoji">🔒</div><h3>256-bit Encryption</h3><p>Your data is protected with the same encryption used by major banks.</p></div>
<div class="sec-item"><div class="emoji">👆</div><h3>Biometric Auth</h3><p>Face ID, fingerprint, and PIN for multi-layer account protection.</p></div>
<div class="sec-item"><div class="emoji">🛡️</div><h3>FDIC Insured</h3><p>Your deposits are insured up to $250,000 by the FDIC.</p></div>
</div></section>
<div class="stats"><div class="stat"><div class="n">8M+</div><div class="l">Users</div></div><div class="stat"><div class="n">$0</div><div class="l">Fees</div></div><div class="stat"><div class="n">4.5%</div><div class="l">APY</div></div><div class="stat"><div class="n">180+</div><div class="l">Countries</div></div></div>
<footer><p>© 2026 Vault Finance. FDIC Insured. All rights reserved.</p></footer>
</body></html>`,
  },
  {
    id: "startup-countdown",
    name: "Startup — Launch Countdown",
    category: "Startup",
    description: "Pre-launch page with animated gradient background, countdown timer display, 3-step feature preview, founder profiles, and waitlist with social proof.",
    thumb: "⏳",
    getCode: (t: T) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Pulse — Launching Soon</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:${t.dark};color:${t.text};overflow-x:hidden}a{text-decoration:none;color:inherit}
@keyframes bg-shift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
.hero-bg{position:fixed;inset:0;background:linear-gradient(135deg,${t.dark},${t.primary}08,${t.secondary}06,${t.dark});background-size:400% 400%;animation:bg-shift 15s ease infinite;z-index:0}
nav{position:relative;z-index:1;display:flex;align-items:center;justify-content:space-between;padding:1.5rem 5%;max-width:1200px;margin:0 auto}
.logo{font-size:1.5rem;font-weight:800;color:#fff}.logo span{color:${t.primary}}
.hero{position:relative;z-index:1;min-height:90vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:2rem 5%}.hero-content{max-width:750px}
.badge{display:inline-flex;align-items:center;gap:.5rem;background:${t.primary}10;border:1px solid ${t.primary}25;border-radius:50px;padding:.5rem 1.25rem;font-size:.8rem;font-weight:600;color:${t.primary};margin-bottom:2rem}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}.badge .dot{width:8px;height:8px;border-radius:50%;background:${t.primary};animation:blink 2s infinite}
.hero h1{font-size:4rem;font-weight:900;color:#fff;line-height:1.08;margin-bottom:1.5rem}
.hero h1 span{background:linear-gradient(135deg,${t.primary},${t.accent});-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero p{font-size:1.1rem;opacity:.5;line-height:1.7;margin-bottom:3rem;max-width:550px;margin-left:auto;margin-right:auto}
.countdown{display:flex;gap:1.5rem;justify-content:center;margin-bottom:3rem}
.cd-item{background:${t.darkAlt};border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:1.5rem 2rem;min-width:90px;text-align:center}
.cd-item .num{font-size:2.5rem;font-weight:900;color:#fff;line-height:1}.cd-item .label{font-size:.7rem;text-transform:uppercase;letter-spacing:1px;opacity:.4;margin-top:.5rem}
.waitlist{display:flex;gap:.75rem;justify-content:center;margin-bottom:2rem;max-width:480px;margin-left:auto;margin-right:auto}
.waitlist input{flex:1;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:1rem 1.5rem;color:#fff;font-size:1rem;outline:none;font-family:inherit}
.waitlist input:focus{border-color:${t.primary}}
.waitlist button{background:linear-gradient(135deg,${t.primary},${t.secondary});color:#fff;padding:1rem 2rem;border-radius:12px;font-weight:700;border:none;cursor:pointer;font-size:1rem;white-space:nowrap;transition:.2s}
.waitlist button:hover{box-shadow:0 10px 35px ${t.primary}50;transform:translateY(-2px)}.social-proof{display:flex;align-items:center;gap:1rem;justify-content:center}
.sp-avatars{display:flex}.sp-avatars span{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,${t.primary},${t.accent});border:2px solid ${t.dark};margin-left:-8px;display:flex;align-items:center;justify-content:center;font-size:.65rem;color:#fff}
.social-proof p{font-size:.85rem;opacity:.5}.social-proof strong{color:#fff}.how{position:relative;z-index:1;padding:6rem 5%;max-width:1000px;margin:0 auto}
.how h2{font-size:2rem;font-weight:800;color:#fff;text-align:center;margin-bottom:3rem}.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem}
.step{text-align:center;padding:2rem;background:${t.darkAlt};border:1px solid rgba(255,255,255,.06);border-radius:20px;transition:.3s}
.step:hover{border-color:${t.primary}30;transform:translateY(-5px)}
.step .num{width:48px;height:48px;border-radius:14px;background:linear-gradient(135deg,${t.primary},${t.secondary});color:#fff;font-size:1.2rem;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 1.25rem}
.step h3{color:#fff;font-size:1.05rem;font-weight:700;margin-bottom:.5rem}.step p{font-size:.85rem;opacity:.5;line-height:1.6}
.founders{position:relative;z-index:1;padding:6rem 5%;max-width:800px;margin:0 auto;text-align:center}.founders h2{font-size:2rem;font-weight:800;color:#fff;margin-bottom:2.5rem}
.founder-row{display:grid;grid-template-columns:repeat(2,1fr);gap:2rem}
.founder{background:${t.darkAlt};border:1px solid rgba(255,255,255,.06);border-radius:20px;padding:2rem;text-align:center}
.founder img{width:80px;height:80px;border-radius:50%;object-fit:cover;margin-bottom:1rem;border:3px solid ${t.primary}25}
.founder h4{color:#fff;font-size:1rem;font-weight:700;margin-bottom:.25rem}.founder .title{color:${t.primary};font-size:.8rem;font-weight:500;margin-bottom:.75rem}
.founder p{font-size:.8rem;opacity:.5;line-height:1.6}
footer{position:relative;z-index:1;padding:3rem 5%;border-top:1px solid rgba(255,255,255,.05);text-align:center;font-size:.85rem;opacity:.3}
@media(max-width:768px){.hero h1{font-size:2.5rem}.countdown{flex-wrap:wrap;gap:1rem}.cd-item{min-width:70px;padding:1rem 1.25rem}.cd-item .num{font-size:1.8rem}.steps,.founder-row{grid-template-columns:1fr}.waitlist{flex-direction:column}nav ul{display:none}}
</style>
</head>
<body>
<div class="hero-bg"></div>
<nav><div class="logo">Pulse<span>.</span></div><ul><li><a href="#">Features</a></li><li><a href="#">About</a></li></ul></nav>
<section class="hero"><div class="hero-content">
<div class="badge"><span class="dot"></span> Launching January 2027</div>
<h1>The Future of <span>Team Collaboration</span></h1>
<p>A new way to work together — combining real-time docs, project tracking, and AI assistance in one seamless platform.</p>
<div class="countdown">
<div class="cd-item"><div class="num">72</div><div class="label">Days</div></div>
<div class="cd-item"><div class="num">14</div><div class="label">Hours</div></div>
<div class="cd-item"><div class="num">38</div><div class="label">Minutes</div></div>
<div class="cd-item"><div class="num">05</div><div class="label">Seconds</div></div>
</div>
<div class="waitlist"><input type="email" placeholder="Enter your email"><button>Join Waitlist →</button></div>
<div class="social-proof"><div class="sp-avatars"><span>J</span><span>A</span><span>M</span><span>K</span><span>+</span></div><p><strong>18,400+</strong> on the waitlist</p></div>
</div></section>
<section class="how"><h2>How Pulse Works</h2><div class="steps">
<div class="step"><div class="num">1</div><h3>Create a Space</h3><p>Set up your workspace in seconds. Invite your team with one link.</p></div>
<div class="step"><div class="num">2</div><h3>Collaborate Live</h3><p>Real-time documents, whiteboards, and video — all in one place.</p></div>
<div class="step"><div class="num">3</div><h3>Ship Faster</h3><p>AI automates the busywork so your team can focus on what matters.</p></div>
</div></section>
<section class="founders"><h2>Meet the Founders</h2><div class="founder-row">
<div class="founder"><img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop" alt="Founder"><h4>Alex Rivera</h4><div class="title">CEO — Ex Google</div><p>Former product lead at Google Workspace. 12 years building collaboration tools.</p></div>
<div class="founder"><img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop" alt="Founder"><h4>Priya Sharma</h4><div class="title">CTO — Ex Notion</div><p>Engineering lead who scaled Notion's real-time system to 30M+ users.</p></div>
</div></section>
<footer><p>© 2026 Pulse Labs Inc. All rights reserved.</p></footer>
</body></html>`,
  },
  {
    id: "beauty-radiance",
    name: "Beauty — Soft Radiance",
    category: "Beauty / Lifestyle",
    description: "Light sage/mint theme inspired by premium skincare brands. Product hero, ingredient highlights, skincare routine steps, testimonials, and elegant shop CTA.",
    thumb: "🌸",
    getCode: (t: T) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Bloom Skincare</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:#f7f9f4;color:#555;overflow-x:hidden}a{text-decoration:none;color:inherit}
:root{--sage:${t.primary};--sage-light:${t.light};--dark:#2c3e2d}
nav{display:flex;align-items:center;justify-content:space-between;padding:1.25rem 5%;max-width:1300px;margin:0 auto}
.logo{font-family:'Cormorant Garamond',serif;font-size:1.8rem;font-weight:700;color:var(--dark)}.logo span{color:var(--sage)}
nav ul{list-style:none;display:flex;gap:2rem}nav ul a{font-size:.9rem;color:#888;font-weight:500;transition:.2s}nav ul a:hover{color:var(--sage)}
.btn-shop{background:var(--sage);color:#fff;padding:.7rem 1.5rem;border-radius:50px;font-weight:600;font-size:.85rem;border:none;cursor:pointer;transition:.2s;box-shadow:0 4px 15px ${t.primary}30}.btn-shop:hover{box-shadow:0 6px 25px ${t.primary}50;transform:translateY(-1px)}
.hero{padding:4rem 5%;max-width:1300px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;min-height:80vh}
.hero h1{font-family:'Cormorant Garamond',serif;font-size:4rem;font-weight:700;color:var(--dark);line-height:1.1;margin-bottom:1rem}
.hero h1 span{color:var(--sage);font-style:italic}.hero p{color:#888;font-size:1.05rem;line-height:1.7;margin-bottom:2rem;max-width:440px}
.hero-cta{display:flex;gap:1rem;align-items:center}
.btn-main{background:var(--sage);color:#fff;padding:1rem 2.5rem;border-radius:50px;font-weight:700;border:none;cursor:pointer;font-size:1rem;transition:.2s;box-shadow:0 6px 20px ${t.primary}30}.btn-main:hover{box-shadow:0 10px 35px ${t.primary}50;transform:translateY(-2px)}
.btn-text{color:var(--sage);font-weight:600;font-size:.95rem;display:flex;align-items:center;gap:.5rem}.hero-img{position:relative}
.hero-img img{width:100%;border-radius:30px;box-shadow:0 20px 50px rgba(0,0,0,.06)}
.hero-float{position:absolute;background:#fff;border-radius:16px;padding:1rem 1.5rem;box-shadow:0 10px 30px rgba(0,0,0,.06);display:flex;align-items:center;gap:.75rem}
.hero-float.hf1{top:10%;right:-20px}.hero-float.hf2{bottom:15%;left:-20px}.hero-float .emoji{font-size:1.3rem}.hero-float span{font-size:.8rem;font-weight:600;color:var(--dark)}
.hero-float small{display:block;font-size:.65rem;color:#aaa;font-weight:400}.ingredients{padding:5rem 5%;background:#fff}.ing-inner{max-width:1300px;margin:0 auto}
.sec-head{text-align:center;margin-bottom:3rem}.sec-head span{color:var(--sage);font-size:.8rem;text-transform:uppercase;letter-spacing:2px;font-weight:600}.sec-head h2{font-family:'Cormorant Garamond',serif;font-size:2.5rem;font-weight:700;color:var(--dark);margin-top:.5rem}
.ing-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem}.ing-card{text-align:center;padding:2rem 1.5rem;border-radius:20px;background:#f7f9f4;transition:.3s}
.ing-card:hover{transform:translateY(-5px);box-shadow:0 10px 30px rgba(0,0,0,.04)}.ing-card .emoji{font-size:2.5rem;margin-bottom:1rem}
.ing-card h3{font-size:1rem;font-weight:700;color:var(--dark);margin-bottom:.5rem}.ing-card p{font-size:.8rem;color:#999;line-height:1.6}
.routine{padding:5rem 5%;max-width:1000px;margin:0 auto}.routine-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem;position:relative}
.routine-steps::before{content:'';position:absolute;top:50px;left:10%;right:10%;height:2px;background:linear-gradient(90deg,${t.primary}30,${t.primary},${t.primary}30)}
.r-step{text-align:center;position:relative;z-index:1}
.r-step .circle{width:100px;height:100px;border-radius:50%;background:#fff;border:3px solid var(--sage);display:flex;align-items:center;justify-content:center;font-size:2rem;margin:0 auto 1.25rem;box-shadow:0 8px 25px ${t.primary}15}
.r-step h3{font-size:1rem;font-weight:700;color:var(--dark);margin-bottom:.5rem}.r-step p{font-size:.85rem;color:#999;line-height:1.6}.products{padding:5rem 5%;background:#fff}
.prod-inner{max-width:1300px;margin:0 auto}.prod-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem}
.prod{background:#f7f9f4;border-radius:20px;overflow:hidden;transition:.3s;border:1px solid #eee}.prod:hover{transform:translateY(-5px);box-shadow:0 15px 40px rgba(0,0,0,.06)}
.prod img{width:100%;aspect-ratio:1;object-fit:cover}.prod .info{padding:1.5rem}.prod .info h3{font-size:1rem;font-weight:700;color:var(--dark);margin-bottom:.25rem}
.prod .info .type{font-size:.8rem;color:#aaa;margin-bottom:.75rem}.prod .info .price-row{display:flex;justify-content:space-between;align-items:center}
.prod .info .price{color:var(--sage);font-weight:700;font-size:1.1rem}
.prod .info .add{background:var(--sage);color:#fff;border:none;width:36px;height:36px;border-radius:50%;cursor:pointer;font-size:1rem;display:flex;align-items:center;justify-content:center;transition:.2s}.prod .info .add:hover{box-shadow:0 4px 12px ${t.primary}40}
.testimonial{padding:5rem 5%;max-width:700px;margin:0 auto;text-align:center}
.testimonial blockquote{font-family:'Cormorant Garamond',serif;font-size:1.6rem;font-weight:500;color:var(--dark);font-style:italic;line-height:1.5;margin-bottom:1.5rem}
.testimonial .stars{color:var(--sage);font-size:1rem;margin-bottom:1rem}.testimonial .author{font-size:.85rem;color:#aaa}.testimonial .author strong{color:var(--dark)}
.cta{padding:5rem 5%}
.cta-box{max-width:900px;margin:0 auto;text-align:center;background:linear-gradient(135deg,${t.light},#fff);border:1px solid ${t.primary}20;border-radius:28px;padding:4rem 3rem}
.cta-box h2{font-family:'Cormorant Garamond',serif;font-size:2.5rem;font-weight:700;color:var(--dark);margin-bottom:1rem}
.cta-box p{color:#888;margin-bottom:2rem;max-width:450px;margin-left:auto;margin-right:auto}
footer{padding:3rem 5%;text-align:center;font-size:.85rem;color:#ccc;border-top:1px solid #eee}
@media(max-width:1024px){.hero{grid-template-columns:1fr;text-align:center}.hero p{margin-left:auto;margin-right:auto}.hero-cta{justify-content:center}.hero-img{max-width:500px;margin:0 auto}.ing-grid,.prod-grid{grid-template-columns:repeat(2,1fr)}.hero-float{display:none}}
@media(max-width:640px){.hero h1{font-size:2.5rem}nav ul{display:none}.ing-grid,.prod-grid,.routine-steps{grid-template-columns:1fr}.routine-steps::before{display:none}}
</style>
</head>
<body>
<nav><div class="logo">Bloom<span>.</span></div><ul><li><a href="#">Shop</a></li><li><a href="#">Ingredients</a></li><li><a href="#">Routine</a></li><li><a href="#">About</a></li></ul><button class="btn-shop">Shop Now</button></nav>
<section class="hero"><div><h1>Discover <span>Radiant</span> Skin</h1><p>Luxurious, plant-powered skincare crafted with the purest botanical ingredients. Clean beauty that actually works.</p><div class="hero-cta"><button class="btn-main">Shop Collection</button><span class="btn-text">Learn More →</span></div></div><div class="hero-img"><img src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=700&fit=crop" alt="Skincare"><div class="hero-float hf1"><span class="emoji">🌿</span><div><span>100% Natural</span><small>Clean ingredients</small></div></div><div class="hero-float hf2"><span class="emoji">⭐</span><div><span>50K+ Reviews</span><small>4.9 average rating</small></div></div></div></section>
<section class="ingredients"><div class="ing-inner"><div class="sec-head"><span>Our Ingredients</span><h2>Powered by Nature</h2></div><div class="ing-grid">
<div class="ing-card"><div class="emoji">🥑</div><h3>Avocado Oil</h3><p>Deep hydration and nourishment for all skin types.</p></div>
<div class="ing-card"><div class="emoji">🌹</div><h3>Rose Extract</h3><p>Anti-inflammatory properties that soothe and tone skin.</p></div>
<div class="ing-card"><div class="emoji">🍵</div><h3>Green Tea</h3><p>Rich antioxidants that protect against environmental damage.</p></div>
<div class="ing-card"><div class="emoji">🍯</div><h3>Manuka Honey</h3><p>Natural antibacterial healing and moisture retention.</p></div>
</div></div></section>
<section class="routine"><div class="sec-head"><span>Your Routine</span><h2>3 Steps to Glow</h2></div><div class="routine-steps">
<div class="r-step"><div class="circle">🧴</div><h3>Cleanse</h3><p>Gently remove impurities with our botanical cleanser. Morning and night.</p></div>
<div class="r-step"><div class="circle">💧</div><h3>Hydrate</h3><p>Apply our hyaluronic serum to lock in deep, lasting moisture.</p></div>
<div class="r-step"><div class="circle">✨</div><h3>Protect</h3><p>Seal with our SPF moisturizer for all-day radiance and protection.</p></div>
</div></section>
<section class="products"><div class="prod-inner"><div class="sec-head"><span>Bestsellers</span><h2>Our Top Products</h2></div><div class="prod-grid">
<div class="prod"><img src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=400&fit=crop" alt="Serum"><div class="info"><h3>Radiance Serum</h3><div class="type">Hydrating · 30ml</div><div class="price-row"><span class="price">$48</span><button class="add">+</button></div></div></div>
<div class="prod"><img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop" alt="Cream"><div class="info"><h3>Glow Moisturizer</h3><div class="type">Day Cream · 50ml</div><div class="price-row"><span class="price">$52</span><button class="add">+</button></div></div></div>
<div class="prod"><img src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop" alt="Cleanser"><div class="info"><h3>Botanical Cleanser</h3><div class="type">Gentle Foam · 120ml</div><div class="price-row"><span class="price">$36</span><button class="add">+</button></div></div></div>
</div></div></section>
<section class="testimonial"><div class="stars">★★★★★</div><blockquote>"After just two weeks, my skin has never looked better. The Radiance Serum is truly magical — I'm never going back."</blockquote><div class="author"><strong>Emma L.</strong> — Verified Buyer</div></section>
<section class="cta"><div class="cta-box"><h2>Ready for Your Best Skin?</h2><p>Join 50,000+ women who transformed their skincare routine with Bloom.</p><button class="btn-main" style="font-size:1.05rem;padding:1.1rem 3rem">Shop the Collection →</button></div></section>
<footer><p>© 2026 Bloom Skincare. Cruelty-free. All rights reserved.</p></footer>
</body></html>`,
  },
];
