// "use client"

// import { useState } from "react"
// import Image from "next/image"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { AddToCartButton } from "@/components/add-to-cart-button"
// import { WishlistButton } from "@/components/wishlist-button"
// import { TryOnButton } from "@/components/try-on-button"
// import { cn } from "@/lib/utils"
// import { Check } from "lucide-react"

// interface ProductVariant {
//   id: string
//   color: string | null
//   size: string | null
//   sku: string | null
//   images: string[]
//   price: number | null
//   stock: number
//   isAvailable: boolean
// }

// interface ProductVariantSelectorProps {
//   product: {
//     id: string
//     name: string
//     price: number
//     images: string[]
//     category: string
//   }
//   variants: ProductVariant[]
// }

// export function ProductVariantSelector({ product, variants }: ProductVariantSelectorProps) {
//   const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(variants[0] || null)

//   // Get unique colors and sizes
//   const colors = Array.from(new Set(variants.map((v) => v.color).filter(Boolean)))
//   const sizes = Array.from(new Set(variants.map((v) => v.size).filter(Boolean)))

//   const currentPrice = selectedVariant?.price || product.price
//   const currentStock = selectedVariant?.stock || 0
//   const currentImages = selectedVariant?.images.length ? selectedVariant.images : product.images

//   return (
//     <div className="space-y-6">
//       {/* Color Selector */}
//       {colors.length > 0 && (
//         <div>
//           <h3 className="mb-3 text-sm font-medium">
//             Color: <span className="text-muted-foreground">{selectedVariant?.color || "Select"}</span>
//           </h3>
//           <div className="flex flex-wrap gap-2">
//             {colors.map((color) => {
//               const variant = variants.find((v) => v.color === color)
//               const isSelected = selectedVariant?.color === color
//               const isAvailable = variant?.isAvailable && (variant?.stock || 0) > 0

//               return (
//                 <button
//                   key={color}
//                   onClick={() => variant && setSelectedVariant(variant)}
//                   disabled={!isAvailable}
//                   className={cn(
//                     "relative h-12 w-12 rounded-full border-2 transition-all",
//                     isSelected ? "border-primary ring-2 ring-primary ring-offset-2" : "border-muted",
//                     !isAvailable && "opacity-50 cursor-not-allowed",
//                   )}
//                   title={color || undefined}
//                 >
//                   {variant?.images[0] ? (
//                     <Image
//                       src={variant.images[0] || "/placeholder.svg"}
//                       alt={color || "Color variant"}
//                       fill
//                       className="rounded-full object-cover"
//                     />
//                   ) : (
//                     <div className="h-full w-full rounded-full" style={{ backgroundColor: color?.toLowerCase() }} />
//                   )}
//                   {isSelected && (
//                     <div className="absolute inset-0 flex items-center justify-center rounded-full bg-primary/20">
//                       <Check className="h-5 w-5 text-primary" />
//                     </div>
//                   )}
//                 </button>
//               )
//             })}
//           </div>
//         </div>
//       )}

//       {/* Size Selector */}
//       {sizes.length > 0 && (
//         <div>
//           <h3 className="mb-3 text-sm font-medium">
//             Size: <span className="text-muted-foreground">{selectedVariant?.size || "Select"}</span>
//           </h3>
//           <div className="flex flex-wrap gap-2">
//             {sizes.map((size) => {
//               const variant = variants.find(
//                 (v) => v.size === size && (!selectedVariant?.color || v.color === selectedVariant.color),
//               )
//               const isSelected = selectedVariant?.size === size
//               const isAvailable = variant?.isAvailable && (variant?.stock || 0) > 0

//               return (
//                 <Button
//                   key={size}
//                   variant={isSelected ? "default" : "outline"}
//                   size="sm"
//                   onClick={() => variant && setSelectedVariant(variant)}
//                   disabled={!isAvailable}
//                   className={cn(!isAvailable && "opacity-50")}
//                 >
//                   {size}
//                 </Button>
//               )
//             })}
//           </div>
//         </div>
//       )}

