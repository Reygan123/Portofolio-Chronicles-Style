import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import GoldenFrame from '../components/ui/GoldenFrame';
import { Github, ExternalLink, Code2 } from 'lucide-react';
import { Project } from '../types';

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Frontend' | 'Fullstack' | 'UI/UX'>('All');

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  const categories = ['All', 'Frontend', 'Fullstack', 'UI/UX'];

  return (
    <section className="min-h-screen pt-28 pb-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-cinzel text-4xl text-gold mb-4">The Archives</h2>
        <div className="flex justify-center gap-4 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              className={`font-cinzel text-sm px-4 py-1 border transition-all duration-300 ${
                filter === cat 
                  ? 'border-gold text-gold bg-gold/10 shadow-[0_0_10px_rgba(200,161,91,0.2)]' 
                  : 'border-neutral-700 text-neutral-500 hover:border-neutral-500 hover:text-neutral-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {filteredProjects.map((project: Project) => (
          <GoldenFrame key={project.id} className="h-full">
            <div className="flex flex-col h-full">
              {/* Image Container */}
              <div className="relative w-full h-48 md:h-64 mb-6 overflow-hidden border border-ash group-hover:border-gold/30 transition-colors">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4">
                  <span className="font-mono text-xs text-gold/80 px-2 py-1 bg-black/50 border border-gold/30">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col">
                <h3 className="font-cinzel text-2xl text-neutral-100 mb-3 group-hover:text-gold transition-colors">
                  {project.title}
                </h3>
                <p className="font-sans text-neutral-400 text-sm leading-relaxed mb-6 flex-1">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map(tech => (
                    <span key={tech} className="font-mono text-xs text-neutral-500 flex items-center gap-1">
                      <Code2 size={12} className="text-bronze" /> {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-4 border-t border-white/5">
                  <a href={project.demoUrl} className="flex-1 flex items-center justify-center gap-2 py-2 border border-gold/30 text-gold/80 hover:bg-gold/10 hover:border-gold hover:text-gold transition-all font-cinzel text-sm uppercase">
                    <ExternalLink size={14} /> View Artifact
                  </a>
                  <a href={project.repoUrl} className="flex-1 flex items-center justify-center gap-2 py-2 border border-neutral-700 text-neutral-500 hover:bg-neutral-800 hover:border-neutral-500 hover:text-neutral-300 transition-all font-cinzel text-sm uppercase">
                    <Github size={14} /> Runes
                  </a>
                </div>
              </div>
            </div>
          </GoldenFrame>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;