"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Package, Truck, Shield } from "lucide-react"

interface ProductInfoProps {
  product: {
    id: string
    name: string
    description: string
    price: number
    compareAtPrice: number | null
    category: string
    tags: string[]
    stock: number
    featured: boolean
    isNewArrival: boolean
    reviews: Array<{ rating: number }>
  }
}

export function ProductInfo({ product }: ProductInfoProps) {
  const averageRating =
    product.reviews.length > 0
      ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
      : 0

  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-2 flex items-center gap-2 flex-wrap">
          <Badge variant="secondary">{product.category}</Badge>
          {product.isNewArrival && <Badge className="bg-accent text-accent-foreground">New Arrival</Badge>}
          {product.featured && <Badge>Featured</Badge>}
        </div>
        <h1 className="text-3xl font-bold md:text-4xl text-balance">{product.name}</h1>

        {product.reviews.length > 0 && (
          <div className="mt-3 flex items-center gap-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-muted"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {averageRating.toFixed(1)} ({product.reviews.length} {product.reviews.length === 1 ? "review" : "reviews"}
              )
            </span>
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-3">
        <span className="text-4xl font-bold">${product.price.toFixed(2)}</span>
        {product.compareAtPrice && (
          <>
            <span className="text-xl text-muted-foreground line-through">${product.compareAtPrice.toFixed(2)}</span>
            <Badge variant="destructive">Save {discount}%</Badge>
          </>
        )}
      </div>

      <p className="text-muted-foreground leading-relaxed text-pretty">{product.description}</p>

      {/* Product Features */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Package className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium">Handmade</p>
              <p className="text-xs text-muted-foreground">Crafted with care</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Truck className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium">Free Shipping</p>
              <p className="text-xs text-muted-foreground">On orders over $50</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Shield className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium">Quality Guarantee</p>
              <p className="text-xs text-muted-foreground">30-day returns</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Package className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium">{product.stock > 0 ? `${product.stock} in stock` : "Out of Stock"}</p>
              <p className="text-xs text-muted-foreground">
                {product.stock > 0 ? "Ready to ship" : "Notify when available"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {product.tags.length > 0 && (
        <div>
          <h3 className="mb-2 text-sm font-medium">Tags:</h3>
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
