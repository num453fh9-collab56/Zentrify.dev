"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { m } from "framer-motion";
import { useToast } from "../../components/toast";
import { ToolPageHeader } from "../../components/tool-page-header";

/* ─── MD5 (pure JS) ─── */
function md5Bytes(bytes: Uint8Array): Uint8Array {
  function safeAdd(x: number, y: number) {
    const lsw = (x & 0xffff) + (y & 0xffff);
    return (((x >> 16) + (y >> 16) + (lsw >> 16)) << 16) | (lsw & 0xffff);
  }
  function bitRotateLeft(num: number, cnt: number) {
    return (num << cnt) | (num >>> (32 - cnt));
  }
  function md5cmn(q: number, a: number, b: number, x: number, s: number, t: number) {
    return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
  }
  function md5ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return md5cmn((b & c) | (~b & d), a, b, x, s, t);
  }
  function md5gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return md5cmn((b & d) | (c & ~d), a, b, x, s, t);
  }
  function md5hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return md5cmn(b ^ c ^ d, a, b, x, s, t);
  }
  function md5ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return md5cmn(c ^ (b | ~d), a, b, x, s, t);
  }

  const len = bytes.length;
  const bitLen = len * 8;
  const padLen = ((len + 8) >>> 6) + 1;
  const buf = new Uint8Array(padLen * 64);
  buf.set(bytes);
  buf[len] = 0x80;
  const view = new DataView(buf.buffer);
  view.setUint32(padLen * 64 - 8, bitLen >>> 0, true);
  view.setUint32(padLen * 64 - 4, Math.floor(bitLen / 0x100000000), true);

  let a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;

  for (let i = 0; i < padLen * 64; i += 64) {
    const x: number[] = [];
    for (let j = 0; j < 16; j++) x[j] = view.getInt32(i + j * 4, true);
    const aa = a, bb = b, cc = c, dd = d;

    a=md5ff(a,b,c,d,x[0],7,-680876936);d=md5ff(d,a,b,c,x[1],12,-389564586);
    c=md5ff(c,d,a,b,x[2],17,606105819);b=md5ff(b,c,d,a,x[3],22,-1044525330);
    a=md5ff(a,b,c,d,x[4],7,-176418897);d=md5ff(d,a,b,c,x[5],12,1200080426);
    c=md5ff(c,d,a,b,x[6],17,-1473231341);b=md5ff(b,c,d,a,x[7],22,-45705983);
    a=md5ff(a,b,c,d,x[8],7,1770035416);d=md5ff(d,a,b,c,x[9],12,-1958414417);
    c=md5ff(c,d,a,b,x[10],17,-42063);b=md5ff(b,c,d,a,x[11],22,-1990404162);
    a=md5ff(a,b,c,d,x[12],7,1804603682);d=md5ff(d,a,b,c,x[13],12,-40341101);
    c=md5ff(c,d,a,b,x[14],17,-1502002290);b=md5ff(b,c,d,a,x[15],22,1236535329);

    a=md5gg(a,b,c,d,x[1],5,-165796510);d=md5gg(d,a,b,c,x[6],9,-1069501632);
    c=md5gg(c,d,a,b,x[11],14,643717713);b=md5gg(b,c,d,a,x[0],20,-373897302);
    a=md5gg(a,b,c,d,x[5],5,-701558691);d=md5gg(d,a,b,c,x[10],9,38016083);
    c=md5gg(c,d,a,b,x[15],14,-660478335);b=md5gg(b,c,d,a,x[4],20,-405537848);
    a=md5gg(a,b,c,d,x[9],5,568446438);d=md5gg(d,a,b,c,x[14],9,-1019803690);
    c=md5gg(c,d,a,b,x[3],14,-187363961);b=md5gg(b,c,d,a,x[8],20,1163531501);
    a=md5gg(a,b,c,d,x[13],5,-1444681467);d=md5gg(d,a,b,c,x[2],9,-51403784);
    c=md5gg(c,d,a,b,x[7],14,1735328473);b=md5gg(b,c,d,a,x[12],20,-1926607734);

    a=md5hh(a,b,c,d,x[5],4,-378558);d=md5hh(d,a,b,c,x[8],11,-2022574463);
    c=md5hh(c,d,a,b,x[11],16,1839030562);b=md5hh(b,c,d,a,x[14],23,-35309556);
    a=md5hh(a,b,c,d,x[1],4,-1530992060);d=md5hh(d,a,b,c,x[4],11,1272893353);
    c=md5hh(c,d,a,b,x[7],16,-155497632);b=md5hh(b,c,d,a,x[10],23,-1094730640);
    a=md5hh(a,b,c,d,x[13],4,681279174);d=md5hh(d,a,b,c,x[0],11,-358537222);
    c=md5hh(c,d,a,b,x[3],16,-722521979);b=md5hh(b,c,d,a,x[6],23,76029189);
    a=md5hh(a,b,c,d,x[9],4,-640364487);d=md5hh(d,a,b,c,x[12],11,-421815835);
    c=md5hh(c,d,a,b,x[15],16,530742520);b=md5hh(b,c,d,a,x[2],23,-995338651);

    a=md5ii(a,b,c,d,x[0],6,-198630844);d=md5ii(d,a,b,c,x[7],10,1126891415);
    c=md5ii(c,d,a,b,x[14],15,-1416354905);b=md5ii(b,c,d,a,x[5],21,-57434055);
    a=md5ii(a,b,c,d,x[12],6,1700485571);d=md5ii(d,a,b,c,x[3],10,-1894986606);
    c=md5ii(c,d,a,b,x[10],15,-1051523);b=md5ii(b,c,d,a,x[1],21,-2054922799);
    a=md5ii(a,b,c,d,x[8],6,1873313359);d=md5ii(d,a,b,c,x[15],10,-30611744);
    c=md5ii(c,d,a,b,x[6],15,-1560198380);b=md5ii(b,c,d,a,x[13],21,1309151649);
    a=md5ii(a,b,c,d,x[4],6,-145523070);d=md5ii(d,a,b,c,x[11],10,-1120210379);
    c=md5ii(c,d,a,b,x[2],15,718787259);b=md5ii(b,c,d,a,x[9],21,-343485551);

    a = safeAdd(a, aa); b = safeAdd(b, bb); c = safeAdd(c, cc); d = safeAdd(d, dd);
  }

  const out = new Uint8Array(16);
  [a, b, c, d].forEach((v, i) => {
    out[i * 4] = v & 0xff;
    out[i * 4 + 1] = (v >> 8) & 0xff;
    out[i * 4 + 2] = (v >> 16) & 0xff;
    out[i * 4 + 3] = (v >> 24) & 0xff;
  });
  return out;
}

