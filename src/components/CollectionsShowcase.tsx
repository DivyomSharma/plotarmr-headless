"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { TextReveal } from "@/components/animations";

const collections = [
  {
    id: 1,
    title: "Bestsellers",
    slug: "bestsellers",
    image: "https://images.unsplash.com/photo-1550614000-4b95d4662247?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "New Arrivals",
    slug: "new-arrivals",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "The Spotlight",
    slug: "the-spotlight",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "The Monotones",
    slug: "the-monotones",
    image: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "ARMR Collection",
    slug: "armr-collection",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1200&auto=format&fit=crop",
  }
];

export default function CollectionsShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !scrollWrapperRef.current) return;
    
    // We want the viewport definition to trigger horizontal scroll when pinned
    const scrollWidth = scrollWrapperRef.current.scrollWidth;
    const windowWidth = window.innerWidth;
    
    // Create the horizontal scrolling pinned section
    const tween = gsap.to(scrollWrapperRef.current, {
      x: () => -(scrollWidth - windowWidth + 100), // Account for some padding
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${scrollWidth}`,
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true, // Recalculate on resize
      }
    });

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <section ref={containerRef} className="h-screen w-full bg-surface overflow-hidden flex flex-col justify-center">
      <div className="px-8 pb-12">
        <TextReveal>
          <h2 className="text-4xl md:text-5xl font-primary uppercase tracking-wider">
            Explore Collections
          </h2>
        </TextReveal>
      </div>

      <div 
        ref={scrollWrapperRef} 
        className="flex gap-8 px-8 h-[60vh] md:h-[70vh] items-center w-fit will-change-transform"
      >
        {collections.map((collection, i) => (
          <a
            key={collection.id}
            href={`/collections/${collection.slug}`}
            className="group relative h-full w-[80vw] sm:w-[50vw] md:w-[40vw] lg:w-[30vw] flex-shrink-0 overflow-hidden"
            data-cursor-interactive="true"
            data-cursor-label="Explore"
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
            <Image
              src={collection.image}
              alt={collection.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute bottom-6 left-6 z-20 overflow-hidden">
              <h3 className="text-3xl font-primary uppercase text-white tracking-widest transform translate-y-2 opacity-80 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                {collection.title}
              </h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
