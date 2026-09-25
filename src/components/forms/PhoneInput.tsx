import React, { forwardRef } from 'react';
import { Phone } from 'lucide-react';

export interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ label, error, helperText, id, className = '', ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full text-start">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-medium text-[#121316] mb-1.5">
            {label}
          </label>
        )}

        <div className="relative flex items-center rounded-lg border border-[#E6E2DB] bg-[#FFFFFF] overflow-hidden focus-within:ring-2 focus-within:ring-[#C5A880]/30 focus-within:border-[#C5A880]">
          {/* Saudi Arabia Country Code Flag & Prefix */}
          <div className="flex items-center gap-1.5 px-3 py-2.5 bg-[#F5F3EF] border-e border-[#E6E2DB] text-[#24262E] text-xs font-semibold select-none shrink-0">
            <span className="text-sm">🇸🇦</span>
            <span className="tabular-nums" dir="ltr">+966</span>
          </div>

          <div className="relative flex-1 flex items-center">
            <input
              id={inputId}
              ref={ref}
              type="tel"
              placeholder="50 123 4567"
              dir="ltr"
              className={`w-full bg-transparent text-[#121316] placeholder-[#8E8B85] text-sm py-2.5 px-3 focus:outline-none tabular-nums ${className}`}
              {...props}
            />
          </div>

          <div className="pe-3 pointer-events-none text-[#8E8B85]">
            <Phone className="w-4 h-4" />
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

PhoneInput.displayName = 'PhoneInput';
