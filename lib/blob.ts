import { put } from "@vercel/blob"

export async function uploadImage(file: File): Promise<string> {
  try {
    const blob = await put(file.name, file, {
      access: "public",
    })
    return blob.url
  } catch (error) {
    console.error("Failed to upload to Vercel Blob:", error)
    throw new Error("Failed to upload image")
  }
}

export async function uploadImages(files: File[]): Promise<string[]> {
  const uploadPromises = files.map((file) => uploadImage(file))
  return await Promise.all(uploadPromises)
}
