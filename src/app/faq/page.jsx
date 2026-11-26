import { buildMetadata } from '@/lib/seo';
import FAQ from '@/component/FAQ';

export const metadata = buildMetadata({
  title: "FAQ",
  description: 'Answers about personalised passport cases: charms, names, sizes, RFID protection, delivery times, returns and payment.',
  path: '/faq',
});

export default function FAQPage() {
  return <FAQ />;
}
