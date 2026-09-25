import { TailorSpecialty } from './tailor';

export type DesignCategory =
  | 'All'
  | 'Saudi Thobe'
  | 'Kuwaiti Thobe'
  | 'Emirati Thobe'
  | 'Qatari Thobe'
  | 'Bahraini Thobe'
  | 'Omani Style'
  | 'Jubba'
  | 'Dagla'
  | 'Balto'
  | 'Formal Wear'
  | 'Embroidery'
  | 'Collar Designs'
  | 'Cuff Designs'
  | 'Fabric'
  | 'Alterations'
  | 'Custom Designs'
  | 'Ceremonial Bisht';

export type DesignStyle =
  | 'Saudi'
  | 'Kuwaiti'
  | 'Emirati'
  | 'Qatari'
  | 'Bahraini'
  | 'Omani'
  | 'Modern'
  | 'Gulf Heritage';

export type DesignType =
  | 'Thobe'
  | 'Jubba'
  | 'Dagla'
  | 'Balto'
  | 'Formal'
  | 'Embroidery'
  | 'Alteration'
  | 'Custom';

export type CreatorType = 'tailor' | 'shop';

export interface PortfolioItem {
  id: string;
  slug: string;
  title: string;
  titleAr: string;
  specialty: TailorSpecialty | string;
  specialtyAr: string;
  category: string;
  categoryAr: string;
  style: DesignStyle;
  styleAr: string;
  designType: DesignType;
  designTypeAr: string;
  shortDescription?: string;
  shortDescriptionAr?: string;
  description?: string;
  descriptionAr?: string;
  
  // Creator attribution
  creatorType: CreatorType;
  creatorId: string;
  creatorSlug: string;
  creatorName: string;
  creatorNameAr: string;
  creatorAvatar?: string;
  creatorTitle?: string;
  creatorTitleAr?: string;
  creatorRating: number;
  creatorReviewCount: number;
  isVerified: boolean;

  // Shop & Tailor specifics
  tailorId: string;
  tailorSlug?: string;
  tailorName: string;
  tailorNameAr: string;
  shopId?: string;
  shopSlug?: string;
  shopName?: string;
  shopNameAr?: string;

  // Location
  city: string;
  cityAr: string;
  district: string;
  districtAr: string;
  distanceKm: number;

  // Media
  mediaType: 'image' | 'video';
  imageUrl?: string;
  images: string[];
  videoUrl?: string;
  videoThumbnail?: string;
  videoDuration?: string;

  // Garment Anatomy & Craftsmanship
  fabricDetails: string;
  fabricDetailsAr: string;
  fabricOrigin?: string;
  fabricOriginAr?: string;
  collarStyle: string; // e.g. "Royal High Stiff (قلاب ملكي)"
  collarStyleAr: string;
  cuffStyle: string; // e.g. "French Double Cuff (كبك مزدوج)"
  cuffStyleAr: string;
  pocketStyle?: string;
  pocketStyleAr?: string;
  stitchingType?: string;
  stitchingTypeAr?: string;
  embroideryDetails?: string;
  embroideryDetailsAr?: string;
  occasion?: string;
  occasionAr?: string;
  priceSar: number;
  turnaroundDays?: number;

  // Engagement & Status
  isAvailableForOrder: boolean; // available for order vs inspiration only
  rating: number;
  reviewCount?: number;
  likesCount: number;
  savesCount: number;
  viewsCount: number;
  tags: string[];
  tagsAr?: string[];
  createdAt?: string;
}

export type DesignItem = PortfolioItem;
