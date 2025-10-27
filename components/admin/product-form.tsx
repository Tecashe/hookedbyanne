// "use client"

// import type React from "react"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Switch } from "@/components/ui/switch"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { createProduct, updateProduct } from "@/actions/products"
// import { X } from "lucide-react"
// import Image from "next/image"

// type Product = {
//   id: string
//   name: string
//   description: string
//   price: number
//   compareAtPrice: number | null
//   images: string[]
//   category: string
//   tags: string[]
//   stock: number
//   featured: boolean
//   isNewArrival: boolean
// }

// export function ProductForm({ product }: { product?: Product }) {
//   const router = useRouter()
//   const [loading, setLoading] = useState(false)
//   const [images, setImages] = useState<string[]>(product?.images || [])
//   const [imageInput, setImageInput] = useState("")

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     setLoading(true)

//     const formData = new FormData(e.currentTarget)

//     // Add images to formData
//     images.forEach((img) => formData.append("images", img))

//     try {
//       if (product) {
//         await updateProduct(product.id, formData)
//       } else {
//         await createProduct(formData)
//       }
//       router.push("/admin/products")
//       router.refresh()
//     } catch (error) {
//       console.error("Failed to save product:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const addImage = () => {
//     if (imageInput.trim()) {
//       setImages([...images, imageInput.trim()])
//       setImageInput("")
//     }
//   }

//   const removeImage = (index: number) => {
//     setImages(images.filter((_, i) => i !== index))
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <Card>
//         <CardHeader>
//           <CardTitle>Basic Information</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="name">Product Name</Label>
//             <Input id="name" name="name" defaultValue={product?.name} required placeholder="Handmade Crochet Blanket" />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="description">Description</Label>
//             <Textarea
//               id="description"
//               name="description"
//               defaultValue={product?.description}
//               required
//               rows={4}
//               placeholder="Describe your beautiful crochet product..."
//             />
//           </div>

//           <div className="grid gap-4 md:grid-cols-2">
//             <div className="space-y-2">
//               <Label htmlFor="price">Price ($)</Label>
//               <Input
//                 id="price"
//                 name="price"
//                 type="number"
//                 step="0.01"
//                 defaultValue={product?.price}
//                 required
//                 placeholder="29.99"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="compareAtPrice">Compare at Price ($)</Label>
//               <Input
//                 id="compareAtPrice"
//                 name="compareAtPrice"
//                 type="number"
//                 step="0.01"
//                 defaultValue={product?.compareAtPrice || ""}
//                 placeholder="39.99"
//               />
//             </div>
//           </div>

//           <div className="grid gap-4 md:grid-cols-2">
//             <div className="space-y-2">
//               <Label htmlFor="category">Category</Label>
//               <Input id="category" name="category" defaultValue={product?.category} required placeholder="Blankets" />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="stock">Stock</Label>
//               <Input id="stock" name="stock" type="number" defaultValue={product?.stock} required placeholder="10" />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="tags">Tags (comma separated)</Label>
//             <Input id="tags" name="tags" defaultValue={product?.tags.join(", ")} placeholder="handmade, cozy, gift" />
//           </div>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle>Product Images</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="flex gap-2">
//             <Input
//               value={imageInput}
//               onChange={(e) => setImageInput(e.target.value)}
//               placeholder="Enter image URL or use /placeholder.svg?height=400&width=400&query=crochet blanket"
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") {
//                   e.preventDefault()
//                   addImage()
//                 }
//               }}
//             />
//             <Button type="button" onClick={addImage}>
//               Add
//             </Button>
//           </div>

//           {images.length > 0 && (
//             <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
//               {images.map((img, index) => (
//                 <div key={index} className="relative aspect-square overflow-hidden rounded-lg border">
//                   <Image src={img || "/placeholder.svg"} alt={`Product ${index + 1}`} fill className="object-cover" />
//                   <Button
//                     type="button"
//                     variant="destructive"
//                     size="sm"
//                     className="absolute right-2 top-2"
//                     onClick={() => removeImage(index)}
//                   >
//                     <X className="h-4 w-4" />
//                   </Button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle>Display Options</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="flex items-center justify-between">
//             <div className="space-y-0.5">
//               <Label htmlFor="featured">Featured Product</Label>
//               <p className="text-sm text-muted-foreground">Show this product in featured sections</p>
//             </div>
//             <Switch id="featured" name="featured" defaultChecked={product?.featured} value="true" />
//           </div>

//           <div className="flex items-center justify-between">
//             <div className="space-y-0.5">
//               <Label htmlFor="isNewArrival">New Arrival</Label>
//               <p className="text-sm text-muted-foreground">Display in "New Arrivals" section</p>
//             </div>
//             <Switch id="isNewArrival" name="isNewArrival" defaultChecked={product?.isNewArrival ?? true} value="true" />
//           </div>
//         </CardContent>
//       </Card>

//       <div className="flex gap-4">
//         <Button type="submit" disabled={loading}>
//           {loading ? "Saving..." : product ? "Update Product" : "Create Product"}
//         </Button>
//         <Button type="button" variant="outline" onClick={() => router.push("/admin/products")}>
//           Cancel
//         </Button>
//       </div>
//     </form>
//   )
// }



// "use client"

// import type React from "react"
// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Switch } from "@/components/ui/switch"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { createProduct, updateProduct } from "@/actions/products"
// import { X, Plus, Upload } from "lucide-react"
// import Image from "next/image"
// import { Badge } from "@/components/ui/badge"

// type Product = {
//   id: string
//   name: string
//   description: string
//   price: number
//   compareAtPrice: number | null
//   images: string[]
//   category: string
//   tags: string[]
//   stock: number
//   featured: boolean
//   isNewArrival: boolean
// }

// type ProductVariant = {
//   color: string
//   colorHex: string
//   size: string
//   sku: string
//   price: number
//   stock: number
//   images: string[]
// }

// export function ProductForm({ product }: { product?: Product }) {
//   const router = useRouter()
//   const [loading, setLoading] = useState(false)
//   const [images, setImages] = useState<string[]>(product?.images || [])
//   const [imageInput, setImageInput] = useState("")

//   const [hasVariants, setHasVariants] = useState(false)
//   const [colors, setColors] = useState<Array<{ name: string; hex: string }>>([{ name: "", hex: "#FF6B6B" }])
//   const [sizes, setSizes] = useState<string[]>([""])
//   const [variants, setVariants] = useState<ProductVariant[]>([])
//   const [uploadingImages, setUploadingImages] = useState(false)

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     setLoading(true)

//     const formData = new FormData(e.currentTarget)

//     // Add images to formData
//     images.forEach((img) => formData.append("images", img))

//     if (hasVariants) {
//       formData.append("hasVariants", "true")
//       formData.append("variants", JSON.stringify(variants))
//     }

//     try {
//       if (product) {
//         await updateProduct(product.id, formData)
//       } else {
//         await createProduct(formData)
//       }
//       router.push("/admin/products")
//       router.refresh()
//     } catch (error) {
//       console.error("Failed to save product:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, variantIndex?: number) => {
//     const files = e.target.files
//     if (!files || files.length === 0) return

//     setUploadingImages(true)
//     try {
//       const uploadedUrls: string[] = []

//       for (const file of Array.from(files)) {
//         // Create a temporary URL for preview
//         const tempUrl = URL.createObjectURL(file)
//         uploadedUrls.push(tempUrl)
//       }

