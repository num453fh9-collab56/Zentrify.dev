"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { ToolPageExtras } from "../components/tool-page-extras";
import { trackToolVisit } from "../components/command-palette";
import { toolConfig } from "./tool-config";

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const isToolPage = segments.length >= 2 && segments[0] === "tools";

  useEffect(() => {
    if (isToolPage) trackToolVisit(pathname);
  }, [pathname, isToolPage]);

  // Every tool page picks up its category tint as `cat` (text-cat, bg-cat/10, ...)
  const category = toolConfig[segments[1]]?.category;

  return (
    <div style={category ? ({ "--cat": `var(--cat-${category})` } as React.CSSProperties) : undefined}>
      {children}
      <ToolPageExtras />
    </div>
  );
}
