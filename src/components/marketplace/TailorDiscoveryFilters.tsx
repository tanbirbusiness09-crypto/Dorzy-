import React from 'react';
import {
  RotateCcw,
  Check,
  MapPin,
  Award,
  Star,
  Clock,
  Building2,
  Languages,
  ShieldCheck,
  Briefcase,
  ChevronDown,
} from 'lucide-react';
import { useLanguage } from '../../localization/LanguageContext';
import { TailorFilterState, TailorSpecialty, TailorWorkType, TailorAvailability } from '../../types';
import { saudiCitiesData } from '../../data/mock/locations';

export interface TailorDiscoveryFiltersProps {
  filters: TailorFilterState;
  onChange: (filters: TailorFilterState) => void;
  onReset: () => void;
  totalCount: number;
  className?: string;
}

export const TailorDiscoveryFilters: React.FC<TailorDiscoveryFiltersProps> = ({
  filters,
  onChange,
  onReset,
  totalCount,
  className = '',
}) => {
  const { isRtl } = useLanguage();

  const specialtyOptions: { id: TailorSpecialty; label: string; labelAr: string }[] = [
    { id: 'Saudi Thobe', label: 'Saudi Thobe', labelAr: 'ثوب سعودي' },
    { id: 'Kuwaiti Thobe', label: 'Kuwaiti Thobe', labelAr: 'ثوب كويتي' },
    { id: 'Emirati Thobe', label: 'Emirati Thobe', labelAr: 'ثوب إماراتي' },
    { id: 'Qatari Style', label: 'Qatari Style', labelAr: 'موديل قطري' },
    { id: 'Bahraini Style', label: 'Bahraini Style', labelAr: 'موديل بحريني' },
    { id: 'Omani Style', label: 'Omani Style', labelAr: 'موديل عماني' },
    { id: 'Jubba', label: 'Jubba', labelAr: 'جبة تراثية' },
    { id: 'Dagla', label: 'Dagla', labelAr: 'دقلة شتوية' },
    { id: 'Balto', label: 'Balto (Overcoat)', labelAr: 'بالطو شتوي' },
    { id: 'Embroidery', label: 'Embroidery & Zari', labelAr: 'تطريز وقصب زري' },
    { id: 'Formal Wear', label: 'Formal Wear', labelAr: 'ملبوسات رسمية' },
    { id: 'Alterations', label: 'Alterations & Restyling', labelAr: 'تعديل قياسات وإصلاح' },
    { id: 'Custom Tailoring', label: 'Custom Tailoring', labelAr: 'تفصيل مخصص بالكامل' },
  ];

  const experienceOptions = [
    { min: 0, label: 'Any Experience', labelAr: 'أي خبرة' },
    { min: 1, label: '1+ years', labelAr: 'أكثر من سنة' },
    { min: 3, label: '3+ years', labelAr: '3+ سنوات' },
    { min: 5, label: '5+ years', labelAr: '5+ سنوات' },
    { min: 10, label: '10+ years', labelAr: '10+ سنوات' },
    { min: 15, label: '15+ years', labelAr: '15+ سنة' },
  ];

  const ratingOptions = [
    { min: 0, label: 'All Ratings', labelAr: 'جميع التقييمات' },
    { min: 4.5, label: '4.5+ ★', labelAr: '4.5+ ★' },
    { min: 4.0, label: '4.0+ ★', labelAr: '4.0+ ★' },
    { min: 3.5, label: '3.5+ ★', labelAr: '3.5+ ★' },
    { min: 3.0, label: '3.0+ ★', labelAr: '3.0+ ★' },
  ];

  const availabilityOptions: { id: 'all' | TailorAvailability; label: string; labelAr: string }[] = [
    { id: 'all', label: 'All Availability', labelAr: 'الكل' },
    { id: 'available', label: 'Available Now', labelAr: 'متاح للطلبات' },
    { id: 'busy', label: 'Currently Busy', labelAr: 'مشغول حالياً' },
    { id: 'available_soon', label: 'Available Soon', labelAr: 'متاح قريباً' },
  ];

  const shopStatusOptions = [
    { id: 'all', label: 'All Tailors', labelAr: 'جميع الخيّاطين' },
    { id: 'shop_based', label: 'Shop-based Artisan', labelAr: 'يعمل في مشغل معتمد' },
    { id: 'independent', label: 'Independent Artisan', labelAr: 'حرفي مستقل' },
    { id: 'has_shop', label: 'Has Current Atelier', labelAr: 'مرتبط بمشغل' },
  ];

  const languageOptions = [
    { id: 'Arabic', label: 'Arabic', labelAr: 'العربية' },
    { id: 'English', label: 'English', labelAr: 'الإنجليزية' },
    { id: 'Urdu', label: 'Urdu', labelAr: 'الأوردو' },
    { id: 'Hindi', label: 'Hindi', labelAr: 'الهندية' },
    { id: 'Bengali', label: 'Bengali', labelAr: 'البنغالية' },
  ];

  const workTypeOptions: { id: 'all' | TailorWorkType; label: string; labelAr: string }[] = [
    { id: 'all', label: 'All Work Types', labelAr: 'الكل' },
    { id: 'shop_based', label: 'Shop-based', labelAr: 'في مشغل' },
    { id: 'independent', label: 'Independent', labelAr: 'مستقل' },
    { id: 'collaboration', label: 'Available for Collaboration', labelAr: 'متاح للتعاون' },
  ];

  const distanceOptions = [
    { km: 5, label: 'Within 5 km', labelAr: 'ضمن 5 كم' },
    { km: 10, label: 'Within 10 km', labelAr: 'ضمن 10 كم' },
    { km: 25, label: 'Within 25 km', labelAr: 'ضمن 25 كم' },
    { km: 50, label: 'Within 50 km', labelAr: 'ضمن 50 كم' },
    { km: 999, label: 'Any Distance', labelAr: 'أي مسافة' },
  ];

  // Selected city neighborhoods
  const currentCityData = saudiCitiesData.find((c) => c.id === filters.city);

  const toggleSpecialty = (spec: string) => {
    const next = filters.specialties.includes(spec)
      ? filters.specialties.filter((s) => s !== spec)
      : [...filters.specialties, spec];
    onChange({ ...filters, specialties: next });
  };

  const toggleLanguage = (lang: string) => {
    const next = filters.languages.includes(lang)
      ? filters.languages.filter((l) => l !== lang)
      : [...filters.languages, lang];
    onChange({ ...filters, languages: next });
  };

  return (
    <aside className={`space-y-6 ${className}`}>
      {/* Header & Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E6E2DB]">
        <div>
          <h2 className="text-sm font-bold text-[#121316] uppercase tracking-wider">
            {isRtl ? 'تصفية الخيّاطين' : 'Filter Tailors'}
          </h2>
          <p className="text-xs text-[#8E8B85] mt-0.5">
            {isRtl ? `${totalCount} حرفي متاح` : `${totalCount} artisans found`}
          </p>
        </div>

        <button
          onClick={onReset}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#916F3E] hover:text-[#7A5C32] transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{isRtl ? 'إعادة ضبط' : 'Reset All'}</span>
        </button>
      </div>

      {/* 1. Location & Distance */}
      <div className="space-y-3">
        <label className="flex items-center gap-1.5 text-xs font-bold text-[#121316] uppercase tracking-wider">
          <MapPin className="w-3.5 h-3.5 text-[#916F3E]" />
          <span>{isRtl ? 'المدينة والمنطقة' : 'Location & Distance'}</span>
        </label>

        {/* City Select */}
        <div className="relative">
          <select
            value={filters.city}
            onChange={(e) => onChange({ ...filters, city: e.target.value, area: 'all' })}
            className="w-full text-xs bg-[#FAF9F6] border border-[#E6E2DB] rounded-lg px-3 py-2 text-[#121316] focus:outline-none focus:border-[#C5A880] appearance-none cursor-pointer"
          >
            <option value="all">{isRtl ? 'جميع مدن المملكة' : 'All Saudi Cities'}</option>
            {saudiCitiesData.map((c) => (
              <option key={c.id} value={c.id}>
                {isRtl ? c.nameAr : c.name}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-[#8E8B85] absolute end-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Area / Neighborhood if city selected */}
        {currentCityData && currentCityData.neighborhoods.length > 0 && (
          <div className="relative">
            <select
              value={filters.area}
              onChange={(e) => onChange({ ...filters, area: e.target.value })}
              className="w-full text-xs bg-[#FAF9F6] border border-[#E6E2DB] rounded-lg px-3 py-2 text-[#121316] focus:outline-none focus:border-[#C5A880] appearance-none cursor-pointer"
            >
              <option value="all">{isRtl ? 'جميع الأحياء' : 'All Neighborhoods'}</option>
              {currentCityData.neighborhoods.map((n) => (
                <option key={n.id} value={n.name}>
                  {isRtl ? n.nameAr : n.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#8E8B85] absolute end-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        )}

        {/* Distance Range */}
        <div className="pt-1">
          <div className="flex items-center justify-between text-xs text-[#65625D] mb-1.5">
            <span>{isRtl ? 'النطاق الجغرافي:' : 'Max Distance:'}</span>
            <span className="font-semibold text-[#121316]">
              {filters.distanceKm >= 999
                ? isRtl ? 'أي مسافة' : 'Any'
                : `${filters.distanceKm} km`}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {distanceOptions.map((opt) => (
              <button
                key={opt.km}
                onClick={() => onChange({ ...filters, distanceKm: opt.km })}
                className={`text-[11px] px-2.5 py-1 rounded-md border transition-colors cursor-pointer ${
                  filters.distanceKm === opt.km
                    ? 'bg-[#121316] text-[#FAF9F6] border-[#121316] font-medium'
                    : 'bg-[#FAF9F6] text-[#65625D] border-[#E6E2DB] hover:border-[#B8B4AC]'
                }`}
              >
                {isRtl ? opt.labelAr : opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Specialties (Multi-Select) */}
      <div className="space-y-3 pt-3 border-t border-[#F2EFE9]">
        <label className="flex items-center gap-1.5 text-xs font-bold text-[#121316] uppercase tracking-wider">
          <Award className="w-3.5 h-3.5 text-[#916F3E]" />
          <span>{isRtl ? 'التخصص والموديل' : 'Specialty & Cut'}</span>
        </label>

        <div className="space-y-1.5 max-h-56 overflow-y-auto pe-1">
          {specialtyOptions.map((spec) => {
            const isChecked = filters.specialties.includes(spec.id);
            return (
              <label
                key={spec.id}
                className="flex items-center gap-2.5 text-xs text-[#24262E] cursor-pointer hover:text-[#121316] py-0.5 select-none"
              >
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-colors shrink-0 ${
                    isChecked
                      ? 'bg-[#916F3E] border-[#916F3E] text-white'
                      : 'border-[#C8C4BC] bg-white'
                  }`}
                  onClick={() => toggleSpecialty(spec.id)}
                >
                  {isChecked && <Check className="w-3 h-3 stroke-[2.5]" />}
                </div>
                <span onClick={() => toggleSpecialty(spec.id)}>
                  {isRtl ? spec.labelAr : spec.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 3. Experience (Clear labeling, no skill inference) */}
      <div className="space-y-3 pt-3 border-t border-[#F2EFE9]">
        <label className="flex items-center gap-1.5 text-xs font-bold text-[#121316] uppercase tracking-wider">
          <Award className="w-3.5 h-3.5 text-[#916F3E]" />
          <span>{isRtl ? 'سنوات الخبرة' : 'Experience Level'}</span>
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {experienceOptions.map((opt) => (
            <button
              key={opt.min}
              onClick={() => onChange({ ...filters, minExperienceYears: opt.min })}
              className={`text-xs px-2.5 py-1.5 rounded-lg border text-center transition-colors cursor-pointer ${
                filters.minExperienceYears === opt.min
                  ? 'bg-[#121316] text-[#FAF9F6] border-[#121316] font-semibold'
                  : 'bg-[#FAF9F6] text-[#65625D] border-[#E6E2DB] hover:border-[#B8B4AC]'
              }`}
            >
              {isRtl ? opt.labelAr : opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Minimum Rating */}
      <div className="space-y-3 pt-3 border-t border-[#F2EFE9]">
        <label className="flex items-center gap-1.5 text-xs font-bold text-[#121316] uppercase tracking-wider">
          <Star className="w-3.5 h-3.5 text-[#916F3E]" />
          <span>{isRtl ? 'التقييم الأدنى' : 'Minimum Rating'}</span>
        </label>
        <div className="flex flex-wrap gap-1.5">
          {ratingOptions.map((opt) => (
            <button
              key={opt.min}
              onClick={() => onChange({ ...filters, ratingMin: opt.min })}
              className={`text-xs px-2.5 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                filters.ratingMin === opt.min
                  ? 'bg-[#121316] text-[#FAF9F6] border-[#121316] font-semibold'
                  : 'bg-[#FAF9F6] text-[#65625D] border-[#E6E2DB] hover:border-[#B8B4AC]'
              }`}
            >
              {isRtl ? opt.labelAr : opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* 5. Availability Status (Demo State) */}
      <div className="space-y-3 pt-3 border-t border-[#F2EFE9]">
        <label className="flex items-center gap-1.5 text-xs font-bold text-[#121316] uppercase tracking-wider">
          <Clock className="w-3.5 h-3.5 text-[#916F3E]" />
          <span>{isRtl ? 'حالة التوفر' : 'Availability Status'}</span>
        </label>
        <div className="space-y-1.5">
          {availabilityOptions.map((opt) => (
            <label
              key={opt.id}
              className="flex items-center gap-2.5 text-xs text-[#24262E] cursor-pointer hover:text-[#121316] py-0.5 select-none"
            >
              <input
                type="radio"
                name="availability"
                checked={filters.availability === opt.id}
                onChange={() => onChange({ ...filters, availability: opt.id })}
                className="accent-[#916F3E] cursor-pointer"
              />
              <span>{isRtl ? opt.labelAr : opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 6. Current Shop Status */}
      <div className="space-y-3 pt-3 border-t border-[#F2EFE9]">
        <label className="flex items-center gap-1.5 text-xs font-bold text-[#121316] uppercase tracking-wider">
          <Building2 className="w-3.5 h-3.5 text-[#916F3E]" />
          <span>{isRtl ? 'الارتباط بمشغل' : 'Atelier Affiliation'}</span>
        </label>
        <div className="space-y-1.5">
          {shopStatusOptions.map((opt) => (
            <label
              key={opt.id}
              className="flex items-center gap-2.5 text-xs text-[#24262E] cursor-pointer hover:text-[#121316] py-0.5 select-none"
            >
              <input
                type="radio"
                name="shopStatus"
                checked={filters.shopStatus === opt.id}
                onChange={() =>
                  onChange({
                    ...filters,
                    shopStatus: opt.id as TailorFilterState['shopStatus'],
                  })
                }
                className="accent-[#916F3E] cursor-pointer"
              />
              <span>{isRtl ? opt.labelAr : opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 7. Languages Spoken */}
      <div className="space-y-3 pt-3 border-t border-[#F2EFE9]">
        <label className="flex items-center gap-1.5 text-xs font-bold text-[#121316] uppercase tracking-wider">
          <Languages className="w-3.5 h-3.5 text-[#916F3E]" />
          <span>{isRtl ? 'لغات التواصل' : 'Spoken Languages'}</span>
        </label>
        <div className="flex flex-wrap gap-1.5">
          {languageOptions.map((lang) => {
            const isSelected = filters.languages.includes(lang.id);
            return (
              <button
                key={lang.id}
                onClick={() => toggleLanguage(lang.id)}
                className={`text-xs px-2.5 py-1 rounded-md border transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#FAF6F0] text-[#916F3E] border-[#C5A880] font-semibold'
                    : 'bg-[#FAF9F6] text-[#65625D] border-[#E6E2DB] hover:border-[#B8B4AC]'
                }`}
              >
                {isRtl ? lang.labelAr : lang.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 8. Work Type */}
      <div className="space-y-3 pt-3 border-t border-[#F2EFE9]">
        <label className="flex items-center gap-1.5 text-xs font-bold text-[#121316] uppercase tracking-wider">
          <Briefcase className="w-3.5 h-3.5 text-[#916F3E]" />
          <span>{isRtl ? 'طبيعة العمل' : 'Work Type'}</span>
        </label>
        <div className="space-y-1.5">
          {workTypeOptions.map((wt) => (
            <label
              key={wt.id}
              className="flex items-center gap-2.5 text-xs text-[#24262E] cursor-pointer hover:text-[#121316] py-0.5 select-none"
            >
              <input
                type="radio"
                name="workType"
                checked={filters.workType === wt.id}
                onChange={() => onChange({ ...filters, workType: wt.id })}
                className="accent-[#916F3E] cursor-pointer"
              />
              <span>{isRtl ? wt.labelAr : wt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 9. Verified Tailors Only */}
      <div className="pt-3 border-t border-[#F2EFE9]">
        <label className="flex items-start gap-2.5 text-xs text-[#121316] cursor-pointer font-medium select-none">
          <input
            type="checkbox"
            checked={filters.verifiedOnly}
            onChange={(e) => onChange({ ...filters, verifiedOnly: e.target.checked })}
            className="accent-[#916F3E] mt-0.5 cursor-pointer"
          />
          <div>
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#1E5638]" />
              <span>{isRtl ? 'حرفيون موثقون فقط' : 'Verified Tailors Only'}</span>
            </div>
            <p className="text-[11px] text-[#8E8B85] mt-0.5">
              {isRtl
                ? 'عرض من تم التحقق من هويتهم الحرفية وخبرتهم'
                : 'Only tailors with verified skill and identity credentials'}
            </p>
          </div>
        </label>
      </div>
    </aside>
  );
};
