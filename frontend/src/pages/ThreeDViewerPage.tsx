import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Html, ContactShadows, Stars } from '@react-three/drei';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { heritageSites, getSiteById } from '../data/heritageSites';
import * as THREE from 'three';
import {
  Layers, RotateCcw, Maximize2, Info, ChevronLeft, Zap,
  Sun, Moon, Sunset, Eye, ZoomIn, ZoomOut, Compass, Sparkles, Play, Pause
} from 'lucide-react';
import toast from 'react-hot-toast';

// ─── Camera Controller & 360 Orbit ──────────────────────────────────────────

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
      minDistance={2.5}
      maxDistance={25}
      maxPolarAngle={Math.PI / 1.85}
      dampingFactor={0.06}
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
      <Html distanceFactor={14} center zIndexRange={[100, 0]}>
        <div className="relative group select-none">
          <button
            onClick={() => setOpen(!open)}
            className="w-7 h-7 rounded-full bg-gold/90 border-2 border-white shadow-xl shadow-gold/60 flex items-center justify-center text-heritage-dark font-bold text-xs hover:scale-125 transition-transform"
          >
            ✦
          </button>
          {open && (
            <div className="absolute bottom-9 left-1/2 -translate-x-1/2 w-64 bg-heritage-card/95 backdrop-blur-xl border border-gold/50 rounded-2xl p-4 shadow-2xl z-50 text-left animate-fadeInUp">
              <div className="flex justify-between items-start mb-1">
                <div className="text-xs font-bold text-gold">{title}</div>
                <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white text-xs">✕</button>
              </div>
              <p className="text-xs text-gray-200 leading-relaxed mt-1">{desc}</p>
            </div>
          )}
        </div>
      </Html>
    </group>
  );
};

// ─── 1. TAJ MAHAL (Realistic Marble Architecture) ───────────────────────────
const TajMahalModel: React.FC<{ layer: string; lighting: string }> = ({ layer, lighting }) => {
  const marbleColor = lighting === 'night' ? '#A5B1C2' : lighting === 'sunset' ? '#FAD390' : '#FFFFFF';
  const wire = layer === 'architectural';
  const damageColor = layer === 'damage' ? '#8B5A2B' : marbleColor;

  return (
    <group>
      {/* Plinth Platform with Chamfered Corners */}
      <mesh position={[0, -1.4, 0]}>
        <boxGeometry args={[7.2, 0.4, 7.2]} />
        <meshStandardMaterial color={marbleColor} wireframe={wire} roughness={0.15} metalness={0.05} />
      </mesh>
      {/* Main Octagonal Mausoleum Body */}
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[4.2, 2.1, 4.2]} />
        <meshStandardMaterial color={damageColor} wireframe={wire} roughness={0.15} metalness={0.05} />
      </mesh>
      {/* 4 Grand Recessed Iwan Arch Portals */}
      {[
        { pos: [0, -0.15, 2.11], rot: [0, 0, 0] },
        { pos: [0, -0.15, -2.11], rot: [0, Math.PI, 0] },
        { pos: [2.11, -0.15, 0], rot: [0, Math.PI / 2, 0] },
        { pos: [-2.11, -0.15, 0], rot: [0, -Math.PI / 2, 0] },
      ].map((iwan, idx) => (
        <group key={idx} position={iwan.pos as [number, number, number]} rotation={iwan.rot as [number, number, number]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[2.0, 1.6, 0.15]} />
            <meshStandardMaterial color="#0A0A0F" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.8, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[1.0, 1.0, 0.15, 16, 1, false, 0, Math.PI]} />
            <meshStandardMaterial color="#0A0A0F" roughness={0.9} />
          </mesh>
        </group>
      ))}
      {/* Cylindrical Drum */}
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.65, 32]} />
        <meshStandardMaterial color={marbleColor} wireframe={wire} roughness={0.15} />
      </mesh>
      {/* Central Bulbous Onion Double Dome with Lotus Cresting */}
      <mesh position={[0, 2.1, 0]}>
        <sphereGeometry args={[1.65, 36, 24, 0, Math.PI * 2, 0, Math.PI / 1.65]} />
        <meshStandardMaterial color={marbleColor} wireframe={wire} roughness={0.1} metalness={0.15} />
      </mesh>
      {/* Golden Finial (Kalash) */}
      <mesh position={[0, 3.45, 0]}>
        <coneGeometry args={[0.08, 1.1, 16]} />
        <meshStandardMaterial color="#D4A017" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* 4 Corner Chatris (Kiosks) */}
      {[[-1.45, -1.45], [1.45, -1.45], [-1.45, 1.45], [1.45, 1.45]].map(([x, z], i) => (
        <group key={i} position={[x, 1.25, z]}>
          {[-0.25, 0.25].map((cx, cxi) =>
            [-0.25, 0.25].map((cz, czi) => (
              <mesh key={`${cxi}-${czi}`} position={[cx, -0.2, cz]}>
                <cylinderGeometry args={[0.04, 0.04, 0.5, 8]} />
                <meshStandardMaterial color={marbleColor} wireframe={wire} />
              </mesh>
            ))
          )}
          <mesh position={[0, 0.25, 0]}>
            <sphereGeometry args={[0.42, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color={marbleColor} wireframe={wire} />
          </mesh>
          <mesh position={[0, 0.55, 0]}>
            <coneGeometry args={[0.04, 0.3, 8]} />
            <meshStandardMaterial color="#D4A017" metalness={0.9} />
          </mesh>
        </group>
      ))}

      {/* 4 Three-Tier Tapering Minarets (Outward 12-deg Tilt) */}
      {[[-3.2, -3.2], [3.2, -3.2], [-3.2, 3.2], [3.2, 3.2]].map(([x, z], i) => (
        <group key={i} position={[x, 0.45, z]}>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.22, 0.28, 3.8, 20]} />
            <meshStandardMaterial color={marbleColor} wireframe={wire} roughness={0.2} />
          </mesh>
          {[-0.6, 0.6, 1.8].map((by, bi) => (
            <mesh key={bi} position={[0, by, 0]}>
              <cylinderGeometry args={[0.34, 0.28, 0.1, 16]} />
              <meshStandardMaterial color={marbleColor} wireframe={wire} />
            </mesh>
          ))}
          <mesh position={[0, 2.1, 0]}>
            <sphereGeometry args={[0.3, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color={marbleColor} wireframe={wire} />
          </mesh>
          <mesh position={[0, 2.5, 0]}>
            <coneGeometry args={[0.06, 0.55, 12]} />
            <meshStandardMaterial color="#D4A017" metalness={0.9} />
          </mesh>
        </group>
      ))}

      {/* Reflecting Pool (Charbagh) */}
      <mesh position={[0, -1.58, 3.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.8, 4.5]} />
        <meshStandardMaterial color="#0C2461" roughness={0.05} metalness={0.8} />
      </mesh>

      <Hotspot3D position={[0, 2.4, 1.7]} title="Bulbous White Marble Dome" desc="Rises 73m into the sky. Built using pure Makrana marble with lotus petal cresting and gold spire." />
      <Hotspot3D position={[3.2, 1.8, 3.2]} title="Tilted Minaret" desc="Engineered with an intentional outward lean to protect the central crypt during seismic activity." />
      <Hotspot3D position={[0, -0.15, 2.2]} title="Central Iwan Arch" desc="Inscribed with Quranic verses inlaid with black jasper into pristine white marble." />
    </group>
  );
};

