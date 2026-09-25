import React, { useEffect } from 'react';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../localization/LanguageContext';
import { DesignMedia } from '../../types';

export interface DesignLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  mediaList: DesignMedia[];
  initialIndex?: number;
  title: string;
}

export const DesignLightbox: React.FC<DesignLightboxProps> = ({
  isOpen,
  onClose,
  mediaList,
  initialIndex = 0,
  title,
}) => {
  const { isRtl } = useLanguage();
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  // Keyboard navigation & escape listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev < mediaList.length - 1 ? prev + 1 : 0));
      }
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : mediaList.length - 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, mediaList.length, onClose]);

  if (!isOpen || mediaList.length === 0) return null;

  const currentMedia = mediaList[currentIndex] || mediaList[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image Lightbox"
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-4 select-none animate-in fade-in duration-200"
    >
      {/* Top Bar with Title and Close Button */}
      <div className="w-full max-w-5xl flex items-center justify-between text-[#FAF9F6] py-2 border-b border-white/10">
        <div>
          <h3 className="font-display font-bold text-base sm:text-lg">{title}</h3>
          <span className="text-xs text-[#A8A49D]">
            {currentIndex + 1} / {mediaList.length}
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close Lightbox"
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image Viewport */}
      <div className="relative flex-1 w-full max-w-5xl flex items-center justify-center p-2 my-2 overflow-hidden">
        {mediaList.length > 1 && (
          <button
            type="button"
            onClick={() =>
              setCurrentIndex((prev) => (prev > 0 ? prev - 1 : mediaList.length - 1))
            }
            aria-label="Previous Image"
            className="absolute start-2 p-3 rounded-full bg-[#121316]/80 text-white hover:bg-[#121316] transition-colors cursor-pointer z-10"
          >
            {isRtl ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        )}

        <img
          src={currentMedia.url}
          alt={currentMedia.alt || title}
          className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl transition-all duration-300"
        />

        {mediaList.length > 1 && (
          <button
            type="button"
            onClick={() =>
              setCurrentIndex((prev) => (prev < mediaList.length - 1 ? prev + 1 : 0))
            }
            aria-label="Next Image"
            className="absolute end-2 p-3 rounded-full bg-[#121316]/80 text-white hover:bg-[#121316] transition-colors cursor-pointer z-10"
          >
            {isRtl ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
        )}
      </div>

      {/* Bottom Thumbnail Strip */}
      {mediaList.length > 1 && (
        <div className="w-full max-w-xl flex items-center justify-center gap-2 overflow-x-auto py-2">
          {mediaList.map((m, idx) => (
            <button
              key={m.id || idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`w-14 h-11 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                currentIndex === idx ? 'border-[#C5A880] scale-105' : 'border-white/20 opacity-60'
              }`}
            >
              <img src={m.url} alt={m.alt} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
