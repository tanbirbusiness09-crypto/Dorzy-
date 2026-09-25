import React, { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  helperText?: string;
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, helperText, error, id, className = '', ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full text-start">
        {label && (
          <label htmlFor={selectId} className="block text-xs font-medium text-[#121316] mb-1.5">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          <select
            id={selectId}
            ref={ref}
            className={`w-full appearance-none bg-[#FFFFFF] text-[#121316] text-sm rounded-lg border transition-colors duration-150 py-2.5 ps-3 pe-8 min-h-[40px] focus:outline-none focus:ring-2 focus:ring-[#C5A880]/30 focus:border-[#C5A880] cursor-pointer ${
              error
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                : 'border-[#E6E2DB] hover:border-[#D4D0C7]'
            } ${className}`}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute end-2.5 pointer-events-none text-[#8E8B85]">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
        {error ? (
          <p className="mt-1 text-xs text-red-600">{error}</p>
        ) : helperText ? (
          <p className="mt-1 text-xs text-[#8E8B85]">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Select.displayName = 'Select';
