import { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Radio,
  Train,
  Factory,
  Globe,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Mountain,
  Tractor,
  Hospital,
  Shield,
  Layers,
  Eye,
  Volume2,
  VolumeX,
} from 'lucide-react';
import {
  RailwayScene,
  DisasterScene,
  AgricultureScene,
  RemoteConnectivityScene,
  FactoryScene,
  HikingScene,
  globalAnimStyles,
} from '../components/AnimatedScenes';

/* ─── DATA ───────────────────────────────────────────────────────────── */

const products = [
  {
    id: 'offgrid',
    title: 'OffGrid',
    tagline: 'Communicate When Nothing Else Works',
    desc: 'Sub-GHz LoRa mesh communication — no SIM, no Wi-Fi, no infrastructure. Peer-to-peer range of 1.5–2 km, mesh range up to 12–13 km. 3–4 week battery life. Zero network charges.',
    image: '/mwc-offgrid.jpg',
    videos: [
      '/videos/LoRa_devices_communicating_on_rocks_20261001173513.mp4',
      '/videos/Hikers_connecting_via_mesh_network_20261001173508.mp4'
    ],
    icon: Radio,
    color: '#14b8a6',
    highlights: [
      'Sub-GHz LoRa Technology',
      'Bluetooth Connected — No SIM Required',
      'Multi-Hop Mesh extends to 12–13 km',
      '3–4 Week Battery Life',
      'Zero Infrastructure Dependency',
      'No Network Charges',
    ],
    specs: [
      { label: 'Range', value: '1.5–2 km (standalone)' },
      { label: 'Mesh Range', value: '12–13 km' },
      { label: 'Battery', value: '3–4 weeks' },
      { label: 'Connectivity', value: 'Bluetooth + LoRa' },
    ],
  },
  {
    id: 'commsbox',
    title: 'Emergency Communications BoX',
    tagline: 'Deploy a Secure Network — Anywhere, Instantly',
    desc: 'IP67-rated, deployable communications system. Open it and instantly create a secure wireless network. Multi-connectivity: 4G, 5G, Satellite, WiFi Mesh, Offline Mesh. Available in Briefcase & Cylinder (Candy Box) form factors.',
    image: '/mwc-commsbox.jpg',
    videos: [
      '/videos/Rescue_teams_setting_up_communic._20261001173529.mp4',
      '/videos/Rescue_teams_setting_up_communic._20261001173531.mp4'
    ],
    icon: Shield,
    color: '#E8307A',
    highlights: [
      'IP67 Ruggedized Case',
      'Secure & Encrypted Communication',
      '4G, 5G, Satellite, WiFi Mesh, Offline',
      'Briefcase & Cylinder Form Factors',
      'Mission-Critical Grade',
      'Zero Infrastructure Required',
    ],
    specs: [
      { label: 'Rating', value: 'IP67' },
      { label: 'Modes', value: '4G/5G/Sat/Mesh' },
      { label: 'Security', value: 'End-to-End Encrypted' },
      { label: 'Forms', value: 'Briefcase + Candy Box' },
    ],
  },
  {
    id: 'railway',
    title: 'Railway Solutions',
    tagline: 'Antennas, Routers, Cables & Accessories',
    desc: 'Complete railway communication infrastructure — high-gain antennas, industrial routers, ruggedized cables and accessories. CCTV, Wi-Fi, satellite connectivity all integrated from a central router for safe and connected rail operations.',
    image: '/mwc-railway.jpg',
    videos: [
      '/videos/Train_moving_along_railway_tracks_20261001173524.mp4'
    ],
    icon: Train,
    color: '#a855f7',
    highlights: [
      'High-Gain Railway Antennas',
      'Industrial-Grade Routers',
      'Ruggedized Cables & Accessories',
      'CCTV & Surveillance Integration',
      'Wi-Fi & Satellite Connectivity',
      'Central Router Management',
    ],
    specs: [
      { label: 'Frequency', value: '600–6000 MHz' },
      { label: 'Rating', value: 'IP67' },
      { label: 'Tech', value: '5G/4G/Wi-Fi 6E/GPS' },
      { label: 'Integration', value: 'CCTV + WiFi + Sat' },
    ],
  },
  {
    id: 'enterprise',
    title: 'Enterprise Connectivity & IoT',
    tagline: 'Smart, Connected, Automated',
    desc: 'RFID readers and tags, IoT sensors, industrial networking equipment for factory automation, vehicle tracking, medical use cases, and supply chain management. Connected intelligence for modern enterprises.',
    image: '/mwc-enterprise.jpg',
    videos: [
      '/videos/RFID_scanner_reading_product_tag_20261001173449.mp4',
      '/videos/Smart_factory_production_line_in._20261001173455.mp4'
    ],
    icon: Factory,
    color: '#6366f1',
    highlights: [
      'RFID Readers & Tags',
      'IoT Sensor Networks',
      'Industrial Automation',
      'Vehicle & Asset Tracking',
      'Supply Chain Management',
      'Medical & Healthcare IoT',
    ],
    specs: [
      { label: 'RFID', value: 'UHF / HF / NFC' },
      { label: 'IoT', value: 'LoRaWAN / NB-IoT' },
      { label: 'Network', value: 'Industrial Ethernet' },
      { label: 'Use', value: 'Factory / Medical / Fleet' },
    ],
  },
  {
    id: 'remote',
    title: 'Remote Connectivity Solution',
    tagline: 'Reliable Links Where Others Fail',
    desc: 'Multi-SIM cellular routers with high-gain antennas for remote locations. Automatic failover, policy-based routing, continuous monitoring. Resorts, hospitals, warehouses — leak-proof, always-on connectivity.',
    image: '/mwc-remote.jpg',
    videos: [
      '/videos/Doctor_performing_remote_medical._1080p_20261001173444.mp4',
      '/videos/Hospital_switches_to_backup_conn._20261001173501.mp4'
    ],
    icon: Globe,
    color: '#eab308',
    highlights: [
      'Multi-SIM Cellular Routers',
      'High-Gain Directional Antennas',
      'Automatic Failover & Recovery',
      'Policy-Based Routing',
      'Remote Monitoring Dashboard',
      'Leak-Proof Connectivity',
    ],
    specs: [
      { label: 'SIMs', value: 'Multi-SIM / Multi-Op' },
      { label: 'Antennas', value: 'Omni + Directional' },
      { label: 'Failover', value: 'Automatic (<2s)' },
      { label: 'Monitoring', value: '24/7 Dashboard' },
    ],
  },
];

