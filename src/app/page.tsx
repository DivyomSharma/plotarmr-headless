import HeroEditorial from "@/components/HeroEditorial";
import Marquee from "@/components/Marquee";
import FeaturedProducts from "@/components/FeaturedProducts";
import CollectionsShowcase from "@/components/CollectionsShowcase";
import CartDrawer from "@/components/CartDrawer";

export default function Home() {
  return (
    <>
      <HeroEditorial />
      <Marquee />
      <FeaturedProducts />
      <CollectionsShowcase />
      <CartDrawer />
      
      {/* Spacer to allow scrolling past horizontal container */}
      <div className="h-[20vh] w-full bg-background flex flex-col items-center justify-center border-t border-white/10">
        <h3 className="text-sm font-secondary uppercase tracking-[0.3em] font-light text-foreground/50">
          The Armoury By PlotArmour
        </h3>
      </div>
    </>
  );
}
