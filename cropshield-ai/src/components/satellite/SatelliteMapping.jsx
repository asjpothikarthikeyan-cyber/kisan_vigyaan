import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import { useApp } from '../../context/AppContext';
import { 
  Satellite, 
  Layers, 
  Sparkles, 
  MapPin, 
  Info, 
  Eye, 
  CheckCircle2, 
  AlertTriangle,
  Download,
  Filter
} from 'lucide-react';

const createCustomPin = (color) => {
  return L.divIcon({
    className: 'custom-sat-marker',
    html: `<div style="
      background-color: ${color};
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 0 12px ${color};
    "></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });
};

export const SatelliteMapping = () => {
  const { hotspots } = useApp();
  const [activeLayer, setActiveLayer] = useState('ndvi'); // 'satellite' | 'ndvi' | 'thermal' | 'hotspots'

  const sangliCenter = [16.8524, 74.5815];

  // Tile layer URL based on mode
  const tileUrl = activeLayer === 'satellite' || activeLayer === 'ndvi'
    ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
    : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0b162b] border border-cyan-500/30 rounded-2xl p-4 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
        <div>
          <h2 className="text-base font-black text-white flex items-center gap-2">
            <Satellite className="w-5 h-5 text-cyan-400" />
            GIS Satellite Mapping & NDVI Vegetation Health Index
          </h2>
          <p className="text-xs text-slate-300 font-medium mt-0.5">
            Sentinel-2 Multispectral 10m Resolution • Canopy Chlorophyll & Water Stress Telemetry
          </p>
        </div>

        {/* Layer Selector Bar */}
        <div className="flex items-center bg-[#070e1e] p-1 rounded-xl border border-[#1b2c4e] text-xs">
          {[
            { id: 'ndvi', label: '🌱 NDVI Index', desc: 'Canopy Health' },
            { id: 'satellite', label: '🛰️ True Color', desc: 'Satellite' },
            { id: 'thermal', label: '🌡️ Thermal Stress', desc: 'Canopy Temp' },
            { id: 'hotspots', label: '🔴 Disease Hotspots', desc: 'Outbreaks' }
          ].map(layer => (
            <button
              key={layer.id}
              onClick={() => setActiveLayer(layer.id)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeLayer === layer.id
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-extrabold'
                  : 'text-slate-300 hover:text-white hover:bg-[#132240]'
              }`}
            >
              {layer.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Quick Satellite NDVI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0a1426] border border-[#1a2d4f] rounded-2xl p-4 shadow-xs">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Monitored Farm Land</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-black text-white">12,450 Ha</span>
            <span className="text-xs font-bold text-cyan-400">Sangli District</span>
          </div>
        </div>

        <div className="bg-[#0a1426] border border-[#1a2d4f] rounded-2xl p-4 shadow-xs">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Mean NDVI Index</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-black text-emerald-400">0.72</span>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">Vigorous</span>
          </div>
        </div>

        <div className="bg-[#0a1426] border border-[#1a2d4f] rounded-2xl p-4 shadow-xs">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Stressed Crop Sectors</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-black text-amber-400">18.4%</span>
            <span className="text-xs font-bold text-amber-400">Early Blight Areas</span>
          </div>
        </div>

        <div className="bg-[#0a1426] border border-[#1a2d4f] rounded-2xl p-4 shadow-xs">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Last Pass Timestamp</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-base font-black text-white">Today 10:45 AM</span>
            <span className="text-xs font-bold text-emerald-400">Sentinel-2B</span>
          </div>
        </div>
      </div>

      {/* Main Satellite Map View */}
      <div className="bg-[#0a1426] border border-[#1a2d4f] rounded-2xl p-4 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-extrabold text-white">
              {activeLayer === 'ndvi' && 'NDVI Spectral Vegetation Vigor Heatmap (Green = Dense Healthy, Yellow = Early Stress, Red = Severe Blight)'}
              {activeLayer === 'satellite' && 'High-Resolution True Color Satellite Topography'}
              {activeLayer === 'thermal' && 'Surface Canopy Thermal Stress & Evapotranspiration'}
              {activeLayer === 'hotspots' && 'Geospatial Fungal Spore Dispersal & Outbreak Radiuses'}
            </span>
          </div>

          <button 
            onClick={() => window.print()}
            className="px-3 py-1 bg-[#132342] hover:bg-[#1a305a] text-slate-200 rounded-xl text-xs font-bold flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download GeoTIFF</span>
          </button>
        </div>

        <div className="w-full h-[520px] rounded-2xl overflow-hidden relative shadow-inner border border-slate-800">
          <MapContainer 
            center={sangliCenter} 
            zoom={12} 
            scrollWheelZoom={false}
            className="w-full h-full"
          >
            <TileLayer
              attribution='&copy; Esri & OpenStreetMap contributors'
              url={tileUrl}
            />

            {/* Render NDVI Simulated Canopy Polygons or Hotspot Circles */}
            {hotspots.map((spot) => {
              const fillColor = activeLayer === 'ndvi'
                ? spot.risk === 'High' ? '#dc2626' : spot.risk === 'Medium' ? '#eab308' : '#16a34a'
                : spot.risk === 'High' ? '#ef4444' : spot.risk === 'Medium' ? '#f59e0b' : '#22c55e';

              return (
                <React.Fragment key={spot.id}>
                  <Circle
                    center={[spot.lat, spot.lng]}
                    radius={spot.radius || 2800}
                    pathOptions={{
                      fillColor: fillColor,
                      fillOpacity: activeLayer === 'ndvi' ? 0.45 : 0.35,
                      color: fillColor,
                      weight: 2,
                      dashArray: spot.risk === 'High' ? '4, 4' : null
                    }}
                  />

                  <Marker 
                    position={[spot.lat, spot.lng]}
                    icon={createCustomPin(fillColor)}
                  >
                    <Popup>
                      <div className="p-1 space-y-1.5 max-w-xs text-xs font-sans">
                        <div className="flex items-center justify-between border-b pb-1">
                          <strong className="text-white font-bold">{spot.name}</strong>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold text-white ${
                            spot.risk === 'High' ? 'bg-red-600' : 'bg-amber-600'
                          }`}>
                            {spot.risk} Risk
                          </span>
                        </div>
                        <p className="text-slate-300">Dominant Disease: <strong>{spot.disease}</strong></p>
                        <div className="grid grid-cols-2 gap-1 text-[11px] bg-slate-800 p-1.5 rounded">
                          <div>Farms: <strong>{spot.affectedFarms}</strong></div>
                          <div>NDVI Score: <strong>{spot.risk === 'High' ? '0.41' : '0.68'}</strong></div>
                        </div>
                        <p className="text-[11px] text-cyan-300 font-semibold">Advisory: {spot.recommendation}</p>
                      </div>
                    </Popup>
                  </Marker>
                </React.Fragment>
              );
            })}
          </MapContainer>

          {/* Floating NDVI Legend */}
          <div className="absolute bottom-4 right-4 z-[1000] bg-[#070e1e]/95 backdrop-blur-md p-3 rounded-2xl border border-[#1b2c4e] shadow-xl text-xs space-y-2">
            <span className="font-black text-white text-[11px] block uppercase tracking-wider">
              {activeLayer === 'ndvi' ? 'NDVI Vegetation Index' : 'Canopy Stress Legend'}
            </span>
            <div className="flex items-center space-x-2 text-[11px]">
              <span className="w-3 h-3 rounded bg-emerald-500 shadow-xs"></span>
              <span className="text-slate-200">0.7 - 0.9 (Healthy Dense Canopy)</span>
            </div>
            <div className="flex items-center space-x-2 text-[11px]">
              <span className="w-3 h-3 rounded bg-amber-400 shadow-xs"></span>
              <span className="text-slate-200">0.4 - 0.6 (Moderate Moisture Stress)</span>
            </div>
            <div className="flex items-center space-x-2 text-[11px]">
              <span className="w-3 h-3 rounded bg-red-500 shadow-xs"></span>
              <span className="text-slate-200">&lt; 0.4 (Severe Disease Defoliation)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
