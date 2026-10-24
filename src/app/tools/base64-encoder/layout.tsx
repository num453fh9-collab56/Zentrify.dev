import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Base64 Encoder & Decoder — Encode Decode Online",
  description:
    "Free online Base64 encoder and decoder. Convert text to Base64 and Base64 to text instantly. Supports UTF-8.",
  keywords: [
    "base64 encoder",
    "base64 decoder",
    "base64 encode online",
    "base64 decode online",
    "text to base64",
    "base64 to text",
  ],
  openGraph: {
    title: "Base64 Encoder & Decoder | Zentrify",
    description:
      "Free online Base64 encoder and decoder. Convert text to Base64 and back instantly.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
