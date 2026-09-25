import React, { useState } from 'react';
import { Play, Maximize2, ShieldCheck, Clock } from 'lucide-react';
import { Design, DesignMedia } from '../../types';
import { useLanguage } from '../../localization/LanguageContext';
import { BeforeAfterViewer } from './BeforeAfterViewer';
import { DesignLightbox } from './DesignLightbox';

export interface DesignGalleryProps {
  design: Design;
  className?: string;
}

export const DesignGallery: React.FC<DesignGalleryProps> = ({ design, className = '' }) => {
  const { isRtl } = useLanguage();
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const mediaList = design.media && design.media.length > 0
    ? design.media
    : [
        {
          id: 'med_default',
          type: design.mediaType || 'image',
          url: design.primaryImage,
          alt: design.title,
        } as DesignMedia,
      ];

  const currentMedia = mediaList[activeMediaIndex] || mediaList[0];

  // If this item is a Before & After alteration
  const isBeforeAfter =
    currentMedia.type === 'beforeAfter' ||
    (design.mediaType === 'beforeAfter' && currentMedia.beforeUrl && currentMedia.afterUrl);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* 1. Main Media Stage */}
      {isBeforeAfter && currentMedia.beforeUrl && currentMedia.afterUrl ? (
        <BeforeAfterViewer
          beforeUrl={currentMedia.beforeUrl}
          afterUrl={currentMedia.afterUrl}
          beforeLabel={isRtl ? currentMedia.beforeLabelAr : currentMedia.beforeLabel}
          afterLabel={isRtl ? currentMedia.afterLabelAr : currentMedia.afterLabel}
          alterationType={isRtl ? currentMedia.alterationTypeAr : currentMedia.alterationType}
          alt={design.title}
        />
      ) : (
        <div className="relative aspect-[4/3] rounded-2xl bg-[#121316] overflow-hidden border border-[#D4D0C7] shadow-lg group select-none">
          {currentMedia.type === 'video' && isVideoPlaying ? (
            <div className="w-full h-full flex flex-col items-center justify-center bg-black text-white p-6 relative">
              <div className="text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-[#916F3E] text-white flex items-center justify-center mx-auto shadow-lg animate-pulse">
                  <Play className="w-6 h-6 fill-current ms-1" />
                </div>
                <div className="font-semibold text-sm">
                  {isRtl ? 'عرض فيديو الحرفية والتفصيل' : 'Simulating Tailoring Craft Video'}
                </div>
                <p className="text-xs text-[#8E8B85] max-w-sm">
                  {isRtl
                    ? 'مقطع استعراض نزلة الكتف وانسيابية القماش بحركة 360 درجة'
                    : '360° Drape and shoulder pitch review by master artisan'}
                </p>
                <button
                  type="button"
                  onClick={() => setIsVideoPlaying(false)}
                  className="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-xs font-semibold cursor-pointer"
                >
                  {isRtl ? 'إيقاف مؤقت' : 'Pause Video'}
                </button>
              </div>
            </div>
          ) : (
            <img
              src={currentMedia.url}
              alt={currentMedia.alt || design.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
            />
          )}

          {/* Video Play Trigger Overlay */}
          {currentMedia.type === 'video' && !isVideoPlaying && (
            <button
              type="button"
              onClick={() => setIsVideoPlaying(true)}
              className="absolute inset-0 flex items-center justify-center bg-black/35 hover:bg-black/25 transition-colors cursor-pointer group/btn"
            >
              <div className="w-16 h-16 rounded-full bg-[#121316]/90 border-2 border-[#C5A880] text-[#C5A880] flex items-center justify-center shadow-xl group-hover/btn:scale-110 group-hover/btn:bg-[#916F3E] group-hover/btn:text-white transition-all">
                <Play className="w-6 h-6 fill-current ms-1" />
              </div>
              {currentMedia.duration && (
                <span className="absolute bottom-4 end-4 bg-[#121316]/85 backdrop-blur-md text-[#FAF9F6] text-xs font-semibold px-2.5 py-1 rounded-md">
                  {currentMedia.duration}
                </span>
              )}
            </button>
          )}

          {/* Fullscreen Zoom Trigger */}
          <button
            type="button"
            onClick={() => setIsLightboxOpen(true)}
            title={isRtl ? 'تكبير الصورة' : 'Full Screen Zoom'}
            aria-label="Enlarge image"
            className="absolute top-4 end-4 p-2.5 rounded-xl bg-[#121316]/80 hover:bg-[#121316] text-[#FAF9F6] backdrop-blur-md transition-colors cursor-pointer shadow-md z-10"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          {/* Floating Badges */}
          <div className="absolute bottom-4 start-4 flex items-center gap-2 pointer-events-none">
            <span className="px-3 py-1 rounded-lg bg-[#121316]/85 backdrop-blur-md text-[#C5A880] text-xs font-semibold border border-[#C5A880]/30 shadow-md">
              {isRtl ? design.categoryAr : design.category}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-md text-[#121316] text-xs font-medium shadow-md">
              {isRtl ? design.styleAr : design.style}
            </span>
          </div>
        </div>
      )}

      {/* 2. Thumbnail Strip */}
      {mediaList.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1.5 no-scrollbar">
          {mediaList.map((m, idx) => (
            <button
              key={m.id || idx}
              type="button"
              onClick={() => {
                setActiveMediaIndex(idx);
                setIsVideoPlaying(false);
              }}
              className={`relative w-20 h-16 sm:w-24 sm:h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                activeMediaIndex === idx
                  ? 'border-[#916F3E] ring-2 ring-[#C5A880]/40 shadow-sm'
                  : 'border-[#E6E2DB] opacity-70 hover:opacity-100'
              }`}
            >
              <img src={m.thumbnail || m.url} alt={m.alt} className="w-full h-full object-cover" />
              {m.type === 'video' && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white">
                  <Play className="w-3.5 h-3.5 fill-current" />
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* 3. Craft Guarantee Banner */}
      <div className="p-4 bg-white rounded-xl border border-[#E6E2DB] shadow-xs flex items-center justify-between text-xs text-[#65625D]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
          <span className="font-semibold text-[#121316]">
            {isRtl ? 'حرفية معتمدة عبر المنصة' : 'Verified Tailoring Standard'}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-[#8E8B85]">
          <Clock className="w-3.5 h-3.5" />
          <span>
            {isRtl
              ? 'ضمان دقة أخذ القياس وجودة القماش الأصلي'
              : 'Fit accuracy & authentic imported cloth guarantee'}
          </span>
        </div>
      </div>

      {/* Lightbox Modal */}
      <DesignLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        mediaList={mediaList}
        initialIndex={activeMediaIndex}
        title={isRtl ? design.titleAr : design.title}
      />
    </div>
  );
};
