"use client";

import { useState, useCallback, useEffect } from "react";
import { useToast } from "../../components/toast";
import { ToolPageHeader } from "../../components/tool-page-header";

function isNumeric(value: string): boolean {
  return /^\d+$/.test(value.trim());
}

function parseInput(value: string): Date | null {
  const trimmed = value.trim();
  if (!trimmed) return null;

  if (isNumeric(trimmed)) {
    const num = Number(trimmed);
    const ts = trimmed.length > 12 ? num : num * 1000;
    const date = new Date(ts);
    return isNaN(date.getTime()) ? null : date;
  }

  const date = new Date(trimmed);
  return isNaN(date.getTime()) ? null : date;
}

function relativeTime(date: Date): string {
  const now = Date.now();
  const diff = now - date.getTime();
  const abs = Math.abs(diff);
  const prefix = diff < 0 ? "in " : "";
  const suffix = diff >= 0 ? " ago" : "";

  if (abs < 60000) return "just now";
  if (abs < 3600000) {
    const m = Math.floor(abs / 60000);
    return `${prefix}${m} minute${m > 1 ? "s" : ""}${suffix}`;
  }
  if (abs < 86400000) {
    const h = Math.floor(abs / 3600000);
    return `${prefix}${h} hour${h > 1 ? "s" : ""}${suffix}`;
  }
  const d = Math.floor(abs / 86400000);
  return `${prefix}${d} day${d > 1 ? "s" : ""}${suffix}`;
}

export default function TimestampConverterPage() {
  const { toast } = useToast();
  const [input, setInput] = useState("");
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const date = input ? parseInput(input) : null;

  const useNow = useCallback(() => {
    setInput(Math.floor(Date.now() / 1000).toString());
  }, []);

  const copy = useCallback(
    (text: string) => {
      navigator.clipboard.writeText(text).then(() => {
        toast("Copied to clipboard!");
      });
    },
    [toast]
  );

  const formats = date
    ? [
        { label: "Unix (seconds)", value: Math.floor(date.getTime() / 1000).toString() },
        { label: "Unix (milliseconds)", value: date.getTime().toString() },
        { label: "ISO 8601", value: date.toISOString() },
        { label: "UTC", value: date.toUTCString() },
        { label: "Local", value: date.toLocaleString() },
        { label: "Relative", value: relativeTime(date) },
      ]
    : [];

  return (
    <section className="pt-6 sm:pt-8 pb-10 sm:pb-14 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <ToolPageHeader />

        <div className="neu-card p-6 mb-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-muted font-mono">
              Current: {now ? Math.floor(now.getTime() / 1000) : "..."}
            </p>
            <button
              onClick={useNow}
              className="text-xs text-cat hover:text-cat/80 font-medium transition-colors"
            >
              Use Now
            </button>
          </div>
          <div className="space-y-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter Unix timestamp or date string (e.g. 1700000000 or 2024-01-15)"
              className="w-full px-4 py-3.5 neu-input text-sm font-mono focus:outline-none focus:ring-2 focus:ring-cat/30"
            />
            {input && !date && (
              <p className="text-xs text-error">
                Could not parse input. Try a Unix timestamp or a standard date format.
              </p>
            )}
          </div>
        </div>

        {date && (
          <div className="neu-card p-5">
            <h2 className="text-sm font-semibold text-muted mb-3">
              Converted Formats
            </h2>
            <div className="space-y-2">
              {formats.map((f) => (
                <div
                  key={f.label}
                  className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg bg-background"
                >
                  <div className="min-w-0">
                    <p className="text-xs text-muted mb-0.5">{f.label}</p>
                    <code className="text-sm font-mono truncate block">
                      {f.value}
                    </code>
                  </div>
                  <button
                    onClick={() => copy(f.value)}
                    className="p-1.5 rounded-lg hover:bg-surface transition-colors text-muted hover:text-cat shrink-0"
                    aria-label={`Copy ${f.label}`}
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
