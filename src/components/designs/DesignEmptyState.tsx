import React from 'react';
import { Compass, RotateCcw } from 'lucide-react';
import { useLanguage } from '../../localization/LanguageContext';
import { EmptyState } from '../ui/EmptyState';

export interface DesignEmptyStateProps {
  onReset?: () => void;
  className?: string;
}

export const DesignEmptyState: React.FC<DesignEmptyStateProps> = ({ onReset, className = '' }) => {
  const { isRtl } = useLanguage();

  return (
    <div className={`bg-white rounded-xl border border-[#E6E2DB] p-8 sm:p-12 text-center my-6 ${className}`}>
      <EmptyState
        icon={<Compass className="w-8 h-8 text-[#C5A880]" />}
        title={isRtl ? 'لم يتم العثور على تصاميم متطابقة' : 'No Designs Found'}
        description={
          isRtl
            ? 'جرّب تعديل خيارات التصفية أو مسح البحث لاستكشاف تصاميم وثياب وأعمال حرفية أخرى.'
            : 'Try changing your filters or searching for another style or fabric.'
        }
        actionLabel={isRtl ? 'إعادة ضبط كافة الفلاتر' : 'Reset All Filters'}
        onAction={onReset}
      />
    </div>
  );
};

export const DesignSkeleton: React.FC<{ count?: number; className?: string }> = ({
  count = 6,
  className = '',
}) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white rounded-xl border border-[#E6E2DB] overflow-hidden flex flex-col justify-between animate-pulse"
        >
          {/* Media Box Skeleton */}
          <div className="aspect-[4/3] bg-[#EAE7E0] w-full" />

          {/* Body Skeleton */}
          <div className="p-4 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#EAE7E0]" />
              <div className="space-y-1 flex-1">
                <div className="h-3 bg-[#EAE7E0] rounded w-24" />
                <div className="h-2 bg-[#EAE7E0] rounded w-16" />
              </div>
            </div>

            <div className="h-4 bg-[#EAE7E0] rounded w-3/4" />
            <div className="h-3 bg-[#EAE7E0] rounded w-full" />

            <div className="h-10 bg-[#FAF9F6] border border-[#E6E2DB] rounded-lg" />

            <div className="pt-3 border-t border-[#F2EFE9] flex items-center justify-between">
              <div className="h-4 bg-[#EAE7E0] rounded w-20" />
              <div className="h-7 bg-[#EAE7E0] rounded w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
