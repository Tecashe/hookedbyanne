"use server"

import { prisma } from "@/lib/db"
import { requireAdmin } from "@/lib/clerk"

export async function getAllUsers() {
  await requireAdmin()

  return await prisma.user.findMany({
    include: {
      _count: {
        select: {
          orders: true,
          wishlistItems: true,
          reviews: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  })
}

export async function getUserStats(userId: string) {
  await requireAdmin()

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      orders: {
        include: {
          items: true,
        },
      },
      pointsHistory: {
        orderBy: { createdAt: "desc" },
      },
      _count: {
        select: {
          orders: true,
          wishlistItems: true,
          reviews: true,
        },
      },
    },
  })

  if (!user) {
    throw new Error("User not found")
  }

  const totalSpent = user.orders.reduce((sum, order) => sum + order.total, 0)
  const totalOrders = user.orders.length

  return {
    user,
    stats: {
      totalSpent,
      totalOrders,
      currentPoints: user.points,
    },
  }
}
