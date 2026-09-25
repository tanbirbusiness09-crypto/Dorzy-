import { PriceSummary, DeliveryAddress, OrderPreferences, SavedMeasurementProfile } from './booking';

export type OrderStatus =
  | 'REQUESTED'
  | 'UNDER_REVIEW'
  | 'CONFIRMED'
  | 'MEASUREMENT_PENDING'
  | 'MEASURED'
  | 'FABRIC_SELECTED'
  | 'IN_PRODUCTION'
  | 'QUALITY_CHECK'
  | 'READY'
  | 'OUT_FOR_DELIVERY'
  | 'READY_FOR_PICKUP'
  | 'COMPLETED'
  | 'CANCELLED';

export interface OrderStatusEvent {
  status: OrderStatus;
  timestamp: string;
  note?: string;
  noteAr?: string;
  actor?: string;
  actorAr?: string;
}

export interface CustomerOrderReview {
  shopRating?: number;
  shopReview?: string;
  tailorRating?: number;
  tailorReview?: string;
  submittedAt?: string;
}

export interface CustomerOrder {
  id: string;
  reference: string;
  customerId: string;
  shopId: string;
  shopName: string;
  shopNameAr: string;
  shopCity: string;
  shopCityAr: string;
  shopDistrict: string;
  shopDistrictAr: string;
  tailorId?: string;
  tailorName?: string;
  tailorNameAr?: string;
  tailorAvatarUrl?: string;
  tailorSpecialty?: string;
  tailorSpecialtyAr?: string;
  tailorExperienceYears?: number;
  serviceId: string;
  serviceName: string;
  serviceNameAr: string;
  serviceCategory: string;
  designId?: string;
  designTitle?: string;
  designTitleAr?: string;
  designImageUrl?: string;
  designStyle?: string;
  designStyleAr?: string;
  designOption?: string;
  fabricId?: string;
  fabricName?: string;
  fabricNameAr?: string;
  fabricColor?: string;
  fabricMaterial?: string;
  fabricMaterialAr?: string;
  customerProvidedFabric?: boolean;
  measurementMethod: 'shop' | 'home' | 'saved' | 'manual' | 'later';
  measurementProfileId?: string;
  measurementProfileName?: string;
  measurementProfileNameAr?: string;
  measurements?: Record<string, number>;
  measurementUnit?: 'cm' | 'in';
  isMeasurementLocked?: boolean;
  preferences?: OrderPreferences;
  status: OrderStatus;
  statusHistory: OrderStatusEvent[];
  priceSummary: PriceSummary;
  deliveryMethod: 'pickup' | 'home_delivery';
  deliveryAddress?: DeliveryAddress;
  bookingId?: string;
  estimatedCompletionDate?: string;
  createdAt: string;
  updatedAt: string;
  notes?: string;
  cancellationReason?: string;
  review?: CustomerOrderReview;
}

export type BookingAppointmentStatus =
  | 'REQUESTED'
  | 'CONFIRMED'
  | 'RESCHEDULE_REQUESTED'
  | 'COMPLETED'
  | 'CANCELLED';

export interface CustomerAppointment {
  id: string;
  bookingReference: string;
  shopId: string;
  shopName: string;
  shopNameAr: string;
  shopCity: string;
  shopCityAr: string;
  shopDistrict: string;
  shopDistrictAr: string;
  tailorId?: string;
  tailorName?: string;
  tailorNameAr?: string;
  serviceName: string;
  serviceNameAr: string;
  type: 'home_measurement' | 'in_shop_fitting' | 'consultation';
  status: BookingAppointmentStatus;
  appointmentDate: string;
  appointmentTimeSlot: 'morning' | 'afternoon' | 'evening';
  timeRangeDisplay: string;
  addressSummary?: string;
  specialistName?: string;
  specialistNameAr?: string;
  contactPhone?: string;
  notes?: string;
  createdAt: string;
}

export type NotificationType =
  | 'order_status'
  | 'booking_update'
  | 'measurement_appointment'
  | 'shop_message'
  | 'delivery_update'
  | 'review_reminder'
  | 'platform';

export interface CustomerNotification {
  id: string;
  type: NotificationType;
  title: string;
  titleAr: string;
  message: string;
  messageAr: string;
  timestamp: string;
  isRead: boolean;
  orderId?: string;
  bookingId?: string;
  shopId?: string;
}

export interface CustomerPreferences {
  language: 'ar' | 'en';
  measurementUnit: 'cm' | 'in';
  preferredStyles: string[];
  preferredFit: 'regular_comfort' | 'slim_tailored' | 'traditional_generous';
  notificationPreferences: {
    email: boolean;
    sms: boolean;
    whatsapp: boolean;
    orderUpdates: boolean;
  };
}

export interface CustomerProfileData {
  id: string;
  fullName: string;
  fullNameAr: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  city: string;
  cityAr: string;
  memberSince: string;
  preferences: CustomerPreferences;
}

export interface CustomerDashboardData {
  profile: CustomerProfileData;
  orders: CustomerOrder[];
  appointments: CustomerAppointment[];
  measurementProfiles: SavedMeasurementProfile[];
  favoriteShopIds: string[];
  favoriteTailorIds: string[];
  savedDesignIds: string[];
  addresses: DeliveryAddress[];
  notifications: CustomerNotification[];
  recentActivities: Array<{
    id: string;
    type: 'saved_design' | 'favorited_shop' | 'booking_submitted' | 'status_updated' | 'profile_updated';
    title: string;
    titleAr: string;
    timestamp: string;
    targetId?: string;
  }>;
}
