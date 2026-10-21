"use client";

import { useState, useCallback } from "react";

type OutputMode = "typescript" | "zod";

function inferType(value: unknown, name: string, interfaces: Map<string, string>, mode: OutputMode, exportKw: boolean, readonlyKw: boolean): string {
  if (value === null) return mode === "zod" ? "z.null()" : "null";
  if (typeof value === "string") return mode === "zod" ? "z.string()" : "string";
  if (typeof value === "number") return mode === "zod" ? "z.number()" : "number";
  if (typeof value === "boolean") return mode === "zod" ? "z.boolean()" : "boolean";

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return mode === "zod" ? "z.array(z.unknown())" : "unknown[]";
    }
    const elementType = inferType(value[0], name + "Item", interfaces, mode, exportKw, readonlyKw);
    return mode === "zod" ? `z.array(${elementType})` : `${elementType}[]`;
  }

  if (typeof value === "object") {
    const interfaceName = capitalize(name);
    generateInterface(value as Record<string, unknown>, interfaceName, interfaces, mode, exportKw, readonlyKw);
    return mode === "zod" ? `${interfaceName}Schema` : interfaceName;
  }

  return mode === "zod" ? "z.unknown()" : "unknown";
}

function generateInterface(
  obj: Record<string, unknown>,
  name: string,
  interfaces: Map<string, string>,
  mode: OutputMode,
  exportKw: boolean,
  readonlyKw: boolean
) {
  const entries = Object.entries(obj);

  if (mode === "zod") {
    const fields = entries.map(([key, value]) => {
      const type = inferType(value, key, interfaces, mode, exportKw, readonlyKw);
      return `  ${safeName(key)}: ${type},`;
    });
    const prefix = exportKw ? "export " : "";
    const schema = `${prefix}const ${name}Schema = z.object({\n${fields.join("\n")}\n});`;
    interfaces.set(name, schema);
  } else {
    const fields = entries.map(([key, value]) => {
      const type = inferType(value, key, interfaces, mode, exportKw, readonlyKw);
      const ro = readonlyKw ? "readonly " : "";
      return `  ${ro}${safeName(key)}: ${type};`;
    });
    const prefix = exportKw ? "export " : "";
    const iface = `${prefix}interface ${name} {\n${fields.join("\n")}\n}`;
    interfaces.set(name, iface);
  }
}

function capitalize(s: string): string {
  return s.replace(/(^|[_-])(\w)/g, (_, _sep, c) => c.toUpperCase());
}

function safeName(key: string): string {
  return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `"${key}"`;
}

function convert(json: string, rootName: string, mode: OutputMode, exportKw: boolean, readonlyKw: boolean): string {
  const parsed = JSON.parse(json);
  const interfaces = new Map<string, string>();

  if (Array.isArray(parsed)) {
    if (parsed.length > 0 && typeof parsed[0] === "object" && parsed[0] !== null) {
      generateInterface(parsed[0] as Record<string, unknown>, rootName, interfaces, mode, exportKw, readonlyKw);
    }
    const elementType = parsed.length > 0
      ? inferType(parsed[0], rootName, interfaces, mode, exportKw, readonlyKw)
      : mode === "zod" ? "z.unknown()" : "unknown";

    if (mode === "zod") {
      const prefix = exportKw ? "export " : "";
      const result = Array.from(interfaces.values());
      result.push(`${prefix}const ${rootName}ListSchema = z.array(${elementType});`);
      return `import { z } from "zod";\n\n${result.join("\n\n")}`;
    } else {
      const result = Array.from(interfaces.values());
      const prefix = exportKw ? "export " : "";
      result.push(`${prefix}type ${rootName}List = ${elementType}[];`);
      return result.join("\n\n");
    }
  }

  if (typeof parsed === "object" && parsed !== null) {
    generateInterface(parsed as Record<string, unknown>, rootName, interfaces, mode, exportKw, readonlyKw);
    const result = Array.from(interfaces.values());
    if (mode === "zod") {
      return `import { z } from "zod";\n\n${result.join("\n\n")}`;
    }
    return result.join("\n\n");
  }

  const simpleType = inferType(parsed, rootName, interfaces, mode, exportKw, readonlyKw);
  if (mode === "zod") {
    const prefix = exportKw ? "export " : "";
    return `import { z } from "zod";\n\n${prefix}const ${rootName}Schema = ${simpleType};`;
  }
  const prefix = exportKw ? "export " : "";
  return `${prefix}type ${rootName} = ${simpleType};`;
}

const sampleJson = `{
  "id": 1,
  "name": "Ahmad",
  "email": "ahmad@example.com",
  "isActive": true,
  "scores": [98, 85, 92],
  "address": {
    "street": "123 Main St",
    "city": "Lahore",
    "country": "Pakistan"
  },
  "tags": ["developer", "designer"]
}`;

