export type BookingStatus =
  | 'DRAFT'
  | 'REQUESTED'
  | 'PENDING_CONFIRMATION'
  | 'CONFIRMED'
  | 'IN_PROGRESS'
  | 'READY'
  | 'COMPLETED'
  | 'CANCELLED';

export type PriceStatus = 'ESTIMATED' | 'FIXED' | 'QUOTE_REQUIRED' | 'CONFIRMED';

export type MeasurementMethodType = 'shop' | 'home' | 'saved' | 'manual' | 'later';

export type DeliveryMethodType = 'pickup' | 'home_delivery';

export type DesignChoiceOption = 'shop' | 'tailor' | 'inspiration' | 'upload' | 'custom';

export type TimeSlotOption = 'morning' | 'afternoon' | 'evening';

export interface PriceSummary {
  serviceAmount?: number;
  baseServicePrice?: number;
  fabricAmount?: number;
  fabricPrice?: number;
  customizationAmount?: number;
  customizationPrice?: number;
  measurementFee?: number;
  measurementPrice?: number;
  deliveryFee?: number;
  deliveryPrice?: number;
  discount?: number;
  estimatedTotal?: number;
  confirmedTotal?: number;
  status?: PriceStatus;
  currency: 'SAR';
  priceStatus: PriceStatus;
  isCustomQuote?: boolean;
}

export interface DeliveryAddress {
  id?: string;
  label?: string;
  recipientName: string;
  phone: string;
  city: string;
  area: string;
  district?: string;
  addressLine: string;
  street?: string;
  building?: string;
  buildingNumber?: string;
  unit?: string;
  notes?: string;
  additionalDetails?: string;
  isDefault?: boolean;
}

export interface OrderPreferences {
  collarStyle?: 'classic' | 'modern_flat' | 'mandarin_round' | 'kuwaiti_soft' | 'custom';
  collarStiffness?: 'very_stiff' | 'medium' | 'soft';
  cuffStyle?: 'standard_open' | 'french_double' | 'single_button' | 'square_cuff' | 'custom';
  buttonsStyle?: 'standard_visible' | 'hidden_snap' | 'traditional_shell' | 'metal_antique' | 'custom';
  embroideryStyle?: 'none' | 'subtle_monogram' | 'geometric_chest' | 'royal_zari' | 'custom';
  pocketStyle?: 'traditional_side' | 'hidden_zipper' | 'open_pen_slot' | 'dual_inner' | 'custom';
  fitPreference?: 'regular_comfort' | 'slim_tailored' | 'traditional_generous';
  specialInstructions?: string;
}

export interface SavedMeasurementProfile {
  id: string;
  name: string;
  nameAr: string;
  tag?: string;
  tagAr?: string;
  thobeType?: string;
  thobeLength: number;
  shoulder: number;
  chest: number;
  waist: number;
  hip: number;
  sleeve: number;
  cuff: number;
  neck: number;
  armhole?: number;
  trouserLength?: number;
  collarHeight?: number;
  measurements?: Record<string, number>;
  unit: 'cm' | 'in';
  createdDate?: string;
  lastUpdated: string;
  isDefault?: boolean;
  isLockedForProduction?: boolean;
}

export interface BookingConfig {
  serviceId: string;
  requiresFabric: boolean;
  requiresMeasurement: boolean;
  supportsHomeMeasurement: boolean;
  supportsDelivery: boolean;
  supportsTailorSelection: boolean;
  supportsCustomDesign: boolean;
  supportsAppointment: boolean;
}

export interface BookingDraft {
  shopId?: string;
  tailorId?: string;
  serviceId?: string;
  
  // Design selection
  designId?: string;
  designOption?: DesignChoiceOption;
  customDesignNotes?: string;
  referenceFileNames?: string[];
  
  // Fabric selection
  fabricId?: string;
  fabricColor?: string;
  customerProvidedFabric?: boolean;
  customerFabricDescription?: string;

  // Measurement selection
  measurementMethod?: MeasurementMethodType;
  measurementProfileId?: string;
  measurements?: Record<string, number>;
  measurementUnit?: 'cm' | 'in';

  // Preferences
  preferences?: OrderPreferences;

  // Delivery & Schedule
  deliveryMethod?: DeliveryMethodType;
  deliveryAddress?: DeliveryAddress;
  preferredDate?: string;
  preferredTimeSlot?: TimeSlotOption;
  appointmentNotes?: string;

  // Overall notes and confirmations
  notes?: string;
  agreedToTerms?: boolean;
  confirmedInformation?: boolean;
}

export interface Booking {
  id: string;
  referenceNumber: string;
  customerId?: string;
  shopId: string;
  shopName: string;
  shopNameAr: string;
  tailorId?: string;
  tailorName?: string;
  tailorNameAr?: string;
  serviceId: string;
  serviceName: string;
  serviceNameAr: string;
  designId?: string;
  designTitle?: string;
  designTitleAr?: string;
  designImageUrl?: string;
  fabricId?: string;
  fabricName?: string;
  fabricNameAr?: string;
  fabricColor?: string;
  customerProvidedFabric?: boolean;
  measurementMethod: MeasurementMethodType;
  measurementProfileId?: string;
  measurementProfileName?: string;
  measurementProfileNameAr?: string;
  measurements?: Record<string, number>;
  measurementUnit?: 'cm' | 'in';
  preferences?: OrderPreferences;
  deliveryMethod: DeliveryMethodType;
  deliveryAddress?: DeliveryAddress;
  preferredDate?: string;
  preferredTimeSlot?: TimeSlotOption;
  notes?: string;
  priceSummary: PriceSummary;
  status: BookingStatus;
  createdAt: string;
}
