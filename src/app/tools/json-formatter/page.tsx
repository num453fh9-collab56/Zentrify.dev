"use client";

import { useState, useCallback, useMemo } from "react";
import { useToast } from "../../components/toast";
import { ToolPageHeader } from "../../components/tool-page-header";

type IndentType = "2" | "4" | "tab";
type Tab = "format" | "tree" | "diff" | "yaml" | "query";

function getIndent(type: IndentType): string | number {
  if (type === "tab") return "\t";
  return Number(type);
}

function sortObjectKeys(obj: unknown): unknown {
  if (Array.isArray(obj)) return obj.map(sortObjectKeys);
  if (obj !== null && typeof obj === "object") {
    const sorted: Record<string, unknown> = {};
    Object.keys(obj as Record<string, unknown>)
      .sort((a, b) => a.localeCompare(b))
      .forEach((key) => { sorted[key] = sortObjectKeys((obj as Record<string, unknown>)[key]); });
    return sorted;
  }
  return obj;
}

function tryFixJson(json: string): string {
  let fixed = json.trim();
  fixed = fixed.replace(/,\s*([}\]])/g, "$1");
  fixed = fixed.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, (match, p1, p2, p3) => {
    if (p1 || p3) return match;
    return `"${p2}":`;
  });
  fixed = fixed.replace(/'/g, '"');
  return fixed;
}

function countKeys(obj: unknown): number {
  if (Array.isArray(obj)) return obj.reduce((acc: number, item) => acc + countKeys(item), 0);
  if (obj !== null && typeof obj === "object") {
    return Object.keys(obj as Record<string, unknown>).reduce((acc, key) => {
      return acc + 1 + countKeys((obj as Record<string, unknown>)[key]);
    }, 0);
  }
  return 0;
}

/* ── Syntax Highlighting ── */
function highlightJson(json: string): string {
  return json.replace(
    /("(?:\\.|[^"\\])*")\s*:|("(?:\\.|[^"\\])*")|\b(true|false)\b|\b(null)\b|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g,
    (match, key, str, bool, nul, num) => {
      if (key) return `<span class="jk">${key}</span>:`;
      if (str) return `<span class="js">${str}</span>`;
      if (bool) return `<span class="jb">${bool}</span>`;
      if (nul) return `<span class="jn">${nul}</span>`;
      if (num) return `<span class="jnum">${num}</span>`;
      return match;
    }
  );
}

/* ── JSONPath (basic) ── */
function queryJsonPath(obj: unknown, path: string): unknown[] {
  const parts = path.replace(/^\$\.?/, "").split(/\.|\[/).filter(Boolean).map((p) => p.replace(/]$/, ""));
  if (parts.length === 0 || (parts.length === 1 && parts[0] === "")) return [obj];

  function walk(node: unknown, idx: number): unknown[] {
    if (idx >= parts.length) return [node];
    const seg = parts[idx];
    if (seg === "*") {
      if (Array.isArray(node)) return node.flatMap((item) => walk(item, idx + 1));
      if (node !== null && typeof node === "object") {
        return Object.values(node as Record<string, unknown>).flatMap((v) => walk(v, idx + 1));
      }
      return [];
    }
    if (Array.isArray(node)) {
      const n = parseInt(seg, 10);
      if (!isNaN(n) && n >= 0 && n < node.length) return walk(node[n], idx + 1);
      return [];
    }
    if (node !== null && typeof node === "object") {
      const rec = node as Record<string, unknown>;
      if (seg in rec) return walk(rec[seg], idx + 1);
      return [];
    }
    return [];
  }
  return walk(obj, 0);
}

/* ── Type Summary ── */
interface TypeSummary { totalKeys: number; maxDepth: number; arrays: number; objects: number; strings: number; numbers: number; booleans: number; nulls: number; arrayLengths: number[]; }

function analyzeStructure(obj: unknown, depth: number = 0): TypeSummary {
  const s: TypeSummary = { totalKeys: 0, maxDepth: depth, arrays: 0, objects: 0, strings: 0, numbers: 0, booleans: 0, nulls: 0, arrayLengths: [] };
  if (Array.isArray(obj)) {
    s.arrays = 1; s.arrayLengths = [obj.length];
    for (const item of obj) { const c = analyzeStructure(item, depth + 1); merge(s, c); }
  } else if (obj !== null && typeof obj === "object") {
    s.objects = 1;
    const entries = Object.entries(obj as Record<string, unknown>);
    s.totalKeys = entries.length;
    for (const [, v] of entries) { const c = analyzeStructure(v, depth + 1); merge(s, c); }
  } else if (typeof obj === "string") { s.strings = 1; }
  else if (typeof obj === "number") { s.numbers = 1; }
  else if (typeof obj === "boolean") { s.booleans = 1; }
  else if (obj === null) { s.nulls = 1; }
  return s;
}

