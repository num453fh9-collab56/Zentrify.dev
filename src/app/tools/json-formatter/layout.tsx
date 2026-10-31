import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Formatter & Validator - Format and Validate JSON Online",
  description:
    "Format, validate, and minify JSON data online. Pretty-print with customizable indentation, spot errors with line numbers. Free JSON tool by Zentrify.",
  keywords: [
    "json formatter",
    "json validator",
    "json beautifier",
    "json minifier",
    "json pretty print",
    "online json tool",
    "format json online",
  ],
  openGraph: {
    title: "JSON Formatter & Validator - Format and Validate JSON Online",
    description:
      "Format, validate, and minify JSON data instantly. Free online tool — no signup required.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
