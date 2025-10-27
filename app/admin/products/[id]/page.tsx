// import { getProduct } from "@/actions/products"
// import { ProductForm } from "@/components/admin/product-form"
// import { notFound } from "next/navigation"

// export default async function EditProductPage({
//   params,
// }: {
//   params: Promise<{ id: string }>
// }) {
//   const { id } = await params
//   const product = await getProduct(id)

//   if (!product) {
//     notFound()
//   }

//   return (
//     <div className="max-w-4xl space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold">Edit Product</h1>
//         <p className="text-muted-foreground">Update product information</p>
//       </div>

//       <ProductForm product={product} />
//     </div>
//   )
// }


import { getProduct } from "@/actions/products"
import { ProductForm } from "@/components/admin/product-form"
import { notFound } from "next/navigation"
import { BackButton } from "@/components/back-button"

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = await getProduct(id)

  if (!product) {
    notFound()
  }

  return (
    <div className="max-w-4xl space-y-6">
      <BackButton href="/admin/products" label="Back to Products" />

      <div>
        <h1 className="text-3xl font-bold">Edit Product</h1>
        <p className="text-muted-foreground">Update product information</p>
      </div>

      <ProductForm product={product} />
    </div>
  )
}
