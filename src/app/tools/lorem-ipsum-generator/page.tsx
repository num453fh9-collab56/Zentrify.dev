"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { useToast } from "../../components/toast";
import { ToolPageHeader } from "../../components/tool-page-header";

const FLAVORS: Record<string, string[]> = {
  classic: [
    "lorem","ipsum","dolor","sit","amet","consectetur","adipiscing","elit",
    "sed","do","eiusmod","tempor","incididunt","ut","labore","et","dolore",
    "magna","aliqua","enim","ad","minim","veniam","quis","nostrud",
    "exercitation","ullamco","laboris","nisi","aliquip","ex","ea","commodo",
    "consequat","duis","aute","irure","in","reprehenderit","voluptate",
    "velit","esse","cillum","fugiat","nulla","pariatur","excepteur","sint",
    "occaecat","cupidatat","non","proident","sunt","culpa","qui","officia",
    "deserunt","mollit","anim","id","est","laborum","perspiciatis","unde",
    "omnis","iste","natus","error","voluptatem","accusantium","doloremque",
    "laudantium","totam","rem","aperiam","eaque","ipsa","quae","ab","illo",
    "inventore","veritatis","quasi","architecto","beatae","vitae","dicta",
    "explicabo","nemo","ipsam","quia","voluptas","aspernatur","aut","odit",
    "fugit","consequuntur","magni","dolores","eos","ratione","sequi",
    "nesciunt","neque","porro","quisquam","dolorem","adipisci","numquam",
    "eius","modi","tempora","magnam","quaerat",
  ],
  hipster: [
    "artisan","kombucha","aesthetic","vinyl","sustainable","craft","organic",
    "cold-pressed","brunch","gentrify","vegan","beard","typewriter","edison",
    "flannel","heirloom","fixie","raw","denim","poutine","selfie","tofu",
    "bushwick","lomo","wayfarers","gastropub","kinfolk","copper","mug",
    "tahini","chia","dreamcatcher","microdosing","pitchfork","synth",
    "pinterest","farm-to-table","celiac","ethical","slow-carb","hexagon",
    "crucifix","knausgaard","tumeric","retro","stumptown","hella","pour-over",
    "chillwave","pork","belly","bitters","chartreuse","hammock","distillery",
    "biodiesel","banjo","waistcoat","cronut","activated","charcoal","tacos",
    "leggings","raclette","skateboard","everyday","carry","chambray","tote",
    "bag","meditation","forage","scenester","glossier","jianbing","freegan",
  ],
  tech: [
    "algorithm","kubernetes","container","microservice","serverless","deploy",
    "pipeline","webhook","endpoint","middleware","refactor","iterate","sprint",
    "agile","scrum","devops","frontend","backend","fullstack","component",
    "framework","library","runtime","compiler","typescript","javascript",
    "database","query","cache","proxy","latency","throughput","bandwidth",
    "docker","terraform","graphql","schema","mutation","resolver","async",
    "await","promise","callback","observable","reactive","streaming","batch",
    "vector","embedding","transformer","neural","gradient","epoch","tensor",
    "inference","fine-tune","benchmark","regression","integration","payload",
    "serialization","encryption","token","authentication","authorization",
    "websocket","protocol","orchestration","monorepo","artifact","registry",
  ],
  business: [
    "synergy","leverage","paradigm","stakeholder","deliverable","bandwidth",
    "scalable","innovative","disruptive","ecosystem","pivot","vertical",
    "holistic","proactive","streamline","optimize","actionable","metrics",
    "alignment","engagement","value-add","pipeline","roadmap","visibility",
    "quarterly","revenue","growth","acquisition","retention","onboard",
    "benchmark","bottom-line","circle-back","deep-dive","drill-down","empower",
    "fast-track","granular","ideate","incentivize","low-hanging","fruit",
    "mission-critical","net-net","next-level","operationalize","pain-point",
    "quick-win","rightsizing","sunset","thought-leader","touchpoint","upskill",
    "value-proposition","win-win","workflow","go-to-market","north-star",
    "tiger-team","blue-sky","boil-ocean","move-needle","game-changer",
    "take-offline","unpack","double-click","helicopter-view","solutioning",
  ],
  pirate: [
    "ahoy","matey","avast","blimey","buccaneer","captain","corsair",
    "cutlass","doubloon","galleon","gangplank","grog","harbor","hull",
    "island","jolly","roger","keelhaul","kraken","landlubber","lookout",
    "mainmast","mutiny","nautical","ocean","parrot","plank","plunder",
    "port","quartermaster","rigging","rum","sail","scallywag","schooner",
    "sea","shanty","shipwreck","shiver","timbers","skull","crossbones",
    "starboard","stern","stowaway","swashbuckle","sword","treasure","vessel",
    "voyage","whirlpool","wind","yo-ho-ho","anchor","barnacle","bounty",
    "cannon","cargo","chart","compass","crow","nest","deck","flag","fleet",
    "horizon","loot","marooned","mermaid","pirate","plundering","rogue",
  ],
  zombie: [
    "brains","undead","shamble","groan","horde","apocalypse","survivor",
    "infection","outbreak","quarantine","barricade","decay","flesh","rotting",
    "walker","crawler","lurker","swarm","devour","feast","hunger","moan",
    "stagger","corpse","graveyeard","cemetery","crypt","tombstone","plague",
    "virus","mutation","contagion","epidemic","pandemic","wasteland","bunker",
    "refuge","scavenge","fortify","overrun","evacuate","sanctuary","headshot",
    "survival","ration","abandoned","desolate","ruins","rubble","aftermath",
    "reanimated","mindless","relentless","gnaw","claw","viscera","sinew",
    "pallid","ghastly","wretched","putrid","dread","nightmare","carnage",
    "rampage","siege","onslaught","desperate","harrowing","gruesome","eerie",
  ],
};

