import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../localization/LanguageContext';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}) => {
  const { isRtl } = useLanguage();
  const PrevIcon = isRtl ? ChevronRight : ChevronLeft;
  const NextIcon = isRtl ? ChevronLeft : ChevronRight;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Pagination"
      className={`inline-flex items-center gap-1 p-1 bg-[#F5F3EF] border border-[#E6E2DB] rounded-lg ${className}`}
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Previous Page"
        className="p-1.5 rounded-md text-[#121316] hover:bg-[#EDEAE3] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
      >
        <PrevIcon className="w-4 h-4" />
      </button>

      {pages.map((p) => {
        const isCurrent = p === currentPage;
        return (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            aria-current={isCurrent ? 'page' : undefined}
            className={`min-w-[32px] h-8 text-xs font-semibold tabular-nums rounded-md transition-colors cursor-pointer ${
              isCurrent
                ? 'bg-[#121316] text-[#FAF9F6]'
                : 'text-[#65625D] hover:bg-[#EDEAE3] hover:text-[#121316]'
            }`}
          >
            {p}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Next Page"
        className="p-1.5 rounded-md text-[#121316] hover:bg-[#EDEAE3] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
      >
        <NextIcon className="w-4 h-4" />
      </button>
    </nav>
  );
};
