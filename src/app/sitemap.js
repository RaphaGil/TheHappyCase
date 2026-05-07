const SITE_URL =
  process.env.VITE_SITE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://thehappycase.store';

export default function sitemap() {
  const now = new Date();

  const routes = [
    { path: '/', priority: 1.0, changeFrequency: 'daily' },
    { path: '/custom-passport', priority: 0.95, changeFrequency: 'weekly' },
    { path: '/design-ideas', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/passport-cases/economy', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/passport-cases/first-class', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/passport-cases/business-class', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/charms/colorful', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/charms/bronze', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/charms/flags', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/colorfulcharms', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/bronzecharms', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/faq', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/shipping', priority: 0.75, changeFrequency: 'monthly' },
    { path: '/returns', priority: 0.75, changeFrequency: 'monthly' },
    { path: '/privacypolicy', priority: 0.6, changeFrequency: 'monthly' },
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
