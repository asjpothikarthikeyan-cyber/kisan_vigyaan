import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { speakText } from '../../utils/speechUtils';
import { analyzeLeafWithGroq } from '../../services/visionService';
import { 
  Camera, 
  Volume2, 
  ShoppingBag, 
  CheckCircle2, 
  AlertOctagon, 
  RotateCcw,
  Sparkles,
  RefreshCw
} from 'lucide-react';

export const FarmerCameraScanner = ({ onNavigate }) => {
  const { lang, addToCart } = useApp();
  
  const [analyzing, setAnalyzing] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [cameraError, setCameraError] = useState(false);
  const videoRef = useRef(null);

  // Start Camera
  useEffect(() => {
    let stream = null;
    if (!scanResult) {
      navigator.mediaDevices?.getUserMedia({ video: { facingMode: 'environment' } })
        .then((s) => {
          stream = s;
          if (videoRef.current) videoRef.current.srcObject = s;
          setCameraError(false);
        })
        .catch((err) => {
          console.warn("Camera unavailable:", err);
          setCameraError(true);
        });
    }
    return () => {
      if (stream) stream.getTracks().forEach(t => t.stop());
    };
  }, [scanResult]);

  const handleCaptureAndScan = async () => {
    if (!videoRef.current) return;
    setAnalyzing(true);
    setScanResult(null);

    // Capture frame
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 400;
    canvas.height = videoRef.current.videoHeight || 400;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const base64Image = canvas.toDataURL('image/jpeg');

    // Call Groq API
    const aiResponse = await analyzeLeafWithGroq(base64Image, lang);
    
    setAnalyzing(false);
    
    if (aiResponse) {
      // Map API response to our component state
      const resultObj = {
        crop: aiResponse.crop || "Unknown Crop",
        verdictEn: aiResponse.verdict,
        verdictMr: aiResponse.verdict, // Fallback, could be translated by AI
        plainAdviceEn: aiResponse.plainAdviceEn,
        plainAdviceMr: aiResponse.plainAdviceMr || aiResponse.plainAdviceEn,
        medicineName: aiResponse.medicineName !== "null" ? aiResponse.medicineName : null,
        price: aiResponse.price || 0,
        confidence: aiResponse.confidence || 90.0,
        severity: aiResponse.medicineName !== "null" ? 'Needs Attention' : 'Healthy'
      };
      setScanResult(resultObj);
      
      const spokenMsg = lang === 'mr' ? resultObj.plainAdviceMr : resultObj.plainAdviceEn;
      speakText(spokenMsg, lang);
    } else {
      // Fallback if API fails
      alert("AI analysis failed. Please check your internet connection or API key.");
    }
  };

  const handleBuyMedicine = () => {
    if (scanResult && scanResult.medicineName) {
      addToCart({
        id: `med-${Date.now()}`,
        name: scanResult.medicineName,
        price: scanResult.price,
        quantity: 1,
        unit: 'Pack',
        category: 'Protection'
      });
      onNavigate('market');
    }
  };

  return (
    <div className="min-h-[88vh] pb-24 max-w-lg mx-auto px-4 pt-4 font-sans">
      {!scanResult ? (
        <div className="space-y-4">
          <div className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-[4/5] flex flex-col items-center justify-between shadow-sm border border-gray-200">
            {/* Minimalist Top Bar */}
            <div className="w-full flex items-center justify-between text-gray-700 text-xs z-10 bg-white/80 backdrop-blur-md px-4 py-3 border-b border-gray-200/50">
              <span className="flex items-center gap-1.5 font-semibold">
                <Sparkles className="w-4 h-4 text-blue-500" />
                <span>{lang === 'mr' ? 'स्कॅनर' : 'Live Scanner'}</span>
              </span>
              <span className="font-medium text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">Groq Vision AI</span>
            </div>

            {/* Live Camera Feed */}
            {!cameraError ? (
               <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover z-0" />
            ) : (
               <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm z-0">
                 Camera not available. Please allow camera permissions.
               </div>
            )}

            {/* Viewfinder Target */}
            <div className="relative w-56 h-56 border-2 border-dashed border-white/60 rounded-2xl flex flex-col items-center justify-center p-3 text-center z-10 bg-black/10 backdrop-blur-[1px]">
              {analyzing && (
                <div className="flex flex-col items-center space-y-3 bg-black/50 p-4 rounded-xl backdrop-blur-md">
                  <RefreshCw className="w-8 h-8 text-white animate-spin" />
                  <span className="text-white font-semibold text-xs tracking-wide">
                    {lang === 'mr' ? 'विश्लेषण...' : 'Analyzing...'}
                  </span>
                </div>
              )}
            </div>

            {/* Minimalist Shutter Button */}
            <div className="w-full flex items-center justify-center z-10 pb-6 pt-12 bg-gradient-to-t from-black/40 to-transparent">
              <button
                onClick={handleCaptureAndScan}
                disabled={analyzing}
                className="w-16 h-16 rounded-full bg-white border-4 border-gray-200 shadow-lg flex items-center justify-center active:scale-95 transition-transform"
                aria-label="Capture Photo"
              >
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-inner">
                  <Camera className="w-6 h-6" />
                </div>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4 animate-fadeIn">
          {/* Minimalist Result Card */}
          <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                {scanResult.medicineName ? (
                  <div className="p-2.5 bg-red-50 text-red-600 rounded-full">
                    <AlertOctagon className="w-6 h-6" />
                  </div>
                ) : (
                  <div className="p-2.5 bg-green-50 text-green-600 rounded-full">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                )}
                <div>
                  <span className="text-[11px] font-semibold tracking-wider text-gray-500 uppercase">
                    {scanResult.crop} • {scanResult.confidence}% Confidence
                  </span>
                  <h2 className="text-lg font-bold text-gray-900 leading-tight mt-0.5">
                    {lang === 'mr' ? scanResult.verdictMr : scanResult.verdictEn}
                  </h2>
                </div>
              </div>
              <button
                onClick={() => speakText(lang === 'mr' ? scanResult.plainAdviceMr : scanResult.plainAdviceEn, lang)}
                className="p-2 rounded-full bg-gray-50 border border-gray-200 text-gray-600 active:bg-gray-100"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-sm text-gray-700 leading-relaxed font-medium">
                {lang === 'mr' ? scanResult.plainAdviceMr : scanResult.plainAdviceEn}
              </p>
            </div>

            {scanResult.medicineName && (
              <button
                onClick={handleBuyMedicine}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-sm flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Order Treatment: {scanResult.medicineName} (₹{scanResult.price})</span>
              </button>
            )}
          </div>

          <button
            onClick={() => setScanResult(null)}
            className="w-full py-3.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold text-sm rounded-xl flex items-center justify-center gap-2 transition-colors active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{lang === 'mr' ? 'दुसरा फोटो काढा' : 'Scan New Image'}</span>
          </button>
        </div>
      )}
    </div>
  );
};
