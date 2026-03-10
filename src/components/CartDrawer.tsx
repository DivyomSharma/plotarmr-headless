"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { gsap } from "gsap";
import { useCartStore } from "@/lib/store";

export default function CartDrawer() {
  const { isCartOpen, setCartOpen, items, checkoutUrl } = useCartStore();
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Calculate cart total dynamically
  const cartTotal = items.reduce((total, edge) => {
    const item = edge.node;
    const price = parseFloat(item.merchandise.price.amount);
    return total + price * item.quantity;
  }, 0);

  const currencyCode = items.length > 0 ? items[0].node.merchandise.price.currencyCode : "USD";

  useEffect(() => {
    const drawer = drawerRef.current;
    const overlay = overlayRef.current;
    if (!drawer || !overlay) return;

    if (isCartOpen) {
      document.body.style.overflow = "hidden"; // Prevent background scroll
      gsap.to(overlay, { 
        autoAlpha: 1, 
        duration: 0.4, 
        ease: "power2.out" 
      });
      gsap.to(drawer, { 
        x: "0%", 
        duration: 0.5, 
        ease: "power3.out" 
      });
    } else {
      document.body.style.overflow = "";
      gsap.to(drawer, { 
        x: "100%", 
        duration: 0.4, 
        ease: "power3.in" 
      });
      gsap.to(overlay, { 
        autoAlpha: 0, 
        duration: 0.4, 
        ease: "power2.in" 
      });
    }
  }, [isCartOpen]);

  return (
    <>
      <div 
        ref={overlayRef}
        onClick={() => setCartOpen(false)}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 invisible opacity-0 cursor-none"
        data-cursor-interactive="true"
        data-cursor-label="Close"
      />
      
      <div
        ref={drawerRef}
        className="fixed top-0 right-0 h-screen w-full max-w-md bg-surface border-l border-white/10 z-50 flex flex-col transform translate-x-full"
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-primary uppercase tracking-widest flex items-center gap-2">
            <ShoppingBag size={20} className="text-accent" />
            Your Cart ({items.length})
          </h2>
          <button 
            onClick={() => setCartOpen(false)}
            className="p-2 hover:bg-white/5 rounded-full transition-colors cursor-none"
            data-cursor-interactive="true"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-foreground/50 space-y-4">
              <ShoppingBag size={48} strokeWidth={1} />
              <p className="uppercase tracking-widest text-sm">Your cart is empty</p>
            </div>
          ) : (
            items.map((edge) => {
              const item = edge.node;
              const product = item.merchandise.product;
              const image = product.images.edges[0]?.node.url || "/placeholder.jpg";
              
              return (
                <div key={item.id} className="flex gap-4 group">
                  <div className="relative w-24 h-32 flex-shrink-0 bg-black/20">
                    <Image
                      src={image}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h3 className="text-sm font-primary uppercase tracking-wide truncate max-w-[200px]">
                        {product.title}
                      </h3>
                      <p className="text-xs text-foreground/50 uppercase tracking-widest mt-1">
                        {item.merchandise.title !== "Default Title" ? item.merchandise.title : ""}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3 border border-white/20 px-3 py-1 bg-black/20">
                        <button className="text-foreground/50 hover:text-white transition-colors cursor-none" data-cursor-interactive="true">
                          <Minus size={14} />
                        </button>
                        <span className="text-sm w-4 text-center">{item.quantity}</span>
                        <button className="text-foreground/50 hover:text-white transition-colors cursor-none" data-cursor-interactive="true">
                          <Plus size={14} />
                        </button>
                      </div>
                      <p className="text-sm">
                        {item.merchandise.price.currencyCode} {item.merchandise.price.amount}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-surface">
            <div className="flex justify-between items-center mb-6">
              <span className="uppercase tracking-widest text-sm text-foreground/70">Subtotal</span>
              <span className="font-primary text-xl">
                {currencyCode} {cartTotal.toFixed(2)}
              </span>
            </div>
            <a
              href={checkoutUrl || "#"}
              className="w-full block text-center bg-white text-black py-4 uppercase tracking-widest text-sm font-medium hover:bg-accent hover:text-white transition-colors duration-300 cursor-none"
              data-cursor-interactive="true"
              data-cursor-label="Pay"
            >
              Checkout Securely
            </a>
          </div>
        )}
      </div>
    </>
  );
}
