import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Text } from '@react-three/drei';
import { useParams, Link } from 'react-router-dom';
import { getSiteById } from '../data/heritageSites';
import * as THREE from 'three';
import { Layers, RotateCcw, Maximize2, Info, ChevronLeft, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

// ─── 3D Monument Models ────────────────────────────────────────────────────

const TajMahalModel: React.FC<{ layer: string }> = ({ layer }) => {
  const groupRef = useRef<THREE.Group>(null);
  const marbleColor = layer === 'historical' ? '#C8B8A2' : '#F5F0E8';
  const damage = layer === 'damage';

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Base Platform */}
      <mesh position={[0, -1.5, 0]}>
        <boxGeometry args={[8, 0.4, 8]} />
        <meshStandardMaterial color={marbleColor} roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Main Dome Platform */}
      <mesh position={[0, -1.1, 0]}>
        <boxGeometry args={[5, 0.3, 5]} />
        <meshStandardMaterial color={marbleColor} roughness={0.3} />
      </mesh>
      {/* Main Dome */}
      <mesh position={[0, 0.8, 0]}>
        <sphereGeometry args={[1.8, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={damage ? '#B8A898' : marbleColor} roughness={0.2} metalness={0.15} />
      </mesh>
      {/* Drum under dome */}
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 1, 16]} />
        <meshStandardMaterial color={marbleColor} roughness={0.3} />
      </mesh>
      {/* Finial */}
      <mesh position={[0, 2.7, 0]}>
        <coneGeometry args={[0.1, 0.6, 8]} />
        <meshStandardMaterial color="#D4A017" metalness={0.8} roughness={0.1} />
      </mesh>

      {/* Four Minarets */}
      {[[-2.8, -2.8], [2.8, -2.8], [-2.8, 2.8], [2.8, 2.8]].map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.2, 0.25, 3, 12]} />
            <meshStandardMaterial color={marbleColor} roughness={0.3} />
          </mesh>
          <mesh position={[0, 2.3, 0]}>
            <sphereGeometry args={[0.25, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color={marbleColor} roughness={0.2} />
          </mesh>
          <mesh position={[0, 2.7, 0]}>
            <coneGeometry args={[0.06, 0.4, 8]} />
            <meshStandardMaterial color="#D4A017" metalness={0.8} roughness={0.1} />
          </mesh>
        </group>
      ))}

      {/* Arched Entrance */}
      <mesh position={[0, -0.5, 1.3]}>
        <boxGeometry args={[0.8, 1.5, 0.1]} />
        <meshStandardMaterial color={damage ? '#8A7A6A' : '#E8E0D0'} roughness={0.5} />
      </mesh>

      {/* Reflecting Pool */}
      <mesh position={[0, -1.7, -3]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1, 4]} />
        <meshStandardMaterial color="#4A9FBF" transparent opacity={0.7} roughness={0} metalness={0.3} />
      </mesh>
    </group>
  );
};

