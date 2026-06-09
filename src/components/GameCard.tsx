import React from 'react';
import { Star, Users, Gamepad2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Game } from '../types';
import { Link } from 'react-router-dom';
import { ElectricGlow } from './ElectricGlow';

import { cn } from '../lib/utils';

interface GameCardProps {
  game: Game;
  isBig?: boolean;
  index?: number;
  key?: React.Key;
}

export default function GameCard({ game, isBig, index = 0 }: GameCardProps) {
  // Map index into a grid model (using an 8-col grid pattern to support organic layout logic)
  const cols = 8;
  const row = Math.floor(index / cols);
  const col = index % cols;

  // "One up, one down" vertical checkerboard alternation
  const isUp = (row + col) % 2 === 0;
  const initialY = isUp ? -40 : 40;

  // "All around" radial layout propagating from the center point
  const centerRow = 4.5;
  const centerCol = 3.5;
  const dx = col - centerCol;
  const dy = row - centerRow;
  const dist = Math.sqrt(dx * dx + dy * dy);

  // Group cards into sequential wave steps for slow, majestic step-by-step proliferation
  const waveStep = Math.floor(dist);

  // "One by two or two by one" staggering patterns to group popups in dynamic sizes
  const isEvenWave = waveStep % 2 === 0;
  const intraWaveOffset = isEvenWave
    ? ((col + row) % 3 === 0 ? 0.08 : 0.22)
    : ((col + row) % 3 === 1 ? 0.16 : 0.35);

  // Total calculated delay makes the load sequence slow, rich, and extremely tactile
  const delay = waveStep * 0.45 + intraWaveOffset;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: initialY }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 90, // Slower, highly premium gaming look
        damping: 14,
        delay: delay,
      }}
      whileHover={{ y: -5, scale: 1.05, transition: { delay: 0 } }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "group h-full relative",
        isBig ? "col-span-2 row-span-2" : "col-span-1 row-span-1"
      )}
    >
      {/* Water Ripple Background effect for hover */}
      <div className="absolute inset-0 z-0 overflow-hidden rounded-xl md:rounded-2xl pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0, 0.2, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-x-[-20%] inset-y-[-20%] bg-[#00D7D7]/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"
        />
        <motion.div
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0, 0.15, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 0.5,
            ease: "easeInOut"
          }}
          className="absolute inset-x-[-30%] inset-y-[-30%] border-[2px] border-[#00D7D7]/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </div>

      <Link to={`/game/${game.id}`} title={game.title} className="block h-full relative z-10">
        <div className="relative h-full aspect-square rounded-xl md:rounded-2xl overflow-hidden bg-white/10 border border-white/10 group-hover:border-[#00D7D7]/40 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <img
            src={game.thumbnail}
            alt={game.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Subtle Hover Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 md:p-5">
             <div className="flex items-center gap-2">
                {game.icon && (
                  <ElectricGlow size="sm" color="#00D7D7">
                    <span className="text-lg md:text-xl relative z-10">{game.icon}</span>
                  </ElectricGlow>
                )}
                <span className="text-white text-[10px] md:text-xs font-black uppercase tracking-tight line-clamp-1">{game.title}</span>
             </div>
          </div>

          {/* Quick Play Icon */}
          <div className="absolute top-2 right-2 md:top-4 md:right-4 p-2 md:p-3 bg-white shadow-xl rounded-xl md:rounded-2xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
             <Gamepad2 className="w-3 h-3 md:w-5 md:h-5 text-violet-600" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
