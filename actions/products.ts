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
//   const hasVariants = formData.get("hasVariants") === "true"

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
//       hasVariants,
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

// export async function addProductVariant(productId: string, formData: FormData) {
//   await requireAdmin()

//   const color = formData.get("color") as string | null
//   const size = formData.get("size") as string | null
//   const sku = formData.get("sku") as string | null
//   const price = formData.get("price") ? Number.parseFloat(formData.get("price") as string) : null
//   const stock = Number.parseInt(formData.get("stock") as string)
//   const images = formData.getAll("images") as string[]

//   const variant = await prisma.productVariant.create({
//     data: {
//       productId,
//       color,
//       size,
//       sku,
//       price,
//       stock,
//       images,
//     },
//   })

//   revalidatePath(`/admin/products/${productId}`)
//   revalidatePath(`/products/${productId}`)
//   return { success: true, variant }
// }

// export async function updateProductVariant(variantId: string, formData: FormData) {
//   await requireAdmin()

//   const color = formData.get("color") as string | null
//   const size = formData.get("size") as string | null
//   const sku = formData.get("sku") as string | null
//   const price = formData.get("price") ? Number.parseFloat(formData.get("price") as string) : null
//   const stock = Number.parseInt(formData.get("stock") as string)
//   const isAvailable = formData.get("isAvailable") === "true"
//   const images = formData.getAll("images") as string[]

//   const variant = await prisma.productVariant.update({
//     where: { id: variantId },
//     data: {
//       color,
//       size,
//       sku,
//       price,
//       stock,
//       isAvailable,
//       images,
//     },
//   })

//   revalidatePath("/admin/products")
//   return { success: true, variant }
// }

// export async function deleteProductVariant(variantId: string) {
//   await requireAdmin()

//   await prisma.productVariant.delete({
//     where: { id: variantId },
//   })

//   revalidatePath("/admin/products")
//   return { success: true }
// }

// export async function getProduct(id: string) {
//   return await prisma.product.findUnique({
//     where: { id },
//     include: {
//       variants: {
//         orderBy: { createdAt: "asc" },
//       },
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

// export async function getRelatedProducts(productId: string, category: string, limit = 4) {
//   return await prisma.product.findMany({
//     where: {
//       category,
//       id: { not: productId },
//     },
//     take: limit,
//     orderBy: { createdAt: "desc" },
//   })
// }


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
//   const hasVariants = formData.get("hasVariants") === "true"

//   const images = formData.getAll("images") as string[]
//   const tags = (formData.get("tags") as string)?.split(",").map((t) => t.trim()) || []

//   const variantsData = formData.get("variants")
//   const variants = variantsData ? JSON.parse(variantsData as string) : []

//   const product = await prisma.product.create({
//     data: {
//       name,
//       description,
//       price: isNaN(price) ? 0 : price, // Default to 0 if NaN
//       compareAtPrice,
//       images,
//       category,
//       tags,
//       stock: isNaN(stock) ? 0 : stock, // Default to 0 if NaN
//       featured,
//       isNewArrival,
//       hasVariants,
//       // Create variants if they exist
//       ...(hasVariants &&
//         variants.length > 0 && {
//           variants: {
//             create: variants.map((v: any) => ({
//               color: v.color,
//               colorHex: v.colorHex,
//               size: v.size,
//               sku: v.sku,
//               price: v.price || 0,
//               stock: v.stock || 0,
//               images: v.images || [],
//             })),
//           },
//         }),
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

// export async function addProductVariant(productId: string, formData: FormData) {
//   await requireAdmin()

//   const color = formData.get("color") as string | null
//   const size = formData.get("size") as string | null
//   const sku = formData.get("sku") as string | null
//   const price = formData.get("price") ? Number.parseFloat(formData.get("price") as string) : null
//   const stock = Number.parseInt(formData.get("stock") as string)
//   const images = formData.getAll("images") as string[]

//   const variant = await prisma.productVariant.create({
//     data: {
//       productId,
//       color,
//       size,
//       sku,
//       price,
//       stock,
//       images,
//     },
//   })

//   revalidatePath(`/admin/products/${productId}`)
//   revalidatePath(`/products/${productId}`)
//   return { success: true, variant }
// }

// export async function updateProductVariant(variantId: string, formData: FormData) {
//   await requireAdmin()

