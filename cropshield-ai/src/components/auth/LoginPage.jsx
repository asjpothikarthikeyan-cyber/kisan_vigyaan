import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Leaf, 
  ShieldCheck, 
  User, 
  Phone, 
  Lock, 
  MapPin, 
  Sprout, 
  Layers, 
  Check, 
  ArrowRight, 
  Globe, 
  Sparkles,
  Users
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const LoginPage = ({ onLoginSuccess }) => {
  const { 
    t, 
    lang, 
    setLang, 
    setRole, 
    setFarmerProfile,
    setOfficerProfile 
  } = useApp();

  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [selectedRole, setSelectedRole] = useState('farmer'); // 'farmer' | 'officer'
  const [phone, setPhone] = useState('+91 98224 55120');
  const [otp, setOtp] = useState('123456');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('Sangli, Maharashtra');
  const [crop, setCrop] = useState('Tomato');
  const [acreage, setAcreage] = useState('2.5 Acres');

  const handleDemoLogin = (roleType) => {
    setSelectedRole(roleType);
    setRole(roleType);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    if (onLoginSuccess) onLoginSuccess();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRole(selectedRole);

    if (authMode === 'register' && selectedRole === 'farmer') {
      setFarmerProfile(prev => ({
        ...prev,
        name: name || prev.name,
        phone: phone || prev.phone,
        location: location || prev.location,
        crop: crop || prev.crop,
        acreage: acreage || prev.acreage
      }));
    }

    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    if (onLoginSuccess) onLoginSuccess();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-[#124930] to-emerald-900 flex flex-col justify-center items-center p-4 select-none">
      {/* Top Language Bar */}
      <div className="absolute top-4 right-4 flex items-center space-x-2 bg-emerald-900/80 px-3 py-1.5 rounded-full border border-emerald-700/60 text-white text-xs">
        <Globe className="w-3.5 h-3.5 text-emerald-300" />
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="bg-transparent text-emerald-100 font-medium focus:outline-none cursor-pointer"
        >
          <option value="en" className="bg-emerald-900 text-white">English</option>
          <option value="mr" className="bg-emerald-900 text-white">मराठी (Marathi)</option>
          <option value="hi" className="bg-emerald-900 text-white">हिन्दी (Hindi)</option>
        </select>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-700/30">
        {/* Card Header */}
        <div className="p-6 bg-[#165a3c] text-white text-center relative">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mx-auto mb-3 text-emerald-300 shadow-inner">
            <Leaf className="w-9 h-9" />
          </div>
          <h1 className="text-2xl font-black tracking-tight">{t('appName')}</h1>
          <p className="text-xs text-emerald-200/90 font-medium mt-0.5">{t('tagline')}</p>
        </div>

        {/* Role Switcher Tabs */}
        <div className="p-2 bg-slate-100 border-b border-gray-200 grid grid-cols-2 gap-2 text-xs">
          <button
            onClick={() => setSelectedRole('farmer')}
            className={`py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 ${
              selectedRole === 'farmer'
                ? 'bg-white text-emerald-900 shadow-sm border border-gray-200'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span>👨‍🌾</span>
            <span>{t('roleFarmer')} Portal</span>
          </button>

          <button
            onClick={() => setSelectedRole('officer')}
            className={`py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 ${
              selectedRole === 'officer'
                ? 'bg-white text-emerald-900 shadow-sm border border-gray-200'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span>🧑‍🔬</span>
            <span>{t('roleOfficer')} Dashboard</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4 text-xs">
          {/* Quick 1-Click Demo Buttons for Fast Exploration */}
          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
            <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider block flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Quick 1-Click Demo Access
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleDemoLogin('farmer')}
                className="py-2 px-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-xs text-center transition-transform active:scale-95"
              >
                Login as Farmer (Sangli)
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('officer')}
                className="py-2 px-3 bg-emerald-900 hover:bg-emerald-950 text-white font-bold rounded-xl shadow-xs text-center transition-transform active:scale-95"
              >
                Login as Agri Officer
              </button>
            </div>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-3 text-gray-400 font-semibold text-[10px] uppercase">OR Mobile OTP Login</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {authMode === 'register' && (
              <>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Farmer Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ramesh Patil"
                    className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Crop</label>
                    <input
                      type="text"
                      value={crop}
                      onChange={(e) => setCrop(e.target.value)}
                      placeholder="Tomato"
                      className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-xl font-medium"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Acreage</label>
                    <input
                      type="text"
                      value={acreage}
                      onChange={(e) => setAcreage(e.target.value)}
                      placeholder="2.5 Acres"
                      className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-xl font-medium"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="font-bold text-gray-700 block mb-1">Mobile Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">One-Time Password (OTP)</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#165a3c] hover:bg-[#124930] text-white font-bold rounded-xl shadow-lg shadow-emerald-900/20 flex items-center justify-center space-x-2 transition-all active:scale-[0.98] mt-2"
            >
              <span>{authMode === 'login' ? 'Sign In to CropShield AI' : 'Register Farm Profile'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
              className="text-emerald-800 hover:text-emerald-950 font-bold underline text-xs"
            >
              {authMode === 'login' ? "New Farmer? Register your farm profile →" : "Already registered? Sign in here →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
