'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { HelmetProvider } from 'react-helmet-async';
import { CartProvider } from '@/context/CartContext';
import { CurrencyProvider } from '@/context/CurrencyContext';
import NavBar from '@/component/NavBar';
import Footer from '@/component/Footer';
import CartDrawer from '@/component/CartDrawer';
import EnvDebug from '@/component/EnvDebug';
import SEO from '@/component/SEO';

export default function LayoutClient({ children }) {
  // Defer inventory load so it's not in the critical path (saves loading products.json + API call until after first paint)
  useEffect(() => {
    const id = setTimeout(() => {
      import('@/utils/inventory').then(({ initializeQuantities }) => initializeQuantities());
    }, 0);
    return () => clearTimeout(id);
  }, []);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const hideNavBar = pathname === '/checkout';
  const hideNavBarOnMobile = pathname === '/custom-passport' || pathname === '/custompassport' || pathname === '/AddText';
  const hideFooter = pathname === '/checkout' || pathname === '/AddText';
  const hideFooterOnMobile = pathname === '/custom-passport' || pathname === '/AddText';

  return (
    <HelmetProvider>
      <SEO />
      <CurrencyProvider>
        <CartProvider>
          <div className="App bg-white min-h-screen">
            {process.env.NODE_ENV !== 'production' && <EnvDebug />}
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
    </HelmetProvider>
  );
}
