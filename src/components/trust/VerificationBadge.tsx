import React from 'react';
import { ShieldCheck, CheckCircle2, Award, MapPin, FileCheck } from 'lucide-react';
import { useLanguage } from '../../localization/LanguageContext';

export type VerificationType =
  | 'verified_shop'
  | 'verified_tailor'
  | 'verified_business'
  | 'verified_location'
  | 'verified_order_review';

export interface VerificationBadgeProps {
  type: VerificationType;
  size?: 'xs' | 'sm' | 'md';
  customLabel?: string;
  showIcon?: boolean;
  className?: string;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  type,
  size = 'sm',
  customLabel,
  showIcon = true,
  className = '',
}) => {
  const { t } = useLanguage();

  const getDetails = () => {
    switch (type) {
      case 'verified_shop':
        return {
          label: t.trust.verifiedShop,
          icon: <ShieldCheck className="w-3.5 h-3.5 text-[#916F3E]" />,
          styles: 'bg-[#F9F6F0] text-[#916F3E] border-[#E2D5C3]',
        };
      case 'verified_tailor':
        return {
          label: t.trust.verifiedTailor,
          icon: <Award className="w-3.5 h-3.5 text-[#916F3E]" />,
          styles: 'bg-[#F9F6F0] text-[#916F3E] border-[#E2D5C3]',
        };
      case 'verified_business':
        return {
          label: t.trust.verifiedBusiness,
          icon: <FileCheck className="w-3.5 h-3.5 text-[#1E5638]" />,
          styles: 'bg-[#F2F7F4] text-[#1E5638] border-[#CDE3D5]',
        };
      case 'verified_location':
        return {
          label: t.trust.verifiedLocation,
          icon: <MapPin className="w-3.5 h-3.5 text-[#24262E]" />,
          styles: 'bg-[#F5F3EF] text-[#24262E] border-[#E6E2DB]',
        };
      case 'verified_order_review':
        return {
          label: t.trust.verifiedOrderReview,
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-[#1E5638]" />,
          styles: 'bg-[#F2F7F4] text-[#1E5638] border-[#CDE3D5]',
        };
      default:
        return {
          label: t.common.verified,
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-[#916F3E]" />,
          styles: 'bg-[#F9F6F0] text-[#916F3E] border-[#E2D5C3]',
        };
    }
  };

  const { label, icon, styles } = getDetails();
  const displayLabel = customLabel || label;

  const sizeStyles = {
    xs: 'text-[11px] py-0.5 px-1.5 gap-1 rounded',
    sm: 'text-xs py-0.5 px-2 gap-1.5 rounded-md',
    md: 'text-xs py-1 px-2.5 gap-2 rounded-md font-medium',
  };

  return (
    <span
      className={`inline-flex items-center font-medium border leading-none whitespace-nowrap select-none ${sizeStyles[size]} ${styles} ${className}`}
    >
      {showIcon && <span className="shrink-0">{icon}</span>}
      <span className="truncate">{displayLabel}</span>
    </span>
  );
};
