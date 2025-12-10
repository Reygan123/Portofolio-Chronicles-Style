import React, { useState } from 'react';
import GoldenFrame from '../components/ui/GoldenFrame';
import Button from '../components/ui/Button';
import { Mail, MapPin, Send, Twitter, Linkedin, Github } from 'lucide-react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate API call
    setTimeout(() => {
      setStatus('sent');
      setFormState({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section className="min-h-screen pt-28 pb-20 px-4 flex items-center justify-center">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Contact Info */}
        <div className="space-y-8 flex flex-col justify-center order-2 lg:order-1">
          <div>
            <h2 className="font-cinzel text-3xl md:text-4xl text-gold mb-4">Dispatch a Raven</h2>
            <p className="font-sans text-neutral-400 leading-relaxed text-sm md:text-base">
              Have a quest for me? Or perhaps you wish to discuss the arcane arts of web development? 
              Fill out the parchment, and my owl shall deliver your message swiftly.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 text-neutral-300">
              <div className="w-10 h-10 bg-gold/10 border border-gold/30 flex items-center justify-center rotate-45 flex-shrink-0">
                <Mail size={18} className="-rotate-45 text-gold" />
              </div>
              <span className="font-mono text-sm break-all">raven@chronicles.dev</span>
            </div>
            <div className="flex items-center gap-4 text-neutral-300">
              <div className="w-10 h-10 bg-gold/10 border border-gold/30 flex items-center justify-center rotate-45 flex-shrink-0">
                <MapPin size={18} className="-rotate-45 text-gold" />
              </div>
              <span className="font-mono text-sm">Winterfell, The North</span>
            </div>
          </div>

          <div className="flex gap-4 pt-8 border-t border-neutral-800">
             <a href="#" className="w-12 h-12 flex items-center justify-center border border-neutral-700 text-neutral-500 hover:text-gold hover:border-gold transition-all duration-300">
               <Github size={20} />
             </a>
             <a href="#" className="w-12 h-12 flex items-center justify-center border border-neutral-700 text-neutral-500 hover:text-gold hover:border-gold transition-all duration-300">
               <Linkedin size={20} />
             </a>
             <a href="#" className="w-12 h-12 flex items-center justify-center border border-neutral-700 text-neutral-500 hover:text-gold hover:border-gold transition-all duration-300">
               <Twitter size={20} />
             </a>
          </div>
        </div>

        {/* Form */}
        <div className="order-1 lg:order-2">
          <GoldenFrame>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-cinzel text-xs text-gold uppercase tracking-widest">Identify Yourself</label>
                  <input 
                    type="text" 
                    value={formState.name}
                    onChange={e => setFormState({...formState, name: e.target.value})}
                    required
                    placeholder="Your Name"
                    className="w-full bg-black/30 border-b border-neutral-700 p-3 text-neutral-200 focus:outline-none focus:border-gold transition-colors placeholder:text-neutral-700 font-sans"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-cinzel text-xs text-gold uppercase tracking-widest">Electronic Address</label>
                  <input 
                    type="email" 
                    value={formState.email}
                    onChange={e => setFormState({...formState, email: e.target.value})}
                    required
                    placeholder="email@realm.com"
                    className="w-full bg-black/30 border-b border-neutral-700 p-3 text-neutral-200 focus:outline-none focus:border-gold transition-colors placeholder:text-neutral-700 font-sans"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-cinzel text-xs text-gold uppercase tracking-widest">Subject Matter</label>
                <input 
                  type="text" 
                  value={formState.subject}
                  onChange={e => setFormState({...formState, subject: e.target.value})}
                  required
                  placeholder="Regarding a new quest..."
                  className="w-full bg-black/30 border-b border-neutral-700 p-3 text-neutral-200 focus:outline-none focus:border-gold transition-colors placeholder:text-neutral-700 font-sans"
                />
              </div>

              <div className="space-y-2">
                <label className="font-cinzel text-xs text-gold uppercase tracking-widest">The Message</label>
                <textarea 
                  rows={5}
                  value={formState.message}
                  onChange={e => setFormState({...formState, message: e.target.value})}
                  required
                  placeholder="Write your missive here..."
                  className="w-full bg-black/30 border-b border-neutral-700 p-3 text-neutral-200 focus:outline-none focus:border-gold transition-colors placeholder:text-neutral-700 font-sans resize-none"
                />
              </div>

              <div className="pt-4">
                <Button 
                  label={status === 'sending' ? 'Dispatching...' : status === 'sent' ? 'Message Sent' : 'Send Message'}
                  type="submit"
                  disabled={status !== 'idle'}
                  icon={<Send size={16} />}
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