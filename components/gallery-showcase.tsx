// "use client"

// import { useState } from "react"
// import Image from "next/image"
// import { motion, AnimatePresence } from "framer-motion"
// import { Button } from "@/components/ui/button"
// import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item"
// import { Badge } from "@/components/ui/badge"
// import { ChevronLeft, ChevronRight, Grid3x3, LayoutGrid, Layers, Sparkles } from "lucide-react"
// import { cn } from "@/lib/utils"

// type GalleryImage = {
//   id: string
//   url: string
//   alt: string | null
//   category: string
// }

// type ViewMode = "grid" | "masonry" | "carousel" | "featured"

// export function GalleryShowcase({
//   images,
//   title,
//   description,
//   category,
// }: {
//   images: GalleryImage[]
//   title: string
//   description: string
//   category: string
// }) {
//   const [viewMode, setViewMode] = useState<ViewMode>("grid")
//   const [currentIndex, setCurrentIndex] = useState(0)

//   if (images.length === 0) return null

//   const nextSlide = () => {
//     setCurrentIndex((prev) => (prev + 1) % images.length)
//   }

//   const prevSlide = () => {
//     setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header with view mode toggles */}
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div className="space-y-1">
//           <div className="flex items-center gap-2">
//             <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
//             <Badge variant="secondary" className="hidden sm:inline-flex">
//               {images.length} items
//             </Badge>
//           </div>
//           <p className="text-muted-foreground">{description}</p>
//         </div>

//         <div className="flex gap-2">
//           <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
//             <Grid3x3 className="h-4 w-4" />
//             <span className="sr-only">Grid view</span>
//           </Button>
//           <Button
//             variant={viewMode === "masonry" ? "default" : "outline"}
//             size="sm"
//             onClick={() => setViewMode("masonry")}
//           >
//             <LayoutGrid className="h-4 w-4" />
//             <span className="sr-only">Masonry view</span>
//           </Button>
//           <Button
//             variant={viewMode === "carousel" ? "default" : "outline"}
//             size="sm"
//             onClick={() => setViewMode("carousel")}
//           >
//             <Layers className="h-4 w-4" />
//             <span className="sr-only">Carousel view</span>
//           </Button>
//           <Button
//             variant={viewMode === "featured" ? "default" : "outline"}
//             size="sm"
//             onClick={() => setViewMode("featured")}
//           >
//             <Sparkles className="h-4 w-4" />
//             <span className="sr-only">Featured view</span>
//           </Button>
//         </div>
//       </div>

//       {/* Grid View */}
//       {viewMode === "grid" && (
//         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//           {images.map((image) => (
//             <motion.div
//               key={image.id}
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.3 }}
//               className="group relative aspect-square overflow-hidden rounded-xl border bg-card"
//             >
//               <Image
//                 src={image.url || "/placeholder.svg"}
//                 alt={image.alt || "Gallery image"}
//                 fill
//                 className="object-cover transition-transform duration-300 group-hover:scale-110"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition-opacity group-hover:opacity-100">
//                 <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
//                   <p className="text-sm font-medium">{image.alt || "Handmade crochet"}</p>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       )}

//       {/* Masonry View */}
//       {viewMode === "masonry" && (
//         <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
//           {images.map((image, idx) => (
//             <motion.div
//               key={image.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.3, delay: idx * 0.05 }}
//               className="group relative mb-4 break-inside-avoid overflow-hidden rounded-xl border bg-card"
//             >
//               <div
//                 className={cn(
//                   "relative",
//                   idx % 3 === 0 ? "aspect-[3/4]" : idx % 3 === 1 ? "aspect-square" : "aspect-[4/3]",
//                 )}
//               >
//                 <Image
//                   src={image.url || "/placeholder.svg"}
//                   alt={image.alt || "Gallery image"}
//                   fill
//                   className="object-cover transition-transform duration-300 group-hover:scale-105"
//                 />
//               </div>
//               <div className="p-3">
//                 <p className="text-sm text-muted-foreground">{image.alt || "Handmade crochet piece"}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       )}

//       {/* Carousel View */}
//       {viewMode === "carousel" && (
//         <div className="relative">
//           <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border bg-card lg:aspect-[21/9]">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={currentIndex}
//                 initial={{ opacity: 0, x: 100 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -100 }}
//                 transition={{ duration: 0.3 }}
//                 className="absolute inset-0"
//               >
//                 <Image
//                   src={images[currentIndex].url || "/placeholder.svg"}
//                   alt={images[currentIndex].alt || "Gallery image"}
//                   fill
//                   className="object-cover"
//                 />
//               </motion.div>
//             </AnimatePresence>

