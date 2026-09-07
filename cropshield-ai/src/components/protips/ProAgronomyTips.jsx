import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  seasonalCropsData, 
  fertilizerProtocols, 
  pesticideSafetyProtocols, 
  irrigationMaintenanceProtocols, 
  preventativeDiseaseForecast,
  cropProtectionChemicalMatrix,
  nearbyAgroVendorsWithDistance,
  detailedFertilizersData
} from '../../data/agronomyTipsData';
import { 
  Lightbulb, 
  Calendar, 
  FlaskConical, 
  ShieldAlert, 
  Droplets, 
  Bug, 
  Calculator, 
  Download, 
  Printer, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Clock, 
  Layers, 
  Wrench, 
  Gauge, 
  Sun, 
  CloudRain, 
  Snowflake, 
  Sprout, 
  Wheat, 
  FileText,
  Search,
  MapPin,
  Phone,
  Navigation,
  Building2,
  Store,
  Tag,
  ShieldCheck,
  Check,
  ArrowRight,
  Eye,
  Heart,
  Zap,
  Info,
  XCircle,
  HelpCircle,
  Waves,
  Beaker,
  Compass,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export const ProAgronomyTips = () => {
  const { lang, t, farmerProfile, onNavigate, theme } = useApp();
  const isDark = theme === 'dark';

  const tabsContainerRef = useRef(null);

  const scrollTabs = (direction) => {
    if (tabsContainerRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      tabsContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Active Tab: 'fertilizers' | 'sprayProtocol' | 'chemicals' | 'crops' | 'irrigation' | 'vendors' | 'calculator'
  const [activeTab, setActiveTab] = useState('sprayProtocol');

  // Season filter: 'kharif' | 'rabi' | 'zaid'
  const [selectedSeason, setSelectedSeason] = useState('kharif');

  // Chemical Matrix Filters
  const [chemCategoryFilter, setChemCategoryFilter] = useState('all');
  const [chemCropFilter, setChemCropFilter] = useState('all');
  const [chemSearch, setChemSearch] = useState('');

  // Fertilizer Matrix Filters
  const [fertCategoryFilter, setFertCategoryFilter] = useState('all');
  const [fertSearch, setFertSearch] = useState('');

  // Vendor Matrix Filters
  const [vendorCategoryFilter, setVendorCategoryFilter] = useState('all');
  const [vendorSearch, setVendorSearch] = useState('');

  // Interactive Calculator State
  const [tankCapacityLiters, setTankCapacityLiters] = useState(16);
  const [recommendedDosagePerLiter, setRecommendedDosagePerLiter] = useState(2.0);

  // Calculate Tank Dosage
  const totalChemicalRequired = (tankCapacityLiters * recommendedDosagePerLiter).toFixed(1);

  // Filtered Chemical Formulations
  const filteredChemicals = cropProtectionChemicalMatrix.filter(item => {
    const matchesCategory = chemCategoryFilter === 'all' || item.category === chemCategoryFilter;
    const matchesCrop = chemCropFilter === 'all' || item.suitableCrops.some(c => c.toLowerCase().includes(chemCropFilter.toLowerCase()));
    const matchesSearch = 
      item.tradeName.toLowerCase().includes(chemSearch.toLowerCase()) ||
      item.activeComposition.toLowerCase().includes(chemSearch.toLowerCase()) ||
      item.targetPests.some(p => p.toLowerCase().includes(chemSearch.toLowerCase()));
    return matchesCategory && matchesCrop && matchesSearch;
  });

  // Filtered Fertilizers
  const filteredFertilizers = (detailedFertilizersData || []).filter(item => {
    const matchesCategory = fertCategoryFilter === 'all' || item.category === fertCategoryFilter;
    const matchesSearch = 
      item.name.toLowerCase().includes(fertSearch.toLowerCase()) ||
      (item.nameMr && item.nameMr.toLowerCase().includes(fertSearch.toLowerCase())) ||
      (item.nameTa && item.nameTa.toLowerCase().includes(fertSearch.toLowerCase())) ||
      item.grade.toLowerCase().includes(fertSearch.toLowerCase()) ||
      item.targetCrops.toLowerCase().includes(fertSearch.toLowerCase()) ||
      item.plantBenefits.toLowerCase().includes(fertSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Filtered Nearby Vendors
  const filteredVendors = nearbyAgroVendorsWithDistance.filter(vendor => {
    const matchesCategory = 
      vendorCategoryFilter === 'all' || 
      vendor.category.includes(vendorCategoryFilter) ||
      (vendorCategoryFilter === 'mandi-sell' && vendor.category === 'mandi-sell') ||
      (vendorCategoryFilter === 'fertilizers-govt' && vendor.dbtPoint);
    const matchesSearch = 
      vendor.name.toLowerCase().includes(vendorSearch.toLowerCase()) ||
      vendor.location.toLowerCase().includes(vendorSearch.toLowerCase()) ||
      vendor.availableStocks.some(s => s.toLowerCase().includes(vendorSearch.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getLocalizedField = (item, field) => {
    if (!item) return '';
    if (lang === 'ta' && item[`${field}Ta`]) return item[`${field}Ta`];
    if (lang === 'mr' && item[`${field}Mr`]) return item[`${field}Mr`];
    if (lang === 'hi' && item[`${field}Hi`]) return item[`${field}Hi`];
    return item[field] || '';
  };

  return (
    <div className="space-y-6 pb-16 animate-fadeIn font-sans">
      
      {/* 1. TOP HEADER BANNER */}
      <div className={`p-6 rounded-3xl border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 ${
        isDark ? 'bg-[#091222] border-[#182a4a] text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1B5E20] to-[#15803d] text-white flex items-center justify-center shadow-md shrink-0">
            <Lightbulb className="w-6 h-6 text-emerald-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-xl font-black tracking-tight text-slate-900 dark:text-white">
                {lang === 'ta' ? 'விவசாய வல்லுநர் குறிப்புகள், உரங்கள் & மருந்து அட்டவணை' : lang === 'mr' ? 'तज्ज्ञ कृषी सल्ला, खत नियोजन व रासायनिक फॉर्म्युलेशन्स' : 'Pro Agronomy Tips, Fertilizers & Chemical Matrix'}
              </h1>
              <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                {lang === 'ta' ? 'அறிவியல் வழிகாட்டல்' : lang === 'mr' ? 'शासकीय शिफारस' : 'ICAR & KVK Validated'}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-medium">
              {lang === 'ta' ? '22+ உரங்களின் நன்மைகள், எளிய தெளிப்பு நெறிமுறை, பூச்சிக்கொல்லி மருந்தளவு & உரக்கடைகள்' : lang === 'mr' ? '२२+ खतांचे पिकांसाठी उपयोग, सुलभ फवारणी पद्धत, अचूक औषध मात्रा व अधिकृत विक्रेते' : 'Comprehensive guide to 22+ fertilizers, simplified spray protocols, dosage matrix & authorized input dealers'}
            </p>
          </div>
        </div>

        <button
          onClick={() => window.print()}
          className={`px-4 py-2.5 rounded-2xl text-xs font-black flex items-center justify-center gap-2 border transition-all cursor-pointer shadow-xs self-start md:self-auto ${
            isDark ? 'bg-[#0f1d38] border-[#22365e] text-slate-200 hover:bg-[#162a52]' : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200'
          }`}
        >
          <Printer className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>{lang === 'ta' ? 'கையேட்டை அச்சிடுக' : lang === 'mr' ? 'मार्गदर्शिका प्रिंट करा' : 'Print Handbook'}</span>
        </button>
      </div>

      {/* 2. PRIMARY NAVIGATION TABS WITH INTERACTIVE SCROLL & ARROWS */}
      <div className="relative flex items-center group">
        {/* Left Scroll Button */}
        <button
          onClick={() => scrollTabs('left')}
          title="Scroll Left"
          className={`absolute left-0 z-10 p-2.5 rounded-2xl shadow-xl border transition-all cursor-pointer -translate-x-2 sm:-translate-x-3 active:scale-90 ${
            isDark 
              ? 'bg-[#0f1d38] border-[#22365e] text-white hover:bg-emerald-600 shadow-black/40' 
              : 'bg-white border-slate-200 text-slate-800 hover:bg-emerald-600 hover:text-white shadow-slate-300/60'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Tab Items Container */}
        <div 
          ref={tabsContainerRef}
          className="flex items-center gap-2.5 overflow-x-auto py-2 px-7 scroll-smooth scrollbar-thin scrollbar-thumb-emerald-600/40 w-full touch-pan-x"
          style={{ scrollbarWidth: 'thin' }}
        >
          {[
            { id: 'sprayProtocol', label: lang === 'ta' ? '🚀 எளிய தெளிப்பு முறை (4 படிகள்)' : lang === 'mr' ? '🚀 सुलभ फवारणी पद्धत (४ पायऱ्या)' : '🚀 Easy Spray Protocol (4 Steps)', icon: Sparkles },
            { id: 'fertilizers', label: lang === 'ta' ? '🌱 உரங்கள் & பயிர் ஊட்டச்சத்து (22+)' : lang === 'mr' ? '🌱 खत व्यवस्थापन (२२+ खते)' : '🌱 Fertilizers & Crop Nutrition (22+)', icon: Sprout },
            { id: 'chemicals', label: lang === 'ta' ? '🧪 பூச்சிக்கொல்லி மருந்தளவு அட்டவணை' : lang === 'mr' ? '🧪 रासायनिक कीटकनाशके व बुरशीनाशके' : '🧪 Chemical Dosage Matrix', icon: FlaskConical },
            { id: 'crops', label: lang === 'ta' ? '📅 பருவ பயிர்கள் நாட்காட்டி' : lang === 'mr' ? '📅 हंगामी पीक दिनदर्शिका' : '📅 Seasonal Crop Calendar', icon: Calendar },
            { id: 'irrigation', label: lang === 'ta' ? '💧 சொட்டு நீர் & மண் ஈரப்பதம்' : lang === 'mr' ? '💧 ठिबक सिंचन व ओलावा' : '💧 Drip Irrigation & Moisture', icon: Droplets },
            { id: 'vendors', label: lang === 'ta' ? '📍 அருகிலுள்ள உரக்கடைகள் & மண்டிகள்' : lang === 'mr' ? '📍 जवळची कृषी सेवा केंद्रे' : '📍 Agro Dealers & Mandis', icon: Store },
            { id: 'calculator', label: lang === 'ta' ? '🧮 பம்ப் மருந்தளவு கால்குலேட்டர்' : lang === 'mr' ? '🧮 फवारणी मात्रा गणकयंत्र' : '🧮 Pump Dosage Calculator', icon: Calculator }
          ].map(tab => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-black whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 active:scale-95 shrink-0 ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#1B5E20] to-[#15803d] text-white shadow-md shadow-emerald-950/20'
                    : isDark
                    ? 'bg-[#0a1324] border border-[#182a4a] text-slate-300 hover:text-white hover:border-emerald-500/50'
                    : 'bg-white border border-slate-200 text-slate-700 hover:text-[#1B5E20] hover:border-emerald-300 shadow-2xs'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Scroll Button */}
        <button
          onClick={() => scrollTabs('right')}
          title="Scroll Right"
          className={`absolute right-0 z-10 p-2.5 rounded-2xl shadow-xl border transition-all cursor-pointer translate-x-2 sm:translate-x-3 active:scale-90 ${
            isDark 
              ? 'bg-[#0f1d38] border-[#22365e] text-white hover:bg-emerald-600 shadow-black/40' 
              : 'bg-white border-slate-200 text-slate-800 hover:bg-emerald-600 hover:text-white shadow-slate-300/60'
          }`}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* TAB 1: SIMPLIFIED 4-STEP SPRAY PROTOCOL                       */}
      {/* ───────────────────────────────────────────────────────────── */}
      {activeTab === 'sprayProtocol' && (
        <div className="space-y-6">
          
          {/* Header Banner */}
          <div className={`p-6 rounded-3xl border shadow-xs ${
            isDark 
              ? 'bg-gradient-to-r from-[#09192b] via-[#09221d] to-[#0c1f19] border-emerald-500/40 text-white' 
              : 'bg-gradient-to-r from-emerald-50 via-teal-50/70 to-emerald-100/60 border-emerald-300 text-slate-900'
          }`}>
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1B5E20] to-[#15803d] text-white flex items-center justify-center shadow-md shrink-0">
                <Sparkles className="w-6 h-6 text-emerald-200" />
              </div>
              <div>
                <h2 className="text-base sm:text-xl font-black">
                  {lang === 'ta' ? 'விவசாயிகளுக்கான எளிய 4-படி தெளிப்பு நெறிமுறை' : lang === 'mr' ? 'शेतकऱ्यांसाठी सुलभ ४-पायऱ्यांचे फवारणी शास्त्र' : 'Farmer-Friendly 4-Step Scientific Spray Protocol'}
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mt-0.5">
                  {lang === 'ta' ? 'மருந்துகள் வீணாவதை தடுத்து, 100% பூச்சி-நோய் கட்டுப்பாடு பெற எளிய 4 விதிகள்' : lang === 'mr' ? 'औषधांची नासाडी थांबवून १००% परिणामकारकतेसाठी ४ सोपे नियम' : 'Follow these 4 golden rules to guarantee 100% pest knockdown and eliminate crop damage:'}
                </p>
              </div>
            </div>
          </div>

          {/* 4 POLISHED SECTION CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* STEP 1: TIMING & WEATHER */}
            <div className={`p-6 rounded-3xl border space-y-4 shadow-sm flex flex-col justify-between ${
              isDark ? 'bg-[#0a1324] border-[#182a4a] text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}>
              <div>
                <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-black text-xs flex items-center justify-center border border-emerald-300 dark:border-emerald-800">
                      01
                    </div>
                    <div>
                      <h3 className="font-black text-base text-slate-900 dark:text-white">
                        {lang === 'ta' ? 'படி 1: சரியான தெளிப்பு நேரம்' : lang === 'mr' ? 'पायरी १: फवारणीची योग्य वेळ व हवामान' : 'Step 1: Golden Timing & Weather'}
                      </h3>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                        {lang === 'ta' ? 'வெப்பநிலை & காற்று வேகம்' : 'Temperature & Wind Speed'}
                      </span>
                    </div>
                  </div>
                  <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>

                <div className="space-y-3 pt-3">
                  <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="text-emerald-900 dark:text-emerald-300 block text-xs font-bold">
                        {lang === 'ta' ? 'சிறந்த நேரம் (காலை 6:00 - 9:30 & மாலை 4:30 - 6:30)' : lang === 'mr' ? 'उत्तम वेळ: सकाळी ६ ते ९:३० किंवा दुपारी ४:३० ते ६:३०' : 'Best Hours: Early Morning (6-9:30 AM) or Late Afternoon (4:30-6:30 PM)'}
                      </strong>
                      <p className="text-slate-600 dark:text-slate-300 text-xs mt-1 leading-relaxed">
                        {lang === 'ta' ? 'இலைத் துளைகள் திறந்து இருக்கும், ஆவியாதல் குறைவாக இருக்கும். மருந்து 100% பயிரில் சேரும்.' : lang === 'mr' ? 'पानांची पर्णरंध्रे उघडी असतात व औषध हवेत उडून न जाता पानांमध्ये पूर्णपणे शोषले जाते.' : 'Leaf stomata are wide open, humidity is optimal, and evaporation is low for maximum chemical absorption.'}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <XCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="text-rose-900 dark:text-rose-300 block text-xs font-bold">
                        {lang === 'ta' ? 'நண்பகல் வெயிலில் தெளிக்காதீர்கள் (11:30 - 3:30)' : lang === 'mr' ? 'भर उन्हात (११:३० ते ३:३०) फवारणी टाळा' : 'Strictly Avoid Mid-day Heat (11:30 AM - 3:30 PM)'}
                      </strong>
                      <p className="text-slate-600 dark:text-slate-300 text-xs mt-1 leading-relaxed">
                        {lang === 'ta' ? 'கடும் வெயிலில் இலைகள் கருகும், தேனீக்கள் இறக்கும், மருந்து வீணாகும்.' : lang === 'mr' ? 'पाने करपतात, मधमाश्या मरतात आणि औषध हवेत उडून जाते.' : 'Causes severe leaf scorch (phytotoxicity), rapid degradation, and kills helpful pollinating honeybees.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                <span>Wind Speed: &lt; 10 km/h (Calm)</span>
                <span>Rain Forecast: Safe (Next 4h dry)</span>
              </div>
            </div>

            {/* STEP 2: TANK MIXING ORDER (BEAUTIFUL VISUAL PIPELINE) */}
            <div className={`p-6 rounded-3xl border space-y-4 shadow-sm flex flex-col justify-between ${
              isDark ? 'bg-[#0a1324] border-[#182a4a] text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}>
              <div>
                <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-2xl bg-cyan-100 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 font-black text-xs flex items-center justify-center border border-cyan-300 dark:border-cyan-800">
                      02
                    </div>
                    <div>
                      <h3 className="font-black text-base text-slate-900 dark:text-white">
                        {lang === 'ta' ? 'படி 2: தொட்டியில் மருந்து கலக்கும் வரிசை' : lang === 'mr' ? 'पायरी २: औषधे टाकीत टाकण्याचा योग्य क्रम' : 'Step 2: Tank Mixing Order (WALES Rule)'}
                      </h3>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                        {lang === 'ta' ? 'மருந்துகள் திரிந்து போகாமல் இருக்க' : 'Prevents Curdling & Nozzle Clogging'}
                      </span>
                    </div>
                  </div>
                  <FlaskConical className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium pt-2 pb-1">
                  {lang === 'ta' ? 'மருந்துகள் தயிர் போல் திரியாமல் இருக்க எப்போதும் இந்த வரிசையைப் பின்பற்றி கலக்கவும்:' : lang === 'mr' ? 'द्रावण फुटू नये व औषध एकजीव व्हावे म्हणून या पायऱ्या पाळा:' : 'Always add chemicals into a 70% water-filled tank in this precise sequence:'}
                </p>

                {/* VISUAL STEP PIPELINE */}
                <div className="space-y-2.5">
                  {[
                    {
                      num: '1',
                      title: lang === 'ta' ? '1. சுத்தமான தண்ணீர் (70% அளவு)' : lang === 'mr' ? '१. स्वच्छ पाणी (७०% भरा)' : '1. Clean Water First (70% Full)',
                      desc: lang === 'ta' ? 'முதலில் தொட்டியில் 70% சுத்தமான நல்ல தண்ணீரை நிரப்பவும்.' : lang === 'mr' ? 'टाकीत आधी ७०% स्वच्छ पाणी भरा (सामू ६.० ते ६.५).' : 'Fill the sprayer tank 70% with clean, clear water (pH 6.0 - 6.5).',
                      bg: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900/60 text-blue-900 dark:text-blue-300',
                      badgeBg: 'bg-blue-600 text-white'
                    },
                    {
                      num: '2',
                      title: lang === 'ta' ? '2. பவுடர் / குருணை மருந்துகள் (WP / WDG)' : lang === 'mr' ? '२. पावडर / ग्रॅन्युल्स खते (WP/WDG)' : '2. Wettable Powders & Granules (WP / WDG)',
                      desc: lang === 'ta' ? 'பவுடரை ஒரு குவளை தண்ணீரில் தனியாக கரைத்து பின் தொட்டியில் ஊற்றவும்.' : lang === 'mr' ? 'पावडर आधी छोट्या मगात पाण्यात विरघळवून मगच टाकीत टाका.' : 'Pre-dissolve powders (e.g. Mancozeb) in a small mug of water first, then pour in.',
                      bg: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/60 text-emerald-900 dark:text-emerald-300',
                      badgeBg: 'bg-emerald-600 text-white'
                    },
                    {
                      num: '3',
                      title: lang === 'ta' ? '3. திரவ மருந்துகள் (SC / SL / Flowables)' : lang === 'mr' ? '३. लिक्विड औषधे (SC / SL)' : '3. Liquid Suspensions (SC / SL / Solutions)',
                      desc: lang === 'ta' ? 'நன்றாக கலக்கிய பின் திரவ மருந்துகளை ஊற்றவும்.' : lang === 'mr' ? 'चांगले ढवळून मग कोराजन, कॉन्फिडॉर सारखी औषधे टाका.' : 'Stir well, then add liquid formulations (e.g. Coragen, Confidor).',
                      bg: 'bg-cyan-50 dark:bg-cyan-950/30 border-cyan-200 dark:border-cyan-900/60 text-cyan-900 dark:text-cyan-300',
                      badgeBg: 'bg-cyan-600 text-white'
                    },
                    {
                      num: '4',
                      title: lang === 'ta' ? '4. எண்ணெய் கலந்த மருந்துகள் (EC)' : lang === 'mr' ? '४. ईसी औषधे (EC Formulations)' : '4. Emulsifiable Concentrates (EC)',
                      desc: lang === 'ta' ? 'எண்ணெய் பசை கொண்ட மருந்துகளை தொடர்ந்து கலக்கியபடி சேர்க்கவும்.' : lang === 'mr' ? 'तेलासारखी औषधे (उदा. निंबोळी तेल) सतत ढवळत टाका.' : 'Add oily concentrates (e.g. Neem Oil, Profenofos) with continuous agitation.',
                      bg: 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/60 text-amber-900 dark:text-amber-300',
                      badgeBg: 'bg-amber-600 text-white'
                    },
                    {
                      num: '5',
                      title: lang === 'ta' ? '5. சிலிகான் ஒட்டுப்பசை (Silicon Sticker)' : lang === 'mr' ? '५. स्टिकर / स्प्रेडर (सर्वात शेवटी)' : '5. Silicon Spreader & Sticker (Last Step)',
                      desc: lang === 'ta' ? 'மருந்து இலைகளில் நன்றாக ஒட்ட லிட்டருக்கு 0.5 மிலி கடைசியாக சேர்க்கவும்.' : lang === 'mr' ? 'औषध पानांवर घट्ट चिटकण्यासाठी ०.५ मिली/लिटर सर्वात शेवटी टाका.' : 'Add 0.5 ml/L silicon spreader at the very end so medicine spreads and sticks.',
                      bg: 'bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-900/60 text-purple-900 dark:text-purple-300',
                      badgeBg: 'bg-purple-600 text-white'
                    }
                  ].map((s, idx) => (
                    <div key={idx} className={`p-3 rounded-2xl border transition-all flex items-start gap-3 ${s.bg}`}>
                      <span className={`w-6 h-6 rounded-full text-xs font-black flex items-center justify-center shrink-0 mt-0.5 ${s.badgeBg}`}>
                        {s.num}
                      </span>
                      <div className="leading-tight">
                        <strong className="block text-xs font-black">{s.title}</strong>
                        <span className="text-[11px] opacity-90 block mt-0.5">{s.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-amber-700 dark:text-amber-400 font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Never mix Copper fungicides with organophosphates in same tank.</span>
              </div>
            </div>

            {/* STEP 3: WATER VOLUME & PUMP DENSITY */}
            <div className={`p-6 rounded-3xl border space-y-4 shadow-sm flex flex-col justify-between ${
              isDark ? 'bg-[#0a1324] border-[#182a4a] text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}>
              <div>
                <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-2xl bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 font-black text-xs flex items-center justify-center border border-amber-300 dark:border-amber-800">
                      03
                    </div>
                    <div>
                      <h3 className="font-black text-base text-slate-900 dark:text-white">
                        {lang === 'ta' ? 'படி 3: ஏக்கருக்கான தண்ணீர் & பம்ப் அளவு' : lang === 'mr' ? 'पायरी ३: पाण्याचे प्रमाण व फवारणी घनता' : 'Step 3: Water Volume & Pump Density'}
                      </h3>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                        {lang === 'ta' ? 'சரியான நோசல் & தெளிப்பு முறை' : 'Uniform Foliar Coverage'}
                      </span>
                    </div>
                  </div>
                  <Gauge className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                  <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 space-y-1.5">
                    <span className="text-[11px] font-bold text-amber-900 dark:text-amber-400 uppercase tracking-wider block">
                      {lang === 'ta' ? '1 ஏக்கருக்கு தண்ணீர் அளவு' : 'Water Volume / Acre'}
                    </span>
                    <strong className="text-xl font-black text-slate-900 dark:text-white block">
                      150 - 200 Litres
                    </strong>
                    <span className="text-xs text-slate-600 dark:text-slate-300 block">
                      (Approx 10 to 12 Knapsack Pumps of 15L)
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-cyan-50/80 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-900/60 space-y-1.5">
                    <span className="text-[11px] font-bold text-cyan-900 dark:text-cyan-400 uppercase tracking-wider block">
                      {lang === 'ta' ? 'பரிந்துரைக்கப்படும் நோசல்' : 'Recommended Nozzle'}
                    </span>
                    <strong className="text-xl font-black text-slate-900 dark:text-white block">
                      Hollow Cone Nozzle
                    </strong>
                    <span className="text-xs text-slate-600 dark:text-slate-300 block">
                      Creates 150-micron fine mist for deep leaf penetration
                    </span>
                  </div>
                </div>

                <div className="mt-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1 text-xs text-slate-700 dark:text-slate-300">
                  <strong>Walking Speed & Lance Height:</strong>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">
                    Maintain lance 1.5 feet above crop canopy in a steady sweeping motion at 1 step per second.
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
                Tip: Clean nozzle with an old toothbrush, never blow with mouth!
              </div>
            </div>

            {/* STEP 4: SAFETY & HARVEST WAIT (PHI) */}
            <div className={`p-6 rounded-3xl border space-y-4 shadow-sm flex flex-col justify-between ${
              isDark ? 'bg-[#0a1324] border-[#182a4a] text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}>
              <div>
                <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-2xl bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 font-black text-xs flex items-center justify-center border border-purple-300 dark:border-purple-800">
                      04
                    </div>
                    <div>
                      <h3 className="font-black text-base text-slate-900 dark:text-white">
                        {lang === 'ta' ? 'படி 4: அறுவடை இடைவெளி & பாதுகாப்பு' : lang === 'mr' ? 'पायरी ४: तोडणी प्रतीक्षा काळ (PHI) व सुरक्षा' : 'Step 4: Safety & Pre-Harvest Interval'}
                      </h3>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                        {lang === 'ta' ? 'நச்சு எச்சமற்ற தரமான விளைச்சல்' : 'Residue-Free Clean Harvest'}
                      </span>
                    </div>
                  </div>
                  <ShieldCheck className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>

                <div className="space-y-3 pt-3">
                  <div className="p-4 rounded-2xl bg-purple-50/80 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/60 space-y-2">
                    <strong className="text-xs font-black text-purple-900 dark:text-purple-300 block">
                      {lang === 'ta' ? 'அறுவடைக்கு முன் காத்திருப்பு காலம் (PHI Days):' : 'Pre-Harvest Interval (PHI) Compliance:'}
                    </strong>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {lang === 'ta' ? 'மருந்து தெளித்த பிறகு காய்கறி, பழங்களை பறிக்க சில நாட்கள் காத்திருக்க வேண்டும். இதனால் பூச்சிக்கொல்லி நச்சு இல்லாமல் சந்தையில் சிறந்த விலை கிடைக்கும்.' : 'Always wait the prescribed number of days between spraying and harvesting so chemical residues fully degrade naturally.'}
                    </p>

                    <div className="grid grid-cols-3 gap-2 pt-1">
                      <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-800 text-center">
                        <span className="text-[10px] text-slate-500 block">Coragen</span>
                        <strong className="text-xs text-purple-700 dark:text-purple-400 font-bold">3 Days</strong>
                      </div>
                      <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-800 text-center">
                        <span className="text-[10px] text-slate-500 block">Mancozeb</span>
                        <strong className="text-xs text-purple-700 dark:text-purple-400 font-bold">7 Days</strong>
                      </div>
                      <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-800 text-center">
                        <span className="text-[10px] text-slate-500 block">Confidor</span>
                        <strong className="text-xs text-purple-700 dark:text-purple-400 font-bold">14 Days</strong>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Always wear a mask & gloves during chemical handling.</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
                Guarantees export-quality produce with zero chemical rejection.
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* TAB 2: FERTILIZERS & PLANT NUTRITION GUIDE (22+)              */}
      {/* ───────────────────────────────────────────────────────────── */}
      {activeTab === 'fertilizers' && (
        <div className="space-y-6">
          
          {/* Quick Stage Recommendations Strip */}
          <div className={`p-5 rounded-3xl border space-y-3 ${
            isDark 
              ? 'bg-gradient-to-r from-[#09182a] via-[#0b1d24] to-[#0c1f19] border-emerald-500/40 text-white' 
              : 'bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100/70 border-emerald-300 text-slate-900'
          }`}>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h2 className="font-black text-sm sm:text-base">
                {lang === 'ta' ? 'பயிர் வளர்ச்சி நிலைக்கேற்ப உரங்களை தேர்வு செய்க' : lang === 'mr' ? 'पिकांच्या वाढीच्या टप्प्यानुसार योग्य खतांची निवड' : 'Stage-by-Stage Fertilizer Selection Guide'}
              </h2>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
              {lang === 'ta' ? 'விதைப்பு முதல் அறுவடை வரை பயிரின் தேவை மாறும். கீழே உள்ள கட்டங்களை கிளிக் செய்து சரியான உரத்தை தேர்ந்தெடுக்கவும்:' : lang === 'mr' ? 'पेरणीपासून तोडणीपर्यंत पिकाची गरज बदलते. अचूक उत्पादनासाठी खालील टप्पे पहा:' : 'Match exact fertilizer grades to crop growth stages for maximum nutrient uptake:'}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              {[
                { stage: '1. Seed & Basal Root', stageMr: '१. पेरणी व सुरुवातीची मुळे', stageTa: '1. விதைப்பு & ஆரம்ப வேர்', fert: 'DAP (18:46:0) + Nano DAP + SSP', fertMr: 'डीएपी + नॅनो डीएपी + सिंगल सुपर फॉस्फेट' },
                { stage: '2. Vegetative Branching', stageMr: '२. फुटवे व शाकीय वाढ', stageTa: '2. கிளை வளர்ச்சி & பச்சை பசேல்', fert: '19:19:19 + Nano Urea + MgSO4', fertMr: '१९:१९:१९ + नॅनो युरिया + मॅग्नेशियम' },
                { stage: '3. Flowering & Fruit Set', stageMr: '३. फुलकळी व फळधारणा', stageTa: '3. பூக்கும் பருவம் & பிஞ்சு பிடிப்பு', fert: '12:61:00 (MAP) + 00:52:34 + Boron', fertMr: '१२:६१:०० + ००:५२:३४ + बोरॉन' },
                { stage: '4. Fruit Sizing & Ripening', stageMr: '४. फळांची फुगवण व पक्वता', stageTa: '4. காய் பெருக்கம் & எடை கூடுதல்', fert: '13:00:45 + 00:00:50 + Calcium Nitrate', fertMr: '१३:००:४५ + ००:००:५० + कॅल्शियम' }
              ].map((item, i) => (
                <div key={i} className={`p-3.5 rounded-2xl border text-xs space-y-1 ${
                  isDark ? 'bg-[#08111e]/90 border-[#182c4d]' : 'bg-white/95 border-emerald-200 shadow-xs'
                }`}>
                  <strong className="text-emerald-700 dark:text-emerald-400 font-black block">
                    {lang === 'ta' ? item.stageTa : lang === 'mr' ? item.stageMr : item.stage}
                  </strong>
                  <span className="text-[11px] text-slate-700 dark:text-slate-200 font-bold block">
                    {lang === 'mr' ? item.fertMr : item.fert}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Filter Categories & Search Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
              {[
                { id: 'all', label: lang === 'ta' ? 'அனைத்து உரங்கள் (22+)' : lang === 'mr' ? 'सर्व खते (२२+)' : 'All Fertilizers (22+)' },
                { id: 'primary_npk', label: lang === 'ta' ? '🌱 முக்கிய NPK (யூரியா, DAP, MOP)' : lang === 'mr' ? '🌱 मुख्य खते (युरिया, डीएपी)' : '🌱 Primary NPK (Urea, DAP, MOP)' },
                { id: 'water_soluble', label: lang === 'ta' ? '🧪 நீரில் கரையும் (19:19:19, 0:52:34)' : lang === 'mr' ? '🧪 विद्राव्य खते (१९:१९:१९, ००:५२:३४)' : '🧪 Water Soluble (19:19:19, 0:52:34)' },
                { id: 'secondary_soil', label: lang === 'ta' ? '🛡️ கால்சியம், மெக்னீசியம், கந்தகம்' : lang === 'mr' ? '🛡️ कॅल्शियम, मॅग्नेशियम, सल्फर' : '🛡️ Calcium, Magnesium, Sulfur' },
                { id: 'micronutrients', label: lang === 'ta' ? '⚡ நுண்ணூட்டச்சத்து (ஜிங்க், போரான்)' : lang === 'mr' ? '⚡ सूक्ष्मअन्नद्रव्ये (झिंक, बोरॉन)' : '⚡ Micronutrients (Zinc, Boron, Fe)' },
                { id: 'bio_stimulants', label: lang === 'ta' ? '🌊 ஹியூமிக் & கடற்பாசி சத்து' : lang === 'mr' ? '🌊 ह्युमिक ॲसिड व सीवीड' : '🌊 Humic & Seaweed Bio-Stimulants' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setFertCategoryFilter(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    fertCategoryFilter === cat.id
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : isDark
                      ? 'bg-[#0a1324] border border-[#182a4a] text-slate-300 hover:text-white'
                      : 'bg-white border border-slate-200 text-slate-700 hover:text-emerald-700 shadow-2xs'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder={lang === 'ta' ? 'உரம் அல்லது பயிரைத் தேடவும்...' : lang === 'mr' ? 'खत, घटक किंवा पीक शोधा...' : 'Search fertilizer, grade or crop...'}
                value={fertSearch}
                onChange={(e) => setFertSearch(e.target.value)}
                className={`w-full pl-9 pr-3 py-2 rounded-2xl text-xs font-medium focus:outline-none focus:border-emerald-500 transition-colors ${
                  isDark 
                    ? 'bg-[#0a1324] border border-[#182a4a] text-white placeholder-slate-500' 
                    : 'bg-white border border-slate-200 text-slate-900 placeholder-slate-400 shadow-2xs'
                }`}
              />
            </div>
          </div>

          {/* FERTILIZERS EXPANDED CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredFertilizers.map((fert) => {
              const name = getLocalizedField(fert, 'name');
              const catLabel = getLocalizedField(fert, 'categoryLabel');
              const benefits = getLocalizedField(fert, 'plantBenefits');
              const stage = getLocalizedField(fert, 'bestStage');
              const yieldTips = getLocalizedField(fert, 'yieldTips');

              return (
                <div
                  key={fert.id}
                  className={`p-6 rounded-3xl border transition-all flex flex-col justify-between space-y-4 hover:shadow-lg ${
                    isDark 
                      ? 'bg-[#0a1324] border-[#182a4a] hover:border-emerald-500/50 text-white' 
                      : 'bg-white border-slate-200 hover:border-emerald-400 text-slate-900 shadow-sm'
                  }`}
                >
                  <div className="space-y-3.5">
                    
                    {/* Top Strip: Grade Badge & Category */}
                    <div className="flex items-start justify-between gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-2xl shadow-2xs shrink-0">
                          {fert.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                              {fert.grade}
                            </span>
                            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                              {catLabel}
                            </span>
                          </div>
                          <h3 className="font-black text-base sm:text-lg text-slate-900 dark:text-white mt-1 leading-snug">
                            {name}
                          </h3>
                        </div>
                      </div>

                      <span className="px-2.5 py-1 rounded-xl text-[10px] font-black uppercase bg-cyan-50 text-cyan-900 dark:bg-cyan-950 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 shrink-0">
                        {fert.badge}
                      </span>
                    </div>

                    {/* Section 1: Uses for Plants */}
                    <div className="p-3.5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-black text-[#1B5E20] dark:text-emerald-400">
                        <Sprout className="w-4 h-4" />
                        <span>{lang === 'ta' ? 'பயிர்களுக்கான நன்மைகள் (Uses for Plants):' : lang === 'mr' ? 'पिकांसाठी होणारे फायदे:' : 'What it does for the Plant:'}</span>
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                        {benefits}
                      </p>
                    </div>

                    {/* Section 2: Best Growth Stage */}
                    <div className="flex items-center gap-2 text-xs">
                      <strong className="text-slate-600 dark:text-slate-400 font-bold shrink-0">
                        {lang === 'ta' ? 'பொருத்தமான பருவம்:' : lang === 'mr' ? 'वापराचा योग्य टप्पा:' : 'Best Crop Stage:'}
                      </strong>
                      <span className="font-black text-emerald-700 dark:text-emerald-400">
                        {stage}
                      </span>
                    </div>

                    {/* Section 3: Exact Dosages (Pump / Acre / Foliar) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-50 dark:bg-slate-900/60 p-3 rounded-2xl border border-slate-200/70 dark:border-slate-800 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
                          {lang === 'ta' ? '15L பம்ப் மருந்தளவு:' : lang === 'mr' ? '१५ लिटर पंपासाठी मात्रा:' : 'Knapsack Pump (15L):'}
                        </span>
                        <strong className="text-slate-900 dark:text-white text-xs">
                          {fert.dosagePump15L}
                        </strong>
                      </div>

                      <div>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
                          {lang === 'ta' ? 'ஏக்கருக்கான அளவு:' : lang === 'mr' ? 'प्रति एकर डोस:' : 'Per Acre Dose:'}
                        </span>
                        <strong className="text-emerald-700 dark:text-emerald-400 text-xs">
                          {fert.dosagePerAcre}
                        </strong>
                      </div>
                    </div>

                    {/* Section 4: How to use properly for Maximum Yield */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-black text-amber-700 dark:text-amber-400">
                        <Lightbulb className="w-3.5 h-3.5" />
                        <span>{lang === 'ta' ? 'அதிக மகசூலுக்கான முறை (Yield Protocol):' : lang === 'mr' ? 'जास्तीत जास्त उत्पादनासाठी वापर पद्धत:' : 'How to Use for Better Yield:'}</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                        {yieldTips}
                      </p>
                    </div>

                    {/* Target Crops & Precautions */}
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] space-y-1">
                      <div className="text-slate-600 dark:text-slate-400">
                        <strong>{lang === 'ta' ? 'பயிர்கள்:' : 'Target Crops:'}</strong> {fert.targetCrops}
                      </div>

                      {fert.precautions && (
                        <div className="flex items-start gap-1.5 text-rose-600 dark:text-rose-400 font-medium">
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                          <span>{fert.precautions}</span>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* TAB 3: CHEMICAL DOSAGE MATRIX                                 */}
      {/* ───────────────────────────────────────────────────────────── */}
      {activeTab === 'chemicals' && (
        <div className="space-y-5">
          {/* Filter Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'all', label: 'All Formulations' },
                { id: 'insecticides', label: '🐛 Insecticides' },
                { id: 'fungicides', label: '🍄 Fungicides' },
                { id: 'herbicides', label: '🌿 Herbicides' },
                { id: 'bio-pesticides', label: '🌱 Bio-Pesticides' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setChemCategoryFilter(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    chemCategoryFilter === cat.id
                      ? 'bg-emerald-600 text-white'
                      : isDark
                      ? 'bg-[#0a1324] border border-[#182a4a] text-slate-300'
                      : 'bg-white border border-slate-200 text-slate-700 shadow-2xs'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search chemical, pest, or crop..."
                value={chemSearch}
                onChange={(e) => setChemSearch(e.target.value)}
                className={`w-full pl-9 pr-3 py-1.5 rounded-2xl text-xs font-medium focus:outline-none focus:border-emerald-500 ${
                  isDark ? 'bg-[#0a1324] border border-[#182a4a] text-white' : 'bg-white border border-slate-200 text-slate-900 shadow-2xs'
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredChemicals.map(chem => (
              <div
                key={chem.id}
                className={`p-5 rounded-3xl border space-y-3 shadow-sm ${
                  isDark ? 'bg-[#0a1324] border-[#182a4a] text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-500">
                      {chem.categoryLabel}
                    </span>
                    <h3 className="font-black text-base text-slate-900 dark:text-white mt-0.5">
                      {chem.tradeName}
                    </h3>
                    <p className="text-xs text-emerald-700 dark:text-emerald-400 font-bold">
                      {chem.activeComposition}
                    </p>
                  </div>

                  <span className="px-2.5 py-1 rounded-xl text-[10px] font-bold bg-emerald-50 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    PHI: {chem.phiDays} Days
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 bg-slate-50 dark:bg-slate-900/60 p-3 rounded-2xl border border-slate-200/70 dark:border-slate-800 text-xs text-center">
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold block">Per Litre</span>
                    <strong className="text-slate-900 dark:text-white">{chem.dosagePerLiter}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold block">15L Pump</span>
                    <strong className="text-emerald-700 dark:text-emerald-400">{chem.dosagePerPump15L}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold block">Per Acre</span>
                    <strong className="text-slate-900 dark:text-white">{chem.dosagePerAcre}</strong>
                  </div>
                </div>

                <div className="text-xs space-y-1">
                  <div className="text-slate-600 dark:text-slate-400">
                    <strong>Target Pests:</strong> {chem.targetPests.join(', ')}
                  </div>
                  <div className="text-slate-600 dark:text-slate-400">
                    <strong>Suitable Crops:</strong> {chem.suitableCrops.join(', ')}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed pt-1">
                    {chem.modeOfAction}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* TAB 4: SEASONAL CROPS                                         */}
      {/* ───────────────────────────────────────────────────────────── */}
      {activeTab === 'crops' && (
        <div className="space-y-5">
          <div className="flex gap-2">
            {[
              { id: 'kharif', label: 'Kharif (Monsoon)', icon: CloudRain },
              { id: 'rabi', label: 'Rabi (Winter)', icon: Snowflake },
              { id: 'zaid', label: 'Zaid (Summer)', icon: Sun }
            ].map(s => {
              const Icon = s.icon;
              const isSel = selectedSeason === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setSelectedSeason(s.id)}
                  className={`px-4 py-2 rounded-2xl font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                    isSel
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : isDark
                      ? 'bg-[#0a1324] border border-[#182a4a] text-slate-300'
                      : 'bg-white border border-slate-200 text-slate-700 shadow-2xs'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{s.label}</span>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {seasonalCropsData[selectedSeason].crops.map(crop => (
              <div
                key={crop.id}
                className={`p-5 rounded-3xl border space-y-3 shadow-sm ${
                  isDark ? 'bg-[#0a1324] border-[#182a4a] text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <h3 className="font-black text-base text-slate-900 dark:text-white">{crop.name}</h3>
                    <p className="text-xs text-amber-600 dark:text-amber-400 font-bold mt-0.5">Hybrids: {crop.variety}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-xl text-[10px] font-bold bg-emerald-50 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    {crop.expectedYield}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 bg-slate-50 dark:bg-slate-900/60 p-3 rounded-2xl border border-slate-200/70 dark:border-slate-800 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Maturity Duration:</span>
                    <strong className="text-slate-900 dark:text-white">{crop.maturityDays}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Water Requirement:</span>
                    <strong className="text-emerald-700 dark:text-emerald-400">{crop.waterRequirement}</strong>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <div><strong>Nutrients:</strong> {crop.keyNutrients}</div>
                  <div><strong>Pests & Diseases:</strong> {crop.pestsToWatch} • {crop.diseasesToWatch}</div>
                  <div className="p-2.5 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-xl text-amber-900 dark:text-amber-300 text-[11px]">
                    <strong>Agronomist Tip:</strong> {crop.keyTips}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* TAB 5: DRIP IRRIGATION & SOIL MOISTURE                         */}
      {/* ───────────────────────────────────────────────────────────── */}
      {activeTab === 'irrigation' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {irrigationMaintenanceProtocols.map((proto, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-3xl border space-y-3 shadow-sm ${
                isDark ? 'bg-[#0a1324] border-[#182a4a] text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <div className="flex items-center space-x-2.5 border-b border-slate-100 dark:border-slate-800 pb-3">
                <Droplets className="w-5 h-5 text-cyan-600" />
                <h3 className="font-black text-base text-slate-900 dark:text-white">{proto.title}</h3>
              </div>

              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                {proto.points.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                    <span className="text-cyan-600 font-bold shrink-0">•</span>
                    <span className="text-[11px] leading-relaxed">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* TAB 6: AGRO DEALERS & MANDIS                                  */}
      {/* ───────────────────────────────────────────────────────────── */}
      {activeTab === 'vendors' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredVendors.map(vendor => (
              <div
                key={vendor.id}
                className={`p-5 rounded-3xl border space-y-3 shadow-sm flex flex-col justify-between ${
                  isDark ? 'bg-[#0a1324] border-[#182a4a] text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase">
                        {vendor.categoryLabel}
                      </span>
                      <h3 className="font-black text-base text-slate-900 dark:text-white mt-0.5">
                        {vendor.name}
                      </h3>
                      <p className="text-xs text-slate-500">{vendor.nameMr}</p>
                    </div>

                    <span className="px-2.5 py-1 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      📍 {vendor.distanceDisplay}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{vendor.location} • Landmark: {vendor.landmark}</span>
                  </p>
                </div>

                <a
                  href={`tel:${vendor.phone}`}
                  className="w-full py-2.5 bg-[#1B5E20] hover:bg-[#154D1A] text-white font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-all"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {vendor.phone}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* TAB 7: INSTANT PUMP DOSAGE CALCULATOR                         */}
      {/* ───────────────────────────────────────────────────────────── */}
      {activeTab === 'calculator' && (
        <div className={`p-6 sm:p-8 rounded-3xl border max-w-2xl mx-auto space-y-6 shadow-sm ${
          isDark ? 'bg-[#0a1324] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}>
          <div className="flex items-center space-x-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-base sm:text-lg">
                {lang === 'ta' ? 'உடனடி பம்ப் & ஏக்கர் மருந்தளவு கால்குலேட்டர்' : lang === 'mr' ? 'झटपट फवारणी मात्रा गणकयंत्र' : 'Instant Pump & Tank Dosage Calculator'}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {lang === 'ta' ? 'பம்ப் கொள்ளளவு மற்றும் மருந்தளவை தேர்ந்தெடுத்து தேவையான அளவை கணக்கிடுக' : 'Enter tank capacity and recommended chemical dose to calculate exact mixing quantities'}
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs font-medium">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1.5">
                {lang === 'ta' ? '1. பம்ப் / தொட்டி கொள்ளளவு (லிட்டரில்):' : '1. Sprayer Tank Capacity (Liters):'}
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[15, 16, 20, 200].map(cap => (
                  <button
                    key={cap}
                    type="button"
                    onClick={() => setTankCapacityLiters(cap)}
                    className={`py-2 rounded-xl text-xs font-black transition-all ${
                      tankCapacityLiters === cap
                        ? 'bg-emerald-600 text-white'
                        : isDark
                        ? 'bg-[#0f1d38] border border-[#203254] text-slate-300'
                        : 'bg-slate-100 border border-slate-200 text-slate-700'
                    }`}
                  >
                    {cap}L {cap === 200 ? '(Acre Drum)' : 'Pump'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1.5">
                {lang === 'ta' ? '2. பரிந்துரைக்கப்பட்ட மருந்தளவு (லிட்டருக்கு மிலி / கிராம்):' : '2. Recommended Dose (ml or g per Liter of water):'}
              </label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                max="20"
                value={recommendedDosagePerLiter}
                onChange={(e) => setRecommendedDosagePerLiter(parseFloat(e.target.value) || 0)}
                className={`w-full p-2.5 rounded-xl border text-sm font-bold focus:outline-none focus:border-emerald-500 ${
                  isDark ? 'bg-[#0f1d38] border-[#203254] text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>

            {/* Result Display */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 text-center space-y-1">
              <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                {lang === 'ta' ? 'தொட்டியில் சேர்க்க வேண்டிய மொத்த மருந்து அளவு:' : 'Total Chemical to Mix in Tank:'}
              </span>
              <div className="text-3xl font-black text-emerald-700 dark:text-emerald-400">
                {totalChemicalRequired} ml / grams
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                in {tankCapacityLiters} Liters of water
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
