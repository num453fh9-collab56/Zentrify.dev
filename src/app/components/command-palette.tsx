"use client";

import { useState, useEffect, useRef, useCallback, useMemo, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";

interface ToolItem {
  name: string;
  href: string;
  category: string;
  icon: string;
}

const subscribeNoop = () => () => {};
const getIsMac = () => /Mac|iPhone|iPad/.test(navigator.platform);

const allTools: ToolItem[] = [
  { name: "JSON → TypeScript", href: "/tools/json-to-typescript", category: "Developer", icon: "M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" },
  { name: "CSS Generator", href: "/tools/css-generator", category: "Design", icon: "M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128z" },
  { name: "SVG → JSX", href: "/tools/svg-to-jsx", category: "Converter", icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" },
  { name: "Tailwind Shadows", href: "/tools/tailwind-shadow", category: "Design", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4" },
  { name: "Regex Tester", href: "/tools/regex-tester", category: "Developer", icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" },
  { name: "Base64 Encoder", href: "/tools/base64-encoder", category: "Converter", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
  { name: "Color Palette", href: "/tools/color-palette", category: "Design", icon: "M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402" },
  { name: "Markdown Preview", href: "/tools/markdown-preview", category: "Developer", icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5" },
  { name: "Landing Pages", href: "/tools/landing-page-generator", category: "Design", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3" },
  { name: "Password Generator", href: "/tools/password-generator", category: "Security", icon: "M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586" },
  { name: "UUID Generator", href: "/tools/uuid-generator", category: "Generator", icon: "M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5" },
  { name: "Lorem Ipsum", href: "/tools/lorem-ipsum-generator", category: "Generator", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586" },
  { name: "Timestamp Converter", href: "/tools/timestamp-converter", category: "Converter", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
  { name: "JSON Formatter", href: "/tools/json-formatter", category: "Developer", icon: "M4 6h16M4 12h8m-8 6h16" },
  { name: "Hash Generator", href: "/tools/hash-generator", category: "Security", icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2" },
  { name: "Code Minifier", href: "/tools/code-minifier", category: "Developer", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2" },
  { name: "Image → Base64", href: "/tools/image-to-base64", category: "Converter", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586" },
  { name: "Text Diff Checker", href: "/tools/text-diff-checker", category: "Developer", icon: "M9 17v-2m3 2v-4m3 4v-6" },
];

const pages: { name: string; href: string; icon: string }[] = [
  { name: "Home", href: "/", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3" },
  { name: "All Tools", href: "/tools", icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" },
  { name: "About", href: "/about", icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { name: "Contact", href: "/contact", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
];

const HISTORY_KEY = "zentrify-tool-history";

function getHistory(): string[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function trackToolVisit(href: string) {
  try {
    const history = getHistory();
    const updated = [href, ...history.filter((h) => h !== href)].slice(0, 8);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch {}
}

export function CommandPalette() {
  const isMac = useSyncExternalStore(subscribeNoop, getIsMac, () => false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const recentHrefs = useMemo(() => {
    if (!open) return [];
    try { return getHistory(); } catch { return []; }
  }, [open]);

  const recentTools = useMemo(
    () => recentHrefs.map((href) => allTools.find((t) => t.href === href)).filter(Boolean) as ToolItem[],
    [recentHrefs]
  );

  const results = useMemo(() => {
    if (!query.trim()) {
      return { recent: recentTools.slice(0, 4), tools: allTools, pages };
    }
    const q = query.toLowerCase();
    return {
      recent: [],
      tools: allTools.filter(
        (t) => t.name.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)
      ),
      pages: pages.filter((p) => p.name.toLowerCase().includes(q)),
    };
  }, [query, recentTools]);

  const allItems = useMemo(() => {
    const items: { type: string; name: string; href: string; icon: string; category?: string }[] = [];
    results.recent.forEach((t) => items.push({ type: "recent", ...t }));
    results.tools.forEach((t) => items.push({ type: "tool", ...t }));
    results.pages.forEach((p) => items.push({ type: "page", ...p }));
    return items;
  }, [results]);

  const navigate = useCallback(
    (href: string) => {
      trackToolVisit(href);
      router.push(href);
      setOpen(false);
      setQuery("");
    },
    [router]
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => { if (v) setQuery(""); return !v; });
      }
      if (e.key === "Escape") { setOpen(false); setQuery(""); }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, allItems.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter" && allItems[selected]) {
      navigate(allItems[selected].href);
    }
  };

  return (
    <>
      {/* Trigger button in navbar */}
      <button
        onClick={() => setOpen(true)}
        className="hidden sm:flex items-center gap-2 w-52 lg:w-60 h-9 pl-3 pr-1.5 rounded-lg border border-surface-border bg-surface text-sm text-muted hover:border-primary/40 hover:text-foreground transition-colors cursor-pointer"
      >
        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        Search tools
        <kbd className="ml-auto px-1.5 py-0.5 rounded border border-surface-border bg-background text-[10px] font-mono text-muted">
          {isMac ? "⌘K" : "Ctrl K"}
        </kbd>
      </button>

      {/* Mobile trigger */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Search tools"
        className="sm:hidden w-9 h-9 flex items-center justify-center rounded-lg text-foreground hover:bg-background transition-colors cursor-pointer"
      >
        <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm"
              onClick={() => { setOpen(false); setQuery(""); }}
            />

            {/* Dialog */}
            <m.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.15 }}
              className="fixed left-1/2 top-[15%] -translate-x-1/2 z-[201] w-[90vw] max-w-lg"
            >
              <div className="bg-surface border border-surface-border rounded-2xl shadow-2xl overflow-hidden">
                {/* Search input */}
                <div className="flex items-center gap-3 px-4 border-b border-surface-border">
                  <svg className="w-4 h-4 text-muted flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setSelected(0); }}
                    onKeyDown={handleKeyDown}
                    placeholder="Search tools, pages..."
                    className="flex-1 py-3.5 bg-transparent text-sm outline-none placeholder:text-muted"
                  />
                  <kbd className="px-1.5 py-0.5 rounded bg-surface-border text-[10px] text-muted font-mono">ESC</kbd>
                </div>

                {/* Results */}
                <div className="max-h-[50vh] overflow-y-auto py-2">
                  {allItems.length === 0 && (
                    <div className="px-4 py-8 text-center text-sm text-muted">
                      No results found for &quot;{query}&quot;
                    </div>
                  )}

                  {results.recent.length > 0 && (
                    <>
                      <div className="px-4 py-1.5 text-[10px] font-semibold text-muted uppercase tracking-wider">Recent</div>
                      {results.recent.map((tool, i) => {
                        const idx = i;
                        return (
                          <ResultItem
                            key={`recent-${tool.href}`}
                            name={tool.name}
                            subtitle={tool.category}
                            icon={tool.icon}
                            isSelected={selected === idx}
                            onClick={() => navigate(tool.href)}
                            badge="Recent"
                          />
                        );
                      })}
                    </>
                  )}

                  {results.tools.length > 0 && (
                    <>
                      <div className="px-4 py-1.5 text-[10px] font-semibold text-muted uppercase tracking-wider">
                        Tools
                      </div>
                      {results.tools.map((tool, i) => {
                        const idx = results.recent.length + i;
                        return (
                          <ResultItem
                            key={tool.href}
                            name={tool.name}
                            subtitle={tool.category}
                            icon={tool.icon}
                            isSelected={selected === idx}
                            onClick={() => navigate(tool.href)}
                          />
                        );
                      })}
                    </>
                  )}

                  {results.pages.length > 0 && (
                    <>
                      <div className="px-4 py-1.5 text-[10px] font-semibold text-muted uppercase tracking-wider">
                        Pages
                      </div>
                      {results.pages.map((page, i) => {
                        const idx = results.recent.length + results.tools.length + i;
                        return (
                          <ResultItem
                            key={page.href}
                            name={page.name}
                            subtitle="Page"
                            icon={page.icon}
                            isSelected={selected === idx}
                            onClick={() => navigate(page.href)}
                          />
                        );
                      })}
                    </>
                  )}
                </div>

                {/* Footer */}
                <div className="px-4 py-2.5 border-t border-surface-border flex items-center gap-4 text-[10px] text-muted">
                  <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 rounded bg-surface-border font-mono">↑↓</kbd> Navigate</span>
                  <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 rounded bg-surface-border font-mono">↵</kbd> Open</span>
                  <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 rounded bg-surface-border font-mono">Esc</kbd> Close</span>
                </div>
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function ResultItem({
  name,
  subtitle,
  icon,
  isSelected,
  onClick,
  badge,
}: {
  name: string;
  subtitle: string;
  icon: string;
  isSelected: boolean;
  onClick: () => void;
  badge?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isSelected) ref.current?.scrollIntoView({ block: "nearest" });
  }, [isSelected]);

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
        isSelected ? "bg-primary/10 text-primary" : "hover:bg-surface-border/40"
      }`}
    >
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
        isSelected ? "bg-primary/20" : "bg-surface-border/50"
      }`}>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{name}</p>
        <p className="text-[10px] text-muted">{subtitle}</p>
      </div>
      {badge && (
        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-semibold">{badge}</span>
      )}
      {isSelected && (
        <kbd className="px-1.5 py-0.5 rounded bg-surface-border text-[10px] font-mono text-muted">↵</kbd>
      )}
    </button>
  );
}
