import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import NavBar from './component/NavBar';
import Hero from './component/Hero';
import WhatWeDo from './component/WhatWeDo';
import Items from './component/Items';
// import Review from './component/Reviews';
import Reviews from './component/Contact';
import Footer from './component/Footer';
import CartDrawer from './component/CartDrawer';

import SmartCase from './pages/SmartCase';
import FirstClassCase from './pages/FirstClassCase';
import PremiumCase from './pages/PremiumCase';
import CreateYours from './pages/CreateYours';
import Pins from './pages/Pins';
import DesignIdeas from './pages/DesignIdeas';
import PassportCover from './pages/PassportCover';
import CartPage from './pages/Cart';
import Checkout from './component/Checkout';
import PaymentSuccess from './pages/PaymentSuccess';
import Flags from './pages/Flags';
import ColorfulCharms from './pages/ColorfulCharms';
import BronzeCharms from './pages/BronzeCharms';
import PassportCases from './pages/PassportCases';
import Charms from './pages/Charms';
import RefundPolicy from './pages/RefundPolicy';
import ShippingPolicy from './pages/ShippingPolicy';
import About from './pages/About';
import { CartProvider } from './context/CartContext';
import { CurrencyProvider } from './context/CurrencyContext';

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const hideNavBar = location.pathname === '/checkout';
  const hideFooter = location.pathname === '/checkout' || location.pathname === '/CreateYours';

  return (
    <div className="App bg-yellow-50 min-h-screen">
      {!hideNavBar && (
        <header className="App-header" style={{background: 'white'}}>
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
                
                  {/* <Review /> */}
                  <Reviews />
                </>
              } />
          <Route path="/SmartCase" element={<SmartCase />} />
          <Route path="/FirstClassCase" element={<FirstClassCase />} />
          <Route path="/PremiumCase" element={<PremiumCase />} />
          <Route path="/CreateYours" element={<CreateYours />} />
          <Route path="/Pins" element={<Pins />} />
          <Route path="/DesignIdeas" element={<DesignIdeas />} />
          <Route path="/PassportCover" element={<PassportCover />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/Flags" element={<Flags />} />
          <Route path="/ColorfulCharms" element={<ColorfulCharms />} />
          <Route path="/BronzeCharms" element={<BronzeCharms />} />
          <Route path="/PassportCases" element={<PassportCases />} />
          <Route path="/Charms" element={<Charms />} />
          <Route path="/returns" element={<RefundPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/shipping" element={<ShippingPolicy />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      {!hideFooter && <Footer />}
      <CartDrawer />
    </div>
  );
}

function App() {
  return (
    <CurrencyProvider>
      <CartProvider>
        <Router basename="/TheHappyCase">
          <AppContent />
        </Router>
      </CartProvider>
    </CurrencyProvider>
  );
}

export default App;
