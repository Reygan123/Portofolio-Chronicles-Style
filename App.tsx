import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './views/Home';
import Portfolio from './views/Portfolio';
import About from './views/About';
import Contact from './views/Contact';
import NotFound from './views/NotFound';
import TorchEffect from './components/ui/TorchEffect';
import ParticleDust from './components/ui/ParticleDust';
import CustomCursor from './components/ui/CustomCursor';
import AudioController from './components/ui/AudioController';
import OpeningScroll from './components/ui/OpeningScroll';
import WorldMapFooter from './components/ui/WorldMapFooter';
// import PlayerHUD from './components/ui/PlayerHUD';
import KonamiListener from './components/ui/KonamiListener';
import { ViewState } from './types';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [showIntro, setShowIntro] = useState(true);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  return (
    <div className="min-h-screen bg-void text-neutral-200 font-sans selection:bg-gold/30 selection:text-white relative cursor-none">
      
      {/* Immersive Effects */}
      <CustomCursor />
      <TorchEffect />
      <ParticleDust />
      <AudioController />
      {/* <PlayerHUD /> */}
      <KonamiListener />

      {/* Intro Modal */}
      {showIntro && <OpeningScroll onClose={() => setShowIntro(false)} />}

      {/* Global Background Textures */}
      <div className="fixed inset-0 bg-noise pointer-events-none z-0 mix-blend-overlay opacity-30"></div>
      <div className="fixed inset-0 bg-vignette pointer-events-none z-0"></div>
      
      {/* Ambient Lighting Accents */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent z-50"></div>
      
      {/* Navigation */}
      <Navbar currentView={currentView} onChangeView={setCurrentView} />

      {/* Main Content Area */}
      <main className="relative z-10 transition-opacity duration-500 ease-in-out pb-0">
        {currentView === ViewState.HOME && <Home onChangeView={setCurrentView} />}
        {currentView === ViewState.PORTFOLIO && <Portfolio />}
        {currentView === ViewState.ABOUT && <About />}
        {currentView === ViewState.CONTACT && <Contact />}
        {currentView === ViewState.FORBIDDEN && <NotFound onReturn={() => setCurrentView(ViewState.HOME)} />}
      </main>

      {/* Footer Navigation Map */}
      <WorldMapFooter currentView={currentView} onChangeView={setCurrentView} />
    </div>
  );
}

export default App;