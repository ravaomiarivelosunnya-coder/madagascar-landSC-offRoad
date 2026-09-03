import React from 'react';
import { Calendar, MapPin, Users, ShieldAlert, CheckCircle2, ChevronRight, Tent, Droplets } from 'lucide-react';
import { RassoEvent } from '../types';

interface RassoCardProps {
  rasso: RassoEvent;
  onSelect: (rasso: RassoEvent) => void;
  onRegister: (rasso: RassoEvent) => void;
}

export const RassoCard: React.FC<RassoCardProps> = ({ rasso, onSelect, onRegister }) => {
  const spotsLeft = rasso.maxVehicles - rasso.registeredVehicles;
  const isAlmostFull = spotsLeft <= 5;
  const isFull = spotsLeft <= 0;

  // Format date range nicely in French
  const formatDate = (start: string, end: string) => {
    const s = new Date(start);
    const e = new Date(end);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    return `${s.toLocaleDateString('fr-FR', options)} au ${e.toLocaleDateString('fr-FR', options)}`;
  };

  const getDifficultyColor = (diff: string) => {
    if (diff.startsWith('Vert')) return 'bg-emerald-950/80 text-emerald-400 border-emerald-600/50';
    if (diff.startsWith('Bleu')) return 'bg-sky-950/80 text-sky-400 border-sky-600/50';
    if (diff.startsWith('Rouge')) return 'bg-red-950/80 text-red-400 border-red-600/50';
    return 'bg-purple-950/80 text-purple-300 border-purple-600/60';
  };

  return (
    <div className="bg-stone-900/90 border border-stone-800 rounded-xl overflow-hidden hover:border-amber-500/60 transition-all duration-300 flex flex-col justify-between shadow-xl group hover:-translate-y-1">
      <div>
        {/* Card Header with cover image thumbnail */}
        <div className="relative h-44 overflow-hidden bg-stone-950">
          <img
            src={rasso.coverImage || '/toyota_lc76_mud.jpg'}
            alt={rasso.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />
          
          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            <span className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded border shadow-md backdrop-blur-md ${getDifficultyColor(rasso.difficulty)}`}>
              {rasso.difficulty.split(' ')[0]}
            </span>
            <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded bg-stone-900/80 text-amber-400 border border-amber-500/30 backdrop-blur-md">
              {rasso.terrain}
            </span>
          </div>

          <div className="absolute top-3 right-3">
            <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-md bg-stone-950/90 text-stone-200 border border-stone-800">
              {rasso.entryFeeEuro} € <span className="text-[10px] text-stone-400 font-normal">/ 4x4</span>
            </span>
          </div>

          {/* Location strip */}
          <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-xs text-stone-300">
            <span className="flex items-center gap-1 font-medium truncate">
              <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              {rasso.location.city} ({rasso.location.department})
            </span>
            <span className="text-[11px] text-stone-400 font-mono">
              {rasso.location.region}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-500/90 mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatDate(rasso.dateStart, rasso.dateEnd)}</span>
          </div>

          <h3 className="text-xl font-bold font-chakra text-stone-100 mb-1 group-hover:text-amber-400 transition-colors line-clamp-1">
            {rasso.title}
          </h3>

          <p className="text-xs text-stone-400 mb-4 line-clamp-2 leading-relaxed">
            {rasso.subtitle}
          </p>

          {/* Featured vehicle tag */}
          <div className="p-2 rounded bg-stone-950/60 border border-stone-800/80 text-xs mb-4 flex items-center justify-between">
            <span className="text-stone-400 font-mono text-[11px]">VÉHICULE VEDETTE :</span>
            <span className="text-amber-300 font-semibold font-chakra">{rasso.keyVehicleFeatured}</span>
          </div>

          {/* Badges strip (Bivouac, Treuil, Eau) */}
          <div className="flex flex-wrap gap-2 mb-4 text-[11px] text-stone-300">
            {rasso.bivouacAllowed && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-stone-800/80 border border-stone-700/60">
                <Tent className="w-3 h-3 text-amber-400" /> Bivouac autorisé
              </span>
            )}
            {rasso.waterPointAvailable && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-stone-800/80 border border-stone-700/60">
                <Droplets className="w-3 h-3 text-sky-400" /> Point d'eau
              </span>
            )}
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-stone-800/80 border border-stone-700/60">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Assistance 4x4
            </span>
          </div>

          {/* Remaining spots progress bar */}
          <div className="space-y-1.5 mb-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-stone-400 flex items-center gap-1">
                <Users className="w-3.5 h-3.5" /> Inscrits :
              </span>
              <span className={`font-bold ${isAlmostFull ? 'text-amber-400' : 'text-stone-200'}`}>
                {rasso.registeredVehicles} / {rasso.maxVehicles} 4x4
              </span>
            </div>
            
            <div className="w-full h-1.5 bg-stone-800 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  isFull ? 'bg-red-500' : isAlmostFull ? 'bg-amber-500' : 'bg-amber-600'
                }`}
                style={{ width: `${Math.min(100, (rasso.registeredVehicles / rasso.maxVehicles) * 100)}%` }}
              />
            </div>
          </div>

          {isAlmostFull && !isFull && (
            <div className="text-[11px] text-amber-400 font-mono flex items-center gap-1 mb-2">
              <ShieldAlert className="w-3 h-3" /> Plus que {spotsLeft} places disponibles !
            </div>
          )}
          {isFull && (
            <div className="text-[11px] text-red-400 font-mono flex items-center gap-1 mb-2">
              <ShieldAlert className="w-3 h-3" /> Complet pour les pilotes (liste d'attente)
            </div>
          )}
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="p-4 pt-0 flex items-center gap-2 border-t border-stone-800/50 mt-2 bg-stone-950/40">
        <button
          id={`btn-detail-${rasso.id}`}
          onClick={() => onSelect(rasso)}
          className="flex-1 py-2.5 px-3 rounded-lg text-xs font-chakra font-bold text-stone-300 bg-stone-800 hover:bg-stone-700 hover:text-white transition-colors flex items-center justify-center gap-1"
        >
          Détails & GPS
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        <button
          id={`btn-register-${rasso.id}`}
          onClick={() => onRegister(rasso)}
          disabled={isFull}
          className={`py-2.5 px-4 rounded-lg text-xs font-chakra font-bold transition-all flex items-center justify-center gap-1.5 shadow-md ${
            isFull 
              ? 'bg-stone-800 text-stone-500 cursor-not-allowed'
              : 'bg-amber-500 hover:bg-amber-400 text-stone-950 hover:shadow-amber-500/20'
          }`}
        >
          {isFull ? 'Complet' : "S'inscrire"}
        </button>
      </div>
    </div>
  );
};
