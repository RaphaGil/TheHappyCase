/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://thehappycase.store',
  generateRobotsTxt: true,
  outDir: 'out',
  exclude: [
    '/cart',
    '/checkout',
    '/login',
    '/payment-success',
    '/my-orders',
    '/authentication',
    '/authentication/code',
  ],
  changefreq: 'weekly',
  priority: 0.7,
  transform: async (config, path) => {
    // Higher priority for key landing pages
    const priorityMap = {
      '/': 1,
      '/custom-passport-holder': 0.95,
      '/passport-cases': 0.9,
      '/passport-cases/economy': 0.85,
      '/passport-cases/first-class': 0.85,
      '/passport-cases/business-class': 0.85,
      '/charms': 0.9,
      '/charms/colorful': 0.85,
      '/charms/bronze': 0.85,
      '/charms/flags': 0.85,
      '/colorful-charms': 0.85,
      '/bronze-charms': 0.85,
      '/flags': 0.85,
      '/design-ideas': 0.85,
      '/about': 0.8,
      '/faq': 0.8,
      '/shipping': 0.75,
      '/returns': 0.75,
      '/privacy-policy': 0.6,
    };
    const priority = priorityMap[path] ?? config.priority;
    const changefreq = path === '/' ? 'daily' : path.startsWith('/passport-cases') || path.startsWith('/charms') ? 'weekly' : 'monthly';
    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};
