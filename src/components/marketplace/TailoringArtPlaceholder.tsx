import React from 'react';

export type ArtTheme = 'thobe' | 'atelier' | 'tailor' | 'dagla' | 'bisht' | 'fabric';

export interface TailoringArtProps {
  theme?: ArtTheme;
  title?: string;
  subtitle?: string;
  aspectRatio?: '16:9' | '4:3' | '1:1' | '3:4';
  className?: string;
}

export const TailoringArt: React.FC<TailoringArtProps> = ({
  theme = 'thobe',
  title,
  subtitle,
  aspectRatio = '4:3',
  className = '',
}) => {
  const aspectClass = {
    '16:9': 'aspect-video',
    '4:3': 'aspect-4/3',
    '1:1': 'aspect-square',
    '3:4': 'aspect-3/4',
  }[aspectRatio];

  const renderIcon = () => {
    switch (theme) {
      case 'thobe':
        return (
          // Crisp Saudi royal collar & mother of pearl buttons vector
          <svg className="w-16 h-16 text-[#C5A880]" viewBox="0 0 64 64" fill="none">
            <path
              d="M16 12L32 18L48 12V22L32 28L16 22V12Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M32 28V56"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="2 3"
            />
            <circle cx="32" cy="34" r="1.5" fill="currentColor" />
            <circle cx="32" cy="42" r="1.5" fill="currentColor" />
            <circle cx="32" cy="50" r="1.5" fill="currentColor" />
            <path d="M22 28H14V44" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          </svg>
        );
      case 'atelier':
        // High-end salon archway & fabric bolts
        <svg className="w-16 h-16 text-[#C5A880]" viewBox="0 0 64 64" fill="none">
          <rect x="12" y="16" width="40" height="36" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M20 52V30C20 23.3726 25.3726 18 32 18C38.6274 18 44 23.3726 44 30V52" stroke="currentColor" strokeWidth="1.5" />
          <line x1="12" y1="26" x2="52" y2="26" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        </svg>;
      case 'tailor':
        // Artisan tailor shears & measuring tape
        return (
          <svg className="w-16 h-16 text-[#C5A880]" viewBox="0 0 64 64" fill="none">
            <circle cx="22" cy="46" r="6" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="42" cy="46" r="6" stroke="currentColor" strokeWidth="1.5" />
            <path d="M26 42L44 16M38 42L20 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="32" cy="32" r="2" fill="currentColor" />
          </svg>
        );
      case 'dagla':
      case 'bisht':
        // Royal Zari embroidery pattern
        return (
          <svg className="w-16 h-16 text-[#C5A880]" viewBox="0 0 64 64" fill="none">
            <path d="M32 10L42 24H22L32 10Z" stroke="currentColor" strokeWidth="1.5" />
            <path d="M32 24L48 46H16L32 24Z" stroke="currentColor" strokeWidth="1.5" />
            <line x1="32" y1="46" x2="32" y2="56" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="32" cy="18" r="1.5" fill="currentColor" />
          </svg>
        );
      default:
        return (
          <svg className="w-16 h-16 text-[#C5A880]" viewBox="0 0 64 64" fill="none">
            <rect x="16" y="16" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="1.5" />
            <line x1="16" y1="28" x2="48" y2="28" stroke="currentColor" strokeWidth="1" />
            <line x1="16" y1="40" x2="48" y2="40" stroke="currentColor" strokeWidth="1" />
          </svg>
        );
    }
  };

  return (
    <div
      className={`relative overflow-hidden w-full ${aspectClass} bg-gradient-to-b from-[#1E2027] to-[#121316] text-[#FAF9F6] flex flex-col items-center justify-center p-6 text-center select-none ${className}`}
    >
      {/* Subtle sartorial grid background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="tailor-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#FFFFFF" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#tailor-grid)" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="p-3 rounded-full bg-[#FAF9F6]/5 border border-[#FAF9F6]/10 mb-3 backdrop-blur-xs">
          {renderIcon()}
        </div>
        {title && (
          <h4 className="text-sm font-semibold text-[#FAF9F6] tracking-wide line-clamp-1 max-w-[85%]">
            {title}
          </h4>
        )}
        {subtitle && (
          <p className="text-xs text-[#C5A880] mt-1 font-light tracking-wide line-clamp-1 max-w-[80%]">
            {subtitle}
          </p>
        )}
      </div>

      {/* Subtle luxury gold corner brackets */}
      <div className="absolute top-2 start-2 w-3 h-3 border-t border-s border-[#C5A880]/40 pointer-events-none" />
      <div className="absolute bottom-2 end-2 w-3 h-3 border-b border-e border-[#C5A880]/40 pointer-events-none" />
    </div>
  );
};
