import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { hourlyClimateTrends } from '../../data/extendedMockData';
import { 
  BarChart3, 
  Thermometer, 
  Droplets, 
  Activity, 
  TrendingUp, 
  Calendar, 
  Sparkles,
  ArrowUpRight,
  Download,
  Info
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
  AreaChart,
  Area
} from 'recharts';

export const StatisticsTrends = () => {
  const [timeRange, setTimeRange] = useState('24h');

  return (
    <div className="space-y-6 pb-12 select-none">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0b162b] border border-cyan-500/30 rounded-2xl p-4 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
        <div>
          <h2 className="text-base font-black text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            Statistical Climate Analytics & Temperature Trends
          </h2>
          <p className="text-xs text-slate-300 font-medium mt-0.5">
            Real-time multi-sensor telemetry, ambient vs canopy temperature differential, and 24h humidity curves
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button 
            onClick={() => window.print()}
            className="px-3 py-1.5 bg-[#132342] hover:bg-[#1a305a] border border-[#233a69] text-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Analytics</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Stat Tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0a1426] border border-[#1a2d4f] rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
            <span>Ambient Temp</span>
            <Thermometer className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl sm:text-3xl font-black text-white">28.4°C</span>
            <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
              Peak 31.2°C
            </span>
          </div>
        </div>

        <div className="bg-[#0a1426] border border-[#1a2d4f] rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
            <span>Relative Humidity</span>
            <Droplets className="w-4 h-4 text-sky-400" />
          </div>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl sm:text-3xl font-black text-white">65%</span>
            <span className="text-xs font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/30">
              High Spore Risk
            </span>
          </div>
        </div>

        <div className="bg-[#0a1426] border border-[#1a2d4f] rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
            <span>Soil Moisture (0-15cm)</span>
            <Activity className="w-4 h-4 text-teal-400" />
          </div>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl sm:text-3xl font-black text-white">44%</span>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
              Optimal Field Cap.
            </span>
          </div>
        </div>

        <div className="bg-[#0a1426] border border-[#1a2d4f] rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
            <span>Leaf Wetness Duration</span>
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl sm:text-3xl font-black text-white">6.5 hrs</span>
            <span className="text-xs font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/30">
              &gt; 5h Infection Threshold
            </span>
          </div>
        </div>
      </div>

      {/* 24-Hour Temperature & Humidity Interactive Trend Line */}
      <div className="bg-[#0a1426] border border-[#1a2d4f] rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="text-sm font-extrabold text-white tracking-tight">
              24-Hour Microclimate & Temperature Progression Curve
            </h3>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              Continuously logged every 3 hours from Sangli Weather Telemetry Node #1
            </p>
          </div>

          <div className="flex items-center space-x-3 text-xs font-bold">
            <span className="flex items-center gap-1.5 text-amber-300">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> Temperature (°C)
            </span>
            <span className="flex items-center gap-1.5 text-sky-300">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span> Humidity (%)
            </span>
            <span className="flex items-center gap-1.5 text-teal-300">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-400"></span> Soil Moisture (%)
            </span>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={hourlyClimateTrends} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorHum" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
              <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }} 
              />
              <Area type="monotone" dataKey="temp" stroke="#f59e0b" strokeWidth={2.5} fillOpacity={1} fill="url(#colorTemp)" />
              <Area type="monotone" dataKey="humidity" stroke="#38bdf8" strokeWidth={2} fillOpacity={1} fill="url(#colorHum)" />
              <Line type="monotone" dataKey="soilMoisture" stroke="#10b981" strokeWidth={2} strokeDasharray="4 4" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
