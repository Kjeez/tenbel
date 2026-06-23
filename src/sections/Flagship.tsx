import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Check } from 'lucide-react';

const features = [
  'IP67 ruggedized case — deploy anywhere, in any conditions',
  'Secure & encrypted communication from the ground up',
  'Works with 4G, 5G, Satellite — and even without any internet',
  'Available as Briefcase, Cylinder (Candy Box) form factors',
  'Designed for emergency services, military, disaster response & remote education',
];

const connectivityModes = [
  '4G LTE',
  '5G',
  'Satellite',
  'WiFi Mesh',
  'Offline Mesh',
  'Encrypted',
];

const useCases = [
  { label: 'Emergency Services', color: 'rgba(232,48,122,0.08)', border: 'rgba(232,48,122,0.2)', text: '#E8307A' },
  { label: 'Military & Defence', color: 'rgba(99,102,241,0.08)', border: 'rgba(99,102,241,0.2)', text: '#6366f1' },
  { label: 'Disaster Relief', color: 'rgba(20,184,166,0.08)', border: 'rgba(20,184,166,0.2)', text: '#14b8a6' },
  { label: 'Remote Education', color: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)', text: '#f59e0b' },
  { label: 'Railways', color: 'rgba(168,85,247,0.08)', border: 'rgba(168,85,247,0.2)', text: '#a855f7' },
];

export default function Flagship() {
  const sectionRef = useScrollAnimation('.flagship-animate');

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="flagship" className="relative z-10 bg-[#f8fafc]">
      <div ref={sectionRef} className="max-w-[1200px] mx-auto px-8 py-20 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div>
          <div className="flagship-animate inline-flex items-center gap-2 bg-[rgba(232,48,122,0.08)] border border-[rgba(232,48,122,0.2)] text-[#E8307A] text-[0.72rem] font-semibold tracking-[0.08em] uppercase px-3.5 py-2 rounded-full mb-6">
            Flagship Product
          </div>
          <h2 className="flagship-animate text-[clamp(1.8rem,3vw,2.2rem)] font-bold leading-tight mb-4 text-[#1a1a2e]">
            The Emergency<br />Communications BoX
          </h2>
          <p className="flagship-animate text-[#64748b] mb-8 leading-[1.75]">
            An IP67-rated, deployable communications system. Open it, and instantly create a secure wireless network — no infrastructure required. Now available in multiple form factors.
          </p>

          <ul className="flagship-animate list-none space-y-0">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-3 py-3 border-b border-[#f1f5f9] text-sm text-[#64748b] last:border-b-0">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[rgba(232,48,122,0.1)] text-[#E8307A] text-[0.7rem] font-bold flex-shrink-0 mt-0.5">
                  <Check size={12} />
                </span>
                {f}
              </li>
            ))}
          </ul>

          <div className="flagship-animate mt-8">
            <button onClick={scrollToContact} className="btn-primary">
              Request a Demo
            </button>
          </div>
        </div>

        {/* Right - Visual */}
        <div className="flagship-animate">
          <div className="relative bg-white rounded-3xl border border-[#f1f5f9] p-8 overflow-hidden shadow-soft">
            <div
              className="absolute -bottom-[60px] -right-[60px] w-[200px] h-[200px] rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(232,48,122,0.08) 0%, transparent 70%)' }}
            />

            <div className="inline-flex items-center gap-2 bg-[rgba(232,48,122,0.08)] border border-[rgba(232,48,122,0.2)] text-[#E8307A] text-[0.72rem] font-semibold tracking-[0.08em] uppercase px-3.5 py-2 rounded-full mb-6">
              Connectivity Modes
            </div>

            <div className="grid grid-cols-2 gap-3">
              {connectivityModes.map((mode, i) => (
                <div
                  key={i}
                  className="bg-[#f8fafc] border border-[#f1f5f9] rounded-[10px] px-4 py-3 text-sm font-medium text-[#1a1a2e] flex items-center gap-2"
                >
                  <span className="w-[7px] h-[7px] rounded-full gradient-bg flex-shrink-0" />
                  {mode}
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[#f1f5f9]">
              <div className="text-[0.75rem] uppercase tracking-[0.1em] text-[#94a3b8] mb-4">
                Use Cases
              </div>
              <div className="flex flex-wrap gap-2">
                {useCases.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[0.78rem] font-medium px-3 py-1.5 rounded-full"
                    style={{
                      background: tag.color,
                      border: `1px solid ${tag.border}`,
                      color: tag.text,
                    }}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
