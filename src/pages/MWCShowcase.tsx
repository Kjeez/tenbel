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
  Hexagon,
  ChevronDown,
  Volume2,
  VolumeX,
  Play,
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
    story: [
      {
        type: 'video',
        media: '/videos/Hikers_connecting_via_mesh_network_20261001173508.mp4',
        title: 'The Problem: No Infrastructure, No Voice',
        text: 'Traditional communication requires towers, SIMs, and power grids. In off-grid environments like deep forests and mountains, none of this exists — leaving communities isolated.',
      },
      {
        type: 'video',
        media: '/videos/LoRa_devices_communicating_on_rocks_20261001173513.mp4',
        title: 'The Solution: OffGrid by Tenbel',
        text: 'Sub-GHz LoRa mesh communication — no SIM, no Wi-Fi, no infrastructure. Peer-to-peer range up to 2 km, mesh range up to 13 km. 3–4 week battery. Zero network charges.',
      }
    ]
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
    story: [
      {
        type: 'video',
        media: '/videos/Rescue_teams_setting_up_communic._20261001173531.mp4',
        title: 'The Problem: Minutes Matter, No Network',
        text: 'In emergencies, every minute of communication blackout costs lives. Traditional setups take hours or days to deploy — time that victims simply don\'t have.',
      },
      {
        type: 'video',
        media: '/videos/Rescue_teams_setting_up_communic._20261001173529.mp4',
        title: 'The Solution: Emergency CommsBox',
        text: 'Open the case, power on, and a secure multi-connectivity network is live in under 3 minutes. IP67 rated, encrypted, mission-critical — communication restored instantly.',
      }
    ]
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
    story: [
      {
        type: 'video',
        media: '/videos/Train_moving_along_railway_tracks_20261001173524.mp4',
        title: 'The Problem: Fragmented Systems',
        text: 'Cameras, sensors, Wi-Fi, and satellite links all run on separate systems. No unified management means blind spots, delayed alerts, and manual monitoring.',
      },
      {
        type: 'video',
        media: '/videos/Data_flowing_through_city_infras._20261001173450.mp4',
        title: 'The Solution: Tenbel Railway Infrastructure',
        text: 'High-gain antennas, industrial routers, and ruggedized accessories — all unified through a central router. CCTV, Wi-Fi, satellite, and collision prevention in one system.',
      }
    ]
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
    story: [
      {
        type: 'video',
        media: '/videos/RFID_scanner_reading_product_tag_20261001173449.mp4',
        title: 'The Problem: Manual Tracking Fails at Scale',
        text: 'Spreadsheets, barcodes, and manual checks can\'t keep up with modern enterprise demands. Assets get lost, batches go untraced, and quality control breaks down.',
      },
      {
        type: 'video',
        media: '/videos/Smart_factory_production_line_in._20261001173455.mp4',
        title: 'The Solution: Enterprise IoT by Tenbel',
        text: 'RFID readers, IoT sensors, and industrial networking — automated tracking from factory floor to delivery. Real-time visibility across your entire operation.',
      }
    ]
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
    story: [
      {
        type: 'video',
        media: '/videos/Hospital_switches_to_backup_conn._20261001173501.mp4',
        title: 'The Problem: No Backup, No Recovery',
        text: 'Single-link connectivity means one failure away from total isolation. Telemedicine sessions drop, guests lose service, warehouses go offline — with no automatic recovery.',
      },
      {
        type: 'video',
        media: '/videos/Doctor_performing_remote_medical._1080p_20261001173444.mp4',
        title: 'The Solution: Always-On by Tenbel',
        text: 'Multi-SIM routers with automatic failover switch between satellite, cellular, and mesh in under 2 seconds. Policy-based routing and 24/7 monitoring — zero downtime.',
      }
    ]
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
    story: [
      {
        type: 'video',
        media: '/videos/Hikers_connecting_via_mesh_network_20261001173508.mp4',
        title: 'The Problem: No Signal, No Safety',
        text: 'Hikers venture deep into mountains and forests where cell towers don\'t exist. A single wrong turn or injury can become life-threatening without any way to call for help.',
      },
      {
        type: 'video',
        media: '/videos/LoRa_devices_communicating_on_rocks_20261001173513.mp4',
        title: 'The Solution: Mesh-Connected Wilderness',
        text: 'Tenbel OffGrid creates a peer-to-peer mesh network via LoRa — no SIM, no towers needed. Groups stay connected across valleys and peaks with SOS alerts and location sharing.',
      }
    ]
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
    story: [
      {
        type: 'video',
        media: '/videos/Train_moving_along_railway_tracks_20261001173524.mp4',
        title: 'The Problem: Blind Tracks, Fatal Collisions',
        text: 'Railway networks span thousands of kilometres with limited visibility. Without real-time communication between trains and control centres, collisions and delays cost lives and billions.',
      },
      {
        type: 'video',
        media: '/videos/Data_flowing_through_city_infras._20261001173450.mp4',
        title: 'The Solution: Fully Connected Railway',
        text: 'Tenbel connects CCTV, collision sensors, passenger Wi-Fi, and satellite links through a single enterprise router — enabling automatic emergency braking and real-time AI monitoring.',
      }
    ]
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
    story: [
      {
        type: 'video',
        media: '/videos/Autonomous_harvester_in_wheat_field_20261001173521.mp4',
        title: 'The Problem: Disconnected Farms',
        text: 'Modern farming demands precision and automation, but vast agricultural fields have zero cellular coverage. Equipment operates blind, wasting resources and reducing yields.',
      },
      {
        type: 'video',
        media: '/videos/RFID_sensor_scanning_crop_row_20261001173514.mp4',
        title: 'The Solution: AI-Powered Smart Agriculture',
        text: 'Tenbel equips harvesters with IoT sensors, RFID tracking, and OffGrid mesh connectivity. Autonomous navigation, collision avoidance, and real-time quality sorting — all without cellular networks.',
      }
    ]
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
    story: [
      {
        type: 'video',
        media: '/videos/Smart_factory_production_line_in._20261001173455.mp4',
        title: 'The Problem: Blind Production Lines',
        text: 'Traditional factories lack real-time visibility into quality and waste. Defective products pass unnoticed, batch traceability is manual, and downtime costs millions.',
      },
      {
        type: 'video',
        media: '/videos/RFID_scanner_reading_product_tag_20261001173449.mp4',
        title: 'The Solution: Intelligent Manufacturing',
        text: 'Tenbel\'s RFID and IoT systems automate date coding, quality filtering, and waste detection. Every product is tracked from production line to shelf with full traceability.',
      }
    ]
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
    story: [
      {
        type: 'video',
        media: '/videos/Hospital_switches_to_backup_conn._20261001173501.mp4',
        title: 'The Problem: One Link, Total Isolation',
        text: 'Remote hospitals, island resorts, and warehouses depend on a single fragile connection. When it drops, patients lose access to specialists, operations halt, and lives are at risk.',
      },
      {
        type: 'video',
        media: '/videos/Doctor_performing_remote_medical._1080p_20261001173444.mp4',
        title: 'The Solution: Unbreakable Connectivity',
        text: 'Tenbel\'s auto-failover system instantly switches between satellite, cellular, and mesh links. Remote telemedicine, resort Wi-Fi, and warehouse monitoring stay online — always.',
      }
    ]
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
            onNavigateToUseCases={goToUseCases}
          />
        )}
        {view === 'usecases' && (
          <UseCasesOverview
            key="usecases"
            onBack={goToChoose}
            onSelect={openUseCase}
            onNavigateToProducts={goToProducts}
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
    }, 7000); // 7 seconds per slide
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
      <div className="mwc-hero-wrapper">
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
          <div className="mwc-hero-overlay-1" />
          <div className="mwc-hero-overlay-2" />
          <div className="mwc-hero-overlay-3" />
        </div>
        
        <ParticleBackground />

        <div className="mwc-hero-content-wrapper">
          <div className="mwc-hero-top">
            <motion.img 
              initial={{ opacity: 0, y: -20 }}
              animate={step >= 0 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              src="/logo-new.png" 
              alt="Tenbel" 
              className="mwc-hero-logo" 
            />
            <button onClick={onSkip} className="mwc-hero-skip">
              Skip Intro <ArrowRight size={14} style={{ marginLeft: 6 }} />
            </button>
          </div>

          <div className="mwc-hero-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeVideo}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mwc-hero-text-group"
              >
                <div className="mwc-hero-eyebrow">CONNECTING POSSIBILITIES</div>
                <h1 className="mwc-hero-headline">
                  Empowering a Sustainably<br/>
                  <span className="mwc-hero-highlight">Connected</span> Future
                </h1>
                <p className="mwc-hero-description">Off-Grid Connectivity &bull; Mesh Networks &bull; IoT Solutions</p>
              </motion.div>
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={step >= 0 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mwc-hero-stats-panel"
            >
              <div className="mwc-hero-stat">
                <div className="mwc-hero-stat-val">5</div>
                <div className="mwc-hero-stat-lbl">PRODUCT LINES</div>
              </div>
              <div className="mwc-hero-stat-div" />
              <div className="mwc-hero-stat">
                <div className="mwc-hero-stat-val">6</div>
                <div className="mwc-hero-stat-lbl">USE CASES</div>
              </div>
              <div className="mwc-hero-stat-div" />
              <div className="mwc-hero-stat">
                <div className="mwc-hero-stat-val">13 km</div>
                <div className="mwc-hero-stat-lbl">MESH RANGE</div>
              </div>
              <div className="mwc-hero-stat-div" />
              <div className="mwc-hero-stat">
                <div className="mwc-hero-stat-val">IP67</div>
                <div className="mwc-hero-stat-lbl">RATED</div>
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 15 }}
              animate={step >= 0 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={onEnter}
              className="mwc-hero-cta"
            >
              Enter Showcase <ArrowRight size={18} className="mwc-hero-cta-arrow" />
            </motion.button>
          </div>

          <div className="mwc-hero-bottom">
            <div className="mwc-hero-indicator">
              <span className="mwc-hero-indicator-text">
                {String(activeVideo + 1).padStart(2, '0')} / {String(heroVideos.length).padStart(2, '0')}
              </span>
              <span className="mwc-hero-indicator-line" />
              <div className="mwc-hero-dots-container">
                {heroVideos.map((_, i) => (
                  <button
                    key={i}
                    className={`mwc-hero-dot-new ${i === activeVideo ? 'active' : ''}`}
                    onClick={() => setActiveVideo(i)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
        
        {/* Carousels */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={step >= 0 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
          className="mwc-showcase-section"
        >
          {/* Products Slider */}
          <div className="mwc-slider-container">
            <div className="mwc-slider-header">
              <div className="mwc-slider-header-left">
                <div className="mwc-slider-eyebrow">
                  <span className="mwc-slider-eyebrow-line"></span> OUR PRODUCTS
                </div>
                <h2 className="mwc-slider-title">
                  Connectivity Solutions <span className="mwc-slider-title-highlight">Built for Real-World</span> Challenges
                </h2>
              </div>
              <div className="mwc-slider-header-right">
                <p>Rugged, reliable and easy-to-deploy solutions designed to keep people, devices and operations connected &mdash; anywhere, anytime.</p>
                <div className="mwc-slider-nav">
                  <button className="mwc-slider-nav-btn"><ArrowLeft size={16} /></button>
                  <button className="mwc-slider-nav-btn"><ArrowRight size={16} /></button>
                </div>
              </div>
            </div>

            <div className="mwc-slider-track-wrapper">
              <div className="mwc-slider-track mwc-slider-track--products">
                {prodArray.map((p, i) => {
                  const originalIndex = i % products.length;
                  const Icon = p.icon;
                  const desc = [
                    'Independent, sustainable connectivity for off-grid locations.',
                    'Flexible, rugged and deployment-ready solutions for reliable connectivity.',
                    'Secure and reliable connectivity for rail networks, stations and remote tracks.',
                    'Scalable networks for smart industries, campuses and cities.',
                    'High-performance networks for remote and challenging areas.',
                  ][originalIndex] || 'High-performance reliable connectivity.';
                  const color = ['#14b8a6', '#E8307A', '#8b5cf6', '#06b6d4', '#eab308'][originalIndex] || p.color;

                  return (
                    <div key={`p-${i}`} className="mwc-showcase-card" onClick={() => onSelectProduct(originalIndex)} style={{ '--accent': color } as React.CSSProperties}>
                      <div className="mwc-showcase-card-img-wrap">
                        <img src={p.image} alt={p.title} className="mwc-showcase-card-img" />
                        <div className="mwc-showcase-card-overlay" />
                      </div>
                      <div className="mwc-showcase-card-content">
                        <div className="mwc-showcase-card-top">
                          <span className="mwc-showcase-card-num">{String(originalIndex + 1).padStart(2, '0')}</span>
                          <div className="mwc-showcase-card-icon" style={{ color: color }}>
                            <Icon size={20} />
                          </div>
                        </div>
                        <h4 className="mwc-showcase-card-title">{p.title}</h4>
                        <p className="mwc-showcase-card-desc">{desc}</p>
                        <button className="mwc-showcase-card-arrow" style={{ borderColor: color, color: color }}>
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mwc-slider-progress-wrap">
              <div className="mwc-slider-progress-bar">
                <div className="mwc-slider-progress-fill" style={{ background: '#06b6d4' }} />
              </div>
              <div className="mwc-slider-progress-info">
                <span className="mwc-slider-auto-label">Auto sliding <ArrowRight size={12} style={{ display: 'inline-flex', verticalAlign: 'middle', marginLeft: 4 }} /></span>
                <span className="mwc-slider-count">01 / 05</span>
              </div>
            </div>
          </div>

          {/* Use Cases Slider */}
          <div className="mwc-slider-container" style={{ marginTop: '80px' }}>
            <div className="mwc-slider-header">
              <div className="mwc-slider-header-left">
                <div className="mwc-slider-eyebrow">
                  <span className="mwc-slider-eyebrow-line" style={{ background: '#E8307A' }}></span> USE CASES
                </div>
                <h2 className="mwc-slider-title">
                  Real Impact <span className="mwc-slider-title-highlight-alt" style={{ color: '#E8307A', WebkitTextFillColor: 'initial', background: 'none' }}>Across Diverse Environments</span>
                </h2>
              </div>
              <div className="mwc-slider-header-right">
                <p>From mountains and rural communities to critical infrastructure and industrial operations, our solutions power connectivity where it matters most.</p>
                <div className="mwc-slider-nav">
                  <button className="mwc-slider-nav-btn"><ArrowLeft size={16} /></button>
                  <button className="mwc-slider-nav-btn"><ArrowRight size={16} /></button>
                </div>
              </div>
            </div>

            <div className="mwc-slider-track-wrapper">
              <div className="mwc-slider-track mwc-slider-track--usecases">
                {useCaseArray.map((u, i) => {
                  const originalIndex = i % useCases.length;
                  const Icon = u.icon;
                  const desc = [
                    'Rapid deployment connectivity for emergencies and critical operations.',
                    'Rugged networks for demanding environments.',
                    'Intelligent connectivity for smarter, more resilient cities.',
                    'Bringing reliable connectivity to underserved regions.',
                    'Stay connected in the most remote and rugged terrains.',
                    'Precision farming with reliable IoT connectivity.',
                  ][originalIndex] || 'Reliable connectivity in all environments.';
                  const color = ['#ef4444', '#E8307A', '#8b5cf6', '#eab308', '#14b8a6', '#22c55e'][originalIndex] || u.color;

                  return (
                    <div key={`u-${i}`} className="mwc-showcase-card" onClick={() => onSelectUseCase(originalIndex)} style={{ '--accent': color } as React.CSSProperties}>
                      <div className="mwc-showcase-card-img-wrap">
                        <img src={u.image} alt={u.title} className="mwc-showcase-card-img" />
                        <div className="mwc-showcase-card-overlay" />
                      </div>
                      <div className="mwc-showcase-card-content">
                        <div className="mwc-showcase-card-top">
                          <span className="mwc-showcase-card-num">{String(originalIndex + 1).padStart(2, '0')}</span>
                          <div className="mwc-showcase-card-icon" style={{ color: color }}>
                            <Icon size={20} />
                          </div>
                        </div>
                        <h4 className="mwc-showcase-card-title">{u.title}</h4>
                        <p className="mwc-showcase-card-desc">{desc}</p>
                        <button className="mwc-showcase-card-arrow" style={{ borderColor: color, color: color }}>
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mwc-slider-progress-wrap">
              <div className="mwc-slider-progress-bar">
                <div className="mwc-slider-progress-fill" style={{ background: '#E8307A' }} />
              </div>
              <div className="mwc-slider-progress-info">
                <span className="mwc-slider-auto-label"><ArrowLeft size={12} style={{ display: 'inline-flex', verticalAlign: 'middle', marginRight: 4 }} /> Auto sliding</span>
                <span className="mwc-slider-count">01 / 06</span>
              </div>
            </div>
          </div>
        </motion.div>
    </motion.div>
  );
}

/* ─── CHOOSE SCREEN ─────────────────────────────────────────────────── */

function ChooseScreen({ onProducts, onUseCases, onBack }: { onProducts: () => void; onUseCases: () => void; onBack: () => void }) {
  return (
    <motion.div
      className="mwc-screen mwc-explore-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mwc-explore-bg">
        <div className="mwc-explore-bg-image" style={{ backgroundImage: 'url(/mwc-home-bg.jpg)' }} />
        <div className="mwc-explore-bg-overlay" />
        <ParticleBackground />
      </div>

      <div className="mwc-explore-nav">
        <button onClick={onBack} className="mwc-explore-back-btn">
          <ArrowLeft size={16} /> Back
        </button>
      </div>

      <div className="mwc-explore-content">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="mwc-explore-logo-wrap"
        >
          <img src="/logo-new.png" alt="Tenbel" className="mwc-explore-logo" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="mwc-explore-header"
        >
          <div className="mwc-explore-eyebrow">
            <span className="mwc-explore-line mwc-explore-line--left" />
            EXPLORE OUR SHOWCASE
            <span className="mwc-explore-line mwc-explore-line--right" />
          </div>
          <h1 className="mwc-explore-title">
            What would you like to <span className="mwc-explore-title-highlight">explore?</span>
          </h1>
          <p className="mwc-explore-subtitle">
            Choose a path to discover TENBEL's solutions, real-world applications and the technologies powering a more connected world.
          </p>
        </motion.div>

        <div className="mwc-explore-cards">
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
            onClick={onProducts}
            className="mwc-explore-card mwc-explore-card--products"
          >
            <div className="mwc-explore-card-bg" style={{ backgroundImage: 'url(/mwc-commsbox.jpg)' }} />
            <div className="mwc-explore-card-overlay" />
            
            <div className="mwc-explore-card-inner">
              <div className="mwc-explore-card-top">
                <span className="mwc-explore-card-num">01 / 02</span>
              </div>
              
              <div className="mwc-explore-card-main">
                <div className="mwc-explore-card-icon-wrap">
                  <Layers size={28} />
                </div>
                <h3>Our Products</h3>
                <p>Explore our 5 product lines — OffGrid, CommsBox, Railway, Enterprise IoT & Remote Connectivity.</p>
                
                <div className="mwc-explore-chips">
                  <span><Hexagon size={12} /> Rugged Hardware</span>
                  <span><Hexagon size={12} /> Scalable Solutions</span>
                  <span><Hexagon size={12} /> Mesh Networking</span>
                  <span><Hexagon size={12} /> Global Connectivity</span>
                </div>
              </div>

              <div className="mwc-explore-card-bottom">
                <span className="mwc-explore-cta">Browse Products <ArrowRight size={16} /></span>
              </div>
            </div>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
            onClick={onUseCases}
            className="mwc-explore-card mwc-explore-card--usecases"
          >
            <div className="mwc-explore-card-bg" style={{ backgroundImage: 'url(/mwc-disaster.jpg)' }} />
            <div className="mwc-explore-card-overlay mwc-explore-card-overlay--alt" />
            
            <div className="mwc-explore-card-inner">
              <div className="mwc-explore-card-top">
                <span className="mwc-explore-card-num">02 / 02</span>
              </div>
              
              <div className="mwc-explore-card-main">
                <div className="mwc-explore-card-icon-wrap mwc-explore-card-icon-wrap--alt">
                  <Eye size={28} />
                </div>
                <h3>Use Cases</h3>
                <p>See real-world applications — Disaster Relief, Railways, Agriculture, Smart Factory & more.</p>
                
                <div className="mwc-explore-chips">
                  <span><Hexagon size={12} /> Industry Applications</span>
                  <span><Hexagon size={12} /> Critical Infrastructure</span>
                  <span><Hexagon size={12} /> Remote Communities</span>
                  <span><Hexagon size={12} /> Smart Environments</span>
                </div>
              </div>

              <div className="mwc-explore-card-bottom">
                <span className="mwc-explore-cta mwc-explore-cta--alt">View Use Cases <ArrowRight size={16} /></span>
              </div>
            </div>
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mwc-explore-indicator"
        >
          SELECT A PATH
          <ChevronDown size={14} className="mwc-explore-indicator-arrow" />
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─── PRODUCTS OVERVIEW ──────────────────────────────────────────── */
function ProductsOverview({ onBack, onSelect, onNavigateToUseCases }: { onBack: () => void; onSelect: (i: number) => void; onNavigateToUseCases: () => void }) {
  const featureTags: Record<string, string[]> = {
    'offgrid': ['Satellite Ready', 'Rugged', 'Mesh Networking'],
    'commsbox': ['Rapid Deployment', 'Portable', 'Mission Critical'],
    'railway': ['Rail Networks', 'Stations', 'Trackside'],
    'enterprise': ['Industrial IoT', 'Campus Networks', 'Scalable'],
    'remote': ['Remote Uplinks', 'Multi-site', 'Island Connectivity']
  };

  return (
    <motion.div
      className="mwc-screen mwc-portfolio-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mwc-portfolio-bg">
        <div className="mwc-portfolio-bg-image" style={{ backgroundImage: 'url(/mwc-home-bg.jpg)' }} />
        <div className="mwc-portfolio-bg-overlay" />
        <ParticleBackground />
      </div>

      <div className="mwc-portfolio-header">
        <button onClick={onBack} className="mwc-portfolio-btn mwc-portfolio-btn--back">
          <ArrowLeft size={16} /> Back
        </button>
        <img src="/logo-new.png" alt="Tenbel" className="mwc-portfolio-logo" />
        <button onClick={onNavigateToUseCases} className="mwc-portfolio-btn mwc-portfolio-btn--next">
          USE CASES <ArrowRight size={16} />
        </button>
      </div>

      <div className="mwc-portfolio-content">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="mwc-portfolio-intro"
        >
          <div className="mwc-portfolio-eyebrow">
            PRODUCT PORTFOLIO
          </div>
          <h2 className="mwc-portfolio-title">
            Our <span className="mwc-portfolio-title-highlight">Product Lines</span>
          </h2>
          <p className="mwc-portfolio-subtitle">
            Rugged, reliable and easy-to-deploy solutions designed to keep people, devices and operations connected — anywhere, anytime.
          </p>
          <div className="mwc-portfolio-metadata">
            05 PRODUCT LINES <span className="mwc-portfolio-sep">|</span> MISSION-READY <span className="mwc-portfolio-sep">|</span> CONNECTED ANYWHERE
          </div>
        </motion.div>

        <div className="mwc-portfolio-grid">
          {products.map((p, i) => {
            const Icon = p.icon;
            const tags = featureTags[p.id] || [];
            return (
              <motion.button
                key={p.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 + i * 0.06 }}
                onClick={() => onSelect(i)}
                className="mwc-portfolio-card"
                style={{ '--accent': p.color } as React.CSSProperties}
              >
                <div className="mwc-portfolio-card-img" style={{ backgroundImage: `url(${p.image})` }}>
                  <div className="mwc-portfolio-card-gradient" />
                  <span className="mwc-portfolio-card-num">0{i + 1} / 05</span>
                </div>
                
                <div className="mwc-portfolio-card-body">
                  <div className="mwc-portfolio-card-header">
                    <div className="mwc-portfolio-card-icon" style={{ background: `${p.color}25`, borderColor: `${p.color}50`, color: p.color }}>
                      <Icon size={24} />
                    </div>
                    <h3>{p.title}</h3>
                    <p>{p.tagline}</p>
                  </div>
                  
                  <div className="mwc-portfolio-card-tags">
                    {tags.map((t, j) => (
                      <span key={j}>{t}</span>
                    ))}
                  </div>

                  <div className="mwc-portfolio-card-footer">
                    <span className="mwc-portfolio-card-cta" style={{ color: p.color }}>
                      Explore <ArrowRight size={16} className="mwc-portfolio-card-arrow" />
                    </span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mwc-portfolio-progress"
        >
          <div className="mwc-portfolio-progress-text">01 / 05</div>
          <div className="mwc-portfolio-progress-bar">
            <div className="mwc-portfolio-progress-fill" />
          </div>
          <div className="mwc-portfolio-progress-text">EXPLORE PRODUCT LINES</div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─── USE CASES OVERVIEW ──────────────────────────────────────────── */

function UseCasesOverview({ onBack, onSelect, onNavigateToProducts }: { onBack: () => void; onSelect: (i: number) => void; onNavigateToProducts: () => void }) {
  const relatedProductsTags: Record<string, string[]> = {
    'disaster': ['OffGrid', 'Emergency Communications BoX'],
    'hiking': ['OffGrid', 'Satellite', 'Rugged Devices'],
    'railway': ['Railway Solutions', 'Enterprise IoT'],
    'agriculture': ['Enterprise IoT'],
    'smart-cities': ['Enterprise IoT', 'Mesh Networking'],
    'industrial': ['Enterprise IoT', 'Railway Solutions']
  };

  return (
    <motion.div
      className="mwc-screen mwc-portfolio-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mwc-portfolio-bg">
        <div className="mwc-portfolio-bg-image" style={{ backgroundImage: 'url(/mwc-home-bg.jpg)' }} />
        <div className="mwc-portfolio-bg-overlay mwc-portfolio-bg-overlay--alt" />
        <ParticleBackground />
      </div>

      <div className="mwc-portfolio-header">
        <button onClick={onBack} className="mwc-portfolio-btn mwc-portfolio-btn--back">
          <ArrowLeft size={16} /> Back
        </button>
        <img src="/logo-new.png" alt="Tenbel" className="mwc-portfolio-logo" />
        <button onClick={onNavigateToProducts} className="mwc-portfolio-btn mwc-portfolio-btn--next mwc-portfolio-btn--next-alt">
          PRODUCTS <ArrowRight size={16} />
        </button>
      </div>

      <div className="mwc-portfolio-content">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="mwc-portfolio-intro"
        >
          <div className="mwc-portfolio-eyebrow mwc-portfolio-eyebrow--alt">
            REAL-WORLD APPLICATIONS
          </div>
          <h2 className="mwc-portfolio-title">
            Use <span className="mwc-portfolio-title-highlight mwc-portfolio-title-highlight--alt">Cases</span>
          </h2>
          <p className="mwc-portfolio-subtitle">
            See how TENBEL products transform industries and communities with reliable connectivity where it matters most.
          </p>
          <div className="mwc-portfolio-metadata">
            06 APPLICATION AREAS <span className="mwc-portfolio-sep">|</span> REMOTE + CRITICAL <span className="mwc-portfolio-sep">|</span> ALWAYS CONNECTED
          </div>
        </motion.div>

        <div className="mwc-portfolio-grid mwc-portfolio-grid--usecases">
          {useCases.map((uc, i) => {
            const Icon = uc.icon;
            const tags = relatedProductsTags[uc.id] || uc.products || [];
            const row = Math.floor(i / 3);
            const col = i % 3;
            const delay = 0.1 + (row * 0.15) + (col * 0.06);

            return (
              <motion.button
                key={uc.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
                onClick={() => onSelect(i)}
                className="mwc-portfolio-card mwc-portfolio-card--usecase"
                style={{ '--accent': uc.color } as React.CSSProperties}
              >
                <div className="mwc-portfolio-card-img" style={{ backgroundImage: `url(${uc.image})` }}>
                  <div className="mwc-portfolio-card-gradient" />
                  <span className="mwc-portfolio-card-num">0{i + 1} / 06</span>
                  
                  <div className="mwc-portfolio-card-badge" style={{ background: `${uc.color}30`, borderColor: `${uc.color}50`, color: uc.color }}>
                    <Icon size={14} /> {uc.title.toUpperCase()}
                  </div>
                </div>
                
                <div className="mwc-portfolio-card-body">
                  <div className="mwc-portfolio-card-header">
                    <h3>{uc.title}</h3>
                    <p>{uc.tagline}</p>
                  </div>
                  
                  <div className="mwc-portfolio-card-tags">
                    {tags.map((t, j) => (
                      <span key={j}>{t}</span>
                    ))}
                  </div>

                  <div className="mwc-portfolio-card-footer">
                    <div className="mwc-portfolio-card-arrow-btn" style={{ borderColor: `${uc.color}50`, color: uc.color }}>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mwc-portfolio-progress mwc-portfolio-progress--alt"
        >
          <div className="mwc-portfolio-progress-text">01 / 06</div>
          <div className="mwc-portfolio-progress-bar">
            <div className="mwc-portfolio-progress-fill mwc-portfolio-progress-fill--alt" />
          </div>
          <div className="mwc-portfolio-progress-text">EXPLORE REAL-WORLD APPLICATIONS</div>
        </motion.div>
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
  const [storyStep, setStoryStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsPlaying(true);
  }, [videoIndex, storyStep]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

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

      {/* Conditional Hero: Story Mode OR Standard Video Mode */}
      {product.story && product.story.length > 0 ? (
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
              {product.story[storyStep].type === 'video' ? (
                <>
                  <video 
                    ref={videoRef}
                    className="mwc-story-media" 
                    autoPlay 
                    muted={isMuted} 
                    playsInline
                    onClick={togglePlay}
                    style={{ cursor: 'pointer' }}
                    onEnded={() => setStoryStep(s => (s + 1) % product.story.length)}
                  >
                    <source src={product.story[storyStep].media} type="video/mp4" />
                  </video>
                  
                  {!isPlaying && (
                    <div className="mwc-story-play-overlay" onClick={togglePlay}>
                      <Play size={64} fill="white" color="white" opacity={0.8} />
                    </div>
                  )}

                  <button className="mwc-sound-btn mwc-sound-btn--story" onClick={() => setIsMuted(!isMuted)}>
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                </>
              ) : (
                <div className="mwc-story-animation-wrap">
                  {/* Animation components if needed */}
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
                <h2 className="mwc-story-title">{product.story[storyStep].title}</h2>
                <p className="mwc-story-desc">{product.story[storyStep].text}</p>
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
                {product.story.map((_: any, i: number) => (
                  <div 
                    key={i} 
                    className={`mwc-story-dot ${i === storyStep ? 'active' : ''}`}
                    onClick={() => setStoryStep(i)}
                    style={{ backgroundColor: i === storyStep ? product.color : 'rgba(255,255,255,0.3)' }}
                  />
                ))}
              </div>
              <button 
                className={`mwc-story-nav-btn ${storyStep === product.story.length - 1 ? 'disabled' : ''}`}
                onClick={() => setStoryStep(s => Math.min(product.story.length - 1, s + 1))}
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
          className="mwc-detail-hero"
        >
          {product.videos && product.videos.length > 0 ? (
            <>
              <video 
                ref={videoRef}
                key={product.videos[videoIndex]} 
                className="mwc-detail-hero-img" 
                autoPlay 
                loop 
                muted={isMuted} 
                playsInline
                onClick={togglePlay}
                style={{ cursor: 'pointer' }}
              >
                <source src={product.videos[videoIndex]} type="video/mp4" />
              </video>
              
              {!isPlaying && (
                <div className="mwc-story-play-overlay" onClick={togglePlay}>
                  <Play size={64} fill="white" color="white" opacity={0.8} />
                </div>
              )}

              <button className="mwc-sound-btn" onClick={() => setIsMuted(!isMuted)}>
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              {product.videos.length > 1 && (
                <div className="mwc-video-stepper">
                  {product.videos.map((_: string, i: number) => (
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
      )}

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
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsPlaying(true);
  }, [storyStep]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };



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
                    ref={videoRef}
                    className="mwc-story-media" 
                    autoPlay 
                    muted={isMuted} 
                    playsInline
                    onClick={togglePlay}
                    style={{ cursor: 'pointer' }}
                    onEnded={() => setStoryStep(s => (s + 1) % useCase.story.length)}
                  >
                    <source src={useCase.story[storyStep].media} type="video/mp4" />
                  </video>
                  
                  {!isPlaying && (
                    <div className="mwc-story-play-overlay" onClick={togglePlay}>
                      <Play size={64} fill="white" color="white" opacity={0.8} />
                    </div>
                  )}

                  <button className="mwc-sound-btn mwc-sound-btn--story" onClick={() => setIsMuted(!isMuted)}>
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
              <video 
                ref={videoRef}
                key={useCase.videos[videoIndex]} 
                className="mwc-detail-hero-img" 
                autoPlay 
                loop 
                muted={isMuted} 
                playsInline
                onClick={togglePlay}
                style={{ cursor: 'pointer' }}
              >
                <source src={useCase.videos[videoIndex]} type="video/mp4" />
              </video>
              
              {!isPlaying && (
                <div className="mwc-story-play-overlay" onClick={togglePlay}>
                  <Play size={64} fill="white" color="white" opacity={0.8} />
                </div>
              )}

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

/* ── Hero Showcase Experience ─────────────────────────── */
.mwc-hero-wrapper {
  position: relative;
  width: 100%;
  height: 100svh;
  min-height: 680px;
  max-height: none;
  display: flex;
  flex-direction: column;
}

.mwc-hero-video-container {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

.mwc-hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  opacity: 0;
  transition: opacity 1.2s ease-in-out;
}

.mwc-hero-video--active {
  opacity: 1;
}

.mwc-hero-overlay-1 {
  position: absolute;
  inset: 0;
  background: rgba(3, 8, 25, 0.25);
  z-index: 1;
}

.mwc-hero-overlay-2 {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, transparent 0%, rgba(5, 11, 28, 0.25) 100%);
  z-index: 2;
}

.mwc-hero-overlay-3 {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(3,8,25,0.15) 0%, rgba(3,8,25,0.10) 45%, rgba(3,8,25,0.60) 100%);
  z-index: 3;
}

.mwc-hero-content-wrapper {
  position: relative;
  z-index: 10;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 42px 32px 32px 32px;
}

.mwc-hero-top {
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
}

.mwc-hero-logo {
  height: auto;
  width: 130px;
}

.mwc-hero-skip {
  position: absolute;
  top: -14px;
  right: 0;
  display: flex;
  align-items: center;
  background: rgba(8, 18, 40, 0.4);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 999px;
  color: #F7F9FF;
  font-size: 13px;
  font-weight: 500;
  padding: 8px 16px;
  cursor: pointer;
  backdrop-filter: blur(8px);
  transition: all 0.25s ease;
}

.mwc-hero-skip:hover {
  background: rgba(255,255,255,0.1);
  border-color: rgba(255,255,255,0.3);
}

.mwc-hero-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: -4vh;
}

.mwc-hero-eyebrow {
  color: #19C6C8;
  font-size: 12px;
  letter-spacing: 5px;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 24px;
}

.mwc-hero-headline {
  color: #F7F9FF;
  font-size: clamp(40px, 5.5vw, 72px);
  font-weight: 800;
  line-height: 1.02;
  letter-spacing: -1.5px;
  margin: 0 0 20px 0;
}

.mwc-hero-highlight {
  background: linear-gradient(90deg, #19D3FF, #7A4DFF, #FF19D4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.mwc-hero-description {
  color: rgba(255, 255, 255, 0.78);
  font-size: clamp(16px, 1.5vw, 19px);
  font-weight: 400;
  letter-spacing: 0.5px;
  margin: 0 0 40px 0;
}

.mwc-hero-stats-panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 620px;
  height: 115px;
  background: rgba(8, 18, 40, 0.68);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.14);
  border-radius: 24px;
  box-shadow: 0 20px 80px rgba(0,0,0,0.35);
  padding: 0 40px;
  margin-bottom: 40px;
}

.mwc-hero-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.mwc-hero-stat-val {
  color: #fff;
  font-size: 28px;
  font-weight: 700;
}

.mwc-hero-stat-lbl {
  color: #94a3b8;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  white-space: nowrap;
}

.mwc-hero-stat-div {
  width: 1px;
  height: 40px;
  background: rgba(255,255,255,0.1);
}

.mwc-hero-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 290px;
  height: 64px;
  background: linear-gradient(100deg, #18C9D4, #11A9D8);
  border: none;
  border-radius: 999px;
  color: #fff;
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 12px 40px rgba(20, 210, 220, 0.28);
  transition: all 0.3s ease;
}

.mwc-hero-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 45px rgba(20, 210, 220, 0.4);
}

.mwc-hero-cta:hover .mwc-hero-cta-arrow {
  transform: translateX(4px);
}

.mwc-hero-cta-arrow {
  transition: transform 0.3s ease;
}

.mwc-hero-bottom {
  display: flex;
  justify-content: center;
}

.mwc-hero-indicator {
  display: flex;
  align-items: center;
  gap: 16px;
}

.mwc-hero-indicator-text {
  color: rgba(255,255,255,0.8);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1px;
}

.mwc-hero-indicator-line {
  width: 40px;
  height: 1px;
  background: rgba(255,255,255,0.3);
}

.mwc-hero-dots-container {
  display: flex;
  gap: 10px;
}

.mwc-hero-dot-new {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 1px solid transparent;
  background: rgba(255,255,255,0.3);
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.mwc-hero-dot-new.active {
  background: #19D3FF;
  box-shadow: 0 0 10px rgba(25, 211, 255, 0.5);
}

@media (max-width: 768px) {
  .mwc-hero-content-wrapper {
    padding: 20px 16px;
  }
  .mwc-hero-top {
    justify-content: center;
  }
  .mwc-hero-skip {
    top: -4px;
    right: 0;
  }
  .mwc-hero-stats-panel {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    height: auto;
    gap: 20px;
    padding: 24px;
    border-radius: 20px;
  }
  .mwc-hero-stat-div {
    display: none;
  }
  .mwc-hero-cta {
    width: 100%;
    max-width: 300px;
  }
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
/* ── EXPLORE SHOWCASE (CHOOSE SCREEN) ────────────────────────────────────────────── */

.mwc-explore-screen {
  background: #030816;
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100svh;
  overflow: hidden;
  padding: 0;
}

.mwc-explore-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.mwc-explore-bg-image {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0.15;
  filter: saturate(0.8) contrast(1.1);
}

.mwc-explore-bg-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 30% 50%, rgba(0, 190, 255, 0.08), transparent 45%),
              radial-gradient(circle at 70% 50%, rgba(190, 0, 255, 0.06), transparent 45%),
              radial-gradient(circle at 50% 50%, transparent 0%, #030816 100%),
              linear-gradient(to bottom, transparent 60%, #030816 100%);
}

.mwc-explore-nav {
  position: absolute;
  top: 28px;
  left: 28px;
  z-index: 20;
}

.mwc-explore-back-btn {
  background: rgba(10,20,40,0.55);
  border: 1px solid rgba(255,255,255,0.14);
  backdrop-filter: blur(14px);
  border-radius: 999px;
  height: 44px;
  padding: 0 20px;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.mwc-explore-back-btn:hover {
  background: rgba(255,255,255,0.08);
  border-color: rgba(255,255,255,0.25);
  box-shadow: 0 0 15px rgba(255,255,255,0.05);
}

.mwc-explore-back-btn:hover svg {
  transform: translateX(-3px);
}

.mwc-explore-content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  flex: 1;
  padding: 65px 24px 30px;
}

.mwc-explore-logo-wrap {
  margin-bottom: 30px;
}

.mwc-explore-logo {
  width: 140px;
  height: auto;
  filter: drop-shadow(0 0 8px rgba(0, 190, 255, 0.3));
}

.mwc-explore-header {
  text-align: center;
  margin-bottom: 45px;
}

.mwc-explore-eyebrow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 4px;
  color: #00d2ff;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.mwc-explore-line {
  height: 1px;
  width: 32px;
}
.mwc-explore-line--left { background: linear-gradient(90deg, transparent, #00d2ff); }
.mwc-explore-line--right { background: linear-gradient(270deg, transparent, #b400ff); }

.mwc-explore-title {
  font-size: clamp(32px, 4.5vw, 62px);
  font-weight: 800;
  color: #fff;
  line-height: 1.05;
  letter-spacing: -1.5px;
  margin: 0 0 16px 0;
}

.mwc-explore-title-highlight {
  background: linear-gradient(90deg, #19D3FF, #7A4DFF, #FF19D4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.mwc-explore-subtitle {
  font-size: clamp(15px, 1.5vw, 18px);
  color: rgba(220,230,245,0.7);
  max-width: 650px;
  margin: 0 auto;
  line-height: 1.6;
}

.mwc-explore-cards {
  display: flex;
  gap: 32px;
  width: 100%;
  justify-content: center;
}

.mwc-explore-card {
  width: 530px;
  height: 380px;
  border-radius: 24px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(10,20,40,0.55);
  backdrop-filter: blur(12px);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  padding: 0;
  display: flex;
  flex-direction: column;
  transition: all 400ms cubic-bezier(0.22, 1, 0.36, 1);
  text-align: left;
}

.mwc-explore-card-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  z-index: 0;
  transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
}

.mwc-explore-card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(3,8,20,0.05) 0%, rgba(3,8,20,0.4) 40%, rgba(3,8,20,0.98) 100%);
  z-index: 1;
  transition: background 400ms ease;
}

.mwc-explore-card-inner {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 32px;
}

.mwc-explore-card-top {
  display: flex;
  justify-content: flex-end;
}

.mwc-explore-card-num {
  font-size: 11px;
  letter-spacing: 2px;
  color: rgba(255,255,255,0.55);
  font-weight: 600;
}

.mwc-explore-card-main {
  margin-top: auto;
  margin-bottom: 24px;
}

.mwc-explore-card-icon-wrap {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: rgba(0, 210, 255, 0.1);
  border: 1px solid rgba(0, 210, 255, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00d2ff;
  margin-bottom: 20px;
  transition: all 400ms ease;
}
.mwc-explore-card-icon-wrap--alt {
  background: rgba(180, 0, 255, 0.1);
  border-color: rgba(180, 0, 255, 0.25);
  color: #b400ff;
}

.mwc-explore-card h3 {
  font-size: 28px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 10px 0;
}

.mwc-explore-card p {
  font-size: 14px;
  color: rgba(255,255,255,0.7);
  line-height: 1.5;
  margin: 0 0 20px 0;
  max-width: 90%;
}

.mwc-explore-chips {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.mwc-explore-chips span {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: rgba(255,255,255,0.55);
  transition: color 300ms ease;
}

.mwc-explore-card-bottom {
  display: flex;
}

.mwc-explore-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(0, 210, 255, 0.15);
  color: #00d2ff;
  padding: 10px 20px;
  border-radius: 99px;
  font-size: 14px;
  font-weight: 600;
  transition: all 400ms cubic-bezier(0.22, 1, 0.36, 1);
  border: 1px solid rgba(0, 210, 255, 0.1);
}
.mwc-explore-cta--alt {
  background: rgba(180, 0, 255, 0.15);
  color: #f472b6;
  border-color: rgba(180, 0, 255, 0.1);
}

.mwc-explore-card:hover {
  transform: translateY(-6px);
  border-color: rgba(0, 210, 255, 0.4);
  box-shadow: 0 20px 50px rgba(0,0,0,0.5), 0 0 40px rgba(0, 210, 255, 0.15);
}
.mwc-explore-card--usecases:hover {
  border-color: rgba(180, 0, 255, 0.4);
  box-shadow: 0 20px 50px rgba(0,0,0,0.5), 0 0 40px rgba(180, 0, 255, 0.15);
}

.mwc-explore-card:hover .mwc-explore-card-bg {
  transform: scale(1.05);
}

.mwc-explore-card:hover .mwc-explore-cta {
  background: rgba(0, 210, 255, 0.25);
}
.mwc-explore-card--usecases:hover .mwc-explore-cta--alt {
  background: rgba(180, 0, 255, 0.25);
}

.mwc-explore-card:hover .mwc-explore-cta svg {
  transform: translateX(4px);
}

.mwc-explore-card:hover .mwc-explore-chips span {
  color: rgba(255,255,255,0.85);
}
.mwc-explore-card:hover .mwc-explore-chips span svg {
  color: #00d2ff;
}
.mwc-explore-card--usecases:hover .mwc-explore-chips span svg {
  color: #b400ff;
}

.mwc-explore-indicator {
  margin-top: auto;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 2px;
  color: rgba(255,255,255,0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.mwc-explore-indicator-arrow {
  animation: bounce-subtle 2s infinite ease-in-out;
}

@keyframes bounce-subtle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(4px); }
}

@media (max-width: 900px) {
  .mwc-explore-cards {
    flex-direction: column;
    align-items: center;
  }
  .mwc-explore-card {
    width: 100%;
    max-width: 450px;
    height: 340px;
  }
  .mwc-explore-nav {
    top: 16px;
    left: 16px;
  }
  .mwc-explore-content {
    padding-top: 80px;
  }
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

/* ── Cinematic Showcase Carousels ────────────────────────────── */

.mwc-showcase-section {
  width: 100%;
  padding: 80px 0 120px 0;
  position: relative;
  background: radial-gradient(circle at 20% 20%, rgba(0, 160, 255, 0.05), transparent 35%),
              radial-gradient(circle at 80% 70%, rgba(180, 0, 255, 0.05), transparent 35%);
  display: flex;
  flex-direction: column;
  z-index: 10;
}

.mwc-slider-container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.mwc-slider-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 40px;
  margin-bottom: 32px;
}

.mwc-slider-header-left {
  max-width: 600px;
}

.mwc-slider-eyebrow {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  color: #94a3b8;
  margin-bottom: 12px;
}

.mwc-slider-eyebrow-line {
  width: 24px;
  height: 2px;
  background: #06b6d4;
}

.mwc-slider-title {
  font-size: clamp(28px, 3.5vw, 42px);
  font-weight: 700;
  color: #fff;
  line-height: 1.1;
  margin: 0;
}

.mwc-slider-title-highlight {
  background: linear-gradient(90deg, #19D3FF, #7A4DFF, #FF19D4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.mwc-slider-title-highlight-alt {
  color: #E8307A;
}

.mwc-slider-header-right {
  max-width: 320px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
}

.mwc-slider-header-right p {
  color: rgba(255,255,255,0.7);
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
}

.mwc-slider-nav {
  display: flex;
  gap: 12px;
}

.mwc-slider-nav-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.15);
  background: rgba(255,255,255,0.03);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
  padding: 0;
}

.mwc-slider-nav-btn:hover {
  background: rgba(255,255,255,0.1);
  border-color: rgba(255,255,255,0.3);
}

.mwc-slider-track-wrapper {
  width: 100%;
  overflow: hidden;
  position: relative;
  -webkit-mask-image: linear-gradient(to right, transparent, black 3%, black 97%, transparent);
  mask-image: linear-gradient(to right, transparent, black 3%, black 97%, transparent);
}

.mwc-slider-track {
  display: flex;
  width: max-content;
  padding: 10px 40px;
}

.mwc-slider-track--products {
  animation: scroll-left-to-right 40s linear infinite;
}

.mwc-slider-track--usecases {
  animation: scroll-right-to-left 40s linear infinite;
}

.mwc-slider-track:hover {
  animation-play-state: paused;
}

@keyframes scroll-left-to-right {
  0% { transform: translate3d(-50%, 0, 0); }
  100% { transform: translate3d(0, 0, 0); }
}

@keyframes scroll-right-to-left {
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(-50%, 0, 0); }
}

.mwc-showcase-card {
  width: 320px;
  height: 260px;
  border-radius: 20px;
  margin-right: 24px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow: 0 10px 30px rgba(0,0,0,0.4);
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  background: #0a1122;
  display: flex;
  flex-direction: column;
}

.mwc-showcase-card:hover {
  transform: translateY(-5px) scale(1.02);
  border-color: var(--accent);
  box-shadow: 0 15px 40px rgba(0,0,0,0.6), 0 0 20px rgba(0,0,0, 0.2);
  z-index: 20;
}

.mwc-showcase-card-img-wrap {
  width: 100%;
  height: 55%;
  position: relative;
  overflow: hidden;
}

.mwc-showcase-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.mwc-showcase-card:hover .mwc-showcase-card-img {
  transform: scale(1.06);
}

.mwc-showcase-card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 0%, #0a1122 100%);
}

.mwc-showcase-card-content {
  padding: 0 20px 20px 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  background: #0a1122;
}

.mwc-showcase-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: -15px;
  margin-bottom: 12px;
  position: relative;
  z-index: 2;
}

.mwc-showcase-card-num {
  font-size: 11px;
  font-weight: 600;
  color: rgba(255,255,255,0.4);
  letter-spacing: 1px;
}

.mwc-showcase-card-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0,0,0,0.4);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255,255,255,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.mwc-showcase-card-title {
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 6px 0;
}

.mwc-showcase-card-desc {
  font-size: 12px;
  color: rgba(255,255,255,0.6);
  line-height: 1.4;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.mwc-showcase-card-arrow {
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
  transition: all 0.3s ease;
  padding: 0;
}

.mwc-showcase-card:hover .mwc-showcase-card-arrow {
  opacity: 1;
  transform: translateX(3px);
  background: rgba(255,255,255,0.05);
}

.mwc-slider-progress-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  margin-top: 16px;
}

.mwc-slider-progress-bar {
  flex: 1;
  height: 2px;
  background: rgba(255,255,255,0.1);
  margin-right: 24px;
  position: relative;
  overflow: hidden;
}

.mwc-slider-progress-fill {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 20%;
  border-radius: 2px;
}

.mwc-slider-progress-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.mwc-slider-auto-label {
  font-size: 11px;
  color: rgba(255,255,255,0.4);
  display: flex;
  align-items: center;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.mwc-slider-count {
  font-size: 13px;
  font-weight: 600;
  color: rgba(255,255,255,0.7);
  letter-spacing: 1px;
}

@media (max-width: 768px) {
  .mwc-slider-header {
    flex-direction: column;
    align-items: flex-start;
    padding: 0 20px;
  }
  .mwc-slider-header-right {
    margin-top: 20px;
  }
  .mwc-slider-track-wrapper {
    -webkit-mask-image: none;
    mask-image: none;
  }
  .mwc-slider-progress-wrap {
    padding: 0 20px;
  }
  .mwc-showcase-card {
    width: 290px;
  }
  .mwc-slider-track--products {
    animation: scroll-left-to-right 55s linear infinite;
  }
  .mwc-slider-track--usecases {
    animation: scroll-right-to-left 55s linear infinite;
  }
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

/* ── PORTFOLIO & USE CASES REDESIGN ─────────────────────────────────────────── */

.mwc-portfolio-screen {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100svh;
  background: #030816;
  overflow-y: auto;
  overflow-x: hidden;
}

.mwc-portfolio-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
}

.mwc-portfolio-bg-image {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0.12;
  filter: saturate(0.8) contrast(1.1);
}

.mwc-portfolio-bg-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 0%, rgba(20, 184, 166, 0.05), transparent 40%),
              radial-gradient(circle at 100% 50%, rgba(122, 77, 255, 0.05), transparent 50%),
              linear-gradient(to bottom, transparent 30%, #030816 80%, #030816 100%);
}

.mwc-portfolio-bg-overlay--alt {
  background: radial-gradient(circle at 50% 0%, rgba(255, 25, 212, 0.05), transparent 40%),
              radial-gradient(circle at 100% 50%, rgba(25, 198, 200, 0.05), transparent 50%),
              linear-gradient(to bottom, transparent 30%, #030816 80%, #030816 100%);
}

.mwc-portfolio-header {
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  padding: 0 40px;
  background: rgba(3, 8, 20, 0.72);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.mwc-portfolio-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  height: 40px;
  padding: 0 20px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 300ms ease;
}

.mwc-portfolio-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
}

.mwc-portfolio-btn--next {
  color: #19D3FF;
  border-color: rgba(25, 211, 255, 0.2);
}
.mwc-portfolio-btn--next:hover {
  background: rgba(25, 211, 255, 0.1);
  border-color: rgba(25, 211, 255, 0.4);
}
.mwc-portfolio-btn--next-alt {
  color: #FF19D4;
  border-color: rgba(255, 25, 212, 0.2);
}
.mwc-portfolio-btn--next-alt:hover {
  background: rgba(255, 25, 212, 0.1);
  border-color: rgba(255, 25, 212, 0.4);
}

.mwc-portfolio-logo {
  height: 34px;
}

.mwc-portfolio-content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 60px 40px 100px;
}

.mwc-portfolio-intro {
  text-align: center;
  margin-bottom: 60px;
}

.mwc-portfolio-eyebrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 4px;
  color: #19D3FF;
  margin-bottom: 16px;
}
.mwc-portfolio-eyebrow--alt {
  color: #FF19D4;
}

.mwc-portfolio-title {
  font-size: clamp(40px, 4.5vw, 64px);
  font-weight: 800;
  color: #fff;
  letter-spacing: -1.5px;
  margin: 0 0 16px 0;
  line-height: 1.1;
}

.mwc-portfolio-title-highlight {
  background: linear-gradient(90deg, #19D3FF, #7A4DFF, #FF19D4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.mwc-portfolio-title-highlight--alt {
  background: linear-gradient(90deg, #FF19D4, #7A4DFF, #19D3FF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.mwc-portfolio-subtitle {
  font-size: clamp(15px, 1.5vw, 18px);
  color: rgba(220, 230, 245, 0.7);
  max-width: 700px;
  margin: 0 auto 30px;
  line-height: 1.6;
}

.mwc-portfolio-metadata {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.4);
}

.mwc-portfolio-sep {
  color: rgba(255, 255, 255, 0.15);
}

.mwc-portfolio-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
}
.mwc-portfolio-grid--usecases {
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.mwc-portfolio-card {
  display: flex;
  flex-direction: column;
  background: rgba(8, 15, 30, 0.75);
  backdrop-filter: blur(16px);
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  height: 420px;
  cursor: pointer;
  text-align: left;
  padding: 0;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: all 400ms cubic-bezier(0.22, 1, 0.36, 1);
}

.mwc-portfolio-card--usecase {
  height: 380px;
}

.mwc-portfolio-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  border-color: var(--accent, rgba(255, 255, 255, 0.3));
}

.mwc-portfolio-card-img {
  position: relative;
  width: 100%;
  height: 48%;
  background-size: cover;
  background-position: center;
  transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
}
.mwc-portfolio-card--usecase .mwc-portfolio-card-img {
  height: 55%;
}

.mwc-portfolio-card:hover .mwc-portfolio-card-img {
  transform: scale(1.04);
}

.mwc-portfolio-card-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 40%, rgba(3, 8, 20, 0.92) 100%);
  z-index: 1;
}

.mwc-portfolio-card-num {
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.65);
  z-index: 2;
}

.mwc-portfolio-card-badge {
  position: absolute;
  bottom: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1px;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.1);
  z-index: 2;
  transition: all 400ms ease;
}

.mwc-portfolio-card:hover .mwc-portfolio-card-badge {
  box-shadow: 0 0 15px var(--accent, transparent);
}

.mwc-portfolio-card-body {
  position: relative;
  z-index: 2;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: rgba(3, 8, 20, 0.92);
}

.mwc-portfolio-card-header {
  margin-bottom: auto;
}

.mwc-portfolio-card-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  border: 1px solid transparent;
  transition: all 400ms ease;
}

.mwc-portfolio-card:hover .mwc-portfolio-card-icon {
  box-shadow: 0 0 20px var(--accent, transparent);
  transform: scale(1.05);
}

.mwc-portfolio-card-body h3 {
  font-size: 19px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 8px 0;
  line-height: 1.3;
}

.mwc-portfolio-card-body p {
  font-size: 14px;
  color: rgba(180, 195, 220, 0.7);
  margin: 0;
  line-height: 1.5;
}

.mwc-portfolio-card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 16px;
  margin-bottom: 20px;
}

.mwc-portfolio-card-tags span {
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 11px;
  color: rgba(255, 255, 255, 0.6);
}

.mwc-portfolio-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.mwc-portfolio-card-cta {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.mwc-portfolio-card-arrow {
  transition: transform 300ms ease;
}
.mwc-portfolio-card:hover .mwc-portfolio-card-arrow {
  transform: translateX(4px);
}

.mwc-portfolio-card-arrow-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 400ms ease;
  margin-left: auto;
}
.mwc-portfolio-card:hover .mwc-portfolio-card-arrow-btn {
  transform: translateX(4px);
  background: rgba(255, 255, 255, 0.1);
}

.mwc-portfolio-progress {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 60px;
}

.mwc-portfolio-progress-text {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.4);
}

.mwc-portfolio-progress-bar {
  width: 120px;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  position: relative;
}

.mwc-portfolio-progress-fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 20%;
  background: linear-gradient(90deg, #19D3FF, #7A4DFF);
}
.mwc-portfolio-progress-fill--alt {
  width: 16%;
  background: linear-gradient(90deg, #FF19D4, #7A4DFF);
}

@media (max-width: 1280px) {
  .mwc-portfolio-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .mwc-portfolio-grid--usecases {
    grid-template-columns: repeat(2, 1fr);
  }
  .mwc-portfolio-card {
    height: 430px;
  }
}

@media (max-width: 900px) {
  .mwc-portfolio-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .mwc-portfolio-header {
    padding: 0 20px;
  }
  .mwc-portfolio-grid,
  .mwc-portfolio-grid--usecases {
    grid-template-columns: 1fr;
  }
  .mwc-portfolio-card {
    width: 100%;
    max-width: 100%;
    height: 430px;
  }
  .mwc-portfolio-title {
    font-size: 32px;
  }
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

.mwc-story-play-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.3);
  z-index: 12;
  cursor: pointer;
  pointer-events: auto;
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
