import { useStaggerAnimation } from '../hooks/useScrollAnimation';
import { Antenna, Router, Package, Tag, Zap } from 'lucide-react';

const products = [
  {
    icon: Antenna,
    title: 'RF Antennas & Accessories',
    desc: 'Cutting-edge antennas and RF accessories for critical communications, enterprise networks, railways, IoT and private networks.',
    color: 'rgba(232,48,122,0.15)',
    border: 'rgba(232,48,122,0.2)',
    iconColor: '#E8307A',
  },
  {
    icon: Router,
    title: 'Routers & Gateways',
    desc: 'Mission-critical grade IoT and enterprise network connectivity routers from industry-leading partners like Teltonika and Celerway.',
    color: 'rgba(99,102,241,0.15)',
    border: 'rgba(99,102,241,0.2)',
    iconColor: '#6366f1',
  },
  {
    icon: Package,
    title: 'Integrated Critical Communications',
    desc: 'Our Emergency Comms Case and Candy Box — purpose-built integrated communication equipment for when connectivity is non-negotiable.',
    color: 'rgba(168,85,247,0.15)',
    border: 'rgba(168,85,247,0.2)',
    iconColor: '#a855f7',
  },
  {
    icon: Tag,
    title: 'RFID Systems',
    desc: 'RFID readers and tags for industrial automation, IoT, vehicle tracking and medical use cases — configured to your exact needs.',
    color: 'rgba(20,184,166,0.15)',
    border: 'rgba(20,184,166,0.2)',
    iconColor: '#14b8a6',
  },
  {
    icon: Zap,
    title: 'Offgrid Systems',
    desc: 'Reliable, sustainable power and connectivity solutions designed for mission-critical operations in remote and off-grid locations.',
    color: 'rgba(234,179,8,0.15)',
    border: 'rgba(234,179,8,0.2)',
    iconColor: '#eab308',
  },
];

export default function Products() {
  const gridRef = useStaggerAnimation('.products-grid', '.product-card');

  return (
    <section id="products" className="relative z-10 bg-[#0a0b14]">
      <div className="section-inner">
        <span className="section-tag animate-on-scroll">What We Offer</span>
        <h2 className="section-title animate-on-scroll">Our Product Lines</h2>
        <p className="section-desc animate-on-scroll">
          Industry-leading hardware across RF, IoT, critical communications and RFID — sourced from world-class partners.
        </p>

        <div ref={gridRef} className="products-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {products.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="product-card card-surface"
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
