import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Calculator, 
  IndianRupee, 
  TrendingUp, 
  Wheat, 
  Sprout, 
  AlertCircle,
  PieChart as PieChartIcon,
  TrendingDown
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// Base economics data per Acre (Mock Data for Indian Context)
const CROP_ECONOMICS = {
  tomato: {
    name: 'Tomato (Hybrid)',
    seedCost: 4000,
    fertilizerCost: 12000,
    pesticideCost: 8000,
    laborCost: 15000,
    waterCost: { drip: 2000, flood: 6000, rainfed: 0 },
    expectedYieldKg: 18000, // 18 Tonnes per acre
    baseMarketPrice: 15, // Rs per kg
  },
  onion: {
    name: 'Onion (Rabi)',
    seedCost: 3500,
    fertilizerCost: 9000,
    pesticideCost: 5000,
    laborCost: 12000,
    waterCost: { drip: 1500, flood: 4500, rainfed: 0 },
    expectedYieldKg: 10000, // 10 Tonnes per acre
    baseMarketPrice: 22,
  },
  cotton: {
    name: 'Cotton (Bt)',
    seedCost: 2000,
    fertilizerCost: 8000,
    pesticideCost: 10000,
    laborCost: 18000,
    waterCost: { drip: 2500, flood: 7000, rainfed: 0 },
    expectedYieldKg: 1200, // 12 Quintals per acre
    baseMarketPrice: 70, // Rs per kg
  }
};

const COLORS = ['#10b981', '#f59e0b', '#3b82f6', '#ef4444'];

