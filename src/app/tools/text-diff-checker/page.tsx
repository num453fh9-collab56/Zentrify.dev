"use client";

import { useState, useCallback, useMemo } from "react";
import { ToolPageHeader } from "../../components/tool-page-header";
import { useToast } from "../../components/toast";

type DiffType = "equal" | "added" | "removed";
type DiffLine = { type: DiffType; text: string; lineOld?: number; lineNew?: number };
type WordSpan = { type: DiffType; text: string };
type ViewMode = "side" | "unified" | "inline";

function normalizeLine(line: string, ignoreCase: boolean, ignoreWhitespace: boolean, trimTrailing: boolean): string {
  let s = line;
  if (trimTrailing) s = s.replace(/\s+$/, "");
  if (ignoreWhitespace) s = s.replace(/\s+/g, " ").trim();
  if (ignoreCase) s = s.toLowerCase();
  return s;
}

function computeDiff(
  oldText: string,
  newText: string,
  ignoreCase: boolean,
  ignoreWhitespace: boolean,
  trimTrailing: boolean,
): DiffLine[] {
  const oldLines = oldText.split("\n");
  const newLines = newText.split("\n");
  const m = oldLines.length;
  const n = newLines.length;

  const oldNorm = oldLines.map((l) => normalizeLine(l, ignoreCase, ignoreWhitespace, trimTrailing));
  const newNorm = newLines.map((l) => normalizeLine(l, ignoreCase, ignoreWhitespace, trimTrailing));

  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = oldNorm[i - 1] === newNorm[j - 1]
        ? dp[i - 1][j - 1] + 1
        : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }

  const result: DiffLine[] = [];
  let i = m, j = n;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && oldNorm[i - 1] === newNorm[j - 1]) {
      result.unshift({ type: "equal", text: oldLines[i - 1], lineOld: i, lineNew: j });
      i--; j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      result.unshift({ type: "added", text: newLines[j - 1], lineNew: j });
      j--;
    } else {
      result.unshift({ type: "removed", text: oldLines[i - 1], lineOld: i });
      i--;
    }
  }
  return result;
}

function wordDiff(oldStr: string, newStr: string): WordSpan[] {
  const oldWords = oldStr.split(/(\s+)/);
  const newWords = newStr.split(/(\s+)/);
  const m = oldWords.length;
  const n = newWords.length;

  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = oldWords[i - 1] === newWords[j - 1]
        ? dp[i - 1][j - 1] + 1
        : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }

  const spans: WordSpan[] = [];
  let i = m, j = n;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && oldWords[i - 1] === newWords[j - 1]) {
      spans.unshift({ type: "equal", text: oldWords[i - 1] });
      i--; j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      spans.unshift({ type: "added", text: newWords[j - 1] });
      j--;
    } else {
      spans.unshift({ type: "removed", text: oldWords[i - 1] });
      i--;
    }
  }

  const merged: WordSpan[] = [];
  for (const s of spans) {
    const last = merged[merged.length - 1];
    if (last && last.type === s.type) {
      last.text += s.text;
    } else {
      merged.push({ ...s });
    }
  }
  return merged;
}

function pairChanges(diff: DiffLine[]): { type: "equal"; line: DiffLine }[] | { type: "change"; removed: DiffLine[]; added: DiffLine[] }[] {
  const groups: ({ type: "equal"; line: DiffLine } | { type: "change"; removed: DiffLine[]; added: DiffLine[] })[] = [];
  let i = 0;
  while (i < diff.length) {
    if (diff[i].type === "equal") {
      groups.push({ type: "equal", line: diff[i] });
      i++;
    } else {
      const removed: DiffLine[] = [];
      const added: DiffLine[] = [];
      while (i < diff.length && diff[i].type !== "equal") {
        if (diff[i].type === "removed") removed.push(diff[i]);
        else added.push(diff[i]);
        i++;
      }
      groups.push({ type: "change", removed, added });
    }
  }
  return groups as ReturnType<typeof pairChanges>;
}

