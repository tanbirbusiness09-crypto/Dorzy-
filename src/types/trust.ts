export type VerificationLevel = 'basic' | 'business_certified' | 'master_artisan' | 'premium_atelier';

export interface TrustVerification {
  isVerifiedShop: boolean;
  isVerifiedTailor: boolean;
  isCommercialRegistered: boolean; // CR Number verified (Saudi Ministry of Commerce)
  isPhysicalLocationVerified: boolean;
  isOrderReviewVerified?: boolean;
  vatNumber?: string;
  crNumber?: string;
  badgeLevel: VerificationLevel;
}

export interface RatingBreakdown {
  score: number; // e.g. 4.9
  reviewCount: number; // e.g. 210
  source: 'platform' | 'google';
  distribution?: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export interface TrustMetrics {
  rating: number; // Combined or primary platform rating
  reviewCount: number;
  platformRating?: RatingBreakdown;
  googleRating?: RatingBreakdown; // Distinguished Google Places rating
  completedOrdersCount: number;
  yearsOfExperience: number;
  onTimeDeliveryRate?: number;
}

export interface CustomerReview {
  id: string;
  customerName: string;
  customerAvatar?: string;
  rating: number;
  date: string;
  dateAr?: string;
  isVerifiedOrder: boolean;
  comment: string;
  commentAr?: string;
  targetType: 'shop' | 'tailor';
  targetId: string;
  targetName: string;
  targetNameAr?: string;
  serviceOrdered?: string;
  serviceOrderedAr?: string;
  helpfulCount?: number;
}
