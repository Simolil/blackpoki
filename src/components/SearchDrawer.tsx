import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSearch } from '../context/SearchContext';
import { GAMES, CATEGORIES } from '../data/games';
import { Search, User, ChevronLeft, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SearchDrawer() {
  const { searchQuery, setSearchQuery, isSearchOpen, setIsSearchOpen } = useSearch();

  const recentlyPlayed = useMemo(() => {
    const saved = localStorage.getItem('recentlyPlayed');
    return saved ? JSON.parse(saved) : [];
  }, [isSearchOpen]);

  const recentGamesData = useMemo(() => {
    return recentlyPlayed
      .map((id: string) => GAMES.find(g => g.id === id))
      .filter((g: any): g is typeof GAMES[0] => !!g);
  }, [recentlyPlayed]);

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSearchOpen(false)}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md"
          />
          
          {/* Sidebar Content */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 left-0 bottom-0 z-[101] w-full max-w-2xl bg-[#0a0a0a] border-r border-white/5 shadow-2xl flex flex-col"
          >
            <div className="p-4 md:p-12 flex-1 overflow-y-auto no-scrollbar relative">
              {/* Close Button on Right Edge */}
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="absolute top-1/2 -right-6 -translate-y-1/2 w-12 h-12 bg-zinc-900 border border-white/10 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-10"
              >
                <ChevronLeft className="w-7 h-7" />
              </button>

              {/* Search Bar Container */}
              <div className="relative mb-10 pt-2">
                <div className="flex items-center bg-zinc-900 rounded-2xl shadow-sm p-1 pr-6 border-2 border-white/5 focus-within:border-[#00D7D7]/50 transition-all">
                  <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center flex-shrink-0 ml-1">
                    <User className="w-6 h-6 text-[#00D7D7]" />
                  </div>
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search games..."
                    className="flex-1 bg-transparent px-4 h-14 text-xl font-bold text-white placeholder:text-zinc-700 outline-none"
                  />
                  <Search className="w-7 h-7 text-zinc-800" />
                </div>
              </div>

              {/* Recently Played Section */}
              {recentGamesData.length > 0 && (
                <div className="mb-10">
                  <h3 className="text-lg font-display text-white uppercase italic tracking-normal mb-6">Recently played</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                    {recentGamesData.map((game) => (
                      <Link 
                        key={game.id} 
                        to={`/game/${game.id}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="relative aspect-square rounded-xl overflow-hidden shadow-xl group border-4 border-zinc-800 hover:border-[#00D7D7] transition-all"
                      >
                        <img src={game.thumbnail} className="w-full h-full object-cover" alt="" />
                        <div className="absolute top-1.5 left-1.5 p-1 bg-black/80 rounded-lg shadow-sm border border-white/10">
                          <RotateCcw className="w-4 h-4 text-[#00D7D7]" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular this week / Top Categories */}
              <div>
                <h3 className="text-lg font-display text-white uppercase italic tracking-normal mb-6">Popular this week</h3>
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
                  {GAMES.slice(0, 30).map((game) => (
                    <Link 
                      key={game.id} 
                      to={`/game/${game.id}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="aspect-square rounded-xl overflow-hidden shadow-lg hover:scale-110 transition-all border-4 border-zinc-800 hover:border-[#00D7D7]"
                    >
                      <img src={game.thumbnail} className="w-full h-full object-cover" alt="" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
