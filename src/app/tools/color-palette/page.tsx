"use client";

import { useState, useMemo } from "react";
import { useToast } from "../../components/toast";

type ExportFormat = "css" | "tailwind" | "hex";

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l * 100];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function generatePalette(hex: string) {
  const [h, s, l] = hexToHsl(hex);
  const steps = [5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 85, 90, 95];
  const shades = steps.map((lightness) => ({
    hex: hslToHex(h, s, lightness),
    label: `${lightness === 50 ? "500 (base)" : (100 - lightness) * 10 < 500 ? String((100 - lightness) * 10) : String((100 - lightness) * 10)}`,
    lightness,
  }));

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

export default function ColorPalettePage() {
  const [color, setColor] = useState("#0ea5e9");
  const [format, setFormat] = useState<ExportFormat>("css");
  const { toast } = useToast();

  const palette = useMemo(() => generatePalette(color), [color]);

  const exportCode = useMemo(() => {
    const shades = palette.shades;
    if (format === "css") {
      return shades.map((s, i) => `--color-${(i + 1) * 100}: ${s.hex};`).join("\n");
    }
    if (format === "tailwind") {
      const obj = shades.map((s, i) => `  ${(i + 1) * 100}: '${s.hex}',`).join("\n");
      return `colors: {\n  brand: {\n${obj}\n  }\n}`;
    }
    return shades.map((s) => s.hex).join("\n");
  }, [palette.shades, format]);

  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    toast(`Copied ${hex}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          Color Palette Generator
        </h1>
        <p className="text-muted text-lg">
          Pick a color, get a full palette with shades, tints, and harmonies.
        </p>
      </div>

      {/* Color Picker */}
      <div className="neu-card p-6 mb-6">
        <div className="flex flex-wrap items-end gap-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Base Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-14 h-14 rounded-xl cursor-pointer border-2 border-surface-border"
              />
              <input
                type="text"
                value={color}
                onChange={(e) => {
                  const v = e.target.value;
                  if (/^#[0-9a-fA-F]{0,6}$/.test(v)) setColor(v);
                }}
                className="neu-input px-3 py-2 text-sm font-mono w-28"
                spellCheck={false}
              />
            </div>
          </div>
          <div
            className="w-32 h-14 rounded-xl border border-surface-border shadow-inner"
            style={{ background: color }}
          />
          <p className="text-sm text-muted">
            HSL: {hexToHsl(color).join(", ")}
          </p>
        </div>
      </div>

      {/* Shades Grid */}
      <div className="neu-card p-6 mb-6">
        <h2 className="text-sm font-semibold mb-4">Shades & Tints</h2>
        <div className="grid grid-cols-5 sm:grid-cols-7 lg:grid-cols-13 gap-2">
          {palette.shades.map((shade) => (
            <button
              key={shade.lightness}
              onClick={() => copyColor(shade.hex)}
              className="group flex flex-col items-center gap-1"
              title={`Click to copy ${shade.hex}`}
            >
              <div
                className="w-full aspect-square rounded-xl border border-surface-border group-hover:scale-110 group-hover:shadow-lg transition-all"
                style={{ background: shade.hex }}
              />
              <span className="text-[10px] font-mono text-muted group-hover:text-foreground transition-colors">
                {shade.hex}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Harmonies */}
      <div className="neu-card p-6 mb-6">
        <h2 className="text-sm font-semibold mb-4">Color Harmonies</h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {palette.harmonies.map((h) => (
            <button
              key={h.label}
              onClick={() => copyColor(h.hex)}
              className="group flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-background transition-colors"
            >
              <div
                className="w-16 h-16 rounded-xl border border-surface-border group-hover:scale-110 transition-transform shadow-sm"
                style={{ background: h.hex }}
              />
              <span className="text-xs font-medium">{h.label}</span>
              <span className="text-[10px] font-mono text-muted">{h.hex}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Export */}
      <div className="neu-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-1 bg-background rounded-lg p-1">
            {(["css", "tailwind", "hex"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFormat(f)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  format === f
                    ? "bg-surface shadow-sm text-primary"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {f === "css" ? "CSS Variables" : f === "tailwind" ? "Tailwind" : "Hex List"}
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(exportCode);
              toast("Palette code copied!");
            }}
            className="neu-btn px-3 py-1.5 text-xs font-medium text-muted hover:text-primary"
          >
            Copy
          </button>
        </div>
        <pre className="code-area p-4 text-sm font-mono whitespace-pre-wrap overflow-auto">
          {exportCode}
        </pre>
      </div>
      {/* SEO Article */}
      <article className="mt-16 max-w-4xl mx-auto space-y-10">
        <section>
          <h2 className="text-2xl font-bold mb-4">Free Online Color Palette Generator</h2>
          <p className="text-muted leading-relaxed mb-3">
            Generate beautiful color palettes from any base color with Zentrify&apos;s free tool.
            Create shades, tints, complementary, analogous, triadic, and split-complementary
            harmonies — then export as CSS custom properties or Tailwind config values.
          </p>
          <p className="text-muted leading-relaxed">
            Perfect for designers building brand palettes, developers setting up design tokens,
            or anyone who needs a consistent color system for their project. Everything runs
            in your browser — no signup, no data collection.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Understanding Color Harmonies</h2>
          <ul className="text-muted space-y-2 list-disc list-inside">
            <li><strong className="text-foreground">Complementary</strong> — colors opposite on the color wheel, creating maximum contrast (e.g., blue &amp; orange)</li>
            <li><strong className="text-foreground">Analogous</strong> — colors adjacent on the wheel, creating smooth, natural-looking palettes</li>
            <li><strong className="text-foreground">Triadic</strong> — three colors evenly spaced 120° apart, vibrant and balanced</li>
            <li><strong className="text-foreground">Split-complementary</strong> — a base color plus two colors adjacent to its complement, softer than pure complementary</li>
            <li><strong className="text-foreground">Shades &amp; Tints</strong> — darker (mixed with black) and lighter (mixed with white) versions of your base color</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="neu-card-sm p-4">
              <h3 className="font-semibold mb-1">Shade &amp; Tint Generator</h3>
              <p className="text-sm text-muted">Generate 10 shades (darker) and 10 tints (lighter) from any color — perfect for building a full color scale.</p>
            </div>
            <div className="neu-card-sm p-4">
              <h3 className="font-semibold mb-1">Color Harmonies</h3>
              <p className="text-sm text-muted">Automatically compute complementary, analogous, triadic, and split-complementary colors from your base.</p>
            </div>
            <div className="neu-card-sm p-4">
              <h3 className="font-semibold mb-1">CSS Export</h3>
              <p className="text-sm text-muted">Export your palette as CSS custom properties ready to paste into your :root declaration.</p>
            </div>
            <div className="neu-card-sm p-4">
              <h3 className="font-semibold mb-1">Tailwind Export</h3>
              <p className="text-sm text-muted">Export as Tailwind color config — paste directly into your tailwind.config.js or theme extend.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use</h2>
          <ol className="text-muted space-y-3 list-decimal list-inside">
            <li><strong className="text-foreground">Pick a base color</strong> — use the color picker or enter a hex code</li>
            <li><strong className="text-foreground">Explore palettes</strong> — see shades, tints, and color harmonies generated automatically</li>
            <li><strong className="text-foreground">Click any swatch</strong> — copies the hex code to your clipboard</li>
            <li><strong className="text-foreground">Choose export format</strong> — switch between CSS and Tailwind output</li>
            <li><strong className="text-foreground">Copy code</strong> — grab the full palette code with one click</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="neu-card-sm p-5">
              <h3 className="font-semibold mb-2">How many colors should a palette have?</h3>
              <p className="text-sm text-muted">A typical design system uses 1-3 brand colors with 8-10 shades each (50-900 scale, like Tailwind). Add a neutral gray scale plus semantic colors for success, warning, and error states.</p>
            </div>
            <div className="neu-card-sm p-5">
              <h3 className="font-semibold mb-2">How do I check color accessibility?</h3>
              <p className="text-sm text-muted">WCAG 2.1 requires a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text. Use darker shades (600-900) for text on light backgrounds, and lighter shades (50-200) for text on dark backgrounds.</p>
            </div>
            <div className="neu-card-sm p-5">
              <h3 className="font-semibold mb-2">Can I use this for Tailwind v4?</h3>
              <p className="text-sm text-muted">Yes! The CSS export works directly with Tailwind v4&apos;s CSS-based theming using @theme and CSS custom properties. The Tailwind config export works with v3 and earlier.</p>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
