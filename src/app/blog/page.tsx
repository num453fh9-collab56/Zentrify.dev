"use client";

import Link from "next/link";
import { m } from "framer-motion";

const posts = [
  {
    title: "JSON to TypeScript: Why You Should Automate Type Generation",
    excerpt: "Stop writing TypeScript interfaces by hand. Learn how automatic JSON-to-TS conversion saves hours and eliminates type mismatches in your API layer.",
    category: "Guides",
    date: "Coming Soon",
    gradient: "from-[#7a52b3] to-[#6742a0]",
    icon: "M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5",
    slug: "#",
  },
  {
    title: "Regex Demystified: A Visual Guide for Developers",
    excerpt: "Regular expressions don't have to be scary. A practical walkthrough of patterns you'll use every day, with live examples you can test instantly.",
    category: "Tutorials",
    date: "Coming Soon",
    gradient: "from-[#c99bb5] to-[#b88aa6]",
    icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
    slug: "#",
  },
  {
    title: "The Complete Guide to Base64 Encoding",
    excerpt: "What is Base64, when should you use it, and when shouldn't you? Understanding encoding vs encryption and real-world use cases.",
    category: "Deep Dives",
    date: "Coming Soon",
    gradient: "from-[#2fb9b3] to-[#38c4be]",
    icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
    slug: "#",
  },
  {
    title: "CSS Glassmorphism: Creating Modern UI Effects",
    excerpt: "Master the glassmorphism trend. Learn backdrop-filter, frosted glass cards, and how to make them accessible and performant.",
    category: "Design",
    date: "Coming Soon",
    gradient: "from-[#7a52b3] to-[#9d7bd1]",
    icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343",
    slug: "#",
  },
  {
    title: "Password Security in 2026: What Developers Need to Know",
    excerpt: "From entropy to hashing — how password generators work under the hood, and what makes a password truly secure against modern attacks.",
    category: "Security",
    date: "Coming Soon",
    gradient: "from-[#2fb9b3] to-[#3dccc6]",
    icon: "M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z",
    slug: "#",
  },
  {
    title: "Building a Color System: From Palette to Production",
    excerpt: "How to create, test, and implement a consistent color palette for your design system. Covers contrast ratios, dark mode, and accessibility.",
    category: "Design",
    date: "Coming Soon",
    gradient: "from-[#c99bb5] to-[#d9a9c4]",
    icon: "M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402",
    slug: "#",
  },
];

const categories = ["All", "Guides", "Tutorials", "Deep Dives", "Design", "Security"];

export default function BlogPage() {
  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Hero */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-primary text-sm font-semibold mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
            Blog
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl heading-xl mb-5">
            Tutorials, Guides &
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-accent-3 bg-clip-text text-transparent">
              Developer Insights
            </span>
          </h1>
          <p className="text-lg body-lg max-w-2xl mx-auto">
            Practical articles to help you write better code, build faster UIs, and understand the tools you use every day.
          </p>
        </m.div>

        {/* Category pills */}
        <m.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-12"
        >
          {categories.map((cat, i) => (
            <span
              key={cat}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-default ${
                i === 0
                  ? "bg-primary text-white shadow-md"
                  : "bg-surface border border-surface-border text-muted"
              }`}
            >
              {cat}
            </span>
          ))}
        </m.div>

        {/* Coming soon banner */}
        <m.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mb-10"
        >
          <div className="relative neu-card p-5 sm:p-6 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-accent-3/5" />
            <div className="relative flex items-center gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-warning" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-sm">Articles launching soon</p>
                <p className="text-xs text-muted">We&apos;re putting the finishing touches on our first batch of articles. Here&apos;s a preview of what&apos;s coming.</p>
              </div>
            </div>
          </div>
        </m.div>

        {/* Post grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post, i) => (
            <m.div
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.06 }}
            >
              <div className="group neu-card h-full overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                {/* Gradient header strip */}
                <div className={`h-1.5 bg-gradient-to-r ${post.gradient}`} />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gradient-to-r ${post.gradient} bg-opacity-10 text-xs font-semibold`} style={{ background: 'var(--surface)', color: 'var(--primary)' }}>
                      <div className={`w-5 h-5 rounded bg-gradient-to-br ${post.gradient} flex items-center justify-center`}>
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d={post.icon} />
                        </svg>
                      </div>
                      {post.category}
                    </span>
                    <span className="text-[11px] text-muted font-medium">{post.date}</span>
                  </div>
                  <h3 className="text-base heading-md mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm body-md line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-5 pt-4 border-t border-surface-border/50 flex items-center justify-between">
                    <span className="text-xs text-muted">5 min read</span>
                    <span className="text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      Read article
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </m.div>
          ))}
        </div>

        {/* Newsletter CTA */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16"
        >
          <div className="relative neu-card p-8 sm:p-10 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-5 shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <h2 className="text-2xl heading-lg mb-3">Don&apos;t miss new articles</h2>
              <p className="body-lg max-w-md mx-auto mb-6">
                Get notified when we publish new tutorials and guides. No spam, unsubscribe anytime.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 shadow-md"
              >
                Get in Touch
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