//       {/* Variant Info */}
//       {selectedVariant && (
//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium">Selected Variant</p>
//                 <p className="text-xs text-muted-foreground">
//                   {selectedVariant.color && `${selectedVariant.color}`}
//                   {selectedVariant.color && selectedVariant.size && " • "}
//                   {selectedVariant.size && `${selectedVariant.size}`}
//                 </p>
//               </div>
//               <div className="text-right">
//                 <p className="text-lg font-bold">${currentPrice.toFixed(2)}</p>
//                 {currentStock > 0 ? (
//                   <Badge className="bg-green-500/10 text-green-500 border-green-500/20">{currentStock} in stock</Badge>
//                 ) : (
//                   <Badge variant="destructive">Out of Stock</Badge>
//                 )}
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {/* Action Buttons */}
//       <div className="flex gap-4">
//         <AddToCartButton
//           product={{
//             ...product,
//             price: currentPrice,
//             images: currentImages,
//             stock: currentStock,
//           }}
//           variantId={selectedVariant?.id}
//         />
//         <WishlistButton productId={product.id} />
//         {["accessories", "clothing", "hats", "scarves"].includes(product.category.toLowerCase()) && (
//           <TryOnButton productId={product.id} />
//         )}
//       </div>
//     </div>
//   )
// }

// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { AddToCartButton } from "@/components/add-to-cart-button"
// import { WishlistButton } from "@/components/wishlist-button"
// import { TryOnButton } from "@/components/try-on-button"
// import { cn } from "@/lib/utils"
// import { Check } from "lucide-react"

// interface ProductVariant {
//   id: string
//   color: string | null
//   colorHex: string | null
//   size: string | null
//   sku: string | null
//   images: string[]
//   price: number | null
//   stock: number
//   isAvailable: boolean
// }

// interface ProductVariantSelectorProps {
//   product: {
//     id: string
//     name: string
//     price: number
//     images: string[]
//     category: string
//   }
//   variants: ProductVariant[]
// }

// export function ProductVariantSelector({ product, variants }: ProductVariantSelectorProps) {
//   const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(variants[0] || null)

//   // Get unique colors and sizes
//   const colors = Array.from(new Set(variants.map((v) => v.color).filter(Boolean)))
//   const sizes = Array.from(new Set(variants.map((v) => v.size).filter(Boolean)))

//   const currentPrice = selectedVariant?.price || product.price
//   const currentStock = selectedVariant?.stock || 0
//   const currentImages = selectedVariant?.images.length ? selectedVariant.images : product.images

//   return (
//     <div className="space-y-6">
//       {/* Color Selector */}
//       {colors.length > 0 && (
//         <div>
//           <h3 className="mb-3 text-sm font-medium">
//             Color: <span className="text-muted-foreground">{selectedVariant?.color || "Select"}</span>
//           </h3>
//           <div className="flex flex-wrap gap-3">
//             {colors.map((color) => {
//               const variant = variants.find((v) => v.color === color)
//               const isSelected = selectedVariant?.color === color
//               const isAvailable = variant?.isAvailable && (variant?.stock || 0) > 0

//               return (
//                 <button
//                   key={color}
//                   onClick={() => variant && setSelectedVariant(variant)}
//                   disabled={!isAvailable}
//                   className={cn(
//                     "group relative h-14 w-14 rounded-full border-2 transition-all hover:scale-110",
//                     isSelected ? "border-primary ring-2 ring-primary ring-offset-2" : "border-border",
//                     !isAvailable && "opacity-40 cursor-not-allowed hover:scale-100",
//                   )}
//                   title={color || undefined}
//                 >
//                   <div
//                     className="h-full w-full rounded-full"
//                     style={{ backgroundColor: variant?.colorHex || color?.toLowerCase() }}
//                   />
//                   {isSelected && (
//                     <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/20">
//                       <Check className="h-6 w-6 text-white drop-shadow-lg" />
//                     </div>
//                   )}
//                   {!isAvailable && (
//                     <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50">
//                       <span className="text-xs text-white font-medium">Out</span>
//                     </div>
//                   )}
//                 </button>
//               )
//             })}
//           </div>
//         </div>
//       )}

