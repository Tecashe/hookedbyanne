// import { getProduct } from "@/actions/products"
// import { notFound } from "next/navigation"
// import Image from "next/image"
// import { Badge } from "@/components/ui/badge"
// import { Card, CardContent } from "@/components/ui/card"
// import { AddToCartButton } from "@/components/add-to-cart-button"
// import { WishlistButton } from "@/components/wishlist-button"
// import { ProductReviews } from "@/components/product-reviews"
// import { TryOnButton } from "@/components/try-on-button"
// import { Star } from "lucide-react"

// export default async function ProductPage({
//   params,
// }: {
//   params: Promise<{ id: string }>
// }) {
//   const { id } = await params
//   const product = await getProduct(id)

//   if (!product) {
//     notFound()
//   }

//   const averageRating =
//     product.reviews.length > 0
//       ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
//       : 0

//   const discount = product.compareAtPrice
//     ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
//     : 0

//   return (
//     <div className="container py-8">
//       <div className="grid gap-8 lg:grid-cols-2">
//         <div className="space-y-4">
//           <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
//             <Image
//               src={product.images[0] || "/placeholder.svg"}
//               alt={product.name}
//               fill
//               className="object-cover"
//               priority
//             />
//           </div>

//           {product.images.length > 1 && (
//             <div className="grid grid-cols-4 gap-4">
//               {product.images.slice(1, 5).map((image, index) => (
//                 <div key={index} className="relative aspect-square overflow-hidden rounded-lg bg-muted">
//                   <Image
//                     src={image || "/placeholder.svg"}
//                     alt={`${product.name} ${index + 2}`}
//                     fill
//                     className="object-cover"
//                   />
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         <div className="space-y-6">
//           <div>
//             <div className="mb-2 flex items-center gap-2">
//               <Badge variant="secondary">{product.category}</Badge>
//               {product.isNewArrival && <Badge className="bg-accent text-accent-foreground">New Arrival</Badge>}
//               {product.featured && <Badge>Featured</Badge>}
//             </div>
//             <h1 className="text-3xl font-bold md:text-4xl">{product.name}</h1>

//             {product.reviews.length > 0 && (
//               <div className="mt-2 flex items-center gap-2">
//                 <div className="flex">
//                   {Array.from({ length: 5 }).map((_, i) => (
//                     <Star
//                       key={i}
//                       className={`h-4 w-4 ${
//                         i < Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-muted"
//                       }`}
//                     />
//                   ))}
//                 </div>
//                 <span className="text-sm text-muted-foreground">
//                   {averageRating.toFixed(1)} ({product.reviews.length} reviews)
//                 </span>
//               </div>
//             )}
//           </div>

//           <div className="flex items-baseline gap-3">
//             <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
//             {product.compareAtPrice && (
//               <>
//                 <span className="text-xl text-muted-foreground line-through">${product.compareAtPrice.toFixed(2)}</span>
//                 <Badge variant="destructive">Save {discount}%</Badge>
//               </>
//             )}
//           </div>

//           <p className="text-muted-foreground leading-relaxed">{product.description}</p>

//           <Card>
//             <CardContent className="p-4">
//               <div className="flex items-center justify-between">
//                 <span className="text-sm font-medium">Availability:</span>
//                 {product.stock > 0 ? (
//                   <Badge className="bg-green-500/10 text-green-500 border-green-500/20">{product.stock} in stock</Badge>
//                 ) : (
//                   <Badge variant="destructive">Out of Stock</Badge>
//                 )}
//               </div>
//             </CardContent>
//           </Card>

//           <div className="flex gap-4">
//             <AddToCartButton product={product} />
//             <WishlistButton productId={product.id} />
//             {["accessories", "clothing", "hats", "scarves"].includes(product.category.toLowerCase()) && (
//               <TryOnButton productId={product.id} />
//             )}
//           </div>

//           {product.tags.length > 0 && (
//             <div>
//               <h3 className="mb-2 text-sm font-medium">Tags:</h3>
//               <div className="flex flex-wrap gap-2">
//                 {product.tags.map((tag) => (
//                   <Badge key={tag} variant="outline">
//                     {tag}
//                   </Badge>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <ProductReviews productId={product.id} reviews={product.reviews} />
//     </div>
//   )
// }

// import { getProduct, getRelatedProducts } from "@/actions/products"
// import { notFound } from "next/navigation"
// import { Badge } from "@/components/ui/badge"
// import { Card, CardContent } from "@/components/ui/card"
// import { AddToCartButton } from "@/components/add-to-cart-button"
// import { WishlistButton } from "@/components/wishlist-button"
// import { ProductReviews } from "@/components/product-reviews"
// import { TryOnButton } from "@/components/try-on-button"
// import { Star } from "lucide-react"
// import { ProductImageGallery } from "@/components/product-image-gallery"
// import { ProductVariantSelector } from "@/components/product-variant-selector"
// import { ProductInfo } from "@/components/product-info"
// import { RelatedProducts } from "@/components/related-products"

