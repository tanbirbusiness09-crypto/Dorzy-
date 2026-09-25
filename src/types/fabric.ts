export type FabricOrigin = 'Japan' | 'England' | 'Italy' | 'Switzerland' | 'Korea' | 'Egypt';

export type FabricSeason = 'all_year' | 'summer' | 'winter';

export interface DetailedFabric {
  id: string;
  name: string;
  nameAr: string;
  millBrand: string; // e.g. "Toyobo (اليابان)" or "Scabal (إنجلترا)"
  origin: string;
  originAr: string;
  composition: string; // e.g. "100% Spun Poly-Cotton"
  compositionAr: string;
  weightGsm: number; // e.g. 180 gsm
  weaveType: string; // e.g. "Fine Twill (تويل ناعم)"
  weaveTypeAr: string;
  season: FabricSeason;
  seasonAr: string;
  pricePerMeterSar?: number;
  standingSurchargeSar?: number;
  textureDescription: string;
  textureDescriptionAr: string;
  wrinkleResistance: 'High' | 'Very High' | 'Moderate';
  breathability: 'High' | 'Very High' | 'Medium';
  availableColors: { name: string; nameAr: string; hex: string }[];
  isPremium: boolean;
  sampleAvailable: boolean;
}
