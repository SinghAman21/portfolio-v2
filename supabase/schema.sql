-- Blog reactions schema
-- Run this in the Supabase SQL editor (or via the CLI) to provision the tables.
--
-- Design:
--   blog_reactions -> source of truth, one row per (post, reaction, ip). Enforces spam rules.
--   blog_stats     -> denormalized counters the blog page actually reads. Kept in sync by a trigger.

-- 1. Individual reactions ----------------------------------------------------
create table if not exists public.blog_reactions (
  id            uuid primary key default gen_random_uuid(),
  blog_slug     text not null,
  reaction_type text not null check (
    reaction_type in ('like', 'insightful', 'fire', 'mind_blown', 'bookmarked')
  ),
  ip_hash       text not null,
  created_at    timestamptz not null default now(),
  -- One IP can give each reaction type once per post (but can give all 5).
  unique (blog_slug, reaction_type, ip_hash)
);

create index if not exists blog_reactions_slug_idx on public.blog_reactions (blog_slug);

-- 2. Denormalized per-post stats ---------------------------------------------
create table if not exists public.blog_stats (
  blog_slug       text primary key,
  view_count      integer not null default 0,
  reaction_counts jsonb   not null default '{}'::jsonb,
  updated_at      timestamptz not null default now()
);

-- 3. Keep blog_stats.reaction_counts in sync with blog_reactions -------------
create or replace function public.sync_blog_reaction_counts()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  target_slug text := coalesce(new.blog_slug, old.blog_slug);
begin
  insert into public.blog_stats (blog_slug, reaction_counts, updated_at)
  values (
    target_slug,
    (
      select coalesce(jsonb_object_agg(reaction_type, cnt), '{}'::jsonb)
      from (
        select reaction_type, count(*) as cnt
        from public.blog_reactions
        where blog_slug = target_slug
        group by reaction_type
      ) t
    ),
    now()
  )
  on conflict (blog_slug) do update
    set reaction_counts = excluded.reaction_counts,
        updated_at      = now();
  return null;
end;
$$;

drop trigger if exists trg_sync_blog_reaction_counts on public.blog_reactions;
create trigger trg_sync_blog_reaction_counts
  after insert or delete on public.blog_reactions
  for each row execute function public.sync_blog_reaction_counts();

-- 4. Atomic view increment (called from the API route) -----------------------
create or replace function public.increment_view(p_slug text)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  new_count integer;
begin
  insert into public.blog_stats (blog_slug, view_count, updated_at)
  values (p_slug, 1, now())
  on conflict (blog_slug) do update
    set view_count = public.blog_stats.view_count + 1,
        updated_at = now()
  returning view_count into new_count;
  return new_count;
end;
$$;

-- 5. Row Level Security ------------------------------------------------------
-- The API route uses the service_role key, which bypasses RLS. We still lock
-- down the anon key so nobody can read/write these tables directly.
alter table public.blog_reactions enable row level security;
alter table public.blog_stats     enable row level security;

-- Public read of aggregate stats is fine (nothing sensitive there).
drop policy if exists "blog_stats read" on public.blog_stats;
create policy "blog_stats read" on public.blog_stats
  for select using (true);

-- No anon policies on blog_reactions => anon cannot read ip_hash or write.
-- All writes go through the service_role key on the server.
