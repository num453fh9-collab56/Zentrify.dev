"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import {
  Braces,
  Paintbrush,
  Image,
  Sparkles,
  Search,
  ArrowUpDown,
  Palette,
  FileText,
  Globe,
  Lock,
  Fingerprint,
  Type,
  Clock,
  Code2,
  Hash,
  Minimize2,
  ImagePlus,
  GitCompare,
  Zap,
  MonitorSmartphone,
  Heart,
  Laptop,
  ArrowRight,
  SearchX,
  Shield,
  Play,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ToolPreview } from "./components/tool-previews";

const HeroParticles = dynamic(
  () => import("./components/hero-scene").then((mod) => mod.HeroParticles),
  { ssr: false },
);

const FloatingCodeCard = dynamic(
  () => import("./components/hero-scene").then((mod) => mod.FloatingCodeCard),
  { ssr: false, loading: () => <div className="w-[370px] h-[340px]" /> },
);

const categories = [
  { id: "all", label: "All Tools" },
  { id: "developer", label: "Developer" },
  { id: "design", label: "Design" },
  { id: "text", label: "Text & Data" },
  { id: "security", label: "Security" },
  { id: "converter", label: "Converters" },
];

type ToolItem = {
  name: string;
  description: string;
  href: string;
  color: string;
  iconBg: string;
  borderColor: string;
  glowClass: string;
  gradient: string;
  category: string;
  badge?: string;
  Icon: LucideIcon;
};