const useCases = [
  {
    id: 'disaster',
    title: 'Disaster Management',
    tagline: 'When Towers Fall, Communication Survives',
    desc: 'Nepal\'s recent disasters and ongoing landslides across the Himalayas, Tibet, and India prove one thing: when towers break, people need a way to communicate. With OffGrid and the Emergency Communications BoX, teams stay connected even when all infrastructure is destroyed. No network, no power, no problem.',
    image: '/mwc-disaster.jpg',
    videos: [
      '/videos/Rescue_teams_setting_up_communic._20261001173531.mp4',
      '/videos/Rescue_teams_setting_up_communic._20261001173529.mp4'
    ],
    icon: Mountain,
    color: '#ef4444',
    products: ['OffGrid', 'Emergency Communications BoX'],
    benefits: [
      'Works when all cell towers are destroyed',
      'Instant deployment — no infrastructure setup',
      'Mesh network enables team coordination',
      'Critical for NDRF, SDRF, and first responders',
      'Proven need: Nepal earthquakes, Himalayan landslides',
      'IP67 rated — works in rain, mud, debris',
    ],
    realWorld: 'In Nepal\'s recent disasters, broken cell towers left entire regions disconnected. With Tenbel OffGrid, rescue teams could still communicate peer-to-peer across 12–13 km using mesh relays — no cell network needed.',
    story: [
      {
        type: 'video',
        media: '/videos/Rescue_teams_setting_up_communic._20261001173531.mp4',
        title: 'The Problem: Broken Infrastructure',
        text: 'In extreme disasters, traditional cell towers fall. First responders are left completely disconnected when they need coordination the most.',
      },
      {
        type: 'video',
        media: '/videos/Rescue_teams_setting_up_communic._20261001173529.mp4',
        title: 'The Solution: Instant Network',
        text: 'Tenbel OffGrid and Emergency CommsBox deploy in under 3 minutes. A fully secure, offline mesh network that works without power or towers.',
      }
    ]
  },
  {
    id: 'hiking',
    title: 'Hiking & Wilderness',
    tagline: 'Stay Connected Beyond Cell Coverage',
    desc: 'Hikers, trekkers, and wilderness explorers venture where no network reaches. OffGrid gives them peer-to-peer messaging via LoRa — just a smartphone and a compact node. Perfect for mountain trails, dense forests, and remote expeditions.',
    image: '/mwc-hiking.jpg',
    videos: [
      '/videos/Hikers_connecting_via_mesh_network_20261001173508.mp4',
      '/videos/LoRa_devices_communicating_on_rocks_20261001173513.mp4'
    ],
    icon: Mountain,
    color: '#14b8a6',
    products: ['OffGrid'],
    benefits: [
      'No SIM, no data charges, no network required',
      'Compact and lightweight for backpacks',
      'Group messaging via mesh relay nodes',
      '3–4 week battery for extended treks',
      'SOS and location sharing capabilities',
      'Works in any terrain — mountains, forests, valleys',
    ],
    realWorld: 'Trekkers in the Indian Himalayas use OffGrid to stay connected across valleys and peaks where no cell tower reaches, ensuring safety and coordination during multi-day expeditions.',
  },
  {
    id: 'railway',
    title: 'Railway Connectivity',
    tagline: 'Stopping Collisions, Connecting Every Track',
    desc: 'Complete railway communication infrastructure powered by Tenbel. Antennas, routers, cables, satellite, CCTV, and Wi-Fi — all connected from a central router. Automatic collision prevention systems using real-time sensor data and AI monitoring.',
    image: '/mwc-railway.jpg',
    videos: [
      '/videos/Train_moving_along_railway_tracks_20261001173524.mp4'
    ],
    icon: Train,
    color: '#a855f7',
    products: ['Railway Solutions', 'Enterprise IoT'],
    benefits: [
      'Automatic train collision prevention',
      'All systems connected from central router',
      'CCTV, Wi-Fi, satellite integration',
      'Real-time sensor monitoring & AI alerts',
      'High-gain antennas for trackside coverage',
      'Ruggedized for outdoor railway environments',
    ],
    realWorld: 'Tenbel\'s integrated railway system connects CCTV cameras, collision sensors, passenger Wi-Fi, and satellite links through a single enterprise router — enabling automatic emergency braking when obstacles are detected.',
  },
  {
    id: 'agriculture',
    title: 'Smart Agriculture',
    tagline: 'IoT-Enabled Precision Farming',
    desc: 'Harvester combines equipped with antennas, cameras, and IoT sensors. RFID-enabled autonomous operations with collision avoidance. AI checks RFID sensors in farms connected to OffGrid for network-free monitoring.',
    image: '/mwc-agriculture.jpg',
    videos: [
      '/videos/Autonomous_harvester_in_wheat_field_20261001173521.mp4',
      '/videos/RFID_sensor_scanning_crop_row_20261001173514.mp4'
    ],
    icon: Tractor,
    color: '#22c55e',
    products: ['Enterprise IoT', 'OffGrid', 'RFID Systems'],
    benefits: [
      'Autonomous harvester with collision avoidance',
      'RFID sensors for crop and equipment tracking',
      'Camera & sensor-equipped combines',
      'AI-powered monitoring via OffGrid',
      'No network charges — OffGrid connectivity',
      'Auto-harvest and quality sorting',
    ],
    realWorld: 'Smart harvesters with Tenbel IoT sensors automatically navigate fields, avoid collisions, and sort harvest quality — all connected through OffGrid mesh networks where cellular coverage doesn\'t exist.',
  },
  {
    id: 'factory',
    title: 'Smart Factory',
    tagline: 'Connected Intelligence for Manufacturing',
    desc: 'Smart factory connectivity for date & batch coding, quality filtering, waste detection, and automated sorting. RFID-powered production line monitoring with real-time data analytics.',
    image: '/mwc-enterprise.jpg',
    videos: [
      '/videos/Smart_factory_production_line_in._20261001173455.mp4',
      '/videos/RFID_scanner_reading_product_tag_20261001173449.mp4'
    ],
    icon: Factory,
    color: '#6366f1',
    products: ['Enterprise IoT', 'RFID Systems'],
    benefits: [
      'Automated date & batch number coding',
      'Real-time quality filtering',
      'Waste goods detection & separation',
      'Multi-grade product sorting',
      'RFID-powered production tracking',
      'Full traceability from line to shelf',
    ],
    realWorld: 'Tenbel\'s RFID and IoT systems enable factory floors to automatically code, filter, and sort products by quality — reducing waste by 40% and ensuring complete batch traceability.',
  },
  {
    id: 'remote-connectivity',
    title: 'Remote Connectivity',
    tagline: 'Always-On, Everywhere',
    desc: 'Remote island hospitals where doctors diagnose patients remotely with help from junior staff. If the network disconnects, the system automatically restores connectivity. Resorts, hospitals, remote warehouses — leak-proof, resilient connectivity.',
    image: '/mwc-remote.jpg',
    videos: [
      '/videos/Hospital_switches_to_backup_conn._20261001173501.mp4',
      '/videos/Doctor_performing_remote_medical._1080p_20261001173444.mp4'
    ],
    icon: Hospital,
    color: '#eab308',
    products: ['Remote Connectivity Solution', 'OffGrid'],
    benefits: [
      'Auto-restore on network disconnection',
      'Remote telemedicine for island hospitals',
      'Multi-SIM failover for 99.9% uptime',
      'Resort & hospitality connectivity',
      'Warehouse monitoring & management',
      'Leak-proof, weather-resistant deployment',
    ],
    realWorld: 'On a remote island, a doctor diagnoses patients via telemedicine with junior nurses on-site. When the satellite link drops, Tenbel\'s failover system automatically switches to cellular backup — zero downtime.',
  },
];

