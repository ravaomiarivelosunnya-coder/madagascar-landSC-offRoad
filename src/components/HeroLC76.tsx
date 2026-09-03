import React from 'react';
import { motion } from 'motion/react';
import { Compass, Calendar, ShieldCheck, MapPin, Gauge, Flame, Sparkles } from 'lucide-react';

interface HeroLC76Props {
  onExploreRassos: () => void;
  onOpenRegister: () => void;
  onOpenPrompt: () => void;
  totalRassos: number;
}

export const HeroLC76: React.FC<HeroLC76Props> = ({
  onExploreRassos,
  onOpenRegister,
  onOpenPrompt,
  totalRassos,
}) => {
  return (
    <div className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-stone-800">
      {/* Background Image: Toyota LC76 in Mud */}
      <div className="absolute inset-0 z-0">
        <img
          src="/toyota_lc76_mud.jpg"
          alt="Toyota Land Cruiser LC76 dans la boue profonde off-road mud mode"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 transform hover:scale-100 transition-transform duration-1000 ease-out"
        />
        
        {/* Layered Cinematic Gradients & Mud Atmospheres */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-stone-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/50 to-transparent" />
        <div className="absolute inset-0 bg-stone-950/20 mix-blend-multiply" />
        
        {/* Subtle Mud Vignette & Topo grid */}
        <div className="absolute inset-0 bg-grid-mud opacity-30 pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
        <div className="max-w-3xl">
          
          {/* Off-Road Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-stone-900/90 border border-amber-500/50 text-amber-400 font-mono text-xs uppercase tracking-wider mb-6 shadow-xl backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            <span className="font-bold">EDITION OFF-ROAD</span>
            <span className="text-stone-500">|</span>
            <span>TOYOTA LAND CRUISER LC76 MUD EXPERIENCE</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-chakra font-bold uppercase tracking-tight text-stone-100 leading-none mb-6 drop-shadow-2xl"
          >
            ROULEZ DANS LA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600">
              BOUE PROFONDE • DATAX-RAKOTO
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-stone-300 max-w-2xl font-normal leading-relaxed mb-8 drop-shadow"
          >
            Le portail français des rassemblements 4x4, bourbiers, bivouacs et raids tout-terrain. 
            Consultez les dates des rasso, inscrivez votre 4x4 (Toyota LC76, Patrol, Defender, Rubicon) 
            et rejoignez la communauté des franchisseurs.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 mb-12"
          >
            <button
              id="hero-btn-explore"
              onClick={onExploreRassos}
              className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-chakra font-bold text-lg px-6 py-3.5 rounded-lg shadow-2xl shadow-amber-600/30 transition-all transform hover:-translate-y-1 active:translate-y-0 cursor-pointer"
            >
              <Calendar className="w-5 h-5 text-stone-950" />
              Consulter les Rassos ({totalRassos})
            </button>

            <button
              id="hero-btn-register"
              onClick={onOpenRegister}
              className="inline-flex items-center gap-2 bg-stone-900/90 hover:bg-stone-800 text-stone-100 border border-stone-700 hover:border-amber-500 font-chakra font-bold text-lg px-6 py-3.5 rounded-lg shadow-xl backdrop-blur-md transition-all cursor-pointer"
            >
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              S'inscrire à un Rasso
            </button>
          </motion.div>

          {/* LC76 Off-Road Specs Strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-900/80 border border-stone-800/80 rounded-xl p-4 backdrop-blur-md"
          >
            <div className="flex items-center space-x-3 p-2">
              <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20 text-amber-400">
                <Gauge className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-mono text-stone-400 uppercase">Motricité</div>
                <div className="text-sm font-bold font-chakra text-stone-100">4WD + Blocages</div>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-2">
              <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20 text-amber-400">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-mono text-stone-400 uppercase">Garde au sol</div>
                <div className="text-sm font-bold font-chakra text-stone-100">Pneus Mud 33"</div>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-2">
              <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20 text-amber-400">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-mono text-stone-400 uppercase">Passage de Gué</div>
                <div className="text-sm font-bold font-chakra text-stone-100">Snorkel Safari</div>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-2">
              <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20 text-amber-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-mono text-stone-400 uppercase">Saison Rassos</div>
                <div className="text-sm font-bold font-chakra text-stone-100">Automne / Hiver</div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Floating Bottom Telemetry Badge */}
      <div className="hidden lg:flex absolute bottom-6 right-8 z-20 items-center gap-3 bg-stone-900/90 border border-stone-800 rounded-lg p-3 text-xs font-mono text-stone-300 backdrop-blur-md shadow-2xl">
        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
        <div>
          <span className="text-stone-400">VEHICULE EN TÊTE :</span>{' '}
          <span className="text-amber-400 font-bold">TOYOTA LAND CRUISER LC76 SW</span>
        </div>
        <span className="text-stone-600">|</span>
        <div>
          <span className="text-stone-400">PRESSION CONSEILLÉE :</span>{' '}
          <span className="text-stone-200">1.2 BAR MUD</span>
        </div>
      </div>
    </div>
  );
};
