import React from 'react';
import { motion } from 'motion/react';

export default function CrystalBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#02040a]">
      {/* Crystalline Lattice Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0 L100 100 M100 0 L0 100 M50 0 L50 100 M0 50 L100 50' stroke='%2300D7D7' stroke-opacity='0.2' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      {/* Floating Dark Crystal Shards with Neon Edges */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute backdrop-blur-[1px]"
            style={{
              width: `${150 + i * 80}px`,
              height: `${200 + i * 60}px`,
              left: `${(i * 13) % 90}%`,
              top: `${(i * 31) % 90}%`,
              background: 'linear-gradient(135deg, rgba(0, 215, 215, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
              border: '0.5px solid rgba(0, 215, 215, 0.15)',
              clipPath: i % 2 === 0 
                ? 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' 
                : 'polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)',
              boxShadow: 'inset 0 0 20px rgba(0, 215, 215, 0.05)',
            }}
            animate={{
              rotate: [i * 45, i * 45 + 360],
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 25 + i * 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Electric Violet Light Leaks */}
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[70%] bg-violet-600/10 rounded-full blur-[180px] animate-pulse" />
      <div className="absolute bottom-[-15%] left-[-10%] w-[50%] h-[60%] bg-indigo-600/10 rounded-full blur-[160px]" />
      <div className="absolute top-[20%] left-[10%] w-[30%] h-[40%] bg-[#00D7D7]/5 rounded-full blur-[140px]" />

      {/* Crystalline SVG Elements */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="neon-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id="neon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00D7D7" stopOpacity="0" />
            <stop offset="50%" stopColor="#00D7D7" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#00D7D7" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Large Scale Geometric Arcs/Lines */}
        <g stroke="url(#neon-gradient)" strokeWidth="0.5" fill="none" filter="url(#neon-glow)" opacity="0.4">
          <path d="M-10% 20% L110% 80%" />
          <path d="M110% 20% L-10% 80%" />
          <path d="M50% -10% L50% 110%" />
          <circle cx="50%" cy="50%" r="40%" strokeOpacity="0.2" />
        </g>

        {/* Shimmering Particle Nodes */}
        {[...Array(20)].map((_, i) => (
          <circle
            key={i}
            cx={`${(i * 7) % 100}%`}
            cy={`${(i * 13) % 100}%`}
            r="1"
            fill="#00D7D7"
            filter="url(#neon-glow)"
          >
            <animate
              attributeName="opacity"
              values="0;1;0"
              dur={`${2 + (i % 3)}s`}
              repeatCount="indefinite"
              begin={`${i * 0.2}s`}
            />
          </circle>
        ))}
      </svg>
      
      {/* Noise Grain for Texture */}
      <div 
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
