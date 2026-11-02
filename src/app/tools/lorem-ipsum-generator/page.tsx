"use client";

import { useState, useCallback, useEffect } from "react";
import { useToast } from "../../components/toast";
import { ToolPageHeader } from "../../components/tool-page-header";

const WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
  "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
  "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
  "deserunt", "mollit", "anim", "id", "est", "laborum", "perspiciatis", "unde",
  "omnis", "iste", "natus", "error", "voluptatem", "accusantium", "doloremque",
  "laudantium", "totam", "rem", "aperiam", "eaque", "ipsa", "quae", "ab", "illo",
  "inventore", "veritatis", "quasi", "architecto", "beatae", "vitae", "dicta",
  "explicabo", "nemo", "ipsam", "quia", "voluptas", "aspernatur", "aut", "odit",
  "fugit", "consequuntur", "magni", "dolores", "eos", "ratione", "sequi",
  "nesciunt", "neque", "porro", "quisquam", "dolorem", "adipisci", "numquam",
  "eius", "modi", "tempora", "magnam", "quaerat",
];

const FIRST_SENTENCE =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

function randomWords(count: number): string {
  return Array.from(
    { length: count },
    () => WORDS[Math.floor(Math.random() * WORDS.length)]
  ).join(" ");
}

function generateSentence(): string {
  const len = 8 + Math.floor(Math.random() * 10);
  const words = randomWords(len);
  return words.charAt(0).toUpperCase() + words.slice(1) + ".";
}

function generateParagraph(): string {
  const count = 4 + Math.floor(Math.random() * 4);
  return Array.from({ length: count }, () => generateSentence()).join(" ");
}

type Mode = "paragraphs" | "sentences" | "words";

function generate(mode: Mode, count: number, startWithLorem: boolean): string {
  if (mode === "words") {
    const text = randomWords(count);
    if (startWithLorem && count >= 5) {
      return "Lorem ipsum dolor sit amet " + randomWords(Math.max(0, count - 5));
    }
    return text;
  }
  if (mode === "sentences") {
    const sentences = Array.from({ length: count }, () => generateSentence());
    if (startWithLorem) sentences[0] = FIRST_SENTENCE;
    return sentences.join(" ");
  }
  const paragraphs = Array.from({ length: count }, () => generateParagraph());
  if (startWithLorem) {
    paragraphs[0] = FIRST_SENTENCE + " " + paragraphs[0];
  }
  return paragraphs.join("\n\n");
}

export default function LoremIpsumGeneratorPage() {
  const { toast } = useToast();
  const [mode, setMode] = useState<Mode>("paragraphs");
  const [count, setCount] = useState(3);
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [output, setOutput] = useState("");

  useEffect(() => {
    setOutput(generate("paragraphs", 3, true)); // eslint-disable-line react-hooks/set-state-in-effect -- SSR-safe initial value
  }, []);

  const handleGenerate = useCallback(() => {
    setOutput(generate(mode, count, startWithLorem));
  }, [mode, count, startWithLorem]);

  const copy = useCallback(() => {
    navigator.clipboard.writeText(output).then(() => {
      toast("Copied to clipboard!");
    });
  }, [output, toast]);

  const wordCount = output.split(/\s+/).filter(Boolean).length;
  const charCount = output.length;

  return (
    <section className="pt-6 sm:pt-8 pb-10 sm:pb-14 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <ToolPageHeader />

        <div className="neu-card p-6 mb-6">
          <div className="space-y-5">
            <div>
              <label className="text-sm font-medium mb-2 block">Type</label>
              <div className="grid grid-cols-3 gap-2">
                {(["paragraphs", "sentences", "words"] as Mode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`py-2.5 text-sm font-medium rounded-xl transition-colors ${
                      mode === m
                        ? "bg-primary text-white"
                        : "bg-background text-muted hover:text-foreground"
                    }`}
                  >
                    {m.charAt(0).toUpperCase() + m.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Count: {count}
              </label>
              <input
                type="range"
                min={1}
                max={mode === "words" ? 500 : 50}
                step={1}
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="w-full accent-pink"
              />
              <div className="flex justify-between text-xs text-muted mt-1">
                <span>1</span>
                <span>{mode === "words" ? 500 : 50}</span>
              </div>
            </div>

            <label
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${
                startWithLorem ? "bg-cat/5" : "bg-background"
              }`}
            >
              <input
                type="checkbox"
                checked={startWithLorem}
                onChange={() => setStartWithLorem(!startWithLorem)}
                className="w-4 h-4 rounded accent-pink"
              />
              <span className="text-sm">Start with &quot;Lorem ipsum...&quot;</span>
            </label>

            <button
              onClick={handleGenerate}
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
              Generate
            </button>
          </div>
        </div>

        <div className="neu-card p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-muted">
              {wordCount} words &middot; {charCount} characters
            </h2>
            <button
              onClick={copy}
              className="text-xs text-cat hover:text-cat/80 font-medium transition-colors"
            >
              Copy
            </button>
          </div>
          <div className="p-4 rounded-xl bg-background text-sm leading-relaxed whitespace-pre-wrap max-h-96 overflow-y-auto">
            {output}
          </div>
        </div>

      </div>
    </section>
  );
}
