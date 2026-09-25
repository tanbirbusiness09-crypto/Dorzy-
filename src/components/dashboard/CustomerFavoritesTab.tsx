import React, { useState } from 'react';
import {
  Bookmark,
  Store,
  Scissors,
  Star,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Plus,
} from 'lucide-react';
import { useLanguage } from '../../localization/LanguageContext';
import { mockPortfolio } from '../../data/mock/portfolio';
import { mockShops } from '../../data/mock/shops';
import { mockTailors } from '../../data/mock/tailors';
import { PriceDisplay } from '../ui/PriceDisplay';
import { Button } from '../ui/Button';

export interface CustomerFavoritesTabProps {
  savedDesignIds: string[];
  favoriteShopIds: string[];
  favoriteTailorIds: string[];
  onOrderDesign: (designId: string) => void;
  onNavigateShop: (shopId: string) => void;
  onNavigateTailor: (tailorId: string) => void;
  onToggleSavedDesign: (designId: string) => void;
}

export const CustomerFavoritesTab: React.FC<CustomerFavoritesTabProps> = ({
  savedDesignIds,
  favoriteShopIds,
  favoriteTailorIds,
  onOrderDesign,
  onNavigateShop,
  onNavigateTailor,
  onToggleSavedDesign,
}) => {
  const { isRtl } = useLanguage();
  const [subTab, setSubTab] = useState<'designs' | 'shops' | 'tailors'>('designs');

  const savedDesigns = mockPortfolio.filter((d) => savedDesignIds.includes(d.id));
  const favoriteShops = mockShops.filter((s) => favoriteShopIds.includes(s.id));
  const favoriteTailors = mockTailors.filter((t) => favoriteTailorIds.includes(t.id));

  return (
    <div className="space-y-6 text-start">
      {/* Header & Sub-tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#121316] font-display">
            {isRtl ? 'المفضلة والتصاميم المحفوظة' : 'Saved Styles, Ateliers & Tailors'}
          </h2>
          <p className="text-xs text-[#8E8B85] mt-0.5">
            {isRtl
              ? 'مجموعتك الشخصية من الموديلات الملهمة والمشاغل المفضلة لديك'
              : 'Your personal curation of bespoke sartorial designs and preferred craftsmen'}
          </p>
        </div>

        {/* Sub-tabs switcher */}
        <div className="flex items-center gap-1 p-1 bg-[#FAF9F6] border border-[#E6E2DB] rounded-xl self-start">
          <button
            onClick={() => setSubTab('designs')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              subTab === 'designs'
                ? 'bg-white text-[#121316] shadow-xs'
                : 'text-[#65625D] hover:text-[#121316]'
            }`}
          >
            {isRtl ? 'التصاميم المحفوظة' : 'Designs'} ({savedDesigns.length})
          </button>
          <button
            onClick={() => setSubTab('shops')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              subTab === 'shops'
                ? 'bg-white text-[#121316] shadow-xs'
                : 'text-[#65625D] hover:text-[#121316]'
            }`}
          >
            {isRtl ? 'المشاغل المفضلة' : 'Ateliers'} ({favoriteShops.length})
          </button>
          <button
            onClick={() => setSubTab('tailors')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              subTab === 'tailors'
                ? 'bg-white text-[#121316] shadow-xs'
                : 'text-[#65625D] hover:text-[#121316]'
            }`}
          >
            {isRtl ? 'الخياطين المفضلين' : 'Tailors'} ({favoriteTailors.length})
          </button>
        </div>
      </div>

      {/* 1. Saved Designs Tab */}
      {subTab === 'designs' && (
        <div>
          {savedDesigns.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-[#D1D5DB] p-8 text-center space-y-2">
              <Bookmark className="w-8 h-8 text-[#A8A49D] mx-auto" />
              <h4 className="text-sm font-bold text-[#121316]">
                {isRtl ? 'لا توجد تصاميم محفوظة بعد' : 'No saved designs in your collection'}
              </h4>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {savedDesigns.map((design) => {
                const title = isRtl ? design.titleAr : design.title;
                const creator = isRtl ? design.creatorNameAr : design.creatorName;

                return (
                  <div
                    key={design.id}
                    className="bg-white rounded-2xl border border-[#E6E2DB] overflow-hidden shadow-xs hover:border-[#C5A880] transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-4/5 overflow-hidden bg-[#F5F3EF]">
                        <img
                          src={design.imageUrl}
                          alt={title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <button
                          onClick={() => onToggleSavedDesign(design.id)}
                          title="Remove from saved"
                          className="absolute top-2.5 end-2.5 p-1.5 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
                        >
                          <Bookmark className="w-3.5 h-3.5 fill-current" />
                        </button>
                      </div>

                      <div className="p-3.5 space-y-1">
                        <span className="text-[10px] text-[#8E8B85] uppercase tracking-wider block">
                          {isRtl ? design.styleAr || design.style : design.style}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-[#121316] line-clamp-1">
                          {title}
                        </h4>
                        <p className="text-[11px] text-[#65625D] truncate">{creator}</p>
                      </div>
                    </div>

                    <div className="p-3.5 pt-0">
                      <Button
                        variant="gold"
                        size="sm"
                        fullWidth
                        onClick={() => onOrderDesign(design.id)}
                        className="text-xs font-bold"
                      >
                        <Scissors className="w-3.5 h-3.5 me-1.5" />
                        {isRtl ? 'تفصيل هذا التصميم' : 'Order This Style'}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 2. Favorite Ateliers */}
      {subTab === 'shops' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favoriteShops.map((shop) => (
            <div
              key={shop.id}
              className="bg-white rounded-2xl border border-[#E6E2DB] p-5 shadow-xs flex flex-col justify-between gap-4"
            >
              <div className="flex items-start gap-3.5">
                <img
                  src={shop.coverImageUrl || shop.logoUrl || 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&auto=format&fit=crop&q=80'}
                  alt={isRtl ? shop.nameAr : shop.name}
                  className="w-16 h-16 rounded-xl object-cover border border-[#E6E2DB] shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-[#121316]">
                      {isRtl ? shop.nameAr : shop.name}
                    </h4>
                    {shop.trust?.isVerifiedShop && (
                      <ShieldCheck className="w-4 h-4 text-[#2D6A4F] shrink-0" />
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#8E8B85]">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>
                      {isRtl ? shop.location.districtAr : shop.location.district},{' '}
                      {isRtl ? shop.location.cityAr : shop.location.city}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#916F3E] font-semibold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{shop.metrics?.rating || 4.9}</span>
                    <span className="text-[#8E8B85]">({shop.metrics?.reviewCount || 120})</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#F2EFE9] flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={() => onNavigateShop(shop.id)}
                  className="text-xs"
                >
                  <ExternalLink className="w-3.5 h-3.5 me-1 text-[#916F3E]" />
                  {isRtl ? 'عرض المشغل' : 'View Atelier'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. Favorite Tailors */}
      {subTab === 'tailors' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favoriteTailors.map((tailor) => (
            <div
              key={tailor.id}
              className="bg-white rounded-2xl border border-[#E6E2DB] p-5 shadow-xs flex flex-col justify-between gap-4"
            >
              <div className="flex items-start gap-3.5">
                <img
                  src={tailor.avatarUrl}
                  alt={isRtl ? tailor.nameAr : tailor.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#E6E2DB] shrink-0"
                />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-[#121316]">
                    {isRtl ? tailor.nameAr : tailor.name}
                  </h4>
                  <p className="text-xs text-[#916F3E] font-medium">
                    {isRtl ? tailor.primarySpecialtyAr : tailor.primarySpecialty}
                  </p>
                  <p className="text-[11px] text-[#8E8B85]">
                    {isRtl ? tailor.currentShopNameAr : tailor.currentShopName} ·{' '}
                    {tailor.metrics?.yearsOfExperience || 20} {isRtl ? 'سنة خبرة' : 'years exp.'}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#F2EFE9]">
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={() => onNavigateTailor(tailor.id)}
                  className="text-xs"
                >
                  <Scissors className="w-3.5 h-3.5 me-1 text-[#916F3E]" />
                  {isRtl ? 'الملف الحرفي' : 'Artisan Profile'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
