export type CollaborationStatus = 'pending' | 'reviewed' | 'accepted' | 'declined';

export interface CollaborationRequest {
  id: string;
  shopId: string;
  shopName: string;
  shopCity: string;
  tailorId: string;
  tailorName: string;
  proposedRole: string; // e.g. "Senior Master Cutter"
  contractType: 'full_time' | 'seasonal_contract' | 'per_piece_commission';
  monthlyOfferSar?: number;
  perPieceOfferSar?: number;
  message: string;
  status: CollaborationStatus;
  sentAt: string;
}

export interface TailorJobPost {
  id: string;
  shopId: string;
  shopName: string;
  city: string;
  title: string;
  titleAr: string;
  requiredSpecialties: string[];
  experienceRequiredYears: number;
  salaryRangeSar: {
    min: number;
    max: number;
  };
  accommodationProvided: boolean;
  status: 'active' | 'closed';
  postedAt: string;
}
