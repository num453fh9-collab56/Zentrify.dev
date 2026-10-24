export const premiumTemplatesB = [

  // ═══════════════════════════════════════════════════════════════
  // 4. HEALTHCARE — Aster Health
  // ═══════════════════════════════════════════════════════════════
  {
    id: "premium-aster-health",
    name: "Aster Health — Modern Clinic",
    category: "Healthcare",
    description: "Calm mint-and-cream clinic page with rounded appointment card, soft service tiles and reassuring stat strip.",
    thumb: "🩺",
    getCode: () => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Aster Health</title>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Plus Jakarta Sans',sans-serif;background:#eef6f1;color:#123a31;overflow-x:hidden}a{text-decoration:none;color:inherit}
nav{display:flex;align-items:center;justify-content:space-between;padding:1.4rem 5%;max-width:1280px;margin:0 auto}
.logo{display:flex;align-items:center;gap:.6rem;font-weight:800;font-size:1.2rem;letter-spacing:-.02em}.logo i{width:34px;height:34px;border-radius:50%;background:#123a31;color:#fff;display:flex;align-items:center;justify-content:center;font-style:normal;font-size:1rem}
nav ul{list-style:none;display:flex;gap:2rem;font-size:.86rem;font-weight:500;color:#4c6a62}nav ul a:hover{color:#123a31}
.nav-btn{background:#123a31;color:#fff;padding:.8rem 1.6rem;border-radius:50px;font-size:.84rem;font-weight:700;transition:.25s}.nav-btn:hover{background:#ff7a59}
.hero{max-width:1280px;margin:0 auto;padding:3.5rem 5% 4.5rem;display:grid;grid-template-columns:1.05fr .95fr;gap:3.5rem;align-items:center}
.pill{display:inline-flex;align-items:center;gap:.5rem;background:#fff;border:1px solid #dbe9e2;border-radius:50px;padding:.45rem 1rem;font-size:.72rem;font-weight:700;color:#4c6a62;margin-bottom:1.3rem}
.pill i{width:7px;height:7px;border-radius:50%;background:#3fbf8f;font-style:normal}
h1{font-size:3.9rem;line-height:1.04;letter-spacing:-.045em;font-weight:800;margin-bottom:1.3rem}
h1 span{color:#ff7a59}
.hero p{color:#5b776f;line-height:1.8;max-width:460px;font-size:1rem;margin-bottom:2rem}
.actions{display:flex;gap:1rem;flex-wrap:wrap;align-items:center}
.btn{background:#ff7a59;color:#fff;padding:1rem 2rem;border-radius:50px;font-size:.9rem;font-weight:700;box-shadow:0 10px 24px rgba(255,122,89,.3);transition:.25s}.btn:hover{transform:translateY(-2px);box-shadow:0 14px 30px rgba(255,122,89,.4)}
.link{font-size:.88rem;font-weight:700;color:#123a31;border-bottom:1.5px solid #123a31;padding-bottom:2px}
.cardwrap{position:relative}
.photo{border-radius:150px 150px 28px 28px;overflow:hidden;height:470px}
.photo img{width:100%;height:100%;object-fit:cover}
.appt{position:absolute;left:-24px;bottom:-26px;width:310px;background:#fff;border-radius:20px;padding:1.3rem;box-shadow:0 24px 50px rgba(18,58,49,.16);border:1px solid #e4efe9}
.appt .hd{display:flex;justify-content:space-between;align-items:center;margin-bottom:.9rem}
.appt .hd b{font-size:.85rem}.appt .hd span{font-size:.66rem;font-weight:700;color:#3fbf8f;background:#e8f7f0;padding:.3rem .55rem;border-radius:50px}
.slot{display:flex;gap:.5rem;margin-bottom:.75rem}
.slot div{flex:1;border:1px solid #e0ece6;border-radius:10px;padding:.5rem;text-align:center;font-size:.68rem;font-weight:700;color:#5b776f}
.slot div.on{background:#123a31;color:#fff;border-color:#123a31}
.appt button{width:100%;border:none;background:#ff7a59;color:#fff;padding:.7rem;border-radius:10px;font-family:inherit;font-size:.78rem;font-weight:700;cursor:pointer}
.strip{max-width:1180px;margin:0 auto 4rem;background:#123a31;border-radius:26px;padding:2.2rem 2.5rem;display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem;color:#fff}
.strip div{text-align:center;border-right:1px solid rgba(255,255,255,.12)}.strip div:last-child{border:none}
.strip b{display:block;font-size:1.9rem;font-weight:800;letter-spacing:-.03em}.strip span{font-size:.72rem;color:rgba(255,255,255,.6)}
.section{max-width:1180px;margin:0 auto;padding:0 5% 5rem}
.head{display:flex;justify-content:space-between;align-items:end;gap:2rem;margin-bottom:2.2rem;flex-wrap:wrap}
.head h2{font-size:2.3rem;letter-spacing:-.035em;line-height:1.1;max-width:450px}
.head p{color:#5b776f;font-size:.9rem;max-width:320px;line-height:1.7}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.2rem}
.svc{background:#fff;border:1px solid #e0ece6;border-radius:20px;padding:1.8rem;transition:.3s}
.svc:hover{transform:translateY(-5px);box-shadow:0 18px 36px rgba(18,58,49,.08)}
.svc .ic{width:48px;height:48px;border-radius:14px;background:#eef6f1;display:flex;align-items:center;justify-content:center;font-size:1.25rem;margin-bottom:1rem}
.svc h3{font-size:1.05rem;margin-bottom:.45rem;letter-spacing:-.01em}.svc p{font-size:.83rem;color:#5b776f;line-height:1.7}
.svc a{display:inline-block;margin-top:1rem;font-size:.78rem;font-weight:700;color:#ff7a59}
footer{padding:2.5rem 5%;text-align:center;font-size:.76rem;color:#7c958d}
@media(max-width:960px){.hero{grid-template-columns:1fr;gap:2.5rem}.photo{height:380px}.appt{position:relative;left:0;bottom:0;margin:-40px auto 0;width:min(340px,92%)}.strip{grid-template-columns:1fr 1fr}.strip div:nth-child(2){border:none}.grid{grid-template-columns:1fr 1fr}}
@media(max-width:640px){nav ul{display:none}h1{font-size:2.7rem}.grid{grid-template-columns:1fr}.strip{grid-template-columns:1fr}.strip div{border:none}.head h2{font-size:1.9rem}}
</style>
</head>
<body>
<nav><a href="#" class="logo"><i>✳</i>Aster Health</a><ul><li><a href="#care">Care</a></li><li><a href="#">Doctors</a></li><li><a href="#">Locations</a></li></ul><a href="#book" class="nav-btn">Book a visit</a></nav>
<section class="hero">
<div><div class="pill"><i></i>Same-day appointments available</div><h1>Healthcare that<br>feels like <span>care.</span></h1><p>Primary care, diagnostics and wellbeing under one calm roof — with doctors who actually have time for you.</p><div class="actions"><a href="#book" class="btn">Book an appointment</a><a href="#care" class="link">Explore our care</a></div></div>
<div class="cardwrap"><div class="photo"><img src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&h=1000&fit=crop" alt="Doctor"></div><div class="appt"><div class="hd"><b>Next available</b><span>Today</span></div><div class="slot"><div>09:30</div><div class="on">11:00</div><div>14:30</div></div><button>Reserve 11:00 →</button></div></div>
</section>
<div class="strip"><div><b>28</b><span>Care specialists</span></div><div><b>4.9</b><span>Patient rating</span></div><div><b>15min</b><span>Avg. wait time</span></div><div><b>3</b><span>City locations</span></div></div>
<section class="section" id="care"><div class="head"><h2>Everything your family needs, in one place.</h2><p>From a quick check-up to ongoing care, our team stays with you.</p></div>
<div class="grid">
<div class="svc"><div class="ic">🩺</div><h3>Primary Care</h3><p>Annual checks, sick visits and preventive plans with your own doctor.</p><a href="#">Learn more →</a></div>
<div class="svc"><div class="ic">🧪</div><h3>Diagnostics</h3><p>On-site labs and imaging with results explained in plain language.</p><a href="#">Learn more →</a></div>
<div class="svc"><div class="ic">🌿</div><h3>Wellbeing</h3><p>Nutrition, sleep and mental-health support built into your care plan.</p><a href="#">Learn more →</a></div>
</div></section>
<footer id="book">© 2026 Aster Health · Care with time to listen</footer>
</body></html>`,
  },

  // ═══════════════════════════════════════════════════════════════
  // 5. FINANCE — Fern & Co.
  // ═══════════════════════════════════════════════════════════════
  {
    id: "premium-fern-finance",
    name: "Fern & Co. — Private Finance",
    category: "Finance",
    description: "Quiet-luxury finance page in deep forest green and ivory, with a CSS membership card, fee clarity and private-banking tone.",
    thumb: "🌿",
    getCode: () => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Fern &amp; Co.</title>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:#f4f0e6;color:#122b24;overflow-x:hidden}a{text-decoration:none;color:inherit}
nav{display:flex;align-items:center;justify-content:space-between;padding:1.6rem 5%;max-width:1300px;margin:0 auto;border-bottom:1px solid rgba(18,43,36,.14)}
.logo{font-family:'DM Serif Display',serif;font-size:1.6rem;letter-spacing:.02em}.logo span{color:#b58a4a}
nav ul{list-style:none;display:flex;gap:2.2rem;font-size:.82rem;font-weight:500;color:#4e625a}nav ul a:hover{color:#122b24}
.nav-btn{border:1px solid #122b24;padding:.65rem 1.4rem;border-radius:2px;font-size:.7rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;transition:.25s}.nav-btn:hover{background:#122b24;color:#f4f0e6}
.hero{max-width:1100px;margin:0 auto;padding:5rem 5% 3rem;text-align:center;position:relative}
.eyebrow{font-size:.68rem;font-weight:600;letter-spacing:.28em;text-transform:uppercase;color:#b58a4a;margin-bottom:1.4rem}
h1{font-family:'DM Serif Display',serif;font-size:4.8rem;line-height:1.02;font-weight:400;letter-spacing:-.02em;margin-bottom:1.4rem}
h1 em{font-style:italic;color:#b58a4a}
.hero p{color:#5b6d65;line-height:1.85;max-width:540px;margin:0 auto 2.2rem;font-size:.98rem}
.actions{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap}
.btn{background:#0d3b2e;color:#f4f0e6;padding:1rem 2.2rem;border-radius:2px;font-size:.72rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;transition:.25s}.btn:hover{background:#b58a4a}
.link{font-size:.72rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;border-bottom:1px solid #122b24;padding-bottom:4px}
.cards{position:relative;max-width:740px;margin:4rem auto 0;height:270px}
.cc{position:absolute;width:360px;height:220px;border-radius:18px;padding:1.6rem;text-align:left;box-shadow:0 30px 60px rgba(13,59,46,.22)}
.cc.back{left:calc(50% - 300px);top:20px;transform:rotate(-9deg);background:#d9c9a8;color:#122b24}
.cc.front{left:calc(50% - 60px);top:0;transform:rotate(7deg);background:linear-gradient(135deg,#0d3b2e,#165443);color:#f4f0e6}
.cc .brand{font-family:'DM Serif Display',serif;font-size:1.1rem;letter-spacing:.04em}.cc .brand span{color:#d9c9a8}
.cc .chip{width:38px;height:28px;border-radius:5px;background:linear-gradient(135deg,#d9c9a8,#b58a4a);margin:2.2rem 0 1.6rem}
.cc .num{font-family:'Inter',sans-serif;font-size:.86rem;letter-spacing:.22em;opacity:.9}
.cc .row{display:flex;justify-content:space-between;align-items:end;margin-top:1.2rem;font-size:.58rem;letter-spacing:.12em;text-transform:uppercase;opacity:.7}
.cc .row b{font-size:.75rem;display:block;letter-spacing:.06em;margin-top:.25rem;opacity:1}
.metrics{display:grid;grid-template-columns:repeat(3,1fr);max-width:1000px;margin:1rem auto 0;padding:2.5rem 5%;border-top:1px solid rgba(18,43,36,.14);border-bottom:1px solid rgba(18,43,36,.14);text-align:center}
.metrics b{display:block;font-family:'DM Serif Display',serif;font-size:2.4rem;font-weight:400}.metrics span{font-size:.68rem;letter-spacing:.16em;text-transform:uppercase;color:#7a8a82}
.section{max-width:1100px;margin:0 auto;padding:5rem 5%}
.section .split{display:grid;grid-template-columns:.9fr 1.1fr;gap:4rem;align-items:start}
.section h2{font-family:'DM Serif Display',serif;font-size:2.8rem;font-weight:400;line-height:1.12}
.section .lead{color:#5b6d65;line-height:1.8;font-size:.92rem;margin-top:1rem}
.feats{display:grid;gap:0}
.feat{display:grid;grid-template-columns:44px 1fr;gap:1rem;padding:1.4rem 0;border-bottom:1px solid rgba(18,43,36,.12)}
.feat:first-child{padding-top:0}.feat .n{font-size:.7rem;font-weight:600;color:#b58a4a;padding-top:.2rem}
.feat h3{font-size:1.02rem;font-weight:600;margin-bottom:.3rem}.feat p{font-size:.83rem;color:#5b6d65;line-height:1.7}
.cta{background:#0d3b2e;color:#f4f0e6;padding:4.5rem 5%;text-align:center}
.cta h2{font-family:'DM Serif Display',serif;font-size:2.9rem;font-weight:400;margin-bottom:.8rem}
.cta p{color:rgba(244,240,230,.65);margin-bottom:1.9rem;font-size:.9rem}
.cta .btn{background:#f4f0e6;color:#0d3b2e}.cta .btn:hover{background:#b58a4a;color:#fff}
footer{padding:2rem 5%;text-align:center;font-size:.7rem;color:#7a8a82}
@media(max-width:900px){.hero h1{font-size:3.5rem}.section .split{grid-template-columns:1fr;gap:2rem}.metrics{grid-template-columns:1fr;gap:1.5rem;text-align:left}.metrics div{border-bottom:1px solid rgba(18,43,36,.1);padding-bottom:1rem}}
@media(max-width:640px){nav ul{display:none}.hero h1{font-size:2.7rem}.cards{transform:scale(.78);transform-origin:top center;height:210px;margin-top:2rem}.cc.front{left:calc(50% - 120px)}.cc.back{left:calc(50% - 240px)}}
</style>
</head>
<body>
<nav><a href="#" class="logo">Fern <span>&amp;</span> Co.</a><ul><li><a href="#">Private clients</a></li><li><a href="#">Business</a></li><li><a href="#">Insights</a></li></ul><a href="#open" class="nav-btn">Open an account</a></nav>
<section class="hero">
<div class="eyebrow">Private finance · Since 1994</div>
<h1>Wealth, kept<br><em>quietly</em> simple.</h1>
<p>Discreet planning, transparent fees and long-term thinking for families and founders. No noise, no jargon, no surprises.</p>
<div class="actions"><a href="#open" class="btn">Request an introduction</a><a href="#how" class="link">How we work</a></div>
<div class="cards"><div class="cc back"><div class="brand">Fern &amp; Co.</div><div class="chip"></div><div class="num">5412 8840 1290 66</div><div class="row"><span>Member<b>Since 2011</b></span><span>Private<b>Reserve</b></span></div></div><div class="cc front"><div class="brand">Fern <span>&amp;</span> Co.</div><div class="chip"></div><div class="num">5412 7719 0042 18</div><div class="row"><span>Member<b>A. MORGAN</b></span><span>Private<b>Reserve</b></span></div></div></div>
</section>
<div class="metrics"><div><b>£2.4B</b><span>Assets guided</span></div><div><b>31</b><span>Years of counsel</span></div><div><b>0.6%</b><span>Average annual fee</span></div></div>
<section class="section" id="how"><div class="split"><div><h2>Built around your life, not a product.</h2><p class="lead">One dedicated adviser, one clear plan, and a team of specialists behind them. We only succeed when your plan does.</p></div>
<div class="feats">
<div class="feat"><div class="n">01</div><div><h3>Clear, flat fees</h3><p>No commissions, no hidden trailers. You always know what you pay and why.</p></div></div>
<div class="feat"><div class="n">02</div><div><h3>Fiduciary by design</h3><p>We are legally bound to act in your interest — never a provider's.</p></div></div>
<div class="feat"><div class="n">03</div><div><h3>Long-term partnership</h3><p>Plans built for decades, reviewed twice a year, adjusted as life changes.</p></div></div>
</div></div></section>
<section class="cta" id="open"><h2>A quieter way to grow.</h2><p>Introductions are personal. Tell us a little about what you're planning.</p><a href="#" class="btn">Start a conversation</a></section>
<footer>© 2026 Fern &amp; Co. Private Finance · Authorised and regulated</footer>
</body></html>`,
  },

  // ═══════════════════════════════════════════════════════════════
  // 6. TRAVEL — Dune Atlas
  // ═══════════════════════════════════════════════════════════════
  {
    id: "premium-dune-atlas",
    name: "Dune Atlas — Desert Journeys",
    category: "Travel",
    description: "Sun-baked travel page with full-bleed dune hero, terracotta type, itinerary cards and a slow-travel editorial voice.",
    thumb: "🏜️",
    getCode: () => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Dune Atlas</title>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,400&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:#efe4d2;color:#2b1d12;overflow-x:hidden}a{text-decoration:none;color:inherit}
.hero{position:relative;min-height:88vh;display:flex;flex-direction:column;overflow:hidden;color:#fff}
.hero img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.hero::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(43,29,18,.45),rgba(43,29,18,.1) 45%,rgba(43,29,18,.55))}
nav{position:relative;z-index:3;display:flex;align-items:center;justify-content:space-between;padding:1.5rem 5%;max-width:1350px;width:100%;margin:0 auto}
.logo{font-family:'Fraunces',serif;font-size:1.45rem;letter-spacing:.02em}.logo span{color:#ffcfa3}
nav ul{list-style:none;display:flex;gap:2.2rem;font-size:.78rem;font-weight:500;letter-spacing:.06em}nav ul a{opacity:.9}nav ul a:hover{opacity:1}
.nav-btn{border:1px solid rgba(255,255,255,.6);padding:.65rem 1.4rem;border-radius:50px;font-size:.7rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;transition:.25s}.nav-btn:hover{background:#fff;color:#2b1d12}
.hero-copy{position:relative;z-index:3;max-width:1000px;margin:auto;padding:6rem 5%;text-align:center}
.eyebrow{font-size:.68rem;font-weight:600;letter-spacing:.3em;text-transform:uppercase;color:#ffcfa3;margin-bottom:1.4rem}
h1{font-family:'Fraunces',serif;font-size:5.4rem;line-height:1.02;font-weight:300;letter-spacing:-.02em;margin-bottom:1.3rem}
h1 em{font-style:italic}
.hero p{max-width:500px;margin:0 auto 2.2rem;line-height:1.8;color:rgba(255,255,255,.82);font-size:.98rem}
.btn{display:inline-block;background:#b4552d;color:#fff;padding:1rem 2.3rem;border-radius:50px;font-size:.72rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;transition:.25s}.btn:hover{background:#8f3f20}
.hero .meta{position:relative;z-index:3;display:flex;justify-content:space-between;padding:1.5rem 5%;font-size:.68rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.65);border-top:1px solid rgba(255,255,255,.2);max-width:1350px;width:100%;margin:0 auto}
.section{max-width:1250px;margin:0 auto;padding:5.5rem 5%}
.head{display:flex;justify-content:space-between;align-items:end;gap:2rem;margin-bottom:2.5rem;flex-wrap:wrap}
.head h2{font-family:'Fraunces',serif;font-size:2.9rem;font-weight:400;line-height:1.1;max-width:480px}
.head p{max-width:340px;color:#77614d;font-size:.88rem;line-height:1.75}
.trips{display:grid;grid-template-columns:repeat(3,1fr);gap:1.4rem}
.trip{background:#fffaf2;border-radius:4px;overflow:hidden;border:1px solid #e2d3bd;transition:.3s}
.trip:hover{transform:translateY(-6px);box-shadow:0 24px 50px rgba(43,29,18,.12)}
.trip img{width:100%;height:220px;object-fit:cover}
.trip .body{padding:1.5rem}
.trip .loc{font-size:.64rem;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:#b4552d;margin-bottom:.6rem}
.trip h3{font-family:'Fraunces',serif;font-size:1.45rem;font-weight:400;margin-bottom:.5rem}
.trip p{font-size:.82rem;color:#77614d;line-height:1.65;margin-bottom:1.1rem}
.trip .row{display:flex;justify-content:space-between;align-items:center;border-top:1px solid #e2d3bd;padding-top:1rem;font-size:.73rem}
.trip .row b{color:#b4552d}.trip .row a{font-weight:600;letter-spacing:.06em;text-transform:uppercase;font-size:.66rem}
.story{display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;max-width:1150px;margin:0 auto;padding:0 5% 6rem}
.story img{width:100%;height:460px;object-fit:cover;border-radius:4px}
.story .tag{font-size:.66rem;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#b4552d;margin-bottom:1rem}
.story h2{font-family:'Fraunces',serif;font-size:2.6rem;font-weight:400;line-height:1.15;margin-bottom:1rem}
.story p{color:#77614d;line-height:1.85;font-size:.9rem;margin-bottom:1rem}
.story a{display:inline-block;margin-top:.6rem;font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;border-bottom:1px solid #2b1d12;padding-bottom:4px}
.quote{background:#b4552d;color:#fff;padding:4rem 5%;text-align:center}
.quote blockquote{font-family:'Fraunces',serif;font-size:2rem;font-weight:300;font-style:italic;line-height:1.45;max-width:820px;margin:0 auto 1.2rem}
.quote cite{font-style:normal;font-size:.66rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.65)}
footer{display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap;padding:2rem 5%;font-size:.68rem;color:#8a735d;border-top:1px solid #ded0ba}
@media(max-width:1000px){h1{font-size:4rem}.trips{grid-template-columns:1fr 1fr}.story{grid-template-columns:1fr;gap:2rem}.story img{height:360px}}
@media(max-width:680px){nav ul{display:none}.hero-copy{padding:4rem 5%}h1{font-size:2.9rem}.trips{grid-template-columns:1fr}.head h2{font-size:2.1rem}.quote blockquote{font-size:1.4rem}.hero .meta{flex-direction:column;gap:.5rem;align-items:center}}
</style>
</head>
<body>
<section class="hero">
<img src="https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1600&h=1000&fit=crop" alt="Desert dunes">
<nav><a href="#" class="logo">Dune <span>Atlas</span></a><ul><li><a href="#journeys">Journeys</a></li><li><a href="#story">Our story</a></li><li><a href="#">Journal</a></li></ul><a href="#journeys" class="nav-btn">Plan a trip</a></nav>
<div class="hero-copy"><div class="eyebrow">Small-group journeys · North Africa</div><h1>Go where the<br>map goes <em>quiet.</em></h1><p>Slow journeys into the Sahara, the Atlas foothills and the old caravan towns — led by people who call these places home.</p><a href="#journeys" class="btn">Explore journeys</a></div>
<div class="meta"><span>Morocco · Algeria · Tunisia</span><span>Max 8 travellers</span><span>Est. 2012</span></div>
</section>
<section class="section" id="journeys"><div class="head"><h2>Journeys for the curious</h2><p>No convoys, no schedules shouted through a megaphone. Just small groups and long horizons.</p></div>
<div class="trips">
<div class="trip"><img src="https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=700&h=500&fit=crop" alt="Sahara"><div class="body"><div class="loc">Morocco · 7 nights</div><h3>The Silent Sands</h3><p>From Marrakech over the High Atlas to a private camp in Erg Chigaga.</p><div class="row"><b>From $2,400</b><a href="#">View trip →</a></div></div></div>
<div class="trip"><img src="https://images.unsplash.com/photo-1489493585363-d69421e0edd3?w=700&h=500&fit=crop" alt="Atlas mountains"><div class="body"><div class="loc">Morocco · 6 nights</div><h3>Atlas &amp; Almond</h3><p>Village walks, mountain kitchens and the spring blossom of the High Atlas.</p><div class="row"><b>From $1,980</b><a href="#">View trip →</a></div></div></div>
<div class="trip"><img src="https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=700&h=500&fit=crop" alt="Desert camp"><div class="body"><div class="loc">Algeria · 9 nights</div><h3>Caravan Roads</h3><p>Ghardaia, the M'Zab valley and nights under the Tassili stars.</p><div class="row"><b>From $3,150</b><a href="#">View trip →</a></div></div></div>
</div></section>
<section class="story" id="story"><img src="https://images.unsplash.com/photo-1542401886-65d6c61db217?w=900&h=900&fit=crop" alt="Desert guide"><div><div class="tag">Why we travel slowly</div><h2>The desert rewards those who don't rush.</h2><p>We plan for tea at the right hour, detours for a good view, and evenings with no itinerary at all.</p><p>Every journey is led by a local guide and kept to eight travellers, so the places you visit stay as you found them.</p><a href="#">Read our philosophy</a></div></section>
<section class="quote"><blockquote>“We came home with sand in our shoes and completely different ideas about time.”</blockquote><cite>— Clara &amp; Tom, The Silent Sands</cite></section>
<footer><span>© 2026 Dune Atlas</span><span>hello@duneatlas.travel</span><span>Marrakech · Lisbon</span></footer>
</body></html>`,
  },

  // ═══════════════════════════════════════════════════════════════
  // 7. REAL ESTATE — Oakline
  // ═══════════════════════════════════════════════════════════════
  {
    id: "premium-oakline-estate",
    name: "Oakline — Architectural Estates",
    category: "Real Estate",
    description: "Dark architectural real-estate page with bronze accents, split hero, stat strip and a curated property index.",
    thumb: "🏛️",
    getCode: () => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Oakline Estates</title>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:#171717;color:#f0ebe2;overflow-x:hidden}a{text-decoration:none;color:inherit}
nav{position:absolute;top:0;left:0;right:0;z-index:5;display:flex;align-items:center;justify-content:space-between;padding:1.6rem 5%;max-width:1450px;margin:0 auto}
.logo{font-family:'Instrument Serif',serif;font-size:1.55rem;letter-spacing:.02em}.logo span{color:#b08d57}
nav ul{list-style:none;display:flex;gap:2.2rem;font-size:.76rem;letter-spacing:.1em;text-transform:uppercase;color:rgba(240,235,226,.7)}nav ul a:hover{color:#f0ebe2}
.nav-btn{border:1px solid rgba(240,235,226,.4);padding:.65rem 1.4rem;font-size:.68rem;letter-spacing:.14em;text-transform:uppercase;transition:.25s}.nav-btn:hover{background:#b08d57;border-color:#b08d57;color:#171717}
.hero{display:grid;grid-template-columns:1.02fr .98fr;min-height:100vh}
.copy{display:flex;flex-direction:column;justify-content:center;padding:8rem 5% 5rem 6%;position:relative;z-index:2}
.eyebrow{font-size:.66rem;font-weight:500;letter-spacing:.28em;text-transform:uppercase;color:#b08d57;margin-bottom:1.5rem}
h1{font-family:'Instrument Serif',serif;font-size:5rem;font-weight:400;line-height:.98;letter-spacing:-.01em;margin-bottom:1.5rem}
h1 em{font-style:italic;color:#b08d57}
.copy p{color:rgba(240,235,226,.6);line-height:1.85;max-width:430px;font-size:.94rem;margin-bottom:2.2rem}
.actions{display:flex;gap:1.2rem;flex-wrap:wrap;align-items:center}
.btn{background:#b08d57;color:#171717;padding:1rem 2rem;font-size:.7rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;transition:.25s}.btn:hover{background:#cba873}
.link{font-size:.7rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;border-bottom:1px solid rgba(240,235,226,.45);padding-bottom:4px}
.stats{display:flex;gap:2.5rem;margin-top:3.5rem;padding-top:1.5rem;border-top:1px solid rgba(240,235,226,.14)}
.stats b{display:block;font-family:'Instrument Serif',serif;font-size:1.9rem;font-weight:400}.stats span{font-size:.64rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(240,235,226,.4)}
.visual{position:relative;overflow:hidden}
.visual img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.visual::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,#171717,transparent 25%)}
.badge{position:absolute;z-index:2;right:2rem;bottom:2rem;background:rgba(23,23,23,.7);backdrop-filter:blur(12px);border:1px solid rgba(240,235,226,.18);padding:1.1rem 1.4rem;min-width:200px}
.badge span{font-size:.6rem;letter-spacing:.18em;text-transform:uppercase;color:#b08d57}.badge b{display:block;font-family:'Instrument Serif',serif;font-size:1.25rem;margin-top:.35rem}
.section{max-width:1300px;margin:0 auto;padding:5.5rem 5%}
.head{display:flex;justify-content:space-between;align-items:end;gap:2rem;margin-bottom:2.5rem;flex-wrap:wrap}
.head h2{font-family:'Instrument Serif',serif;font-size:2.8rem;font-weight:400;line-height:1.1}
.head a{font-size:.68rem;letter-spacing:.14em;text-transform:uppercase;border-bottom:1px solid rgba(240,235,226,.4);padding-bottom:4px}
.props{display:grid;grid-template-columns:repeat(3,1fr);gap:1.2rem}
.prop{position:relative;overflow:hidden;background:#1f1f1f;border:1px solid rgba(240,235,226,.1);transition:.3s}
.prop:hover{transform:translateY(-5px);border-color:rgba(176,141,87,.5)}
.prop img{width:100%;height:280px;object-fit:cover;filter:saturate(.85);transition:.5s}.prop:hover img{transform:scale(1.04)}
.prop .body{padding:1.5rem}
.prop .loc{font-size:.62rem;letter-spacing:.18em;text-transform:uppercase;color:#b08d57;margin-bottom:.55rem}
.prop h3{font-family:'Instrument Serif',serif;font-size:1.45rem;font-weight:400;margin-bottom:.3rem}
.prop .spec{font-size:.72rem;color:rgba(240,235,226,.45);margin-bottom:1rem}
.prop .row{display:flex;justify-content:space-between;align-items:center;padding-top:.9rem;border-top:1px solid rgba(240,235,226,.1);font-size:.8rem}
.prop .row b{color:#cba873;font-weight:500}.prop .row span{font-size:.64rem;letter-spacing:.12em;text-transform:uppercase;color:rgba(240,235,226,.5)}
.cta{display:flex;align-items:center;justify-content:space-between;gap:2rem;flex-wrap:wrap;max-width:1200px;margin:0 auto 5rem;padding:3rem 5%;border-top:1px solid rgba(240,235,226,.14);border-bottom:1px solid rgba(240,235,226,.14)}
.cta h2{font-family:'Instrument Serif',serif;font-size:2.2rem;font-weight:400}
.cta p{color:rgba(240,235,226,.45);font-size:.84rem;margin-top:.4rem}
footer{display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap;padding:2rem 5%;font-size:.66rem;color:rgba(240,235,226,.35);letter-spacing:.06em}
@media(max-width:1000px){.hero{grid-template-columns:1fr}.visual{min-height:440px;order:-1}.visual::after{background:linear-gradient(0deg,#171717,transparent 25%)}.copy{padding-top:3.5rem}h1{font-size:4rem}.props{grid-template-columns:1fr 1fr}}
@media(max-width:700px){nav ul{display:none}h1{font-size:3rem}.props{grid-template-columns:1fr}.stats{gap:1.6rem}.cta h2{font-size:1.6rem}.badge{right:1rem;bottom:1rem}}
</style>
</head>
<body>
<nav><a href="#" class="logo">Oak<span>line</span></a><ul><li><a href="#properties">Properties</a></li><li><a href="#">Advisory</a></li><li><a href="#">Journal</a></li></ul><a href="#contact" class="nav-btn">Private viewing</a></nav>
<section class="hero">
<div class="copy"><div class="eyebrow">Architectural estates · Since 2009</div><h1>Homes with<br>a point of <em>view.</em></h1><p>A small, considered collection of architect-designed homes — represented with discretion and shown by appointment only.</p><div class="actions"><a href="#properties" class="btn">View collection</a><a href="#contact" class="link">Speak to an adviser</a></div><div class="stats"><div><b>48</b><span>Homes placed</span></div><div><b>$420M</b><span>Total value</span></div><div><b>16</b><span>Years advising</span></div></div></div>
<div class="visual"><img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1100&h=1200&fit=crop" alt="Modern house"><div class="badge"><span>Featured · Hillside</span><b>Villa Miraval · $6.8M</b></div></div>
</section>
<section class="section" id="properties"><div class="head"><h2>The current collection</h2><a href="#">All properties →</a></div>
<div class="props">
<div class="prop"><img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&h=600&fit=crop" alt="House"><div class="body"><div class="loc">Lake Como, Italy</div><h3>Casa Lumen</h3><div class="spec">4 bed · 5 bath · Lakefront</div><div class="row"><b>$6,800,000</b><span>View →</span></div></div></div>
<div class="prop"><img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700&h=600&fit=crop" alt="House"><div class="body"><div class="loc">Aspen, Colorado</div><h3>Ridge House</h3><div class="spec">5 bed · 6 bath · Mountain</div><div class="row"><b>$9,200,000</b><span>View →</span></div></div></div>
<div class="prop"><img src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=700&h=600&fit=crop" alt="House"><div class="body"><div class="loc">Lisbon, Portugal</div><h3>Pátio 22</h3><div class="spec">3 bed · 3 bath · Courtyard</div><div class="row"><b>$2,450,000</b><span>View →</span></div></div></div>
</div></section>
<section class="cta" id="contact"><div><h2>Private viewings, quietly arranged.</h2><p>Tell us what you're looking for. We'll send a shortlist, not a brochure.</p></div><a href="#" class="btn">Request a viewing</a></section>
<footer><span>© 2026 Oakline Estates</span><span>Lisbon · Aspen · Milan</span><span>hello@oakline.estate</span></footer>
</body></html>`,
  },
];
