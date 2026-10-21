"use client";

import { useState, useMemo } from "react";

const attrMap: Record<string, string> = {
  class: "className",
  "stroke-width": "strokeWidth",
  "stroke-linecap": "strokeLinecap",
  "stroke-linejoin": "strokeLinejoin",
  "stroke-dasharray": "strokeDasharray",
  "stroke-dashoffset": "strokeDashoffset",
  "stroke-miterlimit": "strokeMiterlimit",
  "stroke-opacity": "strokeOpacity",
  "fill-opacity": "fillOpacity",
  "fill-rule": "fillRule",
  "clip-rule": "clipRule",
  "clip-path": "clipPath",
  "font-size": "fontSize",
  "font-family": "fontFamily",
  "font-weight": "fontWeight",
  "font-style": "fontStyle",
  "text-anchor": "textAnchor",
  "text-decoration": "textDecoration",
  "dominant-baseline": "dominantBaseline",
  "alignment-baseline": "alignmentBaseline",
  "baseline-shift": "baselineShift",
  "stop-color": "stopColor",
  "stop-opacity": "stopOpacity",
  "flood-color": "floodColor",
  "flood-opacity": "floodOpacity",
  "color-interpolation": "colorInterpolation",
  "color-interpolation-filters": "colorInterpolationFilters",
  "lighting-color": "lightingColor",
  tabindex: "tabIndex",
  "xml:space": "xmlSpace",
  "xlink:href": "xlinkHref",
};

function convertSvgToJsx(svg: string, removeXmlns: boolean): string {
  let jsx = svg;

  if (removeXmlns) {
    jsx = jsx.replace(/\s+xmlns(?::[a-z]+)?="[^"]*"/g, "");
  }

  for (const [html, react] of Object.entries(attrMap)) {
    const regex = new RegExp(`\\b${html.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}=`, "g");
    jsx = jsx.replace(regex, `${react}=`);
  }

  jsx = jsx.replace(/<!--[\s\S]*?-->/g, "{/* $& */}");

  return jsx;
}

function wrapInComponent(jsx: string, name: string, typescript: boolean, propsForSize: boolean): string {
  const trimmed = jsx.trim();

  if (typescript && propsForSize) {
    return `interface ${name}Props {
  width?: number | string;
  height?: number | string;
  className?: string;
}

export default function ${name}({ width, height, className }: ${name}Props) {
  return (
    ${trimmed.replace(/<svg/, `<svg width={width} height={height} className={className}`)}
  );
}`;
  }

  if (typescript) {
    return `export default function ${name}({ className }: { className?: string }) {
  return (
    ${trimmed.replace(/<svg/, `<svg className={className}`)}
  );
}`;
  }

  if (propsForSize) {
    return `export default function ${name}({ width, height, className }) {
  return (
    ${trimmed.replace(/<svg/, `<svg width={width} height={height} className={className}`)}
  );
}`;
  }

  return `export default function ${name}({ className }) {
  return (
    ${trimmed.replace(/<svg/, `<svg className={className}`)}
  );
}`;
}

const sampleSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
  <path d="M2 17l10 5 10-5"/>
  <path d="M2 12l10 5 10-5"/>
