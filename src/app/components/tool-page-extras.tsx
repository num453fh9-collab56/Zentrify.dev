"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { ArrowRight, Check, ChevronDown, Link2 } from "lucide-react";
import { toolSEOData } from "../tools/tool-seo-data";
import { categoryLabels, toolConfig } from "../tools/tool-config";

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 py-4 text-left cursor-pointer group"
      >
        <span className="font-medium text-[15px] text-foreground group-hover:text-primary transition-colors">{q}</span>
        <ChevronDown
          className={`w-4 h-4 flex-shrink-0 text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`grid transition-all duration-200 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <p className="overflow-hidden text-sm text-muted leading-relaxed pr-8">
          <span className="block pb-4">{a}</span>
        </p>
      </div>
    </div>
  );
}

const subscribeNoop = () => () => {};

export function ShareButtons() {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);
  // Empty on the server and during hydration, the real URL right after
  const fullUrl = useSyncExternalStore(subscribeNoop, () => window.location.href, () => "");

  const slug = pathname.split("/").filter(Boolean).pop() ?? "";
  const name = toolConfig[slug]?.name || "Zentrify Tool";

  const shareText = `Check out ${name} on Zentrify - free, fast, and private!`;

  const handleCopy = () => {
    if (!fullUrl) return;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const btn =
    "inline-flex items-center gap-1.5 h-8 px-3 rounded-lg border border-surface-border bg-surface text-xs font-medium text-muted hover:text-foreground hover:border-primary/40 transition-colors cursor-pointer";

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs text-muted mr-1">Share</span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(fullUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
        className={btn}
      >
        𝕏
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className={btn}
      >
        in
      </a>
      <button onClick={handleCopy} className={btn}>
        {copied ? <Check className="w-3.5 h-3.5 text-success" /> : <Link2 className="w-3.5 h-3.5" />}
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}

export function ToolPageExtras() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const slug = segments[segments.length - 1];
  const data = toolSEOData[slug];

  if (!data) return null;

  const siteUrl = "https://zentrify.tools";
  const toolUrl = `${siteUrl}/tools/${slug}`;

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: data.name,
    description: data.whatIs.slice(0, 200),
    url: toolUrl,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    author: { "@type": "Organization", name: "Zentrify", url: siteUrl },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${siteUrl}/tools` },
      { "@type": "ListItem", position: 3, name: data.name, item: toolUrl },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to Use ${data.name}`,
    step: data.howTo.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.step,
      text: s.detail,
    })),
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-20 space-y-14 mt-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-surface-border">
        <p className="text-sm text-muted">Found {data.name} useful? Share it with your team.</p>
        <ShareButtons />
      </div>

      {/* How to Use */}
      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-6">How to use {data.name}</h2>
        <ol className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
          {data.howTo.map((s, i) => (
            <li key={i} className="flex gap-4">
              <span className="flex-shrink-0 w-7 h-7 rounded-full border border-surface-border bg-surface text-xs font-semibold text-foreground flex items-center justify-center">
                {i + 1}
              </span>
              <div>
                <h3 className="font-medium text-[15px] text-foreground mb-1">{s.step}</h3>
                <p className="text-sm text-muted leading-relaxed">{s.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* What Is */}
      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">What is {data.name}?</h2>
        <p className="text-[15px] text-muted leading-[1.75]">{data.whatIs}</p>
      </section>

      {/* FAQ */}
      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-2">Frequently asked questions</h2>
        <div className="divide-y divide-surface-border border-y border-surface-border">
          {data.faqs.map((f, i) => (
            <FAQItem key={i} q={f.q} a={f.a} />
          ))}
        </div>
      </section>

      {/* Related Tools */}
      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-6">Related tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {data.related.map((slug) => {
            const tool = toolConfig[slug];
            if (!tool) return null;
            const Icon = tool.Icon;
            return (
              <Link
                key={slug}
                href={`/tools/${slug}`}
                style={{ "--cat": `var(--cat-${tool.category})` } as React.CSSProperties}
                className="group flex flex-col p-4 rounded-xl border border-surface-border bg-surface hover:border-cat/40 hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="w-9 h-9 rounded-lg bg-cat/10 text-cat flex items-center justify-center">
                    <Icon className="w-[18px] h-[18px]" strokeWidth={1.8} />
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-cat transition-all" />
                </div>
                <p className="font-semibold text-sm text-foreground">{tool.name}</p>
                <p className="text-xs text-muted mt-0.5">{tool.tagline}</p>
                <p className="flex items-center gap-1.5 mt-3 text-[11px] font-medium text-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-cat" />
                  {categoryLabels[tool.category]}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
