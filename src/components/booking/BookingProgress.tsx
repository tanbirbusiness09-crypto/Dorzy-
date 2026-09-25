import React from 'react';
import { Check, ChevronRight, ChevronLeft } from 'lucide-react';
import { useLanguage } from '../../localization/LanguageContext';

export interface BookingProgressProps {
  currentStep: number;
  totalSteps?: number;
  onStepClick?: (step: number) => void;
  requiresFabric?: boolean;
  requiresMeasurement?: boolean;
}

export const BookingProgress: React.FC<BookingProgressProps> = ({
  currentStep,
  totalSteps = 7,
  onStepClick,
  requiresFabric = true,
  requiresMeasurement = true,
}) => {
  const { t, isRtl } = useLanguage();
  const Chevron = isRtl ? ChevronLeft : ChevronRight;

  const steps = [
    { number: 1, label: t.booking.step1 },
    { number: 2, label: t.booking.step2 },
    { number: 3, label: t.booking.step3, disabled: !requiresFabric },
    { number: 4, label: t.booking.step4, disabled: !requiresMeasurement },
    { number: 5, label: t.booking.step5 },
    { number: 6, label: t.booking.step6 },
    { number: 7, label: t.booking.step7 },
  ];

  return (
    <nav
      aria-label="Order steps"
      className="bg-[#FFFFFF] border-b border-[#E6E2DB] shadow-2xs py-3 px-4 sm:px-6 lg:px-8 select-none overflow-x-auto scrollbar-none"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between min-w-[620px] sm:min-w-0">
        {steps.map((step, idx) => {
          const isCurrent = step.number === currentStep;
          const isCompleted = step.number < currentStep;
          const isUpcoming = step.number > currentStep;
          const isClickable = isCompleted && onStepClick && !step.disabled;

          return (
            <React.Fragment key={step.number}>
              <button
                type="button"
                disabled={!isClickable}
                onClick={() => isClickable && onStepClick(step.number)}
                className={`flex items-center gap-2 text-xs font-medium transition-all ${
                  isCurrent
                    ? 'text-[#121316] font-bold'
                    : isCompleted
                    ? 'text-[#65625D] hover:text-[#121316] cursor-pointer'
                    : 'text-[#8E8B85] opacity-60 cursor-not-allowed'
                }`}
              >
                {/* Step indicator circle */}
                <div
                  className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-mono font-semibold transition-all shrink-0 ${
                    isCurrent
                      ? 'bg-[#121316] text-[#FAF9F6] ring-2 ring-[#C5A880] ring-offset-1'
                      : isCompleted
                      ? 'bg-[#C5A880] text-[#121316]'
                      : 'bg-[#F2EFE9] text-[#8E8B85] border border-[#E6E2DB]'
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : step.number}
                </div>

                <span
                  className={`whitespace-nowrap ${
                    isCurrent ? 'underline decoration-[#C5A880] decoration-2 underline-offset-4' : ''
                  }`}
                >
                  {step.label}
                  {step.disabled && <span className="text-[10px] text-[#8E8B85] ms-1">({isRtl ? 'غير مطلوب' : 'N/A'})</span>}
                </span>
              </button>

              {idx < steps.length - 1 && (
                <div className="flex-1 px-2 flex items-center justify-center">
                  <div
                    className={`h-[2px] w-full max-w-[40px] rounded transition-colors ${
                      step.number < currentStep ? 'bg-[#C5A880]' : 'bg-[#E6E2DB]'
                    }`}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};
