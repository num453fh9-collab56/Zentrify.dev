import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Markdown Preview — Live Markdown Editor Online",
  description:
    "Free online Markdown editor with live preview. Write Markdown and see the rendered HTML in real time. Copy HTML output.",
  keywords: [
    "markdown preview",
    "markdown editor online",
    "markdown to html",
    "live markdown preview",
    "markdown renderer",
    "online markdown editor free",
  ],
  openGraph: {
    title: "Markdown Preview — Live Editor | Zentrify",
    description:
      "Free online Markdown editor with live preview. Write Markdown and see rendered HTML in real time.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
