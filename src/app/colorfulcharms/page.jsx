import { buildMetadata } from '@/lib/seo';
import ColorfulCharms from '@/component/ColorfulCharms';

export const metadata = buildMetadata({
  title: "Colourful Passport Case Charms",
  description: 'Fun, colourful enamel charms for your passport case. Add them to a personalised case or buy separately.',
  path: '/charms/colorful',
});

export default function ColorfulCharmsPage() {
  return <ColorfulCharms />;
}
