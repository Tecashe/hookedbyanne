import { getProducts } from "@/actions/products"
import { VirtualTryOn } from "@/components/virtual-try-on"
//jbf
export default async function TryOnPage() {
  const products = await getProducts({ limit: 50 })

  return (
    <div className="container py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-4 font-serif text-4xl font-bold text-primary">Virtual Try-On</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          See how our beautiful crochet items look on you! Use your camera to try on scarves, hats, and accessories
          virtually.
        </p>
      </div>

      <VirtualTryOn products={products} />
    </div>
  )
}