</svg>`;

export default function SvgToJsxPage() {
  const [input, setInput] = useState(sampleSvg);
  const [componentName, setComponentName] = useState("Icon");
  const [typescript, setTypescript] = useState(true);
  const [removeXmlns, setRemoveXmlns] = useState(true);
  const [propsForSize, setPropsForSize] = useState(true);
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    if (!input.trim()) return "";
    try {
      const jsx = convertSvgToJsx(input, removeXmlns);
      return wrapInComponent(jsx, componentName || "Icon", typescript, propsForSize);
    } catch {
      return "// Error converting SVG";
    }
  }, [input, componentName, typescript, removeXmlns, propsForSize]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const svgPreview = useMemo(() => {
    if (!input.trim()) return null;
    try {
      const clean = input.replace(/<script[\s\S]*?<\/script>/gi, "");
      return clean;
    } catch {
      return null;
    }
  }, [input]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          SVG to React JSX Converter
        </h1>
        <p className="text-muted text-lg">
          Paste SVG markup, get a clean React component instantly.
        </p>
      </div>

      {/* Options Bar */}
      <div className="neu-card p-4 mb-6 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Component:</label>
          <input
            type="text"
            value={componentName}
            onChange={(e) => setComponentName(e.target.value)}
            className="neu-input px-3 py-1.5 text-sm w-28 focus:outline-none focus:ring-2 focus:ring-success/30"
          />
        </div>

        <div className="flex items-center gap-1 neu-input p-1">
          <button
            onClick={() => setTypescript(true)}
            className={`px-3 py-1.5 text-sm font-medium rounded-xl transition-all ${
              typescript
                ? "bg-success text-white shadow-sm"
                : "text-muted hover:text-success"
            }`}
          >
            TypeScript
          </button>
          <button
            onClick={() => setTypescript(false)}
            className={`px-3 py-1.5 text-sm font-medium rounded-xl transition-all ${
              !typescript
                ? "bg-warning text-white shadow-sm"
                : "text-muted hover:text-warning"
            }`}
          >
            JavaScript
          </button>
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={removeXmlns}
            onChange={(e) => setRemoveXmlns(e.target.checked)}
            className="accent-success w-4 h-4"
          />
          <span className="text-sm">Remove xmlns</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={propsForSize}
            onChange={(e) => setPropsForSize(e.target.checked)}
            className="accent-success w-4 h-4"
          />
          <span className="text-sm">Size props</span>
        </label>
      </div>

      {/* Editor Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Input */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-success">Input — SVG</span>
            <button
              onClick={() => { setInput(""); }}
              className="neu-btn px-3 py-1.5 text-xs font-medium text-muted hover:text-error"
            >
              Clear
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your SVG code here..."
            spellCheck={false}
            className="code-area w-full h-80 sm:h-96 p-5 text-sm font-mono text-foreground placeholder:text-muted/40 resize-none focus:outline-none focus:ring-2 focus:ring-success/30"
          />
        </div>

        {/* Output */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-success">
              Output — {typescript ? "TSX" : "JSX"} Component
            </span>
            <button
              onClick={handleCopy}
              disabled={!output}
              className="neu-btn px-3 py-1.5 text-xs font-medium text-muted hover:text-success disabled:opacity-30"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className="code-area w-full h-80 sm:h-96 p-5 text-sm font-mono overflow-auto whitespace-pre-wrap">
            {output || (
              <span className="text-muted/40">
                Paste SVG to see the React component...
              </span>
            )}
          </div>
        </div>
      </div>

      {/* SVG Preview */}
      {svgPreview && (
        <div className="neu-card p-6 mb-6 border-t-4 border-t-success">
          <span className="text-sm font-medium text-success mb-3 block">SVG Preview</span>
          <div
            className="flex items-center justify-center p-8 rounded-xl bg-background"
            dangerouslySetInnerHTML={{ __html: svgPreview }}
          />
        </div>
      )}

      {/* SEO Article */}
      <article className="mt-14 neu-card p-8">
        <h2 className="text-xl font-semibold text-foreground mb-3">
          Free Online SVG to React JSX Converter
        </h2>
        <p className="text-sm text-muted mb-4">
          Zentrify&apos;s SVG to JSX converter instantly transforms SVG markup
          into clean React components. All SVG attributes are automatically
          converted to their JSX equivalents — <code>stroke-width</code> becomes{" "}
          <code>strokeWidth</code>, <code>class</code> becomes{" "}
          <code>className</code>, and so on.
        </p>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Features
        </h3>
        <ul className="text-sm text-muted space-y-1 mb-4 list-disc list-inside">
          <li>Auto-converts SVG attributes to camelCase JSX</li>
          <li>Generates TypeScript or JavaScript components</li>
          <li>Optional width/height props for reusability</li>
          <li>Removes xmlns attributes (optional)</li>
          <li>Live SVG preview</li>
          <li>One-click copy</li>
        </ul>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          How to Use
        </h3>
        <p className="text-sm text-muted">
          Paste your SVG code into the input panel. The converter automatically
          generates a React component in real-time. Set your component name,
          choose TypeScript or JavaScript, and copy the output. No signup
          required — runs entirely in your browser.
        </p>
      </article>
    </div>
  );
}