/* ─── PARTICLES CANVAS ─────────────────────────────────────────────── */

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create particles
    const count = Math.min(80, Math.floor(window.innerWidth / 18));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const alpha = (1 - dist / 150) * 0.15;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(20, 184, 166, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw & update particles
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(20, 184, 166, ${p.opacity})`;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
}

/* ─── ANIMATED COUNTER ───────────────────────────────────────────── */

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000;
    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      start = Math.floor(eased * end);
      setCount(start);
      if (progress < 1) requestAnimationFrame(tick);
    };
    tick();
  }, [value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── MAIN COMPONENT ──────────────────────────────────────────────── */

type View = 'intro' | 'choose' | 'products' | 'usecases' | 'product-detail' | 'usecase-detail';

export default function MWCShowcase() {
  const [view, setView] = useState<View>('intro');
  const [selectedProduct, setSelectedProduct] = useState<number>(0);
  const [selectedUseCase, setSelectedUseCase] = useState<number>(0);
  const [introStep, setIntroStep] = useState(0);

  // Intro auto-advance
  useEffect(() => {
    if (view !== 'intro') return;
    const t1 = setTimeout(() => setIntroStep(1), 800);
    const t2 = setTimeout(() => setIntroStep(2), 2200);
    const t3 = setTimeout(() => setIntroStep(3), 3800);
    const t4 = setTimeout(() => setIntroStep(4), 5200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [view]);

  const skipIntro = useCallback(() => {
    setView('choose');
  }, []);

  const goToProducts = useCallback(() => setView('products'), []);
  const goToUseCases = useCallback(() => setView('usecases'), []);
  const goToChoose = useCallback(() => setView('choose'), []);
  const goToIntro = useCallback(() => setView('intro'), []);

  const openProduct = useCallback((i: number) => {
    setSelectedProduct(i);
    setView('product-detail');
  }, []);

  const openUseCase = useCallback((i: number) => {
    setSelectedUseCase(i);
    setView('usecase-detail');
  }, []);

  return (
    <div className="mwc-root">
      <AnimatePresence mode="wait">
        {view === 'intro' && (
          <IntroScreen
            key="intro"
            step={introStep}
            onSkip={skipIntro}
            onEnter={skipIntro}
            onSelectProduct={openProduct}
            onSelectUseCase={openUseCase}
          />
        )}
        {view === 'choose' && (
          <ChooseScreen
            key="choose"
            onProducts={goToProducts}
            onUseCases={goToUseCases}
            onBack={goToIntro}
          />
        )}
        {view === 'products' && (
          <ProductsOverview
            key="products"
            onBack={goToChoose}
            onSelect={openProduct}
          />
        )}
        {view === 'usecases' && (
          <UseCasesOverview
            key="usecases"
            onBack={goToChoose}
            onSelect={openUseCase}
          />
        )}
        {view === 'product-detail' && (
          <ProductDetail
            key={`pd-${selectedProduct}`}
            product={products[selectedProduct]}
            index={selectedProduct}
            total={products.length}
            onBack={() => setView('products')}
            onNext={() => {
              if (selectedProduct < products.length - 1) {
                setSelectedProduct(selectedProduct + 1);
              }
            }}
            onPrev={() => {
              if (selectedProduct > 0) {
                setSelectedProduct(selectedProduct - 1);
              }
            }}
          />
        )}
        {view === 'usecase-detail' && (
          <UseCaseDetail
            key={`uc-${selectedUseCase}`}
            useCase={useCases[selectedUseCase]}
            index={selectedUseCase}
            total={useCases.length}
            onBack={() => setView('usecases')}
            onNext={() => {
              if (selectedUseCase < useCases.length - 1) {
                setSelectedUseCase(selectedUseCase + 1);
              }
            }}
            onPrev={() => {
              if (selectedUseCase > 0) {
                setSelectedUseCase(selectedUseCase - 1);
              }
            }}
          />
        )}
      </AnimatePresence>

      <style>{mwcStyles}</style>
    </div>
  );
}

/* ─── INTRO SCREEN ──────────────────────────────────────────────────── */

const heroVideos = [
  '/videos/Data_flowing_through_city_infras._20261001173450.mp4',
  '/videos/Train_moving_along_railway_tracks_20261001173524.mp4',
  '/videos/Smart_factory_production_line_in._20261001173455.mp4',
  '/videos/Autonomous_harvester_in_wheat_field_20261001173521.mp4',
  '/videos/Rescue_teams_setting_up_communic._20261001173529.mp4',
  '/videos/Hikers_connecting_via_mesh_network_20261001173508.mp4',
  '/videos/Hospital_switches_to_backup_conn._20261001173501.mp4',
  '/videos/Tenbel_logo_materializes_on_network_20261001173455.mp4',
];

function IntroScreen({ step, onSkip, onEnter, onSelectProduct, onSelectUseCase }: { step: number; onSkip: () => void; onEnter: () => void; onSelectProduct: (i: number) => void; onSelectUseCase: (i: number) => void }) {
  const prodArray = [...products, ...products, ...products, ...products];
  const useCaseArray = [...useCases, ...useCases, ...useCases, ...useCases];
  const [activeVideo, setActiveVideo] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveVideo(prev => (prev + 1) % heroVideos.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="mwc-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
      style={{ overflow: 'hidden auto', position: 'relative' }}
    >
      {/* Full-screen video backgrounds with crossfade */}
      <div className="mwc-hero-video-container">
        {heroVideos.map((src, i) => (
          <video
            key={src}
            className={`mwc-hero-video ${i === activeVideo ? 'mwc-hero-video--active' : ''}`}
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={src} type="video/mp4" />
          </video>
        ))}
        <div className="mwc-hero-video-overlay" />
        <div className="mwc-hero-video-gradient" />
      </div>

      {/* Floating particles on top of video */}
      <ParticleBackground />

      {/* Skip button */}
      <button onClick={onSkip} className="mwc-skip-btn">
        Skip Intro <ChevronRight size={14} />
      </button>

      {/* Video indicator dots */}
      <div className="mwc-hero-dots">
        {heroVideos.map((_, i) => (
          <button
            key={i}
            className={`mwc-hero-dot ${i === activeVideo ? 'mwc-hero-dot--active' : ''}`}
            onClick={() => setActiveVideo(i)}
          />
        ))}
      </div>

      <div className="mwc-intro-content" style={{ paddingTop: '80px', paddingBottom: '40px' }}>
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={step >= 0 ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mwc-intro-logo"
        >
          <img src="/logo-new.png" alt="Tenbel" className="mwc-logo-img" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={step >= 1 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mwc-intro-tagline"
          style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)', fontWeight: 700, textShadow: '0 4px 30px rgba(0,0,0,0.6)', maxWidth: '800px', textAlign: 'center' }}
        >
          Empowering a Sustainably Connected Future
        </motion.p>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={step >= 1 ? { opacity: 0.8, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', marginBottom: '32px', letterSpacing: '0.05em' }}
        >
          Off-Grid Connectivity • Mesh Networks • IoT Solutions
        </motion.p>

        {/* Stats row with glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={step >= 2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mwc-intro-stats"
          style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.15)' }}
        >
          <div className="mwc-stat">
            <div className="mwc-stat-value"><AnimatedCounter value={5} /></div>
            <div className="mwc-stat-label">Product Lines</div>
          </div>
          <div className="mwc-stat-divider" />
          <div className="mwc-stat">
            <div className="mwc-stat-value"><AnimatedCounter value={6} /></div>
            <div className="mwc-stat-label">Use Cases</div>
          </div>
          <div className="mwc-stat-divider" />
          <div className="mwc-stat">
            <div className="mwc-stat-value"><AnimatedCounter value={13} suffix=" km" /></div>
            <div className="mwc-stat-label">Mesh Range</div>
          </div>
          <div className="mwc-stat-divider" />
          <div className="mwc-stat">
            <div className="mwc-stat-value">IP67</div>
            <div className="mwc-stat-label">Rated</div>
          </div>
        </motion.div>

        {/* Enter button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={step >= 3 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ marginTop: '16px', marginBottom: '120px' }}
        >
          <button onClick={onEnter} className="mwc-enter-btn" style={{ fontSize: '1.1rem', padding: '18px 48px', boxShadow: '0 0 40px rgba(20,184,166,0.4)' }}>
            <span>Enter Showcase</span>
            <ArrowRight size={18} />
          </button>
        </motion.div>
        
        {/* Carousels */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={step >= 4 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ width: '100%', maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}
        >
          {/* Product Carousel (Left to Right) */}
          <div className="mwc-carousel-wrapper" style={{ padding: '0 40px' }}>
            <div className="mwc-carousel-track-container" style={{ height: '240px' }}>
              <div className="mwc-carousel-track mwc-carousel-track--right">
                {prodArray.map((p, i) => {
                  const originalIndex = i % products.length;
                  const Icon = p.icon;
                  return (
                    <div key={`p-${i}`} className="mwc-carousel-item" onClick={() => onSelectProduct(originalIndex)}>
                      <img src={p.image} alt={p.title} className="mwc-carousel-item-img" />
                      <div className="mwc-carousel-item-overlay" style={{ background: `linear-gradient(to top, ${p.color}dd, transparent)` }} />
                      <div className="mwc-carousel-item-content">
                        <Icon size={24} style={{ color: '#fff', marginBottom: '8px' }} />
                        <h4>{p.title}</h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Use Case Carousel (Right to Left) */}
          <div className="mwc-carousel-wrapper" style={{ padding: '0 40px' }}>
            <div className="mwc-carousel-track-container" style={{ height: '240px' }}>
              <div className="mwc-carousel-track mwc-carousel-track--left">
                {useCaseArray.map((u, i) => {
                  const originalIndex = i % useCases.length;
                  const Icon = u.icon;
                  return (
                    <div key={`u-${i}`} className="mwc-carousel-item" onClick={() => onSelectUseCase(originalIndex)}>
                      <img src={u.image} alt={u.title} className="mwc-carousel-item-img" />
                      <div className="mwc-carousel-item-overlay" style={{ background: `linear-gradient(to top, ${u.color}dd, transparent)` }} />
                      <div className="mwc-carousel-item-content">
                        <Icon size={24} style={{ color: '#fff', marginBottom: '8px' }} />
                        <h4>{u.title}</h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─── CHOOSE SCREEN ─────────────────────────────────────────────────── */

function ChooseScreen({ onProducts, onUseCases, onBack }: { onProducts: () => void; onUseCases: () => void; onBack: () => void }) {
  return (
    <motion.div
      className="mwc-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ParticleBackground />

      <div className="mwc-nav-bar" style={{ background: 'transparent', borderBottom: 'none', position: 'absolute' }}>
        <button onClick={onBack} className="mwc-back-btn">
          <ArrowLeft size={16} /> Back
        </button>
      </div>

      <div className="mwc-choose-content">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mwc-choose-header"
        >
          <img src="/logo-new.png" alt="Tenbel" className="mwc-choose-logo" />
          <h2 className="mwc-choose-title">What would you like to explore?</h2>
          <p className="mwc-choose-subtitle">Choose a path to discover Tenbel's solutions</p>
        </motion.div>

        <div className="mwc-choose-cards">
          <motion.button
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
            onClick={onProducts}
            className="mwc-choose-card mwc-choose-card--products"
          >
            <div className="mwc-choose-card-glow" />
            <div className="mwc-choose-card-icon">
              <Layers size={40} />
            </div>
            <h3>Our Products</h3>
            <p>Explore our 5 product lines — OffGrid, CommsBox, Railway, Enterprise IoT & Remote Connectivity</p>
            <span className="mwc-choose-card-cta">
              Browse Products <ArrowRight size={16} />
            </span>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
            onClick={onUseCases}
            className="mwc-choose-card mwc-choose-card--usecases"
          >
            <div className="mwc-choose-card-glow mwc-choose-card-glow--alt" />
            <div className="mwc-choose-card-icon mwc-choose-card-icon--alt">
              <Eye size={40} />
            </div>
            <h3>Use Cases</h3>
            <p>See real-world applications — Disaster Relief, Railways, Agriculture, Smart Factory & more</p>
            <span className="mwc-choose-card-cta mwc-choose-card-cta--alt">
              View Use Cases <ArrowRight size={16} />
            </span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── PRODUCTS OVERVIEW ──────────────────────────────────────────── */

function ProductsOverview({ onBack, onSelect }: { onBack: () => void; onSelect: (i: number) => void }) {
  return (
    <motion.div
      className="mwc-screen mwc-scroll-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mwc-overlay-bg" />

      <div className="mwc-nav-bar">
        <button onClick={onBack} className="mwc-back-btn">
          <ArrowLeft size={16} /> Back
        </button>
        <img src="/logo-new.png" alt="Tenbel" className="mwc-nav-logo" />
        <span className="mwc-nav-badge">Products</span>
      </div>

      <div className="mwc-grid-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mwc-section-header"
        >
          <span className="mwc-section-tag">Product Portfolio</span>
          <h2 className="mwc-section-title">Our Product Lines</h2>
          <p className="mwc-section-desc">Click any product to explore in detail</p>
        </motion.div>

        <div className="mwc-products-grid">
          {products.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.button
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 100 }}
                onClick={() => onSelect(i)}
                className="mwc-product-card"
              >
                <div className="mwc-product-card-img" style={{ backgroundImage: `url(${p.image})` }}>
                  <div className="mwc-product-card-overlay" />
                </div>
                <div className="mwc-product-card-body">
                  <div className="mwc-product-card-icon" style={{ background: `${p.color}20`, borderColor: `${p.color}40` }}>
                    <Icon size={22} style={{ color: p.color }} />
                  </div>
                  <h3 className="mwc-product-card-title">{p.title}</h3>
                  <p className="mwc-product-card-tagline">{p.tagline}</p>
                  <span className="mwc-product-card-cta" style={{ color: p.color }}>
                    Explore <ChevronRight size={14} />
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── USE CASES OVERVIEW ─────────────────────────────────────────── */

function UseCasesOverview({ onBack, onSelect }: { onBack: () => void; onSelect: (i: number) => void }) {
  return (
    <motion.div
      className="mwc-screen mwc-scroll-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mwc-overlay-bg" />

      <div className="mwc-nav-bar">
        <button onClick={onBack} className="mwc-back-btn">
          <ArrowLeft size={16} /> Back
        </button>
        <img src="/logo-new.png" alt="Tenbel" className="mwc-nav-logo" />
        <span className="mwc-nav-badge mwc-nav-badge--alt">Use Cases</span>
      </div>

      <div className="mwc-grid-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mwc-section-header"
        >
          <span className="mwc-section-tag mwc-section-tag--alt">Real-World Applications</span>
          <h2 className="mwc-section-title">Use Cases</h2>
          <p className="mwc-section-desc">See how Tenbel products transform industries</p>
        </motion.div>

        <div className="mwc-usecases-grid">
          {useCases.map((uc, i) => {
            const Icon = uc.icon;
            return (
              <motion.button
                key={uc.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08, type: 'spring', stiffness: 100 }}
                onClick={() => onSelect(i)}
                className="mwc-usecase-card"
              >
                <div className="mwc-usecase-card-img" style={{ backgroundImage: `url(${uc.image})` }}>
                  <div className="mwc-usecase-card-overlay" />
                  <div className="mwc-usecase-card-badge" style={{ background: `${uc.color}cc` }}>
                    <Icon size={14} />
                    {uc.title}
                  </div>
                </div>
                <div className="mwc-usecase-card-body">
                  <h3>{uc.title}</h3>
                  <p>{uc.tagline}</p>
                  <div className="mwc-usecase-card-products">
                    {uc.products.map((pr, j) => (
                      <span key={j} className="mwc-usecase-product-tag">{pr}</span>
                    ))}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── PRODUCT DETAIL ─────────────────────────────────────────────── */

interface ProductDetailProps {
  product: typeof products[0];
  index: number;
  total: number;
  onBack: () => void;
  onNext: () => void;
  onPrev: () => void;
}

function ProductDetail({ product, index, total, onBack, onNext, onPrev }: ProductDetailProps) {
  const Icon = product.icon;
  const [videoIndex, setVideoIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  return (
    <motion.div
      className="mwc-screen mwc-scroll-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mwc-overlay-bg" />

      {/* Nav */}
      <div className="mwc-nav-bar">
        <button onClick={onBack} className="mwc-back-btn">
          <ArrowLeft size={16} /> All Products
        </button>
        <img src="/logo-new.png" alt="Tenbel" className="mwc-nav-logo" />
        <div className="mwc-nav-counter">
          {index > 0 && (
            <button onClick={onPrev} className="mwc-arrow-btn"><ArrowLeft size={16} /></button>
          )}
          <span>{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
          {index < total - 1 && (
            <button onClick={onNext} className="mwc-arrow-btn"><ArrowRight size={16} /></button>
          )}
        </div>
      </div>

      {/* Hero image/video pulled outside container for full width */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mwc-detail-hero"
      >
        {product.videos && product.videos.length > 0 ? (
          <>
            <video key={product.videos[videoIndex]} className="mwc-detail-hero-img" autoPlay loop muted={isMuted} playsInline>
              <source src={product.videos[videoIndex]} type="video/mp4" />
            </video>
            <button className="mwc-sound-btn" onClick={() => setIsMuted(!isMuted)}>
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            {product.videos.length > 1 && (
              <div className="mwc-video-stepper">
                {product.videos.map((_, i) => (
                  <button
                    key={i}
                    className={`mwc-video-step-btn ${i === videoIndex ? 'active' : ''}`}
                    onClick={() => setVideoIndex(i)}
                    style={{ backgroundColor: i === videoIndex ? product.color : 'rgba(255,255,255,0.3)' }}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <img src={product.image} alt={product.title} className="mwc-detail-hero-img" />
        )}
        <div className="mwc-detail-hero-overlay" />
        <div className="mwc-detail-hero-content">
          <div className="mwc-detail-icon" style={{ background: `${product.color}30`, borderColor: `${product.color}60` }}>
            <Icon size={28} style={{ color: product.color }} />
          </div>
          <h1 className="mwc-detail-title">{product.title}</h1>
          <p className="mwc-detail-tagline">{product.tagline}</p>
        </div>
      </motion.div>

      <div className="mwc-detail-container">

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mwc-detail-desc-block"
        >
          <p className="mwc-detail-desc">{product.desc}</p>
        </motion.div>

        {/* Specs Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mwc-detail-specs"
        >
          {product.specs.map((s, i) => (
            <div key={i} className="mwc-detail-spec">
              <div className="mwc-detail-spec-label">{s.label}</div>
              <div className="mwc-detail-spec-value" style={{ color: product.color }}>{s.value}</div>
            </div>
          ))}
        </motion.div>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mwc-detail-highlights"
        >
          <h3 className="mwc-detail-section-title">Key Features</h3>
          <div className="mwc-detail-highlights-grid">
            {product.highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.05 }}
                className="mwc-detail-highlight"
              >
                <span className="mwc-detail-highlight-dot" style={{ background: product.color }} />
                {h}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Navigation buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mwc-detail-nav-btns"
        >
          {index > 0 && (
            <button onClick={onPrev} className="mwc-nav-card-btn">
              <ArrowLeft size={16} />
              <span>{products[index - 1].title}</span>
            </button>
          )}
          <div style={{ flex: 1 }} />
          {index < total - 1 && (
            <button onClick={onNext} className="mwc-nav-card-btn mwc-nav-card-btn--next">
              <span>{products[index + 1].title}</span>
              <ArrowRight size={16} />
            </button>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─── USE CASE DETAIL ──────────────────────────────────────────────── */

interface UseCaseDetailProps {
  useCase: typeof useCases[0];
  index: number;
  total: number;
  onBack: () => void;
  onNext: () => void;
  onPrev: () => void;
}

function UseCaseDetail({ useCase, index, total, onBack, onNext, onPrev }: UseCaseDetailProps) {
  const Icon = useCase.icon;
  const [videoIndex, setVideoIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [storyStep, setStoryStep] = useState(0);



  // Fallback to standard scroll layout
  return (
    <motion.div
      className="mwc-screen mwc-scroll-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mwc-overlay-bg" />

      {/* Nav */}
      <div className="mwc-nav-bar">
        <button onClick={onBack} className="mwc-back-btn">
          <ArrowLeft size={16} /> All Use Cases
        </button>
        <img src="/logo-new.png" alt="Tenbel" className="mwc-nav-logo" />
        <div className="mwc-nav-counter">
          {index > 0 && (
            <button onClick={onPrev} className="mwc-arrow-btn"><ArrowLeft size={16} /></button>
          )}
          <span>{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
          {index < total - 1 && (
            <button onClick={onNext} className="mwc-arrow-btn"><ArrowRight size={16} /></button>
          )}
        </div>
      </div>

      {/* Conditional Hero: Story Mode OR Standard Video Mode */}
      {useCase.story && useCase.story.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mwc-detail-hero mwc-detail-hero--wide mwc-detail-hero--story"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={storyStep}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="mwc-story-media-container"
            >
              {useCase.story[storyStep].type === 'video' ? (
                <>
                  <video 
                    className="mwc-story-media" 
                    autoPlay 
                    muted={isMuted} 
                    playsInline
                    onEnded={() => setStoryStep(s => (s + 1) % useCase.story.length)}
                  >
                    <source src={useCase.story[storyStep].media} type="video/mp4" />
                  </video>
                  <button className="mwc-sound-btn" onClick={() => setIsMuted(!isMuted)}>
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                </>
              ) : (
                <div className="mwc-story-animation-wrap">
                  {useCase.story[storyStep].component === 'disaster' && <DisasterScene />}
                  {useCase.story[storyStep].component === 'railway' && <RailwayScene />}
                  {useCase.story[storyStep].component === 'agriculture' && <AgricultureScene />}
                  {useCase.story[storyStep].component === 'remote-connectivity' && <RemoteConnectivityScene />}
                  {useCase.story[storyStep].component === 'factory' && <FactoryScene />}
                  {useCase.story[storyStep].component === 'hiking' && <HikingScene />}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
          
          <div className="mwc-story-gradient-overlay" />

          <div className="mwc-story-bottom-bar">
            <div className="mwc-story-text-overlay">
              <motion.div
                key={`text-${storyStep}`}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <div className="mwc-story-step-badge">Phase {storyStep + 1}</div>
                <h2 className="mwc-story-title">{useCase.story[storyStep].title}</h2>
                <p className="mwc-story-desc">{useCase.story[storyStep].text}</p>
              </motion.div>
            </div>

            <div className="mwc-story-controls">
              <button 
                className={`mwc-story-nav-btn ${storyStep === 0 ? 'disabled' : ''}`}
                onClick={() => setStoryStep(s => Math.max(0, s - 1))}
              >
                <ArrowLeft size={20} />
              </button>
              <div className="mwc-story-dots">
                {useCase.story.map((_, i) => (
                  <div 
                    key={i} 
                    className={`mwc-story-dot ${i === storyStep ? 'active' : ''}`}
                    onClick={() => setStoryStep(i)}
                    style={{ backgroundColor: i === storyStep ? useCase.color : 'rgba(255,255,255,0.3)' }}
                  />
                ))}
              </div>
              <button 
                className={`mwc-story-nav-btn ${storyStep === useCase.story.length - 1 ? 'disabled' : ''}`}
                onClick={() => setStoryStep(s => Math.min(useCase.story.length - 1, s + 1))}
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mwc-detail-hero mwc-detail-hero--wide"
        >
          {useCase.videos && useCase.videos.length > 0 ? (
            <>
              <video key={useCase.videos[videoIndex]} className="mwc-detail-hero-img" autoPlay loop muted={isMuted} playsInline>
                <source src={useCase.videos[videoIndex]} type="video/mp4" />
              </video>
              <button className="mwc-sound-btn" onClick={() => setIsMuted(!isMuted)}>
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              {useCase.videos.length > 1 && (
                <div className="mwc-video-stepper">
                  {useCase.videos.map((_, i) => (
                    <button
                      key={i}
                      className={`mwc-video-step-btn ${i === videoIndex ? 'active' : ''}`}
                      onClick={() => setVideoIndex(i)}
                      style={{ backgroundColor: i === videoIndex ? useCase.color : 'rgba(255,255,255,0.3)' }}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <img src={useCase.image} alt={useCase.title} className="mwc-detail-hero-img" />
          )}
          <div className="mwc-detail-hero-overlay" />
          <div className="mwc-detail-hero-content">
            <div className="mwc-detail-icon" style={{ background: `${useCase.color}30`, borderColor: `${useCase.color}60` }}>
              <Icon size={28} style={{ color: useCase.color }} />
            </div>
            <h1 className="mwc-detail-title">{useCase.title}</h1>
            <p className="mwc-detail-tagline">{useCase.tagline}</p>
          </div>
        </motion.div>
      )}

      <div className="mwc-detail-container">

        {/* Products used */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mwc-uc-products-used"
        >
          <span className="mwc-uc-products-label">Products Used:</span>
          <div className="mwc-uc-products-tags">
            {useCase.products.map((p, i) => (
              <span key={i} className="mwc-uc-product-pill" style={{ borderColor: `${useCase.color}50`, color: useCase.color }}>
                {p}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mwc-detail-desc-block"
        >
          <p className="mwc-detail-desc">{useCase.desc}</p>
        </motion.div>

        {/* Animated Network Topology Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {useCase.id === 'railway' && <RailwayScene />}
          {useCase.id === 'disaster' && <DisasterScene />}
          {useCase.id === 'agriculture' && <AgricultureScene />}
          {useCase.id === 'remote-connectivity' && <RemoteConnectivityScene />}
          {useCase.id === 'factory' && <FactoryScene />}
          {useCase.id === 'hiking' && <HikingScene />}
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mwc-detail-highlights"
        >
          <h3 className="mwc-detail-section-title">Key Benefits</h3>
          <div className="mwc-detail-highlights-grid">
            {useCase.benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                className="mwc-detail-highlight"
              >
                <span className="mwc-detail-highlight-dot" style={{ background: useCase.color }} />
                {b}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Real-world story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="mwc-uc-story"
        >
          <div className="mwc-uc-story-accent" style={{ background: useCase.color }} />
          <div>
            <h4 className="mwc-uc-story-title">Real-World Impact</h4>
            <p className="mwc-uc-story-text">{useCase.realWorld}</p>
          </div>
        </motion.div>

        {/* Navigation buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          className="mwc-detail-nav-btns"
        >
          {index > 0 && (
            <button onClick={onPrev} className="mwc-nav-card-btn">
              <ArrowLeft size={16} />
              <span>{useCases[index - 1].title}</span>
            </button>
          )}
          <div style={{ flex: 1 }} />
          {index < total - 1 && (
            <button onClick={onNext} className="mwc-nav-card-btn mwc-nav-card-btn--next">
              <span>{useCases[index + 1].title}</span>
              <ArrowRight size={16} />
            </button>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─── STYLES ──────────────────────────────────────────────────────── */

const mwcStyles = `
${globalAnimStyles}

/* ── Root ───────────────────────────────────────────────── */
.mwc-root {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: #060612;
  color: #e2e8f0;
  font-family: 'Inter', sans-serif;
  overflow-x: hidden;
}

.mwc-screen {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.mwc-scroll-screen {
  justify-content: flex-start;
  padding-top: 80px;
  padding-bottom: 60px;
  overflow-y: auto;
}

.mwc-overlay-bg {
  position: fixed;
  inset: 0;
  background: radial-gradient(ellipse at 20% 20%, rgba(20,184,166,0.06) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 80%, rgba(232,48,122,0.04) 0%, transparent 50%),
              #060612;
  z-index: 0;
}

/* ── Hero Video System ────────────────────────────────── */
.mwc-hero-video-container {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

.mwc-hero-video {
  position: absolute;
  top: 50%; left: 50%;
  min-width: 100%; min-height: 100%;
  width: auto; height: auto;
  transform: translate(-50%, -50%) scale(1.05);
  object-fit: cover;
  opacity: 0;
  transition: opacity 1.5s ease-in-out;
}

.mwc-hero-video--active {
  opacity: 0.65;
}

.mwc-hero-video-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, rgba(6,6,18,0.35) 0%, rgba(6,6,18,0.75) 100%);
  z-index: 1;
}

.mwc-hero-video-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(6,6,18,0.6) 0%, transparent 30%, transparent 60%, rgba(6,6,18,0.85) 100%);
  z-index: 2;
}

