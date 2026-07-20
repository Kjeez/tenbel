import { useState, useEffect, useCallback } from 'react';
import { ChevronRight, ChevronLeft, Phone, Radio, Sun, Wifi } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const slides = [
  {
    id: 'commsbox',
    tag: 'Flagship Product',
    icon: Radio,
    title: 'The Emergency\nCommunications BoX',
    subtitle: 'Deploy a secure wireless network anywhere — no infrastructure needed. IP67-rated, multi-connectivity, mission-critical.',
    cta: 'Learn More',
    ctaHref: '#flagship',
    image: '/communicationbox.jpg',
    mobileImage: '/comm_mob.jpg',
  },
  {
    id: 'offgrid',
    tag: 'Sustainable Solutions',
    icon: Sun,
    title: 'Offgrid',
    subtitle: 'Reliable, sustainable power and connectivity solutions designed for mission-critical operations in remote and off-grid locations.',
    cta: 'Explore Off Grid',
    ctaHref: '#products',
    image: '/offgridhero_pc.jpg',
    mobileImage: '/offgrid_mobile.jpg',
  },
  {
    id: 'remote',
    tag: 'Specialized Solutions',
    icon: Wifi,
    title: 'Remote Connectivity\nand Failover',
    subtitle: 'Enhancing connectivity in underserved areas using multi-SIM cellular routers and high-gain antennas — resilient, future-ready communications anywhere.',
    cta: 'Discover How',
    ctaHref: '#remote-connectivity',
    image: '/remotehero_pc.jpg',
    mobileImage: '/remote-mobile.png',
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const goTo = useCallback((index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  }, [current]);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const slide = slides[current];
  const SlideIcon = slide.icon;

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
    }),
  };

  const bgVariants = {
    enter: { opacity: 0, scale: 1.05 },
    center: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.98 },
  };

  return (
    <section className="relative h-[calc(100vh-72px)] mt-[72px] overflow-hidden bg-white">
      {/* Background Image */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={slide.id + '-bg'}
          custom={direction}
          variants={bgVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="absolute inset-0 z-0"
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${isMobile ? slide.mobileImage : slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: isMobile ? 'center bottom' : 'center right',
            }}
          />
          {/* Overlay for text readability */}
          <div
            className="absolute inset-0"
            style={{
              background: isMobile
                ? 'linear-gradient(to bottom, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.88) 35%, rgba(255,255,255,0.45) 60%, transparent 80%)'
                : 'linear-gradient(to right, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.90) 25%, rgba(255,255,255,0.65) 42%, rgba(255,255,255,0.20) 58%, transparent 70%)',
            }}
          />

          {/* Subtle bottom vignette for polish */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(255,255,255,0.6) 0%, transparent 25%)',
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="absolute inset-0 z-10 flex items-start md:items-center pt-8 md:pt-0">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 w-full">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={slide.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="max-w-[560px]"
            >
              {/* Tag */}
              <div className="inline-flex items-center gap-2 bg-[rgba(232,48,122,0.08)] border border-[rgba(232,48,122,0.2)] text-[#E8307A] text-[0.72rem] font-semibold tracking-[0.1em] uppercase px-4 py-2 rounded-full mb-5">
                <SlideIcon size={14} />
                {slide.tag}
              </div>

              {/* Title */}
              <h1 className="text-[clamp(2.2rem,4.5vw,3.4rem)] font-extrabold leading-[1.08] tracking-tight mb-4 whitespace-pre-line text-[#1a1a2e]">
                {slide.title}
              </h1>

              {/* Subtitle */}
              <p className="text-[#475569] text-[1.05rem] leading-[1.7] mb-7 max-w-[480px]">
                {slide.subtitle}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => scrollToSection(slide.ctaHref)}
                  aria-label={slide.cta}
                  className="btn-primary text-[0.85rem] tracking-[0.04em] px-7 py-3.5"
                >
                  {slide.cta}
                  <ChevronRight size={16} />
                </button>
                <button
                  onClick={scrollToContact}
                  aria-label="Talk to an expert"
                  className="btn-outline text-[0.85rem] tracking-[0.04em] px-7 py-3.5"
                >
                  <Phone size={16} />
                  Talk to an Expert
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Carousel Controls — absolutely positioned at bottom */}
      <div className="absolute bottom-12 left-0 right-0 z-10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-6">
            {/* Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                aria-label="Previous slide"
                className="w-10 h-10 rounded-full border border-[#e2e8f0] bg-white hover:border-[#E8307A] hover:text-[#E8307A] flex items-center justify-center transition-all cursor-pointer text-[#475569]"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                aria-label="Next slide"
                className="w-10 h-10 rounded-full border border-[#e2e8f0] bg-white hover:border-[#E8307A] hover:text-[#E8307A] flex items-center justify-center transition-all cursor-pointer text-[#475569]"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer border-none ${i === current
                      ? 'w-8 bg-gradient-to-r from-[#E8307A] to-[#c026d3]'
                      : 'w-2 bg-[#cbd5e1] hover:bg-[#94a3b8]'
                    }`}
                />
              ))}
            </div>

            {/* Counter */}
            <span className="text-sm font-medium text-[#94a3b8] tracking-wide">
              {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent z-[5]" />
    </section>
  );
}
