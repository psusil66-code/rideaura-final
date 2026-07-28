'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { type Car } from '@/lib/data';
import { hasSupabase, supabase } from '@/lib/supabase';
import { isBike, isCar } from '@/lib/vehicleFilters';
import './booking.css';

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919114030650';
const businessEmail = 'booking@rideauraselfdrive.co.in';
const officeLocation = 'Saubhagya Nagar, Delta';
const minimumBookingHours = 12;
const maxDocumentBytes = 1024 * 1024;
const maxDocumentLabel = '1 MB';

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
    'Hi Ride Aura, I want to check vehicle availability.',
    `Vehicle: ${car.name}`,
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
  aadhaarPath: string;
  passportPath: string;
  customerType: string;
}) {
  return [
    'New Ride Aura booking request',
    `Customer: ${details.customerName}`,
    `Customer type: ${details.customerType}`,
    `Phone: ${details.phone}`,
    `Vehicle: ${details.carName}`,
    `Pickup: ${formatDateTime(details.pickupAt)}`,
    `Return: ${formatDateTime(details.returnAt)}`,
    `Pickup location: ${details.location}`,
    details.licensePath ? `License uploaded: ${details.licensePath}` : 'License uploaded: No',
    details.aadhaarPath ? `Aadhaar uploaded: ${details.aadhaarPath}` : 'Aadhaar uploaded: No',
    details.passportPath ? `Passport uploaded: ${details.passportPath}` : 'Passport uploaded: No',
    'Please confirm availability and booking.'
  ].join('\n');
}

function isValidUpload(file: FormDataEntryValue | null): file is File {
  return file instanceof File && file.size > 0;
}

function validateDocument(file: FormDataEntryValue | null, label: string) {
  if (!isValidUpload(file)) {
    return `${label} upload is mandatory.`;
  }

  if (file.size > maxDocumentBytes) {
    return `${label} must be ${maxDocumentLabel} or less. Please compress the file and upload again.`;
  }

  return '';
}

function safeFileName(fileName: string) {
  return fileName.toLowerCase().replace(/[^a-z0-9.]+/g, '-').replace(/^-|-$/g, '');
}

function encodeDocumentPaths(paths: { licensePath: string; aadhaarPath: string; passportPath: string; customerType: string }) {
  return JSON.stringify(paths);
}

