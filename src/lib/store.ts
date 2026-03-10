import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createCart, addToCart } from "./queries";

// Minimal Cart Interface
interface CartState {
  cartId: string | null;
  checkoutUrl: string | null;
  items: any[];
  isCartOpen: boolean;
  
  // Actions
  initCart: () => Promise<void>;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  setCartOpen: (isOpen: boolean) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartId: null,
      checkoutUrl: null,
      items: [],
      isCartOpen: false,

      initCart: async () => {
        const { cartId } = get();
        // If no cart exists in local storage, create a new one on Shopify
        if (!cartId) {
          try {
            const cart = await createCart();
            if (cart) {
              set({ cartId: cart.id, checkoutUrl: cart.checkoutUrl });
            }
          } catch (error) {
            console.error("Failed to initialize cart", error);
          }
        }
      },

      addItem: async (variantId: string, quantity = 1) => {
        let { cartId } = get();
        
        // Failsafe: if cart Id got cleared or doesn't exist, init first.
        if (!cartId) {
          await get().initCart();
          cartId = get().cartId;
        }

        if (!cartId) return;

        try {
          // Send mutation to Shopify App
          const updatedCart = await addToCart(cartId, variantId, quantity);
          
          if (updatedCart) {
            // Update local state with latest line items
            set({
              items: updatedCart.lines?.edges || [],
              checkoutUrl: updatedCart.checkoutUrl,
              isCartOpen: true, // Auto open cart drawer on add
            });
          }
        } catch (error) {
          console.error("Failed to add item to cart", error);
        }
      },

      setCartOpen: (isOpen: boolean) => {
        set({ isCartOpen: isOpen });
      },
    }),
    {
      name: "bluorng-cart-storage", // Save cart ID and checkout URL
    }
  )
);
