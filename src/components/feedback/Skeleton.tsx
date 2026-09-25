import React from 'react';

export const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`bg-[#E6E2DB]/70 animate-pulse rounded ${className}`} />
);

export const CardSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`p-5 bg-[#FFFFFF] rounded-xl border border-[#E6E2DB] space-y-4 ${className}`}>
    <Skeleton className="w-full h-44 rounded-lg" />
    <Skeleton className="w-2/3 h-4" />
    <Skeleton className="w-1/2 h-3" />
    <div className="flex justify-between items-center pt-3 border-t border-[#F2EFE9]">
      <Skeleton className="w-24 h-4" />
      <Skeleton className="w-20 h-8 rounded-md" />
    </div>
  </div>
);

export const TableRowSkeleton: React.FC<{ columns?: number }> = ({ columns = 5 }) => (
  <tr className="border-b border-[#F2EFE9] animate-pulse">
    {Array.from({ length: columns }).map((_, i) => (
      <td key={i} className="py-3.5 px-4">
        <Skeleton className={`h-4 ${i === 0 ? 'w-32' : i === 1 ? 'w-24' : 'w-16'}`} />
      </td>
    ))}
  </tr>
);
