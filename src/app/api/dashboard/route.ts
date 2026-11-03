import { NextRequest } from "next/server";
import { pagesStore } from "@/lib/pages-store";

export async function POST(req: NextRequest) {
  try {
    const { tokens } = await req.json() as { tokens: Record<string, string> };

    if (!tokens || typeof tokens !== "object") {
      return Response.json({ error: "tokens object required" }, { status: 400 });
    }

    const entries = Object.entries(tokens);
    if (entries.length === 0) {
      return Response.json({ pages: [] });
    }

    const pages = (
      await Promise.all(
        entries.map(async ([id, editToken]) => {
          const page = await pagesStore.getById(id);
          if (!page || page.editToken !== editToken) return null;
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
        }),
      )
    ).filter(Boolean);

    pages.sort((a, b) => new Date(b!.updatedAt).getTime() - new Date(a!.updatedAt).getTime());

    return Response.json({ pages });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
