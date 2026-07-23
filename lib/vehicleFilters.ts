import { type Car } from '@/lib/data';

const bikeKeywords = [
  'bike',
  'scooter',
  'scooty',
  'activa',
  'dio',
  'jupiter',
  'access',
  'ntorq',
  'pleasure',
  'splendor',
  'shine',
  'pulsar',
  'apache',
  'bullet',
  'royal enfield',
  'duke',
  'fz',
  'r15',
  'mt 15',
  'mt-15',
  'hunter',
  'classic 350',
  'meteor'
];

export function isBike(vehicle: Car) {
  const name = vehicle.name.toLowerCase();
  const description = (vehicle.description || '').toLowerCase();

  return vehicle.seats <= 2 || bikeKeywords.some((keyword) => name.includes(keyword) || description.includes(keyword));
}

export function isCar(vehicle: Car) {
  return !isBike(vehicle);
}
