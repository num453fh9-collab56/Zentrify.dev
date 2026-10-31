"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  Check,
  ChevronDown,
  Copy,
  Download,
  Monitor,
  Redo2,
  RotateCcw,
  Smartphone,
  Tablet,
  Undo2,
} from "lucide-react";
import { useToast } from "../../../components/toast";
import { ListInput, ScalarInput } from "./fields";
import type { Content, EditableTemplate, Item, Section } from "./types";

const devices = [
  { id: "desktop", label: "Desktop", width: 1280, Icon: Monitor },
  { id: "tablet", label: "Tablet", width: 820, Icon: Tablet },
  { id: "mobile", label: "Mobile", width: 390, Icon: Smartphone },
] as const;
type DeviceId = (typeof devices)[number]["id"];

const storageKey = (id: string) => `zentrify:landing:${id}:v1`;

/** Saved content merged over defaults, so fields added later still get values */
function load(t: EditableTemplate): Content {
  try {
    const raw = localStorage.getItem(storageKey(t.id));
    if (!raw) return t.defaults;
    const saved = JSON.parse(raw) as Content;
    const values: Content["values"] = {};
    for (const [section, defaults] of Object.entries(t.defaults.values)) {
      values[section] = { ...defaults, ...(saved.values?.[section] ?? {}) };
    }
    return { enabled: { ...t.defaults.enabled, ...(saved.enabled ?? {}) }, values };
  } catch {
    return t.defaults;
  }
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "landing-page";

function Switch({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        onChange(!on);
      }}
      className={`relative w-9 h-5 flex-shrink-0 rounded-full transition-colors cursor-pointer ${on ? "bg-primary" : "bg-surface-border"}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${on ? "translate-x-4" : ""}`} />
    </button>
  );
}

