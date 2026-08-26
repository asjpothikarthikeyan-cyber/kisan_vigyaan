import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Menu, 
  Search, 
  Globe, 
  Sun, 
  Moon, 
  Bell, 
  ShoppingCart
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
    <header className="px-4 py-2.5 bg-white border-b border-slate-200 text-slate-800 sticky top-0 z-30 select-none shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left: Mobile Toggle + Page Title & Relative Sync Timestamp */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenSidebar}
            className="lg:hidden p-1 rounded-[4px] text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Open Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <h1 className="text-[18px] sm:text-[19px] font-bold text-slate-900 tracking-tight leading-tight">
              {getPageTitle()}
            </h1>
            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium mt-0.5">
              <span className="flex items-center gap-1 text-[#1B5E20] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1B5E20] animate-pulse"></span>
                <span>Live Synced</span>
              </span>
              <span>•</span>
              <span className="font-mono text-slate-600">{formattedTime} IST</span>
              <span>•</span>
              <span className="text-slate-500">Sangli KVK Agro-Node</span>
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
              className="w-48 lg:w-56 pl-8 pr-2.5 py-1 bg-slate-50 border border-slate-200 rounded-[5px] text-[12px] text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#1B5E20] transition-colors"
            />
          </div>

          {/* Language Selector */}
          <div className="flex items-center space-x-1.5 px-2 py-1 bg-slate-50 border border-slate-200 rounded-[5px] text-slate-700">
            <Globe className="w-3.5 h-3.5 text-[#1B5E20]" />
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-transparent font-medium text-[11px] text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी (Hindi)</option>
              <option value="mr">मराठी (Marathi)</option>
              <option value="te">తెలుగు (Telugu)</option>
              <option value="ta">தமிழ் (Tamil)</option>
              <option value="kn">ಕನ್ನಡ (Kannada)</option>
              <option value="ml">മലയാളം (Malayalam)</option>
              <option value="gu">ગુજરાતી (Gujarati)</option>
              <option value="bn">বাংলা (Bengali)</option>
              <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
              <option value="or">ଓଡ଼ିଆ (Odia)</option>
            </select>
          </div>

          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme}
            className="flex items-center space-x-1 px-2 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-[5px] text-slate-700 transition-colors cursor-pointer"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span className="hidden sm:inline text-[11px]">Dark</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-slate-600" />
                <span className="hidden sm:inline text-[11px]">Light</span>
              </>
            )}
          </button>

          {/* Cart Button */}
          <button 
            onClick={() => onNavigate && onNavigate('marketplace')}
            className="relative p-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-[5px] text-slate-700 transition-colors cursor-pointer"
            title="Open Marketplace Cart"
          >
            <ShoppingCart className="w-3.5 h-3.5 text-[#1B5E20]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 px-1.5 py-0.2 bg-[#1B5E20] text-white text-[9px] font-bold rounded-[3px]">
                {cartCount}
              </span>
            )}
          </button>

          {/* Alert Center Button */}
          <button 
            onClick={() => onNavigate && onNavigate('alertCenter')}
            className="relative p-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-[5px] text-slate-700 transition-colors cursor-pointer"
            title="Active Surveillance Alerts"
          >
            <Bell className="w-3.5 h-3.5 text-slate-700" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
          </button>

          {/* User Profile Pill */}
          <div className="flex items-center space-x-2 pl-2 border-l border-slate-200">
            <div className="w-6 h-6 rounded-[4px] bg-[#1B5E20] text-white flex items-center justify-center font-bold text-[10px] shadow-xs">
              RP
            </div>
            <div className="text-left leading-tight hidden sm:block">
              <p className="font-bold text-slate-800 text-[12px]">Ramesh Patil</p>
              <span className="text-[10px] text-slate-500 font-mono">Sangli, MH</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