export default function JsonToTypeScriptPage() {
  const [input, setInput] = useState(sampleJson);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [rootName, setRootName] = useState("Root");
  const [mode, setMode] = useState<OutputMode>("typescript");
  const [exportKw, setExportKw] = useState(true);
  const [readonlyKw, setReadonlyKw] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleConvert = useCallback(() => {
    setError("");
    setCopied(false);
    try {
      const result = convert(input, rootName || "Root", mode, exportKw, readonlyKw);
      setOutput(result);
    } catch (e) {
      setOutput("");
      setError(e instanceof Error ? e.message : "Invalid JSON");
    }
  }, [input, rootName, mode, exportKw, readonlyKw]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrettify = () => {
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed, null, 2));
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          JSON to TypeScript Converter
        </h1>
        <p className="text-muted text-lg">
          Paste JSON, get TypeScript interfaces or Zod schemas instantly.
        </p>
      </div>

      {/* Options Bar */}
      <div className="neu-card p-4 mb-6 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Name:</label>
          <input
            type="text"
            value={rootName}
            onChange={(e) => setRootName(e.target.value)}
            className="neu-input px-3 py-1.5 text-sm w-28 focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        <div className="flex items-center gap-1 neu-input p-1">
          <button
            onClick={() => setMode("typescript")}
            className={`px-3 py-1.5 text-sm font-medium rounded-xl transition-all ${
              mode === "typescript"
                ? "bg-primary text-white shadow-sm"
                : "text-muted hover:text-primary"
            }`}
          >
            TypeScript
          </button>
          <button
            onClick={() => setMode("zod")}
            className={`px-3 py-1.5 text-sm font-medium rounded-xl transition-all ${
              mode === "zod"
                ? "bg-purple text-white shadow-sm"
                : "text-muted hover:text-purple"
            }`}
          >
            Zod
          </button>
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={exportKw}
            onChange={(e) => setExportKw(e.target.checked)}
            className="accent-primary w-4 h-4"
          />
          <span className="text-sm">Export</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={readonlyKw}
            onChange={(e) => setReadonlyKw(e.target.checked)}
            className="accent-primary w-4 h-4"
          />
          <span className="text-sm">Readonly</span>
        </label>
      </div>

      {/* Editor Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Input */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-primary">Input — JSON</span>
            <div className="flex gap-2">
              <button
                onClick={handlePrettify}
                className="neu-btn px-3 py-1.5 text-xs font-medium text-muted hover:text-primary"
              >
                Prettify
              </button>
              <button
                onClick={() => { setInput(""); setOutput(""); setError(""); }}
                className="neu-btn px-3 py-1.5 text-xs font-medium text-muted hover:text-error"
              >
                Clear
              </button>
            </div>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Paste your JSON here...'
            spellCheck={false}
            className="code-area w-full h-80 sm:h-96 p-5 text-sm font-mono text-foreground placeholder:text-muted/40 resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        {/* Output */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-primary">
              Output — {mode === "typescript" ? "TypeScript" : "Zod Schema"}
            </span>
            <button
              onClick={handleCopy}
              disabled={!output}
              className="neu-btn px-3 py-1.5 text-xs font-medium text-muted hover:text-primary disabled:opacity-30"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className="code-area w-full h-80 sm:h-96 p-5 text-sm font-mono overflow-auto whitespace-pre-wrap">
            {error ? (
              <span className="text-error">{error}</span>
            ) : output ? (
              output
            ) : (
              <span className="text-muted/40">Click &quot;Convert&quot; to see output...</span>
            )}
          </div>
        </div>
      </div>

      {/* Convert Button */}
      <button
        onClick={handleConvert}
        className="w-full sm:w-auto px-10 py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors shadow-md"
      >
        Convert
      </button>

      {/* SEO Article */}
      <article className="mt-14 neu-card p-8">
        <h2 className="text-xl font-semibold text-foreground mb-3">
          Free Online JSON to TypeScript Converter
        </h2>
        <p className="text-sm text-muted mb-4">
          Zentrify&apos;s JSON to TypeScript converter instantly transforms your
          JSON data into TypeScript interfaces or Zod validation schemas.
          Perfect for developers who need type-safe code from API responses,
          config files, or any JSON data source.
        </p>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Features
        </h3>
        <ul className="text-sm text-muted space-y-1 mb-4 list-disc list-inside">
          <li>Generate TypeScript interfaces with proper type inference</li>
          <li>Generate Zod schemas for runtime validation</li>
          <li>Handle nested objects and arrays recursively</li>
          <li>Customizable root interface name</li>
          <li>Optional export and readonly modifiers</li>
          <li>JSON prettify built-in</li>
        </ul>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          How to Use
        </h3>
        <p className="text-sm text-muted">
          Paste your JSON into the input panel, choose between TypeScript or Zod
          output, set your options, and click Convert. The generated code
          appears instantly — copy it to your clipboard with one click. No
          signup, no server — everything runs in your browser.
        </p>
      </article>
    </div>
  );
}
