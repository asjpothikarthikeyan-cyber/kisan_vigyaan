import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { initialPlotsData } from '../../data/extendedMockData';
import { 
  Thermometer, 
  Droplets, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  AlertOctagon, 
  Zap, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  Scan, 
  ShieldCheck, 
  ChevronRight,
  Sprout,
  Radio
} from 'lucide-react';

export const OverviewDashboard = ({ onNavigate }) => {
  const { t, theme } = useApp();
  const [plots, setPlots] = useState(initialPlotsData);

  const isDark = theme === 'dark';

  const toggleDrip = (id) => {
    setPlots(prev => prev.map(p => p.id === id ? { ...p, fanOn: !p.fanOn } : p));
  };

  const toggleSprayer = (id) => {
    setPlots(prev => prev.map(p => p.id === id ? { ...p, uvOn: !p.uvOn } : p));
  };

  return (
    <div className="space-y-5 pb-10 select-none">
      {/* 1. Top Crop Health Surveillance Banner - Official Government Grade */}
      <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs ${
        isDark 
          ? 'bg-[#0b162b] border-slate-700 text-slate-200' 
          : 'bg-white border-slate-200 text-slate-800'
      }`}>
        <div className="flex items-start space-x-3.5">
          <div className="p-2.5 bg-[#1B5E20]/10 border border-[#1B5E20]/20 rounded-lg text-[#1B5E20] shrink-0 mt-0.5">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xs font-bold text-[#1B5E20] uppercase tracking-wider">
                {t('farmHealthCare') || 'Crop Health Surveillance & Monitoring'}
              </h2>
              <span className="text-[10px] bg-slate-100 text-slate-600 font-medium px-2 py-0.2 rounded border border-slate-200">
                ICAR-KVK Sangli Node
              </span>
            </div>
            <p className={`text-xs mt-1 font-medium leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <strong>Plot 1 (Rice Field)</strong> and <strong>Plot 6 (Pulses Field)</strong> are in optimal physiological condition with normal chlorophyll vegetation indices.
            </p>
            <span className="text-[11px] text-slate-500 mt-0.5 block">
              Sangli Agro-Climatic Zone • Real-Time Field Telemetry
            </span>
          </div>
        </div>

        <button 
          onClick={() => onNavigate('smartScanner')}
          className="flex items-center justify-center space-x-1.5 px-4 py-2 bg-[#1B5E20] hover:bg-[#154D1A] text-white font-medium text-xs rounded-lg transition-colors shadow-xs shrink-0 cursor-pointer"
        >
          <Scan className="w-4 h-4" />
          <span>{t('diagnoseLeaf') || 'Diagnose Crop Leaf'}</span>
        </button>
      </div>

      {/* 2. Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h3 className={`text-base font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {t('farmHealthCare') || 'Crop Field Plots & Telemetry'}
          </h3>
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
            6 Cultivated Plots Monitored
          </span>
        </div>

        <button 
          onClick={() => onNavigate('satelliteMapping')}
          className="text-[#1B5E20] hover:text-[#154D1A] font-semibold text-xs flex items-center gap-1 group cursor-pointer"
        >
          <span>{t('viewSatelliteMap') || 'View Satellite NDVI Map'}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* 3. Six Clean Government-Grade Field Plot Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {plots.map((plot) => {
          const isCritical = plot.statusType === 'critical';
          const isWarning = plot.statusType === 'warning';
          const isNormal = plot.statusType === 'normal';

          // Flat status badge chips
          const statusBadge = isCritical
            ? 'bg-red-50 text-red-800 border-red-200'
            : isWarning
            ? 'bg-amber-50 text-amber-800 border-amber-200'
            : 'bg-emerald-50 text-emerald-800 border-emerald-200';

          const healthBarBg = isCritical ? 'bg-red-600' : isWarning ? 'bg-amber-500' : 'bg-[#1B5E20]';
          const statusDot = isCritical ? 'bg-red-600' : isWarning ? 'bg-amber-500' : 'bg-[#1B5E20]';

          return (
            <div 
              key={plot.id} 
              className={`rounded-xl p-4 sm:p-5 flex flex-col justify-between border transition-all ${
                isDark 
                  ? 'bg-[#0b1329] border-slate-800 text-slate-200' 
                  : isCritical
                  ? 'card-critical'
                  : isWarning
                  ? 'card-warning'
                  : 'card-normal'
              }`}
            >
              <div>
                {/* Top Row: Plot Name & Flat Status Chip */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${statusDot}`}></span>
                    <h4 className={`text-sm font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {plot.name}
                    </h4>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${statusBadge}`}>
                    {plot.status}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-1 text-xs text-slate-500">
                  <span>{plot.crop} • {plot.block} ({plot.acreage})</span>
                  {/* Trust Indicator: Last synced label */}
                  <span className="text-[10px] text-slate-400 font-medium">Last synced: 1:15 PM</span>
                </div>

                {/* Crop Health Score Bar */}
                <div className="mt-3.5 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">{t('cropHealthIndex') || 'Crop Health Index'}</span>
                    <strong className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{plot.healthScore}%</strong>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/50">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${healthBarBg}`}
                      style={{ width: `${plot.healthScore}%` }}
                    ></div>
                  </div>
                </div>

                {/* Yield Potential Bar */}
                <div className="mt-2.5 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">{t('yieldPotential') || 'Yield Potential'}</span>
                    <strong className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      {plot.currentQuantity.toLocaleString()} / {plot.maxQuantity.toLocaleString()} {plot.unit}
                    </strong>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/50">
                    <div 
                      className="h-full rounded-full bg-slate-600 transition-all duration-500"
                      style={{ width: `${(plot.currentQuantity / plot.maxQuantity) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Sensor Readings: Clean Inline Data Row / Table Format (Replacing individual glowing boxes) */}
                <div className="mt-3.5 pt-2.5 border-t border-slate-100">
                  <div className={`grid grid-cols-3 divide-x rounded-lg py-2 px-1 text-center border ${
                    isDark 
                      ? 'bg-[#070e1e] divide-slate-800 border-slate-800' 
                      : 'bg-slate-50 divide-slate-200 border-slate-200/70'
                  }`}>
                    <div className="px-1">
                      <span className="text-[10px] text-slate-500 font-medium block">Canopy Temp</span>
                      <span className={`text-xs font-bold ${isCritical ? 'text-red-600' : isDark ? 'text-white' : 'text-slate-900'}`}>
                        {plot.temp}°C
                      </span>
                    </div>
                    <div className="px-1">
                      <span className="text-[10px] text-slate-500 font-medium block">Humidity</span>
                      <span className={`text-xs font-bold ${isCritical ? 'text-red-600' : isDark ? 'text-white' : 'text-slate-900'}`}>
                        {plot.humidity}%
                      </span>
                    </div>
                    <div className="px-1">
                      <span className="text-[10px] text-slate-500 font-medium block">Soil Moisture</span>
                      <span className={`text-xs font-bold ${isCritical ? 'text-red-600' : isDark ? 'text-white' : 'text-slate-900'}`}>
                        {plot.moisture}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Pest Status & Actuators (Solid Flat Buttons with 8px radius) */}
                <div className="mt-3 flex items-center justify-between text-xs pt-1">
                  <div className="flex items-center space-x-1">
                    {plot.pestDetected ? (
                      <span className="text-red-700 flex items-center gap-1 font-semibold text-[11px]">
                        <AlertOctagon className="w-3.5 h-3.5 text-red-600" /> {t('pestInfestation')}: Detected
                      </span>
                    ) : (
                      <span className="text-slate-600 flex items-center gap-1 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> {t('pestInfestation')}: Nil
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-1.5">
                    {/* Drip Irrigation Flat Button */}
                    <button
                      onClick={() => toggleDrip(plot.id)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-medium flex items-center gap-1 border transition-colors cursor-pointer ${
                        plot.fanOn 
                          ? 'bg-[#1B5E20] text-white border-[#1B5E20]' 
                          : isDark
                          ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                          : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                      }`}
                      title="Toggle Drip Irrigation"
                    >
                      <Droplets className="w-3 h-3" />
                      <span>Drip: {plot.fanOn ? 'ON' : 'OFF'}</span>
                    </button>

                    {/* Misting Sprayer Flat Button */}
                    <button
                      onClick={() => toggleSprayer(plot.id)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-medium flex items-center gap-1 border transition-colors cursor-pointer ${
                        plot.uvOn 
                          ? 'bg-[#1B5E20] text-white border-[#1B5E20]' 
                          : isDark
                          ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                          : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                      }`}
                      title="Toggle Misting Sprayer"
                    >
                      <Zap className="w-3 h-3" />
                      <span>Misting: {plot.uvOn ? 'ON' : 'OFF'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Row */}
              <div className={`mt-3.5 pt-2.5 border-t flex items-center justify-between text-[11px] ${
                isDark ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'
              }`}>
                <span className="flex items-center gap-1">
                  <Sprout className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Harvest ETA: <strong>{plot.expectedShelfLife}</strong></span>
                </span>

                <button 
                  onClick={() => onNavigate('smartScanner')}
                  className="font-bold text-[#1B5E20] hover:text-[#154D1A] flex items-center gap-0.5 group cursor-pointer"
                >
                  <span>{t('diagnoseLeaf') || 'Diagnose Leaf'}</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Official Trust Indicator & Data Citation Footer Line */}
      <div className={`pt-4 pb-2 border-t text-center text-xs ${
        isDark ? 'border-slate-800 text-slate-500' : 'border-slate-200 text-slate-500'
      }`}>
        <p className="flex items-center justify-center gap-2 flex-wrap font-medium">
          <ShieldCheck className="w-4 h-4 text-[#1B5E20]" />
          <span>Data Sources: <strong>ISRO Bhuvan Satellite</strong> • <strong>India Meteorological Department (IMD)</strong> • <strong>IoT Field Sensor Grid</strong> • <strong>ICAR-KVK Sangli</strong></span>
        </p>
      </div>
    </div>
  );
};
