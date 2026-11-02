"use client";

import { useState, useCallback, useRef, useMemo } from "react";
import { useToast } from "../../components/toast";
import { ToolPageHeader } from "../../components/tool-page-header";

type Mode = "encode" | "decode" | "auto";
type Encoding = "utf-8" | "ascii" | "latin-1";

function isBase64(str: string): boolean {
  if (!str.trim()) return false;
  const cleaned = str.replace(/\s/g, "");
  return /^[A-Za-z0-9+/\-_]+=?=?$/.test(cleaned) && cleaned.length % 4 === 0 && cleaned.length >= 4;
}

function toUrlSafe(b64: string): string {
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromUrlSafe(b64: string): string {
  let s = b64.replace(/-/g, "+").replace(/_/g, "/");
  while (s.length % 4) s += "=";
  return s;
}

function wrapLines(str: string, len: number): string {
  const lines: string[] = [];
  for (let i = 0; i < str.length; i += len) lines.push(str.slice(i, i + len));
  return lines.join("\n");
}

function encodeText(text: string, encoding: Encoding): string {
  if (encoding === "ascii") {
    return btoa(
      text
        .split("")
        .map((c) => String.fromCharCode(c.charCodeAt(0) & 0x7f))
        .join("")
    );
  }
  if (encoding === "latin-1") {
    return btoa(
      text
        .split("")
        .map((c) => String.fromCharCode(c.charCodeAt(0) & 0xff))
        .join("")
    );
  }
  return btoa(
    encodeURIComponent(text).replace(/%([0-9A-F]{2})/g, (_, p1) =>
      String.fromCharCode(parseInt(p1, 16))
    )
  );
}

function decodeText(b64: string, encoding: Encoding): string {
  const normalized = fromUrlSafe(b64.replace(/\s/g, ""));
  const raw = atob(normalized);
  if (encoding === "ascii" || encoding === "latin-1") return raw;
  return decodeURIComponent(
    Array.from(raw, (c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join("")
  );
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB"];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), 2);
  return (bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1) + " " + units[i];
}

function detectImageType(b64: string): string | null {
  try {
    const normalized = fromUrlSafe(b64.replace(/\s/g, ""));
    const raw = atob(normalized);
    const h = (i: number) => raw.charCodeAt(i);
    if (h(0) === 0x89 && raw.slice(1, 4) === "PNG") return "image/png";
    if (h(0) === 0xff && h(1) === 0xd8) return "image/jpeg";
    if (raw.slice(0, 4) === "GIF8") return "image/gif";
    if (raw.slice(0, 4) === "RIFF" && raw.slice(8, 12) === "WEBP") return "image/webp";
    if (raw.includes("<svg")) return "image/svg+xml";
  } catch { /* not an image */ }
  return null;
}

export default function Base64Page() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<Mode>("auto");
  const [encoding, setEncoding] = useState<Encoding>("utf-8");
  const [urlSafe, setUrlSafe] = useState(false);
  const [lineWrap, setLineWrap] = useState(false);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const resolvedMode = useMemo<"encode" | "decode">(() => {
    if (mode !== "auto") return mode;
    return isBase64(input) ? "decode" : "encode";
  }, [mode, input]);

  const handleConvert = useCallback(() => {
    setError("");
    if (!input.trim()) {
      setOutput("");
      return;
    }
    try {
      if (resolvedMode === "encode") {
        let encoded = encodeText(input, encoding);
        if (urlSafe) encoded = toUrlSafe(encoded);
        if (lineWrap) encoded = wrapLines(encoded, 76);
        setOutput(encoded);
      } else {
        setOutput(decodeText(input, encoding));
      }
    } catch {
      setError(resolvedMode === "decode" ? "Invalid Base64 string" : "Encoding failed");
      setOutput("");
    }
  }, [input, resolvedMode, encoding, urlSafe, lineWrap]);

  const handleFileUpload = useCallback(
    (file: File) => {
      setFileName(file.name);
      setError("");
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        const raw = dataUrl.split(",")[1] || "";
        const result = urlSafe ? toUrlSafe(raw) : raw;
        setInput(`data:${file.type || "application/octet-stream"};base64,${raw}`);
        setOutput(lineWrap ? wrapLines(result, 76) : result);
        setMode("encode");
      };
      reader.onerror = () => {
        setError("Failed to read file");
      };
      reader.readAsDataURL(file);
    },
    [urlSafe, lineWrap]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFileUpload(file);
    },
    [handleFileUpload]
  );

  const handleSwap = () => {
    setInput(output);
    setOutput("");
    setError("");
    setFileName("");
    setMode((prev) => (prev === "encode" ? "decode" : prev === "decode" ? "encode" : "auto"));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast("Copied to clipboard!");
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
    setFileName("");
  };

  const inputBytes = new TextEncoder().encode(input).length;
  const outputBytes = new TextEncoder().encode(output).length;

  const imagePreview = useMemo(() => {
    if (resolvedMode !== "decode" || !output) return null;
    const imgType = detectImageType(input);
    if (!imgType) return null;
    const normalized = fromUrlSafe(input.replace(/\s/g, ""));
    return `data:${imgType};base64,${normalized}`;
  }, [resolvedMode, input, output]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-10 sm:pb-14">
      <ToolPageHeader title="Base64 Encoder / Decoder" />

      {/* Controls bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {/* Mode toggle */}
        <div className="neu-card p-1.5 inline-flex rounded-xl">
          {(["auto", "encode", "decode"] as const).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setError(""); setOutput(""); }}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                mode === m ? "bg-primary text-white shadow-md" : "text-muted hover:text-foreground"
              }`}
            >
              {m === "auto" ? "Auto" : m === "encode" ? "Encode" : "Decode"}
            </button>
          ))}
        </div>

        {/* Encoding selector */}
        <select
          value={encoding}
          onChange={(e) => setEncoding(e.target.value as Encoding)}
          className="neu-btn px-3 py-2 text-xs font-medium text-muted rounded-lg"
        >
          <option value="utf-8">UTF-8</option>
          <option value="ascii">ASCII</option>
          <option value="latin-1">Latin-1</option>
        </select>

        {/* Toggles */}
        <label className="inline-flex items-center gap-2 neu-btn px-3 py-2 rounded-lg cursor-pointer text-xs font-medium text-muted">
          <input type="checkbox" checked={urlSafe} onChange={(e) => setUrlSafe(e.target.checked)} className="accent-primary" />
          URL-safe
        </label>
        <label className="inline-flex items-center gap-2 neu-btn px-3 py-2 rounded-lg cursor-pointer text-xs font-medium text-muted">
          <input type="checkbox" checked={lineWrap} onChange={(e) => setLineWrap(e.target.checked)} className="accent-primary" />
          Line wrap (76)
        </label>

        {mode === "auto" && input.trim() && (
          <span className="text-xs text-muted ml-auto">
            Detected: <span className="font-semibold text-primary">{resolvedMode === "decode" ? "Base64 → Decode" : "Text → Encode"}</span>
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div
          className={`neu-card p-6 transition-all ${dragging ? "ring-2 ring-primary/50" : ""}`}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">
              {resolvedMode === "encode" ? "Plain Text / File" : "Base64 Input"}
            </span>
            <div className="flex items-center gap-2">
              {fileName && <span className="text-xs text-primary font-medium truncate max-w-[140px]">{fileName}</span>}
              <button
                onClick={() => fileRef.current?.click()}
                className="neu-btn px-3 py-1.5 text-xs font-medium text-muted hover:text-primary"
              >
                Upload File
              </button>
            </div>
          </div>
          <textarea
            value={input}
            onChange={(e) => { setInput(e.target.value); setFileName(""); }}
            className="code-area w-full h-64 p-4 text-sm resize-none"
            placeholder={
              dragging
                ? "Drop file here..."
                : resolvedMode === "encode"
                  ? "Enter text to encode or drop a file..."
                  : "Paste Base64 string..."
            }
            spellCheck={false}
          />
          <input
            ref={fileRef}
            type="file"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFileUpload(f);
              e.target.value = "";
            }}
          />
        </div>

        {/* Output */}
        <div className="neu-card p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-primary">
              {resolvedMode === "encode" ? "Base64 Output" : "Decoded Text"}
            </span>
            <button
              onClick={handleCopy}
              disabled={!output}
              className="neu-btn px-3 py-1.5 text-xs font-medium text-muted hover:text-primary disabled:opacity-30"
            >
              Copy
            </button>
          </div>
          <div className="code-area w-full h-64 p-4 text-sm overflow-auto whitespace-pre-wrap break-all">
            {error ? (
              <span className="text-error">{error}</span>
            ) : output ? (
              output
            ) : (
              <span className="text-muted/40">
                {resolvedMode === "encode" ? "Base64 output will appear here..." : "Decoded text will appear here..."}
              </span>
            )}
          </div>

          {/* Image preview */}
          {imagePreview && (
            <div className="mt-4 p-3 rounded-xl bg-background border border-surface-border">
              <p className="text-xs font-medium text-muted mb-2">Image Preview</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imagePreview} alt="Decoded" className="max-h-40 rounded-lg object-contain" />
            </div>
          )}
        </div>
      </div>

      {/* Actions + Stats */}
      <div className="flex flex-wrap items-center gap-3 mt-6">
        <button
          onClick={handleConvert}
          className="neu-btn px-6 py-3 text-sm font-semibold text-white bg-primary hover:bg-primary-dark"
        >
          {resolvedMode === "encode" ? "Encode →" : "Decode →"}
        </button>
        <button
          onClick={handleSwap}
          disabled={!output}
          className="neu-btn px-5 py-3 text-sm font-medium text-muted hover:text-primary disabled:opacity-30"
        >
          ⇄ Swap & Reverse
        </button>
        <button
          onClick={handleClear}
          className="neu-btn px-5 py-3 text-sm font-medium text-muted hover:text-error"
        >
          Clear
        </button>
      </div>

      {/* Size stats */}
      {(input || output) && (
        <div className="flex flex-wrap items-center gap-5 mt-4">
          <div className="flex items-center gap-4 text-xs text-muted">
            <span>Input: <b className="text-foreground">{formatBytes(inputBytes)}</b> ({input.length} chars)</span>
            {output && (
              <>
                <span>Output: <b className="text-foreground">{formatBytes(outputBytes)}</b> ({output.length} chars)</span>
                <span>
                  Ratio: <b className="text-foreground">
                    {inputBytes > 0 ? (outputBytes / inputBytes).toFixed(2) + "x" : "—"}
                  </b>
                  {resolvedMode === "encode" && inputBytes > 0 && (
                    <span className="text-muted"> (+{Math.round(((outputBytes - inputBytes) / inputBytes) * 100)}%)</span>
                  )}
                </span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
