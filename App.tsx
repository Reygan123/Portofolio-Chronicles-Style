import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './views/Home';
import Portfolio from './views/Portfolio';
import About from './views/About';
import Contact from './views/Contact';
import TorchEffect from './components/ui/TorchEffect';
import ParticleDust from './components/ui/ParticleDust';
import { ViewState } from './types';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  return (
    <div className="min-h-screen bg-void text-neutral-200 font-sans selection:bg-gold/30 selection:text-white relative cursor-default">
      
      {/* Immersive Effects */}
      <TorchEffect />
      <ParticleDust />

      {/* Global Background Textures */}
      <div className="fixed inset-0 bg-noise pointer-events-none z-0 mix-blend-overlay opacity-30"></div>
      <div className="fixed inset-0 bg-vignette pointer-events-none z-0"></div>
      
      {/* Ambient Lighting Accents */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent z-50"></div>
      
      {/* Navigation */}
      <Navbar currentView={currentView} onChangeView={setCurrentView} />

      {/* Main Content Area */}
      <main className="relative z-10 transition-opacity duration-500 ease-in-out">
        {currentView === ViewState.HOME && <Home onChangeView={setCurrentView} />}
        {currentView === ViewState.PORTFOLIO && <Portfolio />}
        {currentView === ViewState.ABOUT && <About />}
        {currentView === ViewState.CONTACT && <Contact />}
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center border-t border-white/5 bg-charcoal/50 backdrop-blur-sm mt-auto">
        <p className="font-cinzel text-xs text-neutral-600 tracking-widest">
          © {new Date().getFullYear()} Chronicles of Dev. Crafted with Mana & Code.
        </p>
      </footer>
    </div>
  );
}

export default App;