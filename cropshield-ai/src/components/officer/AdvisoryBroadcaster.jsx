import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Bell, 
  Send, 
  MapPin, 
  Radio, 
  AlertTriangle, 
  CheckCircle2, 
  Users, 
  ShieldCheck,
  Check,
  Sparkles,
  Volume2,
  PhoneCall
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const AdvisoryBroadcaster = () => {
  const { advisories, alerts, broadcastNewAdvisory, officerProfile, theme, lang, t } = useApp();
  const isDark = theme === 'dark';

  const activeAdvisories = (advisories && advisories.length > 0) ? advisories : (alerts || []);

  const [title, setTitle] = useState('');
  const [titleMr, setTitleMr] = useState('');
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('High');
  const [targetRadiusKm, setTargetRadiusKm] = useState(15);
  const [targetCluster, setTargetCluster] = useState('Sangli & Miraj Belt');
  const [isSent, setIsSent] = useState(false);

  const handleBroadcast = (e) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    if (broadcastNewAdvisory) {
      broadcastNewAdvisory({
        title: title.trim(),
        titleMr: (titleMr || title).trim(),
        message: message.trim(),
        severity,
        targetRadiusKm: Number(targetRadiusKm) || 15
      });
    }

    setIsSent(true);
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    setTitle('');
    setTitleMr('');
    setMessage('');
    setTimeout(() => setIsSent(false), 4000);
  };

  return (
    <div className="space-y-6 animate-fadeIn font-sans">
      
      {/* Top Header Card */}
      <div className={`p-6 rounded-3xl border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 ${
        isDark ? 'bg-[#0a1324] border-[#182a4a] text-white' : 'bg-[#F5FCF7] border-[#D2EBD7] text-slate-900'
      }`}>
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-600 to-amber-600 text-white flex items-center justify-center shadow-md shrink-0">
            <Radio className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-xl font-black tracking-tight text-slate-900 dark:text-white">
                Emergency Agro-Advisory & SMS Broadcast Station
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-300 dark:border-rose-800 font-mono">
                Direct Farmer Push
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-medium">
              Broadcast high-priority spray mandates, IMD radar weather alerts, and biocontrol guidelines to registered farmers.
            </p>
          </div>
        </div>

        <div className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300 bg-white/80 dark:bg-slate-900 px-3.5 py-2 rounded-2xl border border-[#D2EBD7] dark:border-slate-800 self-start md:self-auto">
          842 Farmers Reachable
        </div>
      </div>

      {/* Main 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT (7 cols): Compose Broadcast Form */}
        <form 
          onSubmit={handleBroadcast} 
          className={`lg:col-span-7 p-6 rounded-3xl border shadow-sm space-y-4 text-xs ${
            isDark ? 'bg-[#0a1324] border-[#182a4a]' : 'bg-[#F5FCF7] border-[#D2EBD7]'
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-200/70 dark:border-slate-800 pb-3">
            <h3 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Send className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Compose Emergency Warning Broadcast</span>
            </h3>
            <span className="text-[11px] bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 font-black px-2.5 py-0.5 rounded-full font-mono">
              SMS + App Push (Instant)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Target Cluster / Tehsil</label>
              <select
                value={targetCluster}
                onChange={(e) => setTargetCluster(e.target.value)}
                className={`w-full p-2.5 rounded-xl font-bold border focus:outline-none focus:border-emerald-500 cursor-pointer ${
                  isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-[#D2EBD7] text-slate-900'
                }`}
              >
                <option value="Sangli & Miraj Belt">Sangli & Miraj Farmland (450 Farmers)</option>
                <option value="Tasgaon Grape & Veg Zone">Tasgaon Grape & Veg Zone (280 Farmers)</option>
                <option value="Walwa & Islampur">Walwa & Islampur Sector (320 Farmers)</option>
                <option value="Palus & Shirala">Palus & Shirala (190 Farmers)</option>
                <option value="Entire Sangli District">Entire Sangli District (842 Farmers)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Alert Severity Level</label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                className={`w-full p-2.5 rounded-xl font-bold border focus:outline-none focus:border-emerald-500 cursor-pointer ${
                  isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-[#D2EBD7] text-slate-900'
                }`}
              >
                <option value="High">🔴 High Risk (Immediate Spray Mandate)</option>
                <option value="Medium">🟡 Medium Risk (Spore Scouting Alert)</option>
                <option value="Info">🟢 General Advisory / Subsidy Notice</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Advisory Title (English)</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Cotton Bacterial Blight Outbreak - Immediate Streptocycline Mandate"
              className={`w-full p-2.5 rounded-xl font-medium border focus:outline-none focus:border-emerald-500 ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-[#D2EBD7] text-slate-900'
              }`}
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Advisory Title (मराठी - Marathi)</label>
            <input
              type="text"
              value={titleMr}
              onChange={(e) => setTitleMr(e.target.value)}
              placeholder="उदा. सांगली व मिरज पट्ट्यात कापूस करपा रोगाचा तीव्र इशारा - तातडीने फवारणी करा"
              className={`w-full p-2.5 rounded-xl font-medium border focus:outline-none focus:border-emerald-500 ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-[#D2EBD7] text-slate-900'
              }`}
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Detailed Technical Advisory & Prescription</label>
            <textarea
              rows="4"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe weather factors, spore triggers, organic and chemical IPM dosages (e.g. Streptocycline 0.5g/L + Copper Oxychloride 2.5g/L), and pickup centers..."
              className={`w-full p-2.5 rounded-xl font-medium border focus:outline-none focus:border-emerald-500 ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-[#D2EBD7] text-slate-900'
              }`}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#047857] hover:bg-[#065F46] text-white font-black rounded-2xl shadow-md flex items-center justify-center space-x-2 transition-all cursor-pointer active:scale-98"
          >
            {isSent ? (
              <>
                <Check className="w-5 h-5" />
                <span>Advisory Broadcasted via SMS & Push to 842 Farmers!</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Transmit Broadcast Alert Across Region</span>
              </>
            )}
          </button>
        </form>

        {/* RIGHT (5 cols): Active Regional Advisories Feed */}
        <div className="lg:col-span-5 space-y-3.5">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
              <Bell className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Active Regional Advisories Feed</span>
            </h3>
            <span className="text-xs font-mono text-slate-500">{activeAdvisories.length} Active</span>
          </div>

          <div className="space-y-3 max-h-[580px] overflow-y-auto custom-scrollbar pr-1">
            {activeAdvisories.map((adv) => {
              const advTitle = adv.title || adv.titleEn;
              const advDesc = adv.message || adv.descEn || adv.fullAdvisoryEn;
              const advTime = adv.time || adv.date || 'Active';
              const isCrit = adv.severity === 'critical' || adv.severity === 'High' || adv.type === 'critical';

              return (
                <div 
                  key={adv.id} 
                  className={`p-4.5 rounded-3xl border shadow-xs space-y-2.5 transition-all ${
                    isDark 
                      ? 'bg-[#0a1324] border-[#182a4a]' 
                      : 'bg-[#F5FCF7] border-[#D2EBD7]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full font-mono ${
                      isCrit 
                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-300' 
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300'
                    }`}>
                      {adv.severity || 'High'} Severity
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono font-bold">{advTime}</span>
                  </div>

                  <h4 className="text-xs font-black text-slate-900 dark:text-white leading-snug">
                    {advTitle}
                  </h4>
                  {adv.titleMr && (
                    <p className="text-xs text-emerald-700 dark:text-emerald-400 font-bold italic">
                      {adv.titleMr}
                    </p>
                  )}

                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    {advDesc}
                  </p>

                  <div className="pt-2 border-t border-slate-200/70 dark:border-slate-800 text-[10px] text-slate-500 font-mono flex items-center justify-between">
                    <span>Target: <strong>{adv.locationEn || 'Sangli'}</strong></span>
                    <span>Officer: <strong>{adv.issuedBy || 'KVK Sangli'}</strong></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
