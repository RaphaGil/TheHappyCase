import LayoutClient from './layout-client';
import '@/index.css';
import '@/App.css';

const SITE_URL = process.env.VITE_SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://thehappycase.store';
const DEFAULT_IMAGE = `${SITE_URL}/assets/logo.webp`;

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Personalised Passport Cases with Charms | The Happy Case',
    template: '%s | The Happy Case',
  },
  description:
    'Design a personalised passport case with charms and your name. Colourful, bronze and flag charms, RFID protection and UK delivery. The perfect travel gift.',
  applicationName: 'The Happy Case',
  authors: [{ name: 'The Happy Case' }],
  openGraph: {
    type: 'website',
    siteName: 'The Happy Case',
    locale: 'en_GB',
    title: 'Personalised Passport Cases with Charms | The Happy Case',
    description:
      'Design a personalised passport case with charms and your name. Colourful, bronze and flag charms, RFID protection and UK delivery.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Personalised passport case with bronze charms and a name' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Personalised Passport Cases with Charms | The Happy Case',
    description:
      'Design a personalised passport case with charms and your name. Colourful, bronze and flag charms, RFID protection and UK delivery.',
    images: ['/og-image.jpg'],
  },
  robots: { index: true, follow: true, 'max-image-preview': 'large' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-VWGSV9DW34"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-VWGSV9DW34');
            `,
          }}
        />
        <link rel="icon" href="/assets/logo.webp" />
        <meta name="theme-color" content="#30279f" />
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
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  name: 'The Happy Case',
                  url: SITE_URL,
                  logo: DEFAULT_IMAGE,
                  image: `${SITE_URL}/og-image.jpg`,
                  description:
                    'Personalised passport cases with charms and names, designed by you. Economy, First Class and Business Class cases with colourful, bronze and flag charms.',
                  areaServed: 'GB',
                  sameAs: [
                    'https://www.etsy.com/shop/TheHappyCaseShop',
                    'https://instagram.com/thehappycase.store',
                    'https://tiktok.com/@thehappycase.store',
                    'https://facebook.com/thehappycase',
                  ],
                },
                {
                  '@type': 'WebSite',
                  name: 'The Happy Case',
                  url: SITE_URL,
                  inLanguage: 'en-GB',
                  description:
                    'Design your own personalised passport case with charms, flags and a name.',
                },
                {
                  '@type': 'ItemList',
                  name: 'Custom Passport Cases',
                  description:
                    'Economy, First Class, and Business Class passport holders with personalized charms.',
                  url: `${SITE_URL}/passport-cases`,
                  numberOfItems: 3,
                  itemListElement: [
                    {
                      '@type': 'ListItem',
                      position: 1,
                      name: 'Economy Passport Case',
                      url: `${SITE_URL}/passport-cases/economy`,
                      image: `${SITE_URL}/images/SmartCase/economycaselightpink.webp`,
                    },
                    {
                      '@type': 'ListItem',
                      position: 2,
                      name: 'First Class Passport Case',
                      url: `${SITE_URL}/passport-cases/first-class`,
                      image: `${SITE_URL}/images/FirstClassCase/firstclasscasebrown.webp`,
                    },
                    {
                      '@type': 'ListItem',
                      position: 3,
                      name: 'Business Class Passport Case',
                      url: `${SITE_URL}/passport-cases/business-class`,
                      image: `${SITE_URL}/images/BusinessClassCase/businessclasscasegray.webp`,
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      <body>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
