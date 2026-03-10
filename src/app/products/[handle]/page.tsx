import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/queries";
import VariantSelector from "@/components/VariantSelector";

interface Props {
  params: { handle: string };
}

export default async function ProductPage({ params }: Props) {
  const product = await getProductByHandle(params.handle);

  if (!product) {
    notFound();
  }

  const images = product.images?.edges?.map((e: any) => e.node) || [];
  const price = product.priceRange?.minVariantPrice?.amount;
  const currency = product.priceRange?.minVariantPrice?.currencyCode;

  return (
    <div className="pt-24 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8 max-w-[1800px] mx-auto px-4 lg:px-8">
        
        {/* Left Side: Image Gallery */}
        <div className="lg:col-span-8 flex flex-col gap-4 lg:gap-8">
          {images.map((image: any, idx: number) => (
            <div key={idx} className="relative aspect-[4/5] w-full bg-surface">
              <Image
                src={image.url}
                alt={image.altText || product.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
                priority={idx === 0}
              />
            </div>
          ))}
        </div>

        {/* Right Side: Sticky Product Info */}
        <div className="lg:col-span-4 py-8 lg:py-12">
          <div className="lg:sticky lg:top-32 flex flex-col space-y-6">
            <div>
              <h1 className="text-3xl lg:text-5xl font-primary uppercase tracking-wider mb-4">
                {product.title}
              </h1>
              <p className="text-xl font-secondary text-foreground/80">
                {currency} {price}
              </p>
            </div>

            <VariantSelector product={product} />

            <VariantSelector product={product} />

            <div className="pt-8 space-y-8 font-secondary text-sm">
                <div className="prose prose-invert max-w-none text-foreground/80 leading-relaxed font-light">
                  <p>
                    {product.description || "Designed in New Delhi. Crafted for those who survive the plot twists. A staple piece in the Plot Armour collection featuring our signature oversized silhouette and drop-shoulder construction for an effortless streetwear drape."}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-xs uppercase tracking-widest text-foreground/60 border-y border-white/5 py-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-white">Fit</span>
                    <span>Oversized / Boxy</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-white">Fabric</span>
                    <span>Premium Heavyweight Cotton</span>
                  </div>
                  <div className="flex flex-col gap-1 mt-4">
                    <span className="text-white">Origin</span>
                    <span>New Delhi, India</span>
                  </div>
                  <div className="flex flex-col gap-1 mt-4">
                    <span className="text-white">Wash Care</span>
                    <span>Machine wash cold</span>
                  </div>
                </div>
            </div>

            <div className="pt-4 space-y-6 text-sm text-foreground/60 uppercase tracking-widest">
               <div className="flex justify-between border-b border-white/5 pb-4">
                 <span>Shipping</span>
                 <span>Calculated at checkout</span>
               </div>
               <div className="flex justify-between border-b border-white/5 pb-4">
                 <span>Returns</span>
                 <span>7 Days Easy Return</span>
               </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
