import React from 'react';
import { useLanguage } from '../../localization/LanguageContext';
import { Drawer } from '../ui/Drawer';
import { Button } from '../ui/Button';
import { DesignFilters, DesignSearchState } from './DesignFilters';

export interface DesignFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: DesignSearchState;
  onChange: (filters: DesignSearchState) => void;
  onReset: () => void;
  activeCount: number;
  totalResultsCount: number;
}

export const DesignFilterDrawer: React.FC<DesignFilterDrawerProps> = ({
  isOpen,
  onClose,
  filters,
  onChange,
  onReset,
  activeCount,
  totalResultsCount,
}) => {
  const { isRtl } = useLanguage();

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={isRtl ? 'تصفية تصاميم الخياطة' : 'Filter Designs'}
    >
      <div className="p-4 space-y-4">
        <DesignFilters
          filters={filters}
          onChange={onChange}
          onReset={onReset}
          activeCount={activeCount}
        />

        <div className="pt-4 border-t border-[#E6E2DB]">
          <Button variant="primary" size="md" className="w-full justify-center" onClick={onClose}>
            {isRtl
              ? `عرض النتائج (${totalResultsCount} تصميم)`
              : `Show Results (${totalResultsCount} Designs)`}
          </Button>
        </div>
      </div>
    </Drawer>
  );
};
