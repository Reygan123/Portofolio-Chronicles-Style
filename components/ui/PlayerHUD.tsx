import React, { useState, useEffect } from 'react';
import { Clock, Eye, Activity } from 'lucide-react';
import { playSound } from '../../utils/audio';

const PlayerHUD: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [visits, setVisits] = useState(0);
  const [isMounting, setIsMounting] = useState(true);

  useEffect(() => {
    // Clock
    const timer = setInterval(() => setTime(new Date()), 60000);
    
    // Visits Logic
    const storedVisits = Number(localStorage.getItem('dev_portfolio_visits') || 0);
    const newCount = storedVisits + 1;
    // Only increment once per session to avoid spam (simple check)
    if (!sessionStorage.getItem('session_counted')) {
       localStorage.setItem('dev_portfolio_visits', String(newCount));
       setVisits(newCount);
       sessionStorage.setItem('session_counted', 'true');
    } else {
       setVisits(storedVisits);
    }

    // Animation trigger
    setTimeout(() => setIsMounting(false), 500);

    return () => clearInterval(timer);
  }, []);

  // Determine Status based on time
  const hour = time.getHours();
  const day = time.getDay(); // 0 is Sunday
  const isWorkHours = day !== 0 && day !== 6 && hour >= 9 && hour < 18;
  
  const statusLabel = isWorkHours ? "In Quest (Actively Working)" : "Resting at Tavern (Available)";
  const statusColor = isWorkHours ? "text-green-400" : "text-blue-400";
  const statusDot = isWorkHours ? "bg-green-500" : "bg-blue-500";

  return (
    <div className={`fixed top-0 left-0 w-full z-[60] pointer-events-none transition-transform duration-700 ${isMounting ? '-translate-y-full' : 'translate-y-0'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-2 text-[10px] md:text-xs font-mono tracking-widest uppercase">
            
            {/* Left: Status */}
            <div className="bg-black/80 backdrop-blur border border-neutral-800 rounded-b-lg px-4 py-1.5 flex items-center gap-4 shadow-lg pointer-events-auto">
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${statusDot} animate-pulse`} />
                    <span className={`${statusColor}`}>{statusLabel}</span>
                </div>
            </div>

            {/* Right: Stats */}
            <div className="bg-black/80 backdrop-blur border border-neutral-800 rounded-b-lg px-4 py-1.5 flex items-center gap-6 shadow-lg pointer-events-auto mt-2 md:mt-0 ml-auto md:ml-0">
                <div className="flex items-center gap-2 text-gold">
                    <Clock size={12} />
                    <span>Realm Time: {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-400" title="Your unique visits">
                    <Eye size={12} />
                    <span>Visits: {visits}</span>
                </div>
            </div>

        </div>

        {/* Welcome Message for returning users */}
        {visits > 1 && isMounting === false && (
             <div className="absolute top-14 right-4 md:right-auto md:left-1/2 md:-translate-x-1/2 pointer-events-none">
                <div className="bg-gold/10 border border-gold/30 text-gold px-4 py-1 rounded text-xs font-cinzel animate-float">
                   Welcome Back, Traveler!
                </div>
             </div>
        )}
      </div>
    </div>
  );
};

export default PlayerHUD;