.mwc-hero-dots {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 50;
}

.mwc-hero-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.4);
  background: transparent;
  cursor: pointer;
  transition: all 0.4s ease;
  padding: 0;
}

.mwc-hero-dot--active {
  background: #14b8a6;
  border-color: #14b8a6;
  box-shadow: 0 0 12px rgba(20,184,166,0.6);
  transform: scale(1.3);
}

/* ── Intro ──────────────────────────────────────────────── */
.mwc-intro-content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 24px;
  padding: 20px;
}

.mwc-intro-logo {
  margin-bottom: 8px;
}

.mwc-logo-img {
  height: 80px;
  width: auto;
  filter: brightness(1.1) drop-shadow(0 0 30px rgba(20,184,166,0.3));
}

.mwc-intro-tagline {
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  font-weight: 300;
  color: #94a3b8;
  letter-spacing: 0.04em;
  max-width: 480px;
}

.mwc-intro-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: rgba(232,48,122,0.1);
  border: 1px solid rgba(232,48,122,0.25);
  color: #E8307A;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 10px 22px;
  border-radius: 50px;
}

.mwc-badge-pulse {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #E8307A;
  animation: mwc-pulse 2s ease-out infinite;
}

@keyframes mwc-pulse {
  0% { box-shadow: 0 0 0 0 rgba(232,48,122,0.5); }
  70% { box-shadow: 0 0 0 12px rgba(232,48,122,0); }
  100% { box-shadow: 0 0 0 0 rgba(232,48,122,0); }
}

