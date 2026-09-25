import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../../localization/LanguageContext';

export const LanguageSwitcher: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      aria-label="Switch language / تغيير اللغة"
      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold text-[#121316] hover:bg-[#F2EFE9] transition-colors border border-[#E6E2DB] bg-[#FFFFFF] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] ${className}`}
    >
      <Globe className="w-3.5 h-3.5 text-[#916F3E]" />
      <span>{language === 'ar' ? 'English' : 'العربية'}</span>
    </button>
  );
};
