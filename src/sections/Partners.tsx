import { useStaggerAnimation } from '../hooks/useScrollAnimation';
import { ExternalLink } from 'lucide-react';

const partners = [
  {
    name: 'Teltonika Networks',
    desc: 'Industrial IoT & Networking',
    url: 'https://teltonika-networks.com/',
    logo: '/teltonika.png',
  },
  {
    name: 'Panorama Antennas',
    desc: 'RF Antenna Specialists',
    url: 'https://panorama-antennas.com/',
    logo: '/panorama.png',
  },
  {
    name: 'Celerway',
    desc: 'Mission-Critical Networking',
    url: 'https://www.celerway.com/',
    logo: '/c.png',
  },
  {
    name: 'Consort Digital',
    desc: 'Digital Infrastructure',
    url: 'https://www.consortdigital.com/',
    logo: '/consort.png',
  },
  {
    name: 'Intellistride',
    desc: 'Smart Connectivity',
    url: 'https://www.intellistride.com/',
    logo: '/intellistribe.png',
  },
  {
    name: 'SIVA IoT',
    desc: 'IoT Solutions',
    url: 'https://sivaiot.co/',
    logo: '/siva.png',
  },
  {
    name: 'EDX Wireless',
    desc: 'RF Planning Tools',
    url: 'https://edx.com/',
    logo: '/edx.png',
    darkBg: true,
  },
  {
    name: 'QU Wireless',
    desc: 'Wireless Solutions',
    url: 'https://www.quwireless.com/',
    logo: '/quwireless.png',
  },
  {
    name: 'NoMachine',
    desc: 'Remote Access & Desktop',
    url: 'https://www.nomachine.com/',
    logo: '/nomachine.png',
  },
];

export default function Partners() {
  const gridRef = useStaggerAnimation('.partners-grid', '.partner-card');

  return (
    <section id="partners" className="relative z-10 bg-white">
      <div className="section-inner">
        <span className="section-tag animate-on-scroll">Ecosystem</span>
        <h2 className="section-title animate-on-scroll">Our Partner Network</h2>
        <p className="section-desc animate-on-scroll">
          We work with globally recognised leaders in wireless, IoT and antenna technology to deliver the best possible solutions.
        </p>

        <div ref={gridRef} className="partners-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {partners.map((partner, i) => (
            <a
              key={i}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="partner-card group relative bg-white border border-[#f1f5f9] rounded-2xl p-6 flex flex-col items-center justify-center text-center min-h-[150px] no-underline transition-all duration-300 hover:border-[rgba(232,48,122,0.25)] hover:shadow-card-hover hover:-translate-y-1"
            >
              {/* Logo image */}
              <div
                className={`flex items-center justify-center mb-4 h-20 w-full rounded-lg px-4 ${
                  partner.darkBg ? 'bg-[#1a1a2e]' : ''
                }`}
              >
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className="max-h-16 max-w-[160px] object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="text-[0.72rem] text-[#94a3b8] mt-1">{partner.desc}</div>
              <ExternalLink
                size={12}
                className="absolute top-4 right-4 text-[#cbd5e1] opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
