import LayoutClient from './layout-client';
import '@/index.css';
import '@/App.css';

const SITE_URL = process.env.VITE_SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://thehappycase.store';
const DEFAULT_IMAGE = `${SITE_URL}/assets/logo.webp`;

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Custom Passport Cases with Charms',
    template: '%s | The Happy Case',
  },
  description: 'Create custom passport cases with charms at The Happy Case. Choose from Economy, First Class, and Business Class passport holders. Personalize with 40+ travel-themed charms, bronze pins, colorful designs, country flags and custom text. RFID-protected, water-resistant passport covers perfect for travelers.',
  keywords: ['custom passport holder', 'custom passport cover', 'custom passport case', 'custom passport wallet', 'custom passport stamp', 'passport case', 'travel gifts', 'personalized passport cover', 'personalized passport holder', 'custom passport cover with charms', 'aesthetic travel accessories', 'cute passport wallet', 'gift for travelers', 'bridesmaid travel gift', 'honeymoon travel accessories', 'handmade passport case', 'monogram passport holder', 'charm passport case', 'country flags', 'bronze pins', 'colorful pins', 'hand made gifts', 'personalized gifts', 'custom gifts', 'custom passport cases', 'custom passport holders', 'custom passport cases with charms', 'custom passport holders with charms', 'custom passport cases with charms and pins', 'custom passport case with name', 'personalized passport case', 'custom passport holders with charms and pins', 'customized wallet'],
  authors: [{ name: 'The Happy Case' }],
  openGraph: {
    type: 'website',
    siteName: 'The Happy Case',
    title: 'Custom Passport Cases with Charms',
    description: 'Create custom passport cases with charms at The Happy Case. Choose from Economy, First Class, and Business Class passport holders. Personalize with 40+ travel-themed charms, bronze pins, colorful designs, country flags and custom text. RFID-protected, water-resistant passport covers perfect for travelers. Free shipping available.',
    images: [{ url: DEFAULT_IMAGE, width: 512, height: 512, alt: 'The Happy Case - Custom Passport Cases with Charms' }],
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom Passport Cases with Charms',
    description: 'Create custom passport cases with charms at The Happy Case. Choose from Economy, First Class, and Business Class passport holders. Personalize with 40+ travel-themed charms, bronze pins, colorful designs, country flags and custom text. RFID-protected, water-resistant passport covers perfect for travelers.',
    images: [DEFAULT_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="icon" href="/assets/logo.webp" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/assets/logo.webp" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Resource hints for better performance */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka+One:wght@400&family=Inter:wght@200;300;400;500;600&display=swap"
          rel="stylesheet"
        />
        
        {/* Structured Data (JSON-LD) for Google - helps images appear in search */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'The Happy Case',
                url: SITE_URL,
                logo: DEFAULT_IMAGE,
                image: DEFAULT_IMAGE,
                description: 'Custom passport cases with charms at The Happy Case. Choose from Economy, First Class, and Business Class passport holders. Personalize with 40+ travel-themed charms, bronze pins, colorful designs, country flags and custom text. RFID-protected, water-resistant passport covers perfect for travelers.',
              },
              {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'The Happy Case',
                url: SITE_URL,
                image: DEFAULT_IMAGE,
                description: 'Custom passport cases with charms. Design your own passport holder with Economy, First Class, or Business Class styles. Add personalized charms, flags, and text.',
              },
              {
                '@context': 'https://schema.org',
                '@type': 'ItemList',
                name: 'Custom Passport Cases',
                description: 'Economy, First Class, and Business Class passport holders with personalized charms.',
                url: `${SITE_URL}/passport-cases`,
                numberOfItems: 3,
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Economy Passport Case', url: `${SITE_URL}/passport-cases/economy`, image: `${SITE_URL}/images/SmartCase/economycaselightpink.webp` },
                  { '@type': 'ListItem', position: 2, name: 'First Class Passport Case', url: `${SITE_URL}/passport-cases/first-class`, image: `${SITE_URL}/images/FirstClassCase/firstclasscasebrown.webp` },
                  { '@type': 'ListItem', position: 3, name: 'Business Class Passport Case', url: `${SITE_URL}/passport-cases/business-class`, image: `${SITE_URL}/images/BusinessClassCase/businessclasscasegray.webp` },
                ],
              },
            ]),
          }}
        />
      </head>
      <body>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
