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
import { initializeQuantities } from '@/utils/inventory';

export default function LayoutClient({ children }) {
  useEffect(() => {
    initializeQuantities();
  }, []);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const hideNavBar = pathname === '/checkout';
  const hideNavBarOnMobile = pathname === '/custompassport' || pathname === '/AddText';
  const hideFooter = pathname === '/checkout' || pathname === '/AddText';
  const hideFooterOnMobile = pathname === '/custompasspor';

  return (
    <HelmetProvider>
      <SEO />
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
    </HelmetProvider>
  );
}
