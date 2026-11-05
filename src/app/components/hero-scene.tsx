"use client";

import { useEffect, useRef, memo } from "react";
import { m, useReducedMotion } from "framer-motion";

function ParticleCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    let id: number;
    const dpr = Math.min(window.devicePixelRatio, 2);
    const particles: { x: number; y: number; vx: number; vy: number; r: number; a: number }[] = [];

    function resize() {
      c!.width = c!.clientWidth * dpr;
      c!.height = c!.clientHeight * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    const W = () => c!.clientWidth;
    const H = () => c!.clientHeight;

    for (let i = 0; i < 55; i++) {
      particles.push({
        x: Math.random() * W(),
        y: Math.random() * H(),
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.5 + 0.5,
        a: Math.random() * 0.35 + 0.08,
      });
    }

    function frame() {
      const w = W(), h = H();
      ctx!.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x += w;
        if (p.x > w) p.x -= w;
        if (p.y < 0) p.y += h;
        if (p.y > h) p.y -= h;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, 6.283);
        ctx!.fillStyle = `rgba(167,139,218,${p.a})`;
        ctx!.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 14400) {
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.strokeStyle = `rgba(167,139,218,${0.06 * (1 - Math.sqrt(d2) / 120)})`;
            ctx!.lineWidth = 0.5;
            ctx!.stroke();
          }
        }
      }
      id = requestAnimationFrame(frame);
    }
    frame();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

function FloatingCodeCard() {
  const reduced = useReducedMotion();

  const floatAnim = reduced
    ? {}
    : {
        animate: {
          y: [0, -14, 0],
          rotateY: [0, 2.5, -2.5, 0],
          rotateX: [0, -1.5, 1.5, 0],
        },
        transition: { duration: 7, repeat: Infinity, ease: "easeInOut" as const },
      };

  return (
    <div className="relative flex items-center justify-center" style={{ perspective: "1200px" }}>
      <m.div {...floatAnim} style={{ transformStyle: "preserve-3d" }}>
        {/* Code editor window */}
        <div className="w-[300px] sm:w-[370px] rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0c1222]/90 backdrop-blur-xl shadow-[0_30px_80px_-16px_rgba(167,139,218,0.25),0_0_60px_-20px_rgba(52,201,160,0.12)]">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            </div>
            <span className="text-[11px] text-white/30 font-mono ml-1">tools.ts</span>
          </div>
          {/* Code */}
          <div className="p-5 font-mono text-[12px] sm:text-[13px] leading-[1.75] text-white/90">
            <div>
              <span className="text-[#c792ea]">import</span>{" "}
              <span className="text-[#82aaff]">{`{ magic }`}</span>{" "}
              <span className="text-[#c792ea]">from</span>{" "}
              <span className="text-[#c3e88d]">&quot;zentrify&quot;</span>
            </div>
            <div className="mt-2">
              <span className="text-[#c792ea]">const</span>{" "}
              <span className="text-[#82aaff]">result</span>{" "}
              <span className="text-white/40">=</span>{" "}
              <span className="text-[#ffcb6b]">magic</span>
              <span className="text-white/40">(</span>
              <span className="text-white/40">{`{`}</span>
            </div>
            <div className="pl-4">
              <span className="text-[#f07178]">json</span>
              <span className="text-white/30">:</span>{" "}
              <span className="text-[#c3e88d]">&quot;→ TypeScript&quot;</span>
              <span className="text-white/30">,</span>
            </div>
            <div className="pl-4">
              <span className="text-[#f07178]">svg</span>
              <span className="text-white/30">:</span>
              {"  "}
              <span className="text-[#c3e88d]">&quot;→ React JSX&quot;</span>
              <span className="text-white/30">,</span>
            </div>
            <div className="pl-4">
              <span className="text-[#f07178]">css</span>
              <span className="text-white/30">:</span>
              {"  "}
              <span className="text-[#c3e88d]">&quot;→ Tailwind&quot;</span>
              <span className="text-white/30">,</span>
            </div>
            <div className="pl-4">
              <span className="text-[#f07178]">pages</span>
              <span className="text-white/30">:</span>{" "}
              <span className="text-[#c3e88d]">&quot;→ 60+ Ready&quot;</span>
              <span className="text-white/30">,</span>
            </div>
            <div>
              <span className="text-white/40">{`}`}</span>
              <span className="text-white/40">)</span>
            </div>
            <div className="mt-2">
              <span className="text-white/25">
                {"// "}&#x2728; runs in your browser
              </span>
            </div>
          </div>
        </div>

        {/* Floating tag — top right */}
        <m.div
          animate={reduced ? {} : { y: [0, -7, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute -top-3 -right-4 sm:-right-8 px-3.5 py-1.5 rounded-full bg-[#34c9a0]/12 border border-[#34c9a0]/20 text-[#34c9a0] text-[11px] font-semibold backdrop-blur-md shadow-[0_4px_20px_-6px_rgba(52,201,160,0.25)]"
        >
          100% Free
        </m.div>

        {/* Floating tag — bottom left */}
        <m.div
          animate={reduced ? {} : { y: [0, 7, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
          className="absolute -bottom-3 -left-4 sm:-left-8 px-3.5 py-1.5 rounded-full bg-[#a78bda]/12 border border-[#a78bda]/20 text-[#a78bda] text-[11px] font-semibold backdrop-blur-md shadow-[0_4px_20px_-6px_rgba(167,139,218,0.25)]"
        >
          No Signup
        </m.div>

        {/* Floating tag — mid right */}
        <m.div
          animate={reduced ? {} : { y: [0, -5, 0], x: [0, 3, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          className="absolute top-1/2 -right-4 sm:-right-10 -translate-y-1/2 px-3.5 py-1.5 rounded-full bg-[#ffcb6b]/10 border border-[#ffcb6b]/20 text-[#ffcb6b] text-[11px] font-semibold backdrop-blur-md"
        >
          Client-Side
        </m.div>
      </m.div>

      {/* Glow under card */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-28 bg-[#a78bda]/10 blur-[80px] rounded-full pointer-events-none" />
    </div>
  );
}

export const HeroParticles = memo(ParticleCanvas);
export { FloatingCodeCard };
