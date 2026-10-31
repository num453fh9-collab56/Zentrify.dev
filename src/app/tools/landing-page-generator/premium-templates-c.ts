export const premiumTemplatesC = [
  {
    id: "premium-forge-athletics",
    name: "Forge Athletics — Strength Club",
    category: "Fitness",
    description: "Brutalist gym page with oversized Anton type, red slabs, ticker marquee and a hard-edged class timetable.",
    thumb: "🏋️",
    getCode: () => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Forge Athletics</title>
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:#f2efe9;color:#121212;overflow-x:hidden}a{text-decoration:none;color:inherit}
.ticker{background:#121212;color:#f2efe9;overflow:hidden;white-space:nowrap;padding:.65rem 0;font-size:.68rem;font-weight:600;letter-spacing:.22em;text-transform:uppercase;border-bottom:2px solid #e23b2e}
.ticker span{display:inline-block;animation:slide 26s linear infinite}@keyframes slide{to{transform:translateX(-50%)}}
nav{display:flex;align-items:center;justify-content:space-between;padding:1.3rem 4%;border-bottom:2px solid #121212}
.logo{font-family:'Anton',sans-serif;font-size:1.5rem;letter-spacing:.02em;text-transform:uppercase}.logo b{color:#e23b2e}
nav ul{list-style:none;display:flex;gap:2rem;font-size:.72rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase}nav ul a:hover{color:#e23b2e}
.nav-btn{background:#121212;color:#f2efe9;padding:.75rem 1.5rem;font-size:.68rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;transition:.2s}.nav-btn:hover{background:#e23b2e}
.hero{display:grid;grid-template-columns:1.1fr .9fr;border-bottom:2px solid #121212}
.hero .copy{padding:5rem 4% 4rem;display:flex;flex-direction:column;justify-content:center;border-right:2px solid #121212}
.tag{display:inline-block;align-self:flex-start;background:#e23b2e;color:#fff;font-size:.6rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;padding:.45rem .8rem;margin-bottom:1.6rem}
h1{font-family:'Anton',sans-serif;font-size:7.2rem;line-height:.88;text-transform:uppercase;letter-spacing:-.01em;margin-bottom:1.4rem}
h1 i{font-style:normal;-webkit-text-stroke:2px #121212;color:transparent}.hero p{font-size:.92rem;line-height:1.8;color:#4a4a4a;max-width:420px;margin-bottom:2rem}
.actions{display:flex;gap:.8rem;flex-wrap:wrap}
.btn{background:#e23b2e;color:#fff;padding:1.05rem 2rem;font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;transition:.2s}.btn:hover{background:#121212}
.btn.ghost{background:transparent;color:#121212;border:2px solid #121212}.btn.ghost:hover{background:#121212;color:#f2efe9}
.hero .photo{position:relative;overflow:hidden;background:#d9d4ca}.hero .photo img{width:100%;height:100%;object-fit:cover;filter:grayscale(1) contrast(1.1)}
.big{position:absolute;bottom:0;right:0;background:#121212;color:#f2efe9;padding:1.2rem 1.6rem;text-align:right}
.big b{display:block;font-family:'Anton',sans-serif;font-size:2.6rem;line-height:1}.big span{font-size:.58rem;letter-spacing:.18em;text-transform:uppercase;color:#8f8f8f}
.bar{display:grid;grid-template-columns:repeat(4,1fr);border-bottom:2px solid #121212}.bar div{padding:2rem 1rem;text-align:center;border-right:2px solid #121212}
.bar div:last-child{border:none}
.bar b{display:block;font-family:'Anton',sans-serif;font-size:2.1rem;color:#e23b2e}.bar span{font-size:.6rem;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#5a5a5a}
.section{padding:4.5rem 4%;border-bottom:2px solid #121212}.head{display:flex;justify-content:space-between;align-items:end;gap:2rem;margin-bottom:2.2rem;flex-wrap:wrap}
.head h2{font-family:'Anton',sans-serif;font-size:3.2rem;line-height:.95;text-transform:uppercase}.head p{font-size:.78rem;max-width:300px;color:#5a5a5a;line-height:1.7}
.classes{display:grid;grid-template-columns:repeat(3,1fr);gap:0;border:2px solid #121212}
.cls{padding:1.8rem;border-right:2px solid #121212;border-bottom:2px solid #121212;transition:.2s;cursor:pointer}
.cls:nth-child(3n){border-right:none}.cls:nth-last-child(-n+3){border-bottom:none}.cls:hover{background:#121212;color:#f2efe9}
.cls .time{font-size:.62rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#e23b2e;margin-bottom:.8rem}
.cls h3{font-family:'Anton',sans-serif;font-size:1.45rem;font-weight:400;text-transform:uppercase;margin-bottom:.3rem}
.cls p{font-size:.78rem;color:#6a6a6a;line-height:1.6}.cls:hover p{color:#a8a8a8}
.cls .lvl{display:inline-block;margin-top:1rem;font-size:.56rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;border:1px solid currentColor;padding:.25rem .55rem}
.split{display:grid;grid-template-columns:1fr 1fr;border-bottom:2px solid #121212}.split img{width:100%;height:100%;min-height:440px;object-fit:cover;filter:grayscale(1)}
.split .body{padding:4rem;display:flex;flex-direction:column;justify-content:center}
.split .body h2{font-family:'Anton',sans-serif;font-size:2.8rem;line-height:1;text-transform:uppercase;margin-bottom:1rem}
.split .body p{color:#5a5a5a;line-height:1.8;font-size:.88rem;margin-bottom:1rem;max-width:420px}.price{display:flex;align-items:baseline;gap:.6rem;margin:1.2rem 0 1.6rem}
.price b{font-family:'Anton',sans-serif;font-size:2.6rem}.price span{font-size:.72rem;color:#6a6a6a}
footer{display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap;padding:1.6rem 4%;font-size:.62rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#7a7a7a}
@media(max-width:1050px){h1{font-size:5.4rem}.hero{grid-template-columns:1fr}.hero .copy{border-right:none;border-bottom:2px solid #121212}.hero .photo{min-height:400px}.classes{grid-template-columns:1fr 1fr}.cls:nth-child(3n){border-right:2px solid #121212}.cls:nth-child(2n){border-right:none}.cls:nth-last-child(-n+3){border-bottom:2px solid #121212}.cls:nth-last-child(-n+2){border-bottom:none}}
@media(max-width:760px){nav ul{display:none}h1{font-size:4rem}.bar{grid-template-columns:1fr 1fr}.bar div:nth-child(2){border-right:none}.bar div:nth-child(-n+2){border-bottom:2px solid #121212}.classes{grid-template-columns:1fr}.cls{border-right:none!important;border-bottom:2px solid #121212!important}.cls:last-child{border-bottom:none!important}.split{grid-template-columns:1fr}.split .body{padding:2.5rem 4%}.head h2{font-size:2.3rem}}
</style>
</head>
<body>
<div class="ticker"><span>Strength · Conditioning · No contracts · Open 5am–11pm · Forge Athletics · Strength · Conditioning · No contracts · Open 5am–11pm · Forge Athletics · </span></div>
<nav><a href="#" class="logo">FORGE<b>.</b></a><ul><li><a href="#classes">Classes</a></li><li><a href="#">Coaching</a></li><li><a href="#">Locations</a></li></ul><a href="#join" class="nav-btn">Free first week</a></nav>
<section class="hero">
<div class="copy"><span class="tag">Est. 2018 · Members only</span><h1>Lift<br>heavy.<br><i>Live</i> lighter.</h1><p>Coaching-first strength training for people who are done with crowded machines and guesswork. Real programmes, real progress.</p><div class="actions"><a href="#join" class="btn">Start training</a><a href="#classes" class="btn ghost">See classes</a></div></div>
<div class="photo"><img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&h=1100&fit=crop" alt="Gym"><div class="big"><b>5AM</b><span>Doors open daily</span></div></div>
</section>
<div class="bar"><div><b>1,200+</b><span>Active members</span></div><div><b>14</b><span>Coaches</span></div><div><b>98%</b><span>Renewal rate</span></div><div><b>0</b><span>Lock-in contracts</span></div></div>
<section class="section" id="classes"><div class="head"><h2>Today's board</h2><p>Every class is capped at 12 so a coach can actually coach.</p></div>
<div class="classes">
<div class="cls"><div class="time">06:00 · 45 min</div><h3>Barbell Basics</h3><p>Squat, hinge, press, pull — technique before load.</p><span class="lvl">All levels</span></div>
<div class="cls"><div class="time">07:30 · 60 min</div><h3>Iron Conditioning</h3><p>Density circuits that build work capacity, not wreckage.</p><span class="lvl">Intermediate</span></div>
<div class="cls"><div class="time">12:15 · 30 min</div><h3>Express Strength</h3><p>Lunch-break lifting with a fixed, efficient plan.</p><span class="lvl">All levels</span></div>
<div class="cls"><div class="time">17:00 · 60 min</div><h3>Power Hour</h3><p>Heavy triples and technique work for experienced lifters.</p><span class="lvl">Advanced</span></div>
<div class="cls"><div class="time">18:15 · 45 min</div><h3>Engine Room</h3><p>Sled, rower and bike intervals. Bring a towel.</p><span class="lvl">All levels</span></div>
<div class="cls"><div class="time">19:30 · 60 min</div><h3>Strong &amp; Mobile</h3><p>Strength with joint-friendly ranges and long exhales.</p><span class="lvl">Beginner</span></div>
</div></section>
<section class="split" id="join"><img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&h=900&fit=crop" alt="Training"><div class="body"><h2>First week on us.</h2><p>No tour, no sales pitch. Come train for seven days, meet the coaches and decide for yourself.</p><div class="price"><b>$89</b><span>/ month · cancel anytime</span></div><a href="#" class="btn">Claim free week</a></div></section>
<footer><span>© 2026 Forge Athletics</span><span>Manchester · Leeds · Bristol</span><span>train@forge.club</span></footer>
</body></html>`,
  },
  {
    id: "premium-atelier-nord",
    name: "Atelier Nord — Design School",
    category: "Education",
    description: "Bold cobalt-and-yellow design school page with a course catalogue, term calendar and studio-first admissions copy.",
    thumb: "🎓",
    getCode: () => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Atelier Nord</title>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:#f5f2e8;color:#111;overflow-x:hidden}a{text-decoration:none;color:inherit}
nav{display:flex;align-items:center;justify-content:space-between;padding:1.4rem 4%;border-bottom:2px solid #111;background:#f5f2e8;position:sticky;top:0;z-index:20}
.logo{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:1.15rem;letter-spacing:-.03em;display:flex;align-items:center;gap:.5rem}
.logo i{width:24px;height:24px;background:#1c3fd6;border-radius:50%;font-style:normal;display:inline-block}
nav ul{list-style:none;display:flex;gap:2rem;font-size:.78rem;font-weight:500}nav ul a:hover{color:#1c3fd6}
.nav-btn{background:#ffe14d;border:2px solid #111;padding:.65rem 1.3rem;font-family:'Space Grotesk',sans-serif;font-size:.76rem;font-weight:700;border-radius:50px;transition:.2s;box-shadow:3px 3px 0 #111}
.nav-btn:hover{transform:translate(2px,2px);box-shadow:1px 1px 0 #111}
.hero{position:relative;min-height:70vh;display:flex;align-items:center;border-bottom:2px solid #111;overflow:hidden}
.hero-bg{position:absolute;inset:0;z-index:0}.hero-bg img{width:100%;height:100%;object-fit:cover}
.hero-bg::after{content:'';position:absolute;inset:0;background:linear-gradient(135deg,#f5f2e8 35%,#f5f2e8cc 55%,#f5f2e844 100%)}
.stripes{position:absolute;right:-4%;top:-10%;width:38%;height:130%;background:repeating-linear-gradient(45deg,#1c3fd6 0 26px,#e9e5d6 26px 52px);opacity:.12;transform:rotate(6deg);pointer-events:none;z-index:1}
.hero .inner{position:relative;max-width:1200px;z-index:2;padding:4.5rem 4% 4rem}
.tag{display:inline-block;background:#1c3fd6;color:#fff;font-family:'Space Grotesk',sans-serif;font-size:.62rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;padding:.4rem .8rem;border-radius:50px;margin-bottom:1.4rem}
h1{font-family:'Space Grotesk',sans-serif;font-size:6.4rem;line-height:.92;letter-spacing:-.05em;font-weight:700;max-width:1000px;margin-bottom:1.6rem}
h1 mark{background:none;color:#1c3fd6;position:relative}h1 mark::after{content:'';position:absolute;left:0;right:0;bottom:.06em;height:.14em;background:#ffe14d;z-index:-1}
.hero .lower{display:grid;grid-template-columns:1.1fr .9fr;gap:3rem;align-items:end;border-top:2px solid #111;padding-top:1.6rem}
.hero p{font-size:.94rem;line-height:1.8;color:#4a4a4a;max-width:460px}.actions{display:flex;gap:.9rem;flex-wrap:wrap;align-items:center;justify-content:flex-end}
.btn{background:#111;color:#f5f2e8;padding:1rem 1.9rem;border-radius:50px;font-family:'Space Grotesk',sans-serif;font-size:.78rem;font-weight:700;transition:.2s}.btn:hover{background:#1c3fd6}
.link{font-family:'Space Grotesk',sans-serif;font-size:.78rem;font-weight:700;border-bottom:2px solid #111;padding-bottom:2px}
.stats{display:grid;grid-template-columns:repeat(4,1fr);border-bottom:2px solid #111}.stats div{padding:1.8rem 4%;border-right:2px solid #111}.stats div:last-child{border:none}
.stats b{display:block;font-family:'Space Grotesk',sans-serif;font-size:1.7rem;letter-spacing:-.03em}.stats span{font-size:.68rem;color:#5a5a5a}
.section{max-width:1250px;margin:0 auto;padding:4.5rem 4%}.head{display:flex;justify-content:space-between;align-items:end;gap:2rem;margin-bottom:2rem;flex-wrap:wrap}
.head h2{font-family:'Space Grotesk',sans-serif;font-size:2.6rem;letter-spacing:-.04em}
.head a{font-size:.74rem;font-weight:600;border-bottom:2px solid #1c3fd6;color:#1c3fd6;padding-bottom:2px}.courses{border-top:2px solid #111}
.course{display:grid;grid-template-columns:90px 1.4fr 1fr 120px;gap:1.5rem;align-items:center;padding:1.5rem 0;border-bottom:1px solid #d8d3c4;transition:.2s}
.course:hover{background:#fff;padding-left:1rem;padding-right:1rem}.course .code{font-family:'Space Grotesk',sans-serif;font-size:.74rem;font-weight:700;color:#1c3fd6}
.course h3{font-family:'Space Grotesk',sans-serif;font-size:1.15rem;font-weight:600;letter-spacing:-.01em}.course p{font-size:.8rem;color:#5a5a5a;line-height:1.55}
.course .term{font-size:.68rem;font-weight:600;text-align:right;color:#5a5a5a}
.arrow{width:34px;height:34px;border:2px solid #111;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.85rem;justify-self:end;transition:.2s}
.course:hover .arrow{background:#ffe14d}.banner{background:#1c3fd6;color:#f5f2e8;padding:4rem 4%;display:grid;grid-template-columns:1.2fr .8fr;gap:3rem;align-items:center}
.banner h2{font-family:'Space Grotesk',sans-serif;font-size:3rem;line-height:1.02;letter-spacing:-.04em;margin-bottom:.8rem}.banner h2 em{font-style:normal;color:#ffe14d}
.banner p{color:rgba(245,242,232,.75);line-height:1.8;font-size:.9rem;max-width:480px}
.banner .card{background:#f5f2e8;color:#111;border:2px solid #111;border-radius:20px;padding:1.8rem;box-shadow:8px 8px 0 #111}
.banner .card h4{font-family:'Space Grotesk',sans-serif;font-size:.9rem;margin-bottom:1rem}
.banner .card div{display:flex;justify-content:space-between;font-size:.78rem;padding:.6rem 0;border-bottom:1px solid #e2ddcd}
.banner .card div:last-of-type{border:none}.banner .card b{font-weight:600}.banner .card small{display:block;margin-top:1rem;font-size:.66rem;color:#666}
footer{display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap;padding:1.8rem 4%;font-size:.68rem;color:#666;border-top:2px solid #111}
@media(max-width:1000px){h1{font-size:4.6rem}.hero .lower{grid-template-columns:1fr;align-items:start}.actions{justify-content:flex-start}.course{grid-template-columns:70px 1fr 90px}.course p{display:none}.banner{grid-template-columns:1fr}}
@media(max-width:700px){nav ul{display:none}h1{font-size:3.2rem}.stats{grid-template-columns:1fr 1fr}.stats div:nth-child(2){border-right:none}.stats div:nth-child(-n+2){border-bottom:2px solid #111}.course{grid-template-columns:1fr 40px;gap:.5rem}.course .code{grid-column:1/-1;margin-bottom:-.3rem}.course .term{display:none}.banner h2{font-size:2.2rem}.head h2{font-size:2rem}}
</style>
</head>
<body>
<nav><a href="#" class="logo"><i></i>Atelier Nord</a><ul><li><a href="#courses">Courses</a></li><li><a href="#">Studios</a></li><li><a href="#">Admissions</a></li></ul><a href="#" class="nav-btn">Apply for 2026 →</a></nav>
<section class="hero"><div class="hero-bg"><img src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1600&h=900&fit=crop" alt="Design studio workspace"></div><div class="stripes"></div><div class="inner">
<span class="tag">Design school · Copenhagen · Est. 1997</span>
<h1>Learn by making,<br>not by <mark>memorising.</mark></h1>
<div class="lower"><p>Two-year studio programmes in graphic, product and digital design. Small cohorts, real clients, and tutors who still do the work.</p><div class="actions"><a href="#courses" class="btn">Explore courses</a><a href="#" class="link">Book an open studio</a></div></div>
</div></section>
<div class="stats"><div><b>240</b><span>Students per year</span></div><div><b>12</b><span>Max per studio</span></div><div><b>94%</b><span>Placed in 6 months</span></div><div><b>28</b><span>Years teaching</span></div></div>
<section class="section" id="courses"><div class="head"><h2>Courses &amp; studios</h2><a href="#">Download prospectus</a></div>
<div class="courses">
<div class="course"><span class="code">GR-201</span><h3>Graphic Design Studio</h3><p>Type, layout and identity across print and screen.</p><span class="term">Autumn · 2 years</span><span class="arrow">→</span></div>
<div class="course"><span class="code">PR-140</span><h3>Product &amp; Furniture</h3><p>From sketch to prototype in wood, metal and textile.</p><span class="term">Autumn · 2 years</span><span class="arrow">→</span></div>
<div class="course"><span class="code">DG-320</span><h3>Digital Experience</h3><p>Interfaces, motion and research-led interaction design.</p><span class="term">Spring · 2 years</span><span class="arrow">→</span></div>
<div class="course"><span class="code">TX-110</span><h3>Textiles &amp; Materials</h3><p>Colour, weave and sustainable material exploration.</p><span class="term">Autumn · 1 year</span><span class="arrow">→</span></div>
<div class="course"><span class="code">EV-090</span><h3>Evening Foundation</h3><p>Portfolio-building for career changers and beginners.</p><span class="term">Rolling · 10 weeks</span><span class="arrow">→</span></div>
</div></section>
<section class="banner"><div><h2>The studio is<br><em>the classroom.</em></h2><p>Every course is built around live briefs, weekly critiques and a final public show. You leave with a portfolio, not just a certificate.</p></div>
<div class="card"><h4>2026 application dates</h4><div><span>Portfolio deadline</span><b>14 Jan 2026</b></div><div><span>Interviews</span><b>Feb – Mar</b></div><div><span>Offers sent</span><b>01 Apr 2026</b></div><div><span>Term begins</span><b>24 Aug 2026</b></div><small>Scholarships available for EU applicants.</small></div></section>
<footer><span>© 2026 Atelier Nord</span><span>Refshalevej 22, Copenhagen</span><span>study@ateliernord.dk</span></footer>
</body></html>`,
  },
  {
    id: "premium-lumen-skin",
    name: "Lumen Skin — Quiet Skincare",
    category: "Fashion / Lifestyle",
    description: "Soft blush skincare page with tall serif type, ingredient-led ritual steps and a quiet, clinical-luxe tone.",
    thumb: "🧴",
    getCode: () => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Lumen Skin</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:#f8eee9;color:#3a2a26;overflow-x:hidden}a{text-decoration:none;color:inherit}
nav{display:flex;align-items:center;justify-content:space-between;padding:1.5rem 5%;max-width:1300px;margin:0 auto}
.logo{font-family:'Cormorant Garamond',serif;font-size:1.65rem;letter-spacing:.22em;text-transform:uppercase}
nav ul{list-style:none;display:flex;gap:2.2rem;font-size:.74rem;letter-spacing:.12em;text-transform:uppercase;color:#6d554e}nav ul a:hover{color:#3a2a26}
.nav-btn{font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;border:1px solid #3a2a26;padding:.7rem 1.4rem;border-radius:50px;transition:.25s}.nav-btn:hover{background:#3a2a26;color:#f8eee9}
.hero{max-width:1150px;margin:0 auto;padding:2.5rem 5% 5rem;text-align:center}
.hero .kicker{font-size:.64rem;font-weight:600;letter-spacing:.3em;text-transform:uppercase;color:#b96a5b;margin-bottom:1.6rem}
h1{font-family:'Cormorant Garamond',serif;font-size:5.6rem;line-height:.98;font-weight:300;letter-spacing:-.01em;margin-bottom:1.4rem}h1 em{font-style:italic;color:#b96a5b}
.hero p{max-width:480px;margin:0 auto 2rem;font-size:.9rem;line-height:1.85;color:#6d554e}
.btn{display:inline-block;background:#3a2a26;color:#f8eee9;padding:1rem 2.2rem;border-radius:50px;font-size:.7rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;transition:.25s}.btn:hover{background:#b96a5b}
.hero .sub{display:block;margin-top:1rem;font-size:.7rem;color:#8a7168;letter-spacing:.04em}
.stage{position:relative;max-width:980px;margin:3.5rem auto 0;height:460px;display:flex;align-items:center;justify-content:center}
.stage img{position:absolute;object-fit:cover;border-radius:200px 200px 0 0}.stage .a{width:300px;height:380px;left:50%;transform:translateX(-50%);z-index:2}
.stage .b{width:230px;height:300px;left:calc(50% - 330px);border-radius:18px;z-index:1;filter:saturate(.8)}
.stage .c{width:230px;height:300px;left:calc(50% + 100px);border-radius:18px;z-index:1;filter:saturate(.8)}
.stage .cap{position:absolute;bottom:-6px;left:50%;transform:translateX(-50%);background:#f8eee9;padding:.55rem 1.1rem;border:1px solid #e3cfc6;border-radius:50px;font-size:.64rem;letter-spacing:.14em;text-transform:uppercase;color:#6d554e;z-index:3;white-space:nowrap}
.marquee{border-top:1px solid #e3cfc6;border-bottom:1px solid #e3cfc6;padding:1rem 0;overflow:hidden;white-space:nowrap;font-family:'Cormorant Garamond',serif;font-size:1.1rem;font-style:italic;color:#8a7168}
.marquee span{display:inline-block;animation:move 30s linear infinite}@keyframes move{to{transform:translateX(-50%)}}.section{max-width:1150px;margin:0 auto;padding:5rem 5%}
.head{text-align:center;margin-bottom:3rem}.head .k{font-size:.62rem;font-weight:600;letter-spacing:.26em;text-transform:uppercase;color:#b96a5b;margin-bottom:.8rem}
.head h2{font-family:'Cormorant Garamond',serif;font-size:3rem;font-weight:400;line-height:1.1}.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:1.6rem}
.step{background:#fdf7f4;border:1px solid #ecdbd3;border-radius:18px;padding:1.8rem;text-align:left}
.step .n{font-family:'Cormorant Garamond',serif;font-size:1.1rem;color:#b96a5b;margin-bottom:1.4rem;display:block}
.step .dot{width:100%;height:150px;border-radius:12px;margin-bottom:1.2rem;display:flex;align-items:center;justify-content:center;font-size:2.2rem}
.step:nth-child(1) .dot{background:linear-gradient(140deg,#f0ded6,#e6cdc2)}.step:nth-child(2) .dot{background:linear-gradient(140deg,#f2e6dc,#e8d4c4)}
.step:nth-child(3) .dot{background:linear-gradient(140deg,#f5e9e0,#edd8c8)}.step h3{font-family:'Cormorant Garamond',serif;font-size:1.5rem;font-weight:400;margin-bottom:.4rem}
.step p{font-size:.8rem;color:#7a615a;line-height:1.7}.note{margin-top:1.6rem;font-size:.72rem;color:#8a7168;text-align:center;letter-spacing:.02em}
.split{display:grid;grid-template-columns:1fr 1fr;gap:0;border-top:1px solid #e3cfc6;border-bottom:1px solid #e3cfc6}
.split img{width:100%;height:100%;min-height:480px;object-fit:cover}.split .body{padding:4.5rem 5%;display:flex;flex-direction:column;justify-content:center}
.split .body .k{font-size:.62rem;font-weight:600;letter-spacing:.26em;text-transform:uppercase;color:#b96a5b;margin-bottom:1rem}
.split .body h2{font-family:'Cormorant Garamond',serif;font-size:2.7rem;font-weight:400;line-height:1.12;margin-bottom:1rem}
.split .body p{font-size:.86rem;line-height:1.85;color:#7a615a;max-width:400px;margin-bottom:.9rem}
.split .body a{font-size:.7rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;border-bottom:1px solid #3a2a26;align-self:flex-start;padding-bottom:4px;margin-top:.8rem}
.cta{text-align:center;padding:5rem 5%}.cta h2{font-family:'Cormorant Garamond',serif;font-size:3.2rem;font-weight:400;margin-bottom:.8rem}
.cta p{color:#7a615a;font-size:.85rem;margin-bottom:1.8rem}
footer{display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap;padding:1.8rem 5%;font-size:.66rem;color:#9c837a;border-top:1px solid #e3cfc6;letter-spacing:.04em}
@media(max-width:980px){h1{font-size:4.2rem}.stage{height:400px}.stage .b{left:calc(50% - 280px);width:180px;height:240px}.stage .c{left:calc(50% + 100px);width:180px;height:240px}.steps{grid-template-columns:1fr}.split{grid-template-columns:1fr}.split img{min-height:340px}.split .body{padding:3rem 5%}}
@media(max-width:660px){nav ul{display:none}h1{font-size:3.1rem}.stage{height:320px}.stage .a{width:220px;height:290px}.stage .b,.stage .c{display:none}.head h2{font-size:2.2rem}.cta h2{font-size:2.2rem}.split .body h2{font-size:2rem}}
</style>
</head>
<body>
<nav><a href="#" class="logo">Lumen</a><ul><li><a href="#ritual">The ritual</a></li><li><a href="#">Shop</a></li><li><a href="#">Journal</a></li></ul><a href="#ritual" class="nav-btn">Shop the range</a></nav>
<section class="hero">
<div class="kicker">Barrier-first skincare · Small batch</div>
<h1>Skin, but <em>quieter.</em></h1>
<p>Four considered formulas, no twenty-step routine. Lumen is built around your skin barrier and nothing else.</p>
<a href="#ritual" class="btn">Discover the ritual</a>
<span class="sub">Dermatologist tested · Fragrance free · Refillable</span>
<div class="stage"><img class="b" src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=600&fit=crop" alt="Skincare"><img class="c" src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&h=600&fit=crop" alt="Serum"><img class="a" src="https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=700&h=900&fit=crop" alt="Skincare bottle"><div class="cap">The everyday set · $78</div></div>
</section>
<div class="marquee"><span>Ceramides · Squalane · Panthenol · Oat lipids · Ceramides · Squalane · Panthenol · Oat lipids · </span></div>
<section class="section" id="ritual"><div class="head"><div class="k">The four-step ritual</div><h2>Less, but better.</h2></div>
<div class="steps">
<div class="step"><span class="n">01</span><div class="dot">🫧</div><h3>Cleanse</h3><p>A pH-balanced gel that removes the day without stripping the barrier.</p></div>
<div class="step"><span class="n">02</span><div class="dot">💧</div><h3>Hydrate</h3><p>Hyaluronic and panthenol serum that sinks in and stays put.</p></div>
<div class="step"><span class="n">03</span><div class="dot">🌾</div><h3>Seal</h3><p>Ceramide cream that locks everything in overnight, weightlessly.</p></div>
</div>
<p class="note">That's it. Morning and night, four minutes total.</p></section>
<div class="split"><img src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=900&h=900&fit=crop" alt="Skincare ingredients"><div class="body"><div class="k">Why barrier-first</div><h2>Healthy skin isn't a trend. It's a baseline.</h2><p>Most routines over-exfoliate and under-repair. We do the opposite: fewer actives, more lipids, and formulas tested for 12 weeks on sensitive skin.</p><p>Every bottle is refillable, and every ingredient is listed in plain English on the label.</p><a href="#">Read our formulation notes</a></div></div>
<section class="cta"><h2>Start with the essentials.</h2><p>The Everyday Set — cleanser, serum and cream. $78, refills $54.</p><a href="#" class="btn">Shop the set</a></section>
<footer><span>© 2026 Lumen Skin</span><span>Copenhagen · Made in small batches</span><span>care@lumenskin.com</span></footer>
</body></html>`,
  },
];
