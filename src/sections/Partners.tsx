import { useStaggerAnimation } from '../hooks/useScrollAnimation';
import { ExternalLink } from 'lucide-react';

const partners = [
  { name: 'Teltonika Networks', desc: 'Industrial IoT & Routers', url: 'https://teltonika-networks.com/' },
  { name: 'Intellistride', desc: 'Smart Connectivity', url: 'https://www.intellistride.com/' },
  { name: 'SIVA IoT', desc: 'IoT Solutions', url: 'https://sivaiot.co/' },
  { name: 'Consort Digital', desc: 'Digital Infrastructure', url: 'https://www.consortdigital.com/' },
  { name: 'Panorama Antennas', desc: 'RF Antenna Specialists', url: 'https://panorama-antennas.com/' },
  { name: 'Celerway', desc: 'Mission-Critical Networking', url: 'https://www.celerway.com/' },
];

export default function Partners() {
  const gridRef = useStaggerAnimation('.partners-grid', '.partner-card');

  return (
    <section id="partners" className="relative z-10 bg-[#0a0b14]">
      <div className="section-inner">
        <span className="section-tag animate-on-scroll">Ecosystem</span>
        <h2 className="section-title animate-on-scroll">Our Partner Network</h2>
        <p className="section-desc animate-on-scroll">
          We work with globally recognised leaders in wireless, IoT and antenna technology to deliver the best possible solutions.
        </p>

        <div ref={gridRef} className="partners-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {partners.map((partner, i) => (
            <a
              key={i}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="partner-card card-surface flex flex-col items-center justify-center text-center min-h-[120px] no-underline group"
            >
              <div className="font-semibold text-[0.95rem] text-[#f0f0f8] mb-1 group-hover:gradient-text transition-all">
                {partner.name}
              </div>
              <div className="text-[0.72rem] text-[rgba(240,240,248,0.55)]">{partner.desc}</div>
              <ExternalLink size={12} className="mt-2 text-[rgba(240,240,248,0.3)] opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>

        {/* EDX Banner */}
        <div className="animate-on-scroll mt-10 bg-gradient-to-br from-[rgba(232,48,122,0.12)] to-[rgba(99,102,241,0.12)] border border-[rgba(232,48,122,0.2)] rounded-[20px] p-8 md:p-10 grid md:grid-cols-[1fr_auto] gap-8 items-center">
          <div>
            <div className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[#E8307A] mb-2">
              New Appointment
            </div>
            <div className="text-[1.3rem] font-bold mb-2">
              Tenbel is now the Authorised Representative of EDX Wireless in India
            </div>
            <p className="text-[rgba(240,240,248,0.55)] text-sm">
              EDX is a leading RF planning tool with special emphasis on mesh network design. As their India representative, we bring best-in-class RF planning to Indian enterprises and government organisations.
            </p>
          </div>
          <a
            href="https://edx.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline whitespace-nowrap"
          >
            Learn about EDX →
          </a>
        </div>
      </div>
    </section>
  );
}
