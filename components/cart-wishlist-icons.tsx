"use client"

import { ShoppingCart, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { useWishlist } from "@/hooks/use-wishlist"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Image from "next/image"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export function CartWishlistIcons() {
  const { items: cartItems, getTotal } = useCart()
  const { items: wishlistItems, getCount } = useWishlist()

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const wishlistCount = getCount()

  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Heart className="h-5 w-5" />
            {wishlistCount > 0 && (
              <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                {wishlistCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="end">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">Wishlist</h4>
              <Badge variant="secondary">{wishlistCount} items</Badge>
            </div>
            <Separator />
            {wishlistItems.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">Your wishlist is empty</p>
            ) : (
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {wishlistItems.slice(0, 3).map((item) => (
                  <Link key={item.productId} href={`/products/${item.productId}`}>
                    <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                      <CardContent className="p-3 flex gap-3">
                        <div className="relative h-16 w-16 flex-shrink-0 rounded overflow-hidden">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{item.name}</p>
                          <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
            {wishlistItems.length > 0 && (
              <>
                <Separator />
                <Button asChild className="w-full">
                  <Link href="/wishlist">View All</Link>
                </Button>
              </>
            )}
          </div>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                {cartCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="end">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">Shopping Cart</h4>
              <Badge variant="secondary">{cartCount} items</Badge>
            </div>
            <Separator />
            {cartItems.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">Your cart is empty</p>
            ) : (
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {cartItems.slice(0, 3).map((item) => (
                  <Card key={`${item.productId}-${item.variantId || "default"}`}>
                    <CardContent className="p-3 flex gap-3">
                      <div className="relative h-16 w-16 flex-shrink-0 rounded overflow-hidden">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        <p className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            {cartItems.length > 0 && (
              <>
                <Separator />
                <div className="flex items-center justify-between font-semibold">
                  <span>Total:</span>
                  <span>${getTotal().toFixed(2)}</span>
                </div>
                <Button asChild className="w-full">
                  <Link href="/cart">View Cart</Link>
                </Button>
              </>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
