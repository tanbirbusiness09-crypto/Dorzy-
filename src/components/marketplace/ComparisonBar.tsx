import React from 'react';
import { Scale, X, ArrowRight, ArrowLeft } from 'lucide-react';
import { Shop } from '../../types';
import { useLanguage } from '../../localization/LanguageContext';
import { Button } from '../ui/Button';

export interface ComparisonBarProps {
  selectedShops: Shop[];
  onRemoveShop: (shopId: string) => void;
  onClearAll: () => void;
  onCompareNow: () => void;
  className?: string;
}

export const ComparisonBar: React.FC<ComparisonBarProps> = ({
  selectedShops,
  onRemoveShop,
  onClearAll,
  onCompareNow,
  className = '',
}) => {
  const { isRtl } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  if (selectedShops.length === 0) return null;

  return (
    <div
      aria-label="Shop comparison selection bar"
      className={`fixed bottom-0 inset-x-0 z-40 bg-[#121316] text-[#FAF9F6] border-t border-[#24262E] shadow-2xl py-3 px-4 sm:px-6 transition-all duration-300 animate-in slide-in-from-bottom-5 ${className}`}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Left Count & Selected Shops Chips */}
        <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto no-scrollbar py-1">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-[#C5A880]/20 text-[#C5A880] flex items-center justify-center font-bold">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">
                {isRtl ? `مقارنة المشاغل (${selectedShops.length}/3)` : `Compare Ateliers (${selectedShops.length}/3)`}
              </span>
              <span className="text-[10px] text-[#A8A49D]">
                {selectedShops.length < 3
                  ? isRtl
                    ? `يمكنك إضافة ${3 - selectedShops.length} مشاغل أخرى`
                    : `Add ${3 - selectedShops.length} more`
                  : isRtl
                  ? 'الحد الأقصى للمقارنة'
                  : 'Max 3 selected'}
              </span>
            </div>
          </div>

          <div className="h-6 w-px bg-[#24262E] hidden sm:block shrink-0" />

          {/* Selected Shop Chips */}
          <div className="flex items-center gap-2 shrink-0">
            {selectedShops.map((shop) => (
              <div
                key={shop.id}
                className="flex items-center gap-2 bg-[#24262E] border border-[#3D404D] px-2.5 py-1 rounded-lg text-xs"
              >
                <span className="max-w-[120px] truncate text-[#FAF9F6]">
                  {isRtl ? shop.nameAr : shop.name}
                </span>
                <button
                  type="button"
                  onClick={() => onRemoveShop(shop.id)}
                  aria-label={`Remove ${shop.name} from compare`}
                  className="text-[#8E8B85] hover:text-white p-0.5 rounded transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0">
          <button
            type="button"
            onClick={onClearAll}
            className="text-xs text-[#8E8B85] hover:text-white px-2 py-1 underline transition-colors cursor-pointer"
          >
            {isRtl ? 'مسح الكل' : 'Clear All'}
          </button>

          <Button
            variant="gold"
            size="sm"
            onClick={onCompareNow}
            icon={<ArrowIcon className="w-3.5 h-3.5" />}
            iconPosition="right"
          >
            {isRtl ? 'قارن الآن' : 'Compare Now'}
          </Button>
        </div>
      </div>
    </div>
  );
};
