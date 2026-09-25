import React, { useState } from 'react';
import { ArrowLeftRight, Scissors, Sparkles } from 'lucide-react';
import { useLanguage } from '../../localization/LanguageContext';

export interface BeforeAfterViewerProps {
  beforeUrl: string;
  afterUrl: string;
  beforeLabel?: string;
  afterLabel?: string;
  alterationType?: string;
  alt?: string;
  className?: string;
}

export const BeforeAfterViewer: React.FC<BeforeAfterViewerProps> = ({
  beforeUrl,
  afterUrl,
  beforeLabel = 'Before Alteration',
  afterLabel = 'After Alteration',
  alterationType,
  alt = 'Before and after alteration comparison',
  className = '',
}) => {
  const { isRtl } = useLanguage();
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 - 100
  const [activeTab, setActiveTab] = useState<'slider' | 'before' | 'after'>('slider');

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPos(Number(e.target.value));
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Header with Alteration Type & View Mode Selector */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        {alterationType ? (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#916F3E]">
            <Scissors className="w-3.5 h-3.5" />
            <span>{alterationType}</span>
          </div>
        ) : (
          <div className="text-xs font-semibold text-[#121316]">
            {isRtl ? 'مقارنة قبل وبعد التعديل' : 'Before & After Comparison'}
          </div>
        )}

        {/* View Toggle Tabs */}
        <div className="flex items-center p-0.5 bg-[#FAF9F6] border border-[#E6E2DB] rounded-lg text-[11px] font-medium">
          <button
            type="button"
            onClick={() => setActiveTab('slider')}
            className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
              activeTab === 'slider'
                ? 'bg-white text-[#121316] font-bold shadow-2xs'
                : 'text-[#65625D] hover:text-[#121316]'
            }`}
          >
            {isRtl ? 'شريط المقارنة' : 'Slider'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('before')}
            className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
              activeTab === 'before'
                ? 'bg-white text-[#121316] font-bold shadow-2xs'
                : 'text-[#65625D] hover:text-[#121316]'
            }`}
          >
            {isRtl ? 'قبل' : 'Before'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('after')}
            className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
              activeTab === 'after'
                ? 'bg-white text-[#121316] font-bold shadow-2xs'
                : 'text-[#65625D] hover:text-[#121316]'
            }`}
          >
            {isRtl ? 'بعد' : 'After'}
          </button>
        </div>
      </div>

      {/* Main Comparison Area */}
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[#D4D0C7] bg-[#121316] select-none shadow-md">
        {activeTab === 'before' ? (
          <div className="relative w-full h-full">
            <img src={beforeUrl} alt={`${alt} - Before`} className="w-full h-full object-cover" />
            <span className="absolute bottom-3 start-3 px-2.5 py-1 rounded bg-[#121316]/85 backdrop-blur-md text-[#FAF9F6] text-xs font-semibold">
              {beforeLabel}
            </span>
          </div>
        ) : activeTab === 'after' ? (
          <div className="relative w-full h-full">
            <img src={afterUrl} alt={`${alt} - After`} className="w-full h-full object-cover" />
            <span className="absolute bottom-3 start-3 px-2.5 py-1 rounded bg-[#1E5638]/90 backdrop-blur-md text-white text-xs font-semibold">
              {afterLabel}
            </span>
          </div>
        ) : (
          /* Interactive Split Slider */
          <div className="relative w-full h-full overflow-hidden">
            {/* Background Image: After */}
            <img
              src={afterUrl}
              alt={`${alt} - After`}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <span className="absolute bottom-3 end-3 px-2.5 py-1 rounded bg-[#1E5638]/90 backdrop-blur-md text-white text-[11px] font-semibold z-10 pointer-events-none">
              {afterLabel}
            </span>

            {/* Foreground Clipped Image: Before */}
            <div
              className="absolute inset-y-0 start-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <img
                src={beforeUrl}
                alt={`${alt} - Before`}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  minWidth: '100%',
                  width: '100%',
                }}
              />
              <span className="absolute bottom-3 start-3 px-2.5 py-1 rounded bg-[#121316]/85 backdrop-blur-md text-[#FAF9F6] text-[11px] font-semibold z-10 pointer-events-none">
                {beforeLabel}
              </span>
            </div>

            {/* Vertical Split Divider Line */}
            <div
              className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] pointer-events-none z-20"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-white text-[#121316] shadow-lg flex items-center justify-center border border-[#D4D0C7]">
                <ArrowLeftRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Transparent Range Input Slider */}
            <input
              type="range"
              min={0}
              max={100}
              value={sliderPos}
              onChange={handleSliderChange}
              aria-label="Drag to compare before and after alteration"
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30 m-0"
            />
          </div>
        )}
      </div>

      {/* Helper caption */}
      <div className="text-[11px] text-[#8E8B85] text-center">
        {isRtl
          ? 'اسحب المؤشر لليمين أو اليسار لمعاينة دقة التعديل على الثوب'
          : 'Drag the slider across the image to inspect precision tailoring adjustments'}
      </div>
    </div>
  );
};
