import React from 'react';
import {
  Sliders,
  Check,
  Sparkles,
  Info,
  Scissors,
  FileText,
} from 'lucide-react';
import { OrderPreferences } from '../../types/booking';
import { useLanguage } from '../../localization/LanguageContext';

export interface PreferencesStepProps {
  preferences: OrderPreferences;
  onUpdatePreferences: (prefs: Partial<OrderPreferences>) => void;
}

export const PreferencesStep: React.FC<PreferencesStepProps> = ({
  preferences,
  onUpdatePreferences,
}) => {
  const { t, isRtl } = useLanguage();

  const collarOptions = [
    { id: 'classic', label: isRtl ? 'قلاب سعودي ملكي كلاسيكي' : 'Classic Saudi Royal Collar' },
    { id: 'modern_flat', label: isRtl ? 'قلاب عصري منخفض' : 'Modern Low Flat Collar' },
    { id: 'mandarin_round', label: isRtl ? 'ياقة دائرية صينية' : 'Mandarin Round Collar' },
    { id: 'kuwaiti_soft', label: isRtl ? 'قلاب كويتي انسيابي لين' : 'Kuwaiti Soft Collar' },
    { id: 'custom', label: isRtl ? 'مواصفات خاصة' : 'Custom Collar Spec' },
  ];

  const collarStiffnessOptions = [
    { id: 'very_stiff', label: isRtl ? 'حشوة واقفة صلبة (ملكي)' : 'Stiff Royal Interlining' },
    { id: 'medium', label: isRtl ? 'حشوة متوسطة مرنة' : 'Medium Flexible' },
    { id: 'soft', label: isRtl ? 'حشوة ناعمة مريحة' : 'Soft Natural' },
  ];

  const cuffOptions = [
    { id: 'standard_open', label: isRtl ? 'كبك سادة مفتوح (بدون زر)' : 'Standard Open Cuff' },
    { id: 'french_double', label: isRtl ? 'كبك فرنسي دائري مقوى' : 'French Double Cuff (+30 SAR)' },
    { id: 'single_button', label: isRtl ? 'كبك زرار واحد كلاسيكي' : 'Single Button Cuff' },
    { id: 'square_cuff', label: isRtl ? 'كبك مربع زاوي' : 'Square Cut Cuff' },
    { id: 'custom', label: isRtl ? 'شكل مخصص' : 'Custom Finish' },
  ];

  const buttonOptions = [
    { id: 'hidden_snap', label: isRtl ? 'طقطق وسحاب مخفي' : 'Concealed Snap Placket' },
    { id: 'standard_visible', label: isRtl ? 'أزرار عادية ظاهرة' : 'Standard Visible Buttons' },
    { id: 'traditional_shell', label: isRtl ? 'أزرار صدف طبيعي فاخر' : 'Mother-of-Pearl Shell (+25 SAR)' },
    { id: 'metal_antique', label: isRtl ? 'أزرار معدنية تراثية' : 'Antique Brass / Metal' },
  ];

  const embroideryOptions = [
    { id: 'none', label: isRtl ? 'بدون تطريز (سادة راقي)' : 'None (Pure Minimalist)' },
    { id: 'subtle_monogram', label: isRtl ? 'مونوغرام اسمي على الكبك' : 'Subtle Cuff Monogram (+45 SAR)' },
    { id: 'royal_zari', label: isRtl ? 'قصب زري مذهب فاخر' : 'Royal Gold Zari (+120 SAR)' },
  ];

  const fitOptions = [
    { id: 'slim_tailored', label: isRtl ? 'مفصل على القوام (سليم فِت)' : 'Slim Tailored Fit' },
    { id: 'regular_comfort', label: isRtl ? 'معتدل كلاسيكي مريح' : 'Regular Comfort Fit' },
    { id: 'traditional_generous', label: isRtl ? 'فضفاض تراثي واسع' : 'Traditional Generous Cut' },
  ];

  return (
    <div className="space-y-6 text-start">
      {/* 1. HEADER */}
      <div>
        <h1 className="text-lg sm:text-xl font-bold text-[#121316] font-display">
          {t.booking.preferencesTitle}
        </h1>
        <p className="text-xs text-[#65625D] mt-0.5">
          {isRtl
            ? 'اللمسات الدقيقة تميز ثوبك الشخصي. حدد نمط الياقة، الكبك، وأسلوب الإغلاق.'
            : 'Artisanal tailoring touches that personalize your silhouette, collar firmness, and cuff finishes.'}
        </p>
      </div>

      {/* 2. SECTIONS */}
      <div className="bg-white rounded-xl border border-[#E6E2DB] p-5 space-y-6 shadow-xs">
        {/* Collar Style */}
        <div>
          <label className="block text-xs font-bold text-[#121316] mb-2">
            {t.booking.collarStyle}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {collarOptions.map((opt) => {
              const isSelected = preferences.collarStyle === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onUpdatePreferences({ collarStyle: opt.id as any })}
                  className={`p-3 rounded-lg border text-start text-xs font-medium transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'border-[#C5A880] bg-[#FAF4EB] text-[#121316] font-bold'
                      : 'border-[#E6E2DB] hover:bg-[#FAF9F6] text-[#65625D]'
                  }`}
                >
                  <span>{opt.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#916F3E] shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Collar Stiffness */}
        <div className="pt-4 border-t border-[#F2EFE9]">
          <label className="block text-xs font-bold text-[#121316] mb-2">
            {t.booking.collarStiffness}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {collarStiffnessOptions.map((opt) => {
              const isSelected = preferences.collarStiffness === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onUpdatePreferences({ collarStiffness: opt.id as any })}
                  className={`p-2.5 rounded-lg border text-start text-xs font-medium transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'border-[#C5A880] bg-[#FAF4EB] text-[#121316] font-bold'
                      : 'border-[#E6E2DB] hover:bg-[#FAF9F6] text-[#65625D]'
                  }`}
                >
                  <span>{opt.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#916F3E] shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Cuff Style */}
        <div className="pt-4 border-t border-[#F2EFE9]">
          <label className="block text-xs font-bold text-[#121316] mb-2">
            {t.booking.cuffStyle}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {cuffOptions.map((opt) => {
              const isSelected = preferences.cuffStyle === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onUpdatePreferences({ cuffStyle: opt.id as any })}
                  className={`p-3 rounded-lg border text-start text-xs font-medium transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'border-[#C5A880] bg-[#FAF4EB] text-[#121316] font-bold'
                      : 'border-[#E6E2DB] hover:bg-[#FAF9F6] text-[#65625D]'
                  }`}
                >
                  <span>{opt.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#916F3E] shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Buttons Style */}
        <div className="pt-4 border-t border-[#F2EFE9]">
          <label className="block text-xs font-bold text-[#121316] mb-2">
            {t.booking.buttonsStyle}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {buttonOptions.map((opt) => {
              const isSelected = preferences.buttonsStyle === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onUpdatePreferences({ buttonsStyle: opt.id as any })}
                  className={`p-2.5 rounded-lg border text-start text-xs font-medium transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'border-[#C5A880] bg-[#FAF4EB] text-[#121316] font-bold'
                      : 'border-[#E6E2DB] hover:bg-[#FAF9F6] text-[#65625D]'
                  }`}
                >
                  <span>{opt.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#916F3E] shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Embroidery & Monogram */}
        <div className="pt-4 border-t border-[#F2EFE9]">
          <label className="block text-xs font-bold text-[#121316] mb-2">
            {t.booking.embroideryStyle}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {embroideryOptions.map((opt) => {
              const isSelected = preferences.embroideryStyle === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onUpdatePreferences({ embroideryStyle: opt.id as any })}
                  className={`p-2.5 rounded-lg border text-start text-xs font-medium transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'border-[#C5A880] bg-[#FAF4EB] text-[#121316] font-bold'
                      : 'border-[#E6E2DB] hover:bg-[#FAF9F6] text-[#65625D]'
                  }`}
                >
                  <span>{opt.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#916F3E] shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Fit Preference */}
        <div className="pt-4 border-t border-[#F2EFE9]">
          <label className="block text-xs font-bold text-[#121316] mb-2">
            {t.booking.fitPreference}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {fitOptions.map((opt) => {
              const isSelected = preferences.fitPreference === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onUpdatePreferences({ fitPreference: opt.id as any })}
                  className={`p-2.5 rounded-lg border text-start text-xs font-medium transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'border-[#C5A880] bg-[#FAF4EB] text-[#121316] font-bold'
                      : 'border-[#E6E2DB] hover:bg-[#FAF9F6] text-[#65625D]'
                  }`}
                >
                  <span>{opt.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#916F3E] shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Special Instructions (Section 23) */}
        <div className="pt-4 border-t border-[#F2EFE9]">
          <label className="block text-xs font-bold text-[#121316] mb-1.5">
            {t.booking.specialInstructions}
          </label>
          <textarea
            rows={3}
            value={preferences.specialInstructions || ''}
            onChange={(e) => onUpdatePreferences({ specialInstructions: e.target.value })}
            placeholder={t.booking.specialInstructionsPlaceholder}
            className="w-full text-xs p-3 rounded-lg border border-[#E6E2DB] bg-[#FAF9F6] focus:outline-hidden focus:border-[#C5A880]"
          />
        </div>
      </div>
    </div>
  );
};
