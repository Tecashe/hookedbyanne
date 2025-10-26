// import { getGalleryImages } from "@/actions/gallery"
// import { GalleryManager } from "@/components/admin/gallery-manager"

// export default async function GalleryPage() {
//   const images = await getGalleryImages()

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold">Gallery</h1>
//           <p className="text-muted-foreground">Manage images for your homepage galleries</p>
//         </div>
//       </div>

//       <GalleryManager images={images} />
//     </div>
//   )
// }
import { getGalleryImages } from "@/actions/gallery"
import { getProducts } from "@/actions/products"
import { GalleryManager } from "@/components/admin/gallery-manager"

export default async function GalleryPage() {
  const images = await getGalleryImages()
  const products = await getProducts()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gallery</h1>
          <p className="text-muted-foreground">Manage images for your homepage galleries and link them to products</p>
        </div>
      </div>

      <GalleryManager images={images} products={products.map((p) => ({ id: p.id, name: p.name }))} />
    </div>
  )
}
