import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSS Glassmorphism & Gradient Generator - Free Online Tool",
  description:
    "Generate beautiful glassmorphism effects and CSS gradients with live preview. Free online CSS generator by Zentrify — copy-ready code instantly.",
  keywords: [
    "glassmorphism generator",
    "css gradient generator",
    "glass effect css",
    "frosted glass css",
    "css gradient maker",
    "backdrop blur generator",
    "glassmorphism css",
  ],
  openGraph: {
    title: "CSS Glassmorphism & Gradient Generator - Free Online Tool",
    description:
      "Generate beautiful glassmorphism effects and CSS gradients with live preview. Free tool — copy-ready code instantly.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
