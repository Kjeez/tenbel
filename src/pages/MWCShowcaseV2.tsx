import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, Train, Factory, Globe, Mountain, Shield, X, ChevronRight, Check } from 'lucide-react';

/* ─── DATA ───────────────────────────────────────────────────────────── */

const dataPoints = [
  {
    id: 'offgrid',
    type: 'product',
    title: 'OffGrid',
    tagline: 'Communicate When Nothing Else Works',
    horizon: 'short-term',
    position: { x: 400, y: 1500 }, // Position on the 3D map
    icon: Radio,
    color: '#14b8a6', // Teal
    image: '/mwc-offgrid.jpg',
    desc: 'Sub-GHz LoRa mesh communication — no SIM, no Wi-Fi, no infrastructure. Peer-to-peer range of 1.5–2 km, mesh range up to 12–13 km.',
    considerations: ['Beyond datasheets', 'E2E knowledge', 'Predictability', 'Network impact'],
    solution: 'Tenbel OffGrid creates a digital twin of emergency networks, ensuring resilient communication loops even when primary cell towers fail.'
  },
  {
    id: 'commsbox',
    type: 'product',
    title: 'Emergency CommsBox',
    tagline: 'Deploy a Secure Network Instantly',
    horizon: 'short-term',
    position: { x: 700, y: 1300 },
    icon: Shield,
    color: '#E8307A', // Pink
    image: '/mwc-commsbox.jpg',
    desc: 'IP67-rated, deployable communications system. Open it and instantly create a secure wireless network using 4G, 5G, Satellite, or WiFi Mesh.',
    considerations: ['IP67 Ruggedized', 'Secure Encrypted', 'Zero Infrastructure', 'Mission Critical'],
    solution: 'By aggregating multiple uplinks into a single, high-throughput secure mesh, the CommsBox ensures zero downtime during critical rescue operations.'
  },
  {
    id: 'railway',
    type: 'usecase',
    title: 'Railway Connectivity',
    tagline: 'Stopping Collisions, Connecting Every Track',
    horizon: 'mid-term',
    position: { x: 1300, y: 1000 },
    icon: Train,
    color: '#a855f7', // Purple
    image: '/mwc-railway.jpg',
    desc: 'Complete railway communication infrastructure powered by Tenbel. Automatic collision prevention systems using real-time sensor data.',
    considerations: ['Enhanced signal quality', 'More efficient spectrum usage', 'Real-time AI monitoring', 'Predictive maintenance'],
    solution: 'Creating network impact is not just about maximizing individual specs, but how all parameters function together. Tenbel antennas boost throughput for high-speed rail without signal drops.'
  },
  {
    id: 'enterprise',
    type: 'usecase',
    title: 'Smart Factory & IoT',
    tagline: 'Smart, Connected, Automated',
    horizon: 'mid-term',
    position: { x: 1000, y: 600 },
    icon: Factory,
    color: '#6366f1', // Indigo
    image: '/mwc-enterprise.jpg',
    desc: 'RFID readers and tags, IoT sensors, industrial networking equipment for factory automation and vehicle tracking.',
    considerations: ['UHF/HF/NFC Support', 'Industrial Ethernet', 'LoRaWAN Integration', 'Asset Tracking'],
    solution: 'Digital transformation of manufacturing requires deterministic latency. Tenbel’s industrial routers provide policy-based routing to prioritize critical robotic control data.'
  },
  {
    id: 'remote',
    type: 'usecase',
    title: 'Remote Connectivity',
    tagline: 'Reliable Links Where Others Fail',
    horizon: 'long-term',
    position: { x: 1500, y: 400 },
    icon: Globe,
    color: '#eab308', // Yellow
    image: '/mwc-remote.jpg',
    desc: 'Multi-SIM cellular routers with high-gain antennas for remote locations. Automatic failover, policy-based routing.',
    considerations: ['Multi-SIM failover', 'Satellite backup', 'Harsh environment', 'Always-on'],
    solution: 'For the most remote sites, Tenbel ensures leak-proof connectivity by constantly evaluating uplink quality and seamlessly switching between cellular and satellite in <2 seconds.'
  },
  {
    id: 'hiking',
    type: 'usecase',
    title: 'Wilderness Exploration',
    tagline: 'Stay Connected Beyond Cell Coverage',
    horizon: 'long-term',
    position: { x: 300, y: 500 },
    icon: Mountain,
    color: '#14b8a6', // Teal
    image: '/mwc-hiking.jpg',
    desc: 'Hikers and wilderness explorers venture where no network reaches. OffGrid gives them peer-to-peer messaging via LoRa.',
    considerations: ['Global coverage links', '3D topographical coverage', 'Low battery consumption', 'SOS capabilities'],
    solution: 'Although mobile coverage covers most human activity, the wilderness is left behind. Tenbel looks to a new frontier — providing off-grid mesh that requires zero infrastructure.'
  }
];

