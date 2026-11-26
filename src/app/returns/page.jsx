import { buildMetadata } from '@/lib/seo';
import RefundPolicy from '@/component/RefundPolicy';

export const metadata = buildMetadata({
  title: "Returns & Refund Policy",
  description: 'Returns and refunds at The Happy Case: 14-day right to cancel on non-personalised items, and what happens if an item arrives faulty.',
  path: '/returns',
});

export default function ReturnsPage() {
  return <RefundPolicy />;
}
