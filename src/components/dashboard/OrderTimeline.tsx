import React from 'react';
import { Check, Clock, AlertCircle } from 'lucide-react';
import { OrderStatus, OrderStatusEvent } from '../../types';
import { useLanguage } from '../../localization/LanguageContext';

export interface OrderTimelineProps {
  currentStatus: OrderStatus;
  statusHistory: OrderStatusEvent[];
  estimatedCompletionDate?: string;
}

interface MilestoneDef {
  key: string;
  labelEn: string;
  labelAr: string;
  subEn: string;
  subAr: string;
  statuses: OrderStatus[];
}

export const OrderTimeline: React.FC<OrderTimelineProps> = ({
  currentStatus,
  statusHistory,
  estimatedCompletionDate,
}) => {
  const { isRtl } = useLanguage();

  const isCancelled = currentStatus === 'CANCELLED';

  const milestones: MilestoneDef[] = [
    {
      key: 'requested',
      labelEn: 'Request Submitted',
      labelAr: 'تقديم الطلب',
      subEn: 'Client submitted order specs',
      subAr: 'تم إرسال مواصفات الثوب',
      statuses: ['REQUESTED', 'UNDER_REVIEW'],
    },
    {
      key: 'confirmed',
      labelEn: 'Shop Confirmed',
      labelAr: 'اعتماد المشغل',
      subEn: 'Atelier approved production',
      subAr: 'اعتمد المشغل خطة العمل',
      statuses: ['CONFIRMED'],
    },
    {
      key: 'measured',
      labelEn: 'Measurements Confirmed',
      labelAr: 'اعتماد المقاسات',
      subEn: 'Anatomy specs verified',
      subAr: 'فحص المقاسات والقصة',
      statuses: ['MEASUREMENT_PENDING', 'MEASURED'],
    },
    {
      key: 'fabric',
      labelEn: 'Fabric Selected',
      labelAr: 'تخصيص القماش',
      subEn: 'Bolt allocated & inspected',
      subAr: 'حجز طاقة القماش المعتمدة',
      statuses: ['FABRIC_SELECTED'],
    },
    {
      key: 'production',
      labelEn: 'In Production',
      labelAr: 'الحياكة والقص',
      subEn: 'Hand cutting & tailoring',
      subAr: 'القص اليدوي وتجميع الثوب',
      statuses: ['IN_PRODUCTION'],
    },
    {
      key: 'quality',
      labelEn: 'Quality Check',
      labelAr: 'فحص الجودة',
      subEn: 'Master cutter inspection',
      subAr: 'تدقيق الخياطة والتشطيب',
      statuses: ['QUALITY_CHECK'],
    },
    {
      key: 'ready',
      labelEn: 'Ready / Dispatch',
      labelAr: 'جاهز للاستلام أو التوصيل',
      subEn: 'Fitting ready or courier out',
      subAr: 'جاهز للبروفة أو خرج مع المندوب',
      statuses: ['READY', 'READY_FOR_PICKUP', 'OUT_FOR_DELIVERY'],
    },
    {
      key: 'completed',
      labelEn: 'Completed',
      labelAr: 'مكتمل ومستلم',
      subEn: 'Delivered to client',
      subAr: 'تم استلام الثوب النهائي',
      statuses: ['COMPLETED'],
    },
  ];

  // Helper to determine the milestone index of a given status
  const getMilestoneIndex = (status: OrderStatus): number => {
    for (let i = 0; i < milestones.length; i++) {
      if (milestones[i].statuses.includes(status)) {
        return i;
      }
    }
    return 0;
  };

  const currentMilestoneIdx = isCancelled ? -1 : getMilestoneIndex(currentStatus);

  // Match timestamps from history to milestones
  const getMilestoneTimestamp = (milestone: MilestoneDef): string | null => {
    const matched = [...statusHistory]
      .reverse()
      .find((ev) => milestone.statuses.includes(ev.status));
    if (!matched) return null;
    try {
      const d = new Date(matched.timestamp);
      return d.toLocaleDateString(isRtl ? 'ar-SA' : 'en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E6E2DB] p-5 sm:p-7 shadow-xs space-y-6 text-start">
      {/* Timeline Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#F2EFE9]">
        <div>
          <h2 className="text-sm sm:text-base font-bold text-[#121316] font-display">
            {isRtl ? 'مراحل الحياكة والإنتاج الحرفي' : 'Sartorial Production Timeline'}
          </h2>
          <p className="text-xs text-[#8E8B85] mt-0.5">
            {isRtl
              ? 'متابعة حية ومباشرة لكل مرحلة من مراحل تفصيل ثوبك'
              : 'Live tracking across every stage of your bespoke garment crafting'}
          </p>
        </div>

        {estimatedCompletionDate && !isCancelled && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF4EB] border border-[#E5D2BA] text-xs font-semibold text-[#916F3E] shrink-0">
            <Clock className="w-3.5 h-3.5" />
            <span>
              {isRtl ? 'الموعد المتوقع:' : 'Est. Ready:'}{' '}
              {new Date(estimatedCompletionDate).toLocaleDateString(isRtl ? 'ar-SA' : 'en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
        )}
      </div>

      {isCancelled ? (
        <div className="p-4 rounded-xl bg-[#FEF2F2] border border-[#FECACA] flex items-start gap-3 text-start">
          <AlertCircle className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-[#991B1B]">
              {isRtl ? 'تم إلغاء هذا الطلب' : 'This Order Request Has Been Cancelled'}
            </h4>
            <p className="text-xs text-[#B91C1C] mt-0.5">
              {isRtl
                ? 'تم إيقاف مسار الحياكة بناءً على طلب الإلغاء.'
                : 'Production has been discontinued following the cancellation request.'}
            </p>
          </div>
        </div>
      ) : (
        /* Progress Stepper */
        <div className="relative py-2">
          {/* Desktop/Tablet Horizontal Stepper */}
          <div className="hidden lg:grid grid-cols-8 gap-2 relative">
            {/* Connecting bar */}
            <div className="absolute top-4 start-5 end-5 h-0.5 bg-[#E6E2DB] -z-0" />
            <div
              className="absolute top-4 start-5 h-0.5 bg-[#916F3E] transition-all duration-500 -z-0"
              style={{
                width: `${(currentMilestoneIdx / (milestones.length - 1)) * 100}%`,
              }}
            />

            {milestones.map((m, idx) => {
              const isPast = idx < currentMilestoneIdx;
              const isCurrent = idx === currentMilestoneIdx;
              const isFuture = idx > currentMilestoneIdx;
              const timestamp = getMilestoneTimestamp(m);

              return (
                <div key={m.key} className="flex flex-col items-center text-center relative z-10 px-1">
                  {/* Circle Indicator */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      isPast
                        ? 'bg-[#916F3E] border-[#916F3E] text-white shadow-xs'
                        : isCurrent
                        ? 'bg-white border-[#916F3E] text-[#916F3E] ring-4 ring-[#FAF4EB]'
                        : 'bg-white border-[#D1D5DB] text-[#9CA3AF]'
                    }`}
                  >
                    {isPast ? (
                      <Check className="w-4 h-4 stroke-[2.5]" />
                    ) : isCurrent ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#916F3E] animate-pulse" />
                    ) : (
                      <span className="text-[11px] font-bold">{idx + 1}</span>
                    )}
                  </div>

                  {/* Label */}
                  <div className="mt-2.5">
                    <span
                      className={`text-xs font-bold block ${
                        isCurrent
                          ? 'text-[#916F3E]'
                          : isPast
                          ? 'text-[#121316]'
                          : 'text-[#9CA3AF]'
                      }`}
                    >
                      {isRtl ? m.labelAr : m.labelEn}
                    </span>
                    <span className="text-[10px] text-[#8E8B85] block mt-0.5 line-clamp-1">
                      {isRtl ? m.subAr : m.subEn}
                    </span>
                    {timestamp && (
                      <span className="text-[9px] text-[#916F3E] font-medium block mt-1">
                        {timestamp}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Vertical Stepper */}
          <div className="lg:hidden space-y-4 relative ps-6">
            {/* Vertical connector line */}
            <div className="absolute top-2 bottom-2 start-2.5 w-0.5 bg-[#E6E2DB]" />

            {milestones.map((m, idx) => {
              const isPast = idx < currentMilestoneIdx;
              const isCurrent = idx === currentMilestoneIdx;
              const isFuture = idx > currentMilestoneIdx;
              const timestamp = getMilestoneTimestamp(m);

              return (
                <div key={m.key} className="relative flex items-start gap-3">
                  {/* Indicator */}
                  <div
                    className={`absolute -start-6 w-5 h-5 rounded-full flex items-center justify-center border-2 transition-all ${
                      isPast
                        ? 'bg-[#916F3E] border-[#916F3E] text-white'
                        : isCurrent
                        ? 'bg-white border-[#916F3E] text-[#916F3E] ring-2 ring-[#FAF4EB]'
                        : 'bg-white border-[#D1D5DB] text-[#9CA3AF]'
                    }`}
                  >
                    {isPast ? (
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    ) : isCurrent ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#916F3E]" />
                    ) : (
                      <span className="text-[9px]">{idx + 1}</span>
                    )}
                  </div>

                  {/* Text */}
                  <div className="pt-0.5">
                    <div className="flex items-baseline gap-2">
                      <span
                        className={`text-xs font-bold ${
                          isCurrent
                            ? 'text-[#916F3E]'
                            : isPast
                            ? 'text-[#121316]'
                            : 'text-[#9CA3AF]'
                        }`}
                      >
                        {isRtl ? m.labelAr : m.labelEn}
                      </span>
                      {timestamp && (
                        <span className="text-[10px] text-[#916F3E] font-medium">{timestamp}</span>
                      )}
                    </div>
                    <span className="text-[11px] text-[#8E8B85] block">
                      {isRtl ? m.subAr : m.subEn}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Status History & Note Stream */}
      {statusHistory.length > 0 && (
        <div className="pt-4 border-t border-[#F2EFE9]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8E8B85] mb-3">
            {isRtl ? 'سجل أحداث وتحديثات الطلب' : 'Status & Atelier Activity Log'}
          </h3>
          <div className="space-y-2.5">
            {[...statusHistory].reverse().map((ev, index) => {
              const dateStr = new Date(ev.timestamp).toLocaleString(isRtl ? 'ar-SA' : 'en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });
              const noteText = isRtl ? ev.noteAr || ev.note : ev.note || ev.noteAr;
              const actorText = isRtl ? ev.actorAr || ev.actor : ev.actor || ev.actorAr;

              return (
                <div
                  key={index}
                  className="flex items-start justify-between gap-3 p-3 rounded-xl bg-[#FAF9F6] border border-[#E6E2DB] text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#121316]">
                        {isRtl ? 'تحديث مرحلة العمل' : 'Status Update'}
                      </span>
                      {actorText && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#F2EFE9] text-[#65625D]">
                          {actorText}
                        </span>
                      )}
                    </div>
                    {noteText && <p className="text-[#4B5563] text-[11px] leading-relaxed">{noteText}</p>}
                  </div>
                  <span className="text-[10px] text-[#8E8B85] shrink-0 whitespace-nowrap">{dateStr}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
