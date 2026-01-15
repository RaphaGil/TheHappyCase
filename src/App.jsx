import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import NavBar from './component/NavBar';
import Hero from './component/Hero';
import WhatWeDo from './component/WhatWeDo';

// import Review from './component/Reviews';

import Footer from './component/Footer';
import CartDrawer from './component/CartDrawer';
import { CartProvider } from './context/CartContext';
import { CurrencyProvider } from './context/CurrencyContext';

// Lazy load page components for code splitting
const CreateYours = lazy(() => import('./pages/CreateYours'));
const DesignIdeas = lazy(() => import('./pages/DesignIdeas'));
const CartPage = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./component/Checkout'));
const PaymentSuccess = lazy(() => import('./pages/PaymentSuccess'));
const Flags = lazy(() => import('./component/Flags'));
const ColorfulCharms = lazy(() => import('./component/ColorfulCharms'));
const BronzeCharms = lazy(() => import('./component/BronzeCharms'));
const PassportCases = lazy(() => import('./pages/PassportCases'));
const Charms = lazy(() => import('./pages/Charms'));
const RefundPolicy = lazy(() => import('./pages/RefundPolicy'));
const ShippingPolicy = lazy(() => import('./pages/ShippingPolicy'));
const About = lazy(() => import('./pages/About'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Login = lazy(() => import('./pages/Login'));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  </div>
);

function AppContent() {
  const location = useLocation();
  // Normalize pathname to handle trailing slashes, base paths, and GitHub Pages redirects
  // Handle GitHub Pages SPA redirect format: /?/path -> /path
  let pathname = location.pathname || '/';
  
  // Handle GitHub Pages redirect query string (from 404.html)
  // The redirect script in index.html should have already handled this,
  // but we normalize here as a fallback
  if (location.search && location.search.startsWith('?/')) {
    const redirectPath = location.search.slice(2).split('&')[0].replace(/~and~/g, '&');
    pathname = redirectPath || '/';
  }
  
  // Remove trailing slashes and ensure we have a valid pathname
  pathname = pathname.replace(/\/+$/, '') || '/';
  
  // Ensure pathname starts with / for consistent matching
  if (!pathname.startsWith('/')) {
    pathname = '/' + pathname;
  }
  
  const isHomePage = pathname === '/';
  // Only hide navbar on checkout page
  const hideNavBar = pathname === '/checkout';
  // Hide navbar on mobile for CreateYours and AddText pages
  const hideNavBarOnMobile = pathname === '/CreateYours' || pathname === '/AddText';
  // Hide footer on checkout and AddText pages
  const hideFooter = pathname === '/checkout' || pathname === '/AddText';
  // Hide footer on mobile for CreateYours page
  const hideFooterOnMobile = pathname === '/CreateYours';
  
  // Debug logging (useful for troubleshooting in deployment)
  if (import.meta.env.DEV) {
    console.log('[App] Current pathname:', pathname, '| hideNavBar:', hideNavBar, '| hideFooter:', hideFooter);
  }

  return (
    <div className="App bg-white min-h-screen">
      {!hideNavBar && (
        <header className={`App-header ${hideNavBarOnMobile ? 'hidden md:block' : ''}`} style={{background: 'white'}}>
          <NavBar isHomePage={isHomePage} />
        </header>
      )}

      <main>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={
                  <>
                    <Hero />  
                
                    <WhatWeDo />
            
                  </>
                } />
            <Route path="/CreateYours" element={<CreateYours />} />
            <Route path="/DesignIdeas" element={<DesignIdeas />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/Flags" element={<Flags />} />
            <Route path="/ColorfulCharms" element={<ColorfulCharms />} />
            <Route path="/BronzeCharms" element={<BronzeCharms />} />
            <Route path="/PassportCases/:type" element={<PassportCases />} />
            <Route path="/PassportCases" element={<Navigate to="/PassportCases/Economy" replace />} />
            <Route path="/Charms/:type" element={<Charms />} />
            <Route path="/Charms" element={<Navigate to="/Charms/Colorful" replace />} />
        
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/returns" element={<RefundPolicy />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/shipping" element={<ShippingPolicy />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/authentication/code" element={<Login />} />
            {/* Catch-all route - redirect to home for unknown routes */}
            <Route path="*" element={
              <>
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
                    <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
                    <a href="/" className="text-blue-600 hover:underline">Return to Home</a>
                  </div>
                </div>
              </>
            } />
          </Routes>
        </Suspense>
      </main>
      {!hideFooter && (
        <div className={hideFooterOnMobile ? 'hidden md:block' : ''}>
          <Footer />
        </div>
      )}
      <CartDrawer />
    </div>
  );
}

function App() {
  // Get base URL from Vite config for React Router basename
  const baseUrl = import.meta.env.BASE_URL || '/';
  // React Router basename: empty string for root, or path without trailing slash for subdirectory
  const basename = baseUrl === '/' ? '' : baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  
  return (
    <CurrencyProvider>
      <CartProvider>
        <Router basename={basename}>
          <AppContent />
        </Router>
      </CartProvider>
    </CurrencyProvider>
  );
}

export default App;
