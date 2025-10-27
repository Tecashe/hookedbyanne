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

export async function uploadImages(files: File[]): Promise<string[]> {
  try {
    const formData = new FormData()
    files.forEach((file) => {
      formData.append("files", file)
    })

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Upload failed")
    }

    const data = await response.json()
    return data.urls
  } catch (error) {
    console.error("[v0] Failed to upload images:", error)
    throw new Error("Failed to upload images")
  }
}
