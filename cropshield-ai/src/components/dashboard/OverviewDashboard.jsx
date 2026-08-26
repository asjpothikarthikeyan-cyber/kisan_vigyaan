import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polygon, CircleMarker, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useApp } from '../../context/AppContext';
import { 
  maharashtraDivisions, 
  maharashtraDistricts 
} from '../../data/maharashtraSurveillanceData';
import { 
  ShieldCheck, 
  AlertTriangle, 
  AlertOctagon, 
  CheckCircle2, 
  TrendingUp, 
  TrendingDown, 
  Scan, 
  Layers, 
  Clock, 
  ChevronRight, 
  ChevronDown, 
  ChevronLeft, 
  Droplets, 
  Zap, 
  Thermometer, 
  Activity, 
  Sun, 
  Search, 
  Sprout, 
  Wheat, 
  Radio, 
  RotateCcw,
  MapPin,
  Globe2,
  Maximize2,
  Sparkles,
  HelpCircle,
  Compass,
  ArrowRight
} from 'lucide-react';

// Controller to smoothly animate map views between Maharashtra Macro and Farm Micro
function MapViewController({ center, zoom, bounds }) {
  const map = useMap();
  
  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, { padding: [35, 35], maxZoom: 17 });
    } else if (center) {
      map.flyTo(center, zoom || 16, { duration: 1.0 });
    }
  }, [center, zoom, bounds, map]);

  return null;
}

// 6 Georeferenced Farm Plots in Sangli, Maharashtra (Gat No. 114, Kupwad)
const sangliFarmPlots = [
  {
    id: 'plot-1',
    labelCode: 'P1',
    name: 'Plot 1 - Rice Field',
    nameMr: 'प्लॉट १ - भात शेती',
    nameHi: 'प्लॉट 1 - धान खेत',
    block: 'Block A',
    crop: 'Rice (Paddy)',
    cropMr: 'भात (एमटीयू १०१०)',
    cropHi: 'धान (एमटीयू 1010)',
    variety: 'MTU 1010',
    acreage: '2.5 Acres',
    sowingDate: '2026-06-15',
    growthStage: 'Tillering & Vegetative',
    healthScore: 94,
    statusType: 'normal',
    statusLabel: 'Optimal Health',
    soilType: 'Heavy Clay Loam',
    yieldEst: '3,850 kg',
    center: [16.8652, 74.6040],
    polygon: [
      [16.8640, 74.6020],
      [16.8665, 74.6020],
      [16.8665, 74.6060],
      [16.8640, 74.6060]
    ],
    telemetry: {
      canopyTemp: 27.8,
      humidity: 78,
      soilVWC: 42.5,
      leafWetness: 2.1,
      ndvirating: 0.88,
      lastSync: 'Synced 1 min ago'
    },
    sparkline: [88, 89, 91, 92, 93, 94, 94],
    delta: '+3.2%',
    diseaseName: 'None Detected',
    actionRequired: null,
    actuators: { dripOn: true, mistingOn: false, fertigationOn: false },
    harvestEta: '78 Days'
  },
  {
    id: 'plot-2',
    labelCode: 'P2',
    name: 'Plot 2 - Cotton Field',
    nameMr: 'प्लॉट २ - बीटी कापूस',
    nameHi: 'प्लॉट 2 - बीटी कपास',
    block: 'Block B',
    crop: 'Cotton (Bt Hybrid)',
    cropMr: 'बीटी कापूस (आरसीएच-२)',
    cropHi: 'बीटी कपास (आरसीएच-2)',
    variety: 'RCH-2 Bt II',
    acreage: '3.0 Acres',
    sowingDate: '2026-05-20',
    growthStage: 'Square & Flowering',
    healthScore: 32,
    statusType: 'critical',
    statusLabel: 'Critical Outbreak',
    soilType: 'Medium Black Soil',
    yieldEst: '1,450 kg',
    center: [16.8652, 74.6087],
    polygon: [
      [16.8640, 74.6065],
      [16.8665, 74.6065],
      [16.8665, 74.6110],
      [16.8640, 74.6110]
    ],
    telemetry: {
      canopyTemp: 33.4,
      humidity: 86,
      soilVWC: 21.0,
      leafWetness: 6.8,
      ndvirating: 0.41,
      lastSync: 'Synced 2 min ago'
    },
    sparkline: [78, 66, 58, 45, 40, 35, 32],
    delta: '-18.4%',
    diseaseName: 'Bacterial Blight (Xanthomonas malvacearum)',
    actionRequired: 'URGENT: Spray Streptocycline (0.5g/L) + Copper Oxychloride (2.5g/L) within 24h.',
    actionRequiredMr: 'तातडीची उपाययोजना: जिवाणू करपा नियंत्रणासाठी २४ तासांत स्ट्रेप्टोमायसीन (०.५ ग्रॅ/ली) + कॉपर ऑक्सिक्लोराईड (२.५ ग्रॅ/ली) फवारावे.',
    actionRequiredHi: 'तत्काल कार्रवाई: बैक्टीरियल ब्लाइट नियंत्रण के लिए 24 घंटे में स्ट्रेप्टोसाइक्लिन + कॉपर ऑक्सीक्लोराइड का छिड़काव करें।',
    actuators: { dripOn: false, mistingOn: false, fertigationOn: false },
    harvestEta: '62 Days'
  },
  {
    id: 'plot-3',
    labelCode: 'P3',
    name: 'Plot 3 - Sugarcane',
    nameMr: 'प्लॉट ३ - ऊस (को ८६०३२)',
    nameHi: 'प्लॉट 3 - गन्ना',
    block: 'Block A',
    crop: 'Sugarcane',
    cropMr: 'ऊस (को ८६०३२)',
    cropHi: 'गन्ना (को 86032)',
    variety: 'Co 86032',
    acreage: '2.8 Acres',
    sowingDate: '2026-02-10',
    growthStage: 'Grand Growth Phase',
    healthScore: 88,
    statusType: 'normal',
    statusLabel: 'Good Condition',
    soilType: 'Deep Black Cotton',
    yieldEst: '115 Tonnes',
    center: [16.8622, 74.6040],
    polygon: [
      [16.8610, 74.6020],
      [16.8635, 74.6020],
      [16.8635, 74.6060],
      [16.8610, 74.6060]
    ],
    telemetry: {
      canopyTemp: 28.5,
      humidity: 70,
      soilVWC: 38.0,
      leafWetness: 1.8,
      ndvirating: 0.82,
      lastSync: 'Synced 3 min ago'
    },
    sparkline: [84, 85, 86, 87, 88, 88, 88],
    delta: '+1.5%',
    diseaseName: 'None Detected',
    actionRequired: null,
    actuators: { dripOn: true, mistingOn: false, fertigationOn: true },
    harvestEta: '145 Days'
  },
  {
    id: 'plot-4',
    labelCode: 'P4',
    name: 'Plot 4 - Tomato Field',
    nameMr: 'प्लॉट ४ - टोमॅटो',
    nameHi: 'प्लॉट 4 - टमाटर',
    block: 'Block B',
    crop: 'Tomato',
    cropMr: 'टोमॅटो (अभिनव)',
    cropHi: 'टमाटर (अभिनव)',
    variety: 'Abhinav F1',
    acreage: '1.8 Acres',
    sowingDate: '2026-06-01',
    growthStage: 'Fruit Development',
    healthScore: 58,
    statusType: 'warning',
    statusLabel: 'Early Blight Warning',
    soilType: 'Red Sandy Loam',
    yieldEst: '1,800 kg',
    center: [16.8622, 74.6087],
    polygon: [
      [16.8610, 74.6065],
      [16.8635, 74.6065],
      [16.8635, 74.6110],
      [16.8610, 74.6110]
    ],
    telemetry: {
      canopyTemp: 31.0,
      humidity: 72,
      soilVWC: 33.5,
      leafWetness: 4.2,
      ndvirating: 0.62,
      lastSync: 'Synced 2 min ago'
    },
    sparkline: [85, 80, 74, 68, 64, 60, 58],
    delta: '-7.0%',
    diseaseName: 'Early Blight (Alternaria solani)',
    actionRequired: 'ADVISORY: Foliar spray of Mancozeb 75% WP (2.0g/L) suggested.',
    actionRequiredMr: 'सल्ला: टोमॅटोवरील करपा रोगासाठी मँकोझेब ७५% डब्ल्यूपी (२.० ग्रॅ/ली) फवारावे.',
    actionRequiredHi: 'सलाह: अगेती झुलसा के लिए मैंकोजेब 75% WP (2.0 ग्राम/लीटर) का छिड़काव करें।',
    actuators: { dripOn: true, mistingOn: true, fertigationOn: false },
    harvestEta: '28 Days'
  },
  {
    id: 'plot-5',
    labelCode: 'P5',
    name: 'Plot 5 - Soybean',
    nameMr: 'प्लॉट ५ - सोयाबीन',
    nameHi: 'प्लॉट 5 - सोयाबीन',
    block: 'Block B',
    crop: 'Soybean',
    cropMr: 'सोयाबीन (जेएस ३३५)',
    cropHi: 'सोयाबीन (जेएस 335)',
    variety: 'JS 335',
    acreage: '2.2 Acres',
    sowingDate: '2026-06-25',
    growthStage: 'Pod Initiation',
    healthScore: 84,
    statusType: 'normal',
    statusLabel: 'Normal Growth',
    soilType: 'Medium Black Soil',
    yieldEst: '2,400 kg',
    center: [16.8592, 74.6087],
    polygon: [
      [16.8580, 74.6065],
      [16.8605, 74.6065],
      [16.8605, 74.6110],
      [16.8580, 74.6110]
    ],
    telemetry: {
      canopyTemp: 29.1,
      humidity: 68,
      soilVWC: 36.2,
      leafWetness: 2.0,
      ndvirating: 0.79,
      lastSync: 'Synced 4 min ago'
    },
    sparkline: [80, 81, 82, 83, 84, 84, 84],
    delta: '+2.1%',
    diseaseName: 'None Detected',
    actionRequired: null,
    actuators: { dripOn: false, mistingOn: false, fertigationOn: false },
    harvestEta: '52 Days'
  },
  {
    id: 'plot-6',
    labelCode: 'P6',
    name: 'Plot 6 - Pulses / Gram',
    nameMr: 'प्लॉट ६ - हरभरा / डाळ',
    nameHi: 'प्लॉट 6 - चना / दलहन',
    block: 'Block A',
    crop: 'Chickpea / Gram',
    cropMr: 'हरभरा (फुले विजय)',
    cropHi: 'चना (फुले विजय)',
    variety: 'Vijay Phule',
    acreage: '2.2 Acres',
    sowingDate: '2026-06-20',
    growthStage: 'Vegetative Branching',
    healthScore: 91,
    statusType: 'normal',
    statusLabel: 'Vigorous Health',
    soilType: 'Well-Drained Loam',
    yieldEst: '1,950 kg',
    center: [16.8592, 74.6040],
    polygon: [
      [16.8580, 74.6020],
      [16.8605, 74.6020],
      [16.8605, 74.6060],
      [16.8580, 74.6060]
    ],
    telemetry: {
      canopyTemp: 26.5,
      humidity: 62,
      soilVWC: 30.0,
      leafWetness: 1.5,
      ndvirating: 0.86,
      lastSync: 'Synced 1 min ago'
    },
    sparkline: [86, 88, 89, 90, 90, 91, 91],
    delta: '+3.5%',
    diseaseName: 'None Detected',
    actionRequired: null,
    actuators: { dripOn: true, mistingOn: false, fertigationOn: false },
    harvestEta: '68 Days'
  }
];