const FLAVOR_LABELS: Record<string, string> = {
  classic: "Classic",
  hipster: "Hipster",
  tech: "Tech",
  business: "Business",
  pirate: "Pirate",
  zombie: "Zombie",
};

const FIRST_SENTENCES: Record<string, string> = {
  classic: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  hipster: "Artisan kombucha aesthetic vinyl, sustainable craft organic cold-pressed.",
  tech: "Algorithm kubernetes container microservice, serverless deploy pipeline webhook.",
  business: "Synergy leverage paradigm stakeholder, deliverable bandwidth scalable innovative.",
  pirate: "Ahoy matey avast blimey, buccaneer captain corsair cutlass doubloon.",
  zombie: "Brains undead shamble groan, horde apocalypse survivor infection outbreak.",
};

type Flavor = keyof typeof FLAVORS;
type Mode = "paragraphs" | "sentences" | "words";

function pick(words: string[]): string {
  return words[Math.floor(Math.random() * words.length)];
}

function buildWordPool(flavor: Flavor, custom: string): string[] {
  const base = FLAVORS[flavor] ?? FLAVORS.classic;
  const extras = custom.trim()
    ? custom.split(/[\s,;]+/).filter(Boolean).map((w) => w.toLowerCase())
    : [];
  return extras.length ? [...base, ...extras] : base;
}

function randomWords(pool: string[], count: number): string {
  return Array.from({ length: count }, () => pick(pool)).join(" ");
}

function genSentence(pool: string[], minLen: number, maxLen: number): string {
  const len = minLen + Math.floor(Math.random() * (maxLen - minLen + 1));
  const words = randomWords(pool, len);
  return words.charAt(0).toUpperCase() + words.slice(1) + ".";
}

function genParagraph(pool: string[], minLen: number, maxLen: number): string {
  const count = 4 + Math.floor(Math.random() * 4);
  return Array.from({ length: count }, () => genSentence(pool, minLen, maxLen)).join(" ");
}

