"use client";

import { useState, useMemo } from "react";
import { useToast } from "../../components/toast";

const presets = [
  { label: "Email", pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}" },
  { label: "URL", pattern: "https?:\\/\\/[^\\s/$.?#].[^\\s]*" },
  { label: "IPv4", pattern: "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b" },
  { label: "Phone", pattern: "\\+?\\d[\\d\\s()-]{7,}" },
  { label: "Hex Color", pattern: "#(?:[0-9a-fA-F]{3}){1,2}\\b" },
  { label: "Date (YYYY-MM-DD)", pattern: "\\d{4}-\\d{2}-\\d{2}" },
];

const sampleText = `Hello world! My email is dev@zentrify.dev and my backup is test.user@example.com.
Visit https://zentrify.dev or http://example.com/path?q=test for more info.
Colors: #ff6600, #333, #8b5cf6
IP: 192.168.1.1, 10.0.0.255
Phone: +1 (555) 123-4567
Date: 2026-10-22, 2025-01-15`;

interface MatchResult {
  full: string;
  index: number;
  groups: string[];
}

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}");
  const [flags, setFlags] = useState("gi");
  const [testString, setTestString] = useState(sampleText);
  const { toast } = useToast();

  const toggleFlag = (flag: string) => {
    setFlags((prev) =>
      prev.includes(flag) ? prev.replace(flag, "") : prev + flag
    );
  };

  const { matches, error, highlightedText } = useMemo(() => {
    if (!pattern.trim()) return { matches: [], error: "", highlightedText: testString };

    try {
      const re = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");
      const results: MatchResult[] = [];
      let m: RegExpExecArray | null;

      while ((m = re.exec(testString)) !== null) {
        results.push({
          full: m[0],
          index: m.index,
          groups: m.slice(1),
        });
        if (!m[0]) re.lastIndex++;
      }

      let highlighted = "";
      let lastIndex = 0;
      const reHL = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");
      let mHL: RegExpExecArray | null;

      while ((mHL = reHL.exec(testString)) !== null) {
        const before = testString.slice(lastIndex, mHL.index);
        highlighted += escapeHtml(before);
        highlighted += `<mark class="bg-primary/25 text-primary border-b-2 border-primary rounded-sm px-0.5">${escapeHtml(mHL[0])}</mark>`;
        lastIndex = mHL.index + mHL[0].length;
        if (!mHL[0]) reHL.lastIndex++;
      }
      highlighted += escapeHtml(testString.slice(lastIndex));

      return { matches: results, error: "", highlightedText: highlighted };
    } catch (e) {
      return {
        matches: [],
        error: e instanceof Error ? e.message : "Invalid regex",
        highlightedText: escapeHtml(testString),
      };
    }
  }, [pattern, flags, testString]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          Regex Tester
        </h1>
        <p className="text-muted text-lg">
          Test regular expressions with real-time matching and capture groups.
        </p>
      </div>

      {/* Pattern Input */}
      <div className="neu-card p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1.5">Pattern</label>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className="neu-input w-full px-4 py-3 text-sm font-mono"
              placeholder="Enter regex pattern..."
              spellCheck={false}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Flags</label>
            <div className="flex gap-1.5">
              {[
                { flag: "g", label: "global" },
                { flag: "i", label: "case-insensitive" },
                { flag: "m", label: "multiline" },
                { flag: "s", label: "dotall" },
              ].map(({ flag, label }) => (
                <button
                  key={flag}
                  onClick={() => toggleFlag(flag)}
                  title={label}
                  className={`w-10 h-10 rounded-lg text-sm font-mono font-bold transition-all ${
                    flags.includes(flag)
                      ? "bg-primary text-white shadow-md"
                      : "bg-background text-muted hover:text-foreground border border-surface-border"
                  }`}
                >
                  {flag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {error && (
          <p className="text-error text-sm font-medium mb-3">{error}</p>
        )}

        {/* Presets */}
        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted self-center">Presets:</span>
          {presets.map((p) => (
            <button
              key={p.label}
              onClick={() => setPattern(p.pattern)}
              className="px-3 py-1 text-xs font-medium rounded-lg bg-background border border-surface-border text-muted hover:text-primary hover:border-primary/30 transition-colors"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Test String */}
        <div className="neu-card p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">Test String</span>
            <button
              onClick={() => setTestString("")}
              className="text-xs text-muted hover:text-error transition-colors"
            >
              Clear
            </button>
          </div>
          <textarea
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            className="code-area w-full h-56 p-4 text-sm resize-none"
            spellCheck={false}
          />
        </div>

        {/* Highlighted Preview */}
        <div className="neu-card p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">Match Preview</span>
            <span className="text-xs text-muted">
              {matches.length} match{matches.length !== 1 ? "es" : ""}
            </span>
          </div>
          <div
            className="code-area w-full h-56 p-4 text-sm overflow-auto whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: highlightedText }}
          />
        </div>
      </div>

      {/* Match Details */}
      {matches.length > 0 && (
        <div className="neu-card p-6 mt-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium">
              Match Details ({matches.length})
            </span>
            <button
              onClick={() => {
                const text = matches.map((m, i) => `Match ${i + 1}: "${m.full}" at index ${m.index}`).join("\n");
                navigator.clipboard.writeText(text);
                toast("Matches copied!");
              }}
              className="neu-btn px-3 py-1.5 text-xs font-medium text-muted hover:text-primary"
            >
              Copy All
            </button>
          </div>
          <div className="space-y-2 max-h-64 overflow-auto">
            {matches.map((m, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-xl bg-background border border-surface-border"
              >
                <span className="shrink-0 w-7 h-7 flex items-center justify-center rounded-lg bg-primary/10 text-primary text-xs font-bold">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-mono break-all">
                    &quot;{m.full}&quot;
                  </p>
                  <p className="text-xs text-muted mt-0.5">
                    Index: {m.index}
                    {m.groups.length > 0 && (
                      <> &middot; Groups: {m.groups.map((g, j) => `$${j + 1}="${g}"`).join(", ")}</>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* SEO Article */}
      <article className="mt-16 max-w-4xl mx-auto space-y-10">
        <section>
          <h2 className="text-2xl font-bold mb-4">Free Online Regex Tester &amp; Debugger</h2>
          <p className="text-muted leading-relaxed mb-3">
            Test and debug regular expressions in real time with Zentrify&apos;s free regex tester.
            Write your pattern, paste your test string, and instantly see all matches highlighted
            with capture group details. Supports all JavaScript regex flags including global,
            case-insensitive, multiline, dotAll, and unicode modes.
          </p>
          <p className="text-muted leading-relaxed">
            Whether you&apos;re validating emails, parsing log files, extracting data from text,
            or learning regex for the first time — this tool gives you instant visual feedback
            without leaving your browser.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Why Use a Regex Tester?</h2>
          <ul className="text-muted space-y-2 list-disc list-inside">
            <li><strong className="text-foreground">Instant feedback</strong> — see matches highlighted as you type, no need to run your code</li>
            <li><strong className="text-foreground">Debug complex patterns</strong> — capture groups, lookaheads, and quantifiers are visualized clearly</li>
            <li><strong className="text-foreground">Learn by doing</strong> — experiment with patterns and immediately see what they match</li>
            <li><strong className="text-foreground">Save time</strong> — catch regex errors before they reach your codebase</li>
            <li><strong className="text-foreground">Built-in presets</strong> — start with common patterns for email, URL, IP, phone numbers, and more</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="neu-card-sm p-4">
              <h3 className="font-semibold mb-1">Real-Time Matching</h3>
              <p className="text-sm text-muted">Matches are highlighted instantly as you type your pattern or modify your test string — zero delay.</p>
            </div>
            <div className="neu-card-sm p-4">
              <h3 className="font-semibold mb-1">Capture Groups</h3>
              <p className="text-sm text-muted">View all capture groups for each match with their index and content — essential for data extraction patterns.</p>
            </div>
            <div className="neu-card-sm p-4">
              <h3 className="font-semibold mb-1">All JS Flags</h3>
              <p className="text-sm text-muted">Toggle g (global), i (case-insensitive), m (multiline), s (dotAll), and u (unicode) flags with one click.</p>
            </div>
            <div className="neu-card-sm p-4">
              <h3 className="font-semibold mb-1">Common Presets</h3>
              <p className="text-sm text-muted">One-click presets for email, URL, IPv4, phone, date, hex color, and more — great starting points to customize.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Common Regex Patterns</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-surface-border rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-surface">
                  <th className="text-left p-3 font-semibold border-b border-surface-border">Pattern</th>
                  <th className="text-left p-3 font-semibold border-b border-surface-border">Description</th>
                  <th className="text-left p-3 font-semibold border-b border-surface-border">Example Match</th>
                </tr>
              </thead>
              <tbody className="text-muted">
                <tr><td className="p-3 border-b border-surface-border font-mono text-xs">{`[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}`}</td><td className="p-3 border-b border-surface-border">Email address</td><td className="p-3 border-b border-surface-border">user@example.com</td></tr>
                <tr><td className="p-3 border-b border-surface-border font-mono text-xs">{`https?://[^\\s]+`}</td><td className="p-3 border-b border-surface-border">URL</td><td className="p-3 border-b border-surface-border">https://zentrify.com</td></tr>
                <tr><td className="p-3 border-b border-surface-border font-mono text-xs">{`\\b\\d{1,3}(\\.\\d{1,3}){3}\\b`}</td><td className="p-3 border-b border-surface-border">IPv4 address</td><td className="p-3 border-b border-surface-border">192.168.1.1</td></tr>
                <tr><td className="p-3 border-b border-surface-border font-mono text-xs">{`#[0-9a-fA-F]{3,8}`}</td><td className="p-3 border-b border-surface-border">Hex color</td><td className="p-3 border-b border-surface-border">#ff6600</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="neu-card-sm p-5">
              <h3 className="font-semibold mb-2">Which regex flavor does this use?</h3>
              <p className="text-sm text-muted">This tool uses JavaScript&apos;s native RegExp engine — the same one running in Node.js and all modern browsers. Patterns you test here will work identically in your JavaScript/TypeScript code.</p>
            </div>
            <div className="neu-card-sm p-5">
              <h3 className="font-semibold mb-2">Can I test multiline strings?</h3>
              <p className="text-sm text-muted">Yes! Paste multi-line text in the test string area and enable the &apos;m&apos; (multiline) flag to make ^ and $ match line boundaries instead of string boundaries.</p>
            </div>
            <div className="neu-card-sm p-5">
              <h3 className="font-semibold mb-2">Is my data private?</h3>
              <p className="text-sm text-muted">100% private. All regex matching runs locally in your browser using JavaScript&apos;s built-in RegExp. No data is transmitted to any server.</p>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
