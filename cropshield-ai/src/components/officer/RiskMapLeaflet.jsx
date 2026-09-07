import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import { useApp } from '../../context/AppContext';
import { 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  User, 
  Phone, 
  Layers, 
  Compass, 
  MapPin, 
  Search,
  Crosshair,
  Sparkles
} from 'lucide-react';

// Fix default leaflet marker icons in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom high-risk pulsating marker icon
const createHotspotIcon = (riskColor, count) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      background-color: ${riskColor};
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 0 14px ${riskColor}, 0 2px 6px rgba(0,0,0,0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 900;
      color: white;
      font-family: sans-serif;
    ">${count || '!'}</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14]
  });
};

export const RiskMapLeaflet = () => {
  const { hotspots, sangliHotspots, advisories, theme, lang, t } = useApp();
  const isDark = theme === 'dark';
  const activeHotspots = (hotspots && hotspots.length > 0) ? hotspots : (sangliHotspots || []);

  // Farmland Center (Krishna River Agricultural Floodplain)
  const sangliCenter = [16.8620, 74.5380];
  const [mapType, setMapType] = useState('satellite'); // 'satellite' | 'street'
  const [selectedHotspot, setSelectedHotspot] = useState(null);

  const tileUrl = mapType === 'satellite'
    ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
    : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  return (
    <div className="space-y-4 animate-fadeIn">
      
      {/* Top Header Card */}
      <div className={`p-5 rounded-3xl border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
        isDark ? 'bg-[#0a1324] border-[#182a4a] text-white' : 'bg-[#F5FCF7] border-[#D2EBD7] text-slate-900'
      }`}>
        <div>
          <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>GIS Regional Risk Radar & Pathogen Hotspot Cluster Map</span>
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-medium">
            Live geospatial epidemiologic surveillance across Sangli district farm clusters.
          </p>
        </div>

        {/* Map Style Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMapType('satellite')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              mapType === 'satellite'
                ? 'bg-[#047857] text-white shadow-xs'
                : 'bg-white/80 dark:bg-slate-900 border border-[#D2EBD7] dark:border-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            🛰️ High-Res Satellite
          </button>
          <button
            onClick={() => setMapType('street')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              mapType === 'street'
                ? 'bg-[#047857] text-white shadow-xs'
                : 'bg-white/80 dark:bg-slate-900 border border-[#D2EBD7] dark:border-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            🗺️ Street Map
          </button>
        </div>
      </div>

      {/* Main Map Box */}
      <div className="w-full h-[540px] relative rounded-3xl overflow-hidden shadow-xl border-2 border-[#D2EBD7] dark:border-slate-800 bg-slate-950">
        <MapContainer 
          center={sangliCenter} 
          zoom={12} 
          scrollWheelZoom={true}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; ESRI World Imagery & OSM'
            url={tileUrl}
          />

          {/* Hotspot Circles with heat opacity & Markers */}
          {activeHotspots.map((spot) => {
            const fillColor = spot.risk === 'High' ? '#ef4444' : spot.risk === 'Medium' ? '#f59e0b' : '#22c55e';

            return (
              <React.Fragment key={spot.id}>
                {/* Semi-transparent Heat Zone Circle */}
                <Circle
                  center={[spot.lat, spot.lng]}
                  radius={spot.radius || 1800}
                  pathOptions={{
                    fillColor: fillColor,
                    fillOpacity: 0.35,
                    color: fillColor,
                    weight: 2,
                    dashArray: spot.risk === 'High' ? '4, 4' : null
                  }}
                />

                {/* Marker with Interactive Popup */}
                <Marker 
                  position={[spot.lat, spot.lng]} 
                  icon={createHotspotIcon(fillColor, spot.reportsCount)}
                  eventHandlers={{
                    click: () => setSelectedHotspot(spot)
                  }}
                >
                  <Popup>
                    <div className="p-1 space-y-1.5 max-w-xs text-xs font-sans">
                      <div className="flex items-center justify-between border-b pb-1">
                        <strong className="text-slate-900 text-sm font-black">{spot.name}</strong>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold text-white ${
                          spot.risk === 'High' ? 'bg-rose-600' : spot.risk === 'Medium' ? 'bg-amber-600' : 'bg-emerald-600'
                        }`}>
                          {spot.risk} Risk
                        </span>
                      </div>

                      <p className="text-slate-700 font-medium">
                        <strong>Dominant Disease:</strong> {spot.disease}
                      </p>

                      <div className="grid grid-cols-2 gap-1 text-[11px] bg-slate-50 p-1.5 rounded">
                        <div>Reports: <strong>{spot.reportsCount}</strong></div>
                        <div>Farms: <strong>{spot.affectedFarms}</strong></div>
                      </div>

                      <p className="text-[11px] text-emerald-800 font-semibold">
                        Officer: {spot.leadOfficer || 'KVK Sangli Team'}
                      </p>

                      <div className="p-1.5 bg-amber-50 border border-amber-200 rounded text-[10px] text-amber-900">
                        <strong>Advisory:</strong> {spot.recommendation}
                      </div>
                    </div>
                  </Popup>
                </Marker>
              </React.Fragment>
            );
          })}
        </MapContainer>

        {/* Floating Map Legend */}
        <div className="absolute top-4 right-4 z-[1000] bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl text-xs space-y-2">
          <span className="font-black text-slate-800 dark:text-white text-[11px] block uppercase tracking-wider font-mono">
            Outbreak Risk Level
          </span>
          <div className="flex items-center space-x-2 text-[11px]">
            <span className="w-3 h-3 rounded-full bg-rose-500 shadow-xs"></span>
            <span className="text-slate-700 dark:text-slate-300 font-bold">High Outbreak Risk</span>
          </div>
          <div className="flex items-center space-x-2 text-[11px]">
            <span className="w-3 h-3 rounded-full bg-amber-500 shadow-xs"></span>
            <span className="text-slate-700 dark:text-slate-300 font-bold">Spore Surveillance</span>
          </div>
          <div className="flex items-center space-x-2 text-[11px]">
            <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-xs"></span>
            <span className="text-slate-700 dark:text-slate-300 font-bold">Low / Protected</span>
          </div>
        </div>
      </div>

    </div>
  );
};
