import React from 'react';
import { Search, Gamepad2, Settings, User, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';

export default function Navbar() {
  const { searchQuery, setSearchQuery } = useSearch();

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-black/40 backdrop-blur-xl border-b border-white/5">
      <div className="flex items-center gap-8 flex-1">
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <div className="p-2 bg-indigo-600 rounded-lg group-hover:rotate-12 transition-transform duration-300">
            <Gamepad2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-display tracking-normal text-white uppercase italic">
            Black<span className="text-[#00D7D7] drop-shadow-[0_0_10px_rgba(0,215,215,0.5)]">Poki</span>
          </span>
        </Link>

        <div className="hidden md:flex relative flex-1 max-w-xl ml-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Search for games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-6 py-3 bg-white/5 border border-transparent rounded-xl focus:bg-white/10 focus:border-indigo-500/30 outline-none transition-all placeholder:text-gray-500 text-sm font-semibold text-white"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2.5 text-gray-500 hover:bg-white/5 rounded-full transition-colors relative md:hidden">
          <Search className="w-5 h-5" />
        </button>
        <button className="p-2.5 text-gray-400 hover:bg-white/5 rounded-full transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-indigo-500 rounded-full border-2 border-black"></span>
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-sm cursor-pointer hover:scale-105 transition-transform" />
      </div>
    </nav>
  );
}
