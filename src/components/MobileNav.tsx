import React from 'react';
import { Home as HomeIcon, Gamepad2, Trophy, User, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function MobileNav() {
  const location = useLocation();
  
  const navItems = [
    { label: 'Home', icon: HomeIcon, path: '/' },
    { label: 'Browse', icon: Search, path: '/browse' },
    { label: 'Games', icon: Gamepad2, path: '/games' },
    { label: 'Top', icon: Trophy, path: '/top' },
    { label: 'Profile', icon: User, path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-black/90 backdrop-blur-xl flex items-center justify-around px-2 lg:hidden z-50">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.label}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors",
              isActive ? "text-violet-500 font-bold" : "text-gray-600 font-semibold"
            )}
          >
            <item.icon className={cn("w-5 h-5", isActive ? "scale-110 text-violet-500" : "")} />
            <span className="text-[10px]">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
