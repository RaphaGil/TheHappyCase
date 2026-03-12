import Charms from '../CharmsPage';

export async function generateStaticParams() {
  return [
    { type: 'colorful' },
    { type: 'bronze' },
    { type: 'flags' },
  ];
}

export async function generateMetadata({ params }) {
  const { type } = params;
  const typeMap = {
    'colorful': {
      title: 'Colorful Passport Charms',
      description: 'Colorful passport charms and pins for your custom passport case.',
    },
    'bronze': {
      title: 'Bronze Passport Charms',
      description: 'Bronze passport charms and pins with classic metallic finishes.',
    },
    'flags': {
      title: 'Flag Charms for Passport Cases',
      description: 'Add flag charms to your passport case to show your heritage or commemorate your travels.',
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
