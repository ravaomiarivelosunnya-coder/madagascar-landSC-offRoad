import React, { useState } from 'react';
import { Terminal, Copy, Check, Sparkles, Sliders, ShieldCheck, Flame, ExternalLink } from 'lucide-react';

export const PromptViewerModal: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [includeToyotaFocus, setIncludeToyotaFocus] = useState(true);
  const [includeRegistrationPass, setIncludeRegistrationPass] = useState(true);
  const [includeGpsWeather, setIncludeGpsWeather] = useState(true);

  const generatePromptText = () => {
    return `### PROMPT OFF-ROAD EXPERT : APPLICATION WEB RASSO 4X4 & TOYOTA LC76 MUD

Tu es un Senior Frontend & Full-Stack Architecte spécialisé dans les applications immersives tout-terrain, l'overlanding et les rassemblements mécaniques 4x4.

**Objectif du projet :**
Conçois et développe une application web complète, réactive et ultra-immersive en "Mode Off-Road / 4x4 Mud & Trails" permettant aux passionnés de tout-terrain de :
1. Consulter l'agenda complet des rassemblements ("rasso 4x4"), bourbiers, bivouacs et raids en France.
2. S'inscrire à chaque rassemblement via une interface d'inscription technique dédiée aux pilotes et équipages.
3. Afficher un accueil spectaculaire avec en arrière-plan le légendaire Toyota Land Cruiser LC76 (Série 7) en mode "Mud" (boue profonde, snorkel, réhausse, treuil).

---

### 1. DIRECTION ARTISTIQUE & DESIGN OFF-ROAD ("MUD MODE")
- **Palette chromatique Tout-Terrain :**
  - Fond sombre roche & terre : Teintes Stone/Graphite profond (\`#0c0a09\`, \`#1c1917\`).
  - Accents sécurité & franchissement : Ambre / Orange balisage (\`#f59e0b\`, \`#d97706\`), kaki terre de sienne, vert treillis militaire.
  - Textures subtiles : Trame topographique / courbes de niveau, traces de pneus tout-terrain (Mud Terrain tread).
- **Typographie :**
  - Titres percutants & stencils mécaniques (ex: 'Chakra Petch' ou police type boîte courte / rallye raid).
  - Corps de texte lisible et moderne ('Plus Jakarta Sans').
- **Hero d'accueil Toyota LC76 Mud :**
  - Image de fond plein écran haute définition montrant un Toyota Land Cruiser 76 Series pataugeant dans une mare de boue épaisse avec éclaboussures de glaise, snorkel Safari et galerie d'expédition.
  - Télémétrie tout-terrain en surimpression : Badge "4WD Low Engaged", blocage de différentiel, canal radio CB off-road (Canal 16), pression de pneus recommandée dans la boue (1.2 à 1.4 bar).
  - Boutons d'action clairs : "Consulter les Rassos 4x4", "S'inscrire à une Session", "Générer mon Pass Pilote".

---

### 2. MODULE CONSULTATION DES RASSOS 4X4
- **Catalogue interactif des événements :**
  - Carte / Grille des rassemblements en France (ex: Domaine des Mille Chênes, Trans-Cévennes, Vercors Land Cruiser, Bourbiers du Morvan, Trial Ocres Rouges).
  - Fiche détaillée pour chaque rasso :
    * Dates et durée (week-end bivouac, nocturne).
    * Localisation précise avec nom du domaine tout-terrain, ville, département et coordonnées GPS.
    * Type de terrain : Bourbier & Glaise liquide, Piste forestière, Franchissement rocheux, Trial extrême, Sable.
    * Niveau de difficulté balisé : Vert (Tout 4x4 d'origine), Bleu (Pneus AT + Protections), Rouge (Pneus Mud + Rehausse), Noir (Treuil obligatoire + Blocages de différentiels).
    * Jauge de places restantes en direct (ex: 34/45 véhicules inscrits) avec alerte "Dernières places".
    * Équipements obligatoires : Sangle cinétique 9m, manilles forgées, extincteur, extincteur, crochets d'ancrage châssis, radio CB.
    * Programme heure par heure (vérifications techniques, ouverture des zones de glaise, nocturne treuillage, feu de camp trappeur).
- **Filtres de recherche tout-terrain :**
  - Recherche plein texte (nom, lieu, club).
  - Filtre par niveau de difficulté (Vert, Bleu, Rouge, Noir).
  - Filtre par type de sol (Bourbier, Roche, Bivouac, Trial).
  - Filtre par région française (Auvergne-Rhône-Alpes, Centre-Val de Loire, Occitanie, etc.).
  - Toggle "Spécial Toyota Land Cruiser & Série 7".

---

### 3. INTERFACE D'INSCRIPTION PILOTE & VÉHICULE
- **Formulaire d'inscription interactif étape par étape :**
  - **Étape 1 : Coordonnées Pilote & Équipage :**
    * Nom, Prénom, Indicatif Radio CB (Callsign e.g. "LC76_MudWolf"), Email, Téléphone portable, Contact d'urgence.
  - **Étape 2 : Fiche Technique du Véhicule 4x4 :**
    * Marque (Toyota, Nissan, Land Rover, Jeep, Mercedes, Suzuki...).
    * Modèle précis (Toyota Land Cruiser LC76, HZJ78, HDJ80, Patrol Y60, Defender 110, Rubicon...).
    * Année et Immatriculation.
    * Profil de pneumatiques : Mud-Terrain (MT), Extrême Bogger/Simex, All-Terrain (AT).
    * Dimensions des pneus et kit réhausse (+5cm, +7.5cm...).
    * Checkbox équipements : Treuil avant opérationnel, Snorkel étanche, Blocages de différentiels (Arrière / Avant).
  - **Étape 3 : Options du Rassemblement :**
    * Nombre d'occupants dans le 4x4.
    * Option Bivouac sur place (tente de toit / tente au sol).
    * Repas trappeur du samedi soir.
    * Canal de communication CB / VHF assigné.
- **Délivrance instantanée du "Pass Rasso Officiel" :**
  - Carte d'accès numérique stylisée façon pass technique de rallye-raid.
  - Numéro de pass unique, identifiant pilote, spécifications du véhicule, QR Code de contrôle d'accès pour les commissaires de piste.
  - Boutons "Imprimer le Pass" et enregistrement automatique dans "Mes Inscriptions".

---

### 4. ESPACE "MES INSCRIPTIONS" & GESTION PILOTE
- Vue récapitulative des pass réservés par l'utilisateur avec statut "Confirmé".
- Possibilité de visualiser la fiche technique du convoi, d'imprimer ou de se désinscrire en 1 clic.

---

### 5. MODULE PROPOSITION DE RASSO PAR LES CLUBS
- Formulaire communautaire permettant aux associations et clubs 4x4 de référencer leur propre sortie ou journée de franchissement sur terrain privé.

---

### 6. EXIGENCES TECHNIQUES
- Framework : React 18+ avec TypeScript et Vite.
- Styling : Tailwind CSS (approche mobile-first et desktop fluide).
- Animations fluides : Motion (transitions modales et interactions).
- Icônes : Lucide-react (Compass, ShieldCheck, Mountain, Radio, Tent, Flame, Truck, Users, QrCode).
- Zéro dépendance externe lourde, persistance locale pour les inscriptions pilotes.`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatePromptText());
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-stone-800">
        <div>
          <div className="flex items-center gap-2 text-amber-500 font-mono text-xs uppercase mb-1">
            <Terminal className="w-4 h-4" />
            <span>PROMPT OFF-ROAD GENERATOR</span>
          </div>
          <h2 className="text-3xl font-chakra font-bold text-stone-100 uppercase tracking-tight">
            Prompt Web Off-Road & Rasso 4x4
          </h2>
          <p className="text-sm text-stone-400">
            Le prompt d'ingénierie complet et structuré pour générer ou itérer sur votre application web tout-terrain.
          </p>
        </div>

        <button
          onClick={copyToClipboard}
          className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-chakra font-bold px-5 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-amber-600/20 cursor-pointer self-start sm:self-auto"
        >
          {copied ? <Check className="w-4 h-4 text-stone-950" /> : <Copy className="w-4 h-4 text-stone-950" />}
          <span>{copied ? 'Prompt Copié !' : 'Copier le Prompt'}</span>
        </button>
      </div>

      {/* Highlights strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 flex items-start gap-3">
          <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg shrink-0">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-chakra font-bold text-stone-200">Mode Off-Road & Mud</h4>
            <p className="text-xs text-stone-400">Ambiance visuelle tout-terrain, terre battue et Toyota LC76.</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 flex items-start gap-3">
          <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-chakra font-bold text-stone-200">Système de Pass Pilote</h4>
            <p className="text-xs text-stone-400">Formulaire technique d'inscription avec badges de sécurité.</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 flex items-start gap-3">
          <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-chakra font-bold text-stone-200">Prêt pour IA / LLM</h4>
            <p className="text-xs text-stone-400">Conçu pour être injecté directement dans Gemini ou tout modèle.</p>
          </div>
        </div>
      </div>

      {/* Code Display Container */}
      <div className="relative rounded-2xl bg-stone-950 border border-stone-800 shadow-2xl overflow-hidden">
        {/* Top code bar */}
        <div className="bg-stone-900 px-4 py-2.5 border-b border-stone-800 flex items-center justify-between text-xs font-mono text-stone-400">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/70 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/70 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500/70 inline-block" />
            </div>
            <span className="ml-2 text-stone-300 font-semibold">prompt_offroad_toyota_lc76.md</span>
          </div>

          <button
            onClick={copyToClipboard}
            className="hover:text-amber-400 flex items-center gap-1 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copié' : 'Copier'}</span>
          </button>
        </div>

        {/* Textarea / Preformatted View */}
        <div className="p-6 max-h-[60vh] overflow-y-auto font-mono text-xs text-stone-300 leading-relaxed whitespace-pre-wrap selection:bg-amber-600 selection:text-white">
          {generatePromptText()}
        </div>
      </div>
    </div>
  );
};
