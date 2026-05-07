import { useStaggerAnimation } from '../hooks/useScrollAnimation';
import { Train, Wifi, ShieldCheck } from 'lucide-react';

const competencies = [
  {
    icon: Train,
    title: 'Railways & Critical Communications',
    desc: 'Reliable, mission-critical connectivity for the most demanding environments.',
    color: 'rgba(232,48,122,0.15)',
    border: 'rgba(232,48,122,0.2)',
    iconColor: '#E8307A',
  },
  {
    icon: Wifi,
    title: 'IoT & Enterprise Wireless',
    desc: 'Resilient and scalable solutions for connected businesses and smart infrastructure.',
    color: 'rgba(99,102,241,0.15)',
    border: 'rgba(99,102,241,0.2)',
    iconColor: '#6366f1',
  },
  {
    icon: ShieldCheck,
    title: 'Failover & Redundancy',
    desc: 'Smart uptime solutions with trusted hardware — connectivity that never quits.',
    color: 'rgba(168,85,247,0.15)',
    border: 'rgba(168,85,247,0.2)',
    iconColor: '#a855f7',
  },
];

export default function Competencies() {
  const gridRef = useStaggerAnimation('.comp-grid', '.comp-card');

  return (
    <section id="competencies" className="relative z-10 bg-[#0a0b14]">
      <div className="section-inner">
        <span className="section-tag animate-on-scroll">What We Do Best</span>
        <h2 className="section-title animate-on-scroll">Core Competencies</h2>
        <p className="section-desc animate-on-scroll">
          Three pillars of expertise that define every solution we deliver.
        </p>

        <div ref={gridRef} className="comp-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {competencies.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="comp-card card-surface"
              >
                <div
                  className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center mb-5"
                  style={{ background: item.color, border: `1px solid ${item.border}` }}
                >
                  <Icon size={24} style={{ color: item.iconColor }} />
                </div>
                <div className="font-semibold text-base mb-2">{item.title}</div>
                <p className="text-[rgba(240,240,248,0.55)] text-sm leading-[1.65]">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
