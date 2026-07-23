'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { hasSupabase, supabase } from '@/lib/supabase';

type Car = {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
  price_per_day: number;
  price_per_hour: number;
  fuel_type: string | null;
  transmission: string | null;
  seats: number | null;
  location: string | null;
  status: string | null;
  unavailable_until: string | null;
  description: string | null;
};

const emptyCar = {
  name: '',
  price_per_day: '',
  price_per_hour: '',
  fuel_type: 'Petrol',
  transmission: 'Manual',
  seats: '5',
  location: 'Bhubaneswar',
  status: 'Available',
  unavailable_until: '',
  description: '',
};

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export default function AdminCars() {
  const router = useRouter();
  const [cars, setCars] = useState<Car[]>([]);
  const [form, setForm] = useState(emptyCar);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const editingCar = useMemo(() => cars.find((car) => car.id === editingId), [cars, editingId]);

  async function loadCars() {
    if (!supabase) return;
    const { data, error } = await supabase.from('cars').select('*').order('created_at', { ascending: false });
    if (error) setMessage(error.message);
    else setCars((data || []) as Car[]);
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

      await loadCars();
      setLoading(false);
    }

    init();
  }, [router]);

  function updateField(name: string, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  function startEdit(car: Car) {
    setEditingId(car.id);
    setImageFile(null);
    setForm({
      name: car.name || '',
      price_per_day: String(car.price_per_day || ''),
      price_per_hour: String(car.price_per_hour || ''),
      fuel_type: car.fuel_type || 'Petrol',
      transmission: car.transmission || 'Manual',
      seats: String(car.seats || 5),
      location: car.location || 'Bhubaneswar',
      status: car.status || 'Available',
      unavailable_until: car.unavailable_until || '',
      description: car.description || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function resetForm() {
    setEditingId(null);
    setImageFile(null);
    setForm(emptyCar);
  }

  async function uploadImage() {
    if (!supabase || !imageFile) return editingCar?.image_url || '';

    const extension = imageFile.name.split('.').pop() || 'jpg';
    const path = `cars/${Date.now()}-${slugify(form.name)}.${extension}`;
    const { error } = await supabase.storage.from('car-images').upload(path, imageFile, { upsert: true });
    if (error) throw error;

    const { data } = supabase.storage.from('car-images').getPublicUrl(path);
    return data.publicUrl;
  }

  async function saveCar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!supabase) return;

    setSaving(true);
    setMessage('');

    try {
      const imageUrl = await uploadImage();
      const payload = {
        name: form.name,
        slug: slugify(form.name),
        image_url: imageUrl || null,
        price_per_day: Number(form.price_per_day || 0),
        price_per_hour: Number(form.price_per_hour || 0),
        fuel_type: form.fuel_type,
        transmission: form.transmission,
        seats: Number(form.seats || 0),
        location: form.location,
        status: form.status,
        unavailable_until: form.status === 'Not Available' ? form.unavailable_until || null : null,
        description: form.description,
      };

      const request = editingId
        ? supabase.from('cars').update(payload).eq('id', editingId)
        : supabase.from('cars').insert(payload);

      const { error } = await request as { error: any };
      if (error) throw error;

      setMessage(editingId ? 'Vehicle updated successfully.' : 'Vehicle added successfully.');
      resetForm();
      await loadCars();
    } catch (error: any) {
      setMessage(error.message || 'Unable to save car.');
    } finally {
      setSaving(false);
    }
  }

  async function deleteCar(id: string) {
    if (!supabase) return;
    if (!confirm('Delete this vehicle?')) return;

    const { error } = await supabase.from('cars').delete().eq('id', id);
    if (error) setMessage(error.message);
    else {
      setMessage('Vehicle deleted.');
      await loadCars();
    }
  }

  async function signOut() {
    await supabase?.auth.signOut();
    router.push('/admin/login');
  }

  if (loading) return <main className="admin-page"><p>Loading admin vehicles...</p></main>;

  return <main className="admin-page"><div className="admin-page-head"><div><h1>Manage Cars & Bikes</h1><p>Add cars or bikes, upload pictures, update pricing and change availability.</p></div><button className="btn dark" onClick={signOut}>Logout</button></div>{message && <p className="admin-notice">{message}</p>}<form className="panel admin-form" onSubmit={saveCar}><h2>{editingId ? 'Edit Vehicle' : 'Add New Car / Bike'}</h2><div className="grid2"><div className="field"><label>Vehicle Name</label><input value={form.name} onChange={(e)=>updateField('name', e.target.value)} placeholder="Maruti Swift or Honda Activa" required/></div><div className="field"><label>Price Per Day</label><input type="number" value={form.price_per_day} onChange={(e)=>updateField('price_per_day', e.target.value)} placeholder="1800" required/></div><div className="field"><label>Price Per Hour</label><input type="number" value={form.price_per_hour} onChange={(e)=>updateField('price_per_hour', e.target.value)} placeholder="150"/></div><div className="field"><label>Fuel Type</label><select value={form.fuel_type} onChange={(e)=>updateField('fuel_type', e.target.value)}><option>Petrol</option><option>Diesel</option><option>CNG</option><option>EV</option></select></div><div className="field"><label>Transmission</label><select value={form.transmission} onChange={(e)=>updateField('transmission', e.target.value)}><option>Manual</option><option>Automatic</option></select></div><div className="field"><label>Seats / Riders</label><input type="number" value={form.seats} onChange={(e)=>updateField('seats', e.target.value)} placeholder="2 for bike, 5 for car"/></div><div className="field"><label>Location</label><input value={form.location} onChange={(e)=>updateField('location', e.target.value)} placeholder="Bhubaneswar"/></div><div className="field"><label>Availability</label><label className="admin-check-option"><input type="checkbox" checked={form.status === 'Available'} onChange={(e)=>updateField('status', e.target.checked ? 'Available' : 'Not Available')}/><span>{form.status === 'Available' ? 'Available' : 'Not Available'}</span></label></div>{form.status === 'Not Available' && <div className="field"><label>Unavailable Until</label><input type="date" value={form.unavailable_until} onChange={(e)=>updateField('unavailable_until', e.target.value)} required/></div>}<div className="field wide"><label>Description</label><textarea value={form.description} onChange={(e)=>updateField('description', e.target.value)} placeholder="Short car or bike details"></textarea></div><div className="field wide"><label>Vehicle Photo</label><input type="file" accept="image/*" onChange={(e)=>setImageFile(e.target.files?.[0] || null)}/>{editingCar?.image_url && <a href={editingCar.image_url} target="_blank" rel="noopener noreferrer">View current photo</a>}</div></div><div className="admin-actions"><button className="btn dark" disabled={saving}>{saving ? 'Saving...' : editingId ? 'Update Vehicle' : 'Save Vehicle'}</button>{editingId && <button className="btn" type="button" onClick={resetForm}>Cancel Edit</button>}</div></form><h2>Current Cars & Bikes</h2><div className="admin-table-wrap"><table className="table"><thead><tr><th>Photo</th><th>Vehicle</th><th>Day Price</th><th>Hour Price</th><th>Fuel</th><th>Status</th><th>Unavailable Until</th><th>Action</th></tr></thead><tbody>{cars.map(car=><tr key={car.id}><td>{car.image_url ? <img className="admin-thumb" src={car.image_url} alt={car.name}/> : 'No image'}</td><td>{car.name}</td><td>Rs. {car.price_per_day}</td><td>Rs. {car.price_per_hour}</td><td>{car.fuel_type}</td><td className="status">{car.status}</td><td>{car.unavailable_until || '-'}</td><td><button type="button" onClick={()=>startEdit(car)}>Edit</button><button type="button" onClick={()=>deleteCar(car.id)}>Delete</button></td></tr>)}{cars.length === 0 && <tr><td colSpan={8}>No vehicles added yet.</td></tr>}</tbody></table></div></main>;
}
