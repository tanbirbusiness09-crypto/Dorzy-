import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'neutral' | 'gold' | 'verified' | 'subtle';
  size?: 'xs' | 'sm';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'sm',
  icon,
  className = '',
}) => {
  // Clean unboxed or hairline bordered styling — zero-pill discipline (no oversized candy capsules)
  const sizeStyles = {
    xs: 'text-[11px] py-0.5 px-1.5 gap-1 rounded',
    sm: 'text-xs py-1 px-2 gap-1.5 rounded-md',
  };

  const variantStyles = {
    neutral: 'bg-[#F5F3EF] text-[#24262E] border border-[#E6E2DB]',
    gold: 'bg-[#F9F6F0] text-[#916F3E] border border-[#E2D5C3] font-medium',
    verified: 'bg-[#F2F7F4] text-[#1E5638] border border-[#CDE3D5] font-medium',
    subtle: 'text-[#65625D] bg-transparent border-0',
  };

  return (
    <span
      className={`inline-flex items-center font-medium leading-none whitespace-nowrap select-none ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="truncate">{children}</span>
    </span>
  );
};