const FortModel: React.FC<{ layer: string }> = ({ layer }) => {
  const color = layer === 'historical' ? '#8B4513' : '#C1440E';
  return (
    <group>
      {/* Main Wall */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[6, 2, 0.5]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      {/* Towers */}
      {[-3, 3].map((x, i) => (
        <group key={i} position={[x, 0, 0]}>
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.6, 0.7, 3, 8]} />
            <meshStandardMaterial color={color} roughness={0.8} />
          </mesh>
          <mesh position={[0, 2, 0]}>
            <cylinderGeometry args={[0.7, 0.6, 0.3, 8]} />
            <meshStandardMaterial color="#8B3A0E" roughness={0.7} />
          </mesh>
        </group>
      ))}
      {/* Gate Arch */}
      <mesh position={[0, 0.5, 0.3]}>
        <torusGeometry args={[0.8, 0.15, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#7A3A0C" roughness={0.8} />
      </mesh>
      {/* Base Platform */}
      <mesh position={[0, -1.2, 0]}>
        <boxGeometry args={[8, 0.4, 3]} />
        <meshStandardMaterial color="#6B4226" roughness={0.9} />
      </mesh>
    </group>
  );
};

const TempleModel: React.FC<{ layer: string }> = ({ layer }) => {
  const color = layer === 'historical' ? '#8B7355' : '#B8956A';
  return (
    <group>
      {/* Base */}
      <mesh position={[0, -1.5, 0]}>
        <boxGeometry args={[5, 0.5, 5]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
      {/* Main Shrine */}
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      {/* Shikhara / Vimana Tiers */}
      {[0, 1, 2, 3, 4].map(i => (
        <mesh key={i} position={[0, 0.5 + i * 0.7, 0]}>
          <boxGeometry args={[2 - i * 0.35, 0.6, 2 - i * 0.35]} />
          <meshStandardMaterial color={color} roughness={0.8} />
        </mesh>
      ))}
      {/* Kalash at top */}
      <mesh position={[0, 4.1, 0]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#D4A017" metalness={0.8} roughness={0.1} />
      </mesh>
    </group>
  );
};

const DefaultModel: React.FC<{ layer: string }> = ({ layer }) => {
  const color = layer === 'historical' ? '#8B7355' : '#A08060';
  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <dodecahedronGeometry args={[2, 0]} />
        <meshStandardMaterial color={color} roughness={0.6} wireframe={layer === 'architectural'} />
      </mesh>
      <mesh position={[0, -2.2, 0]}>
        <cylinderGeometry args={[2.5, 3, 0.5, 12]} />
        <meshStandardMaterial color="#6B5A44" roughness={0.9} />
      </mesh>
    </group>
  );
};

const Ground: React.FC = () => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, 0]}>
    <planeGeometry args={[30, 30]} />
    <meshStandardMaterial color="#0A0A0F" roughness={1} />
  </mesh>
);

const getModel = (siteId: string, layer: string) => {
  switch (siteId) {
    case '1': return <TajMahalModel layer={layer} />;
    case '2': return <FortModel layer={layer} />;
    case '5': return <TempleModel layer={layer} />;
    case '9': return <FortModel layer={layer} />;
    default: return <TempleModel layer={layer} />;
  }
};

// ─── Main Page ───────────────────────────────────────────────────────────────

const LAYERS = [
  { id: 'present', label: 'Present Structure', color: 'text-blue-400' },
  { id: 'historical', label: 'Historical Reconstruction', color: 'text-gold' },
  { id: 'architectural', label: 'Architectural Elements', color: 'text-purple-400' },
  { id: 'damage', label: 'Preservation Damage', color: 'text-red-400' },
];

