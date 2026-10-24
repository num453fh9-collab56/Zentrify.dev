"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { HeroBackground } from "./components/hero-background";

const tools = [
  {
    name: "JSON → TypeScript",
    description:
      "Convert JSON to TypeScript interfaces or Zod schemas instantly.",
    href: "/tools/json-to-typescript",
    color: "text-primary",
    iconBg: "bg-primary/10",
    borderColor: "border-t-primary",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    name: "CSS Generator",
    description:
      "Generate glassmorphism effects and gradient CSS with live preview.",
    href: "/tools/css-generator",
    color: "text-purple",
    iconBg: "bg-purple/10",
    borderColor: "border-t-purple",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
  {
    name: "SVG → JSX",
    description:
      "Convert SVG markup to React JSX components with proper attributes.",
    href: "/tools/svg-to-jsx",
    color: "text-success",
    iconBg: "bg-success/10",
    borderColor: "border-t-success",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
      </svg>
    ),
  },
  {
    name: "Shadow Generator",
    description:
      "Create custom Tailwind box-shadows with visual controls and live preview.",
    href: "/tools/tailwind-shadow",
    color: "text-orange",
    iconBg: "bg-orange/10",
    borderColor: "border-t-orange",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
  },
  {
    name: "Regex Tester",
    description:
      "Test and debug regular expressions with real-time matching and capture groups.",
    href: "/tools/regex-tester",
    color: "text-error",
    iconBg: "bg-error/10",
    borderColor: "border-t-error",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
  },
  {
    name: "Base64 Encoder",
    description:
      "Encode text to Base64 or decode Base64 back to text. UTF-8 supported.",
    href: "/tools/base64-encoder",
    color: "text-accent",
    iconBg: "bg-accent/10",
    borderColor: "border-t-accent",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
      </svg>
    ),
  },
  {
    name: "Color Palette",
    description:
      "Generate shades, tints and harmonies from any color. Export as CSS or Tailwind.",
    href: "/tools/color-palette",
    color: "text-pink",
    iconBg: "bg-pink/10",
    borderColor: "border-t-pink",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
      </svg>
    ),
  },
  {
    name: "Markdown Preview",
    description:
      "Write Markdown and see live rendered preview. Copy HTML output.",
    href: "/tools/markdown-preview",
    color: "text-warning",
    iconBg: "bg-warning/10",
    borderColor: "border-t-warning",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    name: "Landing Pages",
    description:
      "500+ free landing page templates with HTML/CSS code. Preview, customize, copy.",
    href: "/tools/landing-page-generator",
    color: "text-primary",
    iconBg: "bg-primary/10",
    borderColor: "border-t-primary",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    name: "Password Generator",
    description:
      "Generate strong, random passwords with customizable length and character options.",
    href: "/tools/password-generator",
    color: "text-success",
    iconBg: "bg-success/10",
    borderColor: "border-t-success",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
];

const codeLines = [
  { text: "const ", cls: "code-keyword" },
  { text: "devTools", cls: "code-variable" },
  { text: " = {", cls: "code-punctuation" },
  { text: "\n" },
  { text: "  convert", cls: "code-variable" },
  { text: ": ", cls: "code-punctuation" },
  { text: "'JSON → TypeScript'", cls: "code-string" },
  { text: ",", cls: "code-punctuation" },
  { text: "\n" },
  { text: "  generate", cls: "code-variable" },
  { text: ": ", cls: "code-punctuation" },
  { text: "'CSS & Shadows'", cls: "code-string" },
  { text: ",", cls: "code-punctuation" },
  { text: "\n" },
  { text: "  transform", cls: "code-variable" },
  { text: ": ", cls: "code-punctuation" },
  { text: "'SVG → React JSX'", cls: "code-string" },
  { text: ",", cls: "code-punctuation" },
  { text: "\n" },
  { text: "  cost", cls: "code-variable" },
  { text: ": ", cls: "code-punctuation" },
  { text: "'free forever'", cls: "code-string" },
  { text: ",", cls: "code-punctuation" },
  { text: "\n" },
  { text: "}", cls: "code-punctuation" },
  { text: " ", cls: "" },
  { text: "// 🚀 ship faster", cls: "code-comment" },
];

function useTypingEffect(tokens: typeof codeLines, speed = 30) {
  const [displayed, setDisplayed] = useState<typeof codeLines>([]);

  useEffect(() => {
    let tokenIndex = 0;
    let charIndex = 0;
    const current: typeof codeLines = [];

    const interval = setInterval(() => {
      if (tokenIndex >= tokens.length) {
        clearInterval(interval);
        return;
      }

      const token = tokens[tokenIndex];
      if (token.text === "\n") {
        current.push(token);
        tokenIndex++;
        charIndex = 0;
      } else {
        if (charIndex === 0) {
          current.push({ text: "", cls: token.cls });
        }
        current[current.length - 1] = {
          text: token.text.slice(0, charIndex + 1),
          cls: token.cls,
        };
        charIndex++;
        if (charIndex >= token.text.length) {
          tokenIndex++;
          charIndex = 0;
        }
      }
      setDisplayed([...current]);
    }, speed);

    return () => clearInterval(interval);
  }, [tokens, speed]);

  return displayed;
}

