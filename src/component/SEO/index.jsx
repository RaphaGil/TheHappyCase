import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://thehappycase.shop';
const DEFAULT_IMAGE = `${SITE_URL}/assets/logo.webp`;

const PAGE_META = {
  '/': {
    title: 'The Happy Case - Custom Passport Cases with Personalized Charms',
    description: 'Create custom passport cases with personalized charms. Choose from 3 case styles, 40+ design ideas, and bronze or colorful pins. Perfect travel gift.',
  },
  '/CreateYours': {
    title: 'Create Your Passport Case | The Happy Case',
    description: 'Design your custom passport case with our interactive designer. Choose colours, add charms, and create a unique travel accessory.',
  },
  '/DesignIdeas': {
    title: 'Passport Case Design Ideas | The Happy Case',
    description: 'Explore 40+ passport case design ideas. Get inspired by our gallery of custom passport holders with charms and personalisation.',
  },
  '/PassportCases': {
    title: 'Passport Cases | Economy, First Class & Business Class | The Happy Case',
    description: 'Shop passport cases in 3 styles: Economy, First Class, and Business Class. Multiple colours and personalisation options.',
  },
  '/Charms': {
    title: 'Passport Charms & Pins | Bronze & Colorful | The Happy Case',
    description: 'Browse 40+ passport charms and pins. Bronze and colorful options - airplanes, landmarks, and travel-themed designs.',
  },
  '/Flags': {
    title: 'Flag Charms for Passport Cases | The Happy Case',
    description: 'Add flag charms to your passport case. Show your heritage or commemorate your travels.',
  },
  '/ColorfulCharms': {
    title: 'Colorful Passport Charms | The Happy Case',
    description: 'Colorful passport charms and pins for your custom passport case. Fun travel-themed designs.',
  },
  '/BronzeCharms': {
    title: 'Bronze Passport Charms | The Happy Case',
    description: 'Bronze passport charms and pins. Classic metallic finishes for elegant passport case customisation.',
  },
  '/cart': {
    title: 'Shopping Cart | The Happy Case',
    description: 'Review your custom passport cases and charms. Complete your order at The Happy Case.',
  },
  '/about': {
    title: 'About Us | The Happy Case',
    description: 'Learn about The Happy Case - custom passport cases with personalised charms. Our story and passion for travel accessories.',
  },
  '/returns': {
    title: 'Returns & Refund Policy | The Happy Case',
    description: 'The Happy Case returns and refund policy. Easy returns on custom passport cases.',
  },
  '/refund-policy': {
    title: 'Refund Policy | The Happy Case',
    description: 'The Happy Case refund policy for custom passport cases.',
  },
  '/shipping': {
    title: 'Shipping Information | The Happy Case',
    description: 'Shipping options and delivery times for The Happy Case custom passport cases.',
  },
};

function getMetaForPath(pathname) {
  const basePath = pathname.split('/').slice(0, 2).join('/') || '/';
  return PAGE_META[pathname] || PAGE_META[basePath] || PAGE_META['/'];
}

export default function SEO() {
  const { pathname } = useLocation();
  const normalizedPath = pathname.replace(/\/+$/, '') || '/';
  const meta = getMetaForPath(normalizedPath);
  const canonicalUrl = `${SITE_URL}${normalizedPath === '/' ? '' : normalizedPath}`;

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={DEFAULT_IMAGE} />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={DEFAULT_IMAGE} />
    </Helmet>
  );
}
