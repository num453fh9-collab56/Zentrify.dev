"use client";

import { useState, useMemo } from "react";
import { useToast } from "../../components/toast";
import { ToolPageHeader } from "../../components/tool-page-header";

const sampleMd = `# Hello World

Welcome to the **Markdown Preview** tool by [Zentrify](https://zentrify.dev).

## Features

- **Bold**, *italic*, ~~strikethrough~~
- [Links](https://example.com) and \`inline code\`
- Lists (ordered & unordered)
- Headings, blockquotes, and code blocks

## Code Block

\`\`\`typescript
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}
\`\`\`

> Blockquotes look like this.
> They can span multiple lines.

## Table

| Feature | Status |
|---------|--------|
| Headers | Done   |
| Lists   | Done   |
| Code    | Done   |

---

That's it! Start editing on the left.`;

function parseMarkdown(md: string): string {
  let html = md;

  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    return `<pre class="code-block"><code class="language-${lang || "text"}">${escapeHtml(code.trim())}</code></pre>`;
  });

  html = html.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');

  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

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
  html = html.replace(/^[*-] (.+)$/gm, '<li class="ul-item">$1</li>');

  const lines = html.split("\n");
  let result = "";
  let inUl = false, inOl = false;
  for (const line of lines) {
    if (line.includes('class="ul-item"')) {
      if (!inUl) { result += "<ul>"; inUl = true; }
      result += line + "\n";
    } else if (line.includes('class="ol-item"')) {
      if (!inOl) { result += "<ol>"; inOl = true; }
      result += line + "\n";
    } else {
      if (inUl) { result += "</ul>"; inUl = false; }
      if (inOl) { result += "</ol>"; inOl = false; }
      result += line + "\n";
    }
  }
  if (inUl) result += "</ul>";
  if (inOl) result += "</ol>";
  html = result;

  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  html = html.replace(/~~(.+?)~~/g, "<del>$1</del>");

  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');

  html = html.replace(/^(?!<[hupoltbdira]|<\/|<hr|<code|<pre|<strong|<em|<del|<img|<a )(.+)$/gm, "<p>$1</p>");

  return html;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export default function MarkdownPreviewPage() {
  const [input, setInput] = useState(sampleMd);
  const [view, setView] = useState<"split" | "preview">("split");
  const { toast } = useToast();

  const html = useMemo(() => parseMarkdown(input), [input]);

  const handleCopyHtml = () => {
    navigator.clipboard.writeText(html);
    toast("HTML copied to clipboard!");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-10 sm:pb-14">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 gap-4">
        <ToolPageHeader />
        <div className="flex gap-2">
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
            onClick={handleCopyHtml}
            className="neu-btn px-3 py-1.5 text-xs font-medium text-muted hover:text-primary"
          >
            Copy HTML
          </button>
        </div>
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
          <div
            className="md-preview prose-custom h-[500px] overflow-auto p-4 rounded-xl bg-background border border-surface-border"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
      <div className="mt-14 max-w-4xl mx-auto space-y-12">
        <section>
          <h2 className="text-xl font-semibold tracking-tight mb-4">Supported Syntax</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="neu-card-sm p-4">
              <h3 className="font-semibold mb-1">Text Formatting</h3>
              <p className="text-sm text-muted">Headings (h1-h6), bold, italic, strikethrough, links, and inline code with proper styling.</p>
            </div>
            <div className="neu-card-sm p-4">
              <h3 className="font-semibold mb-1">Code Blocks</h3>
              <p className="text-sm text-muted">Fenced code blocks with syntax highlighting support. Inline code with backtick styling.</p>
            </div>
            <div className="neu-card-sm p-4">
              <h3 className="font-semibold mb-1">Lists &amp; Tables</h3>
              <p className="text-sm text-muted">Ordered lists, unordered lists, nested lists, and pipe-separated tables with header rows.</p>
            </div>
            <div className="neu-card-sm p-4">
              <h3 className="font-semibold mb-1">Blockquotes &amp; Rules</h3>
              <p className="text-sm text-muted">Blockquotes with left border styling, horizontal rules, and images with alt text.</p>
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
                <tr><td className="p-3 border-b border-surface-border">[link](url)</td><td className="p-3 border-b border-surface-border font-sans text-sm text-primary">link</td></tr>
                <tr><td className="p-3 border-b border-surface-border">`inline code`</td><td className="p-3 border-b border-surface-border"><code className="bg-surface border border-surface-border px-1 py-0.5 rounded text-xs">inline code</code></td></tr>
                <tr><td className="p-3 border-b border-surface-border">- list item</td><td className="p-3 border-b border-surface-border font-sans text-sm">&#x2022; list item</td></tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
