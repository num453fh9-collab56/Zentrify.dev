import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lorem Ipsum Generator - Generate Placeholder Text",
  description:
    "Generate lorem ipsum placeholder text by paragraphs, sentences, or words. Free online lorem ipsum generator by Zentrify — no signup required.",
  keywords: [
    "lorem ipsum generator",
    "placeholder text",
    "dummy text generator",
    "lorem ipsum",
    "filler text",
    "sample text generator",
  ],
  openGraph: {
    title: "Lorem Ipsum Generator - Generate Placeholder Text",
    description:
      "Generate lorem ipsum placeholder text instantly. Free online tool — no signup required.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
