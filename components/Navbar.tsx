import React, { useState, useEffect } from 'react';
import { ViewState } from '../types';
import { NAVIGATION_ITEMS } from '../constants';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onChangeView }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20 flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-void via-void/90 to-transparent pointer-events-none" />
      
      {/* Border Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center gap-8 md:gap-16 relative pointer-events-auto">
        {NAVIGATION_ITEMS.map((item) => {
          const isActive = currentView === item.id;
          return (
            <li key={item.id}>
              <button
                onClick={() => onChangeView(item.id as ViewState)}
                className={`group relative py-2 px-1 transition-colors duration-300 ${
                  isActive ? 'text-gold' : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                <span className={`font-cinzel text-sm md:text-base tracking-widest uppercase ${isActive ? 'font-bold' : ''}`}>
                  {item.label}
                </span>
                
                {/* Active Indicator (Jewel) */}
                <div className={`absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rotate-45 bg-gold transition-all duration-300 ${isActive ? 'opacity-100 shadow-[0_0_8px_#C8A15B]' : 'opacity-0'}`} />
                
                {/* Hover Line */}
                <div className={`absolute bottom-0 left-0 w-full h-[1px] bg-gold/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center ${isActive ? 'scale-x-100' : ''}`} />
              </button>
            </li>
          );
        })}
      </ul>

      {/* Mobile Header */}
      <div className="md:hidden absolute inset-0 flex items-center justify-between px-6 pointer-events-auto w-full">
         <span className="font-cinzel text-gold text-lg tracking-widest font-bold">Chronicles</span>
         <button 
            onClick={() => setIsMobileOpen(true)} 
            className="text-gold p-2 hover:text-gold-bright transition-colors"
            aria-label="Open Menu"
         >
            <Menu size={28} />
         </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-void/95 backdrop-blur-xl z-50 flex flex-col items-center justify-center transition-all duration-500 md:hidden ${isMobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
      >
        <button 
          onClick={() => setIsMobileOpen(false)} 
          className="absolute top-6 right-6 text-gold p-2 hover:text-gold-bright transition-colors"
          aria-label="Close Menu"
        >
          <X size={32} />
        </button>

        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mb-12 opacity-50"></div>
        
        <ul className="flex flex-col items-center gap-8 text-center">
          {NAVIGATION_ITEMS.map((item, index) => {
             const isActive = currentView === item.id;
             return (
              <li 
                key={item.id} 
                className={`transition-all duration-700 ${isMobileOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <button
                  onClick={() => { onChangeView(item.id as ViewState); setIsMobileOpen(false); }}
                  className={`font-cinzel text-2xl tracking-widest uppercase transition-all duration-300 ${
                    isActive ? 'text-gold scale-110 drop-shadow-[0_0_8px_rgba(200,161,91,0.5)]' : 'text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  {item.label}
                </button>
              </li>
             )
          })}
        </ul>

        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mt-12 opacity-50"></div>
        
        {/* Decorative Compass/Element */}
        <div className={`mt-16 w-12 h-12 border border-gold/30 rotate-45 transition-all duration-1000 delay-500 ${isMobileOpen ? 'opacity-100 rotate-45 scale-100' : 'opacity-0 rotate-0 scale-50'}`} />
      </div>

    </nav>
  );
};

export default Navbar;