'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './admin.css';
export default function AdminLayout({children}:{children:React.ReactNode}){const pathname=usePathname();if(pathname==='/admin/login')return <>{children}</>;return <div className="admin-layout"><aside className="sidebar"><h2>RideAura Admin</h2><Link href="/admin">Dashboard</Link><Link href="/admin/cars">Cars</Link><Link href="/admin/bookings">Bookings</Link><Link href="/">View Website</Link></aside><section className="admin-main">{children}</section></div>}
