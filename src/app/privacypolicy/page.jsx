import { buildMetadata } from '@/lib/seo';
import PrivacyPolicy from '@/component/PrivacyPolicy';

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: 'How The Happy Case collects, uses and protects your personal information when you shop for personalised passport cases and charms.',
  path: '/privacypolicy',
});

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}
