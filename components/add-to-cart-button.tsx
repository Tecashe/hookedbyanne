"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { ConfettiEffect } from "./confetti-effect"

type Product = {
  id: string
  name: string
  price: number
  images: string[]
  stock: number
}

export function AddToCartButton({
  product,
  variantId,
}: {
  product: Product
  variantId?: string
}) {
  const { addItem } = useCart()
  const { toast } = useToast()
  const [showConfetti, setShowConfetti] = useState(false)

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      variantId,
      name: product.name,
      price: product.price,
      image: product.images[0] || "/placeholder.svg",
    })

    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 2500)

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <>
      <ConfettiEffect trigger={showConfetti} />
      <Button className="flex-1" size="lg" onClick={handleAddToCart} disabled={product.stock === 0}>
        <ShoppingCart className="mr-2 h-5 w-5" />
        {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
      </Button>
    </>
  )
}
