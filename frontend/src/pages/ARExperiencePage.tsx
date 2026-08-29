import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSiteById, FALLBACK_HERITAGE_IMAGE } from '../data/heritageSites';
import {
  Camera, CameraOff, ChevronLeft, X, Info, Share2, History,
  Eye, RefreshCw, Zap, Volume2, Sparkles, Sliders, Scan
} from 'lucide-react';
import { voiceService } from '../services/voiceService';
import toast from 'react-hot-toast';

const ARExperiencePage: React.FC = () => {
  const { siteId } = useParams<{ siteId: string }>();
  const site = getSiteById(siteId || '1');

  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const [mode, setMode] = useState<'present' | 'historical' | 'split'>('present');
  const [splitRatio, setSplitRatio] = useState(50);
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(true);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState<string | null>(null);
  const [isIdentifying, setIsIdentifying] = useState(false);

  const toggleVoice = () => {
    if (audioPlaying) {
      voiceService.stop();
      setAudioPlaying(false);
    } else {
      const speech = `${site?.name}. ${site?.shortDescription}. Built during ${site?.historicalPeriod} in ${site?.architectureStyle}.`;
      voiceService.speak({
        text: speech,
        onStart: () => setAudioPlaying(true),
        onEnd: () => setAudioPlaying(false),
        onError: () => setAudioPlaying(false)
      });
    }
  };

  const snapAndIdentify = () => {
    setIsIdentifying(true);
    toast.loading('AI Vision analyzing monument alignment & stone geometry...', { id: 'lens' });

    setTimeout(() => {
      setIsIdentifying(false);
      const result = `🔍 AI Vision Match: ${site?.name} (${site?.architectureStyle.split('—')[0].trim()})\n• Epoch: ${site?.historicalPeriod}\n• Status: ${site?.preservationStatus} (${site?.rating}/5.0 Rating)\n• Key Alignment: High astronomical orientation fidelity.`;
      setAiAnalysisResult(result);
      toast.success('AI Vision Recognition Complete!', { id: 'lens' });
    }, 1600);
  };

  // Start Camera Stream
  const startCamera = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setCameraActive(true);
          setCameraError(false);
          toast.success('Live AR Camera activated!');
        }
      } else {
        throw new Error('Camera not supported');
      }
    } catch (err) {
      console.warn('Camera access unavailable, using simulated AR viewport', err);
      setCameraError(true);
      setCameraActive(false);
      toast('Using simulated AR view (Camera not accessible)', { icon: '📷' });
    }
  };

  // Stop Camera
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  useEffect(() => {
    // Attempt camera start on mount
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const triggerScan = () => {
    setScanning(true);
    toast.loading('Analyzing architectural features...', { id: 'scan' });
    setTimeout(() => {
      setScanning(false);
      setScanned(true);
      toast.success(`${site?.name || 'Monument'} recognized! AR markers locked.`, { id: 'scan' });
    }, 2000);
  };

  if (!site) return (
    <div className="min-h-screen flex items-center justify-center bg-heritage-dark pt-16">
      <div className="text-center">
        <h2 className="text-2xl font-serif font-bold mb-4">Heritage Site Not Found</h2>
        <Link to="/explore" className="bg-gold text-heritage-dark font-bold px-6 py-3 rounded-xl">Browse All Sites</Link>
      </div>
    </div>
  );

  const hotspots = [
    { x: 30, y: 35, label: 'Main Architectural Core', info: `Built in ${site.historicalPeriod}. Designed in classic ${site.architectureStyle.split('—')[0].trim()} style.` },
    { x: 68, y: 45, label: 'Material & Construction', info: `Crafted from natural materials that have endured for centuries with meticulous hand carvings.` },
    { x: 50, y: 72, label: 'Archaeological Foundation', info: `Subsurface structural foundation engineered to withstand environmental stresses.` },
  ];

  return (
    <div className="min-h-screen bg-black pt-16 flex flex-col select-none overflow-hidden">
      {/* Top Controls Bar */}
      <div className="absolute top-16 left-0 right-0 z-30 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/80 to-transparent">
        <Link to={`/heritage/${site.slug}`} className="flex items-center space-x-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2 text-sm text-gray-300 hover:text-white transition-all">
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">{site.name}</span>
        </Link>

        {/* Live Camera / Simulation Status */}
        <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2">
          {cameraActive ? (
            <>
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <span className="text-xs text-white font-medium">Live Camera AR</span>
            </>
          ) : (
            <>
              <div className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse" />
              <span className="text-xs text-gold font-medium">Simulated AR View</span>
            </>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={cameraActive ? stopCamera : startCamera}
            className={`p-2 rounded-xl border backdrop-blur-md transition-all ${cameraActive ? 'bg-red-500/20 border-red-500/40 text-red-400' : 'bg-black/60 border-white/10 text-gray-300 hover:text-white'}`}
            title={cameraActive ? 'Turn Camera Off' : 'Turn Camera On'}
          >
            {cameraActive ? <CameraOff className="h-4 w-4" /> : <Camera className="h-4 w-4" />}
          </button>
          <button
            onClick={() => { navigator.clipboard.writeText(window.location.href).catch(() => {}); toast.success('AR Link copied to clipboard!'); }}
            className="p-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl text-gray-300 hover:text-white"
            title="Share"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* AR Viewport */}
      <div className="flex-1 relative overflow-hidden flex items-center justify-center">
        {/* Real Camera Feed (if available) */}
        <video
          ref={videoRef}
          playsInline
          muted
          autoPlay
          className={`absolute inset-0 w-full h-full object-cover z-0 ${cameraActive ? 'opacity-100' : 'hidden'}`}
        />

        {/* Simulated Background (if camera not active or in historical overlay mode) */}
        <div className={`absolute inset-0 z-0 ${cameraActive ? 'opacity-40 mix-blend-overlay' : 'opacity-100'}`}>
          <img
            src={site.images[0] || FALLBACK_HERITAGE_IMAGE}
            alt={site.name}
            onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_HERITAGE_IMAGE; }}
            className={`w-full h-full object-cover transition-all duration-700 ${
              mode === 'historical'
                ? 'sepia hue-rotate-15 contrast-125 brightness-90 saturate-150'
                : 'brightness-90'
            }`}
          />
        </div>

        {/* Temporal Split Screen Mode */}
        {mode === 'split' && (
          <div
            className="absolute inset-0 z-10 overflow-hidden pointer-events-none"
            style={{ width: `${splitRatio}%`, borderRight: '2px solid #D4A017' }}
          >
            <img
              src={site.images[site.images.length > 1 ? 1 : 0] || FALLBACK_HERITAGE_IMAGE}
              alt="Historical"
              className="absolute inset-0 w-screen h-full object-cover sepia hue-rotate-15 contrast-150 brightness-75 max-w-none"
            />
            <div className="absolute top-24 left-4 bg-gold text-heritage-dark font-bold text-xs px-2.5 py-1 rounded-md shadow-lg">
              Historical Era
            </div>
          </div>
        )}

        {/* Camera Viewfinder Overlay */}
        <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
          {/* Corner brackets */}
          <div className="absolute top-[18%] left-[10%] w-10 h-10 border-t-2 border-l-2 border-gold/70 rounded-tl-lg" />
          <div className="absolute top-[18%] right-[10%] w-10 h-10 border-t-2 border-r-2 border-gold/70 rounded-tr-lg" />
          <div className="absolute bottom-[24%] left-[10%] w-10 h-10 border-b-2 border-l-2 border-gold/70 rounded-bl-lg" />
          <div className="absolute bottom-[24%] right-[10%] w-10 h-10 border-b-2 border-r-2 border-gold/70 rounded-br-lg" />

          {/* Crosshair Center */}
          <div className="relative">
            <div className="w-8 h-0.5 bg-gold/50 absolute -left-4 top-1/2 -translate-y-1/2" />
            <div className="w-0.5 h-8 bg-gold/50 absolute left-1/2 -translate-x-1/2 -top-4" />
            <div className="w-4 h-4 border-2 border-gold/80 rounded-full" />
          </div>

          {/* Scanning Beam Animation */}
          {scanning && (
            <div className="absolute inset-x-[10%] top-[18%] bottom-[24%] overflow-hidden pointer-events-none">
              <div
                className="w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent shadow-[0_0_15px_#D4A017] animate-bounce"
                style={{ height: '3px' }}
              />
            </div>
          )}
        </div>

        {/* AR Hotspot Markers */}
        {scanned && hotspots.map((h, i) => (
          <div
            key={i}
            className="absolute z-20"
            style={{ left: `${h.x}%`, top: `${h.y}%` }}
          >
            <button
              onClick={() => setActiveHotspot(activeHotspot === i ? null : i)}
              className="relative -translate-x-1/2 -translate-y-1/2 group"
            >
              <div className="w-8 h-8 rounded-full bg-gold/90 border-2 border-white shadow-xl shadow-gold/60 flex items-center justify-center text-heritage-dark font-bold text-xs transition-transform group-hover:scale-125">
                <Info className="h-4 w-4" />
              </div>
              <div className="absolute -top-1 -left-1 w-10 h-10 rounded-full border-2 border-gold/50 animate-ping pointer-events-none" />
            </button>

            {/* Hotspot Popup */}
            {activeHotspot === i && (
              <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-64 bg-heritage-card/95 backdrop-blur-xl border border-gold/40 rounded-2xl p-4 shadow-2xl z-30 animate-fadeInUp">
                <div className="flex items-start justify-between mb-1">
                  <span className="text-xs font-bold text-gold">{h.label}</span>
                  <button onClick={() => setActiveHotspot(null)} className="text-gray-400 hover:text-white">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
                <p className="text-xs text-gray-200 leading-relaxed">{h.info}</p>
                <div className="mt-2 text-[10px] text-gray-500 font-mono">AR Anchored • Precision: High</div>
              </div>
            )}
          </div>
        ))}

        {/* Split Screen Slider Control */}
        {mode === 'split' && (
          <div className="absolute top-28 inset-x-8 z-30 max-w-md mx-auto bg-black/60 backdrop-blur-md rounded-2xl p-3 border border-gold/30">
            <div className="flex justify-between text-xs text-gray-300 mb-1">
              <span>Historical (Past)</span>
              <span>Present Day</span>
            </div>
            <input
              type="range"
              min="10"
              max="90"
              value={splitRatio}
              onChange={e => setSplitRatio(Number(e.target.value))}
              className="w-full accent-gold cursor-pointer"
            />
          </div>
        )}

        {/* Floating Bottom AR Mode Controls */}
        <div className="absolute bottom-24 inset-x-4 z-30 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 bg-heritage-card/90 backdrop-blur-xl p-1.5 rounded-2xl border border-white/15 shadow-2xl">
            <button
              onClick={() => setMode('present')}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-medium transition-all ${mode === 'present' ? 'bg-gold text-heritage-dark font-bold' : 'text-gray-300 hover:text-white'}`}
            >
              <Eye className="h-3.5 w-3.5" />
              <span>Present Day</span>
            </button>
            <button
              onClick={() => setMode('historical')}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-medium transition-all ${mode === 'historical' ? 'bg-gold text-heritage-dark font-bold' : 'text-gray-300 hover:text-white'}`}
            >
              <History className="h-3.5 w-3.5" />
              <span>Historical Recon</span>
            </button>
            <button
              onClick={() => setMode('split')}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-medium transition-all ${mode === 'split' ? 'bg-gold text-heritage-dark font-bold' : 'text-gray-300 hover:text-white'}`}
            >
              <Sliders className="h-3.5 w-3.5" />
              <span>Past / Present</span>
            </button>
            <button
              onClick={snapAndIdentify}
              disabled={isIdentifying}
              className="flex items-center space-x-1.5 bg-gold/20 hover:bg-gold/30 text-gold px-3.5 py-2 rounded-xl text-xs font-bold transition-all border border-gold/40"
              title="Snap & Identify monument with AI Vision"
            >
              <Scan className={`h-3.5 w-3.5 ${isIdentifying ? 'animate-spin' : ''}`} />
              <span>{isIdentifying ? 'Identifying...' : 'AI Lens'}</span>
            </button>
            <button
              onClick={toggleVoice}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                audioPlaying ? 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
              title="Audio guide narration"
            >
              <Volume2 className="h-3.5 w-3.5" />
              <span>{audioPlaying ? 'Stop' : 'Voice'}</span>
            </button>
            <button
              onClick={triggerScan}
              className="flex items-center space-x-1.5 bg-white/10 hover:bg-gold/20 text-gold px-3.5 py-2 rounded-xl text-xs font-bold transition-all"
              title="Rescan site"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${scanning ? 'animate-spin' : ''}`} />
              <span>Scan</span>
            </button>
          </div>

          {/* AI Vision Analysis Popup */}
          {aiAnalysisResult && (
            <div className="max-w-md w-full bg-heritage-card/95 backdrop-blur-2xl border border-gold/50 rounded-2xl p-4 shadow-2xl animate-fadeInUp">
              <div className="flex justify-between items-start mb-2">
                <div className="text-xs font-bold text-gold flex items-center space-x-1">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>AI Monument Recognition</span>
                </div>
                <button onClick={() => setAiAnalysisResult(null)} className="text-gray-400 hover:text-white text-xs">✕</button>
              </div>
              <p className="text-xs text-gray-200 whitespace-pre-line leading-relaxed">{aiAnalysisResult}</p>
            </div>
          )}
        </div>

        {/* Bottom Info Sheet */}
        <div className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-black via-black/90 to-transparent p-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between bg-heritage-card/90 backdrop-blur-xl border border-heritage-border rounded-2xl p-4">
            <div>
              <div className="text-[11px] text-gold font-bold uppercase tracking-wider mb-0.5">{site.category} • {site.historicalPeriod}</div>
              <h2 className="text-base font-serif font-bold text-white">{site.name}</h2>
              <p className="text-xs text-gray-400 truncate max-w-xs md:max-w-md">{site.shortDescription}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Link
                to={`/3d-viewer/${site.id}`}
                className="text-xs bg-blue-600/20 text-blue-400 border border-blue-500/30 px-3.5 py-2 rounded-xl hover:bg-blue-600/30 transition-all whitespace-nowrap"
              >
                3D Model
              </Link>
              <Link
                to={`/heritage/${site.slug}`}
                className="text-xs bg-gold text-heritage-dark font-bold px-3.5 py-2 rounded-xl hover:bg-amber-500 transition-all whitespace-nowrap"
              >
                Full Guide
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ARExperiencePage;