//   const color = formData.get("color") as string | null
//   const size = formData.get("size") as string | null
//   const sku = formData.get("sku") as string | null
//   const price = formData.get("price") ? Number.parseFloat(formData.get("price") as string) : null
//   const stock = Number.parseInt(formData.get("stock") as string)
//   const isAvailable = formData.get("isAvailable") === "true"
//   const images = formData.getAll("images") as string[]

//   const variant = await prisma.productVariant.update({
//     where: { id: variantId },
//     data: {
//       color,
//       size,
//       sku,
//       price,
//       stock,
//       isAvailable,
//       images,
//     },
//   })

//   revalidatePath("/admin/products")
//   return { success: true, variant }
// }

// export async function deleteProductVariant(variantId: string) {
//   await requireAdmin()

//   await prisma.productVariant.delete({
//     where: { id: variantId },
//   })

//   revalidatePath("/admin/products")
//   return { success: true }
// }

// export async function getProduct(id: string) {
//   return await prisma.product.findUnique({
//     where: { id },
//     include: {
//       variants: {
//         orderBy: { createdAt: "asc" },
//       },
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

// export async function getRelatedProducts(productId: string, category: string, limit = 4) {
//   return await prisma.product.findMany({
//     where: {
//       category,
//       id: { not: productId },
//     },
//     take: limit,
//     orderBy: { createdAt: "desc" },
//   })
// }



// "use server"

// import { prisma } from "@/lib/db"
// import { requireAdmin } from "@/lib/clerk"
// import { revalidatePath } from "next/cache"

// export async function createProduct(formData: FormData) {
//   await requireAdmin()

//   console.log("[v0] createProduct called")

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
//   const hasVariants = formData.get("hasVariants") === "true"

//   const images = formData.getAll("images") as string[]
//   const tags = (formData.get("tags") as string)?.split(",").map((t) => t.trim()) || []

//   const variantsData = formData.get("variants")
//   const variants = variantsData ? JSON.parse(variantsData as string) : []

//   console.log("[v0] Product data:", {
//     name,
//     price,
//     stock,
//     hasVariants,
//     imagesCount: images.length,
//     variantsCount: variants.length,
//   })

//   const finalPrice = isNaN(price) ? 0 : price
//   const finalStock = isNaN(stock) ? 0 : stock

//   console.log("[v0] Final price:", finalPrice, "Final stock:", finalStock)

//   const product = await prisma.product.create({
//     data: {
//       name,
//       description,
//       price: finalPrice,
//       compareAtPrice,
//       images,
//       category,
//       tags,
//       stock: finalStock,
//       featured,
//       isNewArrival,
//       hasVariants,
//       // Create variants if they exist
//       ...(hasVariants &&
//         variants.length > 0 && {
//           variants: {
//             create: variants.map((v: any) => {
//               console.log("[v0] Creating variant:", v)
//               return {
//                 color: v.color,
//                 colorHex: v.colorHex,
//                 size: v.size,
//                 sku: v.sku,
//                 price: v.price || 0,
//                 stock: v.stock || 0,
//                 images: v.images || [],
//               }
//             }),
//           },
//         }),
//     },
//     include: {
//       variants: true,
//     },
//   })

//   console.log("[v0] Product created:", product)

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

// export async function addProductVariant(productId: string, formData: FormData) {
//   await requireAdmin()

//   const color = formData.get("color") as string | null
//   const size = formData.get("size") as string | null
//   const sku = formData.get("sku") as string | null
//   const price = formData.get("price") ? Number.parseFloat(formData.get("price") as string) : null
//   const stock = Number.parseInt(formData.get("stock") as string)
//   const images = formData.getAll("images") as string[]

//   const variant = await prisma.productVariant.create({
//     data: {
//       productId,
//       color,
//       size,
//       sku,
//       price,
//       stock,
//       images,
//     },
//   })

//   revalidatePath(`/admin/products/${productId}`)
//   revalidatePath(`/products/${productId}`)
//   return { success: true, variant }
// }

// export async function updateProductVariant(variantId: string, formData: FormData) {
//   await requireAdmin()

//   const color = formData.get("color") as string | null
//   const size = formData.get("size") as string | null
//   const sku = formData.get("sku") as string | null
//   const price = formData.get("price") ? Number.parseFloat(formData.get("price") as string) : null
//   const stock = Number.parseInt(formData.get("stock") as string)
//   const isAvailable = formData.get("isAvailable") === "true"
//   const images = formData.getAll("images") as string[]

//   const variant = await prisma.productVariant.update({
//     where: { id: variantId },
//     data: {
//       color,
//       size,
//       sku,
//       price,
//       stock,
//       isAvailable,
//       images,
//     },
//   })

