-- MaroonMarket: user profiles + leaderboard foundation
-- Run this in Supabase Dashboard → SQL Editor → New query → Run

-- ---------------------------------------------------------------------------
-- Profiles (one row per user; links to Supabase Auth later)
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  username text unique,
  display_name text,
  avatar_url text,
  balance numeric(12, 2) not null default 1250 check (balance >= 0),
  total_profit numeric(12, 2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint username_format check (
    username is null
    or (
      username ~ '^[a-zA-Z0-9_]{3,20}$'
    )
  )
);

create index profiles_leaderboard_idx on public.profiles (total_profit desc);
create index profiles_username_idx on public.profiles (username);

comment on table public.profiles is 'User accounts for TAMU Markets';
comment on column public.profiles.balance is 'Play-money balance for trading';
comment on column public.profiles.total_profit is 'Cumulative profit; used for leaderboard ranking';

-- Auto-update updated_at
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
  before update on public.profiles
  for each row
  execute function public.set_updated_at();

-- Create a profile row when someone signs up (wire up Auth later)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name, username)
  values (
    new.id,
    new.email,
    coalesce(
      new.raw_user_meta_data ->> 'display_name',
      new.raw_user_meta_data ->> 'username',
      split_part(new.email, '@', 1)
    ),
    nullif(new.raw_user_meta_data ->> 'username', '')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;

-- Public read for leaderboard and profile pages (writes still restricted)
create policy "Profiles are viewable by everyone"
  on public.profiles
  for select
  to anon, authenticated
  using (true);

-- Users can insert their own profile (fallback if trigger missed)
create policy "Users can insert own profile"
  on public.profiles
  for insert
  to authenticated
  with check (auth.uid() = id);

-- Users can update only their own profile
create policy "Users can update own profile"
  on public.profiles
  for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- ---------------------------------------------------------------------------
-- Leaderboard helper view (top traders by total_profit)
-- ---------------------------------------------------------------------------
create or replace view public.leaderboard as
select
  id,
  username,
  display_name,
  avatar_url,
  balance,
  total_profit,
  rank() over (order by total_profit desc, created_at asc) as rank
from public.profiles
where username is not null;

-- Allow authenticated users to read the leaderboard view
grant select on public.leaderboard to anon, authenticated;
