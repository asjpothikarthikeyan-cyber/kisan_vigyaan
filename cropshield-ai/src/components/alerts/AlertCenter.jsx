import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Bell, 
  AlertTriangle, 
  ShieldAlert, 
  Clock, 
  MapPin, 
  ChevronRight, 
  CheckCircle2,
  Radio
} from 'lucide-react';

export const AlertCenter = ({ onNavigate }) => {
  const { lang, advisories } = useApp();

  const alerts = [
    {
      id: "alt-1",
      title: "Early Blight Spore Influx Outbreak Warning",
      titleMr: "सांगली भागात करपा रोगाचा तीव्र इशारा",
      message: "Continuous 65% humidity & recent rainfall in Sangli cluster created prime conditions for Alternaria solani spore germination. Inspect your tomato fields within 24 hours.",
      time: "10 mins ago",
      severity: "Critical",
      source: "Sangli Agri Dept & AI Vision Node",
      location: "Sangli, Miraj, Kupwad"
    },
    {
      id: "alt-2",
      title: "Pheromone & Sticky Trap Threshold Exceeded (Tomato Plot B)",
      titleMr: "टोमॅटो पिकात कीड सापळा मर्यादा ओलांडली (Miraj Belt)",
      message: "Yellow sticky trap catch in Miraj sector reached 26 aphids/card (ETL Limit: 15). Install mass pheromone trapping lures and apply Neem Oil 10,000 PPM (3 ml/L) immediately.",
      time: "45 mins ago",
      severity: "Warning",
      source: "District Pest Surveillance Unit",
      location: "Miraj Agricultural Zone - Plot B"
    },
    {
      id: "alt-3",
      title: "Government 100% Bio-Fungicide Subsidy Issued",
      titleMr: "जैविक बुरशीनाशक १००% अनुदान कूपन उपलब्ध",
      message: "Direct voucher for Trichoderma viride and Neem bio-formulations generated for all registered tomato farmers in Sangli district.",
      time: "3 hours ago",
      severity: "Info",
      source: "Taluka Krishi Adhikari",
      location: "Kupwad Krishi Seva Kendra"
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0b162b] border border-cyan-500/30 rounded-2xl p-4 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
        <div>
          <h2 className="text-base font-black text-white flex items-center gap-2">
            <Bell className="w-5 h-5 text-cyan-400" />
            Alert Center & Real-Time Emergency Broadcasts
          </h2>
          <p className="text-xs text-slate-300 font-medium mt-0.5">
            Automated threshold triggers, pest vector warnings, and agricultural department advisories
          </p>
        </div>

        <span className="px-3 py-1 bg-red-500/20 text-red-300 border border-red-500/40 rounded-xl font-bold text-xs">
          3 Active Real-Time Alerts
        </span>
      </div>

      {/* Alerts Feed */}
      <div className="space-y-3">
        {alerts.map((alt) => {
          const isCritical = alt.severity === 'Critical';
          const isWarning = alt.severity === 'Warning';

          return (
            <div
              key={alt.id}
              className={`p-4 rounded-2xl border transition-all shadow-xs space-y-2.5 ${
                isCritical
                  ? 'bg-[#180f1e] border-red-500/50'
                  : isWarning
                  ? 'bg-[#181414] border-amber-500/50'
                  : 'bg-[#0a1426] border-cyan-500/30'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                  isCritical
                    ? 'bg-red-500/20 text-red-300 border-red-500/40'
                    : isWarning
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                }`}>
                  {alt.severity} Priority
                </span>

                <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {alt.time}
                </span>
              </div>

              <h3 className="text-sm font-extrabold text-white leading-snug">
                {lang === 'mr' ? alt.titleMr : alt.title}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                {alt.message}
              </p>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-cyan-400" />
                  {alt.location} • Source: <strong className="text-slate-200">{alt.source}</strong>
                </span>

                <button
                  onClick={() => onNavigate('smartScanner')}
                  className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
                >
                  Diagnose Field →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
