import React from 'react';
import { Booking } from '../types/booking';
import { CustomerOrder } from '../types/customer';
import { mockCustomerOrders } from '../data/mock/customerDashboard';
import { OrderTrackingDetailView } from '../components/dashboard/OrderTrackingDetailView';
import { useCustomerDashboard } from '../hooks/useCustomerDashboard';

export interface OrderDetailPageProps {
  booking?: Booking | null;
  order?: CustomerOrder | null;
  orderId?: string;
  onNavigateHome: () => void;
  onNavigateDashboard: () => void;
  onNavigateOrders: () => void;
  onNavigateShops?: () => void;
  onNavigateTailor?: (tailorId: string) => void;
  onStartBooking?: (params?: any) => void;
}

export const OrderDetailPage: React.FC<OrderDetailPageProps> = ({
  booking,
  order,
  orderId,
  onNavigateHome,
  onNavigateDashboard,
  onNavigateOrders,
  onNavigateShops,
  onNavigateTailor,
  onStartBooking,
}) => {
  const { getOrder, cancelOrder, rescheduleAppointment, submitReview } = useCustomerDashboard();

  // Find order from provided order, ID, booking, or default to mock #THB-10482
  let targetOrder: CustomerOrder | undefined = undefined;

  if (order) {
    targetOrder = order;
  } else if (orderId) {
    targetOrder = getOrder(orderId) || mockCustomerOrders.find((o) => o.id === orderId || o.reference === orderId);
  } else if (booking) {
    // Map booking to CustomerOrder shape
    targetOrder = {
      id: booking.id,
      reference: booking.referenceNumber,
      customerId: booking.customerId || 'cust_saudi_09',
      shopId: booking.shopId,
      shopName: booking.shopName,
      shopNameAr: booking.shopNameAr,
      shopCity: 'Riyadh',
      shopCityAr: 'الرياض',
      shopDistrict: 'Al-Olaya',
      shopDistrictAr: 'العليا',
      tailorId: booking.tailorId,
      tailorName: booking.tailorName,
      tailorNameAr: booking.tailorNameAr,
      serviceId: booking.serviceId,
      serviceName: booking.serviceName,
      serviceNameAr: booking.serviceNameAr,
      serviceCategory: 'saudi_thobe',
      designId: booking.designId,
      designTitle: booking.designTitle,
      designTitleAr: booking.designTitleAr,
      designImageUrl: booking.designImageUrl,
      fabricId: booking.fabricId,
      fabricName: booking.fabricName,
      fabricNameAr: booking.fabricNameAr,
      measurementMethod: booking.measurementMethod as any,
      measurementProfileName: booking.measurementProfileName,
      measurementProfileNameAr: booking.measurementProfileNameAr,
      preferences: booking.preferences,
      status: (booking.status as any) || 'REQUESTED',
      statusHistory: [
        {
          status: 'REQUESTED',
          timestamp: booking.createdAt,
          note: 'Tailoring order request placed by customer.',
          noteAr: 'تم تقديم طلب التفصيل عبر المنصة.',
          actor: 'Client',
          actorAr: 'العميل',
        },
      ],
      priceSummary: booking.priceSummary,
      deliveryMethod: booking.deliveryMethod as any,
      deliveryAddress: booking.deliveryAddress,
      estimatedCompletionDate: booking.preferredDate,
      createdAt: booking.createdAt,
      updatedAt: booking.createdAt,
    };
  }

  // Fallback to active mock order if none matched
  if (!targetOrder) {
    targetOrder = mockCustomerOrders[0];
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <OrderTrackingDetailView
        order={targetOrder}
        onNavigateHome={onNavigateHome}
        onNavigateDashboard={onNavigateDashboard}
        onNavigateOrders={onNavigateOrders}
        onNavigateShop={(shopId) => onNavigateShops && onNavigateShops()}
        onNavigateTailor={onNavigateTailor}
        onCancelOrder={(id) => cancelOrder(id)}
        onReschedule={(id, date, slot) => rescheduleAppointment(id, date, slot)}
        onReorder={(ord) =>
          onStartBooking &&
          onStartBooking({
            shopId: ord.shopId,
            tailorId: ord.tailorId,
            designId: ord.designId,
          })
        }
        onSubmitReview={(id, rev) => submitReview(id, rev)}
      />
    </div>
  );
};
