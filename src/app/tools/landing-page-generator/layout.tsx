import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Landing Page Templates - 500+ Designs with HTML/CSS Code",
  description:
    "Browse 500+ free landing page templates for any industry. Preview, customize colors, and copy clean HTML/CSS code instantly. No signup required.",
  keywords: [
    "free landing page templates",
    "landing page generator",
    "free website templates",
    "html landing page",
    "landing page with code",
    "free html templates",
    "website template generator",
    "landing page design",
    "responsive landing page",
    "copy paste landing page",
  ],
  openGraph: {
    title: "Free Landing Page Templates - 500+ Designs with Code",
    description:
      "Browse 500+ free landing page templates. Preview, customize, and copy HTML/CSS code instantly.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
