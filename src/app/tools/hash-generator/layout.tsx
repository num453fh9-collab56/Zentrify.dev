import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hash Generator - MD5, SHA-1, SHA-256, SHA-512 Online",
  description:
    "Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from text instantly. Free online hash generator by Zentrify — no signup required.",
  keywords: [
    "hash generator",
    "md5 hash",
    "sha256 hash",
    "sha1 hash",
    "sha512 hash",
    "online hash tool",
    "text to hash",
    "checksum generator",
  ],
  openGraph: {
    title: "Hash Generator - MD5, SHA-1, SHA-256, SHA-512 Online",
    description:
      "Generate MD5, SHA-1, SHA-256, and SHA-512 hashes instantly. Free online tool — no signup required.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
