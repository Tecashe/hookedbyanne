// "use server"

// import { prisma } from "@/lib/db"
// import { requireAdmin } from "@/lib/clerk"
// import { revalidatePath } from "next/cache"

// export async function createProduct(formData: FormData) {
//   await requireAdmin()

//   const name = formData.get("name") as string
//   const description = formData.get("description") as string
//   const price = Number.parseFloat(formData.get("price") as string)
//   const compareAtPrice = formData.get("compareAtPrice")
//     ? Number.parseFloat(formData.get("compareAtPrice") as string)
//     : null
//   const category = formData.get("category") as string
//   const stock = Number.parseInt(formData.get("stock") as string)
//   const featured = formData.get("featured") === "true"
//   const isNewArrival = formData.get("isNewArrival") === "true"

//   const images = formData.getAll("images") as string[]
//   const tags = (formData.get("tags") as string)?.split(",").map((t) => t.trim()) || []

//   const product = await prisma.product.create({
//     data: {
//       name,
//       description,
//       price,
//       compareAtPrice,
//       images,
//       category,
//       tags,
//       stock,
//       featured,
//       isNewArrival,
//     },
//   })

//   revalidatePath("/admin/products")
//   revalidatePath("/")
//   return { success: true, product }
// }

// export async function updateProduct(id: string, formData: FormData) {
//   await requireAdmin()

//   const name = formData.get("name") as string
//   const description = formData.get("description") as string
//   const price = Number.parseFloat(formData.get("price") as string)
//   const compareAtPrice = formData.get("compareAtPrice")
//     ? Number.parseFloat(formData.get("compareAtPrice") as string)
//     : null
//   const category = formData.get("category") as string
//   const stock = Number.parseInt(formData.get("stock") as string)
//   const featured = formData.get("featured") === "true"
//   const isNewArrival = formData.get("isNewArrival") === "true"

//   const images = formData.getAll("images") as string[]
//   const tags = (formData.get("tags") as string)?.split(",").map((t) => t.trim()) || []

//   const product = await prisma.product.update({
//     where: { id },
//     data: {
//       name,
//       description,
//       price,
//       compareAtPrice,
//       images,
//       category,
//       tags,
//       stock,
//       featured,
//       isNewArrival,
//     },
//   })

//   revalidatePath("/admin/products")
//   revalidatePath("/")
//   return { success: true, product }
// }

// export async function deleteProduct(id: string) {
//   await requireAdmin()

//   await prisma.product.delete({
//     where: { id },
//   })

//   revalidatePath("/admin/products")
//   revalidatePath("/")
//   return { success: true }
// }

// export async function getProducts(filters?: {
//   category?: string
//   featured?: boolean
//   limit?: number
//   isNewArrival?: boolean
//   search?: string
// }) {
//   const where: any = {}

//   if (filters?.category) {
//     where.category = filters.category
//   }
//   if (filters?.featured !== undefined) {
//     where.featured = filters.featured
//   }
//   if (filters?.isNewArrival !== undefined) {
//     where.isNewArrival = filters.isNewArrival
//   }
//   if (filters?.search) {
//     where.OR = [
//       { name: { contains: filters.search, mode: "insensitive" } },
//       { description: { contains: filters.search, mode: "insensitive" } },
//       { tags: { has: filters.search } },
//     ]
//   }

//   return await prisma.product.findMany({
//     where,
//     orderBy: { createdAt: "desc" },
//   })
// }

// export async function getProduct(id: string) {
//   return await prisma.product.findUnique({
//     where: { id },
//     include: {
//       reviews: {
//         include: {
//           user: {
//             select: {
//               firstName: true,
//               lastName: true,
//               imageUrl: true,
//             },
//           },
//         },
//         orderBy: { createdAt: "desc" },
//       },
//     },
//   })
// }
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
  const hasVariants = formData.get("hasVariants") === "true"

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
      hasVariants,
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

export async function addProductVariant(productId: string, formData: FormData) {
  await requireAdmin()

  const color = formData.get("color") as string | null
  const size = formData.get("size") as string | null
  const sku = formData.get("sku") as string | null
  const price = formData.get("price") ? Number.parseFloat(formData.get("price") as string) : null
  const stock = Number.parseInt(formData.get("stock") as string)
  const images = formData.getAll("images") as string[]

  const variant = await prisma.productVariant.create({
    data: {
      productId,
      color,
      size,
      sku,
      price,
      stock,
      images,
    },
  })

  revalidatePath(`/admin/products/${productId}`)
  revalidatePath(`/products/${productId}`)
  return { success: true, variant }
}

export async function updateProductVariant(variantId: string, formData: FormData) {
  await requireAdmin()

  const color = formData.get("color") as string | null
  const size = formData.get("size") as string | null
  const sku = formData.get("sku") as string | null
  const price = formData.get("price") ? Number.parseFloat(formData.get("price") as string) : null
  const stock = Number.parseInt(formData.get("stock") as string)
  const isAvailable = formData.get("isAvailable") === "true"
  const images = formData.getAll("images") as string[]

  const variant = await prisma.productVariant.update({
    where: { id: variantId },
    data: {
      color,
      size,
      sku,
      price,
      stock,
      isAvailable,
      images,
    },
  })

  revalidatePath("/admin/products")
  return { success: true, variant }
}

export async function deleteProductVariant(variantId: string) {
  await requireAdmin()

  await prisma.productVariant.delete({
    where: { id: variantId },
  })

  revalidatePath("/admin/products")
  return { success: true }
}

export async function getProduct(id: string) {
  return await prisma.product.findUnique({
    where: { id },
    include: {
      variants: {
        orderBy: { createdAt: "asc" },
      },
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

export async function getRelatedProducts(productId: string, category: string, limit = 4) {
  return await prisma.product.findMany({
    where: {
      category,
      id: { not: productId },
    },
    take: limit,
    orderBy: { createdAt: "desc" },
  })
}
