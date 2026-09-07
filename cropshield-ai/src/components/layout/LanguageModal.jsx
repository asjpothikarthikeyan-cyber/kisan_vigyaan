import React from 'react';
import { useApp } from '../../context/AppContext';
import { Globe, X, Check, Sparkles } from 'lucide-react';

export const LanguageModal = () => {
  const { lang, setLang, isLanguageModalOpen, setIsLanguageModalOpen, theme } = useApp();
  const isDark = theme === 'dark';

  if (!isLanguageModalOpen) return null;

  const languages = [
    { code: 'en', label: 'English', native: 'English', region: 'National / Global' },
    { code: 'mr', label: 'Marathi', native: 'मराठी', region: 'Maharashtra' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी', region: 'North / Central India' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்', region: 'Tamil Nadu' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు', region: 'Andhra Pradesh & Telangana' },
    { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ', region: 'Karnataka' },
    { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી', region: 'Gujarat' },
    { code: 'bn', label: 'Bengali', native: 'বাংলা', region: 'West Bengal' },
    { code: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ', region: 'Punjab' },
    { code: 'ml', label: 'Malayalam', native: 'മലയാളം', region: 'Kerala' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop */}
      <div 
        onClick={() => setIsLanguageModalOpen(false)}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Card */}
      <div className={`relative w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border transition-all ${
        isDark 
          ? 'bg-[#0b1324] border-slate-800 text-white' 
          : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Header */}
        <div className="flex items-start justify-between pb-5 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/30 flex items-center justify-center shadow-xs">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                Select Portal Language
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-medium">
                Choose your preferred regional language. All screens, diagnostics, and reports will update instantly.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsLanguageModalOpen(false)}
            className="p-2 rounded-2xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 10 Language Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-6 max-h-[60vh] overflow-y-auto pr-1">
          {languages.map((item) => {
            const isSelected = lang === item.code;

            return (
              <button
                key={item.code}
                onClick={() => setLang(item.code)}
                className={`p-4 rounded-2xl text-left border-2 transition-all flex items-center justify-between cursor-pointer group ${
                  isSelected
                    ? isDark
                      ? 'border-emerald-500 bg-emerald-950/40 text-white shadow-md ring-2 ring-emerald-500/20'
                      : 'border-emerald-600 bg-emerald-50 text-slate-900 shadow-md ring-2 ring-emerald-500/20'
                    : isDark
                    ? 'border-slate-800 bg-slate-900/80 text-slate-300 hover:border-slate-700 hover:bg-slate-800'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-emerald-400 hover:bg-white shadow-2xs'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-sm text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                      {item.label}
                    </span>
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                      ({item.native})
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5 font-medium">
                    {item.region}
                  </span>
                </div>

                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border ${
                  isSelected 
                    ? 'bg-emerald-600 border-emerald-500 text-white shadow-xs' 
                    : isDark 
                    ? 'border-slate-700 bg-slate-800/60' 
                    : 'border-slate-300 bg-white'
                }`}>
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800/60 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
          <span>Active Selection: <strong className="text-emerald-700 dark:text-emerald-400 font-bold">{languages.find(l => l.code === lang)?.label} ({languages.find(l => l.code === lang)?.native})</strong></span>
          <button
            onClick={() => setIsLanguageModalOpen(false)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#1B5E20] to-[#15803d] text-white font-black hover:bg-emerald-700 transition-all cursor-pointer shadow-md"
          >
            Apply & Close
          </button>
        </div>

      </div>
    </div>
  );
};
