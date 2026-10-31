"use client";

import { useState, useCallback } from "react";
import { useToast } from "../../components/toast";
import { ToolPageHeader } from "../../components/tool-page-header";

type Mode = "encode" | "decode";

export default function Base64Page() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<Mode>("encode");
  const [error, setError] = useState("");
  const { toast } = useToast();

  const handleConvert = useCallback(() => {
    setError("");
    if (!input.trim()) {
      setOutput("");
      return;
    }

    try {
      if (mode === "encode") {
        const encoded = btoa(
          encodeURIComponent(input).replace(/%([0-9A-F]{2})/g, (_, p1) =>
            String.fromCharCode(parseInt(p1, 16))
          )
        );
        setOutput(encoded);
      } else {
        const decoded = decodeURIComponent(
          Array.from(atob(input), (c) =>
            "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
          ).join("")
        );
        setOutput(decoded);
      }
    } catch {
      setError(mode === "decode" ? "Invalid Base64 string" : "Encoding failed");
      setOutput("");
    }
  }, [input, mode]);

  const handleSwap = () => {
    setInput(output);
    setOutput("");
    setError("");
    setMode((prev) => (prev === "encode" ? "decode" : "encode"));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast("Copied to clipboard!");
  };

  const charCount = input.length;
  const outputSize = output.length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-10 sm:pb-14">
      <ToolPageHeader title="Base64 Encoder / Decoder" />

      {/* Mode Toggle */}
      <div className="neu-card p-2 inline-flex rounded-xl mb-6">
        {(["encode", "decode"] as const).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); setError(""); setOutput(""); }}
            className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-all ${
              mode === m
                ? "bg-primary text-white shadow-md"
                : "text-muted hover:text-foreground"
            }`}
          >
            {m === "encode" ? "Encode" : "Decode"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="neu-card p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">
              {mode === "encode" ? "Plain Text" : "Base64 Input"}
            </span>
            <span className="text-xs text-muted">{charCount} chars</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="code-area w-full h-64 p-4 text-sm resize-none"
            placeholder={mode === "encode" ? "Enter text to encode..." : "Paste Base64 string..."}
            spellCheck={false}
          />
        </div>

        {/* Output */}
        <div className="neu-card p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-primary">
              {mode === "encode" ? "Base64 Output" : "Decoded Text"}
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
                {mode === "encode" ? "Base64 output will appear here..." : "Decoded text will appear here..."}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3 mt-6">
        <button
          onClick={handleConvert}
          className="neu-btn px-6 py-3 text-sm font-semibold text-white bg-primary hover:bg-primary-dark"
        >
          {mode === "encode" ? "Encode →" : "Decode →"}
        </button>
        <button
          onClick={handleSwap}
          disabled={!output}
          className="neu-btn px-5 py-3 text-sm font-medium text-muted hover:text-primary disabled:opacity-30"
        >
          ⇄ Swap & Reverse
        </button>
        <button
          onClick={() => { setInput(""); setOutput(""); setError(""); }}
          className="neu-btn px-5 py-3 text-sm font-medium text-muted hover:text-error"
        >
          Clear
        </button>
        {output && (
          <span className="text-xs text-muted ml-auto">
            Output: {outputSize} chars
            {mode === "encode" && ` (${Math.round((outputSize / Math.max(charCount, 1)) * 100)}% of original)`}
          </span>
        )}
      </div>
    </div>
  );
}
