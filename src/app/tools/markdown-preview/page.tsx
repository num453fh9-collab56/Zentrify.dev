"use client";

import { useState, useMemo, useCallback } from "react";
import { useToast } from "../../components/toast";
import { ToolPageHeader } from "../../components/tool-page-header";

const sampleMd = `# Markdown Preview

Welcome to the **Markdown Preview** tool by [Zentrify](https://zentrify.dev). This editor supports all standard Markdown syntax plus extras like GFM checkboxes, tables, and syntax-highlighted code blocks.

## Table of Contents

A table of contents is auto-generated from your headings — toggle it with the **TOC** button.

## Text Formatting

You can write **bold**, *italic*, ~~strikethrough~~, and \`inline code\`. Combine them for ***bold italic*** text. Links like [Zentrify](https://zentrify.dev) are clickable.

## Lists

### Unordered
- First item
- Second item
- Third item

### Ordered
1. Step one
2. Step two
3. Step three

### Task List (GFM)
- [x] Design the layout
- [x] Add syntax highlighting
- [ ] Write documentation
- [ ] Ship to production

## Code Blocks

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

async function fetchUser(id: number): Promise<User> {
  const res = await fetch(\`/api/users/\${id}\`);
  return res.json();
}
\`\`\`

\`\`\`python
# Quick sort implementation
def quicksort(arr: list[int]) -> list[int]:
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)
\`\`\`

\`\`\`css
.card {
  background: var(--surface);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}
\`\`\`

## Blockquote

> "The best way to predict the future is to invent it."
> — Alan Kay

## Table

| Feature | Status | Priority |
|---------|--------|----------|
| Syntax Highlighting | Done | High |
| GFM Checkboxes | Done | Medium |
| Export HTML | Done | Medium |
| Table of Contents | Done | Low |

---

Start editing on the left — the preview updates live.`;

/* ── Syntax Highlighting ── */

