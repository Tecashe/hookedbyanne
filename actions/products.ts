"use server"

import { prisma } from "@/lib/db"
import { requireAdmin } from "@/lib/clerk"
import { revalidatePath } from "next/cache"

export async function createProduct(formData: FormData) {
  await requireAdmin()

  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const price = Number.parseFloat(formData.get("price") as string)
  const compareAtPrice = formData.get("compareAtPrice")
    ? Number.parseFloat(formData.get("compareAtPrice") as string)
    : null
  const category = formData.get("category") as string
  const stock = Number.parseInt(formData.get("stock") as string)
  const featured = formData.get("featured") === "true"
  const isNewArrival = formData.get("isNewArrival") === "true"

  const images = formData.getAll("images") as string[]
  const tags = (formData.get("tags") as string)?.split(",").map((t) => t.trim()) || []

  const product = await prisma.product.create({
    data: {
      name,
      description,
      price,
      compareAtPrice,
      images,
      category,
      tags,
      stock,
      featured,
      isNewArrival,
    },
  })

  revalidatePath("/admin/products")
  revalidatePath("/")
  return { success: true, product }
}

export async function updateProduct(id: string, formData: FormData) {
  await requireAdmin()

  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const price = Number.parseFloat(formData.get("price") as string)
  const compareAtPrice = formData.get("compareAtPrice")
    ? Number.parseFloat(formData.get("compareAtPrice") as string)
    : null
  const category = formData.get("category") as string
  const stock = Number.parseInt(formData.get("stock") as string)
  const featured = formData.get("featured") === "true"
  const isNewArrival = formData.get("isNewArrival") === "true"

  const images = formData.getAll("images") as string[]
  const tags = (formData.get("tags") as string)?.split(",").map((t) => t.trim()) || []

  const product = await prisma.product.update({
    where: { id },
    data: {
      name,
      description,
      price,
      compareAtPrice,
      images,
      category,
      tags,
      stock,
      featured,
      isNewArrival,
    },
  })

  revalidatePath("/admin/products")
  revalidatePath("/")
  return { success: true, product }
}

export async function deleteProduct(id: string) {
  await requireAdmin()

  await prisma.product.delete({
    where: { id },
  })

  revalidatePath("/admin/products")
  revalidatePath("/")
  return { success: true }
}

export async function getProducts(filters?: {
  category?: string
  featured?: boolean
  limit?: number
  isNewArrival?: boolean
  search?: string
}) {
  const where: any = {}

  if (filters?.category) {
    where.category = filters.category
  }
  if (filters?.featured !== undefined) {
    where.featured = filters.featured
  }
  if (filters?.isNewArrival !== undefined) {
    where.isNewArrival = filters.isNewArrival
  }
  if (filters?.search) {
    where.OR = [
      { name: { contains: filters.search, mode: "insensitive" } },
      { description: { contains: filters.search, mode: "insensitive" } },
      { tags: { has: filters.search } },
    ]
  }

  return await prisma.product.findMany({
    where,
    orderBy: { createdAt: "desc" },
  })
}

export async function getProduct(id: string) {
  return await prisma.product.findUnique({
    where: { id },
    include: {
      reviews: {
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              imageUrl: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  })
}
