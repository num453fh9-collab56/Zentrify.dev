import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tutorials, tips, and guides for developers and designers. Learn how to use Zentrify tools effectively.",
  openGraph: {
    title: "Zentrify Blog",
    description:
      "Developer tutorials, tips, and guides. Learn about JSON, TypeScript, CSS, and more.",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