//       if (variantIndex !== undefined) {
//         // Add to specific variant
//         const newVariants = [...variants]
//         newVariants[variantIndex].images = [...newVariants[variantIndex].images, ...uploadedUrls]
//         setVariants(newVariants)
//       } else {
//         // Add to main product images
//         setImages([...images, ...uploadedUrls])
//       }
//     } catch (error) {
//       console.error("Failed to upload images:", error)
//     } finally {
//       setUploadingImages(false)
//     }
//   }

//   const addImage = () => {
//     if (imageInput.trim()) {
//       setImages([...images, imageInput.trim()])
//       setImageInput("")
//     }
//   }

//   const removeImage = (index: number) => {
//     setImages(images.filter((_, i) => i !== index))
//   }

//   const addColor = () => {
//     setColors([...colors, { name: "", hex: "#FF6B6B" }])
//   }

//   const addSize = () => {
//     setSizes([...sizes, ""])
//   }

//   const updateColor = (index: number, field: "name" | "hex", value: string) => {
//     const newColors = [...colors]
//     newColors[index][field] = value
//     setColors(newColors)
//   }

//   const updateSize = (index: number, value: string) => {
//     const newSizes = [...sizes]
//     newSizes[index] = value
//     setSizes(newSizes)
//   }

//   const removeColor = (index: number) => {
//     setColors(colors.filter((_, i) => i !== index))
//   }

//   const removeSize = (index: number) => {
//     setSizes(sizes.filter((_, i) => i !== index))
//   }

//   const generateVariants = () => {
//     const validColors = colors.filter((c) => c.name.trim())
//     const validSizes = sizes.filter((s) => s.trim())

//     const newVariants: ProductVariant[] = []

//     validColors.forEach((color) => {
//       validSizes.forEach((size) => {
//         newVariants.push({
//           color: color.name,
//           colorHex: color.hex,
//           size,
//           sku: `${color.name.toUpperCase()}-${size.toUpperCase()}`,
//           price: 0,
//           stock: 0,
//           images: [],
//         })
//       })
//     })

//     setVariants(newVariants)
//   }

//   const updateVariant = (index: number, field: keyof ProductVariant, value: any) => {
//     const newVariants = [...variants]
//     newVariants[index] = { ...newVariants[index], [field]: value }
//     setVariants(newVariants)
//   }

//   const removeVariantImage = (variantIndex: number, imageIndex: number) => {
//     const newVariants = [...variants]
//     newVariants[variantIndex].images = newVariants[variantIndex].images.filter((_, i) => i !== imageIndex)
//     setVariants(newVariants)
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <Card>
//         <CardHeader>
//           <CardTitle>Basic Information</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="name">Product Name</Label>
//             <Input id="name" name="name" defaultValue={product?.name} required placeholder="Handmade Crochet Blanket" />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="description">Description</Label>
//             <Textarea
//               id="description"
//               name="description"
//               defaultValue={product?.description}
//               required
//               rows={4}
//               placeholder="Describe your beautiful crochet product..."
//             />
//           </div>

//           <div className="grid gap-4 md:grid-cols-2">
//             <div className="space-y-2">
//               <Label htmlFor="price">Price ($)</Label>
//               <Input
//                 id="price"
//                 name="price"
//                 type="number"
//                 step="0.01"
//                 defaultValue={product?.price}
//                 required={!hasVariants}
//                 disabled={hasVariants}
//                 placeholder="29.99"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="compareAtPrice">Compare at Price ($)</Label>
//               <Input
//                 id="compareAtPrice"
//                 name="compareAtPrice"
//                 type="number"
//                 step="0.01"
//                 defaultValue={product?.compareAtPrice || ""}
//                 placeholder="39.99"
//               />
//             </div>
//           </div>

//           <div className="grid gap-4 md:grid-cols-2">
//             <div className="space-y-2">
//               <Label htmlFor="category">Category</Label>
//               <Input id="category" name="category" defaultValue={product?.category} required placeholder="Blankets" />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="stock">Stock</Label>
//               <Input
//                 id="stock"
//                 name="stock"
//                 type="number"
//                 defaultValue={product?.stock}
//                 required={!hasVariants}
//                 disabled={hasVariants}
//                 placeholder="10"
//               />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="tags">Tags (comma separated)</Label>
//             <Input id="tags" name="tags" defaultValue={product?.tags.join(", ")} placeholder="handmade, cozy, gift" />
//           </div>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <div className="flex items-center justify-between">
//             <CardTitle>Product Variants</CardTitle>
//             <Switch checked={hasVariants} onCheckedChange={setHasVariants} />
//           </div>
//         </CardHeader>
//         {hasVariants && (
//           <CardContent className="space-y-6">
//             {/* Colors */}
//             <div className="space-y-3">
//               <div className="flex items-center justify-between">
//                 <Label>Available Colors</Label>
//                 <Button type="button" size="sm" variant="outline" onClick={addColor}>
//                   <Plus className="h-4 w-4 mr-1" /> Add Color
//                 </Button>
//               </div>
//               <div className="space-y-2">
//                 {colors.map((color, index) => (
//                   <div key={index} className="flex gap-2">
//                     <div className="relative">
//                       <input
//                         type="color"
//                         value={color.hex}
//                         onChange={(e) => updateColor(index, "hex", e.target.value)}
//                         className="h-10 w-16 rounded-md border cursor-pointer"
//                         title="Pick color"
//                       />
//                     </div>
//                     <Input
//                       value={color.name}
//                       onChange={(e) => updateColor(index, "name", e.target.value)}
//                       placeholder="e.g., Forest Green, Sky Blue"
//                       className="flex-1"
//                     />
//                     <Input
//                       value={color.hex}
//                       onChange={(e) => updateColor(index, "hex", e.target.value)}
//                       placeholder="#FF6B6B"
//                       className="w-28"
//                       pattern="^#[0-9A-Fa-f]{6}$"
//                     />
//                     {colors.length > 1 && (
//                       <Button type="button" size="icon" variant="ghost" onClick={() => removeColor(index)}>
//                         <X className="h-4 w-4" />
//                       </Button>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Sizes */}
//             <div className="space-y-3">
//               <div className="flex items-center justify-between">
//                 <Label>Available Sizes</Label>
//                 <Button type="button" size="sm" variant="outline" onClick={addSize}>
//                   <Plus className="h-4 w-4 mr-1" /> Add Size
//                 </Button>
//               </div>
//               <div className="space-y-2">
//                 {sizes.map((size, index) => (
//                   <div key={index} className="flex gap-2">
//                     <Input
//                       value={size}
//                       onChange={(e) => updateSize(index, e.target.value)}
//                       placeholder="e.g., Small, Medium, Large, XL"
//                     />
//                     {sizes.length > 1 && (
//                       <Button type="button" size="icon" variant="ghost" onClick={() => removeSize(index)}>
//                         <X className="h-4 w-4" />
//                       </Button>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <Button type="button" onClick={generateVariants} className="w-full">
//               Generate Variants
//             </Button>

