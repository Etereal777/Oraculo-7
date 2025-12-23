
import React from 'react';
import { MENU_ITEMS } from '../constants';
import { Screen } from '../types';

interface NavigationProps {
  activeScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeScreen, onNavigate }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto glass-card border-t border-amber-500/20 px-6 py-4 flex justify-between items-center z-50 rounded-t-3xl">
      {MENU_ITEMS.map((item) => {
        const isActive = activeScreen === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id as Screen)}
            className={`flex flex-col items-center gap-1 transition-all duration-300 ${
              isActive ? 'text-[#D4AF37] scale-110' : 'text-slate-500'
            }`}
          >
            {item.icon}
            <span className="text-[10px] uppercase tracking-widest font-medium">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default Navigation;