//       {/* Size Selector */}
//       {sizes.length > 0 && (
//         <div>
//           <h3 className="mb-3 text-sm font-medium">
//             Size: <span className="text-muted-foreground">{selectedVariant?.size || "Select"}</span>
//           </h3>
//           <div className="flex flex-wrap gap-2">
//             {sizes.map((size) => {
//               const variant = variants.find(
//                 (v) => v.size === size && (!selectedVariant?.color || v.color === selectedVariant.color),
//               )
//               const isSelected = selectedVariant?.size === size
//               const isAvailable = variant?.isAvailable && (variant?.stock || 0) > 0

//               return (
//                 <Button
//                   key={size}
//                   variant={isSelected ? "default" : "outline"}
//                   size="sm"
//                   onClick={() => variant && setSelectedVariant(variant)}
//                   disabled={!isAvailable}
//                   className={cn(!isAvailable && "opacity-50")}
//                 >
//                   {size}
//                 </Button>
//               )
//             })}
//           </div>
//         </div>
//       )}

//       {/* Variant Info */}
//       {selectedVariant && (
//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium">Selected Variant</p>
//                 <p className="text-xs text-muted-foreground">
//                   {selectedVariant.color && `${selectedVariant.color}`}
//                   {selectedVariant.color && selectedVariant.size && " • "}
//                   {selectedVariant.size && `${selectedVariant.size}`}
//                 </p>
//               </div>
//               <div className="text-right">
//                 <p className="text-lg font-bold">${currentPrice.toFixed(2)}</p>
//                 {currentStock > 0 ? (
//                   <Badge className="bg-green-500/10 text-green-500 border-green-500/20">{currentStock} in stock</Badge>
//                 ) : (
//                   <Badge variant="destructive">Out of Stock</Badge>
//                 )}
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {/* Action Buttons */}
//       <div className="flex gap-4">
//         <AddToCartButton
//           product={{
//             ...product,
//             price: currentPrice,
//             images: currentImages,
//             stock: currentStock,
//           }}
//           variantId={selectedVariant?.id}
//         />
//         <WishlistButton productId={product.id} />
//         {["accessories", "clothing", "hats", "scarves"].includes(product.category.toLowerCase()) && (
//           <TryOnButton productId={product.id} />
//         )}
//       </div>
//     </div>
//   )
// }


// "use client"

// import { useState, useRef, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { AddToCartButton } from "@/components/add-to-cart-button"
// import { WishlistButton } from "@/components/wishlist-button"
// import { TryOnButton } from "@/components/try-on-button"
// import { cn } from "@/lib/utils"
// import { Check, ChevronLeft, ChevronRight } from "lucide-react"

// interface ProductVariant {
//   id: string
//   color: string | null
//   colorHex: string | null
//   size: string | null
//   sku: string | null
//   images: string[]
//   price: number | null
//   stock: number
//   isAvailable: boolean
// }

// interface ProductVariantSelectorProps {
//   product: {
//     id: string
//     name: string
//     price: number
//     images: string[]
//     category: string
//   }
//   variants: ProductVariant[]
// }

// export function ProductVariantSelector({ product, variants }: ProductVariantSelectorProps) {
//   const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(variants[0] || null)
//   const [scrollPosition, setScrollPosition] = useState(0)
//   const carouselRef = useRef<HTMLDivElement>(null)

//   // Get unique colors and sizes
//   const colors = Array.from(new Set(variants.map((v) => v.color).filter(Boolean)))
//   const sizes = Array.from(new Set(variants.map((v) => v.size).filter(Boolean)))

//   const currentPrice = selectedVariant?.price || product.price
//   const currentStock = selectedVariant?.stock || 0
//   const currentImages = selectedVariant?.images?.length ? selectedVariant.images : product.images

//   const scroll = (direction: "left" | "right") => {
//     if (carouselRef.current) {
//       const scrollAmount = 300
//       const newPosition =
//         direction === "left" ? Math.max(0, scrollPosition - scrollAmount) : scrollPosition + scrollAmount

