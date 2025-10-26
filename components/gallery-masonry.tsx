"use client"

import Image from "next/image"
import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import type { GalleryImage } from "@prisma/client"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface GalleryMasonryProps {
  images: GalleryImage[]
}

export function GalleryMasonry({ images }: GalleryMasonryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  // Split images into columns for masonry layout
  const columns = [
    images.filter((_, i) => i % 3 === 0),
    images.filter((_, i) => i % 3 === 1),
    images.filter((_, i) => i % 3 === 2),
  ]

  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="flex flex-col gap-4">
            {column.map((image) => (
              <button
                key={image.id}
                onClick={() => setSelectedImage(image)}
                className="group relative overflow-hidden rounded-lg bg-muted transition-transform hover:scale-105"
              >
                <div className="relative aspect-[3/4]">
                  <Image
                    src={image.url || "/placeholder.svg"}
                    alt={image.alt || "Gallery image"}
                    fill
                    className="object-cover transition-opacity group-hover:opacity-90"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="font-medium text-white text-balance">{image.alt || "Crochet creation"}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
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
