import React from 'react';
import { Button } from './Button';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-xl border border-dashed border-[#D4D0C7] bg-[#FFFFFF]/60 ${className}`}
    >
      {icon && (
        <div className="w-12 h-12 rounded-full bg-[#F5F3EF] border border-[#E6E2DB] flex items-center justify-center text-[#8E8B85] mb-3">
          {icon}
        </div>
      )}
      <h3 className="text-base font-semibold text-[#121316] mb-1">{title}</h3>
      <p className="text-xs sm:text-sm text-[#65625D] max-w-sm mb-4 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
