import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import { useApp } from '../../context/AppContext';
import { speakText } from '../../utils/speechUtils';
import { maharashtraDivisions, maharashtraDistricts } from '../../data/maharashtraSurveillanceData';
import { 
  Satellite, 
  Layers, 
  Search, 
  MapPin, 
  Crosshair, 
  RotateCcw, 
  Maximize2, 
  Play, 
  Pause, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  Sliders, 
  Activity, 
  Sun, 
  CloudRain, 
  Droplets, 
  Eye, 
  CheckCircle2, 
  AlertTriangle, 
  AlertOctagon, 
  ShieldCheck, 
  Filter, 
  Sparkles, 
  Volume2, 
  Calendar,
  X,
  CheckSquare,
  Square,
  Compass
} from 'lucide-react';

// Custom Pin Markers with dynamic health indicator glow
const createGisMarker = (status, score) => {
  const color = status === 'critical' || score < 50 
    ? '#ef4444' 
    : status === 'warning' || score < 75 
    ? '#f59e0b' 
    : '#22c55e';

  return L.divIcon({
    className: 'gis-pin-node',
    html: `<div style="
      background-color: ${color};
      width: 26px;
      height: 26px;
      border-radius: 50%;
      border: 3px solid #ffffff;
      box-shadow: 0 0 14px ${color}, 0 2px 6px rgba(0,0,0,0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: 900;
      color: white;
      font-family: sans-serif;
    ">${score ? Math.round(score) : ''}</div>`,
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -14]
  });
};

// Map Fly-To controller component
function MapCameraController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom, { duration: 1.2 });
    }
  }, [center, zoom, map]);
  return null;
}

// 6 Sangli Farm Plots with exact agricultural farmland coordinates & NDVI telemetry (Krishna River agricultural belt)
const sangliPlots = [
  { id: 'plot-1', name: 'Plot 1 - Rice (MTU 1010)', coords: [16.8635, 74.5420], ndvi: 0.78, health: 88, status: 'normal', crop: 'Rice (MTU 1010)', soilVWC: 41, statusEn: 'Vigorous Canopy' },
  { id: 'plot-2', name: 'Plot 2 - Cotton (Bt Hybrid)', coords: [16.8560, 74.5315], ndvi: 0.38, health: 34, status: 'critical', crop: 'Bt Cotton', soilVWC: 22, statusEn: 'Bacterial Blight Active' },
  { id: 'plot-3', name: 'Plot 3 - Sugarcane (Co 86032)', coords: [16.8745, 74.5410], ndvi: 0.82, health: 91, status: 'normal', crop: 'Sugarcane', soilVWC: 44, statusEn: 'Grand Growth Stage' },
  { id: 'plot-4', name: 'Plot 4 - Tomato (Abhinav F1)', coords: [16.8490, 74.5390], ndvi: 0.54, health: 64, status: 'warning', crop: 'Tomato', soilVWC: 32, statusEn: 'Early Blight Warning' },
  { id: 'plot-5', name: 'Plot 5 - Soybean (JS 335)', coords: [16.8685, 74.5290], ndvi: 0.74, health: 85, status: 'normal', crop: 'Soybean', soilVWC: 36, statusEn: 'Pod Formation Normal' },
  { id: 'plot-6', name: 'Plot 6 - Pulses (Vijay Gram)', coords: [16.8820, 74.5370], ndvi: 0.79, health: 89, status: 'normal', crop: 'Gram / Pulses', soilVWC: 38, statusEn: 'Branching Phase Healthy' }
];