// export default async function ProductPage({
//   params,
// }: {
//   params: Promise<{ id: string }>
// }) {
//   const { id } = await params
//   const product = await getProduct(id)

//   if (!product) {
//     notFound()
//   }

//   const relatedProducts = await getRelatedProducts(id, product.category)

//   const averageRating =
//     product.reviews.length > 0
//       ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
//       : 0

//   const discount = product.compareAtPrice
//     ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
//     : 0

//   return (
//     <div className="container py-8">
//       <div className="grid gap-8 lg:grid-cols-2">
//         <ProductImageGallery images={product.images} productName={product.name} />

//         <div className="space-y-6">
//           <ProductInfo product={product} />

//           {product.hasVariants && product.variants && product.variants.length > 0 && (
//             <ProductVariantSelector product={product} variants={product.variants} />
//           )}

//           <div>
//             <div className="mb-2 flex items-center gap-2">
//               <Badge variant="secondary">{product.category}</Badge>
//               {product.isNewArrival && <Badge className="bg-accent text-accent-foreground">New Arrival</Badge>}
//               {product.featured && <Badge>Featured</Badge>}
//             </div>
//             <h1 className="text-3xl font-bold md:text-4xl">{product.name}</h1>

//             {product.reviews.length > 0 && (
//               <div className="mt-2 flex items-center gap-2">
//                 <div className="flex">
//                   {Array.from({ length: 5 }).map((_, i) => (
//                     <Star
//                       key={i}
//                       className={`h-4 w-4 ${
//                         i < Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-muted"
//                       }`}
//                     />
//                   ))}
//                 </div>
//                 <span className="text-sm text-muted-foreground">
//                   {averageRating.toFixed(1)} ({product.reviews.length} reviews)
//                 </span>
//               </div>
//             )}
//           </div>

//           <div className="flex items-baseline gap-3">
//             <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
//             {product.compareAtPrice && (
//               <>
//                 <span className="text-xl text-muted-foreground line-through">${product.compareAtPrice.toFixed(2)}</span>
//                 <Badge variant="destructive">Save {discount}%</Badge>
//               </>
//             )}
//           </div>

//           <p className="text-muted-foreground leading-relaxed">{product.description}</p>

//           <Card>
//             <CardContent className="p-4">
//               <div className="flex items-center justify-between">
//                 <span className="text-sm font-medium">Availability:</span>
//                 {product.stock > 0 ? (
//                   <Badge className="bg-green-500/10 text-green-500 border-green-500/20">{product.stock} in stock</Badge>
//                 ) : (
//                   <Badge variant="destructive">Out of Stock</Badge>
//                 )}
//               </div>
//             </CardContent>
//           </Card>

//           <div className="flex gap-4">
//             <AddToCartButton product={product} />
//             <WishlistButton productId={product.id} />
//             {["accessories", "clothing", "hats", "scarves"].includes(product.category.toLowerCase()) && (
//               <TryOnButton productId={product.id} />
//             )}
//           </div>

//           {product.tags.length > 0 && (
//             <div>
//               <h3 className="mb-2 text-sm font-medium">Tags:</h3>
//               <div className="flex flex-wrap gap-2">
//                 {product.tags.map((tag) => (
//                   <Badge key={tag} variant="outline">
//                     {tag}
//                   </Badge>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="mt-12">
//         <ProductReviews productId={product.id} reviews={product.reviews} />
//       </div>

//       {relatedProducts.length > 0 && (
//         <div className="mt-12">
//           <RelatedProducts products={relatedProducts} />
//         </div>
//       )}
//     </div>
//   )
// }


import { getProduct, getRelatedProducts } from "@/actions/products"
import { notFound } from "next/navigation"
import { ProductImageGallery } from "@/components/product-image-gallery"
import { ProductVariantSelector } from "@/components/product-variant-selector"
import { ProductInfo } from "@/components/product-info"
import { RelatedProducts } from "@/components/related-products"
import { ProductReviews } from "@/components/product-reviews"
import { BackButton } from "@/components/back-button"

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = await getProduct(id)

  if (!product) {
    notFound()
  }

  const relatedProducts = await getRelatedProducts(id, product.category)

  const displayImages =
    product.images && product.images.length > 0
      ? product.images
      : product.variants && product.variants.length > 0 && product.variants[0].images?.length > 0
        ? product.variants[0].images
        : ["/placeholder.svg"]

  console.log("[v0] Product page - displayImages:", displayImages)
  console.log("[v0] Product page - variants:", product.variants?.length)

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-6">
        <BackButton />
      </div>

      <div className="container py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <ProductImageGallery images={displayImages} productName={product.name} />

          <div className="space-y-6">
            <ProductInfo product={product} />

            {product.hasVariants && product.variants && product.variants.length > 0 && (
              <ProductVariantSelector product={product} variants={product.variants} />
            )}

            {product.tags.length > 0 && (
              <div>
                <h3 className="mb-2 text-sm font-medium">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12">
          <ProductReviews productId={product.id} reviews={product.reviews} />
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <RelatedProducts products={relatedProducts} />
          </div>
        )}
      </div>
    </div>
  )
}
