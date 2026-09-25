import React from 'react';
import { useLanguage } from '../../localization/LanguageContext';

export type PriceMode = 'fixed' | 'starting_from' | 'range' | 'custom_quote' | 'free';

export interface PriceDisplayProps {
  amount?: number;
  maxAmount?: number;
  mode?: PriceMode;
  suffix?: string;
  prefix?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCurrency?: boolean;
  className?: string;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  amount = 0,
  maxAmount,
  mode = 'fixed',
  suffix,
  prefix,
  size = 'md',
  showCurrency = true,
  className = '',
}) => {
  const { t, isRtl } = useLanguage();

  const sizeStyles = {
    sm: 'text-sm font-semibold',
    md: 'text-base font-semibold',
    lg: 'text-lg font-bold',
    xl: 'text-2xl font-bold tracking-tight',
  };

  const currencyText = t.common.sar;

  if (mode === 'free') {
    return (
      <span className={`inline-flex items-center text-[#1E5638] font-bold ${sizeStyles[size]} ${className}`}>
        {isRtl ? 'مجاني' : 'Free'}
      </span>
    );
  }

  if (mode === 'custom_quote') {
    return (
      <span className={`inline-flex items-center text-[#916F3E] font-medium ${sizeStyles[size]} ${className}`}>
        {isRtl ? 'تسعير مخصص' : 'Custom Quote'}
      </span>
    );
  }

  const effectivePrefix = prefix || (mode === 'starting_from' ? t.common.startingFrom : undefined);

  return (
    <div className={`inline-flex items-baseline gap-1 text-[#121316] select-none ${className}`}>
      {effectivePrefix && (
        <span className="text-xs text-[#8E8B85] font-normal">{effectivePrefix}</span>
      )}

      {mode === 'range' && typeof maxAmount === 'number' ? (
        <span className={`tabular-nums font-semibold tracking-tight ${sizeStyles[size]}`}>
          {amount.toLocaleString('en-US')}–{maxAmount.toLocaleString('en-US')}
        </span>
      ) : (
        <span className={`tabular-nums font-semibold tracking-tight ${sizeStyles[size]}`}>
          {amount.toLocaleString('en-US')}
        </span>
      )}

      {showCurrency && (
        <span className="text-xs font-medium text-[#65625D]">
          {currencyText}
        </span>
      )}

      {suffix && (
        <span className="text-xs text-[#8E8B85] font-normal">
          {suffix}
        </span>
      )}
    </div>
  );
};