// ─── 2. RED FORT (Realistic Sandstone Fortress) ─────────────────────────────
const RedFortModel: React.FC<{ layer: string; lighting: string }> = ({ layer, lighting }) => {
  const red = lighting === 'night' ? '#4A1D13' : '#B83216';
  const wire = layer === 'architectural';

  return (
    <group>
      {/* Massive Sandstone Rampart Wall */}
      <mesh position={[0, -0.3, 0]}>
        <boxGeometry args={[8.0, 2.4, 1.4]} />
        <meshStandardMaterial color={red} wireframe={wire} roughness={0.8} />
      </mesh>
      {/* Crenellated Battlements */}
      {[-3.5, -2.5, -1.5, 1.5, 2.5, 3.5].map((x, i) => (
        <mesh key={i} position={[x, 1.0, 0]}>
          <boxGeometry args={[0.5, 0.4, 1.45]} />
          <meshStandardMaterial color="#7A1D0B" wireframe={wire} />
        </mesh>
      ))}
      {/* Lahore Gate Main Portal */}
      <mesh position={[0, -0.5, 0.75]}>
        <boxGeometry args={[1.6, 1.8, 0.2]} />
        <meshStandardMaterial color="#0E0502" />
      </mesh>
      {/* Octagonal Bastion Towers */}
      {[-4.0, 4.0].map((x, i) => (
        <group key={i} position={[x, 0.3, 0]}>
          <mesh>
            <cylinderGeometry args={[0.85, 0.95, 3.6, 8]} />
            <meshStandardMaterial color={red} wireframe={wire} roughness={0.8} />
          </mesh>
          <mesh position={[0, 2.0, 0]}>
            <cylinderGeometry args={[0.95, 0.85, 0.4, 8]} />
            <meshStandardMaterial color="#8F250F" />
          </mesh>
          <mesh position={[0, 2.4, 0]}>
            <sphereGeometry args={[0.45, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.2} />
          </mesh>
        </group>
      ))}
      {/* Diwan-i-Khas Marble Pavilion */}
      <mesh position={[0, 1.4, -1.4]}>
        <boxGeometry args={[3.2, 1.4, 2.2]} />
        <meshStandardMaterial color="#FFFFFF" wireframe={wire} roughness={0.2} />
      </mesh>
      {/* Independence Day Flagpole & Tricolor Standard */}
      <mesh position={[0, 1.8, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 2.4, 8]} />
        <meshStandardMaterial color="#E8E8F0" metalness={0.9} />
      </mesh>
      <mesh position={[0.4, 2.6, 0]}>
        <boxGeometry args={[0.7, 0.4, 0.02]} />
        <meshStandardMaterial color="#FF9933" />
      </mesh>

      <Hotspot3D position={[0, 0.3, 0.9]} title="Lahori Gate Rampart" desc="National symbol where the Prime Minister of India unfurls the Tricolor on Independence Day." />
      <Hotspot3D position={[0, 1.5, -1.3]} title="Diwan-i-Khas" desc="The hall of private audience which once housed the legendary Peacock Throne and Koh-i-Noor diamond." />
    </group>
  );
};

// ─── 3. HAMPI STONE CHARIOT (Realistic Chiseled Granite) ─────────────────────
const HampiModel: React.FC<{ layer: string; lighting: string }> = ({ layer, lighting }) => {
  const granite = lighting === 'night' ? '#5E5448' : '#B8A484';
  const wire = layer === 'architectural';

  return (
    <group>
      {/* Boulder Field Platform */}
      <mesh position={[0, -1.5, 0]}>
        <boxGeometry args={[7.5, 0.4, 7.5]} />
        <meshStandardMaterial color="#5C4D3C" roughness={0.95} />
      </mesh>
      {/* Chariot Sanctuary Plinth */}
      <mesh position={[0, -0.6, 0]}>
        <boxGeometry args={[3.4, 1.4, 3.8]} />
        <meshStandardMaterial color={granite} wireframe={wire} roughness={0.85} />
      </mesh>
      {/* 4 Carved Granite Wheels with Concentric Spokes */}
      {[[-1.9, -1.3], [1.9, -1.3], [-1.9, 1.3], [1.9, 1.3]].map(([x, z], i) => (
        <group key={i} position={[x, -0.65, z]} rotation={[0, 0, Math.PI / 2]}>
          <mesh>
            <cylinderGeometry args={[0.7, 0.7, 0.28, 24]} />
            <meshStandardMaterial color="#7A6852" wireframe={wire} roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.16, 0]}>
            <cylinderGeometry args={[0.22, 0.22, 0.1, 16]} />
            <meshStandardMaterial color="#D4A017" metalness={0.7} />
          </mesh>
        </group>
      ))}
      {/* Stepped Dravidian Vimana Crown */}
      {[0, 1, 2].map(lvl => (
        <mesh key={lvl} position={[0, 0.45 + lvl * 0.55, 0]}>
          <boxGeometry args={[2.7 - lvl * 0.65, 0.5, 3.0 - lvl * 0.65]} />
          <meshStandardMaterial color={granite} wireframe={wire} roughness={0.85} />
        </mesh>
      ))}
      {/* 2 Stone Guarding Elephants with Sculpted Trunks */}
      {[-0.85, 0.85].map((x, i) => (
        <group key={i} position={[x, -0.85, 2.3]}>
          <mesh>
            <boxGeometry args={[0.55, 0.65, 0.95]} />
            <meshStandardMaterial color="#6B5945" roughness={0.9} />
          </mesh>
          <mesh position={[0, -0.2, 0.55]} rotation={[0.4, 0, 0]}>
            <cylinderGeometry args={[0.09, 0.05, 0.5, 8]} />
            <meshStandardMaterial color="#6B5945" />
          </mesh>
        </group>
      ))}

      <Hotspot3D position={[1.9, -0.5, 1.3]} title="Monolithic Stone Wheel" desc="Featured on the Indian 50-rupee note. Carved from separate granite blocks with revolving axle pins." />
      <Hotspot3D position={[0, 1.5, 0]} title="Garuda Shrine Vimana" desc="A miniature shrine dedicated to Garuda facing the main sanctum of the Vittala Temple." />
    </group>
  );
};

