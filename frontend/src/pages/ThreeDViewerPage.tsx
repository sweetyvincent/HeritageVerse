import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float, Text, Html } from '@react-three/drei';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { heritageSites, getSiteById } from '../data/heritageSites';
import * as THREE from 'three';
import {
  Layers, RotateCcw, Maximize2, Info, ChevronLeft, Zap,
  Compass, ArrowLeft, ArrowRight, Play, Pause, ZoomIn, ZoomOut,
  ChevronDown, Eye, Check
} from 'lucide-react';
import toast from 'react-hot-toast';

// ─── Camera Controller & On-screen 360° Controls ───────────────────────────

interface ControlsHandle {
  rotateLeft: () => void;
  rotateRight: () => void;
  tiltUp: () => void;
  tiltDown: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  reset: () => void;
  setView: (view: 'front' | 'side' | 'top' | 'isometric') => void;
}

const CameraManager: React.FC<{
  autoRotate: boolean;
  autoRotateSpeed: number;
  onControlsReady: (controls: any) => void;
}> = ({ autoRotate, autoRotateSpeed, onControlsReady }) => {
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    if (controlsRef.current) {
      onControlsReady(controlsRef.current);
    }
  }, [onControlsReady]);

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={true}
      enableZoom={true}
      enableRotate={true}
      autoRotate={autoRotate}
      autoRotateSpeed={autoRotateSpeed}
      minDistance={3}
      maxDistance={24}
      maxPolarAngle={Math.PI / 1.85}
      dampingFactor={0.05}
    />
  );
};

// ─── Interactive 3D Hotspot Component ──────────────────────────────────────

const Hotspot3D: React.FC<{
  position: [number, number, number];
  title: string;
  desc: string;
}> = ({ position, title, desc }) => {
  const [open, setOpen] = useState(false);

  return (
    <group position={position}>
      <Html distanceFactor={12} center zIndexRange={[100, 0]}>
        <div className="relative group select-none">
          <button
            onClick={() => setOpen(!open)}
            className="w-7 h-7 rounded-full bg-gold/90 border-2 border-white shadow-xl shadow-gold/60 flex items-center justify-center text-heritage-dark font-bold text-xs hover:scale-125 transition-transform"
          >
            ✦
          </button>
          {open && (
            <div className="absolute bottom-9 left-1/2 -translate-x-1/2 w-56 bg-heritage-card/95 backdrop-blur-xl border border-gold/40 rounded-xl p-3 shadow-2xl z-50 text-left">
              <div className="flex justify-between items-start mb-1">
                <div className="text-xs font-bold text-gold">{title}</div>
                <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white text-xs">✕</button>
              </div>
              <p className="text-[11px] text-gray-200 leading-relaxed">{desc}</p>
            </div>
          )}
        </div>
      </Html>
    </group>
  );
};

// ─── 1. TAJ MAHAL (Site 1) ──────────────────────────────────────────────────
const TajMahalModel: React.FC<{ layer: string }> = ({ layer }) => {
  const marble = layer === 'historical' ? '#F7F3E9' : '#FFFFFF';
  const wire = layer === 'architectural';
  const accent = layer === 'damage' ? '#8B5A2B' : marble;

  return (
    <group>
      {/* Plinth */}
      <mesh position={[0, -1.4, 0]}>
        <boxGeometry args={[7, 0.4, 7]} />
        <meshStandardMaterial color={marble} wireframe={wire} roughness={0.2} />
      </mesh>
      {/* Main Mausoleum Cube */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[4, 2, 4]} />
        <meshStandardMaterial color={accent} wireframe={wire} roughness={0.2} />
      </mesh>
      {/* Grand Central Arch (Iwan) */}
      <mesh position={[0, -0.2, 2.01]}>
        <boxGeometry args={[1.8, 1.4, 0.1]} />
        <meshStandardMaterial color="#0A0A0F" roughness={0.9} />
      </mesh>
      {/* Drum */}
      <mesh position={[0, 1.0, 0]}>
        <cylinderGeometry args={[1.4, 1.4, 0.6, 24]} />
        <meshStandardMaterial color={marble} wireframe={wire} roughness={0.2} />
      </mesh>
      {/* Central Bulbous Onion Dome */}
      <mesh position={[0, 1.9, 0]}>
        <sphereGeometry args={[1.5, 32, 24, 0, Math.PI * 2, 0, Math.PI / 1.7]} />
        <meshStandardMaterial color={marble} wireframe={wire} roughness={0.15} metalness={0.1} />
      </mesh>
      {/* Spire / Kalash */}
      <mesh position={[0, 3.1, 0]}>
        <coneGeometry args={[0.08, 0.9, 12]} />
        <meshStandardMaterial color="#D4A017" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* 4 Corner Chatris */}
      {[[-1.4, -1.4], [1.4, -1.4], [-1.4, 1.4], [1.4, 1.4]].map(([x, z], i) => (
        <group key={i} position={[x, 1.1, z]}>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.4, 0.4, 0.4, 12]} />
            <meshStandardMaterial color={marble} wireframe={wire} />
          </mesh>
          <mesh position={[0, 0.35, 0]}>
            <sphereGeometry args={[0.4, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color={marble} wireframe={wire} />
          </mesh>
        </group>
      ))}

      {/* 4 Corner Minarets */}
      {[[-3.1, -3.1], [3.1, -3.1], [-3.1, 3.1], [3.1, 3.1]].map(([x, z], i) => (
        <group key={i} position={[x, 0.4, z]}>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.22, 0.28, 3.6, 16]} />
            <meshStandardMaterial color={marble} wireframe={wire} roughness={0.3} />
          </mesh>
          <mesh position={[0, 1.9, 0]}>
            <sphereGeometry args={[0.28, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color={marble} wireframe={wire} />
          </mesh>
          <mesh position={[0, 2.3, 0]}>
            <coneGeometry args={[0.06, 0.5, 8]} />
            <meshStandardMaterial color="#D4A017" metalness={0.8} />
          </mesh>
        </group>
      ))}

      {/* Reflecting Pool */}
      <mesh position={[0, -1.55, 3]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.5, 4]} />
        <meshStandardMaterial color="#227093" roughness={0.1} metalness={0.6} />
      </mesh>

      <Hotspot3D position={[0, 2.2, 1.6]} title="Central Marble Dome" desc="Rises 73 meters from the plinth. Made of Makrana pure white marble." />
      <Hotspot3D position={[3.1, 1.5, 3.1]} title="Tilted Minaret" desc="Engineered with an outward 12-degree tilt to protect the main tomb during earthquakes." />
    </group>
  );
};

