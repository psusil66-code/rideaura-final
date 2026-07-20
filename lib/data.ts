export type Car = {
  id: string;
  name: string;
  slug: string;
  image_url: string;
  price_per_day: number;
  price_per_hour: number;
  fuel_type: string;
  transmission: string;
  seats: number;
  location: string;
  status: 'Available' | 'Not Available' | 'Booked' | 'Maintenance';
  unavailable_until?: string | null;
  description: string;
};

export const sampleCars: Car[] = [
  {
    id: '1',
    name: 'Maruti Swift',
    slug: 'maruti-swift',
    image_url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=900&q=80',
    price_per_day: 999,
    price_per_hour: 120,
    fuel_type: 'Petrol',
    transmission: 'Manual',
    seats: 5,
    location: 'Your City',
    status: 'Available',
    description: 'Easy city hatchback for daily self-drive trips.'
  },
  {
    id: '2',
    name: 'Honda City',
    slug: 'honda-city',
    image_url: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=900&q=80',
    price_per_day: 1499,
    price_per_hour: 180,
    fuel_type: 'Petrol',
    transmission: 'Automatic',
    seats: 5,
    location: 'Your City',
    status: 'Available',
    description: 'Comfort sedan for families, business trips and smooth drives.'
  },
  {
    id: '3',
    name: 'Mahindra XUV',
    slug: 'mahindra-xuv',
    image_url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80',
    price_per_day: 2499,
    price_per_hour: 300,
    fuel_type: 'Diesel',
    transmission: 'Manual',
    seats: 7,
    location: 'Your City',
    status: 'Available',
    description: 'Spacious SUV for weekend plans and outstation trips.'
  }
];
