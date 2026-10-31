import { ArrowRight, ImageIcon } from "lucide-react";

// Small static glimpses of each tool's UI, shown at the top of tool cards.
// Colors use `cat`, which the card sets to its category tint.

function Arrow() {
  return <ArrowRight className="w-3.5 h-3.5 text-muted flex-shrink-0" />;
}

function Code({ children, accent }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <span
      className={`px-2 py-1 rounded-md border truncate shadow-[0_1px_0_rgba(0,0,0,0.03)] ${
        accent ? "border-cat/30 bg-cat/10 text-cat" : "border-surface-border bg-surface text-foreground"
      }`}
    >
      {children}
    </span>
  );
}

function Convert({ from, to, label }: { from: React.ReactNode; to: React.ReactNode; label?: string }) {
  return (
    <div className="flex flex-col items-center gap-2 min-w-0 max-w-full">
      <div className="flex items-center gap-2 min-w-0 max-w-full">
        <Code>{from}</Code>
        <Arrow />
        <Code accent>{to}</Code>
      </div>
      {label && <span className="font-sans text-[10px] uppercase tracking-wider text-muted">{label}</span>}
    </div>
  );
}

function Mark({ children }: { children: React.ReactNode }) {
  return <mark className="bg-cat/15 text-cat rounded px-0.5">{children}</mark>;
}

