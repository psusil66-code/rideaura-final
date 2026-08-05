import './globals.css';
import './visual-overrides.css';
import Link from 'next/link';
import type { Metadata } from 'next';
import Header from './header';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.rideauraselfdrive.co.in'),
  title: {
    default: 'Ride Aura Self Drive | Best Car & Bike Rental Service in Bhubaneswar',
    template: '%s | Ride Aura Self Drive'
  },
  description: 'Ride Aura Self Drive offers car rental service, bike rental service, self-drive cars and self-drive bikes in Bhubaneswar, Odisha for hourly, daily, airport pickup and outstation trips.',
  keywords: [
    'Ride Aura Self Drive',
    'best car rental service in Bhubaneswar',
    'best bike rental service in Bhubaneswar',
    'car rental Bhubaneswar',
    'car rental service in Bhubaneswar',
    'self drive car Bhubaneswar',
    'car self drive in Bhubaneswar',
    'selfdrive near me',
    'self drive near me',
    'self drive car rental Bhubaneswar',
    'bike rental Bhubaneswar',
    'bike rental service in Bhubaneswar',
    'bike self drive service in Bhubaneswar',
    'Bhubaneswar bike rent',
    'bike rent near me Bhubaneswar',
    'self drive bike rental Bhubaneswar',
    'scooter rental Bhubaneswar',
    'top 10 self drive in Bhubaneswar',
    'car hire Bhubaneswar',
    'rental car near me',
    'Bhubaneswar airport car rental',
    'Puri Konark Odisha self drive'
  ],
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: 'Ride Aura Self Drive | Best Car & Bike Rental Service in Bhubaneswar',
    description: 'Book bikes, scooters and self-drive cars in Bhubaneswar for city travel, airport pickup, railway station pickup, Puri, Konark, Chilika and Odisha road trips.',
    url: 'https://www.rideauraselfdrive.co.in',
    siteName: 'Ride Aura Self Drive',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/odisha-hero-cars.png', width: 1536, height: 864, alt: 'Ride Aura Self Drive car and bike rental in Odisha' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ride Aura Self Drive | Best Car & Bike Rental Service in Bhubaneswar',
    description: 'Car rental service, bike rental service, scooter rental and self-drive car rental in Bhubaneswar, Odisha.'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true
    }
  }
};

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919114030650';
const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP_URL || 'https://wa.me/message/4G6UESYCXY2BD1';
const secondPhone = '916371600719';
const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/ride_aura_0650?igsh=MTBkMWwxdHpwdnBkcw==';
const facebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_URL || '#';
const officeAddress = <>Plot No-1155/3939<br/>Soubhagya Nagar, Bank Colony<br/>Near SBI ATM, Delta<br/>Bhubaneswar, Odisha - 751003</>;
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'AutoRental',
  '@id': 'https://www.rideauraselfdrive.co.in/#localbusiness',
  name: 'Ride Aura Self Drive',
  alternateName: 'Ride Aura',
  url: 'https://www.rideauraselfdrive.co.in',
  logo: 'https://www.rideauraselfdrive.co.in/rideaura-logo-navbar.png',
  image: 'https://www.rideauraselfdrive.co.in/odisha-hero-cars.png',
  description: 'Ride Aura Self Drive provides car rental service, bike rental service, scooter rental, self-drive car rental and bike self-drive service in Bhubaneswar, Odisha for hourly, daily, weekend, airport pickup, railway station pickup and outstation trips.',
  email: 'booking@rideauraselfdrive.co.in',
  telephone: ['+91 91140 30650', '+91 63716 00719'],
  priceRange: 'Rs. 500+',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Plot No-1155/3939, Soubhagya Nagar, Bank Colony, Near SBI ATM, Delta',
    addressLocality: 'Bhubaneswar',
    addressRegion: 'Odisha',
    postalCode: '751003',
    addressCountry: 'IN'
  },
  areaServed: [
    'Bhubaneswar',
    'Puri',
    'Konark',
    'Chilika',
    'Odisha'
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Ride Aura Self Drive Rentals',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Best Car Rental Service in Bhubaneswar',
          serviceType: 'Self drive car rental and car self drive in Bhubaneswar'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Best Bike Rental Service in Bhubaneswar',
          serviceType: 'Bike rental service and bike self drive service in Bhubaneswar'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Scooter Rental in Bhubaneswar',
          serviceType: 'Scooter rental and two-wheeler rental'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Airport and Railway Station Pickup Support',
          serviceType: 'Vehicle rental pickup support'
        }
      }
    ]
  },
  sameAs: [
    'https://www.instagram.com/ride_aura_0650?igsh=MTBkMWwxdHpwdnBkcw=='
  ]
};

function Footer(){
  return <footer className="site-footer"><div className="container footer-grid"><div><h3>Ride Aura Self Drive</h3><p><strong>Your Ride. Your Route. Your Freedom.</strong></p><p>Reliable self-drive car and bike rentals from Bhubaneswar for journeys across Odisha.</p><p><strong>Rooted in Odisha. Driven by Freedom.</strong></p></div><div><h3>Quick Links</h3><ul><li><Link href="/">Home</Link></li><li><Link href="/about">About Us</Link></li><li><Link href="/#fleet">Our Fleet</Link></li><li><Link href="/#why">Services</Link></li><li><Link href="/faq">FAQ</Link></li><li><Link href="/terms">Terms & Conditions</Link></li></ul></div><div><h3>Pickup Convenience</h3><ul><li>Bhubaneswar Airport Pickup</li><li>Bhubaneswar Railway Station Pickup</li><li>Serving Across Odisha</li><li>Nearly 10 Years of Experience</li></ul></div><div><h3>Contact</h3><div className="socials"><a className="social-icon facebook" href={facebookUrl} aria-label="Facebook" target="_blank" rel="noopener noreferrer">f</a><a className="social-icon instagram" href={instagramUrl} aria-label="Instagram" target="_blank" rel="noopener noreferrer">IG</a><a className="social-icon whatsapp" href={whatsappUrl} aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">WA</a></div><p><strong>Address:</strong><br/>{officeAddress}</p><p><strong>Phone:</strong><br/><a href={`tel:+${whatsappNumber}`}>+91 91140 30650</a><br/><a href={`tel:+${secondPhone}`}>+91 63716 00719</a></p><p><strong>Email:</strong><br/><a href="mailto:booking@rideauraselfdrive.co.in">booking@rideauraselfdrive.co.in</a></p></div></div><div className="container footer-bottom">&copy; Ride Aura Self Drive. All Rights Reserved.</div></footer>
}

export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body id="home"><script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(localBusinessSchema)}}/><Header/>{children}<Footer/></body></html>}
