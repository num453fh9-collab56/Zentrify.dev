"use client";

import { useState } from "react";
import { useToast } from "../../components/toast";

type Tab = "glass" | "gradient";

interface GradientStop {
  color: string;
  position: number;
}

export default function CssGeneratorPage() {
  const [tab, setTab] = useState<Tab>("glass");
  const { toast } = useToast();

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
    toast("CSS copied to clipboard!");
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
            Copy CSS
          </button>
        </div>
        <pre className="code-area p-4 text-sm font-mono whitespace-pre-wrap overflow-auto">
          {currentCSS}
        </pre>
      </div>

      {/* SEO Article */}
      <article className="mt-16 max-w-4xl mx-auto space-y-10">
        <section>
          <h2 className="text-2xl font-bold mb-4">Free CSS Glassmorphism &amp; Gradient Generator</h2>
          <p className="text-muted leading-relaxed mb-3">
            Create stunning glassmorphism effects and CSS gradients with Zentrify&apos;s free visual
            generator. Adjust blur, opacity, colors, and gradient angles with real-time live preview —
            then copy the production-ready CSS code directly into your project. No frameworks needed,
            works with vanilla CSS, Tailwind, React, Vue, or any stack.
          </p>
          <p className="text-muted leading-relaxed">
            Everything runs in your browser — no signup, no data collection, no rate limits.
            Perfect for designers and frontend developers who want pixel-perfect glass effects
            without writing CSS from scratch.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">What is Glassmorphism?</h2>
          <p className="text-muted leading-relaxed mb-3">
            Glassmorphism is a modern UI design trend that creates frosted glass surfaces using
            CSS <code className="text-sm bg-surface border border-surface-border px-1.5 py-0.5 rounded">backdrop-filter: blur()</code> combined
            with semi-transparent backgrounds. Popularized by Apple&apos;s macOS and iOS interfaces,
            glassmorphism adds depth, hierarchy, and elegance to any web design.
          </p>
          <p className="text-muted leading-relaxed">
            The key CSS properties involved are <code className="text-sm bg-surface border border-surface-border px-1.5 py-0.5 rounded">backdrop-filter</code> for
            the blur effect, <code className="text-sm bg-surface border border-surface-border px-1.5 py-0.5 rounded">background: rgba()</code> for
            transparency, and a subtle border for the glass edge. This generator handles all of
            that for you — just move the sliders.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="neu-card-sm p-4">
              <h3 className="font-semibold mb-1">Glassmorphism Mode</h3>
              <p className="text-sm text-muted">Control blur intensity, background opacity, border radius, and border opacity to create perfect frosted glass cards.</p>
            </div>
            <div className="neu-card-sm p-4">
              <h3 className="font-semibold mb-1">Gradient Mode</h3>
              <p className="text-sm text-muted">Pick two colors, adjust the angle, and generate smooth CSS gradients for backgrounds, buttons, and text effects.</p>
            </div>
            <div className="neu-card-sm p-4">
              <h3 className="font-semibold mb-1">Live Preview</h3>
              <p className="text-sm text-muted">See your changes in real time as you adjust sliders — no need to copy-paste and refresh to check results.</p>
            </div>
            <div className="neu-card-sm p-4">
              <h3 className="font-semibold mb-1">One-Click Copy</h3>
              <p className="text-sm text-muted">Copy the generated CSS with a single click. The code is clean, formatted, and ready for production use.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use</h2>
          <ol className="text-muted space-y-3 list-decimal list-inside">
            <li><strong className="text-foreground">Choose a mode</strong> — switch between Glassmorphism and Gradient tabs at the top</li>
            <li><strong className="text-foreground">Adjust controls</strong> — use sliders to fine-tune blur, opacity, colors, and angles</li>
            <li><strong className="text-foreground">Preview live</strong> — watch the preview card update instantly as you adjust</li>
            <li><strong className="text-foreground">Copy CSS</strong> — click the copy button to grab the generated code</li>
            <li><strong className="text-foreground">Paste in your project</strong> — use it in any CSS file, styled-component, or inline style</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Browser Support for Glassmorphism</h2>
          <p className="text-muted leading-relaxed mb-3">
            The <code className="text-sm bg-surface border border-surface-border px-1.5 py-0.5 rounded">backdrop-filter</code> property
            is supported in all modern browsers including Chrome, Firefox (103+), Safari, and Edge.
            For older browsers, the glass effect gracefully degrades to a semi-transparent background
            without the blur — your design still looks good, just without the frosted effect.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="neu-card-sm p-5">
              <h3 className="font-semibold mb-2">Can I use glassmorphism with Tailwind CSS?</h3>
              <p className="text-sm text-muted">Yes! Tailwind supports backdrop-blur utilities like <code className="text-xs bg-surface border border-surface-border px-1 py-0.5 rounded">backdrop-blur-md</code> and <code className="text-xs bg-surface border border-surface-border px-1 py-0.5 rounded">bg-white/20</code>. You can use the generated CSS values as reference for your Tailwind classes.</p>
            </div>
            <div className="neu-card-sm p-5">
              <h3 className="font-semibold mb-2">Does glassmorphism affect performance?</h3>
              <p className="text-sm text-muted">Backdrop-filter can be GPU-intensive on large elements or when layered heavily. For best performance, use it on smaller elements like cards and modals rather than full-page backgrounds.</p>
            </div>
            <div className="neu-card-sm p-5">
              <h3 className="font-semibold mb-2">What&apos;s the difference between glassmorphism and neumorphism?</h3>
              <p className="text-sm text-muted">Glassmorphism uses transparent, blurred backgrounds to create a glass effect. Neumorphism uses soft shadows to create an extruded or inset appearance. Both are modern UI trends but achieve very different visual effects.</p>
            </div>
          </div>
        </section>
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
