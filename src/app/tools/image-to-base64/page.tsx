"use client";

import { useState, useCallback, useRef } from "react";
import { m, AnimatePresence } from "framer-motion";
import { useToast } from "../../components/toast";
import { ToolPageHeader } from "../../components/tool-page-header";

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

type OutputFormat = "png" | "jpeg" | "webp";
type OutputMode = "datauri" | "raw" | "css" | "html" | "markdown";

interface ProcessedImage {
  id: string;
  name: string;
  originalSize: number;
  encodedSize: number;
  dataUri: string;
  base64: string;
  preview: string;
  width: number;
  height: number;
}

function encodeImage(
  img: HTMLImageElement,
  format: OutputFormat,
  quality: number,
  resizeW?: number,
  resizeH?: number,
): { dataUri: string; base64: string; width: number; height: number } {
  const w = resizeW || img.naturalWidth;
  const h = resizeH || img.naturalHeight;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0, w, h);
  const mime = `image/${format}`;
  const q = format === "png" ? undefined : quality / 100;
  const dataUri = canvas.toDataURL(mime, q);
  const base64 = dataUri.split(",")[1] || "";
  return { dataUri, base64, width: w, height: h };
}

const OUTPUT_MODES: { key: OutputMode; label: string }[] = [
  { key: "datauri", label: "Data URI" },
  { key: "raw", label: "Raw Base64" },
  { key: "css", label: "CSS" },
  { key: "html", label: "HTML" },
  { key: "markdown", label: "Markdown" },
];

