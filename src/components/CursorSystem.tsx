"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CursorSystem() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const label = labelRef.current;
    if (!cursor || !label) return;

    // Center dot configuration
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out",
      });
    };

    const handleHoverEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Look for the closest element with a data-cursor-interactive attribute
      const interactiveEl = target.closest("[data-cursor-interactive]");
      
      if (interactiveEl) {
        const customLabel = interactiveEl.getAttribute("data-cursor-label");
        
        if (customLabel && label) {
          label.textContent = customLabel;
          gsap.to(label, { opacity: 1, duration: 0.2 });
          gsap.to(cursor, {
            width: 120,
            height: 48,
            borderRadius: "24px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(4px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            mixBlendMode: "normal",
            duration: 0.3,
            ease: "back.out(1.5)",
          });
        } else {
          // Default expansion
          gsap.to(cursor, {
            scale: 2.5,
            backgroundColor: "transparent",
            border: "1px solid white",
            duration: 0.3,
            ease: "power2.out",
          });
        }
      }
    };

    const handleHoverLeave = () => {
      if (label) {
        gsap.to(label, { opacity: 0, duration: 0.2 });
      }
      gsap.to(cursor, {
        width: 16,
        height: 16,
        scale: 1,
        borderRadius: "50%",
        backgroundColor: "white",
        backdropFilter: "none",
        border: "none",
        mixBlendMode: "difference",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleClick = () => {
      gsap.fromTo(
        cursor,
        { scale: 0.8 },
        { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.3)" }
      );
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleHoverEnter);
    document.addEventListener("mouseout", handleHoverLeave);
    window.addEventListener("mousedown", handleClick);

    // Hide default cursor globally
    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleHoverEnter);
      document.removeEventListener("mouseout", handleHoverLeave);
      window.removeEventListener("mousedown", handleClick);
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-4 h-4 rounded-full bg-white pointer-events-none z-[9999] flex items-center justify-center mix-blend-difference"
      style={{ transform: "translate(-50%, -50%)" }}
    >
      <span
        ref={labelRef}
        className="opacity-0 text-[10px] font-medium uppercase tracking-widest text-white whitespace-nowrap"
      ></span>
    </div>
  );
}
