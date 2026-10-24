"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";

const tools = [
  { name: "JSON → TS", href: "/tools/json-to-typescript", color: "text-primary", activeBg: "bg-primary/10" },
  { name: "CSS Generator", href: "/tools/css-generator", color: "text-purple", activeBg: "bg-purple/10" },
  { name: "SVG → JSX", href: "/tools/svg-to-jsx", color: "text-success", activeBg: "bg-success/10" },
  { name: "Shadows", href: "/tools/tailwind-shadow", color: "text-orange", activeBg: "bg-orange/10" },
  { name: "Regex", href: "/tools/regex-tester", color: "text-error", activeBg: "bg-error/10" },
  { name: "Base64", href: "/tools/base64-encoder", color: "text-accent", activeBg: "bg-accent/10" },
  { name: "Colors", href: "/tools/color-palette", color: "text-pink", activeBg: "bg-pink/10" },
  { name: "Markdown", href: "/tools/markdown-preview", color: "text-warning", activeBg: "bg-warning/10" },
];

export function NavBar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-surface/80 backdrop-blur-xl border-b transition-shadow duration-300 ${
        scrolled ? "border-surface-border shadow-md" : "border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Zentrify"
            width={50}
            height={50}
            className="logo-img"
          />
          <span className="font-semibold text-lg hidden sm:inline">
            Zentrify
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {tools.map((tool) => {
            const isActive = pathname === tool.href;
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive
                    ? `${tool.color} ${tool.activeBg}`
                    : `text-muted hover:${tool.color} hover:bg-background`
                }`}
              >
                {tool.name}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <MobileMenu pathname={pathname} />
        </div>
      </div>
    </header>
  );
}

function MobileMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="md:hidden relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-lg hover:bg-background transition-colors"
      >
        <svg
          className={`w-5 h-5 transition-transform duration-200 ${open ? "rotate-90" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-52 neu-card py-2 z-50 animate-in fade-in slide-in-from-top-2">
            {tools.map((tool) => {
              const isActive = pathname === tool.href;
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? `${tool.color} ${tool.activeBg}`
                      : `text-muted hover:${tool.color} hover:bg-background`
                  }`}
                >
                  {tool.name}
                </Link>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
