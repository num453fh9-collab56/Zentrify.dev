interface T {
  name: string; primary: string; secondary: string; accent: string;
  dark: string; darkAlt: string; text: string; light: string;
}

export const luxuryRealEstateTemplates = [
  {
    id: "realestate-luxury-apartments",
    name: "Real Estate — Luxury Serviced Apartments",
    category: "Real Estate",
    description: "Premium dark real estate landing with gold accents, property hero, suite cards, amenities, stats bar, booking form, and WhatsApp float.",
    thumb: "🏙️",
    getCode: (_t: T) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Prestige Residences</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;background:#07060a;color:#9a917e;overflow-x:hidden}
a{text-decoration:none;color:inherit}
:root{--g:#c4a35a;--gl:#ddc07a;--d:#07060a;--da:#0e0d13;--c:#f3ecd8}

nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:.9rem 5%;background:rgba(7,6,10,.92);backdrop-filter:blur(18px);border-bottom:1px solid rgba(196,163,90,.06)}
.logo{display:flex;align-items:center;gap:.6rem}
.logo-mark{width:38px;height:38px;border:1.5px solid var(--g);border-radius:4px;display:grid;place-items:center}
.logo-mark svg{width:20px;height:20px;fill:var(--g)}
.logo-name{font-family:'Playfair Display',serif;font-size:1.25rem;font-weight:700;color:var(--c);line-height:1.1}
.logo-tag{font-size:.48rem;text-transform:uppercase;letter-spacing:3px;color:var(--g);opacity:.65}
nav ul{list-style:none;display:flex;gap:2rem}
nav ul a{font-size:.68rem;font-weight:500;text-transform:uppercase;letter-spacing:1.5px;opacity:.4;transition:.25s}
nav ul a:hover{opacity:1;color:var(--g)}
.nav-cta{background:var(--g);color:var(--d);padding:.55rem 1.3rem;font-size:.65rem;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;border:none;cursor:pointer;transition:.25s}
.nav-cta:hover{background:var(--gl)}

/* ─ HERO ─ */
.hero{min-height:100vh;position:relative;display:flex;align-items:center}
.hero-bg{position:absolute;inset:0}
.hero-bg img{width:100%;height:100%;object-fit:cover;opacity:.3}
.hero-bg::after{content:'';position:absolute;inset:0;background:linear-gradient(100deg,var(--d) 32%,rgba(7,6,10,.7) 60%,rgba(7,6,10,.5))}
.hero-in{position:relative;z-index:2;max-width:1260px;margin:0 auto;padding:7rem 5% 4rem;display:grid;grid-template-columns:1.1fr .9fr;gap:3.5rem;align-items:center;width:100%}
.h-tag{font-size:.6rem;text-transform:uppercase;letter-spacing:4px;color:var(--g);opacity:.65;margin-bottom:1.6rem;display:flex;gap:1.2rem}
.h-tag span:not(:last-child)::after{content:'|';margin-left:1.2rem;opacity:.3}
.hero-in h1{font-family:'Playfair Display',serif;font-size:3.6rem;font-weight:800;color:var(--c);line-height:1.06;margin-bottom:.6rem}
.hero-in h1 em{color:var(--g);font-style:italic}
.h-suite{display:flex;align-items:baseline;gap:.8rem;margin-bottom:.8rem}
.h-suite .big{font-family:'Playfair Display',serif;font-size:4.2rem;font-weight:300;color:var(--g);opacity:.22;line-height:1}
.h-suite h2{font-family:'Playfair Display',serif;font-size:1.5rem;color:var(--c);font-weight:600}
.h-suite h2 span{display:block;font-size:1rem;font-weight:400;opacity:.55}
.h-desc{font-size:.84rem;opacity:.45;line-height:1.8;margin-bottom:1.4rem;max-width:400px}
.h-feats{list-style:none;display:grid;grid-template-columns:1fr 1fr;gap:.45rem .8rem;margin-bottom:1.8rem}
.h-feats li{font-size:.78rem;color:var(--c);opacity:.6;display:flex;align-items:center;gap:.6rem}
.h-feats li::before{content:'';width:5px;height:5px;background:var(--g);border-radius:50%;flex-shrink:0}
.btn-book{display:inline-block;background:var(--g);color:var(--d);padding:.9rem 2.2rem;font-size:.72rem;font-weight:600;letter-spacing:2px;text-transform:uppercase;border:none;cursor:pointer;transition:.25s}
.btn-book:hover{background:var(--gl);box-shadow:0 12px 35px rgba(196,163,90,.25)}

/* hero right card */
.h-card{background:rgba(255,255,255,.03);backdrop-filter:blur(16px);border:1px solid rgba(196,163,90,.08);border-radius:14px;padding:1.6rem;position:relative}
.h-card .hc-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:1.2rem}
.h-card .hc-top span:first-child{font-family:'Playfair Display',serif;font-size:1.1rem;color:var(--c);font-weight:600}
.h-card .hc-badge{background:rgba(196,163,90,.1);color:var(--g);padding:.22rem .65rem;font-size:.58rem;font-weight:600;letter-spacing:1px;text-transform:uppercase;border-radius:3px}
.h-card .hc-img{width:100%;aspect-ratio:4/3;border-radius:8px;overflow:hidden;margin-bottom:1.2rem;border:1px solid rgba(196,163,90,.04)}
.h-card .hc-img img{width:100%;height:100%;object-fit:cover}
.hc-grid{display:grid;grid-template-columns:1fr 1fr;gap:.6rem}
.hc-cell{background:rgba(196,163,90,.03);border:1px solid rgba(196,163,90,.06);border-radius:6px;padding:.6rem;text-align:center}
.hc-cell b{display:block;font-family:'Playfair Display',serif;font-size:.95rem;color:var(--c);font-weight:600}
.hc-cell small{font-size:.55rem;text-transform:uppercase;letter-spacing:1.5px;opacity:.35}
/* side pills */
.h-pills{position:absolute;right:-48px;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;gap:.4rem}
.h-pill{width:38px;height:38px;background:rgba(196,163,90,.08);border:1px solid rgba(196,163,90,.1);border-radius:6px;display:grid;place-items:center;cursor:pointer;font-size:.7rem;color:var(--g);transition:.2s}
.h-pill:hover{background:var(--g);color:var(--d)}

/* ─ STATS ─ */
.stats{border-top:1px solid rgba(196,163,90,.06);border-bottom:1px solid rgba(196,163,90,.06);background:var(--da)}
.stats-in{max-width:1260px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);padding:0}
.st{text-align:center;padding:2rem 1rem;position:relative}
.st:not(:last-child)::after{content:'';position:absolute;right:0;top:25%;height:50%;width:1px;background:rgba(196,163,90,.08)}
.st b{display:block;font-family:'Playfair Display',serif;font-size:1.8rem;color:var(--c);font-weight:600}
.st span{font-size:.6rem;text-transform:uppercase;letter-spacing:2px;opacity:.35;margin-top:.15rem;display:block}

