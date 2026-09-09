import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { WebLeftSidebar } from './components/layout/WebLeftSidebar';
import { WebTopHeader } from './components/layout/WebTopHeader';
import { WebBottomNav } from './components/layout/WebBottomNav';
import { KisanLiveBackground } from './components/layout/KisanLiveBackground';
import { LanguageModal } from './components/layout/LanguageModal';
import { CartCheckoutModal } from './components/market/CartCheckoutModal';
import { AccountSwitcherModal } from './components/auth/AccountSwitcherModal';
import { LoginPage } from './components/auth/LoginPage';
import { EmergencySMSToast } from './components/common/EmergencySMSToast';

// Farmer Views
import { WebFarmerHomeScreen } from './components/web/WebFarmerHomeScreen';
import { WebFarmerScanner } from './components/web/WebFarmerScanner';
import { WebFarmerAlerts } from './components/web/WebFarmerAlerts';
import { WebFarmerMarket } from './components/web/WebFarmerMarket';
import { FarmerCropSellPortal } from './components/market/FarmerCropSellPortal';
import { LiveESP32TelemetryPanel } from './components/telemetry/LiveESP32TelemetryPanel';
import { WebFarmerMoreMenu } from './components/web/WebFarmerMoreMenu';

// Agri Officer Dashboard
import { OfficerDashboard } from './components/officer/OfficerDashboard';

// Advanced GIS Satellite Mapping
import { WebGISCommandMap } from './components/satellite/WebGISCommandMap';

// Sub-modules accessible via More Menu
import { ProAgronomyTips } from './components/protips/ProAgronomyTips';
import { GovtSchemes } from './components/schemes/GovtSchemes';
import { StatisticsTrends } from './components/statistics/StatisticsTrends';
import { FarmerCommunity } from './components/community/FarmerCommunity';
import { MyReports } from './components/farmer/MyReports';
import { RiskThreatsConsequences } from './components/risk/RiskThreatsConsequences';
import { EnvironmentalPredictionDashboard } from './components/prediction/EnvironmentalPredictionDashboard';
import { YieldROICalculator } from './components/calculator/YieldROICalculator';
import { ChotaKissanModal } from './components/voice/ChotaKissanModal';
import { ChotaKissanDashboardView } from './components/voice/ChotaKissanDashboardView';
import { ArrowLeft, Layers, Mic } from 'lucide-react';

