// import { put } from "@vercel/blob"

// export async function uploadImage(file: File): Promise<string> {
//   try {
//     const blob = await put(file.name, file, {
//       access: "public",
//     })
//     return blob.url
//   } catch (error) {
//     console.error("Failed to upload to Vercel Blob:", error)
//     throw new Error("Failed to upload image")
//   }
// }

// export async function uploadImages(files: File[]): Promise<string[]> {
//   const uploadPromises = files.map((file) => uploadImage(file))
//   return await Promise.all(uploadPromises)
// }

import { put } from "@vercel/blob"

export async function uploadImage(file: File): Promise<string> {
  try {
    const blob = await put(file.name, file, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    })
    return blob.url
  } catch (error) {
    console.error("[v0] Failed to upload to Vercel Blob:", error)
    throw new Error("Failed to upload image")
  }
}

export async function uploadImages(files: File[]): Promise<string[]> {
  try {
    const uploadPromises = files.map((file) => uploadImage(file))
    return await Promise.all(uploadPromises)
  } catch (error) {
    console.error("[v0] Failed to upload images:", error)
    throw error
  }
}
