"use client";

import { useState, useCallback } from "react";
import { useToast } from "../../components/toast";

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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          Base64 Encoder / Decoder
        </h1>
        <p className="text-muted text-lg">
          Encode text to Base64 or decode Base64 back to text. UTF-8 supported.
        </p>
      </div>

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
      {/* SEO Article */}
      <article className="mt-16 max-w-4xl mx-auto space-y-10">
        <section>
          <h2 className="text-2xl font-bold mb-4">Free Online Base64 Encoder &amp; Decoder</h2>
          <p className="text-muted leading-relaxed mb-3">
            Encode text to Base64 or decode Base64 strings back to plain text instantly with
            Zentrify&apos;s free tool. Full UTF-8 support for international characters, emojis,
            and special symbols. See the output update in real time as you type.
          </p>
          <p className="text-muted leading-relaxed">
            Base64 encoding is essential for embedding data in URLs, emails, JSON payloads,
            HTML data URIs, and API authentication headers. This tool handles it all — privately
            in your browser with zero server communication.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">What is Base64 Encoding?</h2>
          <p className="text-muted leading-relaxed mb-3">
            Base64 is a binary-to-text encoding scheme that represents binary data using 64 ASCII
            characters (A-Z, a-z, 0-9, +, /). It&apos;s used whenever binary or non-ASCII data
            needs to travel through text-only channels like email (MIME), URLs, JSON, or XML.
          </p>
          <ul className="text-muted space-y-2 list-disc list-inside">
            <li><strong className="text-foreground">Email attachments</strong> — MIME encoding uses Base64 to embed files in email bodies</li>
            <li><strong className="text-foreground">Data URIs</strong> — embed images directly in HTML/CSS as <code className="text-xs bg-surface border border-surface-border px-1 py-0.5 rounded">data:image/png;base64,...</code></li>
            <li><strong className="text-foreground">API authentication</strong> — HTTP Basic Auth sends credentials as Base64-encoded strings</li>
            <li><strong className="text-foreground">JWT tokens</strong> — JSON Web Tokens use Base64url encoding for header and payload segments</li>
            <li><strong className="text-foreground">Binary in JSON</strong> — store binary data in JSON fields that only support text</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="neu-card-sm p-4">
              <h3 className="font-semibold mb-1">Encode &amp; Decode</h3>
              <p className="text-sm text-muted">Switch between encoding and decoding modes with one click. Swap input and output instantly with the reverse button.</p>
            </div>
            <div className="neu-card-sm p-4">
              <h3 className="font-semibold mb-1">UTF-8 Support</h3>
              <p className="text-sm text-muted">Full Unicode support — encode Arabic, Chinese, Japanese, emoji, and any UTF-8 text correctly.</p>
            </div>
            <div className="neu-card-sm p-4">
              <h3 className="font-semibold mb-1">Real-Time Output</h3>
              <p className="text-sm text-muted">Results appear instantly as you type — no need to click a button or wait for processing.</p>
            </div>
            <div className="neu-card-sm p-4">
              <h3 className="font-semibold mb-1">Size Statistics</h3>
              <p className="text-sm text-muted">See character count and encoding size ratio — Base64 increases data size by approximately 33%.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use</h2>
          <ol className="text-muted space-y-3 list-decimal list-inside">
            <li><strong className="text-foreground">Choose mode</strong> — select Encode (text → Base64) or Decode (Base64 → text)</li>
            <li><strong className="text-foreground">Enter input</strong> — type or paste your text/Base64 string</li>
            <li><strong className="text-foreground">Get result</strong> — output appears instantly in real time</li>
            <li><strong className="text-foreground">Copy output</strong> — click Copy to grab the result for your project</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="neu-card-sm p-5">
              <h3 className="font-semibold mb-2">Is Base64 encryption?</h3>
              <p className="text-sm text-muted">No. Base64 is an encoding, not encryption. It&apos;s easily reversible and provides no security. It&apos;s designed for data transport, not data protection. Never use Base64 to &quot;hide&quot; sensitive information.</p>
            </div>
            <div className="neu-card-sm p-5">
              <h3 className="font-semibold mb-2">Why does Base64 increase file size?</h3>
              <p className="text-sm text-muted">Base64 encodes 3 bytes of binary data into 4 ASCII characters, resulting in approximately 33% size increase. This is the trade-off for being able to transmit binary data through text-only channels.</p>
            </div>
            <div className="neu-card-sm p-5">
              <h3 className="font-semibold mb-2">Does this support file encoding?</h3>
              <p className="text-sm text-muted">This tool encodes text strings. For encoding files (images, PDFs), you can use the browser&apos;s FileReader API or command-line tools like <code className="text-xs bg-surface border border-surface-border px-1 py-0.5 rounded">base64</code> on macOS/Linux.</p>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
