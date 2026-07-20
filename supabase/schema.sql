-- Run this in Supabase SQL Editor after creating your project.

create table if not exists cars (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  image_url text,
  price_per_day numeric not null default 0,
  price_per_hour numeric not null default 0,
  fuel_type text,
  transmission text,
  seats int,
  location text,
  status text default 'Available',
  unavailable_until date,
  description text,
  created_at timestamptz default now()
);

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  phone text not null,
  pickup_at timestamptz,
  return_at timestamptz,
  car_id text,
  location text,
  license_path text,
  status text default 'Pending',
  created_at timestamptz default now()
);

-- Create storage buckets in Supabase Storage UI:
-- 1. car-images
-- 2. licenses
-- Keep licenses private. Car images can be public.

alter table cars enable row level security;
alter table bookings enable row level security;

create policy "Cars are public to read" on cars for select using (true);
create policy "Anyone can create booking" on bookings for insert with check (true);

create policy "Admins can create cars"
on cars for insert
to authenticated
with check (true);

create policy "Admins can update cars"
on cars for update
to authenticated
using (true)
with check (true);

create policy "Admins can delete cars"
on cars for delete
to authenticated
using (true);

create policy "Admins can read bookings"
on bookings for select
to authenticated
using (true);

create policy "Admins can update bookings"
on bookings for update
to authenticated
using (true)
with check (true);

create policy "Admins can upload car images"
on storage.objects for insert
to authenticated
with check (bucket_id = 'car-images');

create policy "Admins can update car images"
on storage.objects for update
to authenticated
using (bucket_id = 'car-images')
with check (bucket_id = 'car-images');

create policy "Admins can delete car images"
on storage.objects for delete
to authenticated
using (bucket_id = 'car-images');

create policy "Admins can read licenses"
on storage.objects for select
to authenticated
using (bucket_id = 'licenses');
