"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, m } from "framer-motion";
import { useRouter } from "next/navigation";

const shortcuts = [
  { keys: ["⌘/Ctrl", "K"], action: "Open search" },
  { keys: ["?"], action: "Show keyboard shortcuts" },
  { keys: ["F11"], action: "Toggle fullscreen" },
  { keys: ["/"], action: "Focus search bar" },
  { keys: ["H"], action: "Go to Home" },
  { keys: ["T"], action: "Go to All Tools" },
  { keys: ["Esc"], action: "Close dialog" },
];

export function KeyboardShortcuts() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;

      if (e.key === "Escape" && open) {
        setOpen(false);
        return;
      }

      if (isInput) return;

      if (e.key === "?" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setOpen((v) => !v);
      }

      if (e.key === "h" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        router.push("/");
      }

      if (e.key === "t" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        router.push("/tools");
      }
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, router]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="fixed left-1/2 top-[20%] -translate-x-1/2 z-[201] w-[90vw] max-w-md"
          >
            <div className="bg-surface border border-surface-border rounded-2xl shadow-2xl overflow-hidden p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-base">Keyboard Shortcuts</h2>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1 rounded-lg hover:bg-surface-border/50 transition-colors"
                >
                  <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="space-y-2">
                {shortcuts.map((s) => (
                  <div key={s.action} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-surface-border/30">
                    <span className="text-sm text-muted">{s.action}</span>
                    <div className="flex items-center gap-1">
                      {s.keys.map((k) => (
                        <kbd
                          key={k}
                          className="px-2 py-0.5 rounded-md bg-surface-border text-[11px] font-mono font-medium min-w-[24px] text-center"
                        >
                          {k}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-muted mt-4 text-center">
                Press <kbd className="px-1 py-0.5 rounded bg-surface-border text-[10px] font-mono">?</kbd> to toggle this panel
              </p>
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
}
