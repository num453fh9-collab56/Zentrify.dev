"use client";

import { useEffect, useRef } from "react";

const codeSymbols = [
  "{", "}", "(", ")", ";", "=>", "//", "</>", "[]", "&&", "||",
  "const", "let", "fn", "if", "for", "=>", "===", "!=", "::",
  "#", "@", "$", "%", "&", "++", "--", "**", "0x", "...",
  "tsx", "css", "svg", "jsx", "api", "npm", "git", "dev",
];

interface Particle {
  x: number;
  y: number;
  speed: number;
  opacity: number;
  text: string;
  size: number;
  drift: number;
}

export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
    };

    const createParticle = (w: number, h: number): Particle => ({
      x: Math.random() * w,
      y: Math.random() * h,
      speed: 0.15 + Math.random() * 0.4,
      opacity: 0.04 + Math.random() * 0.1,
      text: codeSymbols[Math.floor(Math.random() * codeSymbols.length)],
      size: 10 + Math.random() * 14,
      drift: (Math.random() - 0.5) * 0.3,
    });

    const init = () => {
      resize();
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const count = Math.floor((rect.width * rect.height) / 8000);
      particles = Array.from({ length: Math.min(count, 80) }, () =>
        createParticle(rect.width, rect.height)
      );
    };

    const draw = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      const isDark = document.documentElement.getAttribute("data-theme") === "dark";

      for (const p of particles) {
        p.y -= p.speed;
        p.x += p.drift;

        if (p.y < -20) {
          p.y = h + 20;
          p.x = Math.random() * w;
          p.text = codeSymbols[Math.floor(Math.random() * codeSymbols.length)];
        }
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;

        ctx.font = `${p.size}px var(--font-geist-mono), monospace`;
        ctx.fillStyle = isDark
          ? `rgba(56, 189, 248, ${p.opacity})`
          : `rgba(14, 165, 233, ${p.opacity})`;
        ctx.fillText(p.text, p.x, p.y);
      }

      animId = requestAnimationFrame(draw);
    };

    init();
    draw();

    window.addEventListener("resize", init);
    return () => {
      window.removeEventListener("resize", init);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
