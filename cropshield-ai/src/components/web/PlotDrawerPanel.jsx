import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  AlertOctagon, 
  Droplets, 
  Sun, 
  CloudRain, 
  Camera, 
  ShoppingBag, 
  Activity, 
  ShieldCheck, 
  Plus, 
  ArrowRight 
} from 'lucide-react';

export const PlotDrawerPanel = ({ plot, onClose, onNavigate, onToggleDrip }) => {
  const { lang, t, theme, addToCart, openDirectCheckout } = useApp();
  const isDark = theme === 'dark';
  const [activeDrawerTab, setActiveDrawerTab] = useState('health'); // 'health' | 'weather' | 'actions'
  const [addedToast, setAddedToast] = useState(null);

  if (!plot) return null;

  const isRed = plot.color === 'red';
  const isAmber = plot.color === 'amber';

  const getPlotLocalized = (field) => {
    if (!plot) return '';
    const localizedField = `${field}_${lang}`;
    if (plot[localizedField]) return plot[localizedField];
    if (lang === 'mr' && plot[`${field}Mr`]) return plot[`${field}Mr`];
    if (lang === 'hi' && plot[`${field}Hi`]) return plot[`${field}Hi`];
    if (lang === 'ta' && plot[`${field}Ta`]) return plot[`${field}Ta`];
    if (lang === 'te' && plot[`${field}Te`]) return plot[`${field}Te`];
    if (lang === 'kn' && plot[`${field}Kn`]) return plot[`${field}Kn`];
    return plot[field] || '';
  };

  const plotName = getPlotLocalized('name');
  const cropName = getPlotLocalized('cropName');
  const acreage = getPlotLocalized('acreage');
  const diseaseName = getPlotLocalized('diseaseName');
  const advice = getPlotLocalized('advice') || plot.adviceEn;

  const handleAddToCart = () => {
    if (plot.urgentAction) {
      addToCart({
        id: `med-${plot.id}`,
        name: plot.urgentAction,
        price: plot.color === 'red' ? 240 : 320,
        mrp: plot.color === 'red' ? 320 : 410,
        unit: 'Pack',
        category: 'Crop Protection',
        icon: '🧪',
        subsidyDiscount: 80
      });
      setAddedToast(`Added ${plot.urgentAction} to cart!`);
      setTimeout(() => setAddedToast(null), 2500);
    }
  };

  const handleDirectOrder = () => {
    if (plot.urgentAction) {
      openDirectCheckout({
        id: `direct-plot-${plot.id}`,
        name: plot.urgentAction,
        price: plot.color === 'red' ? 240 : 320,
        mrp: plot.color === 'red' ? 320 : 410,
        unit: 'Pack',
        category: 'Crop Protection',
        icon: '🧪',
        subsidyDiscount: 80
      });
      onClose();
    }
  };

  const handleScanLeaf = () => {
    onClose();
    onNavigate('scan');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Toast */}
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-600 text-white font-black text-xs shadow-2xl flex items-center gap-2 animate-slideUp">
          <CheckCircle2 className="w-5 h-5" />
          <span>{addedToast}</span>
        </div>
      )}

      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-fadeIn"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className={`w-screen max-w-lg shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out animate-slideLeft ${
          isDark ? 'bg-[#0b1424] text-slate-100 border-l border-[#1c2c4a]' : 'bg-[#F5FCF7] text-slate-900 border-l border-[#D2EBD7]'
        }`}>
          
          {/* Drawer Header */}
          <div className={`p-5 sm:p-6 border-b flex items-start justify-between ${
            isDark ? 'border-slate-800 bg-slate-900' : 'border-[#D2EBD7] bg-[#EAF6ED]'
          }`}>
            <div className="flex items-center space-x-3.5">
              <div className={`w-13 h-13 rounded-2xl border flex items-center justify-center text-3xl shadow-xs ${
                isDark ? 'bg-slate-800 border-slate-700' : 'bg-emerald-100/80 border-[#D2EBD7]'
              }`}>
                {plot.cropIcon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight">
                    {plotName}
                  </h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider font-mono ${
                    isRed ? 'bg-rose-600 text-white' : isAmber ? 'bg-amber-600 text-white' : 'bg-[#047857] text-white'
                  }`}>
                    {isRed ? t('critical', 'Critical') : isAmber ? t('warning', 'Warning') : t('healthy', 'Healthy')}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-bold mt-0.5">
                  {cropName} • {acreage} ({lang === 'mr' ? 'मिरज विभाग' : 'Miraj Block'})
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-2xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-[#DCF2E2] dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Switcher */}
          <div className={`flex border-b p-2 gap-1.5 text-xs font-black ${
            isDark ? 'border-slate-800 bg-slate-950' : 'border-[#D2EBD7] bg-[#EAF6ED]'
          }`}>
            {[
              { id: 'health', labelKey: 'cropHealthTab', defaultLabel: 'Crop Health', icon: Activity },
              { id: 'weather', labelKey: 'weatherSoilTab', defaultLabel: 'Weather & Soil', icon: CloudRain },
              { id: 'actions', labelKey: 'whatToDoTab', defaultLabel: 'Action Plan', icon: ShieldCheck }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveDrawerTab(tab.id)}
                  className={`flex-1 py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    activeDrawerTab === tab.id
                      ? 'bg-[#047857] text-white shadow-sm'
                      : isDark 
                      ? 'text-slate-400 hover:text-white' 
                      : 'text-slate-700 hover:text-[#047857] hover:bg-[#DCF2E2]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{t(tab.labelKey, tab.defaultLabel)}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Contents */}
          <div className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-4">

            {/* TAB 1: CROP HEALTH */}
            {activeDrawerTab === 'health' && (
              <div className="space-y-4 animate-fadeIn">
                <div className={`p-5 rounded-3xl space-y-3.5 border ${
                  isRed 
                    ? isDark 
                      ? 'bg-rose-950/40 border-rose-500/70 text-rose-200' 
                      : 'bg-[#FFF1F2] border-rose-400 text-rose-950'
                    : isAmber 
                    ? isDark 
                      ? 'bg-amber-950/40 border-amber-500/70 text-amber-200' 
                      : 'bg-[#FFFBEB] border-amber-400 text-amber-950'
                    : isDark 
                      ? 'bg-emerald-950/40 border-emerald-500/70 text-emerald-200' 
                      : 'bg-[#EAF6ED] border-[#D2EBD7] text-emerald-950'
                }`}>
                  <div className="flex items-center space-x-2 font-black text-sm sm:text-base">
                    {isRed ? <AlertOctagon className="w-6 h-6 text-rose-500 shrink-0" /> : isAmber ? <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0" /> : <CheckCircle2 className="w-6 h-6 text-emerald-700 shrink-0" />}
                    <span>{isRed ? t('sprayNeeded', 'Spray Needed') : isAmber ? t('checkLeaves', 'Check Leaves') : t('optimalGrowth', 'Optimal Growth')}</span>
                  </div>

                  <p className="text-xs sm:text-sm leading-relaxed font-medium">
                    {advice}
                  </p>

                  {diseaseName && (
                    <div className={`p-3.5 rounded-2xl border space-y-1 ${
                      isDark ? 'bg-slate-900 border-rose-900/60' : 'bg-white/90 border-rose-200'
                    }`}>
                      <span className="text-[10px] uppercase tracking-wider font-black text-rose-600 dark:text-rose-400 block font-mono">
                        {t('detectedPathogen', 'Detected Pathogen')}
                      </span>
                      <strong className="text-xs sm:text-sm text-slate-900 dark:text-white block font-black">
                        {diseaseName}
                      </strong>
                    </div>
                  )}

                  {plot.urgentAction && (
                    <div className={`p-3.5 rounded-2xl border space-y-1 ${
                      isDark ? 'bg-slate-900 border-rose-800/60' : 'bg-white/90 border-[#D2EBD7]'
                    }`}>
                      <span className="text-[10px] uppercase tracking-wider font-black text-slate-600 dark:text-slate-400 block font-mono">
                        {t('recTreatmentDosage', 'Recommended Treatment & Formulation')}
                      </span>
                      <p className="text-xs sm:text-sm font-black text-[#047857] dark:text-emerald-400">
                        {plot.urgentAction}
                      </p>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                        {t('applyMorningHint', 'Apply during early morning before 10 AM.')}
                      </span>
                    </div>
                  )}
                </div>

                {/* Satellite NDVI Index */}
                <div className={`p-4 sm:p-5 rounded-3xl border space-y-2.5 ${
                  isDark ? 'border-slate-800 bg-slate-900' : 'border-[#D2EBD7] bg-[#F5FCF7] shadow-2xs'
                }`}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-600 dark:text-slate-400">
                      {t('sentinelNdviIndex', 'Sentinel-2 NDVI Vegetation Index')}
                    </span>
                    <strong className={`font-mono text-sm font-black ${isRed ? 'text-rose-600 dark:text-rose-400' : isAmber ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-800 dark:text-emerald-400'}`}>
                      {plot.ndvi} ({isRed ? 'Defoliated' : isAmber ? 'Mild Stress' : 'Vigorous'})
                    </strong>
                  </div>
                  
                  <div className="w-full h-2.5 rounded-full bg-emerald-200/60 dark:bg-slate-800 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        isRed ? 'bg-rose-500 w-[38%]' : isAmber ? 'bg-amber-500 w-[54%]' : 'bg-[#047857] w-[79%]'
                      }`} 
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 block font-medium">
                    {t('updatedFromPass', "Updated from today's Sentinel-2B pass over Sangli.")}
                  </span>
                </div>
              </div>
            )}

            {/* TAB 2: WEATHER & SOIL */}
            {activeDrawerTab === 'weather' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="grid grid-cols-2 gap-3">
                  <div className={`p-4 rounded-2xl border ${
                    isDark ? 'border-slate-800 bg-slate-900' : 'border-[#D2EBD7] bg-[#F5FCF7] shadow-2xs'
                  }`}>
                    <span className="text-[10px] font-black uppercase text-amber-700 dark:text-amber-400 font-mono">
                      {t('canopyTemp', 'Canopy Temp')}
                    </span>
                    <div className="text-xl font-black text-slate-900 dark:text-white mt-1 font-mono">{plot.temp}°C</div>
                    <span className="text-[10px] text-slate-500 mt-0.5 block">{t('optimalForGrowth', 'Optimal for growth')}</span>
                  </div>

                  <div className={`p-4 rounded-2xl border ${
                    isDark ? 'border-slate-800 bg-slate-900' : 'border-[#D2EBD7] bg-[#F5FCF7] shadow-2xs'
                  }`}>
                    <span className="text-[10px] font-black uppercase text-blue-700 dark:text-blue-400 font-mono">
                      {t('airHumidity', 'Air Humidity')}
                    </span>
                    <div className="text-xl font-black text-slate-900 dark:text-white mt-1 font-mono">68%</div>
                    <span className="text-[10px] text-amber-700 mt-0.5 block font-bold">{t('moderateFungalRisk', 'Moderate fungal risk')}</span>
                  </div>

                  <div className={`p-4 rounded-2xl border ${
                    isDark ? 'border-slate-800 bg-slate-900' : 'border-[#D2EBD7] bg-[#F5FCF7] shadow-2xs'
                  }`}>
                    <span className="text-[10px] font-black uppercase text-cyan-700 dark:text-cyan-400 font-mono">
                      {t('soilMoistureVwc', 'Soil Moisture')}
                    </span>
                    <div className="text-xl font-black text-slate-900 dark:text-white mt-1 font-mono">{plot.soilVWC}% VWC</div>
                    <span className="text-[10px] text-emerald-800 mt-0.5 block font-bold">{t('wellHydrated', 'Well hydrated')}</span>
                  </div>

                  <div className={`p-4 rounded-2xl border ${
                    isDark ? 'border-slate-800 bg-slate-900' : 'border-[#D2EBD7] bg-[#F5FCF7] shadow-2xs'
                  }`}>
                    <span className="text-[10px] font-black uppercase text-emerald-700 dark:text-emerald-400 font-mono">
                      {t('rainfall48h', 'Rainfall 48h')}
                    </span>
                    <div className="text-xl font-black text-slate-900 dark:text-white mt-1 font-mono">14 mm</div>
                    <span className="text-[10px] text-slate-500 mt-0.5 block">{t('lightShowers', 'Light showers evening')}</span>
                  </div>
                </div>

                {/* IoT Micro-Drip Valve Control */}
                <div className={`p-4 sm:p-5 rounded-3xl border space-y-3 ${
                  isDark ? 'border-slate-800 bg-slate-900' : 'border-[#D2EBD7] bg-[#F5FCF7] shadow-2xs'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-black text-slate-900 dark:text-white">
                        {t('microDripValve', 'Micro-Drip Irrigation Valve')}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {plot.dripOn ? t('waterFlowing', 'Currently Flowing (1.2 L/hr)') : t('valveClosed', 'Valve Closed')}
                      </p>
                    </div>

                    <button
                      onClick={() => onToggleDrip(plot.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        plot.dripOn 
                          ? 'bg-[#047857] text-white shadow-md' 
                          : isDark ? 'bg-slate-800 text-slate-400' : 'bg-[#DCF2E2] text-[#047857]'
                      }`}
                    >
                      {plot.dripOn ? t('valveOn', 'VALVE ON') : t('valveOff', 'VALVE OFF')}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: ACTION PLAN */}
            {activeDrawerTab === 'actions' && (
              <div className="space-y-4 animate-fadeIn">
                <div className={`p-4 sm:p-5 rounded-3xl border space-y-3 ${
                  isDark ? 'border-slate-800 bg-slate-900' : 'border-[#D2EBD7] bg-[#F5FCF7] shadow-2xs'
                }`}>
                  <h4 className="text-xs font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-400 font-mono">
                    {t('stepByStepActionPlan', 'Step-by-Step Action Plan')}
                  </h4>

                  <div className="space-y-3 text-xs font-medium">
                    <div className="flex items-start space-x-3">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold flex items-center justify-center text-[10px] shrink-0">
                        1
                      </span>
                      <p className="text-slate-700 dark:text-slate-300">
                        {t('step1Prune', 'Prune infected lower foliage to reduce humidity pocket.')}
                      </p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold flex items-center justify-center text-[10px] shrink-0">
                        2
                      </span>
                      <p className="text-slate-700 dark:text-slate-300">
                        {t('step2Spray', 'Spray prescribed formulation in early morning (6-9 AM).')}
                      </p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold flex items-center justify-center text-[10px] shrink-0">
                        3
                      </span>
                      <p className="text-slate-700 dark:text-slate-300">
                        {t('step3Repeat', 'Repeat canopy scan in 48 hours to confirm cessation of lesions.')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Drawer Footer Actions */}
          <div className={`p-4 sm:p-5 border-t space-y-2.5 ${
            isDark ? 'border-slate-800 bg-slate-900' : 'border-[#D2EBD7] bg-[#EAF6ED]'
          }`}>
            {plot.urgentAction ? (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleAddToCart}
                  className={`py-3 px-3 rounded-2xl font-black text-xs border flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-all ${
                    isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700' : 'bg-[#F5FCF7] hover:bg-[#DCF2E2] text-slate-800 border-[#D2EBD7]'
                  }`}
                >
                  <Plus className="w-4 h-4 text-[#047857]" />
                  <span>{t('order', 'Add to Cart')}</span>
                </button>

                <button
                  onClick={handleDirectOrder}
                  className="py-3 px-3 rounded-2xl bg-gradient-to-r from-[#047857] to-[#059669] hover:from-[#065F46] hover:to-[#047857] text-white font-black text-xs shadow-md flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{t('orderMedicines', 'Order Medicines')}</span>
                </button>
              </div>
            ) : null}

            <button
              onClick={handleScanLeaf}
              className={`w-full py-3 rounded-2xl font-black text-xs border flex items-center justify-center gap-2 cursor-pointer transition-all shadow-xs ${
                isDark ? 'bg-slate-800 hover:bg-slate-700 text-emerald-400 border-slate-700' : 'bg-[#F5FCF7] hover:bg-[#DCF2E2] text-[#047857] border-[#D2EBD7]'
              }`}
            >
              <Camera className="w-4 h-4 text-[#047857]" />
              <span>{t('diagnoseThisPlot', 'Diagnose with Leaf Scanner')}</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
