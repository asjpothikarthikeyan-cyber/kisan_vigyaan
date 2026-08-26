import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { speakText } from '../../utils/speechUtils';
import { 
  Bell, 
  AlertOctagon, 
  AlertTriangle, 
  CloudRain, 
  CheckCircle2, 
  Volume2, 
  ChevronRight, 
  ChevronDown, 
  ShieldCheck 
} from 'lucide-react';

export const FarmerAlertsFeed = ({ onNavigate }) => {
  const { lang, t, theme } = useApp();
  const isDark = theme === 'dark';

  const [expandedId, setExpandedId] = useState('alt-1');

  const alerts = [
    {
      id: 'alt-1',
      type: 'critical',
      time: '2 min ago',
      titleEn: 'Plot 2 (Cotton) Bacterial Blight Active',
      titleMr: 'प्लॉट २ (कापूस) जिवाणू करपा प्रादुर्भाव आढळला',
      oneLinerEn: 'Angular water-soaked spots detected. Immediate Streptocycline spray advised.',
      oneLinerMr: 'पानांवर करप्याचे डाग आढळले. स्ट्रेप्टोमायसीन फवारणी तातडीने करा.',
      fullAdvisoryEn: 'Bacterial inoculum is active in Block B. Prune heavily infected bottom leaves and spray Streptocycline (0.5g/L) + Copper Oxychloride (2.5g/L) before rain.',
      fullAdvisoryMr: 'ब्लॉक बी मध्ये जिवाणूंचा प्रसार वेगाने होत आहे. झाडांची खालची पाने छाटून ताबडतोब स्ट्रेप्टोमायसीन फवारणी करा.'
    },
    {
      id: 'alt-2',
      type: 'disaster',
      time: '2 hours ago',
      titleEn: 'Heavy Rainfall & Humidity Warning (Sangli)',
      titleMr: 'सांगली भागात मुसळधार पाऊस व आर्द्रतेचा इशारा',
      oneLinerEn: '85% humidity expected tomorrow. Spore germination conditions high.',
      oneLinerMr: 'उद्या हवेतील आर्द्रता ८५% राहण्याचा अंदाज. बुरशीचा प्रादुर्भाव वाढू शकतो.',
      fullAdvisoryEn: 'IMD forecasts 45mm rainfall in Miraj & Kupwad. Ensure field drainage channels are clear and pause drip fertigation.',
      fullAdvisoryMr: 'हवामान खात्यानुसार मिरज व कुपवाड भागात ४५ मिमी पावसाची शक्यता. शेतात पाणी साचणार नाही याची काळजी घ्या.'
    },
    {
      id: 'alt-3',
      type: 'warning',
      time: 'Yesterday',
      titleEn: 'Plot 4 (Tomato) Early Blight Advisory',
      titleMr: 'प्लॉट ४ (टोमॅटो) करपा प्रतिबंधक सल्ला',
      oneLinerEn: 'Concentric rings spotted on lower leaves. Mancozeb spray suggested.',
      oneLinerMr: 'खालच्या पानांवर डाग आढळले. मँकोझेब बुरशीनाशक फवारणीचा सल्ला.',
      fullAdvisoryEn: 'Target spot fungus detected on 4% of tomato plants. Spray Mancozeb 75% WP (2.0g/L) in morning hours.',
      fullAdvisoryMr: 'टोमॅटोच्या पानांवर करपा वाढू नये म्हणून सकाळी मँकोझेब ७५% डब्ल्यूपी (२ ग्रॅ/ली) फवारावे.'
    },
    {
      id: 'alt-4',
      type: 'scheme',
      time: '2 days ago',
      titleEn: 'PM-KISAN 17th Installment Credited',
      titleMr: 'पीएम-किसान १७ वा हप्ता खात्यात जमा',
      oneLinerEn: '₹2,000 Direct Benefit Transfer credited to your bank account.',
      oneLinerMr: '₹२,००० थेट बँक खात्यात डीबीटी द्वारे जमा झाले आहेत.',
      fullAdvisoryEn: 'Government of Maharashtra confirmed disbursement under PM-KISAN & Namo Shetkari Mahasanman Yojana.',
      fullAdvisoryMr: 'नमो शेतकरी महासन्मान निधी अंतर्गत अनुदान जमा झाले आहे.'
    }
  ];

  return (
    <div className="space-y-3.5 pb-24 max-w-lg mx-auto select-none px-3 pt-3">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <h2 className="font-extrabold text-[16px] text-slate-900 flex items-center gap-2">
          <Bell className="w-5 h-5 text-[#1B5E20]" />
          <span>{lang === 'mr' ? 'शेती सूचना व इशारे' : 'Farm Alerts & Weather Warnings'}</span>
        </h2>
        <span className="px-2 py-0.5 bg-rose-50 text-rose-700 text-[10px] font-mono font-bold rounded-full border border-rose-200">
          3 Active
        </span>
      </div>

      {/* Chronological Notification Stream (WhatsApp Style) */}
      <div className="space-y-2.5">
        {alerts.map(alert => {
          const isExpanded = expandedId === alert.id;
          const isCrit = alert.type === 'critical';
          const isDisaster = alert.type === 'disaster';
          const isWarn = alert.type === 'warning';

          const title = lang === 'mr' ? alert.titleMr : alert.titleEn;
          const oneLiner = lang === 'mr' ? alert.oneLinerMr : alert.oneLinerEn;
          const fullText = lang === 'mr' ? alert.fullAdvisoryMr : alert.fullAdvisoryEn;

          return (
            <div
              key={alert.id}
              className={`rounded-[16px] border-2 transition-all shadow-xs overflow-hidden ${
                isCrit 
                  ? 'bg-rose-50/80 border-rose-500' 
                  : isDisaster 
                  ? 'bg-amber-50/80 border-amber-500' 
                  : isWarn 
                  ? 'bg-amber-50/40 border-amber-400' 
                  : 'bg-white border-slate-200'
              }`}
            >
              {/* Notification Header */}
              <div 
                onClick={() => setExpandedId(isExpanded ? null : alert.id)}
                className="p-3.5 flex items-start justify-between cursor-pointer"
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    isCrit ? 'bg-rose-600 text-white' : isDisaster ? 'bg-amber-600 text-white' : isWarn ? 'bg-amber-500 text-white' : 'bg-emerald-600 text-white'
                  }`}>
                    {isCrit ? <AlertOctagon className="w-5 h-5" /> : isDisaster ? <CloudRain className="w-5 h-5" /> : isWarn ? <AlertTriangle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-extrabold text-[14px] text-slate-900 leading-tight">
                        {title}
                      </h4>
                    </div>
                    <p className="text-[12px] text-slate-700 font-medium mt-1 leading-snug">
                      {oneLiner}
                    </p>
                    <span className="text-[10px] text-slate-400 font-mono mt-1 block">{alert.time}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-1 shrink-0 ml-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speakText(`${title}. ${fullText}`, lang);
                    }}
                    className="p-1.5 rounded-full bg-white shadow-xs border text-slate-700"
                    title="Read Aloud"
                  >
                    <Volume2 className="w-4 h-4 text-[#1B5E20]" />
                  </button>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
              </div>

              {/* Expandable Technical & Containment Details */}
              {isExpanded && (
                <div className="px-3.5 pb-3.5 pt-1 border-t border-slate-200/60 bg-white/60 space-y-2 text-xs text-slate-800">
                  <p className="font-medium leading-relaxed">{fullText}</p>
                  {isCrit && (
                    <button
                      onClick={() => onNavigate('scan')}
                      className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-[8px] flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>Take Photo of Plot 2 Leaf Now</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
