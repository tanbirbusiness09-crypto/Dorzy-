import React from 'react';
import { AlertTriangle, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Modal } from './Modal';
import { Button } from './Button';
import { useLanguage } from '../../localization/LanguageContext';

export interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'primary';
  isLoading?: boolean;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText,
  cancelText,
  variant = 'danger',
  isLoading = false,
}) => {
  const { isRtl } = useLanguage();

  const getIcon = () => {
    switch (variant) {
      case 'danger':
        return <AlertCircle className="w-6 h-6 text-[#B42318]" />;
      case 'warning':
        return <AlertTriangle className="w-6 h-6 text-[#8A5814]" />;
      default:
        return <CheckCircle2 className="w-6 h-6 text-[#916F3E]" />;
    }
  };

  const defaultConfirmText = confirmText || (isRtl ? 'تأكيد الإجراء' : 'Confirm Action');
  const defaultCancelText = cancelText || (isRtl ? 'إلغاء' : 'Cancel');

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="md">
      <div className="flex items-start gap-4 text-start">
        <div className="w-12 h-12 rounded-xl bg-[#F5F3EF] border border-[#E6E2DB] flex items-center justify-center shrink-0">
          {getIcon()}
        </div>
        <div className="flex-1">
          <h3 className="text-base font-bold text-[#121316] mb-1">{title}</h3>
          <p className="text-xs sm:text-sm text-[#65625D] leading-relaxed mb-6">
            {description}
          </p>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#F2EFE9]">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              disabled={isLoading}
            >
              {defaultCancelText}
            </Button>

            <Button
              variant={variant === 'danger' ? 'danger' : variant === 'warning' ? 'gold' : 'primary'}
              size="sm"
              onClick={onConfirm}
              isLoading={isLoading}
            >
              {defaultConfirmText}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
