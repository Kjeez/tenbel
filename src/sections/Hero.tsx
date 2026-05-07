import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Phone, ChevronRight, Train, Wifi, ShieldCheck } from 'lucide-react';

const competencies = [
  {
    icon: Train,
    title: 'Railways &\nCritical Communications',
    desc: 'Reliable. Secure. Always.',
  },
  {
    icon: Wifi,
    title: 'IoT & Enterprise\nWireless',
    desc: 'Scalable. Resilient. Future-Ready.',
  },
  {
    icon: ShieldCheck,
    title: 'Failover &\nRedundancy',
    desc: 'Smart uptime with trusted hardware.',
  },
];

const partners = [
  { name: 'PANORAMA', sub: 'ANTENNAS' },
  { name: 'celerway', sub: '' },
  { name: 'CONSORT', sub: 'DIGITAL' },
  { name: 'TELTONIKA', sub: 'NETWORKS' },
  { name: 'intellistride', sub: '' },
  { name: 'SIVA', sub: 'IoT' },
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.children ?? [],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out', delay: 0.3 }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToProducts = () => {
    document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Dark overlay gradient from left */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(to right, rgba(10,11,20,0.95) 0%, rgba(10,11,20,0.85) 35%, rgba(10,11,20,0.4) 55%, rgba(10,11,20,0.1) 70%, transparent 100%)',
        }}
      />
      {/* Bottom fade for partner strip */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-[1]"
        style={{
          background: 'linear-gradient(to top, rgba(10,11,20,1) 0%, rgba(10,11,20,0.6) 50%, transparent 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-[1400px] mx-auto px-6 lg:px-10 w-full pt-24 pb-8">
        <div ref={contentRef} className="max-w-[600px]">
          <h1 className="text-[clamp(2.2rem,4.5vw,3.5rem)] font-extrabold leading-[1.08] tracking-tight mb-5">
            <span className="text-white">Empowering a<br />sustainably</span><br />
            <span className="gradient-text">connected future</span>
          </h1>

          <p className="text-[rgba(240,240,248,0.65)] text-base leading-[1.7] mb-8 max-w-[480px]">
            Expert solutions in wireless communications, IoT, and network resilience for a smarter, connected tomorrow.
          </p>

          {/* 3 Mini Competency Cards */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {competencies.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="bg-[rgba(255,255,255,0.06)] backdrop-blur-sm border border-[rgba(255,255,255,0.1)] rounded-xl p-3 text-center hover:border-[rgba(232,48,122,0.3)] hover:bg-[rgba(232,48,122,0.08)] transition-all cursor-default"
                >
                  <Icon size={24} className="text-[#E8307A] mx-auto mb-2" />
                  <div className="text-[0.65rem] font-semibold text-white leading-tight whitespace-pre-line mb-1">
                    {item.title}
                  </div>
                  <div className="text-[0.6rem] text-[rgba(240,240,248,0.5)] leading-tight">
                    {item.desc}
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <button onClick={scrollToProducts} className="btn-primary text-[0.8rem] tracking-[0.06em] uppercase px-6 py-3">
              Explore Our Solutions
              <ChevronRight size={16} />
            </button>
            <button onClick={scrollToContact} className="btn-outline text-[0.8rem] tracking-[0.06em] uppercase px-6 py-3">
              <Phone size={16} />
              Talk to an Expert
            </button>
          </div>
        </div>
      </div>

      {/* Partner Logos Strip */}
      <div className="relative z-10 w-full">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[rgba(255,255,255,0.15)]" />
            <span className="text-[0.75rem] md:text-[0.8rem] font-bold tracking-[0.2em] uppercase bg-gradient-to-r from-[#E8307A] via-[#9B51E0] to-[#3B82F6] bg-clip-text text-transparent">
              Our Trusted Partners
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[rgba(255,255,255,0.15)]" />
          </div>
          <div className="flex flex-wrap items-center justify-between w-full gap-8 md:gap-4 lg:gap-8 mt-8 px-2">
            {partners.map((p, i) => (
              <div key={i} className="flex items-center gap-2 lg:gap-3 opacity-70 hover:opacity-100 transition-opacity cursor-default select-none">
                {p.name === 'PANORAMA' && (
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-[1.5px] border-white/80 flex items-center justify-center">
                      <span className="text-[0.7rem] md:text-[0.9rem] font-extrabold text-white">P</span>
                    </div>
                    <div className="flex flex-col leading-none">
                      <span className="text-[0.8rem] md:text-[1rem] font-bold text-white tracking-widest">{p.name}</span>
                      <span className="text-[0.6rem] md:text-[0.75rem] text-[rgba(240,240,248,0.6)] tracking-[0.3em] mt-0.5">{p.sub}</span>
                    </div>
                  </div>
                )}
                {p.name === 'celerway' && (
                  <div className="flex items-center gap-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="md:w-7 md:h-7">
                      <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2" strokeDasharray="8 4" strokeLinecap="round" />
                      <circle cx="12" cy="12" r="3" fill="white" />
                    </svg>
                    <span className="text-[1.1rem] md:text-[1.3rem] font-semibold text-white tracking-wider lowercase">celerway</span>
                  </div>
                )}
                {p.name === 'CONSORT' && (
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full border-[2px] border-dashed border-white/70" />
                    <div className="flex flex-col leading-none">
                      <span className="text-[0.8rem] md:text-[1rem] font-bold text-white tracking-widest">{p.name}</span>
                      <span className="text-[0.6rem] md:text-[0.75rem] text-[rgba(240,240,248,0.6)] tracking-[0.2em] mt-0.5">{p.sub}</span>
                    </div>
                  </div>
                )}
                {p.name === 'TELTONIKA' && (
                  <div className="flex items-center gap-1">
                    <div className="flex gap-1">
                      <div className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 bg-white transform rotate-45" />
                      <div className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 bg-white transform rotate-45" />
                      <div className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 bg-white transform rotate-45" />
                      <div className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 bg-white transform rotate-45" />
                    </div>
                    <div className="flex flex-col leading-none ml-2">
                      <span className="text-[0.8rem] md:text-[1rem] font-bold text-white tracking-widest">{p.name}</span>
                      <span className="text-[0.6rem] md:text-[0.75rem] text-[rgba(240,240,248,0.6)] tracking-widest mt-0.5">{p.sub}</span>
                    </div>
                  </div>
                )}
                {p.name === 'intellistride' && (
                  <div className="flex items-center gap-1">
                    <svg width="24" height="24" viewBox="0 0 16 16" fill="none" className="md:w-8 md:h-8">
                      <circle cx="8" cy="4" r="2" stroke="white" strokeWidth="1.5"/>
                      <circle cx="4" cy="12" r="2" stroke="white" strokeWidth="1.5"/>
                      <circle cx="12" cy="12" r="2" stroke="white" strokeWidth="1.5"/>
                      <path d="M8 6L4 10M8 6L12 10" stroke="white" strokeWidth="1.5"/>
                    </svg>
                    <span className="text-[1rem] md:text-[1.2rem] font-medium text-white ml-1 tracking-wide">{p.name}</span>
                  </div>
                )}
                {p.name === 'SIVA' && (
                  <div className="flex items-center gap-1">
                    <div className="flex items-end gap-1 h-5 md:h-6">
                      <div className="w-[3px] md:w-1 h-2.5 md:h-3 bg-white rounded-t-sm" />
                      <div className="w-[3px] md:w-1 h-3.5 md:h-4 bg-white rounded-t-sm" />
                      <div className="w-[3px] md:w-1 h-4.5 md:h-5 bg-white rounded-t-sm" />
                      <div className="w-[3px] md:w-1 h-5 md:h-6 bg-white rounded-t-sm" />
                    </div>
                    <div className="flex items-baseline gap-1 ml-1">
                      <span className="text-[1.1rem] md:text-[1.4rem] font-bold text-white tracking-widest">{p.name}</span>
                      <span className="text-[0.7rem] md:text-[0.85rem] text-[rgba(240,240,248,0.6)] font-medium">{p.sub}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