export default function TextDiffCheckerPage() {
  const { toast } = useToast();
  const [oldText, setOldText] = useState("");
  const [newText, setNewText] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("side");
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);
  const [trimTrailing, setTrimTrailing] = useState(false);

  const diff = useMemo(() => {
    if (!oldText && !newText) return [];
    return computeDiff(oldText, newText, ignoreCase, ignoreWhitespace, trimTrailing);
  }, [oldText, newText, ignoreCase, ignoreWhitespace, trimTrailing]);

  const groups = useMemo(() => pairChanges(diff), [diff]);

  const stats = useMemo(() => {
    let added = 0, removed = 0, unchanged = 0;
    for (const line of diff) {
      if (line.type === "added") added++;
      else if (line.type === "removed") removed++;
      else unchanged++;
    }
    const total = added + removed + unchanged;
    const similarity = total > 0 ? Math.round((unchanged / Math.max(unchanged + removed, unchanged + added)) * 100) : 100;
    return { added, removed, unchanged, total, similarity };
  }, [diff]);

  const swap = useCallback(() => {
    setOldText(newText);
    setNewText(oldText);
  }, [oldText, newText]);

  const clear = useCallback(() => {
    setOldText("");
    setNewText("");
  }, []);

  const sample = useCallback(() => {
    setOldText(`function greet(name) {\n  console.log("Hello, " + name);\n  return true;\n}\n\ngreet("World");`);
    setNewText(`function greet(name, greeting = "Hello") {\n  console.log(greeting + ", " + name + "!");\n  return true;\n}\n\ngreet("World", "Hi");`);
  }, []);

  const copyDiff = useCallback(() => {
    const lines = diff.map((l) => {
      const prefix = l.type === "added" ? "+" : l.type === "removed" ? "-" : " ";
      return `${prefix} ${l.text}`;
    });
    const header = `--- Original\n+++ Modified\n`;
    navigator.clipboard.writeText(header + lines.join("\n")).then(() => toast("Unified diff copied!"));
  }, [diff, toast]);

  const viewModes: { value: ViewMode; label: string }[] = [
    { value: "side", label: "Side by Side" },
    { value: "unified", label: "Unified" },
    { value: "inline", label: "Inline" },
  ];

  return (
    <section className="pt-6 sm:pt-8 pb-10 sm:pb-14 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <ToolPageHeader />

        {/* Toolbar */}
        <div className="neu-card p-4 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={sample} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-background text-muted hover:text-foreground transition-colors">
              Sample
            </button>
            <button onClick={swap} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-background text-muted hover:text-foreground transition-colors flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
              </svg>
              Swap
            </button>
            <button onClick={clear} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-background text-muted hover:text-foreground transition-colors">
              Clear
            </button>
            {diff.length > 0 && (
              <button onClick={copyDiff} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-background text-muted hover:text-foreground transition-colors flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                Copy Diff
              </button>
            )}

            <div className="h-5 w-px bg-surface-border mx-1 hidden sm:block" />

            {/* View mode toggle */}
            <div className="flex items-center bg-background rounded-lg p-0.5">
              {viewModes.map((vm) => (
                <button
                  key={vm.value}
                  onClick={() => setViewMode(vm.value)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                    viewMode === vm.value
                      ? "bg-primary text-white shadow-sm"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {vm.label}
                </button>
              ))}
            </div>

            {/* Ignore options */}
            <div className="flex items-center gap-3 ml-auto flex-wrap">
              <label className="flex items-center gap-1.5 text-xs text-muted cursor-pointer select-none">
                <input type="checkbox" checked={ignoreCase} onChange={(e) => setIgnoreCase(e.target.checked)} className="rounded border-surface-border accent-primary w-3.5 h-3.5" />
                Ignore case
              </label>
              <label className="flex items-center gap-1.5 text-xs text-muted cursor-pointer select-none">
                <input type="checkbox" checked={ignoreWhitespace} onChange={(e) => setIgnoreWhitespace(e.target.checked)} className="rounded border-surface-border accent-primary w-3.5 h-3.5" />
                Ignore whitespace
              </label>
              <label className="flex items-center gap-1.5 text-xs text-muted cursor-pointer select-none">
                <input type="checkbox" checked={trimTrailing} onChange={(e) => setTrimTrailing(e.target.checked)} className="rounded border-surface-border accent-primary w-3.5 h-3.5" />
                Trim trailing
              </label>
            </div>
          </div>
        </div>

        {/* Input areas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-sm font-medium mb-2 block">Original</label>
            <textarea
              value={oldText}
              onChange={(e) => setOldText(e.target.value)}
              placeholder="Paste original text here..."
              className="w-full h-52 code-area p-4 text-sm focus:outline-none focus:ring-2 focus:ring-success/30 resize-none"
              spellCheck={false}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Modified</label>
            <textarea
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              placeholder="Paste modified text here..."
              className="w-full h-52 code-area p-4 text-sm focus:outline-none focus:ring-2 focus:ring-success/30 resize-none"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Stats bar */}
        {diff.length > 0 && (
          <div className="neu-card p-3 mb-4">
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-success" />
                <span className="text-muted">Added:</span>
                <span className="font-semibold text-success">{stats.added}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-error" />
                <span className="text-muted">Removed:</span>
                <span className="font-semibold text-error">{stats.removed}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-muted/30" />
                <span className="text-muted">Unchanged:</span>
                <span className="font-semibold">{stats.unchanged}</span>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <span className="text-muted">Similarity:</span>
                <div className="w-24 h-1.5 bg-surface-border rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${stats.similarity}%`,
                      background: stats.similarity > 75 ? "var(--success)" : stats.similarity > 40 ? "var(--warning)" : "var(--error)",
                    }}
                  />
                </div>
                <span className="font-semibold">{stats.similarity}%</span>
              </div>
            </div>
          </div>
        )}

        {/* Diff output */}
        {diff.length > 0 && (
          <div className="neu-card p-5">
            <h2 className="text-sm font-semibold text-muted mb-3">Diff Result</h2>

            {viewMode === "unified" && (
              <div className="rounded-xl overflow-hidden border border-surface-border">
                <div className="max-h-[32rem] overflow-y-auto">
                  {diff.map((line, i) => (
                    <div
                      key={i}
                      className={`flex text-xs font-mono ${
                        line.type === "added"
                          ? "bg-success/10 text-success"
                          : line.type === "removed"
                          ? "bg-error/10 text-error"
                          : "text-foreground"
                      }`}
                    >
                      <span className="w-10 shrink-0 text-center py-1 text-muted/50 select-none border-r border-surface-border">
                        {line.lineOld ?? ""}
                      </span>
                      <span className="w-10 shrink-0 text-center py-1 text-muted/50 select-none border-r border-surface-border">
                        {line.lineNew ?? ""}
                      </span>
                      <span className="w-6 shrink-0 text-center py-1 font-bold select-none">
                        {line.type === "added" ? "+" : line.type === "removed" ? "-" : " "}
                      </span>
                      <span className="flex-1 py-1 pr-3 whitespace-pre-wrap break-all">
                        {line.text || " "}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {viewMode === "side" && (
              <div className="rounded-xl overflow-hidden border border-surface-border">
                <div className="max-h-[32rem] overflow-y-auto">
                  {groups.map((group, gi) => {
                    if (group.type === "equal") {
                      return (
                        <div key={gi} className="flex text-xs font-mono">
                          <div className="flex flex-1 min-w-0 border-r border-surface-border">
                            <span className="w-10 shrink-0 text-center py-1 text-muted/50 select-none border-r border-surface-border">{group.line.lineOld}</span>
                            <span className="flex-1 py-1 px-2 whitespace-pre-wrap break-all">{group.line.text || " "}</span>
                          </div>
                          <div className="flex flex-1 min-w-0">
                            <span className="w-10 shrink-0 text-center py-1 text-muted/50 select-none border-r border-surface-border">{group.line.lineNew}</span>
                            <span className="flex-1 py-1 px-2 whitespace-pre-wrap break-all">{group.line.text || " "}</span>
                          </div>
                        </div>
                      );
                    }
                    const maxLen = Math.max(group.removed.length, group.added.length);
                    return Array.from({ length: maxLen }, (_, ri) => {
                      const rem = group.removed[ri];
                      const add = group.added[ri];
                      const words = rem && add ? wordDiff(rem.text, add.text) : null;
                      return (
                        <div key={`${gi}-${ri}`} className="flex text-xs font-mono">
                          <div className={`flex flex-1 min-w-0 border-r border-surface-border ${rem ? "bg-error/10" : ""}`}>
                            <span className="w-10 shrink-0 text-center py-1 text-muted/50 select-none border-r border-surface-border">{rem?.lineOld ?? ""}</span>
                            <span className="flex-1 py-1 px-2 whitespace-pre-wrap break-all text-error">
                              {words
                                ? words.filter((w) => w.type !== "added").map((w, wi) => (
                                    <span key={wi} className={w.type === "removed" ? "bg-error/25 rounded px-px" : ""}>{w.text}</span>
                                  ))
                                : rem?.text || " "}
                            </span>
                          </div>
                          <div className={`flex flex-1 min-w-0 ${add ? "bg-success/10" : ""}`}>
                            <span className="w-10 shrink-0 text-center py-1 text-muted/50 select-none border-r border-surface-border">{add?.lineNew ?? ""}</span>
                            <span className="flex-1 py-1 px-2 whitespace-pre-wrap break-all text-success">
                              {words
                                ? words.filter((w) => w.type !== "removed").map((w, wi) => (
                                    <span key={wi} className={w.type === "added" ? "bg-success/25 rounded px-px" : ""}>{w.text}</span>
                                  ))
                                : add?.text || " "}
                            </span>
                          </div>
                        </div>
                      );
                    });
                  })}
                </div>
              </div>
            )}

            {viewMode === "inline" && (
              <div className="rounded-xl overflow-hidden border border-surface-border">
                <div className="max-h-[32rem] overflow-y-auto">
                  {groups.map((group, gi) => {
                    if (group.type === "equal") {
                      return (
                        <div key={gi} className="flex text-xs font-mono">
                          <span className="w-10 shrink-0 text-center py-1 text-muted/50 select-none border-r border-surface-border">{group.line.lineOld}</span>
                          <span className="w-10 shrink-0 text-center py-1 text-muted/50 select-none border-r border-surface-border">{group.line.lineNew}</span>
                          <span className="flex-1 py-1 px-2 whitespace-pre-wrap break-all">{group.line.text || " "}</span>
                        </div>
                      );
                    }
                    const maxLen = Math.max(group.removed.length, group.added.length);
                    return Array.from({ length: maxLen }, (_, ri) => {
                      const rem = group.removed[ri];
                      const add = group.added[ri];
                      const words = rem && add ? wordDiff(rem.text, add.text) : null;
                      if (words) {
                        return (
                          <div key={`${gi}-${ri}`} className="flex text-xs font-mono bg-warning/5">
                            <span className="w-10 shrink-0 text-center py-1 text-muted/50 select-none border-r border-surface-border">{rem.lineOld}</span>
                            <span className="w-10 shrink-0 text-center py-1 text-muted/50 select-none border-r border-surface-border">{add.lineNew}</span>
                            <span className="w-6 shrink-0 text-center py-1 font-bold select-none text-warning">~</span>
                            <span className="flex-1 py-1 pr-3 whitespace-pre-wrap break-all">
                              {words.map((w, wi) => (
                                <span
                                  key={wi}
                                  className={
                                    w.type === "removed"
                                      ? "bg-error/20 text-error line-through rounded px-px"
                                      : w.type === "added"
                                      ? "bg-success/20 text-success rounded px-px"
                                      : ""
                                  }
                                >
                                  {w.text}
                                </span>
                              ))}
                            </span>
                          </div>
                        );
                      }
                      return (
                        <div key={`${gi}-${ri}`}>
                          {rem && (
                            <div className="flex text-xs font-mono bg-error/10 text-error">
                              <span className="w-10 shrink-0 text-center py-1 text-muted/50 select-none border-r border-surface-border">{rem.lineOld}</span>
                              <span className="w-10 shrink-0 text-center py-1 text-muted/50 select-none border-r border-surface-border" />
                              <span className="w-6 shrink-0 text-center py-1 font-bold select-none">-</span>
                              <span className="flex-1 py-1 pr-3 whitespace-pre-wrap break-all">{rem.text || " "}</span>
                            </div>
                          )}
                          {add && (
                            <div className="flex text-xs font-mono bg-success/10 text-success">
                              <span className="w-10 shrink-0 text-center py-1 text-muted/50 select-none border-r border-surface-border" />
                              <span className="w-10 shrink-0 text-center py-1 text-muted/50 select-none border-r border-surface-border">{add.lineNew}</span>
                              <span className="w-6 shrink-0 text-center py-1 font-bold select-none">+</span>
                              <span className="flex-1 py-1 pr-3 whitespace-pre-wrap break-all">{add.text || " "}</span>
                            </div>
                          )}
                        </div>
                      );
                    });
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
