export type SortOption =
  | 'recommended'
  | 'nearest'
  | 'highest_rated'
  | 'lowest_price'
  | 'highest_price'
  | 'most_reviewed'
  | 'most_experienced';

export interface DiscoveryFilterState {
  searchQuery: string;
  city: string;
  neighborhood: string;
  distanceKm: number; // 2, 5, 10, 25, 50, 999 (any)
  services: string[];
  ratingMin: number; // 0, 3.0, 3.5, 4.0, 4.5
  priceMin: number;
  priceMax: number;
  fabrics: string[];
  homeMeasurement: 'all' | 'available';
  delivery: 'all' | 'delivery' | 'pickup' | 'both';
  openNow: boolean;
  minExperienceYears: number; // 0, 1, 3, 5, 10
  verificationTypes: string[]; // 'verified_shop', 'verified_business', 'verified_location'
  sort: SortOption;
  viewMode: 'split' | 'list_only' | 'map_only';
}

export const initialDiscoveryFilterState: DiscoveryFilterState = {
  searchQuery: '',
  city: 'all',
  neighborhood: 'all',
  distanceKm: 50,
  services: [],
  ratingMin: 0,
  priceMin: 50,
  priceMax: 1500,
  fabrics: [],
  homeMeasurement: 'all',
  delivery: 'all',
  openNow: false,
  minExperienceYears: 0,
  verificationTypes: [],
  sort: 'recommended',
  viewMode: 'split',
};
