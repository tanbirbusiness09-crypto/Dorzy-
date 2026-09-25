import { TrustMetrics, TrustVerification } from './trust';
import { SaudiCity } from './shop';

export type TailorSpecialty =
  | 'Saudi Thobe'
  | 'Kuwaiti Thobe'
  | 'Emirati Thobe'
  | 'Emirati Style'
  | 'Qatari Thobe'
  | 'Qatari Style'
  | 'Bahraini Style'
  | 'Omani Style'
  | 'Jubba'
  | 'Dagla'
  | 'Balto'
  | 'Embroidery'
  | 'Embroidery & Zari'
  | 'Formal Wear'
  | 'Ceremonial Bisht'
  | 'Alterations'
  | 'Alterations & Restyling'
  | 'Custom Tailoring'
  | 'Custom Cut & Bespoke Fitting';

export type TailorAvailability = 'available' | 'busy' | 'available_soon';
export type TailorWorkType = 'full_time' | 'part_time' | 'independent' | 'shop_based' | 'collaboration';
export type TailorLanguage = 'Arabic' | 'English' | 'Urdu' | 'Hindi' | 'Bengali';

export interface TailorPortfolioThumbnail {
  id: string;
  category: 'thobe' | 'collar' | 'cuff' | 'embroidery' | 'jubba' | 'dagla' | 'formal';
  categoryLabel: string;
  categoryLabelAr: string;
  title: string;
  titleAr: string;
  imageUrl?: string;
  fabricNote?: string;
  fabricNoteAr?: string;
}

export interface TailorWorkHistoryItem {
  period: string;
  periodAr: string;
  role: string;
  roleAr: string;
  shopName: string;
  shopNameAr: string;
  location: string;
  locationAr: string;
  highlights: string[];
  highlightsAr: string[];
}

export interface TailorReviewItem {
  id: string;
  authorName: string;
  authorNameAr: string;
  avatarUrl?: string;
  date: string;
  dateAr: string;
  rating: number;
  garmentType: string;
  garmentTypeAr: string;
  comment: string;
  commentAr: string;
  verifiedPurchase: boolean;
  tailorResponse?: string;
  tailorResponseAr?: string;
}

export interface TailorServiceItem {
  id: string;
  title: string;
  titleAr: string;
  priceSar: number;
  durationDays: number;
  description: string;
  descriptionAr: string;
}

export interface TailorScheduleItem {
  days: string;
  daysAr: string;
  hours: string;
  hoursAr: string;
  status: 'active' | 'rest';
}

export interface Tailor {
  id: string;
  slug: string;
  name: string;
  nameAr: string;
  avatarUrl?: string;
  title: string;
  titleAr: string;
  primarySpecialty: TailorSpecialty;
  primarySpecialtyAr: string;
  specialties: TailorSpecialty[];
  specialtiesAr: string[];
  city: SaudiCity;
  cityAr: string;
  area: string;
  areaAr: string;
  distanceKm?: number;
  currentShopId?: string;
  currentShopName?: string;
  currentShopNameAr?: string;
  currentShopSlug?: string;
  availableForHire: boolean; // open for collaboration / shop proposals
  acceptsPrivateClients: boolean;
  availability: TailorAvailability;
  availabilityLabel?: string;
  availabilityLabelAr?: string;
  workType: TailorWorkType;
  workTypeLabel?: string;
  workTypeLabelAr?: string;
  yearsOfExperience: number;
  completedWorksCount: number;
  languages: TailorLanguage[];
  languagesAr: string[];
  skills: string[];
  skillsAr: string[];
  trust: TrustVerification;
  metrics: TrustMetrics;
  bio: string;
  bioAr: string;
  philosophy?: string;
  philosophyAr?: string;
  startingPriceSar: number;
  portfolioThumbnails: TailorPortfolioThumbnail[];
  workHistory?: TailorWorkHistoryItem[];
  ratingDistribution?: { 5: number; 4: number; 3: number; 2: number; 1: number };
  tailorReviews?: TailorReviewItem[];
  servicesOffered?: TailorServiceItem[];
  workingSchedule?: TailorScheduleItem[];
  lat?: number;
  lng?: number;
}

export type TailorSortOption =
  | 'recommended'
  | 'nearest'
  | 'highest_rated'
  | 'most_experienced'
  | 'most_reviewed'
  | 'recently_active';

export interface TailorFilterState {
  searchQuery: string;
  city: string; // 'all' or city name
  area: string; // 'all' or area name
  distanceKm: number; // 5, 10, 25, 50, 999
  specialties: string[];
  minExperienceYears: number; // 0, 1, 3, 5, 10, 15
  ratingMin: number; // 0, 3.0, 3.5, 4.0, 4.5
  availability: 'all' | TailorAvailability;
  shopStatus: 'all' | 'has_shop' | 'independent' | 'shop_based';
  languages: string[];
  verifiedOnly: boolean;
  workType: 'all' | TailorWorkType;
  sort: TailorSortOption;
}

export const initialTailorFilterState: TailorFilterState = {
  searchQuery: '',
  city: 'all',
  area: 'all',
  distanceKm: 50,
  specialties: [],
  minExperienceYears: 0,
  ratingMin: 0,
  availability: 'all',
  shopStatus: 'all',
  languages: [],
  verifiedOnly: false,
  workType: 'all',
  sort: 'recommended',
};
