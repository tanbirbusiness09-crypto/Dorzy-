import React from 'react';
import { Sparkles, X } from 'lucide-react';

export interface BannerProps {
  children: React.ReactNode;
  onDismiss?: () => void;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const Banner: React.FC<BannerProps> = ({
  children,
  onDismiss,
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div
      role="region"
      aria-label="Announcement banner"
      className={`w-full bg-[#121316] text-[#FAF9F6] border-b border-[#24262E] py-2.5 px-4 sm:px-6 text-start flex items-center justify-between gap-4 text-xs ${className}`}
    >
      <div className="flex items-center gap-2.5 flex-1 truncate">
        <Sparkles className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
        <div className="truncate">{children}</div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className="text-[11px] font-semibold text-[#C5A880] hover:text-[#B8935A] underline transition-colors cursor-pointer"
          >
            {actionLabel}
          </button>
        )}
        {onDismiss && (
          <button
            onClick={onDismiss}
            aria-label="Dismiss banner"
            className="p-1 text-[#8E8B85] hover:text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
