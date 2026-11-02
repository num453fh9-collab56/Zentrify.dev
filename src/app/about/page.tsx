"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const values = [
  {
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    title: "Speed First",
    desc: "Every tool runs instantly in your browser. No server round-trips, no waiting.",
    gradient: "from-[#7a52b3] to-[#2fb9b3]",
  },
  {
    icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
    title: "Privacy by Default",
    desc: "Your data never leaves your browser. We don't track, log, or store anything you type.",
    gradient: "from-[#2fb9b3] to-[#8fa98f]",
  },
  {
    icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "Free Forever",
    desc: "No signup, no premium tier, no paywalls. Every tool is free for everyone.",
    gradient: "from-[#8fa98f] to-[#b9b99d]",
  },
  {
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    title: "Developer-Focused",
    desc: "Built by developers, for developers. Every tool solves a real workflow problem.",
    gradient: "from-[#c99bb5] to-[#7a52b3]",
  },
];

const stack = [
  { name: "Next.js", desc: "React framework", initials: "NE", color: "from-[#7a52b3] to-[#6742a0]" },
  { name: "TypeScript", desc: "Type-safe code", initials: "TS", color: "from-[#2fb9b3] to-[#26a09b]" },
  { name: "Tailwind CSS", desc: "Utility-first styling", initials: "TW", color: "from-[#8fa98f] to-[#7a8f7a]" },
  { name: "Framer Motion", desc: "Smooth animations", initials: "FM", color: "from-[#9d7bd1] to-[#7a52b3]" },
  { name: "Vercel", desc: "Edge deployment", initials: "VE", color: "from-[#2f2940] to-[#1f1a2e]" },
  { name: "React 19", desc: "Latest React", initials: "R19", color: "from-[#38bdf8] to-[#0ea5e9]" },
];

export default function AboutPage() {
  return (
    <section className="relative py-16 px-4 sm:px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#7a52b3]/10 via-[#2fb9b3]/8 to-[#c99bb5]/10 rounded-full blur-3xl -z-10" />
      
      <div className="max-w-5xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-primary text-sm font-semibold mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
            About Zentrify
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl heading-xl mb-6">
            Tools that respect your
            <br />
            <span className="bg-gradient-to-r from-[#7a52b3] via-[#2fb9b3] to-[#c99bb5] bg-clip-text text-transparent animate-gradient">
              time & privacy
            </span>
          </h1>
          <p className="text-lg sm:text-xl body-lg max-w-2xl mx-auto">
            A curated collection of free, lightning-fast, browser-based developer and designer utilities.
            <span className="text-foreground font-medium"> No accounts. No tracking. Just tools that work.</span>
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="relative mb-20"
        >
          <div className="neu-card p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#7a52b3]/8 to-transparent rounded-full blur-2xl" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#7a52b3] to-[#2fb9b3] flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl heading-lg">Our Mission</h2>
              </div>
              <div className="space-y-4 body-lg text-base sm:text-lg">
                <p>
                  Every developer has a dozen browser tabs open with scattered tools — JSON formatters here,
                  color pickers there, regex testers somewhere else. Most of them are bloated with ads,
                  require signups, or quietly send your data to their servers.
                </p>
                <p>
                  <span className="text-foreground font-medium">Zentrify brings all those tools under one roof.</span> Every tool runs entirely in your browser
                  using client-side JavaScript. Your code, your data, your passwords — none of it ever
                  touches a server. We built this because we needed it ourselves, and we think you do too.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c99bb5]/10 text-[#b88aa6] text-sm font-semibold mb-4">
              Core Principles
            </div>
            <h2 className="text-2xl sm:text-4xl heading-lg mb-3">What We Stand For</h2>
            <p className="body-lg max-w-lg mx-auto">The values that guide everything we build</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.08 }}
                className="group relative neu-card p-7 hover:shadow-xl transition-all duration-500 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${v.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${v.gradient} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-lg`}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d={v.icon} />
                    </svg>
                  </div>
                  <h3 className="text-lg heading-md mb-2 group-hover:text-primary transition-colors duration-300">
                    {v.title}
                  </h3>
                  <p className="text-sm body-md">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-20"
        >
          <div className="neu-card p-8 sm:p-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                { num: "18+", label: "Free Tools", gradient: "from-[#7a52b3] to-[#2fb9b3]" },
                { num: "0", label: "Data Collected", gradient: "from-[#2fb9b3] to-[#8fa98f]" },
                { num: "100%", label: "Client-Side", gradient: "from-[#8fa98f] to-[#c99bb5]" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.35 + i * 0.1 }}
                  className="text-center group"
                >
                  <div className={`text-4xl sm:text-5xl font-bold mb-2 bg-gradient-to-r ${s.gradient} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
                    {s.num}
                  </div>
                  <div className="text-sm font-medium text-muted">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2fb9b3]/10 text-[#26a09b] text-sm font-semibold mb-4">
              Tech Stack
            </div>
            <h2 className="text-2xl sm:text-4xl heading-lg mb-3">Built With Modern Tools</h2>
            <p className="body-lg max-w-lg mx-auto">Crafted with cutting-edge technologies for performance and elegance</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {stack.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                className="neu-card p-5 text-center group hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} text-white flex items-center justify-center mx-auto mb-3 text-xs font-bold group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-md`}>
                  {s.initials}
                </div>
                <p className="font-semibold text-sm mb-0.5">{s.name}</p>
                <p className="text-xs text-muted">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="relative neu-card p-10 sm:p-12 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#7a52b3]/10 via-[#2fb9b3]/8 to-[#c99bb5]/10" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7a52b3] to-[#2fb9b3] flex items-center justify-center mx-auto mb-6 shadow-xl">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <h2 className="text-2xl sm:text-4xl heading-lg mb-4">Want to Contribute?</h2>
              <p className="body-lg max-w-lg mx-auto mb-8 text-lg">
                Zentrify is actively growing. Have a tool idea or found a bug?
                <span className="text-foreground font-medium"> We&apos;d love to hear from you.</span>
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#7a52b3] to-[#2fb9b3] text-white font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Get in Touch
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
