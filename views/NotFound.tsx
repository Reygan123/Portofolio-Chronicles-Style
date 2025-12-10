import React from 'react';
import { ViewState } from '../types';
import Button from '../components/ui/Button';
import { Skull, AlertTriangle } from 'lucide-react';

interface NotFoundProps {
  onReturn: () => void;
}

const NotFound: React.FC<NotFoundProps> = ({ onReturn }) => {
  return (
    <section className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Glitch Effects */}
      <div className="absolute inset-0 bg-red-900/5 z-0 pointer-events-none animate-pulse"></div>
      
      <div className="relative z-10 text-center max-w-2xl">
         <div className="mb-6 flex justify-center">
            <div className="relative">
              <Skull size={80} className="text-neutral-700" />
              <AlertTriangle size={30} className="text-red-800 absolute -bottom-2 -right-2 animate-bounce" />
            </div>
         </div>

         <h1 className="font-cinzel text-6xl text-neutral-800 font-black tracking-tighter mb-2 select-none">
            404
         </h1>
         <h2 className="font-cinzel text-2xl text-red-900/80 mb-6 border-b border-red-900/30 pb-4 inline-block">
            The Forbidden Zone
         </h2>

         <p className="font-sans text-neutral-500 mb-8 leading-relaxed px-8">
            You have strayed from the path, traveler. The scroll you seek has been burned or never existed. 
            This realm is unstable. Dark magic consumes those who linger too long.
         </p>

         <Button 
           label="Return to The Citadel" 
           onClick={onReturn}
           icon={<AlertTriangle size={16} />}
           className="border-red-900/30 text-red-800/80 hover:text-red-500 hover:border-red-500"
         />
      </div>
    </section>
  );
};

export default NotFound;