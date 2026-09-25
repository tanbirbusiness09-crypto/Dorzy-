import React from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  onDismiss?: () => void;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  children,
  onDismiss,
  className = '',
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return {
          container: 'bg-[#F2F7F4] border-[#CDE3D5] text-[#1E5638]',
          icon: <CheckCircle2 className="w-4 h-4 text-[#1E5638] shrink-0 mt-0.5" />,
          title: 'text-[#1E5638]',
        };
      case 'warning':
        return {
          container: 'bg-[#FBF6EE] border-[#ECD8B6] text-[#8A5814]',
          icon: <AlertTriangle className="w-4 h-4 text-[#8A5814] shrink-0 mt-0.5" />,
          title: 'text-[#8A5814]',
        };
      case 'error':
        return {
          container: 'bg-[#FEF3F2] border-[#FECDCA] text-[#B42318]',
          icon: <AlertCircle className="w-4 h-4 text-[#B42318] shrink-0 mt-0.5" />,
          title: 'text-[#B42318]',
        };
      case 'info':
      default:
        return {
          container: 'bg-[#EFF8FF] border-[#B2DDFF] text-[#175CD3]',
          icon: <Info className="w-4 h-4 text-[#175CD3] shrink-0 mt-0.5" />,
          title: 'text-[#175CD3]',
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div
      role="alert"
      className={`p-4 rounded-xl border flex items-start justify-between gap-3 text-start ${styles.container} ${className}`}
    >
      <div className="flex items-start gap-3 flex-1">
        {styles.icon}
        <div className="flex-1">
          {title && <h5 className={`text-xs sm:text-sm font-bold mb-0.5 ${styles.title}`}>{title}</h5>}
          <div className="text-xs leading-relaxed opacity-95">{children}</div>
        </div>
      </div>

      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="Dismiss alert"
          className="p-1 rounded opacity-75 hover:opacity-100 transition-opacity cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
