interface T {
  name: string; primary: string; secondary: string; accent: string;
  dark: string; darkAlt: string; text: string; light: string;
}

export const scrollJS = `<script>
document.addEventListener('DOMContentLoaded',()=>{
const io=new IntersectionObserver((es)=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}})},{threshold:.15,rootMargin:'0px 0px -60px 0px'});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
document.querySelectorAll('[data-count]').forEach(el=>{
const io2=new IntersectionObserver((es)=>{es.forEach(e=>{if(e.isIntersecting){const t=+el.dataset.count,s=el.dataset.suffix||'';let c=0;const step=Math.max(1,Math.floor(t/50));const iv=setInterval(()=>{c+=step;if(c>=t){el.textContent=t+s;clearInterval(iv)}else el.textContent=c+s},25);io2.unobserve(el)}})},{threshold:.5});
io2.observe(el)});
});
<\/script>`;

export const revealCSS = `
.reveal{opacity:0;transform:translateY(40px);transition:opacity .7s ease,transform .7s ease}
.reveal.visible{opacity:1;transform:translateY(0)}
.reveal.delay-1{transition-delay:.1s}.reveal.delay-2{transition-delay:.2s}.reveal.delay-3{transition-delay:.3s}.reveal.delay-4{transition-delay:.4s}
`;

export const IMG = {
  dash1: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop",
  dash2: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop",
  team: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop",
  office: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
  code: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
  server: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
  banner: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&h=500&fit=crop",
  banner2: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1400&h=500&fit=crop",
};

export function premiumDarkCSS(t: T) {
  return `
.full-banner{position:relative;overflow:hidden}
.full-banner img{width:100%;height:450px;object-fit:cover;display:block}
.full-banner .bo{position:absolute;inset:0;background:linear-gradient(180deg,${t.dark}ee 0%,transparent 35%,transparent 65%,${t.dark}ee 100%);display:flex;align-items:center;justify-content:center;text-align:center;padding:2rem}
.full-banner .bo h2{font-size:2.2rem;font-weight:800;color:#fff;margin-bottom:.4rem;letter-spacing:-.5px}
.full-banner .bo p{font-size:1rem;opacity:.55;max-width:460px;margin:0 auto}
.pg{padding:6rem 5%;max-width:1100px;margin:0 auto}
.pg-head{text-align:center;margin-bottom:2.5rem}
.pg-head h2{font-size:2rem;font-weight:800;color:#fff;margin-bottom:.4rem}
.pg-head p{opacity:.4;max-width:480px;margin:0 auto}
.pg-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem}
.pg-grid .gi{position:relative;border-radius:14px;overflow:hidden;aspect-ratio:3/2}
.pg-grid .gi img{width:100%;height:100%;object-fit:cover;transition:transform .5s}
.pg-grid .gi:hover img{transform:scale(1.06)}
.pg-grid .gi .gl{position:absolute;bottom:0;left:0;right:0;padding:.8rem 1rem;background:linear-gradient(transparent,rgba(0,0,0,.7));font-size:.75rem;font-weight:600;color:#fff}
.pg-grid .gi.gw{grid-column:span 2;aspect-ratio:2/1}
.cs{padding:6rem 5%;border-top:1px solid rgba(255,255,255,.04)}
.cs-inner{max-width:1000px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:2.5rem;align-items:start}
.cs-info h2{font-size:1.8rem;font-weight:800;color:#fff;margin-bottom:.8rem}
.cs-info>p{opacity:.4;margin-bottom:1.5rem;line-height:1.7}
.cd{display:flex;align-items:flex-start;gap:.8rem;margin-bottom:1.2rem}
.cd .ci{width:40px;height:40px;border-radius:10px;background:${t.primary}15;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:1rem}
.cd .cl{font-size:.65rem;opacity:.35;text-transform:uppercase;letter-spacing:1px;margin-bottom:.15rem}
.cd .cv{font-size:.85rem;color:#fff;font-weight:500}
.cs-form{background:${t.darkAlt};border:1px solid rgba(255,255,255,.06);border-radius:18px;padding:2rem}
.cs-form h3{font-size:1.1rem;font-weight:700;color:#fff;margin-bottom:1.2rem}
.cfr{display:grid;grid-template-columns:1fr 1fr;gap:.8rem;margin-bottom:.8rem}
.cfi{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:10px;padding:.75rem .9rem;color:#fff;font-size:.82rem;font-family:inherit;outline:none;width:100%;transition:.3s}
.cfi:focus{border-color:${t.primary}}.cfi::placeholder{color:rgba(255,255,255,.2)}
textarea.cfi{min-height:100px;resize:vertical;margin-bottom:.8rem}
.cfb{width:100%;background:linear-gradient(135deg,${t.primary},${t.secondary});color:#fff;padding:.85rem;border-radius:10px;font-weight:700;font-size:.88rem;border:none;cursor:pointer;transition:.3s}
.cfb:hover{box-shadow:0 12px 35px ${t.primary}40;transform:translateY(-2px)}
@media(max-width:768px){.pg-grid{grid-template-columns:1fr}.pg-grid .gi.gw{grid-column:auto}.cs-inner{grid-template-columns:1fr}.cfr{grid-template-columns:1fr}}
`;
}

