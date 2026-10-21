import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tailwind Shadow Generator - Free Box Shadow Tool",
  description:
    "Create custom box-shadows visually and get Tailwind CSS classes and raw CSS. Free online Tailwind shadow generator by Zentrify.",
  keywords: [
    "tailwind shadow generator",
    "tailwind box shadow",
    "css shadow generator",
    "tailwind shadow",
    "box shadow generator",
    "tailwind css shadow tool",
  ],
  openGraph: {
    title: "Tailwind Shadow Generator - Free Box Shadow Tool",
    description:
      "Create custom box-shadows visually and get Tailwind CSS classes and raw CSS. Free online tool.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