//   revalidatePath("/admin/products")
//   return { success: true, variant }
// }

// export async function deleteProductVariant(variantId: string) {
//   await requireAdmin()

//   await prisma.productVariant.delete({
//     where: { id: variantId },
//   })

//   revalidatePath("/admin/products")
//   return { success: true }
// }

// export async function getProduct(id: string) {
//   return await prisma.product.findUnique({
//     where: { id },
//     include: {
//       variants: {
//         orderBy: { createdAt: "asc" },
//       },
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

// export async function getRelatedProducts(productId: string, category: string, limit = 4) {
//   return await prisma.product.findMany({
//     where: {
//       category,
//       id: { not: productId },
//     },
//     take: limit,
//     orderBy: { createdAt: "desc" },
//   })
// }




// "use server"

// import { prisma } from "@/lib/db"
// import { requireAdmin } from "@/lib/clerk"
// import { revalidatePath } from "next/cache"

// export async function createProduct(formData: FormData) {
//   await requireAdmin()

//   console.log("[v0] createProduct called")

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
//   const hasVariants = formData.get("hasVariants") === "true"

//   const images = formData.getAll("images") as string[]
//   const tags = (formData.get("tags") as string)?.split(",").map((t) => t.trim()) || []

//   const variantsData = formData.get("variants")
//   const variants = variantsData ? JSON.parse(variantsData as string) : []

//   console.log("[v0] Product data:", {
//     name,
//     price,
//     stock,
//     hasVariants,
//     imagesCount: images.length,
//     variantsCount: variants.length,
//   })

//   const finalPrice = isNaN(price) ? 0 : price
//   const finalStock = isNaN(stock) ? 0 : stock

//   console.log("[v0] Final price:", finalPrice, "Final stock:", finalStock)

//   const product = await prisma.product.create({
//     data: {
//       name,
//       description,
//       price: finalPrice,
//       compareAtPrice,
//       images,
//       category,
//       tags,
//       stock: finalStock,
//       featured,
//       isNewArrival,
//       hasVariants,
//       // Create variants if they exist
//       ...(hasVariants &&
//         variants.length > 0 && {
//           variants: {
//             create: variants.map((v: any) => {
//               console.log("[v0] Creating variant:", v)
//               return {
//                 color: v.color,
//                 colorHex: v.colorHex,
//                 size: v.size,
//                 sku: v.sku,
//                 price: v.price || 0,
//                 stock: v.stock || 0,
//                 images: v.images || [],
//               }
//             }),
//           },
//         }),
//     },
//     include: {
//       variants: true,
//     },
//   })

//   console.log("[v0] Product created:", product)

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
//   const hasVariants = formData.get("hasVariants") === "true"

//   const images = formData.getAll("images") as string[]
//   const tags = (formData.get("tags") as string)?.split(",").map((t) => t.trim()) || []

//   const variantsData = formData.get("variants")
//   const variants = variantsData ? JSON.parse(variantsData as string) : []

//   // Delete existing variants if hasVariants is true (we'll recreate them)
//   if (hasVariants) {
//     await prisma.productVariant.deleteMany({
//       where: { productId: id },
//     })
//   }

//   const product = await prisma.product.update({
//     where: { id },
//     data: {
//       name,
//       description,
//       price: isNaN(price) ? 0 : price,
//       compareAtPrice,
//       images,
//       category,
//       tags,
//       stock: isNaN(stock) ? 0 : stock,
//       featured,
//       isNewArrival,
//       hasVariants,
//       ...(hasVariants &&
//         variants.length > 0 && {
//           variants: {
//             create: variants.map((v: any) => ({
//               color: v.color,
//               colorHex: v.colorHex,
//               size: v.size,
//               sku: v.sku,
//               price: v.price || 0,
//               stock: v.stock || 0,
//               images: v.images || [],
//             })),
//           },
//         }),
//     },
//     include: {
//       variants: true,
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

// export async function addProductVariant(productId: string, formData: FormData) {
//   await requireAdmin()

//   const color = formData.get("color") as string | null
//   const size = formData.get("size") as string | null
//   const sku = formData.get("sku") as string | null
//   const price = formData.get("price") ? Number.parseFloat(formData.get("price") as string) : null
//   const stock = Number.parseInt(formData.get("stock") as string)
//   const images = formData.getAll("images") as string[]

