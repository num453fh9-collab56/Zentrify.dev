import { randomUUID } from "crypto";
import { readFile, writeFile, mkdir, unlink, readdir } from "fs/promises";
import path from "path";

export interface PublishedPage {
  id: string;
  slug: string;
  title: string;
  templateId: string;
  html: string;
  theme: string;
  editToken: string;
  userId: string | null;
  createdAt: string;
  updatedAt: string;
  views: number;
}

export type CreatePageInput = {
  slug: string;
  title: string;
  templateId: string;
  html: string;
  theme: string;
  userId?: string;
};

export type UpdatePageInput = Partial<
  Pick<PublishedPage, "title" | "slug" | "html" | "theme">
>;

interface PagesStore {
  create(input: CreatePageInput): Promise<PublishedPage>;
  getBySlug(slug: string): Promise<PublishedPage | null>;
  getById(id: string): Promise<PublishedPage | null>;
  update(id: string, editToken: string, input: UpdatePageInput): Promise<PublishedPage | null>;
  remove(id: string, editToken: string): Promise<boolean>;
  incrementViews(id: string): Promise<void>;
  listByToken(editToken: string): Promise<PublishedPage[]>;
  listByUserId(userId: string): Promise<PublishedPage[]>;
}

// --------------- File-based store (local dev) ---------------

const DATA_DIR = path.join(process.cwd(), ".data", "pages");

async function ensureDir() {
  await mkdir(DATA_DIR, { recursive: true });
}

function filePath(id: string) {
  return path.join(DATA_DIR, `${id}.json`);
}

const fileStore: PagesStore = {
  async create(input) {
    await ensureDir();
    const now = new Date().toISOString();
    const page: PublishedPage = {
      id: randomUUID(),
      slug: input.slug,
      title: input.title,
      templateId: input.templateId,
      html: input.html,
      theme: input.theme,
      editToken: randomUUID(),
      userId: input.userId ?? null,
      createdAt: now,
      updatedAt: now,
      views: 0,
    };
    await writeFile(filePath(page.id), JSON.stringify(page), "utf-8");
    return page;
  },

  async getBySlug(slug) {
    await ensureDir();
    const files = await readdir(DATA_DIR);
    for (const f of files) {
      if (!f.endsWith(".json")) continue;
      const raw = await readFile(path.join(DATA_DIR, f), "utf-8");
      const page: PublishedPage = JSON.parse(raw);
      if (page.slug === slug) return page;
    }
    return null;
  },

  async getById(id) {
    try {
      const raw = await readFile(filePath(id), "utf-8");
      return JSON.parse(raw) as PublishedPage;
    } catch {
      return null;
    }
  },

  async update(id, editToken, input) {
    const page = await this.getById(id);
    if (!page || page.editToken !== editToken) return null;
    const updated = { ...page, ...input, updatedAt: new Date().toISOString() };
    await writeFile(filePath(id), JSON.stringify(updated), "utf-8");
    return updated;
  },

  async remove(id, editToken) {
    const page = await this.getById(id);
    if (!page || page.editToken !== editToken) return false;
    try {
      await unlink(filePath(id));
      return true;
    } catch {
      return false;
    }
  },

  async incrementViews(id) {
    const page = await this.getById(id);
    if (!page) return;
    page.views += 1;
    await writeFile(filePath(id), JSON.stringify(page), "utf-8");
  },

  async listByToken(editToken) {
    await ensureDir();
    const files = await readdir(DATA_DIR);
    const pages: PublishedPage[] = [];
    for (const f of files) {
      if (!f.endsWith(".json")) continue;
      const raw = await readFile(path.join(DATA_DIR, f), "utf-8");
      const page: PublishedPage = JSON.parse(raw);
      if (page.editToken === editToken) pages.push(page);
    }
    return pages;
  },

  async listByUserId(userId) {
    await ensureDir();
    const files = await readdir(DATA_DIR);
    const pages: PublishedPage[] = [];
    for (const f of files) {
      if (!f.endsWith(".json")) continue;
      const raw = await readFile(path.join(DATA_DIR, f), "utf-8");
      const page: PublishedPage = JSON.parse(raw);
      if (page.userId === userId) pages.push(page);
    }
    return pages;
  },
};