export function LandingEditor({ template, onClose }: { template: EditableTemplate; onClose: () => void }) {
  const { toast } = useToast();

  // History: every edit is undoable; quick typing in one field counts as one step
  const [history, setHistory] = useState(() => ({ past: [] as Content[], present: load(template), future: [] as Content[] }));
  const lastEdit = useRef({ key: "", at: 0 });
  const content = history.present;

  const commit = useCallback((next: Content, key = "") => {
    const now = Date.now();
    const merge = key !== "" && key === lastEdit.current.key && now - lastEdit.current.at < 800;
    lastEdit.current = { key, at: now };
    setHistory((h) => ({ past: merge ? h.past : [...h.past.slice(-49), h.present], present: next, future: [] }));
  }, []);

  const undo = useCallback(() => {
    lastEdit.current = { key: "", at: 0 };
    setHistory((h) => (h.past.length ? { past: h.past.slice(0, -1), present: h.past[h.past.length - 1], future: [h.present, ...h.future] } : h));
  }, []);
  const redo = useCallback(() => {
    lastEdit.current = { key: "", at: 0 };
    setHistory((h) => (h.future.length ? { past: [...h.past, h.present], present: h.future[0], future: h.future.slice(1) } : h));
  }, []);

  const setValue = (section: string, key: string, value: string | Item[]) =>
    commit({ ...content, values: { ...content.values, [section]: { ...content.values[section], [key]: value } } }, `${section}.${key}`);
  const setEnabled = (section: string, on: boolean) => commit({ ...content, enabled: { ...content.enabled, [section]: on } });

  // Autosave
  const [saveState, setSaveState] = useState<"saved" | "error">("saved");
  useEffect(() => {
    const t = setTimeout(() => {
      try {
        localStorage.setItem(storageKey(template.id), JSON.stringify(content));
        setSaveState("saved");
      } catch {
        setSaveState("error");
      }
    }, 500);
    return () => clearTimeout(t);
  }, [content, template.id]);

  // Preview. Changing an iframe's srcdoc adds a browser history entry (Back would
  // step through old previews), so each update loads in a fresh hidden iframe
  // that replaces the visible one once it has loaded — no history, no flash.
  const frameEls = useRef(new Map<number, HTMLIFrameElement>());
  const nextFrameId = useRef(1);
  const scrollY = useRef(0);
  const [frames, setFrames] = useState(() => [
    { id: 0, html: template.render(content, { preview: { initialScroll: 0, instant: false } }) },
  ]);
  const [activeFrame, setActiveFrame] = useState(0);
  const activeFrameRef = useRef(0);
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const t = setTimeout(() => {
      const id = nextFrameId.current++;
      const html = template.render(content, { preview: { initialScroll: scrollY.current, instant: true } });
      setFrames((list) => [...list.filter((f) => f.id === activeFrameRef.current), { id, html }]);
    }, 220);
    return () => clearTimeout(t);
  }, [content, template]);

  const onFrameLoad = useCallback((id: number) => {
    if (id !== nextFrameId.current - 1 || id === activeFrameRef.current) return; // stale, or already shown
    activeFrameRef.current = id;
    setActiveFrame(id);
    setFrames((list) => list.filter((f) => f.id === id));
  }, []);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      const entry = [...frameEls.current.entries()].find(([, el]) => el.contentWindow === e.source);
      if (!entry) return;
      const [id] = entry;
      // Swap as soon as the new page is parsed; waiting for "load" means waiting for every image
      if (e.data?.zentrify === "ready") onFrameLoad(id);
      if (e.data?.zentrify === "scroll" && id === activeFrameRef.current) scrollY.current = e.data.y;
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [onFrameLoad]);

  const goto = (anchor?: string) =>
    frameEls.current.get(activeFrameRef.current)?.contentWindow?.postMessage({ zentrify: "goto", id: anchor ?? "top" }, "*");

  // Fit the chosen device width into the available space
  const [device, setDevice] = useState<DeviceId>("desktop");
  const stageRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setStage({ w: entry.contentRect.width, h: entry.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const deviceWidth = devices.find((d) => d.id === device)!.width;
  const scale = stage.w ? Math.min(1, stage.w / deviceWidth) : 1;

  // Keyboard shortcuts outside text fields; lock page scroll behind the editor
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(tag)) return;
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        if (e.shiftKey) redo();
        else undo();
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "y") {
        e.preventDefault();
        redo();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [undo, redo]);

  const [openSection, setOpenSection] = useState<string>(template.schema[0].id);
  const [mobileView, setMobileView] = useState<"edit" | "preview">("edit");
  const issues = useMemo(() => template.checks?.(content) ?? [], [template, content]);

  const pageName = (content.values.brand?.name as string) || template.name;
  const finalHtml = () => template.render(content);

  const download = () => {
    const url = URL.createObjectURL(new Blob([finalHtml()], { type: "text/html" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slug(pageName)}.html`;
    a.click();
    URL.revokeObjectURL(url);
    toast("Your page was downloaded as an HTML file.");
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(finalHtml());
      toast("HTML copied to clipboard.");
    } catch {
      toast("Copy failed. Use Download instead.", "error");
    }
  };
  const reset = () => {
    commit(template.defaults);
    toast("Template reset. Press Undo to bring your changes back.", "info");
  };

  const renderSection = (section: Section) => {
    const isOpen = openSection === section.id;
    const on = content.enabled[section.id] !== false;
    const sectionIssues = issues.filter((i) => i.section === section.id);
    const preset = template.presets?.section === section.id ? template.presets : undefined;
    return (
      <div key={section.id} className="border-b border-surface-border">
        <div
          role="button"
          tabIndex={0}
          aria-expanded={isOpen}
          onClick={() => {
            setOpenSection(isOpen ? "" : section.id);
            if (!isOpen && on && section.anchor) goto(section.anchor);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setOpenSection(isOpen ? "" : section.id);
            }
          }}
          className="flex items-center gap-3 px-4 h-12 cursor-pointer hover:bg-background/60 select-none"
        >
          <span className={`flex-1 text-sm font-medium ${on ? "text-foreground" : "text-muted line-through decoration-muted/40"}`}>{section.label}</span>
          {sectionIssues.length > 0 && <AlertCircle className="w-4 h-4 text-warning" aria-label="Needs attention" />}
          {section.toggleable && <Switch on={on} onChange={(v) => setEnabled(section.id, v)} label={`Show ${section.label}`} />}
          <ChevronDown className={`w-4 h-4 text-muted transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </div>
        {isOpen && (
          <div className={`px-4 pb-5 pt-1 space-y-4 ${on ? "" : "opacity-50"}`}>
            {section.description && <p className="text-xs text-muted -mt-1">{section.description}</p>}
            {!on && <p className="text-xs text-muted">This section is hidden. Turn it on to show it on your page.</p>}
            {sectionIssues.map((i) => (
              <p key={i.message} className="flex gap-2 text-xs text-foreground rounded-lg border border-warning/30 bg-warning/10 px-3 py-2">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-px text-warning" />
                {i.message}
              </p>
            ))}
            {preset && (
              <div>
                <p className="text-[13px] font-medium text-foreground mb-1.5">Presets</p>
                <div className="flex flex-wrap gap-1.5">
                  {preset.items.map((p) => (
                    <button
                      key={p.name}
                      type="button"
                      onClick={() =>
                        commit({ ...content, values: { ...content.values, [section.id]: { ...content.values[section.id], ...p.values } } })
                      }
                      className="neu-btn h-8 pl-1.5 pr-2.5 text-xs font-medium text-foreground"
                    >
                      <span className="flex -space-x-1">
                        {p.swatch.map((c) => (
                          <span key={c} className="w-4 h-4 rounded-full border border-black/10" style={{ background: c }} />
                        ))}
                      </span>
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {section.fields.map((f) =>
              f.type === "list" ? (
                <ListInput
                  key={f.key}
                  field={f}
                  items={(content.values[section.id]?.[f.key] as Item[]) ?? []}
                  onChange={(items) => setValue(section.id, f.key, items)}
                />
              ) : (
                <ScalarInput
                  key={f.key}
                  field={f}
                  value={(content.values[section.id]?.[f.key] as string) ?? ""}
                  onChange={(v) => setValue(section.id, f.key, v)}
                />
              )
            )}
          </div>
        )}
      </div>
    );
  };

  const iconBtn = "neu-btn w-9 h-9 text-foreground disabled:opacity-30 disabled:cursor-not-allowed";

  return (
    <div className="fixed inset-0 z-[70] bg-background flex flex-col" role="dialog" aria-modal="true" aria-label={`Edit ${template.name}`}>
      {/* Top bar */}
      <header className="h-14 flex-shrink-0 flex items-center gap-2 px-3 sm:px-4 border-b border-surface-border bg-surface">
        <button onClick={onClose} className="neu-btn h-9 px-2.5 text-sm font-medium text-muted hover:text-foreground">
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Templates</span>
        </button>
        <div className="min-w-0 ml-1">
          <p className="text-sm font-semibold text-foreground truncate">{pageName}</p>
          <p className="text-[11px] text-muted flex items-center gap-1">
            {saveState === "error" ? (
              <span className="text-error">Not saved: images too large for browser storage</span>
            ) : (
              <>
                <Check className="w-3 h-3" />
                Saved in this browser
              </>
            )}
          </p>
        </div>

        <div className="ml-auto flex items-center gap-1.5">
          <button onClick={undo} disabled={!history.past.length} aria-label="Undo" title="Undo (Ctrl+Z)" className={iconBtn}>
            <Undo2 className="w-4 h-4" />
          </button>
          <button onClick={redo} disabled={!history.future.length} aria-label="Redo" title="Redo (Ctrl+Shift+Z)" className={iconBtn}>
            <Redo2 className="w-4 h-4" />
          </button>

          <div className="hidden lg:flex items-center p-0.5 mx-1.5 rounded-lg border border-surface-border bg-background" role="radiogroup" aria-label="Preview size">
            {devices.map(({ id, label, Icon }) => (
              <button
                key={id}
                role="radio"
                aria-checked={device === id}
                aria-label={label}
                title={label}
                onClick={() => setDevice(id)}
                className={`w-9 h-8 rounded-md flex items-center justify-center transition-colors cursor-pointer ${
                  device === id ? "bg-surface text-foreground shadow-sm" : "text-muted hover:text-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>

          <button onClick={reset} title="Reset to template" aria-label="Reset to template" className={`${iconBtn} hidden sm:inline-flex`}>
            <RotateCcw className="w-4 h-4" />
          </button>
          <button onClick={copy} className="neu-btn h-9 px-3 text-sm font-medium text-foreground hidden sm:inline-flex">
            <Copy className="w-4 h-4" />
            Copy
          </button>
          <button onClick={download} className="inline-flex items-center gap-2 h-9 px-3.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors cursor-pointer">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Download</span>
          </button>
        </div>
      </header>

      {/* Mobile: switch between editing and preview */}
      <div className="lg:hidden flex p-1 m-3 mb-0 rounded-lg border border-surface-border bg-surface" role="tablist">
        {(["edit", "preview"] as const).map((v) => (
          <button
            key={v}
            role="tab"
            aria-selected={mobileView === v}
            onClick={() => setMobileView(v)}
            className={`flex-1 h-8 rounded-md text-sm font-medium capitalize cursor-pointer ${mobileView === v ? "bg-background text-foreground shadow-sm" : "text-muted"}`}
          >
            {v}
          </button>
        ))}
      </div>

      <div className="flex-1 min-h-0 flex">
        <aside className={`${mobileView === "edit" ? "flex" : "hidden"} lg:flex flex-col w-full lg:w-[380px] flex-shrink-0 border-r border-surface-border bg-surface overflow-y-auto`}>
          {issues.length > 0 && (
            <p className="mx-4 mt-4 text-xs text-muted">
              <AlertCircle className="inline w-3.5 h-3.5 text-warning mr-1 -mt-px" />
              {issues.length} {issues.length === 1 ? "thing needs" : "things need"} your attention before publishing.
            </p>
          )}
          <div className="mt-2">{template.schema.map(renderSection)}</div>
          <p className="px-4 py-5 text-xs text-muted leading-relaxed">
            Your changes are saved in this browser automatically. Download the HTML file to put the page on any web host.
          </p>
        </aside>

        <main ref={stageRef} className={`${mobileView === "preview" ? "flex" : "hidden"} lg:flex flex-1 min-w-0 justify-center items-start p-3 lg:p-6 bg-surface-border/25 overflow-hidden`}>
          {stage.w > 0 && (
            <div
              className={`relative bg-white overflow-hidden shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)] border border-surface-border ${device === "mobile" ? "rounded-[28px]" : "rounded-lg"}`}
              style={{ width: deviceWidth * scale, height: stage.h }}
            >
              {frames.map((f) => (
                <iframe
                  key={f.id}
                  ref={(el) => {
                    if (el) frameEls.current.set(f.id, el);
                    else frameEls.current.delete(f.id);
                  }}
                  srcDoc={f.html}
                  onLoad={() => onFrameLoad(f.id)}
                  title={`${pageName} preview`}
                  aria-hidden={f.id !== activeFrame}
                  tabIndex={f.id === activeFrame ? undefined : -1}
                  sandbox="allow-scripts allow-forms"
                  className={`absolute top-0 left-0 border-0 block origin-top-left ${f.id === activeFrame ? "" : "invisible"}`}
                  style={{ width: deviceWidth, height: stage.h / scale, transform: `scale(${scale})` }}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
