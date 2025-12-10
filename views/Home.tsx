import React, { useEffect, useState } from 'react';
import { ViewState } from '../types';
import { DEV_NAME, DEV_TITLE } from '../constants';
import Button from '../components/ui/Button';
import { ChevronRight } from 'lucide-react';

interface HomeProps {
  onChangeView: (view: ViewState) => void;
}

const Home: React.FC<HomeProps> = ({ onChangeView }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Simple mount animation delay
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Atmospheric Background Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-gold/5 rounded-full blur-[100px] md:blur-[120px] pointer-events-none animate-pulse" />

      <div className={`relative z-10 flex flex-col items-center text-center transition-all duration-1000 transform ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* Decorative Divider */}
        <div className="w-px h-16 md:h-24 bg-gradient-to-b from-transparent via-gold/50 to-transparent mb-8" />

        <h2 className="font-cinzel text-gold text-lg md:text-xl lg:text-2xl tracking-[0.2em] md:tracking-[0.3em] mb-4 uppercase opacity-80">
          The Chronicles of
        </h2>
        
        <h1 className="font-cinzel text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-200 to-neutral-600 mb-6 drop-shadow-2xl px-2 leading-tight">
          {DEV_NAME}
        </h1>

        <p className="font-cinzel text-lg md:text-3xl text-gold/80 mb-8 border-y border-gold/20 py-2 px-8 inline-block">
          {DEV_TITLE}
        </p>

        <p className="font-sans text-neutral-400 max-w-lg mb-12 leading-relaxed text-sm md:text-base px-2">
          Crafting immersive digital experiences through code and design. 
          Welcome to my realm, traveler. Explore my artifacts, read the lore, 
          or send a raven.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <Button 
            label="Enter the Archives" 
            onClick={() => onChangeView(ViewState.PORTFOLIO)}
            icon={<ChevronRight size={18} />}
          />
        </div>

        {/* Decorative Divider Bottom */}
        <div className="w-px h-16 md:h-24 bg-gradient-to-b from-transparent via-gold/50 to-transparent mt-12" />
      </div>
    </section>
  );
};

export default Home;