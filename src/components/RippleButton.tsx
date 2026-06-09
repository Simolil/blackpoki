import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface RippleProps {
  color?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function RippleButton({ 
  color = "rgba(0, 215, 215, 0.3)", 
  className = "", 
  children,
  onClick 
}: RippleProps) {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number; size: number }[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  const addRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = {
      id: Date.now(),
      x,
      y,
      size,
    };

    setRipples((prev) => [...prev, newRipple]);
    if (onClick) onClick(e);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (ripples.length > 0) {
        setRipples((prev) => prev.slice(1));
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, [ripples]);

  return (
    <button
      className={`relative overflow-hidden group/ripple ${className}`}
      onClick={addRipple}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: [0.8, 1.1, 0.95, 1.05, 1],
              opacity: [0, 0.15, 0.1, 0.12, 0.1] 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 pointer-events-none"
            style={{ 
              background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
            }}
          />
        )}
      </AnimatePresence>

      <div className="absolute inset-0 pointer-events-none">
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute rounded-full"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 20,
              height: 20,
              marginLeft: -10,
              marginTop: -10,
              backgroundColor: color,
              boxShadow: `0 0 20px ${color}`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {children}
      </div>
    </button>
  );
}
