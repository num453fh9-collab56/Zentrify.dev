"use client";

import { useState, useCallback, useEffect } from "react";
import { useToast } from "../../components/toast";
import { ToolPageHeader } from "../../components/tool-page-header";

type Language = "html" | "css" | "javascript";

function minifyHTML(code: string): string {
  return code
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\s+/g, " ")
    .replace(/>\s+</g, "><")
    .replace(/\s*=\s*/g, "=")
    .replace(/"\s+/g, '"')
    .replace(/\s+"/g, '"')
    .trim();
}

function minifyCSS(code: string): string {
  return code
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}:;,>+~])\s*/g, "$1")
    .replace(/;}/g, "}")
    .replace(/\s*!important/g, "!important")
    .replace(/:\s+/g, ":")
    .trim();
}

function minifyJS(code: string): string {
  let result = "";
  let i = 0;
  const len = code.length;
  let inString: string | null = null;
  let inTemplate = false;
  let inRegex = false;
  let inSingleComment = false;
  let inMultiComment = false;

  while (i < len) {
    const ch = code[i];
    const next = code[i + 1];

    if (inSingleComment) {
      if (ch === "\n") {
        inSingleComment = false;
        result += ch;
      }
      i++;
      continue;
    }

    if (inMultiComment) {
      if (ch === "*" && next === "/") {
        inMultiComment = false;
        i += 2;
        continue;
      }
      i++;
      continue;
    }

    if (inString) {
      if (ch === "\\" && next) {
        result += ch + next;
        i += 2;
        continue;
      }
      if (ch === inString) {
        inString = null;
      }
      result += ch;
      i++;
      continue;
    }

    if (inTemplate) {
      if (ch === "\\" && next) {
        result += ch + next;
        i += 2;
        continue;
      }
      if (ch === "`") {
        inTemplate = false;
      }
      result += ch;
      i++;
      continue;
    }

    if (ch === "/" && next === "/") {
      inSingleComment = true;
      i += 2;
      continue;
    }

    if (ch === "/" && next === "*") {
      inMultiComment = true;
      i += 2;
      continue;
    }

    if (ch === '"' || ch === "'") {
      inString = ch;
      result += ch;
      i++;
      continue;
    }

    if (ch === "`") {
      inTemplate = true;
      result += ch;
      i++;
      continue;
    }

    if (ch === "/") {
      // simple check - might be regex
      const before = result.trim().slice(-1);
      if (/[=(:,[!&|?{};]/.test(before) || result.trim() === "") {
        inRegex = true;
        result += ch;
        i++;
        continue;
      }
    }

    if (inRegex) {
      if (ch === "\\" && next) {
        result += ch + next;
        i += 2;
        continue;
      }
      if (ch === "/") {
        inRegex = false;
        result += ch;
        i++;
        continue;
      }
      result += ch;
      i++;
      continue;
    }

    if (/\s/.test(ch)) {
      const last = result[result.length - 1];
      const nextNonSpace = (() => {
        let j = i + 1;
        while (j < len && /\s/.test(code[j])) j++;
        return code[j];
      })();
      if (last && nextNonSpace && /[a-zA-Z0-9_$]/.test(last) && /[a-zA-Z0-9_$]/.test(nextNonSpace)) {
        result += " ";
      } else if (last && nextNonSpace && /[a-zA-Z0-9_$\]]/.test(last) && /[({[]/.test(nextNonSpace)) {
        // keep no space
      } else if (last && nextNonSpace && /[)}\]]/.test(last) && /[a-zA-Z0-9_$({[]/.test(nextNonSpace)) {
        // keep no space usually
      } else {
        // skip whitespace
      }
      i++;
      continue;
    }

    result += ch;
    i++;
  }

  return result
    .replace(/\s*([{}();,=+\-*/<>!&|?:.%])\s*/g, "$1")
    .replace(/;+/g, ";")
    .replace(/\n+/g, "")
    .trim();
}

function minify(code: string, lang: Language): string {
  switch (lang) {
    case "html":
      return minifyHTML(code);
    case "css":
      return minifyCSS(code);
    case "javascript":
      return minifyJS(code);
  }
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(1)} KB`;
}

function beautifyHTML(code: string): string {
  let formatted = "";
  let indent = 0;
  const tags = code.replace(/>\s+</g, "><").split(/(?=<)|(?<=>)/g);
  for (const tag of tags) {
    if (!tag.trim()) continue;
    if (tag.match(/^<\/\w/)) indent--;
    formatted += "  ".repeat(Math.max(0, indent)) + tag.trim() + "\n";
    if (tag.match(/^<\w[^>]*[^\/]>$/) && !tag.match(/^<(br|hr|img|input|link|meta)/i)) indent++;
  }
  return formatted.trim();
}

function beautifyCSS(code: string): string {
  let formatted = "";
  let indent = 0;
  code = code.replace(/\s*{\s*/g, " {\n").replace(/;\s*/g, ";\n").replace(/\s*}\s*/g, "\n}\n");
  for (const line of code.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (trimmed.includes("}")) indent--;
    formatted += "  ".repeat(Math.max(0, indent)) + trimmed + "\n";
    if (trimmed.includes("{")) indent++;
  }
  return formatted.trim();
}

function beautifyJS(code: string): string {
  let formatted = "";
  let indent = 0;
  let inString: string | null = null;
  for (let i = 0; i < code.length; i++) {
    const ch = code[i];
    if ((ch === '"' || ch === "'") && code[i - 1] !== "\\") {
      if (inString === ch) inString = null;
      else if (!inString) inString = ch;
    }
    if (inString) {
      formatted += ch;
      continue;
    }
    if (ch === "{") {
      formatted += " {\n" + "  ".repeat(++indent);
    } else if (ch === "}") {
      formatted = formatted.trimEnd() + "\n" + "  ".repeat(--indent) + "}\n" + "  ".repeat(indent);
    } else if (ch === ";") {
      formatted += ";\n" + "  ".repeat(indent);
    } else if (ch === "\n") {
      continue;
    } else if (ch === " ") {
      if (formatted[formatted.length - 1] !== " " && formatted[formatted.length - 1] !== "\n") formatted += " ";
    } else {
      formatted += ch;
    }
  }
  return formatted.replace(/\n\s*\n/g, "\n").trim();
}

function beautify(code: string, lang: Language): string {
  switch (lang) {
    case "html":
      return beautifyHTML(code);
    case "css":
      return beautifyCSS(code);
    case "javascript":
      return beautifyJS(code);
  }
}

export default function CodeMinifierPage() {
  const { toast } = useToast();
  const [lang, setLang] = useState<Language>("html");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [autoMinify, setAutoMinify] = useState(false);

  const handleMinify = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      return;
    }
    setOutput(minify(input, lang));
  }, [input, lang]);

  useEffect(() => {
    if (autoMinify && input.trim()) {
      setOutput(minify(input, lang)); // eslint-disable-line react-hooks/set-state-in-effect -- reactive auto-minify
    }
  }, [input, lang, autoMinify]);

  const handleBeautify = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      return;
    }
    try {
      setOutput(beautify(input, lang));
      toast("Beautified!");
    } catch {
      toast("Could not beautify", "error");
    }
  }, [input, lang, toast]);

  const copy = useCallback(() => {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      toast(`Copied! (${formatBytes(new TextEncoder().encode(output).length)})`);
    });
  }, [output, toast]);

  const clearAll = useCallback(() => {
    setInput("");
    setOutput("");
  }, []);

  const inputSize = new TextEncoder().encode(input).length;
  const outputSize = new TextEncoder().encode(output).length;
  const saved = inputSize > 0 && outputSize > 0
    ? Math.round(((inputSize - outputSize) / inputSize) * 100)
    : 0;

  return (
    <section className="pt-6 sm:pt-8 pb-10 sm:pb-14 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <ToolPageHeader />

        <div className="neu-card p-5 mb-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              {(["html", "css", "javascript"] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    setLang(l);
                    setOutput("");
                  }}
                  className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors ${
                    lang === l
                      ? "bg-primary text-white"
                      : "bg-background text-muted hover:text-foreground"
                  }`}
                >
                  {l === "javascript" ? "JavaScript" : l.toUpperCase()}
                </button>
              ))}
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={autoMinify}
                onChange={(e) => setAutoMinify(e.target.checked)}
                className="accent-orange w-4 h-4"
              />
              <span className="text-xs">Auto Minify</span>
            </label>
            <div className="flex items-center gap-2 ml-auto flex-wrap">
              <button
                onClick={clearAll}
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-background text-muted hover:text-foreground transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={handleBeautify}
                className="px-4 py-1.5 text-xs font-medium rounded-lg bg-cat/10 text-cat hover:bg-cat/20 transition-colors"
              >
                Beautify
              </button>
              <button
                onClick={handleMinify}
                className="px-5 py-2 text-xs font-semibold rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors"
              >
                Minify
              </button>
            </div>
          </div>
        </div>

        {output && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-cat/10 border border-cat/20 text-sm flex items-center gap-4 flex-wrap">
            <span className="text-muted">
              {formatBytes(inputSize)} → {formatBytes(outputSize)}
            </span>
            <span className="font-semibold text-cat">
              {saved > 0 ? `${saved}% smaller` : `${Math.abs(saved)}% larger`}
            </span>
            {saved > 0 && <span className="text-success text-xs">Saved {formatBytes(inputSize - outputSize)}</span>}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Input</label>
              <button
                onClick={() => {
                  setInput("");
                  setOutput("");
                }}
                className="text-xs text-muted hover:text-foreground transition-colors"
              >
                Clear
              </button>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Paste your ${lang === "javascript" ? "JavaScript" : lang.toUpperCase()} code here...`}
              className="w-full h-80 code-area p-4 text-sm focus:outline-none focus:ring-2 focus:ring-cat/30 resize-none"
              spellCheck={false}
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Minified Output</label>
              {output && (
                <button
                  onClick={copy}
                  className="text-xs text-cat hover:text-cat/80 font-medium transition-colors"
                >
                  Copy
                </button>
              )}
            </div>
            <textarea
              value={output}
              readOnly
              placeholder="Minified code will appear here..."
              className="w-full h-80 code-area p-4 text-sm focus:outline-none resize-none"
              spellCheck={false}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
