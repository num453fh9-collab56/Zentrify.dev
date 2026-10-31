export const premiumTemplates = [
  {
    id: "premium-kairn-alpine",
    name: "KAIRN — Alpine 26",
    category: "E-Commerce",
    description: "Icy editorial product hero with a full-bleed photo and looping film, scaled 1546×1017 canvas, cyan lens cards, frosted glass and a cream goggle card.",
    thumb: "🏔️",
    getCode: () => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>KAIRN — Alpine 26</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Anybody:wdth,wght@75..150,100..900&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
:root{--ice:#44DAFD;--cream:#F3F1E9;--ink:#0A2238;--plate:url("https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/18a4a3c1-2af7-4c4a-9045-f6ddff26f4ca.jpg")}
*{margin:0;padding:0;box-sizing:border-box;-webkit-font-smoothing:antialiased}body{font-family:'Inter',sans-serif;background:#dfe8ef;color:#fff;overflow-x:hidden}
.k-desktop{position:relative;width:100vw;height:100vh;overflow:hidden;background:#dfe8ef}
.k-canvas{position:absolute;width:1546px;height:1017px;left:50%;top:50%;transform:translate(-50%,-50%) scale(var(--k,1));transform-origin:center center}
.k-plate{position:absolute;inset:0;overflow:hidden;background:#dfe8ef}
.k-plate img,.k-plate video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 30%}
.k-video{opacity:0;transition:opacity .9s ease}.k-video.is-ready{opacity:1}
.k-shade{position:absolute;inset:0;pointer-events:none;background:linear-gradient(90deg,rgba(22,52,84,.34) 0%,rgba(22,52,84,0) 55%),linear-gradient(270deg,rgba(22,52,84,.2) 0%,rgba(22,52,84,0) 32%),linear-gradient(180deg,rgba(22,52,84,.12),transparent 26%,transparent 72%,rgba(22,52,84,.18))}
.k-head{position:absolute;top:0;left:0;right:0;z-index:6;display:flex;align-items:center;justify-content:space-between;padding:34px 48px 0}
.k-logo{font-family:'Anybody',sans-serif;font-stretch:125%;font-weight:700;font-size:28px;letter-spacing:.12em;color:#fff;text-decoration:none;line-height:1;display:flex;align-items:center}
.k-logo b{color:var(--ice);font-weight:700}
.k-center{position:absolute;left:50%;top:42px;transform:translateX(-50%);font-family:'Anybody',sans-serif;font-stretch:130%;font-weight:500;font-size:15.4px;letter-spacing:.18em;white-space:nowrap;color:rgba(255,255,255,.94)}
.k-center i{font-style:normal;color:rgba(255,255,255,.5);padding:0 10px}.k-actions{display:flex;align-items:center;gap:22px}
.k-account{width:26px;height:26px;border-radius:50%;border:1px solid rgba(255,255,255,.55);display:flex;align-items:center;justify-content:center}
.k-account svg{width:13px;height:13px;stroke:#fff;fill:none;stroke-width:1.4}
.k-bag{font-family:'Anybody',sans-serif;font-stretch:125%;font-size:12px;letter-spacing:.18em;font-weight:600;color:#fff}
.k-count{width:24px;height:24px;border-radius:50%;background:#fff;color:var(--ink);display:flex;align-items:center;justify-content:center;font-family:'Anybody',sans-serif;font-size:11.5px;font-weight:700}
.k-left{position:absolute;left:62px;top:50%;transform:translateY(-52%);z-index:5;width:760px}.k-dots{display:flex;gap:8px;margin-bottom:26px}
.k-dot{width:8px;height:8px;border-radius:50%;border:1px solid rgba(255,255,255,.7);background:transparent;padding:0;cursor:pointer;transition:.25s}
.k-dot.is-active{background:var(--ice);border-color:var(--ice);box-shadow:0 0 12px rgba(68,218,253,.6)}
.k-eyebrow{font-family:'Anybody',sans-serif;font-stretch:125%;font-size:12px;letter-spacing:.3em;font-weight:500;color:rgba(255,255,255,.92);margin-bottom:16px}
.k-title{font-family:'Anybody',sans-serif;font-weight:300;font-stretch:126%;font-size:106px;line-height:.94;letter-spacing:-.025em;text-transform:uppercase;color:#fff}
.k-title .line{display:block;overflow:hidden;padding-bottom:6px}.k-title .line i{display:block;font-style:normal}
.k-title .outline i{color:transparent;-webkit-text-stroke:2px var(--ice);text-shadow:0 0 34px rgba(68,218,253,.18)}
.k-tiles{position:absolute;right:56px;top:50%;transform:translateY(-50%);z-index:5;display:grid;grid-template-columns:280px 280px;grid-template-rows:214px 252px;gap:14px}
.tile{border-radius:16px;position:relative;overflow:hidden}
.t-lens{background:var(--ice);color:#062238;padding:24px;display:flex;flex-direction:column;justify-content:space-between}
.t-lens::after{content:'';position:absolute;right:-42px;top:-54px;width:150px;height:150px;border-radius:50%;background:rgba(255,255,255,.32);filter:blur(2px)}
.t-lens .no{font-family:'Anybody',sans-serif;font-stretch:125%;font-size:10px;letter-spacing:.22em;font-weight:600;opacity:.72}
.t-lens h3{font-family:'Anybody',sans-serif;font-stretch:132%;font-weight:800;font-size:36px;line-height:.95;letter-spacing:-.01em}
.t-lens p{font-size:12px;font-weight:500;opacity:.7}.t-alpine{padding:20px 4px;display:flex;flex-direction:column;justify-content:center;color:var(--ink)}
.t-alpine .big{font-family:'Anybody',sans-serif;font-stretch:145%;font-weight:300;font-size:62px;line-height:.9;letter-spacing:-.02em;text-transform:uppercase}
.t-alpine .big em{font-style:normal;color:var(--ice);font-weight:200}
.t-alpine .cap{font-family:'Anybody',sans-serif;font-stretch:130%;font-size:9px;letter-spacing:.26em;font-weight:600;color:rgba(10,34,56,.55);margin-top:14px}
.t-glass{display:flex;align-items:center;justify-content:center}
.t-round{width:190px;height:190px;border-radius:50%;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.55);backdrop-filter:blur(14px);display:flex;align-items:center;justify-content:center;position:relative;cursor:pointer;transition:.35s}
.t-round:hover{background:rgba(255,255,255,.26);transform:scale(1.03)}
.t-round svg.ring{position:absolute;inset:-1px;width:calc(100% + 2px);height:calc(100% + 2px);transform:rotate(-90deg)}
.t-round .arrow{font-family:'Anybody',sans-serif;font-size:28px;color:var(--ice);line-height:1;margin-bottom:8px}
.t-round .idx{font-family:'Anybody',sans-serif;font-stretch:125%;font-size:11px;letter-spacing:.2em;color:#fff}
.t-product{background:var(--cream);color:var(--ink);padding:18px 20px;display:flex;flex-direction:column;justify-content:space-between;cursor:pointer;transition:.35s}
.t-product:hover{transform:translateY(-3px)}.t-goggle{height:118px;display:flex;align-items:center;justify-content:center}
.t-goggle svg{width:196px;height:auto;filter:drop-shadow(0 10px 16px rgba(14,40,60,.18))}.t-product .meta{display:flex;align-items:flex-end;justify-content:space-between;gap:10px}
.t-product .model{font-family:'Anybody',sans-serif;font-stretch:130%;font-size:10px;letter-spacing:.22em;font-weight:700;color:rgba(10,34,56,.5)}
.t-product .frame{font-family:'Anybody',sans-serif;font-stretch:124%;font-size:13px;letter-spacing:.1em;font-weight:700;border-bottom:1px solid rgba(10,34,56,.35);padding-bottom:3px;white-space:nowrap}
.k-story{position:absolute;left:62px;bottom:44px;z-index:6;width:350px;display:flex;gap:14px;align-items:center;padding:13px;border-radius:16px;background:rgba(22,52,84,.55);border:1px solid rgba(255,255,255,.18);backdrop-filter:blur(18px);box-shadow:0 18px 40px rgba(10,30,50,.18)}
.k-thumb{width:66px;height:66px;flex-shrink:0;border-radius:10px;background-image:var(--plate);background-size:cover;background-position:50% 30%}
.k-story .tag{font-family:'Anybody',sans-serif;font-stretch:125%;font-size:8.5px;letter-spacing:.2em;color:var(--ice);font-weight:700;margin-bottom:4px}
.k-story .copy{font-size:11.5px;line-height:1.5;color:rgba(255,255,255,.9)}
.k-story .more{display:inline-block;margin-top:5px;font-size:10.5px;color:#fff;border-bottom:1px solid rgba(255,255,255,.55);padding-bottom:1px;text-decoration:none}
.k-rule{position:absolute;left:0;right:0;bottom:100px;height:1px;background:rgba(255,255,255,.4);transform-origin:left center;z-index:4}
.k-cta{position:absolute;left:50%;bottom:78px;transform:translateX(-50%);z-index:7;height:44px;padding:0 34px;border:none;border-radius:3px;background:var(--ice);color:#062238;font-family:'Anybody',sans-serif;font-stretch:125%;font-size:12.5px;font-weight:800;letter-spacing:.18em;cursor:pointer;transition:background .25s}
.k-cta:hover{background:#6FE3FF}.k-social{position:absolute;right:56px;bottom:38px;z-index:6;display:flex;align-items:center;gap:14px}
.k-social .lbl{font-family:'Anybody',sans-serif;font-stretch:125%;font-size:9.5px;letter-spacing:.22em;color:rgba(255,255,255,.85);margin-right:4px}
.k-soc{width:32px;height:32px;border-radius:50%;border:1px solid rgba(255,255,255,.45);display:flex;align-items:center;justify-content:center;color:#fff;text-decoration:none;transition:.25s}
.k-soc:hover{background:rgba(255,255,255,.14)}.k-soc.is-first{border-color:var(--ice);color:var(--ice)}.k-soc svg{width:13px;height:13px;fill:currentColor}
.k-head{animation:kFade .8s ease .1s both}.k-dots{animation:kFade .6s ease .28s both}.k-eyebrow{animation:kFade .6s ease .42s both}
.k-title .line:nth-child(1) i{animation:kType .8s cubic-bezier(.2,.75,.2,1) .5s both}.k-title .line:nth-child(2) i{animation:kType .8s cubic-bezier(.2,.75,.2,1) .66s both}
.k-title .line:nth-child(3) i{animation:kType .8s cubic-bezier(.2,.75,.2,1) .82s both}.t-lens{animation:kRise .7s cubic-bezier(.2,.75,.2,1) .8s both}
.t-alpine{animation:kRise .7s cubic-bezier(.2,.75,.2,1) .92s both}.t-glass{animation:kRise .7s cubic-bezier(.2,.75,.2,1) 1.04s both}
.t-product{animation:kRise .7s cubic-bezier(.2,.75,.2,1) 1.16s both}.k-story{animation:kRise .7s ease 1.3s both}.k-cta{animation:kFade .6s ease 1.4s both}
.k-rule{animation:kRule 1s cubic-bezier(.2,.75,.2,1) 1.25s both}.k-social{animation:kFade .6s ease 1.55s both}@keyframes kFade{from{opacity:0}to{opacity:1}}
@keyframes kRise{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:translateY(0)}}
@keyframes kType{from{opacity:0;transform:translateY(105%)}to{opacity:1;transform:translateY(0)}}@keyframes kRule{from{transform:scaleX(0)}to{transform:scaleX(1)}}
.k-mob{display:none}@media(max-width:1199px){.k-desktop{display:none}.k-mob{display:block;background:#e7eef2;color:var(--ink);min-height:100vh}
.km-head{display:flex;align-items:center;justify-content:space-between;padding:20px 28px;position:relative;z-index:20}
.km-logo{font-family:'Anybody',sans-serif;font-stretch:125%;font-weight:700;font-size:24px;letter-spacing:.12em;color:var(--ink);text-decoration:none}.km-logo b{color:var(--ice)}
.km-nav{display:flex;align-items:center;gap:22px}
.km-nav a{font-family:'Anybody',sans-serif;font-stretch:125%;font-size:11px;letter-spacing:.16em;color:var(--ink);text-decoration:none}
.km-burger{display:none;width:42px;height:42px;border-radius:50%;border:1px solid rgba(10,34,56,.25);background:transparent;align-items:center;justify-content:center;cursor:pointer}
.km-burger span{display:block;width:16px;height:1.5px;background:var(--ink);position:relative}
.km-burger span::before,.km-burger span::after{content:'';position:absolute;left:0;width:16px;height:1.5px;background:var(--ink)}
.km-burger span::before{top:-5px}.km-burger span::after{top:5px}.km-hero{position:relative;overflow:hidden;background:#dbe7ee}
.km-plate{position:relative;height:51vh;overflow:hidden}.km-plate img,.km-plate video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 24%}
.km-shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(22,52,84,.26),transparent 65%)}.km-copy{padding:34px 28px 30px;background:#e7eef2}
.km-eyebrow{font-family:'Anybody',sans-serif;font-stretch:125%;font-size:10px;letter-spacing:.28em;color:rgba(10,34,56,.6);margin:14px 0 10px}
.km-title{font-family:'Anybody',sans-serif;font-weight:300;font-stretch:118%;font-size:clamp(38px,9vw,68px);line-height:.95;letter-spacing:-.02em;text-transform:uppercase;color:var(--ink)}
.km-title span{display:block}.km-title .outline{color:transparent;-webkit-text-stroke:1.5px var(--ice)}
.km-dots{display:flex;gap:7px}.km-dot{width:7px;height:7px;border-radius:50%;border:1px solid rgba(10,34,56,.5)}.km-dot.on{background:var(--ice);border-color:var(--ice)}
.km-content{display:grid;grid-template-columns:1fr 1.1fr;gap:18px;padding:0 28px 30px;align-items:start;background:#e7eef2}
.km-tiles{display:grid;grid-template-columns:1fr 1fr;gap:10px}.km-tile{border-radius:14px;overflow:hidden;min-height:150px}
.km-tile.lens{background:var(--ice);color:#062238;padding:18px;display:flex;flex-direction:column;justify-content:space-between}
.km-tile.lens .no{font-family:'Anybody',sans-serif;font-size:8.5px;letter-spacing:.2em;font-weight:600;opacity:.7}
.km-tile.lens h3{font-family:'Anybody',sans-serif;font-stretch:130%;font-weight:800;font-size:23px;line-height:.95}.km-tile.lens p{font-size:10px;opacity:.7}
.km-tile.alpine{padding:14px 4px;color:var(--ink);display:flex;flex-direction:column;justify-content:center}
.km-tile.alpine .big{font-family:'Anybody',sans-serif;font-stretch:140%;font-weight:300;font-size:33px;line-height:.9}
.km-tile.alpine .big em{font-style:normal;color:var(--ice)}.km-tile.alpine .cap{font-size:7px;letter-spacing:.24em;font-weight:600;color:rgba(10,34,56,.5);margin-top:8px}
.km-tile.glass{display:flex;align-items:center;justify-content:center;min-height:130px}
.km-round{width:112px;height:112px;border-radius:50%;border:1px solid rgba(255,255,255,.7);background:rgba(255,255,255,.2);backdrop-filter:blur(10px);display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;color:#fff}
.km-round .arrow{font-family:'Anybody',sans-serif;font-size:19px;color:var(--ice);margin-bottom:4px}.km-round .idx{font-family:'Anybody',sans-serif;font-size:8.5px;letter-spacing:.16em}
.km-round svg{position:absolute;inset:-1px;width:calc(100% + 2px);height:calc(100% + 2px);transform:rotate(-90deg)}
.km-tile.product{background:var(--cream);padding:12px;display:flex;flex-direction:column;justify-content:space-between;color:var(--ink)}
.km-tile.product svg{width:100%;height:auto;margin:6px 0 10px}
.km-tile.product .model{font-family:'Anybody',sans-serif;font-size:8px;letter-spacing:.2em;font-weight:700;color:rgba(10,34,56,.45)}
.km-tile.product .frame{font-family:'Anybody',sans-serif;font-stretch:124%;font-size:10px;letter-spacing:.08em;font-weight:700;border-bottom:1px solid rgba(10,34,56,.35);padding-bottom:2px;margin-top:4px;align-self:flex-start}
.km-story{background:rgba(22,52,84,.92);border-radius:16px;padding:14px;display:flex;gap:12px;color:#fff;min-height:100%}
.km-story .thumb{width:54px;height:54px;flex-shrink:0;border-radius:9px;background-image:var(--plate);background-size:cover;background-position:50% 30%}
.km-story .tag{font-family:'Anybody',sans-serif;font-size:8px;letter-spacing:.18em;color:var(--ice);font-weight:700;margin-bottom:4px}
.km-story p{font-size:10.5px;line-height:1.55;color:rgba(255,255,255,.88)}
.km-story a{display:inline-block;margin-top:6px;font-size:10px;color:#fff;text-decoration:none;border-bottom:1px solid rgba(255,255,255,.5)}
.km-actions{position:relative;padding:28px 28px 30px;background:#e7eef2;text-align:center}
.km-actions::before{content:'';position:absolute;left:0;right:0;top:0;height:1px;background:rgba(10,34,56,.18)}
.km-cta{height:44px;padding:0 30px;border:none;border-radius:3px;background:var(--ice);color:#062238;font-family:'Anybody',sans-serif;font-stretch:125%;font-size:11.5px;font-weight:800;letter-spacing:.18em;cursor:pointer}
.km-cta:hover{background:#6FE3FF}.km-social{display:flex;align-items:center;justify-content:center;gap:12px;margin-top:22px;color:rgba(10,34,56,.7)}
.km-social .lbl{font-family:'Anybody',sans-serif;font-size:8.5px;letter-spacing:.2em;margin-right:2px}
.km-soc{width:30px;height:30px;border-radius:50%;border:1px solid rgba(10,34,56,.3);display:flex;align-items:center;justify-content:center;color:var(--ink);text-decoration:none}
.km-soc:first-of-type{border-color:var(--ice);color:#0a97b8}.km-soc svg{width:12px;height:12px;fill:currentColor}}@media(max-width:700px){.km-head{padding:16px 20px}
.km-nav{position:absolute;top:64px;right:20px;left:20px;background:#fff;border-radius:14px;box-shadow:0 18px 40px rgba(10,34,56,.18);padding:18px;flex-direction:column;align-items:flex-start;gap:16px;display:none}
.km-nav.open{display:flex}.km-burger{display:flex}.km-hero{min-height:100vh;display:flex;align-items:flex-end}.km-plate{position:absolute;inset:0;height:100%}
.km-plate img,.km-plate video{object-position:50% 18%}
.km-hero::after{content:'';position:absolute;left:0;right:0;bottom:0;height:45%;background:linear-gradient(180deg,transparent,rgba(10,30,50,.55));pointer-events:none}
.km-shade{background:linear-gradient(180deg,rgba(22,52,84,.18),transparent 40%)}.km-copy{position:relative;z-index:3;background:transparent;padding:0 20px 54px;color:#fff}
.km-eyebrow{color:rgba(255,255,255,.85)}.km-title{color:#fff}.km-dot{border-color:rgba(255,255,255,.6)}.km-content{grid-template-columns:1fr;padding:0 20px 26px;background:#e7eef2}
.km-story{order:2}.km-tiles{order:1}.km-actions{padding:24px 20px 30px}}@media(prefers-reduced-motion:reduce){
*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}.k-video,.km-video{display:none!important}}
</style>
</head>
<body>
<div id="kairn-app">
<!-- DESKTOP -->
<div class="k-desktop">
<div class="k-canvas">
<div class="k-plate">
<img src="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/18a4a3c1-2af7-4c4a-9045-f6ddff26f4ca.jpg" alt="Skier in white puffer suit and ice-blue goggles">
<video class="k-video" muted loop playsinline autoplay preload="auto" poster="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/18a4a3c1-2af7-4c4a-9045-f6ddff26f4ca.jpg"><source src="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/823d013d-bf03-4967-b08f-63c3752df435.mp4" type="video/mp4"></video>
</div>
<div class="k-shade"></div>
<header class="k-head">
<a href="#" class="k-logo"><b>KA</b>IRN</a>
<div class="k-center">COLLECTION <i>/</i> OUR WORLD</div>
<div class="k-actions">
<span class="k-account"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.4"/><path d="M5 20c.8-3.6 3.5-5.4 7-5.4s6.2 1.8 7 5.4"/></svg></span>
<span class="k-bag">BAG</span>
<span class="k-count">0</span>
</div>
</header>
<div class="k-left">
<div class="k-dots"><button class="k-dot is-active" aria-label="Slide 1"></button><button class="k-dot" aria-label="Slide 2"></button><button class="k-dot" aria-label="Slide 3"></button></div>
<div class="k-eyebrow">BUILT FOR THE WHITEST DAYS</div>
<h1 class="k-title"><span class="line"><i>FORM.</i></span><span class="line"><i>FUNCTION.</i></span><span class="line outline"><i>VISION</i></span></h1>
</div>
<div class="k-tiles">
<div class="tile t-lens"><div class="no">01 / LENS EDITION</div><div><h3>BLUE<br>/ FROST</h3><p style="margin-top:10px">A cooler perspective</p></div></div>
<div class="tile t-alpine"><div class="big">ALPINE<br><em>/</em> 26</div><div class="cap">COLLECTION MMXXVI</div></div>
<div class="tile t-glass"><div class="t-round" role="button" tabindex="0" aria-label="View next product"><svg class="ring" viewBox="0 0 152 152" fill="none"><circle cx="76" cy="76" r="75" stroke="rgba(255,255,255,.35)" stroke-width="1"/><circle cx="76" cy="76" r="75" stroke="#44DAFD" stroke-width="2" stroke-linecap="round" stroke-dasharray="118 353"/></svg><div class="arrow">↗</div><div class="idx">01 / 04</div></div></div>
<div class="tile t-product">
<div class="t-goggle"><svg viewBox="0 0 220 90" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="lensG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#BFEFFF"/><stop offset=".45" stop-color="#7FD8F5"/><stop offset=".7" stop-color="#3A86C8"/><stop offset="1" stop-color="#D8F7FF"/></linearGradient><linearGradient id="glintG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs><path d="M16 34c0-12 9-20 24-20h34c8 0 13 4 16 10 3-6 8-10 16-10h34c15 0 24 8 24 20v10c0 18-11 30-28 30-16 0-26-9-34-20-4-6-8-8-12-8s-8 2-12 8c-8 11-18 20-34 20-17 0-28-12-28-30V34Z" fill="#16202B"/><path d="M27 34c0-9 7-14 17-14h35c7 0 10 4 12 9l4 9c2 5 0 10-6 10H38c-7 0-11-5-11-12v-2Z" fill="url(#lensG)"/><path d="M103 38l4-9c2-5 5-9 12-9h35c10 0 17 5 17 14v2c0 7-4 12-11 12h-51c-6 0-8-5-6-10Z" fill="url(#lensG)"/><path d="M35 28l20-4 12 14-18 5-14-15Z" fill="url(#glintG)" opacity=".85"/><path d="M118 24l14 2 8 12-15 3-7-17Z" fill="url(#glintG)" opacity=".5"/><path d="M27 34c0-9 7-14 17-14h35c7 0 10 4 12 9" stroke="#EAFBFF" stroke-opacity=".55"/><path d="M146 20h30" stroke="#F3F1E9" stroke-width="5" stroke-linecap="round"/><path d="M14 40h-5c-4 0-6 3-6 7v6c0 4 2 7 6 7h4" stroke="#16202B" stroke-width="4"/><path d="M206 40h5c4 0 6 3 6 7v6c0 4-2 7-6 7h-4" stroke="#16202B" stroke-width="4"/></svg></div>
<div class="meta"><span class="model">MODEL 03</span><span class="frame">EXPLORE THE FRAME</span></div>
</div>
</div>
<div class="k-story"><div class="k-thumb"></div><div><div class="tag">GLACIER COLLECTION</div><div class="copy">Crafted for the summits. KAIRN goggles sharpen every view.<br><a href="#" class="more">Read more</a></div></div></div>
<div class="k-rule"></div>
<button class="k-cta">EXPLORE COLLECTION</button>
<div class="k-social"><span class="lbl">FOLLOW US</span><a href="#" class="k-soc is-first" aria-label="X"><svg viewBox="0 0 24 24"><path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-6.4L6.4 22H3.3l7.3-8.3L2.8 2h6.5l4.4 5.8L18.9 2Zm-1.1 18.1h1.7L8.3 3.8H6.5l11.3 16.3Z"/></svg></a><a href="#" class="k-soc" aria-label="Facebook"><svg viewBox="0 0 24 24"><path d="M14 9h3V5.5h-3c-2.5 0-4 1.6-4 4.2V12H7v3.5h3V22h3.5v-6.5h3l.5-3.5h-3.5V9.9c0-.6.3-.9 1-.9Z"/></svg></a><a href="#" class="k-soc" aria-label="Instagram"><svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.1 0-3.5 0-4.7.1-1.1.1-1.7.2-2.1.4-.5.2-.9.4-1.2.8-.4.3-.6.7-.8 1.2-.2.4-.3 1-.4 2.1-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c.1 1.1.2 1.7.4 2.1.2.5.4.9.8 1.2.3.4.7.6 1.2.8.4.2 1 .3 2.1.4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.1-.1 1.7-.2 2.1-.4.5-.2.9-.4 1.2-.8.4-.3.6-.7.8-1.2.2-.4.3-1 .4-2.1.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-1.1-.2-1.7-.4-2.1-.2-.5-.4-.9-.8-1.2-.3-.4-.7-.6-1.2-.8-.4-.2-1-.3-2.1-.4-1.2-.1-1.6-.1-4.7-.1Zm0 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8Zm0 8.1a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Zm6.2-8.3a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0Z"/></svg></a></div>
</div>
</div>
<!-- MOBILE / TABLET -->
<div class="k-mob">
<header class="km-head">
<a href="#" class="km-logo"><b>KA</b>IRN</a>
<nav class="km-nav" id="kmNav"><a href="#">COLLECTION</a><a href="#">OUR WORLD</a><a href="#">BAG (0)</a></nav>
<button class="km-burger" id="kmBurger" aria-label="Open menu" aria-expanded="false"><span></span></button>
</header>
<section class="km-hero">
<div class="km-plate">
<img src="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/18a4a3c1-2af7-4c4a-9045-f6ddff26f4ca.jpg" alt="Skier in white puffer suit and ice-blue goggles">
<video class="km-video" muted loop playsinline autoplay preload="auto" poster="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/18a4a3c1-2af7-4c4a-9045-f6ddff26f4ca.jpg"><source src="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/823d013d-bf03-4967-b08f-63c3752df435.mp4" type="video/mp4"></video>
<div class="km-shade"></div>
</div>
<div class="km-copy">
<div class="km-dots"><span class="km-dot on"></span><span class="km-dot"></span><span class="km-dot"></span></div>
<div class="km-eyebrow">BUILT FOR THE WHITEST DAYS</div>
<h1 class="km-title"><span>FORM.</span><span>FUNCTION.</span><span class="outline">VISION</span></h1>
</div>
</section>
<div class="km-content">
<div class="km-tiles">
<div class="km-tile lens"><div class="no">01 / LENS EDITION</div><div><h3>BLUE<br>/ FROST</h3><p style="margin-top:7px">A cooler perspective</p></div></div>
<div class="km-tile alpine"><div class="big">ALPINE<br><em>/</em> 26</div><div class="cap">COLLECTION MMXXVI</div></div>
<div class="km-tile glass"><div class="km-round"><svg viewBox="0 0 114 114" fill="none"><circle cx="57" cy="57" r="56" stroke="rgba(255,255,255,.4)" stroke-width="1"/><circle cx="57" cy="57" r="56" stroke="#44DAFD" stroke-width="2" stroke-linecap="round" stroke-dasharray="88 264"/></svg><div class="arrow">↗</div><div class="idx">01 / 04</div></div></div>
<div class="km-tile product"><svg viewBox="0 0 220 90" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 34c0-12 9-20 24-20h34c8 0 13 4 16 10 3-6 8-10 16-10h34c15 0 24 8 24 20v10c0 18-11 30-28 30-16 0-26-9-34-20-4-6-8-8-12-8s-8 2-12 8c-8 11-18 20-34 20-17 0-28-12-28-30V34Z" fill="#16202B"/><path d="M27 34c0-9 7-14 17-14h35c7 0 10 4 12 9l4 9c2 5 0 10-6 10H38c-7 0-11-5-11-12v-2Z" fill="#8FDCF7"/><path d="M103 38l4-9c2-5 5-9 12-9h35c10 0 17 5 17 14v2c0 7-4 12-11 12h-51c-6 0-8-5-6-10Z" fill="#6ECBF0"/><path d="M146 20h30" stroke="#F3F1E9" stroke-width="5" stroke-linecap="round"/></svg><div><div class="model">MODEL 03</div><div class="frame">EXPLORE THE FRAME</div></div></div>
</div>
<div class="km-story"><div class="thumb"></div><div><div class="tag">GLACIER COLLECTION</div><p>Crafted for the summits. KAIRN goggles sharpen every view.<br><a href="#">Read more</a></p></div></div>
</div>
<div class="km-actions"><button class="km-cta">EXPLORE COLLECTION</button><div class="km-social"><span class="lbl">FOLLOW US</span><a href="#" class="km-soc" aria-label="X"><svg viewBox="0 0 24 24"><path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-6.4L6.4 22H3.3l7.3-8.3L2.8 2h6.5l4.4 5.8L18.9 2Zm-1.1 18.1h1.7L8.3 3.8H6.5l11.3 16.3Z"/></svg></a><a href="#" class="km-soc" aria-label="Facebook"><svg viewBox="0 0 24 24"><path d="M14 9h3V5.5h-3c-2.5 0-4 1.6-4 4.2V12H7v3.5h3V22h3.5v-6.5h3l.5-3.5h-3.5V9.9c0-.6.3-.9 1-.9Z"/></svg></a><a href="#" class="km-soc" aria-label="Instagram"><svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.1 0-3.5 0-4.7.1-1.1.1-1.7.2-2.1.4-.5.2-.9.4-1.2.8-.4.3-.6.7-.8 1.2-.2.4-.3 1-.4 2.1-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c.1 1.1.2 1.7.4 2.1.2.5.4.9.8 1.2.3.4.7.6 1.2.8.4.2 1 .3 2.1.4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.1-.1 1.7-.2 2.1-.4.5-.2.9-.4 1.2-.8.4-.3.6-.7.8-1.2.2-.4.3-1 .4-2.1.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-1.1-.2-1.7-.4-2.1-.2-.5-.4-.9-.8-1.2-.3-.4-.7-.6-1.2-.8-.4-.2-1-.3-2.1-.4-1.2-.1-1.6-.1-4.7-.1Zm0 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8Zm0 8.1a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Zm6.2-8.3a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0Z"/></svg></a></div></div>
</div>
</div>
<script>
(function(){
  var app=document.getElementById('kairn-app');
  var canvas=app.querySelector('.k-canvas');
  function resize(){if(!canvas)return;var k=Math.min(window.innerWidth/1546,window.innerHeight/1017);canvas.style.setProperty('--k',k)}
  resize();window.addEventListener('resize',resize);
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var vids=app.querySelectorAll('.k-video,.km-video');
  if(reduce){vids.forEach(function(v){v.remove()})}else{
    vids.forEach(function(v){v.addEventListener('loadeddata',function(){v.classList.add('is-ready');v.play().catch(function(){})});v.addEventListener('playing',function(){v.classList.add('is-ready')})});
  }
  var dots=app.querySelectorAll('.k-dot');
  dots.forEach(function(d){d.addEventListener('click',function(){dots.forEach(function(x){x.classList.remove('is-active')});d.classList.add('is-active')})});
  var burger=document.getElementById('kmBurger'),nav=document.getElementById('kmNav');
  if(burger&&nav){burger.addEventListener('click',function(){var open=nav.classList.toggle('open');burger.setAttribute('aria-expanded',open?'true':'false')})}
})();
</script>
</body>
</html>`,
  },
  {
    id: "premium-terra-ember",
    name: "Terra & Ember — Fire Kitchen",
    category: "Restaurant",
    description: "Warm editorial restaurant page with split hero, tasting-menu list, opening hours and a reserved dark-olive and gold palette.",
    thumb: "🔥",
    getCode: () => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Terra &amp; Ember</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:#f3eee3;color:#23291d;overflow-x:hidden}a{text-decoration:none;color:inherit}
nav{display:flex;align-items:center;justify-content:space-between;padding:1.6rem 5%;max-width:1400px;margin:0 auto;border-bottom:1px solid rgba(35,41,29,.14)}
.logo{font-family:'Cormorant Garamond',serif;font-size:1.8rem;font-weight:600;letter-spacing:.04em}.logo span{color:#a9773c}
nav ul{list-style:none;display:flex;gap:2.2rem}nav ul a{font-size:.78rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#4a5040;transition:.2s}nav ul a:hover{color:#a9773c}
.nav-btn{border:1px solid #23291d;padding:.7rem 1.5rem;border-radius:2px;font-size:.7rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;transition:.25s}.nav-btn:hover{background:#23291d;color:#f3eee3}
.hero{display:grid;grid-template-columns:1fr 1fr;min-height:82vh;max-width:1400px;margin:0 auto}
.copy{padding:5rem 5% 4rem;display:flex;flex-direction:column;justify-content:center}
.eyebrow{display:flex;align-items:center;gap:.8rem;font-size:.7rem;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:#a9773c;margin-bottom:1.6rem}
.eyebrow::before{content:'';width:38px;height:1px;background:#a9773c}
h1{font-family:'Cormorant Garamond',serif;font-size:4.6rem;font-weight:500;line-height:1.02;letter-spacing:-.02em;margin-bottom:1.5rem}h1 em{font-style:italic;color:#a9773c}
.copy p{color:#5c6154;line-height:1.85;max-width:420px;font-size:.95rem;margin-bottom:2.2rem}.actions{display:flex;gap:1rem;flex-wrap:wrap;align-items:center}
.btn{background:#23291d;color:#f3eee3;padding:1rem 2rem;border-radius:2px;font-size:.72rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;transition:.25s}.btn:hover{background:#a9773c}
.link{font-size:.72rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;border-bottom:1px solid #23291d;padding-bottom:4px}
.hours{display:flex;gap:2.5rem;margin-top:3rem;padding-top:1.5rem;border-top:1px solid rgba(35,41,29,.14);font-size:.72rem;color:#6d7265}
.hours b{display:block;color:#23291d;letter-spacing:.08em;text-transform:uppercase;margin-bottom:.3rem;font-size:.66rem}.visual{position:relative;overflow:hidden;min-height:520px}
.visual img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.visual::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,#f3eee3 0%,transparent 18%)}
.stamp{position:absolute;right:2rem;bottom:2rem;z-index:2;width:110px;height:110px;border-radius:50%;border:1px solid rgba(255,255,255,.7);background:rgba(35,41,29,.4);backdrop-filter:blur(8px);color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:.6rem;letter-spacing:.18em;text-transform:uppercase;text-align:center;line-height:1.5}
.stamp b{font-family:'Cormorant Garamond',serif;font-size:1.5rem;letter-spacing:0;line-height:1;margin-bottom:.2rem}
.menu{max-width:1400px;margin:0 auto;padding:5rem 5% 6rem;display:grid;grid-template-columns:1.1fr 1.9fr;gap:4rem}
.menu h2{font-family:'Cormorant Garamond',serif;font-size:2.8rem;font-weight:500;line-height:1.1;margin-bottom:1rem}
.menu .intro{color:#6d7265;font-size:.9rem;line-height:1.8;max-width:300px}.dishes{display:grid;gap:0}
.dish{display:grid;grid-template-columns:1fr auto;align-items:baseline;gap:1rem;padding:1.35rem 0;border-bottom:1px solid rgba(35,41,29,.14)}
.dish h3{font-family:'Cormorant Garamond',serif;font-size:1.5rem;font-weight:600}.dish p{grid-column:1;color:#777c6e;font-size:.8rem;margin-top:.2rem}
.dish span{font-family:'Cormorant Garamond',serif;font-size:1.25rem;color:#a9773c}
footer{background:#23291d;color:#f3eee3;padding:2.5rem 5%;text-align:center;font-size:.72rem;letter-spacing:.08em;color:rgba(243,238,227,.55)}
@media(max-width:900px){.hero{grid-template-columns:1fr}.visual{min-height:380px;order:-1}.visual::after{background:linear-gradient(0deg,#f3eee3,transparent 20%)}h1{font-size:3.4rem}.menu{grid-template-columns:1fr;gap:2rem}}
@media(max-width:640px){nav ul{display:none}.copy{padding:3rem 5%}h1{font-size:2.7rem}.hours{gap:1.4rem}.menu{padding-top:3rem}}
</style>
</head>
<body>
<nav><a href="#" class="logo">Terra <span>&amp;</span> Ember</a><ul><li><a href="#menu">Menu</a></li><li><a href="#story">Our Story</a></li><li><a href="#visit">Visit</a></li></ul><a href="#visit" class="nav-btn">Reserve</a></nav>
<section class="hero">
<div class="copy">
<div class="eyebrow">Wood-fired kitchen · Est. 2018</div>
<h1>Fire, field<br><em>&amp; feast.</em></h1>
<p>Seasonal plates cooked over live flame, served in a warm room that feels like someone's home — because it used to be.</p>
<div class="actions"><a href="#visit" class="btn">Book a Table</a><a href="#menu" class="link">Explore the menu</a></div>
<div class="hours"><div><b>Dinner</b>Tue – Sun · 17:30 – 23:00</div><div><b>Lunch</b>Fri – Sun · 12:00 – 15:00</div></div>
</div>
<div class="visual"><img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&h=1100&fit=crop" alt="Warm restaurant interior"><div class="stamp"><b>08</b>years of fire</div></div>
</section>
<section class="menu" id="menu">
<div><h2>This week<br>at the hearth</h2><p class="intro">Menus change with the market. These are a few favourites from the current tasting.</p></div>
<div class="dishes">
<div class="dish"><h3>Ember-roasted celeriac</h3><p>hazelnut, brown butter, aged sheep's cheese</p><span>18</span></div>
<div class="dish"><h3>Hand-cut tagliatelle</h3><p>wild mushroom, thyme, parmesan broth</p><span>24</span></div>
<div class="dish"><h3>Coal-fired sea bass</h3><p>fennel, preserved lemon, salsa verde</p><span>32</span></div>
<div class="dish"><h3>Dry-aged ribeye</h3><p>bone marrow, charred onion, red wine</p><span>46</span></div>
<div class="dish"><h3>Burnt honey tart</h3><p>crème fraîche, pear, toasted oat</p><span>14</span></div>
</div>
</section>
<footer id="visit">© 2026 Terra &amp; Ember · 14 Mill Lane · Reserve at hello@terraember.com</footer>
</body></html>`,
  },
  {
    id: "premium-studio-vandal",
    name: "Studio Vandal — Creative Agency",
    category: "Agency",
    description: "Brutalist agency page with oversized type, acid-lime accents, border grid, scrolling marquee and an interactive project index.",
    thumb: "⚡",
    getCode: () => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Studio Vandal</title>
<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Space Mono',monospace;background:#f1f1ec;color:#0a0a0a;overflow-x:hidden}a{text-decoration:none;color:inherit}::selection{background:#c8ff3d;color:#0a0a0a}
.wrap{max-width:1440px;margin:0 auto;border-left:1px solid #0a0a0a;border-right:1px solid #0a0a0a}
header{display:flex;align-items:center;justify-content:space-between;padding:1.2rem 2rem;border-bottom:1px solid #0a0a0a;position:sticky;top:0;background:#f1f1ec;z-index:20}
.logo{font-family:'Archivo Black',sans-serif;font-size:1.25rem;letter-spacing:-.03em}.logo span{background:#c8ff3d;padding:0 .2em}
nav ul{list-style:none;display:flex;gap:1.8rem;font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em}
nav ul a{position:relative}.menu-btn{display:none;background:none;border:1px solid #0a0a0a;padding:.5rem .8rem;font-family:inherit;font-size:.7rem;font-weight:700;text-transform:uppercase;cursor:pointer}
.hero{position:relative;min-height:90vh;display:flex;flex-direction:column;justify-content:center;padding:3rem 2rem 2rem;border-bottom:1px solid #0a0a0a;overflow:hidden}
.hero-bg{position:absolute;inset:0;z-index:0}.hero-bg img{width:100%;height:100%;object-fit:cover;filter:grayscale(1) contrast(1.1)}
.hero-bg::after{content:'';position:absolute;inset:0;background:linear-gradient(135deg,#f1f1ec 30%,#f1f1ecdd 50%,#f1f1ec88 100%)}.hero>*{position:relative;z-index:1}
.hero .top{display:flex;justify-content:space-between;font-size:.68rem;text-transform:uppercase;letter-spacing:.12em;margin-bottom:2.5rem}
.hero h1{font-family:'Archivo Black',sans-serif;font-size:clamp(3.2rem,10vw,9.5rem);line-height:.84;letter-spacing:-.05em;text-transform:uppercase}
.hero h1 em{font-style:normal;display:inline-block;background:#c8ff3d;padding:0 .08em;transform:rotate(-1.5deg)}
.hero .sub{display:grid;grid-template-columns:1fr 1fr 1fr;gap:1.5rem;margin-top:2.5rem;padding-top:1.5rem;border-top:1px solid #0a0a0a;font-size:.75rem;line-height:1.7}
.hero .sub b{display:block;text-transform:uppercase;letter-spacing:.12em;font-size:.62rem;margin-bottom:.5rem}
.hero .arrow{position:absolute;right:2rem;bottom:2rem;font-size:2rem;width:64px;height:64px;border:1px solid #0a0a0a;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#f1f1ec;transition:.25s}
.hero .arrow:hover{background:#c8ff3d;transform:rotate(45deg)}
.marquee{border-bottom:1px solid #0a0a0a;overflow:hidden;background:#0a0a0a;color:#c8ff3d;padding:.7rem 0;white-space:nowrap}
.marquee div{display:inline-block;animation:slide 22s linear infinite;font-family:'Archivo Black',sans-serif;font-size:1rem;letter-spacing:.06em;text-transform:uppercase}
.marquee span{padding:0 1.2rem}.marquee i{font-style:normal;color:#f1f1ec}@keyframes slide{from{transform:translateX(0)}to{transform:translateX(-50%)}}.work{padding:0 2rem}
.work-head{display:flex;justify-content:space-between;align-items:end;padding:2.5rem 0 1.5rem;font-size:.7rem;text-transform:uppercase;letter-spacing:.12em}
.work-head h2{font-family:'Archivo Black',sans-serif;font-size:1.6rem;letter-spacing:-.02em}
.row{display:grid;grid-template-columns:60px 1fr 180px 70px;align-items:center;gap:1rem;padding:1.5rem 0;border-top:1px solid #0a0a0a;position:relative;transition:.25s}
.row:last-child{border-bottom:1px solid #0a0a0a}.row:hover{background:#c8ff3d;padding-left:1rem;padding-right:1rem}
.row .no{font-size:.7rem}.row h3{font-family:'Archivo Black',sans-serif;font-size:clamp(1.25rem,3vw,2.2rem);letter-spacing:-.03em;text-transform:uppercase}
.row .cat{font-size:.68rem;text-transform:uppercase;letter-spacing:.1em}.row .go{font-size:1.2rem;text-align:right}
.cta{padding:5rem 2rem;text-align:center;border-bottom:1px solid #0a0a0a}.cta p{font-size:.7rem;text-transform:uppercase;letter-spacing:.16em;margin-bottom:1.2rem}
.cta h2{font-family:'Archivo Black',sans-serif;font-size:clamp(2.2rem,6vw,5rem);letter-spacing:-.04em;text-transform:uppercase;line-height:.95}
.cta a{display:inline-block;margin-top:2rem;background:#0a0a0a;color:#f1f1ec;padding:1rem 2.4rem;font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.12em;transition:.25s}.cta a:hover{background:#c8ff3d;color:#0a0a0a}
footer{display:flex;justify-content:space-between;gap:1rem;padding:1.5rem 2rem;font-size:.65rem;text-transform:uppercase;letter-spacing:.1em;flex-wrap:wrap}
@media(max-width:800px){nav ul{display:none}.menu-btn{display:block}.hero .sub{grid-template-columns:1fr}.row{grid-template-columns:40px 1fr 60px}.row .cat{display:none}.hero .arrow{display:none}}
</style>
</head>
<body>
<div class="wrap">
<header><a href="#" class="logo">STUDIO <span>VANDAL</span></a><nav><ul><li><a href="#work">Work</a></li><li><a href="#">Studio</a></li><li><a href="#">Journal</a></li><li><a href="#contact">Contact</a></li></ul></nav><button class="menu-btn" onclick="document.querySelector('nav ul').style.display=document.querySelector('nav ul').style.display==='flex'?'none':'flex'">Menu</button></header>
<section class="hero">
<div class="hero-bg"><img src="https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1600&h=900&fit=crop" alt="Creative agency team at work"></div>
<div class="top"><span>Independent creative studio · Lisbon / Berlin</span><span>Est. 2016</span></div>
<h1>We make<br><em>noise</em><br>that sells.</h1>
<div class="sub"><div><b>What we do</b>Brand systems, campaigns, digital products and film for ambitious teams.</div><div><b>How we work</b>Small senior team, no layers, direct access to the people doing the work.</div><div><b>Who we do it for</b>Challengers, culture brands and companies that refuse to blend in.</div></div>
<a href="#work" class="arrow" aria-label="See work">↘</a>
</section>
<div class="marquee"><div><span>BRAND IDENTITY</span><i>✺</i><span>ART DIRECTION</span><i>✺</i><span>WEB & DIGITAL</span><i>✺</i><span>CAMPAIGN FILM</span><i>✺</i><span>BRAND IDENTITY</span><i>✺</i><span>ART DIRECTION</span><i>✺</i><span>WEB & DIGITAL</span><i>✺</i><span>CAMPAIGN FILM</span><i>✺</i></div></div>
<section class="work" id="work">
<div class="work-head"><h2>Selected Work</h2><span>(04 projects)</span></div>
<div class="row"><div class="no">01</div><h3>Nocturne Athletics</h3><div class="cat">Brand · Digital</div><div class="go">↗</div></div>
<div class="row"><div class="no">02</div><h3>Halo Coffee Co.</h3><div class="cat">Packaging · Film</div><div class="go">↗</div></div>
<div class="row"><div class="no">03</div><h3>Atlas Sound</h3><div class="cat">Campaign · Web</div><div class="go">↗</div></div>
<div class="row"><div class="no">04</div><h3>Room 29 Hotel</h3><div class="cat">Identity · Spatial</div><div class="go">↗</div></div>
</section>
<section class="cta" id="contact"><p>Got something loud in mind?</p><h2>Let's cause<br>trouble.</h2><a href="mailto:hello@studiovandal.co">hello@studiovandal.co</a></section>
<footer><span>© 2026 Studio Vandal</span><span>Instagram / Behance / LinkedIn</span><span>Lisbon · Berlin</span></footer>
</div>
</body></html>`,
  },
];
