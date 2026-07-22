'use client';

import { useEffect, useMemo, useState } from 'react';
import { type Car } from '@/lib/data';
import { hasSupabase, supabase } from '@/lib/supabase';
import './booking.css';

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919114030650';
const businessEmail = 'booking@rideauraselfdrive.co.in';
const officeLocation = 'Saubhagya Nagar, Delta';

function availabilityText(car: Car) {
  if (car.status === 'Not Available' && car.unavailable_until) {
    return `Not Available until ${new Date(car.unavailable_until).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })}`;
  }

  return car.status || 'Available';
}

function buildWhatsappLink(car: Car) {
  const text = [
    'Hi Ride Aura, I want to check car availability.',
    `Car: ${car.name}`,
    `Status shown: ${availabilityText(car)}`,
    `Price: Rs. ${car.price_per_day}/day, Rs. ${car.price_per_hour}/hour`,
    `Pickup location: ${officeLocation}`,
    'Please confirm booking details.'
  ].join('\n');

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
}

function formatDateTime(value: string) {
  if (!value) return 'Not selected';

  return new Date(value).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function buildBookingMessage(details: {
  customerName: string;
  phone: string;
  pickupAt: string;
  returnAt: string;
  location: string;
  carName: string;
  licensePath: string;
}) {
  return [
    'New Ride Aura booking request',
    `Customer: ${details.customerName}`,
    `Phone: ${details.phone}`,
    `Car: ${details.carName}`,
    `Pickup: ${formatDateTime(details.pickupAt)}`,
    `Return: ${formatDateTime(details.returnAt)}`,
    `Pickup location: ${details.location}`,
    details.licensePath ? `License uploaded: ${details.licensePath}` : 'License uploaded: No',
    'Please confirm availability and booking.'
  ].join('\n');
}

function buildBookingWhatsappLink(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function buildBookingEmailLink(subject: string, body: string) {
  return `mailto:${businessEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function Booking() {
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCarId, setSelectedCarId] = useState('');
  const [checkedCarId, setCheckedCarId] = useState('');
  const [message, setMessage] = useState('');
  const [notifyLinks, setNotifyLinks] = useState<{ whatsapp: string; email: string } | null>(null);
  const [loadingCars, setLoadingCars] = useState(true);

  const selectedCar = useMemo(
    () => cars.find((car) => car.id === selectedCarId) || cars[0],
    [cars, selectedCarId]
  );

  const checkedCar = useMemo(
    () => cars.find((car) => car.id === checkedCarId) || null,
    [cars, checkedCarId]
  );

  useEffect(() => {
    async function loadCars() {
      if (!hasSupabase || !supabase) {
        setLoadingCars(false);
        return;
      }

      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data?.length) {
        const liveCars = data as Car[];
        setCars(liveCars);
        setSelectedCarId(liveCars[0].id);
      }

      setLoadingCars(false);
    }

    loadCars();
  }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const customerName = String(form.get('name') || '');
    const phone = String(form.get('phone') || '');
    const pickupAt = String(form.get('pickup_at') || '');
    const returnAt = String(form.get('return_at') || '');
    const location = String(form.get('location') || '');
    const carName = selectedCar?.name || String(form.get('car_id') || '');
    let licensePath = '';
    const file = form.get('license') as File;

    if (hasSupabase && file && file.size) {
      const path = `licenses/${Date.now()}-${file.name}`;
      const upload = await supabase!.storage.from('licenses').upload(path, file);
      if (!upload.error) licensePath = path;
    }

    const payload = {
      customer_name: customerName,
      phone,
      pickup_at: pickupAt,
      return_at: returnAt,
      car_id: carName,
      location,
      license_path: licensePath,
      status: 'Pending'
    };

    const bookingMessage = buildBookingMessage({
      customerName,
      phone,
      pickupAt,
      returnAt,
      location,
      carName,
      licensePath
    });

    const links = {
      whatsapp: buildBookingWhatsappLink(bookingMessage),
      email: buildBookingEmailLink(`New booking request - ${carName}`, bookingMessage)
    };

    if (hasSupabase) {
      const { error } = await supabase!.from('bookings').insert(payload);
      if (error) {
        setNotifyLinks(null);
        setMessage(error.message);
        return;
      }

      setNotifyLinks(links);
      setMessage('Booking request submitted successfully. WhatsApp opened; email copy is ready below.');
      window.open(links.whatsapp, '_blank', 'noopener,noreferrer');
    } else {
      console.log(payload);
      setNotifyLinks(links);
      setMessage('Demo mode: booking captured in browser console. Add Supabase keys to save data.');
    }
  }

  return (
    <main className="section">
      <div className="container">
        <div className="title">
          <h2>Booking Request</h2>
          <p>Check car availability, send a quick WhatsApp inquiry, or submit a booking request.</p>
        </div>

        <section className="panel booking-availability">
          <div className="booking-availability-head">
            <div>
              <span className="eyebrow">Check Availability</span>
              <h3>All Cars For Booking</h3>
            </div>
            {loadingCars && <p>Loading cars...</p>}
          </div>

          <div className="booking-car-grid">
            {cars.map((car) => (
              <article className="booking-car-card" key={car.id}>
                {car.image_url ? <img src={car.image_url} alt={car.name} /> : <div className="booking-car-empty">No Image</div>}
                <div>
                  <h4>{car.name}</h4>
                  <p>Rs. {car.price_per_day}/day • Rs. {car.price_per_hour}/hour</p>
                  <div className="meta">
                    <span>{car.fuel_type}</span>
                    <span>{car.transmission}</span>
                    <span>{car.seats} Seats</span>
                  </div>
                  <span className={`availability-pill ${(car.status || 'Available').toLowerCase().replace(/\s+/g, '-')}`}>
                    {availabilityText(car)}
                  </span>
                </div>
                <div className="booking-card-actions">
                  <button
                    className="btn dark"
                    type="button"
                    onClick={() => {
                      setSelectedCarId(car.id);
                      setCheckedCarId(car.id);
                    }}
                  >
                    Check Availability
                  </button>
                  <a className="btn" href={buildWhatsappLink(car)} target="_blank" rel="noopener noreferrer">
                    WhatsApp Query
                  </a>
                </div>
              </article>
            ))}
          </div>

          {checkedCar && (
            <div className="availability-result">
              <strong>{checkedCar.name}</strong> is currently <b>{availabilityText(checkedCar)}</b>.
              <a href={buildWhatsappLink(checkedCar)} target="_blank" rel="noopener noreferrer">
                Send this car query on WhatsApp
              </a>
            </div>
          )}
        </section>

        <form className="panel" onSubmit={submit}>
          <div className="grid2">
            <div className="field">
              <label>Name</label>
              <input name="name" required />
            </div>
            <div className="field">
              <label>Phone</label>
              <input name="phone" required />
            </div>
            <div className="field">
              <label>Pickup Date & Time</label>
              <input type="datetime-local" name="pickup_at" required />
            </div>
            <div className="field">
              <label>Return Date & Time</label>
              <input type="datetime-local" name="return_at" required />
            </div>
            <div className="field">
              <label>Selected Car</label>
              <select name="car_id" value={selectedCarId} onChange={(e) => setSelectedCarId(e.target.value)}>
                {cars.map((car) => (
                  <option key={car.id} value={car.id}>
                    {car.name} - {availabilityText(car)}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>Pickup Location</label>
              <input name="location" defaultValue={officeLocation} required />
            </div>
            <div className="field">
              <label>Driving License Upload</label>
              <input type="file" name="license" accept="image/*,.pdf" />
            </div>
          </div>

          <button className="btn dark" type="submit">Submit Booking</button>
          {selectedCar && (
            <a className="btn booking-whatsapp" href={buildWhatsappLink(selectedCar)} target="_blank" rel="noopener noreferrer">
              WhatsApp Selected Car
            </a>
          )}
          {message && <p><b>{message}</b></p>}
          {notifyLinks && (
            <div className="availability-result">
              <strong>Send booking details:</strong>
              <a href={notifyLinks.whatsapp} target="_blank" rel="noopener noreferrer">
                Open WhatsApp
              </a>
              <a href={notifyLinks.email}>
                Send Email Copy
              </a>
            </div>
          )}
        </form>
      </div>
    </main>
  );
}
