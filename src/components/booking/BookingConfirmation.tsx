import React from 'react';
import {
  CheckCircle2,
  Clock,
  Calendar,
  Store,
  Scissors,
  FileCheck,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { Booking } from '../../types/booking';
import { useLanguage } from '../../localization/LanguageContext';
import { PriceDisplay } from '../ui/PriceDisplay';
import { Button } from '../ui/Button';

export interface BookingConfirmationProps {
  booking: Booking;
  onViewOrder?: (orderId: string) => void;
  onBackToShop?: (shopId: string) => void;
  onBackToMarketplace?: () => void;
}

export const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  booking,
  onViewOrder,
  onBackToShop,
  onBackToMarketplace,
}) => {
  const { t, isRtl } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const shopName = isRtl ? booking.shopNameAr : booking.shopName;
  const tailorName = booking.tailorName
    ? isRtl
      ? booking.tailorNameAr
      : booking.tailorName
    : undefined;
  const serviceName = isRtl ? booking.serviceNameAr : booking.serviceName;

  const nextSteps = [
    { title: t.booking.nextStep1, time: isRtl ? 'خلال ساعتين' : 'Within 2 hours' },
    { title: t.booking.nextStep2, time: isRtl ? 'اليوم نفسه' : 'Same day' },
    { title: t.booking.nextStep3, time: isRtl ? 'قبل البدء' : 'Prior to cutting' },
    { title: t.booking.nextStep4, time: isRtl ? 'مرحلة الحياكة' : 'Active tailoring' },
    { title: t.booking.nextStep5, time: isRtl ? 'إشعار فوري' : 'Live updates' },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-8 text-start py-8 px-4 sm:px-6">
      {/* 1. SUCCESS HERO */}
      <div className="bg-white rounded-2xl border border-[#E6E2DB] p-6 sm:p-8 text-center space-y-4 shadow-xs">
        <div className="w-16 h-16 rounded-2xl bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center mx-auto ring-8 ring-[#E8F5E9]/50">
          <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
        </div>

        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#121316] font-display">
            {booking.priceSummary.isCustomQuote
              ? isRtl
                ? 'تم استلام طلب التسعيرة الخاصة بنجاح'
                : 'Custom Quote Request Sent'
              : t.booking.successTitle}
          </h1>
          <p className="text-xs sm:text-sm text-[#65625D] mt-1.5 max-w-md mx-auto">
            {t.booking.successSubtitle}
          </p>
        </div>

        {/* Reference Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#FAF9F6] border border-[#E6E2DB]">
          <span className="text-xs text-[#8E8B85]">{t.booking.bookingRef}:</span>
          <span className="font-mono text-sm font-bold text-[#916F3E]">
            {booking.referenceNumber}
          </span>
        </div>
      </div>

      {/* 2. ORDER DETAILS CARD */}
      <div className="bg-white rounded-xl border border-[#E6E2DB] p-5 sm:p-6 space-y-4 shadow-xs text-xs">
        <h2 className="text-xs font-bold text-[#8E8B85] uppercase tracking-wider pb-2 border-b border-[#F2EFE9]">
          {isRtl ? 'ملخص تفاصيل الطلب المقدم:' : 'Order Request Summary:'}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <span className="text-[#8E8B85] block">{t.booking.selectedAtelier}:</span>
            <span className="font-bold text-sm text-[#121316]">{shopName}</span>
          </div>

          {tailorName && (
            <div>
              <span className="text-[#8E8B85] block">{t.booking.selectedTailor}:</span>
              <span className="font-bold text-sm text-[#121316]">{tailorName}</span>
            </div>
          )}

          <div>
            <span className="text-[#8E8B85] block">{t.booking.step1}:</span>
            <span className="font-semibold text-[#121316]">{serviceName}</span>
          </div>

          <div>
            <span className="text-[#8E8B85] block">{t.booking.step4}:</span>
            <span className="font-semibold text-[#121316]">
              {booking.measurementMethod === 'saved'
                ? t.booking.savedMeasurements
                : booking.measurementMethod === 'home'
                ? t.booking.homeMeasurement
                : booking.measurementMethod === 'shop'
                ? t.booking.measureAtShop
                : booking.measurementMethod}
            </span>
          </div>

          <div>
            <span className="text-[#8E8B85] block">{t.booking.step6}:</span>
            <span className="font-semibold text-[#121316]">
              {booking.deliveryMethod === 'home_delivery'
                ? t.booking.homeDelivery
                : t.booking.shopPickup}
            </span>
          </div>

          <div>
            <span className="text-[#8E8B85] block">{t.booking.preferredDate}:</span>
            <span className="font-semibold text-[#121316]">
              {booking.preferredDate} ({booking.preferredTimeSlot})
            </span>
          </div>
        </div>

        {/* Pricing Summary line */}
        <div className="pt-3 border-t border-[#F2EFE9] flex items-center justify-between">
          <div>
            <span className="text-[#8E8B85]">{t.booking.estimatedTotal}:</span>
            <span className="text-[10px] text-[#8E8B85] block">{t.booking.vatIncluded}</span>
          </div>
          <div>
            {booking.priceSummary.isCustomQuote ? (
              <span className="font-bold text-[#916F3E] text-sm">
                {isRtl ? 'تسعيرة مخصصة قيد المراجعة' : 'Custom Quote Pending'}
              </span>
            ) : (
              <PriceDisplay amount={booking.priceSummary.estimatedTotal || 0} size="md" />
            )}
          </div>
        </div>
      </div>

      {/* 3. WHAT HAPPENS NEXT (Prompt Section 34) */}
      <div className="bg-white rounded-xl border border-[#E6E2DB] p-5 sm:p-6 space-y-4 shadow-xs">
        <h2 className="text-sm font-bold text-[#121316] flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#C5A880]" />
          <span>{t.booking.nextStepsTitle}</span>
        </h2>

        <div className="space-y-3">
          {nextSteps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-3 text-xs">
              <div className="w-6 h-6 rounded-full bg-[#FAF4EB] border border-[#E5D2BA] text-[#916F3E] flex items-center justify-center font-bold font-mono shrink-0 mt-0.5">
                {idx + 1}
              </div>
              <div className="flex-1">
                <p className="text-[#121316] font-medium leading-relaxed">{step.title}</p>
                <span className="text-[10px] text-[#8E8B85]">{step.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. ACTIONS */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        {onViewOrder && (
          <Button
            variant="primary"
            size="md"
            onClick={() => onViewOrder(booking.id)}
            className="w-full sm:w-auto justify-center"
          >
            <span>{t.booking.viewOrderRequest}</span>
            <ExternalLink className="w-3.5 h-3.5 ms-1.5" />
          </Button>
        )}

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {onBackToShop && (
            <Button
              variant="outline"
              size="md"
              onClick={() => onBackToShop(booking.shopId)}
              className="w-full sm:w-auto justify-center"
            >
              {t.booking.backToAtelier}
            </Button>
          )}

          {onBackToMarketplace && (
            <Button
              variant="outline"
              size="md"
              onClick={onBackToMarketplace}
              className="w-full sm:w-auto justify-center"
            >
              {t.booking.backToMarketplace}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