//             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
//               <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
//                 <h3 className="text-2xl font-bold">{images[currentIndex].alt || "Handmade Crochet"}</h3>
//                 <p className="mt-1 text-sm text-white/80">
//                   {currentIndex + 1} of {images.length}
//                 </p>
//               </div>
//             </div>

//             <Button
//               variant="secondary"
//               size="icon"
//               className="absolute left-4 top-1/2 -translate-y-1/2"
//               onClick={prevSlide}
//             >
//               <ChevronLeft className="h-5 w-5" />
//             </Button>
//             <Button
//               variant="secondary"
//               size="icon"
//               className="absolute right-4 top-1/2 -translate-y-1/2"
//               onClick={nextSlide}
//             >
//               <ChevronRight className="h-5 w-5" />
//             </Button>
//           </div>

//           {/* Thumbnails */}
//           <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
//             {images.map((image, idx) => (
//               <button
//                 key={image.id}
//                 onClick={() => setCurrentIndex(idx)}
//                 className={cn(
//                   "relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all",
//                   currentIndex === idx
//                     ? "border-primary ring-2 ring-primary/20"
//                     : "border-transparent opacity-60 hover:opacity-100",
//                 )}
//               >
//                 <Image src={image.url || "/placeholder.svg"} alt={image.alt || ""} fill className="object-cover" />
//               </button>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Featured View with Item component */}
//       {viewMode === "featured" && (
//         <div className="grid gap-4 sm:grid-cols-2">
//           {images.slice(0, 4).map((image) => (
//             <Item key={image.id} className="overflow-hidden rounded-xl border">
//               <ItemMedia className="aspect-video">
//                 <Image
//                   src={image.url || "/placeholder.svg"}
//                   alt={image.alt || "Gallery image"}
//                   fill
//                   className="object-cover"
//                 />
//               </ItemMedia>
//               <ItemContent>
//                 <ItemTitle>{image.alt || "Handmade Crochet Piece"}</ItemTitle>
//                 <ItemDescription>
//                   Beautiful handcrafted {category} made with love and attention to detail
//                 </ItemDescription>
//               </ItemContent>
//             </Item>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }


"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Grid3x3, LayoutGrid, Layers, Sparkles, ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"

type GalleryImage = {
  id: string
  url: string
  alt: string | null
  category: string
  productId: string | null
  product?: {
    id: string
    name: string
    price: number
    compareAtPrice: number | null
  } | null
}

type ViewMode = "grid" | "masonry" | "carousel" | "featured"

