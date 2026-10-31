import type { Content, Item, RenderOptions } from "./types";

// Every user-supplied value goes through one of these before it reaches the HTML.

export const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

/** Escapes, then turns *word* into <em>word</em> for highlighted headline words */
export const emph = (s: string) => esc(s).replace(/\*(.+?)\*/g, "<em>$1</em>");

const SAFE_URL = /^(https?:\/\/|mailto:|tel:|#|\/)/i;
const SAFE_IMAGE = /^data:image\/(png|jpe?g|gif|webp|avif);base64,[a-z0-9+/=]+$/i;

export function safeUrl(url: string, fallback = "#") {
  const v = url.trim();
  if (SAFE_URL.test(v) || SAFE_IMAGE.test(v)) return esc(v);
  return fallback;
}

export function safeColor(value: string, fallback: string) {
  return /^#[0-9a-f]{3,8}$/i.test(value.trim()) ? value.trim() : fallback;
}

export const isEmail = (s: string) => /^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']+$/.test(s.trim());

export const lines = (s: string) =>
  s
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

export const csv = (s: string) =>
  s
    .split(",")
    .map((l) => l.trim())
    .filter(Boolean);

/** Typed accessors over a Content object for one template's render function */
export function reader(c: Content) {
  return {
    on: (section: string) => c.enabled[section] !== false,
    str: (section: string, key: string) => {
      const v = c.values[section]?.[key];
      return typeof v === "string" ? v : "";
    },
    list: (section: string, key: string): Item[] => {
      const v = c.values[section]?.[key];
      return Array.isArray(v) ? v : [];
    },
  };
}

/**
 * Scroll-reveal for elements with class "rv". Content stays visible when
 * scripts are off (gallery thumbnails) or the visitor prefers reduced motion.
 */
export const revealCss = `.js .rv{opacity:0;transform:translateY(28px);transition:opacity .9s cubic-bezier(.2,.7,.2,1),transform .9s cubic-bezier(.2,.7,.2,1)}
.js .rv.in{opacity:1;transform:none}
.js .rv.d1{transition-delay:.08s}.js .rv.d2{transition-delay:.16s}.js .rv.d3{transition-delay:.24s}
html.instant .rv{transition:none!important}
@media (prefers-reduced-motion:reduce){.js .rv{opacity:1;transform:none;transition:none}}`;

export const revealScript = `<script>document.documentElement.classList.add('js');document.addEventListener('DOMContentLoaded',function(){var els=document.querySelectorAll('.rv');if(!('IntersectionObserver' in window)||document.documentElement.classList.contains('instant')){els.forEach(function(e){e.classList.add('in')});return}var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.12,rootMargin:'0px 0px -40px 0px'});els.forEach(function(e){io.observe(e)})});</script>`;

/**
 * Editor-only bridge: keeps the scroll position across re-renders, reports
 * scrolling to the editor, lets the editor jump to a section, and stops links
 * from navigating the preview away.
 */
export function previewScript(opts: RenderOptions["preview"]) {
  if (!opts) return "";
  const y = Math.max(0, Math.round(opts.initialScroll));
  return `<script>(function(){${opts.instant ? "document.documentElement.classList.add('instant');" : ""}
var y=${y};function go(){if(y)scrollTo(0,y)}document.addEventListener('DOMContentLoaded',function(){go();parent.postMessage({zentrify:'ready'},'*')});addEventListener('load',go);
var t;addEventListener('scroll',function(){clearTimeout(t);t=setTimeout(function(){parent.postMessage({zentrify:'scroll',y:scrollY},'*')},120)},{passive:true});
addEventListener('message',function(e){var d=e.data;if(!d||d.zentrify!=='goto')return;var el=d.id&&document.getElementById(d.id);if(el)el.scrollIntoView({behavior:'smooth'});else scrollTo({top:0,behavior:'smooth'})});
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a');if(!a)return;var h=a.getAttribute('href')||'';if(h.charAt(0)==='#'){var el=h.length>1&&document.getElementById(h.slice(1));e.preventDefault();if(el)el.scrollIntoView({behavior:'smooth'});else scrollTo({top:0,behavior:'smooth'})}else{e.preventDefault()}},true);
})()</script>`;
}
