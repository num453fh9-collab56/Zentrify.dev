import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { NavBar } from "./components/nav-bar";
import { Providers } from "./components/providers";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Zentrify - Free Developer & Designer Tools",
    template: "%s | Zentrify",
  },
  description:
    "Free online developer & designer utilities. JSON to TypeScript converter, CSS glassmorphism generator, SVG to JSX converter, Tailwind shadow generator and more.",
  keywords: [
    "developer tools",
    "designer tools",
    "json to typescript",
    "svg to jsx",
    "css generator",
    "tailwind shadow generator",
    "free online tools",
  ],
  openGraph: {
    title: "Zentrify - Free Developer & Designer Tools",
    description:
      "Free online developer & designer utilities. JSON to TypeScript, CSS generators, SVG to JSX and more.",
    type: "website",
    locale: "en_US",
    siteName: "Zentrify",
  },
};

const tools = [
  { name: "JSON → TypeScript", href: "/tools/json-to-typescript" },
  { name: "CSS Generator", href: "/tools/css-generator" },
  { name: "SVG → JSX", href: "/tools/svg-to-jsx" },
  { name: "Shadow Generator", href: "/tools/tailwind-shadow" },
  { name: "Regex Tester", href: "/tools/regex-tester" },
  { name: "Base64 Encoder", href: "/tools/base64-encoder" },
  { name: "Color Palette", href: "/tools/color-palette" },
  { name: "Markdown Preview", href: "/tools/markdown-preview" },
  { name: "Landing Pages", href: "/tools/landing-page-generator" },
  { name: "Password Generator", href: "/tools/password-generator" },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      style={{ colorScheme: "light" }}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background">
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
        <Providers>
          <NavBar />

          <main className="flex-1">{children}</main>

          <footer className="mt-auto bg-surface border-t border-surface-border">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <img
                      src="/logo.png"
                      alt="Zentrify"
                      width={40}
                      height={40}
                      className="logo-img"
                    />
                    <span className="font-semibold">Zentrify</span>
                  </div>
                  <p className="text-sm text-muted">
                    Free developer & designer utilities. Fast, private, no signup
                    required.
                  </p>
                </div>
                <div>
                  <p className="font-semibold mb-2">Tools</p>
                  <ul className="space-y-1">
                    {tools.map((tool) => (
                      <li key={tool.href}>
                        <Link
                          href={tool.href}
                          className="text-sm text-muted hover:text-primary transition-colors"
                        >
                          {tool.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-semibold mb-2">Links</p>
                  <ul className="space-y-1">
                    <li>
                      <Link
                        href="/contact"
                        className="text-sm text-muted hover:text-primary transition-colors"
                      >
                        Contact Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/#tools"
                        className="text-sm text-muted hover:text-primary transition-colors"
                      >
                        All Tools
                      </Link>
                    </li>
                  </ul>
                  <p className="text-sm text-muted mt-3">
                    Zentrify provides 100% free, fast, and private developer
                    tools.
                  </p>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-surface-border text-center text-sm text-muted">
                &copy; 2026 Zentrify. All rights reserved.
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}