export function GalleryShowcase({
  images,
  title,
  description,
  category,
}: {
  images: GalleryImage[]
  title: string
  description: string
  category: string
}) {
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [currentIndex, setCurrentIndex] = useState(0)

  if (images.length === 0) return null

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const ImageWrapper = ({
    image,
    children,
    className,
  }: { image: GalleryImage; children: React.ReactNode; className?: string }) => {
    if (image.productId && image.product) {
      return (
        <Link href={`/products/${image.productId}`} className={className}>
          {children}
        </Link>
      )
    }
    return <div className={className}>{children}</div>
  }

  return (
    <div className="space-y-6">
      {/* Header with view mode toggles */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
            <Badge variant="secondary" className="hidden sm:inline-flex">
              {images.length} items
            </Badge>
          </div>
          <p className="text-muted-foreground">{description}</p>
        </div>

        <div className="flex gap-2">
          <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
            <Grid3x3 className="h-4 w-4" />
            <span className="sr-only">Grid view</span>
          </Button>
          <Button
            variant={viewMode === "masonry" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("masonry")}
          >
            <LayoutGrid className="h-4 w-4" />
            <span className="sr-only">Masonry view</span>
          </Button>
          <Button
            variant={viewMode === "carousel" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("carousel")}
          >
            <Layers className="h-4 w-4" />
            <span className="sr-only">Carousel view</span>
          </Button>
          <Button
            variant={viewMode === "featured" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("featured")}
          >
            <Sparkles className="h-4 w-4" />
            <span className="sr-only">Featured view</span>
          </Button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="group relative aspect-square overflow-hidden rounded-xl border bg-card"
            >
              <ImageWrapper
                image={image}
                className="group relative block aspect-square overflow-hidden rounded-xl border bg-card cursor-pointer"
              >
                <Image
                  src={image.url || "/placeholder.svg"}
                  alt={image.alt || "Gallery image"}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    {image.product ? (
                      <>
                        <p className="text-sm font-medium">{image.product.name}</p>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-lg font-bold">${image.product.price.toFixed(2)}</span>
                          {image.product.compareAtPrice && (
                            <span className="text-sm line-through opacity-75">
                              ${image.product.compareAtPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <div className="mt-2 flex items-center gap-1 text-xs">
                          <ShoppingBag className="h-3 w-3" />
                          <span>Shop Now</span>
                        </div>
                      </>
                    ) : (
                      <p className="text-sm font-medium">{image.alt || "Handmade crochet"}</p>
                    )}
                  </div>
                </div>
                {image.product && (
                  <Badge className="absolute top-2 right-2 bg-primary/90 backdrop-blur-sm">
                    <ShoppingBag className="mr-1 h-3 w-3" />
                    Shop
                  </Badge>
                )}
              </ImageWrapper>
            </motion.div>
          ))}
        </div>
      )}

      {/* Masonry View */}
      {viewMode === "masonry" && (
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {images.map((image, idx) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="group relative mb-4 break-inside-avoid overflow-hidden rounded-xl border bg-card"
            >
              <ImageWrapper
                image={image}
                className="group relative block overflow-hidden rounded-xl border bg-card cursor-pointer"
              >
                <div
                  className={cn(
                    "relative",
                    idx % 3 === 0 ? "aspect-[3/4]" : idx % 3 === 1 ? "aspect-square" : "aspect-[4/3]",
                  )}
                >
                  <Image
                    src={image.url || "/placeholder.svg"}
                    alt={image.alt || "Gallery image"}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {image.product && (
                    <Badge className="absolute top-2 right-2 bg-primary/90 backdrop-blur-sm">
                      <ShoppingBag className="mr-1 h-3 w-3" />${image.product.price.toFixed(2)}
                    </Badge>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium">
                    {image.product ? image.product.name : image.alt || "Handmade crochet piece"}
                  </p>
                  {image.product && (
                    <p className="mt-1 text-xs text-muted-foreground flex items-center gap-1">
                      <ShoppingBag className="h-3 w-3" />
                      Click to shop
                    </p>
                  )}
                </div>
              </ImageWrapper>
            </motion.div>
          ))}
        </div>
      )}

      {/* Carousel View */}
      {viewMode === "carousel" && (
        <div className="relative">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border bg-card lg:aspect-[21/9]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <ImageWrapper image={images[currentIndex]} className="block h-full w-full cursor-pointer">
                  <Image
                    src={images[currentIndex].url || "/placeholder.svg"}
                    alt={images[currentIndex].alt || "Gallery image"}
                    fill
                    className="object-cover"
                  />
                </ImageWrapper>
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none">
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold">
                  {images[currentIndex].product?.name || images[currentIndex].alt || "Handmade Crochet"}
                </h3>
                {images[currentIndex].product && (
                  <p className="mt-2 text-lg font-semibold">${images[currentIndex].product.price.toFixed(2)}</p>
                )}
                <p className="mt-1 text-sm text-white/80">
                  {currentIndex + 1} of {images.length}
                </p>
              </div>
            </div>

            <Button
              variant="secondary"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10"
              onClick={nextSlide}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
            {images.map((image, idx) => (
              <button
                key={image.id}
                onClick={() => setCurrentIndex(idx)}
                className={cn(
                  "relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all",
                  currentIndex === idx
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-transparent opacity-60 hover:opacity-100",
                )}
              >
                <Image src={image.url || "/placeholder.svg"} alt={image.alt || ""} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Featured View with Item component */}
      {viewMode === "featured" && (
        <div className="grid gap-4 sm:grid-cols-2">
          {images.slice(0, 4).map((image) => (
            <ImageWrapper key={image.id} image={image}>
              <Item className="overflow-hidden rounded-xl border cursor-pointer hover:shadow-lg transition-shadow">
                <ItemMedia className="aspect-video">
                  <Image
                    src={image.url || "/placeholder.svg"}
                    alt={image.alt || "Gallery image"}
                    fill
                    className="object-cover"
                  />
                  {image.product && (
                    <Badge className="absolute top-2 right-2 bg-primary/90 backdrop-blur-sm">
                      ${image.product.price.toFixed(2)}
                    </Badge>
                  )}
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{image.product?.name || image.alt || "Handmade Crochet Piece"}</ItemTitle>
                  <ItemDescription>
                    {image.product
                      ? `Beautiful handcrafted ${category} - Click to shop`
                      : `Beautiful handcrafted ${category} made with love and attention to detail`}
                  </ItemDescription>
                  {image.product && (
                    <div className="mt-2 flex items-center gap-2 text-sm">
                      <ShoppingBag className="h-4 w-4" />
                      <span className="font-medium">Shop Now</span>
                    </div>
                  )}
                </ItemContent>
              </Item>
            </ImageWrapper>
          ))}
        </div>
      )}
    </div>
  )
}
