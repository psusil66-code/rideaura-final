import './globals.css';
import './visual-overrides.css';
import Link from 'next/link';
import Header from './header';

export const metadata = {
  title: 'Ride Aura Self Drive | Odisha Self-Drive Car Rental',
  description: 'Book self-drive cars in Odisha with Ride Aura Self Drive at rideauraselfdrive.co.in'
};

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919114030650';
const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP_URL || 'https://wa.me/message/4G6UESYCXY2BD1';
const secondPhone = '916371600719';
const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/ride_aura_0650?igsh=MTBkMWwxdHpwdnBkcw==';
const facebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_URL || '#';
const officeAddress = <>Plot No-1155/3939<br/>Soubhagya Nagar, Bank Colony<br/>Near SBI ATM, Delta<br/>Bhubaneswar, Odisha - 751003</>;

function Footer(){
  return <footer className="site-footer"><div className="container footer-grid"><div><h3>Ride Aura Self Drive</h3><p><strong>Your Ride. Your Route. Your Freedom.</strong></p><p>Reliable self-drive car rentals from Bhubaneswar for journeys across Odisha.</p><p><strong>Rooted in Odisha. Driven by Freedom.</strong></p></div><div><h3>Quick Links</h3><ul><li><Link href="/">Home</Link></li><li><Link href="/about">About Us</Link></li><li><Link href="/#fleet">Our Fleet</Link></li><li><Link href="/#why">Services</Link></li><li><Link href="/faq">FAQ</Link></li><li><Link href="/terms">Terms & Conditions</Link></li></ul></div><div><h3>Pickup Convenience</h3><ul><li>Bhubaneswar Airport Pickup</li><li>Bhubaneswar Railway Station Pickup</li><li>Serving Across Odisha</li><li>Nearly 10 Years of Experience</li></ul></div><div><h3>Contact</h3><div className="socials"><a className="social-icon facebook" href={facebookUrl} aria-label="Facebook" target="_blank" rel="noopener noreferrer">f</a><a className="social-icon instagram" href={instagramUrl} aria-label="Instagram" target="_blank" rel="noopener noreferrer">IG</a><a className="social-icon whatsapp" href={whatsappUrl} aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">WA</a></div><p><strong>Address:</strong><br/>{officeAddress}</p><p><strong>Phone:</strong><br/><a href={`tel:+${whatsappNumber}`}>+91 91140 30650</a><br/><a href={`tel:+${secondPhone}`}>+91 63716 00719</a></p><p><strong>Email:</strong><br/><a href="mailto:booking@rideauraselfdrive.co.in">booking@rideauraselfdrive.co.in</a></p></div></div><div className="container footer-bottom">&copy; Ride Aura Self Drive. All Rights Reserved.</div></footer>
}

export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body id="home"><Header/>{children}<Footer/></body></html>}
