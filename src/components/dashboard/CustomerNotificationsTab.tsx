import React, { useState } from 'react';
import {
  Bell,
  CheckCircle2,
  Clock,
  Scissors,
  Calendar,
  MessageSquare,
  Sparkles,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { CustomerNotification, NotificationType } from '../../types';
import { useLanguage } from '../../localization/LanguageContext';
import { Button } from '../ui/Button';

export interface CustomerNotificationsTabProps {
  notifications: CustomerNotification[];
  onMarkRead: (notificationId: string) => void;
  onMarkAllRead: () => void;
  onNavigateOrder: (orderId: string) => void;
}

export const CustomerNotificationsTab: React.FC<CustomerNotificationsTabProps> = ({
  notifications,
  onMarkRead,
  onMarkAllRead,
  onNavigateOrder,
}) => {
  const { isRtl, t } = useLanguage();
  const ArrowIcon = isRtl ? ChevronLeft : ChevronRight;

  const [activeCategory, setActiveCategory] = useState<'all' | 'orders' | 'appointments' | 'messages'>('all');

  const filtered = notifications.filter((n) => {
    if (activeCategory === 'orders') return n.type === 'order_status';
    if (activeCategory === 'appointments') return n.type === 'measurement_appointment';
    if (activeCategory === 'messages') return n.type === 'shop_message' || n.type === 'review_reminder';
    return true;
  });

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'order_status':
        return <Scissors className="w-4 h-4 text-[#916F3E]" />;
      case 'measurement_appointment':
        return <Calendar className="w-4 h-4 text-[#2D6A4F]" />;
      case 'shop_message':
        return <MessageSquare className="w-4 h-4 text-[#1D4ED8]" />;
      default:
        return <Bell className="w-4 h-4 text-[#C5A880]" />;
    }
  };

  return (
    <div className="space-y-6 text-start">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#121316] font-display">
            {t.dashboard.notificationsTitle}
          </h2>
          <p className="text-xs text-[#8E8B85] mt-0.5">
            {isRtl
              ? 'تنبيهات حالة الثياب ومواعيد الزيارات ورسائل المشاغل'
              : 'Real-time sartorial status alerts, specialist visit updates, and messages'}
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={onMarkAllRead}
          className="text-xs shrink-0"
        >
          <CheckCircle2 className="w-3.5 h-3.5 me-1 text-[#2D6A4F]" />
          {t.dashboard.markAllRead}
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {[
          { id: 'all', labelEn: 'All Alerts', labelAr: 'كافة التنبيهات' },
          { id: 'orders', labelEn: 'Thobe Production', labelAr: 'مراحل الثياب' },
          { id: 'appointments', labelEn: 'Fitting Visits', labelAr: 'المواعيد والزيارات' },
          { id: 'messages', labelEn: 'Atelier Notes', labelAr: 'رسائل المشاغل' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id as any)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              activeCategory === tab.id
                ? 'bg-[#121316] text-[#FAF9F6]'
                : 'bg-white text-[#65625D] border border-[#E6E2DB] hover:bg-[#FAF9F6]'
            }`}
          >
            {isRtl ? tab.labelAr : tab.labelEn}
          </button>
        ))}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-[#D1D5DB] p-8 text-center space-y-2">
          <Bell className="w-8 h-8 text-[#A8A49D] mx-auto" />
          <h4 className="text-sm font-bold text-[#121316]">{t.dashboard.noNotifications}</h4>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((notif) => {
            const title = isRtl ? notif.titleAr : notif.title;
            const message = isRtl ? notif.messageAr : notif.message;

            return (
              <div
                key={notif.id}
                onClick={() => {
                  onMarkRead(notif.id);
                  if (notif.orderId) {
                    onNavigateOrder(notif.orderId);
                  }
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                  notif.isRead
                    ? 'bg-white border-[#E6E2DB] opacity-80 hover:opacity-100'
                    : 'bg-[#FAF9F6] border-[#C5A880] ring-1 ring-[#C5A880]/20'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-white border border-[#E6E2DB] flex items-center justify-center shrink-0 mt-0.5">
                    {getNotificationIcon(notif.type)}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs sm:text-sm font-bold text-[#121316]">
                        {title}
                      </h4>
                      {!notif.isRead && (
                        <span className="w-2 h-2 rounded-full bg-[#916F3E]" />
                      )}
                    </div>
                    <p className="text-xs text-[#65625D] leading-relaxed">{message}</p>
                    <span className="text-[10px] text-[#8E8B85] block pt-1">{notif.timestamp}</span>
                  </div>
                </div>

                {notif.orderId && (
                  <ArrowIcon className="w-4 h-4 text-[#8E8B85] shrink-0 self-center" />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
