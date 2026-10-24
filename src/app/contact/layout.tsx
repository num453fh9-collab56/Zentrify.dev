import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the Zentrify team. We'd love to hear your feedback, suggestions, or questions about our developer tools.",
  openGraph: {
    title: "Contact Us | Zentrify",
    description:
      "Get in touch with the Zentrify team. We'd love to hear your feedback or suggestions.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
