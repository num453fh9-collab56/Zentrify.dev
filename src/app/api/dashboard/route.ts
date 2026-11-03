import { NextRequest } from "next/server";
import { pagesStore } from "@/lib/pages-store";

function pageDto(page: { id: string; slug: string; title: string; templateId: string; theme: string; views: number; createdAt: string; updatedAt: string }) {
  return {
    id: page.id,
    slug: page.slug,
    title: page.title,
    templateId: page.templateId,
    theme: page.theme,
    views: page.views,
    createdAt: page.createdAt,
    updatedAt: page.updatedAt,
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { tokens?: Record<string, string>; userId?: string };

    const allPages: ReturnType<typeof pageDto>[] = [];

    // Fetch by userId (logged-in user)
    if (body.userId) {
      const userPages = await pagesStore.listByUserId(body.userId);
      for (const p of userPages) allPages.push(pageDto(p));
    }

    // Fetch by editTokens (localStorage fallback)
    if (body.tokens && typeof body.tokens === "object") {
      const entries = Object.entries(body.tokens);
      const existing = new Set(allPages.map((p) => p.id));
      await Promise.all(
        entries.map(async ([id, editToken]) => {
          if (existing.has(id)) return;
          const page = await pagesStore.getById(id);
          if (!page || page.editToken !== editToken) return;
          allPages.push(pageDto(page));
        }),
      );
    }

    allPages.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

    return Response.json({ pages: allPages });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
