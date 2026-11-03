create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text,
  avatar_url text,
  google_id text unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  status text default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Basic RLS for the tables (to be secured properly before production)
alter table public.users enable row level security;
alter table public.waitlist enable row level security;

-- Allow anonymous inserts to the waitlist
create policy "Allow anonymous inserts to waitlist"
on public.waitlist for insert
to anon
with check (true);

-- Allow public read of waitlist for now (if needed)
create policy "Allow public read of waitlist"
on public.waitlist for select
to anon
using (true);

-- Users policies
create policy "Allow insert on users"
on public.users for insert
to anon, authenticated
with check (true);

create policy "Allow select on users"
on public.users for select
to anon, authenticated
using (true);

create policy "Allow update on users"
on public.users for update
to anon, authenticated
using (true);
