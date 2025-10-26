"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createGalleryImage, deleteGalleryImage } from "@/actions/gallery"
import { Trash2 } from "lucide-react"

type GalleryImage = {
  id: string
  url: string
  alt: string | null
  category: string
  order: number
}

export function GalleryManager({ images }: { images: GalleryImage[] }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [url, setUrl] = useState("")
  const [alt, setAlt] = useState("")
  const [category, setCategory] = useState("general")

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await createGalleryImage({
        url,
        alt,
        category,
        order: images.length,
      })
      setUrl("")
      setAlt("")
      router.refresh()
    } catch (error) {
      console.error("Failed to add image:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteGalleryImage(id)
      router.refresh()
    } catch (error) {
      console.error("Failed to delete image:", error)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Image</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url">Image URL</Label>
              <Input
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="/cozy-crochet-blanket.png"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="alt">Alt Text</Label>
              <Input
                id="alt"
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
                placeholder="Beautiful handmade crochet blanket"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="general"
              />
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Image"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image) => (
          <Card key={image.id}>
            <CardContent className="p-4">
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image src={image.url || "/placeholder.svg"} alt={image.alt || ""} fill className="object-cover" />
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium">{image.alt || "No description"}</p>
                <p className="text-xs text-muted-foreground">Category: {image.category}</p>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(image.id)} className="w-full">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