// ─── 4. MAHABALIPURAM SHORE TEMPLE ──────────────────────────────────────────
const MahabalipuramModel: React.FC<{ layer: string; lighting: string }> = ({ layer, lighting }) => {
  const rock = lighting === 'night' ? '#4A4235' : '#A89678';
  const wire = layer === 'architectural';

  return (
    <group>
      {/* Ocean Shore Plane */}
      <mesh position={[0, -1.62, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14, 14]} />
        <meshStandardMaterial color="#1E5366" roughness={0.15} metalness={0.6} />
      </mesh>
      {/* Coastal Sand Plinth */}
      <mesh position={[0, -1.4, 0]}>
        <boxGeometry args={[7, 0.45, 6]} />
        <meshStandardMaterial color="#C8B88A" roughness={0.95} />
      </mesh>
      {/* East Tower (5-Tiered Dravidian Vimana) */}
      <group position={[0.9, -0.15, 0]}>
        <mesh position={[0, -0.5, 0]}>
          <boxGeometry args={[2.4, 1.5, 2.4]} />
          <meshStandardMaterial color={rock} wireframe={wire} roughness={0.8} />
        </mesh>
        {[0, 1, 2, 3].map(i => (
          <mesh key={i} position={[0, 0.45 + i * 0.65, 0]}>
            <boxGeometry args={[1.9 - i * 0.38, 0.6, 1.9 - i * 0.38]} />
            <meshStandardMaterial color={rock} wireframe={wire} roughness={0.8} />
          </mesh>
        ))}
        <mesh position={[0, 3.1, 0]}>
          <sphereGeometry args={[0.35, 16, 12]} />
          <meshStandardMaterial color="#D4A017" metalness={0.8} />
        </mesh>
      </group>
      {/* West Shrine (Smaller) */}
      <group position={[-1.9, -0.55, 0]}>
        <mesh position={[0, -0.2, 0]}>
          <boxGeometry args={[1.5, 1.1, 1.5]} />
          <meshStandardMaterial color={rock} wireframe={wire} roughness={0.8} />
        </mesh>
        {[0, 1].map(i => (
          <mesh key={i} position={[0, 0.45 + i * 0.5, 0]}>
            <boxGeometry args={[1.2 - i * 0.35, 0.45, 1.2 - i * 0.35]} />
            <meshStandardMaterial color={rock} wireframe={wire} />
          </mesh>
        ))}
      </group>
      {/* Row of Sculpted Nandi Bulls */}
      {[-2.5, -1.2, 0, 1.2, 2.5].map((x, i) => (
        <mesh key={i} position={[x, -1.1, 2.4]}>
          <boxGeometry args={[0.35, 0.3, 0.45]} />
          <meshStandardMaterial color="#7A684E" roughness={0.9} />
        </mesh>
      ))}

      <Hotspot3D position={[0.9, 2.4, 0]} title="Shore Temple Eastern Vimana" desc="Designed so the first rays of the morning sun illuminate the Shiva Lingam inside." />
      <Hotspot3D position={[0, -1.0, 2.4]} title="Nandi Bull Perimeter Wall" desc="Sculpted rows of resting Nandi bulls guarding the sanctuary against the ocean waves." />
    </group>
  );
};

