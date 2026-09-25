import React, { forwardRef } from 'react';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string | React.ReactNode;
  description?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, description, checked, disabled, onChange, id, className = '', ...props }, ref) => {
    const radioId = id || (typeof label === 'string' ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <label
        htmlFor={radioId}
        className={`inline-flex items-start gap-3 cursor-pointer select-none text-start ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        } ${className}`}
      >
        <div className="relative flex items-center justify-center mt-0.5 shrink-0">
          <input
            id={radioId}
            ref={ref}
            type="radio"
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            className="sr-only peer"
            {...props}
          />
          <div className="w-4 h-4 rounded-full border border-[#D4D0C7] bg-[#FFFFFF] peer-checked:border-[#121316] peer-focus-visible:ring-2 peer-focus-visible:ring-[#C5A880] transition-colors flex items-center justify-center">
            {checked && <div className="w-2 h-2 rounded-full bg-[#121316]" />}
          </div>
        </div>

        <div className="flex-1">
          <span className="text-xs sm:text-sm font-medium text-[#121316] block">{label}</span>
          {description && <span className="text-xs text-[#8E8B85] block mt-0.5">{description}</span>}
        </div>
      </label>
    );
  }
);

Radio.displayName = 'Radio';
