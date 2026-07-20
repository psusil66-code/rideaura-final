# RideAura SelfDrive Starter Website

Beginner-friendly starter project for a professional self-drive car rental startup website.

Business details already added:

- Domain: `rideauraselfdrive.co.in`
- WhatsApp/Mobile: `+91 91140 30650`
- Office location: `Saubhagya Nagar, Delta`
- Brand: `RideAura SelfDrive`

## Features

- Customer website: Home, Cars, Car Details, Pricing, Booking, About, Contact
- Admin login screen
- Admin dashboard
- Admin car management screen
- Admin bookings screen
- Booking form with driving license upload field
- WhatsApp contact buttons
- Supabase database schema
- Supabase Storage plan for car images and license uploads
- Vercel deployment instructions
- GoDaddy domain connection instructions

## Tech Stack

- Next.js
- React
- Supabase
- Vercel
- GoDaddy domain

## Project Folder

```text
C:\CODEX\rideaura-starter
```

## 1. Install Node.js

Install Node.js LTS from:

```text
https://nodejs.org
```

## 2. Install Packages

Open terminal inside the project folder and run:

```bash
npm install
```

## 3. Start Website Locally

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## 4. Create Supabase Project

1. Go to `https://supabase.com`
2. Create account or login
3. Click `New Project`
4. Project name: `rideaura-selfdrive`
5. Save your database password safely
6. Choose nearest region, such as Singapore if available
7. Wait for project creation

## 5. Create Database Tables

Open Supabase SQL Editor and run the SQL from:

```text
supabase/schema.sql
```

This creates:

- `cars`
- `bookings`

## 6. Create Supabase Storage Buckets

In Supabase Storage create two buckets:

```text
car-images
licenses
```

Recommended:

- `car-images`: public
- `licenses`: private

Use `car-images` for car photos.
Use `licenses` for customer driving license uploads.

## 7. Add Environment Variables

Copy `.env.example` to `.env.local`:

```bash
copy .env.example .env.local
```

Fill these values from Supabase Project Settings > API:

```text
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_WHATSAPP_NUMBER=919114030650
NEXT_PUBLIC_SITE_URL=https://rideauraselfdrive.co.in
NEXT_PUBLIC_BUSINESS_NAME=RideAura SelfDrive
NEXT_PUBLIC_OFFICE_LOCATION=Saubhagya Nagar, Delta
```

Do not add the Supabase service role key to frontend code.

## 8. Push To GitHub

1. Create GitHub repository, suggested name:

```text
rideaura-selfdrive
```

2. Upload/push this project to that repository.

## 9. Deploy On Vercel

1. Go to `https://vercel.com`
2. Click `Add New Project`
3. Import your GitHub repository
4. Add the same environment variables in Vercel Project Settings
5. Click Deploy

## 10. Connect GoDaddy Domain

Your purchased domain:

```text
rideauraselfdrive.co.in
```

In Vercel:

1. Open project settings
2. Go to `Domains`
3. Add:

```text
rideauraselfdrive.co.in
www.rideauraselfdrive.co.in
```

Vercel will show DNS records.

In GoDaddy:

1. Open domain DNS settings
2. Add/update records exactly as Vercel shows
3. Usually this includes an `A` record for root domain and `CNAME` for `www`
4. Wait for DNS to update. It can take a few minutes to 24 hours.

## Admin Maintenance

Admin can manage:

- Add cars
- Edit cars
- Delete cars
- Update car price
- Update car photo
- Update fuel type
- Update transmission
- Update seats
- Update location
- Update availability status
- View bookings
- Set booking status: Pending, Confirmed, Rejected, Completed

## Important Next Work

This starter contains the pages and structure. Before launch, complete these:

1. Connect live Supabase keys
2. Make admin add/edit/delete save to Supabase live
3. Protect admin pages with Supabase Auth session check
4. Add your real car photos and prices
5. Add Google Maps link for Saubhagya Nagar, Delta
6. Test booking and upload flow
7. Deploy on Vercel
8. Connect GoDaddy domain

## Real Business Details Still Needed

- Exact city/state for Saubhagya Nagar, Delta
- Google Maps link
- Car model list
- Car real photos
- Price per hour/day/week/month
- Security deposit
- Fuel policy
- Kilometer limit
- Extra kilometer charge
- Late return charges
- Cancellation policy
