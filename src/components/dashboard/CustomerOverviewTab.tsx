import React from 'react';
import {
  Scissors,
  Calendar,
  Clock,
  Bookmark,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Store,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Plus,
  Ruler,
} from 'lucide-react';
import { CustomerDashboardData, CustomerOrder, CustomerAppointment } from '../../types';
import { useLanguage } from '../../localization/LanguageContext';
import { OrderStatusBadge } from './OrderStatusBadge';
import { PriceDisplay } from '../ui/PriceDisplay';
import { Button } from '../ui/Button';

export interface CustomerOverviewTabProps {
  data: CustomerDashboardData;
  onNavigateTab: (tabId: string) => void;
  onTrackOrder: (orderId: string) => void;
  onStartBooking: () => void;
}

export const CustomerOverviewTab: React.FC<CustomerOverviewTabProps> = ({
  data,
  onNavigateTab,
  onTrackOrder,
  onStartBooking,
}) => {
  const { isRtl, t } = useLanguage();
  const ArrowIcon = isRtl ? ChevronLeft : ChevronRight;

  const activeOrders = data.orders.filter(
    (o) => !['COMPLETED', 'CANCELLED'].includes(o.status)
  );
  const pendingRequests = data.orders.filter(
    (o) => o.status === 'REQUESTED' || o.status === 'UNDER_REVIEW'
  );
  const upcomingAppointments = data.appointments.filter(
    (a) => a.status === 'CONFIRMED' || a.status === 'REQUESTED'
  );

  return (
    <div className="space-y-8 text-start">
      {/* 1. Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#121316] via-[#1A1D23] to-[#24262E] text-white p-6 sm:p-8 border border-[#2E313D] shadow-sm">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#C5A880]/15 border border-[#C5A880]/30 text-[#C5A880] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isRtl ? 'حساب العميل الملكي' : 'KHAYYAT Sartorial Client Hub'}</span>
          </div>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold font-display text-[#FAF9F6]">
            {isRtl
              ? `مرحباً بعودتك، ${data.profile.fullNameAr || data.profile.fullName}`
              : `Welcome back, ${data.profile.fullName}`}
          </h1>

          <p className="text-xs sm:text-sm text-[#A8A49D] leading-relaxed">
            {t.dashboard.dashboardSubtitle}
          </p>
        </div>

        {/* Quick actions right */}
        <div className="mt-6 flex flex-wrap items-center gap-3 relative z-10">
          <Button
            variant="gold"
            size="md"
            onClick={onStartBooking}
            className="text-xs font-bold shadow-md"
          >
            <Plus className="w-4 h-4 me-1.5" />
            {isRtl ? 'طلب تفصيل ثوب جديد' : 'Commission New Thobe'}
          </Button>

          <Button
            variant="outline"
            size="md"
            onClick={() => onNavigateTab('measurements')}
            className="text-xs text-[#FAF9F6] border-[#3D404D] hover:bg-white/10"
          >
            <Ruler className="w-4 h-4 me-1.5 text-[#C5A880]" />
            {isRtl ? 'وثيقة القياس الرقمية' : 'View Measurement Passport'}
          </Button>
        </div>

        {/* Subtle decorative background circle */}
        <div className="absolute -end-10 -bottom-10 w-64 h-64 rounded-full bg-[#C5A880]/10 blur-3xl pointer-events-none" />
      </div>

      {/* 2. Four Dashboard Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Active Orders */}
        <button
          type="button"
          onClick={() => onNavigateTab('orders')}
          className="bg-white rounded-2xl border border-[#E6E2DB] p-4 sm:p-5 shadow-xs hover:border-[#C5A880] transition-all cursor-pointer text-start group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#8E8B85] uppercase tracking-wider">
              {t.dashboard.activeOrders}
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#FAF4EB] text-[#916F3E] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Scissors className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-[#121316]">
              {activeOrders.length}
            </span>
            <span className="text-[11px] font-semibold text-[#916F3E] flex items-center gap-0.5">
              <span>{isRtl ? 'عرض' : 'View'}</span>
              <ArrowIcon className="w-3 h-3" />
            </span>
          </div>
        </button>

        {/* Pending Requests */}
        <button
          type="button"
          onClick={() => onNavigateTab('orders')}
          className="bg-white rounded-2xl border border-[#E6E2DB] p-4 sm:p-5 shadow-xs hover:border-[#C5A880] transition-all cursor-pointer text-start group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#8E8B85] uppercase tracking-wider">
              {t.dashboard.pendingRequests}
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#F0F4F8] text-[#1D4ED8] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-[#121316]">
              {pendingRequests.length}
            </span>
            <span className="text-[11px] font-semibold text-[#1D4ED8] flex items-center gap-0.5">
              <span>{isRtl ? 'متابعة' : 'Review'}</span>
              <ArrowIcon className="w-3 h-3" />
            </span>
          </div>
        </button>

        {/* Upcoming Appointments */}
        <button
          type="button"
          onClick={() => onNavigateTab('bookings')}
          className="bg-white rounded-2xl border border-[#E6E2DB] p-4 sm:p-5 shadow-xs hover:border-[#C5A880] transition-all cursor-pointer text-start group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#8E8B85] uppercase tracking-wider">
              {t.dashboard.upcomingAppointments}
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#EBF5ED] text-[#2D6A4F] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-[#121316]">
              {upcomingAppointments.length}
            </span>
            <span className="text-[11px] font-semibold text-[#2D6A4F] flex items-center gap-0.5">
              <span>{isRtl ? 'المواعيد' : 'Visits'}</span>
              <ArrowIcon className="w-3 h-3" />
            </span>
          </div>
        </button>

        {/* Saved Designs */}
        <button
          type="button"
          onClick={() => onNavigateTab('favorites')}
          className="bg-white rounded-2xl border border-[#E6E2DB] p-4 sm:p-5 shadow-xs hover:border-[#C5A880] transition-all cursor-pointer text-start group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#8E8B85] uppercase tracking-wider">
              {t.dashboard.savedDesigns}
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#FAF0E6] text-[#916F3E] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Bookmark className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-[#121316]">
              {data.savedDesignIds.length}
            </span>
            <span className="text-[11px] font-semibold text-[#916F3E] flex items-center gap-0.5">
              <span>{isRtl ? 'المفضلة' : 'Explore'}</span>
              <ArrowIcon className="w-3 h-3" />
            </span>
          </div>
        </button>
      </div>

      {/* 3. Spotlight: Active Orders Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#121316] font-display">
              {t.dashboard.yourActiveOrders}
            </h2>
            <p className="text-xs text-[#8E8B85]">
              {isRtl
                ? 'متابعة حية لمراحل خياطة ثيابك وتجهيز المواعيد'
                : 'Live tracking of current thobes in cutting, tailoring, and quality audit'}
            </p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigateTab('orders')}
            className="text-xs text-[#916F3E] font-semibold"
          >
            <span>{t.dashboard.viewAllOrders}</span>
            <ArrowIcon className="w-3.5 h-3.5 ms-1" />
          </Button>
        </div>

        {activeOrders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-[#D1D5DB] p-8 text-center space-y-3">
            <Scissors className="w-8 h-8 text-[#A8A49D] mx-auto" />
            <h4 className="text-sm font-bold text-[#121316]">{t.dashboard.noActiveOrders}</h4>
            <Button variant="primary" size="sm" onClick={onStartBooking}>
              {isRtl ? 'طلب تفصيل ثوب جديد' : 'Book a Tailoring Service'}
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeOrders.map((order) => {
              const shopName = isRtl ? order.shopNameAr : order.shopName;
              const serviceName = isRtl ? order.serviceNameAr : order.serviceName;

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl border border-[#E6E2DB] p-5 shadow-xs hover:border-[#C5A880] transition-all flex flex-col justify-between gap-4"
                >
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[11px] font-mono font-bold text-[#916F3E] block">
                          {order.reference}
                        </span>
                        <h3 className="text-sm font-bold text-[#121316] mt-0.5 line-clamp-1">
                          {serviceName}
                        </h3>
                      </div>
                      <OrderStatusBadge status={order.status} size="sm" />
                    </div>

                    {/* Shop & Specs */}
                    <div className="flex items-center gap-3 pt-1">
                      {order.designImageUrl && (
                        <img
                          src={order.designImageUrl}
                          alt={serviceName}
                          className="w-12 h-14 rounded-lg object-cover border border-[#E6E2DB] shrink-0"
                        />
                      )}
                      <div className="space-y-0.5 text-xs text-[#65625D]">
                        <div className="flex items-center gap-1 font-semibold text-[#121316]">
                          <Store className="w-3.5 h-3.5 text-[#8E8B85]" />
                          <span>{shopName}</span>
                        </div>
                        {order.tailorName && (
                          <p className="text-[11px] text-[#8E8B85]">
                            {isRtl ? order.tailorNameAr || order.tailorName : order.tailorName}
                          </p>
                        )}
                        {order.estimatedCompletionDate && (
                          <div className="flex items-center gap-1 text-[11px] text-[#916F3E] font-medium pt-0.5">
                            <Clock className="w-3 h-3" />
                            <span>
                              {isRtl ? 'الموعد المتوقع:' : 'Est:'}{' '}
                              {new Date(order.estimatedCompletionDate).toLocaleDateString(
                                isRtl ? 'ar-SA' : 'en-US',
                                { month: 'short', day: 'numeric' }
                              )}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Footer & CTA */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#F2EFE9]">
                    <div>
                      <span className="text-[10px] text-[#8E8B85] block">
                        {order.priceSummary.status === 'ESTIMATED'
                          ? isRtl ? 'إجمالي تقديري' : 'Estimated Total'
                          : isRtl ? 'الإجمالي المعتمد' : 'Confirmed Total'}
                      </span>
                      <PriceDisplay amount={order.priceSummary.estimatedTotal || 0} size="sm" />
                    </div>

                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => onTrackOrder(order.id)}
                      className="text-xs"
                    >
                      {t.dashboard.trackOrder}
                      <ArrowIcon className="w-3 h-3 ms-1" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Upcoming Appointment Spotlight Card (if any) */}
      {upcomingAppointments.length > 0 && (
        <div className="bg-white rounded-2xl border border-[#E6E2DB] p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#EBF5ED] text-[#2D6A4F] flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#121316]">
                  {isRtl ? 'موعد الزيارة / القياس القادم' : 'Upcoming Fitting or Specialist Visit'}
                </h3>
                <span className="text-xs text-[#8E8B85]">
                  {upcomingAppointments[0].bookingReference}
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigateTab('bookings')}
              className="text-xs"
            >
              {isRtl ? 'إدارة المواعيد' : 'Manage Visits'}
            </Button>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E6E2DB] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div className="space-y-1">
              <span className="font-bold text-[#121316] text-sm block">
                {isRtl
                  ? upcomingAppointments[0].serviceNameAr
                  : upcomingAppointments[0].serviceName}
              </span>
              <p className="text-[#65625D]">
                {isRtl ? upcomingAppointments[0].shopNameAr : upcomingAppointments[0].shopName} ·{' '}
                {upcomingAppointments[0].timeRangeDisplay}
              </p>
              {upcomingAppointments[0].addressSummary && (
                <div className="flex items-center gap-1.5 text-[#8E8B85] pt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{upcomingAppointments[0].addressSummary}</span>
                </div>
              )}
            </div>

            <div className="text-end shrink-0">
              <span className="inline-block px-2.5 py-1 rounded-md bg-[#EBF5ED] text-[#2D6A4F] font-bold text-xs">
                {new Date(upcomingAppointments[0].appointmentDate).toLocaleDateString(
                  isRtl ? 'ar-SA' : 'en-US',
                  { weekday: 'long', month: 'short', day: 'numeric' }
                )}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 5. Recent Activity Feed */}
      <div className="bg-white rounded-2xl border border-[#E6E2DB] p-5 sm:p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-[#121316] font-display">
          {isRtl ? 'النشاطات والأحداث الأخيرة' : 'Recent Account Activity'}
        </h3>

        <div className="divide-y divide-[#F2EFE9] text-xs">
          {data.recentActivities.map((act) => (
            <div key={act.id} className="py-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#916F3E]" />
                <span className="font-medium text-[#121316]">
                  {isRtl ? act.titleAr : act.title}
                </span>
              </div>
              <span className="text-[11px] text-[#8E8B85] shrink-0 whitespace-nowrap">
                {act.timestamp}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