const timelineEvents = [
  { day: 'Day -6', date: '20 Aug', titleEn: 'Baseline State', titleMr: 'सुरवातीची स्थिती', alertCount: 0, criticalPlots: [], logEn: 'All Maharashtra districts showing normal vegetative vigor (NDVI avg: 0.84).' },
  { day: 'Day -5', date: '21 Aug', titleEn: 'Humidity Inflow', titleMr: 'दमट हवेचा शिरकाव', alertCount: 1, criticalPlots: [], logEn: 'Relative humidity rose to 82% across Western Maharashtra & Khandesh.' },
  { day: 'Day -4', date: '22 Aug', titleEn: 'Bacterial Spike', titleMr: 'जिवाणू करपा प्रादुर्भाव', alertCount: 2, criticalPlots: ['plot-2', 'yavatmal'], logEn: 'Plot 2 (Sangli) and Yavatmal Cotton belt detected with angular leaf lesions.' },
  { day: 'Day -3', date: '23 Aug', titleEn: 'Early Blight Alert', titleMr: 'करपा व केवडा सतर्कता', alertCount: 2, criticalPlots: ['plot-2', 'plot-4', 'nashik'], logEn: 'Nashik Grape Vineyards & Tomato fields developed concentric blight spots.' },
  { day: 'Day -2', date: '24 Aug', titleEn: 'Outbreak Escalation', titleMr: 'प्रादुर्भाव तीव्र इशारा', alertCount: 3, criticalPlots: ['plot-2', 'plot-4', 'nashik', 'yavatmal'], logEn: 'State Agriculture Dept issued urgent containment protocol for 3 hotspot districts.' },
  { day: 'Day -1', date: '25 Aug', titleEn: 'Spray Pre-booking', titleMr: 'फवारणी नियोजन', alertCount: 3, criticalPlots: ['plot-2', 'plot-4'], logEn: 'DBT subsidized bactericide spray dispatched; irrigation adjusted.' },
  { day: 'Today', date: '26 Aug (Live)', titleEn: 'Active Command', titleMr: 'थेट लाइव्ह कमांड', alertCount: 3, criticalPlots: ['plot-2'], logEn: 'Live satellite and 840 IoT telemetry stations actively streaming statewide.' }
];

