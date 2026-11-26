import { buildMetadata } from '@/lib/seo';
import About from '@/component/About';

export const metadata = buildMetadata({
  title: "About Us",
  description: 'Meet The Happy Case: personalised passport cases with charms, designed by you and made with love for every journey.',
  path: '/about',
});

export default function AboutPage() {
  return <About />;
}
