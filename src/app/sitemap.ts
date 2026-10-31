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
    "/tools/password-generator",
    "/tools/uuid-generator",
    "/tools/lorem-ipsum-generator",
    "/tools/timestamp-converter",
    "/tools/json-formatter",
    "/tools/hash-generator",
    "/tools/code-minifier",
    "/tools/image-to-base64",
    "/tools/text-diff-checker",
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
      url: `${BASE_URL}/tools`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...toolEntries,
  ];
}
