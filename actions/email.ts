"use server"

import { requireAdmin } from "@/lib/clerk"
import { prisma } from "@/lib/db"
import { sendNewsletterEmail } from "@/lib/email"
import { revalidatePath } from "next/cache"

export async function sendBulkNewsletter(formData: FormData) {
  await requireAdmin()

  const subject = formData.get("subject") as string
  const content = formData.get("content") as string
  const previewText = formData.get("previewText") as string
  const sendToAll = formData.get("sendToAll") === "true"

  // Get all user emails
  const users = await prisma.user.findMany({
    where: sendToAll ? {} : { role: "CUSTOMER" },
    select: { email: true },
  })

  const emails = users.map((user) => user.email)

  // Send in batches of 50 to avoid rate limits
  const batchSize = 50
  let successCount = 0
  let failCount = 0

  for (let i = 0; i < emails.length; i += batchSize) {
    const batch = emails.slice(i, i + batchSize)
    const result = await sendNewsletterEmail({
      to: batch,
      subject,
      content,
      previewText,
    })

    if (result.success) {
      successCount += batch.length
    } else {
      failCount += batch.length
    }

    // Wait 1 second between batches to avoid rate limiting
    if (i + batchSize < emails.length) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
  }

  revalidatePath("/admin/emails")
  return {
    success: true,
    message: `Newsletter sent to ${successCount} recipients. ${failCount > 0 ? `${failCount} failed.` : ""}`,
  }
}

export async function scheduleNewsletter(formData: FormData) {
  await requireAdmin()

  const subject = formData.get("subject") as string
  const content = formData.get("content") as string
  const previewText = formData.get("previewText") as string
  const scheduledFor = new Date(formData.get("scheduledFor") as string)

  // In a production app, you'd use a job queue like Vercel Cron or a service like Inngest
  // For now, we'll store it in the database and you can set up a cron job to send it

  await prisma.$executeRaw`
    INSERT INTO "ScheduledEmail" (id, subject, content, "previewText", "scheduledFor", status, "createdAt", "updatedAt")
    VALUES (gen_random_uuid(), ${subject}, ${content}, ${previewText}, ${scheduledFor}, 'PENDING', NOW(), NOW())
  `

  revalidatePath("/admin/emails")
  return {
    success: true,
    message: `Newsletter scheduled for ${scheduledFor.toLocaleString()}`,
  }
}
