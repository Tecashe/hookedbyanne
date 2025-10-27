// "use client"

// import { useState } from "react"
// import Image from "next/image"
// import { cn } from "@/lib/utils"
// import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Dialog, DialogContent } from "@/components/ui/dialog"

// interface ProductImageGalleryProps {
//   images: string[]
//   productName: string
// }

// export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
//   const [selectedImage, setSelectedImage] = useState(0)
//   const [isZoomed, setIsZoomed] = useState(false)

//   const nextImage = () => {
//     setSelectedImage((prev) => (prev + 1) % images.length)
//   }

//   const prevImage = () => {
//     setSelectedImage((prev) => (prev - 1 + images.length) % images.length)
//   }

//   return (
//     <div className="space-y-4">
//       {/* Main Image */}
//       <div className="relative aspect-square overflow-hidden rounded-lg bg-muted group">
//         <Image
//           src={images[selectedImage] || "/placeholder.svg"}
//           alt={`${productName} - Image ${selectedImage + 1}`}
//           fill
//           className="object-cover transition-transform duration-300 group-hover:scale-105"
//           priority
//         />

//         {/* Navigation Arrows */}
//         {images.length > 1 && (
//           <>
//             <Button
//               variant="ghost"
//               size="icon"
//               className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background"
//               onClick={prevImage}
//             >
//               <ChevronLeft className="h-6 w-6" />
//             </Button>
//             <Button
//               variant="ghost"
//               size="icon"
//               className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background"
//               onClick={nextImage}
//             >
//               <ChevronRight className="h-6 w-6" />
//             </Button>
//           </>
//         )}

//         {/* Zoom Button */}
//         <Button
//           variant="ghost"
//           size="icon"
//           className="absolute right-2 bottom-2 bg-background/80 backdrop-blur-sm hover:bg-background"
//           onClick={() => setIsZoomed(true)}
//         >
//           <Maximize2 className="h-5 w-5" />
//         </Button>

//         {/* Image Counter */}
//         {images.length > 1 && (
//           <div className="absolute bottom-2 left-2 rounded-full bg-background/80 backdrop-blur-sm px-3 py-1 text-sm font-medium">
//             {selectedImage + 1} / {images.length}
//           </div>
//         )}
//       </div>

//       {/* Thumbnail Grid */}
//       {images.length > 1 && (
//         <div className="grid grid-cols-5 gap-2">
//           {images.map((image, index) => (
//             <button
//               key={index}
//               onClick={() => setSelectedImage(index)}
//               className={cn(
//                 "relative aspect-square overflow-hidden rounded-lg bg-muted transition-all",
//                 selectedImage === index ? "ring-2 ring-primary ring-offset-2" : "opacity-60 hover:opacity-100",
//               )}
//             >
//               <Image
//                 src={image || "/placeholder.svg"}
//                 alt={`${productName} thumbnail ${index + 1}`}
//                 fill
//                 className="object-cover"
//               />
//             </button>
//           ))}
//         </div>
//       )}

//       {/* Zoom Dialog */}
//       <Dialog open={isZoomed} onOpenChange={setIsZoomed}>
//         <DialogContent className="max-w-4xl">
//           <div className="relative aspect-square w-full">
//             <Image
//               src={images[selectedImage] || "/placeholder.svg"}
//               alt={`${productName} - Zoomed`}
//               fill
//               className="object-contain"
//             />
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }

// "use client"

// import { useState, useEffect } from "react"
// import Image from "next/image"
// import { cn } from "@/lib/utils"
// import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Dialog, DialogContent } from "@/components/ui/dialog"

// interface ProductImageGalleryProps {
//   images: string[]
//   productName: string
// }

// export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
//   const [selectedImage, setSelectedImage] = useState(0)
//   const [isZoomed, setIsZoomed] = useState(false)
//   const [validImages, setValidImages] = useState<string[]>([])

//   useEffect(() => {
//     const filtered = images.filter((img) => img && img !== "/placeholder.svg" && img.trim() !== "")
//     setValidImages(filtered.length > 0 ? filtered : ["/placeholder.svg"])
//     console.log("[v0] ProductImageGallery - validImages:", filtered)
//   }, [images])

//   const nextImage = () => {
//     setSelectedImage((prev) => (prev + 1) % validImages.length)
//   }

//   const prevImage = () => {
//     setSelectedImage((prev) => (prev - 1 + validImages.length) % validImages.length)
//   }

//   if (validImages.length === 0) {
//     return (
//       <div className="aspect-square rounded-lg bg-muted flex items-center justify-center">
//         <p className="text-muted-foreground">No images available</p>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-4">
//       {/* Main Image */}
//       <div className="relative aspect-square overflow-hidden rounded-lg bg-muted group">
//         <Image
//           src={validImages[selectedImage] || "/placeholder.svg"}
//           alt={`${productName} - Image ${selectedImage + 1}`}
//           fill
//           className="object-cover transition-transform duration-300 group-hover:scale-105"
//           priority
//           sizes="(max-width: 768px) 100vw, 50vw"
//         />

