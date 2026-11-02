"use client";

import { useState, useMemo, useCallback } from "react";
import { useToast } from "../../components/toast";
import { ToolPageHeader } from "../../components/tool-page-header";

interface ShadowLayer {
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  opacity: number;
  inset: boolean;
}

interface RingConfig {
  width: number;
  color: string;
  opacity: number;
  offsetWidth: number;
  offsetColor: string;
}

type MainTab = "shadow" | "ring";
type ExportFormat = "tailwind" | "css" | "cssvar" | "twconfig" | "react";

const defaultLayer: ShadowLayer = { x: 4, y: 4, blur: 12, spread: 0, color: "#000000", opacity: 0.15, inset: false };
const defaultRing: RingConfig = { width: 2, color: "#7a52b3", opacity: 1, offsetWidth: 2, offsetColor: "#ffffff" };

const presets: { name: string; layers: ShadowLayer[] }[] = [
  { name: "sm", layers: [{ x: 0, y: 1, blur: 2, spread: 0, color: "#000000", opacity: 0.05, inset: false }] },
  { name: "md", layers: [{ x: 0, y: 4, blur: 6, spread: -1, color: "#000000", opacity: 0.1, inset: false }] },
  { name: "lg", layers: [{ x: 0, y: 10, blur: 15, spread: -3, color: "#000000", opacity: 0.1, inset: false }] },
  { name: "xl", layers: [{ x: 0, y: 20, blur: 25, spread: -5, color: "#000000", opacity: 0.1, inset: false }] },
  { name: "2xl", layers: [{ x: 0, y: 25, blur: 50, spread: -12, color: "#000000", opacity: 0.25, inset: false }] },
];

const materialElevations: { name: string; layers: ShadowLayer[] }[] = [
  { name: "e0", layers: [{ x: 0, y: 0, blur: 0, spread: 0, color: "#000000", opacity: 0, inset: false }] },
  { name: "e1", layers: [{ x: 0, y: 1, blur: 3, spread: 0, color: "#000000", opacity: 0.12, inset: false }, { x: 0, y: 1, blur: 2, spread: 0, color: "#000000", opacity: 0.14, inset: false }] },
  { name: "e2", layers: [{ x: 0, y: 1, blur: 5, spread: 0, color: "#000000", opacity: 0.12, inset: false }, { x: 0, y: 2, blur: 2, spread: 0, color: "#000000", opacity: 0.14, inset: false }] },
  { name: "e4", layers: [{ x: 0, y: 2, blur: 4, spread: -1, color: "#000000", opacity: 0.12, inset: false }, { x: 0, y: 4, blur: 5, spread: 0, color: "#000000", opacity: 0.14, inset: false }] },
  { name: "e6", layers: [{ x: 0, y: 3, blur: 5, spread: -1, color: "#000000", opacity: 0.12, inset: false }, { x: 0, y: 6, blur: 10, spread: 0, color: "#000000", opacity: 0.14, inset: false }] },
  { name: "e8", layers: [{ x: 0, y: 5, blur: 5, spread: -3, color: "#000000", opacity: 0.12, inset: false }, { x: 0, y: 8, blur: 10, spread: 1, color: "#000000", opacity: 0.14, inset: false }] },
  { name: "e12", layers: [{ x: 0, y: 7, blur: 8, spread: -4, color: "#000000", opacity: 0.12, inset: false }, { x: 0, y: 12, blur: 17, spread: 2, color: "#000000", opacity: 0.14, inset: false }] },
  { name: "e16", layers: [{ x: 0, y: 8, blur: 10, spread: -5, color: "#000000", opacity: 0.12, inset: false }, { x: 0, y: 16, blur: 24, spread: 2, color: "#000000", opacity: 0.14, inset: false }] },
  { name: "e24", layers: [{ x: 0, y: 11, blur: 15, spread: -7, color: "#000000", opacity: 0.12, inset: false }, { x: 0, y: 24, blur: 38, spread: 3, color: "#000000", opacity: 0.14, inset: false }] },
];

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function layerToCSS(layer: ShadowLayer): string {
  const inset = layer.inset ? "inset " : "";
  return `${inset}${layer.x}px ${layer.y}px ${layer.blur}px ${layer.spread}px ${hexToRgba(layer.color, layer.opacity)}`;
}

