-- Apply to a fresh development Supabase project after reviewing.
create extension if not exists pgcrypto;
create table if not exists public.notes (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 title text not null default 'Untitled note' check (char_length(title) <= 240),
 body text not null default '',
 category text not null default 'Meeting' check (category in ('Meeting','Strategy','Decision','Board','Project','Personal')),
 priority text not null default 'Normal' check (priority in ('Normal','High','Critical')),
 pinned boolean not null default false,
 allocated_to text not null default '' check (char_length(allocated_to) <= 240),
 allocated_by text not null default '',
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
alter table public.notes enable row level security;
alter table public.notes add column if not exists allocated_to text not null default '';
alter table public.notes add column if not exists allocated_by text not null default '';
revoke all on public.notes from anon;
grant select, insert, update, delete on public.notes to authenticated;
drop policy if exists "Users can read their own notes" on public.notes;
drop policy if exists "Users can read their own or allocated notes" on public.notes;
create policy "Users can read their own or allocated notes" on public.notes for select to authenticated using (
  auth.uid() = user_id
  or (allocated_to <> '' and lower(allocated_to) = lower(coalesce(auth.jwt() ->> 'email', '')))
  or (allocated_to <> '' and allocated_to = auth.uid()::text)
);
drop policy if exists "Users can create their own notes" on public.notes;
create policy "Users can create their own notes" on public.notes for insert to authenticated with check (auth.uid() = user_id);
drop policy if exists "Users can update their own notes" on public.notes;
drop policy if exists "Users can update their own or allocated notes" on public.notes;
create policy "Users can update their own or allocated notes" on public.notes for update to authenticated using (
  auth.uid() = user_id
  or (allocated_to <> '' and lower(allocated_to) = lower(coalesce(auth.jwt() ->> 'email', '')))
  or (allocated_to <> '' and allocated_to = auth.uid()::text)
) with check (
  auth.uid() = user_id
  or (allocated_to <> '' and lower(allocated_to) = lower(coalesce(auth.jwt() ->> 'email', '')))
  or (allocated_to <> '' and allocated_to = auth.uid()::text)
);
drop policy if exists "Users can delete their own notes" on public.notes;
create policy "Users can delete their own notes" on public.notes for delete to authenticated using (auth.uid() = user_id);
create index if not exists notes_user_updated_idx on public.notes(user_id, updated_at desc);
create index if not exists notes_user_pinned_idx on public.notes(user_id, pinned desc);
create index if not exists notes_allocated_to_idx on public.notes(allocated_to);
