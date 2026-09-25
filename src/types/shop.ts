import { TrustMetrics, TrustVerification } from './trust';

export type SaudiCity = 'Riyadh' | 'Jeddah' | 'Dammam' | 'Khobar' | 'Makkah' | 'Madinah' | 'Al-Ahsa' | 'Abha';

export interface ShopOperatingHours {
  openTime: string; // e.g. "09:30 AM"
  closeTime: string; // e.g. "11:00 PM"
  prayerBreak?: string;
  isFridayOpen: boolean;
  fridayOpenTime?: string;
  isOpenNow?: boolean;
  statusNote?: string;
  statusNoteAr?: string;
}

export interface ShopLocation {
  city: SaudiCity;
  cityAr: string;
  district: string;
  districtAr: string;
  streetName: string;
  streetNameAr: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  distanceKm?: number;
}

export interface Shop {
  id: string;
  ownerId: string;
  name: string;
  nameAr: string;
  slug: string;
  tagline: string;
  taglineAr: string;
  description: string;
  descriptionAr: string;
  logoUrl?: string;
  coverImageUrl?: string;
  location: ShopLocation;
  operatingHours: ShopOperatingHours;
  trust: TrustVerification;
  metrics: TrustMetrics;
  startingPriceSar: number;
  priceRange?: {
    min: number;
    max: number;
  };
  featuredServices: string[];
  featuredServicesAr: string[];
  fabrics?: string[];
  fabricsAr?: string[];
  hasHomeMeasurement: boolean;
  hasExpressDelivery: boolean;
  hasPickup?: boolean;
  tailorStaffCount: number;
  establishedYear: number;
  phone: string;
  portfolioPreviewCount?: number;
  whatsapp?: string;
  languages?: string[];
  languagesAr?: string[];
  specialties?: string[];
  specialtiesAr?: string[];
  paymentMethods?: string[];
  paymentMethodsAr?: string[];
  addressDirections?: string;
  addressDirectionsAr?: string;
  parkingAvailable?: boolean;
}
