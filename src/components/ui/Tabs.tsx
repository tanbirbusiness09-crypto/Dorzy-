import React from 'react';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
  size?: 'sm' | 'md';
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className = '',
  size = 'md',
}) => {
  return (
    <div
      role="tablist"
      className={`inline-flex items-center p-1 bg-[#F5F3EF] border border-[#E6E2DB] rounded-lg max-w-full overflow-x-auto no-scrollbar ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={`whitespace-nowrap transition-all duration-150 rounded-md font-medium cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] ${
              size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3.5 py-1.5 text-xs sm:text-sm'
            } ${
              isActive
                ? 'bg-[#FFFFFF] text-[#121316] shadow-sm font-semibold'
                : 'text-[#65625D] hover:text-[#121316] hover:bg-[#EDEAE3]/60'
            }`}
          >
            <span>{tab.label}</span>
            {typeof tab.count === 'number' && (
              <span
                className={`ms-1.5 tabular-nums text-xs opacity-75 ${
                  isActive ? 'text-[#121316]' : 'text-[#8E8B85]'
                }`}
              >
                ({tab.count})
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
