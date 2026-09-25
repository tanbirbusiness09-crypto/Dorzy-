import React from 'react';
import { Bell, MessageSquare, Search, Menu, UserCheck } from 'lucide-react';
import { useLanguage } from '../../localization/LanguageContext';
import { useRole } from '../role/RoleContext';
import { Avatar } from '../ui/Avatar';
import { LanguageSwitcher } from '../layout/LanguageSwitcher';
import { Breadcrumb, BreadcrumbItem } from '../ui/Breadcrumb';
import { useToast } from '../feedback/Toast';

export interface DashboardHeaderProps {
  title: string;
  breadcrumbs?: BreadcrumbItem[];
  unreadNotifications?: number;
  unreadMessages?: number;
  onToggleSidebar?: () => void;
  className?: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  breadcrumbs,
  unreadNotifications = 3,
  unreadMessages = 2,
  onToggleSidebar,
  className = '',
}) => {
  const { isRtl } = useLanguage();
  const { activeRole, openRoleModal } = useRole();
  const { showToast } = useToast();

  const getRoleTitle = () => {
    switch (activeRole) {
      case 'shop_owner':
        return isRtl ? 'مشغل المملكة الملكي (صاحب عمل)' : 'Al-Mamlaka Royal (Owner)';
      case 'tailor':
        return isRtl ? 'المعلّم طارق (خيّاط معتمد)' : 'Master Tariq (Artisan)';
      case 'admin':
        return isRtl ? 'إدارة المنصة والرقابة' : 'Platform Administrator';
      case 'customer':
      default:
        return isRtl ? 'فهد العتيبي (عميل)' : 'Fahad Al-Otaibi (Client)';
    }
  };

  return (
    <header
      className={`bg-[#FFFFFF] border-b border-[#E6E2DB] px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4 text-start ${className}`}
    >
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            aria-label="Toggle sidebar"
            className="p-1.5 text-[#121316] hover:bg-[#F5F3EF] rounded-md transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div>
          {breadcrumbs && breadcrumbs.length > 0 && (
            <div className="mb-0.5">
              <Breadcrumb items={breadcrumbs} />
            </div>
          )}
          <h1 className="text-base sm:text-lg font-bold text-[#121316] tracking-tight truncate">
            {title}
          </h1>
        </div>
      </div>

      {/* Right controls: search, notifications, messages, profile, language */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <LanguageSwitcher />

        {/* Notifications mock button with badge */}
        <button
          onClick={() =>
            showToast({
              type: 'info',
              title: isRtl ? 'الإشعارات والتنبيهات' : 'Notifications',
              description: isRtl
                ? `لديك ${unreadNotifications} إشعارات غير مقروءة`
                : `${unreadNotifications} unread alerts in atelier center`,
            })
          }
          title="Notifications"
          aria-label="Notifications"
          className="relative p-2 text-[#65625D] hover:text-[#121316] hover:bg-[#F5F3EF] rounded-lg transition-colors cursor-pointer"
        >
          <Bell className="w-4 h-4" />
          {unreadNotifications > 0 && (
            <span className="absolute top-1 end-1 w-4 h-4 rounded-full bg-[#C5A880] text-[#121316] text-[10px] font-bold flex items-center justify-center tabular-nums">
              {unreadNotifications}
            </span>
          )}
        </button>

        {/* Messages mock button with badge */}
        <button
          onClick={() =>
            showToast({
              type: 'info',
              title: isRtl ? 'المحادثات والرسائل' : 'Discussions & Messages',
              description: isRtl
                ? `لديك ${unreadMessages} رسائل جديدة من العملاء`
                : `${unreadMessages} unread customer inquiries`,
            })
          }
          title="Messages"
          aria-label="Messages"
          className="relative p-2 text-[#65625D] hover:text-[#121316] hover:bg-[#F5F3EF] rounded-lg transition-colors cursor-pointer"
        >
          <MessageSquare className="w-4 h-4" />
          {unreadMessages > 0 && (
            <span className="absolute top-1 end-1 w-4 h-4 rounded-full bg-[#121316] text-white text-[10px] font-bold flex items-center justify-center tabular-nums">
              {unreadMessages}
            </span>
          )}
        </button>

        <div className="h-6 w-px bg-[#E6E2DB] mx-1 hidden sm:block" />

        {/* User profile & Role switcher click */}
        <button
          onClick={openRoleModal}
          title="Click to simulate switching roles"
          className="flex items-center gap-2.5 p-1 rounded-lg hover:bg-[#F5F3EF] transition-colors cursor-pointer text-start"
        >
          <Avatar name={getRoleTitle()} size="sm" isVerified />
          <div className="hidden md:block max-w-[150px]">
            <p className="text-xs font-bold text-[#121316] truncate">{getRoleTitle()}</p>
            <p className="text-[10px] text-[#916F3E] uppercase font-semibold tracking-wider truncate">
              {activeRole}
            </p>
          </div>
        </button>
      </div>
    </header>
  );
};
