"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

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
      {/* Hero */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple/5 to-success/5 animate-gradient" />
        <div className="relative max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Free &amp; Open — No Signup Required
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 leading-tight">
                Developer &amp; Designer Tools{" "}
                <span className="bg-gradient-to-r from-primary via-purple to-success bg-clip-text text-transparent">
                  Free &amp; Fast
                </span>
              </h1>
              <p className="text-lg text-muted max-w-xl mb-8">
                Lightweight utilities that run in your browser. No signup, no
                tracking, no data sent to servers. Just tools that work.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="#tools"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors shadow-md"
                >
                  Explore Tools
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
                <Link
                  href="https://github.com"
                  className="inline-flex items-center gap-2 px-7 py-3.5 neu-btn text-muted font-semibold hover:text-primary"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="hidden lg:block"
            >
              <CodeTypingBlock />
            </motion.div>
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
