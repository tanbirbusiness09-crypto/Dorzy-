import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useLanguage } from '../../localization/LanguageContext';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export const Breadcrumb: React.FC<{ items: BreadcrumbItem[]; className?: string }> = ({
  items,
  className = '',
}) => {
  const { isRtl } = useLanguage();
  const Separator = isRtl ? ChevronLeft : ChevronRight;

  return (
    <nav aria-label="Breadcrumb" className={`flex items-center text-xs text-[#8E8B85] ${className}`}>
      <ol className="flex items-center space-x-1.5 space-x-reverse">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="inline-flex items-center gap-1.5">
              {index > 0 && <Separator className="w-3.5 h-3.5 text-[#B8B4AC] shrink-0" />}
              {isLast ? (
                <span className="font-medium text-[#121316] truncate max-w-[200px]" aria-current="page">
                  {item.label}
                </span>
              ) : item.onClick ? (
                <button
                  onClick={item.onClick}
                  className="hover:text-[#121316] transition-colors cursor-pointer truncate max-w-[150px]"
                >
                  {item.label}
                </button>
              ) : (
                <a href={item.href || '#'} className="hover:text-[#121316] transition-colors truncate max-w-[150px]">
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
