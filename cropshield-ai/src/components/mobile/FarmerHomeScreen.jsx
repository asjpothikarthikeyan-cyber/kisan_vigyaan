import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { speakText } from '../../utils/speechUtils';
import { 
  AlertOctagon, 
  AlertTriangle, 
  CheckCircle2, 
  Volume2, 
  Droplets, 
  Camera, 
  X, 
  ChevronRight, 
  Sun
} from 'lucide-react';

export const FarmerHomeScreen = ({ onNavigate }) => {
  const { lang } = useApp();

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

  const [selectedPlot, setSelectedPlot] = useState(null);

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
    <div className="space-y-6 pb-24 max-w-lg mx-auto px-4 pt-4 font-sans bg-gray-50 min-h-screen">
      
      {/* 1. Minimalist Top Bar / Hero */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight leading-tight">
            {lang === 'mr' ? 'शुभ प्रभात, शेतकरी' : 'Good Morning,'}<br/>
            <span className="text-gray-500 font-medium text-lg">Kisan One</span>
          </h2>
        </div>
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100 text-sm font-medium text-gray-700">
          <Sun className="w-4 h-4 text-orange-400" />
          <span>29°C</span>
        </div>
      </div>

      {/* 2. Clean Daily Status Card (Stitch Style) */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              {lang === 'mr' ? 'आजचा आढावा' : "Today's Overview"}
            </span>
            <p className="text-base font-semibold text-gray-900 mt-1 leading-snug">
              {currentHeroText}
            </p>
          </div>
          <button
            onClick={handleReadStatusAloud}
            className="p-2.5 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors shrink-0"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>
        
        {/* Urgent Action Snippet inside the same card */}
        <div className="bg-red-50 border border-red-100 rounded-xl p-3 flex items-center justify-between">
           <div className="flex items-center gap-2">
             <AlertOctagon className="w-4 h-4 text-red-500" />
             <span className="text-sm font-medium text-red-800">
               {lang === 'mr' ? 'प्लॉट २ - फवारणी आवश्यक' : 'Plot 2 - Spray Needed'}
             </span>
           </div>
           <button
             onClick={() => setSelectedPlot(plots.find(p => p.id === 'plot-2'))}
             className="text-xs font-semibold text-red-700 px-3 py-1 bg-white rounded-full shadow-sm border border-red-100"
           >
             {lang === 'mr' ? 'पहा' : 'View'}
           </button>
        </div>
      </div>

      {/* 3. Section Title & Scanner Quick Action */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg text-gray-900">
          {lang === 'mr' ? 'तुमची शेतं' : 'Your Fields'}
        </h3>
        <button
          onClick={() => onNavigate('scan')}
          className="text-sm font-medium text-blue-600 flex items-center gap-1.5 bg-blue-50 px-3 py-1.5 rounded-full transition-colors active:bg-blue-100"
        >
          <Camera className="w-4 h-4" />
          <span>{lang === 'mr' ? 'स्कॅन करा' : 'Scan Leaf'}</span>
        </button>
      </div>

      {/* 4. Minimalist Plot Grid */}
      <div className="grid grid-cols-2 gap-3">
        {plots.map(plot => {
          const isRed = plot.color === 'red';
          const isAmber = plot.color === 'amber';
          
          return (
            <div
              key={plot.id}
              onClick={() => setSelectedPlot(plot)}
              className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 cursor-pointer transition-all active:scale-95 flex flex-col justify-between min-h-[130px] hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <span className="text-3xl filter drop-shadow-sm">{plot.cropIcon}</span>
                {isRed ? (
                  <span className="w-2.5 h-2.5 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.6)]"></span>
                ) : isAmber ? (
                  <span className="w-2.5 h-2.5 bg-orange-400 rounded-full"></span>
                ) : (
                  <span className="w-2.5 h-2.5 bg-green-400 rounded-full"></span>
                )}
              </div>

              <div className="mt-4">
                <h4 className="font-semibold text-sm text-gray-900 leading-tight">
                  {lang === 'mr' ? plot.nameMr : plot.name}
                </h4>
                <p className="text-[11px] text-gray-500 mt-1 truncate">
                  {lang === 'mr' ? plot.cropNameMr : plot.cropName}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 5. Clean Google Stitch Bottom Sheet */}
      {selectedPlot && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-gray-900/40 backdrop-blur-sm animate-fadeIn">
          <div 
            onClick={() => setSelectedPlot(null)}
            className="flex-1"
          />

          <div className="bg-white rounded-t-3xl p-6 space-y-5 max-h-[85vh] overflow-y-auto shadow-2xl animate-slideUp">
            
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <span className="text-4xl">{selectedPlot.cropIcon}</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {lang === 'mr' ? selectedPlot.nameMr : selectedPlot.name}
                  </h3>
                  <p className="text-sm text-gray-500 font-medium">
                    {lang === 'mr' ? selectedPlot.cropNameMr : selectedPlot.cropName}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedPlot(null)}
                className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Verdict Card */}
            <div className={`p-5 rounded-2xl border ${
              selectedPlot.color === 'red' 
                ? 'bg-red-50 border-red-100' 
                : selectedPlot.color === 'amber'
                ? 'bg-orange-50 border-orange-100'
                : 'bg-green-50 border-green-100'
            }`}>
              <div className="flex items-center justify-between">
                <div className={`flex items-center gap-2 font-semibold text-sm ${
                  selectedPlot.color === 'red' ? 'text-red-700' : 
                  selectedPlot.color === 'amber' ? 'text-orange-700' : 'text-green-700'
                }`}>
                  {selectedPlot.color === 'red' ? <AlertOctagon className="w-5 h-5" /> : 
                   selectedPlot.color === 'amber' ? <AlertTriangle className="w-5 h-5" /> : 
                   <CheckCircle2 className="w-5 h-5" />}
                  <span>
                    {lang === 'mr' ? selectedPlot.statusTextMr : selectedPlot.statusTextEn}
                  </span>
                </div>

                <button
                  onClick={() => speakText(lang === 'mr' ? selectedPlot.adviceMr : selectedPlot.adviceEn, lang)}
                  className="p-2 rounded-full bg-white shadow-sm border border-gray-100 text-gray-600"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <p className="text-sm text-gray-700 mt-3 font-medium leading-relaxed">
                {lang === 'mr' ? selectedPlot.adviceMr : selectedPlot.adviceEn}
              </p>

              {selectedPlot.urgentAction && (
                <div className="mt-4 p-3 bg-white rounded-xl border border-red-200 text-sm font-semibold text-red-800 shadow-sm">
                   Treatment: {selectedPlot.urgentAction}
                </div>
              )}
            </div>

            {/* Drip Irrigation Card */}
            <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-full ${selectedPlot.dripOn ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                  <Droplets className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-semibold text-sm text-gray-900">
                    {lang === 'mr' ? 'ठिबक सिंचन' : 'Drip Irrigation'}
                  </h5>
                  <span className="text-xs text-gray-500 font-medium">
                    {selectedPlot.dripOn ? 'Flowing naturally' : 'System is Off'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleTogglePlotDrip(selectedPlot.id)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-colors ${
                  selectedPlot.dripOn 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {selectedPlot.dripOn ? 'ON' : 'OFF'}
              </button>
            </div>

            {/* Scan Action */}
            <button
              onClick={() => {
                setSelectedPlot(null);
                onNavigate('scan');
              }}
              className="w-full py-4 bg-gray-900 hover:bg-black text-white font-semibold text-base rounded-2xl shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95"
            >
              <Camera className="w-5 h-5" />
              <span>{lang === 'mr' ? 'या पिकाचा फोटो काढा' : 'Diagnose Leaf with Camera'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
