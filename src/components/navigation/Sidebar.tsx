import React, { useState } from 'react';
import {
  LayoutDashboard,
  Scissors,
  Store,
  Users,
  Calendar,
  Layers,
  Settings,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Briefcase,
  Bookmark,
  FileText,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';
import { useLanguage } from '../../localization/LanguageContext';
import { useRole } from '../role/RoleContext';
import { UserRole } from '../../types';

export interface NavItemConfig {
  id: string;
  label: string;
  labelAr: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  children?: Array<{ id: string; label: string; labelAr: string }>;
}

export interface SidebarProps {
  activeId?: string;
  onSelect?: (id: string) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeId = 'dashboard',
  onSelect,
  isCollapsed = false,
  onToggleCollapse,
  className = '',
}) => {
  const { isRtl } = useLanguage();
  const { activeRole } = useRole();
  const [expandedSubmenu, setExpandedSubmenu] = useState<string | null>(null);

  // Role-specific navigation items configuration
  const getNavItems = (role: UserRole): NavItemConfig[] => {
    switch (role) {
      case 'shop_owner':
        return [
          { id: 'dashboard', label: 'Dashboard', labelAr: 'لوحة التحكم', icon: LayoutDashboard },
          { id: 'orders', label: 'Bespoke Orders', labelAr: 'طلبات التفصيل', icon: Scissors, badge: 8 },
          { id: 'bookings', label: 'Fitting Appointments', labelAr: 'جلسات القياس', icon: Calendar, badge: 3 },
          { id: 'staff', label: 'Master Tailors & Staff', labelAr: 'معلّمو المشغل', icon: Users },
          { id: 'inventory', label: 'Fabrics & Accessories', labelAr: 'أقمشة ومستلزمات', icon: Layers },
          { id: 'proposals', label: 'Recruitment Proposals', labelAr: 'عروض العمل والتعاون', icon: Briefcase },
          { id: 'settings', label: 'Shop Settings', labelAr: 'إعدادات المشغل', icon: Settings },
        ];
      case 'tailor':
        return [
          { id: 'dashboard', label: 'Artisan Hub', labelAr: 'لوحة المعلّم', icon: LayoutDashboard },
          { id: 'assigned_orders', label: 'Assigned Thobes', labelAr: 'الثياب المسندة', icon: Scissors, badge: 5 },
          { id: 'portfolio', label: 'Signature Works', labelAr: 'أعمالي وتصاميمي', icon: Layers },
          { id: 'shop_offers', label: 'Atelier Offers', labelAr: 'عروض المشاغل', icon: Briefcase, badge: 2 },
          { id: 'reviews', label: 'Client Reviews', labelAr: 'تقييمات العملاء', icon: ShieldCheck },
          { id: 'settings', label: 'Craft Profile', labelAr: 'الملف المهني', icon: Settings },
        ];
      case 'admin':
        return [
          { id: 'dashboard', label: 'Overview', labelAr: 'نظرة عامة', icon: LayoutDashboard },
          { id: 'verifications', label: 'CR & Atelier Audits', labelAr: 'توثيق المشاغل', icon: ShieldCheck, badge: 6 },
          { id: 'users', label: 'Users & Roles', labelAr: 'المستخدمين والأدوار', icon: Users },
          { id: 'compliance', label: 'Saudi Commerce Reports', labelAr: 'تقارير الامتثال', icon: FileText },
          { id: 'settings', label: 'Platform Settings', labelAr: 'إعدادات المنصة', icon: Settings },
        ];
      case 'customer':
      default:
        return [
          { id: 'dashboard', label: 'Client Overview', labelAr: 'ملخص حسابي', icon: LayoutDashboard },
          { id: 'my_orders', label: 'My Tailored Thobes', labelAr: 'ثيابي المفصلة', icon: Scissors, badge: 1 },
          { id: 'measurements', label: 'Measurement Profiles', labelAr: 'مقاساتي المحفوظة', icon: FileText },
          { id: 'bookings', label: 'Home Appointments', labelAr: 'مواعيد القياس المنزلي', icon: Calendar },
          { id: 'saved', label: 'Saved Ateliers & Styles', labelAr: 'المفضلة', icon: Bookmark },
          { id: 'settings', label: 'Account Settings', labelAr: 'إعدادات الحساب', icon: Settings },
        ];
    }
  };

  const navItems = getNavItems(activeRole);
  const CollapseIcon = isCollapsed ? PanelLeftOpen : PanelLeftClose;
  const ArrowIcon = isRtl ? ChevronLeft : ChevronRight;

  return (
    <aside
      className={`h-full bg-[#FFFFFF] border-e border-[#E6E2DB] flex flex-col justify-between transition-all duration-200 text-start ${
        isCollapsed ? 'w-16' : 'w-64'
      } ${className}`}
    >
      {/* Top Section: Header & Collapse Toggle */}
      <div>
        <div className="p-4 border-b border-[#F2EFE9] flex items-center justify-between gap-2">
          {!isCollapsed && (
            <div className="truncate">
              <span className="text-xs font-bold text-[#121316] uppercase tracking-wider block">
                {activeRole.replace('_', ' ')}
              </span>
              <span className="text-[11px] text-[#8E8B85] truncate block">
                {isRtl ? 'لوحة العمل الرقمية' : 'Digital Workspace'}
              </span>
            </div>
          )}
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              className="p-1.5 text-[#8E8B85] hover:text-[#121316] hover:bg-[#F5F3EF] rounded-md transition-colors cursor-pointer mx-auto"
            >
              <CollapseIcon className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Navigation List */}
        <nav className="p-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeId === item.id;
            const label = isRtl ? item.labelAr : item.label;

            return (
              <div key={item.id}>
                <button
                  onClick={() => onSelect && onSelect(item.id)}
                  title={isCollapsed ? label : undefined}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#121316] text-[#FAF9F6] shadow-xs'
                      : 'text-[#65625D] hover:bg-[#F5F3EF] hover:text-[#121316]'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#C5A880]' : ''}`} />
                  {!isCollapsed && (
                    <>
                      <span className="truncate flex-1 text-start">{label}</span>
                      {typeof item.badge !== 'undefined' && (
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full tabular-nums ${
                            isActive
                              ? 'bg-[#C5A880] text-[#121316]'
                              : 'bg-[#F5F3EF] text-[#65625D]'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Saudi tailoring trust seal */}
      {!isCollapsed && (
        <div className="p-4 m-2 rounded-xl bg-[#FAF9F6] border border-[#E6E2DB] text-xs space-y-1">
          <div className="flex items-center gap-1.5 text-[#916F3E] font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{isRtl ? 'نظام خيّاط المعتمد' : 'Certified Platform'}</span>
          </div>
          <p className="text-[11px] text-[#8E8B85]">
            {isRtl ? 'امتثال كامل لضوابط التجارة' : 'Saudi Commerce Compliant'}
          </p>
        </div>
      )}
    </aside>
  );
};
