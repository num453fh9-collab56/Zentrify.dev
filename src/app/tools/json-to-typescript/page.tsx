"use client";

import { useState, useCallback } from "react";
import { useToast } from "../../components/toast";
import { ToolPageHeader } from "../../components/tool-page-header";

type OutputMode = "typescript" | "zod";
type DeclType = "interface" | "type";

function inferType(value: unknown, name: string, interfaces: Map<string, string>, mode: OutputMode, exportKw: boolean, readonlyKw: boolean, _declType: DeclType = "interface", _allOptional: boolean = false, _sortKeys: boolean = false): string {
  if (value === null) return mode === "zod" ? "z.null()" : "null";
  if (typeof value === "string") return mode === "zod" ? "z.string()" : "string";
  if (typeof value === "number") return mode === "zod" ? "z.number()" : "number";
  if (typeof value === "boolean") return mode === "zod" ? "z.boolean()" : "boolean";

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return mode === "zod" ? "z.array(z.unknown())" : "unknown[]";
    }
    const elementType = inferType(value[0], name + "Item", interfaces, mode, exportKw, readonlyKw, _declType, _allOptional, _sortKeys);
    return mode === "zod" ? `z.array(${elementType})` : `${elementType}[]`;
  }

  if (typeof value === "object") {
    const interfaceName = capitalize(name);
    generateInterface(value as Record<string, unknown>, interfaceName, interfaces, mode, exportKw, readonlyKw, _declType, _allOptional, _sortKeys);
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
  readonlyKw: boolean,
  declType: DeclType = "interface",
  allOptional: boolean = false,
  sortKeys: boolean = false
) {
  let entries = Object.entries(obj);
  if (sortKeys) {
    entries = entries.sort((a, b) => a[0].localeCompare(b[0]));
  }

  if (mode === "zod") {
    const fields = entries.map(([key, value]) => {
      let type = inferType(value, key, interfaces, mode, exportKw, readonlyKw, declType, allOptional, sortKeys);
      if (value === null) {
        type = "z.nullable(z.any())";
      }
      if (allOptional) {
        type = `${type}.optional()`;
      }
      return `  ${safeName(key)}: ${type},`;
    });
    const prefix = exportKw ? "export " : "";
    const schema = `${prefix}const ${name}Schema = z.object({\n${fields.join("\n")}\n});`;
    interfaces.set(name, schema);
  } else {
    const fields = entries.map(([key, value]) => {
      let type = inferType(value, key, interfaces, mode, exportKw, readonlyKw, declType, allOptional, sortKeys);
      if (value === null) {
        type = "any | null";
      }
      const ro = readonlyKw ? "readonly " : "";
      const opt = allOptional ? "?" : "";
      return `  ${ro}${safeName(key)}${opt}: ${type};`;
    });
    const prefix = exportKw ? "export " : "";
    if (declType === "type") {
      const typeAlias = `${prefix}type ${name} = {\n${fields.join("\n")}\n};`;
      interfaces.set(name, typeAlias);
    } else {
      const iface = `${prefix}interface ${name} {\n${fields.join("\n")}\n}`;
      interfaces.set(name, iface);
    }
  }
}

function capitalize(s: string): string {
  return s.replace(/(^|[_-])(\w)/g, (_, _sep, c) => c.toUpperCase());
}

function safeName(key: string): string {
  return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `"${key}"`;
}

