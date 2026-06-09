import React, { useState, useMemo, useEffect } from 'react';
import { GAMES, CATEGORIES } from '../data/games';
import GameCard from '../components/GameCard';
import FloatingLogo from '../components/FloatingLogo';
import CategoryGrid from '../components/CategoryGrid';
import { motion, AnimatePresence } from 'motion/react';
import { useSearch } from '../context/SearchContext';
import { cn } from '../lib/utils';
import { Link, useSearchParams } from 'react-router-dom';

export default function Home() {
  const { searchQuery, setSearchQuery, isSearchOpen, setIsSearchOpen, isAppLoaded } = useSearch();
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('all');
  const [recentlyPlayed, setRecentlyPlayed] = useState<string[]>([]);

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setActiveCategory(categoryParam);
      // Scroll to top when category changes
      window.scrollTo(0, 0);
    }
  }, [searchParams]);

  useEffect(() => {
    const saved = localStorage.getItem('recentlyPlayed');
    if (saved) {
      setRecentlyPlayed(JSON.parse(saved));
    }
  }, []);

  const filteredGames = useMemo(() => {
    return GAMES.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           game.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'all' || game.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [activeCategory, searchQuery]);

  const recentGamesData = useMemo(() => {
    return recentlyPlayed
      .map(id => GAMES.find(g => g.id === id))
      .filter((g): g is typeof GAMES[0] => !!g);
  }, [recentlyPlayed]);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <main className="p-2 md:p-3 max-w-[2400px] mx-auto">
        <AnimatePresence mode="wait">
          {isAppLoaded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-1 md:gap-1.5 grid-flow-dense">
                {/* LOGO TILE (1x1) */}
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 140,
                    damping: 12,
                    delay: 0.05
                  }}
                  className="col-span-1 row-span-1 bg-[#00D7D7]/15 backdrop-blur-3xl rounded-xl md:rounded-2xl border border-[#00D7D7]/20 shadow-[0_0_40px_rgba(0,215,215,0.2)] ring-1 ring-[#00D7D7]/10 p-1 md:p-1.5 flex items-center justify-center"
                >
                   <FloatingLogo variant="dark" className="!w-full !h-full !bg-transparent !border-none !shadow-none" />
                </motion.div>

                {/* DENSE ICON GRID */}
                {filteredGames.slice(0, 72).map((game, index) => {
                  // Create a more varied distribution of big tiles
                  const bigIndices = [1, 5, 8, 14, 19, 25, 32, 40, 48, 55, 63];
                  const isBig = bigIndices.includes(index);
                  
                  return (
                    <GameCard key={game.id} game={game} isBig={isBig} index={index} />
                  );
                })}
              </div>

              {/* Categories Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="max-w-[1300px] mx-auto"
              >
                <CategoryGrid />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
