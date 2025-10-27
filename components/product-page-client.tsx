// "use client"

// import { useState } from "react"
// import { ProductImageGallery } from "@/components/product-image-gallery"
// import { ProductVariantSelector } from "@/components/product-variant-selector"
// import { ProductInfo } from "@/components/product-info"
// import { RelatedProducts } from "@/components/related-products"
// import { ProductReviews } from "@/components/product-reviews"

// export function ProductPageClient({ product, relatedProducts }: any) {
//   const [selectedVariantId, setSelectedVariantId] = useState<string | undefined>(product?.variants?.[0]?.id)

//   return (
//     <div className="container py-8 px-4 md:px-6">
//       {/* Main Product Section - Responsive Grid */}
//       <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 mb-12">
//         {/* Image Gallery - Sticky on desktop */}
//         <div className="order-1 lg:order-1 lg:sticky lg:top-24 lg:h-fit">
//           <ProductImageGallery product={product} selectedVariantId={selectedVariantId} />
//         </div>

//         {/* Product Info - Full width on mobile */}
//         <div className="order-2 lg:order-2 space-y-8">
//           <ProductInfo product={product} />

//           {/* Variant Selector with divider */}
//           {product.hasVariants && product.variants && product.variants.length > 0 && (
//             <div className="border-t pt-8">
//               <h2 className="text-lg font-semibold mb-6">Choose Your Style</h2>
//               <ProductVariantSelector
//                 product={product}
//                 variants={product.variants}
//                 onVariantChange={setSelectedVariantId}
//               />
//             </div>
//           )}

//           {/* Tags Section */}
//           {product.tags.length > 0 && (
//             <div className="border-t pt-8">
//               <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide">Product Tags</h3>
//               <div className="flex flex-wrap gap-2">
//                 {product.tags.map((tag: string) => (
//                   <span
//                     key={tag}
//                     className="inline-block bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-xs font-medium hover:bg-secondary/80 transition-colors"
//                   >
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Divider */}
//       <div className="border-t my-12" />

//       {/* Reviews Section */}
//       {product.reviews && product.reviews.length > 0 && (
//         <div className="py-12">
//           <ProductReviews productId={product.id} reviews={product.reviews} />
//         </div>
//       )}

//       {/* Divider */}
//       {relatedProducts.length > 0 && <div className="border-t my-12" />}

//       {/* Related Products Section */}
//       {relatedProducts.length > 0 && (
//         <div className="py-12">
//           <h2 className="text-2xl md:text-3xl font-bold mb-8 text-balance">You Might Also Like</h2>
//           <RelatedProducts products={relatedProducts} />
//         </div>
//       )}
//     </div>
//   )
// }


"use client"

import { useState } from "react"
import { ProductImageGallery } from "@/components/product-image-gallery"
import { ProductVariantSelector } from "@/components/product-variant-selector"
import { ProductInfo } from "@/components/product-info"
import { RelatedProducts } from "@/components/related-products"
import { ProductReviews } from "@/components/product-reviews"

export function ProductPageClient({ product, relatedProducts }: any) {
  const [selectedVariantId, setSelectedVariantId] = useState<string | undefined>(product?.variants?.[0]?.id)

  return (
    <div className="min-h-screen bg-background">
      <div className="lg:hidden">
        {/* Mobile Layout - Image sticky at top, variants below */}
        <div className="fixed top-0 left-0 right-0 z-40 bg-background border-b">
          <div className="h-screen max-h-[60vh] overflow-hidden">
            <ProductImageGallery product={product} selectedVariantId={selectedVariantId} />
          </div>
        </div>

        {/* Mobile content area with top padding for sticky image */}
        <div className="pt-[60vh] pb-32 px-4">
          {/* Variant Selector - Primary focus on mobile */}
          {product.hasVariants && product.variants && product.variants.length > 0 && (
            <div className="mb-8 bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-6">Select Your Style</h2>
              <ProductVariantSelector
                product={product}
                variants={product.variants}
                onVariantChange={setSelectedVariantId}
              />
            </div>
          )}

          {/* Product Info */}
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
            <ProductInfo product={product} />
          </div>

          {/* Tags */}
          {product.tags.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide">Product Tags</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="inline-block bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Reviews */}
          {product.reviews && product.reviews.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
              <ProductReviews productId={product.id} reviews={product.reviews} />
            </div>
          )}

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
              <RelatedProducts products={relatedProducts} />
            </div>
          )}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block container py-8 px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 mb-12">
          {/* Image Gallery - Sticky on desktop */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <ProductImageGallery product={product} selectedVariantId={selectedVariantId} />
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <ProductInfo product={product} />

            {/* Variant Selector */}
            {product.hasVariants && product.variants && product.variants.length > 0 && (
              <div className="border-t pt-8">
                <h2 className="text-lg font-semibold mb-6">Choose Your Style</h2>
                <ProductVariantSelector
                  product={product}
                  variants={product.variants}
                  onVariantChange={setSelectedVariantId}
                />
              </div>
            )}

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="border-t pt-8">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide">Product Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="inline-block bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-xs font-medium hover:bg-secondary/80 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t my-12" />

        {/* Reviews Section */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="py-12">
            <ProductReviews productId={product.id} reviews={product.reviews} />
          </div>
        )}

        {/* Divider */}
        {relatedProducts.length > 0 && <div className="border-t my-12" />}

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="py-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-balance">You Might Also Like</h2>
            <RelatedProducts products={relatedProducts} />
          </div>
        )}
      </div>
    </div>
  )
}
