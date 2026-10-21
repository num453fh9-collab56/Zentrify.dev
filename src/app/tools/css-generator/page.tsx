"use client";

import { useState } from "react";

type Tab = "glass" | "gradient";

interface GradientStop {
  color: string;
  position: number;
}

export default function CssGeneratorPage() {
  const [tab, setTab] = useState<Tab>("glass");
  const [copied, setCopied] = useState(false);

  // Glass state
  const [blur, setBlur] = useState(12);
  const [opacity, setOpacity] = useState(0.25);
  const [borderOpacity, setBorderOpacity] = useState(0.2);
  const [tintColor, setTintColor] = useState("#ffffff");

  // Gradient state
  const [gradientType, setGradientType] = useState<"linear" | "radial">("linear");
  const [angle, setAngle] = useState(135);
  const [stops, setStops] = useState<GradientStop[]>([
    { color: "#0ea5e9", position: 0 },
    { color: "#8b5cf6", position: 100 },
  ]);

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const glassCSS = `background: ${hexToRgba(tintColor, opacity)};
backdrop-filter: blur(${blur}px);
-webkit-backdrop-filter: blur(${blur}px);
border: 1px solid ${hexToRgba(tintColor, borderOpacity)};
border-radius: 16px;`;

  const gradientStopsStr = stops
    .map((s) => `${s.color} ${s.position}%`)
    .join(", ");
  const gradientValue =
    gradientType === "linear"
      ? `linear-gradient(${angle}deg, ${gradientStopsStr})`
      : `radial-gradient(circle, ${gradientStopsStr})`;
  const gradientCSS = `background: ${gradientValue};`;

  const currentCSS = tab === "glass" ? glassCSS : gradientCSS;

  const glassStyle = {
    background: hexToRgba(tintColor, opacity),
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    border: `1px solid ${hexToRgba(tintColor, borderOpacity)}`,
    borderRadius: "16px",
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCSS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const updateStop = (index: number, field: keyof GradientStop, value: string | number) => {
    setStops(stops.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  };

  const addStop = () => {
    if (stops.length >= 4) return;
    const lastPos = stops[stops.length - 1].position;
    setStops([...stops, { color: "#22c55e", position: Math.min(lastPos + 20, 100) }]);
  };

  const removeStop = (index: number) => {
    if (stops.length <= 2) return;
    setStops(stops.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          CSS Glassmorphism &amp; Gradient Generator
        </h1>
        <p className="text-muted text-lg">
          Design beautiful glass effects and gradients with live preview.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Preview */}
        <div className="neu-card p-6 border-t-4 border-t-purple">
          <span className="text-sm font-medium text-purple mb-4 block">Preview</span>
          <div
            className="rounded-2xl h-72 flex items-center justify-center relative overflow-hidden"
            style={{ background: gradientValue }}
          >
            {tab === "glass" ? (
              <div
                style={glassStyle}
                className="w-64 h-40 flex flex-col items-center justify-center text-center px-6"
              >
                <div className="text-lg font-semibold mb-1">Glass Card</div>
                <div className="text-sm opacity-70">
                  Frosted glass effect with backdrop blur
                </div>
              </div>
            ) : (
              <div className="text-white text-center">
                <div className="text-lg font-semibold mb-1">Gradient Preview</div>
                <div className="text-sm opacity-80">{gradientType} gradient</div>
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="neu-card p-6 border-t-4 border-t-primary">
          {/* Tab Switch */}
          <div className="flex gap-1 neu-input p-1 mb-6">
            <button
              onClick={() => setTab("glass")}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-xl transition-all ${
                tab === "glass"
                  ? "bg-purple text-white shadow-sm"
                  : "text-muted hover:text-purple"
              }`}
            >
              Glassmorphism
            </button>
            <button
              onClick={() => setTab("gradient")}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-xl transition-all ${
                tab === "gradient"
                  ? "bg-primary text-white shadow-sm"
                  : "text-muted hover:text-primary"
              }`}
            >
              Gradient
            </button>
          </div>

          {tab === "glass" ? (
            <div className="space-y-5">
              <SliderControl label="Blur" value={blur} min={0} max={30} unit="px" onChange={setBlur} />
              <SliderControl label="Opacity" value={opacity} min={0} max={1} step={0.05} onChange={setOpacity} />
              <SliderControl label="Border Opacity" value={borderOpacity} min={0} max={1} step={0.05} onChange={setBorderOpacity} />
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Tint Color</label>
                <input
                  type="color"
                  value={tintColor}
                  onChange={(e) => setTintColor(e.target.value)}
                  className="w-10 h-8 rounded-lg cursor-pointer border border-surface-border"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Type</label>
                <div className="flex gap-1 neu-input p-1">
                  <button
                    onClick={() => setGradientType("linear")}
                    className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                      gradientType === "linear"
                        ? "bg-primary text-white"
                        : "text-muted"
                    }`}
                  >
                    Linear
                  </button>
                  <button
                    onClick={() => setGradientType("radial")}
                    className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                      gradientType === "radial"
                        ? "bg-primary text-white"
                        : "text-muted"
                    }`}
                  >
                    Radial
                  </button>
                </div>
              </div>

              {gradientType === "linear" && (
                <SliderControl label="Angle" value={angle} min={0} max={360} unit="°" onChange={setAngle} />
              )}

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Color Stops</span>
                  {stops.length < 4 && (
                    <button
                      onClick={addStop}
                      className="neu-btn px-3 py-1 text-xs font-medium text-primary"
                    >
                      + Add
                    </button>
                  )}
                </div>
                {stops.map((stop, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <input
                      type="color"
                      value={stop.color}
                      onChange={(e) => updateStop(i, "color", e.target.value)}
                      className="w-8 h-8 rounded-lg cursor-pointer border border-surface-border"
                    />
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={stop.position}
                      onChange={(e) => updateStop(i, "position", Number(e.target.value))}
                      className="flex-1 accent-primary"
                    />
                    <span className="text-xs text-muted w-8">{stop.position}%</span>
                    {stops.length > 2 && (
                      <button
                        onClick={() => removeStop(i)}
                        className="text-error text-xs hover:text-error/80"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CSS Output */}
      <div className="neu-card p-6 border-t-4 border-t-purple mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-purple">Generated CSS</span>
          <button
            onClick={handleCopy}
            className="neu-btn px-4 py-1.5 text-xs font-medium text-purple hover:text-primary"
          >
            {copied ? "Copied!" : "Copy CSS"}
          </button>
        </div>
        <pre className="code-area p-4 text-sm font-mono whitespace-pre-wrap overflow-auto">
          {currentCSS}
        </pre>
      </div>

      {/* SEO Article */}
      <article className="mt-14 neu-card p-8">
        <h2 className="text-xl font-semibold text-foreground mb-3">
          Free CSS Glassmorphism &amp; Gradient Generator
        </h2>
        <p className="text-sm text-muted mb-4">
          Create stunning glassmorphism effects and CSS gradients with
          Zentrify&apos;s free visual generator. Adjust blur, opacity, colors,
          and gradient angles with live preview — then copy the generated CSS
          code directly into your project.
        </p>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          What is Glassmorphism?
        </h3>
        <p className="text-sm text-muted mb-4">
          Glassmorphism is a modern UI design trend featuring frosted glass
          effects using CSS backdrop-filter. It creates translucent surfaces
          with background blur, giving depth and elegance to cards, modals,
          and navigation bars.
        </p>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          How to Use
        </h3>
        <p className="text-sm text-muted">
          Switch between Glassmorphism and Gradient tabs, adjust the controls,
          and see the live preview update instantly. When you&apos;re happy with
          the result, click &quot;Copy CSS&quot; to copy the code. No signup
          required — everything runs in your browser.
        </p>
      </article>
    </div>
  );
}

function SliderControl({
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
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium">{label}</label>
        <span className="neu-card-sm px-2 py-0.5 text-xs font-mono text-primary font-bold">
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
        className="w-full accent-primary"
      />
    </div>
  );
}
