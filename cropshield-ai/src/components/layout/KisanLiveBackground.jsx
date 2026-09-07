import React from 'react';
import { useApp } from '../../context/AppContext';

export const KisanLiveBackground = () => {
  const { theme } = useApp();
  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      
      {/* 1. Ambient Sun / Chlorophyll Aura in Corner */}
      <div 
        className={`absolute -top-32 -right-32 w-96 sm:w-[500px] h-96 sm:h-[500px] rounded-full blur-3xl transition-opacity duration-1000 ${
          isDark 
            ? 'bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent' 
            : 'bg-gradient-to-br from-emerald-400/20 via-teal-300/15 to-transparent'
        }`} 
      />

      <div 
        className={`absolute -bottom-40 -left-40 w-96 sm:w-[600px] h-96 sm:h-[600px] rounded-full blur-3xl transition-opacity duration-1000 ${
          isDark 
            ? 'bg-gradient-to-tr from-emerald-900/15 via-cyan-900/10 to-transparent' 
            : 'bg-gradient-to-tr from-emerald-800/30 via-teal-900/20 to-transparent'
        }`} 
      />

      {/* 2. Agricultural Topographic Terraces & Crop Furrow Contour Lines */}
      <svg 
        className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
          isDark ? 'opacity-[0.06]' : 'opacity-[0.18]'
        }`}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
      >
        <defs>
          <linearGradient id="kisanFieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isDark ? "#10B981" : "#1B5E20"} />
            <stop offset="50%" stopColor={isDark ? "#06B6D4" : "#F59E0B"} />
            <stop offset="100%" stopColor={isDark ? "#059669" : "#16A34A"} />
          </linearGradient>
          <pattern id="cropGridPattern" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="1.2" fill={isDark ? "#34D399" : "#1B5E20"} opacity="0.4" />
          </pattern>
        </defs>

        {/* Micro Field Node Grid */}
        <rect width="100%" height="100%" fill="url(#cropGridPattern)" />

        {/* Terraced Agricultural Contour Curves */}
        <path
          d="M-100,180 C300,240 600,100 1000,160 C1300,200 1500,120 1600,150"
          fill="none"
          stroke="url(#kisanFieldGrad)"
          strokeWidth="1.5"
          strokeDasharray="6,6"
          className="animate-kisanContour"
        />
        <path
          d="M-50,380 C350,420 700,320 1100,390 C1350,440 1500,370 1600,400"
          fill="none"
          stroke="url(#kisanFieldGrad)"
          strokeWidth="1.2"
          strokeDasharray="8,8"
          className="animate-kisanContour"
          style={{ animationDelay: '2s' }}
        />
        <path
          d="M-80,620 C280,680 750,580 1150,640 C1380,680 1520,620 1600,650"
          fill="none"
          stroke="url(#kisanFieldGrad)"
          strokeWidth="1.5"
          strokeDasharray="10,10"
          className="animate-kisanContour"
          style={{ animationDelay: '4s' }}
        />
      </svg>

      {/* 3. Floating Living Sprout, Grain, and Pollen Motes (Breeze Animation) */}
      <div className="absolute inset-0">
        
        {/* Floating Sprout Node 1 (Top Left) */}
        <div className="absolute top-[18%] left-[8%] animate-kisanFloat1 opacity-60">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M12 22V14M12 14C12 9.5 15.5 6 20 6C20 10.5 16.5 14 12 14ZM12 14C12 9.5 8.5 6 4 6C4 10.5 7.5 14 12 14Z" 
              stroke={isDark ? "#34D399" : "#1B5E20"} 
              strokeWidth="1.8" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Floating Golden Grain / Wheat Particle 2 (Top Right) */}
        <div className="absolute top-[28%] right-[12%] animate-kisanFloat2 opacity-55">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="12" cy="12" rx="4" ry="8" transform="rotate(30 12 12)" fill={isDark ? "#FBBF24" : "#D97706"} opacity="0.35" />
            <path d="M12 4V20" stroke={isDark ? "#FBBF24" : "#B45309"} strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        {/* Floating Leaf Silhouette 3 (Mid Left) */}
        <div className="absolute top-[55%] left-[15%] animate-kisanFloat3 opacity-50">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M6 19C15 19 18 13 19 5C11 6 5 9 5 18C5 18.33 5.03 18.66 5.08 19M6 19L5 20" 
              stroke={isDark ? "#10B981" : "#15803d"} 
              strokeWidth="1.8" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          </svg>
        </div>

        {/* Floating Golden Seed 4 (Bottom Right) */}
        <div className="absolute bottom-[22%] right-[18%] animate-kisanFloat1 opacity-60" style={{ animationDelay: '3s' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="5" fill={isDark ? "#34D399" : "#16A34A"} opacity="0.3" />
            <circle cx="12" cy="12" r="2.5" fill={isDark ? "#FDE047" : "#D97706"} />
          </svg>
        </div>

        {/* Floating Sprout Node 5 (Bottom Center-Left) */}
        <div className="absolute bottom-[12%] left-[32%] animate-kisanFloat2 opacity-45" style={{ animationDelay: '5s' }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M12 20C12 15 15 11 19 10C19 14 16 18 12 20ZM12 20C12 15 9 11 5 10C5 14 8 18 12 20Z" 
              stroke={isDark ? "#38BDF8" : "#0D9488"} 
              strokeWidth="1.5" 
              strokeLinecap="round" 
            />
          </svg>
        </div>

      </div>

    </div>
  );
};
