import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../../localization/LanguageContext';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, title, children }) => {
  const { isRtl } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#121316]/50 transition-opacity duration-200"
      />

      <div className={`fixed inset-y-0 ${isRtl ? 'left-0' : 'right-0'} max-w-full flex`}>
        <div className="w-screen max-w-md bg-[#FAF9F6] border-s border-[#E6E2DB] shadow-2xl flex flex-col p-6 z-10 text-start">
          <div className="flex items-center justify-between pb-4 border-b border-[#E6E2DB]">
            {title ? <h2 className="text-lg font-bold text-[#121316]">{title}</h2> : <div />}
            <button
              onClick={onClose}
              aria-label="Close"
              className="p-1.5 text-[#8E8B85] hover:text-[#121316] rounded-md transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto py-4">{children}</div>
        </div>
      </div>
    </div>
  );
};
