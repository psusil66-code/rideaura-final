'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { hasSupabase, supabase } from '@/lib/supabase';

type Booking = {
  id: string;
  customer_name: string;
  phone: string;
  pickup_at: string | null;
  return_at: string | null;
  car_id: string | null;
  location: string | null;
  license_path: string | null;
  status: string | null;
  created_at: string;
};

const statuses = ['Pending', 'Confirmed', 'Rejected', 'Completed'];
const bookingColumns = 'id,customer_name,phone,pickup_at,return_at,car_id,location,license_path,status,created_at';
const basicBookingColumns = 'id,customer_name,phone,pickup_at,return_at,car_id,location,status,created_at';

function sixMonthsAgoIso() {
  const date = new Date();
  date.setMonth(date.getMonth() - 6);
  return date.toISOString();
}

export default function Bookings() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  async function loadBookings() {
    if (!supabase) return;
    const historyFrom = sixMonthsAgoIso();
    const result = await supabase
      .from('bookings')
      .select(bookingColumns)
      .gte('created_at', historyFrom)
      .order('created_at', { ascending: false });

    if (result.error) {
      const fallback = await supabase
        .from('bookings')
        .select(basicBookingColumns)
        .gte('created_at', historyFrom)
        .order('created_at', { ascending: false });

      if (fallback.error) {
        setMessage(fallback.error.message);
        setBookings([]);
        return;
      }

      setMessage('Booking details loaded. License links are not available for these records.');
      setBookings((fallback.data || []).map((booking) => ({ ...booking, license_path: null })) as Booking[]);
      return;
    }

    setMessage('');
    setBookings((result.data || []) as Booking[]);
  }

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

      await loadBookings();
      setLoading(false);
    }

    init();
  }, [router]);

  async function updateStatus(id: string, status: string) {
    if (!supabase) return;
    const { error } = await supabase.from('bookings').update({ status }).eq('id', id);
    if (error) setMessage(error.message);
    else {
      setMessage('Booking status updated.');
      await loadBookings();
    }
  }

  async function getLicenseUrl(path: string | null) {
    if (!supabase || !path) return;
    const { data, error } = await supabase.storage.from('licenses').createSignedUrl(path, 60 * 10);
    if (error) setMessage(error.message);
    else window.open(data.signedUrl, '_blank', 'noopener,noreferrer');
  }

  async function signOut() {
    await supabase?.auth.signOut();
    router.push('/admin/login');
  }

  if (loading) return <main className="admin-page"><p>Loading bookings...</p></main>;

  return <main className="admin-page"><div className="admin-page-head"><div><h1>Booking History</h1><p>Showing Ride Aura booking requests from the last 6 months only. Total visible records: {bookings.length}</p></div><button className="btn dark" onClick={signOut}>Logout</button></div>{message && <p className="admin-notice">{message}</p>}<div className="booking-history-cards">{bookings.map(b=><article className="box booking-history-card" key={b.id}><div><strong>{b.customer_name || 'Customer'}</strong><span>{b.status || 'Pending'}</span></div><p><b>Phone:</b> <a href={`tel:${b.phone}`}>{b.phone}</a></p><p><b>Car:</b> {b.car_id || '-'}</p><p><b>Pickup:</b> {b.pickup_at ? new Date(b.pickup_at).toLocaleString() : '-'}</p><p><b>Return:</b> {b.return_at ? new Date(b.return_at).toLocaleString() : '-'}</p><p><b>Location:</b> {b.location || '-'}</p></article>)}{bookings.length === 0 && <div className="box"><p>No booking history in the last 6 months.</p></div>}</div><div className="admin-table-wrap"><table className="table"><thead><tr><th>ID</th><th>Name</th><th>Phone</th><th>Car</th><th>Pickup</th><th>Return</th><th>Location</th><th>License</th><th>Status</th></tr></thead><tbody>{bookings.map(b=><tr key={b.id}><td>{b.id.slice(0,8)}</td><td>{b.customer_name}</td><td><a href={`tel:${b.phone}`}>{b.phone}</a></td><td>{b.car_id || '-'}</td><td>{b.pickup_at ? new Date(b.pickup_at).toLocaleString() : '-'}</td><td>{b.return_at ? new Date(b.return_at).toLocaleString() : '-'}</td><td>{b.location || '-'}</td><td>{b.license_path ? <button type="button" onClick={()=>getLicenseUrl(b.license_path)}>View</button> : '-'}</td><td><select value={b.status || 'Pending'} onChange={(e)=>updateStatus(b.id, e.target.value)}>{statuses.map(status=><option key={status}>{status}</option>)}</select></td></tr>)}{bookings.length === 0 && <tr><td colSpan={9}>No booking history in the last 6 months.</td></tr>}</tbody></table></div></main>;
}
