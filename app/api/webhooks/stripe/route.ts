import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { stripe } from "@/lib/stripe"
import { prisma } from "@/lib/db"

export async function POST(req: Request) {
  const body = await req.text()
  const headersList = await headers()
  const signature = headersList.get("stripe-signature")

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 })
  }

  let event: any

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error("Webhook signature verification failed:", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  try {
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object
        const orderId = paymentIntent.metadata.orderId

        if (orderId) {
          await prisma.order.update({
            where: { id: orderId },
            data: {
              status: "PROCESSING",
              stripePaymentId: paymentIntent.id,
            },
          })
        }
        break

      case "payment_intent.payment_failed":
        const failedPayment = event.data.object
        const failedOrderId = failedPayment.metadata.orderId

        if (failedOrderId) {
          await prisma.order.update({
            where: { id: failedOrderId },
            data: {
              status: "CANCELLED",
            },
          })
        }
        break
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook handler error:", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}
