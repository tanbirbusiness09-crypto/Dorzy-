import React, { forwardRef } from 'react';
import { Minus, Plus } from 'lucide-react';

export interface NumberInputProps {
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  unit?: string; // e.g. "cm", "SAR", "days"
  disabled?: boolean;
  className?: string;
  helperText?: string;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  min = 0,
  max = 9999,
  step = 1,
  label,
  unit,
  disabled = false,
  className = '',
  helperText,
}) => {
  const handleDecrement = () => {
    if (value - step >= min) onChange(value - step);
  };

  const handleIncrement = () => {
    if (value + step <= max) onChange(value + step);
  };

  return (
    <div className={`w-full text-start ${className}`}>
      {label && (
        <label className="block text-xs font-medium text-[#121316] mb-1.5">
          {label}
        </label>
      )}

      <div className="inline-flex items-center rounded-lg border border-[#E6E2DB] bg-[#FFFFFF] overflow-hidden focus-within:ring-2 focus-within:ring-[#C5A880]/30 focus-within:border-[#C5A880]">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={disabled || value <= min}
          aria-label="Decrease value"
          className="p-2.5 text-[#65625D] hover:bg-[#F5F3EF] hover:text-[#121316] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer border-e border-[#E6E2DB]"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>

        <div className="px-4 py-2 flex items-baseline gap-1 min-w-[70px] justify-center text-center">
          <span className="text-sm font-semibold text-[#121316] tabular-nums">{value}</span>
          {unit && <span className="text-xs text-[#8E8B85]">{unit}</span>}
        </div>

        <button
          type="button"
          onClick={handleIncrement}
          disabled={disabled || value >= max}
          aria-label="Increase value"
          className="p-2.5 text-[#65625D] hover:bg-[#F5F3EF] hover:text-[#121316] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer border-s border-[#E6E2DB]"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {helperText && <p className="mt-1 text-xs text-[#8E8B85]">{helperText}</p>}
    </div>
  );
};
