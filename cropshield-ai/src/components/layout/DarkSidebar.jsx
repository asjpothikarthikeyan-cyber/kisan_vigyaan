import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  Layers, 
  Scan, 
  BarChart3, 
  Bell, 
  AlertTriangle, 
  Satellite, 
  FlaskConical, 
  Landmark, 
  Users, 
  Radio, 
  FileText, 
  ShieldCheck, 
  ChevronRight, 
  LogOut, 
  X, 
  Wheat, 
  ShoppingBag, 
  Lightbulb 
} from 'lucide-react';

export const DarkSidebar = ({ activeView, setActiveView, isOpen, setIsOpen }) => {
  const { lang, setLang, t, cart, theme } = useApp();
  const cartCount = (cart || []).reduce((sum, item) => sum + item.quantity, 0);

  // Clean navigation list: Decorative badges removed, functional alert-count "3" preserved on alertCenter
  const navigationItems = [
    { id: 'dashboard', label: t('dashboard') || 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'marketplace', label: t('farmerMarketplace') || 'Farmer Marketplace', icon: ShoppingBag, badge: cartCount > 0 ? `${cartCount}` : null },
    { id: 'proTips', label: t('proTips') || 'Pro Agronomy Tips', icon: Lightbulb, badge: null },
    { id: 'smartScanner', label: t('smartScanner') || 'Smart AI Scanner', icon: Scan, badge: null },
    { id: 'statistics', label: t('statistics') || 'Statistics', icon: BarChart3, badge: null },
    { id: 'alertCenter', label: t('alertCenter') || 'Alert Center', icon: Bell, badge: '3' },
    { id: 'disasterPrediction', label: t('disasterPrediction') || 'Disaster Prediction', icon: AlertTriangle, badge: null },
    { id: 'satelliteMapping', label: t('satelliteMapping') || 'Satellite Mapping', icon: Satellite, badge: null },
    { id: 'farmerCommunity', label: t('farmerCommunity') || 'Farmer Community', icon: Users, badge: null },
    { id: 'govtSchemes', label: t('govtSchemes') || 'Govt. Schemes & Benefits', icon: Landmark, badge: null },
    { id: 'deviceManagement', label: t('deviceManagement') || 'Device & Trap Sensors', icon: Radio, badge: null },
    { id: 'reports', label: t('reports') || 'Reports & History', icon: FileText, badge: null },
  ];

  const isDark = theme === 'dark';

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-64 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:static lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        ${isDark 
          ? 'bg-[#0b1329] border-r border-slate-800 text-slate-200' 
          : 'bg-white border-r border-slate-200 text-slate-800 shadow-[1px_0_4px_rgba(0,0,0,0.03)]'
        }
      `}>
        <div>
          {/* Brand Header - Government Style */}
          <div className={`p-4 border-b flex items-center justify-between ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
            <div 
              className="flex items-center space-x-3 cursor-pointer" 
              onClick={() => setActiveView('dashboard')}
            >
              <div className="w-10 h-10 rounded-lg bg-[#1B5E20] text-white flex items-center justify-center shadow-xs">
                <Wheat className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <h1 className={`font-black text-sm tracking-tight flex items-center gap-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  CropShield AI
                </h1>
                <p className="text-[10px] text-[#1B5E20] font-bold tracking-wide uppercase">
                  Farm Surveillance Portal
                </p>
              </div>
            </div>

            <button 
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-slate-400 hover:text-slate-600 p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-145px)] text-xs">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveView(item.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs transition-all font-medium ${
                    isActive
                      ? isDark
                        ? 'bg-[#1B5E20] text-white font-bold'
                        : 'bg-[#E8F5E9] text-[#1B5E20] font-bold border border-[#C8E6C9]'
                      : isDark
                        ? 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 truncate">
                    <Icon className={`w-4 h-4 transition-colors ${
                      isActive 
                        ? isDark ? 'text-white' : 'text-[#1B5E20]'
                        : isDark ? 'text-slate-400' : 'text-slate-500'
                    }`} />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                      item.badge === '3' 
                        ? 'bg-red-600 text-white shadow-xs' 
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer User Profile Card */}
        <div className={`p-3 border-t ${isDark ? 'border-slate-800 bg-[#070e1e]' : 'border-slate-100 bg-slate-50/70'}`}>
          <div className={`flex items-center justify-between p-2.5 rounded-lg border ${
            isDark ? 'bg-[#0d182e] border-slate-700/60' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-[#1B5E20] text-white flex items-center justify-center font-bold text-xs">
                RP
              </div>
              <div className="text-left leading-tight">
                <p className={`font-bold text-xs ${isDark ? 'text-white' : 'text-slate-900'}`}>Ramesh Patil</p>
                <span className="text-[10px] text-slate-500 font-medium">Sangli, Maharashtra</span>
              </div>
            </div>

            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
          </div>
        </div>
      </aside>
    </>
  );
};
