import React from 'react';
import { Design } from '../../types';
import { DesignCard } from './DesignCard';

export interface DesignGridProps {
  designs: Design[];
  onSelectDesign?: (design: Design) => void;
  onSelectCreator?: (creatorType: 'tailor' | 'shop', slug: string) => void;
  onUseAsInspiration?: (design: Design) => void;
  className?: string;
}

export const DesignGrid: React.FC<DesignGridProps> = ({
  designs,
  onSelectDesign,
  onSelectCreator,
  onUseAsInspiration,
  className = '',
}) => {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
    >
      {designs.map((design) => (
        <DesignCard
          key={design.id}
          design={design}
          onSelectDesign={onSelectDesign}
          onSelectCreator={onSelectCreator}
          onUseAsInspiration={onUseAsInspiration}
        />
      ))}
    </div>
  );
};
