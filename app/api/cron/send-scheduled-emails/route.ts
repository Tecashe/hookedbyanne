// import { NextResponse } from "next/server"
// import { prisma } from "@/lib/db"
// import { Resend } from "resend"

// const resend = new Resend(process.env.RESEND_API_KEY)

// // This endpoint will be called by Vercel Cron
// export async function GET(request: Request) {
//   // Verify the request is from Vercel Cron 
//   const authHeader = request.headers.get("authorization")
//   if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//   }

//   try {
//     // Get all pending emails that are due to be sent
//     const now = new Date()
//     const pendingEmails = await prisma.scheduledEmail.findMany({
//       where: {
//         status: "PENDING",
//         scheduledFor: {
//           lte: now,
//         },
//       },
//     })

//     console.log(`[v0] Found ${pendingEmails.length} emails to send`)

//     let successCount = 0
//     let failCount = 0

//     for (const email of pendingEmails) {
//       try {
//         // Get all customer emails
//         const users = await prisma.user.findMany({
//           where: { role: "CUSTOMER" },
//           select: { email: true },
//         })

//         const emails = users.map((user) => user.email)

//         // Send in batches of 50
//         const batchSize = 50
//         for (let i = 0; i < emails.length; i += batchSize) {
//           const batch = emails.slice(i, i + batchSize)

//           await resend.emails.send({
//             from: "HookedByAnn <noreply@hookedbyannie.com>",
//             to: batch,
//             subject: email.subject,
//             html: email.content,
//             text: email.previewText || email.subject,
//           })

//           // Wait 1 second between batches
//           if (i + batchSize < emails.length) {
//             await new Promise((resolve) => setTimeout(resolve, 1000))
//           }
//         }

//         // Mark as sent
//         await prisma.scheduledEmail.update({
//           where: { id: email.id },
//           data: {
//             status: "SENT",
//             sentAt: new Date(),
//           },
//         })

//         successCount++
//       } catch (error) {
//         console.error(`[v0] Failed to send email ${email.id}:`, error)

//         // Mark as failed
//         await prisma.scheduledEmail.update({
//           where: { id: email.id },
//           data: { status: "FAILED" },
//         })

//         failCount++
//       }
//     }

//     return NextResponse.json({
//       success: true,
//       message: `Processed ${pendingEmails.length} emails. ${successCount} sent, ${failCount} failed.`,
//     })
//   } catch (error) {
//     console.error("[v0] Cron job error:", error)
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 })
//   }
// }


import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization")
    const cronSecret = process.env.CRON_SECRET

    // If CRON_SECRET is set, verify it. Otherwise allow the request (for development)
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      console.log("[v0] Cron: Unauthorized request - invalid token")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.log("[v0] Cron: Starting scheduled email processing")

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

    console.log(`[v0] Cron: Found ${pendingEmails.length} emails to send`)

    if (pendingEmails.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No pending emails to send",
      })
    }

    let successCount = 0
    let failCount = 0

    for (const email of pendingEmails) {
      try {
        console.log(`[v0] Cron: Processing email ${email.id} - ${email.subject}`)

        // Get all customer emails
        const users = await prisma.user.findMany({
          where: { role: "CUSTOMER" },
          select: { email: true },
        })

        const emails = users.map((user) => user.email)
        console.log(`[v0] Cron: Sending to ${emails.length} recipients`)

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

          console.log(`[v0] Cron: Sent batch ${Math.floor(i / batchSize) + 1}`)

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

        console.log(`[v0] Cron: Email ${email.id} marked as SENT`)
        successCount++
      } catch (error) {
        console.error(`[v0] Cron: Failed to send email ${email.id}:`, error)

        // Mark as failed
        await prisma.scheduledEmail.update({
          where: { id: email.id },
          data: { status: "FAILED" },
        })

        failCount++
      }
    }

    console.log(`[v0] Cron: Completed - ${successCount} sent, ${failCount} failed`)

    return NextResponse.json({
      success: true,
      message: `Processed ${pendingEmails.length} emails. ${successCount} sent, ${failCount} failed.`,
    })
  } catch (error) {
    console.error("[v0] Cron job error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
