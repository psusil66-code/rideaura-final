import Link from 'next/link';
import { sampleCars } from '@/lib/data';

export default function Cars(){return <main className="section"><div className="container"><div className="title"><h2>Cars</h2><p>Browse the RideAura fleet. Connect Supabase to load real cars from the admin dashboard.</p></div><div className="grid3">{sampleCars.map(car=><article className="card" key={car.id}><img src={car.image_url} alt={car.name}/><div className="card-body"><h3>{car.name}</h3><div className="price">Rs. {car.price_per_day}/day</div><div className="meta"><span>{car.fuel_type}</span><span>{car.transmission}</span><span>{car.seats} Seats</span><span>{car.location}</span></div><p>{car.description}</p><Link className="btn dark" href={`/cars/${car.slug}`}>Details</Link></div></article>)}</div></div></main>}