//       carouselRef.current.scrollTo({
//         left: newPosition,
//         behavior: "smooth",
//       })
//       setScrollPosition(newPosition)
//     }
//   }

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (carouselRef.current) {
//         const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
//         if (scrollLeft + clientWidth >= scrollWidth - 10) {
//           carouselRef.current.scrollTo({ left: 0, behavior: "smooth" })
//           setScrollPosition(0)
//         } else {
//           carouselRef.current.scrollBy({ left: 100, behavior: "smooth" })
//           setScrollPosition((prev) => prev + 100)
//         }
//       }
//     }, 4000)

//     return () => clearInterval(interval)
//   }, [])

//   return (
//     <div className="space-y-6">
//       {/* Color Selector with Auto-Scroll Carousel */}
//       {colors.length > 0 && (
//         <div>
//           <h3 className="mb-3 text-sm font-medium">
//             Color: <span className="text-muted-foreground">{selectedVariant?.color || "Select"}</span>
//           </h3>

//           <div className="relative">
//             <div
//               ref={carouselRef}
//               className="flex gap-3 overflow-x-auto pb-2 scroll-smooth"
//               style={{ scrollBehavior: "smooth" }}
//             >
//               {colors.map((color) => {
//                 const variant = variants.find((v) => v.color === color)
//                 const isSelected = selectedVariant?.color === color
//                 const isAvailable = variant?.isAvailable && (variant?.stock || 0) > 0

//                 return (
//                   <button
//                     key={color}
//                     onClick={() => variant && setSelectedVariant(variant)}
//                     disabled={!isAvailable}
//                     className={cn(
//                       "group relative h-16 w-16 rounded-full border-2 transition-all hover:scale-110 flex-shrink-0",
//                       isSelected ? "border-primary ring-2 ring-primary ring-offset-2" : "border-border",
//                       !isAvailable && "opacity-40 cursor-not-allowed hover:scale-100",
//                     )}
//                     title={color || undefined}
//                   >
//                     <div
//                       className="h-full w-full rounded-full"
//                       style={{ backgroundColor: variant?.colorHex || color?.toLowerCase() }}
//                     />
//                     {isSelected && (
//                       <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/20">
//                         <Check className="h-6 w-6 text-white drop-shadow-lg" />
//                       </div>
//                     )}
//                     {!isAvailable && (
//                       <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50">
//                         <span className="text-xs text-white font-medium">Out</span>
//                       </div>
//                     )}
//                   </button>
//                 )
//               })}
//             </div>

//             {colors.length > 4 && (
//               <>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-background/80 backdrop-blur-sm hover:bg-background z-10"
//                   onClick={() => scroll("left")}
//                 >
//                   <ChevronLeft className="h-5 w-5" />
//                 </Button>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-background/80 backdrop-blur-sm hover:bg-background z-10"
//                   onClick={() => scroll("right")}
//                 >
//                   <ChevronRight className="h-5 w-5" />
//                 </Button>
//               </>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Size Selector */}
//       {sizes.length > 0 && (
//         <div>
//           <h3 className="mb-3 text-sm font-medium">
//             Size: <span className="text-muted-foreground">{selectedVariant?.size || "Select"}</span>
//           </h3>
//           <div className="flex flex-wrap gap-2">
//             {sizes.map((size) => {
//               const variant = variants.find(
//                 (v) => v.size === size && (!selectedVariant?.color || v.color === selectedVariant.color),
//               )
//               const isSelected = selectedVariant?.size === size
//               const isAvailable = variant?.isAvailable && (variant?.stock || 0) > 0

//               return (
//                 <Button
//                   key={size}
//                   variant={isSelected ? "default" : "outline"}
//                   size="sm"
//                   onClick={() => variant && setSelectedVariant(variant)}
//                   disabled={!isAvailable}
//                   className={cn(!isAvailable && "opacity-50")}
//                 >
//                   {size}
//                 </Button>
//               )
//             })}
//           </div>
//         </div>
//       )}

//       {/* Variant Info */}
//       {selectedVariant && (
//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium">Selected Variant</p>
//                 <p className="text-xs text-muted-foreground">
//                   {selectedVariant.color && `${selectedVariant.color}`}
//                   {selectedVariant.color && selectedVariant.size && " • "}
//                   {selectedVariant.size && `${selectedVariant.size}`}
//                 </p>
//               </div>
//               <div className="text-right">
//                 <p className="text-lg font-bold">${currentPrice.toFixed(2)}</p>
//                 {currentStock > 0 ? (
//                   <Badge className="bg-green-500/10 text-green-500 border-green-500/20">{currentStock} in stock</Badge>
//                 ) : (
//                   <Badge variant="destructive">Out of Stock</Badge>
//                 )}
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {/* Action Buttons */}
//       <div className="flex gap-4 flex-col sm:flex-row">
//         <AddToCartButton
//           product={{
//             ...product,
//             price: currentPrice,
//             images: currentImages,
//             stock: currentStock,
//           }}
//           variantId={selectedVariant?.id}
//         />
//         <WishlistButton productId={product.id} />
//         {["accessories", "clothing", "hats", "scarves"].includes(product.category.toLowerCase()) && (
//           <TryOnButton productId={product.id} />
//         )}
//       </div>
//     </div>
//   )
// }



// "use client"

// import { useState, useRef, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { AddToCartButton } from "@/components/add-to-cart-button"
// import { WishlistButton } from "@/components/wishlist-button"
// import { TryOnButton } from "@/components/try-on-button"
// import { cn } from "@/lib/utils"
// import { Check, ChevronLeft, ChevronRight } from "lucide-react"

// interface ProductVariant {
//   id: string
//   color: string | null
//   colorHex: string | null
//   size: string | null
//   sku: string | null
//   images: string[]
//   price: number | null
//   stock: number
//   isAvailable: boolean
// }

// interface ProductVariantSelectorProps {
//   product: {
//     id: string
//     name: string
//     price: number
//     images: string[]
//     category: string
//   }
//   variants: ProductVariant[]
//   onVariantChange?: (variantId: string) => void
// }

// export function ProductVariantSelector({ product, variants, onVariantChange }: ProductVariantSelectorProps) {
//   const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(variants[0] || null)
//   const [scrollPosition, setScrollPosition] = useState(0)
//   const carouselRef = useRef<HTMLDivElement>(null)

//   // Get unique colors and sizes
//   const colors = Array.from(new Set(variants.map((v) => v.color).filter(Boolean)))
//   const sizes = Array.from(new Set(variants.map((v) => v.size).filter(Boolean)))

//   const currentPrice = selectedVariant?.price || product.price
//   const currentStock = selectedVariant?.stock || 0
//   const currentImages = selectedVariant?.images?.length ? selectedVariant.images : product.images

//   useEffect(() => {
//     if (selectedVariant && onVariantChange) {
//       onVariantChange(selectedVariant.id)
//     }
//   }, [selectedVariant, onVariantChange])

//   const scroll = (direction: "left" | "right") => {
//     if (carouselRef.current) {
//       const scrollAmount = 300
//       const newPosition =
//         direction === "left" ? Math.max(0, scrollPosition - scrollAmount) : scrollPosition + scrollAmount

//       carouselRef.current.scrollTo({
//         left: newPosition,
//         behavior: "smooth",
//       })
//       setScrollPosition(newPosition)
//     }
//   }

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (carouselRef.current) {
//         const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
//         if (scrollLeft + clientWidth >= scrollWidth - 10) {
//           carouselRef.current.scrollTo({ left: 0, behavior: "smooth" })
//           setScrollPosition(0)
//         } else {
//           carouselRef.current.scrollBy({ left: 100, behavior: "smooth" })
//           setScrollPosition((prev) => prev + 100)
//         }
//       }
//     }, 5000)

//     return () => clearInterval(interval)
//   }, [])

//   return (
//     <div className="space-y-6">
//       {/* Color Selector with Auto-Scroll Carousel */}
//       {colors.length > 0 && (
//         <div>
//           <h3 className="mb-3 text-sm font-medium">
//             Color: <span className="text-muted-foreground">{selectedVariant?.color || "Select a color"}</span>
//           </h3>

//           <div className="relative">
//             <div
//               ref={carouselRef}
//               className="flex gap-3 overflow-x-auto pb-2 scroll-smooth"
//               style={{ scrollBehavior: "smooth" }}
//             >
//               {colors.map((color) => {
//                 const variant = variants.find((v) => v.color === color)
//                 const isSelected = selectedVariant?.color === color
//                 const isAvailable = variant?.isAvailable && (variant?.stock || 0) > 0

//                 return (
//                   <button
//                     key={color}
//                     onClick={() => variant && setSelectedVariant(variant)}
//                     disabled={!isAvailable}
//                     className={cn(
//                       "group relative h-16 w-16 rounded-full border-2 transition-all hover:scale-110 flex-shrink-0",
//                       isSelected ? "border-primary ring-2 ring-primary ring-offset-2" : "border-border",
//                       !isAvailable && "opacity-40 cursor-not-allowed hover:scale-100",
//                     )}
//                     title={color || undefined}
//                   >
//                     <div
//                       className="h-full w-full rounded-full"
//                       style={{ backgroundColor: variant?.colorHex || color?.toLowerCase() }}
//                     />
//                     {isSelected && (
//                       <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/20">
//                         <Check className="h-6 w-6 text-white drop-shadow-lg" />
//                       </div>
//                     )}
//                     {!isAvailable && (
//                       <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50">
//                         <span className="text-xs text-white font-medium">Out</span>
//                       </div>
//                     )}
//                   </button>
//                 )
//               })}
//             </div>

//             {colors.length > 4 && (
//               <>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-background/80 backdrop-blur-sm hover:bg-background z-10"
//                   onClick={() => scroll("left")}
//                 >
//                   <ChevronLeft className="h-5 w-5" />
//                 </Button>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-background/80 backdrop-blur-sm hover:bg-background z-10"
//                   onClick={() => scroll("right")}
//                 >
//                   <ChevronRight className="h-5 w-5" />
//                 </Button>
//               </>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Size Selector */}
//       {sizes.length > 0 && (
//         <div>
//           <h3 className="mb-3 text-sm font-medium">
//             Size: <span className="text-muted-foreground">{selectedVariant?.size || "Select a size"}</span>
//           </h3>
//           <div className="flex flex-wrap gap-2">
//             {sizes.map((size) => {
//               const variant = variants.find(
//                 (v) => v.size === size && (!selectedVariant?.color || v.color === selectedVariant.color),
//               )
//               const isSelected = selectedVariant?.size === size
//               const isAvailable = variant?.isAvailable && (variant?.stock || 0) > 0

//               return (
//                 <Button
//                   key={size}
//                   variant={isSelected ? "default" : "outline"}
//                   size="sm"
//                   onClick={() => variant && setSelectedVariant(variant)}
//                   disabled={!isAvailable}
//                   className={cn(!isAvailable && "opacity-50")}
//                 >
//                   {size}
//                 </Button>
//               )
//             })}
//           </div>
//         </div>
//       )}

//       {/* Variant Info Card */}
//       {selectedVariant && (
//         <Card className="border-primary/20 bg-primary/5">
//           <CardContent className="p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium">Selected Variant</p>
//                 <p className="text-xs text-muted-foreground">
//                   {selectedVariant.color && `${selectedVariant.color}`}
//                   {selectedVariant.color && selectedVariant.size && " • "}
//                   {selectedVariant.size && `${selectedVariant.size}`}
//                 </p>
//               </div>
//               <div className="text-right">
//                 <p className="text-lg font-bold">${currentPrice.toFixed(2)}</p>
//                 {currentStock > 0 ? (
//                   <Badge className="bg-green-500/10 text-green-500 border-green-500/20">{currentStock} in stock</Badge>
//                 ) : (
//                   <Badge variant="destructive">Out of Stock</Badge>
//                 )}
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {/* Action Buttons */}
//       <div className="flex gap-4 flex-col sm:flex-row">
//         <AddToCartButton
//           product={{
//             ...product,
//             price: currentPrice,
//             images: currentImages,
//             stock: currentStock,
//           }}
//           variantId={selectedVariant?.id}
//         />
//         <WishlistButton productId={product.id} />
//         {["accessories", "clothing", "hats", "scarves"].includes(product.category.toLowerCase()) && (
//           <TryOnButton productId={product.id} />
//         )}
//       </div>
//     </div>
//   )
// }


"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { WishlistButton } from "@/components/wishlist-button"
import { cn } from "@/lib/utils"
import { Check, ChevronLeft, ChevronRight } from "lucide-react"

interface ProductVariant {
  id: string
  color: string | null
  colorHex: string | null
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
  onVariantChange?: (variantId: string) => void
}

export function ProductVariantSelector({ product, variants, onVariantChange }: ProductVariantSelectorProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(variants[0] || null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Get unique colors and sizes
  const colors = Array.from(new Set(variants.map((v) => v.color).filter(Boolean)))
  const sizes = Array.from(new Set(variants.map((v) => v.size).filter(Boolean)))

  const currentPrice = selectedVariant?.price || product.price
  const currentStock = selectedVariant?.stock || 0
  const currentImages = selectedVariant?.images?.length ? selectedVariant.images : product.images

  useEffect(() => {
    if (selectedVariant && onVariantChange) {
      onVariantChange(selectedVariant.id)
    }
  }, [selectedVariant, onVariantChange])

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 300
      const newPosition =
        direction === "left" ? Math.max(0, scrollPosition - scrollAmount) : scrollPosition + scrollAmount

      carouselRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      })
      setScrollPosition(newPosition)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          carouselRef.current.scrollTo({ left: 0, behavior: "smooth" })
          setScrollPosition(0)
        } else {
          carouselRef.current.scrollBy({ left: 100, behavior: "smooth" })
          setScrollPosition((prev) => prev + 100)
        }
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      {/* Color Selector with Auto-Scroll Carousel */}
      {colors.length > 0 && (
        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">
            Color: <span className="text-primary">{selectedVariant?.color || "Select"}</span>
          </h3>

          <div className="relative">
            <div
              ref={carouselRef}
              className="flex gap-3 overflow-x-auto pb-2 scroll-smooth"
              style={{ scrollBehavior: "smooth" }}
            >
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
                      "group relative h-20 w-20 rounded-full border-3 transition-all hover:scale-110 flex-shrink-0 shadow-md hover:shadow-lg",
                      isSelected ? "border-primary ring-4 ring-primary ring-offset-2 shadow-lg" : "border-gray-200",
                      !isAvailable && "opacity-40 cursor-not-allowed hover:scale-100",
                    )}
                    title={color || undefined}
                  >
                    <div
                      className="h-full w-full rounded-full"
                      style={{ backgroundColor: variant?.colorHex || color?.toLowerCase() }}
                    />
                    {isSelected && (
                      <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/20">
                        <Check className="h-7 w-7 text-white drop-shadow-lg" />
                      </div>
                    )}
                    {!isAvailable && (
                      <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50">
                        <span className="text-xs text-white font-bold">Out</span>
                      </div>
                    )}
                  </button>
                )
              })}
            </div>

            {colors.length > 4 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 bg-white shadow-lg hover:bg-gray-50 rounded-full z-10"
                  onClick={() => scroll("left")}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 bg-white shadow-lg hover:bg-gray-50 rounded-full z-10"
                  onClick={() => scroll("right")}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Size Selector */}
      {sizes.length > 0 && (
        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">
            Size: <span className="text-primary">{selectedVariant?.size || "Select"}</span>
          </h3>
          <div className="flex flex-wrap gap-3">
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
                  size="lg"
                  onClick={() => variant && setSelectedVariant(variant)}
                  disabled={!isAvailable}
                  className={cn(
                    "font-semibold shadow-md hover:shadow-lg transition-all",
                    isSelected && "shadow-lg",
                    !isAvailable && "opacity-50",
                  )}
                >
                  {size}
                </Button>
              )
            })}
          </div>
        </div>
      )}

      {/* Variant Info Card - Professional styling */}
      {selectedVariant && (
        <Card className="border-2 border-primary bg-gradient-to-br from-primary/5 to-primary/10 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Selected Variant</p>
                <p className="text-lg font-semibold mt-1">
                  {selectedVariant.color && `${selectedVariant.color}`}
                  {selectedVariant.color && selectedVariant.size && " • "}
                  {selectedVariant.size && `${selectedVariant.size}`}
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-primary">${currentPrice.toFixed(2)}</p>
                {currentStock > 0 ? (
                  <Badge className="bg-green-500/20 text-green-700 border-green-500/30 mt-2 font-semibold">
                    {currentStock} in stock
                  </Badge>
                ) : (
                  <Badge variant="destructive" className="mt-2 font-semibold">
                    Out of Stock
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons - Prominent and professional */}
      <div className="flex gap-3 flex-col sm:flex-row pt-4">
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
      </div>
    </div>
  )
}
