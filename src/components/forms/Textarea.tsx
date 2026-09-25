import React, { forwardRef } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: string;
  isLoading?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, helperText, error, success, isLoading, id, className = '', disabled, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full text-start">
        {label && (
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor={textareaId} className="block text-xs font-medium text-[#121316]">
              {label}
            </label>
            {isLoading && (
              <span className="text-[11px] text-[#8E8B85] flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#C5A880] animate-pulse" />
                Validating...
              </span>
            )}
          </div>
        )}

        <div className="relative">
          <textarea
            id={textareaId}
            ref={ref}
            disabled={disabled || isLoading}
            rows={props.rows || 3}
            className={`w-full bg-[#FFFFFF] text-[#121316] placeholder-[#8E8B85] text-sm rounded-lg border transition-colors duration-150 py-2.5 px-3 focus:outline-none focus:ring-2 disabled:bg-[#F5F3EF] disabled:cursor-not-allowed resize-y ${
              error
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                : success
                ? 'border-[#1E5638] focus:border-[#1E5638] focus:ring-[#1E5638]/20'
                : 'border-[#E6E2DB] hover:border-[#D4D0C7] focus:ring-[#C5A880]/30 focus:border-[#C5A880]'
            } ${className}`}
            {...props}
          />

          {success && !error && (
            <div className="absolute top-2.5 end-3 pointer-events-none text-[#1E5638]">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          )}
        </div>

        {error ? (
          <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </p>
        ) : success ? (
          <p className="mt-1 text-xs text-[#1E5638] flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>{success}</span>
          </p>
        ) : helperText ? (
          <p className="mt-1 text-xs text-[#8E8B85]">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
