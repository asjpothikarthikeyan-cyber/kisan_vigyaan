import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Lightbulb, 
  Landmark, 
  BarChart3, 
  Satellite, 
  Users, 
  FileText, 
  Radio, 
  ChevronRight, 
  PhoneCall, 
  ShieldCheck 
} from 'lucide-react';

export const FarmerMoreMenu = ({ onNavigate }) => {
  const { lang, t, theme } = useApp();
  const isDark = theme === 'dark';

  const menuItems = [
    { id: 'proTips', labelEn: 'Pro Agronomy Tips & Chemical Matrix', labelMr: 'तज्ज्ञ कृषी सल्ला व खत वेळापत्रक', icon: Lightbulb, color: 'text-amber-600 bg-amber-50' },
    { id: 'govtSchemes', labelEn: 'Govt. Schemes & DBT Benefits (PM-KISAN)', labelMr: 'शासकीय योजना व थेट बँक खात्यात लाभ', icon: Landmark, color: 'text-blue-600 bg-blue-50' },
    { id: 'statistics', labelEn: 'Regional Pest & Disease Statistics', labelMr: 'विभागीय रोग आकडेवारी व कल', icon: BarChart3, color: 'text-purple-600 bg-purple-50' },
    { id: 'satelliteMapping', labelEn: 'ISRO Bhuvan / Sentinel-2 Satellite Map', labelMr: 'इस्रो भुवन / उपग्रह पीक नकाशा', icon: Satellite, color: 'text-cyan-600 bg-cyan-50' },
    { id: 'farmerCommunity', labelEn: 'Farmer Community & Question Forum', labelMr: 'शेतकरी मंच व तज्ज्ञ प्रश्नोत्तरे', icon: Users, color: 'text-emerald-600 bg-emerald-50' },
    { id: 'reports', labelEn: 'My Field Reports & Soil Health Cards', labelMr: 'माझे शेत अहवाल व मृदा आरोग्य पत्रिका', icon: FileText, color: 'text-slate-700 bg-slate-100' }
  ];

  return (
    <div className="space-y-4 pb-24 max-w-lg mx-auto px-3 pt-3">
      <div className="px-1">
        <h2 className="font-extrabold text-[17px] text-slate-900">
          {lang === 'mr' ? 'अधिक संदर्भ व सुविधा' : 'More Tools & Reference'}
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          {lang === 'mr' ? 'शासकीय योजना, तज्ज्ञ सल्ला, उपग्रह नकाशा व अहवाल' : 'Government welfare, agro-advisories, satellite mapping & reports'}
        </p>
      </div>

      {/* Clean Menu List */}
      <div className="bg-white border border-slate-200 rounded-[18px] overflow-hidden divide-y divide-slate-100 shadow-xs">
        {menuItems.map(item => {
          const Icon = item.icon;
          const label = lang === 'mr' ? item.labelMr : item.labelEn;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer group"
            >
              <div className="flex items-center space-x-3.5">
                <div className={`w-9 h-9 rounded-[10px] flex items-center justify-center ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-bold text-xs text-slate-800 group-hover:text-[#1B5E20] transition-colors">
                  {label}
                </span>
              </div>

              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </button>
          );
        })}
      </div>

      {/* Kisan Call Center Helpline Banner */}
      <div className="p-4 bg-emerald-50 border-2 border-emerald-500 rounded-[16px] flex items-center justify-between shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-[#1B5E20] text-white flex items-center justify-center shrink-0">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-xs text-slate-900">
              {lang === 'mr' ? 'किसान कॉल सेंटर टोल फ्री' : 'Kisan Call Center Helpline'}
            </h4>
            <span className="font-mono font-bold text-sm text-[#1B5E20] block">1800-180-1551</span>
          </div>
        </div>

        <a
          href="tel:18001801551"
          className="px-3 py-1.5 bg-[#1B5E20] hover:bg-[#154D1A] text-white font-bold text-xs rounded-[8px] shadow-xs"
        >
          {lang === 'mr' ? 'कॉल करा' : 'Call'}
        </a>
      </div>
    </div>
  );
};