//             {/* Variant Details */}
//             {variants.length > 0 && (
//               <div className="space-y-4 pt-4 border-t">
//                 <h4 className="font-semibold">Variant Details ({variants.length} variants)</h4>
//                 {variants.map((variant, index) => (
//                   <Card key={index}>
//                     <CardHeader>
//                       <CardTitle className="text-base flex items-center gap-2">
//                         <Badge>{variant.color}</Badge>
//                         <Badge variant="outline">{variant.size}</Badge>
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent className="space-y-4">
//                       <div className="grid gap-4 md:grid-cols-3">
//                         <div className="space-y-2">
//                           <Label>SKU</Label>
//                           <Input
//                             value={variant.sku}
//                             onChange={(e) => updateVariant(index, "sku", e.target.value)}
//                             placeholder="SKU"
//                           />
//                         </div>
//                         <div className="space-y-2">
//                           <Label>Price ($)</Label>
//                           <Input
//                             type="number"
//                             step="0.01"
//                             value={variant.price || ""}
//                             onChange={(e) => updateVariant(index, "price", Number.parseFloat(e.target.value))}
//                             placeholder="29.99"
//                           />
//                         </div>
//                         <div className="space-y-2">
//                           <Label>Stock</Label>
//                           <Input
//                             type="number"
//                             value={variant.stock || ""}
//                             onChange={(e) => updateVariant(index, "stock", Number.parseInt(e.target.value))}
//                             placeholder="10"
//                           />
//                         </div>
//                       </div>

//                       {/* Variant Images */}
//                       <div className="space-y-2">
//                         <Label>Variant Images</Label>
//                         <div className="flex gap-2">
//                           <Button
//                             type="button"
//                             variant="outline"
//                             className="w-full bg-transparent"
//                             onClick={() => document.getElementById(`variant-upload-${index}`)?.click()}
//                             disabled={uploadingImages}
//                           >
//                             <Upload className="h-4 w-4 mr-2" />
//                             {uploadingImages ? "Uploading..." : "Upload Images"}
//                           </Button>
//                           <input
//                             id={`variant-upload-${index}`}
//                             type="file"
//                             accept="image/*"
//                             multiple
//                             className="hidden"
//                             onChange={(e) => handleImageUpload(e, index)}
//                           />
//                         </div>

//                         {variant.images.length > 0 && (
//                           <div className="grid gap-2 grid-cols-3 mt-2">
//                             {variant.images.map((img, imgIndex) => (
//                               <div key={imgIndex} className="relative aspect-square overflow-hidden rounded-lg border">
//                                 <Image
//                                   src={img || "/placeholder.svg"}
//                                   alt={`${variant.color} ${variant.size}`}
//                                   fill
//                                   className="object-cover"
//                                 />
//                                 <Button
//                                   type="button"
//                                   variant="destructive"
//                                   size="sm"
//                                   className="absolute right-1 top-1 h-6 w-6 p-0"
//                                   onClick={() => removeVariantImage(index, imgIndex)}
//                                 >
//                                   <X className="h-3 w-3" />
//                                 </Button>
//                               </div>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             )}
//           </CardContent>
//         )}
//       </Card>

//       {!hasVariants && (
//         <Card>
//           <CardHeader>
//             <CardTitle>Product Images</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="flex gap-2">
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => document.getElementById("main-image-upload")?.click()}
//                 disabled={uploadingImages}
//               >
//                 <Upload className="h-4 w-4 mr-2" />
//                 {uploadingImages ? "Uploading..." : "Upload from Device"}
//               </Button>
//               <input
//                 id="main-image-upload"
//                 type="file"
//                 accept="image/*"
//                 multiple
//                 className="hidden"
//                 onChange={(e) => handleImageUpload(e)}
//               />
//             </div>

//             <div className="flex gap-2">
//               <Input
//                 value={imageInput}
//                 onChange={(e) => setImageInput(e.target.value)}
//                 placeholder="Or enter image URL"
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter") {
//                     e.preventDefault()
//                     addImage()
//                   }
//                 }}
//               />
//               <Button type="button" onClick={addImage}>
//                 Add
//               </Button>
//             </div>

//             {images.length > 0 && (
//               <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
//                 {images.map((img, index) => (
//                   <div key={index} className="relative aspect-square overflow-hidden rounded-lg border">
//                     <Image src={img || "/placeholder.svg"} alt={`Product ${index + 1}`} fill className="object-cover" />
//                     <Button
//                       type="button"
//                       variant="destructive"
//                       size="sm"
//                       className="absolute right-2 top-2"
//                       onClick={() => removeImage(index)}
//                     >
//                       <X className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       )}

//       <div className="flex gap-4">
//         <Button type="submit" disabled={loading}>
//           {loading ? "Saving..." : product ? "Update Product" : "Create Product"}
//         </Button>
//         <Button type="button" variant="outline" onClick={() => router.push("/admin/products")}>
//           Cancel
//         </Button>
//       </div>
//     </form>
//   )
// }

// "use client"

// import type React from "react"
// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Switch } from "@/components/ui/switch"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { createProduct, updateProduct } from "@/actions/products"
// import { X, Plus, Upload } from "lucide-react"
// import Image from "next/image"
// import { Badge } from "@/components/ui/badge"

// type Product = {
//   id: string
//   name: string
//   description: string
//   price: number
//   compareAtPrice: number | null
//   images: string[]
//   category: string
//   tags: string[]
//   stock: number
//   featured: boolean
//   isNewArrival: boolean
// }

// type ProductVariant = {
//   color: string
//   colorHex: string
//   size: string
//   sku: string
//   price: number
//   stock: number
//   images: string[]
// }

// export function ProductForm({ product }: { product?: Product }) {
//   const router = useRouter()
//   const [loading, setLoading] = useState(false)
//   const [images, setImages] = useState<string[]>(product?.images || [])
//   const [imageInput, setImageInput] = useState("")

//   const [hasVariants, setHasVariants] = useState(false)
//   const [colors, setColors] = useState<Array<{ name: string; hex: string }>>([{ name: "", hex: "#FF6B6B" }])
//   const [sizes, setSizes] = useState<string[]>([""])
//   const [variants, setVariants] = useState<ProductVariant[]>([])
//   const [uploadingImages, setUploadingImages] = useState(false)

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     setLoading(true)

//     const formData = new FormData(e.currentTarget)

//     // Add images to formData
//     images.forEach((img) => formData.append("images", img))

//     if (hasVariants) {
//       formData.append("hasVariants", "true")
//       formData.append("variants", JSON.stringify(variants))

//       // Set base price to the lowest variant price, or 0 if no variants
//       const lowestPrice = variants.length > 0 ? Math.min(...variants.map((v) => v.price || 0)) : 0
//       formData.set("price", lowestPrice.toString())

//       // Set stock to total of all variant stocks
//       const totalStock = variants.reduce((sum, v) => sum + (v.stock || 0), 0)
//       formData.set("stock", totalStock.toString())
//     }

//     try {
//       if (product) {
//         await updateProduct(product.id, formData)
//       } else {
//         await createProduct(formData)
//       }
//       router.push("/admin/products")
//       router.refresh()
//     } catch (error) {
//       console.error("Failed to save product:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, variantIndex?: number) => {
//     const files = e.target.files
//     if (!files || files.length === 0) return

//     setUploadingImages(true)
//     try {
//       const uploadedUrls: string[] = []

//       for (const file of Array.from(files)) {
//         // Create a temporary URL for preview
//         const tempUrl = URL.createObjectURL(file)
//         uploadedUrls.push(tempUrl)
//       }

