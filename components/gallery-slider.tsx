"use client"

import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { GalleryImage } from "@prisma/client"

interface GallerySliderProps {
  images: GalleryImage[]
}

export function GallerySlider({ images }: GallerySliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  if (images.length === 0) {
    return <div className="text-center text-muted-foreground">No images available</div>
  }

  const currentImage = images[currentIndex]

  return (
    <div className="mx-auto max-w-5xl">
      <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-muted">
        <Image
          src={currentImage.url || "/placeholder.svg"}
          alt={currentImage.alt || "Gallery image"}
          fill
          className="object-cover"
          priority
        />

        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
          onClick={goToPrevious}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
          onClick={goToNext}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <h3 className="font-serif text-2xl font-bold text-white">{currentImage.alt || "Crochet Creation"}</h3>
          <p className="mt-2 text-white/90">{currentImage.category}</p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="mt-4 text-center text-sm text-muted-foreground">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  )
}
