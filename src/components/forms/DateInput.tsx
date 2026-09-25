import React, { forwardRef } from 'react';
import { Calendar } from 'lucide-react';

export interface DateInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  ({ label, error, helperText, id, className = '', ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full text-start">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-medium text-[#121316] mb-1.5">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          <input
            id={inputId}
            ref={ref}
            type="date"
            className={`w-full bg-[#FFFFFF] text-[#121316] text-sm rounded-lg border border-[#E6E2DB] hover:border-[#D4D0C7] focus:outline-none focus:ring-2 focus:ring-[#C5A880]/30 focus:border-[#C5A880] py-2.5 ps-3 pe-10 transition-colors cursor-pointer ${
              error ? 'border-red-500' : ''
            } ${className}`}
            {...props}
          />
          <div className="absolute end-3 pointer-events-none text-[#8E8B85]">
            <Calendar className="w-4 h-4" />
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

DateInput.displayName = 'DateInput';
