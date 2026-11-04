"use client";

import { useCallback, useState } from "react";
import {
  Check,
  ClipboardCopy,
  ExternalLink,
  Globe,
  Loader2,
  X,
} from "lucide-react";
import { useAuth } from "@/app/components/auth-provider";

interface Props {
  defaultSlug: string;
  defaultTitle: string;
  templateId: string;
  getHtml: () => string;
  theme: string;
  onClose: () => void;
  toast: (msg: string, type?: "success" | "error" | "info") => void;
}

const SLUG_RE = /^[a-z0-9](?:[a-z0-9-]{0,58}[a-z0-9])?$/;

type PublishState =
  | { step: "form" }
  | { step: "publishing" }
  | { step: "done"; url: string; fullUrl: string; editToken: string; id: string };

export function PublishModal({ defaultSlug, defaultTitle, templateId, getHtml, theme, onClose, toast }: Props) {
  const { user } = useAuth();
  const [slug, setSlug] = useState(defaultSlug);
  const [title, setTitle] = useState(defaultTitle);
  const [state, setState] = useState<PublishState>({ step: "form" });
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const publish = useCallback(async () => {
    setError("");
    if (!SLUG_RE.test(slug)) {
      setError("Slug must be lowercase letters, numbers, or hyphens (1-60 chars)");
      return;
    }
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setState({ step: "publishing" });
    try {
      const res = await fetch("/api/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          title: title.trim(),
          templateId,
          html: getHtml(),
          theme,
          ...(user ? { userId: user.id } : {}),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Publishing failed");
        setState({ step: "form" });
        return;
      }

      const fullUrl = `${window.location.origin}/p/${data.slug}`;

      try {
        const tokens = JSON.parse(localStorage.getItem("zentrify:publish-tokens") || "{}");
        tokens[data.id] = data.editToken;
        localStorage.setItem("zentrify:publish-tokens", JSON.stringify(tokens));
      } catch {}

      setState({ step: "done", url: `/p/${data.slug}`, fullUrl, editToken: data.editToken, id: data.id });
    } catch {
      setError("Network error. Please try again.");
      setState({ step: "form" });
    }
  }, [slug, title, templateId, getHtml, theme]);

  const copyUrl = useCallback(async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast("Link copied!", "success");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast("Copy failed", "error");
    }
  }, [toast]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative w-full max-w-md mx-4 rounded-2xl bg-surface border border-surface-border shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:text-foreground hover:bg-background transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {state.step !== "done" ? (
          <div className="p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Globe className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">Publish your page</h2>
                <p className="text-sm text-muted">Get a live URL anyone can visit</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="pub-title" className="block text-sm font-medium text-foreground mb-1.5">
                  Page title
                </label>
                <input
                  id="pub-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-surface-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="My Restaurant"
                />
              </div>

              <div>
                <label htmlFor="pub-slug" className="block text-sm font-medium text-foreground mb-1.5">
                  URL slug
                </label>
                <div className="flex items-center h-10 rounded-lg border border-surface-border bg-background overflow-hidden focus-within:ring-2 focus-within:ring-primary/50">
                  <span className="pl-3 text-sm text-muted whitespace-nowrap select-none">/p/</span>
                  <input
                    id="pub-slug"
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                    className="flex-1 h-full px-1 bg-transparent text-foreground text-sm focus:outline-none"
                    placeholder="my-restaurant"
                  />
                </div>
                <p className="mt-1 text-xs text-muted">Lowercase letters, numbers, and hyphens only</p>
              </div>

              {error && (
                <p className="text-sm text-error bg-error/10 border border-error/20 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 h-10 rounded-lg border border-surface-border text-sm font-medium text-muted hover:text-foreground hover:bg-background transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={publish}
                disabled={state.step === "publishing"}
                className="flex-1 h-10 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {state.step === "publishing" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Publishing…
                  </>
                ) : (
                  <>
                    <Globe className="w-4 h-4" />
                    Publish
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
              <Check className="w-7 h-7 text-green-500" />
            </div>
            <h2 className="text-lg font-bold text-foreground mb-1">Page published!</h2>
            <p className="text-sm text-muted mb-5">Your landing page is now live</p>

            <div className="flex items-center gap-2 p-3 rounded-lg bg-background border border-surface-border mb-4">
              <Globe className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="flex-1 text-sm text-foreground truncate text-left">{state.fullUrl}</span>
              <button
                onClick={() => copyUrl(state.fullUrl)}
                className="flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center text-muted hover:text-foreground hover:bg-surface transition-colors cursor-pointer"
                aria-label="Copy link"
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <ClipboardCopy className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex gap-3">
              <a
                href={state.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 h-10 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Visit page
              </a>
              <button
                onClick={onClose}
                className="flex-1 h-10 rounded-lg border border-surface-border text-sm font-medium text-foreground hover:bg-background transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>

            <p className="mt-4 text-xs text-muted">
              Bookmark your edit token to update or unpublish later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
