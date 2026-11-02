import { pagesStore } from "@/lib/pages-store";

const BADGE = `<div style="position:fixed;bottom:12px;right:12px;z-index:9999;background:rgba(0,0,0,0.75);color:#fff;padding:6px 14px;border-radius:8px;font-size:12px;font-family:system-ui,sans-serif;backdrop-filter:blur(8px)">Built with <a href="/" style="color:#a78bfa;text-decoration:none;font-weight:600">Zentrify</a></div>`;

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const page = await pagesStore.getBySlug(slug);

  if (!page) {
    return new Response(
      `<!doctype html><html><head><meta charset="utf-8"><title>Not Found</title></head><body style="display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;font-family:system-ui;background:#0a0a0a;color:#fff"><div style="text-align:center"><h1 style="font-size:48px;margin:0">404</h1><p style="color:#888">This page doesn't exist or has been unpublished.</p><a href="/" style="color:#a78bfa">← Back to Zentrify</a></div></body></html>`,
      { status: 404, headers: { "Content-Type": "text/html; charset=utf-8" } },
    );
  }

  pagesStore.incrementViews(page.id).catch(() => {});

  const ogUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://zentrify.vercel.app"}/p/${page.slug}`;

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(page.title)}</title>
  <meta name="description" content="${escapeHtml(page.title)} — built with Zentrify">
  <meta property="og:title" content="${escapeHtml(page.title)}">
  <meta property="og:description" content="${escapeHtml(page.title)} — built with Zentrify">
  <meta property="og:url" content="${ogUrl}">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary_large_image">
  <style>html,body{margin:0;padding:0;min-height:100vh}</style>
</head>
<body>
${page.html}
${BADGE}
</body>
</html>`;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
