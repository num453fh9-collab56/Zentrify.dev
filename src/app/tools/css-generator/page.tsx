"use client";

import { useState, useMemo, useCallback } from "react";
import { useToast } from "../../components/toast";
import { ToolPageHeader } from "../../components/tool-page-header";

type Tab = "glass" | "gradient" | "shadow" | "textShadow" | "radius";

interface GradientStop { color: string; position: number }
interface ShadowLayer { x: number; y: number; blur: number; spread: number; color: string; opacity: number; inset: boolean }
interface TextShadowState { x: number; y: number; blur: number; color: string; opacity: number }
interface RadiusState { tl: number; tr: number; br: number; bl: number; linked: boolean }

const SHADOW_PRESETS: { name: string; layers: ShadowLayer[] }[] = [
  { name: "Subtle", layers: [{ x: 0, y: 1, blur: 3, spread: 0, color: "#000000", opacity: 0.12, inset: false }] },
  { name: "Medium", layers: [{ x: 0, y: 4, blur: 6, spread: -1, color: "#000000", opacity: 0.1, inset: false }, { x: 0, y: 2, blur: 4, spread: -2, color: "#000000", opacity: 0.1, inset: false }] },
  { name: "Elevated", layers: [{ x: 0, y: 10, blur: 15, spread: -3, color: "#000000", opacity: 0.1, inset: false }, { x: 0, y: 4, blur: 6, spread: -4, color: "#000000", opacity: 0.1, inset: false }] },
  { name: "Material 1", layers: [{ x: 0, y: 2, blur: 1, spread: -1, color: "#000000", opacity: 0.1, inset: false }, { x: 0, y: 1, blur: 1, spread: 0, color: "#000000", opacity: 0.06, inset: false }] },
  { name: "Material 3", layers: [{ x: 0, y: 10, blur: 20, spread: 0, color: "#000000", opacity: 0.15, inset: false }, { x: 0, y: 3, blur: 6, spread: 0, color: "#000000", opacity: 0.1, inset: false }] },
  { name: "Material 5", layers: [{ x: 0, y: 20, blur: 40, spread: 0, color: "#000000", opacity: 0.2, inset: false }, { x: 0, y: 8, blur: 16, spread: 0, color: "#000000", opacity: 0.14, inset: false }] },
  { name: "Inner Glow", layers: [{ x: 0, y: 0, blur: 20, spread: 5, color: "#7a52b3", opacity: 0.3, inset: true }] },
  { name: "Neon", layers: [{ x: 0, y: 0, blur: 10, spread: 0, color: "#0ea5e9", opacity: 0.5, inset: false }, { x: 0, y: 0, blur: 40, spread: 0, color: "#0ea5e9", opacity: 0.3, inset: false }] },
];

const RADIUS_PRESETS: { name: string; tl: number; tr: number; br: number; bl: number }[] = [
  { name: "None", tl: 0, tr: 0, br: 0, bl: 0 },
  { name: "Small", tl: 4, tr: 4, br: 4, bl: 4 },
  { name: "Medium", tl: 8, tr: 8, br: 8, bl: 8 },
  { name: "Large", tl: 16, tr: 16, br: 16, bl: 16 },
  { name: "XL", tl: 24, tr: 24, br: 24, bl: 24 },
  { name: "Pill", tl: 9999, tr: 9999, br: 9999, bl: 9999 },
  { name: "Blob", tl: 30, tr: 60, br: 30, bl: 60 },
  { name: "Ticket", tl: 16, tr: 16, br: 0, bl: 0 },
];

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function shadowLayerCSS(l: ShadowLayer) {
  return `${l.inset ? "inset " : ""}${l.x}px ${l.y}px ${l.blur}px ${l.spread}px ${hexToRgba(l.color, l.opacity)}`;
}

