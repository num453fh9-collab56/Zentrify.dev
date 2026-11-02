import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { NavBar } from "./components/nav-bar";
import { Providers } from "./components/providers";
import { KeyboardShortcuts } from "./components/keyboard-shortcuts";
import { PageProgress } from "./components/page-progress";
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

const footerLinks = [
  {
    title: "Popular tools",
    links: [
      { name: "JSON → TypeScript", href: "/tools/json-to-typescript" },
      { name: "Regex Tester", href: "/tools/regex-tester" },
      { name: "Color Palette", href: "/tools/color-palette" },
      { name: "Password Generator", href: "/tools/password-generator" },
      { name: "JSON Formatter", href: "/tools/json-formatter" },
      { name: "All tools →", href: "/tools" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ],
  },
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
      <head>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
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
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[300] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-primary focus:text-white focus:text-sm focus:font-medium focus:outline-none"
          >
            Skip to main content
          </a>
          <PageProgress />
          <NavBar />
          <KeyboardShortcuts />

          <main id="main-content" className="flex-1" tabIndex={-1}>{children}</main>

          <footer className="mt-auto border-t border-surface-border bg-surface">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-10">
                {/* Brand */}
                <div className="col-span-2 sm:col-span-1">
                  <Link href="/" className="inline-flex items-center gap-2 mb-3">
                    <Image src="/logo.png" alt="" width={28} height={28} className="logo-img" />
                    <span className="font-bold">Zentrify</span>
                  </Link>
                  <p className="text-sm text-muted leading-relaxed max-w-[240px]">
                    Free developer &amp; designer tools that run in your browser.
                  </p>
                </div>

                {footerLinks.map((group) => (
                  <div key={group.title}>
                    <p className="text-sm font-semibold text-foreground mb-3">{group.title}</p>
                    <ul className="space-y-2">
                      {group.links.map((link) => (
                        <li key={link.href}>
                          <Link href={link.href} className="text-sm text-muted hover:text-foreground transition-colors">
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-6 border-t border-surface-border text-xs text-muted">
                &copy; 2026 Zentrify
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}

