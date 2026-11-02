"use client";

import { useState, useCallback, useEffect } from "react";
import { useToast } from "../../components/toast";
import { ToolPageHeader } from "../../components/tool-page-header";

function md5(input: string): string {
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

  const bytes = new TextEncoder().encode(input);
  const len = bytes.length;
  const bitLen = len * 8;
  const padLen = ((len + 8) >>> 6) + 1;
  const buf = new Uint8Array(padLen * 64);
  buf.set(bytes);
  buf[len] = 0x80;
  const view = new DataView(buf.buffer);
  view.setUint32((padLen * 64) - 8, bitLen >>> 0, true);
  view.setUint32((padLen * 64) - 4, Math.floor(bitLen / 0x100000000), true);

  let a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;

  for (let i = 0; i < padLen * 64; i += 64) {
    const x: number[] = [];
    for (let j = 0; j < 16; j++) x[j] = view.getInt32(i + j * 4, true);
    const aa = a, bb = b, cc = c, dd = d;

    a = md5ff(a, b, c, d, x[0], 7, -680876936); d = md5ff(d, a, b, c, x[1], 12, -389564586);
    c = md5ff(c, d, a, b, x[2], 17, 606105819); b = md5ff(b, c, d, a, x[3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[4], 7, -176418897); d = md5ff(d, a, b, c, x[5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[6], 17, -1473231341); b = md5ff(b, c, d, a, x[7], 22, -45705983);
    a = md5ff(a, b, c, d, x[8], 7, 1770035416); d = md5ff(d, a, b, c, x[9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[10], 17, -42063); b = md5ff(b, c, d, a, x[11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[12], 7, 1804603682); d = md5ff(d, a, b, c, x[13], 12, -40341101);
    c = md5ff(c, d, a, b, x[14], 17, -1502002290); b = md5ff(b, c, d, a, x[15], 22, 1236535329);

    a = md5gg(a, b, c, d, x[1], 5, -165796510); d = md5gg(d, a, b, c, x[6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[11], 14, 643717713); b = md5gg(b, c, d, a, x[0], 20, -373897302);
    a = md5gg(a, b, c, d, x[5], 5, -701558691); d = md5gg(d, a, b, c, x[10], 9, 38016083);
    c = md5gg(c, d, a, b, x[15], 14, -660478335); b = md5gg(b, c, d, a, x[4], 20, -405537848);
    a = md5gg(a, b, c, d, x[9], 5, 568446438); d = md5gg(d, a, b, c, x[14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[3], 14, -187363961); b = md5gg(b, c, d, a, x[8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[13], 5, -1444681467); d = md5gg(d, a, b, c, x[2], 9, -51403784);
    c = md5gg(c, d, a, b, x[7], 14, 1735328473); b = md5gg(b, c, d, a, x[12], 20, -1926607734);

    a = md5hh(a, b, c, d, x[5], 4, -378558); d = md5hh(d, a, b, c, x[8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[11], 16, 1839030562); b = md5hh(b, c, d, a, x[14], 23, -35309556);
    a = md5hh(a, b, c, d, x[1], 4, -1530992060); d = md5hh(d, a, b, c, x[4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[7], 16, -155497632); b = md5hh(b, c, d, a, x[10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[13], 4, 681279174); d = md5hh(d, a, b, c, x[0], 11, -358537222);
    c = md5hh(c, d, a, b, x[3], 16, -722521979); b = md5hh(b, c, d, a, x[6], 23, 76029189);
    a = md5hh(a, b, c, d, x[9], 4, -640364487); d = md5hh(d, a, b, c, x[12], 11, -421815835);
    c = md5hh(c, d, a, b, x[15], 16, 530742520); b = md5hh(b, c, d, a, x[2], 23, -995338651);

    a = md5ii(a, b, c, d, x[0], 6, -198630844); d = md5ii(d, a, b, c, x[7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[14], 15, -1416354905); b = md5ii(b, c, d, a, x[5], 21, -57434055);
    a = md5ii(a, b, c, d, x[12], 6, 1700485571); d = md5ii(d, a, b, c, x[3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[10], 15, -1051523); b = md5ii(b, c, d, a, x[1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[8], 6, 1873313359); d = md5ii(d, a, b, c, x[15], 10, -30611744);
    c = md5ii(c, d, a, b, x[6], 15, -1560198380); b = md5ii(b, c, d, a, x[13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[4], 6, -145523070); d = md5ii(d, a, b, c, x[11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[2], 15, 718787259); b = md5ii(b, c, d, a, x[9], 21, -343485551);

    a = safeAdd(a, aa); b = safeAdd(b, bb); c = safeAdd(c, cc); d = safeAdd(d, dd);
  }

  const hex = (n: number) => {
    let s = "";
    for (let i = 0; i < 4; i++) s += ((n >> (i * 8 + 4)) & 0xf).toString(16) + ((n >> (i * 8)) & 0xf).toString(16);
    return s;
  };
  return hex(a) + hex(b) + hex(c) + hex(d);
}

async function sha(algorithm: string, text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const buffer = await crypto.subtle.digest(algorithm, data);
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

type HashResult = { name: string; value: string };

export default function HashGeneratorPage() {
  const { toast } = useToast();
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<HashResult[]>([]);
  const [computing, setComputing] = useState(false);

  const generateHashes = useCallback(async () => {
    if (!input) {
      setHashes([]);
      return;
    }
    setComputing(true);
    try {
      const [sha1, sha256, sha512] = await Promise.all([
        sha("SHA-1", input),
        sha("SHA-256", input),
        sha("SHA-512", input),
      ]);
      const md5Hash = md5(input);
      setHashes([
        { name: "MD5", value: md5Hash },
        { name: "SHA-1", value: sha1 },
        { name: "SHA-256", value: sha256 },
        { name: "SHA-512", value: sha512 },
      ]);
    } finally {
      setComputing(false);
    }
  }, [input]);

  useEffect(() => {
    const timeout = setTimeout(generateHashes, 300);
    return () => clearTimeout(timeout);
  }, [generateHashes]);

  const copy = useCallback(
    (text: string) => {
      navigator.clipboard.writeText(text).then(() => {
        toast("Copied to clipboard!");
      });
    },
    [toast]
  );

  return (
    <section className="pt-6 sm:pt-8 pb-10 sm:pb-14 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <ToolPageHeader />

        <div className="neu-card p-6 mb-6">
          <label className="text-sm font-medium mb-2 block">Input Text</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or paste text to hash..."
            className="w-full h-32 code-area p-4 text-sm focus:outline-none focus:ring-2 focus:ring-error/30 resize-none"
            spellCheck={false}
          />
          {input && (
            <p className="text-xs text-muted mt-2">
              {new TextEncoder().encode(input).length} bytes
            </p>
          )}
        </div>

        {hashes.length > 0 && (
          <div className="neu-card p-5">
            <h2 className="text-sm font-semibold text-muted mb-3">
              {computing ? "Computing..." : "Hash Results"}
            </h2>
            <div className="space-y-3">
              {hashes.map((h) => (
                <div key={h.name} className="px-3 py-3 rounded-lg bg-background">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-error">
                      {h.name}
                    </span>
                    <button
                      onClick={() => copy(h.value)}
                      className="p-1.5 rounded-lg hover:bg-surface transition-colors text-muted hover:text-error"
                      aria-label={`Copy ${h.name} hash`}
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                  </div>
                  <code className="text-xs font-mono break-all leading-relaxed">
                    {h.value}
                  </code>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-14 max-w-4xl mx-auto space-y-12">
          <div>
            <h2 className="text-xl font-semibold tracking-tight mb-4">Algorithms</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  title: "MD5 (128-bit)",
                  desc: "Fast but no longer cryptographically secure. Still used for checksums and non-security purposes.",
                },
                {
                  title: "SHA-1 (160-bit)",
                  desc: "Deprecated for security use since 2017. Still found in legacy systems and git commits.",
                },
                {
                  title: "SHA-256 (256-bit)",
                  desc: "Part of SHA-2 family. Widely used and considered secure for most applications.",
                },
                {
                  title: "SHA-512 (512-bit)",
                  desc: "Longer output from SHA-2 family. Offers more security margin and can be faster on 64-bit systems.",
                },
              ].map((f) => (
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