function shadowTailwind(layers: ShadowLayer[]): string {
  if (layers.length === 1 && !layers[0].inset) {
    const l = layers[0];
    if (l.x === 0 && l.y === 1 && l.blur <= 3 && l.spread <= 1) return "shadow-sm";
    if (l.x === 0 && l.y === 1 && l.blur <= 4) return "shadow";
    if (l.x === 0 && l.y === 4 && l.blur <= 8) return "shadow-md";
    if (l.x === 0 && l.y === 10 && l.blur <= 16) return "shadow-lg";
    if (l.x === 0 && l.y === 20 && l.blur <= 28) return "shadow-xl";
    if (l.x === 0 && l.y === 25 && l.blur <= 50) return "shadow-2xl";
  }
  return "shadow-[custom]";
}

function radiusTailwind(r: RadiusState): string {
  if (r.tl === r.tr && r.tr === r.br && r.br === r.bl) {
    const v = r.tl;
    if (v === 0) return "rounded-none";
    if (v === 2) return "rounded-sm";
    if (v === 4) return "rounded";
    if (v === 6) return "rounded-md";
    if (v === 8) return "rounded-lg";
    if (v === 12) return "rounded-xl";
    if (v === 16) return "rounded-2xl";
    if (v === 24) return "rounded-3xl";
    if (v >= 9999) return "rounded-full";
    return `rounded-[${v}px]`;
  }
  return `rounded-[${r.tl}px_${r.tr}px_${r.br}px_${r.bl}px]`;
}

