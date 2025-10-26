// import { getProducts } from "@/actions/products"
// import { ProductCard } from "@/components/product-card"
// import { ProductFilters } from "@/components/product-filters"

// export default async function ProductsPage({
//   searchParams,
// }: {
//   searchParams: Promise<{ filter?: string; category?: string; search?: string }>
// }) {
//   const params = await searchParams
//   const filters: any = {}

//   if (params.filter === "new") {
//     filters.isNewArrival = true
//   } else if (params.filter === "featured") {
//     filters.featured = true
//   }

//   if (params.category) {
//     filters.category = params.category
//   }

//   if (params.search) {
//     filters.search = params.search
//   }

//   const products = await getProducts(filters)

//   return (
//     <div className="container py-8">
//       <div className="mb-8">
//         <h1 className="text-4xl font-bold">Shop All Products</h1>
//         <p className="mt-2 text-muted-foreground">Discover our handmade crochet collection</p>
//       </div>

//       <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
//         <ProductFilters />

//         <div>
//           {products.length === 0 ? (
//             <div className="flex min-h-[400px] items-center justify-center">
//               <div className="text-center">
//                 <p className="text-lg font-medium">No products found</p>
//                 <p className="text-muted-foreground">Try adjusting your filters</p>
//               </div>
//             </div>
//           ) : (
//             <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//               {products.map((product) => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }
import { getProducts } from "@/actions/products"
import { ProductCard } from "@/components/product-card"
import { ProductFilters } from "@/components/product-filters"

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string; category?: string; search?: string }>
}) {
  const params = await searchParams
  const filters: any = {}

  if (params.filter === "new") {
    filters.isNewArrival = true
  } else if (params.filter === "featured") {
    filters.featured = true
  }

  if (params.category) {
    filters.category = params.category
  }

  if (params.search) {
    filters.search = params.search
  }

  const products = await getProducts(filters)

  return (
    <div className="container py-6 md:py-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-balance">Shop All Products</h1>
        <p className="mt-2 text-sm md:text-base text-muted-foreground">Discover our handmade crochet collection</p>
      </div>

      <div className="space-y-6">
        <div className="lg:hidden">
          <ProductFilters />
        </div>

        <div className="grid gap-6 lg:gap-8 lg:grid-cols-[240px_1fr]">
          <div className="hidden lg:block">
            <ProductFilters />
          </div>

          <div>
            {products.length === 0 ? (
              <div className="flex min-h-[400px] items-center justify-center">
                <div className="text-center px-4">
                  <p className="text-lg font-medium">No products found</p>
                  <p className="text-muted-foreground mt-2">Try adjusting your filters</p>
                </div>
              </div>
            ) : (
              <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