// --------------- Supabase store (production) ---------------

function getSupabaseStore(): PagesStore {
  const url = process.env.SUPABASE_URL!;
  const key = process.env.SUPABASE_ANON_KEY!;

  async function query(
    path: string,
    options?: RequestInit & { params?: Record<string, string> },
  ) {
    const u = new URL(`${url}/rest/v1/${path}`);
    if (options?.params) {
      for (const [k, v] of Object.entries(options.params)) u.searchParams.set(k, v);
    }
    const res = await fetch(u.toString(), {
      ...options,
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: options?.method === "POST" ? "return=representation" : "return=representation",
        ...((options?.headers as Record<string, string>) ?? {}),
      },
    });
    if (!res.ok) return null;
    return res.json();
  }

  return {
    async create(input) {
      const now = new Date().toISOString();
      const page: Record<string, unknown> = {
        id: randomUUID(),
        slug: input.slug,
        title: input.title,
        template_id: input.templateId,
        html: input.html,
        theme: input.theme,
        edit_token: randomUUID(),
        created_at: now,
        updated_at: now,
        views: 0,
      };
      if (input.userId) page.user_id = input.userId;
      const rows = await query("published_pages", {
        method: "POST",
        body: JSON.stringify(page),
      });
      if (!rows?.[0]) throw new Error("Failed to create page");
      return toPage(rows[0]);
    },

    async getBySlug(slug) {
      const rows = await query("published_pages", {
        params: { slug: `eq.${slug}`, limit: "1" },
      });
      return rows?.[0] ? toPage(rows[0]) : null;
    },

    async getById(id) {
      const rows = await query("published_pages", {
        params: { id: `eq.${id}`, limit: "1" },
      });
      return rows?.[0] ? toPage(rows[0]) : null;
    },

    async update(id, editToken, input) {
      const body: Record<string, unknown> = { updated_at: new Date().toISOString() };
      if (input.title !== undefined) body.title = input.title;
      if (input.slug !== undefined) body.slug = input.slug;
      if (input.html !== undefined) body.html = input.html;
      if (input.theme !== undefined) body.theme = input.theme;
      const rows = await query("published_pages", {
        method: "PATCH",
        params: { id: `eq.${id}`, edit_token: `eq.${editToken}` },
        body: JSON.stringify(body),
      });
      return rows?.[0] ? toPage(rows[0]) : null;
    },

    async remove(id, editToken) {
      const res = await query("published_pages", {
        method: "DELETE",
        params: { id: `eq.${id}`, edit_token: `eq.${editToken}` },
      });
      return Array.isArray(res) && res.length > 0;
    },

    async incrementViews(id) {
      await fetch(`${url}/rest/v1/rpc/increment_page_views`, {
        method: "POST",
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ page_id: id }),
      });
    },

    async listByToken(editToken) {
      const rows = await query("published_pages", {
        params: { edit_token: `eq.${editToken}`, order: "updated_at.desc" },
      });
      return (rows ?? []).map(toPage);
    },

    async listByUserId(userId) {
      const rows = await query("published_pages", {
        params: { user_id: `eq.${userId}`, order: "updated_at.desc" },
      });
      return (rows ?? []).map(toPage);
    },
  };
}

function toPage(row: Record<string, unknown>): PublishedPage {
  return {
    id: row.id as string,
    slug: row.slug as string,
    title: row.title as string,
    templateId: (row.template_id ?? row.templateId) as string,
    html: row.html as string,
    theme: row.theme as string,
    editToken: (row.edit_token ?? row.editToken) as string,
    userId: (row.user_id ?? row.userId ?? null) as string | null,
    createdAt: (row.created_at ?? row.createdAt) as string,
    updatedAt: (row.updated_at ?? row.updatedAt) as string,
    views: (row.views ?? 0) as number,
  };
}

// --------------- Export the active store ---------------

export const pagesStore: PagesStore =
  process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY
    ? getSupabaseStore()
    : fileStore;
