import React, { useState } from 'react';

export interface AvatarProps {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isVerified?: boolean;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = 'md',
  isVerified = false,
  className = '',
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeStyles = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-20 h-20 text-xl',
  };

  // Generate clean initials
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  return (
    <div className={`relative inline-block shrink-0 ${sizeStyles[size]} ${className}`}>
      <div className="w-full h-full rounded-full overflow-hidden bg-[#EAE7E0] border border-[#D4D0C7] flex items-center justify-center text-[#121316] font-medium select-none shadow-xs">
        {src && !imageError ? (
          <img
            src={src}
            alt={name}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="tracking-wide text-[#3D3B37] font-semibold">{initials || 'K'}</span>
        )}
      </div>

      {isVerified && (
        <span
          title="Verified"
          aria-label="Verified"
          className="absolute -bottom-0.5 -end-0.5 w-3.5 h-3.5 bg-[#C5A880] text-white rounded-full border-2 border-white flex items-center justify-center shadow-xs"
        >
          <svg className="w-2 h-2 fill-current" viewBox="0 0 20 20">
            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
          </svg>
        </span>
      )}
    </div>
  );
};
