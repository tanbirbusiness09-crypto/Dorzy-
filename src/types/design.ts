export type CreatorType = 'SHOP' | 'TAILOR' | 'shop' | 'tailor';

export type PriceType =
  | 'starting_at'
  | 'estimated'
  | 'custom_quote'
  | 'price_on_request'
  | 'inspiration_only';

export type VerifiedWorkType =
  | 'verified_order_work'
  | 'verified_shop_portfolio'
  | 'verified_tailor_portfolio';

export interface DesignMedia {
  id: string;
  type: 'image' | 'video' | 'beforeAfter';
  url: string;
  thumbnail?: string;
  duration?: string;
  alt: string;
  altAr?: string;
  // Before / After specific fields
  beforeUrl?: string;
  afterUrl?: string;
  beforeLabel?: string;
  beforeLabelAr?: string;
  afterLabel?: string;
  afterLabelAr?: string;
  alterationType?: string;
  alterationTypeAr?: string;
}

export interface CraftDetailsData {
  style?: string;
  styleAr?: string;
  fabric?: string;
  fabricAr?: string;
  fabricMill?: string;
  fabricMillAr?: string;
  collar?: string;
  collarAr?: string;
  cuff?: string;
  cuffAr?: string;
  buttons?: string;
  buttonsAr?: string;
  embroidery?: string;
  embroideryAr?: string;
  stitching?: string;
  stitchingAr?: string;
  fit?: string;
  fitAr?: string;
  occasion?: string;
  occasionAr?: string;
  season?: string;
  seasonAr?: string;
}

export interface SavedDesign {
  id: string;
  customerId: string;
  designId: string;
  createdAt: string;
}

export interface Design {
  id: string;
  slug: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  shortDescription?: string;
  shortDescriptionAr?: string;
  category: string;
  categoryAr: string;
  style: string;
  styleAr: string;
  designType: string;
  designTypeAr: string;
  
  // Creator attribution
  creatorType: CreatorType;
  creatorId: string;
  creatorSlug: string;
  creatorName: string;
  creatorNameAr: string;
  creatorAvatar?: string;
  creatorRating: number;
  creatorReviewCount: number;
  isVerifiedCreator: boolean;
  
  // Shop ↔ Tailor relationship
  shopId?: string;
  shopSlug?: string;
  shopName?: string;
  shopNameAr?: string;
  tailorId?: string;
  tailorSlug?: string;
  tailorName?: string;
  tailorNameAr?: string;
  tailorExperienceYears?: number;
  tailorSpecialty?: string;
  tailorSpecialtyAr?: string;

  // Location
  city: string;
  cityAr: string;
  district?: string;
  districtAr?: string;
  distanceKm: number;

  // Media
  media: DesignMedia[];
  mediaType: 'image' | 'video' | 'beforeAfter';
  primaryImage: string;

  // Sartorial details
  craftDetails: CraftDetailsData;
  priceType: PriceType;
  startingPrice?: number;
  priceNote?: string;
  priceNoteAr?: string;
  availability: 'available_for_order' | 'inspiration_only';
  verifiedType?: VerifiedWorkType;
  viewCount: number;
  saveCount: number;
  reviewCount?: number;
  rating?: number;
  createdAt: string;
  tags: string[];
  tagsAr?: string[];
  collectionName?: string;
  collectionNameAr?: string;
}
