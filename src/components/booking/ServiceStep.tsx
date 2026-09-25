import React, { useState } from 'react';
import {
  Store,
  Scissors,
  MapPin,
  Clock,
  Star,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ChevronDown,
  Layers,
  ArrowRight,
  ArrowLeft,
  Calendar,
} from 'lucide-react';
import { TailoringService, Shop, Tailor } from '../../types';
import { mockServices } from '../../data/mock/services';
import { mockShops } from '../../data/mock/shops';
import { mockTailors } from '../../data/mock/tailors';
import { useLanguage } from '../../localization/LanguageContext';
import { PriceDisplay } from '../ui/PriceDisplay';
import { VerificationBadge } from '../trust/VerificationBadge';

export interface ServiceStepProps {
  selectedServiceId?: string;
  selectedShop: Shop;
  selectedTailor?: Tailor;
  onSelectService: (serviceId: string) => void;
  onSelectShop: (shopId: string) => void;
  onSelectTailor: (tailorId?: string) => void;
}

export const ServiceStep: React.FC<ServiceStepProps> = ({
  selectedServiceId,
  selectedShop,
  selectedTailor,
  onSelectService,
  onSelectShop,
  onSelectTailor,
}) => {
  const { t, isRtl } = useLanguage();
  const [isChangingShop, setIsChangingShop] = useState(false);
  const [isSelectingTailor, setIsSelectingTailor] = useState(false);

  const shopName = isRtl ? selectedShop.nameAr : selectedShop.name;
  const city = isRtl ? selectedShop.location.cityAr : selectedShop.location.city;
  const district = isRtl ? selectedShop.location.districtAr : selectedShop.location.district;

  // Tailors available for this shop
  const shopTailors = mockTailors.filter(
    (tailor) => tailor.currentShopId === selectedShop.id
  );

  return (
    <div className="space-y-6 text-start">
      {/* 1. ATELIER & TAILOR CONTEXT CARD */}
      <section className="bg-[#FFFFFF] rounded-xl border border-[#E6E2DB] p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F2EFE9]">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-lg bg-[#FAF9F6] border border-[#E6E2DB] overflow-hidden shrink-0 flex items-center justify-center">
              {selectedShop.coverImageUrl ? (
                <img
                  src={selectedShop.coverImageUrl}
                  alt={shopName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Store className="w-6 h-6 text-[#916F3E]" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-[#8E8B85] uppercase tracking-wider font-semibold">
                  {t.booking.selectedAtelier}
                </span>
                {selectedShop.trust.isVerifiedShop && (
                  <VerificationBadge type="verified_shop" size="sm" />
                )}
              </div>
              <h2 className="text-base sm:text-lg font-bold text-[#121316] font-display">
                {shopName}
              </h2>
              <div className="flex items-center gap-3 text-xs text-[#65625D] mt-0.5">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>{district}, {city}</span>
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-[#C5A880] fill-current" />
                  <span className="font-semibold text-[#121316]">{selectedShop.metrics.rating.toFixed(1)}</span>
                  <span>({selectedShop.metrics.reviewCount})</span>
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsChangingShop(!isChangingShop)}
            className="text-xs font-semibold text-[#916F3E] hover:text-[#7A5B2E] border border-[#E2D5C3] hover:border-[#C5A880] bg-[#FAF4EB] px-3 py-1.5 rounded-lg transition-colors cursor-pointer self-start sm:self-center"
          >
            {isChangingShop ? (isRtl ? 'إغلاق القائمة' : 'Close List') : t.booking.changeShop}
          </button>
        </div>

        {/* Change Atelier Dropdown drawer */}
        {isChangingShop && (
          <div className="pt-4 border-b border-[#F2EFE9] space-y-2">
            <p className="text-xs font-semibold text-[#121316]">
              {isRtl ? 'اختر مشغل آخر في المملكة:' : 'Select an alternative atelier:'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto">
              {mockShops.map((shop) => (
                <button
                  key={shop.id}
                  type="button"
                  onClick={() => {
                    onSelectShop(shop.id);
                    setIsChangingShop(false);
                  }}
                  className={`p-2.5 rounded-lg border text-start flex items-center justify-between text-xs cursor-pointer transition-colors ${
                    shop.id === selectedShop.id
                      ? 'border-[#C5A880] bg-[#FAF4EB] font-bold text-[#121316]'
                      : 'border-[#E6E2DB] bg-white hover:bg-[#FAF9F6] text-[#65625D]'
                  }`}
                >
                  <div>
                    <span className="block font-semibold">{isRtl ? shop.nameAr : shop.name}</span>
                    <span className="text-[10px] text-[#8E8B85]">{isRtl ? shop.location.cityAr : shop.location.city}</span>
                  </div>
                  {shop.id === selectedShop.id && (
                    <CheckCircle2 className="w-4 h-4 text-[#916F3E]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tailor Selection / Assignment Status */}
        <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#FAF4EB] border border-[#E5D2BA] flex items-center justify-center text-[#916F3E] shrink-0">
              <Scissors className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-[#8E8B85] block">{t.booking.selectedTailor}</span>
              <span className="text-xs font-semibold text-[#121316]">
                {selectedTailor
                  ? (isRtl ? selectedTailor.nameAr : selectedTailor.name)
                  : (isRtl ? 'حسب توفر كبار معلّمي المشغل' : 'Assigned by Atelier Master Cutter')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {shopTailors.length > 0 && (
              <button
                type="button"
                onClick={() => setIsSelectingTailor(!isSelectingTailor)}
                className="text-[11px] font-medium text-[#65625D] hover:text-[#121316] underline cursor-pointer"
              >
                {selectedTailor
                  ? (isRtl ? 'تغيير المعلّم' : 'Change Tailor')
                  : (isRtl ? 'طلب معلّم محدد' : 'Request Specific Tailor')}
              </button>
            )}
            {selectedTailor && (
              <button
                type="button"
                onClick={() => onSelectTailor(undefined)}
                className="text-[11px] text-[#D32F2F] hover:underline cursor-pointer"
              >
                {isRtl ? 'إلغاء التخصيص' : 'Clear'}
              </button>
            )}
          </div>
        </div>

        {/* Tailor selection drawer */}
        {isSelectingTailor && (
          <div className="pt-3 border-t border-[#F2EFE9] mt-3 space-y-2">
            <p className="text-[11px] text-[#8E8B85]">
              {isRtl ? 'معلّمو الخياطة المقيمون في هذا المشغل:' : 'Resident master tailors at this atelier:'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {shopTailors.map((tailor) => (
                <button
                  key={tailor.id}
                  type="button"
                  onClick={() => {
                    onSelectTailor(tailor.id);
                    setIsSelectingTailor(false);
                  }}
                  className={`p-2 rounded-lg border text-start flex items-center gap-2.5 text-xs cursor-pointer ${
                    tailor.id === selectedTailor?.id
                      ? 'border-[#C5A880] bg-[#FAF4EB] font-bold text-[#121316]'
                      : 'border-[#E6E2DB] bg-white hover:bg-[#FAF9F6]'
                  }`}
                >
                  {tailor.avatarUrl ? (
                    <img
                      src={tailor.avatarUrl}
                      alt={tailor.name}
                      className="w-8 h-8 rounded-full object-cover border border-[#E6E2DB]"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#FAF4EB] border border-[#E5D2BA] flex items-center justify-center text-[#916F3E]">
                      <Scissors className="w-4 h-4" />
                    </div>
                  )}
                  <div className="truncate">
                    <span className="block font-semibold truncate">{isRtl ? tailor.nameAr : tailor.name}</span>
                    <span className="text-[10px] text-[#8E8B85] truncate">
                      {isRtl ? tailor.primarySpecialtyAr : tailor.primarySpecialty}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tailor Relationship Notice (Section 5 & 42 requirement) */}
        <div className="mt-3 p-2.5 rounded-lg bg-[#FAF9F6] border border-[#E6E2DB] flex items-start gap-2 text-[11px] text-[#65625D]">
          <AlertCircle className="w-3.5 h-3.5 text-[#916F3E] shrink-0 mt-0.5" />
          <span>{t.booking.tailorRelationshipNotice}</span>
        </div>
      </section>

      {/* 2. CHOOSE SERVICE SECTION */}
      <section className="space-y-4">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-[#121316] font-display">
            {t.booking.chooseService}
          </h1>
          <p className="text-xs text-[#65625D] mt-0.5">
            {isRtl
              ? 'اختر نوع الثوب أو القطعة التي ترغب بتفصيلها وفق أعلى معايير الجودة والوقفة السعودية.'
              : 'Select the garment category to be crafted according to authentic Saudi tailoring standards.'}
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {mockServices.map((service) => {
            const isSelected = service.id === selectedServiceId;
            const title = isRtl ? service.titleAr : service.title;
            const description = isRtl ? service.descriptionAr : service.description;
            const isQuoteRequired = service.id === 'serv_07' || service.id === 'serv_09';

            return (
              <div
                key={service.id}
                onClick={() => onSelectService(service.id)}
                className={`p-4 sm:p-5 rounded-xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#C5A880] bg-[#FFFDF9] ring-2 ring-[#C5A880]/30 shadow-xs'
                    : 'border-[#E6E2DB] bg-white hover:border-[#D4D0C7] hover:bg-[#FAF9F6]'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#FAF9F6] border border-[#E6E2DB] text-[#8E8B85] uppercase tracking-wider font-semibold">
                        {service.category.replace('_', ' ')}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-[#121316] mt-1 font-display">
                        {title}
                      </h3>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'border-[#C5A880] bg-[#C5A880] text-white'
                          : 'border-[#D4D0C7] bg-white'
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="w-4 h-4" />}
                    </div>
                  </div>

                  <p className="text-xs text-[#65625D] leading-relaxed line-clamp-3 mb-4">
                    {description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F2EFE9] flex items-center justify-between gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-[#8E8B85] block">{t.common.startingFrom}</span>
                    <PriceDisplay amount={service.startingPriceSar} size="sm" />
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-[#8E8B85]">
                    {service.estimatedDays && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>{service.estimatedDays} {t.service.days}</span>
                      </span>
                    )}

                    {service.availableFabricsCount > 0 && (
                      <span className="flex items-center gap-1">
                        <Layers className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>{service.availableFabricsCount} {isRtl ? 'قماش' : 'fabrics'}</span>
                      </span>
                    )}
                  </div>
                </div>

                {isQuoteRequired && (
                  <div className="mt-2.5 px-2.5 py-1 rounded bg-[#FAF4EB] border border-[#E5D2BA] text-[10px] text-[#916F3E] flex items-center gap-1">
                    <Sparkles className="w-3 h-3 shrink-0" />
                    <span>{t.booking.serviceCustomQuoteNotice}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
