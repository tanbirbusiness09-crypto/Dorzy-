import React from 'react';
import {
  Home,
  Truck,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Bookmark,
  Scale,
  Package,
  Clock,
  Layers,
  Image as ImageIcon,
} from 'lucide-react';
import { Shop } from '../../types';
import { useLanguage } from '../../localization/LanguageContext';
import { Rating } from '../ui/Rating';
import { PriceDisplay } from '../ui/PriceDisplay';
import { VerificationBadge } from '../trust/VerificationBadge';
import { LocationBadge } from '../location/LocationBadge';
import { Button } from '../ui/Button';
import { TailoringArt } from './TailoringArtPlaceholder';

export interface ShopCardProps {
  shop: Shop;
  onViewShop?: (shop: Shop) => void;
  onBookShop?: (shop: Shop) => void;
  onToggleSave?: (shop: Shop) => void;
  isSaved?: boolean;
  onToggleCompare?: (shop: Shop) => void;
  isCompareSelected?: boolean;
  showPortfolioPreview?: boolean;
  showGoogleRating?: boolean;
  className?: string;
}

export const ShopCard: React.FC<ShopCardProps> = ({
  shop,
  onViewShop,
  onBookShop,
  onToggleSave,
  isSaved = false,
  onToggleCompare,
  isCompareSelected = false,
  showPortfolioPreview = false,
  showGoogleRating = false,
  className = '',
}) => {
  const { t, isRtl } = useLanguage();
  const ChevronIcon = isRtl ? ChevronLeft : ChevronRight;

  const shopName = isRtl ? shop.nameAr : shop.name;
  const city = isRtl ? shop.location.cityAr : shop.location.city;
  const district = isRtl ? shop.location.districtAr : shop.location.district;
  const services = isRtl ? shop.featuredServicesAr : shop.featuredServices;
  const fabrics = isRtl ? (shop.fabricsAr || shop.fabrics) : shop.fabrics;
  const statusNote = isRtl ? (shop.operatingHours.statusNoteAr || (shop.operatingHours.isOpenNow ? 'مفتوح الآن' : 'مغلق')) : (shop.operatingHours.statusNote || (shop.operatingHours.isOpenNow ? 'Open Now' : 'Closed'));

  return (
    <div
      className={`group bg-[#FFFFFF] rounded-xl border transition-all duration-200 overflow-hidden flex flex-col text-start ${
        isCompareSelected
          ? 'border-[#C5A880] ring-2 ring-[#C5A880]/40 shadow-md'
          : 'border-[#E6E2DB] hover:border-[#C5A880]/60 hover:shadow-md'
      } ${className}`}
    >
      {/* Cover Artwork / Image */}
      <div className="relative">
        <TailoringArt
          theme="atelier"
          title={shopName}
          subtitle={city}
          aspectRatio="16:9"
        />

        {/* Floating status & verification */}
        <div className="absolute top-3 start-3 z-10 flex flex-wrap gap-1.5">
          {shop.trust.isVerifiedShop && (
            <VerificationBadge type="verified_shop" size="xs" />
          )}
          {shop.trust.isCommercialRegistered && (
            <VerificationBadge type="verified_business" size="xs" />
          )}
        </div>

        {/* Top-Right Quick Actions: Save / Bookmark & Compare Checkbox */}
        <div className="absolute top-3 end-3 z-10 flex items-center gap-1.5">
          {onToggleCompare && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleCompare(shop);
              }}
              title={isCompareSelected ? 'Remove from compare' : 'Add to compare'}
              aria-label={`Compare ${shopName}`}
              className={`px-2 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1 backdrop-blur-xs shadow-xs transition-colors cursor-pointer ${
                isCompareSelected
                  ? 'bg-[#C5A880] text-[#121316]'
                  : 'bg-[#121316]/70 text-[#FAF9F6] hover:bg-[#121316]'
              }`}
            >
              <Scale className="w-3 h-3" />
              <span>{isCompareSelected ? (isRtl ? 'محدد' : 'Added') : (isRtl ? 'قارن' : 'Compare')}</span>
            </button>
          )}

          {onToggleSave && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave(shop);
              }}
              title={isSaved ? 'Saved to favorites' : 'Save atelier'}
              aria-label={`Save ${shopName}`}
              className={`p-1.5 rounded-md backdrop-blur-xs shadow-xs transition-colors cursor-pointer ${
                isSaved
                  ? 'bg-[#C5A880] text-[#121316]'
                  : 'bg-[#121316]/70 text-[#FAF9F6] hover:bg-[#121316]'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          )}
        </div>

        {/* Operating status badge */}
        <div className="absolute bottom-3 end-3 z-10">
          <span
            className={`text-[11px] font-medium px-2 py-0.5 rounded-md backdrop-blur-xs shadow-xs flex items-center gap-1 ${
              shop.operatingHours.isOpenNow
                ? 'bg-[#1E5638]/90 text-white'
                : 'bg-[#24262E]/90 text-[#D4D0C7]'
            }`}
          >
            <Clock className="w-3 h-3" />
            <span>{statusNote}</span>
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Location and Distance */}
          <div className="mb-2">
            <LocationBadge
              city={city}
              district={district}
              distanceKm={shop.location.distanceKm}
            />
          </div>

          {/* Shop Title */}
          <h3 className="text-base sm:text-lg font-bold text-[#121316] tracking-tight group-hover:text-[#916F3E] transition-colors line-clamp-1">
            {shopName}
          </h3>

          {/* Tagline / Subtitle */}
          <p className="mt-1 text-xs text-[#65625D] line-clamp-2 leading-relaxed">
            {isRtl ? shop.taglineAr : shop.tagline}
          </p>

          {/* Rating and Experience */}
          <div className="mt-3 flex flex-wrap items-center justify-between text-xs pt-3 border-t border-[#F2EFE9] gap-2">
            <div className="flex items-center gap-2">
              <Rating
                score={shop.metrics.rating}
                reviewCount={shop.metrics.reviewCount}
                size="sm"
                entityType="shop"
              />
              {showGoogleRating && (
                <Rating score={4.8} reviewCount={85} size="sm" source="google" />
              )}
            </div>
            <span className="text-[#8E8B85] tabular-nums">
              {shop.metrics.completedOrdersCount.toLocaleString()} {t.common.completedOrders}
            </span>
          </div>

          {/* Featured Services (Zero-Pill: Clean typographic text with separators) */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-[#65625D]">
            {services.slice(0, 3).map((service, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="text-[#D4D0C7]">·</span>}
                <span className="truncate">{service}</span>
              </React.Fragment>
            ))}
          </div>

          {/* Fabrics Availability Preview (if present) */}
          {fabrics && fabrics.length > 0 && (
            <div className="mt-2 text-[11px] text-[#8E8B85] flex items-center gap-1 truncate">
              <Layers className="w-3 h-3 text-[#C5A880] shrink-0" />
              <span className="truncate">{fabrics.slice(0, 2).join(' · ')}</span>
            </div>
          )}

          {/* Capabilities Row */}
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-[#65625D]">
            {shop.hasHomeMeasurement && (
              <span className="inline-flex items-center gap-1 text-[#1E5638] font-medium">
                <Home className="w-3.5 h-3.5 shrink-0" />
                <span>{t.common.homeService}</span>
              </span>
            )}
            {shop.hasExpressDelivery && (
              <span className="inline-flex items-center gap-1 text-[#916F3E] font-medium">
                <Truck className="w-3.5 h-3.5 shrink-0" />
                <span>{t.common.expressDelivery}</span>
              </span>
            )}
            {shop.hasPickup && (
              <span className="inline-flex items-center gap-1 text-[#24262E]">
                <Package className="w-3.5 h-3.5 shrink-0" />
                <span>{isRtl ? 'استلام بالفرع' : 'Pickup'}</span>
              </span>
            )}
          </div>

          {/* Portfolio Miniature Preview (3 Swatches/Images) */}
          {showPortfolioPreview && (
            <div className="mt-3 pt-3 border-t border-[#F2EFE9] flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                {[1, 2, 3].map((idx) => (
                  <div
                    key={idx}
                    className="w-10 h-10 rounded-md bg-[#F5F3EF] border border-[#E6E2DB] flex items-center justify-center text-[#8E8B85] overflow-hidden"
                  >
                    <TailoringArt theme="thobe" aspectRatio="1:1" className="scale-75" />
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => onViewShop && onViewShop(shop)}
                className="text-[11px] font-semibold text-[#916F3E] hover:underline"
              >
                {isRtl ? 'معاينة الأعمال' : 'View Work'}
              </button>
            </div>
          )}
        </div>

        {/* Footer with Price & Dual Actions */}
        <div className="mt-5 pt-3.5 border-t border-[#F2EFE9] flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="block text-[11px] text-[#8E8B85] leading-none mb-1">
              {t.common.startingFrom}
            </span>
            <PriceDisplay
              amount={shop.startingPriceSar}
              suffix={t.common.perThobe}
              size="md"
            />
          </div>

          <div className="flex items-center gap-2">
            {onBookShop && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBookShop(shop)}
                icon={<Calendar className="w-3.5 h-3.5" />}
              >
                {isRtl ? 'حجز' : 'Book'}
              </Button>
            )}
            <Button
              variant="primary"
              size="sm"
              onClick={() => onViewShop && onViewShop(shop)}
              icon={<ChevronIcon className="w-3.5 h-3.5" />}
              iconPosition="right"
            >
              {t.common.viewShop}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
