import { useStaggerAnimation } from '../hooks/useScrollAnimation';

const services = [
  {
    num: '01 / DESIGN',
    title: 'Wireless Network Design',
    desc: 'Cost-efficient, high-performing and sustainable network design across WiFi, cellular, LoRa and other global standards.',
  },
  {
    num: '02 / ENGINEERING',
    title: 'Custom Antenna Design',
    desc: 'We understand what you truly need in an antenna and bring it to life — design and build to cost from the outset.',
  },
  {
    num: '03 / STRATEGY',
    title: 'IoT Consulting',
    desc: 'Greenfield Go-To-Market strategy or enhancement of an existing model — decades of IoT and wireless expertise at your service.',
  },
  {
    num: '04 / DEPLOYMENT',
    title: 'RFID Design & Deployment',
    desc: 'End-to-end RFID tracking systems — from tags and readers to ERP integration and on-site deployment.',
  },
];

export default function Services() {
  const gridRef = useStaggerAnimation('.services-grid', '.service-card');

  return (
    <section id="services" className="relative z-10 bg-[#141628]">
      <div className="section-inner">
        <span className="section-tag animate-on-scroll">Expertise</span>
        <h2 className="section-title animate-on-scroll">Our Service Lines</h2>
        <p className="section-desc animate-on-scroll">
          End-to-end wireless expertise — from initial design to full deployment and ongoing optimization.
        </p>

        <div ref={gridRef} className="services-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((item, i) => (
            <div
              key={i}
              className="service-card bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-7 transition-all duration-300 hover:bg-[rgba(232,48,122,0.06)] hover:border-[rgba(232,48,122,0.25)]"
            >
              <div className="text-[0.7rem] font-bold tracking-[0.15em] text-[#E8307A] mb-3">
                {item.num}
              </div>
              <div className="font-semibold text-base mb-2">{item.title}</div>
              <p className="text-[rgba(240,240,248,0.55)] text-sm leading-[1.65]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
