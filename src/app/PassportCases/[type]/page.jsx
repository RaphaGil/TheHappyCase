import PassportCases from '../PassportCases';

export async function generateStaticParams() {
  // Generate static pages for all passport case types
  return [
    { type: 'Economy' },
    { type: 'FirstClass' },
    { type: 'BusinessClass' },
  ];
}

export async function generateMetadata({ params }) {
  const { type } = await params;
  const typeMap = {
    Economy: {
      title: 'Economy Passport Case',
      description: 'Economy passport case - slim and lightweight. Customise with colours and charms.',
    },
    FirstClass: {
      title: 'First Class Passport Case',
      description: 'First Class passport case - premium style with more space for stamps and charms.',
    },
    BusinessClass: {
      title: 'Business Class Passport Case',
      description: 'Business Class passport case - luxury design with premium materials.',
    },
  };
  
  const meta = typeMap[type] || {
    title: 'Passport Cases',
    description: 'Shop passport cases in 3 styles: Economy, First Class, and Business Class.',
  };
  
  return meta;
}

export default function PassportCasesPage({ params }) {
  return <PassportCases />;
}
