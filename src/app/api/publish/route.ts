import { NextRequest } from "next/server";
import { pagesStore } from "@/lib/pages-store";

const SLUG_RE = /^[a-z0-9](?:[a-z0-9-]{0,58}[a-z0-9])?$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { slug, title, templateId, html, theme } = body;

    if (!slug || !title || !templateId || !html) {
      return Response.json(
        { error: "Missing required fields: slug, title, templateId, html" },
        { status: 400 },
      );
    }

    if (!SLUG_RE.test(slug)) {
      return Response.json(
        { error: "Slug must be 1-60 lowercase letters, numbers, or hyphens" },
        { status: 400 },
      );
    }

    const existing = await pagesStore.getBySlug(slug);
    if (existing) {
      return Response.json({ error: "Slug already taken" }, { status: 409 });
    }

    const page = await pagesStore.create({
      slug,
      title,
      templateId,
      html,
      theme: theme ?? "stripe-indigo",
    });

    return Response.json({
      id: page.id,
      slug: page.slug,
      editToken: page.editToken,
      url: `/p/${page.slug}`,
    }, { status: 201 });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, editToken, ...updates } = body;

    if (!id || !editToken) {
      return Response.json(
        { error: "Missing required fields: id, editToken" },
        { status: 400 },
      );
    }

    if (updates.slug && !SLUG_RE.test(updates.slug)) {
      return Response.json(
        { error: "Slug must be 1-60 lowercase letters, numbers, or hyphens" },
        { status: 400 },
      );
    }

    if (updates.slug) {
      const existing = await pagesStore.getBySlug(updates.slug);
      if (existing && existing.id !== id) {
        return Response.json({ error: "Slug already taken" }, { status: 409 });
      }
    }

    const page = await pagesStore.update(id, editToken, updates);
    if (!page) {
      return Response.json({ error: "Not found or invalid token" }, { status: 404 });
    }

    return Response.json({
      id: page.id,
      slug: page.slug,
      url: `/p/${page.slug}`,
    });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id, editToken } = await req.json();

    if (!id || !editToken) {
      return Response.json(
        { error: "Missing required fields: id, editToken" },
        { status: 400 },
      );
    }

    const ok = await pagesStore.remove(id, editToken);
    if (!ok) {
      return Response.json({ error: "Not found or invalid token" }, { status: 404 });
    }

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
