import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, Calendar, MapPin, Compass, ShieldCheck, 
  Mountain, Users, PlusCircle, Radio, Sparkles, SlidersHorizontal, 
  CheckCircle2, ArrowRight
} from 'lucide-react';
import { RassoEvent, PilotRegistration, RassoFilters } from './types';
import { INITIAL_RASSOS } from './data/mockRassos';
import { Navbar } from './components/Navbar';
import { HeroLC76 } from './components/HeroLC76';
import { RassoCard } from './components/RassoCard';
import { RassoDetailModal } from './components/RassoDetailModal';
import { RegistrationModal } from './components/RegistrationModal';
import { CreateRassoModal } from './components/CreateRassoModal';
import { MyPassesModal } from './components/MyPassesModal';
import { PromptViewerModal } from './components/PromptViewerModal';
import { OffRoadAdvice } from './components/OffRoadAdvice';

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<'home' | 'rassos' | 'my-passes' | 'propose' | 'prompt-view'>('home');

  // Rassos state (persisted in localStorage)
  const [rassos, setRassos] = useState<RassoEvent[]>(() => {
    const saved = localStorage.getItem('mudtrails_rassos');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved rassos', e);
      }
    }
    return INITIAL_RASSOS;
  });

  // Pilot Registrations (Passes) state (persisted in localStorage)
  const [passes, setPasses] = useState<PilotRegistration[]>(() => {
    const saved = localStorage.getItem('mudtrails_pilot_passes');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved passes', e);
      }
    }
    // Seed initial demonstration pass for Toyota LC76 pilot
    return [
      {
        id: 'PASS-LC76-MUD-901',
        rassoId: 'rasso-mud-mille-chenes-2026',
        rassoTitle: 'Mud & Rock Challenge - Domaine des Mille Chênes',
        createdAt: '2026-09-01T14:30:00.000Z',
        pilot: {
          firstName: 'Thomas',
          lastName: 'Laurent',
          callsign: 'LC76_MudSniper',
          email: 'thomas.laurent@baroud-4x4.fr',
          phone: '06 14 28 39 50',
          emergencyContact: 'Claire Laurent (06 20 30 40 50)',
        },
        vehicle: {
          brand: 'Toyota',
          model: 'Land Cruiser LC76 Station Wagon',
          year: '2024',
          licensePlate: 'LC-076-WD',
          tireType: 'Mud-Terrain (MT)',
          tireSize: '285/75 R16 BFG Mud KM3',
          hasWinch: true,
          hasSnorkel: true,
          hasDiffLock: true,
          liftHeight: '+5cm Old Man Emu BP51',
        },
        passengersCount: 2,
        bivouacRequested: true,
        mealPackage: true,
        cbVhfChannel: 'Canal 16 CB',
        passStatus: 'CONFIRMÉ',
        qrCodeSeed: 'MUDTRAILS-AUTH-LC76-VALIDE-001',
      },
    ];
  });

  // Filter State
  const [filters, setFilters] = useState<RassoFilters>({
    searchQuery: '',
    region: 'Toutes',
    terrain: 'Tous',
    difficulty: 'Toutes',
    onlyBivouac: false,
    onlyToyotaFriendly: false,
  });

  // Modals state
  const [selectedRassoForDetail, setSelectedRassoForDetail] = useState<RassoEvent | null>(null);
  const [selectedRassoForRegistration, setSelectedRassoForRegistration] = useState<RassoEvent | null>(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);
  const [isCreateRassoOpen, setIsCreateRassoOpen] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('mudtrails_rassos', JSON.stringify(rassos));
  }, [rassos]);

  useEffect(() => {
    localStorage.setItem('mudtrails_pilot_passes', JSON.stringify(passes));
  }, [passes]);

  // Handle new pilot registration
  const handleSuccessRegistration = (newPass: PilotRegistration) => {
    setPasses((prev) => [newPass, ...prev]);

    // Increment registered vehicle count on the corresponding rasso
    setRassos((prev) =>
      prev.map((r) => {
        if (r.id === newPass.rassoId) {
          return {
            ...r,
            registeredVehicles: Math.min(r.maxVehicles, r.registeredVehicles + 1),
          };
        }
        return r;
      })
    );
  };

  // Handle deleting a registration pass
  const handleRemovePass = (passId: string) => {
    if (confirm('Voulez-vous vraiment annuler cette inscription ?')) {
      const passToDelete = passes.find((p) => p.id === passId);
      setPasses((prev) => prev.filter((p) => p.id !== passId));

      if (passToDelete) {
        setRassos((prev) =>
          prev.map((r) => {
            if (r.id === passToDelete.rassoId) {
              return {
                ...r,
                registeredVehicles: Math.max(0, r.registeredVehicles - 1),
              };
            }
            return r;
          })
        );
      }
    }
  };

  // Handle adding a new rasso by the community
  const handleAddRasso = (newRasso: RassoEvent) => {
    setRassos((prev) => [newRasso, ...prev]);
    alert(`Le rassemblement "${newRasso.title}" a bien été publié !`);
    setActiveTab('rassos');
  };

  // Open registration with specific rasso
  const handleOpenRegistration = (rasso?: RassoEvent) => {
    if (rasso) {
      setSelectedRassoForRegistration(rasso);
    } else {
      setSelectedRassoForRegistration(rassos[0] || null);
    }
    setIsRegisterOpen(true);
  };

  // Filtered rassos
  const filteredRassos = rassos.filter((r) => {
    // Search query
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      const match =
        r.title.toLowerCase().includes(q) ||
        r.location.city.toLowerCase().includes(q) ||
        r.location.region.toLowerCase().includes(q) ||
        r.organizer.clubName.toLowerCase().includes(q) ||
        r.keyVehicleFeatured.toLowerCase().includes(q);
      if (!match) return false;
    }

    // Region
    if (filters.region !== 'Toutes' && r.location.region !== filters.region) {
      return false;
    }

    // Terrain
    if (filters.terrain !== 'Tous' && r.terrain !== filters.terrain) {
      return false;
    }

    // Difficulty
    if (filters.difficulty !== 'Toutes' && !r.difficulty.startsWith(filters.difficulty)) {
      return false;
    }

    // Bivouac only
    if (filters.onlyBivouac && !r.bivouacAllowed) {
      return false;
    }

    // Toyota friendly only
    if (filters.onlyToyotaFriendly) {
      const desc = (r.keyVehicleFeatured + ' ' + r.description + ' ' + r.title).toLowerCase();
      if (!desc.includes('toyota') && !desc.includes('lc76') && !desc.includes('land cruiser')) {
        return false;
      }
    }

    return true;
  });

  const uniqueRegions = Array.from(new Set(rassos.map((r) => r.location.region)));

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col selection:bg-amber-600 selection:text-white">
      
      {/* Off-Road Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        passesCount={passes.length}
        onOpenQuickRegister={() => handleOpenRegistration()}
      />

      {/* Main View Router */}
      <main className="flex-1">
        
        {activeTab === 'home' && (
          <div>
            {/* Hero Section featuring the Toyota LC76 in Mud */}
            <HeroLC76
              onExploreRassos={() => {
                const el = document.getElementById('rassos-catalogue');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  setActiveTab('rassos');
                }
              }}
              onOpenRegister={() => handleOpenRegistration()}
              onOpenPrompt={() => setActiveTab('prompt-view')}
              totalRassos={rassos.length}
            />

            {/* Quick Filter & Rasso Discovery Section on Homepage */}
            <div id="rassos-catalogue" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-2 text-amber-500 font-mono text-xs uppercase mb-1">
                    <Calendar className="w-4 h-4" />
                    <span>AGENDA TOUT-TERRAIN FRANCE 2026-2027</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-chakra font-bold text-stone-100 uppercase tracking-tight">
                    Prochains Rassemblements 4x4
                  </h2>
                  <p className="text-sm text-stone-400 max-w-xl">
                    Découvrez les bourbiers, franchissements, bivouacs et sorties club. Réservez votre place d'équipage avant clôture des inscriptions.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsCreateRassoOpen(true)}
                    className="p-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-800 rounded-lg text-xs font-mono flex items-center gap-2 transition-colors"
                  >
                    <PlusCircle className="w-4 h-4 text-amber-500" />
                    <span>Proposer un Rasso</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('rassos')}
                    className="p-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-lg text-xs font-chakra font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <span>Voir Tous ({rassos.length})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Filter Strip */}
              <div className="p-4 rounded-xl bg-stone-900/90 border border-stone-800 mb-8 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Rechercher par lieu, rasso, Toyota..."
                      value={filters.searchQuery}
                      onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 bg-stone-950 border border-stone-800 rounded-lg text-xs text-stone-100 placeholder-stone-500 focus:border-amber-500 focus:outline-none font-mono"
                    />
                  </div>

                  {/* Terrain Filter */}
                  <div>
                    <select
                      value={filters.terrain}
                      onChange={(e) => setFilters({ ...filters, terrain: e.target.value })}
                      className="w-full py-2 px-3 bg-stone-950 border border-stone-800 rounded-lg text-xs text-stone-200 focus:border-amber-500 focus:outline-none font-mono"
                    >
                      <option value="Tous">Tous les Terrains</option>
                      <option value="Bourbier & Glaise">Bourbier & Glaise</option>
                      <option value="Piste & Bivouac Forestier">Piste & Bivouac Forestier</option>
                      <option value="Franchissement Rocailleux">Franchissement Rocailleux</option>
                      <option value="Trial 4x4 Extrême">Trial 4x4 Extrême</option>
                      <option value="Sable & Dunes">Sable & Dunes</option>
                    </select>
                  </div>

                  {/* Difficulty Filter */}
                  <div>
                    <select
                      value={filters.difficulty}
                      onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
                      className="w-full py-2 px-3 bg-stone-950 border border-stone-800 rounded-lg text-xs text-stone-200 focus:border-amber-500 focus:outline-none font-mono"
                    >
                      <option value="Toutes">Toutes Difficultés</option>
                      <option value="Vert">Vert (Tout 4x4 d'origine)</option>
                      <option value="Bleu">Bleu (Pneus AT + Rehausse)</option>
                      <option value="Rouge">Rouge (Pneus Mud + Treuil)</option>
                      <option value="Noir">Noir (Extrême + Blocages)</option>
                    </select>
                  </div>

                  {/* Region Filter */}
                  <div>
                    <select
                      value={filters.region}
                      onChange={(e) => setFilters({ ...filters, region: e.target.value })}
                      className="w-full py-2 px-3 bg-stone-950 border border-stone-800 rounded-lg text-xs text-stone-200 focus:border-amber-500 focus:outline-none font-mono"
                    >
                      <option value="Toutes">Toutes Régions</option>
                      {uniqueRegions.map((reg) => (
                        <option key={reg} value={reg}>
                          {reg}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Quick Toggle Badges */}
                <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
                  <label className="flex items-center gap-2 p-1.5 px-3 rounded-lg bg-stone-950 border border-stone-800 cursor-pointer text-stone-300 hover:border-stone-700">
                    <input
                      type="checkbox"
                      checked={filters.onlyToyotaFriendly}
                      onChange={(e) => setFilters({ ...filters, onlyToyotaFriendly: e.target.checked })}
                      className="rounded border-stone-700 text-amber-500 focus:ring-amber-500"
                    />
                    <span className="font-chakra font-bold text-amber-400">Spécial Toyota Land Cruiser / LC76</span>
                  </label>

                  <label className="flex items-center gap-2 p-1.5 px-3 rounded-lg bg-stone-950 border border-stone-800 cursor-pointer text-stone-300 hover:border-stone-700">
                    <input
                      type="checkbox"
                      checked={filters.onlyBivouac}
                      onChange={(e) => setFilters({ ...filters, onlyBivouac: e.target.checked })}
                      className="rounded border-stone-700 text-amber-500 focus:ring-amber-500"
                    />
                    <span>Avec Bivouac de Nuit</span>
                  </label>

                  {(filters.searchQuery || filters.region !== 'Toutes' || filters.terrain !== 'Tous' || filters.difficulty !== 'Toutes' || filters.onlyBivouac || filters.onlyToyotaFriendly) && (
                    <button
                      onClick={() =>
                        setFilters({
                          searchQuery: '',
                          region: 'Toutes',
                          terrain: 'Tous',
                          difficulty: 'Toutes',
                          onlyBivouac: false,
                          onlyToyotaFriendly: false,
                        })
                      }
                      className="text-stone-400 hover:text-white underline font-mono text-[11px] ml-auto"
                    >
                      Réinitialiser les filtres
                    </button>
                  )}
                </div>
              </div>

              {/* Grid of Rassos */}
              {filteredRassos.length === 0 ? (
                <div className="text-center py-16 px-4 bg-stone-900/40 border border-stone-800 rounded-2xl">
                  <p className="text-stone-400 text-sm mb-4">
                    Aucun rassemblement 4x4 ne correspond à ces critères de recherche.
                  </p>
                  <button
                    onClick={() =>
                      setFilters({
                        searchQuery: '',
                        region: 'Toutes',
                        terrain: 'Tous',
                        difficulty: 'Toutes',
                        onlyBivouac: false,
                        onlyToyotaFriendly: false,
                      })
                    }
                    className="px-4 py-2 bg-stone-800 text-amber-400 font-mono text-xs rounded-lg hover:bg-stone-700"
                  >
                    Effacer les filtres
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRassos.slice(0, 6).map((rasso) => (
                    <RassoCard
                      key={rasso.id}
                      rasso={rasso}
                      onSelect={(r) => setSelectedRassoForDetail(r)}
                      onRegister={(r) => handleOpenRegistration(r)}
                    />
                  ))}
                </div>
              )}

              {filteredRassos.length > 6 && (
                <div className="mt-8 text-center">
                  <button
                    onClick={() => setActiveTab('rassos')}
                    className="py-3 px-6 bg-stone-900 hover:bg-stone-800 text-amber-400 font-chakra font-bold text-sm rounded-lg border border-stone-800 transition-colors"
                  >
                    Voir l'intégralité des rassemblements ({filteredRassos.length})
                  </button>
                </div>
              )}
            </div>

            {/* Tactical Advice & Off-Road Guidelines Strip */}
            <OffRoadAdvice />
          </div>
        )}

        {/* Tab 2: Full Rassos Consultation */}
        {activeTab === 'rassos' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-stone-800">
              <div>
                <div className="flex items-center gap-2 text-amber-500 font-mono text-xs uppercase mb-1">
                  <Calendar className="w-4 h-4" />
                  <span>CALENDRIER OFF-ROAD COMPLET</span>
                </div>
                <h2 className="text-3xl font-chakra font-bold text-stone-100 uppercase tracking-tight">
                  Consulter les Rassemblements 4x4 ({filteredRassos.length})
                </h2>
                <p className="text-sm text-stone-400">
                  Bourbiers, pistes forestières, zones de trial et raids bivouacs en France.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsCreateRassoOpen(true)}
                  className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-chakra font-bold text-xs px-4 py-2.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  Proposer un Rasso
                </button>
              </div>
            </div>

            {/* Comprehensive Search & Filters */}
            <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 mb-8 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Filtrer par nom, lieu, Toyota..."
                    value={filters.searchQuery}
                    onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 bg-stone-950 border border-stone-800 rounded-lg text-xs text-stone-100 placeholder-stone-500 focus:border-amber-500 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <select
                    value={filters.terrain}
                    onChange={(e) => setFilters({ ...filters, terrain: e.target.value })}
                    className="w-full py-2 px-3 bg-stone-950 border border-stone-800 rounded-lg text-xs text-stone-200 font-mono"
                  >
                    <option value="Tous">Tous les Terrains</option>
                    <option value="Bourbier & Glaise">Bourbier & Glaise</option>
                    <option value="Piste & Bivouac Forestier">Piste & Bivouac Forestier</option>
                    <option value="Franchissement Rocailleux">Franchissement Rocailleux</option>
                    <option value="Trial 4x4 Extrême">Trial 4x4 Extrême</option>
                    <option value="Sable & Dunes">Sable & Dunes</option>
                  </select>
                </div>

                <div>
                  <select
                    value={filters.difficulty}
                    onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
                    className="w-full py-2 px-3 bg-stone-950 border border-stone-800 rounded-lg text-xs text-stone-200 font-mono"
                  >
                    <option value="Toutes">Toutes Difficultés</option>
                    <option value="Vert">Vert (Tout 4x4 d'origine)</option>
                    <option value="Bleu">Bleu (Pneus AT + Rehausse)</option>
                    <option value="Rouge">Rouge (Pneus Mud + Treuil)</option>
                    <option value="Noir">Noir (Extrême + Blocages)</option>
                  </select>
                </div>

                <div>
                  <select
                    value={filters.region}
                    onChange={(e) => setFilters({ ...filters, region: e.target.value })}
                    className="w-full py-2 px-3 bg-stone-950 border border-stone-800 rounded-lg text-xs text-stone-200 font-mono"
                  >
                    <option value="Toutes">Toutes Régions</option>
                    {uniqueRegions.map((reg) => (
                      <option key={reg} value={reg}>
                        {reg}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Filter checkables */}
              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
                <label className="flex items-center gap-2 p-1.5 px-3 rounded-lg bg-stone-950 border border-stone-800 cursor-pointer text-stone-300">
                  <input
                    type="checkbox"
                    checked={filters.onlyToyotaFriendly}
                    onChange={(e) => setFilters({ ...filters, onlyToyotaFriendly: e.target.checked })}
                    className="rounded border-stone-700 text-amber-500"
                  />
                  <span className="font-chakra font-bold text-amber-400">Spécial Toyota LC76 & Série 7</span>
                </label>

                <label className="flex items-center gap-2 p-1.5 px-3 rounded-lg bg-stone-950 border border-stone-800 cursor-pointer text-stone-300">
                  <input
                    type="checkbox"
                    checked={filters.onlyBivouac}
                    onChange={(e) => setFilters({ ...filters, onlyBivouac: e.target.checked })}
                    className="rounded border-stone-700 text-amber-500"
                  />
                  <span>Avec Bivouac de Nuit</span>
                </label>
              </div>
            </div>

            {/* Rassos Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRassos.map((rasso) => (
                <RassoCard
                  key={rasso.id}
                  rasso={rasso}
                  onSelect={(r) => setSelectedRassoForDetail(r)}
                  onRegister={(r) => handleOpenRegistration(r)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: My Passes */}
        {activeTab === 'my-passes' && (
          <MyPassesModal
            passes={passes}
            onRemovePass={handleRemovePass}
            onExploreRassos={() => setActiveTab('rassos')}
          />
        )}

        {/* Tab 4: Propose a Rasso */}
        {activeTab === 'propose' && (
          <div className="max-w-3xl mx-auto px-4 py-12">
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-xl flex items-center justify-center mx-auto mb-3 border border-amber-500/20">
                <PlusCircle className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-chakra font-bold text-stone-100 uppercase">
                Référencer un Rassemblement 4x4
              </h2>
              <p className="text-sm text-stone-400 max-w-md mx-auto">
                Vous êtes un club 4x4, un gestionnaire de domaine tout-terrain ou un organisateur de raids ? Publiez votre rasso gratuitement.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-stone-900 border border-stone-800 text-center">
              <p className="text-stone-300 text-sm mb-6 leading-relaxed">
                Remplissez les caractéristiques du terrain (bourbiers, roche, sable), les équipements de sécurité exigés (treuil, sangle cinétique, snorkel) et ouvrez les inscriptions aux pilotes.
              </p>
              <button
                onClick={() => setIsCreateRassoOpen(true)}
                className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-chakra font-bold text-base px-8 py-3.5 rounded-lg shadow-xl shadow-amber-600/30 transition-all cursor-pointer"
              >
                Ouvrir le Formulaire de Création de Rasso
              </button>
            </div>
          </div>
        )}

        {/* Tab 5: Prompt Generator View */}
        {activeTab === 'prompt-view' && <PromptViewerModal />}

      </main>

      {/* Rasso Detail Modal */}
      <RassoDetailModal
        rasso={selectedRassoForDetail}
        onClose={() => setSelectedRassoForDetail(null)}
        onRegister={(r) => handleOpenRegistration(r)}
      />

      {/* Pilot Registration Modal */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        rassos={rassos}
        selectedRasso={selectedRassoForRegistration}
        onSuccessRegistration={handleSuccessRegistration}
      />

      {/* Create Rasso Modal */}
      <CreateRassoModal
        isOpen={isCreateRassoOpen}
        onClose={() => setIsCreateRassoOpen(false)}
        onAddRasso={handleAddRasso}
      />

      {/* Off-Road Footer */}
      <footer className="bg-stone-950 border-t border-stone-800/80 py-12 px-4 sm:px-6 lg:px-8 text-stone-400 text-xs font-mono">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-stone-900 border border-amber-500/50 rounded flex items-center justify-center text-amber-400 font-bold">
              4X4
            </div>
            <div>
              <div className="text-stone-200 font-chakra font-bold text-sm uppercase">
                MUD & TRAILS • RASSO TOUT-TERRAIN
              </div>
              <div className="text-stone-500 text-[11px]">
                En hommage au légendaire Toyota Land Cruiser LC76 Mud Edition
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
            <span className="text-amber-400">RADIO CB : CH-16</span>
            <span>•</span>
            <button
              onClick={() => setActiveTab('prompt-view')}
              className="hover:text-amber-400 underline transition-colors"
            >
              Afficher le Prompt IA
            </button>
            <span>•</span>
            <span>DOMAINE PRIVÉ HOMOLOGUÉ</span>
            <span>•</span>
            <span>SANGLES CINÉTIQUES & TREUILS EXIGÉS</span>
          </div>

          <div className="text-stone-500 text-[11px]">
            © {new Date().getFullYear()} Mud & Trails France. Tous droits réservés.
          </div>
        </div>
      </footer>

    </div>
  );
}
