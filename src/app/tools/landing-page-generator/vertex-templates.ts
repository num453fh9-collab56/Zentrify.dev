interface T {
  name: string; primary: string; secondary: string; accent: string;
  dark: string; darkAlt: string; text: string; light: string;
}

interface CardData {
  img: string;
  bg: string;
  overlayHtml: string;
}

interface BrowserProduct {
  img: string;
  tag?: string;
  name: string;
  desc: string;
  price: string;
  oldPrice?: string;
}

interface VertexConfig {
  brandName: string;
  brandSub: string;
  logoSvg: string;
  navLinks: string[];
  navCta: string;
  badgeText: string;
  heroLine1: string;
  heroLine2: string;
  subLine1: string;
  subLine2: string;
  heroCta: string;
  cards: CardData[];
  browserTitle: string;
  browserUrl: string;
  browserAnn: string;
  shopName: string;
  shopSub: string;
  heroImg: string;
  heroLabel: string;
  heroHeadline: string;
  heroBtnText: string;
  sectionTitle: string;
  products: BrowserProduct[];
  stripTexts: string[];
}

function hexToRgb(h: string): string {
  const r = parseInt(h.slice(1, 3), 16);
  const g = parseInt(h.slice(3, 5), 16);
  const b = parseInt(h.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

function darkenHex(h: string, f: number): string {
  const r = Math.round(parseInt(h.slice(1, 3), 16) * f);
  const g = Math.round(parseInt(h.slice(3, 5), 16) * f);
  const b = Math.round(parseInt(h.slice(5, 7), 16) * f);
  return `rgb(${r},${g},${b})`;
}

function vertexPage(cfg: VertexConfig, t: T): string {
  const rgb = hexToRgb(t.primary);
  const rgb2 = hexToRgb(t.secondary);
  const rgbA = hexToRgb(t.accent);

  let cardsHtml = '';
  for (let i = 0; i < 37; i++) {
    const c = cfg.cards[i % cfg.cards.length];
    cardsHtml += `<div class="card"><div class="fill" style="background:${c.bg}"></div>`;
    if (c.img) cardsHtml += `<img alt="" src="${c.img}" onerror="this.parentElement.classList.add('broken')">`;
    cardsHtml += c.overlayHtml + '<div class="edge"></div></div>';
  }

  let productsHtml = '';
  cfg.products.forEach(p => {
    productsHtml += `<div class="pgcard"><div class="ph"><img src="${p.img}" alt="${p.name}">${p.tag ? `<div class="tag">${p.tag}</div>` : ''}</div><b>${p.name}</b><i>${p.desc}</i><s>$ ${p.price}${p.oldPrice ? ` <span>$ ${p.oldPrice}</span>` : ''}</s></div>`;
  });

  let stripHtml = '';
  cfg.stripTexts.forEach(s => { stripHtml += `<span>${s}</span>`; });

  return `<!DOCTYPE html>
<html lang="en-US">
<head>
<meta charset="UTF-8">
<title>${cfg.brandName} — ${cfg.heroLine1} ${cfg.heroLine2}</title>
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,600;1,600&display=swap" rel="stylesheet">
<script>document.documentElement.classList.add('intro');setTimeout(function(){document.documentElement.classList.remove('intro')},4000);<\/script>
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{height:100%;overflow:hidden;background:${t.dark}}
body{font-family:Poppins,system-ui,sans-serif;color:#fff;-webkit-font-smoothing:antialiased}
a{text-decoration:none;color:inherit}
.stage{position:fixed;inset:0;overflow:hidden;background:${t.dark}}
.canvas{position:absolute;left:50%;top:0;width:1172px;height:657px;transform:translateX(-50%) scale(var(--k,1));transform-origin:50% 0}
.canvas>*{position:absolute}
.stack{position:absolute;inset:0;z-index:300}.stack>*{position:absolute}
.navmenu{display:contents}.burger{display:none}
.bg{position:absolute;inset:0;background:linear-gradient(180deg,rgba(${rgb},0) 38%,rgba(${rgb},.042) 54%,rgba(${rgb},.052) 68%,rgba(${rgb},.030) 100%),${t.dark}}
.stars{position:absolute;left:0;top:0;width:1px;height:1px;border-radius:50%;background:#fff}

.nav{left:247px;top:3px;width:678px;height:64px;border-radius:32px;z-index:400;background:rgba(255,255,255,.008);border:1px solid rgba(255,255,255,.105);-webkit-backdrop-filter:blur(16px) saturate(140%);backdrop-filter:blur(16px) saturate(140%);box-shadow:inset 0 1px 0 rgba(255,255,255,.03)}
.mark{position:absolute;left:21px;top:19px;width:24px;height:24px}
.mark svg{width:24px;height:24px;filter:drop-shadow(0 0 6px rgba(${rgb},.75))}
.wm{position:absolute;left:50px;top:0;white-space:nowrap}
.wm .kick{position:absolute;left:3px;top:20px;font-size:4.4px;font-weight:600;letter-spacing:.10em;color:#fff;opacity:.92;line-height:1}
.wm .name{position:absolute;left:0;top:26px;transform-origin:0 50%;font-family:Poppins;font-weight:900;font-size:22px;line-height:1;letter-spacing:-.01em;color:#fff}
.links{position:absolute;left:156px;top:0;height:62px;transform-origin:0 50%;display:flex;align-items:center;gap:24px}
.links a{font-size:12.5px;font-weight:400;color:rgba(255,255,255,.92);white-space:nowrap;transition:opacity .25s}
.links a:hover{opacity:.65}

.btn{display:grid;place-items:center;color:#fff;position:relative;overflow:hidden;background:linear-gradient(to top,${t.accent} 1px,${t.primary} 5px,${t.secondary} 8px,${darkenHex(t.secondary,.7)} 12px,${darkenHex(t.secondary,.45)} 18px,${darkenHex(t.secondary,.25)} 24px,${t.darkAlt} 34px,${t.dark} 100%);box-shadow:inset 0 3px 3px -2px rgba(${rgbA},.15),inset 1px 0 0 rgba(255,255,255,.09),inset -1px 0 0 rgba(255,255,255,.09),0 1px 0 rgba(${rgb},.38),1px 0 0 rgba(${rgb},.17),-1px 0 0 rgba(${rgb},.17),0 0 8px rgba(${rgb},.10),0 2px 5px -3px rgba(${rgb},.45);transition:transform .25s,box-shadow .25s,filter .25s}
.btn::before{content:"";position:absolute;left:22%;right:38%;top:.8px;height:1.9px;z-index:1;filter:blur(.55px);background:linear-gradient(90deg,rgba(${rgbA},0) 0%,rgba(${rgbA},.58) 34%,rgba(${rgbA},.74) 50%,rgba(${rgbA},.58) 66%,rgba(${rgbA},0) 100%)}
.btn::after{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;z-index:1;background:linear-gradient(90deg,rgba(${rgbA},.70),rgba(${rgbA},0) 13px),linear-gradient(270deg,rgba(${rgbA},.70),rgba(${rgbA},0) 13px);-webkit-mask:linear-gradient(to top,#000 0,#000 6px,rgba(0,0,0,.40) 12px,rgba(0,0,0,.15) 18px,rgba(0,0,0,.09) 24px,rgba(0,0,0,.02) 30px,rgba(0,0,0,.02) 100%);mask:linear-gradient(to top,#000 0,#000 6px,rgba(0,0,0,.40) 12px,rgba(0,0,0,.15) 18px,rgba(0,0,0,.09) 24px,rgba(0,0,0,.02) 30px,rgba(0,0,0,.02) 100%)}
.btn span{position:relative;z-index:2;display:block;line-height:1;text-shadow:0 1px 2px rgba(0,20,30,.5)}
.btn:hover{transform:translateY(-1px);filter:brightness(1.12);box-shadow:inset 0 1px 0 rgba(${rgbA},.6),inset 1px 0 0 rgba(${rgbA},.35),inset -1px 0 0 rgba(${rgbA},.35),0 6px 22px rgba(${rgb},.55)}
.nav .btn{position:absolute;left:530.7px;top:10.5px;width:125.5px;height:39.5px;border-radius:14px;font-size:14px;font-weight:500;letter-spacing:-.005em}
.cta2{position:absolute;left:526px;top:349px;width:121px;height:54.5px;border-radius:13px;font-size:17px;font-weight:500;letter-spacing:-.01em;z-index:300}
.cta2::before{display:none}

.badge{left:462px;top:95px;width:250px;height:39px;border-radius:12px;z-index:300;border:1px solid rgba(255,255,255,.115);background:linear-gradient(to top,rgba(${rgb},.175) 0px,rgba(${rgb},.10) 4px,rgba(255,255,255,.012) 9px,rgba(255,255,255,.012) 100%);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);box-shadow:inset 0 1px 0 rgba(255,255,255,.035)}
.badge i{position:absolute;left:4px;top:4px;width:29px;height:29px;border-radius:8px;display:grid;place-items:center;background:linear-gradient(to top,${t.primary} 0px,${t.secondary} 4px,${darkenHex(t.secondary,.5)} 10px,${t.darkAlt} 20px,${t.dark} 29px);box-shadow:inset 1px 0 0 rgba(${rgbA},.40),inset -1px 0 0 rgba(${rgbA},.52),0 0 6px rgba(${rgb},.20),0 3px 8px -5px rgba(${rgb},.6)}
.badge i svg{width:14px;height:16px;position:relative;top:-1px}
.badge b{position:absolute;left:45px;transform-origin:0 50%;top:0;height:39px;display:flex;align-items:center;font-size:13px;font-weight:400;color:rgba(255,255,255,.94);white-space:nowrap;padding-top:1.5px}

.h1{left:586px;transform:translateX(-50%);white-space:nowrap;line-height:1;font-family:Poppins;font-weight:900;font-size:54px;letter-spacing:-.004em;word-spacing:.175em;text-transform:uppercase;color:#fff;text-shadow:0 0 34px rgba(${rgb},.22);z-index:300}
.sub{left:586px;transform:translateX(-50%);white-space:nowrap;line-height:1;font-size:13.2px;color:${t.text};z-index:300}
.sub b{font-weight:600;color:#fff}.nb{white-space:nowrap}

.showcase{position:absolute;left:0;top:0;width:1172px;height:0}
.ring{position:absolute;left:0;top:0;width:1172px;height:657px;z-index:5;perspective:891px;perspective-origin:586px 918px;transform-style:preserve-3d;pointer-events:none}
.card{position:absolute;left:586px;top:616px;width:130px;height:300px;margin:-150px 0 0 -65px;border-radius:12px;overflow:hidden;background:${t.darkAlt};box-shadow:0 24px 46px rgba(0,0,0,.6),0 3px 8px rgba(0,0,0,.5);backface-visibility:hidden;will-change:transform}
.card img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.card .edge{position:absolute;inset:0;border-radius:12px;box-shadow:inset 0 0 0 1px rgba(255,255,255,.15),inset 0 16px 30px rgba(255,255,255,.05)}
.card.broken img{display:none}
.cv{position:absolute;left:0;right:0;padding:0 10px}
.fill{position:absolute;inset:0}
.ph{position:absolute;left:0;right:0;overflow:hidden;background:linear-gradient(155deg,#2b3b50,#131c28 60%,#1d1526)}
.phf{top:0;bottom:0}
.ph img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.t-big{font-family:Poppins;font-weight:900;text-transform:uppercase;line-height:.96;letter-spacing:-.015em;white-space:nowrap;transform:scaleX(.875);transform-origin:left center}
.t-serif{font-family:"Playfair Display",serif;line-height:1.02;letter-spacing:.01em;white-space:nowrap}

.browser{position:absolute;left:165px;top:558px;width:842px;height:calc(99px + var(--fill,0px));border-radius:28px 28px 0 0;overflow:hidden;z-index:100;box-shadow:0 -14px 44px rgba(0,0,0,.55)}
.browser::before{content:"";position:absolute;left:0;right:0;top:42px;bottom:0;background:rgba(20,20,26,.82);z-index:0}
.bar{position:absolute;left:0;top:0;width:100%;height:42px;background:linear-gradient(180deg,rgba(20,24,48,.48),rgba(15,19,36,.58));-webkit-backdrop-filter:blur(6px) saturate(112%);backdrop-filter:blur(6px) saturate(112%);z-index:1}
.dots{position:absolute;left:27px;top:16px;display:flex;gap:2.6px}
.dots i{width:7.6px;height:7.6px;border-radius:50%}
.omni{position:absolute;left:246px;top:7px;width:336px;height:26px;border-radius:5px;background:rgba(9,13,26,.93);box-shadow:inset 0 0 0 1px rgba(255,255,255,.045);display:flex;align-items:center;justify-content:center;gap:6px}
.omni svg{width:9px;height:9px;opacity:.72}
.omni span{font-size:9.5px;color:rgba(255,255,255,.72);letter-spacing:.005em}
.tools{position:absolute;right:27px;top:14px;display:flex;align-items:center;gap:4px;opacity:.9}
.tools svg{width:11px;height:12px}
.page{position:absolute;left:7px;right:6px;top:42px;bottom:0;background:#fff;color:#111;overflow:hidden;border-radius:10px 10px 0 0;z-index:1}
.ann{position:absolute;left:0;top:0;width:100%;height:16px;background:#101210;display:grid;place-items:center;border-radius:10px 10px 0 0}
.ann span{font-size:5px;letter-spacing:.06em;color:#cfcfcf}
.ann u{position:absolute;font-size:6px;color:#9a9a9a;text-decoration:none}
.shoplogo{position:absolute;left:50%;transform:translateX(-50%);top:24px;text-align:center}
.shoplogo em{font-family:"Playfair Display",serif;font-style:normal;font-weight:600;font-size:15px;letter-spacing:.14em;line-height:1;display:block}
.shoplogo i{font-style:normal;font-size:5px;letter-spacing:.3em;color:#3a3a3a;margin-top:3px;display:block}
.shopicons{position:absolute;right:100px;top:33px;display:flex;gap:5px;opacity:.85}
.shopicons svg{width:7px;height:7px}
.pagebody{position:absolute;left:0;right:0;top:62px;bottom:0;background:#fff;overflow:hidden}
.pghero{position:relative;margin:0 26px;height:158px;border-radius:7px;overflow:hidden;background:linear-gradient(120deg,#e8dcd4,#cbb6a8)}
.pghero img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.pghero .scrim{position:absolute;inset:0;background:linear-gradient(90deg,rgba(28,20,16,.62) 0%,rgba(28,20,16,.30) 46%,rgba(28,20,16,0) 72%)}
.pghero .copy{position:absolute;left:22px;top:50%;transform:translateY(-50%);color:#fff}
.pghero .copy u{font-size:4.6px;letter-spacing:.26em;text-transform:uppercase;opacity:.9;display:block;text-decoration:none}
.pghero .copy em{font-family:"Playfair Display",serif;font-style:normal;font-weight:600;font-size:15px;line-height:1.12;margin-top:6px;display:block}
.pghero .copy i{display:inline-block;font-style:normal;margin-top:10px;padding:5px 13px;border-radius:20px;background:#fff;color:#17181c;font-size:5.2px;font-weight:600;letter-spacing:.06em}
.pgsec{display:flex;align-items:baseline;justify-content:space-between;margin:16px 26px 9px}
.pgsec b{font-family:"Playfair Display",serif;font-weight:600;font-size:9px;color:#17181c}
.pgsec u{font-size:4.6px;letter-spacing:.14em;color:#8a8a8a;text-transform:uppercase;text-decoration:none}
.pggrid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin:0 26px}
.pgcard .ph{position:relative;height:0;padding-bottom:104%;border-radius:6px;overflow:hidden;background:linear-gradient(150deg,#efe7e1,#ddcfc6)}
.pgcard .ph img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.pgcard .tag{position:absolute;left:6px;top:6px;padding:2px 5px;border-radius:3px;background:#17181c;color:#fff;font-size:3.8px;font-weight:600;letter-spacing:.1em}
.pgcard b{display:block;margin-top:6px;font-size:5.4px;font-weight:600;color:#17181c;letter-spacing:.01em}
.pgcard i{display:block;font-style:normal;margin-top:2px;font-size:4.6px;color:#8a8a8a}
.pgcard s{display:block;margin-top:3px;font-size:5.6px;font-weight:700;color:#17181c;text-decoration:none}
.pgcard s span{font-weight:400;color:#a08f86;text-decoration:line-through;margin-left:4px;font-size:4.6px}
.pgstrip{display:flex;justify-content:space-between;margin:16px 26px 0;padding:9px 0;border-top:1px solid #eee6e0;border-bottom:1px solid #eee6e0}
.pgstrip span{font-size:4.4px;letter-spacing:.12em;color:#7d7169;text-transform:uppercase}

.wa{position:absolute;right:16px;bottom:24px;width:56px;height:56px;border-radius:50%;background:#25d366;display:grid;place-items:center;z-index:300;box-shadow:0 8px 20px rgba(0,0,0,.5)}
.wa svg{width:31px;height:31px}
.wa::after{content:"";position:absolute;inset:0;border-radius:50%;border:2px solid rgba(37,211,102,.5);animation:pulse 2.8s ease-out infinite}
@keyframes pulse{0%{transform:scale(1);opacity:.75}70%{transform:scale(1.4);opacity:0}100%{opacity:0}}

html.intro .nav{opacity:0;translate:0 -9px}
html.intro .mark,html.intro .wm,html.intro .links a,html.intro .nav .btn,html.intro .burger{opacity:0;translate:0 6px}
html.intro .badge{opacity:0;translate:0 11px;scale:.985}
html.intro .h1{opacity:0;translate:0 15px;clip-path:inset(100% 0 -30% 0)}
html.intro .sub{opacity:0;translate:0 10px}
html.intro .cta2{opacity:0;translate:0 13px;scale:.985}
html.intro .ring{opacity:0;translate:0 18px;scale:.99}
html.intro .browser{opacity:0;translate:0 26px}
html.intro .wa{opacity:0;scale:.88}
@media(prefers-reduced-motion:reduce){html.intro .nav,html.intro .mark,html.intro .wm,html.intro .links a,html.intro .nav .btn,html.intro .burger,html.intro .badge,html.intro .h1,html.intro .sub,html.intro .cta2,html.intro .ring,html.intro .browser,html.intro .wa{opacity:1;translate:none;scale:none;clip-path:none}.wa::after{animation:none}}

@media(max-width:1080px){
.burger{display:grid;place-content:center;gap:4px;position:absolute;right:12px;top:11px;width:42px;height:42px;padding:0;border:0;border-radius:14px;background:transparent;cursor:pointer;-webkit-tap-highlight-color:transparent}
.burger span{display:block;width:19px;height:1.6px;border-radius:2px;background:rgba(255,255,255,.92);transition:transform .28s cubic-bezier(.4,0,.2,1),opacity .18s}
.nav.open .burger span:nth-child(1){transform:translateY(5.6px) rotate(45deg)}
.nav.open .burger span:nth-child(2){opacity:0}
.nav.open .burger span:nth-child(3){transform:translateY(-5.6px) rotate(-45deg)}
.navmenu{display:block;position:absolute;left:0;right:0;top:74px;padding:12px;border-radius:22px;border:1px solid rgba(255,255,255,.10);background:linear-gradient(180deg,rgba(11,15,22,.985),rgba(7,10,16,.99));-webkit-backdrop-filter:blur(18px) saturate(140%);backdrop-filter:blur(18px) saturate(140%);box-shadow:0 26px 60px rgba(0,0,0,.6),inset 0 1px 0 rgba(255,255,255,.05);opacity:0;visibility:hidden;transform:translateY(-8px);transition:opacity .24s ease,transform .28s cubic-bezier(.4,0,.2,1),visibility .28s}
.nav.open .navmenu{opacity:1;visibility:visible;transform:none}
.links{position:static;display:flex;flex-direction:column;align-items:stretch;height:auto;gap:2px;transform:none!important}
.links a{font-size:15px;padding:11px 14px;border-radius:12px;color:rgba(255,255,255,.9);transition:background .2s,color .2s}
.nav .btn{position:static;width:100%;height:46px;margin-top:10px;font-size:15px}
}
@media(min-width:701px) and (max-width:1080px){
.nav{left:286px;width:620px}
.badge{left:448px;width:277px}
.stack{transform:translateY(var(--stshift,0px))}
.showcase{transform:translateY(var(--sshift,0px))}
.ring{transform:scale(var(--rs,1));transform-origin:586px 595px}
.wa{width:58px;height:58px;right:22px;bottom:26px}.wa svg{width:32px;height:32px}
}
@media(max-width:700px){
.canvas{position:relative;left:auto;top:auto;width:100%;height:100%;transform:none;display:flex;flex-direction:column;align-items:center;padding:0 20px}
.canvas>*{position:static}.stack{display:contents}
.nav{position:relative;left:auto;top:auto;width:100%;max-width:500px;height:58px;margin-top:clamp(10px,1.5vh,15px);flex:0 0 auto}
.mark{left:16px;top:calc(50% - 13px)}.wm{left:49px;top:0;height:100%}
.wm .kick{top:calc(50% - 15px);font-size:5px;letter-spacing:.2em}
.wm .name{top:calc(50% - 9px);font-size:18px;transform:scaleX(.88);transform-origin:left center}
.burger{right:8px;top:7px;width:44px;height:44px}
.badge{position:relative;left:auto;top:auto;margin-top:clamp(16px,2.6vh,26px);width:auto;max-width:100%;height:36px;flex:0 0 auto;border-radius:18px}
.badge b{position:relative;left:auto;top:auto;height:36px;padding:0 15px 0 42px;font-size:12.5px}
.badge i{top:4px;left:4px;width:28px;height:28px}
.h1{position:relative;left:auto;top:auto;transform:none;white-space:normal;text-align:center;font-size:clamp(29px,8.4vw,36px);line-height:1.06;letter-spacing:-.01em;max-width:7.4em}
.h1.l1{margin-top:clamp(12px,2.2vh,20px)}
.sub{position:relative;left:auto;top:auto;transform:none;white-space:normal;text-align:center;font-size:clamp(14px,3.9vw,15.5px);line-height:1.5;max-width:340px}
.sub.s1{margin-top:clamp(10px,1.8vh,16px)}
.cta2{position:relative;left:auto;top:auto;margin-top:clamp(16px,2.6vh,26px);flex:0 0 auto;width:auto;min-width:158px;height:52px;padding:0 26px;font-size:16px}
.showcase{position:relative;left:auto;top:auto;flex:1 1 auto;width:100%;height:auto;min-height:224px}
.ring{position:absolute;left:50%;margin-left:-586px;top:-446px;width:1172px;height:657px;transform-origin:586px 466px;transform:scale(1.02)}
.browser{position:absolute;left:50%;transform:translateX(-50%);top:212px;bottom:0;width:calc(100% + 40px);height:auto;border-radius:22px 22px 0 0}
.browser .bar{height:36px}
.omni{left:50%;transform:translateX(-50%);width:58%;height:24px;top:6px}
.dots{top:14px}.tools{display:none}
.page{top:36px}.pagebody{top:56px}
.pghero{margin:0 18px;height:122px;border-radius:10px}
.pgsec{margin:16px 18px 10px}.pgsec b{font-size:14px}
.pggrid{grid-template-columns:repeat(2,1fr);gap:14px;margin:0 18px}
.pgstrip{margin:16px 18px 0;flex-wrap:wrap;gap:5px 16px}.pgstrip span{font-size:8px}
.wa{width:54px;height:54px;right:14px;bottom:16px}.wa svg{width:29px;height:29px}
}
</style>
</head>
<body>
<div class="stage">
<div class="bg"></div>
<div id="stA" class="stars"></div>
<div id="stB" class="stars"></div>
<div class="canvas">
<nav class="nav">
<div class="mark">${cfg.logoSvg}</div>
<div class="wm"><div class="kick">${cfg.brandSub}</div><div class="name" id="wmName">${cfg.brandName}</div></div>
<div class="navmenu" id="navmenu">
<div class="links" id="links">${cfg.navLinks.map(l => `<a href="#">${l}</a>`).join('')}</div>
<a href="#" class="btn"><span id="ctaLabel">${cfg.navCta}</span></a>
</div>
<button class="burger" type="button" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>
</nav>
<div class="badge"><i><svg viewBox="5 1 14 22" preserveAspectRatio="none" fill="rgba(${rgb2},.72)" stroke="rgba(${rgbA},.6)" stroke-width="1.6" stroke-linejoin="round"><path d="M13.9 1.6 5.5 13.6a.7.7 0 0 0 .6 1.1h4.2l-1 7.7a.7.7 0 0 0 1.25.55l8.3-12.1a.7.7 0 0 0-.6-1.1h-4.2l1-7.7a.7.7 0 0 0-1.25-.55Z"/></svg></i><b id="badgeTxt">${cfg.badgeText}</b></div>
<div class="stack">
<div class="h1 l1" id="h1a">${cfg.heroLine1}</div>
<div class="h1" id="h1b">${cfg.heroLine2}</div>
<div class="sub s1" id="sub1">${cfg.subLine1}</div>
<div class="sub" id="sub2">${cfg.subLine2}</div>
<a href="#" class="btn cta2"><span id="vpLabel">${cfg.heroCta}</span></a>
</div>
<div class="showcase"><div class="ring" id="ring">${cardsHtml}</div></div>
<div class="browser">
<div class="bar">
<div class="dots"><i style="background:#ee5c62"></i><i style="background:#f6b719"></i><i style="background:#12c02f"></i></div>
<div class="omni"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.8-3.8"/></svg><span>${cfg.browserUrl}</span></div>
<div class="tools"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M12 16V4m0 0L8 8m4-4 4 4"/><path d="M4 15v5h16v-5"/></svg><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2"><path d="M12 5v14M5 12h14"/></svg></div>
</div>
<div class="page">
<div class="ann"><u style="left:20px">&#8249;</u><span>${cfg.browserAnn}</span><u style="right:20px">&#8250;</u></div>
<div class="shoplogo"><em>${cfg.shopName}</em><i>${cfg.shopSub}</i></div>
<div class="shopicons"><svg viewBox="0 0 24 24" fill="none" stroke="#222" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.8-3.8"/></svg><svg viewBox="0 0 24 24" fill="none" stroke="#222" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4.5 21c0-4.2 3.4-6.6 7.5-6.6s7.5 2.4 7.5 6.6"/></svg><svg viewBox="0 0 24 24" fill="none" stroke="#222" stroke-width="2"><path d="M5.5 8h13l-1.2 12H6.7L5.5 8Z"/><path d="M9 8V6.2A3 3 0 0 1 15 6.2V8"/></svg></div>
<div class="pagebody">
<div class="pghero"><img src="${cfg.heroImg}" alt="${cfg.heroHeadline}"><div class="scrim"></div><div class="copy"><u>${cfg.heroLabel}</u><em>${cfg.heroHeadline}</em><i>${cfg.heroBtnText}</i></div></div>
<div class="pgsec"><b>${cfg.sectionTitle}</b><u>see more</u></div>
<div class="pggrid">${productsHtml}</div>
<div class="pgstrip">${stripHtml}</div>
</div>
</div>
</div>
</div>
<a href="#" class="wa" aria-label="WhatsApp"><svg viewBox="0 0 32 32" fill="#fff"><path d="M16 3C8.8 3 3 8.8 3 16c0 2.3.6 4.5 1.7 6.4L3 29l6.8-1.7c1.8 1 3.9 1.7 6.2 1.7 7.2 0 13-5.8 13-13S23.2 3 16 3zm0 24c-2.1 0-4.1-.6-5.8-1.6l-.4-.2-4.2 1.1 1.1-4-.3-.4A10.9 10.9 0 0 1 5 16c0-6.1 4.9-11 11-11s11 4.9 11 11-4.9 11-11 11zm6-8.3c-.3-.2-1.9-1-2.2-1.1-.3-.1-.5-.2-.7.2s-.8 1.1-1 1.3-.4.2-.7 0c-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-2-1.8-2.3-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5s0-.4 0-.5c0-.2-.7-1.7-1-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4s-1 1-1 2.4 1.1 2.8 1.2 3 2.1 3.2 5.1 4.5c.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.9-.8 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.1-.3-.2-.6-.3z"/></svg></a>
</div>
<script>
(function(){
'use strict';
function mkStars(el,n,blur,aMin,aMax){var s=[];for(var i=0;i<n;i++){s.push((Math.random()*100).toFixed(1)+'vw '+(Math.random()*100).toFixed(1)+'vh '+blur+'px 0 rgba(255,255,255,'+(aMin+Math.random()*(aMax-aMin)).toFixed(2)+')');}el.style.boxShadow=s.join(',');}
mkStars(document.getElementById('stA'),150,0,.05,.30);
mkStars(document.getElementById('stB'),18,1.2,.35,.70);
var ring=document.getElementById('ring'),cards=[].slice.call(ring.children);
var N=cards.length,R=891,STEP=360/N,CULL=42,SPEED=1.9,DEG=Math.PI/180;
var phase=-2,last=0,frozen=false;
var rmq=window.matchMedia('(prefers-reduced-motion:reduce)');
if(rmq.matches)frozen=true;rmq.addEventListener('change',function(e){frozen=e.matches});
document.addEventListener('visibilitychange',function(){last=0});
function placeCards(){for(var i=0;i<N;i++){var a=((i*STEP+phase)%360+540)%360-180,el=cards[i];if(Math.abs(a)>CULL){el.style.visibility='hidden';continue}el.style.visibility='visible';var r=a*DEG,c=Math.cos(r),tx=R*Math.sin(r),tz=R*(1-c);el.style.transform='translate3d('+tx.toFixed(1)+'px,0,'+tz.toFixed(1)+'px) rotateY('+(-a).toFixed(2)+'deg)';el.style.filter='brightness('+(0.84+0.5*(1/c-1)).toFixed(3)+')';}}
function tick(t){requestAnimationFrame(tick);if(!frozen){if(!last){last=t;return}var dt=Math.min((t-last)/1000,.1);last=t;phase-=SPEED*dt}else{last=0}placeCards();}
var canvas=document.querySelector('.canvas'),mob=false;
var _ctx;function gCtx(){if(!_ctx){var c=document.createElement('canvas');_ctx=c.getContext('2d')}return _ctx}
function fontOf(el){var s=getComputedStyle(el);return{css:s.fontWeight+' '+s.fontSize+' '+s.fontFamily,size:parseFloat(s.fontSize)}}
function inkW(el){var k=mob?1:(window._k||1);return el.getBoundingClientRect().width/k}
function capR(el){var f=fontOf(el),ctx=gCtx();ctx.font=f.css.replace(f.size+'px','100px');var m=ctx.measureText('H');return(m.actualBoundingBoxAscent||70)/100}
function fitBox(el,tw,tc,pre){pre=pre||'';var cr=capR(el);el.style.fontSize=(tc/cr)+'px';el.style.transform=pre;var w=inkW(el);if(w>0)el.style.transform=pre+(pre?' ':'')+' scaleX('+(tw/w)+')';}
function bline(el,y){var f=fontOf(el),ctx=gCtx();ctx.font=f.css;var m=ctx.measureText('H');var A=m.fontBoundingBoxAscent||(f.size*.8),D=m.fontBoundingBoxDescent||(f.size*.2);el.style.top=(y-((f.size-(A+D))/2+A))+'px';}
var h1a=document.getElementById('h1a'),h1b=document.getElementById('h1b');
var sub1=document.getElementById('sub1'),sub2=document.getElementById('sub2');
var badgeTxt=document.getElementById('badgeTxt'),wmName=document.getElementById('wmName');
var ctaLabel=document.getElementById('ctaLabel'),vpLabel=document.getElementById('vpLabel');
var linksEl=document.getElementById('links');
function clearFit(){[h1a,h1b,sub1,sub2,badgeTxt,wmName,ctaLabel,vpLabel].forEach(function(el){if(el){el.style.fontSize='';el.style.top='';el.style.transform=''}});if(linksEl){linksEl.style.transform='';linksEl.querySelectorAll('a').forEach(function(a){a.style.fontSize=''})}}
function layout(){if(mob){clearFit();placeCards();return}var T=window._tb||1;fitBox(h1a,563.5*T,37.2*T,'translateX(-50%)');bline(h1a,204.5);fitBox(h1b,197.5*T,37.2*T,'translateX(-50%)');bline(h1b,258.5);fitBox(sub1,389*T,8.4*T,'translateX(-50%)');bline(sub1,300.5);fitBox(sub2,311*T,8.4*T,'translateX(-50%)');bline(sub2,316.5);fitBox(badgeTxt,184*T,9.4*T,'translate(2px,-1px)');fitBox(wmName,51*T,11.4*T,'');bline(wmName,38.5);fitBox(ctaLabel,87*T,8.9*T,'');fitBox(vpLabel,76*T,9.5*T,'');if(innerWidth>1080){linksEl.style.transform='';var kids=linksEl.querySelectorAll('a'),cr=capR(kids[0]),fs=7.9/cr;kids.forEach(function(a){a.style.fontSize=fs+'px'});var rw=inkW(linksEl);if(rw>0)linksEl.style.transform='scaleX('+(317/rw)+')';}else{linksEl.style.transform='';linksEl.querySelectorAll('a').forEach(function(a){a.style.fontSize=''})}placeCards();}
function resize(){var vw=innerWidth,vh=innerHeight;mob=vw<=700;if(mob){canvas.style.removeProperty('--k');canvas.style.removeProperty('--fill');canvas.style.removeProperty('--stshift');canvas.style.removeProperty('--sshift');canvas.style.removeProperty('--rs');layout();return}window._tb=1;if(vw>1080){var k=Math.min(vw/1172,vh/560);canvas.style.setProperty('--fill',Math.max(0,vh/k-657)+'px');canvas.style.removeProperty('--stshift');canvas.style.removeProperty('--sshift');canvas.style.removeProperty('--rs');canvas.style.setProperty('--k',k);window._k=k}else{var W=920+(vw-701)*(1172-920)/(1080-701);if(vh>vw*1.15)W=Math.min(W,900);var k=Math.min(vw/W,vh/560);var ramp=Math.min(1,(1080-vw)/120);window._tb=1+.14*ramp;var fill=Math.max(0,vh/k-657),ss=0,rs=1,st=0;if(fill>0){ss=Math.min(fill*.55,420)*ramp;rs=1+Math.min(fill/1100,.75)*ramp;st=Math.max(0,(219.5-125*rs+ss)/2-28)*ramp;fill-=ss;}canvas.style.setProperty('--stshift',st+'px');canvas.style.setProperty('--sshift',ss+'px');canvas.style.setProperty('--rs',rs);canvas.style.setProperty('--fill',Math.max(0,fill)+'px');canvas.style.setProperty('--k',k);window._k=k}layout();}
var nav=document.querySelector('.nav'),burger=document.querySelector('.burger');
function closeMenu(){nav.classList.remove('open');burger.setAttribute('aria-expanded','false')}
burger.addEventListener('click',function(){var o=nav.classList.toggle('open');burger.setAttribute('aria-expanded',o?'true':'false')});
document.addEventListener('click',function(e){if(nav.classList.contains('open')&&!nav.contains(e.target))closeMenu()});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&nav.classList.contains('open')){closeMenu();burger.focus()}});
addEventListener('resize',resize);if(visualViewport)visualViewport.addEventListener('resize',resize);
resize();document.fonts.ready.then(layout);setTimeout(layout,400);setTimeout(layout,1400);requestAnimationFrame(tick);
(function(){if(!document.documentElement.classList.contains('intro'))return;if(rmq.matches||!Element.prototype.animate){document.documentElement.classList.remove('intro');return}var D=innerWidth<=700?.66:1,n=0,lastA=null;var E='cubic-bezier(.16,1,.3,1)',S='cubic-bezier(.22,.61,.36,1)';function Y(px){return'0 '+(px*D)+'px'}function play(el,from,dur,delay,ease){if(!el)return;var to={opacity:1};if('translate'in from)to.translate='0 0';if('scale'in from)to.scale='1';if('clipPath'in from)to.clipPath='inset(-30% 0 -30% 0)';var a=el.animate([from,to],{duration:dur,delay:delay,fill:'both',easing:ease});a.id='intro:'+n++;lastA=a}function settle(){document.getAnimations().forEach(function(a){if(a.id&&a.id.indexOf('intro:')===0)a.cancel()});document.documentElement.classList.remove('intro')}play(document.querySelector('.nav'),{opacity:0,translate:Y(-9)},620,60,E);play(document.querySelector('.mark'),{opacity:0,translate:Y(6)},520,150,S);play(document.querySelector('.wm'),{opacity:0,translate:Y(6)},520,185,S);document.querySelectorAll('.links a').forEach(function(a,i){play(a,{opacity:0,translate:Y(6)},460,215+i*45,S)});play(document.querySelector('.burger'),{opacity:0,translate:Y(6)},460,300,S);play(document.querySelector('.nav .btn'),{opacity:0,translate:Y(6)},500,400,S);play(document.querySelector('.badge'),{opacity:0,translate:Y(11),scale:'.985'},560,270,E);play(h1a,{opacity:0,translate:Y(15),clipPath:'inset(100% 0 -30% 0)'},900,380,E);play(h1b,{opacity:0,translate:Y(15),clipPath:'inset(100% 0 -30% 0)'},900,470,E);play(sub1,{opacity:0,translate:Y(10)},620,690,E);play(sub2,{opacity:0,translate:Y(10)},620,745,E);play(document.querySelector('.cta2'),{opacity:0,translate:Y(13),scale:'.985'},620,830,E);play(document.querySelector('.ring'),{opacity:0,translate:Y(18),scale:'.99'},950,700,E);play(document.querySelector('.browser'),{opacity:0,translate:Y(26)},900,900,E);play(document.querySelector('.wa'),{opacity:0,scale:'.88'},500,1260,E);if(lastA)lastA.finished.then(settle).catch(settle);})();
})();
<\/script>
</body>
</html>`;
}

function makeLogoSvg(color1: string, color2: string): string {
  return `<svg viewBox="0 0 48 48" width="24" height="24"><defs><linearGradient id="sw" x1="8" y1="8" x2="40" y2="40" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${color1}"/><stop offset="1" stop-color="${color2}"/></linearGradient></defs><g transform="rotate(-32 24 24)"><ellipse cx="24" cy="24" rx="18.5" ry="9.6" stroke="${color1}" stroke-width="3.1" stroke-opacity=".4" stroke-linecap="round" stroke-dasharray="58 30" stroke-dashoffset="14" fill="none"/><circle cx="41.4" cy="20.6" r="3.1" fill="${color1}"/></g><circle cx="24" cy="24" r="6.6" fill="url(#sw)"/><circle cx="24" cy="24" r="2.6" fill="#fff"/></svg>`;
}

function photoCard(img: string): CardData {
  return { img, bg: '', overlayHtml: '<div class="fill" style="background:linear-gradient(180deg,rgba(4,8,16,0) 38%,rgba(4,8,16,.85) 68%)"></div>' };
}

function textOverCard(img: string, line1: string, line2: string, color: string): CardData {
  return { img, bg: '', overlayHtml: `<div class="fill" style="background:linear-gradient(180deg,rgba(4,8,16,0) 34%,rgba(4,8,16,.85) 68%)"></div><div class="cv t-serif" style="top:132px;font-size:16px;color:${color}">${line1}</div><div class="cv t-serif" style="top:150px;font-size:16px;color:${color}">${line2}</div>` };
}

function labelCard(img: string, label: string): CardData {
  return { img, bg: '', overlayHtml: `<div class="fill" style="background:linear-gradient(180deg,rgba(4,8,16,0) 38%,rgba(4,8,16,.85) 68%)"></div><div class="cv" style="top:150px;font-size:5.4px;font-weight:600;letter-spacing:.2em;color:#fff">${label}</div>` };
}

function saleCard(img: string, text: string, color: string): CardData {
  return { img, bg: '', overlayHtml: `<div class="fill" style="background:linear-gradient(180deg,rgba(3,9,20,0) 30%,rgba(3,9,20,.6) 48%,rgba(3,9,20,.95) 70%)"></div><div class="cv t-big" style="top:126px;font-size:10px;color:#fff;opacity:.9">Limited offer</div><div class="cv t-big" style="top:139px;font-size:22px;color:${color};text-shadow:0 0 16px ${color}80">${text}</div>` };
}

function gradientCard(img: string, gradient: string, topText: string, bigText1: string, bigText2: string): CardData {
  return { img, bg: gradient, overlayHtml: `<div class="ph" style="top:140px;bottom:0;opacity:.45;mix-blend-mode:screen"></div><div style="position:absolute;left:-6px;right:-6px;top:44px;height:13px;background:${topText.includes('FREE') ? '#ff2d8a' : '#333'};transform:rotate(-2.6deg)"></div><div style="position:absolute;left:0;right:0;top:45.5px;transform:rotate(-2.6deg);text-align:center;font-size:5.6px;font-weight:700;letter-spacing:.05em;color:#fff">${topText}</div><div class="cv t-big" style="top:64px;font-size:24px;color:#fff">${bigText1}</div><div class="cv t-big" style="top:87px;font-size:24px;color:#fff">${bigText2}</div>` };
}

function splitCard(img: string, bgColor: string, title: string, subtitle: string, btnText: string): CardData {
  return { img: '', bg: bgColor, overlayHtml: `<div class="ph" style="top:0;height:148px"><img alt="" src="${img}" onerror="this.parentElement.parentElement.classList.add('broken')"></div><div class="cv" style="top:158px;font-size:5.4px;font-weight:700;letter-spacing:.09em;color:#16171b">${title}</div><div class="cv" style="top:168px;font-size:4.2px;color:#7b8087">${subtitle}</div><div style="position:absolute;left:10px;top:180px;padding:4px 11px;border-radius:20px;background:#16171b;font-size:4.6px;font-weight:600;color:#fff;letter-spacing:.05em">${btnText}</div>` };
}

function heroSplitCard(img: string, bgGradient: string, text: string, color: string): CardData {
  return { img, bg: '', overlayHtml: `<div class="fill" style="background:${bgGradient}"></div><div class="ph" style="top:100px;bottom:0"><img alt="" src="${img}" onerror="this.parentElement.parentElement.classList.add('broken')"><div class="fill" style="background:linear-gradient(180deg,rgba(0,0,0,.85),rgba(0,0,0,0) 30%)"></div></div><div class="cv t-serif" style="top:36px;font-size:17px;color:${color}">${text}</div>` };
}

export const vertexTemplates = [

  // 1. FITNESS — GymForge
  {
    id: "vertex-gym",
    name: "GymForge — 3D Fitness",
    category: "Fitness",
    description: "Dark 3D carousel hero with rotating fitness cards, browser mockup gym store, starfield background, entrance animations.",
    thumb: "💪",
    getCode: (t: T) => vertexPage({
      brandName: "GYMFORGE",
      brandSub: "FITNESS",
      logoSvg: makeLogoSvg(t.primary, t.secondary),
      navLinks: ["Programs", "Trainers", "Nutrition", "Pricing", "Results"],
      navCta: "Start training",
      badgeText: "Transform your body today",
      heroLine1: "Unleash your",
      heroLine2: "Strength",
      subLine1: "<b>Personalized training / <span class='nb'>Nutrition</span></b> engineered for",
      subLine2: "performance, endurance, and lasting results.",
      heroCta: "View plans",
      cards: [
        photoCard("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80&auto=format"),
        textOverCard("https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80&auto=format", "PUSH YOUR", "LIMITS", "#fff"),
        splitCard("https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80&auto=format", "#fff", "MORNING WORKOUT", "Cardio · Strength · HIIT", "Join now"),
        labelCard("https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&q=80&auto=format", "SUPPLEMENTS"),
        saleCard("https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400&q=80&auto=format", "40% off", t.primary),
        photoCard("https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&q=80&auto=format"),
        heroSplitCard("https://images.unsplash.com/photo-1550345332-09e3ac987658?w=400&q=80&auto=format", "linear-gradient(168deg,#1a1a2e,#16213e)", "NEW SEASON", t.accent),
        labelCard("https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80&auto=format", "YOGA & STRETCH"),
        gradientCard("https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80&auto=format", "linear-gradient(158deg,#4a0c80,#7a16a6 40%,#5c0e90)", "FREE TRIAL WEEK", "Train", "Free"),
        textOverCard("https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&q=80&auto=format", "STRONG IS", "BEAUTIFUL", "#fff"),
      ],
      browserTitle: "GymForge",
      browserUrl: "gymforge.store - Equipment",
      browserAnn: "New arrivals in training gear",
      shopName: "FORGE",
      shopSub: "GYM EQUIPMENT",
      heroImg: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&q=80&auto=format",
      heroLabel: "Just launched",
      heroHeadline: "Train like a<br>champion.",
      heroBtnText: "SHOP NOW",
      sectionTitle: "Top sellers",
      products: [
        { img: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&q=80&auto=format", tag: "-30%", name: "Pro Kettlebell Set", desc: "Cast iron · 16kg", price: "89.90", oldPrice: "129.90" },
        { img: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400&q=80&auto=format", name: "Resistance Bands", desc: "5 levels · Latex", price: "34.90" },
        { img: "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=400&q=80&auto=format", tag: "NEW", name: "Smart Jump Rope", desc: "Digital counter", price: "49.90" },
        { img: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&q=80&auto=format", name: "Yoga Mat Ultra", desc: "6mm · Non-slip", price: "59.90" },
      ],
      stripTexts: ["Free shipping over $99", "30-day returns", "Expert support", "Lifetime warranty"],
    }, t),
  },

  // 2. FOOD DELIVERY — QuickBite
  {
    id: "vertex-food",
    name: "QuickBite — 3D Delivery",
    category: "Restaurant",
    description: "3D rotating food cards, warm gradients, browser mockup restaurant store, animated entrance with starfield.",
    thumb: "🍕",
    getCode: (t: T) => vertexPage({
      brandName: "QUICKBITE",
      brandSub: "DELIVERY",
      logoSvg: makeLogoSvg(t.primary, t.secondary),
      navLinks: ["Menu", "Restaurants", "How it works", "Plans", "Help"],
      navCta: "Order now",
      badgeText: "Fresh food at your doorstep",
      heroLine1: "Delicious meals",
      heroLine2: "Delivered",
      subLine1: "<b>Restaurant quality / <span class='nb'>Fast delivery</span></b> crafted with",
      subLine2: "fresh ingredients, local chefs, zero hassle.",
      heroCta: "See menu",
      cards: [
        photoCard("https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80&auto=format"),
        textOverCard("https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&q=80&auto=format", "TASTE THE", "FRESH", "#fff"),
        splitCard("https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80&auto=format", "#fff8f0", "WEEKLY SPECIAL", "Pasta · Salad · Dessert", "Order today"),
        labelCard("https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80&auto=format", "CHEF'S PICK"),
        saleCard("https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80&auto=format", "2 for 1", t.primary),
        photoCard("https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=80&auto=format"),
        heroSplitCard("https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80&auto=format", "linear-gradient(168deg,#3d1c00,#5a2d0a)", "NEW MENU!", t.accent),
        labelCard("https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&q=80&auto=format", "HEALTHY BOWLS"),
        gradientCard("https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80&auto=format", "linear-gradient(158deg,#8b2500,#c73b00 40%,#a02000)", "FREE DELIVERY TODAY", "Ships", "Free"),
        textOverCard("https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400&q=80&auto=format", "FRESH &", "LOCAL", "#fff"),
      ],
      browserUrl: "quickbite.delivery - Fresh Food",
      browserAnn: "Order before 2pm for same-day delivery",
      shopName: "BITE",
      shopSub: "FOOD DELIVERY",
      heroImg: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=80&auto=format",
      heroLabel: "Featured",
      heroHeadline: "Eat well,<br>live better.",
      heroBtnText: "ORDER NOW",
      sectionTitle: "Popular dishes",
      products: [
        { img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80&auto=format", tag: "BEST", name: "Truffle Pizza", desc: "Wood-fired · 12\"", price: "18.90" },
        { img: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80&auto=format", name: "Açaí Bowl", desc: "Fresh fruits · Granola", price: "12.90" },
        { img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=80&auto=format", tag: "-25%", name: "Salmon Poke Bowl", desc: "Premium · 350g", price: "15.90", oldPrice: "21.90" },
        { img: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&q=80&auto=format", name: "Wagyu Burger", desc: "A5 beef · Brioche", price: "22.90" },
      ],
      stripTexts: ["Free delivery over $25", "30 min guarantee", "Fresh daily", "Local restaurants"],
      browserTitle: "QuickBite",
    }, t),
  },

  // 3. TRAVEL — Wanderlust
  {
    id: "vertex-travel",
    name: "Wanderlust — 3D Travel",
    category: "Travel",
    description: "3D carousel with travel destination cards, browser mockup booking platform, animated hero with starfield.",
    thumb: "✈️",
    getCode: (t: T) => vertexPage({
      brandName: "WANDER",
      brandSub: "TRAVEL",
      logoSvg: makeLogoSvg(t.primary, t.secondary),
      navLinks: ["Destinations", "Packages", "Experiences", "Pricing", "About"],
      navCta: "Book a trip",
      badgeText: "Explore the world with us",
      heroLine1: "Adventure",
      heroLine2: "Awaits",
      subLine1: "<b>Curated journeys / <span class='nb'>Worldwide</span></b> designed for",
      subLine2: "discovery, relaxation, and unforgettable memories.",
      heroCta: "Explore",
      cards: [
        photoCard("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80&auto=format"),
        textOverCard("https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=400&q=80&auto=format", "ESCAPE", "TODAY", "#fff"),
        splitCard("https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=80&auto=format", "#f0f8ff", "BALI RETREAT", "7 nights · Villa · Spa", "Book now"),
        labelCard("https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&q=80&auto=format", "MOUNTAIN TREK"),
        saleCard("https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&q=80&auto=format", "30% off", t.primary),
        photoCard("https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=400&q=80&auto=format"),
        heroSplitCard("https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&q=80&auto=format", "linear-gradient(168deg,#0a2a4a,#0d3a63)", "WINTER DEALS", t.accent),
        labelCard("https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&q=80&auto=format", "CAMPING"),
        gradientCard("https://images.unsplash.com/photo-1488085061387-422e29b40080?w=400&q=80&auto=format", "linear-gradient(158deg,#004466,#006699 40%,#003355)", "FLY NOW PAY LATER", "Book", "Now"),
        textOverCard("https://images.unsplash.com/photo-1433838552652-f9a46b332c40?w=400&q=80&auto=format", "WILD &", "FREE", "#fff"),
      ],
      browserUrl: "wanderlust.travel - Destinations",
      browserAnn: "Early bird deals available now",
      shopName: "WANDER",
      shopSub: "TRAVEL AGENCY",
      heroImg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80&auto=format",
      heroLabel: "Featured trip",
      heroHeadline: "Find your<br>paradise.",
      heroBtnText: "DISCOVER",
      sectionTitle: "Top destinations",
      products: [
        { img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80&auto=format", tag: "HOT", name: "Bali, Indonesia", desc: "7 nights · All inclusive", price: "1,290", oldPrice: "1,890" },
        { img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80&auto=format", name: "Paris, France", desc: "5 nights · City break", price: "890" },
        { img: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=400&q=80&auto=format", tag: "NEW", name: "Maldives Resort", desc: "4 nights · Overwater", price: "2,490" },
        { img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=80&auto=format", name: "Swiss Alps", desc: "6 nights · Ski lodge", price: "1,590" },
      ],
      stripTexts: ["Best price guarantee", "24/7 support", "Free cancellation", "Trusted by 50k+"],
      browserTitle: "Wanderlust",
    }, t),
  },

  // 4. EDUCATION — LearnHub
  {
    id: "vertex-education",
    name: "LearnHub — 3D Courses",
    category: "Education",
    description: "3D rotating course cards, browser mockup learning platform, dark academia theme with starfield entrance animation.",
    thumb: "🎓",
    getCode: (t: T) => vertexPage({
      brandName: "LEARNHUB",
      brandSub: "ACADEMY",
      logoSvg: makeLogoSvg(t.primary, t.secondary),
      navLinks: ["Courses", "Paths", "Mentors", "Pricing", "Community"],
      navCta: "Start learning",
      badgeText: "Master new skills faster",
      heroLine1: "Learn without",
      heroLine2: "Limits",
      subLine1: "<b>Expert-led courses / <span class='nb'>Certificates</span></b> structured for",
      subLine2: "mastery, career growth, and real-world skills.",
      heroCta: "Browse",
      cards: [
        photoCard("https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80&auto=format"),
        textOverCard("https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&q=80&auto=format", "KEEP", "LEARNING", "#fff"),
        splitCard("https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&q=80&auto=format", "#f5f5ff", "PYTHON BOOTCAMP", "12 weeks · Certificate", "Enroll now"),
        labelCard("https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&q=80&auto=format", "DATA SCIENCE"),
        saleCard("https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80&auto=format", "50% off", t.primary),
        photoCard("https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&q=80&auto=format"),
        heroSplitCard("https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&q=80&auto=format", "linear-gradient(168deg,#1a0a2e,#2d1b4e)", "NEW PATHS", t.accent),
        labelCard("https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=80&auto=format", "WEB DEV"),
        gradientCard("https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=400&q=80&auto=format", "linear-gradient(158deg,#1a0a3a,#3a1a6a 40%,#2a0a5a)", "FREE FIRST MODULE", "Learn", "Free"),
        textOverCard("https://images.unsplash.com/photo-1513258496099-48168024aec0?w=400&q=80&auto=format", "GROW", "DAILY", "#fff"),
      ],
      browserUrl: "learnhub.academy - Courses",
      browserAnn: "New cohort starting this Monday",
      shopName: "HUB",
      shopSub: "LEARN ACADEMY",
      heroImg: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80&auto=format",
      heroLabel: "Featured course",
      heroHeadline: "Build your<br>future today.",
      heroBtnText: "ENROLL FREE",
      sectionTitle: "Popular courses",
      products: [
        { img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=80&auto=format", tag: "BEST", name: "Full-Stack Web Dev", desc: "16 weeks · Certificate", price: "299", oldPrice: "599" },
        { img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80&auto=format", name: "AI & Machine Learning", desc: "12 weeks · Advanced", price: "399" },
        { img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&q=80&auto=format", tag: "NEW", name: "UX Design Mastery", desc: "10 weeks · Portfolio", price: "249" },
        { img: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=400&q=80&auto=format", name: "Data Analytics", desc: "8 weeks · SQL + Python", price: "199" },
      ],
      stripTexts: ["Money-back guarantee", "Lifetime access", "Live mentorship", "Job placement help"],
      browserTitle: "LearnHub",
    }, t),
  },

  // 5. REAL ESTATE — HomeVault
  {
    id: "vertex-realestate",
    name: "HomeVault — 3D Property",
    category: "Real Estate",
    description: "3D carousel luxury property cards, browser mockup real estate listings, elegant dark hero with starfield.",
    thumb: "🏠",
    getCode: (t: T) => vertexPage({
      brandName: "HOMEVAULT",
      brandSub: "ESTATES",
      logoSvg: makeLogoSvg(t.primary, t.secondary),
      navLinks: ["Properties", "Neighborhoods", "Agents", "Mortgage", "Contact"],
      navCta: "Find a home",
      badgeText: "Your dream home awaits",
      heroLine1: "Luxury living",
      heroLine2: "Defined",
      subLine1: "<b>Premium properties / <span class='nb'>Worldwide</span></b> curated for",
      subLine2: "modern families, investors, and visionaries.",
      heroCta: "Browse",
      cards: [
        photoCard("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80&auto=format"),
        textOverCard("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80&auto=format", "MODERN", "LIVING", "#fff"),
        splitCard("https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80&auto=format", "#f8f5f0", "PENTHOUSE SUITE", "4 bed · Pool · City view", "View tour"),
        labelCard("https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&q=80&auto=format", "WATERFRONT"),
        saleCard("https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80&auto=format", "Price cut", t.primary),
        photoCard("https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80&auto=format"),
        heroSplitCard("https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80&auto=format", "linear-gradient(168deg,#1a1508,#2a2510)", "NEW LISTING", t.accent),
        labelCard("https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=400&q=80&auto=format", "COUNTRYSIDE"),
        gradientCard("https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&q=80&auto=format", "linear-gradient(158deg,#2a1a00,#5a3a10 40%,#3a2200)", "OPEN HOUSE WEEKEND", "Visit", "Today"),
        textOverCard("https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&q=80&auto=format", "HOME", "SWEET", "#fff"),
      ],
      browserUrl: "homevault.estate - Premium Listings",
      browserAnn: "Virtual tours now available for all properties",
      shopName: "VAULT",
      shopSub: "REAL ESTATE",
      heroImg: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80&auto=format",
      heroLabel: "Featured property",
      heroHeadline: "Find your<br>forever home.",
      heroBtnText: "VIEW LISTINGS",
      sectionTitle: "Featured properties",
      products: [
        { img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80&auto=format", tag: "HOT", name: "Modern Villa", desc: "4 bed · 3 bath · Pool", price: "1.2M", oldPrice: "1.5M" },
        { img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80&auto=format", name: "City Penthouse", desc: "3 bed · Rooftop · 2500sqft", price: "890K" },
        { img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80&auto=format", tag: "NEW", name: "Lake House", desc: "5 bed · Waterfront", price: "1.8M" },
        { img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&q=80&auto=format", name: "Beach Condo", desc: "2 bed · Ocean view", price: "650K" },
      ],
      stripTexts: ["Virtual tours", "Mortgage pre-approval", "Expert agents", "Trusted since 2010"],
      browserTitle: "HomeVault",
    }, t),
  },

  // 6. MUSIC — SoundWave
  {
    id: "vertex-music",
    name: "SoundWave — 3D Music",
    category: "Entertainment",
    description: "3D carousel with album/concert cards, browser mockup music store, vibrant neon-dark hero with animated entrance.",
    thumb: "🎵",
    getCode: (t: T) => vertexPage({
      brandName: "SOUNDWAVE",
      brandSub: "MUSIC",
      logoSvg: makeLogoSvg(t.primary, t.secondary),
      navLinks: ["Artists", "Albums", "Concerts", "Merch", "Radio"],
      navCta: "Start listening",
      badgeText: "Feel every beat, live",
      heroLine1: "Music that",
      heroLine2: "Moves",
      subLine1: "<b>Curated playlists / <span class='nb'>Live concerts</span></b> crafted for",
      subLine2: "discovery, vibes, and unforgettable nights.",
      heroCta: "Explore",
      cards: [
        photoCard("https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80&auto=format"),
        textOverCard("https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80&auto=format", "FEEL THE", "RHYTHM", "#fff"),
        splitCard("https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&q=80&auto=format", "#1a1a2e", "FRIDAY DROP", "New singles · Albums", "Listen now"),
        labelCard("https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80&auto=format", "DJ MIXES"),
        saleCard("https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&q=80&auto=format", "2x points", t.primary),
        photoCard("https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80&auto=format"),
        heroSplitCard("https://images.unsplash.com/photo-1501612780327-45045538702b?w=400&q=80&auto=format", "linear-gradient(168deg,#1a0028,#330044)", "LIVE TOUR", t.accent),
        labelCard("https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400&q=80&auto=format", "VINYL SHOP"),
        gradientCard("https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=400&q=80&auto=format", "linear-gradient(158deg,#2a004a,#5a0088 40%,#3a0066)", "EARLY ACCESS TICKETS", "Get", "First"),
        textOverCard("https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=400&q=80&auto=format", "SOUND", "ALIVE", "#fff"),
      ],
      browserUrl: "soundwave.fm - Music Store",
      browserAnn: "Stream ad-free with Premium",
      shopName: "WAVE",
      shopSub: "MUSIC STORE",
      heroImg: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=900&q=80&auto=format",
      heroLabel: "New release",
      heroHeadline: "Where sound<br>comes alive.",
      heroBtnText: "PLAY NOW",
      sectionTitle: "Trending albums",
      products: [
        { img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80&auto=format", tag: "NEW", name: "Midnight Sessions", desc: "Electronic · 12 tracks", price: "14.99" },
        { img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&q=80&auto=format", name: "Acoustic Dreams", desc: "Indie · 10 tracks", price: "11.99" },
        { img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80&auto=format", tag: "HOT", name: "Bass Culture Vol.3", desc: "Hip-hop · 18 tracks", price: "16.99", oldPrice: "22.99" },
        { img: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400&q=80&auto=format", name: "Classical Revival", desc: "Orchestral · 8 pieces", price: "9.99" },
      ],
      stripTexts: ["Lossless audio", "Offline mode", "Artist direct", "Concert pre-sale"],
      browserTitle: "SoundWave",
    }, t),
  },

  // 7. TECH / SaaS — DevStack
  {
    id: "vertex-tech",
    name: "DevStack — 3D SaaS",
    category: "Tech / SaaS",
    description: "3D carousel with dashboard/code cards, browser mockup developer platform, sleek dark hero with code aesthetic.",
    thumb: "⚡",
    getCode: (t: T) => vertexPage({
      brandName: "DEVSTACK",
      brandSub: "PLATFORM",
      logoSvg: makeLogoSvg(t.primary, t.secondary),
      navLinks: ["Features", "Docs", "Integrations", "Pricing", "Blog"],
      navCta: "Get started",
      badgeText: "Ship faster with confidence",
      heroLine1: "Build deploy",
      heroLine2: "Scale",
      subLine1: "<b>CI/CD pipelines / <span class='nb'>Cloud-native</span></b> engineered for",
      subLine2: "speed, reliability, and developer happiness.",
      heroCta: "Try free",
      cards: [
        photoCard("https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80&auto=format"),
        textOverCard("https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&q=80&auto=format", "CODE", "SHIP", "#fff"),
        splitCard("https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80&auto=format", "#0d1117", "DEPLOY IN 60S", "One click · Zero config", "Try now"),
        labelCard("https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80&auto=format", "CLOUD NATIVE"),
        saleCard("https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&q=80&auto=format", "Pro free", t.primary),
        photoCard("https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80&auto=format"),
        heroSplitCard("https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&q=80&auto=format", "linear-gradient(168deg,#020824,#0a1a3e)", "V3 IS HERE", t.accent),
        labelCard("https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80&auto=format", "ANALYTICS"),
        gradientCard("https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=80&auto=format", "linear-gradient(158deg,#001a33,#003366 40%,#002244)", "FREE TIER FOREVER", "Start", "Free"),
        textOverCard("https://images.unsplash.com/photo-1537432376149-e84978e4398e?w=400&q=80&auto=format", "FAST &", "SECURE", "#fff"),
      ],
      browserUrl: "devstack.io - Developer Platform",
      browserAnn: "99.99% uptime guaranteed",
      shopName: "STACK",
      shopSub: "DEV PLATFORM",
      heroImg: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&auto=format",
      heroLabel: "New feature",
      heroHeadline: "Deploy with<br>confidence.",
      heroBtnText: "GET STARTED",
      sectionTitle: "Popular tools",
      products: [
        { img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80&auto=format", tag: "FREE", name: "CI/CD Pipeline", desc: "Unlimited builds", price: "0" },
        { img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80&auto=format", name: "Edge Functions", desc: "Global · Sub 50ms", price: "29/mo" },
        { img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80&auto=format", tag: "NEW", name: "Managed Postgres", desc: "Auto-scale · Replicas", price: "49/mo" },
        { img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80&auto=format", name: "Analytics Suite", desc: "Real-time · Privacy-first", price: "19/mo" },
      ],
      stripTexts: ["Free tier forever", "SOC2 compliant", "99.99% uptime", "Open source core"],
      browserTitle: "DevStack",
    }, t),
  },

  // 8. CRYPTO — CoinEdge
  {
    id: "vertex-crypto",
    name: "CoinEdge — 3D Crypto",
    category: "Finance",
    description: "3D carousel with crypto/trading cards, browser mockup exchange platform, dark gold-accent hero with starfield.",
    thumb: "₿",
    getCode: (t: T) => vertexPage({
      brandName: "COINEDGE",
      brandSub: "EXCHANGE",
      logoSvg: makeLogoSvg(t.primary, t.secondary),
      navLinks: ["Markets", "Trade", "Staking", "NFTs", "Wallet"],
      navCta: "Start trading",
      badgeText: "Secure crypto exchange",
      heroLine1: "Trade the",
      heroLine2: "Future",
      subLine1: "<b>Spot & futures / <span class='nb'>DeFi staking</span></b> powered by",
      subLine2: "security, speed, and institutional-grade liquidity.",
      heroCta: "Trade now",
      cards: [
        photoCard("https://images.unsplash.com/photo-1639762681057-408e52192e55?w=400&q=80&auto=format"),
        textOverCard("https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=400&q=80&auto=format", "HODL", "STRONG", "#fff"),
        splitCard("https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&q=80&auto=format", "#0d1117", "BTC/USDT", "24h vol: $2.4B", "Trade pair"),
        labelCard("https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=400&q=80&auto=format", "STAKING"),
        saleCard("https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=400&q=80&auto=format", "0% fees", t.primary),
        photoCard("https://images.unsplash.com/photo-1634704784915-aacf363b021f?w=400&q=80&auto=format"),
        heroSplitCard("https://images.unsplash.com/photo-1621504450181-5d356f61d307?w=400&q=80&auto=format", "linear-gradient(168deg,#1a1500,#2a2200)", "NEW COINS", t.accent),
        labelCard("https://images.unsplash.com/photo-1644143379190-79e8f684c4f2?w=400&q=80&auto=format", "NFT MARKET"),
        gradientCard("https://images.unsplash.com/photo-1643101809204-6fb869816dbe?w=400&q=80&auto=format", "linear-gradient(158deg,#1a0a00,#3a2200 40%,#2a1500)", "WELCOME BONUS $100", "Join", "Free"),
        textOverCard("https://images.unsplash.com/photo-1639322537228-f710d846310a?w=400&q=80&auto=format", "TO THE", "MOON", "#fff"),
      ],
      browserUrl: "coinedge.exchange - Markets",
      browserAnn: "Bank-grade security • Insured assets",
      shopName: "EDGE",
      shopSub: "CRYPTO EXCHANGE",
      heroImg: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=900&q=80&auto=format",
      heroLabel: "Live markets",
      heroHeadline: "Trade with<br>zero limits.",
      heroBtnText: "OPEN ACCOUNT",
      sectionTitle: "Trending coins",
      products: [
        { img: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=400&q=80&auto=format", tag: "BTC", name: "Bitcoin", desc: "+5.2% · Market cap $1.2T", price: "67,420" },
        { img: "https://images.unsplash.com/photo-1621504450181-5d356f61d307?w=400&q=80&auto=format", name: "Ethereum", desc: "+3.8% · Market cap $400B", price: "3,580" },
        { img: "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=400&q=80&auto=format", tag: "HOT", name: "Solana", desc: "+12.4% · Market cap $80B", price: "178.50" },
        { img: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=400&q=80&auto=format", name: "Cardano", desc: "+2.1% · Staking 5% APY", price: "0.62" },
      ],
      stripTexts: ["Bank-grade security", "Instant deposits", "24/7 trading", "Regulated exchange"],
      browserTitle: "CoinEdge",
    }, t),
  },

  // 9. FASHION — StyleVault
  {
    id: "vertex-fashion",
    name: "StyleVault — 3D Fashion",
    category: "Fashion / Lifestyle",
    description: "3D carousel with fashion/runway cards, browser mockup clothing store, elegant dark hero with animated entrance.",
    thumb: "👗",
    getCode: (t: T) => vertexPage({
      brandName: "STYLEVAULT",
      brandSub: "FASHION",
      logoSvg: makeLogoSvg(t.primary, t.secondary),
      navLinks: ["Collections", "Lookbook", "Designers", "Sale", "Journal"],
      navCta: "Shop now",
      badgeText: "Curated designer fashion",
      heroLine1: "Wear your",
      heroLine2: "Confidence",
      subLine1: "<b>Designer pieces / <span class='nb'>Streetwear</span></b> curated for",
      subLine2: "bold expression, timeless style, and individuality.",
      heroCta: "Shop new",
      cards: [
        photoCard("https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80&auto=format"),
        textOverCard("https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&q=80&auto=format", "RUNWAY", "READY", "#fff"),
        splitCard("https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80&auto=format", "#fff", "FALL COLLECTION", "Minimal · Elegant", "View all"),
        labelCard("https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&q=80&auto=format", "STREETWEAR"),
        saleCard("https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=80&auto=format", "60% off", t.primary),
        photoCard("https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80&auto=format"),
        heroSplitCard("https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&q=80&auto=format", "linear-gradient(168deg,#2a0a1a,#440a2a)", "EXCLUSIVE", t.accent),
        labelCard("https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80&auto=format", "ACCESSORIES"),
        gradientCard("https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80&auto=format", "linear-gradient(158deg,#3a0020,#6a0038 40%,#4a0028)", "FREE SHIPPING WEEK", "Style", "Yours"),
        textOverCard("https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&q=80&auto=format", "BOLD &", "ICONIC", "#fff"),
      ],
      browserUrl: "stylevault.fashion - Designer Wear",
      browserAnn: "New collection just dropped",
      shopName: "VAULT",
      shopSub: "DESIGNER FASHION",
      heroImg: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=900&q=80&auto=format",
      heroLabel: "Just dropped",
      heroHeadline: "Define your<br>own style.",
      heroBtnText: "SHOP COLLECTION",
      sectionTitle: "New arrivals",
      products: [
        { img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80&auto=format", tag: "-40%", name: "Silk Midi Dress", desc: "Black · XS-XL", price: "189", oldPrice: "320" },
        { img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&q=80&auto=format", name: "Oversized Blazer", desc: "Camel · Wool blend", price: "259" },
        { img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=80&auto=format", tag: "NEW", name: "Leather Tote Bag", desc: "Italian leather", price: "349" },
        { img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80&auto=format", name: "Minimal Watch", desc: "Rose gold · Swiss", price: "429" },
      ],
      stripTexts: ["Free returns", "Authentic guaranteed", "Express shipping", "Personal styling"],
      browserTitle: "StyleVault",
    }, t),
  },

  // 10. E-COMMERCE — ShopSphere
  {
    id: "vertex-ecommerce",
    name: "ShopSphere — 3D Store",
    category: "E-Commerce",
    description: "3D carousel with product showcase cards, browser mockup e-commerce platform, versatile dark hero with animated entrance.",
    thumb: "🛒",
    getCode: (t: T) => vertexPage({
      brandName: "SHOPSPHERE",
      brandSub: "STORE",
      logoSvg: makeLogoSvg(t.primary, t.secondary),
      navLinks: ["Products", "Categories", "Deals", "Reviews", "Support"],
      navCta: "Start selling",
      badgeText: "The modern commerce platform",
      heroLine1: "Sell anything",
      heroLine2: "Anywhere",
      subLine1: "<b>Multi-channel / <span class='nb'>Global reach</span></b> designed for",
      subLine2: "growth, conversion, and seamless operations.",
      heroCta: "Start free",
      cards: [
        photoCard("https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80&auto=format"),
        textOverCard("https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&q=80&auto=format", "TRENDING", "NOW", "#fff"),
        splitCard("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80&auto=format", "#fff", "TECH GADGETS", "Speakers · Watches · Audio", "Shop all"),
        labelCard("https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&q=80&auto=format", "BESTSELLERS"),
        saleCard("https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80&auto=format", "Flash sale", t.primary),
        photoCard("https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&q=80&auto=format"),
        heroSplitCard("https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80&auto=format", "linear-gradient(168deg,#1a0a0a,#2e1414)", "JUST IN", t.accent),
        labelCard("https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80&auto=format", "HOME DECOR"),
        gradientCard("https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80&auto=format", "linear-gradient(158deg,#0a001a,#220044 40%,#150033)", "MEGA SALE WEEK", "Huge", "Deals"),
        textOverCard("https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&q=80&auto=format", "SHOP", "SMART", "#fff"),
      ],
      browserUrl: "shopsphere.store - Marketplace",
      browserAnn: "Mega sale: up to 70% off everything",
      shopName: "SPHERE",
      shopSub: "MARKETPLACE",
      heroImg: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=80&auto=format",
      heroLabel: "Featured",
      heroHeadline: "Shop the<br>future today.",
      heroBtnText: "BROWSE DEALS",
      sectionTitle: "Hot products",
      products: [
        { img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80&auto=format", tag: "-35%", name: "Smart Watch Pro", desc: "AMOLED · GPS · 7-day", price: "199", oldPrice: "299" },
        { img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80&auto=format", name: "Studio Headphones", desc: "ANC · 40h battery", price: "149" },
        { img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80&auto=format", tag: "HOT", name: "Runner Ultra Boost", desc: "Knit · Cloud sole", price: "179" },
        { img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80&auto=format", name: "Aviator Sunglasses", desc: "UV400 · Titanium", price: "89" },
      ],
      stripTexts: ["Free shipping worldwide", "Easy returns", "Buyer protection", "Pay in installments"],
      browserTitle: "ShopSphere",
    }, t),
  },

];
