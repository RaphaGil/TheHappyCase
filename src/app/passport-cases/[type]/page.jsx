import PassportCases from '../PassportCases';
import Products from '@/data/products.json';
import { buildMetadata, JsonLd, breadcrumbJsonLd, absoluteUrl, SITE_NAME } from '@/lib/seo';

// This route is fully statically exported for each case type
export const dynamicParams = false;

const PAGES = {
  economy: {
    caseType: 'economy',
    title: 'Economy Personalised Passport Case with Charms',
    shortName: 'Economy Class',
    description:
      'Personalised passport case with charms and your name. RFID protected, holds 2 passports, magnetic closure, 8 colours. From £8, UK delivery.',
  },
  'first-class': {
    caseType: 'firstclass',
    title: 'First Class Leather Passport Case with Charms',
    shortName: 'First Class',
    description:
      'Genuine leather passport wallet personalised with charms and your name. RFID protected, holds 2 passports, coin pouch, 9 colours. From £20.',
  },
  'business-class': {
    caseType: 'business',
    title: 'Business Class Leather Passport Cover with Charms',
    shortName: 'Business Class',
    description:
      'Slim genuine leather passport cover personalised with charms and your name. 4 card slots, 6 colours. A thoughtful travel gift from £15.',
  },
};

export async function generateStaticParams() {
  return Object.keys(PAGES).map((type) => ({ type }));
}

export async function generateMetadata({ params }) {
  const { type } = await params;
  const page = PAGES[type];
  if (!page) return buildMetadata({ title: 'Passport Cases', description: 'Personalised passport cases with charms.', path: '/passport-cases/economy' });
  const product = Products.cases.find((c) => c.type === page.caseType);
  return buildMetadata({
    title: page.title,
    description: page.description,
    path: `/passport-cases/${type}`,
    image: product?.colors?.[0]?.image,
  });
}

/** Product structured data so Google can show price, stock and delivery in results. */
function productJsonLd(type, page, product) {
  const url = absoluteUrl(`/passport-cases/${type}`);
  const specs = product.specifications || {};
  const features = [
    specs.passportCapacity,
    specs.rfid?.toLowerCase() === 'yes' ? 'RFID protection' : null,
    specs.material,
    specs.closure && !/^no /i.test(specs.closure) ? specs.closure : null,
    specs.cardSlots ? `${specs.cardSlots} card slots` : null,
  ].filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${page.shortName} Personalised Passport Case`,
    description: `${page.description} ${features.join(', ')}.`,
    sku: `HC-${page.caseType.toUpperCase()}`,
    brand: { '@type': 'Brand', name: SITE_NAME },
    category: 'Apparel & Accessories > Handbags, Wallets & Cases > Passport Wallets',
    material: specs.material,
    image: (product.colors || []).map((c) => absoluteUrl(c.image)),
    url,
    offers: {
      '@type': 'Offer',
      url,
      price: Number(product.basePrice).toFixed(2),
      priceCurrency: 'GBP',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@type': 'Organization', name: SITE_NAME },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: { '@type': 'MonetaryAmount', value: '3.00', currency: 'GBP' },
        shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'GB' },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: { '@type': 'QuantitativeValue', minValue: 2, maxValue: 3, unitCode: 'DAY' },
          transitTime: { '@type': 'QuantitativeValue', minValue: 3, maxValue: 5, unitCode: 'DAY' },
        },
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'GB',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 14,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/ReturnFeesCustomerResponsibility',
      },
    },
  };
}

export default async function PassportCasesPage({ params }) {
  const { type } = await params;
  const page = PAGES[type];
  const product = page && Products.cases.find((c) => c.type === page.caseType);

  return (
    <>
      {page && product && (
        <>
          <JsonLd data={productJsonLd(type, page, product)} />
          <JsonLd
            data={breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Passport cases', path: '/passport-cases/economy' },
              { name: page.shortName, path: `/passport-cases/${type}` },
            ])}
          />
        </>
      )}
      <PassportCases />
    </>
  );
}
