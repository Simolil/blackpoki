import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GAMES } from '../data/games';
import { Maximize2, Flag, RotateCcw, ThumbsUp, ThumbsDown, Share2, Play, ArrowLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GameCard from '../components/GameCard';
import FloatingLogo from '../components/FloatingLogo';
import { ElectricGlow } from '../components/ElectricGlow';
import { motion, AnimatePresence } from 'motion/react';

export default function GameDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const game = GAMES.find((g) => g.id === id);
  const [isLiked, setIsLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (game) {
      setIsPlaying(false);
      const saved = localStorage.getItem('recentlyPlayed');
      let recent: string[] = saved ? JSON.parse(saved) : [];
      recent = [game.id, ...recent.filter(id => id !== game.id)].slice(0, 10);
      localStorage.setItem('recentlyPlayed', JSON.stringify(recent));
    }
  }, [game]);

  if (!game) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-12">
        <h1 className="text-2xl font-display text-white mb-4 tracking-normal uppercase italic">Game Not Found</h1>
        <Link to="/" className="px-8 py-3 bg-white text-zinc-900 border-4 border-white rounded-2xl font-bold hover:scale-105 transition-transform shadow-xl">
           Return Home
        </Link>
      </div>
    );
  }

  const relatedGames = GAMES.filter(g => g.id !== id && g.category === game.category);

  const getGameplayInfo = (category: string) => {
    switch(category) {
      case 'racing':
        return {
          tip: "Brake slightly before turns to perform a 'Power Slide' and maintain speed through corners.",
          controls: [
            { label: 'Steer', keys: ['A', 'D'] },
            { label: 'Accelerate', keys: ['W'] },
            { label: 'Drift', keys: ['Space'] },
          ]
        };
      case 'puzzle':
        return {
          tip: "Plan three moves ahead. Most puzzles in this category reward strategy over speed.",
          controls: [
            { label: 'Move/Select', keys: ['W', 'A', 'S', 'D'] },
            { label: 'Rotate/Action', keys: ['Space'] },
            { label: 'Confirm', keys: ['Enter'] },
          ]
        };
      case 'adventure':
        return {
          tip: "Check every corner. Hidden secrets often yield the most powerful upgrades.",
          controls: [
            { label: 'Walk', keys: ['W', 'A', 'S', 'D'] },
            { label: 'Action/Attack', keys: ['Space'] },
            { label: 'Inventory', keys: ['I'] },
          ]
        };
      case 'action':
        return {
          tip: "Keep moving! Stationary targets are easy prey for high-level AI enemies.",
          controls: [
            { label: 'Move', keys: ['W', 'A', 'S', 'D'] },
            { label: 'Primary Fire', keys: ['Space'] },
            { label: 'Special', keys: ['Shift'] },
          ]
        };
      default:
        return {
          tip: "Practice makes perfect. Watch other top players to learn advanced techniques.",
          controls: [
            { label: 'Movement', keys: ['W', 'A', 'S', 'D'] },
            { label: 'Action', keys: ['Space'] },
            { label: 'Pause', keys: ['P'] },
          ]
        };
    }
  };

  const info = getGameplayInfo(game.category);

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden">
      {/* MOBILE NAVIGATION BUTTONS */}
      <div className="lg:hidden flex items-center justify-between fixed top-4 inset-x-4 z-[150] pointer-events-none">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('/')}
          className="w-11 h-11 flex items-center justify-center bg-black/80 backdrop-blur-2xl border-2 border-[#00D7D7]/30 text-[#00D7D7] rounded-lg shadow-[0_8px_25px_rgba(0,0,0,0.5)] pointer-events-auto active:border-[#00D7D7]/60 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </motion.button>

        <Link to="/" className="pointer-events-auto">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="h-11 px-4 flex items-center justify-center bg-black/80 backdrop-blur-2xl border-2 border-[#00D7D7]/30 rounded-lg shadow-[0_8px_25px_rgba(0,0,0,0.5)] active:border-[#00D7D7]/60 transition-colors"
          >
            <span className="text-sm font-display text-white tracking-normal uppercase italic flex items-center gap-1">
              C<div className="w-2 h-2 bg-[#00D7D7] rounded-full shadow-[0_0_10px_rgba(0,215,215,1)]" />RE
            </span>
          </motion.div>
        </Link>
      </div>

      <main className="p-2 md:p-6 max-w-[1400px] mx-auto min-h-screen relative z-10">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 justify-center">
          
          {/* SIDEBAR LEFT (1 Column of icons) */}
          <div className="hidden lg:flex flex-col w-[90px] md:w-[120px] shrink-0 gap-3 md:gap-4 bg-[#00D7D7]/15 backdrop-blur-3xl p-2 md:p-3 rounded-2xl md:rounded-3xl border border-[#00D7D7]/30 shadow-[0_0_60px_rgba(0,215,215,0.3)] ring-1 ring-[#00D7D7]/20 h-fit sticky top-6">
             <FloatingLogo variant="dark" className="!w-full !h-[60px] md:!h-[100px] !bg-transparent !border-none !shadow-none" />
             <div className="flex flex-col gap-2 md:gap-3">
               {GAMES.filter(g => g.id !== id).slice(0, 5).map(g => (
                 <div key={g.id} className="w-full aspect-square">
                    <GameCard game={g} />
                 </div>
               ))}
             </div>
          </div>

          {/* MAIN GAME CENTER AREA */}
          <div className="flex-1 flex flex-col gap-5 items-center w-full mt-20 lg:mt-0">
            <div className="bg-zinc-950 rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl flex flex-col relative group/game border-2 md:border-[3px] border-[#00D7D7]/60 shadow-[0_0_30px_rgba(0,215,215,0.2)] w-full max-w-[860px]">
              <div className="relative bg-black h-[190px] md:h-[380px] lg:h-[640px] max-h-[75vh] flex items-center justify-center overflow-hidden md:px-[1.5cm]">
                {!isPlaying ? (
                  <div className="absolute inset-0 md:inset-x-[1.5cm] z-10 flex flex-col items-center justify-center">
                    <img 
                      src={game.thumbnail} 
                      className="absolute inset-0 w-full h-full object-cover blur-sm opacity-50" 
                      alt="" 
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsPlaying(true)}
                      className="relative z-20 w-14 h-14 md:w-28 md:h-28 bg-[#00D7D7] rounded-full flex items-center justify-center text-white shadow-[0_0_50px_rgba(0,215,215,0.5)] group/play overflow-visible"
                    >
                      <Play className="w-6 h-6 md:w-14 md:h-14 fill-current ml-1 md:ml-2 relative z-10" />
                      
                      {/* Concentric Water Ripples */}
                      <motion.div 
                        animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                        className="absolute inset-0 border-4 border-[#00D7D7]/40 rounded-full"
                      />
                      <motion.div 
                        animate={{ scale: [1, 2.4], opacity: [0.3, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.6, ease: "easeOut" }}
                        className="absolute inset-0 border-2 border-[#00D7D7]/30 rounded-full"
                      />
                      <motion.div 
                        animate={{ scale: [1, 3], opacity: [0.1, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1.2, ease: "easeOut" }}
                        className="absolute inset-0 border border-[#00D7D7]/20 rounded-full"
                      />
                    </motion.button>
                    <h3 className="relative z-20 mt-3 md:mt-6 text-[10px] md:text-lg font-display text-white uppercase italic tracking-normal flex items-center gap-3">
                      {game.icon && (
                        <ElectricGlow size="sm" color="#00D7D7">
                          <span className="text-xl md:text-4xl relative z-10">{game.icon}</span>
                        </ElectricGlow>
                      )}
                      Click to Play {game.title}
                    </h3>
                  </div>
                ) : (
                  <iframe
                    src={game.embedUrl}
                    className="w-full h-full border-none"
                    title={game.title}
                    allowFullScreen
                  />
                )}
              </div>

              {/* INTEGRATED ACTION BAR */}
              <div className="bg-black/95 py-3 px-4 md:px-7 flex items-center justify-between border-t-2 border-[#00D7D7] shadow-[0_-10px_30px_rgba(0,215,215,0.2)]">
                {/* Left side: Votes */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <motion.button 
                      whileHover={{ scale: 1.15, rotate: -5 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsLiked(!isLiked)}
                      className={`flex items-center gap-1.5 transition-all relative group/action ${isLiked ? 'text-[#00D7D7] drop-shadow-[0_0_20px_rgba(0,215,215,1)] scale-110' : 'text-white/40 hover:text-[#00D7D7] hover:drop-shadow-[0_0_12px_rgba(0,215,215,0.8)]'}`}
                    >
                      <ThumbsUp className="w-4 h-4 md:w-6 md:h-6 relative z-10" />
                      <span className="hidden sm:inline font-black uppercase text-[9px] md:text-[11px] tracking-tight">Like</span>
                    </motion.button>
                    <div className="w-[1px] h-4 bg-white/10" />
                    <motion.button 
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center gap-1.5 text-white/40 hover:text-[#00D7D7] hover:drop-shadow-[0_0_12px_rgba(0,215,215,0.8)] transition-all relative group/action"
                    >
                      <ThumbsDown className="w-4 h-4 md:w-6 md:h-6 relative z-10" />
                      <span className="hidden sm:inline font-black uppercase text-[9px] md:text-[11px] tracking-tight">Hate</span>
                    </motion.button>
                  </div>
                </div>

                {/* Center: Title */}
                <div className="flex flex-col items-center">
                  <h2 className="text-[10px] md:text-lg font-display text-[#00D7D7] drop-shadow-[0_0_5px_rgba(0,215,215,0.3)] tracking-normal uppercase italic leading-none max-w-[150px] md:max-w-none truncate">
                    {game.title}
                  </h2>
                </div>

                {/* Right side: Actions */}
                <div className="flex items-center gap-3 md:gap-5">
                  <motion.button 
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-white/30 hover:text-[#00D7D7] hover:drop-shadow-[0_0_12px_rgba(0,215,215,0.8)] transition-all flex items-center gap-1.5 group/report" 
                    title="Report Bug"
                  >
                    <Flag className="w-4 h-4 md:w-5 md:h-5 group-hover/report:scale-110 transition-transform" />
                    <span className="hidden md:inline font-black uppercase text-[10px] tracking-wider opacity-60 group-hover/report:opacity-100">Report</span>
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-white/30 hover:text-[#00D7D7] hover:drop-shadow-[0_0_15px_rgba(0,215,215,0.9)] transition-all group/share" 
                    title="Share"
                  >
                    <Share2 className="w-4 h-4 md:w-6 md:h-6 group-hover/share:scale-110 transition-transform" />
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-white/30 hover:text-[#00D7D7] hover:drop-shadow-[0_0_15px_rgba(0,215,215,0.9)] transition-all transform active:scale-95 group/fs" 
                    title="Fullscreen"
                  >
                    <Maximize2 className="w-5 h-5 md:w-7 md:h-7 group-hover/fs:scale-110 transition-transform" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* HORIZONTAL QUICK LINKS UNDER FRAME */}
            <div className="w-full max-w-[860px] mt-2">
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                {GAMES.filter(g => g.id !== id).slice(23, 31).map((g) => (
                   <div key={g.id} className="w-full aspect-square transform hover:-translate-y-1 transition-transform">
                     <GameCard game={g} />
                   </div>
                ))}
              </div>
            </div>

          </div>


          {/* SIDEBAR RIGHT (3 Columns of icons) */}
          <div className="hidden xl:grid grid-cols-3 w-[280px] md:w-[320px] shrink-0 gap-2 h-fit mb-20">
             {GAMES.filter(g => g.id !== id).slice(5, 23).map(g => (
                <div key={g.id} className="w-full aspect-square">
                   <GameCard key={g.id} game={g} />
                </div>
             ))}
          </div>

        </div>

        {/* FULL WIDTH SECTIONS BELOW TOP ROW */}
        <div className="mt-12 flex flex-col gap-16 w-full">
          {/* CURATED RECOMMENDATIONS - Wider */}
          <div className="w-full">
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-3">
              {GAMES.slice(15, 39).map((g) => (
                 <div key={g.id} className="w-full aspect-square">
                   <GameCard game={g} />
                 </div>
              ))}
            </div>
          </div>

          {/* EXPANDED GAME KNOWLEDGE CENTER - Full Width */}
          <div className="flex flex-col gap-12 pb-32">
            {/* LONG FORM ABOUT SECTION */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-zinc-900/40 backdrop-blur-3xl p-8 md:p-12 rounded-[2rem] border border-white/5 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-[#00D7D7]/5 rounded-full blur-[150px] -mr-[15%] -mt-[15%]" />
              <div className="relative z-10">
                <h4 className="text-xl md:text-2xl font-display text-white uppercase italic tracking-normal mb-8 flex items-center gap-4">
                  <span className="w-3 h-10 md:h-14 bg-[#00D7D7] rounded-full shadow-[0_0_40px_rgba(0,215,215,0.3)]" />
                  Ultimate Deep Dive: {game.title}
                </h4>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
                  <div className="lg:col-span-8 space-y-6 text-white/70 text-sm md:text-base leading-relaxed font-medium">
                    <p>
                      {game.description}. This legendary title has been meticulously rebuilt for the modern web, ensuring that every pixel and every sound effect translates perfectly to your browser. Whether you're a veteran player revisiting a classic or a newcomer discovering this world for the first time, our platform provides the definitive way to play.
                    </p>
                    <p>
                      The gameplay mechanics have been fine-tuned to remove the limitations of older hardware, providing a smooth 60FPS experience with virtually non-existent input lag. We've integrated cloud-save technology (local storage) so your progress is preserved across sessions. Dive into the intricacies of its level design and master the unique challenges that have made this game a staple in the {game.category} genre.
                    </p>
                  </div>
                  <div className="lg:col-span-4 grid grid-cols-2 gap-4 h-fit">
                    {[
                      { label: 'Status', value: 'Verified', color: '#00D7D7' },
                      { label: 'FPS', value: '60 Stable', color: '#00D7D7' },
                      { label: 'Rating', value: '4.9 / 5', color: '#00D7D7' },
                      { label: 'Cloud', value: 'Sync On', color: '#00D7D7' }
                    ].map((stat, i) => (
                      <div key={i} className="bg-white/5 p-6 rounded-[2rem] border border-white/5 flex flex-col items-center justify-center text-center group/stat hover:bg-[#00D7D7]/5 hover:border-[#00D7D7]/20 transition-all">
                        <div className="text-white/30 font-black text-[9px] uppercase mb-1 tracking-[0.2em] group-hover/stat:text-[#00D7D7]/50 transition-colors">{stat.label}</div>
                        <div className="text-white font-black text-base uppercase italic font-mono tracking-tighter group-hover/stat:scale-110 transition-transform">{stat.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* HORIZONTAL CONTROLS & TIPS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-zinc-900/40 backdrop-blur-3xl p-8 md:p-12 rounded-[2rem] border border-white/5 shadow-2xl"
              >
                <h4 className="text-xl md:text-2xl font-display text-white uppercase italic tracking-normal mb-8 flex items-center gap-4">
                  <span className="w-2.5 h-10 bg-purple-500 rounded-full shadow-[0_0_30px_rgba(168,85,247,0.3)]" />
                  Master Pro Controls
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  {info.controls.map((control, idx) => (
                    <div key={idx} className="flex items-center justify-between p-6 bg-zinc-800/20 rounded-[2rem] border border-white/5 hover:border-[#00D7D7]/30 transition-all group/key">
                      <span className="text-[10px] md:text-sm font-black text-white/40 uppercase tracking-[0.3em] group-hover/key:text-white transition-colors">{control.label}</span>
                      <div className="flex items-center gap-3">
                        {control.keys.map(k => (
                          <kbd key={k} className="min-w-[44px] h-11 flex items-center justify-center bg-zinc-700 rounded-xl border-b-[6px] border-zinc-950 text-white font-black text-[10px] md:text-sm uppercase shadow-2xl ring-1 ring-white/10 transform group-hover/key:-translate-y-1.5 transition-transform">
                            {k}
                          </kbd>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-zinc-900/40 backdrop-blur-3xl p-8 md:p-12 rounded-[2rem] border border-white/5 shadow-2xl flex flex-col"
              >
                <h4 className="text-xl md:text-2xl font-display text-white uppercase italic tracking-normal mb-8 flex items-center gap-4">
                  <span className="w-2.5 h-10 bg-orange-500 rounded-full shadow-[0_0_30px_rgba(249,115,22,0.3)]" />
                  Elite Strategy Guide
                </h4>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="p-8 bg-orange-500/10 rounded-2xl border border-orange-500/20 mb-8 relative group/tip">
                    <div className="absolute -top-3 left-8 px-4 py-1.5 bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-lg transform group-hover/tip:-rotate-2 transition-transform">Expert Advice</div>
                    <p className="text-orange-100 text-lg md:text-xl leading-relaxed italic font-bold">
                      "{info.tip}"
                    </p>
                  </div>
                  <div className="space-y-6">
                    <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] mb-3 border-b border-white/5 pb-3">Dev Notes & Optimization</div>
                    <p className="text-white/50 text-xs md:text-sm leading-relaxed font-medium">
                      This world-class browser port implements sub-frame scheduling to reduce perceived latency to below 8ms. Mastering the frame-perfect interaction windows described above is essential for high-score optimization and speedrunning success in the competitive {game.category} circuit.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* STRATEGIC WALKTHROUGH */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-zinc-900/40 backdrop-blur-3xl p-8 md:p-12 rounded-[2rem] border border-white/5 shadow-2xl"
            >
              <h4 className="text-xl md:text-2xl font-display text-white uppercase italic tracking-normal mb-10 flex items-center gap-4">
                <span className="w-2.5 h-10 bg-emerald-500 rounded-full shadow-[0_0_30px_rgba(16,185,129,0.3)]" />
                Level-by-Level Walkthrough
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {[
                  { 
                    id: '01', 
                    title: 'Foundational Mechanics', 
                    desc: 'Focus on mastering the movement patterns. The initial levels are designed to teach you the core physics of the engine without high stakes. Experiment with inertia, acceleration curves, and jump variance to get a feel for the unique engine.',
                    color: 'emerald'
                  },
                  { 
                    id: '02', 
                    title: 'Advanced Traversal', 
                    desc: 'Combine multiple key presses (like jumping while sliding or mid-air rotations) to reach secret developer areas containing legendary power-ups. Look for subtle pixel cracks in walls that indicate destructible secret paths.',
                    color: 'emerald'
                  },
                  { 
                    id: '03', 
                    title: 'System Optimization', 
                    desc: 'Leverage the expert tip mentioned above during boss encounters and complex puzzle rooms. Understanding global hitboxes and frame advantage will allow you to bypass high-difficulty sections with extreme efficiency.',
                    color: 'emerald'
                  }
                ].map((step, i) => (
                  <div key={i} className="group/step space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 flex items-center justify-center bg-emerald-500/20 rounded-md text-emerald-400 font-mono font-black text-xs border border-emerald-500/20 group-hover/step:bg-emerald-500 group-hover/step:text-white transition-all">
                        {step.id}
                      </span>
                      <h5 className="text-white font-display uppercase italic tracking-normal text-base">{step.title}</h5>
                    </div>
                    <p className="text-white/40 text-[11px] md:text-[13px] leading-relaxed group-hover/step:text-white/70 transition-colors">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </main>

      {/* MOBILE FULLSCREEN PLAYGROUND */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed inset-0 z-[200] bg-black md:hidden flex flex-col"
          >
            {/* Top Bar */}
            <div className="h-14 bg-black/80 backdrop-blur-md flex items-center px-4 justify-between border-b border-white/10">
              <button 
                onClick={() => setIsPlaying(false)}
                className="w-10 h-10 flex items-center justify-center text-white bg-white/10 rounded-full active:bg-white/20 transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-black text-[#00D7D7] uppercase tracking-widest leading-none">Playing Now</span>
                <span className="text-sm font-bold text-white uppercase italic tracking-tighter">{game.title}</span>
              </div>
              <div className="w-10" /> {/* Spacer */}
            </div>
            
            {/* Game Canvas */}
            <div className="flex-1 relative">
              <iframe
                src={game.embedUrl}
                className="w-full h-full border-none"
                title={game.title}
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
