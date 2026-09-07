import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FileText, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Search, 
  Printer,
  Sparkles,
  Sprout,
  Droplets,
  Award,
  AlertTriangle,
  Send,
  PlusCircle,
  MapPin,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Download
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const MyReports = () => {
  const { 
    t, 
    lang, 
    setActiveTab, 
    reports, 
    soilHealthCards, 
    bookSoilTest,
    farmerProfile,
    theme 
  } = useApp();

  const isDark = theme === 'dark';

  // Sub-tabs: 'diseaseReports' | 'soilCards' | 'bookTest'
  const [activeReportTab, setActiveReportTab] = useState('diseaseReports');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [selectedSoilCardId, setSelectedSoilCardId] = useState(null);

  // New Soil Test Booking State
  const [plotName, setPlotName] = useState('Plot 1 - North Acre');
  const [surveyNumber, setSurveyNumber] = useState('Gat No. 142/A');
  const [soilType, setSoilType] = useState('Deep Black Vertisol (काळी माती)');
  const [cropPlanned, setCropPlanned] = useState('Cotton & Vegetables');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const filteredReports = (reports || []).filter(r => 
    (r.disease || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (r.crop || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (r.status || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSoilCards = (soilHealthCards || []).filter(s =>
    (s.plotName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (s.surveyNumber || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (s.soilType || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBookSoilTest = (e) => {
    e.preventDefault();
    bookSoilTest({
      plotName,
      surveyNumber,
      soilType,
      cropPlanned
    });
    setBookingSuccess(true);
    confetti({ particleCount: 50, spread: 70, origin: { y: 0.7 } });
    setTimeout(() => {
      setBookingSuccess(false);
      setActiveReportTab('soilCards');
    }, 2000);
  };

  return (
    <div className="space-y-6 pb-16 animate-fadeIn font-sans">
      
      {/* 1. TOP HEADER BANNER */}
      <div className={`p-6 rounded-3xl border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 ${
        isDark ? 'bg-[#091222] border-[#182a4a] text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1B5E20] to-[#15803d] text-white flex items-center justify-center shadow-md shrink-0">
            <FileText className="w-6 h-6 text-emerald-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-xl font-black tracking-tight text-slate-900 dark:text-white">
                {lang === 'ta' ? 'பயிர் சுகாதார அறிக்கைகள் & மண் பரிசோதனை அட்டைகள்' : lang === 'mr' ? 'पीक आरोग्य अहवाल व मृदा आरोग्य पत्रिका' : 'Field Health Reports & Official Soil Health Cards'}
              </h1>
              <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                ICAR / NABL
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-medium">
              {lang === 'ta' ? 'அங்கீகரிக்கப்பட்ட நோயறிதல் அறிக்கைகள், 12-அளவுரு மண் பகுப்பாய்வு & ஆய்வக பரிசோதனை' : lang === 'mr' ? 'पडताळणी झालेले रोग अहवाल, १२ पॅरामीटर्स माती परीक्षण व शासकीय खत शिफारस' : 'Verified disease diagnostic records, 12-parameter soil health cards & certified lab tests'}
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
          <span>{lang === 'ta' ? 'அறிக்கைகளை அச்சிடுக' : lang === 'mr' ? 'अहवाल प्रिंट करा' : 'Print Certificate'}</span>
        </button>
      </div>

      {/* 2. SUB-TABS NAVIGATION */}
      <div className="flex flex-wrap items-center gap-2.5 pb-1">
        {[
          { id: 'diseaseReports', label: lang === 'ta' ? `📄 பயிர் நோய் அறிக்கைகள் (${filteredReports.length})` : lang === 'mr' ? `📄 पीक रोग अहवाल (${filteredReports.length})` : `📄 Disease Scan Reports (${filteredReports.length})`, icon: FileText },
          { id: 'soilCards', label: lang === 'ta' ? `🧪 மண் வள அட்டைகள் (${filteredSoilCards.length})` : lang === 'mr' ? `🧪 मृदा आरोग्य पत्रिका (${filteredSoilCards.length})` : `🧪 Soil Health Cards (${filteredSoilCards.length})`, icon: Sprout },
          { id: 'bookTest', label: lang === 'ta' ? '📋 புதிய மண் பரிசோதனை பதிவு' : lang === 'mr' ? '📋 नवीन माती नमुना चाचणी नोंदणी' : '📋 Book Soil Lab Test', icon: PlusCircle }
        ].map(tab => {
          const isSelected = activeReportTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveReportTab(tab.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-black whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 active:scale-95 ${
                isSelected
                  ? 'bg-gradient-to-r from-[#1B5E20] to-[#15803d] text-white shadow-md shadow-emerald-950/20'
                  : isDark
                  ? 'bg-[#0a1324] border border-[#182a4a] text-slate-300 hover:text-white hover:border-emerald-500/50'
                  : 'bg-white border border-slate-200 text-slate-700 hover:text-[#1B5E20] hover:border-emerald-300 shadow-2xs'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* TAB 1: DISEASE DIAGNOSIS REPORTS                              */}
      {/* ───────────────────────────────────────────────────────────── */}
      {activeReportTab === 'diseaseReports' && (
        <div className="space-y-4">
          
          {/* Search Bar */}
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder={lang === 'ta' ? 'பயிர் அல்லது நோயைத் தேடவும்...' : lang === 'mr' ? 'पीक, रोग किंवा स्थिती शोधा...' : 'Search by crop, disease or status...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 rounded-2xl text-xs font-medium focus:outline-none focus:border-emerald-500 transition-colors ${
                isDark ? 'bg-[#0a1324] border border-[#182a4a] text-white placeholder-slate-500' : 'bg-white border border-slate-200 text-slate-900 placeholder-slate-400 shadow-2xs'
              }`}
            />
          </div>

          {filteredReports.length === 0 ? (
            <div className={`p-8 rounded-3xl border text-center space-y-3 ${
              isDark ? 'bg-[#0a1324] border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <FileText className="w-12 h-12 text-slate-400 mx-auto" />
              <h3 className="text-sm font-black text-slate-900 dark:text-white">No Reports Found</h3>
              <p className="text-xs text-slate-500">Scan a crop leaf using AI scanner to generate your first verified diagnostic report.</p>
              <button
                onClick={() => setActiveTab('scan')}
                className="px-5 py-2.5 bg-[#1B5E20] hover:bg-[#154D1A] text-white rounded-xl text-xs font-black shadow-md cursor-pointer"
              >
                Scan Leaf Now
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredReports.map((report) => {
                const isSelected = selectedReportId === report.id;
                const isVerified = (report.status || '').includes('Verified');

                return (
                  <div
                    key={report.id}
                    onClick={() => setSelectedReportId(isSelected ? null : report.id)}
                    className={`p-5 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 hover:shadow-md ${
                      isSelected
                        ? 'border-emerald-500 ring-2 ring-emerald-500/20'
                        : isDark
                        ? 'bg-[#0a1324] border-[#182a4a] hover:border-emerald-500/50 text-white'
                        : 'bg-white border-slate-200 hover:border-emerald-300 text-slate-900 shadow-xs'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3.5">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-950 flex-shrink-0 border border-slate-200 dark:border-slate-800 shadow-2xs">
                          <img src={report.image} alt={report.disease} className="w-full h-full object-cover" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{report.crop}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                              isVerified 
                                ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800' 
                                : 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                            }`}>
                              {isVerified ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : <Clock className="w-3 h-3 text-amber-600" />}
                              {report.status}
                            </span>
                          </div>

                          <h3 className="text-base font-black text-slate-900 dark:text-white truncate mt-1">
                            {report.disease}
                          </h3>

                          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
                            <span>Confidence: <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{report.confidence}%</strong></span>
                            <span>Severity: <strong className="text-rose-600 font-bold">{report.severity}</strong></span>
                          </div>
                        </div>
                      </div>

                      {/* Expanded Report Details */}
                      {isSelected && (
                        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3 text-xs animate-fadeIn">
                          <div className="grid grid-cols-2 gap-2 bg-slate-50 dark:bg-slate-900/60 p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
                            <div>
                              <span className="text-slate-500 text-[10px] block font-bold">Date Scanned</span>
                              <strong className="text-slate-900 dark:text-white font-sans">{report.date}</strong>
                            </div>
                            <div>
                              <span className="text-slate-500 text-[10px] block font-bold">Re-Check Schedule</span>
                              <strong className="text-emerald-700 dark:text-emerald-400 font-sans">{report.recheckDate || 'In 3 Days'}</strong>
                            </div>
                          </div>

                          {/* Extension Officer Remarks */}
                          <div className="p-3.5 bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 rounded-2xl space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-black text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                <span>Extension Officer Official Stamp</span>
                              </span>
                              <span className="text-[10px] text-emerald-700 font-bold">{report.verifiedAt || 'Verified Online'}</span>
                            </div>
                            <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                              {report.officerRemarks}
                            </p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400">
                              Officer: <strong>{report.verifiedBy}</strong>
                            </p>
                          </div>

                          <div className="flex gap-2 pt-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                window.print();
                              }}
                              className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl font-bold flex items-center justify-center gap-1.5 text-xs transition-colors cursor-pointer"
                            >
                              <Printer className="w-3.5 h-3.5" /> Print PDF Report
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveTab('scan');
                              }}
                              className="flex-1 py-2.5 bg-[#1B5E20] hover:bg-[#154D1A] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <Sprout className="w-3.5 h-3.5" /> Re-Scan Leaf
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* TAB 2: OFFICIAL 12-PARAMETER SOIL HEALTH CARDS                */}
      {/* ───────────────────────────────────────────────────────────── */}
      {activeReportTab === 'soilCards' && (
        <div className="space-y-6">
          {filteredSoilCards.map((card) => (
            <div
              key={card.id}
              className={`p-6 rounded-3xl border shadow-sm space-y-5 ${
                isDark ? 'bg-[#0a1324] border-[#182a4a] text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              {/* Header Card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 font-black text-xl flex items-center justify-center border border-amber-300 dark:border-amber-800">
                    🌱
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-500 font-sans tracking-wider">
                      {card.surveyNumber} • {card.soilType}
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                      {card.plotName} - Soil Health Card Certificate
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Tested by: <strong>{card.labName}</strong> ({card.labCertification})
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="px-3 py-1 rounded-xl text-xs font-black bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                    Health Score: {card.healthScore}/100
                  </span>
                  <button
                    onClick={() => window.print()}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 12 Parameters Grid Table */}
              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase text-slate-700 dark:text-slate-300 tracking-wider">
                  Official 12-Parameter Laboratory Analysis:
                </h4>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {card.parameters.map((p, idx) => {
                    const isOptimal = p.rating === 'Optimal' || p.rating === 'Good';
                    const isDeficient = p.rating === 'Critical' || p.rating === 'Low';

                    return (
                      <div
                        key={idx}
                        className={`p-3 rounded-2xl border text-xs space-y-1 ${
                          isDeficient
                            ? 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/60'
                            : isOptimal
                            ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/60'
                            : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-slate-500 font-bold uppercase">{p.symbol}</span>
                          <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-md ${
                            isDeficient ? 'bg-rose-600 text-white' : 'bg-emerald-600 text-white'
                          }`}>
                            {p.status}
                          </span>
                        </div>

                        <strong className="text-sm font-black text-slate-900 dark:text-white block">
                          {p.value} <span className="text-[10px] font-normal text-slate-500">{p.unit}</span>
                        </strong>

                        <span className="text-[10px] text-slate-600 dark:text-slate-400 block leading-tight">
                          {p.name} (Normal: {p.normalRange})
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Fertilizer Prescription from Agronomist */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                <strong className="font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Customized Scientific Fertilizer Dose for Maximum Yield:</span>
                </strong>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {card.fertilizerPrescription.map((f, fIdx) => (
                    <div key={fIdx} className="p-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                      <div>
                        <strong className="text-slate-900 dark:text-white block">{f.fertilizer}</strong>
                        <span className="text-[10px] text-slate-500">{f.time}</span>
                      </div>
                      <span className="font-bold text-emerald-700 dark:text-emerald-400 font-sans">{f.dose}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* TAB 3: BOOK CERTIFIED SOIL LAB TEST                           */}
      {/* ───────────────────────────────────────────────────────────── */}
      {activeReportTab === 'bookTest' && (
        <div className={`p-6 sm:p-8 rounded-3xl border max-w-2xl mx-auto space-y-6 shadow-sm ${
          isDark ? 'bg-[#0a1324] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}>
          <div className="flex items-center space-x-3.5 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <PlusCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-base sm:text-lg">
                {lang === 'ta' ? 'அங்கீகரிக்கப்பட்ட மண் பரிசோதனை முன்பதிவு' : lang === 'mr' ? 'शासकीय माती नमुना चाचणी नोंदणी' : 'Book Certified Soil Laboratory Test'}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {lang === 'ta' ? 'KVK ஆய்வக பிரதிநிதி உங்கள் நிலத்திற்கு வந்து மாதிரி எடுப்பார்' : 'KVK Sangli lab technician will visit your field GPS coordinates to collect soil core samples.'}
              </p>
            </div>
          </div>

          {bookingSuccess ? (
            <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="text-base font-black text-emerald-950 dark:text-emerald-200">Soil Test Sample Pickup Booked Successfully!</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Technician assigned from District Soil Testing Lab. Free sample collection within 48 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleBookSoilTest} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1.5">
                  Farm Plot Name / Location:
                </label>
                <input
                  type="text"
                  required
                  value={plotName}
                  onChange={(e) => setPlotName(e.target.value)}
                  className={`w-full p-3 rounded-xl border font-bold focus:outline-none focus:border-emerald-500 ${
                    isDark ? 'bg-[#0f1d38] border-[#203254] text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1.5">
                    Land Survey / Gat Number:
                  </label>
                  <input
                    type="text"
                    required
                    value={surveyNumber}
                    onChange={(e) => setSurveyNumber(e.target.value)}
                    className={`w-full p-3 rounded-xl border font-bold focus:outline-none focus:border-emerald-500 ${
                      isDark ? 'bg-[#0f1d38] border-[#203254] text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1.5">
                    Soil Texture / Type:
                  </label>
                  <select
                    value={soilType}
                    onChange={(e) => setSoilType(e.target.value)}
                    className={`w-full p-3 rounded-xl border font-bold focus:outline-none focus:border-emerald-500 ${
                      isDark ? 'bg-[#0f1d38] border-[#203254] text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    <option value="Deep Black Vertisol (काळी माती)">Deep Black Vertisol (काळी माती)</option>
                    <option value="Medium Sandy Loam (तांबडी / मुरमाड)">Medium Sandy Loam (तांबडी / मुरमाड)</option>
                    <option value="Clayey Alkaline Soil (चोपण जमीन)">Clayey Alkaline Soil (चोपण जमीन)</option>
                    <option value="Alluvial Riverbed Soil">Alluvial Riverbed Soil</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1.5">
                  Crops Planned for Upcoming Season:
                </label>
                <input
                  type="text"
                  value={cropPlanned}
                  onChange={(e) => setCropPlanned(e.target.value)}
                  className={`w-full p-3 rounded-xl border font-bold focus:outline-none focus:border-emerald-500 ${
                    isDark ? 'bg-[#0f1d38] border-[#203254] text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 rounded-2xl text-emerald-900 dark:text-emerald-300 text-xs">
                <strong>100% Free Service:</strong> Subsidized under the National Soil Health Card Scheme (Government of India). Sample collection and digital certificate generation are completely free.
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#1B5E20] hover:bg-[#154D1A] text-white font-black text-xs rounded-xl shadow-md transition-all cursor-pointer"
              >
                Schedule Free Soil Sample Pickup
              </button>
            </form>
          )}
        </div>
      )}

    </div>
  );
};
