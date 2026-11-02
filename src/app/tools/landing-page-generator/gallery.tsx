"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

const PAGE_WIDTH = 1280;
const PAGE_HEIGHT = 800;

const autoScrollScript = `<script>(function(){var raf,on=false;addEventListener('message',function(e){var d=e.data;if(!d||typeof d.zentrifyThumb!=='boolean')return;on=d.zentrifyThumb;cancelAnimationFrame(raf);document.documentElement.style.scrollBehavior='auto';if(!on){scrollTo(0,0);return}var from=scrollY,to=Math.max(0,document.documentElement.scrollHeight-innerHeight),dur=Math.max(5000,(to-from)*1.6),t0=performance.now();(function step(t){var p=Math.min(1,(t-t0)/dur),k=p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2;scrollTo(0,from+(to-from)*k);if(p<1&&on)raf=requestAnimationFrame(step)})(t0)})})()</script>`;

const withAutoScroll = (html: string) =>
  html.includes("</body>") ? html.replace(/<\/body>(?![\s\S]*<\/body>)/, `${autoScrollScript}</body>`) : html + autoScrollScript;

function StaticThumb({ id, title }: { id: string; title: string }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-background">
      <img
        src={`/thumbs/${id}.webp`}
        alt={title}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover object-top"
      />
    </div>
  );
}

function HoverableThumb({ id, html, title, hovered }: { id: string; html: string; title: string; hovered: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    frameRef.current?.contentWindow?.postMessage({ zentrifyThumb: hovered }, "*");
  }, [hovered]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const resize = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    resize.observe(el);
    return () => resize.disconnect();
  }, []);

  const scale = width / PAGE_WIDTH;

  return (
    <div ref={ref} className="relative aspect-[16/10] overflow-hidden bg-background">
      <img
        src={`/thumbs/${id}.webp`}
        alt={title}
        loading="lazy"
        decoding="async"
        className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-300 ${hovered ? "opacity-0" : "opacity-100"}`}
      />
      {hovered && width > 0 && (
        <iframe
          ref={frameRef}
          srcDoc={withAutoScroll(html)}
          title={title}
          sandbox="allow-scripts"
          tabIndex={-1}
          aria-hidden="true"
          className="absolute top-0 left-0 border-0 pointer-events-none origin-top-left"
          style={{ width: PAGE_WIDTH, height: PAGE_HEIGHT, transform: `scale(${scale})` }}
        />
      )}
    </div>
  );
}

type CardTemplate = { id: string; name: string; category: string; description: string };

export function PremiumCard({
  template,
  html,
  editable,
  onOpen,
}: {
  template: CardTemplate;
  html: string;
  editable?: boolean;
  onOpen: () => void;
}) {
  const [brand, tagline] = splitName(template.name);
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="group text-left w-full cursor-pointer"
    >
      <div className="rounded-xl overflow-hidden border border-surface-border bg-surface transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.25)]">
        <HoverableThumb id={template.id} html={html} title={template.name} hovered={hovered} />
        <div className="flex items-start justify-between gap-3 p-4 border-t border-surface-border">
          <div className="min-w-0">
            <h3 className="flex items-center gap-2 font-semibold text-[15px] text-foreground">
              <span className="truncate">{brand}</span>
              {editable && (
                <span className="flex-shrink-0 px-1.5 py-px rounded border border-primary/30 text-[10px] font-semibold uppercase tracking-wide text-primary">
                  Editable
                </span>
              )}
            </h3>
            <p className="text-xs text-muted truncate mt-0.5">
              {tagline ? `${tagline} · ` : ""}
              {template.category}
            </p>
          </div>
          <span className="flex-shrink-0 inline-flex items-center gap-1 h-8 px-3 rounded-lg border border-surface-border text-xs font-medium text-foreground group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-colors">
            Open
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </button>
  );
}

export function ClassicCard({
  template,
  onOpen,
}: {
  template: CardTemplate;
  onOpen: () => void;
}) {
  return (
    <button onClick={onOpen} className="group text-left w-full cursor-pointer">
      <div className="rounded-lg overflow-hidden border border-surface-border bg-surface transition-colors group-hover:border-primary/40">
        <StaticThumb id={template.id} title={template.name} />
      </div>
      <div className="mt-2 px-0.5">
        <h3 className="font-medium text-[13px] text-foreground truncate group-hover:text-primary transition-colors">
          {template.name}
        </h3>
        <span className="text-[11px] text-muted">{template.category}</span>
      </div>
    </button>
  );
}

export function PremiumBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-semibold">
      <Sparkles className="w-3 h-3" />
      Premium
    </span>
  );
}

function splitName(name: string): [string, string] {
  const [brand, ...rest] = name.split(" — ");
  return [brand, rest.join(" — ")];
}
