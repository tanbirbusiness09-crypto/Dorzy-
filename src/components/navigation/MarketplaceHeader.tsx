import React, { useState } from 'react';
import { MapPin, SlidersHorizontal, ShoppingBag, Bell, Search, Menu } from 'lucide-react';
import { useLanguage } from '../../localization/LanguageContext';
import { useRole } from '../role/RoleContext';
import { LanguageSwitcher } from '../layout/LanguageSwitcher';
import { Button } from '../ui/Button';

export interface MarketplaceHeaderProps {
  onSearchChange?: (q: string) => void;
  onOpenFilterDrawer?: () => void;
  selectedCity?: string;
  onSelectCity?: (city: string) => void;
  onToggleMobileMenu?: () => void;
}

export const MarketplaceHeader: React.FC<MarketplaceHeaderProps> = ({
  onSearchChange,
  onOpenFilterDrawer,
  selectedCity = 'Riyadh',
  onSelectCity,
  onToggleMobileMenu,
}) => {
  const { t, isRtl } = useLanguage();
  const { openRoleModal, activeRole } = useRole();
  const [searchValue, setSearchValue] = useState('');

  const cities = ['Riyadh', 'Jeddah', 'Khobar', 'Dammam', 'Makkah', 'Madinah'];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E6E2DB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3 sm:gap-6">
          {/* Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            {onToggleMobileMenu && (
              <button
                onClick={onToggleMobileMenu}
                className="lg:hidden p-1.5 text-[#121316] hover:bg-[#F5F3EF] rounded-md transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}

            <a href="#home" className="flex items-baseline gap-2 text-start">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#121316] font-display">
                KHAYYAT
              </span>
              <span className="text-sm sm:text-base font-semibold text-[#916F3E] font-arabic">
                خيّاط
              </span>
            </a>
          </div>

          {/* Integrated Search & Location Bar (Desktop / Tablet) */}
          <div className="hidden md:flex flex-1 max-w-2xl items-center bg-[#F5F3EF] border border-[#E6E2DB] rounded-lg p-1">
            {/* City Selector */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 border-e border-[#E6E2DB] text-xs font-medium text-[#121316] shrink-0">
              <MapPin className="w-3.5 h-3.5 text-[#916F3E]" />
              <select
                value={selectedCity}
                onChange={(e) => onSelectCity && onSelectCity(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer pe-2 font-medium"
              >
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Input */}
            <div className="relative flex-1 flex items-center">
              <Search className="w-4 h-4 absolute start-3 text-[#8E8B85]" />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  onSearchChange && onSearchChange(e.target.value);
                }}
                placeholder={isRtl ? 'ابحث عن مشغل، معلّم تفصيل، أقمشة تويوبو...' : 'Search ateliers, tailors, Toyobo fabrics...'}
                className="w-full bg-transparent text-xs sm:text-sm py-2 ps-9 pe-3 focus:outline-none placeholder-[#8E8B85]"
              />
            </div>

            {/* Filter Drawer Trigger */}
            {onOpenFilterDrawer && (
              <button
                onClick={onOpenFilterDrawer}
                title="Filters"
                className="p-2 text-[#65625D] hover:text-[#121316] hover:bg-[#FAF9F6] rounded-md transition-colors cursor-pointer shrink-0"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <LanguageSwitcher />

            <button
              onClick={openRoleModal}
              title="Switch user role preview"
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-[#24262E] bg-[#F5F3EF] hover:bg-[#EDEAE3] border border-[#E6E2DB] transition-colors cursor-pointer"
            >
              <span className="text-[11px] text-[#8E8B85]">{t.common.activeRole}:</span>
              <span className="font-semibold text-[#121316] capitalize">{activeRole}</span>
            </button>

            <Button
              variant="primary"
              size="sm"
              onClick={openRoleModal}
              className="hidden sm:inline-flex"
            >
              {t.navigation.joinPlatform}
            </Button>
          </div>
        </div>

        {/* Mobile Search Row */}
        <div className="md:hidden pb-3 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute start-3 top-1/2 -translate-y-1/2 text-[#8E8B85]" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                onSearchChange && onSearchChange(e.target.value);
              }}
              placeholder={isRtl ? 'ابحث عن مشغل أو خيّاط...' : 'Search atelier or tailor...'}
              className="w-full bg-[#F5F3EF] text-xs py-2 ps-9 pe-3 rounded-lg border border-[#E6E2DB] focus:outline-none focus:bg-[#FFFFFF]"
            />
          </div>
          {onOpenFilterDrawer && (
            <button
              onClick={onOpenFilterDrawer}
              className="p-2 bg-[#F5F3EF] border border-[#E6E2DB] rounded-lg text-[#121316]"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