.mwc-intro-stats {
  display: flex;
  align-items: center;
  gap: 24px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px;
  padding: 20px 32px;
  backdrop-filter: blur(10px);
}

.mwc-stat {
  text-align: center;
}

.mwc-stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.02em;
}

.mwc-stat-label {
  font-size: 0.68rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-top: 2px;
}

.mwc-stat-divider {
  width: 1px;
  height: 32px;
  background: rgba(255,255,255,0.1);
}

.mwc-skip-btn {
  position: absolute;
  top: 24px;
  right: 24px;
  z-index: 50;
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  color: #94a3b8;
  padding: 8px 16px;
  border-radius: 50px;
  font-size: 0.78rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.mwc-skip-btn:hover {
  background: rgba(255,255,255,0.1);
  color: #fff;
}

.mwc-enter-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(135deg, #14b8a6 0%, #0891b2 100%);
  color: #fff;
  padding: 14px 36px;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 24px rgba(20,184,166,0.35);
  margin-top: 8px;
}

.mwc-enter-btn:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 32px rgba(20,184,166,0.5);
}

/* ── Choose Screen ──────────────────────────────────────── */
.mwc-choose-content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  max-width: 900px;
  padding: 20px;
}

.mwc-choose-header {
  margin-bottom: 40px;
}

