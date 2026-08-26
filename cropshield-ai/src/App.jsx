import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { DarkSidebar } from './components/layout/DarkSidebar';
import { TopHeader } from './components/layout/TopHeader';
import { OverviewDashboard } from './components/dashboard/OverviewDashboard';
import { SmartVisionScanner } from './components/scanner/SmartVisionScanner';
import { StatisticsTrends } from './components/statistics/StatisticsTrends';
import { SatelliteMapping } from './components/satellite/SatelliteMapping';
import { DisasterPrediction } from './components/disaster/DisasterPrediction';
import { GovtSchemes } from './components/schemes/GovtSchemes';
import { FarmerCommunity } from './components/community/FarmerCommunity';
import { PestTrapMonitor } from './components/sensors/PestTrapMonitor';
import { MyReports } from './components/farmer/MyReports';
import { AlertCenter } from './components/alerts/AlertCenter';
import { AgriMarketplace } from './components/marketplace/AgriMarketplace';
import { ProAgronomyTips } from './components/protips/ProAgronomyTips';

function MainAppShell() {
  const { theme } = useApp();
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isDark = theme === 'dark';

  return (
    <div className={`flex flex-col h-screen font-sans overflow-hidden transition-colors ${
      isDark ? 'bg-[#070c18] text-slate-100' : 'bg-[#F7F9F7] text-slate-800'
    }`}>
      {/* 1. Indian Government Tricolor Accent Strip (Saffron / White / Green, 3px height) */}
      <div className="tricolor-strip shrink-0" role="presentation" />

      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* 2. Left Sidebar Navigation */}
        <DarkSidebar 
          activeView={activeView} 
          setActiveView={setActiveView} 
          isOpen={sidebarOpen} 
          setIsOpen={setSidebarOpen} 
        />

        {/* 3. Main Content Workspace */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Top Control Bar with Time, Search, Language, Theme, Alerts, User Avatar */}
          <TopHeader 
            activeView={activeView} 
            onOpenSidebar={() => setSidebarOpen(true)} 
            onNavigate={setActiveView}
          />

          {/* Scrollable Viewport Area */}
          <main className={`flex-1 overflow-y-auto p-3 sm:p-5 lg:p-6 ${isDark ? 'bg-[#070c18]' : 'bg-[#F7F9F7]'}`}>
            <div className="max-w-7xl mx-auto">
              {activeView === 'dashboard' && <OverviewDashboard onNavigate={setActiveView} />}
              {activeView === 'marketplace' && <AgriMarketplace />}
              {activeView === 'proTips' && <ProAgronomyTips />}
              {activeView === 'smartScanner' && <SmartVisionScanner />}
              {activeView === 'statistics' && <StatisticsTrends />}
              {activeView === 'satelliteMapping' && <SatelliteMapping />}
              {activeView === 'disasterPrediction' && <DisasterPrediction />}
              {activeView === 'govtSchemes' && <GovtSchemes />}
              {activeView === 'farmerCommunity' && <FarmerCommunity />}
              {activeView === 'alertCenter' && <AlertCenter onNavigate={setActiveView} />}
              {activeView === 'deviceManagement' && <PestTrapMonitor />}
              {activeView === 'reports' && <MyReports />}
            </div>
          </main>
        </div>
      </div>
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
