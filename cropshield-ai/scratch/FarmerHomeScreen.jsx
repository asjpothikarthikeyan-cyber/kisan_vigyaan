import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { speakText } from '../../utils/speechUtils';
import { 
  AlertOctagon, 
  AlertTriangle, 
  CheckCircle2, 
  Volume2, 
  Droplets, 
  Zap, 
  Camera, 
  X, 
  ChevronRight, 
  Sun, 
  CloudRain, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const FarmerHomeScreen = ({ onNavigate }) => {
  const { lang, t, theme } = useApp();
  const isDark = theme === 'dark';

  // 6 Plot Tiles Data (One Status Color, Crop Icon, Minimal Numbers)
  const [plots, setPlots] = useState([
    {
      id: 'plot-1',
      name: 'Plot 1 - Rice Field',
      nameMr: 'प्लॉट १ - भात शेती',
      nameHi: 'प्लॉट 1 - धान खेत',
      cropIcon: '🌾',
      cropName: 'Rice (Paddy MTU 1010)',
      cropNameMr: 'भात (एमटीयू १०१०)',
      status: 'healthy',
      statusTextEn: 'Healthy • Growing Well',
      statusTextMr: 'निरोगी • जोमदार वाढ',
      statusTextHi: 'स्वस्थ • अच्छी वृद्धि',
      color: 'green',
      dripOn: true,
      mistingOn: false,
      adviceEn: 'Canopy is green and healthy. Continue standard irrigation schedule.',
      adviceMr: 'पीक अतिशय निरोगी आहे. नेहमीप्रमाणे ठिबक सिंचन सुरू ठेवा.',
      adviceHi: 'फसल पूरी तरह स्वस्थ है। सामान्य सिंचाई जारी रखें।',
      diseaseName: null,
      urgentAction: null
    },
    {
      id: 'plot-2',
      name: 'Plot 2 - Cotton Field',
      nameMr: 'प्लॉट २ - बीटी कापूस',
      nameHi: 'प्लॉट 2 - बीटी कपास',
      cropIcon: '🌿',
      cropName: 'Cotton (Bt Hybrid)',
      cropNameMr: 'कापूस (बीटी संकरित)',
      cropHi: 'कपास (बीटी)',
      status: 'critical',
      statusTextEn: 'Bacterial Blight • Spray Needed!',
      statusTextMr: 'जिवाणू करपा • फवारणी आवश्यक!',
      statusTextHi: 'बैक्टीरियल ब्लाइट • छिड़काव जरूरी!',
      color: 'red',
      dripOn: false,
      mistingOn: false,
      adviceEn: 'Bacterial Blight spots found on leaves. Spray Streptocycline within 24 hours to protect your bolls.',
      adviceMr: 'पानांवर जिवाणू करप्याचे डाग आढळले. बोंडे वाचवण्यासाठी २४ तासांत स्ट्रेप्टोमायसीन फवारा.',
      adviceHi: 'पत्तियों पर बैक्टीरियल ब्लाइट के लक्षण हैं। 24 घंटे में स्ट्रेप्टोसाइक्लिन का छिड़काव करें।',
      diseaseName: 'Bacterial Blight (Xanthomonas)',
      urgentAction: 'Streptocycline (0.5g/L) + Copper Oxychloride (2.5g/L)'
    },
    {
      id: 'plot-3',
      name: 'Plot 3 - Sugarcane',
      nameMr: 'प्लॉट ३ - ऊस',
      nameHi: 'प्लॉट 3 - गन्ना',
      cropIcon: '🎋',
      cropName: 'Sugarcane (Co 86032)',
      cropNameMr: 'ऊस (को ८६०३२)',
      cropHi: 'गन्ना (को 86032)',
      status: 'healthy',
      statusTextEn: 'Healthy • Optimal Moisture',
      statusTextMr: 'निरोगी • ओलावा योग्य',
      statusTextHi: 'स्वस्थ • उचित नमी',
      color: 'green',
      dripOn: true,
      mistingOn: false,
      adviceEn: 'Grand growth phase. Nitrogen levels are sufficient.',
      adviceMr: 'वाढ चांगली होत आहे. खत मात्रा पुरेशी आहे.',
      adviceHi: 'फसल की वृद्धि अच्छी है। खाद की मात्रा पर्याप्त है।',
      diseaseName: null,
      urgentAction: null
    },
    {
      id: 'plot-4',
      name: 'Plot 4 - Tomato Field',
      nameMr: 'प्लॉट ४ - टोमॅटो',
      nameHi: 'प्लॉट 4 - टमाटर',
      cropIcon: '🍅',
      cropName: 'Tomato (Abhinav F1)',
      cropNameMr: 'टोमॅटो (अभिनव)',
      cropHi: 'टमाटर (अभिनव)',
      status: 'warning',
      statusTextEn: 'Early Blight Warning • Check Leaves',
      statusTextMr: 'करपा रोगाचा धोका • पाने तपासा',
      statusTextHi: 'अगेती झुलसा चेतावनी • पत्तियां देखें',
      color: 'amber',
      dripOn: true,
      mistingOn: true,
      adviceEn: 'Initial brown rings seen on bottom leaves. Foliar spray of Mancozeb suggested.',
      adviceMr: 'खालच्या पानांवर तपकिरी डाग दिसत आहेत. मँकोझेब फवारणी करा.',
      adviceHi: 'निचली पत्तियों पर धब्बे दिखे हैं। मैंकोजेब का छिड़काव करें।',
      diseaseName: 'Early Blight (Alternaria)',
      urgentAction: 'Mancozeb 75% WP (2.0g/L)'
    },
    {
      id: 'plot-5',
      name: 'Plot 5 - Soybean',
      nameMr: 'प्लॉट ५ - सोयाबीन',
      nameHi: 'प्लॉट 5 - सोयाबीन',
      cropIcon: '🌱',
      cropName: 'Soybean (JS 335)',
      cropNameMr: 'सोयाबीन (जेएस ३३५)',
      cropHi: 'सोयाबीन (जेएस 335)',
      status: 'healthy',
      statusTextEn: 'Healthy • Pod Formation',
      statusTextMr: 'निरोगी • शेंगा भरण्याची अवस्था',
      statusTextHi: 'स्वस्थ • फली विकास',
      color: 'green',
      dripOn: false,
      mistingOn: false,
      adviceEn: 'Pod development on track. No insect attack detected.',
      adviceMr: 'शेंगांची वाढ योग्य दिशेने सुरू आहे.',
      adviceHi: 'फली विकास बहुत अच्छा हो रहा है।',
      diseaseName: null,
      urgentAction: null
    },
    {
      id: 'plot-6',
      name: 'Plot 6 - Pulses / Gram',
      nameMr: 'प्लॉट ६ - हरभरा',
      nameHi: 'प्लॉट 6 - चना',
      cropIcon: '🌾',
      cropName: 'Chickpea / Gram (Vijay)',
      cropNameMr: 'हरभरा (फुले विजय)',
      cropHi: 'चना (फुले विजय)',
      status: 'healthy',
      statusTextEn: 'Healthy • Vigorous',
      statusTextMr: 'निरोगी • उत्तम फूट',
      statusTextHi: 'स्वस्थ • उत्तम शाखाएं',
      color: 'green',
      dripOn: true,
      mistingOn: false,
      adviceEn: 'Branching phase healthy. Natural nitrogen fixation active.',
      adviceMr: 'झाडांना चांगली फूट आली आहे.',
      adviceHi: 'फसल स्वस्थ है।',
      diseaseName: null,
      urgentAction: null
    }
  ]);

  // Selected Plot for focused bottom sheet
  const [selectedPlot, setSelectedPlot] = useState(null);

  // Status Summary in Plain Language
  const heroTextEn = "2 of your 6 plots need attention today";
  const heroTextMr = "तुमच्या ६ पैकी २ शेतांवर आज लक्ष देण्याची गरज आहे";
  const heroTextHi = "आपके 6 में से 2 खेतों में आज ध्यान देने की जरूरत है";

  const currentHeroText = lang === 'mr' ? heroTextMr : lang === 'hi' ? heroTextHi : heroTextEn;

  const handleReadStatusAloud = () => {
    speakText(currentHeroText, lang);
  };

  const handleTogglePlotDrip = (plotId) => {
    setPlots(prev => prev.map(p => p.id === plotId ? { ...p, dripOn: !p.dripOn } : p));
    if (selectedPlot && selectedPlot.id === plotId) {
      setSelectedPlot(prev => ({ ...prev, dripOn: !prev.dripOn }));
    }
  };

  return (
    <div className="space-y-4 pb-24 max-w-lg mx-auto px-3 pt-3">
      {/* 1. Persistent Urgent Alert Header Strip */}
      <div className="p-3 bg-rose-50 border-2 border-rose-500 rounded-[12px] flex items-center justify-between shadow-xs">
        <div className="flex items-center space-x-2.5">
          <span className="w-3 h-3 rounded-full bg-rose-600 animate-ping shrink-0"></span>
          <div className="text-xs">
            <span className="font-bold text-rose-900 block">
              {lang === 'mr' ? '🚨 तातडीचा इशारा: प्लॉट २ (कापूस)' : '🚨 URGENT: Plot 2 (Cotton)'}
            </span>
            <p className="text-[11px] text-rose-800">
              {lang === 'mr' ? 'जिवाणू करप्यामुळे तातडीने फवारणी करा' : 'Bacterial Blight detected • Spray needed today'}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            const plot2 = plots.find(p => p.id === 'plot-2');
            setSelectedPlot(plot2);
          }}
          className="px-2.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-[6px] text-xs font-bold shrink-0 shadow-xs cursor-pointer"
        >
          {lang === 'mr' ? 'पहा' : 'Fix Now'}
        </button>
      </div>

      {/* 2. Single Large "Farm Status" Hero Card (One Traffic-Light Color + One Plain Sentence + 🔊 Read Aloud) */}
      <div className={`p-4 rounded-[16px] border-2 shadow-sm relative overflow-hidden transition-colors ${
        isDark ? 'bg-[#0e172a] border-amber-500/40 text-slate-100' : 'bg-amber-50/80 border-amber-500 text-slate-900'
      }`}>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            {/* Big Traffic Light Indicator */}
            <div className="w-12 h-12 rounded-full bg-amber-500/20 border-3 border-amber-500 flex items-center justify-center shrink-0">
              <span className="w-5 h-5 rounded-full bg-amber-500 animate-pulse"></span>
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 block">
                {lang === 'mr' ? 'आजची शेती स्थिती' : lang === 'hi' ? 'आज की खेत स्थिति' : "Today's Farm Status"}
              </span>
              <h2 className="text-[17px] sm:text-[19px] font-extrabold leading-tight mt-0.5">
                {currentHeroText}
              </h2>
            </div>
          </div>

          {/* Big Speaker Button */}
          <button
            onClick={handleReadStatusAloud}
            className="p-2.5 rounded-full bg-white border border-amber-300 text-amber-800 hover:bg-amber-100 shadow-sm shrink-0 transition-transform active:scale-90"
            title="Read Aloud"
            aria-label="Read Aloud"
          >
            <Volume2 className="w-5 h-5 text-amber-700" />
          </button>
        </div>

        {/* Quick Shortcut Row */}
        <div className="mt-3 pt-2.5 border-t border-amber-200/60 flex items-center justify-between text-xs font-bold text-amber-900">
          <span>Sangli • 6 Plots (14.5 Acres)</span>
          <span className="flex items-center gap-1 text-[#1B5E20]">
            <span>Weather: 29°C</span>
            <Sun className="w-3.5 h-3.5 text-amber-500" />
          </span>
        </div>
      </div>

      {/* 3. Section Title */}
      <div className="flex items-center justify-between px-1">
        <h3 className="font-extrabold text-[15px] text-slate-900 flex items-center gap-1.5">
          <span>{lang === 'mr' ? 'तुमची शेतं (प्लॉट्स)' : lang === 'hi' ? 'आपके खेत (प्लॉट)' : 'Your Plots'}</span>
          <span className="text-xs font-normal text-slate-500">(Tap to check)</span>
        </h3>

        <button
          onClick={() => onNavigate('scan')}
          className="text-xs font-bold text-[#1B5E20] flex items-center gap-1 cursor-pointer"
        >
          <Camera className="w-3.5 h-3.5" />
          <span>{lang === 'mr' ? 'फोटो काढा' : 'Scan Leaf'}</span>
        </button>
      </div>

      {/* 4. Big Tappable Plot Tiles (Like Mobile App Icons - No Jargon) */}
      <div className="grid grid-cols-2 gap-3">
        {plots.map(plot => {
          const isRed = plot.color === 'red';
          const isAmber = plot.color === 'amber';
          const isGreen = plot.color === 'green';

          const cardBorder = isRed 
            ? 'border-2 border-rose-500 bg-rose-50/50' 
            : isAmber 
            ? 'border-2 border-amber-500 bg-amber-50/50' 
            : 'border-2 border-emerald-500/80 bg-emerald-50/40';

          const statusBadge = isRed 
            ? 'bg-rose-600 text-white' 
            : isAmber 
            ? 'bg-amber-600 text-white' 
            : 'bg-emerald-600 text-white';

          return (
            <div
              key={plot.id}
              onClick={() => setSelectedPlot(plot)}
              className={`p-3.5 rounded-[16px] shadow-xs cursor-pointer transition-all active:scale-96 flex flex-col justify-between min-h-[125px] ${cardBorder}`}
            >
              <div>
                <div className="flex items-start justify-between">
                  <span className="text-2xl">{plot.cropIcon}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wide ${statusBadge}`}>
                    {isRed ? 'Spray Needed' : isAmber ? 'Check Leaf' : 'Healthy'}
                  </span>
                </div>

                <h4 className="font-extrabold text-[14px] text-slate-900 mt-2 leading-tight">
                  {lang === 'mr' ? plot.nameMr : plot.name}
                </h4>
                <p className="text-[11px] text-slate-600 mt-0.5 truncate">
                  {lang === 'mr' ? plot.cropNameMr : plot.cropName}
                </p>
              </div>

              <div className="mt-2 pt-1.5 border-t border-slate-200/60 flex items-center justify-between text-[10px] font-bold text-slate-500">
                <span>{isRed ? '⚠️ Action Required' : isAmber ? '⚠️ Caution' : '✅ Optimal'}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </div>
            </div>
          );
        })}
      </div>

      {/* 5. Focused Bottom Sheet Plot Detail (Opens smoothly on tap) */}
      {selectedPlot && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div 
            onClick={() => setSelectedPlot(null)}
            className="flex-1"
          />

          <div className="bg-white rounded-t-[24px] p-5 space-y-4 max-h-[85vh] overflow-y-auto shadow-2xl animate-slideUp text-slate-900 border-t border-slate-200">
            {/* Header & Close */}
            <div className="flex items-start justify-between border-b pb-3 border-slate-100">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{selectedPlot.cropIcon}</span>
                <div>
                  <h3 className="text-[18px] font-extrabold text-slate-900">
                    {lang === 'mr' ? selectedPlot.nameMr : selectedPlot.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {lang === 'mr' ? selectedPlot.cropNameMr : selectedPlot.cropName}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedPlot(null)}
                className="p-1.5 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Verdict Card with 🔊 Audio Read Aloud */}
            <div className={`p-4 rounded-[14px] border-2 space-y-2 ${
              selectedPlot.color === 'red' 
                ? 'bg-rose-50 border-rose-500 text-rose-950' 
                : selectedPlot.color === 'amber'
                ? 'bg-amber-50 border-amber-500 text-amber-950'
                : 'bg-emerald-50 border-emerald-500 text-emerald-950'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 font-extrabold text-[14px]">
                  {selectedPlot.color === 'red' ? (
                    <AlertOctagon className="w-5 h-5 text-rose-600" />
                  ) : selectedPlot.color === 'amber' ? (
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                  ) : (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  )}
                  <span>
                    {lang === 'mr' ? selectedPlot.statusTextMr : selectedPlot.statusTextEn}
                  </span>
                </div>

                <button
                  onClick={() => speakText(lang === 'mr' ? selectedPlot.adviceMr : selectedPlot.adviceEn, lang)}
                  className="p-1.5 rounded-full bg-white shadow-xs border text-slate-700 active:scale-90"
                  title="Listen to Advice"
                >
                  <Volume2 className="w-4 h-4 text-emerald-700" />
                </button>
              </div>

              <p className="text-[13px] leading-relaxed font-medium">
                {lang === 'mr' ? selectedPlot.adviceMr : selectedPlot.adviceEn}
              </p>

              {selectedPlot.urgentAction && (
                <div className="mt-2 p-2 bg-white/80 rounded-[8px] border border-rose-300 text-xs font-bold text-rose-900">
                  <span>Recommended Medicine: <strong>{selectedPlot.urgentAction}</strong></span>
                </div>
              )}
            </div>

            {/* Quick 1-Tap Irrigation Switch */}
            <div className="p-3.5 bg-slate-50 rounded-[14px] border border-slate-200 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <Droplets className="w-5 h-5 text-blue-600" />
                <div>
                  <h5 className="font-bold text-xs text-slate-800">
                    {lang === 'mr' ? 'ठिबक सिंचन (Drip Water)' : 'Drip Irrigation'}
                  </h5>
                  <span className="text-[10px] text-slate-500">
                    {selectedPlot.dripOn ? 'Water is Flowing' : 'Water is OFF'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleTogglePlotDrip(selectedPlot.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-extrabold shadow-xs transition-colors ${
                  selectedPlot.dripOn 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-slate-300 text-slate-700'
                }`}
              >
                {selectedPlot.dripOn ? 'ON' : 'OFF'}
              </button>
            </div>

            {/* Primary Action Button: Diagnose with Camera */}
            <button
              onClick={() => {
                setSelectedPlot(null);
                onNavigate('scan');
              }}
              className="w-full py-3.5 bg-[#1B5E20] hover:bg-[#154D1A] text-white font-extrabold text-sm rounded-[12px] shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <Camera className="w-5 h-5" />
              <span>{lang === 'mr' ? 'या पिकाच्या पानाचा फोटो काढा' : 'Take Photo of this Leaf with Camera'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
