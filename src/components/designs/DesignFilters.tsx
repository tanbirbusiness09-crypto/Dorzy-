import React from 'react';
import {
  RotateCcw,
  Building2,
  Scissors,
  MapPin,
  Sparkles,
  Video,
  Image as ImageIcon,
  ShieldCheck,
  ShoppingBag,
  Compass,
  ChevronDown,
  ArrowLeftRight,
} from 'lucide-react';
import { useLanguage } from '../../localization/LanguageContext';

export interface DesignSearchState {
  query: string;
  category: string;
  creatorType: 'ALL' | 'SHOP' | 'TAILOR';
  city: string;
  distanceKm: number;
  style: string;
  designType: string;
  mediaType: 'all' | 'image' | 'video' | 'beforeAfter';
  verifiedOnly: boolean;
  availability: 'all' | 'available_for_order' | 'inspiration_only';
  sort: 'recommended' | 'recent' | 'saved' | 'viewed' | 'reviewed' | 'nearby';
}

export const defaultDesignSearchState: DesignSearchState = {
  query: '',
  category: 'All',
  creatorType: 'ALL',
  city: 'all',
  distanceKm: 0,
  style: 'all',
  designType: 'all',
  mediaType: 'all',
  verifiedOnly: false,
  availability: 'all',
  sort: 'recommended',
};

export interface DesignFiltersProps {
  filters: DesignSearchState;
  onChange: (filters: DesignSearchState) => void;
  onReset: () => void;
  activeCount: number;
  className?: string;
}

