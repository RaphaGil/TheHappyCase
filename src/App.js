import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './component/NavBar';
import Hero from './component/Hero';
import TrustFeatures from './component/TrustFeatures';
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
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Router basename="/TheHappyCase">
        <div className="App">
          <header className="App-header bg-blue-800">
            <NavBar />
          </header>

          <main>
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <TrustFeatures />
                  <WhatWeDo />
                  <Items />
                  {/* <Review /> */}
                  <Reviews />
                  <Footer />
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
            </Routes>
          </main>
          <CartDrawer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
