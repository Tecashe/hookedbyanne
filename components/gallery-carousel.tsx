"use client"

import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { GalleryImage } from "@prisma/client"

interface GalleryCarouselProps {
  images: GalleryImage[]
}

export function GalleryCarousel({ images }: GalleryCarouselProps) {
  const [startIndex, setStartIndex] = useState(0)
  const itemsPerView = 3

  const goToPrevious = () => {
    setStartIndex((prev) => Math.max(0, prev - itemsPerView))
  }

  const goToNext = () => {
    setStartIndex((prev) => Math.min(images.length - itemsPerView, prev + itemsPerView))
  }

  const visibleImages = images.slice(startIndex, startIndex + itemsPerView)
  const canGoPrevious = startIndex > 0
  const canGoNext = startIndex + itemsPerView < images.length

  return (
    <div className="mx-auto max-w-6xl">
      <div className="relative">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {visibleImages.map((image) => (
            <div key={image.id} className="group relative overflow-hidden rounded-lg bg-muted">
              <div className="relative aspect-[3/4]">
                <Image
                  src={image.url || "/placeholder.svg"}
                  alt={image.alt || "Gallery image"}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-medium text-white text-balance">{image.alt || "Crochet creation"}</h3>
                  <p className="mt-1 text-sm text-white/80 text-balance">{image.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {canGoPrevious && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute -left-4 top-1/2 -translate-y-1/2 bg-background shadow-lg hover:bg-background/90"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        )}

        {canGoNext && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute -right-4 top-1/2 -translate-y-1/2 bg-background shadow-lg hover:bg-background/90"
            onClick={goToNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        )}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {Array.from({
          length: Math.ceil(images.length / itemsPerView),
        }).map((_, index) => (
          <button
            key={index}
            onClick={() => setStartIndex(index * itemsPerView)}
            className={`h-2 rounded-full transition-all ${
              Math.floor(startIndex / itemsPerView) === index ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30"
            }`}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
