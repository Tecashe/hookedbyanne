"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GalleryGrid } from "@/components/gallery-grid"
import { GalleryMasonry } from "@/components/gallery-masonry"
import { GallerySlider } from "@/components/gallery-slider"
import { GalleryCarousel } from "@/components/gallery-carousel"
import { GalleryBento } from "@/components/gallery-bento"
import type { GalleryImage } from "@prisma/client"

interface GalleryTabsProps {
  images: GalleryImage[]
}

export function GalleryTabs({ images }: GalleryTabsProps) {
  const [activeTab, setActiveTab] = useState("grid")

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="mb-8 grid w-full max-w-2xl grid-cols-5 mx-auto">
        <TabsTrigger value="grid">Grid</TabsTrigger>
        <TabsTrigger value="masonry">Masonry</TabsTrigger>
        <TabsTrigger value="slider">Slider</TabsTrigger>
        <TabsTrigger value="carousel">Carousel</TabsTrigger>
        <TabsTrigger value="bento">Bento</TabsTrigger>
      </TabsList>

      <TabsContent value="grid" className="mt-0">
        <GalleryGrid images={images} />
      </TabsContent>

      <TabsContent value="masonry" className="mt-0">
        <GalleryMasonry images={images} />
      </TabsContent>

      <TabsContent value="slider" className="mt-0">
        <GallerySlider images={images} />
      </TabsContent>

      <TabsContent value="carousel" className="mt-0">
        <GalleryCarousel images={images} />
      </TabsContent>

      <TabsContent value="bento" className="mt-0">
        <GalleryBento images={images} />
      </TabsContent>
    </Tabs>
  )
}
