import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation';
import {
  Radio,
  Smartphone,
  Wifi,
  Zap,
  Mountain,
  Building2,
  Trees,
  ArrowRight,
  Download,
  CheckCircle2,
} from 'lucide-react';

const keyFeatures = [
  {
    icon: Radio,
    title: 'Sub-GHz LoRa Technology',
    desc: 'Long-range, low-power sub-GHz LoRa radio. Connects via Bluetooth without any internet or cellular network — works entirely off-grid.',
    color: 'rgba(20,184,166,0.08)',
    border: 'rgba(20,184,166,0.15)',
    iconColor: '#14b8a6',
  },
  {
    icon: Smartphone,
    title: 'Bluetooth Connected',
    desc: 'Smartphone connects to the LoRa node via Bluetooth — 1.5 to 2 km direct peer-to-peer range. No SIM, no Wi-Fi, no infrastructure needed.',
    color: 'rgba(99,102,241,0.08)',
    border: 'rgba(99,102,241,0.15)',
    iconColor: '#6366f1',
  },
  {
    icon: Wifi,
    title: 'Multi-Hop Mesh to 12–13 km',
    desc: 'Messages hop through relay nodes in a MeshStatic topology, extending total network range to 12–13 km across any terrain.',
    color: 'rgba(232,48,122,0.08)',
    border: 'rgba(232,48,122,0.15)',
    iconColor: '#E8307A',
  },
  {
    icon: Zap,
    title: '3–4 Week Battery Life',
    desc: 'Ultra-low-power design enables 3 to 4 weeks of field operation on a single charge — ideal for prolonged deployment in remote areas.',
    color: 'rgba(234,179,8,0.08)',
    border: 'rgba(234,179,8,0.15)',
    iconColor: '#eab308',
  },
];

const deploymentModels = [
  {
    icon: Mountain,
    title: 'Army & Defence',
    desc: 'Secure off-grid messaging for army units and defence personnel operating in border areas, forests, and remote terrains.',
    color: '#14b8a6',
  },
  {
    icon: Building2,
    title: 'NDRF, SDRF & Disaster Management',
    desc: 'First responders can communicate during floods, earthquakes, and disaster scenarios where all infrastructure has failed.',
    color: '#6366f1',
  },
  {
    icon: Trees,
    title: 'Emergency & Rural Areas',
    desc: 'MeshStatic network enables communication in forests, mining corridors, remote villages, and industrial sites with zero connectivity.',
    color: '#E8307A',
  },
];

const highlights = [
  'Smartphone first interface — no internet or cellular required',
  '1.5 to 2 km direct stand alone range per node',
  'Mesh hopping extends total range to 12–13 km',
  '3–4 week battery life per device',
];

