import React, { useEffect, useState } from 'react';
import { ViewState } from '../types';
import { DEV_NAME, DEV_TITLE, PROJECTS, SKILLS, QUEST_LOG } from '../constants';
import Button from '../components/ui/Button';
import GoldenFrame from '../components/ui/GoldenFrame';
import { ChevronRight, Star, Zap, Scroll, Sword, Gem, Crown } from 'lucide-react';

interface HomeProps {
  onChangeView: (view: ViewState) => void;
}

const Home: React.FC<HomeProps> = ({ onChangeView }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const featuredProject = PROJECTS[0];
  const featuredSkills = SKILLS.slice(0, 4);
  const latestQuest = QUEST_LOG[0];

  return (
    <section className="min-h-screen pt-24 pb-20 px-4 max-w-7xl mx-auto relative">
      
      {/* Hero Section - The Avatar */}
      <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-20 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Avatar Frame */}
        <div className="relative group shrink-0">
          <div className="absolute inset-0 bg-gold/20 blur-2xl rounded-full opacity-50 group-hover:opacity-80 transition-opacity" />
          <GoldenFrame variant="heavy" className="p-2 md:p-3 rounded-full md:rounded-lg rotate-0 md:rotate-3 transition-transform duration-500 hover:rotate-0">
            <div className="w-40 h-40 md:w-56 md:h-56 overflow-hidden border-2 border-charcoal bg-black">
              <img 
                src="https://picsum.photos/400/400?grayscale" 
                alt={DEV_NAME}
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700 hover:scale-110" 
              />
            </div>
          </GoldenFrame>
        </div>

        {/* Introduction Text */}
        <div className="text-center md:text-left space-y-4 md:space-y-6 max-w-2xl">
          <div className="flex items-center justify-center md:justify-start gap-2 text-gold/60 font-cinzel text-sm tracking-widest uppercase">
            <Crown size={16} /> Lvl. 99 {DEV_TITLE}
          </div>
          
          <h1 className="font-cinzel text-4xl sm:text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-200 to-neutral-600 drop-shadow-xl leading-none">
            {DEV_NAME}
          </h1>
          
          <p className="font-sans text-neutral-400 text-base md:text-lg leading-relaxed border-l-2 border-gold/30 pl-4 md:pl-6 ml-4 md:ml-0">
            Welcome, traveler. I forge digital realms and interactive experiences. 
            Navigate the map below to inspect my artifacts, assess my abilities, or read the chronicles of my journey.
          </p>

          <div className="pt-4 flex justify-center md:justify-start">
             <Button 
                label="Enter The Realm" 
                onClick={() => onChangeView(ViewState.PORTFOLIO)}
                icon={<Sword size={18} />}
             />
          </div>
        </div>
      </div>

      {/* Dashboard Grid (The Map) */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 transition-all duration-1000 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* Widget: Featured Project (The Forged Artifacts) */}
        <div className="lg:col-span-2">
           <GoldenFrame variant="heavy" className="h-full bg-charcoal/40">
             <div className="flex flex-col h-full">
                <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                  <h3 className="font-cinzel text-xl text-gold flex items-center gap-2">
                    <Gem size={18} className="text-gold-bright" /> The Forged Artifacts
                  </h3>
                  <span className="font-mono text-xs text-neutral-500 uppercase tracking-wider">Featured Project</span>
                </div>

                <div className="flex flex-col md:flex-row gap-6 flex-1">
                   {/* Thumbnail */}
                   <div className="w-full md:w-1/2 h-48 md:h-auto overflow-hidden border border-neutral-700 relative group cursor-pointer" onClick={() => onChangeView(ViewState.PORTFOLIO)}>
                      <img src={featuredProject.imageUrl} alt={featuredProject.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="font-cinzel text-gold border border-gold px-4 py-2">Inspect</span>
                      </div>
                   </div>
                   
                   {/* Details */}
                   <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-cinzel text-2xl text-neutral-100 mb-2">{featuredProject.title}</h4>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {featuredProject.techStack.map(tech => (
                             <span key={tech} className="text-xs font-mono text-neutral-400 bg-black/40 px-2 py-1 border border-neutral-800">{tech}</span>
                          ))}
                        </div>
                        <p className="font-sans text-neutral-400 text-sm leading-relaxed mb-6">
                           {featuredProject.description}
                        </p>
                      </div>
                      
                      <div className="mt-auto pt-4">
                        <Button 
                          variant="secondary" 
                          label="View All Artifacts" 
                          onClick={() => onChangeView(ViewState.PORTFOLIO)}
                          className="w-full md:w-auto text-xs"
                          icon={<ChevronRight size={14} />}
                        />
                      </div>
                   </div>
                </div>
             </div>
           </GoldenFrame>
        </div>

        {/* Widget: Skills (The Warrior's Arsenal) */}
        <div className="lg:col-span-1">
          <GoldenFrame variant="light" className="h-full bg-charcoal/40">
            <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
               <h3 className="font-cinzel text-xl text-gold flex items-center gap-2">
                 <Zap size={18} className="text-gold-bright" /> The Arsenal
               </h3>
               <span className="font-mono text-xs text-neutral-500">Lvl. 99</span>
            </div>

            <div className="space-y-5">
              {featuredSkills.map((skill, index) => (
                <div key={skill.name} className="group cursor-default">
                  <div className="flex justify-between mb-1">
                    <span className="font-cinzel text-xs text-neutral-300">{skill.name}</span>
                    <span className="font-mono text-[10px] text-gold/60">{skill.level} / 100</span>
                  </div>
                  <div className="h-3 bg-black border border-neutral-800 relative">
                     {/* Mana Bar Style Gradient */}
                    <div 
                      className={`absolute top-0 left-0 h-full opacity-80 group-hover:opacity-100 transition-all duration-500 ${index % 2 === 0 ? 'bg-gradient-to-r from-blue-900 to-cyan-500' : 'bg-gradient-to-r from-red-900 to-orange-500'}`}
                      style={{ width: `${skill.level}%` }}
                    />
                    {/* Gloss effect */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-white/20" />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t border-white/5 text-center">
               <button 
                  onClick={() => onChangeView(ViewState.ABOUT)}
                  className="text-gold/80 hover:text-gold text-xs font-cinzel uppercase tracking-widest flex items-center justify-center gap-2 group transition-colors"
               >
                 View Full Abilities <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
               </button>
            </div>
          </GoldenFrame>
        </div>

        {/* Widget: Recent Log (Chronicles) */}
        <div className="lg:col-span-2">
          <GoldenFrame variant="light" className="h-full bg-charcoal/40">
             <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                <h3 className="font-cinzel text-xl text-gold flex items-center gap-2">
                  <Scroll size={18} className="text-gold-bright" /> Recent Chronicles
                </h3>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" />
                   <span className="font-mono text-xs text-neutral-500">Live Feed</span>
                </div>
             </div>

             <div className="relative pl-6 border-l border-neutral-800 ml-2">
                <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 bg-gold rotate-45 border border-black" />
                
                <h4 className="font-cinzel text-lg text-neutral-200 mb-1">{latestQuest.role}</h4>
                <p className="font-mono text-xs text-gold/60 mb-3">{latestQuest.company} • {latestQuest.period}</p>
                <p className="font-sans text-sm text-neutral-400 leading-relaxed italic border-l-2 border-neutral-700 pl-4 bg-black/20 py-2 pr-2">
                   "{latestQuest.description}"
                </p>
             </div>

             <div className="mt-6 flex justify-end">
                <button 
                   onClick={() => onChangeView(ViewState.ABOUT)}
                   className="text-neutral-500 hover:text-gold text-xs font-cinzel uppercase tracking-widest transition-colors flex items-center gap-2"
                >
                  Read All Scrolls <ChevronRight size={12} />
                </button>
             </div>
          </GoldenFrame>
        </div>

        {/* Widget: Contact CTA (The Guild) */}
        <div className="lg:col-span-1">
           <GoldenFrame variant="heavy" className="h-full relative overflow-hidden group cursor-pointer">
              {/* Background Sigil */}
              <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                 <Star size={120} className="text-gold" />
              </div>

              <div className="relative z-10 flex flex-col items-center justify-center h-full text-center py-6">
                 <h3 className="font-cinzel text-2xl text-gold mb-2">Seek a Collaborator?</h3>
                 <p className="font-sans text-neutral-400 text-xs mb-6 px-4">
                   Send a raven to the guild. Open to new quests and alliances.
                 </p>
                 <Button 
                   label="Contact The Guild" 
                   onClick={() => onChangeView(ViewState.CONTACT)}
                   className="text-xs px-6 py-2"
                 />
              </div>
           </GoldenFrame>
        </div>

      </div>
    </section>
  );
};

export default Home;