"use client";

import { useId, useRef, useState } from "react";
import { ChevronDown, ChevronUp, ImagePlus, Link2, Plus, Trash2, X } from "lucide-react";
import type { Item, ListField, ScalarField } from "./types";

const inputCls =
  "w-full rounded-lg border border-surface-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted/70 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition";

function Label({ htmlFor, children, hint }: { htmlFor: string; children: React.ReactNode; hint?: string }) {
  return (
    <div className="mb-1.5">
      <label htmlFor={htmlFor} className="block text-[13px] font-medium text-foreground">
        {children}
      </label>
      {hint && <p className="text-xs text-muted mt-0.5 leading-snug">{hint}</p>}
    </div>
  );
}

/** Downscale uploads so saved pages stay small enough for browser storage */
async function readImage(file: File, maxSize: number): Promise<string> {
  const original = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const el = new Image();
    el.onload = () => resolve(el);
    el.onerror = () => reject(new Error("Unsupported image"));
    el.src = original;
  });
  const ratio = Math.min(1, maxSize / Math.max(img.width, img.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(img.width * ratio);
  canvas.height = Math.round(img.height * ratio);
  canvas.getContext("2d")?.drawImage(img, 0, 0, canvas.width, canvas.height);
  const webp = canvas.toDataURL("image/webp", 0.85);
  if (webp.startsWith("data:image/webp")) return webp;
  return canvas.toDataURL(file.type === "image/png" ? "image/png" : "image/jpeg", 0.85);
}

function ImageInput({ id, value, onChange }: { id: string; value: string; onChange: (v: string) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [showUrl, setShowUrl] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const onFile = async (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      onChange(await readImage(file, 1600));
    } catch {
      setError("This image could not be read. Try a JPG or PNG.");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="w-16 h-12 flex-shrink-0 rounded-md border border-surface-border bg-background overflow-hidden flex items-center justify-center">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="w-full h-full object-cover" />
          ) : (
            <ImagePlus className="w-4 h-4 text-muted" />
          )}
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button type="button" onClick={() => fileRef.current?.click()} className="neu-btn h-8 px-2.5 text-xs font-medium text-foreground" disabled={busy}>
            <ImagePlus className="w-3.5 h-3.5" />
            {busy ? "Processing…" : "Upload"}
          </button>
          <button type="button" onClick={() => setShowUrl((v) => !v)} className="neu-btn h-8 px-2.5 text-xs font-medium text-muted hover:text-foreground">
            <Link2 className="w-3.5 h-3.5" />
            URL
          </button>
          {value && (
            <button type="button" onClick={() => onChange("")} aria-label="Remove image" className="neu-btn h-8 w-8 text-muted hover:text-error">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <input ref={fileRef} id={id} type="file" accept="image/*" className="sr-only" onChange={(e) => onFile(e.target.files?.[0])} />
      </div>
      {showUrl && (
        <input
          type="url"
          className={`${inputCls} mt-2`}
          placeholder="https://…"
          value={value.startsWith("data:") ? "" : value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {error && <p className="text-xs text-error mt-1.5">{error}</p>}
    </div>
  );
}

export function ScalarInput({ field, value, onChange }: { field: ScalarField; value: string; onChange: (v: string) => void }) {
  const id = useId();
  return (
    <div>
      <Label htmlFor={id} hint={field.hint}>
        {field.label}
      </Label>
      {field.type === "textarea" ? (
        <textarea id={id} rows={field.rows ?? 3} className={`${inputCls} resize-y leading-relaxed`} placeholder={field.placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
      ) : field.type === "select" ? (
        <select id={id} className={inputCls} value={value} onChange={(e) => onChange(e.target.value)}>
          {field.options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : field.type === "color" ? (
        <div className="flex items-center gap-2">
          <input
            id={id}
            type="color"
            className="w-10 h-9 flex-shrink-0 rounded-md border border-surface-border bg-background p-0.5 cursor-pointer"
            value={/^#[0-9a-f]{6}$/i.test(value) ? value : "#000000"}
            onChange={(e) => onChange(e.target.value)}
          />
          <input aria-label={`${field.label} hex value`} className={`${inputCls} font-mono uppercase`} value={value} maxLength={9} onChange={(e) => onChange(e.target.value)} />
        </div>
      ) : field.type === "image" ? (
        <ImageInput id={id} value={value} onChange={onChange} />
      ) : (
        <input id={id} type={field.type} className={inputCls} placeholder={field.placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  );
}

export function ListInput({ field, items, onChange }: { field: ListField; items: Item[]; onChange: (items: Item[]) => void }) {
  const [open, setOpen] = useState<number | null>(null);
  const canAdd = field.max === undefined || items.length < field.max;
  const canRemove = items.length > (field.min ?? 0);

  const update = (i: number, key: string, v: string) => onChange(items.map((it, j) => (j === i ? { ...it, [key]: v } : it)));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
    setOpen(open === i ? j : open);
  };

  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <p className="text-[13px] font-medium text-foreground">{field.label}</p>
        <span className="text-xs text-muted">
          {items.length}
          {field.max ? ` / ${field.max}` : ""}
        </span>
      </div>
      {field.hint && <p className="text-xs text-muted -mt-1 mb-2">{field.hint}</p>}
      <div className="space-y-1.5">
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className={`rounded-lg border ${isOpen ? "border-primary/30" : "border-surface-border"} bg-background`}>
              <div className="flex items-center gap-1 pl-3 pr-1 h-10">
                <button type="button" onClick={() => setOpen(isOpen ? null : i)} className="flex-1 min-w-0 text-left text-[13px] text-foreground truncate cursor-pointer" aria-expanded={isOpen}>
                  <span className="text-muted mr-1.5 tabular-nums">{i + 1}.</span>
                  {item[field.titleKey] || `${field.itemLabel} ${i + 1}`}
                </button>
                <button type="button" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up" className="w-7 h-7 rounded flex items-center justify-center text-muted hover:text-foreground disabled:opacity-25 cursor-pointer">
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>
                <button type="button" onClick={() => move(i, 1)} disabled={i === items.length - 1} aria-label="Move down" className="w-7 h-7 rounded flex items-center justify-center text-muted hover:text-foreground disabled:opacity-25 cursor-pointer">
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onChange(items.filter((_, j) => j !== i));
                    setOpen(null);
                  }}
                  disabled={!canRemove}
                  aria-label={`Remove ${field.itemLabel.toLowerCase()}`}
                  className="w-7 h-7 rounded flex items-center justify-center text-muted hover:text-error disabled:opacity-25 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              {isOpen && (
                <div className="px-3 pb-3 pt-1 space-y-3 border-t border-surface-border">
                  {field.fields.map((f) => (
                    <ScalarInput key={f.key} field={f} value={item[f.key] ?? ""} onChange={(v) => update(i, f.key, v)} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {canAdd && (
        <button
          type="button"
          onClick={() => {
            onChange([...items, { ...field.newItem }]);
            setOpen(items.length);
          }}
          className="mt-2 w-full h-9 rounded-lg border border-dashed border-surface-border text-[13px] font-medium text-muted hover:text-primary hover:border-primary/40 inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          Add {field.itemLabel.toLowerCase()}
        </button>
      )}
    </div>
  );
}
