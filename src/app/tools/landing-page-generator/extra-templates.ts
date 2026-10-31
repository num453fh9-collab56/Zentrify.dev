interface T {
  name: string; primary: string; secondary: string; accent: string;
  dark: string; darkAlt: string; text: string; light: string;
}
export const extraTemplates = [
  {
    id: "photo-aperture",
    name: "Aperture — Photography Studio",
    category: "Photography",
    description: "Cinematic full-bleed hero, masonry-style photo gallery, service cards, and bold typography for photographers and studios.",
    thumb: "📷",
    getCode: (t: T) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Aperture Studio</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:${t.dark};color:${t.text};overflow-x:hidden}a{text-decoration:none;color:inherit}
nav{position:absolute;top:0;left:0;right:0;z-index:10;display:flex;align-items:center;justify-content:space-between;padding:1.75rem 5%;max-width:1400px;margin:0 auto}
.logo{font-size:1.4rem;font-weight:800;color:#fff;letter-spacing:.5px}.logo span{color:${t.primary}}
nav ul{list-style:none;display:flex;gap:2.25rem}nav ul a{font-size:.88rem;font-weight:500;color:rgba(255,255,255,.7);transition:.2s}nav ul a:hover{color:#fff}
.nav-btn{background:${t.primary};color:#fff;padding:.7rem 1.6rem;border-radius:50px;font-size:.85rem;font-weight:600;transition:.25s}.nav-btn:hover{transform:translateY(-2px);box-shadow:0 10px 30px ${t.primary}50}
.hero{position:relative;min-height:92vh;display:flex;align-items:center;justify-content:center;text-align:center;overflow:hidden}
.hero img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.hero::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.65),rgba(0,0,0,.45) 45%,${t.dark} 100%)}
.hero-in{position:relative;z-index:2;max-width:850px;padding:8rem 5% 6rem}
.badge{display:inline-flex;align-items:center;gap:.5rem;border:1px solid rgba(255,255,255,.3);background:rgba(255,255,255,.08);backdrop-filter:blur(8px);color:#fff;padding:.45rem 1.15rem;border-radius:50px;font-size:.78rem;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:1.75rem}
.hero h1{font-size:4.4rem;font-weight:900;line-height:1.02;color:#fff;letter-spacing:-1.5px;margin-bottom:1.5rem}.hero h1 em{font-style:normal;color:${t.primary}}
.hero p{font-size:1.12rem;line-height:1.8;color:rgba(255,255,255,.72);max-width:560px;margin:0 auto 2.5rem}.hero-cta{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap}
.btn{background:${t.primary};color:#fff;padding:1rem 2.4rem;border-radius:12px;font-weight:700;font-size:.95rem;border:none;cursor:pointer;transition:.25s}.btn:hover{transform:translateY(-3px);box-shadow:0 15px 35px ${t.primary}45}
.btn-ghost{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.25);color:#fff;padding:1rem 2.4rem;border-radius:12px;font-weight:600;font-size:.95rem;cursor:pointer;backdrop-filter:blur(8px);transition:.25s}.btn-ghost:hover{background:rgba(255,255,255,.14)}
.strip{display:flex;justify-content:center;gap:4rem;flex-wrap:wrap;padding:2.5rem 5%;border-top:1px solid rgba(255,255,255,.07);border-bottom:1px solid rgba(255,255,255,.07);background:${t.darkAlt}}
.strip div{text-align:center}.strip b{display:block;font-size:1.9rem;font-weight:900;color:#fff}.strip span{font-size:.78rem;text-transform:uppercase;letter-spacing:2px;color:rgba(255,255,255,.45)}
.section{padding:6rem 5%;max-width:1300px;margin:0 auto}.head{text-align:center;margin-bottom:3.5rem}
.tag{display:inline-block;color:${t.primary};font-size:.75rem;font-weight:700;letter-spacing:3px;text-transform:uppercase;margin-bottom:.85rem}
.head h2{font-size:3rem;font-weight:800;color:#fff;letter-spacing:-.5px;margin-bottom:.75rem}.head p{color:rgba(255,255,255,.5);font-size:1.02rem;max-width:520px;margin:0 auto}
.gallery{display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:220px;gap:1rem}.g{position:relative;overflow:hidden;border-radius:18px;cursor:pointer}
.g img{width:100%;height:100%;object-fit:cover;transition:transform .6s ease}.g:hover img{transform:scale(1.08)}
.g::after{content:'';position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.65),transparent 55%);opacity:0;transition:.3s}.g:hover::after{opacity:1}
.g span{position:absolute;left:1.25rem;bottom:1rem;z-index:2;color:#fff;font-size:.8rem;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;opacity:0;transform:translateY(8px);transition:.3s}.g:hover span{opacity:1;transform:none}
.g.tall{grid-row:span 2}.g.wide{grid-column:span 2}.services{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem}
.svc{background:${t.darkAlt};border:1px solid rgba(255,255,255,.07);border-radius:20px;padding:2.25rem;transition:.3s}
.svc:hover{transform:translateY(-6px);border-color:${t.primary}50;box-shadow:0 25px 50px rgba(0,0,0,.35)}
.svc .ic{width:52px;height:52px;border-radius:14px;background:${t.primary}18;display:flex;align-items:center;justify-content:center;font-size:1.5rem;margin-bottom:1.25rem}
.svc h3{color:#fff;font-size:1.12rem;margin-bottom:.55rem}.svc p{font-size:.88rem;line-height:1.7;color:rgba(255,255,255,.5)}.cta{padding:5rem 5% 6rem}
.cta-in{max-width:1000px;margin:0 auto;text-align:center;border-radius:26px;padding:4.5rem 3rem;background:linear-gradient(135deg,${t.primary},${t.secondary});position:relative;overflow:hidden}
.cta-in::before{content:'';position:absolute;width:420px;height:420px;border-radius:50%;background:rgba(255,255,255,.1);top:-45%;right:-10%}
.cta-in h2{position:relative;font-size:2.6rem;font-weight:900;color:#fff;margin-bottom:1rem}
.cta-in p{position:relative;color:rgba(255,255,255,.85);margin-bottom:2rem;font-size:1.05rem}
.cta-in .btn{position:relative;background:#fff;color:${t.dark};box-shadow:0 10px 30px rgba(0,0,0,.2)}
footer{padding:2.5rem 5%;text-align:center;color:rgba(255,255,255,.3);font-size:.82rem;border-top:1px solid rgba(255,255,255,.06)}
@media(max-width:1024px){.hero h1{font-size:3.2rem}.gallery{grid-template-columns:repeat(3,1fr)}.services{grid-template-columns:1fr 1fr}}
@media(max-width:700px){nav ul{display:none}.hero h1{font-size:2.4rem}.strip{gap:2rem}.gallery{grid-template-columns:repeat(2,1fr);grid-auto-rows:160px}.services{grid-template-columns:1fr}.cta-in h2{font-size:1.9rem}.head h2{font-size:2.1rem}}
</style>
</head>
<body>
<nav><a href="#" class="logo">APER<span>TURE</span></a><ul><li><a href="#work">Work</a></li><li><a href="#services">Services</a></li><li><a href="#about">About</a></li><li><a href="#contact">Contact</a></li></ul><a href="#contact" class="nav-btn">Book a Shoot</a></nav>
<section class="hero">
<img src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1600&h=1000&fit=crop" alt="Camera">
<div class="hero-in">
<div class="badge">Editorial · Wedding · Commercial</div>
<h1>Light, <em>framed</em> with intention.</h1>
<p>We craft cinematic imagery for brands and people who care about the details. Based in the studio, at home anywhere in the world.</p>
<div class="hero-cta"><a href="#work" class="btn">View Our Work</a><a href="#contact" class="btn-ghost">Check Availability</a></div>
</div>
</section>
<div class="strip"><div><b>12+</b><span>Years shooting</span></div><div><b>480</b><span>Stories told</span></div><div><b>36</b><span>Countries</span></div><div><b>4.9</b><span>Client rating</span></div></div>
<section class="section" id="work"><div class="head"><span class="tag">Selected Work</span><h2>Stories in frame</h2><p>A small selection of recent shoots across editorial, lifestyle, and commercial projects.</p></div>
<div class="gallery">
<div class="g tall"><img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=700&h=1000&fit=crop" alt="Portrait"><span>Portrait</span></div>
<div class="g"><img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=700&h=500&fit=crop" alt="Landscape"><span>Landscape</span></div>
<div class="g"><img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=700&h=500&fit=crop" alt="Wedding"><span>Wedding</span></div>
<div class="g wide"><img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=500&fit=crop" alt="Nature"><span>Nature</span></div>
<div class="g"><img src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=700&h=500&fit=crop" alt="City"><span>City</span></div>
<div class="g"><img src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=700&h=500&fit=crop" alt="Behind the scenes"><span>On Set</span></div>
</div></section>
<section class="section" id="services" style="padding-top:0"><div class="head"><span class="tag">What We Do</span><h2>Made for your story</h2></div>
<div class="services">
<div class="svc"><div class="ic">💍</div><h3>Weddings</h3><p>Full-day coverage with a calm, documentary approach. Galleries delivered in 14 days.</p></div>
<div class="svc"><div class="ic">🏢</div><h3>Brand & Commercial</h3><p>Product, campaign, and team photography that fits your brand system.</p></div>
<div class="svc"><div class="ic">👤</div><h3>Portraits</h3><p>Studio or on-location sessions for founders, artists, and families.</p></div>
</div></section>
<section class="cta"><div class="cta-in"><h2>Let's make something timeless</h2><p>Now booking for the next season. Tell us about your project.</p><a href="#contact" class="btn">Start a Conversation</a></div></section>
<footer><p>© 2026 Aperture Studio. All rights reserved.</p></footer>
</body></html>`,
  },
  {
    id: "legal-meridian",
    name: "Meridian — Law Firm",
    category: "Legal",
    description: "Trustworthy dark navy layout with split hero, practice areas, credentials strip, and consultation call-to-action.",
    thumb: "⚖️",
    getCode: (t: T) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Meridian &amp; Co.</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:${t.dark};color:${t.text};overflow-x:hidden}a{text-decoration:none;color:inherit}
nav{display:flex;align-items:center;justify-content:space-between;padding:1.5rem 5%;max-width:1400px;margin:0 auto;border-bottom:1px solid rgba(255,255,255,.07)}
.logo{display:flex;align-items:center;gap:.65rem;color:#fff;font-weight:700;letter-spacing:.5px}
.logo .mark{width:34px;height:34px;border:1px solid ${t.primary};border-radius:8px;display:flex;align-items:center;justify-content:center;color:${t.primary};font-family:'Playfair Display',serif;font-size:1.1rem}
nav ul{list-style:none;display:flex;gap:2rem}nav ul a{font-size:.86rem;color:rgba(255,255,255,.6);transition:.2s}nav ul a:hover{color:${t.primary}}
.nav-btn{border:1px solid ${t.primary}70;color:${t.primary};padding:.65rem 1.5rem;border-radius:8px;font-size:.82rem;font-weight:600;transition:.25s}.nav-btn:hover{background:${t.primary};color:#fff}
.hero{display:grid;grid-template-columns:1.1fr .9fr;gap:4rem;align-items:center;max-width:1300px;margin:0 auto;padding:6rem 5%}
.eyebrow{display:inline-flex;align-items:center;gap:.6rem;color:${t.primary};font-size:.72rem;font-weight:700;letter-spacing:3px;text-transform:uppercase;margin-bottom:1.5rem}
.eyebrow::before{content:'';width:32px;height:1px;background:${t.primary}}
.hero h1{font-family:'Playfair Display',serif;font-size:3.9rem;line-height:1.1;color:#fff;margin-bottom:1.5rem;letter-spacing:-.5px}
.hero h1 em{font-style:italic;color:${t.primary}}.hero p{color:rgba(255,255,255,.55);line-height:1.85;font-size:1.05rem;max-width:480px;margin-bottom:2.25rem}
.actions{display:flex;gap:1rem;flex-wrap:wrap;align-items:center}
.btn{background:${t.primary};color:#08111f;padding:1rem 2.2rem;border-radius:8px;font-weight:700;font-size:.9rem;transition:.25s}.btn:hover{transform:translateY(-2px);box-shadow:0 12px 30px ${t.primary}35}
.link{color:#fff;font-size:.9rem;font-weight:600;border-bottom:1px solid rgba(255,255,255,.3);padding-bottom:3px;transition:.2s}.link:hover{color:${t.primary};border-color:${t.primary}}
.hero-img{position:relative}.hero-img img{width:100%;height:540px;object-fit:cover;border-radius:14px;filter:saturate(.85)}
.hero-img::before{content:'';position:absolute;inset:-14px 14px 14px -14px;border:1px solid ${t.primary}55;border-radius:14px;z-index:-1}
.exp{position:absolute;right:-18px;bottom:28px;background:${t.darkAlt};border:1px solid rgba(255,255,255,.09);border-radius:14px;padding:1.4rem 1.6rem;box-shadow:0 20px 50px rgba(0,0,0,.4)}
.exp b{display:block;font-family:'Playfair Display',serif;font-size:2.1rem;color:${t.primary};line-height:1}.exp span{font-size:.72rem;letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,255,255,.45)}
.trust{display:flex;justify-content:center;gap:3.5rem;flex-wrap:wrap;padding:1.75rem 5%;border-top:1px solid rgba(255,255,255,.06);border-bottom:1px solid rgba(255,255,255,.06);background:${t.darkAlt};color:rgba(255,255,255,.4);font-size:.75rem;font-weight:600;letter-spacing:2px;text-transform:uppercase}
.section{padding:6rem 5%;max-width:1200px;margin:0 auto}.top{display:flex;justify-content:space-between;align-items:end;gap:2rem;margin-bottom:3rem;flex-wrap:wrap}
.top h2{font-family:'Playfair Display',serif;font-size:2.7rem;color:#fff;max-width:520px;line-height:1.2}
.top p{color:rgba(255,255,255,.45);max-width:380px;line-height:1.7;font-size:.92rem}.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1.25rem}
.card{background:${t.darkAlt};border:1px solid rgba(255,255,255,.07);border-radius:16px;padding:2.25rem;transition:.3s;position:relative;overflow:hidden}
.card::after{content:'';position:absolute;left:0;top:0;bottom:0;width:2px;background:${t.primary};transform:scaleY(0);transform-origin:top;transition:.35s}.card:hover::after{transform:scaleY(1)}
.card:hover{border-color:${t.primary}35;transform:translateY(-4px)}.card .num{font-family:'Playfair Display',serif;color:${t.primary};font-size:1rem;margin-bottom:1.1rem}
.card h3{color:#fff;font-size:1.2rem;margin-bottom:.6rem}.card p{color:rgba(255,255,255,.5);font-size:.88rem;line-height:1.75}
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem;padding:0 5% 6rem;max-width:1200px;margin:0 auto}
.stat{text-align:center;padding:2.25rem 1rem;border:1px solid rgba(255,255,255,.07);border-radius:14px}
.stat b{display:block;font-family:'Playfair Display',serif;font-size:2.6rem;color:#fff;margin-bottom:.4rem}.stat span{font-size:.74rem;letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,255,255,.4)}
.cta{padding:5.5rem 5%;background:${t.darkAlt};border-top:1px solid rgba(255,255,255,.06)}
.cta-in{max-width:1000px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:2.5rem;flex-wrap:wrap}
.cta-in h2{font-family:'Playfair Display',serif;font-size:2.4rem;color:#fff;max-width:520px;line-height:1.25}.cta-in p{color:rgba(255,255,255,.45);font-size:.9rem;margin-top:.6rem}
.cta .btn{white-space:nowrap}footer{padding:2.5rem 5%;text-align:center;font-size:.8rem;color:rgba(255,255,255,.3);border-top:1px solid rgba(255,255,255,.06)}
@media(max-width:1000px){.hero{grid-template-columns:1fr;padding-top:4rem}.hero-img{order:-1}.hero-img img{height:380px}.hero h1{font-size:3rem}.grid,.stats{grid-template-columns:1fr 1fr}}
@media(max-width:700px){nav ul{display:none}.hero h1{font-size:2.35rem}.grid,.stats{grid-template-columns:1fr}.top h2{font-size:2rem}.cta-in h2{font-size:1.8rem}.trust{gap:1.5rem}}
</style>
</head>
<body>
<nav><a href="#" class="logo"><span class="mark">M</span>MERIDIAN &amp; CO.</a><ul><li><a href="#practice">Practice Areas</a></li><li><a href="#firm">Our Firm</a></li><li><a href="#insights">Insights</a></li></ul><a href="#consult" class="nav-btn">Free Consultation</a></nav>
<section class="hero">
<div>
<div class="eyebrow">Corporate · Litigation · Advisory</div>
<h1>Clear counsel for <em>complex</em> decisions.</h1>
<p>Meridian &amp; Co. advises founders, boards, and families through the moments that define their future — with precision, discretion, and decades of courtroom experience.</p>
<div class="actions"><a href="#consult" class="btn">Book a Consultation</a><a href="#practice" class="link">Explore practice areas</a></div>
</div>
<div class="hero-img"><img src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=900&h=1100&fit=crop" alt="Law library"><div class="exp"><b>32</b><span>Years of practice</span></div></div>
</section>
<div class="trust"><span>Chambers Top Tier</span><span>Legal 500 Recommended</span><span>40+ Attorneys</span><span>New York · London · Dubai</span></div>
<section class="section" id="practice"><div class="top"><h2>Practice areas built around your business</h2><p>Focused teams, senior attention, and a commercial view of every matter.</p></div>
<div class="grid">
<div class="card"><div class="num">01</div><h3>Corporate & M&amp;A</h3><p>Formation, governance, financing, and acquisitions for growth-stage and established companies.</p></div>
<div class="card"><div class="num">02</div><h3>Commercial Litigation</h3><p>Resolving disputes efficiently — from pre-action strategy through trial and appeal.</p></div>
<div class="card"><div class="num">03</div><h3>Employment & Compliance</h3><p>Practical policies, investigations, and defense for modern workplaces.</p></div>
<div class="card"><div class="num">04</div><h3>Private Client</h3><p>Estate planning, succession, and wealth structures for families and founders.</p></div>
</div></section>
<div class="stats" id="firm"><div class="stat"><b>32</b><span>Years</span></div><div class="stat"><b>1.2K</b><span>Matters closed</span></div><div class="stat"><b>98%</b><span>Success rate</span></div><div class="stat"><b>40+</b><span>Attorneys</span></div></div>
<section class="cta" id="consult"><div class="cta-in"><div><h2>Tell us what you're facing.</h2><p>Initial consultations are confidential and obligation-free.</p></div><a href="#" class="btn">Request a Callback</a></div></section>
<footer><p>© 2026 Meridian &amp; Co. Attorneys at Law. All rights reserved.</p></footer>
</body></html>`,
  },
  {
    id: "nonprofit-greenroots",
    name: "GreenRoots — Charity",
    category: "Nonprofit / Charity",
    description: "Warm light layout with impact counters, program cards, donation tiers, and a hopeful community-focused hero.",
    thumb: "🌱",
    getCode: (t: T) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>GreenRoots Foundation</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:${t.light};color:#1f2937;overflow-x:hidden}a{text-decoration:none;color:inherit}
nav{display:flex;align-items:center;justify-content:space-between;padding:1.4rem 5%;max-width:1300px;margin:0 auto}
.logo{display:flex;align-items:center;gap:.6rem;font-weight:800;font-size:1.2rem;color:#14532d}
.logo .mark{width:36px;height:36px;border-radius:10px;background:${t.primary};color:#fff;display:flex;align-items:center;justify-content:center;font-size:1.1rem}
nav ul{list-style:none;display:flex;gap:2rem}nav ul a{font-size:.88rem;font-weight:500;color:#4b5563;transition:.2s}nav ul a:hover{color:${t.secondary}}
.nav-btn{background:${t.primary};color:#fff;padding:.75rem 1.6rem;border-radius:50px;font-size:.85rem;font-weight:700;box-shadow:0 8px 20px ${t.primary}30;transition:.25s}.nav-btn:hover{transform:translateY(-2px);box-shadow:0 12px 28px ${t.primary}45}
.hero{display:grid;grid-template-columns:1.05fr .95fr;gap:4rem;align-items:center;max-width:1300px;margin:0 auto;padding:4rem 5% 5.5rem}
.pill{display:inline-flex;align-items:center;gap:.5rem;background:${t.primary}14;color:${t.secondary};padding:.45rem 1rem;border-radius:50px;font-size:.75rem;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-bottom:1.4rem}
.hero h1{font-size:3.8rem;line-height:1.07;font-weight:900;letter-spacing:-1.5px;color:#14532d;margin-bottom:1.4rem}.hero h1 span{color:${t.primary}}
.hero p{font-size:1.06rem;line-height:1.8;color:#4b5563;max-width:480px;margin-bottom:2rem}.actions{display:flex;gap:1rem;flex-wrap:wrap}
.btn{background:${t.primary};color:#fff;padding:1rem 2.2rem;border-radius:12px;font-weight:700;font-size:.95rem;border:none;cursor:pointer;box-shadow:0 10px 24px ${t.primary}35;transition:.25s}.btn:hover{transform:translateY(-3px)}
.btn-o{background:#fff;color:${t.secondary};padding:1rem 2.2rem;border-radius:12px;font-weight:700;font-size:.95rem;border:1px solid #d1d5db;transition:.25s}.btn-o:hover{border-color:${t.primary};color:${t.primary}}
.hero-media{position:relative}.hero-media img{width:100%;height:500px;object-fit:cover;border-radius:120px 24px 24px 24px}
.donate-float{position:absolute;left:-22px;bottom:28px;background:#fff;border-radius:16px;padding:1.25rem 1.5rem;box-shadow:0 18px 40px rgba(0,0,0,.12);display:flex;align-items:center;gap:.9rem}
.donate-float .ic{width:44px;height:44px;border-radius:12px;background:${t.primary}18;display:flex;align-items:center;justify-content:center;font-size:1.2rem}
.donate-float b{display:block;font-size:1.15rem;color:#14532d}.donate-float span{font-size:.72rem;color:#6b7280}.impact{background:#14532d;color:#fff;padding:3rem 5%}
.impact-in{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:2rem;text-align:center}
.impact b{display:block;font-size:2.7rem;font-weight:900;color:${t.accent};margin-bottom:.3rem}.impact span{font-size:.78rem;letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,255,255,.6)}
.section{padding:6rem 5%;max-width:1200px;margin:0 auto}.head{text-align:center;margin-bottom:3.5rem}
.tag{color:${t.secondary};font-size:.75rem;font-weight:800;letter-spacing:3px;text-transform:uppercase}
.head h2{font-size:2.8rem;font-weight:900;color:#14532d;letter-spacing:-.7px;margin:.8rem 0 .7rem}.head p{color:#6b7280;max-width:540px;margin:0 auto;line-height:1.7}
.programs{display:grid;grid-template-columns:repeat(3,1fr);gap:1.75rem}
.prog{background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 6px 24px rgba(0,0,0,.06);transition:.3s}
.prog:hover{transform:translateY(-6px);box-shadow:0 20px 45px rgba(0,0,0,.1)}.prog img{width:100%;height:210px;object-fit:cover}.prog .body{padding:1.6rem}
.prog h3{font-size:1.1rem;color:#14532d;margin-bottom:.5rem}.prog p{font-size:.86rem;line-height:1.7;color:#6b7280;margin-bottom:1rem}
.prog .bar{height:8px;background:#e5e7eb;border-radius:50px;overflow:hidden}.prog .bar i{display:block;height:100%;background:${t.primary};border-radius:50px}
.prog .meta{display:flex;justify-content:space-between;font-size:.72rem;color:#6b7280;margin-top:.5rem}
.donate{background:#fff;border-radius:24px;padding:3.5rem;max-width:1000px;margin:0 auto;box-shadow:0 12px 40px rgba(0,0,0,.07);text-align:center;border:1px solid #e5e7eb}
.donate h2{font-size:2.3rem;font-weight:900;color:#14532d;margin-bottom:.7rem}.donate p{color:#6b7280;margin-bottom:2rem}
.tiers{display:flex;gap:.9rem;justify-content:center;flex-wrap:wrap;margin-bottom:1.75rem}
.tier{border:1px solid #d1d5db;border-radius:12px;padding:1rem 1.75rem;font-weight:800;color:#14532d;cursor:pointer;transition:.2s;font-size:1rem}
.tier:hover,.tier.active{background:${t.primary};border-color:${t.primary};color:#fff;transform:translateY(-2px)}.tiers-note{font-size:.78rem;color:#9ca3af;margin-top:1rem}
footer{background:#14532d;color:rgba(255,255,255,.55);padding:2.5rem 5%;text-align:center;font-size:.8rem}
@media(max-width:1000px){.hero{grid-template-columns:1fr;gap:2.5rem}.hero h1{font-size:3rem}.hero-media img{height:380px}.programs{grid-template-columns:1fr 1fr}.impact-in{grid-template-columns:1fr 1fr}}
@media(max-width:700px){nav ul{display:none}.hero h1{font-size:2.3rem}.programs,.impact-in{grid-template-columns:1fr}.head h2{font-size:2rem}.donate{padding:2.2rem 1.5rem}.donate h2{font-size:1.8rem}.hero-media img{border-radius:60px 20px 20px 20px}}
</style>
</head>
<body>
<nav><a href="#" class="logo"><span class="mark">🌿</span>GreenRoots</a><ul><li><a href="#programs">Programs</a></li><li><a href="#impact">Impact</a></li><li><a href="#about">About</a></li></ul><a href="#donate" class="nav-btn">Donate Now</a></nav>
<section class="hero">
<div>
<div class="pill">🌍 Community-powered since 2011</div>
<h1>Small actions. <span>Rooted</span> change.</h1>
<p>We restore forests, train local farmers, and bring clean water to communities — one neighbourhood at a time. 100% of public donations go directly to the field.</p>
<div class="actions"><a href="#donate" class="btn">Donate Today</a><a href="#programs" class="btn-o">Our Programs</a></div>
</div>
<div class="hero-media"><img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=900&h=900&fit=crop" alt="Community"><div class="donate-float"><div class="ic">💚</div><div><b>$2.4M</b><span>raised this year</span></div></div></div>
</section>
<div class="impact" id="impact"><div class="impact-in"><div><b>1.8M</b><span>Trees planted</span></div><div><b>240</b><span>Communities</span></div><div><b>96%</b><span>Funds to field</span></div><div><b>32K</b><span>Volunteers</span></div></div></div>
<section class="section" id="programs"><div class="head"><span class="tag">Our Work</span><h2>Programs that last</h2><p>Every project is designed with local leaders and measured for long-term impact.</p></div>
<div class="programs">
<div class="prog"><img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=700&h=500&fit=crop" alt="Reforestation"><div class="body"><h3>Reforestation</h3><p>Restoring native canopy through community nurseries and seed banks.</p><div class="bar"><i style="width:78%"></i></div><div class="meta"><span>$156,000 raised</span><span>78%</span></div></div></div>
<div class="prog"><img src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=700&h=500&fit=crop" alt="Clean water"><div class="body"><h3>Clean Water</h3><p>Solar-powered wells and filtration for remote villages.</p><div class="bar"><i style="width:64%"></i></div><div class="meta"><span>$98,000 raised</span><span>64%</span></div></div></div>
<div class="prog"><img src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=700&h=500&fit=crop" alt="Education"><div class="body"><h3>Green Education</h3><p>School gardens and climate literacy for the next generation.</p><div class="bar"><i style="width:87%"></i></div><div class="meta"><span>$121,000 raised</span><span>87%</span></div></div></div>
</div></section>
<section class="section" id="donate" style="padding-top:0"><div class="donate"><span class="tag">Give Once. Grow Forever.</span><h2>Choose your impact</h2><p>Monthly gifts keep our field teams working through every season.</p><div class="tiers"><div class="tier">$25</div><div class="tier active">$50</div><div class="tier">$100</div><div class="tier">$250</div></div><button class="btn">Donate Securely →</button><div class="tiers-note">Tax-deductible · Cancel anytime · 256-bit secure</div></div></section>
<footer><p>© 2026 GreenRoots Foundation · Registered 501(c)(3) · All rights reserved.</p></footer>
</body></html>`,
  },
  {
    id: "pets-pawhaven",
    name: "PawHaven — Pet Care",
    category: "Pets / Animals",
    description: "Playful rounded layout with friendly hero, service cards, photo gallery, and booking CTA for pet care brands.",
    thumb: "🐾",
    getCode: (t: T) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>PawHaven</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:${t.light};color:#292524;overflow-x:hidden}a{text-decoration:none;color:inherit}
nav{display:flex;align-items:center;justify-content:space-between;padding:1.4rem 5%;max-width:1250px;margin:0 auto}
.logo{display:flex;align-items:center;gap:.55rem;font-weight:900;font-size:1.25rem;color:#7c2d12}
.logo .mark{width:38px;height:38px;border-radius:50%;background:${t.primary};display:flex;align-items:center;justify-content:center;font-size:1.1rem}
nav ul{list-style:none;display:flex;gap:2rem}nav ul a{font-size:.88rem;font-weight:600;color:#78716c;transition:.2s}nav ul a:hover{color:${t.secondary}}
.nav-btn{background:#292524;color:#fff;padding:.75rem 1.6rem;border-radius:50px;font-size:.85rem;font-weight:700;transition:.25s}.nav-btn:hover{background:${t.secondary};transform:translateY(-2px)}
.hero{display:grid;grid-template-columns:1fr 1fr;gap:3.5rem;align-items:center;max-width:1250px;margin:0 auto;padding:3rem 5% 5rem}
.pill{display:inline-flex;align-items:center;gap:.5rem;background:#fff;border:1px solid #e7e5e4;padding:.45rem 1rem;border-radius:50px;font-size:.78rem;font-weight:700;color:#78716c;margin-bottom:1.4rem;box-shadow:0 3px 10px rgba(0,0,0,.04)}
.hero h1{font-size:3.9rem;line-height:1.05;font-weight:900;letter-spacing:-1.5px;color:#292524;margin-bottom:1.3rem}.hero h1 span{color:${t.secondary}}
.hero p{font-size:1.05rem;line-height:1.8;color:#78716c;max-width:450px;margin-bottom:2rem}.actions{display:flex;gap:1rem;flex-wrap:wrap;align-items:center}
.btn{background:${t.primary};color:#fff;padding:1rem 2.2rem;border-radius:50px;font-weight:800;font-size:.95rem;box-shadow:0 12px 26px ${t.primary}40;transition:.25s;border:none;cursor:pointer}.btn:hover{transform:translateY(-3px) rotate(-1deg)}
.link{font-weight:700;font-size:.9rem;color:#292524;border-bottom:2px solid #292524;padding-bottom:2px}.hero-media{position:relative;display:flex;justify-content:center}
.hero-media img{width:100%;max-width:460px;height:500px;object-fit:cover;border-radius:46% 54% 48% 52% / 44% 46% 54% 56%}
.bubble{position:absolute;background:#fff;border-radius:16px;padding:.9rem 1.15rem;box-shadow:0 14px 30px rgba(0,0,0,.1);font-size:.8rem;font-weight:700;color:#292524;display:flex;align-items:center;gap:.5rem}
.bubble.b1{top:18px;left:0}.bubble.b2{bottom:40px;right:-12px}.bubble .dot{width:9px;height:9px;border-radius:50%;background:${t.primary}}
.strip{background:#fff;border-top:1px solid #e7e5e4;border-bottom:1px solid #e7e5e4;padding:1.5rem 5%}
.strip-in{max-width:1150px;margin:0 auto;display:flex;justify-content:space-between;gap:1.5rem;flex-wrap:wrap;color:#78716c;font-size:.8rem;font-weight:700}
.section{padding:5.5rem 5%;max-width:1200px;margin:0 auto}.head{text-align:center;margin-bottom:3rem}
.tag{color:${t.secondary};font-size:.75rem;font-weight:800;letter-spacing:3px;text-transform:uppercase}
.head h2{font-size:2.7rem;font-weight:900;letter-spacing:-.8px;color:#292524;margin:.75rem 0 .6rem}.head p{color:#78716c;max-width:500px;margin:0 auto;line-height:1.7}
.services{display:grid;grid-template-columns:repeat(4,1fr);gap:1.25rem}
.svc{background:#fff;border-radius:22px;padding:2rem 1.6rem;text-align:center;border:1px solid #e7e5e4;transition:.3s}
.svc:hover{transform:translateY(-6px);border-color:${t.primary};box-shadow:0 18px 35px rgba(0,0,0,.08)}
.svc .ic{width:60px;height:60px;border-radius:50%;background:${t.primary}18;display:flex;align-items:center;justify-content:center;font-size:1.6rem;margin:0 auto 1rem}
.svc h3{font-size:1.02rem;margin-bottom:.5rem;color:#292524}.svc p{font-size:.82rem;line-height:1.65;color:#78716c}
.gallery{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem}
.g img{width:100%;height:250px;object-fit:cover;border-radius:20px;transition:.4s}.g:hover img{transform:scale(1.03)}
.cta{background:${t.secondary};border-radius:28px;padding:3.5rem;max-width:1000px;margin:0 auto;text-align:center;color:#fff;position:relative;overflow:hidden}
.cta::before{content:'🐾';position:absolute;font-size:9rem;opacity:.08;top:-15px;left:20px;transform:rotate(-15deg)}
.cta::after{content:'🐾';position:absolute;font-size:7rem;opacity:.08;bottom:-20px;right:30px;transform:rotate(20deg)}
.cta h2{font-size:2.4rem;font-weight:900;margin-bottom:.7rem;position:relative}.cta p{color:rgba(255,255,255,.85);margin-bottom:1.9rem;position:relative}
.cta .btn{background:#fff;color:${t.secondary};box-shadow:0 12px 25px rgba(0,0,0,.18);position:relative}footer{padding:2.5rem 5%;text-align:center;font-size:.8rem;color:#a8a29e}
@media(max-width:1000px){.hero{grid-template-columns:1fr;gap:2rem}.hero h1{font-size:3rem}.hero-media{order:-1}.hero-media img{height:380px;max-width:100%}.services{grid-template-columns:1fr 1fr}}
@media(max-width:700px){nav ul{display:none}.hero h1{font-size:2.4rem}.services,.gallery{grid-template-columns:1fr}.cta{padding:2.5rem 1.5rem}.cta h2{font-size:1.9rem}.bubble.b1{left:auto;right:0}}
</style>
</head>
<body>
<nav><a href="#" class="logo"><span class="mark">🐾</span>PawHaven</a><ul><li><a href="#services">Services</a></li><li><a href="#gallery">Happy Pets</a></li><li><a href="#about">About</a></li></ul><a href="#book" class="nav-btn">Book a Visit</a></nav>
<section class="hero">
<div>
<div class="pill">⭐ Rated 4.9 by 2,400+ pet parents</div>
<h1>Happy pets.<br>Calm <span>parents.</span></h1>
<p>Grooming, daycare, training, and vet-approved care under one roof. Because your best friend deserves a place that feels like home.</p>
<div class="actions"><a href="#book" class="btn">Book a Visit</a><a href="#services" class="link">See services →</a></div>
</div>
<div class="hero-media"><img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=1000&fit=crop" alt="Happy dogs"><div class="bubble b1"><span class="dot"></span>Open 7 days</div><div class="bubble b2">🐕 1,200+ happy guests</div></div>
</section>
<div class="strip"><div class="strip-in"><span>✓ Certified groomers</span><span>✓ Vet on call</span><span>✓ Live camera updates</span><span>✓ Pickup & drop-off</span></div></div>
<section class="section" id="services"><div class="head"><span class="tag">What We Do</span><h2>Care for every tail</h2><p>From a quick nail trim to a full week of daycare, we've got the routine covered.</p></div>
<div class="services">
<div class="svc"><div class="ic">✂️</div><h3>Grooming</h3><p>Breed-specific cuts, baths, and de-shedding with gentle, pet-safe products.</p></div>
<div class="svc"><div class="ic">🏠</div><h3>Daycare</h3><p>Supervised play groups, nap zones, and daily photo updates.</p></div>
<div class="svc"><div class="ic">🎾</div><h3>Training</h3><p>Positive-reinforcement obedience and puppy socialisation classes.</p></div>
<div class="svc"><div class="ic">🩺</div><h3>Wellness</h3><p>Routine checks, nutrition plans, and vet referrals you can trust.</p></div>
</div></section>
<section class="section" id="gallery" style="padding-top:0"><div class="head"><span class="tag">Happy Guests</span><h2>Recent favourites</h2></div>
<div class="gallery">
<div class="g"><img src="https://images.unsplash.com/photo-1583337130417-3346f18b2826?w=700&h=600&fit=crop" alt="Groomed dog"></div>
<div class="g"><img src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=700&h=600&fit=crop" alt="Happy dog"></div>
<div class="g"><img src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=700&h=600&fit=crop" alt="Cat and dog"></div>
</div></section>
<section class="section" id="book" style="padding-top:0"><div class="cta"><h2>Ready for a happier pet?</h2><p>First visit includes a free temperament check and a goodie bag.</p><a href="#" class="btn">Book Your First Visit</a></div></section>
<footer><p>© 2026 PawHaven. Made with love and a lot of treats.</p></footer>
</body></html>`,
  },
  {
    id: "gaming-novastrike",
    name: "NovaStrike — Esports",
    category: "Gaming / Esports",
    description: "High-energy neon esports page with cinematic hero, tournament schedule, roster cards, and streaming CTA.",
    thumb: "🎮",
    getCode: (t: T) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>NovaStrike Esports</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Orbitron:wght@600;800;900&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:${t.dark};color:${t.text};overflow-x:hidden}a{text-decoration:none;color:inherit}
nav{position:absolute;top:0;left:0;right:0;z-index:10;display:flex;align-items:center;justify-content:space-between;padding:1.5rem 5%;max-width:1400px;margin:0 auto}
.logo{font-family:'Orbitron',sans-serif;font-weight:900;font-size:1.35rem;letter-spacing:2px;color:#fff}.logo span{color:${t.primary}}
nav ul{list-style:none;display:flex;gap:2rem}nav ul a{font-size:.85rem;font-weight:600;color:rgba(255,255,255,.6);letter-spacing:1px;text-transform:uppercase;transition:.2s}nav ul a:hover{color:${t.primary}}
.nav-btn{background:transparent;border:1px solid ${t.primary};color:${t.primary};padding:.65rem 1.5rem;border-radius:8px;font-weight:700;font-size:.8rem;letter-spacing:1px;text-transform:uppercase;transition:.25s}.nav-btn:hover{background:${t.primary};color:#fff;box-shadow:0 0 25px ${t.primary}60}
.hero{position:relative;min-height:100vh;display:flex;align-items:center;overflow:hidden}.hero img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.45}
.hero::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,${t.dark} 8%,${t.dark}cc 45%,transparent 90%),linear-gradient(0deg,${t.dark},transparent 40%)}
.hero-in{position:relative;z-index:2;max-width:1300px;margin:0 auto;padding:9rem 5% 6rem;width:100%}
.tag{display:inline-flex;align-items:center;gap:.5rem;border:1px solid ${t.primary}55;background:${t.primary}12;color:${t.primary};padding:.45rem 1rem;border-radius:6px;font-size:.72rem;font-weight:800;letter-spacing:2px;text-transform:uppercase;margin-bottom:1.5rem}
.tag .dot{width:7px;height:7px;border-radius:50%;background:${t.primary};box-shadow:0 0 10px ${t.primary}}
.hero h1{font-family:'Orbitron',sans-serif;font-size:4.6rem;font-weight:900;line-height:1.02;color:#fff;letter-spacing:-1px;margin-bottom:1.5rem;max-width:700px}
.hero h1 span{color:${t.primary};text-shadow:0 0 40px ${t.primary}70}.hero p{color:rgba(255,255,255,.6);font-size:1.08rem;line-height:1.8;max-width:500px;margin-bottom:2.25rem}
.actions{display:flex;gap:1rem;flex-wrap:wrap}
.btn{background:${t.primary};color:#0a0a0a;padding:1rem 2.3rem;border-radius:8px;font-weight:900;font-size:.9rem;letter-spacing:1px;text-transform:uppercase;border:none;cursor:pointer;transition:.25s;box-shadow:0 0 30px ${t.primary}45}.btn:hover{transform:translateY(-3px);box-shadow:0 0 50px ${t.primary}70}
.btn-o{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.2);color:#fff;padding:1rem 2.3rem;border-radius:8px;font-weight:700;font-size:.9rem;letter-spacing:1px;text-transform:uppercase;cursor:pointer;backdrop-filter:blur(6px);transition:.25s}.btn-o:hover{border-color:${t.primary};color:${t.primary}}
.hero-stats{position:absolute;right:5%;bottom:6rem;z-index:2;display:flex;flex-direction:column;gap:1rem}
.hs{background:rgba(10,10,10,.6);border:1px solid rgba(255,255,255,.1);backdrop-filter:blur(10px);border-radius:10px;padding:1rem 1.5rem;min-width:180px}
.hs b{display:block;font-family:'Orbitron',sans-serif;font-size:1.5rem;color:${t.primary}}.hs span{font-size:.68rem;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.4)}
.section{padding:6rem 5%;max-width:1250px;margin:0 auto}.section-head{display:flex;align-items:end;justify-content:space-between;gap:2rem;margin-bottom:2.5rem;flex-wrap:wrap}
.section-head h2{font-family:'Orbitron',sans-serif;font-size:2.4rem;color:#fff;letter-spacing:1px}.section-head p{color:rgba(255,255,255,.4);font-size:.9rem;max-width:380px}
.matches{display:flex;flex-direction:column;gap:.5rem}
.match{display:grid;grid-template-columns:110px 1fr auto 90px;align-items:center;gap:1.25rem;background:${t.darkAlt};border:1px solid rgba(255,255,255,.07);border-left:3px solid transparent;border-radius:10px;padding:1.1rem 1.4rem;transition:.25s}
.match:hover{border-left-color:${t.primary};transform:translateX(4px)}.match .date{font-size:.72rem;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${t.primary}}
.match .teams{display:flex;align-items:center;gap:.9rem;color:#fff;font-weight:700;font-size:.95rem}
.match .vs{color:rgba(255,255,255,.3);font-size:.7rem;font-weight:800;letter-spacing:1px}
.match .game{font-size:.72rem;color:rgba(255,255,255,.4);text-transform:uppercase;letter-spacing:1px}
.match .live{justify-self:end;font-size:.65rem;font-weight:800;letter-spacing:1px;color:#0a0a0a;background:${t.accent};padding:.3rem .65rem;border-radius:4px}
.roster{display:grid;grid-template-columns:repeat(4,1fr);gap:1.25rem}
.player{position:relative;border-radius:14px;overflow:hidden;background:${t.darkAlt};border:1px solid rgba(255,255,255,.07);transition:.3s}
.player:hover{transform:translateY(-6px);border-color:${t.primary}50;box-shadow:0 20px 40px rgba(0,0,0,.35)}
.player img{width:100%;height:250px;object-fit:cover;filter:grayscale(35%);transition:.4s}.player:hover img{filter:none}.player .info{padding:1.2rem}
.player h3{color:#fff;font-size:1rem;letter-spacing:.5px}.player span{font-size:.72rem;color:${t.primary};font-weight:700;text-transform:uppercase;letter-spacing:1.5px}
.cta{position:relative;margin:0 5% 6rem;max-width:1250px;background:linear-gradient(120deg,${t.primary}20,${t.secondary}10);border:1px solid ${t.primary}35;border-radius:18px;padding:3.5rem;display:flex;align-items:center;justify-content:space-between;gap:2rem;flex-wrap:wrap;overflow:hidden}
.cta::before{content:'';position:absolute;width:300px;height:300px;border-radius:50%;background:${t.primary}20;filter:blur(80px);right:10%;top:-50%}
.cta h2{font-family:'Orbitron',sans-serif;font-size:2rem;color:#fff;position:relative}.cta p{color:rgba(255,255,255,.5);margin-top:.5rem;position:relative}
footer{border-top:1px solid rgba(255,255,255,.07);padding:2.5rem 5%;text-align:center;font-size:.78rem;color:rgba(255,255,255,.3);letter-spacing:1px}
@media(max-width:1000px){.hero h1{font-size:3.3rem}.hero-stats{display:none}.roster{grid-template-columns:1fr 1fr}.match{grid-template-columns:100px 1fr auto}.match .game{display:none}}
@media(max-width:700px){nav ul{display:none}.hero h1{font-size:2.4rem}.roster{grid-template-columns:1fr}.match{grid-template-columns:1fr;gap:.5rem}.match .live{justify-self:start}.section-head h2{font-size:1.8rem}.cta{padding:2.5rem 1.5rem}.cta h2{font-size:1.5rem}}
</style>
</head>
<body>
<nav><a href="#" class="logo">NOVA<span>STRIKE</span></a><ul><li><a href="#matches">Matches</a></li><li><a href="#roster">Roster</a></li><li><a href="#about">About</a></li></ul><a href="#watch" class="nav-btn">Watch Live</a></nav>
<section class="hero">
<img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&h=1000&fit=crop" alt="Esports arena">
<div class="hero-in">
<div class="tag"><span class="dot"></span>Season 12 · Live Now</div>
<h1>PLAY LOUDER.<br><span>WIN HARDER.</span></h1>
<p>We are NovaStrike — a competitive esports organisation built on discipline, chemistry, and the belief that the next play is always the best one.</p>
<div class="actions"><a href="#watch" class="btn">Watch Live</a><a href="#roster" class="btn-o">Meet the Roster</a></div>
</div>
<div class="hero-stats"><div class="hs"><b>38</b><span>Tournament wins</span></div><div class="hs"><b>1.4M</b><span>Followers</span></div><div class="hs"><b>#3</b><span>World ranking</span></div></div>
</section>
<section class="section" id="matches"><div class="section-head"><h2>Upcoming Matches</h2><p>Follow the run to the world finals. All times shown in your local zone.</p></div>
<div class="matches">
<div class="match"><div class="date">Oct 24 · 19:00</div><div class="teams">NOVA <span class="vs">VS</span> TITAN</div><div class="game">Valorant · Group A</div><span class="live">LIVE</span></div>
<div class="match"><div class="date">Oct 27 · 21:30</div><div class="teams">NOVA <span class="vs">VS</span> PHANTOM</div><div class="game">Valorant · Group A</div><span class="live">TICKETS</span></div>
<div class="match"><div class="date">Nov 02 · 18:00</div><div class="teams">NOVA <span class="vs">VS</span> ECHO</div><div class="game">Apex · Playoffs</div><span class="live">TICKETS</span></div>
</div></section>
<section class="section" id="roster" style="padding-top:0"><div class="section-head"><h2>The Roster</h2><p>Five players. One system. Zero excuses.</p></div>
<div class="roster">
<div class="player"><img src="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&h=600&fit=crop" alt="Player"><div class="info"><h3>VYPER</h3><span>Duelist</span></div></div>
<div class="player"><img src="https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=500&h=600&fit=crop" alt="Player"><div class="info"><h3>KILO</h3><span>Controller</span></div></div>
<div class="player"><img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&h=600&fit=crop" alt="Player"><div class="info"><h3>ECHO</h3><span>Initiator</span></div></div>
<div class="player"><img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&h=600&fit=crop" alt="Player"><div class="info"><h3>RIFT</h3><span>Sentinel</span></div></div>
</div></section>
<section class="cta" id="watch"><div><h2>Never miss a round.</h2><p>Stream every match live on Twitch and YouTube.</p></div><a href="#" class="btn">Follow The Team</a></section>
<footer>© 2026 NovaStrike Esports. All rights reserved.</footer>
</body></html>`,
  },
  {
    id: "hotel-azurebay",
    name: "Azure Bay — Boutique Resort",
    category: "Hotel / Hospitality",
    description: "Elegant resort layout with full-screen hero, floating booking bar, room cards, amenities, and refined serif typography.",
    thumb: "🏨",
    getCode: (t: T) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Azure Bay Resort</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:${t.light};color:#1c1917;overflow-x:hidden}a{text-decoration:none;color:inherit}
nav{position:absolute;top:0;left:0;right:0;z-index:10;display:flex;align-items:center;justify-content:space-between;padding:1.5rem 5%;max-width:1400px;margin:0 auto}
.logo{font-family:'Playfair Display',serif;font-size:1.55rem;font-weight:600;color:#fff;letter-spacing:.5px}.logo span{color:${t.accent}}
nav ul{list-style:none;display:flex;gap:2.25rem}nav ul a{font-size:.82rem;font-weight:500;color:rgba(255,255,255,.85);letter-spacing:1px;text-transform:uppercase;transition:.2s}nav ul a:hover{color:${t.accent}}
.nav-btn{border:1px solid rgba(255,255,255,.6);color:#fff;padding:.7rem 1.6rem;border-radius:50px;font-size:.78rem;font-weight:600;letter-spacing:1px;text-transform:uppercase;transition:.25s}.nav-btn:hover{background:#fff;color:#1c1917}
.hero{position:relative;min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;overflow:hidden}
.hero img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.hero::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.5),rgba(0,0,0,.15) 45%,rgba(0,0,0,.55))}
.hero-in{position:relative;z-index:2;padding:8rem 5% 7rem;max-width:900px}
.eyebrow{color:${t.accent};font-size:.75rem;font-weight:600;letter-spacing:4px;text-transform:uppercase;margin-bottom:1.25rem}
.hero h1{font-family:'Playfair Display',serif;font-size:4.6rem;font-weight:600;line-height:1.08;color:#fff;letter-spacing:-.5px;margin-bottom:1.4rem}
.hero p{color:rgba(255,255,255,.82);font-size:1.08rem;line-height:1.8;max-width:520px;margin:0 auto 2rem}
.hero .star{color:${t.accent};letter-spacing:.3rem;margin-bottom:1rem;font-size:.9rem}
.booking{position:relative;z-index:5;max-width:1050px;margin:-3.5rem auto 0;background:#fff;border-radius:14px;box-shadow:0 25px 60px rgba(0,0,0,.14);display:grid;grid-template-columns:1fr 1fr 1fr 1fr auto;gap:0;overflow:hidden}
.bk{padding:1.35rem 1.5rem;border-right:1px solid #e7e5e4}
.bk span{display:block;font-size:.65rem;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#a8a29e;margin-bottom:.35rem}
.bk b{font-size:.9rem;font-weight:600;color:#1c1917}
.bk-btn{background:${t.secondary};color:#fff;border:none;padding:0 2.2rem;font-size:.8rem;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;transition:.25s}.bk-btn:hover{background:${t.primary}}
.section{padding:6rem 5%;max-width:1250px;margin:0 auto}.head{text-align:center;margin-bottom:3.5rem}
.tag{color:${t.secondary};font-size:.72rem;font-weight:700;letter-spacing:3px;text-transform:uppercase}
.head h2{font-family:'Playfair Display',serif;font-size:2.9rem;font-weight:600;color:#1c1917;margin:.8rem 0 .7rem}
.head p{color:#78716c;line-height:1.7;max-width:520px;margin:0 auto}.rooms{display:grid;grid-template-columns:repeat(3,1fr);gap:1.75rem}
.room{background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,.07);transition:.35s}
.room:hover{transform:translateY(-7px);box-shadow:0 24px 50px rgba(0,0,0,.12)}.room img{width:100%;height:250px;object-fit:cover}.room .body{padding:1.7rem}
.room .kind{font-size:.65rem;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${t.secondary};margin-bottom:.6rem}
.room h3{font-family:'Playfair Display',serif;font-size:1.45rem;font-weight:600;margin-bottom:.5rem}.room p{font-size:.85rem;color:#78716c;line-height:1.7;margin-bottom:1.1rem}
.room .row{display:flex;align-items:center;justify-content:space-between;border-top:1px solid #e7e5e4;padding-top:1rem}
.room .price{font-weight:700;color:#1c1917}.room .price span{font-size:.72rem;font-weight:500;color:#a8a29e}
.room .book{font-size:.75rem;font-weight:700;color:${t.secondary};border-bottom:1px solid ${t.secondary};padding-bottom:2px}
.amenities{background:#1c1917;color:#fff;padding:5.5rem 5%}.amen-in{max-width:1150px;margin:0 auto;display:grid;grid-template-columns:.9fr 1.1fr;gap:4rem;align-items:center}
.amen-in h2{font-family:'Playfair Display',serif;font-size:2.8rem;font-weight:600;line-height:1.15;margin-bottom:1rem}
.amen-in p{color:rgba(255,255,255,.55);line-height:1.8;font-size:.94rem}.amen-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem}
.am{display:flex;gap:.9rem;align-items:flex-start}
.am .ic{width:42px;height:42px;flex-shrink:0;border-radius:10px;background:rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;font-size:1.1rem}
.am b{display:block;font-size:.92rem;margin-bottom:.2rem}.am span{font-size:.78rem;color:rgba(255,255,255,.45);line-height:1.5}
.cta{position:relative;min-height:420px;display:flex;align-items:center;justify-content:center;text-align:center;overflow:hidden;margin-top:6rem}
.cta img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.cta::after{content:'';position:absolute;inset:0;background:rgba(0,0,0,.55)}
.cta-in{position:relative;z-index:2;padding:5rem 5%}.cta h2{font-family:'Playfair Display',serif;font-size:2.9rem;color:#fff;margin-bottom:.8rem}
.cta p{color:rgba(255,255,255,.8);margin-bottom:2rem}
.btn{background:#fff;color:#1c1917;padding:1rem 2.4rem;border-radius:50px;font-weight:700;font-size:.82rem;letter-spacing:1.5px;text-transform:uppercase;transition:.25s;display:inline-block}.btn:hover{background:${t.accent};transform:translateY(-2px)}
footer{padding:2.5rem 5%;text-align:center;font-size:.78rem;color:#a8a29e}
@media(max-width:1000px){.hero h1{font-size:3.4rem}.booking{grid-template-columns:1fr 1fr;margin:0 5%;border-radius:14px}.bk:nth-child(2){border-right:none}.bk-btn{padding:1rem;grid-column:1/-1}.rooms{grid-template-columns:1fr 1fr}.amen-in{grid-template-columns:1fr;gap:2.5rem}}
@media(max-width:700px){nav ul{display:none}.hero h1{font-size:2.5rem}.rooms{grid-template-columns:1fr}.amen-grid{grid-template-columns:1fr}.booking{grid-template-columns:1fr;margin-top:1.5rem}.bk{border-right:none;border-bottom:1px solid #e7e5e4}.cta h2{font-size:2rem}.head h2{font-size:2.1rem}}
</style>
</head>
<body>
<nav><a href="#" class="logo">Azure<span>Bay</span></a><ul><li><a href="#rooms">Rooms</a></li><li><a href="#amenities">Experiences</a></li><li><a href="#contact">Contact</a></li></ul><a href="#book" class="nav-btn">Reserve</a></nav>
<section class="hero">
<img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&h=1000&fit=crop" alt="Resort pool">
<div class="hero-in"><div class="star">★★★★★</div><div class="eyebrow">Private Bay · Amalfi Coast</div><h1>Where the sea sets the pace.</h1><p>Twenty-eight suites, one hidden shoreline, and the kind of quiet you can only find at the edge of the map.</p></div>
</section>
<div class="booking" id="book"><div class="bk"><span>Check-in</span><b>12 Oct 2026</b></div><div class="bk"><span>Check-out</span><b>18 Oct 2026</b></div><div class="bk"><span>Guests</span><b>2 Adults</b></div><div class="bk"><span>Room</span><b>Sea Suite</b></div><button class="bk-btn">Check Availability</button></div>
<section class="section" id="rooms"><div class="head"><span class="tag">Stay With Us</span><h2>Rooms &amp; Suites</h2><p>Each room opens to the water, dressed in linen, stone, and Mediterranean light.</p></div>
<div class="rooms">
<div class="room"><img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=700&h=500&fit=crop" alt="Sea Suite"><div class="body"><div class="kind">Sea View</div><h3>The Sea Suite</h3><p>King bed, private terrace, and floor-to-ceiling views of the bay.</p><div class="row"><div class="price">$420 <span>/ night</span></div><a href="#" class="book">Reserve →</a></div></div></div>
<div class="room"><img src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=700&h=500&fit=crop" alt="Garden Villa"><div class="body"><div class="kind">Garden</div><h3>The Garden Villa</h3><p>A secluded villa with an outdoor shower and citrus courtyard.</p><div class="row"><div class="price">$560 <span>/ night</span></div><a href="#" class="book">Reserve →</a></div></div></div>
<div class="room"><img src="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=700&h=500&fit=crop" alt="Cliff House"><div class="body"><div class="kind">Private</div><h3>The Cliff House</h3><p>Two bedrooms, infinity pool, and a private path down to the sea.</p><div class="row"><div class="price">$980 <span>/ night</span></div><a href="#" class="book">Reserve →</a></div></div></div>
</div></section>
<section class="amenities" id="amenities"><div class="amen-in"><div><span class="tag" style="color:${t.accent}">The Experience</span><h2 style="margin-top:.8rem">Days designed to slow down.</h2><p>Breakfast on the terrace, a boat at noon, dinner under the pergola. Everything is included, nothing is rushed.</p></div><div class="amen-grid">
<div class="am"><div class="ic">🌊</div><div><b>Private Beach</b><span>Direct access to the cove</span></div></div>
<div class="am"><div class="ic">🍽️</div><div><b>Coastal Kitchen</b><span>Farm-to-table dining</span></div></div>
<div class="am"><div class="ic">🧖</div><div><b>Spa & Hammam</b><span>Salt, stone, and stillness</span></div></div>
<div class="am"><div class="ic">⛵</div><div><b>Boat Charters</b><span>Explore the coastline</span></div></div>
</div></div></section>
<section class="cta"><img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&h=800&fit=crop" alt="Beach"><div class="cta-in"><h2>Your table by the sea is waiting.</h2><p>Reserve directly for complimentary breakfast and late checkout.</p><a href="#book" class="btn">Book Your Stay</a></div></section>
<footer><p>© 2026 Azure Bay Resort. All rights reserved.</p></footer>
</body></html>`,
  },
  {
    id: "events-everafter",
    name: "EverAfter — Wedding Planner",
    category: "Events / Wedding",
    description: "Romantic editorial layout with soft palette, full-width hero, portfolio gallery, services, testimonial, and inquiry CTA.",
    thumb: "💍",
    getCode: (t: T) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>EverAfter Weddings</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:${t.light};color:#3f3a36;overflow-x:hidden}a{text-decoration:none;color:inherit}
nav{position:absolute;top:0;left:0;right:0;z-index:10;display:flex;align-items:center;justify-content:space-between;padding:1.75rem 5%;max-width:1400px;margin:0 auto}
.logo{font-family:'Cormorant Garamond',serif;font-size:1.75rem;font-weight:600;color:#fff;letter-spacing:1px}
nav ul{list-style:none;display:flex;gap:2.25rem}nav ul a{font-size:.78rem;color:rgba(255,255,255,.85);letter-spacing:2px;text-transform:uppercase;transition:.2s}nav ul a:hover{color:#fff}
.nav-btn{border:1px solid rgba(255,255,255,.7);color:#fff;padding:.65rem 1.5rem;border-radius:2px;font-size:.7rem;letter-spacing:2px;text-transform:uppercase;transition:.25s}.nav-btn:hover{background:#fff;color:#3f3a36}
.hero{position:relative;min-height:95vh;display:flex;align-items:center;justify-content:center;text-align:center;overflow:hidden}
.hero img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.hero::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(30,20,15,.45),rgba(30,20,15,.2) 50%,rgba(30,20,15,.55))}
.hero-in{position:relative;z-index:2;padding:9rem 5% 7rem;max-width:850px}.eyebrow{color:#fff;font-size:.7rem;letter-spacing:4px;text-transform:uppercase;margin-bottom:1.5rem}
.hero h1{font-family:'Cormorant Garamond',serif;font-size:5rem;font-weight:500;line-height:1.05;color:#fff;margin-bottom:1.5rem}.hero h1 em{font-style:italic}
.hero p{color:rgba(255,255,255,.85);font-size:1rem;line-height:1.8;max-width:480px;margin:0 auto 2.25rem}
.btn{display:inline-block;background:#fff;color:#3f3a36;padding:.95rem 2.4rem;font-size:.72rem;letter-spacing:2px;text-transform:uppercase;font-weight:600;transition:.25s}.btn:hover{background:${t.accent};transform:translateY(-2px)}
.intro{max-width:1000px;margin:0 auto;padding:6rem 5%;text-align:center}
.intro .tag{color:${t.secondary};font-size:.7rem;letter-spacing:3px;text-transform:uppercase;font-weight:600}
.intro h2{font-family:'Cormorant Garamond',serif;font-size:3rem;font-weight:500;color:#2f2a26;line-height:1.2;margin:1rem 0 1.2rem}
.intro p{color:#847b73;line-height:1.9;max-width:620px;margin:0 auto}.section{padding:0 5% 6rem;max-width:1250px;margin:0 auto}
.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem}.g{position:relative;overflow:hidden}.g img{width:100%;height:320px;object-fit:cover;transition:transform .7s ease}
.g:hover img{transform:scale(1.06)}.g:nth-child(2) img,.g:nth-child(3) img{height:380px}.g.tall{grid-row:span 1}
.services{display:grid;grid-template-columns:repeat(3,1fr);gap:2.5rem;max-width:1100px;margin:0 auto;padding:0 5% 6rem}
.svc{text-align:center;padding:2.5rem 1.5rem;border-top:1px solid #e7e2dc}.svc .ic{font-size:1.7rem;margin-bottom:1rem}
.svc h3{font-family:'Cormorant Garamond',serif;font-size:1.5rem;font-weight:600;margin-bottom:.6rem;color:#2f2a26}.svc p{font-size:.85rem;line-height:1.8;color:#847b73}
.quote{background:${t.accent}35;padding:5rem 5%;text-align:center}
.quote blockquote{font-family:'Cormorant Garamond',serif;font-size:2rem;font-style:italic;line-height:1.5;color:#2f2a26;max-width:850px;margin:0 auto 1.5rem}
.quote cite{font-style:normal;font-size:.7rem;letter-spacing:2.5px;text-transform:uppercase;color:#6b625a}
.cta{max-width:1100px;margin:0 auto;padding:6rem 5%;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center}.cta img{width:100%;height:440px;object-fit:cover}
.cta h2{font-family:'Cormorant Garamond',serif;font-size:2.8rem;font-weight:500;line-height:1.2;color:#2f2a26;margin-bottom:1rem}
.cta p{color:#847b73;line-height:1.8;font-size:.9rem;margin-bottom:1.75rem}.cta .btn{background:${t.secondary};color:#fff}.cta .btn:hover{background:${t.primary}}
footer{padding:2.5rem 5%;text-align:center;font-size:.72rem;letter-spacing:1.5px;color:#a89f97;border-top:1px solid #e7e2dc}
@media(max-width:1000px){.hero h1{font-size:3.8rem}.grid{grid-template-columns:1fr 1fr}.cta{grid-template-columns:1fr;gap:2.5rem}.cta img{height:340px}}
@media(max-width:700px){nav ul{display:none}.hero h1{font-size:2.8rem}.services{grid-template-columns:1fr;gap:0}.intro h2{font-size:2.2rem}.quote blockquote{font-size:1.5rem}.cta h2{font-size:2rem}.grid img,.g:nth-child(2) img,.g:nth-child(3) img{height:240px}}
</style>
</head>
<body>
<nav><a href="#" class="logo">EverAfter</a><ul><li><a href="#portfolio">Portfolio</a></li><li><a href="#services">Services</a></li><li><a href="#contact">Contact</a></li></ul><a href="#contact" class="nav-btn">Inquire</a></nav>
<section class="hero">
<img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&h=1000&fit=crop" alt="Wedding couple">
<div class="hero-in"><div class="eyebrow">Full-Service Wedding Planning</div><h1>Weddings that feel<br><em>like you.</em></h1><p>Thoughtful design, calm coordination, and the kind of day you actually get to enjoy.</p><a href="#contact" class="btn">Start Planning</a></div>
</section>
<section class="intro"><span class="tag">The Studio</span><h2>Beautifully considered, effortlessly held.</h2><p>We plan intimate celebrations and grand gatherings across the coast and countryside. Every detail is intentional — from the first invitation to the last dance.</p></section>
<section class="section" id="portfolio"><div class="grid">
<div class="g"><img src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=700&h=800&fit=crop" alt="Wedding details"></div>
<div class="g"><img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=700&h=900&fit=crop" alt="Wedding ceremony"></div>
<div class="g"><img src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=700&h=900&fit=crop" alt="Wedding reception"></div>
<div class="g"><img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=700&h=800&fit=crop" alt="Bride and groom"></div>
</div></section>
<section class="services" id="services">
<div class="svc"><div class="ic">✿</div><h3>Full Planning</h3><p>Concept, vendors, design, and day-of coordination — handled end to end.</p></div>
<div class="svc"><div class="ic">◇</div><h3>Design & Styling</h3><p>Florals, tablescapes, lighting, and stationery that tell your story.</p></div>
<div class="svc"><div class="ic">⌘</div><h3>Day Coordination</h3><p>We take the timeline so you can be fully present for every moment.</p></div>
</section>
<section class="quote"><blockquote>“They made the whole process feel calm and deeply personal. Our day was exactly us — only better.”</blockquote><cite>— Maya &amp; Jonah, Amalfi Coast</cite></section>
<section class="cta" id="contact"><img src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=900&h=1000&fit=crop" alt="Wedding table"><div><h2>Let's plan something beautiful.</h2><p>We take a limited number of weddings each year to give every couple our full attention. Tell us your date and vision.</p><a href="#" class="btn">Request Availability</a></div></section>
<footer>© 2026 EverAfter Weddings · Planning with heart since 2014</footer>
</body></html>`,
  },
  {
    id: "consulting-northbridge",
    name: "Northbridge — Consulting",
    category: "Consulting",
    description: "Clean corporate layout with split hero, client logos, service pillars, results metrics, and case-study cards.",
    thumb: "📈",
    getCode: (t: T) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Northbridge Consulting</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:${t.light};color:#0f172a;overflow-x:hidden}a{text-decoration:none;color:inherit}
nav{display:flex;align-items:center;justify-content:space-between;padding:1.4rem 5%;max-width:1300px;margin:0 auto}
.logo{display:flex;align-items:center;gap:.6rem;font-weight:800;font-size:1.15rem;letter-spacing:-.3px;color:${t.dark}}
.logo .mark{width:32px;height:32px;border-radius:8px;background:${t.primary};display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:.95rem}
nav ul{list-style:none;display:flex;gap:2rem}nav ul a{font-size:.86rem;font-weight:500;color:#475569;transition:.2s}nav ul a:hover{color:${t.primary}}
.nav-btn{background:${t.primary};color:#fff;padding:.75rem 1.6rem;border-radius:9px;font-size:.83rem;font-weight:600;transition:.25s;box-shadow:0 8px 20px ${t.primary}30}.nav-btn:hover{transform:translateY(-2px);box-shadow:0 12px 28px ${t.primary}45}
.hero{display:grid;grid-template-columns:1.05fr .95fr;gap:4rem;align-items:center;max-width:1300px;margin:0 auto;padding:4.5rem 5% 6rem}
.pill{display:inline-flex;align-items:center;gap:.5rem;background:${t.primary}12;color:${t.primary};padding:.4rem 1rem;border-radius:50px;font-size:.74rem;font-weight:700;letter-spacing:.5px;margin-bottom:1.5rem}
.hero h1{font-size:3.8rem;font-weight:800;line-height:1.08;letter-spacing:-1.8px;color:${t.dark};margin-bottom:1.4rem}.hero h1 span{color:${t.primary}}
.hero p{font-size:1.06rem;line-height:1.8;color:#475569;max-width:490px;margin-bottom:2.1rem}.actions{display:flex;gap:1rem;flex-wrap:wrap;align-items:center}
.btn{background:${t.primary};color:#fff;padding:1rem 2.2rem;border-radius:9px;font-weight:600;font-size:.9rem;transition:.25s;box-shadow:0 10px 24px ${t.primary}30;display:inline-block}.btn:hover{transform:translateY(-3px);box-shadow:0 16px 32px ${t.primary}40}
.link{font-size:.9rem;font-weight:600;color:${t.dark};display:inline-flex;align-items:center;gap:.4rem}.hero-media{position:relative}
.hero-media img{width:100%;height:470px;object-fit:cover;border-radius:18px}
.metric{position:absolute;left:-24px;bottom:30px;background:#fff;border-radius:14px;padding:1.25rem 1.5rem;box-shadow:0 18px 45px rgba(15,23,42,.15)}
.metric b{display:block;font-size:1.7rem;font-weight:800;color:${t.primary};line-height:1}.metric span{font-size:.7rem;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:#94a3b8}
.logos{max-width:1150px;margin:0 auto;padding:1.5rem 5% 4rem;display:flex;align-items:center;justify-content:space-between;gap:2rem;flex-wrap:wrap;border-bottom:1px solid #e2e8f0}
.logos span{font-size:.7rem;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#94a3b8}.logos b{font-size:1.1rem;font-weight:800;color:#cbd5e1;letter-spacing:-.5px}
.section{padding:5.5rem 5%;max-width:1200px;margin:0 auto}.head{max-width:620px;margin-bottom:3rem}
.tag{color:${t.primary};font-size:.72rem;font-weight:800;letter-spacing:3px;text-transform:uppercase}
.head h2{font-size:2.7rem;font-weight:800;letter-spacing:-1px;color:${t.dark};margin:.8rem 0 .8rem;line-height:1.15}.head p{color:#64748b;line-height:1.75}
.services{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem}.svc{background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:2.25rem;transition:.3s}
.svc:hover{transform:translateY(-6px);box-shadow:0 20px 45px rgba(15,23,42,.08);border-color:${t.primary}50}
.svc .ic{width:50px;height:50px;border-radius:12px;background:${t.primary}12;color:${t.primary};display:flex;align-items:center;justify-content:center;font-size:1.3rem;margin-bottom:1.2rem}
.svc h3{font-size:1.1rem;font-weight:700;color:${t.dark};margin-bottom:.5rem}.svc p{font-size:.86rem;line-height:1.75;color:#64748b;margin-bottom:1.1rem}
.svc a{font-size:.8rem;font-weight:700;color:${t.primary}}.results{background:${t.dark};color:#fff;padding:5rem 5%}
.results-in{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:2rem;text-align:center}
.res b{display:block;font-size:3rem;font-weight:800;color:${t.accent};line-height:1;margin-bottom:.5rem}.res span{font-size:.76rem;letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,255,255,.45)}
.cases{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem}
.case{position:relative;border-radius:18px;overflow:hidden;min-height:320px;display:flex;align-items:flex-end;color:#fff}
.case img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:.5s}.case:hover img{transform:scale(1.05)}
.case::after{content:'';position:absolute;inset:0;background:linear-gradient(to top,rgba(2,6,23,.9),rgba(2,6,23,.15) 65%)}.case .body{position:relative;z-index:2;padding:2rem}
.case .cat{font-size:.65rem;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${t.accent};margin-bottom:.5rem}
.case h3{font-size:1.35rem;font-weight:700;margin-bottom:.4rem}.case p{font-size:.83rem;color:rgba(255,255,255,.65);line-height:1.6}
.cta{max-width:1000px;margin:5rem auto 6rem;padding:0 5%}
.cta-in{background:${t.primary};border-radius:22px;padding:3.5rem;display:flex;align-items:center;justify-content:space-between;gap:2rem;flex-wrap:wrap;color:#fff}
.cta h2{font-size:2.1rem;font-weight:800;letter-spacing:-.5px}.cta p{color:rgba(255,255,255,.8);margin-top:.4rem;font-size:.9rem}
.cta .btn{background:#fff;color:${t.primary};box-shadow:none}footer{border-top:1px solid #e2e8f0;padding:2.5rem 5%;text-align:center;font-size:.78rem;color:#94a3b8}
@media(max-width:1000px){.hero{grid-template-columns:1fr;gap:2.5rem}.hero h1{font-size:3rem}.hero-media{order:-1}.hero-media img{height:360px}.services{grid-template-columns:1fr 1fr}.results-in{grid-template-columns:1fr 1fr}}
@media(max-width:700px){nav ul{display:none}.hero h1{font-size:2.35rem}.services,.cases,.results-in{grid-template-columns:1fr}.head h2{font-size:2rem}.cta-in{padding:2.5rem 1.5rem}.cta h2{font-size:1.6rem}.metric{left:1rem}}
</style>
</head>
<body>
<nav><a href="#" class="logo"><span class="mark">N</span>Northbridge</a><ul><li><a href="#services">Services</a></li><li><a href="#results">Results</a></li><li><a href="#cases">Case Studies</a></li></ul><a href="#contact" class="nav-btn">Book a Call</a></nav>
<section class="hero">
<div>
<div class="pill">Strategy · Operations · Growth</div>
<h1>Clarity for your <span>next chapter.</span></h1>
<p>We help leadership teams cut through complexity, make better decisions, and turn strategy into measurable results — without the big-firm overhead.</p>
<div class="actions"><a href="#contact" class="btn">Book a Strategy Call</a><a href="#cases" class="link">See our work →</a></div>
</div>
<div class="hero-media"><img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&h=900&fit=crop" alt="Consulting session"><div class="metric"><b>+38%</b><span>Avg. revenue lift</span></div></div>
</section>
<div class="logos"><span>Trusted by teams at</span><b>NORTHWIND</b><b>ALTA</b><b>LUMEN</b><b>ORBIT</b><b>VANTAGE</b></div>
<section class="section" id="services"><div class="head"><span class="tag">What We Do</span><h2>Focused support, senior attention.</h2><p>Small teams of experienced operators — embedded with yours for as long as you need.</p></div>
<div class="services">
<div class="svc"><div class="ic">🎯</div><h3>Growth Strategy</h3><p>Market positioning, pricing, and go-to-market plans that compound.</p><a href="#">Learn more →</a></div>
<div class="svc"><div class="ic">⚙️</div><h3>Operations</h3><p>Process design and systems that scale without adding headcount.</p><a href="#">Learn more →</a></div>
<div class="svc"><div class="ic">📊</div><h3>Data & Analytics</h3><p>Dashboards and decision frameworks your team will actually use.</p><a href="#">Learn more →</a></div>
</div></section>
<div class="results" id="results"><div class="results-in"><div class="res"><b>120+</b><span>Engagements</span></div><div class="res"><b>+38%</b><span>Revenue lift</span></div><div class="res"><b>14</b><span>Industries</span></div><div class="res"><b>96%</b><span>Client retention</span></div></div></div>
<section class="section" id="cases"><div class="head"><span class="tag">Selected Work</span><h2>Outcomes, not slide decks.</h2></div>
<div class="cases">
<div class="case"><img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop" alt="Case study"><div class="body"><div class="cat">B2B SaaS</div><h3>From stalled pipeline to 3× growth</h3><p>Repositioned the product, rebuilt pricing, and rebuilt the sales motion in 90 days.</p></div></div>
<div class="case"><img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=600&fit=crop" alt="Case study"><div class="body"><div class="cat">Retail</div><h3>Cutting ops cost by 22%</h3><p>Redesigned fulfilment workflows across 40 locations without disruption.</p></div></div>
</div></section>
<div class="cta" id="contact"><div class="cta-in"><div><h2>Let's talk about what's next.</h2><p>30 minutes, no pitch. Just a useful conversation about your priorities.</p></div><a href="#" class="btn">Schedule a Call</a></div></div>
<footer>© 2026 Northbridge Consulting. All rights reserved.</footer>
</body></html>`,
  },
];
