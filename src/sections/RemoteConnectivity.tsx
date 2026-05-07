import { useStaggerAnimation } from '../hooks/useScrollAnimation';
import { Signal, Route, Antenna, LocateFixed, Settings, TrendingUp, Globe2 } from 'lucide-react';

const features = [
  {
    icon: Signal,
    title: '1. The Reality of Connectivity',
    desc: 'Remote sites face sparse coverage, signal variation, physical obstructions, and frequent outages. No single operator is consistently reliable.',
    color: 'rgba(232,48,122,0.15)',
    border: 'rgba(232,48,122,0.2)',
    iconColor: '#E8307A',
  },
  {
    icon: Route,
    title: '2. Multi-SIM Router Strategy',
    desc: 'Deploying enterprise-grade cellular routers with multiple SIMs from trusted partners for operator diversity, automatic failover, and policy-based routing.',
    color: 'rgba(99,102,241,0.15)',
    border: 'rgba(99,102,241,0.2)',
    iconColor: '#6366f1',
  },
  {
    icon: Antenna,
    title: '3. High-Gain Antennas',
    desc: 'Turning weak signals into reliable links using directional, omni-directional, and MIMO-enabled antennas to improve signal strength and quality.',
    color: 'rgba(168,85,247,0.15)',
    border: 'rgba(168,85,247,0.2)',
    iconColor: '#a855f7',
  },
  {
    icon: LocateFixed,
    title: '4. Intelligent Placement',
    desc: 'Applying site-specific placement strategies using area scanning and signal mapping tools to identify optimal mounting locations.',
    color: 'rgba(20,184,166,0.15)',
    border: 'rgba(20,184,166,0.2)',
    iconColor: '#14b8a6',
  },
  {
    icon: Settings,
    title: '5. End-to-End Optimisation',
    desc: 'Continuous monitoring, dynamic SIM prioritization, redundancy planning, and integration with enterprise networks and firewalls.',
    color: 'rgba(234,179,8,0.15)',
    border: 'rgba(234,179,8,0.2)',
    iconColor: '#eab308',
  },
  {
    icon: TrendingUp,
    title: '6. Business Impact & Value',
    desc: 'Achieve reliable connectivity in unserviceable areas, minimize downtime, support digital operations, and reduce dependence on fixed lines.',
    color: 'rgba(239,68,68,0.15)',
    border: 'rgba(239,68,68,0.2)',
    iconColor: '#ef4444',
  },
  {
    icon: Globe2,
    title: '7. Connectivity Anywhere',
    desc: 'Bringing together consulting expertise, RF engineering, and best-in-class technology to deliver solutions that work where others fail.',
    color: 'rgba(59,130,246,0.15)',
    border: 'rgba(59,130,246,0.2)',
    iconColor: '#3b82f6',
  },
];

export default function RemoteConnectivity() {
  const gridRef = useStaggerAnimation('.rc-grid', '.rc-card');

  return (
    <section id="remote-connectivity" className="relative z-10 bg-[#0a0b14] py-20 lg:py-32">
      <div className="section-inner">
        <span className="section-tag animate-on-scroll">Specialized Solutions</span>
        <h2 className="section-title animate-on-scroll">Enhancing Connectivity in Remote Areas</h2>
        <p className="section-desc animate-on-scroll mb-12">
          Tenbel’s Approach Using Multi-SIM Cellular Routers and High-Gain Antennas to deliver resilient, future-ready communications—anywhere.
        </p>

        <div ref={gridRef} className="rc-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
                <h3 className="font-semibold text-lg mb-3 text-white">{item.title}</h3>
                <p className="text-[rgba(240,240,248,0.55)] text-sm leading-[1.65]">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
