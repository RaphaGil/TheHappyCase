import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './component/NavBar';
import Hero from './component/Hero';
import WhatWeDo from './component/WhatWeDo';
import Items from './component/Items';
import Review from './component/Reviews';
import Contact from './component/Contact';
import Footer from './component/Footer';

import SmartCase from './pages/SmartCase';
import FirstClassCase from './pages/FirstClassCase';
import PremiumCase from './pages/PremiumCase';
import CreateYours from './pages/CreateYours';
import Pins from './pages/Pins';
import DesignIdeas from './pages/DesignIdeas';
import PassportCover from './pages/PassportCover';

function App() {
  return (
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
                <WhatWeDo />
                <Items />
                <Review />
                <Contact />
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
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
