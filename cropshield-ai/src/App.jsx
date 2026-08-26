import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { MobileTopHeader } from './components/mobile/MobileTopHeader';
import { MobileBottomNav } from './components/mobile/MobileBottomNav';
import { FarmerHomeScreen } from './components/mobile/FarmerHomeScreen';
import { FarmerCameraScanner } from './components/mobile/FarmerCameraScanner';
import { FarmerAlertsFeed } from './components/mobile/FarmerAlertsFeed';
import { FarmerMarketDecisions } from './components/mobile/FarmerMarketDecisions';
import { FarmerMoreMenu } from './components/mobile/FarmerMoreMenu';

// Sub-modules accessible via More Menu
import { ProAgronomyTips } from './components/protips/ProAgronomyTips';
import { GovtSchemes } from './components/schemes/GovtSchemes';
import { StatisticsTrends } from './components/statistics/StatisticsTrends';
import { SatelliteMapping } from './components/satellite/SatelliteMapping';
import { FarmerCommunity } from './components/community/FarmerCommunity';
import { MyReports } from './components/farmer/MyReports';
import { PestTrapMonitor } from './components/sensors/PestTrapMonitor';
import { ArrowLeft } from 'lucide-react';

function MainAppShell() {
  const { theme, lang } = useApp();
  const [activeTab, setActiveTab] = useState('home');
  const isDark = theme === 'dark';

  const isSubView = ['proTips', 'govtSchemes', 'statistics', 'satelliteMapping', 'farmerCommunity', 'reports', 'deviceManagement'].includes(activeTab);

  return (
    <div className={`flex flex-col min-h-screen font-sans transition-colors ${
      isDark ? 'bg-[#070c18] text-slate-100' : 'bg-[#F4F6F4] text-slate-900'
    }`}>
      {/* 1. Indian National Tricolor Accent Strip */}
      <div className="tricolor-strip shrink-0" role="presentation" />

      {/* 2. Phone-First Top Bar */}
      <MobileTopHeader onNavigate={setActiveTab} />

      {/* 3. Sub-View Back Navigation Bar (if in a reference screen from More menu) */}
      {isSubView && (
        <div className={`px-4 py-2 border-b flex items-center justify-between max-w-lg mx-auto w-full ${
          isDark ? 'bg-[#090f1d] border-[#16233b]' : 'bg-white border-slate-200'
        }`}>
          <button
            onClick={() => setActiveTab('more')}
            className="flex items-center gap-1.5 text-xs font-bold text-[#1B5E20] hover:text-[#154D1A] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{lang === 'mr' ? 'मागे जा (अधिक मेनू)' : 'Back to More Menu'}</span>
          </button>
        </div>
      )}

      {/* 4. Main Scrollable Viewport (One Clear Decision Per Screen) */}
      <main className="flex-1 w-full max-w-lg mx-auto">
        {/* Core 5 Mobile Tabs */}
        {activeTab === 'home' && <FarmerHomeScreen onNavigate={setActiveTab} />}
        {activeTab === 'scan' && <FarmerCameraScanner onNavigate={setActiveTab} />}
        {activeTab === 'alerts' && <FarmerAlertsFeed onNavigate={setActiveTab} />}
        {activeTab === 'market' && <FarmerMarketDecisions onNavigate={setActiveTab} />}
        {activeTab === 'more' && <FarmerMoreMenu onNavigate={setActiveTab} />}

        {/* Reference Views from More Menu */}
        {activeTab === 'proTips' && <div className="p-3"><ProAgronomyTips /></div>}
        {activeTab === 'govtSchemes' && <div className="p-3"><GovtSchemes /></div>}
        {activeTab === 'statistics' && <div className="p-3"><StatisticsTrends /></div>}
        {activeTab === 'satelliteMapping' && <div className="p-3"><SatelliteMapping /></div>}
        {activeTab === 'farmerCommunity' && <div className="p-3"><FarmerCommunity /></div>}
        {activeTab === 'reports' && <div className="p-3"><MyReports /></div>}
        {activeTab === 'deviceManagement' && <div className="p-3"><PestTrapMonitor /></div>}
      </main>

      {/* 5. Phone-First Bottom Navigation Bar (5 Icons Max) */}
      <MobileBottomNav activeTab={isSubView ? 'more' : activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainAppShell />
    </AppProvider>
  );
}