export const DesignFilters: React.FC<DesignFiltersProps> = ({
  filters,
  onChange,
  onReset,
  activeCount,
  className = '',
}) => {
  const { isRtl } = useLanguage();

  const cities = [
    { id: 'all', label: 'All Cities', labelAr: 'جميع المدن' },
    { id: 'Riyadh', label: 'Riyadh', labelAr: 'الرياض' },
    { id: 'Jeddah', label: 'Jeddah', labelAr: 'جدة' },
    { id: 'Dammam', label: 'Dammam', labelAr: 'الدمام' },
    { id: 'Khobar', label: 'Khobar', labelAr: 'الخبر' },
    { id: 'Makkah', label: 'Makkah', labelAr: 'مكة المكرمة' },
    { id: 'Madinah', label: 'Madinah', labelAr: 'المدينة المنورة' },
  ];

  const distances = [
    { value: 0, label: 'Any Distance', labelAr: 'أي مسافة' },
    { value: 5, label: 'Within 5 km', labelAr: 'أقل من 5 كم' },
    { value: 10, label: 'Within 10 km', labelAr: 'أقل من 10 كم' },
    { value: 25, label: 'Within 25 km', labelAr: 'أقل من 25 كم' },
    { value: 50, label: 'Within 50 km', labelAr: 'أقل من 50 كم' },
  ];

  const styles = [
    { id: 'all', label: 'All Styles', labelAr: 'كل الأنماط' },
    { id: 'Saudi', label: 'Saudi Style', labelAr: 'ستايل سعودي' },
    { id: 'Kuwaiti', label: 'Kuwaiti Style', labelAr: 'ستايل كويتي' },
    { id: 'Emirati', label: 'Emirati Style', labelAr: 'ستايل إماراتي' },
    { id: 'Qatari', label: 'Qatari Style', labelAr: 'ستايل قطري' },
    { id: 'Bahraini', label: 'Bahraini Style', labelAr: 'ستايل بحريني' },
    { id: 'Omani', label: 'Omani Style', labelAr: 'ستايل عماني' },
    { id: 'Modern', label: 'Modern Satorial', labelAr: 'قصات عصرية' },
  ];

  const designTypes = [
    { id: 'all', label: 'All Types', labelAr: 'كل التصاميم' },
    { id: 'Thobe', label: 'Thobe', labelAr: 'ثوب' },
    { id: 'Jubba', label: 'Jubba', labelAr: 'جبّة' },
    { id: 'Dagla', label: 'Dagla', labelAr: 'دقلة' },
    { id: 'Balto', label: 'Balto (Overcoat)', labelAr: 'بالطو' },
    { id: 'Formal', label: 'Formal / Bisht', labelAr: 'ملابس رسمية' },
    { id: 'Embroidery', label: 'Embroidery', labelAr: 'تطريز' },
    { id: 'Alteration', label: 'Alterations', labelAr: 'تعديلات' },
    { id: 'Custom', label: 'Custom', labelAr: 'تفصيل خاص' },
  ];

  return (
    <div className={`bg-white p-3 sm:p-4 rounded-xl border border-[#E6E2DB] shadow-xs space-y-3 ${className}`}>
      {/* Top Filter Controls Row */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* 1. Creator Type Segmented Control */}
        <div className="flex items-center p-1 bg-[#F5F2EB] rounded-lg border border-[#E6E2DB]">
          <button
            type="button"
            onClick={() => onChange({ ...filters, creatorType: 'ALL' })}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              filters.creatorType === 'ALL'
                ? 'bg-white text-[#121316] shadow-xs'
                : 'text-[#65625D] hover:text-[#121316]'
            }`}
          >
            {isRtl ? 'الكل' : 'All Creators'}
          </button>
          <button
            type="button"
            onClick={() => onChange({ ...filters, creatorType: 'SHOP' })}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              filters.creatorType === 'SHOP'
                ? 'bg-white text-[#121316] shadow-xs'
                : 'text-[#65625D] hover:text-[#121316]'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-[#916F3E]" />
            <span>{isRtl ? 'المشاغل' : 'Shops'}</span>
          </button>
          <button
            type="button"
            onClick={() => onChange({ ...filters, creatorType: 'TAILOR' })}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              filters.creatorType === 'TAILOR'
                ? 'bg-white text-[#121316] shadow-xs'
                : 'text-[#65625D] hover:text-[#121316]'
            }`}
          >
            <Scissors className="w-3.5 h-3.5 text-[#916F3E]" />
            <span>{isRtl ? 'الخيّاطون' : 'Tailors'}</span>
          </button>
        </div>

        {/* 2. City Selector */}
        <div className="relative">
          <select
            aria-label={isRtl ? 'المدينة' : 'City'}
            value={filters.city}
            onChange={(e) => onChange({ ...filters, city: e.target.value })}
            className="appearance-none bg-white text-xs font-medium text-[#121316] border border-[#E6E2DB] rounded-lg px-3 py-1.5 pe-7 focus:outline-hidden focus:border-[#C5A880] cursor-pointer"
          >
            {cities.map((c) => (
              <option key={c.id} value={c.id}>
                {isRtl ? c.labelAr : c.label}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-[#8E8B85] absolute end-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* 3. Distance Selector */}
        <div className="relative">
          <select
            aria-label={isRtl ? 'المسافة' : 'Distance'}
            value={filters.distanceKm}
            onChange={(e) => onChange({ ...filters, distanceKm: Number(e.target.value) })}
            className="appearance-none bg-white text-xs font-medium text-[#121316] border border-[#E6E2DB] rounded-lg px-3 py-1.5 pe-7 focus:outline-hidden focus:border-[#C5A880] cursor-pointer"
          >
            {distances.map((d) => (
              <option key={d.value} value={d.value}>
                {isRtl ? d.labelAr : d.label}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-[#8E8B85] absolute end-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* 4. Style Selector */}
        <div className="relative">
          <select
            aria-label={isRtl ? 'النمط' : 'Style'}
            value={filters.style}
            onChange={(e) => onChange({ ...filters, style: e.target.value })}
            className="appearance-none bg-white text-xs font-medium text-[#121316] border border-[#E6E2DB] rounded-lg px-3 py-1.5 pe-7 focus:outline-hidden focus:border-[#C5A880] cursor-pointer"
          >
            {styles.map((s) => (
              <option key={s.id} value={s.id}>
                {isRtl ? s.labelAr : s.label}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-[#8E8B85] absolute end-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* 5. Design Type Selector */}
        <div className="relative">
          <select
            aria-label={isRtl ? 'نوع التصميم' : 'Design Type'}
            value={filters.designType}
            onChange={(e) => onChange({ ...filters, designType: e.target.value })}
            className="appearance-none bg-white text-xs font-medium text-[#121316] border border-[#E6E2DB] rounded-lg px-3 py-1.5 pe-7 focus:outline-hidden focus:border-[#C5A880] cursor-pointer"
          >
            {designTypes.map((dt) => (
              <option key={dt.id} value={dt.id}>
                {isRtl ? dt.labelAr : dt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-[#8E8B85] absolute end-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* 6. Media Type Filter (Photos / Videos / Before & After) */}
        <div className="flex items-center p-0.5 bg-[#FAF9F6] rounded-lg border border-[#E6E2DB]">
          <button
            type="button"
            onClick={() => onChange({ ...filters, mediaType: 'all' })}
            className={`p-1.5 text-xs rounded-md transition-colors cursor-pointer ${
              filters.mediaType === 'all'
                ? 'bg-white text-[#121316] shadow-xs'
                : 'text-[#8E8B85] hover:text-[#121316]'
            }`}
            title={isRtl ? 'كل الوسائط' : 'All Media'}
          >
            <Compass className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onChange({ ...filters, mediaType: 'image' })}
            className={`p-1.5 text-xs rounded-md transition-colors cursor-pointer ${
              filters.mediaType === 'image'
                ? 'bg-white text-[#121316] shadow-xs'
                : 'text-[#8E8B85] hover:text-[#121316]'
            }`}
            title={isRtl ? 'صور فقط' : 'Photos Only'}
          >
            <ImageIcon className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onChange({ ...filters, mediaType: 'video' })}
            className={`p-1.5 text-xs rounded-md transition-colors cursor-pointer ${
              filters.mediaType === 'video'
                ? 'bg-white text-[#121316] shadow-xs'
                : 'text-[#8E8B85] hover:text-[#121316]'
            }`}
            title={isRtl ? 'فيديو فقط' : 'Videos Only'}
          >
            <Video className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onChange({ ...filters, mediaType: 'beforeAfter' })}
            className={`p-1.5 text-xs rounded-md transition-colors cursor-pointer ${
              filters.mediaType === 'beforeAfter'
                ? 'bg-white text-[#121316] shadow-xs'
                : 'text-[#8E8B85] hover:text-[#121316]'
            }`}
            title={isRtl ? 'قبل وبعد التعديل' : 'Before & After'}
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 7. Verification Toggle */}
        <button
          type="button"
          onClick={() => onChange({ ...filters, verifiedOnly: !filters.verifiedOnly })}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
            filters.verifiedOnly
              ? 'bg-[#C5A880]/15 text-[#916F3E] border-[#C5A880]'
              : 'bg-white text-[#65625D] border-[#E6E2DB] hover:border-[#C5A880]'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>{isRtl ? 'المعتمدون فقط' : 'Verified Only'}</span>
        </button>

        {/* 8. Availability Filter (Available for Order vs Inspiration Only) */}
        <button
          type="button"
          onClick={() => {
            const nextAvailability =
              filters.availability === 'all'
                ? 'available_for_order'
                : filters.availability === 'available_for_order'
                ? 'inspiration_only'
                : 'all';
            onChange({ ...filters, availability: nextAvailability });
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
            filters.availability !== 'all'
              ? 'bg-[#1E5638]/10 text-[#1E5638] border-[#1E5638]/40'
              : 'bg-white text-[#65625D] border-[#E6E2DB] hover:border-[#C5A880]'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>
            {filters.availability === 'all'
              ? isRtl
                ? 'كل الحالات'
                : 'All Availability'
              : filters.availability === 'available_for_order'
              ? isRtl
                ? 'متاح للطلب'
                : 'Available to Order'
              : isRtl
              ? 'إلهام وتراث فقط'
              : 'Inspiration Only'}
          </span>
        </button>

        {/* Reset Filters CTA if active */}
        {activeCount > 0 && (
          <button
            type="button"
            onClick={onReset}
            className="ms-auto flex items-center gap-1 text-xs text-[#916F3E] font-medium hover:underline cursor-pointer px-2 py-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{isRtl ? 'إعادة ضبط' : 'Reset filters'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
