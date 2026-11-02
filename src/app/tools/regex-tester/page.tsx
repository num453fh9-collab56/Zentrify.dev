"use client";

import { useState, useMemo, useCallback } from "react";
import { useToast } from "../../components/toast";
import { ToolPageHeader } from "../../components/tool-page-header";

const presets = [
  { label: "Email", pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}" },
  { label: "URL", pattern: "https?:\\/\\/[^\\s/$.?#].[^\\s]*" },
  { label: "IPv4", pattern: "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b" },
  { label: "Phone", pattern: "\\+?\\d[\\d\\s()-]{7,}" },
  { label: "Hex Color", pattern: "#(?:[0-9a-fA-F]{3}){1,2}\\b" },
  { label: "Date (YYYY-MM-DD)", pattern: "\\d{4}-\\d{2}-\\d{2}" },
  { label: "HTML Tag", pattern: "<\\/?[a-z][\\w-]*(?:\\s[^>]*)?\\/?>", },
  { label: "Slug", pattern: "[a-z0-9]+(?:-[a-z0-9]+)*" },
];

const sampleText = `Hello world! My email is dev@zentrify.dev and my backup is test.user@example.com.
Visit https://zentrify.dev or http://example.com/path?q=test for more info.
Colors: #ff6600, #333, #8b5cf6
IP: 192.168.1.1, 10.0.0.255
Phone: +1 (555) 123-4567
Date: 2026-10-22, 2025-01-15`;

const cheatsheet: { title: string; items: { token: string; desc: string }[] }[] = [
  {
    title: "Character Classes",
    items: [
      { token: ".", desc: "Any character (except newline)" },
      { token: "\\d", desc: "Digit [0-9]" },
      { token: "\\D", desc: "Non-digit" },
      { token: "\\w", desc: "Word char [a-zA-Z0-9_]" },
      { token: "\\W", desc: "Non-word char" },
      { token: "\\s", desc: "Whitespace" },
      { token: "\\S", desc: "Non-whitespace" },
      { token: "[abc]", desc: "Any of a, b, c" },
      { token: "[^abc]", desc: "Not a, b, or c" },
      { token: "[a-z]", desc: "Range a to z" },
    ],
  },
  {
    title: "Quantifiers",
    items: [
      { token: "*", desc: "0 or more" },
      { token: "+", desc: "1 or more" },
      { token: "?", desc: "0 or 1 (optional)" },
      { token: "{n}", desc: "Exactly n" },
      { token: "{n,}", desc: "n or more" },
      { token: "{n,m}", desc: "Between n and m" },
      { token: "*?", desc: "0 or more (lazy)" },
      { token: "+?", desc: "1 or more (lazy)" },
    ],
  },
  {
    title: "Anchors & Boundaries",
    items: [
      { token: "^", desc: "Start of string/line" },
      { token: "$", desc: "End of string/line" },
      { token: "\\b", desc: "Word boundary" },
      { token: "\\B", desc: "Non-word boundary" },
    ],
  },
  {
    title: "Groups & References",
    items: [
      { token: "(abc)", desc: "Capture group" },
      { token: "(?:abc)", desc: "Non-capture group" },
      { token: "(?<name>abc)", desc: "Named group" },
      { token: "\\1", desc: "Backreference to group 1" },
      { token: "a|b", desc: "Alternation (a or b)" },
    ],
  },
  {
    title: "Lookahead & Lookbehind",
    items: [
      { token: "(?=abc)", desc: "Positive lookahead" },
      { token: "(?!abc)", desc: "Negative lookahead" },
      { token: "(?<=abc)", desc: "Positive lookbehind" },
      { token: "(?<!abc)", desc: "Negative lookbehind" },
    ],
  },
];

interface MatchResult {
  full: string;
  index: number;
  length: number;
  groups: string[];
  namedGroups: Record<string, string> | null;
}

interface SavedPattern {
  name: string;
  pattern: string;
  flags: string;
  testString: string;
}

const SAVED_KEY = "zentrify-regex-saved";

