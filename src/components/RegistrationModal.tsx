import React, { useState } from 'react';
import { 
  X, CheckCircle2, ShieldCheck, Truck, User, Radio, 
  Flame, Tent, AlertCircle, Sparkles, QrCode, Download, Printer,
  Eye, Image as ImageIcon, MapPin, Compass
} from 'lucide-react';
import { RassoEvent, PilotRegistration } from '../types';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  rassos: RassoEvent[];
  selectedRasso: RassoEvent | null;
  onSuccessRegistration: (registration: PilotRegistration) => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  rassos,
  selectedRasso,
  onSuccessRegistration,
}) => {
  if (!isOpen) return null;

  const defaultRassoId = selectedRasso ? selectedRasso.id : rassos[0]?.id || '';
  const [chosenRassoId, setChosenRassoId] = useState<string>(defaultRassoId);

  // Background scenic preview toggle & visibility intensity
  const [showScenicPreview, setShowScenicPreview] = useState<boolean>(false);
  const [bgVisibility, setBgVisibility] = useState<'vivid' | 'ultra' | 'balanced'>('vivid');

  // Form State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [callsign, setCallsign] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');

  // 4x4 Specs State
  const [brand, setBrand] = useState('Toyota');
  const [model, setModel] = useState('Land Cruiser LC76');
  const [year, setYear] = useState('2024');
  const [plate, setPlate] = useState('');
  const [tireType, setTireType] = useState<'Mud-Terrain (MT)' | 'Tout-Terrain (AT)' | 'Extrême Mud (Bogger)' | 'Route'>('Mud-Terrain (MT)');
  const [tireSize, setTireSize] = useState('285/75 R16 (33")');
  const [hasWinch, setHasWinch] = useState(true);
  const [hasSnorkel, setHasSnorkel] = useState(true);
  const [hasDiffLock, setHasDiffLock] = useState(true);
  const [liftHeight, setLiftHeight] = useState('+5 cm (OME)');

  // Gathering Options State
  const [passengersCount, setPassengersCount] = useState(1);
  const [bivouac, setBivouac] = useState(true);
  const [mealPackage, setMealPackage] = useState(true);
  const [cbChannel, setCbChannel] = useState('Canal 16 CB');
  const [specialNotes, setSpecialNotes] = useState('');

  // Step state
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [confirmedPass, setConfirmedPass] = useState<PilotRegistration | null>(null);

  const activeRasso = rassos.find((r) => r.id === chosenRassoId) || selectedRasso || rassos[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !model) {
      alert('Veuillez remplir les informations obligatoires (Nom, Prénom, Email, Modèle 4x4).');
      return;
    }

    const newRegistration: PilotRegistration = {
      id: `PASS-${Date.now().toString(36).toUpperCase()}`,
      rassoId: activeRasso.id,
      rassoTitle: activeRasso.title,
      createdAt: new Date().toISOString(),
      pilot: {
        firstName,
        lastName,
        callsign: callsign || `${firstName.toUpperCase()}-${model.split(' ')[0]}`,
        email,
        phone: phone || 'Non renseigné',
        emergencyContact: emergencyContact || 'À fournir au contrôle technique',
      },
      vehicle: {
        brand,
        model,
        year,
        licensePlate: plate || 'FR-4X4-MUD',
        tireType,
        tireSize,
        hasWinch,
        hasSnorkel,
        hasDiffLock,
        liftHeight,
      },
      passengersCount: Number(passengersCount),
      bivouacRequested: bivouac,
      mealPackage,
      cbVhfChannel: cbChannel,
      specialNotes,
      passStatus: 'CONFIRMÉ',
      qrCodeSeed: `MUDTRAILS-AUTH-${Date.now()}-${activeRasso.id}`,
    };

    onSuccessRegistration(newRegistration);
    setConfirmedPass(newRegistration);
    setStep(3);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-stone-950 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background Image: Paysage de terrasses & village d'altitude */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <img 
            src="/terrace_registration_bg.jpg"
            alt="Paysage de terrasses et village rural"
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover object-center transition-all duration-500 ${
              showScenicPreview 
                ? 'filter brightness-100 contrast-100 scale-100' 
                : bgVisibility === 'ultra'
                ? 'filter brightness-100 contrast-105 saturate-125 scale-105'
                : bgVisibility === 'vivid'
                ? 'filter brightness-[0.94] contrast-[1.10] saturate-[1.20] scale-105'
                : 'filter brightness-[0.78] contrast-[1.10] saturate-[1.10] scale-105'
            }`}
          />
          {/* Subtle multi-stop gradient overlay carefully calibrated so the terraced fields & village remain clearly visible */}
          {!showScenicPreview && (
            <div 
              className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
                bgVisibility === 'ultra'
                  ? 'bg-gradient-to-b from-stone-950/20 via-transparent to-stone-950/35'
                  : bgVisibility === 'vivid'
                  ? 'bg-gradient-to-b from-stone-950/35 via-stone-950/15 to-stone-950/50'
                  : 'bg-gradient-to-b from-stone-950/55 via-stone-950/30 to-stone-950/70'
              }`}
            />
          )}
        </div>

        {/* Header Bar */}
        <div className="relative z-10 bg-stone-950/80 backdrop-blur-md px-6 py-4 border-b border-stone-800/80 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg border border-amber-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-chakra font-bold text-stone-100 uppercase tracking-wide">
                  Fiche d'Inscription Pilote 4x4
                </h2>
                <span className="hidden md:inline-flex items-center gap-1 text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  <Compass className="w-3 h-3" /> Fond Terres & Terrasses
                </span>
              </div>
              <p className="text-xs text-stone-400 font-mono">
                Rasso Off-Road • Contrôle technique préalable
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Visibility Mode Switcher */}
            <button
              type="button"
              onClick={() => {
                setBgVisibility(prev => prev === 'vivid' ? 'ultra' : prev === 'ultra' ? 'balanced' : 'vivid');
              }}
              className="px-2.5 py-1.5 rounded-lg bg-stone-900/80 hover:bg-stone-800 text-stone-200 hover:text-amber-400 border border-stone-800 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Changer l'intensité du fond"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[11px] hidden sm:inline">Fond :</span>
              <span className="text-[11px] text-amber-300 font-bold uppercase">
                {bgVisibility === 'ultra' ? '100% Éclat' : bgVisibility === 'vivid' ? 'Vibrant' : 'Équilibré'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setShowScenicPreview(!showScenicPreview)}
              className="px-2.5 py-1.5 rounded-lg bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-amber-400 border border-stone-800 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
              title={showScenicPreview ? "Revenir au formulaire" : "Admirer le paysage en grand"}
            >
              {showScenicPreview ? (
                <>
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[11px]">Formulaire</span>
                </>
              ) : (
                <>
                  <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[11px] hidden sm:inline">Aperçu Photo</span>
                </>
              )}
            </button>

            <button
              id="btn-close-registration"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-stone-900/80 hover:bg-stone-800 text-stone-400 hover:text-white border border-stone-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scenic Full View Overlay Mode if user wants to admire the photo */}
        {showScenicPreview ? (
          <div className="relative z-10 p-6 min-h-[420px] flex flex-col justify-end bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent">
            <div className="bg-stone-950/80 backdrop-blur-md p-4 rounded-xl border border-stone-800/80 max-w-xl">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase mb-1">
                <MapPin className="w-4 h-4" />
                <span>ZONE D'ÉVOLUTION & BIVOUAC NATURE</span>
              </div>
              <h3 className="text-lg font-chakra font-bold text-stone-100 uppercase">
                Plateau des Hautes Terres & Terrasses Verdoyantes
              </h3>
              <p className="text-xs text-stone-300 font-mono mt-1 leading-relaxed">
                Ce panorama de villages traditionnels et rizières en gradins sert de cadre authentique pour l'accès aux pistes d'altitude, franchissements de crêtes et campements de nuit.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowScenicPreview(false)}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-chakra font-bold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Continuer mon Inscription →
                </button>
                <span className="text-[11px] font-mono text-stone-400">
                  Photo active en arrière-plan du formulaire
                </span>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Step Indicator (if not completed) */}
            {step !== 3 && (
              <div className="relative z-10 px-6 py-3 bg-stone-950/70 backdrop-blur-md border-b border-stone-800/80 flex items-center justify-between text-xs font-mono">
                <div className={`flex items-center gap-2 ${step === 1 ? 'text-amber-400 font-bold' : 'text-stone-400'}`}>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${step === 1 ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-stone-800'}`}>1</span>
                  <span>Pilote & Événement</span>
                </div>
                <span className="text-stone-600">→</span>
                <div className={`flex items-center gap-2 ${step === 2 ? 'text-amber-400 font-bold' : 'text-stone-400'}`}>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${step === 2 ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-stone-800'}`}>2</span>
                  <span>Fiche 4x4 (Mud Specs)</span>
                </div>
                <span className="text-stone-600">→</span>
                <div className="flex items-center gap-2 text-stone-500">
                  <span className="w-5 h-5 rounded-full bg-stone-800 flex items-center justify-center text-xs">3</span>
                  <span>Pass Officiel</span>
                </div>
              </div>
            )}

            {/* Form Body */}
            <div className="relative z-10 p-6 max-h-[calc(85vh-12rem)] overflow-y-auto">
              
              {step === 1 && (
                <div className="space-y-5">
                  {/* Event selection banner */}
                  <div className="p-4 rounded-xl bg-stone-950/45 backdrop-blur-sm border border-stone-800/70 space-y-2 shadow-xl shadow-black/40">
                    <label className="block text-xs font-mono text-amber-400 uppercase font-semibold">
                      1. Sélectionner le Rassemblement 4x4
                    </label>
                    <select
                      id="select-registration-rasso"
                      value={chosenRassoId}
                      onChange={(e) => setChosenRassoId(e.target.value)}
                      className="w-full bg-stone-900/80 border border-stone-700/80 rounded-lg px-3 py-2.5 text-stone-100 text-sm focus:outline-none focus:border-amber-500 font-chakra"
                    >
                      {rassos.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.title} ({r.location.region} • {r.entryFeeEuro}€)
                        </option>
                      ))}
                    </select>

                    {activeRasso && (
                      <div className="text-xs text-stone-300 flex flex-wrap gap-3 pt-1 font-mono">
                        <span>Terrain : <strong className="text-amber-300">{activeRasso.terrain}</strong></span>
                        <span>•</span>
                        <span>Niveau : <strong className="text-stone-200">{activeRasso.difficulty}</strong></span>
                        <span>•</span>
                        <span>Places : <strong className="text-emerald-400">{activeRasso.maxVehicles - activeRasso.registeredVehicles} disp.</strong></span>
                      </div>
                    )}
                  </div>

                  {/* Pilot Personal info */}
                  <div className="p-4 rounded-xl bg-stone-950/45 backdrop-blur-sm border border-stone-800/70 shadow-xl shadow-black/40">
                    <h3 className="text-sm font-chakra font-bold text-stone-200 uppercase mb-3 flex items-center gap-2">
                      <User className="w-4 h-4 text-amber-500" /> Informations Pilote
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-stone-300 mb-1">Prénom *</label>
                        <input
                          id="input-pilot-firstname"
                          type="text"
                          required
                          placeholder="Thomas"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full bg-stone-900/80 border border-stone-700/80 rounded-lg px-3 py-2 text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-stone-300 mb-1">Nom *</label>
                        <input
                          id="input-pilot-lastname"
                          type="text"
                          required
                          placeholder="Garnier"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full bg-stone-900/80 border border-stone-700/80 rounded-lg px-3 py-2 text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-stone-300 mb-1">
                          Pseudo / Indicatif Radio (Callsign)
                        </label>
                        <input
                          id="input-pilot-callsign"
                          type="text"
                          placeholder="ex: LC76_MudTrack"
                          value={callsign}
                          onChange={(e) => setCallsign(e.target.value)}
                          className="w-full bg-stone-900/80 border border-stone-700/80 rounded-lg px-3 py-2 text-sm text-amber-300 font-mono focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-stone-300 mb-1">Email pour le Pass *</label>
                        <input
                          id="input-pilot-email"
                          type="email"
                          required
                          placeholder="pilote@tout-terrain.fr"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-stone-900/80 border border-stone-700/80 rounded-lg px-3 py-2 text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-stone-300 mb-1">Téléphone portable</label>
                        <input
                          id="input-pilot-phone"
                          type="tel"
                          placeholder="06 12 34 56 78"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-stone-900/80 border border-stone-700/80 rounded-lg px-3 py-2 text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-stone-300 mb-1">Contact d'urgence (Nom & Tél)</label>
                        <input
                          id="input-pilot-emergency"
                          type="text"
                          placeholder="ex: Sophie 06 99 88 77 66"
                          value={emergencyContact}
                          onChange={(e) => setEmergencyContact(e.target.value)}
                          className="w-full bg-stone-900/80 border border-stone-700/80 rounded-lg px-3 py-2 text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>
                  </div>

              {/* Action */}
              <div className="pt-4 flex justify-end">
                <button
                  id="btn-next-step-vehicle"
                  type="button"
                  onClick={() => {
                    if (!firstName || !lastName || !email) {
                      alert('Veuillez au moins renseigner votre Nom, Prénom et Email.');
                      return;
                    }
                    setStep(2);
                  }}
                  className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-chakra font-bold py-2.5 px-6 rounded-lg transition-colors cursor-pointer"
                >
                  Continuer vers la Fiche Véhicule 4x4 →
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-stone-950/45 backdrop-blur-sm border border-stone-800/70 shadow-xl shadow-black/40 space-y-4">
                <h3 className="text-sm font-chakra font-bold text-stone-200 uppercase flex items-center gap-2">
                  <Truck className="w-4 h-4 text-amber-500" /> Fiche Technique du Tout-Terrain
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-stone-300 mb-1">Marque du 4x4</label>
                    <select
                      id="select-vehicle-brand"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      className="w-full bg-stone-900/80 border border-stone-700/80 rounded-lg px-3 py-2 text-sm text-stone-100 focus:border-amber-500"
                    >
                      <option value="Toyota">Toyota (Land Cruiser / Hilux)</option>
                      <option value="Nissan">Nissan (Patrol / Terrano)</option>
                      <option value="Land Rover">Land Rover (Defender / Discovery)</option>
                      <option value="Jeep">Jeep (Wrangler Rubicon / Cherokee)</option>
                      <option value="Mercedes-Benz">Mercedes-Benz (Classe G)</option>
                      <option value="Suzuki">Suzuki (Jimny / Samurai)</option>
                      <option value="Autre 4x4">Autre Préparation Tout-Terrain</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-stone-300 mb-1">Modèle exact</label>
                    <input
                      id="input-vehicle-model"
                      type="text"
                      placeholder="ex: Land Cruiser LC76 Station Wagon"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      className="w-full bg-stone-900/80 border border-stone-700/80 rounded-lg px-3 py-2 text-sm text-stone-100 focus:border-amber-500 font-chakra font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-stone-300 mb-1">Immatriculation</label>
                    <input
                      id="input-vehicle-plate"
                      type="text"
                      placeholder="ex: AB-123-CD"
                      value={plate}
                      onChange={(e) => setPlate(e.target.value)}
                      className="w-full bg-stone-900/80 border border-stone-700/80 rounded-lg px-3 py-2 text-sm text-stone-100 font-mono uppercase"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-stone-300 mb-1">Année</label>
                    <input
                      id="input-vehicle-year"
                      type="text"
                      placeholder="ex: 2024"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="w-full bg-stone-900/80 border border-stone-700/80 rounded-lg px-3 py-2 text-sm text-stone-100 font-mono"
                    />
                  </div>
                </div>

                {/* Mud & Technical Equipment */}
                <div className="p-4 rounded-xl bg-stone-950/40 border border-stone-800/80 space-y-4">
                  <div className="text-xs font-mono text-amber-400 uppercase font-bold flex items-center gap-1.5">
                    <Flame className="w-4 h-4" /> Préparation Mud & Franchissement
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-stone-300 mb-1">Profil des Pneumatiques</label>
                      <select
                        id="select-tire-type"
                        value={tireType}
                        onChange={(e: any) => setTireType(e.target.value)}
                        className="w-full bg-stone-900/80 border border-stone-700/80 rounded-lg px-3 py-2 text-xs text-stone-100"
                      >
                        <option value="Mud-Terrain (MT)">Mud-Terrain (MT) - Crampons profonds</option>
                        <option value="Extrême Mud (Bogger)">Extrême Mud (Simex / Bogger / Silverstone)</option>
                        <option value="Tout-Terrain (AT)">All-Terrain (AT) renforcé</option>
                        <option value="Route">Route standard (Non recommandé)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-stone-300 mb-1">Dimension Pneus & Réhausse</label>
                      <input
                        id="input-tire-size"
                        type="text"
                        value={tireSize}
                        onChange={(e) => setTireSize(e.target.value)}
                        placeholder="ex: 285/75 R16 (33 pouces)"
                        className="w-full bg-stone-900/80 border border-stone-700/80 rounded-lg px-3 py-2 text-xs text-stone-100"
                      />
                    </div>
                  </div>

                  {/* Checkable off-road specs */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                    <label className="flex items-center gap-2 p-2.5 rounded-lg bg-stone-900/70 border border-stone-800/80 cursor-pointer text-xs hover:bg-stone-900 transition-colors">
                      <input
                        type="checkbox"
                        checked={hasWinch}
                        onChange={(e) => setHasWinch(e.target.checked)}
                        className="rounded border-stone-700 text-amber-500 focus:ring-amber-500"
                      />
                      <span className="text-stone-200">Treuil avant opérationnel</span>
                    </label>

                    <label className="flex items-center gap-2 p-2.5 rounded-lg bg-stone-900/70 border border-stone-800/80 cursor-pointer text-xs hover:bg-stone-900 transition-colors">
                      <input
                        type="checkbox"
                        checked={hasSnorkel}
                        onChange={(e) => setHasSnorkel(e.target.checked)}
                        className="rounded border-stone-700 text-amber-500 focus:ring-amber-500"
                      />
                      <span className="text-stone-200">Snorkel étanche</span>
                    </label>

                    <label className="flex items-center gap-2 p-2.5 rounded-lg bg-stone-900/70 border border-stone-800/80 cursor-pointer text-xs hover:bg-stone-900 transition-colors">
                      <input
                        type="checkbox"
                        checked={hasDiffLock}
                        onChange={(e) => setHasDiffLock(e.target.checked)}
                        className="rounded border-stone-700 text-amber-500 focus:ring-amber-500"
                      />
                      <span className="text-stone-200">Blocage(s) différentiel</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Bivouac & Comms Options */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-stone-950/45 backdrop-blur-sm border border-stone-800/70 shadow-xl shadow-black/40">
                <div>
                  <label className="block text-xs font-mono text-stone-300 mb-1">Nombre d'occupants</label>
                  <input
                    type="number"
                    min="1"
                    max="6"
                    value={passengersCount}
                    onChange={(e) => setPassengersCount(Number(e.target.value))}
                    className="w-full bg-stone-900/80 border border-stone-700/80 rounded-lg px-3 py-2 text-sm text-stone-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-stone-300 mb-1">Canal Radio CB / VHF</label>
                  <input
                    type="text"
                    value={cbChannel}
                    onChange={(e) => setCbChannel(e.target.value)}
                    placeholder="Canal 16 CB"
                    className="w-full bg-stone-900/80 border border-stone-700/80 rounded-lg px-3 py-2 text-sm text-stone-100 font-mono"
                  />
                </div>

                <div className="flex flex-col justify-end">
                  <label className="flex items-center gap-2 p-2.5 rounded-lg bg-stone-900/70 border border-stone-800/80 cursor-pointer text-xs hover:bg-stone-900 transition-colors">
                    <input
                      type="checkbox"
                      checked={bivouac}
                      onChange={(e) => setBivouac(e.target.checked)}
                      className="rounded border-stone-700 text-amber-500"
                    />
                    <span className="text-stone-200 flex items-center gap-1">
                      <Tent className="w-3.5 h-3.5 text-amber-400" /> Bivouac sur place
                    </span>
                  </label>
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="pt-4 flex items-center justify-between border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="py-2.5 px-4 text-sm text-stone-400 hover:text-white transition-colors"
                >
                  ← Retour
                </button>

                <button
                  id="btn-submit-registration"
                  type="button"
                  onClick={handleSubmit}
                  className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-chakra font-bold py-2.5 px-6 rounded-lg transition-all shadow-lg shadow-amber-600/30 cursor-pointer"
                >
                  Valider l'Inscription & Générer le Pass 4x4
                </button>
              </div>
            </div>
          )}

          {step === 3 && confirmedPass && (
            <div className="space-y-6 animate-in zoom-in-95 duration-300">
              
              <div className="text-center py-2">
                <div className="w-12 h-12 bg-amber-500/20 text-amber-400 border border-amber-500/40 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-chakra font-bold text-stone-100 uppercase">
                  Inscription Validée avec Succès !
                </h3>
                <p className="text-xs font-mono text-stone-400">
                  Votre Pass Numérique est prêt. Conservez-le pour le contrôle technique au bivouac.
                </p>
              </div>

              {/* Stylized Tactical 4x4 Pass */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-stone-900 via-stone-950 to-stone-900 border-2 border-amber-500/60 shadow-2xl relative overflow-hidden font-mono">
                
                {/* Tactical Corner stamps */}
                <div className="absolute top-2 left-2 text-[9px] text-stone-500 tracking-widest uppercase">
                  MUD & TRAILS • CONTRÔLE OFF-ROAD
                </div>
                <div className="absolute top-2 right-2 text-[9px] text-amber-500 font-bold">
                  STATUS: {confirmedPass.passStatus}
                </div>

                <div className="pt-4 pb-4 border-b border-stone-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-xs text-stone-400 uppercase">RASSEMBLEMENT OFF-ROAD</div>
                    <div className="text-xl font-bold font-chakra text-stone-100 uppercase">
                      {confirmedPass.rassoTitle}
                    </div>
                  </div>
                  <div className="sm:text-right">
                    <div className="text-xs text-stone-400">NUMÉRO DU PASS</div>
                    <div className="text-base font-bold text-amber-400">{confirmedPass.id}</div>
                  </div>
                </div>

                {/* Pilot & Vehicle Specs in Pass */}
                <div className="py-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-stone-500 block">PILOTE</span>
                    <strong className="text-stone-200">{confirmedPass.pilot.firstName} {confirmedPass.pilot.lastName}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block">INDICATIF RADIO</span>
                    <strong className="text-amber-400">{confirmedPass.pilot.callsign}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block">VÉHICULE</span>
                    <strong className="text-stone-200">{confirmedPass.vehicle.brand} {confirmedPass.vehicle.model}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block">PNEUMATIQUES</span>
                    <strong className="text-stone-200">{confirmedPass.vehicle.tireType}</strong>
                  </div>
                </div>

                {/* Tactical checklist verification */}
                <div className="py-3 px-3 rounded-lg bg-stone-950 border border-stone-800/80 text-[11px] flex flex-wrap gap-4 text-stone-300">
                  <span>Treuil : <strong className="text-amber-400">{confirmedPass.vehicle.hasWinch ? 'Oui (Vérifié)' : 'Non'}</strong></span>
                  <span>Snorkel : <strong className="text-amber-400">{confirmedPass.vehicle.hasSnorkel ? 'Oui' : 'Non'}</strong></span>
                  <span>Bivouac : <strong className="text-stone-200">{confirmedPass.bivouacRequested ? 'Oui' : 'Non'}</strong></span>
                  <span>CB Canal : <strong className="text-amber-400">{confirmedPass.cbVhfChannel}</strong></span>
                </div>

                {/* Simulated QR Code & Barcode */}
                <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/40 rounded flex items-center justify-center text-amber-400">
                      <QrCode className="w-8 h-8" />
                    </div>
                    <div className="text-[10px] text-stone-400 leading-tight">
                      <div>SEED : {confirmedPass.qrCodeSeed}</div>
                      <div>ÉMISSION : {new Date(confirmedPass.createdAt).toLocaleDateString('fr-FR')}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-chakra font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded border border-amber-500/30">
                      VÉHICULE EN CONVOI
                    </span>
                  </div>
                </div>

              </div>

              {/* Post Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex items-center gap-2 py-2 px-4 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-mono transition-colors"
                >
                  <Printer className="w-4 h-4" /> Imprimer le Pass
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="py-2.5 px-6 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-chakra font-bold text-sm transition-colors cursor-pointer"
                >
                  Accéder à l'Accueil & Mes Inscriptions
                </button>
              </div>

            </div>
          )}

        </div>
          </>
        )}
      </div>
    </div>
  );
};
