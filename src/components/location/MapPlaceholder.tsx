import React, { useState } from 'react';
import { MapPin, Navigation, Compass, Layers } from 'lucide-react';
import { useLanguage } from '../../localization/LanguageContext';

export interface MapPlaceholderProps {
  title: string;
  address: string;
  city: string;
  district: string;
  lat?: number;
  lng?: number;
  distanceKm?: number;
  className?: string;
  onGetDirections?: () => void;
}

export const MapPlaceholder: React.FC<MapPlaceholderProps> = ({
  title,
  address,
  city,
  district,
  lat = 24.7136,
  lng = 46.6753,
  distanceKm = 2.4,
  className = '',
  onGetDirections,
}) => {
  const { t } = useLanguage();
  const [isCopied, setIsCopied] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const handleCopyCoordinates = () => {
    navigator.clipboard?.writeText(`${lat}, ${lng}`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDirections = () => {
    setIsNavigating(true);
    if (onGetDirections) {
      onGetDirections();
    }
    setTimeout(() => setIsNavigating(false), 2500);
  };

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-[#E6E2DB] bg-[#F5F3EF] flex flex-col justify-between ${className}`}
    >
      {/* Visual Cartographic Grid Motif (Sand & Charcoal) */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#24262E" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          {/* Subtle architectural contour lines */}
          <path
            d="M 0 100 Q 150 40 300 120 T 600 80"
            fill="none"
            stroke="#916F3E"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
        </svg>
      </div>

      {/* Top Bar inside Map */}
      <div className="relative p-4 flex items-center justify-between z-10">
        <div className="bg-[#FFFFFF]/90 backdrop-blur-xs px-2.5 py-1 rounded-md border border-[#E6E2DB] text-xs font-medium text-[#121316] flex items-center gap-1.5 shadow-xs">
          <Compass className="w-3.5 h-3.5 text-[#916F3E]" />
          <span>
            {city}, {district}
          </span>
        </div>

        <div className="flex items-center gap-1 bg-[#FFFFFF]/90 backdrop-blur-xs p-1 rounded-md border border-[#E6E2DB]">
          <button
            onClick={handleCopyCoordinates}
            title="Copy coordinates"
            className="px-2 py-0.5 text-[11px] font-mono tabular-nums text-[#65625D] hover:text-[#121316] transition-colors"
          >
            {isCopied ? 'Copied' : `${lat.toFixed(4)}, ${lng.toFixed(4)}`}
          </button>
        </div>
      </div>

      {/* Central Marker */}
      <div className="relative my-6 flex flex-col items-center justify-center z-10">
        <div className="relative flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-[#C5A880]/20 animate-ping absolute" />
          <div className="w-10 h-10 rounded-full bg-[#121316] text-[#FAF9F6] border-2 border-[#FAF9F6] shadow-lg flex items-center justify-center z-10">
            <MapPin className="w-5 h-5 text-[#C5A880]" />
          </div>
        </div>
        <div className="mt-2 bg-[#FFFFFF]/95 px-3 py-1 rounded-md border border-[#E6E2DB] text-xs font-semibold text-[#121316] shadow-sm">
          {title}
        </div>
      </div>

      {/* Bottom Detail Strip */}
      <div className="relative bg-[#FFFFFF] border-t border-[#E6E2DB] p-3.5 flex flex-wrap items-center justify-between gap-3 z-10 text-start">
        <div className="min-w-[180px]">
          <p className="text-xs font-medium text-[#121316] truncate">{address}</p>
          <p className="text-[11px] text-[#8E8B85] mt-0.5">
            {distanceKm} {t.common.kmAway} · {t.trust.verifiedLocation}
          </p>
        </div>
        <button
          type="button"
          onClick={handleDirections}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#121316] text-[#FAF9F6] text-xs font-medium rounded-md hover:bg-[#24262E] transition-colors cursor-pointer"
        >
          <Navigation className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>{isNavigating ? 'Routing...' : 'Get Directions'}</span>
        </button>
      </div>
    </div>
  );
};
