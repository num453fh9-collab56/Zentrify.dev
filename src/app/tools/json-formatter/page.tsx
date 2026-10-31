"use client";

import { useState, useCallback } from "react";
import { useToast } from "../../components/toast";
import { ToolPageHeader } from "../../components/tool-page-header";

type IndentType = "2" | "4" | "tab";
type ViewMode = "raw" | "tree";

function getIndent(type: IndentType): string | number {
  if (type === "tab") return "\t";
  return Number(type);
}

function sortObjectKeys(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    return obj.map(sortObjectKeys);
  }
  if (obj !== null && typeof obj === "object") {
    const sorted: Record<string, unknown> = {};
    Object.keys(obj as Record<string, unknown>)
      .sort((a, b) => a.localeCompare(b))
      .forEach((key) => {
        sorted[key] = sortObjectKeys((obj as Record<string, unknown>)[key]);
      });
    return sorted;
  }
  return obj;
}

function tryFixJson(json: string): string {
  let fixed = json.trim();
  fixed = fixed.replace(/,\s*([}\]])/g, "$1");
  fixed = fixed.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, (match, p1, p2, p3, p4, offset, string) => {
    if (p1 || p3) return match;
    return `"${p2}":`;
  });
  fixed = fixed.replace(/'/g, '"');
  return fixed;
}

