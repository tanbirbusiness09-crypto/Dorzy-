import React, { useState } from 'react';
import { ThumbsUp, CheckCircle2 } from 'lucide-react';
import { CustomerReview } from '../../types';
import { useLanguage } from '../../localization/LanguageContext';
import { Avatar } from '../ui/Avatar';
import { Rating } from '../ui/Rating';
import { VerificationBadge } from '../trust/VerificationBadge';

export interface ReviewCardProps {
  review: CustomerReview;
  className?: string;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review, className = '' }) => {
  const { isRtl } = useLanguage();
  const [helpfulCount, setHelpfulCount] = useState(review.helpfulCount || 0);
  const [hasLiked, setHasLiked] = useState(false);

  const comment = isRtl ? (review.commentAr || review.comment) : review.comment;
  const targetName = isRtl ? (review.targetNameAr || review.targetName) : review.targetName;
  const serviceOrdered = isRtl ? (review.serviceOrderedAr || review.serviceOrdered) : review.serviceOrdered;
  const dateStr = isRtl ? (review.dateAr || review.date) : review.date;

  const handleHelpfulToggle = () => {
    setHasLiked((prev) => !prev);
    setHelpfulCount((prev) => (hasLiked ? prev - 1 : prev + 1));
  };

  return (
    <div
      className={`p-5 bg-[#FFFFFF] rounded-xl border border-[#E6E2DB] flex flex-col justify-between text-start transition-all hover:border-[#D4D0C7] hover:shadow-xs ${className}`}
    >
      <div>
        {/* Top Header: Customer Avatar, Name, Date & Verified Order */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <Avatar name={review.customerName} src={review.customerAvatar} size="md" />
            <div>
              <h4 className="text-sm font-bold text-[#121316] tracking-tight">
                {review.customerName}
              </h4>
              <p className="text-[11px] text-[#8E8B85] mt-0.5">{dateStr}</p>
            </div>
          </div>

          {review.isVerifiedOrder && (
            <VerificationBadge type="verified_order_review" size="xs" />
          )}
        </div>

        {/* Rating and Service reference */}
        <div className="flex flex-wrap items-center gap-2 mb-2.5">
          <Rating score={review.rating} size="sm" />
          {serviceOrdered && (
            <>
              <span className="text-[#D4D0C7] text-xs">·</span>
              <span className="text-xs font-medium text-[#916F3E] bg-[#F9F6F0] px-2 py-0.5 rounded border border-[#E2D5C3]">
                {serviceOrdered}
              </span>
            </>
          )}
        </div>

        {/* Review Text */}
        <p className="text-xs sm:text-sm text-[#343742] leading-relaxed mb-4">
          &ldquo;{comment}&rdquo;
        </p>
      </div>

      {/* Footer: Target reference (Shop/Tailor) & Helpful button */}
      <div className="pt-3 border-t border-[#F2EFE9] flex items-center justify-between gap-2 text-xs">
        <div className="text-[#8E8B85] truncate">
          <span>{isRtl ? 'المشغل / الخيّاط: ' : 'Atelier / Tailor: '}</span>
          <span className="font-medium text-[#121316]">{targetName}</span>
        </div>

        <button
          type="button"
          onClick={handleHelpfulToggle}
          className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs transition-colors cursor-pointer ${
            hasLiked
              ? 'text-[#1E5638] bg-[#F2F7F4] font-semibold'
              : 'text-[#8E8B85] hover:text-[#121316] hover:bg-[#F5F3EF]'
          }`}
        >
          <ThumbsUp className="w-3 h-3" />
          <span className="tabular-nums">{helpfulCount}</span>
        </button>
      </div>
    </div>
  );
};
