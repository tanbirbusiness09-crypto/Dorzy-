import React from 'react';
import { Scissors } from 'lucide-react';
import { useLanguage } from '../../localization/LanguageContext';
import { CraftDetailsData } from '../../types';

export interface CraftDetailsProps {
  details: CraftDetailsData;
  className?: string;
}

export const CraftDetails: React.FC<CraftDetailsProps> = ({ details, className = '' }) => {
  const { isRtl } = useLanguage();

  const rows: { label: string; labelAr: string; value?: string; valueAr?: string }[] = [
    {
      label: 'Style & Silhouette',
      labelAr: 'النمط والقصّة',
      value: details.style,
      valueAr: details.styleAr,
    },
    {
      label: 'Fabric',
      labelAr: 'القماش',
      value: details.fabric,
      valueAr: details.fabricAr,
    },
    {
      label: 'Fabric Mill',
      labelAr: 'المصنع المورد',
      value: details.fabricMill,
      valueAr: details.fabricMillAr,
    },
    {
      label: 'Collar Style',
      labelAr: 'هندسة القلاب',
      value: details.collar,
      valueAr: details.collarAr,
    },
    {
      label: 'Cuff Style',
      labelAr: 'ستايل الكبك والكم',
      value: details.cuff,
      valueAr: details.cuffAr,
    },
    {
      label: 'Buttons & Closures',
      labelAr: 'الأزرار والمشابك',
      value: details.buttons,
      valueAr: details.buttonsAr,
    },
    {
      label: 'Embroidery & Zari',
      labelAr: 'التطريز والزري',
      value: details.embroidery,
      valueAr: details.embroideryAr,
    },
    {
      label: 'Stitching & Needling',
      labelAr: 'دقة الغرز والحياكة',
      value: details.stitching,
      valueAr: details.stitchingAr,
    },
    {
      label: 'Fit & Ergonomics',
      labelAr: 'ملاءمة القوام والنزلة',
      value: details.fit,
      valueAr: details.fitAr,
    },
    {
      label: 'Recommended Occasion',
      labelAr: 'المناسبة المقترحة',
      value: details.occasion,
      valueAr: details.occasionAr,
    },
    {
      label: 'Season',
      labelAr: 'الموسم',
      value: details.season,
      valueAr: details.seasonAr,
    },
  ].filter((item) => !!item.value || !!item.valueAr);

  if (rows.length === 0) return null;

  return (
    <div className={`bg-white rounded-xl border border-[#E6E2DB] shadow-xs p-5 space-y-4 ${className}`}>
      <div className="flex items-center gap-2 pb-2.5 border-b border-[#E6E2DB]">
        <Scissors className="w-4 h-4 text-[#916F3E]" />
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#121316]">
          {isRtl ? 'المواصفات الحرفية والهندسية' : 'Craft Details'}
        </h3>
      </div>

      <div className="space-y-2.5 text-xs">
        {rows.map((row, idx) => {
          const displayValue = isRtl ? row.valueAr || row.value : row.value || row.valueAr;
          const displayLabel = isRtl ? row.labelAr : row.label;

          return (
            <div
              key={idx}
              className="flex items-start justify-between gap-4 py-1 border-b border-[#FAF9F6] last:border-b-0"
            >
              <span className="font-semibold text-[#121316] shrink-0">{displayLabel}:</span>
              <span className="text-end text-[#65625D] leading-relaxed">{displayValue}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
