import React, { useEffect, useState } from 'react';
import { playSound } from '../../utils/audio';
import GoldenFrame from './GoldenFrame';
import { Key, X, FileText, Code } from 'lucide-react';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 
  'ArrowDown', 'ArrowDown', 
  'ArrowLeft', 'ArrowRight', 
  'ArrowLeft', 'ArrowRight', 
  'b', 'a'
];

const KonamiListener: React.FC = () => {
  const [inputSequence, setInputSequence] = useState<string[]>([]);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [feedback, setFeedback] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Feedback effect on any valid key press of the sequence
      if (KONAMI_CODE.includes(e.key)) {
        setFeedback(true);
        setTimeout(() => setFeedback(false), 200);
      }

      const newSequence = [...inputSequence, e.key];
      
      // Keep only the last N keys where N is the length of the code
      if (newSequence.length > KONAMI_CODE.length) {
        newSequence.shift();
      }
      
      setInputSequence(newSequence);

      // Check for match
      if (newSequence.join('') === KONAMI_CODE.join('')) {
        setIsUnlocked(true);
        playSound('unlock');
        setInputSequence([]); // Reset
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputSequence]);

  if (!isUnlocked) {
    // Return feedback overlay only
    return (
        <div className={`fixed inset-0 pointer-events-none z-[80] border-4 border-gold/50 transition-opacity duration-200 ${feedback ? 'opacity-100' : 'opacity-0'}`} />
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-float">
      <div className="max-w-xl w-full">
        <GoldenFrame variant="heavy" className="bg-charcoal">
          <div className="relative p-4">
             {/* Close Button */}
             <button 
                onClick={() => setIsUnlocked(false)}
                className="absolute top-0 right-0 p-2 text-neutral-500 hover:text-gold transition-colors"
             >
                <X size={24} />
             </button>

             <div className="text-center pt-8 pb-4">
                <div className="flex justify-center mb-4">
                   <div className="w-16 h-16 rounded-full border-2 border-gold flex items-center justify-center bg-gold/10 shadow-[0_0_30px_#C8A15B]">
                      <Key size={32} className="text-gold animate-pulse" />
                   </div>
                </div>

                <h2 className="font-cinzel text-3xl text-gold mb-2">The Master Key Unlocked!</h2>
                <p className="font-sans text-neutral-400 text-sm mb-8">
                   You have entered the ancient sequence. The developer recognizes your cunning.
                </p>

                <div className="space-y-4">
                   <div className="bg-black border border-neutral-800 p-4 rounded text-left font-mono text-xs text-green-400 overflow-x-auto relative group">
                      <div className="absolute top-2 right-2 text-neutral-600 group-hover:text-green-500 transition-colors">
                         <Code size={14} />
                      </div>
                      <p className="mb-2 text-neutral-500">// Ancient CSS Spell of Invisibility</p>
                      <pre>
{`.ghost-element {
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
  /* The secret lies in the DOM */
}`}
                      </pre>
                   </div>
                   
                   <a 
                     href="#" 
                     onClick={(e) => e.preventDefault()}
                     className="block w-full py-4 border border-gold/30 bg-gold/5 hover:bg-gold/20 hover:border-gold transition-all text-gold font-cinzel text-center uppercase tracking-widest flex items-center justify-center gap-2"
                   >
                     <FileText size={18} /> Download Secret Resume
                   </a>
                </div>
             </div>
          </div>
        </GoldenFrame>
      </div>
    </div>
  );
};

export default KonamiListener;