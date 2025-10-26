"use server"

import { prisma } from "@/lib/db"
import { requireAuth } from "@/lib/clerk"
import { revalidatePath } from "next/cache"

export async function createReview(productId: string, rating: number, comment?: string) {
  const user = await requireAuth()

  const review = await prisma.review.create({
    data: {
      userId: user.id,
      productId,
      rating,
      comment,
    },
  })

  revalidatePath(`/products/${productId}`)
  return { success: true, review }
}

export async function updateReview(productId: string, rating: number, comment?: string) {
  const user = await requireAuth()

  const review = await prisma.review.update({
    where: {
      userId_productId: {
        userId: user.id,
        productId,
      },
    },
    data: {
      rating,
      comment,
    },
  })

  revalidatePath(`/products/${productId}`)
  return { success: true, review }
}

export async function deleteReview(productId: string) {
  const user = await requireAuth()

  await prisma.review.delete({
    where: {
      userId_productId: {
        userId: user.id,
        productId,
      },
    },
  })

  revalidatePath(`/products/${productId}`)
  return { success: true }
}
