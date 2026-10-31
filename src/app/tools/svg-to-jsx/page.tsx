"use client";

import { useState, useMemo } from "react";
import { useToast } from "../../components/toast";
import { ToolPageHeader } from "../../components/tool-page-header";

const attrMap: Record<string, string> = {
  class: "className",
  for: "htmlFor",
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

function styleStringToObject(style: string): string {
  const pairs = style.split(";").filter(Boolean);
  const obj: string[] = [];
  for (const pair of pairs) {
    const [key, value] = pair.split(":");
    if (!key || !value) continue;
    const trimmedKey = key.trim();
    const trimmedValue = value.trim().replace(/'/g, "\\'");
    const camelKey = trimmedKey.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    obj.push(`${camelKey}: '${trimmedValue}'`);
  }
  return `{ ${obj.join(", ")} }`;
}

function convertSvgToJsx(svg: string, removeXmlns: boolean, removeComments: boolean): string {
  let jsx = svg;

  if (removeXmlns) {
    jsx = jsx.replace(/\s+xmlns(?::[a-z]+)?="[^"]*"/g, "");
  }

  for (const [html, react] of Object.entries(attrMap)) {
    const regex = new RegExp(`\\b${html.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}=`, "g");
    jsx = jsx.replace(regex, `${react}=`);
  }

  jsx = jsx.replace(/style="([^"]*)"/g, (_, styleStr) => {
    return `style={${styleStringToObject(styleStr)}}`;
  });

  if (removeComments) {
    jsx = jsx.replace(/<!--[\s\S]*?-->/g, "");
  } else {
    jsx = jsx.replace(/<!--[\s\S]*?-->/g, "{/* $& */}");
  }

  return jsx;
}

function wrapInComponent(
  jsx: string,
  name: string,
  typescript: boolean,
  propsForSize: boolean,
  useForwardRef: boolean,
  namedExport: boolean
): string {
  const trimmed = jsx.trim();
  const svgTag = trimmed.match(/<svg[\s\S]*?>/i)?.[0] || "<svg>";
  const hasExistingClassName = /className=/.test(svgTag);
  const hasExistingWidth = /width=/.test(svgTag);
  const hasExistingHeight = /height=/.test(svgTag);

  let newSvgTag = svgTag;
  const additions: string[] = [];
  if (!hasExistingWidth && propsForSize) additions.push("width={width}");
  if (!hasExistingHeight && propsForSize) additions.push("height={height}");
  if (!hasExistingClassName) additions.push("className={className}");
  additions.push("{...props}");
  if (additions.length > 0) {
    newSvgTag = svgTag.replace(/<svg/i, `<svg ${additions.join(" ")}`);
  }

  const svgContent = trimmed.replace(svgTag, newSvgTag);

  if (typescript && useForwardRef && propsForSize) {
    const exportType = namedExport ? `export` : `export default`;
    return `import { forwardRef } from "react";

${exportType} const ${name} = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { width?: number | string; height?: number | string }>(
  ({ width, height, className, ...props }, ref) => {
    return (
      ${svgContent.replace(/<svg/, `<svg ref={ref}`)}
    );
  }
);

${name}.displayName = "${name}";`;
  }

  if (typescript && useForwardRef) {
    const exportType = namedExport ? `export` : `export default`;
    return `import { forwardRef } from "react";

${exportType} const ${name} = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  ({ className, ...props }, ref) => {
    return (
      ${svgContent.replace(/<svg/, `<svg ref={ref}`)}
    );
  }
);

${name}.displayName = "${name}";`;
  }

  if (typescript && propsForSize) {
    const exportType = namedExport ? `export` : `export default`;
    return `import type { SVGProps } from "react";

${exportType} function ${name}({ width, height, className, ...props }: SVGProps<SVGSVGElement> & { width?: number | string; height?: number | string }) {
  return (
    ${svgContent}
  );
}`;
  }

  if (typescript) {
    const exportType = namedExport ? `export` : `export default`;
    return `import type { SVGProps } from "react";

${exportType} function ${name}({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    ${svgContent}
  );
}`;
  }

  if (useForwardRef && propsForSize) {
    const exportType = namedExport ? `export` : `export default`;
    return `import { forwardRef } from "react";

${exportType} const ${name} = forwardRef(({ width, height, className, ...props }, ref) => {
  return (
    ${svgContent.replace(/<svg/, `<svg ref={ref}`)}
  );
});

${name}.displayName = "${name}";`;
  }

  if (useForwardRef) {
    const exportType = namedExport ? `export` : `export default`;
    return `import { forwardRef } from "react";

${exportType} const ${name} = forwardRef(({ className, ...props }, ref) => {
  return (
    ${svgContent.replace(/<svg/, `<svg ref={ref}`)}
  );
});

${name}.displayName = "${name}";`;
  }

  if (propsForSize) {
    const exportType = namedExport ? `export` : `export default`;
    return `${exportType} function ${name}({ width, height, className, ...props }) {
  return (
    ${svgContent}
  );
}`;
  }

  const exportType = namedExport ? `export` : `export default`;
  return `${exportType} function ${name}({ className, ...props }) {
  return (
    ${svgContent}
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
  const [useForwardRef, setUseForwardRef] = useState(false);
  const [namedExport, setNamedExport] = useState(false);
  const [removeComments, setRemoveComments] = useState(true);
  const { toast } = useToast();

  const output = useMemo(() => {
    if (!input.trim()) return "";
    try {
      const jsx = convertSvgToJsx(input, removeXmlns, removeComments);
      return wrapInComponent(jsx, componentName || "Icon", typescript, propsForSize, useForwardRef, namedExport);
    } catch {
      return "// Error converting SVG";
    }
  }, [input, componentName, typescript, removeXmlns, propsForSize, useForwardRef, namedExport, removeComments]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast("Copied to clipboard!");
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-10 sm:pb-14">
      <ToolPageHeader title="SVG to React JSX Converter" />

      {/* Options Bar */}
      <div className="neu-card p-4 mb-6 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Component:</label>
          <input
            type="text"
            value={componentName}
            onChange={(e) => setComponentName(e.target.value)}
            className="neu-input px-3 py-1.5 text-sm w-32 focus:outline-none focus:ring-2 focus:ring-success/30"
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
                ? "bg-primary text-white shadow-sm"
                : "text-muted hover:text-cat"
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

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={useForwardRef}
            onChange={(e) => setUseForwardRef(e.target.checked)}
            className="accent-success w-4 h-4"
          />
          <span className="text-sm">forwardRef</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={namedExport}
            onChange={(e) => setNamedExport(e.target.checked)}
            className="accent-success w-4 h-4"
          />
          <span className="text-sm">Named export</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={removeComments}
            onChange={(e) => setRemoveComments(e.target.checked)}
            className="accent-success w-4 h-4"
          />
          <span className="text-sm">Remove comments</span>
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
              Copy
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
        <div className="neu-card p-6 mb-6">
          <span className="text-sm font-medium text-success mb-3 block">SVG Preview</span>
          <div
            className="flex items-center justify-center p-8 rounded-xl bg-background"
            dangerouslySetInnerHTML={{ __html: svgPreview }}
          />
        </div>
      )}

    </div>
  );
}
