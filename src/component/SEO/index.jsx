'use client';

/**
 * SEO component – react-helmet-async for every page.
 * Rendered once in App.jsx; updates title, description, canonical, og:* and twitter:* from current route.
 */
import { Helmet } from 'react-helmet-async';
import { usePathname } from 'next/navigation';

// In Next.js, use process.env.NEXT_PUBLIC_* for client-accessible env variables
const getSiteUrl = () => {
  if (typeof process !== 'undefined' && process.env) {
    return process.env.NEXT_PUBLIC_SITE_URL || 
           process.env.VITE_SITE_URL || 
           'https://thehappycase.store';
  }
  return 'https://thehappycase.store';
};
const SITE_URL = getSiteUrl();
const DEFAULT_IMAGE = `${SITE_URL}/assets/logo.webp`;

const PAGE_META = {
  '/': {
    title: 'The Happy Case - Custom Passport Cases with Personalized Charms',
    description: 'Create custom passport cases with personalized charms at The Happy Case. Choose from Economy, First Class, and Business Class passport holders. Personalize with 40+ travel-themed charms, bronze pins, colorful designs, and custom text. RFID-protected, water-resistant passport covers perfect for travelers. Free shipping available.',
  },
  '/CreateYours': {
    title: 'Custom Passport Holder | Design Your Own | The Happy Case',
    description: 'Design your custom passport holder online. Choose from Economy, First Class, or Business Class styles. Add personalized charms, flags, and text. Create a unique passport case that reflects your travel style.',
  },
  '/custom-passport-holder': {
    title: 'Custom Passport Holder | Design Your Own | The Happy Case',
    description: 'Design your custom passport holder online. Choose from Economy, First Class, or Business Class styles. Add personalized charms, flags, and text. Create a unique passport case that reflects your travel style.',
  },
  '/DesignIdeas': {
    title: 'Passport Case Design Ideas | The Happy Case',
    description: 'Browse 40+ passport case design ideas and inspiration. Explore our gallery of custom passport holders featuring personalized charms, bronze pins, colorful designs, and unique travel-themed patterns. Get inspired to create your own custom passport cover.',
  },
  '/PassportCases': {
    title: 'Passport Cases | Economy, First Class & Business Class | The Happy Case',
    description: 'Shop premium passport cases in 3 styles: Economy, First Class, and Business Class. Choose from multiple colors, RFID protection, and personalize with charms and custom text. Water-resistant passport holders with card slots and boarding pass pockets. Perfect travel accessories.',
  },
  '/PassportCases/Economy': {
    title: 'Economy Passport Case | The Happy Case',
    description: 'Economy passport case - slim, lightweight passport holder with RFID protection. Available in 11 colors including pink, red, blue, brown, and black. Customize with travel charms and personalized text. Features card slots, boarding pass pocket, and magnetic closure. Perfect budget-friendly travel accessory.',
  },
  '/PassportCases/FirstClass': {
    title: 'First Class Passport Case | The Happy Case',
    description: 'First Class passport case - premium passport holder with extra space for stamps, visas, and travel documents. RFID-protected design available in multiple colors. Customize with charms and personalized text. Features multiple card slots, boarding pass pocket, and premium materials. Ideal for frequent travelers.',
  },
  '/PassportCases/BusinessClass': {
    title: 'Business Class Passport Case | The Happy Case',
    description: 'Business Class passport case - luxury passport holder with premium materials and elegant design. RFID-protected, water-resistant passport cover with spacious interior for documents, cards, and boarding passes. Customize with charms and personalized text. Perfect for business travelers and luxury travel enthusiasts.',
  },
  '/Charms': {
    title: 'Passport Charms & Pins | Bronze & Colorful | The Happy Case',
    description: 'Browse 40+ passport charms and decorative pins for your custom passport case. Choose from bronze metallic charms or colorful designs featuring airplanes, landmarks, flags, and travel-themed icons. Personalize your passport holder with unique charm combinations. Easy to attach, perfect for travel enthusiasts.',
  },
  '/Charms/Colorful': {
    title: 'Colorful Passport Charms | The Happy Case',
    description: 'Colorful passport charms and decorative pins for custom passport cases. Vibrant travel-themed designs including airplanes, landmarks, flags, and fun travel icons. Add personality to your passport holder with these eye-catching accessories. Perfect for travelers who love bold, colorful designs.',
  },
  '/Charms/Bronze': {
    title: 'Bronze Passport Charms | The Happy Case',
    description: 'Bronze passport charms and pins with classic metallic finishes. Elegant travel-themed designs including airplanes, landmarks, and sophisticated travel icons. Perfect for travelers who prefer timeless, elegant passport case accessories. Easy to attach and durable metallic construction.',
  },
  '/Flags': {
    title: 'Flag Charms for Passport Cases | The Happy Case',
    description: 'Add flag charms to your passport case to show your heritage or commemorate your travels. Choose from country flags and national symbols. Personalize your passport holder with flags representing your home country or destinations you\'ve visited. Perfect for travelers celebrating their cultural identity and travel memories.',
  },
  '/ColorfulCharms': {
    title: 'Colorful Passport Charms | The Happy Case',
    description: 'Colorful passport charms and decorative pins for custom passport cases. Vibrant travel-themed designs including airplanes, landmarks, flags, and fun travel icons. Add personality to your passport holder with these eye-catching accessories. Perfect for travelers who love bold, colorful designs.',
  },
  '/BronzeCharms': {
    title: 'Bronze Passport Charms | The Happy Case',
    description: 'Bronze passport charms and pins with classic metallic finishes. Elegant travel-themed designs including airplanes, landmarks, and sophisticated travel icons. Perfect for travelers who prefer timeless, elegant passport case accessories. Easy to attach and durable metallic construction.',
  },
  '/Cart': {
    title: 'Shopping Cart | The Happy Case',
    description: 'Review your custom passport cases and charms in your shopping cart. Check your personalized passport holder design, selected charms, and quantities. Complete your secure checkout at The Happy Case. Free shipping available on orders.',
  },
  '/about': {
    title: 'About Us | The Happy Case',
    description: 'Learn about The Happy Case - our story creating custom passport cases with personalized charms. Founded by a travel enthusiast, we design RFID-protected passport holders that combine style, functionality, and personalization. Discover our passion for travel accessories and commitment to quality.',
  },
  '/returns': {
    title: 'Returns & Refund Policy | The Happy Case',
    description: 'The Happy Case returns and refund policy. Easy returns on custom passport cases within 30 days. Learn about our hassle-free return process, refund eligibility, and how to return your personalized passport holder. Customer satisfaction guaranteed.',
  },
  '/refund-policy': {
    title: 'Refund Policy | The Happy Case',
    description: 'The Happy Case refund policy for custom passport cases. Learn about our refund process, eligibility requirements, and how to request a refund for your personalized passport holder. Customer satisfaction is our priority.',
  },
  '/shipping': {
    title: 'Shipping Information | The Happy Case',
    description: 'Shipping options and delivery times for The Happy Case custom passport cases. Free shipping available. Learn about our domestic and international shipping rates, estimated delivery times, and tracking information. Fast and secure delivery for your personalized passport holder.',
  },
  '/Privacy-policy': {
    title: 'Privacy Policy | The Happy Case',
    description: 'The Happy Case privacy policy. How we collect, use, and protect your personal information when you shop for custom passport cases and charms.',
  },
  '/faq': {
    title: 'FAQ | The Happy Case',
    description: 'Frequently asked questions about The Happy Case custom passport cases. Learn about customization, shipping, returns, payment, sizing, and care.',
  },
  '/Checkout': {
    title: 'Checkout | The Happy Case',
    description: 'Complete your order with secure checkout for your custom passport case. Safe payment processing with Stripe. Review your personalized passport holder, charms, and shipping details before finalizing your purchase. Multiple payment options available.',
  },
  '/Payment-success': {
    title: 'Order Confirmed | The Happy Case',
    description: 'Thank you for your order! Your custom passport case is being prepared and will be on its way soon. You\'ll receive a confirmation email with order details and tracking information. We\'re excited to send you your personalized passport holder.',
  },
  '/Dashboard': {
    title: 'Dashboard | The Happy Case',
    description: 'Admin dashboard for The Happy Case.',
  },
  '/My-orders': {
    title: 'My Orders | The Happy Case',
    description: 'View your order history and track your custom passport cases.',
  },
  '/Login': {
    title: 'Login | The Happy Case',
    description: 'Sign in to your account.',
  },
  '/authentication/code': {
    title: 'Verify Code | The Happy Case',
    description: 'Enter your verification code.',
  },
};

function getMetaForPath(pathname) {
  const basePath = pathname.split('/').slice(0, 2).join('/') || '/';
  return PAGE_META[pathname] || PAGE_META[basePath] || PAGE_META['/'];
}

export default function SEO() {
  const pathname = usePathname();
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
