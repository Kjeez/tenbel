import { useStaggerAnimation } from '../hooks/useScrollAnimation';
import { Signal, Route, Antenna, LocateFixed, Settings, TrendingUp, ExternalLink } from 'lucide-react';

const features = [
  {
    icon: Signal,
    title: '1. The Reality of Connectivity',
    desc: 'Remote sites face sparse coverage, signal variation, physical obstructions, and frequent outages. No single operator is consistently reliable.',
    color: 'rgba(232,48,122,0.08)',
    border: 'rgba(232,48,122,0.15)',
    iconColor: '#E8307A',
  },
  {
    icon: Route,
    title: '2. Multi-SIM Router Strategy',
    desc: 'Deploying enterprise-grade cellular routers with multiple SIMs from trusted partners for operator diversity, automatic failover, and policy-based routing.',
    color: 'rgba(99,102,241,0.08)',
    border: 'rgba(99,102,241,0.15)',
    iconColor: '#6366f1',
  },
  {
    icon: Antenna,
    title: '3. High-Gain Antennas',
    desc: 'Turning weak signals into reliable links using directional, omni-directional, and MIMO-enabled antennas to improve signal strength and quality.',
    color: 'rgba(168,85,247,0.08)',
    border: 'rgba(168,85,247,0.15)',
    iconColor: '#a855f7',
  },
  {
    icon: LocateFixed,
    title: '4. Intelligent Placement',
    desc: 'Applying site-specific placement strategies using area scanning and signal mapping tools to identify optimal mounting locations.',
    color: 'rgba(20,184,166,0.08)',
    border: 'rgba(20,184,166,0.15)',
    iconColor: '#14b8a6',
  },
  {
    icon: Settings,
    title: '5. End-to-End Optimisation',
    desc: 'Continuous monitoring, dynamic SIM prioritization, redundancy planning, and integration with enterprise networks and firewalls.',
    color: 'rgba(234,179,8,0.08)',
    border: 'rgba(234,179,8,0.15)',
    iconColor: '#eab308',
  },
  {
    icon: TrendingUp,
    title: '6. Business Impact & Value',
    desc: 'Achieve reliable connectivity in unserviceable areas, minimize downtime, support digital operations, and reduce dependence on fixed lines.',
    color: 'rgba(239,68,68,0.08)',
    border: 'rgba(239,68,68,0.15)',
    iconColor: '#ef4444',
  },
];

const antennaSpecs = [
  { label: 'Frequency Range', value: '600 – 6000 MHz' },
  { label: 'Technology', value: '5G / 4G LTE / Wi-Fi 6E / GPS' },
  { label: 'Form Factor', value: 'All-in-One Enclosure' },
  { label: 'Compatibility', value: 'RUTC50 / RUTC42 / RUTC40' },
  { label: 'Rating', value: 'IP67' },
  { label: 'Application', value: 'Outdoor / Mobile / Marine' },
];

export default function RemoteConnectivity() {
  const gridRef = useStaggerAnimation('.rc-grid', '.rc-card');

  return (
    <section id="remote-connectivity" className="relative z-10 bg-[#f8fafc] py-20 lg:py-28">
      <div className="section-inner">
        <span className="section-tag animate-on-scroll">Specialized Solutions</span>
        <h2 className="section-title animate-on-scroll">Enhancing Connectivity in Remote Areas</h2>
        <p className="section-desc animate-on-scroll mb-12">
          Tenbel's Approach Using Multi-SIM Cellular Routers and High-Gain Antennas to deliver resilient, future-ready communications—anywhere.
        </p>

        <div ref={gridRef} className="rc-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-16">
          {features.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="rc-card card-surface p-6 rounded-2xl"
              >
                <div
                  className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center mb-5"
                  style={{ background: item.color, border: `1px solid ${item.border}` }}
                >
                  <Icon size={24} style={{ color: item.iconColor }} />
                </div>
                <h3 className="font-semibold text-lg mb-3 text-[#1a1a2e]">{item.title}</h3>
                <p className="text-[#64748b] text-sm leading-[1.65]">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* QuSpot Featured Product */}
        <div className="bg-white border border-[#f1f5f9] rounded-3xl overflow-hidden shadow-soft">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left: image */}
            <div className="relative bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] flex items-center justify-center p-10 min-h-[300px]">
              <img
                src="/2v2_QuSpot-for-Teltonika-RUTC50_1156-1400.webp"
                alt="QuSpot for Teltonika RUTC50 integrated outdoor antenna"
                className="max-h-[280px] w-auto object-contain drop-shadow-xl"
              />
              <div className="absolute top-5 left-5 inline-flex items-center gap-2 bg-[rgba(99,102,241,0.08)] border border-[rgba(99,102,241,0.2)] text-[#6366f1] text-[0.7rem] font-bold tracking-[0.08em] uppercase px-3 py-1.5 rounded-full">
                Featured Antenna
              </div>
            </div>

            {/* Right: specs */}
            <div className="p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-3">
                <img src="/quwireless.png" alt="QU Wireless" className="h-10 w-auto object-contain" />
              </div>
              <h3 className="text-[1.4rem] font-bold text-[#1a1a2e] leading-tight mb-2">
                QuSpot for Teltonika RUTC50
              </h3>
              <p className="text-[#64748b] text-sm leading-[1.75] mb-6">
                Integrated multi-band LTE & 5G omni antenna + Wi-Fi 6E omni antenna + GPS active antenna — designed to install directly on Teltonika RUTC50/RUTC42/RUTC40 routers in a single IP67 enclosure. Ideal for outdoor wireless connectivity in transportation, yachting, boats, camping, and city centres with high signal density.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {antennaSpecs.map((spec, i) => (
                  <div key={i} className="bg-[#f8fafc] rounded-xl px-4 py-2.5">
                    <div className="text-[0.68rem] text-[#94a3b8] uppercase tracking-[0.08em] font-semibold">{spec.label}</div>
                    <div className="text-[0.88rem] font-semibold text-[#1a1a2e] mt-0.5">{spec.value}</div>
                  </div>
                ))}
              </div>

              <a
                href="https://www.quwireless.com/product/quspot-for-rutc50"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#6366f1] text-white text-[0.82rem] font-semibold px-6 py-3 rounded-full hover:bg-[#4f46e5] transition-colors no-underline"
              >
                View Product
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
