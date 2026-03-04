/** @type {import('next-sitemap').IConfig} */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thehappycase.store';

// Representative images per page for Google Image Sitemap (helps images appear in search)
const PAGE_IMAGES = {
  '/': [siteUrl + '/assets/logo.webp'],
  '/custom-passport-holder': [siteUrl + '/assets/logo.webp', siteUrl + '/images/SmartCase/economycaselightpink.webp'],
  '/design-ideas': [siteUrl + '/images/ColorfulPins/airplane.webp', siteUrl + '/images/BronzePins/airplane.webp', siteUrl + '/images/Flags/france.webp'],
  '/passport-cases': [siteUrl + '/images/SmartCase/economycaselightpink.webp', siteUrl + '/images/FirstClassCase/firstclasscasebrown.webp', siteUrl + '/images/BusinessClassCase/businessclasscasegray.webp'],
  '/passport-cases/economy': [siteUrl + '/images/SmartCase/economycaselightpink.webp', siteUrl + '/images/SmartCase/economycaseblack.webp'],
  '/passport-cases/first-class': [siteUrl + '/images/FirstClassCase/firstclasscasebrown.webp', siteUrl + '/images/FirstClassCase/firstclasscasepink.webp'],
  '/passport-cases/business-class': [siteUrl + '/images/BusinessClassCase/businessclasscasegray.webp', siteUrl + '/images/BusinessClassCase/businessclasscasepink.webp'],
  '/charms': [siteUrl + '/images/ColorfulPins/heartglobe.webp', siteUrl + '/images/BronzePins/airplane.webp', siteUrl + '/images/Flags/france.webp'],
  '/charms/colorful': [siteUrl + '/images/ColorfulPins/heartglobe.webp', siteUrl + '/images/ColorfulPins/airplane.webp'],
  '/charms/bronze': [siteUrl + '/images/BronzePins/airplane.webp', siteUrl + '/images/BronzePins/globe.webp'],
  '/charms/flags': [siteUrl + '/images/Flags/france.webp', siteUrl + '/images/Flags/brazil.webp'],
  '/colorful-charms': [siteUrl + '/images/ColorfulPins/heartglobe.webp', siteUrl + '/images/ColorfulPins/airplane.webp'],
  '/bronze-charms': [siteUrl + '/images/BronzePins/airplane.webp'],
  '/flags': [siteUrl + '/images/Flags/france.webp', siteUrl + '/images/Flags/brazil.webp'],
};

export default {
  siteUrl,
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
    const images = PAGE_IMAGES[path]?.map((loc) => ({ loc })) ?? [{ loc: siteUrl + '/assets/logo.webp' }];
    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
      images,
    };
  },
};
