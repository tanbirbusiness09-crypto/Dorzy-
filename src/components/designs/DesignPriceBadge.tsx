import React from 'react';
import { useLanguage } from '../../localization/LanguageContext';
import { PriceType } from '../../types';

export interface DesignPriceBadgeProps {
  priceType: PriceType;
  startingPrice?: number;
  priceNote?: string;
  size?: 'sm' | 'lg';
  className?: string;
}

export const DesignPriceBadge: React.FC<DesignPriceBadgeProps> = ({
  priceType,
  startingPrice,
  priceNote,
  size = 'sm',
  className = '',
}) => {
  const { isRtl } = useLanguage();

  if (priceType === 'inspiration_only') {
    return (
      <div className={className}>
        <span
          className={`font-semibold text-[#8E8B85] ${
            size === 'lg' ? 'text-base sm:text-lg' : 'text-xs'
          }`}
        >
          {isRtl ? 'مرجع إلهام وتراث' : 'Inspiration Only'}
        </span>
        {priceNote && (
          <span className="block text-[10px] text-[#A8A49D] mt-0.5">{priceNote}</span>
        )}
      </div>
    );
  }

  if (priceType === 'custom_quote') {
    return (
      <div className={className}>
        <div className="text-[10px] text-[#8E8B85] uppercase tracking-wider">
          {isRtl ? 'حسب المواصفات' : 'Custom Tailoring'}
        </div>
        <span
          className={`font-bold font-display text-[#916F3E] ${
            size === 'lg' ? 'text-lg sm:text-xl' : 'text-xs sm:text-sm'
          }`}
        >
          {startingPrice
            ? isRtl
              ? `يبدأ من ${startingPrice} ر.س (تسعير خاص)`
              : `From ${startingPrice} SAR (Custom Quote)`
            : isRtl
            ? 'تسعير مخصص'
            : 'Custom Quote'}
        </span>
      </div>
    );
  }

  if (priceType === 'price_on_request') {
    return (
      <div className={className}>
        <span
          className={`font-semibold text-[#65625D] ${
            size === 'lg' ? 'text-base sm:text-lg' : 'text-xs'
          }`}
        >
          {isRtl ? 'السعر عند الطلب' : 'Price on Request'}
        </span>
      </div>
    );
  }

  // default: starting_at or estimated
  return (
    <div className={className}>
      <div className="text-[10px] text-[#8E8B85] uppercase tracking-wider">
        {priceType === 'estimated'
          ? isRtl
            ? 'سعر تقديري'
            : 'Estimated Price'
          : isRtl
          ? 'يبدأ من'
          : 'Starting from'}
      </div>
      <div
        className={`font-bold font-display text-[#121316] ${
          size === 'lg' ? 'text-2xl sm:text-3xl' : 'text-sm'
        }`}
      >
        <span className="tabular-nums">{startingPrice || 180}</span>{' '}
        <span
          className={`font-normal text-[#65625D] ${size === 'lg' ? 'text-sm' : 'text-xs'}`}
        >
          {isRtl ? 'ر.س' : 'SAR'}
        </span>
      </div>
      {size === 'lg' && (
        <span className="block text-[11px] text-[#8E8B85] mt-0.5">
          {isRtl
            ? 'الأسعار شاملة 15% ضريبة القيمة المضافة · السعر النهائي يتحدد بحسب نوع القماش والمقاس'
            : 'Prices include 15% VAT · Final price depends on selected fabric & fittings'}
        </span>
      )}
    </div>
  );
};
