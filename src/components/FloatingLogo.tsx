import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { User, Search } from 'lucide-react';
import { useSearch } from '../context/SearchContext';
import RippleButton from './RippleButton';

import { ElectricGlow } from './ElectricGlow';

export default function FloatingLogo({ className = "", variant = "light" }: { className?: string, variant?: "light" | "dark" }) {
  const { setIsSearchOpen } = useSearch();

  const isDark = variant === "dark";
  const rippleColor = isDark ? "rgba(0, 215, 215, 0.4)" : "rgba(0, 215, 215, 0.2)";

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`w-[110px] h-[110px] md:w-[140px] md:h-[140px] ${isDark ? 'bg-zinc-950 border-zinc-800 shadow-[0_0_25px_rgba(0,215,215,0.25)]' : 'bg-white border-white shadow-[0_15px_40px_rgba(0,0,0,0.15)]'} rounded-xl md:rounded-2xl overflow-hidden flex flex-col border-4 z-[100] transition-all duration-300 group ${className}`}
    >
      {/* Top Logo Part */}
      <div className={`flex-[1.2] relative overflow-hidden ${isDark ? 'hover:bg-white/5' : 'hover:bg-zinc-50'} transition-colors`}>
        <Link to="/" className="absolute inset-0 flex items-center justify-center p-2 z-20">
          <div className="flex flex-col items-center">
            <span className={`text-lg md:text-xl font-display ${isDark ? 'text-white drop-shadow-[0_0_8px_rgba(0,215,215,0.4)]' : 'text-[#222]'} tracking-normal uppercase italic flex items-center gap-1 group-hover:text-violet-400 transition-colors`}>
              C<ElectricGlow size="sm" color="#00D7D7">
                <span className="relative inline-block w-4 h-4 md:w-6 md:h-6 bg-[#00D7D7] rounded-full">
                  <span className="absolute inset-0 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full opacity-60" />
                  </span>
                </span>
              </ElectricGlow>RE
            </span>
          </div>
        </Link>
        {/* Simple hover pulse for the logo part since it's a link */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0, 0.1, 0]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 bg-[#00D7D7] pointer-events-none"
        />
      </div>
      
      {/* Bottom Buttons Part */}
      <div className={`flex-1 flex items-stretch ${isDark ? 'bg-black/20' : ''}`}>
        <RippleButton 
          color={rippleColor}
          className="flex-1"
        >
          <User className={`w-4 md:w-5 h-4 md:h-5 text-[#00D7D7] ${isDark ? 'drop-shadow-[0_0_5px_rgba(0,215,215,0.5)]' : ''} group-hover/btn:scale-110 transition-transform`} />
        </RippleButton>
        <RippleButton 
          color={rippleColor}
          onClick={() => setIsSearchOpen(true)}
          className="flex-1"
        >
          <Search className={`w-4 md:w-5 h-4 md:h-5 text-[#00D7D7] ${isDark ? 'drop-shadow-[0_0_5px_rgba(0,215,215,0.5)]' : ''} group-hover/btn:scale-110 transition-transform`} />
        </RippleButton>
      </div>
    </motion.div>
  );
}
