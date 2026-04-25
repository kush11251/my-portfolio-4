'use client';

import { useEffect, useRef } from 'react';

interface CounterProps {
  target: number;
  duration?: number;
  suffix?: string;
}

export default function Counter({ target, duration = 1600, suffix = '' }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current && ref.current) {
            hasAnimated.current = true;
            animateCounter(ref.current, target, duration, suffix);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [target, duration, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

function animateCounter(el: HTMLElement, target: number, duration: number, suffix: string) {
  let start: number | null = null;
  const step = (timestamp: number) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 4);
    el.textContent = Math.round(easeOut * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