function MainAppShell() {
  const { theme, lang, role, activeTab, setActiveTab, isChotaKissanOpen, setIsChotaKissanOpen } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDark = theme === 'dark';

  const isSubView = ['proTips', 'govtSchemes', 'statistics', 'satelliteMapping', 'farmerCommunity', 'reports', 'riskConsequences', 'environmentalPrediction', 'chotaKissan', 'roiCalculator'].includes(activeTab);

  const getSubViewTitle = () => {
    switch (activeTab) {
      case 'roiCalculator': return lang === 'ta' ? 'வருவாய் மற்றும் லாப கால்குலேட்டர்' : lang === 'mr' ? 'उत्पन्न आणि नफा कॅल्क्युलेटर' : 'Dynamic Yield & ROI Calculator';
      case 'chotaKissan': return lang === 'ta' ? 'கிசான் ஒன் (AI குரல் உதவியாளர்)' : lang === 'mr' ? 'किसान वन (एआय आवाज सहाय्यक)' : '🌱 Kisan One AI Voice Assistant';
      case 'environmentalPrediction': return lang === 'ta' ? 'சுற்றுச்சூழல் நோய் முன்கணிப்பு இயந்திரம்' : lang === 'mr' ? 'हवामान आधारित पीक रोग अंदाज प्रणाली' : 'AI Environmental Disease Prediction Engine';
      case 'riskConsequences': return lang === 'ta' ? 'அபாயங்கள் & பயிர் பாதிப்பு விளைவுகள்' : lang === 'mr' ? 'जोखीम, मर्यादा काळ व पिकांवरील परिणाम' : 'Risk & Threats Consequences Matrix';
      case 'satelliteMapping': return lang === 'ta' ? 'இஸ்ரோ செயற்கைக்கோள் வரைபடம்' : lang === 'mr' ? 'इस्रो / सेंटिनेल-२ उपग्रह पीक नकाशा' : 'Sentinel-2 GIS Satellite Command Center';
      case 'proTips': return lang === 'ta' ? 'விவசாய வல்லுநர் குறிப்புகள்' : lang === 'mr' ? 'तज्ज्ञ कृषी सल्ला व खत वेळापत्रक' : 'Pro Agronomy Tips & Dosage Matrix';
      case 'govtSchemes': return lang === 'ta' ? 'அரசு திட்டங்கள் & மானியங்கள்' : lang === 'mr' ? 'शासकीय योजना व डीबीटी अनुदान' : 'Govt. Schemes & DBT Subsidies';
      case 'statistics': return lang === 'ta' ? 'பருவநிலை புள்ளிவிவரங்கள்' : lang === 'mr' ? 'विभागीय रोग आकडेवारी व कल' : 'Regional Disease Surveillance & Trends';
      case 'farmerCommunity': return lang === 'ta' ? 'விவசாயிகள் மன்றம்' : lang === 'mr' ? 'शेतकरी मंच व कृषी अधिकारी संवाद' : 'Farmer Community & Extension Q&A';
      case 'reports': return lang === 'ta' ? 'கள ஆய்வு அறிக்கைகள்' : lang === 'mr' ? 'माझे शेत अहवाल व मृदा पत्रिका' : 'My Field Reports & Soil Health Cards';
      default: return 'Reference';
    }
  };

  return (
    <div className={`relative min-h-screen font-sans transition-colors duration-300 ${
      isDark ? 'bg-[#080D1A] text-slate-100' : 'bg-[#063B2A] text-slate-900'
    }`}>
      
      {/* Live Animated Kisan Agricultural Background */}
      <KisanLiveBackground />

      {/* 1. Left Hand Side Navigation Sidebar */}
      <WebLeftSidebar 
        activeTab={activeTab} 
        onNavigate={setActiveTab} 
        mobileOpen={mobileMenuOpen} 
        setMobileOpen={setMobileMenuOpen} 
      />

      {/* Global Modals (Zero Layout Collapse!) */}
      <LanguageModal />
      <CartCheckoutModal />
      <AccountSwitcherModal />
      <LoginPage />
      <EmergencySMSToast />

      {/* 2. Main Content Viewport (Pushed right by sidebar width on desktop) */}
      <div className="lg:pl-64 flex flex-col min-h-screen min-w-0 transition-all duration-300">
        
        {/* Top Header */}
        <WebTopHeader 
          activeTab={activeTab} 
          onNavigate={setActiveTab} 
          onOpenMobileMenu={() => setMobileMenuOpen(true)} 
        />

        {/* Sub-View Back Navigation Bar (Only for Farmer Sub-Views) */}
        {role === 'farmer' && isSubView && (
          <div className={`relative z-20 border-b transition-colors ${
            isDark ? 'bg-[#0a1324]/90 border-[#16233b]' : 'bg-[#063B2A] border-[#0A4D37] text-white'
          }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between">
              <button
                onClick={() => setActiveTab('more')}
                className="flex items-center gap-2 text-xs font-black text-emerald-300 hover:text-white hover:underline cursor-pointer group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                <span>{lang === 'ta' ? '← கூடுதல் மெனுவிற்கு திரும்புக' : lang === 'mr' ? 'मागे जा (अधिक मेनू)' : 'Back to More Menu'}</span>
              </button>

              <div className="flex items-center gap-2 text-xs font-extrabold text-white">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                <span>{getSubViewTitle()}</span>
              </div>
            </div>
          </div>
        )}

        {/* Main Viewport Container (Soft Light Green Dashboard Canvas) */}
        <main className={`relative z-10 flex-1 w-full transition-colors ${
          isDark ? 'bg-transparent' : 'bg-[#EEF9F1] rounded-t-3xl lg:rounded-tl-3xl shadow-xl'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-12">
            {/* If Active Role is Officer or NGO Partner, Render Command Center or Advanced Tools */}
            {(role === 'officer' || role === 'ngo') ? (
              activeTab === 'chotaKissan' ? (
                <ChotaKissanDashboardView />
              ) : activeTab === 'environmentalPrediction' ? (
                <EnvironmentalPredictionDashboard />
              ) : activeTab === 'riskConsequences' ? (
                <RiskThreatsConsequences />
              ) : activeTab === 'satelliteMapping' ? (
                <WebGISCommandMap onNavigate={setActiveTab} />
              ) : activeTab === 'statistics' ? (
                <StatisticsTrends />
              ) : activeTab === 'farmerCommunity' ? (
                <FarmerCommunity />
              ) : (
                <OfficerDashboard />
              )
            ) : (
              /* Farmer Core Views & Sub-Views */
              <>
                {activeTab === 'home' && <WebFarmerHomeScreen onNavigate={setActiveTab} />}
                {activeTab === 'scan' && <WebFarmerScanner onNavigate={setActiveTab} />}
                {activeTab === 'cropSell' && <FarmerCropSellPortal onNavigate={setActiveTab} />}
                {activeTab === 'market' && <WebFarmerMarket onNavigate={setActiveTab} />}
                {activeTab === 'alerts' && <WebFarmerAlerts onNavigate={setActiveTab} />}
                {activeTab === 'more' && <WebFarmerMoreMenu onNavigate={setActiveTab} />}

                {/* Reference Sub-Views from More Menu */}
                {activeTab === 'esp32LiveData' && <LiveESP32TelemetryPanel />}
                {activeTab === 'chotaKissan' && <ChotaKissanDashboardView />}
                {activeTab === 'environmentalPrediction' && <EnvironmentalPredictionDashboard />}
                {activeTab === 'roiCalculator' && <YieldROICalculator />}
                {activeTab === 'riskConsequences' && <RiskThreatsConsequences />}
                {activeTab === 'satelliteMapping' && <WebGISCommandMap onNavigate={setActiveTab} />}
                {activeTab === 'proTips' && <ProAgronomyTips />}
                {activeTab === 'govtSchemes' && <GovtSchemes />}
                {activeTab === 'statistics' && <StatisticsTrends />}
                {activeTab === 'farmerCommunity' && <FarmerCommunity />}
                {activeTab === 'reports' && <MyReports />}
              </>
            )}
          </div>
        </main>

        {/* Global Floating Chota Kissan Voice Trigger Button (Bottom-Right) */}
        <div className="fixed bottom-20 lg:bottom-6 right-5 z-40">
          <button
            onClick={() => setIsChotaKissanOpen(true)}
            className="group relative flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-[#047857] to-[#065F46] hover:from-[#065F46] hover:to-[#047857] text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-emerald-300/40 cursor-pointer"
            aria-label="Open Kisan One AI Voice Assistant"
          >
            {/* Glowing Pulsating Outer Ring */}
            <span className="absolute -inset-1 rounded-full bg-emerald-400/30 blur-xs animate-ping group-hover:opacity-100 opacity-60" />
            
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-base shadow-xs shrink-0">
              🌱
            </div>
            
            <span className="text-xs font-black tracking-tight flex items-center gap-1.5 pr-1">
              <span>Kisan One</span>
              <Mic className="w-3.5 h-3.5 text-emerald-200 animate-pulse" />
            </span>
          </button>
        </div>

        {/* Global Chota Kissan Voice Assistant Modal */}
        <ChotaKissanModal 
          isOpen={isChotaKissanOpen} 
          onClose={() => setIsChotaKissanOpen(false)} 
          onNavigate={setActiveTab} 
        />

        {/* Responsive Mobile Bottom Navigation Bar (Active on Mobile < 1024px) */}
        {role === 'farmer' && (
          <div className="lg:hidden relative z-40">
            <WebBottomNav activeTab={isSubView ? 'more' : activeTab} onTabChange={setActiveTab} />
          </div>
        )}

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
