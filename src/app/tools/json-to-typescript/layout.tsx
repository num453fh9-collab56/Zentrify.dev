import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON to TypeScript Converter - Generate Interfaces & Zod Schemas",
  description:
    "Convert JSON to TypeScript interfaces or Zod schemas instantly. Free online JSON to TypeScript converter by Zentrify — no signup required.",
  keywords: [
    "json to typescript",
    "json to typescript converter",
    "json to interface",
    "json to zod",
    "json to zod schema",
    "typescript interface generator",
    "online json converter",
  ],
  openGraph: {
    title: "JSON to TypeScript Converter - Generate Interfaces & Zod Schemas",
    description:
      "Convert JSON to TypeScript interfaces or Zod schemas instantly. Free online tool — no signup required.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
