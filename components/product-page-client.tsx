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
    <div className="container py-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <ProductImageGallery product={product} selectedVariantId={selectedVariantId} />

        <div className="space-y-6">
          <ProductInfo product={product} />

          {product.hasVariants && product.variants && product.variants.length > 0 && (
            <ProductVariantSelector
              product={product}
              variants={product.variants}
              onVariantChange={setSelectedVariantId}
            />
          )}

          {product.tags.length > 0 && (
            <div>
              <h3 className="mb-2 text-sm font-medium">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="inline-block bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-12">
        <ProductReviews productId={product.id} reviews={product.reviews} />
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <RelatedProducts products={relatedProducts} />
        </div>
      )}
    </div>
  )
}
