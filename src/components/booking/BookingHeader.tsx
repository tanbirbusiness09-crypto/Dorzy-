import React from 'react';
import { ChevronLeft, ChevronRight, X, Sparkles, Scissors } from 'lucide-react';
import { useLanguage } from '../../localization/LanguageContext';

export interface BookingHeaderProps {
  currentStep: number;
  totalSteps?: number;
  onPrevStep?: () => void;
  onRequestExit?: () => void;
  title?: string;
  subtitle?: string;
}

export const BookingHeader: React.FC<BookingHeaderProps> = ({
  currentStep,
  totalSteps = 7,
  onPrevStep,
  onRequestExit,
  title,
  subtitle,
}) => {
  const { t, isRtl } = useLanguage();
  const ChevronBack = isRtl ? ChevronRight : ChevronLeft;

  const stepNames: Record<number, string> = {
    1: t.booking.step1,
    2: t.booking.step2,
    3: t.booking.step3,
    4: t.booking.step4,
    5: t.booking.step5,
    6: t.booking.step6,
    7: t.booking.step7,
  };

  const currentStepName = stepNames[currentStep] || t.booking.step1;
  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  return (
    <header className="sticky top-0 z-40 bg-[#121316] text-[#FAF9F6] border-b border-[#24262E] shadow-sm select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand & Back */}
        <div className="flex items-center gap-3">
          {currentStep > 1 && onPrevStep && (
            <button
              type="button"
              onClick={onPrevStep}
              className="p-2 rounded-lg bg-[#24262E] hover:bg-[#2D303B] text-[#FAF9F6] border border-[#3D404D] transition-colors cursor-pointer flex items-center justify-center"
              aria-label={t.common.back}
            >
              <ChevronBack className="w-4 h-4" />
            </button>
          )}

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#C5A880]/15 border border-[#C5A880]/40 flex items-center justify-center text-[#C5A880]">
              <Scissors className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-sm sm:text-base tracking-wide text-[#FAF9F6]">
                  {t.common.appName}
                </span>
                <span className="text-[#C5A880] text-xs font-semibold px-1.5 py-0.5 rounded bg-[#C5A880]/10 border border-[#C5A880]/30 hidden sm:inline-block">
                  {t.booking.headerSubtitle}
                </span>
              </div>
              <p className="text-[11px] text-[#A8A49D] hidden md:block">
                {title || t.booking.headerTitle}
              </p>
            </div>
          </div>
        </div>

        {/* Center: Current Step Status */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 text-xs font-medium">
            <span className="text-[#C5A880]">
              {t.booking.stepIndicator} {currentStep} {t.booking.of} {totalSteps}
            </span>
            <span className="text-[#3D404D]">·</span>
            <span className="text-[#FAF9F6] font-semibold">{currentStepName}</span>
          </div>
          {/* Progress track */}
          <div className="w-28 sm:w-44 h-1.5 bg-[#24262E] rounded-full overflow-hidden mt-1 border border-[#3D404D]/50">
            <div
              className="h-full bg-gradient-to-r from-[#916F3E] via-[#C5A880] to-[#E5D2BA] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Right: Exit / Cancel Button */}
        <div className="flex items-center gap-2">
          {onRequestExit && (
            <button
              type="button"
              onClick={onRequestExit}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#24262E] hover:bg-[#2D303B] text-[#A8A49D] hover:text-[#FAF9F6] border border-[#3D404D] text-xs transition-colors cursor-pointer"
              aria-label={t.booking.leaveBooking}
            >
              <X className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.booking.leaveBooking}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
