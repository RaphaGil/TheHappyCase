import { buildMetadata } from '@/lib/seo';
import BronzeCharms from '@/component/BronzeCharms';

export const metadata = buildMetadata({
  title: "Bronze Passport Case Charms",
  description: 'Classic bronze travel charms for your passport case. Add them to a personalised case or buy separately.',
  path: '/charms/bronze',
});

export default function BronzeCharmsPage() {
  return <BronzeCharms />;
}
