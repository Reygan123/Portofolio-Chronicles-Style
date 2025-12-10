import React, { useState } from 'react';
import GoldenFrame from '../components/ui/GoldenFrame';
import Button from '../components/ui/Button';
import { Mail, MapPin, Send, Feather } from 'lucide-react';
import { playSound } from '../utils/audio';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      playSound('success');
      setFormState({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section className="min-h-screen pt-32 md:pt-36 pb-20 px-4 flex items-center justify-center">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        
        {/* Contact Info */}
        <div className="space-y-8 flex flex-col justify-center order-2 lg:order-1">
          <div>
            <h2 className="font-cinzel text-3xl md:text-4xl text-gold mb-4">The Guild Hall</h2>
            <p className="font-sans text-neutral-400 leading-relaxed text-sm md:text-base mb-6">
              Seek to form an alliance? Post a bounty for a complex artifact? 
              Fill out the parchment below to dispatch a messenger raven directly to my fortress.
            </p>
            <div className="p-4 border border-gold/20 bg-gold/5 rounded">
               <h4 className="font-cinzel text-gold text-sm mb-1">Guild Status:</h4>
               <p className="font-mono text-green-500 text-xs flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                 Open for new Contracts
               </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 text-neutral-300 group cursor-pointer hover:text-gold transition-colors">
              <div className="w-10 h-10 bg-gold/10 border border-gold/30 flex items-center justify-center rotate-45 flex-shrink-0 group-hover:rotate-90 transition-transform duration-500">
                <Mail size={18} className="-rotate-45 text-gold" />
              </div>
              <span className="font-mono text-xs md:text-sm break-all">raven@chronicles.dev</span>
            </div>
            <div className="flex items-center gap-4 text-neutral-300">
              <div className="w-10 h-10 bg-gold/10 border border-gold/30 flex items-center justify-center rotate-45 flex-shrink-0">
                <MapPin size={18} className="-rotate-45 text-gold" />
              </div>
              <span className="font-mono text-xs md:text-sm">Winterfell, The North</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="order-1 lg:order-2">
          <GoldenFrame>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-cinzel text-xs text-gold uppercase tracking-widest">Your Title / Guild Name</label>
                  <input 
                    type="text" 
                    value={formState.name}
                    onChange={e => setFormState({...formState, name: e.target.value})}
                    required
                    placeholder="Sir Aurther of Camelot"
                    className="w-full bg-black/30 border-b border-neutral-700 p-3 text-neutral-200 focus:outline-none focus:border-gold transition-colors placeholder:text-neutral-700 font-sans text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-cinzel text-xs text-gold uppercase tracking-widest">Scroll Delivery Address</label>
                  <input 
                    type="email" 
                    value={formState.email}
                    onChange={e => setFormState({...formState, email: e.target.value})}
                    required
                    placeholder="messenger@realm.com"
                    className="w-full bg-black/30 border-b border-neutral-700 p-3 text-neutral-200 focus:outline-none focus:border-gold transition-colors placeholder:text-neutral-700 font-sans text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-cinzel text-xs text-gold uppercase tracking-widest">Nature of Inquiry</label>
                <input 
                  type="text" 
                  value={formState.subject}
                  onChange={e => setFormState({...formState, subject: e.target.value})}
                  required
                  placeholder="Regarding the Dragon Slaying App..."
                  className="w-full bg-black/30 border-b border-neutral-700 p-3 text-neutral-200 focus:outline-none focus:border-gold transition-colors placeholder:text-neutral-700 font-sans text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="font-cinzel text-xs text-gold uppercase tracking-widest">The Terms of the Pact</label>
                <textarea 
                  rows={5}
                  value={formState.message}
                  onChange={e => setFormState({...formState, message: e.target.value})}
                  required
                  placeholder="Outline your request here..."
                  className="w-full bg-black/30 border-b border-neutral-700 p-3 text-neutral-200 focus:outline-none focus:border-gold transition-colors placeholder:text-neutral-700 font-sans resize-none text-sm"
                />
              </div>

              <div className="pt-4">
                <Button 
                  label={status === 'sending' ? 'Summoning Raven...' : status === 'sent' ? 'Scroll Dispatched' : 'Seal The Pact'}
                  type="submit"
                  disabled={status !== 'idle'}
                  icon={status === 'idle' ? <Feather size={16} /> : <Send size={16} />}
                  className="w-full"
                />
              </div>
            </form>
          </GoldenFrame>
        </div>
      </div>
    </section>
  );
};

export default Contact;