"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
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

function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / 86400000);
}

function formatInTimezone(date: Date, tz: string): string {
  try {
    return date.toLocaleString("en-US", { timeZone: tz, dateStyle: "full", timeStyle: "long" });
  } catch {
    return date.toLocaleString();
  }
}

function diffBreakdown(ms: number): { days: number; hours: number; minutes: number; seconds: number } {
  const abs = Math.abs(ms);
  const days = Math.floor(abs / 86400000);
  const hours = Math.floor((abs % 86400000) / 3600000);
  const minutes = Math.floor((abs % 3600000) / 60000);
  const seconds = Math.floor((abs % 60000) / 1000);
  return { days, hours, minutes, seconds };
}

const TIMEZONES = [
  { label: "Local", value: Intl.DateTimeFormat().resolvedOptions().timeZone },
  { label: "UTC", value: "UTC" },
  { label: "US Eastern (EST/EDT)", value: "America/New_York" },
  { label: "US Central (CST/CDT)", value: "America/Chicago" },
  { label: "US Pacific (PST/PDT)", value: "America/Los_Angeles" },
  { label: "London (GMT/BST)", value: "Europe/London" },
  { label: "Central Europe (CET/CEST)", value: "Europe/Berlin" },
  { label: "India (IST)", value: "Asia/Kolkata" },
  { label: "Pakistan (PKT)", value: "Asia/Karachi" },
  { label: "China (CST)", value: "Asia/Shanghai" },
  { label: "Japan (JST)", value: "Asia/Tokyo" },
  { label: "Korea (KST)", value: "Asia/Seoul" },
  { label: "Australia Eastern (AEST)", value: "Australia/Sydney" },
  { label: "Dubai (GST)", value: "Asia/Dubai" },
  { label: "Singapore (SGT)", value: "Asia/Singapore" },
  { label: "Brazil (BRT)", value: "America/Sao_Paulo" },
];

type Tab = "convert" | "diff";

const CopyIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

