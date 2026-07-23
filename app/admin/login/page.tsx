'use client';

import { ArrowRight, LockKeyhole, Mail, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { hasSupabase, supabase } from '@/lib/supabase';

export default function Login() {
  const [msg, setMsg] = useState('');
  const router = useRouter();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    if (!hasSupabase) {
      setMsg('Demo mode: add Supabase keys to enable login.');
      return;
    }

    const { error } = await supabase!.auth.signInWithPassword({
      email: String(form.get('email')),
      password: String(form.get('password')),
    });

    if (error) {
      setMsg(error.message);
      return;
    }

    setMsg('Logged in successfully. Opening dashboard...');
    router.push('/admin');
  }

  return (
    <main className="admin-login-page">
      <section className="admin-login-shell">
        <div className="admin-login-brand">
          <span className="admin-kicker">Ride Aura Self Drive</span>
          <h1>Admin Control Center</h1>
          <p>
            Securely manage cars, bikes, prices, availability, customer booking
            requests and Ride Aura operations from one dashboard.
          </p>
          <div className="admin-login-points">
            <span><ShieldCheck size={18} /> Supabase protected access</span>
            <span><ShieldCheck size={18} /> Booking and fleet management</span>
            <span><ShieldCheck size={18} /> Built for easy maintenance</span>
          </div>
        </div>

        <form className="admin-login-card" onSubmit={submit} method="post">
          <div className="admin-lock">
            <LockKeyhole size={28} />
          </div>
          <span className="admin-kicker">Authorized Login</span>
          <h2>Welcome back</h2>
          <p className="admin-login-note">
            Enter your admin email and password to continue.
          </p>
          <div className="field admin-field">
            <label>Email Address</label>
            <div className="admin-input-wrap">
              <Mail size={18} />
              <input name="email" type="email" placeholder="admin@example.com" required />
            </div>
          </div>

          <div className="field admin-field">
            <label>Password</label>
            <div className="admin-input-wrap">
              <LockKeyhole size={18} />
              <input name="password" type="password" placeholder="Enter password" required />
            </div>
          </div>

          <button className="btn admin-login-btn" type="submit">
            Login to Dashboard <ArrowRight size={18} />
          </button>

          {msg && <p className="admin-login-message">{msg}</p>}
        </form>
      </section>
    </main>
  );
}
