import ProductCard from "@/components/ProductCard";
import { TextReveal } from "@/components/animations";
import { getProducts } from "@/lib/queries";

export default async function FeaturedProducts() {
  const products = await getProducts(4);

  return (
    <section className="py-24 md:py-32 px-4 md:px-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16">
        <div>
          <TextReveal>
            <h2 className="text-4xl md:text-5xl font-primary uppercase tracking-wider">
              New Arrivals
            </h2>
          </TextReveal>
          <TextReveal delay={0.2}>
            <p className="mt-4 text-foreground/60 max-w-xl text-sm tracking-widest uppercase">
              The latest pieces from Collection 001. Crafted with precision for the modern wardrobe.
            </p>
          </TextReveal>
        </div>
        
        <TextReveal delay={0.3} className="hidden md:block">
          <a href="/collections/all" className="inline-block border-b border-foreground pb-1 text-sm tracking-widest uppercase hover:text-accent hover:border-accent transition-colors">
            View All Products
          </a>
        </TextReveal>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
        {products.map((edge: any) => (
          <ProductCard key={edge.node.id} product={edge.node} />
        ))}
      </div>
      
      <div className="mt-12 md:hidden text-center">
        <a href="/collections/all" className="inline-block border-b border-foreground pb-1 text-sm tracking-widest uppercase hover:text-accent hover:border-accent transition-colors">
          View All Products
        </a>
      </div>
    </section>
  );
}
