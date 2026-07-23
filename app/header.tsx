'use client';

import Link from 'next/link';
import { useState } from 'react';

const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP_URL || 'https://wa.me/message/4G6UESYCXY2BD1';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="top">
      <div className="top-strip">
        <div className="container top-strip-inner">
          <span>Serving Across Odisha</span>
          <span>Nearly 10 Years of Experience</span>
          <span>Free Pickup: Bhubaneswar Airport & Railway Station</span>
        </div>
      </div>
      <div className="container nav">
        <Link className="brand" href="/" onClick={closeMenu}>
          <span className="logo"><img src="/rideaura-logo-navbar.png" alt="Ride Aura Self Drive logo" /></span>
          <span className="brand-text">Ride Aura<br /><small>SELF DRIVE</small></span>
        </Link>
        <nav className="links">
          <Link href="/">Home</Link>
          <Link href="/cars">Cars</Link>
          <Link href="/bikes">Bikes</Link>
          <Link href="/#how">How It Works</Link>
          <Link href="/#why">Destinations</Link>
          <Link href="/about">About Us</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/admin/login" className="login-link">Admin</Link>
        </nav>
        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          <button type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen}>
            Menu
          </button>
          {menuOpen && (
            <nav>
              <Link href="/" onClick={closeMenu}>Home</Link>
              <Link href="/cars" onClick={closeMenu}>Cars</Link>
              <Link href="/bikes" onClick={closeMenu}>Bikes</Link>
              <Link href="/#how" onClick={closeMenu}>How It Works</Link>
              <Link href="/#why" onClick={closeMenu}>Destinations</Link>
              <Link href="/about" onClick={closeMenu}>About Us</Link>
              <Link href="/faq" onClick={closeMenu}>FAQ</Link>
              <Link href="/contact" onClick={closeMenu}>Contact</Link>
              <Link href="/admin/login" onClick={closeMenu}>Admin</Link>
            </nav>
          )}
        </div>
        <a href={whatsappUrl} className="btn nav-book" target="_blank" rel="noopener noreferrer">Book Now</a>
      </div>
    </header>
  );
}
