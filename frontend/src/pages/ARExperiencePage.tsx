import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSiteById } from '../data/heritageSites';
import { Camera, ChevronLeft, X, ZoomIn, Info, Share2, History, Eye as EyeIcon } from 'lucide-react';
import toast from 'react-hot-toast';

const ARExperiencePage: React.FC = () => {
  const { siteId } = useParams<{ siteId: string }>();
  const site = getSiteById(siteId || '1');

  const [mode, setMode] = useState<'present' | 'historical'>('present');
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  const hotspots = [
    { x: 30, y: 40, label: 'Main Structure', info: `The central structure of ${site?.name} dates to ${site?.historicalPeriod}` },
    { x: 65, y: 30, label: 'Architectural Detail', info: `Notice the intricate ${site?.architectureStyle?.split('—')[0]?.trim()} craftsmanship` },
    { x: 50, y: 70, label: 'Foundation', info: 'The foundation has supported this structure for centuries' },
  ];

  const startScan = () => {
    setScanning(true);
    setTimeout(() => { setScanning(false); setScanned(true); toast.success('Heritage site recognized!'); }, 2800);
  };

  if (!site) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-serif font-bold mb-4">Site not found</h2>
        <Link to="/explore" className="bg-gold text-heritage-dark font-bold px-6 py-3 rounded-xl">Browse Sites</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black pt-16 flex flex-col">
      {/* Camera-style header */}
      <div className="absolute top-16 left-0 right-0 z-30 flex items-center justify-between px-4 py-3">
        <Link to={`/heritage/${site.slug}`} className="flex items-center space-x-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2 text-sm text-gray-300 hover:text-white transition-all">
          <ChevronLeft className="h-4 w-4" />
          <span>Back</span>
        </Link>
        <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2">
          <Camera className="h-4 w-4 text-gold" />
          <span className="text-sm text-white font-medium">AR Experience</span>
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        </div>
        <button onClick={() => { navigator.clipboard.writeText(window.location.href).catch(() => {}); toast.success('Link copied!'); }}
          className="bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-2">
          <Share2 className="h-4 w-4 text-gray-300" />
        </button>
      </div>

      {/* AR Viewport */}
      <div className="flex-1 relative overflow-hidden">
        {/* Camera-style background */}
        <div className="absolute inset-0" style={{
          background: scanned
            ? 'transparent'
            : 'linear-gradient(135deg, #050508 0%, #0a0a1a 50%, #050508 100%)',
        }}>
          {scanned && (
            <img
              src={site.images[0]}
              alt={site.name}
              className={`w-full h-full object-cover transition-all duration-1000 ${mode === 'historical' ? 'sepia brightness-75' : 'brightness-90'}`}
            />
          )}
        </div>

        {/* Viewfinder Overlay */}
        {!scanned && (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Corner brackets */}
            {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(pos => (
              <div key={pos} className={`absolute w-12 h-12 border-2 border-gold/70 ${
                pos.includes('top') ? 'top-[20%]' : 'bottom-[20%]'
              } ${pos.includes('left') ? 'left-[15%]' : 'right-[15%]'} ${
                pos === 'top-left' ? 'border-r-0 border-b-0 rounded-tl-lg' :
                pos === 'top-right' ? 'border-l-0 border-b-0 rounded-tr-lg' :
                pos === 'bottom-left' ? 'border-r-0 border-t-0 rounded-bl-lg' :
                'border-l-0 border-t-0 rounded-br-lg'
              }`} />
            ))}

            {/* Center crosshair */}
            <div className="relative">
              <div className="w-6 h-0.5 bg-gold/60 absolute -left-3 top-1/2 -translate-y-1/2" />
              <div className="w-0.5 h-6 bg-gold/60 absolute left-1/2 -translate-x-1/2 -top-3" />
              <div className="w-3 h-3 border-2 border-gold rounded-full" />
            </div>

            {/* Scanning animation */}
            {scanning && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent animate-pulse"
                  style={{ animation: 'scan 2s linear infinite', top: '50%' }} />
              </div>
            )}
          </div>
        )}

        {/* Historical overlay */}
        {scanned && mode === 'historical' && (
          <div className="absolute inset-0 bg-amber-900/30 pointer-events-none" />
        )}

        {/* Hotspots (visible after scan) */}
        {scanned && hotspots.map((h, i) => (
          <button
            key={i}
            className="absolute group"
            style={{ left: `${h.x}%`, top: `${h.y}%` }}
            onClick={() => setActiveHotspot(activeHotspot === i ? null : i)}
          >
            <div className="relative -translate-x-1/2 -translate-y-1/2">
              <div className="w-7 h-7 rounded-full bg-gold border-2 border-white shadow-lg shadow-gold/50 flex items-center justify-center">
                <Info className="h-3.5 w-3.5 text-heritage-dark" />
              </div>
              <div className="absolute -top-1 -left-1 w-9 h-9 rounded-full border-2 border-gold/30 animate-ping" />
            </div>
            {activeHotspot === i && (
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 bg-heritage-card/95 backdrop-blur-xl border border-gold/30 rounded-xl p-3 text-left z-20">
                <div className="flex items-start justify-between mb-1">
                  <div className="text-xs font-bold text-gold">{h.label}</div>
                  <button onClick={e => { e.stopPropagation(); setActiveHotspot(null); }}>
                    <X className="h-3 w-3 text-gray-400" />
                  </button>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">{h.info}</p>
              </div>
            )}
          </button>
        ))}

        {/* Scan / Mode controls */}
        <div className="absolute bottom-32 left-0 right-0 flex flex-col items-center space-y-4 px-4">
          {!scanned ? (
            <button
              onClick={startScan}
              disabled={scanning}
              className="flex items-center space-x-3 bg-gold hover:bg-amber-500 disabled:opacity-70 text-heritage-dark font-bold px-8 py-4 rounded-2xl transition-all shadow-2xl shadow-gold/30"
            >
              {scanning ? (
                <>
                  <div className="w-5 h-5 border-2 border-heritage-dark/30 border-t-heritage-dark rounded-full animate-spin" />
                  <span>Scanning Heritage Site...</span>
                </>
              ) : (
                <>
                  <Camera className="h-5 w-5" />
                  <span>Scan Heritage Site</span>
                </>
              )}
            </button>
          ) : (
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setMode('present')}
                className={`flex items-center space-x-2 px-5 py-3 rounded-xl font-medium transition-all ${mode === 'present' ? 'bg-gold text-heritage-dark' : 'bg-black/60 border border-white/20 text-white hover:border-gold/40'}`}
              >
                <EyeIcon className="h-4 w-4" />
                <span>Present Day</span>
              </button>
              <button
                onClick={() => setMode('historical')}
                className={`flex items-center space-x-2 px-5 py-3 rounded-xl font-medium transition-all ${mode === 'historical' ? 'bg-gold text-heritage-dark' : 'bg-black/60 border border-white/20 text-white hover:border-gold/40'}`}
              >
                <History className="h-4 w-4" />
                <span>Historical</span>
              </button>
            </div>
          )}

          {/* Instructions */}
          <p className="text-xs text-gray-400 text-center">
            {!scanned
              ? 'Point camera at a heritage site marker or press Scan to demo'
              : `Viewing ${mode === 'historical' ? 'historical reconstruction' : 'present day'} of ${site.name} • Tap hotspots for info`}
          </p>
        </div>

        {/* Bottom Info Panel */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 pt-10">
          <div className="bg-heritage-card/80 backdrop-blur-xl border border-heritage-border rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gold font-semibold mb-0.5">{site.category} • {site.historicalPeriod}</div>
                <div className="font-serif font-bold">{site.name}</div>
                <div className="text-xs text-gray-400">{site.location}</div>
              </div>
              <Link to={`/heritage/${site.slug}`}
                className="text-xs bg-gold/10 text-gold border border-gold/30 px-3 py-1.5 rounded-lg hover:bg-gold/20 transition-all">
                Full Details
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 20%; }
          50% { top: 80%; }
          100% { top: 20%; }
        }
      `}</style>
    </div>
  );
};

export default ARExperiencePage;
