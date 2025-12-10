import React from 'react';

interface GoldenFrameProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'heavy' | 'light';
}

const GoldenFrame: React.FC<GoldenFrameProps> = ({ children, className = "", variant = 'heavy' }) => {
  return (
    <div className={`relative group ${className}`}>
      {/* Background with border */}
      <div className={`absolute inset-0 border ${variant === 'heavy' ? 'border-ash' : 'border-ash/50'} bg-charcoal/80 backdrop-blur-sm shadow-2xl pointer-events-none transition-colors duration-500 group-hover:border-gold/30`} />
      
      {/* Content */}
      <div className="relative z-10 p-6 h-full">
        {children}
      </div>

      {/* Ornamental Corners */}
      {/* Top Left */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gold transition-all duration-300 group-hover:w-8 group-hover:h-8 group-hover:shadow-[0_0_10px_#C8A15B]" />
      <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-bronze" />

      {/* Top Right */}
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-gold transition-all duration-300 group-hover:w-8 group-hover:h-8 group-hover:shadow-[0_0_10px_#C8A15B]" />
      <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-bronze" />

      {/* Bottom Left */}
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-gold transition-all duration-300 group-hover:w-8 group-hover:h-8 group-hover:shadow-[0_0_10px_#C8A15B]" />
      <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-bronze" />

      {/* Bottom Right */}
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gold transition-all duration-300 group-hover:w-8 group-hover:h-8 group-hover:shadow-[0_0_10px_#C8A15B]" />
      <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-bronze" />
      
      {/* Mid-border accents (only for heavy variant) */}
      {variant === 'heavy' && (
        <>
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-gold/50" />
           <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-gold/50" />
        </>
      )}
    </div>
  );
};

export default GoldenFrame;