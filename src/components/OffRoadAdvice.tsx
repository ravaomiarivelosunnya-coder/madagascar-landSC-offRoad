import React from 'react';
import { Gauge, ShieldAlert, Zap, Compass, TreePine } from 'lucide-react';

export const OffRoadAdvice: React.FC = () => {
  return (
    <section className="bg-stone-900/60 border-y border-stone-800/80 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-amber-500 font-mono text-xs uppercase mb-1">
              <Compass className="w-4 h-4" />
              <span>CONSEILS DE TERRAIN & PILOTAGE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-chakra font-bold text-stone-100 uppercase tracking-tight">
              Guide Franchissement Mud & Bourbiers
            </h2>
          </div>
          <div className="text-xs font-mono text-stone-400">
            MUD EXPERIENCE • RECOMMANDATIONS COMMISSAIRES DE PISTE
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          <div className="p-5 rounded-xl bg-stone-950 border border-stone-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-amber-400 mb-2">
                <Gauge className="w-5 h-5" />
                <h4 className="font-chakra font-bold text-sm uppercase">Pression dans la Glaise</h4>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                Dégonflez vos pneus Mud entre <strong>1.1 et 1.4 bar</strong>. Cela allonge la surface de contact de 150% et évite de creuser des tranchées dans les ornières.
              </p>
            </div>
            <span className="text-[10px] font-mono text-amber-500/80 mt-4 block">
              → Regonflage obligatoire avant la route
            </span>
          </div>

          <div className="p-5 rounded-xl bg-stone-950 border border-stone-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-amber-400 mb-2">
                <Zap className="w-5 h-5" />
                <h4 className="font-chakra font-bold text-sm uppercase">Boîte Courte 4L & Couple</h4>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                Engagez les réducteurs courts (4L) en seconde vitesse. Sur les moteurs diesel comme le 1HZ ou le V8 du LC76, avancez sur un filet de gaz sans faire patiner.
              </p>
            </div>
            <span className="text-[10px] font-mono text-amber-500/80 mt-4 block">
              → Laissez travailler le couple moteur
            </span>
          </div>

          <div className="p-5 rounded-xl bg-stone-950 border border-stone-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-amber-400 mb-2">
                <ShieldAlert className="w-5 h-5" />
                <h4 className="font-chakra font-bold text-sm uppercase">Treuillage Sécurisé</h4>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                Posez toujours un amortisseur ou une couverture lourde sur le câble de treuil. Ne restez jamais dans l'axe de traction et utilisez une sangle de protection d'arbre.
              </p>
            </div>
            <span className="text-[10px] font-mono text-amber-500/80 mt-4 block">
              → Port de gants de manutention exigé
            </span>
          </div>

          <div className="p-5 rounded-xl bg-stone-950 border border-stone-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-amber-400 mb-2">
                <TreePine className="w-5 h-5" />
                <h4 className="font-chakra font-bold text-sm uppercase">Éthique & Domaines Privés</h4>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                Nos rassos se déroulent exclusivement sur des domaines tout-terrain homologués et chemins légaux. Respect de la faune, zéro déchet au bivouac.
              </p>
            </div>
            <span className="text-[10px] font-mono text-amber-500/80 mt-4 block">
              → Charte Codevert & FF4X4
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};
