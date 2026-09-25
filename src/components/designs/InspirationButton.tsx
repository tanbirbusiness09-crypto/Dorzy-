import React from 'react';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '../../localization/LanguageContext';

export interface InspirationButtonProps {
  onClick: (e: React.MouseEvent) => void;
  variant?: 'primary' | 'card' | 'outline';
  className?: string;
  isAvailableForOrder?: boolean;
}

export const InspirationButton: React.FC<InspirationButtonProps> = ({
  onClick,
  variant = 'card',
  className = '',
  isAvailableForOrder = true,
}) => {
  const { isRtl } = useLanguage();

  if (variant === 'card') {
    return (
      <button
        type="button"
        onClick={onClick}
        title={isRtl ? 'استخدم كمرجع للطلب' : 'Use as Inspiration'}
        className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-[#FAF9F6] text-[#916F3E] border border-[#C5A880]/50 hover:bg-[#C5A880]/15 transition-colors cursor-pointer flex items-center gap-1 shrink-0 ${className}`}
      >
        <Sparkles className="w-3 h-3 text-[#C5A880]" />
        <span className="hidden sm:inline">{isRtl ? 'إلهام' : 'Inspiration'}</span>
      </button>
    );
  }

  if (variant === 'primary') {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#121316] text-[#FAF9F6] hover:bg-[#916F3E] text-xs sm:text-sm font-semibold shadow-md transition-colors cursor-pointer ${className}`}
      >
        <Sparkles className="w-4 h-4 text-[#C5A880]" />
        <span>
          {isAvailableForOrder
            ? isRtl
              ? 'طلب تفصيل هذا التصميم'
              : 'Request This Design for Order'
            : isRtl
            ? 'استخدم كمرجع وإلهام لطلبك'
            : 'Use This Design as Inspiration'}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-[#C5A880] bg-[#FAF9F6] text-[#916F3E] hover:bg-[#C5A880]/15 text-xs font-semibold transition-colors cursor-pointer ${className}`}
    >
      <Sparkles className="w-3.5 h-3.5" />
      <span>{isRtl ? 'استخدم كمرجع' : 'Use as Inspiration'}</span>
    </button>
  );
};
