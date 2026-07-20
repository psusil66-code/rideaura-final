'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { hasSupabase, supabase } from '@/lib/supabase';

type CarStatus = {
  id: string;
  name: string;
  status: string | null;
  unavailable_until: string | null;
};

export default function Admin() {
  const router = useRouter();
  const [cars, setCars] = useState(0);
  const [availableCars, setAvailableCars] = useState(0);
  const [unavailableCars, setUnavailableCars] = useState(0);
  const [carStatuses, setCarStatuses] = useState<CarStatus[]>([]);
  const [pending, setPending] = useState(0);
  const [bookings, setBookings] = useState(0);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function init() {
      if (!hasSupabase || !supabase) {
        setMessage('Supabase keys are missing. Add .env.local and restart the server.');
        setLoading(false);
        return;
      }

      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push('/admin/login');
        return;
      }

      const [carsResult, carListResult, bookingsResult, pendingResult] = await Promise.all([
        supabase.from('cars').select('id', { count: 'exact', head: true }),
        supabase.from('cars').select('id,name,status,unavailable_until').order('created_at', { ascending: false }),
        supabase.from('bookings').select('id', { count: 'exact', head: true }),
        supabase.from('bookings').select('id', { count: 'exact', head: true }).eq('status', 'Pending'),
      ]);

      if (carsResult.error || carListResult.error || bookingsResult.error || pendingResult.error) {
        setMessage(carsResult.error?.message || carListResult.error?.message || bookingsResult.error?.message || pendingResult.error?.message || 'Unable to load dashboard.');
      } else {
        const list = (carListResult.data || []) as CarStatus[];
        setCars(carsResult.count || 0);
        setCarStatuses(list);
        setAvailableCars(list.filter((car) => (car.status || 'Available') === 'Available').length);
        setUnavailableCars(list.filter((car) => (car.status || 'Available') !== 'Available').length);
        setBookings(bookingsResult.count || 0);
        setPending(pendingResult.count || 0);
      }

      setLoading(false);
    }

    init();
  }, [router]);

  async function signOut() {
    await supabase?.auth.signOut();
    router.push('/admin/login');
  }

  if (loading) return <main className="admin-page"><p>Loading dashboard...</p></main>;

  return <main className="admin-page"><div className="admin-page-head"><div><h1>Admin Dashboard</h1><p>Manage Ride Aura cars, prices, availability and bookings.</p></div><button className="btn dark" onClick={signOut}>Logout</button></div>{message && <p className="admin-notice">{message}</p>}<div className="grid3"><div className="box admin-stat"><h3>Total Cars</h3><p>{cars}</p><Link href="/admin/cars">Manage cars</Link></div><div className="box admin-stat available-stat"><h3>Available Cars</h3><p>{availableCars}</p><Link href="/admin/cars">Update availability</Link></div><div className="box admin-stat unavailable-stat"><h3>Not Available Cars</h3><p>{unavailableCars}</p><Link href="/admin/cars">Check unavailable list</Link></div><div className="box admin-stat"><h3>Pending Bookings</h3><p>{pending}</p><Link href="/admin/bookings">View bookings</Link></div><div className="box admin-stat"><h3>Total Bookings</h3><p>{bookings}</p><Link href="/booking">Open booking form</Link></div></div><section className="box availability-board"><div className="availability-board-head"><div><h2>Car Availability Highlight</h2><p>Quickly see which cars customers can book now.</p></div><Link className="btn dark" href="/admin/cars">Manage Cars</Link></div><div className="availability-list">{carStatuses.map((car)=><div className="availability-row" key={car.id}><strong>{car.name}</strong><span className={(car.status || 'Available') === 'Available' ? 'admin-available-pill' : 'admin-unavailable-pill'}>{car.status || 'Available'}{(car.status || 'Available') !== 'Available' && car.unavailable_until ? ` until ${new Date(car.unavailable_until).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}` : ''}</span></div>)}{carStatuses.length === 0 && <p>No cars added yet.</p>}</div></section></main>;
}
