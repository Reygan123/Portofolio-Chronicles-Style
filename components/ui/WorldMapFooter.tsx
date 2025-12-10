import React from 'react';
import { ViewState } from '../../types';
import { playSound } from '../../utils/audio';

interface WorldMapFooterProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

const WorldMapFooter: React.FC<WorldMapFooterProps> = ({ currentView, onChangeView }) => {
  
  const handleNav = (view: ViewState) => {
    playSound('click');
    onChangeView(view);
  };

  const navPoints = [
    { id: ViewState.HOME, x: 50, y: 50, label: 'Citadel' },
    { id: ViewState.PORTFOLIO, x: 20, y: 30, label: 'Quest Log' },
    { id: ViewState.ABOUT, x: 80, y: 30, label: 'Arsenal' },
    { id: ViewState.CONTACT, x: 50, y: 80, label: 'Guild Hall' },
  ];

  return (
    <footer className="relative z-10 py-12 border-t border-gold/20 bg-charcoal/80 backdrop-blur-md mt-auto overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h3 className="font-cinzel text-gold text-sm tracking-[0.2em] mb-8 uppercase">World Map Navigation</h3>
        
        <div className="relative h-64 w-full max-w-md mx-auto select-none">
          {/* Map Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
             <line x1="50%" y1="50%" x2="20%" y2="30%" stroke="#C8A15B" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 4" />
             <line x1="50%" y1="50%" x2="80%" y2="30%" stroke="#C8A15B" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 4" />
             <line x1="50%" y1="50%" x2="50%" y2="80%" stroke="#C8A15B" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 4" />
             
             {/* Connection circles */}
             <circle cx="50%" cy="50%" r="40" fill="none" stroke="#C8A15B" strokeOpacity="0.1" />
          </svg>

          {/* Nodes */}
          {navPoints.map((point) => {
            const isActive = currentView === point.id;
            return (
              <button
                key={point.id}
                onClick={() => handleNav(point.id)}
                onMouseEnter={() => playSound('hover')}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 focus:outline-none`}
                style={{ left: `${point.x}%`, top: `${point.y}%` }}
              >
                <div className={`
                  w-4 h-4 rounded-full border-2 transition-all duration-300 relative z-10
                  ${isActive ? 'bg-gold border-gold scale-125 shadow-[0_0_15px_#C8A15B]' : 'bg-charcoal border-neutral-600 group-hover:border-gold group-hover:scale-110'}
                `} />
                
                {/* Pulse ring for active */}
                {isActive && <div className="absolute inset-0 rounded-full border border-gold animate-ping opacity-50" />}

                {/* Label */}
                <span className={`
                  absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-cinzel text-xs tracking-wider transition-colors duration-300
                  ${isActive ? 'text-gold' : 'text-neutral-500 group-hover:text-gold/80'}
                `}>
                  {point.label}
                </span>
              </button>
            )
          })}
        </div>
        
        <div className="mt-8 text-[10px] text-neutral-600 font-mono">
          © {new Date().getFullYear()} Chronicles of Dev. Use Map to Traverse.
        </div>
      </div>
    </footer>
  );
};

export default WorldMapFooter;