export default function JSONFormatterPage() {
  const { toast } = useToast();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indent, setIndent] = useState<IndentType>("2");
  const [sortKeys, setSortKeys] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("raw");
  const [stats, setStats] = useState<{ inputSize: number; outputSize: number; keys: number } | null>(null);

  const countKeys = (obj: unknown): number => {
    if (Array.isArray(obj)) {
      return obj.reduce((acc, item) => acc + countKeys(item), 0);
    }
    if (obj !== null && typeof obj === "object") {
      return Object.keys(obj as Record<string, unknown>).reduce((acc, key) => {
        return acc + 1 + countKeys((obj as Record<string, unknown>)[key]);
      }, 0);
    }
    return 0;
  };

  const format = useCallback(() => {
    if (!input.trim()) {
      setError("Please enter some JSON.");
      setOutput("");
      setStats(null);
      return;
    }
    try {
      let parsed = JSON.parse(input);
      if (sortKeys) {
        parsed = sortObjectKeys(parsed);
      }
      const formatted = JSON.stringify(parsed, null, getIndent(indent));
      setOutput(formatted);
      setError("");
      setStats({
        inputSize: new Blob([input]).size,
        outputSize: new Blob([formatted]).size,
        keys: countKeys(parsed),
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Invalid JSON";
      setError(msg);
      setOutput("");
      setStats(null);
    }
  }, [input, indent, sortKeys]);

  const minify = useCallback(() => {
    if (!input.trim()) {
      setError("Please enter some JSON.");
      setOutput("");
      setStats(null);
      return;
    }
    try {
      let parsed = JSON.parse(input);
      if (sortKeys) {
        parsed = sortObjectKeys(parsed);
      }
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError("");
      setStats({
        inputSize: new Blob([input]).size,
        outputSize: new Blob([minified]).size,
        keys: countKeys(parsed),
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Invalid JSON";
      setError(msg);
      setOutput("");
      setStats(null);
    }
  }, [input, sortKeys]);

  const validate = useCallback(() => {
    if (!input.trim()) {
      setError("Please enter some JSON.");
      setStats(null);
      return;
    }
    try {
      const parsed = JSON.parse(input);
      setError("");
      toast("Valid JSON!", "success");
      setStats({
        inputSize: new Blob([input]).size,
        outputSize: new Blob([input]).size,
        keys: countKeys(parsed),
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Invalid JSON";
      setError(msg);
      setStats(null);
    }
  }, [input, toast]);

  const copy = useCallback(() => {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      toast("Copied to clipboard!");
    });
  }, [output, toast]);

  const copyAsJs = useCallback(() => {
    if (!input.trim()) return;
    try {
      let parsed = JSON.parse(input);
      if (sortKeys) parsed = sortObjectKeys(parsed);
      const js = JSON.stringify(parsed, null, 2).replace(/"([^"]+)":/g, "$1:");
      navigator.clipboard.writeText(js).then(() => {
        toast("Copied as JS Object!");
      });
    } catch (e) {
      toast("Invalid JSON", "error");
    }
  }, [input, sortKeys, toast]);

  const download = useCallback(() => {
    if (!output) return;
    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.json";
    a.click();
    URL.revokeObjectURL(url);
    toast("Downloaded!");
  }, [output, toast]);

  const fixJson = useCallback(() => {
    if (!input.trim()) {
      setError("Please enter some JSON.");
      return;
    }
    try {
      const fixed = tryFixJson(input);
      const parsed = JSON.parse(fixed);
      const formatted = JSON.stringify(parsed, null, getIndent(indent));
      setInput(fixed);
      setOutput(formatted);
      setError("");
      toast("JSON fixed & formatted!", "success");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Could not fix JSON";
      setError(msg);
    }
  }, [input, indent, toast]);

  const sample = useCallback(() => {
    const json = JSON.stringify(
      {
        name: "Zentrify",
        version: "1.0.0",
        tools: ["JSON Formatter", "UUID Generator", "Base64 Encoder"],
        config: { theme: "dark", language: "en" },
      },
      null,
      2
    );
    setInput(json);
    setOutput("");
    setError("");
    setStats(null);
  }, []);

  return (
    <section className="pt-6 sm:pt-8 pb-10 sm:pb-14 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <ToolPageHeader title="JSON Formatter & Validator" />

        <div className="neu-card p-5 mb-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <label className="text-xs text-muted">Indent:</label>
              {(["2", "4", "tab"] as IndentType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setIndent(t)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    indent === t
                      ? "bg-primary text-white"
                      : "bg-background text-muted hover:text-foreground"
                  }`}
                >
                  {t === "tab" ? "Tab" : `${t} Spaces`}
                </button>
              ))}
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={sortKeys}
                onChange={(e) => setSortKeys(e.target.checked)}
                className="accent-primary w-4 h-4"
              />
              <span className="text-xs">Sort Keys</span>
            </label>
            <div className="flex items-center gap-2 ml-auto flex-wrap">
              <button
                onClick={sample}
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-background text-muted hover:text-foreground transition-colors"
              >
                Sample
              </button>
              <button
                onClick={fixJson}
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-background text-muted hover:text-foreground transition-colors"
              >
                Fix JSON
              </button>
              <button
                onClick={validate}
                className="px-4 py-1.5 text-xs font-medium rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                Validate
              </button>
              <button
                onClick={minify}
                className="px-4 py-1.5 text-xs font-medium rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                Minify
              </button>
              <button
                onClick={format}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors"
              >
                Format
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-error/10 border border-error/20 text-error text-sm">
            {error}
          </div>
        )}

        {stats && (
          <div className="mb-4 flex flex-wrap items-center gap-4 text-xs text-muted">
            <span>Input: {(stats.inputSize / 1024).toFixed(2)} KB</span>
            <span>Output: {(stats.outputSize / 1024).toFixed(2)} KB</span>
            <span>Keys: {stats.keys}</span>
            <span>Size saved: {stats.inputSize > 0 ? (((stats.inputSize - stats.outputSize) / stats.inputSize) * 100).toFixed(1) : 0}%</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Input</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={copyAsJs}
                  className="text-xs text-muted hover:text-foreground transition-colors"
                >
                  Copy as JS
                </button>
                <button
                  onClick={() => {
                    setInput("");
                    setOutput("");
                    setError("");
                    setStats(null);
                  }}
                  className="text-xs text-muted hover:text-foreground transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Paste your JSON here...\n{\n  "key": "value"\n}'
              className="w-full h-80 code-area p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
              spellCheck={false}
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Output</label>
              {output && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={copy}
                    className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Copy
                  </button>
                  <button
                    onClick={download}
                    className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Download
                  </button>
                </div>
              )}
            </div>
            <textarea
              value={output}
              readOnly
              placeholder="Formatted JSON will appear here..."
              className="w-full h-80 code-area p-4 text-sm focus:outline-none resize-none"
              spellCheck={false}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
