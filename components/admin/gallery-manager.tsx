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

// "use client"

// import type React from "react"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import Image from "next/image"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { createGalleryImage, deleteGalleryImage, linkGalleryImageToProduct } from "@/actions/gallery"
// import { Trash2, ShoppingBag } from "lucide-react"
// import { Badge } from "@/components/ui/badge"

// type GalleryImage = {
//   id: string
//   url: string
//   alt: string | null
//   category: string
//   order: number
//   productId: string | null
//   product?: {
//     id: string
//     name: string
//     price: number
//   } | null
// }

// export function GalleryManager({
//   images,
//   products,
// }: { images: GalleryImage[]; products?: Array<{ id: string; name: string }> }) {
//   const router = useRouter()
//   const [loading, setLoading] = useState(false)
//   const [url, setUrl] = useState("")
//   const [alt, setAlt] = useState("")
//   const [category, setCategory] = useState("general")
//   const [selectedProductId, setSelectedProductId] = useState<string>("")

//   const handleAdd = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)

//     try {
//       await createGalleryImage({
//         url,
//         alt,
//         category,
//         order: images.length,
//         productId: selectedProductId || undefined,
//       })
//       setUrl("")
//       setAlt("")
//       setSelectedProductId("")
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

//   const handleLinkProduct = async (imageId: string, productId: string | null) => {
//     try {
//       await linkGalleryImageToProduct(imageId, productId)
//       router.refresh()
//     } catch (error) {
//       console.error("Failed to link product:", error)
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
//                 placeholder="/gallery/cozy-crochet-blanket.jpg"
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
//               <Select value={category} onValueChange={setCategory}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select category" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="blankets">Blankets</SelectItem>
//                   <SelectItem value="accessories">Accessories</SelectItem>
//                   <SelectItem value="clothing">Clothing</SelectItem>
//                   <SelectItem value="home-decor">Home Decor</SelectItem>
//                   <SelectItem value="general">General</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {products && products.length > 0 && (
//               <div className="space-y-2">
//                 <Label htmlFor="product">Link to Product (Optional)</Label>
//                 <Select value={selectedProductId} onValueChange={setSelectedProductId}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select a product" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="no-product">No product</SelectItem>
//                     {products.map((product) => (
//                       <SelectItem key={product.id} value={product.id}>
//                         {product.name}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 <p className="text-xs text-muted-foreground">
//                   Link this image to a product to make it shoppable in the gallery
//                 </p>
//               </div>
//             )}

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
//                 {image.product && (
//                   <Badge className="absolute top-2 right-2 bg-primary/90 backdrop-blur-sm">
//                     <ShoppingBag className="mr-1 h-3 w-3" />
//                     Shoppable
//                   </Badge>
//                 )}
//               </div>
//               <div className="mt-4 space-y-2">
//                 <p className="text-sm font-medium">{image.alt || "No description"}</p>
//                 <p className="text-xs text-muted-foreground">Category: {image.category}</p>

//                 {image.product && (
//                   <div className="rounded-md bg-muted p-2">
//                     <p className="text-xs font-medium">Linked Product:</p>
//                     <p className="text-xs text-muted-foreground">{image.product.name}</p>
//                     <p className="text-xs font-semibold">${image.product.price.toFixed(2)}</p>
//                   </div>
//                 )}

//                 {products && products.length > 0 && (
//                   <div className="space-y-2">
//                     <Label className="text-xs">Link Product</Label>
//                     <Select
//                       value={image.productId || "no-product"}
//                       onValueChange={(value) => handleLinkProduct(image.id, value || null)}
//                     >
//                       <SelectTrigger className="h-8 text-xs">
//                         <SelectValue placeholder="Select product" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="no-product">No product</SelectItem>
//                         {products.map((product) => (
//                           <SelectItem key={product.id} value={product.id}>
//                             {product.name}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 )}

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
import { Trash2, ShoppingBag, Upload } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { uploadImages } from "@/lib/blob"
import { useToast } from "@/hooks/use-toast"

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
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [uploadingImages, setUploadingImages] = useState(false)
  const [url, setUrl] = useState("")
  const [alt, setAlt] = useState("")
  const [category, setCategory] = useState("general")
  const [selectedProductId, setSelectedProductId] = useState<string>("")

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploadingImages(true)

    try {
      const fileArray = Array.from(files)
      const uploadedUrls = await uploadImages(fileArray)

      // Use the first uploaded image URL
      if (uploadedUrls.length > 0) {
        setUrl(uploadedUrls[0])
        toast({
          title: "Success",
          description: "Image uploaded successfully!",
        })
      }
    } catch (error) {
      console.error("Failed to upload image:", error)
      toast({
        title: "Error",
        description: "Failed to upload image. Please check your Blob integration and try again.",
        variant: "destructive",
      })
    } finally {
      setUploadingImages(false)
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!url.trim()) {
      toast({
        title: "Error",
        description: "Please upload an image or enter an image URL.",
        variant: "destructive",
      })
      return
    }

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
      toast({
        title: "Success",
        description: "Gallery image added successfully!",
      })
      router.refresh()
    } catch (error) {
      console.error("Failed to add image:", error)
      toast({
        title: "Error",
        description: "Failed to add image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteGalleryImage(id)
      toast({
        title: "Success",
        description: "Gallery image deleted successfully!",
      })
      router.refresh()
    } catch (error) {
      console.error("Failed to delete image:", error)
      toast({
        title: "Error",
        description: "Failed to delete image. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleLinkProduct = async (imageId: string, productId: string | null) => {
    try {
      await linkGalleryImageToProduct(imageId, productId)
      toast({
        title: "Success",
        description: productId ? "Product linked successfully!" : "Product unlinked successfully!",
      })
      router.refresh()
    } catch (error) {
      console.error("Failed to link product:", error)
      toast({
        title: "Error",
        description: "Failed to link product. Please try again.",
        variant: "destructive",
      })
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
              <Label>Upload Image</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => document.getElementById("gallery-image-upload")?.click()}
                  disabled={uploadingImages}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {uploadingImages ? "Uploading..." : "Upload from Device"}
                </Button>
                <input
                  id="gallery-image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="url">Or Enter Image URL</Label>
              <Input
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="/gallery/cozy-crochet-blanket.jpg"
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

            <Button type="submit" disabled={loading || uploadingImages}>
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
                      onValueChange={(value) => handleLinkProduct(image.id, value === "no-product" ? null : value)}
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
