import React from 'react';
import { AlertCircle, X } from 'lucide-react';
import { useLanguage } from '../../localization/LanguageContext';
import { Button } from '../ui/Button';

export interface BookingExitDialogProps {
  isOpen: boolean;
  onContinue: () => void;
  onConfirmExit: () => void;
}

export const BookingExitDialog: React.FC<BookingExitDialogProps> = ({
  isOpen,
  onContinue,
  onConfirmExit,
}) => {
  const { t, isRtl } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none">
      <div className="bg-white rounded-2xl border border-[#E6E2DB] max-w-md w-full p-6 text-start space-y-4 shadow-xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-[#FAF4EB] border border-[#E5D2BA] text-[#916F3E] flex items-center justify-center shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#121316]">
              {t.booking.leaveTitle}
            </h2>
            <p className="text-xs text-[#65625D] mt-1 leading-relaxed">
              {t.booking.leaveMessage}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#F2EFE9]">
          <Button
            variant="outline"
            size="sm"
            onClick={onConfirmExit}
            className="text-xs text-[#D32F2F] hover:bg-[#FFEBEE] border-[#FFCDD2]"
          >
            {t.booking.leaveBooking}
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={onContinue}
            className="text-xs"
          >
            {t.booking.stayInBooking}
          </Button>
        </div>
      </div>
    </div>
  );
};
