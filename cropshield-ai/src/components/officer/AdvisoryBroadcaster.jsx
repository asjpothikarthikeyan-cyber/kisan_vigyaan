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
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const AdvisoryBroadcaster = () => {
  const { advisories, broadcastNewAdvisory, officerProfile } = useApp();

  const [title, setTitle] = useState('');
  const [titleMr, setTitleMr] = useState('');
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('High');
  const [targetRadiusKm, setTargetRadiusKm] = useState(15);
  const [targetCluster, setTargetCluster] = useState('Sangli & Miraj Belt');
  const [isSent, setIsSent] = useState(false);

  const handleBroadcast = (e) => {
    e.preventDefault();
    if (!title || !message) return;

    broadcastNewAdvisory({
      title,
      titleMr: titleMr || title,
      message,
      severity,
      targetRadiusKm
    });

    setIsSent(true);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    setTitle('');
    setTitleMr('');
    setMessage('');
    setTimeout(() => setIsSent(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-extrabold text-gray-900">Regional Disease & Pest Advisory Broadcaster</h2>
        <p className="text-xs text-gray-500 font-medium">Broadcast immediate early warnings, weather alerts, and IPM guidelines to registered farmers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Broadcast Form */}
        <form onSubmit={handleBroadcast} className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-5 shadow-xs space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="font-extrabold text-sm text-gray-900 flex items-center gap-2">
              <Radio className="w-4 h-4 text-emerald-700 animate-pulse" />
              Compose Emergency Broadcast Advisory
            </h3>
            <span className="text-[11px] bg-red-100 text-red-800 font-bold px-2.5 py-0.5 rounded-full">
              SMS + App Push Trigger
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-gray-700 block mb-1">Target Cluster / Tehsil</label>
              <select
                value={targetCluster}
                onChange={(e) => setTargetCluster(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-xl font-semibold"
              >
                <option value="Sangli & Miraj Belt">Sangli & Miraj Belt (450 Farmers)</option>
                <option value="Tasgaon Grape & Veg Zone">Tasgaon Grape & Veg Zone (280 Farmers)</option>
                <option value="Walwa & Islampur">Walwa & Islampur (320 Farmers)</option>
                <option value="Palus & Shirala">Palus & Shirala (190 Farmers)</option>
                <option value="Entire Sangli District">Entire Sangli District (842 Farmers)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">Alert Severity Level</label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-xl font-semibold"
              >
                <option value="High">🔴 High Risk (Immediate Spray Mandate)</option>
                <option value="Medium">🟡 Medium Risk (Pest Scouting & Trap Check)</option>
                <option value="Info">🟢 General Advisory / Subsidy Notice</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-bold text-gray-700 block mb-1">Advisory Title (English)</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Early Blight Outbreak Alert - High Humidity Warning"
              className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="font-bold text-gray-700 block mb-1">Advisory Title (मराठी - Marathi)</label>
            <input
              type="text"
              value={titleMr}
              onChange={(e) => setTitleMr(e.target.value)}
              placeholder="उदा. सांगली व मिरज पट्ट्यात करपा रोगाचा तीव्र इशारा"
              className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="font-bold text-gray-700 block mb-1">Detailed Technical Advisory & Prescription</label>
            <textarea
              rows="4"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe weather factors, spore triggers, organic and chemical IPM dosages (e.g. Neem Oil 3ml/L or Mancozeb 2g/L), and free supplies pickup centers..."
              className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-md flex items-center justify-center space-x-2 transition-colors"
          >
            {isSent ? (
              <>
                <Check className="w-5 h-5" />
                <span>Advisory Broadcasted to 842 Farmers!</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Broadcast Emergency Warning</span>
              </>
            )}
          </button>
        </form>

        {/* History of Broadcasted Advisories */}
        <div className="space-y-3">
          <h3 className="font-extrabold text-sm text-gray-900 flex items-center gap-1.5">
            <Bell className="w-4 h-4 text-emerald-700" />
            Active Regional Advisories
          </h3>

          {advisories.map((adv) => (
            <div key={adv.id} className="p-4 bg-white border border-gray-200 rounded-2xl shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-800 border border-red-200">
                  {adv.severity} Severity
                </span>
                <span className="text-[10px] text-gray-400 font-medium">{adv.date}</span>
              </div>

              <h4 className="text-xs font-extrabold text-gray-900 leading-snug">{adv.title}</h4>
              {adv.titleMr && <p className="text-xs text-gray-600 font-medium italic">{adv.titleMr}</p>}

              <p className="text-[11px] text-gray-700 leading-relaxed font-normal">{adv.message}</p>

              <div className="pt-2 border-t border-gray-100 text-[10px] text-gray-400 font-medium">
                Issued By: <strong className="text-gray-700">{adv.issuedBy}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
