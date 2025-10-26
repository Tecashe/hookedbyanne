"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart } from "lucide-react"
import { removeFromWishlist } from "@/actions/wishlist"
import { useCart } from "@/hooks/use-cart"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

type WishlistItem = {
  id: string
  product: {
    id: string
    name: string
    price: number
    compareAtPrice: number | null
    images: string[]
    category: string
    stock: number
  }
}

export function WishlistItems({ items }: { items: WishlistItem[] }) {
  const router = useRouter()
  const { addItem } = useCart()
  const { toast } = useToast()

  const handleRemove = async (productId: string) => {
    await removeFromWishlist(productId)
    router.refresh()
    toast({
      title: "Removed from wishlist",
      description: "Item has been removed from your wishlist.",
    })
  }

  const handleAddToCart = (product: WishlistItem["product"]) => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || "/placeholder.svg",
    })
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center">
        <Heart className="mb-4 h-16 w-16 text-muted-foreground" />
        <p className="mb-2 text-lg font-medium">Your wishlist is empty</p>
        <p className="mb-4 text-muted-foreground">Save items you love for later</p>
        <Button asChild>
          <Link href="/products">Start Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <Link href={`/products/${item.product.id}`}>
            <div className="relative aspect-square overflow-hidden bg-muted">
              <Image
                src={item.product.images[0] || "/placeholder.svg"}
                alt={item.product.name}
                fill
                className="object-cover transition-transform hover:scale-105"
              />
              {item.product.stock === 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <Badge variant="secondary">Out of Stock</Badge>
                </div>
              )}
            </div>
          </Link>

          <CardContent className="p-4 space-y-3">
            <Link href={`/products/${item.product.id}`}>
              <h3 className="font-semibold line-clamp-2 hover:text-primary transition-colors">{item.product.name}</h3>
            </Link>
            <p className="text-sm text-muted-foreground">{item.product.category}</p>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">${item.product.price.toFixed(2)}</span>
              {item.product.compareAtPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${item.product.compareAtPrice.toFixed(2)}
                </span>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                className="flex-1"
                onClick={() => handleAddToCart(item.product)}
                disabled={item.product.stock === 0}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              <Button variant="outline" size="icon" onClick={() => handleRemove(item.product.id)}>
                <Heart className="h-4 w-4 fill-current text-red-500" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
