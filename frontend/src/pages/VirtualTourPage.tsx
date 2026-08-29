import React, { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSiteById, heritageSites } from '../data/heritageSites';
import { ChevronLeft, ChevronRight, Volume2, VolumeX, Maximize2, Minimize2, Info, X, Compass, Eye, MessageCircle, Home } from 'lucide-react';
import toast from 'react-hot-toast';

interface Hotspot {
  id: string;
  x: number;
  y: number;
  title: string;
  description: string;
}

interface Scene {
  id: string;
  title: string;
  image: string;
  description: string;
  hotspots: Hotspot[];
  narration: string;
}

const getScenes = (siteId: string): Scene[] => {
  const site = getSiteById(siteId);
  if (!site) return [];

  const baseScenes: Scene[] = [
    {
      id: 'entrance',
      title: 'Main Entrance Gateway',
      image: site.images[0],
      description: `Welcome to ${site.name}. You are standing at the main entrance, one of the most photographed spots in the world.`,
      hotspots: [
        { id: 'h1', x: 30, y: 40, title: 'Architectural Detail', description: `The intricate carvings here represent the ${site.architectureStyle} style at its finest.` },
        { id: 'h2', x: 65, y: 55, title: 'Historical Marker', description: `This structure dates to ${site.historicalPeriod}` },
      ],
      narration: `Welcome to the ${site.name}. As you step through the main entrance, you are transported back to ${site.historicalPeriod}. ${site.shortDescription}`
    },
    {
      id: 'main',
      title: 'Central Monument View',
      image: site.images[site.images.length > 1 ? 1 : 0],
      description: `The central view of ${site.name}, showcasing the full architectural magnificence.`,
      hotspots: [
        { id: 'h3', x: 50, y: 30, title: 'Central Structure', description: `The main structure exhibits ${site.architectureStyle.split('—')[0].trim()} characteristics.` },
        { id: 'h4', x: 20, y: 60, title: 'Cultural Significance', description: site.culturalSignificance.split('.')[0] },
      ],
      narration: `You are now viewing the heart of ${site.name}. ${site.culturalSignificance.split('.')[0]}. This monument stands as a testament to the incredible craftsmanship of its era.`
    },
    {
      id: 'details',
      title: 'Architectural Details',
      image: site.images[0],
      description: `Close-up view of the intricate architectural details that make this site unique.`,
      hotspots: [
        { id: 'h5', x: 40, y: 45, title: 'Craftsmanship', description: `Notice the intricate detail work — this level of precision was achieved using only hand tools.` },
      ],
      narration: `Look closely at the architectural details. Every surface tells a story of devotion, skill, and cultural heritage spanning ${site.historicalPeriod}.`
    },
  ];

  return baseScenes;
};

