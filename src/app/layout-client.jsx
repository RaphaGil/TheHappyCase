'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { HelmetProvider } from 'react-helmet-async';
import { CartProvider } from '@/context/CartContext';
import { CurrencyProvider } from '@/context/CurrencyContext';
import NavBar from '@/component/NavBar';
import PromotionalBanner from '@/component/NavBar/components/PromotionalBanner';
import Footer from '@/component/Footer';
import CartDrawer from '@/component/CartDrawer';
import WhatsAppButton from '@/component/WhatsAppButton';
import EnvDebug from '@/component/EnvDebug';

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
  const isCreateYoursPage =
    pathname === '/custom-passport' || pathname === '/custompassport';
  const hideNavBar = pathname === '/checkout';
  const hideNavBarOnMobile =
    pathname === '/custom-passport' || pathname === '/custompassport' || pathname === '/AddText';
  const hideFooter =
    pathname === '/checkout' || pathname === '/AddText' || isCreateYoursPage;
  const hideFooterOnMobile = pathname === '/AddText';

  return (
    <HelmetProvider>
      <CurrencyProvider>
        <CartProvider>
          <div
            className={`App bg-white min-h-screen ${
 isCreateYoursPage ? 'md:h-dvh md:flex md:flex-col md:overflow-hidden' : ''
 }`}
          >
            {process.env.NODE_ENV !== 'production' && <EnvDebug />}
          {!hideNavBar && (
            <div className={`flex-shrink-0 ${hideNavBarOnMobile ? 'hidden md:block' : ''}`}>
              <PromotionalBanner />
            </div>
          )}
          {!hideNavBar && (
            <header
              className={`App-header flex-shrink-0 z-40 border-b border-[#30279f]/10 shadow-[0_1px_12px_rgba(48,39,159,0.06)] ${isCreateYoursPage ? '' : 'sticky top-0'} ${hideNavBarOnMobile ? 'hidden md:block' : ''}`}
              style={{ background: 'white' }}
            >
              <NavBar isHomePage={isHomePage} />
            </header>
          )}
          <main className={isCreateYoursPage ? 'md:flex-1 md:min-h-0 md:overflow-hidden' : undefined}>
            {children}
          </main>
          {!hideFooter && (
            <div className={hideFooterOnMobile ? 'hidden md:block' : ''}>
              <Footer />
            </div>
          )}
          {/* Floating WhatsApp chat (hidden where it would cover checkout/designer controls) */}
          {!isCreateYoursPage && !hideNavBar && <WhatsAppButton />}
          <CartDrawer />
        </div>
      </CartProvider>
    </CurrencyProvider>
    </HelmetProvider>
  );
}