.mwc-choose-logo {
  display: block;
  margin: 0 auto 24px auto;
  height: 48px;
  filter: brightness(1.1);
}

.mwc-choose-title {
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  font-weight: 700;
  color: #fff;
  margin-bottom: 8px;
  letter-spacing: -0.02em;
}

.mwc-choose-subtitle {
  color: #64748b;
  font-size: 1rem;
}

.mwc-choose-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  width: 100%;
}

@media (max-width: 640px) {
  .mwc-choose-cards {
    grid-template-columns: 1fr;
  }
}

.mwc-choose-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 24px;
  padding: 48px 32px 36px;
  cursor: pointer;
  transition: all 0.3s;
  overflow: hidden;
}

.mwc-choose-card:hover {
  border-color: rgba(20,184,166,0.3);
  transform: translateY(-4px);
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}

.mwc-choose-card--usecases:hover {
  border-color: rgba(232,48,122,0.3);
}

.mwc-choose-card-glow {
  position: absolute;
  top: -60px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(20,184,166,0.15) 0%, transparent 70%);
  pointer-events: none;
}

.mwc-choose-card-glow--alt {
  background: radial-gradient(circle, rgba(232,48,122,0.15) 0%, transparent 70%);
}

.mwc-choose-card-icon {
  width: 80px;
  height: 80px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(20,184,166,0.12);
  border: 1px solid rgba(20,184,166,0.25);
  color: #14b8a6;
  margin-bottom: 20px;
}