//       if (variantIndex !== undefined) {
//         // Add to specific variant
//         const newVariants = [...variants]
//         newVariants[variantIndex].images = [...newVariants[variantIndex].images, ...uploadedUrls]
//         setVariants(newVariants)
//       } else {
//         // Add to main product images
//         setImages([...images, ...uploadedUrls])
//       }
//     } catch (error) {
//       console.error("Failed to upload images:", error)
//     } finally {
//       setUploadingImages(false)
//     }
//   }

//   const addImage = () => {
//     if (imageInput.trim()) {
//       setImages([...images, imageInput.trim()])
//       setImageInput("")
//     }
//   }

//   const removeImage = (index: number) => {
//     setImages(images.filter((_, i) => i !== index))
//   }

//   const addColor = () => {
//     setColors([...colors, { name: "", hex: "#FF6B6B" }])
//   }

//   const addSize = () => {
//     setSizes([...sizes, ""])
//   }

//   const updateColor = (index: number, field: "name" | "hex", value: string) => {
//     const newColors = [...colors]
//     newColors[index][field] = value
//     setColors(newColors)
//   }

//   const updateSize = (index: number, value: string) => {
//     const newSizes = [...sizes]
//     newSizes[index] = value
//     setSizes(newSizes)
//   }

//   const removeColor = (index: number) => {
//     setColors(colors.filter((_, i) => i !== index))
//   }

//   const removeSize = (index: number) => {
//     setSizes(sizes.filter((_, i) => i !== index))
//   }

//   const generateVariants = () => {
//     const validColors = colors.filter((c) => c.name.trim())
//     const validSizes = sizes.filter((s) => s.trim())

//     const newVariants: ProductVariant[] = []

//     validColors.forEach((color) => {
//       validSizes.forEach((size) => {
//         newVariants.push({
//           color: color.name,
//           colorHex: color.hex,
//           size,
//           sku: `${color.name.toUpperCase()}-${size.toUpperCase()}`,
//           price: 0,
//           stock: 0,
//           images: [],
//         })
//       })
//     })

//     setVariants(newVariants)
//   }

//   const updateVariant = (index: number, field: keyof ProductVariant, value: any) => {
//     const newVariants = [...variants]
//     newVariants[index] = { ...newVariants[index], [field]: value }
//     setVariants(newVariants)
//   }

//   const removeVariantImage = (variantIndex: number, imageIndex: number) => {
//     const newVariants = [...variants]
//     newVariants[variantIndex].images = newVariants[variantIndex].images.filter((_, i) => i !== imageIndex)
//     setVariants(newVariants)
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <Card>
//         <CardHeader>
//           <CardTitle>Basic Information</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="name">Product Name</Label>
//             <Input id="name" name="name" defaultValue={product?.name} required placeholder="Handmade Crochet Blanket" />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="description">Description</Label>
//             <Textarea
//               id="description"
//               name="description"
//               defaultValue={product?.description}
//               required
//               rows={4}
//               placeholder="Describe your beautiful crochet product..."
//             />
//           </div>

//           <div className="grid gap-4 md:grid-cols-2">
//             <div className="space-y-2">
//               <Label htmlFor="price">Price ($)</Label>
//               <Input
//                 id="price"
//                 name="price"
//                 type="number"
//                 step="0.01"
//                 defaultValue={product?.price}
//                 required={!hasVariants}
//                 disabled={hasVariants}
//                 placeholder="29.99"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="compareAtPrice">Compare at Price ($)</Label>
//               <Input
//                 id="compareAtPrice"
//                 name="compareAtPrice"
//                 type="number"
//                 step="0.01"
//                 defaultValue={product?.compareAtPrice || ""}
//                 placeholder="39.99"
//               />
//             </div>
//           </div>

//           <div className="grid gap-4 md:grid-cols-2">
//             <div className="space-y-2">
//               <Label htmlFor="category">Category</Label>
//               <Input id="category" name="category" defaultValue={product?.category} required placeholder="Blankets" />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="stock">Stock</Label>
//               <Input
//                 id="stock"
//                 name="stock"
//                 type="number"
//                 defaultValue={product?.stock}
//                 required={!hasVariants}
//                 disabled={hasVariants}
//                 placeholder="10"
//               />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="tags">Tags (comma separated)</Label>
//             <Input id="tags" name="tags" defaultValue={product?.tags.join(", ")} placeholder="handmade, cozy, gift" />
//           </div>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <div className="flex items-center justify-between">
//             <CardTitle>Product Variants</CardTitle>
//             <Switch checked={hasVariants} onCheckedChange={setHasVariants} />
//           </div>
//         </CardHeader>
//         {hasVariants && (
//           <CardContent className="space-y-6">
//             {/* Colors */}
//             <div className="space-y-3">
//               <div className="flex items-center justify-between">
//                 <Label>Available Colors</Label>
//                 <Button type="button" size="sm" variant="outline" onClick={addColor}>
//                   <Plus className="h-4 w-4 mr-1" /> Add Color
//                 </Button>
//               </div>
//               <div className="space-y-2">
//                 {colors.map((color, index) => (
//                   <div key={index} className="flex gap-2">
//                     <div className="relative">
//                       <input
//                         type="color"
//                         value={color.hex}
//                         onChange={(e) => updateColor(index, "hex", e.target.value)}
//                         className="h-10 w-16 rounded-md border cursor-pointer"
//                         title="Pick color"
//                       />
//                     </div>
//                     <Input
//                       value={color.name}
//                       onChange={(e) => updateColor(index, "name", e.target.value)}
//                       placeholder="e.g., Forest Green, Sky Blue"
//                       className="flex-1"
//                     />
//                     <Input
//                       value={color.hex}
//                       onChange={(e) => updateColor(index, "hex", e.target.value)}
//                       placeholder="#FF6B6B"
//                       className="w-28"
//                       pattern="^#[0-9A-Fa-f]{6}$"
//                     />
//                     {colors.length > 1 && (
//                       <Button type="button" size="icon" variant="ghost" onClick={() => removeColor(index)}>
//                         <X className="h-4 w-4" />
//                       </Button>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Sizes */}
//             <div className="space-y-3">
//               <div className="flex items-center justify-between">
//                 <Label>Available Sizes</Label>
//                 <Button type="button" size="sm" variant="outline" onClick={addSize}>
//                   <Plus className="h-4 w-4 mr-1" /> Add Size
//                 </Button>
//               </div>
//               <div className="space-y-2">
//                 {sizes.map((size, index) => (
//                   <div key={index} className="flex gap-2">
//                     <Input
//                       value={size}
//                       onChange={(e) => updateSize(index, e.target.value)}
//                       placeholder="e.g., Small, Medium, Large, XL"
//                     />
//                     {sizes.length > 1 && (
//                       <Button type="button" size="icon" variant="ghost" onClick={() => removeSize(index)}>
//                         <X className="h-4 w-4" />
//                       </Button>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <Button type="button" onClick={generateVariants} className="w-full">
//               Generate Variants
//             </Button>

