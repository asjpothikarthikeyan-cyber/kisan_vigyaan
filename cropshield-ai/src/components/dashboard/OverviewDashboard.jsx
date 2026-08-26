import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polygon, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useApp } from '../../context/AppContext';
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
  HelpCircle
} from 'lucide-react';

// Dynamic Map Controller to auto-fit farm bounds or fly to selected plot
function MapController({ selectedPlot, farmBounds }) {
  const map = useMap();
  useEffect(() => {
    if (farmBounds) {
      map.fitBounds(farmBounds, { padding: [35, 35], maxZoom: 17 });
    }
  }, [map]);

  useEffect(() => {
    if (selectedPlot?.center) {
      map.flyTo(selectedPlot.center, 16.5, { duration: 0.8 });
    }
  }, [selectedPlot, map]);

  return null;
}

// 6 Georeferenced Farm Plots in Sangli, Maharashtra (Gat No. 114, Kupwad)
const geospatialPlots = [
  {
    id: 'plot-1',
    labelCode: 'P1',
    name: 'Plot 1 - Rice Field',
    block: 'Block A',
    crop: 'Rice (Paddy)',
    variety: 'MTU 1010',
    acreage: '2.5 Acres',
    sowingDate: '2026-06-15',
    growthStage: 'Tillering & Vegetative',
    healthScore: 94,
    statusType: 'normal',
    statusLabel: 'Optimal Health',
    soilType: 'Heavy Clay Loam',
    yieldEst: '3,850 kg',
    yieldPotential: '4,200 kg',
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
    block: 'Block B',
    crop: 'Cotton (Bt Hybrid)',
    variety: 'RCH-2 Bt II',
    acreage: '3.0 Acres',
    sowingDate: '2026-05-20',
    growthStage: 'Square & Flowering',
    healthScore: 32,
    statusType: 'critical',
    statusLabel: 'Critical Outbreak',
    soilType: 'Medium Black Soil',
    yieldEst: '1,450 kg',
    yieldPotential: '3,600 kg',
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
    actionRequired: 'URGENT: Spray Streptocycline (0.5g/L) + Copper Oxychloride (2.5g/L) within 24h to arrest spread.',
    actuators: { dripOn: false, mistingOn: false, fertigationOn: false },
    harvestEta: '62 Days'
  },
  {
    id: 'plot-3',
    labelCode: 'P3',
    name: 'Plot 3 - Sugarcane',
    block: 'Block A',
    crop: 'Sugarcane',
    variety: 'Co 86032',
    acreage: '2.8 Acres',
    sowingDate: '2026-02-10',
    growthStage: 'Grand Growth Phase',
    healthScore: 88,
    statusType: 'normal',
    statusLabel: 'Good Condition',
    soilType: 'Deep Black Cotton',
    yieldEst: '115 Tonnes',
    yieldPotential: '130 Tonnes',
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
    block: 'Block B',
    crop: 'Tomato',
    variety: 'Abhinav F1',
    acreage: '1.8 Acres',
    sowingDate: '2026-06-01',
    growthStage: 'Fruit Development',
    healthScore: 58,
    statusType: 'warning',
    statusLabel: 'Early Blight Warning',
    soilType: 'Red Sandy Loam',
    yieldEst: '1,800 kg',
    yieldPotential: '2,900 kg',
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
    actionRequired: 'ADVISORY: Foliar spray of Mancozeb 75% WP (2.0g/L) suggested within 48h.',
    actuators: { dripOn: true, mistingOn: true, fertigationOn: false },
    harvestEta: '28 Days'
  },
  {
    id: 'plot-5',
    labelCode: 'P5',
    name: 'Plot 5 - Soybean',
    block: 'Block B',
    crop: 'Soybean',
    variety: 'JS 335',
    acreage: '2.2 Acres',
    sowingDate: '2026-06-25',
    growthStage: 'Pod Initiation',
    healthScore: 84,
    statusType: 'normal',
    statusLabel: 'Normal Growth',
    soilType: 'Medium Black Soil',
    yieldEst: '2,400 kg',
    yieldPotential: '2,800 kg',
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
    block: 'Block A',
    crop: 'Chickpea / Gram',
    variety: 'Vijay Phule',
    acreage: '2.2 Acres',
    sowingDate: '2026-06-20',
    growthStage: 'Vegetative Branching',
    healthScore: 91,
    statusType: 'normal',
    statusLabel: 'Vigorous Health',
    soilType: 'Well-Drained Loam',
    yieldEst: '1,950 kg',
    yieldPotential: '2,100 kg',
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
  { day: 'Day -6', date: '20 Aug', title: 'Baseline State', alertCount: 0, criticalPlots: [], log: 'All 6 plots showing normal vegetative vigor (NDVI avg: 0.84).' },
  { day: 'Day -5', date: '21 Aug', title: 'Humidity Inflow', alertCount: 1, criticalPlots: [], log: 'Relative humidity rose to 82%. Micro-climate advisory issued for Block B.' },
  { day: 'Day -4', date: '22 Aug', title: 'Bacterial Spike', alertCount: 2, criticalPlots: ['plot-2'], log: 'Plot 2 (Cotton) detected with initial angular leaf lesions (Xanthomonas).' },
  { day: 'Day -3', date: '23 Aug', title: 'Early Blight Spots', alertCount: 2, criticalPlots: ['plot-2', 'plot-4'], log: 'Plot 4 (Tomato) developed concentric target-spot early blight lesions.' },
  { day: 'Day -2', date: '24 Aug', title: 'Outbreak Escalation', alertCount: 3, criticalPlots: ['plot-2', 'plot-4'], log: 'KVK Sangli verified Bacterial Blight spread across Plot 2 quadrant.' },
  { day: 'Day -1', date: '25 Aug', title: 'Spray Pre-booking', alertCount: 3, criticalPlots: ['plot-2', 'plot-4'], log: 'Antibiotic foliar spray ordered; drip irrigation paused in infected block.' },
  { day: 'Today', date: '26 Aug (Live)', title: 'Active Command', alertCount: 3, criticalPlots: ['plot-2'], log: 'Live satellite & IoT telemetry actively streaming. Immediate spray advised for Plot 2.' }
];

export const OverviewDashboard = ({ onNavigate }) => {
  const { lang, t } = useApp();
  
  const [selectedPlotId, setSelectedPlotId] = useState('plot-2');
  const [selectedPlot, setSelectedPlot] = useState(() => geospatialPlots.find(p => p.id === 'plot-2'));
  const [plotsData, setPlotsData] = useState(geospatialPlots);

  const [mapLayer, setMapLayer] = useState('satellite');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [leftNavCollapsed, setLeftNavCollapsed] = useState(false);
  const [blockAOpen, setBlockAOpen] = useState(true);
  const [blockBOpen, setBlockBOpen] = useState(true);

  const [timelineOpen, setTimelineOpen] = useState(true);
  const [selectedTimelineIndex, setSelectedTimelineIndex] = useState(6);

  const farmBounds = [
    [16.8570, 74.6010],
    [16.8675, 74.6120]
  ];

  const handleToggleActuator = (plotId, actuatorKey) => {
    setPlotsData(prev => prev.map(p => {
      if (p.id === plotId) {
        const updatedActuators = { ...p.actuators, [actuatorKey]: !p.actuators[actuatorKey] };
        const updatedPlot = { ...p, actuators: updatedActuators };
        if (selectedPlot.id === plotId) setSelectedPlot(updatedPlot);
        return updatedPlot;
      }
      return p;
    }));
  };

  const handleSelectPlot = (plot) => {
    setSelectedPlotId(plot.id);
    setSelectedPlot(plot);
  };

  const filteredPlots = plotsData.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.variety.toLowerCase().includes(searchQuery.toLowerCase());
    if (statusFilter === 'all') return matchesSearch;
    return matchesSearch && p.statusType === statusFilter;
  });

  const blockAPlots = filteredPlots.filter(p => p.block === 'Block A');
  const blockBPlots = filteredPlots.filter(p => p.block === 'Block B');

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
      fillOpacity: isSelected ? 0.65 : 0.40,
      color: isSelected ? '#FFFFFF' : borderColor,
      weight: isSelected ? 3.5 : 2,
      dashArray: isSelected ? '' : '2, 3',
      lineCap: 'round',
      lineJoin: 'round'
    };
  };

  return (
    <div className="flex flex-col h-[calc(100vh-68px)] select-none bg-[#F4F6F4] text-slate-900 overflow-hidden font-sans">
      {/* 1. Global High-Contrast Precision AgriTech KPI Top Strip */}
      <div className="bg-white border-b border-slate-200 px-4 py-2 shrink-0 z-20 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-[4px] bg-[#1B5E20] text-white flex items-center justify-center font-bold text-[11px] shadow-xs">
              <Wheat className="w-3.5 h-3.5" />
            </div>
            <div className="flex items-center gap-1.5 text-slate-800 font-semibold text-[13px]">
              <span>Sangli Central Farm</span>
              <span className="text-slate-400">/</span>
              <span className="text-[#1B5E20] font-bold">Gat No. 114 (14.5 Acres)</span>
            </div>
            <span className="hidden md:inline-block px-2 py-0.2 rounded text-[10px] font-mono font-bold bg-emerald-50 text-[#1B5E20] border border-emerald-200">
              Sentinel-2 10m GIS Active
            </span>
          </div>

          {/* Thin Inline Stat Blocks */}
          <div className="flex items-center divide-x divide-slate-200 text-xs">
            <div className="px-3 py-0.5">
              <span className="text-[10px] uppercase font-semibold text-slate-500 block">Avg. Health</span>
              <strong className="text-[13px] font-bold text-[#1B5E20]">71%</strong>
            </div>

            <div className="px-3 py-0.5">
              <span className="text-[10px] uppercase font-semibold text-slate-500 block">Active Outbreaks</span>
              <strong className="text-[13px] font-bold text-rose-600">3 Plots</strong>
            </div>

            <div className="px-3 py-0.5">
              <span className="text-[10px] uppercase font-semibold text-slate-500 block">IoT Telemetry</span>
              <strong className="text-[13px] font-bold text-slate-800 font-mono">24/24 Online</strong>
            </div>

            <div className="px-3 py-0.5 hidden sm:block">
              <span className="text-[10px] uppercase font-semibold text-slate-500 block">Yield Forecast</span>
              <strong className="text-[13px] font-bold text-slate-800">12,400 kg</strong>
            </div>

            <div className="px-3 py-0.5 hidden lg:block">
              <span className="text-[10px] uppercase font-semibold text-slate-500 block">Micro-Climate</span>
              <strong className="text-[13px] font-bold text-slate-700">29.4°C • 65% RH</strong>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onNavigate('smartScanner')}
              className="px-3 py-1.5 bg-[#1B5E20] hover:bg-[#154D1A] text-white font-semibold text-[11px] rounded-[5px] shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Scan className="w-3.5 h-3.5" />
              <span>Smart Leaf Scan</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Geospatial Tri-Pane Work Area */}
      <div className="flex-1 flex min-h-0 relative">
        {/* PANE A: Left Collapsible Farm/Plot Hierarchy Navigator Tree (~22% width) */}
        <div className={`
          border-r border-slate-200 bg-white flex flex-col justify-between transition-all duration-200 shrink-0 z-10
          ${leftNavCollapsed ? 'w-12' : 'w-72 lg:w-80'}
        `}>
          {!leftNavCollapsed ? (
            <div className="flex-1 flex flex-col min-h-0">
              <div className="p-3 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-1.5 font-bold text-xs text-slate-800">
                  <Wheat className="w-4 h-4 text-[#1B5E20]" />
                  <span>Farm Hierarchy Navigator</span>
                </div>
                <button
                  onClick={() => setLeftNavCollapsed(true)}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100"
                  title="Collapse Navigator"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>

              <div className="p-2.5 space-y-2 border-b border-slate-100 bg-slate-50/70">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
                  <input
                    type="text"
                    placeholder="Search plot, crop, hybrid..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-2 py-1 bg-white border border-slate-200 rounded-[5px] text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1B5E20]"
                  />
                </div>

                <div className="flex items-center gap-1 overflow-x-auto text-[10px] font-semibold">
                  {[
                    { id: 'all', label: 'All (6)' },
                    { id: 'normal', label: 'Healthy (4)' },
                    { id: 'warning', label: 'Warning (1)' },
                    { id: 'critical', label: 'Critical (1)' }
                  ].map(f => (
                    <button
                      key={f.id}
                      onClick={() => setStatusFilter(f.id)}
                      className={`px-2 py-0.5 rounded-[4px] transition-colors cursor-pointer ${
                        statusFilter === f.id
                          ? 'bg-[#1B5E20] text-white'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-2 space-y-2 text-xs">
                {/* BLOCK A */}
                <div className="border border-slate-200 rounded-[5px] overflow-hidden bg-white shadow-xs">
                  <button
                    onClick={() => setBlockAOpen(!blockAOpen)}
                    className="w-full flex items-center justify-between p-2 bg-slate-50 hover:bg-slate-100 text-left font-bold text-slate-800 transition-colors"
                  >
                    <div className="flex items-center space-x-1.5">
                      <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${blockAOpen ? '' : '-rotate-90'}`} />
                      <span>Block A: Cereals & Pulses (7.5 Ac)</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 font-bold">
                      3 Healthy
                    </span>
                  </button>

                  {blockAOpen && (
                    <div className="divide-y divide-slate-100 pl-3">
                      {blockAPlots.map(plot => {
                        const isSel = selectedPlotId === plot.id;
                        return (
                          <div
                            key={plot.id}
                            onClick={() => handleSelectPlot(plot)}
                            className={`p-2.5 flex items-center justify-between cursor-pointer transition-colors ${
                              isSel 
                                ? 'bg-emerald-50/80 border-l-[3px] border-[#1B5E20]' 
                                : 'hover:bg-slate-50'
                            }`}
                          >
                            <div>
                              <div className="flex items-center space-x-1.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                                <h4 className={`font-bold text-[12px] ${isSel ? 'text-[#1B5E20]' : 'text-slate-800'}`}>
                                  {plot.name}
                                </h4>
                              </div>
                              <p className="text-[10px] text-slate-500 mt-0.5 ml-3.5">
                                {plot.crop} • {plot.acreage}
                              </p>
                            </div>

                            <div className="text-right">
                              <span className="font-bold text-xs text-[#1B5E20] block font-mono">{plot.healthScore}%</span>
                              <span className="text-[9px] text-slate-400 font-mono">NDVI {plot.telemetry.ndvirating}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* BLOCK B */}
                <div className="border border-slate-200 rounded-[5px] overflow-hidden bg-white shadow-xs">
                  <button
                    onClick={() => setBlockBOpen(!blockBOpen)}
                    className="w-full flex items-center justify-between p-2 bg-slate-50 hover:bg-slate-100 text-left font-bold text-slate-800 transition-colors"
                  >
                    <div className="flex items-center space-x-1.5">
                      <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${blockBOpen ? '' : '-rotate-90'}`} />
                      <span>Block B: Cash Crops & Veg (7.0 Ac)</span>
                    </div>
                    <span className="text-[10px] font-mono text-rose-700 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200 font-bold">
                      1 Critical • 1 Warn
                    </span>
                  </button>

                  {blockBOpen && (
                    <div className="divide-y divide-slate-100 pl-3">
                      {blockBPlots.map(plot => {
                        const isSel = selectedPlotId === plot.id;
                        const isCrit = plot.statusType === 'critical';
                        const isWarn = plot.statusType === 'warning';

                        return (
                          <div
                            key={plot.id}
                            onClick={() => handleSelectPlot(plot)}
                            className={`p-2.5 flex items-center justify-between cursor-pointer transition-colors ${
                              isSel 
                                ? isCrit ? 'bg-rose-50 border-l-[3px] border-rose-600' : 'bg-emerald-50/80 border-l-[3px] border-[#1B5E20]' 
                                : 'hover:bg-slate-50'
                            }`}
                          >
                            <div>
                              <div className="flex items-center space-x-1.5">
                                <span className={`w-2 h-2 rounded-full ${isCrit ? 'bg-red-600' : isWarn ? 'bg-amber-500' : 'bg-emerald-600'}`}></span>
                                <h4 className={`font-bold text-[12px] ${isSel ? (isCrit ? 'text-rose-700' : 'text-[#1B5E20]') : 'text-slate-800'}`}>
                                  {plot.name}
                                </h4>
                              </div>
                              <p className="text-[10px] text-slate-500 mt-0.5 ml-3.5">
                                {plot.crop} • {plot.acreage}
                              </p>
                            </div>

                            <div className="text-right">
                              <span className={`font-bold text-xs block font-mono ${isCrit ? 'text-red-600' : isWarn ? 'text-amber-600' : 'text-[#1B5E20]'}`}>
                                {plot.healthScore}%
                              </span>
                              <span className="text-[9px] text-slate-400 font-mono">
                                {isCrit ? 'Bacterial Blight' : isWarn ? 'Early Blight' : 'Healthy'}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-2.5 border-t border-slate-100 bg-slate-50/80 text-[11px] text-slate-600 space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span className="flex items-center gap-1">
                    <Sun className="w-3.5 h-3.5 text-amber-500" /> Sangli Met Station
                  </span>
                  <span className="font-mono text-emerald-700 font-bold">29.4°C</span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span>Humidity: 65% • Wind: 12 km/h</span>
                  <span>Rain: 15%</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-3 flex flex-col items-center justify-between h-full">
              <button
                onClick={() => setLeftNavCollapsed(false)}
                className="p-2 text-slate-500 hover:text-slate-900 rounded hover:bg-slate-100"
                title="Expand Navigator"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="flex flex-col gap-2">
                {plotsData.map(p => (
                  <button
                    key={p.id}
                    onClick={() => handleSelectPlot(p)}
                    className={`w-8 h-8 rounded text-[10px] font-bold flex items-center justify-center border ${
                      selectedPlotId === p.id 
                        ? 'bg-[#1B5E20] text-white border-[#1B5E20]' 
                        : p.statusType === 'critical'
                        ? 'bg-red-50 text-red-700 border-red-200'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {p.labelCode}
                  </button>
                ))}
              </div>
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            </div>
          )}
        </div>

        {/* PANE B: Full-Bleed Geospatial Map Center Canvas (~50% width) */}
        <div className="flex-1 flex flex-col min-w-0 relative bg-slate-950">
          <div className="absolute top-3 left-3 z-[400] flex items-center gap-1 bg-white/95 backdrop-blur-md p-1 rounded-[6px] border border-slate-200 shadow-md text-xs">
            <span className="text-[10px] font-bold text-slate-500 uppercase px-1.5">Layer:</span>
            {[
              { id: 'satellite', label: 'Satellite' },
              { id: 'ndvi', label: 'NDVI Vegetation' },
              { id: 'terrain', label: 'Topographic' }
            ].map(l => (
              <button
                key={l.id}
                onClick={() => setMapLayer(l.id)}
                className={`px-2.5 py-1 rounded-[4px] text-[11px] font-semibold transition-colors cursor-pointer ${
                  mapLayer === l.id 
                    ? 'bg-[#1B5E20] text-white shadow-xs' 
                    : 'bg-transparent text-slate-700 hover:bg-slate-100'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="absolute top-3 right-3 z-[400] flex items-center gap-1.5 bg-white/95 backdrop-blur-md p-1 rounded-[6px] border border-slate-200 shadow-md text-xs">
            <button
              onClick={() => handleSelectPlot(selectedPlot)}
              className="px-2 py-1 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-[4px] flex items-center gap-1 font-semibold text-[11px]"
              title="Recenter Map"
            >
              <RotateCcw className="w-3 h-3 text-[#1B5E20]" />
              <span>Center</span>
            </button>
          </div>

          <div className="flex-1 w-full h-full relative">
            <MapContainer
              center={[16.8622, 74.6065]}
              zoom={16}
              scrollWheelZoom={true}
              className="w-full h-full"
              style={{ background: '#0e1626' }}
            >
              <MapController selectedPlot={selectedPlot} farmBounds={farmBounds} />

              <TileLayer
                attribution='&copy; <a href="https://www.esri.com/">Esri</a>, ISRO Bhuvan'
                url={tileUrls[mapLayer] || tileUrls.satellite}
                maxZoom={19}
              />

              {plotsData.map((plot) => {
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
                    <Tooltip direction="top" offset={[0, -5]} opacity={0.98} permanent={true} sticky>
                      <div className="p-0.5 text-slate-900 font-sans text-xs min-w-32 text-center">
                        <div className="font-bold text-[11px] flex items-center justify-center gap-1">
                          <span className={`w-2 h-2 rounded-full ${isCritical ? 'bg-red-600' : isWarning ? 'bg-amber-500' : 'bg-emerald-600'}`}></span>
                          <span>{plot.name}</span>
                        </div>
                        <div className="text-[10px] text-slate-600 mt-0.5 font-mono">
                          {plot.crop} • <strong className={isCritical ? 'text-red-600 font-bold' : isWarning ? 'text-amber-600 font-bold' : 'text-emerald-700 font-bold'}>{plot.healthScore}%</strong>
                        </div>
                      </div>
                    </Tooltip>
                  </Polygon>
                );
              })}
            </MapContainer>

            {/* Health Color Legend */}
            <div className="absolute bottom-3 left-3 z-[400] bg-white/95 backdrop-blur-md p-2.5 rounded-[6px] border border-slate-200 shadow-md text-xs space-y-1.5">
              <span className="text-[10px] font-bold uppercase text-slate-500 block">Health Index Status</span>
              <div className="flex flex-col gap-1 text-[11px] font-medium text-slate-700">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-[2px] bg-emerald-600"></span>
                  <span>&gt;80% Optimal Health (4 Plots)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-[2px] bg-amber-500"></span>
                  <span>50-80% Water / Foliar Stress (Plot 4)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-[2px] bg-red-600"></span>
                  <span>&lt;50% Critical Bacterial Blight (Plot 2)</span>
                </div>
              </div>
            </div>
          </div>

          {/* PANE B2: Bottom-Docked Collapsible 7-Day Alert Timeline Scrubber */}
          <div className="border-t border-slate-200 bg-white p-2.5 z-20 shadow-xs shrink-0">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center space-x-2">
                <Clock className="w-3.5 h-3.5 text-[#1B5E20]" />
                <span className="font-bold text-xs text-slate-800">
                  7-Day Outbreak Progression & Telemetry Timeline
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded font-semibold">
                  {timelineEvents[selectedTimelineIndex].date}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-[11px] text-slate-500 font-medium">
                  {timelineEvents[selectedTimelineIndex].title}
                </span>
                <button
                  onClick={() => setTimelineOpen(!timelineOpen)}
                  className="text-slate-400 hover:text-slate-700 p-0.5"
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
                            ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                            : hasCrit
                            ? 'bg-red-50 text-red-800 border-red-200 hover:bg-red-100'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold font-mono">{evt.day}</span>
                          {hasCrit && <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>}
                        </div>
                        <div className="text-[9px] truncate mt-0.5 opacity-90">{evt.title}</div>
                      </button>
                    );
                  })}
                </div>

                <div className="p-1.5 bg-slate-50 border border-slate-200 rounded-[4px] text-[11px] text-slate-700 flex items-center justify-between">
                  <span className="truncate">
                    <strong>Event Log:</strong> {timelineEvents[selectedTimelineIndex].log}
                  </span>
                  <span className="text-[10px] font-mono text-[#1B5E20] font-bold shrink-0 ml-2">
                    {timelineEvents[selectedTimelineIndex].alertCount} Active Alerts
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* PANE C: Right-Side Live Telemetry & Micro-Actuators Slide-Out Panel (~28-30% width) */}
        <div className="w-80 lg:w-96 border-l border-slate-200 bg-white flex flex-col justify-between overflow-y-auto shrink-0 z-10 p-3.5 space-y-3.5 shadow-sm">
          {selectedPlot ? (
            <div className="space-y-3">
              {/* Header */}
              <div className="border-b border-slate-100 pb-2.5">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200 uppercase">
                      {selectedPlot.block} • {selectedPlot.acreage}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-1">
                      {selectedPlot.name}
                    </h3>
                    <p className="text-xs text-slate-600 font-medium mt-0.5">
                      {selectedPlot.crop} ({selectedPlot.variety})
                    </p>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase tracking-wider ${
                    selectedPlot.statusType === 'critical'
                      ? 'bg-red-50 text-red-800 border border-red-200'
                      : selectedPlot.statusType === 'warning'
                      ? 'bg-amber-50 text-amber-800 border border-amber-200'
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  }`}>
                    {selectedPlot.statusLabel}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1.5 pt-1.5 border-t border-slate-100">
                  <span>Sown: {selectedPlot.sowingDate}</span>
                  <span className="font-mono text-slate-400">{selectedPlot.telemetry.lastSync}</span>
                </div>
              </div>

              {/* Action Alert Banner */}
              {selectedPlot.actionRequired && (
                <div className={`p-2.5 rounded-[5px] border text-xs leading-relaxed ${
                  selectedPlot.statusType === 'critical'
                    ? 'bg-red-50 text-red-900 border-red-300'
                    : 'bg-amber-50 text-amber-900 border-amber-300'
                }`}>
                  <div className="flex items-center gap-1 font-bold mb-1">
                    <AlertOctagon className="w-3.5 h-3.5 text-red-600 shrink-0" />
                    <span>{selectedPlot.diseaseName}</span>
                  </div>
                  <p className="text-[11px]">{selectedPlot.actionRequired}</p>
                </div>
              )}

              {/* Crop Health Index + Sparkline */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-[5px] space-y-1.5">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-500 block">
                      Crop Health Index (NDVI)
                    </span>
                    <div className="flex items-baseline space-x-1.5 mt-0.5">
                      <strong className={`text-xl font-bold font-mono ${
                        selectedPlot.statusType === 'critical' 
                          ? 'text-red-600' 
                          : selectedPlot.statusType === 'warning' 
                          ? 'text-amber-600' 
                          : 'text-[#1B5E20]'
                      }`}>
                        {selectedPlot.healthScore}%
                      </strong>
                      <span className={`text-xs font-bold font-mono ${
                        selectedPlot.delta.startsWith('-') ? 'text-red-600' : 'text-emerald-700'
                      }`}>
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
                    <span className="text-[9px] font-mono text-slate-400">7-Day Trajectory</span>
                  </div>
                </div>
              </div>

              {/* Live Micro-Telemetry Sensors Grid */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                  Live Micro-Telemetry Sensors
                </span>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-slate-50 border border-slate-200 rounded-[4px]">
                    <div className="text-[10px] text-slate-500 font-medium">Canopy Temp</div>
                    <div className="text-[13px] font-bold text-slate-800 font-mono mt-0.5">
                      {selectedPlot.telemetry.canopyTemp}°C
                    </div>
                  </div>

                  <div className="p-2 bg-slate-50 border border-slate-200 rounded-[4px]">
                    <div className="text-[10px] text-slate-500 font-medium">Rel. Humidity</div>
                    <div className="text-[13px] font-bold text-slate-800 font-mono mt-0.5">
                      {selectedPlot.telemetry.humidity}%
                    </div>
                  </div>

                  <div className="p-2 bg-slate-50 border border-slate-200 rounded-[4px]">
                    <div className="text-[10px] text-slate-500 font-medium">Soil VWC Moisture</div>
                    <div className="text-[13px] font-bold text-slate-800 font-mono mt-0.5">
                      {selectedPlot.telemetry.soilVWC}%
                    </div>
                  </div>

                  <div className="p-2 bg-slate-50 border border-slate-200 rounded-[4px]">
                    <div className="text-[10px] text-slate-500 font-medium">Leaf Wetness</div>
                    <div className="text-[13px] font-bold text-slate-800 font-mono mt-0.5">
                      {selectedPlot.telemetry.leafWetness} hrs
                    </div>
                  </div>
                </div>
              </div>

              {/* Yield Forecast */}
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-[5px] text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-600 font-medium">Harvest ETA: <strong>{selectedPlot.harvestEta}</strong></span>
                  <span className="text-[11px] font-bold text-[#1B5E20] font-mono">{selectedPlot.yieldEst}</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#1B5E20] rounded-full"
                    style={{ width: `${selectedPlot.healthScore}%` }}
                  ></div>
                </div>
              </div>

              {/* Actuators */}
              <div className="space-y-1.5 pt-1 border-t border-slate-100">
                <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                  Field Actuators & Irrigation
                </span>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between p-2 bg-white border border-slate-200 rounded-[4px] text-xs">
                    <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                      <Droplets className="w-3.5 h-3.5 text-blue-600" />
                      Drip Irrigation
                    </span>
                    <div
                      onClick={() => handleToggleActuator(selectedPlot.id, 'dripOn')}
                      className={`switch-track ${selectedPlot.actuators.dripOn ? 'bg-[#1B5E20] switch-on' : 'bg-slate-300'}`}
                    >
                      <div className="switch-thumb"></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2 bg-white border border-slate-200 rounded-[4px] text-xs">
                    <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-600" />
                      Misting Sprayer
                    </span>
                    <div
                      onClick={() => handleToggleActuator(selectedPlot.id, 'mistingOn')}
                      className={`switch-track ${selectedPlot.actuators.mistingOn ? 'bg-[#1B5E20] switch-on' : 'bg-slate-300'}`}
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
                <span>Diagnose {selectedPlot.crop} Leaf with AI</span>
              </button>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <Wheat className="w-8 h-8 text-slate-300 mb-2" />
              <p className="text-xs font-semibold text-slate-600">Select any plot polygon on the map to inspect live micro-telemetry</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
