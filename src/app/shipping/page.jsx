import { buildMetadata } from '@/lib/seo';
import ShippingPolicy from '@/component/ShippingPolicy';

export const metadata = buildMetadata({
  title: "Shipping & Delivery",
  description: 'UK delivery for personalised passport cases: £3 flat rate, dispatched in 2–3 business days. Ordering from abroad? Shop on our Etsy store.',
  path: '/shipping',
});

export default function ShippingPage() {
  return <ShippingPolicy />;
}
