import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Zentrify — free, fast, browser-based developer and designer tools. No signup, no tracking, no data collection.",
  openGraph: {
    title: "About Zentrify",
    description:
      "Free developer & designer tools that run in your browser. Learn about our mission, values, and tech stack.",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
