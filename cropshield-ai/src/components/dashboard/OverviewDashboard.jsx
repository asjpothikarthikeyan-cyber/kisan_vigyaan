import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { initialPlotsData } from '../../data/extendedMockData';
import { 
  Thermometer, 
  Droplets, 
  Activity, 
  Trash2, 
  CheckCircle2, 
  AlertTriangle, 
  AlertOctagon, 
  Fan, 
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
  const { t } = useApp();
  const [plots, setPlots] = useState(initialPlotsData);

  const toggleDrip = (id) => {
    setPlots(prev => prev.map(p => p.id === id ? { ...p, fanOn: !p.fanOn } : p));
  };

  const toggleSprayer = (id) => {
    setPlots(prev => prev.map(p => p.id === id ? { ...p, uvOn: !p.uvOn } : p));
  };

  return (
    <div className="space-y-6 pb-12 select-none">
      {/* 1. Top Crop Health & Surveillance Banner */}
      <div className="bg-[#0b162b] border border-cyan-500/30 rounded-2xl p-4 shadow-[0_0_15px_rgba(6,182,212,0.1)] relative overflow-hidden flex items-start space-x-3.5">
        <div className="p-2.5 bg-cyan-500/15 border border-cyan-400/30 rounded-xl text-cyan-400 flex-shrink-0 mt-0.5">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h2 className="text-xs font-black text-cyan-300 uppercase tracking-wider flex items-center gap-2">
            {t('farmHealthCare') || 'Farm & Crop Health Surveillance'}
          </h2>
          <p className="text-xs text-slate-200 mt-1 font-medium leading-relaxed">
            <strong>Plot 1 (Rice Field)</strong> and <strong>Plot 6 (Pulses Field)</strong> are in optimal vigorous condition with strong chlorophyll indices.
          </p>
          <span className="text-[10px] text-cyan-400/80 font-mono mt-0.5 block">Sangli Agro-Climatic Zone • Real-Time Field Telemetry</span>
        </div>

        <button 
          onClick={() => onNavigate('smartScanner')}
          className="hidden sm:flex items-center space-x-1.5 px-3.5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all active:scale-95 flex-shrink-0"
        >
          <Scan className="w-4 h-4" />
          <span>{t('diagnoseLeaf') || 'Diagnose Crop Leaf'}</span>
        </button>
      </div>

      {/* 2. Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-black text-white tracking-tight">{t('farmHealthCare') || 'Crop Field Plots & Health Telemetry'}</h3>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            6 {t('activeNodes') || 'Cultivated Plots Monitored'}
          </span>
        </div>

        <button 
          onClick={() => onNavigate('satelliteMapping')}
          className="text-cyan-400 hover:text-cyan-300 font-bold text-xs flex items-center gap-1 group"
        >
          <span>{t('viewSatelliteMap') || 'View Satellite NDVI Map'}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* 3. Six Glowing Field Plot Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {plots.map((plot) => {
          const isCritical = plot.statusType === 'critical';
          const isWarning = plot.statusType === 'warning';
          const isNormal = plot.statusType === 'normal';

          const cardClass = isCritical 
            ? 'card-critical bg-[#130d19]/90' 
            : isWarning 
            ? 'card-warning bg-[#141215]/90' 
            : 'card-normal bg-[#0a1622]/90';

          const statusBadgeColor = isCritical 
            ? 'bg-red-500/20 text-red-300 border-red-500/50' 
            : isWarning 
            ? 'bg-amber-500/20 text-amber-300 border-amber-500/50' 
            : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50';

          const healthBarColor = isCritical ? 'bg-red-500' : isWarning ? 'bg-amber-500' : 'bg-emerald-400';
          const dotColor = isCritical ? 'bg-red-500' : isWarning ? 'bg-amber-400' : 'bg-emerald-400';

          return (
            <div 
              key={plot.id} 
              className={`rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all backdrop-blur-md relative overflow-hidden ${cardClass}`}
            >
              <div>
                {/* Top Row: Status & Title */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${dotColor} shadow-[0_0_8px_currentColor]`}></span>
                    <h4 className="text-base font-extrabold text-white tracking-tight">{plot.name}</h4>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${statusBadgeColor}`}>
                      {plot.status}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 font-semibold mt-0.5">
                  {plot.crop} • {plot.block} ({plot.acreage})
                </p>

                {/* Crop Health Score Bar */}
                <div className="mt-3.5 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-400">{t('cropHealthIndex') || 'Crop Health Index'}</span>
                    <strong className="text-white font-extrabold">{plot.healthScore}%</strong>
                  </div>
                  <div className="w-full bg-[#182744] h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-700 ${healthBarColor}`}
                      style={{ width: `${plot.healthScore}%` }}
                    ></div>
                  </div>
                </div>

                {/* Yield Forecast */}
                <div className="mt-3 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-400">{t('yieldPotential') || 'Yield Potential'}</span>
                    <strong className="text-slate-200">
                      {plot.currentQuantity.toLocaleString()} / {plot.maxQuantity.toLocaleString()} {plot.unit}
                    </strong>
                  </div>
                  <div className="w-full bg-[#182744] h-2 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-cyan-400 transition-all duration-700"
                      style={{ width: `${(plot.currentQuantity / plot.maxQuantity) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* 3 Metrics: Ambient Temp, Relative Humidity, Soil Moisture */}
                <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-800/80 text-center text-xs">
                  <div className="bg-[#0e1b33]/80 p-2 rounded-xl border border-slate-800">
                    <div className="flex items-center justify-center space-x-1 text-amber-400 mb-0.5">
                      <Thermometer className="w-3.5 h-3.5" />
                      <span className="text-[10px] text-slate-400 font-semibold">{t('canopyTemp') || 'Canopy'}</span>
                    </div>
                    <strong className={`text-sm font-extrabold ${isCritical ? 'text-red-400' : 'text-white'}`}>
                      {plot.temp}°C
                    </strong>
                  </div>

                  <div className="bg-[#0e1b33]/80 p-2 rounded-xl border border-slate-800">
                    <div className="flex items-center justify-center space-x-1 text-sky-400 mb-0.5">
                      <Droplets className="w-3.5 h-3.5" />
                      <span className="text-[10px] text-slate-400 font-semibold">{t('humidity') || 'Humidity'}</span>
                    </div>
                    <strong className={`text-sm font-extrabold ${isCritical ? 'text-red-400' : 'text-white'}`}>
                      {plot.humidity}%
                    </strong>
                  </div>

                  <div className="bg-[#0e1b33]/80 p-2 rounded-xl border border-slate-800">
                    <div className="flex items-center justify-center space-x-1 text-teal-400 mb-0.5">
                      <Activity className="w-3.5 h-3.5" />
                      <span className="text-[10px] text-slate-400 font-semibold">{t('soilMoisture') || 'Soil VWC'}</span>
                    </div>
                    <strong className={`text-sm font-extrabold ${isCritical ? 'text-red-400' : 'text-white'}`}>
                      {plot.moisture}%
                    </strong>
                  </div>
                </div>

                {/* Pest & Irrigation Actuators */}
                <div className="mt-3 flex items-center justify-between text-[11px] font-semibold pt-1">
                  <div className="flex items-center space-x-1">
                    {plot.pestDetected ? (
                      <span className="text-red-400 flex items-center gap-1 font-bold animate-pulse">
                        <AlertOctagon className="w-3.5 h-3.5" /> {t('pestInfestation')}: Yes
                      </span>
                    ) : (
                      <span className="text-slate-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> {t('pestInfestation')}: No
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleDrip(plot.id)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 transition-all ${
                        plot.fanOn ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      <Droplets className="w-3 h-3" />
                      {t('dripIrrigation') || 'Drip'}: {plot.fanOn ? 'ON' : 'OFF'}
                    </button>

                    <button
                      onClick={() => toggleSprayer(plot.id)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 transition-all ${
                        plot.uvOn ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      <Zap className="w-3 h-3" />
                      {t('mistingSprayer') || 'Misting'}: {plot.uvOn ? 'ON' : 'OFF'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="mt-4 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Sprout className="w-3.5 h-3.5 text-emerald-400" />
                  {plot.expectedShelfLife}
                </span>

                <button 
                  onClick={() => onNavigate('smartScanner')}
                  className="font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group"
                >
                  <span>{t('diagnoseLeaf') || 'Diagnose Leaf'}</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
