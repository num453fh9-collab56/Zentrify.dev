import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

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
  { name: "JSON → TypeScript", href: "/tools/json-to-typescript", color: "hover:text-primary text-primary/70" },
  { name: "CSS Generator", href: "/tools/css-generator", color: "hover:text-purple text-purple/70" },
  { name: "SVG → JSX", href: "/tools/svg-to-jsx", color: "hover:text-success text-success/70" },
  { name: "Shadow Generator", href: "/tools/tailwind-shadow", color: "hover:text-orange text-orange/70" },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      style={{ colorScheme: "light" }}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background">
        <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-surface-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Zentrify"
                width={36}
                height={36}
                className="rounded-lg"
              />
              <span className="font-semibold text-lg hidden sm:inline">
                Zentrify
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              {tools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className={`px-3 py-2 text-sm font-medium rounded-lg hover:bg-background transition-colors ${tool.color}`}
                >
                  {tool.name}
                </Link>
              ))}
            </nav>
            <MobileMenu />
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="mt-auto bg-surface border-t border-surface-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Image
                    src="/logo.png"
                    alt="Zentrify"
                    width={28}
                    height={28}
                    className="rounded-md"
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
                <p className="font-semibold mb-2">About</p>
                <p className="text-sm text-muted">
                  Zentrify provides 100% free, fast, and private developer
                  tools. Everything runs in your browser — no data is sent to
                  any server.
                </p>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-surface-border text-center text-sm text-muted">
              &copy; 2026 Zentrify. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

function MobileMenu() {
  return (
    <details className="md:hidden relative group">
      <summary className="list-none cursor-pointer p-2 rounded-lg hover:bg-background">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </summary>
      <div className="absolute right-0 mt-2 w-52 neu-card py-2 z-50">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className={`block px-4 py-2.5 text-sm font-medium hover:bg-background transition-colors ${tool.color}`}
          >
            {tool.name}
          </Link>
        ))}
      </div>
    </details>
  );
}