const SYNTAX_RULES: Record<string, { pattern: RegExp; className: string }[]> = {
  javascript: [
    { pattern: /(\/\/.*$)/gm, className: "syn-comment" },
    { pattern: /(\/\*[\s\S]*?\*\/)/g, className: "syn-comment" },
    { pattern: /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)/g, className: "syn-string" },
    { pattern: /\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|this|class|extends|import|export|from|default|async|await|try|catch|throw|finally|typeof|instanceof|in|of|yield|void|delete)\b/g, className: "syn-keyword" },
    { pattern: /\b(true|false|null|undefined|NaN|Infinity)\b/g, className: "syn-literal" },
    { pattern: /\b(\d+\.?\d*(?:e[+-]?\d+)?)\b/gi, className: "syn-number" },
  ],
  python: [
    { pattern: /(#.*$)/gm, className: "syn-comment" },
    { pattern: /("""[\s\S]*?"""|'''[\s\S]*?''')/g, className: "syn-string" },
    { pattern: /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/g, className: "syn-string" },
    { pattern: /\b(def|class|return|if|elif|else|for|while|import|from|as|try|except|finally|raise|with|yield|lambda|pass|break|continue|and|or|not|is|in|global|nonlocal|assert|async|await)\b/g, className: "syn-keyword" },
    { pattern: /\b(True|False|None)\b/g, className: "syn-literal" },
    { pattern: /\b(\d+\.?\d*(?:e[+-]?\d+)?)\b/gi, className: "syn-number" },
    { pattern: /@(\w+)/g, className: "syn-keyword" },
  ],
  html: [
    { pattern: /(&lt;!--[\s\S]*?--&gt;)/g, className: "syn-comment" },
    { pattern: /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/g, className: "syn-string" },
    { pattern: /(&lt;\/?)([\w-]+)/g, className: "syn-tag" },
    { pattern: /\b([\w-]+)(?==)/g, className: "syn-attr" },
  ],
  css: [
    { pattern: /(\/\*[\s\S]*?\*\/)/g, className: "syn-comment" },
    { pattern: /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/g, className: "syn-string" },
    { pattern: /([\w-]+)(?=\s*:)/g, className: "syn-attr" },
    { pattern: /(#[0-9a-fA-F]{3,8})\b/g, className: "syn-number" },
    { pattern: /\b(\d+\.?\d*(?:px|rem|em|%|vh|vw|s|ms|deg|fr)?)\b/g, className: "syn-number" },
    { pattern: /(@media|@keyframes|@import|@font-face|@layer|@container)\b/g, className: "syn-keyword" },
    { pattern: /\b(var)\(/g, className: "syn-keyword" },
  ],
  json: [
    { pattern: /("(?:\\.|[^"\\])*")(\s*:)/g, className: "syn-attr" },
    { pattern: /:\s*("(?:\\.|[^"\\])*")/g, className: "syn-string" },
    { pattern: /\b(true|false|null)\b/g, className: "syn-literal" },
    { pattern: /\b(-?\d+\.?\d*(?:e[+-]?\d+)?)\b/gi, className: "syn-number" },
  ],
  bash: [
    { pattern: /(#.*$)/gm, className: "syn-comment" },
    { pattern: /("(?:\\.|[^"\\])*"|'[^']*')/g, className: "syn-string" },
    { pattern: /\b(if|then|else|elif|fi|for|while|do|done|case|esac|function|return|exit|echo|export|source|alias|unset|local|readonly|shift|trap|eval|exec|set|cd|ls|rm|mv|cp|mkdir|chmod|chown|grep|sed|awk|find|cat|curl|wget)\b/g, className: "syn-keyword" },
    { pattern: /(\$\{?\w+\}?)/g, className: "syn-literal" },
  ],
};

const LANG_ALIASES: Record<string, string> = {
  ts: "javascript", typescript: "javascript", js: "javascript", jsx: "javascript", tsx: "javascript",
  py: "python", sh: "bash", shell: "bash", zsh: "bash",
  htm: "html", xml: "html", svg: "html",
  scss: "css", less: "css", sass: "css",
};

function highlightCode(code: string, lang: string): string {
  const resolved = LANG_ALIASES[lang] || lang;
  const rules = SYNTAX_RULES[resolved];
  if (!rules) return code;

  const placeholders: string[] = [];
  let result = code;

  for (const rule of rules) {
    result = result.replace(rule.pattern, (match) => {
      const idx = placeholders.length;
      placeholders.push(`<span class="${rule.className}">${match}</span>`);
      return `\x00${idx}\x00`;
    });
  }

  return result.replace(/\x00(\d+)\x00/g, (_, i) => placeholders[+i]);
}

/* ── Markdown Parser ── */

function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

interface Heading { level: number; text: string; id: string }

function extractHeadings(md: string): Heading[] {
  const headings: Heading[] = [];
  const re = /^(#{1,6}) (.+)$/gm;
  let m;
  while ((m = re.exec(md))) {
    const text = m[2].replace(/\*\*(.+?)\*\*/g, "$1").replace(/\*(.+?)\*/g, "$1").replace(/`(.+?)`/g, "$1");
    headings.push({ level: m[1].length, text, id: text.toLowerCase().replace(/[^\w]+/g, "-").replace(/^-|-$/g, "") });
  }
  return headings;
}

function parseMarkdown(md: string): string {
  let html = md;

  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    const escaped = escapeHtml(code.trim());
    const highlighted = lang ? highlightCode(escaped, lang) : escaped;
    return `<pre class="code-block"><code class="language-${lang || "text"}">${highlighted}</code></pre>`;
  });

  html = html.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');

  html = html.replace(/^(#{1,6}) (.+)$/gm, (_, hashes, text) => {
    const level = hashes.length;
    const id = text.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\*(.+?)\*/g, "$1").replace(/`(.+?)`/g, "$1").toLowerCase().replace(/[^\w]+/g, "-").replace(/^-|-$/g, "");
    return `<h${level} id="${id}">${text}</h${level}>`;
  });

  html = html.replace(/^\|(.+)\|$/gm, (_, row) => {
    const cells = row.split("|").map((c: string) => c.trim());
    return `<tr>${cells.map((c: string) => `<td>${c}</td>`).join("")}</tr>`;
  });
  html = html.replace(/(<tr>[\s\S]*?<\/tr>)/g, (match) => {
    const cleaned = match.replace(/<tr><td>[-|: ]+<\/td>(?:<td>[-|: ]+<\/td>)*<\/tr>\n?/g, "");
    return cleaned ? `<table>${cleaned}</table>` : "";
  });

  html = html.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');
  html = html.replace(/<\/blockquote>\n<blockquote>/g, "\n");

  html = html.replace(/^---$/gm, "<hr />");

  html = html.replace(/^\d+\. (.+)$/gm, '<li class="ol-item">$1</li>');
  html = html.replace(/^- \[x\] (.+)$/gm, '<li class="task-item"><input type="checkbox" checked disabled /> $1</li>');
  html = html.replace(/^- \[ \] (.+)$/gm, '<li class="task-item"><input type="checkbox" disabled /> $1</li>');
  html = html.replace(/^[*-] (.+)$/gm, '<li class="ul-item">$1</li>');

  const lines = html.split("\n");
  let result = "";
  let inUl = false, inOl = false, inTask = false;
  for (const line of lines) {
    if (line.includes('class="task-item"')) {
      if (inUl) { result += "</ul>"; inUl = false; }
      if (inOl) { result += "</ol>"; inOl = false; }
      if (!inTask) { result += '<ul class="task-list">'; inTask = true; }
      result += line + "\n";
    } else if (line.includes('class="ul-item"')) {
      if (inTask) { result += "</ul>"; inTask = false; }
      if (inOl) { result += "</ol>"; inOl = false; }
      if (!inUl) { result += "<ul>"; inUl = true; }
      result += line + "\n";
    } else if (line.includes('class="ol-item"')) {
      if (inTask) { result += "</ul>"; inTask = false; }
      if (inUl) { result += "</ul>"; inUl = false; }
      if (!inOl) { result += "<ol>"; inOl = true; }
      result += line + "\n";
    } else {
      if (inUl) { result += "</ul>"; inUl = false; }
      if (inOl) { result += "</ol>"; inOl = false; }
      if (inTask) { result += "</ul>"; inTask = false; }
      result += line + "\n";
    }
  }
  if (inUl) result += "</ul>";
  if (inOl) result += "</ol>";
  if (inTask) result += "</ul>";
  html = result;

  html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  html = html.replace(/~~(.+?)~~/g, "<del>$1</del>");

  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  html = html.replace(/^(?!<[hupoltbdira]|<\/|<hr|<code|<pre|<strong|<em|<del|<img|<a )(.+)$/gm, "<p>$1</p>");

  return html;
}

/* ── Stats ── */
function getStats(text: string) {
  const trimmed = text.trim();
  if (!trimmed) return { words: 0, chars: 0, lines: 0, readTime: "0 min" };
  const words = trimmed.split(/\s+/).length;
  const chars = trimmed.length;
  const lines = trimmed.split("\n").length;
  const mins = Math.max(1, Math.ceil(words / 230));
  return { words, chars, lines, readTime: `${mins} min` };
}

/* ── Export HTML ── */
function buildExportHtml(html: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Markdown Export</title>
<style>
:root{--bg:#fff;--fg:#1a1a2e;--muted:#6b7280;--border:#e5e7eb;--surface:#f9fafb;--primary:#7a52b3;--code-bg:#f3f4f6;--code-kw:#8b5cf6;--code-str:#059669;--code-cm:#9ca3af;--code-num:#d97706;--code-lit:#2563eb;--code-tag:#dc2626;--code-attr:#d97706}
@media(prefers-color-scheme:dark){:root{--bg:#0a0f1a;--fg:#e8ecf2;--muted:#8a96aa;--border:#243050;--surface:#121a2e;--code-bg:#1a2340;--code-kw:#a78bda;--code-str:#34d399;--code-cm:#6b7280;--code-num:#fbbf24;--code-lit:#60a5fa;--code-tag:#f87171;--code-attr:#fbbf24}}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:system-ui,-apple-system,sans-serif;background:var(--bg);color:var(--fg);line-height:1.7;max-width:760px;margin:0 auto;padding:2rem 1.5rem}
h1,h2,h3,h4,h5,h6{margin:1.5em 0 .5em;font-weight:700;line-height:1.3}
h1{font-size:2rem;border-bottom:2px solid var(--border);padding-bottom:.4rem}
h2{font-size:1.5rem} h3{font-size:1.25rem}
p{margin:.75em 0} a{color:var(--primary)}
strong{font-weight:700} em{font-style:italic} del{text-decoration:line-through;opacity:.6}
code.inline-code{background:var(--code-bg);padding:.15em .4em;border-radius:4px;font-size:.88em;font-family:ui-monospace,monospace}
pre.code-block{background:var(--code-bg);border-radius:8px;padding:1rem;overflow-x:auto;margin:1em 0;font-size:.85em;line-height:1.6}
pre.code-block code{font-family:ui-monospace,monospace;background:none;padding:0}
.syn-keyword{color:var(--code-kw)}.syn-string{color:var(--code-str)}.syn-comment{color:var(--code-cm);font-style:italic}.syn-number{color:var(--code-num)}.syn-literal{color:var(--code-lit)}.syn-tag{color:var(--code-tag)}.syn-attr{color:var(--code-attr)}
blockquote{border-left:3px solid var(--primary);padding:.5em 1em;margin:1em 0;color:var(--muted);background:var(--surface);border-radius:0 6px 6px 0}
table{width:100%;border-collapse:collapse;margin:1em 0}
td{padding:.5rem .75rem;border:1px solid var(--border);font-size:.9em}
tr:first-child td{font-weight:600;background:var(--surface)}
ul,ol{padding-left:1.5em;margin:.75em 0} li{margin:.25em 0}
ul.task-list{list-style:none;padding-left:.5em}
.task-item input{margin-right:.5em;accent-color:var(--primary)}
hr{border:none;border-top:2px solid var(--border);margin:2em 0}
img{max-width:100%;border-radius:8px;margin:1em 0}
</style>
</head>
<body>${html}</body>
</html>`;
}

/* ── Component ── */
export default function MarkdownPreviewPage() {
  const [input, setInput] = useState(sampleMd);
  const [view, setView] = useState<"split" | "preview">("split");
  const [showToc, setShowToc] = useState(false);
  const { toast } = useToast();

  const html = useMemo(() => parseMarkdown(input), [input]);
  const headings = useMemo(() => extractHeadings(input), [input]);
  const stats = useMemo(() => getStats(input), [input]);

  const handleCopyHtml = useCallback(() => {
    navigator.clipboard.writeText(html);
    toast("HTML copied to clipboard!");
  }, [html, toast]);

  const handleExport = useCallback(() => {
    const blob = new Blob([buildExportHtml(html)], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "markdown-export.html";
    a.click();
    URL.revokeObjectURL(url);
    toast("HTML file downloaded!");
  }, [html, toast]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-10 sm:pb-14">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-6 gap-4">
        <ToolPageHeader />
        <div className="flex flex-wrap gap-2">
          <div className="neu-card p-1 flex rounded-lg">
            <button
              onClick={() => setView("split")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                view === "split" ? "bg-primary text-white shadow-sm" : "text-muted"
              }`}
            >
              Split
            </button>
            <button
              onClick={() => setView("preview")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                view === "preview" ? "bg-primary text-white shadow-sm" : "text-muted"
              }`}
            >
              Preview
            </button>
          </div>
          <button
            onClick={() => setShowToc((v) => !v)}
            className={`neu-btn px-3 py-1.5 text-xs font-medium transition-colors ${showToc ? "text-primary" : "text-muted hover:text-primary"}`}
          >
            TOC
          </button>
          <button onClick={handleCopyHtml} className="neu-btn px-3 py-1.5 text-xs font-medium text-muted hover:text-primary">
            Copy HTML
          </button>
          <button onClick={handleExport} className="neu-btn px-3 py-1.5 text-xs font-medium text-muted hover:text-primary">
            Export
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="flex flex-wrap gap-4 mb-4 px-1 text-xs text-muted">
        <span>{stats.words} words</span>
        <span>{stats.chars} chars</span>
        <span>{stats.lines} lines</span>
        <span>~{stats.readTime} read</span>
      </div>

      <div className={`grid gap-6 ${view === "split" ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"}`}>
        {view === "split" && (
          <div className="neu-card p-6">
            <span className="block text-sm font-medium mb-3">Markdown</span>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="code-area w-full h-[500px] p-4 text-sm resize-none"
              spellCheck={false}
            />
          </div>
        )}
        <div className="neu-card p-6">
          <span className="block text-sm font-medium mb-3">Preview</span>

          {showToc && headings.length > 0 && (
            <div className="mb-4 p-3 rounded-lg bg-surface border border-surface-border text-sm">
              <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">Table of Contents</p>
              <nav className="space-y-1">
                {headings.map((h, i) => (
                  <a
                    key={i}
                    href={`#${h.id}`}
                    className="block text-primary hover:underline transition-colors"
                    style={{ paddingLeft: `${(h.level - 1) * 0.75}rem`, fontSize: h.level === 1 ? "0.875rem" : "0.8125rem" }}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {h.text}
                  </a>
                ))}
              </nav>
            </div>
          )}

          <div
            className="md-preview prose-custom h-[500px] overflow-auto p-4 rounded-xl bg-background border border-surface-border"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>

      <style jsx global>{`
        .md-preview .task-list { list-style: none; padding-left: 0.25rem; }
        .md-preview .task-item { display: flex; align-items: baseline; gap: 0.4rem; }
        .md-preview .task-item input[type="checkbox"] { accent-color: var(--primary); margin-top: 0.2em; }
        .md-preview pre.code-block { background: color-mix(in oklab, var(--surface) 80%, var(--primary) 4%); border: 1px solid var(--surface-border); border-radius: 8px; padding: 1rem; overflow-x: auto; margin: 1em 0; font-size: 0.85em; line-height: 1.65; }
        .md-preview pre.code-block code { font-family: ui-monospace, SFMono-Regular, monospace; background: none; padding: 0; }
        .syn-keyword { color: var(--primary); font-weight: 600; }
        .syn-string { color: var(--success, #059669); }
        .syn-comment { color: var(--muted); font-style: italic; }
        .syn-number { color: var(--orange, #d97706); }
        .syn-literal { color: var(--accent, #2563eb); }
        .syn-tag { color: var(--error, #dc2626); }
        .syn-attr { color: var(--orange, #d97706); }
      `}</style>

      <div className="mt-14 max-w-4xl mx-auto space-y-12">
        <section>
          <h2 className="text-xl font-semibold tracking-tight mb-4">Supported Syntax</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="neu-card-sm p-4">
              <h3 className="font-semibold mb-1">Text Formatting</h3>
              <p className="text-sm text-muted">Headings (h1-h6), bold, italic, bold italic, strikethrough, links, images, and inline code.</p>
            </div>
            <div className="neu-card-sm p-4">
              <h3 className="font-semibold mb-1">Code Blocks</h3>
              <p className="text-sm text-muted">Fenced code blocks with syntax highlighting for JS, TS, Python, HTML, CSS, JSON, Bash and more.</p>
            </div>
            <div className="neu-card-sm p-4">
              <h3 className="font-semibold mb-1">Lists &amp; Tasks</h3>
              <p className="text-sm text-muted">Ordered, unordered, and GFM task lists with checkboxes. Pipe-separated tables with header rows.</p>
            </div>
            <div className="neu-card-sm p-4">
              <h3 className="font-semibold mb-1">Extras</h3>
              <p className="text-sm text-muted">Auto table of contents, word count, reading time, HTML export, blockquotes, and horizontal rules.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight mb-4">Markdown Cheat Sheet</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-surface-border rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-surface">
                  <th className="text-left p-3 font-semibold border-b border-surface-border">Syntax</th>
                  <th className="text-left p-3 font-semibold border-b border-surface-border">Result</th>
                </tr>
              </thead>
              <tbody className="text-muted font-mono text-xs">
                <tr><td className="p-3 border-b border-surface-border"># Heading 1</td><td className="p-3 border-b border-surface-border font-sans text-sm font-bold">Heading 1</td></tr>
                <tr><td className="p-3 border-b border-surface-border">**bold text**</td><td className="p-3 border-b border-surface-border font-sans text-sm"><strong>bold text</strong></td></tr>
                <tr><td className="p-3 border-b border-surface-border">*italic text*</td><td className="p-3 border-b border-surface-border font-sans text-sm"><em>italic text</em></td></tr>
                <tr><td className="p-3 border-b border-surface-border">~~strikethrough~~</td><td className="p-3 border-b border-surface-border font-sans text-sm"><del>strikethrough</del></td></tr>
                <tr><td className="p-3 border-b border-surface-border">[link](url)</td><td className="p-3 border-b border-surface-border font-sans text-sm text-primary">link</td></tr>
                <tr><td className="p-3 border-b border-surface-border">`inline code`</td><td className="p-3 border-b border-surface-border"><code className="bg-surface border border-surface-border px-1 py-0.5 rounded text-xs">inline code</code></td></tr>
                <tr><td className="p-3 border-b border-surface-border">- [ ] task</td><td className="p-3 border-b border-surface-border font-sans text-sm">☐ task</td></tr>
                <tr><td className="p-3 border-b border-surface-border">- [x] done</td><td className="p-3 border-b border-surface-border font-sans text-sm">☑ done</td></tr>
                <tr><td className="p-3 border-b border-surface-border">- list item</td><td className="p-3 border-b border-surface-border font-sans text-sm">&#x2022; list item</td></tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
