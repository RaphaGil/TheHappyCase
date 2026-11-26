import Charms from '../CharmsPage';
import Products from '@/data/products.json';
import { buildMetadata, JsonLd, breadcrumbJsonLd, absoluteUrl } from '@/lib/seo';

const PAGES = {
  colorful: {
    title: 'Colourful Passport Case Charms',
    name: 'Colourful charms',
    description:
      'Fun, colourful enamel charms for your passport case: planes, globes, suitcases, food, Disney and more. Add them to a personalised case or buy separately.',
  },
  bronze: {
    title: 'Bronze Passport Case Charms',
    name: 'Bronze charms',
    description:
      'Classic bronze travel charms for your passport case: landmarks, planes, compasses and more. Add them to a personalised case or buy separately.',
  },
  flags: {
    title: 'Country Flag Charms for Passport Cases',
    name: 'Flag charms',
    description:
      'Country flag charms to show where you are from or everywhere you have been. Add them to a personalised passport case or buy separately.',
  },
};

export async function generateStaticParams() {
  return Object.keys(PAGES).map((type) => ({ type }));
}

export async function generateMetadata({ params }) {
  const { type } = await params;
  const page = PAGES[type] || PAGES.colorful;
  const first = Products.pins?.[type]?.[0];
  return buildMetadata({
    title: page.title,
    description: page.description,
    path: `/charms/${PAGES[type] ? type : 'colorful'}`,
    image: first?.src,
  });
}

export default async function CharmsPage({ params }) {
  const { type } = await params;
  const page = PAGES[type];
  const pins = Products.pins?.[type] || [];

  return (
    <>
      {page && (
        <>
          <JsonLd
            data={{
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: page.title,
              description: page.description,
              url: absoluteUrl(`/charms/${type}`),
              numberOfItems: pins.length,
              image: pins.slice(0, 12).map((p) => absoluteUrl(p.src)),
            }}
          />
          <JsonLd
            data={breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Charms', path: '/charms/colorful' },
              { name: page.name, path: `/charms/${type}` },
            ])}
          />
        </>
      )}
      <Charms />
    </>
  );
}
