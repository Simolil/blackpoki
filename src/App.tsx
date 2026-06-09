import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GameDetail from './pages/GameDetail';
import { SearchProvider, useSearch } from './context/SearchContext';
import FloatingLogo from './components/FloatingLogo';
import SearchDrawer from './components/SearchDrawer';
import Footer from './components/Footer';
import CrystalBackground from './components/CrystalBackground';
import CrystalLoader from './components/CrystalLoader';
import { AnimatePresence } from 'motion/react';

function AppContent() {
  const { isAppLoaded, setIsAppLoaded } = useSearch();

  return (
    <div className="min-h-screen bg-transparent flex flex-col relative">
      <AnimatePresence>
        {!isAppLoaded && (
          <CrystalLoader onComplete={() => setIsAppLoaded(true)} />
        )}
      </AnimatePresence>
      
      <CrystalBackground />
      <SearchDrawer />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:id" element={<GameDetail />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <SearchProvider>
      <Router>
        <AppContent />
      </Router>
    </SearchProvider>
  );
}
