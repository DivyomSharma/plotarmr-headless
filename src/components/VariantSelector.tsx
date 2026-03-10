"use client";

import { useState } from "react";
import { useCartStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function VariantSelector({ product }: { product: any }) {
  const { addItem } = useCartStore();
  const variants = product.variants?.edges?.map((e: any) => e.node) || [];
  
  const [selectedVariant, setSelectedVariant] = useState(variants[0]);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (!selectedVariant || !selectedVariant.availableForSale) return;
    
    setIsAdding(true);
    await addItem(selectedVariant.id, 1);
    setIsAdding(false);
  };

  return (
    <div className="flex flex-col space-y-8 mt-8">
      <div className="flex flex-col space-y-4">
        <label className="text-xs uppercase tracking-widest text-foreground/50">
          Select Size
        </label>
        <div className="flex flex-wrap gap-3">
          {variants.map((variant: any) => (
            <button
              key={variant.id}
              onClick={() => setSelectedVariant(variant)}
              disabled={!variant.availableForSale}
              className={cn(
                "px-6 py-3 text-sm tracking-widest uppercase transition-all duration-300 border cursor-none",
                selectedVariant?.id === variant.id 
                  ? "border-foreground bg-foreground text-background" 
                  : "border-white/20 hover:border-foreground",
                !variant.availableForSale && "opacity-30 line-through cursor-not-allowed hidden"
              )}
              data-cursor-interactive="true"
            >
              {variant.title === "Default Title" ? "One Size" : variant.title}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={!selectedVariant?.availableForSale || isAdding}
        className={cn(
          "w-full py-5 text-sm font-medium tracking-widest uppercase transition-all duration-300 cursor-none",
          selectedVariant?.availableForSale
            ? "bg-white text-black hover:bg-black hover:text-white border border-white"
            : "bg-surface text-foreground/50 cursor-not-allowed border border-white/10"
        )}
        data-cursor-interactive="true"
        data-cursor-label={isAdding ? "Wait" : "Add"}
      >
        {isAdding
          ? "Adding..."
          : selectedVariant?.availableForSale
          ? "Add to Cart"
          : "Out of Stock"}
      </button>

      <div className="text-sm text-foreground/70 leading-relaxed font-secondary pt-6 border-t border-white/10">
        <div dangerouslySetInnerHTML={{ __html: product.description }} />
      </div>
    </div>
  );
}
