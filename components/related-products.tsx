import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface RelatedProductsProps {
  products: Array<{
    id: string
    name: string
    price: number
    compareAtPrice: number | null
    images: string[]
    category: string
  }>
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => {
          const discount = product.compareAtPrice
            ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
            : 0

          return (
            <Link key={product.id} href={`/products/${product.id}`}>
              <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {discount > 0 && (
                    <Badge className="absolute top-2 right-2" variant="destructive">
                      -{discount}%
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium text-sm mb-1 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">${product.price.toFixed(2)}</span>
                    {product.compareAtPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${product.compareAtPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
