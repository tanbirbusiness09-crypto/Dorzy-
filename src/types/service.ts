export type ServiceCategory =
  | 'thobe'
  | 'winter_wear'
  | 'ceremonial'
  | 'alteration'
  | 'bespoke_cut';

export interface FabricOption {
  id: string;
  name: string;
  nameAr: string;
  origin: string; // e.g. "Japan (Toyobo)" | "England (Huddersfield)" | "Switzerland"
  originAr: string;
  type: string; // "Cotton Blend" | "Pure Wool" | "Linen" | "Cashmere"
  typeAr: string;
  grade: string; // "Super 130s", "Imperial Royal"
  priceSurchargeSar: number;
}

export interface TailoringService {
  id: string;
  category: ServiceCategory;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  startingPriceSar: number;
  estimatedDays: number;
  expressDaysAvailable?: number;
  availableFabricsCount: number;
  includesHomeMeasurement: boolean;
  featuredFabricOptions?: FabricOption[];
}