function CodeTypingBlock() {
  const typedTokens = useTypingEffect(codeLines, 35);

  return (
    <div className="code-editor-block w-full max-w-lg mx-auto shadow-2xl">
      <div className="code-header">
        <span className="code-dot bg-error/80" />
        <span className="code-dot bg-warning/80" />
        <span className="code-dot bg-success/80" />
        <span className="text-xs text-muted ml-2">tools.ts</span>
      </div>
      <div className="code-body min-h-[180px]">
        <pre className="whitespace-pre-wrap">
          {typedTokens.map((token, i) =>
            token.text === "\n" ? (
              <br key={i} />
            ) : (
              <span key={i} className={token.cls}>
                {token.text}
              </span>
            )
          )}
          <span className="animate-blink text-primary">▍</span>
        </pre>
      </div>
    </div>
  );
}

function AnimatedCounter({ target, suffix = "" }: { target: number | string; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView || typeof target !== "number") return;
    let current = 0;
    const step = Math.max(1, Math.floor(target / 40));
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(current);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {typeof target === "number" ? count : target}
      {suffix}
    </span>
  );
}

function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero with Background Video */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video-1.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-6 border border-white/20">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Free &amp; Open — No Signup Required
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight text-white">
              Developer &amp; Designer Tools{" "}
              <span className="bg-gradient-to-r from-primary-light via-accent to-success bg-clip-text text-transparent">
                Free &amp; Fast
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10">
              Lightweight utilities that run in your browser. No signup, no
              tracking, no data sent to servers. Just tools that work.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="#tools"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors shadow-lg text-lg"
              >
                Explore Tools
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-colors border border-white/20 text-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video — Watch How We Work */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <ScrollReveal>
              <div className="neu-card overflow-hidden rounded-2xl shadow-lg">
                <video
                  controls
                  playsInline
                  className="w-full aspect-video object-cover"
                >
                  <source src="/video-2.mp4" type="video/mp4" />
                </video>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4 uppercase tracking-wide">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Watch How We Work
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Built by Developers,{" "}
                <span className="text-primary">for Developers</span>
              </h2>
              <p className="text-muted mb-4 leading-relaxed">
                Watch our team in action — reviewing and testing every tool on Zentrify.
                From JSON to TypeScript conversion to CSS generators, we make sure
                each utility works flawlessly before it reaches you.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <span className="mt-1 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-sm text-muted"><strong className="text-foreground">Real team, real testing</strong> — every tool is reviewed and validated by our dev team</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-sm text-muted"><strong className="text-foreground">JSON → TypeScript</strong> — instant, accurate type generation from any JSON</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-sm text-muted"><strong className="text-foreground">CSS Generator</strong> — glassmorphism, gradients, and more with live preview</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-sm text-muted"><strong className="text-foreground">100% Free</strong> — no hidden costs, no signups, no data collection</span>
                </li>
              </ul>
              <Link
                href="#tools"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors shadow-md"
              >
                Try Our Tools
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section id="tools" className="pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-center mb-3">
              Developer Utilities
            </h2>
            <p className="text-muted text-center mb-10 max-w-lg mx-auto">
              Every tool runs client-side. Your code stays on your machine.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool, i) => (
              <ScrollReveal key={tool.href} delay={i * 0.1}>
                <Link
                  href={tool.href}
                  className={`group block p-6 neu-card border-t-4 ${tool.borderColor} hover:shadow-lg transition-all duration-200 h-full`}
                >
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`w-14 h-14 rounded-xl ${tool.iconBg} ${tool.color} flex items-center justify-center mb-5`}
                  >
                    {tool.icon}
                  </motion.div>
                  <h3 className="text-lg font-semibold mb-2">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-muted">{tool.description}</p>
                  <div className={`mt-4 text-sm font-medium ${tool.color} flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity`}>
                    Try it
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <ScrollReveal delay={0}>
              <div className="neu-card p-6 text-center border-t-4 border-t-success">
                <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-success mb-2">
                  <AnimatedCounter target={100} suffix="%" />
                </div>
                <div className="font-medium mb-1">Free Forever</div>
                <p className="text-sm text-muted">
                  No hidden fees, no premium plans. Every tool is completely
                  free.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="neu-card p-6 text-center border-t-4 border-t-primary">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-primary mb-2">
                  <AnimatedCounter target={0} />
                </div>
                <div className="font-medium mb-1">Data Collected</div>
                <p className="text-sm text-muted">
                  Everything runs in your browser. Your data never leaves your
                  device.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="neu-card p-6 text-center border-t-4 border-t-orange">
                <div className="w-12 h-12 rounded-full bg-orange/10 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-orange mb-2">Fast</div>
                <div className="font-medium mb-1">Instant Results</div>
                <p className="text-sm text-muted">
                  No loading screens. Get results the moment you type or click.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 px-4 sm:px-6">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center neu-card p-10 border-t-4 border-t-primary">
            <h2 className="text-2xl font-bold mb-3">
              Built for Developers, by Developers
            </h2>
            <p className="text-muted mb-6 max-w-lg mx-auto">
              Stop wasting time on repetitive tasks. Convert, generate, and
              transform — all from your browser, in seconds.
            </p>
            <Link
              href="#tools"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors shadow-md"
            >
              Get Started — It&apos;s Free
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7-7l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
