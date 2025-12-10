import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import GoldenFrame from '../components/ui/GoldenFrame';
import ItemTooltip from '../components/ui/ItemTooltip';
import { Github, ExternalLink, Sword, Shield, Scroll, CheckCircle2, Clock, Star, HelpCircle } from 'lucide-react';
import { Project } from '../types';
import { playSound } from '../utils/audio';

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Frontend' | 'Fullstack' | 'UI/UX'>('All');
  const [showSecretLink, setShowSecretLink] = useState(false);

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  // Filter icons mapping
  const filters = [
    { id: 'All', icon: <Star size={16} />, label: 'All Quests' },
    { id: 'Frontend', icon: <Sword size={16} />, label: 'Frontend' },
    { id: 'Fullstack', icon: <Shield size={16} />, label: 'Fullstack' },
    { id: 'UI/UX', icon: <Scroll size={16} />, label: 'UI/UX' },
  ];

  const getStatusIcon = (status: Project['status']) => {
    switch(status) {
      case 'Completed Quest': return <CheckCircle2 size={14} className="text-green-500" />;
      case 'In-Progress Quest': return <Clock size={14} className="text-blue-400" />;
      case 'Critical Success': return <Star size={14} className="text-gold" />;
    }
  };

  const getStatusColor = (status: Project['status']) => {
     switch(status) {
      case 'Completed Quest': return 'text-green-500 border-green-900/50 bg-green-900/20';
      case 'In-Progress Quest': return 'text-blue-400 border-blue-900/50 bg-blue-900/20';
      case 'Critical Success': return 'text-gold border-gold/50 bg-gold/10';
    }
  };

  const handleSecretClick = () => {
    playSound('whisper');
    setShowSecretLink(true);
    setTimeout(() => setShowSecretLink(false), 5000);
  };

  return (
    <section className="min-h-screen pt-32 md:pt-36 pb-20 px-4 max-w-7xl mx-auto relative">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="font-cinzel text-3xl md:text-4xl text-gold mb-2">The Quest Log</h2>
        <p className="font-mono text-[10px] md:text-xs text-neutral-500 uppercase tracking-widest mb-8">Completed Contracts & Artifacts</p>
        
        {/* Class Filters */}
        <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
          {filters.map(f => (
            <ItemTooltip key={f.id} title={f.label} description={`Filter quests by ${f.id} class.`}>
              <button
                onClick={() => setFilter(f.id as any)}
                className={`flex items-center gap-2 font-cinzel text-xs md:text-sm px-4 py-2 md:px-6 border transition-all duration-300 rounded md:rounded-none ${
                  filter === f.id 
                    ? 'border-gold text-gold bg-gold/10 shadow-[0_0_15px_rgba(200,161,91,0.2)]' 
                    : 'border-neutral-700 text-neutral-500 hover:border-neutral-500 hover:text-neutral-300 bg-charcoal'
                }`}
              >
                {/* Clone icon with responsive size */}
                {React.cloneElement(f.icon as React.ReactElement<any>, { size: window.innerWidth < 768 ? 14 : 16 })}
                {f.id}
              </button>
            </ItemTooltip>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {filteredProjects.map((project: Project) => (
          <GoldenFrame key={project.id} className="h-full">
            <div className="flex flex-col h-full">
              {/* Image Container */}
              <ItemTooltip 
                 title={project.title} 
                 rarity={project.status === 'Critical Success' ? 'legendary' : 'rare'}
                 description="Click to view the artifact demonstration."
              >
                <div className="relative w-full h-48 md:h-64 mb-6 overflow-hidden border border-ash group-hover:border-gold/30 transition-colors cursor-pointer">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal to-transparent opacity-80" />
                  
                  {/* Status Badge */}
                  <div className={`absolute top-4 right-4 flex items-center gap-2 px-3 py-1 border rounded-full font-mono text-[10px] uppercase tracking-wider backdrop-blur-md ${getStatusColor(project.status)}`}>
                     {getStatusIcon(project.status)} <span className="hidden sm:inline">{project.status}</span>
                  </div>

                  <div className="absolute bottom-4 left-4">
                    <span className="font-mono text-[10px] md:text-xs text-gold/80 px-2 py-1 bg-black/50 border border-gold/30">
                      {project.category} Class
                    </span>
                  </div>
                </div>
              </ItemTooltip>

              {/* Content */}
              <div className="flex-1 flex flex-col">
                <h3 className="font-cinzel text-xl md:text-2xl text-neutral-100 mb-3 group-hover:text-gold transition-colors">
                  {project.title}
                </h3>
                <p className="font-sans text-neutral-400 text-sm leading-relaxed mb-6 flex-1">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map(tech => (
                    <span key={tech} className="font-mono text-[10px] md:text-xs text-neutral-500 flex items-center gap-1 bg-black/20 px-2 py-1 rounded border border-neutral-800">
                       {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-4 border-t border-white/5">
                  <a href={project.demoUrl} className="flex-1">
                    <button className="w-full flex items-center justify-center gap-2 py-2 border border-gold/30 text-gold/80 hover:bg-gold/10 hover:border-gold hover:text-gold transition-all font-cinzel text-xs md:text-sm uppercase">
                      <ExternalLink size={14} /> Inspect
                    </button>
                  </a>
                  <a href={project.repoUrl} className="flex-1">
                     <button className="w-full flex items-center justify-center gap-2 py-2 border border-neutral-700 text-neutral-500 hover:bg-neutral-800 hover:border-neutral-500 hover:text-neutral-300 transition-all font-cinzel text-xs md:text-sm uppercase">
                      <Github size={14} /> Runes
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </GoldenFrame>
        ))}
      </div>

      {/* The Ancient Whisper: Secret Interactive Element */}
      <div className="absolute bottom-4 right-4 z-10">
         <button 
           onClick={handleSecretClick}
           className="p-2 rounded-full text-neutral-800 hover:text-gold/50 transition-all duration-700 opacity-5 hover:opacity-100 cursor-help"
           aria-label="Strange Mark"
         >
           <HelpCircle size={16} />
         </button>
         
         {/* Reveal Text */}
         <div className={`absolute bottom-full right-0 mb-2 w-48 bg-black border border-gold/30 p-2 text-center transform transition-all duration-500 ${showSecretLink ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'}`}>
            <p className="font-cinzel text-xs text-gold mb-1">A Whisper from the Void</p>
            <a href="#" className="font-mono text-[10px] text-neutral-400 hover:text-white hover:underline block">
               View Forbidden Repo &rarr;
            </a>
         </div>
      </div>
    </section>
  );
};

export default Portfolio;