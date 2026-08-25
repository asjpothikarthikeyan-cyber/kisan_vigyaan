import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  FileSpreadsheet, 
  Map as MapIcon, 
  Users, 
  Bell, 
  Settings, 
  LogOut, 
  TrendingUp, 
  AlertOctagon, 
  ShieldAlert, 
  Activity, 
  Calendar, 
  ChevronDown, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  Radio, 
  Download, 
  Send,
  Sparkles,
  ArrowUpRight,
  Menu,
  X
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { RiskMapLeaflet } from './RiskMapLeaflet';
import { ReportsReviewQueue } from './ReportsReviewQueue';
import { AdvisoryBroadcaster } from './AdvisoryBroadcaster';
import { FarmerDirectory } from './FarmerDirectory';

export const OfficerDashboard = () => {
  const { 
    t, 
    lang, 
    officerTab, 
    setOfficerTab, 
    setRole, 
    officerProfile,
    surveillanceStats,
    diseaseTrendData,
    topDiseasesDistribution,
    reports,
    hotspots
  } = useApp();

  const [dateRange, setDateRange] = useState('20 May - 27 May 2024');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pendingReportsCount = reports.filter(r => r.status.includes('Review') || r.status.includes('Under')).length;

  const sidebarLinks = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'reportsQueue', label: 'Reports', icon: FileSpreadsheet, badge: pendingReportsCount },
    { id: 'riskMap', label: 'Risk Map', icon: MapIcon },
    { id: 'farmers', label: 'Farmers', icon: Users },
    { id: 'advisories', label: 'Alerts', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex h-[calc(100vh-58px)] bg-slate-100 overflow-hidden font-sans select-none">
      {/* Sidebar Navigation matching Mockup (Forest Green #124930) */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-[#124930] text-white flex flex-col justify-between transition-transform duration-300 ease-in-out md:static md:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-0 max-md:-translate-x-full'}
      `}>
        <div>
          {/* Sidebar Brand */}
          <div className="p-5 flex items-center justify-between border-b border-emerald-800/80">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 font-black">
                CS
              </div>
              <span className="font-extrabold text-base tracking-tight">CropShield AI</span>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-emerald-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 mt-2">
            {sidebarLinks.map((item) => {
              const Icon = item.icon;
              const isActive = officerTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setOfficerTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-emerald-600/90 text-white shadow-md'
                      : 'text-emerald-100/80 hover:bg-emerald-800/50 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>

                  {item.badge > 0 && (
                    <span className="px-2 py-0.5 text-[10px] bg-red-500 text-white rounded-full font-extrabold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Officer Profile & Logout */}
        <div className="p-4 border-t border-emerald-800/80 space-y-3">
          <div className="p-3 bg-emerald-950/60 rounded-xl border border-emerald-800/50 flex items-center space-x-3">
            <div className="text-2xl">{officerProfile.avatar}</div>
            <div className="text-left overflow-hidden">
              <p className="font-bold text-xs truncate">{officerProfile.name}</p>
              <p className="text-[10px] text-emerald-300 truncate">Sangli Agri Extension Dept</p>
            </div>
          </div>

          <button
            onClick={() => setRole('farmer')}
            className="w-full flex items-center space-x-2 px-3 py-2 text-xs font-semibold text-emerald-200 hover:text-white hover:bg-emerald-800/50 rounded-xl transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Switch to Farmer View</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Bar matching mockup */}
        <header className="bg-white border-b border-gray-200 px-5 py-3.5 flex items-center justify-between shadow-xs sticky top-0 z-20">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-1.5 -ml-1 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-extrabold text-gray-900 tracking-tight">
              {officerTab === 'dashboard' && t('adminDashboard')}
              {officerTab === 'reportsQueue' && 'Farmer Field Reports Queue & Validation'}
              {officerTab === 'riskMap' && 'Geospatial Hotspots & Spore Dispersal Map'}
              {officerTab === 'farmers' && 'Sangli District Farmer Registry'}
              {officerTab === 'advisories' && 'Emergency Advisory Broadcaster'}
              {officerTab === 'settings' && 'Surveillance Settings'}
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            {/* Date Range Selector matching mockup */}
            <div className="flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 border border-gray-300/80 px-3 py-1.5 rounded-xl text-xs font-semibold text-gray-700 cursor-pointer shadow-xs">
              <Calendar className="w-3.5 h-3.5 text-gray-500" />
              <span>{dateRange}</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </div>

            <button
              onClick={() => window.print()}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Brief</span>
            </button>
          </div>
        </header>

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-6">
          {officerTab === 'dashboard' && (
            <>
              {/* 4 Top KPI Stat Cards matching mockup */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total Reports: 1,248 (+18%) */}
                <div className="bg-white border border-gray-200/90 rounded-2xl p-4 shadow-xs">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                    {t('totalReports')}
                  </span>
                  <div className="flex items-baseline justify-between mt-2">
                    <span className="text-2xl sm:text-3xl font-black text-gray-900">1,248</span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center">
                      ↑ 18%
                    </span>
                  </div>
                </div>

                {/* Diseases Detected: 7 (+12%) */}
                <div className="bg-white border border-gray-200/90 rounded-2xl p-4 shadow-xs">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                    {t('diseasesDetected')}
                  </span>
                  <div className="flex items-baseline justify-between mt-2">
                    <span className="text-2xl sm:text-3xl font-black text-gray-900">7</span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center">
                      ↑ 12%
                    </span>
                  </div>
                </div>

                {/* High Risk Areas: 23 (+15%) */}
                <div className="bg-white border border-gray-200/90 rounded-2xl p-4 shadow-xs">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                    {t('highRiskAreas')}
                  </span>
                  <div className="flex items-baseline justify-between mt-2">
                    <span className="text-2xl sm:text-3xl font-black text-red-600">23</span>
                    <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md flex items-center">
                      ↑ 15%
                    </span>
                  </div>
                </div>

                {/* Farmers Active: 842 (+20%) */}
                <div className="bg-white border border-gray-200/90 rounded-2xl p-4 shadow-xs">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                    {t('farmersActive')}
                  </span>
                  <div className="flex items-baseline justify-between mt-2">
                    <span className="text-2xl sm:text-3xl font-black text-gray-900">842</span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center">
                      ↑ 20%
                    </span>
                  </div>
                </div>
              </div>

              {/* Main Visualizations Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* 1. Disease Trend Line Chart (Matching mockup) */}
                <div className="xl:col-span-2 bg-white border border-gray-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between min-h-[360px]">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-extrabold text-gray-900 tracking-tight">
                      {t('diseaseTrend')}
                    </h3>
                    <div className="flex items-center space-x-3 text-xs font-semibold">
                      <span className="flex items-center gap-1.5 text-gray-700">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#dc2626]"></span> Early Blight
                      </span>
                      <span className="flex items-center gap-1.5 text-gray-700">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#16a34a]"></span> Leaf Spot
                      </span>
                      <span className="flex items-center gap-1.5 text-gray-700">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]"></span> Aphids
                      </span>
                    </div>
                  </div>

                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={diseaseTrendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} domain={[0, 200]} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1e293b', color: '#fff', borderRadius: '12px', border: 'none', fontSize: '12px' }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="earlyBlight" 
                          stroke="#dc2626" 
                          strokeWidth={2.5} 
                          dot={{ r: 4, fill: '#dc2626' }} 
                          activeDot={{ r: 6 }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="leafSpot" 
                          stroke="#16a34a" 
                          strokeWidth={2.5} 
                          dot={{ r: 4, fill: '#16a34a' }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="aphids" 
                          stroke="#eab308" 
                          strokeWidth={2.5} 
                          dot={{ r: 4, fill: '#eab308' }} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* 2. Top Diseases Donut Chart (Matching mockup) */}
                <div className="bg-white border border-gray-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between min-h-[360px]">
                  <h3 className="text-sm font-extrabold text-gray-900 tracking-tight mb-2">
                    {t('topDiseases')}
                  </h3>

                  <div className="h-52 w-full flex items-center justify-center relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={topDiseasesDistribution}
                          innerRadius={55}
                          outerRadius={80}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {topDiseasesDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => `${value}%`}
                          contentStyle={{ backgroundColor: '#1e293b', color: '#fff', borderRadius: '12px', border: 'none', fontSize: '12px' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute text-center pointer-events-none">
                      <span className="text-xl font-black text-gray-900">7</span>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Diseases</p>
                    </div>
                  </div>

                  {/* Donut Legend with exact percentages matching mockup */}
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs font-semibold pt-2 border-t border-gray-100">
                    {topDiseasesDistribution.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-gray-700 truncate">
                          <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }}></span>
                          <span className="truncate">{item.name}</span>
                        </span>
                        <strong className="text-gray-900 ml-1">{item.value}%</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3. Risk Map (Hotspots) Card matching mockup */}
              <div className="bg-white border border-gray-200/90 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
                      <MapIcon className="w-4 h-4 text-emerald-700" />
                      {t('riskMapHotspots')} (Sangli Agricultural Clusters)
                    </h3>
                    <p className="text-xs text-gray-500 font-medium mt-0.5">
                      Live micro-satellite & farm report heatmap overlay with active spore dispersal radiuses
                    </p>
                  </div>

                  <button
                    onClick={() => setOfficerTab('advisories')}
                    className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Broadcast Hotspot Alert</span>
                  </button>
                </div>

                <div className="h-96 w-full rounded-2xl overflow-hidden">
                  <RiskMapLeaflet />
                </div>
              </div>
            </>
          )}

          {officerTab === 'reportsQueue' && <ReportsReviewQueue />}
          {officerTab === 'riskMap' && (
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs space-y-4">
              <h2 className="text-base font-extrabold text-gray-900">Geospatial Surveillance & Hotspot Clustering</h2>
              <div className="h-[550px] w-full rounded-2xl overflow-hidden">
                <RiskMapLeaflet />
              </div>
            </div>
          )}
          {officerTab === 'farmers' && <FarmerDirectory />}
          {officerTab === 'advisories' && <AdvisoryBroadcaster />}
          {officerTab === 'settings' && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 max-w-xl mx-auto space-y-4 text-xs">
              <h3 className="text-base font-extrabold text-gray-900">Extension Officer System Configuration</h3>
              <p className="text-gray-500">Configure alert thresholds, automated SMS triggers, and government Krishi Seva Kendra database integrations.</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div>
                    <strong>Automated Outbreak SMS Alert</strong>
                    <p className="text-[11px] text-gray-500">Send instant SMS when 5+ reports are confirmed in a 5km radius</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-emerald-600 rounded" />
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div>
                    <strong>Subsidized Bio-Pesticide Auto-Authorization</strong>
                    <p className="text-[11px] text-gray-500">Auto-issue 100% subsidy voucher to verified farmers</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-emerald-600 rounded" />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
