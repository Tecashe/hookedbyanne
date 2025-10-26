import { requireAuth } from "@/lib/clerk"
import { redirect } from "next/navigation"
import { CheckoutForm } from "@/components/checkout-form"

export default async function CheckoutPage() {
  try {
    await requireAuth()
  } catch {
    redirect("/sign-in?redirect=/checkout")
  }

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold">Checkout</h1>
      <CheckoutForm />
    </div>
  )
}
