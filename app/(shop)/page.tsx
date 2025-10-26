import { getProducts } from "@/actions/products"
import { getGalleryImages } from "@/actions/gallery"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ProductCard } from "@/components/product-card"

export default async function HomePage() {
  const [featuredProducts, newArrivals, galleryImages] = await Promise.all([
    getProducts({ featured: true }),
    getProducts({ isNewArrival: true }),
    getGalleryImages(),
  ])

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/10">
        <div className="container py-24 md:py-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-6">
              <h1 className="text-balance text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
                Handcrafted Crochet
                <span className="block text-primary">Made With Love</span>
              </h1>
              <p className="text-pretty text-lg text-muted-foreground md:text-xl">
                Discover unique, handmade crochet pieces that bring warmth and beauty to your home. Each creation is
                crafted with care and attention to detail.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link href="/products">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/gallery">View Gallery</Link>
                </Button>
              </div>
            </div>

            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image
                src="/cozy-crochet-blanket-on-couch.jpg"
                alt="Beautiful crochet creation"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="container py-16 md:py-24">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">New Arrivals</h2>
            <p className="mt-2 text-muted-foreground">Fresh handmade pieces just added</p>
          </div>
          <Button variant="ghost" asChild>
            <Link href="/products?filter=new">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {newArrivals.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Featured Collection</h2>
            <p className="mt-2 text-muted-foreground">Our most loved handmade pieces</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <span className="text-2xl">🧶</span>
            </div>
            <h3 className="mb-2 text-xl font-bold">Handmade Quality</h3>
            <p className="text-muted-foreground">Every piece is carefully crafted by hand with premium materials</p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <span className="text-2xl">💝</span>
            </div>
            <h3 className="mb-2 text-xl font-bold">Made With Love</h3>
            <p className="text-muted-foreground">Each creation is infused with passion and attention to detail</p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <span className="text-2xl">✨</span>
            </div>
            <h3 className="mb-2 text-xl font-bold">Unique Designs</h3>
            <p className="text-muted-foreground">One-of-a-kind pieces you won't find anywhere else</p>
          </div>
        </div>
      </section>
    </div>
  )
}