//             {/* Variant Details */}
//             {variants.length > 0 && (
//               <div className="space-y-4 pt-4 border-t">
//                 <h4 className="font-semibold">Variant Details ({variants.length} variants)</h4>
//                 {variants.map((variant, index) => (
//                   <Card key={index}>
//                     <CardHeader>
//                       <CardTitle className="text-base flex items-center gap-2">
//                         <Badge>{variant.color}</Badge>
//                         <Badge variant="outline">{variant.size}</Badge>
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent className="space-y-4">
//                       <div className="grid gap-4 md:grid-cols-3">
//                         <div className="space-y-2">
//                           <Label>SKU</Label>
//                           <Input
//                             value={variant.sku}
//                             onChange={(e) => updateVariant(index, "sku", e.target.value)}
//                             placeholder="SKU"
//                           />
//                         </div>
//                         <div className="space-y-2">
//                           <Label>Price ($)</Label>
//                           <Input
//                             type="number"
//                             step="0.01"
//                             value={variant.price || ""}
//                             onChange={(e) => updateVariant(index, "price", Number.parseFloat(e.target.value))}
//                             placeholder="29.99"
//                           />
//                         </div>
//                         <div className="space-y-2">
//                           <Label>Stock</Label>
//                           <Input
//                             type="number"
//                             value={variant.stock || ""}
//                             onChange={(e) => updateVariant(index, "stock", Number.parseInt(e.target.value))}
//                             placeholder="10"
//                           />
//                         </div>
//                       </div>

//                       {/* Variant Images*/}
//                       <div className="space-y-2">
//                         <Label>Variant Images</Label>
//                         <div className="flex gap-2">
//                           <Button
//                             type="button"
//                             variant="outline"
//                             className="w-full bg-transparent"
//                             onClick={() => document.getElementById(`variant-upload-${index}`)?.click()}
//                             disabled={uploadingImages}
//                           >
//                             <Upload className="h-4 w-4 mr-2" />
//                             {uploadingImages ? "Uploading..." : "Upload Images"}
//                           </Button>
//                           <input
//                             id={`variant-upload-${index}`}
//                             type="file"
//                             accept="image/*"
//                             multiple
//                             className="hidden"
//                             onChange={(e) => handleImageUpload(e, index)}
//                           />
//                         </div>

//                         {variant.images.length > 0 && (
//                           <div className="grid gap-2 grid-cols-3 mt-2">
//                             {variant.images.map((img, imgIndex) => (
//                               <div key={imgIndex} className="relative aspect-square overflow-hidden rounded-lg border">
//                                 <Image
//                                   src={img || "/placeholder.svg"}
//                                   alt={`${variant.color} ${variant.size}`}
//                                   fill
//                                   className="object-cover"
//                                 />
//                                 <Button
//                                   type="button"
//                                   variant="destructive"
//                                   size="sm"
//                                   className="absolute right-1 top-1 h-6 w-6 p-0"
//                                   onClick={() => removeVariantImage(index, imgIndex)}
//                                 >
//                                   <X className="h-3 w-3" />
//                                 </Button>
//                               </div>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             )}
//           </CardContent>
//         )}
//       </Card>

//       {!hasVariants && (
//         <Card>
//           <CardHeader>
//             <CardTitle>Product Images</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="flex gap-2">
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => document.getElementById("main-image-upload")?.click()}
//                 disabled={uploadingImages}
//               >
//                 <Upload className="h-4 w-4 mr-2" />
//                 {uploadingImages ? "Uploading..." : "Upload from Device"}
//               </Button>
//               <input
//                 id="main-image-upload"
//                 type="file"
//                 accept="image/*"
//                 multiple
//                 className="hidden"
//                 onChange={(e) => handleImageUpload(e)}
//               />
//             </div>

//             <div className="flex gap-2">
//               <Input
//                 value={imageInput}
//                 onChange={(e) => setImageInput(e.target.value)}
//                 placeholder="Or enter image URL"
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter") {
//                     e.preventDefault()
//                     addImage()
//                   }
//                 }}
//               />
//               <Button type="button" onClick={addImage}>
//                 Add
//               </Button>
//             </div>

//             {images.length > 0 && (
//               <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
//                 {images.map((img, index) => (
//                   <div key={index} className="relative aspect-square overflow-hidden rounded-lg border">
//                     <Image src={img || "/placeholder.svg"} alt={`Product ${index + 1}`} fill className="object-cover" />
//                     <Button
//                       type="button"
//                       variant="destructive"
//                       size="sm"
//                       className="absolute right-2 top-2"
//                       onClick={() => removeImage(index)}
//                     >
//                       <X className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       )}

//       <div className="flex gap-4">
//         <Button type="submit" disabled={loading}>
//           {loading ? "Saving..." : product ? "Update Product" : "Create Product"}
//         </Button>
//         <Button type="button" variant="outline" onClick={() => router.push("/admin/products")}>
//           Cancel
//         </Button>
//       </div>
//     </form>
//   )
// }


// "use client"

// import type React from "react"
// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Switch } from "@/components/ui/switch"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { createProduct, updateProduct } from "@/actions/products"
// import { X, Plus, Upload } from "lucide-react"
// import Image from "next/image"
// import { Badge } from "@/components/ui/badge"
// import { useToast } from "@/hooks/use-toast"

// type Product = {
//   id: string
//   name: string
//   description: string
//   price: number
//   compareAtPrice: number | null
//   images: string[]
//   category: string
//   tags: string[]
//   stock: number
//   featured: boolean
//   isNewArrival: boolean
// }

// type ProductVariant = {
//   color: string
//   colorHex: string
//   size: string
//   sku: string
//   price: number
//   stock: number
//   images: string[]
// }

// export function ProductForm({ product }: { product?: Product }) {
//   const router = useRouter()
//   const { toast } = useToast()
//   const [loading, setLoading] = useState(false)
//   const [images, setImages] = useState<string[]>(product?.images || [])
//   const [imageInput, setImageInput] = useState("")

//   const [hasVariants, setHasVariants] = useState(false)
//   const [colors, setColors] = useState<Array<{ name: string; hex: string }>>([{ name: "", hex: "#FF6B6B" }])
//   const [sizes, setSizes] = useState<string[]>([""])
//   const [variants, setVariants] = useState<ProductVariant[]>([])
//   const [uploadingImages, setUploadingImages] = useState(false)

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     setLoading(true)

//     const formData = new FormData(e.currentTarget)

//     // Add images to formData
//     images.forEach((img) => formData.append("images", img))

//     if (hasVariants) {
//       formData.append("hasVariants", "true")
//       formData.append("variants", JSON.stringify(variants))

//       // Set base price to the lowest variant price, or 0 if no variants
//       const lowestPrice = variants.length > 0 ? Math.min(...variants.map((v) => v.price || 0)) : 0
//       formData.set("price", lowestPrice.toString())

//       // Set stock to total of all variant stocks
//       const totalStock = variants.reduce((sum, v) => sum + (v.stock || 0), 0)
//       formData.set("stock", totalStock.toString())
//     }

//     try {
//       if (product) {
//         await updateProduct(product.id, formData)
//       } else {
//         await createProduct(formData)
//       }
//       router.push("/admin/products")
//       router.refresh()
//     } catch (error) {
//       console.error("Failed to save product:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, variantIndex?: number) => {
//     const files = e.target.files
//     if (!files || files.length === 0) return

//     setUploadingImages(true)
//     try {
//       const uploadedUrls: string[] = []

//       for (const file of Array.from(files)) {
//         // Create a temporary URL for preview
//         const tempUrl = URL.createObjectURL(file)
//         uploadedUrls.push(tempUrl)
//       }

//       if (variantIndex !== undefined) {
//         // Add to specific variant
//         const newVariants = [...variants]
//         newVariants[variantIndex].images = [...newVariants[variantIndex].images, ...uploadedUrls]
//         setVariants(newVariants)
//       } else {
//         // Add to main product images
//         setImages([...images, ...uploadedUrls])
//       }
//     } catch (error) {
//       console.error("Failed to upload images:", error)
//     } finally {
//       setUploadingImages(false)
//     }
//   }

