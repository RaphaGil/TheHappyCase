const SITE_URL =
  process.env.VITE_SITE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://thehappycase.store';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/cart',
        '/checkout',
        '/login',
        '/authentication',
        '/my-orders',
        '/dashboard',
        '/payment-success',
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