const tools: ToolItem[] = [
  {
    name: "JSON to TypeScript",
    description: "Convert JSON to TypeScript interfaces or Zod schemas instantly.",
    href: "/tools/json-to-typescript",
    color: "text-primary",
    iconBg: "bg-primary/10",
    borderColor: "border-t-primary",
    glowClass: "premium-card-primary",
    gradient: "from-primary to-accent",
    category: "converter",
    badge: "Popular",
    Icon: Braces,
  },
  {
    name: "CSS Generator",
    description: "Generate glassmorphism effects and gradient CSS with live preview.",
    href: "/tools/css-generator",
    color: "text-purple",
    iconBg: "bg-purple/10",
    borderColor: "border-t-purple",
    glowClass: "premium-card-purple",
    gradient: "from-purple to-pink",
    category: "design",
    badge: "Popular",
    Icon: Paintbrush,
  },
  {
    name: "SVG to JSX",
    description: "Convert SVG markup to React JSX components with proper attributes.",
    href: "/tools/svg-to-jsx",
    color: "text-success",
    iconBg: "bg-success/10",
    borderColor: "border-t-success",
    glowClass: "premium-card-success",
    gradient: "from-success to-accent",
    category: "converter",
    Icon: Image,
  },
  {
    name: "Shadow Generator",
    description: "Create custom Tailwind box-shadows with visual controls and live preview.",
    href: "/tools/tailwind-shadow",
    color: "text-orange",
    iconBg: "bg-orange/10",
    borderColor: "border-t-orange",
    glowClass: "premium-card-orange",
    gradient: "from-orange to-warning",
    category: "design",
    Icon: Sparkles,
  },
  {
    name: "Regex Tester",
    description: "Test and debug regular expressions with real-time matching and capture groups.",
    href: "/tools/regex-tester",
    color: "text-error",
    iconBg: "bg-error/10",
    borderColor: "border-t-error",
    glowClass: "premium-card-error",
    gradient: "from-error to-pink",
    category: "developer",
    Icon: Search,
  },
  {
    name: "Base64 Encoder",
    description: "Encode text to Base64 or decode Base64 back to text. UTF-8 supported.",
    href: "/tools/base64-encoder",
    color: "text-accent",
    iconBg: "bg-accent/10",
    borderColor: "border-t-accent",
    glowClass: "premium-card-accent",
    gradient: "from-accent to-primary",
    category: "converter",
    Icon: ArrowUpDown,
  },
  {
    name: "Color Palette",
    description: "Generate shades, tints and harmonies from any color. Export as CSS or Tailwind.",
    href: "/tools/color-palette",
    color: "text-pink",
    iconBg: "bg-pink/10",
    borderColor: "border-t-pink",
    glowClass: "premium-card-pink",
    gradient: "from-pink to-purple",
    category: "design",
    Icon: Palette,
  },
  {
    name: "Markdown Preview",
    description: "Write Markdown and see live rendered preview. Copy HTML output.",
    href: "/tools/markdown-preview",
    color: "text-warning",
    iconBg: "bg-warning/10",
    borderColor: "border-t-warning",
    glowClass: "premium-card-warning",
    gradient: "from-warning to-orange",
    category: "text",
    Icon: FileText,
  },
  {
    name: "Landing Pages",
    description: "60+ free landing page templates, including hand-picked premium designs. Preview, copy or download.",
    href: "/tools/landing-page-generator",
    color: "text-primary",
    iconBg: "bg-primary/10",
    borderColor: "border-t-primary",
    glowClass: "premium-card-primary",
    gradient: "from-primary to-purple",
    category: "design",
    Icon: Globe,
  },
  {
    name: "Password Generator",
    description: "Generate strong, random passwords with customizable length and character options.",
    href: "/tools/password-generator",
    color: "text-success",
    iconBg: "bg-success/10",
    borderColor: "border-t-success",
    glowClass: "premium-card-success",
    gradient: "from-success to-accent",
    category: "security",
    badge: "New",
    Icon: Lock,
  },
  {
    name: "UUID Generator",
    description: "Generate random UUID v4 strings with bulk generation and format options.",
    href: "/tools/uuid-generator",
    color: "text-purple",
    iconBg: "bg-purple/10",
    borderColor: "border-t-purple",
    glowClass: "premium-card-purple",
    gradient: "from-purple to-accent",
    category: "developer",
    badge: "New",
    Icon: Fingerprint,
  },
  {
    name: "Lorem Ipsum",
    description: "Generate placeholder text by paragraphs, sentences, or words for your designs.",
    href: "/tools/lorem-ipsum-generator",
    color: "text-pink",
    iconBg: "bg-pink/10",
    borderColor: "border-t-pink",
    glowClass: "premium-card-pink",
    gradient: "from-pink to-error",
    category: "text",
    badge: "New",
    Icon: Type,
  },
  {
    name: "Timestamp Converter",
    description: "Convert Unix timestamps to human-readable dates and vice versa.",
    href: "/tools/timestamp-converter",
    color: "text-warning",
    iconBg: "bg-warning/10",
    borderColor: "border-t-warning",
    glowClass: "premium-card-warning",
    gradient: "from-warning to-orange",
    category: "converter",
    badge: "New",
    Icon: Clock,
  },
  {
    name: "JSON Formatter",
    description: "Format, validate, and minify JSON data with customizable indentation.",
    href: "/tools/json-formatter",
    color: "text-primary",
    iconBg: "bg-primary/10",
    borderColor: "border-t-primary",
    glowClass: "premium-card-primary",
    gradient: "from-primary to-success",
    category: "developer",
    badge: "New",
    Icon: Code2,
  },
  {
    name: "Hash Generator",
    description: "Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from text instantly.",
    href: "/tools/hash-generator",
    color: "text-error",
    iconBg: "bg-error/10",
    borderColor: "border-t-error",
    glowClass: "premium-card-error",
    gradient: "from-error to-orange",
    category: "security",
    badge: "New",
    Icon: Hash,
  },
  {
    name: "Code Minifier",
    description: "Minify HTML, CSS, and JavaScript code to reduce file size instantly.",
    href: "/tools/code-minifier",
    color: "text-orange",
    iconBg: "bg-orange/10",
    borderColor: "border-t-orange",
    glowClass: "premium-card-orange",
    gradient: "from-orange to-error",
    category: "developer",
    badge: "New",
    Icon: Minimize2,
  },
  {
    name: "Image to Base64",
    description: "Convert images to Base64 encoded strings with drag-and-drop upload.",
    href: "/tools/image-to-base64",
    color: "text-accent",
    iconBg: "bg-accent/10",
    borderColor: "border-t-accent",
    glowClass: "premium-card-accent",
    gradient: "from-accent to-success",
    category: "converter",
    badge: "New",
    Icon: ImagePlus,
  },
  {
    name: "Text Diff Checker",
    description: "Compare two texts and see differences highlighted line by line.",
    href: "/tools/text-diff-checker",
    color: "text-success",
    iconBg: "bg-success/10",
    borderColor: "border-t-success",
    glowClass: "premium-card-success",
    gradient: "from-success to-primary",
    category: "text",
    badge: "New",
    Icon: GitCompare,
  },
];

const whyFeatures = [
  {
    title: "Runs in your browser",
    description: "Your code, text and files are processed on your device and never uploaded.",
    Icon: Laptop,
  },
  {
    title: "Instant results",
    description: "No waiting on a server. Output updates as you type or paste.",
    Icon: Zap,
  },
  {
    title: "Free, no signup",
    description: "Every tool is free to use. No account, no paywall, no limits.",
    Icon: Heart,
  },
  {
    title: "Works on any device",
    description: "Built to work on phones, tablets and desktops alike.",
    Icon: MonitorSmartphone,
  },
];

