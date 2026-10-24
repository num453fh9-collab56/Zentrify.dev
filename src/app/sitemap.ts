import type { MetadataRoute } from "next";

const BASE_URL = "https://zentrify.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const tools = [
    "/tools/json-to-typescript",
    "/tools/css-generator",
    "/tools/svg-to-jsx",
    "/tools/tailwind-shadow",
    "/tools/regex-tester",
    "/tools/base64-encoder",
    "/tools/color-palette",
    "/tools/markdown-preview",
    "/tools/landing-page-generator",
  ];

  const toolEntries: MetadataRoute.Sitemap = tools.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...toolEntries,
  ];
}
