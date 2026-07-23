'use client';

import { useEffect, useState } from 'react';
import { type Car } from '@/lib/data';
import { hasSupabase, supabase } from '@/lib/supabase';

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919114030650';
const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP_URL || 'https://wa.me/message/4G6UESYCXY2BD1';
const officeLocation = 'Plot No-1155/3939, Soubhagya Nagar, Bank Colony, Near SBI ATM, Delta, Bhubaneswar, Odisha - 751003';

const faqs = [
  {
    question: '1. What documents are required to rent a self-drive car or bike?',
    answer: 'A valid driving licence, Aadhaar card or another government-issued identity proof, and address verification may be required before vehicle handover. Ride Aura may request additional verification depending on the booking.'
  },
  {
    question: '2. What is the minimum age for booking?',
    answer: 'The customer should be legally eligible to drive in India and must carry an original valid driving licence during the rental period. Age and document checks are confirmed before handover.'
  },
  {
    question: '3. Is there a security deposit?',
    answer: 'Yes, a refundable security deposit may apply depending on the selected car, rental duration and verification. Deductions may apply for damage, challans, fuel shortage, late return or policy violations.'
  },
  {
    question: '4. How do I book a car or bike?',
    answer: 'You can search vehicles on the website, submit the booking request form, or contact Ride Aura directly on WhatsApp. The team confirms availability, documents, payment and pickup details before final handover.'
  },
  {
    question: '5. Do you provide pickup and drop service?',
    answer: 'Pickup and drop service is available within Bhubaneswar. Extra charges may apply based on distance and location. Airport and railway station pickup support is available as per booking confirmation.'
  },
  {
    question: '6. Can I drive outside Bhubaneswar?',
    answer: 'Yes, cars and bikes can be used for Odisha trips including Puri, Konark, Chilika and other permitted destinations, subject to booking terms, kilometer limits and route approval where applicable.'
  },
  {
    question: '7. What is included in the rental price?',
    answer: 'Rental price normally covers vehicle usage for the selected time plan. Fuel, tolls, parking, state permits, traffic fines and extra kilometer or late return charges are generally paid by the customer unless specifically included.'
  },
  {
    question: '8. What is the fuel policy?',
    answer: 'Fuel is usually the customer responsibility unless a special package says otherwise. The vehicle should be returned as per the fuel level or fuel policy communicated during booking.'
  },
  {
    question: '9. What happens if I return the car late?',
    answer: 'Late return charges may apply. If you need more time, please contact Ride Aura before the scheduled return time. Extensions depend on vehicle availability and approval.'
  },
  {
    question: '10. What if the car is damaged or there is an accident?',
    answer: 'Inform Ride Aura immediately. The customer must cooperate with photos, videos, police reporting, insurance documentation and other claim requirements. Charges may apply as per damage, insurance and rental terms.'
  },
  {
    question: '11. Are there driving restrictions?',
    answer: 'Rash driving, racing, overloading, towing, commercial use, illegal activity, drunk driving and driving by an unauthorized person are not allowed. The customer must follow traffic laws and use the vehicle responsibly.'
  },
  {
    question: '12. What is the cancellation policy?',
    answer: 'Cancellation and refund depend on how early the booking is cancelled, vehicle allocation and payment terms. Convenience charges or non-refundable charges may be deducted where applicable.'
  },
  {
    question: '13. How can I contact Ride Aura?',
    answer: 'You can call +91 91140 30650 or +91 63716 00719, email booking@rideauraselfdrive.co.in, or visit Plot No-1155/3939, Soubhagya Nagar, Bank Colony, Near SBI ATM, Delta, Bhubaneswar, Odisha - 751003.'
  },
  {
    question: '14. Are there kilometre limits?',
    answer: 'Kilometre limits may depend on the selected rental plan, car category and booking duration. Any extra kilometre charges, if applicable, will be communicated by Ride Aura before confirmation.'
  },
  {
    question: '15. Can I extend my booking?',
    answer: 'Yes, booking extension can be requested before the scheduled return time. Extension approval depends on car availability, payment confirmation and Ride Aura approval.'
  },
  {
    question: '16. Who can drive the vehicle?',
    answer: 'Only the renter or a verified authorised driver approved for the booking may drive the vehicle. Sub-letting or allowing an unauthorised person to drive may lead to deposit forfeiture and additional liability.'
  },
  {
    question: '17. Which activities are not allowed?',
    answer: 'The vehicle must not be used for racing, towing, taxi service, commercial goods carrying, product promotion, illegal activity, drunk driving, drug-influenced driving or any activity prohibited by law or Ride Aura terms.'
  },
  {
    question: '18. Are pets, arms or banned substances allowed?',
    answer: 'No. Customers are not allowed to carry arms, ammunitions, banned drugs or pets in Ride Aura vehicles. Penalties may apply if prohibited items or misuse are found.'
  },
  {
    question: '19. Are there restricted travel areas?',
    answer: 'Phulbani, Koraput and Malkangiri belts in Odisha are restricted areas for Ride Aura bookings. A booking for these restricted areas may be treated as cancelled.'
  },
  {
    question: '20. Who pays traffic fines or challans?',
    answer: 'The customer is responsible for traffic fines, parking fines, toll violations, e-challans and penalties during the rental period. Ride Aura may recover such amounts even if the challan is received later.'
  },
  {
    question: '21. Is smoking or drinking allowed inside the vehicle?',
    answer: 'No. Smoking, drinking and drugs are not allowed inside Ride Aura vehicles. Cleaning charges or penalties may apply if smell, stains, prohibited items or related evidence are found.'
  },
  {
    question: '22. What should I check before taking delivery?',
    answer: 'Customers should check the car condition, fuel level, documents, photos/videos, accessories and existing damage before handover. Any concern should be reported to Ride Aura immediately.'
  },
  {
    question: '23. What happens if I miss pickup time?',
    answer: 'If the customer does not collect the vehicle within the permitted pickup window and does not inform Ride Aura, the booking may be treated as a no-show and applicable charges may apply.'
  },
  {
    question: '24. Can Ride Aura cancel or change a booking?',
    answer: 'Ride Aura may offer an alternate vehicle or cancel/refund where a car becomes unavailable due to breakdown, maintenance, accident, documentation issue, safety concern or unavoidable operational reason.'
  }
];

