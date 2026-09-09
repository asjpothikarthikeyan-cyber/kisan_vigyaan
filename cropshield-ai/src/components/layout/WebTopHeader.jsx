import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Menu, 
  ShoppingBag, 
  Globe, 
  Sun, 
  Moon, 
  Sprout, 
  CloudSun,
  ShieldCheck,
  ChevronDown,
  Mic
} from 'lucide-react';

export const WebTopHeader = ({ activeTab, onNavigate, onOpenMobileMenu }) => {
  const { 
    lang, 
    t, 
    theme, 
    toggleTheme, 
    cart, 
    setIsCartModalOpen, 
    setIsLanguageModalOpen,
    setIsAccountSwitcherOpen,
    setIsChotaKissanOpen,
    currentUser,
    role 
  } = useApp();

  const isDark = theme === 'dark';
  const totalCartCount = (cart || []).reduce((sum, item) => sum + (item.quantity || 1), 0);

  const getPageTitle = () => {
    switch (activeTab) {
      case 'home': return t('navHome', 'Home');
      case 'scan': return t('navScan', 'Leaf Pathology Scanner');
      case 'market': return t('navMarket', 'Farmer Marketplace & Mandi');
      case 'alerts': return t('navAlerts', 'Field Advisories & Outbreak Map');
      case 'more': return t('navMore', 'Knowledge Hub & Advanced Tools');
      case 'satelliteMapping': return lang === 'ta' ? 'இஸ்ரோ செயற்கைக்கோள் வரைபடம்' : lang === 'mr' ? 'इस्रो उपग्रह नकाशा' : 'ISRO Satellite GIS Map';
      case 'proTips': return lang === 'ta' ? 'விவசாய வல்லுநர் குறிப்புகள்' : lang === 'mr' ? 'तज्ज्ञ कृषी सल्ला' : 'Pro Agronomy Tips';
      case 'govtSchemes': return lang === 'ta' ? 'அரசு திட்டங்கள் & மானியங்கள்' : lang === 'mr' ? 'शासकीय योजना व अनुदान' : 'Govt Schemes & DBT';
      case 'statistics': return lang === 'ta' ? 'பருவநிலை புள்ளிவிவரங்கள்' : lang === 'mr' ? 'हवामान आकडेवारी' : 'Climate Statistics';
      case 'farmerCommunity': return lang === 'ta' ? 'விவசாயிகள் மன்றம்' : lang === 'mr' ? 'शेतकरी मंच' : 'Farmer Community';
      case 'reports': return lang === 'ta' ? 'கள அறிக்கைகள்' : lang === 'mr' ? 'शेत अहवाल' : 'My Reports';
      case 'deviceManagement': return lang === 'ta' ? 'சூரியசக்தி பூச்சி பொறிகள்' : lang === 'mr' ? 'सौर कीटक सापळे' : 'IoT Solar Traps';
      default: return 'Kisan Vigyaan';
    }
  };

  return (
    <header className={`sticky top-0 z-30 border-b transition-colors backdrop-blur-md ${
      isDark 
        ? 'bg-[#0B1426]/90 border-[#182B48] text-slate-100' 
        : 'bg-[#063B2A]/95 border-[#0A4D37] text-white'
    }`}>
      {/* Indian Tricolor Accent Strip */}
      <div className="h-1 w-full bg-gradient-to-r from-[#FF9933] via-[#FFFFFF] to-[#138808]" role="presentation" />

      <div className="px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        
        {/* Left: Mobile Menu Toggle & Page Breadcrumb */}
        <div className="flex items-center space-x-3">
          {/* Mobile Hamburger Button */}
          <button
            onClick={onOpenMobileMenu}
            className="p-2 rounded-xl text-emerald-200 hover:bg-[#0B4A35] hover:text-white dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden cursor-pointer"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Page Title & Status */}
          <div className="flex items-center space-x-2">
            <h1 className="font-extrabold text-sm sm:text-base tracking-tight text-white">
              {getPageTitle()}
            </h1>
            {role === 'officer' && (
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-300 border border-blue-300 dark:border-blue-800 font-mono">
                <ShieldCheck className="w-3 h-3 text-blue-600" />
                <span>Agri Officer</span>
              </span>
            )}
          </div>
        </div>

        {/* Right: Weather Telemetry Chip & Quick Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">

          {/* Quick Voice Assistant Trigger (Kisan One) */}
          <button
            onClick={() => setIsChotaKissanOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black shadow-md border border-emerald-300/40 transition-all cursor-pointer hover:scale-105 active:scale-95"
            title="Talk to Kisan One AI Voice Assistant"
          >
            <span>🌱</span>
            <span className="hidden sm:inline font-mono">Kisan One</span>
            <Mic className="w-3.5 h-3.5 text-emerald-100 animate-pulse" />
          </button>

          {/* Live Farm Weather Chip */}
          <div className={`hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-xl border text-xs font-black font-mono ${
            isDark ? 'bg-[#0c1626] border-[#1c2c4a] text-slate-300' : 'bg-[#0B4A35] border-[#0E5B42] text-emerald-100'
          }`}>
            <CloudSun className="w-4 h-4 text-amber-400" />
            <span>Sangli • 29.4°C • 68% RH</span>
          </div>

          {/* Quick Cart Trigger (Mobile View) */}
          {role === 'farmer' && (
            <button
              onClick={() => setIsCartModalOpen(true)}
              className="lg:hidden relative p-2 rounded-xl bg-[#0B4A35] dark:bg-slate-800 border border-[#0E5B42] dark:border-slate-700 text-emerald-200 dark:text-emerald-400 cursor-pointer"
              title="Open Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-white text-[9px] font-mono font-black flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </button>
          )}

          {/* Language Quick Trigger (Mobile View) */}
          <button
            onClick={() => setIsLanguageModalOpen(true)}
            className="lg:hidden p-2 rounded-xl border border-[#0E5B42] dark:border-slate-800 bg-[#0B4A35] text-emerald-200 dark:text-slate-300 cursor-pointer"
            title="Language"
          >
            <Globe className="w-4 h-4 text-emerald-300 dark:text-emerald-400" />
          </button>

          {/* User Quick Switcher (Mobile View) */}
          <div
            onClick={() => setIsAccountSwitcherOpen(true)}
            className="lg:hidden w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center font-black text-xs cursor-pointer shadow-xs"
            title="Profile"
          >
            {currentUser.avatar || '👨‍🌾'}
          </div>

        </div>

      </div>
    </header>
  );
};
