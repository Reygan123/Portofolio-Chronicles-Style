import React from 'react';
import { ViewState } from '../types';
import { NAVIGATION_ITEMS } from '../constants';

interface NavbarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onChangeView }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20 flex items-center justify-center pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-void via-void/90 to-transparent pointer-events-none" />
      
      {/* Border Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <ul className="relative flex items-center gap-8 md:gap-16 pointer-events-auto">
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
    </nav>
  );
};

export default Navbar;