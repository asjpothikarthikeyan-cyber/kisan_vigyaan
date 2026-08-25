import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import { useApp } from '../../context/AppContext';
import { ShieldAlert, AlertTriangle, CheckCircle2, User, Phone } from 'lucide-react';

// Fix default leaflet marker icons in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom high-risk pulsating marker icon
const createHotspotIcon = (riskColor) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      background-color: ${riskColor};
      width: 22px;
      height: 22px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 0 10px ${riskColor};
    "></div>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11]
  });
};

export const RiskMapLeaflet = () => {
  const { hotspots, advisories } = useApp();
  const sangliCenter = [16.8524, 74.5815];

  return (
    <div className="w-full h-full min-h-[360px] relative rounded-2xl overflow-hidden shadow-inner border border-gray-200">
      <MapContainer 
        center={sangliCenter} 
        zoom={11} 
        scrollWheelZoom={false}
        className="w-full h-full min-h-[360px]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Hotspot Circles with heat opacity & Markers */}
        {hotspots.map((spot) => {
          const fillColor = spot.risk === 'High' ? '#ef4444' : spot.risk === 'Medium' ? '#f59e0b' : '#22c55e';

          return (
            <React.Fragment key={spot.id}>
              {/* Semi-transparent Heat Zone Circle */}
              <Circle
                center={[spot.lat, spot.lng]}
                radius={spot.radius || 2500}
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
                icon={createHotspotIcon(fillColor)}
              >
                <Popup>
                  <div className="p-1 space-y-1.5 max-w-xs text-xs font-sans">
                    <div className="flex items-center justify-between border-b pb-1">
                      <strong className="text-gray-900 text-sm">{spot.name}</strong>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold text-white ${
                        spot.risk === 'High' ? 'bg-red-600' : spot.risk === 'Medium' ? 'bg-amber-600' : 'bg-emerald-600'
                      }`}>
                        {spot.risk} Risk
                      </span>
                    </div>

                    <p className="text-gray-700 font-medium">
                      <strong>Dominant Disease:</strong> {spot.disease}
                    </p>

                    <div className="grid grid-cols-2 gap-1 text-[11px] bg-slate-50 p-1.5 rounded">
                      <div>Reports: <strong>{spot.reportsCount}</strong></div>
                      <div>Farms: <strong>{spot.affectedFarms}</strong></div>
                    </div>

                    <p className="text-[11px] text-emerald-800 font-semibold">
                      Officer: {spot.leadOfficer}
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
      <div className="absolute top-3 right-3 z-[1000] bg-white/95 backdrop-blur-xs p-2.5 rounded-xl border border-gray-200 shadow-md text-xs space-y-1.5">
        <span className="font-bold text-gray-800 text-[11px] block uppercase tracking-wider">Hotspot Severity</span>
        <div className="flex items-center space-x-2 text-[11px]">
          <span className="w-3 h-3 rounded-full bg-red-500 shadow-xs"></span>
          <span className="text-gray-700 font-medium">High Risk (Outbreak)</span>
        </div>
        <div className="flex items-center space-x-2 text-[11px]">
          <span className="w-3 h-3 rounded-full bg-amber-500 shadow-xs"></span>
          <span className="text-gray-700 font-medium">Medium (Surveillance)</span>
        </div>
        <div className="flex items-center space-x-2 text-[11px]">
          <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-xs"></span>
          <span className="text-gray-700 font-medium">Low / Stable</span>
        </div>
      </div>
    </div>
  );
};
