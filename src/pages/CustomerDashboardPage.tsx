import React, { useState, useEffect } from 'react';
import { CustomerDashboardLayout, DashboardTabId } from '../components/dashboard/CustomerDashboardLayout';
import { CustomerOverviewTab } from '../components/dashboard/CustomerOverviewTab';
import { CustomerOrdersTab } from '../components/dashboard/CustomerOrdersTab';
import { OrderTrackingDetailView } from '../components/dashboard/OrderTrackingDetailView';
import { CustomerBookingsTab } from '../components/dashboard/CustomerBookingsTab';
import { CustomerMeasurementsTab } from '../components/dashboard/CustomerMeasurementsTab';
import { CustomerFavoritesTab } from '../components/dashboard/CustomerFavoritesTab';
import { CustomerAddressesTab } from '../components/dashboard/CustomerAddressesTab';
import { CustomerNotificationsTab } from '../components/dashboard/CustomerNotificationsTab';
import { CustomerProfileTab } from '../components/dashboard/CustomerProfileTab';
import { useCustomerDashboard } from '../hooks/useCustomerDashboard';
import { CustomerOrder } from '../types';

export interface CustomerDashboardPageProps {
  initialTab?: DashboardTabId;
  initialOrderId?: string;
  onNavigateHome: () => void;
  onNavigateShop?: (shopId: string) => void;
  onNavigateTailor?: (tailorId: string) => void;
  onStartBooking: (params?: { shopId?: string; tailorId?: string; designId?: string }) => void;
}