export function premiumDarkHTML(_t: T) {
  return `
<section class="full-banner reveal"><img src="${IMG.banner}" alt=""><div class="bo"><h2>See it in action</h2><p>Trusted by teams worldwide to build, ship, and scale.</p></div></section>
<section class="pg">
<div class="pg-head reveal"><h2>Behind the scenes</h2><p>Our team, workspace, and the craft behind everything we build.</p></div>
<div class="pg-grid">
<div class="gi gw reveal"><img src="${IMG.team}" alt=""><div class="gl">Our Team</div></div>
<div class="gi reveal delay-1"><img src="${IMG.code}" alt=""><div class="gl">Code Culture</div></div>
<div class="gi reveal delay-2"><img src="${IMG.server}" alt=""><div class="gl">Infrastructure</div></div>
<div class="gi reveal delay-3"><img src="${IMG.office}" alt=""><div class="gl">Headquarters</div></div>
<div class="gi gw reveal delay-4"><img src="${IMG.banner2}" alt=""><div class="gl">Collaboration</div></div>
</div></section>
<section class="full-banner reveal"><img src="${IMG.dash2}" alt=""><div class="bo"><h2>Powerful analytics</h2><p>Real-time insights that drive smarter decisions, faster.</p></div></section>
<section class="cs"><div class="cs-inner">
<div class="cs-info reveal"><h2>Get in touch</h2><p>Questions about our platform? We're here to help find the right solution.</p>
<div class="cd"><div class="ci">📍</div><div><div class="cl">Office</div><div class="cv">548 Market St, San Francisco, CA</div></div></div>
<div class="cd"><div class="ci">✉️</div><div><div class="cl">Email</div><div class="cv">hello@company.com</div></div></div>
<div class="cd"><div class="ci">📞</div><div><div class="cl">Phone</div><div class="cv">+1 (415) 555-0120</div></div></div></div>
<div class="cs-form reveal delay-1"><h3>Send a message</h3>
<div class="cfr"><input class="cfi" placeholder="Name"><input class="cfi" placeholder="Email"></div>
<textarea class="cfi" placeholder="How can we help?"></textarea>
<button class="cfb">Send Message →</button></div>
</div></section>
`;
}

export function premiumLightCSS(t: T) {
  return `
.full-banner{position:relative;overflow:hidden}
.full-banner img{width:100%;height:450px;object-fit:cover;display:block}
.full-banner .bo{position:absolute;inset:0;background:linear-gradient(180deg,rgba(255,255,255,.92) 0%,transparent 35%,transparent 65%,rgba(255,255,255,.92) 100%);display:flex;align-items:center;justify-content:center;text-align:center;padding:2rem}
.full-banner .bo h2{font-size:2.2rem;font-weight:800;color:#1a1a2e;margin-bottom:.4rem;letter-spacing:-.5px}
.full-banner .bo p{font-size:1rem;color:#666;max-width:460px;margin:0 auto}
.pg{padding:6rem 5%;max-width:1100px;margin:0 auto}
.pg-head{text-align:center;margin-bottom:2.5rem}
.pg-head h2{font-size:2rem;font-weight:800;color:#1a1a2e;margin-bottom:.4rem}
.pg-head p{color:#888;max-width:480px;margin:0 auto}
.pg-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem}
.pg-grid .gi{position:relative;border-radius:14px;overflow:hidden;aspect-ratio:3/2;box-shadow:0 4px 20px rgba(0,0,0,.08)}
.pg-grid .gi img{width:100%;height:100%;object-fit:cover;transition:transform .5s}
.pg-grid .gi:hover img{transform:scale(1.06)}
.pg-grid .gi .gl{position:absolute;bottom:0;left:0;right:0;padding:.8rem 1rem;background:linear-gradient(transparent,rgba(0,0,0,.6));font-size:.75rem;font-weight:600;color:#fff}
.pg-grid .gi.gw{grid-column:span 2;aspect-ratio:2/1}
.cs{padding:6rem 5%;background:#fff;border-top:1px solid rgba(0,0,0,.04)}
.cs-inner{max-width:1000px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:2.5rem;align-items:start}
.cs-info h2{font-size:1.8rem;font-weight:800;color:#1a1a2e;margin-bottom:.8rem}
.cs-info>p{color:#888;margin-bottom:1.5rem;line-height:1.7}
.cd{display:flex;align-items:flex-start;gap:.8rem;margin-bottom:1.2rem}
.cd .ci{width:40px;height:40px;border-radius:10px;background:${t.primary}12;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:1rem}
.cd .cl{font-size:.65rem;color:#999;text-transform:uppercase;letter-spacing:1px;margin-bottom:.15rem}
.cd .cv{font-size:.85rem;color:#1a1a2e;font-weight:500}
.cs-form{background:${t.light};border:1px solid rgba(0,0,0,.06);border-radius:18px;padding:2rem}
.cs-form h3{font-size:1.1rem;font-weight:700;color:#1a1a2e;margin-bottom:1.2rem}
.cfr{display:grid;grid-template-columns:1fr 1fr;gap:.8rem;margin-bottom:.8rem}
.cfi{background:#fff;border:1px solid rgba(0,0,0,.1);border-radius:10px;padding:.75rem .9rem;color:#1a1a2e;font-size:.82rem;font-family:inherit;outline:none;width:100%;transition:.3s}
.cfi:focus{border-color:${t.primary}}.cfi::placeholder{color:#bbb}
textarea.cfi{min-height:100px;resize:vertical;margin-bottom:.8rem}
.cfb{width:100%;background:${t.primary};color:#fff;padding:.85rem;border-radius:10px;font-weight:700;font-size:.88rem;border:none;cursor:pointer;transition:.3s}
.cfb:hover{box-shadow:0 12px 35px ${t.primary}30;transform:translateY(-2px)}
@media(max-width:768px){.pg-grid{grid-template-columns:1fr}.pg-grid .gi.gw{grid-column:auto}.cs-inner{grid-template-columns:1fr}.cfr{grid-template-columns:1fr}}
`;
}

