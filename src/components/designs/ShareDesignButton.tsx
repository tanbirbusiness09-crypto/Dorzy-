import React, { useState } from 'react';
import { Share2, Check, Copy, MessageCircle, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../localization/LanguageContext';
import { useToast } from '../feedback/Toast';

export interface ShareDesignButtonProps {
  slug: string;
  title: string;
  variant?: 'icon' | 'button';
  className?: string;
}

export const ShareDesignButton: React.FC<ShareDesignButtonProps> = ({
  slug,
  title,
  variant = 'icon',
  className = '',
}) => {
  const { isRtl } = useLanguage();
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getShareUrl = () => `${window.location.origin}/designs/${slug}`;

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = getShareUrl();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        showToast({
          type: 'success',
          title: isRtl ? 'تم نسخ الرابط' : 'Link Copied',
          description: isRtl ? 'رابط التصميم جاهز للمشاركة' : 'Design link copied to clipboard',
        });
      });
    }
    setDropdownOpen(false);
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = encodeURIComponent(
      `${title}\n${isRtl ? 'تصميم خياطة فاخر عبر منصة خيّاط:' : 'Bespoke tailoring design on Khayyat:'}\n${getShareUrl()}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
    setDropdownOpen(false);
  };

  const handleNativeShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: isRtl ? 'شاهد هذا التصميم على منصة خيّاط' : 'Explore this bespoke design on Khayyat',
          url: getShareUrl(),
        });
      } catch {
        // User cancelled or failed
      }
    } else {
      handleCopy(e);
    }
    setDropdownOpen(false);
  };

  return (
    <div className="relative inline-block">
      {variant === 'button' ? (
        <button
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className={`flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-[#E6E2DB] bg-white text-[#65625D] hover:text-[#121316] hover:border-[#C5A880] transition-colors cursor-pointer ${className}`}
        >
          {copied ? <Check className="w-4 h-4 text-[#1E5638]" /> : <Share2 className="w-4 h-4" />}
          <span>{copied ? (isRtl ? 'تم النسخ!' : 'Copied!') : isRtl ? 'مشاركة' : 'Share'}</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          title={isRtl ? 'مشاركة التصميم' : 'Share design'}
          aria-label="Share design"
          className={`p-2 rounded-lg backdrop-blur-md transition-all cursor-pointer shadow-xs ${
            copied
              ? 'bg-[#1E5638] text-white'
              : 'bg-[#121316]/75 text-[#FAF9F6] hover:bg-[#121316]'
          } ${className}`}
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
        </button>
      )}

      {/* Share Actions Dropdown Menu */}
      {dropdownOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={(e) => {
              e.stopPropagation();
              setDropdownOpen(false);
            }}
          />
          <div
            className="absolute end-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-[#E6E2DB] p-1.5 z-50 animate-in fade-in zoom-in-95 text-start"
            dir={isRtl ? 'rtl' : 'ltr'}
          >
            <button
              type="button"
              onClick={handleCopy}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[#121316] hover:bg-[#FAF9F6] rounded-lg transition-colors cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5 text-[#916F3E]" />
              <span>{isRtl ? 'نسخ رابط التصميم' : 'Copy Link'}</span>
            </button>

            <button
              type="button"
              onClick={handleWhatsApp}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[#121316] hover:bg-[#FAF9F6] rounded-lg transition-colors cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span>{isRtl ? 'مشاركة عبر واتساب' : 'Share via WhatsApp'}</span>
            </button>

            {'share' in navigator && (
              <button
                type="button"
                onClick={handleNativeShare}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[#121316] hover:bg-[#FAF9F6] rounded-lg transition-colors cursor-pointer border-t border-[#F2EFE9] mt-1 pt-1"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#65625D]" />
                <span>{isRtl ? 'المزيد من الخيارات' : 'More Options...'}</span>
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};
