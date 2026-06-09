import React from 'react';
import { motion } from 'motion/react';
import { CATEGORIES } from '../data/games';
import { Link } from 'react-router-dom';

export default function CategoryGrid() {
  // Exclude 'all' from the grid as it's usually represented differently
  const displayCategories = CATEGORIES.filter(c => c.id !== 'all');

  return (
    <div className="w-full mt-12 mb-20 px-2 md:px-0">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
        {displayCategories.map((category) => (
          <motion.div
            key={category.id}
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link 
              to={`/?category=${category.id}`}
              className="group block bg-white rounded-xl md:rounded-2xl p-3 md:p-4 shadow-[0_8px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_30px_rgba(0,215,215,0.15)] border border-white transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-2xl md:text-3xl rounded-lg ${category.color} bg-opacity-10 group-hover:bg-opacity-20 transition-colors`}>
                  {category.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-[10px] md:text-xs font-display text-[#222] uppercase tracking-normal leading-none mb-1">
                    {category.name}
                  </h3>
                  <p className="text-[8px] md:text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none">
                    Games
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}

        {/* All Categories Button */}
        <motion.div
          whileHover={{ y: -5, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link 
            to="/"
            className="group block bg-[#00D7D7] rounded-xl md:rounded-2xl p-3 md:p-4 shadow-[0_8px_20px_rgba(0,215,215,0.15)] border border-[#00D7D7] transition-all duration-300 h-full"
          >
            <div className="flex items-center gap-3 h-full">
              <div className="w-10 h-10 md:w-12 md:h-12 flex flex-wrap gap-0.5 p-2 items-center justify-center bg-white/20 rounded-lg">
                {[1,2,3,4].map(i => <div key={i} className="w-2.5 h-2.5 bg-white rounded-sm" />)}
              </div>
              <div className="flex-1">
                <h3 className="text-[10px] md:text-xs font-display text-white uppercase tracking-normal leading-none mb-1">
                  All
                </h3>
                <p className="text-[8px] md:text-[10px] font-bold text-white/70 uppercase tracking-widest leading-none">
                  Categories
                </p>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
