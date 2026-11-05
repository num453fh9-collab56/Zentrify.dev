"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { m, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  Calendar,
  Check,
  ClipboardCopy,
  ExternalLink,
  Eye,
  Globe,
  LayoutDashboard,
  Loader2,
  Lock,
  LogOut,
  Mail,
  PenLine,
  Search,
  Settings,
  FileText,
  Trash2,
  User,
  UserCircle,
  AlertTriangle,
} from "lucide-react";
import { useAuth } from "../components/auth-provider";
import { supabase } from "@/lib/supabase";

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

type Tab = "overview" | "pages" | "settings";

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

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function DashboardPage() {
  const { user, session, loading: authLoading, signOut } = useAuth();
  const router = useRouter();
  const [pages, setPages] = useState<PageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("overview");
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  // Settings state
  const [fullName, setFullName] = useState("");
  const [savingName, setSavingName] = useState(false);
  const [nameMsg, setNameMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);
  const [pwMsg, setPwMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (user) {
      setFullName(user.user_metadata?.full_name || "");
    }
  }, [user]);

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

  const updateProfile = async () => {
    if (!fullName.trim()) { setNameMsg({ type: "error", text: "Name cannot be empty" }); return; }
    setSavingName(true);
    setNameMsg(null);
    try {
      const res = await fetch("/api/account", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({ action: "update-profile", fullName: fullName.trim() }),
      });
      const data = await res.json();
      if (!res.ok) { setNameMsg({ type: "error", text: data.error }); }
      else {
        setNameMsg({ type: "success", text: "Name updated successfully" });
        await supabase.auth.refreshSession();
      }
    } catch { setNameMsg({ type: "error", text: "Failed to update" }); }
    setSavingName(false);
  };

  const changePassword = async () => {
    if (newPassword.length < 6) { setPwMsg({ type: "error", text: "Password must be at least 6 characters" }); return; }
    if (newPassword !== confirmPassword) { setPwMsg({ type: "error", text: "Passwords do not match" }); return; }
    setSavingPassword(true);
    setPwMsg(null);
    try {
      const res = await fetch("/api/account", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({ action: "change-password", newPassword }),
      });
      const data = await res.json();
      if (!res.ok) { setPwMsg({ type: "error", text: data.error }); }
      else {
        setPwMsg({ type: "success", text: "Password changed successfully" });
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch { setPwMsg({ type: "error", text: "Failed to change password" }); }
    setSavingPassword(false);
  };

  const deleteAccount = async () => {
    setDeletingAccount(true);
    try {
      const res = await fetch("/api/account", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({ action: "delete-account" }),
      });
      if (res.ok) {
        await signOut();
        router.push("/");
      }
    } catch {}
    setDeletingAccount(false);
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const filtered = pages.filter(
    (p) =>
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase()),
  );

  const totalViews = pages.reduce((sum, p) => sum + p.views, 0);
  const recentPages = [...pages].slice(0, 5);

  const tabs: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "pages", label: "My Pages", icon: FileText },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  if (authLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  const displayName = user.user_metadata?.full_name || user.email?.split("@")[0] || "User";

  return (
    <section className="py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                <UserCircle className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold">Welcome, {displayName}</h1>
                <p className="text-sm text-muted">{user.email}</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="hidden sm:flex items-center gap-2 h-9 px-4 rounded-lg border border-surface-border bg-surface text-sm font-medium text-muted hover:text-foreground hover:border-foreground/20 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        </m.div>

        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden border-b border-surface-border mb-6 -mx-4 px-4 sm:mx-0 sm:px-0">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted hover:text-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {tab === "overview" && (
            <m.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Stats Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <div className="rounded-xl border border-surface-border bg-surface p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold">{loading ? "–" : pages.length}</p>
                  <p className="text-xs text-muted mt-0.5">Published Pages</p>
                </div>
                <div className="rounded-xl border border-surface-border bg-surface p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <Eye className="w-4 h-4 text-blue-500" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold">{loading ? "–" : totalViews.toLocaleString()}</p>
                  <p className="text-xs text-muted mt-0.5">Total Views</p>
                </div>
                <div className="rounded-xl border border-surface-border bg-surface p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-green-500" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold">
                    {loading ? "–" : pages.length > 0 ? Math.round(totalViews / pages.length) : 0}
                  </p>
                  <p className="text-xs text-muted mt-0.5">Avg Views / Page</p>
                </div>
                <div className="rounded-xl border border-surface-border bg-surface p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-purple-500" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold">
                    {user.created_at ? formatDate(user.created_at) : "–"}
                  </p>
                  <p className="text-xs text-muted mt-0.5">Member Since</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <Link
                  href="/tools/landing-page-generator"
                  className="flex items-center gap-4 p-4 rounded-xl border border-surface-border bg-surface hover:border-primary/30 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <PenLine className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Create New Page</p>
                    <p className="text-xs text-muted">Build a landing page with our generator</p>
                  </div>
                </Link>
                <Link
                  href="/tools"
                  className="flex items-center gap-4 p-4 rounded-xl border border-surface-border bg-surface hover:border-primary/30 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                    <Globe className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Explore Tools</p>
                    <p className="text-xs text-muted">Browse all developer tools</p>
                  </div>
                </Link>
              </div>

              {/* Recent Pages */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Recent Pages</h2>
                  {pages.length > 5 && (
                    <button
                      onClick={() => setTab("pages")}
                      className="text-sm text-primary hover:underline cursor-pointer"
                    >
                      View all
                    </button>
                  )}
                </div>
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-5 h-5 animate-spin text-primary" />
                  </div>
                ) : recentPages.length === 0 ? (
                  <div className="text-center py-12 rounded-xl border border-dashed border-surface-border">
                    <Globe className="w-8 h-8 text-muted mx-auto mb-3" />
                    <p className="text-sm text-muted mb-3">No published pages yet</p>
                    <Link
                      href="/tools/landing-page-generator"
                      className="inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors"
                    >
                      <PenLine className="w-4 h-4" />
                      Create your first page
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {recentPages.map((page) => (
                      <div
                        key={page.id}
                        className="flex items-center justify-between gap-4 p-3 rounded-lg border border-surface-border bg-surface hover:border-primary/30 transition-colors"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium truncate">{page.title}</p>
                          <div className="flex items-center gap-3 text-xs text-muted mt-0.5">
                            <span>/p/{page.slug}</span>
                            <span>{page.views} views</span>
                            <span className="hidden sm:inline">{timeAgo(page.updatedAt)}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <a
                            href={`/p/${page.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:text-foreground hover:bg-background transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                          <button
                            onClick={() => copyLink(page.slug, page.id)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:text-foreground hover:bg-background transition-colors cursor-pointer"
                          >
                            {copiedId === page.id ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <ClipboardCopy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </m.div>
          )}

          {tab === "pages" && (
            <m.div
              key="pages"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Search + Create */}
              {!loading && pages.length > 0 && (
                <div className="flex items-center gap-3 mb-6">
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
                </div>
              )}

              {loading && (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              )}

              {!loading && pages.length === 0 && (
                <div className="text-center py-20">
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
                </div>
              )}

              {!loading && filtered.length > 0 && (
                <div className="space-y-3">
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
                            <h3 className="text-base font-semibold truncate">{page.title}</h3>
                            <div className="flex items-center gap-3 text-xs text-muted mt-1">
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
                </div>
              )}

              {!loading && pages.length > 0 && filtered.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted text-sm">No pages match &quot;{search}&quot;</p>
                </div>
              )}
            </m.div>
          )}

          {tab === "settings" && (
            <m.div
              key="settings"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6 max-w-lg"
            >
              {/* Profile Section */}
              <div className="rounded-xl border border-surface-border bg-surface p-5">
                <div className="flex items-center gap-2 mb-4">
                  <User className="w-4 h-4 text-primary" />
                  <h2 className="text-base font-semibold">Profile</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-muted mb-1.5">Email</label>
                    <div className="flex items-center gap-2 h-10 px-3 rounded-lg border border-surface-border bg-background text-sm text-muted">
                      <Mail className="w-4 h-4" />
                      {user.email}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium mb-1.5">Display Name</label>
                    <input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => { setFullName(e.target.value); setNameMsg(null); }}
                      className="w-full h-10 px-3 rounded-lg border border-surface-border bg-surface text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Your name"
                    />
                  </div>
                  {nameMsg && (
                    <p className={`text-sm px-3 py-2 rounded-lg ${
                      nameMsg.type === "success"
                        ? "text-green-600 bg-green-500/10 border border-green-500/20"
                        : "text-error bg-error/10 border border-error/20"
                    }`}>
                      {nameMsg.text}
                    </p>
                  )}
                  <button
                    onClick={updateProfile}
                    disabled={savingName}
                    className="h-9 px-4 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors cursor-pointer disabled:opacity-60 flex items-center gap-2"
                  >
                    {savingName ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                    Save Name
                  </button>
                </div>
              </div>

              {/* Change Password */}
              <div className="rounded-xl border border-surface-border bg-surface p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Lock className="w-4 h-4 text-primary" />
                  <h2 className="text-base font-semibold">Change Password</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="newPw" className="block text-sm font-medium mb-1.5">New Password</label>
                    <input
                      id="newPw"
                      type="password"
                      value={newPassword}
                      onChange={(e) => { setNewPassword(e.target.value); setPwMsg(null); }}
                      className="w-full h-10 px-3 rounded-lg border border-surface-border bg-surface text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Min 6 characters"
                    />
                  </div>
                  <div>
                    <label htmlFor="confirmPw" className="block text-sm font-medium mb-1.5">Confirm Password</label>
                    <input
                      id="confirmPw"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => { setConfirmPassword(e.target.value); setPwMsg(null); }}
                      className="w-full h-10 px-3 rounded-lg border border-surface-border bg-surface text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Confirm new password"
                    />
                  </div>
                  {pwMsg && (
                    <p className={`text-sm px-3 py-2 rounded-lg ${
                      pwMsg.type === "success"
                        ? "text-green-600 bg-green-500/10 border border-green-500/20"
                        : "text-error bg-error/10 border border-error/20"
                    }`}>
                      {pwMsg.text}
                    </p>
                  )}
                  <button
                    onClick={changePassword}
                    disabled={savingPassword}
                    className="h-9 px-4 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors cursor-pointer disabled:opacity-60 flex items-center gap-2"
                  >
                    {savingPassword ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                    Update Password
                  </button>
                </div>
              </div>

              {/* Sign Out (mobile) */}
              <div className="sm:hidden rounded-xl border border-surface-border bg-surface p-5">
                <button
                  onClick={handleSignOut}
                  className="w-full h-10 rounded-lg border border-surface-border bg-background text-sm font-medium text-muted hover:text-foreground transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </div>

              {/* Danger Zone */}
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <h2 className="text-base font-semibold text-red-500">Danger Zone</h2>
                </div>
                <p className="text-sm text-muted mb-4">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                {!showDeleteConfirm ? (
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="h-9 px-4 rounded-lg border border-red-500/30 text-red-500 text-sm font-semibold hover:bg-red-500/10 transition-colors cursor-pointer"
                  >
                    Delete Account
                  </button>
                ) : (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={deleteAccount}
                      disabled={deletingAccount}
                      className="h-9 px-4 rounded-lg bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors cursor-pointer disabled:opacity-60 flex items-center gap-2"
                    >
                      {deletingAccount ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                      Yes, delete my account
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      className="h-9 px-4 rounded-lg border border-surface-border text-sm font-medium text-muted hover:text-foreground transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
