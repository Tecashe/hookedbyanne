import { NextResponse } from "next/server"
import { getWishlist } from "@/actions/wishlist"

export async function GET() {
  try {
    const wishlist = await getWishlist()
    return NextResponse.json(wishlist)
  } catch (error) {
    return NextResponse.json([], { status: 200 })
  }
}
