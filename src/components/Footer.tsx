import React from 'react';
import { Instagram, Youtube, Twitter, Globe, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ElectricGlow } from './ElectricGlow';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black/40 backdrop-blur-md border-t border-white/5 pt-12 pb-8 mt-12 relative z-10 w-full overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-[#00D7D7]/30 to-transparent" />
      
      <div className="max-w-[1300px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-12">
          
          {/* Brand & Social Section */}
          <div className="flex flex-col gap-6 max-w-sm">
            <Link to="/" className="flex items-center gap-2 group">
              <span className="text-2xl font-display text-white tracking-normal uppercase italic flex items-center gap-1">
                C<ElectricGlow size="sm" color="#00D7D7">
                  <span className="relative inline-block w-6 h-6 bg-[#00D7D7] rounded-full shadow-[0_0_15px_rgba(0,215,215,0.5)]" />
                </ElectricGlow>RE
              </span>
            </Link>
            <p className="text-zinc-500 text-xs font-bold leading-relaxed uppercase tracking-wider">
              The next generation of web gaming. Powered by performance, built for the community.
            </p>
            
            <div className="flex items-center gap-3">
              {[
                { icon: Youtube, href: "#", color: "hover:text-red-500" },
                { icon: Instagram, href: "#", color: "hover:text-pink-500" },
                { icon: Twitter, href: "#", color: "hover:text-[#00D7D7]" }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  className={`w-9 h-9 flex items-center justify-center bg-zinc-900 text-zinc-400 rounded-lg border border-white/5 transition-all duration-300 ${social.color} hover:border-[#00D7D7]/30 hover:shadow-[0_0_10px_rgba(0,215,215,0.1)]`}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Minimalist Links Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-16 gap-y-8">
            <div>
              <h4 className="text-[10px] font-display text-[#00D7D7] uppercase tracking-[0.2em] mb-4">Network</h4>
              <ul className="flex flex-col gap-2">
                {['Direct Arcades', '.io Network', '2 Player Games', 'Puzzle Hub'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-zinc-400 hover:text-white text-[11px] font-bold uppercase tracking-tight transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-display text-[#00D7D7] uppercase tracking-[0.2em] mb-4">Studio</h4>
              <ul className="flex flex-col gap-2">
                {['For Developers', 'CORE Kids', 'Careers', 'Advertisers'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-zinc-400 hover:text-white text-[11px] font-bold uppercase tracking-tight transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden sm:block">
              <h4 className="text-[10px] font-display text-[#00D7D7] uppercase tracking-[0.2em] mb-4">Support</h4>
              <ul className="flex flex-col gap-2">
                {['Center', 'Contact', 'Privacy', 'Terms'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-zinc-400 hover:text-white text-[11px] font-bold uppercase tracking-tight transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-950 border border-white/5 rounded-lg">
            <Globe className="w-3 h-3 text-[#00D7D7]" />
            <span className="text-[10px] font-black text-white tracking-widest uppercase">Global / EN</span>
            <ChevronDown className="w-3 h-3 text-zinc-600" />
          </div>

          <div className="flex flex-col md:items-end gap-2">
            <p className="text-zinc-600 text-[9px] uppercase font-black tracking-[0.3em]">
              © {currentYear} CORE ENTERTAINMENT
            </p>
            <div className="flex items-center gap-4">
              <span className="w-1.5 h-1.5 bg-[#00D7D7] rounded-full animate-pulse shadow-[0_0_8px_#00D7D7]" />
              <span className="text-zinc-500 text-[9px] uppercase font-bold tracking-widest">Servers Operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
