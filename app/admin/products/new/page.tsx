import { ProductForm } from "@/components/admin/product-form"

export default function NewProductPage() {
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Add New Product</h1>
        <p className="text-muted-foreground">Create a new product for your store</p>
      </div>

      <ProductForm />
    </div>
  )
}
