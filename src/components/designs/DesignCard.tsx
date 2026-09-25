import React from 'react';
import { MapPin, Eye, Star, ArrowUpRight, ShieldCheck, Store, Scissors } from 'lucide-react';
import { Design } from '../../types';
import { useLanguage } from '../../localization/LanguageContext';
import { Avatar } from '../ui/Avatar';
import { DesignMedia } from './DesignMedia';
import { SaveDesignButton } from './SaveDesignButton';
import { ShareDesignButton } from './ShareDesignButton';
import { InspirationButton } from './InspirationButton';
import { DesignPriceBadge } from './DesignPriceBadge';

export interface DesignCardProps {
  design: Design;
  onSelectDesign?: (design: Design) => void;
  onSelectCreator?: (creatorType: 'tailor' | 'shop', slug: string) => void;
  onUseAsInspiration?: (design: Design) => void;
  className?: string;
}

export const DesignCard: React.FC<DesignCardProps> = ({
  design,
  onSelectDesign,
  onSelectCreator,
  onUseAsInspiration,
  className = '',
}) => {
  const { isRtl } = useLanguage();

  const title = isRtl ? design.titleAr : design.title;
  const category = isRtl ? design.categoryAr : design.category;
  const style = isRtl ? design.styleAr : design.style;
  const city = isRtl ? design.cityAr : design.city;
  const district = isRtl ? design.districtAr : design.district;
  const shortDescription = isRtl
    ? design.shortDescriptionAr || design.descriptionAr
    : design.shortDescription || design.description;
  const creatorName = isRtl ? design.creatorNameAr : design.creatorName;
  const fabricName = isRtl
    ? design.craftDetails.fabricAr || design.craftDetails.fabric
    : design.craftDetails.fabric || design.craftDetails.fabricAr;
  const collarName = isRtl
    ? design.craftDetails.collarAr || design.craftDetails.collar
    : design.craftDetails.collar || design.craftDetails.collarAr;

  const handleCardClick = () => {
    onSelectDesign?.(design);
  };

  const handleCreatorClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSelectCreator) {
      onSelectCreator(design.creatorType === 'TAILOR' ? 'tailor' : 'shop', design.creatorSlug);
    }
  };

  const handleInspirationClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUseAsInspiration?.(design);
  };

  return (
    <div
      onClick={handleCardClick}
      className={`group bg-[#FFFFFF] rounded-xl border border-[#E6E2DB] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#C5A880]/70 hover:shadow-lg text-start cursor-pointer ${className}`}
    >
      {/* 1. MEDIA CONTAINER */}
      <div className="relative">
        <DesignMedia design={design} aspectRatio="4:3" />

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

        {/* Top Action Icons (Save & Share) */}
        <div className="absolute top-3 end-3 flex items-center gap-1.5 z-20">
          <SaveDesignButton
            designId={design.id}
            designTitle={title}
            saveCount={design.saveCount}
            variant="icon"
          />
          <ShareDesignButton slug={design.slug} title={title} variant="icon" />
        </div>

        {/* Bottom Bar on Media: City & Engagement Metrics */}
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
              <span className="tabular-nums">{design.viewCount.toLocaleString()}</span>
            </span>
            {design.rating && (
              <span className="flex items-center gap-1 text-[#C5A880]">
                <Star className="w-3 h-3 fill-current" />
                <span className="tabular-nums font-bold">{design.rating.toFixed(1)}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 2. BODY CONTENT */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Creator Attribution Header */}
          <div
            onClick={handleCreatorClick}
            className="flex items-center gap-2.5 mb-2.5 hover:opacity-90 transition-opacity group/creator"
          >
            <Avatar
              src={design.creatorAvatar}
              name={creatorName}
              size="sm"
              isVerified={design.isVerifiedCreator}
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-[#121316] group-hover/creator:text-[#916F3E] transition-colors truncate">
                  {creatorName}
                </span>
                {design.isVerifiedCreator && (
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                )}
              </div>
              <div className="flex items-center gap-1 text-[11px] text-[#65625D]">
                <span className="font-medium text-[#916F3E]">
                  {design.creatorType === 'TAILOR'
                    ? isRtl
                      ? 'معلّم خياطة'
                      : 'Master Tailor'
                    : isRtl
                    ? 'مشغل معتمد'
                    : 'Bespoke Atelier'}
                </span>
                {design.creatorType === 'TAILOR' && design.shopName && (
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

          {/* Craft Details Snippet */}
          {(fabricName || collarName) && (
            <div className="mt-3 p-2.5 bg-[#FAF9F6] rounded-lg border border-[#E6E2DB] text-[11px] space-y-1">
              {fabricName && (
                <div className="flex items-baseline justify-between gap-2 text-[#65625D]">
                  <span className="font-semibold text-[#121316] shrink-0">
                    {isRtl ? 'القماش:' : 'Fabric:'}
                  </span>
                  <span className="truncate text-end text-[#3D3B37]">{fabricName}</span>
                </div>
              )}
              {collarName && (
                <div className="flex items-baseline justify-between gap-2 text-[#65625D]">
                  <span className="font-semibold text-[#121316] shrink-0">
                    {isRtl ? 'القلاب:' : 'Collar:'}
                  </span>
                  <span className="truncate text-end text-[#3D3B37]">{collarName}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 3. CARD FOOTER & ACTIONS */}
        <div className="mt-4 pt-3 border-t border-[#F2EFE9] flex items-center justify-between gap-2">
          {/* Price Component */}
          <DesignPriceBadge
            priceType={design.priceType}
            startingPrice={design.startingPrice}
            priceNote={design.priceNote}
            size="sm"
          />

          <div className="flex items-center gap-1.5">
            {/* Inspiration Button */}
            <InspirationButton onClick={handleInspirationClick} variant="card" />

            {/* View Design CTA */}
            <button
              type="button"
              onClick={handleCardClick}
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
