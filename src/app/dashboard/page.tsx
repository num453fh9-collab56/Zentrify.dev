"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { m, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  ClipboardCopy,
  Check,
  ExternalLink,
  Eye,
  Globe,
  Loader2,
  PenLine,
  Search,
  Trash2,
  LayoutDashboard,
} from "lucide-react";
import { useAuth } from "../components/auth-provider";

interface PageItem {
  id: string;
  slug: string;
  title: string;
  templateId: string;
  theme: string;
  views: number;
  createdAt: string;
  updatedAt: string;
}

function getTokens(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem("zentrify:publish-tokens") || "{}");
  } catch {
    return {};
  }
}

function removeToken(id: string) {
  try {
    const tokens = getTokens();
    delete tokens[id];
    localStorage.setItem("zentrify:publish-tokens", JSON.stringify(tokens));
  } catch {}
}

function timeAgo(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [pages, setPages] = useState<PageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, user, router]);

  const fetchPages = useCallback(async () => {
    const tokens = getTokens();
    const body: Record<string, unknown> = { tokens };
    if (user) body.userId = user.id;

    try {
      const res = await fetch("/api/dashboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      setPages(data.pages ?? []);
    } catch {
      setPages([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!authLoading) fetchPages();
  }, [authLoading, fetchPages]);

  const copyLink = async (slug: string, id: string) => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/p/${slug}`);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {}
  };

  const deletePage = async (id: string) => {
    const tokens = getTokens();
    const editToken = tokens[id];
    if (!editToken) return;

    setDeleting(id);
    try {
      const res = await fetch("/api/publish", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, editToken }),
      });
      if (res.ok) {
        removeToken(id);
        setPages((prev) => prev.filter((p) => p.id !== id));
      }
    } catch {}
    setDeleting(null);
  };

  const filtered = pages.filter(
    (p) =>
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase()),
  );

  const totalViews = pages.reduce((sum, p) => sum + p.views, 0);

  return (
    <section className="py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">My Pages</h1>
              <p className="text-sm text-muted">Manage your published landing pages</p>
            </div>
          </div>
        </m.div>

        {/* Stats */}
        {!loading && pages.length > 0 && (
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8"
          >
            <div className="rounded-xl border border-surface-border bg-surface p-4">
              <p className="text-xs font-medium text-muted mb-1">Published Pages</p>
              <p className="text-2xl font-bold">{pages.length}</p>
            </div>
            <div className="rounded-xl border border-surface-border bg-surface p-4">
              <p className="text-xs font-medium text-muted mb-1">Total Views</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold">{totalViews.toLocaleString()}</p>
                <Eye className="w-4 h-4 text-muted" />
              </div>
            </div>
            <div className="hidden sm:block rounded-xl border border-surface-border bg-surface p-4">
              <p className="text-xs font-medium text-muted mb-1">Avg Views / Page</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold">
                  {pages.length > 0 ? Math.round(totalViews / pages.length).toLocaleString() : 0}
                </p>
                <BarChart3 className="w-4 h-4 text-muted" />
              </div>
            </div>
          </m.div>
        )}

        {/* Search + Create */}
        {!loading && pages.length > 0 && (
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search pages..."
                className="w-full h-10 pl-9 pr-3 rounded-lg border border-surface-border bg-surface text-foreground text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <Link
              href="/tools/landing-page-generator"
              className="h-10 px-4 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">Create New</span>
              <span className="sm:hidden">New</span>
            </Link>
          </m.div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        )}

        {/* Empty State */}
        {!loading && pages.length === 0 && (
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <Globe className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-xl font-bold mb-2">No published pages yet</h2>
            <p className="text-muted text-sm mb-6 max-w-sm mx-auto">
              Create a landing page with our generator and publish it to get a live URL.
            </p>
            <Link
              href="/tools/landing-page-generator"
              className="inline-flex items-center gap-2 h-10 px-5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors"
            >
              <PenLine className="w-4 h-4" />
              Create your first page
            </Link>
          </m.div>
        )}

        {/* Pages List */}
        {!loading && filtered.length > 0 && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="space-y-3"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((page) => (
                <m.div
                  key={page.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group rounded-xl border border-surface-border bg-surface p-4 sm:p-5 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-base font-semibold truncate">{page.title}</h3>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted">
                        <span className="flex items-center gap-1">
                          <Globe className="w-3 h-3" />
                          /p/{page.slug}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {page.views.toLocaleString()} views
                        </span>
                        <span className="hidden sm:inline">
                          Updated {timeAgo(page.updatedAt)}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <a
                        href={`/p/${page.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="View page"
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:text-foreground hover:bg-background transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => copyLink(page.slug, page.id)}
                        title="Copy link"
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:text-foreground hover:bg-background transition-colors cursor-pointer"
                      >
                        {copiedId === page.id ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <ClipboardCopy className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete "${page.title}"? This cannot be undone.`)) {
                            deletePage(page.id);
                          }
                        }}
                        disabled={deleting === page.id}
                        title="Delete page"
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer disabled:opacity-50"
                      >
                        {deleting === page.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </m.div>
              ))}
            </AnimatePresence>
          </m.div>
        )}

        {/* No search results */}
        {!loading && pages.length > 0 && filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted text-sm">No pages match &quot;{search}&quot;</p>
          </div>
        )}
      </div>
    </section>
  );
}
