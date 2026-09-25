import { useState, useCallback } from 'react';
import {
  CustomerDashboardData,
  CustomerOrder,
  CustomerAppointment,
  CustomerNotification,
  CustomerProfileData,
  CustomerPreferences,
  OrderStatus,
  SavedMeasurementProfile,
  DeliveryAddress,
} from '../types';
import {
  mockCustomerDashboard,
  mockCustomerOrders,
  mockCustomerAppointments,
  mockCustomerNotifications,
} from '../data/mock/customerDashboard';
import { mockSavedMeasurements, mockSavedAddresses } from '../data/mock/booking';

export function useCustomerDashboard() {
  const [profile, setProfile] = useState<CustomerProfileData>(mockCustomerDashboard.profile);
  const [orders, setOrders] = useState<CustomerOrder[]>(mockCustomerOrders);
  const [appointments, setAppointments] = useState<CustomerAppointment[]>(mockCustomerAppointments);
  const [measurementProfiles, setMeasurementProfiles] = useState<SavedMeasurementProfile[]>(mockSavedMeasurements);
  const [addresses, setAddresses] = useState<DeliveryAddress[]>(mockSavedAddresses);
  const [notifications, setNotifications] = useState<CustomerNotification[]>(mockCustomerNotifications);
  const [favoriteShopIds, setFavoriteShopIds] = useState<string[]>(mockCustomerDashboard.favoriteShopIds);
  const [favoriteTailorIds, setFavoriteTailorIds] = useState<string[]>(mockCustomerDashboard.favoriteTailorIds);
  const [savedDesignIds, setSavedDesignIds] = useState<string[]>(mockCustomerDashboard.savedDesignIds);
  const [recentActivities, setRecentActivities] = useState(mockCustomerDashboard.recentActivities);

  // Retrieve an individual order by ID or reference
  const getOrder = useCallback(
    (orderIdOrRef: string): CustomerOrder | undefined => {
      return orders.find(
        (o) =>
          o.id === orderIdOrRef ||
          o.reference === orderIdOrRef ||
          o.reference.toLowerCase() === orderIdOrRef.toLowerCase()
      );
    },
    [orders]
  );

  // Add an order created from Booking Flow
  const addOrderFromBooking = useCallback((order: CustomerOrder) => {
    setOrders((prev) => [order, ...prev]);
    setRecentActivities((prev) => [
      {
        id: `act_${Date.now()}`,
        type: 'booking_submitted',
        title: `Submitted order request ${order.reference}`,
        titleAr: `تم تقديم طلب التفصيل ${order.reference}`,
        timestamp: 'Just now',
        targetId: order.id,
      },
      ...prev,
    ]);
  }, []);

  // Update order status with new status log event
  const updateOrderStatus = useCallback(
    (orderId: string, newStatus: OrderStatus, noteEn?: string, noteAr?: string) => {
      setOrders((prev) =>
        prev.map((order) => {
          if (order.id !== orderId) return order;
          const newEvent = {
            status: newStatus,
            timestamp: new Date().toISOString(),
            note: noteEn || `Status updated to ${newStatus}`,
            noteAr: noteAr || `تم تحديث الحالة إلى ${newStatus}`,
            actor: 'System / Atelier Admin',
            actorAr: 'إدارة المشغل / النظام',
          };
          return {
            ...order,
            status: newStatus,
            statusHistory: [...order.statusHistory, newEvent],
            updatedAt: new Date().toISOString(),
          };
        })
      );
    },
    []
  );

  // Cancel order request if in eligible state
  const cancelOrder = useCallback((orderId: string, reasonEn?: string, reasonAr?: string) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;
        return {
          ...order,
          status: 'CANCELLED' as OrderStatus,
          cancellationReason: reasonEn || 'Cancelled by client request.',
          statusHistory: [
            ...order.statusHistory,
            {
              status: 'CANCELLED' as OrderStatus,
              timestamp: new Date().toISOString(),
              note: reasonEn || 'Order request cancelled by customer.',
              noteAr: reasonAr || 'تم إلغاء الطلب بناءً على رغبة العميل.',
              actor: 'Client',
              actorAr: 'العميل',
            },
          ],
          updatedAt: new Date().toISOString(),
        };
      })
    );
  }, []);

  // Submit verified review
  const submitReview = useCallback(
    (
      orderId: string,
      review: {
        shopRating?: number;
        shopReview?: string;
        tailorRating?: number;
        tailorReview?: string;
      }
    ) => {
      setOrders((prev) =>
        prev.map((order) => {
          if (order.id !== orderId) return order;
          return {
            ...order,
            review: {
              ...review,
              submittedAt: new Date().toISOString(),
            },
          };
        })
      );
    },
    []
  );

  // Reschedule Appointment
  const rescheduleAppointment = useCallback(
    (appointmentId: string, newDate: string, newSlot: 'morning' | 'afternoon' | 'evening') => {
      const slotDisplayMap: Record<string, string> = {
        morning: '9:00 AM – 1:00 PM',
        afternoon: '1:00 PM – 5:00 PM',
        evening: '6:00 PM – 8:00 PM',
      };
      setAppointments((prev) =>
        prev.map((apt) => {
          if (apt.id !== appointmentId) return apt;
          return {
            ...apt,
            appointmentDate: newDate,
            appointmentTimeSlot: newSlot,
            timeRangeDisplay: slotDisplayMap[newSlot] || 'Confirmed Slot',
            status: 'RESCHEDULE_REQUESTED',
          };
        })
      );
    },
    []
  );

  // Cancel Appointment
  const cancelAppointment = useCallback((appointmentId: string) => {
    setAppointments((prev) =>
      prev.map((apt) => {
        if (apt.id !== appointmentId) return apt;
        return {
          ...apt,
          status: 'CANCELLED',
        };
      })
    );
  }, []);

  // Measurement Profile CRUD
  const saveMeasurementProfile = useCallback((profile: SavedMeasurementProfile) => {
    setMeasurementProfiles((prev) => {
      const exists = prev.some((p) => p.id === profile.id);
      if (exists) {
        return prev.map((p) => (p.id === profile.id ? profile : p));
      }
      return [profile, ...prev];
    });
  }, []);

  const deleteMeasurementProfile = useCallback((profileId: string) => {
    setMeasurementProfiles((prev) => prev.filter((p) => p.id !== profileId));
  }, []);

  // Address CRUD
  const saveAddress = useCallback((address: DeliveryAddress) => {
    setAddresses((prev) => {
      let updated = [...prev];
      if (address.isDefault) {
        updated = updated.map((a) => ({ ...a, isDefault: false }));
      }
      const exists = updated.some((a) => a.id === address.id);
      if (exists) {
        return updated.map((a) => (a.id === address.id ? address : a));
      }
      return [address, ...updated];
    });
  }, []);

  const deleteAddress = useCallback((addressId: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== addressId));
  }, []);

  const setDefaultAddress = useCallback((addressId: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({
        ...a,
        isDefault: a.id === addressId,
      }))
    );
  }, []);

  // Favorites toggles
  const toggleFavoriteShop = useCallback((shopId: string) => {
    setFavoriteShopIds((prev) =>
      prev.includes(shopId) ? prev.filter((id) => id !== shopId) : [...prev, shopId]
    );
  }, []);

  const toggleFavoriteTailor = useCallback((tailorId: string) => {
    setFavoriteTailorIds((prev) =>
      prev.includes(tailorId) ? prev.filter((id) => id !== tailorId) : [...prev, tailorId]
    );
  }, []);

  const toggleSavedDesign = useCallback((designId: string) => {
    setSavedDesignIds((prev) =>
      prev.includes(designId) ? prev.filter((id) => id !== designId) : [...prev, designId]
    );
  }, []);

  // Notification management
  const markNotificationRead = useCallback((notificationId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n))
    );
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }, []);

  // Profile update
  const updateProfile = useCallback((updates: Partial<CustomerProfileData>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  }, []);

  const updatePreferences = useCallback((preferences: Partial<CustomerPreferences>) => {
    setProfile((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        ...preferences,
      },
    }));
  }, []);

  return {
    profile,
    orders,
    appointments,
    measurementProfiles,
    addresses,
    notifications,
    favoriteShopIds,
    favoriteTailorIds,
    savedDesignIds,
    recentActivities,
    getOrder,
    addOrderFromBooking,
    updateOrderStatus,
    cancelOrder,
    submitReview,
    rescheduleAppointment,
    cancelAppointment,
    saveMeasurementProfile,
    deleteMeasurementProfile,
    saveAddress,
    deleteAddress,
    setDefaultAddress,
    toggleFavoriteShop,
    toggleFavoriteTailor,
    toggleSavedDesign,
    markNotificationRead,
    markAllNotificationsRead,
    updateProfile,
    updatePreferences,
  };
}

export type UseCustomerDashboardReturn = ReturnToType<typeof useCustomerDashboard>;
type ReturnToType<T extends (...args: any[]) => any> = ReturnType<T>;
