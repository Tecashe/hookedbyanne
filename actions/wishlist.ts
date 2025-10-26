"use server"

import { prisma } from "@/lib/db"
import { requireAuth } from "@/lib/clerk"
import { revalidatePath } from "next/cache"

export async function addToWishlist(productId: string) {
  const user = await requireAuth()

  await prisma.wishlistItem.create({
    data: {
      userId: user.id,
      productId,
    },
  })

  revalidatePath("/wishlist")
  return { success: true }
}

export async function removeFromWishlist(productId: string) {
  const user = await requireAuth()

  await prisma.wishlistItem.delete({
    where: {
      userId_productId: {
        userId: user.id,
        productId,
      },
    },
  })

  revalidatePath("/wishlist")
  return { success: true }
}

export async function getWishlist() {
  const user = await requireAuth()

  return await prisma.wishlistItem.findMany({
    where: { userId: user.id },
    include: {
      product: true,
    },
    orderBy: { createdAt: "desc" },
  })
}

export async function isInWishlist(productId: string) {
  try {
    const user = await requireAuth()

    const item = await prisma.wishlistItem.findUnique({
      where: {
        userId_productId: {
          userId: user.id,
          productId,
        },
      },
    })

    return !!item
  } catch {
    return false
  }
}
