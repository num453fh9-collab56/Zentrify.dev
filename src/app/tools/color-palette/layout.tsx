import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Palette Generator — Shades & Tints from Any Color",
  description:
    "Generate a full color palette with shades, tints and complementary colors from any hex color. Copy CSS variables, Tailwind config, or hex values.",
  keywords: [
    "color palette generator",
    "color shades generator",
    "hex color palette",
    "tailwind color palette",
    "css color generator",
    "color tints and shades",
  ],
  openGraph: {
    title: "Color Palette Generator | Zentrify",
    description:
      "Generate shades, tints and complementary colors from any hex color. Export as CSS, Tailwind, or hex.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
