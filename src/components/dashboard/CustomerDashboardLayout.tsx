import React from 'react';
import {
  LayoutDashboard,
  Scissors,
  Calendar,
  Ruler,
  Bookmark,
  MapPin,
  Bell,
  User,
  ArrowRight,
  ArrowLeft,
  Store,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { useLanguage } from '../../localization/LanguageContext';
import { LanguageSwitcher } from '../layout/LanguageSwitcher';
import { CustomerDashboardData } from '../../types';

export type DashboardTabId =
  | 'overview'
  | 'orders'
  | 'bookings'
  | 'measurements'
  | 'favorites'
  | 'addresses'
  | 'notifications'
  | 'profile';

export interface CustomerDashboardLayoutProps {
  data: CustomerDashboardData;
  activeTab: DashboardTabId;
  onSelectTab: (tab: DashboardTabId) => void;
  onNavigateHome: () => void;
  onStartBooking: () => void;
  children: React.ReactNode;
}

export const CustomerDashboardLayout: React.FC<CustomerDashboardLayoutProps> = ({
  data,
  activeTab,
  onSelectTab,
  onNavigateHome,
  onStartBooking,
  children,
}) => {
  const { isRtl, t } = useLanguage();
  const ArrowIcon = isRtl ? ArrowRight : ArrowLeft;

  const activeOrdersCount = data.orders.filter(
    (o) => !['COMPLETED', 'CANCELLED'].includes(o.status)
  ).length;
  const upcomingVisitsCount = data.appointments.filter(
    (a) => a.status === 'CONFIRMED' || a.status === 'REQUESTED'
  ).length;
  const unreadNotifsCount = data.notifications.filter((n) => !n.isRead).length;

  const navTabs: Array<{
    id: DashboardTabId;
    labelEn: string;
    labelAr: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number;
  }> = [
    { id: 'overview', labelEn: t.dashboard.tabOverview, labelAr: t.dashboard.tabOverview, icon: LayoutDashboard },
    { id: 'orders', labelEn: t.dashboard.tabOrders, labelAr: t.dashboard.tabOrders, icon: Scissors, badge: activeOrdersCount },
    { id: 'bookings', labelEn: t.dashboard.tabBookings, labelAr: t.dashboard.tabBookings, icon: Calendar, badge: upcomingVisitsCount },
    { id: 'measurements', labelEn: t.dashboard.tabMeasurements, labelAr: t.dashboard.tabMeasurements, icon: Ruler },
    { id: 'favorites', labelEn: t.dashboard.tabFavorites, labelAr: t.dashboard.tabFavorites, icon: Bookmark },
    { id: 'addresses', labelEn: t.dashboard.tabAddresses, labelAr: t.dashboard.tabAddresses, icon: MapPin },
    { id: 'notifications', labelEn: t.dashboard.tabNotifications, labelAr: t.dashboard.tabNotifications, icon: Bell, badge: unreadNotifsCount },
    { id: 'profile', labelEn: t.dashboard.tabProfile, labelAr: t.dashboard.tabProfile, icon: User },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#121316] flex flex-col text-start">
      {/* 1. Customer Workspace Top Bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#E6E2DB] shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Left: Brand + Marketplace Back Link */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={onNavigateHome}
                className="group flex items-baseline gap-2 cursor-pointer text-start focus:outline-none"
              >
                <span className="text-xl font-bold tracking-tight text-[#121316] font-display">
                  KHAYYAT
                </span>
                <span className="text-sm font-semibold text-[#916F3E] font-arabic">
                  خيّاط
                </span>
              </button>

              <span className="text-[#D1D5DB] hidden sm:inline">|</span>

              <button
                type="button"
                onClick={onNavigateHome}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#65625D] hover:text-[#121316] transition-colors cursor-pointer"
              >
                <Store className="w-3.5 h-3.5 text-[#916F3E]" />
                <span>{isRtl ? 'استكشاف المشاغل' : 'Marketplace'}</span>
              </button>
            </div>

            {/* Right: User Avatar + Language + Notification Bell */}
            <div className="flex items-center gap-3">
              <LanguageSwitcher />

              {/* Notification icon */}
              <button
                type="button"
                onClick={() => onSelectTab('notifications')}
                className="relative p-2 rounded-lg border border-[#E6E2DB] hover:bg-[#FAF9F6] text-[#65625D] hover:text-[#121316] transition-colors cursor-pointer"
                title={t.dashboard.tabNotifications}
              >
                <Bell className="w-4 h-4" />
                {unreadNotifsCount > 0 && (
                  <span className="absolute -top-1 -end-1 w-4 h-4 bg-[#916F3E] text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                    {unreadNotifsCount}
                  </span>
                )}
              </button>

              {/* Profile Chip */}
              <button
                type="button"
                onClick={() => onSelectTab('profile')}
                className="flex items-center gap-2 p-1.5 ps-2 rounded-xl border border-[#E6E2DB] hover:bg-[#FAF9F6] transition-colors cursor-pointer"
              >
                <div className="text-end hidden md:block">
                  <span className="text-xs font-bold text-[#121316] block leading-tight">
                    {isRtl ? data.profile.fullNameAr || data.profile.fullName : data.profile.fullName}
                  </span>
                  <span className="text-[10px] text-[#8E8B85] block">{data.profile.city}</span>
                </div>
                <img
                  src={data.profile.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'}
                  alt={data.profile.fullName}
                  className="w-8 h-8 rounded-lg object-cover border border-[#E6E2DB]"
                />
              </button>
            </div>
          </div>
        </div>

        {/* 2. Horizontal Navigation Tabs Bar */}
        <div className="border-t border-[#F2EFE9] bg-[#FAF9F6]/80 backdrop-blur-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2 scrollbar-none">
              {navTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                const label = isRtl ? tab.labelAr : tab.labelEn;

                return (
                  <button
                    key={tab.id}
                    onClick={() => onSelectTab(tab.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                      isActive
                        ? 'bg-[#121316] text-[#FAF9F6] shadow-xs'
                        : 'text-[#65625D] hover:bg-[#F2EFE9] hover:text-[#121316]'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#C5A880]' : ''}`} />
                    <span>{label}</span>
                    {typeof tab.badge === 'number' && tab.badge > 0 && (
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold tabular-nums ${
                          isActive
                            ? 'bg-[#C5A880] text-[#121316]'
                            : 'bg-[#E6E2DB] text-[#65625D]'
                        }`}
                      >
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* 3. Main Workspace Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {children}
      </main>
    </div>
  );
};
