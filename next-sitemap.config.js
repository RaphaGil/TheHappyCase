/**
 * Generates out/sitemap.xml and out/robots.txt after `next build` (see "postbuild" in package.json).
 * This is the single source for both files.
 * @type {import('next-sitemap').IConfig}
 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thehappycase.store';

// Pages that should never be indexed (transactional, account or admin pages)
const PRIVATE_PATHS = [
  '/cart',
  '/checkout',
  '/login',
  '/payment-success',
  '/my-orders',
  '/authentication',
  '/dashboard',
  '/AddText',
];

// Redirect-only or duplicate pages: kept out of the sitemap so Google indexes the main URL
const NOT_IN_SITEMAP = [
  ...PRIVATE_PATHS.flatMap((p) => [p, `${p}/*`]),
  '/charms',
  '/passport-cases',
  '/colorfulcharms',
  '/bronzecharms',
  '/flags',
  '/refundpolicy',
  '/404',
  '/_not-found',
];

const img = (path) => siteUrl + path;

// Representative images per page for Google Image search
const PAGE_IMAGES = {
  '/': [img('/og-image.jpg'), img('/images/SmartCase/economycaselightpink.webp')],
  '/custom-passport': [img('/images/SmartCase/economycaselightpink.webp'), img('/images/FirstClassCase/firstclasscasebrown.webp')],
  '/design-ideas': [img('/images/Designideas/designidea1.webp'), img('/images/Designideas/designidea2.webp'), img('/images/Designideas/designidea3.webp')],
  '/passport-cases/economy': [img('/images/SmartCase/economycaselightpink.webp'), img('/images/SmartCase/economycasejeansblue.webp'), img('/images/SmartCase/economycaseblack.webp')],
  '/passport-cases/first-class': [img('/images/FirstClassCase/firstclasscasebrown.webp'), img('/images/FirstClassCase/firstclasscasepink.webp')],
  '/passport-cases/business-class': [img('/images/BusinessClassCase/businessclasscasegray.webp'), img('/images/BusinessClassCase/businessclasscasepink.webp')],
  '/charms/colorful': [img('/images/ColorfulPins/heartglobe.webp'), img('/images/ColorfulPins/airplane.webp')],
  '/charms/bronze': [img('/images/BronzePins/airplane.webp'), img('/images/BronzePins/globe.webp')],
  '/charms/flags': [img('/images/Flags/france.webp'), img('/images/Flags/brazil.webp')],
};

const PRIORITY = {
  '/': 1,
  '/custom-passport': 0.95,
  '/passport-cases/economy': 0.9,
  '/passport-cases/first-class': 0.9,
  '/passport-cases/business-class': 0.9,
  '/charms/colorful': 0.85,
  '/charms/bronze': 0.85,
  '/charms/flags': 0.85,
  '/design-ideas': 0.85,
  '/about': 0.6,
  '/faq': 0.7,
  '/shipping': 0.6,
  '/returns': 0.5,
  '/privacypolicy': 0.3,
};

export default {
  siteUrl,
  outDir: 'out',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: NOT_IN_SITEMAP,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/', disallow: PRIVATE_PATHS }],
  },
  transform: async (config, path) => {
    // Next exports some folders with their original casing; always publish lowercase URLs
    const loc = path.toLowerCase() === path ? path : path.toLowerCase();
    const changefreq = loc === '/' ? 'daily' : loc.startsWith('/passport-cases') || loc.startsWith('/charms') ? 'weekly' : 'monthly';
    return {
      loc,
      changefreq,
      priority: PRIORITY[loc] ?? 0.5,
      lastmod: new Date().toISOString(),
      images: (PAGE_IMAGES[loc] || []).map((url) => ({ loc: new URL(url) })),
    };
  },
};
