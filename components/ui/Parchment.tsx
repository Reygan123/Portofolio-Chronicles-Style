import React from 'react';

interface ParchmentProps {
  children: React.ReactNode;
  className?: string;
}

const Parchment: React.FC<ParchmentProps> = ({ children, className = "" }) => {
  return (
    <div className={`relative group ${className}`}>
      {/* Paper Body */}
      <div className="relative z-10 bg-[#d4c5a3] text-[#2c241b] p-6 md:p-8 shadow-xl transform transition-transform duration-300 hover:-translate-y-1">
        
        {/* Paper Texture Overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" 
             style={{ 
                 backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`
             }} 
        />
        
        {/* Ragged Top Edge (Visual trick with CSS mask or borders) */}
        <div className="absolute -top-1 left-0 right-0 h-2 bg-[#d4c5a3] opacity-80" style={{ clipPath: 'polygon(0% 100%, 5% 0%, 10% 100%, 15% 0%, 20% 100%, 25% 0%, 30% 100%, 35% 0%, 40% 100%, 45% 0%, 50% 100%, 55% 0%, 60% 100%, 65% 0%, 70% 100%, 75% 0%, 80% 100%, 85% 0%, 90% 100%, 95% 0%, 100% 100%)' }}></div>
        
        {/* Ragged Bottom Edge */}
        <div className="absolute -bottom-1 left-0 right-0 h-2 bg-[#d4c5a3] opacity-80" style={{ clipPath: 'polygon(0% 0%, 5% 100%, 10% 0%, 15% 100%, 20% 0%, 25% 100%, 30% 0%, 35% 100%, 40% 0%, 45% 100%, 50% 0%, 55% 100%, 60% 0%, 65% 100%, 70% 0%, 75% 100%, 80% 0%, 85% 100%, 90% 0%, 95% 100%, 100% 0%)' }}></div>

        {/* Content */}
        <div className="relative z-20 font-serif">
          {children}
        </div>
        
        {/* Wax Seal Decoration (Bottom Right) */}
        <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-red-900 border-4 border-red-800 shadow-md flex items-center justify-center opacity-80">
            <div className="w-8 h-8 rounded-full border border-red-950/30 bg-red-800/50"></div>
        </div>
      </div>
    </div>
  );
};

export default Parchment;