import React, { useState } from 'react';
import { SKILL_TREE, ACHIEVEMENTS, TESTIMONIALS } from '../constants';
import GoldenFrame from '../components/ui/GoldenFrame';
import Parchment from '../components/ui/Parchment';
import { SkillNode, SkillRank } from '../types';
import ItemTooltip from '../components/ui/ItemTooltip';
import { Info, Sword, Shield, Scroll, Zap, Trophy, Lock, Gem, Monitor } from 'lucide-react';
import { playSound } from '../utils/audio';

const getRankName = (level: number): SkillRank => {
  if (level >= 95) return 'Grandmaster';
  if (level >= 85) return 'Master';
  if (level >= 70) return 'Expert';
  if (level >= 50) return 'Adept';
  if (level >= 30) return 'Apprentice';
  return 'Novice';
};

const SkillNodeComponent: React.FC<{ 
  node: SkillNode; 
  isSelected: boolean; 
  onClick: (node: SkillNode) => void 
}> = ({ node, isSelected, onClick }) => {
  return (
    <div 
      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-110 z-10"
      style={{ left: `${node.x}%`, top: `${node.y}%` }}
      onClick={() => { playSound('click'); onClick(node); }}
      onMouseEnter={() => playSound('hover')}
    >
      <ItemTooltip 
        title={node.name} 
        subtitle={`Rank: ${getRankName(node.level)}`}
        rarity={node.level > 80 ? 'legendary' : node.level > 60 ? 'epic' : 'common'}
      >
        <div className={`
          relative w-10 h-10 md:w-16 md:h-16 flex items-center justify-center rounded-full border-2 
          bg-charcoal shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all duration-300
          ${isSelected ? 'border-gold scale-110 shadow-[0_0_20px_#C8A15B]' : 'border-neutral-700 hover:border-gold/50'}
        `}>
          <div className={`text-gold ${isSelected ? 'animate-pulse' : ''}`}>
             {/* Adjusted icon size for mobile */}
             {React.cloneElement(node.icon as React.ReactElement<any>, { 
               size: window.innerWidth < 768 ? 18 : 24 
             })}
          </div>
          
          {/* Level Badge */}
          <div className="absolute -bottom-2 bg-black border border-neutral-700 rounded px-1.5 py-0.5 text-[8px] md:text-[10px] font-mono text-neutral-300">
             {node.level}
          </div>
        </div>
      </ItemTooltip>
    </div>
  );
};

const StatBar: React.FC<{ label: string; value: number; color: string }> = ({ label, value, color }) => (
  <div className="mb-2">
    <div className="flex justify-between text-[10px] font-mono text-neutral-400 mb-1 uppercase tracking-wider">
      <span>{label}</span>
      <span>{value}</span>
    </div>
    <div className="h-2 w-full bg-black border border-neutral-800 rounded-sm overflow-hidden">
      <div className={`h-full ${color}`} style={{ width: `${value}%` }}></div>
    </div>
  </div>
);

const InventoryItem: React.FC<{ icon: React.ReactNode; name: string; desc: string }> = ({ icon, name, desc }) => (
  <ItemTooltip title={name} description={desc} rarity="rare">
    <div className="w-10 h-10 md:w-12 md:h-12 bg-black border border-neutral-700 hover:border-gold hover:bg-gold/10 flex items-center justify-center transition-all cursor-help group">
      <div className="text-neutral-500 group-hover:text-gold transition-colors">{icon}</div>
    </div>
  </ItemTooltip>
);

