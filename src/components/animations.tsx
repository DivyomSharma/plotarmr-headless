"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  className?: string;
  delay?: number;
}

export function TextReveal({ children, width = "fit-content", className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    
    gsap.fromTo(
      ref.current,
      { y: 75, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: delay,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true,
        },
      }
    );
  }, [delay]);

  return (
    <div style={{ width }} className={cn("overflow-hidden inline-block", className)}>
      <div ref={ref}>{children}</div>
    </div>
  );
}

export function ParallaxImage({ 
  src, 
  alt, 
  speed = 0.5, 
  className 
}: { 
  src: string; 
  alt: string; 
  speed?: number; 
  className?: string; 
}) {
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imageRef.current || !containerRef.current) return;

    gsap.to(imageRef.current, {
      yPercent: 20 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, [speed]);

  return (
    <div ref={containerRef} className={cn("overflow-hidden relative", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="w-full h-[120%] object-cover absolute top-[-10%] left-0 will-change-transform"
      />
    </div>
  );
}
