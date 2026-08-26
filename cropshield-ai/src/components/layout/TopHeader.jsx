import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Menu, 
  Search, 
  Globe, 
  Sun, 
  Moon, 
  Bell, 
  ShoppingCart,
  CheckCircle2
} from 'lucide-react';

export const TopHeader = ({ activeView, onOpenSidebar, onNavigate }) => {
  const { lang, setLang, t, cart, theme, toggleTheme } = useApp();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const cartCount = (cart || []).reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  const getPageTitle = () => {
    switch (activeView) {
      case 'dashboard': return 'Farm & Crop Health Surveillance';
      case 'marketplace': return 'Farmer Marketplace & Mandi Hub';
      case 'proTips': return 'Pro Agronomy Tips & Chemical Matrix';
      case 'smartScanner': return 'Smart AI Vision Leaf Scanner';
      case 'statistics': return 'Regional Pest & Crop Health Analytics';
      case 'alertCenter': return 'Active Outbreak Alerts & Advisory Center';
      case 'disasterPrediction': return 'Agro-Meteorological Disaster Forecast';
      case 'satelliteMapping': return 'ISRO Bhuvan / Sentinel-2 NDVI Mapping';
      case 'farmerCommunity': return 'Farmer Knowledge Exchange & Verification';
      case 'govtSchemes': return 'Direct Benefit Transfer & Government Welfare';
      case 'deviceManagement': return 'IoT Smart Trap Telemetry & Sensor Fleet';
      case 'reports': return 'Historical Field Reports & Digital Dossier';
      default: return 'Crop Health Surveillance';
    }
  };

  return (
    <header className="px-4 py-2.5 bg-[#090f1d] border-b border-[#16233b] text-slate-200 sticky top-0 z-30 select-none">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left: Mobile Toggle + Page Title (20px semibold) & Relative Sync Timestamp */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenSidebar}
            className="lg:hidden p-1 rounded-[4px] text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
            aria-label="Open Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <h1 className="text-[18px] sm:text-[20px] font-semibold text-slate-100 tracking-tight leading-tight">
              {getPageTitle()}
            </h1>
            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium mt-0.5">
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Synced 2 min ago</span>
              </span>
              <span>•</span>
              <span className="font-mono text-slate-400">{formattedTime} IST</span>
              <span>•</span>
              <span className="text-slate-500">Sangli Hub (KVK)</span>
            </div>
          </div>
        </div>

        {/* Right: Search, Language, Theme, Cart, Alerts, User Profile */}
        <div className="flex items-center flex-wrap gap-2 text-xs">
          {/* Search Box */}
          <div className="relative hidden md:block">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
            <input
              type="text"
              placeholder="Search field plots, inputs, telemetry..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-48 lg:w-60 pl-8 pr-2.5 py-1 bg-[#0e1629] border border-[#1e2f4f] rounded-[4px] text-[12px] text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {/* Language Selector */}
          <div className="flex items-center space-x-1.5 px-2 py-1 bg-[#0e1629] border border-[#1e2f4f] rounded-[4px] text-slate-300">
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-transparent font-medium text-[11px] focus:outline-none cursor-pointer"
            >
              <option value="en" className="bg-[#090f1d] text-white">English</option>
              <option value="hi" className="bg-[#090f1d] text-white">हिन्दी (Hindi)</option>
              <option value="mr" className="bg-[#090f1d] text-white">मराठी (Marathi)</option>
              <option value="te" className="bg-[#090f1d] text-white">తెలుగు (Telugu)</option>
              <option value="ta" className="bg-[#090f1d] text-white">தமிழ் (Tamil)</option>
              <option value="kn" className="bg-[#090f1d] text-white">ಕನ್ನಡ (Kannada)</option>
              <option value="ml" className="bg-[#090f1d] text-white">മലയാളം (Malayalam)</option>
              <option value="gu" className="bg-[#090f1d] text-white">ગુજરાતી (Gujarati)</option>
              <option value="bn" className="bg-[#090f1d] text-white">বাংলা (Bengali)</option>
              <option value="pa" className="bg-[#090f1d] text-white">ਪੰਜਾਬੀ (Punjabi)</option>
              <option value="or" className="bg-[#090f1d] text-white">ଓଡ଼ିଆ (Odia)</option>
            </select>
          </div>

          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme}
            className="flex items-center space-x-1 px-2 py-1 bg-[#0e1629] hover:bg-[#152038] border border-[#1e2f4f] rounded-[4px] text-slate-300 transition-colors"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline text-[11px]">Dark</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline text-[11px]">Light</span>
              </>
            )}
          </button>

          {/* Cart Button */}
          <button 
            onClick={() => onNavigate && onNavigate('marketplace')}
            className="relative p-1.5 bg-[#0e1629] hover:bg-[#152038] border border-[#1e2f4f] rounded-[4px] text-slate-300 transition-colors"
            title="Open Marketplace Cart"
          >
            <ShoppingCart className="w-3.5 h-3.5 text-emerald-400" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 px-1.5 py-0.2 bg-emerald-500 text-slate-950 text-[9px] font-bold rounded-[3px]">
                {cartCount}
              </span>
            )}
          </button>

          {/* Alert Center Button */}
          <button 
            onClick={() => onNavigate && onNavigate('alertCenter')}
            className="relative p-1.5 bg-[#0e1629] hover:bg-[#152038] border border-[#1e2f4f] rounded-[4px] text-slate-300 transition-colors"
            title="Active Surveillance Alerts"
          >
            <Bell className="w-3.5 h-3.5 text-slate-300" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
          </button>

          {/* User Profile Pill */}
          <div className="flex items-center space-x-2 pl-2 border-l border-[#1e2f4f]">
            <div className="w-6 h-6 rounded-[3px] bg-[#1B5E20] text-white flex items-center justify-center font-bold text-[10px] shadow-xs">
              RP
            </div>
            <div className="text-left leading-tight hidden sm:block">
              <p className="font-semibold text-slate-200 text-[12px]">Ramesh Patil</p>
              <span className="text-[10px] text-slate-400 font-mono">Sangli, MH</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
