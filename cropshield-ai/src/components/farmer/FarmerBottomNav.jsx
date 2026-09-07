import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Home, 
  Scan, 
  CloudSun, 
  User, 
  Users, 
  FileText,
  Radio
} from 'lucide-react';

export const FarmerBottomNav = () => {
  const { activeTab, setActiveTab, t } = useApp();

  const navItems = [
    { id: 'home', label: t('home'), icon: Home },
    { id: 'scan', label: t('diagnosis'), icon: Scan, isSpecial: true },
    { id: 'weather', label: t('weather'), icon: CloudSun },
    { id: 'community', label: t('community'), icon: Users },
    { id: 'profile', label: t('profile'), icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-gray-200/90 px-3 py-2 z-40 shadow-lg">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id || (item.id === 'scan' && (activeTab === 'diagnosis' || activeTab === 'actions'));

          if (item.isSpecial) {
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="relative -top-5 flex flex-col items-center group focus:outline-none"
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-105 active:scale-95 ${
                  isActive 
                    ? 'bg-[#165a3c] text-white ring-4 ring-emerald-100' 
                    : 'bg-[#165a3c] text-white'
                }`}>
                  <Icon className="w-7 h-7" />
                </div>
                <span className={`text-[10px] font-bold mt-1 ${
                  isActive ? 'text-[#165a3c]' : 'text-gray-600'
                }`}>
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center py-1 px-2 rounded-xl transition-colors ${
                isActive 
                  ? 'text-[#165a3c] font-bold' 
                  : 'text-gray-500 hover:text-gray-900 font-medium'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[10px] mt-1 tracking-tight truncate max-w-[60px]">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
