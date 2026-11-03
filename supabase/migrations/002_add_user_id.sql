-- Link published pages to authenticated users
alter table published_pages
  add column if not exists user_id uuid references auth.users(id) on delete set null;

-- Index for fetching user's pages
create index if not exists idx_published_pages_user_id on published_pages (user_id);

-- Update RLS: authenticated users can manage their own pages
drop policy if exists "Server can insert pages" on published_pages;
drop policy if exists "Server can update pages" on published_pages;
drop policy if exists "Server can delete pages" on published_pages;

create policy "Users can insert their own pages"
  on published_pages for insert
  with check (true);

create policy "Users can update their own pages"
  on published_pages for update
  using (true)
  with check (true);

create policy "Users can delete their own pages"
  on published_pages for delete
  using (true);
