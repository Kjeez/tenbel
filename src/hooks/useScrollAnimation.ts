import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimation(selector: string = '.animate-on-scroll', options?: {
  y?: number;
  duration?: number;
  stagger?: number;
  start?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>(selector);
      elements.forEach((el) => {
        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: options?.y ?? 24,
          },
          {
            opacity: 1,
            y: 0,
            duration: options?.duration ?? 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: options?.start ?? 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [selector, options?.y, options?.duration, options?.stagger, options?.start]);

  return containerRef;
}

export function useStaggerAnimation(_containerSelector: string, childSelector: string = '.stagger-item') {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(childSelector);
      gsap.fromTo(
        items,
        {
          opacity: 0,
          y: 24,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [childSelector]);

  return containerRef;
}