function Window({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-lg border border-surface-border bg-surface shadow-[0_1px_2px_rgba(0,0,0,0.04)] ${className}`}>
      <div className="flex gap-1 px-2 py-1.5 border-b border-surface-border">
        <span className="w-1.5 h-1.5 rounded-full bg-foreground/15" />
        <span className="w-1.5 h-1.5 rounded-full bg-foreground/15" />
        <span className="w-1.5 h-1.5 rounded-full bg-foreground/15" />
      </div>
      <div className="p-2.5">{children}</div>
    </div>
  );
}

// Shades derived from the category tint so the palette always matches the card
const shadeMix = ["15%", "35%", "60%", "100%"];

const previews: Record<string, () => React.ReactNode> = {
  "/tools/json-to-typescript": () => (
    <Window className="w-52">
      <div className="space-y-0.5 leading-5">
        <p><span className="text-cat">interface</span> User {"{"}</p>
        <p className="pl-3">id: <span className="text-cat">number</span>;</p>
        <p className="pl-3">name: <span className="text-cat">string</span>;</p>
        <p>{"}"}</p>
      </div>
    </Window>
  ),
  "/tools/css-generator": () => (
    <div className="relative w-40 h-20">
      <span className="absolute left-3 top-0 w-14 h-14 rounded-full bg-cat/50" />
      <span className="absolute right-4 bottom-0 w-10 h-10 rounded-full bg-cat/30" />
      <span className="absolute inset-x-5 inset-y-3 rounded-xl border border-white/70 bg-white/45 backdrop-blur-md shadow-sm flex items-center justify-center text-[10px] text-foreground/70">
        backdrop-blur
      </span>
    </div>
  ),
  "/tools/svg-to-jsx": () => <Convert from="stroke-width" to="strokeWidth" label="SVG → React" />,
  "/tools/tailwind-shadow": () => (
    <div className="flex items-end gap-3">
      {[
        ["sm", "shadow-sm"],
        ["md", "shadow-md"],
        ["xl", "shadow-xl"],
      ].map(([label, cls]) => (
        <span
          key={label}
          className={`w-12 h-12 rounded-lg bg-surface border border-surface-border ${cls} flex items-center justify-center text-muted`}
        >
          {label}
        </span>
      ))}
    </div>
  ),
  "/tools/regex-tester": () => (
    <Window className="w-52">
      <p className="text-muted mb-1.5">/\d+/g</p>
      <p className="text-foreground">
        Order <Mark>42</Mark> of <Mark>7</Mark> items
      </p>
    </Window>
  ),
  "/tools/base64-encoder": () => <Convert from="hello" to="aGVsbG8=" label="Encode" />,
  "/tools/color-palette": () => (
    <div className="flex gap-1.5">
      {shadeMix.map((m) => (
        <span
          key={m}
          className="w-9 h-14 rounded-lg border border-black/5"
          style={{ background: `color-mix(in oklab, var(--cat) ${m}, white)` }}
        />
      ))}
      <span
        className="w-9 h-14 rounded-lg border border-black/5"
        style={{ background: "color-mix(in oklab, var(--cat) 70%, black)" }}
      />
    </div>
  ),
  "/tools/markdown-preview": () => (
    <Window className="w-52">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1 text-muted">
          <p># Title</p>
          <p>**bold**</p>
          <p>- item</p>
        </div>
        <div className="space-y-1 font-sans border-l border-surface-border pl-3">
          <p className="text-[13px] font-bold text-foreground leading-tight">Title</p>
          <p className="font-semibold text-foreground">bold</p>
          <p className="text-foreground">• item</p>
        </div>
      </div>
    </Window>
  ),
  "/tools/landing-page-generator": () => (
    <Window className="w-44">
      <div className="space-y-1.5">
        <div className="flex justify-between">
          <span className="w-6 h-1 rounded bg-foreground/30" />
          <span className="w-12 h-1 rounded bg-foreground/15" />
        </div>
        <div className="h-6 rounded bg-cat/20 flex items-center justify-center">
          <span className="w-12 h-1 rounded bg-cat/60" />
        </div>
        <div className="grid grid-cols-3 gap-1">
          <span className="h-4 rounded bg-foreground/10" />
          <span className="h-4 rounded bg-foreground/10" />
          <span className="h-4 rounded bg-foreground/10" />
        </div>
      </div>
    </Window>
  ),
  "/tools/password-generator": () => (
    <div className="space-y-2 w-44">
      <div className="flex items-center justify-between px-2.5 py-1.5 rounded-md border border-surface-border bg-surface">
        <span className="text-foreground">k8#Qz!m2Lp@7</span>
      </div>
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="h-1 flex-1 rounded-full bg-cat" />
        ))}
      </div>
      <p className="font-sans text-[10px] text-cat font-medium">Very strong</p>
    </div>
  ),
  "/tools/uuid-generator": () => (
    <div className="space-y-1.5">
      {["3f2b9c1e-7a4d-4e8b", "a91c04d2-5b3f-41c7", "e6d8f210-9c2a-4d5e"].map((id, i) => (
        <p key={id} className={i === 0 ? "text-cat" : "text-muted"}>
          {id}…
        </p>
      ))}
    </div>
  ),
  "/tools/lorem-ipsum-generator": () => (
    <Window className="w-48">
      <p className="font-sans text-[11px] leading-4 text-foreground/70 line-clamp-3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
      </p>
    </Window>
  ),
  "/tools/timestamp-converter": () => <Convert from="1761696000" to="Oct 29, 2026" label="Unix → Date" />,
  "/tools/json-formatter": () => (
    <div className="flex items-center gap-3">
      <Code>{'{"a":1,"b":2}'}</Code>
      <Arrow />
      <pre className="leading-4 text-foreground">
        {"{\n  "}
        <span className="text-cat">&quot;a&quot;</span>
        {": 1,\n  "}
        <span className="text-cat">&quot;b&quot;</span>
        {": 2\n}"}
      </pre>
    </div>
  ),
  "/tools/hash-generator": () => (
    <div className="space-y-1.5 w-48">
      {[
        ["MD5", "5d41402a bc4b2a76…"],
        ["SHA-256", "2cf24dba 5fb0a30e…"],
      ].map(([algo, hash]) => (
        <div key={algo} className="flex items-center justify-between gap-2">
          <span className="font-sans text-[10px] text-muted w-12">{algo}</span>
          <span className="text-cat truncate">{hash}</span>
        </div>
      ))}
    </div>
  ),
  "/tools/code-minifier": () => (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        <Code>a + b ;</Code>
        <Arrow />
        <Code accent>a+b</Code>
      </div>
      <span className="font-sans text-[10px] font-semibold px-1.5 py-0.5 rounded bg-cat/10 text-cat">−42% size</span>
    </div>
  ),
  "/tools/image-to-base64": () => (
    <div className="flex items-center gap-2 min-w-0 max-w-full">
      <span className="w-10 h-10 flex-shrink-0 rounded-lg border border-surface-border bg-surface flex items-center justify-center">
        <ImageIcon className="w-5 h-5 text-cat" />
      </span>
      <Arrow />
      <Code accent>data:image/png;base64,iVBOR…</Code>
    </div>
  ),
  "/tools/text-diff-checker": () => (
    <Window className="w-48">
      <div className="space-y-0.5">
        <p className="text-muted px-1.5 whitespace-pre">  margin: 0;</p>
        <p className="px-1.5 rounded bg-error/10 text-error">- color: red;</p>
        <p className="px-1.5 rounded bg-success/10 text-success">+ color: blue;</p>
      </div>
    </Window>
  ),
};

export function ToolPreview({ href }: { href: string }) {
  const render = previews[href];
  return (
    <div className="h-32 px-5 flex items-center justify-center font-mono text-[11px] overflow-hidden" aria-hidden="true">
      {render?.()}
    </div>
  );
}
