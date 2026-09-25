import React from 'react';

export const CardSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    className={`bg-[#FFFFFF] rounded-xl border border-[#E6E2DB] p-5 animate-pulse ${className}`}
  >
    <div className="w-full h-44 bg-[#F2EFE9] rounded-lg mb-4" />
    <div className="h-4 bg-[#F2EFE9] rounded w-3/4 mb-2.5" />
    <div className="h-3 bg-[#F2EFE9] rounded w-1/2 mb-4" />
    <div className="flex justify-between items-center pt-3 border-t border-[#F2EFE9]">
      <div className="h-4 bg-[#F2EFE9] rounded w-1/4" />
      <div className="h-8 bg-[#F2EFE9] rounded w-1/3" />
    </div>
  </div>
);

export const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizeMap = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-10 h-10 border-3',
  };
  return (
    <div className="flex items-center justify-center p-6">
      <div
        className={`${sizeMap[size]} border-[#C5A880] border-t-transparent rounded-full animate-spin`}
      />
    </div>
  );
};
