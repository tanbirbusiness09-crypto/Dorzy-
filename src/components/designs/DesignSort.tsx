import React from 'react';
import { ArrowUpDown, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../localization/LanguageContext';

export type DesignSortOption =
  | 'recommended'
  | 'recent'
  | 'saved'
  | 'viewed'
  | 'reviewed'
  | 'nearby';

export interface DesignSortProps {
  value: DesignSortOption;
  onChange: (value: DesignSortOption) => void;
  className?: string;
}

export const DesignSort: React.FC<DesignSortProps> = ({ value, onChange, className = '' }) => {
  const { isRtl } = useLanguage();

  const options: { id: DesignSortOption; label: string; labelAr: string }[] = [
    { id: 'recommended', label: 'Recommended', labelAr: 'الموصى به' },
    { id: 'recent', label: 'Most Recent', labelAr: 'الأحدث' },
    { id: 'saved', label: 'Most Saved', labelAr: 'الأكثر حفظاً' },
    { id: 'viewed', label: 'Most Viewed', labelAr: 'الأكثر مشاهدة' },
    { id: 'reviewed', label: 'Most Reviewed', labelAr: 'الأعلى تقييماً' },
    { id: 'nearby', label: 'Nearby', labelAr: 'الأقرب إليك' },
  ];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-xs text-[#8E8B85] flex items-center gap-1 shrink-0">
        <ArrowUpDown className="w-3.5 h-3.5" />
        <span>{isRtl ? 'الترتيب:' : 'Sort:'}</span>
      </span>

      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as DesignSortOption)}
          aria-label={isRtl ? 'ترتيب النتائج' : 'Sort designs'}
          className="appearance-none bg-[#FAF9F6] text-xs font-semibold text-[#121316] border border-[#E6E2DB] rounded-lg px-3 py-1.5 pe-7 focus:outline-hidden focus:border-[#C5A880] cursor-pointer"
        >
          {options.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {isRtl ? opt.labelAr : opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="w-3.5 h-3.5 text-[#8E8B85] absolute end-2 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </div>
  );
};
