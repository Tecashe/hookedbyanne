// "use client"

// import { ShoppingCart, Heart, X } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { useCart } from "@/hooks/use-cart"
// import { useWishlist } from "@/hooks/use-wishlist"
// import { Badge } from "@/components/ui/badge"
// import { Card, CardContent } from "@/components/ui/card"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import Image from "next/image"
// import Link from "next/link"
// import { Separator } from "@/components/ui/separator"

// export function CartWishlistIcons() {
//   const { items: cartItems, getTotal, removeItem: removeFromCart } = useCart()
//   const { items: wishlistItems, getCount, removeItem: removeFromWishlist } = useWishlist()

//   const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
//   const wishlistCount = getCount()

//   return (
//     <div className="flex items-center gap-2">
//       <Popover>
//         <PopoverTrigger asChild>
//           <Button variant="ghost" size="icon" className="relative">
//             <Heart className="h-5 w-5" />
//             {wishlistCount > 0 && (
//               <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
//                 {wishlistCount}
//               </Badge>
//             )}
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-80" align="end">
//           <div className="space-y-3">
//             <div className="flex items-center justify-between">
//               <h4 className="font-semibold">Wishlist</h4>
//               <Badge variant="secondary">{wishlistCount} items</Badge>
//             </div>
//             <Separator />
//             {wishlistItems.length === 0 ? (
//               <p className="text-sm text-muted-foreground text-center py-4">Your wishlist is empty</p>
//             ) : (
//               <div className="space-y-2 max-h-[300px] overflow-y-auto">
//                 {wishlistItems.slice(0, 3).map((item) => (
//                   <Card key={item.productId} className="hover:bg-muted/50 transition-colors">
//                     <CardContent className="p-3 flex gap-3">
//                       <Link
//                         href={`/products/${item.productId}`}
//                         className="relative h-16 w-16 flex-shrink-0 rounded overflow-hidden"
//                       >
//                         <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
//                       </Link>
//                       <div className="flex-1 min-w-0">
//                         <Link href={`/products/${item.productId}`}>
//                           <p className="font-medium text-sm truncate hover:underline">{item.name}</p>
//                         </Link>
//                         <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
//                       </div>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         className="h-8 w-8 flex-shrink-0"
//                         onClick={(e) => {
//                           e.stopPropagation()
//                           removeFromWishlist(item.productId)
//                         }}
//                       >
//                         <X className="h-4 w-4" />
//                       </Button>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             )}
//             {wishlistItems.length > 0 && (
//               <>
//                 <Separator />
//                 <Button asChild className="w-full">
//                   <Link href="/wishlist">View All</Link>
//                 </Button>
//               </>
//             )}
//           </div>
//         </PopoverContent>
//       </Popover>

//       <Popover>
//         <PopoverTrigger asChild>
//           <Button variant="ghost" size="icon" className="relative">
//             <ShoppingCart className="h-5 w-5" />
//             {cartCount > 0 && (
//               <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
//                 {cartCount}
//               </Badge>
//             )}
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-80" align="end">
//           <div className="space-y-3">
//             <div className="flex items-center justify-between">
//               <h4 className="font-semibold">Shopping Cart</h4>
//               <Badge variant="secondary">{cartCount} items</Badge>
//             </div>
//             <Separator />
//             {cartItems.length === 0 ? (
//               <p className="text-sm text-muted-foreground text-center py-4">Your cart is empty</p>
//             ) : (
//               <div className="space-y-2 max-h-[300px] overflow-y-auto">
//                 {cartItems.slice(0, 3).map((item) => (
//                   <Card key={`${item.productId}-${item.variantId || "default"}`}>
//                     <CardContent className="p-3 flex gap-3">
//                       <div className="relative h-16 w-16 flex-shrink-0 rounded overflow-hidden">
//                         <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <p className="font-medium text-sm truncate">{item.name}</p>
//                         <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
//                         <p className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
//                       </div>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         className="h-8 w-8 flex-shrink-0"
//                         onClick={(e) => {
//                           e.stopPropagation()
//                           removeFromCart(item.productId, item.variantId)
//                         }}
//                       >
//                         <X className="h-4 w-4" />
//                       </Button>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             )}
//             {cartItems.length > 0 && (
//               <>
//                 <Separator />
//                 <div className="flex items-center justify-between font-semibold">
//                   <span>Total:</span>
//                   <span>${getTotal().toFixed(2)}</span>
//                 </div>
//                 <Button asChild className="w-full">
//                   <Link href="/cart">View Cart</Link>
//                 </Button>
//               </>
//             )}
//           </div>
//         </PopoverContent>
//       </Popover>
//     </div>
//   )
// }

