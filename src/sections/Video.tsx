import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Video() {
  useScrollAnimation('.video-animate');

  return (
    <section id="media" className="relative z-10 bg-[#141628]">
      <div className="section-inner text-center">
        <span className="section-tag video-animate block text-center">In the News</span>
        <h2 className="section-title video-animate mx-auto">Tenbel at Bharat Telecom 2025</h2>
        <p className="section-desc video-animate mx-auto text-center">
          Watch our interview from one of India's largest telecom events — exploring the future of connected India.
        </p>

        <div className="video-animate max-w-[800px] mx-auto">
          <div className="relative pb-[56.25%] rounded-[20px] overflow-hidden border border-[rgba(255,255,255,0.08)]">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/UgkxYwOCy9yA1bBMxJ-MEa_nJSGsbIxaDSOG"
              title="Tenbel at Bharat Telecom 2025"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
