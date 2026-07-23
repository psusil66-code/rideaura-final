import type { MetadataRoute } from 'next';

const siteUrl = 'https://www.rideauraselfdrive.co.in';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/about', '/booking', '/cars', '/bikes', '/contact', '/faq', '/terms'];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