"use client"

import { ShoppingCart, Heart, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import Image from "next/image"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { removeFromWishlist } from "@/actions/wishlist"
import { useEffect, useState } from "react"
import { toast } from "sonner"

async function fetchWishlist() {
  try {
    const response = await fetch("/api/wishlist")
    if (!response.ok) return []
    return await response.json()
  } catch {
    return []
  }
}

export function CartWishlistIcons() {
  const { items: cartItems, getTotal, removeItem: removeFromCart } = useCart()
  const [wishlistItems, setWishlistItems] = useState<any[]>([])

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const wishlistCount = wishlistItems.length

  const loadWishlist = async () => {
    const items = await fetchWishlist()
    setWishlistItems(items)
  }

  useEffect(() => {
    loadWishlist()

    const handleWishlistUpdate = () => {
      loadWishlist()
    }

    window.addEventListener("wishlist-updated", handleWishlistUpdate)
    return () => window.removeEventListener("wishlist-updated", handleWishlistUpdate)
  }, [])

  const handleRemoveFromWishlist = async (productId: string) => {
    try {
      await removeFromWishlist(productId)
      setWishlistItems((prev) => prev.filter((item) => item.productId !== productId))
      toast.success("Removed from wishlist")
      window.dispatchEvent(new CustomEvent("wishlist-updated"))
    } catch (error) {
      toast.error("Failed to remove from wishlist")
    }
  }

  const handleRemoveFromCart = (productId: string, variantId?: string) => {
    removeFromCart(productId, variantId)
    toast.success("Removed from cart")
  }

  return (
    <div className="flex items-center gap-2">
      <HoverCard openDelay={200} closeDelay={100}>
        <HoverCardTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Heart className="h-5 w-5" />
            {wishlistCount > 0 && (
              <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                {wishlistCount}
              </Badge>
            )}
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80" align="end">
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
                  <Card key={item.productId} className="hover:bg-muted/50 transition-colors">
                    <CardContent className="p-3 flex gap-3">
                      <Link
                        href={`/products/${item.productId}`}
                        className="relative h-16 w-16 flex-shrink-0 rounded overflow-hidden"
                      >
                        <Image
                          src={item.product?.images?.[0] || "/placeholder.svg"}
                          alt={item.product?.name || ""}
                          fill
                          className="object-cover"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link href={`/products/${item.productId}`}>
                          <p className="font-medium text-sm truncate hover:underline">{item.product?.name}</p>
                        </Link>
                        <p className="text-sm text-muted-foreground">${item.product?.price?.toFixed(2)}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 flex-shrink-0"
                        onClick={() => handleRemoveFromWishlist(item.productId)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
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
        </HoverCardContent>
      </HoverCard>

      <HoverCard openDelay={200} closeDelay={100}>
        <HoverCardTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                {cartCount}
              </Badge>
            )}
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80" align="end">
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
                      <Link
                        href={`/products/${item.productId}`}
                        className="relative h-16 w-16 flex-shrink-0 rounded overflow-hidden"
                      >
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link href={`/products/${item.productId}`}>
                          <p className="font-medium text-sm truncate hover:underline">{item.name}</p>
                        </Link>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        <p className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 flex-shrink-0"
                        onClick={() => handleRemoveFromCart(item.productId, item.variantId)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
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
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}
