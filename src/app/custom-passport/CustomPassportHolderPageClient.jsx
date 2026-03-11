'use client';

import dynamic from 'next/dynamic';
import CreateYoursLoading from '@/component/CreateYours/CreateYoursLoading';

const CreateYours = dynamic(
  () => import('../CreateYours/CreateYoursPageNew'),
  {
    loading: () => <CreateYoursLoading />,
    ssr: false,
  }
);

export default function CustomPassportHolderPageClient() {
  return <CreateYours />;
}
