import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown, MoreHorizontal, Search } from 'lucide-react';
import { useLanguage } from '../../localization/LanguageContext';
import { TableRowSkeleton } from '../feedback/Skeleton';
import { EmptyState } from './EmptyState';
import { Pagination } from './Pagination';

export interface ColumnDef<T> {
  key: string;
  header: string;
  accessor?: (row: T) => React.ReactNode;
  sortable?: boolean;
  align?: 'start' | 'center' | 'end';
  width?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  keyExtractor: (row: T) => string;
  isLoading?: boolean;
  searchPlaceholder?: string;
  itemsPerPage?: number;
  onRowClick?: (row: T) => void;
  rowActions?: Array<{
    label: string;
    onClick: (row: T) => void;
  }>;
  className?: string;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  keyExtractor,
  isLoading = false,
  searchPlaceholder = 'Filter records...',
  itemsPerPage = 5,
  onRowClick,
  rowActions,
  className = '',
}: DataTableProps<T>) {
  const { isRtl } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);

  // Search filter
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;
    const q = searchQuery.toLowerCase();
    return data.filter((item) =>
      Object.values(item).some((val) =>
        val ? String(val).toLowerCase().includes(q) : false
      )
    );
  }, [data, searchQuery]);

  // Sort
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal === bVal) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      const comparison = aVal > bVal ? 1 : -1;
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [filteredData, sortKey, sortDirection]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedData.length / itemsPerPage));
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(start, start + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      if (sortDirection === 'asc') setSortDirection('desc');
      else {
        setSortKey(null);
        setSortDirection('asc');
      }
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  return (
    <div className={`w-full bg-[#FFFFFF] rounded-xl border border-[#E6E2DB] overflow-hidden text-start ${className}`}>
      {/* Top filter toolbar */}
      <div className="p-4 border-b border-[#F2EFE9] flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="w-4 h-4 absolute start-3 top-1/2 -translate-y-1/2 text-[#8E8B85]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder={searchPlaceholder}
            className="w-full bg-[#F5F3EF] text-[#121316] placeholder-[#8E8B85] text-xs rounded-lg py-2 ps-9 pe-3 border border-transparent focus:bg-[#FFFFFF] focus:border-[#C5A880] focus:outline-none transition-colors"
          />
        </div>

        <div className="text-xs text-[#8E8B85] tabular-nums">
          <span>{sortedData.length}</span> {isRtl ? 'سجل' : 'records'}
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="bg-[#FAF9F6] border-b border-[#E6E2DB] text-[#65625D]">
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{ width: col.width }}
                  onClick={() => col.sortable && handleSort(col.key)}
                  className={`py-3 px-4 font-semibold select-none ${
                    col.sortable ? 'cursor-pointer hover:text-[#121316]' : ''
                  } text-${col.align || 'start'}`}
                >
                  <div className="inline-flex items-center gap-1.5">
                    <span>{col.header}</span>
                    {col.sortable && (
                      <span className="text-[#8E8B85]">
                        {sortKey === col.key ? (
                          sortDirection === 'asc' ? (
                            <ChevronUp className="w-3.5 h-3.5 text-[#121316]" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5 text-[#121316]" />
                          )
                        ) : (
                          <ChevronsUpDown className="w-3 h-3 opacity-60" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              {rowActions && rowActions.length > 0 && (
                <th className="py-3 px-4 text-end font-semibold w-16">
                  {isRtl ? 'الإجراءات' : 'Actions'}
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-[#F2EFE9]">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <TableRowSkeleton key={i} columns={columns.length + (rowActions ? 1 : 0)} />
              ))
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (rowActions ? 1 : 0)} className="py-8">
                  <EmptyState
                    title={isRtl ? 'لا توجد بيانات مطابقة' : 'No records found'}
                    description={
                      isRtl
                        ? 'حاول تغيير معايير البحث أو التصفية'
                        : 'Try adjusting your search query or filters.'
                    }
                  />
                </td>
              </tr>
            ) : (
              paginatedData.map((row) => {
                const rowKey = keyExtractor(row);
                return (
                  <tr
                    key={rowKey}
                    onClick={() => onRowClick && onRowClick(row)}
                    className={`hover:bg-[#FAF9F6] transition-colors ${
                      onRowClick ? 'cursor-pointer' : ''
                    }`}
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={`py-3.5 px-4 text-[#121316] text-${col.align || 'start'}`}
                      >
                        {col.accessor ? col.accessor(row) : row[col.key]}
                      </td>
                    ))}

                    {rowActions && rowActions.length > 0 && (
                      <td className="py-3.5 px-4 text-end">
                        <div className="inline-flex items-center gap-1.5">
                          {rowActions.map((action, idx) => (
                            <button
                              key={idx}
                              onClick={(e) => {
                                e.stopPropagation();
                                action.onClick(row);
                              }}
                              className="px-2 py-1 rounded text-[11px] font-medium text-[#916F3E] hover:bg-[#F9F6F0] transition-colors cursor-pointer"
                            >
                              {action.label}
                            </button>
                          ))}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="p-3 border-t border-[#F2EFE9] flex items-center justify-between gap-3">
          <span className="text-[11px] text-[#8E8B85]">
            {isRtl ? 'صفحة' : 'Page'} {currentPage} {isRtl ? 'من' : 'of'} {totalPages}
          </span>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
