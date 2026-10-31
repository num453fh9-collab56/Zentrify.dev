import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UUID Generator - Generate Random UUIDs Online",
  description:
    "Generate random UUID v4 strings instantly. Bulk generate, customize format, copy with one click. Free online UUID generator by Zentrify — no signup required.",
  keywords: [
    "uuid generator",
    "uuid v4",
    "random uuid",
    "guid generator",
    "unique id generator",
    "online uuid tool",
    "bulk uuid generator",
  ],
  openGraph: {
    title: "UUID Generator - Generate Random UUIDs Online",
    description:
      "Generate random UUID v4 strings instantly. Free online tool — no signup required.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