function parseBoxShadow(css: string): ShadowLayer[] | null {
  const cleaned = css.replace(/^box-shadow:\s*/i, "").replace(/;$/, "").trim();
  if (!cleaned) return null;
  const parts = cleaned.split(/,(?![^(]*\))/);
  const result: ShadowLayer[] = [];
  for (const part of parts) {
    const trimmed = part.trim();
    const inset = trimmed.startsWith("inset");
    const rest = trimmed.replace(/^inset\s*/, "");
    const nums = rest.match(/-?\d+(\.\d+)?/g);
    if (!nums || nums.length < 2) return null;
    const rgbaMatch = rest.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)/);
    let color = "#000000";
    let opacity = 0.15;
    if (rgbaMatch) {
      const r = parseInt(rgbaMatch[1]).toString(16).padStart(2, "0");
      const g = parseInt(rgbaMatch[2]).toString(16).padStart(2, "0");
      const b = parseInt(rgbaMatch[3]).toString(16).padStart(2, "0");
      color = `#${r}${g}${b}`;
      opacity = rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1;
    }
    result.push({
      x: parseFloat(nums[0]),
      y: parseFloat(nums[1]),
      blur: nums[2] ? parseFloat(nums[2]) : 0,
      spread: nums[3] ? parseFloat(nums[3]) : 0,
      color,
      opacity,
      inset,
    });
  }
  return result.length > 0 ? result : null;
}