export const WebGISCommandMap = ({ onNavigate }) => {
  const { lang, t, theme, isLanguageChanging } = useApp();
  const isDark = theme === 'dark';

  // GIS Layer State: 'satellite' | 'terrain' | 'ndvi' | 'rainfall' | 'hotspots'
  const [activeLayer, setActiveLayer] = useState('ndvi');
  
  // Navigation Hierarchy: State > Division > District > Plot
  const [selectedDivision, setSelectedDivision] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState(maharashtraDistricts.find(d => d.id === 'sangli'));
  const [selectedPlot, setSelectedPlot] = useState(null);

  // Map Camera State - Focused directly over lush agricultural farm fields
  const defaultStateCenter = [19.2502, 76.7800]; // Central Maharashtra
  const [mapCenter, setMapCenter] = useState([16.8620, 74.5380]); // Farmland Center
  const [mapZoom, setMapZoom] = useState(14);

  // Search Autocomplete State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Sidebar Filter Chip: 'all' | 'healthy' | 'warning' | 'critical'
  const [sidebarFilter, setSidebarFilter] = useState('all');

  // Compare Mode State
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [comparedItems, setComparedItems] = useState([maharashtraDistricts[0], maharashtraDistricts[5]]); // Sangli & Yavatmal default

  // Timeline Scrubber State (Days ago: -30 to 0)
  const [timelineDay, setTimelineDay] = useState(0); // 0 = Today, -7, -14, -21, -30
  const [isPlayingTimeline, setIsPlayingTimeline] = useState(false);

  // Legend Collapse State
  const [isLegendOpen, setIsLegendOpen] = useState(true);

  // Expanded Tree Divisions
  const [expandedDivisions, setExpandedDivisions] = useState({
    western: true,
    vidarbha: false,
    marathwada: false,
    north: false,
    konkan: false
  });

  // Tile layer URL based on mode
  const getTileLayerUrl = () => {
    switch (activeLayer) {
      case 'satellite':
      case 'ndvi':
      case 'hotspots':
        return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      case 'terrain':
        return 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
      case 'rainfall':
        return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      default:
        return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    }
  };

  // Timeline Animation Loop
  useEffect(() => {
    let interval = null;
    if (isPlayingTimeline) {
      interval = setInterval(() => {
        setTimelineDay(prev => {
          if (prev <= -30) return 0;
          return prev - 7;
        });
      }, 1400);
    }
    return () => clearInterval(interval);
  }, [isPlayingTimeline]);

  // Autocomplete Search Handler
  const handleSearchChange = (q) => {
    setSearchQuery(q);
    if (!q.trim()) {
      setSearchResults([]);
      return;
    }
    const lower = q.toLowerCase();
    
    // Search districts
    const matchedDistricts = maharashtraDistricts.filter(d => 
      d.nameEn.toLowerCase().includes(lower) || 
      (d.nameMr && d.nameMr.includes(q)) || 
      d.primaryCrop.toLowerCase().includes(lower)
    ).map(d => ({ type: 'district', item: d, label: `${d.nameEn} District (${d.primaryCrop})` }));

    // Search plots
    const matchedPlots = sangliPlots.filter(p => 
      p.name.toLowerCase().includes(lower) || 
      p.crop.toLowerCase().includes(lower)
    ).map(p => ({ type: 'plot', item: p, label: `Sangli: ${p.name}` }));

    setSearchResults([...matchedDistricts, ...matchedPlots].slice(0, 6));
  };

  const handleSelectSearchResult = (result) => {
    if (result.type === 'district') {
      handleSelectDistrict(result.item);
    } else {
      handleSelectPlot(result.item);
    }
    setSearchQuery('');
    setSearchResults([]);
    setIsSearchFocused(false);
  };

  const handleSelectDistrict = (district) => {
    setSelectedDistrict(district);
    setSelectedPlot(null);
    if (district.id === 'sangli') {
      setMapCenter([16.8620, 74.5380]);
      setMapZoom(14);
    } else {
      setMapCenter(district.coordinates);
      setMapZoom(11);
    }
  };

  const handleSelectPlot = (plot) => {
    setSelectedPlot(plot);
    setMapCenter(plot.coords);
    setMapZoom(14);
  };

  const handleResetToState = () => {
    setSelectedDistrict(null);
    setSelectedPlot(null);
    setSelectedDivision('all');
    setMapCenter(defaultStateCenter);
    setMapZoom(7);
  };

  const handleLocateMe = () => {
    const plot2 = sangliPlots[1]; // Focus on user farm Plot 2
    handleSelectPlot(plot2);
  };

  const toggleDivisionExpand = (divId) => {
    setExpandedDivisions(prev => ({ ...prev, [divId]: !prev[divId] }));
  };

  const toggleCompareItem = (item) => {
    setComparedItems(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) {
        return prev.filter(i => i.id !== item.id);
      }
      if (prev.length >= 3) {
        return [prev[1], prev[2], item];
      }
      return [...prev, item];
    });
  };

  // Filter districts based on sidebar chip
  const getFilteredDistricts = (districts) => {
    return districts.filter(d => {
      if (sidebarFilter === 'healthy') return d.healthScore >= 75;
      if (sidebarFilter === 'warning') return d.healthScore >= 50 && d.healthScore < 75;
      if (sidebarFilter === 'critical') return d.healthScore < 50;
      return true;
    });
  };

  return (
    <div className={`space-y-4 transition-opacity duration-200 pb-16 ${
      isLanguageChanging ? 'opacity-70 scale-[0.995]' : 'opacity-100 scale-100'
    }`}>
      
      {/* 1. TOP GIS BREADCRUMB & COMMAND BAR */}
      <div className={`p-4 sm:p-5 rounded-3xl border flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-sm ${
        isDark ? 'bg-[#0a1324] border-[#182a4a]' : 'bg-white border-slate-200'
      }`}>
        {/* Clickable Breadcrumbs (Jump back up levels) */}
        <div className="flex items-center flex-wrap gap-1.5 text-xs font-black">
          <button
            onClick={handleResetToState}
            className="text-slate-500 hover:text-[#1B5E20] dark:hover:text-emerald-400 flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Compass className="w-4 h-4 text-[#1B5E20] dark:text-emerald-400" />
            <span>{t('gisBreadcrumbState', 'Maharashtra State (36 Districts)')}</span>
          </button>

          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />

          {selectedDistrict ? (
            <>
              <button
                onClick={() => {
                  setSelectedPlot(null);
                  setMapCenter(selectedDistrict.coordinates);
                  setMapZoom(11);
                }}
                className="text-slate-500 hover:text-[#1B5E20] dark:hover:text-emerald-400 cursor-pointer"
              >
                {lang === 'mr' ? selectedDistrict.nameMr : selectedDistrict.nameEn}
              </button>

              {selectedPlot && (
                <>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-[#1B5E20] dark:text-emerald-400 font-black">
                    {selectedPlot.name}
                  </span>
                </>
              )}
            </>
          ) : (
            <span className="text-[#1B5E20] dark:text-emerald-400 font-black">
              {t('allDivisions', 'All 6 Agro-Climatic Divisions')}
            </span>
          )}
        </div>

        {/* Top Right: Compare Mode & Satellite Telemetry Tag */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCompareMode(!isCompareMode)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shadow-xs ${
              isCompareMode 
                ? 'bg-cyan-500 text-slate-950 shadow-md ring-2 ring-cyan-400/40' 
                : isDark
                ? 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{isCompareMode ? t('exitCompare', 'Exit Compare') : t('compareMode', 'Compare Mode (2-3 Pins)')}</span>
          </button>

          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 dark:bg-emerald-950/60 text-[#1B5E20] dark:text-emerald-300 text-[11px] font-black rounded-full border border-emerald-300/40 font-mono shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            Sentinel-2B 10m Multi-spectral Pass
          </span>
        </div>
      </div>

      {/* 2. MAIN GIS WORKSPACE (Hierarchical Sidebar + Leaflet Satellite Canvas) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        
        {/* LEFT SIDEBAR: COLLAPSIBLE HIERARCHICAL TREE (4 cols on lg) */}
        <div className={`lg:col-span-4 rounded-3xl border shadow-sm flex flex-col h-[650px] overflow-hidden ${
          isDark ? 'bg-[#0a1324] border-[#182a4a]' : 'bg-white border-slate-200'
        }`}>
          
          {/* Sidebar Top: Sticky Filter Chips */}
          <div className="p-3.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-black text-slate-800 dark:text-slate-200">
              <span className="flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#1B5E20] dark:text-emerald-400" />
                <span>{t('treeNavigator', 'Geospatial Tree Navigator')}</span>
              </span>
              <span className="font-mono text-[11px] text-slate-400 font-bold">36 Nodes</span>
            </div>

            {/* Filter Chips */}
            <div className="flex items-center gap-1 overflow-x-auto text-[11px] font-black">
              {[
                { id: 'all', label: t('allFilter', 'All') },
                { id: 'healthy', label: `🟩 ${t('healthy')}` },
                { id: 'warning', label: `🟨 ${t('warning')}` },
                { id: 'critical', label: `🟥 ${t('critical')}` }
              ].map(chip => (
                <button
                  key={chip.id}
                  onClick={() => setSidebarFilter(chip.id)}
                  className={`px-2.5 py-1 rounded-xl transition-all shrink-0 cursor-pointer ${
                    sidebarFilter === chip.id
                      ? 'bg-[#1B5E20] text-white shadow-xs font-black scale-[1.02]'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          {/* Collapsible Tree Structure (Divisions > Districts > Plots) */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 text-xs">
            {maharashtraDivisions.filter(d => d.id !== 'all').map(div => {
              const isExpanded = expandedDivisions[div.id];
              const districtsInDiv = maharashtraDistricts.filter(d => d.divisionId === div.id);
              const filteredDistricts = getFilteredDistricts(districtsInDiv);

              if (filteredDistricts.length === 0 && sidebarFilter !== 'all') return null;

              return (
                <div 
                  key={div.id}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isExpanded 
                      ? 'border-slate-300 dark:border-slate-700 bg-slate-50/40 dark:bg-slate-900/40' 
                      : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  {/* Division Header */}
                  <button
                    onClick={() => toggleDivisionExpand(div.id)}
                    className="w-full p-2.5 flex items-center justify-between font-extrabold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center space-x-2">
                      {isExpanded ? <ChevronDown className="w-4 h-4 text-[#1B5E20]" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
                      <span>{div.nameEn}</span>
                    </div>
                    <span className="font-mono text-[10px] text-slate-400">
                      {districtsInDiv.length} dist
                    </span>
                  </button>

                  {/* Division Districts List */}
                  {isExpanded && (
                    <div className="pl-4 pr-2 pb-2 pt-1 space-y-1 divide-y divide-slate-100 dark:divide-slate-800">
                      {filteredDistricts.map(dist => {
                        const isDistSelected = selectedDistrict?.id === dist.id;
                        const isCompared = comparedItems.some(i => i.id === dist.id);

                        return (
                          <div key={dist.id} className="pt-1.5 space-y-1">
                            <div
                              onClick={() => handleSelectDistrict(dist)}
                              className={`p-2 rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                                isDistSelected 
                                  ? 'bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 text-[#1B5E20] dark:text-emerald-300 font-extrabold' 
                                  : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                              }`}
                            >
                              <div className="flex items-center space-x-2 truncate">
                                {isCompareMode && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleCompareItem(dist);
                                    }}
                                    className="text-slate-400 hover:text-[#1B5E20] cursor-pointer"
                                  >
                                    {isCompared ? <CheckSquare className="w-4 h-4 text-[#1B5E20]" /> : <Square className="w-4 h-4" />}
                                  </button>
                                )}
                                <span className="font-bold text-xs truncate">{dist.nameEn}</span>
                              </div>

                              {/* Health Score Mini Sparkline Pill */}
                              <div className="flex items-center space-x-1.5 shrink-0">
                                <span className={`px-1.5 py-0.2 rounded font-mono text-[10px] font-black ${
                                  dist.healthScore < 50 
                                    ? 'bg-rose-100 text-rose-700' 
                                    : dist.healthScore < 75 
                                    ? 'bg-amber-100 text-amber-700' 
                                    : 'bg-emerald-100 text-emerald-700'
                                }`}>
                                  {dist.healthScore}
                                </span>
                              </div>
                            </div>

                            {/* Nested Sangli Plots Tree */}
                            {dist.id === 'sangli' && isDistSelected && (
                              <div className="pl-4 space-y-1 pt-1 border-l-2 border-emerald-500/40 ml-3">
                                <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">
                                  Your Farm Sub-Plots (Miraj)
                                </span>
                                {sangliPlots.map(plot => {
                                  const isPlotSelected = selectedPlot?.id === plot.id;
                                  return (
                                    <div
                                      key={plot.id}
                                      onClick={() => handleSelectPlot(plot)}
                                      className={`p-1.5 rounded-lg flex items-center justify-between text-[11px] cursor-pointer transition-all ${
                                        isPlotSelected
                                          ? 'bg-[#1B5E20] text-white font-extrabold shadow-xs'
                                          : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                                      }`}
                                    >
                                      <span className="truncate">{plot.name}</span>
                                      <span className={`font-mono text-[10px] font-bold ${
                                        isPlotSelected ? 'text-emerald-200' : plot.health < 50 ? 'text-rose-500' : 'text-emerald-600'
                                      }`}>
                                        NDVI {plot.ndvi}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Sidebar Bottom: Quick Summary of Focused Item */}
          {selectedDistrict && (
            <div className={`p-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70 text-xs space-y-1.5 ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              <div className="flex items-center justify-between">
                <strong className="text-slate-900 dark:text-white font-extrabold">{selectedDistrict.nameEn} Overview</strong>
                <span className="text-[10px] text-cyan-600 font-mono font-bold">{selectedDistrict.activeSensors}</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">
                {selectedDistrict.alertTextEn}
              </p>
            </div>
          )}
        </div>

        {/* RIGHT GIS MAP CANVAS & FLOATING CONTROLS (8 cols on lg) */}
        <div className="lg:col-span-8 space-y-3">
          
          {/* Main Map Container Box */}
          <div className="relative w-full h-[580px] rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-slate-800 shadow-xl bg-slate-950">
            
            <MapContainer
              center={mapCenter}
              zoom={mapZoom}
              scrollWheelZoom={true}
              zoomControl={false} // Replaced by custom floating GIS cluster
              className="w-full h-full"
            >
              <MapCameraController center={mapCenter} zoom={mapZoom} />

              {/* Dynamic Tile Layer */}
              <TileLayer
                attribution='&copy; ESRI World Imagery, Sentinel-2 & OSM'
                url={getTileLayerUrl()}
              />

              {/* Render 36 District Center Pins */}
              {maharashtraDistricts.map(dist => (
                <Marker
                  key={dist.id}
                  position={dist.coordinates}
                  icon={createGisMarker(dist.statusType, dist.healthScore)}
                  eventHandlers={{
                    click: () => handleSelectDistrict(dist)
                  }}
                >
                  <Tooltip direction="top" offset={[0, -10]} opacity={0.95}>
                    <div className="p-1 font-sans text-xs">
                      <strong>{dist.nameEn} ({dist.healthScore}%)</strong>
                      <div className="text-[10px] text-slate-500">{dist.primaryCrop}</div>
                    </div>
                  </Tooltip>
                  <Popup>
                    <div className="p-1 space-y-1.5 max-w-xs text-xs font-sans">
                      <div className="flex items-center justify-between border-b pb-1">
                        <strong className="text-slate-900 font-black">{dist.nameEn} District</strong>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold text-white ${
                          dist.healthScore < 50 ? 'bg-rose-600' : dist.healthScore < 75 ? 'bg-amber-600' : 'bg-emerald-600'
                        }`}>
                          Health {dist.healthScore}%
                        </span>
                      </div>
                      <p className="text-slate-700 font-medium">{dist.cropEn}</p>
                      <div className="text-[11px] text-slate-500 bg-slate-50 p-1.5 rounded">
                        {dist.alertTextEn}
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}

              {/* Render Sangli High-Resolution Plot Boundaries if Sangli is selected */}
              {selectedDistrict?.id === 'sangli' && sangliPlots.map(plot => {
                const color = plot.status === 'critical' ? '#ef4444' : plot.status === 'warning' ? '#f59e0b' : '#22c55e';
                return (
                  <React.Fragment key={plot.id}>
                    <Circle
                      center={plot.coords}
                      radius={240}
                      pathOptions={{
                        fillColor: color,
                        fillOpacity: activeLayer === 'ndvi' ? 0.45 : 0.25,
                        color: color,
                        weight: selectedPlot?.id === plot.id ? 3 : 1.5,
                        dashArray: plot.status === 'critical' ? '4, 4' : null
                      }}
                    />

                    <Marker
                      position={plot.coords}
                      icon={createGisMarker(plot.status, plot.ndvi * 100)}
                      eventHandlers={{
                        click: () => handleSelectPlot(plot)
                      }}
                    >
                      <Tooltip direction="top" offset={[0, -10]} opacity={0.95}>
                        <div className="p-1 font-sans text-xs">
                          <strong>{plot.name}</strong>
                          <div className="text-[10px]">NDVI: {plot.ndvi} • {plot.crop}</div>
                        </div>
                      </Tooltip>
                    </Marker>
                  </React.Fragment>
                );
              })}
            </MapContainer>

            {/* 1. ON-MAP AUTOCOMPLETE SEARCH BOX (Top-Left) */}
            <div className="absolute top-4 left-4 z-[1000] w-72 max-w-full">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder={t('jumpToDistrictPlot', 'Jump to District or Plot...')}
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  className="w-full pl-9.5 pr-4 py-2 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-xs font-black text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 shadow-xl focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
                />
              </div>

              {/* Autocomplete Dropdown */}
              {isSearchFocused && searchResults.length > 0 && (
                <div className="mt-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                  {searchResults.map((res, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectSearchResult(res)}
                      className="w-full p-2.5 text-left hover:bg-emerald-50 dark:hover:bg-slate-800 flex items-center justify-between cursor-pointer"
                    >
                      <span className="font-black text-slate-800 dark:text-slate-200 truncate">{res.label}</span>
                      <span className="text-[10px] text-slate-400 uppercase font-mono font-bold">{res.type}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 2. STACKED ICON LAYER SWITCHER (Top-Right) */}
            <div className="absolute top-4 right-4 z-[1000] bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col gap-1">
              {[
                { id: 'ndvi', label: t('layerNdvi', '🌱 NDVI'), title: 'NDVI Vegetation Vigor Heatmap' },
                { id: 'satellite', label: t('layerSatellite', '🛰️ Satellite'), title: 'ESRI High-Res True Color' },
                { id: 'terrain', label: t('layerTerrain', '🗺️ Terrain'), title: 'Topographic Contours' },
                { id: 'rainfall', label: t('layerRainfall', '🌧️ Radar'), title: 'Moisture & Rainfall Overlay' }
              ].map(layer => (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  title={layer.title}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    activeLayer === layer.id
                      ? 'bg-[#1B5E20] text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {layer.label}
                </button>
              ))}
            </div>

            {/* 3. FLOATING GIS CONTROL CLUSTER (Bottom-Right) */}
            <div className="absolute bottom-6 right-4 z-[1000] flex flex-col gap-2">
              <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col overflow-hidden">
                <button
                  onClick={() => setMapZoom(prev => Math.min(prev + 1, 18))}
                  className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-black text-sm cursor-pointer"
                  title="Zoom In"
                >
                  +
                </button>
                <div className="h-px bg-slate-200 dark:bg-slate-800" />
                <button
                  onClick={() => setMapZoom(prev => Math.max(prev - 1, 6))}
                  className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-black text-sm cursor-pointer"
                  title="Zoom Out"
                >
                  −
                </button>
              </div>

              {/* Reset to Full Maharashtra State View */}
              <button
                onClick={handleResetToState}
                className="p-2.5 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-800 shadow-xl cursor-pointer"
                title={t('resetStateView', 'Reset to Full Maharashtra State View')}
              >
                <RotateCcw className="w-4 h-4 text-[#1B5E20] dark:text-emerald-400" />
              </button>

              {/* Locate-Me / GPS Focus */}
              <button
                onClick={handleLocateMe}
                className="p-2.5 rounded-2xl bg-gradient-to-br from-[#1B5E20] to-[#15803d] text-white shadow-xl hover:scale-105 transition-transform cursor-pointer"
                title={t('locateMyFarm', 'Locate My Farm GPS (Plot 2)')}
              >
                <Crosshair className="w-4 h-4 text-emerald-100 animate-spin-slow" />
              </button>
            </div>

            {/* 4. OVERVIEW MINI-MAP INSET (Bottom-Left) */}
            <div className="hidden sm:block absolute bottom-6 left-4 z-[1000] bg-slate-950/90 backdrop-blur-md p-2 rounded-2xl border border-slate-800 shadow-2xl w-36 h-28">
              <span className="text-[9px] uppercase tracking-wider font-mono font-black text-slate-400 block mb-1">
                {t('mhStateInset', 'MH State Inset')}
              </span>
              <div className="w-full h-18 bg-[#09152b] rounded-xl relative border border-slate-800 overflow-hidden flex items-center justify-center">
                <span className="text-xl">🗺️</span>
                {/* Active viewport box */}
                <div className="absolute w-10 h-7 border-2 border-emerald-400 bg-emerald-500/20 rounded shadow-xs" />
              </div>
            </div>

            {/* 5. COLLAPSIBLE NDVI VEGETATION SCALE LEGEND */}
            <div className="absolute top-16 left-4 z-[1000] bg-slate-950/90 backdrop-blur-md rounded-2xl border border-slate-800 text-white shadow-2xl overflow-hidden transition-all max-w-[200px]">
              <button
                onClick={() => setIsLegendOpen(!isLegendOpen)}
                className="w-full px-3 py-1.5 flex items-center justify-between text-[11px] font-black text-slate-300 hover:text-white cursor-pointer"
              >
                <span>{t('ndviScale', 'NDVI Scale')}</span>
                {isLegendOpen ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
              </button>

              {isLegendOpen && (
                <div className="p-3 pt-1 border-t border-slate-800 space-y-1.5 text-[10px] font-bold text-slate-300">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-2xs"></span>
                    <span>{t('vigorousCanopy', '0.7 - 0.9 (Vigorous Canopy)')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-amber-500 shadow-2xs"></span>
                    <span>{t('moistureStress', '0.4 - 0.7 (Moisture Stress)')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500 shadow-2xs"></span>
                    <span>{t('defoliationBlight', '< 0.4 (Defoliation / Blight)')}</span>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* 6. DRAGGABLE 30-DAY HISTORICAL TIMELINE SCRUBBER */}
          <div className={`p-4 sm:p-5 rounded-3xl border shadow-sm space-y-3 ${
            isDark ? 'bg-[#0a1324] border-[#182a4a]' : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsPlayingTimeline(!isPlayingTimeline)}
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all cursor-pointer shadow-xs ${
                    isPlayingTimeline 
                      ? 'bg-amber-500 text-slate-950 font-black' 
                      : 'bg-[#1B5E20] text-white hover:bg-[#154D1A]'
                  }`}
                  title={isPlayingTimeline ? 'Pause Animation' : 'Play 30-Day NDVI Progression'}
                >
                  {isPlayingTimeline ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>

                <div>
                  <h4 className="font-black text-xs text-slate-900 dark:text-white">
                    {t('historicalTimeline', 'Historical Sentinel-2 Satellite Timeline (30-Day Agro-Telemetry)')}
                  </h4>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {t('scrubPasses', 'Scrub through satellite passes to analyze canopy progression & spore expansion')}
                  </span>
                </div>
              </div>

              <span className="font-mono font-black text-xs sm:text-sm text-[#1B5E20] dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-xl border border-emerald-300/40 shadow-2xs">
                {timelineDay === 0 ? t('todayLive', 'Today (Live)') : `${Math.abs(timelineDay)} Days Ago`}
              </span>
            </div>

            {/* Draggable Slider Bar */}
            <div className="space-y-1.5 pt-1">
              <input
                type="range"
                min="-30"
                max="0"
                step="7"
                value={timelineDay}
                onChange={(e) => setTimelineDay(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#1B5E20]"
              />

              <div className="flex justify-between text-[10px] font-mono text-slate-400 font-bold px-1">
                <span>-30 Days</span>
                <span>-21 Days</span>
                <span>-14 Days</span>
                <span>-7 Days</span>
                <span className="text-[#1B5E20] dark:text-emerald-400 font-black">{t('todayLive', 'Today (Live)')}</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* 7. COMPARE MODE SIDE-BY-SIDE MODAL / MATRIX */}
      {isCompareMode && comparedItems.length > 0 && (
        <div className={`p-6 rounded-3xl border-2 border-cyan-500/50 shadow-2xl space-y-4 animate-fadeIn ${
          isDark ? 'bg-[#08101e] text-slate-100' : 'bg-cyan-50/40 text-slate-900'
        }`}>
          <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
            <div className="flex items-center space-x-2.5">
              <Sliders className="w-5 h-5 text-cyan-500" />
              <h3 className="text-base font-black">
                {t('comparisonMatrixTitle', 'Geospatial Multi-District Telemetry Comparison Matrix')}
              </h3>
            </div>

            <button
              onClick={() => setIsCompareMode(false)}
              className="p-1.5 rounded-xl bg-white dark:bg-slate-800 text-slate-500 hover:text-slate-900 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {comparedItems.map(item => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-cyan-500/30 space-y-3 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-sm text-slate-900 dark:text-white">{lang === 'mr' ? item.nameMr : item.nameEn}</h4>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black text-white ${
                    item.healthScore < 50 ? 'bg-rose-600' : item.healthScore < 75 ? 'bg-amber-600' : 'bg-emerald-600'
                  }`}>
                    {item.healthScore}%
                  </span>
                </div>

                <div className="text-xs space-y-1.5 text-slate-600 dark:text-slate-400 font-medium">
                  <div className="flex justify-between"><span>Primary Crop:</span><strong className="text-slate-900 dark:text-white font-bold">{item.primaryCrop}</strong></div>
                  <div className="flex justify-between"><span>Acreage:</span><strong className="text-slate-900 dark:text-white font-bold">{item.acreage}</strong></div>
                  <div className="flex justify-between"><span>Soil VWC Moisture:</span><strong className="text-slate-900 dark:text-white font-bold">{item.soilVWC}%</strong></div>
                  <div className="flex justify-between"><span>Canopy Temp:</span><strong className="text-slate-900 dark:text-white font-bold">{item.temp}°C</strong></div>
                  <div className="flex justify-between"><span>Relative Humidity:</span><strong className="text-slate-900 dark:text-white font-bold">{item.humidity}%</strong></div>
                </div>

                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl text-[11px] text-slate-700 dark:text-slate-300 font-medium">
                  {lang === 'mr' ? item.alertTextMr || item.alertTextEn : item.alertTextEn}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
