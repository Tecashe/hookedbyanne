"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createProduct, updateProduct } from "@/actions/products"
import { X } from "lucide-react"
import Image from "next/image"

type Product = {
  id: string
  name: string
  description: string
  price: number
  compareAtPrice: number | null
  images: string[]
  category: string
  tags: string[]
  stock: number
  featured: boolean
  isNewArrival: boolean
}

export function ProductForm({ product }: { product?: Product }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<string[]>(product?.images || [])
  const [imageInput, setImageInput] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)

    // Add images to formData
    images.forEach((img) => formData.append("images", img))

    try {
      if (product) {
        await updateProduct(product.id, formData)
      } else {
        await createProduct(formData)
      }
      router.push("/admin/products")
      router.refresh()
    } catch (error) {
      console.error("Failed to save product:", error)
    } finally {
      setLoading(false)
    }
  }

  const addImage = () => {
    if (imageInput.trim()) {
      setImages([...images, imageInput.trim()])
      setImageInput("")
    }
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input id="name" name="name" defaultValue={product?.name} required placeholder="Handmade Crochet Blanket" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={product?.description}
              required
              rows={4}
              placeholder="Describe your beautiful crochet product..."
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                defaultValue={product?.price}
                required
                placeholder="29.99"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="compareAtPrice">Compare at Price ($)</Label>
              <Input
                id="compareAtPrice"
                name="compareAtPrice"
                type="number"
                step="0.01"
                defaultValue={product?.compareAtPrice || ""}
                placeholder="39.99"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input id="category" name="category" defaultValue={product?.category} required placeholder="Blankets" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Input id="stock" name="stock" type="number" defaultValue={product?.stock} required placeholder="10" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input id="tags" name="tags" defaultValue={product?.tags.join(", ")} placeholder="handmade, cozy, gift" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Product Images</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={imageInput}
              onChange={(e) => setImageInput(e.target.value)}
              placeholder="Enter image URL or use /placeholder.svg?height=400&width=400&query=crochet blanket"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  addImage()
                }
              }}
            />
            <Button type="button" onClick={addImage}>
              Add
            </Button>
          </div>

          {images.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {images.map((img, index) => (
                <div key={index} className="relative aspect-square overflow-hidden rounded-lg border">
                  <Image src={img || "/placeholder.svg"} alt={`Product ${index + 1}`} fill className="object-cover" />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute right-2 top-2"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Display Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="featured">Featured Product</Label>
              <p className="text-sm text-muted-foreground">Show this product in featured sections</p>
            </div>
            <Switch id="featured" name="featured" defaultChecked={product?.featured} value="true" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="isNewArrival">New Arrival</Label>
              <p className="text-sm text-muted-foreground">Display in "New Arrivals" section</p>
            </div>
            <Switch id="isNewArrival" name="isNewArrival" defaultChecked={product?.isNewArrival ?? true} value="true" />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : product ? "Update Product" : "Create Product"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/products")}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