// ─── 2. RED FORT (Site 2) ───────────────────────────────────────────────────
const RedFortModel: React.FC<{ layer: string }> = ({ layer }) => {
  const red = layer === 'historical' ? '#B83B1E' : '#8B2500';
  const wire = layer === 'architectural';

  return (
    <group>
      {/* Sandstone Rampart Wall */}
      <mesh position={[0, -0.4, 0]}>
        <boxGeometry args={[7.5, 2.2, 1.2]} />
        <meshStandardMaterial color={red} wireframe={wire} roughness={0.8} />
      </mesh>
      {/* Wall Battlements */}
      {[-3, -2, -1, 1, 2, 3].map((x, i) => (
        <mesh key={i} position={[x, 0.8, 0]}>
          <boxGeometry args={[0.4, 0.3, 1.25]} />
          <meshStandardMaterial color="#7A1F00" wireframe={wire} />
        </mesh>
      ))}
      {/* Lahore Gate Archway */}
      <mesh position={[0, -0.6, 0.65]}>
        <boxGeometry args={[1.4, 1.6, 0.2]} />
        <meshStandardMaterial color="#1a0a05" />
      </mesh>
      {/* Octagonal Bastion Towers */}
      {[-3.6, 3.6].map((x, i) => (
        <group key={i} position={[x, 0.2, 0]}>
          <mesh>
            <cylinderGeometry args={[0.8, 0.9, 3.2, 8]} />
            <meshStandardMaterial color={red} wireframe={wire} roughness={0.8} />
          </mesh>
          <mesh position={[0, 1.8, 0]}>
            <cylinderGeometry args={[0.9, 0.8, 0.4, 8]} />
            <meshStandardMaterial color="#A03010" />
          </mesh>
          <mesh position={[0, 2.2, 0]}>
            <sphereGeometry args={[0.4, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
        </group>
      ))}
      {/* Imperial Pavilion (Diwan-i-Khas) on top */}
      <mesh position={[0, 1.2, -1.2]}>
        <boxGeometry args={[3, 1.2, 2]} />
        <meshStandardMaterial color="#FFFFFF" wireframe={wire} />
      </mesh>
      {/* Flagstaff */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 2, 8]} />
        <meshStandardMaterial color="#E8E8F0" metalness={0.7} />
      </mesh>

      <Hotspot3D position={[0, 0.2, 0.8]} title="Lahori Gate" desc="The principal entrance where India's Prime Minister hoists the national flag on Independence Day." />
      <Hotspot3D position={[3.6, 1.5, 0]} title="Octagonal Bastion" desc="Massive red sandstone defensive bastions along the 2.41 km fortress perimeter." />
    </group>
  );
};

// ─── 3. HAMPI STONE CHARIOT (Site 3) ────────────────────────────────────────
const HampiModel: React.FC<{ layer: string }> = ({ layer }) => {
  const granite = layer === 'historical' ? '#C8B896' : '#9E8B6E';
  const wire = layer === 'architectural';

  return (
    <group>
      {/* Boulder Field Platform */}
      <mesh position={[0, -1.5, 0]}>
        <boxGeometry args={[7, 0.3, 7]} />
        <meshStandardMaterial color="#5C4D3C" roughness={0.9} />
      </mesh>
      {/* Chariot Base Shrine */}
      <mesh position={[0, -0.6, 0]}>
        <boxGeometry args={[3.2, 1.4, 3.6]} />
        <meshStandardMaterial color={granite} wireframe={wire} roughness={0.8} />
      </mesh>
      {/* 4 Carved Stone Wheels */}
      {[[-1.8, -1.2], [1.8, -1.2], [-1.8, 1.2], [1.8, 1.2]].map(([x, z], i) => (
        <group key={i} position={[x, -0.7, z]} rotation={[0, 0, Math.PI / 2]}>
          <mesh>
            <cylinderGeometry args={[0.65, 0.65, 0.25, 24]} />
            <meshStandardMaterial color="#8A775C" wireframe={wire} />
          </mesh>
          <mesh position={[0, 0.15, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 0.1, 12]} />
            <meshStandardMaterial color="#D4A017" metalness={0.7} />
          </mesh>
        </group>
      ))}
      {/* Stepped Vimana Shikhara */}
      {[0, 1, 2].map(lvl => (
        <mesh key={lvl} position={[0, 0.4 + lvl * 0.5, 0]}>
          <boxGeometry args={[2.5 - lvl * 0.6, 0.5, 2.8 - lvl * 0.6]} />
          <meshStandardMaterial color={granite} wireframe={wire} roughness={0.8} />
        </mesh>
      ))}
      {/* 2 Stone Guarding Elephants */}
      {[-0.8, 0.8].map((x, i) => (
        <group key={i} position={[x, -0.9, 2.2]}>
          <mesh>
            <boxGeometry args={[0.5, 0.6, 0.9]} />
            <meshStandardMaterial color="#7A6852" />
          </mesh>
          <mesh position={[0, -0.2, 0.5]}>
            <cylinderGeometry args={[0.08, 0.04, 0.4, 8]} />
            <meshStandardMaterial color="#7A6852" />
          </mesh>
        </group>
      ))}

      <Hotspot3D position={[1.8, -0.5, 1.2]} title="Carved Stone Wheel" desc="Depicted on the 50-paisa Indian coin. Hand-carved with concentric petal spokes." />
      <Hotspot3D position={[0, 1.6, 0]} title="Stepped Mandapa Tower" desc="Classic Vijayanagara Dravidian architecture built within the sacred Vittala Temple complex." />
    </group>
  );
};

// ─── 4. MAHABALIPURAM SHORE TEMPLE (Site 4) ─────────────────────────────────
const MahabalipuramModel: React.FC<{ layer: string }> = ({ layer }) => {
  const rock = layer === 'historical' ? '#D4C4A8' : '#A69575';
  const wire = layer === 'architectural';

  return (
    <group>
      {/* Ocean / Coast plane */}
      <mesh position={[0, -1.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#1B4D5E" roughness={0.2} metalness={0.4} />
      </mesh>
      {/* Sand Plinth */}
      <mesh position={[0, -1.4, 0]}>
        <boxGeometry args={[6.5, 0.4, 5.5]} />
        <meshStandardMaterial color="#C8B88A" roughness={0.9} />
      </mesh>
      {/* Main East Vimana Tower (Tall) */}
      <group position={[0.8, -0.2, 0]}>
        <mesh position={[0, -0.5, 0]}>
          <boxGeometry args={[2.2, 1.4, 2.2]} />
          <meshStandardMaterial color={rock} wireframe={wire} roughness={0.8} />
        </mesh>
        {[0, 1, 2, 3].map(i => (
          <mesh key={i} position={[0, 0.4 + i * 0.6, 0]}>
            <boxGeometry args={[1.8 - i * 0.35, 0.55, 1.8 - i * 0.35]} />
            <meshStandardMaterial color={rock} wireframe={wire} roughness={0.8} />
          </mesh>
        ))}
        <mesh position={[0, 2.8, 0]}>
          <sphereGeometry args={[0.3, 12, 8]} />
          <meshStandardMaterial color="#D4A017" metalness={0.7} />
        </mesh>
      </group>
      {/* Smaller West Shrine Tower */}
      <group position={[-1.8, -0.6, 0]}>
        <mesh position={[0, -0.2, 0]}>
          <boxGeometry args={[1.4, 1.0, 1.4]} />
          <meshStandardMaterial color={rock} wireframe={wire} roughness={0.8} />
        </mesh>
        {[0, 1].map(i => (
          <mesh key={i} position={[0, 0.4 + i * 0.45, 0]}>
            <boxGeometry args={[1.1 - i * 0.3, 0.4, 1.1 - i * 0.3]} />
            <meshStandardMaterial color={rock} wireframe={wire} />
          </mesh>
        ))}
      </group>
      {/* Nandi Wall Statues */}
      {[-2, -1, 0, 1, 2].map((x, i) => (
        <mesh key={i} position={[x, -1.1, 2.2]}>
          <boxGeometry args={[0.3, 0.25, 0.4]} />
          <meshStandardMaterial color="#7A684E" />
        </mesh>
      ))}

      <Hotspot3D position={[0.8, 2.2, 0]} title="Shore Temple Vimana" desc="Has survived 1,300+ years of coastal salt spray and sea erosion since Pallava era." />
      <Hotspot3D position={[0, -1.0, 2.2]} title="Monolithic Nandi Perimeter" desc="Granite wall sculpted with rows of resting sacred bulls facing the Bay of Bengal." />
    </group>
  );
};

// ─── 5. BRIHADEESWARAR TEMPLE (Site 5) ──────────────────────────────────────
const BrihadeeswararModel: React.FC<{ layer: string }> = ({ layer }) => {
  const granite = layer === 'historical' ? '#E5CE9F' : '#B89B6C';
  const wire = layer === 'architectural';

  return (
    <group>
      {/* Great Temple Courtyard */}
      <mesh position={[0, -1.5, 0]}>
        <boxGeometry args={[8, 0.4, 6]} />
        <meshStandardMaterial color="#7A6643" roughness={0.9} />
      </mesh>
      {/* Sanctuary Base */}
      <mesh position={[-1.2, -0.6, 0]}>
        <boxGeometry args={[3.2, 1.4, 3.2]} />
        <meshStandardMaterial color={granite} wireframe={wire} roughness={0.8} />
      </mesh>
      {/* Soaring 8-tier Dravidian Vimana Tower */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map(tier => (
        <mesh key={tier} position={[-1.2, 0.3 + tier * 0.45, 0]}>
          <boxGeometry args={[2.8 - tier * 0.28, 0.42, 2.8 - tier * 0.28]} />
          <meshStandardMaterial color={granite} wireframe={wire} roughness={0.8} />
        </mesh>
      ))}
      {/* 80-tonne Monolithic Octagonal Capstone (Kumbam) */}
      <mesh position={[-1.2, 4.0, 0]}>
        <sphereGeometry args={[0.55, 24, 16, 0, Math.PI * 2, 0, Math.PI / 1.6]} />
        <meshStandardMaterial color="#D4A017" metalness={0.6} roughness={0.2} />
      </mesh>
      {/* Golden Kalasha Finial */}
      <mesh position={[-1.2, 4.7, 0]}>
        <coneGeometry args={[0.12, 0.6, 12]} />
        <meshStandardMaterial color="#D4A017" metalness={0.9} />
      </mesh>
      {/* Long Assembly Mandapa Hall */}
      <mesh position={[1.8, -0.8, 0]}>
        <boxGeometry args={[3.2, 1.0, 2.2]} />
        <meshStandardMaterial color={granite} wireframe={wire} roughness={0.8} />
      </mesh>
      {/* Monolithic Nandi Mandapa */}
      <mesh position={[3.6, -1.0, 0]}>
        <boxGeometry args={[1.0, 0.6, 0.8]} />
        <meshStandardMaterial color="#3A3225" />
      </mesh>

      <Hotspot3D position={[-1.2, 4.2, 0]} title="80-Tonne Kumbam Capstone" desc="A single 80-tonne granite sphere raised 66 meters high via a 6 km earthen ramp." />
      <Hotspot3D position={[3.6, -0.6, 0]} title="Monolithic Nandi" desc="Single rock 25-tonne Nandi statue consecrated under Chola Emperor Raja Raja I." />
    </group>
  );
};

// ─── 6. KONARK SUN TEMPLE (Site 6) ──────────────────────────────────────────
const KonarkModel: React.FC<{ layer: string }> = ({ layer }) => {
  const stone = layer === 'historical' ? '#D6BA8B' : '#9E855A';
  const wire = layer === 'architectural';

  return (
    <group>
      {/* Sandy Base */}
      <mesh position={[0, -1.5, 0]}>
        <boxGeometry args={[8, 0.4, 6.5]} />
        <meshStandardMaterial color="#5C4D35" roughness={0.9} />
      </mesh>
      {/* Chariot Platform */}
      <mesh position={[-0.5, -0.8, 0]}>
        <boxGeometry args={[4.5, 1.0, 4.0]} />
        <meshStandardMaterial color={stone} wireframe={wire} roughness={0.8} />
      </mesh>
      {/* Stepped Pyramidal Jagamohana Roof */}
      {[0, 1, 2, 3, 4].map(tier => (
        <mesh key={tier} position={[-0.5, -0.1 + tier * 0.5, 0]}>
          <boxGeometry args={[3.6 - tier * 0.55, 0.48, 3.6 - tier * 0.55]} />
          <meshStandardMaterial color={stone} wireframe={wire} roughness={0.8} />
        </mesh>
      ))}
      {/* Crown Amla */}
      <mesh position={[-0.5, 2.5, 0]}>
        <cylinderGeometry args={[0.7, 0.6, 0.3, 16]} />
        <meshStandardMaterial color="#D4A017" metalness={0.6} />
      </mesh>
      {/* 8 Visible Giant Sundial Wheels */}
      {[-2.0, -0.7, 0.7, 2.0].map((x, i) => (
        <React.Fragment key={i}>
          <mesh position={[x - 0.5, -0.8, 2.1]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.55, 0.55, 0.15, 24]} />
            <meshStandardMaterial color="#6E5A3B" wireframe={wire} />
          </mesh>
          <mesh position={[x - 0.5, -0.8, -2.1]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.55, 0.55, 0.15, 24]} />
            <meshStandardMaterial color="#6E5A3B" wireframe={wire} />
          </mesh>
        </React.Fragment>
      ))}
      {/* Galloping Sun Chariot Horses in front */}
      {[-0.6, -0.2, 0.2, 0.6].map((z, i) => (
        <mesh key={i} position={[2.8, -1.0, z]}>
          <boxGeometry args={[0.8, 0.5, 0.22]} />
          <meshStandardMaterial color="#8A7450" />
        </mesh>
      ))}

      <Hotspot3D position={[-0.5, -0.8, 2.2]} title="24 Sun Chariot Wheels" desc="Each 3-meter wheel acts as an exact sundial. Time is read by the shadow cast on its 8 spokes." />
      <Hotspot3D position={[2.8, -0.6, 0]} title="7 Galloping Horses" desc="Represent the 7 days of the week, pulling the celestial chariot of Surya towards the dawn." />
    </group>
  );
};

// ─── 7. AJANTA CAVES (Site 7) ───────────────────────────────────────────────
const AjantaModel: React.FC<{ layer: string }> = ({ layer }) => {
  const basalt = layer === 'historical' ? '#8A7A66' : '#5C5042';
  const wire = layer === 'architectural';

  return (
    <group>
      {/* Horseshoe Basalt Mountain Cliff */}
      <mesh position={[0, 0.2, -1.2]}>
        <boxGeometry args={[8, 3.6, 2.5]} />
        <meshStandardMaterial color={basalt} wireframe={wire} roughness={0.9} />
      </mesh>
      {/* Horseshoe Gorge river valley */}
      <mesh position={[0, -1.6, 1.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="#2B3A28" roughness={0.9} />
      </mesh>
      {/* Cave 19 Chaitya Horse-Shoe Sun Window */}
      <mesh position={[0, 0.2, 0.1]}>
        <torusGeometry args={[1.1, 0.25, 12, 24, Math.PI]} />
        <meshStandardMaterial color="#D4A017" metalness={0.5} wireframe={wire} />
      </mesh>
      {/* Cave Entrance Portals */}
      {[-2.2, 0, 2.2].map((x, i) => (
        <mesh key={i} position={[x, -0.6, 0.05]}>
          <boxGeometry args={[1.4, 1.5, 0.2]} />
          <meshStandardMaterial color="#0A0A0F" />
        </mesh>
      ))}
      {/* Colonnade Pillars */}
      {[-2.8, -1.6, -0.6, 0.6, 1.6, 2.8].map((x, i) => (
        <mesh key={i} position={[x, -0.6, 0.3]}>
          <cylinderGeometry args={[0.1, 0.12, 1.5, 12]} />
          <meshStandardMaterial color="#8A7660" />
        </mesh>
      ))}

      <Hotspot3D position={[0, 0.4, 0.2]} title="Chaitya Sun Window" desc="Directs the dawn sunlight into the innermost shrine illuminating the seated Buddha." />
      <Hotspot3D position={[-2.2, -0.3, 0.2]} title="Cave 1 Monastery" desc="Contains 1,500-year-old natural mineral fresco murals of Bodhisattva Padmapani." />
    </group>
  );
};

// ─── 8. ELLORA KAILASH TEMPLE (Site 8) ──────────────────────────────────────
const ElloraModel: React.FC<{ layer: string }> = ({ layer }) => {
  const rock = layer === 'historical' ? '#9E8E7C' : '#6E6050';
  const wire = layer === 'architectural';

  return (
    <group>
      {/* 3 Excavated Mountain Rock Walls (Top-Down cut) */}
      <mesh position={[-3.8, 0.5, 0]}>
        <boxGeometry args={[0.8, 4, 7]} />
        <meshStandardMaterial color="#4A3F33" roughness={0.9} />
      </mesh>
      <mesh position={[3.8, 0.5, 0]}>
        <boxGeometry args={[0.8, 4, 7]} />
        <meshStandardMaterial color="#4A3F33" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.5, -3.2]}>
        <boxGeometry args={[7, 4, 0.8]} />
        <meshStandardMaterial color="#4A3F33" roughness={0.9} />
      </mesh>

      {/* Sunken Courtyard Pit */}
      <mesh position={[0, -1.5, 0]}>
        <boxGeometry args={[7, 0.2, 6]} />
        <meshStandardMaterial color="#3A3025" roughness={0.9} />
      </mesh>

      {/* Central Monolithic Kailash Temple (Carved top to bottom) */}
      <mesh position={[0, -0.4, -0.5]}>
        <boxGeometry args={[2.8, 2.2, 3.2]} />
        <meshStandardMaterial color={rock} wireframe={wire} roughness={0.8} />
      </mesh>
      {/* Shikhara Spire */}
      {[0, 1, 2].map(lvl => (
        <mesh key={lvl} position={[0, 0.9 + lvl * 0.5, -0.5]}>
          <boxGeometry args={[2.0 - lvl * 0.5, 0.45, 2.2 - lvl * 0.5]} />
          <meshStandardMaterial color={rock} wireframe={wire} />
        </mesh>
      ))}
      <mesh position={[0, 2.5, -0.5]}>
        <sphereGeometry args={[0.35, 16, 12]} />
        <meshStandardMaterial color="#D4A017" metalness={0.7} />
      </mesh>

      {/* Two 15-meter Monolithic Victory Pillars (Dhwajasthambhas) */}
      {[-1.8, 1.8].map((x, i) => (
        <group key={i} position={[x, -0.1, 1.4]}>
          <mesh>
            <cylinderGeometry args={[0.2, 0.28, 2.8, 12]} />
            <meshStandardMaterial color={rock} wireframe={wire} />
          </mesh>
          <mesh position={[0, 1.5, 0]}>
            <sphereGeometry args={[0.25, 12, 8]} />
            <meshStandardMaterial color="#D4A017" metalness={0.7} />
          </mesh>
        </group>
      ))}

      <Hotspot3D position={[0, 1.5, -0.5]} title="Monolithic Cave 16" desc="World's largest monolithic excavation. 200,000 tonnes of basalt carved top-to-bottom without scaffolding." />
      <Hotspot3D position={[1.8, 0.5, 1.4]} title="Dhwajasthambha" desc="Monolithic 15-meter ornamental stone pillar carved entirely in situ from the cliff rock." />
    </group>
  );
};

// ─── 9. MYSORE PALACE (Site 9) ──────────────────────────────────────────────
const MysoreModel: React.FC<{ layer: string }> = ({ layer }) => {
  const granite = layer === 'historical' ? '#E8DEC8' : '#C8BC9E';
  const domePink = '#C4717A';
  const wire = layer === 'architectural';

  return (
    <group>
      {/* Palace Grounds */}
      <mesh position={[0, -1.5, 0]}>
        <boxGeometry args={[8, 0.3, 6]} />
        <meshStandardMaterial color="#3A4A32" roughness={0.9} />
      </mesh>
      {/* 3-story Indo-Saracenic Facade */}
      <mesh position={[0, -0.4, 0]}>
        <boxGeometry args={[6.8, 2.0, 2.4]} />
        <meshStandardMaterial color={granite} wireframe={wire} roughness={0.6} />
      </mesh>
      {/* Central 5-Story Clock Tower */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[1.6, 2.4, 1.6]} />
        <meshStandardMaterial color={granite} wireframe={wire} />
      </mesh>
      {/* Golden Clock Tower Dome */}
      <mesh position={[0, 2.3, 0]}>
        <sphereGeometry args={[0.9, 24, 16, 0, Math.PI * 2, 0, Math.PI / 1.7]} />
        <meshStandardMaterial color="#D4A017" metalness={0.8} roughness={0.15} />
      </mesh>
      <mesh position={[0, 3.2, 0]}>
        <coneGeometry args={[0.08, 0.8, 12]} />
        <meshStandardMaterial color="#D4A017" metalness={0.9} />
      </mesh>

      {/* 2 Pink Marble Corner Domes */}
      {[-2.8, 2.8].map((x, i) => (
        <group key={i} position={[x, 0.8, 0]}>
          <mesh>
            <cylinderGeometry args={[0.8, 0.8, 0.5, 16]} />
            <meshStandardMaterial color={granite} wireframe={wire} />
          </mesh>
          <mesh position={[0, 0.6, 0]}>
            <sphereGeometry args={[0.85, 24, 16, 0, Math.PI * 2, 0, Math.PI / 1.7]} />
            <meshStandardMaterial color={domePink} roughness={0.2} />
          </mesh>
        </group>
      ))}

      {/* Arched Loggias along Front */}
      {[-2, -1, 1, 2].map((x, i) => (
        <mesh key={i} position={[x, -0.6, 1.25]}>
          <boxGeometry args={[0.7, 0.9, 0.1]} />
          <meshStandardMaterial color="#0A0A0F" />
        </mesh>
      ))}

      <Hotspot3D position={[0, 2.6, 0]} title="Golden Central Dome" desc="The 145-foot central clock tower illuminated by thousands of bulbs during Dasara festival." />
      <Hotspot3D position={[2.8, 1.4, 0]} title="Pink Marble Corner Dome" desc="Indo-Saracenic fusion combining Hindu Rajput, Mughal, and Gothic design elements." />
    </group>
  );
};

// ─── 10. SANCHI STUPA (Site 10) ─────────────────────────────────────────────
const SanchiModel: React.FC<{ layer: string }> = ({ layer }) => {
  const sand = layer === 'historical' ? '#D6C5A2' : '#A89878';
  const wire = layer === 'architectural';

  return (
    <group>
      {/* Circular Hillock Base */}
      <mesh position={[0, -1.5, 0]}>
        <cylinderGeometry args={[4.2, 4.6, 0.4, 32]} />
        <meshStandardMaterial color="#4A4030" roughness={0.9} />
      </mesh>
      {/* Circular Medhi (Lower Terrace) */}
      <mesh position={[0, -1.1, 0]}>
        <cylinderGeometry args={[3.6, 3.6, 0.5, 32]} />
        <meshStandardMaterial color={sand} wireframe={wire} roughness={0.8} />
      </mesh>
      {/* Massive Hemispherical Dome (Anda) */}
      <mesh position={[0, -0.85, 0]}>
        <sphereGeometry args={[2.8, 36, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={sand} wireframe={wire} roughness={0.7} />
      </mesh>
      {/* Harmika Square Balcony */}
      <mesh position={[0, 2.1, 0]}>
        <boxGeometry args={[0.9, 0.4, 0.9]} />
        <meshStandardMaterial color={sand} wireframe={wire} />
      </mesh>
      {/* 3-Tiered Chhatra Spire (Umbrellas of Faith, Hope, Charity) */}
      {[0, 1, 2].map(i => (
        <mesh key={i} position={[0, 2.5 + i * 0.35, 0]}>
          <cylinderGeometry args={[0.5 - i * 0.12, 0.5 - i * 0.12, 0.08, 16]} />
          <meshStandardMaterial color="#D4A017" metalness={0.7} />
        </mesh>
      ))}

      {/* 4 Cardinal Torana Gateways (N, S, E, W) */}
      {[
        { pos: [0, -0.4, 3.6], rot: 0, title: 'South Torana Gate' },
        { pos: [0, -0.4, -3.6], rot: 0, title: 'North Torana Gate' },
        { pos: [3.6, -0.4, 0], rot: Math.PI / 2, title: 'East Torana Gate' },
        { pos: [-3.6, -0.4, 0], rot: Math.PI / 2, title: 'West Torana Gate' }
      ].map((gate, i) => (
        <group key={i} position={gate.pos as [number, number, number]} rotation={[0, gate.rot, 0]}>
          {/* Two Gateway Pillars */}
          {[-0.6, 0.6].map((x, j) => (
            <mesh key={j} position={[x, 0, 0]}>
              <boxGeometry args={[0.18, 2.2, 0.18]} />
              <meshStandardMaterial color={sand} wireframe={wire} />
            </mesh>
          ))}
          {/* 3 Carved Horizontal Architraves */}
          {[0, 1, 2].map(k => (
            <mesh key={k} position={[0, 0.7 + k * 0.3, 0]}>
              <boxGeometry args={[1.8, 0.15, 0.15]} />
              <meshStandardMaterial color={sand} wireframe={wire} />
            </mesh>
          ))}
        </group>
      ))}

      <Hotspot3D position={[0, 1.2, 2.8]} title="Hemispherical Anda" desc="Symbolizes the vault of heaven enclosing sacred relics of Buddha's disciples." />
      <Hotspot3D position={[0, -0.2, 3.6]} title="Torana Gateway" desc="Intricately carved ivory & stone architraves depicting the Jataka tales of Buddha's past lives." />
    </group>
  );
};

// ─── Model Selector ─────────────────────────────────────────────────────────

const getDistinctMonumentModel = (siteId: string, layer: string) => {
  switch (siteId) {
    case '1': return <TajMahalModel layer={layer} />;
    case '2': return <RedFortModel layer={layer} />;
    case '3': return <HampiModel layer={layer} />;
    case '4': return <MahabalipuramModel layer={layer} />;
    case '5': return <BrihadeeswararModel layer={layer} />;
    case '6': return <KonarkModel layer={layer} />;
    case '7': return <AjantaModel layer={layer} />;
    case '8': return <ElloraModel layer={layer} />;
    case '9': return <MysoreModel layer={layer} />;
    case '10': return <SanchiModel layer={layer} />;
    default: return <TajMahalModel layer={layer} />;
  }
};

// ─── Main 3D Viewer Page ───────────────────────────────────────────────────

const LAYERS = [
  { id: 'present', label: 'Present Structure', desc: 'Current state of preservation' },
  { id: 'historical', label: 'Historical Reconstruction', desc: 'Estimated golden era appearance' },
  { id: 'architectural', label: 'Wireframe X-Ray', desc: 'Structural engineering geometry' },
  { id: 'damage', label: 'Damage Assessment', desc: 'Conservation alert zones' },
];

const ThreeDViewerPage: React.FC = () => {
  const { siteId } = useParams<{ siteId: string }>();
  const navigate = useNavigate();
  const currentSite = getSiteById(siteId || '1') || heritageSites[0];

  const [activeLayer, setActiveLayer] = useState('present');
  const [showInfo, setShowInfo] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);
  const [rotateSpeed, setRotateSpeed] = useState(1.5);
  const controlsInstance = useRef<any>(null);

  // 360 Camera Controls Handlers
  const handleRotateLeft = () => {
    if (controlsInstance.current) {
      controlsInstance.current.azimuthAngle -= 0.3;
      controlsInstance.current.update();
    }
  };
  const handleRotateRight = () => {
    if (controlsInstance.current) {
      controlsInstance.current.azimuthAngle += 0.3;
      controlsInstance.current.update();
    }
  };
  const handleTiltUp = () => {
    if (controlsInstance.current) {
      controlsInstance.current.polarAngle = Math.max(0.2, controlsInstance.current.polarAngle - 0.2);
      controlsInstance.current.update();
    }
  };
  const handleTiltDown = () => {
    if (controlsInstance.current) {
      controlsInstance.current.polarAngle = Math.min(Math.PI / 1.85, controlsInstance.current.polarAngle + 0.2);
      controlsInstance.current.update();
    }
  };
  const handleZoomIn = () => {
    if (controlsInstance.current) {
      controlsInstance.current.dollyIn(1.2);
      controlsInstance.current.update();
    }
  };
  const handleZoomOut = () => {
    if (controlsInstance.current) {
      controlsInstance.current.dollyOut(1.2);
      controlsInstance.current.update();
    }
  };
  const handleResetCamera = () => {
    if (controlsInstance.current) {
      controlsInstance.current.reset();
      toast.success('360° View Reset');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-heritage-dark pt-16 select-none overflow-hidden">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-heritage-card/95 backdrop-blur-xl border-b border-heritage-border flex-shrink-0 z-30">
        <div className="flex items-center space-x-3">
          <Link to={`/heritage/${currentSite.slug}`} className="flex items-center space-x-2 text-sm text-gray-300 hover:text-white transition-colors">
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">{currentSite.name}</span>
          </Link>
          <span className="text-gray-600">|</span>

          {/* Site Switcher Dropdown */}
          <div className="relative">
            <select
              value={currentSite.id}
              onChange={e => navigate(`/3d-viewer/${e.target.value}`)}
              className="bg-white/5 border border-heritage-border hover:border-gold/40 text-gold text-xs font-bold rounded-xl px-3 py-1.5 focus:outline-none cursor-pointer"
            >
              {heritageSites.map(s => (
                <option key={s.id} value={s.id} className="bg-heritage-card text-white">
                  {s.id}. {s.name} ({s.category})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Auto rotate toggle */}
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
              autoRotate ? 'bg-gold/15 border-gold/40 text-gold font-bold' : 'bg-white/5 border-heritage-border text-gray-400 hover:text-white'
            }`}
            title="Toggle 360° Auto Rotation"
          >
            {autoRotate ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            <span className="hidden md:inline">{autoRotate ? 'Auto-Spin: ON' : 'Auto-Spin: OFF'}</span>
          </button>

          <button
            onClick={handleResetCamera}
            className="flex items-center space-x-1 text-xs text-gray-400 hover:text-white bg-white/5 border border-heritage-border px-3 py-1.5 rounded-xl transition-all"
            title="Reset 360 Camera"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            onClick={() => setShowInfo(!showInfo)}
            className={`p-1.5 rounded-xl border transition-all ${showInfo ? 'bg-gold/15 border-gold/40 text-gold' : 'bg-white/5 border-heritage-border text-gray-400 hover:text-white'}`}
            title="Toggle Info"
          >
            <Info className="h-4 w-4" />
          </button>

          {currentSite.virtualTour.available && (
            <Link
              to={`/virtual-tour/${currentSite.id}`}
              className="flex items-center space-x-1 text-xs text-purple-400 bg-purple-600/15 border border-purple-500/30 px-3 py-1.5 rounded-xl hover:bg-purple-600/30 transition-all"
            >
              <Eye className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">360° Panorama</span>
            </Link>
          )}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* 3D Canvas Viewport */}
        <div className="flex-1 relative">
          <Canvas
            camera={{ position: [0, 4, 9], fov: 48 }}
            gl={{ antialias: true, alpha: false }}
            style={{ background: 'radial-gradient(circle at center, #111424 0%, #06070C 100%)' }}
          >
            <Suspense fallback={null}>
              <ambientLight intensity={0.55} />
              <directionalLight position={[10, 15, 8]} intensity={1.3} color="#FFF8E7" castShadow />
              <directionalLight position={[-10, 8, -6]} intensity={0.4} color="#60A5FA" />
              <pointLight position={[0, 6, 0]} intensity={0.6} color="#D4A017" />

              {/* Float & Distinct Model */}
              <Float speed={0.4} rotationIntensity={0.05} floatIntensity={0.1}>
                {getDistinctMonumentModel(currentSite.id, activeLayer)}
              </Float>

              {/* Ground Shadow Grid */}
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.85, 0]}>
                <planeGeometry args={[30, 30]} />
                <meshStandardMaterial color="#0A0A0F" roughness={1} />
              </mesh>

              {/* 360 Controller */}
              <CameraManager
                autoRotate={autoRotate}
                autoRotateSpeed={rotateSpeed}
                onControlsReady={(ctrls) => { controlsInstance.current = ctrls; }}
              />

              <fog attach="fog" args={['#06070C', 18, 45]} />
            </Suspense>
          </Canvas>

          {/* Floating On-Screen 360° Navigation Controls Pad */}
          <div className="absolute bottom-6 left-6 z-20 flex flex-col gap-2">
            <div className="bg-heritage-card/90 backdrop-blur-xl p-2 rounded-2xl border border-white/10 shadow-2xl flex flex-col gap-1">
              <div className="text-[10px] text-gold font-bold uppercase tracking-wider text-center mb-1">
                360° Orbit Controls
              </div>
              <div className="grid grid-cols-3 gap-1">
                <div />
                <button
                  onClick={handleTiltUp}
                  className="p-2 bg-white/5 hover:bg-gold/20 rounded-lg text-white hover:text-gold text-xs font-bold transition-all"
                  title="Tilt Up"
                >
                  ▲
                </button>
                <div />
                <button
                  onClick={handleRotateLeft}
                  className="p-2 bg-white/5 hover:bg-gold/20 rounded-lg text-white hover:text-gold text-xs font-bold transition-all"
                  title="Rotate Left 360°"
                >
                  ◀
                </button>
                <button
                  onClick={handleResetCamera}
                  className="p-2 bg-gold/20 hover:bg-gold/40 text-gold rounded-lg text-[10px] font-bold transition-all"
                  title="Center View"
                >
                  ●
                </button>
                <button
                  onClick={handleRotateRight}
                  className="p-2 bg-white/5 hover:bg-gold/20 rounded-lg text-white hover:text-gold text-xs font-bold transition-all"
                  title="Rotate Right 360°"
                >
                  ▶
                </button>
                <div />
                <button
                  onClick={handleTiltDown}
                  className="p-2 bg-white/5 hover:bg-gold/20 rounded-lg text-white hover:text-gold text-xs font-bold transition-all"
                  title="Tilt Down"
                >
                  ▼
                </button>
                <div />
              </div>
              <div className="flex gap-1 mt-1 pt-1 border-t border-white/10">
                <button
                  onClick={handleZoomIn}
                  className="flex-1 py-1.5 bg-white/5 hover:bg-white/15 rounded-lg text-xs text-white transition-all flex items-center justify-center space-x-1"
                  title="Zoom In"
                >
                  <ZoomIn className="h-3 w-3" />
                </button>
                <button
                  onClick={handleZoomOut}
                  className="flex-1 py-1.5 bg-white/5 hover:bg-white/15 rounded-lg text-xs text-white transition-all flex items-center justify-center space-x-1"
                  title="Zoom Out"
                >
                  <ZoomOut className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Monument Carousel Bar (Bottom) */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 max-w-xl w-full px-4 hidden md:block">
            <div className="bg-heritage-card/90 backdrop-blur-xl border border-heritage-border rounded-2xl p-2 flex items-center gap-2 overflow-x-auto shadow-2xl">
              {heritageSites.map(s => (
                <button
                  key={s.id}
                  onClick={() => navigate(`/3d-viewer/${s.id}`)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                    s.id === currentSite.id
                      ? 'bg-gold text-heritage-dark font-bold shadow-md shadow-gold/20'
                      : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          {/* Helper Hint */}
          <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-xs text-gray-400 flex items-center space-x-2">
            <Zap className="h-3.5 w-3.5 text-gold" />
            <span>360° Drag with Mouse / Touch to Orbit Anywhere</span>
          </div>
        </div>

        {/* Right Inspection Sidebar */}
        <div className={`w-80 bg-heritage-card border-l border-heritage-border flex flex-col overflow-y-auto transition-all ${showInfo ? 'translate-x-0' : 'translate-x-full hidden'}`}>
          {/* Site Overview */}
          <div className="p-5 border-b border-heritage-border">
            <div className="text-[10px] text-gold font-bold uppercase tracking-wider mb-1">
              {currentSite.category} • {currentSite.historicalPeriod}
            </div>
            <h2 className="font-serif font-bold text-xl text-white mb-2">{currentSite.name}</h2>
            <p className="text-xs text-gray-300 leading-relaxed">{currentSite.shortDescription}</p>
          </div>

          {/* Layer Controls */}
          <div className="p-5 border-b border-heritage-border">
            <div className="flex items-center space-x-2 mb-3">
              <Layers className="h-4 w-4 text-gold" />
              <span className="text-sm font-bold text-white">3D View Layers</span>
            </div>
            <div className="space-y-2">
              {LAYERS.map(layer => (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                    activeLayer === layer.id
                      ? 'bg-gold/15 border-gold/50 text-white shadow-md'
                      : 'bg-white/5 border-heritage-border text-gray-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold">{layer.label}</div>
                    <div className="text-[11px] text-gray-400">{layer.desc}</div>
                  </div>
                  {activeLayer === layer.id && (
                    <div className="w-2 h-2 rounded-full bg-gold shadow-sm shadow-gold" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Architectural Notes */}
          <div className="p-5 flex-1 space-y-3">
            <div className="text-xs font-bold text-gold uppercase tracking-wider">Key Architectural Marvels</div>
            {currentSite.facts.slice(0, 3).map((f, i) => (
              <div key={i} className="p-3 bg-white/5 rounded-xl border-l-2 border-gold/60 text-xs text-gray-300 leading-relaxed">
                {f}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="p-4 border-t border-heritage-border space-y-2">
            <Link
              to={`/heritage/${currentSite.slug}`}
              className="w-full text-center block bg-gold text-heritage-dark font-bold text-xs py-2.5 rounded-xl hover:bg-amber-500 transition-all"
            >
              Explore Full Site Guide
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeDViewerPage;
