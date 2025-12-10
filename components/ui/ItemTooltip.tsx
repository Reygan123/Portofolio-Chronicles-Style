import React, { useState } from 'react';
import { playSound } from '../../utils/audio';

interface ItemTooltipProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  description?: string;
  stats?: { label: string; value: string }[];
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
}

const ItemTooltip: React.FC<ItemTooltipProps> = ({ 
  children, 
  title, 
  subtitle, 
  description,
  stats,
  rarity = 'common' 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = () => {
    setIsVisible(true);
    playSound('hover');
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    // Offset slightly from cursor
    setPosition({ x: e.clientX + 15, y: e.clientY + 15 });
  };

  const rarityColors = {
    common: 'text-neutral-300 border-neutral-600',
    rare: 'text-blue-400 border-blue-500',
    epic: 'text-purple-400 border-purple-500',
    legendary: 'text-gold border-gold',
  };

  return (
    <div 
      className="relative inline-block hoverable"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsVisible(false)}
      onMouseMove={handleMouseMove}
    >
      {children}

      {/* Fixed positioning for tooltip to avoid overflow issues */}
      {isVisible && (
        <div 
          className="fixed z-[90] w-64 pointer-events-none"
          style={{ 
            left: Math.min(position.x, window.innerWidth - 270), // Prevent overflow right
            top: Math.min(position.y, window.innerHeight - 300), // Prevent overflow bottom
          }}
        >
          <div className="bg-charcoal/95 border-2 border-double border-gold/50 p-3 shadow-[0_0_20px_rgba(0,0,0,0.8)] backdrop-blur-md rounded-sm">
             {/* Header */}
             <div className={`font-cinzel font-bold text-lg mb-1 ${rarityColors[rarity].split(' ')[0]}`}>
               {title}
             </div>
             {subtitle && <div className="font-mono text-xs text-neutral-500 mb-2 italic">{subtitle}</div>}
             
             {/* Divider */}
             <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-2" />
             
             {/* Description */}
             {description && (
               <p className="font-sans text-xs text-neutral-300 leading-relaxed mb-3">
                 {description}
               </p>
             )}

             {/* Stats/Effects */}
             {stats && stats.length > 0 && (
               <div className="space-y-1">
                 {stats.map((stat, i) => (
                   <div key={i} className="flex justify-between font-mono text-xs">
                     <span className="text-neutral-500">{stat.label}</span>
                     <span className="text-gold">{stat.value}</span>
                   </div>
                 ))}
               </div>
             )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemTooltip;