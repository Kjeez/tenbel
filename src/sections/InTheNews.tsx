import { ExternalLink, Mic, Radio, ShieldAlert, TrainFront } from 'lucide-react';

const POST_URL =
  'https://www.linkedin.com/posts/imc2026-coai-criticalcommunications-ugcPost-7515715177078595585-xlPp/';
const EMBED_URL = 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7515715177078595585';

const topics = [
  { icon: ShieldAlert, label: 'Disaster management' },
  { icon: TrainFront, label: 'Railway safety' },
  { icon: Radio, label: 'Off-grid communication' },
];

export default function InTheNews() {
  return (
    <section id="news" className="relative z-10 bg-[#f8fafc]">
      <div className="section-inner">
        <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] gap-12 lg:gap-16 items-center">
          <div>
            <span className="section-tag animate-on-scroll">In the News</span>
            <h2 className="section-title animate-on-scroll">Tenbel at India Mobile Congress 2026</h2>
            <p className="section-desc animate-on-scroll !mb-8">
              Our founder, Ashish Chopra, spoke with Radhika Sharma of COAI about Tenbel's work in critical
              communications and why platforms like IMC matter for startups bringing new ideas to market.
            </p>

            <ul className="animate-on-scroll flex flex-col gap-3 mb-10 p-0 list-none">
              {topics.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3 text-[0.95rem] text-[#1a1a2e] font-medium">
                  <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-[rgba(232,48,122,0.08)] text-[#E8307A]">
                    <Icon size={18} />
                  </span>
                  {label}
                </li>
              ))}
            </ul>

            <div className="animate-on-scroll flex flex-wrap items-center gap-4">
              <a href={POST_URL} target="_blank" rel="noopener noreferrer" className="btn-primary no-underline">
                Watch on LinkedIn
                <ExternalLink size={16} />
              </a>
              <span className="flex items-center gap-2 text-[0.8rem] text-[#94a3b8]">
                <Mic size={14} />
                Interview by COAI
              </span>
            </div>
          </div>

          <div className="animate-on-scroll relative">
            <div
              aria-hidden
              className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[rgba(232,48,122,0.18)] to-[rgba(192,38,211,0.12)] blur-2xl"
            />
            <div className="relative overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white shadow-card-hover">
              <iframe
                src={EMBED_URL}
                title="Tenbel Consultants at India Mobile Congress 2026 — COAI interview on LinkedIn"
                loading="lazy"
                allowFullScreen
                className="block w-full h-[960px] sm:h-[840px] lg:h-[800px] border-0"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
