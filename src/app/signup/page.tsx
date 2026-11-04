"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, UserPlus } from "lucide-react";
import { useAuth } from "../components/auth-provider";

export default function SignUpPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) { setError("Name is required"); return; }
    if (!email.trim()) { setError("Email is required"); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters"); return; }

    setLoading(true);
    const { error: err } = await signUp(email, password, name.trim());
    setLoading(false);

    if (err) {
      setError(err);
      return;
    }

    setSuccess(true);
  };

  if (success) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-xl font-bold mb-2">Check your email</h1>
          <p className="text-sm text-muted mb-6">
            We sent a confirmation link to <strong className="text-foreground">{email}</strong>. Click it to activate your account.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 h-10 px-5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors"
          >
            Go to Login
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <UserPlus className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="text-sm text-muted mt-1">Start building and publishing landing pages</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1.5">Full name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-surface-border bg-surface text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Ahmad Khan"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1.5">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-surface-border bg-surface text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1.5">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-10 px-3 pr-10 rounded-lg border border-surface-border bg-surface text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Min 6 characters"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center text-muted hover:text-foreground transition-colors cursor-pointer"
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-sm text-error bg-error/10 border border-error/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-10 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Creating account...</>
            ) : (
              "Create account"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-muted mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-medium hover:text-primary-dark transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
}