function md5(input: string): string {
  return toHex(md5Bytes(new TextEncoder().encode(input)));
}

/* ─── helpers ─── */
function toHex(buf: Uint8Array): string {
  return Array.from(buf).map(b => b.toString(16).padStart(2, "0")).join("");
}
function toBase64(buf: Uint8Array): string {
  let s = "";
  buf.forEach(b => (s += String.fromCharCode(b)));
  return btoa(s);
}
function toBinary(buf: Uint8Array): string {
  return Array.from(buf).map(b => b.toString(2).padStart(8, "0")).join(" ");
}

type Encoding = "hex" | "base64" | "binary";
function encode(buf: Uint8Array, enc: Encoding): string {
  if (enc === "base64") return toBase64(buf);
  if (enc === "binary") return toBinary(buf);
  return toHex(buf);
}

async function shaBytes(algorithm: string, data: Uint8Array): Promise<Uint8Array> {
  const buffer = await crypto.subtle.digest(algorithm, data as unknown as ArrayBuffer);
  return new Uint8Array(buffer);
}

async function hmacSha(algorithm: string, key: Uint8Array, data: Uint8Array): Promise<Uint8Array> {
  const algo = algorithm === "SHA-1" ? "SHA-1" : algorithm === "SHA-256" ? "SHA-256" : "SHA-512";
  const cryptoKey = await crypto.subtle.importKey("raw", key as unknown as ArrayBuffer, { name: "HMAC", hash: algo }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", cryptoKey, data as unknown as ArrayBuffer);
  return new Uint8Array(sig);
}

function hmacMd5(key: Uint8Array, data: Uint8Array): Uint8Array {
  const blockSize = 64;
  let k = key;
  if (k.length > blockSize) k = md5Bytes(k);
  const padded = new Uint8Array(blockSize);
  padded.set(k);
  const ipad = new Uint8Array(blockSize);
  const opad = new Uint8Array(blockSize);
  for (let i = 0; i < blockSize; i++) {
    ipad[i] = padded[i] ^ 0x36;
    opad[i] = padded[i] ^ 0x5c;
  }
  const inner = new Uint8Array(blockSize + data.length);
  inner.set(ipad);
  inner.set(data, blockSize);
  const innerHash = md5Bytes(inner);
  const outer = new Uint8Array(blockSize + 16);
  outer.set(opad);
  outer.set(innerHash, blockSize);
  return md5Bytes(outer);
}

type HashResult = { name: string; bytes: Uint8Array };
type Tab = "text" | "file" | "verify" | "bulk";

const ALGO_LENGTHS: Record<number, string[]> = {
  32: ["MD5"], 40: ["SHA-1"], 64: ["SHA-256"], 128: ["SHA-512"],
};

function detectAlgo(hash: string): string | null {
  const clean = hash.replace(/\s/g, "").toLowerCase();
  if (!/^[0-9a-f]+$/.test(clean)) return null;
  return ALGO_LENGTHS[clean.length]?.[0] ?? null;
}

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

const CopyIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

export default function HashGeneratorPage() {
  const { toast } = useToast();
  const [tab, setTab] = useState<Tab>("text");
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<HashResult[]>([]);
  const [computing, setComputing] = useState(false);
  const [encoding, setEncoding] = useState<Encoding>("hex");
  const [hmacMode, setHmacMode] = useState(false);
  const [hmacKey, setHmacKey] = useState("");

  // file tab
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [fileHashes, setFileHashes] = useState<HashResult[]>([]);
  const [dragging, setDragging] = useState(false);

  // verify tab
  const [verifyInput, setVerifyInput] = useState("");
  const [verifyHash, setVerifyHash] = useState("");
  const [verifyResult, setVerifyResult] = useState<null | { match: boolean; algo: string | null }>(null);

  // bulk tab
  const [bulkInput, setBulkInput] = useState("");
  const [bulkAlgo, setBulkAlgo] = useState("SHA-256");
  const [bulkResults, setBulkResults] = useState<{ line: string; hash: string }[]>([]);

  const computeHashes = useCallback(async (data: Uint8Array, isHmac: boolean, keyStr: string): Promise<HashResult[]> => {
    const keyBytes = new TextEncoder().encode(keyStr);
    if (isHmac) {
      const [sha1, sha256, sha512] = await Promise.all([
        hmacSha("SHA-1", keyBytes, data),
        hmacSha("SHA-256", keyBytes, data),
        hmacSha("SHA-512", keyBytes, data),
      ]);
      const md5h = hmacMd5(keyBytes, data);
      return [
        { name: "HMAC-MD5", bytes: md5h },
        { name: "HMAC-SHA-1", bytes: sha1 },
        { name: "HMAC-SHA-256", bytes: sha256 },
        { name: "HMAC-SHA-512", bytes: sha512 },
      ];
    }
    const [sha1, sha256, sha512] = await Promise.all([
      shaBytes("SHA-1", data),
      shaBytes("SHA-256", data),
      shaBytes("SHA-512", data),
    ]);
    const md5h = md5Bytes(data);
    return [
      { name: "MD5", bytes: md5h },
      { name: "SHA-1", bytes: sha1 },
      { name: "SHA-256", bytes: sha256 },
      { name: "SHA-512", bytes: sha512 },
    ];
  }, []);

  const generateHashes = useCallback(async () => {
    if (!input) { setHashes([]); return; }
    setComputing(true);
    try {
      const data = new TextEncoder().encode(input);
      setHashes(await computeHashes(data, hmacMode, hmacKey));
    } finally { setComputing(false); }
  }, [input, hmacMode, hmacKey, computeHashes]);

  useEffect(() => {
    if (tab !== "text") return;
    const t = setTimeout(generateHashes, 300);
    return () => clearTimeout(t);
  }, [generateHashes, tab]);

  const handleFile = useCallback(async (file: File) => {
    setFileName(file.name);
    setFileSize(file.size);
    setFileHashes([]);
    setComputing(true);
    try {
      const buf = new Uint8Array(await file.arrayBuffer());
      setFileHashes(await computeHashes(buf, hmacMode, hmacKey));
    } finally { setComputing(false); }
  }, [hmacMode, hmacKey, computeHashes]);

  const handleFileDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, [handleFile]);

  const handleVerify = useCallback(async () => {
    if (!verifyInput || !verifyHash) return;
    const data = new TextEncoder().encode(verifyInput);
    const algo = detectAlgo(verifyHash);
    let computed = "";
    if (algo === "MD5") computed = toHex(md5Bytes(data));
    else if (algo === "SHA-1") computed = toHex(await shaBytes("SHA-1", data));
    else if (algo === "SHA-256") computed = toHex(await shaBytes("SHA-256", data));
    else if (algo === "SHA-512") computed = toHex(await shaBytes("SHA-512", data));

    const match = algo ? computed === verifyHash.replace(/\s/g, "").toLowerCase() : false;
    setVerifyResult({ match, algo });
  }, [verifyInput, verifyHash]);

  const handleBulk = useCallback(async () => {
    const lines = bulkInput.split("\n").filter(l => l.trim());
    if (!lines.length) return;
    setComputing(true);
    try {
      const results = await Promise.all(
        lines.map(async (line) => {
          const data = new TextEncoder().encode(line);
          let hash: string;
          if (bulkAlgo === "MD5") hash = toHex(md5Bytes(data));
          else hash = toHex(await shaBytes(bulkAlgo === "SHA-1" ? "SHA-1" : bulkAlgo === "SHA-512" ? "SHA-512" : "SHA-256", data));
          return { line, hash };
        })
      );
      setBulkResults(results);
    } finally { setComputing(false); }
  }, [bulkInput, bulkAlgo]);

  const copy = useCallback((text: string) => {
    navigator.clipboard.writeText(text).then(() => toast("Copied!"));
  }, [toast]);

  const copyAll = useCallback((items: HashResult[]) => {
    const text = items.map(h => `${h.name}: ${encode(h.bytes, encoding)}`).join("\n");
    navigator.clipboard.writeText(text).then(() => toast("All hashes copied!"));
  }, [encoding, toast]);

  const activeHashes = tab === "file" ? fileHashes : hashes;

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "text", label: "Text", icon: "M4 6h16M4 12h16M4 18h7" },
    { id: "file", label: "File", icon: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" },
    { id: "verify", label: "Verify", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
    { id: "bulk", label: "Bulk", icon: "M4 6h16M4 10h16M4 14h16M4 18h16" },
  ];

  const inputBytes = useMemo(() => new TextEncoder().encode(input).length, [input]);

  return (
    <section className="pt-6 sm:pt-8 pb-10 sm:pb-14 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <ToolPageHeader />

        {/* Tab bar */}
        <div className="flex gap-1 p-1 rounded-xl bg-surface border border-surface-border mb-5">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${tab === t.id ? "bg-primary text-white shadow-sm" : "text-muted hover:text-foreground hover:bg-background"}`}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d={t.icon} />
              </svg>
              {t.label}
            </button>
          ))}
        </div>

        {/* Controls bar: encoding + HMAC */}
        {(tab === "text" || tab === "file") && (
          <m.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="neu-card p-4 mb-5">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-muted">Encoding:</span>
                {(["hex", "base64", "binary"] as Encoding[]).map(e => (
                  <button key={e} onClick={() => setEncoding(e)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${encoding === e ? "bg-primary text-white" : "bg-background text-muted hover:text-foreground"}`}
                  >{e}</button>
                ))}
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <div className={`relative w-8 h-4.5 rounded-full transition-colors ${hmacMode ? "bg-primary" : "bg-surface-border"}`}
                  onClick={() => setHmacMode(v => !v)}>
                  <div className={`absolute top-0.5 w-3.5 h-3.5 rounded-full bg-white shadow transition-transform ${hmacMode ? "translate-x-4" : "translate-x-0.5"}`} />
                </div>
                <span className="text-xs font-semibold text-muted">HMAC</span>
              </label>
              {hmacMode && (
                <input
                  type="text"
                  value={hmacKey}
                  onChange={e => setHmacKey(e.target.value)}
                  placeholder="Secret key..."
                  className="flex-1 min-w-[140px] px-3 py-1.5 text-xs rounded-lg bg-background border border-surface-border focus:outline-none focus:ring-2 focus:ring-primary/30 font-mono"
                />
              )}
            </div>
          </m.div>
        )}

        {/* TEXT TAB */}
        {tab === "text" && (
          <m.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="neu-card p-6 mb-5">
              <label className="text-sm font-medium mb-2 block">Input Text</label>
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type or paste text to hash..."
                className="w-full h-32 code-area p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                spellCheck={false}
              />
              {input && <p className="text-xs text-muted mt-2">{inputBytes} bytes</p>}
            </div>

            {activeHashes.length > 0 && (
              <div className="neu-card p-5">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-semibold text-muted">{computing ? "Computing..." : "Hash Results"}</h2>
                  <button onClick={() => copyAll(activeHashes)} className="text-xs font-medium text-primary hover:underline">Copy All</button>
                </div>
                <div className="space-y-3">
                  {activeHashes.map(h => (
                    <div key={h.name} className="px-3 py-3 rounded-lg bg-background">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-primary">{h.name}</span>
                        <button onClick={() => copy(encode(h.bytes, encoding))} className="p-1.5 rounded-lg hover:bg-surface transition-colors text-muted hover:text-primary" aria-label={`Copy ${h.name}`}>
                          <CopyIcon />
                        </button>
                      </div>
                      <code className="text-xs font-mono break-all leading-relaxed">{encode(h.bytes, encoding)}</code>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </m.div>
        )}

        {/* FILE TAB */}
        {tab === "file" && (
          <m.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div
              className={`neu-card p-8 mb-5 text-center border-2 border-dashed transition-colors cursor-pointer ${dragging ? "border-primary bg-primary/5" : "border-surface-border"}`}
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleFileDrop}
              onClick={() => document.getElementById("hash-file-input")?.click()}
            >
              <input id="hash-file-input" type="file" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
              <svg className="w-10 h-10 mx-auto mb-3 text-muted" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              <p className="text-sm font-medium">{dragging ? "Drop file here" : "Click or drag & drop a file"}</p>
              <p className="text-xs text-muted mt-1">Any file type</p>
            </div>

            {fileName && (
              <div className="neu-card p-4 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{fileName}</p>
                    <p className="text-xs text-muted">{formatBytes(fileSize)}</p>
                  </div>
                </div>
              </div>
            )}

            {fileHashes.length > 0 && (
              <div className="neu-card p-5">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-semibold text-muted">{computing ? "Computing..." : "File Hashes"}</h2>
                  <button onClick={() => copyAll(fileHashes)} className="text-xs font-medium text-primary hover:underline">Copy All</button>
                </div>
                <div className="space-y-3">
                  {fileHashes.map(h => (
                    <div key={h.name} className="px-3 py-3 rounded-lg bg-background">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-primary">{h.name}</span>
                        <button onClick={() => copy(encode(h.bytes, encoding))} className="p-1.5 rounded-lg hover:bg-surface transition-colors text-muted hover:text-primary">
                          <CopyIcon />
                        </button>
                      </div>
                      <code className="text-xs font-mono break-all leading-relaxed">{encode(h.bytes, encoding)}</code>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </m.div>
        )}

        {/* VERIFY TAB */}
        {tab === "verify" && (
          <m.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="neu-card p-6 mb-5">
              <label className="text-sm font-medium mb-2 block">Text to Verify</label>
              <textarea
                value={verifyInput}
                onChange={e => { setVerifyInput(e.target.value); setVerifyResult(null); }}
                placeholder="Enter the original text..."
                className="w-full h-24 code-area p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                spellCheck={false}
              />
            </div>
            <div className="neu-card p-6 mb-5">
              <label className="text-sm font-medium mb-2 block">Expected Hash</label>
              <input
                type="text"
                value={verifyHash}
                onChange={e => { setVerifyHash(e.target.value); setVerifyResult(null); }}
                placeholder="Paste the hash to compare against..."
                className="w-full px-4 py-2.5 code-area text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 font-mono"
                spellCheck={false}
              />
              {verifyHash && (
                <p className="text-xs text-muted mt-2">
                  Detected: {detectAlgo(verifyHash) ?? "Unknown"} ({verifyHash.replace(/\s/g, "").length} hex chars)
                </p>
              )}
            </div>
            <button
              onClick={handleVerify}
              disabled={!verifyInput || !verifyHash}
              className="w-full px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed mb-5"
            >
              Verify Hash
            </button>
            {verifyResult && (
              <m.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className={`neu-card p-5 text-center ${verifyResult.match ? "border-2 border-success" : "border-2 border-error"}`}
              >
                <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${verifyResult.match ? "bg-success/10" : "bg-error/10"}`}>
                  {verifyResult.match ? (
                    <svg className="w-6 h-6 text-success" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  ) : (
                    <svg className="w-6 h-6 text-error" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  )}
                </div>
                <p className={`text-lg font-bold ${verifyResult.match ? "text-success" : "text-error"}`}>
                  {verifyResult.match ? "Match!" : "Mismatch"}
                </p>
                <p className="text-xs text-muted mt-1">
                  {verifyResult.algo ? `Algorithm: ${verifyResult.algo}` : "Could not detect algorithm from hash length"}
                </p>
              </m.div>
            )}
          </m.div>
        )}

        {/* BULK TAB */}
        {tab === "bulk" && (
          <m.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="neu-card p-6 mb-5">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Lines to Hash (one per line)</label>
                <select
                  value={bulkAlgo}
                  onChange={e => setBulkAlgo(e.target.value)}
                  className="px-3 py-1.5 text-xs rounded-lg bg-background border border-surface-border focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="MD5">MD5</option>
                  <option value="SHA-1">SHA-1</option>
                  <option value="SHA-256">SHA-256</option>
                  <option value="SHA-512">SHA-512</option>
                </select>
              </div>
              <textarea
                value={bulkInput}
                onChange={e => setBulkInput(e.target.value)}
                placeholder={"Enter multiple values, one per line...\npassword123\nhello@world.com\nsecret_token"}
                className="w-full h-32 code-area p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                spellCheck={false}
              />
            </div>
            <button
              onClick={handleBulk}
              disabled={!bulkInput.trim() || computing}
              className="w-full px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed mb-5"
            >
              {computing ? "Hashing..." : `Hash All Lines (${bulkAlgo})`}
            </button>
            {bulkResults.length > 0 && (
              <div className="neu-card p-5">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-semibold text-muted">{bulkResults.length} Results</h2>
                  <button
                    onClick={() => {
                      const text = bulkResults.map(r => `${r.line}\t${r.hash}`).join("\n");
                      copy(text);
                    }}
                    className="text-xs font-medium text-primary hover:underline"
                  >Copy All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-surface-border">
                        <th className="text-left py-2 pr-3 font-semibold text-muted">#</th>
                        <th className="text-left py-2 pr-3 font-semibold text-muted">Input</th>
                        <th className="text-left py-2 font-semibold text-muted">{bulkAlgo} Hash</th>
                        <th className="w-8" />
                      </tr>
                    </thead>
                    <tbody>
                      {bulkResults.map((r, i) => (
                        <tr key={i} className="border-b border-surface-border/50">
                          <td className="py-2 pr-3 text-muted">{i + 1}</td>
                          <td className="py-2 pr-3 font-mono max-w-[120px] truncate">{r.line}</td>
                          <td className="py-2 font-mono break-all">{r.hash}</td>
                          <td className="py-2">
                            <button onClick={() => copy(r.hash)} className="p-1 rounded hover:bg-surface text-muted hover:text-primary">
                              <CopyIcon />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </m.div>
        )}

        {/* Algorithms info */}
        <div className="mt-14 max-w-4xl mx-auto space-y-12">
          <div>
            <h2 className="text-xl font-semibold tracking-tight mb-4">Algorithms</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: "MD5 (128-bit)", desc: "Fast but no longer cryptographically secure. Still used for checksums and non-security purposes." },
                { title: "SHA-1 (160-bit)", desc: "Deprecated for security use since 2017. Still found in legacy systems and git commits." },
                { title: "SHA-256 (256-bit)", desc: "Part of SHA-2 family. Widely used and considered secure for most applications." },
                { title: "SHA-512 (512-bit)", desc: "Longer output from SHA-2 family. Offers more security margin and can be faster on 64-bit systems." },
              ].map(f => (
                <div key={f.title} className="neu-card-sm p-4">
                  <h3 className="font-semibold text-sm mb-1">{f.title}</h3>
                  <p className="text-xs text-muted">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