export function enhanceDark(html: string, t: T): string {
  const css = premiumDarkCSS(t) + revealCSS;
  const sections = premiumDarkHTML(t);
  html = html.replace('</style>', css + '</style>');
  html = html.replace(/<\/body>/i, sections + scrollJS + '</body>');
  return html;
}

export function enhanceLight(html: string, t: T): string {
  const css = premiumLightCSS(t) + revealCSS;
  const sections = premiumLightHTML(t);
  html = html.replace('</style>', css + '</style>');
  html = html.replace(/<\/body>/i, sections + scrollJS + '</body>');
  return html;
}

export function premiumLightHTML(_t: T) {
  return `
<section class="full-banner reveal"><img src="${IMG.banner}" alt=""><div class="bo"><h2>See it in action</h2><p>Trusted by teams worldwide to build, ship, and scale.</p></div></section>
<section class="pg">
<div class="pg-head reveal"><h2>Behind the scenes</h2><p>Our team, workspace, and the craft behind everything we build.</p></div>
<div class="pg-grid">
<div class="gi gw reveal"><img src="${IMG.team}" alt=""><div class="gl">Our Team</div></div>
<div class="gi reveal delay-1"><img src="${IMG.code}" alt=""><div class="gl">Code Culture</div></div>
<div class="gi reveal delay-2"><img src="${IMG.server}" alt=""><div class="gl">Infrastructure</div></div>
<div class="gi reveal delay-3"><img src="${IMG.office}" alt=""><div class="gl">Headquarters</div></div>
<div class="gi gw reveal delay-4"><img src="${IMG.banner2}" alt=""><div class="gl">Collaboration</div></div>
</div></section>
<section class="full-banner reveal"><img src="${IMG.dash2}" alt=""><div class="bo"><h2>Powerful analytics</h2><p>Real-time insights that drive smarter decisions, faster.</p></div></section>
<section class="cs"><div class="cs-inner">
<div class="cs-info reveal"><h2>Get in touch</h2><p>Questions about our platform? We're here to help find the right solution.</p>
<div class="cd"><div class="ci">📍</div><div><div class="cl">Office</div><div class="cv">548 Market St, San Francisco, CA</div></div></div>
<div class="cd"><div class="ci">✉️</div><div><div class="cl">Email</div><div class="cv">hello@company.com</div></div></div>
<div class="cd"><div class="ci">📞</div><div><div class="cl">Phone</div><div class="cv">+1 (415) 555-0120</div></div></div></div>
<div class="cs-form reveal delay-1"><h3>Send a message</h3>
<div class="cfr"><input class="cfi" placeholder="Name"><input class="cfi" placeholder="Email"></div>
<textarea class="cfi" placeholder="How can we help?"></textarea>
<button class="cfb">Send Message →</button></div>
</div></section>
`;
}