// ─── 5. BRIHADEESWARAR TEMPLE (Soaring Chola Vimana) ────────────────────────
const BrihadeeswararModel: React.FC<{ layer: string; lighting: string }> = ({ layer, lighting }) => {
  const granite = lighting === 'night' ? '#5A4E38' : '#C4A877';
  const wire = layer === 'architectural';

  return (
    <group>
      {/* Fortified Temple Courtyard */}
      <mesh position={[0, -1.5, 0]}>
        <boxGeometry args={[8.5, 0.4, 6.5]} />
        <meshStandardMaterial color="#5C4D35" roughness={0.95} />
      </mesh>
      {/* Sanctuary Base */}
      <mesh position={[-1.3, -0.55, 0]}>
        <boxGeometry args={[3.4, 1.5, 3.4]} />
        <meshStandardMaterial color={granite} wireframe={wire} roughness={0.8} />
      </mesh>
      {/* Soaring 13-Tier Dravidian Vimana Tower */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map(tier => (
        <mesh key={tier} position={[-1.3, 0.35 + tier * 0.48, 0]}>
          <boxGeometry args={[3.0 - tier * 0.3, 0.45, 3.0 - tier * 0.3]} />
          <meshStandardMaterial color={granite} wireframe={wire} roughness={0.8} />
        </mesh>
      ))}
      {/* 80-Tonne Monolithic Kumbam Capstone */}
      <mesh position={[-1.3, 4.35, 0]}>
        <sphereGeometry args={[0.65, 24, 16, 0, Math.PI * 2, 0, Math.PI / 1.6]} />
        <meshStandardMaterial color="#D4A017" metalness={0.7} roughness={0.2} />
      </mesh>
      {/* Golden Stupi Finial */}
      <mesh position={[-1.3, 5.15, 0]}>
        <coneGeometry args={[0.14, 0.7, 16]} />
        <meshStandardMaterial color="#D4A017" metalness={0.95} />
      </mesh>
      {/* Long Assembly Mandapa */}
      <mesh position={[1.9, -0.75, 0]}>
        <boxGeometry args={[3.4, 1.1, 2.4]} />
        <meshStandardMaterial color={granite} wireframe={wire} roughness={0.8} />
      </mesh>
      {/* Monolithic 25-Tonne Nandi Pavilion */}
      <mesh position={[3.8, -0.95, 0]}>
        <boxGeometry args={[1.2, 0.7, 0.9]} />
        <meshStandardMaterial color="#2B2418" />
      </mesh>

      <Hotspot3D position={[-1.3, 4.4, 0]} title="80-Tonne Monolithic Kumbam" desc="Single stone capstone raised 66m high using a 6 km inclined earthen ramp during Rajaraja I reign." />
      <Hotspot3D position={[3.8, -0.6, 0]} title="Monolithic Nandi Shrine" desc="Carved from a single massive granite rock weighing over 25 tonnes." />
    </group>
  );
};

// ─── 6. KONARK SUN TEMPLE (Celestial Chariot) ───────────────────────────────
const KonarkModel: React.FC<{ layer: string; lighting: string }> = ({ layer, lighting }) => {
  const stone = lighting === 'night' ? '#4D4233' : '#A88D60';
  const wire = layer === 'architectural';

  return (
    <group>
      {/* Base Plinth */}
      <mesh position={[0, -1.5, 0]}>
        <boxGeometry args={[8.5, 0.4, 7]} />
        <meshStandardMaterial color="#4A3F30" roughness={0.95} />
      </mesh>
      {/* Chariot Body */}
      <mesh position={[-0.6, -0.75, 0]}>
        <boxGeometry args={[4.8, 1.1, 4.2]} />
        <meshStandardMaterial color={stone} wireframe={wire} roughness={0.8} />
      </mesh>
      {/* Stepped Pirha Roof (Jagamohana) */}
      {[0, 1, 2, 3, 4].map(tier => (
        <mesh key={tier} position={[-0.6, -0.05 + tier * 0.55, 0]}>
          <boxGeometry args={[3.8 - tier * 0.6, 0.52, 3.8 - tier * 0.6]} />
          <meshStandardMaterial color={stone} wireframe={wire} roughness={0.8} />
        </mesh>
      ))}
      <mesh position={[-0.6, 2.8, 0]}>
        <cylinderGeometry args={[0.8, 0.7, 0.35, 20]} />
        <meshStandardMaterial color="#D4A017" metalness={0.7} />
      </mesh>
      {/* 24 Carved Sundial Wheels */}
      {[-2.2, -0.8, 0.8, 2.2].map((x, i) => (
        <React.Fragment key={i}>
          <mesh position={[x - 0.6, -0.75, 2.2]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.6, 0.6, 0.18, 24]} />
            <meshStandardMaterial color="#6B593C" wireframe={wire} />
          </mesh>
          <mesh position={[x - 0.6, -0.75, -2.2]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.6, 0.6, 0.18, 24]} />
            <meshStandardMaterial color="#6B593C" wireframe={wire} />
          </mesh>
        </React.Fragment>
      ))}
      {/* 7 Galloping Horses */}
      {[-0.7, -0.25, 0.25, 0.7].map((z, i) => (
        <mesh key={i} position={[2.9, -0.95, z]}>
          <boxGeometry args={[0.9, 0.55, 0.24]} />
          <meshStandardMaterial color="#8A7350" />
        </mesh>
      ))}

      <Hotspot3D position={[-0.6, -0.75, 2.3]} title="24 Sun Chariot Wheels" desc="Each 3-meter wheel is an exact sundial calculating time down to minutes based on spoke shadows." />
      <Hotspot3D position={[2.9, -0.6, 0]} title="7 Celestial Horses" desc="Represent the 7 days of the week, pulling the chariot of the Sun God Surya toward the sunrise." />
    </group>
  );
};

