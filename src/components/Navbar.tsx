import React from 'react';
import { Compass, ShieldCheck, Calendar, PlusCircle, Terminal, Ticket, Mountain, Radio } from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'rassos' | 'my-passes' | 'propose' | 'prompt-view';
  setActiveTab: (tab: 'home' | 'rassos' | 'my-passes' | 'propose' | 'prompt-view') => void;
  passesCount: number;
  onOpenQuickRegister: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  passesCount,
  onOpenQuickRegister,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-stone-950/90 backdrop-blur-md border-b border-stone-800/80 shadow-2xl">
      {/* Top rugged ticker bar */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 text-stone-950 px-4 py-1 text-xs font-bold uppercase tracking-wider flex items-center justify-between font-mono">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-stone-950 animate-pulse"></span>
          <span>4WD LOW ENGAGED • DIFF LOCK READY • TOYOTA LC76 MUD EXPEDITION</span>
        </div>
        <div className="hidden sm:flex items-center space-x-4 text-[11px]">
          <span className="flex items-center gap-1">
            <Radio className="w-3 h-3" /> CANAL CB OFF-ROAD : CH-16
          </span>
          <span>FRANCE 4X4 GATHERINGS 2026-2027</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Brand logo & tagline */}
          <div 
            id="nav-brand"
            onClick={() => setActiveTab('home')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-11 h-11 bg-stone-900 border-2 border-amber-600/70 rounded-lg flex items-center justify-center shadow-lg group-hover:border-amber-500 transition-all group-hover:scale-105">
              <Mountain className="w-6 h-6 text-amber-500 group-hover:rotate-6 transition-transform" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-stone-100 font-chakra uppercase">
                  MUD & TRAILS
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40 rounded">
                  4X4
                </span>
              </div>
              <p className="text-xs text-stone-400 tracking-wider font-mono">
                RASSO & BAROUD • TOYOTA LC76
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              id="nav-link-home"
              onClick={() => setActiveTab('home')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                activeTab === 'home'
                  ? 'bg-amber-600/20 text-amber-400 border border-amber-500/30'
                  : 'text-stone-300 hover:text-white hover:bg-stone-900'
              }`}
            >
              <Compass className="w-4 h-4" />
              Accueil
            </button>

            <button
              id="nav-link-rassos"
              onClick={() => setActiveTab('rassos')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                activeTab === 'rassos'
                  ? 'bg-amber-600/20 text-amber-400 border border-amber-500/30'
                  : 'text-stone-300 hover:text-white hover:bg-stone-900'
              }`}
            >
              <Calendar className="w-4 h-4" />
              Consulter les Rassos
            </button>

            <button
              id="nav-link-passes"
              onClick={() => setActiveTab('my-passes')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1.5 relative ${
                activeTab === 'my-passes'
                  ? 'bg-amber-600/20 text-amber-400 border border-amber-500/30'
                  : 'text-stone-300 hover:text-white hover:bg-stone-900'
              }`}
            >
              <Ticket className="w-4 h-4" />
              Mes Inscriptions
              {passesCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-amber-500 text-stone-950 font-bold text-xs rounded-full">
                  {passesCount}
                </span>
              )}
            </button>

            <button
              id="nav-link-propose"
              onClick={() => setActiveTab('propose')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                activeTab === 'propose'
                  ? 'bg-amber-600/20 text-amber-400 border border-amber-500/30'
                  : 'text-stone-300 hover:text-white hover:bg-stone-900'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              Proposer un Rasso
            </button>

            <button
              id="nav-link-prompt"
              onClick={() => setActiveTab('prompt-view')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                activeTab === 'prompt-view'
                  ? 'bg-amber-600/20 text-amber-400 border border-amber-500/30'
                  : 'text-stone-400 hover:text-amber-300 hover:bg-stone-900'
              }`}
            >
              <Terminal className="w-4 h-4 text-amber-400" />
              Prompt Web Off-Road
            </button>
          </nav>

          {/* Primary Action Button */}
          <div className="flex items-center space-x-3">
            <button
              id="btn-quick-register"
              onClick={onOpenQuickRegister}
              className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-chakra font-bold px-4 py-2 rounded-md shadow-lg shadow-amber-900/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <ShieldCheck className="w-4 h-4" />
              Inscription Pilote
            </button>

            {/* Mobile menu trigger */}
            <div className="md:hidden flex items-center gap-1">
              <button
                id="btn-mobile-passes"
                onClick={() => setActiveTab('my-passes')}
                className="p-2 bg-stone-900 text-amber-400 rounded-md border border-stone-800 relative"
                aria-label="Mes Inscriptions"
              >
                <Ticket className="w-5 h-5" />
                {passesCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-stone-950 font-bold text-[10px] rounded-full flex items-center justify-center">
                    {passesCount}
                  </span>
                )}
              </button>
            </div>
          </div>

        </div>

        {/* Mobile secondary navigation strip */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-stone-800/70 text-xs font-medium overflow-x-auto space-x-1">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-2.5 py-1.5 rounded whitespace-nowrap ${activeTab === 'home' ? 'text-amber-400 bg-stone-900 font-bold' : 'text-stone-400'}`}
          >
            Accueil
          </button>
          <button
            onClick={() => setActiveTab('rassos')}
            className={`px-2.5 py-1.5 rounded whitespace-nowrap ${activeTab === 'rassos' ? 'text-amber-400 bg-stone-900 font-bold' : 'text-stone-400'}`}
          >
            Rassos 4x4
          </button>
          <button
            onClick={() => setActiveTab('my-passes')}
            className={`px-2.5 py-1.5 rounded whitespace-nowrap ${activeTab === 'my-passes' ? 'text-amber-400 bg-stone-900 font-bold' : 'text-stone-400'}`}
          >
            Pass ({passesCount})
          </button>
          <button
            onClick={() => setActiveTab('propose')}
            className={`px-2.5 py-1.5 rounded whitespace-nowrap ${activeTab === 'propose' ? 'text-amber-400 bg-stone-900 font-bold' : 'text-stone-400'}`}
          >
            + Proposer
          </button>
          <button
            onClick={() => setActiveTab('prompt-view')}
            className={`px-2.5 py-1.5 rounded whitespace-nowrap ${activeTab === 'prompt-view' ? 'text-amber-400 bg-stone-900 font-bold' : 'text-stone-400'}`}
          >
            Prompt IA
          </button>
        </div>

      </div>
    </header>
  );
};
