import React, { useState } from 'react';
import {
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Check,
  ShieldCheck,
  Home,
  Truck,
  Clock,
  Layers,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../../localization/LanguageContext';
import { DiscoveryFilterState } from '../../types/discovery';
import {
  filterServicesList,
  filterFabricsList,
  filterDistancesList,
  filterRatingsList,
  filterExperienceList,
} from '../../data/mock/filters';
import { saudiCitiesData } from '../../data/mock/locations';
import { Switch } from '../forms/Switch';
import { Button } from '../ui/Button';

export interface ShopDiscoveryFiltersProps {
  filters: DiscoveryFilterState;
  onChange: (filters: DiscoveryFilterState) => void;
  onReset: () => void;
  onCloseMobileDrawer?: () => void;
  className?: string;
}

export const ShopDiscoveryFilters: React.FC<ShopDiscoveryFiltersProps> = ({
  filters,
  onChange,
  onReset,
  onCloseMobileDrawer,
  className = '',
}) => {
  const { t, isRtl } = useLanguage();

  // Collapsible accordion state for sections
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    location: true,
    services: true,
    price: true,
    rating: true,
    fabrics: false,
    capabilities: true,
    experience: false,
  });

  const toggleSection = (sec: string) => {
    setOpenSections((prev) => ({ ...prev, [sec]: !prev[sec] }));
  };

  const selectedCityObj = saudiCitiesData.find((c) => c.id.toLowerCase() === filters.city.toLowerCase());

  // Service toggle helper
  const handleToggleService = (serviceValue: string) => {
    const exists = filters.services.includes(serviceValue);
    const updated = exists
      ? filters.services.filter((s) => s !== serviceValue)
      : [...filters.services, serviceValue];
    onChange({ ...filters, services: updated });
  };

  // Fabric toggle helper
  const handleToggleFabric = (fabricValue: string) => {
    const exists = filters.fabrics.includes(fabricValue);
    const updated = exists
      ? filters.fabrics.filter((f) => f !== fabricValue)
      : [...filters.fabrics, fabricValue];
    onChange({ ...filters, fabrics: updated });
  };

  return (
    <div className={`space-y-4 text-start text-xs select-none ${className}`}>
      {/* Top Header: Title & Reset Button */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E6E2DB]">
        <div className="flex items-center gap-2 font-bold text-[#121316]">
          <SlidersHorizontal className="w-4 h-4 text-[#916F3E]" />
          <span>{isRtl ? 'تصفية النتائج' : 'Filter Ateliers'}</span>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1 text-[11px] text-[#B42318] hover:underline cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>{isRtl ? 'إعادة ضبط' : 'Reset All'}</span>
        </button>
      </div>

      {/* 1. Location & Distance */}
      <div className="border-b border-[#F2EFE9] pb-4">
        <button
          type="button"
          onClick={() => toggleSection('location')}
          className="w-full flex items-center justify-between font-bold text-[#121316] mb-2 cursor-pointer"
        >
          <span>{isRtl ? 'الموقع والمسافة' : 'Location & Distance'}</span>
          {openSections.location ? <ChevronUp className="w-4 h-4 text-[#8E8B85]" /> : <ChevronDown className="w-4 h-4 text-[#8E8B85]" />}
        </button>

        {openSections.location && (
          <div className="space-y-3 pt-1">
            {/* City Selection */}
            <div>
              <label className="block text-[11px] font-semibold text-[#8E8B85] mb-1">
                {isRtl ? 'المدينة' : 'City'}
              </label>
              <select
                value={filters.city}
                onChange={(e) => onChange({ ...filters, city: e.target.value, neighborhood: 'all' })}
                className="w-full bg-[#FFFFFF] border border-[#E6E2DB] rounded-lg p-2 text-xs font-semibold text-[#121316] focus:outline-none focus:border-[#C5A880]"
              >
                <option value="all">{isRtl ? 'كافة المدن' : 'All Cities'}</option>
                {saudiCitiesData.map((c) => (
                  <option key={c.id} value={c.id}>
                    {isRtl ? c.nameAr : c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Neighborhood Selection (if city selected) */}
            {selectedCityObj && (
              <div>
                <label className="block text-[11px] font-semibold text-[#8E8B85] mb-1">
                  {isRtl ? 'الحي' : 'Neighborhood'}
                </label>
                <select
                  value={filters.neighborhood}
                  onChange={(e) => onChange({ ...filters, neighborhood: e.target.value })}
                  className="w-full bg-[#FFFFFF] border border-[#E6E2DB] rounded-lg p-2 text-xs text-[#121316] focus:outline-none focus:border-[#C5A880]"
                >
                  <option value="all">{isRtl ? 'كافة الأحياء' : 'All Neighborhoods'}</option>
                  {selectedCityObj.neighborhoods.map((n) => (
                    <option key={n.id} value={n.name}>
                      {isRtl ? n.nameAr : n.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Proximity / Distance */}
            <div>
              <label className="block text-[11px] font-semibold text-[#8E8B85] mb-1">
                {isRtl ? 'النطاق الجغرافي' : 'Max Distance'}
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {filterDistancesList.map((dist) => (
                  <button
                    key={dist.value}
                    type="button"
                    onClick={() => onChange({ ...filters, distanceKm: dist.value })}
                    className={`py-1.5 px-2 rounded-md border text-center transition-colors cursor-pointer text-[11px] ${
                      filters.distanceKm === dist.value
                        ? 'bg-[#121316] text-[#FAF9F6] border-[#121316] font-semibold'
                        : 'bg-[#FFFFFF] text-[#65625D] border-[#E6E2DB] hover:bg-[#F5F3EF]'
                    }`}
                  >
                    {isRtl ? dist.labelAr : dist.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. Tailoring Services (Multi-select) */}
      <div className="border-b border-[#F2EFE9] pb-4">
        <button
          type="button"
          onClick={() => toggleSection('services')}
          className="w-full flex items-center justify-between font-bold text-[#121316] mb-2 cursor-pointer"
        >
          <span>
            {isRtl ? 'نوع الملبوسات والخدمة' : 'Tailoring Services'}
            {filters.services.length > 0 && ` (${filters.services.length})`}
          </span>
          {openSections.services ? <ChevronUp className="w-4 h-4 text-[#8E8B85]" /> : <ChevronDown className="w-4 h-4 text-[#8E8B85]" />}
        </button>

        {openSections.services && (
          <div className="space-y-1.5 pt-1 max-h-48 overflow-y-auto pr-1 no-scrollbar">
            {filterServicesList.map((serv) => {
              const isChecked = filters.services.includes(serv.value);
              return (
                <label
                  key={serv.value}
                  className={`flex items-center justify-between p-2 rounded-lg border transition-colors cursor-pointer ${
                    isChecked
                      ? 'bg-[#F9F6F0] border-[#C5A880] font-semibold text-[#121316]'
                      : 'border-[#E6E2DB] hover:bg-[#FAF9F6] text-[#65625D]'
                  }`}
                >
                  <span className="truncate">{isRtl ? serv.labelAr : serv.label}</span>
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                      isChecked ? 'bg-[#121316] border-[#121316] text-white' : 'border-[#D4D0C7] bg-[#FFFFFF]'
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. Price Range */}
      <div className="border-b border-[#F2EFE9] pb-4">
        <button
          type="button"
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between font-bold text-[#121316] mb-2 cursor-pointer"
        >
          <span>{isRtl ? 'السعر (ريال سعودي)' : 'Price Range (SAR)'}</span>
          {openSections.price ? <ChevronUp className="w-4 h-4 text-[#8E8B85]" /> : <ChevronDown className="w-4 h-4 text-[#8E8B85]" />}
        </button>

        {openSections.price && (
          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between text-[#916F3E] font-bold tabular-nums">
              <span>{filters.priceMin} {t.common.sar}</span>
              <span>—</span>
              <span>{filters.priceMax} {t.common.sar}</span>
            </div>

            <input
              type="range"
              min={100}
              max={1600}
              step={50}
              value={filters.priceMax}
              onChange={(e) => onChange({ ...filters, priceMax: Number(e.target.value) })}
              className="w-full accent-[#C5A880] cursor-pointer"
            />

            <div className="flex items-center justify-between text-[10px] text-[#8E8B85]">
              <span>100 {t.common.sar}</span>
              <span>1,600+ {t.common.sar}</span>
            </div>
          </div>
        )}
      </div>

      {/* 4. Rating Filter */}
      <div className="border-b border-[#F2EFE9] pb-4">
        <button
          type="button"
          onClick={() => toggleSection('rating')}
          className="w-full flex items-center justify-between font-bold text-[#121316] mb-2 cursor-pointer"
        >
          <span>{isRtl ? 'التقييم المعتمد' : 'Minimum Rating'}</span>
          {openSections.rating ? <ChevronUp className="w-4 h-4 text-[#8E8B85]" /> : <ChevronDown className="w-4 h-4 text-[#8E8B85]" />}
        </button>

        {openSections.rating && (
          <div className="grid grid-cols-2 gap-1.5 pt-1">
            {filterRatingsList.map((rt) => (
              <button
                key={rt.value}
                type="button"
                onClick={() => onChange({ ...filters, ratingMin: filters.ratingMin === rt.value ? 0 : rt.value })}
                className={`py-1.5 px-2 rounded-md border text-center transition-colors cursor-pointer text-xs ${
                  filters.ratingMin === rt.value
                    ? 'bg-[#121316] text-[#FAF9F6] border-[#121316] font-semibold'
                    : 'bg-[#FFFFFF] text-[#65625D] border-[#E6E2DB] hover:bg-[#F5F3EF]'
                }`}
              >
                ★ {isRtl ? rt.labelAr : rt.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 5. Fabrics & Origins (Collapsible) */}
      <div className="border-b border-[#F2EFE9] pb-4">
        <button
          type="button"
          onClick={() => toggleSection('fabrics')}
          className="w-full flex items-center justify-between font-bold text-[#121316] mb-2 cursor-pointer"
        >
          <span>
            {isRtl ? 'نوع القماش ومصدره' : 'Fabric Category'}
            {filters.fabrics.length > 0 && ` (${filters.fabrics.length})`}
          </span>
          {openSections.fabrics ? <ChevronUp className="w-4 h-4 text-[#8E8B85]" /> : <ChevronDown className="w-4 h-4 text-[#8E8B85]" />}
        </button>

        {openSections.fabrics && (
          <div className="space-y-1.5 pt-1 max-h-48 overflow-y-auto pr-1 no-scrollbar">
            {filterFabricsList.map((fab) => {
              const isChecked = filters.fabrics.includes(fab.value);
              return (
                <label
                  key={fab.value}
                  className={`flex items-center justify-between p-2 rounded-lg border transition-colors cursor-pointer ${
                    isChecked
                      ? 'bg-[#F9F6F0] border-[#C5A880] font-semibold text-[#121316]'
                      : 'border-[#E6E2DB] hover:bg-[#FAF9F6] text-[#65625D]'
                  }`}
                >
                  <span className="truncate">{isRtl ? fab.labelAr : fab.label}</span>
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                      isChecked ? 'bg-[#121316] border-[#121316] text-white' : 'border-[#D4D0C7] bg-[#FFFFFF]'
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 6. Capabilities & Operational Features */}
      <div className="border-b border-[#F2EFE9] pb-4">
        <button
          type="button"
          onClick={() => toggleSection('capabilities')}
          className="w-full flex items-center justify-between font-bold text-[#121316] mb-2 cursor-pointer"
        >
          <span>{isRtl ? 'المميزات وساعات العمل' : 'Service Capabilities'}</span>
          {openSections.capabilities ? <ChevronUp className="w-4 h-4 text-[#8E8B85]" /> : <ChevronDown className="w-4 h-4 text-[#8E8B85]" />}
        </button>

        {openSections.capabilities && (
          <div className="space-y-3 pt-1">
            <Switch
              label={isRtl ? 'أخذ القياس بالمنزل متوفر' : 'Home Measurement Available'}
              checked={filters.homeMeasurement === 'available'}
              onChange={(checked) =>
                onChange({ ...filters, homeMeasurement: checked ? 'available' : 'all' })
              }
            />

            <Switch
              label={isRtl ? 'المشغل مفتوح الآن' : 'Open Now'}
              checked={filters.openNow}
              onChange={(checked) => onChange({ ...filters, openNow: checked })}
            />
          </div>
        )}
      </div>

      {/* Mobile Drawer Bottom Apply CTA */}
      {onCloseMobileDrawer && (
        <div className="pt-2">
          <Button
            variant="primary"
            size="md"
            fullWidth
            onClick={onCloseMobileDrawer}
          >
            {isRtl ? 'تطبيق الفلاتر وعرض المشاغل' : 'Apply & Show Ateliers'}
          </Button>
        </div>
      )}
    </div>
  );
};