function generate(
  flavor: Flavor, mode: Mode, count: number, startWithLorem: boolean,
  minLen: number, maxLen: number, custom: string
): string {
  const pool = buildWordPool(flavor, custom);
  const first = FIRST_SENTENCES[flavor] ?? FIRST_SENTENCES.classic;

  if (mode === "words") {
    if (startWithLorem && count >= 5) {
      const intro = first.replace(/[.,]/g, "").split(/\s+/).slice(0, 5).join(" ");
      return intro + " " + randomWords(pool, Math.max(0, count - 5));
    }
    return randomWords(pool, count);
  }
  if (mode === "sentences") {
    const sentences = Array.from({ length: count }, () => genSentence(pool, minLen, maxLen));
    if (startWithLorem) sentences[0] = first;
    return sentences.join(" ");
  }
  const paragraphs = Array.from({ length: count }, () => genParagraph(pool, minLen, maxLen));
  if (startWithLorem) paragraphs[0] = first + " " + paragraphs[0];
  return paragraphs.join("\n\n");
}

function toHtml(text: string, mode: Mode): string {
  if (mode === "paragraphs") {
    return text.split("\n\n").map((p) => `<p>${p}</p>`).join("\n");
  }
  return `<p>${text}</p>`;
}

export default function LoremIpsumGeneratorPage() {
  const { toast } = useToast();
  const [flavor, setFlavor] = useState<Flavor>("classic");
  const [mode, setMode] = useState<Mode>("paragraphs");
  const [count, setCount] = useState(3);
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [htmlMode, setHtmlMode] = useState(false);
  const [minLen, setMinLen] = useState(6);
  const [maxLen, setMaxLen] = useState(16);
  const [customWords, setCustomWords] = useState("");
  const [showCustom, setShowCustom] = useState(false);
  const [output, setOutput] = useState("");
  const [viewRaw, setViewRaw] = useState(true);

  useEffect(() => {
    setOutput(generate("classic", "paragraphs", 3, true, 6, 16, "")); // eslint-disable-line react-hooks/set-state-in-effect
  }, []);

  const handleGenerate = useCallback(() => {
    setOutput(generate(flavor, mode, count, startWithLorem, minLen, maxLen, customWords));
  }, [flavor, mode, count, startWithLorem, minLen, maxLen, customWords]);

  const htmlOutput = useMemo(() => toHtml(output, mode), [output, mode]);

  const stats = useMemo(() => {
    const words = output.split(/\s+/).filter(Boolean).length;
    const chars = output.length;
    const paragraphs = mode === "paragraphs" ? output.split("\n\n").filter(Boolean).length : 0;
    const sentences = output.split(/[.!?]+/).filter((s) => s.trim()).length;
    return { words, chars, paragraphs, sentences };
  }, [output, mode]);

  const copy = useCallback(() => {
    navigator.clipboard.writeText(output).then(() => toast("Copied to clipboard!"));
  }, [output, toast]);

  const copyHtml = useCallback(() => {
    navigator.clipboard.writeText(htmlOutput).then(() => toast("HTML copied!"));
  }, [htmlOutput, toast]);

  return (
    <section className="pt-6 sm:pt-8 pb-10 sm:pb-14 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <ToolPageHeader />

        <div className="neu-card p-6 mb-6">
          <div className="space-y-5">
            {/* Flavor selector */}
            <div>
              <label className="text-sm font-medium mb-2 block">Flavor</label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {Object.keys(FLAVOR_LABELS).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFlavor(f)}
                    className={`py-2 text-xs sm:text-sm font-medium rounded-xl transition-colors ${
                      flavor === f
                        ? "bg-primary text-white"
                        : "bg-background text-muted hover:text-foreground"
                    }`}
                  >
                    {FLAVOR_LABELS[f]}
                  </button>
                ))}
              </div>
            </div>

            {/* Mode selector */}
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

            {/* Count slider */}
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

            {/* Sentence length range */}
            {mode !== "words" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Min words/sentence: {minLen}
                  </label>
                  <input
                    type="range"
                    min={3}
                    max={maxLen}
                    step={1}
                    value={minLen}
                    onChange={(e) => setMinLen(Number(e.target.value))}
                    className="w-full accent-pink"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Max words/sentence: {maxLen}
                  </label>
                  <input
                    type="range"
                    min={minLen}
                    max={30}
                    step={1}
                    value={maxLen}
                    onChange={(e) => setMaxLen(Number(e.target.value))}
                    className="w-full accent-pink"
                  />
                </div>
              </div>
            )}

            {/* Toggles row */}
            <div className="flex flex-wrap gap-3">
              <label
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer transition-colors ${
                  startWithLorem ? "bg-cat/5" : "bg-background"
                }`}
              >
                <input
                  type="checkbox"
                  checked={startWithLorem}
                  onChange={() => setStartWithLorem(!startWithLorem)}
                  className="w-4 h-4 rounded accent-pink"
                />
                <span className="text-sm">Start with opener</span>
              </label>

              <label
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer transition-colors ${
                  htmlMode ? "bg-cat/5" : "bg-background"
                }`}
              >
                <input
                  type="checkbox"
                  checked={htmlMode}
                  onChange={() => setHtmlMode(!htmlMode)}
                  className="w-4 h-4 rounded accent-pink"
                />
                <span className="text-sm">HTML output</span>
              </label>

              <button
                onClick={() => setShowCustom(!showCustom)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                  showCustom ? "bg-cat/5 text-foreground" : "bg-background text-muted hover:text-foreground"
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Custom words
              </button>
            </div>

            {/* Custom word list */}
            {showCustom && (
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Custom words <span className="text-muted font-normal">(mixed into generated text)</span>
                </label>
                <textarea
                  value={customWords}
                  onChange={(e) => setCustomWords(e.target.value)}
                  placeholder="Enter words separated by spaces, commas, or newlines..."
                  rows={3}
                  className="w-full px-4 py-3 neu-input text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                />
              </div>
            )}

            <button
              onClick={handleGenerate}
              className="w-full px-5 py-3.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Generate
            </button>
          </div>
        </div>

        {/* Output card */}
        <div className="neu-card p-5">
          {/* Stats row */}
          <div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-muted">
            <span className="font-semibold text-foreground">{stats.words} words</span>
            <span>&middot;</span>
            <span>{stats.chars} chars</span>
            {stats.paragraphs > 0 && (
              <>
                <span>&middot;</span>
                <span>{stats.paragraphs} paragraphs</span>
              </>
            )}
            <span>&middot;</span>
            <span>{stats.sentences} sentences</span>
            <span className="ml-auto" />
            {/* View toggle */}
            {htmlMode && (
              <div className="flex gap-1 bg-background rounded-lg p-0.5">
                <button
                  onClick={() => setViewRaw(true)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                    viewRaw ? "bg-primary text-white" : "text-muted hover:text-foreground"
                  }`}
                >
                  Raw
                </button>
                <button
                  onClick={() => setViewRaw(false)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                    !viewRaw ? "bg-primary text-white" : "text-muted hover:text-foreground"
                  }`}
                >
                  Preview
                </button>
              </div>
            )}
          </div>

          {/* Copy buttons */}
          <div className="flex gap-2 mb-3">
            <button
              onClick={copy}
              className="text-xs text-cat hover:text-cat/80 font-medium transition-colors"
            >
              Copy text
            </button>
            {htmlMode && (
              <button
                onClick={copyHtml}
                className="text-xs text-cat hover:text-cat/80 font-medium transition-colors"
              >
                Copy HTML
              </button>
            )}
          </div>

          {/* Output display */}
          <div className="p-4 rounded-xl bg-background text-sm leading-relaxed max-h-96 overflow-y-auto">
            {htmlMode && !viewRaw ? (
              <div
                className="prose prose-sm max-w-none [&_p]:mb-3 last:[&_p]:mb-0"
                dangerouslySetInnerHTML={{ __html: htmlOutput }}
              />
            ) : (
              <pre className="whitespace-pre-wrap font-sans">
                {htmlMode ? htmlOutput : output}
              </pre>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
