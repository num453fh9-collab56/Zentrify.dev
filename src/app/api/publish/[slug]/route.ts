import { pagesStore } from "@/lib/pages-store";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const page = await pagesStore.getBySlug(slug);

  if (!page) {
    return Response.json({ error: "Page not found" }, { status: 404 });
  }

  return Response.json({
    id: page.id,
    slug: page.slug,
    title: page.title,
    templateId: page.templateId,
    theme: page.theme,
    createdAt: page.createdAt,
    updatedAt: page.updatedAt,
    views: page.views,
  });
}