function buildBookingWhatsappLink(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function buildBookingEmailLink(subject: string, body: string) {
  return `mailto:${businessEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function Booking() {
  const formRef = useRef<HTMLFormElement>(null);
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCarId, setSelectedCarId] = useState('');
  const [checkedCarId, setCheckedCarId] = useState('');
  const [message, setMessage] = useState('');
  const [notifyLinks, setNotifyLinks] = useState<{ whatsapp: string; email: string } | null>(null);
  const [loadingCars, setLoadingCars] = useState(true);
  const [customerType, setCustomerType] = useState('Indian');

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
        const params = new URLSearchParams(window.location.search);
        const selectedVehicle = params.get('vehicle') || '';
        const type = params.get('type') || '';
        const allVehicles = data as Car[];
        const liveCars = type === 'bike'
          ? allVehicles.filter(isBike)
          : type === 'car'
            ? allVehicles.filter(isCar)
            : allVehicles;
        setCars(liveCars);
        setSelectedCarId(liveCars.find((car) => car.id === selectedVehicle)?.id || liveCars[0]?.id || '');
      }

      setLoadingCars(false);
    }

    loadCars();
  }, []);

  function chooseCarForBooking(car: Car) {
    setSelectedCarId(car.id);
    setCheckedCarId(car.id);
    setNotifyLinks(null);
    setMessage(`${car.name} selected for booking. Availability: ${availabilityText(car)}.`);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const customerName = String(form.get('name') || '');
    const phone = String(form.get('phone') || '');
    const pickupAt = String(form.get('pickup_at') || '');
    const returnAt = String(form.get('return_at') || '');
    const location = String(form.get('location') || '');
    const bookingCustomerType = String(form.get('customer_type') || 'Indian');
    const isNriCustomer = bookingCustomerType === 'NRI';
    const carName = selectedCar?.name || String(form.get('car_id') || '');
    const durationHours = (new Date(returnAt).getTime() - new Date(pickupAt).getTime()) / (1000 * 60 * 60);
    let licensePath = '';
    let aadhaarPath = '';
    let passportPath = '';
    const licenseFile = form.get('license');
    const aadhaarFile = form.get('aadhaar');
    const passportFile = form.get('passport');

    if (!Number.isFinite(durationHours) || durationHours < minimumBookingHours) {
      setNotifyLinks(null);
      setMessage(`Minimum booking duration is ${minimumBookingHours} hours. Please select a later return date/time.`);
      return;
    }

    const documentError = validateDocument(licenseFile, 'Driving License')
      || validateDocument(aadhaarFile, 'Aadhaar')
      || (isNriCustomer ? validateDocument(passportFile, 'Passport') : '');
    if (documentError) {
      setNotifyLinks(null);
      setMessage(documentError);
      return;
    }

    const validLicenseFile = licenseFile as File;
    const validAadhaarFile = aadhaarFile as File;
    const validPassportFile = passportFile as File;

    if (hasSupabase) {
      const timestamp = Date.now();
      licensePath = `documents/${timestamp}-driving-license-${safeFileName(validLicenseFile.name)}`;
      aadhaarPath = `documents/${timestamp}-aadhaar-${safeFileName(validAadhaarFile.name)}`;
      const licenseUpload = await supabase!.storage.from('licenses').upload(licensePath, validLicenseFile);
      if (licenseUpload.error) {
        setNotifyLinks(null);
        setMessage(licenseUpload.error.message);
        return;
      }

      const aadhaarUpload = await supabase!.storage.from('licenses').upload(aadhaarPath, validAadhaarFile);
      if (aadhaarUpload.error) {
        setNotifyLinks(null);
        setMessage(aadhaarUpload.error.message);
        return;
      }

      if (isNriCustomer) {
        passportPath = `documents/${timestamp}-passport-${safeFileName(validPassportFile.name)}`;
        const passportUpload = await supabase!.storage.from('licenses').upload(passportPath, validPassportFile);
        if (passportUpload.error) {
          setNotifyLinks(null);
          setMessage(passportUpload.error.message);
          return;
        }
      }
    }

    const payload = {
      customer_name: customerName,
      phone,
      pickup_at: pickupAt,
      return_at: returnAt,
      car_id: carName,
      location,
      license_path: encodeDocumentPaths({ licensePath, aadhaarPath, passportPath, customerType: bookingCustomerType }),
      status: 'Pending'
    };

    const bookingMessage = buildBookingMessage({
      customerName,
      phone,
      pickupAt,
      returnAt,
      location,
      carName,
      licensePath,
      aadhaarPath,
      passportPath,
      customerType: bookingCustomerType
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
    <main className="section booking-page">
      <div className="container">
        <div className="title booking-title">
          <h2>Booking Request</h2>
          <p>Check availability, send a quick WhatsApp inquiry, or submit a booking request.</p>
          <p className="booking-minimum-note">Minimum booking duration: {minimumBookingHours} hours.</p>
        </div>

        <section className="panel booking-availability">
          <div className="booking-availability-head">
            <div>
              <span className="eyebrow">Check Availability</span>
              <h3>Available Rental Options</h3>
              <p><a href="/cars">View Car Page</a> | <a href="/bikes">View Bike Page</a></p>
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
                    className="btn dark booking-action"
                    type="button"
                    onClick={() => {
                      setCheckedCarId(car.id);
                    }}
                  >
                    Availability
                  </button>
                  <button
                    className="btn booking-action"
                    type="button"
                    onClick={() => chooseCarForBooking(car)}
                  >
                    Book This Vehicle
                  </button>
                  <a className="btn booking-action booking-whatsapp-action" href={buildWhatsappLink(car)} target="_blank" rel="noopener noreferrer">
                    WhatsApp Query
                  </a>
                </div>
              </article>
            ))}
            {!loadingCars && cars.length === 0 && (
              <div className="panel">No cars added yet. Please add cars from the Ride Aura admin dashboard.</div>
            )}
          </div>

          {checkedCar && (
            <div className="availability-result">
              <strong>{checkedCar.name}</strong> is currently <b>{availabilityText(checkedCar)}</b>.
              <a href={buildWhatsappLink(checkedCar)} target="_blank" rel="noopener noreferrer">
                Send this vehicle query on WhatsApp
              </a>
            </div>
          )}
        </section>

        <form className="panel booking-form" ref={formRef} onSubmit={submit}>
          <div className="booking-form-head">
            <span className="eyebrow">Booking Form</span>
            <h3>{selectedCar ? `Book ${selectedCar.name}` : 'Select a vehicle to book'}</h3>
            {selectedCar && <p>Current status: <b>{availabilityText(selectedCar)}</b></p>}
            <p>Minimum booking duration is <b>{minimumBookingHours} hours</b>. Driving License and Aadhaar uploads are mandatory, maximum {maxDocumentLabel} each. NRI customers must also upload Passport.</p>
          </div>
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
              <label>Customer Type</label>
              <select name="customer_type" value={customerType} onChange={(e) => setCustomerType(e.target.value)} required>
                <option value="Indian">Indian Customer</option>
                <option value="NRI">NRI / Foreign Customer</option>
              </select>
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
              <label>Selected Vehicle</label>
              <select name="car_id" value={selectedCarId} onChange={(e) => setSelectedCarId(e.target.value)} required>
                {!selectedCarId && <option value="">Select Vehicle</option>}
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
            <div className="booking-document-notice">
              <strong>Document upload rule</strong>
              <span>Each document must be {maxDocumentLabel} or less. Upload clear image or PDF files only. Driving License and Aadhaar are mandatory for all online bookings; Passport is mandatory for NRI / Foreign customers.</span>
            </div>
            <div className="field">
              <label>Driving License Upload - Max {maxDocumentLabel}</label>
              <input type="file" name="license" accept="image/*,.pdf" required />
            </div>
            <div className="field">
              <label>Aadhaar Upload - Max {maxDocumentLabel}</label>
              <input type="file" name="aadhaar" accept="image/*,.pdf" required />
            </div>
            {customerType === 'NRI' && (
              <div className="field">
                <label>Passport Upload - Max {maxDocumentLabel}</label>
                <input type="file" name="passport" accept="image/*,.pdf" required />
              </div>
            )}
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
