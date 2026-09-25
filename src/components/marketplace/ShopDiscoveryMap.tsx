import React, { useState } from 'react';
import { MapPin, Navigation, Plus, Minus, X, Star, ExternalLink, Calendar } from 'lucide-react';
import { Shop } from '../../types';
import { useLanguage } from '../../localization/LanguageContext';
import { Rating } from '../ui/Rating';
import { PriceDisplay } from '../ui/PriceDisplay';
import { Button } from '../ui/Button';

export interface ShopDiscoveryMapProps {
  shops: Shop[];
  selectedShop: Shop | null;
  onSelectShop: (shop: Shop) => void;
  onBookShop?: (shop: Shop) => void;
  onViewShopDetails?: (shop: Shop) => void;
  className?: string;
}

export const ShopDiscoveryMap: React.FC<ShopDiscoveryMapProps> = ({
  shops,
  selectedShop,
  onSelectShop,
  onBookShop,
  onViewShopDetails,
  className = '',
}) => {
  const { t, isRtl } = useLanguage();
  const [zoomLevel, setZoomLevel] = useState(13);
  const [activePopupShop, setActivePopupShop] = useState<Shop | null>(selectedShop || shops[0] || null);

  // When selectedShop changes from outside (e.g. card click), update popup
  React.useEffect(() => {
    if (selectedShop) {
      setActivePopupShop(selectedShop);
    }
  }, [selectedShop]);

  // Center coordinate reference (default Riyadh)
  const centerCity = shops[0]?.location?.city || 'Riyadh';

  return (
    <div
      role="region"
      aria-label="Interactive Tailoring Ateliers Map"
      className={`relative w-full h-full min-h-[480px] lg:min-h-[640px] rounded-2xl border border-[#E6E2DB] bg-[#17181F] overflow-hidden flex flex-col justify-between select-none shadow-sm ${className}`}
    >
      {/* Background Cartographic Architectural Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="discovery-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FAF9F6" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#discovery-grid)" />
          {/* Subtle topography road arcs */}
          <path d="M -50 150 Q 200 80 500 240 T 1000 180" fill="none" stroke="#C5A880" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.4" />
          <path d="M 120 -50 Q 180 300 240 650" fill="none" stroke="#C5A880" strokeWidth="1.5" opacity="0.3" />
        </svg>
      </div>

      {/* Top Map Bar */}
      <div className="relative z-10 p-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 bg-[#121316]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#24262E] text-xs font-semibold text-white shadow-md">
          <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>{centerCity} · {shops.length} {isRtl ? 'مشاغل معروضة' : 'Ateliers'}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-block text-[11px] text-[#A8A49D] bg-[#121316]/80 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-[#24262E]">
            {isRtl ? 'تكامل جاهز لخرائط Google Maps' : 'Google Maps Ready (Demo Preview)'}
          </span>

          {/* Zoom Simulator */}
          <div className="flex flex-col bg-[#121316]/90 backdrop-blur-md rounded-lg border border-[#24262E] overflow-hidden text-white">
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.min(z + 1, 18))}
              aria-label="Zoom in"
              className="p-2 hover:bg-[#24262E] transition-colors cursor-pointer border-b border-[#24262E]"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.max(z - 1, 10))}
              aria-label="Zoom out"
              className="p-2 hover:bg-[#24262E] transition-colors cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Scattered Interactive Shop Pins */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-full h-full">
          {shops.slice(0, 10).map((shop, idx) => {
            // Generate deterministic relative coordinates around center
            const angles = [0, 45, 90, 135, 180, 225, 270, 315, 60, 200];
            const radii = [60, 120, 160, 90, 140, 110, 180, 130, 75, 150];
            const angle = (angles[idx % angles.length] * Math.PI) / 180;
            const radius = radii[idx % radii.length];
            const offsetX = Math.cos(angle) * radius;
            const offsetY = Math.sin(angle) * radius;

            const isSelected = activePopupShop?.id === shop.id;

            return (
              <div
                key={shop.id}
                style={{
                  top: `calc(50% + ${offsetY}px)`,
                  left: `calc(50% + ${offsetX}px)`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto z-20"
              >
                <button
                  type="button"
                  onClick={() => {
                    setActivePopupShop(shop);
                    onSelectShop(shop);
                  }}
                  aria-label={`${shop.name} location pin`}
                  className={`group relative flex flex-col items-center cursor-pointer transition-all duration-200 focus:outline-none ${
                    isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                  }`}
                >
                  <div
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold shadow-lg mb-1 whitespace-nowrap transition-colors ${
                      isSelected
                        ? 'bg-[#C5A880] text-[#121316] ring-2 ring-white'
                        : 'bg-[#121316] text-white border border-[#24262E] group-hover:border-[#C5A880]'
                    }`}
                  >
                    {shop.startingPriceSar} {t.common.sar}
                  </div>

                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shadow-xl transition-all ${
                      isSelected
                        ? 'bg-[#C5A880] text-[#121316] ring-4 ring-[#C5A880]/30'
                        : 'bg-[#121316] text-[#C5A880] border border-[#C5A880]/40'
                    }`}
                  >
                    <MapPin className="w-4 h-4 fill-current" />
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Shop Preview Popup (Bottom overlay) */}
      {activePopupShop && (
        <div className="relative z-30 p-4 max-w-sm w-full mx-auto sm:ms-4 sm:mb-4">
          <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#E6E2DB] shadow-2xl space-y-3 text-start animate-in fade-in slide-in-from-bottom-3 duration-200">
            <div className="flex items-start justify-between gap-2">
              <div className="truncate">
                <span className="text-[10px] font-semibold text-[#916F3E] uppercase tracking-wider block">
                  {isRtl ? activePopupShop.location.districtAr : activePopupShop.location.district} · {activePopupShop.location.distanceKm} {t.common.kmAway}
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-[#121316] tracking-tight truncate">
                  {isRtl ? activePopupShop.nameAr : activePopupShop.name}
                </h4>
              </div>

              <button
                type="button"
                onClick={() => setActivePopupShop(null)}
                aria-label="Close pin preview"
                className="text-[#8E8B85] hover:text-[#121316] p-1 rounded transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-[#F2EFE9]">
              <Rating score={activePopupShop.metrics.rating} reviewCount={activePopupShop.metrics.reviewCount} size="sm" />
              <PriceDisplay amount={activePopupShop.startingPriceSar} suffix={t.common.perThobe} size="sm" />
            </div>

            <div className="flex gap-2 pt-1">
              {onBookShop && (
                <Button
                  variant="gold"
                  size="sm"
                  fullWidth
                  onClick={() => onBookShop(activePopupShop)}
                  icon={<Calendar className="w-3 h-3" />}
                >
                  {isRtl ? 'حجز قياس' : 'Book'}
                </Button>
              )}
              <Button
                variant="primary"
                size="sm"
                fullWidth
                onClick={() => {
                  onSelectShop(activePopupShop);
                  if (onViewShopDetails) onViewShopDetails(activePopupShop);
                }}
                icon={<ExternalLink className="w-3 h-3" />}
                iconPosition="right"
              >
                {isRtl ? 'تفاصيل المتجر' : 'View Shop'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