/* ─ SUITES ─ */
.suites{padding:5rem 5%;max-width:1260px;margin:0 auto}
.sh{text-align:center;margin-bottom:3rem}
.sh .ey{font-size:.6rem;text-transform:uppercase;letter-spacing:5px;color:var(--g);margin-bottom:.6rem}
.sh h2{font-family:'Playfair Display',serif;font-size:2.4rem;font-weight:700;color:var(--c)}
.sh p{font-size:.88rem;opacity:.3;margin-top:.3rem;font-style:italic;font-family:'Playfair Display',serif}
.s-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.2rem}
.s-card{background:var(--da);border:1px solid rgba(196,163,90,.05);border-radius:12px;overflow:hidden;transition:.35s}
.s-card:hover{border-color:rgba(196,163,90,.2);transform:translateY(-6px);box-shadow:0 20px 45px rgba(0,0,0,.35)}
.s-card .s-img{aspect-ratio:16/10;overflow:hidden}
.s-card .s-img img{width:100%;height:100%;object-fit:cover;transition:.4s}
.s-card:hover .s-img img{transform:scale(1.04)}
.s-card .s-body{padding:1.3rem}
.s-card .s-head{display:flex;align-items:baseline;gap:.5rem;margin-bottom:.4rem}
.s-card .s-head .n{font-family:'Playfair Display',serif;font-size:2rem;font-weight:300;color:var(--g);opacity:.3;line-height:1}
.s-card .s-head h3{font-family:'Playfair Display',serif;font-size:1.05rem;color:var(--c);font-weight:600}
.s-card .s-area{font-size:.7rem;opacity:.35;margin-bottom:.8rem}
.s-tags{display:flex;flex-wrap:wrap;gap:.35rem;margin-bottom:1rem}
.s-tags span{font-size:.6rem;padding:.2rem .55rem;border:1px solid rgba(196,163,90,.08);border-radius:50px;color:var(--g);opacity:.6}
.s-foot{display:flex;justify-content:space-between;align-items:center;padding-top:.8rem;border-top:1px solid rgba(196,163,90,.05)}
.s-foot .pr{font-family:'Playfair Display',serif;font-size:1.15rem;color:var(--g);font-weight:600}
.s-foot .pr small{font-size:.6rem;opacity:.5;font-weight:400;font-family:'Inter',sans-serif}
.badge-av{font-size:.55rem;text-transform:uppercase;letter-spacing:.8px;padding:.2rem .6rem;border-radius:3px;font-weight:600}
.badge-av.green{background:rgba(76,175,80,.08);color:#4caf50;border:1px solid rgba(76,175,80,.15)}
.badge-av.amber{background:rgba(255,152,0,.08);color:#ff9800;border:1px solid rgba(255,152,0,.15)}
.badge-av.red{background:rgba(244,67,54,.08);color:#f44336;border:1px solid rgba(244,67,54,.15)}

/* ─ AMENITIES ─ */
.amen{padding:5rem 5%;background:var(--da)}
.amen-in{max-width:1260px;margin:0 auto}
.a-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem}
.a-item{background:rgba(196,163,90,.02);border:1px solid rgba(196,163,90,.04);border-radius:10px;padding:1.4rem 1.2rem;text-align:center;transition:.25s}
.a-item:hover{border-color:rgba(196,163,90,.15);transform:translateY(-3px)}
.a-item .ai{width:44px;height:44px;margin:0 auto .6rem;background:rgba(196,163,90,.05);border:1px solid rgba(196,163,90,.08);border-radius:10px;display:grid;place-items:center;font-size:1.15rem}
.a-item h4{font-size:.82rem;color:var(--c);font-weight:600;margin-bottom:.15rem}
.a-item p{font-size:.65rem;opacity:.3;line-height:1.5}

/* ─ BOOKING ─ */
.book{padding:5rem 5%}
.book-in{max-width:620px;margin:0 auto;text-align:center}
.book-in h2{font-family:'Playfair Display',serif;font-size:2.2rem;font-weight:700;color:var(--c);margin-bottom:.3rem}
.book-in>p{font-size:.88rem;opacity:.3;margin-bottom:2rem;font-style:italic;font-family:'Playfair Display',serif}
.bf{display:grid;grid-template-columns:1fr 1fr;gap:.8rem}
.bf input,.bf select{background:rgba(196,163,90,.03);border:1px solid rgba(196,163,90,.08);padding:.85rem 1rem;font-family:'Inter',sans-serif;font-size:.8rem;color:var(--c);outline:none;border-radius:6px;transition:.2s}
.bf input:focus,.bf select:focus{border-color:var(--g)}
.bf input::placeholder{color:rgba(154,145,126,.35)}
.bf select{color:#9a917e}
.bf select option{background:var(--d);color:var(--c)}
.bf .full{grid-column:1/-1}
.bf button{grid-column:1/-1;background:var(--g);color:var(--d);padding:.95rem;font-family:'Inter',sans-serif;font-size:.75rem;font-weight:600;letter-spacing:2px;text-transform:uppercase;border:none;cursor:pointer;border-radius:6px;transition:.25s}
.bf button:hover{background:var(--gl);box-shadow:0 8px 28px rgba(196,163,90,.25)}

/* ─ FOOTER ─ */
footer{padding:2.5rem 5%;border-top:1px solid rgba(196,163,90,.05);display:flex;justify-content:space-between;align-items:center;max-width:1260px;margin:0 auto;flex-wrap:wrap;gap:1rem}
footer .fl{font-family:'Playfair Display',serif;font-size:1.1rem;color:var(--c)}
footer .flinks{display:flex;gap:1.8rem;font-size:.72rem;opacity:.3}
footer .flinks a:hover{opacity:.7;color:var(--g)}
footer .fc{font-size:.65rem;opacity:.18}

/* WhatsApp */
.wa{position:fixed;bottom:1.5rem;right:1.5rem;z-index:99;width:50px;height:50px;background:#25d366;border-radius:50%;display:grid;place-items:center;cursor:pointer;box-shadow:0 4px 18px rgba(37,211,102,.3);transition:.25s}
.wa:hover{transform:scale(1.08)}
.wa svg{width:26px;height:26px;fill:#fff}

@media(max-width:1024px){.hero-in{grid-template-columns:1fr;padding-top:6rem}.h-card{display:none}.hero-in h1{font-size:2.8rem}.s-grid{grid-template-columns:1fr 1fr}.a-grid{grid-template-columns:1fr 1fr}.stats-in{grid-template-columns:1fr 1fr}.st:not(:last-child)::after{display:none}.h-pills{display:none}}
@media(max-width:640px){nav ul{display:none}.hero-in h1{font-size:2.2rem}.s-grid,.a-grid,.stats-in{grid-template-columns:1fr}.bf{grid-template-columns:1fr}footer{flex-direction:column;text-align:center}.h-feats{grid-template-columns:1fr}}
</style>
</head>
<body>

<nav>
<a href="#" class="logo"><div class="logo-mark"><svg viewBox="0 0 24 24"><path d="M3 21V7l9-4 9 4v14H3zm2-2h14V8l-7-3.1L5 8v11zm3-2h8v-2H8v2zm0-4h8v-2H8v2z"/></svg></div><div><span class="logo-name">Autograph</span><span class="logo-tag">Serviced Apartments</span></div></a>
<ul><li><a href="#">Home</a></li><li><a href="#suites">Residences</a></li><li><a href="#amen">Amenities</a></li><li><a href="#">Media</a></li><li><a href="#book">Booking</a></li><li><a href="#">About</a></li></ul>
<a href="#book" class="nav-cta">Book Now</a>
</nav>

<section class="hero">
<div class="hero-bg"><img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1600&h=1000&fit=crop" alt="Luxury apartment"></div>
<div class="hero-in">
<div>
<div class="h-tag"><span>Transparent</span><span>Efficient</span><span>Verified</span></div>
<h1>Autograph <em>2.0</em></h1>
<div class="h-suite"><span class="big">01</span><h2>BHK<span>Premium Suites</span></h2></div>
<p class="h-desc">Each one bedroom apartment covers 694 sq/ft with premium finishes and smart-home automation throughout.</p>
<ul class="h-feats">
<li>Master Bedroom</li><li>Attached Bathroom</li>
<li>Spacious Lounge</li><li>Modern Kitchen</li>
<li>Powder Room</li><li>Private Balcony</li>
</ul>
<a href="#book" class="btn-book">Book Now</a>
</div>
<div style="position:relative">
<div class="h-card">
<div class="hc-top"><span>Floor Plan — 1 BHK</span><span class="hc-badge">694 sq/ft</span></div>
<div class="hc-img"><img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=450&fit=crop" alt="Interior"></div>
<div class="hc-grid">
<div class="hc-cell"><b>14' x 11'</b><small>Bedroom</small></div>
<div class="hc-cell"><b>8' x 7'6"</b><small>Bathroom</small></div>
<div class="hc-cell"><b>13' x 10'</b><small>Lounge</small></div>
<div class="hc-cell"><b>9'6" x 6'</b><small>Kitchen</small></div>
</div>
</div>
<div class="h-pills"><div class="h-pill">💳</div><div class="h-pill">📐</div><div class="h-pill">📋</div></div>
</div>
</div>
</section>

<div class="stats"><div class="stats-in">
<div class="st"><b>3.5 Yr</b><span>Payment Plan</span></div>
<div class="st"><b>5%</b><span>Booking Only</span></div>
<div class="st"><b>694+</b><span>Sq/ft Starting</span></div>
<div class="st"><b>100%</b><span>Govt Approved</span></div>
</div></div>

<section class="suites" id="suites">
<div class="sh"><div class="ey">Residences</div><h2>Choose Your Suite</h2><p>Premium, Platinum &amp; Royal — crafted for modern living</p></div>
<div class="s-grid">
<div class="s-card">
<div class="s-img"><img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=380&fit=crop" alt="1 BHK"></div>
<div class="s-body"><div class="s-head"><span class="n">1</span><h3>BHK Premium</h3></div><div class="s-area">694 sq/ft covered area</div>
<div class="s-tags"><span>Bedroom</span><span>Bath</span><span>Lounge</span><span>Kitchen</span><span>Balcony</span></div>
<div class="s-foot"><span class="pr">$85,000 <small>starting</small></span><span class="badge-av red">Sold Out</span></div></div>
</div>
<div class="s-card">
<div class="s-img"><img src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=380&fit=crop" alt="2 BHK"></div>
<div class="s-body"><div class="s-head"><span class="n">2</span><h3>BHK Platinum</h3></div><div class="s-area">1,100 sq/ft covered area</div>
<div class="s-tags"><span>2 Beds</span><span>2 Baths</span><span>Lounge</span><span>Kitchen</span><span>Balcony</span></div>
<div class="s-foot"><span class="pr">$140,000 <small>starting</small></span><span class="badge-av amber">Few Left</span></div></div>
</div>
<div class="s-card">
<div class="s-img"><img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=380&fit=crop" alt="3 BHK"></div>
<div class="s-body"><div class="s-head"><span class="n">3</span><h3>BHK Royal</h3></div><div class="s-area">1,650 sq/ft covered area</div>
<div class="s-tags"><span>3 Beds</span><span>3 Baths</span><span>Lounge</span><span>Kitchen</span><span>2 Balconies</span></div>
<div class="s-foot"><span class="pr">$210,000 <small>starting</small></span><span class="badge-av green">Available</span></div></div>
</div>
</div>
</section>

<section class="amen" id="amen">
<div class="amen-in">
<div class="sh"><div class="ey">Amenities</div><h2>World-Class Living</h2><p>Smart automated building with premium lifestyle features</p></div>
<div class="a-grid">
<div class="a-item"><div class="ai">🏊</div><h4>Infinity Pool</h4><p>Rooftop pool with city views</p></div>
<div class="a-item"><div class="ai">💪</div><h4>Fitness Center</h4><p>Fully equipped modern gym</p></div>
<div class="a-item"><div class="ai">🏡</div><h4>Sky Garden</h4><p>Landscaped terraces &amp; BBQ</p></div>
<div class="a-item"><div class="ai">🔒</div><h4>24/7 Security</h4><p>Biometric &amp; CCTV access</p></div>
<div class="a-item"><div class="ai">🅿️</div><h4>Parking</h4><p>Dedicated covered spaces</p></div>
<div class="a-item"><div class="ai">⚡</div><h4>Smart Home</h4><p>Automated lighting &amp; AC</p></div>
<div class="a-item"><div class="ai">🎮</div><h4>Recreation</h4><p>Gaming &amp; entertainment lounge</p></div>
<div class="a-item"><div class="ai">🛎️</div><h4>Concierge</h4><p>24/7 front desk service</p></div>
</div>
</div>
</section>

<section class="book" id="book">
<div class="book-in">
<div class="ey" style="text-align:center;margin-bottom:.6rem">Booking Inquiry</div>
<h2>Reserve Your Suite</h2>
<p>Secure your apartment today — only 5% down payment.</p>
<form class="bf" onsubmit="event.preventDefault()">
<input type="text" placeholder="Full Name" required>
<input type="tel" placeholder="Phone Number" required>
<input type="email" placeholder="Email Address" class="full" required>
<select><option>Select Suite Type</option><option>1 BHK Premium</option><option>2 BHK Platinum</option><option>3 BHK Royal</option><option>Penthouse</option></select>
<select><option>Payment Plan</option><option>Full Payment</option><option>1 Year</option><option>2 Year</option><option>3.5 Year</option></select>
<button type="submit">Submit Inquiry</button>
</form>
</div>
</section>

<footer>
<div class="fl">Autograph 2.0</div>
<div class="flinks"><a href="#">Residences</a><a href="#">Amenities</a><a href="#">Gallery</a><a href="#">Contact</a></div>
<div class="fc">&copy; 2026 Autograph Serviced Apartments</div>
</footer>

<a href="#" class="wa"><svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.339 0-4.508-.767-6.258-2.064l-.438-.335-3.102 1.04 1.04-3.102-.335-.438A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg></a>

</body>
</html>`,
  },
];
