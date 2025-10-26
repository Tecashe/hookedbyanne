import { getWishlist } from "@/actions/wishlist"
import { WishlistItems } from "@/components/wishlist-items"
import { requireAuth } from "@/lib/clerk"
import { redirect } from "next/navigation"

export default async function WishlistPage() {
  try {
    await requireAuth()
  } catch {
    redirect("/sign-in")
  }

  const wishlist = await getWishlist()

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold">My Wishlist</h1>
      <WishlistItems items={wishlist} />
    </div>
  )
}
