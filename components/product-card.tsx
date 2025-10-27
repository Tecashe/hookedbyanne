// "use client"

// import Image from "next/image"
// import Link from "next/link"
// import { Card, CardContent, CardFooter } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Heart, ShoppingCart } from "lucide-react"
// import { useCart } from "@/hooks/use-cart"
// import { addToWishlist, removeFromWishlist, isInWishlist } from "@/actions/wishlist"
// import { useState, useEffect } from "react"
// import { useAuth } from "@clerk/nextjs"

// type Product = {
//   id: string
//   name: string
//   price: number
//   compareAtPrice: number | null
//   images: string[]
//   category: string
//   stock: number
//   featured: boolean
//   isNewArrival: boolean
// }

// export function ProductCard({ product }: { product: Product }) {
//   const { addItem } = useCart()
//   const { isSignedIn } = useAuth()
//   const [inWishlist, setInWishlist] = useState(false)
//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     if (isSignedIn) {
//       isInWishlist(product.id).then(setInWishlist)
//     }
//   }, [product.id, isSignedIn])

//   const handleAddToCart = () => {
//     addItem({
//       productId: product.id,
//       name: product.name,
//       price: product.price,
//       image: product.images[0] || "/placeholder.svg",
//     })
//   }

//   const handleWishlist = async () => {
//     if (!isSignedIn) return
//     setLoading(true)
//     try {
//       if (inWishlist) {
//         await removeFromWishlist(product.id)
//         setInWishlist(false)
//       } else {
//         await addToWishlist(product.id)
//         setInWishlist(true)
//       }
//     } catch (error) {
//       console.error("Wishlist error:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const discount = product.compareAtPrice
//     ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
//     : 0

//   return (
//     <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
//       <Link href={`/products/${product.id}`}>
//         <div className="relative aspect-square overflow-hidden bg-muted">
//           <Image
//             src={product.images[0] || "/placeholder.svg"}
//             alt={product.name}
//             fill
//             className="object-cover transition-transform group-hover:scale-105"
//           />
//           {product.isNewArrival && (
//             <Badge className="absolute left-3 top-3 bg-accent text-accent-foreground">New</Badge>
//           )}
//           {discount > 0 && (
//             <Badge className="absolute right-3 top-3 bg-destructive text-destructive-foreground">-{discount}%</Badge>
//           )}
//           {product.stock === 0 && (
//             <div className="absolute inset-0 flex items-center justify-center bg-black/50">
//               <Badge variant="secondary">Out of Stock</Badge>
//             </div>
//           )}
//         </div>
//       </Link>

//       <CardContent className="p-4">
//         <Link href={`/products/${product.id}`}>
//           <h3 className="font-semibold text-balance line-clamp-2 group-hover:text-primary transition-colors">
//             {product.name}
//           </h3>
//         </Link>
//         <p className="mt-1 text-sm text-muted-foreground">{product.category}</p>
//         <div className="mt-2 flex items-center gap-2">
//           <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
//           {product.compareAtPrice && (
//             <span className="text-sm text-muted-foreground line-through">${product.compareAtPrice.toFixed(2)}</span>
//           )}
//         </div>
//       </CardContent>

//       <CardFooter className="p-4 pt-0 flex gap-2">
//         <Button className="flex-1" onClick={handleAddToCart} disabled={product.stock === 0}>
//           <ShoppingCart className="mr-2 h-4 w-4" />
//           Add to Cart
//         </Button>
//         {isSignedIn && (
//           <Button
//             variant="outline"
//             size="icon"
//             onClick={handleWishlist}
//             disabled={loading}
//             className={inWishlist ? "text-red-500" : ""}
//           >
//             <Heart className={`h-4 w-4 ${inWishlist ? "fill-current" : ""}`} />
//           </Button>
//         )}
//       </CardFooter>
//     </Card>
//   )
// }


"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { addToWishlist, removeFromWishlist, isInWishlist } from "@/actions/wishlist"
import { useState, useEffect } from "react"
import { useAuth } from "@clerk/nextjs"

type ProductVariant = {
  id: string
  color: string | null
  colorHex: string | null
  size: string | null
  images: string[]
  price: number | null
  stock: number
}

type Product = {
  id: string
  name: string
  price: number
  compareAtPrice: number | null
  images: string[]
  category: string
  stock: number
  featured: boolean
  isNewArrival: boolean
  hasVariants?: boolean
  variants?: ProductVariant[]
}

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const { isSignedIn } = useAuth()
  const [inWishlist, setInWishlist] = useState(false)
  const [loading, setLoading] = useState(false)

  const getProductImage = () => {
    if (product.images && product.images.length > 0) {
      return product.images[0]
    }
    if (product.hasVariants && product.variants && product.variants.length > 0) {
      const firstVariantWithImage = product.variants.find((v) => v.images && v.images.length > 0)
      if (firstVariantWithImage) {
        return firstVariantWithImage.images[0]
      }
    }
    return "/placeholder.svg"
  }

  const productImage = getProductImage()

  useEffect(() => {
    if (isSignedIn) {
      isInWishlist(product.id).then(setInWishlist)
    }
  }, [product.id, isSignedIn])

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: productImage,
    })
  }

  const handleWishlist = async () => {
    if (!isSignedIn) return
    setLoading(true)
    try {
      if (inWishlist) {
        await removeFromWishlist(product.id)
        setInWishlist(false)
      } else {
        await addToWishlist(product.id)
        setInWishlist(true)
      }
    } catch (error) {
      console.error("Wishlist error:", error)
    } finally {
      setLoading(false)
    }
  }

  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0

  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={productImage || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          {product.isNewArrival && (
            <Badge className="absolute left-3 top-3 bg-accent text-accent-foreground">New</Badge>
          )}
          {discount > 0 && (
            <Badge className="absolute right-3 top-3 bg-destructive text-destructive-foreground">-{discount}%</Badge>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <Badge variant="secondary">Out of Stock</Badge>
            </div>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-balance line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 text-sm text-muted-foreground">{product.category}</p>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          {product.compareAtPrice && (
            <span className="text-sm text-muted-foreground line-through">${product.compareAtPrice.toFixed(2)}</span>
          )}
        </div>
        {product.hasVariants && product.variants && product.variants.length > 0 && (
          <p className="mt-1 text-xs text-muted-foreground">{product.variants.length} variants available</p>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button className="flex-1" onClick={handleAddToCart} disabled={product.stock === 0}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
        {isSignedIn && (
          <Button
            variant="outline"
            size="icon"
            onClick={handleWishlist}
            disabled={loading}
            className={inWishlist ? "text-red-500" : ""}
          >
            <Heart className={`h-4 w-4 ${inWishlist ? "fill-current" : ""}`} />
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
