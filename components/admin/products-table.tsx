// "use client"

// import { useState } from "react"
// import Image from "next/image"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Edit, Trash2 } from "lucide-react"
// import { deleteProduct } from "@/actions/products"
// import { useRouter } from "next/navigation"
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog"

// type Product = {
//   id: string
//   name: string
//   price: number
//   images: string[]
//   category: string
//   stock: number
//   featured: boolean
//   isNewArrival: boolean
// }

// export function ProductsTable({ products }: { products: Product[] }) {
//   const router = useRouter()
//   const [deletingId, setDeletingId] = useState<string | null>(null)

//   const handleDelete = async (id: string) => {
//     setDeletingId(id)
//     try {
//       await deleteProduct(id)
//       router.refresh()
//     } catch (error) {
//       console.error("Failed to delete product:", error)
//     } finally {
//       setDeletingId(null)
//     }
//   }

//   return (
//     <div className="rounded-lg border bg-card">
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Product</TableHead>
//             <TableHead>Category</TableHead>
//             <TableHead>Price</TableHead>
//             <TableHead>Stock</TableHead>
//             <TableHead>Status</TableHead>
//             <TableHead className="text-right">Actions</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {products.map((product) => (
//             <TableRow key={product.id}>
//               <TableCell>
//                 <div className="flex items-center gap-3">
//                   <div className="relative h-12 w-12 overflow-hidden rounded-lg">
//                     <Image
//                       src={product.images[0] || "/placeholder.svg"}
//                       alt={product.name}
//                       fill
//                       className="object-cover"
//                     />
//                   </div>
//                   <div>
//                     <p className="font-medium">{product.name}</p>
//                     <div className="flex gap-1 mt-1">
//                       {product.featured && (
//                         <Badge variant="secondary" className="text-xs">
//                           Featured
//                         </Badge>
//                       )}
//                       {product.isNewArrival && (
//                         <Badge variant="secondary" className="text-xs">
//                           New
//                         </Badge>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </TableCell>
//               <TableCell>{product.category}</TableCell>
//               <TableCell>${product.price.toFixed(2)}</TableCell>
//               <TableCell>
//                 <Badge
//                   variant={product.stock > 0 ? "default" : "destructive"}
//                   className={product.stock > 0 ? "bg-green-500/10 text-green-500 border-green-500/20" : ""}
//                 >
//                   {product.stock} in stock
//                 </Badge>
//               </TableCell>
//               <TableCell>
//                 <Badge
//                   variant={product.stock > 0 ? "default" : "secondary"}
//                   className={product.stock > 0 ? "bg-green-500/10 text-green-500 border-green-500/20" : ""}
//                 >
//                   {product.stock > 0 ? "Active" : "Out of Stock"}
//                 </Badge>
//               </TableCell>
//               <TableCell className="text-right">
//                 <div className="flex justify-end gap-2">
//                   <Button variant="ghost" size="sm" asChild>
//                     <Link href={`/admin/products/${product.id}`}>
//                       <Edit className="h-4 w-4" />
//                     </Link>
//                   </Button>
//                   <AlertDialog>
//                     <AlertDialogTrigger asChild>
//                       <Button variant="ghost" size="sm" disabled={deletingId === product.id}>
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     </AlertDialogTrigger>
//                     <AlertDialogContent>
//                       <AlertDialogHeader>
//                         <AlertDialogTitle>Delete Product</AlertDialogTitle>
//                         <AlertDialogDescription>
//                           Are you sure you want to delete "{product.name}"? This action cannot be undone.
//                         </AlertDialogDescription>
//                       </AlertDialogHeader>
//                       <AlertDialogFooter>
//                         <AlertDialogCancel>Cancel</AlertDialogCancel>
//                         <AlertDialogAction onClick={() => handleDelete(product.id)}>Delete</AlertDialogAction>
//                       </AlertDialogFooter>
//                     </AlertDialogContent>
//                   </AlertDialog>
//                 </div>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   )
// }


"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash2 } from "lucide-react"
import { deleteProduct } from "@/actions/products"
import { useRouter } from "next/navigation"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type ProductVariant = {
  id: string
  images: string[]
}

type Product = {
  id: string
  name: string
  price: number
  images: string[]
  category: string
  stock: number
  featured: boolean
  isNewArrival: boolean
  hasVariants?: boolean
  variants?: ProductVariant[]
}

export function ProductsTable({ products }: { products: Product[] }) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    try {
      await deleteProduct(id)
      router.refresh()
    } catch (error) {
      console.error("Failed to delete product:", error)
    } finally {
      setDeletingId(null)
    }
  }

  const getProductThumbnail = (product: Product) => {
    if (product.images && product.images.length > 0) {
      return product.images[0]
    }
    if (product.hasVariants && product.variants && product.variants.length > 0) {
      const firstVariantWithImage = product.variants.find((v) => v.images && v.images.length > 0)
      if (firstVariantWithImage) {
        return firstVariantWithImage.images[0]
      }
    }
    return "/placeholder.svg"
  }

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-lg">
                    <Image
                      src={getProductThumbnail(product) || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <div className="flex gap-1 mt-1">
                      {product.featured && (
                        <Badge variant="secondary" className="text-xs">
                          Featured
                        </Badge>
                      )}
                      {product.isNewArrival && (
                        <Badge variant="secondary" className="text-xs">
                          New
                        </Badge>
                      )}
                      {product.hasVariants && product.variants && product.variants.length > 0 && (
                        <Badge variant="outline" className="text-xs">
                          {product.variants.length} variants
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>
                <Badge
                  variant={product.stock > 0 ? "default" : "destructive"}
                  className={product.stock > 0 ? "bg-green-500/10 text-green-500 border-green-500/20" : ""}
                >
                  {product.stock} in stock
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={product.stock > 0 ? "default" : "secondary"}
                  className={product.stock > 0 ? "bg-green-500/10 text-green-500 border-green-500/20" : ""}
                >
                  {product.stock > 0 ? "Active" : "Out of Stock"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/admin/products/${product.id}`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="sm" disabled={deletingId === product.id}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Product</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{product.name}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(product.id)}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
