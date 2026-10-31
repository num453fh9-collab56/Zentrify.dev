import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HTML/CSS/JS Minifier - Minify Code Online",
  description:
    "Minify HTML, CSS, and JavaScript code online. Remove whitespace, comments, and unnecessary characters to reduce file size. Free minifier by Zentrify.",
  keywords: [
    "code minifier",
    "html minifier",
    "css minifier",
    "javascript minifier",
    "minify code online",
    "compress code",
    "reduce file size",
  ],
  openGraph: {
    title: "HTML/CSS/JS Minifier - Minify Code Online",
    description:
      "Minify HTML, CSS, and JavaScript code instantly. Free online tool — no signup required.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
