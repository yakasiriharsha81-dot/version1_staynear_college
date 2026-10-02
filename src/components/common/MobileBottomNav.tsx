import React from 'react';
import { Home, Search, GraduationCap, Heart, Scale } from 'lucide-react';
import { useProperties } from '../../context/PropertyContext';

interface MobileBottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ activeTab, setActiveTab }) => {
  const { favorites, compareList } = useProperties();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'find-pg', label: 'Find Stays', icon: Search },
    { id: 'colleges', label: 'Colleges', icon: GraduationCap },
    { id: 'favorites', label: 'Saved', icon: Heart, badge: favorites.length },
    { id: 'compare', label: 'Compare', icon: Scale, badge: compareList.length },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200 px-2 py-1.5 shadow-floating">
      <div className="grid grid-cols-5 items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center py-1 relative transition-colors ${
                isActive ? 'text-[#1677FF] font-bold' : 'text-slate-500 hover:text-[#102A56]'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 bg-[#1677FF] text-white text-[9px] font-bold px-1 rounded-full min-w-[15px] h-[15px] flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
