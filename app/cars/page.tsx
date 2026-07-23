'use client';

import { useEffect, useState } from 'react';
import { type Car } from '@/lib/data';
import { hasSupabase, supabase } from '@/lib/supabase';
import { isCar } from '@/lib/vehicleFilters';

export default function Cars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCars() {
      if (!hasSupabase || !supabase) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) setCars((data as Car[]).filter(isCar));
      setLoading(false);
    }

    loadCars();
  }, []);

  return (
    <main className="section">
      <div className="container">
        <div className="title">
          <span className="eyebrow">Ride Aura Cars</span>
          <h2>Self-Drive Cars</h2>
          <p>Browse only car rentals added from the Ride Aura admin dashboard.</p>
        </div>
        {loading ? (
          <div className="panel">Loading Ride Aura vehicles...</div>
        ) : (
          <div className="grid3">
            {cars.map((car) => (
              <article className="card fleet-card" key={car.id}>
                {car.image_url ? <img src={car.image_url} alt={car.name} /> : <div className="booking-car-empty">No Image</div>}
                <div className="card-body">
                  <h3>{car.name}</h3>
                  <div className="price">Rs. {car.price_per_day}/day</div>
                  <div className="meta">
                    <span>{car.fuel_type}</span>
                    <span>{car.transmission}</span>
                    <span>{car.seats} Seats</span>
                    <span>{car.location}</span>
                    <span>{car.status}</span>
                  </div>
                  <p>{car.description}</p>
                  <a className="btn dark" href={`/booking?vehicle=${encodeURIComponent(car.id)}&type=car`}>Check Availability</a>
                </div>
              </article>
            ))}
            {cars.length === 0 && <div className="panel">No cars added yet. Add cars from the admin dashboard to show them here.</div>}
          </div>
        )}
      </div>
    </main>
  );
}
