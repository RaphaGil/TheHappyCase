import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './component/NavBar'; // Ensure NavBar is imported
import Hero from './component/Hero'; // Ensure Hero is imported
import Description from './component/Description';
import Items from './component/Items';
import Contact from './component/Contact';


import SmartCase from './pages/SmartCase';
import FirstClassCase from './pages/FirstClassCase';
import PremiumCase from './pages/PremiumCase';
import CreateYours from './pages/CreateYours';
import Pins from './pages/Pins';
import DesignIdeas from './pages/DesignIdeas';
import PassportCover from './pages/PassportCover';


function App() {
  return (
    <Router>
      <div className="App">
        {/* NavBar is included globally */}
        <header className="App-header bg-blue-800">
          <NavBar />
        </header>
        
        <main>
          {/* The Routes component will render specific pages */}
          <Routes>
            {/* Homepage route, where Hero, Description, and Items are displayed */}
            <Route path="/" element={
              <>
                <Hero />
                <Description />
                <Items />
                <Contact />
              </>
            } />
            
            {/* Specific page routes */}
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
