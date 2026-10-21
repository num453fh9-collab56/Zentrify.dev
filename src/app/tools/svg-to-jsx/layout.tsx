import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SVG to React JSX Converter - Free Online Tool",
  description:
    "Convert SVG code to React JSX components instantly. Auto-converts attributes to camelCase, wraps in a component. Free online SVG to JSX converter by Zentrify.",
  keywords: [
    "svg to jsx",
    "svg to react",
    "svg to jsx converter",
    "svg to react component",
    "convert svg to jsx online",
    "svg jsx online",
  ],
  openGraph: {
    title: "SVG to React JSX Converter - Free Online Tool",
    description:
      "Convert SVG code to React JSX components instantly. Free tool — no signup required.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
