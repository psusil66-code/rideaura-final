'use client';

import { useEffect, useState } from 'react';
import { type Car } from '@/lib/data';
import { hasSupabase, supabase } from '@/lib/supabase';
import { isBike } from '@/lib/vehicleFilters';

export default function Bikes() {
  const [bikes, setBikes] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBikes() {
      if (!hasSupabase || !supabase) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) setBikes((data as Car[]).filter(isBike));
      setLoading(false);
    }

    loadBikes();
  }, []);

  return (
    <main className="section">
      <div className="container">
        <div className="title">
          <span className="eyebrow">Ride Aura Bikes</span>
          <h2>Self-Drive Bike Rentals</h2>
          <p>Browse only bike and scooter rentals added from the Ride Aura admin dashboard.</p>
        </div>
        {loading ? (
          <div className="panel">Loading Ride Aura bikes...</div>
        ) : (
          <div className="grid3">
            {bikes.map((bike) => (
              <article className="card fleet-card" key={bike.id}>
                {bike.image_url ? <img src={bike.image_url} alt={bike.name} /> : <div className="booking-car-empty">No Image</div>}
                <div className="card-body">
                  <h3>{bike.name}</h3>
                  <div className="price">Rs. {bike.price_per_day}/day</div>
                  <div className="meta">
                    <span>{bike.fuel_type}</span>
                    <span>{bike.transmission}</span>
                    <span>{bike.seats} Riders</span>
                    <span>{bike.location}</span>
                    <span>{bike.status}</span>
                  </div>
                  <p>{bike.description}</p>
                  <a className="btn dark" href={`/booking?vehicle=${encodeURIComponent(bike.id)}&type=bike`}>Check Availability</a>
                </div>
              </article>
            ))}
            {bikes.length === 0 && <div className="panel">No bikes added yet. Add bikes from the admin dashboard to show them here.</div>}
          </div>
        )}
      </div>
    </main>
  );
}