export default function TimestampConverterPage() {
  const { toast } = useToast();
  const [input, setInput] = useState("");
  const [now, setNow] = useState<Date | null>(null);
  const [timezone, setTimezone] = useState(TIMEZONES[0].value);
  const [tab, setTab] = useState<Tab>("convert");
  const [diffA, setDiffA] = useState("");
  const [diffB, setDiffB] = useState("");

  useEffect(() => {
    setNow(new Date()); // eslint-disable-line react-hooks/set-state-in-effect -- clock init + interval
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const date = useMemo(() => (input ? parseInput(input) : null), [input]);

  const copy = useCallback(
    (text: string) => {
      navigator.clipboard.writeText(text).then(() => {
        toast("Copied to clipboard!");
      });
    },
    [toast]
  );

  const presets = useMemo(() => {
    const n = new Date();
    const startOfDay = new Date(n.getFullYear(), n.getMonth(), n.getDate());
    const dayOfWeek = n.getDay() || 7;
    const startOfWeek = new Date(startOfDay.getTime() - (dayOfWeek - 1) * 86400000);
    const startOfMonth = new Date(n.getFullYear(), n.getMonth(), 1);
    const startOfYear = new Date(n.getFullYear(), 0, 1);
    return [
      { label: "Now", ts: Math.floor(n.getTime() / 1000) },
      { label: "Start of today", ts: Math.floor(startOfDay.getTime() / 1000) },
      { label: "Start of week", ts: Math.floor(startOfWeek.getTime() / 1000) },
      { label: "Start of month", ts: Math.floor(startOfMonth.getTime() / 1000) },
      { label: "Start of year", ts: Math.floor(startOfYear.getTime() / 1000) },
    ];
  }, []);

  const formats = useMemo(() => {
    if (!date) return [];
    return [
      { label: "Unix (seconds)", value: Math.floor(date.getTime() / 1000).toString() },
      { label: "Unix (milliseconds)", value: date.getTime().toString() },
      { label: "ISO 8601", value: date.toISOString() },
      { label: "UTC", value: date.toUTCString() },
      { label: "RFC 2822", value: date.toUTCString().replace("GMT", "+0000") },
      { label: `In ${TIMEZONES.find((t) => t.value === timezone)?.label ?? timezone}`, value: formatInTimezone(date, timezone) },
      { label: "Day of week", value: date.toLocaleDateString("en-US", { weekday: "long" }) },
      { label: "Week number", value: `Week ${getWeekNumber(date)}` },
      { label: "Day of year", value: `Day ${getDayOfYear(date)} of ${date.getFullYear()}` },
      { label: "Relative", value: relativeTime(date) },
    ];
  }, [date, timezone]);

  const copyAll = useCallback(() => {
    if (!formats.length) return;
    const text = formats.map((f) => `${f.label}: ${f.value}`).join("\n");
    navigator.clipboard.writeText(text).then(() => {
      toast("All formats copied!");
    });
  }, [formats, toast]);

  const handleDatePicker = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const d = new Date(e.target.value);
    if (!isNaN(d.getTime())) {
      setInput(Math.floor(d.getTime() / 1000).toString());
    }
  }, []);

  const dateA = useMemo(() => (diffA ? parseInput(diffA) : null), [diffA]);
  const dateB = useMemo(() => (diffB ? parseInput(diffB) : null), [diffB]);

  const diffResult = useMemo(() => {
    if (!dateA || !dateB) return null;
    const ms = dateB.getTime() - dateA.getTime();
    return { ms, ...diffBreakdown(ms) };
  }, [dateA, dateB]);

  const datePickerValue = useMemo(() => {
    if (!date) return "";
    const offset = date.getTimezoneOffset();
    const local = new Date(date.getTime() - offset * 60000);
    return local.toISOString().slice(0, 16);
  }, [date]);

  return (
    <section className="pt-6 sm:pt-8 pb-10 sm:pb-14 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <ToolPageHeader />

        {/* Tabs */}
        <div className="flex gap-1 p-1 mb-4 rounded-xl bg-surface border border-surface-border">
          {(["convert", "diff"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                tab === t
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {t === "convert" ? "Convert" : "Diff Calculator"}
            </button>
          ))}
        </div>

        {tab === "convert" && (
          <>
            {/* Input card */}
            <div className="neu-card p-6 mb-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-muted font-mono">
                  Current: {now ? Math.floor(now.getTime() / 1000) : "..."}
                </p>
                <button
                  onClick={() => setInput(Math.floor(Date.now() / 1000).toString())}
                  className="text-xs text-cat hover:text-cat/80 font-medium transition-colors"
                >
                  Use Now
                </button>
              </div>

              <div className="space-y-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter Unix timestamp or date string (e.g. 1700000000 or 2024-01-15)"
                  className="w-full px-4 py-3.5 neu-input text-sm font-mono focus:outline-none focus:ring-2 focus:ring-cat/30"
                />

                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <input
                      type="datetime-local"
                      value={datePickerValue}
                      onChange={handleDatePicker}
                      className="w-full px-4 py-2.5 neu-input text-sm text-muted focus:outline-none focus:ring-2 focus:ring-cat/30"
                    />
                  </div>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="px-3 py-2.5 neu-input text-sm text-muted focus:outline-none focus:ring-2 focus:ring-cat/30 max-w-[180px]"
                  >
                    {TIMEZONES.map((tz) => (
                      <option key={tz.value} value={tz.value}>
                        {tz.label}
                      </option>
                    ))}
                  </select>
                </div>

                {input && !date && (
                  <p className="text-xs text-error">
                    Could not parse input. Try a Unix timestamp or a standard date format.
                  </p>
                )}
              </div>
            </div>

            {/* Quick presets */}
            <div className="flex flex-wrap gap-2 mb-4">
              {presets.map((p) => (
                <button
                  key={p.label}
                  onClick={() => setInput(p.ts.toString())}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg bg-surface border border-surface-border text-muted hover:text-cat hover:border-cat/30 transition-all"
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Output formats */}
            {date && (
              <div className="neu-card p-5">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-semibold text-muted">
                    Converted Formats
                  </h2>
                  <button
                    onClick={copyAll}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-surface border border-surface-border text-muted hover:text-cat hover:border-cat/30 transition-all"
                  >
                    <CopyIcon />
                    Copy All
                  </button>
                </div>
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
                        <CopyIcon />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {tab === "diff" && (
          <div className="space-y-4">
            <div className="neu-card p-6">
              <h2 className="text-sm font-semibold text-muted mb-4">Timestamp Diff Calculator</h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                    Timestamp A
                  </label>
                  <input
                    type="text"
                    value={diffA}
                    onChange={(e) => setDiffA(e.target.value)}
                    placeholder="e.g. 1700000000 or 2024-01-15"
                    className="w-full px-4 py-3 neu-input text-sm font-mono focus:outline-none focus:ring-2 focus:ring-cat/30"
                  />
                  {diffA && !dateA && (
                    <p className="text-xs text-error mt-1">Could not parse</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                    Timestamp B
                  </label>
                  <input
                    type="text"
                    value={diffB}
                    onChange={(e) => setDiffB(e.target.value)}
                    placeholder="e.g. 1700086400 or 2024-01-16"
                    className="w-full px-4 py-3 neu-input text-sm font-mono focus:outline-none focus:ring-2 focus:ring-cat/30"
                  />
                  {diffB && !dateB && (
                    <p className="text-xs text-error mt-1">Could not parse</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setDiffA(Math.floor(Date.now() / 1000).toString())}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-surface border border-surface-border text-muted hover:text-cat hover:border-cat/30 transition-all"
                  >
                    A = Now
                  </button>
                  <button
                    onClick={() => setDiffB(Math.floor(Date.now() / 1000).toString())}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-surface border border-surface-border text-muted hover:text-cat hover:border-cat/30 transition-all"
                  >
                    B = Now
                  </button>
                  <button
                    onClick={() => { const a = diffA; setDiffA(diffB); setDiffB(a); }}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-surface border border-surface-border text-muted hover:text-cat hover:border-cat/30 transition-all"
                  >
                    ⇄ Swap
                  </button>
                </div>
              </div>
            </div>

            {diffResult && (
              <div className="neu-card p-5">
                <h2 className="text-sm font-semibold text-muted mb-3">Difference</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  {[
                    { label: "Days", value: diffResult.days },
                    { label: "Hours", value: diffResult.hours },
                    { label: "Minutes", value: diffResult.minutes },
                    { label: "Seconds", value: diffResult.seconds },
                  ].map((item) => (
                    <div key={item.label} className="text-center px-3 py-3 rounded-lg bg-background">
                      <p className="text-2xl font-bold font-mono text-foreground">{item.value}</p>
                      <p className="text-xs text-muted mt-0.5">{item.label}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  {[
                    { label: "Direction", value: diffResult.ms === 0 ? "Same moment" : diffResult.ms > 0 ? "B is after A" : "B is before A" },
                    { label: "Total seconds", value: Math.abs(Math.floor(diffResult.ms / 1000)).toLocaleString() },
                    { label: "Total minutes", value: Math.abs(diffResult.ms / 60000).toFixed(2) },
                    { label: "Total hours", value: Math.abs(diffResult.ms / 3600000).toFixed(4) },
                    { label: "Total days", value: Math.abs(diffResult.ms / 86400000).toFixed(6) },
                  ].map((f) => (
                    <div
                      key={f.label}
                      className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg bg-background"
                    >
                      <div className="min-w-0">
                        <p className="text-xs text-muted mb-0.5">{f.label}</p>
                        <code className="text-sm font-mono truncate block">{f.value}</code>
                      </div>
                      <button
                        onClick={() => copy(f.value)}
                        className="p-1.5 rounded-lg hover:bg-surface transition-colors text-muted hover:text-cat shrink-0"
                        aria-label={`Copy ${f.label}`}
                      >
                        <CopyIcon />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
