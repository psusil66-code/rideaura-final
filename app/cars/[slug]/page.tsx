import Link from 'next/link';
import { sampleCars } from '@/lib/data';

export default async function CarDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const car = sampleCars.find((item) => item.slug === slug) || sampleCars[0];

  return (
    <main className="section">
      <div className="container">
        <div className="grid2">
          <img className="card" src={car.image_url} alt={car.name} />
          <div>
            <h1 style={{ color: 'var(--navy)', fontSize: 48 }}>{car.name}</h1>
            <p>{car.description}</p>
            <div className="price">
              Rs. {car.price_per_day}/day | Rs. {car.price_per_hour}/hour
            </div>
            <div className="meta">
              <span>{car.fuel_type}</span>
              <span>{car.transmission}</span>
              <span>{car.seats} Seats</span>
              <span>{car.location}</span>
              <span>{car.status}</span>
            </div>
            <div className="actions">
              <Link className="btn" href={`/booking?car=${car.slug}`}>
                Book This Car
              </Link>
              <Link className="btn dark" href="/cars">
                Back to Cars
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
