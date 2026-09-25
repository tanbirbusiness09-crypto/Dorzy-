import React from 'react';
import { User, Store, Scissors, ShieldAlert, Check } from 'lucide-react';
import { UserRole } from '../../types';
import { useLanguage } from '../../localization/LanguageContext';

export interface RoleCardProps {
  role: UserRole;
  isSelected: boolean;
  onSelect: (role: UserRole) => void;
}

export const RoleCard: React.FC<RoleCardProps> = ({ role, isSelected, onSelect }) => {
  const { t } = useLanguage();

  const getRoleDetails = () => {
    switch (role) {
      case 'customer':
        return {
          title: t.roles.customerTitle,
          subtitle: t.roles.customerSubtitle,
          icon: <User className="w-5 h-5 text-[#916F3E]" />,
        };
      case 'shop_owner':
        return {
          title: t.roles.shopOwnerTitle,
          subtitle: t.roles.shopOwnerSubtitle,
          icon: <Store className="w-5 h-5 text-[#916F3E]" />,
        };
      case 'tailor':
        return {
          title: t.roles.tailorTitle,
          subtitle: t.roles.tailorSubtitle,
          icon: <Scissors className="w-5 h-5 text-[#916F3E]" />,
        };
      case 'admin':
        return {
          title: t.roles.adminTitle,
          subtitle: t.roles.adminSubtitle,
          icon: <ShieldAlert className="w-5 h-5 text-[#916F3E]" />,
        };
    }
  };

  const { title, subtitle, icon } = getRoleDetails();

  return (
    <div
      onClick={() => onSelect(role)}
      role="radio"
      aria-checked={isSelected}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(role);
        }
      }}
      className={`relative p-5 rounded-xl border transition-all duration-200 cursor-pointer select-none text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] ${
        isSelected
          ? 'bg-[#FFFFFF] border-[#C5A880] shadow-md ring-1 ring-[#C5A880]'
          : 'bg-[#FAF9F6] border-[#E6E2DB] hover:border-[#D4D0C7] hover:bg-[#FFFFFF]'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#F5F3EF] border border-[#E6E2DB] flex items-center justify-center shrink-0">
            {icon}
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#121316]">{title}</h4>
            {isSelected && (
              <span className="text-[11px] font-semibold text-[#916F3E] uppercase tracking-wide">
                {t.roles.selectedBadge}
              </span>
            )}
          </div>
        </div>

        <div
          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors shrink-0 ${
            isSelected
              ? 'bg-[#121316] border-[#121316] text-[#FAF9F6]'
              : 'border-[#D4D0C7] bg-[#FFFFFF]'
          }`}
        >
          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
        </div>
      </div>

      <p className="mt-3 text-xs text-[#65625D] leading-relaxed">{subtitle}</p>
    </div>
  );
};