const ThreeDViewerPage: React.FC = () => {
  const { siteId } = useParams<{ siteId: string }>();
  const site = getSiteById(siteId || '1');
  const [activeLayer, setActiveLayer] = useState('present');
  const [showInfo, setShowInfo] = useState(true);
  const controlsRef = useRef<any>(null);

  if (!site) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif font-bold mb-4">Site not found</h2>
          <Link to="/explore" className="bg-gold text-heritage-dark font-bold px-6 py-3 rounded-xl">Browse Sites</Link>
        </div>
      </div>
    );
  }

  const resetCamera = () => {
    toast.success('Camera reset');
  };

  return (
    <div className="flex flex-col h-screen bg-heritage-dark pt-16">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-heritage-card border-b border-heritage-border flex-shrink-0">
        <div className="flex items-center space-x-3">
          <Link to={`/heritage/${site.slug}`} className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors">
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden md:inline">{site.name}</span>
          </Link>
          <span className="text-gray-600">|</span>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm font-medium">3D Digital Twin</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={resetCamera} className="flex items-center space-x-1 text-xs text-gray-400 hover:text-white bg-white/5 px-3 py-1.5 rounded-lg transition-all">
            <RotateCcw className="h-3 w-3" />
            <span>Reset</span>
          </button>
          <button onClick={() => setShowInfo(!showInfo)} className="flex items-center space-x-1 text-xs text-gray-400 hover:text-white bg-white/5 px-3 py-1.5 rounded-lg transition-all">
            <Info className="h-3 w-3" />
            <span>Info</span>
          </button>
          <Link to={`/virtual-tour/${site.id}`} className="flex items-center space-x-1 text-xs text-purple-400 bg-purple-600/10 hover:bg-purple-600/20 border border-purple-500/30 px-3 py-1.5 rounded-lg transition-all">
            <Maximize2 className="h-3 w-3" />
            <span>Virtual Tour</span>
          </Link>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* 3D Canvas */}
        <div className="flex-1 relative">
          <Canvas
            camera={{ position: [0, 3, 8], fov: 45 }}
            gl={{ antialias: true, alpha: false }}
            style={{ background: 'linear-gradient(to bottom, #0a0a1a, #050508)' }}
          >
            <Suspense fallback={null}>
              {/* Lighting */}
              <ambientLight intensity={0.4} />
              <directionalLight position={[10, 10, 5]} intensity={1.2} color="#FFF5E0" castShadow />
              <directionalLight position={[-10, 5, -5]} intensity={0.3} color="#3B82F6" />
              <pointLight position={[0, 5, 0]} intensity={0.5} color="#D4A017" />

              {/* Model */}
              <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
                {getModel(siteId || '1', activeLayer)}
              </Float>

              <Ground />

              {/* Labels */}
              {activeLayer === 'architectural' && (
                <>
                  <Text position={[3, 3, 0]} fontSize={0.2} color="#D4A017" anchorX="center" anchorY="middle">Structural Element</Text>
                </>
              )}

              <OrbitControls
                ref={controlsRef}
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                minDistance={4}
                maxDistance={20}
                maxPolarAngle={Math.PI / 1.8}
              />

              {/* Environment */}
              <fog attach="fog" args={['#050508', 20, 50]} />
            </Suspense>
          </Canvas>

          {/* Controls Hint */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-4 text-xs text-gray-500">
            <span>🖱️ Left drag: Rotate</span>
            <span>⚙️ Right drag: Pan</span>
            <span>🔍 Scroll: Zoom</span>
          </div>

          {/* Loading Indicator */}
          <div className="absolute top-4 left-4 text-xs text-gray-500 flex items-center space-x-2">
            <Zap className="h-3 w-3 text-gold" />
            <span>3D Digital Twin — Educational Demo</span>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-72 bg-heritage-card border-l border-heritage-border flex flex-col overflow-auto hidden md:flex">
          {/* Site Info */}
          {showInfo && (
            <div className="p-5 border-b border-heritage-border">
              <h3 className="font-serif font-bold text-lg mb-1">{site.name}</h3>
              <p className="text-xs text-gray-400 mb-3">{site.historicalPeriod}</p>
              <p className="text-sm text-gray-300 leading-relaxed">{site.shortDescription}</p>
            </div>
          )}

          {/* Layer Controls */}
          <div className="p-5 border-b border-heritage-border">
            <div className="flex items-center space-x-2 mb-4">
              <Layers className="h-4 w-4 text-gold" />
              <span className="text-sm font-medium">View Layers</span>
            </div>
            <div className="space-y-2">
              {LAYERS.map(layer => (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all text-sm ${
                    activeLayer === layer.id
                      ? 'bg-gold/10 border-gold/30 text-white'
                      : 'bg-white/5 border-heritage-border text-gray-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <span>{layer.label}</span>
                  {activeLayer === layer.id && (
                    <div className="w-2 h-2 rounded-full bg-gold" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Layer Description */}
          <div className="p-5 border-b border-heritage-border">
            <h4 className="text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">Current View</h4>
            <p className="text-sm text-gray-300">
              {activeLayer === 'present' && 'Viewing the current state of the structure as it exists today.'}
              {activeLayer === 'historical' && 'Historical reconstruction showing how the monument looked at its peak glory.'}
              {activeLayer === 'architectural' && 'Highlighting structural and architectural elements with transparent rendering.'}
              {activeLayer === 'damage' && 'Preservation damage assessment view, highlighting areas requiring conservation attention.'}
            </p>
          </div>

          {/* Architecture Facts */}
          <div className="p-5 flex-1">
            <h4 className="text-xs font-medium text-gray-400 mb-3 uppercase tracking-wide">Architecture Notes</h4>
            <div className="space-y-2">
              {site.facts.slice(0, 3).map((fact, i) => (
                <div key={i} className="p-3 bg-white/5 rounded-lg border-l-2 border-gold/40">
                  <p className="text-xs text-gray-300 leading-relaxed">{fact}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="p-4 border-t border-heritage-border">
            <p className="text-xs text-gray-500 leading-relaxed">
              ⚠️ This 3D model is a geometric representation for educational purposes. 
              Not a photogrammetric survey. Architecture may not be to scale.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeDViewerPage;
