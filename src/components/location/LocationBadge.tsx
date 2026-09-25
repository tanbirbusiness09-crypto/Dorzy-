import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { useLanguage } from '../../localization/LanguageContext';

export interface LocationBadgeProps {
  city: string;
  district?: string;
  distanceKm?: number;
  showIcon?: boolean;
  className?: string;
}

export const LocationBadge: React.FC<LocationBadgeProps> = ({
  city,
  district,
  distanceKm,
  showIcon = true,
  className = '',
}) => {
  const { t } = useLanguage();

  return (
    <div className={`inline-flex items-center gap-1.5 text-xs text-[#65625D] ${className}`}>
      {showIcon && <MapPin className="w-3.5 h-3.5 text-[#8E8B85] shrink-0" />}
      <span className="font-medium text-[#121316]">{city}</span>
      {district && (
        <>
          <span className="text-[#D4D0C7]">·</span>
          <span>{district}</span>
        </>
      )}
      {typeof distanceKm === 'number' && (
        <>
          <span className="text-[#D4D0C7]">·</span>
          <span className="tabular-nums text-[#8E8B85] inline-flex items-center gap-1">
            <Navigation className="w-3 h-3 text-[#916F3E] inline" />
            {distanceKm} {t.common.kmAway}
          </span>
        </>
      )}
    </div>
  );
};
