import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import { heritageSites } from '../data/heritageSites';
import { Search, MapPin, Star, Eye, Filter, Navigation, X, List, Map } from 'lucide-react';
import toast from 'react-hot-toast';

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom gold marker
const createGoldIcon = (active = false) => L.divIcon({
  className: 'custom-marker',
  html: `<div style="
    width: 32px; height: 32px; 
    background: ${active ? '#F59E0B' : '#D4A017'}; 
    border: 3px solid white; 
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    box-shadow: 0 4px 15px rgba(212, 160, 23, 0.5);
  "></div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -36],
});

const LocationControl: React.FC = () => {
  const map = useMap();
  const handleLocate = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        map.setView([pos.coords.latitude, pos.coords.longitude], 10);
        toast.success('Located to your position!');
      },
      () => toast.error('Could not get your location')
    );
  };
  return (
    <button
      onClick={handleLocate}
      className="absolute bottom-8 right-4 z-[1000] bg-heritage-card border border-heritage-border text-white p-3 rounded-xl shadow-lg hover:border-gold/40 transition-all"
      title="My Location"
    >
      <Navigation className="h-5 w-5 text-gold" />
    </button>
  );
};

const MapPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeSite, setActiveSite] = useState<string | null>(null);
  const [showList, setShowList] = useState(true);

  const categories = ['All', 'Monument', 'Fort', 'Temple', 'Caves', 'Palace', 'Archaeological Site', 'Buddhist'];

  const filtered = heritageSites.filter(site => {
    const matchSearch = site.name.toLowerCase().includes(search.toLowerCase()) || site.location.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory === 'All' || site.category === selectedCategory;
    return matchSearch && matchCat;
  });

  // India center
  const center: [number, number] = [20.5937, 78.9629];

  return (
    <div className="flex flex-col h-screen pt-16 bg-heritage-dark">
      {/* Top Controls */}
      <div className="flex items-center gap-3 px-4 py-3 bg-heritage-card border-b border-heritage-border flex-shrink-0 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search heritage sites..."
            className="w-full bg-white/5 border border-heritage-border rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold/50"
          />
          {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><X className="h-4 w-4" /></button>}
        </div>
        <div className="flex gap-1 overflow-x-auto pb-1">
          {categories.map(cat => (
            <button key={cat} onClick={() => setSelectedCategory(cat)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${selectedCategory === cat ? 'bg-gold text-heritage-dark' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'}`}>
              {cat}
            </button>
          ))}
        </div>
        <button onClick={() => setShowList(!showList)} className="flex-shrink-0 flex items-center space-x-1.5 bg-white/5 border border-heritage-border rounded-xl px-3 py-2 text-sm text-gray-300 hover:border-gold/30 transition-all">
          {showList ? <Map className="h-4 w-4" /> : <List className="h-4 w-4" />}
          <span className="hidden md:inline">{showList ? 'Full Map' : 'Show List'}</span>
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {showList && (
          <div className="w-72 bg-heritage-card border-r border-heritage-border overflow-y-auto flex-shrink-0 hidden md:block">
            <div className="p-3">
              <div className="text-xs text-gray-400 mb-3 px-1">
                {filtered.length} heritage sites
              </div>
              <div className="space-y-2">
                {filtered.map(site => (
                  <button key={site.id} onClick={() => setActiveSite(site.id)}
                    className={`w-full text-left p-3 rounded-xl transition-all border ${activeSite === site.id ? 'border-gold/40 bg-gold/10' : 'border-heritage-border bg-white/5 hover:border-gold/20 hover:bg-white/10'}`}>
                    <div className="flex items-start space-x-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={site.images[0]} alt={site.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-gold font-semibold mb-0.5">{site.category}</div>
                        <div className="font-medium text-sm truncate">{site.name}</div>
                        <div className="flex items-center text-xs text-gray-400 mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span className="truncate">{site.location}</span>
                        </div>
                        <div className="flex items-center mt-1">
                          <Star className="h-3 w-3 text-gold fill-gold mr-1" />
                          <span className="text-xs text-gray-300">{site.rating}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Map */}
        <div className="flex-1 relative">
          <MapContainer
            center={center}
            zoom={5}
            style={{ height: '100%', width: '100%' }}
            className="z-0"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />

            {filtered.map(site => (
              <Marker
                key={site.id}
                position={[site.coordinates.lat, site.coordinates.lng]}
                icon={createGoldIcon(activeSite === site.id)}
                eventHandlers={{ click: () => setActiveSite(site.id) }}
              >
                <Popup>
                  <div className="w-52 p-0">
                    <img src={site.images[0]} alt={site.name} className="w-full h-32 object-cover rounded-t-lg" />
                    <div className="p-3">
                      <div className="text-xs text-amber-600 font-bold mb-1">{site.category}</div>
                      <h3 className="font-bold text-sm mb-1 text-gray-800">{site.name}</h3>
                      <div className="flex items-center text-xs text-gray-500 mb-2">
                        <MapPin className="h-3 w-3 mr-1" /> {site.location}
                      </div>
                      <div className="flex items-center mb-3">
                        <Star className="h-3 w-3 text-amber-500 fill-amber-500 mr-1" />
                        <span className="text-xs text-gray-600">{site.rating} • {(site.visitorCount / 1000000).toFixed(1)}M visitors</span>
                      </div>
                      <div className="flex space-x-2">
                        <a href={`/heritage/${site.slug}`}
                          className="flex-1 text-center bg-amber-500 text-white text-xs font-bold py-1.5 rounded-lg hover:bg-amber-600 transition-colors">
                          Explore
                        </a>
                        {site.virtualTour.available && (
                          <a href={`/virtual-tour/${site.id}`}
                            className="flex items-center justify-center w-8 h-7 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors">
                            <Eye className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}

            <LocationControl />
          </MapContainer>

          {/* Map Legend */}
          <div className="absolute top-4 left-4 z-[1000] bg-heritage-card/90 backdrop-blur-sm border border-heritage-border rounded-xl p-3">
            <div className="text-xs font-medium text-gray-300 mb-2">Legend</div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-gold border-2 border-white" />
              <span className="text-xs text-gray-400">Heritage Site</span>
            </div>
          </div>

          {/* Mobile site count */}
          <div className="absolute bottom-16 left-4 z-[1000] md:hidden bg-heritage-card/90 backdrop-blur-sm border border-heritage-border rounded-xl px-3 py-2">
            <span className="text-xs text-gray-300">{filtered.length} sites shown</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
