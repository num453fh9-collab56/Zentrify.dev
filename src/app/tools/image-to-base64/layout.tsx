import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image to Base64 Converter - Encode Images Online",
  description:
    "Convert images to Base64 encoded strings online. Drag and drop or upload PNG, JPG, GIF, SVG, WebP files. Free image encoder by Zentrify.",
  keywords: [
    "image to base64",
    "base64 encoder",
    "image encoder",
    "convert image to base64",
    "data uri generator",
    "base64 image",
    "online image converter",
  ],
  openGraph: {
    title: "Image to Base64 Converter - Encode Images Online",
    description:
      "Convert images to Base64 strings instantly. Free online tool — no signup required.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
