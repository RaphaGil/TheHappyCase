import MyOrders from '@/component/MyOrders';

export const metadata = {
  title: 'My Orders | The Happy Case',
  description: 'View your order history and track your custom passport cases.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function MyOrdersPage() {
  return <MyOrders />;
}