//   const addImage = () => {
//     if (imageInput.trim()) {
//       setImages([...images, imageInput.trim()])
//       setImageInput("")
//     }
//   }

//   const removeImage = (index: number) => {
//     setImages(images.filter((_, i) => i !== index))
//   }

//   const addColor = () => {
//     setColors([...colors, { name: "", hex: "#FF6B6B" }])
//   }

//   const addSize = () => {
//     setSizes([...sizes, ""])
//   }

//   const updateColor = (index: number, field: "name" | "hex", value: string) => {
//     const newColors = [...colors]
//     newColors[index][field] = value
//     setColors(newColors)
//   }

//   const updateSize = (index: number, value: string) => {
//     const newSizes = [...sizes]
//     newSizes[index] = value
//     setSizes(newSizes)
//   }

//   const removeColor = (index: number) => {
//     setColors(colors.filter((_, i) => i !== index))
//   }

//   const removeSize = (index: number) => {
//     setSizes(sizes.filter((_, i) => i !== index))
//   }

//   const generateVariants = () => {
//     console.log("[v0] Generate Variants clicked")
//     console.log("[v0] Colors:", colors)
//     console.log("[v0] Sizes:", sizes)

//     const validColors = colors.filter((c) => c.name.trim())
//     const validSizes = sizes.filter((s) => s.trim())

//     console.log("[v0] Valid Colors:", validColors)
//     console.log("[v0] Valid Sizes:", validSizes)

//     if (validColors.length === 0) {
//       toast({
//         title: "No colors specified",
//         description: "Please add at least one color name before generating variants.",
//         variant: "destructive",
//       })
//       return
//     }

//     if (validSizes.length === 0) {
//       toast({
//         title: "No sizes specified",
//         description: "Please add at least one size before generating variants.",
//         variant: "destructive",
//       })
//       return
//     }

//     const newVariants: ProductVariant[] = []

//     validColors.forEach((color) => {
//       validSizes.forEach((size) => {
//         newVariants.push({
//           color: color.name,
//           colorHex: color.hex,
//           size,
//           sku: `${color.name.toUpperCase().replace(/\s+/g, "-")}-${size.toUpperCase().replace(/\s+/g, "-")}`,
//           price: 0,
//           stock: 0,
//           images: [],
//         })
//       })
//     })

//     console.log("[v0] Generated Variants:", newVariants)
//     setVariants(newVariants)

//     toast({
//       title: "Variants generated",
//       description: `Successfully generated ${newVariants.length} variant(s).`,
//     })
//   }

//   const updateVariant = (index: number, field: keyof ProductVariant, value: any) => {
//     const newVariants = [...variants]
//     newVariants[index] = { ...newVariants[index], [field]: value }
//     setVariants(newVariants)
//   }

//   const removeVariantImage = (variantIndex: number, imageIndex: number) => {
//     const newVariants = [...variants]
//     newVariants[variantIndex].images = newVariants[variantIndex].images.filter((_, i) => i !== imageIndex)
//     setVariants(newVariants)
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <Card>
//         <CardHeader>
//           <CardTitle>Basic Information</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="name">Product Name</Label>
//             <Input id="name" name="name" defaultValue={product?.name} required placeholder="Handmade Crochet Blanket" />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="description">Description</Label>
//             <Textarea
//               id="description"
//               name="description"
//               defaultValue={product?.description}
//               required
//               rows={4}
//               placeholder="Describe your beautiful crochet product..."
//             />
//           </div>

//           <div className="grid gap-4 md:grid-cols-2">
//             <div className="space-y-2">
//               <Label htmlFor="price">Price ($)</Label>
//               <Input
//                 id="price"
//                 name="price"
//                 type="number"
//                 step="0.01"
//                 defaultValue={product?.price}
//                 required={!hasVariants}
//                 disabled={hasVariants}
//                 placeholder="29.99"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="compareAtPrice">Compare at Price ($)</Label>
//               <Input
//                 id="compareAtPrice"
//                 name="compareAtPrice"
//                 type="number"
//                 step="0.01"
//                 defaultValue={product?.compareAtPrice || ""}
//                 placeholder="39.99"
//               />
//             </div>
//           </div>

//           <div className="grid gap-4 md:grid-cols-2">
//             <div className="space-y-2">
//               <Label htmlFor="category">Category</Label>
//               <Input id="category" name="category" defaultValue={product?.category} required placeholder="Blankets" />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="stock">Stock</Label>
//               <Input
//                 id="stock"
//                 name="stock"
//                 type="number"
//                 defaultValue={product?.stock}
//                 required={!hasVariants}
//                 disabled={hasVariants}
//                 placeholder="10"
//               />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="tags">Tags (comma separated)</Label>
//             <Input id="tags" name="tags" defaultValue={product?.tags.join(", ")} placeholder="handmade, cozy, gift" />
//           </div>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <div className="flex items-center justify-between">
//             <CardTitle>Product Variants</CardTitle>
//             <Switch checked={hasVariants} onCheckedChange={setHasVariants} />
//           </div>
//         </CardHeader>
//         {hasVariants && (
//           <CardContent className="space-y-6">
//             {/* Colors */}
//             <div className="space-y-3">
//               <div className="flex items-center justify-between">
//                 <Label>Available Colors</Label>
//                 <Button type="button" size="sm" variant="outline" onClick={addColor}>
//                   <Plus className="h-4 w-4 mr-1" /> Add Color
//                 </Button>
//               </div>
//               <div className="space-y-2">
//                 {colors.map((color, index) => (
//                   <div key={index} className="flex gap-2">
//                     <div className="relative">
//                       <input
//                         type="color"
//                         value={color.hex}
//                         onChange={(e) => updateColor(index, "hex", e.target.value)}
//                         className="h-10 w-16 rounded-md border cursor-pointer"
//                         title="Pick color"
//                       />
//                     </div>
//                     <Input
//                       value={color.name}
//                       onChange={(e) => updateColor(index, "name", e.target.value)}
//                       placeholder="e.g., Forest Green, Sky Blue"
//                       className="flex-1"
//                     />
//                     <Input
//                       value={color.hex}
//                       onChange={(e) => updateColor(index, "hex", e.target.value)}
//                       placeholder="#FF6B6B"
//                       className="w-28"
//                       pattern="^#[0-9A-Fa-f]{6}$"
//                     />
//                     {colors.length > 1 && (
//                       <Button type="button" size="icon" variant="ghost" onClick={() => removeColor(index)}>
//                         <X className="h-4 w-4" />
//                       </Button>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Sizes */}
//             <div className="space-y-3">
//               <div className="flex items-center justify-between">
//                 <Label>Available Sizes</Label>
//                 <Button type="button" size="sm" variant="outline" onClick={addSize}>
//                   <Plus className="h-4 w-4 mr-1" /> Add Size
//                 </Button>
//               </div>
//               <div className="space-y-2">
//                 {sizes.map((size, index) => (
//                   <div key={index} className="flex gap-2">
//                     <Input
//                       value={size}
//                       onChange={(e) => updateSize(index, e.target.value)}
//                       placeholder="e.g., Small, Medium, Large, XL"
//                     />
//                     {sizes.length > 1 && (
//                       <Button type="button" size="icon" variant="ghost" onClick={() => removeSize(index)}>
//                         <X className="h-4 w-4" />
//                       </Button>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <Button type="button" onClick={generateVariants} className="w-full">
//               Generate Variants
//             </Button>

