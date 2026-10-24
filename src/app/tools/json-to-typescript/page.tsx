"use client";

import { useState, useCallback } from "react";
import { useToast } from "../../components/toast";

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
  const { toast } = useToast();

  const handleConvert = useCallback(() => {
    setError("");
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
    toast("Copied to clipboard!");
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
              Copy
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
      <article className="mt-16 max-w-4xl mx-auto space-y-10">
        <section>
          <h2 className="text-2xl font-bold mb-4">Free Online JSON to TypeScript Converter</h2>
          <p className="text-muted leading-relaxed mb-3">
            Zentrify&apos;s JSON to TypeScript converter instantly transforms your JSON data into
            fully typed TypeScript interfaces or Zod validation schemas. Whether you&apos;re working
            with REST API responses, configuration files, database records, or any structured JSON,
            this tool generates clean, production-ready type definitions in seconds.
          </p>
          <p className="text-muted leading-relaxed">
            Unlike other converters, Zentrify runs entirely in your browser — no data is sent to
            any server, making it safe for proprietary or sensitive data. No signup required, no
            rate limits, no ads blocking your workflow.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Why Convert JSON to TypeScript?</h2>
          <p className="text-muted leading-relaxed mb-3">
            TypeScript&apos;s type system catches bugs at compile time that would otherwise slip
            into production. When you receive JSON data from an API, database, or third-party
            service, that data is untyped by default. By generating TypeScript interfaces from
            your JSON, you get:
          </p>
          <ul className="text-muted space-y-2 list-disc list-inside">
            <li><strong className="text-foreground">Autocomplete &amp; IntelliSense</strong> — your editor knows every field and its type, so you write code faster with fewer mistakes</li>
            <li><strong className="text-foreground">Compile-time error checking</strong> — access a non-existent property or pass the wrong type? TypeScript catches it before you ship</li>
            <li><strong className="text-foreground">Self-documenting code</strong> — interfaces serve as living documentation for your data shapes</li>
            <li><strong className="text-foreground">Refactoring confidence</strong> — rename a field and TypeScript highlights every file that needs updating</li>
            <li><strong className="text-foreground">Team collaboration</strong> — shared interfaces keep frontend and backend teams aligned</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="neu-card-sm p-4">
              <h3 className="font-semibold mb-1">TypeScript Interfaces</h3>
              <p className="text-sm text-muted">Generate clean interfaces with proper type inference for strings, numbers, booleans, arrays, and nested objects.</p>
            </div>
            <div className="neu-card-sm p-4">
              <h3 className="font-semibold mb-1">Zod Schemas</h3>
              <p className="text-sm text-muted">Generate Zod validation schemas for runtime type checking — perfect for form validation and API input parsing.</p>
            </div>
            <div className="neu-card-sm p-4">
              <h3 className="font-semibold mb-1">Nested Object Support</h3>
              <p className="text-sm text-muted">Handles deeply nested objects and arrays recursively, generating separate interfaces for each level.</p>
            </div>
            <div className="neu-card-sm p-4">
              <h3 className="font-semibold mb-1">Export &amp; Readonly</h3>
              <p className="text-sm text-muted">Toggle export keywords and readonly modifiers to match your project&apos;s coding conventions.</p>
            </div>
            <div className="neu-card-sm p-4">
              <h3 className="font-semibold mb-1">Custom Root Name</h3>
              <p className="text-sm text-muted">Set a custom name for the root interface — User, Product, ApiResponse, or anything you need.</p>
            </div>
            <div className="neu-card-sm p-4">
              <h3 className="font-semibold mb-1">JSON Prettifier</h3>
              <p className="text-sm text-muted">Built-in prettify button formats messy or minified JSON into readable, indented output before converting.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use</h2>
          <ol className="text-muted space-y-3 list-decimal list-inside">
            <li><strong className="text-foreground">Paste your JSON</strong> — copy JSON from your API response, Postman, or any source and paste it into the input panel</li>
            <li><strong className="text-foreground">Choose output mode</strong> — select TypeScript for interfaces or Zod for runtime validation schemas</li>
            <li><strong className="text-foreground">Set options</strong> — customize the root name, toggle export/readonly as needed</li>
            <li><strong className="text-foreground">Click Convert</strong> — your typed code appears instantly in the output panel</li>
            <li><strong className="text-foreground">Copy &amp; use</strong> — one-click copy to clipboard, paste directly into your project</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">TypeScript vs Zod: Which Should You Choose?</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-surface-border rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-surface">
                  <th className="text-left p-3 font-semibold border-b border-surface-border">Feature</th>
                  <th className="text-left p-3 font-semibold border-b border-surface-border">TypeScript Interface</th>
                  <th className="text-left p-3 font-semibold border-b border-surface-border">Zod Schema</th>
                </tr>
              </thead>
              <tbody className="text-muted">
                <tr><td className="p-3 border-b border-surface-border">Type checking</td><td className="p-3 border-b border-surface-border">Compile-time only</td><td className="p-3 border-b border-surface-border">Compile-time + runtime</td></tr>
                <tr><td className="p-3 border-b border-surface-border">Validation</td><td className="p-3 border-b border-surface-border">No built-in validation</td><td className="p-3 border-b border-surface-border">Full validation with error messages</td></tr>
                <tr><td className="p-3 border-b border-surface-border">Bundle size</td><td className="p-3 border-b border-surface-border">Zero (types stripped at build)</td><td className="p-3 border-b border-surface-border">~14KB (Zod library needed)</td></tr>
                <tr><td className="p-3 border-b border-surface-border">Best for</td><td className="p-3 border-b border-surface-border">Internal code, trusted data</td><td className="p-3 border-b border-surface-border">API inputs, forms, external data</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="neu-card-sm p-5">
              <h3 className="font-semibold mb-2">Is my JSON data safe?</h3>
              <p className="text-sm text-muted">Yes. Everything runs 100% in your browser. Your JSON is never sent to any server — not even ours. You can verify this by checking the network tab in your browser&apos;s developer tools.</p>
            </div>
            <div className="neu-card-sm p-5">
              <h3 className="font-semibold mb-2">Does it handle nested JSON?</h3>
              <p className="text-sm text-muted">Yes. The converter recursively processes nested objects and arrays, generating separate interfaces for each nested structure with proper type references.</p>
            </div>
            <div className="neu-card-sm p-5">
              <h3 className="font-semibold mb-2">Can I convert JSON arrays?</h3>
              <p className="text-sm text-muted">Yes. If your JSON root is an array, the converter infers the element type from the first item and generates the corresponding interface plus an array type alias.</p>
            </div>
            <div className="neu-card-sm p-5">
              <h3 className="font-semibold mb-2">What about optional fields?</h3>
              <p className="text-sm text-muted">Currently, all fields are generated as required. For optional fields, you can manually add the ? modifier after conversion. We&apos;re working on auto-detection of optional fields from multiple JSON samples.</p>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
