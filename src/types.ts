export type TerrainType = 
  | 'Bourbier & Glaise'
  | 'Franchissement Rocailleux'
  | 'Piste & Bivouac Forestier'
  | 'Sable & Dunes'
  | 'Trial 4x4 Extrême';

export type DifficultyLevel = 
  | 'Vert (Tout 4x4 d’origine)'
  | 'Bleu (Pneus AT + Protection)'
  | 'Rouge (Pneus Mud + Rehausse)'
  | 'Noir (Treuil obligatoire + Blocages)';

export interface RassoEvent {
  id: string;
  title: string;
  subtitle: string;
  dateStart: string;
  dateEnd: string;
  location: {
    spotName: string;
    city: string;
    department: string;
    region: string;
    gpsCoords: string;
  };
  terrain: TerrainType;
  difficulty: DifficultyLevel;
  maxVehicles: number;
  registeredVehicles: number;
  entryFeeEuro: number;
  organizer: {
    clubName: string;
    contactName: string;
    phone: string;
    email: string;
    radioChannel: string;
  };
  keyVehicleFeatured: string; // e.g. "Toyota Land Cruiser LC76 / Série 7"
  requiredEquipments: string[];
  recommendedVehicles: string[];
  schedule: {
    time: string;
    activity: string;
    description: string;
  }[];
  bivouacAllowed: boolean;
  waterPointAvailable: boolean;
  technicalAssistance: boolean;
  description: string;
  highlights: string[];
  coverImage?: string;
}

export interface PilotRegistration {
  id: string;
  rassoId: string;
  rassoTitle: string;
  createdAt: string;
  pilot: {
    firstName: string;
    lastName: string;
    callsign: string; // e.g. "MudHunter76"
    email: string;
    phone: string;
    emergencyContact: string;
  };
  vehicle: {
    brand: string; // e.g. Toyota
    model: string; // e.g. Land Cruiser LC76
    year: string;
    licensePlate: string;
    tireType: 'Tout-Terrain (AT)' | 'Mud-Terrain (MT)' | 'Extrême Mud (Bogger)' | 'Route';
    tireSize: string;
    hasWinch: boolean;
    hasSnorkel: boolean;
    hasDiffLock: boolean;
    liftHeight: string; // e.g. +5cm
  };
  passengersCount: number;
  bivouacRequested: boolean;
  mealPackage: boolean;
  cbVhfChannel: string;
  specialNotes?: string;
  passStatus: 'CONFIRMÉ' | 'EN ATTENTE VÉRIFICATION';
  qrCodeSeed: string;
}

export interface RassoFilters {
  searchQuery: string;
  region: string;
  terrain: string;
  difficulty: string;
  onlyBivouac: boolean;
  onlyToyotaFriendly: boolean;
}
