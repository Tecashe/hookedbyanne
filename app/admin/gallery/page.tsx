import { getGalleryImages } from "@/actions/gallery"
import { GalleryManager } from "@/components/admin/gallery-manager"

export default async function GalleryPage() {
  const images = await getGalleryImages()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gallery</h1>
          <p className="text-muted-foreground">Manage images for your homepage galleries</p>
        </div>
      </div>

      <GalleryManager images={images} />
    </div>
  )
}