const VirtualTourPage: React.FC = () => {
  const { siteId } = useParams<{ siteId: string }>();
  const site = getSiteById(siteId || '1');
  const scenes = getScenes(siteId || '1');
  const [currentScene, setCurrentScene] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [audioOn, setAudioOn] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const [showNarration, setShowNarration] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const scene = scenes[currentScene];

  const goNext = () => {
    setCurrentScene(prev => (prev + 1) % scenes.length);
    setActiveHotspot(null);
  };
  const goPrev = () => {
    setCurrentScene(prev => (prev - 1 + scenes.length) % scenes.length);
    setActiveHotspot(null);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  if (!site || scenes.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <Eye className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-serif font-bold mb-4">Virtual Tour Not Available</h2>
          <p className="text-gray-400 mb-6">This heritage site doesn't have a virtual tour yet.</p>
          <Link to="/explore" className="bg-gold text-heritage-dark font-bold px-6 py-3 rounded-xl">Browse Sites</Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`bg-black ${isFullscreen ? 'fixed inset-0 z-50' : 'min-h-screen pt-16'} flex flex-col`}>
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-black/80 to-transparent p-4 pt-20 md:pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link to={`/heritage/${site.slug}`} className="flex items-center space-x-2 text-sm text-gray-300 hover:text-white bg-black/40 px-3 py-2 rounded-xl backdrop-blur-md border border-white/10 transition-all">
              <ChevronLeft className="h-4 w-4" /> <span className="hidden md:inline">{site.name}</span>
            </Link>
          </div>
          <div className="text-center hidden md:block">
            <div className="text-white font-serif font-bold">{scene.title}</div>
            <div className="text-gray-400 text-xs">{currentScene + 1} / {scenes.length} scenes</div>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={() => setAudioOn(!audioOn)} className="p-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 transition-all hover:bg-white/10" title="Toggle Audio">
              {audioOn ? <Volume2 className="h-4 w-4 text-gold" /> : <VolumeX className="h-4 w-4 text-gray-400" />}
            </button>
            <button onClick={() => setShowInfo(!showInfo)} className="p-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 transition-all hover:bg-white/10">
              <Info className="h-4 w-4 text-gray-400" />
            </button>
            <button onClick={toggleFullscreen} className="p-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 transition-all hover:bg-white/10">
              {isFullscreen ? <Minimize2 className="h-4 w-4 text-gray-400" /> : <Maximize2 className="h-4 w-4 text-gray-400" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main View */}
      <div className="relative flex-1 overflow-hidden">
        {/* Background Image */}
        <img
          src={scene.image}
          alt={scene.title}
          className="w-full h-full object-cover transition-all duration-700"
          style={{ filter: 'brightness(0.85)' }}
        />

        {/* 360° Overlay Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none" />

        {/* Compass Rose */}
        <div className="absolute top-20 right-4 w-16 h-16 opacity-60 pointer-events-none">
          <div className="relative w-full h-full">
            <Compass className="w-16 h-16 text-white/40" />
            <div className="absolute inset-0 flex items-center justify-center text-xs text-gold font-bold">N</div>
          </div>
        </div>

        {/* Hotspots */}
        {scene.hotspots.map(hotspot => (
          <button
            key={hotspot.id}
            onClick={() => setActiveHotspot(activeHotspot?.id === hotspot.id ? null : hotspot)}
            className="absolute group"
            style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
          >
            <div className="relative -translate-x-1/2 -translate-y-1/2">
              <div className="w-6 h-6 rounded-full bg-gold border-2 border-white shadow-lg shadow-gold/50 animate-pulse" />
              <div className="absolute -top-1 -left-1 w-8 h-8 rounded-full border-2 border-gold/40 animate-ping" />
            </div>
          </button>
        ))}

        {/* Hotspot Info Popup */}
        {activeHotspot && (
          <div
            className="absolute z-20 bg-heritage-card/95 backdrop-blur-xl border border-gold/30 rounded-xl p-4 max-w-xs shadow-2xl"
            style={{
              left: `${Math.min(activeHotspot.x + 5, 65)}%`,
              top: `${Math.max(activeHotspot.y - 10, 5)}%`
            }}
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-serif font-bold text-sm text-gold">{activeHotspot.title}</h3>
              <button onClick={() => setActiveHotspot(null)} className="ml-2 text-gray-400 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-gray-300 text-xs leading-relaxed">{activeHotspot.description}</p>
          </div>
        )}

        {/* Navigation Arrows */}
        <button
          onClick={goPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <button
          onClick={goNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>

        {/* Scene Info Panel */}
        {showInfo && (
          <div className="absolute bottom-24 left-4 right-4 md:left-auto md:right-4 md:max-w-sm bg-heritage-card/90 backdrop-blur-xl border border-heritage-border rounded-xl p-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-serif font-bold">{scene.title}</h3>
              <button onClick={() => setShowInfo(false)} className="text-gray-400 hover:text-white ml-2">
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed mb-3">{scene.description}</p>
            <button onClick={() => setShowNarration(!showNarration)} className="flex items-center space-x-2 text-xs text-gold hover:text-gold-light transition-colors">
              <Volume2 className="h-3 w-3" />
              <span>{showNarration ? 'Hide' : 'Read'} Narration</span>
            </button>
            {showNarration && (
              <div className="mt-3 p-3 bg-white/5 rounded-lg border-l-2 border-gold">
                <p className="text-xs text-gray-300 leading-relaxed italic">{scene.narration}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom: Thumbnails */}
      <div className="bg-black/80 backdrop-blur-xl border-t border-white/10 p-3">
        <div className="flex items-center justify-center space-x-3">
          {scenes.map((s, i) => (
            <button
              key={s.id}
              onClick={() => { setCurrentScene(i); setActiveHotspot(null); }}
              className={`relative w-16 h-10 rounded-lg overflow-hidden border-2 transition-all ${i === currentScene ? 'border-gold scale-110' : 'border-transparent opacity-60 hover:opacity-100 hover:border-white/30'}`}
            >
              <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
              {i === currentScene && (
                <div className="absolute inset-0 bg-gold/10" />
              )}
            </button>
          ))}
        </div>
        <div className="text-center mt-2 text-xs text-gray-500">
          {currentScene + 1} of {scenes.length} — {scene.title}
        </div>
      </div>
    </div>
  );
};

export default VirtualTourPage;