/* ─── HELPER COMPONENTS ──────────────────────────────────────────────── */

// A simple CSS 3D Box component to build the isometric city
const IsoBox = ({ x, y, w, h, d, color, opacity = 1 }: any) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: w,
        height: h,
        transform: `translateZ(${d / 2}px)`,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Top Face */}
      <div
        style={{
          position: 'absolute',
          width: w,
          height: h,
          background: color,
          opacity: opacity,
          transform: `translateZ(${d / 2}px)`,
          border: `1px solid rgba(255,255,255,0.2)`
        }}
      />
      {/* Front Face (bottom side on the 2D plane) */}
      <div
        style={{
          position: 'absolute',
          width: w,
          height: d,
          background: color,
          opacity: opacity * 0.8, // Shading
          transformOrigin: 'bottom',
          bottom: 0,
          transform: `rotateX(-90deg) translateY(${d}px)`,
          border: `1px solid rgba(255,255,255,0.1)`
        }}
      />
      {/* Right Face (right side on the 2D plane) */}
      <div
        style={{
          position: 'absolute',
          width: d,
          height: h,
          background: color,
          opacity: opacity * 0.6, // Shading
          transformOrigin: 'right',
          right: 0,
          transform: `rotateY(90deg) translateX(${d}px)`,
          border: `1px solid rgba(255,255,255,0.1)`
        }}
      />
    </div>
  );
};

/* ─── MAIN COMPONENT ─────────────────────────────────────────────────── */

