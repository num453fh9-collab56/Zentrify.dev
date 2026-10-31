import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text Diff Checker - Compare Text Online",
  description:
    "Compare two texts and see the differences highlighted line by line. Free online diff checker by Zentrify — no signup required.",
  keywords: [
    "text diff checker",
    "compare text online",
    "diff tool",
    "text comparison",
    "find differences",
    "online diff",
    "code diff",
  ],
  openGraph: {
    title: "Text Diff Checker - Compare Text Online",
    description:
      "Compare two texts and see differences highlighted. Free online tool — no signup required.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
