import React from 'react';
import { SKILLS, QUEST_LOG } from '../constants';
import GoldenFrame from '../components/ui/GoldenFrame';
import { Scroll, Sword, Trophy } from 'lucide-react';
import { Experience, Skill } from '../types';

const SkillBar: React.FC<{ skill: Skill }> = ({ skill }) => (
  <div className="mb-4">
    <div className="flex justify-between mb-1">
      <span className="font-cinzel text-sm text-neutral-300">{skill.name}</span>
      <span className="font-mono text-xs text-gold/70">{skill.level}/100</span>
    </div>
    <div className="h-2 bg-neutral-800 border border-neutral-700 relative overflow-hidden">
      <div 
        className="absolute top-0 left-0 h-full bg-gradient-to-r from-bronze to-gold opacity-80" 
        style={{ width: `${skill.level}%` }}
      />
    </div>
  </div>
);

const QuestItem: React.FC<{ exp: Experience }> = ({ exp }) => (
  <div className="relative pl-8 pb-12 last:pb-0 border-l border-neutral-700 ml-3">
    {/* Timeline Node */}
    <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 bg-gold rotate-45 border border-black shadow-[0_0_8px_#C8A15B]" />
    
    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
      <h4 className="font-cinzel text-lg text-neutral-200">{exp.role}</h4>
      <span className="font-mono text-xs text-gold/60 bg-gold/5 px-2 py-1 rounded border border-gold/10">{exp.period}</span>
    </div>
    <div className="font-cinzel text-sm text-neutral-500 mb-2">{exp.company}</div>
    <p className="font-sans text-sm text-neutral-400 leading-relaxed max-w-2xl">
      {exp.description}
    </p>
  </div>
);

const About: React.FC = () => {
  return (
    <section className="min-h-screen pt-28 pb-20 px-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Bio & Skills */}
        <div className="lg:col-span-5 space-y-12">
          {/* Portrait/Bio */}
          <GoldenFrame variant="heavy">
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-full border-2 border-gold/30 p-1 mb-6">
                <img 
                  src="https://picsum.photos/300/300?grayscale" 
                  alt="Developer" 
                  className="w-full h-full rounded-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700" 
                />
              </div>
              <h3 className="font-cinzel text-2xl text-gold mb-2">The Character</h3>
              <p className="font-sans text-neutral-400 text-sm leading-7 mb-6">
                Born in the era of dial-up, forged in the fires of browser incompatibility. 
                I am a developer who believes code is modern day sorcery. 
                I strive to build interfaces that not only function flawlessly but immerse the user in a digital narrative.
              </p>
              <div className="flex gap-4 text-neutral-500">
                <Scroll size={20} />
                <Sword size={20} />
                <Trophy size={20} />
              </div>
            </div>
          </GoldenFrame>

          {/* Skill Tree */}
          <div className="bg-charcoal/50 p-6 border border-neutral-800">
            <h3 className="font-cinzel text-xl text-gold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-gold rotate-45 inline-block"/> Skill Tree
            </h3>
            {SKILLS.map(skill => (
              <SkillBar key={skill.name} skill={skill} />
            ))}
          </div>
        </div>

        {/* Right Column: Experience (Quest Log) */}
        <div className="lg:col-span-7">
          <GoldenFrame variant="light" className="h-full">
            <h3 className="font-cinzel text-2xl text-gold mb-8 border-b border-neutral-800 pb-4">Quest Log</h3>
            <div className="mt-6">
              {QUEST_LOG.map(quest => (
                <QuestItem key={quest.id} exp={quest} />
              ))}
            </div>

            <div className="mt-16 pt-8 border-t border-neutral-800">
              <h3 className="font-cinzel text-xl text-gold mb-4">Inventory & Equipment</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {['VS Code', 'Figma', 'Git Bash', 'Coffee of Haste', 'Mechanical Keyboard', 'Dual Monitors'].map(item => (
                  <div key={item} className="flex items-center gap-2 text-neutral-400 text-sm font-mono p-2 bg-black/20 border border-neutral-800">
                     <div className="w-1.5 h-1.5 bg-bronze rounded-full" /> {item}
                  </div>
                ))}
              </div>
            </div>
          </GoldenFrame>
        </div>

      </div>
    </section>
  );
};

export default About;