function convert(
  json: string,
  rootName: string,
  mode: OutputMode,
  exportKw: boolean,
  readonlyKw: boolean,
  declType: DeclType = "interface",
  allOptional: boolean = false,
  sortKeys: boolean = false
): string {
  const parsed = JSON.parse(json);
  const interfaces = new Map<string, string>();

  if (Array.isArray(parsed)) {
    if (parsed.length > 0 && typeof parsed[0] === "object" && parsed[0] !== null) {
      generateInterface(parsed[0] as Record<string, unknown>, rootName, interfaces, mode, exportKw, readonlyKw, declType, allOptional, sortKeys);
    }
    const elementType = parsed.length > 0
      ? inferType(parsed[0], rootName, interfaces, mode, exportKw, readonlyKw, declType, allOptional, sortKeys)
      : mode === "zod" ? "z.unknown()" : "unknown";

    if (mode === "zod") {
      const prefix = exportKw ? "export " : "";
      const result = Array.from(interfaces.values());
      result.push(`${prefix}const ${rootName}ListSchema = z.array(${elementType});`);
      return `import { z } from "zod";\n\n${result.join("\n\n")}`;
    } else {
      const result = Array.from(interfaces.values());
      const prefix = exportKw ? "export " : "";
      if (declType === "type") {
        result.push(`${prefix}type ${rootName}List = ${elementType}[];`);
      } else {
        result.push(`${prefix}type ${rootName}List = ${elementType}[];`);
      }
      return result.join("\n\n");
    }
  }

  if (typeof parsed === "object" && parsed !== null) {
    generateInterface(parsed as Record<string, unknown>, rootName, interfaces, mode, exportKw, readonlyKw, declType, allOptional, sortKeys);
    const result = Array.from(interfaces.values());
    if (mode === "zod") {
      return `import { z } from "zod";\n\n${result.join("\n\n")}`;
    }
    return result.join("\n\n");
  }

  const simpleType = inferType(parsed, rootName, interfaces, mode, exportKw, readonlyKw, declType, allOptional, sortKeys);
  if (mode === "zod") {
    const prefix = exportKw ? "export " : "";
    return `import { z } from "zod";\n\n${prefix}const ${rootName}Schema = ${simpleType};`;
  }
  const prefix = exportKw ? "export " : "";
  if (declType === "type") {
    return `${prefix}type ${rootName} = ${simpleType};`;
  }
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
  const [declType, setDeclType] = useState<DeclType>("interface");
  const [allOptional, setAllOptional] = useState(false);
  const [sortKeys, setSortKeys] = useState(false);
  const { toast } = useToast();

  const handleConvert = useCallback(() => {
    setError("");
    try {
      const result = convert(input, rootName || "Root", mode, exportKw, readonlyKw, declType, allOptional, sortKeys);
      setOutput(result);
    } catch (e) {
      setOutput("");
      setError(e instanceof Error ? e.message : "Invalid JSON");
    }
  }, [input, rootName, mode, exportKw, readonlyKw, declType, allOptional, sortKeys]);

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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-10 sm:pb-14">
      <ToolPageHeader title="JSON to TypeScript Converter" />

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
                ? "bg-primary text-white shadow-sm"
                : "text-muted hover:text-cat"
            }`}
          >
            Zod
          </button>
        </div>

        {mode === "typescript" && (
          <div className="flex items-center gap-1 neu-input p-1">
            <button
              onClick={() => setDeclType("interface")}
              className={`px-3 py-1.5 text-sm font-medium rounded-xl transition-all ${
                declType === "interface"
                  ? "bg-primary text-white shadow-sm"
                  : "text-muted hover:text-primary"
              }`}
            >
              interface
            </button>
            <button
              onClick={() => setDeclType("type")}
              className={`px-3 py-1.5 text-sm font-medium rounded-xl transition-all ${
                declType === "type"
                  ? "bg-primary text-white shadow-sm"
                  : "text-muted hover:text-primary"
              }`}
            >
              type
            </button>
          </div>
        )}

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={exportKw}
            onChange={(e) => setExportKw(e.target.checked)}
            className="accent-primary w-4 h-4"
          />
          <span className="text-sm">Export</span>
        </label>

        {mode === "typescript" && (
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={readonlyKw}
              onChange={(e) => setReadonlyKw(e.target.checked)}
              className="accent-primary w-4 h-4"
            />
            <span className="text-sm">Readonly</span>
          </label>
        )}

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={allOptional}
            onChange={(e) => setAllOptional(e.target.checked)}
            className="accent-primary w-4 h-4"
          />
          <span className="text-sm">All Optional (?)</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={sortKeys}
            onChange={(e) => setSortKeys(e.target.checked)}
            className="accent-primary w-4 h-4"
          />
          <span className="text-sm">Sort Keys</span>
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
        className="w-full sm:w-auto px-10 py-3.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
      >
        Convert
      </button>

      <div className="mt-14 max-w-4xl mx-auto space-y-12">
        <section>
          <h2 className="text-xl font-semibold tracking-tight mb-4">TypeScript vs Zod: Which Should You Choose?</h2>
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
      </div>
    </div>
  );
}
