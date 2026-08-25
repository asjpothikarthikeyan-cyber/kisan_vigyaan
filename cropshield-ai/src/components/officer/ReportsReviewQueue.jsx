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
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ReportsReviewQueue = () => {
  const { reports, verifyFarmerReport, officerProfile } = useApp();
  const [selectedReport, setSelectedReport] = useState(reports[0] || null);
  const [remarksInput, setRemarksInput] = useState('');
  const [statusSelect, setStatusSelect] = useState('Verified by Officer');
  const [searchQuery, setSearchQuery] = useState('');

  const handleVerify = (reportId) => {
    const finalRemark = remarksInput || `Field diagnosis officially confirmed by ${officerProfile.name}. Approved IPM protocol.`;
    verifyFarmerReport(reportId, finalRemark, statusSelect);
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
    setRemarksInput('');
  };

  const filteredReports = reports.filter(r => 
    r.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.disease.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.village.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-extrabold text-gray-900">Farmer Diagnosis Submissions & Verification Queue</h2>
          <p className="text-xs text-gray-500 font-medium">Review AI diagnoses, approve subsidies, and validate field confirmations</p>
        </div>

        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search farmer or disease..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 shadow-xs"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reports List Column */}
        <div className="lg:col-span-1 space-y-3 max-h-[600px] overflow-y-auto pr-1">
          {filteredReports.map((r) => {
            const isVerified = r.status.includes('Verified');
            const isSelected = selectedReport?.id === r.id;

            return (
              <div
                key={r.id}
                onClick={() => {
                  setSelectedReport(r);
                  setRemarksInput(r.officerRemarks || '');
                }}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer shadow-xs ${
                  isSelected 
                    ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-400/50' 
                    : 'bg-white border-gray-200 hover:border-emerald-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-xs font-extrabold text-gray-900">{r.farmerName}</h4>
                    <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-emerald-600" />
                      {r.village}
                    </p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isVerified ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {isVerified ? '✓ Verified' : '⏳ Pending'}
                  </span>
                </div>

                <div className="mt-2 flex items-center justify-between text-xs pt-2 border-t border-gray-100">
                  <span className="font-bold text-emerald-900">{r.crop}</span>
                  <span className="text-red-600 font-semibold">{r.disease}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Report Review & Action Panel Column */}
        {selectedReport ? (
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-start justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Report ID: {selectedReport.id}</span>
                <h3 className="text-lg font-extrabold text-gray-900 mt-0.5">{selectedReport.farmerName} — {selectedReport.crop}</h3>
                <p className="text-xs text-gray-500 font-medium">{selectedReport.village} • Phone: {selectedReport.phone} • Field: {selectedReport.acreage}</p>
              </div>

              <span className={`px-3 py-1 text-xs font-bold rounded-xl ${
                selectedReport.status.includes('Verified') ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-amber-100 text-amber-800 border border-amber-300'
              }`}>
                {selectedReport.status}
              </span>
            </div>

            {/* Diagnostic Snapshot & Confidence Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="w-full aspect-square rounded-2xl overflow-hidden bg-black border border-gray-200 flex items-center justify-center">
                <img src={selectedReport.image} alt="Leaf diagnosis" className="w-full h-full object-cover" />
              </div>

              <div className="sm:col-span-2 space-y-2.5 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                  <span className="text-gray-500 font-bold block">AI Diagnostic Prediction</span>
                  <h4 className="text-base font-extrabold text-red-600">{selectedReport.disease}</h4>
                  <div className="flex items-center space-x-4 text-xs font-semibold text-gray-700 pt-1">
                    <span>Confidence: <strong className="text-emerald-700">{selectedReport.confidence}%</strong></span>
                    <span>Severity: <strong className="text-red-600">{selectedReport.severity}</strong></span>
                    <span>Affected: <strong>{selectedReport.affectedArea}</strong></span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-blue-50 border border-blue-100 rounded-xl">
                    <span className="text-[10px] text-blue-800 font-bold block">Sowing / Stage</span>
                    <strong>{selectedReport.stage}</strong>
                  </div>
                  <div className="p-2.5 bg-purple-50 border border-purple-100 rounded-xl">
                    <span className="text-[10px] text-purple-800 font-bold block">Re-Check Date</span>
                    <strong>{selectedReport.recheckDate || '3 days later'}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Officer Action & Validation Input */}
            <div className="p-4 bg-emerald-50/70 border border-emerald-300 rounded-2xl space-y-3 text-xs">
              <h4 className="font-extrabold text-emerald-950 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                Agricultural Officer Official Validation & Prescription
              </h4>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Status Verification State:</label>
                <select
                  value={statusSelect}
                  onChange={(e) => setStatusSelect(e.target.value)}
                  className="w-full p-2.5 bg-white border border-gray-300 rounded-xl font-semibold focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Verified by Officer">✓ Verified by Officer (Confirmed Disease)</option>
                  <option value="Physical Lab Specimen Required">🔬 Physical Lab Specimen Required (Sampling Token)</option>
                  <option value="Under Field Officer Inspection">🚜 Field Officer Inspection Scheduled</option>
                  <option value="Resolved / Post-Treatment Recovery">🎉 Resolved / Treatment Successful</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Official Agronomist Guidance & Subsidy Voucher Details:</label>
                <textarea
                  rows="3"
                  value={remarksInput}
                  onChange={(e) => setRemarksInput(e.target.value)}
                  placeholder="Enter official prescription, recommended chemical/bio dosage, or Krishi Seva Kendra subsidy instructions..."
                  className="w-full p-2.5 bg-white border border-gray-300 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => handleVerify(selectedReport.id)}
                  className="px-5 py-2.5 bg-[#165a3c] hover:bg-[#124930] text-white font-bold rounded-xl shadow-md flex items-center gap-2 transition-all active:scale-95"
                >
                  <Check className="w-4 h-4" />
                  <span>Update Verification Status</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="px-3 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl font-semibold flex items-center gap-1 text-xs"
                >
                  <Printer className="w-3.5 h-3.5" /> Print Certificate
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-2 text-center py-16 bg-white rounded-2xl border border-gray-200">
            <p className="text-sm font-bold text-gray-500">Select a report from the left list to review.</p>
          </div>
        )}
      </div>
    </div>
  );
};
