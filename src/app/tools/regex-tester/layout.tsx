import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regex Tester — Test Regular Expressions Online",
  description:
    "Free online regex tester. Test and debug regular expressions with real-time matching, capture groups, and common pattern library.",
  keywords: [
    "regex tester",
    "regex tester online",
    "regular expression tester",
    "regex debugger",
    "test regex online free",
    "javascript regex tester",
  ],
  openGraph: {
    title: "Regex Tester — Test Regular Expressions Online | Zentrify",
    description:
      "Free online regex tester with real-time matching, capture groups, and common pattern library.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
