import React, { useState } from 'react';
import {
  Bookmark,
  Share2,
  Play,
  Eye,
  Star,
  MapPin,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { PortfolioItem } from '../../types';
import { useLanguage } from '../../localization/LanguageContext';
import { useToast } from '../feedback/Toast';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { TailoringArt } from './TailoringArtPlaceholder';

export interface DesignCardProps {
  design: PortfolioItem;
  onSelectDesign?: (design: PortfolioItem) => void;
  onSelectCreator?: (creatorType: 'tailor' | 'shop', slug: string) => void;
  onUseAsInspiration?: (design: PortfolioItem) => void;
  onToggleSave?: (designId: string) => void;
  isSaved?: boolean;
  className?: string;
}

export const DesignCard: React.FC<DesignCardProps> = ({
  design,
  onSelectDesign,
  onSelectCreator,
  onUseAsInspiration,
  onToggleSave,
  isSaved: propIsSaved,
  className = '',
}) => {
  const { isRtl } = useLanguage();
  const { showToast } = useToast();

  const [localSaved, setLocalSaved] = useState(false);
  const [savesCount, setSavesCount] = useState(design.savesCount || design.likesCount || 0);
  const [imageError, setImageError] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const isSaved = propIsSaved !== undefined ? propIsSaved : localSaved;

  const title = isRtl ? design.titleAr : design.title;
  const category = isRtl ? design.categoryAr : design.category;
  const style = isRtl ? design.styleAr : design.style;
  const city = isRtl ? design.cityAr : design.city;
  const district = isRtl ? design.districtAr : design.district;
  const shortDescription = isRtl ? design.shortDescriptionAr : design.shortDescription;
  const creatorName = isRtl ? design.creatorNameAr : design.creatorName;
  const creatorTitle = isRtl ? design.creatorTitleAr : design.creatorTitle;
  const fabricDetails = isRtl ? design.fabricDetailsAr : design.fabricDetails;
  const collarStyle = isRtl ? design.collarStyleAr : design.collarStyle;

  const handleToggleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleSave) {
      onToggleSave(design.id);
    } else {
      setLocalSaved(!localSaved);
      setSavesCount((prev) => (!localSaved ? prev + 1 : Math.max(0, prev - 1)));
    }

    showToast({
      type: isSaved ? 'info' : 'success',
      title: !isSaved
        ? isRtl
          ? 'تم حفظ التصميم'
          : 'Design Saved'
        : isRtl
        ? 'تمت الإزالة من المحفوظات'
        : 'Removed from Saved',
      description: title,
    });
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/designs/${design.slug}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
        showToast({
          type: 'success',
          title: isRtl ? 'تم نسخ الرابط' : 'Link Copied',
          description: isRtl
            ? 'يمكنك الآن مشاركة التصميم عبر واتساب أو الرسائل'
            : 'Design link copied to clipboard',
        });
      });
    }
  };

  const handleCreatorClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSelectCreator) {
      onSelectCreator(design.creatorType, design.creatorSlug);
    }
  };

  const handleInspirationClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onUseAsInspiration) {
      onUseAsInspiration(design);
    }
  };

  return (
    <div
      onClick={() => onSelectDesign?.(design)}
      className={`group bg-[#FFFFFF] rounded-xl border border-[#E6E2DB] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#C5A880]/70 hover:shadow-lg text-start cursor-pointer ${className}`}
    >
      {/* 1. MEDIA CONTAINER */}
      <div className="relative aspect-[4/3] bg-[#121316] overflow-hidden select-none">
        {design.imageUrl && !imageError ? (
          <img
            src={design.imageUrl}
            alt={title}
            loading="lazy"
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <TailoringArt
            theme={
              design.category === 'Ceremonial Bisht'
                ? 'bisht'
                : design.category === 'Dagla' || design.category === 'Balto'
                ? 'dagla'
                : 'thobe'
            }
            title={title}
            subtitle={category}
            aspectRatio="4:3"
          />
        )}

        {/* Gradient Overlay for Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121316]/80 via-transparent to-black/20 pointer-events-none" />

        {/* Video Play Indicator */}
        {design.mediaType === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-11 h-11 rounded-full bg-[#121316]/80 backdrop-blur-md border border-[#C5A880]/60 flex items-center justify-center text-[#C5A880] shadow-md group-hover:scale-110 group-hover:bg-[#916F3E] group-hover:text-white transition-all">
              <Play className="w-4 h-4 fill-current ms-0.5" />
            </div>
            {design.videoDuration && (
              <span className="absolute bottom-3 end-3 bg-[#121316]/85 backdrop-blur-xs text-[#FAF9F6] text-[11px] font-semibold px-2 py-0.5 rounded-md">
                {design.videoDuration}
              </span>
            )}
          </div>
        )}

        {/* Category & Style Badges */}
        <div className="absolute top-3 start-3 flex flex-wrap items-center gap-1.5 z-10">
          <span className="bg-[#121316]/85 backdrop-blur-xs text-[#C5A880] border border-[#C5A880]/30 text-[11px] font-semibold px-2.5 py-0.5 rounded-md shadow-xs">
            {category}
          </span>
          {style && (
            <span className="bg-white/90 backdrop-blur-xs text-[#121316] text-[11px] font-medium px-2 py-0.5 rounded-md shadow-xs hidden sm:inline-block">
              {style}
            </span>
          )}
        </div>

        {/* Action Controls (Save & Share) */}
        <div className="absolute top-3 end-3 flex items-center gap-1.5 z-10">
          <button
            onClick={handleToggleSave}
            title={isSaved ? (isRtl ? 'محفوظ' : 'Saved') : isRtl ? 'حفظ' : 'Save'}
            aria-label="Save design"
            className={`p-2 rounded-lg backdrop-blur-md transition-all cursor-pointer shadow-sm ${
              isSaved
                ? 'bg-[#C5A880] text-[#121316] font-bold shadow-md'
                : 'bg-[#121316]/75 text-[#FAF9F6] hover:bg-[#121316]'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={handleShare}
            title={isCopied ? (isRtl ? 'تم النسخ!' : 'Copied!') : isRtl ? 'مشاركة' : 'Share'}
            aria-label="Share design"
            className={`p-2 rounded-lg backdrop-blur-md transition-all cursor-pointer shadow-sm ${
              isCopied
                ? 'bg-[#1E5638] text-white'
                : 'bg-[#121316]/75 text-[#FAF9F6] hover:bg-[#121316]'
            }`}
          >
            {isCopied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Bottom Bar on Media: City & Engagement preview */}
        <div className="absolute bottom-2.5 start-3 end-3 flex items-center justify-between text-xs text-[#FAF9F6] z-10 pointer-events-none">
          <div className="flex items-center gap-1 font-medium drop-shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>
              {city}
              {district ? ` · ${district}` : ''}
            </span>
          </div>

          <div className="flex items-center gap-2.5 drop-shadow-sm text-[11px] font-medium text-[#FAF9F6]/90">
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3 text-[#FAF9F6]/80" />
              <span className="tabular-nums">{design.viewsCount.toLocaleString()}</span>
            </span>
            <span className="flex items-center gap-1">
              <Bookmark className="w-3 h-3 text-[#C5A880]" />
              <span className="tabular-nums">{savesCount}</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. BODY CONTENT */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Creator Attribution Bar */}
          <div
            onClick={handleCreatorClick}
            className="flex items-center gap-2.5 mb-2.5 hover:opacity-90 transition-opacity group/creator"
          >
            <Avatar
              src={design.creatorAvatar}
              name={creatorName}
              size="sm"
              isVerified={design.isVerified}
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-[#121316] group-hover/creator:text-[#916F3E] transition-colors truncate">
                  {creatorName}
                </span>
                {design.isVerified && (
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                )}
              </div>
              <div className="flex items-center gap-1 text-[11px] text-[#65625D]">
                <span className="font-medium text-[#916F3E]">
                  {design.creatorType === 'tailor'
                    ? isRtl
                      ? 'معلّم خياطة'
                      : 'Master Tailor'
                    : isRtl
                    ? 'مشغل معتمد'
                    : 'Bespoke Atelier'}
                </span>
                {design.shopName && design.creatorType === 'tailor' && (
                  <>
                    <span className="text-[#D4D0C7]">·</span>
                    <span className="truncate text-[#8E8B85]">
                      {isRtl ? design.shopNameAr : design.shopName}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Design Title */}
          <h3 className="text-base font-bold text-[#121316] group-hover:text-[#916F3E] transition-colors line-clamp-1">
            {title}
          </h3>

          {/* Short Description */}
          {shortDescription && (
            <p className="text-xs text-[#65625D] mt-1 line-clamp-2 leading-relaxed">
              {shortDescription}
            </p>
          )}

          {/* Sartorial Details Pill-Box */}
          <div className="mt-3 p-2.5 bg-[#FAF9F6] rounded-lg border border-[#E6E2DB] text-[11px] space-y-1">
            <div className="flex items-baseline justify-between gap-2 text-[#65625D]">
              <span className="font-semibold text-[#121316] shrink-0">
                {isRtl ? 'القماش:' : 'Fabric:'}
              </span>
              <span className="truncate text-end text-[#3D3B37]">{fabricDetails}</span>
            </div>
            <div className="flex items-baseline justify-between gap-2 text-[#65625D]">
              <span className="font-semibold text-[#121316] shrink-0">
                {isRtl ? 'القلاب:' : 'Collar:'}
              </span>
              <span className="truncate text-end text-[#3D3B37]">{collarStyle}</span>
            </div>
          </div>
        </div>

        {/* 3. CARD FOOTER & CALL TO ACTIONS */}
        <div className="mt-4 pt-3 border-t border-[#F2EFE9] flex items-center justify-between gap-2">
          <div>
            <div className="text-[10px] text-[#8E8B85] uppercase tracking-wider">
              {isRtl ? 'يبدأ من' : 'Starting from'}
            </div>
            <div className="text-sm font-bold text-[#121316] font-display">
              <span className="tabular-nums">{design.priceSar}</span>{' '}
              <span className="text-xs font-normal text-[#65625D]">{isRtl ? 'ر.س' : 'SAR'}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Inspiration Button */}
            <button
              onClick={handleInspirationClick}
              title={isRtl ? 'استخدم كمرجع للطلب' : 'Use as Inspiration'}
              className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-[#FAF9F6] text-[#916F3E] border border-[#C5A880]/50 hover:bg-[#C5A880]/15 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              <span className="hidden sm:inline">
                {isRtl ? 'إلهام' : 'Inspiration'}
              </span>
            </button>

            {/* View Design CTA */}
            <button
              onClick={() => onSelectDesign?.(design)}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#121316] text-[#FAF9F6] hover:bg-[#916F3E] transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
            >
              <span>{isRtl ? 'عرض' : 'View'}</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
