import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Landing Page Templates - 60+ Designs with HTML Code",
  description:
    "Browse 60+ free landing page templates for any industry, including hand-picked premium designs. Preview, pick a color theme, and copy or download the HTML. No signup required.",
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
    title: "Free Landing Page Templates - 60+ Designs with Code",
    description:
      "Browse 60+ free landing page templates. Preview, pick a theme, and copy or download the HTML.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