export default function MWCShowcaseV2() {
  const [selectedHorizon, setSelectedHorizon] = useState<'short-term' | 'mid-term' | 'long-term'>('short-term');
  const [activePoint, setActivePoint] = useState<string | null>(null);

  // Map panning
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapPos, setMapPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX - mapPos.x, y: e.clientY - mapPos.y });
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setMapPos({
      x: e.clientX - startPos.x,
      y: e.clientY - startPos.y
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const activeData = dataPoints.find(p => p.id === activePoint);

  // Horizon colors based on Ericsson reference
  const horizonColors = {
    'short-term': '#2dd4bf', // Teal/Green
    'mid-term': '#6366f1',   // Indigo/Blue
    'long-term': '#a855f7'   // Purple
  };
  const activeColor = horizonColors[selectedHorizon];

  // Helper to generate a random city layout
  const [buildings] = useState(() => {
    const b = [];
    for (let i = 0; i < 60; i++) {
      b.push({
        x: Math.random() * 1800 + 100,
        y: Math.random() * 1800 + 100,
        w: Math.random() * 40 + 20,
        h: Math.random() * 40 + 20,
        d: Math.random() * 150 + 20,
      });
    }
    return b;
  });

  return (
    <div className="iso-root">
      
      {/* Header */}
      <header className="iso-header">
        <img src="/logo-new.png" alt="Tenbel" className="iso-logo" />
        <div className="iso-title-container">
          <h1 className="iso-title">Next generation networks</h1>
          <p className="iso-subtitle">High-performing resilient connectivity — delivering unmatched impact today and in the future</p>
        </div>
      </header>

      {/* 3D Map Container */}
      <div 
        className="iso-viewport"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <motion.div 
          className="iso-map-wrapper"
          animate={{
            x: activePoint ? mapPos.x - 300 : mapPos.x, // Shift left when panel is open
            y: mapPos.y,
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 120 }}
        >
          <div className="iso-map">
            {/* The base floor */}
            <div className="iso-floor" />
            
            {/* Buildings (Decorative) */}
            {buildings.map((b, i) => (
              <IsoBox 
                key={i} 
                x={b.x} y={b.y} w={b.w} h={b.h} d={b.d} 
                color={activeColor} 
                opacity={0.3} 
              />
            ))}

            {/* Hotspots / Data Points */}
            {dataPoints.map((p) => {
              const isActive = activePoint === p.id;
              const isHorizonMatch = selectedHorizon === p.horizon;
              const Icon = p.icon;
              
              // Only fully opaque if it matches the horizon or is actively selected
              const opacity = isActive || isHorizonMatch ? 1 : 0.4;
              
              return (
                <div 
                  key={p.id}
                  className="iso-hotspot"
                  style={{
                    left: p.position.x,
                    top: p.position.y,
                    transform: `translateZ(20px) rotateX(-90deg) rotateY(45deg)`, // Stand upright relative to camera
                    opacity,
                    zIndex: isActive ? 100 : 10
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePoint(p.id);
                    setSelectedHorizon(p.horizon as any);
                  }}
                >
                  <div className="iso-hotspot-pin">
                    <div className="iso-hotspot-pulse" style={{ borderColor: p.color }} />
                    <div className="iso-hotspot-dot" style={{ background: p.color }} />
                  </div>
                  <div className={`iso-hotspot-card ${isActive ? 'active' : ''}`}>
                    <Icon size={18} className="iso-hotspot-icon" />
                    <span>{p.title}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Right Horizons Navigator (Visible when no point is active) */}
      <AnimatePresence>
        {!activePoint && (
          <motion.div 
            className="iso-horizons-nav"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
          >
            <div className="iso-horizons-header">Horizons</div>
            <div className="iso-horizons-list">
              <button 
                className={`iso-horizon-btn ${selectedHorizon === 'long-term' ? 'active' : ''}`}
                style={{ '--active-bg': horizonColors['long-term'] } as any}
                onClick={() => setSelectedHorizon('long-term')}
              >
                <div className="iso-horizon-pyramid"><div/></div>
                <div className="iso-horizon-label">Long-term</div>
                <div className="iso-horizon-title">Research</div>
              </button>
              <button 
                className={`iso-horizon-btn ${selectedHorizon === 'mid-term' ? 'active' : ''}`}
                style={{ '--active-bg': horizonColors['mid-term'] } as any}
                onClick={() => setSelectedHorizon('mid-term')}
              >
                <div className="iso-horizon-pyramid"><div/></div>
                <div className="iso-horizon-label">Mid-term</div>
                <div className="iso-horizon-title">Exploration</div>
              </button>
              <button 
                className={`iso-horizon-btn ${selectedHorizon === 'short-term' ? 'active' : ''}`}
                style={{ '--active-bg': horizonColors['short-term'] } as any}
                onClick={() => setSelectedHorizon('short-term')}
              >
                <div className="iso-horizon-pyramid"><div/></div>
                <div className="iso-horizon-label">Short-term</div>
                <div className="iso-horizon-title">Foundation</div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail Overlay Panel */}
      <AnimatePresence>
        {activeData && (
          <motion.div 
            className="iso-detail-panel"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 120 }}
          >
            <button className="iso-close-btn" onClick={() => setActivePoint(null)}>
              <X size={24} />
            </button>
            
            <div className="iso-detail-header">
              <h2>{activeData.title} <span className="iso-detail-horizon">— {activeData.horizon === 'short-term' ? 'Foundation' : activeData.horizon === 'mid-term' ? 'Exploration' : 'Research'}</span></h2>
              <div className="iso-detail-badge" style={{ color: activeData.color }}>
                <span className="iso-detail-dot" style={{ background: activeData.color }} />
                {activeData.horizon.replace('-', ' ')}
              </div>
            </div>

            <p className="iso-detail-desc">{activeData.desc}</p>
            
            <div className="iso-detail-image-container">
              <img src={activeData.image} alt={activeData.title} className="iso-detail-image" />
              <div className="iso-detail-image-overlay" />
            </div>

            <div className="iso-detail-cols">
              <div className="iso-detail-col">
                <h3>Main considerations</h3>
                <ul className="iso-detail-list">
                  {activeData.considerations.map((item, idx) => (
                    <li key={idx}>
                      <span className="iso-check"><Check size={14} /></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="iso-detail-col">
                <h3>Solution / Network impact</h3>
                <p>{activeData.solution}</p>
              </div>
            </div>

            {/* Bottom Footer Actions (Similar to reference video controls) */}
            <div className="iso-detail-footer">
              <button className="iso-footer-btn"><ChevronRight size={18} /> View Case Study</button>
              <button className="iso-footer-btn"><Globe size={18} /> Technical Specs</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .iso-root {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: #0b0f19;
          color: #f8fafc;
          font-family: 'Inter', sans-serif;
          overflow: hidden;
          user-select: none;
        }

        .iso-header {
          position: absolute;
          top: 0; left: 0; right: 0;
          padding: 30px 40px;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          z-index: 50;
          pointer-events: none;
        }

        .iso-logo {
          position: absolute;
          left: 40px;
          top: 30px;
          height: 32px;
        }

        .iso-title-container {
          text-align: center;
          max-width: 700px;
        }

        .iso-title {
          font-size: 2.5rem;
          font-weight: 300;
          margin: 0 0 10px 0;
          letter-spacing: -0.02em;
        }

        .iso-subtitle {
          font-size: 1rem;
          color: #94a3b8;
          margin: 0;
        }

        /* Viewport & Map */
        .iso-viewport {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          perspective: 2000px;
          cursor: grab;
        }
        .iso-viewport:active {
          cursor: grabbing;
        }

        .iso-map-wrapper {
          position: absolute;
          top: 50%; left: 50%;
          transform-style: preserve-3d;
        }

        .iso-map {
          position: absolute;
          width: 2000px;
          height: 2000px;
          /* Center the 2000x2000 map on the wrapper */
          margin-left: -1000px;
          margin-top: -1000px;
          /* The magic isometric rotation */
          transform: rotateX(60deg) rotateZ(-45deg);
          transform-style: preserve-3d;
        }

        .iso-floor {
          position: absolute;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at center, #1e293b 0%, #0b0f19 70%);
          border: 1px solid rgba(255,255,255,0.05);
          box-shadow: inset 0 0 100px rgba(0,0,0,0.5);
        }

        /* Hotspots */
        .iso-hotspot {
          position: absolute;
          transform-style: preserve-3d;
          transition: opacity 0.4s ease;
          cursor: pointer;
        }

        .iso-hotspot-pin {
          position: absolute;
          bottom: 0; left: 50%;
          transform: translateX(-50%);
          width: 20px; height: 20px;
        }

        .iso-hotspot-dot {
          position: absolute;
          top: 50%; left: 50%;
          width: 12px; height: 12px;
          margin: -6px 0 0 -6px;
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(0,0,0,0.5);
        }

        .iso-hotspot-pulse {
          position: absolute;
          top: 50%; left: 50%;
          width: 40px; height: 40px;
          margin: -20px 0 0 -20px;
          border-radius: 50%;
          border: 1px solid white;
          animation: pulse-ring 2s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
        }

        @keyframes pulse-ring {
          0% { transform: scale(0.3); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }

        .iso-hotspot-card {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          white-space: nowrap;
          border-radius: 4px;
          transition: all 0.2s ease;
        }

        .iso-hotspot-card:hover, .iso-hotspot-card.active {
          background: rgba(30, 41, 59, 0.95);
          border-color: rgba(255,255,255,0.3);
          transform: translateX(-50%) translateY(-5px);
        }

        .iso-hotspot-icon {
          color: #94a3b8;
        }
        .iso-hotspot-card.active .iso-hotspot-icon {
          color: white;
        }

        /* Right Horizons Nav */
        .iso-horizons-nav {
          position: absolute;
          right: 30px;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.05);
          width: 180px;
          z-index: 40;
        }

        .iso-horizons-header {
          padding: 12px 16px;
          font-size: 0.8rem;
          color: #94a3b8;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .iso-horizon-btn {
          width: 100%;
          text-align: left;
          padding: 24px 16px;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          color: white;
          cursor: pointer;
          transition: background 0.3s;
          position: relative;
        }

        .iso-horizon-btn:hover {
          background: rgba(255,255,255,0.05);
        }

        .iso-horizon-btn.active {
          background: var(--active-bg);
        }

        .iso-horizon-pyramid {
          width: 30px; height: 15px;
          border-bottom: 2px solid rgba(255,255,255,0.5);
          margin-bottom: 16px;
          position: relative;
        }
        .iso-horizon-pyramid div {
          position: absolute;
          bottom: 4px; left: 5px; right: 5px;
          border-bottom: 2px solid rgba(255,255,255,0.8);
        }

        .iso-horizon-label {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.7);
          margin-bottom: 4px;
        }

        .iso-horizon-title {
          font-size: 1.1rem;
          font-weight: 500;
        }

        /* Detail Panel */
        .iso-detail-panel {
          position: absolute;
          right: 0; top: 0; bottom: 0;
          width: 45%;
          min-width: 500px;
          background: #1e293b; /* Solid dark blue/gray */
          border-left: 1px solid rgba(255,255,255,0.1);
          z-index: 100;
          display: flex;
          flex-direction: column;
          box-shadow: -20px 0 50px rgba(0,0,0,0.5);
        }

        .iso-close-btn {
          position: absolute;
          top: 20px; right: 20px;
          background: transparent;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          z-index: 10;
        }
        .iso-close-btn:hover {
          color: white;
        }

        .iso-detail-header {
          padding: 40px 40px 20px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .iso-detail-header h2 {
          font-size: 2.2rem;
          font-weight: 300;
          margin: 0;
          line-height: 1.2;
        }

        .iso-detail-horizon {
          color: #64748b;
          font-weight: 300;
        }

        .iso-detail-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-top: 10px;
        }

        .iso-detail-dot {
          width: 8px; height: 8px; border-radius: 50%;
        }

        .iso-detail-desc {
          padding: 0 40px;
          color: #cbd5e1;
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .iso-detail-image-container {
          position: relative;
          width: 100%;
          height: 280px;
          background: #0f172a;
        }

        .iso-detail-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .iso-detail-image-overlay {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(to top, #1e293b, transparent 50%);
        }

        .iso-detail-cols {
          display: flex;
          gap: 40px;
          padding: 30px 40px;
          flex: 1;
        }

        .iso-detail-col {
          flex: 1;
        }

        .iso-detail-col h3 {
          font-size: 1.1rem;
          font-weight: 500;
          color: white;
          margin-bottom: 16px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          padding-bottom: 12px;
        }

        .iso-detail-col p {
          color: #94a3b8;
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .iso-detail-list {
          list-style: none;
          padding: 0; margin: 0;
        }

        .iso-detail-list li {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #cbd5e1;
          margin-bottom: 12px;
          font-size: 0.95rem;
        }

        .iso-check {
          background: #3b82f6; /* Blue check like reference */
          color: white;
          border-radius: 4px;
          padding: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .iso-detail-footer {
          display: flex;
          border-top: 1px solid rgba(255,255,255,0.1);
          background: rgba(15, 23, 42, 0.5);
        }

        .iso-footer-btn {
          flex: 1;
          padding: 20px;
          background: transparent;
          border: none;
          border-right: 1px solid rgba(255,255,255,0.1);
          color: white;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .iso-footer-btn:hover {
          background: rgba(255,255,255,0.05);
        }

      `}</style>
    </div>
  );
}
