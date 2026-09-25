import React, { forwardRef } from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold' | 'danger' | 'success' | 'link';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      isLoading = false,
      icon,
      iconPosition = 'left',
      disabled,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none select-none whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-2';

    const sizeStyles = {
      sm: 'text-xs px-3 py-1.5 rounded-md gap-1.5 min-h-[32px]',
      md: 'text-sm px-4 py-2.5 rounded-lg gap-2 min-h-[40px]',
      lg: 'text-base px-6 py-3 rounded-lg gap-2.5 min-h-[48px]',
    };

    const variantStyles = {
      primary:
        'bg-[#121316] text-[#FAF9F6] hover:bg-[#24262E] active:bg-[#000000] border border-[#121316] shadow-xs',
      secondary:
        'bg-[#F5F3EF] text-[#121316] hover:bg-[#EDEAE3] active:bg-[#E2DDD5] border border-[#E6E2DB]',
      outline:
        'bg-transparent text-[#121316] hover:bg-[#F5F3EF] active:bg-[#EDEAE3] border border-[#D4D0C7]',
      ghost:
        'bg-transparent text-[#121316] hover:bg-[#F5F3EF] active:bg-[#EDEAE3] border border-transparent',
      gold:
        'bg-[#C5A880] text-[#121316] hover:bg-[#B8935A] active:bg-[#9E7B46] border border-[#C5A880] font-semibold shadow-xs',
      danger:
        'bg-[#FEF3F2] text-[#B42318] hover:bg-[#FECDCA] active:bg-[#F04438] hover:text-[#912018] border border-[#FECDCA]',
      success:
        'bg-[#F2F7F4] text-[#1E5638] hover:bg-[#DDF1E4] active:bg-[#1E5638] hover:text-[#14422A] border border-[#CDE3D5]',
      link:
        'bg-transparent text-[#916F3E] hover:text-[#6F5229] hover:underline border-0 p-0 min-h-0 h-auto font-medium focus-visible:ring-0',
    };

    const widthStyle = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`}
        {...props}
      >
        {isLoading ? (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
            <span className="truncate">{children}</span>
            {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
