import React, { forwardRef } from 'react';
import { Search, X, Loader2 } from 'lucide-react';

export interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
  isLoading?: boolean;
  shortcut?: string; // e.g. "⌘K"
  sizeVariant?: 'sm' | 'md' | 'lg';
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      value,
      onChange,
      onClear,
      isLoading = false,
      shortcut,
      sizeVariant = 'md',
      placeholder = 'Search ateliers, tailors, fabrics...',
      className = '',
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: 'py-1.5 ps-8 pe-8 text-xs min-h-[34px]',
      md: 'py-2.5 ps-9 pe-9 text-sm min-h-[42px]',
      lg: 'py-3.5 ps-11 pe-11 text-base min-h-[50px]',
    };

    const iconSizes = {
      sm: 'w-3.5 h-3.5 start-2.5',
      md: 'w-4 h-4 start-3',
      lg: 'w-5 h-5 start-3.5',
    };

    return (
      <div className="relative w-full text-start">
        {/* Search Icon or Loading Spinner */}
        <div className={`absolute top-1/2 -translate-y-1/2 pointer-events-none text-[#8E8B85] ${iconSizes[sizeVariant]}`}>
          {isLoading ? (
            <Loader2 className="w-full h-full animate-spin text-[#C5A880]" />
          ) : (
            <Search className="w-full h-full" />
          )}
        </div>

        <input
          ref={ref}
          type="search"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full bg-[#FFFFFF] text-[#121316] placeholder-[#8E8B85] rounded-lg border border-[#E6E2DB] hover:border-[#D4D0C7] focus:outline-none focus:ring-2 focus:ring-[#C5A880]/30 focus:border-[#C5A880] transition-colors ${sizeClasses[sizeVariant]} ${className}`}
          {...props}
        />

        {/* End Actions: Clear button or Keyboard shortcut badge */}
        <div className="absolute end-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          {value && onClear && (
            <button
              type="button"
              onClick={onClear}
              aria-label="Clear search"
              className="p-1 rounded-md text-[#8E8B85] hover:text-[#121316] hover:bg-[#F5F3EF] transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          {shortcut && !value && (
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-[#8E8B85] bg-[#F5F3EF] border border-[#E6E2DB] rounded select-none">
              {shortcut}
            </kbd>
          )}
        </div>
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';
