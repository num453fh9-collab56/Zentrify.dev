"use client";

import { useState, useCallback, useMemo } from "react";
import { useToast } from "../../components/toast";
import { ToolPageHeader } from "../../components/tool-page-header";

type DiffType = "equal" | "added" | "removed";
type DiffLine = { type: DiffType; text: string; lineOld?: number; lineNew?: number };

function computeDiff(oldText: string, newText: string): DiffLine[] {
  const oldLines = oldText.split("\n");
  const newLines = newText.split("\n");
  const m = oldLines.length;
  const n = newLines.length;

  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    new Array(n + 1).fill(0)
  );
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (oldLines[i - 1] === newLines[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  const result: DiffLine[] = [];
  let i = m, j = n;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && oldLines[i - 1] === newLines[j - 1]) {
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

export default function TextDiffCheckerPage() {
  const { toast } = useToast();
  const [oldText, setOldText] = useState("");
  const [newText, setNewText] = useState("");

  const diff = useMemo(() => {
    if (!oldText && !newText) return [];
    return computeDiff(oldText, newText);
  }, [oldText, newText]);

  const stats = useMemo(() => {
    let added = 0, removed = 0, unchanged = 0;
    for (const line of diff) {
      if (line.type === "added") added++;
      else if (line.type === "removed") removed++;
      else unchanged++;
    }
    return { added, removed, unchanged };
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

  return (
    <section className="pt-6 sm:pt-8 pb-10 sm:pb-14 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <ToolPageHeader />

        <div className="neu-card p-4 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={sample}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-background text-muted hover:text-foreground transition-colors"
            >
              Sample
            </button>
            <button
              onClick={swap}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-background text-muted hover:text-foreground transition-colors flex items-center gap-1"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
              </svg>
              Swap
            </button>
            <button
              onClick={clear}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-background text-muted hover:text-foreground transition-colors"
            >
              Clear
            </button>
            {diff.length > 0 && (
              <div className="flex items-center gap-3 ml-auto text-xs">
                <span className="text-success font-medium">+{stats.added}</span>
                <span className="text-error font-medium">-{stats.removed}</span>
                <span className="text-muted">{stats.unchanged} unchanged</span>
              </div>
            )}
          </div>
        </div>

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

        {diff.length > 0 && (
          <div className="neu-card p-5">
            <h2 className="text-sm font-semibold text-muted mb-3">Diff Result</h2>
            <div className="rounded-xl overflow-hidden border border-surface-border">
              <div className="max-h-96 overflow-y-auto">
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
                      {line.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
