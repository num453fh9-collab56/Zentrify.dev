"use client";

import { useState, useCallback, useEffect } from "react";
import { useToast } from "../../components/toast";
import { ToolPageHeader } from "../../components/tool-page-header";

function generateUUID(): string {
  return crypto.randomUUID();
}

function formatUUID(uuid: string, uppercase: boolean, dashes: boolean): string {
  let result = uuid;
  if (!dashes) result = result.replace(/-/g, "");
  if (uppercase) result = result.toUpperCase();
  return result;
}

export default function UUIDGeneratorPage() {
  const { toast } = useToast();
  const [count, setCount] = useState(1);
  const [uppercase, setUppercase] = useState(false);
  const [dashes, setDashes] = useState(true);
  const [uuids, setUuids] = useState<string[]>([]);

  useEffect(() => {
    setUuids([generateUUID()]);
  }, []);

  const generate = useCallback(() => {
    const list = Array.from({ length: count }, () => generateUUID());
    setUuids(list);
  }, [count]);

  const formatted = uuids.map((u) => formatUUID(u, uppercase, dashes));

  const copy = useCallback(
    (text: string) => {
      navigator.clipboard.writeText(text).then(() => {
        toast("Copied to clipboard!");
      });
    },
    [toast]
  );

  const copyAll = useCallback(() => {
    navigator.clipboard.writeText(formatted.join("\n")).then(() => {
      toast("All UUIDs copied!");
    });
  }, [formatted, toast]);

  return (
    <section className="pt-6 sm:pt-8 pb-10 sm:pb-14 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <ToolPageHeader />

        <div className="neu-card p-6 mb-6">
          <div className="space-y-5">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Count: {count}
              </label>
              <input
                type="range"
                min={1}
                max={100}
                step={1}
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="w-full accent-purple"
              />
              <div className="flex justify-between text-xs text-muted mt-1">
                <span>1</span>
                <span>100</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <label
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${
                  uppercase ? "bg-cat/5" : "bg-background"
                }`}
              >
                <input
                  type="checkbox"
                  checked={uppercase}
                  onChange={() => setUppercase(!uppercase)}
                  className="w-4 h-4 rounded accent-purple"
                />
                <span className="text-sm">Uppercase</span>
              </label>
              <label
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${
                  dashes ? "bg-cat/5" : "bg-background"
                }`}
              >
                <input
                  type="checkbox"
                  checked={dashes}
                  onChange={() => setDashes(!dashes)}
                  className="w-4 h-4 rounded accent-purple"
                />
                <span className="text-sm">Dashes</span>
              </label>
            </div>

            <button
              onClick={generate}
              className="w-full px-5 py-3.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Generate {count > 1 ? `${count} UUIDs` : "UUID"}
            </button>
          </div>
        </div>

        <div className="neu-card p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-muted">
              Generated UUID{formatted.length > 1 ? "s" : ""}
            </h2>
            {formatted.length > 1 && (
              <button
                onClick={copyAll}
                className="text-xs text-cat hover:text-cat/80 font-medium transition-colors"
              >
                Copy All
              </button>
            )}
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {formatted.map((uuid, i) => (
              <div
                key={`${uuid}-${i}`}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background"
              >
                <code className="flex-1 text-xs font-mono truncate">
                  {uuid}
                </code>
                <button
                  onClick={() => copy(uuid)}
                  className="p-1.5 rounded-lg hover:bg-surface transition-colors text-muted hover:text-cat"
                  aria-label="Copy UUID"
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

      </div>
    </section>
  );
}