function loadSaved(): SavedPattern[] {
  try {
    const raw = localStorage.getItem(SAVED_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveSaved(list: SavedPattern[]) {
  try { localStorage.setItem(SAVED_KEY, JSON.stringify(list)); } catch { /* noop */ }
}

function explainRegex(pat: string): string[] {
  const parts: string[] = [];
  let i = 0;
  while (i < pat.length) {
    const ch = pat[i];
    if (ch === "\\") {
      const next = pat[i + 1] || "";
      const escMap: Record<string, string> = {
        d: "a digit [0-9]", D: "a non-digit", w: "a word character [a-zA-Z0-9_]",
        W: "a non-word character", s: "whitespace", S: "non-whitespace",
        b: "a word boundary", B: "a non-word boundary", n: "a newline",
        t: "a tab", r: "a carriage return", ".": 'a literal "."',
        "\\": 'a literal "\\"', "/": 'a literal "/"', "(": 'a literal "("',
        ")": 'a literal ")"', "[": 'a literal "["', "]": 'a literal "]"',
        "{": 'a literal "{"', "}": 'a literal "}"', "+": 'a literal "+"',
        "*": 'a literal "*"', "?": 'a literal "?"', "^": 'a literal "^"',
        "$": 'a literal "$"', "|": 'a literal "|"',
      };
      if (next in escMap) { parts.push(escMap[next]); i += 2; }
      else if (/\d/.test(next)) { parts.push(`back-reference to group ${next}`); i += 2; }
      else { parts.push(`\\${next}`); i += 2; }
    } else if (ch === "[") {
      const end = pat.indexOf("]", i + 1);
      if (end === -1) { parts.push('"["'); i++; continue; }
      const cls = pat.slice(i, end + 1);
      const negated = cls[1] === "^";
      parts.push(`${negated ? "any character NOT in" : "any character in"} ${cls}`);
      i = end + 1;
    } else if (ch === "(") {
      if (pat.slice(i, i + 3) === "(?:") { parts.push("non-capturing group start"); i += 3; }
      else if (pat.slice(i, i + 4) === "(?<=") { parts.push("positive lookbehind start"); i += 4; }
      else if (pat.slice(i, i + 4) === "(?<!") { parts.push("negative lookbehind start"); i += 4; }
      else if (pat.slice(i, i + 3) === "(?=") { parts.push("positive lookahead start"); i += 3; }
      else if (pat.slice(i, i + 3) === "(?!") { parts.push("negative lookahead start"); i += 3; }
      else if (pat.slice(i).match(/^\(\?<([^>]+)>/)) {
        const nm = pat.slice(i).match(/^\(\?<([^>]+)>/)!;
        parts.push(`named capture group "${nm[1]}" start`);
        i += nm[0].length;
      } else { parts.push("capture group start"); i++; }
    } else if (ch === ")") { parts.push("group end"); i++; }
    else if (ch === "^") { parts.push("start of string"); i++; }
    else if (ch === "$") { parts.push("end of string"); i++; }
    else if (ch === ".") { parts.push("any character"); i++; }
    else if (ch === "|") { parts.push("OR"); i++; }
    else if (ch === "*") {
      if (pat[i + 1] === "?") { parts.push("0 or more (lazy)"); i += 2; }
      else { parts.push("0 or more"); i++; }
    } else if (ch === "+") {
      if (pat[i + 1] === "?") { parts.push("1 or more (lazy)"); i += 2; }
      else { parts.push("1 or more"); i++; }
    } else if (ch === "?") {
      if (pat[i + 1] === "?") { parts.push("optional (lazy)"); i += 2; }
      else { parts.push("optional"); i++; }
    } else if (ch === "{") {
      const end = pat.indexOf("}", i);
      if (end === -1) { parts.push('"{"'); i++; continue; }
      const q = pat.slice(i + 1, end);
      const lazy = pat[end + 1] === "?";
      if (q.includes(",")) {
        const [lo, hi] = q.split(",");
        if (hi) parts.push(`between ${lo} and ${hi} times${lazy ? " (lazy)" : ""}`);
        else parts.push(`${lo} or more times${lazy ? " (lazy)" : ""}`);
      } else {
        parts.push(`exactly ${q} times`);
      }
      i = end + 1 + (lazy ? 1 : 0);
    } else {
      let literal = "";
      while (i < pat.length && !"\\[]()^$.|*+?{".includes(pat[i])) {
        literal += pat[i]; i++;
      }
      if (literal.length === 1) parts.push(`"${literal}"`);
      else parts.push(`"${literal}" literally`);
    }
  }
  return parts;
}

type Tab = "match" | "replace";

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}");
  const [flags, setFlags] = useState("gi");
  const [testString, setTestString] = useState(sampleText);
  const [replacement, setReplacement] = useState("");
  const [tab, setTab] = useState<Tab>("match");
  const [showCheatsheet, setShowCheatsheet] = useState(false);
  const [showExplain, setShowExplain] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [saved, setSaved] = useState<SavedPattern[]>(() => loadSaved());
  const [saveName, setSaveName] = useState("");
  const [perLine, setPerLine] = useState(false);
  const { toast } = useToast();

  const toggleFlag = (flag: string) => {
    setFlags((prev) =>
      prev.includes(flag) ? prev.replace(flag, "") : prev + flag
    );
  };

  const { matches, error, highlightedText, replaceResult, execTime } = useMemo(() => {
    if (!pattern.trim()) return { matches: [] as MatchResult[], error: "", highlightedText: escapeHtml(testString), replaceResult: testString, execTime: 0 };

    try {
      const t0 = performance.now();
      const gFlags = flags.includes("g") ? flags : flags + "g";
      const re = new RegExp(pattern, gFlags);
      const results: MatchResult[] = [];

      const lines = perLine ? testString.split("\n") : [testString];
      let fullHighlighted = "";
      let replaced = "";

      for (let li = 0; li < lines.length; li++) {
        const line = lines[li];
        const lineRe = new RegExp(pattern, gFlags);
        let m: RegExpExecArray | null;

        while ((m = lineRe.exec(line)) !== null) {
          results.push({
            full: m[0],
            index: m.index + (perLine ? lines.slice(0, li).reduce((a, l) => a + l.length + 1, 0) : 0),
            length: m[0].length,
            groups: m.slice(1),
            namedGroups: m.groups ? { ...m.groups } : null,
          });
          if (!m[0]) lineRe.lastIndex++;
        }

        const hlRe = new RegExp(pattern, gFlags);
        let hl = "";
        let last = 0;
        let mHL: RegExpExecArray | null;
        while ((mHL = hlRe.exec(line)) !== null) {
          hl += escapeHtml(line.slice(last, mHL.index));
          hl += `<mark class="bg-primary/25 text-primary border-b-2 border-primary rounded-sm px-0.5">${escapeHtml(mHL[0])}</mark>`;
          last = mHL.index + mHL[0].length;
          if (!mHL[0]) hlRe.lastIndex++;
        }
        hl += escapeHtml(line.slice(last));
        fullHighlighted += (li > 0 ? "\n" : "") + hl;

        const repRe = new RegExp(pattern, gFlags);
        replaced += (li > 0 ? "\n" : "") + line.replace(repRe, replacement);
      }

      if (!perLine) {
        re.lastIndex = 0;
        replaced = testString.replace(re, replacement);
      }

      const execTime = Math.round((performance.now() - t0) * 100) / 100;

      return { matches: results, error: "", highlightedText: fullHighlighted, replaceResult: replaced, execTime };
    } catch (e) {
      return {
        matches: [] as MatchResult[],
        error: e instanceof Error ? e.message : "Invalid regex",
        highlightedText: escapeHtml(testString),
        replaceResult: testString,
        execTime: 0,
      };
    }
  }, [pattern, flags, testString, replacement, perLine]);

  const explanation = useMemo(() => {
    if (!pattern.trim()) return [];
    return explainRegex(pattern);
  }, [pattern]);

  const handleSave = useCallback(() => {
    const name = saveName.trim() || `Pattern ${saved.length + 1}`;
    const next = [...saved, { name, pattern, flags, testString }];
    setSaved(next);
    saveSaved(next);
    setSaveName("");
    toast(`Saved "${name}"`);
  }, [saveName, saved, pattern, flags, testString, toast]);

  const handleDeleteSaved = useCallback((idx: number) => {
    const next = saved.filter((_, i) => i !== idx);
    setSaved(next);
    saveSaved(next);
  }, [saved]);

  const handleLoadSaved = useCallback((sp: SavedPattern) => {
    setPattern(sp.pattern);
    setFlags(sp.flags);
    setTestString(sp.testString);
    toast(`Loaded "${sp.name}"`);
  }, [toast]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-10 sm:pb-14">
      <ToolPageHeader />

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
                { flag: "u", label: "unicode" },
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

        {/* Toolbar: presets, mode tabs, toggles */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-xs text-muted">Presets:</span>
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

        <div className="flex flex-wrap items-center gap-2">
          {/* Tab toggle */}
          <div className="flex rounded-lg bg-background border border-surface-border overflow-hidden">
            {(["match", "replace"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-1.5 text-xs font-semibold transition-colors capitalize ${
                  tab === t ? "bg-primary text-white" : "text-muted hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-1.5 text-xs text-muted cursor-pointer select-none">
            <input type="checkbox" checked={perLine} onChange={() => setPerLine(!perLine)} className="accent-[var(--primary)]" />
            Per-line
          </label>
          <button
            onClick={() => setShowCheatsheet(!showCheatsheet)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${showCheatsheet ? "bg-primary/10 border-primary/30 text-primary" : "border-surface-border text-muted hover:text-primary"}`}
          >
            Cheatsheet
          </button>
          <button
            onClick={() => setShowExplain(!showExplain)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${showExplain ? "bg-primary/10 border-primary/30 text-primary" : "border-surface-border text-muted hover:text-primary"}`}
          >
            Explain
          </button>
          <button
            onClick={() => setShowSaved(!showSaved)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${showSaved ? "bg-primary/10 border-primary/30 text-primary" : "border-surface-border text-muted hover:text-primary"}`}
          >
            Saved ({saved.length})
          </button>
          {!error && pattern.trim() && (
            <span className="ml-auto text-xs text-muted">{execTime}ms</span>
          )}
        </div>

        {/* Replace input */}
        {tab === "replace" && (
          <div className="mt-3">
            <label className="block text-xs font-medium mb-1 text-muted">Replacement (supports $1, $2, $&amp;)</label>
            <input
              type="text"
              value={replacement}
              onChange={(e) => setReplacement(e.target.value)}
              className="neu-input w-full px-4 py-2.5 text-sm font-mono"
              placeholder="Replacement string..."
              spellCheck={false}
            />
          </div>
        )}
      </div>

      {/* Explain */}
      {showExplain && pattern.trim() && (
        <div className="neu-card p-5 mb-6">
          <h3 className="text-sm font-semibold mb-3">Pattern Explanation</h3>
          <div className="flex flex-wrap gap-1.5">
            {explanation.map((part, i) => (
              <span key={i} className="inline-flex px-2 py-1 rounded-lg bg-background border border-surface-border text-xs font-mono">
                {part}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Saved patterns */}
      {showSaved && (
        <div className="neu-card p-5 mb-6">
          <h3 className="text-sm font-semibold mb-3">Saved Patterns</h3>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              placeholder="Pattern name..."
              className="neu-input flex-1 px-3 py-2 text-sm"
            />
            <button onClick={handleSave} className="px-4 py-2 text-xs font-semibold rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors">
              Save Current
            </button>
          </div>
          {saved.length === 0 ? (
            <p className="text-xs text-muted">No saved patterns yet.</p>
          ) : (
            <div className="space-y-1.5 max-h-48 overflow-auto">
              {saved.map((sp, i) => (
                <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-background border border-surface-border">
                  <button onClick={() => handleLoadSaved(sp)} className="flex-1 text-left min-w-0">
                    <span className="text-sm font-medium block truncate">{sp.name}</span>
                    <span className="text-xs text-muted font-mono truncate block">/{sp.pattern}/{sp.flags}</span>
                  </button>
                  <button onClick={() => handleDeleteSaved(i)} className="text-xs text-muted hover:text-error transition-colors shrink-0" title="Delete">✕</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Cheatsheet */}
      {showCheatsheet && (
        <div className="neu-card p-5 mb-6">
          <h3 className="text-sm font-semibold mb-3">Regex Cheatsheet</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cheatsheet.map((cat) => (
              <div key={cat.title}>
                <h4 className="text-xs font-bold text-muted uppercase tracking-wider mb-2">{cat.title}</h4>
                <div className="space-y-1">
                  {cat.items.map((item) => (
                    <div key={item.token} className="flex items-baseline gap-2">
                      <code className="text-xs font-mono font-bold text-primary shrink-0 w-20 text-right">{item.token}</code>
                      <span className="text-xs text-muted">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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

        {/* Highlighted Preview / Replace result */}
        <div className="neu-card p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">{tab === "replace" ? "Replace Result" : "Match Preview"}</span>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted">
                {matches.length} match{matches.length !== 1 ? "es" : ""}
              </span>
              {tab === "replace" && (
                <button
                  onClick={() => { navigator.clipboard.writeText(replaceResult); toast("Copied!"); }}
                  className="text-xs text-muted hover:text-primary transition-colors"
                >
                  Copy
                </button>
              )}
            </div>
          </div>
          {tab === "replace" ? (
            <div className="code-area w-full h-56 p-4 text-sm overflow-auto whitespace-pre-wrap">
              {replaceResult}
            </div>
          ) : (
            <div
              className="code-area w-full h-56 p-4 text-sm overflow-auto whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: highlightedText }}
            />
          )}
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
                const text = matches
                  .map((m, i) => `Match ${i + 1}: "${m.full}" at index ${m.index} (length ${m.length})${m.groups.length ? ` groups: ${m.groups.join(", ")}` : ""}`)
                  .join("\n");
                navigator.clipboard.writeText(text);
                toast("Matches copied!");
              }}
              className="neu-btn px-3 py-1.5 text-xs font-medium text-muted hover:text-primary"
            >
              Copy All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-border text-xs text-muted">
                  <th className="text-left py-2 px-3 font-semibold w-10">#</th>
                  <th className="text-left py-2 px-3 font-semibold">Match</th>
                  <th className="text-left py-2 px-3 font-semibold w-16">Index</th>
                  <th className="text-left py-2 px-3 font-semibold w-16">Length</th>
                  <th className="text-left py-2 px-3 font-semibold">Groups</th>
                </tr>
              </thead>
              <tbody>
                {matches.slice(0, 100).map((m, i) => (
                  <tr key={i} className="border-b border-surface-border/50 hover:bg-surface/50">
                    <td className="py-2 px-3 text-xs text-muted">{i + 1}</td>
                    <td className="py-2 px-3 font-mono text-xs break-all">
                      <span className="bg-primary/10 text-primary rounded px-1">{m.full}</span>
                    </td>
                    <td className="py-2 px-3 text-xs text-muted">{m.index}</td>
                    <td className="py-2 px-3 text-xs text-muted">{m.length}</td>
                    <td className="py-2 px-3 text-xs text-muted font-mono">
                      {m.groups.length > 0
                        ? m.groups.map((g, j) => (
                            <span key={j} className="mr-2">${j + 1}=&quot;{g}&quot;</span>
                          ))
                        : "—"}
                      {m.namedGroups &&
                        Object.entries(m.namedGroups).map(([k, v]) => (
                          <span key={k} className="mr-2 text-accent">{k}=&quot;{v}&quot;</span>
                        ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {matches.length > 100 && (
              <p className="text-xs text-muted mt-2 text-center">Showing first 100 of {matches.length} matches</p>
            )}
          </div>
        </div>
      )}
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
