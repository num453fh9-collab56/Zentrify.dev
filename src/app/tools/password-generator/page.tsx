"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useToast } from "../../components/toast";
import { ToolPageHeader } from "../../components/tool-page-header";

const AMBIGUOUS = "lI1O0";

const WORD_LIST = [
  "apple","brave","cedar","dance","eagle","flame","grape","hover","ivory","joker",
  "karma","lemon","maple","noble","ocean","pearl","quest","raven","solar","torch",
  "urban","vivid","water","xenon","yacht","zebra","amber","blaze","coral","drift",
  "ember","frost","glyph","hazel","index","jewel","knack","lunar","mirth","nexus",
  "orbit","plume","quilt","ridge","storm","tidal","unity","vault","woven","oxide",
  "azure","brisk","charm","delta","ethic","flora","grain","haven","irony","jade",
  "kiosk","lyric","metro","niche","optic","prism","quota","relay","spire","trace",
  "ultra","vigor","whirl","pixel","yield","zonal","acorn","blade","crypt","depot",
  "epoch","fibre","gleam","hoist","inlet","jumbo","kneel","latch","mossy","nerve",
  "onset","plank","quirk","roast","shale","theta","umbra","venom","wrist","axiom",
  "birch","clasp","dwell","elbow","flask","grief","hitch","ivory","joist","knead",
  "lodge","mango","nudge","olive","patch","reign","sweep","trout","usher","valve",
  "wheat","proxy","youth","agile","boost","crane","diver","exert","forge","glint",
  "haste","impel","joint","krypton","lemon","midst","novel","overt","plaza","query",
  "realm","scope","trend","unify","vocal","wager","xeric","yearn","zilch","alpha",
  "brine","chunk","drape","flint","grove","hyper","infer","joust","kelp","limbo",
  "mocha","ninety","outdo","prone","rusty","sigma","tulip","undid","viper","windy",
  "adobe","bliss","cider","dowel","elfin","fudge","ghost","haven","igloo","jazzy",
  "kayak","llama","moose","nacho","otter","panda","quail","robin","sloth","tiger",
  "urial","vixen","waltz","xerus","yak","zebu","adept","bumpy","crisp","dusty",
];

const CONSONANTS = "bcdfghjklmnpqrstvwxyz";
const VOWELS = "aeiou";

type Mode = "password" | "passphrase" | "pronounceable";
type Tab = "generate" | "analyze" | "bulk";

