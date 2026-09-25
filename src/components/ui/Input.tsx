import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, error, leftIcon, rightIcon, id, className = '', ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full text-start">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-medium text-[#121316] mb-1.5">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute start-3 flex items-center pointer-events-none text-[#8E8B85]">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={`w-full bg-[#FFFFFF] text-[#121316] placeholder-[#8E8B85] text-sm rounded-lg border transition-colors duration-150 py-2.5 px-3 min-h-[40px] focus:outline-none focus:ring-2 focus:ring-[#C5A880]/30 focus:border-[#C5A880] ${
              leftIcon ? 'ps-9' : ''
            } ${rightIcon ? 'pe-9' : ''} ${
              error
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                : 'border-[#E6E2DB] hover:border-[#D4D0C7]'
            } ${className}`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute end-3 flex items-center pointer-events-none text-[#8E8B85]">
              {rightIcon}
            </div>
          )}
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

Input.displayName = 'Input';
