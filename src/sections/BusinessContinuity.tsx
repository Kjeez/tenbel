import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation';
import {
  ShieldCheck,
  Warehouse,
  Store,
  Factory,
  Building2,
  Mountain,
  ArrowRight,
  Wifi,
  RefreshCw,
  Smartphone,
  BarChart3,
  Lock,
  Server,
  Gauge,
  Radio,
  CheckCircle2,
  Phone,
} from 'lucide-react';

const industries = [
  {
    icon: Warehouse,
    title: 'Warehousing & Logistics',
    desc: 'Maintain uninterrupted warehouse operations with reliable connectivity for handheld barcode scanners, warehouse management systems, automated sorting equipment, and cloud-based inventory platforms.',
    color: '#14b8a6',
  },
  {
    icon: Store,
    title: 'Retail & Point of Sale',
    desc: 'Protect your revenue by ensuring payment terminals, POS systems, and transaction processing remain operational during internet outages. Automatic failover eliminates unnecessary downtime.',
    color: '#6366f1',
  },
  {
    icon: Factory,
    title: 'Manufacturing & Industrial',
    desc: 'Keep production environments connected with reliable access to industrial control systems, IoT devices, quality monitoring applications, and remote maintenance platforms.',
    color: '#E8307A',
  },
  {
    icon: Building2,
    title: 'Corporate Offices & Remote Branches',
    desc: 'Enable secure business continuity across distributed locations. Employees maintain uninterrupted access to VPNs, cloud applications, ERP, CRM, Microsoft 365, VoIP, and collaboration tools.',
    color: '#a855f7',
  },
  {
    icon: Mountain,
    title: 'Rural & Remote Locations',
    desc: 'Where fibre connectivity is unavailable or unreliable, our solutions leverage industrial dual-SIM routers, multiple mobile network operators, and high-gain external antennas.',
    color: '#eab308',
  },
];

const enterpriseFeatures = [
  { icon: RefreshCw, label: 'Automatic WAN Failover' },
  { icon: Wifi, label: 'Multi-Carrier Redundancy' },
  { icon: Smartphone, label: 'Dual-SIM & Multi-WAN' },
  { icon: BarChart3, label: 'Network Bonding & Load Balancing' },
  { icon: Lock, label: 'Secure Out-of-Band Management' },
  { icon: Gauge, label: 'Remote Monitoring & Diagnostics' },
  { icon: Server, label: 'VPN & Secure Remote Access' },
  { icon: Radio, label: 'Rugged Hardware for Critical Environments' },
];

const whyChoose = [
  'Mission-critical communications specialists',
  'Globally recognised technology partners',
  'Single branch to nationwide enterprise deployments',
  'Tailored solutions for your operational requirements',
  'Reduce downtime and improve operational resilience',
];

