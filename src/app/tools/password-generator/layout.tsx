import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Password Generator - Create Strong, Secure Passwords",
  description:
    "Generate strong, random passwords with customizable length, characters, and options. Free online password generator by Zentrify — no signup required.",
  keywords: [
    "password generator",
    "strong password",
    "random password",
    "secure password generator",
    "online password generator",
    "free password tool",
  ],
  openGraph: {
    title: "Password Generator - Create Strong, Secure Passwords",
    description:
      "Generate strong, random passwords instantly. Free online tool — no signup required.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
