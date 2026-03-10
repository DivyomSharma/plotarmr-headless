"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/lib/store";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: any; // Raw node from Shopify API
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCartStore();

  const handle = product.handle;
  const title = product.title;
  const price = product.priceRange?.minVariantPrice?.amount;
  const currency = product.priceRange?.minVariantPrice?.currencyCode;
  
  // Try to grab at least 2 images for the hover swap effect
  const images = product.images?.edges?.map((e: any) => e.node.url) || [];
  const mainImage = images[0] || "/placeholder.jpg";
  const hoverImage = images[1] || mainImage;
  
  // Find the first available variant to add to cart quickly
  const firstAvailableVariant = product.variants?.edges?.find(
    (e: any) => e.node.availableForSale
  )?.node;

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (firstAvailableVariant) {
      await addItem(firstAvailableVariant.id, 1);
    }
  };

  return (
    <Link
      href={`/products/${handle}`}
      className={cn("group block w-full relative", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor-interactive="true"
      data-cursor-label="View"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-surface mb-4">
        <Image
          src={mainImage}
          alt={title}
          fill
          className={cn(
            "object-cover transition-opacity duration-700 ease-in-out",
            isHovered && images.length > 1 ? "opacity-0" : "opacity-100"
          )}
          sizes="(max-width: 768px) 50vw, 33vw"
        />
        {images.length > 1 && (
          <Image
            src={hoverImage}
            alt={`${title} alternate`}
            fill
            className={cn(
              "object-cover transition-transform duration-1000 ease-out transform",
              isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
            )}
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        )}

        {/* Quick Add Overlay Button + Brand Metadata */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
           <span className="bg-white text-black text-[10px] font-bold uppercase tracking-widest px-2 py-1">
             Oversized Fit
           </span>
           {title.toLowerCase().includes("acid") && (
             <span className="bg-black text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1">
               Premium Wash
             </span>
           )}
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-10">
          <button
            onClick={handleQuickAdd}
            disabled={!firstAvailableVariant}
            className="w-full glass-panel text-white py-3 px-6 uppercase tracking-wider text-[10px] font-bold hover:bg-white hover:text-black transition-colors duration-300"
          >
            {firstAvailableVariant ? "Quick Add" : "Sold Out"}
          </button>
        </div>
      </div>

      <div className="flex flex-col space-y-1">
        <h3 className="text-sm font-primary uppercase tracking-wide truncate">
          {title}
        </h3>
        <div className="flex items-center gap-3">
          <p className="text-sm text-foreground/80 font-medium">
            {currency} {price}
          </p>
          <span className="text-[10px] uppercase tracking-widest text-foreground/40">
            India
          </span>
        </div>
      </div>
    </Link>
  );
}
