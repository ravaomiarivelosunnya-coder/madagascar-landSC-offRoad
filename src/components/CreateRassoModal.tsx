import React, { useState } from 'react';
import { X, PlusCircle, Calendar, MapPin, AlertTriangle, ShieldCheck, Mountain } from 'lucide-react';
import { RassoEvent, TerrainType, DifficultyLevel } from '../types';

interface CreateRassoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddRasso: (rasso: RassoEvent) => void;
}

export const CreateRassoModal: React.FC<CreateRassoModalProps> = ({
  isOpen,
  onClose,
  onAddRasso,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [dateStart, setDateStart] = useState('2026-11-20');
  const [dateEnd, setDateEnd] = useState('2026-11-22');
  const [spotName, setSpotName] = useState('');
  const [city, setCity] = useState('');
  const [department, setDepartment] = useState('');
  const [region, setRegion] = useState('Auvergne-Rhône-Alpes');
  const [gpsCoords, setGpsCoords] = useState('45.1234° N, 5.6789° E');
  const [terrain, setTerrain] = useState<TerrainType>('Bourbier & Glaise');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('Rouge (Pneus Mud + Rehausse)');
  const [maxVehicles, setMaxVehicles] = useState(35);
  const [entryFeeEuro, setEntryFeeEuro] = useState(80);
  const [clubName, setClubName] = useState('Club 4x4 Tout-Terrain');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [radioChannel, setRadioChannel] = useState('Canal 16 CB');
  const [keyVehicle, setKeyVehicle] = useState('Toyota Land Cruiser LC76 / Série 7');
  const [bivouacAllowed, setBivouacAllowed] = useState(true);
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !spotName || !city) {
      alert('Veuillez renseigner le nom du rasso, le spot et la ville.');
      return;
    }

    const newRasso: RassoEvent = {
      id: `rasso-${Date.now().toString(36)}`,
      title,
      subtitle: subtitle || 'Rassemblement 4x4 et franchissement tout-terrain',
      dateStart,
      dateEnd,
      location: {
        spotName,
        city,
        department: department || 'France',
        region,
        gpsCoords,
      },
      terrain,
      difficulty,
      maxVehicles: Number(maxVehicles),
      registeredVehicles: 1, // Organizer vehicle
      entryFeeEuro: Number(entryFeeEuro),
      organizer: {
        clubName,
        contactName: contactName || 'Organisateur 4x4',
        phone: phone || '06 00 00 00 00',
        email: email || 'contact@4x4club.fr',
        radioChannel,
      },
      keyVehicleFeatured: keyVehicle,
      requiredEquipments: [
        'Pneus Tout-Terrain ou Mud-Terrain',
        'Sangles cinétiques + manilles de traction',
        'Extincteur et trousse de secours',
        'Points de remorquage solides',
      ],
      recommendedVehicles: ['Toyota Land Cruiser (LC76, LC80)', 'Nissan Patrol', 'Land Rover Defender', 'Jeep Wrangler'],
      schedule: [
        { time: 'Jour 1 - 08h30', activity: 'Accueil & vérification des sangles', description: 'Briefing convoi et répartition des groupes selon niveau.' },
        { time: 'Jour 1 - 10h00', activity: 'Départ des zones de bourbiers & trial', description: 'Ateliers franchissement et assistance collective.' },
        { time: 'Jour 2 - 10h00', activity: 'Randonnée technique & bivouac', description: 'Parcours en sous-bois et débriefing matériel.' },
      ],
      bivouacAllowed,
      waterPointAvailable: true,
      technicalAssistance: true,
      description: description || 'Rassemblement amical tout-terrain ouvert aux passionnés de 4x4 avec boîte courte, entraide et convivialité garanties.',
      highlights: [
        'Zones techniques et bourbiers naturels',
        'Échange de conseils mécaniques et pilotage',
        'Convivialité feu de camp le soir',
      ],
      coverImage: '/toyota_lc76_mud.jpg',
    };

    onAddRasso(newRasso);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-stone-950 px-6 py-4 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg border border-amber-500/30">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-chakra font-bold text-stone-100 uppercase tracking-wide">
                Proposer un Nouveau Rassemblement 4x4
              </h2>
              <p className="text-xs text-stone-400 font-mono">
                Publication communautaire • Pistes & Terrains privés
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[calc(85vh-10rem)] overflow-y-auto">
          
          {/* Main Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-mono text-stone-400 mb-1">Nom du Rassemblement *</label>
              <input
                type="text"
                required
                placeholder="ex: Mud Party Cévennes - Spécial Toyota LC76 & Franchisseurs"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-sm text-stone-100 font-chakra font-bold focus:border-amber-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-mono text-stone-400 mb-1">Sous-titre accrocheur</label>
              <input
                type="text"
                placeholder="ex: Week-end franchissement dans les ornières et bivouac trappeur"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-300 focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-stone-400 mb-1">Date de début</label>
              <input
                type="date"
                value={dateStart}
                onChange={(e) => setDateStart(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-sm text-stone-100 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-stone-400 mb-1">Date de fin</label>
              <input
                type="date"
                value={dateEnd}
                onChange={(e) => setDateEnd(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-sm text-stone-100 font-mono"
              />
            </div>
          </div>

          {/* Location details */}
          <div className="p-4 rounded-xl bg-stone-950/70 border border-stone-800 space-y-4">
            <div className="text-xs font-mono text-amber-400 font-bold uppercase flex items-center gap-1.5">
              <MapPin className="w-4 h-4" /> Localisation du Spot Tout-Terrain
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-mono text-stone-400 mb-1">Nom du Spot / Domaine *</label>
                <input
                  type="text"
                  required
                  placeholder="ex: Domaine 4x4 des Combettes"
                  value={spotName}
                  onChange={(e) => setSpotName(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-stone-100"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-stone-400 mb-1">Ville la plus proche *</label>
                <input
                  type="text"
                  required
                  placeholder="ex: Valence"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-stone-100"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-stone-400 mb-1">Région</label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-stone-100"
                >
                  <option value="Auvergne-Rhône-Alpes">Auvergne-Rhône-Alpes</option>
                  <option value="Centre-Val de Loire">Centre-Val de Loire</option>
                  <option value="Occitanie">Occitanie</option>
                  <option value="Bourgogne-Franche-Comté">Bourgogne-Franche-Comté</option>
                  <option value="Provence-Alpes-Côte d’Azur">Provence-Alpes-Côte d’Azur</option>
                  <option value="Nouvelle-Aquitaine">Nouvelle-Aquitaine</option>
                  <option value="Normandie">Normandie</option>
                  <option value="Grand Est">Grand Est</option>
                </select>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs font-mono text-stone-400 mb-1">Coordonnées GPS</label>
                <input
                  type="text"
                  placeholder="ex: 45.1885° N, 5.7245° E"
                  value={gpsCoords}
                  onChange={(e) => setGpsCoords(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-stone-100 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Off-Road Parameters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono text-stone-400 mb-1">Type de Terrain</label>
              <select
                value={terrain}
                onChange={(e: any) => setTerrain(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-100"
              >
                <option value="Bourbier & Glaise">Bourbier & Glaise</option>
                <option value="Piste & Bivouac Forestier">Piste & Bivouac Forestier</option>
                <option value="Franchissement Rocailleux">Franchissement Rocailleux</option>
                <option value="Trial 4x4 Extrême">Trial 4x4 Extrême</option>
                <option value="Sable & Dunes">Sable & Dunes</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-stone-400 mb-1">Niveau de Difficulté</label>
              <select
                value={difficulty}
                onChange={(e: any) => setDifficulty(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-100"
              >
                <option value="Vert (Tout 4x4 d’origine)">Vert (Tous 4x4 d'origine)</option>
                <option value="Bleu (Pneus AT + Protection)">Bleu (Pneus AT + Blindages)</option>
                <option value="Rouge (Pneus Mud + Rehausse)">Rouge (Pneus Mud + Rehausse)</option>
                <option value="Noir (Treuil obligatoire + Blocages)">Noir (Treuil + Blocages)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-stone-400 mb-1">Nombre max de 4x4</label>
              <input
                type="number"
                min="5"
                max="100"
                value={maxVehicles}
                onChange={(e) => setMaxVehicles(Number(e.target.value))}
                className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-100 font-mono"
              />
            </div>
          </div>

          {/* Pricing & Key vehicle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-stone-400 mb-1">Tarif par équipage (€)</label>
              <input
                type="number"
                min="0"
                value={entryFeeEuro}
                onChange={(e) => setEntryFeeEuro(Number(e.target.value))}
                className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-100 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-stone-400 mb-1">Véhicule Mis à l'Honneur</label>
              <input
                type="text"
                value={keyVehicle}
                onChange={(e) => setKeyVehicle(e.target.value)}
                placeholder="Toyota Land Cruiser LC76 Mud"
                className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-xs text-amber-300 font-chakra font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-stone-400 mb-1">Description du rasso & consignes</label>
            <textarea
              rows={3}
              placeholder="Précisez le type de parcours, les règles de sécurité, le campement de nuit..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-stone-950 border border-stone-800 rounded-lg p-3 text-xs text-stone-200 focus:border-amber-500"
            />
          </div>

          {/* Action */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-stone-800">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 text-xs font-mono text-stone-400 hover:text-white"
            >
              Annuler
            </button>
            <button
              id="btn-submit-new-rasso"
              type="submit"
              className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-chakra font-bold py-2.5 px-6 rounded-lg transition-colors cursor-pointer"
            >
              Publier le Rassemblement 4x4
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
