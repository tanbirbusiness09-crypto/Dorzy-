import React, { useState } from 'react';
import {
  Store,
  Scissors,
  Layers,
  Ruler,
  Sliders,
  Truck,
  Sparkles,
  Info,
  ChevronUp,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import {
  BookingDraft,
  PriceSummary,
  BookingConfig,
} from '../../types/booking';
import { mockShops } from '../../data/mock/shops';
import { mockTailors } from '../../data/mock/tailors';
import { mockServices } from '../../data/mock/services';
import { mockFabrics } from '../../data/mock/fabrics';
import { mockPortfolio } from '../../data/mock/portfolio';
import { mockSavedMeasurements } from '../../data/mock/booking';
import { useLanguage } from '../../localization/LanguageContext';
import { PriceDisplay } from '../ui/PriceDisplay';
import { Button } from '../ui/Button';

export interface BookingSummaryProps {
  draft: BookingDraft;
  priceSummary: PriceSummary;
  config: BookingConfig;
  currentStep: number;
  onNextStep?: () => void;
  onEditStep?: (step: number) => void;
  isSubmitting?: boolean;
}

export const BookingSummary: React.FC<BookingSummaryProps> = ({
  draft,
  priceSummary,
  config,
  currentStep,
  onNextStep,
  onEditStep,
  isSubmitting = false,
}) => {
  const { t, isRtl } = useLanguage();
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const shop = mockShops.find((s) => s.id === draft.shopId) || mockShops[0];
  const tailor = draft.tailorId ? mockTailors.find((t) => t.id === draft.tailorId) : undefined;
  const service = mockServices.find((s) => s.id === draft.serviceId) || mockServices[0];
  const design = draft.designId ? mockPortfolio.find((p) => p.id === draft.designId) : undefined;
  const fabric = draft.fabricId ? mockFabrics.find((f) => f.id === draft.fabricId) : undefined;
  const savedProfile = draft.measurementProfileId
    ? mockSavedMeasurements.find((m) => m.id === draft.measurementProfileId)
    : undefined;

  const shopName = isRtl ? shop.nameAr : shop.name;
  const tailorName = tailor ? (isRtl ? tailor.nameAr : tailor.name) : undefined;
  const serviceTitle = isRtl ? service.titleAr : service.title;
  const designTitle = design ? (isRtl ? design.titleAr : design.title) : undefined;
  const fabricName = draft.customerProvidedFabric
    ? t.booking.byoFabric
    : fabric
    ? (isRtl ? fabric.nameAr : fabric.name)
    : undefined;

  // Primary CTA label depending on step and price status
  const getCtaLabel = () => {
    if (currentStep < 7) {
      return isRtl ? 'المتابعة للخطوة التالية' : 'Continue to Next Step';
    }
    if (priceSummary.isCustomQuote || priceSummary.priceStatus === 'QUOTE_REQUIRED') {
      return t.booking.submitQuote;
    }
    if (draft.measurementMethod === 'shop' || draft.measurementMethod === 'home') {
      return t.booking.submitAppointment;
    }
    return t.booking.submitBooking;
  };

  const getPriceStatusBadge = () => {
    if (priceSummary.priceStatus === 'QUOTE_REQUIRED' || priceSummary.isCustomQuote) {
      return (
        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#FAF4EB] text-[#916F3E] border border-[#E5D2BA]">
          {t.booking.quoteRequired}
        </span>
      );
    }
    if (priceSummary.priceStatus === 'FIXED') {
      return (
        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9]">
          {t.booking.fixedTotal}
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#F5F3EF] text-[#65625D] border border-[#E6E2DB]">
        {t.booking.estimatedTotal}
      </span>
    );
  };

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:block w-80 xl:w-96 shrink-0 sticky top-20 self-start text-start">
        <div className="bg-[#FFFFFF] rounded-xl border border-[#E6E2DB] shadow-xs overflow-hidden">
          {/* Header */}
          <div className="bg-[#FAF9F6] px-5 py-4 border-b border-[#E6E2DB] flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#121316] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C5A880]" />
              <span>{t.booking.orderSummaryTitle}</span>
            </h2>
            {getPriceStatusBadge()}
          </div>

          {/* Selections List */}
          <div className="p-5 space-y-4 text-xs divide-y divide-[#F2EFE9]">
            {/* Atelier & Tailor */}
            <div className="space-y-1.5 pt-1 first:pt-0">
              <div className="flex items-center justify-between text-[#8E8B85]">
                <span className="flex items-center gap-1.5 font-medium">
                  <Store className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>{t.booking.selectedAtelier}</span>
                </span>
                {onEditStep && (
                  <button
                    type="button"
                    onClick={() => onEditStep(1)}
                    className="text-[#916F3E] hover:underline font-semibold cursor-pointer"
                  >
                    {t.booking.editSection}
                  </button>
                )}
              </div>
              <p className="font-semibold text-[#121316] text-sm">{shopName}</p>
              <p className="text-[11px] text-[#65625D] flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#C5A880]" />
                <span>{isRtl ? shop.location.cityAr : shop.location.city} · {isRtl ? shop.location.districtAr : shop.location.district}</span>
              </p>

              {tailor && (
                <div className="mt-2 p-2 rounded-lg bg-[#FAF9F6] border border-[#E6E2DB] flex items-center gap-2">
                  <Scissors className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                  <div>
                    <span className="text-[10px] text-[#8E8B85] block">{t.booking.selectedTailor}</span>
                    <span className="font-semibold text-[#121316]">{tailorName}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Service */}
            <div className="space-y-1 pt-3">
              <div className="flex items-center justify-between text-[#8E8B85]">
                <span className="font-medium">{t.booking.step1}</span>
                {onEditStep && (
                  <button
                    type="button"
                    onClick={() => onEditStep(1)}
                    className="text-[#916F3E] hover:underline font-semibold cursor-pointer"
                  >
                    {t.booking.editSection}
                  </button>
                )}
              </div>
              <p className="font-semibold text-[#121316]">{serviceTitle}</p>
            </div>

            {/* Design */}
            <div className="space-y-1 pt-3">
              <div className="flex items-center justify-between text-[#8E8B85]">
                <span className="font-medium">{t.booking.step2}</span>
                {onEditStep && (
                  <button
                    type="button"
                    onClick={() => onEditStep(2)}
                    className="text-[#916F3E] hover:underline font-semibold cursor-pointer"
                  >
                    {t.booking.editSection}
                  </button>
                )}
              </div>
              <p className="font-semibold text-[#121316]">
                {draft.designOption === 'custom'
                  ? t.booking.designOptionCustom
                  : designTitle || t.booking.designOptionShop}
              </p>
              {design && draft.designOption === 'inspiration' && (
                <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-[#FAF4EB] text-[#916F3E] border border-[#E5D2BA]">
                  <Sparkles className="w-2.5 h-2.5" />
                  {t.booking.inspiredByBadge} {designTitle}
                </span>
              )}
            </div>

            {/* Fabric */}
            {config.requiresFabric && (
              <div className="space-y-1 pt-3">
                <div className="flex items-center justify-between text-[#8E8B85]">
                  <span className="font-medium">{t.booking.step3}</span>
                  {onEditStep && (
                    <button
                      type="button"
                      onClick={() => onEditStep(3)}
                      className="text-[#916F3E] hover:underline font-semibold cursor-pointer"
                    >
                      {t.booking.editSection}
                    </button>
                  )}
                </div>
                <p className="font-semibold text-[#121316]">
                  {fabricName || (isRtl ? 'لم يتم الاختيار بعد' : 'Not chosen yet')}
                </p>
                {draft.fabricColor && !draft.customerProvidedFabric && (
                  <p className="text-[11px] text-[#65625D]">
                    {t.booking.colorSwatch}: {draft.fabricColor}
                  </p>
                )}
              </div>
            )}

            {/* Measurement Method */}
            {config.requiresMeasurement && (
              <div className="space-y-1 pt-3">
                <div className="flex items-center justify-between text-[#8E8B85]">
                  <span className="flex items-center gap-1 font-medium">
                    <Ruler className="w-3 h-3 text-[#C5A880]" />
                    <span>{t.booking.step4}</span>
                  </span>
                  {onEditStep && (
                    <button
                      type="button"
                      onClick={() => onEditStep(4)}
                      className="text-[#916F3E] hover:underline font-semibold cursor-pointer"
                    >
                      {t.booking.editSection}
                    </button>
                  )}
                </div>
                <p className="font-semibold text-[#121316]">
                  {draft.measurementMethod === 'saved'
                    ? savedProfile
                      ? (isRtl ? savedProfile.nameAr : savedProfile.name)
                      : t.booking.savedMeasurements
                    : draft.measurementMethod === 'home'
                    ? t.booking.homeMeasurement
                    : draft.measurementMethod === 'shop'
                    ? t.booking.measureAtShop
                    : draft.measurementMethod === 'manual'
                    ? `${t.booking.manualMeasurements} (${draft.measurementUnit || 'cm'})`
                    : t.booking.provideLater}
                </p>
              </div>
            )}

            {/* Preferences Summary */}
            {draft.preferences && (
              <div className="space-y-1 pt-3">
                <div className="flex items-center justify-between text-[#8E8B85]">
                  <span className="font-medium">{t.booking.step5}</span>
                  {onEditStep && (
                    <button
                      type="button"
                      onClick={() => onEditStep(5)}
                      className="text-[#916F3E] hover:underline font-semibold cursor-pointer"
                    >
                      {t.booking.editSection}
                    </button>
                  )}
                </div>
                <p className="text-[11px] text-[#4F4C47] leading-relaxed">
                  {draft.preferences.collarStyle && (
                    <span>{isRtl ? 'قلاب: ' : 'Collar: '}{draft.preferences.collarStyle} · </span>
                  )}
                  {draft.preferences.cuffStyle && (
                    <span>{isRtl ? 'كبك: ' : 'Cuff: '}{draft.preferences.cuffStyle} · </span>
                  )}
                  {draft.preferences.fitPreference && (
                    <span>{isRtl ? 'القصة: ' : 'Fit: '}{draft.preferences.fitPreference}</span>
                  )}
                </p>
              </div>
            )}

            {/* Delivery & Schedule */}
            <div className="space-y-1 pt-3">
              <div className="flex items-center justify-between text-[#8E8B85]">
                <span className="font-medium">{t.booking.step6}</span>
                {onEditStep && (
                  <button
                    type="button"
                    onClick={() => onEditStep(6)}
                    className="text-[#916F3E] hover:underline font-semibold cursor-pointer"
                  >
                    {t.booking.editSection}
                  </button>
                )}
              </div>
              <p className="font-semibold text-[#121316]">
                {draft.deliveryMethod === 'home_delivery'
                  ? t.booking.homeDelivery
                  : t.booking.shopPickup}
              </p>
              {draft.preferredDate && (
                <p className="text-[11px] text-[#65625D] flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#C5A880]" />
                  <span>{draft.preferredDate}</span>
                  {draft.preferredTimeSlot && <span>({draft.preferredTimeSlot})</span>}
                </p>
              )}
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="bg-[#FAF9F6] p-5 border-t border-[#E6E2DB] space-y-2 text-xs">
            <div className="flex justify-between text-[#65625D]">
              <span>{t.booking.baseService}</span>
              <span className="font-mono font-medium">{priceSummary.serviceAmount} {t.common.sar}</span>
            </div>

            {config.requiresFabric && (
              <div className="flex justify-between text-[#65625D]">
                <span>{t.booking.fabricSurcharge}</span>
                <span className="font-mono font-medium">
                  {draft.customerProvidedFabric ? (
                    <span className="text-[#388E3C]">{isRtl ? 'قماش من العميل' : 'Customer Fabric'}</span>
                  ) : priceSummary.fabricAmount ? (
                    `+ ${priceSummary.fabricAmount} ${t.common.sar}`
                  ) : (
                    t.booking.includedInBase
                  )}
                </span>
              </div>
            )}

            {priceSummary.customizationAmount ? (
              <div className="flex justify-between text-[#65625D]">
                <span>{t.booking.customizationFee}</span>
                <span className="font-mono font-medium">+ {priceSummary.customizationAmount} {t.common.sar}</span>
              </div>
            ) : null}

            {priceSummary.measurementFee ? (
              <div className="flex justify-between text-[#65625D]">
                <span>{t.booking.measurementServiceFee}</span>
                <span className="font-mono font-medium">+ {priceSummary.measurementFee} {t.common.sar}</span>
              </div>
            ) : null}

            {draft.deliveryMethod === 'home_delivery' && (
              <div className="flex justify-between text-[#65625D]">
                <span>{t.booking.deliveryServiceFee}</span>
                <span className="font-mono font-medium">+ {priceSummary.deliveryFee || 25} {t.common.sar}</span>
              </div>
            )}

            {/* Total */}
            <div className="pt-3 border-t border-[#E6E2DB] flex items-baseline justify-between">
              <div>
                <span className="text-xs font-bold text-[#121316]">
                  {priceSummary.priceStatus === 'QUOTE_REQUIRED'
                    ? t.booking.quoteRequired
                    : priceSummary.priceStatus === 'FIXED'
                    ? t.booking.fixedTotal
                    : t.booking.estimatedTotal}
                </span>
                <span className="block text-[10px] text-[#8E8B85]">
                  {t.booking.vatIncluded}
                </span>
              </div>
              <div className="text-end">
                {priceSummary.priceStatus === 'QUOTE_REQUIRED' ? (
                  <span className="text-xs font-bold text-[#916F3E]">
                    {isRtl ? 'يُحدد بعد مراجعة المشغل' : 'Confirmed by Shop'}
                  </span>
                ) : (
                  <PriceDisplay amount={priceSummary.estimatedTotal || 0} size="lg" />
                )}
              </div>
            </div>

            {/* Notice */}
            <p className="text-[10px] text-[#8E8B85] pt-1 leading-relaxed">
              {priceSummary.priceStatus === 'QUOTE_REQUIRED'
                ? t.booking.priceNoticeQuote
                : priceSummary.priceStatus === 'FIXED'
                ? t.booking.priceNoticeFixed
                : t.booking.priceNoticeEstimated}
            </p>

            {/* Action button */}
            {onNextStep && (
              <div className="pt-3">
                <Button
                  variant="primary"
                  size="md"
                  onClick={onNextStep}
                  isLoading={isSubmitting}
                  className="w-full justify-center py-2.5 text-xs font-semibold shadow-xs"
                >
                  <span>{getCtaLabel()}</span>
                  <ArrowIcon className="w-4 h-4 ms-1.5" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* MOBILE BOTTOM SHEET / STICKY BAR */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#FFFFFF] border-t border-[#E6E2DB] shadow-lg text-start select-none">
        {/* Expandable summary accordion */}
        {isMobileExpanded && (
          <div className="max-h-[60vh] overflow-y-auto p-4 space-y-3 text-xs border-b border-[#E6E2DB] bg-[#FAF9F6]">
            <div className="flex justify-between items-center pb-2 border-b border-[#E6E2DB]">
              <span className="font-bold text-[#121316]">{t.booking.orderSummaryTitle}</span>
              {getPriceStatusBadge()}
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-[#8E8B85]">{t.booking.selectedAtelier}:</span>
                <span className="font-semibold text-[#121316]">{shopName}</span>
              </div>
              {tailor && (
                <div className="flex justify-between">
                  <span className="text-[#8E8B85]">{t.booking.selectedTailor}:</span>
                  <span className="font-semibold text-[#121316]">{tailorName}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-[#8E8B85]">{t.booking.step1}:</span>
                <span className="font-semibold text-[#121316]">{serviceTitle}</span>
              </div>
              {config.requiresFabric && (
                <div className="flex justify-between">
                  <span className="text-[#8E8B85]">{t.booking.step3}:</span>
                  <span className="font-semibold text-[#121316]">{fabricName || '—'}</span>
                </div>
              )}
              {config.requiresMeasurement && (
                <div className="flex justify-between">
                  <span className="text-[#8E8B85]">{t.booking.step4}:</span>
                  <span className="font-semibold text-[#121316]">
                    {draft.measurementMethod || '—'}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-[#8E8B85]">{t.booking.step6}:</span>
                <span className="font-semibold text-[#121316]">
                  {draft.deliveryMethod === 'home_delivery'
                    ? t.booking.homeDelivery
                    : t.booking.shopPickup}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Sticky Action Footer */}
        <div className="p-3 sm:p-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setIsMobileExpanded(!isMobileExpanded)}
            className="flex items-center gap-1.5 text-xs text-[#121316] font-semibold cursor-pointer"
          >
            <div>
              <span className="block text-[10px] text-[#8E8B85]">
                {priceSummary.priceStatus === 'QUOTE_REQUIRED'
                  ? t.booking.quoteRequired
                  : t.booking.estimatedTotal}
              </span>
              <div className="flex items-center gap-1">
                {priceSummary.priceStatus === 'QUOTE_REQUIRED' ? (
                  <span className="text-xs font-bold text-[#916F3E]">{isRtl ? 'تسعيرة مخصصة' : 'Custom Quote'}</span>
                ) : (
                  <PriceDisplay amount={priceSummary.estimatedTotal || 0} size="md" />
                )}
                {isMobileExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
              </div>
            </div>
          </button>

          {onNextStep && (
            <Button
              variant="primary"
              size="md"
              onClick={onNextStep}
              isLoading={isSubmitting}
              className="grow max-w-[200px] justify-center py-2 text-xs font-semibold shadow-xs"
            >
              <span>{getCtaLabel()}</span>
              <ArrowIcon className="w-4 h-4 ms-1" />
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
