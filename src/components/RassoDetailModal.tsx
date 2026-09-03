import React from 'react';
import { 
  X, Calendar, MapPin, Compass, ShieldCheck, Users, Radio, 
  Phone, Mail, CheckCircle2, AlertTriangle, Tent, Droplets, Wrench, Share2
} from 'lucide-react';
import { RassoEvent } from '../types';

interface RassoDetailModalProps {
  rasso: RassoEvent | null;
  onClose: () => void;
  onRegister: (rasso: RassoEvent) => void;
}

export const RassoDetailModal: React.FC<RassoDetailModalProps> = ({ rasso, onClose, onRegister }) => {
  if (!rasso) return null;

  const spotsLeft = rasso.maxVehicles - rasso.registeredVehicles;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          id="btn-close-rasso-detail"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-stone-950/80 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700 transition-colors"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Hero Banner */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-stone-950">
          <img
            src={rasso.coverImage || '/toyota_lc76_mud.jpg'}
            alt={rasso.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/60 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold px-3 py-1 rounded bg-amber-500 text-stone-950">
                {rasso.difficulty}
              </span>
              <span className="text-xs font-mono px-3 py-1 rounded bg-stone-950/80 text-amber-300 border border-amber-500/30">
                {rasso.terrain}
              </span>
              <span className="text-xs font-mono px-3 py-1 rounded bg-stone-950/80 text-stone-300 border border-stone-700">
                Frais : {rasso.entryFeeEuro} € par véhicule
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-chakra font-bold text-stone-100 uppercase tracking-tight mb-2">
              {rasso.title}
            </h2>

            <p className="text-sm sm:text-base text-stone-300 max-w-2xl">
              {rasso.subtitle}
            </p>
          </div>
        </div>

        {/* Modal Content Tabs / Sections */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[calc(85vh-16rem)] overflow-y-auto">
          
          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-stone-950/70 border border-stone-800">
            <div className="flex items-start space-x-3">
              <Calendar className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-mono text-stone-400">DATES DU RASSO</div>
                <div className="text-sm font-bold text-stone-200">
                  Du {rasso.dateStart} au {rasso.dateEnd}
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-mono text-stone-400">LIEU & GPS</div>
                <div className="text-sm font-bold text-stone-200">{rasso.location.spotName}</div>
                <div className="text-xs text-amber-400/90 font-mono">{rasso.location.gpsCoords}</div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Users className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-mono text-stone-400">PLACES DISPONIBLES</div>
                <div className="text-sm font-bold text-stone-200">
                  {spotsLeft > 0 ? `${spotsLeft} places restantes (${rasso.registeredVehicles}/${rasso.maxVehicles})` : 'COMPLET'}
                </div>
              </div>
            </div>
          </div>

          {/* Description & Ambience */}
          <div>
            <h3 className="text-lg font-chakra font-bold text-amber-400 uppercase tracking-wide mb-3 flex items-center gap-2">
              <Compass className="w-5 h-5" /> Présentation du Rassemblement
            </h3>
            <p className="text-stone-300 text-sm leading-relaxed mb-4">
              {rasso.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {rasso.highlights.map((hl, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-stone-300 bg-stone-950/40 p-2.5 rounded-lg border border-stone-800/80">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Schedule */}
          <div>
            <h3 className="text-lg font-chakra font-bold text-amber-400 uppercase tracking-wide mb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5" /> Déroulement & Programme
            </h3>
            <div className="space-y-3">
              {rasso.schedule.map((item, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline gap-2 p-3 rounded-lg bg-stone-950/50 border border-stone-800/80">
                  <span className="text-xs font-mono font-bold text-amber-400 sm:w-36 shrink-0">
                    {item.time}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-stone-100 font-chakra">{item.activity}</h4>
                    <p className="text-xs text-stone-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Equipment & Vehicles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Required Gear */}
            <div className="p-4 rounded-xl bg-stone-950/70 border border-stone-800">
              <h4 className="text-sm font-chakra font-bold text-amber-400 uppercase tracking-wide mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" /> Équipements 4x4 Obligatoires
              </h4>
              <ul className="space-y-2">
                {rasso.requiredEquipments.map((eq, i) => (
                  <li key={i} className="text-xs text-stone-300 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <span>{eq}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommended 4x4 Models */}
            <div className="p-4 rounded-xl bg-stone-950/70 border border-stone-800">
              <h4 className="text-sm font-chakra font-bold text-amber-400 uppercase tracking-wide mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-500" /> Véhicules Conseillés
              </h4>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {rasso.recommendedVehicles.map((v, i) => (
                  <span key={i} className="text-xs font-mono px-2.5 py-1 rounded bg-stone-800 text-stone-200 border border-stone-700">
                    {v}
                  </span>
                ))}
              </div>
              <div className="text-xs text-stone-400 mt-2 p-2 rounded bg-stone-900 border border-stone-800">
                <span className="font-semibold text-amber-400">Focus Toyota :</span> Modèle d'honneur <strong>{rasso.keyVehicleFeatured}</strong> avec boîte courte et blocages de ponts.
              </div>
            </div>

          </div>

          {/* Organizer & Radio Comms */}
          <div className="p-4 rounded-xl bg-stone-950/90 border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-stone-400 uppercase">Organisé par</div>
              <div className="text-base font-bold font-chakra text-stone-100">{rasso.organizer.clubName}</div>
              <div className="text-xs text-stone-400">Responsable : {rasso.organizer.contactName} ({rasso.organizer.phone})</div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800 text-amber-400 flex items-center gap-2">
                <Radio className="w-4 h-4" />
                <span className="text-xs font-mono font-bold">{rasso.organizer.radioChannel}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer Action */}
        <div className="p-4 sm:p-6 bg-stone-950 border-t border-stone-800 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs font-mono text-stone-400">
            Frais d'engagement : <span className="text-amber-400 font-bold text-base">{rasso.entryFeeEuro} €</span> / équipage
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="py-2.5 px-4 rounded-lg text-sm font-medium text-stone-400 hover:text-white bg-stone-900 hover:bg-stone-800 border border-stone-800 transition-colors"
            >
              Fermer
            </button>

            <button
              id="btn-register-from-detail"
              onClick={() => {
                onClose();
                onRegister(rasso);
              }}
              disabled={spotsLeft <= 0}
              className="py-2.5 px-6 rounded-lg text-sm font-chakra font-bold bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-lg shadow-amber-600/30 transition-all cursor-pointer"
            >
              {spotsLeft > 0 ? "S'inscrire à ce Rassemblement" : 'Session Complète'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
