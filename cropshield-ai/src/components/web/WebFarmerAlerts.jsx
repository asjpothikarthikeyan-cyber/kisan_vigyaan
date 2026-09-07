import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Bell, 
  AlertTriangle, 
  AlertOctagon, 
  CheckCircle2, 
  CloudRain, 
  MapPin, 
  ChevronRight, 
  Layers,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Sparkles,
  MessageSquare,
  Radio,
  PhoneCall,
  Send,
  CheckCheck,
  Flame
} from 'lucide-react';
import { MapContainer, TileLayer, Circle, Popup, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export const WebFarmerAlerts = ({ onNavigate }) => {
  const { 
    alerts, 
    triggerAlert, 
    markAllAlertsRead, 
    smsHistory, 
    currentUser,
    lang, 
    t, 
    theme 
  } = useApp();

  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState('feed'); // 'feed' | 'sms'
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'critical' | 'high' | 'medium' | 'low'
  const [selectedAlertId, setSelectedAlertId] = useState(alerts[0]?.id || 'alt-1');
  const [mapCenter, setMapCenter] = useState([16.8524, 74.5815]);
  const [mapZoom, setMapZoom] = useState(12);

  const getAlertLocalized = (alert, field) => {
    if (!alert) return '';
    const localizedField = `${field}_${lang}`;
    if (alert[localizedField]) return alert[localizedField];
    if (lang === 'ta' && alert[`${field}Ta`]) return alert[`${field}Ta`];
    if (lang === 'te' && alert[`${field}Te`]) return alert[`${field}Te`];
    if (lang === 'kn' && alert[`${field}Kn`]) return alert[`${field}Kn`];
    if (lang === 'mr' && alert[`${field}Mr`]) return alert[`${field}Mr`];
    if (lang === 'hi' && alert[`${field}Hi`]) return alert[`${field}Hi`];
    return alert[field] || '';
  };

  const selectedAlert = alerts.find(a => a.id === selectedAlertId) || alerts[0];

  const filteredAlerts = alerts.filter(a => {
    if (activeFilter === 'all') return true;
    return a.severity === activeFilter;
  });

  const unreadCount = alerts.filter(a => !a.read).length;

  const handleTriggerTestCriticalAlert = () => {
    triggerAlert({
      severity: 'critical',
      type: 'critical',
      titleEn: 'Emergency Alert: Fall Armyworm Influx in Sangli',
      titleMr: 'तातडीचा इशारा: सांगली भागात लष्करी अळीचा प्रादुर्भाव',
      titleHi: 'आपातकालीन चेतावनी: सांगली में फॉल आर्मीवर्म प्रकोप',
      descEn: 'Severe nocturnal moth flight observed across Miraj sector. Immediate Emamectin Benzoate foliar spray recommended tonight.',
      descMr: 'मिरज भागात मोठ्या प्रमाणावर लष्करी अळी आढळली आहे. आज रात्रीच इमामेक्टिन बेन्झोएट फवारणी करा.',
      descHi: 'मिरज क्षेत्र में भारी कीट प्रकोप दिखा है। आज रात ही इमामेक्टिन बेन्जोएट का छिड़काव करें।',
      locationEn: 'Sangli District East'
    });
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      
      {/* Top Header */}
      <div className={`p-6 rounded-3xl border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        isDark ? 'bg-[#0a1120] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 border border-rose-300 dark:border-rose-800 flex items-center justify-center shadow-xs">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white">
                {t('alertCenterTitle', 'Farm Field Advisories & Outbreak Map')}
              </h2>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-rose-500 text-white font-mono">
                  {unreadCount} Unread
                </span>
              )}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-medium">
              {t('alertCenterSub', 'Real-time disease spore dispersal, humidity warnings & emergency SMS dispatches')}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Trigger Test Critical Alert Button */}
          <button
            onClick={handleTriggerTestCriticalAlert}
            className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black shadow-md flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
            title="Triggers Critical Alert + Real-time SMS popup"
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Test Critical SMS</span>
          </button>

          <button
            onClick={markAllAlertsRead}
            className={`px-3 py-2 rounded-xl border font-bold text-xs cursor-pointer transition-colors ${
              isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
            }`}
          >
            {t('markAllRead', 'Mark All Read')}
          </button>
        </div>
      </div>

      {/* Main Tabs: In-App Alerts Stream vs Cellular SMS Logs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 space-x-4 text-xs font-black">
        <button
          onClick={() => setActiveTab('feed')}
          className={`pb-3 flex items-center gap-2 cursor-pointer transition-all border-b-2 ${
            activeTab === 'feed'
              ? 'border-emerald-500 text-emerald-700 dark:text-emerald-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>In-App Field Telemetry Feed ({alerts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('sms')}
          className={`pb-3 flex items-center gap-2 cursor-pointer transition-all border-b-2 ${
            activeTab === 'sms'
              ? 'border-emerald-500 text-emerald-700 dark:text-emerald-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Radio className="w-4 h-4 text-rose-500 animate-pulse" />
          <span>Emergency SMS Dispatches Log ({smsHistory.length})</span>
        </button>
      </div>

      {/* VIEW A: IN-APP ALERTS & GIS RADAR */}
      {activeTab === 'feed' && (
        <div className="space-y-4 animate-fadeIn">
          
          {/* Severity Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Severity Levels' },
              { id: 'critical', label: 'Critical (SMS Dispatched)', color: 'bg-rose-500 text-white' },
              { id: 'high', label: 'High (SMS Dispatched)', color: 'bg-amber-500 text-white' },
              { id: 'medium', label: 'Medium Advisory' },
              { id: 'low', label: 'Low Info' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black cursor-pointer transition-all ${
                  activeFilter === f.id
                    ? f.color || 'bg-[#1B5E20] text-white shadow-xs'
                    : isDark ? 'bg-slate-900 text-slate-400 hover:text-white' : 'bg-white text-slate-600 hover:bg-slate-100'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Alerts Feed List (5 cols) */}
            <div className="lg:col-span-5 space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
              {filteredAlerts.map(alert => {
                const isSelected = selectedAlert?.id === alert.id;
                const isCritical = alert.severity === 'critical';
                const isHigh = alert.severity === 'high';

                return (
                  <div
                    key={alert.id}
                    onClick={() => {
                      setSelectedAlertId(alert.id);
                      if (alert.lat && alert.lng) {
                        setMapCenter([alert.lat, alert.lng]);
                      }
                    }}
                    className={`p-4 rounded-3xl border transition-all cursor-pointer space-y-2 group ${
                      isSelected
                        ? 'border-2 border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 shadow-md ring-2 ring-emerald-500/20'
                        : isDark
                        ? 'bg-[#0a1120] border-slate-800'
                        : 'bg-white border-slate-200 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${
                          isCritical ? 'bg-rose-500 animate-ping' : isHigh ? 'bg-amber-500' : 'bg-emerald-500'
                        }`} />
                        <span className={`text-[10px] font-mono font-black uppercase px-2 py-0.2 rounded-full ${
                          isCritical 
                            ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' 
                            : isHigh 
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' 
                            : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        }`}>
                          {alert.severity}
                        </span>
                      </div>

                      <span className="text-[10px] font-mono text-slate-500">{alert.time}</span>
                    </div>

                    <div>
                      <h4 className="text-xs font-black text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                        {getAlertLocalized(alert, 'title')}
                      </h4>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium line-clamp-2 mt-1">
                        {getAlertLocalized(alert, 'desc')}
                      </p>
                    </div>

                    {alert.smsSent && (
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-bold pt-1 border-t border-slate-100 dark:border-slate-800">
                        <CheckCheck className="w-3.5 h-3.5" />
                        <span>{t('smsSentTo', 'SMS sent to registered mobile')} ({currentUser.phone})</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Column: GIS Leaflet Outbreak Radar & Advisory (7 cols) */}
            <div className={`lg:col-span-7 p-6 rounded-3xl border shadow-lg space-y-4 ${
              isDark ? 'bg-[#0a1120] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}>
              
              <div className="flex items-start justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-500 font-bold">
                    GIS Radar Zone • {getAlertLocalized(selectedAlert, 'location') || selectedAlert?.locationEn}
                  </span>
                  <h3 className="text-base font-black text-slate-900 dark:text-white mt-0.5">
                    {getAlertLocalized(selectedAlert, 'title')}
                  </h3>
                </div>

                <span className={`px-2.5 py-1 rounded-xl text-xs font-mono font-black uppercase ${
                  selectedAlert?.severity === 'critical' 
                    ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' 
                    : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                }`}>
                  {selectedAlert?.severity}
                </span>
              </div>

              {/* Leaflet Map Preview */}
              <div className="h-64 rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-700 relative z-10 shadow-inner">
                <MapContainer center={mapCenter} zoom={mapZoom} scrollWheelZoom={false} className="h-full w-full">
                  <TileLayer
                    attribution="&copy; OpenStreetMap"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {selectedAlert?.lat && selectedAlert?.lng && (
                    <Circle
                      center={[selectedAlert.lat, selectedAlert.lng]}
                      radius={selectedAlert.radius || 2500}
                      pathOptions={{ color: selectedAlert.color || '#ef4444', fillColor: selectedAlert.color || '#ef4444', fillOpacity: 0.35 }}
                    >
                      <Popup>
                        <div className="p-1 text-xs">
                          <strong>{getAlertLocalized(selectedAlert, 'title')}</strong>
                          <p>{getAlertLocalized(selectedAlert, 'location') || selectedAlert?.locationEn}</p>
                        </div>
                      </Popup>
                    </Circle>
                  )}
                </MapContainer>
              </div>

              {/* Full Advisory Body */}
              <div className={`p-4 rounded-2xl border space-y-2 text-xs ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">
                  {lang === 'ta' ? 'அதிகாரப்பூர்வ விவசாய வழிகாட்டல்:' : lang === 'mr' ? 'शासकीय कृषी सल्ला:' : 'Official Agronomic Guidance:'}
                </span>
                <p className="font-medium leading-relaxed text-slate-800 dark:text-slate-200">
                  {getAlertLocalized(selectedAlert, 'fullAdvisory') || selectedAlert?.fullAdvisoryEn}
                </p>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => onNavigate('scan')}
                  className="py-3 rounded-xl bg-[#1B5E20] hover:bg-[#154D1A] text-white font-black text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
                >
                  <span>Diagnose Affected Plot</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('market')}
                  className={`py-3 rounded-xl font-black text-xs border flex items-center justify-center gap-2 cursor-pointer ${
                    isDark ? 'bg-slate-800 text-slate-200 border-slate-700' : 'bg-slate-100 text-slate-800 border-slate-300'
                  }`}
                >
                  <span>Order Protective Fungicide</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* VIEW B: EMERGENCY SMS DISPATCHES LOG TAB */}
      {activeTab === 'sms' && (
        <div className="space-y-4 animate-fadeIn max-w-3xl">
          <div className={`p-4 rounded-2xl border flex items-center space-x-3 text-xs ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <Radio className="w-5 h-5 text-rose-500 shrink-0" />
            <div>
              <strong className="text-slate-900 dark:text-white block font-bold">Cellular SMS Emergency Carrier Fallback (VK-KISAAN)</strong>
              <p className="text-slate-500 dark:text-slate-400">
                Critical & High severity alerts trigger automatic cellular SMS broadcasts to ensure farmers without active 4G data receive immediate alerts.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {smsHistory.map((sms) => (
              <div
                key={sms.id}
                className={`p-4 sm:p-5 rounded-3xl border shadow-sm space-y-2 font-mono text-xs ${
                  sms.severity === 'CRITICAL'
                    ? isDark ? 'bg-rose-950/30 border-rose-800/60' : 'bg-rose-50/70 border-rose-300'
                    : isDark ? 'bg-amber-950/30 border-amber-800/60' : 'bg-amber-50/70 border-amber-300'
                }`}
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                  <span className="font-black text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5" />
                    <span>{sms.sender || 'VK-KISAAN'}</span>
                  </span>

                  <span className="text-[10px] text-slate-500">{sms.timestamp}</span>
                </div>

                <p className="font-sans font-medium text-slate-900 dark:text-white leading-relaxed text-xs">
                  {sms.message}
                </p>

                <div className="pt-2 flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-200 dark:border-slate-800">
                  <span>Recipient: <strong>{sms.recipient}</strong></span>
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCheck className="w-3.5 h-3.5" />
                    <span>Delivered</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
