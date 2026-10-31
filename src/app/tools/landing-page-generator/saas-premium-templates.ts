interface T {
  name: string; primary: string; secondary: string; accent: string;
  dark: string; darkAlt: string; text: string; light: string;
}
const scrollJS = `<script>
document.addEventListener('DOMContentLoaded',()=>{
const io=new IntersectionObserver((es)=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}})},{threshold:.15,rootMargin:'0px 0px -60px 0px'});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
document.querySelectorAll('[data-count]').forEach(el=>{
const io2=new IntersectionObserver((es)=>{es.forEach(e=>{if(e.isIntersecting){const t=+el.dataset.count,s=el.dataset.suffix||'';let c=0;const step=Math.max(1,Math.floor(t/50));const iv=setInterval(()=>{c+=step;if(c>=t){el.textContent=t+s;clearInterval(iv)}else el.textContent=c+s},25);io2.unobserve(el)}})},{threshold:.5});
io2.observe(el)});
});
<\/script>`;
// Shared reveal CSS
const revealCSS = `
.reveal{opacity:0;transform:translateY(40px);transition:opacity .7s ease,transform .7s ease}
.reveal.visible{opacity:1;transform:translateY(0)}
.reveal.delay-1{transition-delay:.1s}.reveal.delay-2{transition-delay:.2s}.reveal.delay-3{transition-delay:.3s}.reveal.delay-4{transition-delay:.4s}
`;
const IMG = {
  dash1: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop",
  dash2: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop",
  team: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop",
  team2: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop",
  office: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
  office2: "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=600&h=400&fit=crop",
  code: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
  server: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
  meeting: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&h=400&fit=crop",
  laptop: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
  banner: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&h=500&fit=crop",
  banner2: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1400&h=500&fit=crop",
};
function darkSections(t: T) {
  return `
<style>
.full-banner{position:relative;overflow:hidden;margin:0}.full-banner img{width:100%;height:500px;object-fit:cover;display:block}
.full-banner .banner-overlay{position:absolute;inset:0;background:linear-gradient(180deg,${t.dark}dd 0%,transparent 40%,transparent 60%,${t.dark}dd 100%);display:flex;align-items:center;justify-content:center;text-align:center;padding:2rem}
.full-banner .banner-text h2{font-size:2.5rem;font-weight:800;color:#fff;margin-bottom:.5rem;letter-spacing:-1px}
.full-banner .banner-text p{font-size:1.1rem;opacity:.6;max-width:500px;margin:0 auto}.gallery{padding:7rem 5%;max-width:1200px;margin:0 auto}
.gallery-head{text-align:center;margin-bottom:3rem}.gallery-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem}
.gallery-grid .g-item{position:relative;border-radius:16px;overflow:hidden;aspect-ratio:3/2}
.gallery-grid .g-item img{width:100%;height:100%;object-fit:cover;transition:transform .5s}.gallery-grid .g-item:hover img{transform:scale(1.05)}
.gallery-grid .g-item .g-label{position:absolute;bottom:0;left:0;right:0;padding:1rem 1.2rem;background:linear-gradient(transparent,rgba(0,0,0,.7));font-size:.8rem;font-weight:600;color:#fff}
.gallery-grid .g-item.g-wide{grid-column:span 2;aspect-ratio:2/1}.contact-section{padding:7rem 5%;border-top:1px solid rgba(255,255,255,.04)}
.contact-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:start}
.contact-info h2{font-size:2rem;font-weight:800;color:#fff;margin-bottom:1rem;letter-spacing:-.5px}.contact-info>p{opacity:.45;margin-bottom:2rem;line-height:1.7}
.contact-detail{display:flex;align-items:flex-start;gap:1rem;margin-bottom:1.5rem}
.contact-detail .cd-icon{width:44px;height:44px;border-radius:12px;background:${t.primary}15;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:1.1rem}
.contact-detail .cd-text .cd-label{font-size:.7rem;opacity:.4;text-transform:uppercase;letter-spacing:1px;margin-bottom:.2rem}
.contact-detail .cd-text .cd-value{font-size:.9rem;color:#fff;font-weight:500}
.contact-form{background:${t.darkAlt};border:1px solid rgba(255,255,255,.06);border-radius:20px;padding:2.5rem}
.contact-form h3{font-size:1.2rem;font-weight:700;color:#fff;margin-bottom:1.5rem}.cf-row{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem}
.cf-input{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:.85rem 1rem;color:#fff;font-size:.88rem;font-family:inherit;outline:none;width:100%;transition:.3s}
.cf-input:focus{border-color:${t.primary}}.cf-input::placeholder{color:rgba(255,255,255,.25)}textarea.cf-input{min-height:120px;resize:vertical;margin-bottom:1rem}
.cf-btn{width:100%;background:linear-gradient(135deg,${t.primary},${t.secondary});color:#fff;padding:1rem;border-radius:12px;font-weight:700;font-size:.95rem;border:none;cursor:pointer;transition:.3s}
.cf-btn:hover{box-shadow:0 15px 40px ${t.primary}40;transform:translateY(-2px)}.social-row{display:flex;gap:1rem;margin-top:2rem}
.social-row a{width:42px;height:42px;border-radius:12px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;transition:.3s;font-size:.9rem}
.social-row a:hover{background:${t.primary}20;border-color:${t.primary}40}
@media(max-width:768px){.gallery-grid{grid-template-columns:1fr}.gallery-grid .g-item.g-wide{grid-column:auto}.contact-inner{grid-template-columns:1fr}.cf-row{grid-template-columns:1fr}}
</style>
<!-- Full-Width Product Banner -->
<section class="full-banner reveal">
<img src="${IMG.banner}" alt="Platform overview">
<div class="banner-overlay"><div class="banner-text"><h2>See the platform in action</h2><p>Powering teams from startups to Fortune 500 companies worldwide.</p></div></div>
</section>
<!-- Photo Gallery -->
<section class="gallery">
<div class="gallery-head">
<div class="section-tag reveal">Gallery</div>
<h2 class="section-title reveal" style="text-align:center">Behind the scenes</h2>
<p class="section-sub reveal" style="text-align:center;margin-left:auto;margin-right:auto">Meet the team, see our workspace, and explore how we build world-class products.</p>
</div>
<div class="gallery-grid">
<div class="g-item g-wide reveal"><img src="${IMG.team}" alt="Our team"><div class="g-label">Our Engineering Team</div></div>
<div class="g-item reveal delay-1"><img src="${IMG.code}" alt="Code"><div class="g-label">Clean Code Culture</div></div>
<div class="g-item reveal delay-2"><img src="${IMG.server}" alt="Infrastructure"><div class="g-label">Global Infrastructure</div></div>
<div class="g-item reveal delay-3"><img src="${IMG.office}" alt="Office"><div class="g-label">HQ Office</div></div>
<div class="g-item g-wide reveal delay-4"><img src="${IMG.banner2}" alt="Team working"><div class="g-label">Collaboration at Scale</div></div>
</div>
</section>
<!-- Full-Width Dashboard Banner -->
<section class="full-banner reveal">
<img src="${IMG.dash2}" alt="Analytics dashboard">
<div class="banner-overlay"><div class="banner-text"><h2>Powerful analytics, zero complexity</h2><p>Real-time insights that drive better decisions, faster.</p></div></div>
</section>
<!-- Contact Section -->
<section class="contact-section">
<div class="contact-inner">
<div class="contact-info reveal">
<h2>Get in touch</h2>
<p>Have questions about our platform? Our team is here to help you find the right solution for your needs.</p>
<div class="contact-detail"><div class="cd-icon">📍</div><div class="cd-text"><div class="cd-label">Headquarters</div><div class="cd-value">548 Market St, Suite 100<br>San Francisco, CA 94104</div></div></div>
<div class="contact-detail"><div class="cd-icon">✉️</div><div class="cd-text"><div class="cd-label">Email</div><div class="cd-value">hello@company.com</div></div></div>
<div class="contact-detail"><div class="cd-icon">📞</div><div class="cd-text"><div class="cd-label">Phone</div><div class="cd-value">+1 (415) 555-0120</div></div></div>
<div class="social-row">
<a href="#" aria-label="Twitter">𝕏</a>
<a href="#" aria-label="LinkedIn">in</a>
<a href="#" aria-label="GitHub">GH</a>
<a href="#" aria-label="YouTube">▶</a>
</div>
</div>
<div class="contact-form reveal delay-1">
<h3>Send us a message</h3>
<div class="cf-row"><input class="cf-input" placeholder="First name"><input class="cf-input" placeholder="Last name"></div>
<div class="cf-row"><input class="cf-input" placeholder="Work email"><input class="cf-input" placeholder="Company"></div>
<textarea class="cf-input" placeholder="How can we help you?"></textarea>
<button class="cf-btn">Send Message →</button>
</div>
</div>
</section>
`;
}
function lightSections(t: T) {
  return `
<style>
.full-banner{position:relative;overflow:hidden;margin:0}.full-banner img{width:100%;height:500px;object-fit:cover;display:block}
.full-banner .banner-overlay{position:absolute;inset:0;background:linear-gradient(180deg,rgba(255,255,255,.9) 0%,transparent 40%,transparent 60%,rgba(255,255,255,.9) 100%);display:flex;align-items:center;justify-content:center;text-align:center;padding:2rem}
.full-banner .banner-text h2{font-size:2.5rem;font-weight:800;color:#1a1a2e;margin-bottom:.5rem;letter-spacing:-1px}
.full-banner .banner-text p{font-size:1.1rem;color:#666;max-width:500px;margin:0 auto}.gallery{padding:7rem 5%;max-width:1100px;margin:0 auto}
.gallery-head{text-align:center;margin-bottom:3rem}.gallery-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem}
.gallery-grid .g-item{position:relative;border-radius:16px;overflow:hidden;aspect-ratio:3/2;box-shadow:0 4px 20px rgba(0,0,0,.08)}
.gallery-grid .g-item img{width:100%;height:100%;object-fit:cover;transition:transform .5s}.gallery-grid .g-item:hover img{transform:scale(1.05)}
.gallery-grid .g-item .g-label{position:absolute;bottom:0;left:0;right:0;padding:1rem 1.2rem;background:linear-gradient(transparent,rgba(0,0,0,.6));font-size:.8rem;font-weight:600;color:#fff}
.gallery-grid .g-item.g-wide{grid-column:span 2;aspect-ratio:2/1}.contact-section{padding:7rem 5%;background:#fff;border-top:1px solid rgba(0,0,0,.04)}
.contact-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:start}
.contact-info h2{font-size:2rem;font-weight:800;color:#1a1a2e;margin-bottom:1rem;letter-spacing:-.5px}.contact-info>p{color:#888;margin-bottom:2rem;line-height:1.7}
.contact-detail{display:flex;align-items:flex-start;gap:1rem;margin-bottom:1.5rem}
.contact-detail .cd-icon{width:44px;height:44px;border-radius:12px;background:${t.primary}12;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:1.1rem}
.contact-detail .cd-text .cd-label{font-size:.7rem;color:#999;text-transform:uppercase;letter-spacing:1px;margin-bottom:.2rem}
.contact-detail .cd-text .cd-value{font-size:.9rem;color:#1a1a2e;font-weight:500}
.contact-form{background:${t.light};border:1px solid rgba(0,0,0,.06);border-radius:20px;padding:2.5rem}
.contact-form h3{font-size:1.2rem;font-weight:700;color:#1a1a2e;margin-bottom:1.5rem}.cf-row{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem}
.cf-input{background:#fff;border:1px solid rgba(0,0,0,.1);border-radius:12px;padding:.85rem 1rem;color:#1a1a2e;font-size:.88rem;font-family:inherit;outline:none;width:100%;transition:.3s}
.cf-input:focus{border-color:${t.primary}}.cf-input::placeholder{color:#bbb}textarea.cf-input{min-height:120px;resize:vertical;margin-bottom:1rem}
.cf-btn{width:100%;background:${t.primary};color:#fff;padding:1rem;border-radius:12px;font-weight:700;font-size:.95rem;border:none;cursor:pointer;transition:.3s}
.cf-btn:hover{box-shadow:0 15px 40px ${t.primary}30;transform:translateY(-2px)}.social-row{display:flex;gap:1rem;margin-top:2rem}
.social-row a{width:42px;height:42px;border-radius:12px;background:${t.primary}08;border:1px solid rgba(0,0,0,.06);display:flex;align-items:center;justify-content:center;transition:.3s;font-size:.9rem;color:#666}
.social-row a:hover{background:${t.primary}15;border-color:${t.primary}30;color:${t.primary}}
@media(max-width:768px){.gallery-grid{grid-template-columns:1fr}.gallery-grid .g-item.g-wide{grid-column:auto}.contact-inner{grid-template-columns:1fr}.cf-row{grid-template-columns:1fr}}
</style>
<!-- Full-Width Product Banner -->
<section class="full-banner reveal">
<img src="${IMG.banner}" alt="Platform overview">
<div class="banner-overlay"><div class="banner-text"><h2>See the platform in action</h2><p>Powering teams from startups to Fortune 500 companies worldwide.</p></div></div>
</section>
<!-- Photo Gallery -->
<section class="gallery">
<div class="gallery-head">
<div class="sect-badge reveal">Gallery</div>
<h2 class="sect-title reveal" style="text-align:center">Behind the scenes</h2>
<p class="sect-sub reveal" style="text-align:center;margin-left:auto;margin-right:auto">Meet the team, see our workspace, and explore how we build world-class products.</p>
</div>
<div class="gallery-grid">
<div class="g-item g-wide reveal"><img src="${IMG.team}" alt="Our team"><div class="g-label">Our Engineering Team</div></div>
<div class="g-item reveal delay-1"><img src="${IMG.code}" alt="Code"><div class="g-label">Clean Code Culture</div></div>
<div class="g-item reveal delay-2"><img src="${IMG.server}" alt="Infrastructure"><div class="g-label">Global Infrastructure</div></div>
<div class="g-item reveal delay-3"><img src="${IMG.office}" alt="Office"><div class="g-label">HQ Office</div></div>
<div class="g-item g-wide reveal delay-4"><img src="${IMG.banner2}" alt="Team working"><div class="g-label">Collaboration at Scale</div></div>
</div>
</section>
<!-- Full-Width Dashboard Banner -->
<section class="full-banner reveal">
<img src="${IMG.dash2}" alt="Analytics dashboard">
<div class="banner-overlay"><div class="banner-text"><h2>Powerful analytics, zero complexity</h2><p>Real-time insights that drive better decisions, faster.</p></div></div>
</section>
<!-- Contact Section -->
<section class="contact-section">
<div class="contact-inner">
<div class="contact-info reveal">
<h2>Get in touch</h2>
<p>Have questions about our platform? Our team is here to help you find the right solution for your needs.</p>
<div class="contact-detail"><div class="cd-icon">📍</div><div class="cd-text"><div class="cd-label">Headquarters</div><div class="cd-value">548 Market St, Suite 100<br>San Francisco, CA 94104</div></div></div>
<div class="contact-detail"><div class="cd-icon">✉️</div><div class="cd-text"><div class="cd-label">Email</div><div class="cd-value">hello@company.com</div></div></div>
<div class="contact-detail"><div class="cd-icon">📞</div><div class="cd-text"><div class="cd-label">Phone</div><div class="cd-value">+1 (415) 555-0120</div></div></div>
<div class="social-row">
<a href="#" aria-label="Twitter">𝕏</a>
<a href="#" aria-label="LinkedIn">in</a>
<a href="#" aria-label="GitHub">GH</a>
<a href="#" aria-label="YouTube">▶</a>
</div>
</div>
<div class="contact-form reveal delay-1">
<h3>Send us a message</h3>
<div class="cf-row"><input class="cf-input" placeholder="First name"><input class="cf-input" placeholder="Last name"></div>
<div class="cf-row"><input class="cf-input" placeholder="Work email"><input class="cf-input" placeholder="Company"></div>
<textarea class="cf-input" placeholder="How can we help you?"></textarea>
<button class="cf-btn">Send Message →</button>
</div>
</div>
</section>
`;
}
export const saasPremiumTemplates = [
{
  id: "saas-aurora-ai",
  name: "Aurora — AI Platform",
  category: "Tech / SaaS",
  description: "Gradient mesh hero, floating dashboard mockup with parallax, animated counters, scroll reveals, pricing toggle, testimonial cards, micro-interactions.",
  thumb: "🌌",
  getCode: (t: T) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Aurora AI</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:${t.dark};color:${t.text};overflow-x:hidden}a{text-decoration:none;color:inherit}
${revealCSS}
nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:1.2rem 5%;display:flex;align-items:center;justify-content:space-between;backdrop-filter:blur(20px);background:${t.dark}cc;border-bottom:1px solid rgba(255,255,255,.06);transition:all .3s}
.logo{font-size:1.4rem;font-weight:800;color:#fff;letter-spacing:-.5px}.logo span{color:${t.primary}}nav ul{list-style:none;display:flex;gap:2rem}
nav ul a{font-size:.85rem;font-weight:500;opacity:.6;transition:.3s}nav ul a:hover{opacity:1;color:${t.primary}}
.nav-cta{background:${t.primary};color:#fff;padding:.6rem 1.6rem;border-radius:10px;font-weight:600;font-size:.85rem;transition:.3s;border:none;cursor:pointer}
.nav-cta:hover{box-shadow:0 8px 30px ${t.primary}55;transform:translateY(-2px)}
.hero{min-height:100vh;position:relative;display:flex;align-items:center;padding:8rem 5% 4rem;overflow:hidden}.hero-mesh{position:absolute;inset:0;z-index:0}
.hero-mesh .orb{position:absolute;border-radius:50%;filter:blur(100px);opacity:.3;animation:float 8s ease-in-out infinite}
.orb-1{width:600px;height:600px;background:${t.primary};top:-15%;right:10%;animation-delay:0s}
.orb-2{width:450px;height:450px;background:${t.secondary};bottom:-10%;left:-5%;animation-delay:2s}
.orb-3{width:350px;height:350px;background:${t.accent};top:40%;right:-10%;animation-delay:4s}
.orb-4{width:250px;height:250px;background:${t.primary};top:60%;left:30%;animation-delay:6s;opacity:.15}
@keyframes float{0%,100%{transform:translate(0,0) scale(1)}25%{transform:translate(30px,-20px) scale(1.05)}50%{transform:translate(-20px,30px) scale(.95)}75%{transform:translate(20px,10px) scale(1.02)}}
.hero-inner{max-width:1200px;margin:0 auto;position:relative;z-index:1;width:100%}
.hero-badge{display:inline-flex;align-items:center;gap:.5rem;background:${t.primary}15;border:1px solid ${t.primary}30;padding:.5rem 1.2rem;border-radius:50px;font-size:.75rem;font-weight:600;color:${t.primary};margin-bottom:2rem;letter-spacing:.5px}
.hero-badge .dot{width:6px;height:6px;border-radius:50%;background:${t.primary};animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(1.5)}}
.hero h1{font-size:clamp(2.5rem,5.5vw,4.5rem);font-weight:900;line-height:1.05;color:#fff;margin-bottom:1.5rem;letter-spacing:-2px}
.hero h1 .gradient{background:linear-gradient(135deg,${t.primary},${t.accent});-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero .sub{font-size:1.15rem;line-height:1.8;opacity:.5;max-width:550px;margin-bottom:2.5rem}.hero-actions{display:flex;gap:1rem;flex-wrap:wrap;margin-bottom:3rem}
.btn-primary{background:linear-gradient(135deg,${t.primary},${t.secondary});color:#fff;padding:1rem 2.5rem;border-radius:14px;font-weight:700;font-size:.95rem;border:none;cursor:pointer;transition:.3s;display:inline-flex;align-items:center;gap:.5rem}
.btn-primary:hover{transform:translateY(-3px);box-shadow:0 20px 50px ${t.primary}40}
.btn-ghost{background:rgba(255,255,255,.05);color:#fff;padding:1rem 2.5rem;border-radius:14px;font-weight:600;font-size:.95rem;border:1px solid rgba(255,255,255,.1);cursor:pointer;transition:.3s;display:inline-flex;align-items:center;gap:.5rem}
.btn-ghost:hover{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.2)}.social-proof{display:flex;align-items:center;gap:1rem}
.avatars{display:flex}.avatars img{width:38px;height:38px;border-radius:50%;border:3px solid ${t.dark};margin-left:-12px;object-fit:cover}.avatars img:first-child{margin-left:0}
.social-proof p{font-size:.85rem;opacity:.5}.social-proof strong{color:#fff;opacity:1}
.hero-visual{margin-top:4rem;position:relative;max-width:1000px;margin-left:auto;margin-right:auto}
.dashboard{background:${t.darkAlt};border:1px solid rgba(255,255,255,.08);border-radius:20px;overflow:hidden;box-shadow:0 40px 80px rgba(0,0,0,.5),0 0 0 1px rgba(255,255,255,.05);transform:perspective(1200px) rotateX(5deg);transition:transform .6s ease}
.dashboard:hover{transform:perspective(1200px) rotateX(0deg)}
.dash-bar{padding:.8rem 1.2rem;background:${t.darkAlt};border-bottom:1px solid rgba(255,255,255,.06);display:flex;align-items:center;gap:.5rem}
.dash-dot{width:10px;height:10px;border-radius:50%;background:rgba(255,255,255,.15)}
.dash-dot:nth-child(1){background:#ff5f57}.dash-dot:nth-child(2){background:#febc2e}.dash-dot:nth-child(3){background:#28c840}
.dash-bar span{margin-left:.8rem;font-size:.7rem;opacity:.3;font-family:monospace}.dash-body{padding:2rem;display:grid;grid-template-columns:1fr 1fr 1fr;gap:1rem}
.dash-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:14px;padding:1.5rem}
.dash-card .label{font-size:.7rem;opacity:.4;text-transform:uppercase;letter-spacing:1px;margin-bottom:.5rem}.dash-card .value{font-size:1.8rem;font-weight:800;color:#fff}
.dash-card .change{font-size:.75rem;color:${t.primary};margin-top:.25rem;font-weight:600}
.dash-chart{grid-column:1/-1;height:120px;background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.06);border-radius:14px;position:relative;overflow:hidden}
.dash-chart svg{width:100%;height:100%}
.float-badge{position:absolute;z-index:2;background:${t.darkAlt}ee;backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:.8rem 1.2rem;display:flex;align-items:center;gap:.6rem;box-shadow:0 20px 50px rgba(0,0,0,.4);animation:bob 4s ease-in-out infinite}
.float-badge.fb1{top:-20px;right:-30px;animation-delay:0s}.float-badge.fb2{bottom:40px;left:-40px;animation-delay:2s}
@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
.float-badge .fi{width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,${t.primary}30,${t.secondary}20);display:flex;align-items:center;justify-content:center;font-size:.9rem}
.float-badge span{font-weight:700;color:#fff;font-size:.85rem}.float-badge small{display:block;font-size:.65rem;opacity:.5;font-weight:400}
.stats{padding:5rem 5%;border-top:1px solid rgba(255,255,255,.04);border-bottom:1px solid rgba(255,255,255,.04);background:${t.darkAlt}}
.stats-grid{max-width:1000px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:2rem;text-align:center}
.stat .num{font-size:3rem;font-weight:900;background:linear-gradient(135deg,${t.primary},${t.accent});-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.stat .lbl{font-size:.85rem;opacity:.4;margin-top:.3rem}.features{padding:7rem 5%;max-width:1200px;margin:0 auto}
.section-tag{display:inline-block;background:${t.primary}15;color:${t.primary};padding:.45rem 1.2rem;border-radius:50px;font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:1rem;border:1px solid ${t.primary}25}
.section-title{font-size:clamp(2rem,4vw,3rem);font-weight:800;color:#fff;margin-bottom:.5rem;letter-spacing:-1px}
.section-sub{opacity:.45;font-size:1.05rem;margin-bottom:3.5rem;max-width:520px}.feat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem}
.feat{background:${t.darkAlt};border:1px solid rgba(255,255,255,.05);border-radius:20px;padding:2.2rem;transition:all .4s;position:relative;overflow:hidden}
.feat::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,${t.primary},${t.accent});transform:scaleX(0);transition:transform .4s;transform-origin:left}
.feat:hover::before{transform:scaleX(1)}.feat:hover{border-color:${t.primary}30;transform:translateY(-5px);box-shadow:0 20px 40px rgba(0,0,0,.3)}
.feat-icon{width:52px;height:52px;border-radius:14px;background:linear-gradient(135deg,${t.primary}20,${t.secondary}10);display:flex;align-items:center;justify-content:center;margin-bottom:1.2rem;font-size:1.3rem}
.feat h3{font-size:1.1rem;font-weight:700;color:#fff;margin-bottom:.5rem}.feat p{font-size:.88rem;line-height:1.7;opacity:.45}
.pricing{padding:7rem 5%;background:linear-gradient(180deg,${t.dark},${t.darkAlt})}.pricing-head{text-align:center;margin-bottom:3.5rem}
.toggle-wrap{display:flex;align-items:center;justify-content:center;gap:1rem;margin-top:1.5rem}
.toggle-wrap span{font-size:.9rem;opacity:.5}.toggle-wrap span.active{opacity:1;color:#fff;font-weight:600}
.toggle{width:56px;height:30px;border-radius:50px;background:rgba(255,255,255,.1);position:relative;cursor:pointer;transition:.3s;border:none}.toggle.on{background:${t.primary}}
.toggle::after{content:'';position:absolute;top:3px;left:3px;width:24px;height:24px;border-radius:50%;background:#fff;transition:.3s}.toggle.on::after{left:29px}
.plans{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;max-width:1000px;margin:0 auto}
.plan{background:${t.darkAlt};border:1px solid rgba(255,255,255,.06);border-radius:20px;padding:2.5rem;transition:.3s;position:relative}
.plan.featured{border-color:${t.primary}40;box-shadow:0 0 60px ${t.primary}15}
.plan.featured::before{content:'POPULAR';position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,${t.primary},${t.secondary});color:#fff;font-size:.65rem;font-weight:700;padding:.4rem 1.2rem;border-radius:50px;letter-spacing:1px}
.plan-name{font-size:.85rem;font-weight:600;color:${t.primary};text-transform:uppercase;letter-spacing:1px;margin-bottom:.5rem}
.plan-price{font-size:3.5rem;font-weight:900;color:#fff;line-height:1}.plan-price span{font-size:1rem;opacity:.4;font-weight:400}
.plan-desc{font-size:.85rem;opacity:.4;margin:1rem 0 1.5rem}.plan ul{list-style:none;margin-bottom:2rem}
.plan li{font-size:.85rem;padding:.5rem 0;border-bottom:1px solid rgba(255,255,255,.04);display:flex;align-items:center;gap:.5rem;opacity:.6}
.plan li::before{content:'✓';color:${t.primary};font-weight:700;font-size:.75rem}
.plan-btn{width:100%;padding:.9rem;border-radius:12px;font-weight:700;font-size:.9rem;border:none;cursor:pointer;transition:.3s}
.plan-btn.solid{background:linear-gradient(135deg,${t.primary},${t.secondary});color:#fff}.plan-btn.solid:hover{box-shadow:0 15px 40px ${t.primary}40;transform:translateY(-2px)}
.plan-btn.outline{background:transparent;border:1px solid rgba(255,255,255,.15);color:#fff}.plan-btn.outline:hover{border-color:${t.primary};color:${t.primary}}
.testimonials{padding:7rem 5%;max-width:1200px;margin:0 auto}.testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem}
.testi{background:${t.darkAlt};border:1px solid rgba(255,255,255,.05);border-radius:20px;padding:2rem;transition:.3s}
.testi:hover{border-color:${t.primary}20;transform:translateY(-3px)}.testi-stars{display:flex;gap:2px;margin-bottom:1rem}.testi-stars svg{width:16px;height:16px;fill:${t.accent}}
.testi p{font-size:.9rem;line-height:1.8;opacity:.55;margin-bottom:1.5rem;font-style:italic}
.testi-author{display:flex;align-items:center;gap:.8rem;border-top:1px solid rgba(255,255,255,.06);padding-top:1rem}
.testi-author img{width:40px;height:40px;border-radius:50%;object-fit:cover}.testi-author .name{font-size:.85rem;font-weight:600;color:#fff}
.testi-author .role{font-size:.7rem;opacity:.4}.cta{padding:7rem 5%;text-align:center}
.cta-box{max-width:700px;margin:0 auto;background:linear-gradient(135deg,${t.primary}15,${t.secondary}10);border:1px solid ${t.primary}25;border-radius:24px;padding:4rem 3rem;position:relative;overflow:hidden}
.cta-box::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 30% 50%,${t.primary}15,transparent 60%);z-index:0}.cta-box>*{position:relative;z-index:1}
.cta-box h2{font-size:2.5rem;font-weight:800;color:#fff;margin-bottom:1rem;letter-spacing:-1px}
.cta-box p{opacity:.5;margin-bottom:2rem;max-width:450px;margin-left:auto;margin-right:auto}
footer{padding:3rem 5%;border-top:1px solid rgba(255,255,255,.06);text-align:center;font-size:.8rem;opacity:.3}@media(max-width:768px){
nav ul{display:none}.hero h1{font-size:2.5rem}.hero-inner{padding-top:2rem}.dash-body{grid-template-columns:1fr}.stats-grid{grid-template-columns:repeat(2,1fr)}
.feat-grid,.plans,.testi-grid{grid-template-columns:1fr}.plan.featured{order:-1}}
</style>
</head>
<body>
<nav>
<div class="logo">Aurora<span>AI</span></div>
<ul><a href="#features">Features</a><a href="#pricing">Pricing</a><a href="#testimonials">Reviews</a><a href="#">Docs</a></ul>
<button class="nav-cta">Start Free →</button>
</nav>
<section class="hero">
<div class="hero-mesh"><div class="orb orb-1"></div><div class="orb orb-2"></div><div class="orb orb-3"></div><div class="orb orb-4"></div></div>
<div class="hero-inner">
<div class="hero-badge reveal"><span class="dot"></span> Now in public beta — v2.0 released</div>
<h1 class="reveal delay-1">Build smarter with <span class="gradient">AI‑powered</span> intelligence</h1>
<p class="sub reveal delay-2">Ship products 10x faster with Aurora's AI engine. Automate workflows, generate code, and deploy at scale — all from one unified platform.</p>
<div class="hero-actions reveal delay-3">
<button class="btn-primary">Get Started Free <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14m-7-7 7 7-7 7"/></svg></button>
<button class="btn-ghost"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><circle cx="12" cy="12" r="10"/></svg> Watch Demo</button>
</div>
<div class="social-proof reveal delay-4">
<div class="avatars">
<img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop" alt="">
<img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop" alt="">
<img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop" alt="">
<img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop" alt="">
</div>
<p><strong>2,400+</strong> teams already building with Aurora</p>
</div>
<div class="hero-visual reveal">
<div class="dashboard">
<div class="dash-bar"><span class="dash-dot"></span><span class="dash-dot"></span><span class="dash-dot"></span><span>aurora-dashboard.app</span></div>
<div class="dash-body">
<div class="dash-card"><div class="label">Total Revenue</div><div class="value">$48.2K</div><div class="change">↑ 24.5% vs last month</div></div>
<div class="dash-card"><div class="label">Active Users</div><div class="value">12,847</div><div class="change">↑ 18.2% growth</div></div>
<div class="dash-card"><div class="label">API Requests</div><div class="value">2.4M</div><div class="change">↑ 32.1% this week</div></div>
<div class="dash-chart"><svg viewBox="0 0 800 120" preserveAspectRatio="none"><defs><linearGradient id="cg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="${t.primary}" stop-opacity=".3"/><stop offset="100%" stop-color="${t.primary}" stop-opacity="0"/></linearGradient></defs><path d="M0,100 C100,80 150,40 250,60 C350,80 400,20 500,35 C600,50 700,15 800,30 L800,120 L0,120Z" fill="url(#cg)"/><path d="M0,100 C100,80 150,40 250,60 C350,80 400,20 500,35 C600,50 700,15 800,30" fill="none" stroke="${t.primary}" stroke-width="2.5"/></svg></div>
</div>
</div>
<div class="float-badge fb1"><div class="fi">⚡</div><div><span>99.9% Uptime</span><small>Enterprise SLA</small></div></div>
<div class="float-badge fb2"><div class="fi">🔒</div><div><span>SOC2 Certified</span><small>Bank-grade security</small></div></div>
</div>
</div>
</section>
<section class="stats">
<div class="stats-grid">
<div class="stat reveal"><div class="num" data-count="2400" data-suffix="+">0</div><div class="lbl">Teams Worldwide</div></div>
<div class="stat reveal delay-1"><div class="num" data-count="99" data-suffix=".9%">0</div><div class="lbl">Uptime SLA</div></div>
<div class="stat reveal delay-2"><div class="num" data-count="50" data-suffix="M+">0</div><div class="lbl">API Calls / Day</div></div>
<div class="stat reveal delay-3"><div class="num" data-count="4" data-suffix=".9★">0</div><div class="lbl">Average Rating</div></div>
</div>
</section>
<section class="features" id="features">
<div class="section-tag reveal">Features</div>
<h2 class="section-title reveal">Everything you need to <br>build at scale</h2>
<p class="section-sub reveal">Powerful primitives that handle the complexity so your team can focus on building remarkable products.</p>
<div class="feat-grid">
<div class="feat reveal"><div class="feat-icon">🧠</div><h3>AI Code Generation</h3><p>Generate production-ready code in 50+ languages with context-aware AI that understands your codebase.</p></div>
<div class="feat reveal delay-1"><div class="feat-icon">⚡</div><h3>Edge Deployment</h3><p>Deploy to 300+ edge locations globally. Sub-50ms cold starts with automatic scaling from zero.</p></div>
<div class="feat reveal delay-2"><div class="feat-icon">🔐</div><h3>Enterprise Security</h3><p>SOC2 Type II, GDPR compliant, end-to-end encryption. Role-based access with SSO integration.</p></div>
<div class="feat reveal delay-3"><div class="feat-icon">📊</div><h3>Real-Time Analytics</h3><p>Live dashboards with custom metrics, alerts, and anomaly detection powered by machine learning.</p></div>
<div class="feat reveal delay-4"><div class="feat-icon">🔌</div><h3>API-First Architecture</h3><p>RESTful and GraphQL APIs with auto-generated SDKs for every major language and framework.</p></div>
<div class="feat reveal"><div class="feat-icon">🤝</div><h3>Team Collaboration</h3><p>Real-time pair programming, code reviews, and shared environments with conflict-free merging.</p></div>
</div>
</section>
<section class="pricing" id="pricing">
<div class="pricing-head">
<div class="section-tag reveal">Pricing</div>
<h2 class="section-title reveal" style="text-align:center">Simple, transparent pricing</h2>
<p class="section-sub reveal" style="text-align:center;margin-left:auto;margin-right:auto">Start free. Scale as you grow. No hidden fees, no surprises.</p>
<div class="toggle-wrap reveal"><span class="active" id="mo-label">Monthly</span><button class="toggle" id="pricing-toggle" onclick="this.classList.toggle('on');document.querySelectorAll('.price-mo').forEach(e=>e.style.display=this.classList.contains('on')?'none':'');document.querySelectorAll('.price-yr').forEach(e=>e.style.display=this.classList.contains('on')?'':'none');document.getElementById('mo-label').classList.toggle('active');document.getElementById('yr-label').classList.toggle('active')"></button><span id="yr-label">Yearly <span style="color:${t.primary};font-weight:700">-20%</span></span></div>
</div>
<div class="plans">
<div class="plan reveal">
<div class="plan-name">Starter</div>
<div class="plan-price"><span class="price-mo">$0</span><span class="price-yr" style="display:none">$0</span> <span>/month</span></div>
<div class="plan-desc">Perfect for side projects and experiments.</div>
<ul><li>5,000 API calls/month</li><li>1 team member</li><li>Community support</li><li>Basic analytics</li></ul>
<button class="plan-btn outline">Get Started Free</button>
</div>
<div class="plan featured reveal delay-1">
<div class="plan-name">Pro</div>
<div class="plan-price"><span class="price-mo">$49</span><span class="price-yr" style="display:none">$39</span> <span>/month</span></div>
<div class="plan-desc">For growing teams shipping fast.</div>
<ul><li>100,000 API calls/month</li><li>Up to 10 members</li><li>Priority support</li><li>Advanced analytics</li><li>Custom domains</li></ul>
<button class="plan-btn solid">Start Pro Trial →</button>
</div>
<div class="plan reveal delay-2">
<div class="plan-name">Enterprise</div>
<div class="plan-price">Custom</div>
<div class="plan-desc">For organizations with advanced needs.</div>
<ul><li>Unlimited API calls</li><li>Unlimited members</li><li>Dedicated support</li><li>SLA guarantee</li><li>Custom integrations</li></ul>
<button class="plan-btn outline">Contact Sales</button>
</div>
</div>
</section>
<section class="testimonials" id="testimonials">
<div style="text-align:center;margin-bottom:3.5rem">
<div class="section-tag reveal">Testimonials</div>
<h2 class="section-title reveal" style="text-align:center">Loved by engineering teams</h2>
</div>
<div class="testi-grid">
<div class="testi reveal">
<div class="testi-stars"><svg viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg><svg viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg><svg viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg><svg viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg><svg viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg></div>
<p>"Aurora cut our deployment time from hours to minutes. The AI code generation alone saved us 200+ engineering hours last quarter."</p>
<div class="testi-author"><img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop" alt=""><div><div class="name">Sarah Chen</div><div class="role">VP Engineering, ScaleUp</div></div></div>
</div>
<div class="testi reveal delay-1">
<div class="testi-stars"><svg viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg><svg viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg><svg viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg><svg viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg><svg viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg></div>
<p>"The best developer platform we've used. API docs are incredible, the SDK just works, and their support team responds in minutes, not days."</p>
<div class="testi-author"><img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop" alt=""><div><div class="name">Marcus Reid</div><div class="role">CTO, DataFlow</div></div></div>
</div>
<div class="testi reveal delay-2">
<div class="testi-stars"><svg viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg><svg viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg><svg viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg><svg viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg><svg viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg></div>
<p>"We migrated from three different tools to Aurora. One platform, zero context-switching. Our team velocity doubled in the first month."</p>
<div class="testi-author"><img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop" alt=""><div><div class="name">Priya Sharma</div><div class="role">Lead Developer, CloudNine</div></div></div>
</div>
</div>
</section>
${darkSections(t)}
<section class="cta">
<div class="cta-box reveal">
<h2>Start building today</h2>
<p>10,000 free API calls. No credit card required. Deploy your first project in under 5 minutes.</p>
<button class="btn-primary" style="font-size:1.05rem;padding:1.1rem 3rem">Get Started Free →</button>
</div>
</section>
<footer><p>© 2026 Aurora AI Inc. All rights reserved. Privacy · Terms · Status</p></footer>
${scrollJS}
</body>
</html>`,
},
{
  id: "saas-nexus-dev",
  name: "Nexus — Dev Platform",
  category: "Tech / SaaS",
  description: "Cyberpunk neon aesthetic, animated grid background, terminal-style hero, glowing borders, code blocks, dark futuristic feel with micro-interactions.",
  thumb: "⚡",
  getCode: (t: T) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Nexus Platform</title>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:#050510;color:#a0a8c0;overflow-x:hidden}a{text-decoration:none;color:inherit}${revealCSS}
.grid-bg{position:fixed;inset:0;z-index:0;background-image:linear-gradient(rgba(${parseInt(t.primary.slice(1,3),16)},${parseInt(t.primary.slice(3,5),16)},${parseInt(t.primary.slice(5,7),16)},.04) 1px,transparent 1px),linear-gradient(90deg,rgba(${parseInt(t.primary.slice(1,3),16)},${parseInt(t.primary.slice(3,5),16)},${parseInt(t.primary.slice(5,7),16)},.04) 1px,transparent 1px);background-size:60px 60px}
.grid-glow{position:fixed;top:0;left:50%;transform:translateX(-50%);width:800px;height:400px;background:radial-gradient(ellipse,${t.primary}12,transparent 70%);z-index:0;pointer-events:none}
section,nav,footer{position:relative;z-index:1}nav{padding:1.2rem 5%;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,.04)}
.logo{font-family:'JetBrains Mono',monospace;font-size:1.3rem;font-weight:800;color:#fff}.logo span{color:${t.primary}}nav ul{list-style:none;display:flex;gap:2rem}
nav ul a{font-size:.82rem;font-weight:500;opacity:.5;transition:.3s;font-family:'JetBrains Mono',monospace}nav ul a:hover{opacity:1;color:${t.primary}}
.nav-cta{background:transparent;border:1px solid ${t.primary};color:${t.primary};padding:.55rem 1.4rem;border-radius:8px;font-weight:600;font-size:.82rem;cursor:pointer;transition:.3s;font-family:'JetBrains Mono',monospace}
.nav-cta:hover{background:${t.primary};color:#fff;box-shadow:0 0 30px ${t.primary}40}.hero{min-height:100vh;display:flex;align-items:center;padding:8rem 5% 4rem}
.hero-inner{max-width:1200px;margin:0 auto;width:100%;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center}
.hero-tag{display:inline-flex;align-items:center;gap:.6rem;border:1px solid ${t.primary}30;padding:.4rem 1rem;border-radius:6px;font-size:.7rem;font-weight:600;color:${t.primary};margin-bottom:1.5rem;font-family:'JetBrains Mono',monospace;text-transform:uppercase;letter-spacing:1px}
.hero-tag .blink{display:inline-block;width:8px;height:8px;background:${t.primary};border-radius:2px;animation:blink 1.2s infinite}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.2}}.hero h1{font-size:3.5rem;font-weight:900;line-height:1.08;color:#fff;margin-bottom:1.5rem;letter-spacing:-1.5px}
.hero h1 .glow-text{color:${t.primary};text-shadow:0 0 40px ${t.primary}50}.hero .sub{font-size:1rem;line-height:1.8;opacity:.45;margin-bottom:2.5rem;max-width:480px}
.hero-btns{display:flex;gap:1rem}
.btn-neon{background:${t.primary};color:#fff;padding:.9rem 2.2rem;border-radius:10px;font-weight:700;font-size:.9rem;border:none;cursor:pointer;transition:.3s;box-shadow:0 0 20px ${t.primary}30}
.btn-neon:hover{box-shadow:0 0 50px ${t.primary}60;transform:translateY(-2px)}
.btn-outline{background:transparent;color:#fff;padding:.9rem 2.2rem;border-radius:10px;font-weight:600;font-size:.9rem;border:1px solid rgba(255,255,255,.12);cursor:pointer;transition:.3s}
.btn-outline:hover{border-color:${t.primary};color:${t.primary}}
.terminal{background:#0a0a1a;border:1px solid rgba(255,255,255,.08);border-radius:16px;overflow:hidden;box-shadow:0 40px 80px rgba(0,0,0,.5),0 0 1px ${t.primary}30}
.term-bar{padding:.7rem 1rem;background:#0f0f22;display:flex;align-items:center;gap:.5rem;border-bottom:1px solid rgba(255,255,255,.06)}
.term-dot{width:10px;height:10px;border-radius:50%}.td-r{background:#ff5f57}.td-y{background:#febc2e}.td-g{background:#28c840}
.term-bar span{margin-left:.5rem;font-size:.7rem;opacity:.3;font-family:'JetBrains Mono',monospace}
.term-body{padding:1.5rem;font-family:'JetBrains Mono',monospace;font-size:.8rem;line-height:2}
.term-line{display:block}.term-prompt{color:${t.primary}}.term-cmd{color:#fff}.term-comment{color:rgba(255,255,255,.2)}.term-output{color:${t.accent};opacity:.7}
.term-cursor{display:inline-block;width:8px;height:16px;background:${t.primary};animation:blink 1s infinite;vertical-align:middle;margin-left:2px}
.logos{padding:4rem 5%;border-top:1px solid rgba(255,255,255,.04);border-bottom:1px solid rgba(255,255,255,.04)}
.logos p{text-align:center;font-size:.75rem;opacity:.25;text-transform:uppercase;letter-spacing:2px;margin-bottom:2rem;font-family:'JetBrains Mono',monospace}
.logo-row{display:flex;justify-content:center;gap:3rem;flex-wrap:wrap;opacity:.2}.logo-row span{font-size:1.2rem;font-weight:800;letter-spacing:1px}
.features{padding:7rem 5%;max-width:1200px;margin:0 auto}
.stag{font-family:'JetBrains Mono',monospace;font-size:.7rem;color:${t.primary};text-transform:uppercase;letter-spacing:2px;font-weight:700;margin-bottom:1rem;display:block}
.stitle{font-size:2.8rem;font-weight:800;color:#fff;margin-bottom:.5rem;letter-spacing:-1px}.ssub{opacity:.35;margin-bottom:3.5rem;max-width:500px}
.feat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.2rem}
.feat{background:#0a0a1a;border:1px solid rgba(255,255,255,.05);border-radius:16px;padding:2rem;transition:.4s;position:relative;overflow:hidden}
.feat::after{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:${t.primary};opacity:0;transition:.4s}.feat:hover::after{opacity:1}
.feat:hover{border-color:${t.primary}25;box-shadow:0 0 40px ${t.primary}08;transform:translateY(-4px)}
.feat .fi{width:48px;height:48px;border-radius:12px;border:1px solid ${t.primary}25;display:flex;align-items:center;justify-content:center;margin-bottom:1.2rem;font-size:1.2rem}
.feat h3{color:#fff;font-size:1rem;font-weight:700;margin-bottom:.5rem}.feat p{font-size:.82rem;line-height:1.7;opacity:.4}
.code-section{padding:7rem 5%;max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center}
.code-block{background:#0a0a1a;border:1px solid rgba(255,255,255,.06);border-radius:16px;padding:2rem;font-family:'JetBrains Mono',monospace;font-size:.78rem;line-height:2;overflow-x:auto}
.ck{color:${t.primary}}.cs{color:${t.accent}}.cv{color:#e2e8f0}.cc{color:rgba(255,255,255,.2)}.cp{color:#94a3b8}.cn{color:${t.accent}}
.stats{padding:5rem 5%;background:#0a0a1a;border-top:1px solid rgba(255,255,255,.04);border-bottom:1px solid rgba(255,255,255,.04)}
.stats-grid{max-width:1000px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:2rem;text-align:center}
.stat .num{font-size:3rem;font-weight:900;color:${t.primary};font-family:'JetBrains Mono',monospace;text-shadow:0 0 30px ${t.primary}30}
.stat .lbl{font-size:.8rem;opacity:.3;margin-top:.3rem;font-family:'JetBrains Mono',monospace;text-transform:uppercase;letter-spacing:1px}.cta{padding:7rem 5%;text-align:center}
.cta h2{font-size:3rem;font-weight:900;color:#fff;margin-bottom:1rem;letter-spacing:-1px}.cta p{opacity:.4;margin-bottom:2.5rem;max-width:500px;margin-left:auto;margin-right:auto}
.cta-input{display:flex;gap:.5rem;max-width:440px;margin:0 auto;background:#0a0a1a;border:1px solid ${t.primary}25;border-radius:14px;padding:.3rem}
.cta-input input{flex:1;background:transparent;border:none;color:#fff;padding:.8rem 1rem;font-size:.9rem;outline:none;font-family:'JetBrains Mono',monospace}.cta-input input::placeholder{color:rgba(255,255,255,.2)}
.cta-input button{background:${t.primary};color:#fff;border:none;padding:.8rem 1.8rem;border-radius:10px;font-weight:700;cursor:pointer;transition:.3s;white-space:nowrap}.cta-input button:hover{box-shadow:0 0 30px ${t.primary}50}
footer{padding:3rem 5%;border-top:1px solid rgba(255,255,255,.04);text-align:center;font-size:.75rem;opacity:.25;font-family:'JetBrains Mono',monospace}@media(max-width:768px){
nav ul{display:none}.hero-inner,.code-section{grid-template-columns:1fr}.hero h1{font-size:2.5rem}.feat-grid,.stats-grid{grid-template-columns:1fr 1fr}}
</style>
</head>
<body>
<div class="grid-bg"></div><div class="grid-glow"></div>
<nav>
<div class="logo">&gt;_nexus<span>.dev</span></div>
<ul><a href="#features">Features</a><a href="#code">API</a><a href="#">Docs</a><a href="#">Blog</a></ul>
<button class="nav-cta">Sign Up →</button>
</nav>
<section class="hero">
<div class="hero-inner">
<div>
<div class="hero-tag reveal"><span class="blink"></span> v3.0 — now with edge functions</div>
<h1 class="reveal delay-1">The platform <br><span class="glow-text">developers</span> deserve</h1>
<p class="sub reveal delay-2">Deploy globally in seconds. Nexus handles infrastructure, scaling, and observability so you can focus on writing brilliant code.</p>
<div class="hero-btns reveal delay-3">
<button class="btn-neon">npx create-nexus →</button>
<button class="btn-outline">Read Docs</button>
</div>
</div>
<div class="reveal delay-2">
<div class="terminal">
<div class="term-bar"><span class="term-dot td-r"></span><span class="term-dot td-y"></span><span class="term-dot td-g"></span><span>~/projects/my-app</span></div>
<div class="term-body">
<span class="term-line"><span class="term-prompt">$</span> <span class="term-cmd">nexus deploy --prod</span></span>
<span class="term-line term-comment"># Scanning project...</span>
<span class="term-line term-output">✓ Build complete in 2.4s</span>
<span class="term-line term-output">✓ Deployed to 47 edge regions</span>
<span class="term-line term-output">✓ SSL provisioned automatically</span>
<span class="term-line term-output">✓ https://my-app.nexus.dev</span>
<span class="term-line"><br><span class="term-prompt">$</span> <span class="term-cmd">nexus analytics --live</span></span>
<span class="term-line term-output">  Requests: 12,847/min</span>
<span class="term-line term-output">  P99 Latency: 23ms</span>
<span class="term-line term-output">  Error Rate: 0.001%</span>
<span class="term-line"><span class="term-prompt">$</span> <span class="term-cursor"></span></span>
</div>
</div>
</div>
</div>
</section>
<section class="logos">
<p>Trusted by teams at</p>
<div class="logo-row"><span>Vercel</span><span>Stripe</span><span>Shopify</span><span>Linear</span><span>Notion</span><span>Figma</span></div>
</section>
<section class="features" id="features">
<span class="stag reveal">// features</span>
<h2 class="stitle reveal">Ship with confidence</h2>
<p class="ssub reveal">Everything you need from first commit to global scale, in a single platform.</p>
<div class="feat-grid">
<div class="feat reveal"><div class="fi">⚡</div><h3>Edge Functions</h3><p>Run serverless code at the edge. 47 regions, sub-50ms cold starts, automatic failover.</p></div>
<div class="feat reveal delay-1"><div class="fi">🗄️</div><h3>Managed Database</h3><p>Serverless Postgres with auto-scaling, branching, and point-in-time recovery built in.</p></div>
<div class="feat reveal delay-2"><div class="fi">🔍</div><h3>Observability</h3><p>Real-time logs, distributed tracing, and error tracking. Know what's happening, everywhere.</p></div>
<div class="feat reveal delay-3"><div class="fi">🔐</div><h3>Zero-Trust Auth</h3><p>Built-in authentication with MFA, SSO, and RBAC. GDPR and SOC2 compliant out of the box.</p></div>
<div class="feat reveal delay-4"><div class="fi">🔄</div><h3>CI/CD Pipeline</h3><p>Push to deploy. Preview environments for every branch. Rollback in one click.</p></div>
<div class="feat reveal"><div class="fi">📦</div><h3>Package Registry</h3><p>Private npm registry with vulnerability scanning, license checks, and dependency insights.</p></div>
</div>
</section>
<section class="code-section" id="code">
<div class="reveal">
<span class="stag">// api</span>
<h2 class="stitle" style="font-size:2.2rem">Developer-first API</h2>
<p class="ssub">Clean, intuitive APIs with auto-generated SDKs. Get started with 3 lines of code.</p>
<ul style="list-style:none;margin-top:2rem">
<li style="display:flex;align-items:center;gap:.8rem;margin-bottom:1rem"><span style="color:${t.primary};font-size:1rem">✓</span><span style="font-size:.9rem;opacity:.6">Auto-generated TypeScript SDKs</span></li>
<li style="display:flex;align-items:center;gap:.8rem;margin-bottom:1rem"><span style="color:${t.primary};font-size:1rem">✓</span><span style="font-size:.9rem;opacity:.6">GraphQL and REST endpoints</span></li>
<li style="display:flex;align-items:center;gap:.8rem;margin-bottom:1rem"><span style="color:${t.primary};font-size:1rem">✓</span><span style="font-size:.9rem;opacity:.6">Real-time WebSocket streams</span></li>
<li style="display:flex;align-items:center;gap:.8rem"><span style="color:${t.primary};font-size:1rem">✓</span><span style="font-size:.9rem;opacity:.6">Rate limiting and caching built in</span></li>
</ul>
</div>
<div class="code-block reveal delay-1">
<span class="cc">// Initialize Nexus client</span><br>
<span class="ck">import</span> <span class="cv">{ Nexus }</span> <span class="ck">from</span> <span class="cs">'@nexus/sdk'</span><br><br>
<span class="ck">const</span> <span class="cv">nx</span> <span class="cp">=</span> <span class="ck">new</span> <span class="cv">Nexus</span><span class="cp">({</span><br>
&nbsp;&nbsp;<span class="cv">apiKey</span><span class="cp">:</span> <span class="cs">process.env.NEXUS_KEY</span><br>
<span class="cp">})</span><br><br>
<span class="cc">// Deploy edge function</span><br>
<span class="ck">const</span> <span class="cv">fn</span> <span class="cp">=</span> <span class="ck">await</span> <span class="cv">nx</span><span class="cp">.</span><span class="cv">deploy</span><span class="cp">({</span><br>
&nbsp;&nbsp;<span class="cv">name</span><span class="cp">:</span> <span class="cs">'api-handler'</span><span class="cp">,</span><br>
&nbsp;&nbsp;<span class="cv">runtime</span><span class="cp">:</span> <span class="cs">'edge'</span><span class="cp">,</span><br>
&nbsp;&nbsp;<span class="cv">regions</span><span class="cp">:</span> <span class="cs">'auto'</span><br>
<span class="cp">})</span><br><br>
<span class="cv">console</span><span class="cp">.</span><span class="cv">log</span><span class="cp">(</span><span class="cs">\`Live: \${fn.url}\`</span><span class="cp">)</span><br>
<span class="term-output">// → Live: https://api.nexus.dev/fn/api-handler</span>
</div>
</section>
<section class="stats">
<div class="stats-grid">
<div class="stat reveal"><div class="num" data-count="47">0</div><div class="lbl">Edge Regions</div></div>
<div class="stat reveal delay-1"><div class="num" data-count="23" data-suffix="ms">0</div><div class="lbl">Avg Latency</div></div>
<div class="stat reveal delay-2"><div class="num" data-count="99" data-suffix=".99%">0</div><div class="lbl">Uptime</div></div>
<div class="stat reveal delay-3"><div class="num" data-count="18" data-suffix="K+">0</div><div class="lbl">Developers</div></div>
</div>
</section>
${darkSections(t)}
<section class="cta">
<h2 class="reveal">Start shipping <span style="color:${t.primary}">today</span></h2>
<p class="reveal delay-1">Free tier includes 100K requests/month, managed database, and edge deployment.</p>
<div class="cta-input reveal delay-2">
<input type="email" placeholder="you@company.com">
<button>Get API Key →</button>
</div>
</section>
<footer>© 2026 Nexus Platform · Privacy · Terms · Status</footer>
${scrollJS}
</body>
</html>`,
},
{
  id: "saas-prism-analytics",
  name: "Prism — Analytics SaaS",
  category: "Tech / SaaS",
  description: "Clean light/minimal design with soft shadows, 3D tilting cards, elegant typography, smooth animations, pastel accents, professional and refined.",
  thumb: "📊",
  getCode: (t: T) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Prism Analytics</title>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Plus Jakarta Sans',sans-serif;background:${t.light};color:#1a1a2e;overflow-x:hidden}
a{text-decoration:none;color:inherit}${revealCSS}
nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:1rem 5%;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.85);backdrop-filter:blur(20px);border-bottom:1px solid rgba(0,0,0,.04)}
.logo{font-size:1.3rem;font-weight:800;color:#1a1a2e}.logo span{color:${t.primary}}nav ul{list-style:none;display:flex;gap:2rem}
nav ul a{font-size:.85rem;font-weight:500;color:#666;transition:.3s}nav ul a:hover{color:${t.primary}}
.nav-cta{background:${t.primary};color:#fff;padding:.6rem 1.5rem;border-radius:10px;font-weight:600;font-size:.85rem;border:none;cursor:pointer;transition:.3s}
.nav-cta:hover{box-shadow:0 8px 25px ${t.primary}35;transform:translateY(-1px)}
.hero{min-height:100vh;display:flex;align-items:center;padding:8rem 5% 4rem;background:linear-gradient(180deg,#fff,${t.light})}
.hero-inner{max-width:1100px;margin:0 auto;text-align:center;width:100%}
.hero-pill{display:inline-flex;align-items:center;gap:.5rem;background:#fff;border:1px solid rgba(0,0,0,.08);padding:.45rem 1.2rem;border-radius:50px;font-size:.78rem;font-weight:600;color:${t.primary};margin-bottom:2rem;box-shadow:0 2px 10px rgba(0,0,0,.04)}
.hero-pill .check{width:18px;height:18px;border-radius:50%;background:${t.primary}15;display:flex;align-items:center;justify-content:center;font-size:.6rem;color:${t.primary}}
.hero h1{font-size:clamp(2.5rem,5vw,4rem);font-weight:800;line-height:1.1;color:#1a1a2e;margin-bottom:1.5rem;letter-spacing:-1.5px}
.hero h1 span{background:linear-gradient(135deg,${t.primary},${t.secondary});-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero .sub{font-size:1.1rem;line-height:1.8;color:#666;max-width:580px;margin:0 auto 2.5rem}.hero-btns{display:flex;gap:1rem;justify-content:center;margin-bottom:4rem}
.btn-solid{background:${t.primary};color:#fff;padding:1rem 2.5rem;border-radius:14px;font-weight:700;font-size:.95rem;border:none;cursor:pointer;transition:.3s;display:inline-flex;align-items:center;gap:.5rem}
.btn-solid:hover{box-shadow:0 15px 40px ${t.primary}30;transform:translateY(-3px)}
.btn-light{background:#fff;color:#1a1a2e;padding:1rem 2.5rem;border-radius:14px;font-weight:600;font-size:.95rem;border:1px solid rgba(0,0,0,.1);cursor:pointer;transition:.3s}
.btn-light:hover{border-color:${t.primary};color:${t.primary};transform:translateY(-2px)}
.hero-dash{max-width:960px;margin:0 auto;background:#fff;border-radius:20px;border:1px solid rgba(0,0,0,.06);overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.08),0 0 0 1px rgba(0,0,0,.02);transform:perspective(1200px) rotateX(4deg);transition:transform .5s}
.hero-dash:hover{transform:perspective(1200px) rotateX(0)}
.hd-bar{padding:.7rem 1.2rem;background:#fafafa;border-bottom:1px solid rgba(0,0,0,.05);display:flex;align-items:center;gap:.5rem}
.hd-dot{width:10px;height:10px;border-radius:50%;background:#e0e0e0}.hd-dot:nth-child(1){background:#ff5f57}.hd-dot:nth-child(2){background:#febc2e}.hd-dot:nth-child(3){background:#28c840}
.hd-body{padding:2rem;display:grid;grid-template-columns:repeat(3,1fr);gap:1rem}.hd-card{background:${t.light};border-radius:14px;padding:1.5rem;border:1px solid rgba(0,0,0,.04)}
.hd-card .lbl{font-size:.7rem;color:#999;text-transform:uppercase;letter-spacing:.5px;margin-bottom:.5rem}
.hd-card .val{font-size:1.6rem;font-weight:800;color:#1a1a2e}.hd-card .ch{font-size:.75rem;color:${t.primary};font-weight:600;margin-top:.2rem}
.hd-chart{grid-column:1/-1;height:100px;background:#fafafa;border-radius:14px;border:1px solid rgba(0,0,0,.04);overflow:hidden}.hd-chart svg{width:100%;height:100%}
.features{padding:7rem 5%;max-width:1100px;margin:0 auto}
.sect-badge{display:inline-block;background:${t.primary}12;color:${t.primary};padding:.4rem 1rem;border-radius:50px;font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:1rem}
.sect-title{font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:800;color:#1a1a2e;margin-bottom:.5rem;letter-spacing:-.5px}
.sect-sub{color:#888;font-size:1rem;margin-bottom:3.5rem;max-width:480px}.feat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem}
.feat{background:#fff;border:1px solid rgba(0,0,0,.05);border-radius:18px;padding:2rem;transition:.4s;cursor:default}
.feat:hover{transform:translateY(-6px);box-shadow:0 20px 50px rgba(0,0,0,.06);border-color:${t.primary}20}
.feat-icon{width:50px;height:50px;border-radius:14px;background:linear-gradient(135deg,${t.primary}15,${t.secondary}08);display:flex;align-items:center;justify-content:center;margin-bottom:1.2rem;font-size:1.2rem}
.feat h3{font-size:1.05rem;font-weight:700;color:#1a1a2e;margin-bottom:.5rem}.feat p{font-size:.85rem;line-height:1.7;color:#888}
.stats{padding:5rem 5%;background:#fff;border-top:1px solid rgba(0,0,0,.04);border-bottom:1px solid rgba(0,0,0,.04)}
.stats-grid{max-width:900px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:2rem;text-align:center}
.stat .num{font-size:2.8rem;font-weight:900;color:${t.primary}}.stat .lbl{font-size:.8rem;color:#999;margin-top:.3rem}
.integrations{padding:7rem 5%;text-align:center;max-width:1100px;margin:0 auto}.int-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:1rem;margin-top:3rem}
.int-card{background:#fff;border:1px solid rgba(0,0,0,.05);border-radius:14px;padding:1.5rem 1rem;transition:.3s;display:flex;flex-direction:column;align-items:center;gap:.5rem}
.int-card:hover{border-color:${t.primary}20;transform:translateY(-3px);box-shadow:0 10px 30px rgba(0,0,0,.04)}
.int-card .ic{font-size:1.8rem}.int-card span{font-size:.75rem;font-weight:600;color:#666}.cta{padding:7rem 5%}
.cta-box{max-width:800px;margin:0 auto;background:linear-gradient(135deg,${t.primary},${t.secondary});border-radius:24px;padding:4rem 3rem;text-align:center;position:relative;overflow:hidden}
.cta-box::before{content:'';position:absolute;top:-50%;right:-20%;width:400px;height:400px;background:rgba(255,255,255,.1);border-radius:50%;filter:blur(60px)}
.cta-box>*{position:relative}.cta-box h2{font-size:2.5rem;font-weight:800;color:#fff;margin-bottom:1rem;letter-spacing:-.5px}
.cta-box p{color:rgba(255,255,255,.75);margin-bottom:2rem;max-width:400px;margin-left:auto;margin-right:auto}
.btn-white{background:#fff;color:${t.primary};padding:1rem 2.5rem;border-radius:14px;font-weight:700;font-size:.95rem;border:none;cursor:pointer;transition:.3s}
.btn-white:hover{transform:translateY(-2px);box-shadow:0 15px 40px rgba(0,0,0,.15)}footer{padding:3rem 5%;text-align:center;font-size:.8rem;color:#bbb}@media(max-width:768px){
nav ul{display:none}.hero h1{font-size:2.5rem}.hd-body{grid-template-columns:1fr}.feat-grid{grid-template-columns:1fr}.stats-grid{grid-template-columns:repeat(2,1fr)}
.int-grid{grid-template-columns:repeat(3,1fr)}}
</style>
</head>
<body>
<nav>
<div class="logo">Prism<span>.</span></div>
<ul><a href="#features">Features</a><a href="#integrations">Integrations</a><a href="#">Pricing</a><a href="#">Docs</a></ul>
<button class="nav-cta">Get Started</button>
</nav>
<section class="hero">
<div class="hero-inner">
<div class="hero-pill reveal"><span class="check">✓</span> Trusted by 3,000+ companies</div>
<h1 class="reveal delay-1">Analytics that <span>actually make sense</span></h1>
<p class="sub reveal delay-2">Stop drowning in data. Prism turns your metrics into clear, actionable insights — so you can make decisions with confidence.</p>
<div class="hero-btns reveal delay-3">
<button class="btn-solid">Start Free Trial <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14m-7-7 7 7-7 7"/></svg></button>
<button class="btn-light">Book a Demo</button>
</div>
<div class="hero-dash reveal delay-4">
<div class="hd-bar"><span class="hd-dot"></span><span class="hd-dot"></span><span class="hd-dot"></span></div>
<div class="hd-body">
<div class="hd-card"><div class="lbl">Revenue</div><div class="val">$128K</div><div class="ch">↑ 24% this month</div></div>
<div class="hd-card"><div class="lbl">Users</div><div class="val">45.2K</div><div class="ch">↑ 12% growth</div></div>
<div class="hd-card"><div class="lbl">Conversion</div><div class="val">3.8%</div><div class="ch">↑ 0.4% vs avg</div></div>
<div class="hd-chart"><svg viewBox="0 0 800 100" preserveAspectRatio="none"><defs><linearGradient id="pg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="${t.primary}" stop-opacity=".15"/><stop offset="100%" stop-color="${t.primary}" stop-opacity="0"/></linearGradient></defs><path d="M0,80 C80,60 160,70 240,45 C320,20 400,55 480,35 C560,15 640,40 720,25 C760,18 800,30 800,30 L800,100 L0,100Z" fill="url(#pg)"/><path d="M0,80 C80,60 160,70 240,45 C320,20 400,55 480,35 C560,15 640,40 720,25 C760,18 800,30 800,30" fill="none" stroke="${t.primary}" stroke-width="2.5"/></svg></div>
</div>
</div>
</div>
</section>
<section class="stats">
<div class="stats-grid">
<div class="stat reveal"><div class="num" data-count="3000" data-suffix="+">0</div><div class="lbl">Companies</div></div>
<div class="stat reveal delay-1"><div class="num" data-count="2" data-suffix="B+">0</div><div class="lbl">Events Tracked</div></div>
<div class="stat reveal delay-2"><div class="num" data-count="99" data-suffix=".9%">0</div><div class="lbl">Accuracy</div></div>
<div class="stat reveal delay-3"><div class="num" data-count="50" data-suffix="ms">0</div><div class="lbl">Query Speed</div></div>
</div>
</section>
<section class="features" id="features">
<div class="sect-badge reveal">Features</div>
<h2 class="sect-title reveal">Everything you need to<br>understand your data</h2>
<p class="sect-sub reveal">Powerful analytics tools designed for modern teams. Simple enough for founders, deep enough for data engineers.</p>
<div class="feat-grid">
<div class="feat reveal"><div class="feat-icon">📈</div><h3>Real-Time Dashboards</h3><p>Live metrics that update every second. Custom dashboards built with drag-and-drop simplicity.</p></div>
<div class="feat reveal delay-1"><div class="feat-icon">🎯</div><h3>Funnel Analysis</h3><p>See exactly where users drop off. Identify bottlenecks and optimize conversion paths effortlessly.</p></div>
<div class="feat reveal delay-2"><div class="feat-icon">🧪</div><h3>A/B Testing</h3><p>Run experiments with statistical rigor. Get results faster with Bayesian analysis and auto-stopping.</p></div>
<div class="feat reveal delay-3"><div class="feat-icon">🔍</div><h3>User Journeys</h3><p>Replay user sessions, track behavior flows, and understand exactly how people use your product.</p></div>
<div class="feat reveal delay-4"><div class="feat-icon">🤖</div><h3>AI Insights</h3><p>Get automated anomaly detection and AI-generated summaries of what matters in your data.</p></div>
<div class="feat reveal"><div class="feat-icon">🔔</div><h3>Smart Alerts</h3><p>Custom alerts based on any metric. Get notified via Slack, email, or webhook when something changes.</p></div>
</div>
</section>
<section class="integrations" id="integrations">
<div class="sect-badge reveal">Integrations</div>
<h2 class="sect-title reveal">Works with your stack</h2>
<p class="sect-sub reveal" style="margin-left:auto;margin-right:auto;text-align:center">One-click integrations with the tools you already use.</p>
<div class="int-grid">
<div class="int-card reveal"><div class="ic">⚛️</div><span>React</span></div>
<div class="int-card reveal delay-1"><div class="ic">🔺</div><span>Next.js</span></div>
<div class="int-card reveal delay-1"><div class="ic">💚</div><span>Node.js</span></div>
<div class="int-card reveal delay-2"><div class="ic">🐍</div><span>Python</span></div>
<div class="int-card reveal delay-2"><div class="ic">💬</div><span>Slack</span></div>
<div class="int-card reveal delay-3"><div class="ic">📊</div><span>BigQuery</span></div>
</div>
</section>
${lightSections(t)}
<section class="cta">
<div class="cta-box reveal">
<h2>Ready to see clearly?</h2>
<p>Start your free 14-day trial. No credit card required. Cancel anytime.</p>
<button class="btn-white">Start Free Trial →</button>
</div>
</section>
<footer>© 2026 Prism Analytics · Privacy · Terms · Status</footer>
${scrollJS}
</body>
</html>`,
},
{
  id: "saas-zenith-enterprise",
  name: "Zenith — Enterprise SaaS",
  category: "Tech / SaaS",
  description: "Luxury enterprise design with cinematic gradient hero, glassmorphism panels, gold accents, elegant spacing, animated stats, premium testimonials.",
  thumb: "🏛️",
  getCode: (t: T) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Zenith Enterprise</title>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'DM Sans',sans-serif;background:#08080f;color:#b0b8d0;overflow-x:hidden}a{text-decoration:none;color:inherit}
${revealCSS}
nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:1.2rem 5%;display:flex;align-items:center;justify-content:space-between;background:rgba(8,8,15,.8);backdrop-filter:blur(24px);border-bottom:1px solid rgba(255,255,255,.04)}
.logo{font-family:'DM Serif Display',serif;font-size:1.5rem;color:#fff}.logo span{color:${t.accent}}nav ul{list-style:none;display:flex;gap:2rem}
nav ul a{font-size:.85rem;font-weight:500;opacity:.5;transition:.3s}nav ul a:hover{opacity:1;color:${t.accent}}
.nav-cta{background:linear-gradient(135deg,${t.primary},${t.secondary});color:#fff;padding:.65rem 1.6rem;border-radius:10px;font-weight:600;font-size:.85rem;border:none;cursor:pointer;transition:.3s}
.nav-cta:hover{box-shadow:0 8px 30px ${t.primary}40;transform:translateY(-1px)}
.hero{min-height:100vh;display:flex;align-items:center;position:relative;overflow:hidden;padding:8rem 5% 4rem}.hero-bg{position:absolute;inset:0;z-index:0}
.hero-bg .grad{position:absolute;border-radius:50%;filter:blur(120px)}.grad-1{width:700px;height:700px;background:${t.primary};top:-20%;left:-10%;opacity:.12}
.grad-2{width:500px;height:500px;background:${t.secondary};bottom:-15%;right:-5%;opacity:.1}.grad-3{width:300px;height:300px;background:${t.accent};top:30%;right:20%;opacity:.08}
.hero-line{position:absolute;bottom:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,${t.primary}30,transparent)}
.hero-inner{max-width:1100px;margin:0 auto;position:relative;z-index:1;text-align:center;width:100%}
.hero-eyebrow{font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:3px;color:${t.accent};margin-bottom:1.5rem;opacity:.7}
.hero h1{font-family:'DM Serif Display',serif;font-size:clamp(2.8rem,6vw,5rem);line-height:1.05;color:#fff;margin-bottom:1.5rem}
.hero h1 em{font-style:normal;background:linear-gradient(135deg,${t.primary},${t.accent});-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero .sub{font-size:1.15rem;line-height:1.8;opacity:.45;max-width:620px;margin:0 auto 3rem}.hero-btns{display:flex;gap:1rem;justify-content:center}
.btn-lux{background:linear-gradient(135deg,${t.primary},${t.secondary});color:#fff;padding:1.1rem 3rem;border-radius:14px;font-weight:700;font-size:1rem;border:none;cursor:pointer;transition:.3s}
.btn-lux:hover{box-shadow:0 20px 60px ${t.primary}35;transform:translateY(-3px)}
.btn-glass{background:rgba(255,255,255,.04);backdrop-filter:blur(20px);color:#fff;padding:1.1rem 3rem;border-radius:14px;font-weight:600;font-size:1rem;border:1px solid rgba(255,255,255,.1);cursor:pointer;transition:.3s}
.btn-glass:hover{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.2)}
.panels{padding:7rem 5%;max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:1.5rem}
.panel{background:rgba(255,255,255,.03);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.06);border-radius:24px;padding:3rem;transition:.4s}
.panel:hover{border-color:${t.primary}20;transform:translateY(-4px);box-shadow:0 30px 60px rgba(0,0,0,.2)}
.panel .p-icon{width:56px;height:56px;border-radius:16px;background:linear-gradient(135deg,${t.primary}20,${t.secondary}10);display:flex;align-items:center;justify-content:center;font-size:1.4rem;margin-bottom:1.5rem}
.panel h3{font-family:'DM Serif Display',serif;font-size:1.4rem;color:#fff;margin-bottom:.8rem}.panel p{font-size:.9rem;line-height:1.8;opacity:.45}
.panel.full{grid-column:1/-1;display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center}
.panel.full .p-visual{background:rgba(255,255,255,.03);border-radius:16px;height:250px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,.04);overflow:hidden}
.panel.full .p-visual svg{width:80%;height:80%;opacity:.5}.stats{padding:5rem 5%;border-top:1px solid rgba(255,255,255,.04);border-bottom:1px solid rgba(255,255,255,.04)}
.stats-grid{max-width:1000px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:2rem;text-align:center}
.stat .num{font-family:'DM Serif Display',serif;font-size:3.2rem;color:#fff}.stat .lbl{font-size:.8rem;opacity:.35;margin-top:.3rem;text-transform:uppercase;letter-spacing:1px}
.testimonials{padding:7rem 5%;max-width:1100px;margin:0 auto}.testi-head{text-align:center;margin-bottom:3.5rem}
.testi-head .eyebrow{font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:3px;color:${t.accent};margin-bottom:1rem;opacity:.7}
.testi-head h2{font-family:'DM Serif Display',serif;font-size:2.5rem;color:#fff}.testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem}
.testi{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:20px;padding:2rem;transition:.3s}
.testi:hover{border-color:${t.primary}15;transform:translateY(-3px)}.testi .stars{color:${t.accent};font-size:.9rem;letter-spacing:2px;margin-bottom:1rem}
.testi p{font-size:.88rem;line-height:1.8;opacity:.5;margin-bottom:1.5rem;font-style:italic}
.testi-author{display:flex;align-items:center;gap:.8rem;border-top:1px solid rgba(255,255,255,.06);padding-top:1rem}
.testi-author img{width:42px;height:42px;border-radius:50%;object-fit:cover;border:2px solid ${t.primary}30}
.testi-author .name{font-size:.85rem;font-weight:600;color:#fff}.testi-author .role{font-size:.7rem;opacity:.4}.cta{padding:7rem 5%;text-align:center}
.cta-inner{max-width:700px;margin:0 auto;position:relative}
.cta-glow{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:500px;height:300px;background:radial-gradient(ellipse,${t.primary}12,transparent 70%);z-index:0}
.cta-inner>*{position:relative;z-index:1}
.cta-inner .eyebrow{font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:3px;color:${t.accent};margin-bottom:1rem;opacity:.7}
.cta-inner h2{font-family:'DM Serif Display',serif;font-size:3rem;color:#fff;margin-bottom:1rem}
.cta-inner p{opacity:.4;margin-bottom:2.5rem;max-width:450px;margin-left:auto;margin-right:auto}
footer{padding:3rem 5%;border-top:1px solid rgba(255,255,255,.04);text-align:center;font-size:.8rem;opacity:.25}@media(max-width:768px){
nav ul{display:none}.hero h1{font-size:2.5rem}.panels{grid-template-columns:1fr}.panel.full{grid-template-columns:1fr;grid-column:auto}
.stats-grid{grid-template-columns:repeat(2,1fr)}.testi-grid{grid-template-columns:1fr}}
</style>
</head>
<body>
<nav>
<div class="logo">Zenith<span>.</span></div>
<ul><a href="#solutions">Solutions</a><a href="#proof">Social Proof</a><a href="#">Resources</a><a href="#">Contact</a></ul>
<button class="nav-cta">Request Demo</button>
</nav>
<section class="hero">
<div class="hero-bg"><div class="grad grad-1"></div><div class="grad grad-2"></div><div class="grad grad-3"></div><div class="hero-line"></div></div>
<div class="hero-inner">
<div class="hero-eyebrow reveal">Enterprise-Grade Platform</div>
<h1 class="reveal delay-1">The operating system for <em>modern enterprise</em></h1>
<p class="sub reveal delay-2">Zenith unifies your data, automates workflows, and gives every team a single source of truth — from boardroom to backend.</p>
<div class="hero-btns reveal delay-3">
<button class="btn-lux">Request a Demo</button>
<button class="btn-glass">Watch Overview</button>
</div>
</div>
</section>
<section class="stats">
<div class="stats-grid">
<div class="stat reveal"><div class="num" data-count="500" data-suffix="+">0</div><div class="lbl">Enterprise Clients</div></div>
<div class="stat reveal delay-1"><div class="num" data-count="40" data-suffix="M">0</div><div class="lbl">Users Worldwide</div></div>
<div class="stat reveal delay-2"><div class="num" data-count="99" data-suffix=".99%">0</div><div class="lbl">Uptime SLA</div></div>
<div class="stat reveal delay-3"><div class="num" data-count="150" data-suffix="+">0</div><div class="lbl">Countries Served</div></div>
</div>
</section>
<section class="panels" id="solutions">
<div class="panel reveal">
<div class="p-icon">🔗</div>
<h3>Unified Data Layer</h3>
<p>Connect every data source — CRMs, ERPs, data warehouses, SaaS apps — into one real-time graph. No more silos, no more stale exports.</p>
</div>
<div class="panel reveal delay-1">
<div class="p-icon">⚙️</div>
<h3>Workflow Automation</h3>
<p>Build complex automation workflows with a visual canvas. Trigger actions across systems based on events, schedules, or AI-detected patterns.</p>
</div>
<div class="panel reveal delay-2">
<div class="p-icon">🛡️</div>
<h3>Security & Compliance</h3>
<p>SOC2, ISO 27001, HIPAA. Role-based access, audit trails, and encryption at rest and in transit. Enterprise security without the overhead.</p>
</div>
<div class="panel reveal delay-3">
<div class="p-icon">📊</div>
<h3>Executive Analytics</h3>
<p>Board-ready dashboards that update in real time. Natural language queries let anyone explore data without writing SQL.</p>
</div>
<div class="panel full reveal">
<div>
<div class="p-icon">🤖</div>
<h3>AI Operations Engine</h3>
<p>Zenith's AI continuously analyzes your operations, detects anomalies, predicts trends, and recommends actions — turning reactive management into proactive strategy.</p>
</div>
<div class="p-visual"><svg viewBox="0 0 400 200"><defs><linearGradient id="zg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${t.primary}" stop-opacity=".5"/><stop offset="100%" stop-color="${t.accent}" stop-opacity=".2"/></linearGradient></defs><circle cx="200" cy="100" r="60" fill="none" stroke="url(#zg)" stroke-width="1.5"/><circle cx="200" cy="100" r="90" fill="none" stroke="url(#zg)" stroke-width="1" opacity=".5"/><circle cx="200" cy="100" r="30" fill="${t.primary}" opacity=".15"/><circle cx="140" cy="60" r="8" fill="${t.primary}" opacity=".6"/><circle cx="260" cy="140" r="8" fill="${t.accent}" opacity=".6"/><circle cx="280" cy="70" r="6" fill="${t.primary}" opacity=".4"/><circle cx="120" cy="130" r="6" fill="${t.accent}" opacity=".4"/><line x1="200" y1="100" x2="140" y2="60" stroke="${t.primary}" stroke-width="1" opacity=".3"/><line x1="200" y1="100" x2="260" y2="140" stroke="${t.accent}" stroke-width="1" opacity=".3"/><line x1="200" y1="100" x2="280" y2="70" stroke="${t.primary}" stroke-width="1" opacity=".2"/><line x1="200" y1="100" x2="120" y2="130" stroke="${t.accent}" stroke-width="1" opacity=".2"/></svg></div>
</div>
</section>
<section class="testimonials" id="proof">
<div class="testi-head">
<div class="eyebrow reveal">Testimonials</div>
<h2 class="reveal">Trusted by industry leaders</h2>
</div>
<div class="testi-grid">
<div class="testi reveal">
<div class="stars">★★★★★</div>
<p>"Zenith replaced four separate tools for us. One platform, one source of truth. Our operational efficiency improved by 40% in the first quarter."</p>
<div class="testi-author"><img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop" alt=""><div><div class="name">James Mitchell</div><div class="role">COO, Fortuna Group</div></div></div>
</div>
<div class="testi reveal delay-1">
<div class="stars">★★★★★</div>
<p>"The AI insights are game-changing. Zenith flagged a supply chain disruption 3 weeks before it hit. That alone justified the entire investment."</p>
<div class="testi-author"><img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop" alt=""><div><div class="name">Dr. Anika Patel</div><div class="role">VP Operations, MedCore</div></div></div>
</div>
<div class="testi reveal delay-2">
<div class="stars">★★★★★</div>
<p>"Implementation was seamless. The Zenith team understood our enterprise needs from day one. We were live across 12 countries in under 6 weeks."</p>
<div class="testi-author"><img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop" alt=""><div><div class="name">Robert Cheng</div><div class="role">CTO, Atlas Logistics</div></div></div>
</div>
</div>
</section>
${darkSections(t)}
<section class="cta">
<div class="cta-inner">
<div class="cta-glow"></div>
<div class="eyebrow reveal">Get Started</div>
<h2 class="reveal">Ready to transform your operations?</h2>
<p class="reveal delay-1">Join 500+ enterprises already running on Zenith. Schedule a personalized demo with our team.</p>
<div class="reveal delay-2" style="display:flex;gap:1rem;justify-content:center">
<button class="btn-lux">Request a Demo</button>
<button class="btn-glass">Download Whitepaper</button>
</div>
</div>
</section>
<footer>© 2026 Zenith Inc. All rights reserved. Privacy · Terms · Security · Status</footer>
${scrollJS}
</body>
</html>`,
},
];
