import React, { useState } from 'react';
import { Search, MapPin, SlidersHorizontal, ArrowUpDown, X, RotateCcw } from 'lucide-react';
import { useLanguage } from '../../localization/LanguageContext';
import { Button } from '../ui/Button';
import { Switch } from '../forms/Switch';
import { Drawer } from '../ui/Drawer';

export interface FilterState {
  city: string;
  maxDistanceKm: number;
  minRating: number;
  minPrice: number;
  maxPrice: number;
  serviceCategory: string;
  hasHomeMeasurement: boolean;
  hasDelivery: boolean;
  isOpenNow: boolean;
  availableOnly: boolean;
}

export const defaultFilterState: FilterState = {
  city: 'all',
  maxDistanceKm: 25,
  minRating: 0,
  minPrice: 100,
  maxPrice: 2000,
  serviceCategory: 'all',
  hasHomeMeasurement: false,
  hasDelivery: false,
  isOpenNow: false,
  availableOnly: false,
};

export interface MarketplaceSearchFilterProps {
  onSearch?: (query: string, filters: FilterState) => void;
  className?: string;
}

export const MarketplaceSearchFilter: React.FC<MarketplaceSearchFilterProps> = ({
  onSearch,
  className = '',
}) => {
  const { t, isRtl } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>(defaultFilterState);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [sortBy, setSortBy] = useState('rating');

  const cities = [
    { value: 'all', label: isRtl ? 'كافة المدن' : 'All Cities' },
    { value: 'Riyadh', label: isRtl ? 'الرياض' : 'Riyadh' },
    { value: 'Jeddah', label: isRtl ? 'جدة' : 'Jeddah' },
    { value: 'Khobar', label: isRtl ? 'الخبر' : 'Khobar' },
    { value: 'Dammam', label: isRtl ? 'الدمام' : 'Dammam' },
    { value: 'Makkah', label: isRtl ? 'مكة المكرمة' : 'Makkah' },
    { value: 'Madinah', label: isRtl ? 'المدينة المنورة' : 'Madinah' },
  ];

  const services = [
    { value: 'all', label: isRtl ? 'كافة الخدمات' : 'All Services' },
    { value: 'saudi_thobe', label: isRtl ? 'ثوب سعودي ملكي' : 'Saudi Royal Thobe' },
    { value: 'kuwaiti', label: isRtl ? 'ثوب كويتي' : 'Kuwaiti Thobe' },
    { value: 'dagla', label: isRtl ? 'دقلة شتوية' : 'Winter Dagla' },
    { value: 'bisht', label: isRtl ? 'بشت مناسبات' : 'Ceremonial Bisht' },
    { value: 'alterations', label: isRtl ? 'تعديلات وصيانة' : 'Alterations' },
  ];

  const handleResetFilters = () => {
    setFilters(defaultFilterState);
  };

  const activeFilterCount =
    (filters.city !== 'all' ? 1 : 0) +
    (filters.serviceCategory !== 'all' ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.hasHomeMeasurement ? 1 : 0) +
    (filters.hasDelivery ? 1 : 0) +
    (filters.isOpenNow ? 1 : 0);

  return (
    <div className={`w-full text-start ${className}`}>
      {/* Desktop Main Search Bar */}
      <div className="bg-[#FFFFFF] p-2.5 sm:p-3 rounded-2xl border border-[#E6E2DB] shadow-md flex flex-col md:flex-row items-stretch md:items-center gap-2">
        {/* City Selector */}
        <div className="flex items-center gap-2 px-3 py-2 bg-[#F5F3EF] md:bg-transparent rounded-lg border md:border-0 border-[#E6E2DB] md:border-e md:border-[#E6E2DB] shrink-0">
          <MapPin className="w-4 h-4 text-[#916F3E] shrink-0" />
          <select
            value={filters.city}
            onChange={(e) => setFilters((prev) => ({ ...prev, city: e.target.value }))}
            className="bg-transparent text-xs sm:text-sm font-semibold text-[#121316] focus:outline-none cursor-pointer"
          >
            {cities.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        {/* Service Selector */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-2 border-e border-[#E6E2DB] shrink-0">
          <select
            value={filters.serviceCategory}
            onChange={(e) => setFilters((prev) => ({ ...prev, serviceCategory: e.target.value }))}
            className="bg-transparent text-xs sm:text-sm text-[#65625D] focus:outline-none cursor-pointer font-medium"
          >
            {services.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        {/* Main Search Query */}
        <div className="relative flex-1 flex items-center min-w-[200px]">
          <Search className="w-4 h-4 absolute start-3 text-[#8E8B85]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isRtl ? 'ابحث بالاسم، القماش (تويوبو، شكيبو)، أو الحي...' : 'Search by name, fabric (Toyobo), or district...'}
            className="w-full bg-[#F5F3EF] md:bg-transparent py-2.5 ps-9 pe-3 rounded-lg text-xs sm:text-sm text-[#121316] placeholder-[#8E8B85] focus:outline-none"
          />
        </div>

        {/* Filter Trigger Button with Badge */}
        <button
          type="button"
          onClick={() => setIsFilterDrawerOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg border border-[#E6E2DB] hover:bg-[#F5F3EF] text-xs font-semibold text-[#121316] transition-colors cursor-pointer shrink-0"
        >
          <SlidersHorizontal className="w-4 h-4 text-[#916F3E]" />
          <span>{isRtl ? 'تصفية متقدمة' : 'Filters'}</span>
          {activeFilterCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-[#121316] text-white text-[10px] flex items-center justify-center tabular-nums">
              {activeFilterCount}
            </span>
          )}
        </button>

        {/* Search Submit CTA */}
        <Button
          variant="gold"
          size="md"
          onClick={() => onSearch && onSearch(searchQuery, filters)}
          className="shrink-0"
        >
          {isRtl ? 'بحث في المشاغل' : 'Search Ateliers'}
        </Button>
      </div>

      {/* Slide-over Filter Drawer (Mobile & Desktop) */}
      <Drawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        title={isRtl ? 'خيارات التصفية الدقيقة' : 'Refine Tailoring Marketplace'}
      >
        <div className="space-y-6 text-start">
          {/* Active filters bar with reset */}
          <div className="flex items-center justify-between pb-3 border-b border-[#F2EFE9]">
            <span className="text-xs text-[#8E8B85]">
              {activeFilterCount} {isRtl ? 'فلاتر محددة' : 'filters active'}
            </span>
            {activeFilterCount > 0 && (
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 text-xs text-[#B42318] hover:underline cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{isRtl ? 'إعادة ضبط' : 'Reset All'}</span>
              </button>
            )}
          </div>

          {/* City Selection */}
          <div>
            <label className="block text-xs font-bold text-[#121316] mb-2">
              {isRtl ? 'المدينة في المملكة' : 'Saudi City'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {cities.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setFilters((p) => ({ ...p, city: c.value }))}
                  className={`py-2 px-3 text-xs rounded-lg border text-center transition-colors cursor-pointer ${
                    filters.city === c.value
                      ? 'bg-[#121316] text-[#FAF9F6] border-[#121316] font-semibold'
                      : 'bg-[#FFFFFF] text-[#65625D] border-[#E6E2DB] hover:bg-[#F5F3EF]'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <label className="block text-xs font-bold text-[#121316] mb-2">
              {isRtl ? 'الحد الأدنى للتقييم' : 'Minimum Rating'}
            </label>
            <div className="flex gap-2">
              {[0, 4.0, 4.5, 4.8].map((rt) => (
                <button
                  key={rt}
                  onClick={() => setFilters((p) => ({ ...p, minRating: rt }))}
                  className={`flex-1 py-1.5 text-xs rounded-lg border text-center transition-colors cursor-pointer ${
                    filters.minRating === rt
                      ? 'bg-[#121316] text-[#FAF9F6] border-[#121316] font-semibold'
                      : 'bg-[#FFFFFF] text-[#65625D] border-[#E6E2DB] hover:bg-[#F5F3EF]'
                  }`}
                >
                  {rt === 0 ? (isRtl ? 'الكل' : 'Any') : `${rt}★+`}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-[#121316]">
                {isRtl ? 'نطاق السعر المتوقع' : 'Price Range'}
              </label>
              <span className="text-xs text-[#916F3E] font-semibold tabular-nums">
                {filters.minPrice} – {filters.maxPrice} {t.common.sar}
              </span>
            </div>
            <input
              type="range"
              min={100}
              max={2500}
              step={50}
              value={filters.maxPrice}
              onChange={(e) => setFilters((p) => ({ ...p, maxPrice: Number(e.target.value) }))}
              className="w-full accent-[#C5A880] cursor-pointer"
            />
          </div>

          {/* Toggles */}
          <div className="space-y-4 pt-3 border-t border-[#F2EFE9]">
            <Switch
              label={isRtl ? 'أخذ القياس بالمنزل متوفر' : 'Home Measurement Available'}
              description={isRtl ? 'إمكانية إرسال خيّاط لأخذ المقاس في منزلك' : 'Tailor comes to your residence'}
              checked={filters.hasHomeMeasurement}
              onChange={(val) => setFilters((p) => ({ ...p, hasHomeMeasurement: val }))}
            />

            <Switch
              label={isRtl ? 'تفصيل سريع وتوصيل للمنزل' : 'Express Delivery Available'}
              description={isRtl ? 'خيارات استلام خلال 48 ساعة' : '48h expedited delivery options'}
              checked={filters.hasDelivery}
              onChange={(val) => setFilters((p) => ({ ...p, hasDelivery: val }))}
            />

            <Switch
              label={isRtl ? 'المشغل مفتوح الآن' : 'Open Now'}
              description={isRtl ? 'عرض المشاغل المتاحة للزيارة فوراً' : 'Show ateliers open right now'}
              checked={filters.isOpenNow}
              onChange={(val) => setFilters((p) => ({ ...p, isOpenNow: val }))}
            />
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-[#E6E2DB] flex gap-3">
            <Button
              variant="outline"
              size="md"
              fullWidth
              onClick={handleResetFilters}
            >
              {isRtl ? 'إعادة ضبط' : 'Reset'}
            </Button>
            <Button
              variant="primary"
              size="md"
              fullWidth
              onClick={() => {
                setIsFilterDrawerOpen(false);
                onSearch && onSearch(searchQuery, filters);
              }}
            >
              {isRtl ? 'تطبيق الفلاتر' : 'Apply Filters'}
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};
