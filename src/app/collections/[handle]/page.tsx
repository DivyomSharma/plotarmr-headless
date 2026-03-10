import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/queries";

interface Props {
  params: { handle: string };
}

// Simple component for now, filtering can be added based on the handle.
export default async function CollectionPage({ params }: Props) {
  // Pass higher limit for collections
  const products = await getProducts(20);

  const formatTitle = (handle: string) => {
    return handle.replace(/-/g, " ").toUpperCase();
  };

  return (
    <div className="pt-32 pb-24 min-h-screen px-4 md:px-8 max-w-[1800px] mx-auto">
      <div className="mb-16 border-b border-white/5 pb-8">
        <h1 className="text-4xl md:text-6xl font-primary uppercase tracking-widest">
          {formatTitle(params.handle)}
        </h1>
        <p className="mt-4 text-foreground/50 lowercase tracking-widest">
          {products.length} Products
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Basic Filter Sidebar area (Desktop) */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-32">
            <h3 className="uppercase tracking-widest text-sm mb-6 border-b border-white/10 pb-4">Filters</h3>
            <ul className="space-y-4 text-sm tracking-widest uppercase text-foreground/60">
              <li className="hover:text-white cursor-pointer transition-colors">All</li>
              <li className="hover:text-white cursor-pointer transition-colors">Available</li>
              <li className="hover:text-white cursor-pointer transition-colors">New In</li>
            </ul>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {products.map((edge: any) => (
            <ProductCard key={edge.node.id} product={edge.node} />
          ))}
        </div>
      </div>
    </div>
  );
}
