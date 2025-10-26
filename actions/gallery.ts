// "use server"

// import { prisma } from "@/lib/db"
// import { requireAdmin } from "@/lib/clerk"
// import { revalidatePath } from "next/cache"

// export async function getGalleryImages(category?: string) {
//   const where: any = { isActive: true }
//   if (category) {
//     where.category = category
//   }

//   return await prisma.galleryImage.findMany({
//     where,
//     orderBy: { order: "asc" },
//   })
// }

// export async function createGalleryImage(data: {
//   url: string
//   alt?: string
//   category: string
//   order?: number
// }) {
//   await requireAdmin()

//   const image = await prisma.galleryImage.create({
//     data: {
//       url: data.url,
//       alt: data.alt,
//       category: data.category,
//       order: data.order || 0,
//     },
//   })

//   revalidatePath("/admin/gallery")
//   revalidatePath("/")
//   return { success: true, image }
// }

// export async function updateGalleryImage(
//   id: string,
//   data: {
//     url?: string
//     alt?: string
//     category?: string
//     order?: number
//     isActive?: boolean
//   },
// ) {
//   await requireAdmin()

//   const image = await prisma.galleryImage.update({
//     where: { id },
//     data,
//   })

//   revalidatePath("/admin/gallery")
//   revalidatePath("/")
//   return { success: true, image }
// }

// export async function deleteGalleryImage(id: string) {
//   await requireAdmin()

//   await prisma.galleryImage.delete({
//     where: { id },
//   })

//   revalidatePath("/admin/gallery")
//   revalidatePath("/")
//   return { success: true }
// }
"use server"

import { prisma } from "@/lib/db"
import { requireAdmin } from "@/lib/clerk"
import { revalidatePath } from "next/cache"

export async function getGalleryImages(category?: string) {
  const where: any = { isActive: true }
  if (category) {
    where.category = category
  }

  return await prisma.galleryImage.findMany({
    where,
    include: {
      product: {
        select: {
          id: true,
          name: true,
          price: true,
          compareAtPrice: true,
        },
      },
    },
    orderBy: { order: "asc" },
  })
}

export async function createGalleryImage(data: {
  url: string
  alt?: string
  category: string
  order?: number
  productId?: string
}) {
  await requireAdmin()

  const image = await prisma.galleryImage.create({
    data: {
      url: data.url,
      alt: data.alt,
      category: data.category,
      order: data.order || 0,
      productId: data.productId,
    },
  })

  revalidatePath("/admin/gallery")
  revalidatePath("/")
  return { success: true, image }
}

export async function updateGalleryImage(
  id: string,
  data: {
    url?: string
    alt?: string
    category?: string
    order?: number
    isActive?: boolean
    productId?: string | null
  },
) {
  await requireAdmin()

  const image = await prisma.galleryImage.update({
    where: { id },
    data,
  })

  revalidatePath("/admin/gallery")
  revalidatePath("/")
  return { success: true, image }
}

export async function deleteGalleryImage(id: string) {
  await requireAdmin()

  await prisma.galleryImage.delete({
    where: { id },
  })

  revalidatePath("/admin/gallery")
  revalidatePath("/")
  return { success: true }
}

export async function linkGalleryImageToProduct(imageId: string, productId: string | null) {
  await requireAdmin()

  await prisma.galleryImage.update({
    where: { id: imageId },
    data: { productId },
  })

  revalidatePath("/admin/gallery")
  revalidatePath("/")
  return { success: true }
}
