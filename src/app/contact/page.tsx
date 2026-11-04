"use client";

import { useState } from "react";
import { m } from "framer-motion";

type FormState = "idle" | "sending" | "success" | "error";

const contactInfo = [
  {
    icon: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75",
    title: "Email Us",
    desc: "For any questions or feedback",
    value: "hello@zentrify.dev",
    gradient: "from-[#7a52b3] to-[#2fb9b3]",
  },
  {
    icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "Response Time",
    desc: "We typically reply within",
    value: "24 hours",
    gradient: "from-[#2fb9b3] to-[#8fa98f]",
  },
  {
    icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "Open Source",
    desc: "Contribute on GitHub",
    value: "Coming Soon",
    gradient: "from-[#c99bb5] to-[#7a52b3]",
  },
];

const faq = [
  { q: "Is Zentrify really free?", a: "Yes, all tools are free with no premium tier, no signup, and no usage limits." },
  { q: "Is my data safe?", a: "Everything runs in your browser. We never send your data to any server." },
  { q: "Can I suggest a new tool?", a: "Absolutely! Use the form to send us your tool ideas. We review every suggestion." },
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setState("success");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      setState("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to send message");
    }
  };

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
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
            Contact
          </div>
          <h1 className="text-4xl sm:text-5xl heading-xl mb-5">
            Get in Touch
          </h1>
          <p className="text-lg body-lg max-w-xl mx-auto">
            Have feedback, a tool suggestion, or just want to say hi? We&apos;d love to hear from you.
          </p>
        </m.div>

        {/* Info cards */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12"
        >
          {contactInfo.map((info, i) => (
            <m.div
              key={info.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.06 }}
              className="group neu-card p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${info.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />
              <div className="relative z-10">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${info.gradient} flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={info.icon} />
                  </svg>
                </div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted/60 mb-1">{info.title}</p>
                <p className="text-sm font-semibold">{info.value}</p>
                <p className="text-xs text-muted mt-0.5">{info.desc}</p>
              </div>
            </m.div>
          ))}
        </m.div>

        {/* Form + FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="lg:col-span-3"
          >
            {state === "success" ? (
              <div className="neu-card p-10 text-center">
                <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl heading-lg mb-2">Message Sent!</h2>
                <p className="text-muted mb-6">
                  Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setState("idle")}
                  className="px-6 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="neu-card p-6 sm:p-8">
                <h2 className="text-lg heading-md mb-5">Send us a message</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="w-full px-4 py-2.5 neu-input text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-4 py-2.5 neu-input text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                      Subject
                    </label>
                    <select
                      id="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 neu-input text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 appearance-none bg-[length:16px] bg-[right_12px_center] bg-no-repeat"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236f6283' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")` }}
                    >
                      <option value="">Select a topic...</option>
                      <option value="feedback">General Feedback</option>
                      <option value="suggestion">Tool Suggestion</option>
                      <option value="bug">Bug Report</option>
                      <option value="business">Business Inquiry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Your message, feedback, or tool suggestion..."
                      className="w-full px-4 py-3 neu-input text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                    />
                  </div>

                  {state === "error" && (
                    <div className="px-4 py-3 rounded-xl bg-error/10 text-error text-sm flex items-center gap-2">
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={state === "sending"}
                    className="w-full px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover:shadow-lg hover:scale-[1.01] transition-all duration-300 shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {state === "sending" ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Send Message
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                      </span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </m.div>

          {/* FAQ sidebar */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="neu-card p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted/60 mb-5">Frequently Asked</h3>
              <div className="space-y-5">
                {faq.map((item) => (
                  <div key={item.q}>
                    <p className="text-sm font-semibold mb-1">{item.q}</p>
                    <p className="text-xs text-muted leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="neu-card p-6 mt-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                  </svg>
                </div>
                <p className="font-semibold text-sm mb-1">Have a tool idea?</p>
                <p className="text-xs text-muted leading-relaxed">
                  Select &quot;Tool Suggestion&quot; in the subject and describe your idea. We build tools our community needs most.
                </p>
              </div>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