const featureStrip = [
  { label: "Developer Tools", Icon: Code2, color: "#a78bda" },
  { label: "Design Utilities", Icon: Paintbrush, color: "#e868a0" },
  { label: "Security Tools", Icon: Shield, color: "#34c9a0" },
  { label: "Converters", Icon: ArrowUpDown, color: "#5ec6c0" },
  { label: "Text & Data", Icon: FileText, color: "#f5d060" },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};

const categoryLabel = (id: string) => categories.find((c) => c.id === id)?.label ?? id;

function ToolCard({ tool }: { tool: ToolItem }) {
  return (
    <Link
      href={tool.href}
      style={{ "--cat": `var(--cat-${tool.category})` } as React.CSSProperties}
      className="group flex flex-col h-full rounded-xl border border-surface-border bg-surface overflow-hidden transition-all duration-200 hover:border-cat/40 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.15)]"
    >
      <div className="bg-cat/[0.06] border-b border-surface-border">
        <ToolPreview href={tool.href} />
      </div>

      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <h3 className="text-[15px] font-semibold text-foreground">{tool.name}</h3>
          <ArrowRight className="w-4 h-4 text-muted opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-cat transition-all" />
        </div>
        <p className="text-[13px] text-muted leading-relaxed flex-1">{tool.description}</p>
        <div className="flex items-center gap-2 mt-4 text-[11px] font-medium text-muted">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cat" />
            {categoryLabel(tool.category)}
          </span>
          {tool.badge && (
            <>
              <span aria-hidden="true">·</span>
              <span className={tool.badge === "Popular" ? "text-cat" : ""}>{tool.badge}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}

const INITIAL_COUNT = 6;

export default function Home() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [showAll, setShowAll] = useState(false);

  const isFiltering = search !== "" || activeCategory !== "all";

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesCategory = activeCategory === "all" || tool.category === activeCategory;
      const matchesSearch =
        search === "" ||
        tool.name.toLowerCase().includes(search.toLowerCase()) ||
        tool.description.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  return (
    <>
      {/* ═══════ HERO — forced dark, cinematic ═══════ */}
      <section className="relative overflow-hidden bg-[#060b18]">
        {/* Atmospheric gradient blobs */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-32 left-[15%] w-[700px] h-[500px] bg-[#a78bda]/[0.07] blur-[140px] rounded-full" />
          <div className="absolute -bottom-24 right-[10%] w-[600px] h-[400px] bg-[#34c9a0]/[0.05] blur-[120px] rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[350px] bg-[#1a2a55]/30 blur-[100px] rounded-full" />
          {/* Cloud wisps */}
          <div className="absolute top-[20%] right-[5%] w-[400px] h-[120px] bg-white/[0.015] blur-[60px] rounded-full rotate-[-15deg]" />
          <div className="absolute bottom-[30%] left-[8%] w-[350px] h-[100px] bg-white/[0.012] blur-[50px] rounded-full rotate-[10deg]" />
        </div>

        {/* Particle canvas */}
        <HeroParticles />

        {/* Hero content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — text */}
            <m.div initial="hidden" animate="visible" variants={stagger}>
              {/* Badge */}
              <m.div variants={fadeUp}>
                <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#34c9a0]/[0.08] border border-[#34c9a0]/[0.15] text-[#34c9a0] text-xs font-semibold tracking-[0.08em] uppercase mb-7">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34c9a0] animate-pulse" />
                  Developer Toolkit
                </span>
              </m.div>

              {/* Heading */}
              <m.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl lg:text-[3.6rem] font-black tracking-[-0.035em] leading-[1.06] text-white mb-6"
              >
                A Higher Perspective
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a78bda] via-[#7dd3c0] to-[#34c9a0]">
                  on Dev Tools.
                </span>
              </m.h1>

              {/* Description */}
              <m.p
                variants={fadeUp}
                className="text-[17px] sm:text-lg text-white/55 max-w-[460px] mb-9 leading-relaxed"
              >
                Format, convert, test and generate in seconds. Everything runs
                in your browser — your data never leaves your device.
              </m.p>

              {/* CTA Buttons */}
              <m.div variants={fadeUp} className="flex flex-wrap items-center gap-4 mb-10">
                <Link
                  href="#tools"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("tools")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#34c9a0] to-[#28ab88] text-white font-semibold text-[15px] shadow-[0_8px_32px_-8px_rgba(52,201,160,0.35)] hover:shadow-[0_12px_40px_-8px_rgba(52,201,160,0.45)] hover:-translate-y-0.5 transition-all"
                >
                  Explore Tools
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl border border-white/[0.1] text-white/75 font-semibold text-[15px] hover:border-white/[0.2] hover:text-white hover:bg-white/[0.03] transition-all"
                >
                  <Play className="w-4 h-4" />
                  Learn More
                </Link>
              </m.div>

              {/* Stats row */}
              <m.div
                variants={fadeUp}
                className="flex items-center gap-6 sm:gap-8"
              >
                {[
                  { value: `${tools.length}+`, label: "Free Tools" },
                  { value: "0", label: "Signup Required" },
                  { value: "100%", label: "Client-Side" },
                ].map((stat, i) => (
                  <div key={stat.label} className="flex items-center gap-6 sm:gap-8">
                    {i > 0 && <div className="w-px h-9 bg-white/[0.08] -ml-6 sm:-ml-8" />}
                    <div>
                      <span className="text-2xl sm:text-[28px] font-bold text-white tracking-tight">
                        {stat.value}
                      </span>
                      <p className="text-[11px] sm:text-xs text-white/35 mt-0.5 font-medium">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                ))}
              </m.div>
            </m.div>

            {/* Right — floating 3D code card */}
            <m.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.35, ease }}
              className="hidden lg:flex justify-center"
            >
              <FloatingCodeCard />
            </m.div>
          </div>
        </div>

        {/* Feature strip */}
        <div className="relative z-10 border-t border-white/[0.05] bg-white/[0.015] backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between gap-6 sm:gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-4">
              {featureStrip.map(({ label, Icon, color }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 whitespace-nowrap text-[13px] sm:text-sm text-white/45 font-medium"
                >
                  <Icon className="w-4 h-4 shrink-0" style={{ color }} strokeWidth={1.8} />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ All Tools with Search & Filter ═══════ */}
      <section id="tools" className="py-20 px-4 sm:px-6 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl heading-lg mb-2">All tools</h2>
              <p className="text-muted">Every tool runs client-side. Your code stays on your machine.</p>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="search"
                aria-label="Filter tools"
                placeholder="Filter tools..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-9 py-2 rounded-lg bg-surface border border-surface-border text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors cursor-pointer"
                >
                  <SearchX className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category tabs */}
          <div className="flex gap-1 overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden border-b border-surface-border mb-8 -mx-4 px-4 sm:mx-0 sm:px-0" role="tablist">
            {categories.map((cat) => {
              const count = cat.id === "all" ? tools.length : tools.filter((t) => t.category === cat.id).length;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative whitespace-nowrap px-3 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
                    isActive ? "text-foreground" : "text-muted hover:text-foreground"
                  }`}
                >
                  {cat.label}
                  <span className="ml-1.5 text-xs text-muted">{count}</span>
                  {isActive && (
                    <m.span layoutId="cat-underline" className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {(isFiltering ? filteredTools : filteredTools.slice(0, showAll ? undefined : INITIAL_COUNT)).map((tool) => (
              <ToolCard key={tool.href} tool={tool} />
            ))}
          </div>

          {!isFiltering && !showAll && filteredTools.length > INITIAL_COUNT && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAll(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-surface-border bg-surface text-sm font-semibold text-foreground hover:border-primary/40 hover:text-primary transition-colors cursor-pointer"
              >
                Show all {filteredTools.length} tools
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {filteredTools.length === 0 && (
            <m.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="w-16 h-16 rounded-2xl bg-muted/10 flex items-center justify-center mx-auto mb-4">
                <SearchX className="w-8 h-8 text-muted" />
              </div>
              <p className="text-muted font-medium text-lg">No tools found matching your search.</p>
              <button
                onClick={() => { setSearch(""); setActiveCategory("all"); }}
                className="mt-3 text-primary text-sm font-medium hover:underline cursor-pointer"
              >
                Clear filters
              </button>
            </m.div>
          )}
        </div>
      </section>

      {/* ═══════ Why Zentrify ═══════ */}
      <section className="py-20 px-4 sm:px-6 border-t border-surface-border">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl heading-lg mb-2">Why Zentrify</h2>
          <p className="text-muted mb-10">Small tools, done properly.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
            {whyFeatures.map(({ title, description, Icon }) => (
              <div key={title}>
                <Icon className="w-5 h-5 text-primary mb-4" strokeWidth={1.8} />
                <h3 className="font-semibold text-foreground mb-1.5">{title}</h3>
                <p className="text-sm text-muted leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
