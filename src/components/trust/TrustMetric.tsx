import React from 'react';

export interface TrustMetricProps {
  label: string;
  value: string | number;
  suffix?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const TrustMetric: React.FC<TrustMetricProps> = ({
  label,
  value,
  suffix,
  icon,
  className = '',
}) => {
  return (
    <div className={`text-start ${className}`}>
      <div className="flex items-center gap-1.5 text-xs text-[#8E8B85] mb-0.5">
        {icon && <span className="text-[#916F3E] shrink-0">{icon}</span>}
        <span className="truncate">{label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-base sm:text-lg font-bold text-[#121316] tabular-nums tracking-tight">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </span>
        {suffix && <span className="text-xs text-[#65625D]">{suffix}</span>}
      </div>
    </div>
  );
};
