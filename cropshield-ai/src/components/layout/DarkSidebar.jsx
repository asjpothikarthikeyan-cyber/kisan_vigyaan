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
  Sparkles,
  ShieldCheck,
  ChevronRight,
  LogOut,
  X,
  Wheat,
  ShoppingBag,
  Lightbulb
} from 'lucide-react';

export const DarkSidebar = ({ activeView, setActiveView, isOpen, setIsOpen }) => {
  const { lang, setLang, t, cart } = useApp();
  const cartCount = (cart || []).reduce((sum, item) => sum + item.quantity, 0);

  const navigationItems = [
    { id: 'dashboard', label: t('dashboard') || 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'marketplace', label: t('farmerMarketplace') || 'Farmer Marketplace', icon: ShoppingBag, badge: cartCount > 0 ? `${cartCount} in Cart` : 'DBT & Mandi' },
    { id: 'proTips', label: t('proTips') || 'Pro Agronomy Tips', icon: Lightbulb, badge: 'Expert' },
    { id: 'smartScanner', label: t('smartScanner') || 'Smart AI Scanner', icon: Scan, badge: 'New AI' },
    { id: 'statistics', label: t('statistics') || 'Statistics', icon: BarChart3, badge: null },
    { id: 'alertCenter', label: t('alertCenter') || 'Alert Center', icon: Bell, badge: '3' },
    { id: 'disasterPrediction', label: t('disasterPrediction') || 'Disaster Prediction', icon: AlertTriangle, badge: 'Live' },
    { id: 'satelliteMapping', label: t('satelliteMapping') || 'Satellite Mapping', icon: Satellite, badge: 'NDVI' },
    { id: 'farmerCommunity', label: t('farmerCommunity') || 'Farmer Community', icon: Users, badge: null },
    { id: 'govtSchemes', label: t('govtSchemes') || 'Govt. Schemes & Benefits', icon: Landmark, badge: 'Govt' },
    { id: 'deviceManagement', label: t('deviceManagement') || 'Device & Trap Sensors', icon: Radio, badge: null },
    { id: 'reports', label: t('reports') || 'Reports & History', icon: FileText, badge: null },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#070e1e] border-r border-[#1e2d4a] flex flex-col justify-between transition-transform duration-300 ease-in-out lg:static lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Brand & Logo matching Reference Image */}
        <div>
          <div className="p-4 border-b border-[#18263f] flex items-center justify-between">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveView('dashboard')}>
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.25)]">
                <Wheat className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-extrabold text-sm tracking-tight text-white flex items-center gap-1">
                  CropShield AI
                </h1>
                <p className="text-[10px] text-cyan-300/80 font-medium">Smart Farming & Crop Monitor</p>
              </div>
            </div>

            <button 
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-2.5 space-y-0.5 overflow-y-auto max-h-[calc(100vh-140px)]">
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
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.15)] font-bold'
                      : 'text-slate-300 hover:bg-[#0f1d38] hover:text-white border border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 truncate">
                    <Icon className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-cyan-300'
                    }`} />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`px-1.5 py-0.5 text-[9px] font-extrabold rounded-md uppercase tracking-wider ${
                      item.badge === '3' 
                        ? 'bg-red-500/90 text-white' 
                        : item.badge === 'Live'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
                        : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer User Avatar & Info */}
        <div className="p-3 border-t border-[#18263f] bg-[#050a16]">
          <div className="flex items-center justify-between p-2 rounded-xl bg-[#0b1426] border border-[#1b2b48]">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-cyan-600 text-white flex items-center justify-center font-bold text-xs shadow-md">
                AF
              </div>
              <div className="text-left leading-tight">
                <p className="font-bold text-white text-xs">Admin Farmer</p>
                <span className="text-[10px] text-cyan-400 font-semibold">Admin • Sangli</span>
              </div>
            </div>

            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>
          </div>
        </div>
      </aside>
    </>
  );
};