function merge(target: TypeSummary, source: TypeSummary) {
  target.totalKeys += source.totalKeys;
  target.maxDepth = Math.max(target.maxDepth, source.maxDepth);
  target.arrays += source.arrays;
  target.objects += source.objects;
  target.strings += source.strings;
  target.numbers += source.numbers;
  target.booleans += source.booleans;
  target.nulls += source.nulls;
  target.arrayLengths.push(...source.arrayLengths);
}

/* ── JSON ↔ YAML ── */
function jsonToYaml(obj: unknown, indent: number = 0): string {
  const pad = "  ".repeat(indent);
  if (obj === null) return "null";
  if (typeof obj === "boolean") return obj ? "true" : "false";
  if (typeof obj === "number") return String(obj);
  if (typeof obj === "string") {
    if (/[:#\[\]{}&*!|>'"%@`,?]/.test(obj) || obj === "" || obj.includes("\n")) return JSON.stringify(obj);
    return obj;
  }
  if (Array.isArray(obj)) {
    if (obj.length === 0) return "[]";
    return obj.map((item) => {
      const v = jsonToYaml(item, indent + 1);
      if (typeof item === "object" && item !== null && !Array.isArray(item)) return `${pad}- ${v.trimStart()}`;
      return `${pad}- ${v}`;
    }).join("\n");
  }
  if (typeof obj === "object") {
    const entries = Object.entries(obj as Record<string, unknown>);
    if (entries.length === 0) return "{}";
    return entries.map(([key, val]) => {
      const safeKey = /^[a-zA-Z0-9_.-]+$/.test(key) ? key : JSON.stringify(key);
      if (val !== null && typeof val === "object") {
        const sub = jsonToYaml(val, indent + 1);
        return `${pad}${safeKey}:\n${sub}`;
      }
      return `${pad}${safeKey}: ${jsonToYaml(val, indent + 1)}`;
    }).join("\n");
  }
  return String(obj);
}

function yamlToJson(yaml: string): unknown {
  const lines = yaml.split("\n");
  let pos = 0;

  function peekIndent(): number {
    while (pos < lines.length && lines[pos].trim() === "") pos++;
    if (pos >= lines.length) return -1;
    return lines[pos].search(/\S/);
  }

  function parseValue(raw: string): unknown {
    const t = raw.trim();
    if (t === "" || t === "~" || t === "null") return null;
    if (t === "true") return true;
    if (t === "false") return false;
    if (/^-?\d+$/.test(t)) return parseInt(t, 10);
    if (/^-?\d+\.\d+$/.test(t)) return parseFloat(t);
    if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) return t.slice(1, -1);
    if (t.startsWith("[")) { try { return JSON.parse(t); } catch { return t; } }
    if (t.startsWith("{")) { try { return JSON.parse(t); } catch { return t; } }
    return t;
  }

  function parseBlock(baseIndent: number): unknown {
    if (pos >= lines.length) return null;
    const firstLine = lines[pos];
    const trimmed = firstLine.trim();

    if (trimmed.startsWith("- ")) {
      const arr: unknown[] = [];
      while (pos < lines.length) {
        const ind = peekIndent();
        if (ind < baseIndent || ind === -1) break;
        if (ind > baseIndent) { arr.push(parseBlock(ind)); continue; }
        const line = lines[pos].trim();
        if (!line.startsWith("- ")) break;
        pos++;
        const rest = line.slice(2).trim();
        if (rest.includes(": ") || rest.endsWith(":")) {
          pos--;
          const tempLine = lines[pos];
          lines[pos] = tempLine.replace("- ", "  ");
          arr.push(parseBlock(baseIndent + 2));
          lines[pos > 0 ? pos - 1 : 0] = tempLine;
        } else if (rest === "") {
          const nextInd = peekIndent();
          if (nextInd > baseIndent) arr.push(parseBlock(nextInd));
          else arr.push(null);
        } else {
          arr.push(parseValue(rest));
        }
      }
      return arr;
    }

    if (trimmed.includes(":")) {
      const obj: Record<string, unknown> = {};
      while (pos < lines.length) {
        const ind = peekIndent();
        if (ind < baseIndent || ind === -1) break;
        if (ind > baseIndent) { pos++; continue; }
        const line = lines[pos].trim();
        if (line.startsWith("- ")) break;
        const colonIdx = line.indexOf(":");
        if (colonIdx === -1) { pos++; continue; }
        const key = line.slice(0, colonIdx).trim().replace(/^["']|["']$/g, "");
        const rest = line.slice(colonIdx + 1).trim();
        pos++;
        if (rest === "") {
          const nextInd = peekIndent();
          if (nextInd > baseIndent) obj[key] = parseBlock(nextInd);
          else obj[key] = null;
        } else {
          obj[key] = parseValue(rest);
        }
      }
      return obj;
    }

    pos++;
    return parseValue(trimmed);
  }

  const indent = peekIndent();
  if (indent === -1) return null;
  return parseBlock(indent);
}

/* ── JSON Diff ── */
interface DiffEntry { path: string; type: "added" | "removed" | "changed"; oldVal?: string; newVal?: string; }

function diffJson(a: unknown, b: unknown, path: string = "$"): DiffEntry[] {
  const results: DiffEntry[] = [];
  if (a === b) return results;
  if (typeof a !== typeof b || Array.isArray(a) !== Array.isArray(b) || (a === null) !== (b === null)) {
    results.push({ path, type: "changed", oldVal: JSON.stringify(a), newVal: JSON.stringify(b) });
    return results;
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    const maxLen = Math.max(a.length, b.length);
    for (let i = 0; i < maxLen; i++) {
      if (i >= a.length) results.push({ path: `${path}[${i}]`, type: "added", newVal: JSON.stringify(b[i]) });
      else if (i >= b.length) results.push({ path: `${path}[${i}]`, type: "removed", oldVal: JSON.stringify(a[i]) });
      else results.push(...diffJson(a[i], b[i], `${path}[${i}]`));
    }
    return results;
  }
  if (a !== null && b !== null && typeof a === "object" && typeof b === "object") {
    const aObj = a as Record<string, unknown>;
    const bObj = b as Record<string, unknown>;
    const allKeys = new Set([...Object.keys(aObj), ...Object.keys(bObj)]);
    for (const key of allKeys) {
      const p = `${path}.${key}`;
      if (!(key in aObj)) results.push({ path: p, type: "added", newVal: JSON.stringify(bObj[key]) });
      else if (!(key in bObj)) results.push({ path: p, type: "removed", oldVal: JSON.stringify(aObj[key]) });
      else results.push(...diffJson(aObj[key], bObj[key], p));
    }
    return results;
  }
  if (a !== b) results.push({ path, type: "changed", oldVal: JSON.stringify(a), newVal: JSON.stringify(b) });
  return results;
}

/* ── Tree View Component ── */
function TreeNode({ label, value, defaultOpen }: { label?: string; value: unknown; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  const isObj = value !== null && typeof value === "object";
  const isArr = Array.isArray(value);
  const entries = isArr ? value.map((v, i) => [String(i), v] as const) : isObj ? Object.entries(value as Record<string, unknown>) : [];

  const typeColor = (v: unknown) => {
    if (v === null) return "jn";
    switch (typeof v) {
      case "string": return "js";
      case "number": return "jnum";
      case "boolean": return "jb";
      default: return "";
    }
  };

  if (!isObj) {
    return (
      <div className="flex items-baseline gap-1 py-0.5 pl-4">
        {label !== undefined && <span className="jk shrink-0">&quot;{label}&quot;:</span>}
        <span className={typeColor(value)}>{JSON.stringify(value)}</span>
      </div>
    );
  }

  return (
    <div className="pl-3">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-1 py-0.5 hover:bg-primary/5 rounded px-1 -ml-1 text-left w-full">
        <svg className={`w-3 h-3 text-muted transition-transform ${open ? "rotate-90" : ""}`} fill="currentColor" viewBox="0 0 20 20"><path d="M6 6l8 4-8 4V6z" /></svg>
        {label !== undefined && <span className="jk">&quot;{label}&quot;:</span>}
        <span className="text-muted text-xs">{isArr ? `Array(${entries.length})` : `Object{${entries.length}}`}</span>
      </button>
      {open && (
        <div className="border-l border-surface-border ml-1.5">
          {entries.map(([k, v]) => <TreeNode key={k} label={isArr ? undefined : k} value={v} />)}
        </div>
      )}
    </div>
  );
}

/* ── Main Component ── */
export default function JSONFormatterPage() {
  const { toast } = useToast();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indent, setIndent] = useState<IndentType>("2");
  const [sortKeys, setSortKeys] = useState(false);
  const [stats, setStats] = useState<{ inputSize: number; outputSize: number; keys: number } | null>(null);
  const [tab, setTab] = useState<Tab>("format");
  const [showHighlight, setShowHighlight] = useState(false);

  // Diff state
  const [diffA, setDiffA] = useState("");
  const [diffB, setDiffB] = useState("");

  // YAML state
  const [yamlInput, setYamlInput] = useState("");
  const [yamlOutput, setYamlOutput] = useState("");
  const [yamlDir, setYamlDir] = useState<"toYaml" | "toJson">("toYaml");

  // Query state
  const [queryPath, setQueryPath] = useState("$");

  /* ── Existing actions ── */
  const format = useCallback(() => {
    if (!input.trim()) { setError("Please enter some JSON."); setOutput(""); setStats(null); return; }
    try {
      let parsed = JSON.parse(input);
      if (sortKeys) parsed = sortObjectKeys(parsed);
      const formatted = JSON.stringify(parsed, null, getIndent(indent));
      setOutput(formatted); setError("");
      setStats({ inputSize: new Blob([input]).size, outputSize: new Blob([formatted]).size, keys: countKeys(parsed) });
    } catch (e) { setError(e instanceof Error ? e.message : "Invalid JSON"); setOutput(""); setStats(null); }
  }, [input, indent, sortKeys]);

  const minify = useCallback(() => {
    if (!input.trim()) { setError("Please enter some JSON."); setOutput(""); setStats(null); return; }
    try {
      let parsed = JSON.parse(input);
      if (sortKeys) parsed = sortObjectKeys(parsed);
      const minified = JSON.stringify(parsed);
      setOutput(minified); setError("");
      setStats({ inputSize: new Blob([input]).size, outputSize: new Blob([minified]).size, keys: countKeys(parsed) });
    } catch (e) { setError(e instanceof Error ? e.message : "Invalid JSON"); setOutput(""); setStats(null); }
  }, [input, sortKeys]);

  const validate = useCallback(() => {
    if (!input.trim()) { setError("Please enter some JSON."); setStats(null); return; }
    try {
      const parsed = JSON.parse(input); setError(""); toast("Valid JSON!", "success");
      setStats({ inputSize: new Blob([input]).size, outputSize: new Blob([input]).size, keys: countKeys(parsed) });
    } catch (e) { setError(e instanceof Error ? e.message : "Invalid JSON"); setStats(null); }
  }, [input, toast]);

  const copy = useCallback(() => {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => toast("Copied to clipboard!"));
  }, [output, toast]);

  const copyAsJs = useCallback(() => {
    if (!input.trim()) return;
    try {
      let parsed = JSON.parse(input);
      if (sortKeys) parsed = sortObjectKeys(parsed);
      const js = JSON.stringify(parsed, null, 2).replace(/"([^"]+)":/g, "$1:");
      navigator.clipboard.writeText(js).then(() => toast("Copied as JS Object!"));
    } catch { toast("Invalid JSON", "error"); }
  }, [input, sortKeys, toast]);

  const download = useCallback(() => {
    if (!output) return;
    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "formatted.json"; a.click();
    URL.revokeObjectURL(url); toast("Downloaded!");
  }, [output, toast]);

  const fixJson = useCallback(() => {
    if (!input.trim()) { setError("Please enter some JSON."); return; }
    try {
      const fixed = tryFixJson(input);
      const parsed = JSON.parse(fixed);
      const formatted = JSON.stringify(parsed, null, getIndent(indent));
      setInput(fixed); setOutput(formatted); setError(""); toast("JSON fixed & formatted!", "success");
    } catch (e) { setError(e instanceof Error ? e.message : "Could not fix JSON"); }
  }, [input, indent, toast]);

  const sample = useCallback(() => {
    const json = JSON.stringify({ name: "Zentrify", version: "1.0.0", tools: ["JSON Formatter", "UUID Generator", "Base64 Encoder"], config: { theme: "dark", language: "en" }, stats: { users: 12400, uptime: 99.97, active: true } }, null, 2);
    setInput(json); setOutput(""); setError(""); setStats(null);
  }, []);

  /* ── Parsed input memo ── */
  const parsed = useMemo(() => {
    try { return input.trim() ? JSON.parse(input) : null; } catch { return null; }
  }, [input]);

  /* ── Type summary ── */
  const typeSummary = useMemo(() => parsed ? analyzeStructure(parsed) : null, [parsed]);

  /* ── Syntax highlighted output ── */
  const highlighted = useMemo(() => output ? highlightJson(output) : "", [output]);

  /* ── Query results ── */
  const queryResults = useMemo(() => {
    if (!parsed || !queryPath.trim()) return [];
    try { return queryJsonPath(parsed, queryPath); } catch { return []; }
  }, [parsed, queryPath]);

  /* ── Diff results ── */
  const diffResults = useMemo(() => {
    try {
      if (!diffA.trim() || !diffB.trim()) return null;
      const a = JSON.parse(diffA);
      const b = JSON.parse(diffB);
      return diffJson(a, b);
    } catch { return null; }
  }, [diffA, diffB]);

  /* ── YAML convert ── */
  const handleYaml = useCallback(() => {
    try {
      if (yamlDir === "toYaml") {
        const parsed = JSON.parse(yamlInput);
        setYamlOutput(jsonToYaml(parsed));
      } else {
        const obj = yamlToJson(yamlInput);
        setYamlOutput(JSON.stringify(obj, null, 2));
      }
    } catch (e) {
      setYamlOutput(`Error: ${e instanceof Error ? e.message : "Conversion failed"}`);
    }
  }, [yamlInput, yamlDir]);

  const tabs: { id: Tab; label: string }[] = [
    { id: "format", label: "Format" },
    { id: "tree", label: "Tree" },
    { id: "query", label: "Path Query" },
    { id: "diff", label: "Diff" },
    { id: "yaml", label: "YAML" },
  ];

  return (
    <section className="pt-6 sm:pt-8 pb-10 sm:pb-14 px-4 sm:px-6">
      <style>{`
        .jk{color:var(--primary)}.js{color:var(--success)}.jb{color:var(--orange)}.jn{color:var(--muted)}.jnum{color:var(--accent)}
        .hl-out{font-family:var(--font-mono);font-size:.8125rem;line-height:1.7;white-space:pre-wrap;word-break:break-word}
      `}</style>
      <div className="max-w-6xl mx-auto">
        <ToolPageHeader title="JSON Formatter & Validator" />

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-4 overflow-x-auto">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${tab === t.id ? "bg-primary text-white" : "bg-surface text-muted hover:text-foreground border border-surface-border"}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ═══ FORMAT TAB ═══ */}
        {tab === "format" && (
          <>
            <div className="neu-card p-5 mb-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <label className="text-xs text-muted">Indent:</label>
                  {(["2", "4", "tab"] as IndentType[]).map((t) => (
                    <button key={t} onClick={() => setIndent(t)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${indent === t ? "bg-primary text-white" : "bg-background text-muted hover:text-foreground"}`}>
                      {t === "tab" ? "Tab" : `${t} Spaces`}
                    </button>
                  ))}
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={sortKeys} onChange={(e) => setSortKeys(e.target.checked)} className="accent-primary w-4 h-4" />
                  <span className="text-xs">Sort Keys</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={showHighlight} onChange={(e) => setShowHighlight(e.target.checked)} className="accent-primary w-4 h-4" />
                  <span className="text-xs">Highlight</span>
                </label>
                <div className="flex items-center gap-2 ml-auto flex-wrap">
                  <button onClick={sample} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-background text-muted hover:text-foreground transition-colors">Sample</button>
                  <button onClick={fixJson} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-background text-muted hover:text-foreground transition-colors">Fix JSON</button>
                  <button onClick={validate} className="px-4 py-1.5 text-xs font-medium rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">Validate</button>
                  <button onClick={minify} className="px-4 py-1.5 text-xs font-medium rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">Minify</button>
                  <button onClick={format} className="px-4 py-2 text-xs font-semibold rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors">Format</button>
                </div>
              </div>
            </div>

            {error && <div className="mb-4 px-4 py-3 rounded-xl bg-error/10 border border-error/20 text-error text-sm">{error}</div>}

            {stats && (
              <div className="mb-4 flex flex-wrap items-center gap-4 text-xs text-muted">
                <span>Input: {(stats.inputSize / 1024).toFixed(2)} KB</span>
                <span>Output: {(stats.outputSize / 1024).toFixed(2)} KB</span>
                <span>Keys: {stats.keys}</span>
                <span>Saved: {stats.inputSize > 0 ? (((stats.inputSize - stats.outputSize) / stats.inputSize) * 100).toFixed(1) : 0}%</span>
              </div>
            )}

            {/* Type summary */}
            {typeSummary && (
              <div className="mb-4 neu-card p-3 flex flex-wrap gap-3 text-xs">
                <span className="text-muted">Structure:</span>
                <span><strong>{typeSummary.totalKeys}</strong> keys</span>
                <span>depth <strong>{typeSummary.maxDepth}</strong></span>
                {typeSummary.objects > 0 && <span><strong>{typeSummary.objects}</strong> objects</span>}
                {typeSummary.arrays > 0 && <span><strong>{typeSummary.arrays}</strong> arrays</span>}
                {typeSummary.strings > 0 && <span className="js"><strong>{typeSummary.strings}</strong> strings</span>}
                {typeSummary.numbers > 0 && <span className="jnum"><strong>{typeSummary.numbers}</strong> numbers</span>}
                {typeSummary.booleans > 0 && <span className="jb"><strong>{typeSummary.booleans}</strong> booleans</span>}
                {typeSummary.nulls > 0 && <span className="jn"><strong>{typeSummary.nulls}</strong> nulls</span>}
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Input</label>
                  <div className="flex items-center gap-2">
                    <button onClick={copyAsJs} className="text-xs text-muted hover:text-foreground transition-colors">Copy as JS</button>
                    <button onClick={() => { setInput(""); setOutput(""); setError(""); setStats(null); }} className="text-xs text-muted hover:text-foreground transition-colors">Clear</button>
                  </div>
                </div>
                <textarea value={input} onChange={(e) => setInput(e.target.value)}
                  placeholder={'Paste your JSON here...\n{\n  "key": "value"\n}'}
                  className="w-full h-80 code-area p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" spellCheck={false} />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Output</label>
                  {output && (
                    <div className="flex items-center gap-2">
                      <button onClick={copy} className="text-xs text-primary hover:text-primary/80 font-medium transition-colors">Copy</button>
                      <button onClick={download} className="text-xs text-primary hover:text-primary/80 font-medium transition-colors">Download</button>
                    </div>
                  )}
                </div>
                {showHighlight && output ? (
                  <div className="w-full h-80 code-area p-4 overflow-auto hl-out" dangerouslySetInnerHTML={{ __html: highlighted }} />
                ) : (
                  <textarea value={output} readOnly placeholder="Formatted JSON will appear here..."
                    className="w-full h-80 code-area p-4 text-sm focus:outline-none resize-none" spellCheck={false} />
                )}
              </div>
            </div>
          </>
        )}

        {/* ═══ TREE TAB ═══ */}
        {tab === "tree" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">JSON Input</label>
              <textarea value={input} onChange={(e) => setInput(e.target.value)}
                placeholder="Paste JSON to visualize as a tree..."
                className="w-full h-[500px] code-area p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" spellCheck={false} />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Tree View</label>
              <div className="neu-card p-4 h-[500px] overflow-auto text-xs font-mono">
                {parsed ? (
                  <TreeNode value={parsed} defaultOpen />
                ) : (
                  <p className="text-muted text-sm">Enter valid JSON on the left to see the tree.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ═══ QUERY TAB ═══ */}
        {tab === "query" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">JSON Input</label>
              <textarea value={input} onChange={(e) => setInput(e.target.value)}
                placeholder="Paste JSON to query..."
                className="w-full h-[480px] code-area p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" spellCheck={false} />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">JSONPath Query</label>
              <input value={queryPath} onChange={(e) => setQueryPath(e.target.value)}
                placeholder="$.users[0].name"
                className="w-full px-4 py-2.5 neu-input text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-primary/30 font-mono" />
              <div className="flex flex-wrap gap-2 mb-3">
                {["$", "$.config", "$.tools[*]", "$.tools[0]", "$.stats"].map((p) => (
                  <button key={p} onClick={() => setQueryPath(p)} className="px-2 py-1 text-[11px] rounded bg-background text-muted hover:text-foreground border border-surface-border transition-colors font-mono">{p}</button>
                ))}
              </div>
              <div className="neu-card p-4 h-[390px] overflow-auto">
                <p className="text-xs text-muted mb-2">{queryResults.length} result{queryResults.length !== 1 ? "s" : ""}</p>
                {queryResults.length > 0 ? (
                  <pre className="text-xs font-mono whitespace-pre-wrap">{queryResults.map((r) => JSON.stringify(r, null, 2)).join("\n---\n")}</pre>
                ) : (
                  <p className="text-sm text-muted">No results. Enter a valid JSONPath like <code className="text-primary">$.key</code></p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ═══ DIFF TAB ═══ */}
        {tab === "diff" && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium mb-2 block">JSON A (Original)</label>
                <textarea value={diffA} onChange={(e) => setDiffA(e.target.value)}
                  placeholder="Paste first JSON..."
                  className="w-full h-60 code-area p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" spellCheck={false} />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">JSON B (Modified)</label>
                <textarea value={diffB} onChange={(e) => setDiffB(e.target.value)}
                  placeholder="Paste second JSON..."
                  className="w-full h-60 code-area p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" spellCheck={false} />
              </div>
            </div>
            <div className="neu-card p-4">
              <p className="text-sm font-medium mb-3">Structural Diff</p>
              {diffResults === null ? (
                <p className="text-sm text-muted">Paste valid JSON in both panels to see differences.</p>
              ) : diffResults.length === 0 ? (
                <p className="text-sm text-success font-medium">Identical — no differences found.</p>
              ) : (
                <div className="space-y-1.5 max-h-64 overflow-auto">
                  {diffResults.map((d, i) => (
                    <div key={i} className={`flex items-start gap-2 text-xs font-mono px-3 py-1.5 rounded-lg ${d.type === "added" ? "bg-success/10 text-success" : d.type === "removed" ? "bg-error/10 text-error" : "bg-warning/10 text-warning"}`}>
                      <span className="font-bold shrink-0">{d.type === "added" ? "+" : d.type === "removed" ? "−" : "~"}</span>
                      <span className="font-semibold shrink-0">{d.path}</span>
                      {d.type === "changed" && <span className="text-muted">: {d.oldVal} → {d.newVal}</span>}
                      {d.type === "added" && <span className="text-muted">: {d.newVal}</span>}
                      {d.type === "removed" && <span className="text-muted">: {d.oldVal}</span>}
                    </div>
                  ))}
                  <p className="text-xs text-muted pt-2">{diffResults.filter((d) => d.type === "added").length} added, {diffResults.filter((d) => d.type === "removed").length} removed, {diffResults.filter((d) => d.type === "changed").length} changed</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* ═══ YAML TAB ═══ */}
        {tab === "yaml" && (
          <>
            <div className="flex items-center gap-2 mb-4">
              <button onClick={() => setYamlDir("toYaml")}
                className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-colors ${yamlDir === "toYaml" ? "bg-primary text-white" : "bg-surface text-muted border border-surface-border hover:text-foreground"}`}>
                JSON → YAML
              </button>
              <button onClick={() => setYamlDir("toJson")}
                className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-colors ${yamlDir === "toJson" ? "bg-primary text-white" : "bg-surface text-muted border border-surface-border hover:text-foreground"}`}>
                YAML → JSON
              </button>
              <button onClick={handleYaml} className="px-4 py-2 text-xs font-semibold rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors ml-auto">Convert</button>
              <button onClick={() => { navigator.clipboard.writeText(yamlOutput).then(() => toast("Copied!")); }} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">Copy</button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">{yamlDir === "toYaml" ? "JSON Input" : "YAML Input"}</label>
                <textarea value={yamlInput} onChange={(e) => setYamlInput(e.target.value)}
                  placeholder={yamlDir === "toYaml" ? '{"key": "value"}' : "key: value\nitems:\n  - one\n  - two"}
                  className="w-full h-80 code-area p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" spellCheck={false} />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">{yamlDir === "toYaml" ? "YAML Output" : "JSON Output"}</label>
                <textarea value={yamlOutput} readOnly placeholder="Converted output..."
                  className="w-full h-80 code-area p-4 text-sm focus:outline-none resize-none" spellCheck={false} />
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
