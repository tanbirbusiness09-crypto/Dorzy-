import React from 'react';
import { useLanguage } from '../../localization/LanguageContext';

export interface DesignCategoryTabsProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  className?: string;
}

export const designCategoriesList = [
  { id: 'All', label: 'All Designs', labelAr: 'جميع التصاميم' },
  { id: 'Saudi Thobe', label: 'Saudi Thobe', labelAr: 'ثوب سعودي' },
  { id: 'Kuwaiti Thobe', label: 'Kuwaiti Thobe', labelAr: 'ثوب كويتي' },
  { id: 'Emirati Thobe', label: 'Emirati Thobe', labelAr: 'ثوب إماراتي' },
  { id: 'Qatari Thobe', label: 'Qatari Thobe', labelAr: 'ثوب قطري' },
  { id: 'Bahraini Thobe', label: 'Bahraini Thobe', labelAr: 'ثوب بحريني' },
  { id: 'Omani Style', label: 'Omani Style', labelAr: 'موديل عماني' },
  { id: 'Jubba', label: 'Jubba', labelAr: 'جبّة' },
  { id: 'Dagla', label: 'Dagla', labelAr: 'دقلة' },
  { id: 'Balto', label: 'Balto (Overcoat)', labelAr: 'بالطو' },
  { id: 'Formal Wear', label: 'Formal Wear', labelAr: 'ملبوسات رسمية' },
  { id: 'Ceremonial Bisht', label: 'Ceremonial Bisht', labelAr: 'بشت ملكي' },
  { id: 'Embroidery', label: 'Embroidery', labelAr: 'تطريز' },
  { id: 'Collar Designs', label: 'Collar Designs', labelAr: 'تصاميم القلاب' },
  { id: 'Cuff Designs', label: 'Cuff Designs', labelAr: 'تصاميم الكبك' },
  { id: 'Fabric', label: 'Fabric', labelAr: 'أقمشة فاخرة' },
  { id: 'Alterations', label: 'Alterations', labelAr: 'تعديلات' },
  { id: 'Custom Designs', label: 'Custom Designs', labelAr: 'تفصيل خاص' },
];

export const DesignCategoryTabs: React.FC<DesignCategoryTabsProps> = ({
  activeCategory,
  onSelectCategory,
  className = '',
}) => {
  const { isRtl } = useLanguage();

  return (
    <div className={`overflow-x-auto no-scrollbar py-2.5 ${className}`}>
      <div className="flex items-center gap-1.5 min-w-max">
        {designCategoriesList.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#121316] text-[#FAF9F6] shadow-xs'
                  : 'text-[#65625D] hover:text-[#121316] hover:bg-[#FAF9F6]'
              }`}
            >
              {isRtl ? cat.labelAr : cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
