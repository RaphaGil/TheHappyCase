import Charms from '@/page-components/Charms';

export async function generateMetadata({ params }) {
  const { type } = await params;
  const typeMap = {
    Colorful: {
      title: 'Colorful Passport Charms',
      description: 'Colorful passport charms and pins for your custom passport case.',
    },
    Bronze: {
      title: 'Bronze Passport Charms',
      description: 'Bronze passport charms and pins. Classic metallic finishes.',
    },
  };
  
  const meta = typeMap[type] || {
    title: 'Passport Charms & Pins',
    description: 'Browse 40+ passport charms and pins. Bronze and colorful options.',
  };
  
  return meta;
}

export default function CharmsPage({ params }) {
  return <Charms />;
}
