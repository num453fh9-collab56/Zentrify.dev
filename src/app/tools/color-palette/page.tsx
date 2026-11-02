"use client";

import { useState, useMemo, useCallback, useRef } from "react";
import { useToast } from "../../components/toast";
import { ToolPageHeader } from "../../components/tool-page-header";

type ExportFormat = "css" | "tailwind" | "hex";
type InputMode = "hex" | "rgb" | "hsl";
type Tab = "palette" | "contrast" | "image" | "saved" | "blindness";

/* ── Color math ── */

function clamp(v: number, lo: number, hi: number) { return Math.max(lo, Math.min(hi, v)); }

function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map(v => clamp(Math.round(v), 0, 255).toString(16).padStart(2, "0")).join("");
}

function hexToHsl(hex: string): [number, number, number] {
  const [r1, g1, b1] = hexToRgb(hex).map(v => v / 255);
  const max = Math.max(r1, g1, b1), min = Math.min(r1, g1, b1);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, Math.round(l * 100)];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r1) h = ((g1 - b1) / d + (g1 < b1 ? 6 : 0)) / 6;
  else if (max === g1) h = ((b1 - r1) / d + 2) / 6;
  else h = ((r1 - g1) / d + 4) / 6;
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToHex(h: number, s: number, l: number): string {
  const s1 = s / 100, l1 = l / 100;
  const a = s1 * Math.min(l1, 1 - l1);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const c = l1 - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * c).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  return hexToHsl(rgbToHex(r, g, b));
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  return hexToRgb(hslToHex(h, s, l));
}

/* ── WCAG contrast ── */

function luminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map(c => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(hex1: string, hex2: string): number {
  const l1 = luminance(hex1);
  const l2 = luminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function wcagGrade(ratio: number): { aa: boolean; aaLarge: boolean; aaa: boolean; aaaLarge: boolean } {
  return { aa: ratio >= 4.5, aaLarge: ratio >= 3, aaa: ratio >= 7, aaaLarge: ratio >= 4.5 };
}

/* ── Color blindness simulation matrices ── */

const cbMatrices: Record<string, number[]> = {
  protanopia:   [0.567,0.433,0, 0.558,0.442,0, 0,0.242,0.758],
  deuteranopia: [0.625,0.375,0, 0.7,0.3,0, 0,0.3,0.7],
  tritanopia:   [0.95,0.05,0, 0,0.433,0.567, 0,0.475,0.525],
};

function simulateCB(hex: string, type: string): string {
  const [r, g, b] = hexToRgb(hex);
  const m = cbMatrices[type];
  if (!m) return hex;
  return rgbToHex(
    m[0] * r + m[1] * g + m[2] * b,
    m[3] * r + m[4] * g + m[5] * b,
    m[6] * r + m[7] * g + m[8] * b,
  );
}

/* ── Palette generation ── */

function generatePalette(hex: string) {
  const [h, s] = hexToHsl(hex);
  const steps = [5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 85, 90, 95];
  const shades = steps.map(lightness => ({
    hex: hslToHex(h, s, lightness),
    label: `${(100 - lightness) * 10}`,
    lightness,
  }));

  const [, , l] = hexToHsl(hex);
  const complementary = hslToHex((h + 180) % 360, s, l);
  const analogous1 = hslToHex((h + 30) % 360, s, l);
  const analogous2 = hslToHex((h + 330) % 360, s, l);
  const triadic1 = hslToHex((h + 120) % 360, s, l);
  const triadic2 = hslToHex((h + 240) % 360, s, l);

  return {
    shades,
    harmonies: [
      { label: "Complementary", hex: complementary },
      { label: "Analogous 1", hex: analogous1 },
      { label: "Analogous 2", hex: analogous2 },
      { label: "Triadic 1", hex: triadic1 },
      { label: "Triadic 2", hex: triadic2 },
    ],
  };
}

/* ── Image color extraction ── */

function extractColorsFromImage(img: HTMLImageElement, count: number): string[] {
  const canvas = document.createElement("canvas");
  const size = 64;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return [];
  ctx.drawImage(img, 0, 0, size, size);
  const data = ctx.getImageData(0, 0, size, size).data;

  const buckets = new Map<string, { r: number; g: number; b: number; count: number }>();
  for (let i = 0; i < data.length; i += 4) {
    const r = Math.round(data[i] / 32) * 32;
    const g = Math.round(data[i + 1] / 32) * 32;
    const b = Math.round(data[i + 2] / 32) * 32;
    const key = `${r},${g},${b}`;
    const entry = buckets.get(key);
    if (entry) { entry.r += data[i]; entry.g += data[i + 1]; entry.b += data[i + 2]; entry.count++; }
    else buckets.set(key, { r: data[i], g: data[i + 1], b: data[i + 2], count: 1 });
  }

  return Array.from(buckets.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, count)
    .map(b => rgbToHex(Math.round(b.r / b.count), Math.round(b.g / b.count), Math.round(b.b / b.count)));
}

/* ── Saved palettes (localStorage) ── */

interface SavedPalette { name: string; color: string; timestamp: number }

function loadSaved(): SavedPalette[] {
  try { return JSON.parse(localStorage.getItem("zentrify-palettes") || "[]"); }
  catch { return []; }
}

function savePalettes(palettes: SavedPalette[]) {
  try { localStorage.setItem("zentrify-palettes", JSON.stringify(palettes)); } catch {}
}

/* ── Badge component ── */

function Badge({ pass, label }: { pass: boolean; label: string }) {
  return (
    <span className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-bold ${pass ? "bg-success/15 text-success" : "bg-error/15 text-error"}`}>
      {label}
    </span>
  );
}

/* ── Main component ── */

export default function ColorPalettePage() {
  const [color, setColor] = useState("#0ea5e9");
  const [format, setFormat] = useState<ExportFormat>("css");
  const [inputMode, setInputMode] = useState<InputMode>("hex");
  const [tab, setTab] = useState<Tab>("palette");
  const { toast } = useToast();

  const [rgb, setRgb] = useState<[number, number, number]>(() => hexToRgb("#0ea5e9"));
  const [hsl, setHsl] = useState<[number, number, number]>(() => hexToHsl("#0ea5e9"));

  const [fgColor, setFgColor] = useState("#ffffff");
  const [bgColor, setBgColor] = useState("#0ea5e9");

  const [imageColors, setImageColors] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const [saved, setSaved] = useState<SavedPalette[]>(() => loadSaved());
  const [saveName, setSaveName] = useState("");

  const palette = useMemo(() => generatePalette(color), [color]);

  const setFromHex = useCallback((hex: string) => {
    setColor(hex);
    setRgb(hexToRgb(hex));
    setHsl(hexToHsl(hex));
  }, []);

  const setFromRgb = useCallback((r: number, g: number, b: number) => {
    const hex = rgbToHex(r, g, b);
    setColor(hex);
    setRgb([r, g, b]);
    setHsl(rgbToHsl(r, g, b));
  }, []);

  const setFromHsl = useCallback((h: number, s: number, l: number) => {
    const hex = hslToHex(h, s, l);
    setColor(hex);
    setRgb(hslToRgb(h, s, l));
    setHsl([h, s, l]);
  }, []);

  const exportCode = useMemo(() => {
    const shades = palette.shades;
    if (format === "css") return shades.map((s, i) => `--color-${(i + 1) * 100}: ${s.hex};`).join("\n");
    if (format === "tailwind") {
      const obj = shades.map((s, i) => `  ${(i + 1) * 100}: '${s.hex}',`).join("\n");
      return `colors: {\n  brand: {\n${obj}\n  }\n}`;
    }
    return shades.map(s => s.hex).join("\n");
  }, [palette.shades, format]);

  const copyColor = useCallback((hex: string) => {
    navigator.clipboard.writeText(hex);
    toast(`Copied ${hex}`);
  }, [toast]);

  const handleImageUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const src = reader.result as string;
      setImagePreview(src);
      const img = new Image();
      img.onload = () => setImageColors(extractColorsFromImage(img, 8));
      img.src = src;
    };
    reader.readAsDataURL(file);
  }, []);

  const handleSave = useCallback(() => {
    const name = saveName.trim() || `Palette ${saved.length + 1}`;
    const updated = [{ name, color, timestamp: Date.now() }, ...saved].slice(0, 20);
    setSaved(updated);
    savePalettes(updated);
    setSaveName("");
    toast(`Saved "${name}"`);
  }, [saveName, color, saved, toast]);

  const handleDeleteSaved = useCallback((idx: number) => {
    const updated = saved.filter((_, i) => i !== idx);
    setSaved(updated);
    savePalettes(updated);
  }, [saved]);

  const ratio = useMemo(() => contrastRatio(fgColor, bgColor), [fgColor, bgColor]);
  const grade = useMemo(() => wcagGrade(ratio), [ratio]);

  const tabs: { id: Tab; label: string }[] = [
    { id: "palette", label: "Palette" },
    { id: "contrast", label: "Contrast" },
    { id: "blindness", label: "Blindness" },
    { id: "image", label: "From Image" },
    { id: "saved", label: `Saved (${saved.length})` },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-10 sm:pb-14">
      <ToolPageHeader title="Color Palette Generator" />

      {/* Color Picker with modes */}
      <div className="neu-card p-6 mb-6">
        <div className="flex flex-wrap items-start gap-6">
          <div>
            <label className="block text-sm font-medium mb-1.5">Base Color</label>
            <div className="flex items-center gap-3 mb-3">
              <input type="color" value={color} onChange={e => setFromHex(e.target.value)} className="w-14 h-14 rounded-xl cursor-pointer border-2 border-surface-border" />
              <div className="w-32 h-14 rounded-xl border border-surface-border shadow-inner" style={{ background: color }} />
            </div>
            {/* Input mode tabs */}
            <div className="flex gap-1 bg-background rounded-lg p-1 mb-3">
              {(["hex", "rgb", "hsl"] as const).map(m => (
                <button key={m} onClick={() => setInputMode(m)}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${inputMode === m ? "bg-surface shadow-sm text-primary" : "text-muted hover:text-foreground"}`}>
                  {m.toUpperCase()}
                </button>
              ))}
            </div>
            {inputMode === "hex" && (
              <input type="text" value={color} onChange={e => { const v = e.target.value; if (/^#[0-9a-fA-F]{0,6}$/.test(v)) setFromHex(v.length === 7 ? v : color); if (/^#[0-9a-fA-F]{6}$/.test(v)) setFromHex(v); }} onBlur={() => { if (!/^#[0-9a-fA-F]{6}$/.test(color)) setFromHex("#0ea5e9"); }}
                className="neu-input px-3 py-2 text-sm font-mono w-32" spellCheck={false} placeholder="#0ea5e9" />
            )}
            {inputMode === "rgb" && (
              <div className="space-y-2 w-48">
                {(["R", "G", "B"] as const).map((ch, i) => (
                  <label key={ch} className="flex items-center gap-2 text-xs font-mono">
                    <span className="w-4 text-muted">{ch}</span>
                    <input type="range" min={0} max={255} value={rgb[i]} onChange={e => { const v = [...rgb] as [number, number, number]; v[i] = Number(e.target.value); setFromRgb(...v); }} className="flex-1 accent-primary" />
                    <span className="w-8 text-right text-muted">{rgb[i]}</span>
                  </label>
                ))}
              </div>
            )}
            {inputMode === "hsl" && (
              <div className="space-y-2 w-48">
                {([["H", 0, 360], ["S", 0, 100], ["L", 0, 100]] as const).map(([ch, min, max], i) => (
                  <label key={ch} className="flex items-center gap-2 text-xs font-mono">
                    <span className="w-4 text-muted">{ch}</span>
                    <input type="range" min={min} max={max} value={hsl[i]} onChange={e => { const v = [...hsl] as [number, number, number]; v[i] = Number(e.target.value); setFromHsl(...v); }} className="flex-1 accent-primary" />
                    <span className="w-8 text-right text-muted">{hsl[i]}{i === 0 ? "°" : "%"}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
          <div className="text-xs text-muted space-y-1 pt-6">
            <p><strong>HEX:</strong> {color}</p>
            <p><strong>RGB:</strong> {rgb.join(", ")}</p>
            <p><strong>HSL:</strong> {hsl[0]}°, {hsl[1]}%, {hsl[2]}%</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-background rounded-lg p-1 mb-6 overflow-x-auto">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${tab === t.id ? "bg-surface shadow-sm text-primary" : "text-muted hover:text-foreground"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Palette tab ── */}
      {tab === "palette" && (
        <>
          <div className="neu-card p-6 mb-6">
            <h2 className="text-sm font-semibold mb-4">Shades & Tints</h2>
            <div className="grid grid-cols-5 sm:grid-cols-7 lg:grid-cols-13 gap-2">
              {palette.shades.map(shade => {
                const vsWhite = contrastRatio(shade.hex, "#ffffff");
                const vsBlack = contrastRatio(shade.hex, "#000000");
                return (
                  <button key={shade.lightness} onClick={() => copyColor(shade.hex)} className="group flex flex-col items-center gap-1" title={`${shade.hex} — AA on white: ${vsWhite >= 4.5 ? "✓" : "✗"} | AA on black: ${vsBlack >= 4.5 ? "✓" : "✗"}`}>
                    <div className="w-full aspect-square rounded-xl border border-surface-border group-hover:scale-110 group-hover:shadow-lg transition-all relative" style={{ background: shade.hex }}>
                      <div className="absolute bottom-0.5 right-0.5 flex gap-px">
                        {vsWhite >= 4.5 && <span className="w-1.5 h-1.5 rounded-full bg-white border border-white/50" />}
                        {vsBlack >= 4.5 && <span className="w-1.5 h-1.5 rounded-full bg-black border border-black/50" />}
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-muted group-hover:text-foreground transition-colors">{shade.hex}</span>
                  </button>
                );
              })}
            </div>
            <p className="text-[10px] text-muted mt-3">● White dot = passes AA on white &nbsp; ● Black dot = passes AA on black</p>
          </div>

          <div className="neu-card p-6 mb-6">
            <h2 className="text-sm font-semibold mb-4">Color Harmonies</h2>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {palette.harmonies.map(h => (
                <button key={h.label} onClick={() => copyColor(h.hex)} className="group flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-background transition-colors">
                  <div className="w-16 h-16 rounded-xl border border-surface-border group-hover:scale-110 transition-transform shadow-sm" style={{ background: h.hex }} />
                  <span className="text-xs font-medium">{h.label}</span>
                  <span className="text-[10px] font-mono text-muted">{h.hex}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="neu-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-1 bg-background rounded-lg p-1">
                {(["css", "tailwind", "hex"] as const).map(f => (
                  <button key={f} onClick={() => setFormat(f)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${format === f ? "bg-surface shadow-sm text-primary" : "text-muted hover:text-foreground"}`}>
                    {f === "css" ? "CSS Variables" : f === "tailwind" ? "Tailwind" : "Hex List"}
                  </button>
                ))}
              </div>
              <button onClick={() => { navigator.clipboard.writeText(exportCode); toast("Palette code copied!"); }}
                className="neu-btn px-3 py-1.5 text-xs font-medium text-muted hover:text-primary">Copy</button>
            </div>
            <pre className="code-area p-4 text-sm font-mono whitespace-pre-wrap overflow-auto">{exportCode}</pre>
          </div>
        </>
      )}

      {/* ── Contrast checker tab ── */}
      {tab === "contrast" && (
        <div className="neu-card p-6">
          <h2 className="text-sm font-semibold mb-4">WCAG Contrast Checker</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">Foreground (text)</label>
              <div className="flex items-center gap-2">
                <input type="color" value={fgColor} onChange={e => setFgColor(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer border border-surface-border" />
                <input type="text" value={fgColor} onChange={e => { if (/^#[0-9a-fA-F]{6}$/.test(e.target.value)) setFgColor(e.target.value); }}
                  className="neu-input px-3 py-2 text-sm font-mono w-28" spellCheck={false} />
                <button onClick={() => setFgColor(color)} className="text-xs text-primary hover:underline">Use base</button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">Background</label>
              <div className="flex items-center gap-2">
                <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer border border-surface-border" />
                <input type="text" value={bgColor} onChange={e => { if (/^#[0-9a-fA-F]{6}$/.test(e.target.value)) setBgColor(e.target.value); }}
                  className="neu-input px-3 py-2 text-sm font-mono w-28" spellCheck={false} />
                <button onClick={() => setBgColor(color)} className="text-xs text-primary hover:underline">Use base</button>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="rounded-xl p-8 mb-6 border border-surface-border text-center" style={{ background: bgColor, color: fgColor }}>
            <p className="text-2xl font-bold mb-1">Sample Heading</p>
            <p className="text-base">Regular body text at this contrast ratio.</p>
            <p className="text-sm mt-1">Small text — needs higher contrast.</p>
          </div>

          {/* Ratio & grades */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="text-3xl font-bold">{ratio.toFixed(2)}<span className="text-sm text-muted font-normal ml-1">: 1</span></div>
            <div className="flex flex-wrap gap-2">
              <Badge pass={grade.aa} label="AA Normal" />
              <Badge pass={grade.aaLarge} label="AA Large" />
              <Badge pass={grade.aaa} label="AAA Normal" />
              <Badge pass={grade.aaaLarge} label="AAA Large" />
            </div>
            <button onClick={() => { setFgColor(bgColor); setBgColor(fgColor); }} className="ml-auto neu-btn px-3 py-1.5 text-xs">Swap</button>
          </div>
        </div>
      )}

      {/* ── Color blindness tab ── */}
      {tab === "blindness" && (
        <div className="neu-card p-6">
          <h2 className="text-sm font-semibold mb-4">Color Blindness Simulation</h2>
          <p className="text-xs text-muted mb-6">See how your palette appears under common types of color vision deficiency.</p>
          {(["protanopia", "deuteranopia", "tritanopia"] as const).map(type => (
            <div key={type} className="mb-6">
              <h3 className="text-xs font-semibold capitalize mb-2">{type} <span className="text-muted font-normal">({type === "protanopia" ? "no red" : type === "deuteranopia" ? "no green" : "no blue"})</span></h3>
              <div className="flex gap-1.5 flex-wrap">
                {palette.shades.map(s => {
                  const sim = simulateCB(s.hex, type);
                  return (
                    <button key={s.lightness} onClick={() => copyColor(sim)} title={`Original: ${s.hex} → ${sim}`}
                      className="group flex flex-col items-center gap-0.5">
                      <div className="flex">
                        <div className="w-6 h-8 rounded-l-lg border border-surface-border" style={{ background: s.hex }} />
                        <div className="w-6 h-8 rounded-r-lg border border-surface-border border-l-0" style={{ background: sim }} />
                      </div>
                      <span className="text-[8px] font-mono text-muted">{sim}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          <div className="mb-2">
            <h3 className="text-xs font-semibold mb-2">Harmonies</h3>
            {(["protanopia", "deuteranopia", "tritanopia"] as const).map(type => (
              <div key={type} className="flex gap-2 items-center mb-2">
                <span className="text-[10px] text-muted w-20 capitalize">{type}</span>
                <div className="flex gap-1.5">
                  {palette.harmonies.map(h => {
                    const sim = simulateCB(h.hex, type);
                    return (
                      <button key={h.label} onClick={() => copyColor(sim)} title={`${h.label}: ${h.hex} → ${sim}`}>
                        <div className="flex">
                          <div className="w-5 h-6 rounded-l border border-surface-border" style={{ background: h.hex }} />
                          <div className="w-5 h-6 rounded-r border border-surface-border border-l-0" style={{ background: sim }} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── From image tab ── */}
      {tab === "image" && (
        <div className="neu-card p-6">
          <h2 className="text-sm font-semibold mb-4">Extract Palette from Image</h2>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => { if (e.target.files?.[0]) handleImageUpload(e.target.files[0]); }} />
          <div className="border-2 border-dashed border-surface-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/40 transition-colors mb-6"
            onClick={() => fileRef.current?.click()}
            onDragOver={e => { e.preventDefault(); e.stopPropagation(); }}
            onDrop={e => { e.preventDefault(); e.stopPropagation(); if (e.dataTransfer.files[0]) handleImageUpload(e.dataTransfer.files[0]); }}>
            {imagePreview ? (
              <div className="space-y-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imagePreview} alt="Uploaded" className="max-h-40 mx-auto rounded-lg object-contain" />
                <p className="text-xs text-muted">Click or drop to replace</p>
              </div>
            ) : (
              <div>
                <svg className="w-10 h-10 mx-auto text-muted mb-2" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                </svg>
                <p className="text-sm text-muted">Drop an image here or click to upload</p>
                <p className="text-xs text-muted mt-1">Dominant colors will be extracted</p>
              </div>
            )}
          </div>
          {imageColors.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold mb-3">Extracted Colors ({imageColors.length})</h3>
              <div className="flex flex-wrap gap-3">
                {imageColors.map((c, i) => (
                  <button key={i} className="group flex flex-col items-center gap-1.5" onClick={() => { copyColor(c); setFromHex(c); }}>
                    <div className="w-14 h-14 rounded-xl border border-surface-border group-hover:scale-110 transition-transform shadow-sm" style={{ background: c }} />
                    <span className="text-[10px] font-mono text-muted">{c}</span>
                    <span className="text-[9px] text-primary opacity-0 group-hover:opacity-100 transition-opacity">Use as base</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Saved palettes tab ── */}
      {tab === "saved" && (
        <div className="neu-card p-6">
          <h2 className="text-sm font-semibold mb-4">Saved Palettes</h2>
          <div className="flex gap-2 mb-6">
            <input type="text" value={saveName} onChange={e => setSaveName(e.target.value)} placeholder="Palette name (optional)"
              className="neu-input px-3 py-2 text-sm flex-1" onKeyDown={e => { if (e.key === "Enter") handleSave(); }} />
            <button onClick={handleSave}
              className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-colors">
              Save Current
            </button>
          </div>
          {saved.length === 0 ? (
            <p className="text-sm text-muted text-center py-6">No saved palettes yet. Click &quot;Save Current&quot; to save your first palette.</p>
          ) : (
            <div className="space-y-3">
              {saved.map((p, i) => {
                const pal = generatePalette(p.color);
                return (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-background hover:bg-surface transition-colors group">
                    <div className="flex gap-0.5 flex-shrink-0">
                      {pal.shades.filter((_, j) => j % 3 === 0).map(s => (
                        <div key={s.lightness} className="w-5 h-8 first:rounded-l-lg last:rounded-r-lg" style={{ background: s.hex }} />
                      ))}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{p.name}</p>
                      <p className="text-[10px] text-muted">{p.color} · {new Date(p.timestamp).toLocaleDateString()}</p>
                    </div>
                    <button onClick={() => setFromHex(p.color)} className="text-xs text-primary hover:underline">Load</button>
                    <button onClick={() => handleDeleteSaved(i)} className="text-xs text-error hover:underline opacity-0 group-hover:opacity-100 transition-opacity">Delete</button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      <div className="mt-14 max-w-4xl mx-auto space-y-12">
        <section>
          <h2 className="text-xl font-semibold tracking-tight mb-4">Understanding Color Harmonies</h2>
          <ul className="text-muted space-y-2 list-disc list-inside">
            <li><strong className="text-foreground">Complementary</strong> — colors opposite on the color wheel, creating maximum contrast</li>
            <li><strong className="text-foreground">Analogous</strong> — colors adjacent on the wheel, creating smooth, natural-looking palettes</li>
            <li><strong className="text-foreground">Triadic</strong> — three colors evenly spaced 120° apart, vibrant and balanced</li>
            <li><strong className="text-foreground">Shades & Tints</strong> — darker and lighter versions of your base color</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
