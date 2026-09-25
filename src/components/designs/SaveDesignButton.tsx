import React, { useState } from 'react';
import { Bookmark, Lock } from 'lucide-react';
import { useLanguage } from '../../localization/LanguageContext';
import { useToast } from '../feedback/Toast';

export interface SaveDesignButtonProps {
  designId: string;
  designTitle: string;
  initialSaved?: boolean;
  saveCount?: number;
  variant?: 'icon' | 'button';
  size?: 'sm' | 'md';
  className?: string;
  onSaveToggle?: (isSaved: boolean) => void;
}

export const SaveDesignButton: React.FC<SaveDesignButtonProps> = ({
  designId,
  designTitle,
  initialSaved = false,
  saveCount = 0,
  variant = 'icon',
  size = 'md',
  className = '',
  onSaveToggle,
}) => {
  const { isRtl } = useLanguage();
  const { showToast } = useToast();
  const [isSaved, setIsSaved] = useState(initialSaved);
  const [count, setCount] = useState(saveCount);
  const [showSignInPrompt, setShowSignInPrompt] = useState(false);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextSaved = !isSaved;
    setIsSaved(nextSaved);
    setCount((prev) => (nextSaved ? prev + 1 : Math.max(0, prev - 1)));
    onSaveToggle?.(nextSaved);

    if (nextSaved) {
      showToast({
        type: 'success',
        title: isRtl ? 'تم حفظ التصميم في مجموعتك' : 'Design Saved to Collection',
        description: designTitle,
      });
      // Show non-blocking hint for guest demo
      setShowSignInPrompt(true);
      setTimeout(() => setShowSignInPrompt(false), 4000);
    } else {
      showToast({
        type: 'info',
        title: isRtl ? 'تمت إزالة التصميم من المحفوظات' : 'Removed from Saved',
        description: designTitle,
      });
    }
  };

  if (variant === 'button') {
    return (
      <div className="relative inline-block">
        <button
          type="button"
          onClick={handleToggle}
          className={`flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
            isSaved
              ? 'bg-[#C5A880]/15 text-[#916F3E] border-[#C5A880] shadow-2xs'
              : 'bg-white text-[#65625D] border-[#E6E2DB] hover:border-[#C5A880] hover:text-[#121316]'
          } ${className}`}
        >
          <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          <span>
            {isSaved
              ? isRtl
                ? 'محفوظ'
                : 'Saved'
              : isRtl
              ? `حفظ (${count})`
              : `Save (${count})`}
          </span>
        </button>

        {showSignInPrompt && (
          <div className="absolute bottom-full mb-2 start-1/2 -translate-x-1/2 w-60 p-2.5 bg-[#121316] text-[#FAF9F6] text-[11px] rounded-lg shadow-xl z-50 animate-in fade-in pointer-events-none text-center">
            <div className="flex items-center justify-center gap-1.5 font-semibold text-[#C5A880] mb-0.5">
              <Lock className="w-3 h-3" />
              <span>{isRtl ? 'حفظ دائم في حسابك' : 'Permanent Collection'}</span>
            </div>
            <p className="text-[#A8A49D] text-[10px]">
              {isRtl
                ? 'تم الحفظ محلياً. سجّل دخولك لاحقاً لمزامنة تصاميمك عبر أجهزتك.'
                : 'Saved to local session. Sign in anytime to sync your collection across devices.'}
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={handleToggle}
        title={isSaved ? (isRtl ? 'محفوظ' : 'Saved') : isRtl ? 'حفظ التصميم' : 'Save Design'}
        aria-label="Save design to favorites"
        className={`p-2 rounded-lg backdrop-blur-md transition-all cursor-pointer shadow-xs ${
          isSaved
            ? 'bg-[#C5A880] text-[#121316] shadow-md font-bold'
            : 'bg-[#121316]/75 text-[#FAF9F6] hover:bg-[#121316]'
        } ${className}`}
      >
        <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
      </button>

      {showSignInPrompt && (
        <div className="absolute top-full mt-2 end-0 w-52 p-2 bg-[#121316] text-[#FAF9F6] text-[10px] rounded-lg shadow-xl z-50 text-start animate-in fade-in pointer-events-none">
          <span className="font-bold text-[#C5A880] block mb-0.5">
            {isRtl ? 'تم الحفظ في جهازك' : 'Saved locally'}
          </span>
          <span className="text-[#A8A49D]">
            {isRtl ? 'سجل دخولك لاحقاً لحفظ مجموعتك دائماً' : 'Sign in to sync your saved designs.'}
          </span>
        </div>
      )}
    </div>
  );
};
