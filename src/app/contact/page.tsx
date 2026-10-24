"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type FormState = "idle" | "sending" | "success" | "error";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setState("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setState("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to send message");
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Contact Us</h1>
          <p className="text-muted mb-8">
            Have a question, feedback, or tool suggestion? We&apos;d love to hear
            from you.
          </p>

          {state === "success" ? (
            <div className="neu-card p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-success"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2">Message Sent!</h2>
              <p className="text-muted mb-6">
                Thanks for reaching out. We&apos;ll get back to you soon.
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
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-1.5"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-4 py-3 neu-input text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 neu-input text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-1.5"
                  >
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
                  <div className="px-4 py-3 rounded-xl bg-error/10 text-error text-sm">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={state === "sending"}
                  className="w-full px-6 py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {state === "sending" ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="w-4 h-4 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