export default function Home(){
  const [cars, setCars] = useState<Car[]>([]);
  const [loadingCars, setLoadingCars] = useState(true);

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

      if (!error && data) setCars(data as Car[]);
      setLoadingCars(false);
    }

    loadCars();
  }, []);

  return <main>
    <section className="hero odisha-hero">
      <div className="hero-ornament left" aria-hidden="true"></div>
      <div className="hero-ornament right" aria-hidden="true"></div>
      <div className="odisha-identity" aria-hidden="true">
        <img src="/odisha-hero-cars.png" alt=""/>
      </div>
      <div className="temple-line" aria-hidden="true"></div>
      <div className="container hero-stage">
        <div className="hero-copy">
          <span className="badge">Drive Your Journey</span>
          <h1>Explore <em>Odisha</em></h1>
          <p className="tagline">The Soul of Incredible India</p>
          <p>Premium self-drive cars and bikes for every journey. From sacred temples to scenic coasts, experience Odisha on your own wheels.</p>
          <div className="hero-actions">
            <a className="btn" href="#booking">Book Your Ride</a>
            <a className="btn ghost" href="#fleet">View Fleet</a>
          </div>
          <div className="hero-trust">
            <span>Safe and Reliable</span>
            <span>Cars and Bikes</span>
            <span>24/7 Customer Support</span>
          </div>
        </div>
        <form className="hero-search" id="booking">
          <label><span>Pick-Up Location</span><select defaultValue=""><option value="" disabled>Select Location</option><option>{officeLocation}</option><option>Bhubaneswar Airport - Free Pickup</option><option>Bhubaneswar Railway Station - Free Pickup</option></select></label>
          <label><span>Pick-Up Date</span><input type="date"/></label>
          <label><span>Pick-Up Time</span><input type="time"/></label>
          <label><span>Drop-Off Date</span><input type="date"/></label>
          <a className="btn search-btn" href="/booking">Search Vehicles</a>
        </form>
        <div className="hero-benefits">
          <div><b>Easy Booking</b><span>Quick and Hassle Free</span></div>
          <div><b>Affordable Prices</b><span>Best Price Guarantee</span></div>
          <div><b>Self-Drive Freedom</b><span>Drive on Your Terms</span></div>
          <div><b>Insurance Covered</b><span>Complete Peace of Mind</span></div>
        </div>
      </div>
    </section>

    <section className="section" id="fleet"><div className="container"><div className="title"><span className="eyebrow">Our Fleet</span><h2>Choose the car or bike that fits your journey</h2><p>Only vehicles added from the Ride Aura admin dashboard are shown here.</p></div>{loadingCars ? <div className="panel">Loading Ride Aura vehicles...</div> : <div className="grid3">{cars.map(car=><article className="card fleet-card" key={car.id}>{car.image_url ? <img src={car.image_url} alt={car.name}/> : <div className="booking-car-empty">No Image</div>}<div className="card-body"><h3>{car.name}</h3><div className="meta"><span>{car.seats} Seats</span><span>{car.fuel_type}</span><span>{car.transmission}</span><span>{car.status}</span></div><div className="price-row"><div className="price-box"><small>Per Day</small><div className="price">Rs. {car.price_per_day}</div></div><div className="price-box"><small>Per Hour</small><div className="price">Rs. {car.price_per_hour}</div></div></div><a className="btn" href="/booking" style={{width:'100%'}}>Check Availability</a></div></article>)}{cars.length === 0 && <div className="panel">No vehicles added yet. Add cars or bikes from the admin dashboard to show them here.</div>}</div>}</div></section>
    <section className="section band heritage-band" id="why"><div className="konark-mark" aria-hidden="true"></div><div className="container"><div className="title"><span className="eyebrow">Why Choose Ride Aura Self Drive?</span><h2>Premium freedom with Odisha-rooted service</h2><p>Your Ride. Your Route. Your Freedom.</p></div><div className="grid6"><div className="benefit-card"><b>01</b><h3>Well Maintained Vehicles</h3><p>Clean and reliable cars and bikes prepared for confident self-drive journeys.</p></div><div className="benefit-card"><b>02</b><h3>Transparent Pricing</h3><p>Clear rental plans with simple communication before you travel.</p></div><div className="benefit-card"><b>03</b><h3>No Driver - 100% Freedom</h3><p>Drive at your pace with your route, schedule and privacy.</p></div><div className="benefit-card"><b>04</b><h3>24/7 Customer Support</h3><p>Helpful support for booking, pickup and journey questions.</p></div><div className="benefit-card"><b>05</b><h3>Easy Booking Process</h3><p>Choose your date, pickup point and vehicle in a clean booking flow.</p></div><div className="benefit-card"><b>06</b><h3>Hassle-Free Experience</h3><p>Airport and railway station pickup support for smooth starts.</p></div></div></div></section>
    <section className="section" id="how"><div className="container"><div className="title"><span className="eyebrow">How It Works</span><h2>From booking to driving in 4 simple steps</h2></div><div className="grid4 steps-grid"><div className="step-card"><span>1</span><h3>Choose Your Vehicle</h3><p>Browse available cars and bikes and select one that matches your journey.</p></div><div className="step-card"><span>2</span><h3>Select Your Dates</h3><p>Choose pickup and return date/time according to your travel plan.</p></div><div className="step-card"><span>3</span><h3>Complete Verification</h3><p>Submit required documents and complete the simple booking process.</p></div><div className="step-card"><span>4</span><h3>Take the Wheel</h3><p>Collect your vehicle, start the engine and enjoy the freedom.</p></div></div></div></section>
    <section className="section odisha-section"><div className="container odisha-copy"><span className="eyebrow">Explore Odisha Your Way</span><h2>One ride. Endless destinations.</h2><p>Drive or ride from Bhubaneswar to Puri, experience the heritage of Konark, explore Chilika, escape to the hills, discover hidden waterfalls, or enjoy a memorable road trip with the people who matter most.</p><a className="btn" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Plan My Journey</a></div></section>
    <section className="section"><div className="container"><div className="title"><span className="eyebrow">Customer Reviews</span><h2>Trusted for comfortable self-drive journeys</h2></div><div className="grid3"><div className="review-card"><p>Booking was simple and the car was clean. Good option for Bhubaneswar travel.</p><strong>Verified Customer</strong></div><div className="review-card"><p>Airport pickup support made the journey easy. Clear communication from the team.</p><strong>Business Traveler</strong></div><div className="review-card"><p>Flexible timing and helpful support. Perfect for a weekend Odisha trip.</p><strong>Weekend Traveler</strong></div></div></div></section>
    <section className="section band" id="faq"><div className="container"><div className="title"><span className="eyebrow">FAQ</span><h2>Frequently Asked Questions</h2><p>Clear answers for documents, deposits, pickup, fuel, late return, cancellation and safe self-drive usage.</p><a className="btn" href="/faq" style={{marginTop:'22px'}}>View Full FAQ</a></div><div className="faq-list">{faqs.slice(0,5).map((faq,index)=><details open={index===0} key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></div></section>
    <a className="whatsapp-float" href={whatsappUrl} target="_blank" rel="noopener noreferrer">WA</a>
  </main>
}
