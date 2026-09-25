import React from 'react';
import { Search, X, Sparkles } from 'lucide-react';
import { useLanguage } from '../../localization/LanguageContext';

export interface DesignSearchProps {
  query: string;
  onQueryChange: (query: string) => void;
  onClear: () => void;
  className?: string;
}

export const DesignSearch: React.FC<DesignSearchProps> = ({
  query,
  onQueryChange,
  onClear,
  className = '',
}) => {
  const { isRtl } = useLanguage();

  const popularQueries = [
    { text: 'Saudi Thobe', label: isRtl ? 'ثوب سعودي' : 'Saudi Thobe' },
    { text: 'Jubba', label: isRtl ? 'جبّة أعراس' : 'Jubba' },
    { text: 'Dagla', label: isRtl ? 'دقلة شتوية' : 'Dagla' },
    { text: 'Embroidery', label: isRtl ? 'تطريز ذهبي' : 'Embroidery' },
    { text: 'White Thobe', label: isRtl ? 'ثوب أبيض ناصع' : 'White Thobe' },
    { text: 'Winter Thobe', label: isRtl ? 'ثوب شتوي صوف' : 'Winter Thobe' },
    { text: 'Wedding Thobe', label: isRtl ? 'ثياب مناسبات' : 'Wedding Thobe' },
    { text: 'Royal Collar', label: isRtl ? 'قلاب ملكي' : 'Royal Collar' },
  ];

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Prominent Search Input */}
      <div className="relative flex items-center">
        <Search className="w-4 h-4 text-[#8E8B85] absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={
            isRtl
              ? 'ابحث باسم التصميم، نوع القماش (تويوبو، شكيبو)، ستايل القلاب، أو اسم الخياط...'
              : 'Search designs by style, fabric (Toyobo, Scabal), collar design, or tailor...'
          }
          className="w-full bg-white text-xs sm:text-sm text-[#121316] rounded-xl border border-[#D4D0C7] ps-10 pe-10 py-3 shadow-xs focus:outline-hidden focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880]"
        />
        {query && (
          <button
            type="button"
            onClick={onClear}
            className="absolute end-3.5 top-1/2 -translate-y-1/2 text-[#8E8B85] hover:text-[#121316] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Popular Search Tags */}
      <div className="flex items-center gap-1.5 overflow-x-auto text-[11px] text-[#65625D] no-scrollbar">
        <span className="font-semibold shrink-0 text-[#8E8B85] flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#C5A880]" />
          <span>{isRtl ? 'شائع:' : 'Popular:'}</span>
        </span>
        {popularQueries.map((item) => (
          <button
            key={item.text}
            type="button"
            onClick={() => onQueryChange(item.text)}
            className="px-2.5 py-1 rounded-md bg-white border border-[#E6E2DB] hover:border-[#C5A880] hover:text-[#121316] transition-colors cursor-pointer shrink-0"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};
