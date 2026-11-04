"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { m, AnimatePresence } from "framer-motion";

const categories = [
  { id: "all", label: "All Tools", icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" },
  { id: "developer", label: "Developer", icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" },
  { id: "design", label: "Design", icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" },
  { id: "converter", label: "Converters", icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" },
  { id: "generator", label: "Generators", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  { id: "security", label: "Security", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
];

const tools = [
  { name: "JSON → TypeScript", desc: "Convert JSON objects to TypeScript interfaces or Zod schemas instantly.", href: "/tools/json-to-typescript", category: "developer", gradient: "from-blue-500 to-indigo-500", icon: "M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" },
  { name: "CSS Generator", desc: "Generate glassmorphism, gradients, and advanced CSS effects with live preview.", href: "/tools/css-generator", category: "design", gradient: "from-purple-500 to-violet-500", icon: "M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" },
  { name: "SVG → JSX", desc: "Transform SVG markup into clean React JSX components with proper attributes.", href: "/tools/svg-to-jsx", category: "converter", gradient: "from-emerald-500 to-teal-500", icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 8a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z" },
  { name: "Tailwind Shadows", desc: "Build custom box shadows with visual controls and copy Tailwind config.", href: "/tools/tailwind-shadow", category: "design", gradient: "from-orange-500 to-red-500", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
  { name: "Regex Tester", desc: "Write, test, and debug regular expressions with real-time match highlighting.", href: "/tools/regex-tester", category: "developer", gradient: "from-red-500 to-rose-500", icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" },
  { name: "Base64 Encoder", desc: "Encode and decode Base64 strings with support for files and URLs.", href: "/tools/base64-encoder", category: "converter", gradient: "from-cyan-500 to-teal-500", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
  { name: "Color Palette", desc: "Explore, generate, and export harmonious color palettes for your projects.", href: "/tools/color-palette", category: "design", gradient: "from-pink-500 to-rose-500", icon: "M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" },
  { name: "Markdown Preview", desc: "Live markdown editor with syntax highlighting and instant preview.", href: "/tools/markdown-preview", category: "developer", gradient: "from-yellow-500 to-orange-500", icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" },
  { name: "Landing Page Generator", desc: "Generate premium landing page templates with customizable themes.", href: "/tools/landing-page-generator", category: "design", gradient: "from-indigo-500 to-purple-500", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { name: "Password Generator", desc: "Generate cryptographically secure passwords with customizable rules.", href: "/tools/password-generator", category: "security", gradient: "from-emerald-500 to-green-500", icon: "M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" },
  { name: "UUID Generator", desc: "Generate unique identifiers (v4 UUIDs) for databases and APIs.", href: "/tools/uuid-generator", category: "generator", gradient: "from-purple-500 to-indigo-500", icon: "M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" },
  { name: "Lorem Ipsum", desc: "Generate placeholder text in paragraphs, sentences, or words.", href: "/tools/lorem-ipsum-generator", category: "generator", gradient: "from-pink-500 to-fuchsia-500", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
  { name: "Timestamp Converter", desc: "Convert between Unix timestamps and human-readable dates.", href: "/tools/timestamp-converter", category: "converter", gradient: "from-amber-500 to-yellow-500", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
  { name: "JSON Formatter", desc: "Beautify, minify, and validate JSON with syntax highlighting.", href: "/tools/json-formatter", category: "developer", gradient: "from-sky-500 to-blue-500", icon: "M4 6h16M4 12h8m-8 6h16" },
  { name: "Hash Generator", desc: "Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from text.", href: "/tools/hash-generator", category: "security", gradient: "from-red-500 to-pink-500", icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" },
  { name: "Code Minifier", desc: "Compress HTML, CSS, and JavaScript code to reduce file size.", href: "/tools/code-minifier", category: "developer", gradient: "from-orange-500 to-amber-500", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
  { name: "Image → Base64", desc: "Convert images to Base64 encoded strings for embedding in code.", href: "/tools/image-to-base64", category: "converter", gradient: "from-violet-500 to-purple-500", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
  { name: "Text Diff Checker", desc: "Compare two text blocks side-by-side with highlighted differences.", href: "/tools/text-diff-checker", category: "developer", gradient: "from-teal-500 to-cyan-500", icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
];

export default function ToolsPage() {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState("all");

  const filtered = useMemo(() => {
    return tools.filter((t) => {
      const matchCat = active === "all" || t.category === active;
      const matchSearch =
        !search ||
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.desc.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, active]);

  return (
    <section className="py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">All Tools</h1>
          <p className="text-muted max-w-lg mx-auto">
            {tools.length} free developer & designer utilities. No signup, no tracking, runs in your browser.
          </p>
        </m.div>

        {/* Search */}
        <m.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-md mx-auto mb-8"
        >
          <div className="relative">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tools..."
              className="w-full pl-10 pr-4 py-3 neu-input text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </m.div>

        {/* Category filters */}
        <m.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap gap-2 justify-center mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                active === cat.id
                  ? "bg-primary text-white shadow-md"
                  : "bg-surface-border/40 text-muted hover:text-foreground hover:bg-surface-border/60"
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d={cat.icon} />
              </svg>
              {cat.label}
            </button>
          ))}
        </m.div>

        {/* Tools grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((tool, i) => (
              <m.div
                key={tool.href}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: i * 0.02 }}
              >
                <Link
                  href={tool.href}
                  className="group block neu-card p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-t-2 border-transparent hover:border-t-primary"
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br ${tool.gradient} text-white flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d={tool.icon} />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">{tool.name}</h3>
                      <p className="text-xs body-md">{tool.desc}</p>
                    </div>
                    <svg className="w-4 h-4 text-muted opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </m.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted text-lg">No tools found matching your search.</p>
            <button onClick={() => { setSearch(""); setActive("all"); }} className="mt-3 text-primary font-medium hover:underline">
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
