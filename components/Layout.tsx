
import React from 'react';
import Navigation from './Navigation';
import { Screen } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeScreen: Screen;
  onNavigate: (screen: Screen) => void;
  hideNav?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, activeScreen, onNavigate, hideNav }) => {
  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto relative bg-[#050510] text-slate-50">
      {/* Background Orbs */}
      <div className="fixed top-[-10%] left-[-20%] w-[80%] h-[40%] bg-indigo-900/20 blur-[120px] rounded-full -z-10" />
      <div className="fixed bottom-[-10%] right-[-20%] w-[80%] h-[40%] bg-amber-900/10 blur-[120px] rounded-full -z-10" />
      
      <main className="flex-1 overflow-y-auto px-6 py-8 pb-32">
        {children}
      </main>

      {!hideNav && (
        <Navigation activeScreen={activeScreen} onNavigate={onNavigate} />
      )}
    </div>
  );
};

export default Layout;
