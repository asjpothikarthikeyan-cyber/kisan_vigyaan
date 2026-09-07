import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { disasterPredictions } from '../../data/extendedMockData';
import { 
  AlertTriangle, 
  ShieldAlert, 
  CloudRain, 
  Sun, 
  Wind, 
  Bug, 
  CheckCircle2, 
  ChevronRight, 
  Radio, 
  Bell, 
  Sparkles,
  Info,
  Calendar
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const DisasterPrediction = () => {
  const { lang } = useApp();
  const [activePrediction, setActivePrediction] = useState(disasterPredictions[0]);
  const [broadcastDone, setBroadcastDone] = useState(false);

  const handleBroadcastAlert = () => {
    setBroadcastDone(true);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    setTimeout(() => setBroadcastDone(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0b162b] border border-cyan-500/30 rounded-2xl p-4 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
        <div>
          <h2 className="text-base font-black text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            Agricultural Disaster Prediction & Climate Anomaly Engine
          </h2>
          <p className="text-xs text-slate-300 font-medium mt-0.5">
            14-Day Predictive Neural Modeling: Heatwaves, Flash Waterlogging, Droughts, and Pest Swarm Vectors
          </p>
        </div>

        <button
          onClick={handleBroadcastAlert}
          className="px-3.5 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-lg transition-all active:scale-95 flex-shrink-0"
        >
          <Radio className="w-4 h-4 animate-pulse" />
          <span>{broadcastDone ? '✓ Alert Sent to 842 Farmers' : 'Broadcast Disaster Alert'}</span>
        </button>
      </div>

      {/* 3 Main Disaster Risk Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {disasterPredictions.map((disaster) => {
          const isSelected = activePrediction.id === disaster.id;

          return (
            <div
              key={disaster.id}
              onClick={() => setActivePrediction(disaster)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer shadow-md relative overflow-hidden ${
                isSelected
                  ? 'bg-[#150f1e] border-red-500/70 ring-2 ring-red-400/40'
                  : 'bg-[#0a1426] border-[#1a2d4f] hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/40">
                  {disaster.severity} Priority
                </span>
                <span className="text-[11px] text-slate-400 font-semibold">{disaster.timeWindow}</span>
              </div>

              <h3 className="text-sm font-extrabold text-white mt-2 leading-snug">
                {lang === 'mr' ? disaster.disasterTypeMr : disaster.disasterType}
              </h3>

              <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-slate-800/80">
                <span className="text-slate-400 font-medium">{disaster.affectedZone}</span>
                <strong className="text-red-400 font-black">{disaster.riskLevel.split(' ')[0]}</strong>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Disaster Inspection & Mitigation Plan */}
      <div className="bg-[#0a1426] border border-[#1a2d4f] rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex items-start justify-between border-b border-slate-800/80 pb-3">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Predictive Threat Breakdown
            </span>
            <h3 className="text-lg font-black text-white mt-0.5">
              {lang === 'mr' ? activePrediction.disasterTypeMr : activePrediction.disasterType}
            </h3>
            <p className="text-xs text-red-300 font-semibold mt-0.5">
              Target Impact Zone: {activePrediction.affectedZone} • {activePrediction.timeWindow}
            </p>
          </div>

          <span className="px-3 py-1 bg-red-500/20 text-red-300 border border-red-500/40 text-xs font-extrabold rounded-xl">
            {activePrediction.riskLevel}
          </span>
        </div>

        {/* Trigger Indicators & Impact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 bg-[#0f1d38] border border-[#21355a] rounded-xl space-y-2">
            <span className="text-[11px] font-black text-cyan-300 uppercase tracking-wider block">
              ⚡ Atmospheric & Biological Triggers:
            </span>
            <ul className="space-y-1 text-slate-200">
              {activePrediction.triggerFactors.map((f, idx) => (
                <li key={idx} className="flex items-center space-x-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3.5 bg-[#17101f] border border-red-500/30 rounded-xl space-y-1">
            <span className="text-[11px] font-black text-red-300 uppercase tracking-wider block">
              🌾 Expected Agronomic Impact on Standing Crops:
            </span>
            <p className="text-slate-200 leading-relaxed font-medium">
              {activePrediction.impactOnCrops}
            </p>
          </div>
        </div>

        {/* Preventative Farm Mitigation Protocol */}
        <div className="p-4 bg-[#0a1e1b] border border-emerald-500/30 rounded-xl space-y-2 text-xs">
          <span className="text-[11px] font-black text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Recommended Immediate Preventative Actions for Farmers:
          </span>
          <ul className="space-y-1.5 pl-1">
            {activePrediction.mitigationActions.map((action, idx) => (
              <li key={idx} className="flex items-start space-x-2 text-emerald-100">
                <span className="text-emerald-400 font-bold">•</span>
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