export default function BusinessContinuity() {
  const sectionRef = useScrollAnimation('.bc-animate');
  const gridRef = useStaggerAnimation('.bc-grid', '.bc-card');
  const industryGridRef = useStaggerAnimation('.bc-industry-grid', '.bc-industry-card');

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="remote-failover" className="relative z-10 bg-white overflow-hidden">
      {/* Background accents */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 80% 20%, rgba(99,102,241,0.05) 0%, transparent 60%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 20% 80%, rgba(232,48,122,0.04) 0%, transparent 60%)',
        }}
      />

      <div ref={sectionRef} className="section-inner relative z-10">
        {/* Hero banner */}
        <div className="bc-animate relative rounded-3xl overflow-hidden mb-20 shadow-[0_24px_64px_rgba(0,0,0,0.10)]">
          <img
            src="/remotehero_pc.jpg"
            alt="Remote connectivity infrastructure and network resilience"
            className="w-full h-[400px] lg:h-[460px] object-cover"
          />
          {/* Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, rgba(26,26,46,0.88) 0%, rgba(26,26,46,0.65) 50%, rgba(26,26,46,0.40) 100%)',
            }}
          />
          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-[680px] px-8 lg:px-12">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-[0.72rem] font-semibold tracking-[0.1em] uppercase px-4 py-2 rounded-full mb-5 backdrop-blur-sm">
                <ShieldCheck size={14} />
                Remote Connectivity
              </div>
              <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold text-white leading-[1.12] mb-4">
                Remote Connectivity &<br />Failover Solutions
              </h2>
              <p className="text-white/80 text-[1.05rem] leading-[1.75] mb-7 max-w-[560px]">
                Network outages can bring critical business operations to a standstill. Every minute
                of downtime impacts productivity, customer experience, and revenue. We design and
                deploy resilient connectivity solutions that ensure your business stays online.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={scrollToContact}
                  className="inline-flex items-center gap-2 bg-white text-[#1a1a2e] text-[0.85rem] font-semibold px-7 py-3.5 rounded-full hover:bg-white/90 transition-colors cursor-pointer border-none"
                >
                  Get a Resilient Network
                  <ArrowRight size={16} />
                </button>
                <button
                  onClick={scrollToContact}
                  className="inline-flex items-center gap-2 bg-transparent border border-white/40 text-white text-[0.85rem] font-semibold px-7 py-3.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <Phone size={16} />
                  Talk to an Expert
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Intro text */}
        <div className="bc-animate text-center mb-16 max-w-[800px] mx-auto">
          <h3 className="text-[clamp(1.4rem,2.5vw,1.8rem)] font-bold text-[#1a1a2e] leading-tight mb-4">
            Keep Your Business Connected, No Matter What
          </h3>
          <p className="text-[#64748b] leading-[1.75]">
            Whether caused by ISP failures, damaged fibre, power disruptions, or network equipment
            issues — our solutions automatically switch to a backup connection within seconds,
            allowing your operations to continue without interruption.
          </p>
        </div>

        {/* Industries grid */}
        <div className="bc-animate mb-20">
          <div className="text-center mb-10">
            <span className="text-[0.75rem] uppercase tracking-[0.1em] text-[#94a3b8] font-semibold">
              Industries We Support
            </span>
          </div>
          <div
            ref={industryGridRef}
            className="bc-industry-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {industries.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="bc-industry-card bg-[#f8fafc] border border-[#f1f5f9] rounded-2xl p-7 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
                >
                  <div
                    className="w-[50px] h-[50px] rounded-[14px] flex items-center justify-center mb-4"
                    style={{
                      background: `${item.color}14`,
                      border: `1px solid ${item.color}25`,
                    }}
                  >
                    <Icon size={22} style={{ color: item.color }} />
                  </div>
                  <h4 className="font-semibold text-[#1a1a2e] text-[0.95rem] mb-2">{item.title}</h4>
                  <p className="text-[#64748b] text-sm leading-[1.65]">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Enterprise-Grade Features */}
        <div className="bc-animate bg-[#f8fafc] border border-[#f1f5f9] rounded-3xl p-8 lg:p-12 mb-20">
          <div className="text-center mb-10">
            <span className="text-[0.75rem] uppercase tracking-[0.1em] text-[#94a3b8] font-semibold">
              Enterprise-Grade
            </span>
            <h3 className="text-[1.2rem] font-bold text-[#1a1a2e] mt-2">
              Network Resilience Capabilities
            </h3>
          </div>
          <div
            ref={gridRef}
            className="bc-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {enterpriseFeatures.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  className="bc-card bg-white rounded-2xl border border-[#f1f5f9] p-5 flex flex-col items-center text-center hover:shadow-card-hover transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[rgba(99,102,241,0.08)] to-[rgba(232,48,122,0.08)] border border-[rgba(99,102,241,0.12)] flex items-center justify-center mb-3">
                    <Icon size={20} className="text-[#6366f1]" />
                  </div>
                  <span className="text-[0.82rem] font-semibold text-[#1a1a2e] leading-snug">
                    {feature.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Why Choose Tenbel */}
        <div className="bc-animate grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <span className="text-[0.75rem] uppercase tracking-[0.1em] text-[#94a3b8] font-semibold">
              Why Choose Tenbel
            </span>
            <h3 className="text-[clamp(1.4rem,2.5vw,1.8rem)] font-bold text-[#1a1a2e] leading-tight mt-2 mb-4">
              Mission-Critical Communications &<br />Resilient Networking
            </h3>
            <p className="text-[#64748b] leading-[1.75] mb-6">
              At Tenbel Consultants, we specialise in mission-critical communications and resilient
              networking solutions for industries where connectivity cannot fail. From a single
              remote branch to nationwide enterprise deployments, we help organisations reduce
              downtime, improve operational resilience, and ensure business continuity.
            </p>
            <ul className="space-y-2.5 mb-8">
              {whyChoose.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-[#475569]">
                  <CheckCircle2 size={17} className="text-[#6366f1] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <button
              onClick={scrollToContact}
              className="btn-primary text-[0.85rem] px-7 py-3.5"
            >
              Build a Resilient Network
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Visual accent */}
          <div className="relative">
            <div className="bg-gradient-to-br from-[#f8fafc] to-[#eef2ff] rounded-3xl p-8 lg:p-10 border border-[#e2e8f0]">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6366f1] to-[#a855f7] mb-5 shadow-lg">
                  <ShieldCheck size={30} className="text-white" />
                </div>
                <h4 className="text-[1.1rem] font-bold text-[#1a1a2e] mb-3">
                  Ready to Build a More Resilient Network?
                </h4>
                <p className="text-[#64748b] text-sm leading-[1.7] mb-6 max-w-[380px] mx-auto">
                  Don't wait for the next outage to expose vulnerabilities in your network
                  infrastructure. Contact us to design a resilient connectivity solution.
                </p>
                <button
                  onClick={scrollToContact}
                  className="inline-flex items-center gap-2 bg-[#1a1a2e] text-white text-[0.82rem] font-semibold px-6 py-3 rounded-full hover:bg-[#2d2d4e] transition-colors cursor-pointer border-none"
                >
                  <Phone size={15} />
                  Contact Tenbel Consultants
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
