import React, { useState } from 'react';
import { Menu, X, UserCheck } from 'lucide-react';
import { useLanguage } from '../../localization/LanguageContext';
import { useRole } from '../role/RoleContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Button } from '../ui/Button';

export interface HeaderProps {
  onNavigate?: (route: string) => void;
  activeRoute?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigate = () => {},
  activeRoute = 'home',
}) => {
  const { t, isRtl } = useLanguage();
  const { activeRole, openRoleModal } = useRole();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: t.navigation.home },
    { id: 'explore', label: t.navigation.explore },
    { id: 'shops', label: t.navigation.shops },
    { id: 'tailors', label: t.navigation.tailors },
    { id: 'designs', label: t.navigation.designs },
    { id: 'booking', label: isRtl ? 'طلب تفصيل' : 'Book Order' },
    { id: 'dashboard', label: isRtl ? 'لوحة العميل' : 'Dashboard' },
    { id: 'pricing', label: t.navigation.pricing },
    { id: 'support', label: t.navigation.support },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    
    // Smooth scroll to corresponding section if element exists
    const targetMap: Record<string, string> = {
      home: 'root',
      explore: 'nearby-shops',
      shops: 'nearby-shops',
      tailors: 'tailors',
      designs: 'designs',
      pricing: 'services',
      services: 'services',
      support: 'how-it-works',
    };

    const targetId = targetMap[id];
    if (targetId) {
      if (targetId === 'root') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const getRoleLabel = () => {
    switch (activeRole) {
      case 'customer':
        return isRtl ? 'عميل' : 'Customer';
      case 'shop_owner':
        return isRtl ? 'صاحب مشغل' : 'Shop Owner';
      case 'tailor':
        return isRtl ? 'خيّاط' : 'Tailor';
      case 'admin':
        return isRtl ? 'مشرف' : 'Admin';
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#E6E2DB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Zone 1: Brand Wordmark (Single text element) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleLinkClick('home')}
              className="group flex items-baseline gap-2 cursor-pointer text-start focus-visible:outline-none"
            >
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#121316] font-display">
                KHAYYAT
              </span>
              <span className="text-sm sm:text-base font-semibold text-[#916F3E] font-arabic">
                خيّاط
              </span>
            </button>
          </div>

          {/* Zone 2: Navigation Links (Clean text links with subtle hover states) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-[#65625D]">
            {navLinks.map((link) => {
              const isActive = activeRoute === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`transition-colors whitespace-nowrap cursor-pointer relative py-1 hover:text-[#121316] ${
                    isActive ? 'text-[#121316] font-semibold' : ''
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#C5A880] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Language & Actions */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            {/* Role switch button simulator */}
            <button
              onClick={openRoleModal}
              title="Change active role preview"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-[#24262E] bg-[#F5F3EF] hover:bg-[#EDEAE3] border border-[#E6E2DB] transition-colors cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5 text-[#916F3E]" />
              <span className="text-[11px] text-[#8E8B85]">{t.common.activeRole}:</span>
              <span className="font-semibold text-[#121316]">{getRoleLabel()}</span>
            </button>

            <LanguageSwitcher />

            <Button
              variant="outline"
              size="sm"
              onClick={() => handleLinkClick('dashboard')}
            >
              {isRtl ? 'حسابي وطلباتي' : 'My Account'}
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={openRoleModal}
            >
              {t.navigation.joinPlatform}
            </Button>
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle Navigation Menu"
              className="p-2 text-[#121316] hover:bg-[#F2EFE9] rounded-md transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-[#E6E2DB] bg-[#FAF9F6] px-4 py-5 space-y-4">
          <nav className="flex flex-col space-y-2 text-start">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-start py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  activeRoute === link.id
                    ? 'bg-[#FFFFFF] text-[#121316] font-semibold border border-[#E6E2DB]'
                    : 'text-[#65625D] hover:bg-[#F2EFE9]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="pt-3 border-t border-[#E6E2DB] flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openRoleModal();
              }}
              className="flex items-center justify-between p-2.5 rounded-lg bg-[#FFFFFF] border border-[#E6E2DB] text-xs"
            >
              <span className="text-[#8E8B85]">{t.common.activeRole}:</span>
              <span className="font-bold text-[#121316]">{getRoleLabel()}</span>
            </button>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="md"
                fullWidth
                onClick={() => {
                  setMobileMenuOpen(false);
                  openRoleModal();
                }}
              >
                {t.navigation.signIn}
              </Button>
              <Button
                variant="primary"
                size="md"
                fullWidth
                onClick={() => {
                  setMobileMenuOpen(false);
                  openRoleModal();
                }}
              >
                {t.navigation.joinPlatform}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
