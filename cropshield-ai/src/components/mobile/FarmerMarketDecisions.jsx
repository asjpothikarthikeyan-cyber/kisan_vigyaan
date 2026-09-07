import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShoppingBag, 
  Droplets, 
  Sprout, 
  DollarSign, 
  ArrowRight, 
  CheckCircle2, 
  Plus, 
  Minus, 
  Printer 
} from 'lucide-react';

export const FarmerMarketDecisions = ({ onNavigate }) => {
  const { lang, t, theme, cart, addToCart, setIsCartModalOpen } = useApp();
  const [selectedDecision, setSelectedDecision] = useState('spray'); // 'spray' | 'seeds' | 'mandi'

  // Plant Protection Kits
  const protectionKits = [
    { id: 'kit-1', nameEn: 'Bactericide Emergency Kit (Streptocycline + Copper)', nameMr: 'जिवाणू करपा नियंत्रण किट', price: 240, crop: 'Cotton & Rice', icon: '🧪' },
    { id: 'kit-2', nameEn: 'Early Blight Fungicide (Mancozeb 75% WP 500g)', nameMr: 'मँकोझेब करपा बुरशीनाशक', price: 320, crop: 'Tomato & Vegetables', icon: '🌿' },
    { id: 'kit-3', nameEn: 'Bio-Neem Oil 10000 PPM (Organic Pest Shield)', nameMr: 'सेंद्रिय निंबोळी अर्क (१०,००० पीपीएम)', price: 450, crop: 'All Crops', icon: '🌱' }
  ];

  // Subsidized Seeds & Fertilizers
  const seedFertilizers = [
    { id: 'fert-1', nameEn: 'Neem Coated Urea (DBT Subsidized 45kg)', nameMr: 'निम कोटेड युरिया (अनुदानित)', price: 266, originalPrice: 2450, icon: '🌾' },
    { id: 'fert-2', nameEn: 'IFFCO DAP 18:46:00 (50kg Bag)', nameMr: 'इफको डीएपी (५० किलो)', price: 1350, originalPrice: 1850, icon: '🌱' },
    { id: 'seed-1', nameEn: 'Mahyco Bt Cotton Hybrid Seed Pack', nameMr: 'माहिको बीटी कापूस बियाणे', price: 864, icon: '🌿' }
  ];

  // Mandi APMC Live Rates
  const mandiRates = [
    { cropEn: 'Cotton (Medium Staple)', cropMr: 'कापूस', mandi: 'Sangli APMC', rate: '₹7,250 / Qtl', trend: '▲ +₹120' },
    { cropEn: 'Tomato (Abhinav Grade A)', cropMr: 'टोमॅटो', mandi: 'Pune Gultekdi', rate: '₹2,100 / Qtl', trend: '▲ +₹50' },
    { cropEn: 'Rice / Paddy (MTU 1010)', cropMr: 'भात / धान', mandi: 'Miraj Mandi', rate: '₹2,850 / Qtl', trend: 'steady' },
    { cropEn: 'Soybean (Yellow)', cropMr: 'सोयाबीन', mandi: 'Latur Mandi', rate: '₹4,600 / Qtl', trend: '▲ +₹80' }
  ];

  return (
    <div className="space-y-4 pb-24 max-w-lg mx-auto px-3 pt-3">
      {/* Top Question Header */}
      <div className="px-1">
        <h2 className="font-extrabold text-[17px] text-slate-900">
          {lang === 'mr' ? 'आज तुम्हाला काय हवे आहे?' : 'What do you need today?'}
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          {lang === 'mr' ? '१-क्लिकमध्ये औषधे, बियाणे किंवा थेट मंडी विक्री' : '1-click crop medicine, subsidized inputs, or sell harvest'}
        </p>
      </div>

      {/* 3 Big Farmer Decision Cards */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => setSelectedDecision('spray')}
          className={`p-3 rounded-[16px] border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-between min-h-[90px] ${
            selectedDecision === 'spray'
              ? 'bg-emerald-50 border-[#1B5E20] text-[#1B5E20] shadow-sm font-extrabold'
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <span className="text-2xl">🧪</span>
          <span className="text-xs font-bold leading-tight mt-1">
            {lang === 'mr' ? 'औषध फवारा' : 'Spray Crop'}
          </span>
        </button>

        <button
          onClick={() => setSelectedDecision('seeds')}
          className={`p-3 rounded-[16px] border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-between min-h-[90px] ${
            selectedDecision === 'seeds'
              ? 'bg-emerald-50 border-[#1B5E20] text-[#1B5E20] shadow-sm font-extrabold'
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <span className="text-2xl">🌱</span>
          <span className="text-xs font-bold leading-tight mt-1">
            {lang === 'mr' ? 'बियाणे / खते' : 'Buy Seeds'}
          </span>
        </button>

        <button
          onClick={() => setSelectedDecision('mandi')}
          className={`p-3 rounded-[16px] border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-between min-h-[90px] ${
            selectedDecision === 'mandi'
              ? 'bg-emerald-50 border-[#1B5E20] text-[#1B5E20] shadow-sm font-extrabold'
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <span className="text-2xl">💰</span>
          <span className="text-xs font-bold leading-tight mt-1">
            {lang === 'mr' ? 'माल विका' : 'Sell Harvest'}
          </span>
        </button>
      </div>

      {/* Tab 1: Spray My Crop Decision */}
      {selectedDecision === 'spray' && (
        <div className="space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-extrabold text-sm text-slate-900">
              {lang === 'mr' ? 'तातडीची रोग प्रतिबंधक औषधे (Door Delivery)' : 'Emergency Crop Protection Medicines'}
            </h3>
          </div>

          <div className="space-y-2">
            {protectionKits.map(kit => (
              <div key={kit.id} className="p-3.5 bg-white border border-slate-200 rounded-[14px] shadow-xs flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{kit.icon}</span>
                  <div>
                    <h4 className="font-extrabold text-xs text-slate-900 leading-snug">
                      {lang === 'mr' ? kit.nameMr : kit.nameEn}
                    </h4>
                    <span className="text-[11px] text-emerald-700 font-bold font-mono">₹{kit.price}</span>
                    <span className="text-[10px] text-slate-500 ml-2">For: {kit.crop}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    addToCart({ ...kit, quantity: 1, category: 'Protection' });
                    setIsCartModalOpen(true);
                  }}
                  className="px-3 py-1.5 bg-[#1B5E20] hover:bg-[#154D1A] text-white rounded-[8px] font-bold text-xs shadow-xs cursor-pointer active:scale-95"
                >
                  {lang === 'mr' ? 'मागवा' : 'Add +'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Subsidized Seeds & Fertilizers */}
      {selectedDecision === 'seeds' && (
        <div className="space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-extrabold text-sm text-slate-900">
              {lang === 'mr' ? 'शासकीय अनुदानित खते व प्रमाणित बियाणे' : 'DBT Subsidized Fertilizers & Certified Seeds'}
            </h3>
          </div>

          <div className="space-y-2">
            {seedFertilizers.map(item => (
              <div key={item.id} className="p-3.5 bg-white border border-slate-200 rounded-[14px] shadow-xs flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h4 className="font-extrabold text-xs text-slate-900 leading-snug">
                      {lang === 'mr' ? item.nameMr : item.nameEn}
                    </h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[12px] text-emerald-700 font-bold font-mono">₹{item.price}</span>
                      {item.originalPrice && (
                        <span className="text-[10px] text-slate-400 line-through">₹{item.originalPrice}</span>
                      )}
                      <span className="text-[9px] bg-emerald-50 text-[#1B5E20] px-1 py-0.2 rounded font-bold">DBT Auto-Applied</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    addToCart({ ...item, quantity: 1, category: 'Seeds' });
                    setIsCartModalOpen(true);
                  }}
                  className="px-3 py-1.5 bg-[#1B5E20] hover:bg-[#154D1A] text-white rounded-[8px] font-bold text-xs shadow-xs cursor-pointer active:scale-95"
                >
                  {lang === 'mr' ? 'मागवा' : 'Book'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Sell My Harvest Mandi Rates */}
      {selectedDecision === 'mandi' && (
        <div className="space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-extrabold text-sm text-slate-900">
              {lang === 'mr' ? 'थेट मंडी बाजार भाव (Live APMC Rates)' : 'Live APMC Mandi Rates & Direct Sell'}
            </h3>
          </div>

          <div className="space-y-2">
            {mandiRates.map((m, idx) => (
              <div key={idx} className="p-3.5 bg-white border border-slate-200 rounded-[14px] shadow-xs flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-xs text-slate-900">
                    {lang === 'mr' ? m.cropMr : m.cropEn}
                  </h4>
                  <span className="text-[10px] text-slate-500">{m.mandi}</span>
                </div>

                <div className="text-right">
                  <strong className="text-sm font-extrabold text-[#1B5E20] font-mono block">{m.rate}</strong>
                  <span className="text-[10px] font-bold text-emerald-600">{m.trend}</span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => alert(lang === 'mr' ? 'तुमचा शेतमाल यशस्वीरित्या मंडी पोर्टलवर नोंदवला गेला आहे!' : 'Your harvest batch has been posted to Sangli APMC Mandi!')}
            className="w-full py-3.5 bg-[#1B5E20] hover:bg-[#154D1A] text-white font-extrabold text-xs rounded-[12px] shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <span>{lang === 'mr' ? 'माझा शेतमाल विक्रीसाठी नोंदवा' : 'Post My Harvest Batch for Sale'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
