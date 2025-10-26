"use server"

import { prisma } from "@/lib/db"
import { requireAdmin } from "@/lib/clerk"
import { revalidatePath } from "next/cache"

export async function validateCoupon(code: string, subtotal: number) {
  const coupon = await prisma.coupon.findUnique({
    where: { code: code.toUpperCase() },
  })

  if (!coupon) {
    return { valid: false, error: "Invalid coupon code" }
  }

  if (!coupon.isActive) {
    return { valid: false, error: "This coupon is no longer active" }
  }

  if (coupon.expiresAt && new Date() > coupon.expiresAt) {
    return { valid: false, error: "This coupon has expired" }
  }

  if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
    return { valid: false, error: "This coupon has reached its usage limit" }
  }

  if (coupon.minPurchase && subtotal < coupon.minPurchase) {
    return {
      valid: false,
      error: `Minimum purchase of $${coupon.minPurchase.toFixed(2)} required`,
    }
  }

  let discount = 0
  if (coupon.discountType === "PERCENTAGE") {
    discount = (subtotal * coupon.discountValue) / 100
    if (coupon.maxDiscount) {
      discount = Math.min(discount, coupon.maxDiscount)
    }
  } else {
    discount = coupon.discountValue
  }

  return {
    valid: true,
    discount,
    coupon: {
      code: coupon.code,
      description: coupon.description,
    },
  }
}

export async function createCoupon(data: {
  code: string
  description?: string
  discountType: "PERCENTAGE" | "FIXED"
  discountValue: number
  minPurchase?: number
  maxDiscount?: number
  expiresAt?: Date
  usageLimit?: number
}) {
  await requireAdmin()

  const coupon = await prisma.coupon.create({
    data: {
      code: data.code.toUpperCase(),
      description: data.description,
      discountType: data.discountType,
      discountValue: data.discountValue,
      minPurchase: data.minPurchase,
      maxDiscount: data.maxDiscount,
      expiresAt: data.expiresAt,
      usageLimit: data.usageLimit,
    },
  })

  revalidatePath("/admin/coupons")
  return { success: true, coupon }
}

export async function getCoupons() {
  await requireAdmin()

  return await prisma.coupon.findMany({
    orderBy: { createdAt: "desc" },
  })
}

export async function toggleCoupon(id: string) {
  await requireAdmin()

  const coupon = await prisma.coupon.findUnique({
    where: { id },
  })

  if (!coupon) {
    throw new Error("Coupon not found")
  }

  await prisma.coupon.update({
    where: { id },
    data: {
      isActive: !coupon.isActive,
    },
  })

  revalidatePath("/admin/coupons")
  return { success: true }
}
