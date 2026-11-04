"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ArrowRight, ChevronDown, LogIn, LogOut, Menu, User, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { CommandPalette } from "./command-palette";
import { useAuth } from "./auth-provider";
import { toolConfig } from "../tools/tool-config";

// Same categories, order and tints as the homepage tools grid
const navCategories = [
  { id: "developer", label: "Developer" },
  { id: "design", label: "Design" },
  { id: "converter", label: "Converters" },
  { id: "text", label: "Text & Data" },
  { id: "security", label: "Security" },
].map((cat) => ({
  ...cat,
  tools: Object.values(toolConfig).filter((t) => t.category === cat.id),
}));

// Mega menu columns: balances 18 tools across three columns
const menuColumns = [["developer", "security"], ["design", "text"], ["converter"]].map((ids) =>
  ids.map((id) => navCategories.find((c) => c.id === id)!)
);

const toolCount = Object.keys(toolConfig).length;

const links = [
  { href: "/dashboard", label: "My Pages" },
  { href: "/about", label: "About" },
];

function CategoryHeading({ id, label }: { id: string; label: string }) {
  return (
    <p className="flex items-center gap-2 px-2.5 mb-1.5 text-xs font-semibold text-muted">
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: `var(--cat-${id})` }} />
      {label}
    </p>
  );
}

function ToolsMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const active = pathname.startsWith("/tools");

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const show = () => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hide = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div ref={ref} onMouseEnter={show} onMouseLeave={hide}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className={`relative flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
          active || open ? "text-foreground" : "text-muted hover:text-foreground"
        }`}
      >
        Tools
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        {active && <span className="absolute left-3 right-3 -bottom-[13px] h-0.5 rounded-full bg-primary" />}
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[min(720px,calc(100vw-2rem))]"
          >
            <div className="rounded-xl border border-surface-border bg-surface shadow-[0_16px_40px_-12px_rgba(0,0,0,0.18)] overflow-hidden">
              <div className="grid grid-cols-3 gap-x-2 gap-y-5 p-4">
                {menuColumns.map((column, i) => (
                  <div key={i} className="space-y-5">
                    {column.map((cat) => (
                      <div key={cat.id}>
                        <CategoryHeading id={cat.id} label={cat.label} />
                        <ul>
                          {cat.tools.map((tool) => {
                            const href = `/tools/${tool.slug}`;
                            return (
                              <li key={tool.slug}>
                                <Link
                                  href={href}
                                  onClick={() => setOpen(false)}
                                  className={`block px-2.5 py-1.5 rounded-md transition-colors hover:bg-background ${
                                    pathname === href ? "bg-background" : ""
                                  }`}
                                >
                                  <span className="block text-sm font-medium text-foreground">{tool.name}</span>
                                  <span className="block text-xs text-muted">{tool.tagline}</span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between px-6 py-3 border-t border-surface-border bg-background/60 text-xs">
                <span className="text-muted">{toolCount} free tools · No signup</span>
                <Link
                  href="/tools"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-1 font-medium text-foreground hover:text-primary transition-colors"
                >
                  View all tools
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="w-9 h-9 flex items-center justify-center rounded-lg text-foreground hover:bg-background transition-colors cursor-pointer"
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <AnimatePresence>
        {open && (
          <m.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-x-0 top-16 bottom-0 z-50 bg-background overflow-y-auto border-t border-surface-border"
          >
            <div className="px-4 py-4">
              <p className="px-2 mb-2 text-xs font-semibold uppercase tracking-wider text-muted">Tools</p>
              <div className="divide-y divide-surface-border border-y border-surface-border">
                {navCategories.map((cat) => {
                  const isOpen = expanded === cat.id;
                  return (
                    <div key={cat.id}>
                      <button
                        onClick={() => setExpanded(isOpen ? null : cat.id)}
                        aria-expanded={isOpen}
                        className="w-full flex items-center justify-between px-2 py-3.5 text-[15px] font-medium text-foreground cursor-pointer"
                      >
                        <span className="flex items-center gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: `var(--cat-${cat.id})` }} />
                          {cat.label}
                          <span className="text-xs text-muted font-normal">{cat.tools.length}</span>
                        </span>
                        <ChevronDown className={`w-4 h-4 text-muted transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <m.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            {cat.tools.map((tool) => {
                              const href = `/tools/${tool.slug}`;
                              return (
                                <li key={tool.slug}>
                                  <Link
                                    href={href}
                                    onClick={close}
                                    className={`block mx-2 mb-1 px-3 py-2 rounded-md ${
                                      pathname === href ? "bg-surface" : "active:bg-surface"
                                    }`}
                                  >
                                    <span className="block text-sm font-medium text-foreground">{tool.name}</span>
                                    <span className="block text-xs text-muted">{tool.tagline}</span>
                                  </Link>
                                </li>
                              );
                            })}
                            <li className="h-2" />
                          </m.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              <Link
                href="/tools"
                onClick={close}
                className="flex items-center justify-between px-2 py-3.5 text-sm font-medium text-primary"
              >
                View all {toolCount} tools
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="mt-2 border-t border-surface-border pt-2">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={close}
                    className={`block px-2 py-3.5 text-[15px] font-medium ${
                      pathname.startsWith(link.href) ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="mt-2 border-t border-surface-border pt-4 flex gap-3 px-2">
                <Link
                  href="/login"
                  onClick={close}
                  className="flex-1 h-10 rounded-lg border border-surface-border text-sm font-medium text-foreground flex items-center justify-center hover:bg-surface transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  onClick={close}
                  className="flex-1 h-10 rounded-lg bg-primary text-white text-sm font-medium flex items-center justify-center hover:bg-primary-dark transition-colors"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </m.nav>
        )}
      </AnimatePresence>
    </div>
  );
}

function UserMenu() {
  const { user, loading, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  if (loading) return null;

  if (!user) {
    return (
      <div className="hidden lg:flex items-center gap-2">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-sm font-medium text-muted hover:text-foreground transition-colors"
        >
          Sign in
        </Link>
        <Link
          href="/signup"
          className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors"
        >
          Sign up
        </Link>
      </div>
    );
  }

  const name = (user.user_metadata?.full_name as string) || user.email || "User";
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div ref={ref} className="relative hidden lg:block">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-8 h-8 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center hover:bg-primary/25 transition-colors cursor-pointer"
        aria-label="User menu"
      >
        {initials}
      </button>
      <AnimatePresence>
        {open && (
          <m.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.12 }}
            className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-surface-border bg-surface shadow-lg overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-surface-border">
              <p className="text-sm font-medium truncate">{name}</p>
              <p className="text-xs text-muted truncate">{user.email}</p>
            </div>
            <div className="py-1">
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-background transition-colors"
              >
                <User className="w-4 h-4 text-muted" />
                My Pages
              </Link>
              <button
                onClick={() => { signOut(); setOpen(false); }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-error hover:bg-error/5 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function NavBar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-200 ${
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-surface-border"
          : "bg-background border-transparent"
      }`}
    >
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-8">
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <Image src="/logo.png" alt="" width={30} height={30} className="logo-img" priority />
          <span className="font-bold text-[17px] tracking-tight">Zentrify</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
          <ToolsMenu pathname={pathname} />
          {links.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  active ? "text-foreground" : "text-muted hover:text-foreground"
                }`}
              >
                {link.label}
                {active && <span className="absolute left-3 right-3 -bottom-[13px] h-0.5 rounded-full bg-primary" />}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <CommandPalette />
          <ThemeToggle />
          <UserMenu />
          <MobileMenu pathname={pathname} />
        </div>
      </div>
    </header>
  );
}