export default function ImageToBase64Page() {
  const { toast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<ProcessedImage[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [outputMode, setOutputMode] = useState<OutputMode>("datauri");
  const [dragging, setDragging] = useState(false);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("png");
  const [quality, setQuality] = useState(85);
  const [resizeEnabled, setResizeEnabled] = useState(false);
  const [resizeW, setResizeW] = useState(0);
  const [resizeH, setResizeH] = useState(0);
  const [lockAspect, setLockAspect] = useState(true);
  const [aspectRatio, setAspectRatio] = useState(1);

  const processFiles = useCallback((files: FileList | File[]) => {
    const arr = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (arr.length === 0) {
      toast("Please select image files.", "error");
      return;
    }

    arr.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const src = e.target?.result as string;
        const img = new Image();
        img.onload = () => {
          const rW = resizeEnabled && resizeW > 0 ? resizeW : undefined;
          const rH = resizeEnabled && resizeH > 0 ? resizeH : undefined;
          const result = encodeImage(img, outputFormat, quality, rW, rH);
          const processed: ProcessedImage = {
            id: crypto.randomUUID(),
            name: file.name,
            originalSize: file.size,
            encodedSize: result.base64.length,
            dataUri: result.dataUri,
            base64: result.base64,
            preview: result.dataUri,
            width: result.width,
            height: result.height,
          };
          setImages((prev) => {
            const next = [...prev, processed];
            if (prev.length === 0) setSelected(processed.id);
            return next;
          });
        };
        img.src = src;
      };
      reader.readAsDataURL(file);
    });
  }, [toast, outputFormat, quality, resizeEnabled, resizeW, resizeH]);

  const reprocessAll = useCallback(() => {
    if (images.length === 0) return;
    const entries = images.map((img) => ({ name: img.name, preview: img.preview, originalSize: img.originalSize }));
    setImages([]);
    entries.forEach((entry) => {
      const img = new Image();
      img.onload = () => {
        const rW = resizeEnabled && resizeW > 0 ? resizeW : undefined;
        const rH = resizeEnabled && resizeH > 0 ? resizeH : undefined;
        const result = encodeImage(img, outputFormat, quality, rW, rH);
        const processed: ProcessedImage = {
          id: crypto.randomUUID(),
          name: entry.name,
          originalSize: entry.originalSize,
          encodedSize: result.base64.length,
          dataUri: result.dataUri,
          base64: result.base64,
          preview: result.dataUri,
          width: result.width,
          height: result.height,
        };
        setImages((prev) => {
          const next = [...prev, processed];
          if (prev.length === 0) setSelected(processed.id);
          return next;
        });
      };
      img.src = entry.preview;
    });
  }, [images, outputFormat, quality, resizeEnabled, resizeW, resizeH]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      if (e.dataTransfer.files.length > 0) processFiles(e.dataTransfer.files);
    },
    [processFiles]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) processFiles(e.target.files);
      if (fileRef.current) fileRef.current.value = "";
    },
    [processFiles]
  );

  const removeImage = useCallback((id: string) => {
    setImages((prev) => {
      const next = prev.filter((i) => i.id !== id);
      setSelected((sel) => (sel === id ? (next[0]?.id ?? null) : sel));
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    setImages([]);
    setSelected(null);
    if (fileRef.current) fileRef.current.value = "";
  }, []);

  const current = images.find((i) => i.id === selected) ?? null;

  const getOutput = useCallback((img: ProcessedImage, mode: OutputMode): string => {
    switch (mode) {
      case "datauri": return img.dataUri;
      case "raw": return img.base64;
      case "css": return `background-image: url("${img.dataUri}");`;
      case "html": return `<img src="${img.dataUri}" alt="${img.name}" width="${img.width}" height="${img.height}" />`;
      case "markdown": return `![${img.name}](${img.dataUri})`;
    }
  }, []);

  const copyOutput = useCallback((mode: OutputMode) => {
    if (!current) return;
    navigator.clipboard.writeText(getOutput(current, mode)).then(() => {
      toast(`Copied ${OUTPUT_MODES.find((m) => m.key === mode)?.label}!`);
    });
  }, [current, getOutput, toast]);

  const copyAll = useCallback(() => {
    if (!current) return;
    const all = OUTPUT_MODES.map((m) => `/* ${m.label} */\n${getOutput(current, m.key)}`).join("\n\n");
    navigator.clipboard.writeText(all).then(() => toast("Copied all formats!"));
  }, [current, getOutput, toast]);

  const handleResizeW = (v: number) => {
    setResizeW(v);
    if (lockAspect && aspectRatio > 0) setResizeH(Math.round(v / aspectRatio));
  };

  const handleResizeH = (v: number) => {
    setResizeH(v);
    if (lockAspect && aspectRatio > 0) setResizeW(Math.round(v * aspectRatio));
  };

  const initResize = useCallback((img: ProcessedImage) => {
    setResizeW(img.width);
    setResizeH(img.height);
    setAspectRatio(img.width / img.height);
  }, []);

  const outputText = current ? getOutput(current, outputMode) : "";

  return (
    <section className="pt-6 sm:pt-8 pb-10 sm:pb-14 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <ToolPageHeader />

        {/* Upload area */}
        <div
          className={`neu-card p-8 mb-5 text-center transition-colors ${dragging ? "border-cat border-2" : ""}`}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          <div className="space-y-3">
            <svg className="w-10 h-10 mx-auto text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            <p className="text-sm text-muted">
              Drag &amp; drop images here, or{" "}
              <button onClick={() => fileRef.current?.click()} className="text-cat hover:text-cat/80 font-medium transition-colors">
                browse
              </button>
            </p>
            <p className="text-xs text-muted">PNG, JPG, GIF, SVG, WebP &middot; Multiple files supported</p>
          </div>
          <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleFileChange} className="hidden" />
        </div>

        {/* Settings row */}
        <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="neu-card p-4 mb-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Output format */}
            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">Format</label>
              <div className="flex gap-1">
                {(["png", "jpeg", "webp"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setOutputFormat(f)}
                    className={`flex-1 px-2 py-1.5 text-xs font-medium rounded-lg transition-colors ${outputFormat === f ? "bg-primary text-white" : "bg-background text-muted hover:text-foreground"}`}
                  >
                    {f.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Quality */}
            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                Quality {outputFormat !== "png" ? `(${quality}%)` : "(N/A)"}
              </label>
              <input
                type="range"
                min={1}
                max={100}
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                disabled={outputFormat === "png"}
                className="w-full accent-[var(--primary)]"
              />
            </div>

            {/* Resize toggle */}
            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">Resize</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const next = !resizeEnabled;
                    setResizeEnabled(next);
                    if (next && current) initResize(current);
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${resizeEnabled ? "bg-primary text-white" : "bg-background text-muted hover:text-foreground"}`}
                >
                  {resizeEnabled ? "On" : "Off"}
                </button>
                {resizeEnabled && (
                  <button
                    onClick={() => setLockAspect(!lockAspect)}
                    className={`p-1.5 rounded-lg text-xs transition-colors ${lockAspect ? "bg-primary/10 text-primary" : "bg-background text-muted"}`}
                    title={lockAspect ? "Aspect locked" : "Aspect unlocked"}
                  >
                    {lockAspect ? "🔒" : "🔓"}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Resize inputs */}
          <AnimatePresence>
            {resizeEnabled && (
              <m.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="flex items-center gap-3 mt-3 pt-3 border-t border-surface-border">
                  <div className="flex-1">
                    <label className="block text-xs text-muted mb-1">Width (px)</label>
                    <input
                      type="number"
                      min={1}
                      max={8192}
                      value={resizeW || ""}
                      onChange={(e) => handleResizeW(Number(e.target.value))}
                      className="w-full px-3 py-1.5 neu-input text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                  <span className="text-muted mt-5">×</span>
                  <div className="flex-1">
                    <label className="block text-xs text-muted mb-1">Height (px)</label>
                    <input
                      type="number"
                      min={1}
                      max={8192}
                      value={resizeH || ""}
                      onChange={(e) => handleResizeH(Number(e.target.value))}
                      className="w-full px-3 py-1.5 neu-input text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                  <button
                    onClick={reprocessAll}
                    className="mt-5 px-4 py-1.5 text-xs font-medium bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </m.div>

        {/* Image list */}
        <AnimatePresence>
          {images.length > 0 && (
            <m.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="neu-card p-4 mb-5"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold text-muted uppercase tracking-wider">
                  {images.length} image{images.length !== 1 ? "s" : ""}
                </p>
                <button onClick={clearAll} className="text-xs text-muted hover:text-error transition-colors">
                  Clear all
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {images.map((img) => (
                  <m.div
                    key={img.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-colors ${selected === img.id ? "border-primary" : "border-transparent hover:border-surface-border"}`}
                    onClick={() => setSelected(img.id)}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.preview} alt={img.name} className="w-16 h-16 object-cover" />
                    <button
                      onClick={(e) => { e.stopPropagation(); removeImage(img.id); }}
                      className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-error text-white text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </m.div>
                ))}
                <button
                  onClick={() => fileRef.current?.click()}
                  className="w-16 h-16 rounded-lg border-2 border-dashed border-surface-border flex items-center justify-center text-muted hover:text-primary hover:border-primary transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </m.div>
          )}
        </AnimatePresence>

        {/* Selected image details + output */}
        <AnimatePresence mode="wait">
          {current && (
            <m.div
              key={current.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {/* Stats bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                {[
                  { label: "Original", value: formatBytes(current.originalSize) },
                  { label: "Encoded", value: formatBytes(current.encodedSize) },
                  { label: "Dimensions", value: `${current.width}×${current.height}` },
                  { label: "Ratio", value: `${((current.encodedSize / current.originalSize) * 100).toFixed(0)}%` },
                ].map((stat) => (
                  <div key={stat.label} className="neu-card p-3 text-center">
                    <p className="text-xs text-muted uppercase tracking-wider">{stat.label}</p>
                    <p className="text-sm font-semibold mt-0.5">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Preview */}
              <div className="neu-card p-4 mb-5 text-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={current.preview} alt={current.name} className="max-h-52 mx-auto rounded-lg object-contain" />
                <p className="text-sm font-medium mt-3">{current.name}</p>
              </div>

              {/* Output */}
              <div className="neu-card p-5">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {OUTPUT_MODES.map((m) => (
                    <button
                      key={m.key}
                      onClick={() => setOutputMode(m.key)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${outputMode === m.key ? "bg-primary text-white" : "bg-background text-muted hover:text-foreground"}`}
                    >
                      {m.label}
                    </button>
                  ))}
                  <div className="flex-1" />
                  <button onClick={() => copyOutput(outputMode)} className="text-xs text-cat hover:text-cat/80 font-medium transition-colors">
                    Copy
                  </button>
                  <button onClick={copyAll} className="text-xs text-muted hover:text-foreground transition-colors">
                    Copy All
                  </button>
                </div>
                <textarea
                  value={outputText}
                  readOnly
                  className="w-full h-40 code-area p-4 text-xs focus:outline-none resize-none"
                  spellCheck={false}
                />

                {/* Quick copy buttons for each format */}
                <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-surface-border">
                  {OUTPUT_MODES.map((m) => (
                    <button
                      key={m.key}
                      onClick={() => copyOutput(m.key)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded-md bg-background text-muted hover:text-foreground hover:bg-surface-border/50 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
