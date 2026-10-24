interface T {
  name: string; primary: string; secondary: string; accent: string;
  dark: string; darkAlt: string; text: string; light: string;
}

export const jungleTemplates = [

  // ═══════════════════════════════════════════════════════════════
  // 1. FOREST CONSERVATION — Save the Trees
  // ═══════════════════════════════════════════════════════════════
  {
    id: "jungle-forest-conservation",
    name: "Forest Conservation",
    category: "Nature / Jungle",
    description: "Dark misty forest hero, animated leaf particles, donate CTA, tree counter stats, impact timeline, and volunteer signup.",
    thumb: "🌲",
    getCode: (t: T) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>GreenShield — Protect Our Forests</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:#060d06;color:#a8b5a0;overflow-x:hidden}a{text-decoration:none;color:inherit}
nav{position:absolute;top:0;left:0;right:0;z-index:10;display:flex;align-items:center;justify-content:space-between;padding:1.5rem 5%}
.logo{font-family:'Playfair Display',serif;font-size:1.6rem;font-weight:700;color:#fff}.logo span{color:#4ade80}
nav ul{list-style:none;display:flex;gap:2rem}nav ul a{font-size:.85rem;opacity:.5;transition:.2s}nav ul a:hover{opacity:1;color:#4ade80}
.hero{height:100vh;position:relative;display:flex;align-items:center;justify-content:center;text-align:center}
.hero-bg{position:absolute;inset:0}.hero-bg img{width:100%;height:100%;object-fit:cover;opacity:.35}
.hero-bg::after{content:'';position:absolute;inset:0;background:linear-gradient(to bottom,#060d0680,#060d06cc 70%,#060d06)}
@keyframes float{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-20px) rotate(5deg)}}
.leaf{position:absolute;font-size:1.5rem;opacity:.15;animation:float 6s ease-in-out infinite;z-index:1}
.hero-content{position:relative;z-index:2;max-width:750px;padding:0 2rem}
.hero-content .tag{display:inline-flex;align-items:center;gap:.5rem;background:rgba(74,222,128,.08);border:1px solid rgba(74,222,128,.2);border-radius:50px;padding:.4rem 1.2rem;font-size:.75rem;font-weight:600;color:#4ade80;margin-bottom:2rem}
.hero-content h1{font-family:'Playfair Display',serif;font-size:5rem;font-weight:900;color:#fff;line-height:1;margin-bottom:1.5rem}
.hero-content h1 span{color:#4ade80}
.hero-content p{opacity:.5;line-height:1.8;margin-bottom:2.5rem;max-width:550px;margin-left:auto;margin-right:auto}
.btn-g{background:#4ade80;color:#060d06;padding:1rem 2.5rem;border-radius:50px;font-weight:700;border:none;cursor:pointer;font-size:1rem;transition:.2s;box-shadow:0 8px 30px rgba(74,222,128,.25)}.btn-g:hover{box-shadow:0 12px 40px rgba(74,222,128,.4);transform:translateY(-2px)}
.btn-o{background:transparent;color:#fff;padding:1rem 2.5rem;border-radius:50px;font-weight:600;border:2px solid rgba(255,255,255,.15);cursor:pointer;font-size:1rem;margin-left:1rem;transition:.2s}.btn-o:hover{border-color:#4ade80;color:#4ade80}
.counter{padding:5rem 5%;max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:2rem}
.cnt{text-align:center;padding:2.5rem;background:rgba(74,222,128,.03);border:1px solid rgba(74,222,128,.08);border-radius:20px}
.cnt .n{font-size:3rem;font-weight:900;color:#4ade80;font-family:'Playfair Display',serif}.cnt .l{font-size:.8rem;opacity:.4;margin-top:.25rem}
.mission{padding:6rem 5%;max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center}
.mission-img{border-radius:24px;overflow:hidden;border:2px solid rgba(74,222,128,.1)}.mission-img img{width:100%;display:block}
.mission-text span{color:#4ade80;font-size:.8rem;text-transform:uppercase;letter-spacing:2px;font-weight:600}
.mission-text h2{font-family:'Playfair Display',serif;font-size:2.5rem;font-weight:800;color:#fff;margin:.75rem 0}
.mission-text p{opacity:.5;line-height:1.8;margin-bottom:1.5rem}
.mission-text ul{list-style:none;padding:0}.mission-text li{padding:.5rem 0;padding-left:1.5rem;position:relative;font-size:.9rem;opacity:.6}
.mission-text li::before{content:'🌿';position:absolute;left:0;top:.5rem}
.impact{padding:6rem 5%;max-width:900px;margin:0 auto}
.impact h2{font-family:'Playfair Display',serif;font-size:2.5rem;color:#fff;text-align:center;margin-bottom:3rem}
.tl{position:relative;padding-left:3rem}
.tl::before{content:'';position:absolute;left:14px;top:0;bottom:0;width:2px;background:linear-gradient(to bottom,#4ade80,rgba(74,222,128,.1))}
.tl-item{margin-bottom:2.5rem;position:relative}
.tl-item::before{content:'';position:absolute;left:-3rem;top:4px;width:14px;height:14px;border-radius:50%;background:#4ade80;border:3px solid #060d06;margin-left:8px}
.tl-item .year{color:#4ade80;font-size:.75rem;font-weight:600;letter-spacing:1px;margin-bottom:.25rem}
.tl-item h3{color:#fff;font-size:1.1rem;font-weight:700;margin-bottom:.25rem}
.tl-item p{font-size:.85rem;opacity:.5;line-height:1.6}
.volunteer{padding:6rem 5%;text-align:center}
.vol-box{max-width:700px;margin:0 auto;background:linear-gradient(135deg,rgba(74,222,128,.06),rgba(74,222,128,.02));border:1px solid rgba(74,222,128,.12);border-radius:24px;padding:4rem 3rem}
.vol-box h2{font-family:'Playfair Display',serif;font-size:2.2rem;color:#fff;margin-bottom:.5rem}.vol-box>p{opacity:.4;margin-bottom:2rem}
.vol-form{display:flex;gap:.75rem;max-width:450px;margin:0 auto}
.vol-form input{flex:1;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:.9rem 1.2rem;color:#fff;font-size:.9rem;outline:none;font-family:inherit}.vol-form input:focus{border-color:#4ade80}
.vol-form button{background:#4ade80;color:#060d06;padding:.9rem 1.5rem;border-radius:12px;font-weight:700;border:none;cursor:pointer;white-space:nowrap}
footer{padding:3rem 5%;border-top:1px solid rgba(74,222,128,.06);text-align:center;font-size:.8rem;opacity:.25}
@media(max-width:1024px){.hero-content h1{font-size:3rem}.counter,.mission{grid-template-columns:1fr}}
@media(max-width:640px){.hero-content h1{font-size:2.5rem}nav ul{display:none}.counter{grid-template-columns:1fr 1fr}.vol-form{flex-direction:column}}
</style>
</head>
<body>
<nav><div class="logo">Green<span>Shield</span></div><ul><li><a href="#">Mission</a></li><li><a href="#">Impact</a></li><li><a href="#">Volunteer</a></li></ul><button class="btn-g" style="padding:.6rem 1.5rem;font-size:.8rem">Donate Now</button></nav>
<section class="hero"><div class="hero-bg"><img src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=1400&h=900&fit=crop" alt="Forest"></div><div class="leaf" style="top:20%;left:10%;animation-delay:0s">🍃</div><div class="leaf" style="top:40%;right:15%;animation-delay:2s">🌿</div><div class="leaf" style="top:60%;left:20%;animation-delay:4s">🍂</div><div class="hero-content"><div class="tag">🌍 Every Tree Counts</div><h1>Protect Our <span>Forests</span></h1><p>Over 15 billion trees are cut down every year. We're on a mission to reverse deforestation and restore the planet's lungs.</p><button class="btn-g">Donate Now</button><button class="btn-o">Our Mission</button></div></section>
<div class="counter"><div class="cnt"><div class="n">12M+</div><div class="l">Trees Planted</div></div><div class="cnt"><div class="n">85</div><div class="l">Countries Active</div></div><div class="cnt"><div class="n">500K</div><div class="l">Volunteers</div></div><div class="cnt"><div class="n">2M</div><div class="l">Acres Protected</div></div></div>
<section class="mission"><div class="mission-img"><img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=500&fit=crop" alt="Planting"></div><div class="mission-text"><span>Our Mission</span><h2>Restoring Earth, One Tree at a Time</h2><p>We partner with local communities, scientists, and governments to protect existing forests and plant new ones in the most critical regions.</p><ul><li>Reforestation in 85+ countries worldwide</li><li>Partnership with 200+ indigenous communities</li><li>Carbon offset programs for corporations</li><li>Real-time satellite monitoring of forests</li></ul></div></section>
<section class="impact"><h2>Our Journey</h2><div class="tl">
<div class="tl-item"><div class="year">2018</div><h3>Founded GreenShield</h3><p>Started with 10 volunteers and a dream to plant 1 million trees in our first year.</p></div>
<div class="tl-item"><div class="year">2020</div><h3>Hit 5 Million Trees</h3><p>Expanded to 40 countries and partnered with the UN Environment Programme.</p></div>
<div class="tl-item"><div class="year">2023</div><h3>Satellite Monitoring Launch</h3><p>Deployed AI-powered deforestation alerts covering 100M+ hectares of forest.</p></div>
<div class="tl-item"><div class="year">2026</div><h3>12 Million Trees & Growing</h3><p>Now the world's largest volunteer-driven reforestation network.</p></div>
</div></section>
<section class="volunteer"><div class="vol-box"><h2>Join the Movement</h2><p>Sign up to volunteer or receive updates on our conservation efforts.</p><div class="vol-form"><input type="email" placeholder="Enter your email"><button>Join Us →</button></div></div></section>
<footer><p>© 2026 GreenShield. All rights reserved. 🌍</p></footer>
</body></html>`,
  },

  // ═══════════════════════════════════════════════════════════════
  // 2. WILDLIFE SAFARI — Tiger Expedition
  // ═══════════════════════════════════════════════════════════════
  {
    id: "jungle-wildlife-safari",
    name: "Wildlife Safari Tour",
    category: "Nature / Jungle",
    description: "Full-screen tiger hero, safari tour booking cards, animal species gallery with hover facts, guide profiles, and expedition pricing table.",
    thumb: "🐯",
    getCode: (t: T) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>WildTrack Safari</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:#080a05;color:#9ca88f;overflow-x:hidden}a{text-decoration:none;color:inherit}
nav{position:absolute;top:0;left:0;right:0;z-index:10;display:flex;align-items:center;justify-content:space-between;padding:1.5rem 5%}
.logo{font-size:1.5rem;font-weight:800;color:#fff;letter-spacing:3px;text-transform:uppercase}.logo span{color:#d4a55a}
nav ul{list-style:none;display:flex;gap:2rem}nav ul a{font-size:.85rem;opacity:.5;text-transform:uppercase;letter-spacing:1px;transition:.2s}nav ul a:hover{opacity:1;color:#d4a55a}
.hero{height:100vh;position:relative;display:flex;align-items:flex-end;padding:5rem 5%}
.hero-bg{position:absolute;inset:0}.hero-bg img{width:100%;height:100%;object-fit:cover;opacity:.55}
.hero-bg::after{content:'';position:absolute;inset:0;background:linear-gradient(to top,#080a05,transparent 50%,#080a0560)}
.hero-content{position:relative;z-index:1;max-width:650px}
.hero-content h1{font-family:'Playfair Display',serif;font-size:5rem;font-weight:900;color:#fff;line-height:.95;margin-bottom:1rem}
.hero-content h1 span{color:#d4a55a;font-style:italic}
.hero-content p{opacity:.5;line-height:1.8;margin-bottom:2rem}
.btn-s{background:#d4a55a;color:#080a05;padding:1rem 2.5rem;font-weight:700;border:none;cursor:pointer;font-size:.85rem;text-transform:uppercase;letter-spacing:3px;transition:.2s}.btn-s:hover{box-shadow:0 10px 35px rgba(212,165,90,.35)}
/* Expeditions */
.expeditions{padding:6rem 5%;max-width:1300px;margin:0 auto}
.expeditions h2{font-family:'Playfair Display',serif;font-size:2.5rem;color:#fff;margin-bottom:2.5rem}
.exp-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem}
.exp{background:#0d1008;border:1px solid rgba(212,165,90,.08);border-radius:20px;overflow:hidden;transition:.3s}
.exp:hover{border-color:rgba(212,165,90,.3);transform:translateY(-8px)}
.exp img{width:100%;height:200px;object-fit:cover}
.exp .body{padding:1.5rem}
.exp .dur{font-size:.7rem;color:#d4a55a;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:.5rem}
.exp h3{color:#fff;font-size:1.15rem;font-weight:700;margin-bottom:.5rem}
.exp p{font-size:.8rem;opacity:.5;line-height:1.6;margin-bottom:1rem}
.exp .bottom{display:flex;justify-content:space-between;align-items:center}
.exp .price{color:#d4a55a;font-weight:800;font-size:1.2rem}
.exp .book{background:#d4a55a;color:#080a05;padding:.4rem 1rem;border-radius:8px;font-size:.75rem;font-weight:700;border:none;cursor:pointer}
/* Animals */
.animals{padding:6rem 5%;max-width:1300px;margin:0 auto}
.animals h2{font-family:'Playfair Display',serif;font-size:2.5rem;color:#fff;margin-bottom:2.5rem}
.animal-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem}
.animal{aspect-ratio:3/4;position:relative;overflow:hidden;border-radius:16px;cursor:pointer}
.animal img{width:100%;height:100%;object-fit:cover;transition:transform .5s}
.animal:hover img{transform:scale(1.1)}
.animal .info{position:absolute;inset:0;background:linear-gradient(to top,#080a05ee,transparent 60%);display:flex;flex-direction:column;justify-content:flex-end;padding:1.25rem;transition:.3s}
.animal h4{color:#fff;font-size:1rem;font-weight:700}.animal .species{color:#d4a55a;font-size:.75rem;margin-top:.15rem}
.animal .fact{font-size:.7rem;opacity:0;max-height:0;overflow:hidden;transition:.3s;line-height:1.5;margin-top:0}
.animal:hover .fact{opacity:.5;max-height:60px;margin-top:.5rem}
/* Guides */
.guides{padding:6rem 5%;max-width:1000px;margin:0 auto}
.guides h2{font-family:'Playfair Display',serif;font-size:2rem;color:#fff;text-align:center;margin-bottom:2.5rem}
.guide-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem}
.guide{text-align:center;background:#0d1008;border:1px solid rgba(212,165,90,.06);border-radius:20px;padding:2rem}
.guide img{width:80px;height:80px;border-radius:50%;object-fit:cover;margin-bottom:1rem;border:3px solid rgba(212,165,90,.2)}
.guide h4{color:#fff;font-size:.95rem;font-weight:700}.guide .role{color:#d4a55a;font-size:.8rem;margin-top:.15rem}.guide p{font-size:.8rem;opacity:.4;margin-top:.5rem;line-height:1.5}
/* CTA */
.cta{padding:6rem 5%;text-align:center}
.cta-box{max-width:800px;margin:0 auto;background:linear-gradient(135deg,rgba(212,165,90,.08),rgba(212,165,90,.02));border:1px solid rgba(212,165,90,.15);border-radius:24px;padding:4rem 3rem}
.cta-box h2{font-family:'Playfair Display',serif;font-size:2.5rem;color:#fff;margin-bottom:1rem}
.cta-box p{opacity:.4;margin-bottom:2rem;max-width:450px;margin-left:auto;margin-right:auto}
footer{padding:3rem 5%;border-top:1px solid rgba(212,165,90,.06);text-align:center;font-size:.8rem;opacity:.25}
@media(max-width:1024px){.hero-content h1{font-size:3.5rem}.exp-grid,.animal-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:640px){.hero-content h1{font-size:2.5rem}nav ul{display:none}.exp-grid,.animal-grid,.guide-grid{grid-template-columns:1fr}}
</style>
</head>
<body>
<nav><div class="logo">Wild<span>Track</span></div><ul><li><a href="#">Safaris</a></li><li><a href="#">Wildlife</a></li><li><a href="#">Guides</a></li></ul><button class="btn-s" style="padding:.6rem 1.5rem;font-size:.75rem">Book Safari</button></nav>
<section class="hero"><div class="hero-bg"><img src="https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=1400&h=900&fit=crop" alt="Tiger"></div><div class="hero-content"><h1>Into the <span>Wild</span></h1><p>Experience the raw beauty of nature on our guided safari expeditions. Track tigers, elephants, and leopards in their natural habitat.</p><button class="btn-s">Book Your Expedition</button></div></section>
<section class="expeditions"><h2>Our Expeditions</h2><div class="exp-grid">
<div class="exp"><img src="https://images.unsplash.com/photo-1549366021-9f761d450615?w=500&h=300&fit=crop" alt="Tiger Safari"><div class="body"><div class="dur">5 Days · Premium</div><h3>Royal Bengal Tiger Trail</h3><p>Track the majestic Bengal tiger through dense forest with expert naturalists and private jeep.</p><div class="bottom"><span class="price">$2,499</span><button class="book">Book Now</button></div></div></div>
<div class="exp"><img src="https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=500&h=300&fit=crop" alt="Elephant Safari"><div class="body"><div class="dur">3 Days · Classic</div><h3>Elephant Migration Watch</h3><p>Witness the annual elephant migration through ancient corridors and watering holes.</p><div class="bottom"><span class="price">$1,299</span><button class="book">Book Now</button></div></div></div>
<div class="exp"><img src="https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=500&h=300&fit=crop" alt="Night Safari"><div class="body"><div class="dur">7 Days · Ultimate</div><h3>Nocturnal Jungle Expedition</h3><p>Night vision equipped jeeps reveal the hidden world of nocturnal predators and prey.</p><div class="bottom"><span class="price">$3,799</span><button class="book">Book Now</button></div></div></div>
</div></section>
<section class="animals"><h2>Species You'll Encounter</h2><div class="animal-grid">
<div class="animal"><img src="https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=400&h=530&fit=crop" alt="Tiger"><div class="info"><h4>Bengal Tiger</h4><div class="species">Panthera tigris tigris</div><div class="fact">Fewer than 4,500 remain in the wild. Our reserves protect over 200.</div></div></div>
<div class="animal"><img src="https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=400&h=530&fit=crop" alt="Elephant"><div class="info"><h4>Asian Elephant</h4><div class="species">Elephas maximus</div><div class="fact">Can consume up to 300 pounds of food daily in tropical forests.</div></div></div>
<div class="animal"><img src="https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=400&h=530&fit=crop" alt="Leopard"><div class="info"><h4>Indian Leopard</h4><div class="species">Panthera pardus fusca</div><div class="fact">Solitary and elusive — our guides have a 90% spotting success rate.</div></div></div>
<div class="animal"><img src="https://images.unsplash.com/photo-1474314170901-f351b68f544f?w=400&h=530&fit=crop" alt="Macaw"><div class="info"><h4>Scarlet Macaw</h4><div class="species">Ara macao</div><div class="fact">Can fly at 35 mph and live up to 80 years in the wild.</div></div></div>
</div></section>
<section class="guides"><h2>Expert Guides</h2><div class="guide-grid">
<div class="guide"><img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop" alt="Guide"><h4>Raj Malhotra</h4><div class="role">Head Naturalist · 15 yrs</div><p>Former forest ranger with deep knowledge of big cat behavior.</p></div>
<div class="guide"><img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop" alt="Guide"><h4>Amara Okafor</h4><div class="role">Wildlife Biologist</div><p>PhD in wildlife ecology, specializing in elephant migration patterns.</p></div>
<div class="guide"><img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop" alt="Guide"><h4>Carlos Mendez</h4><div class="role">Photography Expert</div><p>National Geographic contributor and wildlife photography instructor.</p></div>
</div></section>
<section class="cta"><div class="cta-box"><h2>Ready for Adventure?</h2><p>Book your expedition today and experience the wild like never before.</p><button class="btn-s" style="font-size:1rem;padding:1rem 3rem">Reserve Your Safari</button></div></section>
<footer><p>© 2026 WildTrack Safari. All rights reserved.</p></footer>
</body></html>`,
  },

  // ═══════════════════════════════════════════════════════════════
  // 3. JUNGLE ADVENTURE — Waterfall Explorer
  // ═══════════════════════════════════════════════════════════════
  {
    id: "jungle-adventure-tours",
    name: "Jungle Adventure Tours",
    category: "Nature / Jungle",
    description: "Full-screen waterfall hero with parallax depth, adventure activity grid with difficulty badges, packing checklist, and expedition booking form.",
    thumb: "🏞️",
    getCode: (t: T) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Canopy Adventures</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:#070b05;color:#8a9a7e;overflow-x:hidden}a{text-decoration:none;color:inherit}
nav{position:absolute;top:0;left:0;right:0;z-index:10;display:flex;align-items:center;justify-content:space-between;padding:1.5rem 5%}
.logo{font-size:1.6rem;font-weight:900;color:#fff;letter-spacing:4px;text-transform:uppercase}
nav ul{list-style:none;display:flex;gap:2rem}nav ul a{font-size:.8rem;opacity:.5;text-transform:uppercase;letter-spacing:2px;transition:.2s}nav ul a:hover{opacity:1;color:#34d399}
.hero{height:100vh;position:relative;display:flex;align-items:center;justify-content:center;text-align:center}
.hero-bg{position:absolute;inset:0;overflow:hidden}
.hero-bg img{width:100%;height:100%;object-fit:cover;opacity:.4}
.hero-bg::after{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at center,transparent 30%,#070b05 75%)}
.hero-content{position:relative;z-index:1;max-width:700px;padding:0 2rem}
.hero-content h1{font-size:5.5rem;font-weight:900;color:#fff;text-transform:uppercase;line-height:.9;margin-bottom:1.5rem;letter-spacing:-2px}
.hero-content h1 span{color:#34d399;display:block;font-size:2rem;letter-spacing:8px;margin-bottom:.5rem;font-weight:500}
.hero-content p{opacity:.5;line-height:1.8;margin-bottom:2.5rem}
.btn-a{background:#34d399;color:#070b05;padding:1rem 3rem;font-weight:800;border:none;cursor:pointer;font-size:.9rem;text-transform:uppercase;letter-spacing:3px;transition:.2s;border-radius:0}.btn-a:hover{box-shadow:0 10px 40px rgba(52,211,153,.3)}
/* Activities */
.activities{padding:6rem 5%;max-width:1300px;margin:0 auto}
.activities h2{font-size:2.5rem;font-weight:900;color:#fff;text-transform:uppercase;letter-spacing:4px;margin-bottom:3rem}
.act-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:2rem}
.act{display:grid;grid-template-columns:200px 1fr;background:#0c1208;border:1px solid rgba(52,211,153,.06);overflow:hidden;transition:.3s}
.act:hover{border-color:rgba(52,211,153,.25);transform:translateX(5px)}
.act img{width:100%;height:100%;object-fit:cover}
.act .body{padding:2rem}
.act .diff{display:inline-block;padding:.2rem .75rem;border-radius:4px;font-size:.65rem;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:.75rem}
.act .diff.easy{background:rgba(52,211,153,.15);color:#34d399}.act .diff.mod{background:rgba(234,179,8,.15);color:#eab308}.act .diff.hard{background:rgba(244,63,94,.15);color:#f43f5e}
.act h3{color:#fff;font-size:1.15rem;font-weight:800;text-transform:uppercase;margin-bottom:.5rem}
.act p{font-size:.85rem;opacity:.45;line-height:1.6;margin-bottom:1rem}
.act .meta{display:flex;gap:1.5rem;font-size:.75rem;opacity:.35}
/* Pack list */
.pack{padding:6rem 5%;max-width:800px;margin:0 auto}
.pack h2{font-size:2rem;font-weight:900;color:#fff;text-transform:uppercase;letter-spacing:3px;text-align:center;margin-bottom:2.5rem}
.pack-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem}
.pack-item{background:#0c1208;border:1px solid rgba(52,211,153,.06);border-radius:16px;padding:1.5rem;text-align:center;transition:.2s}
.pack-item:hover{border-color:rgba(52,211,153,.2)}
.pack-item .emoji{font-size:2rem;margin-bottom:.5rem}.pack-item h4{color:#fff;font-size:.85rem;font-weight:700;margin-bottom:.25rem}.pack-item p{font-size:.7rem;opacity:.4}
/* Stats */
.stats{padding:4rem 5%;max-width:1000px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem}
.stat{text-align:center;padding:2rem;background:rgba(52,211,153,.03);border:1px solid rgba(52,211,153,.06);border-radius:14px}
.stat .n{font-size:2.5rem;font-weight:900;color:#34d399}.stat .l{font-size:.75rem;opacity:.35;margin-top:.25rem}
/* Book */
.book{padding:6rem 5%;max-width:700px;margin:0 auto;text-align:center}
.book h2{font-size:2rem;font-weight:900;color:#fff;text-transform:uppercase;letter-spacing:3px;margin-bottom:.5rem}
.book>p{opacity:.3;margin-bottom:2.5rem}
.book-form{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
.book-form input,.book-form select{background:#0c1208;border:1px solid rgba(52,211,153,.08);padding:1rem;color:#fff;font-size:.9rem;outline:none;font-family:inherit}.book-form input:focus,.book-form select:focus{border-color:#34d399}
.book-form button{grid-column:1/-1;background:#34d399;color:#070b05;padding:1rem;font-weight:800;text-transform:uppercase;letter-spacing:3px;border:none;cursor:pointer;font-size:.9rem}
footer{padding:3rem 5%;border-top:1px solid rgba(52,211,153,.05);text-align:center;font-size:.8rem;opacity:.2}
@media(max-width:1024px){.hero-content h1{font-size:3.5rem}.act-grid{grid-template-columns:1fr}.act{grid-template-columns:1fr}.act img{height:200px}}
@media(max-width:640px){.hero-content h1{font-size:2.5rem}nav ul{display:none}.pack-grid,.stats{grid-template-columns:1fr 1fr}.book-form{grid-template-columns:1fr}}
</style>
</head>
<body>
<nav><div class="logo">Canopy</div><ul><li><a href="#">Adventures</a></li><li><a href="#">Gear</a></li><li><a href="#">Book</a></li></ul></nav>
<section class="hero"><div class="hero-bg"><img src="https://images.unsplash.com/photo-1432405972618-c6b0cfba8b3f?w=1400&h=900&fit=crop" alt="Waterfall"></div><div class="hero-content"><h1><span>Explore the Unknown</span>Deep Jungle</h1><p>Zipline through canopies, trek to hidden waterfalls, and camp under billion-star skies. Your next adventure starts here.</p><button class="btn-a">Book Adventure</button></div></section>
<section class="activities"><h2>Adventures</h2><div class="act-grid">
<div class="act"><img src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=300&h=250&fit=crop" alt="Zipline"><div class="body"><div class="diff easy">Beginner</div><h3>Canopy Zipline</h3><p>Soar 200ft above the jungle floor across 8 zipline stations through pristine rainforest.</p><div class="meta"><span>3 Hours</span><span>All Ages</span><span>$89</span></div></div></div>
<div class="act"><img src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=300&h=250&fit=crop" alt="Trek"><div class="body"><div class="diff mod">Intermediate</div><h3>Waterfall Trek</h3><p>6-hour guided hike through dense rainforest to a pristine 300ft hidden waterfall.</p><div class="meta"><span>Full Day</span><span>Ages 12+</span><span>$149</span></div></div></div>
<div class="act"><img src="https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=300&h=250&fit=crop" alt="Kayak"><div class="body"><div class="diff mod">Intermediate</div><h3>River Kayaking</h3><p>Navigate rapids and calm stretches of the jungle river with expert guides.</p><div class="meta"><span>5 Hours</span><span>Ages 14+</span><span>$129</span></div></div></div>
<div class="act"><img src="https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=300&h=250&fit=crop" alt="Survival"><div class="body"><div class="diff hard">Advanced</div><h3>Survival Camp</h3><p>3-day wilderness immersion — build shelter, forage food, navigate with compass only.</p><div class="meta"><span>3 Days</span><span>Ages 18+</span><span>$599</span></div></div></div>
</div></section>
<section class="pack"><h2>What to Bring</h2><div class="pack-grid">
<div class="pack-item"><div class="emoji">🥾</div><h4>Hiking Boots</h4><p>Waterproof, ankle support</p></div>
<div class="pack-item"><div class="emoji">🧴</div><h4>Sunscreen</h4><p>SPF 50+ reef safe</p></div>
<div class="pack-item"><div class="emoji">🔦</div><h4>Flashlight</h4><p>Headlamp preferred</p></div>
<div class="pack-item"><div class="emoji">💧</div><h4>Water Bottle</h4><p>1L minimum</p></div>
<div class="pack-item"><div class="emoji">🧢</div><h4>Sun Hat</h4><p>Wide brim</p></div>
<div class="pack-item"><div class="emoji">📸</div><h4>Camera</h4><p>Waterproof case</p></div>
</div></section>
<div class="stats"><div class="stat"><div class="n">25K+</div><div class="l">Adventurers</div></div><div class="stat"><div class="n">98%</div><div class="l">5-Star Reviews</div></div><div class="stat"><div class="n">12</div><div class="l">Adventures</div></div><div class="stat"><div class="n">0</div><div class="l">Incidents</div></div></div>
<section class="book"><h2>Book Now</h2><p>Secure your spot on the next expedition.</p><form class="book-form"><input type="text" placeholder="Full Name"><input type="email" placeholder="Email"><input type="date"><select><option>Canopy Zipline</option><option>Waterfall Trek</option><option>River Kayaking</option><option>Survival Camp</option></select><button type="submit">Reserve Spot</button></form></section>
<footer><p>© 2026 Canopy Adventures. All rights reserved.</p></footer>
</body></html>`,
  },

  // ═══════════════════════════════════════════════════════════════
  // 4. ECO LODGE — Luxury Treehouse Resort
  // ═══════════════════════════════════════════════════════════════
  {
    id: "jungle-eco-lodge",
    name: "Eco Lodge Resort",
    category: "Nature / Jungle",
    description: "Luxury treehouse resort with warm amber tones, room type cards with glass morphism, amenity icons, guest reviews, and reservation form with date picker.",
    thumb: "🏡",
    getCode: (t: T) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Canopy Haven — Luxury Eco Lodge</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:#0a0b07;color:#9c9a88;overflow-x:hidden}a{text-decoration:none;color:inherit}
nav{position:absolute;top:0;left:0;right:0;z-index:10;display:flex;align-items:center;justify-content:space-between;padding:2rem 5%}
.logo{font-family:'Cormorant Garamond',serif;font-size:2rem;font-weight:700;color:#fff;letter-spacing:3px}
nav ul{list-style:none;display:flex;gap:2rem}nav ul a{font-size:.8rem;opacity:.5;text-transform:uppercase;letter-spacing:2px;transition:.2s}nav ul a:hover{opacity:1;color:#c9a96e}
.hero{height:100vh;position:relative;display:flex;align-items:center;justify-content:center;text-align:center}
.hero-bg{position:absolute;inset:0}.hero-bg img{width:100%;height:100%;object-fit:cover;opacity:.4}
.hero-bg::after{content:'';position:absolute;inset:0;background:linear-gradient(to bottom,#0a0b07aa,#0a0b07)}
.hero-content{position:relative;z-index:1;max-width:700px}
.line{width:60px;height:2px;background:#c9a96e;margin:0 auto 2rem}
.hero-content h1{font-family:'Cormorant Garamond',serif;font-size:4.5rem;font-weight:700;color:#fff;line-height:1.05;margin-bottom:1rem}
.hero-content h1 span{color:#c9a96e;font-style:italic}
.hero-content p{opacity:.5;line-height:1.8;margin-bottom:2.5rem;max-width:500px;margin-left:auto;margin-right:auto}
.btn-l{background:#c9a96e;color:#0a0b07;padding:1rem 2.5rem;font-weight:600;border:none;cursor:pointer;font-size:.8rem;text-transform:uppercase;letter-spacing:3px;transition:.2s}.btn-l:hover{box-shadow:0 10px 30px rgba(201,169,110,.3)}
/* Rooms */
.rooms{padding:6rem 5%;max-width:1300px;margin:0 auto}
.sec-head{text-align:center;margin-bottom:3rem}.sec-head span{color:#c9a96e;font-size:.8rem;text-transform:uppercase;letter-spacing:3px}.sec-head h2{font-family:'Cormorant Garamond',serif;font-size:2.5rem;color:#fff;margin-top:.5rem}
.room-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem}
.room{background:rgba(255,255,255,.02);backdrop-filter:blur(20px);border:1px solid rgba(201,169,110,.1);border-radius:20px;overflow:hidden;transition:.3s}
.room:hover{border-color:rgba(201,169,110,.3);transform:translateY(-5px)}
.room img{width:100%;height:220px;object-fit:cover}
.room .body{padding:1.5rem}
.room .type{font-size:.7rem;color:#c9a96e;font-weight:600;text-transform:uppercase;letter-spacing:2px;margin-bottom:.5rem}
.room h3{font-family:'Cormorant Garamond',serif;color:#fff;font-size:1.4rem;margin-bottom:.5rem}
.room p{font-size:.8rem;opacity:.5;line-height:1.6;margin-bottom:1rem}
.room .amenities{display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:1rem}
.room .amenities span{font-size:.65rem;background:rgba(201,169,110,.08);border:1px solid rgba(201,169,110,.12);padding:.2rem .5rem;border-radius:6px;color:#c9a96e}
.room .price-row{display:flex;justify-content:space-between;align-items:center;border-top:1px solid rgba(255,255,255,.05);padding-top:1rem}
.room .price{font-family:'Cormorant Garamond',serif;color:#fff;font-size:1.3rem;font-weight:700}
.room .price small{font-family:'Inter',sans-serif;font-size:.7rem;opacity:.4;font-weight:400}
.room .book-btn{background:#c9a96e;color:#0a0b07;padding:.4rem 1rem;border-radius:8px;font-size:.75rem;font-weight:600;border:none;cursor:pointer}
/* Amenities */
.lodge-amenities{padding:4rem 5%;max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(5,1fr);gap:1.5rem}
.la{text-align:center;padding:2rem 1rem}
.la .emoji{font-size:2rem;margin-bottom:.75rem}.la h4{color:#fff;font-size:.85rem;font-weight:600;margin-bottom:.25rem}.la p{font-size:.7rem;opacity:.4}
/* Reviews */
.reviews{padding:6rem 5%;max-width:1000px;margin:0 auto}
.rev-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:2rem}
.rev{background:rgba(255,255,255,.02);border:1px solid rgba(201,169,110,.06);border-radius:16px;padding:2rem}
.rev .stars{color:#c9a96e;font-size:.85rem;margin-bottom:.75rem}
.rev p{font-size:.85rem;opacity:.5;line-height:1.6;font-style:italic;margin-bottom:1rem}
.rev .author{font-size:.8rem;color:#fff;font-weight:600}
/* Reserve */
.reserve{padding:6rem 5%;max-width:700px;margin:0 auto;text-align:center}
.reserve h2{font-family:'Cormorant Garamond',serif;font-size:2.5rem;color:#fff;margin-bottom:.5rem}
.reserve>p{opacity:.3;margin-bottom:2.5rem}
.res-form{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
.res-form input,.res-form select{background:rgba(255,255,255,.03);border:1px solid rgba(201,169,110,.1);padding:1rem;color:#fff;font-size:.9rem;outline:none;font-family:inherit;border-radius:10px}.res-form input:focus,.res-form select:focus{border-color:#c9a96e}
.res-form button{grid-column:1/-1;background:#c9a96e;color:#0a0b07;padding:1rem;font-weight:600;text-transform:uppercase;letter-spacing:3px;border:none;cursor:pointer;font-size:.85rem;border-radius:10px}
footer{padding:3rem 5%;border-top:1px solid rgba(201,169,110,.06);text-align:center;font-size:.8rem;opacity:.25}
@media(max-width:1024px){.hero-content h1{font-size:3rem}.room-grid{grid-template-columns:1fr}.lodge-amenities{grid-template-columns:repeat(3,1fr)}.rev-grid{grid-template-columns:1fr}}
@media(max-width:640px){.hero-content h1{font-size:2.5rem}nav ul{display:none}.lodge-amenities{grid-template-columns:1fr 1fr}.res-form{grid-template-columns:1fr}}
</style>
</head>
<body>
<nav><div class="logo">CANOPY HAVEN</div><ul><li><a href="#">Rooms</a></li><li><a href="#">Experience</a></li><li><a href="#">Reserve</a></li></ul></nav>
<section class="hero"><div class="hero-bg"><img src="https://images.unsplash.com/photo-1499678329028-101435549a4e?w=1400&h=900&fit=crop" alt="Treehouse"></div><div class="hero-content"><div class="line"></div><h1>Sleep Among the <span>Treetops</span></h1><p>Luxury eco-lodges nestled high in the canopy of pristine ancient rainforest. Where nature meets five-star comfort.</p><button class="btn-l">Reserve Your Stay</button></div></section>
<section class="rooms"><div class="sec-head"><span>Accommodations</span><h2>Our Treehouse Suites</h2></div><div class="room-grid">
<div class="room"><img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&h=300&fit=crop" alt="Suite"><div class="body"><div class="type">Treehouse Suite</div><h3>Canopy Nest</h3><p>Open-air suite 80ft above the forest floor with panoramic canopy views and private balcony.</p><div class="amenities"><span>🛁 Rain Shower</span><span>🌿 Balcony</span><span>☕ Minibar</span></div><div class="price-row"><div class="price">$450 <small>/ night</small></div><button class="book-btn">Reserve</button></div></div></div>
<div class="room"><img src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=500&h=300&fit=crop" alt="Villa"><div class="body"><div class="type">Canopy Villa</div><h3>Forest Crown</h3><p>Two-bedroom villa with private plunge pool, outdoor dining deck, and butler service.</p><div class="amenities"><span>🏊 Plunge Pool</span><span>🍽️ Private Dining</span><span>🧖 Spa Bath</span></div><div class="price-row"><div class="price">$850 <small>/ night</small></div><button class="book-btn">Reserve</button></div></div></div>
<div class="room"><img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500&h=300&fit=crop" alt="Royal"><div class="body"><div class="type">Royal Experience</div><h3>Sky Palace</h3><p>The ultimate rainforest escape — a three-story treehouse with 360° glass walls and private chef.</p><div class="amenities"><span>👨‍🍳 Private Chef</span><span>🔭 Observatory</span><span>🧘 Yoga Deck</span></div><div class="price-row"><div class="price">$1,500 <small>/ night</small></div><button class="book-btn">Reserve</button></div></div></div>
</div></section>
<div class="lodge-amenities">
<div class="la"><div class="emoji">🧖</div><h4>Forest Spa</h4><p>Treatments using local botanicals</p></div>
<div class="la"><div class="emoji">🍃</div><h4>Nature Walks</h4><p>Guided morning bird walks</p></div>
<div class="la"><div class="emoji">🍳</div><h4>Farm to Table</h4><p>Organic rainforest cuisine</p></div>
<div class="la"><div class="emoji">📶</div><h4>Free WiFi</h4><p>Starlink satellite internet</p></div>
<div class="la"><div class="emoji">🚁</div><h4>Heli Transfer</h4><p>Direct from the airport</p></div>
</div>
<section class="reviews"><div class="sec-head"><span>Guest Reviews</span><h2>What Our Guests Say</h2></div><div class="rev-grid">
<div class="rev"><div class="stars">★★★★★</div><p>"Waking up to the sound of howler monkeys and morning mist through the canopy — this is the most magical place on earth."</p><div class="author">Victoria K. — London, UK</div></div>
<div class="rev"><div class="stars">★★★★★</div><p>"Unreal luxury without compromising nature. The Sky Palace is a once-in-a-lifetime experience. Already rebooked."</p><div class="author">James & Anna L. — New York</div></div>
</div></section>
<section class="reserve"><h2>Reserve Your Escape</h2><p>Availability is limited to protect the ecosystem.</p><form class="res-form"><input type="text" placeholder="Full Name"><input type="email" placeholder="Email"><input type="date" placeholder="Check-in"><input type="date" placeholder="Check-out"><select><option>Canopy Nest</option><option>Forest Crown</option><option>Sky Palace</option></select><select><option>2 Guests</option><option>4 Guests</option><option>6 Guests</option></select><button type="submit">Check Availability</button></form></section>
<footer><p>© 2026 Canopy Haven. All rights reserved.</p></footer>
</body></html>`,
  },

  // ═══════════════════════════════════════════════════════════════
  // 5. BOTANICAL GARDEN — Green Oasis (LIGHT THEME)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "jungle-botanical-garden",
    name: "Botanical Garden",
    category: "Nature / Jungle",
    description: "Light green/white botanical theme with watercolor-style sections, plant gallery with Latin names, event calendar cards, and membership signup.",
    thumb: "🌺",
    getCode: (t: T) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Eden Botanical Gardens</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:#f4f7f0;color:#5a6650;overflow-x:hidden}a{text-decoration:none;color:inherit}
nav{display:flex;align-items:center;justify-content:space-between;padding:1.25rem 5%;max-width:1300px;margin:0 auto}
.logo{font-family:'Cormorant Garamond',serif;font-size:1.8rem;font-weight:700;color:#2d3a28}.logo span{color:#4a7c3f}
nav ul{list-style:none;display:flex;gap:2rem}nav ul a{font-size:.9rem;color:#888;font-weight:500;transition:.2s}nav ul a:hover{color:#4a7c3f}
.btn-v{background:#4a7c3f;color:#fff;padding:.7rem 1.5rem;border-radius:50px;font-weight:600;font-size:.85rem;border:none;cursor:pointer;transition:.2s;box-shadow:0 4px 15px rgba(74,124,63,.25)}.btn-v:hover{box-shadow:0 8px 25px rgba(74,124,63,.35);transform:translateY(-1px)}
.hero{padding:4rem 5% 3rem;max-width:1300px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center}
.hero h1{font-family:'Cormorant Garamond',serif;font-size:3.5rem;font-weight:700;color:#2d3a28;line-height:1.1;margin-bottom:1rem}
.hero h1 span{color:#4a7c3f;font-style:italic}
.hero p{color:#888;font-size:1rem;line-height:1.7;margin-bottom:2rem}
.hero-cta{display:flex;gap:1rem}
.btn-sec{background:#fff;color:#2d3a28;padding:.85rem 2rem;border-radius:50px;font-weight:600;border:2px solid #ddd;cursor:pointer;font-size:.9rem;transition:.2s}.btn-sec:hover{border-color:#4a7c3f;color:#4a7c3f}
.hero-img{position:relative}.hero-img img{width:100%;border-radius:24px;box-shadow:0 20px 50px rgba(0,0,0,.08)}
.hero-badge{position:absolute;top:15px;right:-15px;background:#fff;border-radius:14px;padding:.75rem 1.25rem;box-shadow:0 8px 25px rgba(0,0,0,.06);font-size:.8rem;font-weight:600;color:#2d3a28}
/* Plants */
.plants{padding:5rem 5%;background:#fff}
.plants-inner{max-width:1300px;margin:0 auto}
.sec-head{text-align:center;margin-bottom:3rem}.sec-head span{color:#4a7c3f;font-size:.8rem;text-transform:uppercase;letter-spacing:2px;font-weight:600}.sec-head h2{font-family:'Cormorant Garamond',serif;font-size:2.5rem;color:#2d3a28;margin-top:.5rem}
.plant-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem}
.plant{background:#f4f7f0;border-radius:20px;overflow:hidden;transition:.3s;border:1px solid #e8ede4}
.plant:hover{transform:translateY(-5px);box-shadow:0 15px 35px rgba(0,0,0,.06)}
.plant img{width:100%;height:200px;object-fit:cover}
.plant .body{padding:1.25rem}
.plant h3{font-family:'Cormorant Garamond',serif;color:#2d3a28;font-size:1.1rem;font-weight:700}
.plant .latin{font-size:.75rem;color:#4a7c3f;font-style:italic;margin-top:.15rem}
.plant p{font-size:.8rem;color:#999;margin-top:.5rem;line-height:1.5}
/* Events */
.events{padding:5rem 5%;max-width:1300px;margin:0 auto}
.event-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem}
.event{background:#fff;border-radius:20px;padding:2rem;box-shadow:0 4px 15px rgba(0,0,0,.03);border:1px solid #eee;transition:.3s}
.event:hover{transform:translateY(-5px);box-shadow:0 10px 30px rgba(0,0,0,.06)}
.event .date{display:flex;flex-direction:column;align-items:center;width:60px;background:#4a7c3f;border-radius:12px;padding:.75rem;color:#fff;float:left;margin-right:1rem}
.event .date .day{font-size:1.5rem;font-weight:800;line-height:1}.event .date .month{font-size:.6rem;text-transform:uppercase;letter-spacing:1px;opacity:.8}
.event h3{color:#2d3a28;font-size:1rem;font-weight:700;margin-bottom:.25rem}.event .time{font-size:.8rem;color:#4a7c3f;margin-bottom:.5rem}.event p{font-size:.8rem;color:#999;line-height:1.5}
/* Info */
.info-bar{padding:4rem 5%;background:#fff;margin-top:2rem}
.info-grid{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:2rem;text-align:center}
.inf{padding:1.5rem}.inf .emoji{font-size:2rem;margin-bottom:.75rem}.inf h4{color:#2d3a28;font-size:.9rem;font-weight:700;margin-bottom:.25rem}.inf p{font-size:.8rem;color:#999}
/* Membership */
.membership{padding:5rem 5%}
.mem-box{max-width:800px;margin:0 auto;text-align:center;background:linear-gradient(135deg,#e8f5e2,#f4f7f0);border:1px solid #d5e5cd;border-radius:24px;padding:4rem 3rem}
.mem-box h2{font-family:'Cormorant Garamond',serif;font-size:2.2rem;color:#2d3a28;margin-bottom:1rem}
.mem-box p{color:#888;margin-bottom:2rem;max-width:450px;margin-left:auto;margin-right:auto}
.mem-form{display:flex;gap:.75rem;max-width:420px;margin:0 auto}
.mem-form input{flex:1;background:#fff;border:2px solid #d5e5cd;border-radius:12px;padding:.85rem 1.2rem;color:#2d3a28;font-size:.9rem;outline:none;font-family:inherit}.mem-form input:focus{border-color:#4a7c3f}
.mem-form button{background:#4a7c3f;color:#fff;padding:.85rem 1.5rem;border-radius:12px;font-weight:600;border:none;cursor:pointer;white-space:nowrap}
footer{padding:3rem 5%;text-align:center;font-size:.8rem;color:#bbb;border-top:1px solid #e8ede4}
@media(max-width:1024px){.hero{grid-template-columns:1fr;text-align:center}.hero p{margin-left:auto;margin-right:auto}.hero-cta{justify-content:center}.hero-img{max-width:500px;margin:0 auto}.plant-grid{grid-template-columns:repeat(2,1fr)}.event-grid{grid-template-columns:1fr}}
@media(max-width:640px){.hero h1{font-size:2.5rem}nav ul{display:none}.plant-grid,.info-grid{grid-template-columns:1fr 1fr}.mem-form{flex-direction:column}.hero-badge{display:none}}
</style>
</head>
<body>
<nav><div class="logo">Eden<span>.</span></div><ul><li><a href="#">Gardens</a></li><li><a href="#">Events</a></li><li><a href="#">Visit</a></li></ul><button class="btn-v">Plan Your Visit</button></nav>
<section class="hero"><div><h1>Discover Nature's <span>Living Art</span></h1><p>Explore 200 acres of curated botanical beauty — from ancient orchids to towering redwoods. A sanctuary for plants, people, and planet.</p><div class="hero-cta"><button class="btn-v" style="padding:.85rem 2rem;font-size:.95rem">Buy Tickets</button><button class="btn-sec">See What's Blooming</button></div></div><div class="hero-img"><img src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&h=500&fit=crop" alt="Garden"><div class="hero-badge">🌸 Spring Festival Now Open</div></div></section>
<section class="plants"><div class="plants-inner"><div class="sec-head"><span>Our Collection</span><h2>Featured Species</h2></div><div class="plant-grid">
<div class="plant"><img src="https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=280&fit=crop" alt="Orchid"><div class="body"><h3>Ghost Orchid</h3><div class="latin">Dendrophylax lindenii</div><p>One of the rarest orchids on Earth, found only in protected swamps.</p></div></div>
<div class="plant"><img src="https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?w=400&h=280&fit=crop" alt="Fern"><div class="body"><h3>Giant Tree Fern</h3><div class="latin">Cyathea cooperi</div><p>Ancient lineage dating back 350 million years to the Carboniferous period.</p></div></div>
<div class="plant"><img src="https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=400&h=280&fit=crop" alt="Lily"><div class="body"><h3>Water Lily</h3><div class="latin">Nymphaea caerulea</div><p>Sacred blue lotus, cultivated in our thermal ponds year-round.</p></div></div>
<div class="plant"><img src="https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=280&fit=crop" alt="Bamboo"><div class="body"><h3>Golden Bamboo</h3><div class="latin">Phyllostachys aurea</div><p>Grows up to 3 feet per day in our dedicated bamboo grove.</p></div></div>
</div></div></section>
<section class="events"><div class="sec-head"><span>Upcoming</span><h2>Events & Workshops</h2></div><div class="event-grid">
<div class="event"><div class="date"><span class="day">15</span><span class="month">Nov</span></div><h3>Orchid Festival</h3><div class="time">10:00 AM — 4:00 PM</div><p>Annual showcase of 500+ rare orchid species with expert talks and sales.</p></div>
<div class="event"><div class="date"><span class="day">22</span><span class="month">Nov</span></div><h3>Bonsai Workshop</h3><div class="time">2:00 PM — 5:00 PM</div><p>Hands-on class on shaping and caring for your own bonsai tree.</p></div>
<div class="event"><div class="date"><span class="day">01</span><span class="month">Dec</span></div><h3>Holiday Night Walk</h3><div class="time">6:00 PM — 9:00 PM</div><p>Gardens illuminated with thousands of lights. Hot cocoa and live music.</p></div>
</div></section>
<div class="info-bar"><div class="info-grid">
<div class="inf"><div class="emoji">🕐</div><h4>Open Daily</h4><p>9 AM — 6 PM</p></div>
<div class="inf"><div class="emoji">🎟️</div><h4>Tickets</h4><p>$18 Adults / $8 Kids</p></div>
<div class="inf"><div class="emoji">🅿️</div><h4>Free Parking</h4><p>2,000 spaces</p></div>
<div class="inf"><div class="emoji">♿</div><h4>Accessible</h4><p>Wheelchair-friendly paths</p></div>
</div></div>
<section class="membership"><div class="mem-box"><h2>Become a Member</h2><p>Unlimited visits, exclusive events, and 10% at the garden shop. Help us grow.</p><div class="mem-form"><input type="email" placeholder="Enter your email"><button>Join for $75/yr</button></div></div></section>
<footer><p>© 2026 Eden Botanical Gardens. All rights reserved.</p></footer>
</body></html>`,
  },

  // ═══════════════════════════════════════════════════════════════
  // 6. WILDLIFE PHOTOGRAPHY — Dark Portfolio
  // ═══════════════════════════════════════════════════════════════
  {
    id: "jungle-wildlife-photography",
    name: "Wildlife Photography Portfolio",
    category: "Nature / Jungle",
    description: "Photographer portfolio with full-bleed masonry gallery, camera settings overlay on hover, behind-the-scenes section, and print shop CTA.",
    thumb: "📸",
    getCode: (t: T) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Lens & Wild — Wildlife Photography</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:#060606;color:#888;overflow-x:hidden}a{text-decoration:none;color:inherit}
nav{display:flex;align-items:center;justify-content:space-between;padding:1.5rem 5%;max-width:1400px;margin:0 auto}
.logo{font-size:1.4rem;font-weight:800;color:#fff;letter-spacing:3px;text-transform:uppercase}.logo span{color:#8db580}
nav ul{list-style:none;display:flex;gap:2rem}nav ul a{font-size:.85rem;opacity:.5;transition:.2s}nav ul a:hover{opacity:1;color:#8db580}
.hero{padding:6rem 5%;max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;min-height:85vh}
.hero h1{font-size:3.5rem;font-weight:800;color:#fff;line-height:1.1;margin-bottom:1rem}
.hero h1 span{color:#8db580}
.hero p{opacity:.5;line-height:1.8;margin-bottom:2rem}
.hero-stats{display:flex;gap:2rem;margin-bottom:2rem}
.hs{text-align:center}.hs .n{font-size:2rem;font-weight:800;color:#8db580}.hs .l{font-size:.7rem;opacity:.4}
.btn-p{background:#8db580;color:#060606;padding:1rem 2.5rem;font-weight:700;border:none;cursor:pointer;font-size:.9rem;border-radius:10px;transition:.2s}.btn-p:hover{box-shadow:0 10px 30px rgba(141,181,128,.3)}
.hero-img{position:relative}.hero-img img{width:100%;border-radius:20px;box-shadow:0 30px 60px rgba(0,0,0,.4)}
/* Gallery */
.gallery{padding:4rem 5%;max-width:1400px;margin:0 auto}
.gallery h2{font-size:2rem;font-weight:800;color:#fff;margin-bottom:2rem}
.masonry{columns:3;gap:1.5rem}
.g-item{break-inside:avoid;margin-bottom:1.5rem;position:relative;overflow:hidden;border-radius:12px;cursor:pointer}
.g-item img{width:100%;display:block;transition:transform .5s}
.g-item:hover img{transform:scale(1.05)}
.g-item .overlay{position:absolute;inset:0;background:rgba(0,0,0,.7);display:flex;flex-direction:column;justify-content:flex-end;padding:1.25rem;opacity:0;transition:.3s}
.g-item:hover .overlay{opacity:1}
.g-item .overlay h4{color:#fff;font-size:.95rem;font-weight:700;margin-bottom:.25rem}
.g-item .overlay .cam{font-size:.7rem;color:#8db580;font-family:monospace}
.g-item .overlay .settings{font-size:.65rem;opacity:.5;margin-top:.25rem;font-family:monospace}
/* About */
.about{padding:6rem 5%;max-width:1000px;margin:0 auto;display:grid;grid-template-columns:auto 1fr;gap:3rem;align-items:center}
.about img{width:200px;height:200px;border-radius:50%;object-fit:cover;border:3px solid rgba(141,181,128,.2)}
.about h2{font-size:1.8rem;font-weight:800;color:#fff;margin-bottom:.75rem}
.about p{opacity:.5;line-height:1.8;margin-bottom:1rem}
.about .awards{display:flex;gap:1rem;flex-wrap:wrap}.about .awards span{font-size:.7rem;background:rgba(141,181,128,.1);border:1px solid rgba(141,181,128,.15);padding:.3rem .75rem;border-radius:6px;color:#8db580}
/* Print Shop */
.shop{padding:6rem 5%;text-align:center}
.shop-box{max-width:800px;margin:0 auto;background:linear-gradient(135deg,rgba(141,181,128,.06),rgba(141,181,128,.02));border:1px solid rgba(141,181,128,.12);border-radius:24px;padding:4rem 3rem}
.shop-box h2{font-size:2rem;font-weight:800;color:#fff;margin-bottom:.5rem}
.shop-box p{opacity:.4;margin-bottom:2rem;max-width:450px;margin-left:auto;margin-right:auto}
footer{padding:3rem 5%;border-top:1px solid rgba(141,181,128,.06);text-align:center;font-size:.8rem;opacity:.25}
@media(max-width:1024px){.hero{grid-template-columns:1fr;text-align:center}.hero-stats{justify-content:center}.masonry{columns:2}.about{grid-template-columns:1fr;text-align:center}.about img{margin:0 auto}}
@media(max-width:640px){.hero h1{font-size:2.5rem}nav ul{display:none}.masonry{columns:1}}
</style>
</head>
<body>
<nav><div class="logo">Lens<span>&</span>Wild</div><ul><li><a href="#">Gallery</a></li><li><a href="#">About</a></li><li><a href="#">Prints</a></li></ul><a href="#" class="btn-p" style="padding:.6rem 1.5rem;font-size:.8rem">Buy Prints</a></nav>
<section class="hero"><div><h1>Capturing the <span>Untamed</span></h1><p>Award-winning wildlife photography from the deepest jungles, highest mountains, and remotest oceans on Earth.</p><div class="hero-stats"><div class="hs"><div class="n">200+</div><div class="l">Expeditions</div></div><div class="hs"><div class="n">45</div><div class="l">Countries</div></div><div class="hs"><div class="n">12</div><div class="l">Awards</div></div></div><button class="btn-p">View Gallery</button></div><div class="hero-img"><img src="https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=600&h=700&fit=crop" alt="Wildlife"></div></section>
<section class="gallery"><h2>Selected Works</h2><div class="masonry">
<div class="g-item"><img src="https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=500&h=650&fit=crop" alt="Tiger"><div class="overlay"><h4>Royal Gaze</h4><div class="cam">Canon R5 · 600mm f/4</div><div class="settings">1/1000s · ISO 3200 · Ranthambore, India</div></div></div>
<div class="g-item"><img src="https://images.unsplash.com/photo-1474314170901-f351b68f544f?w=500&h=350&fit=crop" alt="Macaw"><div class="overlay"><h4>Crimson Wings</h4><div class="cam">Sony A1 · 400mm f/2.8</div><div class="settings">1/2000s · ISO 800 · Amazon, Brazil</div></div></div>
<div class="g-item"><img src="https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=500&h=500&fit=crop" alt="Elephant"><div class="overlay"><h4>Gentle Giant</h4><div class="cam">Nikon Z9 · 200-500mm</div><div class="settings">1/500s · ISO 1600 · Borneo</div></div></div>
<div class="g-item"><img src="https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=500&h=400&fit=crop" alt="Leopard"><div class="overlay"><h4>Shadow Hunter</h4><div class="cam">Canon R3 · 500mm f/4</div><div class="settings">1/800s · ISO 6400 · Sri Lanka</div></div></div>
<div class="g-item"><img src="https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=500&h=600&fit=crop" alt="Elephants"><div class="overlay"><h4>Family Crossing</h4><div class="cam">Sony A9III · 200mm f/2</div><div class="settings">1/400s · ISO 400 · Kenya</div></div></div>
<div class="g-item"><img src="https://images.unsplash.com/photo-1544985361-b420d7a77043?w=500&h=380&fit=crop" alt="Frog"><div class="overlay"><h4>Jewel of the Forest</h4><div class="cam">Canon R5 · 100mm Macro</div><div class="settings">1/200s · ISO 1200 · Costa Rica</div></div></div>
</div></section>
<section class="about"><img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop" alt="Photographer"><div><h2>Nathan Cole</h2><p>For the past 15 years, I've traveled to the world's most remote ecosystems to document wildlife in their natural habitat. My work has been featured in National Geographic, BBC Wildlife, and the Smithsonian.</p><div class="awards"><span>🏆 Wildlife Photographer of the Year</span><span>🥇 Nat Geo Award 2024</span><span>📸 Sony World Photography</span></div></div></section>
<section class="shop"><div class="shop-box"><h2>Limited Edition Prints</h2><p>Museum-quality giclée prints on Hahnemühle paper. Each signed and numbered.</p><button class="btn-p" style="font-size:1rem;padding:1rem 3rem">Browse Print Shop</button></div></section>
<footer><p>© 2026 Lens & Wild. All rights reserved.</p></footer>
</body></html>`,
  },

  // ═══════════════════════════════════════════════════════════════
  // 7. TROPICAL PLANT SHOP — E-Commerce
  // ═══════════════════════════════════════════════════════════════
  {
    id: "jungle-plant-shop",
    name: "Tropical Plant Shop",
    category: "Nature / Jungle",
    description: "E-commerce for exotic tropical plants with product grid, care difficulty indicators, plant care guide section, and subscription box CTA.",
    thumb: "🪴",
    getCode: (t: T) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Plantiful — Exotic Plant Shop</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:#080d06;color:#8a9a7e;overflow-x:hidden}a{text-decoration:none;color:inherit}
nav{display:flex;align-items:center;justify-content:space-between;padding:1.5rem 5%;max-width:1400px;margin:0 auto}
.logo{font-size:1.4rem;font-weight:800;color:#fff}.logo span{color:#22c55e}
nav ul{list-style:none;display:flex;gap:2rem}nav ul a{font-size:.9rem;opacity:.5;transition:.2s}nav ul a:hover{opacity:1;color:#22c55e}
.cart-icon{font-size:1.2rem;opacity:.6;position:relative}.cart-icon .badge{position:absolute;top:-8px;right:-10px;background:#22c55e;color:#080d06;width:18px;height:18px;border-radius:50%;font-size:.6rem;font-weight:700;display:flex;align-items:center;justify-content:center}
.hero{padding:6rem 5%;max-width:1400px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center}
.hero h1{font-size:3.5rem;font-weight:800;color:#fff;line-height:1.1;margin-bottom:1rem}
.hero h1 span{color:#22c55e}
.hero p{opacity:.5;line-height:1.8;margin-bottom:2rem}
.hero-tags{display:flex;gap:.75rem;margin-bottom:2rem}
.hero-tags span{font-size:.75rem;background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.15);padding:.3rem .8rem;border-radius:50px;color:#22c55e;font-weight:500}
.btn-s{background:#22c55e;color:#080d06;padding:1rem 2.5rem;border-radius:14px;font-weight:700;border:none;cursor:pointer;font-size:1rem;transition:.2s}.btn-s:hover{box-shadow:0 10px 30px rgba(34,197,94,.3);transform:translateY(-2px)}
.hero-img img{width:100%;border-radius:24px;box-shadow:0 30px 60px rgba(0,0,0,.3)}
/* Products */
.products{padding:5rem 5%;max-width:1400px;margin:0 auto}
.products h2{font-size:2rem;font-weight:800;color:#fff;margin-bottom:2rem}
.prod-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem}
.prod{background:#0d1308;border:1px solid rgba(34,197,94,.06);border-radius:20px;overflow:hidden;transition:.3s}
.prod:hover{border-color:rgba(34,197,94,.25);transform:translateY(-5px)}
.prod img{width:100%;height:250px;object-fit:cover}
.prod .body{padding:1.25rem}
.prod h3{color:#fff;font-size:1rem;font-weight:700;margin-bottom:.25rem}
.prod .latin{font-size:.75rem;color:#22c55e;font-style:italic;margin-bottom:.75rem}
.prod .care{display:flex;gap:.5rem;margin-bottom:.75rem}
.prod .care span{font-size:.6rem;padding:.15rem .5rem;border-radius:4px;font-weight:600}
.prod .care .light{background:rgba(234,179,8,.15);color:#eab308}
.prod .care .water{background:rgba(59,130,246,.15);color:#3b82f6}
.prod .care .diff{background:rgba(34,197,94,.15);color:#22c55e}
.prod .price-row{display:flex;justify-content:space-between;align-items:center;border-top:1px solid rgba(255,255,255,.04);padding-top:.75rem}
.prod .price{color:#fff;font-weight:800;font-size:1.1rem}
.prod .add{width:36px;height:36px;border-radius:10px;background:#22c55e;color:#080d06;border:none;cursor:pointer;font-size:1.1rem;display:flex;align-items:center;justify-content:center}
/* Care Guide */
.care-guide{padding:5rem 5%;max-width:1000px;margin:0 auto}
.care-guide h2{font-size:2rem;font-weight:800;color:#fff;text-align:center;margin-bottom:2.5rem}
.cg-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem}
.cg{background:#0d1308;border:1px solid rgba(34,197,94,.06);border-radius:16px;padding:2rem;text-align:center;transition:.3s}
.cg:hover{border-color:rgba(34,197,94,.2);transform:translateY(-3px)}
.cg .emoji{font-size:2.5rem;margin-bottom:1rem}.cg h3{color:#fff;font-size:1rem;font-weight:700;margin-bottom:.5rem}.cg p{font-size:.85rem;opacity:.5;line-height:1.6}
/* Subscription */
.sub{padding:6rem 5%;text-align:center}
.sub-box{max-width:800px;margin:0 auto;background:linear-gradient(135deg,rgba(34,197,94,.08),rgba(34,197,94,.02));border:1px solid rgba(34,197,94,.15);border-radius:24px;padding:4rem 3rem}
.sub-box h2{font-size:2.2rem;font-weight:800;color:#fff;margin-bottom:.5rem}
.sub-box p{opacity:.4;margin-bottom:2rem;max-width:450px;margin-left:auto;margin-right:auto}
.sub-box .price-tag{font-size:3rem;font-weight:900;color:#22c55e;margin-bottom:.5rem}
.sub-box .price-tag small{font-size:1rem;opacity:.5;color:#fff}
footer{padding:3rem 5%;border-top:1px solid rgba(34,197,94,.06);text-align:center;font-size:.8rem;opacity:.25}
@media(max-width:1024px){.hero{grid-template-columns:1fr;text-align:center}.hero-tags{justify-content:center}.prod-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:640px){.hero h1{font-size:2.5rem}nav ul{display:none}.prod-grid,.cg-grid{grid-template-columns:1fr}}
</style>
</head>
<body>
<nav><div class="logo">Plant<span>iful</span></div><ul><li><a href="#">Shop</a></li><li><a href="#">Care</a></li><li><a href="#">Subscribe</a></li></ul><a href="#" class="cart-icon">🛒<span class="badge">3</span></a></nav>
<section class="hero"><div><h1>Bring the <span>Jungle</span> Home</h1><p>Rare tropical plants delivered to your door — hand-selected by botanists, shipped with care, guaranteed to thrive.</p><div class="hero-tags"><span>🌿 Rare Species</span><span>📦 Safe Shipping</span><span>✅ Health Guarantee</span></div><button class="btn-s">Shop Plants</button></div><div class="hero-img"><img src="https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&h=600&fit=crop" alt="Plants"></div></section>
<section class="products"><h2>Bestsellers</h2><div class="prod-grid">
<div class="prod"><img src="https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=350&fit=crop" alt="Monstera"><div class="body"><h3>Monstera Deliciosa</h3><div class="latin">Swiss Cheese Plant</div><div class="care"><span class="light">☀️ Bright</span><span class="water">💧 Weekly</span><span class="diff">Easy</span></div><div class="price-row"><span class="price">$45</span><button class="add">+</button></div></div></div>
<div class="prod"><img src="https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?w=400&h=350&fit=crop" alt="Fern"><div class="body"><h3>Bird's Nest Fern</h3><div class="latin">Asplenium nidus</div><div class="care"><span class="light">🌤️ Low</span><span class="water">💧 2x Week</span><span class="diff">Easy</span></div><div class="price-row"><span class="price">$32</span><button class="add">+</button></div></div></div>
<div class="prod"><img src="https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=400&h=350&fit=crop" alt="Lily"><div class="body"><h3>Pink Anthurium</h3><div class="latin">Anthurium andraeanum</div><div class="care"><span class="light">☀️ Medium</span><span class="water">💧 Weekly</span><span class="diff">Medium</span></div><div class="price-row"><span class="price">$55</span><button class="add">+</button></div></div></div>
<div class="prod"><img src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=350&fit=crop" alt="Alocasia"><div class="body"><h3>Alocasia Dragon</h3><div class="latin">Alocasia baginda</div><div class="care"><span class="light">☀️ Bright</span><span class="water">💧 2x Week</span><span class="diff">Expert</span></div><div class="price-row"><span class="price">$89</span><button class="add">+</button></div></div></div>
</div></section>
<section class="care-guide"><h2>Plant Care Basics</h2><div class="cg-grid">
<div class="cg"><div class="emoji">☀️</div><h3>Light Guide</h3><p>Most tropicals need bright, indirect light. Avoid direct sun which can scorch leaves.</p></div>
<div class="cg"><div class="emoji">💧</div><h3>Watering</h3><p>Let the top inch of soil dry between waterings. Always use pots with drainage holes.</p></div>
<div class="cg"><div class="emoji">🌡️</div><h3>Humidity</h3><p>Tropical plants love 60%+ humidity. Group plants together or use a pebble tray.</p></div>
</div></section>
<section class="sub"><div class="sub-box"><h2>Monthly Plant Box</h2><p>A hand-picked rare tropical plant delivered to your door each month, with care card and ceramic pot.</p><div class="price-tag">$39 <small>/ month</small></div><button class="btn-s" style="font-size:1rem;padding:1rem 3rem">Subscribe Now</button></div></section>
<footer><p>© 2026 Plantiful. All rights reserved. 🌿</p></footer>
</body></html>`,
  },

  // ═══════════════════════════════════════════════════════════════
  // 8. JUNGLE SURVIVAL ACADEMY — Training Courses
  // ═══════════════════════════════════════════════════════════════
  {
    id: "jungle-survival-academy",
    name: "Jungle Survival Academy",
    category: "Nature / Jungle",
    description: "Military-style dark design with course tier cards, skill badges, instructor credentials, equipment checklist, and enrollment form with cohort dates.",
    thumb: "🔥",
    getCode: (t: T) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Apex Survival Academy</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:#060805;color:#7a8570;overflow-x:hidden}a{text-decoration:none;color:inherit}
nav{display:flex;align-items:center;justify-content:space-between;padding:1.5rem 5%;max-width:1400px;margin:0 auto}
.logo{font-size:1.5rem;font-weight:900;color:#fff;letter-spacing:5px;text-transform:uppercase}
nav ul{list-style:none;display:flex;gap:2rem}nav ul a{font-size:.8rem;opacity:.4;text-transform:uppercase;letter-spacing:2px;transition:.2s}nav ul a:hover{opacity:1;color:#f59e0b}
.hero{height:100vh;position:relative;display:flex;align-items:center;padding:0 5%}
.hero-bg{position:absolute;inset:0}.hero-bg img{width:100%;height:100%;object-fit:cover;opacity:.25}
.hero-bg::after{content:'';position:absolute;inset:0;background:linear-gradient(135deg,#060805ee,#060805bb)}
.hero-content{position:relative;z-index:1;max-width:600px}
.hero-content .tag{display:inline-block;background:rgba(245,158,11,.1);border:1px solid rgba(245,158,11,.2);padding:.3rem 1rem;font-size:.7rem;font-weight:700;color:#f59e0b;text-transform:uppercase;letter-spacing:2px;margin-bottom:1.5rem}
.hero-content h1{font-size:4.5rem;font-weight:900;color:#fff;text-transform:uppercase;line-height:.9;margin-bottom:1.5rem;letter-spacing:-1px}
.hero-content h1 span{color:#f59e0b;display:block}
.hero-content p{opacity:.4;line-height:1.8;margin-bottom:2rem}
.btn{background:#f59e0b;color:#060805;padding:1rem 2.5rem;font-weight:800;border:none;cursor:pointer;font-size:.85rem;text-transform:uppercase;letter-spacing:3px;transition:.2s}.btn:hover{box-shadow:0 10px 35px rgba(245,158,11,.3)}
/* Courses */
.courses{padding:6rem 5%;max-width:1200px;margin:0 auto}
.courses h2{font-size:2rem;font-weight:900;color:#fff;text-transform:uppercase;letter-spacing:4px;margin-bottom:3rem;text-align:center}
.course-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem}
.course{background:#0c0f09;border:1px solid rgba(245,158,11,.06);padding:2.5rem;transition:.3s;position:relative;overflow:hidden;border-radius:4px}
.course:hover{border-color:rgba(245,158,11,.25)}
.course::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:#f59e0b;transform:scaleX(0);transition:.3s;transform-origin:left}.course:hover::before{transform:scaleX(1)}
.course .tier{font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin-bottom:1rem;padding:.2rem .6rem;display:inline-block}
.course .tier.t1{color:#22c55e;background:rgba(34,197,94,.1)}.course .tier.t2{color:#f59e0b;background:rgba(245,158,11,.1)}.course .tier.t3{color:#ef4444;background:rgba(239,68,68,.1)}
.course h3{color:#fff;font-size:1.3rem;font-weight:800;text-transform:uppercase;margin-bottom:.75rem}
.course p{font-size:.85rem;opacity:.4;line-height:1.7;margin-bottom:1.5rem}
.course .skills{display:flex;flex-wrap:wrap;gap:.4rem;margin-bottom:1.5rem}
.course .skills span{font-size:.65rem;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);padding:.15rem .5rem;color:#fff;font-weight:500}
.course .meta{display:flex;justify-content:space-between;align-items:center;padding-top:1rem;border-top:1px solid rgba(255,255,255,.04)}
.course .price{color:#f59e0b;font-weight:800;font-size:1.2rem}
.course .dur{font-size:.75rem;opacity:.3}
/* Instructors */
.instructors{padding:6rem 5%;max-width:1000px;margin:0 auto}
.instructors h2{font-size:2rem;font-weight:900;color:#fff;text-transform:uppercase;letter-spacing:4px;margin-bottom:2.5rem;text-align:center}
.ins-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem}
.ins{text-align:center;background:#0c0f09;border:1px solid rgba(245,158,11,.06);padding:2rem;border-radius:4px}
.ins img{width:80px;height:80px;border-radius:50%;object-fit:cover;margin-bottom:1rem;border:3px solid rgba(245,158,11,.2)}
.ins h4{color:#fff;font-size:.95rem;font-weight:700;text-transform:uppercase}.ins .role{color:#f59e0b;font-size:.75rem;margin-top:.15rem}.ins .cred{font-size:.7rem;opacity:.3;margin-top:.5rem;line-height:1.4}
/* CTA */
.enroll{padding:6rem 5%;text-align:center}
.enroll-box{max-width:600px;margin:0 auto;background:linear-gradient(135deg,rgba(245,158,11,.06),rgba(245,158,11,.02));border:1px solid rgba(245,158,11,.12);border-radius:4px;padding:4rem 3rem}
.enroll-box h2{font-size:2rem;font-weight:900;color:#fff;text-transform:uppercase;letter-spacing:3px;margin-bottom:.5rem}
.enroll-box p{opacity:.3;margin-bottom:2rem}
.enroll-box .next{font-size:.8rem;color:#f59e0b;font-weight:600;margin-bottom:1.5rem}
footer{padding:3rem 5%;border-top:1px solid rgba(245,158,11,.05);text-align:center;font-size:.8rem;opacity:.2}
@media(max-width:1024px){.hero-content h1{font-size:3rem}.course-grid,.ins-grid{grid-template-columns:1fr}}
@media(max-width:640px){.hero-content h1{font-size:2.5rem}nav ul{display:none}}
</style>
</head>
<body>
<nav><div class="logo">Apex</div><ul><li><a href="#">Courses</a></li><li><a href="#">Team</a></li><li><a href="#">Enroll</a></li></ul><button class="btn" style="padding:.6rem 1.5rem;font-size:.7rem">Apply Now</button></nav>
<section class="hero"><div class="hero-bg"><img src="https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=1400&h=900&fit=crop" alt="Jungle"></div><div class="hero-content"><div class="tag">🔥 Next Cohort: Jan 15, 2027</div><h1>Jungle <span>Survival</span> Academy</h1><p>Train with ex-military instructors in deep jungle environments. Learn to survive, navigate, and thrive in the wild.</p><button class="btn">Apply for Training</button></div></section>
<section class="courses"><h2>Training Programs</h2><div class="course-grid">
<div class="course"><div class="tier t1">Foundation</div><h3>Jungle Basics</h3><p>Essential survival skills — shelter, water, fire, and navigation in tropical environments.</p><div class="skills"><span>🔥 Fire Making</span><span>💧 Water Purification</span><span>🏕️ Shelter</span><span>🧭 Navigation</span></div><div class="meta"><span class="price">$1,299</span><span class="dur">5 Days</span></div></div>
<div class="course"><div class="tier t2">Advanced</div><h3>Deep Jungle</h3><p>Extended wilderness immersion — foraging, tracking, river crossing, and emergency medicine.</p><div class="skills"><span>🌿 Foraging</span><span>🐾 Tracking</span><span>🏥 Field Medicine</span><span>🪢 Rope Work</span></div><div class="meta"><span class="price">$2,999</span><span class="dur">14 Days</span></div></div>
<div class="course"><div class="tier t3">Elite</div><h3>Operator</h3><p>Military-grade jungle operations — evasion, covert movement, and team extraction under pressure.</p><div class="skills"><span>🥷 Evasion</span><span>📡 Comms</span><span>🗺️ Recon</span><span>🚁 Extraction</span></div><div class="meta"><span class="price">$5,499</span><span class="dur">21 Days</span></div></div>
</div></section>
<section class="instructors"><h2>Our Instructors</h2><div class="ins-grid">
<div class="ins"><img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop" alt="Instructor"><h4>Major Jack Torres</h4><div class="role">Lead Instructor</div><div class="cred">20 yrs Special Forces · Jungle warfare specialist · 500+ students trained</div></div>
<div class="ins"><img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop" alt="Instructor"><h4>Sgt. Kai Ota</h4><div class="role">Tracking & Navigation</div><div class="cred">Former SAS · 15 yrs tracking in Amazon and Borneo jungles</div></div>
<div class="ins"><img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop" alt="Instructor"><h4>Dr. Lena Marsh</h4><div class="role">Wilderness Medicine</div><div class="cred">Emergency MD · Médecins Sans Frontières · Tropical disease expert</div></div>
</div></section>
<section class="enroll"><div class="enroll-box"><h2>Ready to Train?</h2><p>Limited to 12 students per cohort for personalized instruction.</p><div class="next">Next cohort starts January 15, 2027 · 4 spots remaining</div><button class="btn" style="font-size:1rem;padding:1rem 3rem">Apply Now</button></div></section>
<footer><p>© 2026 Apex Survival Academy. All rights reserved.</p></footer>
</body></html>`,
  },

  // ═══════════════════════════════════════════════════════════════
  // 9. RAINFOREST DOCUMENTARY — Film Landing Page
  // ═══════════════════════════════════════════════════════════════
  {
    id: "jungle-documentary",
    name: "Rainforest Documentary",
    category: "Nature / Jungle",
    description: "Cinematic film landing with widescreen hero, trailer embed placeholder, episode cards, award badges, behind-the-scenes gallery, and streaming CTA.",
    thumb: "🎬",
    getCode: (t: T) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>CANOPY — A Rainforest Story</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:#030503;color:#7a8a6e;overflow-x:hidden}a{text-decoration:none;color:inherit}
nav{position:absolute;top:0;left:0;right:0;z-index:10;display:flex;align-items:center;justify-content:space-between;padding:2rem 5%}
.logo{font-size:1.3rem;font-weight:900;color:#fff;letter-spacing:10px;text-transform:uppercase}
nav ul{list-style:none;display:flex;gap:2rem}nav ul a{font-size:.8rem;opacity:.4;text-transform:uppercase;letter-spacing:2px;transition:.2s}nav ul a:hover{opacity:1;color:#4ade80}
.hero{height:100vh;position:relative;display:flex;align-items:center;justify-content:center;text-align:center}
.hero-bg{position:absolute;inset:0}.hero-bg img{width:100%;height:100%;object-fit:cover;opacity:.3}
.hero-bg::after{content:'';position:absolute;inset:0;background:linear-gradient(to bottom,#030503aa,#030503)}
.hero-content{position:relative;z-index:1;max-width:700px}
.hero-content h1{font-size:6rem;font-weight:900;color:#fff;text-transform:uppercase;letter-spacing:15px;line-height:1;margin-bottom:1.5rem}
.hero-content .sub{font-size:1.2rem;opacity:.4;letter-spacing:5px;text-transform:uppercase;margin-bottom:2.5rem}
.play-btn{width:80px;height:80px;border-radius:50%;background:rgba(74,222,128,.2);border:2px solid #4ade80;display:flex;align-items:center;justify-content:center;cursor:pointer;margin:0 auto;font-size:2rem;color:#4ade80;transition:.3s}
.play-btn:hover{background:#4ade80;color:#030503;box-shadow:0 0 40px rgba(74,222,128,.4)}
/* Awards */
.awards{padding:4rem 5%;max-width:800px;margin:0 auto;display:flex;justify-content:center;gap:3rem;flex-wrap:wrap}
.award{text-align:center;opacity:.35}
.award .icon{font-size:2rem;margin-bottom:.5rem}
.award h4{font-size:.75rem;color:#fff;font-weight:700;text-transform:uppercase;letter-spacing:1px}
.award p{font-size:.65rem;opacity:.6}
/* Episodes */
.episodes{padding:6rem 5%;max-width:1300px;margin:0 auto}
.episodes h2{font-size:2rem;font-weight:900;color:#fff;text-transform:uppercase;letter-spacing:5px;margin-bottom:2.5rem}
.ep-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem}
.ep{position:relative;overflow:hidden;border-radius:12px;cursor:pointer;aspect-ratio:16/9}
.ep img{width:100%;height:100%;object-fit:cover;transition:transform .5s}
.ep:hover img{transform:scale(1.08)}
.ep .info{position:absolute;inset:0;background:linear-gradient(to top,#030503ee,transparent 60%);display:flex;flex-direction:column;justify-content:flex-end;padding:1.5rem}
.ep .ep-num{font-size:.7rem;color:#4ade80;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin-bottom:.25rem}
.ep h3{color:#fff;font-size:1.1rem;font-weight:700}
.ep .dur{font-size:.75rem;opacity:.4;margin-top:.25rem}
/* Synopsis */
.synopsis{padding:6rem 5%;max-width:800px;margin:0 auto;text-align:center}
.synopsis blockquote{font-size:1.6rem;font-weight:600;color:#fff;font-style:italic;line-height:1.5;margin-bottom:2rem;opacity:.8}
.synopsis p{opacity:.4;line-height:1.8;margin-bottom:2rem}
/* Watch CTA */
.watch{padding:6rem 5%;text-align:center}
.watch-box{max-width:800px;margin:0 auto;background:linear-gradient(135deg,rgba(74,222,128,.06),rgba(74,222,128,.02));border:1px solid rgba(74,222,128,.12);border-radius:16px;padding:4rem 3rem}
.watch-box h2{font-size:2rem;font-weight:900;color:#fff;text-transform:uppercase;letter-spacing:5px;margin-bottom:1rem}
.watch-box p{opacity:.4;margin-bottom:2rem}
.platform-row{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap}
.plat{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);padding:.75rem 2rem;font-size:.85rem;font-weight:600;color:#fff;cursor:pointer;transition:.2s;border-radius:8px}
.plat:hover{border-color:#4ade80;color:#4ade80}
footer{padding:3rem 5%;border-top:1px solid rgba(74,222,128,.05);text-align:center;font-size:.8rem;opacity:.2}
@media(max-width:1024px){.hero-content h1{font-size:3.5rem;letter-spacing:8px}.ep-grid{grid-template-columns:1fr}}
@media(max-width:640px){.hero-content h1{font-size:2.5rem;letter-spacing:5px}nav ul{display:none}.awards{gap:1.5rem}}
</style>
</head>
<body>
<nav><div class="logo">Canopy</div><ul><li><a href="#">Episodes</a></li><li><a href="#">About</a></li><li><a href="#">Watch</a></li></ul></nav>
<section class="hero"><div class="hero-bg"><img src="https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?w=1400&h=900&fit=crop" alt="Rainforest"></div><div class="hero-content"><h1>Canopy</h1><div class="sub">A Rainforest Story</div><div class="play-btn">▶</div></div></section>
<div class="awards">
<div class="award"><div class="icon">🏆</div><h4>Sundance</h4><p>Best Documentary</p></div>
<div class="award"><div class="icon">🎬</div><h4>Emmy Award</h4><p>Outstanding Nature</p></div>
<div class="award"><div class="icon">⭐</div><h4>BAFTA</h4><p>Nominated</p></div>
<div class="award"><div class="icon">🌍</div><h4>Earth Prize</h4><p>Conservation Film</p></div>
</div>
<section class="episodes"><h2>Episodes</h2><div class="ep-grid">
<div class="ep"><img src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=500&h=280&fit=crop" alt="Ep1"><div class="info"><div class="ep-num">Episode 01</div><h3>The Canopy Layer</h3><div class="dur">52 min</div></div></div>
<div class="ep"><img src="https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?w=500&h=280&fit=crop" alt="Ep2"><div class="info"><div class="ep-num">Episode 02</div><h3>Rivers of Green</h3><div class="dur">48 min</div></div></div>
<div class="ep"><img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&h=280&fit=crop" alt="Ep3"><div class="info"><div class="ep-num">Episode 03</div><h3>Night Creatures</h3><div class="dur">55 min</div></div></div>
<div class="ep"><img src="https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=500&h=280&fit=crop" alt="Ep4"><div class="info"><div class="ep-num">Episode 04</div><h3>The Last Guardians</h3><div class="dur">60 min</div></div></div>
<div class="ep"><img src="https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=500&h=280&fit=crop" alt="Ep5"><div class="info"><div class="ep-num">Episode 05</div><h3>Seeds of Hope</h3><div class="dur">58 min</div></div></div>
<div class="ep"><img src="https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=500&h=280&fit=crop" alt="Ep6"><div class="info"><div class="ep-num">Episode 06</div><h3>Into the Unknown</h3><div class="dur">65 min</div></div></div>
</div></section>
<section class="synopsis"><blockquote>"A breathtaking journey into the world's most biodiverse ecosystem — and the people fighting to save it."</blockquote><p>Filmed over three years across 12 countries, CANOPY takes viewers deep into the heart of the planet's rainforests. From undiscovered species to ancient indigenous wisdom, this series reveals what we stand to lose — and what we can still protect.</p></section>
<section class="watch"><div class="watch-box"><h2>Watch Now</h2><p>Streaming on all major platforms.</p><div class="platform-row"><div class="plat">Netflix</div><div class="plat">Apple TV+</div><div class="plat">Prime Video</div><div class="plat">Disney+</div></div></div></section>
<footer><p>© 2026 Canopy Film. All rights reserved.</p></footer>
</body></html>`,
  },

  // ═══════════════════════════════════════════════════════════════
  // 10. HERBAL / AYURVEDA — Natural Remedies
  // ═══════════════════════════════════════════════════════════════
  {
    id: "jungle-herbal-medicine",
    name: "Herbal Medicine & Ayurveda",
    category: "Nature / Jungle",
    description: "Warm earthy tones with botanical illustrations, remedy cards, ingredient sourcing map, wellness quiz teaser, and herbal consultation booking.",
    thumb: "🍵",
    getCode: (t: T) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Veda Botanics — Natural Wellness</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:#faf6f0;color:#6b5e4e;overflow-x:hidden}a{text-decoration:none;color:inherit}
nav{display:flex;align-items:center;justify-content:space-between;padding:1.25rem 5%;max-width:1300px;margin:0 auto}
.logo{font-family:'Cormorant Garamond',serif;font-size:1.8rem;font-weight:700;color:#3d3225}.logo span{color:#8b6f47}
nav ul{list-style:none;display:flex;gap:2rem}nav ul a{font-size:.9rem;color:#999;font-weight:500;transition:.2s}nav ul a:hover{color:#8b6f47}
.btn-w{background:#8b6f47;color:#fff;padding:.7rem 1.5rem;border-radius:50px;font-weight:600;font-size:.85rem;border:none;cursor:pointer;transition:.2s;box-shadow:0 4px 15px rgba(139,111,71,.25)}.btn-w:hover{box-shadow:0 8px 25px rgba(139,111,71,.35)}
.hero{padding:4rem 5%;max-width:1300px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;min-height:80vh}
.hero h1{font-family:'Cormorant Garamond',serif;font-size:3.5rem;font-weight:700;color:#3d3225;line-height:1.1;margin-bottom:1rem}
.hero h1 span{color:#8b6f47;font-style:italic}
.hero p{color:#999;line-height:1.7;margin-bottom:2rem}
.trust-row{display:flex;gap:2rem;margin-bottom:2rem}
.tr-item{text-align:center}.tr-item .n{font-size:1.5rem;font-weight:800;color:#8b6f47}.tr-item .l{font-size:.7rem;color:#aaa}
.hero-img img{width:100%;border-radius:24px;box-shadow:0 20px 50px rgba(0,0,0,.06)}
/* Remedies */
.remedies{padding:5rem 5%;background:#f5efe6}
.rem-inner{max-width:1300px;margin:0 auto}
.sec-head{text-align:center;margin-bottom:3rem}.sec-head span{color:#8b6f47;font-size:.8rem;text-transform:uppercase;letter-spacing:2px;font-weight:600}.sec-head h2{font-family:'Cormorant Garamond',serif;font-size:2.5rem;color:#3d3225;margin-top:.5rem}
.rem-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem}
.rem{background:#fff;border-radius:20px;padding:2rem;box-shadow:0 4px 15px rgba(0,0,0,.03);border:1px solid #ece4d8;transition:.3s}
.rem:hover{transform:translateY(-5px);box-shadow:0 10px 30px rgba(0,0,0,.06)}
.rem .emoji{font-size:2.5rem;margin-bottom:1rem}
.rem h3{font-family:'Cormorant Garamond',serif;color:#3d3225;font-size:1.3rem;font-weight:700;margin-bottom:.5rem}
.rem .use{font-size:.75rem;color:#8b6f47;font-weight:600;margin-bottom:.5rem}
.rem p{font-size:.8rem;color:#999;line-height:1.6;margin-bottom:1rem}
.rem .tag-row{display:flex;gap:.4rem;flex-wrap:wrap}
.rem .tag-row span{font-size:.6rem;background:#f5efe6;color:#8b6f47;padding:.2rem .5rem;border-radius:4px;font-weight:500}
/* Process */
.process{padding:5rem 5%;max-width:1000px;margin:0 auto}
.proc-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:2rem;text-align:center}
.proc{padding:1.5rem}
.proc .emoji{font-size:2rem;margin-bottom:.75rem}
.proc h4{color:#3d3225;font-size:.9rem;font-weight:700;margin-bottom:.25rem}.proc p{font-size:.75rem;color:#aaa;line-height:1.5}
/* Consult */
.consult{padding:5rem 5%}
.con-box{max-width:700px;margin:0 auto;text-align:center;background:linear-gradient(135deg,#f5efe6,#faf6f0);border:1px solid #ece4d8;border-radius:24px;padding:4rem 3rem}
.con-box h2{font-family:'Cormorant Garamond',serif;font-size:2.2rem;color:#3d3225;margin-bottom:1rem}
.con-box p{color:#999;margin-bottom:2rem;max-width:400px;margin-left:auto;margin-right:auto}
.con-form{display:grid;grid-template-columns:1fr 1fr;gap:1rem;max-width:450px;margin:0 auto}
.con-form input,.con-form select{background:#fff;border:2px solid #ece4d8;border-radius:12px;padding:.85rem 1rem;color:#3d3225;font-size:.9rem;outline:none;font-family:inherit}.con-form input:focus,.con-form select:focus{border-color:#8b6f47}
.con-form button{grid-column:1/-1;background:#8b6f47;color:#fff;padding:.9rem;border-radius:12px;font-weight:600;border:none;cursor:pointer;font-size:.9rem}
footer{padding:3rem 5%;text-align:center;font-size:.8rem;color:#ccc;border-top:1px solid #ece4d8}
@media(max-width:1024px){.hero{grid-template-columns:1fr;text-align:center}.trust-row{justify-content:center}.rem-grid,.proc-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:640px){.hero h1{font-size:2.5rem}nav ul{display:none}.rem-grid,.proc-grid{grid-template-columns:1fr}.con-form{grid-template-columns:1fr}}
</style>
</head>
<body>
<nav><div class="logo">Veda<span>.</span></div><ul><li><a href="#">Remedies</a></li><li><a href="#">About</a></li><li><a href="#">Consult</a></li></ul><button class="btn-w">Book Consultation</button></nav>
<section class="hero"><div><h1>Healing from the <span>Rainforest</span></h1><p>Ancient Ayurvedic wisdom meets modern science. Our remedies are sourced directly from pristine rainforest ecosystems and prepared by certified herbalists.</p><div class="trust-row"><div class="tr-item"><div class="n">100%</div><div class="l">Natural</div></div><div class="tr-item"><div class="n">50K+</div><div class="l">Customers</div></div><div class="tr-item"><div class="n">200+</div><div class="l">Remedies</div></div></div><button class="btn-w" style="padding:.85rem 2rem;font-size:.95rem">Explore Remedies</button></div><div class="hero-img"><img src="https://images.unsplash.com/photo-1512237798647-84b57b22b517?w=600&h=600&fit=crop" alt="Herbs"></div></section>
<section class="remedies"><div class="rem-inner"><div class="sec-head"><span>Our Remedies</span><h2>Nature's Pharmacy</h2></div><div class="rem-grid">
<div class="rem"><div class="emoji">🌿</div><h3>Ashwagandha Root</h3><div class="use">Stress & Energy</div><p>Adaptogenic herb that balances cortisol levels and boosts natural energy without caffeine.</p><div class="tag-row"><span>Adaptogen</span><span>Stress Relief</span><span>Energy</span></div></div>
<div class="rem"><div class="emoji">🍃</div><h3>Turmeric Golden Blend</h3><div class="use">Inflammation & Immunity</div><p>Wild-harvested turmeric with black pepper extract for maximum curcumin absorption.</p><div class="tag-row"><span>Anti-Inflammatory</span><span>Immunity</span><span>Joints</span></div></div>
<div class="rem"><div class="emoji">🌸</div><h3>Brahmi Mind Elixir</h3><div class="use">Focus & Memory</div><p>Traditional brain tonic used for 3,000 years to enhance cognitive function and clarity.</p><div class="tag-row"><span>Nootropic</span><span>Memory</span><span>Focus</span></div></div>
</div></div></section>
<section class="process"><div class="sec-head"><span>Our Process</span><h2>From Forest to You</h2></div><div class="proc-grid">
<div class="proc"><div class="emoji">🌱</div><h4>Wild Harvested</h4><p>Sustainably collected from pristine rainforests</p></div>
<div class="proc"><div class="emoji">🔬</div><h4>Lab Tested</h4><p>Third-party tested for purity and potency</p></div>
<div class="proc"><div class="emoji">👨‍⚕️</div><h4>Expert Blended</h4><p>Formulated by certified Ayurvedic practitioners</p></div>
<div class="proc"><div class="emoji">📦</div><h4>Fresh Delivered</h4><p>Shipped in eco-friendly packaging within 48 hrs</p></div>
</div></section>
<section class="consult"><div class="con-box"><h2>Free Wellness Consultation</h2><p>Speak with a certified herbalist to find the right remedies for your needs.</p><form class="con-form"><input type="text" placeholder="Full Name"><input type="email" placeholder="Email"><select><option>Stress & Anxiety</option><option>Energy & Focus</option><option>Sleep & Recovery</option><option>Immunity & Digestion</option></select><input type="tel" placeholder="Phone (optional)"><button type="submit">Book Free Session</button></form></div></section>
<footer><p>© 2026 Veda Botanics. All rights reserved. 🌿</p></footer>
</body></html>`,
  },

  // ═══════════════════════════════════════════════════════════════
  // 11. ECO FASHION — Sustainable Clothing Brand
  // ═══════════════════════════════════════════════════════════════
  {
    id: "jungle-eco-fashion",
    name: "Eco Fashion Brand",
    category: "Nature / Jungle",
    description: "Sustainable fashion brand with earth-tone palette, ethical sourcing badges, product lookbook grid, impact counter, and newsletter with nature imagery.",
    thumb: "👗",
    getCode: (t: T) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Terra Wear — Sustainable Fashion</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:#090b07;color:#8a9a7e;overflow-x:hidden}a{text-decoration:none;color:inherit}
nav{display:flex;align-items:center;justify-content:space-between;padding:1.5rem 5%;max-width:1400px;margin:0 auto}
.logo{font-size:1.5rem;font-weight:800;color:#fff;letter-spacing:4px;text-transform:uppercase}.logo span{color:#6b8f5e}
nav ul{list-style:none;display:flex;gap:2rem}nav ul a{font-size:.85rem;opacity:.5;transition:.2s}nav ul a:hover{opacity:1;color:#6b8f5e}
.hero{min-height:90vh;display:flex;align-items:center;padding:4rem 5%;max-width:1400px;margin:0 auto}
.hero-inner{display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;width:100%}
.hero h1{font-size:3.8rem;font-weight:800;color:#fff;line-height:1.05;margin-bottom:1.5rem}
.hero h1 span{color:#6b8f5e}
.hero p{opacity:.5;line-height:1.8;margin-bottom:2rem}
.badge-row{display:flex;gap:1rem;margin-bottom:2rem;flex-wrap:wrap}
.badge-row span{font-size:.7rem;background:rgba(107,143,94,.1);border:1px solid rgba(107,143,94,.15);padding:.3rem .8rem;border-radius:50px;color:#6b8f5e;font-weight:600}
.btn-e{background:#6b8f5e;color:#fff;padding:1rem 2.5rem;border-radius:12px;font-weight:700;border:none;cursor:pointer;font-size:1rem;transition:.2s}.btn-e:hover{box-shadow:0 10px 30px rgba(107,143,94,.3)}
.hero-img img{width:100%;border-radius:20px;box-shadow:0 30px 60px rgba(0,0,0,.3)}
/* Collection */
.collection{padding:6rem 5%;max-width:1400px;margin:0 auto}
.collection h2{font-size:2rem;font-weight:800;color:#fff;margin-bottom:2.5rem}
.look-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem}
.look{position:relative;overflow:hidden;border-radius:16px;aspect-ratio:3/4;cursor:pointer}
.look img{width:100%;height:100%;object-fit:cover;transition:transform .5s}
.look:hover img{transform:scale(1.08)}
.look .info{position:absolute;bottom:0;left:0;right:0;padding:1.5rem;background:linear-gradient(to top,#090b07ee,transparent)}
.look h3{color:#fff;font-size:.95rem;font-weight:700;margin-bottom:.15rem}
.look .price{color:#6b8f5e;font-weight:700;font-size:.9rem}
/* Impact */
.impact{padding:5rem 5%;max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:2rem;text-align:center}
.imp{padding:2.5rem;background:rgba(107,143,94,.03);border:1px solid rgba(107,143,94,.08);border-radius:16px}
.imp .n{font-size:2.5rem;font-weight:900;color:#6b8f5e}.imp .l{font-size:.8rem;opacity:.4;margin-top:.25rem}
/* Values */
.values{padding:6rem 5%;max-width:1000px;margin:0 auto}
.values h2{font-size:2rem;font-weight:800;color:#fff;text-align:center;margin-bottom:2.5rem}
.val-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem}
.val{background:rgba(107,143,94,.03);border:1px solid rgba(107,143,94,.06);border-radius:16px;padding:2rem;text-align:center;transition:.3s}
.val:hover{border-color:rgba(107,143,94,.2);transform:translateY(-3px)}
.val .emoji{font-size:2rem;margin-bottom:1rem}
.val h3{color:#fff;font-size:.95rem;font-weight:700;margin-bottom:.5rem}
.val p{font-size:.8rem;opacity:.5;line-height:1.6}
/* Newsletter */
.news{padding:6rem 5%;text-align:center}
.news-box{max-width:650px;margin:0 auto;background:linear-gradient(135deg,rgba(107,143,94,.08),rgba(107,143,94,.02));border:1px solid rgba(107,143,94,.12);border-radius:24px;padding:3.5rem 2.5rem}
.news-box h2{font-size:1.5rem;font-weight:800;color:#fff;margin-bottom:.5rem}
.news-box p{opacity:.4;margin-bottom:2rem;font-size:.9rem}
.nl-form{display:flex;gap:.75rem;max-width:420px;margin:0 auto}
.nl-form input{flex:1;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:.85rem 1.2rem;color:#fff;font-size:.9rem;outline:none;font-family:inherit}.nl-form input:focus{border-color:#6b8f5e}
.nl-form button{background:#6b8f5e;color:#fff;padding:.85rem 1.5rem;border-radius:12px;font-weight:700;border:none;cursor:pointer;white-space:nowrap}
footer{padding:3rem 5%;border-top:1px solid rgba(107,143,94,.06);text-align:center;font-size:.8rem;opacity:.25}
@media(max-width:1024px){.hero-inner{grid-template-columns:1fr;text-align:center}.badge-row{justify-content:center}.look-grid{grid-template-columns:repeat(2,1fr)}.impact{grid-template-columns:repeat(2,1fr)}}
@media(max-width:640px){.hero h1{font-size:2.5rem}nav ul{display:none}.look-grid,.val-grid{grid-template-columns:1fr}.impact{grid-template-columns:1fr 1fr}.nl-form{flex-direction:column}}
</style>
</head>
<body>
<nav><div class="logo">Terra<span>Wear</span></div><ul><li><a href="#">Shop</a></li><li><a href="#">Impact</a></li><li><a href="#">About</a></li></ul><a href="#" style="font-size:1.2rem;opacity:.6">🛒</a></nav>
<section class="hero"><div class="hero-inner"><div><h1>Fashion That <span>Heals</span> the Planet</h1><p>Clothing made from rainforest-safe materials. Every piece is ethically sourced, naturally dyed, and designed to last a lifetime.</p><div class="badge-row"><span>🌿 Organic Cotton</span><span>♻️ Zero Waste</span><span>🌍 Carbon Neutral</span><span>🤝 Fair Trade</span></div><button class="btn-e">Shop Collection</button></div><div class="hero-img"><img src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=700&fit=crop" alt="Fashion"></div></div></section>
<section class="collection"><h2>New Collection</h2><div class="look-grid">
<div class="look"><img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=530&fit=crop" alt="Look"><div class="info"><h3>Forest Linen Dress</h3><div class="price">$128</div></div></div>
<div class="look"><img src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=530&fit=crop" alt="Look"><div class="info"><h3>Canopy Cardigan</h3><div class="price">$95</div></div></div>
<div class="look"><img src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=530&fit=crop" alt="Look"><div class="info"><h3>Earth Tone Blazer</h3><div class="price">$175</div></div></div>
<div class="look"><img src="https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=400&h=530&fit=crop" alt="Look"><div class="info"><h3>Bamboo Wide Pants</h3><div class="price">$89</div></div></div>
</div></section>
<div class="impact"><div class="imp"><div class="n">500K</div><div class="l">Trees Saved</div></div><div class="imp"><div class="n">0</div><div class="l">Toxic Chemicals</div></div><div class="imp"><div class="n">85%</div><div class="l">Recycled Water</div></div><div class="imp"><div class="n">12K</div><div class="l">Fair Wage Jobs</div></div></div>
<section class="values"><h2>Our Values</h2><div class="val-grid">
<div class="val"><div class="emoji">🌱</div><h3>Rainforest Safe</h3><p>Zero deforestation in our supply chain. Every material is certified sustainable.</p></div>
<div class="val"><div class="emoji">🧵</div><h3>Made to Last</h3><p>Timeless design and premium quality so you buy less and keep more.</p></div>
<div class="val"><div class="emoji">💚</div><h3>Give Back</h3><p>5% of every sale funds rainforest restoration through our partner NGOs.</p></div>
</div></section>
<section class="news"><div class="news-box"><h2>Join the Movement</h2><p>Get first access to new drops, sustainability stories, and 15% off your first order.</p><div class="nl-form"><input type="email" placeholder="Enter your email"><button>Subscribe</button></div></div></section>
<footer><p>© 2026 TerraWear. All rights reserved. 🌍</p></footer>
</body></html>`,
  },

  // ═══════════════════════════════════════════════════════════════
  // 12. TROPICAL FRUIT FARM — Farm to Table
  // ═══════════════════════════════════════════════════════════════
  {
    id: "jungle-tropical-farm",
    name: "Tropical Fruit Farm",
    category: "Nature / Jungle",
    description: "Vibrant farm-to-table with fruit product cards, seasonal harvest calendar, farm tour booking, organic certification badges, and subscription box.",
    thumb: "🥭",
    getCode: (t: T) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Tropica Farms — Exotic Fruit</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:#fefcf5;color:#5a5040;overflow-x:hidden}a{text-decoration:none;color:inherit}
nav{display:flex;align-items:center;justify-content:space-between;padding:1.25rem 5%;max-width:1300px;margin:0 auto}
.logo{font-size:1.4rem;font-weight:800;color:#2d2415}.logo span{color:#d97706}
nav ul{list-style:none;display:flex;gap:2rem}nav ul a{font-size:.9rem;color:#999;font-weight:500;transition:.2s}nav ul a:hover{color:#d97706}
.btn{background:#d97706;color:#fff;padding:.7rem 1.5rem;border-radius:50px;font-weight:600;font-size:.85rem;border:none;cursor:pointer;transition:.2s;box-shadow:0 4px 15px rgba(217,119,6,.25)}.btn:hover{box-shadow:0 8px 25px rgba(217,119,6,.35)}
.hero{padding:4rem 5%;max-width:1300px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;min-height:80vh}
.hero h1{font-size:3.5rem;font-weight:800;color:#2d2415;line-height:1.1;margin-bottom:1rem}
.hero h1 span{color:#d97706}
.hero p{color:#999;line-height:1.7;margin-bottom:2rem}
.cert-row{display:flex;gap:1rem;margin-bottom:2rem}
.cert{display:flex;align-items:center;gap:.5rem;font-size:.75rem;font-weight:600;color:#2d2415;background:#f5eed9;padding:.4rem .8rem;border-radius:50px}
.hero-img img{width:100%;border-radius:24px;box-shadow:0 20px 50px rgba(0,0,0,.08)}
/* Fruits */
.fruits{padding:5rem 5%;background:#fff}
.fr-inner{max-width:1300px;margin:0 auto}
.sec-head{text-align:center;margin-bottom:3rem}.sec-head span{color:#d97706;font-size:.8rem;text-transform:uppercase;letter-spacing:2px;font-weight:600}.sec-head h2{font-size:2.2rem;font-weight:800;color:#2d2415;margin-top:.5rem}
.fr-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem}
.fruit{background:#fefcf5;border-radius:20px;overflow:hidden;border:1px solid #f0e8d6;transition:.3s}
.fruit:hover{transform:translateY(-5px);box-shadow:0 10px 30px rgba(0,0,0,.06)}
.fruit .emoji-hero{height:140px;display:flex;align-items:center;justify-content:center;font-size:4rem;background:linear-gradient(135deg,#fefcf5,#f5eed9)}
.fruit .body{padding:1.25rem}
.fruit h3{color:#2d2415;font-size:1rem;font-weight:700;margin-bottom:.25rem}
.fruit .origin{font-size:.75rem;color:#d97706;margin-bottom:.5rem}
.fruit p{font-size:.8rem;color:#999;line-height:1.5;margin-bottom:.75rem}
.fruit .price-row{display:flex;justify-content:space-between;align-items:center}
.fruit .price{color:#d97706;font-weight:800;font-size:1.1rem}
.fruit .add{width:32px;height:32px;border-radius:8px;background:#d97706;color:#fff;border:none;cursor:pointer;font-size:.9rem;display:flex;align-items:center;justify-content:center}
/* Season */
.season{padding:5rem 5%;max-width:1000px;margin:0 auto}
.season-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem}
.month{text-align:center;padding:1.25rem;background:#fff;border-radius:14px;border:1px solid #f0e8d6}
.month .name{font-size:.7rem;text-transform:uppercase;letter-spacing:1px;color:#999;margin-bottom:.5rem;font-weight:600}
.month .emoji{font-size:1.5rem;margin-bottom:.25rem}.month .fr-name{font-size:.75rem;font-weight:600;color:#2d2415}
/* Tour */
.tour{padding:5rem 5%}
.tour-box{max-width:800px;margin:0 auto;text-align:center;background:linear-gradient(135deg,#f5eed9,#fefcf5);border:1px solid #e8dfc8;border-radius:24px;padding:4rem 3rem}
.tour-box h2{font-size:2rem;font-weight:800;color:#2d2415;margin-bottom:1rem}
.tour-box p{color:#999;margin-bottom:2rem;max-width:400px;margin-left:auto;margin-right:auto}
footer{padding:3rem 5%;text-align:center;font-size:.8rem;color:#ccc;border-top:1px solid #f0e8d6}
@media(max-width:1024px){.hero{grid-template-columns:1fr;text-align:center}.cert-row{justify-content:center}.fr-grid,.season-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:640px){.hero h1{font-size:2.5rem}nav ul{display:none}.fr-grid,.season-grid{grid-template-columns:1fr 1fr}}
</style>
</head>
<body>
<nav><div class="logo">Tropica<span>.</span></div><ul><li><a href="#">Fruits</a></li><li><a href="#">Farm Tour</a></li><li><a href="#">Subscribe</a></li></ul><button class="btn">Order Now</button></nav>
<section class="hero"><div><h1>Exotic Fruits, <span>Farm Fresh</span></h1><p>Handpicked from our organic rainforest farm. Delivered ripe and ready within 48 hours. Taste the tropics at your doorstep.</p><div class="cert-row"><div class="cert">🌿 100% Organic</div><div class="cert">✈️ 48hr Delivery</div><div class="cert">🤝 Fair Trade</div></div><button class="btn" style="padding:.85rem 2rem;font-size:.95rem">Shop Fruits</button></div><div class="hero-img"><img src="https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=600&h=500&fit=crop" alt="Fruits"></div></section>
<section class="fruits"><div class="fr-inner"><div class="sec-head"><span>Our Harvest</span><h2>Tropical Favorites</h2></div><div class="fr-grid">
<div class="fruit"><div class="emoji-hero">🥭</div><div class="body"><h3>Alphonso Mango</h3><div class="origin">Maharashtra, India</div><p>The king of mangoes — sweet, buttery, and impossibly fragrant.</p><div class="price-row"><span class="price">$24 / box</span><button class="add">+</button></div></div></div>
<div class="fruit"><div class="emoji-hero">🍍</div><div class="body"><h3>Golden Pineapple</h3><div class="origin">Costa Rica</div><p>Extra sweet, low acid. Perfectly ripe, hand-harvested at peak season.</p><div class="price-row"><span class="price">$18 / each</span><button class="add">+</button></div></div></div>
<div class="fruit"><div class="emoji-hero">🥥</div><div class="body"><h3>King Coconut</h3><div class="origin">Sri Lanka</div><p>Orange-skinned and naturally sweet water. Nature's electrolyte drink.</p><div class="price-row"><span class="price">$15 / pack</span><button class="add">+</button></div></div></div>
<div class="fruit"><div class="emoji-hero">🍈</div><div class="body"><h3>Dragon Fruit</h3><div class="origin">Vietnam</div><p>Vibrant pink flesh, mild sweetness, packed with antioxidants.</p><div class="price-row"><span class="price">$22 / box</span><button class="add">+</button></div></div></div>
</div></div></section>
<section class="season"><div class="sec-head"><span>When to Order</span><h2>Seasonal Calendar</h2></div><div class="season-grid">
<div class="month"><div class="name">Jan – Mar</div><div class="emoji">🍊</div><div class="fr-name">Blood Orange</div></div>
<div class="month"><div class="name">Apr – Jun</div><div class="emoji">🥭</div><div class="fr-name">Mango Season</div></div>
<div class="month"><div class="name">Jul – Sep</div><div class="emoji">🍍</div><div class="fr-name">Pineapple Peak</div></div>
<div class="month"><div class="name">Oct – Dec</div><div class="emoji">🥥</div><div class="fr-name">Coconut Harvest</div></div>
</div></section>
<section class="tour"><div class="tour-box"><h2>Visit Our Farm</h2><p>Walk through the groves, taste fresh fruit, and see how we farm sustainably in the rainforest.</p><button class="btn" style="font-size:1rem;padding:1rem 3rem">Book Farm Tour — $49</button></div></section>
<footer><p>© 2026 Tropica Farms. All rights reserved. 🌴</p></footer>
</body></html>`,
  },

  // ═══════════════════════════════════════════════════════════════
  // 13. REPTILE ZOO — Exotic Animals
  // ═══════════════════════════════════════════════════════════════
  {
    id: "jungle-reptile-zoo",
    name: "Reptile & Exotic Zoo",
    category: "Nature / Jungle",
    description: "Dark emerald theme with species cards featuring fun facts, interactive exhibit map teaser, feeding schedule, conservation status badges, and ticket booking.",
    thumb: "🦎",
    getCode: (t: T) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Scales & Tales — Exotic Zoo</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:#050a05;color:#7a9068;overflow-x:hidden}a{text-decoration:none;color:inherit}
nav{display:flex;align-items:center;justify-content:space-between;padding:1.5rem 5%;max-width:1400px;margin:0 auto}
.logo{font-size:1.5rem;font-weight:900;color:#fff}.logo span{color:#22c55e}
nav ul{list-style:none;display:flex;gap:2rem}nav ul a{font-size:.85rem;opacity:.5;transition:.2s}nav ul a:hover{opacity:1;color:#22c55e}
.hero{height:100vh;position:relative;display:flex;align-items:center;padding:0 5%}
.hero::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,#050a05,rgba(34,197,94,.03))}
.hero-inner{max-width:1400px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;width:100%;position:relative;z-index:1}
.hero h1{font-size:4rem;font-weight:900;color:#fff;line-height:1.05;margin-bottom:1.5rem}
.hero h1 span{color:#22c55e}
.hero p{opacity:.5;line-height:1.8;margin-bottom:2rem}
.hero-cta{display:flex;gap:1rem}
.btn-z{background:#22c55e;color:#050a05;padding:1rem 2.5rem;border-radius:14px;font-weight:700;border:none;cursor:pointer;font-size:1rem;transition:.2s}.btn-z:hover{box-shadow:0 10px 30px rgba(34,197,94,.3)}
.btn-o{background:0;color:#fff;padding:1rem 2.5rem;border-radius:14px;font-weight:600;border:2px solid rgba(255,255,255,.1);cursor:pointer;font-size:1rem;transition:.2s}.btn-o:hover{border-color:#22c55e}
.hero-img img{width:100%;border-radius:24px;box-shadow:0 30px 60px rgba(0,0,0,.4)}
/* Species */
.species{padding:6rem 5%;max-width:1300px;margin:0 auto}
.species h2{font-size:2rem;font-weight:800;color:#fff;margin-bottom:2.5rem}
.sp-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem}
.sp{background:#0a1208;border:1px solid rgba(34,197,94,.06);border-radius:20px;overflow:hidden;transition:.3s}
.sp:hover{border-color:rgba(34,197,94,.3);transform:translateY(-5px)}
.sp img{width:100%;height:220px;object-fit:cover}
.sp .body{padding:1.5rem}
.sp h3{color:#fff;font-size:1.1rem;font-weight:700;margin-bottom:.15rem}
.sp .latin{font-size:.75rem;color:#22c55e;font-style:italic;margin-bottom:.75rem}
.sp .status{display:inline-block;font-size:.6rem;font-weight:700;text-transform:uppercase;letter-spacing:1px;padding:.15rem .5rem;border-radius:4px;margin-bottom:.75rem}
.sp .status.lc{background:rgba(34,197,94,.15);color:#22c55e}
.sp .status.vu{background:rgba(234,179,8,.15);color:#eab308}
.sp .status.en{background:rgba(239,68,68,.15);color:#ef4444}
.sp .fact{font-size:.8rem;opacity:.5;line-height:1.6;padding:1rem;background:rgba(34,197,94,.03);border-radius:10px;border-left:3px solid rgba(34,197,94,.2);margin-top:.75rem}
/* Schedule */
.schedule{padding:5rem 5%;max-width:900px;margin:0 auto}
.schedule h2{font-size:2rem;font-weight:800;color:#fff;text-align:center;margin-bottom:2.5rem}
.sch-list{background:#0a1208;border:1px solid rgba(34,197,94,.06);border-radius:16px;overflow:hidden}
.sch-item{display:flex;align-items:center;gap:1.5rem;padding:1.25rem 1.5rem;border-bottom:1px solid rgba(34,197,94,.04)}
.sch-item:last-child{border-bottom:none}
.sch-item .time{font-size:.85rem;font-weight:700;color:#22c55e;min-width:80px}
.sch-item .emoji{font-size:1.5rem}
.sch-item .info h4{color:#fff;font-size:.9rem;font-weight:600}.sch-item .info p{font-size:.75rem;opacity:.4}
/* Stats */
.stats{padding:4rem 5%;max-width:1000px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem;text-align:center}
.st{padding:2rem;background:rgba(34,197,94,.03);border:1px solid rgba(34,197,94,.06);border-radius:14px}
.st .n{font-size:2.5rem;font-weight:900;color:#22c55e}.st .l{font-size:.75rem;opacity:.35;margin-top:.25rem}
/* Tickets */
.tickets{padding:6rem 5%;text-align:center}
.ticket-box{max-width:600px;margin:0 auto;background:linear-gradient(135deg,rgba(34,197,94,.06),rgba(34,197,94,.02));border:1px solid rgba(34,197,94,.12);border-radius:24px;padding:3.5rem 2.5rem}
.ticket-box h2{font-size:2rem;font-weight:800;color:#fff;margin-bottom:.5rem}
.ticket-box p{opacity:.4;margin-bottom:2rem}
.ticket-prices{display:flex;gap:1.5rem;justify-content:center;margin-bottom:2rem}
.tp{text-align:center}.tp .type{font-size:.75rem;opacity:.4;margin-bottom:.25rem}.tp .price{font-size:1.5rem;font-weight:900;color:#22c55e}
footer{padding:3rem 5%;border-top:1px solid rgba(34,197,94,.05);text-align:center;font-size:.8rem;opacity:.2}
@media(max-width:1024px){.hero-inner{grid-template-columns:1fr}.hero h1{font-size:3rem}.sp-grid{grid-template-columns:1fr}}
@media(max-width:640px){.hero h1{font-size:2.5rem}nav ul{display:none}.stats{grid-template-columns:1fr 1fr}.ticket-prices{flex-direction:column}}
</style>
</head>
<body>
<nav><div class="logo">Scales<span>&</span>Tales</div><ul><li><a href="#">Exhibits</a></li><li><a href="#">Schedule</a></li><li><a href="#">Tickets</a></li></ul><button class="btn-z" style="padding:.6rem 1.5rem;font-size:.85rem">Buy Tickets</button></nav>
<section class="hero"><div class="hero-inner"><div><h1>Meet the World's Most <span>Exotic</span> Creatures</h1><p>Home to over 300 species of reptiles, amphibians, and exotic animals. An immersive journey through the world's most fascinating ecosystems.</p><div class="hero-cta"><button class="btn-z">Buy Tickets</button><button class="btn-o">View Exhibits</button></div></div><div class="hero-img"><img src="https://images.unsplash.com/photo-1544985361-b420d7a77043?w=600&h=500&fit=crop" alt="Chameleon"></div></div></section>
<section class="species"><h2>Featured Species</h2><div class="sp-grid">
<div class="sp"><img src="https://images.unsplash.com/photo-1544985361-b420d7a77043?w=500&h=300&fit=crop" alt="Chameleon"><div class="body"><h3>Panther Chameleon</h3><div class="latin">Furcifer pardalis</div><div class="status lc">Least Concern</div><div class="fact">💡 Can move their eyes independently, giving them 360° vision without moving their head.</div></div></div>
<div class="sp"><img src="https://images.unsplash.com/photo-1474314170901-f351b68f544f?w=500&h=300&fit=crop" alt="Macaw"><div class="body"><h3>Hyacinth Macaw</h3><div class="latin">Anodorhynchus hyacinthinus</div><div class="status vu">Vulnerable</div><div class="fact">💡 The largest flying parrot — their beak can crack a coconut shell with 300 PSI of force.</div></div></div>
<div class="sp"><img src="https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=500&h=300&fit=crop" alt="Jaguar"><div class="body"><h3>Black Jaguar</h3><div class="latin">Panthera onca</div><div class="status en">Near Threatened</div><div class="fact">💡 Their bite is the strongest of all big cats — powerful enough to pierce turtle shells.</div></div></div>
</div></section>
<section class="schedule"><h2>Daily Shows & Feeding</h2><div class="sch-list">
<div class="sch-item"><span class="time">10:00 AM</span><span class="emoji">🐍</span><div class="info"><h4>Python Feeding</h4><p>Watch our 20ft Burmese python eat — live narration</p></div></div>
<div class="sch-item"><span class="time">12:00 PM</span><span class="emoji">🦎</span><div class="info"><h4>Reptile Encounter</h4><p>Hold a gecko, touch a tortoise, meet our monitor lizard</p></div></div>
<div class="sch-item"><span class="time">2:00 PM</span><span class="emoji">🐊</span><div class="info"><h4>Crocodile Talk</h4><p>Our keepers explain croc behavior and conservation</p></div></div>
<div class="sch-item"><span class="time">4:00 PM</span><span class="emoji">🦜</span><div class="info"><h4>Free Flight Show</h4><p>Macaws and toucans fly overhead in our tropical aviary</p></div></div>
</div></section>
<div class="stats"><div class="st"><div class="n">300+</div><div class="l">Species</div></div><div class="st"><div class="n">1.2M</div><div class="l">Annual Visitors</div></div><div class="st"><div class="n">50+</div><div class="l">Conservation Programs</div></div><div class="st"><div class="n">4.8★</div><div class="l">Google Rating</div></div></div>
<section class="tickets"><div class="ticket-box"><h2>Get Your Tickets</h2><p>Open daily 9 AM — 6 PM. Children under 3 enter free.</p><div class="ticket-prices"><div class="tp"><div class="type">Adult</div><div class="price">$28</div></div><div class="tp"><div class="type">Child (3-12)</div><div class="price">$15</div></div><div class="tp"><div class="type">Family (4)</div><div class="price">$75</div></div></div><button class="btn-z" style="font-size:1rem;padding:1rem 3rem">Buy Tickets Online</button></div></section>
<footer><p>© 2026 Scales & Tales Zoo. All rights reserved.</p></footer>
</body></html>`,
  },

  // ═══════════════════════════════════════════════════════════════
  // 14. RAINFOREST CHARITY — Donation Page (LIGHT THEME)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "jungle-charity",
    name: "Rainforest Charity",
    category: "Nature / Jungle",
    description: "Light theme charity page with donation tiers, impact calculator, project gallery, transparent spending breakdown, and emotional hero with child holding seedling.",
    thumb: "💚",
    getCode: (t: T) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>RainGuard — Save the Rainforest</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:#f6faf4;color:#5a6b50;overflow-x:hidden}a{text-decoration:none;color:inherit}
nav{display:flex;align-items:center;justify-content:space-between;padding:1.25rem 5%;max-width:1300px;margin:0 auto}
.logo{font-size:1.4rem;font-weight:800;color:#1a2e15}.logo span{color:#16a34a}
nav ul{list-style:none;display:flex;gap:2rem}nav ul a{font-size:.9rem;color:#888;font-weight:500;transition:.2s}nav ul a:hover{color:#16a34a}
.btn-d{background:#16a34a;color:#fff;padding:.7rem 1.5rem;border-radius:50px;font-weight:600;font-size:.85rem;border:none;cursor:pointer;transition:.2s;box-shadow:0 4px 15px rgba(22,163,74,.25)}.btn-d:hover{box-shadow:0 8px 25px rgba(22,163,74,.4)}
.hero{padding:5rem 5%;max-width:1300px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center}
.hero h1{font-size:3.5rem;font-weight:800;color:#1a2e15;line-height:1.1;margin-bottom:1rem}
.hero h1 span{color:#16a34a}
.hero p{color:#888;line-height:1.7;margin-bottom:1.5rem}
.urgency{background:#fef3c7;border:1px solid #fde68a;border-radius:12px;padding:1rem 1.25rem;display:flex;align-items:center;gap:.75rem;margin-bottom:2rem}
.urgency .emoji{font-size:1.5rem}.urgency span{font-size:.85rem;color:#92400e;font-weight:600}
.hero-img img{width:100%;border-radius:24px;box-shadow:0 20px 50px rgba(0,0,0,.08)}
/* Donation Tiers */
.donate{padding:5rem 5%;background:#fff}
.don-inner{max-width:1200px;margin:0 auto}
.sec-head{text-align:center;margin-bottom:3rem}.sec-head span{color:#16a34a;font-size:.8rem;text-transform:uppercase;letter-spacing:2px;font-weight:600}.sec-head h2{font-size:2.2rem;font-weight:800;color:#1a2e15;margin-top:.5rem}
.tier-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem}
.tier{background:#f6faf4;border-radius:20px;padding:2.5rem;text-align:center;border:2px solid #e5f0e0;transition:.3s}
.tier:hover{border-color:#16a34a;transform:translateY(-5px);box-shadow:0 10px 30px rgba(22,163,74,.1)}
.tier.popular{border-color:#16a34a;position:relative}
.tier.popular::before{content:'Most Popular';position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:#16a34a;color:#fff;font-size:.65rem;font-weight:700;padding:.25rem 1rem;border-radius:50px;text-transform:uppercase;letter-spacing:1px}
.tier .amount{font-size:3rem;font-weight:900;color:#16a34a;margin-bottom:.5rem}
.tier .amount small{font-size:1rem;opacity:.5;color:#5a6b50}
.tier h3{color:#1a2e15;font-size:1.1rem;font-weight:700;margin-bottom:.75rem}
.tier ul{list-style:none;text-align:left;margin-bottom:1.5rem}
.tier li{padding:.4rem 0;font-size:.85rem;color:#888;padding-left:1.5rem;position:relative}
.tier li::before{content:'✅';position:absolute;left:0;font-size:.7rem}
.tier button{width:100%;background:#16a34a;color:#fff;padding:.85rem;border-radius:50px;font-weight:700;border:none;cursor:pointer;font-size:.95rem;transition:.2s}
.tier button:hover{box-shadow:0 6px 20px rgba(22,163,74,.3)}
/* Impact */
.impact{padding:5rem 5%;max-width:1000px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem;text-align:center}
.imp{padding:2rem;background:#fff;border-radius:16px;box-shadow:0 2px 10px rgba(0,0,0,.03)}
.imp .n{font-size:2.5rem;font-weight:900;color:#16a34a}.imp .l{font-size:.8rem;color:#aaa;margin-top:.25rem}
/* Spending */
.spending{padding:5rem 5%;max-width:800px;margin:0 auto;text-align:center}
.spend-bars{text-align:left;max-width:500px;margin:2rem auto 0}
.sbar{margin-bottom:1.25rem}
.sbar .top{display:flex;justify-content:space-between;font-size:.85rem;margin-bottom:.4rem}
.sbar .top span:first-child{font-weight:600;color:#1a2e15}.sbar .top span:last-child{color:#16a34a;font-weight:700}
.sbar .track{height:10px;background:#e5f0e0;border-radius:5px;overflow:hidden}.sbar .fill{height:100%;background:#16a34a;border-radius:5px}
/* CTA */
.final-cta{padding:5rem 5%}
.cta-box{max-width:700px;margin:0 auto;text-align:center;background:linear-gradient(135deg,#dcfce7,#f6faf4);border:1px solid #bbf7d0;border-radius:24px;padding:4rem 3rem}
.cta-box h2{font-size:2rem;font-weight:800;color:#1a2e15;margin-bottom:1rem}
.cta-box p{color:#888;margin-bottom:2rem;max-width:400px;margin-left:auto;margin-right:auto}
footer{padding:3rem 5%;text-align:center;font-size:.8rem;color:#ccc;border-top:1px solid #e5f0e0}
@media(max-width:1024px){.hero{grid-template-columns:1fr;text-align:center}.hero-img{max-width:500px;margin:0 auto}.tier-grid,.impact{grid-template-columns:1fr}}
@media(max-width:640px){.hero h1{font-size:2.5rem}nav ul{display:none}.impact{grid-template-columns:1fr 1fr}}
</style>
</head>
<body>
<nav><div class="logo">Rain<span>Guard</span></div><ul><li><a href="#">Mission</a></li><li><a href="#">Projects</a></li><li><a href="#">Donate</a></li></ul><button class="btn-d">Donate Now</button></nav>
<section class="hero"><div><h1>Every Dollar Saves <span>10 Trees</span></h1><p>The Amazon loses 3.7 million acres every year. Your donation directly funds land protection, tree planting, and indigenous community support.</p><div class="urgency"><span class="emoji">🔥</span><span>12,000 acres of rainforest were lost today alone</span></div><button class="btn-d" style="padding:.85rem 2rem;font-size:.95rem">Donate Now</button></div><div class="hero-img"><img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=500&fit=crop" alt="Seedling"></div></section>
<section class="donate"><div class="don-inner"><div class="sec-head"><span>Make an Impact</span><h2>Choose Your Donation</h2></div><div class="tier-grid">
<div class="tier"><div class="amount">$25 <small>/mo</small></div><h3>Seedling</h3><ul><li>Plant 10 trees every month</li><li>Monthly impact report email</li><li>Digital certificate</li></ul><button>Donate $25/mo</button></div>
<div class="tier popular"><div class="amount">$50 <small>/mo</small></div><h3>Guardian</h3><ul><li>Protect 1 acre of rainforest</li><li>Satellite photo of your acre</li><li>Name on the Guardian Wall</li></ul><button>Donate $50/mo</button></div>
<div class="tier"><div class="amount">$100 <small>/mo</small></div><h3>Champion</h3><ul><li>Fund a community ranger</li><li>Quarterly video update</li><li>Annual trip invitation</li></ul><button>Donate $100/mo</button></div>
</div></div></section>
<div class="impact"><div class="imp"><div class="n">8M+</div><div class="l">Trees Planted</div></div><div class="imp"><div class="n">120K</div><div class="l">Acres Protected</div></div><div class="imp"><div class="n">95%</div><div class="l">Goes to Projects</div></div><div class="imp"><div class="n">200+</div><div class="l">Communities Helped</div></div></div>
<section class="spending"><div class="sec-head"><span>Transparency</span><h2>Where Your Money Goes</h2></div><div class="spend-bars">
<div class="sbar"><div class="top"><span>Land Protection</span><span>45%</span></div><div class="track"><div class="fill" style="width:45%"></div></div></div>
<div class="sbar"><div class="top"><span>Tree Planting</span><span>30%</span></div><div class="track"><div class="fill" style="width:30%"></div></div></div>
<div class="sbar"><div class="top"><span>Community Programs</span><span>15%</span></div><div class="track"><div class="fill" style="width:15%"></div></div></div>
<div class="sbar"><div class="top"><span>Operations</span><span>5%</span></div><div class="track"><div class="fill" style="width:5%"></div></div></div>
<div class="sbar"><div class="top"><span>Research</span><span>5%</span></div><div class="track"><div class="fill" style="width:5%"></div></div></div>
</div></section>
<section class="final-cta"><div class="cta-box"><h2>The Rainforest Can't Wait</h2><p>Join 50,000+ monthly donors who are making a real difference.</p><button class="btn-d" style="font-size:1.05rem;padding:1rem 3rem">Start Donating Today</button></div></section>
<footer><p>© 2026 RainGuard. 501(c)(3) Nonprofit. All rights reserved. 🌍</p></footer>
</body></html>`,
  },

  // ═══════════════════════════════════════════════════════════════
  // 15. JUNGLE YOGA RETREAT — Wellness Center
  // ═══════════════════════════════════════════════════════════════
  {
    id: "jungle-yoga-retreat",
    name: "Jungle Yoga Retreat",
    category: "Nature / Jungle",
    description: "Serene jungle retreat with misty morning hero, class schedule grid, instructor profiles with specialties, wellness package pricing, and booking form.",
    thumb: "🧘",
    getCode: (t: T) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Shanti — Jungle Yoga Retreat</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:#0a0d08;color:#8a9a7e;overflow-x:hidden}a{text-decoration:none;color:inherit}
nav{position:absolute;top:0;left:0;right:0;z-index:10;display:flex;align-items:center;justify-content:space-between;padding:2rem 5%}
.logo{font-family:'Cormorant Garamond',serif;font-size:2rem;font-weight:700;color:#fff;letter-spacing:5px}
nav ul{list-style:none;display:flex;gap:2rem}nav ul a{font-size:.8rem;opacity:.5;text-transform:uppercase;letter-spacing:2px;transition:.2s}nav ul a:hover{opacity:1;color:#a3c48c}
.hero{height:100vh;position:relative;display:flex;align-items:center;justify-content:center;text-align:center}
.hero-bg{position:absolute;inset:0}.hero-bg img{width:100%;height:100%;object-fit:cover;opacity:.3}
.hero-bg::after{content:'';position:absolute;inset:0;background:linear-gradient(to bottom,#0a0d08aa,#0a0d08)}
.hero-content{position:relative;z-index:1;max-width:650px}
.line{width:60px;height:1px;background:#a3c48c;margin:0 auto 2rem}
.hero-content h1{font-family:'Cormorant Garamond',serif;font-size:4.5rem;font-weight:700;color:#fff;line-height:1.05;margin-bottom:1rem}
.hero-content h1 span{color:#a3c48c;font-style:italic}
.hero-content p{opacity:.5;line-height:1.8;margin-bottom:2.5rem}
.btn-r{background:#a3c48c;color:#0a0d08;padding:1rem 2.5rem;font-weight:600;border:none;cursor:pointer;font-size:.85rem;text-transform:uppercase;letter-spacing:3px;transition:.2s;border-radius:50px}.btn-r:hover{box-shadow:0 10px 30px rgba(163,196,140,.3)}
/* Classes */
.classes{padding:6rem 5%;max-width:1200px;margin:0 auto}
.sec-head{text-align:center;margin-bottom:3rem}.sec-head span{color:#a3c48c;font-size:.8rem;text-transform:uppercase;letter-spacing:3px;font-weight:600}.sec-head h2{font-family:'Cormorant Garamond',serif;font-size:2.5rem;color:#fff;margin-top:.5rem}
.cls-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem}
.cls{background:rgba(163,196,140,.03);border:1px solid rgba(163,196,140,.08);border-radius:20px;padding:2rem;transition:.3s}
.cls:hover{border-color:rgba(163,196,140,.25);transform:translateY(-3px)}
.cls .time{font-size:.7rem;color:#a3c48c;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:.75rem}
.cls h3{font-family:'Cormorant Garamond',serif;color:#fff;font-size:1.4rem;margin-bottom:.5rem}
.cls p{font-size:.85rem;opacity:.45;line-height:1.6;margin-bottom:1rem}
.cls .level{font-size:.7rem;background:rgba(163,196,140,.1);color:#a3c48c;padding:.2rem .6rem;border-radius:50px;display:inline-block}
/* Instructors */
.instructors{padding:6rem 5%;max-width:1000px;margin:0 auto}
.ins-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem}
.ins{text-align:center;background:rgba(163,196,140,.03);border:1px solid rgba(163,196,140,.06);border-radius:20px;padding:2rem}
.ins img{width:90px;height:90px;border-radius:50%;object-fit:cover;margin-bottom:1rem;border:3px solid rgba(163,196,140,.2)}
.ins h4{font-family:'Cormorant Garamond',serif;color:#fff;font-size:1.2rem;font-weight:700}.ins .spec{color:#a3c48c;font-size:.8rem;margin-top:.25rem}.ins p{font-size:.8rem;opacity:.4;margin-top:.75rem;line-height:1.5}
/* Packages */
.packages{padding:6rem 5%;max-width:1000px;margin:0 auto}
.pkg-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem}
.pkg{background:rgba(163,196,140,.03);border:1px solid rgba(163,196,140,.08);border-radius:20px;padding:2.5rem;text-align:center;transition:.3s}
.pkg:hover{border-color:rgba(163,196,140,.3)}
.pkg .dur{font-size:.7rem;color:#a3c48c;text-transform:uppercase;letter-spacing:2px;font-weight:600;margin-bottom:.5rem}
.pkg h3{font-family:'Cormorant Garamond',serif;color:#fff;font-size:1.4rem;margin-bottom:.5rem}
.pkg .price{font-size:2rem;font-weight:800;color:#a3c48c;margin-bottom:1rem}
.pkg .price small{font-size:.85rem;opacity:.5;color:#8a9a7e}
.pkg ul{list-style:none;text-align:left;margin-bottom:1.5rem}
.pkg li{padding:.35rem 0;font-size:.8rem;opacity:.5;padding-left:1.25rem;position:relative}
.pkg li::before{content:'✦';position:absolute;left:0;color:#a3c48c;font-size:.6rem}
.pkg button{width:100%;background:#a3c48c;color:#0a0d08;padding:.85rem;border-radius:50px;font-weight:600;border:none;cursor:pointer;font-size:.85rem;text-transform:uppercase;letter-spacing:2px}
/* Testimonial */
.test{padding:5rem 5%;max-width:700px;margin:0 auto;text-align:center}
.test blockquote{font-family:'Cormorant Garamond',serif;font-size:1.6rem;font-weight:500;color:#fff;font-style:italic;line-height:1.5;margin-bottom:1.5rem}
.test .author{font-size:.85rem;opacity:.5}.test .author strong{color:#fff;opacity:1}
footer{padding:3rem 5%;border-top:1px solid rgba(163,196,140,.06);text-align:center;font-size:.8rem;opacity:.25}
@media(max-width:1024px){.hero-content h1{font-size:3rem}.cls-grid,.pkg-grid,.ins-grid{grid-template-columns:1fr}}
@media(max-width:640px){.hero-content h1{font-size:2.5rem}nav ul{display:none}}
</style>
</head>
<body>
<nav><div class="logo">SHANTI</div><ul><li><a href="#">Retreats</a></li><li><a href="#">Classes</a></li><li><a href="#">Book</a></li></ul></nav>
<section class="hero"><div class="hero-bg"><img src="https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?w=1400&h=900&fit=crop" alt="Jungle"></div><div class="hero-content"><div class="line"></div><h1>Find Your <span>Peace</span> in the Wild</h1><p>Immersive yoga retreats deep in the heart of pristine rainforest. Disconnect from the noise. Reconnect with yourself.</p><button class="btn-r">Book Your Retreat</button></div></section>
<section class="classes"><div class="sec-head"><span>Daily Practice</span><h2>Classes & Sessions</h2></div><div class="cls-grid">
<div class="cls"><div class="time">6:00 AM · Sunrise</div><h3>Hatha Flow</h3><p>Gentle morning practice to awaken body and mind as the jungle comes alive.</p><div class="level">All Levels</div></div>
<div class="cls"><div class="time">10:00 AM · Mid-Morning</div><h3>Vinyasa Power</h3><p>Dynamic flow sequence building strength, flexibility, and endurance.</p><div class="level">Intermediate</div></div>
<div class="cls"><div class="time">4:00 PM · Golden Hour</div><h3>Yin & Meditation</h3><p>Deep stretching and guided meditation with the sounds of the forest.</p><div class="level">All Levels</div></div>
</div></section>
<section class="instructors"><div class="sec-head"><span>Your Guides</span><h2>Meet Our Teachers</h2></div><div class="ins-grid">
<div class="ins"><img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop" alt="Teacher"><h4>Maya Rivers</h4><div class="spec">Hatha · Meditation · 15 yrs</div><p>Trained in Rishikesh. Specializes in breath work and mindfulness.</p></div>
<div class="ins"><img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop" alt="Teacher"><h4>Kai Andersen</h4><div class="spec">Vinyasa · Ashtanga · 12 yrs</div><p>Former athlete turned yogi. Dynamic, challenging, and inspiring.</p></div>
<div class="ins"><img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop" alt="Teacher"><h4>Ananda Dev</h4><div class="spec">Yin · Sound Healing · 20 yrs</div><p>Master teacher integrating ancient wisdom with modern neuroscience.</p></div>
</div></section>
<section class="packages"><div class="sec-head"><span>Retreats</span><h2>Choose Your Journey</h2></div><div class="pkg-grid">
<div class="pkg"><div class="dur">Weekend</div><h3>Reset</h3><div class="price">$599 <small>/ 3 days</small></div><ul><li>6 yoga sessions</li><li>Shared treehouse room</li><li>All organic meals</li><li>Guided forest walk</li></ul><button>Book Reset</button></div>
<div class="pkg"><div class="dur">Full Week</div><h3>Transform</h3><div class="price">$1,499 <small>/ 7 days</small></div><ul><li>14 yoga sessions</li><li>Private treehouse room</li><li>All organic meals + juice bar</li><li>Spa treatment included</li><li>Waterfall excursion</li></ul><button>Book Transform</button></div>
<div class="pkg"><div class="dur">Two Weeks</div><h3>Immersion</h3><div class="price">$2,499 <small>/ 14 days</small></div><ul><li>Unlimited yoga classes</li><li>Luxury canopy suite</li><li>Full board + detox program</li><li>Teacher training certificate</li><li>Private sessions daily</li></ul><button>Book Immersion</button></div>
</div></section>
<section class="test"><blockquote>"The most transformative experience of my life. Waking up to monkeys and practicing yoga in the canopy changed everything."</blockquote><div class="author"><strong>Sophie Laurent</strong> — Paris, France</div></section>
<footer><p>© 2026 Shanti Retreat. All rights reserved. 🧘</p></footer>
</body></html>`,
  },

];
