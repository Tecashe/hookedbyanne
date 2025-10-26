"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"

type Product = {
  id: string
  name: string
  price: number
  images: string[]
  stock: number
}

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
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

  return (
    <Button className="flex-1" size="lg" onClick={handleAddToCart} disabled={product.stock === 0}>
      <ShoppingCart className="mr-2 h-5 w-5" />
      Add to Cart
    </Button>
  )
}
