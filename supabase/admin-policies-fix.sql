-- Run this in Supabase SQL Editor to allow the logged-in admin to manage cars,
-- view/update bookings, and upload car images.

alter table public.cars enable row level security;
alter table public.bookings enable row level security;

grant usage on schema public to anon, authenticated;
grant select on public.cars to anon, authenticated;
grant insert, update, delete on public.cars to authenticated;
grant insert on public.bookings to anon, authenticated;
grant select, update on public.bookings to authenticated;

drop policy if exists "Cars are public to read" on public.cars;
drop policy if exists "Admins can create cars" on public.cars;
drop policy if exists "Admins can update cars" on public.cars;
drop policy if exists "Admins can delete cars" on public.cars;
drop policy if exists "Anyone can create booking" on public.bookings;
drop policy if exists "Admins can read bookings" on public.bookings;
drop policy if exists "Admins can update bookings" on public.bookings;

create policy "Cars are public to read"
on public.cars for select
using (true);

create policy "Admins can create cars"
on public.cars for insert
to authenticated
with check (true);

create policy "Admins can update cars"
on public.cars for update
to authenticated
using (true)
with check (true);

create policy "Admins can delete cars"
on public.cars for delete
to authenticated
using (true);

create policy "Anyone can create booking"
on public.bookings for insert
with check (true);

create policy "Admins can read bookings"
on public.bookings for select
to authenticated
using (true);

create policy "Admins can update bookings"
on public.bookings for update
to authenticated
using (true)
with check (true);

insert into storage.buckets (id, name, public)
values ('car-images', 'car-images', true)
on conflict (id) do update set public = true;

insert into storage.buckets (id, name, public)
values ('licenses', 'licenses', false)
on conflict (id) do update set public = false;

drop policy if exists "Public can read car images" on storage.objects;
drop policy if exists "Admins can upload car images" on storage.objects;
drop policy if exists "Admins can update car images" on storage.objects;
drop policy if exists "Admins can delete car images" on storage.objects;
drop policy if exists "Admins can read licenses" on storage.objects;

create policy "Public can read car images"
on storage.objects for select
using (bucket_id = 'car-images');

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