export default function CssGeneratorPage() {
  const [tab, setTab] = useState<Tab>("glass");
  const { toast } = useToast();

  // Glass
  const [blur, setBlur] = useState(12);
  const [opacity, setOpacity] = useState(0.25);
  const [borderOpacity, setBorderOpacity] = useState(0.2);
  const [tintColor, setTintColor] = useState("#ffffff");

  // Gradient
  const [gradientType, setGradientType] = useState<"linear" | "radial">("linear");
  const [angle, setAngle] = useState(135);
  const [stops, setStops] = useState<GradientStop[]>([
    { color: "#0ea5e9", position: 0 },
    { color: "#8b5cf6", position: 100 },
  ]);

  // Box Shadow
  const [shadowLayers, setShadowLayers] = useState<ShadowLayer[]>([
    { x: 0, y: 4, blur: 6, spread: -1, color: "#000000", opacity: 0.1, inset: false },
  ]);

  // Text Shadow
  const [textShadow, setTextShadow] = useState<TextShadowState>({ x: 2, y: 2, blur: 4, color: "#000000", opacity: 0.3 });

  // Border Radius
  const [radius, setRadius] = useState<RadiusState>({ tl: 16, tr: 16, br: 16, bl: 16, linked: true });

  // --- CSS outputs ---
  const glassCSS = useMemo(() =>
    `background: ${hexToRgba(tintColor, opacity)};\nbackdrop-filter: blur(${blur}px);\n-webkit-backdrop-filter: blur(${blur}px);\nborder: 1px solid ${hexToRgba(tintColor, borderOpacity)};\nborder-radius: 16px;`,
    [tintColor, opacity, blur, borderOpacity]
  );

  const gradientStopsStr = stops.map((s) => `${s.color} ${s.position}%`).join(", ");
  const gradientValue = gradientType === "linear"
    ? `linear-gradient(${angle}deg, ${gradientStopsStr})`
    : `radial-gradient(circle, ${gradientStopsStr})`;
  const gradientCSS = `background: ${gradientValue};`;

  const shadowCSS = useMemo(() => {
    const val = shadowLayers.map(shadowLayerCSS).join(",\n    ");
    return `box-shadow: ${val};`;
  }, [shadowLayers]);

  const textShadowCSS = useMemo(() =>
    `text-shadow: ${textShadow.x}px ${textShadow.y}px ${textShadow.blur}px ${hexToRgba(textShadow.color, textShadow.opacity)};`,
    [textShadow]
  );

  const radiusCSS = useMemo(() => {
    if (radius.tl === radius.tr && radius.tr === radius.br && radius.br === radius.bl)
      return `border-radius: ${radius.tl}px;`;
    return `border-radius: ${radius.tl}px ${radius.tr}px ${radius.br}px ${radius.bl}px;`;
  }, [radius]);

  const cssMap: Record<Tab, string> = { glass: glassCSS, gradient: gradientCSS, shadow: shadowCSS, textShadow: textShadowCSS, radius: radiusCSS };
  const currentCSS = cssMap[tab];

  const tailwindHint = useMemo(() => {
    if (tab === "shadow") return shadowTailwind(shadowLayers);
    if (tab === "radius") return radiusTailwind(radius);
    if (tab === "glass") return `bg-white/${Math.round(opacity * 100)} backdrop-blur-[${blur}px]`;
    return "";
  }, [tab, shadowLayers, radius, opacity, blur]);

  const allCSS = useMemo(() =>
    [glassCSS, gradientCSS, shadowCSS, textShadowCSS, radiusCSS].join("\n\n"),
    [glassCSS, gradientCSS, shadowCSS, textShadowCSS, radiusCSS]
  );

  const handleCopy = useCallback(() => { navigator.clipboard.writeText(currentCSS); toast("CSS copied!"); }, [currentCSS, toast]);
  const handleCopyAll = useCallback(() => { navigator.clipboard.writeText(allCSS); toast("All CSS copied!"); }, [allCSS, toast]);

  // Shadow helpers
  const updateShadowLayer = (i: number, field: keyof ShadowLayer, value: number | string | boolean) => {
    setShadowLayers((prev) => prev.map((l, idx) => idx === i ? { ...l, [field]: value } : l));
  };
  const addShadowLayer = () => { if (shadowLayers.length < 4) setShadowLayers((prev) => [...prev, { x: 0, y: 4, blur: 8, spread: 0, color: "#000000", opacity: 0.1, inset: false }]); };
  const removeShadowLayer = (i: number) => { if (shadowLayers.length > 1) setShadowLayers((prev) => prev.filter((_, idx) => idx !== i)); };

  // Gradient helpers
  const updateStop = (index: number, field: keyof GradientStop, value: string | number) => {
    setStops(stops.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  };
  const addStop = () => { if (stops.length < 4) setStops([...stops, { color: "#22c55e", position: Math.min(stops[stops.length - 1].position + 20, 100) }]); };
  const removeStop = (i: number) => { if (stops.length > 2) setStops(stops.filter((_, idx) => idx !== i)); };

  // Radius helpers
  const setRadiusCorner = (corner: "tl" | "tr" | "br" | "bl", v: number) => {
    if (radius.linked) setRadius({ ...radius, tl: v, tr: v, br: v, bl: v });
    else setRadius({ ...radius, [corner]: v });
  };

  // --- Live preview styles ---
  const shadowStyle = { boxShadow: shadowLayers.map(shadowLayerCSS).join(", ") };
  const textShadowStyle = { textShadow: `${textShadow.x}px ${textShadow.y}px ${textShadow.blur}px ${hexToRgba(textShadow.color, textShadow.opacity)}` };
  const radiusStyle = { borderRadius: `${radius.tl}px ${radius.tr}px ${radius.br}px ${radius.bl}px` };
  const glassStyle = {
    background: hexToRgba(tintColor, opacity),
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    border: `1px solid ${hexToRgba(tintColor, borderOpacity)}`,
    borderRadius: "16px",
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: "glass", label: "Glass" },
    { id: "gradient", label: "Gradient" },
    { id: "shadow", label: "Box Shadow" },
    { id: "textShadow", label: "Text Shadow" },
    { id: "radius", label: "Radius" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-10 sm:pb-14">
      <ToolPageHeader title="CSS Generator" />

      {/* Tab bar */}
      <div className="flex gap-1 neu-input p-1 mb-6 overflow-x-auto">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex-1 min-w-[80px] px-3 py-2 text-sm font-medium rounded-xl transition-all whitespace-nowrap ${tab === t.id ? "bg-primary text-white shadow-sm" : "text-muted hover:text-primary"}`}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Preview */}
        <div className="neu-card p-6">
          <span className="text-sm font-medium text-cat mb-4 block">Preview</span>
          <div className="rounded-2xl h-72 flex items-center justify-center relative overflow-hidden"
            style={{ background: gradientValue }}>
            {tab === "glass" && (
              <div style={glassStyle} className="w-64 h-40 flex flex-col items-center justify-center text-center px-6">
                <div className="text-lg font-semibold mb-1">Glass Card</div>
                <div className="text-sm opacity-70">Frosted glass effect with backdrop blur</div>
              </div>
            )}
            {tab === "gradient" && (
              <div className="text-white text-center">
                <div className="text-lg font-semibold mb-1">Gradient Preview</div>
                <div className="text-sm opacity-80">{gradientType} gradient</div>
              </div>
            )}
            {tab === "shadow" && (
              <div className="w-48 h-32 bg-surface rounded-2xl flex items-center justify-center" style={shadowStyle}>
                <span className="text-sm font-medium">Shadow Card</span>
              </div>
            )}
            {tab === "textShadow" && (
              <div className="text-white text-center" style={textShadowStyle}>
                <div className="text-3xl font-bold mb-1">Shadow Text</div>
                <div className="text-lg">Preview your effect</div>
              </div>
            )}
            {tab === "radius" && (
              <div className="w-48 h-32 bg-surface border-2 border-primary/40 flex items-center justify-center" style={radiusStyle}>
                <span className="text-sm font-medium">Radius Preview</span>
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="neu-card p-6 overflow-y-auto max-h-[28rem]">
          {/* Glass controls */}
          {tab === "glass" && (
            <div className="space-y-5">
              <SliderControl label="Blur" value={blur} min={0} max={30} unit="px" onChange={setBlur} />
              <SliderControl label="Opacity" value={opacity} min={0} max={1} step={0.05} onChange={setOpacity} />
              <SliderControl label="Border Opacity" value={borderOpacity} min={0} max={1} step={0.05} onChange={setBorderOpacity} />
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Tint Color</label>
                <input type="color" value={tintColor} onChange={(e) => setTintColor(e.target.value)}
                  className="w-10 h-8 rounded-lg cursor-pointer border border-surface-border" />
              </div>
            </div>
          )}

          {/* Gradient controls */}
          {tab === "gradient" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Type</label>
                <div className="flex gap-1 neu-input p-1">
                  {(["linear", "radial"] as const).map((t) => (
                    <button key={t} onClick={() => setGradientType(t)}
                      className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${gradientType === t ? "bg-primary text-white" : "text-muted"}`}>
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              {gradientType === "linear" && <SliderControl label="Angle" value={angle} min={0} max={360} unit="°" onChange={setAngle} />}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Color Stops</span>
                  {stops.length < 4 && <button onClick={addStop} className="neu-btn px-3 py-1 text-xs font-medium text-primary">+ Add</button>}
                </div>
                {stops.map((stop, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <input type="color" value={stop.color} onChange={(e) => updateStop(i, "color", e.target.value)}
                      className="w-8 h-8 rounded-lg cursor-pointer border border-surface-border" />
                    <input type="range" min={0} max={100} value={stop.position} onChange={(e) => updateStop(i, "position", Number(e.target.value))} className="flex-1 accent-primary" />
                    <span className="text-xs text-muted w-8">{stop.position}%</span>
                    {stops.length > 2 && <button onClick={() => removeStop(i)} className="text-error text-xs hover:text-error/80">✕</button>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Box Shadow controls */}
          {tab === "shadow" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Presets</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {SHADOW_PRESETS.map((p) => (
                  <button key={p.name} onClick={() => setShadowLayers([...p.layers])}
                    className="neu-btn px-2.5 py-1 text-xs font-medium text-muted hover:text-primary">{p.name}</button>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Layers ({shadowLayers.length}/4)</span>
                {shadowLayers.length < 4 && <button onClick={addShadowLayer} className="neu-btn px-3 py-1 text-xs font-medium text-primary">+ Add</button>}
              </div>
              {shadowLayers.map((l, i) => (
                <div key={i} className="space-y-3 p-3 rounded-xl bg-background/50 border border-surface-border/50">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-muted">Layer {i + 1}</span>
                    <div className="flex items-center gap-2">
                      <label className="flex items-center gap-1.5 text-xs text-muted">
                        <input type="checkbox" checked={l.inset} onChange={(e) => updateShadowLayer(i, "inset", e.target.checked)} className="accent-primary" /> Inset
                      </label>
                      {shadowLayers.length > 1 && <button onClick={() => removeShadowLayer(i)} className="text-error text-xs">✕</button>}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <SliderControl label="X" value={l.x} min={-50} max={50} unit="px" onChange={(v) => updateShadowLayer(i, "x", v)} />
                    <SliderControl label="Y" value={l.y} min={-50} max={50} unit="px" onChange={(v) => updateShadowLayer(i, "y", v)} />
                    <SliderControl label="Blur" value={l.blur} min={0} max={100} unit="px" onChange={(v) => updateShadowLayer(i, "blur", v)} />
                    <SliderControl label="Spread" value={l.spread} min={-50} max={50} unit="px" onChange={(v) => updateShadowLayer(i, "spread", v)} />
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="color" value={l.color} onChange={(e) => updateShadowLayer(i, "color", e.target.value)}
                      className="w-8 h-8 rounded-lg cursor-pointer border border-surface-border" />
                    <SliderControl label="Opacity" value={l.opacity} min={0} max={1} step={0.05} onChange={(v) => updateShadowLayer(i, "opacity", v)} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Text Shadow controls */}
          {tab === "textShadow" && (
            <div className="space-y-5">
              <div className="flex flex-wrap gap-1.5 mb-2">
                {[
                  { name: "Subtle", x: 1, y: 1, blur: 2, color: "#000000", opacity: 0.2 },
                  { name: "Medium", x: 2, y: 2, blur: 4, color: "#000000", opacity: 0.3 },
                  { name: "Heavy", x: 3, y: 3, blur: 6, color: "#000000", opacity: 0.5 },
                  { name: "Glow", x: 0, y: 0, blur: 10, color: "#0ea5e9", opacity: 0.8 },
                  { name: "Neon", x: 0, y: 0, blur: 20, color: "#22c55e", opacity: 0.9 },
                  { name: "Retro", x: 3, y: 3, blur: 0, color: "#8b5cf6", opacity: 0.6 },
                ].map((p) => (
                  <button key={p.name} onClick={() => setTextShadow({ x: p.x, y: p.y, blur: p.blur, color: p.color, opacity: p.opacity })}
                    className="neu-btn px-2.5 py-1 text-xs font-medium text-muted hover:text-primary">{p.name}</button>
                ))}
              </div>
              <SliderControl label="X Offset" value={textShadow.x} min={-20} max={20} unit="px" onChange={(v) => setTextShadow({ ...textShadow, x: v })} />
              <SliderControl label="Y Offset" value={textShadow.y} min={-20} max={20} unit="px" onChange={(v) => setTextShadow({ ...textShadow, y: v })} />
              <SliderControl label="Blur" value={textShadow.blur} min={0} max={30} unit="px" onChange={(v) => setTextShadow({ ...textShadow, blur: v })} />
              <SliderControl label="Opacity" value={textShadow.opacity} min={0} max={1} step={0.05} onChange={(v) => setTextShadow({ ...textShadow, opacity: v })} />
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Color</label>
                <input type="color" value={textShadow.color} onChange={(e) => setTextShadow({ ...textShadow, color: e.target.value })}
                  className="w-10 h-8 rounded-lg cursor-pointer border border-surface-border" />
              </div>
            </div>
          )}

          {/* Border Radius controls */}
          {tab === "radius" && (
            <div className="space-y-5">
              <div className="flex flex-wrap gap-1.5 mb-2">
                {RADIUS_PRESETS.map((p) => (
                  <button key={p.name} onClick={() => setRadius({ tl: p.tl, tr: p.tr, br: p.br, bl: p.bl, linked: p.tl === p.tr && p.tr === p.br && p.br === p.bl })}
                    className="neu-btn px-2.5 py-1 text-xs font-medium text-muted hover:text-primary">{p.name}</button>
                ))}
              </div>
              <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                <input type="checkbox" checked={radius.linked} onChange={(e) => setRadius({ ...radius, linked: e.target.checked })} className="accent-primary" />
                Link all corners
              </label>
              <div className="grid grid-cols-2 gap-4">
                <SliderControl label="Top Left" value={radius.tl} min={0} max={100} unit="px" onChange={(v) => setRadiusCorner("tl", v)} />
                <SliderControl label="Top Right" value={radius.tr} min={0} max={100} unit="px" onChange={(v) => setRadiusCorner("tr", v)} />
                <SliderControl label="Bottom Left" value={radius.bl} min={0} max={100} unit="px" onChange={(v) => setRadiusCorner("bl", v)} />
                <SliderControl label="Bottom Right" value={radius.br} min={0} max={100} unit="px" onChange={(v) => setRadiusCorner("br", v)} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CSS Output */}
      <div className="neu-card p-6 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-cat">Generated CSS</span>
            {tailwindHint && (
              <span className="text-xs text-muted font-mono bg-surface border border-surface-border px-2 py-0.5 rounded-lg">
                tw: {tailwindHint}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <button onClick={handleCopy} className="neu-btn px-4 py-1.5 text-xs font-medium text-cat hover:text-primary">Copy</button>
            <button onClick={handleCopyAll} className="neu-btn px-4 py-1.5 text-xs font-medium text-cat hover:text-primary">Copy All</button>
          </div>
        </div>
        <pre className="code-area p-4 text-sm font-mono whitespace-pre-wrap overflow-auto">{currentCSS}</pre>
      </div>

      {/* Combined Preview */}
      <div className="neu-card p-6">
        <span className="text-sm font-medium text-cat mb-4 block">Combined Preview</span>
        <div className="rounded-2xl h-48 flex items-center justify-center relative overflow-hidden" style={{ background: gradientValue }}>
          <div style={{ ...glassStyle, ...shadowStyle, ...radiusStyle }} className="w-64 h-28 flex flex-col items-center justify-center text-center px-6">
            <div className="text-lg font-semibold mb-1" style={textShadowStyle}>All Effects</div>
            <div className="text-sm opacity-70">Glass + Shadow + Radius + Text</div>
          </div>
        </div>
      </div>

      <div className="mt-14 max-w-4xl mx-auto space-y-12">
        <section>
          <h2 className="text-xl font-semibold tracking-tight mb-4">Browser Support for Glassmorphism</h2>
          <p className="text-muted leading-relaxed mb-3">
            The <code className="text-sm bg-surface border border-surface-border px-1.5 py-0.5 rounded">backdrop-filter</code> property
            is supported in all modern browsers including Chrome, Firefox (103+), Safari, and Edge.
            For older browsers, the glass effect gracefully degrades to a semi-transparent background
            without the blur — your design still looks good, just without the frosted effect.
          </p>
        </section>
      </div>
    </div>
  );
}

function SliderControl({
  label, value, min, max, step = 1, unit = "", onChange,
}: {
  label: string; value: number; min: number; max: number; step?: number; unit?: string; onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium">{label}</label>
        <span className="neu-card-sm px-2 py-0.5 text-xs font-mono text-primary font-bold">{value}{unit}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))} className="w-full accent-primary" />
    </div>
  );
}