const About: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<SkillNode>(SKILL_TREE[0]);
  const [isRetro, setIsRetro] = useState(false);

  // Generate SVG lines for connections
  const renderConnections = () => {
    return SKILL_TREE.map(node => {
      if (!node.parentId) return null;
      const parent = SKILL_TREE.find(n => n.id === node.parentId);
      if (!parent) return null;

      return (
        <line
          key={`${parent.id}-${node.id}`}
          x1={`${parent.x}%`}
          y1={`${parent.y}%`}
          x2={`${node.x}%`}
          y2={`${node.y}%`}
          stroke="#C8A15B"
          strokeWidth="2"
          strokeOpacity="0.2"
          className="animate-pulse"
        />
      );
    });
  };

  const toggleGraphics = () => {
    setIsRetro(!isRetro);
    playSound('click');
  };

  return (
    <section className="min-h-screen pt-32 md:pt-40 pb-20 px-4 max-w-7xl mx-auto space-y-12">
      
      {/* 1. Character Sheet Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lore / Stats */}
        <div className="lg:col-span-2">
          <GoldenFrame variant="heavy">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
              
              {/* Avatar Column */}
              <div className="shrink-0 flex flex-col items-center w-full md:w-auto">
                <div className="relative w-32 h-32 md:w-40 md:h-40 bg-black border-2 border-charcoal overflow-hidden mb-3 group">
                   <img 
                      src={`https://picsum.photos/200/200?grayscale${isRetro ? '&blur=2' : ''}`} 
                      alt="Avatar" 
                      className={`w-full h-full object-cover transition-all duration-300 ${isRetro ? 'brightness-125 contrast-125' : 'filter grayscale'}`}
                      style={{ 
                        imageRendering: isRetro ? 'pixelated' : 'auto',
                        transform: isRetro ? 'scale(1.2)' : 'scale(1)'
                      }}
                   />
                   {/* Pixel overlay for retro effect if real pixel art not available */}
                   {isRetro && <div className="absolute inset-0 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIklEQVQIW2NkQAKrVq36zwjjgzjwq1ev/s+IImCgoKAAywAAM80X7/6094gAAAAASUVORK5CYII=')] opacity-30 pointer-events-none"></div>}
                </div>
                
                {/* Hidden Toggle */}
                <button 
                  onClick={toggleGraphics}
                  className="flex items-center gap-2 text-[10px] font-mono text-neutral-500 hover:text-gold transition-colors px-2 py-1 border border-transparent hover:border-gold/30 rounded"
                >
                   <Monitor size={12} />
                   {isRetro ? "Mode: 8-Bit" : "Mode: HD"}
                </button>
              </div>

              <div className="flex-1 space-y-4 md:space-y-6 w-full">
                <div className="border-b border-white/10 pb-4">
                  <h2 className="font-cinzel text-2xl md:text-3xl text-gold">The Void Walker</h2>
                  <div className="flex flex-wrap gap-2 mt-2 font-mono text-[10px] md:text-xs text-neutral-400">
                    <span className="px-2 py-1 bg-neutral-800 rounded">Class: Code Artificer</span>
                    <span className="px-2 py-1 bg-neutral-800 rounded">Alignment: Chaotic Good</span>
                    <span className="px-2 py-1 bg-neutral-800 rounded">Lvl. 99</span>
                  </div>
                </div>
                
                <p className="font-sans text-neutral-400 text-sm leading-relaxed">
                  A veteran summoner of interfaces who dwells in the deep void of the backend but shines in the frontend. 
                  Specializes in transmuting caffeine into clean, scalable logic.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <StatBar label="INT (Logic)" value={95} color="bg-blue-600" />
                  <StatBar label="WIS (Experience)" value={88} color="bg-purple-600" />
                  <StatBar label="CHA (Communication)" value={85} color="bg-yellow-600" />
                  <StatBar label="DEX (Typing Spd)" value={98} color="bg-green-600" />
                </div>
              </div>

              {/* Inventory */}
              <div className="w-full md:w-32 shrink-0 border-t md:border-t-0 border-white/10 pt-4 md:pt-0">
                <h3 className="font-cinzel text-sm text-gold mb-3 border-b border-gold/20 pb-1">Inventory</h3>
                <div className="grid grid-cols-4 md:grid-cols-2 gap-2">
                  <InventoryItem icon={<Sword size={20} />} name="Blade of React" desc="+10 Rendering Speed. Slices through DOM nodes." />
                  <InventoryItem icon={<Shield size={20} />} name="Shield of Types" desc="Immunity to runtime errors. Requires TS Config." />
                  <InventoryItem icon={<Scroll size={20} />} name="Scroll of Tailwind" desc="Instant styling incantations." />
                  <InventoryItem icon={<Zap size={20} />} name="Amulet of Vite" desc="Reduces build times by 90%." />
                </div>
              </div>
            </div>
          </GoldenFrame>
        </div>

        {/* Current Quest */}
        <div className="lg:col-span-1">
           <GoldenFrame variant="light" className="h-full flex flex-col justify-center text-center p-8 bg-charcoal/50">
              <h3 className="font-cinzel text-xl text-neutral-300 mb-2">Current Objective</h3>
              <p className="font-mono text-xs text-gold mb-4 animate-pulse">Seeking New Contracts</p>
              <p className="text-sm text-neutral-500 italic">
                "The code must flow."
              </p>
           </GoldenFrame>
        </div>
      </div>

      {/* 2. Skill Tree Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[650px] md:h-[600px] lg:h-[500px]">
        {/* Left Panel: The Skill Tree */}
        <div className="lg:col-span-2 relative h-full bg-black/40 border border-neutral-800 rounded-lg overflow-hidden">
           <div className="absolute top-4 left-4 z-20 pointer-events-none">
              <h2 className="font-cinzel text-xl md:text-2xl text-gold">The Skill Tree</h2>
              <p className="text-[10px] md:text-xs text-neutral-500 font-mono">Select a node to inspect abilities.</p>
           </div>
           {/* Background Grid */}
           <div className="absolute inset-0 opacity-10" 
                style={{ 
                  backgroundImage: 'radial-gradient(#C8A15B 1px, transparent 1px)', 
                  backgroundSize: '20px 20px' 
                }} 
           />
           {/* Tree Visualization */}
           <div className="relative w-full h-full">
             <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
               {renderConnections()}
             </svg>

             {SKILL_TREE.map(node => (
               <SkillNodeComponent 
                 key={node.id} 
                 node={node} 
                 isSelected={selectedSkill.id === node.id}
                 onClick={setSelectedSkill}
               />
             ))}
           </div>
        </div>

        {/* Right Panel: Perk Inspection */}
        <div className="lg:col-span-1">
          <GoldenFrame variant="heavy" className="h-full flex flex-col">
            <div className="border-b border-neutral-800 pb-4 mb-6">
               <h3 className="font-cinzel text-xl text-gold mb-1">Perk Details</h3>
               <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">Inspection Mode</span>
            </div>

            <div className="flex-1 flex flex-col items-center text-center">
               <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-gold/30 flex items-center justify-center bg-black mb-6 shadow-[0_0_30px_rgba(200,161,91,0.1)]">
                  {React.cloneElement(selectedSkill.icon as React.ReactElement<any>, { size: 40, className: "text-gold" })}
               </div>

               <h2 className="font-cinzel text-2xl md:text-3xl text-neutral-100 mb-2">{selectedSkill.name}</h2>
               <div className="mb-6">
                 <span className={`px-3 py-1 rounded-full border text-xs font-mono uppercase ${
                    selectedSkill.level > 80 ? 'border-gold text-gold bg-gold/10' : 'border-neutral-500 text-neutral-400'
                 }`}>
                    {getRankName(selectedSkill.level)}
                 </span>
               </div>

               <div className="w-full bg-neutral-800 h-4 rounded-full border border-neutral-700 mb-2 relative overflow-hidden">
                 <div 
                   className="absolute top-0 left-0 h-full bg-gradient-to-r from-mana via-blue-500 to-cyan-400"
                   style={{ width: `${selectedSkill.level}%` }}
                 />
               </div>
               <div className="w-full flex justify-between text-[10px] font-mono text-neutral-500 mb-8">
                  <span>0 XP</span>
                  <span>{selectedSkill.level * 1000} / 10000 XP</span>
               </div>

               <div className="bg-charcoal/50 p-4 border border-neutral-800 text-left w-full relative">
                 <Info size={16} className="absolute top-4 right-4 text-neutral-600" />
                 <h4 className="font-cinzel text-sm text-gold mb-2">Effect Description</h4>
                 <p className="font-sans text-neutral-400 text-sm leading-relaxed">
                   {selectedSkill.description}
                 </p>
               </div>
            </div>
          </GoldenFrame>
        </div>
      </div>

      {/* 3. The Codex of Achievements (Trophy Room) */}
      <div className="space-y-6">
         <div className="flex items-center gap-4">
            <h2 className="font-cinzel text-2xl md:text-3xl text-gold">The Codex of Achievements</h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-gold/50 to-transparent"></div>
         </div>
         
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ACHIEVEMENTS.map((ach) => (
              <ItemTooltip 
                 key={ach.id} 
                 title={ach.title} 
                 subtitle={ach.isUnlocked ? 'Unlocked' : 'Locked'} 
                 description={ach.description}
                 rarity={ach.isUnlocked ? 'epic' : 'common'}
              >
                <div 
                   className={`relative p-3 md:p-4 border rounded bg-charcoal/50 flex flex-col items-center text-center gap-3 transition-all duration-300 group min-h-[140px]
                   ${ach.isUnlocked ? 'border-gold/30 hover:bg-gold/5 hover:border-gold' : 'border-neutral-800 opacity-50 grayscale'}`}
                >
                    <div className="relative mt-2">
                       {ach.isUnlocked ? (
                         <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gold/10 border border-gold flex items-center justify-center text-gold shadow-[0_0_10px_rgba(200,161,91,0.3)]">
                           <Trophy size={20} />
                         </div>
                       ) : (
                         <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black border border-neutral-800 flex items-center justify-center text-neutral-600">
                           <Lock size={20} />
                         </div>
                       )}
                    </div>
                    <div>
                      <h4 className={`font-cinzel text-[10px] md:text-xs font-bold leading-tight mb-1 ${ach.isUnlocked ? 'text-neutral-200' : 'text-neutral-500'}`}>{ach.title}</h4>
                      <span className="text-[9px] md:text-[10px] font-mono text-neutral-500 uppercase">{ach.category}</span>
                    </div>
                </div>
              </ItemTooltip>
            ))}
         </div>
      </div>

      {/* 4. The Scrolls of Recommendation (Testimonials) */}
      <div className="space-y-8 pb-12">
        <div className="flex items-center gap-4">
            <h2 className="font-cinzel text-2xl md:text-3xl text-gold">The Scrolls of Recommendation</h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-gold/50 to-transparent"></div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <Parchment key={t.id} className="h-full">
                 <div className="flex justify-between items-start mb-4 border-b border-[#2c241b]/20 pb-2">
                    <div>
                       <h4 className="font-cinzel font-bold text-base md:text-lg leading-tight">{t.author}</h4>
                       <span className="font-mono text-[10px] uppercase tracking-wider opacity-70">{t.role}</span>
                    </div>
                    {/* Gem Rating */}
                    <div className="flex gap-0.5">
                       {Array.from({length: 5}).map((_, i) => (
                          <Gem 
                            key={i} 
                            size={12} 
                            className={i < t.rating ? "text-red-700 fill-red-700" : "text-[#2c241b]/20"} 
                          />
                       ))}
                    </div>
                 </div>
                 <p className="font-serif italic text-sm leading-relaxed opacity-90">
                    "{t.content}"
                 </p>
                 <div className="mt-4 flex justify-end">
                    <div className="w-8 h-8 opacity-20 bg-[url('https://api.iconify.design/game-icons:wax-seal.svg')] bg-cover"></div>
                 </div>
              </Parchment>
            ))}
         </div>
      </div>

    </section>
  );
};

export default About;