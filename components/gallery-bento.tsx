// "use client"

// import Image from "next/image"
// import { useState } from "react"
// import { Dialog, DialogContent } from "@/components/ui/dialog"
// import type { GalleryImage } from "@prisma/client"
// import { X } from "lucide-react"
// import { Button } from "@/components/ui/button"

// interface GalleryBentoProps {
//   images: GalleryImage[]
// }

// export function GalleryBento({ images }: GalleryBentoProps) {
//   const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

//   // Create bento grid pattern with varying sizes
//   const getBentoClass = (index: number) => {
//     const pattern = index % 7
//     switch (pattern) {
//       case 0:
//         return "md:col-span-2 md:row-span-2" // Large
//       case 1:
//       case 2:
//         return "md:col-span-1 md:row-span-1" // Small
//       case 3:
//         return "md:col-span-2 md:row-span-1" // Wide
//       case 4:
//         return "md:col-span-1 md:row-span-2" // Tall
//       default:
//         return "md:col-span-1 md:row-span-1" // Small
//     }
//   }

//   return (
//     <>
//       <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:auto-rows-[200px]">
//         {images.map((image, index) => (
//           <button
//             key={image.id}
//             onClick={() => setSelectedImage(image)}
//             className={`group relative overflow-hidden rounded-lg bg-muted transition-transform hover:scale-105 ${getBentoClass(
//               index,
//             )}`}
//           >
//             <Image
//               src={image.imageUrl || "/placeholder.svg"}
//               alt={image.title}
//               fill
//               className="object-cover transition-opacity group-hover:opacity-90"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
//               <div className="absolute bottom-0 left-0 right-0 p-4">
//                 <p className="font-medium text-white text-balance">{image.title}</p>
//               </div>
//             </div>
//           </button>
//         ))}
//       </div>

//       <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
//         <DialogContent className="max-w-4xl">
//           {selectedImage && (
//             <div className="relative">
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="absolute right-2 top-2 z-10 bg-background/80 backdrop-blur-sm"
//                 onClick={() => setSelectedImage(null)}
//               >
//                 <X className="h-4 w-4" />
//               </Button>
//               <div className="relative aspect-square w-full overflow-hidden rounded-lg">
//                 <Image
//                   src={selectedImage.imageUrl || "/placeholder.svg"}
//                   alt={selectedImage.title}
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//               <div className="mt-4">
//                 <h3 className="font-serif text-2xl font-bold">{selectedImage.title}</h3>
//                 {selectedImage.description && <p className="mt-2 text-muted-foreground">{selectedImage.description}</p>}
//               </div>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </>
//   )
// }

"use client"

import Image from "next/image"
import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import type { GalleryImage } from "@prisma/client"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface GalleryBentoProps {
  images: GalleryImage[]
}

export function GalleryBento({ images }: GalleryBentoProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  // Create bento grid pattern with varying sizes
  const getBentoClass = (index: number) => {
    const pattern = index % 7
    switch (pattern) {
      case 0:
        return "md:col-span-2 md:row-span-2" // Large
      case 1:
      case 2:
        return "md:col-span-1 md:row-span-1" // Small
      case 3:
        return "md:col-span-2 md:row-span-1" // Wide
      case 4:
        return "md:col-span-1 md:row-span-2" // Tall
      default:
        return "md:col-span-1 md:row-span-1" // Small
    }
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:auto-rows-[200px]">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setSelectedImage(image)}
            className={`group relative overflow-hidden rounded-lg bg-muted transition-transform hover:scale-105 ${getBentoClass(
              index,
            )}`}
          >
            <Image
              src={image.url || "/placeholder.svg"}
              alt={image.alt || "Gallery image"}
              fill
              className="object-cover transition-opacity group-hover:opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="font-medium text-white text-balance">{image.alt || "Crochet creation"}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl">
          {selectedImage && (
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 z-10 bg-background/80 backdrop-blur-sm"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-4 w-4" />
              </Button>
              <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                <Image
                  src={selectedImage.url || "/placeholder.svg"}
                  alt={selectedImage.alt || "Gallery image"}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-4">
                <h3 className="font-serif text-2xl font-bold">{selectedImage.alt || "Crochet Creation"}</h3>
                <p className="mt-2 text-muted-foreground">{selectedImage.category}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
