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
  User,
  ShieldCheck
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

  const formattedDate = currentTime.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
  const formattedTime = currentTime.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  const getPageTitle = () => {
    switch (activeView) {
      case 'dashboard': return t('dashboard') + ' • ' + (t('farmHealthCare') || 'Crop Surveillance');
      case 'marketplace': return (t('farmerMarketplace') || 'Farmer Marketplace') + ' • ' + (t('buySellHub') || 'Fertilizers, Seeds & Mandi');
      case 'proTips': return (t('proTips') || 'Pro Agronomy Tips') + ' • ' + (t('proTipsSubtitle') || 'Advisory');
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

  const isDark = theme === 'dark';

  return (
    <header className={`px-4 py-2.5 sticky top-0 z-30 transition-colors ${
      isDark 
        ? 'bg-[#0b1329] border-b border-slate-800 text-white' 
        : 'bg-white border-b border-slate-200 text-slate-800 shadow-[0_1px_2px_rgba(0,0,0,0.03)]'
    }`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left: Mobile Toggle + Title & Official Timestamp */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenSidebar}
            className={`lg:hidden p-1.5 -ml-1 rounded-lg transition-colors ${
              isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
            }`}
            aria-label="Open Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <h1 className={`text-sm font-bold tracking-tight leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {getPageTitle()}
            </h1>
            <p className="text-[11px] text-slate-500 font-medium">
              {formattedDate}, {formattedTime} IST
            </p>
          </div>
        </div>

        {/* Right: Search, Language, Theme, Cart, Alerts, User Profile */}
        <div className="flex items-center flex-wrap gap-2 text-xs">
          {/* Search Box */}
          <div className="relative hidden md:block">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder={t('searchPlaceholder') || 'Search crops, diseases, inputs...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-44 lg:w-56 pl-8 pr-3 py-1.5 rounded-lg text-xs transition-colors focus:outline-none ${
                isDark 
                  ? 'bg-[#070e1e] border border-slate-700 text-white placeholder-slate-500 focus:border-[#1B5E20]' 
                  : 'bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:border-[#1B5E20] focus:bg-white'
              }`}
            />
          </div>

          {/* Language Selector */}
          <div className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg border ${
            isDark ? 'bg-[#070e1e] border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}>
            <Globe className="w-3.5 h-3.5 text-[#1B5E20]" />
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-transparent font-medium text-xs focus:outline-none cursor-pointer"
            >
              <option value="en" className={isDark ? 'bg-[#0b1329] text-white' : 'bg-white text-slate-800'}>English</option>
              <option value="hi" className={isDark ? 'bg-[#0b1329] text-white' : 'bg-white text-slate-800'}>हिन्दी (Hindi)</option>
              <option value="mr" className={isDark ? 'bg-[#0b1329] text-white' : 'bg-white text-slate-800'}>मराठी (Marathi)</option>
              <option value="te" className={isDark ? 'bg-[#0b1329] text-white' : 'bg-white text-slate-800'}>తెలుగు (Telugu)</option>
              <option value="ta" className={isDark ? 'bg-[#0b1329] text-white' : 'bg-white text-slate-800'}>தமிழ் (Tamil)</option>
              <option value="kn" className={isDark ? 'bg-[#0b1329] text-white' : 'bg-white text-slate-800'}>ಕನ್ನಡ (Kannada)</option>
              <option value="ml" className={isDark ? 'bg-[#0b1329] text-white' : 'bg-white text-slate-800'}>മലയാളം (Malayalam)</option>
              <option value="gu" className={isDark ? 'bg-[#0b1329] text-white' : 'bg-white text-slate-800'}>ગુજરાતી (Gujarati)</option>
              <option value="bn" className={isDark ? 'bg-[#0b1329] text-white' : 'bg-white text-slate-800'}>বাংলা (Bengali)</option>
              <option value="pa" className={isDark ? 'bg-[#0b1329] text-white' : 'bg-white text-slate-800'}>ਪੰਜਾਬੀ (Punjabi)</option>
              <option value="or" className={isDark ? 'bg-[#0b1329] text-white' : 'bg-white text-slate-800'}>ଓଡ଼ିଆ (Odia)</option>
            </select>
          </div>

          {/* Theme Toggle Button (Light/Dark Switch) */}
          <button 
            onClick={toggleTheme}
            className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg border transition-colors ${
              isDark 
                ? 'bg-[#070e1e] hover:bg-slate-800 border-slate-700 text-slate-200' 
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
            }`}
            title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
          >
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline font-medium">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-slate-600" />
                <span className="hidden sm:inline font-medium">Dark</span>
              </>
            )}
          </button>

          {/* Cart Button */}
          <button 
            onClick={() => onNavigate && onNavigate('marketplace')}
            className={`relative p-2 rounded-lg border transition-colors ${
              isDark 
                ? 'bg-[#070e1e] hover:bg-slate-800 border-slate-700 text-slate-200' 
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
            }`}
            title="Open Marketplace Cart"
          >
            <ShoppingCart className="w-4 h-4 text-[#1B5E20]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 px-1.5 py-0.2 bg-[#1B5E20] text-white text-[9px] font-bold rounded-full shadow-xs">
                {cartCount}
              </span>
            )}
          </button>

          {/* Alert Center Button */}
          <button 
            onClick={() => onNavigate && onNavigate('alertCenter')}
            className={`relative p-2 rounded-lg border transition-colors ${
              isDark 
                ? 'bg-[#070e1e] hover:bg-slate-800 border-slate-700 text-slate-200' 
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
            }`}
            title="Active Surveillance Alerts"
          >
            <Bell className="w-4 h-4 text-slate-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-600 rounded-full"></span>
          </button>

          {/* User Profile Pill */}
          <div className={`flex items-center space-x-2 pl-2 border-l ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
            <div className="w-7 h-7 rounded-lg bg-[#1B5E20] text-white flex items-center justify-center font-bold text-[11px] shadow-xs">
              RP
            </div>
            <div className="text-left leading-tight hidden sm:block">
              <p className={`font-bold text-xs ${isDark ? 'text-white' : 'text-slate-900'}`}>Ramesh Patil</p>
              <span className="text-[10px] text-slate-500 font-medium">Sangli, MH</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
