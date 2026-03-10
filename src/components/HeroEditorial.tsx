"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { TextReveal, ParallaxImage } from "@/components/animations";

export default function HeroEditorial() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Basic entrance animation for the hero text beyond the ScrollTrigger
    gsap.fromTo(
      ".hero-line",
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power4.out", delay: 0.5 }
    );
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <ParallaxImage 
          src="https://images.unsplash.com/photo-1550614000-4b95d4662247?q=80&w=2000&auto=format&fit=crop" 
          alt="Luxury Streetwear Campaign" 
          speed={0.3}
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-black/40 z-10"></div>
      </div>

      <div className="relative z-20 flex flex-col items-center text-center px-4 w-full mix-blend-difference text-white">
        <div className="overflow-hidden">
          <h1 className="hero-line text-6xl md:text-8xl lg:text-[10vw] font-primary uppercase tracking-tighter leading-[0.85] mb-6">
            Wear Your
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1 className="hero-line text-6xl md:text-8xl lg:text-[10vw] font-primary uppercase tracking-tighter leading-[0.85]">
            Plot Armour
          </h1>
        </div>
        <div className="overflow-hidden mt-12">
          <p className="hero-line text-sm md:text-base font-secondary max-w-md mx-auto uppercase tracking-[0.2em] font-light">
            Every arc needs a survivor. Born in New Delhi, India.
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 mix-blend-difference text-white">
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-12 bg-white/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-white origin-top animate-scroll-indicator"></div>
        </div>
      </div>
    </section>
  );
}
