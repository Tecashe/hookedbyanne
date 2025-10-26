"use server"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/clerk"
import { revalidatePath } from "next/cache"

export async function seedGalleryAndProducts(formData: FormData) {
  const user = await getCurrentUser()

  if (!user || user.role !== "ADMIN") {
    throw new Error("Unauthorized")
  }

  try {
    // Seed Gallery Images with real generated images
    const galleryImages = [
      // Blankets category
      {
        url: "/cozy-handmade-crochet-blanket-in-warm-colors.jpg",
        alt: "Cozy Crochet Blanket",
        category: "blankets",
        order: 1,
      },
      {
        url: "/colorful-granny-square-crochet-blanket.jpg",
        alt: "Granny Square Blanket",
        category: "blankets",
        order: 2,
      },
      {
        url: "/chunky-knit-style-crochet-throw-blanket.jpg",
        alt: "Chunky Throw Blanket",
        category: "blankets",
        order: 3,
      },
      { url: "/pastel-rainbow-crochet-baby-blanket.jpg", alt: "Baby Blanket", category: "blankets", order: 4 },
      { url: "/boho-style-crochet-blanket-with-tassels.jpg", alt: "Boho Blanket", category: "blankets", order: 5 },

      // Accessories category
      { url: "/handmade-crochet-beanie-hat.jpg", alt: "Crochet Beanie", category: "accessories", order: 1 },
      { url: "/colorful-crochet-scarf-with-fringe.jpg", alt: "Crochet Scarf", category: "accessories", order: 2 },
      { url: "/crochet-fingerless-gloves.jpg", alt: "Fingerless Gloves", category: "accessories", order: 3 },
      { url: "/crochet-headband-with-flower.jpg", alt: "Crochet Headband", category: "accessories", order: 4 },
      { url: "/crochet-market-tote-bag.jpg", alt: "Market Tote", category: "accessories", order: 5 },
      { url: "/crochet-coin-purse.jpg", alt: "Coin Purse", category: "accessories", order: 6 },

      // Clothing category
      { url: "/crochet-cardigan-sweater.jpg", alt: "Crochet Cardigan", category: "clothing", order: 1 },
      { url: "/crochet-crop-top.jpg", alt: "Crochet Crop Top", category: "clothing", order: 2 },
      { url: "/crochet-beach-cover-up.jpg", alt: "Beach Cover Up", category: "clothing", order: 3 },
      { url: "/crochet-vest.jpg", alt: "Crochet Vest", category: "clothing", order: 4 },
      { url: "/crochet-shawl.jpg", alt: "Crochet Shawl", category: "clothing", order: 5 },
      { url: "/crochet-poncho.jpg", alt: "Crochet Poncho", category: "clothing", order: 6 },

      // Home Decor category
      { url: "/crochet-throw-pillows.jpg", alt: "Throw Pillows", category: "home-decor", order: 1 },
      { url: "/crochet-wall-hanging.jpg", alt: "Wall Hanging", category: "home-decor", order: 2 },
      { url: "/crochet-plant-hanger.png", alt: "Plant Hanger", category: "home-decor", order: 3 },
      { url: "/crochet-coaster-set.jpg", alt: "Coaster Set", category: "home-decor", order: 4 },
      { url: "/crochet-table-runner.jpg", alt: "Table Runner", category: "home-decor", order: 5 },
      { url: "/crochet-storage-basket.jpg", alt: "Storage Basket", category: "home-decor", order: 6 },
      { url: "/decorative-crochet-doily.jpg", alt: "Decorative Doily", category: "home-decor", order: 7 },
      { url: "/crochet-decorative-garland.jpg", alt: "Decorative Garland", category: "home-decor", order: 8 },
    ]

    await db.galleryImage.createMany({
      data: galleryImages,
      skipDuplicates: true,
    })

    // Seed Products with real images
    const products = [
      {
        name: "Sunset Dreams Blanket",
        description: "A beautiful handmade crochet blanket featuring warm sunset colors. Perfect for cozy evenings.",
        price: 89.99,
        compareAtPrice: 120.0,
        category: "blankets",
        images: ["/cozy-handmade-crochet-blanket-in-warm-colors.jpg"],
        tags: ["blanket", "handmade", "cozy"],
        stock: 5,
        featured: true,
        isNewArrival: true,
      },
      {
        name: "Chunky Knit Beanie",
        description: "Warm and stylish crochet beanie hat. One size fits most.",
        price: 24.99,
        compareAtPrice: 35.0,
        category: "accessories",
        images: ["/handmade-crochet-beanie-hat.jpg"],
        tags: ["hat", "winter", "accessories"],
        stock: 15,
        featured: true,
        isNewArrival: true,
      },
      {
        name: "Boho Fringe Scarf",
        description: "Lightweight crochet scarf with beautiful fringe details. Perfect for any season.",
        price: 32.99,
        category: "accessories",
        images: ["/colorful-crochet-scarf-with-fringe.jpg"],
        tags: ["scarf", "boho", "accessories"],
        stock: 10,
        featured: false,
        isNewArrival: true,
      },
      {
        name: "Cozy Cardigan",
        description: "Handmade crochet cardigan sweater. Available in multiple sizes.",
        price: 79.99,
        compareAtPrice: 110.0,
        category: "clothing",
        images: ["/crochet-cardigan-sweater.jpg"],
        tags: ["cardigan", "clothing", "sweater"],
        stock: 8,
        featured: true,
        isNewArrival: true,
      },
      {
        name: "Decorative Throw Pillows Set",
        description: "Set of 2 handmade crochet throw pillows. Adds warmth to any room.",
        price: 45.99,
        category: "home-decor",
        images: ["/crochet-throw-pillows.jpg"],
        tags: ["pillows", "home-decor", "set"],
        stock: 12,
        featured: true,
        isNewArrival: true,
      },
      {
        name: "Market Tote Bag",
        description: "Sturdy and stylish crochet market bag. Perfect for shopping or beach days.",
        price: 34.99,
        category: "accessories",
        images: ["/crochet-market-tote-bag.jpg"],
        tags: ["bag", "tote", "accessories"],
        stock: 20,
        featured: false,
        isNewArrival: true,
      },
      {
        name: "Granny Square Baby Blanket",
        description: "Soft and colorful baby blanket made with love. Perfect baby shower gift.",
        price: 54.99,
        compareAtPrice: 75.0,
        category: "blankets",
        images: ["/colorful-granny-square-crochet-blanket.jpg"],
        tags: ["baby", "blanket", "gift"],
        stock: 7,
        featured: true,
        isNewArrival: true,
      },
      {
        name: "Boho Wall Hanging",
        description: "Beautiful macrame-style crochet wall hanging. Adds bohemian charm to any space.",
        price: 39.99,
        category: "home-decor",
        images: ["/crochet-wall-hanging.jpg"],
        tags: ["wall-art", "home-decor", "boho"],
        stock: 6,
        featured: false,
        isNewArrival: true,
      },
    ]

    await db.product.createMany({
      data: products,
      skipDuplicates: true,
    })

    revalidatePath("/admin")
    revalidatePath("/")
    revalidatePath("/gallery")

    return { success: true, message: "Successfully seeded 25 gallery images and 8 products!" }
  } catch (error) {
    console.error("[v0] Seed error:", error)
    return { success: false, message: "Failed to seed data. Please try again." }
  }
}