export const CustomerDashboardPage: React.FC<CustomerDashboardPageProps> = ({
  initialTab = 'overview',
  initialOrderId,
  onNavigateHome,
  onNavigateShop,
  onNavigateTailor,
  onStartBooking,
}) => {
  const dashboardState = useCustomerDashboard();
  const [activeTab, setActiveTab] = useState<DashboardTabId>(initialTab);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(initialOrderId || null);

  // Sync tab and order from props if changed externally
  useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
    if (initialOrderId) setSelectedOrderId(initialOrderId);
  }, [initialTab, initialOrderId]);

  // Handle Tab Switch & URL History
  const handleSelectTab = (tab: DashboardTabId) => {
    setSelectedOrderId(null);
    setActiveTab(tab);
    try {
      const path = tab === 'overview' ? '/dashboard' : `/dashboard/${tab}`;
      window.history.pushState({}, '', path);
    } catch {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Track Order
  const handleTrackOrder = (orderId: string) => {
    setSelectedOrderId(orderId);
    try {
      window.history.pushState({}, '', `/dashboard/orders/${orderId}`);
    } catch {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Re-order
  const handleReorder = (order: CustomerOrder) => {
    onStartBooking({
      shopId: order.shopId,
      tailorId: order.tailorId,
      designId: order.designId,
    });
  };

  const selectedOrder = selectedOrderId
    ? dashboardState.getOrder(selectedOrderId)
    : null;

  return (
    <CustomerDashboardLayout
      data={{
        profile: dashboardState.profile,
        orders: dashboardState.orders,
        appointments: dashboardState.appointments,
        measurementProfiles: dashboardState.measurementProfiles,
        favoriteShopIds: dashboardState.favoriteShopIds,
        favoriteTailorIds: dashboardState.favoriteTailorIds,
        savedDesignIds: dashboardState.savedDesignIds,
        addresses: dashboardState.addresses,
        notifications: dashboardState.notifications,
        recentActivities: dashboardState.recentActivities,
      }}
      activeTab={activeTab}
      onSelectTab={handleSelectTab}
      onNavigateHome={onNavigateHome}
      onStartBooking={() => onStartBooking()}
    >
      {selectedOrder ? (
        <OrderTrackingDetailView
          order={selectedOrder}
          onNavigateHome={onNavigateHome}
          onNavigateDashboard={() => handleSelectTab('overview')}
          onNavigateOrders={() => {
            setSelectedOrderId(null);
            handleSelectTab('orders');
          }}
          onNavigateShop={onNavigateShop}
          onNavigateTailor={onNavigateTailor}
          onCancelOrder={(id, reason) => dashboardState.cancelOrder(id, reason)}
          onReschedule={(id, date, slot) => dashboardState.rescheduleAppointment(id, date, slot)}
          onReorder={handleReorder}
          onSubmitReview={(id, review) => dashboardState.submitReview(id, review)}
        />
      ) : activeTab === 'overview' ? (
        <CustomerOverviewTab
          data={{
            profile: dashboardState.profile,
            orders: dashboardState.orders,
            appointments: dashboardState.appointments,
            measurementProfiles: dashboardState.measurementProfiles,
            favoriteShopIds: dashboardState.favoriteShopIds,
            favoriteTailorIds: dashboardState.favoriteTailorIds,
            savedDesignIds: dashboardState.savedDesignIds,
            addresses: dashboardState.addresses,
            notifications: dashboardState.notifications,
            recentActivities: dashboardState.recentActivities,
          }}
          onNavigateTab={(tabId) => handleSelectTab(tabId as DashboardTabId)}
          onTrackOrder={handleTrackOrder}
          onStartBooking={() => onStartBooking()}
        />
      ) : activeTab === 'orders' ? (
        <CustomerOrdersTab
          orders={dashboardState.orders}
          onTrackOrder={handleTrackOrder}
          onStartBooking={() => onStartBooking()}
          onNavigateShop={onNavigateShop}
        />
      ) : activeTab === 'bookings' ? (
        <CustomerBookingsTab
          appointments={dashboardState.appointments}
          onReschedule={(id, date, slot) => dashboardState.rescheduleAppointment(id, date, slot)}
          onCancel={(id) => dashboardState.cancelAppointment(id)}
          onBookNew={() => onStartBooking()}
        />
      ) : activeTab === 'measurements' ? (
        <CustomerMeasurementsTab
          profiles={dashboardState.measurementProfiles}
          onSaveProfile={(p) => dashboardState.saveMeasurementProfile(p)}
          onDeleteProfile={(id) => dashboardState.deleteMeasurementProfile(id)}
        />
      ) : activeTab === 'favorites' ? (
        <CustomerFavoritesTab
          savedDesignIds={dashboardState.savedDesignIds}
          favoriteShopIds={dashboardState.favoriteShopIds}
          favoriteTailorIds={dashboardState.favoriteTailorIds}
          onOrderDesign={(designId) => onStartBooking({ designId })}
          onNavigateShop={(id) => onNavigateShop && onNavigateShop(id)}
          onNavigateTailor={(id) => onNavigateTailor && onNavigateTailor(id)}
          onToggleSavedDesign={(id) => dashboardState.toggleSavedDesign(id)}
        />
      ) : activeTab === 'addresses' ? (
        <CustomerAddressesTab
          addresses={dashboardState.addresses}
          onSaveAddress={(a) => dashboardState.saveAddress(a)}
          onDeleteAddress={(id) => dashboardState.deleteAddress(id)}
          onSetDefault={(id) => dashboardState.setDefaultAddress(id)}
        />
      ) : activeTab === 'notifications' ? (
        <CustomerNotificationsTab
          notifications={dashboardState.notifications}
          onMarkRead={(id) => dashboardState.markNotificationRead(id)}
          onMarkAllRead={() => dashboardState.markAllNotificationsRead()}
          onNavigateOrder={(id) => handleTrackOrder(id)}
        />
      ) : (
        <CustomerProfileTab
          profile={dashboardState.profile}
          onUpdateProfile={(u) => dashboardState.updateProfile(u)}
          onUpdatePreferences={(p) => dashboardState.updatePreferences(p)}
        />
      )}
    </CustomerDashboardLayout>
  );
};
