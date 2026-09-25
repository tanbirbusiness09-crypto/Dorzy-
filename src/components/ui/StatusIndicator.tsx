import React from 'react';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export type StatusType = 'success' | 'warning' | 'neutral' | 'open' | 'closed';

export interface StatusIndicatorProps {
  status: StatusType;
  label: string;
  size?: 'sm' | 'md';
  className?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  label,
  size = 'md',
  className = '',
}) => {
  const getIcon = () => {
    switch (status) {
      case 'success':
      case 'open':
        return <CheckCircle2 className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />;
      case 'warning':
        return <Clock className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />;
      case 'closed':
      default:
        return <AlertCircle className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />;
    }
  };

  const getStyles = () => {
    switch (status) {
      case 'open':
      case 'success':
        return 'text-[#1E5638] bg-[#F2F7F4] border-[#CDE3D5]';
      case 'warning':
        return 'text-[#8A5814] bg-[#FBF6EE] border-[#ECD8B6]';
      case 'closed':
        return 'text-[#7A271A] bg-[#FDF3F2] border-[#F8CFCB]';
      case 'neutral':
      default:
        return 'text-[#65625D] bg-[#F5F3EF] border-[#E6E2DB]';
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium border rounded-md leading-none whitespace-nowrap select-none ${
        size === 'sm' ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1'
      } ${getStyles()} ${className}`}
    >
      <span className="shrink-0">{getIcon()}</span>
      <span>{label}</span>
    </span>
  );
};
