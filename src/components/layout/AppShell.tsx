import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { MobileBottomNav } from './MobileBottomNav';

export interface AppShellProps {
  children: React.ReactNode;
  activeRoute?: string;
  onNavigate?: (route: string) => void;
}

export const AppShell: React.FC<AppShellProps> = ({
  children,
  activeRoute = 'home',
  onNavigate = () => {},
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#121316]">
      <Header activeRoute={activeRoute} onNavigate={onNavigate} />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
      <MobileBottomNav activeTab={activeRoute} onTabChange={onNavigate} />
    </div>
  );
};