export default function TailwindShadowPage() {
  const [mainTab, setMainTab] = useState<MainTab>("shadow");
  const [layers, setLayers] = useState<ShadowLayer[]>([{ ...defaultLayer }]);
  const [ring, setRing] = useState<RingConfig>({ ...defaultRing });
  const [exportFmt, setExportFmt] = useState<ExportFormat>("tailwind");
  const [darkPreview, setDarkPreview] = useState(false);
  const [hoverPreview, setHoverPreview] = useState(false);
  const [importCss, setImportCss] = useState("");
  const [showImport, setShowImport] = useState(false);
  const { toast } = useToast();

  const cssValue = useMemo(() => layers.map(layerToCSS).join(", "), [layers]);

  const hoverLayers = useMemo(
    () =>
      layers.map((l) => ({
        ...l,
        y: Math.round(l.y * 1.5),
        blur: Math.round(l.blur * 1.4),
        spread: l.spread + 2,
        opacity: Math.min(l.opacity * 1.3, 1),
      })),
    [layers]
  );
  const hoverCss = useMemo(() => hoverLayers.map(layerToCSS).join(", "), [hoverLayers]);

  const tailwindClass = `shadow-[${cssValue.replace(/\s+/g, "_")}]`;
  const cssCode = `box-shadow: ${cssValue};`;
  const cssVarCode = `--shadow: ${cssValue};\nbox-shadow: var(--shadow);`;
  const twConfigCode = `// tailwind.config.js → theme.extend\nboxShadow: {\n  custom: '${cssValue}',\n}`;
  const reactStyleCode = `style={{ boxShadow: '${cssValue}' }}`;

  const ringTwClass = useMemo(() => {
    const parts: string[] = [];
    parts.push(`ring-${ring.width}`);
    parts.push(`ring-[${hexToRgba(ring.color, ring.opacity)}]`);
    if (ring.offsetWidth > 0) {
      parts.push(`ring-offset-${ring.offsetWidth}`);
      parts.push(`ring-offset-[${ring.offsetColor}]`);
    }
    return parts.join(" ");
  }, [ring]);

  const ringCssCode = useMemo(() => {
    const lines = [
      `box-shadow: 0 0 0 ${ring.offsetWidth}px ${ring.offsetColor}, 0 0 0 ${ring.offsetWidth + ring.width}px ${hexToRgba(ring.color, ring.opacity)};`,
    ];
    return lines.join("\n");
  }, [ring]);

  const getExportCode = useCallback(() => {
    if (mainTab === "ring") return exportFmt === "css" ? ringCssCode : ringTwClass;
    switch (exportFmt) {
      case "tailwind": return tailwindClass;
      case "css": return cssCode;
      case "cssvar": return cssVarCode;
      case "twconfig": return twConfigCode;
      case "react": return reactStyleCode;
      default: return cssCode;
    }
  }, [mainTab, exportFmt, tailwindClass, cssCode, cssVarCode, twConfigCode, reactStyleCode, ringCssCode, ringTwClass]);

  const handleCopy = useCallback(
    (text: string) => {
      navigator.clipboard.writeText(text);
      toast("Copied to clipboard!");
    },
    [toast]
  );

  const updateLayer = useCallback(
    (index: number, field: keyof ShadowLayer, value: number | string | boolean) => {
      setLayers((prev) => prev.map((l, i) => (i === index ? { ...l, [field]: value } : l)));
    },
    []
  );

  const addLayer = useCallback(() => {
    setLayers((prev) => (prev.length >= 5 ? prev : [...prev, { ...defaultLayer }]));
  }, []);

  const removeLayer = useCallback((index: number) => {
    setLayers((prev) => (prev.length <= 1 ? prev : prev.filter((_, i) => i !== index)));
  }, []);

  const applyPreset = useCallback((p: { layers: ShadowLayer[] }) => {
    setLayers(p.layers.map((l) => ({ ...l })));
  }, []);

  const handleImport = useCallback(() => {
    const parsed = parseBoxShadow(importCss);
    if (parsed) {
      setLayers(parsed);
      setShowImport(false);
      setImportCss("");
      toast("Shadow imported!");
    } else {
      toast("Could not parse CSS", "error");
    }
  }, [importCss, toast]);

  const exportFormats: { key: ExportFormat; label: string }[] =
    mainTab === "ring"
      ? [
          { key: "tailwind", label: "Tailwind" },
          { key: "css", label: "CSS" },
        ]
      : [
          { key: "tailwind", label: "Tailwind" },
          { key: "css", label: "CSS" },
          { key: "cssvar", label: "CSS Var" },
          { key: "twconfig", label: "TW Config" },
          { key: "react", label: "React" },
        ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-10 sm:pb-14">
      <ToolPageHeader title="Tailwind Shadow Generator" />

      {/* Main tabs */}
      <div className="flex gap-1 neu-input p-1 w-fit mb-6">
        {(["shadow", "ring"] as MainTab[]).map((t) => (
          <button
            key={t}
            onClick={() => { setMainTab(t); setExportFmt("tailwind"); }}
            className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${mainTab === t ? "bg-primary text-white shadow-sm" : "text-muted hover:text-primary"}`}
          >
            {t === "shadow" ? "Box Shadow" : "Ring / Outline"}
          </button>
        ))}
      </div>

      {mainTab === "shadow" ? (
        <>
          {/* Presets */}
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="text-sm font-medium text-muted self-center mr-1">Tailwind:</span>
            {presets.map((p) => (
              <button key={p.name} onClick={() => applyPreset(p)} className="neu-btn px-3 py-1.5 text-xs font-medium text-cat hover:text-primary">{p.name}</button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-sm font-medium text-muted self-center mr-1">Material:</span>
            {materialElevations.map((p) => (
              <button key={p.name} onClick={() => applyPreset(p)} className="neu-btn px-3 py-1.5 text-xs font-medium text-cat hover:text-primary">{p.name}</button>
            ))}
          </div>

          {/* Import toggle */}
          <div className="mb-6">
            <button onClick={() => setShowImport(!showImport)} className="text-xs font-medium text-primary hover:underline">
              {showImport ? "Hide Import" : "Import CSS"}
            </button>
            {showImport && (
              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  value={importCss}
                  onChange={(e) => setImportCss(e.target.value)}
                  placeholder="box-shadow: 0 4px 6px rgba(0,0,0,0.1);"
                  className="flex-1 neu-input px-3 py-2 text-sm font-mono"
                />
                <button onClick={handleImport} className="neu-btn px-4 py-2 text-sm font-medium text-primary">Parse</button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Preview */}
            <div className="neu-card p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-cat">Preview</span>
                <div className="flex gap-3">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" checked={darkPreview} onChange={(e) => setDarkPreview(e.target.checked)} className="accent-orange w-3.5 h-3.5" />
                    <span className="text-xs font-medium text-muted">Dark</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" checked={hoverPreview} onChange={(e) => setHoverPreview(e.target.checked)} className="accent-orange w-3.5 h-3.5" />
                    <span className="text-xs font-medium text-muted">Hover</span>
                  </label>
                </div>
              </div>
              <div className={`rounded-2xl h-72 flex items-center justify-center transition-colors ${darkPreview ? "bg-[#1a1a2e]" : "bg-background"}`}>
                <div
                  className="w-48 h-32 rounded-2xl flex items-center justify-center border border-surface-border transition-all duration-300"
                  style={{
                    boxShadow: hoverPreview ? hoverCss : cssValue,
                    background: darkPreview ? "#252545" : "var(--surface)",
                    transform: hoverPreview ? "scale(1.04)" : "scale(1)",
                  }}
                >
                  <span className={`text-sm ${darkPreview ? "text-gray-400" : "text-muted"}`}>
                    {hoverPreview ? "Hover State" : "Shadow Preview"}
                  </span>
                </div>
              </div>
              {hoverPreview && (
                <pre className="mt-3 code-area p-3 text-xs font-mono whitespace-pre-wrap break-all">
                  {`.element:hover {\n  box-shadow: ${hoverCss};\n  transform: scale(1.04);\n}`}
                </pre>
              )}
            </div>

            {/* Controls */}
            <div className="neu-card p-6 overflow-y-auto max-h-[520px]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium">Shadow Layers</span>
                {layers.length < 5 && (
                  <button onClick={addLayer} className="neu-btn px-3 py-1.5 text-xs font-medium text-primary">+ Add Layer</button>
                )}
              </div>
              <div className="space-y-6">
                {layers.map((layer, i) => (
                  <div key={i} className="neu-card-sm p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-cat">Layer {i + 1}</span>
                      {layers.length > 1 && (
                        <button onClick={() => removeLayer(i)} className="text-error text-xs hover:text-error/80">Remove</button>
                      )}
                    </div>
                    <div className="space-y-3">
                      <RangeControl label="X Offset" value={layer.x} min={-50} max={50} unit="px" onChange={(v) => updateLayer(i, "x", v)} />
                      <RangeControl label="Y Offset" value={layer.y} min={-50} max={50} unit="px" onChange={(v) => updateLayer(i, "y", v)} />
                      <RangeControl label="Blur" value={layer.blur} min={0} max={100} unit="px" onChange={(v) => updateLayer(i, "blur", v)} />
                      <RangeControl label="Spread" value={layer.spread} min={-50} max={50} unit="px" onChange={(v) => updateLayer(i, "spread", v)} />
                      <RangeControl label="Opacity" value={layer.opacity} min={0} max={1} step={0.05} onChange={(v) => updateLayer(i, "opacity", v)} />
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-medium">Color</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={layer.color}
                            onChange={(e) => updateLayer(i, "color", e.target.value)}
                            className="w-8 h-7 rounded-lg cursor-pointer border border-surface-border"
                          />
                          <span className="text-xs font-mono text-muted">{layer.color}</span>
                        </div>
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={layer.inset} onChange={(e) => updateLayer(i, "inset", e.target.checked)} className="accent-orange w-4 h-4" />
                        <span className="text-xs font-medium">Inset</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Comparison */}
          <div className="neu-card p-6 mb-6">
            <span className="text-sm font-medium text-cat mb-4 block">Compare Presets</span>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {presets.map((p) => {
                const pCss = p.layers.map(layerToCSS).join(", ");
                return (
                  <button key={p.name} onClick={() => applyPreset(p)} className="group flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-background transition-colors">
                    <div
                      className="w-full aspect-[4/3] bg-surface rounded-xl border border-surface-border flex items-center justify-center group-hover:scale-105 transition-transform"
                      style={{ boxShadow: pCss }}
                    >
                      <span className="text-xs text-muted">{p.name}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        /* Ring / Outline tab */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="neu-card p-6">
            <span className="text-sm font-medium text-cat mb-4 block">Preview</span>
            <div className={`rounded-2xl h-72 flex items-center justify-center transition-colors ${darkPreview ? "bg-[#1a1a2e]" : "bg-background"}`}>
              <div
                className="w-48 h-32 rounded-2xl flex items-center justify-center transition-all"
                style={{
                  background: darkPreview ? "#252545" : "var(--surface)",
                  boxShadow: `0 0 0 ${ring.offsetWidth}px ${ring.offsetColor}, 0 0 0 ${ring.offsetWidth + ring.width}px ${hexToRgba(ring.color, ring.opacity)}`,
                }}
              >
                <span className={`text-sm ${darkPreview ? "text-gray-400" : "text-muted"}`}>Ring Preview</span>
              </div>
            </div>
            <label className="flex items-center gap-1.5 cursor-pointer mt-3">
              <input type="checkbox" checked={darkPreview} onChange={(e) => setDarkPreview(e.target.checked)} className="accent-orange w-3.5 h-3.5" />
              <span className="text-xs font-medium text-muted">Dark background</span>
            </label>
          </div>
          <div className="neu-card p-6">
            <span className="text-sm font-medium mb-4 block">Ring Controls</span>
            <div className="space-y-4">
              <RangeControl label="Ring Width" value={ring.width} min={0} max={8} unit="px" onChange={(v) => setRing((r) => ({ ...r, width: v }))} />
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium">Ring Color</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={ring.color} onChange={(e) => setRing((r) => ({ ...r, color: e.target.value }))} className="w-8 h-7 rounded-lg cursor-pointer border border-surface-border" />
                  <span className="text-xs font-mono text-muted">{ring.color}</span>
                </div>
              </div>
              <RangeControl label="Ring Opacity" value={ring.opacity} min={0} max={1} step={0.05} onChange={(v) => setRing((r) => ({ ...r, opacity: v }))} />
              <RangeControl label="Offset Width" value={ring.offsetWidth} min={0} max={8} unit="px" onChange={(v) => setRing((r) => ({ ...r, offsetWidth: v }))} />
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium">Offset Color</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={ring.offsetColor} onChange={(e) => setRing((r) => ({ ...r, offsetColor: e.target.value }))} className="w-8 h-7 rounded-lg cursor-pointer border border-surface-border" />
                  <span className="text-xs font-mono text-muted">{ring.offsetColor}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Output */}
      <div className="neu-card p-6">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <div className="flex gap-1 neu-input p-1 flex-wrap">
            {exportFormats.map((f) => (
              <button
                key={f.key}
                onClick={() => setExportFmt(f.key)}
                className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-all ${exportFmt === f.key ? "bg-primary text-white shadow-sm" : "text-muted hover:text-primary"}`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <button onClick={() => handleCopy(getExportCode())} className="neu-btn px-4 py-1.5 text-xs font-medium text-cat hover:text-primary">Copy</button>
        </div>
        <pre className="code-area p-4 text-sm font-mono whitespace-pre-wrap overflow-auto break-all">
          {getExportCode()}
        </pre>
      </div>
    </div>
  );
}

function RangeControl({
  label,
  value,
  min,
  max,
  step = 1,
  unit = "",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="text-xs font-medium">{label}</label>
        <span className="text-xs font-mono text-cat font-bold">{value}{unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-orange"
      />
    </div>
  );
}
