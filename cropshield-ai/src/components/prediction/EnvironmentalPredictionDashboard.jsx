import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Activity, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  Droplets, 
  Thermometer, 
  Wind, 
  Sun, 
  CloudRain, 
  Sprout, 
  Sliders, 
  RotateCcw, 
  Info, 
  ArrowRight, 
  Layers, 
  BookOpen, 
  Clock, 
  Search, 
  HelpCircle,
  Sparkles,
  Zap,
  Radio,
  FileCheck,
  Check,
  ChevronRight,
  Eye
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { 
  DISEASE_ENVIRONMENTAL_PROFILES, 
  evaluateDiseaseRisk, 
  evaluatePlotAllDiseases, 
  generate24HourRiskTrend 
} from '../../services/environmentalDiseaseEngine';

export const EnvironmentalPredictionDashboard = () => {
  const { lang, t, theme, setActiveTab } = useApp();
  const isDark = theme === 'dark';

  // 1. Initial Cultivated Farm Zones Telemetry Database
  const INITIAL_PLOTS = [
    {
      id: 'plot-rice',
      name: 'Zone 1 - Rice Lowland Basin',
      nameMr: 'झोन १ - भात खाचरे (इंद्रायणी)',
      nameTa: 'மண்டலம் 1 - நெல் வயல்',
      nameHi: 'जोन 1 - धान खेत',
      crop: 'rice',
      variety: 'Indrayani Basmati Scented',
      growthStage: 'flowering',
      stageName: 'Panicle Booting & Emergence (55 DAS)',
      acreage: '2.5 Acres',
      location: 'Krishna Alluvial Canal Belt',
      soilType: 'Clayey Alluvial Soil',
      sensorSource: 'Lowland Hydro-Sensor Probe #01',
      telemetry: {
        temp: 27.5,
        rh: 78.0,
        leafWetnessHours: 6.5,
        soilVWC: 85.0,
        soilPH: 7.6,
        soilEC: 0.40,
        rain24h: 4.0,
        hoursFavorable: 8.0,
        historicalPressure: 0.35
      }
    },
    {
      id: 'plot-cotton',
      name: 'Zone 2 - Bt Cotton Field (Block B)',
      nameMr: 'झोन २ - बीटी कापूस शेत (विभाग ब)',
      nameTa: 'மண்டலம் 2 - பிடி பருத்தி (பிரிவு B)',
      nameHi: 'जोन 2 - बीटी कपास खेत',
      crop: 'cotton',
      variety: 'RCH 659 Bt-II Hybrid',
      growthStage: 'boll_formation',
      stageName: 'Peak Boll Formation (65 DAS)',
      acreage: '3.5 Acres',
      location: 'Sangli Miraj Shivar, Sector 4',
      soilType: 'Medium Black Vertisol',
      sensorSource: 'ESP32 LoRa Node #04 (Live Telemetry)',
      telemetry: {
        temp: 29.4,
        rh: 88.0,
        leafWetnessHours: 11.5,
        soilVWC: 68.0,
        soilPH: 7.4,
        soilEC: 0.42,
        rain24h: 18.5,
        hoursFavorable: 16.0,
        historicalPressure: 0.65
      }
    },
    {
      id: 'plot-grapes',
      name: 'Zone 3 - Export Table Grapes Vineyard',
      nameMr: 'झोन ३ - निर्यातक्षम द्राक्ष बाग',
      nameTa: 'மண்டலம் 3 - திராட்சை தோட்டம்',
      nameHi: 'जोन 3 - अंगूर बाग',
      crop: 'grapes',
      variety: 'Thompson Seedless on Dogridge Rootstock',
      growthStage: 'flowering',
      stageName: 'Pre-Bloom Cap Fall & Rachis Elongation',
      acreage: '4.0 Acres',
      location: 'Kavathe Mahankal Agro Basin',
      soilType: 'Well-drained Gravelly Loam',
      sensorSource: 'Canopy Climate Node #08 (Live)',
      telemetry: {
        temp: 22.8,
        rh: 92.0,
        leafWetnessHours: 10.0,
        soilVWC: 55.0,
        soilPH: 7.1,
        soilEC: 0.32,
        rain24h: 14.0,
        hoursFavorable: 15.0,
        historicalPressure: 0.70
      }
    },
    {
      id: 'plot-tomato',
      name: 'Zone 4 - Tomato Polyhouse & Drip Patch',
      nameMr: 'झोन ४ - टोमॅटो शेत व ठिबक विभाग',
      nameTa: 'மண்டலம் 4 - தக்காளி பாலிஹவுஸ்',
      nameHi: 'जोन 4 - टमाटर पॉलीहाउस',
      crop: 'tomato',
      variety: 'Abhinav Hybrid (Seminis)',
      growthStage: 'flowering',
      stageName: 'Active Flowering & Early Fruit Set (42 DAS)',
      acreage: '2.0 Acres',
      location: 'Tasgaon Horticulture Cluster',
      soilType: 'Sandy Loam Drip Irrigated',
      sensorSource: 'Polyhouse Micro-IoT Probe #02 (Live)',
      telemetry: {
        temp: 26.2,
        rh: 84.0,
        leafWetnessHours: 9.0,
        soilVWC: 62.0,
        soilPH: 6.8,
        soilEC: 0.38,
        rain24h: 8.0,
        hoursFavorable: 12.0,
        historicalPressure: 0.50
      }
    },
    {
      id: 'plot-sugarcane',
      name: 'Zone 5 - Sugarcane Adsali Crop',
      nameMr: 'झोन ५ - अडसाली ऊस पट्टा',
      nameTa: 'மண்டலம் 5 - கரும்பு தோட்டம்',
      nameHi: 'जोन 5 - गन्ना खेत',
      crop: 'sugarcane',
      variety: 'Co 86032 (Nira)',
      growthStage: 'boll_formation',
      stageName: 'Grand Growth & Tillering (110 DAS)',
      acreage: '5.0 Acres',
      location: 'Walwa Islampur Sector',
      soilType: 'Heavy Deep Black Clay',
      sensorSource: 'Soil Deep Moisture Probe #03',
      telemetry: {
        temp: 31.0,
        rh: 76.0,
        leafWetnessHours: 4.0,
        soilVWC: 80.0,
        soilPH: 7.8,
        soilEC: 0.45,
        rain24h: 12.0,
        hoursFavorable: 10.0,
        historicalPressure: 0.45
      }
    },
    {
      id: 'plot-soybean',
      name: 'Zone 6 - Soybean Intercrop Field',
      nameMr: 'झोन ६ - सोयाबीन आंतरपीक शेत',
      nameTa: 'மண்டலம் 6 - சோயாபீன் நிலம்',
      nameHi: 'जोन 6 - सोयाबीन खेत',
      crop: 'soybean',
      variety: 'JS 335 (Jawahar)',
      growthStage: 'boll_formation',
      stageName: 'Pod Filling & Seed Development (R4)',
      acreage: '3.0 Acres',
      location: 'Shirala Foothills Cluster',
      soilType: 'Loamy Medium Soil',
      sensorSource: 'Microclimate Weather Node #06',
      telemetry: {
        temp: 24.5,
        rh: 86.0,
        leafWetnessHours: 8.0,
        soilVWC: 64.0,
        soilPH: 7.0,
        soilEC: 0.35,
        rain24h: 6.0,
        hoursFavorable: 9.0,
        historicalPressure: 0.40
      }
    }
  ];

  // Active Plot Selection State
  const [selectedPlotId, setSelectedPlotId] = useState('plot-cotton');
  const selectedPlot = INITIAL_PLOTS.find(p => p.id === selectedPlotId) || INITIAL_PLOTS[0];

  // Telemetry Overrides / Simulation Sliders State
  const [simulatedTelemetry, setSimulatedTelemetry] = useState(selectedPlot.telemetry);
  const [selectedDiseaseId, setSelectedDiseaseId] = useState(null);

  // When plot selection changes, sync simulation state
  const handlePlotSelect = (plot) => {
    setSelectedPlotId(plot.id);
    setSimulatedTelemetry(plot.telemetry);
    setSelectedDiseaseId(null);
  };

  // Reset telemetry to plot's actual live sensors
  const handleResetToSensors = () => {
    setSimulatedTelemetry(selectedPlot.telemetry);
  };

  // Simulate Sudden Heavy Monsoon / Humidity Surge
  const handleSimulateMonsoonSurge = () => {
    setSimulatedTelemetry(prev => ({
      ...prev,
      temp: 26.5,
      rh: 95.0,
      leafWetnessHours: 16.0,
      soilVWC: 88.0,
      rain24h: 45.0,
      hoursFavorable: 22.0
    }));
  };

  // 2. Evaluate All Farm Plots to Compute Farm-Level Summary
  const farmPlotsEvaluations = useMemo(() => {
    return INITIAL_PLOTS.map(plot => {
      // If this is the currently active/simulated plot, use simulatedTelemetry; else live telemetry
      const tel = plot.id === selectedPlotId ? simulatedTelemetry : plot.telemetry;
      const diseaseEvals = evaluatePlotAllDiseases(plot.crop, tel);
      const topDisease = diseaseEvals[0] || null;

      return {
        plot,
        topDisease,
        allDiseases: diseaseEvals,
        topRiskScore: topDisease ? topDisease.riskScore : 10,
        topRiskLevel: topDisease ? topDisease.riskLevel : 'LOW'
      };
    });
  }, [selectedPlotId, simulatedTelemetry]);

  // Farm-Level Summary Counts
  const farmRiskSummary = useMemo(() => {
    let low = 0, moderate = 0, high = 0, veryHigh = 0;
    farmPlotsEvaluations.forEach(p => {
      if (p.topRiskLevel === 'VERY_HIGH') veryHigh++;
      else if (p.topRiskLevel === 'HIGH') high++;
      else if (p.topRiskLevel === 'MODERATE') moderate++;
      else low++;
    });
    return { low, moderate, high, veryHigh, total: farmPlotsEvaluations.length };
  }, [farmPlotsEvaluations]);

  // Current Active Plot Evaluations
  const currentPlotEval = useMemo(() => {
    const diseaseEvals = evaluatePlotAllDiseases(selectedPlot.crop, simulatedTelemetry);
    return {
      allDiseases: diseaseEvals,
      primaryDisease: diseaseEvals[0] || null
    };
  }, [selectedPlot.crop, simulatedTelemetry]);

  // Active Disease for Deep-Dive Analysis
  const activeDiseaseEval = useMemo(() => {
    if (selectedDiseaseId) {
      const match = currentPlotEval.allDiseases.find(d => d.diseaseId === selectedDiseaseId);
      if (match) return match;
    }
    return currentPlotEval.primaryDisease;
  }, [selectedDiseaseId, currentPlotEval]);

  // 24-Hour Risk Trend Data for Active Disease
  const riskTrendData = useMemo(() => {
    if (!activeDiseaseEval) return [];
    return generate24HourRiskTrend(activeDiseaseEval.diseaseId, simulatedTelemetry);
  }, [activeDiseaseEval, simulatedTelemetry]);

  return (
    <div className="space-y-6 animate-fadeIn pb-16 font-sans">
      
      {/* 1. TOP HEADER & PROACTIVE PARADIGM BANNER */}
      <div className={`p-6 sm:p-7 rounded-3xl border shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-5 ${
        isDark ? 'bg-[#0a1324] border-[#182a4a] text-white' : 'bg-[#F5FCF7] border-[#D2EBD7] text-slate-900'
      }`}>
        <div className="flex items-start space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#047857] to-[#065F46] text-white flex items-center justify-center text-3xl shadow-md shrink-0 border border-emerald-300/40">
            <Activity className="w-8 h-8 animate-pulse" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                AI Environmental Disease Prediction Engine
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 font-mono flex items-center gap-1">
                <Radio className="w-2.5 h-2.5 animate-ping text-emerald-600" />
                <span>Real-Time Sensor Telemetry</span>
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-1 leading-relaxed max-w-3xl">
              Scientifically grounded crop-specific suitability analysis. Evaluates microclimate, leaf wetness duration, growth stage susceptibility, and temporal persistence to warn you <strong>before</strong> visual symptoms appear.
            </p>
          </div>
        </div>

        {/* Global Proactive Metric Pill */}
        <div className="flex items-center gap-3 bg-white/90 dark:bg-slate-900 p-3 rounded-2xl border border-[#D2EBD7] dark:border-slate-800 shadow-xs self-start lg:self-center shrink-0">
          <div className="text-left font-mono">
            <span className="text-[10px] text-slate-500 uppercase block font-bold">Proactive Window</span>
            <span className="text-sm font-black text-emerald-700 dark:text-emerald-400">48h Early Warning</span>
          </div>
          <div className="h-8 w-px bg-slate-200 dark:bg-slate-800" />
          <div className="text-left font-mono">
            <span className="text-[10px] text-slate-500 uppercase block font-bold">Disease Knowledge</span>
            <span className="text-sm font-black text-slate-800 dark:text-white">ICAR / TNAU Models</span>
          </div>
        </div>
      </div>

      {/* 2. FARM-WIDE PLOT RISK RADAR SUMMARY */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className={`p-4 rounded-2xl border transition-all ${
          isDark ? 'bg-emerald-950/20 border-emerald-800/60' : 'bg-emerald-50/80 border-emerald-200'
        }`}>
          <div className="flex items-center justify-between text-xs font-mono font-bold">
            <span className="text-emerald-800 dark:text-emerald-300">🟢 LOW RISK</span>
            <span className="text-lg font-black text-emerald-700 dark:text-emerald-400">{farmRiskSummary.low} Plots</span>
          </div>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Unfavorable for pathogen development</p>
        </div>

        <div className={`p-4 rounded-2xl border transition-all ${
          isDark ? 'bg-amber-950/20 border-amber-800/60' : 'bg-amber-50/80 border-amber-200'
        }`}>
          <div className="flex items-center justify-between text-xs font-mono font-bold">
            <span className="text-amber-800 dark:text-amber-300">🟡 MODERATE RISK</span>
            <span className="text-lg font-black text-amber-700 dark:text-amber-400">{farmRiskSummary.moderate} Plots</span>
          </div>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Some conditions becoming favorable</p>
        </div>

        <div className={`p-4 rounded-2xl border transition-all ${
          isDark ? 'bg-orange-950/20 border-orange-800/60' : 'bg-orange-50/80 border-orange-200'
        }`}>
          <div className="flex items-center justify-between text-xs font-mono font-bold">
            <span className="text-orange-800 dark:text-orange-300">🟠 HIGH RISK</span>
            <span className="text-lg font-black text-orange-700 dark:text-orange-400">{farmRiskSummary.high} Plots</span>
          </div>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Multiple conditions persistently favorable</p>
        </div>

        <div className={`p-4 rounded-2xl border transition-all ${
          isDark ? 'bg-rose-950/20 border-rose-800/60' : 'bg-rose-50/80 border-rose-200'
        }`}>
          <div className="flex items-center justify-between text-xs font-mono font-bold">
            <span className="text-rose-800 dark:text-rose-300">🔴 VERY HIGH</span>
            <span className="text-lg font-black text-rose-700 dark:text-rose-400">{farmRiskSummary.veryHigh} Plots</span>
          </div>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Optimal epidemic incubation trigger</p>
        </div>
      </div>

      {/* 3. FARM PLOT SELECTOR GRID */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-400 font-mono flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            <span>Select Cultivated Farm Zone ({INITIAL_PLOTS.length} Active Plots)</span>
          </span>
          <span className="text-[10px] text-slate-500 font-mono">Click to Inspect Disease Suitability</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {farmPlotsEvaluations.map(({ plot, topDisease, topRiskScore, topRiskLevel }) => {
            const isSelected = plot.id === selectedPlotId;
            return (
              <div
                key={plot.id}
                onClick={() => handlePlotSelect(plot)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-3 group shadow-xs ${
                  isSelected
                    ? 'border-[#047857] bg-emerald-50/60 dark:bg-emerald-950/30 shadow-md scale-[1.01]'
                    : isDark
                    ? 'border-slate-800 bg-slate-900/80 hover:border-slate-700'
                    : 'border-[#D2EBD7] bg-white hover:border-emerald-300'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-black text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                        {plot.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                        {plot.variety} • {plot.acreage}
                      </p>
                    </div>

                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase font-mono shrink-0 ${
                      topRiskLevel === 'VERY_HIGH'
                        ? 'bg-rose-100 text-rose-800 border border-rose-300 dark:bg-rose-950 dark:text-rose-300'
                        : topRiskLevel === 'HIGH'
                        ? 'bg-orange-100 text-orange-800 border border-orange-300 dark:bg-orange-950 dark:text-orange-300'
                        : topRiskLevel === 'MODERATE'
                        ? 'bg-amber-100 text-amber-800 border border-amber-300 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
                    }`}>
                      {topRiskScore}% {topRiskLevel.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Primary Threat Summary */}
                  {topDisease && (
                    <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px]">
                      <span className="text-slate-500 block text-[10px]">Primary Microclimate Risk:</span>
                      <strong className="text-slate-800 dark:text-slate-200 font-bold truncate block">
                        {topDisease.diseaseName}
                      </strong>
                    </div>
                  )}
                </div>

                {/* Sensor Mini-Pills */}
                <div className="grid grid-cols-3 gap-1 pt-1 text-[10px] font-mono text-slate-600 dark:text-slate-400 bg-slate-100/60 dark:bg-slate-800/60 p-2 rounded-xl">
                  <div>🌡 {plot.telemetry.temp}°C</div>
                  <div>💧 {plot.telemetry.rh}% RH</div>
                  <div>🍃 {plot.telemetry.leafWetnessHours}h Wet</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. ACTIVE PLOT DEEP-DIVE & INTERACTIVE TELEMETRY SIMULATOR */}
      <div className={`p-6 sm:p-7 rounded-3xl border shadow-sm space-y-6 ${
        isDark ? 'bg-[#0a1324] border-[#182a4a]' : 'bg-[#F5FCF7] border-[#D2EBD7]'
      }`}>
        
        {/* Plot Info & Control Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/70 dark:border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase font-mono bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300">
                Active Zone Analysis
              </span>
              <span className="text-xs text-slate-500 font-mono">{selectedPlot.sensorSource}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              {selectedPlot.name} — {selectedPlot.variety}
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              Location: <strong>{selectedPlot.location}</strong> • Soil: <strong>{selectedPlot.soilType}</strong> • Stage: <strong>{selectedPlot.stageName}</strong>
            </p>
          </div>

          {/* Quick Simulation Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-center">
            <button
              onClick={handleSimulateMonsoonSurge}
              className="py-2 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-black shadow-xs flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
              title="Simulate sudden high-humidity rain spell"
            >
              <CloudRain className="w-3.5 h-3.5" />
              <span>Simulate Rain Surge (95% RH)</span>
            </button>

            <button
              onClick={handleResetToSensors}
              className="py-2 px-3 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Sensors</span>
            </button>
          </div>
        </div>

        {/* Interactive Telemetry Slider Matrix */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 font-mono flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-emerald-600" />
              <span>Live Sensor Telemetry & Microclimate Simulator</span>
            </span>
            <span className="text-[10px] text-slate-500 font-mono">Adjust to test disease suitability models</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs font-mono">
            
            {/* 1. Temp */}
            <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
              <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold">
                <span>🌡️ Temperature</span>
                <strong className="text-slate-900 dark:text-white text-xs">{simulatedTelemetry.temp}°C</strong>
              </div>
              <input 
                type="range" min="10" max="42" step="0.5" 
                value={simulatedTelemetry.temp} 
                onChange={(e) => setSimulatedTelemetry(p => ({ ...p, temp: parseFloat(e.target.value) }))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#047857]"
              />
            </div>

            {/* 2. Relative Humidity */}
            <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
              <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold">
                <span>💧 Relative Humidity</span>
                <strong className="text-slate-900 dark:text-white text-xs">{simulatedTelemetry.rh}%</strong>
              </div>
              <input 
                type="range" min="30" max="100" step="1" 
                value={simulatedTelemetry.rh} 
                onChange={(e) => setSimulatedTelemetry(p => ({ ...p, rh: parseInt(e.target.value) }))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#047857]"
              />
            </div>

            {/* 3. Leaf Wetness Hours */}
            <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
              <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold">
                <span>🍃 Leaf Wetness</span>
                <strong className="text-slate-900 dark:text-white text-xs">{simulatedTelemetry.leafWetnessHours}h</strong>
              </div>
              <input 
                type="range" min="0" max="24" step="0.5" 
                value={simulatedTelemetry.leafWetnessHours} 
                onChange={(e) => setSimulatedTelemetry(p => ({ ...p, leafWetnessHours: parseFloat(e.target.value) }))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#047857]"
              />
            </div>

            {/* 4. Soil Moisture */}
            <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
              <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold">
                <span>💦 Soil VWC</span>
                <strong className="text-slate-900 dark:text-white text-xs">{simulatedTelemetry.soilVWC}%</strong>
              </div>
              <input 
                type="range" min="15" max="95" step="1" 
                value={simulatedTelemetry.soilVWC} 
                onChange={(e) => setSimulatedTelemetry(p => ({ ...p, soilVWC: parseInt(e.target.value) }))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#047857]"
              />
            </div>

            {/* 5. 24h Rainfall */}
            <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
              <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold">
                <span>🌧️ 24h Rain</span>
                <strong className="text-slate-900 dark:text-white text-xs">{simulatedTelemetry.rain24h}mm</strong>
              </div>
              <input 
                type="range" min="0" max="80" step="1" 
                value={simulatedTelemetry.rain24h} 
                onChange={(e) => setSimulatedTelemetry(p => ({ ...p, rain24h: parseInt(e.target.value) }))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#047857]"
              />
            </div>

            {/* 6. Persistence Hours */}
            <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
              <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold">
                <span>⏱️ Favorable Time</span>
                <strong className="text-slate-900 dark:text-white text-xs">{simulatedTelemetry.hoursFavorable}h</strong>
              </div>
              <input 
                type="range" min="1" max="48" step="1" 
                value={simulatedTelemetry.hoursFavorable} 
                onChange={(e) => setSimulatedTelemetry(p => ({ ...p, hoursFavorable: parseInt(e.target.value) }))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#047857]"
              />
            </div>

          </div>
        </div>

        {/* 5. ALL DISEASES FOR THIS CROP - TABS & PREDICTIONS */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-400 font-mono">
              Scientific Disease Risk Predictions ({currentPlotEval.allDiseases.length} Pathogen Models for {selectedPlot.crop.toUpperCase()})
            </span>
            <span className="text-[10px] text-slate-500 font-mono">Sorted by Risk Score</span>
          </div>

          {/* Disease Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentPlotEval.allDiseases.map((dis) => {
              const isSelectedDisease = dis.diseaseId === activeDiseaseEval.diseaseId;
              return (
                <div
                  key={dis.diseaseId}
                  onClick={() => setSelectedDiseaseId(dis.diseaseId)}
                  className={`p-5 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-4 shadow-sm ${
                    isSelectedDisease
                      ? 'border-[#047857] bg-white dark:bg-slate-900 shadow-md ring-2 ring-[#047857]/20'
                      : isDark
                      ? 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                      : 'border-[#D2EBD7] bg-white/80 hover:border-emerald-300'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase font-mono ${
                            dis.riskLevel === 'VERY_HIGH'
                              ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-300'
                              : dis.riskLevel === 'HIGH'
                              ? 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300 border border-orange-300'
                              : dis.riskLevel === 'MODERATE'
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300'
                              : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300'
                          }`}>
                            {dis.riskLevelLabel}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">{dis.pathogenType}</span>
                        </div>

                        <h3 className="font-black text-sm sm:text-base text-slate-900 dark:text-white mt-1">
                          {dis.diseaseName}
                        </h3>
                        <p className="text-[11px] text-slate-500 italic font-medium">
                          {dis.pathogen}
                        </p>
                      </div>

                      {/* Large Circular/Pill Risk Score */}
                      <div className="text-right shrink-0">
                        <span className="text-2xl font-black font-mono text-slate-900 dark:text-white">
                          {dis.riskScore}%
                        </span>
                        <span className="text-[9px] text-slate-500 uppercase block font-bold">Suitability</span>
                      </div>
                    </div>

                    {/* Contributing Factor Bar Pills */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-2 text-[10px] font-mono">
                      {dis.factorBreakdown.slice(0, 4).map((f, i) => (
                        <div 
                          key={i} 
                          className={`p-1.5 rounded-xl border text-center ${
                            f.isFavorable 
                              ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200' 
                              : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          <span className="block font-bold truncate">{f.symbol} {f.factor}</span>
                          <span className="text-[9px] opacity-80">{f.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Early Warning Mandatory Notice */}
                  <div className="p-3 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-[11px] text-emerald-900 dark:text-emerald-200 font-medium">
                    <p>💡 {dis.warningNotice}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 6. DEEP-DIVE FACTOR EXPLAINABILITY BREAKDOWN */}
        {activeDiseaseEval && (
          <div className="space-y-4 pt-4 border-t border-slate-200/70 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-black text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <Info className="w-4 h-4 text-emerald-600" />
                  <span>Explainable Suitability Breakdown: {activeDiseaseEval.diseaseName}</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Detailed parameter-by-parameter evaluation against scientifically validated infection boundaries
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
                {activeDiseaseEval.favorableFactorsCount} / {activeDiseaseEval.totalFactorsCount} Factors Favorable
              </span>
            </div>

            {/* Factor Table / Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {activeDiseaseEval.factorBreakdown.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border transition-all space-y-2 ${
                    item.isFavorable
                      ? 'bg-amber-50/60 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800/80'
                      : isDark
                      ? 'bg-slate-900/60 border-slate-800'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold font-mono">
                    <span className="flex items-center gap-1.5 text-slate-900 dark:text-white">
                      <span>{item.symbol}</span>
                      <span>{item.factor}</span>
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                      item.isFavorable 
                        ? 'bg-amber-200 text-amber-900 dark:bg-amber-900 dark:text-amber-200' 
                        : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <div className="space-y-1 text-[11px] font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Observed Value:</span>
                      <strong className="text-slate-900 dark:text-white">{item.value}</strong>
                    </div>
                    <div className="flex justify-between text-[10px]">
                      <span className="text-slate-500">Optimal Window:</span>
                      <span className="text-slate-700 dark:text-slate-300">{item.optimalRange}</span>
                    </div>
                    <div className="flex justify-between text-[10px]">
                      <span className="text-slate-500">Parameter Weight:</span>
                      <span className="text-slate-700 dark:text-slate-300">{item.weightPct}% importance</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${item.isFavorable ? 'bg-amber-500' : 'bg-slate-400'}`} 
                      style={{ width: `${item.score}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Narrative Explanation Card */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-[#D2EBD7] dark:border-slate-800 space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-400 font-mono block">
                📝 Biological Reason & Epidemic Forecast:
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                {activeDiseaseEval.explanationNarrative}
              </p>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="text-slate-600 dark:text-slate-400">
                  <strong>Recommended IPM Protocol:</strong> {activeDiseaseEval.recommendedAction}
                </div>
                <button
                  onClick={() => setActiveTab('scan')}
                  className="py-2 px-3 rounded-xl bg-[#047857] hover:bg-[#065F46] text-white font-black text-xs shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 shrink-0"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Verify with AI Leaf Scanner</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 7. 24-HOUR MICROCLIMATE RISK TRAJECTORY GRAPH */}
        {activeDiseaseEval && (
          <div className="space-y-4 pt-4 border-t border-slate-200/70 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-black text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span>24-Hour Microclimate Suitability Trajectory</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Simulated temporal evolution based on diurnal temperature swings and night humidity dew accumulation
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">Hourly Telemetry Feed</span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={riskTrendData}>
                  <defs>
                    <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#047857" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#047857" stopOpacity={0.05}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#1e293b" : "#e2e8f0"} />
                  <XAxis dataKey="time" stroke={isDark ? "#94a3b8" : "#64748b"} fontSize={10} />
                  <YAxis unit="%" domain={[0, 100]} stroke={isDark ? "#94a3b8" : "#64748b"} fontSize={10} />
                  <Tooltip 
                    formatter={(val, name) => [`${val}%`, name === 'riskScore' ? 'Disease Risk Score' : name]}
                    contentStyle={{ backgroundColor: isDark ? '#0f172a' : '#ffffff', borderRadius: '12px', border: '1px solid #cbd5e1' }} 
                  />
                  <Area type="monotone" dataKey="riskScore" name="Disease Risk Score" stroke="#047857" strokeWidth={3} fillOpacity={1} fill="url(#riskGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* 8. SCIENTIFIC CITATIONS & SOURCE RELIABILITY ACCORDION */}
        {activeDiseaseEval && (
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
            <span className="font-black uppercase tracking-wider text-[10px] text-slate-500 font-mono block">
              📚 Scientific References & Validated Threshold Sources:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activeDiseaseEval.scientificReferences.map((ref, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-[11px]">
                  <strong className="text-emerald-800 dark:text-emerald-400 font-mono block">{ref.source}</strong>
                  <span className="text-slate-600 dark:text-slate-400">{ref.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
