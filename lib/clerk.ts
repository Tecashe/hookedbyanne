import { auth, currentUser } from "@clerk/nextjs/server"
import { prisma } from "./db"

export async function getCurrentUser() {
  const { userId } = await auth()
  if (!userId) return null

  const clerkUser = await currentUser()
  if (!clerkUser) return null

  // Sync user with database
  let user = await prisma.user.findUnique({
    where: { clerkId: userId },
  })

  if (!user) {
    user = await prisma.user.create({
      data: {
        clerkId: userId,
        email: clerkUser.emailAddresses[0]?.emailAddress || "",
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        imageUrl: clerkUser.imageUrl,
      },
    })
  }

  return user
}

export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Unauthorized")
  }
  return user
}

export async function requireAdmin() {
  const user = await requireAuth()
  if (user.role !== "ADMIN") {
    throw new Error("Forbidden: Admin access required")
  }
  return user
}
