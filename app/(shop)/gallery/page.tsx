import { getGalleryImages } from "@/actions/gallery"
import { GalleryTabs } from "@/components/gallery-tabs"

export default async function GalleryPage() {
  const images = await getGalleryImages()

  return (
    <div className="container py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 font-serif text-4xl font-bold text-primary md:text-5xl">Our Gallery</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Explore our beautiful collection of handmade crochet creations. Each piece is crafted with love and attention
          to detail.
        </p>
      </div>

      <GalleryTabs images={images} />
    </div>
  )
}
