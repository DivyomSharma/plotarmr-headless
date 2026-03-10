"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Marquee() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const items = containerRef.current.querySelectorAll(".marquee-item");
    const totalWidth = Array.from(items).reduce((acc, el) => acc + (el as HTMLElement).offsetWidth, 0);

    gsap.to(containerRef.current, {
      x: -totalWidth / 2, // Scroll half meaning exactly the original set, loop back
      ease: "none",
      duration: 20, // adjust speed
      repeat: -1,
    });
  }, []);

  const words = [
    "PLOT ARMOUR", "WEAR YOUR PLOT ARMOUR", "BUILT FOR LEGENDS", "WORN BY SURVIVORS", "NEW DELHI INDIA"
  ];

  return (
    <section className="py-12 md:py-24 overflow-hidden border-y border-white/5 bg-surface">
      <div className="relative flex whitespace-nowrap" data-cursor-interactive="true" data-cursor-label="Drag">
        <div ref={containerRef} className="flex gap-16 md:gap-32 px-8">
          {/* Double the array for seamless looping */}
          {[...words, ...words].map((word, idx) => (
            <h2 
              key={idx} 
              className="marquee-item text-5xl md:text-7xl lg:text-[8vw] font-primary uppercase tracking-tighter text-transparent stroke-text hover:text-foreground transition-colors duration-500"
              style={{ WebkitTextStroke: "1px var(--foreground)" }}
            >
              {word}
            </h2>
          ))}
        </div>
      </div>
    </section>
  );
}