.mwc-choose-card-icon--alt {
  background: rgba(232,48,122,0.12);
  border-color: rgba(232,48,122,0.25);
  color: #E8307A;
}

.mwc-choose-card h3 {
  font-size: 1.3rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 10px;
}

.mwc-choose-card p {
  color: #64748b;
  font-size: 0.88rem;
  line-height: 1.6;
  margin-bottom: 20px;
}

.mwc-choose-card-cta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #14b8a6;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.mwc-choose-card-cta--alt {
  color: #E8307A;
}

/* ── Carousel Marquee ────────────────────────────────────── */
.mwc-choose-content-new {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
  z-index: 10;
}

.mwc-choose-header--new {
  text-align: center;
  margin-bottom: 24px;
}

.mwc-carousel-wrapper {
  width: 100%;
  margin-bottom: 32px;
}

.mwc-carousel-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-left: 5%;
  margin-bottom: 16px;
  color: #f8fafc;
  display: flex;
  align-items: center;
  gap: 12px;
}

.mwc-carousel-track-container {
  width: 100%;
  overflow: hidden;
  position: relative;
  -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
  mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
}

.mwc-carousel-track {
  display: flex;
  width: max-content;
}

.mwc-carousel-track--left {
  animation: marquee-left 40s linear infinite;
}
.mwc-carousel-track--right {
  animation: marquee-right 40s linear infinite;
}

.mwc-carousel-track:hover {
  animation-play-state: paused;
}

@keyframes marquee-left {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes marquee-right {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}

.mwc-carousel-item {
  position: relative;
  width: 280px;
  height: 180px;
  border-radius: 12px;
  margin: 0 10px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(0,0,0,0.4);
  border: 1px solid rgba(255,255,255,0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.mwc-carousel-item:hover {
  transform: translateY(-8px) scale(1.02);
  border-color: rgba(255,255,255,0.3);
  box-shadow: 0 15px 30px rgba(0,0,0,0.6);
  z-index: 20;
}

.mwc-carousel-item-img {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.mwc-carousel-item:hover .mwc-carousel-item-img {
  transform: scale(1.1);
}

.mwc-carousel-item-overlay {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  transition: opacity 0.3s ease;
}

.mwc-carousel-item-content {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  padding: 16px;
  color: white;
  z-index: 2;
}

.mwc-carousel-item-content h4 {
  font-size: 1rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0,0,0,0.8);
}

/* ── Nav Bar ────────────────────────────────────────────── */
.mwc-nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 80px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  background: rgba(6,6,18,0.85);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}

.mwc-back-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  color: #94a3b8;
  padding: 8px 16px;
  border-radius: 50px;
  font-size: 0.82rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.mwc-back-btn:hover {
  background: rgba(255,255,255,0.1);
  color: #fff;
}

.mwc-nav-logo {
  height: 48px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.mwc-nav-badge {
  background: rgba(20,184,166,0.12);
  border: 1px solid rgba(20,184,166,0.25);
  color: #14b8a6;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 6px 14px;
  border-radius: 50px;
}

.mwc-nav-badge--alt {
  background: rgba(232,48,122,0.12);
  border-color: rgba(232,48,122,0.25);
  color: #E8307A;
}

.mwc-nav-counter {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #64748b;
  font-size: 0.82rem;
  font-weight: 600;
}

.mwc-arrow-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.04);
  color: #94a3b8;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.mwc-arrow-btn:hover {
  background: rgba(255,255,255,0.1);
  color: #fff;
  border-color: rgba(255,255,255,0.2);
}

/* ── Grid Containers ────────────────────────────────────── */
.mwc-grid-container {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 24px;
}

.mwc-section-header {
  text-align: center;
  margin-bottom: 40px;
}

.mwc-section-tag {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #14b8a6;
  margin-bottom: 10px;
}

.mwc-section-tag--alt {
  color: #E8307A;
}

.mwc-section-title {
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
}

.mwc-section-desc {
  color: #64748b;
  font-size: 1rem;
}

/* ── Product Cards Grid ─────────────────────────────────── */
.mwc-products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

@media (min-width: 1024px) {
  .mwc-products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1280px) {
  .mwc-products-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

.mwc-product-card {
  display: flex;
  flex-direction: column;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
  text-align: left;
}

.mwc-product-card:hover {
  border-color: rgba(255,255,255,0.15);
  transform: translateY(-6px);
  box-shadow: 0 16px 48px rgba(0,0,0,0.3);
}

.mwc-product-card-img {
  height: 160px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.mwc-product-card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 30%, rgba(6,6,18,0.8) 100%);
}

.mwc-product-card-body {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.mwc-product-card-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid;
  margin-bottom: 12px;
}

.mwc-product-card-title {
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 6px;
  line-height: 1.3;
}

.mwc-product-card-tagline {
  font-size: 0.78rem;
  color: #64748b;
  line-height: 1.5;
  flex: 1;
  margin-bottom: 12px;
}

.mwc-product-card-cta {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}

/* ── Use Case Cards Grid ────────────────────────────────── */
.mwc-usecases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}

@media (min-width: 1024px) {
  .mwc-usecases-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.mwc-usecase-card {
  display: flex;
  flex-direction: column;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
  text-align: left;
}

.mwc-usecase-card:hover {
  border-color: rgba(255,255,255,0.15);
  transform: translateY(-6px);
  box-shadow: 0 16px 48px rgba(0,0,0,0.3);
}

.mwc-usecase-card-img {
  height: 180px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.mwc-usecase-card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 40%, rgba(6,6,18,0.85) 100%);
}

.mwc-usecase-card-badge {
  position: absolute;
  bottom: 12px;
  left: 12px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: 50px;
  font-size: 0.7rem;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.mwc-usecase-card-body {
  padding: 20px;
}

.mwc-usecase-card-body h3 {
  font-size: 1.05rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 6px;
}

.mwc-usecase-card-body p {
  font-size: 0.82rem;
  color: #64748b;
  line-height: 1.5;
  margin-bottom: 12px;
}

.mwc-usecase-card-products {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.mwc-usecase-product-tag {
  font-size: 0.65rem;
  font-weight: 600;
  color: #94a3b8;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 3px 10px;
  border-radius: 50px;
  letter-spacing: 0.04em;
}

/* ── Detail View ────────────────────────────────────────── */
.mwc-detail-container {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 10px 24px 40px;
}

.mwc-detail-hero {
  position: relative;
  width: 100%;
  margin-bottom: 28px;
  background: #000;
}

.mwc-sound-btn {
  position: absolute;
  top: 24px;
  right: 24px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 20;
  transition: all 0.2s;
}

.mwc-sound-btn--story {
  top: 100px;
}

.mwc-sound-btn:hover {
  background: rgba(0, 0, 0, 0.6);
  transform: scale(1.05);
}

.mwc-detail-hero-img {
  width: 100%;
  height: 60vh;
  object-fit: cover;
  display: block;
}

@media (max-width: 640px) {
  .mwc-detail-hero-img {
    height: 220px;
  }
}

.mwc-detail-hero--wide .mwc-detail-hero-img {
  height: 60vh;
}

@media (max-width: 640px) {
  .mwc-detail-hero--wide .mwc-detail-hero-img {
    height: 240px;
  }
}

.mwc-detail-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(6,6,18,0.9) 0%, rgba(6,6,18,0.3) 50%, transparent 100%);
}
.mwc-video-stepper {
  position: absolute;
  bottom: 24px;
  right: 24px;
  display: flex;
  gap: 12px;
  z-index: 20;
}

