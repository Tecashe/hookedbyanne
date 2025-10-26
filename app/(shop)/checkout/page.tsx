import { requireAuth, getCurrentUser } from "@/lib/clerk"
import { redirect } from "next/navigation"
import { CheckoutForm } from "@/components/checkout-form"
import { prisma } from "@/lib/db"

export default async function CheckoutPage() {
  try {
    await requireAuth()
  } catch {
    redirect("/sign-in?redirect=/checkout")
  }

  const clerkUser = await getCurrentUser()
  let userData = null

  if (clerkUser) {
    userData = await prisma.user.findUnique({
      where: { clerkId: clerkUser.id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        points: true,
      },
    })
  }

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold">Checkout</h1>
      <CheckoutForm userData={userData} />
    </div>
  )
}
