"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type Demo = {
  id: "json" | "regex" | "color";
  label: string;
  href: string;
  input: string;
  speed: number;
};

const demos: Demo[] = [
  {
    id: "json",
    label: "JSON → TS",
    href: "/tools/json-to-typescript",
    input: '{\n  "name": "Ayesha",\n  "age": 24,\n  "isPro": true\n}',
    speed: 40,
  },
  {
    id: "regex",
    label: "Regex",
    href: "/tools/regex-tester",
    input: String.raw`\d{3}-\d{4}`,
    speed: 110,
  },
  {
    id: "color",
    label: "Colors",
    href: "/tools/color-palette",
    input: "#7a52b3",
    speed: 120,
  },
];

const HOLD_MS = 3200;

// Each JSON input line maps 1:1 to an output line
const tsLines: React.ReactNode[] = [
  <><span className="text-primary">interface</span> User {"{"}</>,
  <>  name: <span className="text-primary">string</span>;</>,
  <>  age: <span className="text-primary">number</span>;</>,
  <>  isPro: <span className="text-primary">boolean</span>;</>,
  <>{"}"}</>,
];

const regexSample = "Call 555-1234 or 555-9876 before Friday.";

const palette = ["#ede7f6", "#c9b5e3", "#9d7bd1", "#7a52b3", "#4f3478"];

function Caret() {
  return <span className="inline-block w-[2px] h-[1.1em] -mb-[0.2em] ml-px bg-primary animate-pulse" />;
}

function JsonDemo({ text, done }: { text: string; done: boolean }) {
  const input = demos[0].input;
  const lineEnds = input.split("\n").map((_, i, arr) => arr.slice(0, i + 1).join("\n").length);
  const visibleLines = lineEnds.filter((end) => text.length >= end).length;

  return (
    <div className="grid grid-cols-2 h-full divide-x divide-surface-border">
      <div className="p-4 sm:p-5">
        <p className="text-[11px] uppercase tracking-wider text-muted mb-3">Input</p>
        <pre className="font-mono text-[13px] leading-6 whitespace-pre-wrap text-foreground">
          {text.split(/("[^"]*"?)/).map((part, i) =>
            part.startsWith('"') ? <span key={i} className="text-primary">{part}</span> : part
          )}
          {!done && <Caret />}
        </pre>
      </div>
      <div className="p-4 sm:p-5 bg-background/60">
        <p className="text-[11px] uppercase tracking-wider text-muted mb-3">TypeScript</p>
        <pre className="font-mono text-[13px] leading-6 whitespace-pre text-foreground">
          {tsLines.slice(0, visibleLines).map((line, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }}>
              {line}
            </motion.div>
          ))}
        </pre>
      </div>
    </div>
  );
}

function RegexDemo({ text, done }: { text: string; done: boolean }) {
  const segments: { value: string; match: boolean }[] = [];
  let count = 0;
  let last = 0;
  if (text) {
    try {
      for (const m of regexSample.matchAll(new RegExp(text, "g"))) {
        if (!m[0] || m.index === undefined) continue;
        segments.push({ value: regexSample.slice(last, m.index), match: false });
        segments.push({ value: m[0], match: true });
        last = m.index + m[0].length;
        count++;
      }
    } catch {
      // Partial pattern can be invalid while typing
    }
  }
  segments.push({ value: regexSample.slice(last), match: false });

  return (
    <div className="p-4 sm:p-5 space-y-5">
      <div>
        <p className="text-[11px] uppercase tracking-wider text-muted mb-2">Pattern</p>
        <div className="font-mono text-[15px] px-3 py-2.5 rounded-lg border border-surface-border bg-background/60">
          <span className="text-muted">/</span>
          {text}
          {!done && <Caret />}
          <span className="text-muted">/g</span>
        </div>
      </div>
      <div>
        <p className="text-[11px] uppercase tracking-wider text-muted mb-2">Test string</p>
        <p className="font-mono text-[14px] leading-7 text-foreground">
          {segments.map((s, i) =>
            s.match ? (
              <mark key={i} className="bg-primary/15 text-primary rounded px-0.5">{s.value}</mark>
            ) : (
              <span key={i}>{s.value}</span>
            )
          )}
        </p>
      </div>
      <p className="text-[13px] text-muted">
        <span className="font-semibold text-foreground">{count}</span> {count === 1 ? "match" : "matches"}
      </p>
    </div>
  );
}

function ColorDemo({ text, done }: { text: string; done: boolean }) {
  return (
    <div className="p-4 sm:p-5 space-y-5">
      <div>
        <p className="text-[11px] uppercase tracking-wider text-muted mb-2">Base color</p>
        <div className="flex items-center gap-3 font-mono text-[15px] px-3 py-2.5 rounded-lg border border-surface-border bg-background/60">
          <span
            className="w-5 h-5 rounded-md border border-surface-border transition-colors"
            style={{ background: done ? text : "transparent" }}
          />
          <span>
            {text}
            {!done && <Caret />}
          </span>
        </div>
      </div>
      <div>
        <p className="text-[11px] uppercase tracking-wider text-muted mb-2">Palette</p>
        <div className="grid grid-cols-5 gap-2">
          {palette.map((hex, i) => (
            <motion.div
              key={hex}
              initial={false}
              animate={{ opacity: done ? 1 : 0.15, y: done ? 0 : 6 }}
              transition={{ delay: done ? i * 0.07 : 0, duration: 0.3 }}
            >
              <div className="h-14 rounded-lg border border-black/5" style={{ background: hex }} />
              <p className="mt-1.5 font-mono text-[11px] text-muted text-center">{hex}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function HeroDemo() {
  const [active, setActive] = useState(0);
  const [typed, setTyped] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  const demo = demos[active];

  useEffect(() => {
    if (typed < demo.input.length) {
      const t = setTimeout(() => setTyped((n) => n + 1), demo.speed);
      return () => clearTimeout(t);
    }
    if (paused) return;
    const t = setTimeout(() => {
      setActive((a) => (a + 1) % demos.length);
      setTyped(0);
    }, HOLD_MS);
    return () => clearTimeout(t);
  }, [typed, demo, paused]);

  const shown = reduceMotion ? demo.input.length : typed;
  const text = demo.input.slice(0, shown);
  const done = shown >= demo.input.length;

  return (
    <div
      className="rounded-2xl border border-surface-border bg-surface shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-12px_rgba(0,0,0,0.12)] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex items-center justify-between gap-2 px-3 py-2.5 border-b border-surface-border">
        <div className="flex gap-1" role="tablist" aria-label="Tool previews">
          {demos.map((d, i) => (
            <button
              key={d.id}
              role="tab"
              aria-selected={i === active}
              onClick={() => {
                setActive(i);
                setTyped(0);
              }}
              className={`px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors cursor-pointer ${
                i === active ? "bg-background text-foreground" : "text-muted hover:text-foreground"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
        <Link
          href={demo.href}
          className="inline-flex items-center gap-1 text-[13px] font-medium text-muted hover:text-primary transition-colors whitespace-nowrap"
        >
          Open tool
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="h-[260px]" role="tabpanel">
        {demo.id === "json" && <JsonDemo text={text} done={done} />}
        {demo.id === "regex" && <RegexDemo text={text} done={done} />}
        {demo.id === "color" && <ColorDemo text={text} done={done} />}
      </div>

      <div className="h-0.5 bg-surface-border/50">
        <motion.div
          key={active}
          className="h-full bg-primary/60"
          initial={{ width: "0%" }}
          animate={{ width: done ? "100%" : `${(shown / demo.input.length) * 100}%` }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </div>
  );
}
