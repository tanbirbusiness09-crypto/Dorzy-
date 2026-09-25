import React, { useState } from 'react';
import { MapPin, Navigation, List, Map as MapIcon, SlidersHorizontal, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../localization/LanguageContext';
import { mockShops } from '../../data/mock/shops';
import { Shop } from '../../types';
import { ShopCard } from './ShopCard';
import { Button } from '../ui/Button';
import { Rating } from '../ui/Rating';
import { PriceDisplay } from '../ui/PriceDisplay';

export interface NearbyShopsMapListProps {
  onBookShop?: (shop: Shop) => void;
  onViewAllShops?: () => void;
  onViewShop?: (shop: Shop) => void;
  className?: string;
}

export const NearbyShopsMapList: React.FC<NearbyShopsMapListProps> = ({
  onBookShop,
  onViewAllShops,
  onViewShop,
  className = '',
}) => {
  const { t, isRtl } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedShop, setSelectedShop] = useState<Shop>(mockShops[0]);
  const [mobileView, setMobileView] = useState<'list' | 'map'>('list');
  const [filterHomeOnly, setFilterHomeOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'rating' | 'distance' | 'price'>('rating');

  const cities = [
    { value: 'all', label: isRtl ? 'كافة المدن' : 'All Cities' },
    { value: 'Riyadh', label: isRtl ? 'الرياض' : 'Riyadh' },
    { value: 'Jeddah', label: isRtl ? 'جدة' : 'Jeddah' },
    { value: 'Khobar', label: isRtl ? 'الخبر' : 'Khobar' },
    { value: 'Dammam', label: isRtl ? 'الدمام' : 'Dammam' },
    { value: 'Makkah', label: isRtl ? 'مكة المكرمة' : 'Makkah' },
    { value: 'Madinah', label: isRtl ? 'المدينة المنورة' : 'Madinah' },
  ];

  // Filter & Sort
  const displayedShops = mockShops
    .filter((s) => {
      if (selectedCity !== 'all' && s.location.city.toLowerCase() !== selectedCity.toLowerCase()) {
        return false;
      }
      if (filterHomeOnly && !s.hasHomeMeasurement) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'distance') return (a.location.distanceKm || 0) - (b.location.distanceKm || 0);
      if (sortBy === 'price') return a.startingPriceSar - b.startingPriceSar;
      return b.metrics.rating - a.metrics.rating;
    });

  return (
    <section id="nearby-shops" className={`space-y-6 text-start ${className}`}>
      {/* Header & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E6E2DB] pb-4">
        <div>
          <div className="text-xs font-semibold text-[#916F3E] uppercase tracking-wider mb-1">
            {isRtl ? 'تصفح المشاغل القريبة' : 'Geographic Discovery'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#121316] tracking-tight">
            {isRtl ? 'مشاغل الخياطة الأقرب إليك' : 'Tailoring Shops Near You'}
          </h2>
          <p className="text-xs sm:text-sm text-[#65625D] mt-1">
            {isRtl
              ? 'استكشف دور الخياطة حسب الموقع الجغرافي، المسافة، وتوفر خدمة أخذ القياس المنزلي.'
              : 'Browse certified salons by city, proximity, customer ratings, and home measurement availability.'}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {onViewAllShops && (
            <Button
              variant="outline"
              size="sm"
              onClick={onViewAllShops}
              icon={<ArrowIcon className="w-3.5 h-3.5 text-[#916F3E]" />}
              iconPosition="right"
            >
              {isRtl ? 'استكشاف كافة المشاغل' : 'Explore All Ateliers'}
            </Button>
          )}

          {/* Mobile Map / List Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileView(mobileView === 'list' ? 'map' : 'list')}
              className="flex items-center gap-2 px-3 py-2 bg-[#121316] text-[#FAF9F6] text-xs font-semibold rounded-lg shadow-sm cursor-pointer"
            >
              {mobileView === 'list' ? (
                <>
                  <MapIcon className="w-4 h-4 text-[#C5A880]" />
                  <span>{isRtl ? 'عرض الخريطة' : 'View Map'}</span>
                </>
              ) : (
                <>
                  <List className="w-4 h-4 text-[#C5A880]" />
                  <span>{isRtl ? 'عرض القائمة' : 'View List'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[#FFFFFF] rounded-xl border border-[#E6E2DB]">
        <div className="flex flex-wrap items-center gap-2">
          {/* City Selector */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#F5F3EF] border border-[#E6E2DB] text-xs font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#916F3E]" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer font-semibold text-[#121316]"
            >
              {cities.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Home Measurement Toggle */}
          <button
            onClick={() => setFilterHomeOnly(!filterHomeOnly)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
              filterHomeOnly
                ? 'bg-[#1E5638] text-white border-[#1E5638]'
                : 'bg-[#FAF9F6] text-[#65625D] border-[#E6E2DB] hover:bg-[#F5F3EF]'
            }`}
          >
            {isRtl ? 'قياس منزلي فقط' : 'Home Fitting Only'}
          </button>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2 text-xs text-[#8E8B85]">
          <span>{isRtl ? 'الترتيب:' : 'Sort:'}</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#F5F3EF] border border-[#E6E2DB] text-[#121316] font-medium rounded-lg px-2.5 py-1.5 focus:outline-none cursor-pointer"
          >
            <option value="rating">{isRtl ? 'الأعلى تقييماً' : 'Highest Rated'}</option>
            <option value="distance">{isRtl ? 'الأقرب مسافة' : 'Nearest First'}</option>
            <option value="price">{isRtl ? 'الأقل سعراً' : 'Lowest Price'}</option>
          </select>
        </div>
      </div>

      {/* Dual Layout: List + Interactive Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Filterable Shop Cards List */}
        <div
          className={`lg:col-span-7 space-y-4 ${
            mobileView === 'map' ? 'hidden lg:block' : 'block'
          }`}
        >
          <div className="text-xs text-[#8E8B85] px-1">
            {isRtl ? `عرض ${displayedShops.length} مشاغل معتمدة` : `Showing ${displayedShops.length} certified salons`}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayedShops.map((shop) => {
              const isSelected = selectedShop.id === shop.id;
              return (
                <div
                  key={shop.id}
                  onClick={() => setSelectedShop(shop)}
                  className={`cursor-pointer transition-all ${
                    isSelected ? 'ring-2 ring-[#C5A880] rounded-xl' : ''
                  }`}
                >
                  <ShopCard
                    shop={shop}
                    showGoogleRating
                    onBookShop={onBookShop}
                    onViewShop={(s) => {
                      setSelectedShop(s);
                      if (onViewShop) onViewShop(s);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Map Placeholder Architecture */}
        <div
          className={`lg:col-span-5 lg:sticky lg:top-24 space-y-3 ${
            mobileView === 'list' ? 'hidden lg:block' : 'block'
          }`}
        >
          <div className="bg-[#FFFFFF] rounded-2xl border border-[#E6E2DB] overflow-hidden p-4 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1E5638] animate-pulse" />
                <span className="text-xs font-bold text-[#121316]">
                  {isRtl ? 'الخريطة الجغرافية التفاعلية' : 'Interactive Map Discovery'}
                </span>
              </div>
              <span className="text-[10px] text-[#8E8B85] bg-[#F5F3EF] px-2 py-0.5 rounded border border-[#E6E2DB]">
                Maps Integration Ready
              </span>
            </div>

            {/* Cartographic Visual with Shop Pins */}
            <div className="relative h-72 rounded-xl border border-[#E6E2DB] bg-[#1B1C22] overflow-hidden flex flex-col justify-between p-4">
              {/* Top city badge */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-[#121316]/90 text-white text-xs font-semibold backdrop-blur-xs border border-[#24262E]">
                  {isRtl ? selectedShop.location.cityAr : selectedShop.location.city}
                </span>

                <span className="px-2 py-0.5 rounded bg-[#FAF9F6]/10 text-[#C5A880] text-[11px] font-mono backdrop-blur-xs">
                  GPS: 24.7136, 46.6753
                </span>
              </div>

              {/* Pins Scatter Motif */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {/* SVG grid */}
                <svg width="100%" height="100%" className="opacity-15">
                  <pattern id="map-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#FAF9F6" strokeWidth="0.5" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#map-grid)" />
                </svg>

                {/* Primary Selected Pin Marker */}
                <div className="absolute flex flex-col items-center animate-bounce">
                  <div className="w-9 h-9 rounded-full bg-[#C5A880] text-[#121316] border-2 border-white shadow-xl flex items-center justify-center font-bold">
                    <MapPin className="w-5 h-5 fill-current" />
                  </div>
                  <div className="mt-1 px-2 py-0.5 rounded bg-[#121316] text-white text-[10px] font-bold shadow-md truncate max-w-[140px]">
                    {isRtl ? selectedShop.nameAr : selectedShop.name}
                  </div>
                </div>

                {/* Secondary Nearby Pins */}
                <div className="absolute -top-12 -start-16 w-6 h-6 rounded-full bg-[#24262E] text-[#C5A880] border border-[#3D404D] flex items-center justify-center shadow-md">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div className="absolute top-16 end-12 w-6 h-6 rounded-full bg-[#24262E] text-[#C5A880] border border-[#3D404D] flex items-center justify-center shadow-md">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Bottom distance overlay */}
              <div className="relative z-10 bg-[#121316]/90 p-3 rounded-lg backdrop-blur-xs border border-[#24262E] flex items-center justify-between text-xs text-white">
                <div>
                  <p className="font-bold text-[#FAF9F6] truncate max-w-[180px]">
                    {isRtl ? selectedShop.nameAr : selectedShop.name}
                  </p>
                  <p className="text-[11px] text-[#A8A49D] mt-0.5">
                    {selectedShop.location.distanceKm} {t.common.kmAway} · {isRtl ? selectedShop.location.districtAr : selectedShop.location.district}
                  </p>
                </div>
                <PriceDisplay amount={selectedShop.startingPriceSar} suffix={t.common.perThobe} size="sm" className="text-white" />
              </div>
            </div>

            {/* Selected Shop Action Card */}
            <div className="p-3 bg-[#FAF9F6] rounded-xl border border-[#E6E2DB] space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#121316]">
                  {isRtl ? 'المشغل المحدد حالياً:' : 'Active Selection:'}
                </span>
                <Rating score={selectedShop.metrics.rating} reviewCount={selectedShop.metrics.reviewCount} size="sm" />
              </div>
              <p className="text-[11px] text-[#65625D] line-clamp-2">
                {isRtl ? selectedShop.descriptionAr : selectedShop.description}
              </p>
              <div className="pt-2 flex gap-2">
                <Button
                  variant="gold"
                  size="sm"
                  fullWidth
                  onClick={() => onBookShop && onBookShop(selectedShop)}
                >
                  {isRtl ? 'حجز قياس منزلي' : 'Book Measurement'}
                </Button>
                {onViewShop && (
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    onClick={() => onViewShop(selectedShop)}
                  >
                    {isRtl ? 'عرض المشغل' : 'View Atelier'}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
