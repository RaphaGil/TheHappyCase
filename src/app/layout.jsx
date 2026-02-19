import LayoutClient from './layout-client';
import '@/index.css';
import '@/App.css';

const SITE_URL = process.env.VITE_SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://thehappycase.store';
const DEFAULT_IMAGE = `${SITE_URL}/assets/logo.webp`;

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'The Happy Case - Custom Passport Cases with Personalized Charms',
    template: '%s | The Happy Case',
  },
  description: 'Create custom passport cases with personalized charms. Choose from 3 case styles, 40+ design ideas, and bronze or colorful pins. Perfect travel gift.',
  keywords: ['passport case', 'custom passport holder', 'travel gifts', 'personalized passport cover', 'charm passport case'],
  authors: [{ name: 'The Happy Case' }],
  openGraph: {
    type: 'website',
    siteName: 'The Happy Case',
    title: 'The Happy Case - Custom Passport Cases with Personalized Charms',
    description: 'Create custom passport cases with personalized charms. Choose from 3 case styles, 40+ design ideas, and bronze or colorful pins. Perfect travel gift.',
    images: [{ url: DEFAULT_IMAGE }],
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Happy Case - Custom Passport Cases with Personalized Charms',
    description: 'Create custom passport cases with personalized charms. Choose from 3 case styles, 40+ design ideas, and bronze or colorful pins.',
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
        
        {/* Structured Data (JSON-LD) for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'The Happy Case',
              url: SITE_URL,
              logo: DEFAULT_IMAGE,
              description: 'Custom passport cases with personalized charms. Choose from 3 case styles, 40+ design ideas, and bronze or colorful pins.',
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
