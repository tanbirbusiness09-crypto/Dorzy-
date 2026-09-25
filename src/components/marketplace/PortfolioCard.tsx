import React, { useState } from 'react';
import { Bookmark, Share2, Star } from 'lucide-react';
import { PortfolioItem } from '../../types';
import { useLanguage } from '../../localization/LanguageContext';
import { TailoringArt } from './TailoringArtPlaceholder';

export interface PortfolioCardProps {
  item: PortfolioItem;
  className?: string;
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({ item, className = '' }) => {
  const { isRtl } = useLanguage();
  const [isSaved, setIsSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(item.likesCount);

  const title = isRtl ? item.titleAr : item.title;
  const tailorName = isRtl ? item.tailorNameAr : item.tailorName;
  const shopName = isRtl ? item.shopNameAr : item.shopName;
  const collarStyle = isRtl ? item.collarStyleAr : item.collarStyle;
  const cuffStyle = isRtl ? item.cuffStyleAr : item.cuffStyle;
  const fabricDetails = isRtl ? item.fabricDetailsAr : item.fabricDetails;

  const [isCopied, setIsCopied] = useState(false);

  const handleToggleSave = () => {
    setIsSaved((prev) => !prev);
    setLikesCount((prev) => (isSaved ? prev - 1 : prev + 1));
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div
      className={`group bg-[#FFFFFF] rounded-xl border border-[#E6E2DB] overflow-hidden flex flex-col justify-between transition-all duration-200 hover:border-[#C5A880]/60 hover:shadow-md text-start ${className}`}
    >
      {/* Artwork with Collar / Garment Details */}
      <div className="relative">
        <TailoringArt
          theme={item.specialty === 'Ceremonial Bisht' ? 'bisht' : item.specialty === 'Dagla' ? 'dagla' : 'thobe'}
          title={title}
          subtitle={item.specialty}
          aspectRatio="4:3"
        />

        {/* Action icons (Save & Share) */}
        <div className="absolute top-3 end-3 flex items-center gap-1.5 z-10">
          <button
            onClick={handleToggleSave}
            title={isSaved ? 'Saved' : 'Save'}
            aria-label="Save to favorites"
            className={`p-2 rounded-lg backdrop-blur-xs transition-colors cursor-pointer shadow-xs ${
              isSaved
                ? 'bg-[#C5A880] text-[#121316]'
                : 'bg-[#121316]/70 text-[#FAF9F6] hover:bg-[#121316]'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={handleShare}
            title={isCopied ? (isRtl ? 'تم النسخ' : 'Copied!') : (isRtl ? 'مشاركة' : 'Share')}
            aria-label="Share design"
            className={`p-2 rounded-lg backdrop-blur-xs transition-colors cursor-pointer shadow-xs ${
              isCopied
                ? 'bg-[#1E5638] text-white'
                : 'bg-[#121316]/70 text-[#FAF9F6] hover:bg-[#121316]'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Rating chip */}
        <div className="absolute bottom-3 start-3 z-10 bg-[#121316]/85 backdrop-blur-xs text-[#FAF9F6] px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1">
          <Star className="w-3 h-3 text-[#C5A880] fill-[#C5A880]" />
          <span className="tabular-nums font-semibold">{item.rating.toFixed(2)}</span>
        </div>
      </div>

      {/* Body details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h4 className="text-sm sm:text-base font-bold text-[#121316] tracking-tight group-hover:text-[#916F3E] transition-colors line-clamp-1">
            {title}
          </h4>

          {/* Tailor & Atelier Attribution */}
          <p className="text-xs text-[#65625D] mt-1 line-clamp-1">
            <span className="font-medium text-[#121316]">{tailorName}</span>
            {shopName && (
              <>
                <span className="text-[#D4D0C7] mx-1.5">/</span>
                <span>{shopName}</span>
              </>
            )}
          </p>

          {/* Sartorial Anatomy Specs */}
          <div className="mt-3 py-2 px-2.5 bg-[#FAF9F6] rounded-lg border border-[#E6E2DB] text-[11px] space-y-1">
            <div className="text-[#65625D] truncate">
              <span className="font-semibold text-[#121316]">{isRtl ? 'القماش:' : 'Fabric:'} </span>
              {fabricDetails}
            </div>
            <div className="text-[#65625D] truncate">
              <span className="font-semibold text-[#121316]">{isRtl ? 'القلاب:' : 'Collar:'} </span>
              {collarStyle}
            </div>
            <div className="text-[#65625D] truncate">
              <span className="font-semibold text-[#121316]">{isRtl ? 'الكبك:' : 'Cuff:'} </span>
              {cuffStyle}
            </div>
          </div>
        </div>

        {/* Footer with Likes / Save Metric */}
        <div className="mt-3 pt-2.5 border-t border-[#F2EFE9] flex items-center justify-between text-xs text-[#8E8B85]">
          <span className="tabular-nums">{likesCount} saves</span>
          <span className="text-[#916F3E] font-medium text-[11px]">
            {item.specialty}
          </span>
        </div>
      </div>
    </div>
  );
};
