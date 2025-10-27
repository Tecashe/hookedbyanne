import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

// This endpoint will be called by Vercel Cron
export async function GET(request: Request) {
  // Verify the request is from Vercelcron 
  const authHeader = request.headers.get("authorization")
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    // Get all pending emails that are due to be sent
    const now = new Date()
    const pendingEmails = await prisma.scheduledEmail.findMany({
      where: {
        status: "PENDING",
        scheduledFor: {
          lte: now,
        },
      },
    })

    console.log(`[v0] Found ${pendingEmails.length} emails to send`)

    let successCount = 0
    let failCount = 0

    for (const email of pendingEmails) {
      try {
        // Get all customer emails
        const users = await prisma.user.findMany({
          where: { role: "CUSTOMER" },
          select: { email: true },
        })

        const emails = users.map((user) => user.email)

        // Send in batches of 50
        const batchSize = 50
        for (let i = 0; i < emails.length; i += batchSize) {
          const batch = emails.slice(i, i + batchSize)

          await resend.emails.send({
            from: "HookedByAnn <noreply@hookedbyannie.com>",
            to: batch,
            subject: email.subject,
            html: email.content,
            text: email.previewText || email.subject,
          })

          // Wait 1 second between batches
          if (i + batchSize < emails.length) {
            await new Promise((resolve) => setTimeout(resolve, 1000))
          }
        }

        // Mark as sent
        await prisma.scheduledEmail.update({
          where: { id: email.id },
          data: {
            status: "SENT",
            sentAt: new Date(),
          },
        })

        successCount++
      } catch (error) {
        console.error(`[v0] Failed to send email ${email.id}:`, error)

        // Mark as failed
        await prisma.scheduledEmail.update({
          where: { id: email.id },
          data: { status: "FAILED" },
        })

        failCount++
      }
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${pendingEmails.length} emails. ${successCount} sent, ${failCount} failed.`,
    })
  } catch (error) {
    console.error("[v0] Cron job error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
