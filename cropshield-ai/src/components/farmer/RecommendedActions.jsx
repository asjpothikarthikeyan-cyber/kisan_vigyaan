import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  Calendar, 
  CheckCircle2, 
  Droplet, 
  FlaskConical, 
  Calculator, 
  Share2, 
  Users, 
  BookmarkCheck, 
  Sparkles,
  Check,
  ShieldCheck,
  Clock,
  Printer
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const RecommendedActions = () => {
  const { 
    t, 
    lang, 
    setActiveTab, 
    currentDiagnosis, 
    saveScanReport, 
    addCommunityPost,
    farmerProfile 
  } = useApp();

  const d = currentDiagnosis;
  const [pumpLiters, setPumpLiters] = useState(15); // Standard 15L backpack sprayer pump
  const [isSaved, setIsSaved] = useState(false);
  const [isPosted, setIsPosted] = useState(false);
  const [customNotes, setCustomNotes] = useState("");
  const [reminderSet, setReminderSet] = useState(false);

  // Localized action lists
  const immediateActionsList = lang === 'mr' ? d.immediateActionsMr : lang === 'hi' ? d.immediateActionsHi : d.immediateActions;

  // Calculate chemical / organic dosages
  const neemDose = pumpLiters * 3; // 3 ml per liter
  const mancozebDose = pumpLiters * 2; // 2 g per liter

  const handleSaveReport = () => {
    saveScanReport(d, customNotes);
    setIsSaved(true);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
  };

  const handlePostToCommunity = () => {
    addCommunityPost({
      title: `${d.name} diagnosed on ${farmerProfile.crop} (${farmerProfile.variety})`,
      content: `AI detected ${d.name} (${d.confidence}% confidence, ${d.severity} severity) in my ${farmerProfile.acreage} field in ${farmerProfile.location}. Asking for local officer review and treatment verification.`,
      trapCount: "Pheromone Trap: 4 moths | Yellow Sticky: 12 insects"
    });
    setIsPosted(true);
  };

  const handleSetReminder = () => {
    setReminderSet(true);
  };

  return (
    <div className="flex flex-col min-h-full bg-white pb-20">
      {/* Top Header matching mockup */}
      <div className="px-4 py-3.5 bg-[#165a3c] flex items-center justify-between shadow-md">
        <button 
          onClick={() => setActiveTab('diagnosis')}
          className="p-1.5 -ml-1 text-white hover:bg-emerald-800/60 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <h1 className="text-lg font-bold tracking-tight text-white">{t('recActions')}</h1>

        <button 
          onClick={() => window.print()}
          className="p-2 text-white hover:bg-emerald-800/60 rounded-full transition-colors"
          title="Print / Save PDF"
        >
          <Printer className="w-5 h-5" />
        </button>
      </div>

      <div className="px-5 py-4 space-y-4">
        {/* Immediate Actions Card (Soft Green Container matching mockup) */}
        <div className="bg-[#eaf5ee] border border-emerald-200/90 rounded-2xl p-4 shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-emerald-950 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            {t('immediateActions')}
          </h3>

          <ul className="space-y-2.5 text-xs text-emerald-950/90 font-medium">
            {immediateActionsList.map((action, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="text-emerald-700 font-bold text-base leading-none">•</span>
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recommended Treatment (IPM) Card (Soft Yellow/Orange Container matching mockup) */}
        <div className="bg-[#fffbeb] border border-amber-200/90 rounded-2xl p-4 shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-amber-950 flex items-center gap-1.5">
            <FlaskConical className="w-4 h-4 text-amber-700" />
            {t('recTreatmentIPM')}
          </h3>

          <div className="space-y-2.5 text-xs text-amber-950 font-medium leading-relaxed">
            <div className="p-2.5 bg-white/80 rounded-xl border border-amber-200/70">
              <span className="font-bold text-emerald-800 block text-xs">🌱 Organic Option:</span>
              <p className="mt-0.5 font-semibold text-gray-900">Neem oil spray (3 ml/L of water)</p>
              <p className="text-[11px] text-gray-500 mt-0.5">Apply at dawn/dusk to prevent sun-burn.</p>
            </div>

            <div className="text-center font-bold text-xs text-amber-800 tracking-wider">
              — OR —
            </div>

            <div className="p-2.5 bg-white/80 rounded-xl border border-amber-200/70">
              <span className="font-bold text-sky-800 block text-xs">🧪 Protective Chemical Option:</span>
              <p className="mt-0.5 font-semibold text-gray-900">Mancozeb 75% WP @ 2 g/L of water</p>
              <p className="text-[11px] text-gray-500 mt-0.5">Contact protective fungicide with zinc & manganese.</p>
            </div>
          </div>

          {/* Interactive Sprayer Dosage Calculator */}
          <div className="pt-2 border-t border-amber-200/80">
            <div className="flex items-center justify-between text-xs font-bold text-amber-950 mb-2">
              <span className="flex items-center gap-1">
                <Calculator className="w-3.5 h-3.5 text-amber-700" />
                {t('dosageCalculator')}
              </span>
              <span className="text-amber-800 font-semibold">{pumpLiters} Liters Tank</span>
            </div>

            {/* Sprayer Size Quick Chips */}
            <div className="grid grid-cols-4 gap-1.5 mb-3">
              {[5, 15, 20, 200].map(liters => (
                <button
                  key={liters}
                  onClick={() => setPumpLiters(liters)}
                  className={`py-1 rounded-lg text-xs font-bold transition-all ${
                    pumpLiters === liters
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-white text-gray-700 border border-amber-200 hover:bg-amber-100/50'
                  }`}
                >
                  {liters}L {liters === 15 ? '(Standard)' : liters === 200 ? '(Drum)' : ''}
                </button>
              ))}
            </div>

            {/* Calculated Mix Amounts */}
            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className="p-2 bg-emerald-100/80 rounded-xl border border-emerald-300">
                <span className="text-[10px] text-emerald-800 font-bold block">Neem Oil (3ml/L)</span>
                <strong className="text-base text-emerald-900 font-extrabold">{neemDose} ml</strong>
              </div>
              <div className="p-2 bg-amber-100/80 rounded-xl border border-amber-300">
                <span className="text-[10px] text-amber-800 font-bold block">Mancozeb (2g/L)</span>
                <strong className="text-base text-amber-900 font-extrabold">{mancozebDose} g</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Re-check Card (Soft Blue Container matching mockup) */}
        <div className="bg-[#eff6ff] border border-blue-200/90 rounded-2xl p-4 shadow-sm flex items-center justify-between">
          <div className="space-y-1 max-w-[75%]">
            <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wide flex items-center gap-1">
              <Calendar className="w-4 h-4 text-blue-600" />
              {t('recheck')}
            </h4>
            <p className="text-xs text-blue-950 font-medium">
              Scan again after {d.recheckDays || 3} days to monitor progress.
            </p>
          </div>

          <button
            onClick={handleSetReminder}
            className={`p-2.5 rounded-xl border transition-all ${
              reminderSet
                ? 'bg-blue-600 text-white border-blue-700 shadow-sm'
                : 'bg-white text-blue-600 border-blue-200 hover:bg-blue-100'
            }`}
            title="Add reminder to farm calendar"
          >
            {reminderSet ? <Check className="w-5 h-5" /> : <Calendar className="w-5 h-5" />}
          </button>
        </div>

        {/* Extension Officer Validation Notice */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 flex items-start space-x-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
          <p className="leading-snug">{t('officerReviewNote')}</p>
        </div>

        {/* Big Action Buttons */}
        <div className="space-y-2.5 pt-2">
          {/* Primary Save Report Button */}
          <button
            onClick={handleSaveReport}
            disabled={isSaved}
            className={`w-full py-4 px-6 text-white font-bold text-base rounded-2xl shadow-lg flex items-center justify-center space-x-2 transition-all active:scale-[0.98] ${
              isSaved
                ? 'bg-emerald-700 cursor-default'
                : 'bg-[#165a3c] hover:bg-[#124930] shadow-emerald-900/20'
            }`}
          >
            {isSaved ? (
              <>
                <Check className="w-5 h-5" />
                <span>Report Saved Successfully!</span>
              </>
            ) : (
              <>
                <BookmarkCheck className="w-5 h-5 text-emerald-300" />
                <span>{t('saveReport')}</span>
              </>
            )}
          </button>

          {/* Secondary Action: Post to Community for Officer Review */}
          <button
            onClick={handlePostToCommunity}
            disabled={isPosted}
            className={`w-full py-3.5 px-4 rounded-2xl border font-bold text-xs flex items-center justify-center space-x-2 transition-all ${
              isPosted
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-white text-emerald-800 border-emerald-600/40 hover:bg-emerald-50'
            }`}
          >
            <Users className="w-4 h-4 text-emerald-700" />
            <span>{isPosted ? '✓ Posted to Community for Officer Review' : t('postToCommunity')}</span>
          </button>

          {/* Secondary Action: View My Reports */}
          <button
            onClick={() => setActiveTab('reports')}
            className="w-full py-2.5 text-center text-xs text-gray-500 hover:text-emerald-700 font-semibold transition-colors"
          >
            Go to My Reports History →
          </button>
        </div>
      </div>
    </div>
  );
};