// ─── 7. AJANTA CAVES (Horseshoe Basalt Gorge) ───────────────────────────────
const AjantaModel: React.FC<{ layer: string; lighting: string }> = ({ layer, lighting }) => {
  const rock = lighting === 'night' ? '#3B3228' : '#6E5D4B';
  const wire = layer === 'architectural';

  return (
    <group>
      {/* Horseshoe Mountain Gorge Cliff */}
      <mesh position={[0, 0.3, -1.3]}>
        <boxGeometry args={[8.5, 3.8, 2.8]} />
        <meshStandardMaterial color={rock} wireframe={wire} roughness={0.95} />
      </mesh>
      {/* Waghora River Valley Floor */}
      <mesh position={[0, -1.62, 1.6]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[11, 6]} />
        <meshStandardMaterial color="#223320" roughness={0.95} />
      </mesh>
      {/* Chaitya Horseshoe Sun Window */}
      <mesh position={[0, 0.35, 0.15]}>
        <torusGeometry args={[1.2, 0.28, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#D4A017" metalness={0.7} wireframe={wire} />
      </mesh>
      {/* Monastic Cave Entrance Portals */}
      {[-2.4, 0, 2.4].map((x, i) => (
        <mesh key={i} position={[x, -0.55, 0.12]}>
          <boxGeometry args={[1.5, 1.6, 0.25]} />
          <meshStandardMaterial color="#0A0A0F" />
        </mesh>
      ))}
      {/* Colonnade Pillars with Carved Capitals */}
      {[-3.0, -1.8, -0.6, 0.6, 1.8, 3.0].map((x, i) => (
        <mesh key={i} position={[x, -0.55, 0.38]}>
          <cylinderGeometry args={[0.11, 0.14, 1.6, 12]} />
          <meshStandardMaterial color="#8A7660" />
        </mesh>
      ))}

      <Hotspot3D position={[0, 0.5, 0.3]} title="Chaitya Sun Window" desc="Engineered to illuminate the seated Buddha in the sanctuary precisely during winter solstices." />
      <Hotspot3D position={[-2.4, -0.2, 0.3]} title="Cave 1 Monastery" desc="Houses the famous 1,500-year-old Padmapani Bodhisattva mural painted with natural lapis lazuli." />
    </group>
  );
};

// ─── 8. ELLORA CAVES (Kailash Monolithic Excavation) ─────────────────────────
const ElloraModel: React.FC<{ layer: string; lighting: string }> = ({ layer, lighting }) => {
  const rock = lighting === 'night' ? '#383025' : '#73624E';
  const wire = layer === 'architectural';

  return (
    <group>
      {/* 3 Excavated Basalt Mountain Quarry Walls */}
      <mesh position={[-4.0, 0.6, 0]}>
        <boxGeometry args={[0.9, 4.2, 7.5]} />
        <meshStandardMaterial color="#4A3E31" roughness={0.95} />
      </mesh>
      <mesh position={[4.0, 0.6, 0]}>
        <boxGeometry args={[0.9, 4.2, 7.5]} />
        <meshStandardMaterial color="#4A3E31" roughness={0.95} />
      </mesh>
      <mesh position={[0, 0.6, -3.4]}>
        <boxGeometry args={[7.5, 4.2, 0.9]} />
        <meshStandardMaterial color="#4A3E31" roughness={0.95} />
      </mesh>
      {/* Deep Sunken Courtyard Pit */}
      <mesh position={[0, -1.52, 0]}>
        <boxGeometry args={[7.2, 0.2, 6.2]} />
        <meshStandardMaterial color="#30281E" roughness={0.95} />
      </mesh>
      {/* Monolithic Kailash Temple (Carved top-down from living rock) */}
      <mesh position={[0, -0.35, -0.6]}>
        <boxGeometry args={[3.0, 2.3, 3.4]} />
        <meshStandardMaterial color={rock} wireframe={wire} roughness={0.8} />
      </mesh>
      {/* Multi-tier Shikhara Spire */}
      {[0, 1, 2].map(lvl => (
        <mesh key={lvl} position={[0, 1.0 + lvl * 0.55, -0.6]}>
          <boxGeometry args={[2.2 - lvl * 0.55, 0.5, 2.4 - lvl * 0.55]} />
          <meshStandardMaterial color={rock} wireframe={wire} />
        </mesh>
      ))}
      <mesh position={[0, 2.8, -0.6]}>
        <sphereGeometry args={[0.4, 16, 12]} />
        <meshStandardMaterial color="#D4A017" metalness={0.7} />
      </mesh>
      {/* Two 15m Monolithic Victory Pillars (Dhwajasthambhas) */}
      {[-2.0, 2.0].map((x, i) => (
        <group key={i} position={[x, -0.05, 1.5]}>
          <mesh>
            <cylinderGeometry args={[0.22, 0.3, 3.0, 16]} />
            <meshStandardMaterial color={rock} wireframe={wire} />
          </mesh>
          <mesh position={[0, 1.65, 0]}>
            <sphereGeometry args={[0.28, 12, 8]} />
            <meshStandardMaterial color="#D4A017" metalness={0.8} />
          </mesh>
        </group>
      ))}

      <Hotspot3D position={[0, 1.6, -0.6]} title="Monolithic Cave 16" desc="World's largest monolithic excavation. 200,000 tonnes of basalt carved top-to-bottom under Rashtrakuta king Krishna I." />
      <Hotspot3D position={[2.0, 0.6, 1.5]} title="Dhwajasthambha" desc="15-meter ornamental stone pillar carved entirely in situ from the living cliff rock." />
    </group>
  );
};

// ─── 9. MYSORE PALACE (Indo-Saracenic Royal Palace) ─────────────────────────
const MysoreModel: React.FC<{ layer: string; lighting: string }> = ({ layer, lighting }) => {
  const granite = lighting === 'night' ? '#4A4235' : '#D4C8AD';
  const domePink = lighting === 'night' ? '#6B3A42' : '#D9828E';
  const wire = layer === 'architectural';

  return (
    <group>
      {/* Palace Gardens */}
      <mesh position={[0, -1.5, 0]}>
        <boxGeometry args={[8.5, 0.3, 6.5]} />
        <meshStandardMaterial color="#2B3A24" roughness={0.9} />
      </mesh>
      {/* 3-Story Palace Facade */}
      <mesh position={[0, -0.35, 0]}>
        <boxGeometry args={[7.2, 2.1, 2.6]} />
        <meshStandardMaterial color={granite} wireframe={wire} roughness={0.5} />
      </mesh>
      {/* Central 5-Story Golden Clock Tower */}
      <mesh position={[0, 0.9, 0]}>
        <boxGeometry args={[1.8, 2.6, 1.8]} />
        <meshStandardMaterial color={granite} wireframe={wire} />
      </mesh>
      <mesh position={[0, 2.5, 0]}>
        <sphereGeometry args={[1.0, 24, 16, 0, Math.PI * 2, 0, Math.PI / 1.65]} />
        <meshStandardMaterial color="#D4A017" metalness={0.9} roughness={0.15} />
      </mesh>
      <mesh position={[0, 3.45, 0]}>
        <coneGeometry args={[0.09, 0.9, 16]} />
        <meshStandardMaterial color="#D4A017" metalness={0.95} />
      </mesh>
      {/* 2 Pink Marble Corner Domes */}
      {[-3.0, 3.0].map((x, i) => (
        <group key={i} position={[x, 0.9, 0]}>
          <mesh>
            <cylinderGeometry args={[0.85, 0.85, 0.55, 16]} />
            <meshStandardMaterial color={granite} wireframe={wire} />
          </mesh>
          <mesh position={[0, 0.65, 0]}>
            <sphereGeometry args={[0.9, 24, 16, 0, Math.PI * 2, 0, Math.PI / 1.65]} />
            <meshStandardMaterial color={domePink} roughness={0.2} />
          </mesh>
        </group>
      ))}

      <Hotspot3D position={[0, 2.8, 0]} title="145-Foot Golden Clock Tower" desc="Illuminated by 97,000 electric bulbs during the royal Mysore Dasara festival." />
      <Hotspot3D position={[3.0, 1.5, 0]} title="Pink Marble Corner Dome" desc="Indo-Saracenic masterpiece designed by British architect Henry Irwin for the Wadiyar dynasty." />
    </group>
  );
};

// ─── 10. SANCHI STUPA (Ashokan Hemispherical Great Stupa) ───────────────────
const SanchiModel: React.FC<{ layer: string; lighting: string }> = ({ layer, lighting }) => {
  const sand = lighting === 'night' ? '#4A4033' : '#B8A682';
  const wire = layer === 'architectural';

  return (
    <group>
      {/* Hillock Platform */}
      <mesh position={[0, -1.5, 0]}>
        <cylinderGeometry args={[4.4, 4.8, 0.4, 32]} />
        <meshStandardMaterial color="#3A3020" roughness={0.95} />
      </mesh>
      {/* Circular Medhi (Lower Pradaksina Terrace) */}
      <mesh position={[0, -1.1, 0]}>
        <cylinderGeometry args={[3.8, 3.8, 0.55, 32]} />
        <meshStandardMaterial color={sand} wireframe={wire} roughness={0.75} />
      </mesh>
      {/* Great Hemispherical Dome (Anda) */}
      <mesh position={[0, -0.85, 0]}>
        <sphereGeometry args={[3.0, 36, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={sand} wireframe={wire} roughness={0.65} />
      </mesh>
      {/* Harmika Square Balcony */}
      <mesh position={[0, 2.25, 0]}>
        <boxGeometry args={[1.0, 0.45, 1.0]} />
        <meshStandardMaterial color={sand} wireframe={wire} />
      </mesh>
      {/* 3-Tiered Chhatra Spire (Umbrella Discs) */}
      {[0, 1, 2].map(i => (
        <mesh key={i} position={[0, 2.7 + i * 0.38, 0]}>
          <cylinderGeometry args={[0.55 - i * 0.14, 0.55 - i * 0.14, 0.08, 16]} />
          <meshStandardMaterial color="#D4A017" metalness={0.8} />
        </mesh>
      ))}
      {/* 4 Cardinal Torana Gateways */}
      {[
        { pos: [0, -0.35, 3.8], rot: 0, title: 'South Gateway (Oldest)' },
        { pos: [0, -0.35, -3.8], rot: 0, title: 'North Gateway' },
        { pos: [3.8, -0.35, 0], rot: Math.PI / 2, title: 'East Gateway' },
        { pos: [-3.8, -0.35, 0], rot: Math.PI / 2, title: 'West Gateway' }
      ].map((gate, i) => (
        <group key={i} position={gate.pos as [number, number, number]} rotation={[0, gate.rot, 0]}>
          {[-0.65, 0.65].map((x, j) => (
            <mesh key={j} position={[x, 0, 0]}>
              <boxGeometry args={[0.2, 2.4, 0.2]} />
              <meshStandardMaterial color={sand} wireframe={wire} />
            </mesh>
          ))}
          {[0, 1, 2].map(k => (
            <mesh key={k} position={[0, 0.8 + k * 0.32, 0]}>
              <boxGeometry args={[1.9, 0.16, 0.16]} />
              <meshStandardMaterial color={sand} wireframe={wire} />
            </mesh>
          ))}
        </group>
      ))}

      <Hotspot3D position={[0, 1.3, 3.0]} title="Hemispherical Anda" desc="Encloses sacred relics of Buddha's chief disciples Sariputra and Mahamoggallana." />
      <Hotspot3D position={[0, -0.1, 3.8]} title="South Torana Gateway" desc="The oldest gateway donated by the ivory carvers of Vidisha in 1st century BCE." />
    </group>
  );
};

// ─── Model Dispatcher ───────────────────────────────────────────────────────

const getDistinctRealisticModel = (siteId: string, layer: string, lighting: string) => {
  switch (siteId) {
    case '1': return <TajMahalModel layer={layer} lighting={lighting} />;
    case '2': return <RedFortModel layer={layer} lighting={lighting} />;
    case '3': return <HampiModel layer={layer} lighting={lighting} />;
    case '4': return <MahabalipuramModel layer={layer} lighting={lighting} />;
    case '5': return <BrihadeeswararModel layer={layer} lighting={lighting} />;
    case '6': return <KonarkModel layer={layer} lighting={lighting} />;
    case '7': return <AjantaModel layer={layer} lighting={lighting} />;
    case '8': return <ElloraModel layer={layer} lighting={lighting} />;
    case '9': return <MysoreModel layer={layer} lighting={lighting} />;
    case '10': return <SanchiModel layer={layer} lighting={lighting} />;
    default: return <TajMahalModel layer={layer} lighting={lighting} />;
  }
};

// ─── Main Page ───────────────────────────────────────────────────────────────

const LAYERS = [
  { id: 'present', label: 'Present Structure', desc: 'Current state of preservation' },
  { id: 'historical', label: 'Historical Reconstruction', desc: 'Golden era peak glory' },
  { id: 'architectural', label: 'Wireframe X-Ray', desc: 'Structural engineering geometry' },
  { id: 'damage', label: 'Damage Assessment', desc: 'Conservation alert zones' },
];

const ThreeDViewerPage: React.FC = () => {
  const { siteId } = useParams<{ siteId: string }>();
  const navigate = useNavigate();
  const currentSite = getSiteById(siteId || '1') || heritageSites[0];

  const [activeLayer, setActiveLayer] = useState('present');
  const [lighting, setLighting] = useState<'day' | 'sunset' | 'night'>('day');
  const [showInfo, setShowInfo] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);
  const [rotateSpeed, setRotateSpeed] = useState(1.5);
  const controlsInstance = useRef<any>(null);

  // 360 Controls
  const handleRotateLeft = () => {
    if (controlsInstance.current) {
      controlsInstance.current.azimuthAngle -= 0.35;
      controlsInstance.current.update();
    }
  };
  const handleRotateRight = () => {
    if (controlsInstance.current) {
      controlsInstance.current.azimuthAngle += 0.35;
      controlsInstance.current.update();
    }
  };
  const handleTiltUp = () => {
    if (controlsInstance.current) {
      controlsInstance.current.polarAngle = Math.max(0.2, controlsInstance.current.polarAngle - 0.25);
      controlsInstance.current.update();
    }
  };
  const handleTiltDown = () => {
    if (controlsInstance.current) {
      controlsInstance.current.polarAngle = Math.min(Math.PI / 1.85, controlsInstance.current.polarAngle + 0.25);
      controlsInstance.current.update();
    }
  };
  const handleZoomIn = () => {
    if (controlsInstance.current) {
      controlsInstance.current.dollyIn(1.25);
      controlsInstance.current.update();
    }
  };
  const handleZoomOut = () => {
    if (controlsInstance.current) {
      controlsInstance.current.dollyOut(1.25);
      controlsInstance.current.update();
    }
  };
  const handleResetCamera = () => {
    if (controlsInstance.current) {
      controlsInstance.current.reset();
      toast.success('360° Camera Centered');
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

          {/* Site Selector Dropdown */}
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

        {/* Lighting Mode & Controls */}
        <div className="flex items-center space-x-2">
          {/* Lighting Mode Pill */}
          <div className="flex items-center bg-white/5 border border-heritage-border rounded-xl p-1 gap-1">
            <button
              onClick={() => setLighting('day')}
              className={`p-1.5 rounded-lg text-xs transition-all ${lighting === 'day' ? 'bg-gold text-heritage-dark font-bold' : 'text-gray-400 hover:text-white'}`}
              title="Daylight"
            >
              <Sun className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setLighting('sunset')}
              className={`p-1.5 rounded-lg text-xs transition-all ${lighting === 'sunset' ? 'bg-amber-600 text-white font-bold' : 'text-gray-400 hover:text-white'}`}
              title="Golden Hour Sunset"
            >
              <Sunset className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setLighting('night')}
              className={`p-1.5 rounded-lg text-xs transition-all ${lighting === 'night' ? 'bg-blue-600 text-white font-bold' : 'text-gray-400 hover:text-white'}`}
              title="Night Illumination"
            >
              <Moon className="h-3.5 w-3.5" />
            </button>
          </div>

          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
              autoRotate ? 'bg-gold/15 border-gold/40 text-gold font-bold' : 'bg-white/5 border-heritage-border text-gray-400 hover:text-white'
            }`}
            title="Toggle 360° Spin"
          >
            {autoRotate ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            <span className="hidden md:inline">{autoRotate ? '360° Spin: ON' : '360° Spin: OFF'}</span>
          </button>

          <button
            onClick={handleResetCamera}
            className="p-2 text-xs text-gray-400 hover:text-white bg-white/5 border border-heritage-border rounded-xl"
            title="Reset Camera"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={() => setShowInfo(!showInfo)}
            className={`p-2 rounded-xl border transition-all ${showInfo ? 'bg-gold/15 border-gold/40 text-gold' : 'bg-white/5 border-heritage-border text-gray-400 hover:text-white'}`}
            title="Toggle Info"
          >
            <Info className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* 3D Canvas */}
        <div className="flex-1 relative">
          <Canvas
            camera={{ position: [0, 4.5, 9.5], fov: 46 }}
            gl={{ antialias: true, alpha: false, toneMapping: THREE.ACESFilmicToneMapping }}
            style={{
              background: lighting === 'night'
                ? 'radial-gradient(circle at center, #0B1021 0%, #030408 100%)'
                : lighting === 'sunset'
                ? 'radial-gradient(circle at center, #2C1810 0%, #09060B 100%)'
                : 'radial-gradient(circle at center, #131A30 0%, #070913 100%)'
            }}
          >
            <Suspense fallback={null}>
              {lighting === 'night' && <Stars radius={50} depth={30} count={2000} factor={4} fade />}

              {/* Dynamic 3-Point Lighting Setup */}
              <ambientLight intensity={lighting === 'night' ? 0.3 : lighting === 'sunset' ? 0.6 : 0.65} />
              <directionalLight
                position={[10, 16, 10]}
                intensity={lighting === 'sunset' ? 1.8 : 1.4}
                color={lighting === 'sunset' ? '#FF9F43' : lighting === 'night' ? '#70A1FF' : '#FFF9E6'}
                castShadow
              />
              <directionalLight position={[-10, 8, -6]} intensity={0.4} color="#54A0FF" />
              <pointLight position={[0, 6, 0]} intensity={0.5} color="#D4A017" />

              {/* Realistic Monument Model */}
              <Float speed={0.3} rotationIntensity={0.03} floatIntensity={0.08}>
                {getDistinctRealisticModel(currentSite.id, activeLayer, lighting)}
              </Float>

              {/* Realistic Ambient Occlusion Ground Contact Shadow */}
              <ContactShadows position={[0, -1.82, 0]} opacity={0.7} scale={18} blur={2.5} far={4} color="#000000" />

              <CameraManager
                autoRotate={autoRotate}
                autoRotateSpeed={rotateSpeed}
                onControlsReady={(ctrls) => { controlsInstance.current = ctrls; }}
              />

              <fog attach="fog" args={[lighting === 'night' ? '#030408' : '#070913', 20, 50]} />
            </Suspense>
          </Canvas>

          {/* On-Screen 360° Joystick D-Pad */}
          <div className="absolute bottom-6 left-6 z-20 flex flex-col gap-2">
            <div className="bg-heritage-card/90 backdrop-blur-xl p-2.5 rounded-2xl border border-white/10 shadow-2xl flex flex-col gap-1">
              <div className="text-[10px] text-gold font-bold uppercase tracking-wider text-center mb-1">
                360° Orbit Navigation
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
            <span>360° Drag with Mouse or Touch to Orbit Monument</span>
          </div>
        </div>

        {/* Right Inspection Sidebar */}
        <div className={`w-80 bg-heritage-card border-l border-heritage-border flex flex-col overflow-y-auto transition-all ${showInfo ? 'translate-x-0' : 'translate-x-full hidden'}`}>
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
              <span className="text-sm font-bold text-white">Architectural Layer</span>
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
            <div className="text-xs font-bold text-gold uppercase tracking-wider">Historical & Engineering Facts</div>
            {currentSite.facts.map((f, i) => (
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
              Explore Full Heritage Guide
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeDViewerPage;
