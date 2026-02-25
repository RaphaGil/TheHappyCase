'use client';

import { usePathname } from 'next/navigation';
import { CartProvider } from '@/context/CartContext';
import { CurrencyProvider } from '@/context/CurrencyContext';
import NavBar from '@/component/NavBar';
import Footer from '@/component/Footer';
import CartDrawer from '@/component/CartDrawer';
import EnvDebug from '@/component/EnvDebug';

export default function LayoutClient({ children }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const hideNavBar = pathname === '/Checkout';
  const hideNavBarOnMobile = pathname === '/custom-passport-holder' || pathname === '/AddText';
  const hideFooter = pathname === '/Checkout' || pathname === '/AddText';
  const hideFooterOnMobile = pathname === '/custom-passport-holder';

  return (
    <CurrencyProvider>
      <CartProvider>
        <div className="App bg-white min-h-screen">
          <EnvDebug />
          {!hideNavBar && (
            <header className={`App-header ${hideNavBarOnMobile ? 'hidden md:block' : ''}`} style={{ background: 'white' }}>
              <NavBar isHomePage={isHomePage} />
            </header>
          )}
          <main>{children}</main>
          {!hideFooter && (
            <div className={hideFooterOnMobile ? 'hidden md:block' : ''}>
              <Footer />
            </div>
          )}
          <CartDrawer />
        </div>
      </CartProvider>
    </CurrencyProvider>
  );
}
