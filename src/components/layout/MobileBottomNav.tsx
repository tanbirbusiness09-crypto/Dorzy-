import React from 'react';
import { Home, Compass, Calendar, MessageSquare, User } from 'lucide-react';
import { useLanguage } from '../../localization/LanguageContext';

export interface MobileBottomNavProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab = 'home',
  onTabChange = () => {},
}) => {
  const { t } = useLanguage();

  const items = [
    { id: 'home', label: t.navigation.mobileHome, icon: Home },
    { id: 'explore', label: t.navigation.mobileExplore, icon: Compass },
    { id: 'bookings', label: t.navigation.mobileBookings, icon: Calendar },
    { id: 'messages', label: t.navigation.mobileMessages, icon: MessageSquare },
    { id: 'profile', label: t.navigation.mobileProfile, icon: User },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#FFFFFF]/95 backdrop-blur-md border-t border-[#E6E2DB] pb-safe"
    >
      <div className="flex items-center justify-around h-14 px-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center flex-1 h-full min-h-[44px] cursor-pointer transition-colors focus-visible:outline-none ${
                isActive ? 'text-[#121316]' : 'text-[#8E8B85] hover:text-[#65625D]'
              }`}
            >
              <Icon
                className={`w-5 h-5 transition-transform ${
                  isActive ? 'scale-110 text-[#916F3E]' : ''
                }`}
              />
              <span
                className={`text-[10px] mt-0.5 font-medium leading-none ${
                  isActive ? 'font-bold text-[#121316]' : ''
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
