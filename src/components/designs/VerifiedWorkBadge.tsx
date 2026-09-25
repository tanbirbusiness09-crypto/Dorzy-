import React from 'react';
import { ShieldCheck, CheckCircle2, Scissors, Building2 } from 'lucide-react';
import { useLanguage } from '../../localization/LanguageContext';
import { CreatorType, VerifiedWorkType } from '../../types';

export interface CreatorBadgeProps {
  type: CreatorType;
  isVerified?: boolean;
  className?: string;
}

export const CreatorBadge: React.FC<CreatorBadgeProps> = ({
  type,
  isVerified = false,
  className = '',
}) => {
  const { isRtl } = useLanguage();
  const isTailor = type === 'TAILOR' || type === 'tailor';

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold border select-none ${
        isTailor
          ? 'bg-[#F9F6F0] text-[#916F3E] border-[#E2D5C3]'
          : 'bg-[#F5F3EF] text-[#24262E] border-[#E6E2DB]'
      } ${className}`}
    >
      {isTailor ? (
        <Scissors className="w-3 h-3 text-[#916F3E]" />
      ) : (
        <Building2 className="w-3 h-3 text-[#65625D]" />
      )}
      <span>{isTailor ? (isRtl ? 'معلّم خياطة' : 'Tailor') : isRtl ? 'مشغل معتمد' : 'Shop'}</span>
      {isVerified && <ShieldCheck className="w-3 h-3 text-[#C5A880] ms-0.5" />}
    </span>
  );
};

export interface VerifiedWorkBadgeProps {
  type?: VerifiedWorkType;
  className?: string;
}

export const VerifiedWorkBadge: React.FC<VerifiedWorkBadgeProps> = ({
  type = 'verified_order_work',
  className = '',
}) => {
  const { isRtl } = useLanguage();

  const labels = {
    verified_order_work: {
      en: 'Verified Order Work',
      ar: 'عمل موثق من طلب فعلي',
    },
    verified_shop_portfolio: {
      en: 'Verified Shop Portfolio',
      ar: 'معرض مشغل معتمد',
    },
    verified_tailor_portfolio: {
      en: 'Verified Tailor Portfolio',
      ar: 'معرض خيّاط معتمد',
    },
  }[type];

  const tooltipText = isRtl
    ? 'هذا العمل مرتبط بطلب فعلي موثق أو ملف حرفي معتمد على المنصة.'
    : 'This work is associated with a verified order or verified creator profile.';

  return (
    <span
      title={tooltipText}
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-medium bg-[#F2F7F4] text-[#1E5638] border border-[#CDE3D5] select-none cursor-help ${className}`}
    >
      <CheckCircle2 className="w-3 h-3 text-[#1E5638] shrink-0" />
      <span>{isRtl ? labels.ar : labels.en}</span>
    </span>
  );
};
