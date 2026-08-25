import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  seasonalCropsData, 
  fertilizerProtocols, 
  pesticideSafetyProtocols, 
  irrigationMaintenanceProtocols, 
  preventativeDiseaseForecast,
  cropProtectionChemicalMatrix,
  nearbyAgroVendorsWithDistance
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
  Heart
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ProAgronomyTips = () => {
  const { lang, t, farmerProfile, onNavigate } = useApp();

  // Active Tab: 'crops' | 'chemicals' | 'vendors' | 'fertilizers' | 'pesticides' | 'irrigation' | 'diseases' | 'calculator'
  const [activeTab, setActiveTab] = useState('chemicals');

  // Season filter: 'kharif' | 'rabi' | 'zaid'
  const [selectedSeason, setSelectedSeason] = useState('kharif');

  // Chemical Matrix Filters
  const [chemCategoryFilter, setChemCategoryFilter] = useState('all'); // 'all' | 'insecticides' | 'fungicides' | 'herbicides' | 'bio-pesticides'
  const [chemCropFilter, setChemCropFilter] = useState('all');
  const [chemSearch, setChemSearch] = useState('');

  // Vendor Matrix Filters
  const [vendorCategoryFilter, setVendorCategoryFilter] = useState('all'); // 'all' | 'fertilizers-govt' | 'fertilizers-pesticides' | 'seeds-certified' | 'mandi-sell'
  const [vendorSearch, setVendorSearch] = useState('');

  // Interactive Calculator State
  const [tankCapacityLiters, setTankCapacityLiters] = useState(16);
  const [recommendedDosagePerLiter, setRecommendedDosagePerLiter] = useState(2.0);
  const [selectedChemicalType, setSelectedChemicalType] = useState('fungicide');

  // Search in Disease Guide
  const [diseaseSearch, setDiseaseSearch] = useState('');

  // Calculate Tank Dosage
  const totalChemicalRequired = (tankCapacityLiters * recommendedDosagePerLiter).toFixed(1);
  const totalWaterRequiredLiters = tankCapacityLiters;

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

  // Print Pro Tips Handbook
  const handlePrintHandbook = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const handbookHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>CropShield AI - Scientific Agronomy & Crop Protection Handbook</title>
        <style>
          body { font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif; padding: 40px; color: #1e293b; background: #fff; line-height: 1.6; }
          .header { display: flex; justify-content: space-between; border-bottom: 3px solid #0284c7; padding-bottom: 15px; margin-bottom: 20px; }
          .title { font-size: 22px; font-weight: 800; color: #0369a1; }
          .section { margin-bottom: 25px; page-break-inside: avoid; }
          .section-title { font-size: 16px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #cbd5e1; padding-bottom: 5px; margin-bottom: 10px; }
          .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; margin-bottom: 10px; font-size: 13px; }
          .badge { background: #e0f2fe; color: #0369a1; padding: 2px 8px; border-radius: 6px; font-weight: bold; font-size: 11px; }
          .footer { margin-top: 40px; border-top: 1px solid #cbd5e1; padding-top: 10px; font-size: 11px; color: #64748b; text-align: center; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="title">🌾 CropShield AI • Expert Agronomy, Chemical Compositions & Vendors Directory</div>
            <div style="font-size: 12px; color: #64748b;">Farmer: ${farmerProfile?.name || 'Ramesh Patil'} • Location: Sangli, Maharashtra • Kisan Helpline: 1800-180-1551</div>
          </div>
          <div style="text-align: right;">
            <div class="badge">OFFICIAL AGRONOMY GUIDE</div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">1. Standard Chemical Formulations & Dosage Table</div>
          <div class="card">
            • <strong>Coragen (Chlorantraniliprole 18.5% SC):</strong> 0.3-0.4 ml/L for Fruit/Pod/Stem Borers in Tomato, Cotton, Paddy. PHI: 3 Days. High Bee Safety.<br/>
            • <strong>Confidor (Imidacloprid 17.8% SL):</strong> 0.3-0.5 ml/L for Aphids, Jassids, Thrips, Whiteflies. PHI: 14 Days.<br/>
            • <strong>Mancozeb 75% WP (Dithane M-45):</strong> 2.0-2.5 g/L for Early/Late Blight, Rust, Downy Mildew. Safe for beneficial insects.<br/>
            • <strong>Pendimethalin 38.7% CS (Stomp Extra):</strong> 3.5-4.0 ml/L pre-emergence herbicide for narrow & broad-leaf weeds in Soybean, Cotton, Onion.<br/>
            • <strong>Quizalofop-ethyl 5% EC (Targa Super):</strong> 2.0 ml/L post-emergence graminicide for narrow-leaf grassy weeds in broadleaf crops.
          </div>
        </div>

        <div class="section">
          <div class="section-title">2. Nearest Verified Input Dealers & Mandi Hubs (with KM Distance)</div>
          <div class="card">
            • <strong>Kisan Agro Seva Kendra (1.2 km away):</strong> Kupwad Main Road. Subsidized Fertilizers, Coragen, Seeds. Ph: +91 98220 14589.<br/>
            • <strong>PACS Kupwad Center (1.5 km away):</strong> Gram Panchayat Bhawan. Govt Subsidized Urea @ ₹266.50 & DAP @ ₹1350. Ph: 0233-2644211.<br/>
            • <strong>Sangli APMC Main Market Yard (2.8 km away):</strong> Direct grain, pulse & turmeric electronic auctions (e-NAM). Ph: 0233-2670114.<br/>
            • <strong>Shri Ganesh Krishi Vikas (3.4 km away):</strong> Plant protection, Herbicides, Bio-fungicides. Ph: +91 94230 87120.<br/>
            • <strong>Mahabeej Seed Depot (4.2 km away):</strong> MIDC Kupwad. Certified Foundation Seeds. Ph: +91 98901 33451.
          </div>
        </div>

        <div class="footer">
          CropShield AI Scientific Agronomy Service • Toll-Free Emergency Helpline: <strong>1800-180-1551</strong>
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(handbookHtml);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  return (
    <div className="space-y-6 select-none pb-14">
      {/* Top Banner Navigation */}
      <div className="bg-[#0b1528] border border-[#1e2f4d] rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#18263f] pb-5">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)]">
              <Lightbulb className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-white tracking-tight">
                  {lang === 'mr' ? 'तज्ज्ञ कृषी सल्ला, अचूक औषध घटक व नजीकची दुकाने (KM)' : 'Pro Agronomy Tips & Chemical Compositions'}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Verified Formulations
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {lang === 'mr' 
                  ? 'कीटकनाशके, बुरशीनाशके, तणनाशके यांचे रासायनिक घटक, मित्रकीटकांची सुरक्षा व नजीकची अधिकृत दुकाने व मंडी (KM अंतरासह)'
                  : 'Exact Active Compositions, Target Pests, Beneficial Predator Safety Index & Nearby Vendors Directory with KM Specifications'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrintHandbook}
              className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>{lang === 'mr' ? 'मार्गदर्शिका डाउनलोड करा (PDF)' : 'Download Handbook (PDF)'}</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-4 pt-2 flex items-center flex-wrap gap-2 text-xs">
          {[
            { id: 'chemicals', label: lang === 'mr' ? '१. औषध घटक व प्रमाण (Chemicals)' : '1. Chemical Compositions Matrix', icon: FlaskConical, color: 'text-cyan-400' },
            { id: 'vendors', label: lang === 'mr' ? '२. नजीकची दुकाने व मंडी (KM)' : '2. Nearby Vendors & Mandi (KM)', icon: Store, color: 'text-emerald-400' },
            { id: 'crops', label: lang === 'mr' ? '३. हंगामनिहाय पिके (Seasons)' : '3. Seasonal Crops Guide', icon: Calendar, color: 'text-amber-400' },
            { id: 'fertilizers', label: lang === 'mr' ? '४. खते व पोषण (Fertilizers)' : '4. Fertilizer Stewardship', icon: Sprout, color: 'text-emerald-400' },
            { id: 'pesticides', label: lang === 'mr' ? '५. फवारणी सुरक्षा (Safety)' : '5. Safe Spray Protocols', icon: ShieldAlert, color: 'text-rose-400' },
            { id: 'irrigation', label: lang === 'mr' ? '६. आधुनिक सिंचन (Irrigation)' : '6. Irrigation & Maintenance', icon: Droplets, color: 'text-cyan-400' },
            { id: 'diseases', label: lang === 'mr' ? '७. रोग प्रतिबंध (Diseases)' : '7. Disease & Pest Forecast', icon: Bug, color: 'text-purple-400' },
            { id: 'calculator', label: lang === 'mr' ? '८. पंप डोस गणकयंत्र (Calculator)' : '8. Sprayer Tank Calculator', icon: Calculator, color: 'text-amber-400' }
          ].map(tab => {
            const Icon = tab.icon;
            const isSel = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={'flex items-center space-x-2 px-3.5 py-2 rounded-xl font-bold transition-all ' + (
                  isSel
                    ? 'bg-amber-500 text-slate-950 shadow-[0_0_14px_rgba(245,158,11,0.35)]'
                    : 'bg-[#0f1d38] text-slate-300 hover:text-white border border-[#203254]'
                )}
              >
                <Icon className={'w-4 h-4 ' + (isSel ? 'text-slate-950' : tab.color)} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: CHEMICAL COMPOSITIONS MATRIX */}
      {activeTab === 'chemicals' && (
        <div className="space-y-5">
          {/* Filters Bar */}
          <div className="bg-[#0b1528] border border-[#1e2f4d] p-4 rounded-2xl flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="flex items-center flex-wrap gap-2 w-full md:w-auto">
              {[
                { id: 'all', label: 'All Formulations' },
                { id: 'insecticides', label: 'Insecticides / Larvicides' },
                { id: 'fungicides', label: 'Fungicides' },
                { id: 'herbicides', label: 'Herbicides / Weedicides' },
                { id: 'bio-pesticides', label: 'Bio & Organic Agents' }
              ].map(c => (
                <button
                  key={c.id}
                  onClick={() => setChemCategoryFilter(c.id)}
                  className={'px-3 py-1.5 rounded-xl text-xs font-bold transition-all ' + (
                    chemCategoryFilter === c.id
                      ? 'bg-cyan-500 text-slate-950 shadow-xs'
                      : 'bg-[#0f1d38] text-slate-400 hover:text-white border border-[#203254]'
                  )}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2.5 w-full md:w-auto">
              <div className="relative flex-1 md:w-48">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search active compound (e.g. Coragen, Mancozeb)..."
                  value={chemSearch}
                  onChange={(e) => setChemSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-[#0d182e] border border-[#203254] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <select
                value={chemCropFilter}
                onChange={(e) => setChemCropFilter(e.target.value)}
                className="bg-[#0d182e] border border-[#203254] text-xs text-slate-300 font-semibold px-3 py-1.5 rounded-xl focus:outline-none cursor-pointer"
              >
                <option value="all">All Crops</option>
                <option value="tomato">Tomato</option>
                <option value="cotton">Cotton</option>
                <option value="soybean">Soybean</option>
                <option value="paddy">Paddy / Rice</option>
                <option value="wheat">Wheat</option>
                <option value="gram">Gram / Chickpea</option>
                <option value="chilli">Chilli</option>
                <option value="onion">Onion</option>
                <option value="maize">Maize</option>
              </select>
            </div>
          </div>

          {/* Chemical Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredChemicals.map(chem => (
              <div
                key={chem.id}
                className="bg-[#0b1528] border border-[#1e2f4d] hover:border-cyan-500/40 rounded-2xl p-5 space-y-4 shadow-xl transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2 border-b border-[#18263f] pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-black rounded-md uppercase">
                          {chem.categoryLabel}
                        </span>
                        <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold rounded-md">
                          PHI: {chem.phiDays} Days Waiting
                        </span>
                      </div>
                      <h3 className="font-black text-base text-white mt-1">
                        {chem.tradeName}
                      </h3>
                      <p className="text-xs text-cyan-300 font-mono font-bold mt-0.5">
                        Active Composition: {chem.activeComposition}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 bg-[#070e1e] p-3 rounded-xl border border-[#16233b] text-center text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Per Litre Water:</span>
                      <strong className="text-emerald-400 font-mono text-xs">{chem.dosagePerLiter}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">15L Knapsack Pump:</span>
                      <strong className="text-cyan-300 font-mono text-xs">{chem.dosagePerPump15L}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Per Acre Dose:</span>
                      <strong className="text-amber-300 font-mono text-xs">{chem.dosagePerAcre}</strong>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-slate-300">
                    <div>
                      <strong className="text-rose-400">Target Insects & Pathogens:</strong>{' '}
                      <span className="text-slate-200">{chem.targetPests.join(' • ')}</span>
                    </div>
                    <div>
                      <strong className="text-amber-400">Suitable Crops:</strong>{' '}
                      <span className="text-slate-300">{chem.suitableCrops.join(', ')}</span>
                    </div>
                    <div className="p-2.5 bg-[#081524] rounded-xl border border-cyan-900/60 text-[11px]">
                      <div className="flex items-center gap-1.5 text-emerald-400 font-bold mb-0.5">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Natural Predators & Honeybee Safety Index: <strong>{chem.predatorSafetyRating}</strong></span>
                      </div>
                      <p className="text-slate-300 leading-relaxed">{chem.predatorSafetyDetails}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#18263f] flex items-center justify-between gap-2 text-xs">
                  <span className="text-[11px] text-slate-400 italic truncate">{chem.modeOfAction}</span>
                  <button
                    onClick={() => {
                      const val = parseFloat(chem.dosagePerLiter) || 2.0;
                      setRecommendedDosagePerLiter(val);
                      setSelectedChemicalType(chem.category.includes('herb') ? 'micronutrient' : chem.category === 'fungicides' ? 'fungicide' : 'insecticide');
                      setActiveTab('calculator');
                    }}
                    className="px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 border border-cyan-500/40 rounded-xl font-extrabold text-[11px] transition-colors flex items-center gap-1 shrink-0"
                  >
                    <Calculator className="w-3 h-3" />
                    <span>Calculate Pump Dose</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: NEARBY VENDORS & MANDI HUBS DIRECTORY WITH KM DISTANCE */}
      {activeTab === 'vendors' && (
        <div className="space-y-5">
          <div className="bg-[#0b1528] border border-[#1e2f4d] p-4 rounded-2xl flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="flex items-center flex-wrap gap-2 w-full md:w-auto">
              {[
                { id: 'all', label: 'All Locations (Within 6 KM)' },
                { id: 'fertilizers-govt', label: 'Govt Subsidized (DBT / PACS)' },
                { id: 'fertilizers-pesticides', label: 'Agro Chemicals & Fertilizers' },
                { id: 'seeds-certified', label: 'Certified Seeds Depots' },
                { id: 'mandi-sell', label: 'Direct Crop Mandi (Sell Harvest)' }
              ].map(c => (
                <button
                  key={c.id}
                  onClick={() => setVendorCategoryFilter(c.id)}
                  className={'px-3 py-1.5 rounded-xl text-xs font-bold transition-all ' + (
                    vendorCategoryFilter === c.id
                      ? 'bg-emerald-500 text-slate-950 shadow-xs'
                      : 'bg-[#0f1d38] text-slate-400 hover:text-white border border-[#203254]'
                  )}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div className="relative flex-1 md:w-60">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search vendor by name, location or stock..."
                value={vendorSearch}
                onChange={(e) => setVendorSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-[#0d182e] border border-[#203254] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredVendors.map(vendor => (
              <div
                key={vendor.id}
                className="bg-[#0b1528] border border-[#1e2f4d] hover:border-emerald-500/50 rounded-2xl p-5 space-y-4 shadow-xl transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2 border-b border-[#18263f] pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold rounded-md">
                          {vendor.categoryLabel}
                        </span>
                        {vendor.dbtPoint && (
                          <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-black rounded-md">
                            ✓ DBT Authorized
                          </span>
                        )}
                      </div>
                      <h3 className="font-black text-base text-white mt-1.5 leading-snug">
                        {vendor.name}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">{vendor.nameMr}</p>
                    </div>

                    <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black rounded-xl shrink-0 shadow-xs">
                      📍 {vendor.distanceDisplay}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 flex items-start gap-1.5 font-medium">
                    <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{vendor.location} <span className="text-slate-400 block text-[11px]">Landmark: {vendor.landmark}</span></span>
                  </p>

                  <div className="bg-[#070e1e] p-3 rounded-xl border border-[#16233b] space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-slate-400 text-[11px]">
                      <span>License: <strong>{vendor.licenseNo}</strong></span>
                      <span className="text-emerald-400 font-bold">{vendor.status}</span>
                    </div>

                    <div className="pt-1 border-t border-[#16233b]">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Available Stocks & Facilities:</span>
                      <ul className="space-y-1 text-[11px] text-slate-300">
                        {vendor.availableStocks.map((stock, sIdx) => (
                          <li key={sIdx} className="flex items-center gap-1.5">
                            <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                            <span className="truncate">{stock}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#18263f] flex items-center gap-2">
                  <a
                    href={`tel:${vendor.phone}`}
                    className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Dealer</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => alert(`Opening GPS navigation route to ${vendor.name} (${vendor.distanceDisplay})`)}
                    className="px-3 py-2 bg-[#0e1c35] hover:bg-[#152a4e] border border-[#203c6e] text-slate-200 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Route</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SEASONAL CROPS GUIDE */}
      {activeTab === 'crops' && (
        <div className="space-y-5">
          <div className="bg-[#0b1528] border border-[#1e2f4d] p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="font-black text-sm text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>{seasonalCropsData[selectedSeason].title}</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Period: <strong className="text-cyan-300">{seasonalCropsData[selectedSeason].period}</strong> • {seasonalCropsData[selectedSeason].description}
              </p>
            </div>

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
                    className={'px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ' + (
                      isSel
                        ? 'bg-amber-500 text-slate-950 shadow-md'
                        : 'bg-[#0f1d38] text-slate-400 hover:text-white border border-[#203254]'
                    )}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{s.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {seasonalCropsData[selectedSeason].crops.map(crop => (
              <div 
                key={crop.id}
                className="bg-[#0b1528] border border-[#1e2f4d] hover:border-amber-500/40 rounded-2xl p-5 space-y-3.5 shadow-lg transition-all"
              >
                <div className="flex items-start justify-between border-b border-[#18263f] pb-3">
                  <div>
                    <h3 className="font-black text-base text-white">{crop.name}</h3>
                    <p className="text-xs text-amber-300 font-semibold mt-0.5">Recommended Hybrids: {crop.variety}</p>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold rounded-lg">
                    {crop.expectedYield}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 bg-[#070e1e] p-3 rounded-xl border border-[#16233b] text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Soil Requirement:</span>
                    <strong className="text-slate-200">{crop.soilType}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Maturity Duration:</span>
                    <strong className="text-cyan-300">{crop.maturityDays}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Optimal Temp:</span>
                    <strong className="text-amber-300">{crop.optimalTemp}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Water Demand:</span>
                    <strong className="text-blue-300">{crop.waterRequirement}</strong>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-300">
                  <div>
                    <strong className="text-emerald-400">Nutrient Dose:</strong> {crop.keyNutrients}
                  </div>
                  <div>
                    <strong className="text-rose-400">Watch Pests & Diseases:</strong> {crop.pestsToWatch} • {crop.diseasesToWatch}
                  </div>
                  <div className="p-2 bg-amber-950/30 border border-amber-500/30 rounded-lg text-amber-200 text-[11px]">
                    <strong>Agronomist Pro-Tip:</strong> {crop.keyTips}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: FERTILIZER & SOIL NUTRITION STEWARDSHIP */}
      {activeTab === 'fertilizers' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {fertilizerProtocols.map((proto, idx) => (
              <div key={idx} className="bg-[#0b1528] border border-[#1e2f4d] rounded-2xl p-5 space-y-3.5 shadow-lg">
                <div className="flex items-center space-x-2.5 border-b border-[#18263f] pb-3">
                  <div className="p-2 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-400 font-bold text-xs">
                    0{idx + 1}
                  </div>
                  <h3 className="font-extrabold text-sm text-white">{proto.title}</h3>
                </div>

                <div className="space-y-2.5 text-xs">
                  {proto.rules.map((rule, rIdx) => (
                    <div key={rIdx} className="bg-[#070e1e] p-3 rounded-xl border border-[#16233b] space-y-1">
                      <div className="font-black text-emerald-300">{rule.title}</div>
                      <p className="text-slate-400 leading-relaxed text-[11px]">{rule.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-emerald-950/50 via-[#0b1528] to-teal-950/50 border border-emerald-500/30 p-4 rounded-2xl text-xs text-slate-300 space-y-2">
            <div className="flex items-center space-x-2 text-emerald-400 font-black text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Foliar Micronutrient Correction Schedule (झिंक, बोरॉन व फेरस)</span>
            </div>
            <p className="leading-relaxed">
              For instant deficiency correction: Spray <strong>Zinc EDTA (12%) @ 1.0g/L</strong> at active vegetative stage; Spray <strong>Solubor Boron (20%) @ 1.0g/L</strong> at flower initiation to maximize pollen fertility and prevent fruit dropping.
            </p>
          </div>
        </div>
      )}

      {/* TAB 5: SAFE & EFFECTIVE PESTICIDE USAGE */}
      {activeTab === 'pesticides' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pesticideSafetyProtocols.map((proto, idx) => (
              <div key={idx} className="bg-[#0b1528] border border-[#1e2f4d] rounded-2xl p-5 space-y-3 shadow-lg">
                <div className="flex items-center space-x-2.5 border-b border-[#18263f] pb-3 text-rose-400 font-extrabold text-sm">
                  <ShieldAlert className="w-4 h-4" />
                  <h3 className="text-white">{proto.category}</h3>
                </div>

                <ul className="space-y-2 text-xs text-slate-300">
                  {proto.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2 bg-[#070e1e] p-2.5 rounded-xl border border-[#16233b]">
                      <span className="text-rose-400 font-bold shrink-0">•</span>
                      <span className="text-[11px] leading-relaxed text-slate-300">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="bg-[#070e1e] border-2 border-rose-500/40 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-rose-500/20 text-rose-400 rounded-xl font-black text-base">
                ⚠️
              </div>
              <div>
                <h4 className="font-black text-sm text-white">Important Pre-Harvest Interval (PHI) Notice</h4>
                <p className="text-slate-300 text-[11px] mt-0.5">
                  Do NOT harvest vegetables or grain until the chemical waiting period expires (Fungicides: 7-10 Days, Systemic Insecticides: 14-21 Days).
                </p>
              </div>
            </div>
            <span className="px-3 py-1 bg-rose-500/20 text-rose-300 border border-rose-500/40 rounded-xl font-bold shrink-0">
              Export Safety Standard
            </span>
          </div>
        </div>
      )}

      {/* TAB 6: ADVANCED IRRIGATION & MAINTENANCE */}
      {activeTab === 'irrigation' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {irrigationMaintenanceProtocols.map((proto, idx) => (
              <div key={idx} className="bg-[#0b1528] border border-[#1e2f4d] rounded-2xl p-5 space-y-3.5 shadow-lg">
                <div className="flex items-center space-x-2.5 border-b border-[#18263f] pb-3">
                  <div className="p-2 bg-cyan-500/20 border border-cyan-500/40 rounded-xl text-cyan-400 font-bold text-xs">
                    <Droplets className="w-4 h-4" />
                  </div>
                  <h3 className="font-extrabold text-sm text-white">{proto.title}</h3>
                </div>

                <div className="space-y-2 text-xs">
                  {proto.points.map((pt, pIdx) => (
                    <div key={pIdx} className="bg-[#070e1e] p-3 rounded-xl border border-[#16233b] flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <p className="text-slate-300 text-[11px] leading-relaxed">{pt}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-cyan-950/40 to-slate-900 border border-cyan-500/30 p-4 rounded-2xl flex items-center justify-between text-xs">
            <div className="flex items-center space-x-3">
              <Wrench className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <strong className="text-white block">Drip Emitter HCl Flushing Schedule:</strong>
                <span className="text-slate-300">Inject 1L commercial HCl per 1000L water every 45 days. Soak 24h, then open sub-main end flush valves.</span>
              </div>
            </div>
            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-xl font-bold shrink-0 hidden sm:inline">
              Prevents 99% Clogging
            </span>
          </div>
        </div>
      )}

      {/* TAB 7: DISEASE, FUNGAL & PEST FORECAST */}
      {activeTab === 'diseases' && (
        <div className="space-y-5">
          <div className="bg-[#0b1528] border border-[#1e2f4d] p-3.5 rounded-2xl flex items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search expected disease, fungus, or pest (Blight, Rust, Wilt)..."
                value={diseaseSearch}
                onChange={(e) => setDiseaseSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-[#0d182e] border border-[#203254] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>
            <span className="text-xs text-slate-400 font-bold hidden sm:inline">
              5 Common Agro-Ecosystem Threats
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {preventativeDiseaseForecast.filter(d => 
              d.diseaseName.toLowerCase().includes(diseaseSearch.toLowerCase()) ||
              d.crop.toLowerCase().includes(diseaseSearch.toLowerCase()) ||
              d.symptoms.toLowerCase().includes(diseaseSearch.toLowerCase())
            ).map((item, idx) => (
              <div key={idx} className="bg-[#0b1528] border border-[#1e2f4d] hover:border-purple-500/40 rounded-2xl p-5 space-y-3.5 shadow-lg transition-all">
                <div className="flex items-start justify-between border-b border-[#18263f] pb-3">
                  <div>
                    <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-bold rounded-md uppercase">
                      {item.crop}
                    </span>
                    <h3 className="font-black text-base text-white mt-1">{item.diseaseName}</h3>
                    <p className="text-[11px] text-slate-400">Pathogen: {item.pathogen}</p>
                  </div>
                </div>

                <div className="bg-[#070e1e] p-3 rounded-xl border border-[#16233b] space-y-1.5 text-xs">
                  <div>
                    <span className="text-amber-400 font-bold">Trigger Conditions: </span>
                    <span className="text-slate-300 text-[11px]">{item.favorableConditions}</span>
                  </div>
                  <div>
                    <span className="text-rose-400 font-bold">Visual Symptoms: </span>
                    <span className="text-slate-300 text-[11px]">{item.symptoms}</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs">
                  <span className="font-extrabold text-emerald-400 block">Preventative Protocols & IPM Control:</span>
                  {item.preventativeMeasures.map((m, mIdx) => (
                    <div key={mIdx} className="flex items-start gap-2 text-slate-300 text-[11px]">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 8: INTERACTIVE TANK DOSAGE CALCULATOR */}
      {activeTab === 'calculator' && (
        <div className="max-w-3xl mx-auto bg-[#0b1528] border border-[#1e2f4d] rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex items-center space-x-3 border-b border-[#18263f] pb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-black text-base text-white">Sprayer Tank Dilution & Dosage Calculator</h2>
              <p className="text-xs text-slate-400">
                Calculate exact chemical volume/grams for 16L Knapsack, 20L Power Sprayer, or 200L Tractor Barrels
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 font-bold mb-1.5">Select Sprayer Tank Type & Capacity</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: '16L Knapsack', value: 16 },
                  { label: '20L Power', value: 20 },
                  { label: '200L Barrel', value: 200 }
                ].map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setTankCapacityLiters(opt.value)}
                    className={'py-2 px-2 rounded-xl border text-center font-bold transition-all ' + (
                      tankCapacityLiters === opt.value
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                        : 'bg-[#070e1e] border-[#16233b] text-slate-300'
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1.5">Select Chemical Rate (or enter custom)</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Fungicide (2.0 g/L)', val: 2.0, type: 'fungicide' },
                  { label: 'Insecticide (1.5 ml/L)', val: 1.5, type: 'insecticide' },
                  { label: 'Coragen (0.35 ml/L)', val: 0.35, type: 'insecticide' },
                  { label: 'Herbicide (3.5 ml/L)', val: 3.5, type: 'micronutrient' }
                ].map(opt => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => {
                      setSelectedChemicalType(opt.type);
                      setRecommendedDosagePerLiter(opt.val);
                    }}
                    className={'py-2 px-2 rounded-xl border text-center text-[11px] font-bold transition-all ' + (
                      recommendedDosagePerLiter === opt.val
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md'
                        : 'bg-[#070e1e] border-[#16233b] text-slate-300'
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="sm:col-span-2 bg-[#070e1e] p-5 rounded-2xl border border-[#16233b] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                  Total Chemical Required for Tank
                </div>
                <div className="text-3xl font-black text-amber-400">
                  {totalChemicalRequired} {selectedChemicalType.includes('icide') ? 'ml' : 'grams / ml'}
                </div>
                <div className="text-[11px] text-slate-400">
                  Mix thoroughly with <strong>{totalWaterRequiredLiters} Litres</strong> of clean water (pH 6.0-6.5)
                </div>
              </div>

              <div className="text-center sm:text-right space-y-1">
                <div className="text-xs text-slate-400 font-bold">Recommended Area Coverage</div>
                <div className="text-base font-extrabold text-cyan-300">
                  {tankCapacityLiters === 200 ? '1.0 to 1.25 Acres' : `${(tankCapacityLiters * 60)} sq. meters (~8 pumps/acre)`}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
