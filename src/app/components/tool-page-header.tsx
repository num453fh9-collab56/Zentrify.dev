"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { categoryLabels, toolConfig } from "../tools/tool-config";
import { FullscreenToggle } from "./fullscreen-toggle";

export function ToolPageHeader({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) {
  const pathname = usePathname();
  const slug = pathname.split("/").pop() || "";
  const meta = toolConfig[slug];

  if (!meta) return null;

  const Icon = meta.Icon;
  const displayTitle = title || meta.name;
  const displayDesc = description || meta.description;

  return (
    <div
      className="mb-8 pb-6 border-b border-surface-border"
      style={{ "--cat": `var(--cat-${meta.category})` } as React.CSSProperties}
    >
      <div className="flex items-center justify-between gap-4 mb-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1 text-[13px] text-muted">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            </li>
            <li aria-hidden="true"><ChevronRight className="w-3.5 h-3.5" /></li>
            <li>
              <Link href="/tools" className="hover:text-foreground transition-colors">Tools</Link>
            </li>
            <li aria-hidden="true"><ChevronRight className="w-3.5 h-3.5" /></li>
            <li className="text-foreground font-medium truncate" aria-current="page">{meta.name}</li>
          </ol>
        </nav>
        <FullscreenToggle />
      </div>

      <div className="flex items-start gap-4">
        <div className="w-12 h-12 flex-shrink-0 rounded-xl border border-cat/20 bg-cat/10 text-cat flex items-center justify-center">
          <Icon className="w-6 h-6" strokeWidth={1.8} />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-foreground leading-tight">
              {displayTitle}
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-surface-border text-xs font-medium text-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-cat" />
              {categoryLabels[meta.category] ?? meta.category}
            </span>
          </div>
          <p className="mt-1.5 text-muted max-w-2xl leading-relaxed">{displayDesc}</p>
        </div>
      </div>
    </div>
  );
}
