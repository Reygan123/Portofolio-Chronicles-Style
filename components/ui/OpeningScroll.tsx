import React, { useEffect, useState } from 'react';
import GoldenFrame from './GoldenFrame';
import Button from './Button';
import { Scroll, X } from 'lucide-react';
import { playSound, startAmbience } from '../../utils/audio';

interface OpeningScrollProps {
  onClose: () => void;
}

const OpeningScroll: React.FC<OpeningScrollProps> = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleEnter = () => {
    playSound('open');
    startAmbience(); // Start background noise interaction
    setIsOpen(false);
    setTimeout(onClose, 500); // Allow fade out
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity duration-500">
      <div className="max-w-2xl w-full animate-float">
        <GoldenFrame variant="heavy" className="bg-charcoal">
          <div className="text-center py-8 px-4">
             <div className="flex justify-center mb-6">
                <Scroll size={48} className="text-gold animate-pulse" />
             </div>
             
             <h1 className="font-cinzel text-4xl text-gold mb-4">Welcome, Traveler</h1>
             
             <div className="space-y-4 font-sans text-neutral-300 leading-relaxed text-sm md:text-base mb-8">
               <p>
                 You stand before the digital fortress of <span className="text-white font-bold">Arya Stark</span>. 
                 Within these walls lie artifacts of code, scrolls of wisdom, and tools of creation.
               </p>
               <p className="italic text-gold/60 border-t border-b border-gold/20 py-4 mx-8">
                 "Only those who dare to explore the dark mode shall find the brightest solutions."
               </p>
               <p>
                 Navigate with caution. The realm is interactive. 
                 <br/><span className="text-xs text-neutral-500">(Audio enabled for immersion)</span>
               </p>
             </div>

             <Button 
               label="Begin The Adventure" 
               onClick={handleEnter}
               className="w-full md:w-auto px-12"
             />
          </div>
        </GoldenFrame>
      </div>
    </div>
  );
};

export default OpeningScroll;