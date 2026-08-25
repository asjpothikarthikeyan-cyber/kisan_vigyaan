import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  FileText, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  ChevronRight, 
  Search, 
  Filter, 
  Sparkles,
  Printer
} from 'lucide-react';

export const MyReports = () => {
  const { 
    t, 
    lang, 
    setActiveTab, 
    reports, 
    setCurrentDiagnosis, 
    diseasesDatabase, 
    setSelectedLeafImage 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);

  const filteredReports = reports.filter(r => 
    r.disease.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-full bg-slate-50 pb-20 select-none">
      {/* Top Header */}
      <div className="px-4 py-3.5 bg-[#165a3c] flex items-center justify-between shadow-md text-white">
        <button 
          onClick={() => setActiveTab('home')}
          className="p-1.5 -ml-1 text-white hover:bg-emerald-800/60 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <h1 className="text-lg font-bold tracking-tight">{t('myReports')}</h1>

        <button 
          onClick={() => setActiveTab('scan')}
          className="p-1.5 bg-emerald-700 hover:bg-emerald-600 rounded-lg text-xs font-bold transition-colors"
        >
          + New Scan
        </button>
      </div>

      <div className="px-4 py-3 space-y-3">
        {/* Search & Filter Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by crop, disease or status..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
          />
        </div>

        {/* Reports List */}
        <div className="space-y-3">
          {filteredReports.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-200 p-6">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-gray-700">No Reports Found</p>
              <p className="text-xs text-gray-400 mt-1">Scan a crop leaf to generate your first health diagnosis report.</p>
              <button
                onClick={() => setActiveTab('scan')}
                className="mt-4 px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold"
              >
                Scan Now
              </button>
            </div>
          ) : (
            filteredReports.map((report) => {
              const isVerified = report.status.includes('Verified');

              return (
                <div
                  key={report.id}
                  onClick={() => setSelectedReport(selectedReport?.id === report.id ? null : report)}
                  className={`bg-white rounded-2xl border p-4 shadow-sm transition-all cursor-pointer ${
                    selectedReport?.id === report.id ? 'ring-2 ring-emerald-500 border-emerald-500' : 'border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {/* Thumbnail */}
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-black flex-shrink-0 border border-gray-100 shadow-xs">
                      <img src={report.image} alt={report.disease} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{report.crop}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                          isVerified ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {isVerified ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : <Clock className="w-3 h-3 text-amber-600" />}
                          {report.status}
                        </span>
                      </div>

                      <h3 className="text-sm font-extrabold text-gray-900 truncate mt-0.5">{report.disease}</h3>

                      <div className="flex items-center justify-between text-[11px] text-gray-500 mt-1">
                        <span>Confidence: <strong className="text-emerald-700">{report.confidence}%</strong></span>
                        <span>Severity: <strong className="text-red-600">{report.severity}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Report Details */}
                  {selectedReport?.id === report.id && (
                    <div className="mt-4 pt-3 border-t border-gray-100 space-y-2.5 text-xs text-gray-700">
                      <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <div>
                          <span className="text-gray-400 block text-[10px]">Date Scanned</span>
                          <strong>{report.date}</strong>
                        </div>
                        <div>
                          <span className="text-gray-400 block text-[10px]">Re-Check Schedule</span>
                          <strong>{report.recheckDate || '3 days later'}</strong>
                        </div>
                      </div>

                      {/* Official Officer Remarks */}
                      <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-emerald-900 flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                            Extension Officer Verification
                          </span>
                          <span className="text-[10px] text-emerald-700 font-semibold">{report.verifiedAt || 'Pending Review'}</span>
                        </div>
                        <p className="text-xs text-emerald-950 font-medium leading-relaxed">
                          {report.officerRemarks}
                        </p>
                        <p className="text-[10px] text-gray-500 mt-1">Officer: <strong>{report.verifiedBy}</strong></p>
                      </div>

                      <div className="flex gap-2 pt-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.print();
                          }}
                          className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-bold flex items-center justify-center gap-1 text-xs"
                        >
                          <Printer className="w-3.5 h-3.5" /> Print Report
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveTab('scan');
                          }}
                          className="flex-1 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs text-center"
                        >
                          Re-Scan Leaf
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
