'use client';

import { useEffect, useRef } from 'react';

interface MarqueeProps {
  items: string[];
}

export default function Marquee({ items }: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    track.style.animation = 'marquee 40s linear infinite';
  }, []);

  return (
    <div className="relative overflow-hidden border-t border-b border-gray-800 bg-white/[0.02] py-4">
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
      <div
        ref={trackRef}
        className="flex gap-12 whitespace-nowrap w-max"
      >
        {[...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center gap-6">
            <span className="text-xs uppercase tracking-[0.15em] text-gray-400 font-medium">
              {item}
            </span>
            <span className="w-1 h-1 rounded-full bg-emerald-400" />
          </div>
        ))}
      </div>
    </div>
  );
}
