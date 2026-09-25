import React from 'react';
import { Star, StarHalf } from 'lucide-react';
import { useLanguage } from '../../localization/LanguageContext';

export interface RatingProps {
  score: number;
  reviewCount?: number;
  showStars?: boolean;
  size?: 'sm' | 'md' | 'lg';
  source?: 'platform' | 'google';
  entityType?: 'shop' | 'tailor';
  className?: string;
}

export const Rating: React.FC<RatingProps> = ({
  score,
  reviewCount,
  showStars = true,
  size = 'md',
  source = 'platform',
  entityType,
  className = '',
}) => {
  const { t, isRtl } = useLanguage();
  const formattedScore = score.toFixed(1);

  // Render 5 stars with full/half/empty
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(score);
    const hasHalf = score - fullStars >= 0.3 && score - fullStars <= 0.8;
    const starSize = size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <Star
            key={i}
            className={`${starSize} fill-[#C5A880] text-[#C5A880] shrink-0`}
          />
        );
      } else if (i === fullStars + 1 && hasHalf) {
        stars.push(
          <StarHalf
            key={i}
            className={`${starSize} fill-[#C5A880] text-[#C5A880] shrink-0 ${isRtl ? 'scale-x-[-1]' : ''}`}
          />
        );
      } else {
        stars.push(
          <Star
            key={i}
            className={`${starSize} text-[#D4D0C7] shrink-0`}
          />
        );
      }
    }
    return stars;
  };

  return (
    <div className={`inline-flex items-center gap-1.5 text-[#121316] select-none ${className}`}>
      {showStars && <div className="flex items-center gap-0.5">{renderStars()}</div>}

      <span
        className={`font-bold tabular-nums tracking-tight ${
          size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm'
        }`}
      >
        {formattedScore}
      </span>

      {typeof reviewCount === 'number' && (
        <span className={`text-[#8E8B85] tabular-nums ${size === 'sm' ? 'text-xs' : 'text-xs'}`}>
          ({reviewCount.toLocaleString()} {t.common.reviews})
        </span>
      )}

      {/* Visually distinguishable Google Rating vs Platform Rating */}
      {source === 'google' ? (
        <span className="ms-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#F5F3EF] text-[#4285F4] border border-[#E6E2DB]">
          Google
        </span>
      ) : source === 'platform' && entityType ? (
        <span className="ms-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#F9F6F0] text-[#916F3E] border border-[#E2D5C3]">
          {entityType === 'shop' ? (isRtl ? 'تقييم المشغل' : 'Atelier Rating') : (isRtl ? 'تقييم الخيّاط' : 'Tailor Rating')}
        </span>
      ) : null}
    </div>
  );
};

export interface RatingDistributionProps {
  score: number;
  totalReviews: number;
  distribution?: { 5: number; 4: number; 3: number; 2: number; 1: number };
  className?: string;
}

export const RatingDistribution: React.FC<RatingDistributionProps> = ({
  score,
  totalReviews,
  distribution = { 5: 84, 4: 12, 3: 3, 2: 1, 1: 0 },
  className = '',
}) => {
  const { isRtl } = useLanguage();

  return (
    <div className={`p-4 bg-[#FFFFFF] rounded-xl border border-[#E6E2DB] text-start ${className}`}>
      <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-[#F2EFE9]">
        <div>
          <span className="text-3xl font-bold text-[#121316] tabular-nums tracking-tight">
            {score.toFixed(1)}
          </span>
          <span className="text-xs text-[#8E8B85] ms-1.5">/ 5.0</span>
          <div className="flex items-center gap-1 mt-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-3.5 h-3.5 fill-[#C5A880] text-[#C5A880]" />
            ))}
          </div>
        </div>
        <div className="text-end">
          <span className="text-xs font-semibold text-[#121316] tabular-nums block">
            {totalReviews.toLocaleString()}
          </span>
          <span className="text-[11px] text-[#8E8B85]">
            {isRtl ? 'تقييم طلبات موثقة' : 'verified client reviews'}
          </span>
        </div>
      </div>

      <div className="space-y-1.5 text-xs">
        {[5, 4, 3, 2, 1].map((stars) => {
          const pct = distribution[stars as keyof typeof distribution] || 0;
          return (
            <div key={stars} className="flex items-center gap-2">
              <span className="w-4 tabular-nums text-[#65625D] text-[11px] shrink-0 font-medium">
                {stars}★
              </span>
              <div className="flex-1 h-2 bg-[#F5F3EF] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#C5A880] rounded-full transition-all duration-300"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="w-8 tabular-nums text-end text-[#8E8B85] text-[11px] shrink-0">
                {pct}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
