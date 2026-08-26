import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { initialPlotsData } from '../../data/extendedMockData';
import { 
  CheckCircle2, 
  AlertTriangle, 
  AlertOctagon, 
  ArrowRight, 
  Scan, 
  ShieldCheck, 
  ChevronRight,
  Sprout,
  HelpCircle,
  TrendingDown,
  TrendingUp,
  Activity,
  Layers,
  Zap,
  Info
} from 'lucide-react';

export const OverviewDashboard = ({ onNavigate }) => {
  const { t } = useApp();
  const [plots, setPlots] = useState(initialPlotsData);
  const [showTooltip, setShowTooltip] = useState(false);

  const toggleDrip = (id) => {
    setPlots(prev => prev.map(p => p.id === id ? { ...p, fanOn: !p.fanOn } : p));
  };

  const toggleSprayer = (id) => {
    setPlots(prev => prev.map(p => p.id === id ? { ...p, uvOn: !p.uvOn } : p));
  };

  // Sparkline data generator for 7-day trend
  const getSparklinePoints = (statusType, score) => {
    if (statusType === 'critical') {
      return [
        { x: 0, y: 15 }, { x: 20, y: 18 }, { x: 40, y: 25 }, 
        { x: 60, y: 35 }, { x: 80, y: 40 }, { x: 100, y: 45 }, { x: 120, y: 48 }
      ]; // In SVG Y is inverted (higher y = lower score)
    } else if (statusType === 'warning') {
      return [
        { x: 0, y: 10 }, { x: 20, y: 12 }, { x: 40, y: 18 }, 
        { x: 60, y: 24 }, { x: 80, y: 28 }, { x: 100, y: 32 }, { x: 120, y: 35 }
      ];
    } else {
      return [
        { x: 0, y: 18 }, { x: 20, y: 15 }, { x: 40, y: 12 }, 
        { x: 60, y: 10 }, { x: 80, y: 8 }, { x: 100, y: 9 }, { x: 120, y: 7 }
      ];
    }
  };

  return (
    <div className="space-y-4 pb-10 select-none">
      {/* 1. Top-Level KPI / Metrics Strip (Bloomberg/Palantir Enterprise Pattern) */}
      <div className="bg-[#091120] border border-[#16233b] rounded-[6px] p-2 sm:p-3 shadow-xs">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-[#16233b] gap-y-2 sm:gap-y-0 text-left">
          {/* KPI 1 */}
          <div className="px-3 py-1">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
              Total Plots
            </span>
            <div className="flex items-baseline space-x-1.5 mt-0.5">
              <span className="text-[20px] font-bold text-slate-100 tracking-tight leading-none">6</span>
              <span className="text-[11px] text-slate-400 font-mono">14.5 Acres</span>
            </div>
          </div>

          {/* KPI 2 */}
          <div className="px-3 py-1">
            <div className="flex items-center gap-1">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                Avg. Health Index
              </span>
            </div>
            <div className="flex items-baseline space-x-1.5 mt-0.5">
              <span className="text-[20px] font-bold text-emerald-400 tracking-tight leading-none">71%</span>
              <span className="text-[10px] text-emerald-500 font-medium flex items-center">
                <TrendingUp className="w-2.5 h-2.5 mr-0.5" />+2.4%
              </span>
            </div>
          </div>

          {/* KPI 3 */}
          <div className="px-3 py-1">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
              Active Alerts
            </span>
            <div className="flex items-baseline space-x-1.5 mt-0.5">
              <span className="text-[20px] font-bold text-rose-400 tracking-tight leading-none">3</span>
              <span className="text-[10px] text-rose-400/80 font-medium">1 Crit • 2 Warn</span>
            </div>
          </div>

          {/* KPI 4 */}
          <div className="px-3 py-1">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
              Total Yield Est.
            </span>
            <div className="flex items-baseline space-x-1.5 mt-0.5">
              <span className="text-[20px] font-bold text-slate-100 tracking-tight leading-none">12,400</span>
              <span className="text-[11px] text-slate-400 font-mono">kg / 15.8k</span>
            </div>
          </div>

          {/* KPI 5 */}
          <div className="px-3 py-1">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
              Sensors Online
            </span>
            <div className="flex items-baseline space-x-1.5 mt-0.5">
              <span className="text-[20px] font-bold text-emerald-400 tracking-tight leading-none">24/24</span>
              <span className="text-[10px] text-emerald-400 font-medium">100% Mesh</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Crop Health Surveillance Top Action Banner */}
      <div className="bg-[#0c1628] border border-[#1a2942] rounded-[6px] p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-[4px] bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-[14px] font-semibold text-slate-100 tracking-tight">
                Farm & Crop Health Surveillance
              </h2>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-[3px] bg-slate-800 text-slate-300 border border-slate-700">
                ICAR-KVK Sangli Node
              </span>
            </div>
            <p className="text-[12px] text-slate-300 mt-0.5">
              Plot 1 (Rice) & Plot 6 (Pulses) healthy. <strong>Plot 2 (Cotton)</strong> flagged with severe early Bacterial Blight spore risk.
            </p>
          </div>
        </div>

        {/* PRIMARY SOLID-FILL BUTTON ON THE PAGE */}
        <button 
          onClick={() => onNavigate('smartScanner')}
          className="flex items-center justify-center space-x-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[12px] rounded-[6px] transition-colors shadow-xs shrink-0 cursor-pointer"
        >
          <Scan className="w-3.5 h-3.5" />
          <span>Diagnose Leaf</span>
        </button>
      </div>

      {/* 3. Section Header */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center space-x-2.5">
          <h3 className="text-[16px] font-semibold text-slate-100 tracking-tight">
            Field Plot Surveillance & Micro-Telemetry
          </h3>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-[3px] bg-slate-800 text-slate-300 border border-slate-700">
            6 Nodes Active
          </span>
        </div>

        <button 
          onClick={() => onNavigate('satelliteMapping')}
          className="text-emerald-400 hover:text-emerald-300 font-medium text-[12px] flex items-center gap-1 group cursor-pointer"
        >
          <span>View Satellite NDVI Map</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* 4. Six Asymmetrical Plot Cards (Varying Density based on Health State) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
        {plots.map((plot) => {
          const isCritical = plot.statusType === 'critical';
          const isWarning = plot.statusType === 'warning';
          const isNormal = plot.statusType === 'normal';

          const cardBorder = isCritical 
            ? 'border-rose-500/40 bg-[#130b17]' 
            : isWarning 
            ? 'border-amber-500/40 bg-[#131118]' 
            : 'border-[#18263f] bg-[#0c1527]';

          const badgeStyle = isCritical
            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
            : isWarning
            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30';

          const sparklinePts = getSparklinePoints(plot.statusType, plot.healthScore);
          const polylineString = sparklinePts.map(p => `${p.x},${p.y}`).join(' ');

          const sparkStroke = isCritical ? '#f43f5e' : isWarning ? '#f59e0b' : '#10b981';

          return (
            <div 
              key={plot.id} 
              className={`rounded-[6px] p-3.5 border flex flex-col justify-between transition-colors shadow-xs select-none ${cardBorder}`}
            >
              <div>
                {/* Top Row: Plot Name + Status Chip + Relative Timestamp */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={`w-2 h-2 rounded-full ${isCritical ? 'bg-rose-500' : isWarning ? 'bg-amber-400' : 'bg-emerald-400'}`}></span>
                    <h4 className="text-[14px] font-semibold text-slate-100 tracking-tight">
                      {plot.name}
                    </h4>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-[3px] uppercase tracking-wider ${badgeStyle}`}>
                      {plot.status}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-1 text-[11px] text-slate-400">
                  <span>{plot.crop} • {plot.block} ({plot.acreage})</span>
                  <span className="font-mono text-slate-500">Synced 2 min ago</span>
                </div>

                {/* Denser Critical Urgent Callout (Break in symmetry for Plot 2) */}
                {isCritical && (
                  <div className="mt-2.5 p-2 rounded-[4px] bg-rose-950/40 border border-rose-500/30 text-[11px] text-rose-200 leading-relaxed">
                    <div className="flex items-center gap-1 font-semibold text-rose-300">
                      <AlertOctagon className="w-3 h-3 text-rose-400 shrink-0" />
                      <span>Bacterial Blight Active (Xanthomonas)</span>
                    </div>
                    <p className="text-[10px] text-rose-200/90 mt-0.5">
                      <strong>Action:</strong> Spray Streptocycline (0.5g/L) + Copper Oxychloride (2.5g/L) within 24h.
                    </p>
                  </div>
                )}

                {/* Warning Callout for Plot 4 */}
                {isWarning && (
                  <div className="mt-2 p-1.5 rounded-[4px] bg-amber-950/30 border border-amber-500/30 text-[11px] text-amber-200">
                    <div className="flex items-center gap-1 font-semibold text-amber-300 text-[10px]">
                      <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0" />
                      <span>Early Foliar Blight Alert • Mancozeb (2.0g/L) Suggested</span>
                    </div>
                  </div>
                )}

                {/* Crop Health Index + 7-Day Sparkline Trend Line */}
                <div className="mt-3 pt-2 border-t border-[#16233b] flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1 relative">
                      <span className="text-[11px] font-medium text-slate-400">
                        Crop Health Index
                      </span>
                      <div className="group relative inline-block">
                        <HelpCircle className="w-3 h-3 text-slate-500 hover:text-slate-300 cursor-help" />
                        <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-44 p-1.5 bg-slate-900 border border-slate-700 text-[10px] text-slate-200 rounded shadow-xl z-50 pointer-events-none">
                          NDVI-weighted canopy spectral reflectance & chlorophyll density index
                        </div>
                      </div>
                    </div>

                    <div className="flex items-baseline space-x-1.5 mt-0.5">
                      <strong className={`text-[16px] font-bold ${isCritical ? 'text-rose-400' : isWarning ? 'text-amber-400' : 'text-slate-100'}`}>
                        {plot.healthScore}%
                      </strong>
                      <span className={`text-[10px] font-medium ${isCritical || isWarning ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {isCritical ? '▼ -18% 7d' : isWarning ? '▼ -6% 7d' : '▲ +3% 7d'}
                      </span>
                    </div>
                  </div>

                  {/* Real 7-Day SVG Vector Sparkline */}
                  <div className="w-28 h-8 flex flex-col items-end justify-center">
                    <svg viewBox="0 0 120 50" className="w-24 h-7 overflow-visible">
                      <polyline
                        fill="none"
                        stroke={sparkStroke}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points={polylineString}
                      />
                      {/* End point dot */}
                      <circle
                        cx={sparklinePts[sparklinePts.length - 1].x}
                        cy={sparklinePts[sparklinePts.length - 1].y}
                        r="2.5"
                        fill={sparkStroke}
                      />
                    </svg>
                    <span className="text-[9px] font-mono text-slate-500 -mt-0.5">7-Day Trend</span>
                  </div>
                </div>

                {/* Sensor Data Row: Horizontal Enterprise Data Row (Thin Dividers, Muted Labels, Right-Aligned Numbers) */}
                <div className="mt-2.5 pt-2 border-t border-[#16233b]">
                  <div className="grid grid-cols-3 divide-x divide-[#16233b] bg-[#070e1c] border border-[#16233b] rounded-[4px] py-1.5 px-1 text-center">
                    <div className="px-1 text-left">
                      <span className="text-[10px] text-slate-500 font-medium block">Canopy Temp</span>
                      <span className={`text-[12px] font-mono font-bold ${isCritical ? 'text-rose-400' : 'text-slate-200'}`}>
                        {plot.temp}°C
                      </span>
                    </div>
                    <div className="px-1 text-left pl-2">
                      <span className="text-[10px] text-slate-500 font-medium block">Rel. Humidity</span>
                      <span className={`text-[12px] font-mono font-bold ${isCritical ? 'text-rose-400' : 'text-slate-200'}`}>
                        {plot.humidity}%
                      </span>
                    </div>
                    <div className="px-1 text-left pl-2">
                      <span className="text-[10px] text-slate-500 font-medium block">Soil VWC</span>
                      <span className={`text-[12px] font-mono font-bold ${isCritical ? 'text-rose-400' : 'text-slate-200'}`}>
                        {plot.moisture}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actuators: Real Sliding Toggle Switches (Not Colored Buttons) */}
                <div className="mt-2.5 pt-2 border-t border-[#16233b] flex items-center justify-between text-[11px]">
                  <div className="flex items-center space-x-1">
                    <span className="text-[10px] text-slate-400">Yield Est:</span>
                    <strong className="text-[11px] text-slate-200 font-mono">
                      {plot.currentQuantity} {plot.unit}
                    </strong>
                  </div>

                  <div className="flex items-center space-x-3">
                    {/* Drip Irrigation Switch */}
                    <div className="flex items-center space-x-1.5">
                      <span className="text-[10px] text-slate-400 font-medium">Drip</span>
                      <div 
                        onClick={() => toggleDrip(plot.id)}
                        className={`switch-track ${plot.fanOn ? 'bg-emerald-600 switch-on' : 'bg-slate-700'}`}
                        title="Toggle Drip Irrigation"
                      >
                        <div className="switch-thumb"></div>
                      </div>
                    </div>

                    {/* Misting Sprayer Switch */}
                    <div className="flex items-center space-x-1.5">
                      <span className="text-[10px] text-slate-400 font-medium">Misting</span>
                      <div 
                        onClick={() => toggleSprayer(plot.id)}
                        className={`switch-track ${plot.uvOn ? 'bg-emerald-600 switch-on' : 'bg-slate-700'}`}
                        title="Toggle Misting Sprayer"
                      >
                        <div className="switch-thumb"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer Line */}
              <div className="mt-2.5 pt-2 border-t border-[#16233b] flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1 font-mono text-[10px]">
                  <Sprout className="w-3 h-3 text-emerald-400" />
                  <span>Harvest ETA: <strong>{plot.expectedShelfLife}</strong></span>
                </span>

                <button 
                  onClick={() => onNavigate('smartScanner')}
                  className="font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-0.5 group cursor-pointer text-[11px]"
                >
                  <span>Quick Triage</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 5. Enterprise Data Source Attribution Line */}
      <div className="pt-3 pb-1 border-t border-[#16233b] text-center text-[11px] text-slate-500">
        <p className="flex items-center justify-center gap-2 flex-wrap font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Telemetry Sources: <strong>ISRO Bhuvan Satellite (Sentinel-2)</strong> • <strong>IMD Agro-Weather</strong> • <strong>24 IoT Trap Sensors</strong> • <strong>ICAR-KVK Sangli</strong></span>
        </p>
      </div>
    </div>
  );
};
