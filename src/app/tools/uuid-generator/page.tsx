"use client";

import { useState, useCallback, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { useToast } from "../../components/toast";
import { ToolPageHeader } from "../../components/tool-page-header";

type IdType = "uuidv4" | "uuidv7" | "ulid" | "nanoid" | "cuid2";

const ID_TYPES: { value: IdType; label: string; desc: string }[] = [
  { value: "uuidv4", label: "UUID v4", desc: "Random, most widely used" },
  { value: "uuidv7", label: "UUID v7", desc: "Timestamp-sortable" },
  { value: "ulid", label: "ULID", desc: "Sortable, Crockford base32" },
  { value: "nanoid", label: "NanoID", desc: "Compact, URL-safe" },
  { value: "cuid2", label: "CUID2", desc: "Secure, collision-resistant" },
];

const CROCKFORD = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
const NANOID_ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_-";

function generateUUIDv4(): string {
  return crypto.randomUUID();
}

function generateUUIDv7(): string {
  const now = Date.now();
  const ms = now.toString(16).padStart(12, "0");
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  bytes[0] = parseInt(ms.slice(0, 2), 16);
  bytes[1] = parseInt(ms.slice(2, 4), 16);
  bytes[2] = parseInt(ms.slice(4, 6), 16);
  bytes[3] = parseInt(ms.slice(6, 8), 16);
  bytes[4] = parseInt(ms.slice(8, 10), 16);
  bytes[5] = parseInt(ms.slice(10, 12), 16);
  bytes[6] = (bytes[6] & 0x0f) | 0x70;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function generateULID(): string {
  const now = Date.now();
  let time = "";
  let t = now;
  for (let i = 0; i < 10; i++) {
    time = CROCKFORD[t % 32] + time;
    t = Math.floor(t / 32);
  }
  const rand = new Uint8Array(16);
  crypto.getRandomValues(rand);
  let random = "";
  for (let i = 0; i < 16; i++) {
    random += CROCKFORD[rand[i] % 32];
  }
  return time + random;
}

function generateNanoID(length: number, alphabet: string): string {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  let id = "";
  for (let i = 0; i < length; i++) {
    id += alphabet[bytes[i] % alphabet.length];
  }
  return id;
}

let cuid2Counter = 0;
function generateCUID2(): string {
  const timestamp = Date.now().toString(36);
  const count = (cuid2Counter++).toString(36);
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  const random = Array.from(bytes, (b) => b.toString(36).padStart(2, "0")).join("").slice(0, 16);
  const fingerprint = typeof navigator !== "undefined" ? navigator.userAgent.length.toString(36) : "0";
  const raw = `${timestamp}${count}${fingerprint}${random}`;
  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    hash = ((hash << 5) - hash + raw.charCodeAt(i)) | 0;
  }
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  const hashBytes = new Uint8Array(20);
  crypto.getRandomValues(hashBytes);
  let result = "";
  for (let i = 0; i < 24; i++) {
    const idx = (hashBytes[i % 20] + Math.abs(hash) + i) % chars.length;
    result += chars[idx];
  }
  return result.charAt(0).replace(/[0-9]/, "c") + result.slice(1);
}

function generateId(type: IdType, nanoidLen: number, nanoidAlpha: string): string {
  switch (type) {
    case "uuidv4": return generateUUIDv4();
    case "uuidv7": return generateUUIDv7();
    case "ulid": return generateULID();
    case "nanoid": return generateNanoID(nanoidLen, nanoidAlpha);
    case "cuid2": return generateCUID2();
  }
}

function formatId(id: string, type: IdType, uppercase: boolean, dashes: boolean, braces: boolean): string {
  let result = id;
  if (type === "uuidv4" || type === "uuidv7") {
    if (!dashes) result = result.replace(/-/g, "");
  }
  if (uppercase) result = result.toUpperCase();
  if (braces) result = `{${result}}`;
  return result;
}

function detectUuidVersion(input: string): string | null {
  const clean = input.trim().replace(/^\{|\}$/g, "");
  const uuidRegex = /^[0-9a-f]{8}-?[0-9a-f]{4}-?([0-9a-f])[0-9a-f]{3}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i;
  const match = clean.match(uuidRegex);
  if (!match) return null;
  return match[1];
}

function validateId(input: string): { valid: boolean; type: string; detail: string } {
  const clean = input.trim();
  if (!clean) return { valid: false, type: "", detail: "" };

  const version = detectUuidVersion(clean);
  if (version) {
    const labels: Record<string, string> = { "1": "v1 (timestamp-MAC)", "2": "v2 (DCE)", "3": "v3 (MD5 name)", "4": "v4 (random)", "5": "v5 (SHA-1 name)", "6": "v6 (reordered time)", "7": "v7 (Unix timestamp)" };
    return { valid: true, type: "UUID", detail: labels[version] || `v${version}` };
  }

  if (/^[0-9A-Z]{26}$/.test(clean)) {
    return { valid: true, type: "ULID", detail: "Crockford Base32, 128-bit" };
  }

  if (/^[a-z][a-z0-9]{20,30}$/.test(clean)) {
    return { valid: true, type: "CUID2", detail: `${clean.length} characters` };
  }

  if (/^[A-Za-z0-9_-]{10,64}$/.test(clean)) {
    return { valid: true, type: "NanoID-like", detail: `${clean.length} characters, URL-safe` };
  }

  return { valid: false, type: "Unknown", detail: "Not a recognized ID format" };
}

export default function UUIDGeneratorPage() {
  const { toast } = useToast();
  const [idType, setIdType] = useState<IdType>("uuidv4");
  const [count, setCount] = useState(1);
  const [uppercase, setUppercase] = useState(false);
  const [dashes, setDashes] = useState(true);
  const [braces, setBraces] = useState(false);
  const [ids, setIds] = useState<string[]>([]);
  const [history, setHistory] = useState<{ type: IdType; value: string }[]>([]);
  const [validateInput, setValidateInput] = useState("");
  const [nanoidLen, setNanoidLen] = useState(21);
  const [nanoidAlpha, setNanoidAlpha] = useState(NANOID_ALPHABET);

  useEffect(() => {
    setIds([generateId("uuidv4", 21, NANOID_ALPHABET)]); // eslint-disable-line react-hooks/set-state-in-effect
  }, []);

  const generate = useCallback(() => {
    const list = Array.from({ length: count }, () => generateId(idType, nanoidLen, nanoidAlpha));
    setIds(list);
    const newHistory = list.map((v) => ({ type: idType, value: v }));
    setHistory((prev) => [...newHistory, ...prev].slice(0, 10));
  }, [count, idType, nanoidLen, nanoidAlpha]);

  const formatted = ids.map((u) => formatId(u, idType, uppercase, dashes, braces));
  const validation = validateInput ? validateId(validateInput) : null;

  const copy = useCallback(
    (text: string) => {
      navigator.clipboard.writeText(text).then(() => toast("Copied!"));
    },
    [toast]
  );

  const copyAll = useCallback(() => {
    navigator.clipboard.writeText(formatted.join("\n")).then(() => toast("All IDs copied!"));
  }, [formatted, toast]);

  const isUuidType = idType === "uuidv4" || idType === "uuidv7";

  return (
    <section className="pt-6 sm:pt-8 pb-10 sm:pb-14 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <ToolPageHeader />

        {/* ID Type Selector */}
        <div className="neu-card p-5 mb-4">
          <label className="text-xs font-semibold text-muted uppercase tracking-wider mb-3 block">ID Type</label>
          <div className="flex flex-wrap gap-2">
            {ID_TYPES.map((t) => (
              <button
                key={t.value}
                onClick={() => setIdType(t.value)}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  idType === t.value
                    ? "bg-primary text-white shadow-md"
                    : "bg-background text-muted hover:text-foreground hover:bg-surface"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted mt-2.5">
            {ID_TYPES.find((t) => t.value === idType)?.desc}
          </p>
        </div>

        {/* Controls */}
        <div className="neu-card p-6 mb-4">
          <div className="space-y-5">
            {/* NanoID specific options */}
            <AnimatePresence>
              {idType === "nanoid" && (
                <m.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-3 pb-3 border-b border-surface-border mb-3">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Length: {nanoidLen}
                      </label>
                      <input
                        type="range"
                        min={6}
                        max={64}
                        step={1}
                        value={nanoidLen}
                        onChange={(e) => setNanoidLen(Number(e.target.value))}
                        className="w-full accent-purple"
                      />
                      <div className="flex justify-between text-xs text-muted mt-1">
                        <span>6</span>
                        <span>64</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Alphabet</label>
                      <input
                        type="text"
                        value={nanoidAlpha}
                        onChange={(e) => setNanoidAlpha(e.target.value || NANOID_ALPHABET)}
                        className="w-full px-3 py-2 neu-input text-xs font-mono focus:outline-none focus:ring-2 focus:ring-primary/30"
                        placeholder={NANOID_ALPHABET}
                      />
                      <p className="text-xs text-muted mt-1">{nanoidAlpha.length} unique characters</p>
                    </div>
                  </div>
                </m.div>
              )}
            </AnimatePresence>

            {/* Count */}
            <div>
              <label className="text-sm font-medium mb-2 block">Count: {count}</label>
              <input
                type="range"
                min={1}
                max={100}
                step={1}
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="w-full accent-purple"
              />
              <div className="flex justify-between text-xs text-muted mt-1">
                <span>1</span>
                <span>100</span>
              </div>
            </div>

            {/* Format options */}
            <div className="grid grid-cols-3 gap-3">
              <label className={`flex items-center gap-2.5 p-3 rounded-xl cursor-pointer transition-colors ${uppercase ? "bg-cat/5" : "bg-background"}`}>
                <input type="checkbox" checked={uppercase} onChange={() => setUppercase(!uppercase)} className="w-4 h-4 rounded accent-purple" />
                <span className="text-sm">Uppercase</span>
              </label>
              {isUuidType && (
                <label className={`flex items-center gap-2.5 p-3 rounded-xl cursor-pointer transition-colors ${dashes ? "bg-cat/5" : "bg-background"}`}>
                  <input type="checkbox" checked={dashes} onChange={() => setDashes(!dashes)} className="w-4 h-4 rounded accent-purple" />
                  <span className="text-sm">Dashes</span>
                </label>
              )}
              <label className={`flex items-center gap-2.5 p-3 rounded-xl cursor-pointer transition-colors ${braces ? "bg-cat/5" : "bg-background"}`}>
                <input type="checkbox" checked={braces} onChange={() => setBraces(!braces)} className="w-4 h-4 rounded accent-purple" />
                <span className="text-sm">{"{ } Braces"}</span>
              </label>
            </div>

            <button
              onClick={generate}
              className="w-full px-5 py-3.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Generate {count > 1 ? `${count} IDs` : ID_TYPES.find((t) => t.value === idType)?.label}
            </button>
          </div>
        </div>

        {/* Output */}
        <div className="neu-card p-5 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-muted">
              Generated {formatted.length > 1 ? `(${formatted.length})` : ""}
            </h2>
            {formatted.length > 1 && (
              <button onClick={copyAll} className="text-xs text-cat hover:text-cat/80 font-medium transition-colors">
                Copy All
              </button>
            )}
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {formatted.map((id, i) => (
              <m.div
                key={`${id}-${i}`}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.015 }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background group"
              >
                <code className="flex-1 text-xs font-mono truncate">{id}</code>
                <button
                  onClick={() => copy(id)}
                  className="p-1.5 rounded-lg hover:bg-surface transition-colors text-muted hover:text-cat opacity-50 group-hover:opacity-100"
                  aria-label="Copy"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </m.div>
            ))}
          </div>
        </div>

        {/* Validate */}
        <div className="neu-card p-5 mb-4">
          <h2 className="text-sm font-semibold text-muted mb-3">Validate ID</h2>
          <input
            type="text"
            value={validateInput}
            onChange={(e) => setValidateInput(e.target.value)}
            placeholder="Paste a UUID, ULID, NanoID, or CUID2 to validate…"
            className="w-full px-4 py-2.5 neu-input text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <AnimatePresence>
            {validation && (
              <m.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className={`mt-3 flex items-center gap-3 px-4 py-3 rounded-xl ${
                  validation.valid ? "bg-success/10" : "bg-error/10"
                }`}
              >
                {validation.valid ? (
                  <svg className="w-5 h-5 text-success flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-error flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                <div className="text-sm">
                  <span className="font-semibold">{validation.valid ? validation.type : "Invalid"}</span>
                  {validation.detail && <span className="text-muted ml-1.5">— {validation.detail}</span>}
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </div>

        {/* History */}
        {history.length > 0 && (
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="neu-card p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-muted">History (last 10)</h2>
              <button
                onClick={() => setHistory([])}
                className="text-xs text-muted hover:text-error transition-colors"
              >
                Clear
              </button>
            </div>
            <div className="space-y-1.5">
              {history.map((entry, i) => (
                <div key={`h-${entry.value}-${i}`} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background group">
                  <span className="text-[10px] font-semibold text-muted uppercase w-12 flex-shrink-0">
                    {ID_TYPES.find((t) => t.value === entry.type)?.label}
                  </span>
                  <code className="flex-1 text-xs font-mono truncate text-muted">{entry.value}</code>
                  <button
                    onClick={() => copy(entry.value)}
                    className="p-1 rounded hover:bg-surface transition-colors text-muted hover:text-cat opacity-0 group-hover:opacity-100"
                    aria-label="Copy"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </m.div>
        )}
      </div>
    </section>
  );
}
