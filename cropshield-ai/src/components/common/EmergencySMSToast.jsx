import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { MessageSquare, AlertTriangle, AlertOctagon, X, PhoneCall, CheckCheck, Radio } from 'lucide-react';

export const EmergencySMSToast = () => {
  const { emergencySmsToast, setEmergencySmsToast, theme, t } = useApp();
  const isDark = theme === 'dark';

  useEffect(() => {
    if (emergencySmsToast) {
      const timer = setTimeout(() => {
        setEmergencySmsToast(null);
      }, 9000);
      return () => clearTimeout(timer);
    }
  }, [emergencySmsToast, setEmergencySmsToast]);

  if (!emergencySmsToast) return null;

  return (
    <div className="fixed top-20 right-4 sm:right-6 z-50 max-w-sm sm:max-w-md w-full animate-slideUp">
      <div className={`p-4 sm:p-5 rounded-3xl border-2 shadow-2xl backdrop-blur-md relative overflow-hidden ${
        emergencySmsToast.severity === 'CRITICAL'
          ? isDark 
            ? 'bg-gradient-to-br from-rose-950/95 via-slate-900 to-slate-950 border-rose-500 text-white shadow-rose-950/40' 
            : 'bg-rose-50/95 border-rose-500 text-slate-900 shadow-xl'
          : isDark 
            ? 'bg-gradient-to-br from-amber-950/95 via-slate-900 to-slate-950 border-amber-500 text-white shadow-amber-950/40' 
            : 'bg-amber-50/95 border-amber-500 text-slate-900 shadow-xl'
      }`}>
        
        {/* Top Carrier Header */}
        <div className="flex items-center justify-between pb-2.5 border-b border-rose-300/40 dark:border-rose-900/60 text-xs">
          <div className="flex items-center space-x-2">
            <Radio className="w-4 h-4 text-rose-600 dark:text-rose-400 animate-pulse" />
            <strong className="font-mono font-black tracking-wider text-rose-700 dark:text-rose-300 uppercase">
              {emergencySmsToast.sender || 'VK-KISAAN'} • SMS DISPATCH
            </strong>
          </div>

          <button
            onClick={() => setEmergencySmsToast(null)}
            className="p-1 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            aria-label="Close SMS toast"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message Content */}
        <div className="pt-3 space-y-2">
          <div className="flex items-start space-x-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
              emergencySmsToast.severity === 'CRITICAL' ? 'bg-rose-600 text-white' : 'bg-amber-600 text-white'
            }`}>
              {emergencySmsToast.severity === 'CRITICAL' ? <AlertOctagon className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
            </div>

            <div>
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-bold block">
                To: {emergencySmsToast.recipient} • {emergencySmsToast.timestamp || 'Just now'}
              </span>
              <p className="text-xs font-semibold leading-relaxed mt-1">
                {emergencySmsToast.message}
              </p>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800">
            <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-bold">
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Delivered via Govt Agri SMS Gateway</span>
            </span>

            <span className="font-bold">Helpline: 1800-180-1551</span>
          </div>
        </div>

      </div>
    </div>
  );
};
