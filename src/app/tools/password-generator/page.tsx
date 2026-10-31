"use client";

import { useState, useCallback, useEffect } from "react";
import { useToast } from "../../components/toast";
import { ToolPageHeader } from "../../components/tool-page-header";

function generatePassword(
  length: number,
  uppercase: boolean,
  lowercase: boolean,
  numbers: boolean,
  symbols: boolean
): string {
  let chars = "";
  if (uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
  if (numbers) chars += "0123456789";
  if (symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

  if (!chars) return "";

  const array = new Uint32Array(length);
  crypto.getRandomValues(array);

  return Array.from(array, (v) => chars[v % chars.length]).join("");
}

function getStrength(
  length: number,
  uppercase: boolean,
  lowercase: boolean,
  numbers: boolean,
  symbols: boolean
): { label: string; color: string; percent: number } {
  let pool = 0;
  if (uppercase) pool += 26;
  if (lowercase) pool += 26;
  if (numbers) pool += 10;
  if (symbols) pool += 26;

  const entropy = pool > 0 ? length * Math.log2(pool) : 0;

  if (entropy < 28) return { label: "Very Weak", color: "bg-error", percent: 15 };
  if (entropy < 36) return { label: "Weak", color: "bg-orange", percent: 30 };
  if (entropy < 60) return { label: "Fair", color: "bg-warning", percent: 50 };
  if (entropy < 80) return { label: "Strong", color: "bg-primary", percent: 75 };
  return { label: "Very Strong", color: "bg-success", percent: 100 };
}

export default function PasswordGeneratorPage() {
  const { toast } = useToast();
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    setPassword(generatePassword(16, true, true, true, true));
  }, []);

  const generate = useCallback(() => {
    const pw = generatePassword(length, uppercase, lowercase, numbers, symbols);
    if (pw) {
      setPassword(pw);
      setHistory((prev) => [pw, ...prev.slice(0, 4)]);
    }
  }, [length, uppercase, lowercase, numbers, symbols]);

  const copy = useCallback(
    (text: string) => {
      navigator.clipboard.writeText(text).then(() => {
        toast("Copied to clipboard!");
      });
    },
    [toast]
  );

  const strength = getStrength(length, uppercase, lowercase, numbers, symbols);
  const noChars = !uppercase && !lowercase && !numbers && !symbols;

  return (
    <section className="pt-6 sm:pt-8 pb-10 sm:pb-14 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <ToolPageHeader />

        <div className="neu-card p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 relative">
              <input
                type="text"
                readOnly
                value={noChars ? "Select at least one character type" : password}
                className="w-full px-4 py-3.5 neu-input text-sm font-mono tracking-wide pr-12 focus:outline-none"
              />
              <button
                onClick={() => copy(password)}
                disabled={noChars}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-background transition-colors disabled:opacity-40"
                aria-label="Copy password"
              >
                <svg
                  className="w-4.5 h-4.5 text-muted"
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
            <button
              onClick={generate}
              disabled={noChars}
              className="px-5 py-3.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Generate
            </button>
          </div>

          {!noChars && (
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-2 rounded-full bg-background overflow-hidden">
                <div
                  className={`h-full rounded-full ${strength.color} transition-all duration-300`}
                  style={{ width: `${strength.percent}%` }}
                />
              </div>
              <span
                className={`text-xs font-semibold ${strength.color.replace(
                  "bg-",
                  "text-"
                )}`}
              >
                {strength.label}
              </span>
            </div>
          )}

          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">
                  Length: {length}
                </label>
              </div>
              <input
                type="range"
                min={4}
                max={64}
                step={1}
                value={length}
                onChange={(e) => {
                  setLength(Number(e.target.value));
                  const pw = generatePassword(
                    Number(e.target.value),
                    uppercase,
                    lowercase,
                    numbers,
                    symbols
                  );
                  if (pw) setPassword(pw);
                }}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs text-muted mt-1">
                <span>4</span>
                <span>64</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Uppercase (A-Z)", value: uppercase, set: setUppercase },
                { label: "Lowercase (a-z)", value: lowercase, set: setLowercase },
                { label: "Numbers (0-9)", value: numbers, set: setNumbers },
                { label: "Symbols (!@#$)", value: symbols, set: setSymbols },
              ].map((opt) => (
                <label
                  key={opt.label}
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${
                    opt.value ? "bg-primary/5" : "bg-background"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={opt.value}
                    onChange={() => {
                      opt.set(!opt.value);
                      const newUpper =
                        opt.label.startsWith("Upper") ? !opt.value : uppercase;
                      const newLower =
                        opt.label.startsWith("Lower") ? !opt.value : lowercase;
                      const newNums =
                        opt.label.startsWith("Num") ? !opt.value : numbers;
                      const newSyms =
                        opt.label.startsWith("Sym") ? !opt.value : symbols;
                      const pw = generatePassword(
                        length,
                        newUpper,
                        newLower,
                        newNums,
                        newSyms
                      );
                      if (pw) setPassword(pw);
                    }}
                    className="w-4 h-4 rounded accent-primary"
                  />
                  <span className="text-sm">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {history.length > 0 && (
          <div className="neu-card p-5">
            <h2 className="text-sm font-semibold mb-3 text-muted">
              Recent Passwords
            </h2>
            <div className="space-y-2">
              {history.map((pw, i) => (
                <div
                  key={`${pw}-${i}`}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background"
                >
                  <code className="flex-1 text-xs font-mono truncate">
                    {pw}
                  </code>
                  <button
                    onClick={() => copy(pw)}
                    className="p-1.5 rounded-lg hover:bg-surface transition-colors text-muted hover:text-primary"
                    aria-label="Copy password"
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
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