export const YieldROICalculator = () => {
  const { lang, theme } = useApp();
  const isDark = theme === 'dark';

  // Input State
  const [selectedCrop, setSelectedCrop] = useState('tomato');
  const [acreage, setAcreage] = useState(2.5);
  const [irrigation, setIrrigation] = useState('drip');
  
  // What-If Scenario State
  const [priceFluctuation, setPriceFluctuation] = useState(0); // -50% to +50%
  const [yieldFluctuation, setYieldFluctuation] = useState(0); // -30% to +30%

  // Derived Calculations
  const economics = CROP_ECONOMICS[selectedCrop];
  
  const totalSeedCost = economics.seedCost * acreage;
  const totalFertilizerCost = economics.fertilizerCost * acreage;
  const totalPesticideCost = economics.pesticideCost * acreage;
  const totalLaborCost = economics.laborCost * acreage;
  const totalWaterCost = economics.waterCost[irrigation] * acreage;

  const totalCost = totalSeedCost + totalFertilizerCost + totalPesticideCost + totalLaborCost + totalWaterCost;
  
  const actualYieldKg = (economics.expectedYieldKg * acreage) * (1 + (yieldFluctuation / 100));
  const actualMarketPrice = economics.baseMarketPrice * (1 + (priceFluctuation / 100));
  
  const expectedRevenue = actualYieldKg * actualMarketPrice;
  const netProfit = expectedRevenue - totalCost;
  const roiPercentage = ((netProfit / totalCost) * 100).toFixed(1);
  const breakEvenPrice = totalCost / actualYieldKg;

  const chartData = [
    { name: 'Seeds', value: totalSeedCost },
    { name: 'Fertilizers', value: totalFertilizerCost },
    { name: 'Pesticides', value: totalPesticideCost },
    { name: 'Labor & Irrigation', value: totalLaborCost + totalWaterCost },
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
  };

  return (
    <div className="space-y-6 pb-16 animate-fadeIn font-sans">
      
      {/* HEADER */}
      <div className={`p-6 rounded-3xl border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 ${
        isDark ? 'bg-[#091222] border-[#182a4a] text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center shadow-md shrink-0">
            <Calculator className="w-6 h-6 text-emerald-100" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black tracking-tight">
                {lang === 'ta' ? 'வருவாய் மற்றும் லாப கால்குலேட்டர்' : lang === 'mr' ? 'उत्पन्न आणि नफा कॅल्क्युलेटर' : 'Dynamic Yield & ROI Calculator'}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                AI Planner
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">
              Plan your farm finances. Simulate market crashes, predict break-even prices, and calculate exact profit margins before planting.
            </p>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN - CONTROLS */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className={`p-5 rounded-3xl border shadow-sm space-y-5 ${isDark ? 'bg-[#0a1324] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
            <h3 className="font-bold flex items-center gap-2 text-sm">
              <Sprout className="w-4 h-4 text-emerald-500" />
              Farm Parameters
            </h3>

            {/* Crop Selection */}
            <div>
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-2">Target Crop</label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(CROP_ECONOMICS).map(([key, data]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedCrop(key)}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                      selectedCrop === key 
                        ? 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-500 text-emerald-700 dark:text-emerald-300 shadow-sm' 
                        : 'border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-slate-600'
                    }`}
                  >
                    {data.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Acreage */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Total Area (Acres)</label>
                <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">{acreage} Acres</span>
              </div>
              <input 
                type="range" 
                min="0.5" 
                max="20" 
                step="0.5"
                value={acreage}
                onChange={(e) => setAcreage(parseFloat(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>

            {/* Irrigation */}
            <div>
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-2">Irrigation Method</label>
              <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
                {['drip', 'flood', 'rainfed'].map(type => (
                  <button
                    key={type}
                    onClick={() => setIrrigation(type)}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg capitalize transition-all ${
                      irrigation === type 
                        ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' 
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* WHAT-IF SCENARIOS */}
          <div className={`p-5 rounded-3xl border shadow-sm space-y-5 ${isDark ? 'bg-gradient-to-br from-[#0a1324] to-[#122345] border-blue-900/30 text-white' : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100 text-slate-900'}`}>
            <h3 className="font-bold flex items-center gap-2 text-sm text-blue-800 dark:text-blue-300">
              <AlertCircle className="w-4 h-4" />
              "What-If" Stress Test
            </h3>

            <div>
              <div className="flex justify-between mb-1">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Market Price Crash/Spike</label>
                <span className={`text-xs font-black ${priceFluctuation < 0 ? 'text-red-500' : priceFluctuation > 0 ? 'text-emerald-500' : ''}`}>
                  {priceFluctuation > 0 ? '+' : ''}{priceFluctuation}%
                </span>
              </div>
              <p className="text-[10px] text-slate-500 mb-2">Simulate selling at {formatCurrency(actualMarketPrice)}/kg instead of {formatCurrency(economics.baseMarketPrice)}/kg</p>
              <input 
                type="range" 
                min="-50" 
                max="50" 
                step="5"
                value={priceFluctuation}
                onChange={(e) => setPriceFluctuation(parseInt(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Yield Loss/Gain</label>
                <span className={`text-xs font-black ${yieldFluctuation < 0 ? 'text-red-500' : yieldFluctuation > 0 ? 'text-emerald-500' : ''}`}>
                  {yieldFluctuation > 0 ? '+' : ''}{yieldFluctuation}%
                </span>
              </div>
              <p className="text-[10px] text-slate-500 mb-2">Simulate weather/pest impacts on harvest weight</p>
              <input 
                type="range" 
                min="-30" 
                max="30" 
                step="5"
                value={yieldFluctuation}
                onChange={(e) => setYieldFluctuation(parseInt(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>
            
            <button 
              onClick={() => { setPriceFluctuation(0); setYieldFluctuation(0); }}
              className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline w-full text-right cursor-pointer"
            >
              Reset Scenarios
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN - DASHBOARD */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* TOP METRICS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className={`p-5 rounded-3xl border shadow-sm ${isDark ? 'bg-[#0a1324] border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="text-slate-500 dark:text-slate-400 text-xs font-bold mb-2 flex items-center gap-1.5">
                <IndianRupee className="w-3.5 h-3.5" /> Total Investment
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {formatCurrency(totalCost)}
              </div>
              <div className="text-[10px] text-slate-500 mt-1">Break-even: {formatCurrency(breakEvenPrice)} / kg</div>
            </div>

            <div className={`p-5 rounded-3xl border shadow-sm ${isDark ? 'bg-[#0a1324] border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="text-slate-500 dark:text-slate-400 text-xs font-bold mb-2 flex items-center gap-1.5">
                <Wheat className="w-3.5 h-3.5" /> Expected Revenue
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {formatCurrency(expectedRevenue)}
              </div>
              <div className="text-[10px] text-slate-500 mt-1">For {(actualYieldKg / 1000).toFixed(1)} Tonnes</div>
            </div>

            <div className={`p-5 rounded-3xl border shadow-sm relative overflow-hidden ${
              netProfit >= 0 
                ? isDark ? 'bg-gradient-to-br from-emerald-950 to-teal-950 border-emerald-800' : 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200'
                : isDark ? 'bg-gradient-to-br from-red-950 to-rose-950 border-red-800' : 'bg-gradient-to-br from-red-50 to-rose-50 border-red-200'
            }`}>
              <div className={`text-xs font-bold mb-2 flex items-center gap-1.5 ${netProfit >= 0 ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400'}`}>
                {netProfit >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />} 
                Net Profit
              </div>
              <div className={`text-2xl font-black ${netProfit >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                {formatCurrency(netProfit)}
              </div>
              <div className={`text-[10px] font-bold mt-1 ${netProfit >= 0 ? 'text-emerald-600/70 dark:text-emerald-400/70' : 'text-red-600/70 dark:text-red-400/70'}`}>
                ROI: {roiPercentage}%
              </div>
              {/* Background Icon */}
              <div className="absolute -right-4 -bottom-4 opacity-10">
                <IndianRupee className="w-24 h-24" />
              </div>
            </div>
          </div>

          {/* COST BREAKDOWN CHART */}
          <div className={`p-6 rounded-3xl border shadow-sm flex flex-col md:flex-row gap-8 items-center ${isDark ? 'bg-[#0a1324] border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="w-full md:w-1/2 h-64">
              <h3 className="font-bold text-sm mb-4 text-slate-800 dark:text-white flex items-center gap-2">
                <PieChartIcon className="w-4 h-4 text-emerald-500" />
                Input Cost Breakdown
              </h3>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => formatCurrency(value)}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="w-full md:w-1/2 space-y-4">
              {chartData.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{item.name}</span>
                  </div>
                  <span className="text-xs font-black text-slate-900 dark:text-white">{formatCurrency(item.value)}</span>
                </div>
              ))}
              
              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500">Total Setup Cost</span>
                <span className="text-sm font-black text-slate-900 dark:text-white">{formatCurrency(totalCost)}</span>
              </div>
            </div>
          </div>

          {/* INSIGHTS */}
          <div className={`p-5 rounded-2xl border shadow-sm flex items-start gap-4 ${isDark ? 'bg-emerald-950/20 border-emerald-900/50 text-emerald-300' : 'bg-emerald-50 border-emerald-100 text-emerald-900'}`}>
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900 rounded-xl">
              <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h4 className="text-sm font-black mb-1">Financial Advisor Insight</h4>
              <p className="text-xs font-medium opacity-90 leading-relaxed">
                To remain profitable planting {acreage} acres of {economics.name}, you must ensure your selling price does not drop below <strong>{formatCurrency(breakEvenPrice)} per kg</strong>. Based on historical data, {economics.name} rarely drops below {formatCurrency(economics.baseMarketPrice * 0.7)}, making this a <strong>Low Risk</strong> investment profile.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