//   const variant = await prisma.productVariant.create({
//     data: {
//       productId,
//       color,
//       size,
//       sku,
//       price,
//       stock,
//       images,
//     },
//   })

//   revalidatePath(`/admin/products/${productId}`)
//   revalidatePath(`/products/${productId}`)
//   return { success: true, variant }
// }

// export async function updateProductVariant(variantId: string, formData: FormData) {
//   await requireAdmin()

//   const color = formData.get("color") as string | null
//   const size = formData.get("size") as string | null
//   const sku = formData.get("sku") as string | null
//   const price = formData.get("price") ? Number.parseFloat(formData.get("price") as string) : null
//   const stock = Number.parseInt(formData.get("stock") as string)
//   const isAvailable = formData.get("isAvailable") === "true"
//   const images = formData.getAll("images") as string[]

//   const variant = await prisma.productVariant.update({
//     where: { id: variantId },
//     data: {
//       color,
//       size,
//       sku,
//       price,
//       stock,
//       isAvailable,
//       images,
//     },
//   })

//   revalidatePath("/admin/products")
//   return { success: true, variant }
// }

// export async function deleteProductVariant(variantId: string) {
//   await requireAdmin()

//   await prisma.productVariant.delete({
//     where: { id: variantId },
//   })

//   revalidatePath("/admin/products")
//   return { success: true }
// }

// export async function getProduct(id: string) {
//   return await prisma.product.findUnique({
//     where: { id },
//     include: {
//       variants: {
//         orderBy: { createdAt: "asc" },
//       },
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

// export async function getRelatedProducts(productId: string, category: string, limit = 4) {
//   return await prisma.product.findMany({
//     where: {
//       category,
//       id: { not: productId },
//     },
//     take: limit,
//     orderBy: { createdAt: "desc" },
//   })
// }


"use server"

import { prisma } from "@/lib/db"
import { requireAdmin } from "@/lib/clerk"
import { revalidatePath } from "next/cache"

export async function createProduct(formData: FormData) {
  await requireAdmin()

  console.log("[v0] createProduct called")

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

  const variantsData = formData.get("variants")
  const variants = variantsData ? JSON.parse(variantsData as string) : []

  console.log("[v0] Product data:", {
    name,
    price,
    stock,
    hasVariants,
    imagesCount: images.length,
    variantsCount: variants.length,
  })

  const finalPrice = isNaN(price) ? 0 : price
  const finalStock = isNaN(stock) ? 0 : stock

  console.log("[v0] Final price:", finalPrice, "Final stock:", finalStock)

  const product = await prisma.product.create({
    data: {
      name,
      description,
      price: finalPrice,
      compareAtPrice,
      images,
      category,
      tags,
      stock: finalStock,
      featured,
      isNewArrival,
      hasVariants,
      // Create variants if they exist
      ...(hasVariants &&
        variants.length > 0 && {
          variants: {
            create: variants.map((v: any) => {
              console.log("[v0] Creating variant:", v)
              return {
                color: v.color,
                colorHex: v.colorHex,
                size: v.size,
                sku: v.sku,
                price: v.price || 0,
                stock: v.stock || 0,
                images: v.images || [],
              }
            }),
          },
        }),
    },
    include: {
      variants: true,
    },
  })

  console.log("[v0] Product created:", product)

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
  const hasVariants = formData.get("hasVariants") === "true"

  const images = formData.getAll("images") as string[]
  const tags = (formData.get("tags") as string)?.split(",").map((t) => t.trim()) || []

  const variantsData = formData.get("variants")
  const variants = variantsData ? JSON.parse(variantsData as string) : []

  // Delete existing variants if hasVariants is true (we'll recreate them)
  if (hasVariants) {
    await prisma.productVariant.deleteMany({
      where: { productId: id },
    })
  }

  const product = await prisma.product.update({
    where: { id },
    data: {
      name,
      description,
      price: isNaN(price) ? 0 : price,
      compareAtPrice,
      images,
      category,
      tags,
      stock: isNaN(stock) ? 0 : stock,
      featured,
      isNewArrival,
      hasVariants,
      ...(hasVariants &&
        variants.length > 0 && {
          variants: {
            create: variants.map((v: any) => ({
              color: v.color,
              colorHex: v.colorHex,
              size: v.size,
              sku: v.sku,
              price: v.price || 0,
              stock: v.stock || 0,
              images: v.images || [],
            })),
          },
        }),
    },
    include: {
      variants: true,
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
    include: {
      variants: {
        orderBy: { createdAt: "asc" },
      },
    },
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
