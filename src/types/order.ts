import type { OrderStatus } from './customer';

export type LegacyOrderStatus =
  | 'consultation_scheduled'
  | 'measurements_taken'
  | 'fabric_cutting'
  | 'tailoring_in_progress'
  | 'first_fitting_ready'
  | 'final_finishing'
  | 'ready_for_pickup'
  | 'delivered';

export * from './customer';

export interface MeasurementProfile {
  id: string;
  name: string;
  customerName: string;
  thobeLengthCm: number;
  shoulderWidthCm: number;
  sleeveLengthCm: number;
  chestCircumferenceCm: number;
  waistCircumferenceCm: number;
  neckCircumferenceCm: number;
  wristCircumferenceCm: number;
  collarHeightCm: number;
  preferredPocket: 'traditional' | 'hidden_zipper' | 'open_pen_slot';
  notes?: string;
  lastUpdated: string;
}

export interface TailoringBooking {
  id: string;
  bookingNumber: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  shopId: string;
  shopName: string;
  serviceId: string;
  serviceName: string;
  tailorId?: string;
  tailorName?: string;
  status: LegacyOrderStatus | OrderStatus;
  type: 'home_measurement' | 'in_shop_appointment';
  appointmentDate: string;
  appointmentTimeSlot: string;
  city: string;
  district: string;
  priceSar: number;
  createdAt: string;
}