function generatePassword(
  length: number,
  uppercase: boolean,
  lowercase: boolean,
  numbers: boolean,
  symbols: boolean,
  excludeAmbiguous: boolean,
  customChars: string
): string {
  let chars = "";
  if (uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
  if (numbers) chars += "0123456789";
  if (symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
  if (customChars) chars += customChars;
  if (excludeAmbiguous) {
    chars = chars.split("").filter((c) => !AMBIGUOUS.includes(c)).join("");
  }
  if (!chars) return "";
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (v) => chars[v % chars.length]).join("");
}

function generatePassphrase(
  wordCount: number,
  separator: string,
  capitalize: boolean,
  addNumber: boolean
): string {
  const array = new Uint32Array(wordCount);
  crypto.getRandomValues(array);
  let words = Array.from(array, (v) => {
    const w = WORD_LIST[v % WORD_LIST.length];
    return capitalize ? w.charAt(0).toUpperCase() + w.slice(1) : w;
  });
  let result = words.join(separator);
  if (addNumber) {
    const num = new Uint32Array(1);
    crypto.getRandomValues(num);
    result += separator + (num[0] % 900 + 100);
  }
  return result;
}

function generatePronounceable(length: number): string {
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  let result = "";
  for (let i = 0; i < length; i++) {
    const pool = i % 2 === 0 ? CONSONANTS : VOWELS;
    result += pool[array[i] % pool.length];
  }
  return result;
}

function getStrength(pw: string): { label: string; color: string; percent: number; entropy: number; crackTime: string } {
  if (!pw) return { label: "None", color: "bg-muted", percent: 0, entropy: 0, crackTime: "-" };

  let pool = 0;
  if (/[a-z]/.test(pw)) pool += 26;
  if (/[A-Z]/.test(pw)) pool += 26;
  if (/[0-9]/.test(pw)) pool += 10;
  if (/[^a-zA-Z0-9]/.test(pw)) pool += 32;

  const entropy = pool > 0 ? pw.length * Math.log2(pool) : 0;

  const guessesPerSec = 1e10;
  const totalGuesses = Math.pow(2, entropy);
  const seconds = totalGuesses / guessesPerSec;

  let crackTime: string;
  if (seconds < 1) crackTime = "Instant";
  else if (seconds < 60) crackTime = `${Math.round(seconds)} seconds`;
  else if (seconds < 3600) crackTime = `${Math.round(seconds / 60)} minutes`;
  else if (seconds < 86400) crackTime = `${Math.round(seconds / 3600)} hours`;
  else if (seconds < 31536000) crackTime = `${Math.round(seconds / 86400)} days`;
  else if (seconds < 31536000 * 1000) crackTime = `${Math.round(seconds / 31536000)} years`;
  else if (seconds < 31536000 * 1e6) crackTime = `${(seconds / 31536000 / 1000).toFixed(0)}k years`;
  else if (seconds < 31536000 * 1e9) crackTime = `${(seconds / 31536000 / 1e6).toFixed(0)}M years`;
  else crackTime = "Centuries+";

  if (entropy < 28) return { label: "Very Weak", color: "bg-error", percent: 15, entropy, crackTime };
  if (entropy < 36) return { label: "Weak", color: "bg-orange", percent: 30, entropy, crackTime };
  if (entropy < 60) return { label: "Fair", color: "bg-warning", percent: 50, entropy, crackTime };
  if (entropy < 80) return { label: "Strong", color: "bg-primary", percent: 75, entropy, crackTime };
  return { label: "Very Strong", color: "bg-success", percent: 100, entropy, crackTime };
}

function detectPatterns(pw: string): string[] {
  const patterns: string[] = [];
  if (/^[a-z]+$/i.test(pw)) patterns.push("Letters only — add numbers/symbols");
  if (/^[0-9]+$/.test(pw)) patterns.push("Digits only — easily brute-forced");
  if (/(.)\1{2,}/.test(pw)) patterns.push("Repeated characters (aaa, 111)");
  if (/(?:abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/i.test(pw))
    patterns.push("Sequential letters (abc, xyz)");
  if (/(?:012|123|234|345|456|567|678|789|890)/.test(pw))
    patterns.push("Sequential numbers (123, 789)");
  if (/(?:qwert|asdf|zxcv|yuiop|hjkl|bnm)/i.test(pw))
    patterns.push("Keyboard walk pattern (qwerty, asdf)");
  if (/(?:19|20)\d{2}/.test(pw)) patterns.push("Contains a year (possible date)");
  if (pw.length < 8) patterns.push("Shorter than 8 characters");
  if (patterns.length === 0) patterns.push("No common patterns detected");
  return patterns;
}

const CopyIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

export default function PasswordGeneratorPage() {
  const { toast } = useToast();
  const [tab, setTab] = useState<Tab>("generate");
  const [mode, setMode] = useState<Mode>("password");

  // Password options
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [customChars, setCustomChars] = useState("");

  // Passphrase options
  const [wordCount, setWordCount] = useState(4);
  const [separator, setSeparator] = useState("-");
  const [capitalize, setCapitalize] = useState(true);
  const [addNumber, setAddNumber] = useState(true);

  // Pronounceable
  const [pronLength, setPronLength] = useState(12);

  // State
  const [password, setPassword] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  // Analyze
  const [analyzeInput, setAnalyzeInput] = useState("");

  // Bulk
  const [bulkCount, setBulkCount] = useState(10);
  const [bulkList, setBulkList] = useState<string[]>([]);

  useEffect(() => {
    setPassword(generatePassword(16, true, true, true, true, false, "")); // eslint-disable-line react-hooks/set-state-in-effect
  }, []);

  const generate = useCallback(() => {
    let pw = "";
    if (mode === "password") {
      pw = generatePassword(length, uppercase, lowercase, numbers, symbols, excludeAmbiguous, customChars);
    } else if (mode === "passphrase") {
      pw = generatePassphrase(wordCount, separator, capitalize, addNumber);
    } else {
      pw = generatePronounceable(pronLength);
    }
    if (pw) {
      setPassword(pw);
      setHistory((prev) => [pw, ...prev.slice(0, 9)]);
    }
  }, [mode, length, uppercase, lowercase, numbers, symbols, excludeAmbiguous, customChars, wordCount, separator, capitalize, addNumber, pronLength]);

  const generateBulk = useCallback(() => {
    const list: string[] = [];
    for (let i = 0; i < bulkCount; i++) {
      if (mode === "password") {
        list.push(generatePassword(length, uppercase, lowercase, numbers, symbols, excludeAmbiguous, customChars));
      } else if (mode === "passphrase") {
        list.push(generatePassphrase(wordCount, separator, capitalize, addNumber));
      } else {
        list.push(generatePronounceable(pronLength));
      }
    }
    setBulkList(list);
  }, [mode, bulkCount, length, uppercase, lowercase, numbers, symbols, excludeAmbiguous, customChars, wordCount, separator, capitalize, addNumber, pronLength]);

  const copy = useCallback(
    (text: string) => {
      navigator.clipboard.writeText(text).then(() => toast("Copied to clipboard!"));
    },
    [toast]
  );

  const strength = useMemo(() => getStrength(password), [password]);
  const analyzeStrength = useMemo(() => getStrength(analyzeInput), [analyzeInput]);
  const analyzePatterns = useMemo(() => (analyzeInput ? detectPatterns(analyzeInput) : []), [analyzeInput]);

  const noChars = mode === "password" && !uppercase && !lowercase && !numbers && !symbols && !customChars;

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "generate", label: "Generate", icon: "M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" },
    { id: "analyze", label: "Analyze", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
    { id: "bulk", label: "Bulk", icon: "M4 6h16M4 10h16M4 14h16M4 18h16" },
  ];

  return (
    <section className="pt-6 sm:pt-8 pb-10 sm:pb-14 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <ToolPageHeader />

        {/* Tabs */}
        <div className="flex gap-1 p-1 mb-6 rounded-xl bg-background">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                tab === t.id ? "bg-surface shadow-sm text-primary" : "text-muted hover:text-foreground"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={t.icon} />
              </svg>
              {t.label}
            </button>
          ))}
        </div>

        {/* Generate Tab */}
        {tab === "generate" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            {/* Mode selector */}
            <div className="flex gap-2 mb-4">
              {(["password", "passphrase", "pronounceable"] as Mode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    mode === m ? "bg-primary text-white" : "bg-background text-muted hover:text-foreground"
                  }`}
                >
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </button>
              ))}
            </div>

            {/* Output */}
            <div className="neu-card p-6 mb-4">
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
                    <CopyIcon />
                  </button>
                </div>
                <button
                  onClick={generate}
                  disabled={noChars}
                  className="px-5 py-3.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Generate
                </button>
              </div>

              {/* Strength bar */}
              {!noChars && password && (
                <div className="mb-4">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="flex-1 h-2 rounded-full bg-background overflow-hidden">
                      <div className={`h-full rounded-full ${strength.color} transition-all duration-300`} style={{ width: `${strength.percent}%` }} />
                    </div>
                    <span className={`text-xs font-semibold ${strength.color.replace("bg-", "text-")}`}>{strength.label}</span>
                  </div>
                  <div className="flex gap-4 text-xs text-muted">
                    <span>Entropy: {strength.entropy.toFixed(1)} bits</span>
                    <span>Crack time: {strength.crackTime}</span>
                  </div>
                </div>
              )}

              {/* Password mode options */}
              {mode === "password" && (
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium">Length: {length}</label>
                    </div>
                    <input type="range" min={4} max={128} step={1} value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-full accent-primary" />
                    <div className="flex justify-between text-xs text-muted mt-1"><span>4</span><span>128</span></div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Uppercase (A-Z)", value: uppercase, set: setUppercase },
                      { label: "Lowercase (a-z)", value: lowercase, set: setLowercase },
                      { label: "Numbers (0-9)", value: numbers, set: setNumbers },
                      { label: "Symbols (!@#$)", value: symbols, set: setSymbols },
                      { label: "Exclude ambiguous", value: excludeAmbiguous, set: setExcludeAmbiguous },
                    ].map((opt) => (
                      <label key={opt.label} className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${opt.value ? "bg-primary/5" : "bg-background"}`}>
                        <input type="checkbox" checked={opt.value} onChange={() => opt.set(!opt.value)} className="w-4 h-4 rounded accent-primary" />
                        <span className="text-sm">{opt.label}</span>
                      </label>
                    ))}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-muted uppercase tracking-wider mb-1.5 block">Custom characters</label>
                    <input
                      type="text"
                      value={customChars}
                      onChange={(e) => setCustomChars(e.target.value)}
                      placeholder="Add extra characters to include…"
                      className="w-full px-4 py-2.5 neu-input text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                </div>
              )}

              {/* Passphrase mode options */}
              {mode === "passphrase" && (
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium">Words: {wordCount}</label>
                    </div>
                    <input type="range" min={3} max={8} step={1} value={wordCount} onChange={(e) => setWordCount(Number(e.target.value))} className="w-full accent-primary" />
                    <div className="flex justify-between text-xs text-muted mt-1"><span>3</span><span>8</span></div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-muted uppercase tracking-wider mb-1.5 block">Separator</label>
                    <div className="flex gap-2">
                      {["-", ".", "_", " "].map((s) => (
                        <button key={s} onClick={() => setSeparator(s)} className={`px-4 py-2 rounded-lg text-sm font-mono transition-colors ${separator === s ? "bg-primary text-white" : "bg-background text-muted hover:text-foreground"}`}>
                          {s === " " ? "space" : s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <label className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${capitalize ? "bg-primary/5" : "bg-background"}`}>
                      <input type="checkbox" checked={capitalize} onChange={() => setCapitalize(!capitalize)} className="w-4 h-4 rounded accent-primary" />
                      <span className="text-sm">Capitalize words</span>
                    </label>
                    <label className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${addNumber ? "bg-primary/5" : "bg-background"}`}>
                      <input type="checkbox" checked={addNumber} onChange={() => setAddNumber(!addNumber)} className="w-4 h-4 rounded accent-primary" />
                      <span className="text-sm">Add number</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Pronounceable options */}
              {mode === "pronounceable" && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium">Length: {pronLength}</label>
                  </div>
                  <input type="range" min={6} max={32} step={1} value={pronLength} onChange={(e) => setPronLength(Number(e.target.value))} className="w-full accent-primary" />
                  <div className="flex justify-between text-xs text-muted mt-1"><span>6</span><span>32</span></div>
                </div>
              )}
            </div>

            {/* History */}
            {history.length > 0 && (
              <div className="neu-card p-5">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-semibold text-muted">History ({history.length})</h2>
                  <button onClick={() => setHistory([])} className="text-xs text-muted hover:text-error transition-colors">Clear</button>
                </div>
                <div className="space-y-2">
                  {history.map((pw, i) => (
                    <div key={`${pw}-${i}`} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background">
                      <code className="flex-1 text-xs font-mono truncate">{pw}</code>
                      <button onClick={() => copy(pw)} className="p-1.5 rounded-lg hover:bg-surface transition-colors text-muted hover:text-primary" aria-label="Copy">
                        <CopyIcon />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Analyze Tab */}
        {tab === "analyze" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="neu-card p-6">
              <h2 className="text-sm font-semibold mb-3">Password Strength Analyzer</h2>
              <p className="text-xs text-muted mb-4">Paste any password to analyze its strength, entropy, and detect common patterns.</p>
              <input
                type="text"
                value={analyzeInput}
                onChange={(e) => setAnalyzeInput(e.target.value)}
                placeholder="Paste a password to analyze…"
                className="w-full px-4 py-3 neu-input text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/30 mb-4"
              />

              {analyzeInput && (
                <div className="space-y-4">
                  {/* Strength bar */}
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <div className="flex-1 h-2.5 rounded-full bg-background overflow-hidden">
                        <div className={`h-full rounded-full ${analyzeStrength.color} transition-all duration-300`} style={{ width: `${analyzeStrength.percent}%` }} />
                      </div>
                      <span className={`text-sm font-bold ${analyzeStrength.color.replace("bg-", "text-")}`}>{analyzeStrength.label}</span>
                    </div>
                  </div>

                  {/* Stats grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { label: "Length", value: analyzeInput.length },
                      { label: "Entropy", value: `${analyzeStrength.entropy.toFixed(1)} bits` },
                      { label: "Crack time", value: analyzeStrength.crackTime },
                      { label: "Unique chars", value: new Set(analyzeInput).size },
                    ].map((s) => (
                      <div key={s.label} className="p-3 rounded-xl bg-background text-center">
                        <p className="text-xs text-muted mb-0.5">{s.label}</p>
                        <p className="text-sm font-bold">{s.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Char composition */}
                  <div className="p-4 rounded-xl bg-background">
                    <p className="text-xs font-semibold text-muted mb-2">Character composition</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <span>Uppercase: {(analyzeInput.match(/[A-Z]/g) || []).length}</span>
                      <span>Lowercase: {(analyzeInput.match(/[a-z]/g) || []).length}</span>
                      <span>Numbers: {(analyzeInput.match(/[0-9]/g) || []).length}</span>
                      <span>Symbols: {(analyzeInput.match(/[^a-zA-Z0-9]/g) || []).length}</span>
                    </div>
                  </div>

                  {/* Patterns */}
                  <div className="p-4 rounded-xl bg-background">
                    <p className="text-xs font-semibold text-muted mb-2">Pattern detection</p>
                    <div className="space-y-1.5">
                      {analyzePatterns.map((p, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs">
                          <span className={p.includes("No common") ? "text-success" : "text-warning"}>
                            {p.includes("No common") ? "✓" : "⚠"}
                          </span>
                          <span>{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Bulk Tab */}
        {tab === "bulk" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="neu-card p-6 mb-4">
              <h2 className="text-sm font-semibold mb-3">Bulk Generator</h2>

              {/* Mode selector in bulk too */}
              <div className="flex gap-2 mb-4">
                {(["password", "passphrase", "pronounceable"] as Mode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      mode === m ? "bg-primary text-white" : "bg-background text-muted hover:text-foreground"
                    }`}
                  >
                    {m.charAt(0).toUpperCase() + m.slice(1)}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 mb-4">
                <label className="text-sm font-medium">Count:</label>
                <div className="flex gap-2">
                  {[5, 10, 20, 50].map((n) => (
                    <button
                      key={n}
                      onClick={() => setBulkCount(n)}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                        bulkCount === n ? "bg-primary text-white" : "bg-background text-muted hover:text-foreground"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                <button
                  onClick={generateBulk}
                  disabled={noChars}
                  className="ml-auto px-5 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-40"
                >
                  Generate {bulkCount}
                </button>
              </div>

              {bulkList.length > 0 && (
                <>
                  <div className="flex justify-end mb-2">
                    <button
                      onClick={() => copy(bulkList.join("\n"))}
                      className="text-xs text-primary hover:text-primary-dark transition-colors font-medium"
                    >
                      Copy All
                    </button>
                  </div>
                  <div className="space-y-1.5 max-h-[400px] overflow-y-auto">
                    {bulkList.map((pw, i) => (
                      <div key={`${pw}-${i}`} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background">
                        <span className="text-xs text-muted w-6">{i + 1}.</span>
                        <code className="flex-1 text-xs font-mono truncate">{pw}</code>
                        <button onClick={() => copy(pw)} className="p-1 rounded-lg hover:bg-surface transition-colors text-muted hover:text-primary" aria-label="Copy">
                          <CopyIcon />
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
