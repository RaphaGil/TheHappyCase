import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import NavBar from './component/NavBar';
import Hero from './component/Hero';
import WhatWeDo from './component/WhatWeDo';
import Items from './component/Items';
// import Review from './component/Reviews';

import Footer from './component/Footer';
import CartDrawer from './component/CartDrawer';

import CreateYours from './pages/CreateYours';
import DesignIdeas from './pages/DesignIdeas';
import CartPage from './pages/Cart';
import Checkout from './component/Checkout';
import PaymentSuccess from './pages/PaymentSuccess';
import Flags from './component/Flags';
import ColorfulCharms from './component/ColorfulCharms';
import BronzeCharms from './component/BronzeCharms';
import PassportCases from './pages/PassportCases';
import Charms from './pages/Charms';
import RefundPolicy from './pages/RefundPolicy';
import ShippingPolicy from './pages/ShippingPolicy';
import About from './pages/About';
import AddText from './component/AddText';
import Dashboard from './pages/Dashboard';
import { CartProvider } from './context/CartContext';
import { CurrencyProvider } from './context/CurrencyContext';

function AppContent() {
  const location = useLocation();
  // Normalize pathname to handle trailing slashes and base paths
  // Remove trailing slashes and ensure we have a valid pathname
  let pathname = location.pathname || '/';
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
  console.log('[App] Current pathname:', pathname, '| hideNavBar:', hideNavBar, '| hideFooter:', hideFooter);

  return (
    <div className="App bg-white min-h-screen">
      {!hideNavBar && (
        <header className={`App-header ${hideNavBarOnMobile ? 'hidden md:block' : ''}`} style={{background: 'white'}}>
          <NavBar isHomePage={isHomePage} />
        </header>
      )}

      <main>
        <Routes>
          <Route path="/" element={
                <>
                  <Hero />  
                  <Items />
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
          <Route path="/PassportCases" element={<PassportCases />} />
          <Route path="/Charms" element={<Charms />} />
          <Route path="/AddText" element={<AddText />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/returns" element={<RefundPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/shipping" element={<ShippingPolicy />} />
          <Route path="/about" element={<About />} />
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
  return (
    <CurrencyProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </CurrencyProvider>
  );
}

export default App;
