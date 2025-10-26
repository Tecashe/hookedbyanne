"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { WishlistButton } from "@/components/wishlist-button"
import { TryOnButton } from "@/components/try-on-button"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface ProductVariant {
  id: string
  color: string | null
  size: string | null
  sku: string | null
  images: string[]
  price: number | null
  stock: number
  isAvailable: boolean
}

interface ProductVariantSelectorProps {
  product: {
    id: string
    name: string
    price: number
    images: string[]
    category: string
  }
  variants: ProductVariant[]
}

export function ProductVariantSelector({ product, variants }: ProductVariantSelectorProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(variants[0] || null)

  // Get unique colors and sizes
  const colors = Array.from(new Set(variants.map((v) => v.color).filter(Boolean)))
  const sizes = Array.from(new Set(variants.map((v) => v.size).filter(Boolean)))

  const currentPrice = selectedVariant?.price || product.price
  const currentStock = selectedVariant?.stock || 0
  const currentImages = selectedVariant?.images.length ? selectedVariant.images : product.images

  return (
    <div className="space-y-6">
      {/* Color Selector */}
      {colors.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-medium">
            Color: <span className="text-muted-foreground">{selectedVariant?.color || "Select"}</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => {
              const variant = variants.find((v) => v.color === color)
              const isSelected = selectedVariant?.color === color
              const isAvailable = variant?.isAvailable && (variant?.stock || 0) > 0

              return (
                <button
                  key={color}
                  onClick={() => variant && setSelectedVariant(variant)}
                  disabled={!isAvailable}
                  className={cn(
                    "relative h-12 w-12 rounded-full border-2 transition-all",
                    isSelected ? "border-primary ring-2 ring-primary ring-offset-2" : "border-muted",
                    !isAvailable && "opacity-50 cursor-not-allowed",
                  )}
                  title={color || undefined}
                >
                  {variant?.images[0] ? (
                    <Image
                      src={variant.images[0] || "/placeholder.svg"}
                      alt={color || "Color variant"}
                      fill
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full rounded-full" style={{ backgroundColor: color?.toLowerCase() }} />
                  )}
                  {isSelected && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-primary/20">
                      <Check className="h-5 w-5 text-primary" />
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Size Selector */}
      {sizes.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-medium">
            Size: <span className="text-muted-foreground">{selectedVariant?.size || "Select"}</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => {
              const variant = variants.find(
                (v) => v.size === size && (!selectedVariant?.color || v.color === selectedVariant.color),
              )
              const isSelected = selectedVariant?.size === size
              const isAvailable = variant?.isAvailable && (variant?.stock || 0) > 0

              return (
                <Button
                  key={size}
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  onClick={() => variant && setSelectedVariant(variant)}
                  disabled={!isAvailable}
                  className={cn(!isAvailable && "opacity-50")}
                >
                  {size}
                </Button>
              )
            })}
          </div>
        </div>
      )}

      {/* Variant Info */}
      {selectedVariant && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Selected Variant</p>
                <p className="text-xs text-muted-foreground">
                  {selectedVariant.color && `${selectedVariant.color}`}
                  {selectedVariant.color && selectedVariant.size && " • "}
                  {selectedVariant.size && `${selectedVariant.size}`}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">${currentPrice.toFixed(2)}</p>
                {currentStock > 0 ? (
                  <Badge className="bg-green-500/10 text-green-500 border-green-500/20">{currentStock} in stock</Badge>
                ) : (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4">
        <AddToCartButton
          product={{
            ...product,
            price: currentPrice,
            images: currentImages,
            stock: currentStock,
          }}
          variantId={selectedVariant?.id}
        />
        <WishlistButton productId={product.id} />
        {["accessories", "clothing", "hats", "scarves"].includes(product.category.toLowerCase()) && (
          <TryOnButton productId={product.id} />
        )}
      </div>
    </div>
  )
}
