import './globals.css';
import './visual-overrides.css';
import Link from 'next/link';

export const metadata = {
  title: 'Ride Aura Self Drive | Odisha Self-Drive Car Rental',
  description: 'Book self-drive cars in Odisha with Ride Aura Self Drive at rideauraselfdrive.co.in'
};

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919114030650';
const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP_URL || 'https://wa.me/message/4G6UESYCXY2BD1';
const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/ride_aura_0650?igsh=MTBkMWwxdHpwdnBkcw==';
const facebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_URL || '#';
const officeAddress = <>Plot No-1155/3939<br/>Soubhagya Nagar, Bank Colony<br/>Near SBI ATM, Delta<br/>Bhubaneswar, Odisha - 751003</>;

function Header(){
  return <header className="top">
    <div className="top-strip"><div className="container top-strip-inner"><span>Serving Across Odisha</span><span>Nearly 10 Years of Experience</span><span>Free Pickup: Bhubaneswar Airport & Railway Station</span></div></div>
    <div className="container nav">
      <Link className="brand" href="/"><span className="logo"><img src="/rideaura-logo-navbar.png" alt="Ride Aura Self Drive logo"/></span><span className="brand-text">Ride Aura<br/><small>SELF DRIVE</small></span></Link>
      <nav className="links"><Link href="/">Home</Link><Link href="/#fleet">Cars</Link><Link href="/#how">How It Works</Link><Link href="/#why">Destinations</Link><Link href="/about">About Us</Link><Link href="/faq">FAQ</Link><Link href="/contact">Contact</Link><Link href="/admin/login" className="login-link">Admin</Link></nav>
      <a href={whatsappUrl} className="btn nav-book" target="_blank" rel="noopener noreferrer">Book Now</a>
    </div>
  </header>
}

function Footer(){
  return <footer className="site-footer"><div className="container footer-grid"><div><h3>Ride Aura Self Drive</h3><p><strong>Your Ride. Your Route. Your Freedom.</strong></p><p>Reliable self-drive car rentals from Bhubaneswar for journeys across Odisha.</p><p><strong>Rooted in Odisha. Driven by Freedom.</strong></p></div><div><h3>Quick Links</h3><ul><li><Link href="/">Home</Link></li><li><Link href="/about">About Us</Link></li><li><Link href="/#fleet">Our Fleet</Link></li><li><Link href="/#why">Services</Link></li><li><Link href="/faq">FAQ</Link></li><li><Link href="/terms">Terms & Conditions</Link></li></ul></div><div><h3>Pickup Convenience</h3><ul><li>Bhubaneswar Airport Pickup</li><li>Bhubaneswar Railway Station Pickup</li><li>Serving Across Odisha</li><li>Nearly 10 Years of Experience</li></ul></div><div><h3>Contact</h3><div className="socials"><a className="social-icon facebook" href={facebookUrl} aria-label="Facebook" target="_blank" rel="noopener noreferrer">f</a><a className="social-icon instagram" href={instagramUrl} aria-label="Instagram" target="_blank" rel="noopener noreferrer">IG</a><a className="social-icon whatsapp" href={whatsappUrl} aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">WA</a></div><p><strong>Address:</strong><br/>{officeAddress}</p><p><strong>Phone:</strong><br/><a href={`tel:+${whatsappNumber}`}>+91 91140 30650</a></p><p><strong>Email:</strong><br/><a href="mailto:booking@rideauraselfdrive.co.in">booking@rideauraselfdrive.co.in</a></p></div></div><div className="container footer-bottom">&copy; Ride Aura Self Drive. All Rights Reserved.</div></footer>
}

export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body id="home"><Header/>{children}<Footer/></body></html>}
