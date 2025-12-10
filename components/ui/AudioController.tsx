import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { toggleMute, playSound, getMuteState } from '../../utils/audio';

const AudioController: React.FC = () => {
  const [muted, setMuted] = useState(getMuteState());

  const handleToggle = () => {
    const newState = toggleMute();
    setMuted(newState);
    if (!newState) {
      playSound('click');
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full border border-gold/30 bg-charcoal/80 text-gold flex items-center justify-center hover:bg-gold/10 hover:border-gold transition-all duration-300 group"
      aria-label="Toggle Audio"
    >
      {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      <span className="absolute right-full mr-3 bg-black/80 px-2 py-1 text-[10px] text-gold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {muted ? "Unmute Ambiance" : "Mute Ambiance"}
      </span>
    </button>
  );
};

export default AudioController;