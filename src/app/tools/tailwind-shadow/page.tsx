"use client";

import { useState } from "react";
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

const defaultLayer: ShadowLayer = {
  x: 4,
  y: 4,
  blur: 12,
  spread: 0,
  color: "#000000",
  opacity: 0.15,
  inset: false,
};

const presets: { name: string; layers: ShadowLayer[] }[] = [
  { name: "sm", layers: [{ x: 0, y: 1, blur: 2, spread: 0, color: "#000000", opacity: 0.05, inset: false }] },
  { name: "md", layers: [{ x: 0, y: 4, blur: 6, spread: -1, color: "#000000", opacity: 0.1, inset: false }] },
  { name: "lg", layers: [{ x: 0, y: 10, blur: 15, spread: -3, color: "#000000", opacity: 0.1, inset: false }] },
  { name: "xl", layers: [{ x: 0, y: 20, blur: 25, spread: -5, color: "#000000", opacity: 0.1, inset: false }] },
  { name: "2xl", layers: [{ x: 0, y: 25, blur: 50, spread: -12, color: "#000000", opacity: 0.25, inset: false }] },
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

export default function TailwindShadowPage() {
  const [layers, setLayers] = useState<ShadowLayer[]>([{ ...defaultLayer }]);
  const { toast } = useToast();
  const [outputTab, setOutputTab] = useState<"tailwind" | "css">("tailwind");

  const cssValue = layers.map(layerToCSS).join(", ");
  const tailwindClass = `shadow-[${cssValue.replace(/\s+/g, "_")}]`;
  const cssCode = `box-shadow: ${cssValue};`;

  const updateLayer = (index: number, field: keyof ShadowLayer, value: number | string | boolean) => {
    setLayers(layers.map((l, i) => (i === index ? { ...l, [field]: value } : l)));
  };

  const addLayer = () => {
    if (layers.length >= 5) return;
    setLayers([...layers, { ...defaultLayer }]);
  };

  const removeLayer = (index: number) => {
    if (layers.length <= 1) return;
    setLayers(layers.filter((_, i) => i !== index));
  };

  const applyPreset = (preset: typeof presets[number]) => {
    setLayers(preset.layers.map((l) => ({ ...l })));
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast("Copied to clipboard!");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-10 sm:pb-14">
      <ToolPageHeader title="Tailwind Shadow Generator" />

      {/* Presets */}
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="text-sm font-medium text-muted self-center mr-1">Presets:</span>
        {presets.map((p) => (
          <button
            key={p.name}
            onClick={() => applyPreset(p)}
            className="neu-btn px-4 py-2 text-sm font-medium text-cat hover:text-primary"
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Preview */}
        <div className="neu-card p-6">
          <span className="text-sm font-medium text-cat mb-4 block">Preview</span>
          <div className="rounded-2xl h-72 bg-background flex items-center justify-center">
            <div
              className="w-48 h-32 bg-surface rounded-2xl flex items-center justify-center border border-surface-border transition-shadow duration-200"
              style={{ boxShadow: cssValue }}
            >
              <span className="text-sm text-muted">Shadow Preview</span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="neu-card p-6 overflow-y-auto max-h-[480px]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium">Shadow Layers</span>
            {layers.length < 5 && (
              <button
                onClick={addLayer}
                className="neu-btn px-3 py-1.5 text-xs font-medium text-primary"
              >
                + Add Layer
              </button>
            )}
          </div>

          <div className="space-y-6">
            {layers.map((layer, i) => (
              <div key={i} className="neu-card-sm p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-cat">Layer {i + 1}</span>
                  {layers.length > 1 && (
                    <button
                      onClick={() => removeLayer(i)}
                      className="text-error text-xs hover:text-error/80"
                    >
                      Remove
                    </button>
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
                    <input
                      type="color"
                      value={layer.color}
                      onChange={(e) => updateLayer(i, "color", e.target.value)}
                      className="w-8 h-7 rounded-lg cursor-pointer border border-surface-border"
                    />
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={layer.inset}
                      onChange={(e) => updateLayer(i, "inset", e.target.checked)}
                      className="accent-orange w-4 h-4"
                    />
                    <span className="text-xs font-medium">Inset</span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Output */}
      <div className="neu-card p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-1 neu-input p-1">
            <button
              onClick={() => setOutputTab("tailwind")}
              className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-all ${
                outputTab === "tailwind"
                  ? "bg-primary text-white shadow-sm"
                  : "text-muted hover:text-cat"
              }`}
            >
              Tailwind
            </button>
            <button
              onClick={() => setOutputTab("css")}
              className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-all ${
                outputTab === "css"
                  ? "bg-primary text-white shadow-sm"
                  : "text-muted hover:text-primary"
              }`}
            >
              CSS
            </button>
          </div>
          <button
            onClick={() =>
              handleCopy(outputTab === "tailwind" ? tailwindClass : cssCode)
            }
            className="neu-btn px-4 py-1.5 text-xs font-medium text-cat hover:text-primary"
          >
            Copy
          </button>
        </div>
        <pre className="code-area p-4 text-sm font-mono whitespace-pre-wrap overflow-auto break-all">
          {outputTab === "tailwind" ? tailwindClass : cssCode}
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
        <span className="text-xs font-mono text-cat font-bold">
          {value}{unit}
        </span>
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
