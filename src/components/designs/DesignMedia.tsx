import React, { useState } from 'react';
import { Play, ArrowLeftRight } from 'lucide-react';
import { Design } from '../../types';
import { TailoringArt } from '../marketplace/TailoringArtPlaceholder';

export interface DesignMediaProps {
  design: Design;
  aspectRatio?: '4:3' | '16:9' | '1:1';
  className?: string;
  showOverlayBadges?: boolean;
}

export const DesignMedia: React.FC<DesignMediaProps> = ({
  design,
  aspectRatio = '4:3',
  className = '',
  showOverlayBadges = true,
}) => {
  const [imageError, setImageError] = useState(false);

  const aspectClass = {
    '4:3': 'aspect-[4/3]',
    '16:9': 'aspect-video',
    '1:1': 'aspect-square',
  }[aspectRatio];

  const videoMedia = design.media.find((m) => m.type === 'video');
  const duration = videoMedia?.duration || '0:45';

  return (
    <div
      className={`relative ${aspectClass} bg-[#121316] overflow-hidden select-none ${className}`}
    >
      {design.primaryImage && !imageError ? (
        <img
          src={design.primaryImage}
          alt={design.title}
          loading="lazy"
          onError={() => setImageError(true)}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      ) : (
        <TailoringArt
          theme={
            design.category === 'Ceremonial Bisht'
              ? 'bisht'
              : design.category === 'Dagla' || design.category === 'Balto'
              ? 'dagla'
              : 'thobe'
          }
          title={design.title}
          subtitle={design.category}
          aspectRatio="4:3"
        />
      )}

      {/* Subtle Shadow Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#121316]/75 via-transparent to-black/20 pointer-events-none" />

      {/* Video Indicator */}
      {design.mediaType === 'video' && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-11 h-11 rounded-full bg-[#121316]/80 backdrop-blur-md border border-[#C5A880]/60 flex items-center justify-center text-[#C5A880] shadow-md group-hover:scale-110 group-hover:bg-[#916F3E] group-hover:text-white transition-all">
            <Play className="w-4 h-4 fill-current ms-0.5" />
          </div>
          {duration && (
            <span className="absolute bottom-3 end-3 bg-[#121316]/85 backdrop-blur-xs text-[#FAF9F6] text-[11px] font-semibold px-2 py-0.5 rounded-md">
              {duration}
            </span>
          )}
        </div>
      )}

      {/* Before / After Split Indicator */}
      {design.mediaType === 'beforeAfter' && (
        <div className="absolute top-3 end-3 pointer-events-none z-10">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#121316]/85 backdrop-blur-md text-[#C5A880] text-[10px] font-semibold border border-[#C5A880]/40 shadow-xs">
            <ArrowLeftRight className="w-3 h-3" />
            <span>Before / After</span>
          </span>
        </div>
      )}
    </div>
  );
};
