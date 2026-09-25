import React from 'react';
import {
  Store,
  Scissors,
  Layers,
  Ruler,
  Sliders,
  Truck,
  Sparkles,
  CheckCircle2,
  Calendar,
  Clock,
  ShieldCheck,
  Edit2,
  FileCheck,
  AlertCircle,
} from 'lucide-react';
import {
  BookingDraft,
  PriceSummary,
  BookingConfig,
} from '../../types/booking';
import { Shop, Tailor, TailoringService, DetailedFabric, PortfolioItem } from '../../types';
import { mockSavedMeasurements } from '../../data/mock/booking';
import { useLanguage } from '../../localization/LanguageContext';
import { PriceDisplay } from '../ui/PriceDisplay';
import { Button } from '../ui/Button';

export interface ReviewStepProps {
  draft: BookingDraft;
  priceSummary: PriceSummary;
  config: BookingConfig;
  shop: Shop;
  tailor?: Tailor;
  service: TailoringService;
  fabric?: DetailedFabric;
  design?: PortfolioItem;
  onEditSection: (step: number) => void;
  onToggleTerms: (agreed: boolean) => void;
  onToggleConfirmedInfo: (confirmed: boolean) => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

export const ReviewStep: React.FC<ReviewStepProps> = ({
  draft,
  priceSummary,
  config,
  shop,
  tailor,
  service,
  fabric,
  design,
  onEditSection,
  onToggleTerms,
  onToggleConfirmedInfo,
  onSubmit,
  isSubmitting = false,
}) => {
  const { t, isRtl } = useLanguage();

  const shopName = isRtl ? shop.nameAr : shop.name;
  const tailorName = tailor ? (isRtl ? tailor.nameAr : tailor.name) : undefined;
  const serviceTitle = isRtl ? service.titleAr : service.title;
  const designTitle = design ? (isRtl ? design.titleAr : design.title) : undefined;
  const fabricName = draft.customerProvidedFabric
    ? t.booking.byoFabric
    : fabric
    ? (isRtl ? fabric.nameAr : fabric.name)
    : undefined;

  const savedProfile = draft.measurementProfileId
    ? mockSavedMeasurements.find((m) => m.id === draft.measurementProfileId)
    : undefined;

  // Primary CTA label
  const getCtaLabel = () => {
    if (priceSummary.isCustomQuote || priceSummary.priceStatus === 'QUOTE_REQUIRED') {
      return t.booking.submitQuote;
    }
    if (draft.measurementMethod === 'shop' || draft.measurementMethod === 'home') {
      return t.booking.submitAppointment;
    }
    return t.booking.submitBooking;
  };

  return (
    <div className="space-y-6 text-start">
      {/* 1. HEADER */}
      <div>
        <h1 className="text-lg sm:text-xl font-bold text-[#121316] font-display">
          {t.booking.reviewTitle}
        </h1>
        <p className="text-xs text-[#65625D] mt-0.5">
          {t.booking.reviewSubtitle}
        </p>
      </div>

      {/* 2. RECIPIENT & TRUST CLARITY (Prompt Section 56) */}
      <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E6E2DB] flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-[#916F3E] shrink-0 mt-0.5" />
        <div className="text-xs text-[#65625D] space-y-1">
          <p className="font-bold text-[#121316]">
            {isRtl ? 'لمن يُرسل هذا الطلب؟' : 'Who will receive this request?'}
          </p>
          <p>
            {isRtl
              ? `سيتم إرسال هذا الطلب مباشرة إلى إدارة مشغل ${shopName}${tailorName ? ` مع طلب تخصيص معلّم الخياطة ${tailorName}` : ''}. لن يتم خصم أي مبالغ الآن، وسيتواصل معك المشغل لتأكيد الحياكة والمقاسات.`
              : `This request will be sent directly to ${shopName}${tailorName ? ` with a dedicated assignment request for Master Tailor ${tailorName}` : ''}. No payment is taken now. The atelier cutter will review and verify every detail.`}
          </p>
        </div>
      </div>

      {/* 3. REVIEW SECTIONS WITH EDIT BUTTONS */}
      <div className="bg-white rounded-xl border border-[#E6E2DB] divide-y divide-[#F2EFE9] shadow-xs text-xs">
        {/* Section 1: Atelier & Tailor */}
        <div className="p-4 sm:p-5 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] text-[#8E8B85] uppercase tracking-wider font-semibold">
              {t.booking.selectedAtelier}
            </span>
            <p className="font-bold text-[#121316] text-sm">{shopName}</p>
            <p className="text-[#65625D]">
              {isRtl ? shop.location.cityAr : shop.location.city} · {isRtl ? shop.location.districtAr : shop.location.district}
            </p>
            {tailorName && (
              <p className="text-[#916F3E] font-medium pt-0.5">
                {t.booking.selectedTailor}: {tailorName}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => onEditSection(1)}
            className="flex items-center gap-1 text-[#916F3E] hover:underline font-semibold cursor-pointer"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>{t.booking.editSection}</span>
          </button>
        </div>

        {/* Section 2: Service */}
        <div className="p-4 sm:p-5 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] text-[#8E8B85] uppercase tracking-wider font-semibold">
              {t.booking.step1}
            </span>
            <p className="font-bold text-[#121316] text-sm">{serviceTitle}</p>
            <p className="text-[#65625D] line-clamp-2">{isRtl ? service.descriptionAr : service.description}</p>
          </div>
          <button
            type="button"
            onClick={() => onEditSection(1)}
            className="flex items-center gap-1 text-[#916F3E] hover:underline font-semibold cursor-pointer"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>{t.booking.editSection}</span>
          </button>
        </div>

        {/* Section 3: Design / Style */}
        <div className="p-4 sm:p-5 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] text-[#8E8B85] uppercase tracking-wider font-semibold">
              {t.booking.step2}
            </span>
            <p className="font-bold text-[#121316] text-sm">
              {draft.designOption === 'custom'
                ? t.booking.designOptionCustom
                : designTitle || t.booking.designOptionShop}
            </p>
            {draft.customDesignNotes && (
              <p className="text-[#65625D] italic">"{draft.customDesignNotes}"</p>
            )}
            {design && draft.designOption === 'inspiration' && (
              <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-[#FAF4EB] text-[#916F3E] border border-[#E5D2BA]">
                <Sparkles className="w-2.5 h-2.5" />
                {t.booking.inspiredByBadge} {designTitle}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => onEditSection(2)}
            className="flex items-center gap-1 text-[#916F3E] hover:underline font-semibold cursor-pointer"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>{t.booking.editSection}</span>
          </button>
        </div>

        {/* Section 4: Fabric */}
        {config.requiresFabric && (
          <div className="p-4 sm:p-5 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] text-[#8E8B85] uppercase tracking-wider font-semibold">
                {t.booking.step3}
              </span>
              <p className="font-bold text-[#121316] text-sm">{fabricName}</p>
              {draft.fabricColor && !draft.customerProvidedFabric && (
                <p className="text-[#65625D]">
                  {t.booking.colorSwatch}: {draft.fabricColor}
                </p>
              )}
              {draft.customerFabricDescription && (
                <p className="text-[#65625D] italic">"{draft.customerFabricDescription}"</p>
              )}
            </div>
            <button
              type="button"
              onClick={() => onEditSection(3)}
              className="flex items-center gap-1 text-[#916F3E] hover:underline font-semibold cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>{t.booking.editSection}</span>
            </button>
          </div>
        )}

        {/* Section 5: Measurement */}
        {config.requiresMeasurement && (
          <div className="p-4 sm:p-5 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] text-[#8E8B85] uppercase tracking-wider font-semibold">
                {t.booking.step4}
              </span>
              <p className="font-bold text-[#121316] text-sm">
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
            <button
              type="button"
              onClick={() => onEditSection(4)}
              className="flex items-center gap-1 text-[#916F3E] hover:underline font-semibold cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>{t.booking.editSection}</span>
            </button>
          </div>
        )}

        {/* Section 6: Preferences */}
        {draft.preferences && (
          <div className="p-4 sm:p-5 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] text-[#8E8B85] uppercase tracking-wider font-semibold">
                {t.booking.step5}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[#65625D]">
                <div>
                  <span className="font-medium text-[#121316]">{t.booking.collarStyle}: </span>
                  <span>{draft.preferences.collarStyle || 'Classic'}</span>
                </div>
                <div>
                  <span className="font-medium text-[#121316]">{t.booking.cuffStyle}: </span>
                  <span>{draft.preferences.cuffStyle || 'Standard'}</span>
                </div>
                <div>
                  <span className="font-medium text-[#121316]">{t.booking.buttonsStyle}: </span>
                  <span>{draft.preferences.buttonsStyle || 'Hidden'}</span>
                </div>
                <div>
                  <span className="font-medium text-[#121316]">{t.booking.fitPreference}: </span>
                  <span>{draft.preferences.fitPreference || 'Tailored'}</span>
                </div>
              </div>
              {draft.preferences.specialInstructions && (
                <p className="text-[#65625D] italic pt-1">
                  "{draft.preferences.specialInstructions}"
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => onEditSection(5)}
              className="flex items-center gap-1 text-[#916F3E] hover:underline font-semibold cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>{t.booking.editSection}</span>
            </button>
          </div>
        )}

        {/* Section 7: Delivery & Schedule */}
        <div className="p-4 sm:p-5 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] text-[#8E8B85] uppercase tracking-wider font-semibold">
              {t.booking.step6}
            </span>
            <p className="font-bold text-[#121316] text-sm">
              {draft.deliveryMethod === 'home_delivery'
                ? t.booking.homeDelivery
                : t.booking.shopPickup}
            </p>
            {draft.preferredDate && (
              <p className="text-[#65625D] flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{draft.preferredDate} ({draft.preferredTimeSlot})</span>
              </p>
            )}
            {draft.deliveryMethod === 'home_delivery' && draft.deliveryAddress && (
              <p className="text-[#65625D]">
                {draft.deliveryAddress.city} - {draft.deliveryAddress.area}, {draft.deliveryAddress.addressLine}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => onEditSection(6)}
            className="flex items-center gap-1 text-[#916F3E] hover:underline font-semibold cursor-pointer"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>{t.booking.editSection}</span>
          </button>
        </div>
      </div>

      {/* 4. TERMS & CONSENT (Prompt Section 31) */}
      <div className="bg-[#FAF9F6] rounded-xl border border-[#E6E2DB] p-4 sm:p-5 space-y-3">
        <label className="flex items-start gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={!!draft.confirmedInformation}
            onChange={(e) => onToggleConfirmedInfo(e.target.checked)}
            className="mt-0.5 rounded border-[#D4D0C7] text-[#916F3E] focus:ring-[#C5A880] w-4 h-4 cursor-pointer"
          />
          <span className="text-xs text-[#121316] font-medium leading-relaxed">
            {t.booking.confirmCorrect}
          </span>
        </label>

        <label className="flex items-start gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={!!draft.agreedToTerms}
            onChange={(e) => onToggleTerms(e.target.checked)}
            className="mt-0.5 rounded border-[#D4D0C7] text-[#916F3E] focus:ring-[#C5A880] w-4 h-4 cursor-pointer"
          />
          <span className="text-xs text-[#65625D] leading-relaxed">
            {t.booking.agreeTerms}
          </span>
        </label>
      </div>

      {/* 5. PRIMARY CTA */}
      <div className="pt-2">
        <Button
          variant="primary"
          size="lg"
          onClick={onSubmit}
          isLoading={isSubmitting}
          className="w-full justify-center py-3.5 text-sm font-semibold shadow-md"
        >
          <span>{getCtaLabel()}</span>
        </Button>
      </div>
    </div>
  );
};
