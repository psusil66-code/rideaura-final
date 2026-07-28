-- Ride Aura booking retention rule.
-- Run this once in Supabase SQL Editor to auto-delete booking rows older than 181 days.
-- It keeps the bookings table small. Storage files may still need separate/manual cleanup.

create extension if not exists pg_cron with schema extensions;

create or replace function public.cleanup_old_bookings()
returns void
language sql
security definer
set search_path = public
as $$
  delete from public.bookings
  where created_at < now() - interval '181 days';
$$;

select cron.unschedule('ride_aura_cleanup_old_bookings')
where exists (
  select 1
  from cron.job
  where jobname = 'ride_aura_cleanup_old_bookings'
);

select cron.schedule(
  'ride_aura_cleanup_old_bookings',
  '30 2 * * *',
  $$select public.cleanup_old_bookings();$$
);

-- Run once immediately after creating the scheduled job.
select public.cleanup_old_bookings();