export default function OffGrid() {
  const sectionRef = useScrollAnimation('.offgrid-animate');
  const gridRef = useStaggerAnimation('.offgrid-feature-grid', '.offgrid-card');

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="offgrid" className="relative z-10 bg-white overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 80% 20%, rgba(20,184,166,0.06) 0%, transparent 60%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 20% 80%, rgba(99,102,241,0.05) 0%, transparent 60%)',
        }}
      />

      <div ref={sectionRef} className="section-inner relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="offgrid-animate section-tag">Off-Grid Product</span>
          <h2 className="offgrid-animate section-title">Tenbel OffGrid</h2>
          <p className="offgrid-animate section-desc">
            Resilient, infrastructure-free messaging powered by sub-GHz LoRa technology. Communicate
            anywhere — without cellular, satellite, or Wi-Fi — using just a smartphone and a compact
            LoRa node.
          </p>
        </div>

        {/* Hero split layout */}
        <div className="offgrid-animate grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left: image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.12)]">
              <img
                src="/offgrid-product.jpg"
                alt="Tenbel OffGrid LoRa device with smartphone in remote mountain terrain"
                className="w-full h-[420px] object-cover"
              />
              {/* Overlay badge */}
              <div className="absolute bottom-5 left-5 bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-lg flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#14b8a6] animate-pulse" />
                <div>
                  <div className="text-[0.72rem] text-[#64748b] font-medium uppercase tracking-wide">
                    Stand Alone Range
                  </div>
                  <div className="text-[1rem] font-bold text-[#1a1a2e]">1.5–2 km</div>
                </div>
                <div className="ml-4 border-l border-[#f1f5f9] pl-4">
                  <div className="text-[0.72rem] text-[#64748b] font-medium uppercase tracking-wide">
                    Mesh Range
                  </div>
                  <div className="text-[1rem] font-bold text-[#1a1a2e]">12–13 km</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: overview + highlights */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[rgba(20,184,166,0.08)] border border-[rgba(20,184,166,0.2)] text-[#14b8a6] text-[0.72rem] font-semibold tracking-[0.08em] uppercase px-3.5 py-2 rounded-full mb-5">
              <Radio size={13} />
              Sub-GHz LoRa Technology
            </div>
            <h3 className="text-[clamp(1.6rem,2.5vw,2rem)] font-bold text-[#1a1a2e] leading-tight mb-4">
              Communicate When Nothing Else Works
            </h3>
            <p className="text-[#64748b] leading-[1.75] mb-6">
              Tenbel OffGrid uses dedicated LoRa Messaging Nodes paired with a familiar smartphone
              app to create a self-contained communication network. Whether in a disaster zone,
              dense forest, or remote industrial corridor — your team stays connected.
            </p>

            <ul className="space-y-2.5 mb-8">
              {highlights.map((h, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-[#475569]">
                  <CheckCircle2 size={17} className="text-[#14b8a6] flex-shrink-0" />
                  {h}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={scrollToContact}
                className="btn-primary text-[0.85rem] px-7 py-3.5"
                style={{
                  background: 'linear-gradient(135deg, #14b8a6 0%, #0891b2 100%)',
                  boxShadow: '0 4px 18px rgba(20,184,166,0.35)',
                }}
              >
                Request a Demo
                <ArrowRight size={16} />
              </button>
              <a
                href="/Tenbel_OffGrid_Technical_Overview.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-[0.85rem] px-7 py-3.5"
              >
                <Download size={16} />
                Technical Overview
              </a>
            </div>
          </div>
        </div>

        {/* Key Features grid */}
        <div className="offgrid-animate mb-16">
          <h3 className="text-center text-[1.15rem] font-bold text-[#1a1a2e] mb-8 tracking-tight">
            How It Works
          </h3>
          <div ref={gridRef} className="offgrid-feature-grid grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {keyFeatures.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="offgrid-card bg-[#f8fafc] border border-[#f1f5f9] rounded-2xl p-6 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
                >
                  <div
                    className="w-[50px] h-[50px] rounded-[14px] flex items-center justify-center mb-4"
                    style={{ background: item.color, border: `1px solid ${item.border}` }}
                  >
                    <Icon size={22} style={{ color: item.iconColor }} />
                  </div>
                  <h4 className="font-semibold text-[#1a1a2e] text-[0.95rem] mb-2">{item.title}</h4>
                  <p className="text-[#64748b] text-sm leading-[1.65]">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Deployment Models */}
        <div className="offgrid-animate bg-[#f8fafc] border border-[#f1f5f9] rounded-3xl p-8 lg:p-10">
          <div className="text-center mb-8">
            <span className="text-[0.75rem] uppercase tracking-[0.1em] text-[#94a3b8] font-semibold">
              RF Deployment Models
            </span>
            <h3 className="text-[1.2rem] font-bold text-[#1a1a2e] mt-2">
              Works in Any Terrain
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {deploymentModels.map((model, i) => {
              const Icon = model.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-[#f1f5f9] p-6 text-center hover:shadow-card-hover transition-all duration-300"
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: `${model.color}18`, border: `1px solid ${model.color}30` }}
                  >
                    <Icon size={22} style={{ color: model.color }} />
                  </div>
                  <h4 className="font-semibold text-[#1a1a2e] mb-2">{model.title}</h4>
                  <p className="text-[#64748b] text-sm leading-[1.65]">{model.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Stats bar */}
          <div className="mt-8 pt-6 border-t border-[#e2e8f0] grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {[
              { value: '2 km', label: 'Stand Alone Range' },
              { value: '12–13 km', label: 'Mesh Range' },
              { value: '3–4 wks', label: 'Battery Life' },
              { value: '0 infra', label: 'Dependency' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-[1.4rem] font-extrabold text-[#1a1a2e] tracking-tight">
                  {stat.value}
                </div>
                <div className="text-[0.72rem] text-[#94a3b8] uppercase tracking-[0.08em] font-medium mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