//         {/* Navigation Arrows */}
//         {validImages.length > 1 && (
//           <>
//             <Button
//               variant="ghost"
//               size="icon"
//               className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background z-10"
//               onClick={prevImage}
//             >
//               <ChevronLeft className="h-6 w-6" />
//             </Button>
//             <Button
//               variant="ghost"
//               size="icon"
//               className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background z-10"
//               onClick={nextImage}
//             >
//               <ChevronRight className="h-6 w-6" />
//             </Button>
//           </>
//         )}

//         {/* Zoom Button */}
//         <Button
//           variant="ghost"
//           size="icon"
//           className="absolute right-2 bottom-2 bg-background/80 backdrop-blur-sm hover:bg-background z-10"
//           onClick={() => setIsZoomed(true)}
//         >
//           <Maximize2 className="h-5 w-5" />
//         </Button>

//         {/* Image Counter */}
//         {validImages.length > 1 && (
//           <div className="absolute bottom-2 left-2 rounded-full bg-background/80 backdrop-blur-sm px-3 py-1 text-sm font-medium">
//             {selectedImage + 1} / {validImages.length}
//           </div>
//         )}
//       </div>

//       {/* Thumbnail Grid */}
//       {validImages.length > 1 && (
//         <div className="grid grid-cols-5 gap-2">
//           {validImages.map((image, index) => (
//             <button
//               key={index}
//               onClick={() => setSelectedImage(index)}
//               className={cn(
//                 "relative aspect-square overflow-hidden rounded-lg bg-muted transition-all",
//                 selectedImage === index ? "ring-2 ring-primary ring-offset-2" : "opacity-60 hover:opacity-100",
//               )}
//             >
//               <Image
//                 src={image || "/placeholder.svg"}
//                 alt={`${productName} thumbnail ${index + 1}`}
//                 fill
//                 className="object-cover"
//                 sizes="80px"
//               />
//             </button>
//           ))}
//         </div>
//       )}

//       {/* Zoom Dialog */}
//       <Dialog open={isZoomed} onOpenChange={setIsZoomed}>
//         <DialogContent className="max-w-4xl">
//           <div className="relative aspect-square w-full">
//             <Image
//               src={validImages[selectedImage] || "/placeholder.svg"}
//               alt={`${productName} - Zoomed`}
//               fill
//               className="object-contain"
//               sizes="(max-width: 768px) 100vw, 80vw"
//             />
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }


"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface ProductImageGalleryProps {
  product: {
    id: string
    name: string
    images: string[]
    variants?: Array<{
      id: string
      color: string | null
      colorHex: string | null
      size: string | null
      images: string[]
      stock: number
    }>
  }
  selectedVariantId?: string
}

export function ProductImageGallery({ product, selectedVariantId }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [validImages, setValidImages] = useState<string[]>([])

  useEffect(() => {
    let imagesToDisplay: string[] = []

    if (selectedVariantId && product.variants) {
      const variant = product.variants.find((v) => v.id === selectedVariantId)
      if (variant?.images && variant.images.length > 0) {
        imagesToDisplay = variant.images
      }
    }

    if (imagesToDisplay.length === 0 && product.images && product.images.length > 0) {
      imagesToDisplay = product.images
    }

    if (imagesToDisplay.length === 0) {
      imagesToDisplay = ["/placeholder.svg"]
    }

    setValidImages(imagesToDisplay)
    setSelectedImage(0)
  }, [selectedVariantId, product])

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % validImages.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + validImages.length) % validImages.length)
  }

  if (validImages.length === 0) {
    return (
      <div className="aspect-square rounded-lg bg-muted flex items-center justify-center">
        <p className="text-muted-foreground">No images available</p>
      </div>
    )
  }

  return (
    <div className="space-y-4 sticky top-20">
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-muted group">
        <Image
          src={validImages[selectedImage] || "/placeholder.svg"}
          alt={`${product.name} - Image ${selectedImage + 1}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Navigation Arrows */}
        {validImages.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background z-10"
              onClick={prevImage}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background z-10"
              onClick={nextImage}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}

        {/* Zoom Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 bottom-2 bg-background/80 backdrop-blur-sm hover:bg-background z-10"
          onClick={() => setIsZoomed(true)}
        >
          <Maximize2 className="h-5 w-5" />
        </Button>

        {/* Image Counter */}
        {validImages.length > 1 && (
          <div className="absolute bottom-2 left-2 rounded-full bg-background/80 backdrop-blur-sm px-3 py-1 text-sm font-medium">
            {selectedImage + 1} / {validImages.length}
          </div>
        )}
      </div>

      {/* Thumbnail Grid */}
      {validImages.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {validImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={cn(
                "relative aspect-square overflow-hidden rounded-lg bg-muted transition-all",
                selectedImage === index ? "ring-2 ring-primary ring-offset-2" : "opacity-60 hover:opacity-100",
              )}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${product.name} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Zoom Dialog */}
      <Dialog open={isZoomed} onOpenChange={setIsZoomed}>
        <DialogContent className="max-w-4xl">
          <div className="relative aspect-square w-full">
            <Image
              src={validImages[selectedImage] || "/placeholder.svg"}
              alt={`${product.name} - Zoomed`}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 80vw"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