//             {/* Variant Details */}
//             {variants.length > 0 && (
//               <div className="space-y-4 pt-4 border-t">
//                 <h4 className="font-semibold">Variant Details ({variants.length} variants)</h4>
//                 {variants.map((variant, index) => (
//                   <Card key={index}>
//                     <CardHeader>
//                       <CardTitle className="text-base flex items-center gap-2">
//                         <Badge>{variant.color}</Badge>
//                         <Badge variant="outline">{variant.size}</Badge>
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent className="space-y-4">
//                       <div className="grid gap-4 md:grid-cols-3">
//                         <div className="space-y-2">
//                           <Label>SKU</Label>
//                           <Input
//                             value={variant.sku}
//                             onChange={(e) => updateVariant(index, "sku", e.target.value)}
//                             placeholder="SKU"
//                           />
//                         </div>
//                         <div className="space-y-2">
//                           <Label>Price ($)</Label>
//                           <Input
//                             type="number"
//                             step="0.01"
//                             value={variant.price || ""}
//                             onChange={(e) => updateVariant(index, "price", Number.parseFloat(e.target.value))}
//                             placeholder="29.99"
//                           />
//                         </div>
//                         <div className="space-y-2">
//                           <Label>Stock</Label>
//                           <Input
//                             type="number"
//                             value={variant.stock || ""}
//                             onChange={(e) => updateVariant(index, "stock", Number.parseInt(e.target.value))}
//                             placeholder="10"
//                           />
//                         </div>
//                       </div>

//                       {/* Variant Images */}
//                       <div className="space-y-2">
//                         <Label>Variant Images</Label>
//                         <div className="flex gap-2">
//                           <Button
//                             type="button"
//                             variant="outline"
//                             className="w-full bg-transparent"
//                             onClick={() => document.getElementById(`variant-upload-${index}`)?.click()}
//                             disabled={uploadingImages}
//                           >
//                             <Upload className="h-4 w-4 mr-2" />
//                             {uploadingImages ? "Uploading..." : "Upload Images"}
//                           </Button>
//                           <input
//                             id={`variant-upload-${index}`}
//                             type="file"
//                             accept="image/*"
//                             multiple
//                             className="hidden"
//                             onChange={(e) => handleImageUpload(e, index)}
//                           />
//                         </div>

//                         {variant.images.length > 0 && (
//                           <div className="grid gap-2 grid-cols-3 mt-2">
//                             {variant.images.map((img, imgIndex) => (
//                               <div key={imgIndex} className="relative aspect-square overflow-hidden rounded-lg border">
//                                 <Image
//                                   src={img || "/placeholder.svg"}
//                                   alt={`${variant.color} ${variant.size}`}
//                                   fill
//                                   className="object-cover"
//                                 />
//                                 <Button
//                                   type="button"
//                                   variant="destructive"
//                                   size="sm"
//                                   className="absolute right-1 top-1 h-6 w-6 p-0"
//                                   onClick={() => removeVariantImage(index, imgIndex)}
//                                 >
//                                   <X className="h-3 w-3" />
//                                 </Button>
//                               </div>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             )}
//           </CardContent>
//         )}
//       </Card>

//       {!hasVariants && (
//         <Card>
//           <CardHeader>
//             <CardTitle>Product Images</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="flex gap-2">
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => document.getElementById("main-image-upload")?.click()}
//                 disabled={uploadingImages}
//               >
//                 <Upload className="h-4 w-4 mr-2" />
//                 {uploadingImages ? "Uploading..." : "Upload from Device"}
//               </Button>
//               <input
//                 id="main-image-upload"
//                 type="file"
//                 accept="image/*"
//                 multiple
//                 className="hidden"
//                 onChange={(e) => handleImageUpload(e)}
//               />
//             </div>

//             <div className="flex gap-2">
//               <Input
//                 value={imageInput}
//                 onChange={(e) => setImageInput(e.target.value)}
//                 placeholder="Or enter image URL"
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter") {
//                     e.preventDefault()
//                     addImage()
//                   }
//                 }}
//               />
//               <Button type="button" onClick={addImage}>
//                 Add
//               </Button>
//             </div>

//             {images.length > 0 && (
//               <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
//                 {images.map((img, index) => (
//                   <div key={index} className="relative aspect-square overflow-hidden rounded-lg border">
//                     <Image src={img || "/placeholder.svg"} alt={`Product ${index + 1}`} fill className="object-cover" />
//                     <Button
//                       type="button"
//                       variant="destructive"
//                       size="sm"
//                       className="absolute right-2 top-2"
//                       onClick={() => removeImage(index)}
//                     >
//                       <X className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       )}

//       <div className="flex gap-4">
//         <Button type="submit" disabled={loading}>
//           {loading ? "Saving..." : product ? "Update Product" : "Create Product"}
//         </Button>
//         <Button type="button" variant="outline" onClick={() => router.push("/admin/products")}>
//           Cancel
//         </Button>
//       </div>
//     </form>
//   )
// }


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
import { X, Plus, Upload } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

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

type ProductVariant = {
  color: string
  colorHex: string
  size: string
  sku: string
  price: number
  stock: number
  images: string[]
}

