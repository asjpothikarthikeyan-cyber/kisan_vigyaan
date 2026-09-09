import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Home, Camera, Bell, ShoppingBag, Sprout, 
  ChevronRight, ShieldAlert, Activity, Mic, Cpu, Calculator,
  X, Satellite, Lightbulb, Landmark, BarChart3, Users, FileText,
  LayoutDashboard, FileSpreadsheet, Compass,
  Moon, Sun, Globe, User
} from 'lucide-react';

export const WebLeftSidebar = ({ activeTab, onNavigate, mobileOpen, setMobileOpen }) => {
  const { 
    lang, 
    t, 
    theme, 
    toggleTheme, 
    cart, 
    setIsLanguageModalOpen,
    setIsAccountSwitcherOpen,
    role,
    fieldReviewQueue,
    officerTab,
    setOfficerTab
  } = useApp();

  const isDark = theme === 'dark';
  const pendingOfficerCount = (fieldReviewQueue || []).filter(s => s.status === 'pending').length;

  const primaryNavItems = [
    { id: 'home', labelKey: 'navHome', defaultLabel: 'Home Dashboard', labelTa: 'முகப்பு', labelMr: 'मुख्यपृष्ठ', labelHi: 'डैशबोर्ड', icon: Home },
    { id: 'scan', labelKey: 'navScan', defaultLabel: 'AI Leaf Scanner', labelTa: 'ஸ்கேனர்', labelMr: 'स्कॅनर', labelHi: 'स्कैनर', icon: Camera },
    { id: 'cropSell', labelKey: 'navSellCrop', defaultLabel: 'Sell Crop & Produce', icon: Sprout },
    { id: 'market', labelKey: 'navMarket', defaultLabel: 'Kisan Market', icon: ShoppingBag },
    { id: 'alerts', labelKey: 'navAlerts', defaultLabel: 'Outbreak Alerts', icon: Bell, badge: '3' }
  ];

  const knowledgeNavItems = [
    { id: 'esp32LiveData', labelKey: 'navZoneMonitoring', defaultLabel: 'Zone Monitoring', icon: Cpu },
    { id: 'chotaKissan', labelEn: 'Kisan One (Voice AI)', icon: Mic },
    { id: 'roiCalculator', labelKey: 'navRoiCalculator', defaultLabel: 'Yield & ROI Calculator', icon: Calculator },
    { id: 'environmentalPrediction', labelKey: 'navDiseasePrediction', defaultLabel: 'AI Disease Prediction', icon: Activity },
    { id: 'riskConsequences', labelKey: 'navRiskConsequences', defaultLabel: 'Risk & Consequences', icon: ShieldAlert },
    { id: 'satelliteMapping', labelKey: 'navSatelliteMap', defaultLabel: 'Satellite GIS Map', icon: Satellite },
    { id: 'proTips', labelKey: 'navProTips', defaultLabel: 'Agronomy Tips & Dosage', icon: Lightbulb },
    { id: 'govtSchemes', labelKey: 'navGovtSchemes', defaultLabel: 'Govt Schemes & PM-KISAN', icon: Landmark },
    { id: 'statistics', labelKey: 'navStatistics', defaultLabel: 'Disease Surveillance', icon: BarChart3 },
    { id: 'farmerCommunity', labelKey: 'navFarmerCommunity', defaultLabel: 'Farmer Forum & Q&A', icon: Users },
    { id: 'reports', labelKey: 'navReports', defaultLabel: 'Field Reports & Soil Health', icon: FileText }
  ];

  const officerPrimaryNavItems = [
    { id: 'dashboard', labelEn: 'Analytics Dashboard', icon: LayoutDashboard },
    { id: 'reviewQueue', labelEn: 'Field Review Queue', icon: FileSpreadsheet, badge: pendingOfficerCount > 0 ? `${pendingOfficerCount}` : null },
    { id: 'riskMap', labelEn: 'GIS Risk Radar', icon: Compass },
    { id: 'advisories', labelEn: 'Broadcast Alerts', icon: Bell },
    { id: 'farmers', labelEn: 'Farmer Registry', icon: Users }
  ];

  const officerToolsNavItems = [
    { id: 'chotaKissan', labelEn: 'Kisan One (Voice AI)', icon: Mic },
    { id: 'roiCalculator', labelKey: 'navRoiCalculator', defaultLabel: 'Yield & ROI Calculator', icon: Calculator },
    { id: 'environmentalPrediction', labelKey: 'navDiseasePrediction', defaultLabel: 'AI Disease Prediction', icon: Activity },
    { id: 'riskConsequences', labelKey: 'navRiskConsequences', defaultLabel: 'Risk & Consequences', icon: ShieldAlert },
    { id: 'satelliteMapping', labelKey: 'navSatelliteMap', defaultLabel: 'Satellite GIS Map', icon: Satellite },
    { id: 'statistics', labelKey: 'navStatistics', defaultLabel: 'Disease Surveillance', icon: BarChart3 },
    { id: 'farmerCommunity', labelKey: 'navFarmerCommunity', defaultLabel: 'Farmer Forum & Q&A', icon: Users }
  ];

  const totalCartCount = (cart || []).reduce((sum, item) => sum + (item.quantity || 1), 0);

  const isPrivileged = role === 'officer' || role === 'ngo';

  const getItemLabel = (item) => {
    if (lang === 'ta' && item.labelTa) return item.labelTa;
    if (lang === 'mr' && item.labelMr) return item.labelMr;
    if (lang === 'hi' && item.labelHi) return item.labelHi;
    return item.labelKey ? t(item.labelKey, item.defaultLabel) : (item.labelEn || item.defaultLabel);
  };

  const handleNavClick = (id) => {
    if (isPrivileged) {
      if (['dashboard', 'reviewQueue', 'riskMap', 'advisories', 'farmers'].includes(id)) {
        if (setOfficerTab) setOfficerTab(id);
        onNavigate('home');
      } else {
        onNavigate(id);
      }
    } else {
      onNavigate(id);
    }
    if (setMobileOpen) setMobileOpen(false);
  };

  const NavButton = ({ item, isActive }) => {
    const Icon = item.icon;
    const label = getItemLabel(item);

    return (
      <button
        onClick={() => handleNavClick(item.id)}
        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer group active:scale-98 ${
          isActive 
            ? (isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-50 text-emerald-700') 
            : (isDark ? 'text-slate-400 hover:bg-slate-800 hover:text-slate-200' : '${isDark ? "text-slate-400 hover:bg-slate-800 hover:text-slate-200" : "text-gray-600 hover:bg-gray-100"}')
        }`}
      >
        <div className="flex items-center space-x-3 truncate">
          <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
            isActive ? (isDark ? 'text-emerald-400' : 'text-emerald-600') : (isDark ? 'text-slate-500' : 'text-gray-400')
          }`} />
          <span className="tracking-tight truncate">{label}</span>
        </div>

        {item.badge && (
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
            isActive ? (isDark ? 'bg-emerald-500 text-white' : 'bg-emerald-600 text-white') : 'bg-red-500 text-white'
          }`}>
            {item.badge}
          </span>
        )}
      </button>
    );
  };

  return (
    <>
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 lg:hidden animate-fadeIn"
        />
      )}

      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 flex flex-col justify-between transition-transform duration-300 ease-in-out
        w-64 border-r ${isDark ? "border-slate-800 bg-[#0f172a]" : "border-gray-200 bg-white"}
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        
        {/* Top Branding Section */}
        <div>
          <div className={`p-5 border-b flex items-center justify-between ${isDark ? "border-slate-800" : "border-gray-100"}`}>
            <div 
              onClick={() => handleNavClick(isPrivileged ? 'dashboard' : 'home')}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shadow-sm group-hover:scale-105 transition-transform shrink-0 ${isDark ? "bg-emerald-600 text-white" : "bg-emerald-600 text-white"}`}>
                <Sprout className="w-6 h-6" />
              </div>
              <div className="truncate">
                <span className={`font-bold text-base tracking-tight block ${isDark ? "text-slate-100" : "text-gray-900"}`}>
                  {t('appName', 'Kisan Vigyaan')}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500 block">
                  {isPrivileged ? 'Agri Officer Command' : t('kisanWeb', 'Kisan One Dashboard')}
                </span>
              </div>
            </div>

            {setMobileOpen && (
              <button 
                onClick={() => setMobileOpen(false)}
                className={`p-1.5 rounded-full lg:hidden cursor-pointer ${isDark ? "text-slate-400 hover:text-slate-200 hover:bg-slate-800" : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"}`}
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Navigation Body */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-5 custom-scrollbar">
          
          {isPrivileged ? (
            <>
              {/* Officer Operations */}
              <div className="space-y-1">
                <span className={`text-[11px] font-bold uppercase tracking-wider px-4 py-1 block ${isDark ? "text-slate-500" : "text-gray-400"}`}>{t('sectionOperations', 'Operations')}</span>
                <nav className="space-y-1">
                  {officerPrimaryNavItems.map(item => (
                    <NavButton 
                      key={item.id} 
                      item={item} 
                      isActive={!['satelliteMapping', 'statistics', 'farmerCommunity'].includes(activeTab) && officerTab === item.id} 
                    />
                  ))}
                </nav>
              </div>

              {/* Officer Tools */}
              <div className={`space-y-1 pt-4 border-t ${isDark ? "border-slate-800" : "border-gray-100"}`}>
                <span className={`text-[11px] font-bold uppercase tracking-wider px-4 py-1 block ${isDark ? "text-slate-500" : "text-gray-400"}`}>{t('sectionGisTools', 'GIS & Tools')}</span>
                <nav className="space-y-1">
                  {officerToolsNavItems.map(item => (
                    <NavButton key={item.id} item={item} isActive={activeTab === item.id} />
                  ))}
                </nav>
              </div>
            </>
          ) : (
            <>
              {/* Farmer Primary */}
              <div className="space-y-1">
                <span className={`text-[11px] font-bold uppercase tracking-wider px-4 py-1 block ${isDark ? "text-slate-500" : "text-gray-400"}`}>{t('sectionMainMenu', 'Main Menu')}</span>
                <nav className="space-y-1">
                  {primaryNavItems.map((item) => {
                    const isMarketRoute = item.id === 'market';
                    const effectiveBadge = isMarketRoute && totalCartCount > 0 ? `${totalCartCount}` : item.badge;
                    return (
                      <NavButton 
                        key={item.id} 
                        item={{ ...item, badge: effectiveBadge }} 
                        isActive={activeTab === item.id} 
                      />
                    );
                  })}
                </nav>
              </div>

              {/* Farmer Tools */}
              <div className={`space-y-1 pt-4 border-t ${isDark ? "border-slate-800" : "border-gray-100"}`}>
                <span className={`text-[11px] font-bold uppercase tracking-wider px-4 py-1 block ${isDark ? "text-slate-500" : "text-gray-400"}`}>{t('sectionToolsKnowledge', 'Tools & Knowledge')}</span>
                <nav className="space-y-1">
                  {knowledgeNavItems.map(item => (
                    <NavButton key={item.id} item={item} isActive={activeTab === item.id} />
                  ))}
                </nav>
              </div>
            </>
          )}
        </div>

        {/* Bottom Profile / Quick Settings */}
        <div className={`p-4 border-t space-y-2 ${isDark ? "border-slate-800 bg-[#060c18]" : "border-gray-100 bg-gray-50"}`}>
          <div className="flex flex-col space-y-1">
            <button 
              onClick={() => setIsLanguageModalOpen(true)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${isDark ? "text-slate-400 hover:bg-slate-800 hover:text-slate-200" : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"}`}
            >
              <Globe className="w-4 h-4 shrink-0" />
              <span className="truncate">{t('navLanguage', 'Language / மொழி')}</span>
            </button>

            <button 
              onClick={toggleTheme}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${isDark ? "text-slate-400 hover:bg-slate-800 hover:text-slate-200" : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"}`}
            >
              {isDark ? <Sun className="w-4 h-4 shrink-0" /> : <Moon className="w-4 h-4 shrink-0" />}
              <span className="truncate">{isDark ? t('navThemeLight', 'Light Mode') : t('navThemeDark', 'Dark Mode')}</span>
            </button>

            <button 
              onClick={() => setIsAccountSwitcherOpen(true)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${isDark ? "text-slate-400 hover:bg-slate-800 hover:text-slate-200" : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"}`}
            >
              <User className="w-4 h-4 shrink-0" />
              <span className="truncate">{t('navAccount', 'Profile & Account')}</span>
            </button>
          </div>
          </div>
        </div>
      </aside>
    </>
  );
};
