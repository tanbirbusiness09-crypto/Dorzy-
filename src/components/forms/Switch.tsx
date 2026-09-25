import React from 'react';

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string | React.ReactNode;
  description?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  id,
  className = '',
}) => {
  const switchId = id || (typeof label === 'string' ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div
      className={`inline-flex items-center justify-between gap-4 select-none ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      } ${className}`}
      onClick={() => !disabled && onChange(!checked)}
    >
      {(label || description) && (
        <div className="text-start">
          {label && <span className="text-xs sm:text-sm font-medium text-[#121316] block">{label}</span>}
          {description && <span className="text-xs text-[#8E8B85] block">{description}</span>}
        </div>
      )}

      <button
        id={switchId}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-2 ${
          checked ? 'bg-[#121316]' : 'bg-[#D4D0C7]'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-[#FFFFFF] shadow-sm ring-0 transition duration-200 ease-in-out ${
            checked ? 'translate-x-4 rtl:-translate-x-4' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
};