export function ProductForm({ product }: { product?: Product }) {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<string[]>(product?.images || [])
  const [imageInput, setImageInput] = useState("")

  const [hasVariants, setHasVariants] = useState(false)
  const [colors, setColors] = useState<Array<{ name: string; hex: string }>>([{ name: "", hex: "#FF6B6B" }])
  const [sizes, setSizes] = useState<string[]>([""])
  const [variants, setVariants] = useState<ProductVariant[]>([])
  const [uploadingImages, setUploadingImages] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)

    // Add images to formData
    images.forEach((img) => formData.append("images", img))

    if (hasVariants) {
      formData.append("hasVariants", "true")
      formData.append("variants", JSON.stringify(variants))

      // Set base price to the lowest variant price, or 0 if no variants
      const lowestPrice = variants.length > 0 ? Math.min(...variants.map((v) => v.price || 0)) : 0
      formData.set("price", lowestPrice.toString())

      // Set stock to total of all variant stocks
      const totalStock = variants.reduce((sum, v) => sum + (v.stock || 0), 0)
      formData.set("stock", totalStock.toString())
    }

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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, variantIndex?: number) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploadingImages(true)
    try {
      const uploadedUrls: string[] = []

      for (const file of Array.from(files)) {
        // Create a temporary URL for preview
        const tempUrl = URL.createObjectURL(file)
        uploadedUrls.push(tempUrl)
      }

      if (variantIndex !== undefined) {
        // Add to specific variant
        const newVariants = [...variants]
        newVariants[variantIndex].images = [...newVariants[variantIndex].images, ...uploadedUrls]
        setVariants(newVariants)
      } else {
        // Add to main product images
        setImages([...images, ...uploadedUrls])
      }
    } catch (error) {
      console.error("Failed to upload images:", error)
    } finally {
      setUploadingImages(false)
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

  const addColor = () => {
    setColors([...colors, { name: "", hex: "#FF6B6B" }])
  }

  const addSize = () => {
    setSizes([...sizes, ""])
  }

  const updateColor = (index: number, field: "name" | "hex", value: string) => {
    const newColors = [...colors]
    newColors[index][field] = value
    setColors(newColors)
  }

  const updateSize = (index: number, value: string) => {
    const newSizes = [...sizes]
    newSizes[index] = value
    setSizes(newSizes)
  }

  const removeColor = (index: number) => {
    setColors(colors.filter((_, i) => i !== index))
  }

  const removeSize = (index: number) => {
    setSizes(sizes.filter((_, i) => i !== index))
  }

  const generateVariants = () => {
    console.log("[v0] Generate Variants clicked")
    console.log("[v0] Colors:", colors)
    console.log("[v0] Sizes:", sizes)

    const validColors = colors.filter((c) => c && c.name && c.name.trim())
    const validSizes = sizes.filter((s) => s && s.trim())

    console.log("[v0] Valid Colors:", validColors)
    console.log("[v0] Valid Sizes:", validSizes)

    if (validColors.length === 0) {
      console.log("[v0] No valid colors - showing toast")
      toast({
        title: "Missing Color Names",
        description:
          "Please enter a name for each color (e.g., 'Forest Green', 'Sky Blue') before generating variants.",
        variant: "destructive",
      })
      return
    }

    if (validSizes.length === 0) {
      console.log("[v0] No valid sizes - showing toast")
      toast({
        title: "Missing Sizes",
        description: "Please enter at least one size (e.g., 'Small', 'Medium', 'Large') before generating variants.",
        variant: "destructive",
      })
      return
    }

    const newVariants: ProductVariant[] = []

    validColors.forEach((color) => {
      validSizes.forEach((size) => {
        newVariants.push({
          color: color.name,
          colorHex: color.hex,
          size,
          sku: `${color.name.toUpperCase().replace(/\s+/g, "-")}-${size.toUpperCase().replace(/\s+/g, "-")}`,
          price: 0,
          stock: 0,
          images: [],
        })
      })
    })

    console.log("[v0] Generated Variants:", newVariants)
    console.log("[v0] Setting variants state")
    setVariants(newVariants)

    toast({
      title: "Variants Generated Successfully",
      description: `Created ${newVariants.length} variant combination(s). Now add pricing, stock, and images for each variant.`,
    })
  }

  const updateVariant = (index: number, field: keyof ProductVariant, value: any) => {
    const newVariants = [...variants]
    newVariants[index] = { ...newVariants[index], [field]: value }
    setVariants(newVariants)
  }

  const removeVariantImage = (variantIndex: number, imageIndex: number) => {
    const newVariants = [...variants]
    newVariants[variantIndex].images = newVariants[variantIndex].images.filter((_, i) => i !== imageIndex)
    setVariants(newVariants)
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
                required={!hasVariants}
                disabled={hasVariants}
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
              <Input
                id="stock"
                name="stock"
                type="number"
                defaultValue={product?.stock}
                required={!hasVariants}
                disabled={hasVariants}
                placeholder="10"
              />
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
          <div className="flex items-center justify-between">
            <CardTitle>Product Variants</CardTitle>
            <Switch checked={hasVariants} onCheckedChange={setHasVariants} />
          </div>
        </CardHeader>
        {hasVariants && (
          <CardContent className="space-y-6">
            {/* Colors */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Available Colors</Label>
                <Button type="button" size="sm" variant="outline" onClick={addColor}>
                  <Plus className="h-4 w-4 mr-1" /> Add Color
                </Button>
              </div>
              <div className="space-y-2">
                {colors.map((color, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="relative">
                      <input
                        type="color"
                        value={color.hex}
                        onChange={(e) => updateColor(index, "hex", e.target.value)}
                        className="h-10 w-16 rounded-md border cursor-pointer"
                        title="Pick color"
                      />
                    </div>
                    <Input
                      value={color.name}
                      onChange={(e) => updateColor(index, "name", e.target.value)}
                      placeholder="e.g., Forest Green, Sky Blue"
                      className="flex-1"
                    />
                    <Input
                      value={color.hex}
                      onChange={(e) => updateColor(index, "hex", e.target.value)}
                      placeholder="#FF6B6B"
                      className="w-28"
                      pattern="^#[0-9A-Fa-f]{6}$"
                    />
                    {colors.length > 1 && (
                      <Button type="button" size="icon" variant="ghost" onClick={() => removeColor(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Available Sizes</Label>
                <Button type="button" size="sm" variant="outline" onClick={addSize}>
                  <Plus className="h-4 w-4 mr-1" /> Add Size
                </Button>
              </div>
              <div className="space-y-2">
                {sizes.map((size, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={size}
                      onChange={(e) => updateSize(index, e.target.value)}
                      placeholder="e.g., Small, Medium, Large, XL"
                    />
                    {sizes.length > 1 && (
                      <Button type="button" size="icon" variant="ghost" onClick={() => removeSize(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Button type="button" onClick={generateVariants} className="w-full">
              Generate Variants
            </Button>

            {/* Variant Details */}
            {variants.length > 0 && (
              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-semibold">Variant Details ({variants.length} variants)</h4>
                {variants.map((variant, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <Badge>{variant.color}</Badge>
                        <Badge variant="outline">{variant.size}</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                          <Label>SKU</Label>
                          <Input
                            value={variant.sku}
                            onChange={(e) => updateVariant(index, "sku", e.target.value)}
                            placeholder="SKU"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Price ($)</Label>
                          <Input
                            type="number"
                            step="0.01"
                            value={variant.price || ""}
                            onChange={(e) => updateVariant(index, "price", Number.parseFloat(e.target.value))}
                            placeholder="29.99"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Stock</Label>
                          <Input
                            type="number"
                            value={variant.stock || ""}
                            onChange={(e) => updateVariant(index, "stock", Number.parseInt(e.target.value))}
                            placeholder="10"
                          />
                        </div>
                      </div>

                      {/* Variant Images */}
                      <div className="space-y-2">
                        <Label>Variant Images</Label>
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full bg-transparent"
                            onClick={() => document.getElementById(`variant-upload-${index}`)?.click()}
                            disabled={uploadingImages}
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            {uploadingImages ? "Uploading..." : "Upload Images"}
                          </Button>
                          <input
                            id={`variant-upload-${index}`}
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={(e) => handleImageUpload(e, index)}
                          />
                        </div>

                        {variant.images.length > 0 && (
                          <div className="grid gap-2 grid-cols-3 mt-2">
                            {variant.images.map((img, imgIndex) => (
                              <div key={imgIndex} className="relative aspect-square overflow-hidden rounded-lg border">
                                <Image
                                  src={img || "/placeholder.svg"}
                                  alt={`${variant.color} ${variant.size}`}
                                  fill
                                  className="object-cover"
                                />
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="sm"
                                  className="absolute right-1 top-1 h-6 w-6 p-0"
                                  onClick={() => removeVariantImage(index, imgIndex)}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        )}
      </Card>

      {!hasVariants && (
        <Card>
          <CardHeader>
            <CardTitle>Product Images</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("main-image-upload")?.click()}
                disabled={uploadingImages}
              >
                <Upload className="h-4 w-4 mr-2" />
                {uploadingImages ? "Uploading..." : "Upload from Device"}
              </Button>
              <input
                id="main-image-upload"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => handleImageUpload(e)}
              />
            </div>

            <div className="flex gap-2">
              <Input
                value={imageInput}
                onChange={(e) => setImageInput(e.target.value)}
                placeholder="Or enter image URL"
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
      )}

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
