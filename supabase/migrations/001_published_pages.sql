-- Published landing pages table
create table if not exists published_pages (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  title       text not null,
  template_id text not null,
  html        text not null,
  theme       text not null default 'stripe-indigo',
  edit_token  uuid not null default gen_random_uuid(),
  views       bigint not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Fast lookup by slug (most common query)
create index if not exists idx_published_pages_slug on published_pages (slug);

-- Lookup by edit_token (for listing user's pages)
create index if not exists idx_published_pages_edit_token on published_pages (edit_token);

-- RPC to atomically increment page views
create or replace function increment_page_views(page_id uuid)
returns void
language sql
as $$
  update published_pages
  set views = views + 1
  where id = page_id;
$$;

-- Row Level Security
alter table published_pages enable row level security;

-- Anyone can read published pages (they're public)
create policy "Public pages are readable by everyone"
  on published_pages for select
  using (true);

-- Insert/update/delete require the anon key (API-level, not user-level)
-- Since we use the service role key or anon key server-side only,
-- we allow all operations for authenticated API calls
create policy "Server can insert pages"
  on published_pages for insert
  with check (true);

create policy "Server can update pages"
  on published_pages for update
  using (true)
  with check (true);

create policy "Server can delete pages"
  on published_pages for delete
  using (true);
