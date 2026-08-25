import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Menu, 
  Search, 
  Globe, 
  Sun, 
  Moon, 
  Bell, 
  MessageSquare, 
  ChevronDown, 
  Sparkles,
  ShieldCheck,
  User,
  ShoppingCart,
  ShoppingBag
} from 'lucide-react';

export const TopHeader = ({ activeView, onOpenSidebar, onNavigate }) => {
  const { lang, setLang, t, cart } = useApp();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const cartCount = (cart || []).reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Format time e.g., "Wed, 19 Aug, 2026, 11:17:40 am"
  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  const getPageTitle = () => {
    switch (activeView) {
      case 'dashboard': return t('dashboard') + ' - ' + t('farmHealthCare');
      case 'marketplace': return (t('farmerMarketplace') || 'Farmer Marketplace') + ' - ' + (t('buySellHub') || 'Fertilizers, Seeds, Pesticides & Mandi');
      case 'proTips': return (t('proTips') || 'Pro Agronomy Tips') + ' - ' + (t('proTipsSubtitle') || 'Seasonal Crops, Nutrition, Safety & Disease Prevention');
      case 'smartScanner': return t('smartScanner');
      case 'statistics': return t('statistics');
      case 'alertCenter': return t('alertCenter');
      case 'disasterPrediction': return t('disasterPrediction');
      case 'satelliteMapping': return t('satelliteMapping');
      case 'farmerCommunity': return t('farmerCommunity');
      case 'govtSchemes': return t('govtSchemes');
      case 'deviceManagement': return t('deviceManagement');
      case 'reports': return t('reports');
      default: return t('dashboard');
    }
  };

  return (
    <header className="bg-[#070e1e] border-b border-[#18263f] px-4 py-3 text-white sticky top-0 z-30 shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left: Mobile Menu + Page Title & Live Timestamp */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenSidebar}
            className="lg:hidden p-1.5 -ml-1 text-slate-300 hover:text-white hover:bg-[#13223f] rounded-xl transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div>
            <h1 className="text-base font-black text-white tracking-tight leading-tight">
              {getPageTitle()}
            </h1>
            <p className="text-[11px] text-slate-400 font-medium">
              {formattedDate}, {formattedTime}
            </p>
          </div>
        </div>

        {/* Right: Search, Language, Theme, Alerts, User Profile */}
        <div className="flex items-center flex-wrap gap-2 sm:gap-3 text-xs">
          {/* Search Box */}
          <div className="relative hidden md:block">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-44 lg:w-56 pl-8 pr-3 py-1.5 bg-[#0d182e] border border-[#203254] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          {/* Language Selector (11 Indian Languages) */}
          <div className="flex items-center space-x-1.5 bg-[#0d182e] border border-[#203254] px-2.5 py-1.5 rounded-xl shadow-xs">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-transparent text-slate-200 font-bold text-xs focus:outline-none cursor-pointer"
            >
              <option value="en" className="bg-[#0b1329] text-white">English</option>
              <option value="hi" className="bg-[#0b1329] text-white">हिन्दी (Hindi)</option>
              <option value="mr" className="bg-[#0b1329] text-white">मराठी (Marathi)</option>
              <option value="te" className="bg-[#0b1329] text-white">తెలుగు (Telugu)</option>
              <option value="ta" className="bg-[#0b1329] text-white">தமிழ் (Tamil)</option>
              <option value="kn" className="bg-[#0b1329] text-white">ಕನ್ನಡ (Kannada)</option>
              <option value="ml" className="bg-[#0b1329] text-white">മലയാളം (Malayalam)</option>
              <option value="gu" className="bg-[#0b1329] text-white">ગુજરાતી (Gujarati)</option>
              <option value="bn" className="bg-[#0b1329] text-white">বাংলা (Bengali)</option>
              <option value="pa" className="bg-[#0b1329] text-white">ਪੰਜਾਬੀ (Punjabi)</option>
              <option value="or" className="bg-[#0b1329] text-white">ଓଡ଼ିଆ (Odia)</option>
            </select>
          </div>

          {/* Theme Button matching mockup */}
          <button 
            className="flex items-center space-x-1 bg-[#0d182e] hover:bg-[#13223f] border border-[#203254] px-2.5 py-1.5 rounded-xl text-slate-200 font-semibold transition-colors"
            title="Theme switch"
          >
            <Sun className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">{t('light')}</span>
          </button>

          {/* Cart Quick Access Button with Live Count */}
          <button 
            onClick={() => onNavigate && onNavigate('marketplace')}
            className="relative flex items-center space-x-1.5 p-2 bg-[#0d182e] hover:bg-[#13223f] border border-cyan-500/40 rounded-xl text-cyan-300 transition-colors shadow-xs"
            title="Open Agri-Marketplace Cart"
          >
            <ShoppingCart className="w-4 h-4 text-cyan-400" />
            {cartCount > 0 && (
              <span className="px-1.5 py-0.2 bg-emerald-500 text-slate-950 text-[10px] font-black rounded-full shadow-xs">
                {cartCount}
              </span>
            )}
          </button>

          {/* Alert Center Button with badge */}
          <button 
            onClick={() => onNavigate && onNavigate('alertCenter')}
            className="relative p-2 bg-[#0d182e] hover:bg-[#13223f] border border-[#203254] rounded-xl text-slate-200 transition-colors"
            title="Active Outbreak Alerts"
          >
            <Bell className="w-4 h-4 text-cyan-300" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile Pill matching reference image */}
          <div className="flex items-center space-x-2 pl-2 border-l border-[#203254]">
            <div className="w-8 h-8 rounded-full bg-cyan-600 border border-cyan-400 flex items-center justify-center font-black text-white text-xs shadow-md">
              AF
            </div>
            <div className="text-left leading-tight hidden sm:block">
              <p className="font-bold text-white text-xs">{t('adminFarmer')}</p>
              <span className="text-[10px] text-cyan-300 font-medium">{t('admin')}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
