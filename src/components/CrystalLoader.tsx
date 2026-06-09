import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Gamepad2 } from 'lucide-react';

interface CrystalLoaderProps {
  onComplete: () => void;
}

const STEPS = [
  'SYNCHRONIZING PRISM CHANNELS...',
  'RESONATING NEON LATTICE...',
  'STABILIZING QUANTUM FLOW...',
  'ETCHING STRUCTURAL FACETS...',
  'HARMONIZING ELECTROMAGNETIC CORE...',
  'IGNITING PRISM ENGINE...',
  'CRYSTALLIZATION COMPLETE!'
];

export default function CrystalLoader({ onComplete }: CrystalLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Progress increment timer
    const duration = 2200; // 2.2 seconds total duration
    const intervalTime = 30;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setIsDone(true);
          // Wait a bit at 100% for visual satisfaction, then trigger complete
          setTimeout(() => {
            onComplete();
          }, 400);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Update status message based on progress
  useEffect(() => {
    const nextIndex = Math.min(
      Math.floor((progress / 100) * STEPS.length),
      STEPS.length - 1
    );
    if (nextIndex !== statusIndex) {
      setStatusIndex(nextIndex);
    }
  }, [progress, statusIndex]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#02040a]/90 backdrop-blur-md overflow-hidden select-none"
    >
      {/* Absolute floating geometric designs in background */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00D7D7]/40 to-transparent shadow-[0_0_15px_rgba(0,215,215,0.4)]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent shadow-[0_0_15px_rgba(139,92,246,0.4)]" />

      {/* Futuristic frame details */}
      <div className="absolute inset-6 border border-white/5 pointer-events-none rounded-2xl">
        <div className="absolute top-2 left-4 font-mono text-[9px] text-white/30 uppercase tracking-[0.3em]">
          CORE CLIENT v2.4.9 — INITIALIZING
        </div>
        <div className="absolute bottom-2 right-4 font-mono text-[9px] text-[#00D7D7]/50 tracking-[0.2em]">
          SYS.OK // CYAN_RESONATOR
        </div>
      </div>

      {/* Main interactive center core */}
      <div className="relative flex flex-col items-center justify-center max-w-md px-6 text-center">
        
        {/* Animated Crystalline Geometry Structure */}
        <div className="relative w-44 h-44 mb-8 flex items-center justify-center">
          
          {/* External Rotating Halo */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 border border-dashed border-[#00D7D7]/20 rounded-full"
          />

          {/* Inner Fast Counter-Rotating Octagon Ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="absolute w-36 h-36 border border-[#8B5CF6]/30 rounded-full"
            style={{
              clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
            }}
          />

          {/* 3D-Like Kinetic Spinning Dual-Cone Core Crystal */}
          <div className="relative w-24 h-28 flex items-center justify-center">
            
            {/* Front Shard (Cyan Accent) */}
            <motion.div
              animate={{ 
                rotateY: [0, 180, 360],
                scale: [0.95, 1.05, 0.95],
                filter: ['drop-shadow(0 0 10px rgba(0,215,215,0.3))', 'drop-shadow(0 0 25px rgba(0,215,215,0.7))', 'drop-shadow(0 0 10px rgba(0,215,215,0.3))']
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 bg-gradient-to-tb from-[#00D7D7]/40 via-[#00D7D7]/10 to-transparent border border-[#00D7D7]/60"
              style={{
                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                transformStyle: 'preserve-3d',
              }}
            />

            {/* Inner Core Seed (Bright Hot Magenta/Violet Core) */}
            <motion.div
              animate={{ 
                scale: [0.8, 1.2, 0.8],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute w-8 h-12 bg-gradient-to-b from-[#8B5CF6] to-pink-500 rounded-full blur-[4px] shadow-[0_0_20px_rgba(139,92,246,0.8)]"
            />

            {/* Cross Ring Lattice Lines */}
            <motion.div
              animate={{ rotateX: [0, 180, 360], rotate: 45 }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-x-[-15px] h-px bg-gradient-to-r from-transparent via-[#00D7D7] to-transparent opacity-60"
            />
          </div>

          {/* Sparkle Nodes circling around */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-[#00D7D7] rounded-full shadow-[0_0_8px_rgba(0,215,215,1)]"
              animate={{
                x: [
                  Math.cos((i * Math.PI) / 2) * 60,
                  Math.cos((i * Math.PI) / 2 + Math.PI) * 60,
                  Math.cos((i * Math.PI) / 2) * 60,
                ],
                y: [
                  Math.sin((i * Math.PI) / 2) * 60,
                  Math.sin((i * Math.PI) / 2 + Math.PI) * 60,
                  Math.sin((i * Math.PI) / 2) * 60,
                ],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Brand Display header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-display font-medium tracking-[0.25em] text-white uppercase italic flex items-center justify-center gap-1.5">
            B L A C K <span className="text-[#00D7D7] drop-shadow-[0_0_12px_rgba(0,215,215,0.6)]">P O K I</span>
          </h2>
          <div className="text-[10px] font-mono tracking-[0.4em] text-white/40 uppercase mt-1">
            CRYSTALLINE ARCADE SYSTEM
          </div>
        </motion.div>

        {/* Dynamic status messaging */}
        <div className="h-6 mb-3">
          <AnimatePresence mode="wait">
            <motion.p
              key={statusIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="font-mono text-xs text-[#00D7D7] font-semibold tracking-wider uppercase"
            >
              {STEPS[statusIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* High-Fidelity Crystal Progress Bar */}
        <div className="w-64 max-w-[80vw] h-[3px] bg-white/5 rounded-full overflow-hidden relative border border-white/5 shadow-inner">
          {/* Glowing blue progress fill */}
          <motion.div
            className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-violet-500 via-[#00D7D7] to-[#00D7D7] shadow-[0_0_12px_rgba(0,215,215,1)]"
            style={{ width: `${progress}%` }}
          />
          
          {/* Laser sparks core */}
          <motion.div
            className="absolute top-0 bottom-0 w-4 bg-white filter blur-[1px] shadow-[0_0_10px_#fff]"
            style={{ left: `calc(${progress}% - 8px)` }}
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 0.2, repeat: Infinity }}
          />
        </div>

        {/* Percent readout */}
        <div className="font-mono text-sm text-white/50 tracking-widest mt-3 uppercase">
          {Math.floor(progress)}% <span className="text-white/20">READY</span>
        </div>
      </div>
    </motion.div>
  );
}
