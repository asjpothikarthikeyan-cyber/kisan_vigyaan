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
    { id: 'cropSell', labelEn: 'Sell Crop & Produce', defaultLabel: 'Sell Crop & Produce', icon: Sprout },
    { id: 'market', labelKey: 'navMarket', defaultLabel: 'Kisan Market', icon: ShoppingBag },
    { id: 'alerts', labelKey: 'navAlerts', defaultLabel: 'Outbreak Alerts', icon: Bell, badge: '3' }
  ];

  const knowledgeNavItems = [
    { id: 'esp32LiveData', labelEn: 'Zone Monitoring', icon: Cpu },
    { id: 'chotaKissan', labelEn: 'Kisan One (Voice AI)', icon: Mic },
    { id: 'roiCalculator', labelEn: 'Yield & ROI Calculator', icon: Calculator },
    { id: 'environmentalPrediction', labelEn: 'AI Disease Prediction', icon: Activity },
    { id: 'riskConsequences', labelEn: 'Risk & Consequences', icon: ShieldAlert },
    { id: 'satelliteMapping', labelEn: 'Satellite GIS Map', icon: Satellite },
    { id: 'proTips', labelEn: 'Agronomy Tips & Dosage', icon: Lightbulb },
    { id: 'govtSchemes', labelEn: 'Govt Schemes & PM-KISAN', icon: Landmark },
    { id: 'statistics', labelEn: 'Disease Surveillance', icon: BarChart3 },
    { id: 'farmerCommunity', labelEn: 'Farmer Forum & Q&A', icon: Users },
    { id: 'reports', labelEn: 'Field Reports & Soil Health', icon: FileText }
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
    { id: 'roiCalculator', labelEn: 'Yield & ROI Calculator', icon: Calculator },
    { id: 'environmentalPrediction', labelEn: 'AI Disease Prediction', icon: Activity },
    { id: 'riskConsequences', labelEn: 'Risk & Consequences', icon: ShieldAlert },
    { id: 'satelliteMapping', labelEn: 'Satellite GIS Map', icon: Satellite },
    { id: 'statistics', labelEn: 'Disease Surveillance', icon: BarChart3 },
    { id: 'farmerCommunity', labelEn: 'Farmer Forum & Q&A', icon: Users }
  ];

  const totalCartCount = (cart || []).reduce((sum, item) => sum + (item.quantity || 1), 0);

  const isPrivileged = role === 'officer' || role === 'ngo';

  const getItemLabel = (item) => {
    if (lang === 'ta' && item.labelTa) return item.labelTa;
    if (lang === 'mr' && item.labelMr) return item.labelMr;
    if (lang === 'hi' && item.labelHi) return item.labelHi;
    return item.labelEn || item.defaultLabel || t(item.labelKey, item.defaultLabel);
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
            ? 'bg-blue-50 text-blue-700'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <div className="flex items-center space-x-3 truncate">
          <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
            isActive ? 'text-blue-600' : 'text-gray-400'
          }`} />
          <span className="tracking-tight truncate">{label}</span>
        </div>

        {item.badge && (
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
            isActive ? 'bg-blue-600 text-white' : 'bg-red-500 text-white'
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
          className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 lg:hidden animate-fadeIn"
        />
      )}

      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 flex flex-col justify-between transition-transform duration-300 ease-in-out
        w-64 border-r border-gray-200 bg-white
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        
        {/* Top Branding Section */}
        <div>
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <div 
              onClick={() => handleNavClick(isPrivileged ? 'dashboard' : 'home')}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-sm group-hover:scale-105 transition-transform shrink-0">
                <Sprout className="w-6 h-6" />
              </div>
              <div className="truncate">
                <span className="font-bold text-base tracking-tight text-gray-900 block">
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
                className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 lg:hidden cursor-pointer"
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
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-4 py-1 block">
                  Operations
                </span>
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
              <div className="space-y-1 pt-4 border-t border-gray-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-4 py-1 block">
                  GIS & Tools
                </span>
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
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-4 py-1 block">
                  Main Menu
                </span>
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
              <div className="space-y-1 pt-4 border-t border-gray-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-4 py-1 block">
                  Tools & Knowledge
                </span>
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
        <div className="p-4 border-t border-gray-100 space-y-2 bg-gray-50">
          <div className="flex items-center justify-around">
            <button 
              onClick={() => setIsLanguageModalOpen(true)}
              className="p-2.5 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-colors cursor-pointer"
              title="Change Language"
            >
              <Globe className="w-4 h-4" />
            </button>

            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-colors cursor-pointer"
              title="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button 
              onClick={() => setIsAccountSwitcherOpen(true)}
              className="p-2.5 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-colors cursor-pointer"
              title="Switch Account"
            >
              <User className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
