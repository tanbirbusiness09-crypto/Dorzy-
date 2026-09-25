import React, { useState } from 'react';
import {
  Award,
  Briefcase,
  ChevronRight,
  ChevronLeft,
  MessageSquare,
  Bookmark,
  MapPin,
  ExternalLink,
  Languages,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { Tailor, TailorPortfolioThumbnail } from '../../types';
import { useLanguage } from '../../localization/LanguageContext';
import { Avatar } from '../ui/Avatar';
import { Rating } from '../ui/Rating';
import { PriceDisplay } from '../ui/PriceDisplay';
import { VerificationBadge } from '../trust/VerificationBadge';
import { Button } from '../ui/Button';
import { useToast } from '../feedback/Toast';

export interface TailorCardProps {
  tailor: Tailor;
  onViewProfile?: (tailor: Tailor) => void;
  onBookTailor?: (tailor: Tailor) => void;
  onContactTailor?: (tailor: Tailor) => void;
  onSelectShop?: (shopSlug: string) => void;
  onViewPortfolioItem?: (tailor: Tailor, item: TailorPortfolioThumbnail) => void;
  isSaved?: boolean;
  onToggleSave?: (tailor: Tailor) => void;
  showGoogleRating?: boolean;
  className?: string;
}

export const TailorCard: React.FC<TailorCardProps> = ({
  tailor,
  onViewProfile,
  onBookTailor,
  onContactTailor,
  onSelectShop,
  onViewPortfolioItem,
  isSaved: controlledSaved,
  onToggleSave,
  showGoogleRating = false,
  className = '',
}) => {
  const { t, isRtl } = useLanguage();
  const { showToast } = useToast();
  const [localSaved, setLocalSaved] = useState(false);
  const isSaved = controlledSaved !== undefined ? controlledSaved : localSaved;

  const ChevronIcon = isRtl ? ChevronLeft : ChevronRight;

  const name = isRtl ? tailor.nameAr : tailor.name;
  const title = isRtl ? tailor.titleAr : tailor.title;
  const primarySpec = isRtl ? tailor.primarySpecialtyAr : tailor.primarySpecialty;
  const specialties = isRtl ? tailor.specialtiesAr : tailor.specialties;
  const shopName = isRtl ? tailor.currentShopNameAr : tailor.currentShopName;
  const city = isRtl ? tailor.cityAr : tailor.city;
  const area = isRtl ? tailor.areaAr : tailor.area;
  const languagesList = isRtl ? tailor.languagesAr : tailor.languages;

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleSave) {
      onToggleSave(tailor);
    } else {
      setLocalSaved(!localSaved);
      showToast({
        title: !localSaved
          ? isRtl
            ? `تم حفظ الحرفي ${name} في المفضلة`
            : `Saved ${name} to favorite tailors`
          : isRtl
          ? `تمت إزالة ${name} من المفضلة`
          : `Removed ${name} from favorite tailors`,
        type: 'success',
      });
    }
  };

  // Availability styling
  const getAvailabilityBadge = () => {
    switch (tailor.availability) {
      case 'available':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#1E5638] bg-[#F2F7F4] px-2 py-0.5 rounded border border-[#CDE3D5]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1E5638] animate-pulse" />
            {isRtl ? tailor.availabilityLabelAr || 'متاح لاستقبال الطلبات' : tailor.availabilityLabel || 'Available'}
          </span>
        );
      case 'busy':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#8A5B18] bg-[#FDF8EE] px-2 py-0.5 rounded border border-[#F3DFC1]">
            <Clock className="w-3 h-3 text-[#8A5B18]" />
            {isRtl ? tailor.availabilityLabelAr || 'مشغول حالياً (حجز مسبق)' : tailor.availabilityLabel || 'Currently Busy'}
          </span>
        );
      case 'available_soon':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#2C4875] bg-[#F0F4FA] px-2 py-0.5 rounded border border-[#C8D7EC]">
            <Clock className="w-3 h-3 text-[#2C4875]" />
            {isRtl ? tailor.availabilityLabelAr || 'متاح قريباً' : tailor.availabilityLabel || 'Available Soon'}
          </span>
        );
    }
  };

  return (
    <article
      className={`group bg-[#FFFFFF] rounded-xl border border-[#E6E2DB] p-5 flex flex-col justify-between transition-all duration-200 hover:border-[#C5A880]/60 hover:shadow-md text-start relative ${className}`}
    >
      <div>
        {/* Top Bar: Avatar, Identity, Save Button */}
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div className="flex items-start gap-3.5 min-w-0">
            <div className="relative shrink-0">
              <Avatar
                name={name}
                src={tailor.avatarUrl}
                size="lg"
                isVerified={tailor.trust.isVerifiedTailor}
              />
            </div>

            <div className="min-w-0">
              {/* Name & Verification Badge */}
              <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                <button
                  onClick={() => onViewProfile && onViewProfile(tailor)}
                  className="text-base font-bold text-[#121316] tracking-tight group-hover:text-[#916F3E] transition-colors truncate cursor-pointer text-start"
                >
                  {name}
                </button>
                {tailor.trust.isVerifiedTailor && (
                  <VerificationBadge type="verified_tailor" size="xs" />
                )}
              </div>

              {/* Title / Role */}
              <p className="text-xs text-[#65625D] font-medium line-clamp-1">{title}</p>

              {/* Primary Specialty Tag & Location */}
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-[#8E8B85] mt-1">
                <span className="font-semibold text-[#916F3E] bg-[#FAF6F0] px-1.5 py-0.5 rounded border border-[#EDE4D5]">
                  {primarySpec}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#8E8B85]" />
                  <span>{area ? `${area}, ` : ''}{city}</span>
                  {tailor.distanceKm && (
                    <span className="text-[#A8A49D]">({tailor.distanceKm} {t.common.kmAway})</span>
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Bookmark / Save Button */}
          <button
            onClick={handleSaveToggle}
            aria-label={isSaved ? 'Remove from favorites' : 'Save tailor'}
            title={isSaved ? 'Saved' : 'Save Tailor'}
            className={`p-2 rounded-lg border transition-all cursor-pointer shrink-0 ${
              isSaved
                ? 'bg-[#FAF6F0] border-[#C5A880] text-[#916F3E]'
                : 'bg-[#FAF9F6] border-[#E6E2DB] text-[#8E8B85] hover:text-[#121316] hover:border-[#B8B4AC]'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-[#916F3E]' : ''}`} />
          </button>
        </div>

        {/* Current Shop Affiliation Banner (Important for platform ecosystem) */}
        <div className="mb-3 px-3 py-2 rounded-lg bg-[#FAF9F6] border border-[#E6E2DB] flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-[11px] text-[#8E8B85] font-medium shrink-0">
              {isRtl ? 'المشغل الحالي:' : 'Atelier:'}
            </span>
            {shopName ? (
              tailor.currentShopSlug ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectShop && onSelectShop(tailor.currentShopSlug!);
                  }}
                  className="font-medium text-[#121316] hover:text-[#916F3E] transition-colors truncate flex items-center gap-1 cursor-pointer"
                >
                  <span className="truncate">{shopName}</span>
                  <ExternalLink className="w-2.5 h-2.5 text-[#8E8B85] shrink-0" />
                </button>
              ) : (
                <span className="font-medium text-[#121316] truncate">{shopName}</span>
              )
            ) : (
              <span className="font-medium text-[#65625D]">
                {isRtl ? 'حرفي مستقل / متاح للتعاون' : 'Independent Bespoke Artisan'}
              </span>
            )}
          </div>

          <div className="shrink-0 ms-2">
            {getAvailabilityBadge()}
          </div>
        </div>

        {/* Tailor Bio Quote */}
        <p className="text-xs text-[#65625D] line-clamp-2 leading-relaxed italic mb-3">
          &ldquo;{isRtl ? tailor.bioAr : tailor.bio}&rdquo;
        </p>

        {/* Experience & Completed Works (Clear labeling, no skill inference from years alone) */}
        <div className="grid grid-cols-2 gap-2 text-xs py-2 px-3 rounded-lg bg-[#FAF9F6] border border-[#E6E2DB] mb-3">
          <div className="flex items-center gap-1.5 text-[#121316]">
            <Award className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
            <div>
              <span className="font-bold tabular-nums">{tailor.yearsOfExperience}</span>{' '}
              <span className="text-[#8E8B85]">{t.common.years} {t.common.experience}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[#121316]">
            <Briefcase className="w-3.5 h-3.5 text-[#8E8B85] shrink-0" />
            <div className="truncate">
              <span className="font-bold tabular-nums">
                {tailor.completedWorksCount.toLocaleString()}
              </span>{' '}
              <span className="text-[#8E8B85]">{t.common.completedOrders}</span>
            </div>
          </div>
        </div>

        {/* Portfolio Preview: 3 small thumbnails with click to view work */}
        {tailor.portfolioThumbnails && tailor.portfolioThumbnails.length > 0 && (
          <div className="mb-3.5">
            <div className="flex items-center justify-between text-[11px] text-[#8E8B85] mb-1.5">
              <span className="font-medium">{isRtl ? 'نماذج العمل والتشطيب' : 'Craftsmanship Portfolio'}</span>
              <button
                onClick={() => onViewProfile && onViewProfile(tailor)}
                className="text-[#916F3E] hover:underline font-medium cursor-pointer"
              >
                {isRtl ? 'عرض الأعمال' : 'View Work'}
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {tailor.portfolioThumbnails.slice(0, 3).map((thumb) => (
                <button
                  key={thumb.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onViewPortfolioItem) {
                      onViewPortfolioItem(tailor, thumb);
                    } else if (onViewProfile) {
                      onViewProfile(tailor);
                    }
                  }}
                  className="group/thumb p-2 rounded-lg bg-[#FAF9F6] border border-[#E6E2DB] hover:border-[#C5A880] transition-colors text-start flex flex-col justify-between h-16 cursor-pointer"
                >
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#916F3E] line-clamp-1">
                    {isRtl ? thumb.categoryLabelAr : thumb.categoryLabel}
                  </span>
                  <span className="text-[11px] font-medium text-[#121316] line-clamp-1 group-hover/thumb:text-[#916F3E] transition-colors">
                    {isRtl ? thumb.titleAr : thumb.title}
                  </span>
                  <span className="text-[9px] text-[#8E8B85] line-clamp-1">
                    {isRtl ? thumb.fabricNoteAr : thumb.fabricNote}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Languages & Rating Row */}
        <div className="flex flex-wrap items-center justify-between text-xs gap-2 pt-2 border-t border-[#F2EFE9]">
          <div className="flex items-center gap-2">
            <Rating
              score={tailor.metrics.rating}
              reviewCount={tailor.metrics.reviewCount}
              size="sm"
              entityType="tailor"
            />
            {showGoogleRating && (
              <Rating score={4.9} reviewCount={45} size="sm" source="google" />
            )}
          </div>

          {/* Languages (Clean unboxed metadata with bullet separators) */}
          <div className="flex items-center gap-1 text-[11px] text-[#65625D]">
            <Languages className="w-3 h-3 text-[#8E8B85]" />
            <span>{languagesList.join(' · ')}</span>
          </div>
        </div>
      </div>

      {/* Footer with Starting Price and Action CTAs */}
      <div className="mt-4 pt-3.5 border-t border-[#F2EFE9] flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="block text-[11px] text-[#8E8B85] leading-none mb-1">
            {t.common.startingFrom}
          </span>
          <PriceDisplay amount={tailor.startingPriceSar} suffix={t.common.perThobe} size="sm" />
        </div>

        <div className="flex items-center gap-2">
          {onContactTailor && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onContactTailor(tailor)}
              icon={<MessageSquare className="w-3.5 h-3.5" />}
            >
              {isRtl ? 'تواصل' : 'Contact'}
            </Button>
          )}

          <Button
            variant="secondary"
            size="sm"
            onClick={() => onViewProfile && onViewProfile(tailor)}
            icon={<ChevronIcon className="w-3.5 h-3.5" />}
            iconPosition="right"
          >
            {t.common.viewProfile}
          </Button>
        </div>
      </div>
    </article>
  );
};
