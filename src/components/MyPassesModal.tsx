import React from 'react';
import { Ticket, QrCode, Calendar, MapPin, Trash2, Printer, ShieldCheck, ChevronRight } from 'lucide-react';
import { PilotRegistration } from '../types';

interface MyPassesModalProps {
  passes: PilotRegistration[];
  onRemovePass: (id: string) => void;
  onExploreRassos: () => void;
}

export const MyPassesModal: React.FC<MyPassesModalProps> = ({
  passes,
  onRemovePass,
  onExploreRassos,
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-stone-800">
        <div>
          <div className="flex items-center gap-2 text-amber-500 font-mono text-xs uppercase mb-1">
            <Ticket className="w-4 h-4" />
            <span>ESPACE PILOTE OFF-ROAD</span>
          </div>
          <h2 className="text-3xl font-chakra font-bold text-stone-100 uppercase tracking-tight">
            Mes Inscriptions & Pass Rasso ({passes.length})
          </h2>
          <p className="text-sm text-stone-400">
            Retrouvez vos laissez-passer techniques et vos convocations pour les vérifications sur le terrain.
          </p>
        </div>

        <button
          onClick={onExploreRassos}
          className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-chakra font-bold text-sm px-4 py-2.5 rounded-lg transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          Trouver un autre Rasso
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {passes.length === 0 ? (
        <div className="text-center py-16 px-4 bg-stone-900/50 border border-stone-800/80 rounded-2xl">
          <div className="w-16 h-16 bg-stone-800 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-500">
            <Ticket className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-chakra font-bold text-stone-200 uppercase mb-2">
            Aucune Inscription Active
          </h3>
          <p className="text-sm text-stone-400 max-w-md mx-auto mb-6">
            Vous n'êtes pas encore inscrit à un rassemblement 4x4. Consultez la liste des rassemblements (Bourbiers, Bivouacs Cévennes, Vercors) et validez votre pass !
          </p>
          <button
            onClick={onExploreRassos}
            className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-chakra font-bold px-6 py-3 rounded-lg transition-all"
          >
            Consulter les Rassos Off-Road
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {passes.map((pass) => (
            <div
              key={pass.id}
              className="bg-stone-900 border-2 border-stone-800 hover:border-amber-500/50 rounded-2xl p-6 shadow-xl transition-all relative overflow-hidden"
            >
              {/* Tactical background watermark */}
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-stone-950/40 border-l border-stone-800/40 hidden md:flex items-center justify-center pointer-events-none">
                <span className="font-chakra font-bold text-stone-800 text-4xl -rotate-90 tracking-widest uppercase select-none">
                  PASS 4X4
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-stone-800">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-amber-500 text-stone-950 font-mono font-bold text-xs rounded">
                    {pass.passStatus}
                  </span>
                  <span className="text-xs font-mono text-stone-400">
                    PASS N° <strong className="text-stone-200">{pass.id}</strong>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="p-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors"
                  >
                    <Printer className="w-4 h-4 text-amber-400" />
                    <span>Imprimer</span>
                  </button>
                  <button
                    onClick={() => onRemovePass(pass.id)}
                    className="p-2 bg-stone-800 hover:bg-red-950/70 text-stone-400 hover:text-red-400 rounded-lg text-xs font-mono transition-colors"
                    title="Annuler l'inscription"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Event Title */}
              <div className="py-4">
                <h3 className="text-2xl font-chakra font-bold text-stone-100 uppercase tracking-tight mb-2">
                  {pass.rassoTitle}
                </h3>
                <div className="flex flex-wrap gap-4 text-xs font-mono text-stone-300">
                  <span>Pilote : <strong className="text-amber-400">{pass.pilot.firstName} {pass.pilot.lastName}</strong> ({pass.pilot.callsign})</span>
                  <span>•</span>
                  <span>Véhicule : <strong className="text-stone-100">{pass.vehicle.brand} {pass.vehicle.model}</strong></span>
                  <span>•</span>
                  <span>Pneus : <strong className="text-amber-300">{pass.vehicle.tireType}</strong></span>
                </div>
              </div>

              {/* Grid of specs & gear checklist */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 px-4 rounded-xl bg-stone-950 border border-stone-800/80 text-xs font-mono">
                <div>
                  <span className="text-stone-500 block text-[10px]">IMMATRICULATION</span>
                  <span className="font-bold text-stone-200">{pass.vehicle.licensePlate}</span>
                </div>
                <div>
                  <span className="text-stone-500 block text-[10px]">TREUIL AVANT</span>
                  <span className={pass.vehicle.hasWinch ? 'text-emerald-400 font-bold' : 'text-stone-400'}>
                    {pass.vehicle.hasWinch ? 'Équipé' : 'Non'}
                  </span>
                </div>
                <div>
                  <span className="text-stone-500 block text-[10px]">SNORKEL</span>
                  <span className={pass.vehicle.hasSnorkel ? 'text-emerald-400 font-bold' : 'text-stone-400'}>
                    {pass.vehicle.hasSnorkel ? 'Équipé' : 'Non'}
                  </span>
                </div>
                <div>
                  <span className="text-stone-500 block text-[10px]">CANAL RADIO</span>
                  <span className="text-amber-400 font-bold">{pass.cbVhfChannel}</span>
                </div>
              </div>

              {/* Pass Footer */}
              <div className="mt-4 pt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-400">
                <div className="flex items-center gap-2">
                  <QrCode className="w-4 h-4 text-amber-500" />
                  <span className="font-mono text-[11px]">Vérification numérique : {pass.qrCodeSeed.slice(0, 22)}...</span>
                </div>
                <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Équipage autorisé pour accès aux zones de franchissement
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
