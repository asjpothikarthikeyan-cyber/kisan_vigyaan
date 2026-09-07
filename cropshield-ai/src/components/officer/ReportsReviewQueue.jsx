import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FileSpreadsheet, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter, 
  ShieldCheck, 
  MapPin, 
  Check, 
  X, 
  AlertTriangle, 
  Printer, 
  Send,
  Sparkles,
  Phone,
  Layers,
  ArrowRight,
  RefreshCw,
  Cpu,
  AlertOctagon
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ReportsReviewQueue = () => {
  const { 
    fieldReviewQueue, 
    approveScan, 
    rejectOrCorrectScan, 
    modelAccuracy,
    theme,
    lang,
    t
  } = useApp();

  const isDark = theme === 'dark';
  const [selectedScan, setSelectedScan] = useState(fieldReviewQueue[0] || null);
  const [remarksInput, setRemarksInput] = useState('');
  const [correctedPathogen, setCorrectedPathogen] = useState('');
  const [customChemical, setCustomChemical] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCorrecting, setIsCorrecting] = useState(false);
  const [actionSuccessToast, setActionSuccessToast] = useState(null);

  const activeScan = selectedScan ? (fieldReviewQueue.find(s => s.id === selectedScan.id) || selectedScan) : fieldReviewQueue[0];

  const handleApprove = (scanId) => {
    approveScan(scanId, remarksInput || "Diagnosis officially verified and certified by District Extension Officer.");
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    setActionSuccessToast("Diagnosis Approved & Certified! Farmer notified via In-App Alert + Emergency SMS.");
    setTimeout(() => setActionSuccessToast(null), 3500);
    setRemarksInput('');
  };

  const handleRejectOrCorrect = (scanId) => {
    const pathogenToSet = correctedPathogen || "Alternaria Leaf Spot (Secondary Inoculum)";
    const chemToSet = customChemical || "Mancozeb 75% WP + Bio-Neem Spray";
    rejectOrCorrectScan(scanId, pathogenToSet, chemToSet, remarksInput || "Prescription updated based on optical symptom validation.");
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
    setActionSuccessToast("Prescription Corrected & Ground-Truth Fed to Model! Farmer notified.");
    setTimeout(() => setActionSuccessToast(null), 3500);
    setIsCorrecting(false);
    setRemarksInput('');
  };

  const filteredQueue = fieldReviewQueue.filter(s => 
    s.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.plotName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.aiPredictedPathogen.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Toast Notification */}
      {actionSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-600 text-white font-black text-xs shadow-2xl flex items-center gap-2 animate-slideUp">
          <CheckCircle2 className="w-5 h-5" />
          <span>{actionSuccessToast}</span>
        </div>
      )}

      {/* Header Banner & Model Feedback Telemetry */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {t('reviewQueue', 'Field Confirmations Review Queue')}
            </h2>
            <span className="px-2.5 py-0.5 text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300 rounded-full border border-emerald-300 dark:border-emerald-500/30 font-mono">
              Live Field Stream
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-0.5">
            Review farmer crop scans, validate diagnoses, issue certified prescriptions, and reinforce model learning
          </p>
        </div>

        {/* Live Neural Accuracy Feedback Loop Widget */}
        <div className={`p-3.5 rounded-2xl border shadow-sm flex items-center space-x-3.5 shrink-0 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-400 flex items-center justify-center">
            <Cpu className="w-5 h-5" />
          </div>
          <div className="text-left">
            <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 font-bold block">
              Continuous Learning Feedback Loop
            </span>
            <div className="flex items-baseline gap-2">
              <strong className="text-sm font-black text-emerald-700 dark:text-emerald-400 font-mono">
                Model F1: {modelAccuracy}%
              </strong>
              <span className="text-[10px] text-emerald-600 font-bold">▲ +0.2% active loop</span>
            </div>
          </div>
        </div>
      </div>

      {/* Two-Column Review Space */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Submissions Queue List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search farmer, crop, plot or disease..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-3 py-2.5 rounded-2xl text-xs font-medium focus:outline-none focus:border-emerald-500 transition-colors ${
                isDark ? 'bg-slate-900 border border-slate-800 text-white' : 'bg-white border border-slate-200 text-slate-900 shadow-2xs'
              }`}
            />
          </div>

          <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
            {filteredQueue.map(scan => {
              const isSelected = activeScan?.id === scan.id;
              const isPending = scan.status === 'pending';
              const isApproved = scan.status === 'approved';

              return (
                <div
                  key={scan.id}
                  onClick={() => {
                    setSelectedScan(scan);
                    setIsCorrecting(false);
                    setRemarksInput(scan.officerNotes || '');
                  }}
                  className={`p-4 rounded-3xl border transition-all cursor-pointer space-y-2.5 group hover:border-emerald-400 ${
                    isSelected
                      ? 'border-2 border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 shadow-md ring-2 ring-emerald-500/20'
                      : isDark
                      ? 'bg-[#0a1120] border-slate-800'
                      : 'bg-white border-slate-200 shadow-2xs'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-xs font-black text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                        {scan.farmerName}
                      </h4>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">
                        {scan.plotName}
                      </span>
                    </div>

                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase font-mono ${
                      isPending 
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300'
                        : isApproved
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border border-blue-300'
                    }`}>
                      {scan.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span className="font-bold text-slate-700 dark:text-slate-300">{scan.crop}</span>
                    <span className="font-mono text-emerald-700 dark:text-emerald-400 font-bold">{scan.aiConfidence}% Conf</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Diagnostic Inspector & Action Panel (7 cols) */}
        {activeScan && (
          <div className={`lg:col-span-7 p-6 rounded-3xl border shadow-lg space-y-5 ${
            isDark ? 'bg-[#0a1120] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            
            {/* Header */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 font-bold block">
                  Report ID: #{activeScan.id} • {activeScan.submittedTime}
                </span>
                <h3 className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
                  {activeScan.plotName}
                </h3>
                <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                  Submitted by {activeScan.farmerName} ({activeScan.farmerPhone})
                </span>
              </div>

              <span className={`px-3 py-1 rounded-xl text-xs font-black uppercase font-mono ${
                activeScan.severity === 'critical' 
                  ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-300'
                  : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300'
              }`}>
                {activeScan.severity}
              </span>
            </div>

            {/* Photo Preview + Detected Pathology */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden h-48 border border-slate-300 dark:border-slate-700 bg-black relative shadow-inner">
                <img 
                  src={activeScan.image} 
                  alt={activeScan.crop} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/75 text-[10px] text-white font-mono font-bold">
                  Verified Foliage Photo
                </div>
              </div>

              <div className={`p-4 rounded-2xl border space-y-2.5 ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-500 font-bold">Predicted Pathogen:</span>
                  <h4 className="font-black text-sm text-slate-900 dark:text-white">{activeScan.aiPredictedPathogen}</h4>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-500 font-bold">Recommended Chemical:</span>
                  <p className="text-xs font-black text-emerald-700 dark:text-emerald-400">{activeScan.recommendedChemical}</p>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-500 font-bold">Confidence Score:</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex-1 h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${activeScan.aiConfidence}%` }} />
                    </div>
                    <span className="text-xs font-mono font-bold">{activeScan.aiConfidence}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Officer Notes & Prescription Editor */}
            <div className="space-y-3">
              <label className="block text-xs font-black text-slate-700 dark:text-slate-300">
                {t('officerComment', 'Agronomic Advisory & Certified Prescription')}
              </label>

              <textarea
                rows={2}
                value={remarksInput}
                onChange={(e) => setRemarksInput(e.target.value)}
                placeholder="Enter expert agronomic notes, pump dosage instructions, or spraying schedule..."
                className={`w-full p-3 rounded-2xl text-xs font-medium focus:outline-none focus:border-emerald-500 border ${
                  isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'
                }`}
              />

              {isCorrecting && (
                <div className={`p-4 rounded-2xl border space-y-3 animate-fadeIn ${
                  isDark ? 'bg-slate-900/90 border-amber-500/50' : 'bg-amber-50 border-amber-300'
                }`}>
                  <span className="text-xs font-black text-amber-800 dark:text-amber-300 flex items-center gap-1.5 font-mono">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Override Pathology & Chemical Prescription:</span>
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">True Pathogen Disease</label>
                      <input
                        type="text"
                        placeholder="e.g. Alternaria Leaf Spot"
                        value={correctedPathogen}
                        onChange={(e) => setCorrectedPathogen(e.target.value)}
                        className={`w-full p-2.5 rounded-xl border font-bold ${
                          isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Prescription Chemical</label>
                      <input
                        type="text"
                        placeholder="e.g. Mancozeb 75% WP (2.0g/L)"
                        value={customChemical}
                        onChange={(e) => setCustomChemical(e.target.value)}
                        className={`w-full p-2.5 rounded-xl border font-bold ${
                          isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => handleApprove(activeScan.id)}
                className="py-3.5 rounded-2xl bg-gradient-to-r from-[#1B5E20] to-[#15803d] hover:from-[#154D1A] hover:to-[#1B5E20] text-white font-black text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>{t('approve', 'Approve Diagnosis & Send SMS')}</span>
              </button>

              {isCorrecting ? (
                <button
                  onClick={() => handleRejectOrCorrect(activeScan.id)}
                  className="py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-black text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Ground-Truth Correction</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsCorrecting(true)}
                  className={`py-3.5 rounded-2xl font-black text-xs sm:text-sm border flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 ${
                    isDark ? 'bg-slate-800 hover:bg-slate-700 text-amber-300 border-slate-700' : 'bg-slate-100 hover:bg-slate-200 text-amber-800 border-slate-300'
                  }`}
                >
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span>{t('rejectDiagnosis', 'Correct / Override Diagnosis')}</span>
                </button>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
