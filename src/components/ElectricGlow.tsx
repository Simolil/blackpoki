import React from 'react';
import { motion } from 'motion/react';

interface ElectricGlowProps {
  children: React.ReactNode;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ElectricGlow: React.FC<ElectricGlowProps> = ({ 
  children, 
  color = '#00D7D7', 
  size = 'md',
  className = ''
}) => {
  const glowSizes = {
    sm: 'blur-md',
    md: 'blur-xl',
    lg: 'blur-2xl'
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Dynamic Background Glows */}
      <motion.div
        className={`absolute inset-0 rounded-full ${glowSizes[size]}`}
        style={{ backgroundColor: color }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* "Lightning" Rays */}
      <motion.div
        className="absolute inset-0 opacity-40"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-full h-[1px] -translate-x-1/2 -translate-y-1/2"
            style={{ 
              background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
              transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
              boxShadow: `0 0 10px ${color}`
            }}
          />
        ))}
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};
