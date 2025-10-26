"use client"

import { useCart } from "@/hooks/use-cart"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Trash2 } from "lucide-react"

export function CartItems() {
  const { items, updateQuantity, removeItem, getTotal } = useCart()

  if (items.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center">
        <p className="mb-4 text-lg font-medium">Your cart is empty</p>
        <Button asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-4">
        {items.map((item) => (
          <Card key={item.productId}>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="relative h-24 w-24 overflow-hidden rounded-lg">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <Link href={`/products/${item.productId}`} className="font-medium hover:text-primary">
                      {item.name}
                    </Link>
                    <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.productId, Number.parseInt(e.target.value))}
                        className="h-8 w-16 text-center"
                        min="1"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-4">
                      <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                      <Button variant="ghost" size="icon" onClick={() => removeItem(item.productId)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-bold">Order Summary</h2>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${getTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${getTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Button className="w-full" size="lg" asChild>
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>

            <Button variant="outline" className="w-full bg-transparent" asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