export const OverviewDashboard = ({ onNavigate }) => {
  const { lang, t, theme } = useApp();
  const isDark = theme === 'dark';

  // Surveillance Scope: 'state' (Maharashtra All 36 Districts) | 'plot' (Sangli Farm 6 Plots)
  const [surveillanceScope, setSurveillanceScope] = useState('state');
  
  // Selected Division & District
  const [selectedDivision, setSelectedDivision] = useState('all');
  const [selectedDistrictId, setSelectedDistrictId] = useState('sangli');
  const [selectedDistrict, setSelectedDistrict] = useState(() => maharashtraDistricts.find(d => d.id === 'sangli'));

  // Selected Plot inside Farm
  const [selectedPlotId, setSelectedPlotId] = useState('plot-2');
  const [selectedPlot, setSelectedPlot] = useState(() => sangliFarmPlots.find(p => p.id === 'plot-2'));
  const [plotsData, setPlotsData] = useState(sangliFarmPlots);

  // Map & Controls
  const [mapLayer, setMapLayer] = useState('satellite'); // 'satellite' | 'ndvi' | 'terrain'
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'normal' | 'warning' | 'critical'
  const [leftNavCollapsed, setLeftNavCollapsed] = useState(false);
  const [blockAOpen, setBlockAOpen] = useState(true);
  const [blockBOpen, setBlockBOpen] = useState(true);

  // Bottom Timeline
  const [timelineOpen, setTimelineOpen] = useState(true);
  const [selectedTimelineIndex, setSelectedTimelineIndex] = useState(6);

  // Geographic Centers
  const maharashtraCenter = [19.2515, 75.7139]; // Geographic center of Maharashtra
  const sangliFarmBounds = [
    [16.8570, 74.6010],
    [16.8675, 74.6120]
  ];

  // Helper for localized strings
  const getLocalizedName = (item) => {
    if (!item) return '';
    if (lang === 'mr' && item.nameMr) return item.nameMr;
    if (lang === 'hi' && item.nameHi) return item.nameHi;
    return item.nameEn || item.name || '';
  };

  const getLocalizedCrop = (item) => {
    if (!item) return '';
    if (lang === 'mr' && item.cropMr) return item.cropMr;
    if (lang === 'hi' && item.cropHi) return item.cropHi;
    return item.cropEn || item.crop || '';
  };

  const getLocalizedStatus = (item) => {
    if (!item) return '';
    if (lang === 'mr' && item.statusMr) return item.statusMr;
    if (lang === 'hi' && item.statusHi) return item.statusHi;
    return item.statusEn || item.statusLabel || item.status || '';
  };

  const getLocalizedAlert = (item) => {
    if (!item) return '';
    if (lang === 'mr' && (item.alertTextMr || item.actionRequiredMr)) return item.alertTextMr || item.actionRequiredMr;
    if (lang === 'hi' && (item.alertTextHi || item.actionRequiredHi)) return item.alertTextHi || item.actionRequiredHi;
    return item.alertTextEn || item.actionRequired || '';
  };

  // Switch district
  const handleSelectDistrict = (dist) => {
    setSelectedDistrictId(dist.id);
    setSelectedDistrict(dist);
    if (dist.hasPlots) {
      setSurveillanceScope('plot');
    }
  };

  // Switch plot
  const handleSelectPlot = (plot) => {
    setSelectedPlotId(plot.id);
    setSelectedPlot(plot);
  };

  const handleToggleActuator = (plotId, actuatorKey) => {
    setPlotsData(prev => prev.map(p => {
      if (p.id === plotId) {
        const updatedActuators = { ...p.actuators, [actuatorKey]: !p.actuators[actuatorKey] };
        const updatedPlot = { ...p, actuators: updatedActuators };
        if (selectedPlot?.id === plotId) setSelectedPlot(updatedPlot);
        return updatedPlot;
      }
      return p;
    }));
  };

  // Filtered districts
  const filteredDistricts = maharashtraDistricts.filter(d => {
    const matchesDiv = selectedDivision === 'all' || d.divisionId === selectedDivision;
    const nameStr = `${d.nameEn} ${d.nameMr} ${d.nameHi} ${d.cropEn}`.toLowerCase();
    const matchesSearch = nameStr.includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || d.statusType === statusFilter;
    return matchesDiv && matchesSearch && matchesStatus;
  });

  const tileUrls = {
    satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    ndvi: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    terrain: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  };

  const getPolygonStyle = (plot) => {
    const isSelected = selectedPlotId === plot.id;
    let fillColor = '#16A34A';
    let borderColor = '#15803D';

    if (plot.statusType === 'critical') {
      fillColor = '#DC2626';
      borderColor = '#B91C1C';
    } else if (plot.statusType === 'warning') {
      fillColor = '#D97706';
      borderColor = '#B45309';
    }

    return {
      fillColor: fillColor,
      fillOpacity: isSelected ? 0.70 : 0.45,
      color: isSelected ? '#FFFFFF' : borderColor,
      weight: isSelected ? 3.5 : 2,
      dashArray: isSelected ? '' : '2, 3',
      lineCap: 'round',
      lineJoin: 'round'
    };
  };

  return (
    <div className={`flex flex-col h-[calc(100vh-68px)] select-none overflow-hidden font-sans transition-colors duration-200 ${
      isDark ? 'bg-[#070c18] text-slate-100' : 'bg-[#F4F6F4] text-slate-900'
    }`}>
      {/* 1. Global High-Contrast Precision AgriTech KPI Top Strip */}
      <div className={`border-b px-4 py-2 shrink-0 z-20 shadow-xs transition-colors ${
        isDark ? 'bg-[#090f1d] border-[#16233b]' : 'bg-white border-slate-200'
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Left: Scope Switcher (Maharashtra All Districts vs Precision Farm Plots) */}
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-[5px] bg-[#1B5E20] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              <Wheat className="w-4 h-4 text-emerald-200" />
            </div>

            <div className="flex items-center gap-1.5 font-bold text-[13px]">
              <button
                onClick={() => setSurveillanceScope('state')}
                className={`px-2 py-0.5 rounded-[4px] transition-colors cursor-pointer ${
                  surveillanceScope === 'state'
                    ? 'bg-[#1B5E20] text-white shadow-xs'
                    : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t('stateWideSurveillance') || 'Maharashtra State Grid (36 Districts)'}
              </button>

              <span className="text-slate-400">/</span>

              <button
                onClick={() => setSurveillanceScope('plot')}
                className={`px-2 py-0.5 rounded-[4px] transition-colors cursor-pointer ${
                  surveillanceScope === 'plot'
                    ? 'bg-[#1B5E20] text-white shadow-xs'
                    : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t('plotLevel') || 'Sangli Precision Farm (Gat 114)'}
              </button>
            </div>

            <span className="hidden xl:inline-block px-2 py-0.2 rounded text-[10px] font-mono font-bold bg-emerald-50 text-[#1B5E20] border border-emerald-200">
              ISRO Bhuvan & Sentinel-2 GIS
            </span>
          </div>

          {/* Center: Thin Inline Stat Blocks */}
          <div className={`flex items-center divide-x text-xs ${isDark ? 'divide-[#16233b]' : 'divide-slate-200'}`}>
            <div className="px-3 py-0.5">
              <span className={`text-[10px] uppercase font-semibold block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {t('stateAvgHealth') || 'Avg. Health'}
              </span>
              <strong className="text-[13px] font-bold text-[#1B5E20]">73%</strong>
            </div>

            <div className="px-3 py-0.5">
              <span className={`text-[10px] uppercase font-semibold block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {t('activeOutbreaks') || 'Active Outbreaks'}
              </span>
              <strong className="text-[13px] font-bold text-rose-600">3 {lang === 'mr' ? 'जिल्हे' : 'Districts'}</strong>
            </div>

            <div className="px-3 py-0.5">
              <span className={`text-[10px] uppercase font-semibold block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {t('sensorsOnline') || 'IoT Telemetry'}
              </span>
              <strong className={`text-[13px] font-bold font-mono ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>840 Nodes</strong>
            </div>

            <div className="px-3 py-0.5 hidden sm:block">
              <span className={`text-[10px] uppercase font-semibold block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {t('totalAcreage') || 'Monitored Area'}
              </span>
              <strong className={`text-[13px] font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>4.2M Ha</strong>
            </div>

            <div className="px-3 py-0.5 hidden lg:block">
              <span className={`text-[10px] uppercase font-semibold block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Maharashtra Met
              </span>
              <strong className={`text-[13px] font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>29.8°C • 66% RH</strong>
            </div>
          </div>

          {/* Right: Quick Action to AI Leaf Scanner */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onNavigate('smartScanner')}
              className="px-3 py-1.5 bg-[#1B5E20] hover:bg-[#154D1A] text-white font-semibold text-[11px] rounded-[5px] shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Scan className="w-3.5 h-3.5" />
              <span>{t('diagnoseCropLeaf') || 'Diagnose Leaf'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Geospatial Tri-Pane Work Area */}
      <div className="flex-1 flex min-h-0 relative">
        {/* PANE A: Left Collapsible Hierarchy Navigator Tree (Maharashtra All Districts & Farm Plots) */}
        <div className={`
          border-r flex flex-col justify-between transition-all duration-200 shrink-0 z-10
          ${isDark ? 'bg-[#090f1d] border-[#16233b] text-slate-300' : 'bg-white border-slate-200 text-slate-700'}
          ${leftNavCollapsed ? 'w-12' : 'w-72 lg:w-80'}
        `}>
          {!leftNavCollapsed ? (
            <div className="flex-1 flex flex-col min-h-0">
              <div className={`p-3 border-b flex items-center justify-between ${isDark ? 'border-[#16233b]' : 'border-slate-100'}`}>
                <div className="flex items-center space-x-1.5 font-bold text-xs">
                  <Compass className="w-4 h-4 text-[#1B5E20]" />
                  <span>{t('farmHierarchyNavigator') || 'Maharashtra & Farm Navigator'}</span>
                </div>
                <button
                  onClick={() => setLeftNavCollapsed(true)}
                  className={`p-1 rounded ${isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'}`}
                  title="Collapse Navigator"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>

              {/* Search & Division Selector */}
              <div className={`p-2.5 space-y-2 border-b ${isDark ? 'border-[#16233b] bg-[#0c1527]' : 'border-slate-100 bg-slate-50/70'}`}>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
                  <input
                    type="text"
                    placeholder={lang === 'mr' ? 'जिल्हा, पीक किंवा प्लॉट शोधा...' : 'Search district, crop, or plot...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-8 pr-2 py-1 rounded-[5px] text-xs focus:outline-none focus:border-[#1B5E20] ${
                      isDark ? 'bg-[#090f1d] border border-[#1e2f4f] text-slate-100 placeholder-slate-500' : 'bg-white border border-slate-200 text-slate-800 placeholder-slate-400'
                    }`}
                  />
                </div>

                {/* Division Selector Pills */}
                <div className="flex items-center gap-1 overflow-x-auto text-[10px] font-semibold pb-1">
                  {maharashtraDivisions.map(div => (
                    <button
                      key={div.id}
                      onClick={() => setSelectedDivision(div.id)}
                      className={`px-2 py-0.5 rounded-[4px] whitespace-nowrap transition-colors cursor-pointer ${
                        selectedDivision === div.id
                          ? 'bg-[#1B5E20] text-white shadow-xs'
                          : isDark ? 'bg-[#0f172a] text-slate-300 border border-[#1e2f4f] hover:bg-slate-800' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {lang === 'mr' ? div.nameMr : lang === 'hi' ? div.nameHi : div.nameEn}
                    </button>
                  ))}
                </div>

                {/* Status Filter */}
                <div className="flex items-center gap-1 text-[10px] font-semibold">
                  {[
                    { id: 'all', label: t('allDistricts') || 'All (36)' },
                    { id: 'normal', label: t('healthyDistricts') || 'Healthy (28)' },
                    { id: 'warning', label: t('warningDistricts') || 'Warn (5)' },
                    { id: 'critical', label: t('criticalDistricts') || 'Crit (3)' }
                  ].map(f => (
                    <button
                      key={f.id}
                      onClick={() => setStatusFilter(f.id)}
                      className={`px-1.5 py-0.5 rounded-[3px] transition-colors cursor-pointer ${
                        statusFilter === f.id
                          ? 'bg-slate-800 text-white font-bold'
                          : isDark ? 'bg-[#0f172a] text-slate-400 hover:text-slate-200' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Districts / Plots List */}
              <div className="flex-1 overflow-y-auto p-2 space-y-1.5 text-xs">
                {surveillanceScope === 'state' ? (
                  // STATE MODE: Render All Maharashtra Districts
                  <div className="space-y-1">
                    {filteredDistricts.map(dist => {
                      const isSel = selectedDistrictId === dist.id;
                      const isCrit = dist.statusType === 'critical';
                      const isWarn = dist.statusType === 'warning';

                      return (
                        <div
                          key={dist.id}
                          onClick={() => handleSelectDistrict(dist)}
                          className={`p-2 rounded-[5px] border cursor-pointer transition-colors ${
                            isSel
                              ? isCrit ? 'bg-rose-500/10 border-rose-500 text-rose-400 font-semibold' : 'bg-emerald-500/10 border-[#1B5E20] text-[#1B5E20] font-semibold'
                              : isDark ? 'bg-[#0c1527] border-[#16233b] hover:bg-[#121f38]' : 'bg-white border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1.5">
                              <span className={`w-2 h-2 rounded-full ${isCrit ? 'bg-red-600 animate-pulse' : isWarn ? 'bg-amber-500' : 'bg-emerald-600'}`}></span>
                              <h4 className={`font-bold text-[12px] ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
                                {getLocalizedName(dist)}
                              </h4>
                            </div>

                            <div className="flex items-center space-x-1">
                              <span className={`font-bold font-mono text-[11px] ${isCrit ? 'text-red-500' : isWarn ? 'text-amber-500' : 'text-emerald-600'}`}>
                                {dist.healthScore}%
                              </span>
                              {dist.hasPlots && (
                                <span className="text-[9px] bg-[#1B5E20] text-white px-1 py-0.2 rounded font-bold">
                                  Plots
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1">
                            <span className="truncate max-w-[180px]">{getLocalizedCrop(dist)}</span>
                            <span className="font-mono text-[9px]">{dist.temp}°C • {dist.humidity}%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  // PLOT MODE: Render Sangli Farm Parcels
                  <div className="space-y-2">
                    <div className="border rounded-[5px] overflow-hidden">
                      <button
                        onClick={() => setBlockAOpen(!blockAOpen)}
                        className={`w-full flex items-center justify-between p-2 text-left font-bold text-xs ${isDark ? 'bg-[#0c1527] text-slate-200' : 'bg-slate-50 text-slate-800'}`}
                      >
                        <div className="flex items-center space-x-1.5">
                          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${blockAOpen ? '' : '-rotate-90'}`} />
                          <span>Block A: Cereals & Pulses (7.5 Ac)</span>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-600 font-bold">3 Healthy</span>
                      </button>

                      {blockAOpen && (
                        <div className="divide-y pl-3">
                          {plotsData.filter(p => p.block === 'Block A').map(plot => (
                            <div
                              key={plot.id}
                              onClick={() => handleSelectPlot(plot)}
                              className={`p-2 flex items-center justify-between cursor-pointer ${
                                selectedPlotId === plot.id ? 'bg-emerald-500/10 border-l-[3px] border-[#1B5E20] font-semibold' : ''
                              }`}
                            >
                              <div>
                                <span className="font-bold text-[12px]">{getLocalizedName(plot)}</span>
                                <p className="text-[10px] text-slate-500">{getLocalizedCrop(plot)} • {plot.acreage}</p>
                              </div>
                              <span className="font-bold font-mono text-emerald-600 text-xs">{plot.healthScore}%</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="border rounded-[5px] overflow-hidden">
                      <button
                        onClick={() => setBlockBOpen(!blockBOpen)}
                        className={`w-full flex items-center justify-between p-2 text-left font-bold text-xs ${isDark ? 'bg-[#0c1527] text-slate-200' : 'bg-slate-50 text-slate-800'}`}
                      >
                        <div className="flex items-center space-x-1.5">
                          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${blockBOpen ? '' : '-rotate-90'}`} />
                          <span>Block B: Cash Crops & Veg (7.0 Ac)</span>
                        </div>
                        <span className="text-[10px] font-mono text-rose-600 font-bold">1 Crit • 1 Warn</span>
                      </button>

                      {blockBOpen && (
                        <div className="divide-y pl-3">
                          {plotsData.filter(p => p.block === 'Block B').map(plot => (
                            <div
                              key={plot.id}
                              onClick={() => handleSelectPlot(plot)}
                              className={`p-2 flex items-center justify-between cursor-pointer ${
                                selectedPlotId === plot.id ? (plot.statusType === 'critical' ? 'bg-rose-500/10 border-l-[3px] border-rose-600 font-semibold' : 'bg-emerald-500/10 border-l-[3px] border-[#1B5E20] font-semibold') : ''
                              }`}
                            >
                              <div>
                                <span className="font-bold text-[12px]">{getLocalizedName(plot)}</span>
                                <p className="text-[10px] text-slate-500">{getLocalizedCrop(plot)} • {plot.acreage}</p>
                              </div>
                              <span className={`font-bold font-mono text-xs ${plot.statusType === 'critical' ? 'text-red-500' : plot.statusType === 'warning' ? 'text-amber-500' : 'text-emerald-600'}`}>
                                {plot.healthScore}%
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Weather Widget */}
              <div className={`p-2.5 border-t text-[11px] space-y-1 ${isDark ? 'border-[#16233b] bg-[#0c1527] text-slate-400' : 'border-slate-100 bg-slate-50/80 text-slate-600'}`}>
                <div className="flex items-center justify-between font-bold">
                  <span className="flex items-center gap-1">
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                    <span>{getLocalizedName(selectedDistrict)} {lang === 'mr' ? 'हवामान केंद्र' : 'Met Station'}</span>
                  </span>
                  <span className="font-mono text-emerald-600 font-bold">{selectedDistrict?.temp}°C</span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span>{t('humidity') || 'Humidity'}: {selectedDistrict?.humidity}% • Soil: {selectedDistrict?.soilVWC}%</span>
                  <span>{selectedDistrict?.activeSensors}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-3 flex flex-col items-center justify-between h-full">
              <button
                onClick={() => setLeftNavCollapsed(false)}
                className={`p-2 rounded ${isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}
                title="Expand Navigator"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            </div>
          )}
        </div>

        {/* PANE B: Full-Bleed Geospatial Interactive Map Center Canvas */}
        <div className="flex-1 flex flex-col min-w-0 relative bg-slate-950">
          {/* Map Layer Selector HUD */}
          <div className={`absolute top-3 left-3 z-[400] flex items-center gap-1 backdrop-blur-md p-1 rounded-[6px] border shadow-md text-xs ${
            isDark ? 'bg-[#090f1d]/95 border-[#1e2f4f] text-slate-200' : 'bg-white/95 border-slate-200 text-slate-800'
          }`}>
            <span className="text-[10px] font-bold text-slate-400 uppercase px-1.5">Layer:</span>
            {[
              { id: 'satellite', label: t('layerSatellite') || 'Satellite' },
              { id: 'ndvi', label: t('layerNDVI') || 'NDVI Index' },
              { id: 'terrain', label: t('layerTerrain') || 'Topographic' }
            ].map(l => (
              <button
                key={l.id}
                onClick={() => setMapLayer(l.id)}
                className={`px-2.5 py-1 rounded-[4px] text-[11px] font-semibold transition-colors cursor-pointer ${
                  mapLayer === l.id 
                    ? 'bg-[#1B5E20] text-white shadow-xs' 
                    : isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Quick Scope Reset Button */}
          <div className={`absolute top-3 right-3 z-[400] flex items-center gap-1.5 backdrop-blur-md p-1 rounded-[6px] border shadow-md text-xs ${
            isDark ? 'bg-[#090f1d]/95 border-[#1e2f4f] text-slate-200' : 'bg-white/95 border-slate-200 text-slate-800'
          }`}>
            {surveillanceScope === 'plot' ? (
              <button
                onClick={() => setSurveillanceScope('state')}
                className="px-2.5 py-1 bg-[#1B5E20] hover:bg-[#154D1A] text-white rounded-[4px] flex items-center gap-1 font-bold text-[11px] shadow-xs cursor-pointer"
              >
                <Globe2 className="w-3.5 h-3.5" />
                <span>{t('backToState') || 'All Maharashtra (36 Districts)'}</span>
              </button>
            ) : (
              <button
                onClick={() => setSurveillanceScope('plot')}
                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[4px] flex items-center gap-1 font-bold text-[11px] shadow-xs cursor-pointer"
              >
                <Wheat className="w-3.5 h-3.5" />
                <span>{t('drillDownPlots') || 'Sangli Plots'}</span>
              </button>
            )}
          </div>

          {/* Interactive Leaflet Map */}
          <div className="flex-1 w-full h-full relative">
            <MapContainer
              center={surveillanceScope === 'state' ? maharashtraCenter : [16.8622, 74.6065]}
              zoom={surveillanceScope === 'state' ? 7 : 16}
              scrollWheelZoom={true}
              className="w-full h-full"
              style={{ background: '#0e1626' }}
            >
              {surveillanceScope === 'state' ? (
                <MapViewController center={maharashtraCenter} zoom={7} />
              ) : (
                <MapViewController bounds={sangliFarmBounds} />
              )}

              <TileLayer
                attribution='&copy; <a href="https://www.esri.com/">Esri</a>, ISRO Bhuvan'
                url={tileUrls[mapLayer] || tileUrls.satellite}
                maxZoom={19}
              />

              {surveillanceScope === 'state' ? (
                // RENDER ALL 36 MAHARASHTRA DISTRICT NODES
                maharashtraDistricts.map(dist => {
                  const isCrit = dist.statusType === 'critical';
                  const isWarn = dist.statusType === 'warning';
                  const isSel = selectedDistrictId === dist.id;

                  const pinColor = isCrit ? '#DC2626' : isWarn ? '#D97706' : '#16A34A';

                  return (
                    <CircleMarker
                      key={dist.id}
                      center={dist.coordinates}
                      radius={isSel ? 16 : isCrit ? 14 : 11}
                      pathOptions={{
                        fillColor: pinColor,
                        fillOpacity: 0.85,
                        color: isSel ? '#FFFFFF' : '#000000',
                        weight: isSel ? 3 : 1.5
                      }}
                      eventHandlers={{
                        click: () => handleSelectDistrict(dist)
                      }}
                    >
                      <Tooltip direction="top" offset={[0, -10]} opacity={0.95} permanent={false}>
                        <div className="p-1 text-slate-900 font-sans text-xs min-w-36">
                          <div className="font-bold text-[12px] flex items-center justify-between border-b pb-0.5 border-slate-200">
                            <span>{getLocalizedName(dist)}</span>
                            <span className={`px-1.5 py-0.2 rounded text-[10px] text-white font-mono font-bold ${
                              isCrit ? 'bg-red-600' : isWarn ? 'bg-amber-600' : 'bg-emerald-600'
                            }`}>
                              {dist.healthScore}%
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-600 mt-1">{getLocalizedCrop(dist)}</p>
                          <div className="text-[9px] text-slate-500 font-mono mt-0.5">
                            {dist.temp}°C • {dist.humidity}% RH • {dist.activeSensors}
                          </div>
                          {dist.hasPlots && (
                            <div className="mt-1 text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded text-center">
                              👉 Click to Drill-Down into Farm Plots
                            </div>
                          )}
                        </div>
                      </Tooltip>
                    </CircleMarker>
                  );
                })
              ) : (
                // RENDER SANGLI PRECISION FARM PLOTS
                plotsData.map(plot => {
                  const isSelected = selectedPlotId === plot.id;
                  const isCritical = plot.statusType === 'critical';
                  const isWarning = plot.statusType === 'warning';

                  return (
                    <Polygon
                      key={plot.id}
                      positions={plot.polygon}
                      pathOptions={getPolygonStyle(plot)}
                      eventHandlers={{
                        click: () => handleSelectPlot(plot)
                      }}
                    >
                      <Tooltip direction="top" offset={[0, -5]} opacity={0.98} permanent={true}>
                        <div className="p-0.5 text-slate-900 font-sans text-xs min-w-32 text-center">
                          <div className="font-bold text-[11px] flex items-center justify-center gap-1">
                            <span className={`w-2 h-2 rounded-full ${isCritical ? 'bg-red-600' : isWarning ? 'bg-amber-500' : 'bg-emerald-600'}`}></span>
                            <span>{getLocalizedName(plot)}</span>
                          </div>
                          <div className="text-[10px] text-slate-600 mt-0.5 font-mono">
                            {getLocalizedCrop(plot)} • <strong className={isCritical ? 'text-red-600 font-bold' : isWarning ? 'text-amber-600 font-bold' : 'text-emerald-700 font-bold'}>{plot.healthScore}%</strong>
                          </div>
                        </div>
                      </Tooltip>
                    </Polygon>
                  );
                })
              )}
            </MapContainer>

            {/* Health Color Legend */}
            <div className={`absolute bottom-3 left-3 z-[400] backdrop-blur-md p-2.5 rounded-[6px] border shadow-md text-xs space-y-1.5 ${
              isDark ? 'bg-[#090f1d]/95 border-[#1e2f4f] text-slate-200' : 'bg-white/95 border-slate-200 text-slate-800'
            }`}>
              <span className="text-[10px] font-bold uppercase text-slate-400 block">
                {t('healthIndexStatus') || 'Health Status Legend'}
              </span>
              <div className="flex flex-col gap-1 text-[11px] font-medium">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-[2px] bg-emerald-600"></span>
                  <span>&gt;80% {t('optimalHealth') || 'Optimal Health (28 Districts)'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-[2px] bg-amber-500"></span>
                  <span>50-80% {t('warningState') || 'Stress / Warning (5 Districts)'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-[2px] bg-red-600"></span>
                  <span>&lt;50% {t('criticalState') || 'Critical Outbreak (3 Districts)'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* PANE B2: Bottom-Docked 7-Day Outbreak Timeline Scrubber */}
          <div className={`border-t p-2.5 z-20 shadow-xs shrink-0 ${
            isDark ? 'bg-[#090f1d] border-[#16233b] text-slate-200' : 'bg-white border-slate-200 text-slate-800'
          }`}>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center space-x-2">
                <Clock className="w-3.5 h-3.5 text-[#1B5E20]" />
                <span className="font-bold text-xs">
                  {t('sevenDayTimeline') || '7-Day Outbreak Progression & Telemetry Timeline'}
                </span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-semibold ${
                  isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
                }`}>
                  {timelineEvents[selectedTimelineIndex].date}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-[11px] text-slate-400 font-medium">
                  {lang === 'mr' ? timelineEvents[selectedTimelineIndex].titleMr : timelineEvents[selectedTimelineIndex].titleEn}
                </span>
                <button
                  onClick={() => setTimelineOpen(!timelineOpen)}
                  className="text-slate-400 hover:text-slate-200 p-0.5"
                >
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${timelineOpen ? '' : 'rotate-180'}`} />
                </button>
              </div>
            </div>

            {timelineOpen && (
              <div className="space-y-2">
                <div className="grid grid-cols-7 gap-1">
                  {timelineEvents.map((evt, idx) => {
                    const isSelected = selectedTimelineIndex === idx;
                    const hasCrit = evt.criticalPlots.length > 0;

                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedTimelineIndex(idx)}
                        className={`p-1.5 rounded-[4px] border text-left transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-slate-800 text-white border-slate-700 shadow-xs font-bold'
                            : hasCrit
                            ? 'bg-red-500/10 text-red-500 border-red-500/30 hover:bg-red-500/20'
                            : isDark ? 'bg-[#0c1527] text-slate-400 border-[#1e2f4f] hover:bg-slate-800' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold font-mono">{evt.day}</span>
                          {hasCrit && <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>}
                        </div>
                        <div className="text-[9px] truncate mt-0.5 opacity-90">
                          {lang === 'mr' ? evt.titleMr : evt.titleEn}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className={`p-1.5 border rounded-[4px] text-[11px] flex items-center justify-between ${
                  isDark ? 'bg-[#0c1527] border-[#16233b] text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}>
                  <span className="truncate">
                    <strong>{t('eventLog') || 'Event Log'}:</strong> {timelineEvents[selectedTimelineIndex].logEn}
                  </span>
                  <span className="text-[10px] font-mono text-[#1B5E20] font-bold shrink-0 ml-2">
                    {timelineEvents[selectedTimelineIndex].alertCount} {t('activeOutbreaks') || 'Active Alerts'}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* PANE C: Right-Side Live Telemetry & Micro-Actuators Slide-Out Panel */}
        <div className={`w-80 lg:w-96 border-l flex flex-col justify-between overflow-y-auto shrink-0 z-10 p-3.5 space-y-3 shadow-sm ${
          isDark ? 'bg-[#090f1d] border-[#16233b] text-slate-200' : 'bg-white border-slate-200 text-slate-800'
        }`}>
          {surveillanceScope === 'state' && selectedDistrict ? (
            // STATE TELEMETRY INSPECTOR
            <div className="space-y-3">
              <div className={`border-b pb-2.5 ${isDark ? 'border-[#16233b]' : 'border-slate-100'}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded border uppercase ${
                      isDark ? 'bg-slate-800 text-slate-300 border-[#1e2f4f]' : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}>
                      {selectedDistrict.acreage}
                    </span>
                    <h3 className="text-base font-bold mt-1">
                      {getLocalizedName(selectedDistrict)} {lang === 'mr' ? 'जिल्हा' : 'District'}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">
                      {getLocalizedCrop(selectedDistrict)}
                    </p>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase tracking-wider ${
                    selectedDistrict.statusType === 'critical'
                      ? 'bg-red-500/20 text-red-500 border border-red-500/40'
                      : selectedDistrict.statusType === 'warning'
                      ? 'bg-amber-500/20 text-amber-500 border border-amber-500/40'
                      : 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/40'
                  }`}>
                    {getLocalizedStatus(selectedDistrict)}
                  </span>
                </div>
              </div>

              {/* Alert Callout */}
              <div className={`p-2.5 rounded-[5px] border text-xs leading-relaxed ${
                selectedDistrict.statusType === 'critical'
                  ? 'bg-red-500/10 text-red-400 border-red-500/30'
                  : selectedDistrict.statusType === 'warning'
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  : isDark ? 'bg-[#0c1527] border-[#16233b] text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}>
                <div className="flex items-center gap-1 font-bold mb-1">
                  <AlertOctagon className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span>{t('outbreakAlert') || 'Agro-Advisory Status'}</span>
                </div>
                <p className="text-[11px]">{getLocalizedAlert(selectedDistrict)}</p>
              </div>

              {/* Health Score */}
              <div className={`p-3 rounded-[5px] border space-y-1.5 ${isDark ? 'bg-[#0c1527] border-[#16233b]' : 'bg-slate-50 border-slate-200'}`}>
                <span className="text-[10px] font-bold uppercase text-slate-400 block">
                  {t('cropHealthIndex') || 'District Vegetation Index (NDVI)'}
                </span>
                <div className="flex items-baseline space-x-2">
                  <strong className={`text-2xl font-bold font-mono ${
                    selectedDistrict.statusType === 'critical' ? 'text-red-500' : selectedDistrict.statusType === 'warning' ? 'text-amber-500' : 'text-emerald-500'
                  }`}>
                    {selectedDistrict.healthScore}%
                  </strong>
                  <span className="text-xs font-mono text-emerald-500">Sentinel-2 10m Multispectral</span>
                </div>
              </div>

              {/* Telemetry Sensor Matrix */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                  {t('microTelemetry') || 'Live Regional Telemetry Grid'}
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className={`p-2 border rounded-[4px] ${isDark ? 'bg-[#0c1527] border-[#16233b]' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="text-[10px] text-slate-400 font-medium">{t('canopyTemp') || 'Canopy Temp'}</div>
                    <div className="text-[13px] font-bold font-mono mt-0.5">{selectedDistrict.temp}°C</div>
                  </div>
                  <div className={`p-2 border rounded-[4px] ${isDark ? 'bg-[#0c1527] border-[#16233b]' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="text-[10px] text-slate-400 font-medium">{t('humidity') || 'Rel. Humidity'}</div>
                    <div className="text-[13px] font-bold font-mono mt-0.5">{selectedDistrict.humidity}%</div>
                  </div>
                  <div className={`p-2 border rounded-[4px] ${isDark ? 'bg-[#0c1527] border-[#16233b]' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="text-[10px] text-slate-400 font-medium">{t('soilVWC') || 'Soil VWC'}</div>
                    <div className="text-[13px] font-bold font-mono mt-0.5">{selectedDistrict.soilVWC}%</div>
                  </div>
                  <div className={`p-2 border rounded-[4px] ${isDark ? 'bg-[#0c1527] border-[#16233b]' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="text-[10px] text-slate-400 font-medium">IoT Station</div>
                    <div className="text-[13px] font-bold font-mono mt-0.5">{selectedDistrict.activeSensors}</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2 border-t">
                {selectedDistrict.hasPlots ? (
                  <button
                    onClick={() => setSurveillanceScope('plot')}
                    className="w-full py-2 bg-[#1B5E20] hover:bg-[#154D1A] text-white font-bold text-xs rounded-[5px] shadow-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Wheat className="w-4 h-4" />
                    <span>{lang === 'mr' ? 'सांगली शेत प्लॉट्स पहा' : 'Inspect Sangli Precision Plots'}</span>
                  </button>
                ) : (
                  <button
                    onClick={() => onNavigate('smartScanner')}
                    className="w-full py-2 bg-[#1B5E20] hover:bg-[#154D1A] text-white font-bold text-xs rounded-[5px] shadow-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Scan className="w-4 h-4" />
                    <span>{t('diagnoseCropLeaf') || 'Diagnose Leaf with AI'}</span>
                  </button>
                )}
              </div>
            </div>
          ) : selectedPlot ? (
            // PLOT TELEMETRY INSPECTOR
            <div className="space-y-3">
              <div className={`border-b pb-2.5 ${isDark ? 'border-[#16233b]' : 'border-slate-100'}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded border uppercase ${
                      isDark ? 'bg-slate-800 text-slate-300 border-[#1e2f4f]' : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}>
                      {selectedPlot.block} • {selectedPlot.acreage}
                    </span>
                    <h3 className="text-base font-bold mt-1">
                      {getLocalizedName(selectedPlot)}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">
                      {getLocalizedCrop(selectedPlot)} ({selectedPlot.variety})
                    </p>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase tracking-wider ${
                    selectedPlot.statusType === 'critical'
                      ? 'bg-red-500/20 text-red-500 border border-red-500/40'
                      : selectedPlot.statusType === 'warning'
                      ? 'bg-amber-500/20 text-amber-500 border border-amber-500/40'
                      : 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/40'
                  }`}>
                    {selectedPlot.statusLabel}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1.5 pt-1.5 border-t">
                  <span>Sown: {selectedPlot.sowingDate}</span>
                  <span className="font-mono">{selectedPlot.telemetry.lastSync}</span>
                </div>
              </div>

              {/* Action Alert Banner */}
              {selectedPlot.actionRequired && (
                <div className={`p-2.5 rounded-[5px] border text-xs leading-relaxed ${
                  selectedPlot.statusType === 'critical'
                    ? 'bg-red-500/10 text-red-400 border-red-500/30'
                    : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                }`}>
                  <div className="flex items-center gap-1 font-bold mb-1">
                    <AlertOctagon className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span>{selectedPlot.diseaseName}</span>
                  </div>
                  <p className="text-[11px]">{getLocalizedAlert(selectedPlot)}</p>
                </div>
              )}

              {/* Crop Health Index + Sparkline */}
              <div className={`p-3 rounded-[5px] border space-y-1.5 ${isDark ? 'bg-[#0c1527] border-[#16233b]' : 'bg-slate-50 border-slate-200'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">
                      {t('cropHealthIndex') || 'Crop Health Index (NDVI)'}
                    </span>
                    <div className="flex items-baseline space-x-1.5 mt-0.5">
                      <strong className={`text-xl font-bold font-mono ${
                        selectedPlot.statusType === 'critical' ? 'text-red-500' : selectedPlot.statusType === 'warning' ? 'text-amber-500' : 'text-emerald-500'
                      }`}>
                        {selectedPlot.healthScore}%
                      </strong>
                      <span className={`text-xs font-bold font-mono ${selectedPlot.delta.startsWith('-') ? 'text-red-500' : 'text-emerald-500'}`}>
                        {selectedPlot.delta} (7d)
                      </span>
                    </div>
                  </div>

                  <div className="w-24 h-8 flex flex-col items-end justify-center">
                    <svg viewBox="0 0 120 40" className="w-20 h-6 overflow-visible">
                      <polyline
                        fill="none"
                        stroke={selectedPlot.statusType === 'critical' ? '#DC2626' : selectedPlot.statusType === 'warning' ? '#D97706' : '#16A34A'}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points={selectedPlot.sparkline.map((val, idx) => `${idx * 20},${40 - (val / 100 * 35)}`).join(' ')}
                      />
                    </svg>
                    <span className="text-[9px] font-mono text-slate-400">7-Day Trend</span>
                  </div>
                </div>
              </div>

              {/* Live Micro-Telemetry Sensors Grid */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                  {t('microTelemetry') || 'Live Micro-Telemetry Sensors'}
                </span>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className={`p-2 border rounded-[4px] ${isDark ? 'bg-[#0c1527] border-[#16233b]' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="text-[10px] text-slate-400 font-medium">{t('canopyTemp') || 'Canopy Temp'}</div>
                    <div className="text-[13px] font-bold font-mono mt-0.5">{selectedPlot.telemetry.canopyTemp}°C</div>
                  </div>
                  <div className={`p-2 border rounded-[4px] ${isDark ? 'bg-[#0c1527] border-[#16233b]' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="text-[10px] text-slate-400 font-medium">{t('humidity') || 'Rel. Humidity'}</div>
                    <div className="text-[13px] font-bold font-mono mt-0.5">{selectedPlot.telemetry.humidity}%</div>
                  </div>
                  <div className={`p-2 border rounded-[4px] ${isDark ? 'bg-[#0c1527] border-[#16233b]' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="text-[10px] text-slate-400 font-medium">{t('soilVWC') || 'Soil VWC'}</div>
                    <div className="text-[13px] font-bold font-mono mt-0.5">{selectedPlot.telemetry.soilVWC}%</div>
                  </div>
                  <div className={`p-2 border rounded-[4px] ${isDark ? 'bg-[#0c1527] border-[#16233b]' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="text-[10px] text-slate-400 font-medium">{t('leafWetness') || 'Leaf Wetness'}</div>
                    <div className="text-[13px] font-bold font-mono mt-0.5">{selectedPlot.telemetry.leafWetness} hrs</div>
                  </div>
                </div>
              </div>

              {/* Actuators */}
              <div className="space-y-1.5 pt-1 border-t">
                <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                  {t('dripIrrigation') || 'Field Actuators'}
                </span>

                <div className="space-y-1.5">
                  <div className={`flex items-center justify-between p-2 border rounded-[4px] text-xs ${
                    isDark ? 'bg-[#0c1527] border-[#16233b]' : 'bg-white border-slate-200'
                  }`}>
                    <span className="font-semibold flex items-center gap-1.5">
                      <Droplets className="w-3.5 h-3.5 text-blue-500" />
                      {t('dripIrrigation') || 'Drip Irrigation'}
                    </span>
                    <div
                      onClick={() => handleToggleActuator(selectedPlot.id, 'dripOn')}
                      className={`switch-track ${selectedPlot.actuators.dripOn ? 'bg-[#1B5E20] switch-on' : 'bg-slate-600'}`}
                    >
                      <div className="switch-thumb"></div>
                    </div>
                  </div>

                  <div className={`flex items-center justify-between p-2 border rounded-[4px] text-xs ${
                    isDark ? 'bg-[#0c1527] border-[#16233b]' : 'bg-white border-slate-200'
                  }`}>
                    <span className="font-semibold flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      {t('mistingSprayer') || 'Misting Sprayer'}
                    </span>
                    <div
                      onClick={() => handleToggleActuator(selectedPlot.id, 'mistingOn')}
                      className={`switch-track ${selectedPlot.actuators.mistingOn ? 'bg-[#1B5E20] switch-on' : 'bg-slate-600'}`}
                    >
                      <div className="switch-thumb"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onNavigate('smartScanner')}
                className="w-full py-2.5 bg-[#1B5E20] hover:bg-[#154D1A] text-white font-bold text-xs rounded-[5px] shadow-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Scan className="w-4 h-4" />
                <span>{t('diagnoseCropLeaf') || 'Diagnose Leaf with AI'}</span>
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