.mwc-video-step-btn {
  width: 40px;
  height: 4px;
  border-radius: 2px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.mwc-video-step-btn:hover {
  background-color: rgba(255,255,255,0.7) !important;
}

.mwc-video-step-btn.active {
  width: 60px;
  box-shadow: 0 0 10px currentColor;
}

.mwc-detail-hero-content {
  position: absolute;
  bottom: 40px;
  left: max(24px, calc((100% - 900px) / 2 + 24px));
  right: max(24px, calc((100% - 900px) / 2 + 24px));
}

.mwc-detail-icon {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  backdrop-filter: blur(8px);
}

.mwc-detail-title {
  font-size: clamp(1.5rem, 4vw, 2.2rem);
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin-bottom: 6px;
}

.mwc-detail-tagline {
  font-size: 0.95rem;
  color: #94a3b8;
  font-weight: 400;
}

.mwc-detail-desc-block {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 18px;
  padding: 24px;
  margin-bottom: 24px;
}

.mwc-detail-desc {
  color: #cbd5e1;
  font-size: 0.95rem;
  line-height: 1.75;
}

.mwc-detail-specs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
  margin-bottom: 24px;
}

.mwc-detail-spec {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 14px;
  padding: 16px 18px;
}

.mwc-detail-spec-label {
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #64748b;
  margin-bottom: 4px;
}

.mwc-detail-spec-value {
  font-size: 1rem;
  font-weight: 700;
}

.mwc-detail-highlights {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 18px;
  padding: 24px;
  margin-bottom: 24px;
}

.mwc-detail-section-title {
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #94a3b8;
  margin-bottom: 16px;
}

.mwc-detail-highlights-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

@media (max-width: 640px) {
  .mwc-detail-highlights-grid {
    grid-template-columns: 1fr;
  }
}

.mwc-detail-highlight {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.85rem;
  color: #cbd5e1;
  padding: 8px 0;
}

.mwc-detail-highlight-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}

/* ── Use Case Specific ──────────────────────────────────── */
.mwc-uc-products-used {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 20px;
  padding: 0 4px;
}

.mwc-uc-products-label {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #64748b;
}

.mwc-uc-products-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.mwc-uc-product-pill {
  font-size: 0.72rem;
  font-weight: 600;
  padding: 5px 14px;
  border-radius: 50px;
  border: 1px solid;
  background: rgba(255,255,255,0.03);
  letter-spacing: 0.02em;
}

.mwc-uc-story {
  display: flex;
  gap: 16px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 18px;
  padding: 24px;
  margin-bottom: 24px;
}

.mwc-uc-story-accent {
  width: 4px;
  border-radius: 4px;
  flex-shrink: 0;
}

.mwc-uc-story-title {
  font-size: 0.85rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 8px;
  letter-spacing: 0.02em;
}

.mwc-uc-story-text {
  font-size: 0.88rem;
  color: #94a3b8;
  line-height: 1.7;
}

/* ── Nav Card Buttons ───────────────────────────────────── */
.mwc-detail-nav-btns {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-top: 8px;
}

.mwc-nav-card-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  color: #94a3b8;
  padding: 10px 18px;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.mwc-nav-card-btn:hover {
  background: rgba(255,255,255,0.08);
  color: #fff;
  border-color: rgba(255,255,255,0.2);
}

.mwc-nav-card-btn--next {
  margin-left: auto;
}

/* ── Responsive ─────────────────────────────────────────── */
@media (max-width: 480px) {
  .mwc-intro-stats {
    flex-wrap: wrap;
    gap: 16px;
    padding: 16px 20px;
    justify-content: center;
  }
  
  .mwc-stat-divider {
    display: none;
  }

  .mwc-stat {
    min-width: 70px;
  }

  .mwc-products-grid {
    grid-template-columns: 1fr;
  }
  
  .mwc-usecases-grid {
    grid-template-columns: 1fr;
  }

  .mwc-nav-logo {
    display: none;
  }

  .mwc-detail-nav-btns {
    flex-direction: column;
  }

  .mwc-nav-card-btn--next {
    margin-left: 0;
  }
}

/* ── Narrative Story Mode ───────────────────────────────── */

.mwc-detail-hero--story {
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
}

.mwc-story-media-container {
  position: absolute;
  inset: 0;
  z-index: 10;
}

.mwc-story-media {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mwc-story-animation-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 40px 180px;
}

.mwc-story-gradient-overlay {
  position: absolute;
  inset: 0;
  z-index: 15;
  background: linear-gradient(
    to bottom,
    rgba(6,6,18,0.7) 0%,
    rgba(6,6,18,0) 25%,
    rgba(6,6,18,0) 50%,
    rgba(6,6,18,0.8) 80%,
    rgba(6,6,18,1) 100%
  );
  pointer-events: none;
}

.mwc-story-bottom-bar {
  position: absolute;
  bottom: 40px;
  left: 40px;
  right: 40px;
  z-index: 30;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.mwc-story-text-overlay {
  flex: 1;
  max-width: 800px;
}

.mwc-story-step-badge {
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #fff;
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  padding: 4px 12px;
  border-radius: 50px;
  margin-bottom: 16px;
}

.mwc-story-title {
  font-size: 3rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 16px;
  text-shadow: 0 4px 20px rgba(0,0,0,0.5);
  line-height: 1.1;
}

.mwc-story-desc {
  font-size: 1.25rem;
  color: rgba(255,255,255,0.85);
  max-width: 700px;
  line-height: 1.6;
  text-shadow: 0 2px 10px rgba(0,0,0,0.5);
}

.mwc-story-controls {
  display: flex;
  align-items: center;
  gap: 16px;
}

.mwc-story-nav-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.2);
  background: rgba(255,255,255,0.05);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  backdrop-filter: blur(10px);
}

.mwc-story-nav-btn:hover:not(.disabled) {
  background: rgba(255,255,255,0.15);
  transform: scale(1.05);
}

.mwc-story-nav-btn.disabled {
  opacity: 0.3;
  cursor: default;
}

.mwc-story-dots {
  display: flex;
  gap: 16px;
}

.mwc-story-dot {
  width: 48px;
  height: 4px;
  border-radius: 2px;
  background: rgba(255,255,255,0.2);
  cursor: pointer;
  transition: all 0.3s;
}

.mwc-story-dot.active {
  background: #fff;
  box-shadow: 0 0 10px currentColor;
}

@media (max-width: 768px) {
  .mwc-story-title { font-size: 2rem; }
  .mwc-story-desc { font-size: 1rem; }
  .mwc-story-bottom-bar {
    flex-direction: column;
    align-items: flex-start;
    bottom: 24px;
    left: 24px;
    right: 24px;
    gap: 24px;
  }
  .mwc-story-controls {
    align-self: center;
  }
  .mwc-story-nav-btn { width: 44px; height: 44px; }
  .mwc-story-dot { width: 32px; }

  .mwc-detail-specs {
    grid-template-columns: repeat(2, 1fr);
  }
}
`;
