// "use client"

// import type React from "react"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import Image from "next/image"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { createGalleryImage, deleteGalleryImage } from "@/actions/gallery"
// import { Trash2 } from "lucide-react"

// type GalleryImage = {
//   id: string
//   url: string
//   alt: string | null
//   category: string
//   order: number
// }

// export function GalleryManager({ images }: { images: GalleryImage[] }) {
//   const router = useRouter()
//   const [loading, setLoading] = useState(false)
//   const [url, setUrl] = useState("")
//   const [alt, setAlt] = useState("")
//   const [category, setCategory] = useState("general")

//   const handleAdd = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)

//     try {
//       await createGalleryImage({
//         url,
//         alt,
//         category,
//         order: images.length,
//       })
//       setUrl("")
//       setAlt("")
//       router.refresh()
//     } catch (error) {
//       console.error("Failed to add image:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleDelete = async (id: string) => {
//     try {
//       await deleteGalleryImage(id)
//       router.refresh()
//     } catch (error) {
//       console.error("Failed to delete image:", error)
//     }
//   }

//   return (
//     <div className="space-y-6">
//       <Card>
//         <CardHeader>
//           <CardTitle>Add New Image</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleAdd} className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="url">Image URL</Label>
//               <Input
//                 id="url"
//                 value={url}
//                 onChange={(e) => setUrl(e.target.value)}
//                 placeholder="/cozy-crochet-blanket.png"
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="alt">Alt Text</Label>
//               <Input
//                 id="alt"
//                 value={alt}
//                 onChange={(e) => setAlt(e.target.value)}
//                 placeholder="Beautiful handmade crochet blanket"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="category">Category</Label>
//               <Input
//                 id="category"
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//                 placeholder="general"
//               />
//             </div>

//             <Button type="submit" disabled={loading}>
//               {loading ? "Adding..." : "Add Image"}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>

//       <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//         {images.map((image) => (
//           <Card key={image.id}>
//             <CardContent className="p-4">
//               <div className="relative aspect-video overflow-hidden rounded-lg">
//                 <Image src={image.url || "/placeholder.svg"} alt={image.alt || ""} fill className="object-cover" />
//               </div>
//               <div className="mt-4 space-y-2">
//                 <p className="text-sm font-medium">{image.alt || "No description"}</p>
//                 <p className="text-xs text-muted-foreground">Category: {image.category}</p>
//                 <Button variant="destructive" size="sm" onClick={() => handleDelete(image.id)} className="w-full">
//                   <Trash2 className="mr-2 h-4 w-4" />
//                   Delete
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   )
// }

"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createGalleryImage, deleteGalleryImage, linkGalleryImageToProduct } from "@/actions/gallery"
import { Trash2, ShoppingBag } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type GalleryImage = {
  id: string
  url: string
  alt: string | null
  category: string
  order: number
  productId: string | null
  product?: {
    id: string
    name: string
    price: number
  } | null
}

export function GalleryManager({
  images,
  products,
}: { images: GalleryImage[]; products?: Array<{ id: string; name: string }> }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [url, setUrl] = useState("")
  const [alt, setAlt] = useState("")
  const [category, setCategory] = useState("general")
  const [selectedProductId, setSelectedProductId] = useState<string>("")

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await createGalleryImage({
        url,
        alt,
        category,
        order: images.length,
        productId: selectedProductId || undefined,
      })
      setUrl("")
      setAlt("")
      setSelectedProductId("")
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

  const handleLinkProduct = async (imageId: string, productId: string | null) => {
    try {
      await linkGalleryImageToProduct(imageId, productId)
      router.refresh()
    } catch (error) {
      console.error("Failed to link product:", error)
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
                placeholder="/gallery/cozy-crochet-blanket.jpg"
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
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blankets">Blankets</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="home-decor">Home Decor</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {products && products.length > 0 && (
              <div className="space-y-2">
                <Label htmlFor="product">Link to Product (Optional)</Label>
                <Select value={selectedProductId} onValueChange={setSelectedProductId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no-product">No product</SelectItem>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Link this image to a product to make it shoppable in the gallery
                </p>
              </div>
            )}

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
                {image.product && (
                  <Badge className="absolute top-2 right-2 bg-primary/90 backdrop-blur-sm">
                    <ShoppingBag className="mr-1 h-3 w-3" />
                    Shoppable
                  </Badge>
                )}
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium">{image.alt || "No description"}</p>
                <p className="text-xs text-muted-foreground">Category: {image.category}</p>

                {image.product && (
                  <div className="rounded-md bg-muted p-2">
                    <p className="text-xs font-medium">Linked Product:</p>
                    <p className="text-xs text-muted-foreground">{image.product.name}</p>
                    <p className="text-xs font-semibold">${image.product.price.toFixed(2)}</p>
                  </div>
                )}

                {products && products.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-xs">Link Product</Label>
                    <Select
                      value={image.productId || "no-product"}
                      onValueChange={(value) => handleLinkProduct(image.id, value || null)}
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no-product">No product</SelectItem>
                        {products.map((product) => (
                          <SelectItem key={product.id} value={product.id}>
                            {product.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

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
